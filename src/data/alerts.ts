import { AlertData } from '@/types';

export const mockAlerts: AlertData[] = [
  {
    id: 'a1',
    videoId: 'v5',
    videoTitle: '避坑指南：这些数码产品千万别买！',
    type: 'sensitive_keyword',
    level: 'high',
    title: '检测到维权投诉关键词',
    description: '评论区出现大量"投诉"、"维权"、"12315"等关键词，存在品牌风险',
    keyword: '维权、投诉',
    negativeCount: 892,
    growthRate: 68,
    createTime: '2026-06-19 11:00',
    briefContent: '【紧急风险提醒】\n视频：《避坑指南：这些数码产品千万别买！》\n风险等级：高风险\n检测时间：2026-06-19 11:00\n\n风险描述：\n- 检测到敏感关键词：维权、投诉、12315\n- 负面评论数量：892条\n- 负面增长率：68%/小时\n- 典型评论："我要投诉！买了不到一周就坏了"、"已经打12315维权了"\n\n建议措施：\n1. 立即启动危机处理流程\n2. 安排专人跟进评论区回复\n3. 准备官方声明口径\n4. 同步客服团队关注相关咨询'
  },
  {
    id: 'a2',
    videoId: 'v1',
    videoTitle: '新款旗舰手机深度测评：这次真的不一样！',
    type: 'negative_growth',
    level: 'medium',
    title: '负面评论快速增长',
    description: '近2小时负面评论增长45%，主要集中在发热和续航问题',
    negativeCount: 567,
    growthRate: 45,
    createTime: '2026-06-19 10:30',
    briefContent: '【风险提醒】\n视频：《新款旗舰手机深度测评：这次真的不一样！》\n风险等级：中风险\n检测时间：2026-06-19 10:30\n\n风险描述：\n- 负面评论增长率：45%/2小时\n- 负面评论数量：567条\n- 主要争议点：发热、续航、价格\n- 典型评论："这手机也太烫了吧"、"续航真的很差"\n\n建议措施：\n1. 增加评论区巡检频率\n2. 准备发热和续航问题的统一回复口径\n3. 关注后续发展趋势'
  },
  {
    id: 'a3',
    videoId: 'v3',
    videoTitle: '实测：无线耳机的音质真的不如有线吗？',
    type: 'negative_growth',
    level: 'low',
    title: '负面评论小幅增长',
    description: '近4小时负面评论增长18%，用户反馈延迟和佩戴问题',
    negativeCount: 234,
    growthRate: 18,
    createTime: '2026-06-19 09:00',
    briefContent: '【风险提示】\n视频：《实测：无线耳机的音质真的不如有线吗？》\n风险等级：低风险\n检测时间：2026-06-19 09:00\n\n风险描述：\n- 负面评论增长率：18%/4小时\n- 负面评论数量：234条\n- 主要争议点：延迟、音质、佩戴\n\n建议措施：\n1. 持续关注评论区动态\n2. 可针对性回复用户疑问'
  },
  {
    id: 'a4',
    videoId: 'v7',
    videoTitle: '平板电脑选购全攻略：生产力还是爱奇艺？',
    type: 'complaint_risk',
    level: 'low',
    title: '价格争议预警',
    description: '评论区出现较多关于价格偏高的讨论，建议关注',
    keyword: '价格高',
    negativeCount: 156,
    growthRate: 12,
    createTime: '2026-06-18 16:00',
    briefContent: '【风险提示】\n视频：《平板电脑选购全攻略：生产力还是爱奇艺？》\n风险等级：低风险\n检测时间：2026-06-18 16:00\n\n风险描述：\n- 争议关键词：价格高、性价比\n- 负面评论数量：156条\n- 增长率：12%/日\n\n建议措施：\n1. 可准备价格相关的说明口径\n2. 持续关注用户反馈'
  }
];

export const getAlerts = (): AlertData[] => {
  console.log('[AlertService] 获取风险提醒列表');
  return [...mockAlerts].sort((a, b) => {
    const levelOrder = { high: 0, medium: 1, low: 2 };
    return levelOrder[a.level] - levelOrder[b.level];
  });
};

export const markAlertAsRead = (alertId: string): boolean => {
  console.log('[AlertService] 标记提醒已读:', alertId);
  return true;
};

export const forwardAlert = (alertId: string): boolean => {
  console.log('[AlertService] 转发提醒:', alertId);
  return true;
};
