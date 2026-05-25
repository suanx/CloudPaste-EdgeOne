import { E as api } from "./index-BQxzU9F1.js";
function useAdminSystemService() {
  const getSettingsByGroup = async (groupId, includeSecrets = true) => {
    const resp = await api.system.getSettingsByGroup(groupId, includeSecrets);
    if (!resp) {
      throw new Error("获取系统设置失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "获取系统设置失败");
      }
      return Array.isArray(resp.data) ? resp.data : [];
    }
    return Array.isArray(resp) ? resp : [];
  };
  const updateGroupSettings = async (groupId, data, includeSecrets) => {
    const resp = await api.system.updateGroupSettings(groupId, data, includeSecrets);
    if (!resp) {
      throw new Error("更新系统设置失败");
    }
    if (typeof resp === "object" && "success" in resp && !resp.success) {
      throw new Error(resp.message || "更新系统设置失败");
    }
  };
  const getCacheStats = async () => {
    const resp = await api.system.getCacheStats();
    if (!resp) {
      throw new Error("获取缓存统计信息失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "获取缓存统计信息失败");
      }
      return resp.data ?? {};
    }
    return resp;
  };
  const getVersionInfo = async () => {
    const resp = await api.system.getVersionInfo();
    if (!resp) {
      throw new Error("获取版本信息失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "获取版本信息失败");
      }
      return resp.data ?? {};
    }
    return resp;
  };
  const clearCache = async () => {
    const resp = await api.admin.clearCache();
    if (!resp) {
      throw new Error("清理缓存失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "清理缓存失败");
      }
      return resp.data ?? {};
    }
    return resp;
  };
  const getGlobalSettings = () => getSettingsByGroup(1, true);
  const updateGlobalSettings = (data) => updateGroupSettings(1, data, true);
  const getPreviewSettings = () => getSettingsByGroup(2, true);
  const updatePreviewSettings = (data) => updateGroupSettings(2, data, true);
  const getWebdavSettings = () => getSettingsByGroup(3, true);
  const updateWebdavSettings = (data) => updateGroupSettings(3, data, true);
  const getSiteSettings = () => getSettingsByGroup(4, true);
  const updateSiteSettings = (data) => updateGroupSettings(4, data);
  return {
    getSettingsByGroup,
    updateGroupSettings,
    getCacheStats,
    getVersionInfo,
    clearCache,
    getGlobalSettings,
    updateGlobalSettings,
    getPreviewSettings,
    updatePreviewSettings,
    getWebdavSettings,
    updateWebdavSettings,
    getSiteSettings,
    updateSiteSettings
  };
}
export {
  useAdminSystemService as u
};
