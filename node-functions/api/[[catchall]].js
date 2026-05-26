// EdgeOne Pages Function - API 路由入口
// 使用 [[catchall]].js 捕获所有 /api/* 请求并委托给 Hono 应用
export async function onRequest(context) {
  const { createApp } = await import("../hono-app.js");
  const app = await createApp();
  return app.fetch(context.request, context.env, context);
}