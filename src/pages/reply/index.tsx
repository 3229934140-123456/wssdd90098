import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Button } from '@tarojs/components';
import Taro, { usePullDownRefresh, useDidShow } from '@tarojs/taro';
import classNames from 'classnames';
import styles from './index.module.scss';
import CommentItem from '@/components/CommentItem';
import ReplySuggestion from '@/components/ReplySuggestion';
import { CommentData, ReplyTemplate, EmotionType, AccountInfo } from '@/types';
import { mockComments, generateReplySuggestions } from '@/data/comments';
import { getVideosByAccount } from '@/data/videos';
import { accountStore } from '@/store/account';
const RefreshControl = (props: any) => null;

type FilterType = 'all' | EmotionType | 'complaint' | 'praise';

const ReplyPage: React.FC = () => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<FilterType>('all');
  const [suggestions, setSuggestions] = useState<ReplyTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<AccountInfo>(accountStore.getCurrentAccount());

  useEffect(() => {
    const unsubscribe = accountStore.subscribe((account) => {
      setCurrentAccount(account);
      loadData(account.id);
    });
    return unsubscribe;
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
  });

  usePullDownRefresh(() => {
    loadData();
  });

  const filteredComments = comments.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'complaint') return c.category === 'complaint';
    if (filter === 'praise') return c.category === 'praise';
    return c.emotionType === filter;
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
      title: '确认使用',
      content: '确定使用此回复内容吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.setClipboardData({ data: content });
          Taro.showToast({ title: '已复制', icon: 'success' });
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
    return '此问题';
  };

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'negative', label: '负面' },
    { key: 'complaint', label: '吐槽' },
    { key: 'neutral', label: '中性' },
    { key: 'positive', label: '正面' },
    { key: 'praise', label: '好评' }
  ];

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <ScrollView scrollX className={styles.filterBar} showScrollbar={false}>
          {filters.map(f => (
            <View
              key={f.key}
              className={classNames(styles.filterItem, filter === f.key && styles.filterActive)}
              onClick={() => setFilter(f.key)}
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
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={loadData}
              title='加载中...'
            />
          }
        >
          {filteredComments.length > 0 ? (
            filteredComments.map(comment => (
              <CommentItem
                key={comment.id}
                comment={comment}
                selectable
                isSelected={selectedIds.has(comment.id)}
                onSelect={handleSelect}
              />
            ))
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
          className={styles.generateBtn}
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
