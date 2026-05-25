# CloudPaste-EdgeOne 📋

基于 **腾讯云 EdgeOne Pages** 的云剪贴板/文件分享平台，支持 Turso/MySQL 数据库后端。

## 核心功能

- **文本分享**：Markdown 编辑器，支持密码保护、过期时间、访问次数限制
- **文件分享**：支持 30+ 格式在线预览（图片、视频、音频、PDF、Office、代码等）
- **多存储后端**：S3/R2、WebDAV、OneDrive、Google Drive、Telegram、Discord、HuggingFace 等 12 种
- **WebDAV 协议**：支持挂载为网络驱动器
- **权限管理**：API 密钥授权，细粒度访问控制
- **PWA 支持**：可安装为桌面应用

## 部署步骤

### 1. 在 EdgeOne 控制台创建项目

- 登录 [EdgeOne Pages](https://edgeone.cloud.tencent.com/)
- 创建项目 → 连接 GitHub 仓库 `suanx/CloudPaste-EdgeOne`
- 分支：`master`

### 2. 构建设置

| 设置 | 值 |
|------|-----|
| 构建命令 | **留空**（前端已预构建） |
| 输出目录 | `public` |

### 3. 环境变量

**使用 Turso 数据库：**
```bash
CLOUD_PLATFORM=edgeone
DB_PROVIDER=turso
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-token
ENCRYPTION_SECRET=<openssl rand -base64 32>
```

**使用 MySQL 数据库：**
```bash
CLOUD_PLATFORM=edgeone
MYSQL_HOST=your-mysql-host.com
MYSQL_USER=cloudpaste_user
MYSQL_PASSWORD=your-password
MYSQL_DATABASE=cloudpaste
ENCRYPTION_SECRET=<openssl rand -base64 32>
```

### 4. 部署

点击部署，等待完成即可。

首次访问自动初始化数据库，默认管理员：`admin` / `admin123`

## 本地开发

```bash
# 构建前端
npm run build:frontend

# 启动后端
cd backend
npm install
npm run docker-dev
```

## 项目结构

```
├── edgeone.config.js    # EdgeOne 配置
├── backend/             # 后端 API（Hono + 数据库适配器）
├── frontend/            # 前端应用（Vue 3 + Vite）
├── node-functions/      # EdgeOne 边缘函数
├── public/              # 预构建的前端静态文件
└── DEPLOY_EDGEONE.md    # 完整部署指南
```

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Vue 3, Vite, Pinia, TailwindCSS |
| 后端 | Hono, 12种存储驱动 |
| 数据库 | Turso (libSQL) / MySQL |
| 运行时 | EdgeOne Pages (Node.js) |

## 许可证

Apache License 2.0