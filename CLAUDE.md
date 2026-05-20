# IELTS 背单词小程序

## 项目概况

纯前端雅思词汇学习 SPA，Vite + 原生 JS，无框架，无后端。
3427 个雅思词汇，含闪卡、选择题、拼写、词汇浏览、学习统计五种模式。

## 启动方式

```bash
cd C:\Users\Administrator\Desktop\assignment\project2
pnpm dev          # 开发模式 → http://localhost:5173
pnpm build        # 打包输出到 dist/
```

## 目录结构

```
src/
├── main.js              # 入口，注册路由
├── store.js             # localStorage 状态管理
├── router.js            # Hash 路由（#home/#flashcard/#quiz/#spelling/#stats/#browse）
├── data/ielts-words.js  # 词库 3427 词
├── utils/speech.js      # Web Speech API 发音
├── components/progress.js  # 进度条/进度环
├── styles/main.css      # 全局样式（清新学习风）
└── pages/
    ├── home.js          # 首页：进度环 + 模式入口
    ├── flashcard.js     # 闪卡：3D 翻转 + 自动朗读
    ├── quiz.js          # 选择题：四选一 + 15秒计时
    ├── spelling.js      # 拼写：看中文写英文 + 提示
    ├── browse.js        # 词汇浏览：固定种子乱序 + 搜索
    └── stats.js         # 统计：7天柱状图
```

## 部署

线上地址：https://siqiliu954-gif.github.io/IELTSAPPs/
部署方式：`git subtree push --prefix=dist origin gh-pages`
打包后必须去掉 `type="module"` 加 `defer`（package.json build 脚本已自动处理）

## Node 路径

Windows 下 node 不在 PATH 中，使用完整路径：
`/c/Program Files/nodejs/node.exe`
pnpm 通过 corepack：`/c/Program Files/nodejs/node.exe /c/Program Files/nodejs/node_modules/corepack/dist/pnpm.js`

## 用户

Liu Siqi，学生，GitHub: siqiliu954-gif，Claude Code CLI 初学者
