import { a0 as IconStorageMirror, a1 as IconStorageHuggingFace, a2 as IconStorageDiscord, a3 as IconStorageTelegram, a4 as IconStorageLocal, a5 as IconStorageWebDAV, a6 as IconStorageGitHub, a7 as IconStorageGoogleDrive, a8 as IconStorageOneDrive, a9 as IconStorageS3 } from "./index-BQxzU9F1.js";
const STORAGE_TYPE_CONFIG = {
  S3: {
    icon: IconStorageS3,
    lightColor: "text-orange-600",
    darkColor: "text-orange-400",
    lightBg: "bg-orange-100",
    darkBg: "bg-orange-900/30"
  },
  ONEDRIVE: {
    icon: IconStorageOneDrive,
    lightColor: "text-sky-600",
    darkColor: "text-sky-400",
    lightBg: "bg-sky-100",
    darkBg: "bg-sky-900/30"
  },
  GOOGLE_DRIVE: {
    icon: IconStorageGoogleDrive,
    lightColor: "text-red-600",
    darkColor: "text-red-400",
    lightBg: "bg-red-100",
    darkBg: "bg-red-900/30"
  },
  GITHUB_RELEASES: {
    icon: IconStorageGitHub,
    lightColor: "text-gray-700",
    darkColor: "text-gray-300",
    lightBg: "bg-gray-100",
    darkBg: "bg-gray-700"
  },
  GITHUB_API: {
    icon: IconStorageGitHub,
    lightColor: "text-gray-700",
    darkColor: "text-gray-300",
    lightBg: "bg-gray-100",
    darkBg: "bg-gray-700"
  },
  WEBDAV: {
    icon: IconStorageWebDAV,
    lightColor: "text-blue-600",
    darkColor: "text-blue-400",
    lightBg: "bg-blue-100",
    darkBg: "bg-blue-900/30"
  },
  LOCAL: {
    icon: IconStorageLocal,
    lightColor: "text-gray-600",
    darkColor: "text-gray-300",
    lightBg: "bg-gray-100",
    darkBg: "bg-gray-700"
  },
  TELEGRAM: {
    icon: IconStorageTelegram,
    lightColor: "text-sky-500",
    darkColor: "text-sky-400",
    lightBg: "bg-sky-100",
    darkBg: "bg-sky-900/30"
  },
  DISCORD: {
    icon: IconStorageDiscord,
    lightColor: "text-indigo-600",
    darkColor: "text-indigo-400",
    lightBg: "bg-indigo-100",
    darkBg: "bg-indigo-900/30"
  },
  HUGGINGFACE_DATASETS: {
    icon: IconStorageHuggingFace,
    lightColor: "text-yellow-600",
    darkColor: "text-yellow-400",
    lightBg: "bg-yellow-100",
    darkBg: "bg-yellow-900/30"
  },
  MIRROR: {
    icon: IconStorageMirror,
    lightColor: "text-purple-600",
    darkColor: "text-purple-400",
    lightBg: "bg-purple-100",
    darkBg: "bg-purple-900/30"
  }
};
const DEFAULT_CONFIG = {
  icon: IconStorageS3,
  lightColor: "text-gray-600",
  darkColor: "text-gray-400",
  lightBg: "bg-gray-100",
  darkBg: "bg-gray-700"
};
function getConfig(storageType) {
  const type = storageType?.toUpperCase();
  return STORAGE_TYPE_CONFIG[type] || DEFAULT_CONFIG;
}
function useStorageTypeIcon() {
  function getStorageTypeIcon(storageType) {
    return getConfig(storageType).icon;
  }
  function getStorageTypeIconClass(storageType, isDarkMode) {
    const config = getConfig(storageType);
    return isDarkMode ? config.darkColor : config.lightColor;
  }
  function getStorageTypeBgClass(storageType, isDarkMode) {
    const config = getConfig(storageType);
    return isDarkMode ? config.darkBg : config.lightBg;
  }
  function getStorageTypeStyle(storageType, isDarkMode) {
    const config = getConfig(storageType);
    return {
      icon: config.icon,
      colorClass: isDarkMode ? config.darkColor : config.lightColor,
      bgClass: isDarkMode ? config.darkBg : config.lightBg
    };
  }
  return {
    getStorageTypeIcon,
    getStorageTypeIconClass,
    getStorageTypeBgClass,
    getStorageTypeStyle
  };
}
export {
  useStorageTypeIcon as u
};
