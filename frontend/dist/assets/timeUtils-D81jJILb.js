import { c as createLogger, i as useLocalStorage } from "./index-BQxzU9F1.js";
const storedLanguage = useLocalStorage("language", "zh-CN");
const log = createLogger("TimeUtils");
const getCurrentLanguage = () => {
  try {
    return storedLanguage.value || "zh-CN";
  } catch {
    return "zh-CN";
  }
};
const translations = {
  "zh-CN": {
    unknown: "未知",
    dateInvalid: "日期无效",
    dateFormatError: "日期格式错误",
    soon: "即将",
    justNow: "刚刚",
    minutesAgo: "{count}分钟前",
    minutesLater: "{count}分钟后",
    hoursAgo: "{count}小时前",
    hoursLater: "{count}小时后",
    daysAgo: "{count}天前",
    daysLater: "{count}天后",
    weeksAgo: "{count}周前",
    weeksLater: "{count}周后",
    monthsAgo: "{count}个月前",
    monthsLater: "{count}个月后",
    yearsAgo: "{count}年前",
    yearsLater: "{count}年后",
    neverExpires: "永不过期",
    expired: "已过期"
  },
  "en-US": {
    unknown: "Unknown",
    dateInvalid: "Invalid Date",
    dateFormatError: "Date Format Error",
    soon: "Soon",
    justNow: "Just now",
    minutesAgo: "{count} minutes ago",
    minutesLater: "{count} minutes later",
    hoursAgo: "{count} hours ago",
    hoursLater: "{count} hours later",
    daysAgo: "{count} days ago",
    daysLater: "{count} days later",
    weeksAgo: "{count} weeks ago",
    weeksLater: "{count} weeks later",
    monthsAgo: "{count} months ago",
    monthsLater: "{count} months later",
    yearsAgo: "{count} years ago",
    yearsLater: "{count} years later",
    neverExpires: "Never expires",
    expired: "Expired"
  }
};
const t = (key, params = {}) => {
  const lang = getCurrentLanguage();
  const langTranslations = translations[lang] || translations["zh-CN"];
  let text = langTranslations[key] || key;
  if (params.count !== void 0) {
    text = text.replace("{count}", params.count);
  }
  return text;
};
const TIME_FORMAT_OPTIONS = {
  // 完整日期时间格式（年-月-日 时:分）
  FULL_DATETIME: {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
    // 使用24小时制
  },
  // 完整日期时间格式（包含秒）
  FULL_DATETIME_WITH_SECONDS: {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  },
  // 相对时间单位（毫秒）
  RELATIVE_TIME_UNITS: {
    MINUTE: 60,
    HOUR: 3600,
    DAY: 86400,
    WEEK: 604800,
    MONTH: 2592e3,
    // 30天
    YEAR: 31536e3
    // 365天
  }
};
const parseUTCDate = (utcDateString) => {
  if (!utcDateString) {
    return null;
  }
  try {
    if (utcDateString instanceof Date) {
      return isNaN(utcDateString.getTime()) ? null : utcDateString;
    }
    if (typeof utcDateString !== "string") {
      return null;
    }
    let dateString = utcDateString.trim();
    if (dateString.includes("T") && (dateString.endsWith("Z") || /[+-]\d{2}:\d{2}$/.test(dateString))) {
      const date2 = new Date(dateString);
      return isNaN(date2.getTime()) ? null : date2;
    }
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(dateString)) {
      dateString = dateString.replace(" ", "T") + "Z";
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      dateString = dateString + "T00:00:00Z";
    } else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(dateString)) {
      dateString = dateString + "Z";
    }
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  } catch (error) {
    log.error("解析 UTC 时间失败:", error, "输入:", utcDateString);
    return null;
  }
};
const getUserLocale = () => {
  if (navigator.language) {
    return navigator.language;
  }
  if (navigator.languages && navigator.languages.length > 0) {
    return navigator.languages[0];
  }
  return "zh-CN";
};
const formatDateTime = (utcDateString, options = TIME_FORMAT_OPTIONS.FULL_DATETIME, locale = getUserLocale()) => {
  if (!utcDateString) return t("unknown");
  const date = parseUTCDate(utcDateString);
  if (!date) {
    log.warn("时间解析失败:", utcDateString);
    return t("dateInvalid");
  }
  try {
    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (error) {
    log.error("日期格式化错误:", error, "输入:", utcDateString);
    return t("dateFormatError");
  }
};
const formatDateTimeWithSeconds = (utcDateString, locale = getUserLocale()) => {
  return formatDateTime(utcDateString, TIME_FORMAT_OPTIONS.FULL_DATETIME_WITH_SECONDS, locale);
};
const formatRelativeTime = (utcDateString, baseDate = /* @__PURE__ */ new Date()) => {
  if (!utcDateString) return "";
  const targetDate = parseUTCDate(utcDateString);
  if (!targetDate) {
    return "";
  }
  try {
    const diffInSeconds = Math.floor((targetDate - baseDate) / 1e3);
    const absDiff = Math.abs(diffInSeconds);
    const isInFuture = diffInSeconds > 0;
    const { MINUTE, HOUR, DAY, WEEK, MONTH, YEAR } = TIME_FORMAT_OPTIONS.RELATIVE_TIME_UNITS;
    if (absDiff < MINUTE) {
      return isInFuture ? t("soon") : t("justNow");
    } else if (absDiff < HOUR) {
      const minutes = Math.floor(absDiff / MINUTE);
      return isInFuture ? t("minutesLater", { count: minutes }) : t("minutesAgo", { count: minutes });
    } else if (absDiff < DAY) {
      const hours = Math.floor(absDiff / HOUR);
      return isInFuture ? t("hoursLater", { count: hours }) : t("hoursAgo", { count: hours });
    } else if (absDiff < WEEK) {
      const days = Math.floor(absDiff / DAY);
      return isInFuture ? t("daysLater", { count: days }) : t("daysAgo", { count: days });
    } else if (absDiff < MONTH) {
      const weeks = Math.floor(absDiff / WEEK);
      return isInFuture ? t("weeksLater", { count: weeks }) : t("weeksAgo", { count: weeks });
    } else if (absDiff < YEAR) {
      const months = Math.floor(absDiff / MONTH);
      return isInFuture ? t("monthsLater", { count: months }) : t("monthsAgo", { count: months });
    } else {
      const years = Math.floor(absDiff / YEAR);
      return isInFuture ? t("yearsLater", { count: years }) : t("yearsAgo", { count: years });
    }
  } catch (error) {
    log.error("相对时间计算错误:", error);
    return "";
  }
};
const formatExpiry = (expiryDateString) => {
  if (!expiryDateString) return t("neverExpires");
  const expiryDate = parseUTCDate(expiryDateString);
  if (!expiryDate) {
    return t("dateInvalid");
  }
  const now = /* @__PURE__ */ new Date();
  try {
    if (expiryDate < now) {
      return t("expired");
    }
    const formattedDate = formatDateTime(expiryDateString);
    const relativeTime = formatRelativeTime(expiryDateString, now);
    return `${formattedDate} (${relativeTime})`;
  } catch (error) {
    log.error("过期时间格式化错误:", error);
    return t("dateFormatError");
  }
};
const isExpired = (expiryDateString) => {
  if (!expiryDateString) return false;
  const expiryDate = parseUTCDate(expiryDateString);
  if (!expiryDate) return false;
  return expiryDate < /* @__PURE__ */ new Date();
};
const formatCurrentTime = () => {
  const now = /* @__PURE__ */ new Date();
  return now.toLocaleTimeString(getUserLocale(), {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
};
const formatNowForFilename = () => {
  const now = /* @__PURE__ */ new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
};
const formatLocalDateTimeWithSeconds = (date) => {
  if (!date) return t("unknown");
  const parsed = parseUTCDate(date);
  if (!parsed) {
    return t("dateInvalid");
  }
  try {
    return new Intl.DateTimeFormat(getUserLocale(), TIME_FORMAT_OPTIONS.FULL_DATETIME_WITH_SECONDS).format(parsed);
  } catch (error) {
    log.error("日期格式化错误:", error, "输入:", date);
    return t("dateFormatError");
  }
};
export {
  formatRelativeTime as a,
  formatDateTimeWithSeconds as b,
  formatDateTime as c,
  formatLocalDateTimeWithSeconds as d,
  formatNowForFilename as e,
  formatCurrentTime as f,
  getUserLocale as g,
  formatExpiry as h,
  isExpired as i,
  parseUTCDate as p
};
