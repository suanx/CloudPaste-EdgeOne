// EdgeOne Hono 应用入口
// 直接复用 backend/src/index.js 的 Hono 应用
// 导出 createApp 函数而非 { fetch } 对象，避免被检测为 Node.js 函数

export async function createApp() {
  const { default: app } = await import("./backend/src/index.js");
  return app;
}
