const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/fileTypes-C4-giE9O.js","assets/index-BQxzU9F1.js"])))=>i.map(i=>d[i]);
import { e as useI18n, F as computed, g as ref, c as createLogger, _ as __vitePreload, a$ as h, M as createBlock, k as openBlock, aE as withCtx, j as createElementBlock, K as Fragment, L as renderList, l as createBaseVNode, p as createCommentVNode, m as withModifiers, n as normalizeClass, t as toDisplayString, z as createVNode, y as unref, al as IconCopy, bn as IconQrCode, b3 as IconLockClosed, bo as IconLink, bg as IconEye, bh as IconRename, b7 as IconDelete, G as IconClose, ac as useThemeMode, o as onMounted, J as IconRefresh, be as isRef, A as createTextVNode, bb as IconClock, ar as mergeProps } from "./index-BQxzU9F1.js";
import { c as copyToClipboard } from "./clipboard-GLHRBPpJ.js";
import { a as useDeleteSettingsStore, u as useFileshareService } from "./deleteSettingsStore-WCtYZw-P.js";
import { u as useAdminBase } from "./useAdminBase-CxkodUK-.js";
import { u as useStorageConfigsStore } from "./storageConfigsStore-DUFoycii.js";
import { a as formatRelativeTime, c as formatDateTime, p as parseUTCDate, b as formatDateTimeWithSeconds } from "./timeUtils-D81jJILb.js";
import { g as generateQRCode } from "./qrcodeUtils-xDdVh-90.js";
import { u as useFileShareStore, _ as _sfc_main$6 } from "./FileEditModal-BjxRZLXf.js";
import { u as useConfirmDialog, _ as _sfc_main$8, c as createConfirmFn } from "./useConfirmDialog-c5dcTgIB.js";
import { _ as _sfc_main$3 } from "./AdminTable-CrUS055e.js";
import { b as getDisplayName } from "./fileTypes-C4-giE9O.js";
import { f as formatFileSize, g as getRemainingViews } from "./fileUtils-CALGFK20.js";
import { g as getFileIcon } from "./fileTypeIcons-s4hrDi1Q.js";
import { _ as _sfc_main$5 } from "./CommonPagination-WikHSq_I.js";
import { _ as _sfc_main$7 } from "./QRCodeModal-BNW9qcWt.js";
import { _ as _sfc_main$4 } from "./GlobalSearchBox-JKLU6Q9a.js";
const log = createLogger("FileManagement");
function useFileManagement(userType = "admin", { confirmFn } = {}) {
  if (!confirmFn) {
    throw new Error("useFileManagement 必须传入 confirmFn（请在 View 里用 useConfirmDialog + createConfirmFn 创建）");
  }
  const base = useAdminBase("file-management");
  const { t } = useI18n();
  const fileshareService = useFileshareService();
  const fileShareStore = useFileShareStore();
  const files = computed(() => fileShareStore.items);
  const editingFile = ref(null);
  const previewFile = ref(null);
  const showEdit = ref(false);
  const showPreview = ref(false);
  const showQRCodeModal = ref(false);
  const qrCodeDataURL = ref("");
  const qrCodeSlug = ref("");
  const deleteSettingsStore = useDeleteSettingsStore();
  const searchQuery = ref("");
  const isSearchMode = ref(false);
  const searchLoading = ref(false);
  const loadFiles = async () => {
    return await base.withLoading(async () => {
      try {
        const { pagination } = await fileShareStore.loadList({
          limit: base.pagination.limit,
          offset: base.pagination.offset
        });
        base.updatePagination(pagination, "offset");
        base.updateLastRefreshTime();
      } catch (error) {
        log.error("加载文件列表失败:", error);
        base.showError(error.message || "加载数据失败");
        fileShareStore.resetState();
      }
    });
  };
  const handleOffsetChange = (newOffset) => {
    base.handlePaginationChange(newOffset, "offset");
    loadFiles();
  };
  const handleFileDelete = async (file) => {
    const confirmed = await confirmFn({
      title: t("common.dialogs.deleteTitle"),
      message: t("common.dialogs.deleteItem", { name: `"${file.filename}"` }),
      confirmType: "danger"
    });
    if (!confirmed) {
      return;
    }
    return await base.withLoading(async () => {
      await fileshareService.deleteFiles([file.id], deleteSettingsStore.getDeleteMode());
      base.showSuccess("删除成功");
      fileShareStore.removeFromStore(file.id);
      await loadFiles();
    });
  };
  const handleBatchDelete = async () => {
    const selectedCount = base.selectedItems.value.length;
    if (selectedCount === 0) {
      base.showError("请先选择要删除的文件");
      return;
    }
    const confirmed = await confirmFn({
      title: t("common.dialogs.deleteTitle"),
      message: t("common.dialogs.deleteMultiple", { count: selectedCount }),
      confirmType: "danger"
    });
    if (!confirmed) {
      return;
    }
    return await base.withLoading(async () => {
      try {
        const result = await fileshareService.deleteFiles(base.selectedItems.value, deleteSettingsStore.getDeleteMode());
        if (result?.data && Array.isArray(result.data.failed) && result.data.failed.length > 0) {
          const { success: successCount, failed } = result.data;
          const failedCount = failed.length;
          base.showSuccess(`批量删除完成：成功 ${successCount} 个，失败 ${failedCount} 个`);
          const failedDetails = failed.map((item) => `ID: ${item.id} - ${item.error}`).join("\n");
          log.warn("部分文件删除失败:", failedDetails);
        } else if (result?.data && typeof result.data.success === "number") {
          base.showSuccess(`成功删除 ${result.data.success} 个文件`);
        } else {
          base.showSuccess(`成功删除 ${selectedCount} 个文件`);
        }
      } finally {
        base.clearSelection();
        await loadFiles();
      }
    });
  };
  const openEditModal = async (file) => {
    try {
      const detail = await fileShareStore.fetchById(file.id, { useCache: false });
      editingFile.value = detail;
      showEdit.value = true;
    } catch (err) {
      log.error("获取文件详情失败:", err);
      base.showError(err.message || "获取文件详情失败，请稍后重试");
    }
  };
  const updateFileMetadata = async (updatedFile) => {
    return await base.withLoading(async () => {
      try {
        await fileshareService.updateFileMetadata(updatedFile.id, updatedFile);
        base.showSuccess("文件信息更新成功");
        showEdit.value = false;
        editingFile.value = null;
        await loadFiles();
      } catch (err) {
        log.error("更新文件信息失败:", err);
        base.showError(err.message || "更新失败");
      }
    });
  };
  const openPreviewModal = async (file) => {
    try {
      const detail = await fileShareStore.fetchById(file.id, { useCache: false, includeLinks: true });
      previewFile.value = detail;
      showPreview.value = true;
    } catch (err) {
      log.error("获取文件详情失败:", err);
      base.showError(err.message || "获取文件详情失败，请稍后重试");
    }
  };
  const generateQRCode$1 = async (file, darkMode = false) => {
    try {
      const fileUrl = fileshareService.buildShareUrl(file, window.location.origin);
      qrCodeDataURL.value = await generateQRCode(fileUrl, { darkMode });
      qrCodeSlug.value = file.slug;
      showQRCodeModal.value = true;
    } catch (err) {
      log.error("生成二维码失败:", err);
      base.showError("生成二维码失败");
    }
  };
  const toggleSelectAll = () => {
    base.toggleSelectAll(files.value, "id");
  };
  const copyFileLink = async (file) => {
    if (!file || !file.slug) {
      base.showError("该文件没有有效的分享链接");
      return;
    }
    try {
      const fileUrl = fileshareService.buildShareUrl(file, window.location.origin);
      const ok = await copyToClipboard(fileUrl);
      if (ok) {
        base.showSuccess("分享链接已复制");
      }
    } catch (err) {
      log.error("复制链接失败:", err);
      base.showError("复制链接失败，请手动复制");
    }
  };
  const ensureLinks = async (file) => {
    if (!file || !file.id) return file;
    if (file.previewUrl || file.downloadUrl) return file;
    const detail = await fileShareStore.fetchById(file.id, { useCache: true, includeLinks: true });
    return detail || file;
  };
  const copyPermanentLink = async (file) => {
    if (!file || !file.slug) {
      base.showError("该文件没有有效的分享链接");
      return;
    }
    try {
      const detail = await ensureLinks(file);
      const permanentDownloadUrl = fileshareService.getPermanentDownloadUrl(detail);
      if (!permanentDownloadUrl) {
        throw new Error("无法获取文件的下载链接");
      }
      await copyToClipboard(permanentDownloadUrl);
      base.showSuccess("下载直链已复制");
    } catch (err) {
      log.error("复制永久链接失败:", err);
      base.showError(err.message || "复制永久链接失败，请稍后重试");
    }
  };
  const getOfficePreviewUrl = async (file) => {
    if (!file?.slug) return null;
    try {
      return await fileshareService.getOfficePreviewUrl(file);
    } catch (error) {
      log.error("获取Office预览URL失败:", error);
      base.showError(`预览失败: ${error.message}`);
      return null;
    }
  };
  const previewFileInNewWindow = async (file) => {
    if (!file.slug) {
      base.showError("无法预览：文件没有设置短链接");
      return;
    }
    try {
      const detail = await ensureLinks(file);
      const { FileType } = await __vitePreload(async () => {
        const { FileType: FileType2 } = await import("./fileTypes-C4-giE9O.js").then((n) => n.x);
        return { FileType: FileType2 };
      }, true ? __vite__mapDeps([0,1]) : void 0);
      if (detail.type === FileType.OFFICE) {
        const officePreviewUrl = await getOfficePreviewUrl(detail);
        if (officePreviewUrl) {
          window.open(officePreviewUrl, "_blank");
        }
        return;
      }
      const previewUrl = getPermanentViewUrl(detail);
      if (!previewUrl) {
        throw new Error("无法获取文件的预览链接");
      }
      window.open(previewUrl, "_blank");
    } catch (err) {
      log.error("预览文件失败:", err);
      base.showError("预览文件失败，请稍后重试");
    }
  };
  const downloadFileDirectly = async (file) => {
    try {
      if (!file.slug) {
        base.showError("无法下载：文件没有设置短链接");
        return;
      }
      const detail = await ensureLinks(file);
      const fileName = detail.filename || "下载文件";
      const link = document.createElement("a");
      const downloadUrl = getPermanentDownloadUrl(detail);
      if (!downloadUrl) {
        throw new Error("无法获取文件的下载链接");
      }
      link.href = downloadUrl;
      link.download = fileName;
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    } catch (err) {
      log.error("下载文件失败:", err);
      if (file.slug) {
        try {
          const detail = await ensureLinks(file);
          window.open(getPermanentDownloadUrl(detail), "_blank");
        } catch {
          window.open(getPermanentDownloadUrl(file), "_blank");
        }
      } else {
        window.open(file.publicUrl || "", "_blank");
      }
    }
  };
  const getPermanentDownloadUrl = (file) => {
    return fileshareService.getPermanentDownloadUrl(file);
  };
  const getPermanentViewUrl = (file) => {
    return fileshareService.getPermanentPreviewUrl(file);
  };
  const searchFiles = async (searchTerm, offset = null) => {
    if (!searchTerm || searchTerm.trim().length < 2) {
      return { files: [], pagination: { total: 0, limit: base.pagination.limit, offset: 0 } };
    }
    const searchOffset = offset !== null ? offset : base.pagination.offset;
    return await base.withLoading(async () => {
      try {
        const { files: results, pagination } = await fileShareStore.loadList({
          limit: base.pagination.limit,
          offset: searchOffset,
          search: searchTerm.trim()
        });
        return { files: results, pagination };
      } catch (error) {
        log.error("搜索文件失败:", error);
        base.showError(error.message || "搜索失败");
        return { files: [], pagination: { total: 0, limit: base.pagination.limit, offset: searchOffset } };
      }
    });
  };
  const handleGlobalSearch = async (value) => {
    searchQuery.value = value;
    if (!value || value.trim().length < 2) {
      await clearSearch();
      return;
    }
    try {
      searchLoading.value = true;
      isSearchMode.value = true;
      base.resetPagination();
      const result = await searchFiles(value.trim(), 0);
      base.updatePagination(result.pagination || { total: files.value.length, limit: base.pagination.limit, offset: 0 }, "offset");
      base.updateLastRefreshTime();
    } finally {
      searchLoading.value = false;
    }
  };
  const clearSearch = async () => {
    searchQuery.value = "";
    isSearchMode.value = false;
    base.resetPagination();
    await loadFiles();
  };
  const handleOffsetChangeWithSearch = async (newOffset) => {
    if (isSearchMode.value && searchQuery.value) {
      try {
        searchLoading.value = true;
        const result = await searchFiles(searchQuery.value, newOffset);
        base.updatePagination(result.pagination || { total: files.value.length, limit: base.pagination.limit, offset: newOffset }, "offset");
      } finally {
        searchLoading.value = false;
      }
      return;
    }
    handleOffsetChange(newOffset);
  };
  const handlePageSizeChange = async (newPageSize) => {
    base.changePageSize(newPageSize);
    if (isSearchMode.value && searchQuery.value) {
      await handleGlobalSearch(searchQuery.value);
      return;
    }
    await loadFiles();
  };
  const refreshFiles = async () => {
    if (isSearchMode.value && searchQuery.value) {
      try {
        searchLoading.value = true;
        const result = await searchFiles(searchQuery.value, base.pagination.offset);
        base.updatePagination(result.pagination || { total: files.value.length, limit: base.pagination.limit, offset: base.pagination.offset }, "offset");
        base.updateLastRefreshTime();
      } finally {
        searchLoading.value = false;
      }
      return;
    }
    await loadFiles();
  };
  const closeAllModals = () => {
    showEdit.value = false;
    showPreview.value = false;
    showQRCodeModal.value = false;
    editingFile.value = null;
    previewFile.value = null;
    qrCodeDataURL.value = "";
    qrCodeSlug.value = "";
  };
  return {
    // 继承基础功能
    ...base,
    // 搜索状态
    searchQuery,
    isSearchMode,
    searchLoading,
    // 文件管理特有状态
    files,
    editingFile,
    previewFile,
    showEdit,
    showPreview,
    showQRCodeModal,
    qrCodeDataURL,
    qrCodeSlug,
    // 文件管理方法
    loadFiles,
    refreshFiles,
    searchFiles,
    handleOffsetChange,
    handleGlobalSearch,
    clearSearch,
    handleOffsetChangeWithSearch,
    handlePageSizeChange,
    handleFileDelete,
    handleBatchDelete,
    openEditModal,
    updateFileMetadata,
    openPreviewModal,
    generateQRCode: generateQRCode$1,
    copyFileLink,
    copyPermanentLink,
    getOfficePreviewUrl,
    previewFileInNewWindow,
    downloadFileDirectly,
    getPermanentDownloadUrl,
    getPermanentViewUrl,
    toggleSelectAll,
    closeAllModals
  };
}
const _hoisted_1$2 = { class: "p-3 border-b border-gray-200 dark:border-gray-700" };
const _hoisted_2$2 = { class: "flex items-start" };
const _hoisted_3$2 = { class: "flex-shrink-0 mr-3 mt-1" };
const _hoisted_4$2 = ["checked", "onClick"];
const _hoisted_5$2 = { class: "flex-1" };
const _hoisted_6$2 = { class: "flex items-center" };
const _hoisted_7$2 = { class: "flex-shrink-0 mr-2 w-5 h-5" };
const _hoisted_8$2 = ["innerHTML"];
const _hoisted_9$2 = ["title", "onClick"];
const _hoisted_10$2 = { class: "ml-2 flex items-center space-x-1" };
const _hoisted_11$2 = ["onClick"];
const _hoisted_12$2 = ["onClick"];
const _hoisted_13$2 = ["title"];
const _hoisted_14$2 = ["title"];
const _hoisted_15$2 = { class: "p-4 grid grid-cols-2 gap-4 text-sm bg-gray-50 dark:bg-gray-700/50" };
const _hoisted_16$2 = ["title"];
const _hoisted_17$2 = {
  key: 0,
  class: "px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 inline-block mt-1 w-fit"
};
const _hoisted_18$2 = {
  key: 1,
  class: "px-2 py-1 text-xs rounded bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 inline-block mt-1 w-fit"
};
const _hoisted_19$1 = {
  key: 2,
  class: "px-2 py-1 text-xs rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 inline-block mt-1 w-fit"
};
const _hoisted_20$1 = { class: "col-span-2" };
const _hoisted_21 = { class: "p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2" };
const _hoisted_22 = ["onClick"];
const _hoisted_23 = ["onClick"];
const _hoisted_24 = ["onClick"];
const _hoisted_25 = ["onClick"];
const _sfc_main$2 = {
  __name: "FileTable",
  props: {
    files: {
      type: Array,
      required: true
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    selectedFiles: {
      type: Array,
      default: () => []
    },
    userType: {
      type: String,
      default: "admin"
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    "toggle-select",
    "toggle-select-all",
    "preview",
    "edit",
    "delete",
    "generate-qr",
    "copy-link",
    "copy-permanent-link",
    "error"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isAdmin = computed(() => props.userType === "admin");
    const emit = __emit;
    const storageConfigsStore = useStorageConfigsStore();
    const getStorageConfigDisplay = (file) => {
      const typeLabel = storageConfigsStore.getStorageTypeLabel(file.storage_type) || file.storage_type || "未知";
      const hasBoundConfig = !!file.storage_config_id;
      const primary = file.storage_config_name || typeLabel;
      const secondary = file.storage_provider_type || (hasBoundConfig ? typeLabel : "未绑定配置");
      return { primary, secondary };
    };
    const fileColumns = computed(() => [
      // 文件名列
      {
        key: "filename",
        type: "accessor",
        header: "文件名",
        sortable: true,
        render: (_, file) => {
          return h("div", { class: "flex flex-col" }, [
            h("div", { class: "flex items-center" }, [
              h("div", {
                class: "flex-shrink-0 mr-2 w-5 h-5",
                innerHTML: getFileIconClassLocal(file)
              }),
              h(
                "span",
                {
                  class: [
                    "font-medium truncate max-w-64 cursor-pointer hover:underline",
                    props.darkMode ? "text-primary-400" : "text-primary-600"
                  ],
                  title: file.filename,
                  onClick: (e) => {
                    e?.stopPropagation?.();
                    openFileLink(file);
                  }
                },
                truncateFilename(file.filename)
              ),
              h("div", { class: "ml-2 flex items-center space-x-1" }, [
                // 复制分享链接（与文本分享页一致：放在文件名旁边）
                h(
                  "button",
                  {
                    class: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative transition-colors",
                    title: "复制分享链接",
                    onClick: (e) => {
                      e?.stopPropagation?.();
                      emit("copy-link", file);
                    }
                  },
                  [
                    h(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      },
                      [
                        h("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        })
                      ]
                    )
                  ]
                ),
                // 二维码
                h(
                  "button",
                  {
                    class: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors",
                    title: "二维码",
                    onClick: (e) => {
                      e?.stopPropagation?.();
                      emit("generate-qr", file);
                    }
                  },
                  [
                    h(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      },
                      [
                        h("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                        })
                      ]
                    )
                  ]
                )
              ]),
              file.has_password && renderPasswordBadge("ml-2"),
              (file.use_proxy === 1 || file.use_proxy === true) && renderProxyBadge("ml-2")
            ]),
            h(
              "span",
              {
                class: `text-xs mt-1 truncate max-w-64 ${props.darkMode ? "text-gray-400" : "text-gray-500"}`,
                title: file.slug ? `/${file.slug}` : "无短链接"
                // 鼠标悬停显示完整短链接
              },
              file.slug ? `/${file.slug}` : "无短链接"
            ),
            file.remark && h(
              "span",
              {
                class: `text-xs mt-1 italic truncate max-w-64 ${props.darkMode ? "text-blue-400" : "text-blue-600"}`,
                title: file.remark
                // 鼠标悬停显示完整备注
              },
              file.remark
            )
          ]);
        }
      },
      // MIME类型列
      {
        key: "mimetype",
        type: "accessor",
        header: "MIME类型",
        sortable: true,
        render: (_, file) => {
          const mimeTypeText = getSimpleMimeType(file.mimetype, file.filename, file);
          return h(
            "span",
            {
              class: `px-2 py-1 text-xs rounded ${getMimeTypeClass(file)} inline-block max-w-32 truncate`,
              title: mimeTypeText
              // 鼠标悬停显示完整MIME类型
            },
            mimeTypeText
          );
        }
      },
      // 文件大小列
      {
        key: "size",
        type: "accessor",
        header: "大小",
        sortable: true,
        render: (value) => formatFileSize(value)
      },
      // 剩余次数列
      {
        key: "remaining_views",
        type: "display",
        header: "剩余次数",
        sortable: false,
        render: (file) => {
          const displayText = getRemainingViewsLabel(file);
          const children = [h("span", { class: getRemainingViewsClass(file) }, displayText)];
          if (file.views && file.max_views) {
            children.push(
              h(
                "span",
                {
                  class: `text-xs mt-1 ${props.darkMode ? "text-gray-400" : "text-gray-500"}`
                },
                `已用: ${file.views || 0}/${file.max_views}`
              )
            );
          }
          if (file.expires_at) {
            children.push(
              h(
                "span",
                {
                  class: `text-xs mt-1 ${expiresClass(file.expires_at)}`
                },
                formatRelativeTime(file.expires_at)
              )
            );
          }
          return h("div", { class: "flex flex-col" }, children);
        }
      },
      // 存储配置列
      {
        key: "storage_config",
        type: "display",
        header: "存储配置",
        sortable: false,
        render: (file) => {
          const { primary, secondary } = getStorageConfigDisplay(file);
          return h("div", { class: "flex flex-col" }, [
            h("span", {}, primary),
            h(
              "span",
              {
                class: `text-xs mt-1 ${props.darkMode ? "text-gray-400" : "text-gray-500"}`
              },
              secondary
            )
          ]);
        }
      },
      // 创建者列
      {
        key: "created_by",
        type: "display",
        header: "创建者",
        sortable: false,
        render: (file) => {
          let badgeClass, text;
          if (file.created_by && file.created_by.startsWith("apikey:")) {
            badgeClass = "px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
            text = file.key_name ? `密钥：${file.key_name}` : `密钥：${file.created_by.substring(7, 12)}...`;
          } else if (file.created_by) {
            badgeClass = "px-2 py-1 text-xs rounded bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
            text = "管理员";
          } else {
            badgeClass = "px-2 py-1 text-xs rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
            text = "未知来源";
          }
          return h("span", { class: `${badgeClass} inline-block text-center w-fit` }, text);
        }
      },
      // 创建时间列
      {
        key: "created_at",
        type: "accessor",
        header: "创建时间",
        sortable: true,
        render: (value) => formatDate(value)
      },
      // 操作列
      {
        key: "actions",
        type: "display",
        header: "操作",
        sortable: false,
        render: (file) => {
          const actions = [
            {
              title: "预览",
              event: () => emit("preview", file),
              color: "text-blue-600 hover:text-blue-900 dark:text-blue-400",
              svg: h(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-5 w-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                },
                [
                  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                  h("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  })
                ]
              )
            },
            {
              title: "编辑",
              event: () => emit("edit", file),
              color: "text-green-600 hover:text-green-900 dark:text-green-400",
              svg: h(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-5 w-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                },
                [
                  h("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  })
                ]
              )
            },
            {
              title: "复制直链",
              event: () => emit("copy-permanent-link", file),
              color: "text-purple-600 hover:text-purple-900 dark:text-purple-400",
              svg: h(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-5 w-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                },
                [
                  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" }),
                  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M10.172 13.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" })
                ]
              )
            }
          ];
          if (isAdmin.value) {
            actions.push({
              title: "删除",
              event: () => emit("delete", file),
              color: "text-red-600 hover:text-red-900 dark:text-red-400",
              svg: h(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-5 w-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                },
                [
                  h("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  })
                ]
              )
            });
          }
          return h(
            "div",
            { class: "flex space-x-2" },
            actions.map(
              (action) => h(
                "button",
                {
                  onClick: action.event,
                  class: `${action.color} relative`,
                  title: action.title
                },
                [
                  h("span", { class: "sr-only" }, action.title),
                  action.svg
                ]
              )
            )
          );
        }
      }
    ]);
    const fileColumnClasses = {
      select: "w-10 text-center",
      mimetype: "hidden md:table-cell text-center",
      size: "hidden sm:table-cell text-center",
      remaining_views: "hidden xl:table-cell text-center",
      storage_config: "hidden lg:table-cell text-center",
      created_by: "hidden lg:table-cell text-center",
      created_at: "hidden sm:table-cell text-center",
      actions: "text-center"
    };
    const handleSelectionChange = (event) => {
      if (event.type === "toggle-all") {
        emit("toggle-select-all");
      } else if (event.type === "toggle-item") {
        emit("toggle-select", event.id);
      }
    };
    const handleMobileSelect = (fileId) => {
      emit("toggle-select", fileId);
    };
    const getRemainingViews$1 = (file) => {
      return getRemainingViews(file);
    };
    const getRemainingViewsLabel = (file) => {
      const remaining = getRemainingViews$1(file);
      if (remaining === Infinity) {
        return "无限制";
      }
      if (remaining === 0) {
        return "已用完";
      }
      return `${remaining} 次`;
    };
    const getRemainingViewsClass = (file) => {
      const remaining = getRemainingViews$1(file);
      if (remaining === 0) {
        return props.darkMode ? "text-red-400" : "text-red-600";
      }
      if (remaining !== Infinity && remaining < 10) {
        return props.darkMode ? "text-yellow-400" : "text-yellow-600";
      }
      return props.darkMode ? "text-gray-300" : "text-gray-700";
    };
    const getSimpleMimeType = (mimeType, filename, file) => {
      if (mimeType && mimeType !== "application/octet-stream") {
        return mimeType;
      }
      if (file?.typeName && file.typeName !== "unknown") {
        return file.typeName;
      }
      return filename && typeof filename === "string" ? getDisplayName(filename) : "未知文件";
    };
    const getMimeTypeClass = (file) => {
      const type = file.type || 0;
      switch (type) {
        case 1:
          return props.darkMode ? "bg-purple-900/50 text-purple-300" : "bg-purple-100 text-purple-800";
        case 2:
          return props.darkMode ? "bg-orange-900/50 text-orange-300" : "bg-orange-100 text-orange-800";
        case 3:
          return props.darkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-800";
        case 4:
          return props.darkMode ? "bg-yellow-900/50 text-yellow-300" : "bg-yellow-100 text-yellow-800";
        case 5:
          return props.darkMode ? "bg-pink-900/50 text-pink-300" : "bg-pink-100 text-pink-800";
        case 6:
          return props.darkMode ? "bg-red-900/50 text-red-300" : "bg-red-100 text-red-800";
        default:
          return props.darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700";
      }
    };
    const passwordBadgeBaseClass = computed(
      () => `inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${props.darkMode ? "bg-amber-500/15 text-amber-100 border-amber-400/30" : "bg-amber-50 text-amber-700 border-amber-200"}`
    );
    const passwordIconClass = computed(() => props.darkMode ? "text-amber-200" : "text-amber-600");
    const renderPasswordBadge = (extraClass = "") => h(
      "span",
      {
        class: `${passwordBadgeBaseClass.value} ${extraClass}`,
        title: "密码保护"
      },
      [
        h(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            class: `h-3.5 w-3.5 ${passwordIconClass.value}`
          },
          [
            h("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M7 11V7a5 5 0 0110 0v4"
            }),
            h("rect", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              x: "6",
              y: "11",
              width: "12",
              height: "9",
              rx: "2"
            })
          ]
        ),
        h(
          "span",
          {
            class: "leading-none"
          },
          "加密"
        )
      ]
    );
    const proxyBadgeBaseClass = computed(
      () => `inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${props.darkMode ? "bg-sky-500/15 text-sky-100 border-sky-400/30" : "bg-sky-50 text-sky-700 border-sky-200"}`
    );
    const proxyIconClass = computed(() => props.darkMode ? "text-sky-200" : "text-sky-600");
    const renderProxyBadge = (extraClass = "") => h(
      "span",
      {
        class: `${proxyBadgeBaseClass.value} ${extraClass}`,
        title: "Worker 代理访问"
      },
      [
        h(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            class: `h-3.5 w-3.5 ${proxyIconClass.value}`
          },
          [
            h("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
            }),
            h("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M10.172 13.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101"
            })
          ]
        ),
        h(
          "span",
          {
            class: "leading-none"
          },
          "代理"
        )
      ]
    );
    const getFileIconClassLocal = (file) => {
      const fileItem = {
        name: file.filename,
        filename: file.filename,
        isDirectory: false,
        type: file.type
      };
      return getFileIcon(fileItem, props.darkMode);
    };
    const formatDate = (dateString) => {
      if (!dateString) return "未知";
      return formatDateTime(dateString);
    };
    const expiresClass = (expiresAt) => {
      if (!expiresAt) return props.darkMode ? "text-gray-400" : "text-gray-500";
      const expiryDate = parseUTCDate(expiresAt);
      if (!expiryDate) return props.darkMode ? "text-gray-400" : "text-gray-500";
      const now = /* @__PURE__ */ new Date();
      if (expiryDate < now) {
        return props.darkMode ? "text-red-400" : "text-red-600";
      }
      const nearExpiry = new Date(now.getTime() + 24 * 60 * 60 * 1e3);
      if (expiryDate < nearExpiry) {
        return props.darkMode ? "text-yellow-400" : "text-yellow-600";
      }
      return props.darkMode ? "text-green-400" : "text-green-600";
    };
    const truncateFilename = (filename) => {
      if (!filename || typeof filename !== "string") return "";
      if (filename.length <= 20) return filename;
      return filename.substring(0, 20) + "...";
    };
    const fileshareService = useFileshareService();
    const openFileLink = (file) => {
      if (!file || !file.slug) {
        emit("error", "该文件没有有效的分享链接");
        return;
      }
      const fileUrl = fileshareService.buildShareUrl(file, window.location.origin);
      window.open(fileUrl, "_blank");
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$3, {
        data: __props.files,
        columns: fileColumns.value,
        "column-classes": fileColumnClasses,
        "manual-sorting": false,
        selectable: true,
        "selected-items": __props.selectedFiles,
        "row-id-field": "id",
        "empty-text": _ctx.$t("admin.fileshare.table.noData"),
        loading: __props.loading,
        onSelectionChange: handleSelectionChange
      }, {
        mobile: withCtx(({ data }) => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(data, (file) => {
            return openBlock(), createElementBlock("div", {
              key: file.id,
              class: "bg-white dark:bg-gray-800 border-b dark:border-gray-700 last:border-b-0"
            }, [
              createBaseVNode("div", _hoisted_1$2, [
                createBaseVNode("div", _hoisted_2$2, [
                  createBaseVNode("div", _hoisted_3$2, [
                    createBaseVNode("input", {
                      type: "checkbox",
                      checked: __props.selectedFiles.includes(file.id),
                      onClick: ($event) => handleMobileSelect(file.id),
                      class: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
                    }, null, 8, _hoisted_4$2)
                  ]),
                  createBaseVNode("div", _hoisted_5$2, [
                    createBaseVNode("div", _hoisted_6$2, [
                      createBaseVNode("div", _hoisted_7$2, [
                        createBaseVNode("span", {
                          innerHTML: getFileIconClassLocal(file)
                        }, null, 8, _hoisted_8$2)
                      ]),
                      createBaseVNode("div", {
                        class: normalizeClass(["font-medium cursor-pointer hover:underline", __props.darkMode ? "text-primary-400" : "text-primary-600"]),
                        title: file.filename,
                        onClick: withModifiers(($event) => openFileLink(file), ["stop"])
                      }, toDisplayString(truncateFilename(file.filename)), 11, _hoisted_9$2),
                      createBaseVNode("div", _hoisted_10$2, [
                        createBaseVNode("button", {
                          onClick: withModifiers(($event) => emit("copy-link", file), ["stop"]),
                          class: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative transition-colors",
                          title: "复制分享链接"
                        }, [
                          createVNode(unref(IconCopy), { class: "h-4 w-4" })
                        ], 8, _hoisted_11$2),
                        createBaseVNode("button", {
                          onClick: withModifiers(($event) => emit("generate-qr", file), ["stop"]),
                          class: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors",
                          title: "二维码"
                        }, [
                          createVNode(unref(IconQrCode), { class: "h-4 w-4" })
                        ], 8, _hoisted_12$2)
                      ]),
                      file.has_password ? (openBlock(), createElementBlock("span", {
                        key: 0,
                        class: normalizeClass(["ml-2", passwordBadgeBaseClass.value]),
                        title: "密码保护"
                      }, [
                        createVNode(unref(IconLockClosed), {
                          class: normalizeClass(["h-3.5 w-3.5", passwordIconClass.value])
                        }, null, 8, ["class"])
                      ], 2)) : createCommentVNode("", true),
                      file.use_proxy === 1 || file.use_proxy === true ? (openBlock(), createElementBlock("span", {
                        key: 1,
                        class: normalizeClass(["ml-2", proxyBadgeBaseClass.value]),
                        title: "Worker 代理访问"
                      }, [
                        createVNode(unref(IconLink), {
                          class: normalizeClass(["h-3.5 w-3.5", proxyIconClass.value])
                        }, null, 8, ["class"])
                      ], 2)) : createCommentVNode("", true)
                    ]),
                    createBaseVNode("div", {
                      class: normalizeClass(["text-xs mt-1 truncate", __props.darkMode ? "text-gray-400" : "text-gray-500"]),
                      title: file.slug ? `/${file.slug}` : "无短链接"
                    }, toDisplayString(file.slug ? `/${file.slug}` : "无短链接"), 11, _hoisted_13$2),
                    file.remark ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: normalizeClass(["text-xs mt-1 italic truncate max-w-xs overflow-hidden", __props.darkMode ? "text-blue-400" : "text-blue-600"]),
                      title: file.remark
                    }, toDisplayString(file.remark), 11, _hoisted_14$2)) : createCommentVNode("", true)
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_15$2, [
                createBaseVNode("div", null, [
                  createBaseVNode("div", {
                    class: normalizeClass(["text-xs font-medium uppercase", __props.darkMode ? "text-gray-500" : "text-gray-500"])
                  }, "大小", 2),
                  createBaseVNode("div", {
                    class: normalizeClass(__props.darkMode ? "text-gray-300" : "text-gray-700")
                  }, toDisplayString(unref(formatFileSize)(file.size)), 3)
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("div", {
                    class: normalizeClass(["text-xs font-medium uppercase", __props.darkMode ? "text-gray-500" : "text-gray-500"])
                  }, "类型", 2),
                  createBaseVNode("div", null, [
                    createBaseVNode("span", {
                      class: normalizeClass(["px-2 py-0.5 text-xs rounded inline-block max-w-full truncate", getMimeTypeClass(file)]),
                      title: getSimpleMimeType(file.mimetype, file.filename, file)
                    }, toDisplayString(getSimpleMimeType(file.mimetype, file.filename, file)), 11, _hoisted_16$2)
                  ])
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("div", {
                    class: normalizeClass(["text-xs font-medium uppercase", __props.darkMode ? "text-gray-500" : "text-gray-500"])
                  }, "剩余次数", 2),
                  createBaseVNode("div", {
                    class: normalizeClass(getRemainingViewsClass(file))
                  }, toDisplayString(getRemainingViewsLabel(file)), 3),
                  file.views && file.max_views ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                  }, "已用: " + toDisplayString(file.views || 0) + "/" + toDisplayString(file.max_views), 3)) : createCommentVNode("", true),
                  file.expires_at ? (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(["text-xs", expiresClass(file.expires_at)])
                  }, toDisplayString(unref(formatRelativeTime)(file.expires_at)), 3)) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("div", {
                    class: normalizeClass(["text-xs font-medium uppercase", __props.darkMode ? "text-gray-500" : "text-gray-500"])
                  }, "存储配置", 2),
                  createBaseVNode("div", {
                    class: normalizeClass(__props.darkMode ? "text-gray-300" : "text-gray-700")
                  }, toDisplayString(getStorageConfigDisplay(file).primary), 3),
                  createBaseVNode("div", {
                    class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(getStorageConfigDisplay(file).secondary), 3)
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("div", {
                    class: normalizeClass(["text-xs font-medium uppercase", __props.darkMode ? "text-gray-500" : "text-gray-500"])
                  }, "创建者", 2),
                  createBaseVNode("div", {
                    class: normalizeClass([__props.darkMode ? "text-gray-300" : "text-gray-700", "flex flex-col"])
                  }, [
                    file.created_by && file.created_by.startsWith("apikey:") ? (openBlock(), createElementBlock("span", _hoisted_17$2, toDisplayString(file.key_name ? `密钥：${file.key_name}` : `密钥：${file.created_by.substring(7, 12)}...`), 1)) : file.created_by ? (openBlock(), createElementBlock("span", _hoisted_18$2, " 管理员 ")) : (openBlock(), createElementBlock("span", _hoisted_19$1, " 未知来源 "))
                  ], 2)
                ]),
                createBaseVNode("div", _hoisted_20$1, [
                  createBaseVNode("div", {
                    class: normalizeClass(["text-xs font-medium uppercase", __props.darkMode ? "text-gray-500" : "text-gray-500"])
                  }, "创建时间", 2),
                  createBaseVNode("div", {
                    class: normalizeClass(__props.darkMode ? "text-gray-300" : "text-gray-700")
                  }, toDisplayString(formatDate(file.created_at)), 3)
                ])
              ]),
              createBaseVNode("div", _hoisted_21, [
                createBaseVNode("button", {
                  onClick: ($event) => _ctx.$emit("preview", file),
                  class: normalizeClass(["p-2 rounded-md", __props.darkMode ? "bg-gray-700 text-blue-400" : "bg-gray-100 text-blue-600"])
                }, [
                  createVNode(unref(IconEye), { class: "h-5 w-5" })
                ], 10, _hoisted_22),
                createBaseVNode("button", {
                  onClick: ($event) => _ctx.$emit("edit", file),
                  class: normalizeClass(["p-2 rounded-md", __props.darkMode ? "bg-gray-700 text-green-400" : "bg-gray-100 text-green-600"])
                }, [
                  createVNode(unref(IconRename), { class: "h-5 w-5" })
                ], 10, _hoisted_23),
                createBaseVNode("button", {
                  onClick: ($event) => emit("copy-permanent-link", file),
                  class: normalizeClass(["p-2 rounded-md relative", __props.darkMode ? "bg-gray-700 text-purple-400" : "bg-gray-100 text-purple-600"])
                }, [
                  createVNode(unref(IconLink), { class: "h-5 w-5" })
                ], 10, _hoisted_24),
                createBaseVNode("button", {
                  onClick: ($event) => _ctx.$emit("delete", file),
                  class: normalizeClass(["p-2 rounded-md", __props.darkMode ? "bg-gray-700 text-red-400" : "bg-gray-100 text-red-600"])
                }, [
                  createVNode(unref(IconDelete), { class: "h-5 w-5" })
                ], 10, _hoisted_25)
              ])
            ]);
          }), 128))
        ]),
        _: 1
      }, 8, ["data", "columns", "selected-items", "empty-text", "loading"]);
    };
  }
};
const _hoisted_1$1 = { class: "fixed inset-0 z-[60] overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 pt-20 sm:pt-4" };
const _hoisted_2$1 = { class: "relative bg-white dark:bg-gray-800 rounded-lg max-w-sm sm:max-w-lg w-full mx-auto shadow-xl overflow-hidden max-h-[95vh] sm:max-h-[85vh]" };
const _hoisted_3$1 = {
  class: "px-4 sm:px-6 py-3 sm:py-4 overflow-y-auto",
  style: { "max-height": "calc(95vh - 160px)" }
};
const _hoisted_4$1 = { class: "space-y-4" };
const _hoisted_5$1 = { class: "bg-gray-50 dark:bg-gray-900 rounded p-3" };
const _hoisted_6$1 = { class: "grid grid-cols-3 gap-x-4 gap-y-2 text-sm" };
const _hoisted_7$1 = { class: "col-span-2 max-h-24 overflow-y-auto" };
const _hoisted_8$1 = {
  key: 1,
  class: "text-gray-400"
};
const _hoisted_9$1 = {
  key: 0,
  class: "text-yellow-500"
};
const _hoisted_10$1 = { key: 1 };
const _hoisted_11$1 = { class: "bg-gray-50 dark:bg-gray-900 rounded p-3" };
const _hoisted_12$1 = { class: "grid grid-cols-3 gap-x-4 gap-y-2 text-sm" };
const _hoisted_13$1 = { key: 0 };
const _hoisted_14$1 = { key: 1 };
const _hoisted_15$1 = { class: "bg-gray-50 dark:bg-gray-900 rounded p-3" };
const _hoisted_16$1 = { class: "grid grid-cols-3 gap-x-4 gap-y-2 text-sm" };
const _hoisted_17$1 = { class: "flex justify-between mt-4" };
const _hoisted_18$1 = { class: "flex space-x-2" };
const _sfc_main$1 = {
  __name: "FilePreviewModal",
  props: {
    file: {
      type: Object,
      required: true
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close", "preview-file", "download-file"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    computed(() => {
      return window.location.origin;
    });
    const formatDateTime2 = (dateString) => {
      return formatDateTimeWithSeconds(dateString);
    };
    const expiresClass = computed(() => {
      if (!props.file.expires_at) {
        return props.darkMode ? "text-white" : "text-gray-900";
      }
      const expiryDate = new Date(props.file.expires_at);
      const now = /* @__PURE__ */ new Date();
      if (expiryDate < now) {
        return "text-red-500";
      }
      const diffMs = expiryDate - now;
      const diffDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24));
      if (diffDays < 1) {
        return "text-orange-500";
      }
      return props.darkMode ? "text-white" : "text-gray-900";
    });
    const getRemainingViews$1 = computed(() => {
      const remaining = getRemainingViews(props.file);
      if (remaining === Infinity) {
        return "无限制";
      }
      if (remaining === 0) {
        return "已用完";
      }
      return `${remaining} 次`;
    });
    const remainingViewsClass = computed(() => {
      if (!props.file.max_views) {
        return props.darkMode ? "text-white" : "text-gray-900";
      }
      const viewCount = props.file.views || 0;
      const remaining = props.file.max_views - viewCount;
      if (remaining <= 0) {
        return "text-red-500";
      }
      if (remaining < 10) {
        return "text-orange-500";
      }
      return props.darkMode ? "text-white" : "text-gray-900";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("div", {
            class: normalizeClass(["px-4 sm:px-6 py-3 sm:py-4 border-b flex justify-between items-center", __props.darkMode ? "border-gray-700" : "border-gray-200"])
          }, [
            createBaseVNode("h3", {
              class: normalizeClass(["text-base sm:text-lg font-medium", __props.darkMode ? "text-white" : "text-gray-900"])
            }, "文件详情", 2),
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close")),
              class: "text-gray-400 hover:text-gray-500"
            }, [
              createVNode(unref(IconClose), { class: "h-6 w-6" })
            ])
          ], 2),
          createBaseVNode("div", _hoisted_3$1, [
            createBaseVNode("div", _hoisted_4$1, [
              createBaseVNode("div", null, [
                createBaseVNode("h4", {
                  class: normalizeClass(["text-sm font-medium mb-2", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, "基本信息", 2),
                createBaseVNode("div", _hoisted_5$1, [
                  createBaseVNode("dl", _hoisted_6$1, [
                    createBaseVNode("dt", {
                      class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
                    }, "文件名", 2),
                    createBaseVNode("dd", {
                      class: normalizeClass(["col-span-2", __props.darkMode ? "text-white" : "text-gray-900"])
                    }, toDisplayString(__props.file.filename), 3),
                    createBaseVNode("dt", {
                      class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
                    }, "MIME类型", 2),
                    createBaseVNode("dd", {
                      class: normalizeClass(["col-span-2 break-words", __props.darkMode ? "text-white" : "text-gray-900"])
                    }, toDisplayString(__props.file.mimetype || "未知"), 3),
                    createBaseVNode("dt", {
                      class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
                    }, "文件大小", 2),
                    createBaseVNode("dd", {
                      class: normalizeClass(["col-span-2", __props.darkMode ? "text-white" : "text-gray-900"])
                    }, toDisplayString(unref(formatFileSize)(__props.file.size)), 3),
                    createBaseVNode("dt", {
                      class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
                    }, "备注", 2),
                    createBaseVNode("dd", _hoisted_7$1, [
                      __props.file.remark ? (openBlock(), createElementBlock("span", {
                        key: 0,
                        class: normalizeClass([__props.darkMode ? "text-blue-400" : "text-blue-600", "block break-words whitespace-pre-wrap"])
                      }, toDisplayString(__props.file.remark), 3)) : (openBlock(), createElementBlock("span", _hoisted_8$1, "无备注"))
                    ]),
                    createBaseVNode("dt", {
                      class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
                    }, "密码保护", 2),
                    createBaseVNode("dd", {
                      class: normalizeClass(["col-span-2", __props.darkMode ? "text-white" : "text-gray-900"])
                    }, [
                      __props.file.has_password ? (openBlock(), createElementBlock("span", _hoisted_9$1, "已启用")) : (openBlock(), createElementBlock("span", _hoisted_10$1, "未启用"))
                    ], 2)
                  ])
                ])
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("h4", {
                  class: normalizeClass(["text-sm font-medium mb-2", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, "访问统计", 2),
                createBaseVNode("div", _hoisted_11$1, [
                  createBaseVNode("dl", _hoisted_12$1, [
                    createBaseVNode("dt", {
                      class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
                    }, "访问次数", 2),
                    createBaseVNode("dd", {
                      class: normalizeClass(["col-span-2", __props.darkMode ? "text-white" : "text-gray-900"])
                    }, toDisplayString(__props.file.views || 0) + " 次", 3),
                    createBaseVNode("dt", {
                      class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
                    }, "剩余次数", 2),
                    createBaseVNode("dd", {
                      class: normalizeClass(["col-span-2", remainingViewsClass.value])
                    }, toDisplayString(getRemainingViews$1.value), 3),
                    createBaseVNode("dt", {
                      class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
                    }, "过期时间", 2),
                    createBaseVNode("dd", {
                      class: normalizeClass(["col-span-2", expiresClass.value])
                    }, [
                      __props.file.expires_at ? (openBlock(), createElementBlock("span", _hoisted_13$1, toDisplayString(formatDateTime2(__props.file.expires_at)), 1)) : (openBlock(), createElementBlock("span", _hoisted_14$1, "永不过期"))
                    ], 2)
                  ])
                ])
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("h4", {
                  class: normalizeClass(["text-sm font-medium mb-2", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, "存储信息", 2),
                createBaseVNode("div", _hoisted_15$1, [
                  createBaseVNode("dl", _hoisted_16$1, [
                    createBaseVNode("dt", {
                      class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
                    }, "存储配置", 2),
                    createBaseVNode("dd", {
                      class: normalizeClass(["col-span-2", __props.darkMode ? "text-white" : "text-gray-900"])
                    }, toDisplayString(__props.file.storage_config_name || "默认存储"), 3),
                    createBaseVNode("dt", {
                      class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
                    }, "提供商", 2),
                    createBaseVNode("dd", {
                      class: normalizeClass(["col-span-2", __props.darkMode ? "text-white" : "text-gray-900"])
                    }, toDisplayString(__props.file.storage_provider_type || "未知"), 3),
                    createBaseVNode("dt", {
                      class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
                    }, "存储路径", 2),
                    createBaseVNode("dd", {
                      class: normalizeClass(["col-span-2 break-all text-xs", __props.darkMode ? "text-white" : "text-gray-900"])
                    }, toDisplayString(__props.file.storage_path || "未知"), 3),
                    createBaseVNode("dt", {
                      class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
                    }, "ETag", 2),
                    createBaseVNode("dd", {
                      class: normalizeClass(["col-span-2 break-all text-xs", __props.darkMode ? "text-white" : "text-gray-900"])
                    }, toDisplayString(__props.file.etag || "未知"), 3),
                    createBaseVNode("dt", {
                      class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
                    }, "创建时间", 2),
                    createBaseVNode("dd", {
                      class: normalizeClass(["col-span-2", __props.darkMode ? "text-white" : "text-gray-900"])
                    }, toDisplayString(formatDateTime2(__props.file.created_at)), 3)
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_17$1, [
                createBaseVNode("div", _hoisted_18$1, [
                  createBaseVNode("button", {
                    onClick: _cache[1] || (_cache[1] = ($event) => emit("download-file", __props.file)),
                    class: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
                  }, "下载文件"),
                  createBaseVNode("button", {
                    onClick: _cache[2] || (_cache[2] = ($event) => emit("preview-file", __props.file)),
                    class: "px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium"
                  }, "预览")
                ]),
                createBaseVNode("button", {
                  onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("close")),
                  class: normalizeClass(["px-4 py-2 rounded-md text-sm font-medium transition-colors", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"])
                }, " 关闭 ", 2)
              ])
            ])
          ])
        ])
      ]);
    };
  }
};
const _hoisted_1 = { class: "p-3 sm:p-4 md:p-5 lg:p-6 flex-1 flex flex-col overflow-y-auto" };
const _hoisted_2 = { class: "flex flex-col space-y-3 mb-4" };
const _hoisted_3 = { class: "flex justify-between items-center" };
const _hoisted_4 = ["disabled"];
const _hoisted_5 = { class: "w-full" };
const _hoisted_6 = { class: "flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0" };
const _hoisted_7 = { class: "text-sm text-gray-600 dark:text-gray-400" };
const _hoisted_8 = {
  key: 0,
  class: "ml-2"
};
const _hoisted_9 = { class: "flex flex-wrap gap-1 sm:gap-2" };
const _hoisted_10 = { class: "inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex-grow sm:flex-grow-0" };
const _hoisted_11 = ["disabled"];
const _hoisted_12 = { class: "hidden xs:inline" };
const _hoisted_13 = { class: "xs:hidden" };
const _hoisted_14 = {
  key: 0,
  class: "flex justify-between items-center mb-2 sm:mb-3"
};
const _hoisted_15 = { class: "text-xs sm:text-sm text-gray-500 dark:text-gray-400" };
const _hoisted_16 = { class: "inline-flex items-center" };
const _hoisted_17 = {
  key: 1,
  class: "flex justify-center my-8"
};
const _hoisted_18 = {
  key: 2,
  class: "overflow-hidden bg-white dark:bg-gray-800 shadow-md rounded-lg flex-1"
};
const _hoisted_19 = { class: "flex flex-col h-full" };
const _hoisted_20 = { class: "mt-2 mb-4 sm:mt-4 sm:mb-0" };
const _sfc_main = {
  __name: "FileManagementView",
  props: {
    userType: {
      type: String,
      default: "admin",
      // 默认为管理员
      validator: (value) => ["admin", "apikey"].includes(value)
    }
  },
  setup(__props) {
    const props = __props;
    const { isDarkMode: darkMode } = useThemeMode();
    const { t } = useI18n();
    const { dialogState, confirm, handleConfirm, handleCancel } = useConfirmDialog();
    const confirmFn = createConfirmFn(confirm, {
      t,
      darkMode,
      getConfirmText: () => t("common.dialogs.deleteButton")
    });
    const {
      // 状态
      loading,
      selectedItems: selectedFiles,
      lastRefreshTime,
      pagination,
      pageSizeOptions,
      files,
      editingFile,
      previewFile,
      showEdit,
      showPreview,
      showQRCodeModal,
      qrCodeDataURL,
      qrCodeSlug,
      searchQuery,
      isSearchMode,
      searchLoading,
      // 方法
      loadFiles,
      refreshFiles,
      handleGlobalSearch,
      clearSearch,
      handleOffsetChangeWithSearch,
      handlePageSizeChange,
      handleFileDelete,
      handleBatchDelete,
      openEditModal,
      updateFileMetadata,
      openPreviewModal,
      generateQRCode: generateQRCode2,
      copyFileLink,
      copyPermanentLink,
      showError,
      previewFileInNewWindow,
      downloadFileDirectly,
      toggleSelectItem,
      toggleSelectAll
    } = useFileManagement(props.userType, { confirmFn });
    const deleteSettingsStore = useDeleteSettingsStore();
    onMounted(loadFiles);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _cache[10] || (_cache[10] = createBaseVNode("h2", { class: "text-lg font-medium text-gray-900 dark:text-white" }, "文件管理", -1)),
            createBaseVNode("button", {
              type: "button",
              class: "inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
              onClick: _cache[0] || (_cache[0] = withModifiers((...args) => unref(refreshFiles) && unref(refreshFiles)(...args), ["prevent"])),
              disabled: unref(loading) || unref(searchLoading)
            }, [
              createVNode(unref(IconRefresh), {
                class: normalizeClass(["h-3 w-3 sm:h-4 sm:w-4 mr-1", unref(loading) || unref(searchLoading) ? "animate-spin" : ""])
              }, null, 8, ["class"]),
              _cache[8] || (_cache[8] = createBaseVNode("span", { class: "hidden xs:inline" }, "刷新", -1)),
              _cache[9] || (_cache[9] = createBaseVNode("span", { class: "xs:hidden" }, "刷新", -1))
            ], 8, _hoisted_4)
          ]),
          createBaseVNode("div", _hoisted_5, [
            createVNode(_sfc_main$4, {
              modelValue: unref(searchQuery),
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(searchQuery) ? searchQuery.value = $event : null),
              placeholder: "搜索文件（支持文件名、链接、备注）",
              "show-hint": true,
              "search-hint": "服务端搜索，支持模糊匹配",
              size: "md",
              "debounce-ms": 300,
              onSearch: unref(handleGlobalSearch),
              onClear: unref(clearSearch)
            }, null, 8, ["modelValue", "onSearch", "onClear"])
          ]),
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("div", _hoisted_7, [
              createTextVNode(" 共 " + toDisplayString(unref(pagination).total) + " 个文件 ", 1),
              unref(selectedFiles).length > 0 ? (openBlock(), createElementBlock("span", _hoisted_8, " (已选择 " + toDisplayString(unref(selectedFiles).length) + " 个) ", 1)) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, [
                _cache[11] || (_cache[11] = createBaseVNode("span", { class: "mr-2" }, "仅删除记录", -1)),
                createBaseVNode("button", {
                  type: "button",
                  onClick: _cache[2] || (_cache[2] = withModifiers((...args) => unref(deleteSettingsStore).toggleDeleteMode && unref(deleteSettingsStore).toggleDeleteMode(...args), ["prevent"])),
                  class: normalizeClass(["relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2", unref(deleteSettingsStore).deleteRecordOnly ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"])
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass(["inline-block h-3 w-3 transform rounded-full bg-white transition-transform", unref(deleteSettingsStore).deleteRecordOnly ? "translate-x-5" : "translate-x-1"])
                  }, null, 2)
                ], 2)
              ]),
              createBaseVNode("button", {
                type: "button",
                onClick: _cache[3] || (_cache[3] = withModifiers((...args) => unref(handleBatchDelete) && unref(handleBatchDelete)(...args), ["prevent"])),
                disabled: unref(selectedFiles).length === 0,
                class: normalizeClass([
                  "inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 flex-grow sm:flex-grow-0",
                  unref(selectedFiles).length === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500"
                ])
              }, [
                createVNode(unref(IconDelete), { class: "h-3 w-3 sm:h-4 sm:w-4 mr-1" }),
                createBaseVNode("span", _hoisted_12, "批量删除" + toDisplayString(unref(selectedFiles).length ? ` (${unref(selectedFiles).length})` : ""), 1),
                createBaseVNode("span", _hoisted_13, "删除" + toDisplayString(unref(selectedFiles).length ? ` (${unref(selectedFiles).length})` : ""), 1)
              ], 10, _hoisted_11)
            ])
          ])
        ]),
        unref(lastRefreshTime) ? (openBlock(), createElementBlock("div", _hoisted_14, [
          createBaseVNode("div", _hoisted_15, [
            createBaseVNode("span", _hoisted_16, [
              createVNode(unref(IconClock), { class: "h-3 w-3 sm:h-4 sm:w-4 mr-1" }),
              createTextVNode(" 上次刷新: " + toDisplayString(unref(lastRefreshTime)), 1)
            ])
          ])
        ])) : createCommentVNode("", true),
        unref(loading) ? (openBlock(), createElementBlock("div", _hoisted_17, [
          createVNode(unref(IconRefresh), {
            class: normalizeClass(["animate-spin h-8 w-8", unref(darkMode) ? "text-blue-400" : "text-blue-500"])
          }, null, 8, ["class"])
        ])) : createCommentVNode("", true),
        !unref(loading) ? (openBlock(), createElementBlock("div", _hoisted_18, [
          createBaseVNode("div", _hoisted_19, [
            createVNode(_sfc_main$2, {
              files: unref(files),
              "dark-mode": unref(darkMode),
              "selected-files": unref(selectedFiles),
              "user-type": props.userType,
              loading: unref(loading) || unref(searchLoading),
              onToggleSelect: unref(toggleSelectItem),
              onToggleSelectAll: unref(toggleSelectAll),
              onEdit: unref(openEditModal),
              onPreview: unref(openPreviewModal),
              onDelete: unref(handleFileDelete),
              onGenerateQr: _cache[4] || (_cache[4] = (file) => unref(generateQRCode2)(file, unref(darkMode))),
              onCopyLink: unref(copyFileLink),
              onCopyPermanentLink: unref(copyPermanentLink),
              onError: unref(showError)
            }, null, 8, ["files", "dark-mode", "selected-files", "user-type", "loading", "onToggleSelect", "onToggleSelectAll", "onEdit", "onPreview", "onDelete", "onCopyLink", "onCopyPermanentLink", "onError"])
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_20, [
          createVNode(_sfc_main$5, {
            "dark-mode": unref(darkMode),
            pagination: unref(pagination),
            "page-size-options": unref(pageSizeOptions),
            "search-mode": unref(isSearchMode),
            "search-term": unref(searchQuery),
            mode: "offset",
            onOffsetChanged: unref(handleOffsetChangeWithSearch),
            onLimitChanged: unref(handlePageSizeChange)
          }, null, 8, ["dark-mode", "pagination", "page-size-options", "search-mode", "search-term", "onOffsetChanged", "onLimitChanged"])
        ]),
        unref(showEdit) ? (openBlock(), createBlock(_sfc_main$6, {
          key: 3,
          file: unref(editingFile),
          "dark-mode": unref(darkMode),
          onClose: _cache[5] || (_cache[5] = ($event) => showEdit.value = false),
          onSave: unref(updateFileMetadata)
        }, null, 8, ["file", "dark-mode", "onSave"])) : createCommentVNode("", true),
        unref(showPreview) ? (openBlock(), createBlock(_sfc_main$1, {
          key: 4,
          file: unref(previewFile),
          "dark-mode": unref(darkMode),
          onClose: _cache[6] || (_cache[6] = ($event) => showPreview.value = false),
          onPreviewFile: unref(previewFileInNewWindow),
          onDownloadFile: unref(downloadFileDirectly)
        }, null, 8, ["file", "dark-mode", "onPreviewFile", "onDownloadFile"])) : createCommentVNode("", true),
        unref(showQRCodeModal) ? (openBlock(), createBlock(_sfc_main$7, {
          key: 5,
          "qr-code-url": unref(qrCodeDataURL),
          "file-slug": unref(qrCodeSlug),
          "dark-mode": unref(darkMode),
          onClose: _cache[7] || (_cache[7] = ($event) => showQRCodeModal.value = false)
        }, null, 8, ["qr-code-url", "file-slug", "dark-mode"])) : createCommentVNode("", true),
        createVNode(_sfc_main$8, mergeProps(unref(dialogState), {
          onConfirm: unref(handleConfirm),
          onCancel: unref(handleCancel)
        }), null, 16, ["onConfirm", "onCancel"])
      ]);
    };
  }
};
export {
  _sfc_main as default
};
