export type EmotionType = 'positive' | 'neutral' | 'negative';

export type RiskLevel = 'low' | 'medium' | 'high';

export type ProcessingStatus = 'unprocessed' | 'processing' | 'handled';

export interface VideoData {
  id: string;
  accountId: string;
  title: string;
  coverUrl: string;
  publishTime: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  emotionScore: number;
  emotionLabel: EmotionType;
  negativeGrowthRate: number;
  controversyKeywords: string[];
  emotionDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export interface CommentData {
  id: string;
  videoId: string;
  userName: string;
  avatarUrl: string;
  content: string;
  publishTime: string;
  likeCount: number;
  emotionType: EmotionType;
  emotionScore: number;
  category: 'praise' | 'complaint' | 'misunderstanding' | 'question' | 'other';
  isSelected?: boolean;
  replySuggestions?: ReplySuggestion[];
}

export interface ReplySuggestion {
  type: 'explain' | 'apologize' | 'direct';
  title: string;
  content: string;
  warning?: string;
}

export interface AlertData {
  id: string;
  videoId: string;
  accountId: string;
  videoTitle: string;
  type: 'negative_growth' | 'sensitive_keyword' | 'complaint_risk';
  level: RiskLevel;
  title: string;
  description: string;
  keyword?: string;
  negativeCount: number;
  growthRate: number;
  createTime: string;
  triggerTime: string;
  briefContent: string;
}

export interface AccountInfo {
  id: string;
  name: string;
  avatarUrl: string;
  followerCount: number;
}

export interface EmotionAnalysis {
  typicalPraises: CommentData[];
  concentratedComplaints: { keyword: string; count: number; examples: CommentData[] }[];
  suspectedMisunderstandings: CommentData[];
}

export interface ReplyTemplate {
  type: 'explain' | 'apologize' | 'direct';
  title: string;
  templates: string[];
  riskyPhrases: string[];
}
