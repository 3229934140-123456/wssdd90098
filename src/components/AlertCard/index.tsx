import React from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import styles from './index.module.scss';
import { AlertData } from '@/types';
import { getRiskLevelLabel } from '@/utils/emotion';

interface AlertCardProps {
  alert: AlertData;
  onForward?: (alert: AlertData) => void;
  onView?: (alert: AlertData) => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, onForward, onView }) => {
  const handleForward = async () => {
    console.log('[AlertCard] 转发提醒:', alert.id);
    try {
      await Taro.setClipboardData({ data: alert.briefContent });
      Taro.showToast({ title: '简报已复制', icon: 'success' });
    } catch (error) {
      console.error('[AlertCard] 复制失败:', error);
    }
    if (onForward) {
      onForward(alert);
    }
  };

  const handleView = () => {
    console.log('[AlertCard] 查看详情:', alert.videoId);
    Taro.navigateTo({
      url: `/pages/video-detail/index?id=${alert.videoId}`
    });
    if (onView) {
      onView(alert);
    }
  };

  const levelClass = alert.level === 'high' ? styles.high
    : alert.level === 'medium' ? styles.medium
    : styles.low;

  const levelTagClass = alert.level === 'high' ? styles.levelHigh
    : alert.level === 'medium' ? styles.levelMedium
    : styles.levelLow;

  const valueClass = alert.level === 'high' ? styles.highValue
    : alert.level === 'medium' ? styles.mediumValue
    : styles.lowValue;

  return (
    <View className={classNames(styles.container, levelClass)}>
      <View className={styles.header}>
        <View className={styles.left}>
          <Text className={classNames(styles.levelTag, levelTagClass)}>
            {getRiskLevelLabel(alert.level)}
          </Text>
          <Text className={styles.title}>{alert.title}</Text>
          <Text className={styles.videoTitle}>作品：{alert.videoTitle}</Text>
        </View>
        <Text className={styles.time}>{alert.createTime}</Text>
      </View>

      <Text className={styles.description}>{alert.description}</Text>

      <View className={styles.stats}>
        <View className={styles.statItem}>
          <Text className={styles.statLabel}>负面评论</Text>
          <Text className={classNames(styles.statValue, valueClass)}>{alert.negativeCount}</Text>
        </View>
        <View className={styles.statItem}>
          <Text className={styles.statLabel}>增长率</Text>
          <Text className={classNames(styles.statValue, valueClass)}>↑{alert.growthRate}%</Text>
        </View>
      </View>

      {alert.keyword && (
        <View className={styles.keywords}>
          {alert.keyword.split('、').map((kw, index) => (
            <Text key={index} className={styles.keywordTag}>
              # {kw}
            </Text>
          ))}
        </View>
      )}

      <View className={styles.actions}>
        <Button className={classNames(styles.actionBtn, styles.viewBtn)} onClick={handleView}>
          查看作品
        </Button>
        <Button className={classNames(styles.actionBtn, styles.forwardBtn)} onClick={handleForward}>
          转发简报
        </Button>
      </View>
    </View>
  );
};

export default AlertCard;
