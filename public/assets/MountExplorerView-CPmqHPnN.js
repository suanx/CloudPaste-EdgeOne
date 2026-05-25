const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/FileSaver.min-CQ6SkgWv.js","assets/index-BQxzU9F1.js","assets/GalleryView-DA43jN9C.js","assets/livePhotoUtils-x9T853K7.js","assets/fileTypes-C4-giE9O.js","assets/fileTypeIcons-s4hrDi1Q.js","assets/fileUtils-CALGFK20.js","assets/livePhotoBadgeIconSvg-DVbmCKIq.js","assets/LoadingIndicator-C1Dntewf.js","assets/MarkdownDisplay-DriQfnOJ.js","assets/timeUtils-D81jJILb.js","assets/clipboard-GLHRBPpJ.js","assets/useConfirmDialog-c5dcTgIB.js","assets/fsMetaService-BlI_oFcH.js","assets/PermissionManager-BpGELUYQ.js","assets/FilePreview-DiHL5H4A.js","assets/OfficePreviewContainer-BV71pY0a.js","assets/index-Sde1Raj0.js","assets/storageConfigsStore-DUFoycii.js","assets/APlayer.min-DKjfm4Hz.js","assets/UppyUploadModal-DU8vVGk0.js","assets/UppyPluginManager-AHtBg_Vv.js","assets/CopyModal-zl6Q4ZL3.js","assets/TaskListModal-C-xZ3pDd.js","assets/SearchModal-dlMVdhnx.js","assets/FsMediaLightboxDialog-CfM1tbep.js","assets/MapEmbed-BRXo7_oo.js","assets/SettingsDrawer-Dz-LtZC_.js"])))=>i.map(i=>d[i]);
import { e as useI18n, aZ as useFsService, c as createLogger, g as ref, b0 as useExplorerSettings, F as computed, av as defineStore, i as useLocalStorage, f as useAuthStore, b1 as storeToRefs, ax as onUnmounted, _ as __vitePreload, E as api, dD as usePathPassword, Y as useGlobalMessage, a$ as h, eM as Ge, b7 as IconDelete, bh as IconRename, e4 as IconCheckbox, eN as IconShoppingCart, al as IconCopy, bo as IconLink, H as IconDownload, d as useRouter, dL as useRoute, w as watch, o as onMounted, e7 as normalizeFsPath, eO as toDirApiPath, aP as nextTick, u as useEventListener, j as createElementBlock, k as openBlock, l as createBaseVNode, n as normalizeClass, m as withModifiers, z as createVNode, y as unref, as as IconHome, t as toDisplayString, K as Fragment, L as renderList, ab as IconChevronRight, a_ as shallowRef, cR as onScopeDispose, dj as triggerRef, aK as _export_sfc, p as createCommentVNode, A as createTextVNode, aD as normalizeStyle, aM as createStaticVNode, aT as onKeyStroke, q as withDirectives, bG as vModelDynamic, aG as withKeys, M as createBlock, J as IconRefresh, b3 as IconLockClosed, bg as IconEye, dN as IconEyeOff, aC as IconExclamationSolid, ez as IconBack, ea as useWindowScroll, b8 as IconDocument, ao as IconChevronDown, ap as IconChevronUp, dM as IconHamburger, dF as IconFolderOpen, c9 as defineAsyncComponent, eP as createFsItemNameDialogValidator, G as IconClose, P as IconCollection, b5 as IconFolder, ar as mergeProps, aV as Teleport, ad as IconUpload, bd as IconFolderPlus, az as IconTaskList, Q as IconList, O as IconGrid, at as IconGallery, aE as withCtx, aF as Transition, aY as onBeforeUnmount, bc as IconSettings, aq as vShow, N as resolveDynamicComponent, dK as IconMenu, eb as useScroll, bf as IconArrowUp, ac as useThemeMode, V as IconSearch, aB as IconXCircle, aL as IconExclamation, eQ as validateFsItemName, eR as isSameOrSubPath, cW as provide } from "./index-BQxzU9F1.js";
import { _ as _sfc_main$f } from "./LoadingIndicator-C1Dntewf.js";
import { f as formatFileSize } from "./fileUtils-CALGFK20.js";
import { u as useTaskManager, g as getZipJsDefaultConfig, M as MarkdownDisplay } from "./MarkdownDisplay-DriQfnOJ.js";
import { e as formatNowForFilename, c as formatDateTime } from "./timeUtils-D81jJILb.js";
import { c as copyToClipboard } from "./clipboard-GLHRBPpJ.js";
import { g as getFileIcon } from "./fileTypeIcons-s4hrDi1Q.js";
import { u as useConfirmDialog, _ as _sfc_main$e } from "./useConfirmDialog-c5dcTgIB.js";
import { v as verifyFsMetaPassword } from "./fsMetaService-BlI_oFcH.js";
import { P as PermissionManager } from "./PermissionManager-BpGELUYQ.js";
function useFileOperations() {
  const { t } = useI18n();
  const fsService = useFsService();
  const log = createLogger("FileOperations");
  const loading = ref(false);
  const error = ref(
    /** @type {string | null} */
    null
  );
  const downloadFile = async (pathOrItem) => {
    const item = typeof pathOrItem === "string" ? { path: pathOrItem, name: pathOrItem.split("/").pop() || pathOrItem, isDirectory: false } : pathOrItem;
    if (!item || item.isDirectory) {
      return { success: false, message: t("mount.messages.cannotDownloadDirectory") };
    }
    try {
      loading.value = true;
      error.value = null;
      if (item.downloadUrl) {
        const link = document.createElement("a");
        link.href = item.downloadUrl;
        link.download = item.name || "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        await fsService.downloadFile(item.path, item.name);
      }
      return { success: true, message: t("mount.messages.downloadStarted", { name: item.name }) };
    } catch (err) {
      log.error("下载文件失败:", err);
      error.value = /** @type {any} */
      err?.message;
      return { success: false, message: t("mount.messages.downloadFailed", { name: item.name, message: error.value }) };
    } finally {
      loading.value = false;
    }
  };
  const renameItem = async (oldPath, newPath) => {
    try {
      loading.value = true;
      error.value = null;
      await fsService.renameItem(oldPath, newPath);
      return { success: true, message: t("mount.messages.renameSuccess") };
    } catch (err) {
      log.error("重命名失败:", err);
      error.value = /** @type {any} */
      err?.message;
      return { success: false, message: error.value || "重命名失败" };
    } finally {
      loading.value = false;
    }
  };
  const createFolder = async (parentPath, folderName) => {
    try {
      loading.value = true;
      error.value = null;
      const fullPath = parentPath.endsWith("/") ? `${parentPath}${folderName}/` : `${parentPath}/${folderName}/`;
      await fsService.createDirectory(fullPath);
      return { success: true, message: t("mount.messages.createFolderSuccess") };
    } catch (err) {
      log.error("创建文件夹失败:", err);
      error.value = /** @type {any} */
      err?.message;
      return { success: false, message: error.value || "创建文件夹失败" };
    } finally {
      loading.value = false;
    }
  };
  const batchDeleteItems = async (itemsOrItem) => {
    let items2;
    if (typeof itemsOrItem === "string") {
      items2 = [{ path: itemsOrItem, name: itemsOrItem.split("/").pop() || itemsOrItem, isDirectory: false }];
    } else if (Array.isArray(itemsOrItem)) {
      items2 = itemsOrItem;
    } else {
      items2 = [itemsOrItem];
    }
    if (!items2 || items2.length === 0) {
      return { success: false, message: t("mount.messages.noItemsToDelete") };
    }
    try {
      loading.value = true;
      error.value = null;
      const paths = items2.map((item) => item.path);
      await fsService.batchDeleteItems(paths);
      return {
        success: true,
        message: t("mount.messages.batchDeleteSuccess", { count: items2.length })
      };
    } catch (err) {
      log.error("批量删除失败:", err);
      error.value = /** @type {any} */
      err?.message;
      return {
        success: false,
        message: t("mount.messages.batchDeleteFailed", { message: error.value })
      };
    } finally {
      loading.value = false;
    }
  };
  const getFileLink = async (item, expiresIn = null, forceDownload = true) => {
    if (item.isDirectory) {
      return {
        success: false,
        message: t("mount.messages.directoryNoLink")
      };
    }
    try {
      loading.value = true;
      error.value = null;
      const url = await fsService.getFileLink(item.path, expiresIn, forceDownload);
      return {
        success: true,
        message: await copyToClipboard(url) ? t("mount.messages.linkCopiedSuccess") : t("mount.messages.copyFailed"),
        url
      };
    } catch (err) {
      log.error("获取文件直链失败:", err);
      error.value = /** @type {any} */
      err?.message;
      return {
        success: false,
        message: error.value || t("mount.messages.getFileLinkError")
      };
    } finally {
      loading.value = false;
    }
  };
  const clearError = () => {
    error.value = null;
  };
  return {
    // 状态
    loading,
    error,
    // 操作
    downloadFile,
    renameItem,
    createFolder,
    batchDeleteItems,
    getFileLink,
    clearError
  };
}
function useDirectorySort() {
  const log = createLogger("DirectorySort");
  const explorerSettings = useExplorerSettings();
  const sortField = computed(() => explorerSettings.settings.sortBy);
  const sortOrder = computed(() => explorerSettings.settings.sortOrder);
  const foldersFirst = computed(() => explorerSettings.settings.foldersFirst);
  const sortDescription = computed(() => {
    const fieldNames = {
      name: "名称",
      size: "大小",
      modified: "修改时间",
      type: "类型"
    };
    const orderNames = {
      asc: "升序",
      desc: "降序"
    };
    return `按${fieldNames[sortField.value]}${orderNames[sortOrder.value]}`;
  });
  const isDefaultSort = computed(
    () => sortField.value === "name" && sortOrder.value === "asc" && foldersFirst.value
  );
  const isCustomSort = computed(() => !isDefaultSort.value);
  const initializeSortState = () => {
    log.debug("排序状态已初始化:", {
      field: sortField.value,
      order: sortOrder.value,
      foldersFirst: foldersFirst.value
    });
  };
  const resetSortState = () => {
    explorerSettings.updateSetting("sortBy", "name");
    explorerSettings.updateSetting("sortOrder", "asc");
    explorerSettings.updateSetting("foldersFirst", true);
  };
  const handleSort = (field) => {
    if (!["name", "size", "modified", "type"].includes(field)) {
      log.warn("无效的排序字段:", field);
      return;
    }
    if (sortField.value === field) {
      explorerSettings.toggleSortOrder();
    } else {
      explorerSettings.updateSetting("sortBy", field);
      explorerSettings.updateSetting("sortOrder", "asc");
    }
  };
  const setSortState = (field, order) => {
    if (!["name", "size", "modified", "type"].includes(field)) {
      log.warn("无效的排序字段:", field);
      return;
    }
    if (!["asc", "desc"].includes(order)) {
      log.warn("无效的排序顺序:", order);
      return;
    }
    explorerSettings.updateSetting("sortBy", field);
    explorerSettings.updateSetting("sortOrder", order);
  };
  const getSortIcon = (field) => {
    if (sortField.value !== field) {
      return "";
    }
    return sortOrder.value === "asc" ? "↑" : "↓";
  };
  const getSortIconClass = (field) => {
    if (sortField.value !== field) {
      return "";
    }
    return sortOrder.value === "asc" ? "sort-asc" : "sort-desc";
  };
  const isCurrentSortField = (field) => {
    return sortField.value === field;
  };
  const getFieldSortState = (field) => {
    return {
      isActive: sortField.value === field,
      order: sortField.value === field ? sortOrder.value : null,
      icon: getSortIcon(field),
      iconClass: getSortIconClass(field)
    };
  };
  const sortItems = (items2) => {
    if (!items2 || !Array.isArray(items2)) {
      return [];
    }
    let sortedItems = [...items2];
    return sortedItems.sort((a, b) => {
      if (foldersFirst.value) {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
      }
      let comparison = 0;
      switch (sortField.value) {
        case "name":
          comparison = a.name.localeCompare(b.name, void 0, {
            numeric: true,
            sensitivity: "base"
          });
          break;
        case "size":
          const aSize = a.isDirectory && a.isVirtual ? 0 : a.size || 0;
          const bSize = b.isDirectory && b.isVirtual ? 0 : b.size || 0;
          comparison = aSize - bSize;
          break;
        case "modified":
          const aTime = a.isDirectory && a.isVirtual ? 0 : new Date(a.modified || 0).getTime();
          const bTime = b.isDirectory && b.isVirtual ? 0 : new Date(b.modified || 0).getTime();
          comparison = aTime - bTime;
          break;
        case "type":
          const aExt = a.isDirectory ? "" : (a.name.split(".").pop() || "").toLowerCase();
          const bExt = b.isDirectory ? "" : (b.name.split(".").pop() || "").toLowerCase();
          comparison = aExt.localeCompare(bExt);
          break;
        default:
          comparison = a.name.localeCompare(b.name, void 0, {
            numeric: true,
            sensitivity: "base"
          });
      }
      return sortOrder.value === "asc" ? comparison : -comparison;
    });
  };
  const createSortedItems = (itemsRef) => {
    return computed(() => sortItems(itemsRef.value));
  };
  const getSortConfig = () => {
    return {
      field: sortField.value,
      order: sortOrder.value,
      foldersFirst: foldersFirst.value,
      isDefault: isDefaultSort.value,
      description: sortDescription.value
    };
  };
  return {
    // 状态
    sortField,
    sortOrder,
    foldersFirst,
    // 计算属性
    sortDescription,
    isDefaultSort,
    isCustomSort,
    // 持久化方法
    initializeSortState,
    resetSortState,
    // 排序控制方法
    handleSort,
    setSortState,
    // UI辅助方法
    getSortIcon,
    getSortIconClass,
    isCurrentSortField,
    getFieldSortState,
    // 排序算法
    sortItems,
    createSortedItems,
    // 工具方法
    getSortConfig
  };
}
const useFileBasketStore = defineStore("fileBasket", () => {
  const log = createLogger("FileBasketStore");
  const collectedFiles = ref([]);
  const isBasketOpen = ref(false);
  const lastCollectionTime = ref(null);
  const isInitialized = ref(true);
  const AUTO_CLEANUP_HOURS = 24;
  const STORAGE_KEY = "cloudpaste_file_basket";
  const storedBasketData = useLocalStorage(STORAGE_KEY, null, { writeDefaults: false });
  const storedForceCleanFlag = useLocalStorage(STORAGE_KEY + "_force_clean", null, { writeDefaults: false });
  const collectionCount = computed(() => {
    if (!isInitialized.value || !Array.isArray(collectedFiles.value)) {
      return 0;
    }
    return collectedFiles.value.length;
  });
  const hasCollection = computed(() => {
    return isInitialized.value && collectionCount.value > 0;
  });
  const collectionTotalSize = computed(() => {
    if (!isInitialized.value || !Array.isArray(collectedFiles.value)) {
      return 0;
    }
    return collectedFiles.value.reduce((sum, file) => sum + (file.size || 0), 0);
  });
  const collectionTotalSizeMB = computed(() => {
    return Math.round(collectionTotalSize.value / (1024 * 1024) * 100) / 100;
  });
  const filesByDirectory = computed(() => {
    const groups = {};
    if (!isInitialized.value || !Array.isArray(collectedFiles.value)) {
      return groups;
    }
    collectedFiles.value.forEach((file) => {
      if (!file || typeof file !== "object" || !file.path) {
        log.warn("发现无效的文件对象，跳过:", file);
        return;
      }
      const dir = file.sourceDirectory || "/";
      if (!groups[dir]) {
        groups[dir] = [];
      }
      groups[dir].push(file);
    });
    return groups;
  });
  const directoryCount = computed(() => {
    if (!isInitialized.value) {
      return 0;
    }
    return Object.keys(filesByDirectory.value).length;
  });
  const addToBasket = (files, currentPath) => {
    if (!Array.isArray(collectedFiles.value)) {
      collectedFiles.value = [];
    }
    const fileArray = Array.isArray(files) ? files : [files];
    fileArray.forEach((file) => {
      if (!file || typeof file !== "object" || !file.path || !file.name) {
        log.warn("尝试添加无效的文件对象，跳过:", file);
        return;
      }
      const existingIndex = collectedFiles.value.findIndex((collected) => collected.path === file.path);
      if (existingIndex === -1) {
        const fileToAdd = {
          ...file,
          sourceDirectory: currentPath,
          collectedAt: (/* @__PURE__ */ new Date()).toISOString(),
          uniqueId: `${currentPath}::${file.path}`
          // 唯一标识
        };
        if (!fileToAdd.uniqueId) {
          fileToAdd.uniqueId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        }
        collectedFiles.value.push(fileToAdd);
      }
    });
    lastCollectionTime.value = (/* @__PURE__ */ new Date()).toISOString();
    saveToStorage();
  };
  const removeFromBasket = (filePaths) => {
    if (!Array.isArray(collectedFiles.value)) return;
    const pathArray = Array.isArray(filePaths) ? filePaths : [filePaths];
    pathArray.forEach((path) => {
      const index2 = collectedFiles.value.findIndex((file) => file.path === path);
      if (index2 !== -1) {
        collectedFiles.value.splice(index2, 1);
      }
    });
    saveToStorage();
  };
  const isFileInBasket = (filePath) => {
    if (!isInitialized.value || !Array.isArray(collectedFiles.value)) {
      return false;
    }
    return collectedFiles.value.some((file) => file.path === filePath);
  };
  const toggleFileInBasket = (file, currentPath) => {
    if (isFileInBasket(file.path)) {
      removeFromBasket(file.path);
    } else {
      addToBasket(file, currentPath);
    }
  };
  const addSelectedToBasket = (selectedFiles, currentPath) => {
    const fileItems = selectedFiles.filter((item) => !item.isDirectory);
    if (fileItems.length > 0) {
      addToBasket(fileItems, currentPath);
    }
    return fileItems.length;
  };
  const openBasket = () => {
    isBasketOpen.value = true;
  };
  const closeBasket = () => {
    isBasketOpen.value = false;
  };
  const toggleBasket = () => {
    isBasketOpen.value = !isBasketOpen.value;
  };
  const clearBasket = () => {
    collectedFiles.value = [];
    lastCollectionTime.value = null;
    saveToStorage();
  };
  const resetBasket = () => {
    clearBasket();
    closeBasket();
  };
  const saveToStorage = () => {
    try {
      const data = {
        collectedFiles: collectedFiles.value,
        lastCollectionTime: lastCollectionTime.value,
        savedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      storedBasketData.value = data;
    } catch (error) {
      log.error("保存文件篮状态失败:", error);
    }
  };
  const loadFromStorage = () => {
    try {
      const data = storedBasketData.value;
      if (data && typeof data === "object") {
        if (data.savedAt) {
          const savedTime = new Date(data.savedAt);
          const now = /* @__PURE__ */ new Date();
          const hoursDiff = (now - savedTime) / (1e3 * 60 * 60);
          if (hoursDiff > AUTO_CLEANUP_HOURS) {
            log.debug("文件篮数据已过期，自动清理");
            clearBasket();
            return;
          }
        }
        if (Array.isArray(data.collectedFiles)) {
          const validFiles = [];
          data.collectedFiles.forEach((file) => {
            if (!file || typeof file !== "object" || !file.path || !file.name || typeof file.path !== "string" || typeof file.name !== "string") {
              log.warn("从localStorage加载时发现无效文件对象，已过滤:", file);
              return;
            }
            if (typeof file.size !== "number" || file.size < 0) {
              file.size = 0;
            }
            if (!file.uniqueId || typeof file.uniqueId !== "string") {
              file.uniqueId = `${file.sourceDirectory || "unknown"}::${file.path}`;
            }
            if (!file.sourceDirectory || typeof file.sourceDirectory !== "string") {
              file.sourceDirectory = "/";
            }
            if (!file.collectedAt) {
              file.collectedAt = (/* @__PURE__ */ new Date()).toISOString();
            }
            validFiles.push(file);
          });
          collectedFiles.value = validFiles;
        } else {
          collectedFiles.value = [];
        }
        lastCollectionTime.value = data.lastCollectionTime || null;
      } else {
        collectedFiles.value = [];
        lastCollectionTime.value = null;
      }
    } catch (error) {
      log.error("加载文件篮状态失败，清理localStorage:", error);
      storedBasketData.remove?.();
      collectedFiles.value = [];
      lastCollectionTime.value = null;
    }
  };
  const getCollectionSummary = () => {
    return {
      totalFiles: collectionCount.value,
      totalDirectories: directoryCount.value,
      totalSize: collectionTotalSize.value,
      totalSizeMB: collectionTotalSizeMB.value,
      filesByDirectory: filesByDirectory.value,
      lastCollectionTime: lastCollectionTime.value
    };
  };
  const getCollectedFiles = () => {
    if (!isInitialized.value || !Array.isArray(collectedFiles.value)) {
      return [];
    }
    return [...collectedFiles.value];
  };
  const forceCleanStorage = () => {
    try {
      storedBasketData.remove?.();
      log.debug("已强制清理文件篮localStorage数据");
    } catch (error) {
      log.error("强制清理localStorage失败:", error);
    }
  };
  if (storedForceCleanFlag.value) {
    forceCleanStorage();
    storedForceCleanFlag.remove?.();
  }
  loadFromStorage();
  return {
    // 状态
    collectedFiles,
    isBasketOpen,
    lastCollectionTime,
    isInitialized,
    // 计算属性
    collectionCount,
    hasCollection,
    collectionTotalSize,
    collectionTotalSizeMB,
    filesByDirectory,
    directoryCount,
    // 文件收集方法
    addToBasket,
    removeFromBasket,
    isFileInBasket,
    toggleFileInBasket,
    addSelectedToBasket,
    // 面板管理
    openBasket,
    closeBasket,
    toggleBasket,
    // 清理方法
    clearBasket,
    resetBasket,
    // 获取信息方法
    getCollectionSummary,
    getCollectedFiles,
    // 持久化方法
    saveToStorage,
    loadFromStorage
  };
});
let isZipJsConfigured = false;
function useFileBasket() {
  const { t } = useI18n();
  const fileBasketStore = useFileBasketStore();
  const authStore = useAuthStore();
  const taskManager = useTaskManager();
  const pathPassword = usePathPassword();
  const log = createLogger("FileBasket");
  const globalActiveXHRs = /* @__PURE__ */ new Set();
  const globalEventListeners = /* @__PURE__ */ new Set();
  const globalActiveZipWritables = /* @__PURE__ */ new Set();
  const globalCleanup = () => {
    globalActiveXHRs.forEach((xhr) => {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        xhr.abort();
      }
    });
    globalActiveXHRs.clear();
    globalActiveZipWritables.forEach((writable) => {
      try {
        if (writable && typeof writable.abort === "function") {
          writable.abort();
        }
      } catch (e) {
        log.warn("中止 ZIP 写入流失败:", e?.message || e);
      }
    });
    globalActiveZipWritables.clear();
    globalEventListeners.forEach(({ target, event, handler }) => {
      target.removeEventListener(event, handler);
    });
    globalEventListeners.clear();
    log.debug("文件篮composable已清理所有资源");
  };
  const { collectedFiles, isBasketOpen, collectionCount, hasCollection, collectionTotalSize, collectionTotalSizeMB, filesByDirectory, directoryCount, isInitialized } = storeToRefs(fileBasketStore);
  const basketButtonText = computed(() => {
    try {
      if (collectionCount.value === 0) {
        return t("fileBasket.button.empty");
      }
      return t("fileBasket.button.withCount", { count: collectionCount.value });
    } catch (error) {
      log.warn("国际化函数调用失败，使用默认文本:", error);
      if (collectionCount.value === 0) {
        return "文件篮";
      }
      return `文件篮 (${collectionCount.value})`;
    }
  });
  const basketSummary = computed(() => {
    return {
      fileCount: collectionCount.value,
      directoryCount: directoryCount.value,
      totalSizeMB: collectionTotalSizeMB.value,
      isEmpty: !hasCollection.value
    };
  });
  const addToBasket = (files, currentPath) => {
    try {
      const fileArray = Array.isArray(files) ? files : [files];
      const fileItems = fileArray.filter((item) => !item.isDirectory);
      if (fileItems.length === 0) {
        return {
          success: false,
          message: t("fileBasket.messages.noFilesToAdd")
        };
      }
      fileBasketStore.addToBasket(fileItems, currentPath);
      return {
        success: true,
        message: t("fileBasket.messages.addSuccess", {
          count: fileItems.length,
          total: collectionCount.value
        })
      };
    } catch (error) {
      log.error("添加文件到篮子失败:", error);
      return {
        success: false,
        message: t("fileBasket.messages.addFailed")
      };
    }
  };
  const removeFromBasket = (filePaths) => {
    try {
      fileBasketStore.removeFromBasket(filePaths);
      return {
        success: true,
        message: t("fileBasket.messages.removeSuccess")
      };
    } catch (error) {
      log.error("从篮子移除文件失败:", error);
      return {
        success: false,
        message: t("fileBasket.messages.removeFailed")
      };
    }
  };
  const toggleFileInBasket = (file, currentPath) => {
    try {
      const isInBasket = fileBasketStore.isFileInBasket(file.path);
      fileBasketStore.toggleFileInBasket(file, currentPath);
      return {
        success: true,
        isInBasket: !isInBasket,
        message: isInBasket ? t("fileBasket.messages.removeSuccess") : t("fileBasket.messages.addSuccess", { count: 1, total: collectionCount.value })
      };
    } catch (error) {
      log.error("切换文件篮状态失败:", error);
      return {
        success: false,
        message: t("fileBasket.messages.toggleFailed")
      };
    }
  };
  const addSelectedToBasket = (selectedFiles, currentPath) => {
    try {
      const addedCount = fileBasketStore.addSelectedToBasket(selectedFiles, currentPath);
      if (addedCount === 0) {
        return {
          success: false,
          message: t("fileBasket.messages.noFilesToAdd")
        };
      }
      return {
        success: true,
        addedCount,
        message: t("fileBasket.messages.batchAddSuccess", {
          count: addedCount,
          total: collectionCount.value
        })
      };
    } catch (error) {
      log.error("批量添加文件到篮子失败:", error);
      return {
        success: false,
        message: t("fileBasket.messages.batchAddFailed")
      };
    }
  };
  const openBasket = () => {
    fileBasketStore.openBasket();
  };
  const closeBasket = () => {
    fileBasketStore.closeBasket();
  };
  const toggleBasket = () => {
    fileBasketStore.toggleBasket();
  };
  const clearBasket = () => {
    try {
      fileBasketStore.clearBasket();
      return {
        success: true,
        message: t("fileBasket.messages.clearSuccess")
      };
    } catch (error) {
      log.error("清空文件篮失败:", error);
      return {
        success: false,
        message: t("fileBasket.messages.clearFailed")
      };
    }
  };
  const resetBasket = () => {
    fileBasketStore.resetBasket();
  };
  const tryPickZipSaveTarget = async (suggestedName) => {
    if (typeof window === "undefined") return null;
    if (typeof window.showSaveFilePicker !== "function") return null;
    if (!window.isSecureContext) return null;
    const handle = await window.showSaveFilePicker({
      suggestedName: suggestedName || "CloudPaste.zip",
      types: [
        {
          description: "ZIP 文件",
          accept: {
            "application/zip": [".zip"]
          }
        }
      ],
      excludeAcceptAllOption: true
    });
    const writable = await handle.createWritable();
    return {
      mode: "fs_access",
      writable,
      fileName: handle?.name || suggestedName || "CloudPaste.zip"
    };
  };
  const createPackTask = async () => {
    try {
      if (!hasCollection.value) {
        return {
          success: false,
          message: t("fileBasket.messages.emptyBasket")
        };
      }
      const timestamp = formatNowForFilename();
      const suggestedZipFileName = `CloudPaste_${timestamp}.zip`;
      let outputTarget = null;
      let zipFileName = suggestedZipFileName;
      try {
        const picked = await tryPickZipSaveTarget(suggestedZipFileName);
        if (picked) {
          outputTarget = picked;
          zipFileName = picked.fileName || suggestedZipFileName;
        }
      } catch (e) {
        if (e?.name === "AbortError") {
          return {
            success: false,
            message: "已取消保存"
          };
        }
        throw e;
      }
      const taskName = t("fileBasket.task.name", {
        count: collectionCount.value,
        directories: directoryCount.value
      });
      const taskId = taskManager.addTask("download", taskName, collectionCount.value);
      processPackTask(taskId, { outputTarget, zipFileName });
      return {
        success: true,
        taskId,
        message: t("fileBasket.messages.taskCreated", { taskName })
      };
    } catch (error) {
      log.error("创建打包任务失败:", error);
      return {
        success: false,
        message: t("fileBasket.messages.taskCreateFailed")
      };
    }
  };
  const processPackTask = async (taskId, options = {}) => {
    const fileStates = /* @__PURE__ */ new Map();
    const cleanup = () => {
      if (fileStates) {
        fileStates.clear();
      }
    };
    const outputTarget = options?.outputTarget || null;
    const zipFileName = options?.zipFileName || `CloudPaste_${formatNowForFilename()}.zip`;
    const isFsAccessMode = outputTarget?.mode === "fs_access" && outputTarget?.writable;
    try {
      if (isFsAccessMode) {
        globalActiveZipWritables.add(outputTarget.writable);
      }
      taskManager.updateTaskProgress(taskId, 0, {
        status: t("fileBasket.task.preparing"),
        total: collectionCount.value,
        processed: 0,
        currentFile: "",
        startTime: (/* @__PURE__ */ new Date()).toISOString()
      });
      const files = fileBasketStore.getCollectedFiles();
      const { ZipWriter, BlobWriter, BlobReader, HttpReader, configure } = await __vitePreload(async () => {
        const { ZipWriter: ZipWriter2, BlobWriter: BlobWriter2, BlobReader: BlobReader2, HttpReader: HttpReader2, configure: configure2 } = await import("./index-Sde1Raj0.js");
        return { ZipWriter: ZipWriter2, BlobWriter: BlobWriter2, BlobReader: BlobReader2, HttpReader: HttpReader2, configure: configure2 };
      }, true ? [] : void 0);
      const saveAs = isFsAccessMode ? null : (await __vitePreload(async () => {
        const { saveAs: saveAs2 } = await import("./FileSaver.min-CQ6SkgWv.js").then((n) => n.F);
        return { saveAs: saveAs2 };
      }, true ? __vite__mapDeps([0,1]) : void 0)).saveAs;
      if (!isZipJsConfigured) {
        configure(getZipJsDefaultConfig());
        isZipJsConfigured = true;
      }
      log.debug(`处理 ${files.length} 个文件`);
      const zipOutput = isFsAccessMode ? outputTarget.writable : new BlobWriter("application/zip");
      const zipWriter = new ZipWriter(zipOutput, {
        // 生成 >4GB 的 zip，需要显式开启 zip64
        zip64: true,
        keepOrder: true,
        // 保持文件顺序
        useWebWorkers: true,
        // 启用Web Workers
        useCompressionStream: true,
        // 使用原生压缩流
        bufferedWrite: false
        // 不缓冲写入，减少内存占用
      });
      const failedFiles = [];
      const addedFiles = /* @__PURE__ */ new Set();
      const reserveZipPath = (file) => {
        const directoryName = (file?.sourceDirectory || "").replace(/^\//, "").replace(/\//g, "_") || "root";
        const zipPath = `${directoryName}/${file.name}`;
        let finalZipPath = zipPath;
        let counter = 1;
        while (addedFiles.has(finalZipPath)) {
          const lastDotIndex = zipPath.lastIndexOf(".");
          if (lastDotIndex > 0) {
            const name = zipPath.substring(0, lastDotIndex);
            const ext = zipPath.substring(lastDotIndex);
            finalZipPath = `${name}_${counter}${ext}`;
          } else {
            finalZipPath = `${zipPath}_${counter}`;
          }
          counter++;
        }
        addedFiles.add(finalZipPath);
        return finalZipPath;
      };
      const runWithConcurrency = async (items2, limit, worker) => {
        const safeLimit = Math.max(1, Math.min(limit || 1, items2.length || 1));
        let index2 = 0;
        const runners = Array.from({ length: safeLimit }).map(async () => {
          while (index2 < items2.length) {
            const current = items2[index2++];
            await worker(current);
          }
        });
        await Promise.all(runners);
      };
      files.forEach((file) => {
        fileStates.set(file.path, {
          name: file.name,
          path: file.path,
          size: file.size,
          status: "pending",
          progress: 0,
          receivedBytes: 0,
          totalBytes: file.size || 0
        });
      });
      const processOneFile = async (file) => {
        try {
          const finalZipPath = reserveZipPath(file);
          const downloadUrl = await getFileDownloadUrl(file);
          let fileState = fileStates.get(file.path);
          if (fileState) {
            fileState.status = "downloading";
          }
          await zipWriter.add(
            finalZipPath,
            new HttpReader(downloadUrl, {
              preventHeadRequest: true,
              // 避免额外的HEAD请求
              useXHR: false
              // 使用fetch API
            }),
            {
              useWebWorkers: true,
              // 启用Web Workers
              useCompressionStream: true,
              // 使用原生压缩流
              onprogress: (progress, total) => {
                if (fileState) {
                  fileState.progress = total > 0 ? Math.round(progress / total * 100) : 0;
                  fileState.receivedBytes = progress;
                  fileState.totalBytes = total;
                  const completedFiles = Array.from(fileStates.values()).filter((f) => f.status === "completed").length;
                  const currentRatio = total > 0 ? progress / total : 0;
                  const overallProgress = Math.round((completedFiles + currentRatio) / files.length * 90);
                  taskManager.updateTaskProgress(taskId, overallProgress, {
                    status: t("fileBasket.task.downloading"),
                    currentFile: `${file.name} (${fileState.progress}%)`,
                    processed: completedFiles,
                    total: files.length
                  });
                }
              }
            }
          );
          fileState = fileStates.get(file.path);
          if (fileState) {
            fileState.status = "completed";
            fileState.progress = 100;
          }
          return { success: true, fileName: file.name };
        } catch (error) {
          log.error(`添加文件 ${file.name} 失败:`, error);
          failedFiles.push({ fileName: file.name, path: file.path, error: error.message });
          const failedFileState = fileStates.get(file.path);
          if (failedFileState) {
            failedFileState.status = "failed";
            failedFileState.progress = 0;
          }
          return { success: false, fileName: file.name, error: error.message };
        }
      };
      await runWithConcurrency(files, 4, processOneFile);
      if (failedFiles.length > 0) {
        const errorReport = [t("fileBasket.task.failedFilesHeader"), "", ...failedFiles.map(({ fileName, path, error }) => `${path} (${fileName}): ${error}`)].join("\n");
        await zipWriter.add("下载失败文件列表.txt", new BlobReader(new Blob([errorReport], { type: "text/plain" })));
      }
      taskManager.updateTaskProgress(taskId, 95, {
        status: t("fileBasket.task.generating"),
        currentFile: "",
        processed: files.length,
        total: files.length
      });
      const zipResult = await zipWriter.close(void 0, { zip64: true });
      if (!isFsAccessMode) {
        saveAs(zipResult, zipFileName);
      }
      const successCount = files.length - failedFiles.length;
      taskManager.completeTask(taskId, {
        status: t("fileBasket.task.completed"),
        successCount,
        failedCount: failedFiles.length,
        zipFileName,
        endTime: (/* @__PURE__ */ new Date()).toISOString(),
        summary: failedFiles.length > 0 ? t("fileBasket.task.summaryWithFailures", { success: successCount, failed: failedFiles.length }) : t("fileBasket.task.summarySuccess", { count: successCount })
      });
      fileBasketStore.clearBasket();
    } catch (error) {
      log.error("打包任务失败:", error);
      taskManager.failTask(
        taskId,
        error?.message || String(error),
        {
          status: t("fileBasket.task.failed"),
          error: error?.message || String(error),
          endTime: (/* @__PURE__ */ new Date()).toISOString()
        }
      );
    } finally {
      if (isFsAccessMode && outputTarget?.writable) {
        try {
          const tasks = taskManager.getTasks();
          const task = Array.isArray(tasks) ? tasks.find((t2) => t2.id === taskId) : null;
          const shouldAbort = task?.status !== "completed";
          if (shouldAbort && typeof outputTarget.writable.abort === "function") {
            await outputTarget.writable.abort();
          }
        } catch (e) {
          log.warn("中止 ZIP 写入失败:", e?.message || e);
        }
      }
      if (isFsAccessMode && outputTarget?.writable) {
        globalActiveZipWritables.delete(outputTarget.writable);
      }
      cleanup();
    }
  };
  const getFileDownloadUrl = async (file) => {
    try {
      if (file?.downloadUrl) {
        return file.downloadUrl;
      }
      const getFileLinkApi = api.fs.getFileLink;
      const isAdmin = authStore.isAdmin;
      const requestOptions = {};
      if (!isAdmin) {
        const token = pathPassword.getPathToken(file.path);
        if (token) {
          requestOptions.headers = {
            "X-FS-Path-Token": token
          };
        }
      }
      const url = await getFileLinkApi(file.path, null, true, requestOptions);
      if (url) {
        return url;
      }
      throw new Error(t("fileBasket.errors.noDownloadUrl"));
    } catch (error) {
      log.error(`获取文件 ${file.name} 下载链接失败:`, error);
      throw error;
    }
  };
  const isFileInBasket = (filePath) => {
    return fileBasketStore.isFileInBasket(filePath);
  };
  const getBasketSummary = () => {
    return fileBasketStore.getCollectionSummary();
  };
  onUnmounted(() => {
    globalCleanup();
  });
  return {
    // Store状态
    collectedFiles,
    isBasketOpen,
    collectionCount,
    hasCollection,
    collectionTotalSize,
    collectionTotalSizeMB,
    filesByDirectory,
    directoryCount,
    isInitialized,
    // 计算属性
    basketButtonText,
    basketSummary,
    // 文件篮操作方法
    addToBasket,
    removeFromBasket,
    toggleFileInBasket,
    addSelectedToBasket,
    // 面板管理方法
    openBasket,
    closeBasket,
    toggleBasket,
    // 清理方法
    clearBasket,
    resetBasket,
    // 打包下载方法
    createPackTask,
    // 工具方法
    isFileInBasket,
    getBasketSummary,
    // 手动清理方法（用于紧急情况）
    globalCleanup
  };
}
function useSelection() {
  const isCheckboxMode = ref(false);
  const selectedItems = ref([]);
  const availableItems = ref([]);
  const selectedCount = computed(() => selectedItems.value.length);
  const hasSelection = computed(() => selectedCount.value > 0);
  const isAllSelected = computed(() => {
    return selectedItems.value.length > 0 && selectedItems.value.length === availableItems.value.length;
  });
  const isPartiallySelected = computed(() => {
    return selectedItems.value.length > 0 && selectedItems.value.length < availableItems.value.length;
  });
  const setAvailableItems = (items2) => {
    availableItems.value = items2 || [];
    selectedItems.value = selectedItems.value.filter(
      (selectedItem) => items2.some((item) => item.path === selectedItem.path)
    );
  };
  const getAvailableItems = () => {
    return [...availableItems.value];
  };
  const toggleCheckboxMode = (enabled = null) => {
    if (enabled === null) {
      isCheckboxMode.value = !isCheckboxMode.value;
    } else {
      isCheckboxMode.value = enabled;
    }
    if (!isCheckboxMode.value) {
      clearSelection();
    }
  };
  const enableCheckboxMode = () => {
    toggleCheckboxMode(true);
  };
  const disableCheckboxMode = () => {
    toggleCheckboxMode(false);
  };
  const selectItem = (item, selected) => {
    if (!item || !item.path) return;
    const index2 = selectedItems.value.findIndex((selectedItem) => selectedItem.path === item.path);
    if (selected && index2 === -1) {
      selectedItems.value.push(item);
    } else if (!selected && index2 !== -1) {
      selectedItems.value.splice(index2, 1);
    }
  };
  const toggleItemSelection = (item) => {
    const isSelected = isItemSelected(item);
    selectItem(item, !isSelected);
  };
  const isItemSelected = (item) => {
    if (!item || !item.path) return false;
    return selectedItems.value.some((selectedItem) => selectedItem.path === item.path);
  };
  const addToSelection = (item) => {
    if (!isItemSelected(item)) {
      selectItem(item, true);
    }
  };
  const removeFromSelection = (item) => {
    if (isItemSelected(item)) {
      selectItem(item, false);
    }
  };
  const toggleSelectAll = (selectAll2 = null) => {
    if (selectAll2 === null) {
      selectAll2 = !isAllSelected.value;
    }
    if (selectAll2) {
      availableItems.value.forEach((item) => {
        if (!isItemSelected(item)) {
          selectedItems.value.push(item);
        }
      });
    } else {
      clearSelection();
    }
  };
  const selectAll = () => {
    toggleSelectAll(true);
  };
  const deselectAll = () => {
    toggleSelectAll(false);
  };
  const invertSelection = () => {
    const newSelection = availableItems.value.filter((item) => !isItemSelected(item));
    selectedItems.value = newSelection;
  };
  const selectRange = (startIndex, endIndex) => {
    const start = Math.min(startIndex, endIndex);
    const end = Math.max(startIndex, endIndex);
    for (let i = start; i <= end && i < availableItems.value.length; i++) {
      const item = availableItems.value[i];
      if (!isItemSelected(item)) {
        selectedItems.value.push(item);
      }
    }
  };
  const clearSelection = () => {
    selectedItems.value = [];
  };
  const resetSelection = () => {
    isCheckboxMode.value = false;
    selectedItems.value = [];
    availableItems.value = [];
  };
  const getSelectedItems = () => {
    return [...selectedItems.value];
  };
  const getSelectedFiles = () => {
    return selectedItems.value.filter((item) => !item.isDirectory);
  };
  const getSelectedDirectories = () => {
    return selectedItems.value.filter((item) => item.isDirectory);
  };
  const hasSelectedDirectories = () => {
    return selectedItems.value.some((item) => item.isDirectory);
  };
  const hasSelectedFiles = () => {
    return selectedItems.value.some((item) => !item.isDirectory);
  };
  const getSelectedTotalSize = () => {
    return selectedItems.value.reduce((total, item) => {
      return total + (item.size || 0);
    }, 0);
  };
  const getSelectedTotalSizeFormatted = () => {
    const totalSize = getSelectedTotalSize();
    return formatFileSize(totalSize);
  };
  const getSelectionSummary = () => {
    const files = getSelectedFiles();
    const directories = getSelectedDirectories();
    return {
      total: selectedCount.value,
      files: files.length,
      directories: directories.length,
      totalSize: getSelectedTotalSize(),
      totalSizeFormatted: getSelectedTotalSizeFormatted(),
      hasFiles: files.length > 0,
      hasDirectories: directories.length > 0,
      isAllFiles: files.length === selectedCount.value,
      isAllDirectories: directories.length === selectedCount.value
    };
  };
  const getSelectedPaths = () => {
    return selectedItems.value.map((item) => item.path);
  };
  const getSelectedNames = () => {
    return selectedItems.value.map((item) => item.name);
  };
  const findSelectedItemByPath = (path) => {
    return selectedItems.value.find((item) => item.path === path) || null;
  };
  const isPathSelected = (path) => {
    return selectedItems.value.some((item) => item.path === path);
  };
  const getSelectedIndices = () => {
    return selectedItems.value.map((selectedItem) => {
      return availableItems.value.findIndex((item) => item.path === selectedItem.path);
    }).filter((index2) => index2 !== -1);
  };
  return {
    // 状态 - 直接返回ref，让Vue在模板中自动解包
    isCheckboxMode,
    selectedItems,
    // 计算属性
    selectedCount,
    hasSelection,
    isAllSelected,
    isPartiallySelected,
    // 项目管理方法
    setAvailableItems,
    getAvailableItems,
    // 选择模式管理
    toggleCheckboxMode,
    enableCheckboxMode,
    disableCheckboxMode,
    // 单项选择方法
    selectItem,
    toggleItemSelection,
    isItemSelected,
    addToSelection,
    removeFromSelection,
    // 批量选择方法
    toggleSelectAll,
    selectAll,
    deselectAll,
    invertSelection,
    selectRange,
    // 清理方法
    clearSelection,
    resetSelection,
    // 获取选择信息方法
    getSelectedItems,
    getSelectedFiles,
    getSelectedDirectories,
    hasSelectedDirectories,
    hasSelectedFiles,
    getSelectedTotalSize,
    getSelectedTotalSizeFormatted,
    getSelectionSummary,
    getSelectedPaths,
    getSelectedNames,
    // 查询方法
    findSelectedItemByPath,
    isPathSelected,
    getSelectedIndices
  };
}
function useUIState() {
  const globalMessage = useGlobalMessage();
  const message = globalMessage.message;
  const showMessage = globalMessage.showMessage;
  const showSuccess = globalMessage.showSuccess;
  const showError = globalMessage.showError;
  const showWarning = globalMessage.showWarning;
  const showInfo = globalMessage.showInfo;
  const clearMessage = globalMessage.clearMessage;
  const hasMessage = globalMessage.hasMessage;
  const messageType = globalMessage.messageType;
  const messageContent = globalMessage.messageContent;
  const viewMode = ref("list");
  const isListMode = computed(() => viewMode.value === "list");
  const isGridMode = computed(() => viewMode.value === "grid");
  const isGalleryMode = computed(() => viewMode.value === "gallery");
  const setViewMode = (mode) => {
    if (mode === "list" || mode === "grid" || mode === "gallery") {
      viewMode.value = mode;
    }
  };
  const toggleViewMode = () => {
    viewMode.value = viewMode.value === "list" ? "grid" : "list";
  };
  const switchToListMode = () => {
    setViewMode("list");
  };
  const switchToGridMode = () => {
    setViewMode("grid");
  };
  const switchToGalleryMode = () => {
    setViewMode("gallery");
  };
  const isUploadModalOpen = ref(false);
  const isCopyModalOpen = ref(false);
  const isTasksModalOpen = ref(false);
  const isSearchModalOpen = ref(false);
  const isDeleteConfirmModalOpen = ref(false);
  const isRenameModalOpen = ref(false);
  const isCreateFolderModalOpen = ref(false);
  const openUploadModal = () => {
    isUploadModalOpen.value = true;
  };
  const closeUploadModal = () => {
    isUploadModalOpen.value = false;
  };
  const toggleUploadModal = () => {
    isUploadModalOpen.value = !isUploadModalOpen.value;
  };
  const openCopyModal = () => {
    isCopyModalOpen.value = true;
  };
  const closeCopyModal = () => {
    isCopyModalOpen.value = false;
  };
  const toggleCopyModal = () => {
    isCopyModalOpen.value = !isCopyModalOpen.value;
  };
  const openTasksModal = () => {
    isTasksModalOpen.value = true;
  };
  const closeTasksModal = () => {
    isTasksModalOpen.value = false;
  };
  const toggleTasksModal = () => {
    isTasksModalOpen.value = !isTasksModalOpen.value;
  };
  const openSearchModal = () => {
    isSearchModalOpen.value = true;
  };
  const closeSearchModal = () => {
    isSearchModalOpen.value = false;
  };
  const toggleSearchModal = () => {
    isSearchModalOpen.value = !isSearchModalOpen.value;
  };
  const openDeleteConfirmModal = () => {
    isDeleteConfirmModalOpen.value = true;
  };
  const closeDeleteConfirmModal = () => {
    isDeleteConfirmModalOpen.value = false;
  };
  const toggleDeleteConfirmModal = () => {
    isDeleteConfirmModalOpen.value = !isDeleteConfirmModalOpen.value;
  };
  const openRenameModal = () => {
    isRenameModalOpen.value = true;
  };
  const closeRenameModal = () => {
    isRenameModalOpen.value = false;
  };
  const toggleRenameModal = () => {
    isRenameModalOpen.value = !isRenameModalOpen.value;
  };
  const openCreateFolderModal = () => {
    isCreateFolderModalOpen.value = true;
  };
  const closeCreateFolderModal = () => {
    isCreateFolderModalOpen.value = false;
  };
  const toggleCreateFolderModal = () => {
    isCreateFolderModalOpen.value = !isCreateFolderModalOpen.value;
  };
  const closeAllModals = () => {
    isUploadModalOpen.value = false;
    isCopyModalOpen.value = false;
    isTasksModalOpen.value = false;
    isSearchModalOpen.value = false;
    isDeleteConfirmModalOpen.value = false;
    isRenameModalOpen.value = false;
    isCreateFolderModalOpen.value = false;
  };
  const hasOpenModal = computed(() => {
    return isUploadModalOpen.value || isCopyModalOpen.value || isTasksModalOpen.value || isSearchModalOpen.value || isDeleteConfirmModalOpen.value || isRenameModalOpen.value || isCreateFolderModalOpen.value;
  });
  const getOpenModals = () => {
    const openModals = [];
    if (isUploadModalOpen.value) openModals.push("upload");
    if (isCopyModalOpen.value) openModals.push("copy");
    if (isTasksModalOpen.value) openModals.push("tasks");
    if (isSearchModalOpen.value) openModals.push("search");
    if (isDeleteConfirmModalOpen.value) openModals.push("deleteConfirm");
    if (isRenameModalOpen.value) openModals.push("rename");
    if (isCreateFolderModalOpen.value) openModals.push("createFolder");
    return openModals;
  };
  const isLoading = ref(false);
  const loadingMessage = ref("");
  const setLoading = (loading, message2 = "") => {
    isLoading.value = loading;
    loadingMessage.value = message2;
  };
  const startLoading = (message2 = "加载中...") => {
    setLoading(true, message2);
  };
  const stopLoading = () => {
    setLoading(false, "");
  };
  const resetUIState = () => {
    globalMessage.clearMessage();
    closeAllModals();
    stopLoading();
    setViewMode("list");
  };
  const getUIStateSummary = () => {
    return {
      hasMessage: hasMessage.value,
      messageType: messageType.value,
      viewMode: viewMode.value,
      hasOpenModal: hasOpenModal.value,
      openModals: getOpenModals(),
      isLoading: isLoading.value,
      loadingMessage: loadingMessage.value
    };
  };
  return {
    // 消息管理
    message,
    showMessage,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    clearMessage,
    hasMessage,
    messageType,
    messageContent,
    // 视图模式管理
    viewMode,
    isListMode,
    isGridMode,
    isGalleryMode,
    setViewMode,
    toggleViewMode,
    switchToListMode,
    switchToGridMode,
    switchToGalleryMode,
    // 弹窗状态管理
    isUploadModalOpen,
    isCopyModalOpen,
    isTasksModalOpen,
    isSearchModalOpen,
    isDeleteConfirmModalOpen,
    isRenameModalOpen,
    isCreateFolderModalOpen,
    openUploadModal,
    closeUploadModal,
    toggleUploadModal,
    openCopyModal,
    closeCopyModal,
    toggleCopyModal,
    openTasksModal,
    closeTasksModal,
    toggleTasksModal,
    openSearchModal,
    closeSearchModal,
    toggleSearchModal,
    openDeleteConfirmModal,
    closeDeleteConfirmModal,
    toggleDeleteConfirmModal,
    openRenameModal,
    closeRenameModal,
    toggleRenameModal,
    openCreateFolderModal,
    closeCreateFolderModal,
    toggleCreateFolderModal,
    closeAllModals,
    hasOpenModal,
    getOpenModals,
    // 加载状态管理
    isLoading,
    loadingMessage,
    setLoading,
    startLoading,
    stopLoading,
    // 工具方法
    resetUIState,
    getUIStateSummary
  };
}
const icons = {
  download: () => h(IconDownload, { size: "sm" }),
  link: () => h(IconLink, { size: "sm" }),
  copy: () => h(IconCopy, { size: "sm" }),
  basket: () => h(IconShoppingCart, { size: "sm" }),
  checkbox: () => h(IconCheckbox, { size: "sm" }),
  edit: () => h(IconRename, { size: "sm" }),
  delete: () => h(IconDelete, { size: "sm", class: "text-red-500" })
};
function useContextMenu(options = {}) {
  const { onDownload: onDownload2, onGetLink: onGetLink2, onRename, onDelete, onCopy, onAddToBasket, onToggleCheckboxes, t } = options;
  const contextItem = ref(null);
  function generateFileMenuItems(item) {
    const items2 = [];
    if (!item.isDirectory) {
      items2.push({
        label: t?.("mount.fileItem.download") || "下载",
        icon: icons.download,
        onClick: () => onDownload2?.(item)
      });
      items2.push({
        label: t?.("mount.fileItem.getLink") || "获取链接",
        icon: icons.link,
        onClick: () => onGetLink2?.(item),
        divided: "down"
      });
    }
    items2.push({
      label: t?.("mount.fileItem.copy") || "复制",
      icon: icons.copy,
      onClick: () => onCopy?.(item)
    });
    items2.push({
      label: t?.("mount.contextMenu.addToBasket") || "添加到文件篮",
      icon: icons.basket,
      onClick: () => onAddToBasket?.(item),
      divided: "down"
    });
    if (!item.isDirectory) {
      items2.push({
        label: t?.("mount.fileItem.rename") || "重命名",
        icon: icons.edit,
        onClick: () => onRename?.(item)
      });
    }
    items2.push({
      label: t?.("mount.fileItem.delete") || "删除",
      icon: icons.delete,
      customClass: "context-menu-danger",
      onClick: () => onDelete?.(item)
    });
    return items2;
  }
  function generateBatchMenuItems(selectedItems) {
    const hasFiles = selectedItems.some((item) => !item.isDirectory);
    const items2 = [];
    if (hasFiles) {
      items2.push({
        label: t?.("mount.contextMenu.batchDownload") || "批量下载",
        icon: icons.download,
        onClick: () => selectedItems.filter((i) => !i.isDirectory).forEach((i) => onDownload2?.(i))
      });
    }
    items2.push({
      label: t?.("mount.contextMenu.batchCopy") || "批量复制",
      icon: icons.copy,
      onClick: () => onCopy?.(selectedItems)
    });
    items2.push({
      label: t?.("mount.contextMenu.batchAddToBasket") || "批量添加到文件篮",
      icon: icons.basket,
      onClick: () => onAddToBasket?.(selectedItems),
      divided: "down"
      // 在此项下方添加分隔线
    });
    items2.push({
      label: t?.("mount.contextMenu.batchDelete") || "批量删除",
      icon: icons.delete,
      customClass: "context-menu-danger",
      onClick: () => onDelete?.(selectedItems)
    });
    return items2;
  }
  function showContextMenu(event, item, selectedItems = [], darkMode2 = false, showCheckboxes = false) {
    event.preventDefault();
    contextItem.value = item;
    const isMultiSelect = selectedItems.length > 1;
    const menuItems = isMultiSelect ? generateBatchMenuItems(selectedItems) : generateFileMenuItems(item);
    if (onToggleCheckboxes) {
      menuItems.unshift({
        label: showCheckboxes ? t?.("mount.contextMenu.hideCheckboxes") || "隐藏勾选框" : t?.("mount.contextMenu.showCheckboxes") || "显示勾选框",
        icon: icons.checkbox,
        onClick: () => onToggleCheckboxes?.(),
        divided: "down"
        // 在此项下方添加分隔线
      });
    }
    Ge.showContextMenu({
      x: event.clientX,
      y: event.clientY,
      items: menuItems,
      theme: darkMode2 ? "mac dark" : "mac",
      zIndex: 1e3
    });
  }
  function hideContextMenu() {
    Ge.closeContextMenu();
    contextItem.value = null;
  }
  return {
    contextItem,
    showContextMenu,
    hideContextMenu,
    generateFileMenuItems,
    generateBatchMenuItems
  };
}
const ViewState = Object.freeze({
  /** 初始状态,还未加载任何内容 */
  INITIAL: "INITIAL",
  /** 正在加载目录列表 */
  LOADING_DIRECTORY: "LOADING_DIRECTORY",
  /** 目录列表已加载完成 */
  DIRECTORY_LOADED: "DIRECTORY_LOADED",
  /** 正在加载文件预览 */
  LOADING_FILE: "LOADING_FILE",
  /** 文件预览已加载完成 */
  FILE_LOADED: "FILE_LOADED",
  /** 需要输入密码才能访问 */
  PASSWORD_REQUIRED: "PASSWORD_REQUIRED",
  /** 发生错误 */
  ERROR: "ERROR"
});
function isLoadingState(state) {
  return state === ViewState.LOADING_DIRECTORY || state === ViewState.LOADING_FILE;
}
function shouldShowDirectory(state) {
  return state === ViewState.DIRECTORY_LOADED || state === ViewState.LOADING_DIRECTORY || state === ViewState.LOADING_FILE || state === ViewState.FILE_LOADED || state === ViewState.INITIAL;
}
function shouldShowFilePreview(state) {
  return state === ViewState.FILE_LOADED || state === ViewState.LOADING_FILE;
}
function isErrorState(state) {
  return state === ViewState.ERROR;
}
function needsPassword(state) {
  return state === ViewState.PASSWORD_REQUIRED;
}
function useViewStateMachine() {
  const viewState = ref(ViewState.INITIAL);
  const directoryData = ref(null);
  const fileData = ref(null);
  const errorInfo = ref(null);
  const isLoading = computed(() => isLoadingState(viewState.value));
  const showDirectory = computed(() => shouldShowDirectory(viewState.value));
  const showFilePreview = computed(() => shouldShowFilePreview(viewState.value));
  const hasError = computed(() => isErrorState(viewState.value));
  const needsPassword$1 = computed(() => needsPassword(viewState.value));
  const previewFileName = computed(() => fileData.value?.name || null);
  function startLoadingDirectory(path) {
    viewState.value = ViewState.LOADING_DIRECTORY;
    errorInfo.value = null;
  }
  function onDirectoryLoaded(data) {
    directoryData.value = data;
    viewState.value = ViewState.DIRECTORY_LOADED;
  }
  function startLoadingFile(filePath, path) {
    viewState.value = ViewState.LOADING_FILE;
    errorInfo.value = null;
  }
  function onFileLoaded(data) {
    fileData.value = data;
    viewState.value = ViewState.FILE_LOADED;
  }
  function closeFilePreview() {
    fileData.value = null;
    if (directoryData.value) {
      viewState.value = ViewState.DIRECTORY_LOADED;
    } else {
      viewState.value = ViewState.INITIAL;
    }
  }
  function requirePassword() {
    viewState.value = ViewState.PASSWORD_REQUIRED;
    errorInfo.value = null;
  }
  function setError(error) {
    viewState.value = ViewState.ERROR;
    if (typeof error === "string") {
      errorInfo.value = { message: error };
    } else if (error instanceof Error) {
      errorInfo.value = { message: error.message, stack: error.stack };
    } else {
      errorInfo.value = error;
    }
  }
  function reset() {
    viewState.value = ViewState.INITIAL;
    directoryData.value = null;
    fileData.value = null;
    errorInfo.value = null;
  }
  function clearError() {
    errorInfo.value = null;
    if (viewState.value === ViewState.ERROR) {
      viewState.value = ViewState.INITIAL;
    }
  }
  return {
    // 状态
    viewState,
    directoryData,
    fileData,
    errorInfo,
    // 计算属性
    isLoading,
    showDirectory,
    showFilePreview,
    hasError,
    needsPassword: needsPassword$1,
    previewFileName,
    // 状态转换方法
    startLoadingDirectory,
    onDirectoryLoaded,
    startLoadingFile,
    onFileLoaded,
    closeFilePreview,
    requirePassword,
    setError,
    clearError,
    reset
  };
}
const HISTORY_LIMIT = 20;
const historyMap = /* @__PURE__ */ new Map();
const PREFETCH_LIMIT = 20;
const prefetchMap = /* @__PURE__ */ new Map();
const isDirRecord = /* @__PURE__ */ new Map();
let cacheEpoch = 0;
const invalidateCachesAfterMutation = () => {
  cacheEpoch += 1;
  historyMap.clear();
  prefetchMap.clear();
  isDirRecord.clear();
};
let storageConfigChangeListenerBound = false;
const bindStorageConfigChangeListener = () => {
  if (storageConfigChangeListenerBound) return;
  if (typeof window === "undefined" || typeof window.addEventListener !== "function") return;
  storageConfigChangeListenerBound = true;
  useEventListener(window, "cloudpaste:storage-config-changed", () => {
    invalidateCachesAfterMutation();
  });
};
bindStorageConfigChangeListener();
const safeClone = (value) => {
  if (value == null) return value;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return value;
  }
};
const encodeFsSegment = (segment) => encodeURIComponent(segment);
const decodeFsSegment = (segment) => {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
};
const encodeFsPathForRoute = (fsPath) => {
  const normalized = normalizeFsPath(fsPath);
  if (normalized === "/") return "";
  const segments = normalized.replace(/^\/+/, "").split("/").filter(Boolean);
  return `/${segments.map(encodeFsSegment).join("/")}`;
};
const decodeFsPathFromRouteRest = (rest) => {
  const raw = typeof rest === "string" ? rest : "";
  const withoutLeading = raw.replace(/^\/+/, "");
  if (!withoutLeading) return "/";
  const segments = withoutLeading.split("/").filter((seg) => seg.length > 0);
  return `/${segments.map(decodeFsSegment).join("/")}`;
};
const setPathAs = (path, dir = true) => {
  const normalized = normalizeFsPath(path);
  if (dir) {
    isDirRecord.set(normalized, true);
  } else {
    isDirRecord.delete(normalized);
  }
};
const getParentDirPath = (filePath) => {
  const normalizedFile = normalizeFsPath(filePath);
  if (normalizedFile === "/") return "/";
  const lastSlash = normalizedFile.lastIndexOf("/");
  if (lastSlash <= 0) return "/";
  return normalizedFile.slice(0, lastSlash) || "/";
};
const buildMountExplorerRoutePath = (fsPath) => {
  const normalized = normalizeFsPath(fsPath);
  if (normalized === "/") return "/mount-explorer";
  return `/mount-explorer${encodeFsPathForRoute(normalized)}`;
};
const parseFsPathFromRoute = (routePath) => {
  if (routePath === "/mount-explorer") return "/";
  if (!routePath.startsWith("/mount-explorer/")) return "/";
  const rest = routePath.slice("/mount-explorer".length);
  return normalizeFsPath(decodeFsPathFromRouteRest(rest));
};
const normalizeRouteKey = (routePath) => {
  if (!routePath) return null;
  return buildMountExplorerRoutePath(normalizeFsPath(parseFsPathFromRoute(routePath)));
};
const shouldRecordHistory = (state) => state !== ViewState.PASSWORD_REQUIRED && state !== ViewState.ERROR;
const setHistory = (key, snapshot) => {
  if (!key) return;
  historyMap.set(key, snapshot);
  if (historyMap.size <= HISTORY_LIMIT) return;
  const firstKey = historyMap.keys().next().value;
  if (firstKey) {
    historyMap.delete(firstKey);
  }
};
const setPrefetch = (key, snapshot) => {
  if (!key) return;
  prefetchMap.set(key, snapshot);
  if (prefetchMap.size <= PREFETCH_LIMIT) return;
  const firstKey = prefetchMap.keys().next().value;
  if (firstKey) {
    prefetchMap.delete(firstKey);
  }
};
const clearHistoryForRoutePath = (routePath) => {
  const key = normalizeRouteKey(routePath) || routePath;
  if (!key) return;
  historyMap.delete(key);
};
function useMountExplorerController() {
  const router = useRouter();
  const route = useRoute();
  const authStore = useAuthStore();
  const fsService = useFsService();
  const log = createLogger("MountExplorerController");
  const stateMachine = useViewStateMachine();
  const currentViewPath = ref("/");
  const currentPath = ref("/");
  const directoryData = stateMachine.directoryData;
  const fileData = stateMachine.fileData;
  const error = ref(null);
  const previewError = ref(null);
  const loading = computed(() => stateMachine.viewState.value === ViewState.LOADING_DIRECTORY);
  const isPreviewLoading = computed(() => stateMachine.viewState.value === ViewState.LOADING_FILE);
  const directoryItems = computed(() => directoryData.value?.items || []);
  const isVirtualDirectory = computed(() => !!directoryData.value?.isVirtual);
  const directoryMeta = computed(() => directoryData.value?.meta || null);
  const directoryNextCursor = computed(() => directoryData.value && typeof directoryData.value.nextCursor === "string" ? directoryData.value.nextCursor : null);
  const directoryHasMore = computed(() => !!directoryNextCursor.value);
  const directoryLoadingMore = ref(false);
  const pendingScrollRestore = ref(null);
  const isAdmin = computed(() => authStore.isAdmin);
  const hasApiKey = computed(() => authStore.isKeyUser && !!authStore.apiKey);
  const hasFilePermission = computed(() => authStore.hasFileSharePermission);
  const hasMountPermission = computed(() => authStore.hasMountPermission);
  const hasPermission = computed(() => authStore.hasMountPermission);
  const apiKeyInfo = computed(() => authStore.apiKeyInfo);
  const hasPermissionForCurrentPath = computed(() => authStore.hasPathPermission(currentPath.value));
  const currentMountId = computed(() => {
    const data = directoryData.value;
    if (data && data.mount_id) {
      return data.mount_id;
    }
    if (data && Array.isArray(data.items)) {
      const mountItem = data.items.find((item) => item.isMount && item.mount_id);
      if (mountItem) {
        return mountItem.mount_id;
      }
    }
    const pathSegments = currentPath.value.split("/").filter(Boolean);
    return pathSegments.length > 0 ? pathSegments[0] : "";
  });
  let skipNextHistoryRecordKey = null;
  const shouldSkipHistoryRecordOnce = (routePath) => {
    const key = normalizeRouteKey(routePath) || routePath;
    if (!key) return false;
    if (!skipNextHistoryRecordKey) return false;
    if (skipNextHistoryRecordKey !== key) return false;
    skipNextHistoryRecordKey = null;
    return true;
  };
  const updateUrl = (fsPath, { replace = false, clearTargetHistory = true } = {}) => {
    const routePath = buildMountExplorerRoutePath(fsPath);
    if (clearTargetHistory) {
      clearHistoryForRoutePath(routePath);
    }
    if (replace) {
      return router.replace({ path: routePath });
    }
    return router.push({ path: routePath });
  };
  const recordHistoryIfNeeded = (routePath) => {
    const key = normalizeRouteKey(routePath);
    if (!key) return false;
    const viewState = stateMachine.viewState.value;
    if (!shouldRecordHistory(viewState)) return false;
    if (directoryData.value == null && fileData.value == null) return false;
    const stableViewState = viewState === ViewState.LOADING_DIRECTORY && directoryData.value != null ? ViewState.DIRECTORY_LOADED : viewState === ViewState.LOADING_FILE && fileData.value != null ? ViewState.FILE_LOADED : viewState;
    const scrollNow = typeof window !== "undefined" ? window.scrollY : 0;
    setHistory(key, {
      kind: "history",
      ts: Date.now(),
      epoch: cacheEpoch,
      viewState: stableViewState,
      currentViewPath: currentViewPath.value,
      currentPath: currentPath.value,
      // 目录数据通常体积较大：在 FILE_LOADED 状态下，直接复用当前对象引用即可，
      // 避免频繁 deep clone 造成 UI 卡顿（例如预览返回列表/前进后退时）。
      directoryData: viewState === ViewState.FILE_LOADED ? directoryData.value : safeClone(directoryData.value),
      fileData: safeClone(fileData.value),
      error: error.value,
      previewError: previewError.value,
      scroll: scrollNow || 0
    });
    return true;
  };
  const recordCurrentRouteHistoryBeforeNavigation = () => {
    const fromPath = route.path;
    const recorded = recordHistoryIfNeeded(fromPath);
    if (recorded) {
      skipNextHistoryRecordKey = normalizeRouteKey(fromPath) || fromPath;
    }
  };
  const navigateTo = async (path) => {
    recordCurrentRouteHistoryBeforeNavigation();
    const normalized = normalizeFsPath(path);
    setPathAs(normalized, true);
    if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
      window.scrollTo(0, 0);
    }
    await updateUrl(normalized);
  };
  const navigateToPreserveHistory = async (path, { replace = false } = {}) => {
    recordCurrentRouteHistoryBeforeNavigation();
    const normalized = normalizeFsPath(path);
    setPathAs(normalized, true);
    await updateUrl(normalized, { replace, clearTargetHistory: false });
  };
  const navigateToFile = async (path) => {
    recordCurrentRouteHistoryBeforeNavigation();
    const normalized = normalizeFsPath(path);
    setPathAs(normalized, false);
    await updateUrl(normalized);
  };
  const stopPreview = () => {
    previewError.value = null;
    stateMachine.closeFilePreview();
    fsService.cancelFileInfoRequest();
  };
  const invalidateCaches = () => {
    invalidateCachesAfterMutation();
    if (typeof fsService.clearDirectoryListCache === "function") {
      fsService.clearDirectoryListCache();
    }
  };
  const removeItemsFromCurrentDirectory = (paths) => {
    if (!paths || !Array.isArray(paths) || paths.length === 0) return;
    const data = directoryData.value;
    if (!data || !Array.isArray(data.items)) return;
    const toRemove = new Set(paths.filter(Boolean));
    if (toRemove.size === 0) return;
    const nextItems = data.items.filter((item) => !toRemove.has(item?.path));
    if (nextItems.length === data.items.length) return;
    directoryData.value = {
      ...data,
      items: nextItems
    };
  };
  const refreshDirectory = async () => {
    await loadDirectory(currentPath.value, { refresh: true });
  };
  const refreshCurrentRoute = async () => {
    await handleRouteChange(route.path);
  };
  const tryRecoverHistory = async (routePath) => {
    const key = normalizeRouteKey(routePath) || routePath;
    if (!key || !historyMap.has(key)) return false;
    const snapshot = historyMap.get(key);
    if (!snapshot) return false;
    if (snapshot.epoch !== cacheEpoch) return false;
    const restoredViewState = snapshot.viewState || ViewState.INITIAL;
    const isPreviewState = restoredViewState === ViewState.FILE_LOADED || restoredViewState === ViewState.LOADING_FILE;
    pendingScrollRestore.value = isPreviewState ? null : snapshot.scroll || 0;
    currentViewPath.value = snapshot.currentViewPath || "/";
    currentPath.value = snapshot.currentPath || "/";
    directoryData.value = snapshot.directoryData || null;
    fileData.value = snapshot.fileData || null;
    error.value = snapshot.error || null;
    previewError.value = snapshot.previewError || null;
    stateMachine.viewState.value = restoredViewState;
    stateMachine.errorInfo.value = null;
    await nextTick();
    return true;
  };
  const tryRecoverPrefetch = async (routePath) => {
    const key = normalizeRouteKey(routePath) || routePath;
    if (!key || !prefetchMap.has(key)) return false;
    const snapshot = prefetchMap.get(key);
    if (!snapshot) return false;
    if (snapshot.epoch !== cacheEpoch) return false;
    const dirPath = normalizeFsPath(snapshot.dirPath || parseFsPathFromRoute(routePath));
    const dirApiPath = toDirApiPath(dirPath);
    setPathAs(dirPath, true);
    currentViewPath.value = dirPath;
    currentPath.value = dirApiPath;
    directoryData.value = snapshot.directoryData || null;
    fileData.value = null;
    error.value = null;
    previewError.value = null;
    stopPreview();
    stateMachine.viewState.value = ViewState.DIRECTORY_LOADED;
    stateMachine.errorInfo.value = null;
    await nextTick();
    if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
      window.scrollTo(0, 0);
    }
    return true;
  };
  const ensureWithinBasicPath = async (fsPath) => {
    const normalized = normalizeFsPath(fsPath);
    if (authStore.isAdmin) return normalized;
    if (!authStore.apiKeyInfo) return normalized;
    const basicPathRaw = authStore.apiKeyInfo.basic_path || "/";
    const basicPath = normalizeFsPath(basicPathRaw);
    if (basicPath === "/") return normalized;
    if (normalized === basicPath || normalized.startsWith(`${basicPath}/`)) {
      return normalized;
    }
    await updateUrl(basicPath, { replace: true });
    return null;
  };
  let activeRouteTask = 0;
  const loadDirectory = async (dirPath, { refresh = false, taskId } = {}) => {
    const targetViewPath = normalizeFsPath(dirPath);
    const targetDirApi = toDirApiPath(targetViewPath);
    const prevDirApi = currentPath.value;
    setPathAs(targetViewPath, true);
    currentViewPath.value = targetViewPath;
    currentPath.value = targetDirApi;
    error.value = null;
    previewError.value = null;
    stopPreview();
    if (!refresh && prevDirApi !== targetDirApi) {
      directoryData.value = null;
    }
    stateMachine.startLoadingDirectory(targetDirApi);
    try {
      const data = await fsService.getDirectoryList(targetDirApi, { refresh });
      if (taskId != null && taskId !== activeRouteTask) return;
      if (data === null) return;
      stateMachine.onDirectoryLoaded(data);
    } catch (e) {
      if (taskId != null && taskId !== activeRouteTask) return;
      if (e?.code === "FS_PATH_PASSWORD_REQUIRED") {
        stateMachine.requirePassword();
        return;
      }
      error.value = e?.message || "加载目录失败";
      stateMachine.setError(e);
    }
  };
  const loadFile = async (filePath, { taskId } = {}) => {
    const targetPath = normalizeFsPath(filePath);
    const parentViewPath = getParentDirPath(targetPath);
    const parentDirApi = toDirApiPath(parentViewPath);
    currentViewPath.value = targetPath;
    currentPath.value = parentDirApi;
    error.value = null;
    previewError.value = null;
    stateMachine.startLoadingFile(targetPath, parentDirApi);
    try {
      const info = await fsService.getFileInfo(targetPath);
      if (taskId != null && taskId !== activeRouteTask) return;
      if (info === null) return;
      const isDirectoryInfo = !!info.isDirectory || info.type === "directory" || info.is_dir === true;
      if (isDirectoryInfo) {
        setPathAs(targetPath, true);
        await loadDirectory(targetPath, { taskId });
        return;
      }
      fileData.value = info;
      setPathAs(targetPath, false);
      stateMachine.onFileLoaded(info);
    } catch (e) {
      if (taskId != null && taskId !== activeRouteTask) return;
      if (e?.code === "FS_PATH_PASSWORD_REQUIRED") {
        stateMachine.requirePassword();
        return;
      }
      await loadDirectory(targetPath, { taskId });
      if (taskId != null && taskId !== activeRouteTask) return;
      if (stateMachine.viewState.value === ViewState.DIRECTORY_LOADED || stateMachine.viewState.value === ViewState.PASSWORD_REQUIRED) {
        return;
      }
      previewError.value = e?.message || "预览失败";
      stateMachine.setError(e);
    }
  };
  const handleRouteChange = async (routePath) => {
    if (!authStore.isAuthenticated) return;
    const taskId = ++activeRouteTask;
    fsService.cancelAllRequests();
    pendingScrollRestore.value = null;
    const fsPath = normalizeFsPath(parseFsPathFromRoute(routePath));
    const allowedPath = await ensureWithinBasicPath(fsPath);
    if (taskId !== activeRouteTask) return;
    if (!allowedPath) return;
    const silentRevalidateDirectory = async () => {
      const expectedTask = taskId;
      const expectedKey = normalizeRouteKey(routePath) || routePath;
      const dirApiPath = currentPath.value;
      const expectedEpoch = cacheEpoch;
      if (stateMachine.viewState.value !== ViewState.DIRECTORY_LOADED) return;
      if (!dirApiPath) return;
      const data = await fsService.prefetchDirectoryList(dirApiPath, { refresh: false, returnNullOnNotModified: true });
      if (expectedTask !== activeRouteTask) return;
      if ((normalizeRouteKey(route.path) || route.path) !== expectedKey) return;
      if (cacheEpoch !== expectedEpoch) return;
      if (!data) return;
      if (stateMachine.viewState.value !== ViewState.DIRECTORY_LOADED) return;
      directoryData.value = data;
    };
    const recovered = await tryRecoverHistory(routePath);
    if (taskId !== activeRouteTask) return;
    if (recovered) {
      void silentRevalidateDirectory();
      return;
    }
    const recoveredPrefetch = await tryRecoverPrefetch(routePath);
    if (taskId !== activeRouteTask) return;
    if (recoveredPrefetch) {
      void silentRevalidateDirectory();
      return;
    }
    if (allowedPath === "/" || isDirRecord.get(allowedPath)) {
      await loadDirectory(allowedPath, { taskId });
      return;
    }
    await loadFile(allowedPath, { taskId });
  };
  const consumePendingScrollRestore = () => {
    const value = pendingScrollRestore.value;
    if (value == null) return null;
    pendingScrollRestore.value = null;
    return value;
  };
  watch(
    () => route.path,
    (newPath, oldPath) => {
      if (!shouldSkipHistoryRecordOnce(oldPath)) {
        recordHistoryIfNeeded(oldPath);
      }
      handleRouteChange(newPath);
    },
    { immediate: true }
  );
  onMounted(async () => {
    if (authStore.needsRevalidation) {
      await authStore.validateAuth();
    }
  });
  const resetCaches = () => {
    historyMap.clear();
    prefetchMap.clear();
    isDirRecord.clear();
  };
  const loadMoreCurrentDirectory = async () => {
    const data = directoryData.value;
    if (!data || !Array.isArray(data.items)) return false;
    const cursor = directoryNextCursor.value;
    if (!cursor) return false;
    if (directoryLoadingMore.value) return false;
    if (loading.value) return false;
    directoryLoadingMore.value = true;
    try {
      const more = await fsService.getDirectoryList(currentPath.value, { cursor });
      if (!more || !Array.isArray(more.items)) {
        return false;
      }
      if (String(more.path || "") !== String(data.path || "")) {
        log.warn("分页目录结果路径不一致，已跳过 append:", { current: data.path, next: more.path });
        return false;
      }
      const existed = new Set(data.items.map((it) => it?.path).filter(Boolean));
      const appended = more.items.filter((it) => it && it.path && !existed.has(it.path));
      directoryData.value = {
        ...data,
        items: [...data.items, ...appended],
        // 后端会对 HF 分页返回 nextCursor
        nextCursor: typeof more.nextCursor === "string" && more.nextCursor ? more.nextCursor : null,
        hasMore: !!more.nextCursor
      };
      return true;
    } catch (e) {
      const msg = e?.message || "加载更多失败";
      log.warn("loadMoreCurrentDirectory failed:", e);
      error.value = msg;
      return false;
    } finally {
      directoryLoadingMore.value = false;
    }
  };
  watch(
    () => `${authStore.authType}|${authStore.isAuthenticated ? "1" : "0"}|${authStore.isAdmin ? "1" : "0"}|${normalizeFsPath(authStore.apiKeyInfo?.basic_path || "/")}`,
    (nextKey, prevKey) => {
      if (prevKey == null) return;
      if (nextKey !== prevKey) {
        resetCaches();
      }
    }
  );
  const prefetchDirectory = async (path) => {
    if (!path) return;
    const dirPath = normalizeFsPath(path);
    setPathAs(dirPath, true);
    const key = buildMountExplorerRoutePath(dirPath);
    if (prefetchMap.has(key)) return;
    try {
      const data = await fsService.prefetchDirectoryList(toDirApiPath(dirPath));
      if (!data) return;
      setPrefetch(key, {
        kind: "prefetch",
        ts: Date.now(),
        epoch: cacheEpoch,
        dirPath,
        directoryData: safeClone(data)
      });
    } catch {
    }
  };
  return {
    // 当前路径（目录上下文）与当前视图路径（可为文件）
    currentPath,
    currentViewPath,
    // 目录与权限状态
    loading,
    error,
    hasPermissionForCurrentPath,
    directoryItems,
    isVirtualDirectory,
    directoryMeta,
    directoryHasMore,
    directoryLoadingMore,
    isAdmin,
    hasApiKey,
    hasFilePermission,
    hasMountPermission,
    hasPermission,
    apiKeyInfo,
    currentMountId,
    // 预览状态
    previewFile: fileData,
    previewInfo: fileData,
    isPreviewLoading,
    previewError,
    // 状态机状态
    viewState: stateMachine.viewState,
    showDirectory: stateMachine.showDirectory,
    showFilePreview: stateMachine.showFilePreview,
    isLoading: stateMachine.isLoading,
    hasError: stateMachine.hasError,
    needsPassword: stateMachine.needsPassword,
    previewFileName: stateMachine.previewFileName,
    // 导航/预览操作
    updateUrl,
    navigateTo,
    navigateToPreserveHistory,
    navigateToFile,
    stopPreview,
    invalidateCaches,
    removeItemsFromCurrentDirectory,
    refreshDirectory,
    refreshCurrentRoute,
    prefetchDirectory,
    consumePendingScrollRestore,
    loadMoreCurrentDirectory
  };
}
const _hoisted_1$b = ["aria-label"];
const _hoisted_2$9 = { class: "flex flex-wrap items-center gap-1" };
const _hoisted_3$6 = { class: "flex items-center" };
const _hoisted_4$6 = { class: "text-base font-medium" };
const _hoisted_5$6 = ["onClick", "onMouseenter"];
const _sfc_main$d = {
  __name: "BreadcrumbNav",
  props: {
    currentPath: {
      type: String,
      required: true,
      default: "/"
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    basicPath: {
      type: String,
      default: "/"
    },
    userType: {
      type: String,
      default: "admin"
      // 'admin' 或 'user'
    }
  },
  emits: ["navigate", "prefetch"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const normalizedBasicPath = computed(() => normalizeFsPath(props.basicPath));
    const normalizedCurrentPath = computed(() => normalizeFsPath(props.currentPath));
    const isApiKeyUser = computed(() => props.userType === "user" && normalizedBasicPath.value !== "/");
    const fullSegments = computed(
      () => normalizedCurrentPath.value.replace(/^\/+/, "").split("/").filter((segment) => segment)
    );
    const basicSegments = computed(
      () => normalizedBasicPath.value.replace(/^\/+/, "").split("/").filter((segment) => segment)
    );
    const isWithinBasicPath = computed(() => {
      if (!isApiKeyUser.value) return true;
      const base = basicSegments.value;
      if (!base.length) return true;
      return base.every((seg, index2) => fullSegments.value[index2] === seg);
    });
    const pathSegments = computed(() => {
      if (!isApiKeyUser.value || !isWithinBasicPath.value) {
        return fullSegments.value;
      }
      return fullSegments.value.slice(basicSegments.value.length);
    });
    const buildTargetPath = (segmentIndex) => {
      const segments = pathSegments.value.slice(0, segmentIndex + 1);
      let targetSegments = segments;
      if (isApiKeyUser.value && isWithinBasicPath.value) {
        targetSegments = [...basicSegments.value, ...segments];
      }
      const targetPath = targetSegments.length > 0 ? `/${targetSegments.join("/")}` : "/";
      if (isApiKeyUser.value) {
        const base = normalizedBasicPath.value;
        if (targetPath !== base && !targetPath.startsWith(`${base}/`)) {
          return null;
        }
      }
      return targetPath;
    };
    const navigateToSegment = (segmentIndex) => {
      const targetPath = buildTargetPath(segmentIndex);
      if (targetPath) {
        emit("navigate", targetPath);
      }
    };
    const prefetchSegment = (segmentIndex) => {
      const targetPath = buildTargetPath(segmentIndex);
      if (targetPath) {
        emit("prefetch", targetPath);
      }
    };
    const navigateToRoot = () => {
      if (isApiKeyUser.value) {
        emit("navigate", normalizedBasicPath.value);
      } else {
        emit("navigate", "/");
      }
    };
    const prefetchRoot = () => {
      if (isApiKeyUser.value) {
        emit("prefetch", normalizedBasicPath.value);
      } else {
        emit("prefetch", "/");
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("nav", {
        class: "flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 sm:gap-0",
        "aria-label": _ctx.$t("breadcrumb.navigation")
      }, [
        createBaseVNode("ol", _hoisted_2$9, [
          createBaseVNode("li", _hoisted_3$6, [
            createBaseVNode("a", {
              href: "#",
              onClick: withModifiers(navigateToRoot, ["prevent"]),
              onMouseenter: prefetchRoot,
              class: normalizeClass(["flex items-center px-2 py-1.5 rounded-md transition-colors duration-200", __props.darkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"])
            }, [
              createVNode(unref(IconHome), {
                size: "sm",
                class: "mr-1.5",
                "aria-hidden": "true"
              }),
              createBaseVNode("span", _hoisted_4$6, toDisplayString(_ctx.$t("breadcrumb.root")), 1)
            ], 34)
          ]),
          (openBlock(true), createElementBlock(Fragment, null, renderList(pathSegments.value, (segment, index2) => {
            return openBlock(), createElementBlock("li", {
              key: index2,
              class: "flex items-center"
            }, [
              createVNode(unref(IconChevronRight), {
                size: "xs",
                class: normalizeClass(["mx-0.5", __props.darkMode ? "text-gray-600" : "text-gray-400"])
              }, null, 8, ["class"]),
              index2 === pathSegments.value.length - 1 ? (openBlock(), createElementBlock("span", {
                key: 0,
                class: normalizeClass(["px-2 py-1.5 rounded-md text-base font-semibold", __props.darkMode ? "text-gray-100 bg-gray-800/50" : "text-gray-900 bg-gray-100"])
              }, toDisplayString(segment), 3)) : (openBlock(), createElementBlock("a", {
                key: 1,
                href: "#",
                onClick: withModifiers(($event) => navigateToSegment(index2), ["prevent"]),
                onMouseenter: ($event) => prefetchSegment(index2),
                class: normalizeClass([
                  "px-2 py-1.5 rounded-md text-base font-medium transition-colors duration-200",
                  __props.darkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                ])
              }, toDisplayString(segment), 43, _hoisted_5$6))
            ]);
          }), 128))
        ])
      ], 8, _hoisted_1$b);
    };
  }
};
function memo(getDeps, fn, opts) {
  let deps = opts.initialDeps ?? [];
  let result;
  function memoizedFunction() {
    var _a, _b, _c, _d;
    let depTime;
    if (opts.key && ((_a = opts.debug) == null ? void 0 : _a.call(opts))) depTime = Date.now();
    const newDeps = getDeps();
    const depsChanged = newDeps.length !== deps.length || newDeps.some((dep, index2) => deps[index2] !== dep);
    if (!depsChanged) {
      return result;
    }
    deps = newDeps;
    let resultTime;
    if (opts.key && ((_b = opts.debug) == null ? void 0 : _b.call(opts))) resultTime = Date.now();
    result = fn(...newDeps);
    if (opts.key && ((_c = opts.debug) == null ? void 0 : _c.call(opts))) {
      const depEndTime = Math.round((Date.now() - depTime) * 100) / 100;
      const resultEndTime = Math.round((Date.now() - resultTime) * 100) / 100;
      const resultFpsPercentage = resultEndTime / 16;
      const pad = (str, num) => {
        str = String(str);
        while (str.length < num) {
          str = " " + str;
        }
        return str;
      };
      console.info(
        `%c⏱ ${pad(resultEndTime, 5)} /${pad(depEndTime, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
          0,
          Math.min(120 - 120 * resultFpsPercentage, 120)
        )}deg 100% 31%);`,
        opts == null ? void 0 : opts.key
      );
    }
    (_d = opts == null ? void 0 : opts.onChange) == null ? void 0 : _d.call(opts, result);
    return result;
  }
  memoizedFunction.updateDeps = (newDeps) => {
    deps = newDeps;
  };
  return memoizedFunction;
}
function notUndefined(value, msg) {
  if (value === void 0) {
    throw new Error(`Unexpected undefined${""}`);
  } else {
    return value;
  }
}
const approxEqual = (a, b) => Math.abs(a - b) < 1.01;
const debounce = (targetWindow, fn, ms) => {
  let timeoutId;
  return function(...args) {
    targetWindow.clearTimeout(timeoutId);
    timeoutId = targetWindow.setTimeout(() => fn.apply(this, args), ms);
  };
};
const defaultKeyExtractor = (index2) => index2;
const defaultRangeExtractor = (range) => {
  const start = Math.max(range.startIndex - range.overscan, 0);
  const end = Math.min(range.endIndex + range.overscan, range.count - 1);
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
};
const addEventListenerOptions = {
  passive: true
};
const observeWindowRect = (instance, cb) => {
  const element = instance.scrollElement;
  if (!element) {
    return;
  }
  const handler = () => {
    cb({ width: element.innerWidth, height: element.innerHeight });
  };
  handler();
  element.addEventListener("resize", handler, addEventListenerOptions);
  return () => {
    element.removeEventListener("resize", handler);
  };
};
const supportsScrollend = typeof window == "undefined" ? true : "onscrollend" in window;
const observeWindowOffset = (instance, cb) => {
  const element = instance.scrollElement;
  if (!element) {
    return;
  }
  const targetWindow = instance.targetWindow;
  if (!targetWindow) {
    return;
  }
  let offset = 0;
  const fallback = instance.options.useScrollendEvent && supportsScrollend ? () => void 0 : debounce(
    targetWindow,
    () => {
      cb(offset, false);
    },
    instance.options.isScrollingResetDelay
  );
  const createHandler = (isScrolling) => () => {
    offset = element[instance.options.horizontal ? "scrollX" : "scrollY"];
    fallback();
    cb(offset, isScrolling);
  };
  const handler = createHandler(true);
  const endHandler = createHandler(false);
  endHandler();
  element.addEventListener("scroll", handler, addEventListenerOptions);
  const registerScrollendEvent = instance.options.useScrollendEvent && supportsScrollend;
  if (registerScrollendEvent) {
    element.addEventListener("scrollend", endHandler, addEventListenerOptions);
  }
  return () => {
    element.removeEventListener("scroll", handler);
    if (registerScrollendEvent) {
      element.removeEventListener("scrollend", endHandler);
    }
  };
};
const measureElement = (element, entry, instance) => {
  if (entry == null ? void 0 : entry.borderBoxSize) {
    const box = entry.borderBoxSize[0];
    if (box) {
      const size = Math.round(
        box[instance.options.horizontal ? "inlineSize" : "blockSize"]
      );
      return size;
    }
  }
  return element[instance.options.horizontal ? "offsetWidth" : "offsetHeight"];
};
const windowScroll = (offset, {
  adjustments = 0,
  behavior
}, instance) => {
  var _a, _b;
  const toOffset = offset + adjustments;
  (_b = (_a = instance.scrollElement) == null ? void 0 : _a.scrollTo) == null ? void 0 : _b.call(_a, {
    [instance.options.horizontal ? "left" : "top"]: toOffset,
    behavior
  });
};
class Virtualizer {
  constructor(opts) {
    this.unsubs = [];
    this.scrollElement = null;
    this.targetWindow = null;
    this.isScrolling = false;
    this.measurementsCache = [];
    this.itemSizeCache = /* @__PURE__ */ new Map();
    this.pendingMeasuredCacheIndexes = [];
    this.scrollRect = null;
    this.scrollOffset = null;
    this.scrollDirection = null;
    this.scrollAdjustments = 0;
    this.elementsCache = /* @__PURE__ */ new Map();
    this.observer = /* @__PURE__ */ (() => {
      let _ro = null;
      const get = () => {
        if (_ro) {
          return _ro;
        }
        if (!this.targetWindow || !this.targetWindow.ResizeObserver) {
          return null;
        }
        return _ro = new this.targetWindow.ResizeObserver((entries) => {
          entries.forEach((entry) => {
            const run = () => {
              this._measureElement(entry.target, entry);
            };
            this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(run) : run();
          });
        });
      };
      return {
        disconnect: () => {
          var _a;
          (_a = get()) == null ? void 0 : _a.disconnect();
          _ro = null;
        },
        observe: (target) => {
          var _a;
          return (_a = get()) == null ? void 0 : _a.observe(target, { box: "border-box" });
        },
        unobserve: (target) => {
          var _a;
          return (_a = get()) == null ? void 0 : _a.unobserve(target);
        }
      };
    })();
    this.range = null;
    this.setOptions = (opts2) => {
      Object.entries(opts2).forEach(([key, value]) => {
        if (typeof value === "undefined") delete opts2[key];
      });
      this.options = {
        debug: false,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: false,
        getItemKey: defaultKeyExtractor,
        rangeExtractor: defaultRangeExtractor,
        onChange: () => {
        },
        measureElement,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        isScrollingResetDelay: 150,
        enabled: true,
        isRtl: false,
        useScrollendEvent: false,
        useAnimationFrameWithResizeObserver: false,
        ...opts2
      };
    };
    this.notify = (sync) => {
      var _a, _b;
      (_b = (_a = this.options).onChange) == null ? void 0 : _b.call(_a, this, sync);
    };
    this.maybeNotify = memo(
      () => {
        this.calculateRange();
        return [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ];
      },
      (isScrolling) => {
        this.notify(isScrolling);
      },
      {
        key: false,
        debug: () => this.options.debug,
        initialDeps: [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ]
      }
    );
    this.cleanup = () => {
      this.unsubs.filter(Boolean).forEach((d) => d());
      this.unsubs = [];
      this.observer.disconnect();
      this.scrollElement = null;
      this.targetWindow = null;
    };
    this._didMount = () => {
      return () => {
        this.cleanup();
      };
    };
    this._willUpdate = () => {
      var _a;
      const scrollElement = this.options.enabled ? this.options.getScrollElement() : null;
      if (this.scrollElement !== scrollElement) {
        this.cleanup();
        if (!scrollElement) {
          this.maybeNotify();
          return;
        }
        this.scrollElement = scrollElement;
        if (this.scrollElement && "ownerDocument" in this.scrollElement) {
          this.targetWindow = this.scrollElement.ownerDocument.defaultView;
        } else {
          this.targetWindow = ((_a = this.scrollElement) == null ? void 0 : _a.window) ?? null;
        }
        this.elementsCache.forEach((cached) => {
          this.observer.observe(cached);
        });
        this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        });
        this.unsubs.push(
          this.options.observeElementRect(this, (rect) => {
            this.scrollRect = rect;
            this.maybeNotify();
          })
        );
        this.unsubs.push(
          this.options.observeElementOffset(this, (offset, isScrolling) => {
            this.scrollAdjustments = 0;
            this.scrollDirection = isScrolling ? this.getScrollOffset() < offset ? "forward" : "backward" : null;
            this.scrollOffset = offset;
            this.isScrolling = isScrolling;
            this.maybeNotify();
          })
        );
      }
    };
    this.getSize = () => {
      if (!this.options.enabled) {
        this.scrollRect = null;
        return 0;
      }
      this.scrollRect = this.scrollRect ?? this.options.initialRect;
      return this.scrollRect[this.options.horizontal ? "width" : "height"];
    };
    this.getScrollOffset = () => {
      if (!this.options.enabled) {
        this.scrollOffset = null;
        return 0;
      }
      this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset === "function" ? this.options.initialOffset() : this.options.initialOffset);
      return this.scrollOffset;
    };
    this.getFurthestMeasurement = (measurements, index2) => {
      const furthestMeasurementsFound = /* @__PURE__ */ new Map();
      const furthestMeasurements = /* @__PURE__ */ new Map();
      for (let m = index2 - 1; m >= 0; m--) {
        const measurement = measurements[m];
        if (furthestMeasurementsFound.has(measurement.lane)) {
          continue;
        }
        const previousFurthestMeasurement = furthestMeasurements.get(
          measurement.lane
        );
        if (previousFurthestMeasurement == null || measurement.end > previousFurthestMeasurement.end) {
          furthestMeasurements.set(measurement.lane, measurement);
        } else if (measurement.end < previousFurthestMeasurement.end) {
          furthestMeasurementsFound.set(measurement.lane, true);
        }
        if (furthestMeasurementsFound.size === this.options.lanes) {
          break;
        }
      }
      return furthestMeasurements.size === this.options.lanes ? Array.from(furthestMeasurements.values()).sort((a, b) => {
        if (a.end === b.end) {
          return a.index - b.index;
        }
        return a.end - b.end;
      })[0] : void 0;
    };
    this.getMeasurementOptions = memo(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled
      ],
      (count, paddingStart, scrollMargin, getItemKey, enabled) => {
        this.pendingMeasuredCacheIndexes = [];
        return {
          count,
          paddingStart,
          scrollMargin,
          getItemKey,
          enabled
        };
      },
      {
        key: false
      }
    );
    this.getMeasurements = memo(
      () => [this.getMeasurementOptions(), this.itemSizeCache],
      ({ count, paddingStart, scrollMargin, getItemKey, enabled }, itemSizeCache) => {
        if (!enabled) {
          this.measurementsCache = [];
          this.itemSizeCache.clear();
          return [];
        }
        if (this.measurementsCache.length === 0) {
          this.measurementsCache = this.options.initialMeasurementsCache;
          this.measurementsCache.forEach((item) => {
            this.itemSizeCache.set(item.key, item.size);
          });
        }
        const min = this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
        this.pendingMeasuredCacheIndexes = [];
        const measurements = this.measurementsCache.slice(0, min);
        for (let i = min; i < count; i++) {
          const key = getItemKey(i);
          const furthestMeasurement = this.options.lanes === 1 ? measurements[i - 1] : this.getFurthestMeasurement(measurements, i);
          const start = furthestMeasurement ? furthestMeasurement.end + this.options.gap : paddingStart + scrollMargin;
          const measuredSize = itemSizeCache.get(key);
          const size = typeof measuredSize === "number" ? measuredSize : this.options.estimateSize(i);
          const end = start + size;
          const lane = furthestMeasurement ? furthestMeasurement.lane : i % this.options.lanes;
          measurements[i] = {
            index: i,
            start,
            size,
            end,
            key,
            lane
          };
        }
        this.measurementsCache = measurements;
        return measurements;
      },
      {
        key: false,
        debug: () => this.options.debug
      }
    );
    this.calculateRange = memo(
      () => [
        this.getMeasurements(),
        this.getSize(),
        this.getScrollOffset(),
        this.options.lanes
      ],
      (measurements, outerSize, scrollOffset, lanes) => {
        return this.range = measurements.length > 0 && outerSize > 0 ? calculateRange({
          measurements,
          outerSize,
          scrollOffset,
          lanes
        }) : null;
      },
      {
        key: false,
        debug: () => this.options.debug
      }
    );
    this.getVirtualIndexes = memo(
      () => {
        let startIndex = null;
        let endIndex = null;
        const range = this.calculateRange();
        if (range) {
          startIndex = range.startIndex;
          endIndex = range.endIndex;
        }
        this.maybeNotify.updateDeps([this.isScrolling, startIndex, endIndex]);
        return [
          this.options.rangeExtractor,
          this.options.overscan,
          this.options.count,
          startIndex,
          endIndex
        ];
      },
      (rangeExtractor, overscan, count, startIndex, endIndex) => {
        return startIndex === null || endIndex === null ? [] : rangeExtractor({
          startIndex,
          endIndex,
          overscan,
          count
        });
      },
      {
        key: false,
        debug: () => this.options.debug
      }
    );
    this.indexFromElement = (node) => {
      const attributeName = this.options.indexAttribute;
      const indexStr = node.getAttribute(attributeName);
      if (!indexStr) {
        console.warn(
          `Missing attribute name '${attributeName}={index}' on measured element.`
        );
        return -1;
      }
      return parseInt(indexStr, 10);
    };
    this._measureElement = (node, entry) => {
      const index2 = this.indexFromElement(node);
      const item = this.measurementsCache[index2];
      if (!item) {
        return;
      }
      const key = item.key;
      const prevNode = this.elementsCache.get(key);
      if (prevNode !== node) {
        if (prevNode) {
          this.observer.unobserve(prevNode);
        }
        this.observer.observe(node);
        this.elementsCache.set(key, node);
      }
      if (node.isConnected) {
        this.resizeItem(index2, this.options.measureElement(node, entry, this));
      }
    };
    this.resizeItem = (index2, size) => {
      const item = this.measurementsCache[index2];
      if (!item) {
        return;
      }
      const itemSize = this.itemSizeCache.get(item.key) ?? item.size;
      const delta = size - itemSize;
      if (delta !== 0) {
        if (this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(item, delta, this) : item.start < this.getScrollOffset() + this.scrollAdjustments) {
          this._scrollToOffset(this.getScrollOffset(), {
            adjustments: this.scrollAdjustments += delta,
            behavior: void 0
          });
        }
        this.pendingMeasuredCacheIndexes.push(item.index);
        this.itemSizeCache = new Map(this.itemSizeCache.set(item.key, size));
        this.notify(false);
      }
    };
    this.measureElement = (node) => {
      if (!node) {
        this.elementsCache.forEach((cached, key) => {
          if (!cached.isConnected) {
            this.observer.unobserve(cached);
            this.elementsCache.delete(key);
          }
        });
        return;
      }
      this._measureElement(node, void 0);
    };
    this.getVirtualItems = memo(
      () => [this.getVirtualIndexes(), this.getMeasurements()],
      (indexes, measurements) => {
        const virtualItems = [];
        for (let k = 0, len = indexes.length; k < len; k++) {
          const i = indexes[k];
          const measurement = measurements[i];
          virtualItems.push(measurement);
        }
        return virtualItems;
      },
      {
        key: false,
        debug: () => this.options.debug
      }
    );
    this.getVirtualItemForOffset = (offset) => {
      const measurements = this.getMeasurements();
      if (measurements.length === 0) {
        return void 0;
      }
      return notUndefined(
        measurements[findNearestBinarySearch(
          0,
          measurements.length - 1,
          (index2) => notUndefined(measurements[index2]).start,
          offset
        )]
      );
    };
    this.getOffsetForAlignment = (toOffset, align, itemSize = 0) => {
      const size = this.getSize();
      const scrollOffset = this.getScrollOffset();
      if (align === "auto") {
        align = toOffset >= scrollOffset + size ? "end" : "start";
      }
      if (align === "center") {
        toOffset += (itemSize - size) / 2;
      } else if (align === "end") {
        toOffset -= size;
      }
      const maxOffset = this.getTotalSize() + this.options.scrollMargin - size;
      return Math.max(Math.min(maxOffset, toOffset), 0);
    };
    this.getOffsetForIndex = (index2, align = "auto") => {
      index2 = Math.max(0, Math.min(index2, this.options.count - 1));
      const item = this.measurementsCache[index2];
      if (!item) {
        return void 0;
      }
      const size = this.getSize();
      const scrollOffset = this.getScrollOffset();
      if (align === "auto") {
        if (item.end >= scrollOffset + size - this.options.scrollPaddingEnd) {
          align = "end";
        } else if (item.start <= scrollOffset + this.options.scrollPaddingStart) {
          align = "start";
        } else {
          return [scrollOffset, align];
        }
      }
      const toOffset = align === "end" ? item.end + this.options.scrollPaddingEnd : item.start - this.options.scrollPaddingStart;
      return [
        this.getOffsetForAlignment(toOffset, align, item.size),
        align
      ];
    };
    this.isDynamicMode = () => this.elementsCache.size > 0;
    this.scrollToOffset = (toOffset, { align = "start", behavior } = {}) => {
      if (behavior === "smooth" && this.isDynamicMode()) {
        console.warn(
          "The `smooth` scroll behavior is not fully supported with dynamic size."
        );
      }
      this._scrollToOffset(this.getOffsetForAlignment(toOffset, align), {
        adjustments: void 0,
        behavior
      });
    };
    this.scrollToIndex = (index2, { align: initialAlign = "auto", behavior } = {}) => {
      if (behavior === "smooth" && this.isDynamicMode()) {
        console.warn(
          "The `smooth` scroll behavior is not fully supported with dynamic size."
        );
      }
      index2 = Math.max(0, Math.min(index2, this.options.count - 1));
      let attempts = 0;
      const maxAttempts = 10;
      const tryScroll = (currentAlign) => {
        if (!this.targetWindow) return;
        const offsetInfo = this.getOffsetForIndex(index2, currentAlign);
        if (!offsetInfo) {
          console.warn("Failed to get offset for index:", index2);
          return;
        }
        const [offset, align] = offsetInfo;
        this._scrollToOffset(offset, { adjustments: void 0, behavior });
        this.targetWindow.requestAnimationFrame(() => {
          const currentOffset = this.getScrollOffset();
          const afterInfo = this.getOffsetForIndex(index2, align);
          if (!afterInfo) {
            console.warn("Failed to get offset for index:", index2);
            return;
          }
          if (!approxEqual(afterInfo[0], currentOffset)) {
            scheduleRetry(align);
          }
        });
      };
      const scheduleRetry = (align) => {
        if (!this.targetWindow) return;
        attempts++;
        if (attempts < maxAttempts) {
          this.targetWindow.requestAnimationFrame(() => tryScroll(align));
        } else {
          console.warn(
            `Failed to scroll to index ${index2} after ${maxAttempts} attempts.`
          );
        }
      };
      tryScroll(initialAlign);
    };
    this.scrollBy = (delta, { behavior } = {}) => {
      if (behavior === "smooth" && this.isDynamicMode()) {
        console.warn(
          "The `smooth` scroll behavior is not fully supported with dynamic size."
        );
      }
      this._scrollToOffset(this.getScrollOffset() + delta, {
        adjustments: void 0,
        behavior
      });
    };
    this.getTotalSize = () => {
      var _a;
      const measurements = this.getMeasurements();
      let end;
      if (measurements.length === 0) {
        end = this.options.paddingStart;
      } else if (this.options.lanes === 1) {
        end = ((_a = measurements[measurements.length - 1]) == null ? void 0 : _a.end) ?? 0;
      } else {
        const endByLane = Array(this.options.lanes).fill(null);
        let endIndex = measurements.length - 1;
        while (endIndex >= 0 && endByLane.some((val) => val === null)) {
          const item = measurements[endIndex];
          if (endByLane[item.lane] === null) {
            endByLane[item.lane] = item.end;
          }
          endIndex--;
        }
        end = Math.max(...endByLane.filter((val) => val !== null));
      }
      return Math.max(
        end - this.options.scrollMargin + this.options.paddingEnd,
        0
      );
    };
    this._scrollToOffset = (offset, {
      adjustments,
      behavior
    }) => {
      this.options.scrollToFn(offset, { behavior, adjustments }, this);
    };
    this.measure = () => {
      this.itemSizeCache = /* @__PURE__ */ new Map();
      this.notify(false);
    };
    this.setOptions(opts);
  }
}
const findNearestBinarySearch = (low, high, getCurrentValue, value) => {
  while (low <= high) {
    const middle = (low + high) / 2 | 0;
    const currentValue = getCurrentValue(middle);
    if (currentValue < value) {
      low = middle + 1;
    } else if (currentValue > value) {
      high = middle - 1;
    } else {
      return middle;
    }
  }
  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
};
function calculateRange({
  measurements,
  outerSize,
  scrollOffset,
  lanes
}) {
  const lastIndex = measurements.length - 1;
  const getOffset = (index2) => measurements[index2].start;
  if (measurements.length <= lanes) {
    return {
      startIndex: 0,
      endIndex: lastIndex
    };
  }
  let startIndex = findNearestBinarySearch(
    0,
    lastIndex,
    getOffset,
    scrollOffset
  );
  let endIndex = startIndex;
  if (lanes === 1) {
    while (endIndex < lastIndex && measurements[endIndex].end < scrollOffset + outerSize) {
      endIndex++;
    }
  } else if (lanes > 1) {
    const endPerLane = Array(lanes).fill(0);
    while (endIndex < lastIndex && endPerLane.some((pos) => pos < scrollOffset + outerSize)) {
      const item = measurements[endIndex];
      endPerLane[item.lane] = item.end;
      endIndex++;
    }
    const startPerLane = Array(lanes).fill(scrollOffset + outerSize);
    while (startIndex >= 0 && startPerLane.some((pos) => pos >= scrollOffset)) {
      const item = measurements[startIndex];
      startPerLane[item.lane] = item.start;
      startIndex--;
    }
    startIndex = Math.max(0, startIndex - startIndex % lanes);
    endIndex = Math.min(lastIndex, endIndex + (lanes - 1 - endIndex % lanes));
  }
  return { startIndex, endIndex };
}
function useVirtualizerBase(options) {
  const virtualizer = new Virtualizer(unref(options));
  const state = shallowRef(virtualizer);
  const cleanup = virtualizer._didMount();
  watch(
    () => unref(options).getScrollElement(),
    (el) => {
      if (el) {
        virtualizer._willUpdate();
      }
    },
    {
      immediate: true
    }
  );
  watch(
    () => unref(options),
    (options2) => {
      virtualizer.setOptions({
        ...options2,
        onChange: (instance, sync) => {
          var _a;
          triggerRef(state);
          (_a = options2.onChange) == null ? void 0 : _a.call(options2, instance, sync);
        }
      });
      virtualizer._willUpdate();
      triggerRef(state);
    },
    {
      immediate: true
    }
  );
  onScopeDispose(cleanup);
  return state;
}
function useWindowVirtualizer(options) {
  return useVirtualizerBase(
    computed(() => ({
      getScrollElement: () => typeof document !== "undefined" ? window : null,
      observeElementRect: observeWindowRect,
      observeElementOffset: observeWindowOffset,
      scrollToFn: windowScroll,
      initialOffset: () => typeof document !== "undefined" ? window.scrollY : 0,
      ...unref(options)
    }))
  );
}
const _hoisted_1$a = ["checked"];
const _hoisted_2$8 = { class: "file-item__icon" };
const _hoisted_3$5 = ["innerHTML"];
const _hoisted_4$5 = ["title"];
const _hoisted_5$5 = ["data-name"];
const _hoisted_6$5 = ["title"];
const _hoisted_7$5 = { key: 0 };
const _hoisted_8$5 = ["title"];
const _hoisted_9$5 = {
  key: 0,
  class: "file-item__meta-marker"
};
const _hoisted_10$5 = { key: 0 };
const _hoisted_11$5 = ["title"];
const _hoisted_12$5 = {
  key: 0,
  class: "file-item__meta-marker"
};
const _hoisted_13$5 = { key: 0 };
const _hoisted_14$5 = ["title"];
const _hoisted_15$4 = {
  key: 0,
  class: "file-item__meta-marker"
};
const _hoisted_16$4 = {
  key: 1,
  class: "file-item__actions"
};
const _hoisted_17$4 = { class: "file-item__actions-inner" };
const _hoisted_18$3 = ["title"];
const _hoisted_19$2 = ["title"];
const _hoisted_20$2 = ["title"];
const _hoisted_21$2 = ["title"];
const _sfc_main$c = {
  __name: "FileItem",
  props: {
    item: { type: Object, required: true },
    darkMode: { type: Boolean, default: false },
    showCheckboxes: { type: Boolean, default: false },
    isSelected: { type: Boolean, default: false },
    // 右键菜单高亮状态（临时高亮，不是勾选选中）
    isContextHighlight: { type: Boolean, default: false },
    currentPath: { type: String, required: true },
    index: { type: Number, default: 0 },
    animationsEnabled: { type: Boolean, default: true },
    // 文件名过长处理模式: ellipsis(省略号) | scroll(滚动) | wrap(换行)
    fileNameOverflow: { type: String, default: "ellipsis" },
    // 是否显示操作按钮列
    showActionButtons: { type: Boolean, default: true }
  },
  emits: ["click", "download", "rename", "delete", "select", "getLink", "contextmenu"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const fileIcon = computed(() => getFileIcon(props.item, props.darkMode));
    const isEntering = ref(true);
    const enterDelay = computed(() => Math.min(props.index * 30, 300));
    onMounted(() => {
      if (props.animationsEnabled) {
        setTimeout(() => {
          isEntering.value = false;
        }, 300 + enterDelay.value);
      } else {
        isEntering.value = false;
      }
    });
    const handleClick = () => {
      emit("click", props.item);
    };
    const toggleSelect = () => {
      emit("select", props.item, !props.isSelected);
    };
    const handleContextMenu = (event) => {
      emit("contextmenu", { event, item: props.item });
    };
    const isValidSize = (value) => typeof value === "number" && Number.isFinite(value) && value >= 0;
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      return formatDateTime(dateString);
    };
    const formatSize = (value) => {
      if (!isValidSize(value)) return "-";
      return formatFileSize(value);
    };
    const sizeMarker = computed(() => {
      if (!props.item?.isDirectory || props.item?.isVirtual) return "";
      if (!isValidSize(props.item?.size)) return "";
      if (props.item?.size_source === "index") return "≈";
      if (props.item?.size_source === "compute") return "*";
      return "";
    });
    const sizeTitle = computed(() => {
      if (!props.item?.isDirectory || props.item?.isVirtual) return void 0;
      if (!isValidSize(props.item?.size)) return void 0;
      if (props.item?.size_source === "index") return "索引计算（无法实时）";
      if (props.item?.size_source === "compute") return "递归计算（性能损耗）";
      return void 0;
    });
    const modifiedMarker = computed(() => {
      if (!props.item?.isDirectory || props.item?.isVirtual) return "";
      if (!props.item?.modified) return "";
      if (props.item?.modified_source === "index") return "≈";
      if (props.item?.modified_source === "compute") return "*";
      return "";
    });
    const modifiedTitle = computed(() => {
      if (!props.item?.isDirectory || props.item?.isVirtual) return void 0;
      if (!props.item?.modified) return void 0;
      if (props.item?.modified_source === "index") return "时间来自索引兜底（不一定实时）";
      if (props.item?.modified_source === "compute") return "时间来自递归计算（可能较慢）";
      return void 0;
    });
    const storageBackendBadge = computed(() => {
      if (props.item?.isDirectory) return "";
      const backend = String(props.item?.storage_backend || "").toLowerCase();
      if (backend === "xet") return "Xet";
      if (backend === "lfs") return "LFS";
      return "";
    });
    const storageBackendBadgeClass = computed(() => {
      const backend = String(props.item?.storage_backend || "").toLowerCase();
      if (backend === "xet") return "file-item__backend-badge--xet";
      if (backend === "lfs") return "file-item__backend-badge--lfs";
      return "";
    });
    const storageBackendBadgeTitle = computed(() => {
      const backend = String(props.item?.storage_backend || "").toLowerCase();
      if (backend === "xet") return "HF Xet 存储";
      if (backend === "lfs") return "Git LFS 指针文件";
      return void 0;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["file-item group", [
          __props.isSelected ? "file-item--selected" : "",
          __props.isContextHighlight && !__props.isSelected ? "file-item--context-highlight" : "",
          isEntering.value && __props.animationsEnabled ? "file-item--entering" : "",
          __props.darkMode ? "file-item--dark" : "file-item--light"
        ]]),
        style: normalizeStyle({ "--enter-delay": `${enterDelay.value}ms` }),
        onClick: handleClick,
        onContextmenu: withModifiers(handleContextMenu, ["prevent"])
      }, [
        __props.showCheckboxes ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "file-item__checkbox",
          onClick: withModifiers(toggleSelect, ["stop"])
        }, [
          createBaseVNode("input", {
            type: "checkbox",
            checked: __props.isSelected,
            class: normalizeClass(["h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer", __props.darkMode ? "bg-gray-700 border-gray-500" : ""])
          }, null, 10, _hoisted_1$a)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_2$8, [
          createBaseVNode("span", { innerHTML: fileIcon.value }, null, 8, _hoisted_3$5)
        ]),
        createBaseVNode("div", {
          class: "file-item__info",
          onClick: handleClick
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["file-item__name", [
              __props.darkMode ? "text-gray-200" : "text-gray-700"
            ]]),
            title: __props.fileNameOverflow === "ellipsis" ? __props.item.name : void 0
          }, [
            createBaseVNode("span", {
              class: normalizeClass(["file-item__name-text", `file-item__name--${__props.fileNameOverflow}`]),
              "data-name": __props.item.name
            }, toDisplayString(__props.item.name), 11, _hoisted_5$5),
            storageBackendBadge.value ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(["file-item__backend-badge", storageBackendBadgeClass.value]),
              title: storageBackendBadgeTitle.value
            }, toDisplayString(storageBackendBadge.value), 11, _hoisted_6$5)) : createCommentVNode("", true)
          ], 10, _hoisted_4$5),
          createBaseVNode("div", {
            class: normalizeClass(["file-item__size-mobile", __props.darkMode ? "text-gray-400" : "text-gray-500"])
          }, [
            __props.item.isDirectory && __props.item.isVirtual ? (openBlock(), createElementBlock("span", _hoisted_7$5, "-")) : (openBlock(), createElementBlock("span", {
              key: 1,
              title: sizeTitle.value
            }, [
              createTextVNode(toDisplayString(formatSize(__props.item.size)) + " ", 1),
              sizeMarker.value ? (openBlock(), createElementBlock("span", _hoisted_9$5, toDisplayString(sizeMarker.value), 1)) : createCommentVNode("", true)
            ], 8, _hoisted_8$5))
          ], 2)
        ]),
        createBaseVNode("div", {
          class: normalizeClass(["file-item__size", __props.darkMode ? "text-gray-400" : "text-gray-500"])
        }, [
          __props.item.isDirectory && __props.item.isVirtual ? (openBlock(), createElementBlock("span", _hoisted_10$5, "-")) : (openBlock(), createElementBlock("span", {
            key: 1,
            title: sizeTitle.value
          }, [
            createTextVNode(toDisplayString(formatSize(__props.item.size)) + " ", 1),
            sizeMarker.value ? (openBlock(), createElementBlock("span", _hoisted_12$5, toDisplayString(sizeMarker.value), 1)) : createCommentVNode("", true)
          ], 8, _hoisted_11$5))
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(["file-item__time", __props.darkMode ? "text-gray-400" : "text-gray-500"])
        }, [
          __props.item.isDirectory && __props.item.isVirtual ? (openBlock(), createElementBlock("span", _hoisted_13$5, "-")) : (openBlock(), createElementBlock("span", {
            key: 1,
            title: modifiedTitle.value
          }, [
            createTextVNode(toDisplayString(formatDate(__props.item.modified)) + " ", 1),
            modifiedMarker.value ? (openBlock(), createElementBlock("span", _hoisted_15$4, toDisplayString(modifiedMarker.value), 1)) : createCommentVNode("", true)
          ], 8, _hoisted_14$5))
        ], 2),
        __props.showActionButtons ? (openBlock(), createElementBlock("div", _hoisted_16$4, [
          createBaseVNode("div", _hoisted_17$4, [
            !__props.item.isDirectory ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.$emit("download", __props.item), ["stop"])),
              class: "file-item__action-btn w-8 h-8 rounded-full flex items-center justify-center transition-all bg-transparent text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transform hover:scale-110",
              title: unref(t)("mount.fileItem.download")
            }, [
              createVNode(unref(IconDownload), {
                class: "w-4 h-4 sm:w-5 sm:h-5",
                "aria-hidden": "true"
              })
            ], 8, _hoisted_18$3)) : createCommentVNode("", true),
            !__props.item.isDirectory ? (openBlock(), createElementBlock("button", {
              key: 1,
              onClick: _cache[1] || (_cache[1] = withModifiers(($event) => _ctx.$emit("getLink", __props.item), ["stop"])),
              class: "file-item__action-btn w-8 h-8 rounded-full flex items-center justify-center transition-all bg-transparent text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transform hover:scale-110",
              title: unref(t)("mount.fileItem.getLink")
            }, [
              createVNode(unref(IconLink), {
                class: "w-4 h-4 sm:w-5 sm:h-5",
                "aria-hidden": "true"
              })
            ], 8, _hoisted_19$2)) : createCommentVNode("", true),
            !__props.item.isDirectory ? (openBlock(), createElementBlock("button", {
              key: 2,
              onClick: _cache[2] || (_cache[2] = withModifiers(($event) => _ctx.$emit("rename", __props.item), ["stop"])),
              class: "file-item__action-btn w-8 h-8 rounded-full flex items-center justify-center transition-all bg-transparent text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transform hover:scale-110",
              title: unref(t)("mount.fileItem.rename")
            }, [
              createVNode(unref(IconRename), {
                class: "w-4 h-4 sm:w-5 sm:h-5",
                "aria-hidden": "true"
              })
            ], 8, _hoisted_20$2)) : createCommentVNode("", true),
            createBaseVNode("button", {
              onClick: _cache[3] || (_cache[3] = withModifiers(($event) => _ctx.$emit("delete", __props.item), ["stop"])),
              class: "file-item__action-btn w-8 h-8 rounded-full flex items-center justify-center transition-all bg-transparent text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transform hover:scale-110",
              title: unref(t)("mount.fileItem.delete")
            }, [
              createVNode(unref(IconDelete), {
                class: "w-4 h-4 sm:w-5 sm:h-5",
                "aria-hidden": "true"
              })
            ], 8, _hoisted_21$2)
          ])
        ])) : createCommentVNode("", true)
      ], 38);
    };
  }
};
const FileItem = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-c720a729"]]);
const _hoisted_1$9 = { class: "skeleton-container" };
const _hoisted_2$7 = { class: "skeleton-info" };
const _sfc_main$b = {
  __name: "SkeletonLoader",
  props: {
    darkMode: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 8
    }
  },
  setup(__props) {
    const props = __props;
    const itemCount = computed(() => Math.min(Math.max(props.count, 3), 12));
    const widthOptions = ["40%", "50%", "60%", "70%", "80%"];
    const preGeneratedWidths = computed(() => {
      return Array.from({ length: itemCount.value }, (_, i) => {
        const hash = i * 2654435761 % widthOptions.length;
        return widthOptions[Math.abs(hash)];
      });
    });
    const getWidth = (index2) => preGeneratedWidths.value[index2 - 1] || "60%";
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$9, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(itemCount.value, (i) => {
          return openBlock(), createElementBlock("div", {
            key: i,
            class: normalizeClass(["skeleton-item", __props.darkMode ? "skeleton-item--dark" : "skeleton-item--light"]),
            style: normalizeStyle({ animationDelay: `${i * 100}ms` })
          }, [
            _cache[1] || (_cache[1] = createBaseVNode("div", { class: "skeleton-icon skeleton-pulse" }, null, -1)),
            createBaseVNode("div", _hoisted_2$7, [
              createBaseVNode("div", {
                class: "skeleton-name skeleton-pulse",
                style: normalizeStyle({ width: getWidth(i) })
              }, null, 4),
              _cache[0] || (_cache[0] = createBaseVNode("div", { class: "skeleton-size-mobile skeleton-pulse" }, null, -1))
            ]),
            _cache[2] || (_cache[2] = createStaticVNode('<div class="skeleton-size skeleton-pulse" data-v-98df4165></div><div class="skeleton-time skeleton-pulse" data-v-98df4165></div><div class="skeleton-actions" data-v-98df4165><div class="skeleton-action skeleton-pulse" data-v-98df4165></div><div class="skeleton-action skeleton-pulse" data-v-98df4165></div><div class="skeleton-action skeleton-pulse" data-v-98df4165></div></div>', 3))
          ], 6);
        }), 128))
      ]);
    };
  }
};
const SkeletonLoader = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-98df4165"]]);
const _hoisted_1$8 = { class: "mb-4" };
const _hoisted_2$6 = { class: "mb-4" };
const _hoisted_3$4 = ["for"];
const _hoisted_4$4 = ["id", "type", "placeholder", "disabled"];
const _hoisted_5$4 = {
  key: 1,
  class: "text-sm mt-1 text-red-500"
};
const _hoisted_6$4 = { class: "flex justify-end space-x-2" };
const _hoisted_7$4 = ["disabled"];
const _hoisted_8$4 = ["disabled"];
const _hoisted_9$4 = {
  key: 1,
  class: "py-12 px-6"
};
const _hoisted_10$4 = { class: "flex flex-col items-center max-w-sm mx-auto" };
const _hoisted_11$4 = { class: "text-center mb-8" };
const _hoisted_12$4 = { class: "w-full mb-6" };
const _hoisted_13$4 = { class: "relative" };
const _hoisted_14$4 = ["id", "type", "placeholder", "disabled"];
const _hoisted_15$3 = {
  key: 0,
  class: "text-sm mt-2 text-red-500 flex items-center justify-center gap-1"
};
const _hoisted_16$3 = { class: "flex w-full gap-2" };
const _hoisted_17$3 = ["disabled"];
const _hoisted_18$2 = ["disabled"];
const _sfc_main$a = {
  __name: "InputDialog",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    initialValue: {
      type: String,
      default: ""
    },
    inputType: {
      type: String,
      default: "text",
      validator: (value) => ["text", "password", "email", "number"].includes(value)
    },
    confirmText: {
      type: String,
      default: ""
    },
    cancelText: {
      type: String,
      default: ""
    },
    confirmType: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "danger", "warning"].includes(value)
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: true
    },
    validator: {
      type: Function,
      default: null
    },
    allowBackdropClose: {
      type: Boolean,
      default: true
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  emits: ["confirm", "cancel", "close"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const inputRef = ref(null);
    const inputValue = ref("");
    const errorMessage = ref("");
    const showPasswordValue = ref(false);
    const inputId = computed(() => `input-dialog-${Math.random().toString(36).substring(2, 11)}`);
    const hasError = computed(() => !!errorMessage.value);
    const canConfirm = computed(() => {
      if (props.loading) return false;
      if (props.required && !inputValue.value.trim()) return false;
      if (hasError.value) return false;
      return true;
    });
    const displayConfirmText = computed(() => {
      return props.confirmText || t("common.dialogs.confirm");
    });
    const displayCancelText = computed(() => {
      return props.cancelText || t("common.dialogs.cancel");
    });
    const displayLoadingText = computed(() => {
      return props.loadingText || t("common.dialogs.processing");
    });
    const confirmButtonClass = computed(() => {
      const baseClass = "transition-colors";
      const disabledClass = props.loading || !canConfirm.value ? "cursor-not-allowed opacity-50" : "";
      switch (props.confirmType) {
        case "danger":
          return `${baseClass} ${props.loading || !canConfirm.value ? "bg-red-500" : "bg-red-600 hover:bg-red-700"} ${disabledClass}`;
        case "warning":
          return `${baseClass} ${props.loading || !canConfirm.value ? "bg-yellow-500" : "bg-yellow-600 hover:bg-yellow-700"} ${disabledClass}`;
        case "primary":
        default:
          return `${baseClass} ${props.loading || !canConfirm.value ? "bg-primary-500" : props.darkMode ? "bg-primary-600 hover:bg-primary-700" : "bg-primary-500 hover:bg-primary-600"} ${disabledClass}`;
      }
    });
    const validateInput = () => {
      errorMessage.value = "";
      if (props.required && !inputValue.value.trim()) {
        errorMessage.value = t("common.dialogs.requiredField");
        return false;
      }
      if (props.validator && typeof props.validator === "function") {
        const validationResult = props.validator(inputValue.value);
        if (validationResult !== true) {
          errorMessage.value = validationResult || t("common.dialogs.invalidInput");
          return false;
        }
      }
      return true;
    };
    const handleConfirm = () => {
      if (props.loading || !canConfirm.value) return;
      if (validateInput()) {
        emit("confirm", inputValue.value.trim());
      }
    };
    const handleCancel = () => {
      if (props.loading) return;
      emit("cancel");
      emit("close");
    };
    const handleBackdropClick = () => {
      if (props.allowBackdropClose && !props.loading) {
        handleCancel();
      }
    };
    onKeyStroke("Escape", () => {
      if (!props.isOpen || props.loading) return;
      handleCancel();
    });
    watch(
      () => props.isOpen,
      (newValue) => {
        if (newValue) {
          inputValue.value = props.initialValue;
          errorMessage.value = "";
          nextTick(() => {
            if (inputRef.value) {
              inputRef.value.focus();
              if (props.initialValue) {
                inputRef.value.select();
              }
            }
          });
        }
      }
    );
    watch(inputValue, () => {
      if (hasError.value) {
        validateInput();
      }
    });
    return (_ctx, _cache) => {
      return __props.isOpen && !__props.inline ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "fixed inset-0 z-[70] overflow-auto bg-black bg-opacity-50 flex items-center justify-center",
        onClick: handleBackdropClick
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["relative w-full max-w-md p-6 rounded-lg shadow-xl", __props.darkMode ? "bg-gray-800" : "bg-white"]),
          onClick: _cache[1] || (_cache[1] = withModifiers(() => {
          }, ["stop"]))
        }, [
          createBaseVNode("div", _hoisted_1$8, [
            createBaseVNode("h3", {
              class: normalizeClass(["text-lg font-semibold", __props.darkMode ? "text-gray-100" : "text-gray-900"])
            }, toDisplayString(__props.title), 3),
            __props.description ? (openBlock(), createElementBlock("p", {
              key: 0,
              class: normalizeClass(["text-sm mt-1", __props.darkMode ? "text-gray-400" : "text-gray-500"])
            }, toDisplayString(__props.description), 3)) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_2$6, [
            __props.label ? (openBlock(), createElementBlock("label", {
              key: 0,
              for: inputId.value,
              class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-300" : "text-gray-700"])
            }, toDisplayString(__props.label), 11, _hoisted_3$4)) : createCommentVNode("", true),
            withDirectives(createBaseVNode("input", {
              id: inputId.value,
              ref_key: "inputRef",
              ref: inputRef,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputValue.value = $event),
              type: __props.inputType,
              class: normalizeClass(["w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500", [__props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300", hasError.value ? "border-red-500 focus:ring-red-500" : ""]]),
              placeholder: __props.placeholder,
              disabled: __props.loading,
              onKeyup: [
                withKeys(handleConfirm, ["enter"]),
                withKeys(handleCancel, ["escape"])
              ]
            }, null, 42, _hoisted_4$4), [
              [vModelDynamic, inputValue.value]
            ]),
            hasError.value ? (openBlock(), createElementBlock("p", _hoisted_5$4, toDisplayString(errorMessage.value), 1)) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_6$4, [
            createBaseVNode("button", {
              onClick: handleCancel,
              disabled: __props.loading,
              class: normalizeClass(["px-4 py-2 rounded-md transition-colors", [__props.darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100", __props.loading ? "opacity-50 cursor-not-allowed" : ""]])
            }, toDisplayString(displayCancelText.value), 11, _hoisted_7$4),
            createBaseVNode("button", {
              onClick: handleConfirm,
              disabled: __props.loading || !canConfirm.value,
              class: normalizeClass(["px-4 py-2 rounded-md text-white transition-colors flex items-center space-x-2", confirmButtonClass.value])
            }, [
              __props.loading ? (openBlock(), createBlock(unref(IconRefresh), {
                key: 0,
                class: "animate-spin h-4 w-4",
                "aria-hidden": "true"
              })) : createCommentVNode("", true),
              createBaseVNode("span", null, toDisplayString(__props.loading ? displayLoadingText.value : displayConfirmText.value), 1)
            ], 10, _hoisted_8$4)
          ])
        ], 2)
      ])) : __props.isOpen && __props.inline ? (openBlock(), createElementBlock("div", _hoisted_9$4, [
        createBaseVNode("div", _hoisted_10$4, [
          createBaseVNode("div", {
            class: normalizeClass(["w-20 h-20 rounded-full flex items-center justify-center mb-6", __props.darkMode ? "bg-gray-700" : "bg-gray-100"])
          }, [
            createVNode(unref(IconLockClosed), {
              size: "xl",
              class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
            }, null, 8, ["class"])
          ], 2),
          createBaseVNode("div", _hoisted_11$4, [
            createBaseVNode("h3", {
              class: normalizeClass(["text-lg font-semibold mb-1.5", __props.darkMode ? "text-gray-100" : "text-gray-900"])
            }, toDisplayString(__props.title), 3),
            __props.description ? (openBlock(), createElementBlock("p", {
              key: 0,
              class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-400" : "text-gray-600"])
            }, toDisplayString(__props.description), 3)) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_12$4, [
            createBaseVNode("div", _hoisted_13$4, [
              withDirectives(createBaseVNode("input", {
                id: inputId.value,
                ref_key: "inputRef",
                ref: inputRef,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => inputValue.value = $event),
                type: showPasswordValue.value ? "text" : __props.inputType,
                class: normalizeClass(["w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors", [
                  __props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500" : "bg-white border-gray-300 placeholder-gray-400",
                  hasError.value ? "border-red-500 focus:ring-red-500" : "",
                  __props.inputType === "password" ? "pr-10" : ""
                ]]),
                placeholder: __props.placeholder,
                disabled: __props.loading,
                onKeyup: [
                  withKeys(handleConfirm, ["enter"]),
                  withKeys(handleCancel, ["escape"])
                ]
              }, null, 42, _hoisted_14$4), [
                [vModelDynamic, inputValue.value]
              ]),
              __props.inputType === "password" ? (openBlock(), createElementBlock("button", {
                key: 0,
                type: "button",
                onClick: _cache[3] || (_cache[3] = ($event) => showPasswordValue.value = !showPasswordValue.value),
                class: normalizeClass(["absolute right-3 top-1/2 -translate-y-1/2 transition-colors", __props.darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"]),
                tabindex: "-1"
              }, [
                !showPasswordValue.value ? (openBlock(), createBlock(unref(IconEye), { key: 0 })) : (openBlock(), createBlock(unref(IconEyeOff), { key: 1 }))
              ], 2)) : createCommentVNode("", true)
            ]),
            hasError.value ? (openBlock(), createElementBlock("p", _hoisted_15$3, [
              createVNode(unref(IconExclamationSolid), { size: "sm" }),
              createBaseVNode("span", null, toDisplayString(errorMessage.value), 1)
            ])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_16$3, [
            createBaseVNode("button", {
              onClick: handleCancel,
              disabled: __props.loading,
              class: normalizeClass(["flex-1 px-4 py-2 rounded-md border transition-colors flex items-center justify-center gap-1.5 text-sm font-medium", [__props.darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-50", __props.loading ? "opacity-50 cursor-not-allowed" : ""]])
            }, [
              createVNode(unref(IconBack), { size: "sm" }),
              createBaseVNode("span", null, toDisplayString(displayCancelText.value), 1)
            ], 10, _hoisted_17$3),
            createBaseVNode("button", {
              onClick: handleConfirm,
              disabled: __props.loading || !canConfirm.value,
              class: normalizeClass(["flex-1 px-4 py-2 rounded-md text-white transition-colors flex items-center justify-center gap-1.5 text-sm font-medium", confirmButtonClass.value])
            }, [
              __props.loading ? (openBlock(), createBlock(unref(IconRefresh), {
                key: 0,
                class: "animate-spin h-4 w-4",
                "aria-hidden": "true"
              })) : createCommentVNode("", true),
              createBaseVNode("span", null, toDisplayString(__props.loading ? displayLoadingText.value : displayConfirmText.value), 1)
            ], 10, _hoisted_18$2)
          ])
        ])
      ])) : createCommentVNode("", true);
    };
  }
};
const _hoisted_1$7 = {
  key: 0,
  class: "flex items-center justify-center p-2 -m-2"
};
const _hoisted_2$5 = ["checked"];
const _hoisted_3$3 = ["title"];
const _hoisted_4$3 = { class: "sr-only" };
const _hoisted_5$3 = ["title"];
const _hoisted_6$3 = { class: "truncate" };
const _hoisted_7$3 = ["title"];
const _hoisted_8$3 = ["title"];
const _hoisted_9$3 = { key: 1 };
const _hoisted_10$3 = { key: 3 };
const _hoisted_11$3 = {
  key: 1,
  class: "directory-grid p-4"
};
const _hoisted_12$3 = ["onClick"];
const _hoisted_13$3 = ["onClick"];
const _hoisted_14$3 = ["checked"];
const _hoisted_15$2 = { class: "mb-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" };
const _hoisted_16$2 = ["innerHTML"];
const _hoisted_17$2 = ["title"];
const _hoisted_18$1 = { class: "mt-2 flex space-x-0.5 sm:space-x-0.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" };
const _hoisted_19$1 = ["onClick"];
const _hoisted_20$1 = ["onClick"];
const _hoisted_21$1 = ["onClick"];
const _hoisted_22$1 = ["onClick"];
const _hoisted_23$1 = { key: 0 };
const _hoisted_24$1 = { key: 1 };
const _hoisted_25$1 = {
  key: 3,
  class: "px-4 pb-6 flex flex-col items-center gap-2"
};
const _hoisted_26$1 = ["disabled"];
const VIRTUAL_SCROLL_THRESHOLD = 500;
const FILE_ITEM_HEIGHT = 52;
const OVERSCAN = 10;
const AUTO_LOAD_THROTTLE_MS = 800;
const _sfc_main$9 = {
  __name: "DirectoryList",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    // 目录分页：是否还有下一页（由父组件/后端决定）
    hasMore: {
      type: Boolean,
      default: false
    },
    // 目录分页：加载更多按钮的 loading 状态
    loadingMore: {
      type: Boolean,
      default: false
    },
    isVirtual: {
      type: Boolean,
      default: false
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    viewMode: {
      type: String,
      default: "list"
      // 'list' | 'grid' | 'gallery'
    },
    showCheckboxes: {
      type: Boolean,
      default: false
    },
    selectedItems: {
      type: Array,
      default: () => []
    },
    // 右键菜单高亮的项目路径（用于临时高亮显示）
    contextHighlightPath: {
      type: String,
      default: null
    },
    currentPath: {
      type: String,
      required: true
    },
    animationsEnabled: {
      type: Boolean,
      default: true
    },
    // 文件名过长处理模式: ellipsis(省略号) | scroll(滚动) | wrap(换行)
    fileNameOverflow: {
      type: String,
      default: "ellipsis"
    },
    // 是否显示操作按钮列
    showActionButtons: {
      type: Boolean,
      default: true
    },
    // 重命名操作的 loading 状态（由父组件控制）
    renameLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["navigate", "download", "getLink", "rename", "delete", "preview", "item-select", "toggle-select-all", "show-message", "contextmenu", "load-more"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const GalleryView = defineAsyncComponent(() => __vitePreload(() => import("./GalleryView-DA43jN9C.js"), true ? __vite__mapDeps([2,1,3,4,5,6,7,8,9,10,11,12,13,14]) : void 0));
    const { t } = useI18n();
    const validateFsItemNameDialog = createFsItemNameDialogValidator(t);
    const { sortField, sortOrder, handleSort, getSortIcon, createSortedItems, initializeSortState } = useDirectorySort();
    const { getFileLink } = useFileOperations();
    const props = __props;
    const emit = __emit;
    const sortedItems = createSortedItems(computed(() => props.items));
    const listContainerRef = ref(null);
    const scrollMargin = ref(0);
    const { y: windowScrollY } = useWindowScroll();
    const loadMoreSentinelRef = ref(null);
    const hasUserScrolled = ref(false);
    const lastAutoLoadAt = ref(0);
    let loadMoreObserver = null;
    const cleanupLoadMoreObserver = () => {
      try {
        if (loadMoreObserver) {
          loadMoreObserver.disconnect();
          loadMoreObserver = null;
        }
      } catch {
        loadMoreObserver = null;
      }
    };
    const tryAutoLoadMore = () => {
      if (!hasUserScrolled.value) return;
      if (!props.hasMore || props.loadingMore || props.loading) return;
      const now = Date.now();
      if (now - lastAutoLoadAt.value < AUTO_LOAD_THROTTLE_MS) return;
      lastAutoLoadAt.value = now;
      emit("load-more");
    };
    const setupLoadMoreObserver = async () => {
      cleanupLoadMoreObserver();
      if (!props.hasMore) return;
      if (typeof window === "undefined" || typeof window.IntersectionObserver !== "function") return;
      await nextTick();
      const el = loadMoreSentinelRef.value;
      if (!el) return;
      loadMoreObserver = new IntersectionObserver(
        (entries) => {
          const hit = entries?.some?.((e) => e && e.isIntersecting);
          if (hit) tryAutoLoadMore();
        },
        {
          root: null,
          // window 级别滚动
          // 提前一点点触发（离底部还有 200px 就开始拉下一页），体验更顺滑
          rootMargin: "200px 0px 200px 0px",
          threshold: 0
        }
      );
      loadMoreObserver.observe(el);
    };
    const shouldVirtualize = computed(() => {
      return sortedItems.value && sortedItems.value.length > VIRTUAL_SCROLL_THRESHOLD;
    });
    const updateScrollMargin = () => {
      if (listContainerRef.value) {
        const rect = listContainerRef.value.getBoundingClientRect();
        scrollMargin.value = rect.top + windowScrollY.value;
      }
    };
    const rowVirtualizer = useWindowVirtualizer(
      computed(() => ({
        count: sortedItems.value?.length || 0,
        estimateSize: () => FILE_ITEM_HEIGHT,
        overscan: OVERSCAN,
        scrollMargin: scrollMargin.value
      }))
    );
    const virtualItems = computed(() => {
      if (!shouldVirtualize.value) return [];
      return rowVirtualizer.value.getVirtualItems();
    });
    const totalVirtualSize = computed(() => {
      if (!shouldVirtualize.value) return 0;
      return rowVirtualizer.value.getTotalSize();
    });
    onMounted(() => {
      nextTick(() => {
        updateScrollMargin();
      });
      useEventListener(window, "resize", updateScrollMargin);
      useEventListener(window, "scroll", updateScrollMargin, { once: true });
      useEventListener(
        window,
        "scroll",
        () => {
          hasUserScrolled.value = true;
        },
        { passive: true, once: true }
      );
      setupLoadMoreObserver();
    });
    onUnmounted(() => {
      cleanupLoadMoreObserver();
    });
    watch(
      () => props.hasMore,
      () => {
        setupLoadMoreObserver();
      }
    );
    watch(
      () => props.items?.length,
      () => {
        setupLoadMoreObserver();
      }
    );
    watch(
      () => props.currentPath,
      () => {
        hasUserScrolled.value = false;
        lastAutoLoadAt.value = 0;
        setupLoadMoreObserver();
      }
    );
    const headerGridClass = computed(() => {
      const hasCheckbox = props.showCheckboxes;
      const hasActions = props.showActionButtons;
      if (hasCheckbox && hasActions) {
        return "grid-cols-[auto_var(--explorer-icon-size,20px)_1fr_auto] sm:grid-cols-[auto_var(--explorer-icon-size,20px)_1fr_6rem_9rem_auto]";
      } else if (hasCheckbox && !hasActions) {
        return "grid-cols-[auto_var(--explorer-icon-size,20px)_1fr] sm:grid-cols-[auto_var(--explorer-icon-size,20px)_1fr_6rem_9rem]";
      } else if (!hasCheckbox && hasActions) {
        return "grid-cols-[var(--explorer-icon-size,20px)_1fr_auto] sm:grid-cols-[var(--explorer-icon-size,20px)_1fr_6rem_9rem_auto]";
      } else {
        return "grid-cols-[var(--explorer-icon-size,20px)_1fr] sm:grid-cols-[var(--explorer-icon-size,20px)_1fr_6rem_9rem]";
      }
    });
    const formatSize = (value) => {
      if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return "-";
      return formatFileSize(value);
    };
    const isItemSelected = (item) => {
      return props.selectedItems.some((selectedItem) => selectedItem.path === item.path);
    };
    const isContextHighlight = (item) => {
      return props.contextHighlightPath === item.path;
    };
    const isAllSelected = computed(() => {
      return props.items.length > 0 && props.items.every((item) => isItemSelected(item));
    });
    const toggleItemSelect = (item) => {
      emit("item-select", item, !isItemSelected(item));
    };
    const toggleSelectAll = (select) => {
      emit("toggle-select-all", select);
    };
    const handleItemClick = (item) => {
      if (item.isDirectory) {
        emit("navigate", item.path);
      } else {
        emit("preview", item);
      }
    };
    const handleDownload = (item) => {
      emit("download", item);
    };
    const showRenameDialog = ref(false);
    const itemToRename = ref(null);
    const newName = ref("");
    const renameInput = ref(null);
    const handleRename = (item) => {
      itemToRename.value = item;
      newName.value = item.name;
      showRenameDialog.value = true;
      nextTick(() => {
        renameInput.value?.focus();
      });
    };
    const handleRenameConfirm = (fileName) => {
      if (itemToRename.value) {
        emit("rename", {
          item: itemToRename.value,
          newName: fileName
        });
      }
    };
    const handleRenameCancel = () => {
      showRenameDialog.value = false;
      newName.value = "";
      itemToRename.value = null;
    };
    const handleRenameDialogClose = () => {
      if (!props.renameLoading) {
        showRenameDialog.value = false;
        newName.value = "";
        itemToRename.value = null;
      }
    };
    const closeRenameDialog = () => {
      showRenameDialog.value = false;
      newName.value = "";
      itemToRename.value = null;
    };
    __expose({
      closeRenameDialog
    });
    const handleDelete = (item) => {
      emit("delete", item);
    };
    const handleItemSelect = (item, selected) => {
      emit("item-select", item, selected);
    };
    const handleGetLink = async (item) => {
      const result = await getFileLink(item);
      emit("show-message", {
        type: result.success ? "success" : "error",
        message: result.message
      });
    };
    const handleShowMessage = (messageInfo) => {
      emit("show-message", messageInfo);
    };
    const handleContextMenu = (payload) => {
      emit("contextmenu", payload);
    };
    onMounted(() => {
      initializeSortState();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        __props.viewMode === "list" ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["grid items-center gap-3 py-2 px-3 mx-1 border-b sticky top-16 z-10 backdrop-blur-md rounded-t-xl transition-colors duration-200", [
            __props.darkMode ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-gray-200",
            headerGridClass.value
          ]])
        }, [
          __props.showCheckboxes ? (openBlock(), createElementBlock("div", _hoisted_1$7, [
            createBaseVNode("input", {
              type: "checkbox",
              checked: isAllSelected.value,
              onChange: _cache[0] || (_cache[0] = ($event) => toggleSelectAll(!isAllSelected.value)),
              class: normalizeClass(["h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500", __props.darkMode ? "bg-gray-700 border-gray-500" : ""])
            }, null, 42, _hoisted_2$5)
          ])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(["flex items-center justify-center", __props.darkMode ? "text-gray-300" : "text-gray-700"]),
            title: unref(t)("mount.fileList.type")
          }, [
            createVNode(unref(IconDocument), {
              class: "w-4 h-4 opacity-70",
              "aria-hidden": "true"
            }),
            createBaseVNode("span", _hoisted_4$3, toDisplayString(unref(t)("mount.fileList.type")), 1)
          ], 10, _hoisted_3$3),
          createBaseVNode("div", {
            class: normalizeClass(["font-medium cursor-pointer select-none flex items-center hover:opacity-75 transition-opacity", __props.darkMode ? "text-gray-300" : "text-gray-700"]),
            onClick: _cache[1] || (_cache[1] = ($event) => unref(handleSort)("name")),
            title: unref(t)("mount.fileList.clickToSort")
          }, [
            createBaseVNode("span", _hoisted_6$3, toDisplayString(unref(t)("mount.fileList.name")), 1),
            unref(getSortIcon)("name") ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              unref(sortField) === "name" && unref(sortOrder) === "asc" ? (openBlock(), createBlock(unref(IconChevronDown), {
                key: 0,
                size: "xs",
                class: "ml-1 flex-shrink-0",
                "aria-hidden": "true"
              })) : (openBlock(), createBlock(unref(IconChevronUp), {
                key: 1,
                size: "xs",
                class: "ml-1 flex-shrink-0",
                "aria-hidden": "true"
              }))
            ], 64)) : (openBlock(), createBlock(unref(IconHamburger), {
              key: 1,
              size: "xs",
              class: "ml-1 flex-shrink-0 opacity-40",
              "aria-hidden": "true"
            }))
          ], 10, _hoisted_5$3),
          createBaseVNode("div", {
            class: normalizeClass(["min-w-24 text-center font-medium hidden sm:flex cursor-pointer select-none items-center justify-center hover:opacity-75 transition-opacity", __props.darkMode ? "text-gray-300" : "text-gray-700"]),
            onClick: _cache[2] || (_cache[2] = ($event) => unref(handleSort)("size")),
            title: unref(t)("mount.fileList.clickToSort")
          }, [
            createBaseVNode("span", null, toDisplayString(unref(t)("mount.fileList.size")), 1),
            unref(getSortIcon)("size") ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              unref(sortField) === "size" && unref(sortOrder) === "asc" ? (openBlock(), createBlock(unref(IconChevronDown), {
                key: 0,
                size: "xs",
                class: "ml-1 flex-shrink-0",
                "aria-hidden": "true"
              })) : (openBlock(), createBlock(unref(IconChevronUp), {
                key: 1,
                size: "xs",
                class: "ml-1 flex-shrink-0",
                "aria-hidden": "true"
              }))
            ], 64)) : (openBlock(), createBlock(unref(IconHamburger), {
              key: 1,
              size: "xs",
              class: "ml-1 flex-shrink-0 opacity-40",
              "aria-hidden": "true"
            }))
          ], 10, _hoisted_7$3),
          createBaseVNode("div", {
            class: normalizeClass(["min-w-36 text-center font-medium hidden sm:flex cursor-pointer select-none items-center justify-center hover:opacity-75 transition-opacity", __props.darkMode ? "text-gray-300" : "text-gray-700"]),
            onClick: _cache[3] || (_cache[3] = ($event) => unref(handleSort)("modified")),
            title: unref(t)("mount.fileList.clickToSort")
          }, [
            createBaseVNode("span", null, toDisplayString(unref(t)("mount.fileList.modifiedTime")), 1),
            unref(getSortIcon)("modified") ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              unref(sortField) === "modified" && unref(sortOrder) === "asc" ? (openBlock(), createBlock(unref(IconChevronDown), {
                key: 0,
                size: "xs",
                class: "ml-1 flex-shrink-0",
                "aria-hidden": "true"
              })) : (openBlock(), createBlock(unref(IconChevronUp), {
                key: 1,
                size: "xs",
                class: "ml-1 flex-shrink-0",
                "aria-hidden": "true"
              }))
            ], 64)) : (openBlock(), createBlock(unref(IconHamburger), {
              key: 1,
              size: "xs",
              class: "ml-1 flex-shrink-0 opacity-40",
              "aria-hidden": "true"
            }))
          ], 10, _hoisted_8$3),
          __props.showActionButtons ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(["min-w-[80px] sm:min-w-32 text-center font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
          }, toDisplayString(unref(t)("mount.fileList.actions")), 3)) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        __props.loading ? (openBlock(), createElementBlock("div", _hoisted_9$3, [
          createVNode(SkeletonLoader, {
            "dark-mode": __props.darkMode,
            count: 8
          }, null, 8, ["dark-mode"])
        ])) : !__props.items.length ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass(["py-8 flex flex-col items-center justify-center", __props.darkMode ? "text-gray-400" : "text-gray-500"])
        }, [
          createVNode(unref(IconFolderOpen), {
            size: "3xl",
            class: "mb-2",
            "aria-hidden": "true"
          }),
          createBaseVNode("div", null, toDisplayString(__props.isVirtual ? unref(t)("mount.fileList.noMountPoints") : unref(t)("mount.fileList.empty")), 1)
        ], 2)) : (openBlock(), createElementBlock("div", _hoisted_10$3, [
          __props.viewMode === "list" ? (openBlock(), createElementBlock("div", {
            key: 0,
            ref_key: "listContainerRef",
            ref: listContainerRef
          }, [
            shouldVirtualize.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "virtual-scroll-wrapper",
              style: normalizeStyle({ height: `${totalVirtualSize.value}px`, width: "100%", position: "relative" })
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(virtualItems.value, (virtualRow) => {
                return openBlock(), createBlock(FileItem, {
                  key: unref(sortedItems)[virtualRow.index].path,
                  item: unref(sortedItems)[virtualRow.index],
                  index: virtualRow.index,
                  "dark-mode": __props.darkMode,
                  "show-checkboxes": __props.showCheckboxes,
                  "is-selected": isItemSelected(unref(sortedItems)[virtualRow.index]),
                  "is-context-highlight": isContextHighlight(unref(sortedItems)[virtualRow.index]),
                  "current-path": __props.currentPath,
                  "animations-enabled": __props.animationsEnabled,
                  "file-name-overflow": __props.fileNameOverflow,
                  "show-action-buttons": __props.showActionButtons,
                  style: normalizeStyle({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start - scrollMargin.value}px)`
                  }),
                  onClick: ($event) => handleItemClick(unref(sortedItems)[virtualRow.index]),
                  onDownload: handleDownload,
                  onRename: handleRename,
                  onDelete: handleDelete,
                  onSelect: handleItemSelect,
                  onGetLink: handleGetLink,
                  onShowMessage: handleShowMessage,
                  onContextmenu: handleContextMenu
                }, null, 8, ["item", "index", "dark-mode", "show-checkboxes", "is-selected", "is-context-highlight", "current-path", "animations-enabled", "file-name-overflow", "show-action-buttons", "style", "onClick"]);
              }), 128))
            ], 4)) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(sortedItems), (item, index2) => {
              return openBlock(), createBlock(FileItem, {
                key: item.path,
                item,
                index: index2,
                "dark-mode": __props.darkMode,
                "show-checkboxes": __props.showCheckboxes,
                "is-selected": isItemSelected(item),
                "is-context-highlight": isContextHighlight(item),
                "current-path": __props.currentPath,
                "animations-enabled": __props.animationsEnabled,
                "file-name-overflow": __props.fileNameOverflow,
                "show-action-buttons": __props.showActionButtons,
                onClick: ($event) => handleItemClick(item),
                onDownload: handleDownload,
                onRename: handleRename,
                onDelete: handleDelete,
                onSelect: handleItemSelect,
                onGetLink: handleGetLink,
                onShowMessage: handleShowMessage,
                onContextmenu: handleContextMenu
              }, null, 8, ["item", "index", "dark-mode", "show-checkboxes", "is-selected", "is-context-highlight", "current-path", "animations-enabled", "file-name-overflow", "show-action-buttons", "onClick"]);
            }), 128))
          ], 512)) : __props.viewMode === "grid" ? (openBlock(), createElementBlock("div", _hoisted_11$3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(sortedItems), (item) => {
              return openBlock(), createElementBlock("div", {
                key: item.path,
                class: normalizeClass(["relative flex flex-col items-center p-2 sm:p-3 rounded-lg transition-colors hover:cursor-pointer group", __props.darkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-100"]),
                onClick: ($event) => handleItemClick(item)
              }, [
                __props.showCheckboxes ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "absolute top-1 left-1 z-10",
                  onClick: withModifiers(($event) => toggleItemSelect(item), ["stop"])
                }, [
                  createBaseVNode("input", {
                    type: "checkbox",
                    checked: isItemSelected(item),
                    class: normalizeClass(["h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500", __props.darkMode ? "bg-gray-700 border-gray-500" : ""])
                  }, null, 10, _hoisted_14$3)
                ], 8, _hoisted_13$3)) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_15$2, [
                  createBaseVNode("span", {
                    innerHTML: unref(getFileIcon)(item, __props.darkMode)
                  }, null, 8, _hoisted_16$2)
                ]),
                createBaseVNode("div", {
                  class: normalizeClass(["text-center truncate w-full text-xs sm:text-sm md:text-base", __props.darkMode ? "text-gray-200" : "text-gray-700"]),
                  title: item.name
                }, toDisplayString(item.name), 11, _hoisted_17$2),
                createBaseVNode("div", _hoisted_18$1, [
                  !item.isDirectory ? (openBlock(), createElementBlock("button", {
                    key: 0,
                    onClick: withModifiers(($event) => handleDownload(item), ["stop"]),
                    class: normalizeClass(["p-1 sm:p-1 rounded-full", __props.darkMode ? "hover:bg-gray-600 text-gray-300" : "hover:bg-gray-200 text-gray-600"])
                  }, [
                    createVNode(unref(IconDownload), {
                      class: "w-3.5 h-3.5 sm:w-4 sm:h-4",
                      "aria-hidden": "true"
                    })
                  ], 10, _hoisted_19$1)) : createCommentVNode("", true),
                  !item.isDirectory ? (openBlock(), createElementBlock("button", {
                    key: 1,
                    onClick: withModifiers(($event) => handleGetLink(item), ["stop"]),
                    class: normalizeClass(["p-1 sm:p-1 rounded-full", __props.darkMode ? "hover:bg-gray-600 text-gray-300" : "hover:bg-gray-200 text-gray-600"])
                  }, [
                    createVNode(unref(IconLink), {
                      class: "w-3.5 h-3.5 sm:w-4 sm:h-4",
                      "aria-hidden": "true"
                    })
                  ], 10, _hoisted_20$1)) : createCommentVNode("", true),
                  !item.isDirectory ? (openBlock(), createElementBlock("button", {
                    key: 2,
                    onClick: withModifiers(($event) => handleRename(item), ["stop"]),
                    class: normalizeClass(["p-1 sm:p-1 rounded-full", __props.darkMode ? "hover:bg-gray-600 text-gray-300" : "hover:bg-gray-200 text-gray-600"])
                  }, [
                    createVNode(unref(IconRename), {
                      class: "w-3.5 h-3.5 sm:w-4 sm:h-4",
                      "aria-hidden": "true"
                    })
                  ], 10, _hoisted_21$1)) : createCommentVNode("", true),
                  createBaseVNode("button", {
                    onClick: withModifiers(($event) => handleDelete(item), ["stop"]),
                    class: normalizeClass(["p-1 sm:p-1 rounded-full", __props.darkMode ? "hover:bg-gray-600 text-gray-300" : "hover:bg-gray-200 text-gray-600"])
                  }, [
                    createVNode(unref(IconDelete), {
                      class: "w-3.5 h-3.5 sm:w-4 sm:h-4",
                      "aria-hidden": "true"
                    })
                  ], 10, _hoisted_22$1)
                ]),
                createBaseVNode("div", {
                  class: normalizeClass(["mt-1 text-xs text-center", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                }, [
                  item.isDirectory && item.isVirtual ? (openBlock(), createElementBlock("span", _hoisted_23$1, "-")) : (openBlock(), createElementBlock("span", _hoisted_24$1, toDisplayString(formatSize(item.size)), 1))
                ], 2)
              ], 10, _hoisted_12$3);
            }), 128))
          ])) : __props.viewMode === "gallery" ? (openBlock(), createBlock(unref(GalleryView), {
            key: 2,
            items: unref(sortedItems),
            "dark-mode": __props.darkMode,
            "is-checkbox-mode": __props.showCheckboxes,
            "selected-items": __props.selectedItems,
            onItemClick: handleItemClick,
            onItemSelect: handleItemSelect,
            onDownload: handleDownload,
            onGetLink: handleGetLink,
            onRename: handleRename,
            onDelete: handleDelete,
            onContextmenu: handleContextMenu
          }, null, 8, ["items", "dark-mode", "is-checkbox-mode", "selected-items"])) : createCommentVNode("", true),
          __props.hasMore ? (openBlock(), createElementBlock("div", _hoisted_25$1, [
            createBaseVNode("div", {
              ref_key: "loadMoreSentinelRef",
              ref: loadMoreSentinelRef,
              class: "h-2 w-full",
              "aria-hidden": "true"
            }, null, 512),
            createBaseVNode("button", {
              class: normalizeClass(["px-4 py-2 rounded-lg text-sm font-medium transition-colors", [
                __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-100" : "bg-gray-200 hover:bg-gray-300 text-gray-800",
                __props.loadingMore ? "opacity-70 cursor-not-allowed" : ""
              ]]),
              disabled: __props.loadingMore,
              onClick: _cache[4] || (_cache[4] = ($event) => emit("load-more"))
            }, toDisplayString(__props.loadingMore ? unref(t)("common.loading") : unref(t)("mount.fileList.loadMore")), 11, _hoisted_26$1),
            createBaseVNode("div", {
              class: normalizeClass(["text-xs text-center", __props.darkMode ? "text-gray-400" : "text-gray-500"])
            }, toDisplayString(unref(t)("mount.fileList.pagedHint")), 3)
          ])) : createCommentVNode("", true)
        ])),
        createVNode(_sfc_main$a, {
          "is-open": showRenameDialog.value,
          title: unref(t)("mount.rename.title"),
          description: unref(t)("mount.rename.enterNewName"),
          label: unref(t)("mount.rename.newName"),
          "initial-value": newName.value,
          validator: unref(validateFsItemNameDialog),
          "confirm-text": unref(t)("mount.rename.confirm"),
          "cancel-text": unref(t)("mount.rename.cancel"),
          loading: __props.renameLoading,
          "loading-text": unref(t)("mount.rename.renaming"),
          "dark-mode": __props.darkMode,
          onConfirm: handleRenameConfirm,
          onCancel: handleRenameCancel,
          onClose: handleRenameDialogClose
        }, null, 8, ["is-open", "title", "description", "label", "initial-value", "validator", "confirm-text", "cancel-text", "loading", "loading-text", "dark-mode"])
      ]);
    };
  }
};
const DirectoryList = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-46aaa7c7"]]);
const _hoisted_1$6 = {
  key: 0,
  class: "mt-6 mb-6"
};
const _sfc_main$8 = {
  __name: "DirectoryReadme",
  props: {
    position: {
      type: String,
      default: "top"
      // "top" | "bottom"
    },
    meta: {
      type: Object,
      default: null
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const content = computed(() => {
      if (!props.meta) {
        return "";
      }
      if (props.position === "bottom") {
        return props.meta.footerMarkdown || "";
      }
      return props.meta.headerMarkdown || "";
    });
    const hasContent = computed(() => Boolean(content.value && content.value.trim().length > 0));
    return (_ctx, _cache) => {
      return hasContent.value ? (openBlock(), createElementBlock("div", _hoisted_1$6, [
        createBaseVNode("div", {
          class: normalizeClass(["rounded-xl px-2 py-2 shadow-lg", __props.darkMode ? "bg-gray-800" : "bg-white"])
        }, [
          createVNode(MarkdownDisplay, {
            content: content.value,
            "dark-mode": __props.darkMode
          }, null, 8, ["content", "dark-mode"])
        ], 2)
      ])) : createCommentVNode("", true);
    };
  }
};
const _hoisted_1$5 = {
  key: 0,
  class: "fixed inset-0 z-[60] flex items-center justify-center p-4"
};
const _hoisted_2$4 = { class: "relative w-full max-w-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 flex flex-col overflow-hidden transition-all duration-200" };
const _hoisted_3$2 = { class: "flex items-center justify-between" };
const _hoisted_4$2 = {
  class: "flex-1 overflow-y-auto p-3 sm:p-4",
  style: { "max-height": "500px", "min-height": "200px" }
};
const _hoisted_5$2 = { class: "font-medium" };
const _hoisted_6$2 = { class: "text-xs mt-1 opacity-75" };
const _hoisted_7$2 = {
  key: 1,
  class: "space-y-3"
};
const _hoisted_8$2 = ["onClick"];
const _hoisted_9$2 = { class: "flex items-center space-x-2" };
const _hoisted_10$2 = { class: "truncate" };
const _hoisted_11$2 = { class: "text-xs opacity-75 flex-shrink-0" };
const _hoisted_12$2 = { class: "flex items-center space-x-2 flex-1 min-w-0" };
const _hoisted_13$2 = ["innerHTML"];
const _hoisted_14$2 = { class: "flex-1 min-w-0" };
const _hoisted_15$1 = ["onClick", "title"];
const _hoisted_16$1 = ["disabled"];
const _hoisted_17$1 = ["disabled"];
const _sfc_main$7 = {
  __name: "FileBasketPanel",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close", "task-created", "show-message"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const log = createLogger("FileBasketPanel");
    const props = __props;
    const emit = __emit;
    const fileBasket = useFileBasket();
    const { dialogState, confirm, handleConfirm, handleCancel } = useConfirmDialog();
    const filesByDirectory = computed(() => fileBasket.filesByDirectory.value);
    const collectionCount = computed(() => fileBasket.collectionCount.value);
    const directoryCount = computed(() => fileBasket.directoryCount.value);
    const collectionTotalSizeMB = computed(() => fileBasket.collectionTotalSizeMB.value);
    const hasCollection = computed(() => fileBasket.hasCollection.value);
    const isProcessing = ref(false);
    const close = () => {
      emit("close");
    };
    const getValidFiles = (files) => {
      if (!Array.isArray(files)) return [];
      return files.filter((file) => {
        if (!file || typeof file !== "object") return false;
        if (!file.name || typeof file.name !== "string") return false;
        if (!file.uniqueId || typeof file.uniqueId !== "string") return false;
        if (!file.path || typeof file.path !== "string") return false;
        if (typeof file.size !== "number" || file.size < 0) return false;
        return true;
      });
    };
    const expandedDirectories = ref(/* @__PURE__ */ new Set());
    const toggleDirectory = (directory) => {
      if (expandedDirectories.value.has(directory)) {
        expandedDirectories.value.delete(directory);
      } else {
        expandedDirectories.value.add(directory);
      }
    };
    const isDirectoryExpanded = (directory) => {
      return expandedDirectories.value.has(directory);
    };
    const allDirectoriesExpanded = computed(() => {
      if (!filesByDirectory.value || typeof filesByDirectory.value !== "object") return false;
      const allDirectories = Object.keys(filesByDirectory.value);
      return allDirectories.length > 0 && allDirectories.every((dir) => expandedDirectories.value.has(dir));
    });
    const toggleAllDirectories = () => {
      if (!filesByDirectory.value || typeof filesByDirectory.value !== "object") return;
      const allDirectories = Object.keys(filesByDirectory.value);
      if (allDirectoriesExpanded.value) {
        expandedDirectories.value.clear();
      } else {
        allDirectories.forEach((directory) => {
          expandedDirectories.value.add(directory);
        });
      }
    };
    watch(
      filesByDirectory,
      (newValue) => {
        if (newValue && typeof newValue === "object") {
          Object.keys(newValue).forEach((directory) => {
            if (!expandedDirectories.value.has(directory)) {
              expandedDirectories.value.add(directory);
            }
          });
        }
      },
      { immediate: true }
    );
    const removeFile = (filePath) => {
      try {
        const result = fileBasket.removeFromBasket(filePath);
        if (result.success) {
          emit("show-message", { type: "success", message: result.message });
        } else {
          emit("show-message", { type: "error", message: result.message });
        }
      } catch (error) {
        log.error("移除文件失败:", error);
        emit("show-message", { type: "error", message: t("fileBasket.messages.removeFailed") });
      }
    };
    const handlePackDownload = async () => {
      if (isProcessing.value) return;
      try {
        isProcessing.value = true;
        const result = await fileBasket.createPackTask();
        if (result.success) {
          emit("show-message", { type: "success", message: result.message });
          emit("task-created", result);
          close();
        } else {
          emit("show-message", { type: "error", message: result.message });
        }
      } catch (error) {
        log.error("创建打包任务失败:", error);
        emit("show-message", { type: "error", message: t("fileBasket.messages.taskCreateFailed") });
      } finally {
        isProcessing.value = false;
      }
    };
    const handleClearBasket = async () => {
      if (isProcessing.value) return;
      const confirmed = await confirm({
        title: t("fileBasket.confirmations.clearTitle", "确认清空"),
        message: t("fileBasket.confirmations.clearBasket"),
        confirmType: "warning",
        confirmText: t("fileBasket.actions.clear"),
        darkMode: props.darkMode
      });
      if (!confirmed) return;
      try {
        const result = fileBasket.clearBasket();
        if (result.success) {
          emit("show-message", { type: "success", message: result.message });
          close();
        } else {
          emit("show-message", { type: "error", message: result.message });
        }
      } catch (error) {
        log.error("清空文件篮失败:", error);
        emit("show-message", { type: "error", message: t("fileBasket.messages.clearFailed") });
      }
    };
    onUnmounted(() => {
      if (isProcessing.value) {
        isProcessing.value = false;
      }
      expandedDirectories.value.clear();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        __props.isOpen ? (openBlock(), createElementBlock("div", _hoisted_1$5, [
          createBaseVNode("div", {
            class: "absolute inset-0 bg-black/20 backdrop-blur-[1px]",
            onClick: close
          }),
          createBaseVNode("div", _hoisted_2$4, [
            createBaseVNode("div", {
              class: normalizeClass(["flex-shrink-0 px-4 py-3 border-b flex justify-between items-center", __props.darkMode ? "border-gray-700/50" : "border-gray-200/50"])
            }, [
              createBaseVNode("h3", {
                class: normalizeClass(["text-lg font-medium", __props.darkMode ? "text-gray-100" : "text-gray-900"])
              }, toDisplayString(unref(t)("fileBasket.panel.title")), 3),
              createBaseVNode("button", {
                onClick: close,
                class: "text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              }, [
                createVNode(unref(IconClose), {
                  size: "sm",
                  "aria-hidden": "true"
                })
              ])
            ], 2),
            hasCollection.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["px-4 py-3 border-b bg-gray-50/50 dark:bg-gray-900/30", __props.darkMode ? "border-gray-700/50" : "border-gray-200/50"])
            }, [
              createBaseVNode("div", _hoisted_3$2, [
                createBaseVNode("div", null, [
                  createBaseVNode("div", {
                    class: normalizeClass(["text-sm", __props.darkMode ? "text-blue-200" : "text-blue-800"])
                  }, toDisplayString(collectionCount.value) + " 个文件，来自 " + toDisplayString(directoryCount.value) + " 个目录", 3),
                  createBaseVNode("div", {
                    class: normalizeClass(["text-xs mt-1", __props.darkMode ? "text-blue-300" : "text-blue-600"])
                  }, "总大小：" + toDisplayString(collectionTotalSizeMB.value) + " MB", 3)
                ]),
                createBaseVNode("button", {
                  onClick: toggleAllDirectories,
                  class: normalizeClass(["text-xs px-2 py-1 rounded transition-colors", __props.darkMode ? "text-blue-300 hover:text-blue-200 hover:bg-blue-800/30" : "text-blue-600 hover:text-blue-700 hover:bg-blue-100"])
                }, toDisplayString(allDirectoriesExpanded.value ? "全部收起" : "全部展开"), 3)
              ])
            ], 2)) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_4$2, [
              !hasCollection.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["text-center py-8", __props.darkMode ? "text-gray-400" : "text-gray-600"])
              }, [
                createVNode(unref(IconCollection), {
                  class: "h-12 w-12 mx-auto mb-3 opacity-30",
                  "aria-hidden": "true"
                }),
                createBaseVNode("p", _hoisted_5$2, toDisplayString(unref(t)("fileBasket.panel.empty")), 1),
                createBaseVNode("p", _hoisted_6$2, toDisplayString(unref(t)("fileBasket.panel.emptyDescription")), 1)
              ], 2)) : (openBlock(), createElementBlock("div", _hoisted_7$2, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(filesByDirectory.value, (files, directory) => {
                  return openBlock(), createElementBlock("div", {
                    key: directory,
                    class: normalizeClass(["border rounded-lg overflow-hidden bg-white/50 dark:bg-gray-900/20", __props.darkMode ? "border-gray-700/50" : "border-gray-200/50"])
                  }, [
                    createBaseVNode("div", {
                      onClick: ($event) => toggleDirectory(directory),
                      class: normalizeClass(["px-3 py-2 text-sm font-medium flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors", __props.darkMode ? "bg-gray-750 text-gray-300 hover:bg-gray-700" : "bg-gray-50 text-gray-700 hover:bg-gray-100"])
                    }, [
                      createBaseVNode("div", _hoisted_9$2, [
                        createVNode(unref(IconChevronRight), {
                          size: "sm",
                          class: normalizeClass(["transition-transform duration-200", isDirectoryExpanded(directory) ? "rotate-90" : ""]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"]),
                        createVNode(unref(IconFolder), {
                          size: "sm",
                          "aria-hidden": "true"
                        }),
                        createBaseVNode("span", _hoisted_10$2, toDisplayString(directory), 1)
                      ]),
                      createBaseVNode("span", _hoisted_11$2, toDisplayString((files || []).length) + " 个文件", 1)
                    ], 10, _hoisted_8$2),
                    isDirectoryExpanded(directory) ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: normalizeClass(["divide-y", __props.darkMode ? "divide-gray-700/30" : "divide-gray-100"])
                    }, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(getValidFiles(files), (file) => {
                        return openBlock(), createElementBlock("div", {
                          key: file.uniqueId,
                          class: normalizeClass(["px-3 py-2 flex items-center justify-between hover:bg-blue-50/50 dark:hover:bg-blue-900/10 group transition-colors", __props.darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"])
                        }, [
                          createBaseVNode("div", _hoisted_12$2, [
                            createBaseVNode("div", {
                              class: "w-5 h-5 flex-shrink-0",
                              innerHTML: unref(getFileIcon)(file, __props.darkMode)
                            }, null, 8, _hoisted_13$2),
                            createBaseVNode("div", _hoisted_14$2, [
                              createBaseVNode("p", {
                                class: normalizeClass(["text-sm font-medium truncate", __props.darkMode ? "text-gray-200" : "text-gray-900"])
                              }, toDisplayString(file.name), 3),
                              createBaseVNode("p", {
                                class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                              }, toDisplayString(unref(formatFileSize)(file.size)), 3)
                            ])
                          ]),
                          createBaseVNode("button", {
                            onClick: ($event) => removeFile(file.path),
                            class: normalizeClass(["opacity-0 group-hover:opacity-100 p-1 rounded transition-all duration-200 flex-shrink-0", __props.darkMode ? "text-red-400 hover:text-red-300 hover:bg-red-900/30" : "text-red-500 hover:text-red-600 hover:bg-red-50"]),
                            title: unref(t)("fileBasket.actions.remove")
                          }, [
                            createVNode(unref(IconClose), {
                              size: "sm",
                              "aria-hidden": "true"
                            })
                          ], 10, _hoisted_15$1)
                        ], 2);
                      }), 128))
                    ], 2)) : createCommentVNode("", true)
                  ], 2);
                }), 128))
              ]))
            ]),
            hasCollection.value ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(["px-4 py-3 border-t flex space-x-3 bg-gray-50/50 dark:bg-gray-900/30", __props.darkMode ? "border-gray-700/50" : "border-gray-200/50"])
            }, [
              createBaseVNode("button", {
                onClick: handleClearBasket,
                disabled: isProcessing.value,
                class: normalizeClass(["flex-1 px-4 py-2 rounded-md font-medium transition-colors", [__props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-200 hover:bg-gray-300 text-gray-700", isProcessing.value ? "opacity-50 cursor-not-allowed" : ""]])
              }, toDisplayString(unref(t)("fileBasket.actions.clear")), 11, _hoisted_16$1),
              createBaseVNode("button", {
                onClick: handlePackDownload,
                disabled: isProcessing.value,
                class: normalizeClass(["flex-[2] flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors shadow-sm", [isProcessing.value ? "bg-gray-400 text-white cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"]])
              }, [
                createVNode(unref(IconDownload), {
                  size: "sm",
                  "aria-hidden": "true"
                }),
                createBaseVNode("span", null, toDisplayString(isProcessing.value ? unref(t)("fileBasket.status.processing") : unref(t)("fileBasket.actions.packDownload")), 1)
              ], 10, _hoisted_17$1)
            ], 2)) : createCommentVNode("", true),
            createVNode(_sfc_main$e, mergeProps(unref(dialogState), {
              onConfirm: unref(handleConfirm),
              onCancel: unref(handleCancel)
            }), null, 16, ["onConfirm", "onCancel"])
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
const _hoisted_1$4 = ["title"];
const _hoisted_2$3 = { class: "whitespace-nowrap hidden sm:inline" };
const _sfc_main$6 = {
  __name: "FileBasket",
  props: {
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["task-created", "show-message"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const { collectionCount, hasCollection, directoryCount, basketButtonText, toggleBasket, isBasketOpen, closeBasket } = useFileBasket();
    const basketTitle = computed(() => {
      if (!hasCollection.value) {
        return t("fileBasket.panel.empty");
      }
      return t("fileBasket.panel.summary", {
        fileCount: collectionCount.value,
        directoryCount: directoryCount.value
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => unref(toggleBasket) && unref(toggleBasket)(...args)),
          class: normalizeClass(["relative inline-flex items-center justify-center p-2 sm:px-4 sm:py-1.5 rounded-md sm:rounded-full transition-all duration-200 text-xs sm:text-sm font-medium shadow-sm hover:shadow-md active:scale-95", __props.darkMode ? "bg-primary-600/90 hover:bg-primary-600 text-white" : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"]),
          title: basketTitle.value
        }, [
          createVNode(unref(IconShoppingCart), {
            size: "sm",
            class: "w-4 h-4 mr-1 sm:mr-1.5",
            "aria-hidden": "true"
          }),
          createBaseVNode("span", _hoisted_2$3, toDisplayString(unref(basketButtonText)), 1)
        ], 10, _hoisted_1$4),
        unref(isBasketOpen) ? (openBlock(), createBlock(_sfc_main$7, {
          key: 0,
          "is-open": unref(isBasketOpen),
          "dark-mode": __props.darkMode,
          onClose: unref(closeBasket),
          onTaskCreated: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("task-created", $event)),
          onShowMessage: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("show-message", $event))
        }, null, 8, ["is-open", "dark-mode", "onClose"])) : createCommentVNode("", true)
      ]);
    };
  }
};
const _hoisted_1$3 = { class: "flex flex-wrap items-center justify-between gap-2 py-2" };
const _hoisted_2$2 = { class: "flex items-center space-x-2" };
const _hoisted_3$1 = ["title"];
const _hoisted_4$1 = { class: "hidden sm:inline" };
const _hoisted_5$1 = ["title"];
const _hoisted_6$1 = { class: "hidden sm:inline" };
const _hoisted_7$1 = { class: "flex items-center space-x-2" };
const _hoisted_8$1 = { class: "mr-2" };
const _hoisted_9$1 = ["title"];
const _hoisted_10$1 = { class: "hidden sm:inline" };
const _hoisted_11$1 = ["title"];
const _hoisted_12$1 = ["title"];
const _hoisted_13$1 = ["title"];
const _hoisted_14$1 = ["title"];
const _sfc_main$5 = {
  __name: "FileOperations",
  props: {
    currentPath: {
      type: String,
      required: true,
      default: "/"
    },
    isVirtual: {
      type: Boolean,
      default: false
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    viewMode: {
      type: String,
      default: "list"
      // 'list' | 'grid' | 'gallery'
    }
  },
  emits: ["upload", "createFolder", "refresh", "changeViewMode", "openUploadModal", "openTasksModal", "task-created", "show-message"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const emit = __emit;
    const changeViewMode = (mode) => {
      emit("changeViewMode", mode);
    };
    const openUploadFileDialog = () => {
      emit("openUploadModal");
    };
    const createFolder = () => {
      emit("createFolder");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", _hoisted_1$3, [
          createBaseVNode("div", _hoisted_2$2, [
            !__props.isVirtual ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: openUploadFileDialog,
              class: normalizeClass(["inline-flex items-center justify-center p-2 sm:px-4 sm:py-1.5 rounded-md sm:rounded-full transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md active:scale-95", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"]),
              title: unref(t)("mount.operations.upload")
            }, [
              createVNode(unref(IconUpload), {
                size: "sm",
                class: "sm:mr-1.5"
              }),
              createBaseVNode("span", _hoisted_4$1, toDisplayString(unref(t)("mount.operations.upload")), 1)
            ], 10, _hoisted_3$1)) : createCommentVNode("", true),
            !__props.isVirtual ? (openBlock(), createElementBlock("button", {
              key: 1,
              onClick: createFolder,
              class: normalizeClass(["inline-flex items-center justify-center p-2 sm:px-4 sm:py-1.5 rounded-md sm:rounded-full transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md active:scale-95", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"]),
              title: unref(t)("mount.operations.createFolder")
            }, [
              createVNode(unref(IconFolderPlus), {
                size: "sm",
                class: "sm:mr-1.5"
              }),
              createBaseVNode("span", _hoisted_6$1, toDisplayString(unref(t)("mount.operations.createFolder")), 1)
            ], 10, _hoisted_5$1)) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_7$1, [
            createBaseVNode("div", _hoisted_8$1, [
              createVNode(_sfc_main$6, {
                "dark-mode": __props.darkMode,
                onTaskCreated: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("task-created", $event)),
                onShowMessage: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("show-message", $event))
              }, null, 8, ["dark-mode"])
            ]),
            createBaseVNode("button", {
              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("openTasksModal")),
              class: normalizeClass(["inline-flex items-center justify-center p-2 sm:px-4 sm:py-1.5 rounded-md sm:rounded-full transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md active:scale-95 mr-2", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"]),
              title: unref(t)("mount.operations.tasks")
            }, [
              createVNode(unref(IconTaskList), {
                size: "sm",
                class: "sm:mr-1.5"
              }),
              createBaseVNode("span", _hoisted_10$1, toDisplayString(unref(t)("mount.operations.tasks")), 1)
            ], 10, _hoisted_9$1),
            createBaseVNode("div", {
              class: normalizeClass(["flex rounded-md overflow-hidden border", __props.darkMode ? "border-gray-700" : "border-gray-300"])
            }, [
              createBaseVNode("button", {
                onClick: _cache[3] || (_cache[3] = ($event) => changeViewMode("list")),
                class: normalizeClass(["inline-flex items-center px-2 py-1.5 transition-colors text-sm", [__props.viewMode === "list" ? __props.darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800" : __props.darkMode ? "bg-gray-800 text-gray-400" : "bg-white text-gray-500"]]),
                title: unref(t)("mount.viewModes.list")
              }, [
                createVNode(unref(IconList), { size: "sm" })
              ], 10, _hoisted_11$1),
              createBaseVNode("button", {
                onClick: _cache[4] || (_cache[4] = ($event) => changeViewMode("grid")),
                class: normalizeClass(["inline-flex items-center px-2 py-1.5 transition-colors text-sm", [__props.viewMode === "grid" ? __props.darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800" : __props.darkMode ? "bg-gray-800 text-gray-400" : "bg-white text-gray-500"]]),
                title: unref(t)("mount.viewModes.grid")
              }, [
                createVNode(unref(IconGrid), { size: "sm" })
              ], 10, _hoisted_12$1),
              createBaseVNode("button", {
                onClick: _cache[5] || (_cache[5] = ($event) => changeViewMode("gallery")),
                class: normalizeClass(["inline-flex items-center px-2 py-1.5 transition-colors text-sm", [
                  __props.viewMode === "gallery" ? __props.darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800" : __props.darkMode ? "bg-gray-800 text-gray-400" : "bg-white text-gray-500"
                ]]),
                title: unref(t)("mount.viewModes.gallery")
              }, [
                createVNode(unref(IconGallery), { size: "sm" })
              ], 10, _hoisted_13$1)
            ], 2),
            createBaseVNode("button", {
              onClick: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("refresh")),
              class: normalizeClass(["inline-flex items-center px-3 py-1.5 rounded-md transition-colors text-sm font-medium ml-2", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"]),
              title: unref(t)("mount.operations.refresh")
            }, [
              createVNode(unref(IconRefresh), { size: "sm" })
            ], 10, _hoisted_14$1)
          ])
        ])
      ]);
    };
  }
};
const _sfc_main$4 = {
  __name: "PathPasswordDialog",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      required: true
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  emits: ["verified", "cancel", "close", "error"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const log = createLogger("PathPasswordDialog");
    const props = __props;
    const emit = __emit;
    const isVerifying = ref(false);
    const title = computed(() => t("mount.pathPassword.title"));
    const description = computed(() => t("mount.pathPassword.description", { path: props.path }));
    const label = computed(() => t("mount.pathPassword.label"));
    const placeholder = computed(() => t("mount.pathPassword.placeholder"));
    const confirmText = computed(() => t("mount.pathPassword.verify"));
    const cancelText = computed(() => props.inline ? t("mount.pathPassword.back") : t("mount.pathPassword.cancel"));
    const loadingText = computed(() => t("mount.pathPassword.verifying"));
    const handleConfirm = async (password) => {
      if (!password || isVerifying.value) return;
      isVerifying.value = true;
      try {
        const result = await verifyFsMetaPassword(props.path, password);
        if (result && result.verified) {
          emit("verified", {
            path: result.path || props.path,
            token: result.token || null,
            message: result.message || t("mount.pathPassword.verified")
          });
        } else {
          emit("error", {
            message: result && result.message || t("mount.pathPassword.incorrectPassword")
          });
        }
      } catch (error) {
        log.error("密码验证失败:", error);
        if (error.status === 401) {
          emit("error", {
            message: t("mount.pathPassword.incorrectPassword")
          });
        } else {
          emit("error", {
            message: error.message || t("mount.pathPassword.verifyFailed")
          });
        }
      } finally {
        isVerifying.value = false;
      }
    };
    const handleCancel = () => {
      emit("cancel");
      emit("close");
    };
    const handleClose = () => {
      emit("close");
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$a, {
        "is-open": __props.isOpen,
        title: title.value,
        description: description.value,
        label: label.value,
        placeholder: placeholder.value,
        "input-type": "password",
        "confirm-text": confirmText.value,
        "cancel-text": cancelText.value,
        "dark-mode": __props.darkMode,
        loading: isVerifying.value,
        "loading-text": loadingText.value,
        "allow-backdrop-close": false,
        inline: __props.inline,
        "confirm-type": "primary",
        onConfirm: handleConfirm,
        onCancel: handleCancel,
        onClose: handleClose
      }, null, 8, ["is-open", "title", "description", "label", "placeholder", "confirm-text", "cancel-text", "dark-mode", "loading", "loading-text", "inline"]);
    };
  }
};
const _sfc_main$3 = {
  __name: "FloatingActionBar",
  props: {
    selectedCount: {
      type: Number,
      default: 0
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    "download",
    "copy-link",
    "copy",
    "add-to-basket",
    "rename",
    "delete",
    "clear-selection"
  ],
  setup(__props, { emit: __emit }) {
    const ActionButton = (props2, { slots, emit: emit2 }) => {
      const baseClass = "p-2 rounded-token-md transition-all duration-token-fast";
      const enabledClass = props2.darkMode ? "hover:bg-gray-700 text-gray-300 hover:text-gray-100" : "hover:bg-gray-100 text-gray-600 hover:text-gray-900";
      const disabledClass = "opacity-40 cursor-not-allowed";
      const dangerClass = props2.darkMode ? "hover:bg-red-500/20 text-red-400 hover:text-red-300" : "hover:bg-red-50 text-red-500 hover:text-red-600";
      return h("button", {
        type: "button",
        title: props2.title,
        disabled: props2.disabled,
        class: `${baseClass} ${props2.disabled ? disabledClass : props2.danger ? dangerClass : enabledClass}`,
        onClick: () => !props2.disabled && emit2("click")
      }, slots.default?.());
    };
    ActionButton.props = ["title", "darkMode", "disabled", "danger"];
    ActionButton.emits = ["click"];
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    function handleDownload() {
      emit("download");
    }
    function handleCopyLink() {
      if (props.selectedCount === 1) {
        emit("copy-link");
      }
    }
    function handleCopy() {
      emit("copy");
    }
    function handleAddToBasket() {
      emit("add-to-basket");
    }
    function handleRename() {
      if (props.selectedCount === 1) {
        emit("rename");
      }
    }
    function handleDelete() {
      emit("delete");
    }
    function handleClearSelection() {
      emit("clear-selection");
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(Transition, { name: "slide-up" }, {
          default: withCtx(() => [
            __props.selectedCount > 0 ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-3 py-2 rounded-token-xl shadow-token-3", __props.darkMode ? "bg-gray-800/95 backdrop-blur-md border border-gray-700" : "bg-white/95 backdrop-blur-md border border-gray-200"])
            }, [
              createBaseVNode("span", {
                class: normalizeClass(["flex items-center justify-center min-w-[24px] h-6 px-2 rounded-token-full text-xs font-medium", __props.darkMode ? "bg-primary-500/20 text-primary-400" : "bg-primary-100 text-primary-600"])
              }, toDisplayString(__props.selectedCount), 3),
              createBaseVNode("div", {
                class: normalizeClass(["w-px h-5 mx-1", __props.darkMode ? "bg-gray-600" : "bg-gray-300"])
              }, null, 2),
              createVNode(ActionButton, {
                title: unref(t)("mount.fileItem.download"),
                "dark-mode": __props.darkMode,
                onClick: handleDownload
              }, {
                default: withCtx(() => [
                  createVNode(unref(IconDownload), { size: "sm" })
                ]),
                _: 1
              }, 8, ["title", "dark-mode"]),
              createVNode(ActionButton, {
                title: unref(t)("mount.fileItem.getLink"),
                "dark-mode": __props.darkMode,
                disabled: __props.selectedCount > 1,
                onClick: handleCopyLink
              }, {
                default: withCtx(() => [
                  createVNode(unref(IconLink), { size: "sm" })
                ]),
                _: 1
              }, 8, ["title", "dark-mode", "disabled"]),
              createVNode(ActionButton, {
                title: unref(t)("mount.fileItem.copy"),
                "dark-mode": __props.darkMode,
                onClick: handleCopy
              }, {
                default: withCtx(() => [
                  createVNode(unref(IconCopy), { size: "sm" })
                ]),
                _: 1
              }, 8, ["title", "dark-mode"]),
              createVNode(ActionButton, {
                title: unref(t)("fileBasket.actions.addToBasket"),
                "dark-mode": __props.darkMode,
                onClick: handleAddToBasket
              }, {
                default: withCtx(() => [
                  createVNode(unref(IconShoppingCart), { size: "sm" })
                ]),
                _: 1
              }, 8, ["title", "dark-mode"]),
              createVNode(ActionButton, {
                title: unref(t)("mount.fileItem.rename"),
                "dark-mode": __props.darkMode,
                disabled: __props.selectedCount > 1,
                onClick: handleRename
              }, {
                default: withCtx(() => [
                  createVNode(unref(IconRename), { size: "sm" })
                ]),
                _: 1
              }, 8, ["title", "dark-mode", "disabled"]),
              createBaseVNode("div", {
                class: normalizeClass(["w-px h-5 mx-1", __props.darkMode ? "bg-gray-600" : "bg-gray-300"])
              }, null, 2),
              createVNode(ActionButton, {
                title: unref(t)("mount.fileItem.delete"),
                "dark-mode": __props.darkMode,
                danger: "",
                onClick: handleDelete
              }, {
                default: withCtx(() => [
                  createVNode(unref(IconDelete), { size: "sm" })
                ]),
                _: 1
              }, 8, ["title", "dark-mode"]),
              createBaseVNode("div", {
                class: normalizeClass(["w-px h-5 mx-1", __props.darkMode ? "bg-gray-600" : "bg-gray-300"])
              }, null, 2),
              createVNode(ActionButton, {
                title: unref(t)("breadcrumb.exitSelection"),
                "dark-mode": __props.darkMode,
                onClick: handleClearSelection
              }, {
                default: withCtx(() => [
                  createVNode(unref(IconClose), { size: "sm" })
                ]),
                _: 1
              }, 8, ["title", "dark-mode"])
            ], 2)) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
};
const FloatingActionBar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-b76b0563"]]);
const _hoisted_1$2 = { class: "flex flex-col-reverse items-center mb-2.5 space-y-reverse space-y-1.5" };
const _hoisted_2$1 = ["aria-expanded", "aria-label"];
const _sfc_main$2 = {
  __name: "FloatingToolbar",
  props: {
    darkMode: {
      type: Boolean,
      default: false
    },
    canWrite: {
      type: Boolean,
      default: true
    },
    showCheckboxes: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    "refresh",
    "new-folder",
    "upload",
    "toggle-checkboxes",
    "open-basket",
    "open-tasks",
    "settings"
  ],
  setup(__props, { emit: __emit }) {
    const SpeedDialItem = (props2, { slots, emit: emit2 }) => {
      const wrapperClass = "relative group/item";
      const baseClass = "speed-dial-item flex items-center justify-center w-10 h-10 rounded-full transition-all cursor-pointer";
      const colorClass = props2.darkMode ? props2.active ? "bg-primary-600 text-white hover:bg-primary-500" : "bg-gray-700 text-gray-200 hover:bg-gray-600" : props2.active ? "bg-primary-500 text-white hover:bg-primary-600" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-800";
      const shadowClass = "shadow-lg";
      const style = {
        transitionDelay: props2.expanded ? `${props2.delay}ms` : "0ms",
        opacity: props2.expanded ? 1 : 0,
        transform: props2.expanded ? "scale(1) translateY(0)" : "scale(0.6) translateY(8px)"
      };
      return h("div", { class: wrapperClass, style }, [
        h("button", {
          type: "button",
          class: `${baseClass} ${colorClass} ${shadowClass}`,
          onClick: () => emit2("click"),
          "aria-label": props2.tooltip
        }, slots.default?.()),
        // Tooltip - 现在是 group/item 的子元素，可以正确响应 hover
        h("div", {
          class: `absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-medium rounded whitespace-nowrap pointer-events-none transition-all duration-150 ${props2.darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-800 text-white"} opacity-0 group-hover/item:opacity-100 shadow-md`
        }, props2.tooltip)
      ]);
    };
    SpeedDialItem.props = ["delay", "tooltip", "darkMode", "expanded", "active"];
    SpeedDialItem.emits = ["click"];
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const isExpanded = useLocalStorage("floating-toolbar-expanded", false);
    onMounted(() => {
    });
    onBeforeUnmount(() => {
    });
    const triggerButtonClass = computed(() => {
      return props.darkMode ? "bg-gray-700 text-gray-200 shadow-lg hover:bg-gray-600" : "bg-white text-gray-600 shadow-lg border border-gray-200 hover:bg-gray-50";
    });
    function toggleExpand() {
      isExpanded.value = !isExpanded.value;
    }
    function handleMouseEnter() {
    }
    function handleMouseLeave() {
    }
    function handleRefresh() {
      emit("refresh");
    }
    function handleNewFolder() {
      emit("new-folder");
    }
    function handleUpload() {
      emit("upload");
    }
    function handleToggleCheckboxes() {
      emit("toggle-checkboxes");
    }
    function handleOpenBasket() {
      emit("open-basket");
    }
    function handleOpenTasks() {
      emit("open-tasks");
    }
    function handleSettings() {
      emit("settings");
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createBaseVNode("div", {
          class: "fixed z-50 right-4 bottom-4 group",
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave
        }, [
          createVNode(Transition, { name: "speed-dial" }, {
            default: withCtx(() => [
              withDirectives(createBaseVNode("div", _hoisted_1$2, [
                createVNode(SpeedDialItem, {
                  delay: 0,
                  tooltip: unref(t)("mount.toolbar.settings"),
                  "dark-mode": __props.darkMode,
                  expanded: unref(isExpanded),
                  onClick: handleSettings
                }, {
                  default: withCtx(() => [
                    createVNode(unref(IconSettings), {
                      size: "sm",
                      class: "w-[18px] h-[18px]"
                    })
                  ]),
                  _: 1
                }, 8, ["tooltip", "dark-mode", "expanded"]),
                createVNode(SpeedDialItem, {
                  delay: 25,
                  tooltip: __props.showCheckboxes ? unref(t)("mount.toolbar.hideCheckboxes") : unref(t)("mount.toolbar.showCheckboxes"),
                  "dark-mode": __props.darkMode,
                  expanded: unref(isExpanded),
                  active: __props.showCheckboxes,
                  onClick: handleToggleCheckboxes
                }, {
                  default: withCtx(() => [
                    createVNode(unref(IconCheckbox), {
                      size: "sm",
                      class: "w-[18px] h-[18px]"
                    })
                  ]),
                  _: 1
                }, 8, ["tooltip", "dark-mode", "expanded", "active"]),
                createVNode(SpeedDialItem, {
                  delay: 50,
                  tooltip: unref(t)("fileBasket.title"),
                  "dark-mode": __props.darkMode,
                  expanded: unref(isExpanded),
                  onClick: handleOpenBasket
                }, {
                  default: withCtx(() => [
                    createVNode(unref(IconShoppingCart), {
                      size: "sm",
                      class: "w-[18px] h-[18px]"
                    })
                  ]),
                  _: 1
                }, 8, ["tooltip", "dark-mode", "expanded"]),
                createVNode(SpeedDialItem, {
                  delay: 75,
                  tooltip: unref(t)("mount.toolbar.tasks"),
                  "dark-mode": __props.darkMode,
                  expanded: unref(isExpanded),
                  onClick: handleOpenTasks
                }, {
                  default: withCtx(() => [
                    createVNode(unref(IconTaskList), {
                      size: "sm",
                      class: "w-[18px] h-[18px]"
                    })
                  ]),
                  _: 1
                }, 8, ["tooltip", "dark-mode", "expanded"]),
                __props.canWrite ? (openBlock(), createBlock(SpeedDialItem, {
                  key: 0,
                  delay: 100,
                  tooltip: unref(t)("mount.toolbar.upload"),
                  "dark-mode": __props.darkMode,
                  expanded: unref(isExpanded),
                  onClick: handleUpload
                }, {
                  default: withCtx(() => [
                    createVNode(unref(IconUpload), {
                      size: "sm",
                      class: "w-[18px] h-[18px]"
                    })
                  ]),
                  _: 1
                }, 8, ["tooltip", "dark-mode", "expanded"])) : createCommentVNode("", true),
                __props.canWrite ? (openBlock(), createBlock(SpeedDialItem, {
                  key: 1,
                  delay: 125,
                  tooltip: unref(t)("mount.toolbar.newFolder"),
                  "dark-mode": __props.darkMode,
                  expanded: unref(isExpanded),
                  onClick: handleNewFolder
                }, {
                  default: withCtx(() => [
                    createVNode(unref(IconFolderPlus), {
                      size: "sm",
                      class: "w-[18px] h-[18px]"
                    })
                  ]),
                  _: 1
                }, 8, ["tooltip", "dark-mode", "expanded"])) : createCommentVNode("", true),
                createVNode(SpeedDialItem, {
                  delay: 150,
                  tooltip: unref(t)("mount.toolbar.refresh"),
                  "dark-mode": __props.darkMode,
                  expanded: unref(isExpanded),
                  onClick: handleRefresh
                }, {
                  default: withCtx(() => [
                    createVNode(unref(IconRefresh), {
                      size: "sm",
                      class: "w-[18px] h-[18px]"
                    })
                  ]),
                  _: 1
                }, 8, ["tooltip", "dark-mode", "expanded"])
              ], 512), [
                [vShow, unref(isExpanded)]
              ])
            ]),
            _: 1
          }),
          createBaseVNode("button", {
            type: "button",
            onClick: toggleExpand,
            class: normalizeClass(["speed-dial-trigger flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 focus:outline-none", triggerButtonClass.value]),
            "aria-expanded": unref(isExpanded),
            "aria-label": unref(t)("mount.toolbar.more")
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(unref(isExpanded) ? unref(IconClose) : unref(IconMenu)), {
              size: "md",
              class: normalizeClass(["transition-transform duration-200", { "rotate-180": unref(isExpanded) }])
            }, null, 8, ["class"]))
          ], 10, _hoisted_2$1)
        ], 32)
      ]);
    };
  }
};
const FloatingToolbar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-cd620534"]]);
const _hoisted_1$1 = ["title"];
const _sfc_main$1 = {
  __name: "BackToTop",
  props: {
    darkMode: {
      type: Boolean,
      default: false
    },
    threshold: {
      type: Number,
      default: 300
    }
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const { y } = useScroll(window, { behavior: "smooth" });
    const isVisible = computed(() => y.value > props.threshold);
    function scrollToTop() {
      y.value = 0;
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(Transition, { name: "fade-scale" }, {
          default: withCtx(() => [
            isVisible.value ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: scrollToTop,
              class: normalizeClass(["fixed bottom-4 right-16 z-40 p-2.5 rounded-full shadow-lg transition-all duration-200", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-gray-100" : "bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 border border-gray-200"]),
              title: unref(t)("common.backToTop")
            }, [
              createVNode(unref(IconArrowUp), {
                size: "sm",
                class: "w-4 h-4",
                "aria-hidden": "true"
              })
            ], 10, _hoisted_1$1)) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
};
const BackToTop = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a094ae15"]]);
const isOpen = ref(false);
const sessionId = ref(0);
const items = ref([]);
const index = ref(0);
const darkMode = ref(false);
const imageStates = ref(null);
const loadImageUrl = ref(null);
const onDownload = ref(null);
const onGetLink = ref(null);
const sidebarOpen = ref(false);
const menuOpen = ref(false);
const slideshowActive = ref(false);
const currentItem = computed(() => {
  const list = Array.isArray(items.value) ? items.value : [];
  const i = Number.isFinite(index.value) ? index.value : 0;
  return list[i] || null;
});
function useFsMediaLightbox() {
  const open = (options = {}) => {
    const list = Array.isArray(options.items) ? options.items : [];
    const startIndex = Number.isFinite(options.index) ? options.index : 0;
    items.value = list;
    index.value = Math.max(0, Math.min(startIndex, Math.max(list.length - 1, 0)));
    darkMode.value = !!options.darkMode;
    imageStates.value = options.imageStates || null;
    loadImageUrl.value = typeof options.loadImageUrl === "function" ? options.loadImageUrl : null;
    onDownload.value = typeof options.onDownload === "function" ? options.onDownload : null;
    onGetLink.value = typeof options.onGetLink === "function" ? options.onGetLink : null;
    sidebarOpen.value = false;
    menuOpen.value = false;
    slideshowActive.value = false;
    isOpen.value = true;
    sessionId.value += 1;
  };
  const close = () => {
    isOpen.value = false;
    menuOpen.value = false;
    sidebarOpen.value = false;
    slideshowActive.value = false;
    items.value = [];
    index.value = 0;
    imageStates.value = null;
    loadImageUrl.value = null;
    sessionId.value += 1;
  };
  const setIndex = (nextIndex) => {
    const list = Array.isArray(items.value) ? items.value : [];
    const i = Number.isFinite(nextIndex) ? nextIndex : 0;
    index.value = Math.max(0, Math.min(i, Math.max(list.length - 1, 0)));
  };
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
  };
  const setSlideshowActive = (active) => {
    slideshowActive.value = !!active;
  };
  const requestDownload = () => {
    const item = currentItem.value;
    if (!item) return;
    onDownload.value?.(item);
  };
  const requestGetLink = () => {
    const item = currentItem.value;
    if (!item) return;
    onGetLink.value?.(item);
  };
  return {
    // state
    isOpen,
    sessionId,
    items,
    index,
    currentItem,
    darkMode,
    imageStates,
    loadImageUrl,
    sidebarOpen,
    menuOpen,
    slideshowActive,
    // actions
    open,
    close,
    setIndex,
    toggleSidebar,
    toggleMenu,
    setSlideshowActive,
    requestDownload,
    requestGetLink
  };
}
const _hoisted_1 = { class: "mount-explorer-container mx-auto px-3 sm:px-6 flex-1 flex flex-col pt-6 sm:pt-8 w-full max-w-full sm:max-w-6xl" };
const _hoisted_2 = { class: "flex items-center gap-2" };
const _hoisted_3 = ["title"];
const _hoisted_4 = ["title"];
const _hoisted_5 = {
  key: 0,
  class: "mount-explorer-main"
};
const _hoisted_6 = {
  key: 1,
  class: "mb-4"
};
const _hoisted_7 = { class: "px-1" };
const _hoisted_8 = { class: "mt-2" };
const _hoisted_9 = { class: "text-xs font-medium mb-1" };
const _hoisted_10 = { class: "max-h-32 overflow-y-auto bg-gray-50 dark:bg-gray-700 rounded p-2 text-xs" };
const _hoisted_11 = { class: "truncate" };
const _hoisted_12 = {
  key: 0,
  class: "ml-1 text-gray-500"
};
const _hoisted_13 = {
  key: 0,
  class: "text-gray-500 py-0.5"
};
const _hoisted_14 = { class: "mb-4" };
const _hoisted_15 = { class: "mount-content bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200" };
const _hoisted_16 = { key: "list" };
const _hoisted_17 = {
  key: 0,
  class: "mb-4 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg"
};
const _hoisted_18 = { class: "flex items-start justify-between gap-3" };
const _hoisted_19 = { class: "flex items-start" };
const _hoisted_20 = { class: "text-red-700 dark:text-red-200 font-medium" };
const _hoisted_21 = { class: "text-red-700/90 dark:text-red-200/90 text-sm mt-0.5" };
const _hoisted_22 = { class: "mt-3 flex flex-wrap gap-2" };
const _hoisted_23 = { class: "min-h-[400px]" };
const _hoisted_24 = { key: "preview" };
const _hoisted_25 = {
  key: 0,
  class: "p-8 text-center"
};
const _hoisted_26 = {
  key: 1,
  class: "p-8 text-center"
};
const _hoisted_27 = { class: "flex flex-col items-center space-y-4" };
const _hoisted_28 = { class: "text-red-600 dark:text-red-400" };
const _hoisted_29 = {
  key: 2,
  class: "p-4"
};
const _hoisted_30 = { class: "mb-4" };
const _sfc_main = {
  __name: "MountExplorerView",
  props: {
    mode: {
      type: String,
      default: "default"
      // 默认模式，或 "selection"（选择模式）
    }
  },
  setup(__props) {
    const FilePreview = defineAsyncComponent(() => __vitePreload(() => import("./FilePreview-DiHL5H4A.js"), true ? __vite__mapDeps([15,1,8,10,4,3,11,16,17,9,7,18,19,5]) : void 0));
    const UppyUploadModal = defineAsyncComponent(() => __vitePreload(() => import("./UppyUploadModal-DU8vVGk0.js"), true ? __vite__mapDeps([20,1,21,18,10,11]) : void 0));
    const CopyModal = defineAsyncComponent(() => __vitePreload(() => import("./CopyModal-zl6Q4ZL3.js"), true ? __vite__mapDeps([22,1,9,8,12]) : void 0));
    const TaskListModal = defineAsyncComponent(() => __vitePreload(() => import("./TaskListModal-C-xZ3pDd.js"), true ? __vite__mapDeps([23,1,10,6,4]) : void 0));
    const SearchModal = defineAsyncComponent(() => __vitePreload(() => import("./SearchModal-dlMVdhnx.js"), true ? __vite__mapDeps([24,1,8,11,5,4,6,10,9,12,13,14]) : void 0));
    const FsMediaLightboxDialog = defineAsyncComponent(() => __vitePreload(() => import("./FsMediaLightboxDialog-CfM1tbep.js"), true ? __vite__mapDeps([25,1,7,6,4,10,26,8,9,11,5,12,13,14]) : void 0));
    const SettingsDrawer = defineAsyncComponent(() => __vitePreload(() => import("./SettingsDrawer-Dz-LtZC_.js"), true ? __vite__mapDeps([27,1]) : void 0));
    const { t } = useI18n();
    const log = createLogger("MountExplorerView");
    const validateFsItemNameDialog = createFsItemNameDialogValidator(t);
    const selection = useSelection();
    const fileOperations = useFileOperations();
    const uiState = useUIState();
    const fileBasket = useFileBasket();
    const pathPassword = usePathPassword();
    let contextMenu = null;
    const fsLightbox = useFsMediaLightbox();
    const { isBasketOpen } = storeToRefs(fileBasket);
    const {
      currentPath,
      currentViewPath,
      loading,
      error,
      hasPermissionForCurrentPath,
      directoryItems,
      isVirtualDirectory,
      directoryMeta,
      directoryHasMore,
      directoryLoadingMore,
      isAdmin,
      hasFilePermission,
      hasPermission,
      apiKeyInfo,
      currentMountId,
      previewFile,
      previewInfo,
      isPreviewLoading,
      previewError,
      showFilePreview,
      navigateTo,
      navigateToPreserveHistory,
      navigateToFile,
      stopPreview,
      refreshDirectory,
      refreshCurrentRoute,
      prefetchDirectory,
      consumePendingScrollRestore,
      invalidateCaches,
      removeItemsFromCurrentDirectory,
      loadMoreCurrentDirectory
    } = useMountExplorerController();
    const { y: windowScrollY } = useWindowScroll();
    const hasEverOpenedUploadModal = ref(false);
    const hasEverOpenedCopyModal = ref(false);
    const hasEverOpenedTasksModal = ref(false);
    const hasEverOpenedSearchModal = ref(false);
    const hasEverOpenedSettingsDrawer = ref(false);
    const hasEverOpenedLightbox = ref(false);
    const scheduleWindowScrollTo = (top) => {
      if (typeof window === "undefined") return;
      if (typeof requestAnimationFrame === "function") {
        requestAnimationFrame(() => {
          windowScrollY.value = top;
        });
        return;
      }
      setTimeout(() => {
        windowScrollY.value = top;
      }, 0);
    };
    const handleContentBeforeEnter = () => {
      if (showFilePreview.value) {
        scheduleWindowScrollTo(0);
        return;
      }
      if (typeof consumePendingScrollRestore === "function") {
        const value = consumePendingScrollRestore();
        if (typeof value === "number") {
          scheduleWindowScrollTo(value);
        }
      }
    };
    const visibleItems = computed(() => {
      const items2 = directoryItems.value || [];
      const meta = directoryMeta.value;
      const patterns = meta && Array.isArray(meta.hidePatterns) ? meta.hidePatterns : [];
      if (!patterns.length) {
        return items2;
      }
      const regexes = patterns.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch {
          return null;
        }
      }).filter((re) => re);
      if (!regexes.length) {
        return items2;
      }
      return items2.filter((item) => !regexes.some((re) => re.test(item.name)));
    });
    const { selectedItems, selectedCount, setAvailableItems, toggleSelectAll, getSelectedItems, selectItem, clearSelection } = selection;
    const {
      // 消息管理
      showMessage,
      // 弹窗状态管理
      isUploadModalOpen,
      isCopyModalOpen,
      isTasksModalOpen,
      isSearchModalOpen,
      openUploadModal,
      closeUploadModal,
      openCopyModal,
      closeCopyModal,
      openTasksModal,
      closeTasksModal,
      openSearchModal,
      closeSearchModal
    } = uiState;
    const showDeleteDialog = ref(false);
    const itemsToDelete = ref([]);
    const isDeleting = ref(false);
    const contextMenuRenameItem = ref(null);
    const contextMenuRenameDialogOpen = ref(false);
    const isRenaming = ref(false);
    const contextMenuCopyItems = ref([]);
    const contextHighlightPath = ref(null);
    const directoryListRef = ref(null);
    const isDirectoryListRenaming = ref(false);
    const showCreateFolderDialog = ref(false);
    const isCreatingFolder = ref(false);
    const isSettingsDrawerOpen = ref(false);
    watch(
      () => isUploadModalOpen.value,
      (open) => {
        if (open) hasEverOpenedUploadModal.value = true;
      }
    );
    watch(
      () => isCopyModalOpen.value,
      (open) => {
        if (open) hasEverOpenedCopyModal.value = true;
      }
    );
    watch(
      () => isTasksModalOpen.value,
      (open) => {
        if (open) hasEverOpenedTasksModal.value = true;
      }
    );
    watch(
      () => isSearchModalOpen.value,
      (open) => {
        if (open) hasEverOpenedSearchModal.value = true;
      }
    );
    watch(
      () => isSettingsDrawerOpen.value,
      (open) => {
        if (open) hasEverOpenedSettingsDrawer.value = true;
      }
    );
    watch(
      () => fsLightbox.isOpen.value,
      (open) => {
        if (open) hasEverOpenedLightbox.value = true;
      }
    );
    const explorerSettings = useExplorerSettings();
    const viewMode = computed(() => explorerSettings.settings.viewMode);
    const setViewMode = (mode) => explorerSettings.setViewMode(mode);
    const copyModalItems = computed(() => {
      if (contextMenuCopyItems.value.length > 0) {
        return contextMenuCopyItems.value;
      }
      return getSelectedItems();
    });
    const initContextMenu = () => {
      contextMenu = useContextMenu({
        onDownload: handleDownload,
        onGetLink: handleGetLink,
        onRename: (item) => {
          contextMenuRenameItem.value = item;
          contextMenuRenameDialogOpen.value = true;
        },
        onDelete: (items2) => {
          if (Array.isArray(items2)) {
            itemsToDelete.value = items2;
          } else {
            itemsToDelete.value = [items2];
          }
          showDeleteDialog.value = true;
        },
        onCopy: (items2) => {
          const itemsArray = Array.isArray(items2) ? items2 : [items2];
          if (itemsArray.length === 0) {
            showMessage("warning", t("mount.messages.noItemsSelected"));
            return;
          }
          contextMenuCopyItems.value = itemsArray;
          openCopyModal();
        },
        onAddToBasket: (items2) => {
          const itemsArray = Array.isArray(items2) ? items2 : [items2];
          const result = fileBasket.addSelectedToBasket(itemsArray, currentPath.value);
          if (result.success) {
            showMessage("success", result.message);
          } else {
            showMessage("error", result.message);
          }
        },
        onToggleCheckboxes: () => {
          explorerSettings.toggleShowCheckboxes();
        },
        t
      });
    };
    onMounted(() => {
      explorerSettings.loadSettings();
      explorerSettings.setupDarkModeObserver();
      initContextMenu();
    });
    const { isDarkMode: darkMode2 } = useThemeMode();
    const handlePermissionChange = (hasPermission2) => {
    };
    const navigateToAdmin = () => {
      __vitePreload(async () => {
        const { routerUtils } = await import("./index-BQxzU9F1.js").then((n) => n.f9);
        return { routerUtils };
      }, true ? [] : void 0).then(({ routerUtils }) => {
        routerUtils.navigateTo("admin");
      });
    };
    const handleOpenSearchModal = () => {
      openSearchModal();
    };
    const handleOpenSettingsDrawer = () => {
      isSettingsDrawerOpen.value = true;
    };
    const handleCloseSettingsDrawer = () => {
      isSettingsDrawerOpen.value = false;
    };
    const handleOpenFileBasket = () => {
      fileBasket.toggleBasket();
    };
    const handleBatchDownload = async () => {
      const selectedFiles = getSelectedItems();
      for (const item of selectedFiles) {
        if (!item.isDirectory) {
          await handleDownload(item);
        }
      }
    };
    const handleBatchGetLink = async () => {
      const selectedFiles = getSelectedItems();
      if (selectedFiles.length === 1 && !selectedFiles[0].isDirectory) {
        await handleGetLink(selectedFiles[0]);
      }
    };
    const handleBatchRename = () => {
      const selectedFiles = getSelectedItems();
      if (selectedFiles.length === 1) {
        contextMenuRenameItem.value = selectedFiles[0];
        contextMenuRenameDialogOpen.value = true;
      }
    };
    const handleClearSelection = () => {
      clearSelection();
    };
    const handleCloseSearchModal = () => {
      closeSearchModal();
    };
    const handleSearchItemClick = async (item) => {
      try {
        if (!item.isDirectory) {
          await navigateToFile(item.path);
        } else {
          await navigateTo(item.path);
        }
        closeSearchModal();
      } catch (error2) {
        log.error("搜索结果导航失败:", error2);
        showMessage("error", "导航失败: " + error2.message);
      }
    };
    const handleNavigate = async (path) => {
      if (isSameOrSubPath(path, currentViewPath.value)) {
        await navigateToPreserveHistory(path);
        return;
      }
      await navigateTo(path);
    };
    const handlePrefetch = (path) => {
      prefetchDirectory(path);
    };
    const handleRefresh = async () => {
      await refreshDirectory();
    };
    const handleLoadMore = async () => {
      await loadMoreCurrentDirectory();
    };
    const handleViewModeChange = (newViewMode) => {
      setViewMode(newViewMode);
    };
    const handleCreateFolder = () => {
      showCreateFolderDialog.value = true;
    };
    const handleCreateFolderConfirm = async (folderName) => {
      if (!folderName) return;
      isCreatingFolder.value = true;
      try {
        const result = await fileOperations.createFolder(currentPath.value, folderName);
        if (result.success) {
          showMessage("success", result.message);
          invalidateCaches();
          await refreshDirectory();
          showCreateFolderDialog.value = false;
        } else {
          showMessage("error", result.message);
        }
      } catch (error2) {
        log.error("创建文件夹失败:", error2);
        showMessage("error", "创建文件夹失败，请重试");
      } finally {
        isCreatingFolder.value = false;
      }
    };
    const handleCreateFolderCancel = () => {
      showCreateFolderDialog.value = false;
    };
    const handleContextMenuRenameConfirm = async (newName) => {
      if (!contextMenuRenameItem.value || !newName || !newName.trim()) return;
      const nameValidation = validateFsItemName(newName);
      if (!nameValidation.valid) return;
      isRenaming.value = true;
      try {
        const item = contextMenuRenameItem.value;
        const isDirectory = item.isDirectory;
        const oldPath = item.path;
        const basePath = isDirectory && oldPath.endsWith("/") ? oldPath.slice(0, -1) : oldPath;
        const parentPath = basePath.substring(0, basePath.lastIndexOf("/") + 1);
        let newPath = parentPath + newName.trim();
        if (isDirectory) {
          newPath += "/";
        }
        const result = await fileOperations.renameItem(oldPath, newPath);
        if (result.success) {
          showMessage("success", result.message);
          invalidateCaches();
          await refreshDirectory();
          contextMenuRenameDialogOpen.value = false;
          contextMenuRenameItem.value = null;
        } else {
          showMessage("error", result.message);
        }
      } catch (error2) {
        log.error("重命名失败:", error2);
        showMessage("error", error2.message || t("mount.rename.failed"));
      } finally {
        isRenaming.value = false;
      }
    };
    const handleContextMenuRenameCancel = () => {
      contextMenuRenameDialogOpen.value = false;
      contextMenuRenameItem.value = null;
    };
    const handleDownload = async (item) => {
      const result = await fileOperations.downloadFile(item);
      if (result.success) {
        showMessage("success", result.message);
      } else {
        showMessage("error", result.message);
      }
    };
    const handleGetLink = async (item) => {
      const result = await fileOperations.getFileLink(item);
      if (result.success) {
        showMessage("success", result.message);
      } else {
        showMessage("error", result.message);
      }
    };
    const handlePreview = async (item) => {
      if (!item || item.isDirectory) return;
      await navigateToFile(item.path);
    };
    const handleDelete = (item) => {
      itemsToDelete.value = [item];
      showDeleteDialog.value = true;
    };
    const handleRename = async ({ item, newName }) => {
      if (!item || !newName || !newName.trim()) return;
      const nameValidation = validateFsItemName(newName);
      if (!nameValidation.valid) return;
      isDirectoryListRenaming.value = true;
      try {
        const isDirectory = item.isDirectory;
        const oldPath = item.path;
        const basePath = isDirectory && oldPath.endsWith("/") ? oldPath.slice(0, -1) : oldPath;
        const parentPath = basePath.substring(0, basePath.lastIndexOf("/") + 1);
        let newPath = parentPath + newName.trim();
        if (isDirectory) {
          newPath += "/";
        }
        const result = await fileOperations.renameItem(oldPath, newPath);
        if (result.success) {
          showMessage("success", result.message);
          invalidateCaches();
          await refreshDirectory();
        } else {
          showMessage("error", result.message);
        }
      } catch (error2) {
        showMessage("error", error2.message || t("mount.rename.failed"));
      } finally {
        isDirectoryListRenaming.value = false;
        directoryListRef.value?.closeRenameDialog();
      }
    };
    const handleItemSelect = (item, selected) => {
      selectItem(item, selected);
    };
    const batchDelete = () => {
      const selectedFiles = getSelectedItems();
      if (selectedFiles.length === 0) {
        showMessage("warning", t("mount.messages.noItemsSelected"));
        return;
      }
      itemsToDelete.value = selectedFiles;
      showDeleteDialog.value = true;
    };
    const cancelDelete = () => {
      if (isDeleting.value) return;
      itemsToDelete.value = [];
    };
    const confirmDelete = async () => {
      if (itemsToDelete.value.length === 0 || isDeleting.value) return;
      isDeleting.value = true;
      try {
        const result = await fileOperations.batchDeleteItems(itemsToDelete.value);
        if (result.success) {
          showMessage("success", result.message);
          invalidateCaches();
          removeItemsFromCurrentDirectory(itemsToDelete.value.map((item) => item?.path).filter(Boolean));
          if (itemsToDelete.value.length > 1) {
            clearSelection();
          }
          showDeleteDialog.value = false;
          itemsToDelete.value = [];
          await refreshDirectory();
        } else {
          showMessage("error", result.message);
        }
      } catch (error2) {
        log.error("删除操作失败:", error2);
        showMessage("error", error2.message || t("mount.messages.deleteFailed", { message: t("common.unknown") }));
      } finally {
        isDeleting.value = false;
      }
    };
    const handleBatchAddToBasket = () => {
      try {
        const selectedFiles = getSelectedItems();
        const result = fileBasket.addSelectedToBasket(selectedFiles, currentPath.value);
        if (result.success) {
          showMessage("success", result.message);
        } else {
          showMessage("error", result.message);
        }
      } catch (error2) {
        log.error("批量添加到文件篮失败:", error2);
        showMessage("error", t("fileBasket.messages.batchAddFailed"));
      }
    };
    const handleOpenUploadModal = () => {
      openUploadModal();
    };
    const handleCloseUploadModal = () => {
      closeUploadModal();
    };
    const handleUploadSuccess = async (payload) => {
      const count = Number(payload?.count || 0);
      const skippedUploadCount = Number(payload?.skippedUploadCount || 0);
      if (skippedUploadCount > 0) {
        showMessage("success", t("mount.messages.uploadSuccessWithSkipped", { count, skipped: skippedUploadCount }));
      } else if (count > 1) {
        showMessage("success", t("mount.messages.uploadSuccessWithCount", { count }));
      } else {
        showMessage("success", t("mount.messages.uploadSuccess"));
      }
      invalidateCaches();
      await refreshDirectory();
    };
    const handleUploadError = (error2) => {
      log.error("上传失败:", error2);
      showMessage("error", error2.message || t("mount.messages.uploadFailed"));
    };
    const handleBatchCopy = () => {
      if (selectedItems.value.length === 0) {
        showMessage("warning", t("mount.messages.noItemsSelected"));
        return;
      }
      openCopyModal();
    };
    const handleCloseCopyModal = () => {
      closeCopyModal();
      contextMenuCopyItems.value = [];
    };
    const handleCopyStarted = (event) => {
      const message = event?.message || t("mount.taskManager.copyStarted", {
        count: event?.itemCount || 0,
        path: event?.targetPath || ""
      });
      showMessage("success", message);
      clearSelection();
    };
    const handleOpenTasksModal = () => {
      openTasksModal();
    };
    const handleCloseTasksModal = () => {
      closeTasksModal();
    };
    const handleTaskCompleted = async (event) => {
      setTimeout(async () => {
        try {
          invalidateCaches();
          await refreshDirectory();
          showMessage("success", t("mount.taskManager.taskCompletedRefresh"));
        } catch (error2) {
          log.error("[MountExplorer] 刷新目录失败:", error2);
        }
      }, 500);
    };
    const handleTaskCreated = (taskInfo) => {
    };
    const handleShowMessage = (messageInfo) => {
      showMessage(messageInfo.type, messageInfo.message);
    };
    let clearHighlightHandler = null;
    let stopClearHighlightListener = null;
    const handleFileContextMenu = (payload) => {
      if (!contextMenu) return;
      const { event, item, action } = payload;
      if (action) {
        switch (action) {
          case "copy":
            if (payload.items && payload.items.length > 0) {
              contextMenuCopyItems.value = payload.items;
              openCopyModal();
            }
            return;
          case "add-to-basket":
            if (payload.items && payload.items.length > 0) {
              const result = fileBasket.addSelectedToBasket(payload.items, currentPath.value);
              if (result.success) {
                showMessage("success", result.message);
              } else {
                showMessage("error", result.message);
              }
            }
            return;
          case "toggle-checkboxes":
            explorerSettings.toggleShowCheckboxes();
            return;
        }
      }
      if (!item) return;
      if (typeof stopClearHighlightListener === "function") {
        stopClearHighlightListener();
        stopClearHighlightListener = null;
      }
      clearHighlightHandler = null;
      const selectedFiles = getSelectedItems();
      const isItemSelected = selectedFiles.some((i) => i.path === item.path);
      let itemsForMenu;
      if (selectedFiles.length > 0) {
        if (isItemSelected) {
          itemsForMenu = selectedFiles;
          contextHighlightPath.value = null;
        } else {
          itemsForMenu = [item];
          contextHighlightPath.value = item.path;
        }
      } else {
        itemsForMenu = [item];
        contextHighlightPath.value = item.path;
      }
      contextMenu.showContextMenu(event, item, itemsForMenu, darkMode2.value, explorerSettings.settings.showCheckboxes);
      clearHighlightHandler = () => {
        contextHighlightPath.value = null;
        if (typeof stopClearHighlightListener === "function") {
          stopClearHighlightListener();
          stopClearHighlightListener = null;
        }
      };
      setTimeout(() => {
        if (clearHighlightHandler) {
          stopClearHighlightListener = useEventListener(document, "click", clearHighlightHandler, { once: true });
        }
      }, 50);
    };
    const handlePasswordVerified = ({ path, token, message }) => {
      pathPassword.savePathToken(path, token);
      showMessage("success", message || t("mount.pathPassword.verified"));
      pathPassword.closePasswordDialog();
      pathPassword.clearPendingPath();
      refreshCurrentRoute();
    };
    const handlePasswordCancel = async () => {
      pathPassword.closePasswordDialog();
      pathPassword.clearPendingPath();
      const currentPathValue = currentPath.value;
      let parentPath = "/";
      if (currentPathValue && currentPathValue !== "/") {
        const normalized = currentPathValue.replace(/\/+$/, "");
        const lastSlashIndex = normalized.lastIndexOf("/");
        if (lastSlashIndex > 0) {
          parentPath = normalized.substring(0, lastSlashIndex);
        }
      }
      await navigateTo(parentPath);
    };
    const handlePasswordClose = () => {
      pathPassword.closePasswordDialog();
    };
    const handlePasswordError = ({ message }) => {
      log.error("密码验证错误:", message);
      showMessage("error", message);
    };
    let lastPreviewLoadedKey = "";
    const handlePreviewLoaded = () => {
      const f = previewInfo.value || previewFile.value;
      const key = f?.path || f?.name || "";
      if (key && key === lastPreviewLoadedKey) return;
      lastPreviewLoadedKey = key;
    };
    const handlePreviewError = (error2) => {
      log.error("预览加载失败:", error2);
      showMessage("error", t("mount.messages.previewError"));
    };
    const closePreviewWithUrl = async () => {
      await navigateToPreserveHistory(currentPath.value);
    };
    const handleRetryDirectory = async () => {
      error.value = null;
      await refreshDirectory();
    };
    const dismissDirectoryError = () => {
      error.value = null;
    };
    provide("darkMode", darkMode2);
    provide("isAdmin", isAdmin);
    provide("apiKeyInfo", apiKeyInfo);
    provide("hasPermissionForCurrentPath", hasPermissionForCurrentPath);
    provide("navigateToFile", navigateToFile);
    const handleAuthStateChange = (event) => {
    };
    const handleGlobalKeydown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        if (hasPermission.value && !isSearchModalOpen.value) {
          handleOpenSearchModal();
        }
      }
      if (event.key === "Escape" && isSearchModalOpen.value) {
        handleCloseSearchModal();
      }
    };
    useEventListener(window, "auth-state-changed", handleAuthStateChange);
    useEventListener(document, "keydown", handleGlobalKeydown);
    watch(
      () => visibleItems.value,
      (newItems) => {
        setAvailableItems(newItems);
      },
      { immediate: true }
    );
    watch(
      () => currentPath.value,
      (newPath, oldPath) => {
        if (newPath !== oldPath && pathPassword.showPasswordDialog.value) {
          pathPassword.closePasswordDialog();
          pathPassword.clearPendingPath();
        }
      }
    );
    onBeforeUnmount(() => {
      if (typeof stopClearHighlightListener === "function") {
        stopClearHighlightListener();
        stopClearHighlightListener = null;
      }
      clearHighlightHandler = null;
      explorerSettings.cleanupDarkModeObserver();
      stopPreview();
      clearSelection();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: normalizeClass(["header mb-4 border-b pb-2 flex justify-between items-center", unref(darkMode2) ? "border-gray-800" : "border-gray-100"])
        }, [
          createBaseVNode("h2", {
            class: normalizeClass(["text-xl font-semibold", unref(darkMode2) ? "text-gray-100" : "text-gray-900"])
          }, toDisplayString(_ctx.$t("mount.title")), 3),
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("button", {
              onClick: handleOpenSearchModal,
              class: normalizeClass([
                "flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all duration-200 hover:shadow-sm",
                unref(darkMode2) ? "border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-gray-200" : "border-gray-300 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-700"
              ]),
              title: _ctx.$t("search.title")
            }, [
              createVNode(unref(IconSearch), {
                size: "sm",
                class: "w-4 h-4",
                "aria-hidden": "true"
              }),
              createBaseVNode("span", {
                class: normalizeClass(["hidden sm:inline text-sm text-gray-500", unref(darkMode2) ? "text-gray-400" : "text-gray-500"])
              }, toDisplayString(_ctx.$t("search.placeholder")), 3),
              createBaseVNode("kbd", {
                class: normalizeClass(["hidden lg:inline-flex items-center px-1.5 py-0.5 text-xs font-mono rounded border", unref(darkMode2) ? "bg-gray-700 border-gray-600 text-gray-300" : "bg-gray-100 border-gray-300 text-gray-600"])
              }, " Ctrl K ", 2)
            ], 10, _hoisted_3),
            createBaseVNode("button", {
              onClick: handleOpenSettingsDrawer,
              class: normalizeClass([
                "p-2 rounded-md border transition-all duration-200 hover:shadow-sm",
                unref(darkMode2) ? "border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-gray-200" : "border-gray-300 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-700"
              ]),
              title: _ctx.$t("mount.settings.title")
            }, [
              createVNode(unref(IconSettings), {
                size: "sm",
                class: "w-4 h-4",
                "aria-hidden": "true"
              })
            ], 10, _hoisted_4)
          ])
        ], 2),
        createVNode(PermissionManager, {
          "dark-mode": unref(darkMode2),
          "permission-type": "mount",
          "permission-required-text": _ctx.$t("mount.permissionRequired"),
          "login-auth-text": _ctx.$t("mount.loginAuth"),
          onPermissionChange: handlePermissionChange,
          onNavigateToAdmin: navigateToAdmin
        }, null, 8, ["dark-mode", "permission-required-text", "login-auth-text"]),
        unref(hasPermission) ? (openBlock(), createElementBlock("div", _hoisted_5, [
          !unref(showFilePreview) ? (openBlock(), createBlock(_sfc_main$8, {
            key: 0,
            position: "top",
            meta: unref(directoryMeta),
            "dark-mode": unref(darkMode2)
          }, null, 8, ["meta", "dark-mode"])) : createCommentVNode("", true),
          !unref(showFilePreview) ? (openBlock(), createElementBlock("div", _hoisted_6, [
            createBaseVNode("div", _hoisted_7, [
              createVNode(_sfc_main$5, {
                "current-path": unref(currentPath),
                "is-virtual": unref(isVirtualDirectory),
                "dark-mode": unref(darkMode2),
                "view-mode": viewMode.value,
                "selected-items": unref(selectedItems),
                onCreateFolder: handleCreateFolder,
                onRefresh: handleRefresh,
                onChangeViewMode: handleViewModeChange,
                onOpenUploadModal: handleOpenUploadModal,
                onOpenCopyModal: handleBatchCopy,
                onOpenTasksModal: handleOpenTasksModal,
                onTaskCreated: handleTaskCreated,
                onShowMessage: handleShowMessage
              }, null, 8, ["current-path", "is-virtual", "dark-mode", "view-mode", "selected-items"])
            ])
          ])) : createCommentVNode("", true),
          hasEverOpenedUploadModal.value ? (openBlock(), createBlock(unref(UppyUploadModal), {
            key: 2,
            "is-open": unref(isUploadModalOpen),
            "current-path": unref(currentPath),
            "dark-mode": unref(darkMode2),
            "is-admin": unref(isAdmin),
            onClose: handleCloseUploadModal,
            onUploadSuccess: handleUploadSuccess,
            onUploadError: handleUploadError
          }, null, 8, ["is-open", "current-path", "dark-mode", "is-admin"])) : createCommentVNode("", true),
          hasEverOpenedCopyModal.value ? (openBlock(), createBlock(unref(CopyModal), {
            key: 3,
            "is-open": unref(isCopyModalOpen),
            "dark-mode": unref(darkMode2),
            "selected-items": copyModalItems.value,
            "source-path": unref(currentPath),
            "is-admin": unref(isAdmin),
            "api-key-info": unref(apiKeyInfo),
            onClose: handleCloseCopyModal,
            onCopyStarted: handleCopyStarted
          }, null, 8, ["is-open", "dark-mode", "selected-items", "source-path", "is-admin", "api-key-info"])) : createCommentVNode("", true),
          hasEverOpenedTasksModal.value ? (openBlock(), createBlock(unref(TaskListModal), {
            key: 4,
            "is-open": unref(isTasksModalOpen),
            "dark-mode": unref(darkMode2),
            onClose: handleCloseTasksModal,
            onTaskCompleted: handleTaskCompleted
          }, null, 8, ["is-open", "dark-mode"])) : createCommentVNode("", true),
          createVNode(_sfc_main$a, {
            "is-open": showCreateFolderDialog.value,
            title: unref(t)("mount.operations.createFolder"),
            description: unref(t)("mount.createFolder.enterName"),
            label: unref(t)("mount.createFolder.folderName"),
            placeholder: unref(t)("mount.createFolder.placeholder"),
            validator: unref(validateFsItemNameDialog),
            "confirm-text": unref(t)("mount.createFolder.create"),
            "cancel-text": unref(t)("mount.createFolder.cancel"),
            loading: isCreatingFolder.value,
            "loading-text": unref(t)("mount.createFolder.creating"),
            "dark-mode": unref(darkMode2),
            onConfirm: handleCreateFolderConfirm,
            onCancel: handleCreateFolderCancel,
            onClose: _cache[0] || (_cache[0] = ($event) => showCreateFolderDialog.value = false)
          }, null, 8, ["is-open", "title", "description", "label", "placeholder", "validator", "confirm-text", "cancel-text", "loading", "loading-text", "dark-mode"]),
          createVNode(_sfc_main$a, {
            "is-open": contextMenuRenameDialogOpen.value,
            title: unref(t)("mount.rename.title"),
            description: unref(t)("mount.rename.enterNewName"),
            label: unref(t)("mount.rename.newName"),
            "initial-value": contextMenuRenameItem.value?.name || "",
            validator: unref(validateFsItemNameDialog),
            "confirm-text": unref(t)("mount.rename.confirm"),
            "cancel-text": unref(t)("mount.rename.cancel"),
            loading: isRenaming.value,
            "loading-text": unref(t)("mount.rename.renaming"),
            "dark-mode": unref(darkMode2),
            onConfirm: handleContextMenuRenameConfirm,
            onCancel: handleContextMenuRenameCancel,
            onClose: _cache[1] || (_cache[1] = ($event) => contextMenuRenameDialogOpen.value = false)
          }, null, 8, ["is-open", "title", "description", "label", "initial-value", "validator", "confirm-text", "cancel-text", "loading", "loading-text", "dark-mode"]),
          createVNode(_sfc_main$e, {
            "is-open": showDeleteDialog.value,
            title: itemsToDelete.value.length === 1 ? unref(t)("mount.delete.title") : unref(t)("mount.batchDelete.title"),
            "confirm-text": itemsToDelete.value.length === 1 ? unref(t)("mount.delete.confirm") : unref(t)("mount.batchDelete.confirmButton"),
            "cancel-text": itemsToDelete.value.length === 1 ? unref(t)("mount.delete.cancel") : unref(t)("mount.batchDelete.cancelButton"),
            loading: isDeleting.value,
            "loading-text": itemsToDelete.value.length === 1 ? unref(t)("mount.delete.deleting") : unref(t)("mount.batchDelete.deleting"),
            "dark-mode": unref(darkMode2),
            "confirm-type": "danger",
            onConfirm: confirmDelete,
            onCancel: cancelDelete,
            onClose: _cache[2] || (_cache[2] = ($event) => showDeleteDialog.value = false)
          }, {
            content: withCtx(() => [
              itemsToDelete.value.length === 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(toDisplayString(unref(t)("mount.delete.message", {
                  type: itemsToDelete.value[0]?.isDirectory ? unref(t)("mount.fileTypes.folder") : unref(t)("mount.fileTypes.file"),
                  name: itemsToDelete.value[0]?.name
                })) + " " + toDisplayString(itemsToDelete.value[0]?.isDirectory ? unref(t)("mount.delete.folderWarning") : ""), 1)
              ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(unref(t)("mount.batchDelete.message", { count: itemsToDelete.value.length })) + " ", 1),
                createBaseVNode("div", _hoisted_8, [
                  createBaseVNode("div", _hoisted_9, toDisplayString(unref(t)("mount.batchDelete.selectedItems")), 1),
                  createBaseVNode("div", _hoisted_10, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(itemsToDelete.value.slice(0, 10), (item) => {
                      return openBlock(), createElementBlock("div", {
                        key: item.path,
                        class: "flex items-center py-0.5"
                      }, [
                        createBaseVNode("span", _hoisted_11, toDisplayString(item.name), 1),
                        item.isDirectory ? (openBlock(), createElementBlock("span", _hoisted_12, toDisplayString(unref(t)("mount.batchDelete.folder")), 1)) : createCommentVNode("", true)
                      ]);
                    }), 128)),
                    itemsToDelete.value.length > 10 ? (openBlock(), createElementBlock("div", _hoisted_13, toDisplayString(unref(t)("mount.batchDelete.moreItems", { count: itemsToDelete.value.length - 10 })), 1)) : createCommentVNode("", true)
                  ])
                ])
              ], 64))
            ]),
            _: 1
          }, 8, ["is-open", "title", "confirm-text", "cancel-text", "loading", "loading-text", "dark-mode"]),
          createBaseVNode("div", _hoisted_14, [
            createVNode(_sfc_main$d, {
              "current-path": unref(currentViewPath),
              "dark-mode": unref(darkMode2),
              onNavigate: handleNavigate,
              onPrefetch: handlePrefetch,
              "basic-path": unref(apiKeyInfo)?.basic_path || "/",
              "user-type": unref(isAdmin) ? "admin" : "user"
            }, null, 8, ["current-path", "dark-mode", "basic-path", "user-type"])
          ]),
          createBaseVNode("div", _hoisted_15, [
            createVNode(Transition, {
              name: "fade-slide",
              mode: "out-in",
              onBeforeEnter: handleContentBeforeEnter
            }, {
              default: withCtx(() => [
                !unref(showFilePreview) ? (openBlock(), createElementBlock("div", _hoisted_16, [
                  unref(pathPassword).showPasswordDialog.value ? (openBlock(), createBlock(_sfc_main$4, {
                    key: 0,
                    "is-open": unref(pathPassword).showPasswordDialog.value,
                    path: unref(pathPassword).pendingPath.value || unref(currentPath),
                    "dark-mode": unref(darkMode2),
                    inline: true,
                    onVerified: handlePasswordVerified,
                    onCancel: handlePasswordCancel,
                    onClose: handlePasswordClose,
                    onError: handlePasswordError
                  }, null, 8, ["is-open", "path", "dark-mode"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    unref(error) ? (openBlock(), createElementBlock("div", _hoisted_17, [
                      createBaseVNode("div", _hoisted_18, [
                        createBaseVNode("div", _hoisted_19, [
                          createVNode(unref(IconXCircle), {
                            size: "md",
                            class: "w-5 h-5 text-red-500 mr-2 mt-0.5 shrink-0",
                            "aria-hidden": "true"
                          }),
                          createBaseVNode("div", null, [
                            createBaseVNode("div", _hoisted_20, toDisplayString(_ctx.$t("common.error")), 1),
                            createBaseVNode("div", _hoisted_21, toDisplayString(unref(error)), 1),
                            createBaseVNode("div", _hoisted_22, [
                              createBaseVNode("button", {
                                class: normalizeClass(["px-3 py-1.5 rounded-md text-sm font-medium transition-colors", unref(darkMode2) ? "bg-red-800/40 hover:bg-red-800/60 text-red-100" : "bg-red-200 hover:bg-red-300 text-red-900"]),
                                onClick: handleRetryDirectory
                              }, toDisplayString(_ctx.$t("common.retry")), 3),
                              createBaseVNode("button", {
                                class: normalizeClass(["px-3 py-1.5 rounded-md text-sm font-medium transition-colors", unref(darkMode2) ? "bg-gray-700 hover:bg-gray-600 text-gray-100" : "bg-gray-200 hover:bg-gray-300 text-gray-800"]),
                                onClick: dismissDirectoryError
                              }, toDisplayString(_ctx.$t("common.close")), 3)
                            ])
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    createBaseVNode("div", _hoisted_23, [
                      createVNode(DirectoryList, {
                        ref_key: "directoryListRef",
                        ref: directoryListRef,
                        "current-path": unref(currentPath),
                        items: visibleItems.value,
                        loading: unref(loading),
                        "has-more": unref(directoryHasMore),
                        "loading-more": unref(directoryLoadingMore),
                        "is-virtual": unref(isVirtualDirectory),
                        "dark-mode": unref(darkMode2),
                        "view-mode": viewMode.value,
                        "show-checkboxes": unref(explorerSettings).settings.showCheckboxes,
                        "selected-items": unref(getSelectedItems)(),
                        "context-highlight-path": contextHighlightPath.value,
                        "animations-enabled": unref(explorerSettings).settings.animationsEnabled,
                        "file-name-overflow": unref(explorerSettings).settings.fileNameOverflow,
                        "show-action-buttons": unref(explorerSettings).settings.showActionButtons,
                        "rename-loading": isDirectoryListRenaming.value,
                        onNavigate: handleNavigate,
                        onDownload: handleDownload,
                        onGetLink: handleGetLink,
                        onRename: handleRename,
                        onDelete: handleDelete,
                        onPreview: handlePreview,
                        onLoadMore: handleLoadMore,
                        onItemSelect: handleItemSelect,
                        onToggleSelectAll: unref(toggleSelectAll),
                        onShowMessage: handleShowMessage,
                        onContextmenu: handleFileContextMenu
                      }, null, 8, ["current-path", "items", "loading", "has-more", "loading-more", "is-virtual", "dark-mode", "view-mode", "show-checkboxes", "selected-items", "context-highlight-path", "animations-enabled", "file-name-overflow", "show-action-buttons", "rename-loading", "onToggleSelectAll"])
                    ])
                  ], 64))
                ])) : (openBlock(), createElementBlock("div", _hoisted_24, [
                  unref(isPreviewLoading) ? (openBlock(), createElementBlock("div", _hoisted_25, [
                    createVNode(_sfc_main$f, {
                      text: _ctx.$t("common.loading"),
                      "dark-mode": unref(darkMode2),
                      size: "xl",
                      "icon-class": "text-blue-500"
                    }, null, 8, ["text", "dark-mode"])
                  ])) : unref(previewError) ? (openBlock(), createElementBlock("div", _hoisted_26, [
                    createBaseVNode("div", _hoisted_27, [
                      createVNode(unref(IconExclamation), {
                        size: "3xl",
                        class: "w-12 h-12 text-red-500",
                        "aria-hidden": "true"
                      }),
                      createBaseVNode("div", _hoisted_28, toDisplayString(unref(previewError)), 1),
                      createBaseVNode("button", {
                        onClick: closePreviewWithUrl,
                        class: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      }, toDisplayString(_ctx.$t("common.back")), 1)
                    ])
                  ])) : unref(previewFile) || unref(previewInfo) ? (openBlock(), createElementBlock("div", _hoisted_29, [
                    createBaseVNode("div", _hoisted_30, [
                      createBaseVNode("button", {
                        onClick: closePreviewWithUrl,
                        class: normalizeClass(["inline-flex items-center px-3 py-1.5 rounded-md transition-colors text-sm font-medium", unref(darkMode2) ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-200 hover:bg-gray-300 text-gray-700"])
                      }, [
                        createVNode(unref(IconBack), {
                          size: "sm",
                          class: "w-4 h-4 mr-1.5",
                          "aria-hidden": "true"
                        }),
                        createBaseVNode("span", null, toDisplayString(unref(t)("mount.backToFileList")), 1)
                      ], 2)
                    ]),
                    createVNode(unref(FilePreview), {
                      file: unref(previewInfo) || unref(previewFile),
                      "dark-mode": unref(darkMode2),
                      "is-loading": unref(isPreviewLoading),
                      "is-admin": unref(isAdmin),
                      "api-key-info": unref(apiKeyInfo),
                      "has-file-permission": unref(hasFilePermission),
                      "directory-items": visibleItems.value,
                      onDownload: handleDownload,
                      onLoaded: handlePreviewLoaded,
                      onError: handlePreviewError,
                      onShowMessage: handleShowMessage
                    }, null, 8, ["file", "dark-mode", "is-loading", "is-admin", "api-key-info", "has-file-permission", "directory-items"])
                  ])) : createCommentVNode("", true)
                ]))
              ]),
              _: 1
            })
          ]),
          !unref(showFilePreview) ? (openBlock(), createBlock(_sfc_main$8, {
            key: 5,
            position: "bottom",
            meta: unref(directoryMeta),
            "dark-mode": unref(darkMode2)
          }, null, 8, ["meta", "dark-mode"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        hasEverOpenedSearchModal.value ? (openBlock(), createBlock(unref(SearchModal), {
          key: 1,
          "is-open": unref(isSearchModalOpen),
          "dark-mode": unref(darkMode2),
          "current-path": unref(currentPath),
          "current-mount-id": unref(currentMountId),
          onClose: handleCloseSearchModal,
          onItemClick: handleSearchItemClick
        }, null, 8, ["is-open", "dark-mode", "current-path", "current-mount-id"])) : createCommentVNode("", true),
        hasEverOpenedSettingsDrawer.value ? (openBlock(), createBlock(unref(SettingsDrawer), {
          key: 2,
          "is-open": isSettingsDrawerOpen.value,
          "dark-mode": unref(darkMode2),
          onClose: handleCloseSettingsDrawer
        }, null, 8, ["is-open", "dark-mode"])) : createCommentVNode("", true),
        hasEverOpenedLightbox.value ? (openBlock(), createBlock(unref(FsMediaLightboxDialog), { key: 3 })) : createCommentVNode("", true),
        unref(hasPermission) && unref(selectedCount) > 0 ? (openBlock(), createBlock(FloatingActionBar, {
          key: 4,
          "selected-count": unref(selectedCount),
          "dark-mode": unref(darkMode2),
          onDownload: handleBatchDownload,
          onCopyLink: handleBatchGetLink,
          onCopy: handleBatchCopy,
          onAddToBasket: handleBatchAddToBasket,
          onRename: handleBatchRename,
          onDelete: batchDelete,
          onClearSelection: handleClearSelection
        }, null, 8, ["selected-count", "dark-mode"])) : createCommentVNode("", true),
        unref(hasPermission) ? (openBlock(), createBlock(FloatingToolbar, {
          key: 5,
          "dark-mode": unref(darkMode2),
          "can-write": !unref(isVirtualDirectory),
          "show-checkboxes": unref(explorerSettings).showCheckboxes,
          onRefresh: handleRefresh,
          onNewFolder: handleCreateFolder,
          onUpload: handleOpenUploadModal,
          onToggleCheckboxes: unref(explorerSettings).toggleShowCheckboxes,
          onOpenBasket: handleOpenFileBasket,
          onOpenTasks: handleOpenTasksModal,
          onSettings: handleOpenSettingsDrawer
        }, null, 8, ["dark-mode", "can-write", "show-checkboxes", "onToggleCheckboxes"])) : createCommentVNode("", true),
        createVNode(BackToTop, { "dark-mode": unref(darkMode2) }, null, 8, ["dark-mode"])
      ]);
    };
  }
};
const MountExplorerView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b373a947"]]);
const MountExplorerView$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MountExplorerView
}, Symbol.toStringTag, { value: "Module" }));
export {
  MountExplorerView$1 as M,
  useFsMediaLightbox as a,
  useUIState as b,
  useContextMenu as u
};
