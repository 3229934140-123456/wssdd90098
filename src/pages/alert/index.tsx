import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Button } from '@tarojs/components';
import Taro, { usePullDownRefresh, useDidShow } from '@tarojs/taro';
import classNames from 'classnames';
import styles from './index.module.scss';
import AlertCard from '@/components/AlertCard';
import { AlertData, RiskLevel, AccountInfo, ProcessingStatus } from '@/types';
import { getAlerts } from '@/data/alerts';
import { accountStore } from '@/store/account';
import { processingStore } from '@/store/processing';
import { getProcessingStatusColor } from '@/utils/emotion';
const RefreshControl = (_props: any) => null;

type RiskFilter = 'all' | RiskLevel;
type StatusFilter = 'all' | ProcessingStatus;

const AlertPage: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [riskFilter, setRiskFilter] = useState<RiskFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [loading, setLoading] = useState(false);
  const [showBrief, setShowBrief] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<AlertData | null>(null);
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
    setTick(t => t + 1);
  });

  usePullDownRefresh(() => {
    loadData();
  });

  const filteredAlerts = alerts
    .filter(a => {
      const riskMatch = riskFilter === 'all' || a.level === riskFilter;
      const statusMatch = statusFilter === 'all' || processingStore.getAlertStatus(a.id) === statusFilter;
      return riskMatch && statusMatch;
    })
    .sort((a, b) => {
      const statusPriority: Record<ProcessingStatus, number> = { unprocessed: 0, processing: 1, handled: 2 };
      const aStatus = statusPriority[processingStore.getAlertStatus(a.id)];
      const bStatus = statusPriority[processingStore.getAlertStatus(b.id)];
      if (aStatus !== bStatus) return aStatus - bStatus;
      const levelPriority: Record<RiskLevel, number> = { high: 0, medium: 1, low: 2 };
      const aLevel = levelPriority[a.level];
      const bLevel = levelPriority[b.level];
      if (aLevel !== bLevel) return aLevel - bLevel;
      return new Date(b.triggerTime).getTime() - new Date(a.triggerTime).getTime();
    });

  const highCount = alerts.filter(a => a.level === 'high').length;
  const mediumCount = alerts.filter(a => a.level === 'medium').length;
  const lowCount = alerts.filter(a => a.level === 'low').length;

  const unprocessedCount = alerts.filter(a => processingStore.getAlertStatus(a.id) === 'unprocessed').length;
  const processingCount = alerts.filter(a => processingStore.getAlertStatus(a.id) === 'processing').length;
  const handledCount = alerts.filter(a => processingStore.getAlertStatus(a.id) === 'handled').length;

  const handleForward = (alert: AlertData) => {
    console.log('[AlertPage] 查看简报:', alert.id);
    setSelectedAlert(alert);
    setShowBrief(true);
  };

  const handleStatusChange = (alertId: string, status: ProcessingStatus) => {
    processingStore.setAlertStatus(alertId, status);
    Taro.showToast({ title: '状态已更新', icon: 'success' });
  };

  const handleCopyBrief = async () => {
    if (!selectedAlert) return;
    console.log('[AlertPage] 复制简报');
    try {
      await Taro.setClipboardData({ data: selectedAlert.briefContent });
      processingStore.setAlertStatus(selectedAlert.id, 'processing');
      Taro.showToast({ title: '简报已复制', icon: 'success' });
      setShowBrief(false);
    } catch (error) {
      console.error('[AlertPage] 复制失败:', error);
      Taro.showToast({ title: '复制失败', icon: 'error' });
    }
  };

  const riskFilters: { key: RiskFilter; label: string; count: number; className?: string }[] = [
    { key: 'all', label: '全部', count: alerts.length },
    { key: 'high', label: '高风险', count: highCount, className: styles.filterActive },
    { key: 'medium', label: '中风险', count: mediumCount, className: styles.filterMedium },
    { key: 'low', label: '低风险', count: lowCount, className: styles.filterLow }
  ];

  const statusFilters: { key: StatusFilter; label: string; count: number }[] = [
    { key: 'all', label: '全部状态', count: alerts.length },
    { key: 'unprocessed', label: '未处理', count: unprocessedCount },
    { key: 'processing', label: '处理中', count: processingCount },
    { key: 'handled', label: '已安抚', count: handledCount }
  ];

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <Text className={styles.title}>风险提醒</Text>
        <Text className={styles.subtitle}>实时监控负面评论动态，及时发现潜在危机</Text>

        <ScrollView scrollX className={styles.filterBar} showScrollbar={false}>
          {riskFilters.map(f => (
            <View
              key={f.key}
              className={classNames(
                styles.filterItem,
                riskFilter === f.key && (f.className || styles.filterActive)
              )}
              onClick={() => setRiskFilter(f.key)}
            >
              {f.label} ({f.count})
            </View>
          ))}
        </ScrollView>

        <ScrollView scrollX className={styles.filterBar} showScrollbar={false}>
          {statusFilters.map(f => (
            <View
              key={f.key}
              className={classNames(
                styles.filterItemSmall,
                statusFilter === f.key && styles.filterActive
              )}
              style={statusFilter === f.key && f.key !== 'all' ? { background: getProcessingStatusColor(f.key as ProcessingStatus) } : {}}
              onClick={() => setStatusFilter(f.key)}
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
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onForward={handleForward}
                processingStatus={processingStore.getAlertStatus(alert.id)}
                onStatusChange={(status) => handleStatusChange(alert.id, status)}
              />
            ))
          ) : (
            <View className={styles.empty}>
              <Text>暂无{riskFilter === 'all' ? '' : riskFilters.find(f => f.key === riskFilter)?.label}风险提醒</Text>
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
