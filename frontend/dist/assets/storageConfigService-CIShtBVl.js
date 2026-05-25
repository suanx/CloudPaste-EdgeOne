import { E as api } from "./index-BQxzU9F1.js";
function useAdminStorageConfigService() {
  const getStorageConfigs = async (params = {}) => {
    const resp = await api.admin.getStorageConfigs(params);
    if (!resp) {
      throw new Error("获取存储配置列表失败");
    }
    let payload = resp;
    let total = resp?.total;
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "获取存储配置列表失败");
      }
      payload = resp.data ?? resp;
      if (typeof resp.total === "number") {
        total = resp.total;
      }
    }
    let dataBlock = payload;
    if (!Array.isArray(dataBlock)) {
      dataBlock = payload?.data && Array.isArray(payload.data) ? payload.data : payload?.items && Array.isArray(payload.items) ? payload.items : payload?.records && Array.isArray(payload.records) ? payload.records : payload?.data?.items && Array.isArray(payload.data.items) ? payload.data.items : payload;
    }
    const items = Array.isArray(dataBlock) ? dataBlock : [];
    if (typeof total !== "number") {
      total = typeof payload?.total === "number" ? payload.total : items.length;
    }
    const page = typeof params.page === "number" ? params.page : 1;
    const limit = typeof params.limit === "number" ? params.limit : items.length || 10;
    const pagination = {
      page,
      limit,
      total
    };
    return {
      items,
      pagination
    };
  };
  const getStorageConfigReveal = async (id, mode = "masked") => {
    const resp = await api.storage.getStorageConfigReveal(id, mode);
    if (!resp) {
      throw new Error("获取存储配置详情失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "获取存储配置详情失败");
      }
      return (
        /** @type {AdminStorageConfig} */
        resp.data ?? resp
      );
    }
    return (
      /** @type {AdminStorageConfig} */
      resp
    );
  };
  const createStorageConfig = async (data) => {
    const resp = await api.admin.createStorageConfig(data);
    if (!resp) {
      throw new Error("创建存储配置失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "创建存储配置失败");
      }
      return (
        /** @type {AdminStorageConfig} */
        resp.data ?? data
      );
    }
    return (
      /** @type {AdminStorageConfig} */
      resp
    );
  };
  const updateStorageConfig = async (id, data) => {
    const resp = await api.admin.updateStorageConfig(id, data);
    if (!resp) {
      throw new Error("更新存储配置失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "更新存储配置失败");
      }
      return (
        /** @type {AdminStorageConfig} */
        resp.data ?? { id, ...data }
      );
    }
    return (
      /** @type {AdminStorageConfig} */
      resp
    );
  };
  const deleteStorageConfig = async (id) => {
    const resp = await api.admin.deleteStorageConfig(id);
    if (!resp) {
      throw new Error("删除存储配置失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "删除存储配置失败");
      }
    }
    return true;
  };
  const setDefaultStorageConfig = async (id) => {
    const resp = await api.admin.setDefaultStorageConfig(id);
    if (!resp) {
      throw new Error("设置默认存储配置失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "设置默认存储配置失败");
      }
    }
    return true;
  };
  const testStorageConfig = async (id) => {
    const resp = await api.admin.testStorageConfig(id);
    if (!resp) {
      throw new Error("测试存储配置失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "测试存储配置失败");
      }
      return resp.data;
    }
    throw new Error("测试存储配置失败：响应结构无效");
  };
  return {
    getStorageConfigs,
    getStorageConfigReveal,
    createStorageConfig,
    updateStorageConfig,
    deleteStorageConfig,
    setDefaultStorageConfig,
    testStorageConfig
  };
}
export {
  useAdminStorageConfigService
};
