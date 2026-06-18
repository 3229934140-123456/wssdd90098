import React from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import styles from './index.module.scss';
import { ReplyTemplate } from '@/types';

interface ReplySuggestionProps {
  template: ReplyTemplate;
  selectedIssue?: string;
  onUse?: (content: string) => void;
}

const ReplySuggestion: React.FC<ReplySuggestionProps> = ({
  template,
  selectedIssue = '此问题',
  onUse
}) => {
  const typeLabels: Record<string, { tag: string; tagClass: string }> = {
    explain: { tag: '温和解释', tagClass: styles.explain },
    apologize: { tag: '致歉安抚', tagClass: styles.apologize },
    direct: { tag: '引导私信', tagClass: styles.direct }
  };

  const typeInfo = typeLabels[template.type] || typeLabels.explain;
  const replyContent = template.templates[0].replace('{issue}', selectedIssue);

  const handleCopy = async () => {
    console.log('[ReplySuggestion] 复制回复内容');
    try {
      await Taro.setClipboardData({ data: replyContent });
      Taro.showToast({ title: '已复制', icon: 'success' });
    } catch (error) {
      console.error('[ReplySuggestion] 复制失败:', error);
      Taro.showToast({ title: '复制失败', icon: 'error' });
    }
  };

  const handleUse = () => {
    console.log('[ReplySuggestion] 使用回复:', replyContent);
    if (onUse) {
      onUse(replyContent);
    } else {
      Taro.showToast({ title: '已选用', icon: 'success' });
    }
  };

  return (
    <View className={classNames(styles.container, styles[template.type])}>
      <View className={styles.header}>
        <Text className={styles.title}>{template.title}</Text>
        <Text className={classNames(styles.typeTag, typeInfo.tagClass)}>
          {typeInfo.tag}
        </Text>
      </View>

      <Text className={styles.content}>{replyContent}</Text>

      {template.riskyPhrases.length > 0 && (
        <View className={styles.warning}>
          <Text className={styles.warningTitle}>⚠️ 可能激化情绪的话术</Text>
          <View className={styles.warningPhrases}>
            {template.riskyPhrases.map((phrase, index) => (
              <Text key={index} className={styles.warningPhrase}>
                「{phrase}」
              </Text>
            ))}
          </View>
        </View>
      )}

      <View className={styles.actions}>
        <Button className={classNames(styles.actionBtn, styles.copyBtn)} onClick={handleCopy}>
          复制内容
        </Button>
        <Button className={classNames(styles.actionBtn, styles.useBtn)} onClick={handleUse}>
          选用此回复
        </Button>
      </View>
    </View>
  );
};

export default ReplySuggestion;
