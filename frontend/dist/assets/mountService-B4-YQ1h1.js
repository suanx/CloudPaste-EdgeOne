import { E as api } from "./index-BQxzU9F1.js";
function useAdminMountService() {
  const getMountsList = async () => {
    const resp = await api.mount.getMountsList();
    if (!resp) {
      throw new Error("获取挂载列表失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "获取挂载列表失败");
      }
      const data = resp.data ?? resp.items ?? resp.records ?? [];
      return Array.isArray(data) ? (
        /** @type {MountConfig[]} */
        data
      ) : [];
    }
    if (Array.isArray(resp)) {
      return (
        /** @type {MountConfig[]} */
        resp
      );
    }
    if (Array.isArray(resp.data)) {
      return (
        /** @type {MountConfig[]} */
        resp.data
      );
    }
    return [];
  };
  const updateMount = async (id, payload) => {
    const resp = await api.mount.updateMount(id, payload);
    if (!resp) {
      throw new Error("更新挂载失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "更新挂载失败");
      }
      return (
        /** @type {MountConfig} */
        resp.data ?? { id, ...payload }
      );
    }
    return (
      /** @type {MountConfig} */
      resp
    );
  };
  const createMount = async (payload) => {
    const resp = await api.mount.createMount(payload);
    if (!resp) {
      throw new Error("创建挂载失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "创建挂载失败");
      }
      return (
        /** @type {MountConfig} */
        resp.data ?? resp
      );
    }
    return (
      /** @type {MountConfig} */
      resp
    );
  };
  const deleteMount = async (id) => {
    const resp = await api.mount.deleteMount(id);
    if (!resp) {
      throw new Error("删除挂载失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "删除挂载失败");
      }
    }
    return true;
  };
  return {
    getMountsList,
    updateMount,
    createMount,
    deleteMount
  };
}
export {
  useAdminMountService
};
