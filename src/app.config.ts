export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/reply/index',
    'pages/alert/index',
    'pages/mine/index',
    'pages/video-detail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '评论巡检',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f5f6f7'
  },
  tabBar: {
    color: '#86909C',
    selectedColor: '#165DFF',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '巡检'
      },
      {
        pagePath: 'pages/reply/index',
        text: '回复'
      },
      {
        pagePath: 'pages/alert/index',
        text: '提醒'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
