import { ProcessingStatus } from '@/types';
import { mockVideos, getVideosByAccount } from '@/data/videos';
import { mockAlerts, getAlerts } from '@/data/alerts';
import { mockComments as allComments } from '@/data/comments';

type Listener = () => void;

class ProcessingStore {
  private videoStatus: Map<string, ProcessingStatus> = new Map();
  private commentStatus: Map<string, ProcessingStatus> = new Map();
  private alertStatus: Map<string, ProcessingStatus> = new Map();
  private listeners: Set<Listener> = new Set();

  constructor() {
    this.initDefaultStatus();
  }

  private initDefaultStatus() {
    mockVideos.forEach(v => {
      if (v.emotionLabel === 'negative' && v.negativeGrowthRate >= 40) {
        this.videoStatus.set(v.id, 'unprocessed');
      } else if (v.emotionLabel === 'negative') {
        this.videoStatus.set(v.id, 'processing');
      } else {
        this.videoStatus.set(v.id, 'handled');
      }
    });

    allComments.forEach(c => {
      if (c.emotionType === 'negative') {
        this.commentStatus.set(c.id, 'unprocessed');
      } else {
        this.commentStatus.set(c.id, 'handled');
      }
    });

    mockAlerts.forEach(a => {
      this.alertStatus.set(a.id, 'unprocessed');
    });
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getVideoStatus(videoId: string): ProcessingStatus {
    return this.videoStatus.get(videoId) || 'handled';
  }

  setVideoStatus(videoId: string, status: ProcessingStatus): void {
    this.videoStatus.set(videoId, status);
    this.notify();
  }

  getPendingNegativeCount(videoId: string): number {
    const videoComments = allComments.filter(c => c.videoId === videoId && c.emotionType === 'negative');
    return videoComments.filter(c => this.getCommentStatus(c.id) === 'unprocessed').length;
  }

  getCommentStatus(commentId: string): ProcessingStatus {
    return this.commentStatus.get(commentId) || 'handled';
  }

  setCommentStatus(commentId: string, status: ProcessingStatus): void {
    this.commentStatus.set(commentId, status);
    this.notify();
  }

  markCommentsHandled(commentIds: string[]): void {
    commentIds.forEach(id => this.commentStatus.set(id, 'handled'));
    this.notify();
  }

  getAlertStatus(alertId: string): ProcessingStatus {
    return this.alertStatus.get(alertId) || 'unprocessed';
  }

  setAlertStatus(alertId: string, status: ProcessingStatus): void {
    this.alertStatus.set(alertId, status);
    this.notify();
  }

  getAccountVideoStatuses(accountId: string): Map<string, ProcessingStatus> {
    const result = new Map<string, ProcessingStatus>();
    const videos = getVideosByAccount(accountId);
    videos.forEach(v => {
      result.set(v.id, this.getVideoStatus(v.id));
    });
    return result;
  }

  getAccountAlertStatuses(accountId: string): Map<string, ProcessingStatus> {
    const result = new Map<string, ProcessingStatus>();
    const alerts = getAlerts(accountId);
    alerts.forEach(a => {
      result.set(a.id, this.getAlertStatus(a.id));
    });
    return result;
  }
}

export const processingStore = new ProcessingStore();
