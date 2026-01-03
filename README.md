# Warden-Worker

基于 EdgeOne Pages + Supabase 的 Bitwarden 兼容密码管理器后端服务。

## 功能特性

- 🔐 Bitwarden 协议兼容
- 🚀 EdgeOne Pages 边缘函数部署
- 🗄️ Supabase PostgreSQL 数据库
- 🔒 端到端加密
- 🌐 全球 CDN 加速
- 📱 多设备同步

## 快速开始

### 前置要求

- Node.js >= 18.0.0
- GitHub 账号
- Supabase 账号
- 腾讯云 EdgeOne 账号

### 部署步骤

详细的部署指南请参考 [快速部署指南](./docs/QUICK_DEPLOY.md)

1. **配置 Supabase**
   - 创建项目
   - 执行数据库迁移脚本
   - 获取 API 密钥

2. **部署到 EdgeOne Pages**
   - 创建 Pages 项目
   - 绑定 GitHub 仓库
   - 配置环境变量

3. **测试部署**
   ```bash
   # 测试配置端点
   curl https://your-project.pages.edgeone.com/api/config

   # 测试身份验证
   curl https://your-project.pages.edgeone.com/identity/connect
   ```

## 项目结构

```
warden-worker/
├── edge-functions/           # EdgeOne Pages 函数
│   ├── api-handler.ts        # API 路由处理
│   └── identity-handler.ts   # 身份验证处理
├── supabase/
│   └── migrations/          # 数据库迁移脚本
│       └── 001_init.sql
├── warden-worker-main/      # Rust 后端代码（可选）
├── docs/                   # 文档
│   ├── QUICK_DEPLOY.md      # 快速部署指南
│   └── GITHUB_UPLOAD_GUIDE.md  # GitHub 上传指南
├── index.html              # 欢迎页面
└── package.json           # 项目配置
```

## 环境变量

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `SUPABASE_URL` | Supabase 项目 URL | ✅ |
| `SUPABASE_ANON_KEY` | Supabase 匿名密钥 | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 服务端密钥 | ✅ |
| `JWT_SECRET` | JWT 签名密钥 | ✅ |
| `JWT_REFRESH_SECRET` | JWT 刷新密钥 | ✅ |
| `ALLOWED_EMAILS` | 允许注册的邮箱 | ❌ |
| `CORS_ALLOWED_ORIGINS` | CORS 允许的域名 | ❌ |
| `APP_ENV` | 运行环境 | ❌ |
| `LOG_LEVEL` | 日志级别 | ❌ |

## API 端点

### 身份验证 `/identity/*`

- `GET /identity/connect` - 获取服务器信息
- `POST /identity/accounts/register` - 用户注册
- `POST /identity/accounts/prelogin` - 预登录检查

### API `/api/*`

- `GET /api/config` - 获取配置信息
- `POST /api/sync` - 同步数据

## 开发

```bash
# 安装依赖（如有）
npm install

# 本地开发
npm run dev

# 构建
npm run build
```

## 文档

- [快速部署指南](./docs/QUICK_DEPLOY.md) - 完整部署步骤
- [GitHub 上传指南](./docs/GITHUB_UPLOAD_GUIDE.md) - 项目上传到 GitHub

## 技术栈

- **前端**: HTML5, TypeScript
- **后端**: EdgeOne Pages Edge Functions
- **数据库**: Supabase PostgreSQL
- **部署**: EdgeOne Pages (腾讯云)

## 成本

### 免费额度

- EdgeOne: 10 万请求/月, 10GB 流量/月
- Supabase: 500MB 数据库, 5 万 API 调用/月

### 付费升级

- EdgeOne 基础版: ¥99/月
- Supabase Pro: $25/月

## 许可证

MIT License

## 技术支持

- [EdgeOne 文档](https://cloud.tencent.com/document/product/1552)
- [Supabase 文档](https://supabase.com/docs)
- [GitHub Issues](https://github.com/kobex95/warden-worker-2/issues)

## 贡献

欢迎提交 Issue 和 Pull Request！

## 免责声明

本项目仅供学习和个人使用，生产环境使用请自行评估安全性。
