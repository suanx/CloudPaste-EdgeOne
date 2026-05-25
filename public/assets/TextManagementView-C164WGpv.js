import { e as useI18n, c as createLogger, g as ref, r as reactive, f as useAuthStore, F as computed, a$ as h, M as createBlock, k as openBlock, aE as withCtx, j as createElementBlock, K as Fragment, L as renderList, l as createBaseVNode, n as normalizeClass, t as toDisplayString, z as createVNode, p as createCommentVNode, y as unref, al as IconCopy, bn as IconQrCode, bg as IconEye, bh as IconRename, bo as IconLink, b7 as IconDelete, A as createTextVNode, dN as IconEyeOff, bz as IconGlobeAlt, J as IconRefresh, b3 as IconLockClosed, aK as _export_sfc, Y as useGlobalMessage, b2 as onClickOutside, o as onMounted, q as withDirectives, v as vModelText, aG as withKeys, m as withModifiers, dE as IconError, dK as IconMenu, bf as IconArrowUp, B as IconUser, bB as IconCalendar, aP as nextTick, i as useLocalStorage, $ as useWindowSize, w as watch, ax as onUnmounted, O as IconGrid, am as IconAdjustments, be as isRef, by as IconArchive, bm as src_default, G as IconClose, ae as vModelSelect, aM as createStaticVNode, x as vModelCheckbox, ac as useThemeMode, bb as IconClock, ar as mergeProps } from "./index-BQxzU9F1.js";
import { u as usePasteService } from "./pasteService-CHRbddSC.js";
import { c as copyToClipboard } from "./clipboard-GLHRBPpJ.js";
import { u as useAdminBase } from "./useAdminBase-CxkodUK-.js";
import "./storageConfigsStore-DUFoycii.js";
import { c as formatDateTime, a as formatRelativeTime, p as parseUTCDate, i as isExpired, h as formatExpiry } from "./timeUtils-D81jJILb.js";
import { g as generateQRCode } from "./qrcodeUtils-xDdVh-90.js";
import { c as creatorBadgeUtils, u as useCreatorBadge } from "./useCreatorBadge-OKtN1JzK.js";
import { u as useConfirmDialog, _ as _sfc_main$c, c as createConfirmFn } from "./useConfirmDialog-c5dcTgIB.js";
import { _ as _sfc_main$7 } from "./AdminTable-CrUS055e.js";
import { g as getRemainingViews } from "./fileUtils-CALGFK20.js";
import { _ as _sfc_main$a } from "./CommonPagination-WikHSq_I.js";
import { _ as _sfc_main$b } from "./QRCodeModal-BNW9qcWt.js";
import { _ as _sfc_main$9 } from "./GlobalSearchBox-JKLU6Q9a.js";
import { _ as _sfc_main$8 } from "./ViewModeToggle-DuPEIoIY.js";
import "./fileTypes-C4-giE9O.js";
function usePasteManagement(options = {}) {
  const { confirmFn } = options;
  if (!confirmFn) {
    throw new Error("usePasteManagement 必须传入 confirmFn（请在 View 里用 useConfirmDialog + createConfirmFn 创建）");
  }
  const { t } = useI18n();
  const log = createLogger("PasteManagement");
  const base = useAdminBase("paste", {
    viewMode: {
      storageKey: "paste-admin-view-mode",
      defaultMode: "table"
    }
  });
  const pasteService = usePasteService();
  const searchQuery = ref("");
  const isSearchMode = ref(false);
  const searchLoading = ref(false);
  const pastes = ref([]);
  const previewPaste = ref(null);
  const editingPaste = ref(null);
  const showPreview = ref(false);
  const showEdit = ref(false);
  const showQRCodeModal = ref(false);
  const qrCodeDataURL = ref("");
  const qrCodeSlug = ref("");
  const copiedTexts = reactive(
    /** @type {Record<string, boolean>} */
    {}
  );
  const copiedRawTexts = reactive(
    /** @type {Record<string, boolean>} */
    {}
  );
  const authStore = useAuthStore();
  const isAdmin = computed(() => authStore.isAdmin);
  const isApiKeyUser = computed(() => authStore.authType === "apikey" && authStore.hasTextManagePermission);
  const isAuthorized = computed(() => isAdmin.value || isApiKeyUser.value);
  const loadPastes = async () => {
    return base.withLoading(async () => {
      try {
        const { items, pagination } = await pasteService.getPastes({
          limit: base.pagination.limit,
          offset: base.pagination.offset
        });
        pastes.value = items;
        base.updatePagination(pagination, "offset");
        base.updateLastRefreshTime();
      } catch (err) {
        pastes.value = [];
        throw err;
      }
    });
  };
  const handleOffsetChange = (newOffset) => {
    base.handlePaginationChange(newOffset, "offset");
    loadPastes();
  };
  const deletePaste = async (pasteId) => {
    if (!pasteId) {
      base.showError("删除失败：缺少文本标识信息");
      return;
    }
    const confirmed = await confirmFn({
      title: t("common.dialogs.deleteTitle"),
      message: t("common.dialogs.deleteItem", { name: t("paste.item", "该文本") }),
      confirmType: "danger"
    });
    if (!confirmed) {
      return;
    }
    return base.withLoading(async () => {
      await pasteService.deleteSinglePaste(pasteId);
      base.showSuccess("删除成功");
      await loadPastes();
    });
  };
  const batchDeletePastes = async () => {
    const selectedCount = base.selectedItems.value.length;
    if (selectedCount === 0) {
      base.showError("请先选择要删除的文本");
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
    return base.withLoading(async () => {
      await pasteService.deletePastes(base.selectedItems.value);
      base.showSuccess(`成功删除 ${selectedCount} 条文本`);
      base.clearSelection();
      await loadPastes();
    });
  };
  const clearExpiredPastes = async () => {
    if (!isAdmin.value) {
      base.showError("只有管理员可以清理过期文本");
      return;
    }
    const confirmed = await confirmFn({
      title: t("common.dialogs.cleanupTitle"),
      message: t("common.dialogs.cleanupExpired"),
      confirmType: "warning"
    });
    if (!confirmed) {
      return;
    }
    return base.withLoading(async () => {
      const message = await pasteService.clearExpiredPastes();
      base.showSuccess(message || "已清理过期文本");
      await loadPastes();
    });
  };
  const openPreview = async (paste) => {
    try {
      const detail = await pasteService.getPasteById(paste.id);
      previewPaste.value = detail;
      showPreview.value = true;
    } catch (err) {
      log.error("获取文本详情失败:", err);
      base.showError("获取文本详情失败");
    }
  };
  const closePreview = () => {
    showPreview.value = false;
    previewPaste.value = null;
  };
  const openEditModal = async (paste) => {
    try {
      const detail = await pasteService.getPasteById(paste.id);
      editingPaste.value = detail;
      showEdit.value = true;
    } catch (err) {
      log.error("获取文本详情失败:", err);
      base.showError("获取文本详情失败");
    }
  };
  const closeEditModal = () => {
    showEdit.value = false;
    editingPaste.value = null;
  };
  const updatePasteFields = async (pasteId, updates, successMessage = "更新成功") => {
    return base.withLoading(async () => {
      try {
        const fullPaste = await pasteService.getPasteById(pasteId);
        const payload = {
          title: updates.title ?? fullPaste.title,
          content: updates.content ?? fullPaste.content,
          remark: updates.remark ?? fullPaste.remark,
          max_views: updates.max_views ?? fullPaste.max_views,
          expires_at: updates.expires_at ?? fullPaste.expires_at,
          is_public: updates.is_public ?? fullPaste.is_public
        };
        if (Object.prototype.hasOwnProperty.call(updates, "newSlug")) {
          payload.newSlug = updates.newSlug;
        }
        if (updates.password) {
          payload.password = updates.password;
        } else if (updates.clearPassword) {
          payload.clearPassword = true;
        }
        await pasteService.updatePaste(fullPaste.slug, payload);
        base.showSuccess(successMessage);
        await loadPastes();
      } catch (err) {
        log.error("更新文本失败:", err);
        base.showError(err.message || "更新文本失败");
        throw err;
      }
    });
  };
  const submitEdit = async (updated) => {
    if (updated && updated.error) {
      base.showError(updated.error);
      return;
    }
    if (!editingPaste.value || !editingPaste.value.slug) {
      base.showError("提交失败：缺少文本标识");
      return;
    }
    try {
      await updatePasteFields(editingPaste.value.id, updated, "更新成功");
      closeEditModal();
    } catch (err) {
    }
  };
  const copyLink = async (slug) => {
    if (!slug) {
      base.showError("复制失败：缺少文本标识");
      return;
    }
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/paste/${slug}`;
    try {
      const ok = await copyToClipboard(link);
      if (ok) {
        copiedTexts[slug] = true;
        base.showSuccess("访问链接已复制");
        setTimeout(() => {
          copiedTexts[slug] = false;
        }, 2e3);
      } else {
        base.showError("复制访问链接失败");
      }
    } catch (err) {
      log.error("复制访问链接失败:", err);
      base.showError("复制访问链接失败");
    }
  };
  const copyRawLink = async (slug) => {
    if (!slug) {
      base.showError("复制失败：缺少文本标识");
      return;
    }
    const pasteObj = pastes.value.find((item) => item.slug === slug);
    try {
      const rawLink = pasteService.getRawPasteUrl(slug, pasteObj?.plain_password || null);
      const ok = await copyToClipboard(rawLink);
      if (ok) {
        copiedRawTexts[slug] = true;
        base.showSuccess("Raw 链接已复制");
        setTimeout(() => {
          copiedRawTexts[slug] = false;
        }, 2e3);
      } else {
        base.showError("复制 Raw 链接失败");
      }
    } catch (err) {
      log.error("复制 Raw 链接失败:", err);
      base.showError("复制 Raw 链接失败");
    }
  };
  const quickEditContent = async (payload) => {
    if (!payload || !payload.id || !payload.slug || !payload.content) {
      base.showError("编辑失败：缺少必要参数");
      return;
    }
    try {
      const fullPaste = await pasteService.getPasteById(payload.id);
      const updatePayload = {
        title: fullPaste.title,
        content: payload.content,
        remark: fullPaste.remark,
        max_views: fullPaste.max_views,
        expires_at: fullPaste.expires_at,
        is_public: fullPaste.is_public
      };
      await pasteService.updatePaste(fullPaste.slug, updatePayload);
      const index = pastes.value.findIndex((p) => p.id === payload.id);
      if (index !== -1) {
        pastes.value[index].content = payload.content;
      }
      base.showSuccess("内容已更新");
    } catch (err) {
      log.error("更新文本内容失败:", err);
      base.showError(err.message || "更新文本内容失败");
      throw err;
    }
  };
  const goToViewPage = (slug) => {
    const baseUrl = window.location.origin;
    const viewUrl = `${baseUrl}/paste/${slug}`;
    window.open(viewUrl, "_blank");
  };
  const showQRCode = async (slug, darkMode = false) => {
    try {
      if (!slug) {
        base.showError("生成二维码失败：缺少文本标识信息");
        return;
      }
      const baseUrl = window.location.origin;
      const pasteUrl = `${baseUrl}/paste/${slug}`;
      qrCodeDataURL.value = await generateQRCode(pasteUrl, { darkMode });
      qrCodeSlug.value = slug;
      showQRCodeModal.value = true;
    } catch (err) {
      log.error("生成二维码失败:", err);
      base.showError("生成二维码失败");
    }
  };
  const toggleSelectAll = () => {
    base.toggleSelectAll(pastes.value, "id");
  };
  const searchPastes = async (searchTerm, offset = null) => {
    if (!searchTerm || searchTerm.trim().length < 2) {
      return { results: [], pagination: (
        /** @type {PaginationInfo} */
        { total: 0, limit: base.pagination.limit, offset: 0 }
      ) };
    }
    const searchOffset = offset !== null ? offset : base.pagination.offset;
    return base.withLoading(async () => {
      try {
        const { items, pagination } = await pasteService.getPastes({
          limit: base.pagination.limit,
          offset: searchOffset,
          search: searchTerm.trim()
        });
        return {
          results: items,
          pagination: pagination || /** @type {PaginationInfo} */
          {
            total: items.length,
            limit: base.pagination.limit,
            offset: searchOffset
          }
        };
      } catch (err) {
        base.showError(err.message || "搜索失败");
        return {
          results: [],
          pagination: (
            /** @type {PaginationInfo} */
            {
              total: 0,
              limit: base.pagination.limit,
              offset: searchOffset
            }
          )
        };
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
      const result = await searchPastes(value.trim(), 0);
      pastes.value = result.results || [];
      base.updatePagination(result.pagination || { total: pastes.value.length, limit: base.pagination.limit, offset: 0 }, "offset");
      base.updateLastRefreshTime();
    } finally {
      searchLoading.value = false;
    }
  };
  const clearSearch = async () => {
    searchQuery.value = "";
    isSearchMode.value = false;
    base.resetPagination();
    await loadPastes();
  };
  const handleOffsetChangeWithSearch = async (newOffset) => {
    if (isSearchMode.value && searchQuery.value) {
      try {
        searchLoading.value = true;
        const result = await searchPastes(searchQuery.value, newOffset);
        pastes.value = result.results || [];
        base.updatePagination(result.pagination || { total: pastes.value.length, limit: base.pagination.limit, offset: newOffset }, "offset");
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
    await loadPastes();
  };
  const refreshPastes = async () => {
    if (isSearchMode.value && searchQuery.value) {
      try {
        searchLoading.value = true;
        const result = await searchPastes(searchQuery.value, base.pagination.offset);
        pastes.value = result.results || [];
        base.updatePagination(result.pagination || { total: pastes.value.length, limit: base.pagination.limit, offset: base.pagination.offset }, "offset");
        base.updateLastRefreshTime();
      } finally {
        searchLoading.value = false;
      }
      return;
    }
    await loadPastes();
  };
  const toggleVisibility = async (paste) => {
    if (!paste || !paste.id) {
      base.showError("操作失败：缺少文本标识");
      return;
    }
    const newVisibility = !paste.is_public;
    const visibilityText = newVisibility ? "公开" : "私密";
    try {
      await updatePasteFields(paste.id, { is_public: newVisibility }, `已切换为${visibilityText}`);
    } catch (err) {
    }
  };
  const closeAllModals = () => {
    showPreview.value = false;
    showEdit.value = false;
    showQRCodeModal.value = false;
    previewPaste.value = null;
    editingPaste.value = null;
    qrCodeDataURL.value = "";
    qrCodeSlug.value = "";
  };
  return {
    // 继承 admin base
    ...base,
    // 搜索状态
    searchQuery,
    isSearchMode,
    searchLoading,
    // 文本管理状态
    pastes,
    previewPaste,
    editingPaste,
    showPreview,
    showEdit,
    showQRCodeModal,
    qrCodeDataURL,
    qrCodeSlug,
    copiedTexts,
    copiedRawTexts,
    // 权限状态
    isAdmin,
    isApiKeyUser,
    isAuthorized,
    // 操作
    loadPastes,
    refreshPastes,
    searchPastes,
    handleOffsetChange,
    handleGlobalSearch,
    clearSearch,
    handleOffsetChangeWithSearch,
    handlePageSizeChange,
    deletePaste,
    batchDeletePastes,
    clearExpiredPastes,
    openPreview,
    closePreview,
    openEditModal,
    closeEditModal,
    submitEdit,
    copyLink,
    copyRawLink,
    quickEditContent,
    goToViewPage,
    showQRCode,
    toggleSelectAll,
    toggleVisibility,
    closeAllModals
  };
}
const _hoisted_1$6 = { class: "p-4" };
const _hoisted_2$6 = { class: "flex justify-between items-start mb-2" };
const _hoisted_3$6 = { class: "flex items-center" };
const _hoisted_4$6 = ["checked", "onClick"];
const _hoisted_5$6 = ["onClick"];
const _hoisted_6$6 = ["onClick"];
const _hoisted_7$6 = {
  key: 0,
  class: "absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-green-500 rounded whitespace-nowrap"
};
const _hoisted_8$6 = ["onClick"];
const _hoisted_9$6 = { class: "flex space-x-2" };
const _hoisted_10$6 = ["onClick"];
const _hoisted_11$6 = ["onClick"];
const _hoisted_12$6 = ["onClick"];
const _hoisted_13$6 = {
  key: 0,
  class: "absolute -top-8 right-0 px-2 py-1 text-xs text-white bg-green-500 rounded whitespace-nowrap"
};
const _hoisted_14$6 = ["onClick"];
const _hoisted_15$6 = { class: "mt-3 space-y-2 text-sm" };
const _hoisted_16$6 = {
  key: 0,
  class: "flex"
};
const _hoisted_17$5 = {
  key: 1,
  class: "flex"
};
const _hoisted_18$5 = { class: "flex" };
const _hoisted_19$5 = { class: "flex" };
const _hoisted_20$3 = { class: "flex" };
const _hoisted_21$3 = {
  key: 0,
  class: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
};
const _hoisted_22$2 = {
  key: 1,
  class: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
};
const _sfc_main$6 = {
  __name: "PasteTable",
  props: {
    darkMode: {
      type: Boolean,
      required: true
    },
    pastes: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    selectedPastes: {
      type: Array,
      required: true
    },
    copiedTexts: {
      type: Object,
      default: () => ({})
    },
    copiedRawTexts: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["toggle-select-all", "toggle-select-item", "view", "copy-link", "copy-raw-link", "preview", "edit", "delete", "show-qrcode", "toggle-visibility"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const truncateText = (text, length = 10) => {
      if (!text) return "无";
      return text.length <= length ? text : `${text.substring(0, length)}...`;
    };
    const formatDate = (dateString) => {
      return formatDateTime(dateString);
    };
    const formatExpiry$1 = (dateString) => {
      return formatExpiry(dateString);
    };
    const isExpired$1 = (paste) => {
      if (!paste.expires_at) return false;
      return isExpired(paste.expires_at);
    };
    const getExpiryClass = (dateString) => {
      if (!dateString) return "";
      const now = /* @__PURE__ */ new Date();
      const expiryDate = new Date(dateString);
      if (expiryDate < now) {
        return "text-red-600 dark:text-red-400";
      } else {
        const timeDiff = expiryDate.getTime() - now.getTime();
        const daysDiff = timeDiff / (1e3 * 3600 * 24);
        if (daysDiff <= 1) {
          return "text-orange-600 dark:text-orange-400";
        } else if (daysDiff <= 7) {
          return "text-yellow-600 dark:text-yellow-400";
        } else {
          return "text-green-600 dark:text-green-400";
        }
      }
    };
    const handleMobileSelect = (pasteId) => {
      emit("toggle-select-item", pasteId);
    };
    const handleSelectionChange = (event) => {
      if (event.type === "toggle-all") {
        emit("toggle-select-all");
      } else if (event.type === "toggle-item") {
        emit("toggle-select-item", event.id);
      }
    };
    const passwordBadgeClass = computed(
      () => `inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${props.darkMode ? "bg-amber-500/15 text-amber-100 border-amber-400/30" : "bg-amber-50 text-amber-700 border-amber-200"}`
    );
    const passwordIconClass = computed(() => props.darkMode ? "text-amber-200" : "text-amber-600");
    const renderPasswordBadge = () => h(
      "span",
      {
        class: `${passwordBadgeClass.value} ml-2`,
        title: "密码保护"
      },
      [
        h(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            class: `h-3 w-3 ${passwordIconClass.value}`,
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
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
    const pasteColumns = computed(() => [
      {
        key: "slug",
        type: "accessor",
        header: "标题",
        sortable: true,
        render: (_, paste) => {
          if (!paste) return h("span", "无数据");
          const displayTitle = paste.title || paste.slug || paste.remark;
          return h("div", { class: "flex items-center space-x-2" }, [
            // 标题和加密徽章容器
            h("div", { class: "flex items-center" }, [
              h(
                "span",
                {
                  class: ["cursor-pointer hover:underline truncate max-w-[120px]", isExpired$1(paste) ? "text-red-600 dark:text-red-400" : "text-primary-600 dark:text-primary-400"],
                  title: displayTitle,
                  onClick: () => emit("view", paste.slug)
                },
                displayTitle
              ),
              // 加密徽章（仅在有密码时显示）
              paste.has_password ? renderPasswordBadge() : null
            ]),
            // 复制链接按钮
            h(
              "button",
              {
                class: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative",
                title: "复制链接",
                onClick: () => emit("copy-link", paste.slug)
              },
              [
                h(
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
                      d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    })
                  ]
                ),
                // 复制成功提示
                props.copiedTexts[paste.id] ? h(
                  "span",
                  {
                    class: "absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-green-500 rounded whitespace-nowrap"
                  },
                  "已复制"
                ) : null
              ]
            ),
            // 二维码按钮
            h(
              "button",
              {
                class: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full",
                title: "显示二维码",
                onClick: () => emit("show-qrcode", paste.slug)
              },
              [
                h(
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
                      d: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    })
                  ]
                )
              ]
            )
          ]);
        }
      },
      {
        key: "remark",
        type: "accessor",
        header: "备注",
        sortable: true,
        render: (_, paste) => {
          if (!paste) return h("span", "无数据");
          return h(
            "span",
            {
              class: [
                "truncate max-w-[120px] inline-block px-2 py-0.5 rounded",
                paste.remark ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300" : props.darkMode ? "text-gray-300" : "text-gray-500",
                isExpired$1(paste) ? "text-red-600 dark:text-red-400" : ""
              ],
              title: paste.remark || "无"
            },
            truncateText(paste.remark)
          );
        }
      },
      {
        key: "created_at",
        type: "accessor",
        header: "创建时间",
        sortable: true,
        render: (_, paste) => {
          if (!paste) return h("span", "无数据");
          return h(
            "span",
            {
              class: [props.darkMode ? "text-gray-300" : "text-gray-500", isExpired$1(paste) ? "text-red-600 dark:text-red-400" : ""]
            },
            formatDate(paste.created_at)
          );
        }
      },
      {
        key: "expires_at",
        type: "accessor",
        header: "过期时间",
        sortable: true,
        // 自定义排序函数：按过期时间排序，NULL值排在最后
        sortingFn: (rowA, rowB) => {
          const expiresA = rowA.original.expires_at;
          const expiresB = rowB.original.expires_at;
          if (!expiresA && !expiresB) return 0;
          if (!expiresA) return 1;
          if (!expiresB) return -1;
          const dateA = new Date(expiresA);
          const dateB = new Date(expiresB);
          return dateA.getTime() - dateB.getTime();
        },
        render: (_, paste) => {
          if (!paste) return h("span", "无数据");
          if (!paste.expires_at) {
            return h("span", {
              class: props.darkMode ? "text-gray-300" : "text-gray-500"
            }, "永不过期");
          }
          const date = formatDateTime(paste.expires_at);
          const relative = formatRelativeTime(paste.expires_at);
          const expiryDate = parseUTCDate(paste.expires_at);
          const now = /* @__PURE__ */ new Date();
          let colorClass;
          if (expiryDate < now) {
            colorClass = "text-red-600 dark:text-red-400";
          } else {
            const daysDiff = (expiryDate.getTime() - now.getTime()) / (1e3 * 3600 * 24);
            if (daysDiff <= 1) {
              colorClass = "text-orange-600 dark:text-orange-400";
            } else if (daysDiff <= 7) {
              colorClass = "text-yellow-600 dark:text-yellow-400";
            } else {
              colorClass = "text-green-600 dark:text-green-400";
            }
          }
          return h("div", { class: "flex flex-col" }, [
            // 第一行：日期
            h("span", {
              class: props.darkMode ? "text-gray-300" : "text-gray-700"
            }, date),
            // 第二行：相对时间（小字+颜色）
            relative ? h("span", {
              class: ["text-xs", colorClass]
            }, relative) : null
          ]);
        }
      },
      {
        key: "remaining_views",
        type: "display",
        header: "剩余次数",
        sortable: false,
        render: (paste) => {
          if (!paste) return h("span", "无数据");
          const currentViews = paste.view_count || 0;
          const maxViews = paste.max_views;
          let remainingText, remainingClass;
          if (!maxViews) {
            remainingText = "无限制";
            remainingClass = props.darkMode ? "text-gray-300" : "text-gray-500";
          } else {
            const remaining = maxViews - currentViews;
            if (remaining <= 0) {
              remainingText = "已用完";
              remainingClass = "text-red-500";
            } else if (remaining < 10) {
              remainingText = `${remaining} 次`;
              remainingClass = "text-yellow-500";
            } else {
              remainingText = `${remaining} 次`;
              remainingClass = "text-green-600 dark:text-green-400";
            }
          }
          return h(
            "span",
            {
              class: [props.darkMode ? "text-gray-300" : "text-gray-500", isExpired$1(paste) ? "text-red-600 dark:text-red-400" : remainingClass]
            },
            remainingText
          );
        }
      },
      {
        key: "created_by",
        type: "accessor",
        header: "创建者",
        sortable: true,
        render: (_, paste) => {
          if (!paste) return h("span", "无数据");
          const badgeClass = creatorBadgeUtils.getBadgeClass(paste.created_by, paste.key_name);
          const creatorType = creatorBadgeUtils.getCreatorType(paste.created_by, paste.key_name);
          let text = "未知来源";
          if (creatorType === "admin") {
            text = "管理员";
          } else if (creatorType === "apikey") {
            text = paste.key_name ? `密钥：${paste.key_name}` : `密钥：${paste.created_by?.substring(7, 12) || ""}...`;
          } else if (paste.created_by) {
            text = paste.created_by;
          }
          return h("div", { class: "flex items-center justify-center" }, [
            h(
              "span",
              {
                class: `px-2 py-0.5 text-xs rounded inline-block text-center ${badgeClass}`
              },
              text
            )
          ]);
        }
      },
      {
        key: "is_public",
        type: "display",
        header: "可见性",
        sortable: true,
        render: (paste) => {
          if (!paste) return h("span", "无数据");
          return h("div", { class: "flex items-center justify-center space-x-2" }, [
            // 滑块按钮
            h("button", {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                emit("toggle-visibility", paste);
              },
              class: [
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer",
                paste.is_public ? "bg-primary-600" : props.darkMode ? "bg-gray-700" : "bg-gray-200"
              ]
            }, [
              // 滑块圆点
              h("span", {
                class: [
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  paste.is_public ? "translate-x-6" : "translate-x-1"
                ]
              })
            ]),
            // 状态文字
            h("span", {
              class: ["text-xs", props.darkMode ? "text-gray-300" : "text-gray-700"]
            }, paste.is_public ? "公开" : "私密")
          ]);
        }
      },
      {
        key: "actions",
        type: "display",
        header: "操作",
        sortable: false,
        render: (paste) => {
          if (!paste) return h("span", "无数据");
          return h("div", { class: "flex justify-end space-x-2" }, [
            // 预览按钮
            h(
              "button",
              {
                class: "text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700",
                title: "预览",
                onClick: () => emit("preview", paste)
              },
              [
                h(
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
              ]
            ),
            // 编辑按钮
            h(
              "button",
              {
                class: "text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700",
                title: "编辑",
                onClick: () => emit("edit", paste)
              },
              [
                h(
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
              ]
            ),
            // 复制原始链接按钮
            h(
              "button",
              {
                class: "text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative",
                title: "复制原始链接",
                onClick: () => emit("copy-raw-link", paste.slug)
              },
              [
                h(
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
                // 复制成功提示
                props.copiedRawTexts[paste.id] ? h(
                  "span",
                  {
                    class: "absolute -top-8 right-0 px-2 py-1 text-xs text-white bg-green-500 rounded whitespace-nowrap"
                  },
                  "已复制直链"
                ) : null
              ]
            ),
            // 删除按钮
            h(
              "button",
              {
                class: "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700",
                title: "删除",
                onClick: () => emit("delete", paste.id)
              },
              [
                h(
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
              ]
            )
          ]);
        }
      }
    ]);
    const pasteColumnClasses = computed(() => ({
      slug: "",
      remark: "hidden sm:table-cell text-center",
      created_at: "hidden md:table-cell text-center",
      expires_at: "hidden lg:table-cell text-center",
      is_public: "hidden sm:table-cell text-center",
      remaining_views: "text-center",
      created_by: "hidden lg:table-cell text-center",
      actions: "text-center"
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$7, {
        data: __props.pastes,
        columns: pasteColumns.value,
        "column-classes": pasteColumnClasses.value,
        "manual-sorting": false,
        selectable: true,
        "selected-items": __props.selectedPastes,
        "row-id-field": "id",
        "empty-text": _ctx.$t("admin.paste.table.noData"),
        onSelectionChange: handleSelectionChange
      }, {
        mobile: withCtx(({ data }) => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(data, (paste) => {
            return openBlock(), createElementBlock("div", {
              key: paste.id,
              class: "bg-white dark:bg-gray-800 border-b dark:border-gray-700 last:border-b-0"
            }, [
              createBaseVNode("div", _hoisted_1$6, [
                createBaseVNode("div", _hoisted_2$6, [
                  createBaseVNode("div", _hoisted_3$6, [
                    createBaseVNode("input", {
                      type: "checkbox",
                      checked: __props.selectedPastes.includes(paste.id),
                      onClick: ($event) => handleMobileSelect(paste.id),
                      class: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer mr-2"
                    }, null, 8, _hoisted_4$6),
                    createBaseVNode("span", {
                      class: normalizeClass(["cursor-pointer font-medium text-base hover:underline", isExpired$1(paste) ? "text-red-600 dark:text-red-400" : "text-primary-600 dark:text-primary-400"]),
                      onClick: ($event) => emit("view", paste.slug)
                    }, toDisplayString(paste.title || paste.remark || paste.slug), 11, _hoisted_5$6),
                    createBaseVNode("button", {
                      onClick: ($event) => emit("copy-link", paste.slug),
                      class: "ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 relative",
                      title: "复制链接"
                    }, [
                      createVNode(unref(IconCopy), { class: "h-4 w-4" }),
                      __props.copiedTexts[paste.id] ? (openBlock(), createElementBlock("span", _hoisted_7$6, " 已复制 ")) : createCommentVNode("", true)
                    ], 8, _hoisted_6$6),
                    createBaseVNode("button", {
                      onClick: ($event) => emit("show-qrcode", paste.slug),
                      class: "ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200",
                      title: "显示二维码"
                    }, [
                      createVNode(unref(IconQrCode), { class: "h-4 w-4" })
                    ], 8, _hoisted_8$6)
                  ]),
                  createBaseVNode("div", _hoisted_9$6, [
                    createBaseVNode("button", {
                      class: "text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 p-1",
                      onClick: ($event) => emit("preview", paste)
                    }, [
                      createVNode(unref(IconEye), { class: "h-5 w-5" })
                    ], 8, _hoisted_10$6),
                    createBaseVNode("button", {
                      class: "text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-1",
                      onClick: ($event) => emit("edit", paste)
                    }, [
                      createVNode(unref(IconRename), { class: "h-5 w-5" })
                    ], 8, _hoisted_11$6),
                    createBaseVNode("button", {
                      class: "text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 p-1 relative",
                      onClick: ($event) => emit("copy-raw-link", paste.slug)
                    }, [
                      createVNode(unref(IconLink), { class: "h-5 w-5" }),
                      __props.copiedRawTexts[paste.id] ? (openBlock(), createElementBlock("span", _hoisted_13$6, "已复制直链")) : createCommentVNode("", true)
                    ], 8, _hoisted_12$6),
                    createBaseVNode("button", {
                      class: "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1",
                      onClick: ($event) => emit("delete", paste.id)
                    }, [
                      createVNode(unref(IconDelete), { class: "h-5 w-5" })
                    ], 8, _hoisted_14$6)
                  ])
                ]),
                createBaseVNode("div", _hoisted_15$6, [
                  paste.remark ? (openBlock(), createElementBlock("div", _hoisted_16$6, [
                    _cache[0] || (_cache[0] = createBaseVNode("span", { class: "text-gray-500 dark:text-gray-400 w-16 flex-shrink-0" }, "备注:", -1)),
                    createBaseVNode("span", {
                      class: normalizeClass(__props.darkMode ? "text-gray-300" : "text-gray-700")
                    }, toDisplayString(truncateText(paste.remark, 30)), 3)
                  ])) : createCommentVNode("", true),
                  paste.expires_at ? (openBlock(), createElementBlock("div", _hoisted_17$5, [
                    _cache[1] || (_cache[1] = createBaseVNode("span", { class: "text-gray-500 dark:text-gray-400 w-16 flex-shrink-0" }, "过期:", -1)),
                    createBaseVNode("span", {
                      class: normalizeClass(getExpiryClass(paste.expires_at))
                    }, toDisplayString(formatExpiry$1(paste.expires_at)), 3)
                  ])) : createCommentVNode("", true),
                  createBaseVNode("div", _hoisted_18$5, [
                    _cache[2] || (_cache[2] = createBaseVNode("span", { class: "text-gray-500 dark:text-gray-400 w-16 flex-shrink-0" }, "查看:", -1)),
                    createBaseVNode("span", {
                      class: normalizeClass(__props.darkMode ? "text-gray-300" : "text-gray-700")
                    }, toDisplayString(paste.view_count || 0) + toDisplayString(paste.max_views ? `/${paste.max_views}` : "") + " 次", 3)
                  ]),
                  createBaseVNode("div", _hoisted_19$5, [
                    _cache[3] || (_cache[3] = createBaseVNode("span", { class: "text-gray-500 dark:text-gray-400 w-16 flex-shrink-0" }, "创建:", -1)),
                    createBaseVNode("span", {
                      class: normalizeClass(__props.darkMode ? "text-gray-300" : "text-gray-700")
                    }, toDisplayString(formatDate(paste.created_at)), 3)
                  ]),
                  createBaseVNode("div", _hoisted_20$3, [
                    _cache[6] || (_cache[6] = createBaseVNode("span", { class: "text-gray-500 dark:text-gray-400 w-16 flex-shrink-0" }, "可见性:", -1)),
                    paste.is_public === false ? (openBlock(), createElementBlock("span", _hoisted_21$3, [
                      createVNode(unref(IconEyeOff), { class: "h-3 w-3 mr-0.5" }),
                      _cache[4] || (_cache[4] = createTextVNode(" 仅内部 ", -1))
                    ])) : (openBlock(), createElementBlock("span", _hoisted_22$2, [
                      createVNode(unref(IconGlobeAlt), { class: "h-3 w-3 mr-0.5" }),
                      _cache[5] || (_cache[5] = createTextVNode(" 公开 ", -1))
                    ]))
                  ])
                ])
              ])
            ]);
          }), 128))
        ]),
        _: 1
      }, 8, ["data", "columns", "column-classes", "selected-items", "empty-text"]);
    };
  }
};
const _hoisted_1$5 = { class: "md:hidden divide-y divide-gray-200 dark:divide-gray-700" };
const _hoisted_2$5 = { class: "flex justify-center" };
const _hoisted_3$5 = { class: "flex justify-between items-start mb-2" };
const _hoisted_4$5 = { class: "flex items-center" };
const _hoisted_5$5 = ["checked", "onChange"];
const _hoisted_6$5 = ["onClick"];
const _hoisted_7$5 = ["onClick"];
const _hoisted_8$5 = {
  key: 0,
  class: "absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-green-500 rounded whitespace-nowrap"
};
const _hoisted_9$5 = ["onClick"];
const _hoisted_10$5 = { class: "flex space-x-2" };
const _hoisted_11$5 = ["onClick"];
const _hoisted_12$5 = ["onClick"];
const _hoisted_13$5 = ["onClick"];
const _hoisted_14$5 = {
  key: 0,
  class: "absolute -top-8 right-0 px-2 py-1 text-xs text-white bg-green-500 rounded whitespace-nowrap"
};
const _hoisted_15$5 = ["onClick"];
const _hoisted_16$5 = { class: "grid grid-cols-2 gap-2 text-sm mt-3" };
const _hoisted_17$4 = ["title"];
const _hoisted_18$4 = { class: "flex" };
const _hoisted_19$4 = {
  key: 0,
  class: "px-3 py-1 text-xs rounded bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 inline-block mt-1"
};
const _hoisted_20$2 = {
  key: 1,
  class: "px-3 py-1 text-xs rounded bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 inline-block mt-1"
};
const _hoisted_21$2 = {
  key: 2,
  class: "px-3 py-1 text-xs rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 inline-block mt-1"
};
const _hoisted_22$1 = { class: "col-span-2" };
const _hoisted_23 = { class: "flex items-center flex-wrap gap-2" };
const _hoisted_24 = {
  key: 0,
  class: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
};
const _sfc_main$5 = {
  __name: "PasteCardList",
  props: {
    darkMode: {
      type: Boolean,
      required: true
    },
    pastes: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    selectedPastes: {
      type: Array,
      required: true
    },
    copiedTexts: {
      type: Object,
      default: () => ({})
    },
    copiedRawTexts: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["toggle-select-item", "view", "copy-link", "copy-raw-link", "preview", "edit", "delete", "show-qrcode"],
  setup(__props, { emit: __emit }) {
    useCreatorBadge();
    const truncateText = (text, length = 10) => {
      if (!text) return "无";
      return text.length <= length ? text : `${text.substring(0, length)}...`;
    };
    const formatDate = (dateString) => {
      return formatDateTime(dateString);
    };
    const formatExpiry$1 = (expiryDate) => {
      return formatExpiry(expiryDate);
    };
    const hasPassword = (paste) => {
      return paste.has_password;
    };
    const getRemainingViews$1 = (paste) => {
      return getRemainingViews(paste);
    };
    const getRemainingViewsLabel = (paste) => {
      const remaining = getRemainingViews$1(paste);
      if (remaining === Infinity) {
        return "无限制";
      }
      if (remaining === 0) {
        return "已用完";
      }
      return `${remaining}`;
    };
    const isExpired$1 = (paste) => {
      if (!paste.expires_at) return false;
      return isExpired(paste.expires_at);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        __props.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["p-4 text-center", __props.darkMode ? "text-gray-300" : "text-gray-500"])
        }, [
          createBaseVNode("div", _hoisted_2$5, [
            createVNode(unref(IconRefresh), { class: "animate-spin h-5 w-5 text-primary-500" }),
            _cache[0] || (_cache[0] = createBaseVNode("span", { class: "ml-2" }, "加载中...", -1))
          ])
        ], 2)) : __props.pastes.length === 0 ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["p-4 text-center", __props.darkMode ? "text-gray-300" : "text-gray-500"])
        }, "未找到分享记录", 2)) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.pastes, (paste) => {
          return openBlock(), createElementBlock("div", {
            key: paste.id,
            class: "p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700"
          }, [
            createBaseVNode("div", _hoisted_3$5, [
              createBaseVNode("div", _hoisted_4$5, [
                createBaseVNode("input", {
                  type: "checkbox",
                  checked: __props.selectedPastes.includes(paste.id),
                  onChange: ($event) => _ctx.$emit("toggle-select-item", paste.id),
                  class: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer mr-2"
                }, null, 40, _hoisted_5$5),
                createBaseVNode("span", {
                  class: normalizeClass(["cursor-pointer font-medium text-base hover:underline", isExpired$1(paste) ? "text-red-600 dark:text-red-400" : "text-primary-600 dark:text-primary-400"]),
                  onClick: ($event) => _ctx.$emit("view", paste.slug)
                }, toDisplayString(paste.title || paste.remark || paste.slug), 11, _hoisted_6$5),
                createBaseVNode("button", {
                  onClick: ($event) => _ctx.$emit("copy-link", paste.slug),
                  class: "ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 relative",
                  title: "复制链接"
                }, [
                  createVNode(unref(IconCopy), { class: "h-4 w-4" }),
                  __props.copiedTexts[paste.id] ? (openBlock(), createElementBlock("span", _hoisted_8$5, " 已复制 ")) : createCommentVNode("", true)
                ], 8, _hoisted_7$5),
                createBaseVNode("button", {
                  onClick: ($event) => _ctx.$emit("show-qrcode", paste.slug),
                  class: "ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200",
                  title: "显示二维码"
                }, [
                  createVNode(unref(IconQrCode), { class: "h-4 w-4" })
                ], 8, _hoisted_9$5)
              ]),
              createBaseVNode("div", _hoisted_10$5, [
                createBaseVNode("button", {
                  class: "text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 p-1",
                  onClick: ($event) => _ctx.$emit("preview", paste)
                }, [
                  createVNode(unref(IconEye), { class: "h-5 w-5" })
                ], 8, _hoisted_11$5),
                createBaseVNode("button", {
                  class: "text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-1",
                  onClick: ($event) => _ctx.$emit("edit", paste)
                }, [
                  createVNode(unref(IconRename), { class: "h-5 w-5" })
                ], 8, _hoisted_12$5),
                createBaseVNode("button", {
                  class: "text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 p-1 relative",
                  onClick: ($event) => _ctx.$emit("copy-raw-link", paste.slug)
                }, [
                  createVNode(unref(IconLink), { class: "h-5 w-5" }),
                  __props.copiedRawTexts[paste.id] ? (openBlock(), createElementBlock("span", _hoisted_14$5, "已复制直链")) : createCommentVNode("", true)
                ], 8, _hoisted_13$5),
                createBaseVNode("button", {
                  class: "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1",
                  onClick: ($event) => _ctx.$emit("delete", paste.id)
                }, [
                  createVNode(unref(IconDelete), { class: "h-5 w-5" })
                ], 8, _hoisted_15$5)
              ])
            ]),
            createBaseVNode("div", _hoisted_16$5, [
              createBaseVNode("div", null, [
                _cache[1] || (_cache[1] = createBaseVNode("div", { class: "text-gray-500 dark:text-gray-400 text-xs mb-1" }, "备注", -1)),
                createBaseVNode("span", {
                  class: normalizeClass(["truncate max-w-xs inline-block px-2 py-1 rounded", [
                    paste.remark ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300" : __props.darkMode ? "text-gray-300" : "text-gray-500",
                    isExpired$1(paste) ? "text-red-600 dark:text-red-400" : ""
                  ]]),
                  title: paste.remark || "无"
                }, toDisplayString(truncateText(paste.remark)), 11, _hoisted_17$4)
              ]),
              createBaseVNode("div", null, [
                _cache[2] || (_cache[2] = createBaseVNode("div", { class: "text-gray-500 dark:text-gray-400 text-xs mb-1" }, "创建时间", -1)),
                createBaseVNode("div", {
                  class: normalizeClass([__props.darkMode ? "text-gray-300" : "text-gray-500", isExpired$1(paste) ? "text-red-600 dark:text-red-400" : ""])
                }, toDisplayString(formatDate(paste.created_at)), 3)
              ]),
              createBaseVNode("div", null, [
                _cache[3] || (_cache[3] = createBaseVNode("div", { class: "text-gray-500 dark:text-gray-400 text-xs mb-1" }, "过期时间", -1)),
                createBaseVNode("div", {
                  class: normalizeClass([__props.darkMode ? "text-gray-300" : "text-gray-500", isExpired$1(paste) ? "text-red-600 dark:text-red-400" : ""])
                }, toDisplayString(formatExpiry$1(paste.expires_at)), 3)
              ]),
              createBaseVNode("div", null, [
                _cache[4] || (_cache[4] = createBaseVNode("div", { class: "text-gray-500 dark:text-gray-400 text-xs mb-1" }, "创建者", -1)),
                createBaseVNode("div", _hoisted_18$4, [
                  paste.created_by && paste.created_by.startsWith("apikey:") ? (openBlock(), createElementBlock("span", _hoisted_19$4, toDisplayString(paste.key_name ? `密钥：${paste.key_name}` : `密钥：${paste.created_by.substring(7, 12)}...`), 1)) : paste.created_by === "admin" || paste.created_by && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(paste.created_by) ? (openBlock(), createElementBlock("span", _hoisted_20$2, " 管理员 ")) : (openBlock(), createElementBlock("span", _hoisted_21$2, toDisplayString(paste.created_by || "未知来源"), 1))
                ])
              ]),
              createBaseVNode("div", _hoisted_22$1, [
                _cache[8] || (_cache[8] = createBaseVNode("div", { class: "text-gray-500 dark:text-gray-400 text-xs mb-1" }, "状态信息", -1)),
                createBaseVNode("div", _hoisted_23, [
                  paste.is_public === false ? (openBlock(), createElementBlock("span", _hoisted_24, [
                    createVNode(unref(IconEyeOff), { class: "h-3 w-3 mr-1" }),
                    _cache[5] || (_cache[5] = createTextVNode(" 仅内部 ", -1))
                  ])) : createCommentVNode("", true),
                  hasPassword(paste) ? (openBlock(), createElementBlock("span", {
                    key: 1,
                    class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", [isExpired$1(paste) ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"]])
                  }, [
                    createVNode(unref(IconLockClosed), { class: "h-3 w-3 mr-1" }),
                    _cache[6] || (_cache[6] = createTextVNode(" 已加密 ", -1))
                  ], 2)) : (openBlock(), createElementBlock("span", {
                    key: 2,
                    class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", [isExpired$1(paste) ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"]])
                  }, [
                    createVNode(unref(IconGlobeAlt), { class: "h-3 w-3 mr-1" }),
                    _cache[7] || (_cache[7] = createTextVNode(" 公开 ", -1))
                  ], 2)),
                  createBaseVNode("span", {
                    class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", [
                      isExpired$1(paste) ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : getRemainingViews$1(paste) === 0 ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    ]])
                  }, [
                    createVNode(unref(IconEye), { class: "h-3 w-3 mr-1" }),
                    createTextVNode(" 剩余 " + toDisplayString(getRemainingViewsLabel(paste)), 1)
                  ], 2)
                ])
              ])
            ])
          ]);
        }), 128))
      ]);
    };
  }
};
const _hoisted_1$4 = {
  key: 0,
  class: "flex flex-col min-h-[180px] sm:min-h-[220px]"
};
const _hoisted_2$4 = ["id", "onKeydown"];
const _hoisted_3$4 = { class: "px-3 pt-3 pb-2 sm:px-4 sm:pt-4" };
const _hoisted_4$4 = { class: "flex items-center justify-between mb-2" };
const _hoisted_5$4 = ["datetime", "title"];
const _hoisted_6$4 = { class: "flex items-center space-x-2 flex-shrink-0" };
const _hoisted_7$4 = { class: "flex items-center space-x-1.5" };
const _hoisted_8$4 = ["title"];
const _hoisted_9$4 = {
  key: 1,
  class: "inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30",
  title: "已过期"
};
const _hoisted_10$4 = ["title"];
const _hoisted_11$4 = { class: "py-1" };
const _hoisted_12$4 = ["title"];
const _hoisted_13$4 = { class: "text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-8 sm:line-clamp-10 whitespace-pre-wrap break-words leading-relaxed" };
const _hoisted_14$4 = { class: "px-3 pb-2.5 sm:px-4 sm:pb-3" };
const _hoisted_15$4 = { class: "flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400" };
const _hoisted_16$4 = { class: "inline-flex items-center" };
const doubleTapDelay = 300;
const _sfc_main$4 = {
  __name: "PasteMasonryCard",
  props: {
    darkMode: {
      type: Boolean,
      required: true
    },
    paste: {
      type: Object,
      required: true
    }
  },
  emits: ["click", "preview", "edit", "delete", "copy-link", "copy-raw-link", "show-qrcode", "quick-edit-content"],
  setup(__props, { emit: __emit }) {
    const { getCreatorText } = useCreatorBadge();
    const { t } = useI18n();
    const { showError } = useGlobalMessage();
    const props = __props;
    const emit = __emit;
    const truncateContent = (text, maxLength = 800) => {
      if (!text) return "";
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + "...";
    };
    const displayContent = computed(() => {
      return props.paste.content || "";
    });
    const isExpired$1 = computed(() => {
      return props.paste.expires_at ? isExpired(props.paste.expires_at) : false;
    });
    const remainingViews = computed(() => {
      return getRemainingViews(props.paste);
    });
    const creatorLabel = computed(() => {
      return getCreatorText(props.paste.created_by, props.paste.key_name);
    });
    const showViewsWarning = computed(() => {
      const num = remainingViews.value;
      return num !== Infinity && num > 0 && num < 10;
    });
    const isEditing = ref(false);
    const editingContent = ref("");
    const isTouchDevice = ref(false);
    const lastTapTime = ref(0);
    const startEditing = () => {
      editingContent.value = displayContent.value;
      isEditing.value = true;
      nextTick(() => {
        const textarea = document.querySelector(`#edit-textarea-${props.paste.id}`);
        if (textarea) {
          textarea.focus({ preventScroll: true });
          textarea.scrollTop = 0;
          textarea.setSelectionRange(0, 0);
        }
      });
    };
    const saveContent = () => {
      if (editingContent.value.trim() === "") {
        showError(t("markdown.messages.contentEmpty"));
        return;
      }
      emit("quick-edit-content", {
        id: props.paste.id,
        slug: props.paste.slug,
        content: editingContent.value
      });
      isEditing.value = false;
    };
    const cancelEdit = () => {
      isEditing.value = false;
      editingContent.value = "";
    };
    const handleDoubleClick = (event) => {
      if (event.target.closest("button") || event.target.closest("a")) {
        return;
      }
      startEditing();
    };
    const handleTouchStart = (event) => {
      if (event.target.closest("button") || event.target.closest("a")) {
        return;
      }
      const currentTime = (/* @__PURE__ */ new Date()).getTime();
      const tapInterval = currentTime - lastTapTime.value;
      if (tapInterval < doubleTapDelay && tapInterval > 0) {
        event.preventDefault();
        startEditing();
        lastTapTime.value = 0;
      } else {
        lastTapTime.value = currentTime;
      }
    };
    const dropdownRef = ref(null);
    const showDropdown = ref(false);
    const toggleDropdown = (event) => {
      event.stopPropagation();
      showDropdown.value = !showDropdown.value;
    };
    const closeDropdown = () => {
      showDropdown.value = false;
    };
    onClickOutside(dropdownRef, () => {
      if (!showDropdown.value) return;
      closeDropdown();
    });
    onMounted(() => {
      isTouchDevice.value = "ontouchstart" in window || navigator.maxTouchPoints > 0 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["paste-masonry-card relative group flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500", isExpired$1.value && !isEditing.value ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-800"]),
        tabindex: "0",
        onDblclick: withModifiers(handleDoubleClick, ["prevent"]),
        onTouchstart: handleTouchStart
      }, [
        isEditing.value ? (openBlock(), createElementBlock("div", _hoisted_1$4, [
          withDirectives(createBaseVNode("textarea", {
            id: `edit-textarea-${__props.paste.id}`,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => editingContent.value = $event),
            class: normalizeClass(["w-full flex-1 p-3 sm:p-4 text-sm leading-relaxed resize-none border-none outline-none paste-edit-textarea min-h-[120px] sm:min-h-[160px] max-h-[400px] sm:max-h-[500px]", __props.darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"]),
            placeholder: "编辑内容...",
            onKeydown: [
              withKeys(cancelEdit, ["esc"]),
              withKeys(withModifiers(saveContent, ["meta"]), ["enter"]),
              withKeys(withModifiers(saveContent, ["ctrl"]), ["enter"])
            ]
          }, null, 42, _hoisted_2$4), [
            [vModelText, editingContent.value]
          ]),
          createBaseVNode("div", {
            class: normalizeClass(["flex items-center justify-end space-x-2 p-2 sm:p-3 border-t", __props.darkMode ? "border-gray-700" : "border-gray-200"])
          }, [
            createBaseVNode("button", {
              onClick: cancelEdit,
              class: normalizeClass(["px-4 py-2 text-sm font-medium rounded transition-colors", __props.darkMode ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"])
            }, " 取消 ", 2),
            createBaseVNode("button", {
              onClick: saveContent,
              class: normalizeClass(["px-4 py-2 text-sm font-medium text-white rounded transition-colors", __props.darkMode ? "bg-primary-600 hover:bg-primary-700" : "bg-primary-600 hover:bg-primary-700"])
            }, " 保存 ", 2)
          ], 2)
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("div", _hoisted_3$4, [
            createBaseVNode("div", _hoisted_4$4, [
              createBaseVNode("time", {
                class: "text-xs text-gray-500 dark:text-gray-400",
                datetime: __props.paste.created_at,
                title: unref(formatDateTime)(__props.paste.created_at)
              }, toDisplayString(unref(formatDateTime)(__props.paste.created_at)), 9, _hoisted_5$4),
              createBaseVNode("div", _hoisted_6$4, [
                createBaseVNode("div", _hoisted_7$4, [
                  __props.paste.has_password ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: normalizeClass(["inline-flex items-center justify-center w-6 h-6 rounded-full", __props.darkMode ? "bg-amber-500/15" : "bg-amber-50"]),
                    title: "密码保护"
                  }, [
                    createVNode(unref(IconLockClosed), {
                      class: normalizeClass(["h-4 w-4", __props.darkMode ? "text-amber-200" : "text-amber-600"])
                    }, null, 8, ["class"])
                  ], 2)) : createCommentVNode("", true),
                  createBaseVNode("span", {
                    class: normalizeClass(["inline-flex items-center justify-center w-6 h-6 rounded-full", __props.paste.is_public ? __props.darkMode ? "bg-green-500/15" : "bg-green-50" : __props.darkMode ? "bg-gray-500/15" : "bg-gray-50"]),
                    title: __props.paste.is_public ? "公开访问" : "仅管理员和创建者可见"
                  }, [
                    __props.paste.is_public ? (openBlock(), createBlock(unref(IconGlobeAlt), {
                      key: 0,
                      class: normalizeClass(["h-4 w-4", __props.darkMode ? "text-green-200" : "text-green-600"])
                    }, null, 8, ["class"])) : (openBlock(), createBlock(unref(IconEyeOff), {
                      key: 1,
                      class: normalizeClass(["h-4 w-4", __props.darkMode ? "text-gray-200" : "text-gray-600"])
                    }, null, 8, ["class"]))
                  ], 10, _hoisted_8$4),
                  isExpired$1.value ? (openBlock(), createElementBlock("span", _hoisted_9$4, [
                    createVNode(unref(IconError), { class: "h-4 w-4 text-red-600 dark:text-red-400" })
                  ])) : createCommentVNode("", true),
                  showViewsWarning.value ? (openBlock(), createElementBlock("span", {
                    key: 2,
                    class: "inline-flex items-center space-x-0.5",
                    title: `剩余次数: ${remainingViews.value}`
                  }, [
                    createBaseVNode("span", {
                      class: normalizeClass(["inline-flex items-center justify-center w-6 h-6 rounded-full", __props.darkMode ? "bg-orange-500/15" : "bg-orange-50"])
                    }, [
                      createVNode(unref(IconEye), {
                        class: normalizeClass(["h-4 w-4", __props.darkMode ? "text-orange-300" : "text-orange-600"])
                      }, null, 8, ["class"])
                    ], 2),
                    createBaseVNode("span", {
                      class: normalizeClass(["text-xs font-medium", __props.darkMode ? "text-orange-300" : "text-orange-600"])
                    }, toDisplayString(remainingViews.value), 3)
                  ], 8, _hoisted_10$4)) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", {
                  class: "relative",
                  ref_key: "dropdownRef",
                  ref: dropdownRef
                }, [
                  createBaseVNode("button", {
                    onClick: withModifiers(toggleDropdown, ["stop"]),
                    class: "p-2 sm:p-1 -m-1 sm:m-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 text-gray-500 dark:text-gray-400 transition-colors",
                    title: "更多操作"
                  }, [
                    createVNode(unref(IconMenu), { class: "h-4 w-4" })
                  ]),
                  showDropdown.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "absolute right-0 top-8 mt-1 w-40 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50",
                    onClick: _cache[8] || (_cache[8] = withModifiers(() => {
                    }, ["stop"]))
                  }, [
                    createBaseVNode("div", _hoisted_11$4, [
                      createBaseVNode("button", {
                        onClick: _cache[1] || (_cache[1] = withModifiers(($event) => {
                          emit("preview", __props.paste);
                          closeDropdown();
                        }, ["stop"])),
                        class: "w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center transition-colors"
                      }, [
                        createVNode(unref(IconEye), { class: "h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" }),
                        _cache[9] || (_cache[9] = createTextVNode(" 预览 ", -1))
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[2] || (_cache[2] = withModifiers(($event) => {
                          startEditing();
                          closeDropdown();
                        }, ["stop"])),
                        class: "w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center transition-colors"
                      }, [
                        createVNode(unref(IconArrowUp), { class: "h-4 w-4 mr-2 text-green-600 dark:text-green-400" }),
                        _cache[10] || (_cache[10] = createTextVNode(" 快速编辑 ", -1))
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[3] || (_cache[3] = withModifiers(($event) => {
                          emit("edit", __props.paste);
                          closeDropdown();
                        }, ["stop"])),
                        class: "w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center transition-colors"
                      }, [
                        createVNode(unref(IconRename), { class: "h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" }),
                        _cache[11] || (_cache[11] = createTextVNode(" 完整编辑 ", -1))
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[4] || (_cache[4] = withModifiers(($event) => {
                          emit("copy-link", __props.paste.slug);
                          closeDropdown();
                        }, ["stop"])),
                        class: "w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center transition-colors"
                      }, [
                        createVNode(unref(IconCopy), { class: "h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" }),
                        _cache[12] || (_cache[12] = createTextVNode(" 复制链接 ", -1))
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[5] || (_cache[5] = withModifiers(($event) => {
                          emit("copy-raw-link", __props.paste.slug);
                          closeDropdown();
                        }, ["stop"])),
                        class: "w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center transition-colors"
                      }, [
                        createVNode(unref(IconLink), { class: "h-4 w-4 mr-2 text-cyan-600 dark:text-cyan-400" }),
                        _cache[13] || (_cache[13] = createTextVNode(" 复制直链 ", -1))
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[6] || (_cache[6] = withModifiers(($event) => {
                          emit("show-qrcode", __props.paste.slug);
                          closeDropdown();
                        }, ["stop"])),
                        class: "w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center transition-colors"
                      }, [
                        createVNode(unref(IconQrCode), { class: "h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" }),
                        _cache[14] || (_cache[14] = createTextVNode(" 显示二维码 ", -1))
                      ]),
                      _cache[16] || (_cache[16] = createBaseVNode("div", { class: "border-t border-gray-200 dark:border-gray-600 my-1" }, null, -1)),
                      createBaseVNode("button", {
                        onClick: _cache[7] || (_cache[7] = withModifiers(($event) => {
                          emit("delete", __props.paste.id);
                          closeDropdown();
                        }, ["stop"])),
                        class: "w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center transition-colors"
                      }, [
                        createVNode(unref(IconDelete), { class: "h-4 w-4 mr-2" }),
                        _cache[15] || (_cache[15] = createTextVNode(" 删除 ", -1))
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ], 512)
              ])
            ]),
            createBaseVNode("h3", {
              class: normalizeClass(["text-sm sm:text-base font-medium truncate mb-2", isExpired$1.value ? "text-red-600 dark:text-red-400" : "text-primary-600 dark:text-primary-400"]),
              title: __props.paste.title || __props.paste.remark || __props.paste.slug
            }, toDisplayString(__props.paste.title || __props.paste.slug), 11, _hoisted_12$4),
            createBaseVNode("div", _hoisted_13$4, toDisplayString(truncateContent(displayContent.value, 400)), 1)
          ]),
          createBaseVNode("div", _hoisted_14$4, [
            createBaseVNode("div", _hoisted_15$4, [
              createBaseVNode("span", _hoisted_16$4, [
                createVNode(unref(IconUser), { class: "h-3 w-3 mr-1" }),
                createTextVNode(" " + toDisplayString(creatorLabel.value), 1)
              ]),
              __props.paste.expires_at ? (openBlock(), createElementBlock("span", {
                key: 0,
                class: normalizeClass(["inline-flex items-center", isExpired$1.value ? "text-red-600 dark:text-red-400" : ""])
              }, [
                createVNode(unref(IconCalendar), { class: "h-3 w-3 mr-1" }),
                createTextVNode(" " + toDisplayString(unref(formatRelativeTime)(__props.paste.expires_at)), 1)
              ], 2)) : createCommentVNode("", true)
            ])
          ])
        ], 64))
      ], 34);
    };
  }
};
const PasteMasonryCard = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-ae6c9cb0"]]);
function usePasteMasonryView() {
  const log = createLogger("PasteMasonry");
  const STORAGE_KEYS = {
    COLUMN_COUNT: "paste_masonry_column_count",
    HORIZONTAL_GAP: "paste_masonry_horizontal_gap",
    VERTICAL_GAP: "paste_masonry_vertical_gap"
  };
  const columnCount = useLocalStorage(STORAGE_KEYS.COLUMN_COUNT, "auto");
  const horizontalGap = useLocalStorage(STORAGE_KEYS.HORIZONTAL_GAP, 16);
  const verticalGap = useLocalStorage(STORAGE_KEYS.VERTICAL_GAP, 16);
  const showViewSettings = ref(false);
  const { width: windowWidth } = useWindowSize({ initialWidth: 1024 });
  const baseGap = computed(() => horizontalGap.value);
  const columnWidth = computed(() => {
    if (windowWidth.value < 640) return 300;
    if (windowWidth.value < 1024) return 280;
    return 260;
  });
  const minColumns = computed(() => {
    if (columnCount.value === "auto") {
      return 1;
    }
    const cols = parseInt(columnCount.value);
    return cols;
  });
  const maxColumns = computed(() => {
    if (columnCount.value === "auto") {
      if (windowWidth.value < 640) return 1;
      if (windowWidth.value < 1024) return 3;
      return 4;
    }
    const cols = parseInt(columnCount.value);
    return cols;
  });
  const isDefaultSettings = computed(() => {
    return columnCount.value === "auto" && horizontalGap.value === 16 && verticalGap.value === 16;
  });
  const resetMasonrySettings = () => {
    columnCount.value = "auto";
    horizontalGap.value = 16;
    verticalGap.value = 16;
    columnCount.remove?.();
    horizontalGap.remove?.();
    verticalGap.remove?.();
    log.debug("文本瀑布流设置已重置为默认值");
  };
  const toggleViewSettings = () => {
    showViewSettings.value = !showViewSettings.value;
  };
  const setupWatchers = () => {
    watch(columnCount, (newValue) => {
      log.debug(`文本瀑布流列数设置已保存: ${newValue}`);
    });
    watch(horizontalGap, (newValue) => {
      log.debug(`文本瀑布流水平间距设置已保存: ${newValue}px`);
    });
    watch(verticalGap, (newValue) => {
      log.debug(`文本瀑布流垂直间距设置已保存: ${newValue}px`);
    });
  };
  const cleanupWatchers = () => {
  };
  return {
    // 设置状态
    columnCount,
    horizontalGap,
    verticalGap,
    showViewSettings,
    // MasonryWall配置
    baseGap,
    columnWidth,
    minColumns,
    maxColumns,
    // 设置管理
    isDefaultSettings,
    resetMasonrySettings,
    // 工具栏交互
    toggleViewSettings,
    // 初始化和清理方法
    setupWatchers,
    cleanupWatchers
  };
}
const _hoisted_1$3 = { class: "paste-masonry-view" };
const _hoisted_2$3 = { class: "flex items-center justify-between" };
const _hoisted_3$3 = { class: "flex items-center gap-3" };
const _hoisted_4$3 = { class: "flex items-center gap-2" };
const _hoisted_5$3 = { class: "flex items-center gap-2" };
const _hoisted_6$3 = { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" };
const _hoisted_7$3 = { class: "space-y-2" };
const _hoisted_8$3 = { class: "flex items-center gap-2" };
const _hoisted_9$3 = ["onClick"];
const _hoisted_10$3 = { class: "space-y-3 sm:col-span-2" };
const _hoisted_11$3 = { class: "flex items-center justify-between" };
const _hoisted_12$3 = ["disabled", "title"];
const _hoisted_13$3 = { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" };
const _hoisted_14$3 = { class: "space-y-2" };
const _hoisted_15$3 = { class: "flex items-center justify-between" };
const _hoisted_16$3 = { class: "relative" };
const _hoisted_17$3 = { class: "space-y-2" };
const _hoisted_18$3 = { class: "flex items-center justify-between" };
const _hoisted_19$3 = { class: "relative" };
const _sfc_main$3 = {
  __name: "PasteMasonryView",
  props: {
    darkMode: {
      type: Boolean,
      required: true
    },
    pastes: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    selectedPastes: {
      type: Array,
      required: true
    },
    copiedTexts: {
      type: Object,
      default: () => ({})
    },
    copiedRawTexts: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["toggle-select-all", "toggle-select-item", "view", "copy-link", "copy-raw-link", "preview", "edit", "delete", "show-qrcode", "quick-edit-content"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const toolbarRef = ref(null);
    const {
      // 设置状态
      columnCount,
      horizontalGap,
      verticalGap,
      showViewSettings,
      // MasonryWall配置
      baseGap,
      columnWidth,
      minColumns,
      maxColumns,
      // 设置管理
      isDefaultSettings,
      resetMasonrySettings,
      // 工具栏交互
      toggleViewSettings,
      // 初始化和清理方法
      setupWatchers
    } = usePasteMasonryView();
    onClickOutside(toolbarRef, () => {
      if (!showViewSettings.value) return;
      showViewSettings.value = false;
    });
    const updateSpacingCSSVariables = () => {
      const masonryElement = document.querySelector(".paste-masonry-wall");
      if (masonryElement) {
        masonryElement.style.setProperty("--vertical-gap", `${verticalGap.value}px`);
      }
    };
    watch(
      verticalGap,
      () => {
        updateSpacingCSSVariables();
      },
      { immediate: true }
    );
    onMounted(() => {
      setupWatchers();
      nextTick(() => {
        updateSpacingCSSVariables();
      });
    });
    onUnmounted(() => {
    });
    const handleCardClick = (paste) => {
      emit("preview", paste);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", {
          ref_key: "toolbarRef",
          ref: toolbarRef,
          class: normalizeClass(["paste-masonry-toolbar mb-4", __props.darkMode ? "bg-gray-800/80" : "bg-white/90"])
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["px-3 py-2 border-b", __props.darkMode ? "border-gray-700" : "border-gray-200"])
          }, [
            createBaseVNode("div", _hoisted_2$3, [
              createBaseVNode("div", _hoisted_3$3, [
                createBaseVNode("div", _hoisted_4$3, [
                  createVNode(unref(IconGrid), {
                    class: normalizeClass(["w-5 h-5", __props.darkMode ? "text-primary-400" : "text-primary-600"])
                  }, null, 8, ["class"]),
                  createBaseVNode("span", {
                    class: normalizeClass(["font-medium text-sm", __props.darkMode ? "text-gray-200" : "text-gray-900"])
                  }, "瀑布流视图", 2)
                ]),
                createBaseVNode("div", {
                  class: normalizeClass(["w-px h-4", __props.darkMode ? "bg-gray-600" : "bg-gray-300"])
                }, null, 2),
                createBaseVNode("span", {
                  class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                }, toDisplayString(__props.pastes.length) + " 条文本 ", 3)
              ]),
              createBaseVNode("div", _hoisted_5$3, [
                createBaseVNode("button", {
                  onClick: _cache[0] || (_cache[0] = (...args) => unref(toggleViewSettings) && unref(toggleViewSettings)(...args)),
                  class: normalizeClass(["flex items-center gap-1 px-3 py-1.5 text-sm rounded-md transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"])
                }, [
                  createVNode(unref(IconAdjustments), { class: "w-4 h-4" }),
                  _cache[6] || (_cache[6] = createBaseVNode("span", { class: "hidden sm:inline" }, "视图设置", -1))
                ], 2)
              ])
            ])
          ], 2),
          unref(showViewSettings) ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["px-3 py-2 border-b", __props.darkMode ? "border-gray-700 bg-gray-800/30" : "border-gray-200 bg-gray-50/50"])
          }, [
            createBaseVNode("div", _hoisted_6$3, [
              createBaseVNode("div", _hoisted_7$3, [
                createBaseVNode("label", {
                  class: normalizeClass(["block text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, "列数", 2),
                createBaseVNode("div", _hoisted_8$3, [
                  createBaseVNode("button", {
                    onClick: _cache[1] || (_cache[1] = ($event) => columnCount.value = "auto"),
                    class: normalizeClass(["px-3 py-1.5 text-xs rounded-md transition-colors", [
                      unref(columnCount) === "auto" ? __props.darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white" : __props.darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    ]])
                  }, " 自动 ", 2),
                  createBaseVNode("div", {
                    class: normalizeClass(["flex rounded-md overflow-hidden border", __props.darkMode ? "border-gray-600" : "border-gray-300"])
                  }, [
                    (openBlock(), createElementBlock(Fragment, null, renderList([1, 2, 3, 4], (cols) => {
                      return createBaseVNode("button", {
                        key: cols,
                        onClick: ($event) => columnCount.value = cols.toString(),
                        class: normalizeClass(["px-2 py-1.5 text-xs transition-colors", [
                          unref(columnCount) === cols.toString() ? __props.darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900" : __props.darkMode ? "bg-gray-800 text-gray-400 hover:bg-gray-700" : "bg-white text-gray-600 hover:bg-gray-50"
                        ]])
                      }, toDisplayString(cols), 11, _hoisted_9$3);
                    }), 64))
                  ], 2)
                ])
              ]),
              createBaseVNode("div", _hoisted_10$3, [
                createBaseVNode("div", _hoisted_11$3, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                  }, "间距", 2),
                  createBaseVNode("button", {
                    onClick: _cache[2] || (_cache[2] = (...args) => unref(resetMasonrySettings) && unref(resetMasonrySettings)(...args)),
                    disabled: unref(isDefaultSettings),
                    class: normalizeClass(["text-xs px-2 py-1 rounded transition-colors", [
                      unref(isDefaultSettings) ? __props.darkMode ? "text-gray-600 cursor-not-allowed" : "text-gray-400 cursor-not-allowed" : __props.darkMode ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                    ]]),
                    title: unref(isDefaultSettings) ? "已是默认设置" : "重置为默认"
                  }, " 重置 ", 10, _hoisted_12$3)
                ]),
                createBaseVNode("div", _hoisted_13$3, [
                  createBaseVNode("div", _hoisted_14$3, [
                    createBaseVNode("div", _hoisted_15$3, [
                      createBaseVNode("label", {
                        class: normalizeClass(["text-xs font-medium", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                      }, "水平间距（列间距）", 2),
                      createBaseVNode("span", {
                        class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                      }, toDisplayString(unref(horizontalGap)) + "px", 3)
                    ]),
                    createBaseVNode("div", _hoisted_16$3, [
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(horizontalGap) ? horizontalGap.value = $event : null),
                        type: "range",
                        min: "0",
                        max: "48",
                        step: "2",
                        class: normalizeClass(["w-full h-2 rounded-lg appearance-none cursor-pointer spacing-slider horizontal-slider", __props.darkMode ? "bg-gray-700" : "bg-gray-200"])
                      }, null, 2), [
                        [
                          vModelText,
                          unref(horizontalGap),
                          void 0,
                          { number: true }
                        ]
                      ]),
                      createBaseVNode("div", {
                        class: normalizeClass(["flex justify-between text-xs mt-1", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                      }, _cache[7] || (_cache[7] = [
                        createBaseVNode("span", null, "紧凑", -1),
                        createBaseVNode("span", null, "宽松", -1)
                      ]), 2)
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_17$3, [
                    createBaseVNode("div", _hoisted_18$3, [
                      createBaseVNode("label", {
                        class: normalizeClass(["text-xs font-medium", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                      }, "垂直间距（行间距）", 2),
                      createBaseVNode("span", {
                        class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                      }, toDisplayString(unref(verticalGap)) + "px", 3)
                    ]),
                    createBaseVNode("div", _hoisted_19$3, [
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => isRef(verticalGap) ? verticalGap.value = $event : null),
                        type: "range",
                        min: "0",
                        max: "48",
                        step: "2",
                        class: normalizeClass(["w-full h-2 rounded-lg appearance-none cursor-pointer spacing-slider vertical-slider", __props.darkMode ? "bg-gray-700" : "bg-gray-200"])
                      }, null, 2), [
                        [
                          vModelText,
                          unref(verticalGap),
                          void 0,
                          { number: true }
                        ]
                      ]),
                      createBaseVNode("div", {
                        class: normalizeClass(["flex justify-between text-xs mt-1", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                      }, _cache[8] || (_cache[8] = [
                        createBaseVNode("span", null, "紧凑", -1),
                        createBaseVNode("span", null, "宽松", -1)
                      ]), 2)
                    ])
                  ])
                ])
              ])
            ])
          ], 2)) : createCommentVNode("", true)
        ], 2),
        __props.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["flex justify-center items-center py-12", __props.darkMode ? "text-gray-300" : "text-gray-500"])
        }, [
          createVNode(unref(IconRefresh), { class: "animate-spin h-8 w-8 text-primary-500 mr-3" }),
          _cache[9] || (_cache[9] = createBaseVNode("span", { class: "text-lg" }, "加载中...", -1))
        ], 2)) : __props.pastes.length === 0 ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["flex flex-col items-center justify-center py-16", __props.darkMode ? "text-gray-400" : "text-gray-500"])
        }, [
          createVNode(unref(IconArchive), { class: "h-16 w-16 mb-4 opacity-50" }),
          _cache[10] || (_cache[10] = createBaseVNode("p", { class: "text-lg font-medium" }, "暂无文本分享数据", -1)),
          _cache[11] || (_cache[11] = createBaseVNode("p", { class: "text-sm mt-2" }, "创建第一个文本分享来开始使用瀑布流视图", -1))
        ], 2)) : (openBlock(), createBlock(unref(src_default), {
          key: 2,
          items: __props.pastes,
          "column-width": unref(columnWidth),
          gap: unref(baseGap),
          "min-columns": unref(minColumns),
          "max-columns": unref(maxColumns),
          "ssr-columns": 1,
          class: "paste-masonry-wall"
        }, {
          default: withCtx(({ item }) => [
            (openBlock(), createBlock(PasteMasonryCard, {
              key: item.id,
              "dark-mode": __props.darkMode,
              paste: item,
              onClick: ($event) => handleCardClick(item),
              onPreview: ($event) => emit("preview", item),
              onEdit: ($event) => emit("edit", item),
              onDelete: ($event) => emit("delete", item.id),
              onCopyLink: ($event) => emit("copy-link", item.slug),
              onCopyRawLink: ($event) => emit("copy-raw-link", item.slug),
              onShowQrcode: ($event) => emit("show-qrcode", item.slug),
              onQuickEditContent: _cache[5] || (_cache[5] = ($event) => emit("quick-edit-content", $event))
            }, null, 8, ["dark-mode", "paste", "onClick", "onPreview", "onEdit", "onDelete", "onCopyLink", "onCopyRawLink", "onShowQrcode"]))
          ]),
          _: 1
        }, 8, ["items", "column-width", "gap", "min-columns", "max-columns"]))
      ]);
    };
  }
};
const PasteMasonryView = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-961a6ef9"]]);
const _hoisted_1$2 = {
  key: 0,
  class: "fixed inset-0 z-[60] overflow-y-auto",
  "aria-labelledby": "modal-title",
  role: "dialog",
  "aria-modal": "true"
};
const _hoisted_2$2 = { class: "flex items-center sm:items-center justify-center min-h-screen pt-20 sm:pt-2 px-2 sm:px-4 pb-4 sm:pb-20 text-center sm:p-0" };
const _hoisted_3$2 = { class: "bg-white dark:bg-gray-800 px-3 py-2 sm:px-4 sm:py-3 border-b dark:border-gray-700 flex justify-between items-center" };
const _hoisted_4$2 = {
  class: "bg-white dark:bg-gray-800 px-2 sm:px-4 py-2 sm:py-4 overflow-y-auto",
  style: { "max-height": "calc(85vh - 120px)", "min-height": "200px" }
};
const _hoisted_5$2 = { class: "flex flex-col space-y-2 sm:space-y-4 w-full" };
const _hoisted_6$2 = { class: "grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 bg-gray-50 dark:bg-gray-700 p-2 sm:p-4 rounded-lg text-sm" };
const _hoisted_7$2 = ["title"];
const _hoisted_8$2 = { class: "hidden sm:block" };
const _hoisted_9$2 = { class: "font-medium text-gray-900 dark:text-gray-100 truncate" };
const _hoisted_10$2 = { class: "flex items-center space-x-2" };
const _hoisted_11$2 = { class: "font-medium text-primary-600 dark:text-primary-400 truncate" };
const _hoisted_12$2 = {
  key: 0,
  class: "absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-green-500 rounded whitespace-nowrap"
};
const _hoisted_13$2 = { class: "font-medium text-gray-900 dark:text-gray-100" };
const _hoisted_14$2 = { class: "col-span-1 sm:col-span-2" };
const _hoisted_15$2 = { class: "col-span-1 sm:col-span-2" };
const _hoisted_16$2 = { class: "flex flex-wrap items-center gap-2" };
const _hoisted_17$2 = {
  key: 0,
  class: "col-span-1 sm:col-span-2"
};
const _hoisted_18$2 = { class: "mt-1 sm:mt-2" };
const _hoisted_19$2 = { class: "bg-gray-50 dark:bg-gray-700 p-2 sm:p-4 rounded-lg max-h-48 sm:max-h-64 overflow-y-auto" };
const _hoisted_20$1 = { class: "text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words text-xs sm:text-sm" };
const _hoisted_21$1 = { class: "bg-gray-50 dark:bg-gray-700 px-3 py-2 sm:px-6 sm:py-3 flex flex-col sm:flex-row-reverse sm:space-x-reverse space-y-2 sm:space-y-0 sm:space-x-3" };
const _sfc_main$2 = {
  __name: "PastePreviewModal",
  props: {
    darkMode: {
      type: Boolean,
      required: true
    },
    showPreview: {
      type: Boolean,
      required: true
    },
    paste: {
      type: Object,
      default: null
    },
    copiedTexts: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["close", "view-paste", "copy-link"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const formatDate = (dateString) => {
      return formatDateTime(dateString);
    };
    const formatExpiry$1 = (expiryDate) => {
      return formatExpiry(expiryDate);
    };
    const hasPassword = (paste) => {
      return paste?.has_password;
    };
    const getRemainingViews$1 = (paste) => {
      return getRemainingViews(paste);
    };
    const getRemainingViewsLabel = (paste) => {
      const remaining = getRemainingViews$1(paste);
      if (remaining === Infinity) {
        return "无限制";
      }
      if (remaining === 0) {
        return "已用完";
      }
      return `${remaining}`;
    };
    const isExpired2 = (paste) => {
      if (!paste?.expires_at) return false;
      const expiryDate = new Date(paste.expires_at);
      const now = /* @__PURE__ */ new Date();
      return expiryDate < now;
    };
    const closePreview = () => {
      emit("close");
    };
    const viewPaste = (slug) => {
      emit("view-paste", slug);
    };
    return (_ctx, _cache) => {
      return __props.showPreview ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("div", {
            class: "fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity",
            "aria-hidden": "true",
            onClick: closePreview
          }),
          _cache[16] || (_cache[16] = createBaseVNode("span", {
            class: "hidden sm:inline-block sm:align-middle sm:h-screen",
            "aria-hidden": "true"
          }, "​", -1)),
          createBaseVNode("div", {
            class: normalizeClass(["inline-block align-middle sm:align-middle bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-w-sm sm:max-w-2xl lg:max-w-3xl max-h-[85vh] sm:max-h-[85vh] my-1 sm:my-8", __props.darkMode ? "dark" : ""])
          }, [
            createBaseVNode("div", _hoisted_3$2, [
              _cache[3] || (_cache[3] = createBaseVNode("h3", {
                class: "text-base sm:text-lg leading-6 font-medium text-gray-900 dark:text-gray-100",
                id: "modal-title"
              }, "内容预览", -1)),
              createBaseVNode("button", {
                type: "button",
                onClick: closePreview,
                class: "rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
              }, [
                _cache[2] || (_cache[2] = createBaseVNode("span", { class: "sr-only" }, "关闭", -1)),
                createVNode(unref(IconClose), { class: "h-4 w-4 sm:h-5 sm:w-5" })
              ])
            ]),
            createBaseVNode("div", _hoisted_4$2, [
              createBaseVNode("div", _hoisted_5$2, [
                createBaseVNode("div", _hoisted_6$2, [
                  createBaseVNode("div", null, [
                    _cache[4] || (_cache[4] = createBaseVNode("p", { class: "text-xs sm:text-sm text-gray-500 dark:text-gray-400" }, "标题:", -1)),
                    createBaseVNode("p", {
                      class: "font-medium text-gray-900 dark:text-gray-100 truncate",
                      title: __props.paste?.title || "未设置"
                    }, toDisplayString(__props.paste?.title || "未设置"), 9, _hoisted_7$2)
                  ]),
                  createBaseVNode("div", _hoisted_8$2, [
                    _cache[5] || (_cache[5] = createBaseVNode("p", { class: "text-xs sm:text-sm text-gray-500 dark:text-gray-400" }, "ID:", -1)),
                    createBaseVNode("p", _hoisted_9$2, toDisplayString(__props.paste?.id), 1)
                  ]),
                  createBaseVNode("div", null, [
                    _cache[6] || (_cache[6] = createBaseVNode("p", { class: "text-xs sm:text-sm text-gray-500 dark:text-gray-400" }, "链接后缀:", -1)),
                    createBaseVNode("div", _hoisted_10$2, [
                      createBaseVNode("p", _hoisted_11$2, toDisplayString(__props.paste?.slug), 1),
                      createBaseVNode("button", {
                        onClick: _cache[0] || (_cache[0] = ($event) => emit("copy-link", __props.paste?.slug)),
                        class: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex-shrink-0 relative"
                      }, [
                        createVNode(unref(IconCopy), { class: "h-4 w-4" }),
                        props.copiedTexts[__props.paste?.id] ? (openBlock(), createElementBlock("span", _hoisted_12$2, " 已复制 ")) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    _cache[7] || (_cache[7] = createBaseVNode("p", { class: "text-xs sm:text-sm text-gray-500 dark:text-gray-400" }, "创建时间:", -1)),
                    createBaseVNode("p", _hoisted_13$2, toDisplayString(formatDate(__props.paste?.created_at)), 1)
                  ]),
                  createBaseVNode("div", _hoisted_14$2, [
                    _cache[8] || (_cache[8] = createBaseVNode("p", { class: "text-xs sm:text-sm text-gray-500 dark:text-gray-400" }, "过期时间:", -1)),
                    createBaseVNode("p", {
                      class: normalizeClass(["font-medium", [isExpired2(__props.paste) ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-gray-100"]])
                    }, toDisplayString(formatExpiry$1(__props.paste?.expires_at)), 3)
                  ]),
                  createBaseVNode("div", _hoisted_15$2, [
                    _cache[13] || (_cache[13] = createBaseVNode("p", { class: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1.5" }, "状态:", -1)),
                    createBaseVNode("div", _hoisted_16$2, [
                      __props.paste && hasPassword(__props.paste) ? (openBlock(), createElementBlock("span", {
                        key: 0,
                        class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", [
                          isExpired2(__props.paste) ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                        ]])
                      }, [
                        createVNode(unref(IconLockClosed), { class: "h-3 w-3 mr-1" }),
                        _cache[9] || (_cache[9] = createTextVNode(" 已加密 ", -1))
                      ], 2)) : (openBlock(), createElementBlock("span", {
                        key: 1,
                        class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", [isExpired2(__props.paste) ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"]])
                      }, [
                        createVNode(unref(IconLockClosed), { class: "h-3 w-3 mr-1" }),
                        _cache[10] || (_cache[10] = createTextVNode(" 未加密 ", -1))
                      ], 2)),
                      __props.paste?.is_public ? (openBlock(), createElementBlock("span", {
                        key: 2,
                        class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", [isExpired2(__props.paste) ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"]])
                      }, [
                        createVNode(unref(IconGlobeAlt), { class: "h-3 w-3 mr-1" }),
                        _cache[11] || (_cache[11] = createTextVNode(" 公开 ", -1))
                      ], 2)) : (openBlock(), createElementBlock("span", {
                        key: 3,
                        class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", [isExpired2(__props.paste) ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"]])
                      }, [
                        createVNode(unref(IconEyeOff), { class: "h-3 w-3 mr-1" }),
                        _cache[12] || (_cache[12] = createTextVNode(" 私密 ", -1))
                      ], 2)),
                      createBaseVNode("span", {
                        class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", [
                          isExpired2(__props.paste) ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : getRemainingViews$1(__props.paste) === 0 ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : __props.paste?.max_views && getRemainingViews$1(__props.paste) !== Infinity && getRemainingViews$1(__props.paste) < 10 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        ]])
                      }, [
                        createVNode(unref(IconEye), { class: "h-3 w-3 mr-1" }),
                        createTextVNode(" " + toDisplayString(__props.paste ? getRemainingViewsLabel(__props.paste) : "-"), 1)
                      ], 2)
                    ])
                  ]),
                  __props.paste?.remark ? (openBlock(), createElementBlock("div", _hoisted_17$2, [
                    _cache[14] || (_cache[14] = createBaseVNode("p", { class: "text-xs sm:text-sm text-gray-500 dark:text-gray-400" }, "备注:", -1)),
                    createBaseVNode("p", {
                      class: normalizeClass(["font-medium whitespace-pre-wrap break-words text-sm", [isExpired2(__props.paste) ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-gray-100"]])
                    }, toDisplayString(__props.paste.remark), 3)
                  ])) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_18$2, [
                  _cache[15] || (_cache[15] = createBaseVNode("p", { class: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1 sm:mb-2" }, "内容:", -1)),
                  createBaseVNode("div", _hoisted_19$2, [
                    createBaseVNode("pre", _hoisted_20$1, toDisplayString(__props.paste?.content), 1)
                  ])
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_21$1, [
              createBaseVNode("button", {
                type: "button",
                class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 py-1.5 sm:px-4 sm:py-2 bg-primary-600 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:w-auto",
                onClick: _cache[1] || (_cache[1] = ($event) => viewPaste(__props.paste?.slug))
              }, " 查看链接 "),
              createBaseVNode("button", {
                type: "button",
                class: "w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-3 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:w-auto",
                onClick: closePreview
              }, " 关闭 ")
            ])
          ], 2)
        ])
      ])) : createCommentVNode("", true);
    };
  }
};
const _hoisted_1$1 = {
  key: 0,
  class: "fixed inset-0 z-[60] overflow-y-auto",
  "aria-labelledby": "edit-modal-title",
  role: "dialog",
  "aria-modal": "true"
};
const _hoisted_2$1 = { class: "flex items-center justify-center min-h-screen pt-20 sm:pt-2 px-2 sm:px-4 pb-4 sm:pb-20 text-center sm:p-0" };
const _hoisted_3$1 = { class: "bg-white dark:bg-gray-800 px-4 py-3 sm:py-4 border-b dark:border-gray-700 flex justify-between items-center" };
const _hoisted_4$1 = {
  class: "bg-white dark:bg-gray-800 px-3 sm:px-4 py-3 sm:py-4 overflow-y-auto",
  style: { "max-height": "calc(95vh - 160px)", "min-height": "200px" }
};
const _hoisted_5$1 = { class: "mb-4 text-left" };
const _hoisted_6$1 = { class: "mb-4" };
const _hoisted_7$1 = { class: "flex items-center" };
const _hoisted_8$1 = { class: "mt-1 text-xs text-gray-500 dark:text-gray-400" };
const _hoisted_9$1 = { class: "mb-4" };
const _hoisted_10$1 = { class: "mb-4" };
const _hoisted_11$1 = { class: "mb-4" };
const _hoisted_12$1 = { class: "mb-4" };
const _hoisted_13$1 = { class: "flex items-center" };
const _hoisted_14$1 = { class: "mb-4" };
const _hoisted_15$1 = ["disabled"];
const _hoisted_16$1 = { class: "mt-2 flex items-center" };
const _hoisted_17$1 = ["disabled"];
const _hoisted_18$1 = {
  key: 0,
  class: "mt-1 text-xs text-yellow-500"
};
const _hoisted_19$1 = {
  key: 1,
  class: "mt-1 text-xs text-red-500"
};
const _sfc_main$1 = {
  __name: "PasteEditModal",
  props: {
    darkMode: {
      type: Boolean,
      required: true
    },
    showEdit: {
      type: Boolean,
      required: true
    },
    paste: {
      type: Object,
      default: null
    }
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const editForm = reactive({
      title: "",
      // 标题
      remark: "",
      // 备注信息
      password: "",
      // 不回显密码，如果填写则更新密码
      clearPassword: false,
      // 是否清除密码的标记
      expiry_time: "0",
      // 过期时间（小时），0表示永不过期
      max_views: 0,
      // 最大查看次数，0表示无限制
      slug: "",
      // 链接后缀，为空则系统自动生成
      is_public: true
      // 是否公开访问
    });
    watch(
      () => props.paste,
      (newPaste) => {
        if (!newPaste) return;
        editForm.title = newPaste.title || "";
        editForm.remark = newPaste.remark || "";
        editForm.password = "";
        editForm.clearPassword = false;
        editForm.slug = newPaste.slug || "";
        if (newPaste.expires_at) {
          const expiryDate = new Date(newPaste.expires_at);
          const now = /* @__PURE__ */ new Date();
          const diffHours = Math.round((expiryDate - now) / (1e3 * 60 * 60));
          if (diffHours <= 1) {
            editForm.expiry_time = "1";
          } else if (diffHours <= 24) {
            editForm.expiry_time = "24";
          } else if (diffHours <= 168) {
            editForm.expiry_time = "168";
          } else if (diffHours <= 720) {
            editForm.expiry_time = "720";
          } else {
            editForm.expiry_time = "0";
          }
        } else {
          editForm.expiry_time = "0";
        }
        editForm.max_views = newPaste.max_views || 0;
        editForm.is_public = Boolean(newPaste.is_public);
      },
      { immediate: true }
    );
    const validateMaxViews = (event) => {
      const value = event.target.value;
      if (value < 0) {
        editForm.max_views = 0;
        return;
      }
      if (value.toString().includes(".")) {
        editForm.max_views = parseInt(value);
      }
      if (isNaN(value) || value === "") {
        editForm.max_views = 0;
      } else {
        editForm.max_views = parseInt(value);
      }
    };
    const closeEditModal = () => {
      emit("close");
    };
    const saveEdit = () => {
      if (editForm.max_views < 0) {
        emit("save", { error: "可打开次数不能为负数" });
        return;
      }
      const updateData = {
        id: props.paste?.id,
        // 添加ID
        slug: props.paste?.slug,
        // 当前slug（用于API请求路径）
        content: props.paste?.content,
        // 使用原内容
        title: editForm.title || null,
        remark: editForm.remark || null,
        max_views: editForm.max_views === 0 ? null : parseInt(editForm.max_views),
        is_public: editForm.is_public
      };
      if (editForm.slug !== props.paste?.slug) {
        updateData.newSlug = editForm.slug || null;
      }
      if (editForm.password) {
        updateData.password = editForm.password;
      } else if (editForm.clearPassword) {
        updateData.clearPassword = true;
      }
      if (editForm.expiry_time !== "0") {
        const hours = parseInt(editForm.expiry_time);
        const expiresAt = /* @__PURE__ */ new Date();
        expiresAt.setHours(expiresAt.getHours() + hours);
        updateData.expires_at = expiresAt.toISOString();
      } else {
        updateData.expires_at = null;
      }
      emit("save", updateData);
    };
    return (_ctx, _cache) => {
      return __props.showEdit ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("div", {
            class: "fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity",
            "aria-hidden": "true",
            onClick: closeEditModal
          }),
          _cache[22] || (_cache[22] = createBaseVNode("span", {
            class: "hidden sm:inline-block sm:align-middle sm:h-screen",
            "aria-hidden": "true"
          }, "​", -1)),
          createBaseVNode("div", {
            class: normalizeClass(["inline-block align-middle sm:align-middle bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-w-sm sm:max-w-lg max-h-[95vh] sm:max-h-[85vh] my-1 sm:my-8", __props.darkMode ? "dark" : ""])
          }, [
            createBaseVNode("div", _hoisted_3$1, [
              _cache[9] || (_cache[9] = createBaseVNode("h3", {
                class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-100",
                id: "edit-modal-title"
              }, "修改文本分享属性", -1)),
              createBaseVNode("button", {
                type: "button",
                onClick: closeEditModal,
                class: "rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
              }, [
                _cache[8] || (_cache[8] = createBaseVNode("span", { class: "sr-only" }, "关闭", -1)),
                createVNode(unref(IconClose), { class: "h-5 w-5" })
              ])
            ]),
            createBaseVNode("div", _hoisted_4$1, [
              createBaseVNode("form", {
                onSubmit: withModifiers(saveEdit, ["prevent"]),
                class: "space-y-4"
              }, [
                createBaseVNode("div", _hoisted_5$1, [
                  _cache[10] || (_cache[10] = createBaseVNode("label", {
                    for: "title",
                    class: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                  }, "标题", -1)),
                  withDirectives(createBaseVNode("input", {
                    id: "title",
                    type: "text",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => editForm.title = $event),
                    class: normalizeClass(["mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"]),
                    placeholder: "为文本分享添加一个标题（可选）"
                  }, null, 2), [
                    [vModelText, editForm.title]
                  ])
                ]),
                createBaseVNode("div", _hoisted_6$1, [
                  _cache[12] || (_cache[12] = createBaseVNode("label", { class: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" }, "链接后缀", -1)),
                  createBaseVNode("div", _hoisted_7$1, [
                    _cache[11] || (_cache[11] = createBaseVNode("span", { class: "text-sm mr-1 text-gray-600 dark:text-gray-400" }, "/paste/", -1)),
                    withDirectives(createBaseVNode("input", {
                      type: "text",
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => editForm.slug = $event),
                      class: normalizeClass(["w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"]),
                      placeholder: "留空则自动生成"
                    }, null, 2), [
                      [vModelText, editForm.slug]
                    ])
                  ]),
                  createBaseVNode("p", _hoisted_8$1, "当前链接：" + toDisplayString(props.paste?.slug) + "，留空则自动生成新链接", 1)
                ]),
                createBaseVNode("div", _hoisted_9$1, [
                  _cache[13] || (_cache[13] = createBaseVNode("label", { class: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" }, "备注信息", -1)),
                  withDirectives(createBaseVNode("textarea", {
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => editForm.remark = $event),
                    rows: "2",
                    class: normalizeClass(["w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"]),
                    placeholder: "添加备注信息..."
                  }, null, 2), [
                    [vModelText, editForm.remark]
                  ])
                ]),
                createBaseVNode("div", _hoisted_10$1, [
                  _cache[14] || (_cache[14] = createBaseVNode("label", { class: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" }, "可打开次数", -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "number",
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => editForm.max_views = $event),
                    min: "0",
                    step: "1",
                    class: normalizeClass(["w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"]),
                    placeholder: "0表示无限制",
                    onInput: validateMaxViews
                  }, null, 34), [
                    [
                      vModelText,
                      editForm.max_views,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  _cache[15] || (_cache[15] = createBaseVNode("p", { class: "mt-1 text-xs text-gray-500 dark:text-gray-400" }, "0表示无限制", -1))
                ]),
                createBaseVNode("div", _hoisted_11$1, [
                  _cache[17] || (_cache[17] = createBaseVNode("label", { class: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" }, "过期时间", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => editForm.expiry_time = $event),
                    class: normalizeClass(["w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"])
                  }, _cache[16] || (_cache[16] = [
                    createStaticVNode('<option value="1">1小时</option><option value="24">1天</option><option value="168">7天</option><option value="720">30天</option><option value="0">永不过期</option>', 5)
                  ]), 2), [
                    [vModelSelect, editForm.expiry_time]
                  ])
                ]),
                createBaseVNode("div", _hoisted_12$1, [
                  _cache[19] || (_cache[19] = createBaseVNode("label", { class: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" }, "访问可见性", -1)),
                  createBaseVNode("div", _hoisted_13$1, [
                    withDirectives(createBaseVNode("input", {
                      id: "is_public",
                      type: "checkbox",
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => editForm.is_public = $event),
                      class: "h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:border-primary-500 cursor-pointer"
                    }, null, 512), [
                      [vModelCheckbox, editForm.is_public]
                    ]),
                    _cache[18] || (_cache[18] = createBaseVNode("label", {
                      for: "is_public",
                      class: "ml-2 text-sm text-gray-700 dark:text-gray-300"
                    }, " 公开访问（关闭时仅管理员和创建者可访问） ", -1))
                  ])
                ]),
                createBaseVNode("div", _hoisted_14$1, [
                  _cache[21] || (_cache[21] = createBaseVNode("label", { class: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" }, "密码保护", -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "password",
                    autocomplete: "new-password",
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => editForm.password = $event),
                    class: normalizeClass(["w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"]),
                    placeholder: "留空则不修改密码",
                    disabled: editForm.clearPassword
                  }, null, 10, _hoisted_15$1), [
                    [vModelText, editForm.password]
                  ]),
                  createBaseVNode("div", _hoisted_16$1, [
                    withDirectives(createBaseVNode("input", {
                      type: "checkbox",
                      id: "clearPassword",
                      "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => editForm.clearPassword = $event),
                      class: "h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:border-primary-500 cursor-pointer",
                      disabled: editForm.password.length > 0
                    }, null, 8, _hoisted_17$1), [
                      [vModelCheckbox, editForm.clearPassword]
                    ]),
                    _cache[20] || (_cache[20] = createBaseVNode("label", {
                      for: "clearPassword",
                      class: "ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    }, " 清除密码保护 ", -1))
                  ]),
                  props.paste?.has_password && !editForm.password && !editForm.clearPassword ? (openBlock(), createElementBlock("p", _hoisted_18$1, "留空将保持原密码不变")) : createCommentVNode("", true),
                  editForm.clearPassword ? (openBlock(), createElementBlock("p", _hoisted_19$1, "警告：勾选此项将移除密码保护")) : createCommentVNode("", true)
                ])
              ], 32)
            ]),
            createBaseVNode("div", { class: "bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse sm:space-x-reverse space-y-2 sm:space-y-0 sm:space-x-3" }, [
              createBaseVNode("button", {
                type: "button",
                class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:w-auto sm:text-sm",
                onClick: saveEdit
              }, " 保存修改 "),
              createBaseVNode("button", {
                type: "button",
                class: "w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:w-auto sm:text-sm",
                onClick: closeEditModal
              }, " 取消 ")
            ])
          ], 2)
        ])
      ])) : createCommentVNode("", true);
    };
  }
};
const _hoisted_1 = { class: "p-3 sm:p-4 md:p-5 lg:p-6 flex-1 flex flex-col overflow-y-auto" };
const _hoisted_2 = { class: "flex flex-col space-y-3 mb-4" };
const _hoisted_3 = { class: "flex justify-between items-center" };
const _hoisted_4 = { class: "flex items-center space-x-2" };
const _hoisted_5 = ["disabled"];
const _hoisted_6 = { class: "hidden xs:inline" };
const _hoisted_7 = { class: "xs:hidden" };
const _hoisted_8 = { class: "w-full" };
const _hoisted_9 = { class: "flex flex-wrap gap-1 sm:gap-2" };
const _hoisted_10 = ["disabled"];
const _hoisted_11 = { class: "hidden xs:inline" };
const _hoisted_12 = { class: "xs:hidden" };
const _hoisted_13 = {
  key: 0,
  class: "flex justify-between items-center mb-2 sm:mb-3"
};
const _hoisted_14 = { class: "text-xs sm:text-sm text-gray-500 dark:text-gray-400" };
const _hoisted_15 = { class: "inline-flex items-center" };
const _hoisted_16 = { class: "overflow-visible bg-white dark:bg-gray-800 shadow-md rounded-lg flex-1" };
const _hoisted_17 = { class: "flex flex-col h-full" };
const _hoisted_18 = {
  key: 0,
  class: "hidden md:block flex-1 overflow-auto"
};
const _hoisted_19 = {
  key: 1,
  class: "hidden md:block flex-1 overflow-visible"
};
const _hoisted_20 = {
  key: 2,
  class: "md:hidden flex-1 overflow-auto"
};
const _hoisted_21 = {
  key: 3,
  class: "md:hidden flex-1 overflow-visible"
};
const _hoisted_22 = { class: "mt-2 mb-4 sm:mt-4 sm:mb-0" };
const _sfc_main = {
  __name: "TextManagementView",
  setup(__props) {
    const { isDarkMode: darkMode } = useThemeMode();
    const { t } = useI18n();
    useCreatorBadge();
    const { dialogState, confirm, handleConfirm, handleCancel } = useConfirmDialog();
    const confirmFn = createConfirmFn(confirm, {
      t,
      darkMode,
      getConfirmText: ({ confirmType }) => confirmType === "warning" ? t("common.dialogs.cleanupButton") : t("common.dialogs.deleteButton")
    });
    const {
      // 状态
      loading,
      selectedItems: selectedPastes,
      lastRefreshTime,
      pagination,
      pageSizeOptions,
      pastes,
      previewPaste,
      editingPaste,
      showPreview,
      showEdit,
      showQRCodeModal,
      qrCodeDataURL,
      qrCodeSlug,
      copiedTexts,
      copiedRawTexts,
      // 视图模式
      viewMode,
      // 方法
      loadPastes,
      refreshPastes,
      searchQuery,
      isSearchMode,
      searchLoading,
      handleGlobalSearch,
      clearSearch,
      handleOffsetChangeWithSearch,
      handlePageSizeChange,
      deletePaste,
      batchDeletePastes,
      clearExpiredPastes,
      openPreview,
      closePreview,
      openEditModal,
      closeEditModal,
      submitEdit,
      copyLink,
      copyRawLink,
      quickEditContent,
      goToViewPage,
      showQRCode,
      toggleSelectItem,
      toggleSelectAll,
      toggleVisibility
    } = usePasteManagement({ confirmFn });
    const deleteSelectedPastes = batchDeletePastes;
    const viewModeOptions = [
      { value: "table", icon: "table", title: "表格视图" },
      { value: "masonry", icon: "masonry", title: "瀑布流视图" }
    ];
    onMounted(() => {
      loadPastes();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("h2", {
              class: normalizeClass(["text-lg sm:text-xl font-medium", unref(darkMode) ? "text-white" : "text-gray-900"])
            }, "文本管理", 2),
            createBaseVNode("div", _hoisted_4, [
              createVNode(_sfc_main$8, {
                modelValue: unref(viewMode),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(viewMode) ? viewMode.value = $event : null),
                options: viewModeOptions,
                "dark-mode": unref(darkMode),
                size: "sm",
                class: "md:hidden"
              }, null, 8, ["modelValue", "dark-mode"]),
              createVNode(_sfc_main$8, {
                modelValue: unref(viewMode),
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(viewMode) ? viewMode.value = $event : null),
                options: viewModeOptions,
                "dark-mode": unref(darkMode),
                size: "md",
                class: "hidden md:inline-flex"
              }, null, 8, ["modelValue", "dark-mode"]),
              createBaseVNode("button", {
                class: "inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
                onClick: _cache[2] || (_cache[2] = (...args) => unref(refreshPastes) && unref(refreshPastes)(...args)),
                disabled: unref(loading) || unref(searchLoading)
              }, [
                createVNode(unref(IconRefresh), {
                  class: normalizeClass(["h-3 w-3 sm:h-4 sm:w-4 mr-1", unref(loading) || unref(searchLoading) ? "animate-spin" : ""])
                }, null, 8, ["class"]),
                createBaseVNode("span", _hoisted_6, toDisplayString(unref(loading) || unref(searchLoading) ? "刷新中..." : "刷新"), 1),
                createBaseVNode("span", _hoisted_7, toDisplayString(unref(loading) || unref(searchLoading) ? "..." : "刷"), 1)
              ], 8, _hoisted_5)
            ])
          ]),
          createBaseVNode("div", _hoisted_8, [
            createVNode(_sfc_main$9, {
              modelValue: unref(searchQuery),
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(searchQuery) ? searchQuery.value = $event : null),
              placeholder: "搜索文本分享（支持链接、备注、内容）",
              "show-hint": true,
              "search-hint": "服务端搜索，支持模糊匹配",
              size: "md",
              "debounce-ms": 300,
              onSearch: unref(handleGlobalSearch),
              onClear: unref(clearSearch)
            }, null, 8, ["modelValue", "onSearch", "onClear"])
          ]),
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("button", {
              class: "inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 flex-grow sm:flex-grow-0",
              onClick: _cache[4] || (_cache[4] = (...args) => unref(clearExpiredPastes) && unref(clearExpiredPastes)(...args)),
              title: "系统会自动删除过期内容，但您也可以通过此功能手动立即清理"
            }, [
              createVNode(unref(IconDelete), { class: "h-3 w-3 sm:h-4 sm:w-4 mr-1" }),
              _cache[7] || (_cache[7] = createBaseVNode("span", { class: "hidden xs:inline" }, "清理过期", -1)),
              _cache[8] || (_cache[8] = createBaseVNode("span", { class: "xs:hidden" }, "清理", -1))
            ]),
            createBaseVNode("button", {
              disabled: unref(selectedPastes).length === 0,
              class: normalizeClass([
                "inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 flex-grow sm:flex-grow-0",
                unref(selectedPastes).length === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500"
              ]),
              onClick: _cache[5] || (_cache[5] = (...args) => unref(deleteSelectedPastes) && unref(deleteSelectedPastes)(...args))
            }, [
              createVNode(unref(IconDelete), { class: "h-3 w-3 sm:h-4 sm:w-4 mr-1" }),
              createBaseVNode("span", _hoisted_11, "批量删除" + toDisplayString(unref(selectedPastes).length ? `(${unref(selectedPastes).length})` : ""), 1),
              createBaseVNode("span", _hoisted_12, "删除" + toDisplayString(unref(selectedPastes).length ? `(${unref(selectedPastes).length})` : ""), 1)
            ], 10, _hoisted_10)
          ])
        ]),
        unref(lastRefreshTime) ? (openBlock(), createElementBlock("div", _hoisted_13, [
          createBaseVNode("div", _hoisted_14, [
            createBaseVNode("span", _hoisted_15, [
              createVNode(unref(IconClock), { class: "h-3 w-3 sm:h-4 sm:w-4 mr-1" }),
              createTextVNode(" 上次刷新: " + toDisplayString(unref(lastRefreshTime)), 1)
            ])
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_16, [
          createBaseVNode("div", _hoisted_17, [
            unref(viewMode) === "table" ? (openBlock(), createElementBlock("div", _hoisted_18, [
              createVNode(_sfc_main$6, {
                "dark-mode": unref(darkMode),
                pastes: unref(pastes),
                selectedPastes: unref(selectedPastes),
                loading: unref(loading) || unref(searchLoading),
                copiedTexts: unref(copiedTexts),
                copiedRawTexts: unref(copiedRawTexts),
                onToggleSelectAll: unref(toggleSelectAll),
                onToggleSelectItem: unref(toggleSelectItem),
                onView: unref(goToViewPage),
                onCopyLink: unref(copyLink),
                onCopyRawLink: unref(copyRawLink),
                onPreview: unref(openPreview),
                onEdit: unref(openEditModal),
                onDelete: unref(deletePaste),
                onShowQrcode: unref(showQRCode),
                onToggleVisibility: unref(toggleVisibility)
              }, null, 8, ["dark-mode", "pastes", "selectedPastes", "loading", "copiedTexts", "copiedRawTexts", "onToggleSelectAll", "onToggleSelectItem", "onView", "onCopyLink", "onCopyRawLink", "onPreview", "onEdit", "onDelete", "onShowQrcode", "onToggleVisibility"])
            ])) : createCommentVNode("", true),
            unref(viewMode) === "masonry" ? (openBlock(), createElementBlock("div", _hoisted_19, [
              createVNode(PasteMasonryView, {
                "dark-mode": unref(darkMode),
                pastes: unref(pastes),
                selectedPastes: unref(selectedPastes),
                loading: unref(loading) || unref(searchLoading),
                copiedTexts: unref(copiedTexts),
                copiedRawTexts: unref(copiedRawTexts),
                onToggleSelectAll: unref(toggleSelectAll),
                onToggleSelectItem: unref(toggleSelectItem),
                onView: unref(goToViewPage),
                onCopyLink: unref(copyLink),
                onCopyRawLink: unref(copyRawLink),
                onPreview: unref(openPreview),
                onEdit: unref(openEditModal),
                onDelete: unref(deletePaste),
                onShowQrcode: unref(showQRCode),
                onQuickEditContent: unref(quickEditContent)
              }, null, 8, ["dark-mode", "pastes", "selectedPastes", "loading", "copiedTexts", "copiedRawTexts", "onToggleSelectAll", "onToggleSelectItem", "onView", "onCopyLink", "onCopyRawLink", "onPreview", "onEdit", "onDelete", "onShowQrcode", "onQuickEditContent"])
            ])) : createCommentVNode("", true),
            unref(viewMode) === "table" ? (openBlock(), createElementBlock("div", _hoisted_20, [
              createVNode(_sfc_main$5, {
                "dark-mode": unref(darkMode),
                pastes: unref(pastes),
                selectedPastes: unref(selectedPastes),
                loading: unref(loading),
                copiedTexts: unref(copiedTexts),
                copiedRawTexts: unref(copiedRawTexts),
                onToggleSelectItem: unref(toggleSelectItem),
                onView: unref(goToViewPage),
                onCopyLink: unref(copyLink),
                onCopyRawLink: unref(copyRawLink),
                onPreview: unref(openPreview),
                onEdit: unref(openEditModal),
                onDelete: unref(deletePaste),
                onShowQrcode: unref(showQRCode)
              }, null, 8, ["dark-mode", "pastes", "selectedPastes", "loading", "copiedTexts", "copiedRawTexts", "onToggleSelectItem", "onView", "onCopyLink", "onCopyRawLink", "onPreview", "onEdit", "onDelete", "onShowQrcode"])
            ])) : createCommentVNode("", true),
            unref(viewMode) === "masonry" ? (openBlock(), createElementBlock("div", _hoisted_21, [
              createVNode(PasteMasonryView, {
                "dark-mode": unref(darkMode),
                pastes: unref(pastes),
                selectedPastes: unref(selectedPastes),
                loading: unref(loading) || unref(searchLoading),
                copiedTexts: unref(copiedTexts),
                copiedRawTexts: unref(copiedRawTexts),
                onToggleSelectAll: unref(toggleSelectAll),
                onToggleSelectItem: unref(toggleSelectItem),
                onView: unref(goToViewPage),
                onCopyLink: unref(copyLink),
                onCopyRawLink: unref(copyRawLink),
                onPreview: unref(openPreview),
                onEdit: unref(openEditModal),
                onDelete: unref(deletePaste),
                onShowQrcode: unref(showQRCode),
                onQuickEditContent: unref(quickEditContent)
              }, null, 8, ["dark-mode", "pastes", "selectedPastes", "loading", "copiedTexts", "copiedRawTexts", "onToggleSelectAll", "onToggleSelectItem", "onView", "onCopyLink", "onCopyRawLink", "onPreview", "onEdit", "onDelete", "onShowQrcode", "onQuickEditContent"])
            ])) : createCommentVNode("", true)
          ])
        ]),
        createBaseVNode("div", _hoisted_22, [
          createVNode(_sfc_main$a, {
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
        createVNode(_sfc_main$2, {
          "dark-mode": unref(darkMode),
          "show-preview": unref(showPreview),
          paste: unref(previewPaste),
          "copied-texts": unref(copiedTexts),
          onClose: unref(closePreview),
          onViewPaste: unref(goToViewPage),
          onCopyLink: unref(copyLink)
        }, null, 8, ["dark-mode", "show-preview", "paste", "copied-texts", "onClose", "onViewPaste", "onCopyLink"]),
        createVNode(_sfc_main$1, {
          "dark-mode": unref(darkMode),
          "show-edit": unref(showEdit),
          paste: unref(editingPaste),
          onClose: unref(closeEditModal),
          onSave: unref(submitEdit)
        }, null, 8, ["dark-mode", "show-edit", "paste", "onClose", "onSave"]),
        unref(showQRCodeModal) ? (openBlock(), createBlock(_sfc_main$b, {
          key: 1,
          "qr-code-url": unref(qrCodeDataURL),
          "file-slug": unref(qrCodeSlug),
          "dark-mode": unref(darkMode),
          onClose: _cache[6] || (_cache[6] = ($event) => showQRCodeModal.value = false)
        }, null, 8, ["qr-code-url", "file-slug", "dark-mode"])) : createCommentVNode("", true),
        createVNode(_sfc_main$c, mergeProps(unref(dialogState), {
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
