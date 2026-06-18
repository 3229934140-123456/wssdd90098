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
    id: 'c10',
    videoId: 'v1',
    userName: '颜值党',
    avatarUrl: 'https://picsum.photos/id/1082/200/200',
    content: '外观真的太好看了，配色很高级',
    publishTime: '2026-06-19 06:30',
    likeCount: 567,
    emotionType: 'positive',
    emotionScore: 88,
    category: 'praise'
  },
  {
    id: 'c11',
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
    id: 'c12',
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
    id: 'c13',
    videoId: 'v5',
    userName: '愤怒的买家',
    avatarUrl: 'https://picsum.photos/id/1074/200/200',
    content: '虚假宣传！明明说的功能根本没有，太坑了',
    publishTime: '2026-06-19 10:30',
    likeCount: 567,
    emotionType: 'negative',
    emotionScore: 20,
    category: 'complaint'
  },
  {
    id: 'c14',
    videoId: 'v5',
    userName: '理性吃瓜',
    avatarUrl: 'https://picsum.photos/id/1062/200/200',
    content: '我买了还好啊，没那么夸张吧',
    publishTime: '2026-06-19 10:15',
    likeCount: 123,
    emotionType: 'neutral',
    emotionScore: 55,
    category: 'other'
  },
  {
    id: 'c15',
    videoId: 'v2',
    userName: '学生党代表',
    avatarUrl: 'https://picsum.photos/id/1005/200/200',
    content: '千元机里这个性价比真的绝了，已入手！',
    publishTime: '2026-06-19 09:00',
    likeCount: 678,
    emotionType: 'positive',
    emotionScore: 88,
    category: 'praise'
  },
  {
    id: 'c16',
    videoId: 'v2',
    userName: '拍照达人',
    avatarUrl: 'https://picsum.photos/id/1011/200/200',
    content: '拍照效果超出预期，夜景模式很惊喜',
    publishTime: '2026-06-19 08:45',
    likeCount: 456,
    emotionType: 'positive',
    emotionScore: 85,
    category: 'praise'
  },
  {
    id: 'c17',
    videoId: 'v2',
    userName: '系统玩家',
    avatarUrl: 'https://picsum.photos/id/1012/200/200',
    content: '系统有点难用，习惯原生的可能需要适应',
    publishTime: '2026-06-19 08:30',
    likeCount: 234,
    emotionType: 'negative',
    emotionScore: 42,
    category: 'complaint'
  },
  {
    id: 'c18',
    videoId: 'v3',
    userName: '音质发烧友',
    avatarUrl: 'https://picsum.photos/id/1027/200/200',
    content: '音质真的一般，跟有线比差远了',
    publishTime: '2026-06-19 09:30',
    likeCount: 345,
    emotionType: 'negative',
    emotionScore: 35,
    category: 'complaint'
  },
  {
    id: 'c19',
    videoId: 'v3',
    userName: '通勤族小李',
    avatarUrl: 'https://picsum.photos/id/1035/200/200',
    content: '延迟挺明显的，看视频对不上口型',
    publishTime: '2026-06-19 09:15',
    likeCount: 267,
    emotionType: 'negative',
    emotionScore: 38,
    category: 'complaint'
  },
  {
    id: 'c20',
    videoId: 'v3',
    userName: '运动达人阿杰',
    avatarUrl: 'https://picsum.photos/id/1066/200/200',
    content: '运动的时候戴不稳，容易掉',
    publishTime: '2026-06-19 09:00',
    likeCount: 189,
    emotionType: 'negative',
    emotionScore: 40,
    category: 'complaint'
  },
  {
    id: 'c21',
    videoId: 'v3',
    userName: '无线党',
    avatarUrl: 'https://picsum.photos/id/1074/200/200',
    content: '方便是真的方便，音质也能接受',
    publishTime: '2026-06-19 08:45',
    likeCount: 312,
    emotionType: 'positive',
    emotionScore: 78,
    category: 'praise'
  },
  {
    id: 'c22',
    videoId: 'v4',
    userName: '商务人士老王',
    avatarUrl: 'https://picsum.photos/id/1079/200/200',
    content: '续航很给力，出差一周不用充电',
    publishTime: '2026-06-19 10:00',
    likeCount: 423,
    emotionType: 'positive',
    emotionScore: 88,
    category: 'praise'
  },
  {
    id: 'c23',
    videoId: 'v4',
    userName: '健康达人',
    avatarUrl: 'https://picsum.photos/id/1066/200/200',
    content: '心率监测挺准的，运动记录也很全',
    publishTime: '2026-06-19 09:30',
    likeCount: 356,
    emotionType: 'positive',
    emotionScore: 85,
    category: 'praise'
  },
  {
    id: 'c24',
    videoId: 'v6',
    userName: '厨房小白',
    avatarUrl: 'https://picsum.photos/id/1024/200/200',
    content: '这个切菜神器太好用了！以前切菜要半小时，现在五分钟搞定',
    publishTime: '2026-06-19 11:00',
    likeCount: 567,
    emotionType: 'positive',
    emotionScore: 88,
    category: 'praise'
  },
  {
    id: 'c25',
    videoId: 'v6',
    userName: '宝妈小美',
    avatarUrl: 'https://picsum.photos/id/1011/200/200',
    content: '买了那个不粘锅，确实不粘，但是感觉质量一般般',
    publishTime: '2026-06-19 10:45',
    likeCount: 234,
    emotionType: 'neutral',
    emotionScore: 52,
    category: 'other'
  },
  {
    id: 'c26',
    videoId: 'v6',
    userName: '精打细算',
    avatarUrl: 'https://picsum.photos/id/1005/200/200',
    content: '价格有点贵啊，同款某多多便宜一半',
    publishTime: '2026-06-19 10:30',
    likeCount: 345,
    emotionType: 'negative',
    emotionScore: 38,
    category: 'complaint'
  },
  {
    id: 'c27',
    videoId: 'v6',
    userName: '美食博主',
    avatarUrl: 'https://picsum.photos/id/1012/200/200',
    content: '那个破壁机真的绝了，打出来的豆浆超细腻！',
    publishTime: '2026-06-19 10:15',
    likeCount: 456,
    emotionType: 'positive',
    emotionScore: 90,
    category: 'praise'
  },
  {
    id: 'c28',
    videoId: 'v7',
    userName: '敏感肌用户',
    avatarUrl: 'https://picsum.photos/id/1027/200/200',
    content: '用了那个面膜过敏了！脸痒了好几天，千万别买',
    publishTime: '2026-06-19 11:30',
    likeCount: 789,
    emotionType: 'negative',
    emotionScore: 22,
    category: 'complaint'
  },
  {
    id: 'c29',
    videoId: 'v7',
    userName: '踩坑小能手',
    avatarUrl: 'https://picsum.photos/id/1035/200/200',
    content: '那个精华真的是智商税，用了一个月一点效果都没有',
    publishTime: '2026-06-19 11:15',
    likeCount: 678,
    emotionType: 'negative',
    emotionScore: 28,
    category: 'complaint'
  },
  {
    id: 'c30',
    videoId: 'v7',
    userName: '护肤品收藏家',
    avatarUrl: 'https://picsum.photos/id/1062/200/200',
    content: '智商税也太夸张了吧，我用着还可以啊',
    publishTime: '2026-06-19 11:00',
    likeCount: 234,
    emotionType: 'neutral',
    emotionScore: 55,
    category: 'other'
  },
  {
    id: 'c31',
    videoId: 'v7',
    userName: '成分党',
    avatarUrl: 'https://picsum.photos/id/1066/200/200',
    content: '博主说的不对吧，这个成分明明是安全的',
    publishTime: '2026-06-19 10:45',
    likeCount: 345,
    emotionType: 'negative',
    emotionScore: 35,
    category: 'misunderstanding'
  },
  {
    id: 'c32',
    videoId: 'v7',
    userName: '退退退',
    avatarUrl: 'https://picsum.photos/id/1074/200/200',
    content: '已拉黑这个品牌，售后太差了，不给退',
    publishTime: '2026-06-19 10:30',
    likeCount: 567,
    emotionType: 'negative',
    emotionScore: 25,
    category: 'complaint'
  },
  {
    id: 'c33',
    videoId: 'v8',
    userName: '租房族小周',
    avatarUrl: 'https://picsum.photos/id/1079/200/200',
    content: '太实用了！我的小窝终于不乱糟糟的了',
    publishTime: '2026-06-19 10:00',
    likeCount: 567,
    emotionType: 'positive',
    emotionScore: 88,
    category: 'praise'
  },
  {
    id: 'c34',
    videoId: 'v8',
    userName: '收纳控',
    avatarUrl: 'https://picsum.photos/id/1024/200/200',
    content: '那个收纳箱质量一般，感觉用不了多久',
    publishTime: '2026-06-19 09:45',
    likeCount: 189,
    emotionType: 'negative',
    emotionScore: 42,
    category: 'complaint'
  },
  {
    id: 'c35',
    videoId: 'v8',
    userName: '宝妈日记',
    avatarUrl: 'https://picsum.photos/id/1011/200/200',
    content: '有了孩子之后家里东西太多了，这些收纳盒救了命',
    publishTime: '2026-06-19 09:30',
    likeCount: 456,
    emotionType: 'positive',
    emotionScore: 85,
    category: 'praise'
  },
  {
    id: 'c36',
    videoId: 'v9',
    userName: '吃货一枚',
    avatarUrl: 'https://picsum.photos/id/1080/200/200',
    content: '那个薯片真的好吃吗？我觉得一般般啊',
    publishTime: '2026-06-19 10:30',
    likeCount: 234,
    emotionType: 'neutral',
    emotionScore: 50,
    category: 'other'
  },
  {
    id: 'c37',
    videoId: 'v9',
    userName: '零食测评师',
    avatarUrl: 'https://picsum.photos/id/1025/200/200',
    content: '价格太贵了，分量还少，不值这个价',
    publishTime: '2026-06-19 10:15',
    likeCount: 456,
    emotionType: 'negative',
    emotionScore: 35,
    category: 'complaint'
  },
  {
    id: 'c38',
    videoId: 'v9',
    userName: '重口味爱好者',
    avatarUrl: 'https://picsum.photos/id/1074/200/200',
    content: '那个辣味的超好吃！已经回购三次了',
    publishTime: '2026-06-19 10:00',
    likeCount: 378,
    emotionType: 'positive',
    emotionScore: 82,
    category: 'praise'
  },
  {
    id: 'c39',
    videoId: 'v9',
    userName: '养生达人',
    avatarUrl: 'https://picsum.photos/id/1066/200/200',
    content: '太甜了吧，吃多了腻得慌，不推荐',
    publishTime: '2026-06-19 09:45',
    likeCount: 267,
    emotionType: 'negative',
    emotionScore: 40,
    category: 'complaint'
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
    const content = c.content;
    let keyword = '其他';
    if (content.includes('发热') || content.includes('烫')) {
      keyword = '发热';
    } else if (content.includes('续航')) {
      keyword = '续航';
    } else if (content.includes('价格') || content.includes('贵') || content.includes('不值')) {
      keyword = '价格';
    } else if (content.includes('投诉') || content.includes('维权') || content.includes('售后')) {
      keyword = '售后';
    } else if (content.includes('过敏') || content.includes('刺激')) {
      keyword = '过敏';
    } else if (content.includes('没效果') || content.includes('没用') || content.includes('智商税')) {
      keyword = '没效果';
    } else if (content.includes('延迟')) {
      keyword = '延迟';
    } else if (content.includes('音质')) {
      keyword = '音质';
    } else if (content.includes('佩戴') || content.includes('掉')) {
      keyword = '佩戴';
    } else if (content.includes('质量')) {
      keyword = '质量';
    } else if (content.includes('口味') || content.includes('甜') || content.includes('好吃')) {
      keyword = '口味';
    } else if (content.includes('分量') || content.includes('少')) {
      keyword = '分量';
    }
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
