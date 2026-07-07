# DataPulse · AI 执行提示词

> **版本**：v1.0  
> **目标**：让 AI 根据以下指令，从零搭建 DataPulse 数据大屏项目的完整脚手架  
> **前置条件**：当前目录已初始化 Git，已关联远程 `origin`

---

## 📋 项目概述

```
项目英文名: DataPulse
项目中文名: 数据脉动
项目定位:   面向学生的企业级数据大屏教学项目
技术路线:   React + Vite + Zustand + ECharts + Tailwind CSS
数据策略:   开发期 Mock → 生产期 API（环境变量一键切换）
核心要求:   模块化开发 · 完整测试 · 日志系统 · 代码质量门禁
```

---

## 🧠 架构决策记录 (ADR)

### ADR-1：选用 React 18 + Vite
- **原因**：React 是主流大屏技术栈，Vite 开发体验最优
- **约束**：不使用 Next.js，保持纯前端 SPA

### ADR-2：状态管理选 Zustand，而非 Redux
- **原因**：Zustand 体积 ~1KB，零模板代码，更适合教学
- **后果**：Store 拆分多个 slice，不用 Redux Toolkit

### ADR-3：数据源采用适配器模式 + 环境变量切换
- **原因**：Mock 开发、API 生产，零代码侵入切换
- **实现**：`VITE_DATA_SOURCE=mock|api` 控制

### ADR-4：图表库选 ECharts
- **原因**：国内数据大屏事实标准，图表类型最全
- **实现**：封装 `useECharts` Hook，组件与 ECharts 实例解耦

### ADR-5：样式方案选 Tailwind CSS
- **原因**：原子化 CSS，快速构建暗色主题，无需手写大量 CSS
- **后果**：搭配 `variables.css` 定义主题色变量

### ADR-6：测试选 Vitest + React Testing Library
- **原因**：Vite 原生集成，速度极快，API 与现代 Jest 兼容

---

## 📁 目录结构

请严格按照以下结构创建文件和文件夹：

```
DataPulse/                          # 项目根目录（已存在）
├── public/
│   └── index.html                  # HTML 入口
│
├── src/
│   ├── main.jsx                    # ReactDOM.createRoot 入口
│   ├── App.jsx                     # 根组件（挂载 Provider）
│   │
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── index.css           # Tailwind 指令入口
│   │   │   ├── variables.css       # CSS 自定义属性（主题色）
│   │   │   └── animations.css      # 关键帧动画
│   │   └── images/
│   │       └── .gitkeep
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── DashboardLayout.jsx
│   │   ├── common/
│   │   │   ├── Card.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   └── EmptyState.jsx
│   │   └── data-display/
│   │       ├── KpiCard.jsx
│   │       └── RankList.jsx
│   │
│   ├── charts/
│   │   ├── core/
│   │   │   └── ChartBase.jsx       # ECharts 封装基组件
│   │   ├── BarChart.jsx
│   │   ├── LineChart.jsx
│   │   ├── PieChart.jsx
│   │   ├── MapChart.jsx
│   │   └── index.js                # 统一导出
│   │
│   ├── pages/
│   │   └── Dashboard/
│   │       └── index.jsx           # 大屏主页面
│   │
│   ├── hooks/
│   │   ├── useData.js              # 通用数据获取 Hook
│   │   ├── useRealtime.js          # 实时刷新 Hook
│   │   ├── useResize.js            # 响应式 Hook
│   │   ├── useECharts.js           # ECharts 实例管理 Hook
│   │   └── useLogger.js            # 日志 Hook
│   │
│   ├── store/
│   │   ├── index.js                # Store 统一导出
│   │   ├── dashboardStore.js       # 大屏配置状态
│   │   └── dataStore.js            # 数据缓存状态
│   │
│   ├── services/
│   │   ├── dataSource.js           # 数据源工厂（核心出口）
│   │   ├── adapters/
│   │   │   ├── MockAdapter.js      # Mock 适配器
│   │   │   └── ApiAdapter.js       # API 适配器（骨架）
│   │   ├── mock/
│   │   │   ├── index.js            # Mock 注册中心
│   │   │   ├── generator.js        # 数据生成器
│   │   │   └── datasets/
│   │   │       ├── overview.js
│   │   │       ├── trends.js
│   │   │       └── geography.js
│   │   └── request.js              # Axios 实例
│   │
│   ├── logger/
│   │   ├── Logger.js               # 日志核心
│   │   ├── LogLevel.js             # 日志级别枚举
│   │   ├── LogCollector.js         # 日志收集器
│   │   └── components/
│   │       └── LogPanel.jsx        # 日志面板（调试用）
│   │
│   ├── config/
│   │   ├── index.js                # 配置入口
│   │   ├── app.js                  # 应用配置
│   │   └── theme.js                # 主题配置
│   │
│   └── utils/
│       ├── formatters.js           # 格式化
│       ├── validators.js           # 校验
│       └── constants.js            # 常量
│
├── tests/
│   ├── setup.js                    # 测试环境初始化
│   ├── unit/
│   │   ├── components/
│   │   │   ├── KpiCard.test.jsx
│   │   │   └── Header.test.jsx
│   │   ├── hooks/
│   │   │   └── useData.test.js
│   │   ├── services/
│   │   │   └── dataSource.test.js
│   │   └── store/
│   │       └── dataStore.test.js
│   └── __mocks__/
│       └── styleMock.js
│
├── .env                            # 环境变量
├── .env.development                # 开发环境
├── .env.production                 # 生产环境
├── vite.config.js
├── vitest.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── .prettierrc
├── .gitignore                      # 已存在，可追加
├── package.json
└── README.md                       # 已存在，可追加
```

---

## 🛠️ 执行步骤

### 第 1 步：初始化 Vite + React 项目

```bash
npm create vite@latest . -- --template react
```

- 覆盖当前目录（非空目录需确认）
- 确保 `package.json` 中包含 `react` 和 `react-dom`

### 第 2 步：安装核心依赖

```bash
# 运行时依赖
npm install zustand echarts axios

# Tailwind CSS (Vite 版)
npm install -D tailwindcss @tailwindcss/vite

# 测试
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# 代码质量
npm install -D eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh prettier

# 类型（可选，如果用 JS 可跳过）
npm install -D @types/react @types/react-dom
```

### 第 3 步：配置 Tailwind CSS

编辑 `vite.config.js`，加入 `@tailwindcss/vite` 插件。

编辑 `src/assets/styles/index.css`，写入 Tailwind 指令：

```css
@import "tailwindcss";
@import "./variables.css" layer(base);
@import "./animations.css" layer(utilities);
```

### 第 4 步：创建目录结构

按上方目录结构创建所有文件夹和 `.gitkeep` 文件。

### 第 5 步：编写核心基础设施

按以下优先级依次创建（**每个文件必须包含完整、可运行的代码**）：

#### 5a. 配置层
1. `src/config/app.js` — 应用配置（名称、版本、API 地址等）
2. `src/config/theme.js` — 主题色、断点、图表默认选项
3. `src/config/index.js` — 统一导出

#### 5b. 工具层
1. `src/utils/constants.js`
2. `src/utils/formatters.js`
3. `src/utils/validators.js`

#### 5c. 日志系统
1. `src/logger/LogLevel.js`
2. `src/logger/LogCollector.js`
3. `src/logger/Logger.js`
4. `src/logger/components/LogPanel.jsx`

#### 5d. Mock 数据层
1. `src/services/mock/generator.js` — 随机数据生成器（可生成趋势/分布/地理数据）
2. `src/services/mock/datasets/overview.js`
3. `src/services/mock/datasets/trends.js`
4. `src/services/mock/datasets/geography.js`
5. `src/services/mock/index.js` — 注册中心，按服务名映射

#### 5e. 数据服务层
1. `src/services/adapters/MockAdapter.js`
2. `src/services/adapters/ApiAdapter.js`（骨架）
3. `src/services/request.js` — Axios 实例（拦截器注入日志）
4. `src/services/dataSource.js` — 工厂，根据环境变量输出适配器

#### 5f. Store 层
1. `src/store/dashboardStore.js`
2. `src/store/dataStore.js`
3. `src/store/index.js`

#### 5g. Hooks 层
1. `src/hooks/useLogger.js`
2. `src/hooks/useECharts.js`
3. `src/hooks/useData.js`
4. `src/hooks/useRealtime.js`
5. `src/hooks/useResize.js`

#### 5h. 通用组件
1. `src/components/common/Card.jsx`
2. `src/components/common/Loading.jsx`
3. `src/components/common/ErrorBoundary.jsx`
4. `src/components/common/EmptyState.jsx`
5. `src/components/layout/Header.jsx`
6. `src/components/layout/Footer.jsx`
7. `src/components/layout/DashboardLayout.jsx`
8. `src/components/data-display/KpiCard.jsx`
9. `src/components/data-display/RankList.jsx`

#### 5i. 图表组件
1. `src/charts/core/ChartBase.jsx` — 使用 `useECharts` Hook
2. `src/charts/BarChart.jsx`
3. `src/charts/LineChart.jsx`
4. `src/charts/PieChart.jsx`
5. `src/charts/MapChart.jsx`（可用 ECharts 地图或占位）
6. `src/charts/index.js`

#### 5j. 页面
1. `src/pages/Dashboard/index.jsx` — 组装 Header + 图表 + KPI 的完整大屏
2. `src/App.jsx` — 根组件，包裹 ErrorBoundary
3. `src/main.jsx` — ReactDOM.createRoot 入口

### 第 6 步：配置文件清单

完整编写以下配置文件：

- `vite.config.js` — 配置 `@tailwindcss/vite`、路径别名 `@/`、proxy
- `vitest.config.js` — 配置 jsdom 环境、路径别名
- `tailwind.config.js` — 配置主题色、暗色模式
- `postcss.config.js`（如需要）
- `eslint.config.js` — 配置 React + Hooks 规则
- `.prettierrc` — 配置单引号、trailing comma、半宽缩进
- `.env` / `.env.development` / `.env.production`
- `package.json` — 确保 scripts 完整（dev / build / preview / test / lint / format）

#### `package.json` scripts 规范

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint src/",
    "format": "prettier --write src/"
  }
}
```

#### 环境变量规范

```env
# .env.development
VITE_DATA_SOURCE=mock
VITE_API_BASE_URL=http://localhost:3000/api
VITE_LOG_LEVEL=debug
VITE_APP_TITLE=DataPulse · 数据脉动 (Dev)
```

```env
# .env.production
VITE_DATA_SOURCE=api
VITE_API_BASE_URL=https://api.datapulse.com
VITE_LOG_LEVEL=warn
VITE_APP_TITLE=DataPulse · 数据脉动
```

### 第 7 步：编写测试

按照 `tests/` 目录结构创建以下测试文件（**每个文件至少包含 2 个有效测试用例**）：

1. `tests/setup.js` — 导入 `@testing-library/jest-dom`
2. `tests/unit/components/KpiCard.test.jsx`
3. `tests/unit/components/Header.test.jsx`
4. `tests/unit/hooks/useData.test.js`
5. `tests/unit/services/dataSource.test.js`
6. `tests/unit/store/dataStore.test.js`

### 第 8 步：环境变量注入

在 `vite.config.js` 中，Vite 会自动暴露 `VITE_*` 环境变量。  
在代码中通过 `import.meta.env.VITE_DATA_SOURCE` 读取。

```javascript
// src/config/app.js
export const APP_CONFIG = {
  dataSource: import.meta.env.VITE_DATA_SOURCE || 'mock',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  logLevel: import.meta.env.VITE_LOG_LEVEL || 'info',
  title: import.meta.env.VITE_APP_TITLE || 'DataPulse · 数据脉动',
};
```

### 第 9 步：更新 .gitignore

追加以下内容到已有 `.gitignore`：

```
# --- Node ---
node_modules/

# --- Env ---
.env.local
.env.*.local

# --- Build ---
dist/

# --- Coverage ---
coverage/
```

### 第 10 步：验证

```bash
npm run dev          # 启动开发服务器，浏览器打开应看到大屏页面
npm run test:run     # 所有测试通过
npm run lint         # 无 ESLint 错误
npm run build        # 构建成功
```

---

## 📏 代码规范

### 命名规范
| 类别 | 规范 | 示例 |
|------|------|------|
| 组件文件 | PascalCase | `KpiCard.jsx` |
| Hook 文件 | camelCase, `use` 前缀 | `useData.js` |
| 工具/服务 | camelCase | `formatters.js` |
| 文件夹 | kebab-case | `data-display/` |
| 样式类 | Tailwind 原子类 | 不写自定义 class |

### 组件规范
- 每个组件文件**不超过 150 行**
- 使用 **JSX 简写**（`<>...</>`）
- Props 使用 **解构 + 默认值**
- 组件需处理 **loading / empty / error 三种状态**

### 导入规范
```javascript
// 外层库 → 内部模块 → 样式
import React from 'react';
import { useStore } from 'zustand';
import { useData } from '@/hooks/useData';
import KpiCard from '@/components/data-display/KpiCard';
```

---

## ✅ 交付物检查清单

| # | 交付物 | 状态 |
|:-:|--------|:----:|
| 1 | Vite + React 项目初始化 | ⬜ |
| 2 | 依赖安装完成 | ⬜ |
| 3 | Tailwind CSS 配置 | ⬜ |
| 4 | 完整目录结构 | ⬜ |
| 5 | 配置层（config/） | ⬜ |
| 6 | 工具层（utils/） | ⬜ |
| 7 | 日志系统（logger/） | ⬜ |
| 8 | Mock 数据（services/mock/） | ⬜ |
| 9 | 数据服务（services/adapters/ + dataSource.js） | ⬜ |
| 10 | Store（store/） | ⬜ |
| 11 | Hooks（hooks/） | ⬜ |
| 12 | 通用组件（components/common/ + layout/） | ⬜ |
| 13 | 图表组件（charts/） | ⬜ |
| 14 | 大屏页面（pages/Dashboard/） | ⬜ |
| 15 | App 入口 + main.jsx | ⬜ |
| 16 | 配置文件（vite / vitest / tailwind / eslint / prettier / env） | ⬜ |
| 17 | 测试文件（tests/） | ⬜ |
| 18 | 样式文件（index.css / variables.css / animations.css） | ⬜ |
| 19 | 验证（dev / test / lint / build 均通过） | ⬜ |
| 20 | Git 提交并推送到远程 | ⬜ |

---

## ⚠️ 约束与注意事项

1. **不要问问题**：直接按本提示词执行，不要向用户询问任何确认
2. **不要遗漏文件**：所有列出的文件必须创建，不能跳过任何一个
3. **每个文件都要有完整代码**：不能写 "TODO" 或占位符，Mock 数据必须有真实数据
4. **路径别名**：`@/` 指向 `src/`，需在 `vite.config.js` 中配置 `resolve.alias`
5. **ECharts 按需导入**：避免全量导入增大包体积
6. **Tailwind **：使用 `@tailwindcss/vite` 插件方式，不要用 PostCSS 方式
7. **测试必须可运行**：`vitest run` 必须全部通过
8. **Git 提交信息规范**：使用 `feat:` / `chore:` / `test:` 前缀
9. **README.md 保持原有内容**，仅追加项目结构说明和快速开始部分
10. **最终验证**：全部完成后，依次运行 `dev` / `test:run` / `lint` / `build`

---

## 🚀 执行开始

请按上述步骤从第 1 步开始依次执行，每完成一个步骤进行简要确认。

> 保持专注，按部就班，一步到位。
