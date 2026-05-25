const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CreatorType = {
  ADMIN: "admin",
  API_KEY: "apikey",
  SYSTEM: "system",
  OTHER: "other"
};
const BADGE_CLASSES = {
  [CreatorType.ADMIN]: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  [CreatorType.API_KEY]: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  [CreatorType.SYSTEM]: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  [CreatorType.OTHER]: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
};
function useCreatorBadge(options = {}) {
  const { apiKeyNames = null } = options;
  const getCreatorType = (userId, keyName = null) => {
    if (!userId) {
      return CreatorType.SYSTEM;
    }
    if (keyName) {
      return CreatorType.API_KEY;
    }
    if (userId === "admin") {
      return CreatorType.ADMIN;
    }
    if (typeof userId === "string" && userId.startsWith("apikey:")) {
      return CreatorType.API_KEY;
    }
    if (UUID_REGEX.test(userId)) {
      if (apiKeyNames && apiKeyNames[userId]) {
        return CreatorType.API_KEY;
      }
      return CreatorType.ADMIN;
    }
    return CreatorType.OTHER;
  };
  const getCreatorText = (userId, keyName = null) => {
    const creatorType = getCreatorType(userId, keyName);
    switch (creatorType) {
      case CreatorType.ADMIN:
        return "管理员";
      case CreatorType.API_KEY:
        if (keyName) {
          return `密钥：${keyName}`;
        }
        if (typeof userId === "string" && userId.startsWith("apikey:")) {
          const keyPart = userId.substring(7);
          return `密钥：${keyPart.substring(0, 5)}...`;
        }
        if (apiKeyNames && apiKeyNames[userId]) {
          return `密钥：${apiKeyNames[userId]}`;
        }
        return `密钥：${userId.substring(0, 8)}...`;
      case CreatorType.SYSTEM:
        return "未知来源";
      default:
        return userId || "未知";
    }
  };
  const getCreatorBadgeClass = (userId, keyName = null) => {
    const creatorType = getCreatorType(userId, keyName);
    return BADGE_CLASSES[creatorType] || BADGE_CLASSES[CreatorType.OTHER];
  };
  const formatCreator = (item) => {
    if (!item) return "未知";
    return getCreatorText(item.created_by, item.key_name);
  };
  const getCreatorBadgeInfo = (userId, keyName = null) => {
    const type = getCreatorType(userId, keyName);
    return {
      type,
      text: getCreatorText(userId, keyName),
      badgeClass: BADGE_CLASSES[type] || BADGE_CLASSES[CreatorType.OTHER]
    };
  };
  return {
    // 类型枚举
    CreatorType,
    // 核心方法
    getCreatorType,
    getCreatorText,
    getCreatorBadgeClass,
    // 便捷方法
    formatCreator,
    getCreatorBadgeInfo
  };
}
const creatorBadgeUtils = {
  CreatorType,
  UUID_REGEX,
  BADGE_CLASSES,
  /**
   * 静态方法：判断创建者类型
   */
  getCreatorType(userId, keyName = null) {
    if (!userId) return CreatorType.SYSTEM;
    if (keyName) return CreatorType.API_KEY;
    if (userId === "admin") return CreatorType.ADMIN;
    if (typeof userId === "string" && userId.startsWith("apikey:")) return CreatorType.API_KEY;
    if (UUID_REGEX.test(userId)) return CreatorType.ADMIN;
    return CreatorType.OTHER;
  },
  /**
   * 静态方法：获取徽章样式类
   */
  getBadgeClass(userId, keyName = null) {
    const type = this.getCreatorType(userId, keyName);
    return BADGE_CLASSES[type] || BADGE_CLASSES[CreatorType.OTHER];
  }
};
export {
  creatorBadgeUtils as c,
  useCreatorBadge as u
};
