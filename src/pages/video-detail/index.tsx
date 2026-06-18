import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Button } from '@tarojs/components';
import Taro, { useRouter, useDidShow } from '@tarojs/taro';
import classNames from 'classnames';
import styles from './index.module.scss';
import EmotionChart from '@/components/EmotionChart';
import { VideoData, EmotionAnalysis } from '@/types';
import { getVideoById } from '@/data/videos';
import { getEmotionAnalysis } from '@/data/comments';
import { getEmotionScoreColor, getEmotionTemperatureLabel, formatCount } from '@/utils/emotion';

type TabType = 'praise' | 'complaint' | 'misunderstanding';

const VideoDetailPage: React.FC = () => {
  const router = useRouter();
  const [video, setVideo] = useState<VideoData | null>(null);
  const [analysis, setAnalysis] = useState<EmotionAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('praise');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = router.params.id as string;
    console.log('[VideoDetail] 加载视频详情:', id);
    loadData(id);
  }, [router.params.id]);

  useDidShow(() => {
    const id = router.params.id as string;
    if (id) {
      loadData(id);
    }
  });

  const loadData = async (id: string) => {
    setLoading(true);
    try {
      const videoData = getVideoById(id);
      if (videoData) {
        setVideo(videoData);
        const analysisData = getEmotionAnalysis(id);
        setAnalysis(analysisData);
      } else {
        Taro.showToast({ title: '视频不存在', icon: 'error' });
      }
    } catch (error) {
      console.error('[VideoDetail] 加载失败:', error);
      Taro.showToast({ title: '加载失败', icon: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoReply = () => {
    console.log('[VideoDetail] 跳转到回复辅助');
    Taro.switchTab({ url: '/pages/reply/index' });
  };

  const handleBack = () => {
    Taro.navigateBack();
  };

  if (!video || !analysis) {
    return (
      <View className={styles.empty}>
        <Text>加载中...</Text>
      </View>
    );
  }

  const scoreColor = getEmotionScoreColor(video.emotionScore);
  const tempLabel = getEmotionTemperatureLabel(video.emotionScore);
  const pointerLeft = Math.max(0, Math.min(100, video.emotionScore));

  const tabs: { key: TabType; label: string; icon: string; count: number }[] = [
    { key: 'praise', label: '典型好评', icon: '👍', count: analysis.typicalPraises.length },
    { key: 'complaint', label: '集中吐槽', icon: '🔥', count: analysis.concentratedComplaints.length },
    { key: 'misunderstanding', label: '疑似误解', icon: '❓', count: analysis.suspectedMisunderstandings.length }
  ];

  return (
    <View>
      <ScrollView scrollY className={styles.page}>
        <View className={styles.videoHeader}>
          <View className={styles.videoInfo}>
            <Image
              className={styles.cover}
              src={video.coverUrl}
              mode='aspectFill'
              onError={(e) => console.error('[VideoDetail] 封面加载失败:', e.detail)}
            />
            <View className={styles.videoMeta}>
              <Text className={styles.title}>{video.title}</Text>
              <View className={styles.stats}>
                <Text className={styles.statItem}>👁 {formatCount(video.viewCount)}</Text>
                <Text className={styles.statItem}>👍 {formatCount(video.likeCount)}</Text>
                <Text className={styles.statItem}>💬 {formatCount(video.commentCount)}</Text>
                <Text className={styles.statItem}>🔄 {formatCount(video.shareCount)}</Text>
              </View>
            </View>
          </View>

          <View className={styles.emotionScore}>
            <Text className={styles.emotionValue} style={{ color: scoreColor }}>
              {video.emotionScore}分
            </Text>
            <Text className={styles.emotionLabel} style={{ color: scoreColor }}>
              情绪温度：{tempLabel}
            </Text>
            <View className={styles.emotionThermometer}>
              <View className={styles.emotionPointer} style={{ left: `${pointerLeft}%` }} />
            </View>
            <View className={styles.emotionScale}>
              <Text>抵触 0</Text>
              <Text>平和 50</Text>
              <Text>热情 100</Text>
            </View>
          </View>
        </View>

        <View className={styles.chartSection}>
          <EmotionChart distribution={video.emotionDistribution} />
        </View>

        <View className={styles.tabs}>
          {tabs.map(tab => (
            <View
              key={tab.key}
              className={classNames(styles.tabItem, activeTab === tab.key && styles.tabActive)}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon} {tab.label} ({tab.count})
            </View>
          ))}
        </View>

        <View className={styles.content}>
          {activeTab === 'praise' && (
            <View className={styles.section}>
              <Text className={styles.sectionTitle}>
                <Text className={styles.sectionIcon}>👍</Text>
                典型好评
              </Text>
              {analysis.typicalPraises.length > 0 ? (
                analysis.typicalPraises.map(comment => (
                  <View key={comment.id} className={styles.praiseItem}>
                    <View className={styles.praiseHeader}>
                      <Text className={styles.praiseUser}>{comment.userName}</Text>
                      <Text style={{ fontSize: 20, color: '#86909C' }}>
                        👍 {comment.likeCount}
                      </Text>
                    </View>
                    <Text className={styles.praiseContent}>{comment.content}</Text>
                  </View>
                ))
              ) : (
                <View className={styles.empty}>
                  <Text>暂无典型好评</Text>
                </View>
              )}
            </View>
          )}

          {activeTab === 'complaint' && (
            <View className={styles.section}>
              <Text className={styles.sectionTitle}>
                <Text className={styles.sectionIcon}>🔥</Text>
                集中吐槽点
              </Text>
              {analysis.concentratedComplaints.length > 0 ? (
                analysis.concentratedComplaints.map((group, index) => (
                  <View key={index} className={styles.complaintGroup}>
                    <View className={styles.complaintHeader}>
                      <View className={styles.complaintKeyword}>
                        <Text className={styles.keywordTag}># {group.keyword}</Text>
                        <Text className={styles.complaintCount}>{group.count}条吐槽</Text>
                      </View>
                    </View>
                    <View className={styles.complaintExamples}>
                      {group.examples.map(example => (
                        <Text key={example.id} className={styles.complaintItem}>
                          「{example.userName}」{example.content}
                        </Text>
                      ))}
                    </View>
                  </View>
                ))
              ) : (
                <View className={styles.empty}>
                  <Text>暂无集中吐槽</Text>
                </View>
              )}
            </View>
          )}

          {activeTab === 'misunderstanding' && (
            <View className={styles.section}>
              <Text className={styles.sectionTitle}>
                <Text className={styles.sectionIcon}>❓</Text>
                疑似误解点
              </Text>
              {analysis.suspectedMisunderstandings.length > 0 ? (
                analysis.suspectedMisunderstandings.map(comment => (
                  <View key={comment.id} className={styles.misunderstandingItem}>
                    <View className={styles.misunderstandingHeader}>
                      <Text className={styles.misunderstandingTag}>疑似误解</Text>
                      <Text className={styles.misunderstandingUser}>{comment.userName}</Text>
                    </View>
                    <Text className={styles.misunderstandingContent}>{comment.content}</Text>
                    <Text className={styles.misunderstandingHint}>
                      💡 该评论可能对视频内容存在误解，建议温和引导澄清事实
                    </Text>
                  </View>
                ))
              ) : (
                <View className={styles.empty}>
                  <Text>暂无疑似误解</Text>
                </View>
              )}
            </View>
          )}
        </View>

        <View style={{ height: 140 }} />
      </ScrollView>

      <View className={styles.actionBar}>
        <Button className={classNames(styles.actionBtn, styles.backBtn)} onClick={handleBack}>
          返回
        </Button>
        <Button className={classNames(styles.actionBtn, styles.replyBtn)} onClick={handleGoReply}>
          去回复
        </Button>
      </View>
    </View>
  );
};

export default VideoDetailPage;
