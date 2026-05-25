import { E as api } from "./index-BQxzU9F1.js";
function useAdminApiKeyService() {
  const getAllApiKeys = async () => {
    const resp = await api.admin.getAllApiKeys();
    if (!resp) {
      throw new Error("获取 API 密钥列表失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "获取 API 密钥列表失败");
      }
      return Array.isArray(resp.data) ? resp.data : [];
    }
    if (Array.isArray(resp)) {
      return resp;
    }
    if (Array.isArray(resp.data)) {
      return resp.data;
    }
    return [];
  };
  const deleteApiKey = async (id) => {
    const resp = await api.admin.deleteApiKey(id);
    if (!resp) {
      throw new Error("删除 API 密钥失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "删除 API 密钥失败");
      }
    }
    return true;
  };
  const updateApiKey = async (id, data) => {
    const resp = await api.admin.updateApiKey(id, data);
    if (!resp) {
      throw new Error("更新 API 密钥失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "更新 API 密钥失败");
      }
      return resp.data ?? { id, ...data };
    }
    return resp;
  };
  const createApiKey = async (name, expiresAt, permissionsBitFlag, keyType, customKeyValue, basicPath, readOnly = false) => {
    const resp = await api.admin.createApiKey(name, expiresAt, permissionsBitFlag, keyType, customKeyValue, basicPath, readOnly);
    if (!resp) {
      throw new Error("创建 API 密钥失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "创建 API 密钥失败");
      }
      return resp.data ?? resp;
    }
    return resp;
  };
  const getApiKeyStorageAcl = async (id) => {
    const resp = await api.admin.getApiKeyStorageAcl(id);
    if (!resp) {
      throw new Error("获取存储 ACL 失败");
    }
    let payload = resp;
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "获取存储 ACL 失败");
      }
      payload = resp.data ?? resp;
    }
    const ids = payload?.storage_config_ids ?? payload?.storageConfigIds ?? [];
    return Array.isArray(ids) ? ids : [];
  };
  const updateApiKeyStorageAcl = async (id, storageConfigIds) => {
    const resp = await api.admin.updateApiKeyStorageAcl(id, storageConfigIds);
    if (!resp) {
      throw new Error("更新存储 ACL 失败");
    }
    let payload = resp;
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "更新存储 ACL 失败");
      }
      payload = resp.data ?? resp;
    }
    const ids = payload?.storage_config_ids ?? payload?.storageConfigIds ?? [];
    return Array.isArray(ids) ? ids : [];
  };
  return {
    getAllApiKeys,
    deleteApiKey,
    updateApiKey,
    createApiKey,
    getApiKeyStorageAcl,
    updateApiKeyStorageAcl
  };
}
export {
  useAdminApiKeyService as u
};
