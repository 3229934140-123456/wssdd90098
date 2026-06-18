import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Button } from '@tarojs/components';
import Taro, { usePullDownRefresh, useDidShow } from '@tarojs/taro';
import classNames from 'classnames';
import styles from './index.module.scss';
import AlertCard from '@/components/AlertCard';
import { AlertData, RiskLevel, AccountInfo } from '@/types';
import { getAlerts } from '@/data/alerts';
import { accountStore } from '@/store/account';
const RefreshControl = (props: any) => null;

type FilterType = 'all' | RiskLevel;

const AlertPage: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(false);
  const [showBrief, setShowBrief] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<AlertData | null>(null);
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
    console.log('[AlertPage] 加载风险提醒, 账号:', id);
    setLoading(true);
    try {
      const data = getAlerts(id);
      setAlerts(data);
    } catch (error) {
      console.error('[AlertPage] 数据加载失败:', error);
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

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'all') return true;
    return a.level === filter;
  });

  const highCount = alerts.filter(a => a.level === 'high').length;
  const mediumCount = alerts.filter(a => a.level === 'medium').length;
  const lowCount = alerts.filter(a => a.level === 'low').length;

  const handleForward = (alert: AlertData) => {
    console.log('[AlertPage] 查看简报:', alert.id);
    setSelectedAlert(alert);
    setShowBrief(true);
  };

  const handleCopyBrief = async () => {
    if (!selectedAlert) return;
    console.log('[AlertPage] 复制简报');
    try {
      await Taro.setClipboardData({ data: selectedAlert.briefContent });
      Taro.showToast({ title: '简报已复制', icon: 'success' });
      setShowBrief(false);
    } catch (error) {
      console.error('[AlertPage] 复制失败:', error);
      Taro.showToast({ title: '复制失败', icon: 'error' });
    }
  };

  const filters: { key: FilterType; label: string; count: number; className?: string }[] = [
    { key: 'all', label: '全部', count: alerts.length },
    { key: 'high', label: '高风险', count: highCount, className: styles.filterActive },
    { key: 'medium', label: '中风险', count: mediumCount, className: styles.filterMedium },
    { key: 'low', label: '低风险', count: lowCount, className: styles.filterLow }
  ];

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <Text className={styles.title}>风险提醒</Text>
        <Text className={styles.subtitle}>实时监控负面评论动态，及时发现潜在危机</Text>

        <ScrollView scrollX className={styles.filterBar} showScrollbar={false}>
          {filters.map(f => (
            <View
              key={f.key}
              className={classNames(
                styles.filterItem,
                filter === f.key && (f.className || styles.filterActive)
              )}
              onClick={() => setFilter(f.key)}
            >
              {f.label} ({f.count})
            </View>
          ))}
        </ScrollView>
      </View>

      <View className={styles.content}>
        <View className={styles.summary}>
          <View className={styles.summaryCard}>
            <Text className={styles.summaryValue} style={{ color: '#F53F3F' }}>{highCount}</Text>
            <Text className={styles.summaryLabel}>高风险</Text>
          </View>
          <View className={styles.summaryCard}>
            <Text className={styles.summaryValue} style={{ color: '#FF7D00' }}>{mediumCount}</Text>
            <Text className={styles.summaryLabel}>中风险</Text>
          </View>
          <View className={styles.summaryCard}>
            <Text className={styles.summaryValue} style={{ color: '#00B42A' }}>{lowCount}</Text>
            <Text className={styles.summaryLabel}>低风险</Text>
          </View>
        </View>

        <ScrollView
          scrollY
          className={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={loadData}
              title='加载中...'
            />
          }
        >
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onForward={handleForward}
              />
            ))
          ) : (
            <View className={styles.empty}>
              <Text>暂无{filter === 'all' ? '' : filters.find(f => f.key === filter)?.label}风险提醒</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {showBrief && selectedAlert && (
        <View className={styles.briefModal} onClick={() => setShowBrief(false)}>
          <View className={styles.briefContent} onClick={e => e.stopPropagation()}>
            <Text className={styles.briefTitle}>风险简报</Text>
            <Text className={styles.briefText}>{selectedAlert.briefContent}</Text>
            <View className={styles.briefActions}>
              <Button
                className={classNames(styles.briefBtn, styles.closeBtn)}
                onClick={() => setShowBrief(false)}
              >
                关闭
              </Button>
              <Button
                className={classNames(styles.briefBtn, styles.copyBtn)}
                onClick={handleCopyBrief}
              >
                复制转发
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default AlertPage;
