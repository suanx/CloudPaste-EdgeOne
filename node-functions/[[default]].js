// EdgeOne Pages Catch-All Handler
// 处理非 /api/* 的请求：根路径提供前端，其余回源
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // 根路径 -> 前端页面
  if (pathname === '/') {
    const indexUrl = new URL('/index.html', url.origin);
    const response = await fetch(indexUrl.toString());
    if (response.ok) return response;
    return new Response('Frontend not available', { status: 503 });
  }

  // 其余请求由静态文件服务处理
  return fetch(request);
}