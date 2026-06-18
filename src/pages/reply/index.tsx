import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Button } from '@tarojs/components';
import Taro, { usePullDownRefresh, useDidShow } from '@tarojs/taro';
import classNames from 'classnames';
import styles from './index.module.scss';
import CommentItem from '@/components/CommentItem';
import ReplySuggestion from '@/components/ReplySuggestion';
import { CommentData, ReplyTemplate, EmotionType, AccountInfo, ProcessingStatus } from '@/types';
import { mockComments, generateReplySuggestions } from '@/data/comments';
import { getVideosByAccount } from '@/data/videos';
import { accountStore } from '@/store/account';
import { processingStore } from '@/store/processing';
import { getProcessingStatusColor } from '@/utils/emotion';
const RefreshControl = (_props: any) => null;

type EmotionFilter = 'all' | EmotionType | 'complaint' | 'praise';
type StatusFilter = 'all' | ProcessingStatus;

const ReplyPage: React.FC = () => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [emotionFilter, setEmotionFilter] = useState<EmotionFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [suggestions, setSuggestions] = useState<ReplyTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<AccountInfo>(accountStore.getCurrentAccount());
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubAccount = accountStore.subscribe((account) => {
      setCurrentAccount(account);
      loadData(account.id);
    });
    const unsubProcessing = processingStore.subscribe(() => {
      setTick(t => t + 1);
    });
    return () => {
      unsubAccount();
      unsubProcessing();
    };
  }, []);

  const loadData = useCallback((accountId?: string) => {
    const id = accountId || currentAccount.id;
    console.log('[ReplyPage] 加载评论数据, 账号:', id);
    setLoading(true);
    try {
      const videos = getVideosByAccount(id);
      const videoIds = videos.map(v => v.id);
      const accountComments = mockComments.filter(c => videoIds.includes(c.videoId));
      setComments(accountComments);
      setSelectedIds(new Set());
      setShowSuggestions(false);
    } catch (error) {
      console.error('[ReplyPage] 数据加载失败:', error);
      Taro.showToast({ title: '加载失败', icon: 'error' });
    } finally {
      setLoading(false);
      Taro.stopPullDownRefresh();
    }
  }, [currentAccount]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useDidShow(() => {
    loadData();
    setTick(t => t + 1);
  });

  usePullDownRefresh(() => {
    loadData();
  });

  const filteredComments = comments.filter(c => {
    const emotionMatch = (() => {
      if (emotionFilter === 'all') return true;
      if (emotionFilter === 'complaint') return c.category === 'complaint';
      if (emotionFilter === 'praise') return c.category === 'praise';
      return c.emotionType === emotionFilter;
    })();
    const statusMatch = statusFilter === 'all' || processingStore.getCommentStatus(c.id) === statusFilter;
    return emotionMatch && statusMatch;
  });

  const filteredSelectedIds = new Set(
    [...selectedIds].filter(id => filteredComments.some(c => c.id === id))
  );

  const selectedComments = comments.filter(c => filteredSelectedIds.has(c.id));

  const handleSelect = (comment: CommentData) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(comment.id)) {
      newSelected.delete(comment.id);
    } else {
      newSelected.add(comment.id);
    }
    setSelectedIds(newSelected);
    console.log('[ReplyPage] 选中评论数:', newSelected.size);
  };

  const handleSelectAll = () => {
    if (filteredSelectedIds.size === filteredComments.length && filteredComments.length > 0) {
      const newSelected = new Set(selectedIds);
      filteredComments.forEach(c => newSelected.delete(c.id));
      setSelectedIds(newSelected);
    } else {
      const newSelected = new Set(selectedIds);
      filteredComments.forEach(c => newSelected.add(c.id));
      setSelectedIds(newSelected);
    }
  };

  const handleGenerate = () => {
    if (selectedComments.length === 0) {
      Taro.showToast({ title: '请先选择评论', icon: 'none' });
      return;
    }
    console.log('[ReplyPage] 生成回复建议，选中:', selectedComments.length);
    const result = generateReplySuggestions(selectedComments);
    setSuggestions(result);
    setShowSuggestions(true);
    Taro.showToast({ title: '已生成回复建议', icon: 'success' });
  };

  const handleUseReply = (content: string) => {
    console.log('[ReplyPage] 使用回复:', content);
    Taro.showModal({
      title: '确认使用并标记已处理',
      content: `将对选中的 ${filteredSelectedIds.size} 条评论标记为已处理，确定使用此回复内容吗？`,
      success: (res) => {
        if (res.confirm) {
          Taro.setClipboardData({ data: content });
          processingStore.markCommentsHandled([...filteredSelectedIds]);
          Taro.showToast({ title: '已复制并标记处理', icon: 'success' });
          setSelectedIds(new Set());
        }
      }
    });
  };

  const handleMarkHandled = () => {
    if (filteredSelectedIds.size === 0) {
      Taro.showToast({ title: '请先选择评论', icon: 'none' });
      return;
    }
    Taro.showModal({
      title: '确认标记',
      content: `确定将选中的 ${filteredSelectedIds.size} 条评论标记为已处理？`,
      success: (res) => {
        if (res.confirm) {
          processingStore.markCommentsHandled([...filteredSelectedIds]);
          Taro.showToast({ title: '已标记为已处理', icon: 'success' });
          setSelectedIds(new Set());
        }
      }
    });
  };

  const getMainIssue = (): string => {
    const contents = selectedComments.map(c => c.content);
    if (contents.some(c => c.includes('发热') || c.includes('烫'))) return '发热';
    if (contents.some(c => c.includes('续航'))) return '续航';
    if (contents.some(c => c.includes('价格') || c.includes('贵'))) return '价格';
    if (contents.some(c => c.includes('投诉') || c.includes('维权'))) return '售后问题';
    if (contents.some(c => c.includes('过敏') || c.includes('刺激'))) return '过敏问题';
    if (contents.some(c => c.includes('没效果') || c.includes('智商税'))) return '效果问题';
    return '此问题';
  };

  const emotionFilters: { key: EmotionFilter; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'negative', label: '负面' },
    { key: 'complaint', label: '吐槽' },
    { key: 'neutral', label: '中性' },
    { key: 'positive', label: '正面' },
    { key: 'praise', label: '好评' }
  ];

  const statusFilters: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: '全部状态' },
    { key: 'unprocessed', label: '未处理' },
    { key: 'processing', label: '处理中' },
    { key: 'handled', label: '已处理' }
  ];

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <ScrollView scrollX className={styles.filterBar} showScrollbar={false}>
          {emotionFilters.map(f => (
            <View
              key={f.key}
              className={classNames(styles.filterItem, emotionFilter === f.key && styles.filterActive)}
              onClick={() => setEmotionFilter(f.key)}
            >
              {f.label}
            </View>
          ))}
        </ScrollView>

        <ScrollView scrollX className={styles.filterBar} showScrollbar={false}>
          {statusFilters.map(f => (
            <View
              key={f.key}
              className={classNames(styles.filterItemSmall, statusFilter === f.key && styles.filterActive)}
              onClick={() => setStatusFilter(f.key)}
              style={statusFilter === f.key && f.key !== 'all' ? { background: getProcessingStatusColor(f.key as ProcessingStatus) } : {}}
            >
              {f.label}
            </View>
          ))}
        </ScrollView>

        <View className={styles.selectedInfo}>
          <Text>
            已选择 <Text className={styles.selectedCount}>{filteredSelectedIds.size}</Text> 条评论
          </Text>
          <Text className={styles.selectAll} onClick={handleSelectAll}>
            {filteredSelectedIds.size === filteredComments.length && filteredComments.length > 0
              ? '取消全选'
              : '全选'}
          </Text>
        </View>
      </View>

      <View className={styles.content}>
        <ScrollView
          scrollY
          {...({
            refreshControl: (
              <RefreshControl
                refreshing={loading}
                onRefresh={loadData}
                title='加载中...'
              />
            )
          } as any)}
        >
          {filteredComments.length > 0 ? (
            filteredComments.map(comment => {
              const commentStatus = processingStore.getCommentStatus(comment.id);
              return (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  selectable
                  isSelected={selectedIds.has(comment.id)}
                  onSelect={handleSelect}
                  processingStatus={commentStatus}
                />
              );
            })
          ) : (
            <View className={styles.empty}>
              <Text>暂无评论数据</Text>
            </View>
          )}

          {showSuggestions && suggestions.length > 0 && (
            <View className={styles.suggestionsSection}>
              <Text className={styles.sectionTitle}>回复建议</Text>
              {suggestions.map((template, index) => (
                <ReplySuggestion
                  key={index}
                  template={template}
                  selectedIssue={getMainIssue()}
                  onUse={handleUseReply}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      <View className={styles.bottomBar}>
        <View className={styles.bottomInfo}>
          <Text>已选 <Text className={styles.bottomCount}>{filteredSelectedIds.size}</Text> 条</Text>
        </View>
        <Button
          className={classNames(styles.actionBtn, styles.markBtn)}
          disabled={filteredSelectedIds.size === 0}
          onClick={handleMarkHandled}
        >
          标记已处理
        </Button>
        <Button
          className={classNames(styles.actionBtn, styles.generateBtn)}
          disabled={filteredSelectedIds.size === 0}
          onClick={handleGenerate}
        >
          生成回复建议
        </Button>
      </View>
    </View>
  );
};

export default ReplyPage;
