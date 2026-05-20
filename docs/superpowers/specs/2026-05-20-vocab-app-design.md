# 雅思背单词小程序 — 设计文档

**日期**：2026-05-20
**类型**：纯前端单页 Web 应用
**技术栈**：Vite + 原生 JS + CSS，零依赖

---

## 1. 概述

一个面向个人用户的雅思词汇学习小程序。浏览器内运行，无后端、无用户系统、无需联网。三种学习模式（闪卡、选择题、拼写）独立可切换，数据通过 localStorage 持久化，关闭页面进度不丢失。

---

## 2. 技术架构

- **构建工具**：Vite（开发服务器 + 构建打包）
- **运行时**：浏览器原生 JS（无框架）
- **路由**：Hash 路由（`#home`、`#flashcard`、`#quiz`、`#spelling`、`#stats`）
- **存储**：localStorage（学习进度、单词状态、统计记录）
- **发音**：Web Speech API（`speechSynthesis`，浏览器内置，无需外部服务）

### 目录结构

```
project2/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── data/
    │   └── ielts-words.js     # 雅思词库：单词、音标、释义、例句
    ├── store.js               # 全局状态与 localStorage 读写
    ├── router.js              # Hash 路由管理
    ├── pages/
    │   ├── home.js            # 首页
    │   ├── flashcard.js       # 闪卡模式
    │   ├── quiz.js            # 选择题模式
    │   ├── spelling.js        # 拼写模式
    │   └── stats.js           # 学习统计
    ├── components/
    │   └── progress.js        # 复用 UI 组件（进度条、进度环）
    ├── utils/
    │   └── speech.js          # 发音工具
    └── styles/
        └── main.css           # 全局样式（清新学习风）
```

---

## 3. 视觉风格 — 清新学习风

- **主色调**：浅绿（#4CAF50）配米白背景（#F9F9F4），辅以暖灰文字（#4A4A4A）
- **卡片**：圆角 12px、柔和阴影（`box-shadow: 0 2px 12px rgba(0,0,0,0.06)`）
- **排版**：英文用系统衬线 fallback、中文用系统无衬线；单词大号 32px
- **动效**：翻转、淡入、进度条填充，使用 CSS transition
- **移动端优先**：375px 基准，自适应到桌面宽度

---

## 4. 页面与交互

### 4.1 首页（#home）

- 顶部：今日进度环（SVG 圆环，已学/目标百分比）
- 中间：三个大卡片入口（闪卡、选择题、拼写），带图标和简短说明
- 底部：统计入口按钮 → `#stats`
- 进入任一模式从上次断点继续

### 4.2 闪卡模式（#flashcard）

- 中央卡片显示英文单词（32px 大字）+ 音标
- 点击卡片 → 翻转动画，展示中文释义 + 例句
- 小喇叭图标 → 点击朗读单词
- 进入时自动朗读当前单词
- 底部两个按钮：「记住了」（绿）和「没记住」（红）
- 点击后自动进入下一张
- 顶部进度条（第 X / 共 Y 个）
- 标记"没记住"的单词进入复习队列

### 4.3 选择题模式（#quiz）

- 上方显示英文单词 + 喇叭图标
- 四个中文释义选项，1 个正确 + 3 个从词库随机抽取
- 点击选项：正确 → 选项变绿 + 轻微弹跳动画；错误 → 选项变红 + 显示正确答案
- 右上角倒计时 15 秒，超时计错
- 答对/答错后显示例句
- 底部进度条（第 X / 总 Y 题）
- 本轮结束：显示正确率、用时、错词列表，可重做错题

### 4.4 拼写模式（#spelling）

- 上方显示中文释义 + 例句（隐藏英文）
- 中央输入框，键入英文单词
- 「提示」按钮：显示首字母，每轮限 3 次
- 拼对 → 输入框变绿，自动切下一题
- 拼错 → 显示正确拼写，高亮用户输入中错误字符位置
- 答错后自动朗读正确单词
- 底部进度条
- 本轮结束：正确率 + 常拼错词列表

### 4.5 学习统计（#stats）

- 学习天数（累计）
- 连续打卡天数
- 今日已学单词数
- 总词汇量变化趋势（简单折线图或柱状图，纯 CSS/Canvas）
- 三种模式各自的正确率

---

## 5. 数据模型

### 5.1 词库（ielts-words.js）

每个词条结构：

```js
{
  word: "abandon",        // 英文
  phonetic: "/əˈbændən/", // 音标
  meaning: "放弃；抛弃",   // 中文释义
  example: "He abandoned the plan.", // 例句
  example_cn: "他放弃了这个计划。"    // 例句翻译
}
```

初始规模：~500 个雅思核心词汇。

### 5.2 localStorage 存储结构

```js
{
  words: {
    "abandon": { mastery: 0, reviewAt: null, mistakes: 0 },
    // mastery: 0=未学, 1=学习中, 2=已掌握
    // reviewAt: 下次复习时间戳（间隔重复）
  },
  progress: {
    flashcard: { current: 12, total: 500 },  // 闪卡当前索引
    quiz: { current: 45, total: 500 },       // 选择当前题号
    spelling: { current: 8, total: 500 }     // 拼写当前题号
  },
  stats: {
    days: { "2026-05-20": { learned: 15, correct: 12, mode: "flashcard" } },
    streak: 3          // 连续打卡天数
  },
  quizSession: null,   // 当前选择题会话状态
  spellingSession: null // 当前拼写会话状态
}
```

### 5.3 间隔重复算法

简化版 SM-2：
- 标记"没记住" → mastery 重置为 1，reviewAt = 1 小时后
- 标记"记住了" → mastery += 1，reviewAt = 当前 + mastery² × 天
- 已掌握（mastery ≥ 3）→ 不再出现在日常复习中

---

## 6. 路由设计

Hash 路由，监听 `hashchange` 事件：

| Hash | 页面 | 容器元素 |
|------|------|----------|
| `#home` | 首页 | `#page-home` |
| `#flashcard` | 闪卡 | `#page-flashcard` |
| `#quiz` | 选择题 | `#page-quiz` |
| `#spelling` | 拼写 | `#page-spelling` |
| `#stats` | 统计 | `#page-stats` |

所有页面在 `index.html` 中预置容器，`router.js` 控制 `display: none/block` 切换。

---

## 7. 非目标（明确不做）

- 登录/注册/用户系统
- 后端服务器/数据库
- 在线同步/多设备
- 自定义词库导入（首版不做）
- 拼写自动纠错/模糊匹配
- 动画库（不用 Motion One，纯 CSS）

---

## 8. 测试策略

- 手动测试为主：开发中浏览器实时验证
- 关键路径检查：各模式从入口进入 → 完整一轮 → 查看统计页数据正确
- 边界情况：空进度（首次使用）、全部答完（无下一题）、localStorage 数据损坏的 fallback
