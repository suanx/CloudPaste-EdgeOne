import { X as useClipboard, c as createLogger } from "./index-BQxzU9F1.js";
const clipboard = useClipboard({
  // legacy=true：在 Clipboard API 不可用/被限制时，自动回退到 execCommand
  legacy: true
});
const log = createLogger("Clipboard");
const copyToClipboard = async (text) => {
  try {
    const payload = String(text ?? "");
    if (!payload) return false;
    await clipboard.copy(payload);
    return true;
  } catch (err) {
    log.error("复制到剪贴板失败:", err);
    return false;
  }
};
export {
  copyToClipboard as c
};
