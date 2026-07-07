
---

## 方案四：React 组件化架构（推荐 ⭐）

> **方案二 × React** —— 保持组件化设计思想，引入 React 生态实现现代化数据大屏。

### 核心理念
> **声明式 UI · 单向数据流 · 组件即函数**  
> 用 React 的 Component + Hooks 模式重构方案二的组件化思想，每个图表/KPI 都是一个自治的 React 组件，通过自定义 Hooks 管理数据和副作用。

### 技术栈选型

| 技术 | 用途 | 选型理由 |
|------|------|---------|
| **React 18/19** | UI 框架 | 组件化、声明式、生态成熟 |
| **Vite** | 构建工具 | 秒级 HMR，零配置启动 |
| **React Router** | 路由（多页大屏） | 可选，多屏切换时使用 |
| **Zustand** | 状态管理 | 轻量（~1KB），无 boilerplate，比 Redux 更适合教学 |
| **ECharts** | 图表渲染 | 国内大屏首选，图表类型最全 |
| **Axios** | HTTP 客户端 | 拦截器机制便于日志/鉴权 |
| **Tailwind CSS** | 样式方案 | 原子化 CSS，快速构建暗色主题 |
| **Vitest** | 单元测试 | Vite 原生集成，速度极快 |
| **Testing Library** | 组件测试 | 贴近用户视角的测试 |
| **ESLint + Prettier** | 代码质量 | 强制统一风格 |

### 架构总览

```
┌──────────────────────────────────────────────────────────┐
│                     UI Layer                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Dashboard   │  │   Charts     │  │   Widgets    │   │
│  │ Layout      │  │   Panel      │  │   Panel      │   │
│  ├─────────────┤  ├──────────────┤  ├──────────────┤   │
│  │ Header      │  │ BarChart     │  │ KpiCard      │   │
│  │ Footer      │  │ LineChart    │  │ RealtimeBox  │   │
│  │ SidePanel   │  │ PieChart     │  │ RankList     │   │
│  └─────────────┘  │ MapChart     │  │ AlarmList    │   │
│                    └──────────────┘  └──────────────┘   │
├──────────────────────────────────────────────────────────┤
│                  Hooks Layer (自定义 Hooks)               │
│  ┌──────────────┐ ┌────────────┐ ┌────────────────────┐ │
│  │ useDashboard │ │ useChart   │ │ useRealtimeData    │ │
│  │ useTheme     │ │ useResize  │ │ useWebSocket       │ │
│  └──────────────┘ └────────────┘ └────────────────────┘ │
├──────────────────────────────────────────────────────────┤
│                  Store Layer (Zustand)                   │
│  ┌──────────────┐ ┌────────────┐ ┌────────────────────┐ │
│  │ dashboardStore│ │ chartStore │ │  appStore          │ │
│  │ (布局/配置)   │ │ (图表数据)  │ │  (主题/全局状态)    │ │
│  └──────────────┘ └────────────┘ └────────────────────┘ │
├──────────────────────────────────────────────────────────┤
│                  Service Layer (数据源抽象)                │
│  ┌────────────────────────────────────────────────────┐  │
│  │            DataSource Interface                   │  │
│  │     ┌────────────────┐      ┌──────────────┐     │  │
│  │     │  MockService   │      │  ApiService  │     │  │
│  │     │  (开发期)       │ ───→ │  (生产期)     │     │  │
│  │     └────────────────┘      └──────────────┘     │  │
│  └────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────┤
│        Infrastructure Layer (基础设施)                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ Logger   │ │ Analytics│ │ Monitor  │ │ Config   │   │
│  │ System   │ │ System   │ │ System   │ │ Manager  │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
└──────────────────────────────────────────────────────────┘
```

### 目录结构

```
DataPulse/
├── public/
│   └── index.html
│
├── src/
│   ├── main.jsx              # 🎯 应用入口（ReactDOM.createRoot）
│   ├── App.jsx               # 根组件（Provider 挂载）
│   │
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── index.css     # Tailwind 入口 / 全局样式
│   │   │   ├── variables.css # CSS 变量 / 主题色
│   │   │   └── animations.css# 关键帧动画
│   │   └── images/
│   │
│   ├── components/           # 📦 通用 UI 组件
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── SidePanel.jsx
│   │   │   └── DashboardLayout.jsx
│   │   ├── common/
│   │   │   ├── Card.jsx      # 通用卡片容器
│   │   │   ├── Loading.jsx   # 加载骨架屏
│   │   │   ├── ErrorBoundary.jsx  # 错误边界
│   │   │   └── EmptyState.jsx     # 空状态
│   │   └── data-display/
│   │       ├── KpiCard.jsx   # 指标卡片
│   │       ├── DataTable.jsx # 数据表格
│   │       └── RankList.jsx  # 排名列表
│   │
│   ├── charts/               # 📊 图表组件
│   │   ├── core/
│   │   │   ├── ChartBase.jsx     # ECharts 封装基类
│   │   │   └── ChartProvider.jsx # 图表上下文
│   │   ├── BarChart.jsx
│   │   ├── LineChart.jsx
│   │   ├── PieChart.jsx
│   │   ├── MapChart.jsx
│   │   └── GaugeChart.jsx
│   │
│   ├── pages/                # 🏠 页面级组件
│   │   ├── Dashboard/
│   │   │   ├── index.jsx         # 大屏主页
│   │   │   ├── sections/
│   │   │   │   ├── TopSection.jsx
│   │   │   │   ├── MiddleSection.jsx
│   │   │   │   └── BottomSection.jsx
│   │   │   └── Dashboard.css
│   │   └── Monitor/
│   │       └── index.jsx     # 监控日志页面（可选）
│   │
│   ├── hooks/                # 🪝 自定义 Hooks
│   │   ├── useData.js        # 通用数据获取 Hook
│   │   ├── useRealtime.js    # 实时数据刷新 Hook
│   │   ├── useResize.js      # 窗口响应式 Hook
│   │   ├── useECharts.js     # ECharts 实例管理 Hook
│   │   └── useLogger.js      # 日志记录 Hook
│   │
│   ├── store/                # 📊 状态管理 (Zustand)
│   │   ├── index.js          # Store 统一导出
│   │   ├── dashboardStore.js # 大屏布局/配置状态
│   │   ├── dataStore.js      # 数据缓存状态
│   │   └── appStore.js       # 全局应用状态（主题/设置）
│   │
│   ├── services/             # 📡 数据服务层
│   │   ├── dataSource.js     # 数据源工厂（统一出口）
│   │   ├── adapters/
│   │   │   ├── MockAdapter.js    # Mock 适配器
│   │   │   └── ApiAdapter.js     # API 适配器（后期启用）
│   │   ├── mock/
│   │   │   ├── index.js          # Mock 数据注册中心
│   │   │   ├── generator.js      # 数据生成器（随机/趋势）
│   │   │   ├── mockOverview.js
│   │   │   ├── mockTrends.js
│   │   │   └── mockGeography.js
│   │   └── request.js        # Axios 实例（拦截器/日志）
│   │
│   ├── logger/               # 📋 日志系统
│   │   ├── Logger.js         # 日志核心
│   │   ├── LogLevel.js       # 日志级别枚举
│   │   ├── LogCollector.js   # 日志收集器（可上报）
│   │   └── components/
│   │       └── LogPanel.jsx  # 日志可视化面板（调试用）
│   │
│   ├── config/               # ⚙️ 配置
│   │   ├── index.js          # 配置入口
│   │   ├── app.js            # 应用配置
│   │   ├── charts.js         # 图表默认配置
│   │   └── theme.js          # 主题配置
│   │
│   ├── utils/                # 🔧 工具函数
│   │   ├── formatters.js     # 数字/日期格式化
│   │   ├── validators.js     # 数据校验
│   │   └── constants.js      # 常量定义
│   │
│   └── __mocks__/            # 🃏 全局 Mock (Vitest)
│       └── fileMock.js
│
├── tests/                    # 🧪 测试系统
│   ├── setup.js              # 测试环境初始化
│   ├── unit/
│   │   ├── components/       # 组件测试
│   │   │   ├── KpiCard.test.jsx
│   │   │   └── Header.test.jsx
│   │   ├── hooks/            # Hook 测试
│   │   │   └── useData.test.js
│   │   ├── services/         # 服务测试
│   │   │   └── dataSource.test.js
│   │   └── store/            # Store 测试
│   │       └── dataStore.test.js
│   ├── integration/          # 集成测试
│   │   └── Dashboard.test.jsx
│   └── __mocks__/
│       └── styleMock.js
│
├── tools/                    # 🔧 代码质量
│   ├── eslint.config.js
│   ├── .prettierrc
│   └── commitlint.config.js
│
├── scripts/                  # 辅助脚本
│   ├── generate-mock.js      # Mock 数据生成脚本
│   └── check-structure.js    # 目录结构检查
│
├── vite.config.js
├── vitest.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .env                      # 环境变量
├── .env.development          # 开发环境
├── .env.production           # 生产环境
├── .gitignore
└── README.md
```

### 数据流详解

```
┌──────────────────────────────────────────────────────────┐
│                    数据流全景                             │
│                                                          │
│  组件挂载 → useData(serviceName) Hook                     │
│                ↓                                         │
│         dataSource.getData(serviceName)                   │
│                ↓                                         │
│         ┌─ 开发期: MockAdapter.fetch()                    │
│         │    → 返回 Mock 数据                             │
│         │    → Logger.log("MOCK", ...)                   │
│         │                                                 │
│         └─ 生产期: ApiAdapter.fetch()                     │
│              → Axios 请求 API                             │
│              → Logger.log("API", ...)                     │
│              → ErrorBoundary 捕获异常                     │
│                ↓                                         │
│        数据返回 → 存入 Zustand Store                      │
│                ↓                                         │
│        React 组件响应式重渲染                              │
│                ↓                                         │
│        useECharts Hook 更新图表                           │
└──────────────────────────────────────────────────────────┘
```

### 核心代码示例

#### 数据源工厂（Mock/API 一键切换）

```javascript
// src/services/dataSource.js
class DataSourceFactory {
  static #adapter = null;

  /** 切换数据源模式 */
  static use(mode = 'mock') {
    switch (mode) {
      case 'mock':
        this.#adapter = new MockAdapter();
        break;
      case 'api':
        this.#adapter = new ApiAdapter();
        break;
    }
    Logger.info('DataSource', `切换至 ${mode} 模式`);
  }

  static async getData(serviceName, params = {}) {
    const start = performance.now();
    try {
      const data = await this.#adapter.fetch(serviceName, params);
      Logger.info('DataSource', `${serviceName} 请求成功`, {
        duration: Math.round(performance.now() - start),
      });
      return data;
    } catch (err) {
      Logger.error('DataSource', `${serviceName} 请求失败`, { error: err.message });
      throw err;
    }
  }
}

// 初始化使用 Mock
DataSourceFactory.use('mock');

export default DataSourceFactory;
```

#### useData Hook

```javascript
// src/hooks/useData.js
import { useState, useEffect } from 'react';
import DataSourceFactory from '@/services/dataSource';
import { useLogger } from './useLogger';

export function useData(serviceName, params = {}, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const logger = useLogger('useData');
  const { refreshInterval = 0 } = options;

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await DataSourceFactory.getData(serviceName, params);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
      logger.error(`获取 ${serviceName} 失败`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    if (refreshInterval > 0) {
      const timer = setInterval(fetchData, refreshInterval);
      return () => clearInterval(timer);
    }
  }, [serviceName, JSON.stringify(params)]);

  return { data, loading, error, refetch: fetchData };
}
```

#### 图表组件示例

```javascript
// src/charts/BarChart.jsx
import React from 'react';
import { useECharts } from '@/hooks/useECharts';
import ChartBase from './core/ChartBase';

export default function BarChart({ data, title, className }) {
  const { chartRef } = useECharts({
    data,
    options: {
      title: { text: title, textStyle: { color: '#rgba(255,255,255,0.8)' } },
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        data: data?.map(d => d.label) || [],
        axisLabel: { color: 'rgba(255,255,255,0.5)' },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: 'rgba(255,255,255,0.5)' },
      },
      series: [{
        type: 'bar',
        data: data?.map(d => d.value) || [],
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00ffaa' },
            { offset: 1, color: '#006644' },
          ]),
        },
      }],
    },
  });

  return <ChartBase ref={chartRef} className={className} />;
}
```

### 配置切换方式

在 `package.json` 的 scripts 或环境变量中控制数据源：

```json
{
  "scripts": {
    "dev":       "vite",                                    // 默认 Mock
    "dev:mock":  "vite --mode mock",                        // 显式 Mock
    "dev:api":   "VITE_DATA_SOURCE=api vite",               // 连接真实 API
    "build":     "vite build"                               // 生产构建
  }
}
```

```env
# .env.development
VITE_DATA_SOURCE=mock
VITE_API_BASE_URL=http://localhost:3000/api
VITE_LOG_LEVEL=debug
```

```env
# .env.production
VITE_DATA_SOURCE=api
VITE_API_BASE_URL=https://api.your-domain.com
VITE_LOG_LEVEL=warn
```

### 测试体系设计

```
tests/
├── setup.js                  # 全局 setup（Mock 全局配置）
├── unit/                     # 🧪 单元测试
│   ├── components/           #   组件渲染测试
│   │   ├── KpiCard.test.jsx  #   渲染/更新/空状态/错误状态
│   │   ├── Header.test.jsx   #   标题/时间显示
│   │   └── BarChart.test.jsx #   图表挂载/更新/卸载
│   ├── hooks/                #   Hook 逻辑测试
│   │   └── useData.test.js   #   成功/失败/轮询/清理
│   ├── services/             #   数据源测试
│   │   ├── MockAdapter.test.js
│   │   └── ApiAdapter.test.js
│   └── store/                #   Store 状态测试
│       └── dataStore.test.js
├── integration/              # 🔗 集成测试
│   └── Dashboard.test.jsx    #   完整大屏数据流
└── components/               # 📸 可视化回归测试
    └── __snapshots__/        #   (进阶)
```

### 日志系统设计

```javascript
// 日志等级
export const LogLevel = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };

// 日志核心
class Logger {
  static log(level, module, message, meta = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      module,
      message,
      meta,
    };
    // 控制台输出（带颜色）
    console.log(`[${entry.timestamp}] [${level}] [${module}] ${message}`);
    // 收集器（可上报/可导出）
    LogCollector.push(entry);
  }

  static info(module, message, meta) { this.log('INFO', module, message, meta); }
  static warn(module, message, meta) { this.log('WARN', module, message, meta); }
  static error(module, message, meta) { this.log('ERROR', module, message, meta); }
}

// React Hook 封装
export function useLogger(module) {
  return {
    info: (msg, meta) => Logger.info(module, msg, meta),
    warn: (msg, meta) => Logger.warn(module, msg, meta),
    error: (msg, meta) => Logger.error(module, msg, meta),
  };
}
```

### 代码质量体系

| 工具 | 用途 | 配置方式 |
|------|------|---------|
| **ESLint** | JS/JSX 代码规范 | `eslint.config.js` |
| **Prettier** | 代码自动格式化 | `.prettierrc` |
| **Husky** | Git hooks 管理 | `husky install` |
| **lint-staged** | 暂存区代码检查 | `lint-staged.config.js` |
| **commitlint** | 提交信息规范 | `commitlint.config.js` |
| **knip** | 死代码检测 | `knip.json`（可选） |

### 与方案二（原生）的关键区别

| 对比维度 | 方案二 · 原生 JS | 方案四 · React 版 |
|---------|:---:|:---:|
| UI 构建 | 手动 DOM 操作 | JSX 声明式渲染 |
| 组件通信 | EventBus 手动订阅 | Props + Store 自动响应 |
| 状态管理 | 手写状态管理器 | Zustand (~1KB，无需模板代码) |
| 副作用控制 | 手动管理生命周期 | useEffect / useRealtime |
| 数据源切换 | 策略模式类 | 工厂模式 + 环境变量 |
| 测试工具 | Jest | Vitest + Testing Library |
| 样式方案 | 手写 CSS | Tailwind CSS 原子化 |
| 构建工具 | 无 / 轻量 | Vite（HMR < 1s） |
| 学习路线 | JS → 设计模式 → 架构 | React → Hooks → 架构 |
| 面试加分 | ⭐⭐ | ⭐⭐⭐⭐⭐ |

### 适用场景

> ✅ **学习 React 的学生 / 想要面试加分 / 毕设项目 / 工程化实践 / 团队协作**

### 推荐的学习路线

```
第 1 步: 学习 React 核心（JSX / 组件 / Props / State）
第 2 步: 学习 Hooks（useState / useEffect / 自定义 Hook）
第 3 步: 学习 Zustand（比 Redux 简单 10 倍的状态管理）
第 4 步: 学习 ECharts + React 集成
第 5 步: 理解适配器模式（Mock ↔ API 切换）
第 6 步: 掌握 Vitest + Testing Library 测试
第 7 步: 搭建 ESLint + Prettier + Husky 质量门禁
```

---

## 📊 最终四方案横向对比

| 维度 | 方案一 · 原生分层 | 方案二 · 原生组件化 | 方案三 · 插件化内核 | 方案四 · React 组件化 ⭐ |
|------|:---:|:---:|:---:|:---:|
| **技术栈** | Vanilla JS | Vanilla JS | Vanilla JS | **React + Vite** |
| **学习曲线** | ⭐ 最低 | ⭐⭐ 中低 | ⭐⭐⭐ 高 | ⭐⭐ 中 |
| **面试加分** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | **⭐⭐⭐⭐⭐** |
| **教学价值** | 软件工程基础 | 组件化思想 | 架构设计 | **React 工业实践** |
| **开发效率** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | **⭐⭐⭐⭐⭐** |
| **测试生态** | Jest | Jest + DOM | Jest + 插件 | **Vitest + Testing Lib** |
| **代码质量** | 手动 | 手动 | 手动 | **ESLint + Prettier + Husky** |
| **可扩展性** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | **⭐⭐⭐⭐** |
| **Mock/API 切换** | 策略模式 | 适配器模式 | 插件热替换 | **环境变量 + 工厂模式** |
| **工程化程度** | 低 | 中 | 中高 | **高（开箱即用）** |

---

## ✅ 最终建议

| 如果你... | 选这个 |
|-----------|:------:|
| 🎓 正在学 React，想做一个拿得出手的作品 | **方案四** |
| 💼 想面试时展示 React + 工程化 + 测试全栈能力 | **方案四** |
| 🏆 毕设想结合实际技术栈，不显"玩具感" | **方案四** |
| 🧪 想学一套完整的 React 测试体系（Vitest + RTL） | **方案四** |
| 📚 刚学 JS，还不会 React | 先学 React 再回来选方案四 😄 |

---

> ⭐ **强烈推荐方案四 · React 组件化版** —— 既有方案二的组件化设计精髓，又有 React 生态的强大加持，是目前工业界数据大屏的主流实践。学完这个方案，你不仅会做大屏，还能把 React + Vite + Zustand + 测试 + 工程化的全链路能力写进简历。

> 需要我按 **方案四** 开始搭建项目脚手架并推送到 GitHub 吗？🚀
