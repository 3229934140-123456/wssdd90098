const path = require('path');
const fs = require('fs');

console.log('=== 模块导入验证 ===\n');

const srcDir = path.join(__dirname, '../src');
let errors = [];
let totalFiles = 0;

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      totalFiles++;
      validateFile(fullPath);
    }
  }
}

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(srcDir, filePath);
  
  // 提取所有 import 语句
  const importRegex = /import\s+(?:[^'"]+from\s+)?['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    // 只检查 @/ 开头的相对导入
    if (importPath.startsWith('@/')) {
      const modulePath = importPath.replace('@/', '');
      const possiblePaths = [
        path.join(srcDir, modulePath + '.ts'),
        path.join(srcDir, modulePath + '.tsx'),
        path.join(srcDir, modulePath, 'index.ts'),
        path.join(srcDir, modulePath, 'index.tsx')
      ];
      
      const exists = possiblePaths.some(p => fs.existsSync(p));
      if (!exists) {
        errors.push(`${relPath}: 找不到模块 '${importPath}'`);
        console.log(`  ❌ ${relPath}: ${importPath}`);
      }
    }
  }
}

walkDir(srcDir);
console.log(`\n检查了 ${totalFiles} 个源文件`);

// 检查目录结构
console.log('\n--- 目录结构验证 ---');
const requiredDirs = [
  'components',
  'pages',
  'data',
  'types',
  'utils',
  'styles',
  'store'
];

for (const dir of requiredDirs) {
  const fullPath = path.join(srcDir, dir);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✓ ${dir}/ 目录存在`);
  } else {
    errors.push(`缺少目录: ${dir}/`);
    console.log(`  ❌ ${dir}/ 目录缺失`);
  }
}

// 检查必要的页面文件
console.log('\n--- 页面文件验证 ---');
const requiredPages = [
  'pages/home/index.tsx',
  'pages/alert/index.tsx',
  'pages/reply/index.tsx',
  'pages/mine/index.tsx',
  'pages/video-detail/index.tsx'
];

for (const page of requiredPages) {
  const fullPath = path.join(srcDir, page);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✓ ${page} 存在`);
  } else {
    errors.push(`缺少页面文件: ${page}`);
    console.log(`  ❌ ${page} 缺失`);
  }
}

// 检查必要的组件文件
console.log('\n--- 组件文件验证 ---');
const requiredComponents = [
  'components/VideoCard/index.tsx',
  'components/EmotionIndicator/index.tsx',
  'components/AlertCard/index.tsx',
  'components/CommentItem/index.tsx',
  'components/ReplySuggestion/index.tsx',
  'components/EmotionChart/index.tsx'
];

for (const comp of requiredComponents) {
  const fullPath = path.join(srcDir, comp);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✓ ${comp} 存在`);
  } else {
    errors.push(`缺少组件文件: ${comp}`);
    console.log(`  ❌ ${comp} 缺失`);
  }
}

// 检查必要的数据文件
console.log('\n--- 数据文件验证 ---');
const requiredData = [
  'data/videos.ts',
  'data/alerts.ts',
  'data/comments.ts',
  'store/account.ts'
];

for (const dataFile of requiredData) {
  const fullPath = path.join(srcDir, dataFile);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✓ ${dataFile} 存在`);
  } else {
    errors.push(`缺少数据文件: ${dataFile}`);
    console.log(`  ❌ ${dataFile} 缺失`);
  }
}

// 输出结果
console.log('\n=== 验证结果 ===');
if (errors.length === 0) {
  console.log('✅ 所有模块和文件结构验证通过！');
  process.exit(0);
} else {
  console.log(`❌ 发现 ${errors.length} 个问题：`);
  errors.forEach((err, i) => {
    console.log(`  ${i + 1}. ${err}`);
  });
  process.exit(1);
}
