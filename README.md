# Lili Workspace

> Build · Learn · Record · Grow

一个每天都会打开的 AI Developer Workspace。

不是 AI 聊天工具。不是 Notion。不是知识库。

而是：**记录决策，减少重复思考，持续沉淀成长。**

---

## MVP 模块

| 模块 | 说明 |
|------|------|
| Workspace | 总览：数字 + 最近动态 |
| Projects | 管理真实项目 |
| Decisions | 记录决策 + Why，不重复思考 |
| Ideas | 先捕捉，不立即开发 |

---

## 本地开发

```bash
npm install
npm run dev
```

## 部署

push 到 `main` 分支，GitHub Actions 自动构建并部署到 GitHub Pages。

---

## 技术栈

- Vue 3 + TypeScript
- Pinia（状态管理）
- Vue Router（Hash 模式，兼容 Pages）
- LocalStorage（本地持久化）
- Vite

---

## 原则

- Build for Yourself
- 先本地使用，不登录，不同步，不联网
- 每增加一个功能，问自己：删掉它，明天还会打开吗？
