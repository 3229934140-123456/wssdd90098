import React from 'react';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames';
import styles from './index.module.scss';
import { getEmotionColor } from '@/utils/emotion';
import { EmotionType } from '@/types';

interface EmotionChartProps {
  distribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

const EmotionChart: React.FC<EmotionChartProps> = ({ distribution }) => {
  const bars = [
    { key: 'positive' as EmotionType, label: '正面', value: distribution.positive },
    { key: 'neutral' as EmotionType, label: '中性', value: distribution.neutral },
    { key: 'negative' as EmotionType, label: '负面', value: distribution.negative }
  ];

  return (
    <View className={styles.container}>
      <Text className={styles.title}>评论情绪分布</Text>
      <View className={styles.chart}>
        {bars.map((bar) => (
          <View key={bar.key} className={styles.barItem}>
            <Text className={styles.barLabel}>{bar.label}</Text>
            <View className={styles.barContainer}>
              <View
                className={classNames(styles.barFill, styles[bar.key])}
                style={{ width: `${bar.value}%` }}
              />
            </View>
            <Text className={classNames(styles.barValue, styles[bar.key])}>
              {bar.value}%
            </Text>
          </View>
        ))}
      </View>
      <View className={styles.legend}>
        {bars.map((bar) => (
          <View key={bar.key} className={styles.legendItem}>
            <View
              className={styles.legendDot}
              style={{ backgroundColor: getEmotionColor(bar.key) }}
            />
            <Text>{bar.label}评论</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default EmotionChart;
