// EdgeOne 入口 - 重新导出 backend/src/index.js 的 Hono 应用
// 使用动态延迟导入避免 EdgeOne 构建时扫描所有依赖
let appPromise = null;

export default {
  async fetch(request, env, ctx) {
    if (!appPromise) {
      appPromise = import("../backend/src/index.js");
    }
    const mod = await appPromise;
    return mod.default.fetch(request, env, ctx);
  },
};