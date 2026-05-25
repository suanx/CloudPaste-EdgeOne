import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), "");

  // 统一版本管理
  const APP_VERSION = "1.9.1";
  const isDev = command === "serve";
  const enablePwa = command === "build";

  // 打印构建信息（仅在显式开启时）
  if (env.VITE_PRINT_BUILD_INFO === "1" || env.VITE_PRINT_BUILD_INFO === "true") {
    console.log("Vite构建信息:", {
      VITE_BACKEND_URL: env.VITE_BACKEND_URL || "未设置",
      VITE_APP_ENV: env.VITE_APP_ENV || "未设置",
      APP_VERSION: APP_VERSION,
      MODE: mode,
      COMMAND: command,
    });
  }

  const foliatePdfStubPath = fileURLToPath(new URL("./src/vendor/foliate-js/pdf.js", import.meta.url));

  // foliate-js 的 view.js 会动态 import('./pdf.js')，但其 pdf.js 使用了 Vite 不兼容的 glob。
  // CloudPaste 自身已有 PDF 预览，不需要 foliate-js 的 PDF 支持，因此把它替换为 stub，避免构建失败。
  const foliatePdfStubPlugin = () => ({
    name: "cloudpaste-foliate-pdf-stub",
    enforce: "pre",
    resolveId(source, importer) {
      if (source !== "./pdf.js") return null;
      if (!importer) return null;
      if (importer.replaceAll("\\\\", "/").includes("/node_modules/foliate-js/view.js")) {
        return foliatePdfStubPath;
      }
      return null;
    },
  });

  return {
    base: '/',
    define: {
      __APP_VERSION__: JSON.stringify(APP_VERSION),
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV || "production"),
      __BACKEND_URL__: JSON.stringify(env.VITE_BACKEND_URL || ""),
    },
plugins: [
      vue(),
      foliatePdfStubPlugin(),
      Components({
        dts: false,
        resolvers: [
          IconsResolver({
            prefix: "i",
            enabledCollections: ["mdi", "heroicons-outline", "heroicons-solid"],
          }),
        ],
      }),
      Icons({
        compiler: "vue3",
      }),
      // 临时禁用 PWA 以减少构建内存（生产环境可重新启用）
      // enablePwa &&
      //   VitePWA({
      //     registerType: "autoUpdate",
      //     injectRegister: "auto",
      //     devOptions: {
      //       enabled: false,
      //     },
      //     workbox: {
      //       globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2,ttf}"],
      //       maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      //       skipWaiting: true,
      //       clientsClaim: true,
      //       cleanupOutdatedCaches: true,
      //       navigateFallback: "index.html",
      //       navigateFallbackAllowlist: [/^\/$/, /^\/upload$/, /^\/admin/, /^\/paste\/.+/, /^\/file\/.+/, /^\/mount-explorer/],
      //       importScripts: ["/sw-background-sync.js"],
      //       runtimeCaching: [...],
      //     },
      //     includeAssets: ["favicon.ico", "apple-touch-icon.png", "robots.txt", "dist/**/*"],
      //     manifest: {...},
      //   }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 3000,
      open: true,
      // 设置代理 - 仅在本地开发模式下使用
      proxy: {
        // 当 VITE_BACKEND_URL 为本地地址时，将请求代理到本地worker
        "/api": {
          target: env.VITE_BACKEND_URL || "http://localhost:8787",
          changeOrigin: true,
          secure: false,
          // 打印代理日志
          configure: (proxy, _options) => {
            proxy.on("error", (err, _req, _res) => {
              console.log("代理错误", err);
            });
            proxy.on("proxyReq", (_proxyReq, req, _res) => {
              console.log("代理请求:", req.method, req.url);
            });
            proxy.on("proxyRes", (proxyRes, req, _res) => {
              console.log("代理响应:", req.method, req.url, proxyRes.statusCode);
            });
          },
        },
      },
    },
    // foliate-js 的部分模块（例如 pdf.js）使用了 top-level await。
    // 为了让 Vite/esbuild 在 dev 与 build 阶段都能正常处理，我们将 target 提升到 ES2022。
    esbuild: {
      target: "es2022",
    },
    optimizeDeps: {
      include: ["vue-i18n", "chart.js", "qrcode", "mime-db", "docx-preview"],
      // 跳过预构建，让 Vite 按原始 ESM 处理
      exclude: ["foliate-js"],
      esbuildOptions: {
        target: "es2022",
      },
    },
    build: {
      outDir: 'dist', // 显式指定输出目录
      target: "es2022",
      minify: "terser",
      terserOptions: {
        compress: {
          pure_funcs: ["console.log"],
        },
      },
      // 提高警告阈值以减少噪音（仍建议拆分大依赖）
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // 使用函数按 package 名称拆分 node_modules，避免单个 chunk 过大
          manualChunks(id) {
            if (!id) return null;
            if (id.includes('node_modules')) {
              // 取 node_modules 后的第一个路径段作为包名（兼容 scoped packages）
              const parts = id.split('node_modules/')[1].split('/');
              let pkgName = parts[0];
              if (pkgName && pkgName.startsWith('@') && parts.length > 1) {
                pkgName = `${pkgName}/${parts[1]}`; // scoped 包名
              }
              // 对一些特别大的包做单独命名
              const heavy = ['vue', 'vue-router', 'vue-i18n', 'chart.js', 'vue-chartjs', 'docx-preview', 'qrcode', 'file-saver', 'docx', '@vue-office', '@zumer'];
              if (heavy.some((h) => pkgName.startsWith(h))) {
                return `vendor-${pkgName.replace('@', '').replace('/', '-')}`;
              }
              // 默认把其它第三方库放入通用 vendor chunk
              return 'vendor';
            }
            return null;
          },
        },
      },
    },
  };
});
