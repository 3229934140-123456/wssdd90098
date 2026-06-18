import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { useDidShow, usePullDownRefresh } from '@tarojs/taro';
import classNames from 'classnames';
const RefreshControl = (_props: any) => null;
import styles from './index.module.scss';
import VideoCard from '@/components/VideoCard';
import { VideoData, AccountInfo, EmotionType, ProcessingStatus } from '@/types';
import { getVideosByAccount, mockAccounts } from '@/data/videos';
import { formatCount } from '@/utils/emotion';
import { accountStore } from '@/store/account';
import { processingStore } from '@/store/processing';

type EmotionFilter = 'all' | EmotionType;
type StatusFilter = 'all' | ProcessingStatus;

const HomePage: React.FC = () => {
  const [currentAccount, setCurrentAccount] = useState<AccountInfo>(accountStore.getCurrentAccount());
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [emotionFilter, setEmotionFilter] = useState<EmotionFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [loading, setLoading] = useState(false);
  const [showAccountPicker, setShowAccountPicker] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubAccount = accountStore.subscribe((account) => {
      setCurrentAccount(account);
    });
    const unsubProcessing = processingStore.subscribe(() => {
      setTick(t => t + 1);
    });
    return () => {
      unsubAccount();
      unsubProcessing();
    };
  }, []);

  const loadData = useCallback(() => {
    console.log('[HomePage] 加载数据，账号:', currentAccount.id);
    setLoading(true);
    try {
      const data = getVideosByAccount(currentAccount.id);
      setVideos(data);
    } catch (error) {
      console.error('[HomePage] 数据加载失败:', error);
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
    console.log('[HomePage] 页面显示');
    loadData();
    setTick(t => t + 1);
  });

  usePullDownRefresh(() => {
    console.log('[HomePage] 下拉刷新');
    loadData();
  });

  const filteredVideos = videos.filter(v => {
    const emotionMatch = emotionFilter === 'all' || v.emotionLabel === emotionFilter;
    const statusMatch = statusFilter === 'all' || processingStore.getVideoStatus(v.id) === statusFilter;
    return emotionMatch && statusMatch;
  });

  const highRiskCount = videos.filter(v => v.negativeGrowthRate >= 40).length;
  const unprocessedCount = videos.filter(v => processingStore.getVideoStatus(v.id) === 'unprocessed').length;

  const handleAccountClick = () => {
    console.log('[HomePage] 点击账号选择');
    setShowAccountPicker(!showAccountPicker);
  };

  const handleAccountSelect = (account: AccountInfo) => {
    console.log('[HomePage] 切换账号:', account.id);
    accountStore.setCurrentAccount(account);
    setShowAccountPicker(false);
    Taro.showToast({ title: `已切换到${account.name}`, icon: 'none' });
  };

  const emotionFilters: { key: EmotionFilter; label: string }[] = [
    { key: 'all', label: '全部作品' },
    { key: 'negative', label: '负面预警' },
    { key: 'neutral', label: '中性待观察' },
    { key: 'positive', label: '正面反馈' }
  ];

  const statusFilters: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: '全部状态' },
    { key: 'unprocessed', label: '未处理' },
    { key: 'processing', label: '处理中' },
    { key: 'handled', label: '已安抚' }
  ];

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <View className={styles.accountSelector} onClick={handleAccountClick}>
          <View className={styles.accountInfo}>
            <Image
              className={styles.avatar}
              src={currentAccount.avatarUrl}
              mode='aspectFill'
              onError={(e) => console.error('[HomePage] 头像加载失败:', e.detail)}
            />
            <View className={styles.accountDetail}>
              <Text className={styles.accountName}>{currentAccount.name}</Text>
              <Text className={styles.accountDesc}>
                粉丝 {formatCount(currentAccount.followerCount)}
              </Text>
            </View>
          </View>
          <Text className={styles.dropdownIcon}>▼</Text>
        </View>

        {showAccountPicker && (
          <View style={{ marginBottom: 16 }}>
            {mockAccounts.map(acc => (
              <View
                key={acc.id}
                onClick={() => handleAccountSelect(acc)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 16,
                  background: currentAccount.id === acc.id ? 'rgba(22,93,255,0.1)' : '#fff',
                  borderRadius: 12,
                  marginBottom: 8
                }}
              >
                <Image
                  src={acc.avatarUrl}
                  style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12 }}
                  mode='aspectFill'
                />
                <View>
                  <Text style={{ fontWeight: 500 }}>{acc.name}</Text>
                  <Text style={{ fontSize: 12, color: '#86909C' }}>
                    粉丝 {formatCount(acc.followerCount)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

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
            >
              {f.label}
            </View>
          ))}
        </ScrollView>
      </View>

      <View className={styles.content}>
        <View className={styles.summary}>
          <View className={styles.summaryCard}>
            <Text className={styles.summaryValue} style={{ color: '#F53F3F' }}>{unprocessedCount}</Text>
            <Text className={styles.summaryLabel}>待处理</Text>
          </View>
          <View className={styles.summaryCard}>
            <Text className={styles.summaryValue} style={{ color: '#FF7D00' }}>{highRiskCount}</Text>
            <Text className={styles.summaryLabel}>高风险</Text>
          </View>
          <View className={styles.summaryCard}>
            <Text className={styles.summaryValue} style={{ color: '#165DFF' }}>{videos.length}</Text>
            <Text className={styles.summaryLabel}>作品总数</Text>
          </View>
        </View>

        <ScrollView
          scrollY
          className={styles.list}
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
          {filteredVideos.length > 0 ? (
            filteredVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))
          ) : (
            <View className={styles.empty}>
              <Text>暂无符合条件的作品</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomePage;
