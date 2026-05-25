# EdgeOne Pages 部署说明

## 问题

EdgeOne Pages 的构建环境内存有限，无法完成 CloudPaste 前端构建（1204 个模块）。

## 解决方案

**EdgeOne Pages 主要通过 GitHub 仓库连接自动部署，没有直接的 API 部署接口。**

---

## 推荐方案：前后端分离部署

### 架构

```
┌─────────────────┐      ┌─────────────────┐
│   前端          │      │   后端          │
│   Cloudflare    │      │   EdgeOne       │
│   Pages         │─────▶│   Pages         │
│   (免费构建)    │ API  │   (边缘函数)    │
└─────────────────┘      └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │   Turso/MySQL   │
                        │   数据库        │
                        └─────────────────┘
```

### 步骤

#### 1. 前端部署到 Cloudflare Pages

```bash
# 1. 在 Cloudflare 控制台创建 Pages 项目
# 2. 连接 GitHub 仓库
# 3. 配置构建命令: npm run build:frontend
# 4. 配置输出目录: public
```

#### 2. 配置 API 地址

在 `frontend/.env.production` 中：
```
VITE_BACKEND_URL=https://your-backend.edgeone.app
```

#### 3. 后端部署到 EdgeOne Pages

```bash
# 1. 在 EdgeOne 控制台创建 Pages 项目
# 2. 连接 GitHub 仓库
# 3. 配置环境变量（Turso/MySQL）
# 4. 关闭前端构建（只部署 node-functions/）
```

---

## 备选方案：本地构建后上传

### 1. 本地构建

```bash
# Windows PowerShell
cd C:\App\CloudPaste-EdgeOne
npm.cmd run build:frontend
```

### 2. 在 EdgeOne 控制台部署

1. 登录 [EdgeOne Pages](https://edgeone.cloud.tencent.com/)
2. 进入项目 → 设置
3. **关闭"自动构建"**
4. 使用 **手动上传** 功能上传 `public/` 目录
5. `node-functions/` 保持自动部署

---

## 关于 EdgeOne API Token

### EdgeOne Pages 不支持 API 部署

根据官方文档，EdgeOne Pages 的部署方式：

| 部署方式 | 说明 |
|----------|------|
| **GitHub 连接** | ✅ 推荐，自动构建部署 |
| **手动上传** | ✅ 支持，上传构建产物 |
| **API 部署** | ❌ 不支持 |

### EdgeOne API 用途

EdgeOne API（https://cloud.tencent.com/document/api/1552）主要用于：

- 站点管理（CreateZone, DescribeZones）
- 域名管理（CreateAccelerationDomain）
- 边缘函数管理（CreateFunction）
- 缓存管理（CreatePurgeTask）
- **不支持 Pages 项目部署**

### 获取 API Token（用于其他 API 调用）

1. 登录 [EdgeOne 控制台](https://edgeone.cloud.tencent.com/)
2. 进入 **API 密钥管理**
3. 创建 API 密钥
4. 复制 SecretId 和 SecretKey

---

## Workflow 文件说明

当前仓库中的 Workflow 文件**不适用于 EdgeOne Pages 部署**，因为：

1. EdgeOne Pages 没有公开的部署 API
2. EdgeOne CLI 不存在或不支持 Pages 部署
3. SSH/rsync 部署需要服务器访问权限

**建议删除以下文件：**
- `.github/workflows/deploy-edgeone.yml`
- `.github/workflows/deploy-edgeone-v2.yml`
- `.github/workflows/deploy-edgeone-simple.yml`

---

## 故障排查

### 构建失败

```bash
# 本地测试构建
npm run build:frontend

# 增加内存限制
NODE_OPTIONS="--max-old-space-size=8192" npm run build
```

### 前后端分离部署问题

1. **CORS 错误**：在 EdgeOne 后端配置允许前端域名
2. **API 地址错误**：检查 `VITE_BACKEND_URL` 是否正确
3. **环境变量未生效**：重新部署后端

---

## 参考文档

- [EdgeOne Pages 官方文档](https://cloud.tencent.com/document/product/1552/127365)
- [EdgeOne API 文档](https://cloud.tencent.com/document/api/1552)
- [Cloudflare Pages 文档](https://pages.cloudflare.com/)
