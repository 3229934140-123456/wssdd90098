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
    accountId: 'acc1',
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
    accountId: 'acc1',
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
    accountId: 'acc1',
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
    accountId: 'acc1',
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
    accountId: 'acc1',
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
    accountId: 'acc2',
    title: '厨房神器推荐：这5件好物让做饭效率翻倍',
    coverUrl: 'https://picsum.photos/id/292/750/500',
    publishTime: '2026-06-18 15:00',
    viewCount: 678000,
    likeCount: 56700,
    commentCount: 4567,
    shareCount: 3450,
    emotionScore: 72,
    emotionLabel: 'positive',
    negativeGrowthRate: 4,
    controversyKeywords: ['价格'],
    emotionDistribution: {
      positive: 60,
      neutral: 28,
      negative: 12
    }
  },
  {
    id: 'v7',
    accountId: 'acc2',
    title: '平价护肤红黑榜：这些网红产品真的有用吗？',
    coverUrl: 'https://picsum.photos/id/325/750/500',
    publishTime: '2026-06-17 12:30',
    viewCount: 987000,
    likeCount: 78900,
    commentCount: 9876,
    shareCount: 5670,
    emotionScore: 42,
    emotionLabel: 'negative',
    negativeGrowthRate: 52,
    controversyKeywords: ['过敏', '没效果', '智商税'],
    emotionDistribution: {
      positive: 28,
      neutral: 24,
      negative: 48
    }
  },
  {
    id: 'v8',
    accountId: 'acc2',
    title: '收纳神器合集：20㎡出租屋也能住出豪宅感',
    coverUrl: 'https://picsum.photos/id/425/750/500',
    publishTime: '2026-06-16 14:00',
    viewCount: 543000,
    likeCount: 43200,
    commentCount: 3456,
    shareCount: 2340,
    emotionScore: 82,
    emotionLabel: 'positive',
    negativeGrowthRate: 3,
    controversyKeywords: ['质量'],
    emotionDistribution: {
      positive: 68,
      neutral: 22,
      negative: 10
    }
  },
  {
    id: 'v9',
    accountId: 'acc2',
    title: '实测网红零食：真的好吃还是营销出来的？',
    coverUrl: 'https://picsum.photos/id/431/750/500',
    publishTime: '2026-06-15 11:30',
    viewCount: 765000,
    likeCount: 54300,
    commentCount: 6543,
    shareCount: 3210,
    emotionScore: 55,
    emotionLabel: 'neutral',
    negativeGrowthRate: 15,
    controversyKeywords: ['口味', '价格', '分量'],
    emotionDistribution: {
      positive: 42,
      neutral: 33,
      negative: 25
    }
  }
];

export const getVideosByAccount = (accountId: string): VideoData[] => {
  console.log('[VideoService] 获取账号视频列表:', accountId);
  return mockVideos.filter(v => v.accountId === accountId);
};

export const getVideoById = (id: string): VideoData | undefined => {
  console.log('[VideoService] 获取视频详情:', id);
  return mockVideos.find(v => v.id === id);
};
