# EdgeOne Pages 部署说明

## 问题

EdgeOne Pages 的构建环境内存有限，无法完成 CloudPaste 前端构建（1204 个模块）。

## 解决方案

使用 GitHub Actions 在充足的内存环境中构建前端，然后部署到 EdgeOne。

---

## 方法一：GitHub Actions 自动部署（推荐）

### 1. 配置 GitHub Secrets

在 GitHub 仓库设置中添加以下 Secrets：

| Secret 名称 | 说明 | 获取方式 |
|------------|------|----------|
| `EDGEONE_API_TOKEN` | EdgeOne API 令牌 | EdgeOne 控制台 → API 密钥 |
| `EDGEONE_PROJECT_ID` | 项目 ID | EdgeOne 控制台 → 项目设置 |

### 2. 启用 Workflow

1. 进入 GitHub 仓库 → Actions
2. 启用 "Deploy to EdgeOne" workflow
3. 每次 push 到 master/main 分支会自动触发构建和部署

### 3. 手动触发

在 Actions 页面点击 "Deploy to EdgeOne" → "Run workflow"

---

## 方法二：本地构建后手动部署

### 1. 本地构建

```bash
# Windows PowerShell
cd C:\App\CloudPaste-EdgeOne
npm.cmd run build:frontend

# 或使用完整的构建命令
cd frontend
npm install
npm run build
cd ..
cp -r frontend/dist/* public/
```

### 2. 在 EdgeOne 控制台部署

1. 登录 [EdgeOne Pages](https://edgeone.cloud.tencent.com/)
2. 进入项目设置
3. 关闭"自动构建"
4. 手动上传 `public/` 目录的所有文件
5. `node-functions/` 保持自动部署

---

## 方法三：前后端分离部署

### 架构

```
┌─────────────────┐      ┌─────────────────┐
│   前端          │      │   后端          │
│   Cloudflare    │      │   EdgeOne       │
│   Pages         │─────▶│   Pages         │
│   (免费)        │ API  │   (边缘函数)    │
└─────────────────┘      └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │   Turso/MySQL   │
                        │   数据库        │
                        └─────────────────┘
```

### 配置

1. **前端部署到 Cloudflare Pages**
   - 免费构建，内存充足
   - 自动 HTTPS

2. **配置 API 地址**
   
   在 `frontend/.env.production` 中：
   ```
   VITE_BACKEND_URL=https://your-backend.edgeone.app
   ```

3. **后端部署到 EdgeOne**
   - 只上传 `node-functions/` 和 `edgeone.config.js`
   - 配置 Turso/MySQL 环境变量

---

## Workflow 文件说明

| 文件 | 说明 |
|------|------|
| `deploy-edgeone.yml` | 使用 EdgeOne CLI 部署 |
| `deploy-edgeone-v2.yml` | 使用 EdgeOne API 直接部署 |
| `deploy-edgeone-simple.yml` | 使用 SSH/rsync 部署 |

---

## 故障排查

### 构建失败

```bash
# 本地测试构建
npm run build:frontend

# 检查内存
free -h

# 增加内存限制
NODE_OPTIONS="--max-old-space-size=8192" npm run build
```

### 部署失败

1. 检查 GitHub Secrets 是否正确配置
2. 检查 EdgeOne API 令牌是否有效
3. 查看 Workflow 日志获取详细错误

---

## 联系支持

- [EdgeOne 官方文档](https://cloud.tencent.com/document/product/1552)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
