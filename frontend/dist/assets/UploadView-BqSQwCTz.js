import { e as useI18n, c as createLogger, E as api, r as reactive, g as ref, w as watch, aK as _export_sfc, F as computed, o as onMounted, aP as nextTick, aY as onBeforeUnmount, j as createElementBlock, k as openBlock, z as createVNode, l as createBaseVNode, y as unref, n as normalizeClass, t as toDisplayString, q as withDirectives, ae as vModelSelect, K as Fragment, L as renderList, ao as IconChevronDown, v as vModelText, p as createCommentVNode, M as createBlock, A as createTextVNode, J as IconRefresh, G as IconClose, e5 as fetchUrlContent, e6 as validateUrlInfo, ax as onUnmounted, bd as IconFolderPlus, m as withModifiers, ay as IconExternalLink, al as IconCopy, bo as IconLink, bn as IconQrCode, b7 as IconDelete, e4 as IconCheckbox, dE as IconError, H as IconDownload, Y as useGlobalMessage, f as useAuthStore, b1 as storeToRefs, ac as useThemeMode, _ as __vitePreload } from "./index-BQxzU9F1.js";
import { u as useUppyCore, b as useUppyEvents, d as useUppyPaste, e as useShareUploadController, c as useUppyBackendProgress, f as _sfc_main$3, g as _sfc_main$4, h as _sfc_main$5, i as createUppyPluginManager, D as Dashboard, r as resolveDriverByConfigId } from "./UppyPluginManager-AHtBg_Vv.js";
import { u as useStorageConfigsStore } from "./storageConfigsStore-DUFoycii.js";
import { u as useFileshareService, a as useDeleteSettingsStore } from "./deleteSettingsStore-WCtYZw-P.js";
import { f as formatFileSize, g as getRemainingViews } from "./fileUtils-CALGFK20.js";
import { c as copyToClipboard } from "./clipboard-GLHRBPpJ.js";
import { c as formatDateTime } from "./timeUtils-D81jJILb.js";
import { g as getFileIcon } from "./fileTypeIcons-s4hrDi1Q.js";
import { g as generateQRCode } from "./qrcodeUtils-xDdVh-90.js";
import { P as PermissionManager } from "./PermissionManager-BpGELUYQ.js";
import { Q as QRCodeModal, S as ShareLinkBox } from "./QRCodeModal-BUayVXNJ.js";
import "./fileTypes-C4-giE9O.js";
function useShareUploadDomain() {
  const { t } = useI18n();
  const log = createLogger("ShareUploadDomain");
  const buildPayloadForFile = (formData, slugOverride = "") => ({
    storage_config_id: formData.storage_config_id,
    slug: slugOverride || formData.slug || "",
    path: formData.path || "",
    remark: formData.remark || "",
    password: formData.password || "",
    expires_in: formData.expires_in || "0",
    max_views: Math.max(0, Number(formData.max_views) || 0)
  });
  const processInsufficientStorageError = (errorMessage) => {
    const isInsufficientStorage = errorMessage.includes("存储空间不足") || errorMessage.includes("insufficient storage") || errorMessage.includes("超过剩余空间") || errorMessage.includes("exceeds") || errorMessage.includes("storage") && (errorMessage.includes("limit") || errorMessage.includes("full") || errorMessage.includes("quota"));
    if (!isInsufficientStorage) {
      return errorMessage;
    }
    try {
      const fileSizeMatch = errorMessage.match(/文件大小\((.*?)\)|file size\((.*?)\)/i);
      const remainingSpaceMatch = errorMessage.match(/剩余空间\((.*?)\)|remaining space\((.*?)\)/i);
      const totalCapacityMatch = errorMessage.match(/容量上限为(.*?)。|capacity limit is(.*?)\./i);
      const fileSize = fileSizeMatch ? fileSizeMatch[1] || fileSizeMatch[2] : "";
      const remainingSpace = remainingSpaceMatch ? remainingSpaceMatch[1] || remainingSpaceMatch[2] : "";
      const totalCapacity = totalCapacityMatch ? totalCapacityMatch[1] || totalCapacityMatch[2] : "";
      if (fileSize && remainingSpace && totalCapacity) {
        return t("file.insufficientStorageDetailed", {
          fileSize,
          remainingSpace,
          totalCapacity
        });
      }
    } catch (error) {
      log.error("处理存储空间不足错误信息失败", error);
    }
    return errorMessage;
  };
  const buildErrorDescriptor = (error) => {
    const raw = error?.message || t("common.unknownError");
    const isSlugConflict = raw.includes("slug") && (raw.includes("already exists") || raw.includes("already taken") || raw.includes("duplicate") || raw.includes("conflict")) || raw.includes("链接后缀已被占用") || raw.includes("已存在");
    const isInsufficientStorage = raw.includes("存储空间不足") || raw.includes("insufficient storage") || raw.includes("超过剩余空间") || raw.includes("exceeds") || raw.includes("storage") && (raw.includes("limit") || raw.includes("full") || raw.includes("quota"));
    const isPermissionError = raw.includes("没有权限使用此存储配置") || raw.includes("没有权限") || raw.includes("权限不足") || raw.includes("permission denied") || raw.includes("forbidden") || raw.includes("unauthorized");
    let messageText = raw;
    if (isSlugConflict) {
      messageText = t("file.messages.slugConflict");
    } else if (isInsufficientStorage) {
      messageText = processInsufficientStorageError(raw);
    } else if (isPermissionError) {
      messageText = t("file.messages.permissionError");
    }
    return { message: messageText, raw, isSlugConflict, isInsufficientStorage, isPermissionError };
  };
  const summarizeUploadResults = ({ errors, uploadResults, totalFiles }) => {
    if (errors.length) {
      const allSlugConflicts = errors.every((err) => err.isSlugConflict);
      const hasSlugConflict = errors.some((err) => err.isSlugConflict);
      const allInsufficient = errors.every((err) => err.isInsufficientStorage);
      const allPermission = errors.every((err) => err.isPermissionError);
      const firstStorageError = errors.find((err) => err.isInsufficientStorage);
      if (errors.length === totalFiles) {
        if (allSlugConflicts) {
          return { kind: "error", severity: "error", message: t("file.allSlugConflicts") };
        }
        if (allInsufficient && firstStorageError) {
          return {
            kind: "error",
            severity: "error",
            message: processInsufficientStorageError(firstStorageError.raw)
          };
        }
        if (allPermission) {
          return { kind: "error", severity: "error", message: t("file.allPermissionErrors") };
        }
        return { kind: "error", severity: "error", message: t("file.allUploadsFailed") };
      }
      if (hasSlugConflict) {
        const slugCount = errors.filter((err) => err.isSlugConflict).length;
        return {
          kind: "error",
          severity: "warning",
          message: slugCount === errors.length ? t("file.someSlugConflicts", { count: slugCount }) : t("file.someUploadsFailed", { count: errors.length })
        };
      }
      return {
        kind: "error",
        severity: "warning",
        message: t("file.someUploadsFailed", { count: errors.length })
      };
    }
    if (uploadResults.length > 0) {
      return {
        kind: "success",
        message: uploadResults.length > 1 ? t("file.multipleUploadsSuccessful", { count: uploadResults.length }) : t("file.uploadSuccessful")
      };
    }
    return null;
  };
  return {
    buildPayloadForFile,
    buildErrorDescriptor,
    summarizeUploadResults
  };
}
function useUploadService() {
  const getRecentFiles = async (limit = 5) => {
    const response = await api.file.getFiles(limit, 0);
    const list = response?.data?.files || [];
    return list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  };
  const getMaxUploadSize = async () => {
    return api.file.getMaxUploadSize();
  };
  return {
    getRecentFiles,
    getMaxUploadSize
  };
}
const SLUG_REGEX = /^[a-zA-Z0-9._-]+$/;
const DEFAULT_FORM_STATE = () => ({
  storage_config_id: "",
  slug: "",
  path: "",
  remark: "",
  password: "",
  expires_in: "0",
  max_views: 0
});
function useShareSettingsForm(options = {}) {
  const store = useStorageConfigsStore();
  const { t } = useI18n();
  const formData = reactive(DEFAULT_FORM_STATE());
  const slugError = ref("");
  const pickFirstConfigId = () => {
    const list = store.sortedConfigs;
    if (!list || list.length === 0) return "";
    const defaultConfig = store.defaultConfig;
    return defaultConfig && defaultConfig.id || list[0].id;
  };
  const selectDefaultStorageConfig = () => {
    if (formData.storage_config_id) {
      const exists = store.sortedConfigs.some((config) => config.id === formData.storage_config_id);
      if (exists) return formData.storage_config_id;
    }
    const fallbackId = pickFirstConfigId();
    formData.storage_config_id = fallbackId ?? "";
    return formData.storage_config_id;
  };
  watch(
    () => store.sortedConfigs.map((config) => config.id),
    () => {
      selectDefaultStorageConfig();
    },
    { immediate: true }
  );
  const validateSlug = () => {
    slugError.value = "";
    if (!formData.slug) {
      return true;
    }
    if (!SLUG_REGEX.test(formData.slug)) {
      slugError.value = t("file.messages.slugInvalid");
      return false;
    }
    return true;
  };
  const handleSlugInput = (value) => {
    formData.slug = (value || "").trim();
    validateSlug();
  };
  const handleMaxViewsInput = (value) => {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed >= 0) {
      formData.max_views = parsed;
    } else {
      formData.max_views = 0;
    }
  };
  const resetShareSettings = ({ keepStorage = true } = {}) => {
    const storageId = keepStorage ? formData.storage_config_id : "";
    Object.assign(formData, DEFAULT_FORM_STATE());
    formData.storage_config_id = storageId;
    if (!keepStorage) {
      selectDefaultStorageConfig();
    }
    slugError.value = "";
  };
  return {
    formData,
    slugError,
    validateSlug,
    handleSlugInput,
    handleMaxViewsInput,
    selectDefaultStorageConfig,
    resetShareSettings
  };
}
const _hoisted_1$2 = { class: "uppy-share-uploader" };
const _hoisted_2$2 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" };
const _hoisted_3$2 = { class: "form-group flex flex-col" };
const _hoisted_4$2 = { class: "relative" };
const _hoisted_5$2 = ["disabled"];
const _hoisted_6$2 = {
  value: "",
  disabled: "",
  selected: ""
};
const _hoisted_7$2 = ["value"];
const _hoisted_8$2 = { class: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" };
const _hoisted_9$2 = { class: "form-group flex flex-col" };
const _hoisted_10$2 = ["placeholder", "disabled"];
const _hoisted_11$1 = { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" };
const _hoisted_12$1 = { class: "form-group flex flex-col" };
const _hoisted_13$1 = ["placeholder", "disabled"];
const _hoisted_14$1 = { class: "form-group flex flex-col" };
const _hoisted_15$1 = ["placeholder", "disabled"];
const _hoisted_16$1 = {
  key: 0,
  class: "mt-1 text-xs text-gray-500 dark:text-gray-400"
};
const _hoisted_17$1 = {
  key: 1,
  class: "mt-1 text-sm text-red-600 dark:text-red-400"
};
const _hoisted_18$1 = {
  key: 2,
  class: "mt-1 text-xs text-gray-500 dark:text-gray-400"
};
const _hoisted_19$1 = { class: "form-group flex flex-col" };
const _hoisted_20$1 = ["placeholder", "disabled"];
const _hoisted_21$1 = { class: "form-group flex flex-col" };
const _hoisted_22$1 = ["disabled"];
const _hoisted_23$1 = { value: "1" };
const _hoisted_24$1 = { value: "24" };
const _hoisted_25$1 = { value: "168" };
const _hoisted_26$1 = { value: "720" };
const _hoisted_27$1 = { value: "0" };
const _hoisted_28$1 = { class: "form-group flex flex-col" };
const _hoisted_29$1 = ["placeholder", "disabled"];
const _hoisted_30$1 = { class: "submit-section flex flex-row items-center gap-3 mt-4" };
const _hoisted_31$1 = ["disabled"];
const _sfc_main$2 = {
  __name: "UppyShareUploader",
  props: {
    darkMode: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    storageConfigs: { type: Array, default: () => [] }
  },
  emits: ["upload-success", "upload-error", "share-results"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { locale, t } = useI18n();
    const log = createLogger("UppyShareUploader");
    const { uppyInstance, initializeUppy, destroyUppy, snapshotFiles, restoreFiles } = useUppyCore();
    const { fileCount } = useUppyEvents({
      uppy: uppyInstance,
      onFileAdded: (file) => {
        if (maxUploadBytes.value && file?.size > maxUploadBytes.value) {
          errorMessage.value = t("file.maxSizeExceeded", { size: formatMaxFileSize() });
          try {
            uppyInstance.value.removeFile(file.id);
          } catch {
          }
          return;
        }
        errorMessage.value = "";
      },
      onFileRemoved: (file) => {
      },
      onRestrictionFailed: (file, error) => {
        log.warn("[UppyShareUploader] 文件未通过限制", file?.name, error);
        errorMessage.value = error?.message || t("file.maxSizeExceeded", { size: formatMaxFileSize() });
      },
      onError: (error) => {
        const message = error?.message || t("file.messages.uploadFailed");
        errorMessage.value = message;
      }
    });
    useUppyPaste({
      uppy: uppyInstance,
      onPaste: (file) => {
      }
    });
    const uppyContainerRef = ref(null);
    const uploadMode = ref("presigned");
    const canUsePresignMode = ref(true);
    const canUseStreamMode = ref(true);
    const canUseFormMode = ref(true);
    const errorMessage = ref("");
    const isUploading = ref(false);
    const mediaPlugins = ref([]);
    const maxFileSizeMB = ref(100);
    const maxUploadBytes = computed(() => maxFileSizeMB.value > 0 ? maxFileSizeMB.value * 1024 * 1024 : null);
    const {
      formData,
      slugError,
      validateSlug,
      handleSlugInput,
      handleMaxViewsInput
    } = useShareSettingsForm();
    const { buildPayloadForFile, buildErrorDescriptor, summarizeUploadResults } = useShareUploadDomain();
    const { getMaxUploadSize } = useUploadService();
    const fileshareService = useFileshareService();
    const { activeShareSession, createShareSession, createDirectShareSession, disposeShareSession } = useShareUploadController();
    let pluginManager = null;
    const shareRecordMap = /* @__PURE__ */ new Map();
    const pendingShareItems = ref([]);
    const currentStorageConfig = computed(() => {
      return props.storageConfigs.find((config) => config.id === formData.storage_config_id);
    });
    const uploadModes = computed(() => {
      const modes = [
        {
          value: "presigned",
          label: t("file.uploadModes.presigned"),
          modeLabel: t("file.uploadModes.presignedMode"),
          tooltip: t("file.uploadModes.presignedTooltip"),
          disabled: !canUsePresignMode.value || isUploading.value,
          disabledHint: !canUsePresignMode.value ? t("file.uploadModes.presignedOnly") : ""
        },
        {
          value: "stream",
          label: t("file.uploadModes.stream"),
          modeLabel: t("file.uploadModes.streamMode"),
          tooltip: t("file.uploadModes.streamTooltip"),
          disabled: !canUseStreamMode.value || isUploading.value
        },
        {
          value: "form",
          label: t("file.uploadModes.form"),
          modeLabel: t("file.uploadModes.formMode"),
          tooltip: t("file.uploadModes.formTooltip"),
          disabled: !canUseFormMode.value || isUploading.value
        }
      ];
      return modes;
    });
    watch(currentStorageConfig, (config) => {
      if (!config) {
        canUsePresignMode.value = false;
        canUseStreamMode.value = true;
        canUseFormMode.value = true;
        return;
      }
      const storageType = (config.storage_type || config.provider_type || "").toUpperCase();
      try {
        const driver = resolveDriverByConfigId(config.id);
        const driverType = (driver?.config?.storage_type || driver?.type || storageType || "").toUpperCase();
        const shareCaps = driver?.capabilities?.share || {};
        const allowPresign = shareCaps.presigned === true || shareCaps.presign === true || driverType === "S3";
        canUsePresignMode.value = allowPresign;
        canUseStreamMode.value = shareCaps.backendStream !== false;
        canUseFormMode.value = shareCaps.backendForm !== false;
      } catch (error) {
        log.warn("[UppyShareUploader] 解析驱动失败，使用存储类型回退", error);
        canUsePresignMode.value = storageType === "S3";
        canUseStreamMode.value = true;
        canUseFormMode.value = true;
      }
      const pickFallback = () => {
        if (canUsePresignMode.value) return "presigned";
        if (canUseStreamMode.value) return "stream";
        if (canUseFormMode.value) return "form";
        return "stream";
      };
      if (uploadMode.value === "presigned" && !canUsePresignMode.value) uploadMode.value = pickFallback();
      if (uploadMode.value === "stream" && !canUseStreamMode.value) uploadMode.value = pickFallback();
      if (uploadMode.value === "form" && !canUseFormMode.value) uploadMode.value = pickFallback();
    });
    const isSlugValid = computed(() => !formData.slug || !slugError.value);
    const isMaxViewsValid = computed(() => Number(formData.max_views) >= 0);
    const isMultiFileUpload = computed(() => fileCount.value > 1);
    const canStartUpload = computed(() => {
      const basic = fileCount.value > 0 && !isUploading.value && !!formData.storage_config_id && isSlugValid.value && isMaxViewsValid.value;
      if (!basic) return false;
      if (uploadMode.value === "presigned") return canUsePresignMode.value === true;
      if (uploadMode.value === "stream") return canUseStreamMode.value === true;
      if (uploadMode.value === "form") return canUseFormMode.value === true;
      return false;
    });
    const enabledPluginsCount = computed(() => {
      return pluginManager ? pluginManager.getEnabledPluginsCount() : 0;
    });
    const formatMaxFileSize = () => formatFileSize(maxUploadBytes.value || 0);
    const {
      ensureUploadIdForFile,
      resetBackendProgressTracking,
      updateBrowserProgressState,
      startBackendProgressPolling
    } = useUppyBackendProgress({
      uppy: uppyInstance,
      isDirectMode: () => uploadMode.value === "stream"
    });
    const loadMaxUploadSize = async () => {
      try {
        const size = await getMaxUploadSize();
        if (size) {
          maxFileSizeMB.value = size;
        }
      } catch (error) {
        log.warn("[UppyShareUploader] 获取最大上传大小失败", error);
      }
    };
    const getDashboardConfig = () => ({
      inline: true,
      target: uppyContainerRef.value.container,
      theme: props.darkMode ? "dark" : "light",
      width: "100%",
      height: 400,
      showProgressDetails: true,
      showRemoveButtonAfterComplete: true,
      hideUploadButton: true,
      hidePauseResumeButton: false,
      proudlyDisplayPoweredByUppy: false,
      disableLocalFiles: false,
      metaFields: [
        {
          id: "name",
          name: t("file.fileName"),
          placeholder: t("file.customFilename")
        }
      ],
      locale: {
        strings: {
          dataUploadedOfTotal: "%{complete} / %{total}"
        }
      }
    });
    const togglePlugin = (pluginKey) => {
      if (pluginManager) {
        pluginManager.togglePlugin(pluginKey);
        mediaPlugins.value = pluginManager.getPluginList();
        if (uppyInstance.value && !isUploading.value) {
          reinitUppy({ preserveFiles: true });
        }
      }
    };
    const setupUppy = async ({ preserveFiles = false } = {}) => {
      try {
        const preservedFiles = preserveFiles ? snapshotFiles() : [];
        if (uppyInstance.value) {
          disposeShareSession(true);
          destroyUppy();
        }
        await initializeUppy({
          id: "uppy-share-uploader",
          locale: locale.value,
          maxFileSize: maxUploadBytes.value
        });
        pluginManager = createUppyPluginManager(uppyInstance.value, locale.value);
        mediaPlugins.value = pluginManager.getPluginList();
        pluginManager.setUrlImportCallbacks({
          validateUrlInfo,
          fetchUrlContent
        });
        uppyInstance.value.use(Dashboard, getDashboardConfig());
        await pluginManager.addPluginsToUppy();
        restoreFiles(preservedFiles);
      } catch (error) {
        log.error("[UppyShareUploader] 初始化失败:", error);
        errorMessage.value = t("file.messages.uploadFailed", { message: error.message });
      }
    };
    const reinitUppy = (options) => {
      setupUppy(options);
    };
    const formatStorageOptionLabel = (config) => {
      if (!config) return t("file.storage");
      const meta = config.provider_type || config.storage_type;
      return meta ? `${config.name} (${meta})` : config.name;
    };
    const onStorageConfigChange = () => {
      if (!canUsePresignMode.value && uploadMode.value === "presigned") {
        uploadMode.value = "stream";
      }
    };
    const validateCustomLink = (event) => {
      handleSlugInput(event?.target?.value ?? formData.slug);
      return validateSlug();
    };
    watch(
      () => fileCount.value,
      (count) => {
        if (count > 1 && formData.slug) {
          handleSlugInput("");
        }
      },
      { immediate: true }
    );
    const validateMaxViews = (event) => {
      handleMaxViewsInput(event?.target?.value ?? 0);
    };
    const buildShareResultEntry = (item) => {
      const meta = item?.meta || {};
      const cachedRecord = shareRecordMap.get(item?.id);
      const record = meta.shareRecord || cachedRecord;
      if (!record) return null;
      const slug = record.slug || meta.slug || item?.slug || null;
      if (!slug && !record.url) return null;
      const origin = typeof window !== "undefined" && window.location ? window.location.origin : "";
      let shareUrl = "";
      if (slug) {
        shareUrl = fileshareService.buildShareUrl({ slug }, origin);
      } else if (record.url) {
        shareUrl = record.url.startsWith("http") || !origin ? record.url : `${origin.replace(/\/$/, "")}${record.url}`;
      }
      const previewUrl = fileshareService.getPermanentPreviewUrl(record) || shareUrl;
      const downloadUrl = fileshareService.getPermanentDownloadUrl(record);
      return {
        id: record.id || meta.fileId || item?.id || slug,
        filename: record.filename || meta.filename || item?.name || slug || "file",
        slug,
        shareUrl,
        previewUrl,
        downloadUrl,
        password: meta.password || null,
        expiresAt: record.expires_at || record.expiresAt || null
      };
    };
    const extractShareResults = (uploadResults = []) => {
      const normalized = uploadResults.map((item) => {
        const entry = buildShareResultEntry(item);
        return entry;
      });
      return normalized.filter((entry) => entry && entry.shareUrl);
    };
    const flushPendingShareResults = () => {
      if (!pendingShareItems.value.length) return;
      const ready = [];
      const waiting = [];
      pendingShareItems.value.forEach((item) => {
        const entry = buildShareResultEntry(item);
        if (entry) {
          ready.push(entry);
          if (item?.id) {
            shareRecordMap.delete(item.id);
          }
        } else {
          waiting.push(item);
        }
      });
      if (!ready.length) {
        pendingShareItems.value = waiting;
        return;
      }
      emit("share-results", ready);
      pendingShareItems.value = waiting;
      if (!waiting.length) {
        shareRecordMap.clear();
      }
    };
    const resetShareCaches = () => {
      shareRecordMap.clear();
      pendingShareItems.value = [];
    };
    const startUpload = async () => {
      if (!uppyInstance.value || !canStartUpload.value || isUploading.value) {
        return;
      }
      if (isMultiFileUpload.value && formData.slug) {
        handleSlugInput("");
      }
      if (!formData.storage_config_id) {
        errorMessage.value = t("file.messages.noStorageConfig");
        return;
      }
      if (Number(formData.max_views) < 0) {
        errorMessage.value = t("file.messages.negativeMaxViews");
        return;
      }
      if (!isMultiFileUpload.value && formData.slug && !validateSlug()) {
        errorMessage.value = slugError.value;
        return;
      }
      try {
        resetBackendProgressTracking();
        errorMessage.value = "";
        isUploading.value = true;
        disposeShareSession();
        emit("share-results", []);
        resetShareCaches();
        const basePayload = buildPayloadForFile(
          isMultiFileUpload.value ? { ...formData, slug: "" } : formData
        );
        let session;
        if (uploadMode.value === "presigned" && canUsePresignMode.value) {
          session = createShareSession({
            payload: {
              ...basePayload
            },
            uppy: uppyInstance.value,
            events: {
              onProgress: (progress) => {
                if (progress) {
                  updateBrowserProgressState(progress);
                }
              },
              onError: ({ file, error }) => {
                log.error("[UppyShareUploader] 上传错误:", file?.name, error);
                errorMessage.value = error?.message || t("file.messages.uploadFailed");
              },
              onComplete: (result) => {
                const failedDescriptors = (result?.failed || []).map(
                  (item) => buildErrorDescriptor(item?.error || new Error(t("file.messages.uploadFailed")))
                );
                const uploadResults = result?.successful || [];
                pendingShareItems.value = uploadResults;
                const normalizedShareResults = extractShareResults(uploadResults);
                const summary = summarizeUploadResults({
                  errors: failedDescriptors,
                  uploadResults,
                  totalFiles: uppyInstance.value.getFiles().length
                });
                if (normalizedShareResults.length) {
                  emit("share-results", normalizedShareResults);
                  resetShareCaches();
                } else if (pendingShareItems.value.length) {
                }
                flushPendingShareResults();
                if (summary) {
                  if (summary.kind === "error") {
                    errorMessage.value = summary.message;
                    emit("upload-error", new Error(summary.message));
                  } else if (summary.kind === "success") {
                    emit("upload-success", uploadResults);
                    formData.slug = "";
                    formData.remark = "";
                    formData.password = "";
                    setTimeout(() => {
                      if (uppyInstance.value) {
                        uppyInstance.value.clear();
                      }
                    }, 3e3);
                  }
                }
                disposeShareSession();
              },
              onShareRecord: ({ file, shareRecord }) => {
                if (file?.id && shareRecord) {
                  shareRecordMap.set(file.id, shareRecord);
                }
                flushPendingShareResults();
              }
            }
          });
        } else {
          session = createDirectShareSession({
            payload: {
              ...basePayload
            },
            shareMode: uploadMode.value,
            uppy: uppyInstance.value,
            events: {
              onProgress: (progress) => {
                if (progress) {
                  updateBrowserProgressState(progress);
                }
              },
              onError: ({ file, error }) => {
                log.error("[UppyShareUploader] 上传错误:", file?.name, error);
                errorMessage.value = error?.message || t("file.messages.uploadFailed");
              },
              onComplete: (result) => {
                const failedDescriptors = (result?.failed || []).map(
                  (item) => buildErrorDescriptor(item?.error || new Error(t("file.messages.uploadFailed")))
                );
                const uploadResults = result?.successful || [];
                pendingShareItems.value = uploadResults;
                const normalizedShareResults = extractShareResults(uploadResults);
                const summary = summarizeUploadResults({
                  errors: failedDescriptors,
                  uploadResults,
                  totalFiles: uppyInstance.value.getFiles().length
                });
                if (normalizedShareResults.length) {
                  emit("share-results", normalizedShareResults);
                  resetShareCaches();
                } else if (pendingShareItems.value.length) {
                }
                flushPendingShareResults();
                if (summary) {
                  if (summary.kind === "error") {
                    errorMessage.value = summary.message;
                    emit("upload-error", new Error(summary.message));
                  } else if (summary.kind === "success") {
                    emit("upload-success", uploadResults);
                    formData.slug = "";
                    formData.remark = "";
                    formData.password = "";
                    setTimeout(() => {
                      if (uppyInstance.value) {
                        uppyInstance.value.clear();
                      }
                    }, 3e3);
                  }
                }
                disposeShareSession();
              },
              onShareRecord: ({ file, shareRecord }) => {
                if (file?.id && shareRecord) {
                  shareRecordMap.set(file.id, shareRecord);
                }
                flushPendingShareResults();
              }
            }
          });
        }
        if (uploadMode.value === "stream") {
          try {
            uppyInstance.value.getFiles().forEach((file) => ensureUploadIdForFile(file));
          } catch {
          }
          startBackendProgressPolling();
        }
        await session.start();
      } catch (error) {
        log.error("[UppyShareUploader] 上传失败", error);
        errorMessage.value = error.message || t("file.messages.uploadFailed");
        emit("upload-error", error);
        disposeShareSession();
      } finally {
        resetBackendProgressTracking();
        isUploading.value = false;
      }
    };
    const cancelUpload = () => {
      if (!isUploading.value && !activeShareSession.value) return;
      try {
        activeShareSession.value?.cancel?.();
      } catch {
      }
      isUploading.value = false;
      errorMessage.value = t("file.cancelAllMessage");
      resetBackendProgressTracking();
      disposeShareSession();
    };
    watch(
      () => uploadMode.value,
      () => {
        if (uppyInstance.value && !isUploading.value) {
          reinitUppy({ preserveFiles: true });
        }
      }
    );
    watch(
      () => props.darkMode,
      async () => {
        if (uppyInstance.value) {
          resetBackendProgressTracking();
          await setupUppy();
        }
      }
    );
    watch(
      () => locale.value,
      () => {
        if (pluginManager) {
          pluginManager.updateLocale(locale.value);
          mediaPlugins.value = pluginManager.getPluginList();
        }
        if (uppyInstance.value && !isUploading.value) {
          resetBackendProgressTracking();
          reinitUppy({ preserveFiles: true });
        }
      }
    );
    onMounted(async () => {
      await nextTick();
      await loadMaxUploadSize();
      await setupUppy();
    });
    onBeforeUnmount(() => {
      destroyUppy();
      resetBackendProgressTracking();
      disposeShareSession(true);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createVNode(_sfc_main$3, {
          modelValue: uploadMode.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => uploadMode.value = $event),
          modes: uploadModes.value,
          title: unref(t)("file.uploadMethod"),
          "dark-mode": __props.darkMode,
          disabled: isUploading.value
        }, null, 8, ["modelValue", "modes", "title", "dark-mode", "disabled"]),
        createVNode(_sfc_main$4, {
          plugins: mediaPlugins.value,
          "enabled-count": enabledPluginsCount.value,
          title: unref(t)("file.advancedFeatures"),
          "enabled-count-template": unref(t)("file.enabledCount", { count: "{count}" }),
          "dark-mode": __props.darkMode,
          onTogglePlugin: togglePlugin
        }, null, 8, ["plugins", "enabled-count", "title", "enabled-count-template", "dark-mode"]),
        createVNode(_sfc_main$5, {
          ref_key: "uppyContainerRef",
          ref: uppyContainerRef,
          "container-id": "uppy-share-dashboard",
          "dark-mode": __props.darkMode,
          "show-paste-hint": true,
          "paste-hint-prefix": unref(t)("file.pasteSupport"),
          "paste-key": unref(t)("file.pasteKey"),
          "paste-hint-suffix": unref(t)("file.pasteHint"),
          "max-file-size-hint": maxUploadBytes.value ? unref(t)("file.dragDropHint", { size: formatMaxFileSize() }) : ""
        }, null, 8, ["dark-mode", "paste-hint-prefix", "paste-key", "paste-hint-suffix", "max-file-size-hint"]),
        createBaseVNode("div", {
          class: normalizeClass(["mt-6 border-t pt-4 w-full overflow-hidden", __props.darkMode ? "border-gray-700" : "border-gray-200"])
        }, [
          createBaseVNode("h3", {
            class: normalizeClass(["text-lg font-medium mb-4", __props.darkMode ? "text-gray-200" : "text-gray-700"])
          }, toDisplayString(unref(t)("file.shareSettings")), 3),
          createBaseVNode("div", _hoisted_2$2, [
            createBaseVNode("div", _hoisted_3$2, [
              createBaseVNode("label", {
                class: normalizeClass(["form-label text-sm font-medium mb-1.5", __props.darkMode ? "text-gray-300" : "text-gray-700"])
              }, toDisplayString(unref(t)("file.storage")), 3),
              createBaseVNode("div", _hoisted_4$2, [
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(formData).storage_config_id = $event),
                  class: normalizeClass(["form-input w-full rounded-md shadow-sm focus:ring-2 focus:ring-offset-1 focus:border-transparent appearance-none", [
                    __props.darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-600 focus:ring-offset-gray-800" : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:ring-offset-white"
                  ]]),
                  disabled: !__props.storageConfigs.length || __props.loading || isUploading.value,
                  required: "",
                  onChange: onStorageConfigChange
                }, [
                  createBaseVNode("option", _hoisted_6$2, toDisplayString(__props.storageConfigs.length ? unref(t)("file.selectStorage") : unref(t)("file.noStorage")), 1),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(__props.storageConfigs, (config) => {
                    return openBlock(), createElementBlock("option", {
                      key: config.id,
                      value: config.id
                    }, toDisplayString(formatStorageOptionLabel(config)), 9, _hoisted_7$2);
                  }), 128))
                ], 42, _hoisted_5$2), [
                  [vModelSelect, unref(formData).storage_config_id]
                ]),
                createBaseVNode("div", _hoisted_8$2, [
                  createVNode(unref(IconChevronDown), {
                    size: "md",
                    class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500"),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_9$2, [
              createBaseVNode("label", {
                class: normalizeClass(["form-label text-sm font-medium mb-1.5", __props.darkMode ? "text-gray-300" : "text-gray-700"])
              }, toDisplayString(unref(t)("file.path")), 3),
              withDirectives(createBaseVNode("input", {
                type: "text",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(formData).path = $event),
                class: normalizeClass(["form-input w-full rounded-md shadow-sm focus:ring-2 focus:ring-offset-1 focus:border-transparent", [
                  __props.darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-600 focus:ring-offset-gray-800" : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:ring-offset-white"
                ]]),
                placeholder: unref(t)("file.pathPlaceholder"),
                disabled: isUploading.value
              }, null, 10, _hoisted_10$2), [
                [vModelText, unref(formData).path]
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_11$1, [
            createBaseVNode("div", _hoisted_12$1, [
              createBaseVNode("label", {
                class: normalizeClass(["form-label text-sm font-medium mb-1.5", __props.darkMode ? "text-gray-300" : "text-gray-700"])
              }, toDisplayString(unref(t)("file.remark")), 3),
              withDirectives(createBaseVNode("input", {
                type: "text",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => unref(formData).remark = $event),
                class: normalizeClass(["form-input w-full rounded-md shadow-sm focus:ring-2 focus:ring-offset-1 focus:border-transparent", [
                  __props.darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-600 focus:ring-offset-gray-800" : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:ring-offset-white"
                ]]),
                placeholder: unref(t)("file.remarkPlaceholder"),
                disabled: isUploading.value
              }, null, 10, _hoisted_13$1), [
                [vModelText, unref(formData).remark]
              ])
            ]),
            createBaseVNode("div", _hoisted_14$1, [
              createBaseVNode("label", {
                class: normalizeClass(["form-label text-sm font-medium mb-1.5", __props.darkMode ? "text-gray-300" : "text-gray-700"])
              }, toDisplayString(unref(t)("file.customLink")), 3),
              withDirectives(createBaseVNode("input", {
                type: "text",
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => unref(formData).slug = $event),
                class: normalizeClass(["form-input w-full rounded-md shadow-sm focus:ring-2 focus:ring-offset-1 focus:border-transparent", [
                  __props.darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-600 focus:ring-offset-gray-800" : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:ring-offset-white",
                  unref(slugError) ? __props.darkMode ? "border-red-500" : "border-red-600" : ""
                ]]),
                placeholder: unref(t)("file.customLinkPlaceholder"),
                disabled: isUploading.value || isMultiFileUpload.value,
                onInput: validateCustomLink
              }, null, 42, _hoisted_15$1), [
                [vModelText, unref(formData).slug]
              ]),
              isMultiFileUpload.value ? (openBlock(), createElementBlock("p", _hoisted_16$1, toDisplayString(unref(t)("file.multiFileSlugDisabled")), 1)) : unref(slugError) ? (openBlock(), createElementBlock("p", _hoisted_17$1, toDisplayString(unref(slugError)), 1)) : (openBlock(), createElementBlock("p", _hoisted_18$1, toDisplayString(unref(t)("file.onlyAllowedChars")), 1))
            ]),
            createBaseVNode("div", _hoisted_19$1, [
              createBaseVNode("label", {
                class: normalizeClass(["form-label text-sm font-medium mb-1.5", __props.darkMode ? "text-gray-300" : "text-gray-700"])
              }, toDisplayString(unref(t)("file.passwordProtection")), 3),
              withDirectives(createBaseVNode("input", {
                type: "text",
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => unref(formData).password = $event),
                class: normalizeClass(["form-input w-full rounded-md shadow-sm focus:ring-2 focus:ring-offset-1 focus:border-transparent", [
                  __props.darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-600 focus:ring-offset-gray-800" : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:ring-offset-white"
                ]]),
                placeholder: unref(t)("file.passwordPlaceholder"),
                disabled: isUploading.value
              }, null, 10, _hoisted_20$1), [
                [vModelText, unref(formData).password]
              ])
            ]),
            createBaseVNode("div", _hoisted_21$1, [
              createBaseVNode("label", {
                class: normalizeClass(["form-label text-sm font-medium mb-1.5", __props.darkMode ? "text-gray-300" : "text-gray-700"])
              }, toDisplayString(unref(t)("file.expireTime")), 3),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => unref(formData).expires_in = $event),
                class: normalizeClass(["form-input w-full rounded-md shadow-sm focus:ring-2 focus:ring-offset-1 focus:border-transparent", [
                  __props.darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-600 focus:ring-offset-gray-800" : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:ring-offset-white"
                ]]),
                disabled: isUploading.value
              }, [
                createBaseVNode("option", _hoisted_23$1, toDisplayString(unref(t)("file.expireOptions.hour1")), 1),
                createBaseVNode("option", _hoisted_24$1, toDisplayString(unref(t)("file.expireOptions.day1")), 1),
                createBaseVNode("option", _hoisted_25$1, toDisplayString(unref(t)("file.expireOptions.day7")), 1),
                createBaseVNode("option", _hoisted_26$1, toDisplayString(unref(t)("file.expireOptions.day30")), 1),
                createBaseVNode("option", _hoisted_27$1, toDisplayString(unref(t)("file.expireOptions.never")), 1)
              ], 10, _hoisted_22$1), [
                [vModelSelect, unref(formData).expires_in]
              ])
            ]),
            createBaseVNode("div", _hoisted_28$1, [
              createBaseVNode("label", {
                class: normalizeClass(["form-label text-sm font-medium mb-1.5", __props.darkMode ? "text-gray-300" : "text-gray-700"])
              }, toDisplayString(unref(t)("file.maxViews")), 3),
              withDirectives(createBaseVNode("input", {
                type: "number",
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => unref(formData).max_views = $event),
                min: "0",
                step: "1",
                pattern: "\\d*",
                class: normalizeClass(["form-input w-full rounded-md shadow-sm focus:ring-2 focus:ring-offset-1 focus:border-transparent", [
                  __props.darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-600 focus:ring-offset-gray-800" : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:ring-offset-white"
                ]]),
                placeholder: unref(t)("file.maxViewsPlaceholder"),
                disabled: isUploading.value,
                onInput: validateMaxViews
              }, null, 42, _hoisted_29$1), [
                [
                  vModelText,
                  unref(formData).max_views,
                  void 0,
                  { number: true }
                ]
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_30$1, [
            createBaseVNode("button", {
              type: "button",
              onClick: startUpload,
              disabled: !canStartUpload.value || isUploading.value || __props.loading,
              class: normalizeClass(["btn-primary px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors flex items-center justify-center min-w-[120px]", [
                !canStartUpload.value || isUploading.value || __props.loading ? __props.darkMode ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-500 cursor-not-allowed" : __props.darkMode ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-600 focus:ring-offset-gray-800" : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 focus:ring-offset-white"
              ]])
            }, [
              isUploading.value ? (openBlock(), createBlock(unref(IconRefresh), {
                key: 0,
                size: "sm",
                class: "animate-spin -ml-1 mr-2",
                "aria-hidden": "true"
              })) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(isUploading.value ? unref(t)("file.loading") : unref(t)("file.upload")), 1)
            ], 10, _hoisted_31$1),
            isUploading.value ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              onClick: cancelUpload,
              class: normalizeClass([
                "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors flex items-center justify-center border",
                __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-red-900/60 hover:text-red-200 hover:border-red-800 focus:ring-gray-500 focus:ring-offset-gray-800" : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300 focus:ring-gray-300 focus:ring-offset-white"
              ])
            }, [
              createVNode(unref(IconClose), {
                size: "sm",
                class: "mr-1",
                "aria-hidden": "true"
              }),
              createTextVNode(" " + toDisplayString(unref(t)("file.cancel")), 1)
            ], 2)) : createCommentVNode("", true)
          ])
        ], 2)
      ]);
    };
  }
};
const UppyShareUploader = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-42c87ec7"]]);
const _hoisted_1$1 = { class: "file-list" };
const _hoisted_2$1 = {
  key: 0,
  class: "flex justify-center items-center py-8"
};
const _hoisted_3$1 = {
  key: 1,
  class: "text-center py-8"
};
const _hoisted_4$1 = { key: 2 };
const _hoisted_5$1 = { class: "text-sm font-medium" };
const _hoisted_6$1 = { class: "text-sm font-medium" };
const _hoisted_7$1 = { class: "text-sm font-medium" };
const _hoisted_8$1 = { class: "text-sm font-medium" };
const _hoisted_9$1 = { class: "text-sm font-medium" };
const _hoisted_10$1 = { class: "text-sm font-medium" };
const _hoisted_11 = { class: "text-sm font-medium text-center" };
const _hoisted_12 = { class: "space-y-3" };
const _hoisted_13 = { class: "hidden md:grid md:grid-cols-file-list gap-4 items-center p-4" };
const _hoisted_14 = { class: "truncate" };
const _hoisted_15 = { class: "flex items-center" };
const _hoisted_16 = { class: "flex-shrink-0 mr-2 w-5 h-5" };
const _hoisted_17 = ["innerHTML"];
const _hoisted_18 = { class: "flex-1 truncate" };
const _hoisted_19 = ["title"];
const _hoisted_20 = { class: "flex justify-center items-center space-x-2" };
const _hoisted_21 = ["onClick", "title"];
const _hoisted_22 = ["onClick", "title"];
const _hoisted_23 = ["onClick", "title"];
const _hoisted_24 = ["onClick", "title"];
const _hoisted_25 = ["onClick", "title"];
const _hoisted_26 = { class: "md:hidden p-3" };
const _hoisted_27 = { class: "flex items-start justify-between" };
const _hoisted_28 = { class: "flex items-start" };
const _hoisted_29 = { class: "mr-3 mt-0.5 w-6 h-6" };
const _hoisted_30 = ["innerHTML"];
const _hoisted_31 = { class: "flex-1 min-w-0" };
const _hoisted_32 = ["title"];
const _hoisted_33 = { class: "flex flex-wrap gap-x-3 gap-y-1" };
const _hoisted_34 = { class: "flex flex-col items-end ml-2" };
const _hoisted_35 = { class: "flex justify-end mt-3 space-x-3" };
const _hoisted_36 = ["onClick"];
const _hoisted_37 = ["onClick"];
const _hoisted_38 = ["onClick"];
const _hoisted_39 = ["onClick"];
const _hoisted_40 = ["onClick"];
const _hoisted_41 = {
  key: 3,
  class: "fixed inset-0 flex items-center justify-center z-[60] p-2 sm:p-4 pt-20 sm:pt-4"
};
const _hoisted_42 = { class: "bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg max-w-xs sm:max-w-md w-full relative z-10" };
const _hoisted_43 = { class: "flex justify-end space-x-3" };
const _hoisted_44 = ["disabled"];
const _hoisted_45 = { class: "flex items-center" };
const _hoisted_46 = {
  key: 5,
  class: "fixed inset-0 flex items-center justify-center z-50"
};
const _hoisted_47 = { class: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full relative z-10" };
const _hoisted_48 = { class: "flex justify-between items-center mb-4" };
const _hoisted_49 = { class: "flex flex-col items-center" };
const _hoisted_50 = { class: "bg-white p-3 rounded-md shadow-md mb-3" };
const _hoisted_51 = ["src", "alt"];
const _hoisted_52 = {
  key: 1,
  class: "w-60 h-60 flex items-center justify-center"
};
const _sfc_main$1 = {
  __name: "FileList",
  props: {
    darkMode: {
      type: Boolean,
      default: false
    },
    files: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    userType: {
      type: String,
      default: "admin"
      // 'admin' 或 'apikey'
    }
  },
  emits: ["refresh"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const log = createLogger("UploadFileList");
    const deleteSettingsStore = useDeleteSettingsStore();
    const fileshareService = useFileshareService();
    const getRemainingViewsRaw = (file) => {
      return getRemainingViews(file);
    };
    const getRemainingViewsLabel = (file) => {
      const remaining = getRemainingViewsRaw(file);
      if (remaining === Infinity) {
        return t("file.unlimited");
      }
      if (remaining === 0) {
        return t("file.usedUp");
      }
      return remaining;
    };
    const formatMimeType = (mimetype, filename) => {
      if (mimetype) {
        return mimetype;
      }
      const ext = filename?.split(".").pop()?.toLowerCase();
      return ext ? `${ext} 文件` : "未知类型";
    };
    const showDeleteConfirm = ref(false);
    const fileIdToDelete = ref(null);
    const isDeleting = ref(false);
    const message = ref(null);
    let messageTimeout = null;
    const showQRModal = ref(false);
    const qrCodeUrl = ref(null);
    const currentFileUrl = ref("");
    const copiedPermanentFiles = ref({});
    const getFileIconClassLocal = (file) => {
      const fileItem = {
        name: file.filename,
        filename: file.filename,
        isDirectory: false,
        type: file.type
      };
      return getFileIcon(fileItem, props.darkMode);
    };
    const showMessage = (type, content) => {
      if (messageTimeout) {
        clearTimeout(messageTimeout);
        messageTimeout = null;
      }
      message.value = {
        type,
        content
      };
      startMessageTimer();
    };
    const startMessageTimer = () => {
      if (messageTimeout) {
        clearTimeout(messageTimeout);
        messageTimeout = null;
      }
      if (message.value) {
        messageTimeout = setTimeout(() => {
          message.value = null;
          messageTimeout = null;
        }, 4e3);
      }
    };
    const confirmDelete = (fileId) => {
      fileIdToDelete.value = fileId;
      showDeleteConfirm.value = true;
    };
    const cancelDelete = () => {
      showDeleteConfirm.value = false;
      fileIdToDelete.value = null;
    };
    const deleteFile = async () => {
      if (!fileIdToDelete.value || isDeleting.value) return;
      isDeleting.value = true;
      try {
        await fileshareService.deleteFiles([fileIdToDelete.value], deleteSettingsStore.getDeleteMode());
        showMessage("success", t("file.deletedSuccess"));
        showDeleteConfirm.value = false;
        fileIdToDelete.value = null;
        emit("refresh");
      } catch (error) {
        log.error("删除文件失败:", error);
        showMessage("error", t("file.messages.deleteFailed") + ": " + (error.message || t("file.messages.unknownError")));
      } finally {
        isDeleting.value = false;
      }
    };
    const copyFileUrl = async (file) => {
      const fileUrl = fileshareService.buildShareUrl(file, window.location.origin);
      try {
        const success = await copyToClipboard(fileUrl);
        if (success) {
          showMessage("success", t("file.linkCopied"));
        } else {
          throw new Error(t("file.messages.copyFailed"));
        }
      } catch (error) {
        log.error("复制链接失败:", error);
        showMessage("error", t("file.messages.copyFailed"));
      }
    };
    const openFileUrl = (file) => {
      const fileUrl = fileshareService.buildShareUrl(file, window.location.origin);
      window.open(fileUrl, "_blank");
    };
    const copyPermanentLink = async (file) => {
      if (!file || !file.slug) {
        showMessage("error", t("file.noValidLink"));
        return;
      }
      try {
        let detail = file;
        if (!detail.downloadUrl) {
          if (!file.id) {
            throw new Error(t("file.cannotGetProxyLink"));
          }
          detail = await fileshareService.fetchById(file.id, { includeLinks: true });
        }
        const permanentDownloadUrl = fileshareService.getPermanentDownloadUrl(detail);
        if (!permanentDownloadUrl) {
          throw new Error(t("file.cannotGetProxyLink"));
        }
        const success = await copyToClipboard(permanentDownloadUrl);
        if (success) {
          copiedPermanentFiles.value[file.id] = true;
          setTimeout(() => {
            copiedPermanentFiles.value[file.id] = false;
          }, 2e3);
          showMessage("success", t("file.directLinkCopied"));
        } else {
          throw new Error(t("file.messages.copyFailed"));
        }
      } catch (error) {
        log.error(t("file.copyPermanentLinkFailed") + ":", error);
        showMessage("error", `${t("file.copyPermanentLinkFailed")}: ${error.message || t("file.messages.unknownError")}`);
      }
    };
    const showQRCode = async (file) => {
      const fileUrl = fileshareService.buildShareUrl(file, window.location.origin);
      currentFileUrl.value = fileUrl;
      qrCodeUrl.value = null;
      generateQRCode$1(fileUrl);
      showQRModal.value = true;
    };
    const closeQRCode = () => {
      showQRModal.value = false;
      setTimeout(() => {
        qrCodeUrl.value = null;
        currentFileUrl.value = "";
      }, 300);
    };
    const generateQRCode$1 = async (url) => {
      try {
        qrCodeUrl.value = await generateQRCode(url, { darkMode: props.darkMode });
      } catch (error) {
        log.error("生成二维码失败:", error);
      }
    };
    const downloadQRCode = () => {
      if (!qrCodeUrl.value) return;
      const a = document.createElement("a");
      a.href = qrCodeUrl.value;
      a.download = `cloudpaste-file-qrcode-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showMessage("success", t("file.qrCodeDownloadSuccess"));
    };
    const formatDate = (dateString) => {
      if (!dateString) return t("common.unknown");
      return formatDateTime(dateString);
    };
    watch(
      () => props.files,
      (newFiles) => {
        if (message.value) {
          startMessageTimer();
        }
      }
    );
    onUnmounted(() => {
      if (messageTimeout) {
        clearTimeout(messageTimeout);
        messageTimeout = null;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        __props.loading ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          createVNode(unref(IconRefresh), {
            size: "xl",
            class: normalizeClass(["animate-spin", __props.darkMode ? "text-gray-400" : "text-gray-600"]),
            "aria-hidden": "true"
          }, null, 8, ["class"])
        ])) : !__props.files.length ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
          createVNode(unref(IconFolderPlus), {
            size: "3xl",
            class: normalizeClass(["mx-auto mb-3", __props.darkMode ? "text-gray-500" : "text-gray-400"]),
            "aria-hidden": "true"
          }, null, 8, ["class"]),
          createBaseVNode("p", {
            class: normalizeClass(["text-base", __props.darkMode ? "text-gray-400" : "text-gray-600"])
          }, toDisplayString(unref(t)("file.noFilesUploaded")), 3),
          createBaseVNode("p", {
            class: normalizeClass(["text-sm mt-1", __props.darkMode ? "text-gray-500" : "text-gray-500"])
          }, toDisplayString(unref(t)("file.uploadToShow")), 3)
        ])) : (openBlock(), createElementBlock("div", _hoisted_4$1, [
          createBaseVNode("div", {
            class: normalizeClass(["hidden md:grid md:grid-cols-file-list gap-4 py-2 border-b mb-3", __props.darkMode ? "border-gray-700 text-gray-300" : "border-gray-200 text-gray-600"])
          }, [
            createBaseVNode("div", _hoisted_5$1, toDisplayString(unref(t)("file.fileName")), 1),
            createBaseVNode("div", _hoisted_6$1, toDisplayString(unref(t)("file.fileSize")), 1),
            createBaseVNode("div", _hoisted_7$1, toDisplayString(unref(t)("file.fileType")), 1),
            createBaseVNode("div", _hoisted_8$1, toDisplayString(unref(t)("file.remainingViewsLabel")), 1),
            createBaseVNode("div", _hoisted_9$1, toDisplayString(unref(t)("file.password")), 1),
            createBaseVNode("div", _hoisted_10$1, toDisplayString(unref(t)("file.createdAt")), 1),
            createBaseVNode("div", _hoisted_11, toDisplayString(unref(t)("file.actions")), 1)
          ], 2),
          createBaseVNode("div", _hoisted_12, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.files, (file) => {
              return openBlock(), createElementBlock("div", {
                key: file.id,
                class: normalizeClass(["file-item border rounded-lg overflow-hidden transition-all duration-200", __props.darkMode ? "border-gray-700 hover:border-gray-600 bg-gray-800/30" : "border-gray-200 hover:border-gray-300 bg-white"])
              }, [
                createBaseVNode("div", _hoisted_13, [
                  createBaseVNode("div", _hoisted_14, [
                    createBaseVNode("div", _hoisted_15, [
                      createBaseVNode("div", _hoisted_16, [
                        createBaseVNode("span", {
                          innerHTML: getFileIconClassLocal(file)
                        }, null, 8, _hoisted_17)
                      ]),
                      createBaseVNode("div", _hoisted_18, [
                        createBaseVNode("div", {
                          class: normalizeClass(["font-medium truncate", __props.darkMode ? "text-white" : "text-gray-900"]),
                          title: file.filename
                        }, toDisplayString(file.filename), 11, _hoisted_19),
                        file.remark ? (openBlock(), createElementBlock("div", {
                          key: 0,
                          class: normalizeClass(["text-xs truncate", __props.darkMode ? "text-blue-400" : "text-blue-600"])
                        }, toDisplayString(file.remark), 3)) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createBaseVNode("div", {
                    class: normalizeClass(__props.darkMode ? "text-gray-300" : "text-gray-600")
                  }, toDisplayString(unref(formatFileSize)(file.size)), 3),
                  createBaseVNode("div", {
                    class: normalizeClass([__props.darkMode ? "text-gray-300" : "text-gray-600", "truncate"])
                  }, toDisplayString(formatMimeType(file.mimetype, file.filename)), 3),
                  createBaseVNode("div", {
                    class: normalizeClass([
                      __props.darkMode ? "text-gray-300" : "text-gray-600",
                      getRemainingViewsRaw(file) === 0 ? "text-red-500 dark:text-red-400" : getRemainingViewsRaw(file) !== Infinity && getRemainingViewsRaw(file) < 10 ? "text-yellow-500 dark:text-yellow-400" : ""
                    ])
                  }, toDisplayString(getRemainingViewsLabel(file)), 3),
                  createBaseVNode("div", null, [
                    file.has_password ? (openBlock(), createElementBlock("span", {
                      key: 0,
                      class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", __props.darkMode ? "bg-yellow-900/40 text-yellow-200" : "bg-yellow-100 text-yellow-800"])
                    }, toDisplayString(unref(t)("file.encrypted")), 3)) : (openBlock(), createElementBlock("span", {
                      key: 1,
                      class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", __props.darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"])
                    }, toDisplayString(unref(t)("file.noPassword")), 3))
                  ]),
                  createBaseVNode("div", {
                    class: normalizeClass(__props.darkMode ? "text-gray-300" : "text-gray-600")
                  }, toDisplayString(formatDate(file.created_at)), 3),
                  createBaseVNode("div", _hoisted_20, [
                    createBaseVNode("button", {
                      onClick: withModifiers(($event) => openFileUrl(file), ["stop"]),
                      class: normalizeClass(["p-1.5 rounded-md transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"]),
                      title: unref(t)("file.open")
                    }, [
                      createVNode(unref(IconExternalLink), {
                        size: "sm",
                        "aria-hidden": "true"
                      })
                    ], 10, _hoisted_21),
                    createBaseVNode("button", {
                      onClick: withModifiers(($event) => copyFileUrl(file), ["stop"]),
                      class: normalizeClass(["p-1.5 rounded-md transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"]),
                      title: unref(t)("file.copyLink")
                    }, [
                      createVNode(unref(IconCopy), {
                        size: "sm",
                        "aria-hidden": "true"
                      })
                    ], 10, _hoisted_22),
                    createBaseVNode("button", {
                      onClick: withModifiers(($event) => copyPermanentLink(file), ["stop"]),
                      class: normalizeClass(["p-1.5 rounded-md transition-colors relative", __props.darkMode ? "hover:bg-gray-700 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"]),
                      title: unref(t)("file.copyDirectLink")
                    }, [
                      createVNode(unref(IconLink), {
                        size: "sm",
                        "aria-hidden": "true"
                      })
                    ], 10, _hoisted_23),
                    createBaseVNode("button", {
                      onClick: withModifiers(($event) => showQRCode(file), ["stop"]),
                      class: normalizeClass(["p-1.5 rounded-md transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"]),
                      title: unref(t)("file.qrCode")
                    }, [
                      createVNode(unref(IconQrCode), {
                        size: "sm",
                        "aria-hidden": "true"
                      })
                    ], 10, _hoisted_24),
                    createBaseVNode("button", {
                      onClick: withModifiers(($event) => confirmDelete(file.id), ["stop"]),
                      class: normalizeClass(["p-1.5 rounded-md transition-colors", __props.darkMode ? "hover:bg-red-900/30 text-gray-400 hover:text-red-300" : "hover:bg-red-50 text-gray-500 hover:text-red-600"]),
                      title: unref(t)("file.delete")
                    }, [
                      createVNode(unref(IconDelete), {
                        size: "sm",
                        "aria-hidden": "true"
                      })
                    ], 10, _hoisted_25)
                  ])
                ]),
                createBaseVNode("div", _hoisted_26, [
                  createBaseVNode("div", _hoisted_27, [
                    createBaseVNode("div", _hoisted_28, [
                      createBaseVNode("div", _hoisted_29, [
                        createBaseVNode("span", {
                          innerHTML: getFileIconClassLocal(file)
                        }, null, 8, _hoisted_30)
                      ]),
                      createBaseVNode("div", _hoisted_31, [
                        createBaseVNode("div", {
                          class: normalizeClass(["font-medium truncate", __props.darkMode ? "text-white" : "text-gray-900"]),
                          title: file.filename
                        }, toDisplayString(file.filename), 11, _hoisted_32),
                        file.remark ? (openBlock(), createElementBlock("div", {
                          key: 0,
                          class: normalizeClass(["text-xs mt-1", __props.darkMode ? "text-blue-400" : "text-blue-600"])
                        }, toDisplayString(file.remark), 3)) : createCommentVNode("", true),
                        createBaseVNode("div", {
                          class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                        }, [
                          createBaseVNode("div", _hoisted_33, [
                            createBaseVNode("span", null, toDisplayString(unref(formatFileSize)(file.size)), 1),
                            createBaseVNode("span", {
                              class: normalizeClass([
                                getRemainingViewsRaw(file) === 0 ? "text-red-500 dark:text-red-400" : getRemainingViewsRaw(file) !== Infinity && getRemainingViewsRaw(file) < 10 ? "text-yellow-500 dark:text-yellow-400" : ""
                              ])
                            }, toDisplayString(getRemainingViewsLabel(file)), 3),
                            createBaseVNode("span", null, toDisplayString(formatDate(file.created_at)), 1)
                          ])
                        ], 2)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_34, [
                      file.has_password ? (openBlock(), createElementBlock("span", {
                        key: 0,
                        class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", __props.darkMode ? "bg-yellow-900/40 text-yellow-200" : "bg-yellow-100 text-yellow-800"])
                      }, toDisplayString(unref(t)("file.encrypted")), 3)) : (openBlock(), createElementBlock("span", {
                        key: 1,
                        class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", __props.darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"])
                      }, toDisplayString(unref(t)("file.noPassword")), 3))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_35, [
                    createBaseVNode("button", {
                      onClick: withModifiers(($event) => openFileUrl(file), ["stop"]),
                      class: normalizeClass(["inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded transition-colors", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"])
                    }, toDisplayString(unref(t)("file.open")), 11, _hoisted_36),
                    createBaseVNode("button", {
                      onClick: withModifiers(($event) => copyFileUrl(file), ["stop"]),
                      class: normalizeClass(["inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded transition-colors", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"])
                    }, toDisplayString(unref(t)("file.copyLink")), 11, _hoisted_37),
                    createBaseVNode("button", {
                      onClick: withModifiers(($event) => copyPermanentLink(file), ["stop"]),
                      class: normalizeClass(["inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded transition-colors", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"])
                    }, toDisplayString(unref(t)("file.copyDirectLink")), 11, _hoisted_38),
                    createBaseVNode("button", {
                      onClick: withModifiers(($event) => showQRCode(file), ["stop"]),
                      class: normalizeClass(["inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded transition-colors", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"])
                    }, toDisplayString(unref(t)("file.qrCode")), 11, _hoisted_39),
                    createBaseVNode("button", {
                      onClick: withModifiers(($event) => confirmDelete(file.id), ["stop"]),
                      class: normalizeClass(["inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded transition-colors", __props.darkMode ? "bg-red-900/30 hover:bg-red-800/30 text-red-300" : "bg-red-100 hover:bg-red-200 text-red-700"])
                    }, toDisplayString(unref(t)("file.delete")), 11, _hoisted_40)
                  ])
                ])
              ], 2);
            }), 128))
          ])
        ])),
        showDeleteConfirm.value ? (openBlock(), createElementBlock("div", _hoisted_41, [
          createBaseVNode("div", {
            class: "absolute inset-0 bg-black opacity-50",
            onClick: cancelDelete
          }),
          createBaseVNode("div", _hoisted_42, [
            createBaseVNode("h3", {
              class: normalizeClass(["text-lg font-medium mb-4", __props.darkMode ? "text-white" : "text-gray-900"])
            }, toDisplayString(unref(t)("file.confirmDelete")), 3),
            createBaseVNode("p", {
              class: normalizeClass(["mb-6", __props.darkMode ? "text-gray-300" : "text-gray-600"])
            }, toDisplayString(unref(t)("file.confirmDeleteMessage")), 3),
            createBaseVNode("div", _hoisted_43, [
              createBaseVNode("button", {
                onClick: cancelDelete,
                class: normalizeClass(["px-4 py-2 text-sm font-medium rounded-md", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"])
              }, toDisplayString(unref(t)("file.cancel")), 3),
              createBaseVNode("button", {
                onClick: deleteFile,
                class: "px-4 py-2 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 text-white",
                disabled: isDeleting.value
              }, toDisplayString(isDeleting.value ? unref(t)("file.deleting") : unref(t)("file.confirmDeleteBtn")), 9, _hoisted_44)
            ])
          ])
        ])) : createCommentVNode("", true),
        message.value ? (openBlock(), createElementBlock("div", {
          key: 4,
          class: normalizeClass(["fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-y-0 opacity-100 z-50 max-w-xs", message.value.type === "success" ? __props.darkMode ? "bg-green-800 text-green-100" : "bg-green-600 text-white" : __props.darkMode ? "bg-red-800 text-red-100" : "bg-red-600 text-white"])
        }, [
          createBaseVNode("div", _hoisted_45, [
            message.value.type === "success" ? (openBlock(), createBlock(unref(IconCheckbox), {
              key: 0,
              size: "md",
              class: "mr-2",
              "aria-hidden": "true"
            })) : (openBlock(), createBlock(unref(IconError), {
              key: 1,
              size: "md",
              class: "mr-2",
              "aria-hidden": "true"
            })),
            createTextVNode(" " + toDisplayString(message.value.content), 1)
          ])
        ], 2)) : createCommentVNode("", true),
        showQRModal.value ? (openBlock(), createElementBlock("div", _hoisted_46, [
          createBaseVNode("div", {
            class: "absolute inset-0 bg-black opacity-50",
            onClick: closeQRCode
          }),
          createBaseVNode("div", _hoisted_47, [
            createBaseVNode("div", _hoisted_48, [
              createBaseVNode("h3", {
                class: normalizeClass(["text-lg font-medium", __props.darkMode ? "text-white" : "text-gray-900"])
              }, toDisplayString(unref(t)("file.fileQrCode")), 3),
              createBaseVNode("button", {
                onClick: closeQRCode,
                class: normalizeClass(["p-1 rounded-md transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"])
              }, [
                createVNode(unref(IconClose), {
                  size: "md",
                  "aria-hidden": "true"
                })
              ], 2)
            ]),
            createBaseVNode("div", _hoisted_49, [
              createBaseVNode("div", _hoisted_50, [
                qrCodeUrl.value ? (openBlock(), createElementBlock("img", {
                  key: 0,
                  src: qrCodeUrl.value,
                  alt: unref(t)("file.fileQrCode"),
                  class: "w-60 h-60"
                }, null, 8, _hoisted_51)) : (openBlock(), createElementBlock("div", _hoisted_52, [
                  createVNode(unref(IconRefresh), {
                    size: "xl",
                    class: normalizeClass(["animate-spin", __props.darkMode ? "text-gray-400" : "text-gray-600"]),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ]))
              ]),
              createBaseVNode("p", {
                class: normalizeClass(["text-sm mb-3 break-all text-center", __props.darkMode ? "text-gray-300" : "text-gray-600"])
              }, toDisplayString(currentFileUrl.value), 3),
              createBaseVNode("button", {
                onClick: downloadQRCode,
                class: normalizeClass(["inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors", __props.darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"])
              }, [
                createVNode(unref(IconDownload), {
                  size: "sm",
                  class: "mr-2",
                  "aria-hidden": "true"
                }),
                createTextVNode(" " + toDisplayString(unref(t)("file.downloadQrCode")), 1)
              ], 2)
            ])
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
const FileList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e2c8d286"]]);
const _hoisted_1 = { class: "file-upload-container mx-auto px-3 sm:px-6 flex-1 flex flex-col pt-6 sm:pt-8 w-full max-w-full sm:max-w-6xl" };
const _hoisted_2 = { class: "text-xl font-semibold" };
const _hoisted_3 = {
  key: 0,
  class: "main-content"
};
const _hoisted_4 = { class: "card mb-6 p-4 sm:p-6" };
const _hoisted_5 = {
  key: 0,
  class: "card mb-6 p-4 sm:p-6"
};
const _hoisted_6 = { class: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4" };
const _hoisted_7 = { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1" };
const _hoisted_8 = {
  key: 1,
  class: "card p-4 sm:p-6"
};
const _hoisted_9 = { class: "flex justify-between items-center mb-4" };
const _hoisted_10 = { class: "text-lg font-medium" };
const _sfc_main = {
  __name: "UploadView",
  setup(__props) {
    const { t } = useI18n();
    const log = createLogger("UploadView");
    const { getRecentFiles } = useUploadService();
    const { showSuccess, showError, showWarning } = useGlobalMessage();
    const authStore = useAuthStore();
    const { isAdmin, hasFileSharePermission, hasFileManagePermission } = storeToRefs(authStore);
    const { isDarkMode: darkMode } = useThemeMode();
    const storageConfigsStore = useStorageConfigsStore();
    const files = ref([]);
    const loadingFiles = ref(false);
    const shareResults = ref([]);
    const shareResultsCacheKey = (item) => item?.id || item?.slug || item?.shareUrl || `${item?.filename || ""}-${item?.shareUrl || ""}`;
    const shareListContainerClass = computed(() => {
      const base = "space-y-3";
      if (shareResults.value.length > 3) {
        return `${base} share-results-scroll`;
      }
      return base;
    });
    const showShareQrModal = ref(false);
    const currentShareLink = ref("");
    const hasPermission = computed(() => hasFileSharePermission.value);
    const canLoadRecentFiles = computed(() => hasFileManagePermission.value);
    const recentFiles = computed(() => {
      return files.value.slice(0, 3);
    });
    const navigateToAdmin = () => {
      __vitePreload(async () => {
        const { routerUtils } = await import("./index-BQxzU9F1.js").then((n) => n.f9);
        return { routerUtils };
      }, true ? [] : void 0).then(({ routerUtils }) => {
        routerUtils.navigateTo("admin");
      });
    };
    const handlePermissionChange = async (hasPermissionValue) => {
      if (hasPermissionValue) {
        const tasks = [loadStorageConfigs({ force: true })];
        if (canLoadRecentFiles.value) {
          tasks.push(loadFiles());
        } else {
          files.value = [];
        }
        await Promise.all(tasks);
      } else {
        files.value = [];
        shareResults.value = [];
      }
    };
    const loadStorageConfigs = async (options = {}) => {
      if (!hasPermission.value) return;
      try {
        if (options.force) {
          await storageConfigsStore.refreshConfigs();
        } else {
          await storageConfigsStore.loadConfigs();
        }
      } catch (error) {
        log.error("加载存储配置失败:", error);
      }
    };
    const loadFiles = async () => {
      if (!hasPermission.value || !canLoadRecentFiles.value) {
        files.value = [];
        return;
      }
      loadingFiles.value = true;
      try {
        const list = await getRecentFiles(5);
        files.value = list;
      } catch (error) {
        log.error("加载文件列表失败:", error);
        showError(`${t("file.messages.getFileDetailFailed")}: ${error.message || t("file.messages.unknownError")}`);
      } finally {
        loadingFiles.value = false;
      }
    };
    const handleUploadSuccess = (fileData) => {
      if (canLoadRecentFiles.value) {
        loadFiles();
      }
      const files2 = Array.isArray(fileData) ? fileData : Array.isArray(fileData?.uploadResults) ? fileData.uploadResults : [];
      const successCount = files2.length;
      const skippedUploadCount = files2.filter((item) => item?.meta?.skipUpload === true).length;
      let message = successCount > 1 ? t("file.multipleUploadsSuccessful", { count: successCount }) : t("file.uploadSuccessful");
      if (skippedUploadCount > 0) {
        message += `（${t("file.skippedExistingUploads", { count: skippedUploadCount })}）`;
      }
      showSuccess(message);
    };
    const handleShareResults = (results = []) => {
      if (!Array.isArray(results) || !results.length) return;
      const map = /* @__PURE__ */ new Map();
      shareResults.value.forEach((item) => {
        const key = shareResultsCacheKey(item);
        if (key) {
          map.set(key, item);
        }
      });
      results.forEach((item) => {
        if (!item || !item.shareUrl) return;
        const key = shareResultsCacheKey(item);
        if (key) {
          map.set(key, item);
        }
      });
      shareResults.value = Array.from(map.values());
    };
    const clearShareResults = () => {
      shareResults.value = [];
    };
    const openShareQRCode = (link) => {
      if (!link) return;
      currentShareLink.value = link;
      showShareQrModal.value = true;
    };
    const closeShareQRCode = () => {
      showShareQrModal.value = false;
      currentShareLink.value = "";
    };
    const handleShareBoxStatus = (payload) => {
      if (!payload || !payload.message) return;
      if (payload.type === "success") {
        showSuccess(payload.message);
      } else if (payload.type === "warning") {
        showWarning(payload.message);
      } else {
        showError(payload.message);
      }
    };
    const handleUploadError = (error) => {
      if (error && error.message && (error.message.includes("存储空间不足") || error.message.includes("insufficient storage") || error.message.includes("容量") || error.message.includes("storage limit"))) {
        showWarning(error.message);
      } else {
        showError(error.message || t("file.messages.unknownError"));
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: normalizeClass(["header mb-4 border-b pb-2", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
        }, [
          createBaseVNode("h2", _hoisted_2, toDisplayString(unref(t)("file.uploadPageTitle")), 1)
        ], 2),
        createVNode(PermissionManager, {
          "dark-mode": unref(darkMode),
          "permission-type": "file",
          "permission-required-text": _ctx.$t("file.permissionRequired"),
          "login-auth-text": _ctx.$t("file.loginOrAuth"),
          onPermissionChange: handlePermissionChange,
          onNavigateToAdmin: navigateToAdmin
        }, null, 8, ["dark-mode", "permission-required-text", "login-auth-text"]),
        hasPermission.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createVNode(UppyShareUploader, {
              "dark-mode": unref(darkMode),
              loading: loadingFiles.value,
              "is-admin": unref(isAdmin),
              "storage-configs": unref(storageConfigsStore).sortedConfigs,
              onUploadSuccess: handleUploadSuccess,
              onUploadError: handleUploadError,
              onShareResults: handleShareResults
            }, null, 8, ["dark-mode", "loading", "is-admin", "storage-configs"])
          ]),
          shareResults.value.length ? (openBlock(), createElementBlock("div", _hoisted_5, [
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("h3", {
                class: normalizeClass(["text-lg font-medium", unref(darkMode) ? "text-gray-100" : "text-gray-800"])
              }, toDisplayString(unref(t)("file.shareResultsTitle")), 3),
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["px-3 py-1.5 text-sm rounded-md border", unref(darkMode) ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-600 hover:bg-gray-100"]),
                onClick: clearShareResults
              }, toDisplayString(unref(t)("file.clearShareResults")), 3)
            ]),
            createBaseVNode("div", {
              class: normalizeClass(shareListContainerClass.value)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(shareResults.value, (item) => {
                return openBlock(), createElementBlock("div", {
                  key: item.id || item.slug || item.shareUrl,
                  class: normalizeClass(["rounded-md border px-3 py-2.5 flex flex-col gap-1.5", unref(darkMode) ? "border-gray-700 bg-gray-800/60" : "border-gray-200 bg-white"])
                }, [
                  createBaseVNode("div", _hoisted_7, [
                    createBaseVNode("span", {
                      class: normalizeClass(["text-sm font-medium truncate", unref(darkMode) ? "text-gray-100" : "text-gray-800"])
                    }, toDisplayString(item.filename), 3),
                    item.storageLabel ? (openBlock(), createElementBlock("span", {
                      key: 0,
                      class: normalizeClass(["text-xs px-2 py-0.5 rounded-full", unref(darkMode) ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"])
                    }, toDisplayString(item.storageLabel), 3)) : createCommentVNode("", true)
                  ]),
                  createVNode(ShareLinkBox, {
                    "dark-mode": unref(darkMode),
                    label: unref(t)("file.sharePrimaryLinkLabel"),
                    "share-link": item.shareUrl,
                    "copy-tooltip": unref(t)("file.copyLink"),
                    "copy-success-text": unref(t)("file.linkCopied"),
                    "copy-failure-text": unref(t)("file.copyFailed"),
                    "show-qr-button": true,
                    "qr-tooltip": unref(t)("file.showQRCode"),
                    "secondary-link": item.downloadUrl,
                    "secondary-tooltip": unref(t)("file.copyDirectLink"),
                    "secondary-success-text": unref(t)("file.directLinkCopied"),
                    "secondary-failure-text": unref(t)("file.copyFailed"),
                    "show-countdown": false,
                    onShowQrCode: openShareQRCode,
                    onStatusMessage: handleShareBoxStatus
                  }, null, 8, ["dark-mode", "label", "share-link", "copy-tooltip", "copy-success-text", "copy-failure-text", "qr-tooltip", "secondary-link", "secondary-tooltip", "secondary-success-text", "secondary-failure-text"])
                ], 2);
              }), 128))
            ], 2)
          ])) : createCommentVNode("", true),
          canLoadRecentFiles.value && recentFiles.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_8, [
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("h3", _hoisted_10, toDisplayString(unref(t)("file.recentUploads")), 1),
              createBaseVNode("span", {
                class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
              }, toDisplayString(unref(t)("file.showingRecent")), 3)
            ]),
            createVNode(FileList, {
              "dark-mode": unref(darkMode),
              files: recentFiles.value,
              loading: loadingFiles.value,
              "user-type": unref(isAdmin) ? "admin" : "apikey",
              onRefresh: loadFiles
            }, null, 8, ["dark-mode", "files", "loading", "user-type"])
          ])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        createVNode(QRCodeModal, {
          visible: showShareQrModal.value,
          "share-link": currentShareLink.value,
          onClose: closeShareQRCode,
          onStatusMessage: handleShareBoxStatus
        }, null, 8, ["visible", "share-link"])
      ]);
    };
  }
};
const UploadView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ed0ecd7c"]]);
export {
  UploadView as default
};
