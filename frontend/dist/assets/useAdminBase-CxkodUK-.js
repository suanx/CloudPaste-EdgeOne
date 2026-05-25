import { c as createLogger, Y as useGlobalMessage, i as useLocalStorage, g as ref, r as reactive, Z as useTimeoutFn, $ as useWindowSize, w as watch } from "./index-BQxzU9F1.js";
import { f as formatCurrentTime } from "./timeUtils-D81jJILb.js";
const log = createLogger("AdminBase");
function useAdminBase(pageKey = "default", options = {}) {
  const { viewMode: viewModeConfig = null, mobileDetect: mobileDetectConfig = null } = options;
  const { width: windowWidth } = useWindowSize();
  const globalMessage = useGlobalMessage();
  const storedPageSizes = useLocalStorage("admin-page-size", {});
  const loading = ref(false);
  const error = ref("");
  const successMessage = ref("");
  const selectedItems = ref([]);
  const lastRefreshTime = ref("");
  const pageSizeOptions = [10, 20, 30, 50, 100];
  const getDefaultPageSize = () => {
    try {
      const saved = storedPageSizes.value;
      if (saved && typeof saved === "object") {
        return saved[pageKey] || 20;
      }
    } catch (error2) {
    }
    if (typeof storedPageSizes.value === "number") {
      const oldValue = storedPageSizes.value || 20;
      storedPageSizes.value = { default: oldValue };
      return pageKey === "default" ? oldValue : 20;
    }
    return 20;
  };
  const pagination = reactive({
    limit: getDefaultPageSize(),
    total: 0,
    page: 1,
    totalPages: 0,
    offset: 0,
    hasMore: false
  });
  const updatePagination = (data, mode = "page") => {
    if (mode === "page") {
      pagination.total = data.total || 0;
      pagination.totalPages = Math.ceil(pagination.total / pagination.limit);
    } else {
      pagination.total = data.total || 0;
      pagination.hasMore = data.hasMore !== void 0 ? data.hasMore : pagination.offset + pagination.limit < pagination.total;
      if (data.limit !== void 0) pagination.limit = data.limit;
      if (data.offset !== void 0) pagination.offset = data.offset;
    }
  };
  const handlePaginationChange = (value, mode = "page") => {
    if (mode === "page") {
      pagination.page = value;
      pagination.offset = (value - 1) * pagination.limit;
    } else {
      pagination.offset = value;
      pagination.page = Math.floor(value / pagination.limit) + 1;
    }
  };
  const resetPagination = () => {
    pagination.page = 1;
    pagination.offset = 0;
  };
  const changePageSize = (newLimit) => {
    try {
      storedPageSizes.value = { ...storedPageSizes.value || {}, [pageKey]: newLimit };
    } catch (error2) {
      log.warn("保存分页设置失败:", error2);
    }
    pagination.limit = newLimit;
    resetPagination();
  };
  const toggleSelectItem = (id) => {
    const index = selectedItems.value.indexOf(id);
    if (index > -1) {
      selectedItems.value.splice(index, 1);
    } else {
      selectedItems.value.push(id);
    }
  };
  const toggleSelectAll = (allItems, idField = "id") => {
    if (selectedItems.value.length === allItems.length) {
      selectedItems.value = [];
    } else {
      selectedItems.value = allItems.map((item) => item[idField]);
    }
  };
  const clearSelection = () => {
    selectedItems.value = [];
  };
  const clearSuccessDelayMs = ref(0);
  const { start: startClearSuccess, stop: stopClearSuccess } = useTimeoutFn(
    () => {
      successMessage.value = "";
    },
    clearSuccessDelayMs,
    { immediate: false }
  );
  const showSuccess = (message, duration = 4e3) => {
    successMessage.value = message;
    stopClearSuccess();
    clearSuccessDelayMs.value = duration;
    startClearSuccess();
    globalMessage.showSuccess(message, duration);
  };
  const showError = (message) => {
    error.value = message;
    globalMessage.showError(message);
  };
  const clearMessages = () => {
    error.value = "";
    successMessage.value = "";
  };
  const updateLastRefreshTime = () => {
    lastRefreshTime.value = formatCurrentTime();
  };
  const withLoading = async (asyncFn, options2 = {}) => {
    const { clearMessagesFirst = true, showErrorOnCatch = true } = options2;
    loading.value = true;
    if (clearMessagesFirst) clearMessages();
    try {
      const result = await asyncFn();
      return result;
    } catch (err) {
      log.error("操作失败:", err);
      if (showErrorOnCatch) {
        showError(err.message || "操作失败，请重试");
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const viewMode = ref(null);
  const userHasChosenView = ref(false);
  let switchViewMode = () => {
  };
  if (viewModeConfig) {
    const { storageKey, defaultMode, responsive } = viewModeConfig;
    const storedViewMode = useLocalStorage(storageKey, "");
    if (!storageKey) {
      throw new Error("useAdminBase: viewMode.storageKey is required");
    }
    const getRecommendedMode = () => {
      if (!responsive) return defaultMode;
      const { breakpoint = 640, mobileMode, desktopMode } = responsive;
      return windowWidth.value < breakpoint ? mobileMode : desktopMode;
    };
    const getInitialMode = () => {
      if (storedViewMode.value) return storedViewMode.value;
      return responsive ? getRecommendedMode() : defaultMode;
    };
    viewMode.value = getInitialMode();
    userHasChosenView.value = !!storedViewMode.value;
    switchViewMode = (mode) => {
      viewMode.value = mode;
      storedViewMode.value = mode;
      userHasChosenView.value = true;
    };
    if (responsive) {
      let lastBreakpointState = windowWidth.value < responsive.breakpoint;
      const handleViewResize = () => {
        const { breakpoint = 640, mobileMode, desktopMode } = responsive;
        const isNowMobile = windowWidth.value < breakpoint;
        if (isNowMobile !== lastBreakpointState) {
          lastBreakpointState = isNowMobile;
          const targetMode = isNowMobile ? mobileMode : desktopMode;
          if (viewMode.value !== targetMode) {
            viewMode.value = targetMode;
          }
        }
      };
      watch(windowWidth, handleViewResize);
    }
  }
  const isMobile = ref(false);
  let checkMobile = () => {
  };
  if (mobileDetectConfig) {
    const breakpoint = typeof mobileDetectConfig === "object" ? mobileDetectConfig.breakpoint || 768 : 768;
    checkMobile = () => {
      isMobile.value = windowWidth.value < breakpoint;
    };
    watch(windowWidth, () => checkMobile(), { immediate: true });
  }
  return {
    // 基础状态
    loading,
    error,
    successMessage,
    selectedItems,
    lastRefreshTime,
    pagination,
    pageSizeOptions,
    // 分页方法
    updatePagination,
    handlePaginationChange,
    resetPagination,
    changePageSize,
    // 选择方法
    toggleSelectItem,
    toggleSelectAll,
    clearSelection,
    // 消息方法
    showSuccess,
    showError,
    clearMessages,
    // 工具方法
    updateLastRefreshTime,
    withLoading,
    // 视图模式（可选功能）
    viewMode,
    userHasChosenView,
    switchViewMode,
    // 移动端检测（可选功能）
    isMobile,
    checkMobile
  };
}
export {
  useAdminBase as u
};
