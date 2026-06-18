const path = require('path');
const fs = require('fs');

console.log('=== 数据一致性验证 ===\n');

// 读取类型定义
const typesContent = fs.readFileSync(path.join(__dirname, '../src/types/index.ts'), 'utf-8');
console.log('✓ 类型定义文件已加载');

// 检查 AlertData 类型
const hasAlertAccountId = typesContent.includes('accountId: string;') && typesContent.includes('export interface AlertData');
const hasVideoAccountId = typesContent.includes('accountId: string;') && typesContent.includes('export interface VideoData');
console.log(`✓ AlertData 类型包含 accountId: ${hasAlertAccountId ? '是' : '否'}`);
console.log(`✓ VideoData 类型包含 accountId: ${hasVideoAccountId ? '是' : '否'}`);

// 预期的视频数据
const expectedVideos = {
  'v1': { title: '新款旗舰手机深度测评：这次真的不一样！', accountId: 'acc1' },
  'v2': { title: '千元机皇大比拼，谁才是真正的性价比之王', accountId: 'acc1' },
  'v3': { title: '实测：无线耳机的音质真的不如有线吗？', accountId: 'acc1' },
  'v4': { title: '智能手表续航实测：3天还是7天？', accountId: 'acc1' },
  'v5': { title: '避坑指南：这些数码产品千万别买！', accountId: 'acc1' },
  'v6': { title: '厨房神器推荐：这5件好物让做饭效率翻倍', accountId: 'acc2' },
  'v7': { title: '平价护肤红黑榜：这些网红产品真的有用吗？', accountId: 'acc2' },
  'v8': { title: '收纳神器合集：20㎡出租屋也能住出豪宅感', accountId: 'acc2' },
  'v9': { title: '实测网红零食：真的好吃还是营销出来的？', accountId: 'acc2' }
};

// 预期的提醒数据
const expectedAlerts = [
  { videoId: 'v5', accountId: 'acc1', videoTitle: '避坑指南：这些数码产品千万别买！' },
  { videoId: 'v1', accountId: 'acc1', videoTitle: '新款旗舰手机深度测评：这次真的不一样！' },
  { videoId: 'v3', accountId: 'acc1', videoTitle: '实测：无线耳机的音质真的不如有线吗？' },
  { videoId: 'v7', accountId: 'acc2', videoTitle: '平价护肤红黑榜：这些网红产品真的有用吗？' },
  { videoId: 'v9', accountId: 'acc2', videoTitle: '实测网红零食：真的好吃还是营销出来的？' }
];

console.log('\n--- 验证视频数据 ---');
const videosContent = fs.readFileSync(path.join(__dirname, '../src/data/videos.ts'), 'utf-8');
let errors = [];

for (const [id, expected] of Object.entries(expectedVideos)) {
  // 检查视频是否存在
  const videoExists = videosContent.includes(`id: '${id}',`);
  console.log(`\n  视频 ${id}:`);
  
  if (!videoExists) {
    errors.push(`视频 ${id} 不存在`);
    console.log(`    ❌ 不存在`);
    continue;
  }
  console.log(`    ✓ 存在`);
  
  // 提取该视频的信息
  const videoMatch = videosContent.match(new RegExp(
    `id:\\s*'${id}',[\\s\\S]*?accountId:\\s*'([^']+)',[\\s\\S]*?title:\\s*'([^']+)'`
  ));
  
  if (videoMatch) {
    const [, accountId, title] = videoMatch;
    console.log(`    标题: ${title}`);
    console.log(`    账号: ${accountId}`);
    
    if (accountId !== expected.accountId) {
      errors.push(`视频 ${id} accountId 不匹配。预期: ${expected.accountId}, 实际: ${accountId}`);
      console.log(`    ❌ accountId 不匹配`);
    } else {
      console.log(`    ✓ accountId 正确`);
    }
    
    if (title !== expected.title) {
      errors.push(`视频 ${id} title 不匹配。预期: ${expected.title}, 实际: ${title}`);
      console.log(`    ❌ title 不匹配`);
    } else {
      console.log(`    ✓ title 正确`);
    }
  }
}

console.log('\n--- 验证提醒数据 ---');
const alertsContent = fs.readFileSync(path.join(__dirname, '../src/data/alerts.ts'), 'utf-8');

for (let i = 0; i < expectedAlerts.length; i++) {
  const expected = expectedAlerts[i];
  console.log(`\n  提醒 ${i + 1}:`);
  console.log(`    videoId: ${expected.videoId}`);
  console.log(`    accountId: ${expected.accountId}`);
  console.log(`    videoTitle: ${expected.videoTitle}`);
  
  // 检查提醒是否存在
  const alertMatch = alertsContent.match(new RegExp(
    `videoId:\\s*'${expected.videoId}',[\\s\\S]*?accountId:\\s*'([^']+)',[\\s\\S]*?videoTitle:\\s*'([^']+)'`
  ));
  
  if (!alertMatch) {
    errors.push(`提醒 ${i + 1} (videoId: ${expected.videoId}) 不存在或格式不正确`);
    console.log(`    ❌ 不存在或格式不正确`);
    continue;
  }
  
  const [, accountId, videoTitle] = alertMatch;
  
  if (accountId !== expected.accountId) {
    errors.push(`提醒 ${i + 1} accountId 不匹配。预期: ${expected.accountId}, 实际: ${accountId}`);
    console.log(`    ❌ accountId 不匹配`);
  } else {
    console.log(`    ✓ accountId 正确`);
  }
  
  if (videoTitle !== expected.videoTitle) {
    errors.push(`提醒 ${i + 1} videoTitle 不匹配。预期: ${expected.videoTitle}, 实际: ${videoTitle}`);
    console.log(`    ❌ videoTitle 不匹配`);
  } else {
    console.log(`    ✓ videoTitle 正确`);
  }
  
  // 验证视频数据一致
  const expectedVideo = expectedVideos[expected.videoId];
  if (expectedVideo) {
    if (expectedVideo.title !== expected.videoTitle) {
      errors.push(`提醒 ${i + 1} videoTitle 与视频数据不一致。视频标题: ${expectedVideo.title}, 提醒标题: ${expected.videoTitle}`);
      console.log(`    ❌ 与视频数据的标题不一致`);
    } else {
      console.log(`    ✓ 与视频数据的标题一致`);
    }
    
    if (expectedVideo.accountId !== expected.accountId) {
      errors.push(`提醒 ${i + 1} accountId 与视频数据不一致。视频账号: ${expectedVideo.accountId}, 提醒账号: ${expected.accountId}`);
      console.log(`    ❌ 与视频数据的账号不一致`);
    } else {
      console.log(`    ✓ 与视频数据的账号一致`);
    }
  }
}

console.log('\n--- 验证评论数据 ---');
const commentsContent = fs.readFileSync(path.join(__dirname, '../src/data/comments.ts'), 'utf-8');
const commentVideoIds = new Set();
const commentVideoIdRegex = /videoId:\s*'([^']+)'/g;
let commentMatch;
while ((commentMatch = commentVideoIdRegex.exec(commentsContent)) !== null) {
  commentVideoIds.add(commentMatch[1]);
}

console.log(`评论涉及的视频: ${Array.from(commentVideoIds).join(', ')}\n`);

for (const videoId of Object.keys(expectedVideos)) {
  if (!commentVideoIds.has(videoId)) {
    console.log(`  ⚠️  视频 ${videoId} (${expectedVideos[videoId].title}) 没有评论数据`);
  } else {
    console.log(`  ✓ 视频 ${videoId} 有评论数据`);
  }
}

console.log('\n--- 验证类型字段使用 ---');
// 检查 alerts.ts 中使用的字段是否都在类型定义中
const alertFieldsUsed = ['id', 'videoId', 'accountId', 'videoTitle', 'type', 'level', 'title', 
                         'description', 'keyword', 'negativeCount', 'growthRate', 'createTime', 'briefContent'];
console.log('\nAlertData 字段检查:');
for (const field of alertFieldsUsed) {
  const fieldExists = typesContent.includes(`${field}:`) || typesContent.includes(`${field}?:`);
  console.log(`  ${field}: ${fieldExists ? '✓' : '❌'}`);
  if (!fieldExists) {
    errors.push(`AlertData 类型缺少字段: ${field}`);
  }
}

// 输出结果
console.log('\n=== 验证结果 ===');
if (errors.length === 0) {
  console.log('✅ 所有数据一致！');
  process.exit(0);
} else {
  console.log(`❌ 发现 ${errors.length} 个错误：`);
  errors.forEach((err, i) => {
    console.log(`  ${i + 1}. ${err}`);
  });
  process.exit(1);
}
