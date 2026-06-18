import { VideoData, AccountInfo } from '@/types';

export const mockAccounts: AccountInfo[] = [
  {
    id: 'acc1',
    name: '科技产品测评',
    avatarUrl: 'https://picsum.photos/id/1/200/200',
    followerCount: 1256000
  },
  {
    id: 'acc2',
    name: '生活好物分享',
    avatarUrl: 'https://picsum.photos/id/64/200/200',
    followerCount: 892000
  }
];

export const mockVideos: VideoData[] = [
  {
    id: 'v1',
    title: '新款旗舰手机深度测评：这次真的不一样！',
    coverUrl: 'https://picsum.photos/id/1/750/500',
    publishTime: '2026-06-18 14:30',
    viewCount: 1256000,
    likeCount: 89200,
    commentCount: 12356,
    shareCount: 4521,
    emotionScore: 35,
    emotionLabel: 'negative',
    negativeGrowthRate: 45,
    controversyKeywords: ['发热', '续航', '价格'],
    emotionDistribution: {
      positive: 25,
      neutral: 30,
      negative: 45
    }
  },
  {
    id: 'v2',
    title: '千元机皇大比拼，谁才是真正的性价比之王',
    coverUrl: 'https://picsum.photos/id/2/750/500',
    publishTime: '2026-06-17 10:00',
    viewCount: 892000,
    likeCount: 67800,
    commentCount: 8956,
    shareCount: 3210,
    emotionScore: 78,
    emotionLabel: 'positive',
    negativeGrowthRate: 5,
    controversyKeywords: ['系统', '拍照'],
    emotionDistribution: {
      positive: 65,
      neutral: 25,
      negative: 10
    }
  },
  {
    id: 'v3',
    title: '实测：无线耳机的音质真的不如有线吗？',
    coverUrl: 'https://picsum.photos/id/3/750/500',
    publishTime: '2026-06-16 16:45',
    viewCount: 567000,
    likeCount: 45600,
    commentCount: 5623,
    shareCount: 1890,
    emotionScore: 52,
    emotionLabel: 'neutral',
    negativeGrowthRate: 18,
    controversyKeywords: ['延迟', '音质', '佩戴'],
    emotionDistribution: {
      positive: 40,
      neutral: 35,
      negative: 25
    }
  },
  {
    id: 'v4',
    title: '智能手表续航实测：3天还是7天？',
    coverUrl: 'https://picsum.photos/id/6/750/500',
    publishTime: '2026-06-15 09:30',
    viewCount: 445000,
    likeCount: 32100,
    commentCount: 3456,
    shareCount: 1230,
    emotionScore: 85,
    emotionLabel: 'positive',
    negativeGrowthRate: 2,
    controversyKeywords: ['功能'],
    emotionDistribution: {
      positive: 72,
      neutral: 20,
      negative: 8
    }
  },
  {
    id: 'v5',
    title: '避坑指南：这些数码产品千万别买！',
    coverUrl: 'https://picsum.photos/id/8/750/500',
    publishTime: '2026-06-14 18:00',
    viewCount: 2156000,
    likeCount: 156000,
    commentCount: 23456,
    shareCount: 12340,
    emotionScore: 28,
    emotionLabel: 'negative',
    negativeGrowthRate: 68,
    controversyKeywords: ['投诉', '维权', '虚假宣传'],
    emotionDistribution: {
      positive: 15,
      neutral: 22,
      negative: 63
    }
  },
  {
    id: 'v6',
    title: '2026年最佳配件推荐，提升幸福感的小物件',
    coverUrl: 'https://picsum.photos/id/9/750/500',
    publishTime: '2026-06-13 12:00',
    viewCount: 678000,
    likeCount: 56700,
    commentCount: 6789,
    shareCount: 4560,
    emotionScore: 82,
    emotionLabel: 'positive',
    negativeGrowthRate: 3,
    controversyKeywords: ['价格'],
    emotionDistribution: {
      positive: 70,
      neutral: 22,
      negative: 8
    }
  },
  {
    id: 'v7',
    title: '平板电脑选购全攻略：生产力还是爱奇艺？',
    coverUrl: 'https://picsum.photos/id/119/750/500',
    publishTime: '2026-06-12 15:30',
    viewCount: 789000,
    likeCount: 67800,
    commentCount: 7890,
    shareCount: 2340,
    emotionScore: 58,
    emotionLabel: 'neutral',
    negativeGrowthRate: 12,
    controversyKeywords: ['软件生态', '价格'],
    emotionDistribution: {
      positive: 45,
      neutral: 32,
      negative: 23
    }
  },
  {
    id: 'v8',
    title: '居家办公必备神器，效率提升200%',
    coverUrl: 'https://picsum.photos/id/160/750/500',
    publishTime: '2026-06-11 11:00',
    viewCount: 567000,
    likeCount: 45600,
    commentCount: 4567,
    shareCount: 3450,
    emotionScore: 75,
    emotionLabel: 'positive',
    negativeGrowthRate: 6,
    controversyKeywords: ['性价比'],
    emotionDistribution: {
      positive: 62,
      neutral: 28,
      negative: 10
    }
  }
];

export const getVideosByAccount = (accountId: string): VideoData[] => {
  console.log('[VideoService] 获取账号视频列表:', accountId);
  return mockVideos;
};

export const getVideoById = (id: string): VideoData | undefined => {
  console.log('[VideoService] 获取视频详情:', id);
  return mockVideos.find(v => v.id === id);
};
