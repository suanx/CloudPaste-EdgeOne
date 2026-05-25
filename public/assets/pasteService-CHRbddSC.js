import { f as useAuthStore, E as api } from "./index-BQxzU9F1.js";
function usePasteService() {
  const authStore = useAuthStore();
  const isAdmin = () => authStore.isAdmin;
  const isApiKeyManager = () => authStore.authType === "apikey" && authStore.hasTextManagePermission;
  const isApiKeyCreator = () => authStore.isKeyUser && authStore.hasTextSharePermission;
  const ensureCanManage = () => {
    if (!isAdmin() && !isApiKeyManager()) {
      throw new Error("当前账号无权管理文本数据");
    }
  };
  const ensureCanCreate = () => {
    if (!isAdmin() && !isApiKeyCreator()) {
      throw new Error("当前账号无权创建文本分享");
    }
  };
  const getPastes = async ({ limit = 20, offset = 0, search } = {}) => {
    ensureCanManage();
    const options = {};
    if (search && search.trim()) {
      options.search = search.trim();
    }
    const resp = await api.paste.getPastes(null, limit, offset, options);
    if (!resp || typeof resp !== "object" || resp.success !== true) {
      const message = resp && typeof resp === "object" && "message" in resp ? resp.message : null;
      throw new Error(message || "获取文本列表失败");
    }
    const payload = resp.data || {};
    const items = Array.isArray(payload.results) ? payload.results : [];
    const pagination = payload.pagination || {};
    const finalPagination = {
      total: typeof pagination.total === "number" ? pagination.total : items.length,
      limit: typeof pagination.limit === "number" ? pagination.limit : limit,
      offset: typeof pagination.offset === "number" ? pagination.offset : offset,
      hasMore: typeof pagination.hasMore === "boolean" ? pagination.hasMore : void 0
    };
    return (
      /** @type {PasteListResponse} */
      {
        items,
        pagination: finalPagination
      }
    );
  };
  const getPasteById = async (id) => {
    ensureCanManage();
    const resp = isAdmin() ? await api.admin.getPasteById(id) : await api.user.paste.getPasteById(id);
    if (!resp) {
      throw new Error("获取文本详情失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "获取文本详情失败");
      }
      return (
        /** @type {Paste} */
        resp.data ?? resp
      );
    }
    return (
      /** @type {Paste} */
      resp
    );
  };
  const updatePaste = async (slug, data) => {
    ensureCanManage();
    const resp = isAdmin() ? await api.admin.updatePaste(slug, data) : await api.user.paste.updatePaste(slug, data);
    if (!resp) {
      throw new Error("更新文本失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "更新文本失败");
      }
      return resp.data ?? true;
    }
    return resp;
  };
  const deleteSinglePaste = async (id) => {
    ensureCanManage();
    const resp = isAdmin() ? await api.admin.batchDeletePastes([id]) : await api.user.paste.batchDeletePastes([id]);
    if (!resp) {
      throw new Error("删除文本失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "删除文本失败");
      }
    }
    return true;
  };
  const deletePastes = async (ids) => {
    ensureCanManage();
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error("缺少待删除文本 ID 列表");
    }
    const resp = isAdmin() ? await api.admin.batchDeletePastes(ids) : await api.user.paste.batchDeletePastes(ids);
    if (!resp) {
      throw new Error("批量删除文本失败");
    }
    if (typeof resp === "object" && "success" in resp && !resp.success) {
      throw new Error(resp.message || "批量删除文本失败");
    }
    return true;
  };
  const clearExpiredPastes = async () => {
    if (!isAdmin()) {
      throw new Error("仅管理员可以清理过期文本");
    }
    const resp = await api.system.clearExpiredPastes();
    if (!resp) {
      throw new Error("清理过期文本失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "清理过期文本失败");
      }
      return resp.message || "已清理过期文本";
    }
    return "已清理过期文本";
  };
  const getPasteBySlug = async (slug, password = null) => {
    const resp = await api.paste.getPaste(slug, password);
    if (!resp) {
      throw new Error("获取文本详情失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "获取文本详情失败");
      }
      return (
        /** @type {Paste} */
        resp.data ?? resp
      );
    }
    return (
      /** @type {Paste} */
      resp
    );
  };
  const createPaste = async (data) => {
    ensureCanCreate();
    const resp = await api.paste.createPaste(data);
    if (!resp) {
      throw new Error("创建文本失败");
    }
    let slug = null;
    if (typeof resp === "object") {
      if ("success" in resp || "code" in resp) {
        if (resp.success && resp.data && resp.data.slug) {
          slug = resp.data.slug;
        } else {
          throw new Error(resp.message || "创建文本失败");
        }
      } else if (resp.slug) {
        slug = resp.slug;
      } else {
        const candidates = ["id", "key", "identifier"];
        for (const field of candidates) {
          if (resp[field]) {
            slug = resp[field];
            break;
          }
        }
      }
    }
    if (!slug) {
      throw new Error("创建文本失败：未能获取到标识");
    }
    return slug;
  };
  const getRawPasteUrl = (slug, password = null) => {
    return api.paste.getRawPasteUrl(slug, password);
  };
  const getMarkdownSettings = async () => {
    const resp = await api.system.getSettingsByGroup(4, false);
    if (!resp) {
      throw new Error("获取 Markdown 设置失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "获取 Markdown 设置失败");
      }
      return Array.isArray(resp.data) ? resp.data : [];
    }
    return Array.isArray(resp) ? resp : [];
  };
  return {
    getPastes,
    getPasteById,
    updatePaste,
    deleteSinglePaste,
    deletePastes,
    clearExpiredPastes,
    getPasteBySlug,
    createPaste,
    getRawPasteUrl,
    getMarkdownSettings
  };
}
export {
  usePasteService as u
};
