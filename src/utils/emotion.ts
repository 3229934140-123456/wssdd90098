import { EmotionType, RiskLevel, ProcessingStatus } from '@/types';

export const getProcessingStatusLabel = (status: ProcessingStatus): string => {
  const labels: Record<ProcessingStatus, string> = {
    unprocessed: '未处理',
    processing: '处理中',
    handled: '已安抚'
  };
  return labels[status];
};

export const getProcessingStatusColor = (status: ProcessingStatus): string => {
  const colors: Record<ProcessingStatus, string> = {
    unprocessed: '#F53F3F',
    processing: '#FF7D00',
    handled: '#00B42A'
  };
  return colors[status];
};

export const getProcessingStatusBgColor = (status: ProcessingStatus): string => {
  const colors: Record<ProcessingStatus, string> = {
    unprocessed: 'rgba(245, 63, 63, 0.1)',
    processing: 'rgba(255, 125, 0, 0.1)',
    handled: 'rgba(0, 180, 42, 0.1)'
  };
  return colors[status];
};

export const getEmotionColor = (emotion: EmotionType): string => {
  const colors: Record<EmotionType, string> = {
    positive: '#00B42A',
    neutral: '#FF7D00',
    negative: '#F53F3F'
  };
  return colors[emotion];
};

export const getEmotionLabel = (emotion: EmotionType): string => {
  const labels: Record<EmotionType, string> = {
    positive: '正面',
    neutral: '中性',
    negative: '负面'
  };
  return labels[emotion];
};

export const getRiskLevelColor = (level: RiskLevel): string => {
  const colors: Record<RiskLevel, string> = {
    low: '#00B42A',
    medium: '#FF7D00',
    high: '#F53F3F'
  };
  return colors[level];
};

export const getRiskLevelLabel = (level: RiskLevel): string => {
  const labels: Record<RiskLevel, string> = {
    low: '低风险',
    medium: '中风险',
    high: '高风险'
  };
  return labels[level];
};

export const getEmotionScoreColor = (score: number): string => {
  if (score >= 70) return '#00B42A';
  if (score >= 40) return '#FF7D00';
  return '#F53F3F';
};

export const getEmotionTemperatureLabel = (score: number): string => {
  if (score >= 80) return '热情';
  if (score >= 60) return '友好';
  if (score >= 40) return '平和';
  if (score >= 20) return '冷淡';
  return '抵触';
};

export const getGrowthRateColor = (rate: number): string => {
  if (rate >= 40) return '#F53F3F';
  if (rate >= 20) return '#FF7D00';
  return '#00B42A';
};

export const formatCount = (count: number): string => {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + 'w';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
};

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    praise: '好评',
    complaint: '吐槽',
    misunderstanding: '误解',
    question: '疑问',
    other: '其他'
  };
  return labels[category] || category;
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    praise: '#00B42A',
    complaint: '#F53F3F',
    misunderstanding: '#FF7D00',
    question: '#165DFF',
    other: '#86909C'
  };
  return colors[category] || '#86909C';
};
