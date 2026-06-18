import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import classNames from 'classnames';
import styles from './index.module.scss';
import { CommentData, ProcessingStatus } from '@/types';
import { getEmotionLabel, getCategoryLabel, getProcessingStatusLabel, getProcessingStatusColor, getProcessingStatusBgColor } from '@/utils/emotion';

interface CommentItemProps {
  comment: CommentData;
  selectable?: boolean;
  isSelected?: boolean;
  onSelect?: (comment: CommentData) => void;
  onClick?: (comment: CommentData) => void;
  processingStatus?: ProcessingStatus;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  selectable = false,
  isSelected = false,
  onSelect,
  onClick,
  processingStatus
}) => {
  const handleClick = () => {
    if (selectable && onSelect) {
      console.log('[CommentItem] 选中评论:', comment.id);
      onSelect(comment);
    } else if (onClick) {
      onClick(comment);
    }
  };

  return (
    <View
      className={classNames(styles.container, isSelected && styles.selected, processingStatus === 'handled' && styles.handled)}
      onClick={handleClick}
    >
      {selectable && (
        <View className={classNames(styles.checkbox, isSelected && styles.checkboxChecked)}>
          {isSelected && <Text className={styles.checkIcon}>✓</Text>}
        </View>
      )}
      <Image
        className={styles.avatar}
        src={comment.avatarUrl}
        mode='aspectFill'
        onError={(e) => console.error('[CommentItem] 头像加载失败:', e.detail)}
      />
      <View className={styles.content}>
        <View className={styles.header}>
          <View className={styles.userInfo}>
            <Text className={styles.userName}>{comment.userName}</Text>
            <Text
              className={classNames(styles.emotionTag, styles[comment.emotionType])}
            >
              {getEmotionLabel(comment.emotionType)}
            </Text>
            <Text className={styles.categoryTag}>
              {getCategoryLabel(comment.category)}
            </Text>
            {processingStatus && (
              <Text
                className={styles.statusTag}
                style={{
                  color: getProcessingStatusColor(processingStatus),
                  background: getProcessingStatusBgColor(processingStatus)
                }}
              >
                {getProcessingStatusLabel(processingStatus)}
              </Text>
            )}
          </View>
        </View>
        <Text className={styles.text}>{comment.content}</Text>
        <View className={styles.footer}>
          <Text className={styles.time}>{comment.publishTime}</Text>
          <Text className={styles.likes}>👍 {comment.likeCount}</Text>
        </View>
      </View>
    </View>
  );
};

export default CommentItem;
