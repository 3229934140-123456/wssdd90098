import { CommentData, EmotionAnalysis, ReplyTemplate } from '@/types';

export const mockComments: CommentData[] = [
  {
    id: 'c1',
    videoId: 'v1',
    userName: '数码爱好者小王',
    avatarUrl: 'https://picsum.photos/id/64/200/200',
    content: '这手机也太烫了吧，才玩了十分钟就暖手宝了！',
    publishTime: '2026-06-19 10:23',
    likeCount: 156,
    emotionType: 'negative',
    emotionScore: 25,
    category: 'complaint'
  },
  {
    id: 'c2',
    videoId: 'v1',
    userName: '科技小白001',
    avatarUrl: 'https://picsum.photos/id/91/200/200',
    content: '实测续航真的很差，轻度使用都撑不到一天',
    publishTime: '2026-06-19 09:45',
    likeCount: 234,
    emotionType: 'negative',
    emotionScore: 30,
    category: 'complaint'
  },
  {
    id: 'c3',
    videoId: 'v1',
    userName: '理性消费者',
    avatarUrl: 'https://picsum.photos/id/177/200/200',
    content: '这个价格确实偏高，同价位有更好的选择',
    publishTime: '2026-06-19 09:12',
    likeCount: 189,
    emotionType: 'negative',
    emotionScore: 35,
    category: 'complaint'
  },
  {
    id: 'c4',
    videoId: 'v1',
    userName: '忠实粉丝老周',
    avatarUrl: 'https://picsum.photos/id/338/200/200',
    content: '屏幕素质确实顶级，看电影太爽了！',
    publishTime: '2026-06-19 08:56',
    likeCount: 456,
    emotionType: 'positive',
    emotionScore: 85,
    category: 'praise'
  },
  {
    id: 'c5',
    videoId: 'v1',
    userName: '摄影爱好者小李',
    avatarUrl: 'https://picsum.photos/id/1027/200/200',
    content: '拍照确实有提升，夜景模式很惊艳',
    publishTime: '2026-06-19 08:30',
    likeCount: 378,
    emotionType: 'positive',
    emotionScore: 82,
    category: 'praise'
  },
  {
    id: 'c6',
    videoId: 'v1',
    userName: '等等党永远不亏',
    avatarUrl: 'https://picsum.photos/id/237/200/200',
    content: '等等吧，半年后肯定降价2000+',
    publishTime: '2026-06-19 08:15',
    likeCount: 567,
    emotionType: 'neutral',
    emotionScore: 55,
    category: 'other'
  },
  {
    id: 'c7',
    videoId: 'v1',
    userName: '疑惑的小明',
    avatarUrl: 'https://picsum.photos/id/659/200/200',
    content: '博主是不是收了钱？这么明显的缺点都不说',
    publishTime: '2026-06-19 07:45',
    likeCount: 234,
    emotionType: 'negative',
    emotionScore: 28,
    category: 'misunderstanding'
  },
  {
    id: 'c8',
    videoId: 'v1',
    userName: '认真看视频的人',
    avatarUrl: 'https://picsum.photos/id/718/200/200',
    content: '博主明明说了发热的问题，楼上是跳着看的吧？',
    publishTime: '2026-06-19 07:30',
    likeCount: 189,
    emotionType: 'neutral',
    emotionScore: 50,
    category: 'other'
  },
  {
    id: 'c9',
    videoId: 'v5',
    userName: '被坑过的消费者',
    avatarUrl: 'https://picsum.photos/id/783/200/200',
    content: '我要投诉！买了不到一周就坏了，售后也不管！',
    publishTime: '2026-06-19 11:00',
    likeCount: 892,
    emotionType: 'negative',
    emotionScore: 15,
    category: 'complaint'
  },
  {
    id: 'c10',
    videoId: 'v5',
    userName: '维权小分队',
    avatarUrl: 'https://picsum.photos/id/1025/200/200',
    content: '支持博主！我已经打12315投诉了，大家一起维权！',
    publishTime: '2026-06-19 10:45',
    likeCount: 1234,
    emotionType: 'negative',
    emotionScore: 18,
    category: 'complaint'
  },
  {
    id: 'c11',
    videoId: 'v1',
    userName: '游戏玩家阿强',
    avatarUrl: 'https://picsum.photos/id/787/200/200',
    content: '打游戏的话确实不推荐，发热太严重了',
    publishTime: '2026-06-19 07:00',
    likeCount: 345,
    emotionType: 'negative',
    emotionScore: 32,
    category: 'complaint'
  },
  {
    id: 'c12',
    videoId: 'v1',
    userName: '颜值党',
    avatarUrl: 'https://picsum.photos/id/1082/200/200',
    content: '外观真的太好看了，配色很高级',
    publishTime: '2026-06-19 06:30',
    likeCount: 567,
    emotionType: 'positive',
    emotionScore: 88,
    category: 'praise'
  }
];

export const replyTemplates: ReplyTemplate[] = [
  {
    type: 'explain',
    title: '温和解释',
    templates: [
      '感谢您的反馈，关于您提到的{issue}问题，我们的技术团队正在持续优化中。每一代产品都会在这些方面进行改进，希望能给您带来更好的体验。',
      '非常理解您的感受，{issue}确实是我们非常重视的问题。我们会把您的意见转达给产品团队，作为后续优化的重要参考。'
    ],
    riskyPhrases: [
      '这是正常现象',
      '你不会用',
      '其他品牌也这样',
      '不可能'
    ]
  },
  {
    type: 'apologize',
    title: '致歉安抚',
    templates: [
      '非常抱歉给您带来了不好的体验！您反馈的{issue}问题我们已经记录下来，会积极推动解决。感谢您的宝贵意见！',
      '真的很抱歉让您失望了。我们非常重视每一位用户的反馈，您提到的{issue}问题会成为我们改进的重点方向。'
    ],
    riskyPhrases: [
      '但是',
      '不过',
      '其实',
      '话不能这么说'
    ]
  },
  {
    type: 'direct',
    title: '引导私信',
    templates: [
      '您好，关于您遇到的{issue}问题，麻烦您私信我们详细说一下具体情况，我们会安排专人跟进处理，谢谢您的配合！',
      '很抱歉给您带来困扰，为了更好地帮您解决{issue}问题，建议您私信我们提供更多细节，我们会全力协助。'
    ],
    riskyPhrases: [
      '自己去看说明书',
      '百度一下',
      '找客服去'
    ]
  }
];

export const getCommentsByVideo = (videoId: string): CommentData[] => {
  console.log('[CommentService] 获取视频评论:', videoId);
  return mockComments.filter(c => c.videoId === videoId);
};

export const getEmotionAnalysis = (videoId: string): EmotionAnalysis => {
  console.log('[CommentService] 获取情绪分析:', videoId);
  const comments = getCommentsByVideo(videoId);
  const praises = comments.filter(c => c.category === 'praise' && c.emotionType === 'positive');
  const complaints = comments.filter(c => c.category === 'complaint' && c.emotionType === 'negative');
  const misunderstandings = comments.filter(c => c.category === 'misunderstanding');

  const complaintMap = new Map<string, { count: number; examples: CommentData[] }>();
  complaints.forEach(c => {
    const keyword = c.content.includes('发热') || c.content.includes('烫') ? '发热'
      : c.content.includes('续航') ? '续航'
      : c.content.includes('价格') || c.content.includes('贵') ? '价格'
      : c.content.includes('投诉') || c.content.includes('维权') ? '售后'
      : '其他';
    const existing = complaintMap.get(keyword) || { count: 0, examples: [] };
    complaintMap.set(keyword, {
      count: existing.count + 1,
      examples: existing.examples.length < 3 ? [...existing.examples, c] : existing.examples
    });
  });

  const concentratedComplaints = Array.from(complaintMap.entries())
    .map(([keyword, data]) => ({ keyword, ...data }))
    .sort((a, b) => b.count - a.count);

  return {
    typicalPraises: praises.slice(0, 3),
    concentratedComplaints,
    suspectedMisunderstandings: misunderstandings.slice(0, 3)
  };
};

export const generateReplySuggestions = (selectedComments: CommentData[]): ReplyTemplate[] => {
  console.log('[CommentService] 生成回复建议，选中评论数:', selectedComments.length);
  return replyTemplates;
};
