import { c as createLogger, bp as useSessionStorage, bq as getPublicFile, br as getFile, bs as getFiles, bt as verifyFilePassword, bu as batchDeleteFiles, bv as updateFile, av as defineStore, i as useLocalStorage, F as computed } from "./index-BQxzU9F1.js";
const log = createLogger("FilePasswordUtils");
function getFilePassword(options = {}) {
  const file = options.file || {};
  const slug = options.slug || file.slug;
  if (file.plain_password) {
    return file.plain_password;
  }
  if (file.currentPassword) {
    return file.currentPassword;
  }
  if (typeof window !== "undefined") {
    try {
      const currentUrl = new URL(options.url || window.location.href);
      const passwordParam = currentUrl.searchParams.get("password");
      if (passwordParam) {
        return passwordParam;
      }
    } catch (error) {
      log.warn("解析URL密码参数失败:", error);
    }
  }
  if (typeof window !== "undefined" && slug) {
    try {
      const stored = useSessionStorage(`file_password_${slug}`, "");
      return stored.value || null;
    } catch (error) {
      log.warn("从会话存储获取密码失败:", error);
    }
  }
  return null;
}
function setFilePassword(slug, password) {
  if (typeof window === "undefined" || !slug) return;
  try {
    const stored = useSessionStorage(`file_password_${slug}`, "");
    stored.value = password || "";
  } catch (error) {
    log.warn("写入会话存储密码失败:", error);
  }
}
function normalizeListResponse(response, limit, offset) {
  const payload = response?.data ?? response?.files ?? response;
  const files = Array.isArray(payload?.files) ? payload.files : Array.isArray(payload) ? payload : [];
  const rawPagination = payload?.pagination;
  const pagination = rawPagination ? {
    total: rawPagination.total ?? files.length,
    limit: rawPagination.limit ?? limit,
    offset: rawPagination.offset ?? offset,
    hasMore: rawPagination.hasMore ?? rawPagination.has_more ?? false
  } : { total: files.length, limit, offset, hasMore: false };
  return { files, pagination };
}
function parseFileShareUrl(url) {
  if (!url) return { isFileShare: false };
  const contentMatch = url.match(/\/api\/share\/content\/([^/?#]+)(?:\/[^?]*)?/);
  if (contentMatch) {
    const slug = contentMatch[1];
    const urlObj = new URL(url, window.location.origin);
    const password = urlObj.searchParams.get("password");
    return {
      isFileShare: true,
      type: "preview",
      slug,
      password,
      mode: "inline"
    };
  }
  const legacyMatch = url.match(/\/api\/s\/([^/?#]+)(?:\/[^?]*)?/);
  if (legacyMatch) {
    const slug = legacyMatch[1];
    const urlObj = new URL(url, window.location.origin);
    const password = urlObj.searchParams.get("password");
    const down = urlObj.searchParams.get("down");
    const mode = urlObj.searchParams.get("mode") || "inline";
    const isDownload = down && down !== "0" && down !== "false" || mode === "attachment" || mode === "download";
    return {
      isFileShare: true,
      type: isDownload ? "download" : "preview",
      slug,
      password,
      mode: isDownload ? "attachment" : "inline"
    };
  }
  return { isFileShare: false };
}
function ensurePasswordInUrl(url, password, file) {
  if (!url || !password) return url || "";
  const shareInfo = parseFileShareUrl(url);
  const isProxy = shareInfo.isFileShare || file?.use_proxy;
  if (!isProxy) return url;
  if (url.includes("password=")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}password=${encodeURIComponent(password)}`;
}
function resolvePassword(file, explicitPassword) {
  if (explicitPassword !== void 0) return explicitPassword;
  return getFilePassword({ file });
}
async function listSharedFiles(limit = 50, offset = 0, options = {}) {
  const response = await getFiles(limit, offset, options);
  if (!response?.success) {
    throw new Error(response?.message || "加载文件列表失败");
  }
  return normalizeListResponse(response, limit, offset);
}
async function getSharedFileById(id, options = {}) {
  const response = await getFile(id, options);
  if (!response?.success) {
    throw new Error(response?.message || "获取文件详情失败");
  }
  return response.data;
}
async function getSharedFileBySlug(slug) {
  const response = await getPublicFile(slug);
  if (!response?.success) {
    throw new Error(response?.message || "获取文件详情失败");
  }
  return response.data;
}
function buildPreviewUrl(file, options = {}) {
  if (!file) return "";
  const password = resolvePassword(file, options.password);
  let url = file.previewUrl || "";
  if (!url) return "";
  return ensurePasswordInUrl(url, password, file);
}
function buildContentUrl(file, options = {}) {
  if (!file || !file.slug) return "";
  const password = resolvePassword(file, options.password);
  let url = `/api/share/content/${file.slug}`;
  url = ensurePasswordInUrl(url, password, file);
  return url;
}
function buildDownloadUrl(file, options = {}) {
  if (!file) return "";
  const password = resolvePassword(file, options.password);
  let url = file.downloadUrl || "";
  if (!url) return "";
  return ensurePasswordInUrl(url, password, file);
}
async function getOfficePreviewUrl(file, options = {}) {
  const preview = file?.previewSelection;
  const providers = preview?.providers || {};
  if (!preview || !Object.keys(providers).length) {
    return null;
  }
  const returnAll = options.returnAll || false;
  if (!returnAll) {
    return providers.microsoft || null;
  }
  return {
    directUrl: buildPreviewUrl(file, options) || null,
    microsoft: providers.microsoft || "",
    google: providers.google || ""
  };
}
function getFileErrorKey(statusCode) {
  switch (statusCode) {
    case 401:
      return "fileView.errors.unauthorized";
    case 403:
      return "fileView.errors.forbidden";
    case 404:
      return "fileView.errors.notFound";
    case 410:
      return "fileView.errors.forbidden";
    default:
      return "fileView.errors.serverError";
  }
}
function useFileshareService() {
  const fetchList = async ({ limit, offset, search } = {}) => {
    const listOptions = {};
    if (search && search.trim().length > 0) {
      listOptions.search = search.trim();
    }
    const result = await listSharedFiles(limit, offset, listOptions);
    return (
      /** @type {{files: FileshareItem[], pagination: PaginationInfo}} */
      result
    );
  };
  const fetchById = async (id, options = {}) => {
    if (!id) {
      throw new Error("缺少文件 ID");
    }
    return (
      /** @type {FileshareItem} */
      await getSharedFileById(id, options)
    );
  };
  const fetchBySlug = async (slug) => {
    if (!slug) {
      throw new Error("缺少文件 slug");
    }
    return (
      /** @type {FileshareItem} */
      await getSharedFileBySlug(slug)
    );
  };
  const getPermanentDownloadUrl = (file) => {
    if (!file || !file.slug) return "";
    return buildDownloadUrl(file);
  };
  const getPermanentPreviewUrl = (file) => {
    if (!file || !file.slug) return "";
    return buildPreviewUrl(file);
  };
  const getPermanentContentUrl = (file) => {
    if (!file || !file.slug) return "";
    return buildContentUrl(file);
  };
  const getOfficePreviewUrl$1 = async (file, options = {}) => {
    return getOfficePreviewUrl(file, {
      provider: options.provider || "microsoft",
      returnAll: options.returnAll || false
    });
  };
  const buildShareUrl = (file, origin) => {
    if (!file || !file.slug) return "";
    const base = typeof origin === "string" && origin.length ? origin : typeof window !== "undefined" ? window.location.origin : "";
    if (!base) return `/file/${file.slug}`;
    const normalized = base.replace(/\/+$/, "");
    return `${normalized}/file/${file.slug}`;
  };
  const updateFileMetadata = async (fileId, metadata) => {
    if (!fileId) {
      throw new Error("缺少文件 ID");
    }
    const resp = await updateFile(fileId, metadata);
    if (resp && typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "更新文件信息失败");
      }
      return resp.data ?? true;
    }
    return true;
  };
  const deleteFiles = async (ids, deleteMode) => {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error("缺少要删除的文件 ID 列表");
    }
    const resp = await batchDeleteFiles(ids, deleteMode);
    if (!resp) {
      throw new Error("删除文件失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "删除文件失败");
      }
    }
    return resp;
  };
  const verifyFilePassword$1 = async (slug, password) => {
    if (!slug || !password) {
      throw new Error("缺少文件标识或密码");
    }
    const resp = await verifyFilePassword(slug, password);
    if (!resp) {
      throw new Error("验证文件密码失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "验证文件密码失败");
      }
      return resp.data ?? true;
    }
    return resp;
  };
  return {
    fetchList,
    fetchById,
    fetchBySlug,
    getPermanentDownloadUrl,
    getPermanentPreviewUrl,
    getPermanentContentUrl,
    getOfficePreviewUrl: getOfficePreviewUrl$1,
    buildShareUrl,
    updateFileMetadata,
    deleteFiles,
    verifyFilePassword: verifyFilePassword$1
  };
}
const useDeleteSettingsStore = defineStore("deleteSettings", () => {
  const storedSettings = useLocalStorage("cloudpaste_delete_settings", { deleteRecordOnly: false });
  const deleteRecordOnly = computed({
    get: () => !!storedSettings.value?.deleteRecordOnly,
    set: (value) => {
      storedSettings.value = { ...storedSettings.value || {}, deleteRecordOnly: !!value };
    }
  });
  const loadSettings = () => {
    deleteRecordOnly.value = !!storedSettings.value?.deleteRecordOnly;
  };
  const saveSettings = () => {
    storedSettings.value = { ...storedSettings.value || {}, deleteRecordOnly: !!deleteRecordOnly.value };
  };
  const toggleDeleteMode = () => {
    deleteRecordOnly.value = !deleteRecordOnly.value;
    saveSettings();
  };
  const getDeleteMode = () => {
    return deleteRecordOnly.value ? "record_only" : "both";
  };
  loadSettings();
  return {
    deleteRecordOnly,
    toggleDeleteMode,
    getDeleteMode,
    loadSettings,
    saveSettings
  };
});
export {
  useDeleteSettingsStore as a,
  getFileErrorKey as g,
  setFilePassword as s,
  useFileshareService as u
};
