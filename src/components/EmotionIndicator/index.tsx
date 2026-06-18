import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import { getEmotionScoreColor, getEmotionTemperatureLabel } from '@/utils/emotion';

interface EmotionIndicatorProps {
  score: number;
  showLabel?: boolean;
  size?: 'small' | 'large';
}

const EmotionIndicator: React.FC<EmotionIndicatorProps> = ({
  score,
  showLabel = true,
  size = 'small'
}) => {
  const leftPercent = Math.max(0, Math.min(100, score));
  const scoreColor = getEmotionScoreColor(score);
  const tempLabel = getEmotionTemperatureLabel(score);

  return (
    <View className={styles.container}>
      {size === 'large' && (
        <>
          <Text className={styles.score} style={{ color: scoreColor }}>
            {score}分
          </Text>
          <Text className={styles.tempLabel} style={{ color: scoreColor }}>
            {tempLabel}
          </Text>
        </>
      )}
      <View className={styles.thermometer}>
        <View className={styles.pointer} style={{ left: `${leftPercent}%` }} />
      </View>
      {showLabel && (
        <View className={styles.label}>
          <Text>负面</Text>
          <Text>正面</Text>
        </View>
      )}
    </View>
  );
};

export default EmotionIndicator;
