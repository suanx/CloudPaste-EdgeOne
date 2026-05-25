import { _ as __vitePreload } from "./index-BQxzU9F1.js";
let qrcodeModulePromise = null;
async function loadQRCodeModule() {
  if (!qrcodeModulePromise) {
    qrcodeModulePromise = __vitePreload(() => import("./browser-H4v5nwME.js").then((n) => n.b), true ? [] : void 0);
  }
  const module = await qrcodeModulePromise;
  return module?.default || module;
}
async function generateQRCode(url, { darkMode = false, width = 300, margin = 2 } = {}) {
  if (!url) {
    throw new Error("无法生成二维码：URL为空");
  }
  const QRCode = await loadQRCodeModule();
  return QRCode.toDataURL(url, {
    width,
    margin,
    color: {
      dark: darkMode ? "#ffffff" : "#000000",
      light: darkMode ? "#000000" : "#ffffff"
    }
  });
}
export {
  generateQRCode as g
};
