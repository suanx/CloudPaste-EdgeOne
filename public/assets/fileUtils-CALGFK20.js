import { f as formatFileSize$1 } from "./fileTypes-C4-giE9O.js";
const formatFileSize = (bytes, useChineseUnits = false) => {
  if (typeof bytes !== "number" || !Number.isFinite(bytes) || bytes < 0) {
    return "-";
  }
  return formatFileSize$1(bytes);
};
const getRemainingViews = (item) => {
  if (!item || !item.max_views || item.max_views === 0) {
    return Infinity;
  }
  const viewCount = item.view_count !== void 0 ? item.view_count : item.views || 0;
  const remaining = item.max_views - viewCount;
  if (remaining <= 0) {
    return 0;
  }
  return remaining;
};
export {
  formatFileSize as f,
  getRemainingViews as g
};
