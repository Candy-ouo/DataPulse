# DataPulse · 数据脉动

> 🚀 **从 0 到 1 构建企业级数据大屏 —— 学生友好型 React 教学项目**

DataPulse（数据脉动）是一个面向高校学生的**数据可视化大屏教学项目**，采用 React + Vite + ECharts + Zustand 技术栈。

## 技术栈

| 技术 | 用途 |
|------|------|
| **React 19** | UI 框架 |
| **Vite** | 构建工具（秒级 HMR） |
| **Zustand** | 轻量状态管理 |
| **ECharts 6** | 数据可视化图表 |
| **Tailwind CSS 4** | 原子化样式 |
| **Vitest** | 单元测试 |

## 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 运行测试
npm run test:run

# 4. 构建生产版本
npm run build
```

## 数据源切换

通过环境变量一键切换 Mock / 真实 API：

```bash
# 开发模式（默认 Mock）
npm run dev

# 连接真实 API（需修改 .env.production）
VITE_DATA_SOURCE=api npm run dev
```

## 项目结构

```
DataPulse/
├── src/
│   ├── main.jsx              # 入口
│   ├── App.jsx               # 根组件
│   ├── config/               # 配置
│   ├── hooks/                # 自定义 Hooks
│   ├── store/                # Zustand 状态管理
│   ├── services/             # 数据服务（Mock/API 适配器）
│   ├── logger/               # 日志系统
│   ├── charts/               # ECharts 图表组件
│   ├── components/           # 通用 UI 组件
│   └── pages/                # 页面
├── tests/                    # 测试
└── docs/                     # 文档
```

## 验证

```bash
npm run build   # 构建 ✅
npm run test:run # 测试 ✅
npm run lint    # 代码检查 ✅
```

## 许可证

MIT © DataPulse Team
