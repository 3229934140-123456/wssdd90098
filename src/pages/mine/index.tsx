import React from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import styles from './index.module.scss';
import { mockAccounts } from '@/data/videos';

const MinePage: React.FC = () => {
  const currentAccount = mockAccounts[0];

  const handleMenuItemClick = (menuId: string) => {
    console.log('[MinePage] 点击菜单:', menuId);
    Taro.showToast({ title: '功能开发中', icon: 'none' });
  };

  const menus = [
    {
      id: 'account',
      icon: '👥',
      iconClass: styles.iconBlue,
      title: '账号管理',
      desc: '管理绑定的短视频账号',
      badge: 2
    },
    {
      id: 'history',
      icon: '📋',
      iconClass: styles.iconGreen,
      title: '回复历史',
      desc: '查看已回复的评论记录'
    },
    {
      id: 'templates',
      icon: '📝',
      iconClass: styles.iconOrange,
      title: '回复模板',
      desc: '管理常用回复话术'
    },
    {
      id: 'settings',
      icon: '⚙️',
      iconClass: styles.iconBlue,
      title: '设置',
      desc: '提醒规则、通知偏好'
    },
    {
      id: 'team',
      icon: '🤝',
      iconClass: styles.iconGreen,
      title: '团队协作',
      desc: '成员管理、权限设置'
    },
    {
      id: 'feedback',
      icon: '💬',
      iconClass: styles.iconOrange,
      title: '意见反馈',
      desc: '帮助我们做得更好'
    },
    {
      id: 'about',
      icon: 'ℹ️',
      iconClass: styles.iconBlue,
      title: '关于我们',
      desc: '版本 v1.0.0'
    }
  ];

  return (
    <ScrollView scrollY className={styles.page}>
      <View className={styles.profile}>
        <View className={styles.profileHeader}>
          <Image
            className={styles.avatar}
            src='https://picsum.photos/id/177/200/200'
            mode='aspectFill'
            onError={(e) => console.error('[MinePage] 头像加载失败:', e.detail)}
          />
          <View className={styles.profileInfo}>
            <Text className={styles.userName}>张运营</Text>
            <Text className={styles.userRole}>高级运营专员 · {currentAccount.name}</Text>
          </View>
        </View>

        <View className={styles.stats}>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>156</Text>
            <Text className={styles.statLabel}>今日处理</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>2.3k</Text>
            <Text className={styles.statLabel}>累计回复</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>98%</Text>
            <Text className={styles.statLabel}>响应率</Text>
          </View>
        </View>
      </View>

      <Text className={styles.sectionTitle}>常用功能</Text>
      <View className={styles.menu}>
        {menus.slice(0, 3).map(menu => (
          <View
            key={menu.id}
            className={styles.menuItem}
            onClick={() => handleMenuItemClick(menu.id)}
          >
            <View className={classNames(styles.menuIcon, menu.iconClass)}>
              <Text>{menu.icon}</Text>
            </View>
            <View className={styles.menuContent}>
              <Text className={styles.menuTitle}>
                {menu.badge && <Text className={styles.menuBadge}>{menu.badge}</Text>}
                {menu.title}
              </Text>
              <Text className={styles.menuDesc}>{menu.desc}</Text>
            </View>
            <Text className={styles.menuArrow}>›</Text>
          </View>
        ))}
      </View>

      <Text className={classNames(styles.sectionTitle, styles.section)}>系统设置</Text>
      <View className={styles.menu}>
        {menus.slice(3).map(menu => (
          <View
            key={menu.id}
            className={styles.menuItem}
            onClick={() => handleMenuItemClick(menu.id)}
          >
            <View className={classNames(styles.menuIcon, menu.iconClass)}>
              <Text>{menu.icon}</Text>
            </View>
            <View className={styles.menuContent}>
              <Text className={styles.menuTitle}>
                {menu.badge && <Text className={styles.menuBadge}>{menu.badge}</Text>}
                {menu.title}
              </Text>
              <Text className={styles.menuDesc}>{menu.desc}</Text>
            </View>
            <Text className={styles.menuArrow}>›</Text>
          </View>
        ))}
      </View>

      <Text className={styles.version}>评论巡检 v1.0.0</Text>
    </ScrollView>
  );
};

export default MinePage;
