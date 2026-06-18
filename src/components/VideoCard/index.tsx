import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import styles from './index.module.scss';
import EmotionIndicator from '@/components/EmotionIndicator';
import { VideoData, ProcessingStatus } from '@/types';
import { formatCount, getEmotionScoreColor, getProcessingStatusLabel, getProcessingStatusColor, getProcessingStatusBgColor } from '@/utils/emotion';
import { processingStore } from '@/store/processing';

interface VideoCardProps {
  video: VideoData;
  processingStatus?: ProcessingStatus;
  onClick?: (video: VideoData) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const status = processingStore.getVideoStatus(video.id);

  const handleClick = () => {
    console.log('[VideoCard] 点击视频:', video.id);
    if (onClick) {
      onClick(video);
    } else {
      Taro.navigateTo({
        url: `/pages/video-detail/index?id=${video.id}`
      });
    }
  };

  return (
    <View className={styles.card} onClick={handleClick}>
      <View className={styles.header}>
        <Image
          className={styles.cover}
          src={video.coverUrl}
          mode='aspectFill'
          onError={(e) => console.error('[VideoCard] 图片加载失败:', e.detail)}
        />
        <View className={styles.titleSection}>
          <View className={styles.titleRow}>
            <Text className={styles.title}>{video.title}</Text>
            <View
              className={styles.statusTag}
              style={{
                color: getProcessingStatusColor(status),
                backgroundColor: getProcessingStatusBgColor(status)
              }}
            >
              {getProcessingStatusLabel(status)}
            </View>
          </View>
          <View className={styles.meta}>
            <Text>{video.publishTime}</Text>
            <Text>👁 {formatCount(video.viewCount)}</Text>
            <Text>💬 {formatCount(video.commentCount)}</Text>
          </View>
        </View>
      </View>

      <View className={styles.emotionSection}>
        <EmotionIndicator score={video.emotionScore} />
      </View>

      <View className={styles.statsRow}>
        <View className={styles.statItem}>
          <Text className={styles.statLabel}>情绪温度</Text>
          <Text
            className={styles.statValue}
            style={{ color: getEmotionScoreColor(video.emotionScore) }}
          >
            {video.emotionScore}
          </Text>
        </View>
        <View className={styles.statItem}>
          <Text className={styles.statLabel}>负面增速</Text>
          <Text
            className={classNames(video.negativeGrowthRate >= 30 ? styles.growthWarning : styles.growthNormal)}
          >
            {video.negativeGrowthRate >= 30 ? '↑' : '→'} {video.negativeGrowthRate}%
          </Text>
        </View>
        <View className={styles.statItem}>
          <Text className={styles.statLabel}>情绪分布</Text>
          <Text className={styles.statUnit} style={{ color: getEmotionScoreColor(video.emotionScore) }}>
            {video.emotionDistribution.positive}/{video.emotionDistribution.neutral}/{video.emotionDistribution.negative}
          </Text>
        </View>
      </View>

      <View className={styles.keywords}>
        {video.controversyKeywords.map((keyword, index) => (
          <Text key={index} className={styles.keywordTag}>
            # {keyword}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default VideoCard;
