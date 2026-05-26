// EdgeOne Hono 应用入口
// 使用动态延迟导入避免 EdgeOne 构建时追踪依赖
// 导出 createApp 函数而非 { fetch } 对象，避免被检测为 Node.js 函数

let appPromise = null;

export async function createApp() {
  if (appPromise) return appPromise;
  appPromise = (async () => {
    const { Hono } = await import("hono");
    const { cors } = await import("hono/cors");

    const adminRoutes = (await import("./backend/src/routes/adminRoutes.js")).default;
    const adminFsIndexRoutes = (await import("./backend/src/routes/adminFsIndexRoutes.js")).default;
    const apiKeyRoutes = (await import("./backend/src/routes/apiKeyRoutes.js")).default;
    const { backupRoutes } = await import("./backend/src/routes/backupRoutes.js");
    const storageConfigRoutes = (await import("./backend/src/routes/storageConfigRoutes.js")).default;
    const systemRoutes = (await import("./backend/src/routes/systemRoutes.js")).default;
    const mountRoutes = (await import("./backend/src/routes/mountRoutes.js")).default;
    const webdavRoutes = (await import("./backend/src/routes/webdavRoutes.js")).default;
    const fsRoutes = (await import("./backend/src/routes/fsRoutes.js")).default;
    const fsMetaRoutes = (await import("./backend/src/routes/fsMetaRoutes.js")).default;
    const { DbTables, ApiStatus, UserType } = await import("./backend/src/constants/index.js");
    const { createErrorResponse, jsonOk } = await import("./backend/src/utils/common.js");
    const filesRoutes = (await import("./backend/src/routes/filesRoutes.js")).default;
    const shareUploadRoutes = (await import("./backend/src/routes/shareUploadRoutes.js")).default;
    const pastesRoutes = (await import("./backend/src/routes/pastesRoutes.js")).default;
    const fileViewRoutes = (await import("./backend/src/routes/fileViewRoutes.js")).default;
    const { fsProxyRoutes } = await import("./backend/src/routes/fsProxyRoutes.js");
    const { proxyLinkRoutes } = await import("./backend/src/routes/proxyLinkRoutes.js");
    const scheduledRoutes = (await import("./backend/src/routes/scheduledRoutes.js")).default;
    const { securityContext } = await import("./backend/src/security/middleware/securityContext.js");
    const { withRepositories } = await import("./backend/src/utils/repositories.js");
    const { errorBoundary } = await import("./backend/src/http/middlewares/errorBoundary.js");
    const { normalizeError, sanitizeErrorMessageForClient } = await import("./backend/src/http/errors.js");
    const { WEBDAV_BASE_PATH } = await import("./backend/src/webdav/auth/config/WebDAVConfig.js");

    const getTimeSource = () => {
      if (typeof performance !== "undefined" && typeof performance.now === "function") {
        return () => performance.now();
      }
      return () => Date.now();
    };
    const now = getTimeSource();
    const generateRequestId = () => {
      if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
      }
      return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    };
    const getAuthSnapshot = (c) => {
      const authResult = c.get("authResult");
      if (!authResult) {
        return { userType: UserType.ANONYMOUS, userId: null };
      }
      if (authResult.isAdmin && authResult.isAdmin()) {
        return { userType: UserType.ADMIN, userId: authResult.getUserId?.() || null };
      }
      if (authResult.keyInfo) {
        return { userType: UserType.API_KEY, userId: authResult.keyInfo.id || authResult.keyInfo.name || null };
      }
      return { userType: UserType.ANONYMOUS, userId: authResult.getUserId?.() || null };
    };

    const structuredLogger = async (c, next) => {
      const existingReqId = c.get("reqId");
      const reqId = existingReqId ?? generateRequestId();
      if (!existingReqId) {
        c.set("reqId", reqId);
      }

      const started = now();
      let caughtError = null;
      try {
        await next();
      } catch (error) {
        caughtError = error;
        throw error;
      } finally {
        const handledError = c.get("handledError");
        const durationMs = Number((now() - started).toFixed(2));
        const slow = durationMs >= 1000;
        const { userType, userId } = getAuthSnapshot(c);
        const status = handledError?.status ?? caughtError?.status ?? c.res?.status ?? 200;
        const logPayload = {
          type: "request",
          reqId,
          method: c.req.method,
          path: c.req.path,
          status,
          durationMs,
          slow,
          userType,
          userId,
        };

        const errorForLog = handledError?.originalError ?? caughtError;
        if (errorForLog) {
          logPayload.error = {
            name: errorForLog.name,
            message: handledError?.publicMessage ?? errorForLog.message,
          };
        }

        console.log(JSON.stringify(logPayload));
      }
    };

    const app = new Hono();
    app.use("*", structuredLogger);

    app.use("*", async (c, next) => {
      const isWebDAVPath = c.req.path === WEBDAV_BASE_PATH || c.req.path.startsWith(WEBDAV_BASE_PATH + "/");
      const isRootPath = c.req.path === "/";

      if (c.req.method === "OPTIONS" && (isWebDAVPath || isRootPath)) {
        console.log("WebDAV OPTIONS 请求:", c.req.method, c.req.path);
        await next();
        return;
      }

      const corsMiddleware = cors({
        origin: (origin) => origin || "*",
        allowHeaders: [
          "Content-Type",
          "Authorization",
          "Range",
          "X-API-KEY",
          "X-FS-Path-Token",
          "X-FS-Path-Tokens",
          "X-Custom-Auth-Key",
          "Depth",
          "Destination",
          "Overwrite",
          "If-Match",
          "If-None-Match",
          "If-Modified-Since",
          "If-Unmodified-Since",
          "Lock-Token",
          "Content-Range",
          "Content-Length",
          "X-Requested-With",
          "X-FS-Filename",
          "X-FS-Options",
          "X-Share-Filename",
          "X-Share-Options",
        ],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PROPFIND", "PROPPATCH", "MKCOL", "COPY", "MOVE", "LOCK", "UNLOCK", "HEAD"],
        exposeHeaders: ["ETag", "Content-Length", "Content-Disposition", "Content-Range", "Accept-Ranges", "X-Request-Id"],
        maxAge: 86400,
        credentials: true,
      });

      return await corsMiddleware(c, next);
    });

    app.use("*", errorBoundary());
    app.use("*", withRepositories());
    app.use("*", securityContext());

    app.options("/", (c) => {
      const headers = {
        Allow: "OPTIONS, PROPFIND, GET, HEAD, PUT, DELETE, MKCOL, COPY, MOVE, LOCK, UNLOCK, PROPPATCH",
        DAV: "1, 2",
        "MS-Author-Via": "DAV",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, PROPFIND, GET, HEAD, PUT, DELETE, MKCOL, COPY, MOVE, LOCK, UNLOCK, PROPPATCH",
        "Access-Control-Allow-Headers": "Authorization, Content-Type, Depth, Destination, If, Lock-Token, Overwrite, X-Custom-Auth-Key",
        "Access-Control-Expose-Headers": "DAV, Lock-Token, MS-Author-Via",
        "Access-Control-Max-Age": "86400",
      };
      return new Response("", { status: 200, headers });
    });

    app.route("/", adminRoutes);
    app.route("/", adminFsIndexRoutes);
    app.route("/", apiKeyRoutes);
    app.route("/", backupRoutes);
    app.route("/", fileViewRoutes);
    app.route("/", filesRoutes);
    app.route("/", shareUploadRoutes);
    app.route("/", pastesRoutes);
    app.route("/", storageConfigRoutes);
    app.route("/", systemRoutes);
    app.route("/", mountRoutes);
    app.route("/", webdavRoutes);
    app.route("/", fsRoutes);
    app.route("/", fsMetaRoutes);
    app.route("/", fsProxyRoutes);
    app.route("/", proxyLinkRoutes);
    app.route("/", scheduledRoutes);

    app.get("/api/health", (c) => {
      return jsonOk(c, { status: "ok", timestamp: new Date().toISOString() });
    });

    app.onError((err, c) => {
      const normalized = normalizeError(err, {
        method: c.req.method,
        path: c.req.path,
        reqId: c.get("reqId"),
      });
      console.error(`[错误] ${normalized.publicMessage}`, err);
      const reqId = c.get("reqId");
      if (reqId) c.header("X-Request-Id", String(reqId));
      const debugMessage = normalized.expose ? null : sanitizeErrorMessageForClient(normalized.originalError?.message || err);
      return c.json(
        createErrorResponse(
          normalized.status,
          normalized.expose ? normalized.publicMessage : "服务器内部错误",
          normalized.code,
          {
            ...(reqId ? { requestId: String(reqId) } : {}),
            ...(debugMessage ? { debugMessage } : {}),
          }
        ),
        normalized.status
      );
    });

    app.notFound((c) => {
      const reqId = c.get("reqId");
      if (reqId) c.header("X-Request-Id", String(reqId));
      return c.json(createErrorResponse(ApiStatus.NOT_FOUND, "未找到请求的资源", "NOT_FOUND"), ApiStatus.NOT_FOUND);
    });

    return app;
  })();
  return appPromise;
}
