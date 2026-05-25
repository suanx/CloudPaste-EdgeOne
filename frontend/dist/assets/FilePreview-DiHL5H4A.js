import { c as createLogger, g as ref, F as computed, u as useEventListener, w as watch, o as onMounted, ax as onUnmounted, e as useI18n, E as api, aK as _export_sfc, aP as nextTick, aY as onBeforeUnmount, j as createElementBlock, k as openBlock, l as createBaseVNode, n as normalizeClass, eK as useGlobalPlayerStore, b1 as storeToRefs, aZ as useFsService, z as createVNode, t as toDisplayString, cz as inject, ea as useWindowScroll, M as createBlock, q as withDirectives, aE as withCtx, K as Fragment, L as renderList, aq as vShow, aF as Transition, aM as createStaticVNode, y as unref, dD as usePathPassword, b3 as IconLockClosed, p as createCommentVNode, bG as vModelDynamic, bg as IconEye, dN as IconEyeOff, A as createTextVNode, J as IconRefresh, m as withModifiers, by as IconArchive, aC as IconExclamationSolid, aB as IconXCircle, aa as IconChevronLeft, H as IconDownload, b8 as IconDocument, aD as normalizeStyle, ab as IconChevronRight, aU as renderSlot, e8 as IconExpand, e9 as IconCollapse, r as reactive, aV as Teleport, aN as useCssVars, f as useAuthStore, en as IconDatabase, bb as IconClock, bo as IconLink, dE as IconError, eL as IconSave, ae as vModelSelect } from "./index-BQxzU9F1.js";
import { _ as _sfc_main$c } from "./LoadingIndicator-C1Dntewf.js";
import { c as formatDateTime } from "./timeUtils-D81jJILb.js";
import { F as FileType, a as getExtension, f as formatFileSize, i as isArchiveFile, l as lookupMimeType, c as getFileName, e as detectFileTypeFromFilename, j as getArchiveType, d as getMimeTypeDescription, k as canPreviewFile, m as createMockFileObject, h as getPreviewModeFromFilename, P as PREVIEW_MODES, S as SUPPORTED_ENCODINGS } from "./fileTypes-C4-giE9O.js";
import { r as revokeObjectUrl, s as shouldAttemptDecodeImagePreview, b as decodeImagePreviewUrlToPngObjectUrl, i as isLivePhotoImage, a as detectLivePhoto } from "./livePhotoUtils-x9T853K7.js";
import { c as copyToClipboard } from "./clipboard-GLHRBPpJ.js";
import { h as cleanupZipJS, i as archiveService, V as VideoPlayer, d as useTextPreview, T as TextRenderer, F as FoliateEpubView, b as _sfc_main$d, O as OfficePreviewContainer, r as resolvePreviewSelection, g as PREVIEW_KEYS, u as useProviderSelector, j as useElementFullscreen, _ as _sfc_main$e } from "./OfficePreviewContainer-BV71pY0a.js";
import "./MarkdownDisplay-DriQfnOJ.js";
/* empty css                           */
import "./livePhotoBadgeIconSvg-DVbmCKIq.js";
import "./storageConfigsStore-DUFoycii.js";
import { a as APlayer } from "./APlayer.min-DKjfm4Hz.js";
/* empty css                     */
import { g as getFileIcon } from "./fileTypeIcons-s4hrDi1Q.js";
import "./index-Sde1Raj0.js";
const EBOOK_EXTS = /* @__PURE__ */ new Set(["epub", "mobi", "azw3", "azw", "fb2", "cbz"]);
const EBOOK_MIMES = /* @__PURE__ */ new Set([
  "application/epub+zip",
  "application/x-mobipocket-ebook",
  "application/vnd.amazon.ebook",
  "application/x-fictionbook+xml",
  "application/vnd.comicbook+zip",
  "application/x-cbz"
]);
function usePreviewRenderers(file, emit, darkMode) {
  const log2 = createLogger("Preview");
  const loadError = ref(false);
  const authenticatedPreviewUrl = ref(null);
  const hasTriedImageDecodeFallback = ref(false);
  const isDecodingImage = ref(false);
  const imageDecodeAbortController = ref(null);
  const officePreviewLoading = ref(false);
  const officePreviewError = ref("");
  const officePreviewTimedOut = ref(false);
  const previewTimeoutId = ref(null);
  const isOfficeFullscreen = ref(false);
  const officePreviewRef = ref(null);
  const fileTypeInfo = computed(() => {
    if (!file.value) return null;
    const mimeType = file.value.mimetype;
    return {
      mimeType,
      filename: file.value.name,
      displayName: file.value.name || file.value.filename || ""
    };
  });
  const isImageFile = computed(() => file.value?.type === FileType.IMAGE);
  const isVideoFile = computed(() => file.value?.type === FileType.VIDEO);
  const isAudioFile = computed(() => file.value?.type === FileType.AUDIO);
  const isOfficeFile = computed(() => file.value?.type === FileType.OFFICE);
  const isTextFile = computed(() => file.value?.type === FileType.TEXT);
  const isPdfFile = computed(() => file.value?.type === FileType.DOCUMENT);
  const isEbookFile = computed(() => {
    if (!file.value) return false;
    const filename = file.value?.name || file.value?.filename || "";
    const ext = getExtension(filename);
    const mime = String(file.value?.mimetype || "").toLowerCase();
    if (EBOOK_EXTS.has(ext)) return true;
    return EBOOK_MIMES.has(mime);
  });
  const previewUrl = computed(() => {
    if (!file.value) return "";
    return file.value.previewUrl || "";
  });
  const fetchAuthenticatedUrl = async () => {
    const url = previewUrl.value;
    if (!url) {
      log2.warn("预览URL为空，无法获取认证预览URL");
      return;
    }
    revokeObjectUrl(authenticatedPreviewUrl.value);
    authenticatedPreviewUrl.value = url;
  };
  const updateOfficePreviewUrls = async () => {
    officePreviewLoading.value = false;
    officePreviewError.value = "";
    officePreviewTimedOut.value = false;
  };
  const clearPreviewLoadTimeout = () => {
    if (previewTimeoutId.value) {
      clearTimeout(previewTimeoutId.value);
      previewTimeoutId.value = null;
    }
  };
  const toggleFullscreen = (elementRef, isFullscreenState, onEnter, onExit) => {
    if (!isFullscreenState.value) {
      if (elementRef.value && document.fullscreenEnabled) {
        elementRef.value.requestFullscreen().then(() => {
          isFullscreenState.value = true;
          if (onEnter) onEnter();
          log2.debug("进入全屏模式");
        }).catch((error) => {
          log2.error("进入全屏失败:", error);
          isFullscreenState.value = true;
          if (onEnter) onEnter();
        });
      } else {
        isFullscreenState.value = true;
        if (onEnter) onEnter();
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().then(() => {
          isFullscreenState.value = false;
          if (onExit) onExit();
          log2.debug("退出全屏模式");
        }).catch((error) => {
          log2.error("退出全屏失败:", error);
          isFullscreenState.value = false;
          if (onExit) onExit();
        });
      } else {
        isFullscreenState.value = false;
        if (onExit) onExit();
      }
    }
  };
  const toggleOfficeFullscreen = () => {
    toggleFullscreen(
      officePreviewRef,
      isOfficeFullscreen,
      () => {
        log2.debug("Office预览进入全屏");
      },
      () => {
        log2.debug("Office预览退出全屏");
      }
    );
  };
  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      isOfficeFullscreen.value = false;
      log2.debug("全屏状态已重置");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      log2.debug("检测到Esc键，全屏状态将由浏览器处理");
    }
  };
  useEventListener(document, "fullscreenchange", handleFullscreenChange);
  useEventListener(document, "keydown", handleKeyDown);
  let lastContentLoadedKey = "";
  const buildContentLoadedKey = () => {
    const f = file.value;
    const fp = f?.path || f?.id || f?.name || "";
    const url = authenticatedPreviewUrl.value || previewUrl.value || "";
    return `${fp}::${url}`;
  };
  const handleContentLoaded = () => {
    const key = buildContentLoadedKey();
    if (key && key === lastContentLoadedKey) return;
    lastContentLoadedKey = key;
    log2.debug("内容加载完成");
    emit("loaded");
  };
  const handleContentError = async (error) => {
    log2.error("内容加载错误:", error);
    const currentFile = file.value;
    const currentUrl = authenticatedPreviewUrl.value || "";
    const filename = currentFile?.name || "";
    const mimetype = currentFile?.mimetype || "";
    if (isImageFile.value && !hasTriedImageDecodeFallback.value && shouldAttemptDecodeImagePreview({ filename, mimetype }) && typeof currentUrl === "string" && !currentUrl.startsWith("blob:")) {
      hasTriedImageDecodeFallback.value = true;
      try {
        log2.debug("图片解码回退开始:", { filename, mimetype, url: currentUrl });
        const { objectUrl } = await decodeImagePreviewUrlToPngObjectUrl({ url: currentUrl, filename, mimetype });
        revokeObjectUrl(authenticatedPreviewUrl.value);
        authenticatedPreviewUrl.value = objectUrl;
        loadError.value = false;
        log2.debug("图片解码回退成功:", { filename, objectUrl });
        return;
      } catch (decodeError) {
        log2.error("图片解码回退失败:", decodeError);
      }
    }
    loadError.value = true;
    emit("error", error);
  };
  const formatFileSize$1 = (size) => {
    return formatFileSize(size);
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return formatDateTime(dateString);
  };
  const initializePreview = async () => {
    log2.debug("预览初始化完成");
  };
  const initializeForFile = async (newFile) => {
    loadError.value = false;
    revokeObjectUrl(authenticatedPreviewUrl.value);
    authenticatedPreviewUrl.value = null;
    hasTriedImageDecodeFallback.value = false;
    officePreviewLoading.value = false;
    officePreviewError.value = "";
    officePreviewTimedOut.value = false;
    isOfficeFullscreen.value = false;
    clearPreviewLoadTimeout();
    log2.debug("文件预览渲染器已重置，准备预览新文件:", newFile?.name || "无文件");
  };
  const reinitializePreviewOnThemeChange = async () => {
    log2.debug("主题变化预览重新初始化完成");
  };
  watch(
    () => darkMode?.value,
    () => {
      reinitializePreviewOnThemeChange();
    }
  );
  watch(
    () => file.value,
    async (newFile) => {
      lastContentLoadedKey = "";
      loadError.value = false;
      revokeObjectUrl(authenticatedPreviewUrl.value);
      authenticatedPreviewUrl.value = null;
      hasTriedImageDecodeFallback.value = false;
      isDecodingImage.value = false;
      if (imageDecodeAbortController.value) {
        imageDecodeAbortController.value.abort();
        imageDecodeAbortController.value = null;
      }
      officePreviewLoading.value = false;
      officePreviewError.value = "";
      officePreviewTimedOut.value = false;
      clearPreviewLoadTimeout();
      isOfficeFullscreen.value = false;
      if (newFile) {
        log2.debug(`文件预览类型分析: ${newFile.name}`);
        log2.debug("文件信息:", {
          name: newFile.name,
          mimetype: newFile.mimetype,
          size: newFile.size,
          path: newFile.path
        });
        const typeInfo = fileTypeInfo.value;
        log2.debug("文件类型检测结果:", typeInfo);
        const typeChecks = {
          isImage: isImageFile.value,
          isVideo: isVideoFile.value,
          isAudio: isAudioFile.value,
          isPdf: isPdfFile.value,
          isEbook: isEbookFile.value,
          isOffice: isOfficeFile.value,
          isText: isTextFile.value
        };
        log2.debug("类型判断结果:", typeChecks);
        const selectedType = Object.entries(typeChecks).find(([, value]) => value)?.[0] || "unknown";
        log2.debug(`最终预览类型: ${selectedType}`);
        if (typeChecks.isImage) {
          const filename = newFile?.name || "";
          const mimetype = newFile?.mimetype || "";
          const url = previewUrl.value || "";
          if (url && shouldAttemptDecodeImagePreview({ filename, mimetype })) {
            const expectedFileName = filename;
            const controller = new AbortController();
            imageDecodeAbortController.value = controller;
            isDecodingImage.value = true;
            hasTriedImageDecodeFallback.value = true;
            try {
              log2.debug("图片预解码开始:", { filename, mimetype, url });
              const decoded = await decodeImagePreviewUrlToPngObjectUrl({
                url,
                filename,
                mimetype,
                signal: controller.signal
              });
              if (controller.signal.aborted) return;
              if (file.value?.name !== expectedFileName) return;
              log2.debug("图片预解码成功:", { filename, objectUrl: decoded.objectUrl });
              revokeObjectUrl(authenticatedPreviewUrl.value);
              authenticatedPreviewUrl.value = decoded.objectUrl;
              loadError.value = false;
            } catch (decodeError) {
              if (controller.signal.aborted) return;
              log2.error("图片预解码失败:", decodeError);
              loadError.value = true;
              emit("error", decodeError);
            } finally {
              if (!controller.signal.aborted) {
                isDecodingImage.value = false;
              }
              if (imageDecodeAbortController.value === controller) {
                imageDecodeAbortController.value = null;
              }
            }
            return;
          }
          authenticatedPreviewUrl.value = url;
        } else if (typeChecks.isVideo || typeChecks.isAudio || typeChecks.isPdf || typeChecks.isEbook || typeChecks.isText || file.value?.name && isArchiveFile(file.value.name)) {
          authenticatedPreviewUrl.value = previewUrl.value;
        }
        if (typeChecks.isOffice) {
          updateOfficePreviewUrls();
        }
      }
    },
    { immediate: true }
  );
  onMounted(() => {
    log2.debug("文件预览组件已挂载");
  });
  onUnmounted(() => {
    revokeObjectUrl(authenticatedPreviewUrl.value);
    authenticatedPreviewUrl.value = null;
    if (imageDecodeAbortController.value) {
      imageDecodeAbortController.value.abort();
      imageDecodeAbortController.value = null;
    }
    if (previewTimeoutId.value) {
      clearTimeout(previewTimeoutId.value);
      previewTimeoutId.value = null;
    }
    log2.debug("文件预览组件已卸载");
  });
  return {
    // 保留的状态
    loadError,
    authenticatedPreviewUrl,
    officePreviewLoading,
    officePreviewError,
    officePreviewTimedOut,
    previewTimeoutId,
    isOfficeFullscreen,
    // 保留的计算属性
    fileTypeInfo,
    isImage: isImageFile,
    isVideo: isVideoFile,
    isAudio: isAudioFile,
    isPdf: isPdfFile,
    isOffice: isOfficeFile,
    isText: isTextFile,
    previewUrl,
    // 保留的DOM引用
    officePreviewRef,
    // 保留的方法
    fetchAuthenticatedUrl,
    updateOfficePreviewUrls,
    initializePreview,
    toggleFullscreen,
    handleFullscreenChange,
    handleKeyDown,
    handleContentLoaded,
    handleContentError,
    formatFileSize: formatFileSize$1,
    formatDate,
    toggleOfficeFullscreen,
    reinitializePreviewOnThemeChange,
    initializeForFile
    // 扩展功能将在上层集成
  };
}
function useFilePreviewExtensions(file, authInfo, officePreviewLoading, officePreviewError, officePreviewTimedOut, previewUrl, handleFullscreenChange, handleKeyDown, emit, authenticatedPreviewUrl, previewTimeoutId) {
  const { t } = useI18n();
  const log2 = createLogger("PreviewExtensions");
  const handleOfficePreviewLoaded = () => {
    officePreviewLoading.value = false;
    officePreviewError.value = "";
    officePreviewTimedOut.value = false;
    log2.debug("Office预览加载完成");
  };
  const handleOfficePreviewError = (error) => {
    log2.error("Office预览加载错误:", error);
    officePreviewLoading.value = false;
    officePreviewTimedOut.value = false;
    if (error && error.message) {
      officePreviewError.value = error.message;
    } else {
      officePreviewError.value = t("mount.filePreview.previewError");
    }
    log2.debug("Office预览错误处理完成");
  };
  const handleAudioPlay = (data) => {
    log2.debug("音频开始播放:", data);
  };
  const handleAudioPause = (data) => {
    log2.debug("音频暂停播放:", data);
  };
  const handleAudioError = (error) => {
    if (error?.target?.src?.includes(window.location.origin) && previewUrl.value?.startsWith("https://")) {
      log2.debug("忽略Service Worker相关的误报错误，音频实际可以正常播放");
      return;
    }
    log2.error("音频播放错误:", error);
  };
  const isGeneratingPreview = ref(false);
  const handleDownload = () => {
    emit("download", file.value);
  };
  const handleS3DirectPreview = async () => {
    if (isGeneratingPreview.value) return;
    try {
      isGeneratingPreview.value = true;
      log2.debug("开始生成直链/代理预览...");
      const baseUrl = previewUrl.value;
      if (!baseUrl) {
        throw new Error("当前文件缺少可用的预览URL");
      }
      log2.debug("直链/代理预览使用原始URL:", baseUrl);
      window.open(baseUrl, "_blank");
      log2.debug("预览成功");
      return;
    } catch (error) {
      log2.error("S3直链预览失败:", error);
      emit("show-message", {
        type: "error",
        message: t("mount.filePreview.s3PreviewError", { message: error.message })
      });
    } finally {
      isGeneratingPreview.value = false;
    }
  };
  const getCurrentDirectoryPath = () => {
    if (!file.value?.path) return "";
    const filePath = file.value.path;
    const lastSlashIndex = filePath.lastIndexOf("/");
    if (lastSlashIndex === -1) {
      return "/";
    }
    return filePath.substring(0, lastSlashIndex + 1);
  };
  const isCreatingShare = ref(false);
  const handleCreateShare = async () => {
    if (!file.value || !file.value.path) {
      return;
    }
    isCreatingShare.value = true;
    try {
      const result = await api.fs.createShareFromFileSystem(file.value.path);
      if (result.success) {
        const shareUrl = `${window.location.origin}${result.data.url}`;
        const success = await copyToClipboard(shareUrl);
        if (!success) {
          throw new Error("复制分享链接失败");
        }
        emit("show-message", {
          type: "success",
          message: t("mount.messages.shareCreated", { url: shareUrl })
        });
      } else {
        throw new Error(result.message || "创建分享失败");
      }
    } catch (error) {
      log2.error("创建分享失败:", error);
      emit("show-message", {
        type: "error",
        message: t("mount.messages.shareCreateFailed", { message: error.message })
      });
    } finally {
      isCreatingShare.value = false;
    }
  };
  const initializeExtensions = () => {
    log2.debug("文件预览扩展功能初始化完成");
  };
  const cleanupExtensions = () => {
    if (authenticatedPreviewUrl && authenticatedPreviewUrl.value) {
      URL.revokeObjectURL(authenticatedPreviewUrl.value);
      authenticatedPreviewUrl.value = null;
    }
    if (previewTimeoutId && previewTimeoutId.value) {
      clearTimeout(previewTimeoutId.value);
      previewTimeoutId.value = null;
    }
    log2.debug("文件预览扩展功能清理完成");
  };
  onMounted(initializeExtensions);
  onUnmounted(cleanupExtensions);
  return {
    // Office预览处理
    handleOfficePreviewLoaded,
    handleOfficePreviewError,
    // 音频处理
    handleAudioPlay,
    handleAudioPause,
    handleAudioError,
    // 其他功能
    isGeneratingPreview,
    handleDownload,
    handleS3DirectPreview,
    getCurrentDirectoryPath,
    // 分享功能
    isCreatingShare,
    handleCreateShare,
    // 生命周期
    initializeExtensions,
    cleanupExtensions
  };
}
function useArchivePreview() {
  const log2 = createLogger("ArchivePreview");
  const isExtracting = ref(false);
  const extractError = ref(null);
  const archiveEntries = ref([]);
  const isExtracted = ref(false);
  const currentPreviewFile = ref(null);
  const isPreviewing = ref(false);
  const extractProgress = ref(0);
  const currentStage = ref("");
  const cachedFileName = ref("");
  const cachedFileUrl = ref("");
  const totalSize = computed(() => archiveEntries.value.reduce((total, entry) => total + (entry.size || 0), 0));
  const createBlobFromFileData = (fileData, mimeType) => {
    if (fileData instanceof File) {
      return new Blob([fileData], { type: mimeType });
    } else {
      return new Blob([fileData], { type: mimeType });
    }
  };
  const smartUrlCleanup = (url, fileSize = 0) => {
    let delay = 1e4;
    if (fileSize > 10 * 1024 * 1024) {
      delay = 2e4;
    } else if (fileSize < 1024 * 1024) {
      delay = 5e3;
    }
    setTimeout(() => URL.revokeObjectURL(url), delay);
  };
  const extractArchive = async (fileUrl, fileName, password = null) => {
    if (isExtracting.value) {
      log2.warn("正在解压中，请勿重复操作");
      return;
    }
    isExtracting.value = true;
    extractError.value = null;
    archiveEntries.value = [];
    isExtracted.value = false;
    extractProgress.value = 0;
    currentStage.value = "下载";
    try {
      log2.debug("开始处理压缩文件:", fileName);
      if (password) {
        log2.debug("使用提供的密码进行解压");
      }
      const processedEntries = await archiveService.extractArchive(
        fileUrl,
        fileName,
        fileUrl,
        (progress, stage) => {
          extractProgress.value = Math.round(progress * 10) / 10;
          if (stage) {
            currentStage.value = stage;
          }
        },
        password
      );
      cachedFileName.value = fileName;
      cachedFileUrl.value = fileUrl;
      archiveEntries.value = processedEntries;
      isExtracted.value = true;
      extractProgress.value = 100;
      currentStage.value = "完成";
      log2.debug("压缩文件处理完成，文件数量:", processedEntries.length);
    } catch (error) {
      log2.error("解压失败:", error);
      if (error.message && (error.message.includes("ENCRYPTED_ARCHIVE_DETECTED") || error.message.includes("INVALID_ARCHIVE_PASSWORD"))) {
        log2.debug("检测到加密相关错误，重新抛出给上层处理");
        extractProgress.value = 0;
        currentStage.value = "";
        isExtracted.value = false;
        isExtracting.value = false;
        throw error;
      }
      extractError.value = error.message;
      extractProgress.value = 0;
      currentStage.value = "错误";
      isExtracted.value = false;
    } finally {
      isExtracting.value = false;
    }
  };
  const previewFile = async (entry) => {
    if (entry.isDirectory) {
      log2.warn("无法预览目录:", entry.name);
      return;
    }
    if (isPreviewing.value) {
      log2.warn("正在预览其他文件，请稍候");
      return;
    }
    isPreviewing.value = true;
    currentPreviewFile.value = entry;
    try {
      log2.debug("开始预览文件:", entry.name);
      const arrayBuffer = await archiveService.getFileContent(entry.entry);
      const fileName = entry.name;
      const type = detectFileTypeFromFilename(fileName);
      log2.debug(`预览文件: ${fileName}, 检测类型: ${type}`);
      if (type === FileType.TEXT) {
        let textBuffer;
        if (arrayBuffer instanceof ArrayBuffer) {
          textBuffer = arrayBuffer;
        } else if (arrayBuffer instanceof File) {
          textBuffer = await arrayBuffer.arrayBuffer();
        } else if (arrayBuffer instanceof Uint8Array) {
          textBuffer = arrayBuffer.buffer;
        } else {
          throw new Error(`不支持的数据类型: ${typeof arrayBuffer}`);
        }
        const text = new TextDecoder("utf-8").decode(textBuffer);
        const htmlContent = createTextPreviewHtml(entry.name, text);
        const blob = new Blob([htmlContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
        smartUrlCleanup(url, entry.size);
      } else if (type === FileType.IMAGE) {
        const mimeType = lookupMimeType(fileName) || "image/jpeg";
        const blobData = createBlobFromFileData(arrayBuffer, mimeType);
        const url = URL.createObjectURL(blobData);
        window.open(url, "_blank");
        smartUrlCleanup(url, entry.size);
      } else if (type === FileType.DOCUMENT) {
        const blobData = createBlobFromFileData(arrayBuffer, "application/pdf");
        const url = URL.createObjectURL(blobData);
        window.open(url, "_blank");
        smartUrlCleanup(url, entry.size);
      } else if (type === FileType.VIDEO) {
        const mimeType = lookupMimeType(fileName) || "video/mp4";
        const blobData = createBlobFromFileData(arrayBuffer, mimeType);
        const url = URL.createObjectURL(blobData);
        window.open(url, "_blank");
        smartUrlCleanup(url, entry.size);
      } else if (type === FileType.AUDIO) {
        const mimeType = lookupMimeType(fileName) || "audio/mpeg";
        const blobData = createBlobFromFileData(arrayBuffer, mimeType);
        const url = URL.createObjectURL(blobData);
        window.open(url, "_blank");
        smartUrlCleanup(url, entry.size);
      } else {
        const blobData = createBlobFromFileData(arrayBuffer, "application/octet-stream");
        const url = URL.createObjectURL(blobData);
        const a = document.createElement("a");
        a.href = url;
        a.download = getFileName(entry.name);
        a.click();
        URL.revokeObjectURL(url);
      }
      log2.debug("文件预览成功:", entry.name);
    } catch (error) {
      log2.error("预览文件失败:", error);
      extractError.value = error.message || "预览失败";
    } finally {
      isPreviewing.value = false;
      currentPreviewFile.value = null;
    }
  };
  const downloadFile = async (entry) => {
    if (entry.isDirectory) {
      log2.warn("无法下载目录:", entry.name);
      return;
    }
    try {
      log2.debug("开始下载文件:", entry.name);
      const fileData = await archiveService.getFileContent(entry.entry);
      const mimeType = lookupMimeType(entry.name) || "application/octet-stream";
      const blob = createBlobFromFileData(fileData, mimeType);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = getFileName(entry.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      log2.debug("文件下载成功:", entry.name);
    } catch (error) {
      log2.error("下载文件失败:", error);
      extractError.value = error.message || "下载失败";
    }
  };
  const resetState = () => {
    isExtracting.value = false;
    extractError.value = null;
    archiveEntries.value = [];
    isExtracted.value = false;
    currentPreviewFile.value = null;
    isPreviewing.value = false;
    extractProgress.value = 0;
    currentStage.value = "";
    cachedFileName.value = "";
    cachedFileUrl.value = "";
    log2.debug("压缩文件预览状态已重置");
  };
  const createTextPreviewHtml = (fileName, content) => {
    return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>${fileName}</title>
<style>body{font-family:monospace;padding:20px;white-space:pre-wrap;}</style>
</head><body>${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</body></html>`;
  };
  onUnmounted(async () => {
    resetState();
    try {
      await cleanupZipJS();
    } catch (error) {
      log2.warn("清理zip.js资源时出错:", error);
    }
  });
  return {
    // 状态
    isExtracting,
    extractError,
    archiveEntries,
    isExtracted,
    currentPreviewFile,
    isPreviewing,
    extractProgress,
    currentStage,
    // 计算属性
    totalSize,
    // 方法
    extractArchive,
    previewFile,
    downloadFile,
    resetState,
    // 服务实例（用于高级用法）
    archiveService
  };
}
function useFileSave() {
  const { t } = useI18n();
  const log2 = createLogger("FileSave");
  const isSaving = ref(false);
  const saveError = ref(null);
  const saveFile = async (filePath, fileName, content, currentPath) => {
    try {
      isSaving.value = true;
      saveError.value = null;
      log2.debug("保存文件:", {
        filePath,
        fileName,
        contentLength: content.length,
        currentPath
      });
      const response = await api.fs.updateFile(filePath, content);
      if (response && response.success) {
        log2.debug("文件保存成功:", response);
        return {
          success: true,
          message: t("mount.messages.fileSaveSuccess", { name: fileName }),
          data: response.data
        };
      } else {
        throw new Error(response?.message || t("mount.messages.fileSaveFailed"));
      }
    } catch (error) {
      log2.error("保存文件失败:", error);
      saveError.value = error.message || t("mount.messages.fileSaveFailed");
      return {
        success: false,
        message: saveError.value,
        error
      };
    } finally {
      isSaving.value = false;
    }
  };
  const clearSaveError = () => {
    saveError.value = null;
  };
  return {
    // 状态
    isSaving,
    saveError,
    // 方法
    saveFile,
    clearSaveError
  };
}
const _sfc_main$b = {
  __name: "AudioPlayer",
  props: {
    // 音频文件列表
    audioList: {
      type: Array,
      default: () => []
    },
    // 当前播放的音频信息
    currentAudio: {
      type: Object,
      default: () => null
    },
    // 是否为深色模式
    darkMode: {
      type: Boolean,
      default: false
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      default: false
    },
    // 是否显示播放列表
    showPlaylist: {
      type: Boolean,
      default: true
    },
    // 播放器主题色
    theme: {
      type: String,
      default: "#3b82f6"
    },
    // 播放器模式：'normal', 'mini', 'fixed'
    mode: {
      type: String,
      default: "normal"
    },
    // 是否循环播放
    loop: {
      type: String,
      default: "all"
      // 'all', 'one', 'none'
    },
    // 播放顺序
    order: {
      type: String,
      default: "list"
      // 'list', 'random'
    },
    // 播放列表是否折叠
    listFolded: {
      type: Boolean,
      default: true
    },
    // 播放列表最大高度
    listMaxHeight: {
      type: String,
      default: "250px"
    },
    // 音量
    volume: {
      type: Number,
      default: 0.7
    },
    // 是否显示歌词
    showLrc: {
      type: Boolean,
      default: false
    }
  },
  emits: ["play", "pause", "ended", "timeupdate", "loadstart", "canplay", "error", "listswitch", "listadd", "listremove", "listclear", "noticeshow", "noticehide"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const log2 = createLogger("AudioPlayer");
    const props = __props;
    const emit = __emit;
    const aplayerContainer = ref(null);
    const aplayerInstance = ref(null);
    const getThemeColor = () => {
      if (props.darkMode) {
        return "#60a5fa";
      }
      return props.theme;
    };
    const initAPlayer = () => {
      if (!aplayerContainer.value) return;
      if (aplayerInstance.value) {
        aplayerInstance.value.destroy();
        aplayerInstance.value = null;
      }
      const audioData = prepareAudioData();
      if (audioData.length === 0) return;
      const options = {
        container: aplayerContainer.value,
        audio: audioData,
        autoplay: props.autoplay,
        theme: getThemeColor(),
        loop: props.loop,
        order: props.order,
        preload: "metadata",
        volume: props.volume,
        mutex: true,
        listFolded: props.listFolded,
        listMaxHeight: props.listMaxHeight,
        lrcType: props.showLrc ? 3 : 0,
        storageName: "cloudpaste-aplayer"
      };
      if (props.mode === "mini") {
        options.mini = true;
      } else if (props.mode === "fixed") {
        options.fixed = true;
      }
      try {
        aplayerInstance.value = new APlayer(options);
        bindEvents();
        applyThemeStyles();
      } catch (error) {
        log2.error("APlayer 初始化失败:", error);
        emit("error", error);
      }
    };
    const prepareAudioData = () => {
      const audioData = [];
      if (props.currentAudio) {
        audioData.push(formatAudioItem(props.currentAudio));
      }
      if (props.audioList && props.audioList.length > 0) {
        props.audioList.forEach((audio) => {
          if (!props.currentAudio || audio.url !== props.currentAudio.url) {
            audioData.push(formatAudioItem(audio));
          }
        });
      }
      return audioData;
    };
    const formatAudioItem = (audio) => {
      return {
        name: audio.name || audio.title || "未知音频",
        artist: audio.artist || "未知艺术家",
        url: audio.url,
        cover: audio.cover || audio.poster || generateDefaultCover(audio.name),
        lrc: audio.lrc || audio.lyrics,
        theme: getThemeColor(),
        originalFile: audio.originalFile || null
      };
    };
    const generateDefaultCover = (name) => {
      const firstChar = (name || "M")[0].toUpperCase();
      const canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = getThemeColor();
      ctx.fillRect(0, 0, 100, 100);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 40px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(firstChar, 50, 50);
      return canvas.toDataURL();
    };
    const bindEvents = () => {
      if (!aplayerInstance.value) return;
      const ap = aplayerInstance.value;
      ap.on("play", () => {
        emit("play", {
          audio: ap.list.audios[ap.list.index],
          index: ap.list.index
        });
      });
      ap.on("pause", () => {
        emit("pause", {
          audio: ap.list.audios[ap.list.index],
          index: ap.list.index
        });
      });
      ap.on("ended", () => {
        emit("ended", {
          audio: ap.list.audios[ap.list.index],
          index: ap.list.index
        });
      });
      ap.on("timeupdate", () => {
        emit("timeupdate", {
          currentTime: ap.audio.currentTime,
          duration: ap.audio.duration,
          percentage: ap.audio.currentTime / ap.audio.duration * 100
        });
      });
      ap.on("loadstart", () => {
        emit("loadstart");
      });
      ap.on("canplay", () => {
        emit("canplay");
      });
      ap.on("error", (error) => {
        if (!error?.target) {
          log2.debug("忽略一次无 target 的播放错误事件");
          return;
        }
        const currentUrl = ap?.list?.audios?.[ap.list.index]?.url;
        if (!currentUrl) {
          log2.debug("正在按需获取音频直链，先忽略一次播放错误");
          return;
        }
        if (typeof currentUrl === "string" && currentUrl.startsWith("data:audio/")) {
          log2.debug("忽略占位音频的播放错误");
          return;
        }
        if (error?.target?.src?.includes(window.location.origin) && ap?.list?.audios?.[ap.list.index]?.url?.startsWith("https://")) {
          log2.debug("忽略Service Worker相关的误报错误，音频实际可以正常播放");
          return;
        }
        log2.error("APlayer 播放错误:", error);
        emit("error", error);
      });
      ap.on("listswitch", (index) => {
        const resolvedIndex = typeof index === "object" && index !== null && typeof index.index === "number" ? index.index : index;
        const audio = ap.list && ap.list.audios && ap.list.audios[resolvedIndex] ? ap.list.audios[resolvedIndex] : null;
        emit("listswitch", {
          audio,
          index: resolvedIndex
        });
      });
    };
    const applyThemeStyles = () => {
      if (!aplayerContainer.value) return;
      nextTick(() => {
        const container = aplayerContainer.value;
        if (!container) return;
        const aplayerElement = container.querySelector(".aplayer");
        if (!aplayerElement) return;
        const themeColor = getThemeColor();
        aplayerElement.style.setProperty("--aplayer-theme", themeColor);
        if (props.darkMode) {
          container.classList.add("dark-theme");
        } else {
          container.classList.remove("dark-theme");
        }
      });
    };
    const play = () => {
      if (aplayerInstance.value) {
        aplayerInstance.value.play();
      }
    };
    const pause = () => {
      if (aplayerInstance.value) {
        aplayerInstance.value.pause();
      }
    };
    const toggle = () => {
      if (aplayerInstance.value) {
        aplayerInstance.value.toggle();
      }
    };
    const seek = (time) => {
      if (aplayerInstance.value) {
        aplayerInstance.value.seek(time);
      }
    };
    const setVolume = (volume) => {
      if (aplayerInstance.value) {
        aplayerInstance.value.volume(volume);
      }
    };
    const switchAudio = (index) => {
      if (aplayerInstance.value && aplayerInstance.value.list) {
        aplayerInstance.value.list.switch(index);
      }
    };
    const addAudio = (audio) => {
      if (aplayerInstance.value && aplayerInstance.value.list) {
        aplayerInstance.value.list.add(formatAudioItem(audio));
      }
    };
    const removeAudio = (index) => {
      if (aplayerInstance.value && aplayerInstance.value.list) {
        aplayerInstance.value.list.remove(index);
      }
    };
    __expose({
      play,
      pause,
      toggle,
      seek,
      setVolume,
      switchAudio,
      addAudio,
      removeAudio,
      getInstance: () => aplayerInstance.value
    });
    watch(
      () => props.darkMode,
      () => {
        applyThemeStyles();
      },
      { immediate: false }
    );
    watch(
      () => props.theme,
      () => {
        if (aplayerInstance.value) {
          aplayerInstance.value.theme(getThemeColor());
        }
        applyThemeStyles();
      }
    );
    watch(
      () => [props.currentAudio, props.audioList, props.audioList?.length || 0, props.loop, props.order],
      () => {
        initAPlayer();
      },
      { deep: false }
    );
    watch(
      () => props.volume,
      (newVolume) => {
        setVolume(newVolume);
      }
    );
    onMounted(() => {
      nextTick(() => {
        initAPlayer();
      });
    });
    onBeforeUnmount(() => {
      if (aplayerInstance.value) {
        aplayerInstance.value.destroy();
        aplayerInstance.value = null;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["audio-player-container", { "dark-theme": __props.darkMode }])
      }, [
        createBaseVNode("div", {
          ref_key: "aplayerContainer",
          ref: aplayerContainer,
          class: "aplayer-container"
        }, null, 512)
      ], 2);
    };
  }
};
const AudioPlayer = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-d592421e"]]);
const log = createLogger("GlobalPlayer");
function useGlobalPlayer() {
  const store = useGlobalPlayerStore();
  const {
    isVisible,
    isPlaying,
    isMiniMode,
    isExpandedMode,
    currentTrack,
    hasPlaylist,
    playlist,
    currentIndex,
    progress,
    volume,
    loopMode,
    orderMode,
    formattedCurrentTime,
    formattedDuration,
    error
  } = storeToRefs(store);
  const playAudio = (audioList, startIndex = 0) => {
    if (!audioList || audioList.length === 0) {
      log.warn("playAudio: 音频列表为空");
      return;
    }
    store.setPlaylist(audioList, startIndex);
    store.setDisplayMode("expanded");
  };
  const playSingleAudio = (audio) => {
    if (!audio || !audio.url) {
      log.warn("playSingleAudio: 音频对象无效");
      return;
    }
    playAudio([audio], 0);
  };
  const addToPlaylist = (audio, playNow = false) => {
    store.addToPlaylist(audio);
    if (playNow) {
      const index = store.playlist.length - 1;
      store.switchTrack(index);
    }
    store.showPlayer();
  };
  const togglePlay = () => {
    store.togglePlay();
  };
  const play = () => {
    store.play();
  };
  const pause = () => {
    store.pause();
  };
  const playNext = () => {
    store.playNext();
  };
  const playPrev = () => {
    store.playPrev();
  };
  const switchTo = (index) => {
    store.switchTrack(index);
  };
  const setVolume = (vol) => {
    store.setVolume(vol);
  };
  const seekTo = (time) => {
    store.seekTo(time);
  };
  const showPlayer = () => {
    store.showPlayer();
  };
  const hidePlayer = () => {
    store.hidePlayer();
  };
  const togglePlayer = () => {
    store.toggleVisibility();
  };
  const toggleDisplayMode = () => {
    store.toggleDisplayMode();
  };
  const setMiniMode = () => {
    store.setDisplayMode("mini");
  };
  const setExpandedMode = () => {
    store.setDisplayMode("expanded");
  };
  const closePlayer = () => {
    store.closePlayer();
  };
  const clearPlaylist = () => {
    store.clearPlaylist();
  };
  const toggleLoopMode = () => {
    store.toggleLoopMode();
  };
  const toggleOrderMode = () => {
    store.toggleOrderMode();
  };
  const getAPlayerInstance = () => {
    return store.getAPlayerInstance();
  };
  return {
    // 状态（只读）
    isVisible,
    isPlaying,
    isMiniMode,
    isExpandedMode,
    currentTrack,
    hasPlaylist,
    playlist,
    currentIndex,
    progress,
    volume,
    loopMode,
    orderMode,
    formattedCurrentTime,
    formattedDuration,
    error,
    // 播放控制
    playAudio,
    playSingleAudio,
    addToPlaylist,
    togglePlay,
    play,
    pause,
    playNext,
    playPrev,
    switchTo,
    setVolume,
    seekTo,
    // 显示控制
    showPlayer,
    hidePlayer,
    togglePlayer,
    toggleDisplayMode,
    setMiniMode,
    setExpandedMode,
    closePlayer,
    clearPlaylist,
    // 模式控制
    toggleLoopMode,
    toggleOrderMode,
    // APlayer 实例（高级用法）
    getAPlayerInstance,
    // Store 引用（高级用法）
    store
  };
}
const _hoisted_1$9 = { class: "audio-preview-container" };
const _hoisted_2$8 = { class: "audio-preview p-4" };
const _hoisted_3$7 = {
  key: 0,
  class: "text-center py-8"
};
const _hoisted_4$7 = {
  key: 1,
  class: "flex flex-col items-center max-w-sm mx-auto py-8"
};
const _hoisted_5$7 = { class: "text-center mb-6" };
const _hoisted_6$7 = { class: "flex w-full gap-2" };
const _hoisted_7$6 = {
  key: 2,
  class: "audio-player-wrapper"
};
const _hoisted_8$5 = ["title"];
const _hoisted_9$4 = {
  key: 3,
  class: "text-center py-8"
};
const PLACEHOLDER_AUDIO_URL = "data:audio/wav;base64,UklGRuwAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YcgAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgA==";
const _sfc_main$a = {
  __name: "AudioPreview",
  props: {
    // 文件信息
    file: {
      type: Object,
      required: true
    },
    // 音频URL
    audioUrl: {
      type: String,
      default: null
    },
    // 是否为深色模式
    darkMode: {
      type: Boolean,
      default: false
    },
    // 是否为管理员
    isAdmin: {
      type: Boolean,
      default: false
    },
    // 当前目录路径
    currentPath: {
      type: String,
      default: ""
    },
    // 目录项目列表
    directoryItems: {
      type: Array,
      default: () => []
    }
  },
  emits: ["play", "pause", "error", "canplay", "loaded"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const log2 = createLogger("AudioPreview");
    const fsService = useFsService();
    const globalPlayer = useGlobalPlayer();
    const props = __props;
    const emit = __emit;
    const audioPlayerRef = ref(null);
    const isPlaying = ref(false);
    const originalTitle = ref("");
    const sentToGlobalPlayer = ref(false);
    const audioPlaylist = ref([]);
    const isLoadingPlaylist = ref(false);
    const currentAudioData = ref(null);
    const audioUrlCache = /* @__PURE__ */ new Map();
    const audioUrlPending = /* @__PURE__ */ new Map();
    const currentFileName = computed(() => props.file?.name || t("mount.audioPreview.unknownAudio"));
    const finalAudioList = computed(() => {
      if (audioPlaylist.value.length > 0) {
        return audioPlaylist.value;
      } else if (currentAudioData.value) {
        return [currentAudioData.value];
      }
      return [];
    });
    const audioData = computed(() => currentAudioData.value);
    const updatePageTitle = (playing = false, fileName = null) => {
      const title = fileName || t("mount.audioPreview.audioPlayer");
      document.title = playing ? `🎵 ${title}` : `${title}`;
    };
    const restoreOriginalTitle = () => {
      if (originalTitle.value) {
        document.title = originalTitle.value;
      }
    };
    const sendToGlobalPlayer = () => {
      if (finalAudioList.value.length === 0) {
        log2.warn("没有可播放的音频");
        return;
      }
      const currentIndex = finalAudioList.value.findIndex(
        (audio) => audio.originalFile?.path === props.file?.path || audio.name === props.file?.name
      );
      globalPlayer.playAudio(finalAudioList.value, Math.max(0, currentIndex));
      sentToGlobalPlayer.value = true;
      if (audioPlayerRef.value) {
        const player = audioPlayerRef.value.getInstance?.();
        if (player) {
          player.pause();
        }
      }
    };
    const backToLocalPreview = () => {
      sentToGlobalPlayer.value = false;
    };
    const handlePlay = (data) => {
      isPlaying.value = true;
      const audioName = data?.audio?.name;
      updatePageTitle(true, audioName);
      emit("play", data);
    };
    const handlePause = (data) => {
      isPlaying.value = false;
      const audioName = data?.audio?.name;
      updatePageTitle(false, audioName);
      emit("pause", data);
    };
    const handleError = (error) => {
      try {
        const ap = audioPlayerRef.value?.getInstance?.();
        const idx = ap?.list?.index;
        const current = typeof idx === "number" ? ap?.list?.audios?.[idx] : null;
        if (current && (!current.url || current.url === "" || current.url === PLACEHOLDER_AUDIO_URL)) {
          return;
        }
      } catch {
      }
      if (error?.target?.src?.includes(window.location.origin) && currentAudioData.value?.url) {
        return;
      }
      isPlaying.value = false;
      emit("error", error);
    };
    const handleCanPlay = () => {
      emit("canplay");
      emit("loaded");
    };
    const handleAudioEnded = () => {
      isPlaying.value = false;
      updatePageTitle(false);
    };
    const handleListSwitch = (data) => {
      const audioIndex = data?.index?.index ?? data?.index;
      let audioName = null;
      if (data?.audio?.name) {
        audioName = data.audio.name;
      } else if (typeof audioIndex === "number" && finalAudioList.value[audioIndex]) {
        audioName = finalAudioList.value[audioIndex].name;
      }
      updatePageTitle(isPlaying.value, audioName);
      if (typeof audioIndex === "number") {
        const ap = audioPlayerRef.value?.getInstance?.();
        const wasPlaying = !!ap?.audio && !ap.audio.paused;
        try {
          const currentUrl = ap?.list?.audios?.[audioIndex]?.url;
          if (ap?.audio && currentUrl === PLACEHOLDER_AUDIO_URL) {
            ap.audio.loop = true;
          }
        } catch {
        }
        void ensureAudioUrlReady(audioIndex, { playAfter: wasPlaying });
      }
    };
    const ensureAudioUrlReady = async (index, { playAfter = false } = {}) => {
      const list = finalAudioList.value;
      const item = list?.[index];
      if (!item) return null;
      const syncUrlAndMaybeResume = (url) => {
        const ap = audioPlayerRef.value?.getInstance?.();
        const wasPlayingBeforeSwap = !!ap?.audio && !ap.audio.paused;
        syncAPlayerAudioUrl(index, url);
        const shouldResume = playAfter || wasPlayingBeforeSwap;
        if (!shouldResume) return;
        try {
          ap?.audio?.play?.();
        } catch {
        }
      };
      if (item.url && item.url !== PLACEHOLDER_AUDIO_URL) {
        return item.url;
      }
      const filePath = item.originalFile?.path || props.file?.path;
      if (!filePath) return null;
      if (audioUrlCache.has(filePath)) {
        const cachedUrl = audioUrlCache.get(filePath);
        item.url = cachedUrl;
        syncUrlAndMaybeResume(cachedUrl);
        return cachedUrl;
      }
      if (audioUrlPending.has(filePath)) {
        const pending = audioUrlPending.get(filePath);
        const url = await pending;
        if (url) {
          item.url = url;
          syncUrlAndMaybeResume(url);
        }
        return url;
      }
      const task = (async () => {
        try {
          const url = await fsService.getFileLink(filePath, null, false);
          if (url) audioUrlCache.set(filePath, url);
          return url;
        } catch (error) {
          log2.error(`获取音频直链失败: ${filePath}`, error);
          return null;
        }
      })();
      audioUrlPending.set(filePath, task);
      try {
        const url = await task;
        if (url) {
          item.url = url;
          syncUrlAndMaybeResume(url);
        }
        return url;
      } finally {
        audioUrlPending.delete(filePath);
      }
    };
    const syncAPlayerAudioUrl = (index, url) => {
      const ap = audioPlayerRef.value?.getInstance?.();
      if (!ap?.list?.audios || typeof index !== "number") return;
      const audio = ap.list.audios[index];
      if (audio) {
        audio.url = url;
      }
      if (ap.list.index === index && ap.audio) {
        try {
          ap.audio.src = url;
          ap.audio.loop = url === PLACEHOLDER_AUDIO_URL ? true : ap.options?.loop === "one";
          ap.audio.load?.();
        } catch (e) {
          log2.warn("同步 audio.src 失败:", e);
        }
      }
    };
    const loadAudioPlaylist = async () => {
      if (!props.currentPath || isLoadingPlaylist.value) {
        return;
      }
      if (audioPlaylist.value.length > 0) {
        return;
      }
      try {
        isLoadingPlaylist.value = true;
        let directoryItems = [];
        if (props.directoryItems && props.directoryItems.length > 0) {
          directoryItems = props.directoryItems;
        } else {
          const data = await fsService.getDirectoryList(props.currentPath);
          if (data?.items) {
            directoryItems = data.items;
          } else {
            return;
          }
        }
        const audioFileList = directoryItems.filter((item) => {
          if (item.isDirectory) return false;
          return item.type === FileType.AUDIO;
        });
        audioFileList.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        if (audioFileList.length > 0) {
          await generateAudioPlaylist(audioFileList);
        }
      } catch (error) {
        log2.error("❌ 加载音频播放列表失败:", error);
      } finally {
        isLoadingPlaylist.value = false;
      }
    };
    const generateAudioPlaylist = async (audioFileList) => {
      const playlist = [];
      for (const audioFile of audioFileList) {
        if (audioFile.path === props.file?.path && currentAudioData.value) {
          playlist.push(currentAudioData.value);
          if (currentAudioData.value?.url) {
            audioUrlCache.set(audioFile.path, currentAudioData.value.url);
          }
          continue;
        }
        playlist.push({
          name: audioFile.name || "unknown",
          artist: "unknown",
          url: PLACEHOLDER_AUDIO_URL,
          cover: generateDefaultCover(audioFile.name),
          originalFile: audioFile
        });
      }
      const currentFileIndex = playlist.findIndex((audio) => audio.originalFile?.path === props.file?.path);
      if (currentFileIndex > 0) {
        const currentFile = playlist.splice(currentFileIndex, 1)[0];
        playlist.unshift(currentFile);
      }
      audioPlaylist.value = playlist;
    };
    const generateDefaultCover = (name) => {
      const firstChar = (name || "M")[0].toUpperCase();
      const canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = props.darkMode ? "#60a5fa" : "#3b82f6";
      ctx.fillRect(0, 0, 100, 100);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 40px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(firstChar, 50, 50);
      return canvas.toDataURL();
    };
    const initializeCurrentAudio = async () => {
      if (!props.file) {
        return;
      }
      if (props.audioUrl) {
        currentAudioData.value = {
          name: props.file.name || "unknown",
          artist: "unknown",
          url: props.audioUrl,
          cover: generateDefaultCover(props.file.name),
          contentType: props.file.contentType,
          originalFile: props.file
        };
        return;
      }
      log2.warn("⚠️ audioUrl为空");
      currentAudioData.value = {
        name: props.file.name || "unknown",
        artist: "unknown",
        url: null,
        cover: generateDefaultCover(props.file.name),
        contentType: props.file.contentType,
        originalFile: props.file
      };
    };
    watch(
      () => props.audioUrl,
      async (newAudioUrl, oldAudioUrl) => {
        if (newAudioUrl && props.file && newAudioUrl !== oldAudioUrl) {
          await initializeCurrentAudio();
        }
      }
    );
    watch(
      [() => globalPlayer.isVisible.value, () => globalPlayer.hasPlaylist.value],
      ([visible, hasPlaylist]) => {
        if (sentToGlobalPlayer.value && (!visible || !hasPlaylist)) {
          sentToGlobalPlayer.value = false;
        }
      }
    );
    const handleKeydown = (event) => {
      if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
        return;
      }
      if (sentToGlobalPlayer.value) {
        return;
      }
      const player = audioPlayerRef.value?.getInstance();
      if (!player) return;
      switch (event.code) {
        case "Space":
          event.preventDefault();
          player.toggle();
          break;
        case "ArrowLeft":
          event.preventDefault();
          player.seek(Math.max(0, player.audio.currentTime - 10));
          break;
        case "ArrowRight":
          event.preventDefault();
          player.seek(Math.min(player.audio.duration, player.audio.currentTime + 10));
          break;
        case "ArrowUp":
          event.preventDefault();
          player.volume(Math.min(1, player.audio.volume + 0.1));
          break;
        case "ArrowDown":
          event.preventDefault();
          player.volume(Math.max(0, player.audio.volume - 0.1));
          break;
      }
    };
    useEventListener(document, "keydown", handleKeydown);
    onMounted(() => {
      originalTitle.value = document.title;
      nextTick(async () => {
        await initializeCurrentAudio();
        loadAudioPlaylist();
      });
    });
    onBeforeUnmount(() => {
      restoreOriginalTitle();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$9, [
        createBaseVNode("div", _hoisted_2$8, [
          isLoadingPlaylist.value ? (openBlock(), createElementBlock("div", _hoisted_3$7, [
            createVNode(_sfc_main$c, {
              text: _ctx.$t("mount.audioPreview.loadingAudio"),
              "dark-mode": __props.darkMode,
              size: "2xl",
              "icon-class": __props.darkMode ? "text-primary-500" : "text-primary-600"
            }, null, 8, ["text", "dark-mode", "icon-class"])
          ])) : sentToGlobalPlayer.value ? (openBlock(), createElementBlock("div", _hoisted_4$7, [
            createBaseVNode("div", _hoisted_5$7, [
              createBaseVNode("h3", {
                class: normalizeClass(["text-lg font-semibold mb-1.5", __props.darkMode ? "text-gray-100" : "text-gray-900"])
              }, toDisplayString(_ctx.$t("mount.audioPreview.playingInGlobalPlayer")), 3),
              createBaseVNode("p", {
                class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-400" : "text-gray-600"])
              }, toDisplayString(currentFileName.value), 3)
            ]),
            createBaseVNode("div", _hoisted_6$7, [
              createBaseVNode("button", {
                class: normalizeClass(["flex-1 px-4 py-2 rounded-md border transition-colors flex items-center justify-center gap-1.5 text-sm font-medium", [
                  __props.darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-50"
                ]]),
                onClick: backToLocalPreview
              }, [
                createBaseVNode("span", null, toDisplayString(_ctx.$t("mount.audioPreview.backToPreview")), 1)
              ], 2)
            ])
          ])) : !sentToGlobalPlayer.value && __props.audioUrl && audioData.value ? (openBlock(), createElementBlock("div", _hoisted_7$6, [
            createVNode(AudioPlayer, {
              ref_key: "audioPlayerRef",
              ref: audioPlayerRef,
              "audio-list": finalAudioList.value,
              "current-audio": null,
              "dark-mode": __props.darkMode,
              autoplay: false,
              "show-playlist": true,
              "list-folded": true,
              "list-max-height": "380px",
              mode: "normal",
              volume: 0.7,
              loop: "all",
              order: "list",
              onPlay: handlePlay,
              onPause: handlePause,
              onError: handleError,
              onCanplay: handleCanPlay,
              onEnded: handleAudioEnded,
              onListswitch: handleListSwitch
            }, null, 8, ["audio-list", "dark-mode"]),
            createBaseVNode("button", {
              class: normalizeClass(["send-to-global-btn", { "dark": __props.darkMode }]),
              title: _ctx.$t("mount.audioPreview.sendToGlobalPlayer"),
              onClick: sendToGlobalPlayer
            }, _cache[0] || (_cache[0] = [
              createBaseVNode("svg", {
                viewBox: "0 0 24 24",
                width: "14",
                height: "14",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createBaseVNode("path", {
                  d: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ], -1)
            ]), 10, _hoisted_8$5)
          ])) : (openBlock(), createElementBlock("div", _hoisted_9$4, [
            createVNode(_sfc_main$c, {
              text: _ctx.$t("mount.audioPreview.loadingAudio"),
              "dark-mode": __props.darkMode,
              size: "2xl",
              "icon-class": __props.darkMode ? "text-primary-500" : "text-primary-600"
            }, null, 8, ["text", "dark-mode", "icon-class"])
          ]))
        ])
      ]);
    };
  }
};
const AudioPreview = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-78af4f0e"]]);
const _hoisted_1$8 = { class: "video-box relative flex-1 min-h-0 w-full bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800" };
const _hoisted_2$7 = { class: "relative w-full h-full bg-black" };
const _hoisted_3$6 = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center"
};
const _hoisted_4$6 = { class: "absolute right-0 top-0 bottom-0 w-full sm:w-80 max-w-[85vw] z-20 flex flex-col bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-700/50 shadow-2xl" };
const _hoisted_5$6 = { class: "flex items-center justify-between px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50" };
const _hoisted_6$6 = { class: "text-gray-800 dark:text-white font-medium text-sm tracking-wide" };
const _hoisted_7$5 = { class: "flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1" };
const _hoisted_8$4 = ["onClick"];
const _hoisted_9$3 = { class: "flex-shrink-0 w-6 flex justify-center" };
const _hoisted_10$3 = {
  key: 0,
  class: "playing-equalizer"
};
const _hoisted_11$3 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-4 h-4 fill-current",
  viewBox: "0 0 24 24"
};
const _hoisted_12$3 = {
  key: 2,
  class: "text-xs font-mono opacity-50"
};
const _hoisted_13$2 = { class: "text-xs font-medium truncate flex-1 leading-relaxed" };
const _hoisted_14$2 = ["title"];
const _hoisted_15$2 = { class: "text-xs font-medium" };
const controlSvgPrev = '<svg fill="none" stroke-width="2" xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M20 5v14l-8 -7z" stroke-width="0" fill="currentColor"></path><path d="M11 5v14l-8 -7z" stroke-width="0" fill="currentColor"></path></svg>';
const controlSvgNext = '<svg fill="none" stroke-width="2" xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 5v14l8 -7z" stroke-width="0" fill="currentColor"></path><path d="M13 5v14l8 -7z" stroke-width="0" fill="currentColor"></path></svg>';
const controlSvgFullscreen = '<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>';
const controlSvgFullscreenExit = '<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-14v3h3v2h-5V5z"/></svg>';
const _sfc_main$9 = {
  __name: "VideoPreview",
  props: {
    file: { type: Object, required: true },
    videoUrl: { type: String, default: null },
    darkMode: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    // 全屏状态由父容器统一管理（挂载浏览页的工具栏全屏/播放器按钮共用同一个开关）
    isFullscreen: { type: Boolean, default: false },
    currentPath: { type: String, default: "" },
    directoryItems: { type: Array, default: () => [] }
  },
  emits: ["play", "pause", "error", "canplay", "loaded", "fullscreen", "fullscreenExit", "toggle-fullscreen"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const log2 = createLogger("FsVideoPreview");
    const fsService = useFsService();
    const navigateToFile = inject("navigateToFile", null);
    const previewContainerRef = ref(null);
    const { y: windowScrollY } = useWindowScroll();
    const props = __props;
    const emit = __emit;
    const videoPlayerRef = ref(null);
    const isPlaying = ref(false);
    const originalTitle = ref("");
    const currentTime = ref(0);
    const duration = ref(0);
    const isPlaylistOpen = ref(false);
    const currentVideoData = ref(null);
    const isHLSVideo = ref(false);
    const isPreparingHls = ref(false);
    const videoData = computed(() => currentVideoData.value);
    const resolvedDirectoryItems = ref([]);
    const isResolvingDirectory = ref(false);
    let resolveDirectorySeq = 0;
    const lastResolvedDirPath = ref("");
    let resolvingDirectoryPromise = null;
    const getParentDirFromFilePath = (p) => {
      const raw = String(p || "").trim();
      if (!raw) return "/";
      const normalized = raw.startsWith("/") ? raw : `/${raw}`;
      const parts = normalized.split("/").filter(Boolean);
      if (parts.length <= 1) return "/";
      return `/${parts.slice(0, -1).join("/")}`;
    };
    const getEffectiveDirPath = () => {
      const fromProp = normalizeDirPath(props.currentPath || "");
      if (fromProp && fromProp !== "/") return fromProp;
      const fromFile = getParentDirFromFilePath(props.file?.path);
      return normalizeDirPath(fromFile || "/");
    };
    const getEffectiveDirectoryItems = () => {
      const passed = Array.isArray(props.directoryItems) ? props.directoryItems : [];
      if (passed.length) return passed;
      const cached = Array.isArray(resolvedDirectoryItems.value) ? resolvedDirectoryItems.value : [];
      return cached;
    };
    const ensureDirectoryItemsLoaded = async ({ refresh = false } = {}) => {
      const passed = Array.isArray(props.directoryItems) ? props.directoryItems : [];
      if (passed.length) return;
      const dirPath = getEffectiveDirPath();
      if (!dirPath) return;
      if (lastResolvedDirPath.value !== dirPath) {
        lastResolvedDirPath.value = dirPath;
        resolvedDirectoryItems.value = [];
      }
      if (resolvingDirectoryPromise) {
        await resolvingDirectoryPromise;
        return;
      }
      const seq = ++resolveDirectorySeq;
      isResolvingDirectory.value = true;
      resolvingDirectoryPromise = (async () => {
        try {
          const data = await fsService.getDirectoryList(dirPath, { refresh });
          if (seq !== resolveDirectorySeq) return;
          resolvedDirectoryItems.value = Array.isArray(data?.items) ? data.items : [];
        } catch {
          if (seq !== resolveDirectorySeq) return;
          resolvedDirectoryItems.value = [];
        } finally {
          if (seq === resolveDirectorySeq) {
            isResolvingDirectory.value = false;
          }
          if (resolvingDirectoryPromise) {
            resolvingDirectoryPromise = null;
          }
        }
      })();
      await resolvingDirectoryPromise;
    };
    const VIDEO_EXTS = /* @__PURE__ */ new Set(["mp4", "m4v", "mov", "webm", "mkv", "avi", "flv", "ts", "m2ts", "m3u8"]);
    const isVideoItem = (it) => {
      if (!it || it.isDirectory) return false;
      const ext = getExtLower(it.name);
      if (VIDEO_EXTS.has(ext)) return true;
      const mt = String(it.mimetype || it.mimeType || "").toLowerCase();
      return mt.startsWith("video/") || mt.includes("mpegurl");
    };
    const videoItemsInOrder = computed(() => {
      const items = getEffectiveDirectoryItems();
      return items.filter(isVideoItem).slice().sort((a, b) => String(a?.name || "").localeCompare(String(b?.name || ""), void 0, { numeric: true, sensitivity: "base" }));
    });
    const isCurrentVideo = (item) => {
      return props.file?.path && item.path === props.file.path || props.file?.name && item.name === props.file.name;
    };
    const getVideoIndex = (item) => {
      return videoItemsInOrder.value.indexOf(item);
    };
    const prevVideoItem = computed(() => {
      const all = videoItemsInOrder.value;
      const idx = all.findIndex(isCurrentVideo);
      if (idx <= 0) return null;
      return all[idx - 1];
    });
    const nextVideoItem = computed(() => {
      const all = videoItemsInOrder.value;
      const idx = all.findIndex(isCurrentVideo);
      if (idx < 0 || idx >= all.length - 1) return null;
      return all[idx + 1];
    });
    const goToVideoItem = (it) => {
      if (!it) return;
      const path = String(it.path || "");
      if (!path) return;
      if (typeof navigateToFile === "function") {
        try {
          void navigateToFile(path);
          windowScrollY.value = 0;
        } catch (e) {
          log2.error(e);
        }
      }
    };
    const playerControls = computed(() => {
      const controls = [];
      if (prevVideoItem.value) {
        controls.push({
          name: "prev-video",
          index: 10,
          position: "left",
          html: controlSvgPrev,
          tooltip: t("mount.videoPreview.prevVideo"),
          click: () => goToVideoItem(prevVideoItem.value)
        });
      }
      if (nextVideoItem.value) {
        controls.push({
          name: "next-video",
          index: 11,
          position: "left",
          html: controlSvgNext,
          tooltip: t("mount.videoPreview.nextVideo"),
          click: () => goToVideoItem(nextVideoItem.value)
        });
      }
      controls.push({
        name: "fullscreen-custom",
        index: 100,
        // 放在最右侧
        position: "right",
        html: props.isFullscreen ? controlSvgFullscreenExit : controlSvgFullscreen,
        tooltip: props.isFullscreen ? "Exit Fullscreen" : "Fullscreen",
        click: () => emit("toggle-fullscreen")
      });
      return controls;
    });
    const getExtLower = (name) => {
      const n = String(name || "");
      const idx = n.lastIndexOf(".");
      return idx < 0 ? "" : n.slice(idx + 1).toLowerCase();
    };
    const stripExt = (name) => {
      const n = String(name || "");
      const idx = n.lastIndexOf(".");
      return idx < 0 ? n : n.slice(0, idx);
    };
    const normalizeDirPath = (p) => {
      const raw = String(p || "").trim();
      if (!raw) return "/";
      const withLeading = raw.startsWith("/") ? raw : `/${raw}`;
      return withLeading.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";
    };
    const resolveItemPath = (item, dirPath) => {
      if (item && item.path) return String(item.path);
      const name = String(item?.name || "");
      if (!name) return "";
      return `${dirPath}/${name}`.replace(/\/{2,}/g, "/");
    };
    const SUPPORTED_SUBTITLE_EXTS = /* @__PURE__ */ new Set(["srt", "vtt", "ass"]);
    const loadSubtitleTracksForCurrentVideo = async () => {
      const file = props.file;
      if (!file?.name) return [];
      const dirPath = getEffectiveDirPath();
      let items = getEffectiveDirectoryItems();
      if (!items.length) {
        await ensureDirectoryItemsLoaded({ refresh: false });
        items = getEffectiveDirectoryItems();
      }
      const videoBase = stripExt(file.name).toLowerCase();
      const subtitleItems = items.filter((it) => {
        if (!it || it.isDirectory) return false;
        return SUPPORTED_SUBTITLE_EXTS.has(getExtLower(it.name));
      });
      if (!subtitleItems.length) return [];
      subtitleItems.sort((a, b) => String(a?.name || "").localeCompare(String(b?.name || "")));
      const tracks = [];
      for (const it of subtitleItems) {
        const path = resolveItemPath(it, dirPath);
        if (!path) continue;
        try {
          const url = await fsService.getFileLink(path, null, false);
          const ext = getExtLower(it.name);
          tracks.push({
            name: it.name,
            path,
            url,
            type: ext || "srt",
            default: stripExt(it.name).toLowerCase() === videoBase
          });
        } catch {
        }
      }
      return tracks;
    };
    const checkIfHLSVideo = (file) => file?.name?.toLowerCase().endsWith(".m3u8");
    const createHlsUrlTransform = () => {
      const dirPrefix = `${getEffectiveDirPath()}/`.replace(/\/{2,}/g, "/");
      const cache = /* @__PURE__ */ new Map();
      const CACHE_TTL = 12e4;
      return async (reqUrl) => {
        if (/^https?:\/\//i.test(reqUrl) || reqUrl.startsWith("data:")) return reqUrl;
        const k = reqUrl.split("?")[0].split("#")[0].trim();
        if (!k || k.split("/").includes("..")) return reqUrl;
        let storagePath = k.startsWith("/") ? k : `${dirPrefix}${k}`;
        storagePath = storagePath.replace(/\/{2,}/g, "/");
        const now = Date.now();
        const cached = cache.get(storagePath);
        if (cached && now - cached.at < CACHE_TTL) return cached.url;
        try {
          const url = await fsService.getFileLink(storagePath, null, false);
          if (url) {
            cache.set(storagePath, { url, at: now });
            if (cache.size > 200) cache.delete(cache.keys().next().value);
            return url;
          }
        } catch {
        }
        return reqUrl;
      };
    };
    const generateDefaultPoster = (name) => {
      const firstChar = (name || "V")[0].toUpperCase();
      const canvas = document.createElement("canvas");
      canvas.width = 320;
      canvas.height = 180;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = props.darkMode ? "#111827" : "#e5e7eb";
      ctx.fillRect(0, 0, 320, 180);
      ctx.fillStyle = props.darkMode ? "#3b82f6" : "#60a5fa";
      ctx.beginPath();
      ctx.arc(160, 90, 30, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.moveTo(150, 75);
      ctx.lineTo(150, 105);
      ctx.lineTo(175, 90);
      ctx.closePath();
      ctx.fill();
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(firstChar, 160, 140);
      return canvas.toDataURL();
    };
    const initializeCurrentVideo = async () => {
      if (!props.file) return;
      isHLSVideo.value = checkIfHLSVideo(props.file);
      if (isHLSVideo.value) isPreparingHls.value = true;
      const baseData = {
        name: props.file.name || "unknown",
        title: props.file.name || "unknown",
        poster: generateDefaultPoster(props.file.name),
        contentType: props.file.contentType,
        originalFile: props.file,
        isHLS: isHLSVideo.value,
        hlsUrlTransform: isHLSVideo.value ? createHlsUrlTransform() : null,
        subtitleTracks: []
      };
      if (props.videoUrl) {
        currentVideoData.value = { ...baseData, url: props.videoUrl };
        isPreparingHls.value = false;
        const currentName = props.file.name;
        loadSubtitleTracksForCurrentVideo().then((tracks) => {
          if (!tracks?.length || currentVideoData.value?.name !== currentName) return;
          currentVideoData.value.subtitleTracks = tracks;
        });
      } else {
        currentVideoData.value = { ...baseData, url: null };
        isPreparingHls.value = false;
      }
    };
    watch(
      () => [props.currentPath, props.file?.path, Array.isArray(props.directoryItems) ? props.directoryItems.length : 0],
      async () => {
        await ensureDirectoryItemsLoaded({ refresh: false });
      },
      { immediate: true }
    );
    watch(
      () => props.videoUrl,
      async (val) => {
        if (!val || !props.file) return;
        await ensureDirectoryItemsLoaded({ refresh: false });
        await initializeCurrentVideo();
      },
      { immediate: true }
    );
    onMounted(() => {
      originalTitle.value = document.title;
    });
    onBeforeUnmount(() => {
      if (originalTitle.value) document.title = originalTitle.value;
    });
    const handleKeydown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      const player = videoPlayerRef.value?.getInstance();
      if (!player) return;
      switch (e.code) {
        case "Space":
          e.preventDefault();
          player.toggle();
          break;
        case "ArrowLeft":
          e.preventDefault();
          player.seek = Math.max(0, player.currentTime - 10);
          break;
        case "ArrowRight":
          e.preventDefault();
          player.seek = Math.min(player.duration, player.currentTime + 10);
          break;
        case "ArrowUp":
          e.preventDefault();
          player.volume = Math.min(1, player.volume + 0.1);
          break;
        case "ArrowDown":
          e.preventDefault();
          player.volume = Math.max(0, player.volume - 0.1);
          break;
        case "KeyF":
          e.preventDefault();
          player.fullscreen = !player.fullscreen;
          break;
      }
    };
    useEventListener(document, "keydown", handleKeydown);
    const handlePlay = (d) => {
      isPlaying.value = true;
      document.title = `${d?.video?.name || props.file?.name}`;
      emit("play", d);
    };
    const handlePause = (d) => {
      isPlaying.value = false;
      document.title = props.file?.name || originalTitle.value;
      emit("pause", d);
    };
    const handleVideoEnded = () => {
      isPlaying.value = false;
      document.title = props.file?.name || originalTitle.value;
    };
    const handleError = (e) => emit("error", e);
    const handleCanPlay = () => {
      emit("canplay");
      emit("loaded");
    };
    const handleTimeUpdate = (d) => {
      currentTime.value = d.currentTime;
      duration.value = d.duration;
    };
    const handleFullscreen = () => emit("fullscreen");
    const handleFullscreenExit = () => emit("fullscreenExit");
    const handlePlayerReady = () => {
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "previewContainerRef",
        ref: previewContainerRef,
        class: "video-preview-wrapper relative flex flex-col w-full h-full group"
      }, [
        createBaseVNode("div", _hoisted_1$8, [
          createBaseVNode("div", _hoisted_2$7, [
            __props.videoUrl && videoData.value ? (openBlock(), createBlock(VideoPlayer, {
              key: 0,
              ref_key: "videoPlayerRef",
              ref: videoPlayerRef,
              video: videoData.value,
              "dark-mode": __props.darkMode,
              "is-fullscreen": __props.isFullscreen,
              autoplay: false,
              volume: 0.7,
              muted: false,
              loop: false,
              "show-fullscreen-control": false,
              "custom-controls": playerControls.value,
              class: "w-full h-full",
              onPlay: handlePlay,
              onPause: handlePause,
              onError: handleError,
              onCanplay: handleCanPlay,
              onEnded: handleVideoEnded,
              onTimeupdate: handleTimeUpdate,
              onFullscreen: handleFullscreen,
              onFullscreenExit: handleFullscreenExit,
              onReady: handlePlayerReady
            }, null, 8, ["video", "dark-mode", "is-fullscreen", "custom-controls"])) : (openBlock(), createElementBlock("div", _hoisted_3$6, [
              createVNode(_sfc_main$c, {
                text: _ctx.$t("mount.videoPreview.loadingVideo"),
                "dark-mode": __props.darkMode,
                size: "2xl",
                "icon-class": __props.darkMode ? "text-primary-500" : "text-primary-600"
              }, null, 8, ["text", "dark-mode", "icon-class"])
            ])),
            createVNode(Transition, { name: "slide-fade" }, {
              default: withCtx(() => [
                withDirectives(createBaseVNode("div", _hoisted_4$6, [
                  createBaseVNode("div", _hoisted_5$6, [
                    createBaseVNode("h3", _hoisted_6$6, toDisplayString(_ctx.$t("mount.videoPreview.playlist")) + " (" + toDisplayString(videoItemsInOrder.value.length) + ") ", 1),
                    createBaseVNode("button", {
                      onClick: _cache[0] || (_cache[0] = ($event) => isPlaylistOpen.value = false),
                      class: "p-1.5 rounded-full hover:bg-gray-200/50 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                    }, _cache[2] || (_cache[2] = [
                      createBaseVNode("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "w-4 h-4",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      }, [
                        createBaseVNode("path", { d: "M18 6 6 18" }),
                        createBaseVNode("path", { d: "m6 6 12 12" })
                      ], -1)
                    ]))
                  ]),
                  createBaseVNode("div", _hoisted_7$5, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(videoItemsInOrder.value, (item) => {
                      return openBlock(), createElementBlock("div", {
                        key: item.path,
                        onClick: ($event) => goToVideoItem(item),
                        class: normalizeClass(["group/item flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border border-transparent", [
                          isCurrentVideo(item) ? "bg-primary-500/20 border-primary-500/30 text-primary-600 dark:text-primary-400" : "hover:bg-gray-200/50 dark:hover:bg-white/5 hover:border-gray-300/50 dark:hover:border-white/10 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                        ]])
                      }, [
                        createBaseVNode("div", _hoisted_9$3, [
                          isCurrentVideo(item) && isPlaying.value ? (openBlock(), createElementBlock("div", _hoisted_10$3, _cache[3] || (_cache[3] = [
                            createBaseVNode("span", { class: "bar" }, null, -1),
                            createBaseVNode("span", { class: "bar" }, null, -1),
                            createBaseVNode("span", { class: "bar" }, null, -1)
                          ]))) : isCurrentVideo(item) ? (openBlock(), createElementBlock("svg", _hoisted_11$3, _cache[4] || (_cache[4] = [
                            createBaseVNode("path", { d: "M8 5v14l11-7z" }, null, -1)
                          ]))) : (openBlock(), createElementBlock("span", _hoisted_12$3, toDisplayString(getVideoIndex(item) + 1), 1))
                        ]),
                        createBaseVNode("span", _hoisted_13$2, toDisplayString(item.name), 1)
                      ], 10, _hoisted_8$4);
                    }), 128))
                  ])
                ], 512), [
                  [vShow, isPlaylistOpen.value]
                ])
              ]),
              _: 1
            }),
            withDirectives(createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = ($event) => isPlaylistOpen.value = true),
              class: "absolute right-3 top-3 flex items-center gap-1.5 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-lg transition-all duration-200 z-10 border border-white/10 hover:border-white/20 shadow-lg opacity-70 hover:opacity-100",
              title: _ctx.$t("mount.videoPreview.showPlaylist")
            }, [
              _cache[5] || (_cache[5] = createStaticVNode('<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-612c2ffb><line x1="8" y1="6" x2="21" y2="6" data-v-612c2ffb></line><line x1="8" y1="12" x2="21" y2="12" data-v-612c2ffb></line><line x1="8" y1="18" x2="21" y2="18" data-v-612c2ffb></line><line x1="3" y1="6" x2="3.01" y2="6" data-v-612c2ffb></line><line x1="3" y1="12" x2="3.01" y2="12" data-v-612c2ffb></line><line x1="3" y1="18" x2="3.01" y2="18" data-v-612c2ffb></line></svg>', 1)),
              createBaseVNode("span", _hoisted_15$2, toDisplayString(videoItemsInOrder.value.length), 1)
            ], 8, _hoisted_14$2), [
              [vShow, !isPlaylistOpen.value && videoItemsInOrder.value.length > 1]
            ])
          ])
        ])
      ], 512);
    };
  }
};
const VideoPreview = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-612c2ffb"]]);
const _hoisted_1$7 = { class: "text-preview-wrapper" };
const _hoisted_2$6 = {
  key: 1,
  class: "loading-indicator"
};
const _sfc_main$8 = {
  __name: "TextPreview",
  props: {
    // 文件信息
    file: {
      type: Object,
      required: true
    },
    // 文本URL
    textUrl: {
      type: String,
      default: null
    },
    // 是否为深色模式
    darkMode: {
      type: Boolean,
      default: false
    },
    // 是否为管理员
    isAdmin: {
      type: Boolean,
      default: false
    },
    // 当前目录路径
    currentPath: {
      type: String,
      default: ""
    },
    // 目录项目列表
    directoryItems: {
      type: Array,
      default: () => []
    },
    // 初始预览模式
    initialMode: {
      type: String,
      default: "text"
    },
    // 初始编码
    initialEncoding: {
      type: String,
      default: "utf-8"
    },
    // 最大高度
    maxHeight: {
      type: [Number, String],
      default: 600
    }
  },
  emits: ["load", "error", "encoding-change", "save"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const log2 = createLogger("FsTextPreview");
    const props = __props;
    const emit = __emit;
    const currentMode = ref(props.initialMode);
    const currentEncoding = ref(props.initialEncoding);
    const currentFileData = ref(null);
    const {
      textContent,
      detectedLanguage,
      loadTextContent: loadText,
      handleEncodingChange: changeEncoding
    } = useTextPreview({
      checkCancelled: true,
      emitEncodingChange: true
    });
    const pathPassword = usePathPassword();
    const fileData = computed(() => currentFileData.value);
    const handleEncodingChange = async (newEncoding) => {
      currentEncoding.value = newEncoding;
      await changeEncoding(newEncoding, emit);
    };
    const handleContentChange = (newContent) => {
      textContent.value = newContent;
    };
    const handleSave = (content) => {
      emit("save", {
        content,
        filename: currentFileData.value?.name,
        path: currentFileData.value?.path
      });
    };
    const loadTextContent = async () => {
      if (!currentFileData.value) {
        log2.warn("没有可用的文件数据");
        return;
      }
      const result = await loadText(currentFileData.value, emit);
      if (result.success) {
        currentEncoding.value = result.result.encoding || "utf-8";
      }
    };
    const initializeCurrentFile = async () => {
      if (!props.file) {
        return;
      }
      const fsPath = props.file.path || props.currentPath || "/";
      let baseContentUrl = `/api/fs/content?path=${encodeURIComponent(fsPath)}`;
      if (!props.isAdmin) {
        const token = pathPassword.getPathToken(fsPath);
        if (token) {
          baseContentUrl += `&path_token=${encodeURIComponent(token)}`;
        }
      }
      const safeTextUrl = (() => {
        if (!props.textUrl) return null;
        try {
          const resolved = new URL(props.textUrl, window.location.href);
          if (resolved.origin === window.location.origin) {
            return props.textUrl;
          }
          const linkType = (props.file?.linkType || "").toLowerCase();
          if (linkType === "proxy") {
            return props.textUrl;
          }
          return null;
        } catch {
          return null;
        }
      })();
      const previewUrl = safeTextUrl || baseContentUrl;
      if (previewUrl) {
        currentFileData.value = {
          name: props.file.name || "unknown",
          filename: props.file.name || "unknown",
          previewUrl,
          contentUrl: baseContentUrl,
          path: fsPath,
          contentType: props.file.contentType,
          size: props.file.size,
          modified: props.file.modified,
          originalFile: props.file
        };
        await loadTextContent();
      } else {
        log2.error("❌ 没有可用的文本内容 URL");
      }
    };
    watch(
      () => props.file,
      () => {
        initializeCurrentFile();
      },
      { immediate: true }
    );
    watch(
      () => props.textUrl,
      () => {
        initializeCurrentFile();
      }
    );
    watch(
      () => props.initialMode,
      (newMode) => {
        currentMode.value = newMode;
      }
    );
    watch(
      () => props.initialEncoding,
      (newEncoding) => {
        currentEncoding.value = newEncoding;
      }
    );
    __expose({
      // 切换预览模式
      switchMode: (mode) => {
        currentMode.value = mode;
      },
      // 切换编码
      switchEncoding: async (encoding) => {
        await handleEncodingChange(encoding);
      },
      // 获取当前状态
      getCurrentState: () => ({
        mode: currentMode.value,
        encoding: currentEncoding.value,
        file: currentFileData.value
      }),
      // 获取编辑器内容
      getValue: () => {
        return textContent.value;
      },
      // 设置编辑器内容
      setValue: (content) => {
        textContent.value = content;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        unref(textContent) ? (openBlock(), createBlock(TextRenderer, {
          key: 0,
          content: unref(textContent),
          mode: currentMode.value,
          language: unref(detectedLanguage),
          filename: fileData.value?.name || "",
          "dark-mode": __props.darkMode,
          "show-line-numbers": true,
          "read-only": currentMode.value !== "edit",
          "show-stats": true,
          "max-height": __props.maxHeight,
          onContentChange: handleContentChange,
          onSave: handleSave
        }, null, 8, ["content", "mode", "language", "filename", "dark-mode", "read-only", "max-height"])) : (openBlock(), createElementBlock("div", _hoisted_2$6, [
          createVNode(_sfc_main$c, {
            text: _ctx.$t("mount.textPreview.loadingText"),
            "dark-mode": __props.darkMode,
            size: "xl",
            "icon-class": __props.darkMode ? "text-primary-500" : "text-primary-600"
          }, null, 8, ["text", "dark-mode", "icon-class"])
        ]))
      ]);
    };
  }
};
const TextPreview = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-7da26b67"]]);
const _hoisted_1$6 = { class: "archive-password-container p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg" };
const _hoisted_2$5 = { class: "text-center mb-6" };
const _hoisted_3$5 = { class: "mx-auto w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mb-4" };
const _hoisted_4$5 = { class: "relative" };
const _hoisted_5$5 = ["type", "disabled"];
const _hoisted_6$5 = ["disabled"];
const _hoisted_7$4 = {
  key: 0,
  class: "mt-2 text-sm text-red-600 dark:text-red-400"
};
const _hoisted_8$3 = { class: "flex space-x-3 pt-4" };
const _hoisted_9$2 = ["disabled"];
const _hoisted_10$2 = { key: 0 };
const _hoisted_11$2 = {
  key: 1,
  class: "flex items-center justify-center"
};
const _hoisted_12$2 = ["disabled"];
const _sfc_main$7 = {
  __name: "ArchivePasswordInput",
  props: {
    darkMode: {
      type: Boolean,
      default: false
    },
    passwordError: {
      type: String,
      default: ""
    },
    isValidating: {
      type: Boolean,
      default: false
    }
  },
  emits: ["submit", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const passwordInput = ref("");
    const showPassword = ref(false);
    const passwordInputRef = ref(null);
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
    const handleSubmit = () => {
      if (passwordInput.value && !props.isValidating) {
        emit("submit", passwordInput.value);
      }
    };
    const handleCancel = () => {
      emit("cancel");
    };
    onMounted(async () => {
      await nextTick();
      if (passwordInputRef.value) {
        passwordInputRef.value.focus();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createBaseVNode("div", _hoisted_2$5, [
          createBaseVNode("div", _hoisted_3$5, [
            createVNode(unref(IconLockClosed), {
              size: "xl",
              class: "text-yellow-600 dark:text-yellow-400",
              "aria-hidden": "true"
            })
          ]),
          createBaseVNode("h3", {
            class: normalizeClass(["text-lg font-semibold mb-2", __props.darkMode ? "text-gray-200" : "text-gray-800"])
          }, "压缩文件已加密", 2),
          createBaseVNode("p", {
            class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-400" : "text-gray-600"])
          }, "请输入密码以解压文件内容", 2)
        ]),
        createBaseVNode("form", {
          onSubmit: withModifiers(handleSubmit, ["prevent"]),
          class: "space-y-4"
        }, [
          createBaseVNode("div", null, [
            createBaseVNode("label", {
              for: "archive-password",
              class: normalizeClass(["block text-sm font-medium mb-2", __props.darkMode ? "text-gray-300" : "text-gray-700"])
            }, " 密码 ", 2),
            createBaseVNode("div", _hoisted_4$5, [
              withDirectives(createBaseVNode("input", {
                type: showPassword.value ? "text" : "password",
                id: "archive-password",
                autocomplete: "current-password",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => passwordInput.value = $event),
                placeholder: "请输入解压密码",
                class: normalizeClass(["block w-full px-3 py-2 pr-10 rounded-md shadow-sm border focus:ring-2 focus:ring-primary-500 focus:border-primary-500", [
                  __props.darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-offset-gray-800" : "border-gray-300 text-gray-900 focus:ring-offset-white",
                  __props.passwordError ? "border-red-500" : ""
                ]]),
                disabled: __props.isValidating,
                ref_key: "passwordInputRef",
                ref: passwordInputRef
              }, null, 10, _hoisted_5$5), [
                [vModelDynamic, passwordInput.value]
              ]),
              createBaseVNode("button", {
                type: "button",
                onClick: togglePasswordVisibility,
                class: "absolute inset-y-0 right-0 pr-3 flex items-center",
                disabled: __props.isValidating
              }, [
                !showPassword.value ? (openBlock(), createBlock(unref(IconEye), {
                  key: 0,
                  class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500"),
                  "aria-hidden": "true"
                }, null, 8, ["class"])) : (openBlock(), createBlock(unref(IconEyeOff), {
                  key: 1,
                  class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500"),
                  "aria-hidden": "true"
                }, null, 8, ["class"]))
              ], 8, _hoisted_6$5)
            ]),
            __props.passwordError ? (openBlock(), createElementBlock("div", _hoisted_7$4, toDisplayString(__props.passwordError), 1)) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_8$3, [
            createBaseVNode("button", {
              type: "submit",
              disabled: !passwordInput.value || __props.isValidating,
              class: normalizeClass(["flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2", __props.darkMode ? "focus:ring-offset-gray-800" : "focus:ring-offset-white"])
            }, [
              !__props.isValidating ? (openBlock(), createElementBlock("span", _hoisted_10$2, "确认")) : (openBlock(), createElementBlock("span", _hoisted_11$2, [
                createVNode(unref(IconRefresh), {
                  size: "sm",
                  class: "animate-spin -ml-1 mr-2 text-white",
                  "aria-hidden": "true"
                }),
                _cache[1] || (_cache[1] = createTextVNode(" 验证中... ", -1))
              ]))
            ], 10, _hoisted_9$2),
            createBaseVNode("button", {
              type: "button",
              onClick: handleCancel,
              disabled: __props.isValidating,
              class: normalizeClass(["px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors", [__props.darkMode ? "text-gray-300 hover:bg-gray-700 focus:ring-offset-gray-800" : "text-gray-700 hover:bg-gray-50 focus:ring-offset-white"]])
            }, " 取消 ", 10, _hoisted_12$2)
          ])
        ], 32)
      ]);
    };
  }
};
const ArchivePasswordInput = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-bac4c7a4"]]);
const _hoisted_1$5 = { class: "archive-preview-container" };
const _hoisted_2$4 = {
  key: 0,
  class: "archive-info flex items-center justify-center min-h-[400px]"
};
const _hoisted_3$4 = {
  key: 1,
  class: "file-info-content text-center"
};
const _hoisted_4$4 = { class: "flex justify-center mb-6" };
const _hoisted_5$4 = ["innerHTML"];
const _hoisted_6$4 = ["disabled"];
const _hoisted_7$3 = { class: "flex items-center justify-center" };
const _hoisted_8$2 = { class: "flex items-center justify-center" };
const _hoisted_9$1 = {
  key: 1,
  class: "archive-content"
};
const _hoisted_10$1 = { class: "flex items-center justify-between" };
const _hoisted_11$1 = { class: "flex items-center space-x-3" };
const _hoisted_12$1 = { class: "flex-shrink-0" };
const _hoisted_13$1 = ["innerHTML"];
const _hoisted_14$1 = { class: "min-w-0 flex-1" };
const _hoisted_15$1 = { class: "flex items-center space-x-2" };
const _hoisted_16$1 = { class: "archive-file-list flex-1 overflow-auto" };
const _hoisted_17$1 = {
  key: 0,
  class: "text-center py-12"
};
const _hoisted_18$1 = {
  key: 1,
  class: "min-w-full"
};
const _hoisted_19$1 = ["onClick"];
const _hoisted_20$1 = ["onClick", "title"];
const _hoisted_21$1 = {
  key: 1,
  class: "w-4 h-4 flex-shrink-0"
};
const _hoisted_22$1 = { class: "flex-shrink-0 w-5 sm:w-6 h-5 sm:h-6" };
const _hoisted_23$1 = ["innerHTML"];
const _hoisted_24$1 = { class: "flex-grow truncate" };
const _hoisted_25$1 = {
  key: 0,
  class: "flex-shrink-0"
};
const _hoisted_26$1 = ["title"];
const _hoisted_27$1 = { key: 0 };
const _hoisted_28$1 = { key: 1 };
const _hoisted_29$1 = ["title"];
const _hoisted_30$1 = { class: "min-w-[80px] sm:min-w-32 text-center" };
const _hoisted_31$1 = { class: "flex justify-end sm:justify-center space-x-0.5 sm:space-x-1" };
const _hoisted_32$1 = ["onClick"];
const _hoisted_33$1 = ["onClick"];
const _sfc_main$6 = {
  __name: "ArchivePreview",
  props: {
    file: {
      type: Object,
      required: true
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    authenticatedPreviewUrl: {
      type: String,
      default: ""
    }
  },
  emits: ["download", "loaded", "error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const log2 = createLogger("ArchivePreview");
    const { isExtracting, extractError, archiveEntries, isExtracted, extractProgress, currentStage, totalSize, extractArchive, previewFile, downloadFile, resetState } = useArchivePreview();
    const selectedEntry = ref(null);
    const expandedFolders = ref(/* @__PURE__ */ new Set());
    const isPasswordRequired = ref(false);
    const passwordError = ref("");
    const isValidatingPassword = ref(false);
    const archiveInfo = computed(() => {
      return getArchiveType(props.file.name);
    });
    const fileIcon = computed(() => {
      if (!props.file) return "";
      return getFileIcon(props.file, props.darkMode);
    });
    const treeStructure = computed(() => {
      if (!archiveEntries.value || !archiveEntries.value.length) return [];
      const tree = [];
      const pathMap = /* @__PURE__ */ new Map();
      pathMap.set("", { children: tree });
      const sortedEntries = [...archiveEntries.value].sort((a, b) => {
        const depthA = a.name.split("/").length;
        const depthB = b.name.split("/").length;
        return depthA - depthB;
      });
      sortedEntries.forEach((entry) => {
        if (!entry || !entry.name) return;
        const pathParts = entry.name.split("/").filter((part) => part);
        if (pathParts.length === 0) return;
        const fileName = pathParts[pathParts.length - 1];
        const parentPath = pathParts.slice(0, -1).join("/");
        if (!fileName) return;
        if (parentPath && !pathMap.has(parentPath)) {
          const parentParts = parentPath.split("/");
          let currentPath = "";
          parentParts.forEach((part) => {
            const prevPath = currentPath;
            currentPath = currentPath ? `${currentPath}/${part}` : part;
            if (!pathMap.has(currentPath)) {
              const parentContainer = pathMap.get(prevPath);
              const folderNode = {
                name: part,
                path: currentPath,
                fullPath: `${currentPath}/`,
                isDirectory: true,
                size: 0,
                children: [],
                entry: null,
                isVirtual: true
                // 标记为虚拟节点
              };
              parentContainer.children.push(folderNode);
              pathMap.set(currentPath, folderNode);
            }
          });
        }
        const parent = pathMap.get(parentPath);
        const node = {
          name: fileName,
          path: entry.name,
          fullPath: entry.name,
          isDirectory: entry.isDirectory,
          size: entry.size || 0,
          lastModDate: entry.lastModDate,
          entry: entry.entry,
          children: entry.isDirectory ? [] : void 0,
          isVirtual: false
          // 标记为真实节点
        };
        if (entry.isDirectory) {
          const normalizedPath = entry.name.replace(/\/$/, "");
          const existingNode = pathMap.get(normalizedPath);
          if (existingNode && existingNode.isVirtual) {
            node.children = existingNode.children;
            const index = parent.children.findIndex((child) => child.path.replace(/\/$/, "") === normalizedPath);
            if (index !== -1) {
              parent.children.splice(index, 1);
            }
          }
          pathMap.set(normalizedPath, node);
        }
        parent.children.push(node);
      });
      return tree;
    });
    const validateEntry = (entry) => {
      if (entry.isDirectory) {
        return { valid: false, reason: "directory" };
      }
      if (entry.isVirtual || !entry.entry) {
        return { valid: false, reason: "virtual" };
      }
      return { valid: true };
    };
    const createOriginalEntry = (entry) => ({
      name: entry.fullPath,
      isDirectory: entry.isDirectory,
      size: entry.size,
      entry: entry.entry
    });
    const resetPasswordState = () => {
      isPasswordRequired.value = false;
      passwordError.value = "";
      isValidatingPassword.value = false;
    };
    const handleExtractArchive = async () => {
      if (!archiveInfo.value.supported) return;
      if (!props.authenticatedPreviewUrl) {
        log2.error("预览URL无效，无法进行解压操作");
        return;
      }
      await attemptExtraction(null);
    };
    const attemptExtraction = async (password) => {
      try {
        await extractArchive(props.authenticatedPreviewUrl, props.file.name, password);
        resetPasswordState();
        await nextTick();
        expandedFolders.value.clear();
        if (archiveEntries.value && Array.isArray(archiveEntries.value)) {
          archiveEntries.value.forEach((node) => {
            if (node && node.isDirectory && node.path) {
              expandedFolders.value.add(node.path.replace(/\/$/, ""));
            }
          });
        }
        emit("loaded");
      } catch (error) {
        log2.error("解压失败:", error);
        if (error.message && error.message.includes("ENCRYPTED_ARCHIVE_DETECTED")) {
          isPasswordRequired.value = true;
          passwordError.value = "";
          isValidatingPassword.value = false;
        } else if (error.message && error.message.includes("INVALID_ARCHIVE_PASSWORD")) {
          isPasswordRequired.value = true;
          passwordError.value = "密码错误，请重新输入";
          isValidatingPassword.value = false;
        } else {
          emit("error", error);
        }
      }
    };
    const handlePasswordSubmit = async (inputPassword) => {
      resetPasswordState();
      await attemptExtraction(inputPassword);
    };
    const handlePasswordCancel = () => {
      resetPasswordState();
    };
    const handleBackToInfo = () => {
      resetState();
      expandedFolders.value.clear();
      selectedEntry.value = null;
      resetPasswordState();
    };
    const handleRowClick = (entry) => {
      if (entry.isDirectory) {
        toggleFolder(entry.path.replace(/\/$/, ""));
      } else {
        selectedEntry.value = entry;
      }
    };
    const handlePreviewFile = async (entry) => {
      const validation = validateEntry(entry);
      if (!validation.valid) {
        if (validation.reason === "directory") {
          toggleFolder(entry.path.replace(/\/$/, ""));
          return;
        }
        if (validation.reason === "virtual") {
          log2.warn("无法预览虚拟节点:", entry.name);
          return;
        }
      }
      const originalEntry = createOriginalEntry(entry);
      await previewFile(originalEntry);
    };
    const handleDownloadFile = async (entry) => {
      const validation = validateEntry(entry);
      if (!validation.valid) {
        if (validation.reason === "directory") {
          log2.warn("无法下载目录:", entry.name);
          return;
        }
        if (validation.reason === "virtual") {
          log2.warn("无法下载虚拟节点:", entry.name);
          return;
        }
      }
      const originalEntry = createOriginalEntry(entry);
      await downloadFile(originalEntry);
    };
    const handleDownload = () => {
      emit("download");
    };
    const toggleFolder = (folderPath) => {
      if (expandedFolders.value.has(folderPath)) {
        expandedFolders.value.delete(folderPath);
      } else {
        expandedFolders.value.add(folderPath);
      }
    };
    const isFolderExpanded = (folderPath) => {
      return expandedFolders.value.has(folderPath);
    };
    const renderTreeNode = (node, level = 0) => {
      return {
        ...node,
        level,
        isExpanded: node.isDirectory ? isFolderExpanded(node.path.replace(/\/$/, "")) : false
      };
    };
    const getVisibleTreeNodes = (nodes, level = 0) => {
      if (!nodes || !Array.isArray(nodes)) return [];
      const result = [];
      const sortedNodes = [...nodes].sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name, void 0, { numeric: true, sensitivity: "base" });
      });
      sortedNodes.forEach((node) => {
        if (!node) return;
        const nodeWithCount = {
          ...renderTreeNode(node, level),
          fileCount: node.isDirectory ? getDirectoryFileCount(node) : 0
        };
        result.push(nodeWithCount);
        if (node.isDirectory && node.children && Array.isArray(node.children) && isFolderExpanded(node.path.replace(/\/$/, ""))) {
          result.push(...getVisibleTreeNodes(node.children, level + 1));
        }
      });
      return result;
    };
    const getDirectoryFileCount = (directory) => {
      if (!directory || !directory.children || !Array.isArray(directory.children)) {
        return 0;
      }
      let count = 0;
      directory.children.forEach((child) => {
        if (child.isDirectory) {
          count += getDirectoryFileCount(child);
        } else {
          count += 1;
        }
      });
      return count;
    };
    const visibleFileList = computed(() => {
      return getVisibleTreeNodes(treeStructure.value);
    });
    const getFileIconSvg = (entry) => {
      if (!entry) return "";
      const mockFile = createMockFileObject(entry);
      return getFileIcon(mockFile, props.darkMode);
    };
    onBeforeUnmount(() => {
      resetState();
      if (props.authenticatedPreviewUrl) {
        const { archiveService: archiveService2 } = useArchivePreview();
        archiveService2.clearFileBlobCache(props.authenticatedPreviewUrl);
        archiveService2.clearFileCache(props.authenticatedPreviewUrl, props.file.name);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        !unref(isExtracted) ? (openBlock(), createElementBlock("div", _hoisted_2$4, [
          isPasswordRequired.value ? (openBlock(), createBlock(ArchivePasswordInput, {
            key: 0,
            "dark-mode": __props.darkMode,
            "password-error": passwordError.value,
            "is-validating": isValidatingPassword.value,
            onSubmit: handlePasswordSubmit,
            onCancel: handlePasswordCancel
          }, null, 8, ["dark-mode", "password-error", "is-validating"])) : (openBlock(), createElementBlock("div", _hoisted_3$4, [
            createBaseVNode("div", _hoisted_4$4, [
              createBaseVNode("div", {
                innerHTML: fileIcon.value,
                class: "w-16 h-16"
              }, null, 8, _hoisted_5$4)
            ]),
            createBaseVNode("h3", {
              class: normalizeClass(["text-xl font-semibold mb-2", __props.darkMode ? "text-gray-200" : "text-gray-800"])
            }, toDisplayString(__props.file.name), 3),
            createBaseVNode("p", {
              class: normalizeClass(["text-sm mb-1", __props.darkMode ? "text-gray-400" : "text-gray-600"])
            }, toDisplayString(archiveInfo.value.description), 3),
            createBaseVNode("p", {
              class: normalizeClass(["text-sm mb-8", __props.darkMode ? "text-gray-400" : "text-gray-600"])
            }, toDisplayString(unref(formatFileSize)(__props.file.size)), 3),
            archiveInfo.value.supported ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: handleExtractArchive,
              disabled: unref(isExtracting),
              class: normalizeClass(["inline-flex items-center px-8 py-3 rounded-lg font-medium transition-all duration-200", [
                __props.darkMode ? "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-600 disabled:text-gray-400" : "bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400 disabled:text-gray-600",
                unref(isExtracting) ? "cursor-not-allowed" : "cursor-pointer hover:shadow-lg"
              ]])
            }, [
              unref(isExtracting) ? (openBlock(), createBlock(unref(IconRefresh), {
                key: 0,
                class: "animate-spin -ml-1 mr-3",
                "aria-hidden": "true"
              })) : (openBlock(), createBlock(unref(IconArchive), {
                key: 1,
                class: "mr-2",
                "aria-hidden": "true"
              })),
              createTextVNode(" " + toDisplayString(unref(isExtracting) ? `正在${unref(currentStage)}... ${unref(extractProgress).toFixed(1)}%` : "在线解压查看"), 1)
            ], 10, _hoisted_6$4)) : createCommentVNode("", true),
            !archiveInfo.value.supported ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(["mt-6 p-3 rounded-lg", __props.darkMode ? "bg-yellow-900/20 border border-yellow-700" : "bg-yellow-50 border border-yellow-200"])
            }, [
              createBaseVNode("div", _hoisted_7$3, [
                createVNode(unref(IconExclamationSolid), {
                  class: normalizeClass(["mr-2", __props.darkMode ? "text-yellow-400" : "text-yellow-600"]),
                  "aria-hidden": "true"
                }, null, 8, ["class"]),
                createBaseVNode("span", {
                  class: normalizeClass(["text-sm", __props.darkMode ? "text-yellow-200" : "text-yellow-800"])
                }, " 暂不支持 " + toDisplayString(archiveInfo.value.name) + " 格式的在线解压 ", 3)
              ])
            ], 2)) : createCommentVNode("", true),
            unref(extractError) ? (openBlock(), createElementBlock("div", {
              key: 2,
              class: normalizeClass(["mt-6 p-3 rounded-lg", __props.darkMode ? "bg-red-900/20 border border-red-700" : "bg-red-50 border border-red-200"])
            }, [
              createBaseVNode("div", _hoisted_8$2, [
                createVNode(unref(IconXCircle), {
                  class: normalizeClass(["mr-2", __props.darkMode ? "text-red-400" : "text-red-600"]),
                  "aria-hidden": "true"
                }, null, 8, ["class"]),
                createBaseVNode("span", {
                  class: normalizeClass(["text-sm", __props.darkMode ? "text-red-200" : "text-red-800"])
                }, toDisplayString(unref(extractError)), 3)
              ])
            ], 2)) : createCommentVNode("", true)
          ]))
        ])) : (openBlock(), createElementBlock("div", _hoisted_9$1, [
          createBaseVNode("div", {
            class: normalizeClass(["archive-header px-4 py-2 border-b", __props.darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"])
          }, [
            createBaseVNode("div", _hoisted_10$1, [
              createBaseVNode("div", _hoisted_11$1, [
                createBaseVNode("button", {
                  onClick: handleBackToInfo,
                  class: normalizeClass(["p-1.5 rounded-lg transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-600"]),
                  title: "返回文件信息"
                }, [
                  createVNode(unref(IconChevronLeft), {
                    size: "sm",
                    "aria-hidden": "true"
                  })
                ], 2),
                createBaseVNode("div", _hoisted_12$1, [
                  createBaseVNode("div", {
                    innerHTML: fileIcon.value,
                    class: "w-5 h-5"
                  }, null, 8, _hoisted_13$1)
                ]),
                createBaseVNode("div", _hoisted_14$1, [
                  createBaseVNode("h3", {
                    class: normalizeClass(["text-base font-semibold truncate", __props.darkMode ? "text-gray-200" : "text-gray-800"])
                  }, toDisplayString(__props.file.name), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs truncate", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                  }, toDisplayString(unref(archiveEntries).length) + " 个文件，" + toDisplayString(unref(formatFileSize)(unref(totalSize))), 3)
                ])
              ]),
              createBaseVNode("div", _hoisted_15$1, [
                createBaseVNode("button", {
                  onClick: handleDownload,
                  class: normalizeClass(["inline-flex items-center px-2 py-1 text-xs rounded-lg transition-colors", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-100 hover:bg-gray-200 text-gray-700"]),
                  title: "下载原文件"
                }, [
                  createVNode(unref(IconDownload), {
                    size: "xs",
                    class: "mr-1",
                    "aria-hidden": "true"
                  }),
                  _cache[0] || (_cache[0] = createBaseVNode("span", { class: "hidden sm:inline" }, "下载", -1))
                ], 2)
              ])
            ])
          ], 2),
          createBaseVNode("div", _hoisted_16$1, [
            unref(archiveEntries).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_17$1, [
              createVNode(unref(IconDocument), {
                size: "3xl",
                class: normalizeClass(["mx-auto mb-4", __props.darkMode ? "text-gray-500" : "text-gray-400"]),
                "aria-hidden": "true"
              }, null, 8, ["class"]),
              createBaseVNode("p", {
                class: normalizeClass(["text-lg font-medium mb-2", __props.darkMode ? "text-gray-300" : "text-gray-700"])
              }, "压缩文件为空", 2),
              createBaseVNode("p", {
                class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-400" : "text-gray-500"])
              }, "此压缩文件不包含任何内容", 2)
            ])) : (openBlock(), createElementBlock("div", _hoisted_18$1, [
              createBaseVNode("div", {
                class: normalizeClass(["grid items-center py-2 px-3 border-b border-t", [__props.darkMode ? "bg-gray-700/50 border-gray-600" : "bg-gray-100 border-gray-200", "grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto_auto]"]])
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["font-medium pl-16", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, "名称", 2),
                createBaseVNode("div", {
                  class: normalizeClass(["w-24 text-center font-medium hidden sm:block", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, "大小", 2),
                createBaseVNode("div", {
                  class: normalizeClass(["w-32 text-center font-medium hidden sm:block", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, "类型", 2),
                createBaseVNode("div", {
                  class: normalizeClass(["min-w-[80px] sm:min-w-32 text-center font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, "操作", 2)
              ], 2),
              createBaseVNode("div", {
                class: normalizeClass(["divide-y", __props.darkMode ? "divide-gray-700" : "divide-gray-200"])
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(visibleFileList.value, (entry) => {
                  return openBlock(), createElementBlock("div", {
                    key: entry.path,
                    onClick: ($event) => handleRowClick(entry),
                    class: normalizeClass(["grid items-center py-2 px-3 hover:cursor-pointer transition-colors", [
                      __props.darkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-100",
                      "grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto_auto]",
                      selectedEntry.value?.path === entry.path ? __props.darkMode ? "bg-blue-900/20" : "bg-blue-50" : ""
                    ]])
                  }, [
                    createBaseVNode("div", {
                      class: "flex items-center space-x-2 min-w-0",
                      style: normalizeStyle({ paddingLeft: `${entry.level * 16}px` })
                    }, [
                      entry.isDirectory ? (openBlock(), createElementBlock("div", {
                        key: 0,
                        onClick: withModifiers(($event) => toggleFolder(entry.path.replace(/\/$/, "")), ["stop"]),
                        class: normalizeClass(["flex-shrink-0 w-4 h-4 flex items-center justify-center cursor-pointer rounded transition-colors", __props.darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"]),
                        title: isFolderExpanded(entry.path.replace(/\/$/, "")) ? "折叠文件夹" : "展开文件夹"
                      }, [
                        createVNode(unref(IconChevronRight), {
                          size: "xs",
                          class: normalizeClass(["transition-transform duration-200", isFolderExpanded(entry.path.replace(/\/$/, "")) ? "rotate-90" : ""]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ], 10, _hoisted_20$1)) : (openBlock(), createElementBlock("div", _hoisted_21$1)),
                      createBaseVNode("div", _hoisted_22$1, [
                        createBaseVNode("span", {
                          innerHTML: getFileIconSvg(entry)
                        }, null, 8, _hoisted_23$1)
                      ]),
                      createBaseVNode("div", _hoisted_24$1, [
                        createBaseVNode("div", {
                          class: normalizeClass(["font-medium truncate", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                        }, [
                          createTextVNode(toDisplayString(entry.name) + " ", 1),
                          entry.isDirectory && entry.fileCount > 0 ? (openBlock(), createElementBlock("span", {
                            key: 0,
                            class: normalizeClass(["text-xs ml-1 font-normal", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                          }, " (" + toDisplayString(entry.fileCount) + ") ", 3)) : createCommentVNode("", true)
                        ], 2),
                        createBaseVNode("div", {
                          class: normalizeClass(["text-xs block sm:hidden mt-0.5 flex items-center space-x-2", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                        }, [
                          !entry.isDirectory ? (openBlock(), createElementBlock("span", _hoisted_25$1, toDisplayString(typeof entry.size === "number" ? unref(formatFileSize)(entry.size) : "-"), 1)) : createCommentVNode("", true),
                          createBaseVNode("span", {
                            class: "truncate",
                            title: unref(getMimeTypeDescription)(entry)
                          }, toDisplayString(unref(getMimeTypeDescription)(entry)), 9, _hoisted_26$1)
                        ], 2)
                      ])
                    ], 4),
                    createBaseVNode("div", {
                      class: normalizeClass(["w-24 text-center text-sm hidden sm:block", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                    }, [
                      entry.isDirectory ? (openBlock(), createElementBlock("span", _hoisted_27$1, "-")) : (openBlock(), createElementBlock("span", _hoisted_28$1, toDisplayString(typeof entry.size === "number" ? unref(formatFileSize)(entry.size) : "-"), 1))
                    ], 2),
                    createBaseVNode("div", {
                      class: normalizeClass(["w-32 text-center text-sm hidden sm:block", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                    }, [
                      createBaseVNode("span", {
                        class: "block truncate px-1",
                        title: unref(getMimeTypeDescription)(entry)
                      }, toDisplayString(unref(getMimeTypeDescription)(entry)), 9, _hoisted_29$1)
                    ], 2),
                    createBaseVNode("div", _hoisted_30$1, [
                      createBaseVNode("div", _hoisted_31$1, [
                        !entry.isDirectory && unref(canPreviewFile)(entry, true) ? (openBlock(), createElementBlock("button", {
                          key: 0,
                          onClick: withModifiers(($event) => handlePreviewFile(entry), ["stop"]),
                          class: normalizeClass(["p-1.5 sm:p-2 rounded-full transition-colors", __props.darkMode ? "hover:bg-gray-600 text-blue-400 hover:text-blue-300" : "hover:bg-gray-200 text-blue-600 hover:text-blue-700"]),
                          title: "预览文件"
                        }, [
                          createVNode(unref(IconEye), {
                            class: "w-4 h-4 sm:w-5 sm:h-5",
                            "aria-hidden": "true"
                          })
                        ], 10, _hoisted_32$1)) : createCommentVNode("", true),
                        !entry.isDirectory ? (openBlock(), createElementBlock("button", {
                          key: 1,
                          onClick: withModifiers(($event) => handleDownloadFile(entry), ["stop"]),
                          class: normalizeClass(["p-1.5 sm:p-2 rounded-full transition-colors", __props.darkMode ? "hover:bg-gray-600 text-green-400 hover:text-green-300" : "hover:bg-gray-200 text-green-600 hover:text-green-700"]),
                          title: "下载文件"
                        }, [
                          createVNode(unref(IconDownload), {
                            class: "w-4 h-4 sm:w-5 sm:h-5",
                            "aria-hidden": "true"
                          })
                        ], 10, _hoisted_33$1)) : createCommentVNode("", true)
                      ])
                    ])
                  ], 10, _hoisted_19$1);
                }), 128))
              ], 2)
            ]))
          ])
        ]))
      ]);
    };
  }
};
const ArchivePreview = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-f62d7d67"]]);
const _hoisted_1$4 = { class: "pdf-fs-preview-wrapper h-full" };
const _hoisted_2$3 = {
  key: 0,
  class: "pdf-iframe-container h-full relative"
};
const _hoisted_3$3 = ["src"];
const _hoisted_4$3 = {
  key: 0,
  class: "absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-70 flex items-center justify-center"
};
const _hoisted_5$3 = {
  key: 1,
  class: "h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg"
};
const _hoisted_6$3 = { class: "text-center p-4" };
const _hoisted_7$2 = { class: "text-gray-600 dark:text-gray-300 mb-2" };
const _hoisted_8$1 = { class: "text-sm text-gray-500 dark:text-gray-400" };
const _sfc_main$5 = {
  __name: "PdfFsPreview",
  props: {
    // 预览 URL
    previewUrl: {
      type: String,
      default: ""
    },
    // 错误信息
    errorMessage: {
      type: String,
      default: ""
    }
  },
  emits: ["load", "error"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const emit = __emit;
    const loading = ref(true);
    const handleLoad = () => {
      loading.value = false;
      emit("load");
    };
    const handleError = (event) => {
      loading.value = false;
      emit("error", event);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        __props.previewUrl ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
          createBaseVNode("iframe", {
            src: __props.previewUrl,
            frameborder: "0",
            class: "w-full h-full",
            onLoad: handleLoad,
            onError: handleError
          }, null, 40, _hoisted_3$3),
          loading.value ? (openBlock(), createElementBlock("div", _hoisted_4$3, [
            createVNode(_sfc_main$c, {
              text: _ctx.$t("mount.filePreview.pdfLoading") || "加载 PDF 中...",
              size: "xl",
              "icon-class": "text-blue-500 dark:text-blue-400",
              "text-class": "text-blue-600 dark:text-blue-400"
            }, null, 8, ["text"])
          ])) : createCommentVNode("", true)
        ])) : (openBlock(), createElementBlock("div", _hoisted_5$3, [
          createBaseVNode("div", _hoisted_6$3, [
            createVNode(unref(IconDocument), {
              size: "4xl",
              class: "mx-auto mb-4 text-gray-400",
              "aria-hidden": "true"
            }),
            createBaseVNode("p", _hoisted_7$2, toDisplayString(_ctx.$t("mount.filePreview.noPdfPreview") || "无法加载 PDF 预览"), 1),
            createBaseVNode("p", _hoisted_8$1, toDisplayString(__props.errorMessage || _ctx.$t("mount.filePreview.downloadToView") || "请下载文件后在本地查看"), 1)
          ])
        ]))
      ]);
    };
  }
};
const PdfFsPreview = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-82180671"]]);
const _hoisted_1$3 = { class: "epub-fs-preview w-full h-full relative" };
const _sfc_main$4 = {
  __name: "EpubFsPreview",
  props: {
    // 外部传入的 provider key
    providerKey: {
      type: String,
      default: "native"
    },
    providers: {
      type: Object,
      default: () => ({})
    },
    // 本地/原生渲染时，foliate-js 需要一个可以 fetch 的 URL
    nativeUrl: {
      type: String,
      default: ""
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["load", "error"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const currentOption = computed(() => {
      const providers = props.providers || {};
      const key = props.providerKey;
      if (key === "native" || providers[key] === "native") {
        return {
          key,
          url: props.nativeUrl,
          isNative: true
        };
      }
      const url = providers[key];
      if (url) {
        return {
          key,
          url,
          isNative: false
        };
      }
      return {
        key: "native",
        url: props.nativeUrl,
        isNative: true
      };
    });
    const isNativeProvider = computed(() => {
      return Boolean(currentOption.value?.isNative);
    });
    const currentNativeUrl = computed(() => {
      return currentOption.value?.url || "";
    });
    const currentIframeProviders = computed(() => {
      const opt = currentOption.value;
      if (!opt || opt.isNative) return {};
      return { [opt.key]: opt.url };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        isNativeProvider.value ? (openBlock(), createBlock(FoliateEpubView, {
          key: 0,
          "src-url": currentNativeUrl.value,
          "dark-mode": __props.darkMode,
          "loading-text": unref(t)("mount.filePreview.loadingPreview"),
          "error-text": unref(t)("mount.filePreview.previewError"),
          class: "w-full h-full",
          onLoad: _cache[0] || (_cache[0] = ($event) => emit("load")),
          onError: _cache[1] || (_cache[1] = ($event) => emit("error"))
        }, null, 8, ["src-url", "dark-mode", "loading-text", "error-text"])) : (openBlock(), createBlock(_sfc_main$d, {
          key: 1,
          providers: currentIframeProviders.value,
          "dark-mode": __props.darkMode,
          "loading-text": unref(t)("mount.filePreview.loadingPreview"),
          "error-text": unref(t)("mount.filePreview.previewError"),
          class: "w-full h-full",
          onLoad: _cache[2] || (_cache[2] = ($event) => emit("load")),
          onError: _cache[3] || (_cache[3] = ($event) => emit("error"))
        }, null, 8, ["providers", "dark-mode", "loading-text", "error-text"]))
      ]);
    };
  }
};
const _sfc_main$3 = {
  __name: "OfficeFsPreview",
  props: {
    previewUrl: {
      type: String,
      default: ""
    },
    contentUrl: {
      type: String,
      default: ""
    },
    filename: {
      type: String,
      default: ""
    },
    providerKey: {
      type: String,
      default: ""
    },
    errorMessage: {
      type: String,
      default: ""
    },
    isFullscreen: {
      type: Boolean,
      default: false
    }
  },
  emits: ["load", "error", "provider-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const normalizedProviders = computed(() => {
      const providers = {};
      if (props.providerKey === "native" || props.previewUrl === "native") {
        providers.native = "native";
      } else if (props.previewUrl) {
        providers[props.providerKey || "default"] = props.previewUrl;
      }
      return providers;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(OfficePreviewContainer), {
        "content-url": __props.contentUrl,
        filename: __props.filename,
        "is-fullscreen": __props.isFullscreen,
        providers: normalizedProviders.value,
        "default-provider": __props.providerKey,
        "height-mode": __props.isFullscreen ? "flex" : "fixed",
        "show-provider-selector": false,
        "show-footer": false,
        "error-message": __props.errorMessage,
        onLoad: _cache[0] || (_cache[0] = ($event) => emit("load")),
        onError: _cache[1] || (_cache[1] = ($event) => emit("error", $event)),
        onProviderChange: _cache[2] || (_cache[2] = ($event) => emit("provider-change", $event))
      }, null, 8, ["content-url", "filename", "is-fullscreen", "providers", "default-provider", "height-mode", "error-message"]);
    };
  }
};
const _hoisted_1$2 = { class: "flex items-center justify-between gap-3" };
const _hoisted_2$2 = { class: "toolbar-left flex flex-wrap items-center gap-3" };
const _hoisted_3$2 = { class: "toolbar-right flex flex-wrap items-center gap-2" };
const _hoisted_4$2 = ["value"];
const _hoisted_5$2 = ["value"];
const _hoisted_6$2 = ["title"];
const _sfc_main$2 = {
  __name: "PreviewChannelToolbar",
  props: {
    /** 工具栏标题（可选，为空时不显示） */
    title: {
      type: String,
      default: ""
    },
    /** 暗色模式 */
    darkMode: {
      type: Boolean,
      default: false
    },
    /** 渠道选项数组，格式：[{ key: string, label: string, url?: string }] */
    providerOptions: {
      type: Array,
      default: () => []
    },
    /** 当前选中的渠道 key（v-model） */
    modelValue: {
      type: String,
      default: ""
    },
    /** 是否显示全屏按钮 */
    showFullscreen: {
      type: Boolean,
      default: true
    },
    /** 当前是否处于全屏状态 */
    isFullscreen: {
      type: Boolean,
      default: false
    },
    /** 进入全屏按钮的 title */
    fullscreenEnterTitle: {
      type: String,
      default: "全屏"
    },
    /** 退出全屏按钮的 title */
    fullscreenExitTitle: {
      type: String,
      default: "退出全屏"
    }
  },
  emits: ["update:modelValue", "toggle-fullscreen"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleProviderChange = (e) => {
      const value = String(e?.target?.value || "");
      emit("update:modelValue", value);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["preview-channel-toolbar p-3 mb-4 rounded-lg bg-opacity-50", __props.darkMode ? "bg-gray-700/50" : "bg-gray-100"])
      }, [
        createBaseVNode("div", _hoisted_1$2, [
          createBaseVNode("div", _hoisted_2$2, [
            createBaseVNode("span", {
              class: normalizeClass(["font-medium", __props.darkMode ? "text-gray-200" : "text-gray-700"])
            }, toDisplayString(__props.title), 3),
            renderSlot(_ctx.$slots, "left")
          ]),
          createBaseVNode("div", _hoisted_3$2, [
            __props.providerOptions.length > 1 ? (openBlock(), createElementBlock("select", {
              key: 0,
              value: __props.modelValue,
              class: normalizeClass(["px-3 py-1 text-sm border rounded", __props.darkMode ? "bg-gray-600 border-gray-500 text-gray-200" : "bg-white border-gray-300 text-gray-700"]),
              onChange: handleProviderChange
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.providerOptions, (opt) => {
                return openBlock(), createElementBlock("option", {
                  key: opt.key,
                  value: opt.key
                }, toDisplayString(opt.label), 9, _hoisted_5$2);
              }), 128))
            ], 42, _hoisted_4$2)) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "right"),
            __props.showFullscreen ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: normalizeClass(["fullscreen-btn flex items-center px-3 py-1 text-sm border rounded transition-colors", __props.darkMode ? "bg-gray-600 hover:bg-gray-700 border-gray-500 text-gray-200" : "bg-white hover:bg-gray-50 border-gray-300 text-gray-700"]),
              title: __props.isFullscreen ? __props.fullscreenExitTitle : __props.fullscreenEnterTitle,
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("toggle-fullscreen"))
            }, [
              !__props.isFullscreen ? (openBlock(), createBlock(unref(IconExpand), {
                key: 0,
                size: "sm",
                "aria-hidden": "true"
              })) : (openBlock(), createBlock(unref(IconCollapse), {
                key: 1,
                size: "sm",
                "aria-hidden": "true"
              }))
            ], 10, _hoisted_6$2)) : createCommentVNode("", true)
          ])
        ])
      ], 2);
    };
  }
};
const _hoisted_1$1 = { class: "external-player-dock w-full flex justify-center px-2 sm:px-4 pb-2 pt-1" };
const _hoisted_2$1 = { class: "dock-container flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl sm:rounded-2xl shadow-xl transition-all duration-300 overflow-x-auto sm:overflow-visible scrollbar-hide max-w-full" };
const _hoisted_3$1 = ["onMouseenter"];
const _hoisted_4$1 = { class: "dock-icon w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700 rounded-lg sm:rounded-xl shadow-md transition-all duration-200 overflow-hidden" };
const _hoisted_5$1 = ["href", "title"];
const _hoisted_6$1 = ["src", "alt"];
const _hoisted_7$1 = {
  key: 1,
  class: "text-[10px] font-bold text-gray-500 dark:text-gray-300 uppercase"
};
const _sfc_main$1 = {
  __name: "ExternalPlayerDock",
  props: {
    videoUrl: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      default: "video"
    }
  },
  setup(__props) {
    const props = __props;
    const activeTooltip = ref(null);
    const tooltipStyle = reactive({
      top: "0px",
      left: "0px"
    });
    const showTooltip = (index, event) => {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      tooltipStyle.top = `${rect.top - 32}px`;
      tooltipStyle.left = `${rect.left + rect.width / 2}px`;
      tooltipStyle.transform = "translateX(-50%)";
      activeTooltip.value = index;
    };
    const hideTooltip = () => {
      activeTooltip.value = null;
    };
    const externalPlayersConfig = [
      { name: "IINA", icon: "iina", scheme: "iina://weblink?url=$edurl", platforms: ["MacOS"] },
      { name: "PotPlayer", icon: "potplayer", scheme: "potplayer:$durl", platforms: ["Windows"] },
      { name: "VLC", icon: "vlc", scheme: "vlc:$durl", platforms: ["Windows", "MacOS", "Linux", "Android", "iOS"] },
      { name: "nPlayer", icon: "nplayer", scheme: "nplayer-$durl", platforms: ["Android", "iOS"] },
      { name: "Infuse", icon: "infuse", scheme: "infuse://x-callback-url/play?url=$durl", platforms: ["MacOS", "iOS"] },
      { name: "Fig Player", icon: "figplayer", scheme: "figplayer://weblink?url=$durl", platforms: ["MacOS"] },
      { name: "MX Player", icon: "mxplayer", scheme: "intent:$durl#Intent;package=com.mxtech.videoplayer.ad;S.title=$name;end", platforms: ["Android"] },
      { name: "MX Player Pro", icon: "mxplayer-pro", scheme: "intent:$durl#Intent;package=com.mxtech.videoplayer.pro;S.title=$name;end", platforms: ["Android"] }
    ];
    const platformPlayers = computed(() => {
      return externalPlayersConfig;
    });
    const buildExternalPlayerUrl = (player) => {
      if (!props.videoUrl) return "#";
      const durl = encodeURI(props.videoUrl);
      const edurl = encodeURIComponent(props.videoUrl);
      const name = encodeURIComponent(props.fileName || "video");
      return String(player.scheme || "").replace("$durl", durl).replace("$edurl", edurl).replace("$url", durl).replace("$name", name);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(platformPlayers.value, (player, index) => {
            return openBlock(), createElementBlock("div", {
              key: player.name,
              onMouseenter: ($event) => showTooltip(index, $event),
              onMouseleave: hideTooltip,
              class: "dock-item group relative flex flex-col items-center justify-end cursor-pointer transition-all duration-200 ease-out origin-bottom flex-shrink-0"
            }, [
              createBaseVNode("div", _hoisted_4$1, [
                player.icon ? (openBlock(), createElementBlock("a", {
                  key: 0,
                  href: buildExternalPlayerUrl(player),
                  class: "block w-full h-full",
                  title: player.name
                }, [
                  createBaseVNode("img", {
                    src: `/images/${player.icon}.webp`,
                    alt: player.name,
                    class: "w-full h-full object-contain p-0.5 sm:p-1"
                  }, null, 8, _hoisted_6$1)
                ], 8, _hoisted_5$1)) : (openBlock(), createElementBlock("span", _hoisted_7$1, toDisplayString(player.name.substring(0, 2)), 1))
              ])
            ], 40, _hoisted_3$1);
          }), 128))
        ]),
        (openBlock(), createBlock(Teleport, { to: "body" }, [
          createVNode(Transition, { name: "tooltip-fade" }, {
            default: withCtx(() => [
              activeTooltip.value !== null ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "fixed px-2 py-1 bg-black/80 text-white text-[10px] rounded pointer-events-none whitespace-nowrap backdrop-blur-sm z-[9999] hidden sm:block",
                style: normalizeStyle(tooltipStyle)
              }, [
                createTextVNode(toDisplayString(platformPlayers.value[activeTooltip.value]?.name) + " ", 1),
                _cache[0] || (_cache[0] = createBaseVNode("div", { class: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/80" }, null, -1))
              ], 4)) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]))
      ]);
    };
  }
};
const ExternalPlayerDock = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-27dc6705"]]);
const _hoisted_1 = { class: "file-preview-container" };
const _hoisted_2 = { class: "mb-4 px-1 transition-all duration-300" };
const _hoisted_3 = { class: "flex flex-col sm:flex-row sm:items-center justify-between gap-4" };
const _hoisted_4 = { class: "min-w-0 flex-1" };
const _hoisted_5 = { class: "flex items-center gap-2 mb-1.5" };
const _hoisted_6 = ["title"];
const _hoisted_7 = { class: "hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700" };
const _hoisted_8 = { class: "flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide" };
const _hoisted_9 = { class: "flex items-center gap-1.5" };
const _hoisted_10 = { class: "flex items-center gap-1.5" };
const _hoisted_11 = { class: "flex items-center gap-2 self-start sm:self-center" };
const _hoisted_12 = ["title"];
const _hoisted_13 = ["title", "disabled"];
const _hoisted_14 = ["title", "disabled"];
const _hoisted_15 = { class: "file-content overflow-hidden transition-all duration-300" };
const _hoisted_16 = ["value"];
const _hoisted_17 = ["value", "title"];
const _hoisted_18 = ["title"];
const _hoisted_19 = ["disabled", "title"];
const _hoisted_20 = { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" };
const _hoisted_21 = { class: "toolbar-left flex flex-wrap items-center gap-3 min-w-0" };
const _hoisted_22 = ["title"];
const _hoisted_23 = { class: "toolbar-right flex flex-wrap items-center gap-2" };
const _hoisted_24 = ["value"];
const _hoisted_25 = ["value", "title"];
const _hoisted_26 = ["value"];
const _hoisted_27 = ["disabled", "title"];
const _hoisted_28 = ["title"];
const _hoisted_29 = {
  key: 1,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_30 = { class: "p-12" };
const _hoisted_31 = {
  key: 2,
  class: "flex-1 flex justify-center items-center p-4"
};
const _hoisted_32 = ["src", "alt"];
const _hoisted_33 = {
  key: 2,
  class: "loading-indicator text-center py-8"
};
const _hoisted_34 = {
  key: 3,
  class: "flex-1 min-h-0"
};
const _hoisted_35 = {
  key: 4,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_36 = {
  key: 5,
  class: "pdf-preview h-[600px]"
};
const _hoisted_37 = {
  key: 6,
  class: "epub-preview h-[600px]"
};
const _hoisted_38 = {
  key: 8,
  class: "iframe-preview h-[600px]"
};
const _hoisted_39 = {
  key: 11,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_40 = { class: "generic-preview text-center py-12" };
const _hoisted_41 = {
  key: 12,
  class: "flex-1"
};
const _hoisted_42 = {
  key: 13,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_43 = { class: "generic-preview text-center py-12" };
const _hoisted_44 = {
  key: 0,
  class: "external-player-section mt-3 overflow-visible"
};
const _sfc_main = {
  __name: "FilePreview",
  props: {
    file: {
      type: Object,
      required: true
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    // 认证相关props
    isAdmin: {
      type: Boolean,
      default: false
    },
    apiKeyInfo: {
      type: Object,
      default: null
    },
    hasFilePermission: {
      type: Boolean,
      default: false
    },
    // 目录项目列表（用于音频播放列表等功能）
    directoryItems: {
      type: Array,
      default: () => []
    }
  },
  emits: ["download", "loaded", "error", "updated", "switch-audio", "show-message"],
  setup(__props, { emit: __emit }) {
    useCssVars((_ctx) => ({
      "302be6bb": props.darkMode ? "#d4d4d4" : "#374151",
      "e47b9a90": props.darkMode ? "#30363d" : "#e5e7eb",
      "b2edc49a": props.darkMode ? "#252526" : "#f3f4f6",
      "324213cc": props.darkMode ? "#ce9178" : "#ef4444",
      "51cb43fe": props.darkMode ? "#4b5563" : "#e5e7eb",
      "4078f830": props.darkMode ? "#9ca3af" : "#6b7280",
      "91de4264": props.darkMode ? "#1a1a1a" : "#f9fafb",
      "789f88dc": props.darkMode ? "#3b82f6" : "#2563eb",
      "77e387c1": props.darkMode ? "#e2e8f0" : "#374151",
      "23e35f8c": props.darkMode ? "#1e1e1e" : "#ffffff",
      "9e4aa918": props.darkMode ? "#252526" : "#f9fafb"
    }));
    const { t } = useI18n();
    const log2 = createLogger("FilePreview");
    const pathPassword = usePathPassword();
    const fsService = useFsService();
    const props = __props;
    const emit = __emit;
    const authStore = useAuthStore();
    const authInfo = computed(() => ({
      isAdmin: props.isAdmin ?? authStore.isAdmin,
      apiKeyInfo: props.apiKeyInfo ?? authStore.apiKeyInfo,
      hasFilePermission: props.hasFilePermission ?? authStore.hasPathPermission(props.file?.path || ""),
      get isAuthenticated() {
        return this.isAdmin || !!this.apiKeyInfo;
      },
      get authType() {
        return this.isAdmin ? "admin" : this.apiKeyInfo ? "apikey" : "none";
      }
    }));
    const renderers = usePreviewRenderers(
      computed(() => props.file),
      emit,
      computed(() => props.darkMode)
    );
    const extensions = useFilePreviewExtensions(
      computed(() => props.file),
      authInfo,
      renderers.officePreviewLoading,
      renderers.officePreviewError,
      renderers.officePreviewTimedOut,
      renderers.previewUrl,
      renderers.handleFullscreenChange,
      renderers.handleKeyDown,
      emit,
      renderers.authenticatedPreviewUrl,
      renderers.previewTimeoutId
    );
    const {
      // 模板中使用的状态
      loadError,
      authenticatedPreviewUrl,
      officePreviewError,
      // 模板中使用的DOM引用
      officePreviewRef,
      // 模板中使用的方法
      formatFileSize: formatFileSize2,
      formatDate,
      handleContentLoaded,
      handleContentError
    } = renderers;
    const resolvedPreview = computed(() => resolvePreviewSelection({ file: props.file }));
    const previewKey = computed(() => resolvedPreview.value.key);
    const iframeProviders = computed(() => resolvedPreview.value.providers || {});
    const isImage = computed(() => previewKey.value === PREVIEW_KEYS.IMAGE);
    const isVideo = computed(() => previewKey.value === PREVIEW_KEYS.VIDEO);
    const isAudio = computed(() => previewKey.value === PREVIEW_KEYS.AUDIO);
    const isPdf = computed(() => previewKey.value === PREVIEW_KEYS.PDF);
    const isEpub = computed(() => previewKey.value === PREVIEW_KEYS.EPUB);
    const isOffice = computed(() => previewKey.value === PREVIEW_KEYS.OFFICE);
    const isIframe = computed(() => previewKey.value === PREVIEW_KEYS.IFRAME);
    const isArchive = computed(() => previewKey.value === PREVIEW_KEYS.ARCHIVE);
    const isMarkdown = computed(() => previewKey.value === PREVIEW_KEYS.MARKDOWN);
    const isText = computed(
      () => [PREVIEW_KEYS.TEXT, PREVIEW_KEYS.CODE, PREVIEW_KEYS.MARKDOWN, PREVIEW_KEYS.HTML].includes(previewKey.value)
    );
    const {
      isGeneratingPreview,
      handleDownload,
      handleS3DirectPreview,
      getCurrentDirectoryPath,
      isCreatingShare,
      handleCreateShare,
      handleOfficePreviewLoaded,
      handleOfficePreviewError,
      handleAudioPlay,
      handleAudioPause,
      handleAudioError
    } = extensions;
    const smartInitialMode = computed(() => {
      if (!props.file?.name) return "text";
      return getPreviewModeFromFilename(props.file.name);
    });
    const textPreviewMode = ref("text");
    const textEncoding = ref("utf-8");
    const textPreviewRef = ref(null);
    const userHasManuallyChanged = ref(false);
    const textPreviewTitle = computed(() => {
      const modeLabels = {
        text: t("mount.filePreview.textPreview"),
        code: t("mount.filePreview.codePreview"),
        markdown: "Markdown",
        html: "HTML",
        edit: t("mount.filePreview.editMode")
      };
      return modeLabels[textPreviewMode.value] || t("mount.filePreview.textPreview");
    });
    const selectedIframeProvider = ref("");
    const iframeProviderOptionsForToolbar = ref([]);
    const handleIframeProviderOptions = (options) => {
      const list = Array.isArray(options) ? options : [];
      iframeProviderOptionsForToolbar.value = list;
      if (!list.length) {
        selectedIframeProvider.value = "";
        return;
      }
      const exists = list.some((opt) => opt.key === selectedIframeProvider.value);
      if (!exists) {
        selectedIframeProvider.value = list[0].key;
      }
    };
    const toolbarTitle = computed(() => {
      if (isText.value) return textPreviewTitle.value;
      if (isPdf.value) return "PDF";
      if (isOffice.value) return officeTypeDisplayName.value;
      if (isEpub.value) return "EPUB";
      if (isImage.value) return t("mount.filePreview.imagePreview");
      if (isVideo.value) return t("mount.filePreview.videoPreview");
      if (isAudio.value) return t("mount.filePreview.audioPreview");
      if (isIframe.value) return t("mount.filePreview.iframePreview");
      if (isArchive.value) return t("mount.filePreview.archivePreview");
      return t("mount.filePreview.previewTypeOther");
    });
    const toolbarProviderOptions = computed(() => {
      if (isPdf.value) return pdfProviderOptions.value;
      if (isOffice.value) return officeProviderOptions.value;
      if (isEpub.value) return epubProviderOptions.value;
      if (isIframe.value) return iframeProviderOptionsForToolbar.value;
      return [];
    });
    const toolbarProviderKey = computed({
      get() {
        if (isPdf.value) return selectedPdfProvider.value;
        if (isOffice.value) return selectedOfficeProvider.value;
        if (isEpub.value) return selectedEpubProvider.value;
        if (isIframe.value) return selectedIframeProvider.value;
        return "";
      },
      set(value) {
        const key = String(value || "");
        if (isPdf.value) selectedPdfProvider.value = key;
        if (isOffice.value) selectedOfficeProvider.value = key;
        if (isEpub.value) selectedEpubProvider.value = key;
        if (isIframe.value) selectedIframeProvider.value = key;
      }
    });
    const {
      providerOptions: pdfProviderOptions,
      selectedKey: selectedPdfProvider,
      currentUrl: currentPdfPreviewUrl
    } = useProviderSelector({
      providers: computed(() => resolvedPreview.value.providers || {}),
      nativeUrl: authenticatedPreviewUrl,
      nativeLabel: computed(() => t("mount.filePreview.browserNative")),
      labelMap: computed(() => ({
        pdfjs: t("mount.filePreview.pdfjsLabel")
      }))
    });
    const selectedOfficeProvider = ref("");
    const officeContentUrl = computed(() => {
      const fsPath = props.file?.path || "";
      if (!fsPath) return "";
      let url = `/api/fs/content?path=${encodeURIComponent(fsPath)}`;
      if (!props.isAdmin) {
        const token = pathPassword.getPathToken(fsPath);
        if (token) {
          url += `&path_token=${encodeURIComponent(token)}`;
        }
      }
      return url;
    });
    const officeProviderOptions = computed(() => {
      const options = [];
      const providers = resolvedPreview.value.providers || {};
      for (const [key, url] of Object.entries(providers)) {
        const labelKey = `mount.filePreview.officeProvider.${key}`;
        const translated = t(labelKey);
        options.push({
          key,
          label: translated === labelKey ? key : translated,
          url
        });
      }
      return options;
    });
    watch(
      officeProviderOptions,
      (options) => {
        if (!options.length) {
          selectedOfficeProvider.value = "";
          return;
        }
        const exists = options.some((opt) => opt.key === selectedOfficeProvider.value);
        if (!exists) {
          selectedOfficeProvider.value = options[0].key;
        }
      },
      { immediate: true }
    );
    const officeTypeDisplayName = computed(() => {
      const filename = props.file?.name || "";
      const ext = filename.split(".").pop()?.toLowerCase();
      if (["doc", "docx", "odt", "rtf"].includes(ext)) {
        return t("mount.filePreview.wordPreview");
      }
      if (["xls", "xlsx", "ods", "csv"].includes(ext)) {
        return t("mount.filePreview.excelPreview");
      }
      if (["ppt", "pptx", "odp"].includes(ext)) {
        return t("mount.filePreview.powerpointPreview");
      }
      return t("mount.filePreview.officePreview");
    });
    const currentOfficePreviewUrl = computed(() => {
      const options = officeProviderOptions.value;
      if (!options.length) return "";
      const current = options.find((opt) => opt.key === selectedOfficeProvider.value) || options[0];
      return current.url || "";
    });
    const { providerOptions: epubProviderOptions, selectedKey: selectedEpubProvider } = useProviderSelector({
      providers: computed(() => resolvedPreview.value.providers || {}),
      nativeUrl: authenticatedPreviewUrl,
      nativeLabel: computed(() => t("mount.filePreview.browserNative"))
    });
    const { isSaving, saveFile } = useFileSave();
    const canEdit = computed(() => {
      if (authStore.isAdmin) {
        return true;
      }
      return authStore.hasMountUploadPermission && authStore.hasPathPermission(props.file?.path || "");
    });
    const availablePreviewModes = computed(() => {
      const modes = [
        { value: PREVIEW_MODES.TEXT, label: "Text" },
        { value: PREVIEW_MODES.CODE, label: "Code" },
        { value: PREVIEW_MODES.MARKDOWN, label: "Markdown" },
        { value: PREVIEW_MODES.HTML, label: "HTML" }
      ];
      if (canEdit.value) {
        modes.push({ value: PREVIEW_MODES.EDIT, label: "Edit" });
      }
      return modes;
    });
    const availableEncodings = computed(() => {
      return SUPPORTED_ENCODINGS;
    });
    const previewContentRef = ref(null);
    const { isFullscreen: isContentFullscreen, toggleFullscreen, exitFullscreen } = useElementFullscreen(previewContentRef, { includeChildren: false });
    const previewContainerStyle = computed(() => {
      if (isContentFullscreen.value) {
        return { height: "100vh" };
      }
      if (isVideo.value) {
        return {
          maxHeight: "80vh"
        };
      }
      return {
        minHeight: "400px",
        maxHeight: "80vh"
      };
    });
    const dynamicMaxHeight = computed(() => {
      if (isContentFullscreen.value) {
        return "calc(100vh - 60px)";
      } else {
        return 600;
      }
    });
    const handleSaveFile = async () => {
      if (!textPreviewRef.value || !textPreviewRef.value.getValue) {
        log2.error("无法获取编辑器内容");
        emit("show-message", {
          type: "error",
          message: t("mount.filePreview.cannotGetEditorContent")
        });
        return;
      }
      const content = textPreviewRef.value.getValue();
      const result = await saveFile(props.file.path, props.file.name, content, getCurrentDirectoryPath());
      if (result.success) {
        emit("show-message", {
          type: "success",
          message: result.message
        });
        emit("updated", {
          file: props.file,
          action: "save",
          result: result.data
        });
      } else {
        emit("show-message", {
          type: "error",
          message: result.message
        });
      }
    };
    const livePhotoData = computed(() => {
      if (!props.file?.name || !isLivePhotoImage(props.file.name)) {
        return { isLivePhoto: false, videoFile: null };
      }
      return detectLivePhoto(props.file, props.directoryItems);
    });
    const isLivePhoto = computed(() => livePhotoData.value.isLivePhoto);
    const livePhotoVideoUrl = ref("");
    let livePhotoVideoUrlRequestId = 0;
    watch(
      () => livePhotoData.value.videoFile,
      async (videoFile) => {
        const currentRequestId = ++livePhotoVideoUrlRequestId;
        if (!videoFile) {
          livePhotoVideoUrl.value = "";
          return;
        }
        const videoPath = typeof videoFile.path === "string" ? videoFile.path : "";
        if (!videoPath) {
          livePhotoVideoUrl.value = "";
          return;
        }
        try {
          const url = await fsService.getFileLink(videoPath, null, false);
          if (currentRequestId !== livePhotoVideoUrlRequestId) return;
          livePhotoVideoUrl.value = url || "";
        } catch (error) {
          if (currentRequestId !== livePhotoVideoUrlRequestId) return;
          log2.error("[LivePhoto] 获取视频直链失败:", error);
          livePhotoVideoUrl.value = "";
        }
      },
      { immediate: true }
    );
    watch(textPreviewMode, (newMode) => {
      if (textPreviewRef.value) {
        textPreviewRef.value.switchMode(newMode);
      }
    });
    watch(textEncoding, (newEncoding) => {
      if (textPreviewRef.value) {
        textPreviewRef.value.switchEncoding(newEncoding);
      }
    });
    const handleModeChange = (newMode) => {
      textPreviewMode.value = newMode;
      userHasManuallyChanged.value = true;
    };
    const handleEncodingChange = (newEncoding) => {
      textEncoding.value = newEncoding;
    };
    watch(
      () => props.file,
      (newFile, oldFile) => {
        if (newFile) {
          if (!oldFile || oldFile && newFile.name !== oldFile.name) {
            userHasManuallyChanged.value = false;
            textPreviewMode.value = smartInitialMode.value;
          }
        }
      },
      { immediate: true }
    );
    onBeforeUnmount(() => {
      void exitFullscreen();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("h3", {
                  class: "text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 truncate leading-tight",
                  title: __props.file.name
                }, toDisplayString(__props.file.name), 9, _hoisted_6),
                createBaseVNode("span", _hoisted_7, toDisplayString(__props.file.mimetype || "FILE"), 1)
              ]),
              createBaseVNode("div", _hoisted_8, [
                createBaseVNode("span", _hoisted_9, [
                  createVNode(unref(IconDatabase), {
                    size: "sm",
                    class: "w-3.5 h-3.5 opacity-70"
                  }),
                  createBaseVNode("span", null, toDisplayString(unref(formatFileSize2)(__props.file.size)), 1)
                ]),
                _cache[12] || (_cache[12] = createBaseVNode("span", { class: "w-px h-3 bg-gray-300 dark:bg-gray-700" }, null, -1)),
                createBaseVNode("span", _hoisted_10, [
                  createVNode(unref(IconClock), {
                    size: "sm",
                    class: "w-3.5 h-3.5 opacity-70"
                  }),
                  createBaseVNode("span", null, toDisplayString(unref(formatDate)(__props.file.modified)), 1)
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_11, [
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = (...args) => unref(handleDownload) && unref(handleDownload)(...args)),
                class: "group flex items-center justify-center w-8 h-8 rounded-full transition-all bg-transparent text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 transform hover:scale-105",
                title: unref(t)("mount.filePreview.downloadFile")
              }, [
                createVNode(unref(IconDownload), {
                  size: "sm",
                  class: "w-5 h-5"
                })
              ], 8, _hoisted_12),
              createBaseVNode("button", {
                onClick: _cache[1] || (_cache[1] = (...args) => unref(handleS3DirectPreview) && unref(handleS3DirectPreview)(...args)),
                class: "group flex items-center justify-center w-8 h-8 rounded-full transition-all bg-transparent text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-900/20 transform hover:scale-105",
                title: unref(t)("mount.filePreview.directPreview"),
                disabled: unref(isGeneratingPreview)
              }, [
                unref(isGeneratingPreview) ? (openBlock(), createBlock(unref(IconRefresh), {
                  key: 0,
                  class: "w-5 h-5 animate-spin"
                })) : (openBlock(), createBlock(unref(IconEye), {
                  key: 1,
                  size: "sm",
                  class: "w-5 h-5"
                }))
              ], 8, _hoisted_13),
              createBaseVNode("button", {
                onClick: _cache[2] || (_cache[2] = (...args) => unref(handleCreateShare) && unref(handleCreateShare)(...args)),
                class: "group flex items-center justify-center w-8 h-8 rounded-full transition-all bg-transparent text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-indigo-900/20 transform hover:scale-105",
                title: unref(t)("mount.filePreview.createShare"),
                disabled: unref(isCreatingShare)
              }, [
                unref(isCreatingShare) ? (openBlock(), createBlock(unref(IconRefresh), {
                  key: 0,
                  class: "w-5 h-5 animate-spin"
                })) : (openBlock(), createBlock(unref(IconLink), {
                  key: 1,
                  size: "sm",
                  class: "w-5 h-5"
                }))
              ], 8, _hoisted_14)
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_15, [
          !unref(isContentFullscreen) ? (openBlock(), createBlock(_sfc_main$2, {
            key: 0,
            title: toolbarTitle.value,
            "dark-mode": __props.darkMode,
            "provider-options": toolbarProviderOptions.value,
            modelValue: toolbarProviderKey.value,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => toolbarProviderKey.value = $event),
            "is-fullscreen": unref(isContentFullscreen),
            "fullscreen-enter-title": _ctx.$t("mount.filePreview.fullscreen"),
            "fullscreen-exit-title": _ctx.$t("mount.filePreview.exitFullscreen"),
            onToggleFullscreen: unref(toggleFullscreen)
          }, {
            left: withCtx(() => [
              isText.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => textPreviewMode.value = $event),
                  class: normalizeClass(["mode-select px-3 py-1 text-sm border rounded", __props.darkMode ? "bg-gray-600 border-gray-500 text-gray-200" : "bg-white border-gray-300 text-gray-700"])
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(availablePreviewModes.value, (mode) => {
                    return openBlock(), createElementBlock("option", {
                      key: mode.value,
                      value: mode.value
                    }, toDisplayString(mode.label), 9, _hoisted_16);
                  }), 128))
                ], 2), [
                  [vModelSelect, textPreviewMode.value]
                ]),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => textEncoding.value = $event),
                  class: normalizeClass(["encoding-select px-3 py-1 text-sm border rounded", __props.darkMode ? "bg-gray-600 border-gray-500 text-gray-200" : "bg-white border-gray-300 text-gray-700"])
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(availableEncodings.value, (encoding) => {
                    return openBlock(), createElementBlock("option", {
                      key: encoding.value,
                      value: encoding.value,
                      title: encoding.description
                    }, toDisplayString(encoding.label), 9, _hoisted_17);
                  }), 128))
                ], 2), [
                  [vModelSelect, textEncoding.value]
                ])
              ], 64)) : createCommentVNode("", true)
            ]),
            right: withCtx(() => [
              isText.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                textPreviewMode.value === "edit" ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["context-menu-hint flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 cursor-help hover:scale-110", __props.darkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-100/50"]),
                  title: _ctx.$t("mount.filePreview.rightClickHint")
                }, [
                  createVNode(unref(IconError), {
                    class: "text-yellow-500",
                    "aria-hidden": "true"
                  })
                ], 10, _hoisted_18)) : createCommentVNode("", true),
                textPreviewMode.value === "edit" ? (openBlock(), createElementBlock("button", {
                  key: 1,
                  onClick: handleSaveFile,
                  disabled: unref(isSaving),
                  class: normalizeClass(["save-btn flex items-center px-3 py-1 text-sm border rounded transition-colors", [
                    __props.darkMode ? "bg-blue-600 hover:bg-blue-700 border-blue-500 text-white" : "bg-blue-500 hover:bg-blue-600 border-blue-400 text-white",
                    unref(isSaving) ? "opacity-50 cursor-not-allowed" : ""
                  ]]),
                  title: _ctx.$t("mount.filePreview.saveFileShortcut")
                }, [
                  unref(isSaving) ? (openBlock(), createBlock(unref(IconRefresh), {
                    key: 0,
                    class: "w-4 h-4 mr-1 animate-spin",
                    "aria-hidden": "true"
                  })) : (openBlock(), createBlock(unref(IconSave), {
                    key: 1,
                    size: "sm",
                    class: "mr-1",
                    "aria-hidden": "true"
                  })),
                  createTextVNode(" " + toDisplayString(unref(isSaving) ? _ctx.$t("mount.filePreview.saving") : _ctx.$t("mount.filePreview.save")), 1)
                ], 10, _hoisted_19)) : createCommentVNode("", true)
              ], 64)) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["title", "dark-mode", "provider-options", "modelValue", "is-fullscreen", "fullscreen-enter-title", "fullscreen-exit-title", "onToggleFullscreen"])) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "previewContentRef",
            ref: previewContentRef,
            class: normalizeClass(["preview-content border rounded-xl overflow-hidden transition-all duration-300 flex flex-col", [__props.darkMode ? "border-gray-700" : "border-gray-200"]]),
            style: normalizeStyle(previewContainerStyle.value)
          }, [
            unref(isContentFullscreen) && !isVideo.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["fullscreen-toolbar sticky top-0 z-20 p-3 border-b", __props.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
            }, [
              createBaseVNode("div", _hoisted_20, [
                createBaseVNode("div", _hoisted_21, [
                  createBaseVNode("h3", {
                    class: normalizeClass(["text-lg font-medium truncate", __props.darkMode ? "text-gray-200" : "text-gray-800"]),
                    title: __props.file.name
                  }, toDisplayString(__props.file.name), 11, _hoisted_22),
                  createBaseVNode("span", {
                    class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                  }, toDisplayString(toolbarTitle.value), 3)
                ]),
                createBaseVNode("div", _hoisted_23, [
                  isText.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => textPreviewMode.value = $event),
                      class: normalizeClass(["mode-select px-2 py-1 text-sm border rounded", __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-700"])
                    }, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(availablePreviewModes.value, (mode) => {
                        return openBlock(), createElementBlock("option", {
                          key: mode.value,
                          value: mode.value
                        }, toDisplayString(mode.label), 9, _hoisted_24);
                      }), 128))
                    ], 2), [
                      [vModelSelect, textPreviewMode.value]
                    ]),
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => textEncoding.value = $event),
                      class: normalizeClass(["encoding-select px-2 py-1 text-sm border rounded", __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-700"])
                    }, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(availableEncodings.value, (encoding) => {
                        return openBlock(), createElementBlock("option", {
                          key: encoding.value,
                          value: encoding.value,
                          title: encoding.description
                        }, toDisplayString(encoding.label), 9, _hoisted_25);
                      }), 128))
                    ], 2), [
                      [vModelSelect, textEncoding.value]
                    ])
                  ], 64)) : createCommentVNode("", true),
                  toolbarProviderOptions.value.length > 1 ? withDirectives((openBlock(), createElementBlock("select", {
                    key: 1,
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => toolbarProviderKey.value = $event),
                    class: normalizeClass(["px-2 py-1 text-sm border rounded", __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-700"])
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(toolbarProviderOptions.value, (opt) => {
                      return openBlock(), createElementBlock("option", {
                        key: opt.key,
                        value: opt.key
                      }, toDisplayString(opt.label), 9, _hoisted_26);
                    }), 128))
                  ], 2)), [
                    [vModelSelect, toolbarProviderKey.value]
                  ]) : createCommentVNode("", true),
                  isText.value && textPreviewMode.value === "edit" ? (openBlock(), createElementBlock("button", {
                    key: 2,
                    onClick: handleSaveFile,
                    disabled: unref(isSaving),
                    class: normalizeClass(["save-btn flex items-center px-2 py-1 text-sm border rounded transition-colors", [
                      __props.darkMode ? "bg-blue-600 hover:bg-blue-700 border-blue-500 text-white" : "bg-blue-500 hover:bg-blue-600 border-blue-400 text-white",
                      unref(isSaving) ? "opacity-50 cursor-not-allowed" : ""
                    ]]),
                    title: _ctx.$t("mount.filePreview.saveFileShortcut")
                  }, [
                    unref(isSaving) ? (openBlock(), createBlock(unref(IconRefresh), {
                      key: 0,
                      class: "w-4 h-4 mr-1 animate-spin",
                      "aria-hidden": "true"
                    })) : (openBlock(), createBlock(unref(IconSave), {
                      key: 1,
                      size: "sm",
                      class: "mr-1",
                      "aria-hidden": "true"
                    })),
                    createTextVNode(" " + toDisplayString(unref(isSaving) ? _ctx.$t("mount.filePreview.saving") : _ctx.$t("mount.filePreview.save")), 1)
                  ], 10, _hoisted_27)) : createCommentVNode("", true),
                  createBaseVNode("button", {
                    onClick: _cache[9] || (_cache[9] = (...args) => unref(toggleFullscreen) && unref(toggleFullscreen)(...args)),
                    class: normalizeClass(["exit-fullscreen-btn flex items-center px-2 py-1 text-sm border rounded transition-colors", __props.darkMode ? "bg-gray-600 hover:bg-gray-700 border-gray-500 text-gray-200" : "bg-white hover:bg-gray-50 border-gray-300 text-gray-700"]),
                    title: _ctx.$t("mount.filePreview.exitFullscreen")
                  }, [
                    createVNode(unref(IconCollapse), {
                      size: "sm",
                      "aria-hidden": "true"
                    })
                  ], 10, _hoisted_28)
                ])
              ])
            ], 2)) : createCommentVNode("", true),
            __props.isLoading ? (openBlock(), createElementBlock("div", _hoisted_29, [
              createBaseVNode("div", _hoisted_30, [
                createVNode(_sfc_main$c, {
                  "dark-mode": __props.darkMode,
                  size: "3xl",
                  "icon-class": __props.darkMode ? "text-primary-500" : "text-primary-600"
                }, null, 8, ["dark-mode", "icon-class"])
              ])
            ])) : isImage.value ? (openBlock(), createElementBlock("div", _hoisted_31, [
              isLivePhoto.value && unref(authenticatedPreviewUrl) && livePhotoVideoUrl.value ? (openBlock(), createBlock(unref(_sfc_main$e), {
                key: 0,
                "photo-src": unref(authenticatedPreviewUrl),
                "video-src": livePhotoVideoUrl.value,
                "dark-mode": __props.darkMode,
                "max-width": "100%",
                "show-badge": true,
                "show-badge-text": true,
                "show-progress": true,
                "lazy-load": true,
                "enable-vibration": true,
                class: "max-w-full max-h-[600px]",
                onLoad: unref(handleContentLoaded),
                onError: unref(handleContentError)
              }, null, 8, ["photo-src", "video-src", "dark-mode", "onLoad", "onError"])) : unref(authenticatedPreviewUrl) ? (openBlock(), createElementBlock("img", {
                key: 1,
                src: unref(authenticatedPreviewUrl),
                alt: __props.file.name,
                class: "max-w-full max-h-[600px] object-contain",
                onLoad: _cache[10] || (_cache[10] = (...args) => unref(handleContentLoaded) && unref(handleContentLoaded)(...args)),
                onError: _cache[11] || (_cache[11] = (...args) => unref(handleContentError) && unref(handleContentError)(...args))
              }, null, 40, _hoisted_32)) : (openBlock(), createElementBlock("div", _hoisted_33, [
                createVNode(_sfc_main$c, {
                  "dark-mode": __props.darkMode,
                  size: "2xl",
                  "icon-class": __props.darkMode ? "text-primary-500" : "text-primary-600"
                }, null, 8, ["dark-mode", "icon-class"])
              ]))
            ])) : isVideo.value ? (openBlock(), createElementBlock("div", _hoisted_34, [
              createVNode(VideoPreview, {
                file: __props.file,
                "video-url": unref(authenticatedPreviewUrl),
                "dark-mode": __props.darkMode,
                "is-admin": __props.isAdmin,
                "is-fullscreen": unref(isContentFullscreen),
                "current-path": unref(getCurrentDirectoryPath)(),
                "directory-items": __props.directoryItems,
                onLoaded: unref(handleContentLoaded),
                onToggleFullscreen: unref(toggleFullscreen)
              }, null, 8, ["file", "video-url", "dark-mode", "is-admin", "is-fullscreen", "current-path", "directory-items", "onLoaded", "onToggleFullscreen"])
            ])) : isAudio.value ? (openBlock(), createElementBlock("div", _hoisted_35, [
              createVNode(AudioPreview, {
                file: __props.file,
                "audio-url": unref(authenticatedPreviewUrl),
                "dark-mode": __props.darkMode,
                "is-admin": __props.isAdmin,
                "current-path": unref(getCurrentDirectoryPath)(),
                "directory-items": __props.directoryItems,
                onPlay: unref(handleAudioPlay),
                onPause: unref(handleAudioPause),
                onError: unref(handleAudioError),
                onLoaded: unref(handleContentLoaded)
              }, null, 8, ["file", "audio-url", "dark-mode", "is-admin", "current-path", "directory-items", "onPlay", "onPause", "onError", "onLoaded"])
            ])) : isPdf.value ? (openBlock(), createElementBlock("div", _hoisted_36, [
              createVNode(PdfFsPreview, {
                "preview-url": unref(currentPdfPreviewUrl),
                "error-message": unref(officePreviewError),
                onLoad: unref(handleContentLoaded),
                onError: unref(handleContentError)
              }, null, 8, ["preview-url", "error-message", "onLoad", "onError"])
            ])) : isEpub.value ? (openBlock(), createElementBlock("div", _hoisted_37, [
              createVNode(_sfc_main$4, {
                "provider-key": unref(selectedEpubProvider),
                providers: resolvedPreview.value.providers || {},
                "native-url": unref(authenticatedPreviewUrl),
                "dark-mode": __props.darkMode,
                onLoad: unref(handleContentLoaded),
                onError: unref(handleContentError)
              }, null, 8, ["provider-key", "providers", "native-url", "dark-mode", "onLoad", "onError"])
            ])) : isOffice.value ? (openBlock(), createElementBlock("div", {
              key: 7,
              ref_key: "officePreviewRef",
              ref: officePreviewRef,
              class: "office-preview"
            }, [
              createVNode(_sfc_main$3, {
                "preview-url": currentOfficePreviewUrl.value,
                "content-url": officeContentUrl.value,
                filename: __props.file.name,
                "dark-mode": __props.darkMode,
                "provider-key": selectedOfficeProvider.value,
                "error-message": unref(officePreviewError),
                "is-fullscreen": unref(isContentFullscreen),
                onLoad: unref(handleOfficePreviewLoaded),
                onError: unref(handleOfficePreviewError)
              }, null, 8, ["preview-url", "content-url", "filename", "dark-mode", "provider-key", "error-message", "is-fullscreen", "onLoad", "onError"])
            ], 512)) : isIframe.value ? (openBlock(), createElementBlock("div", _hoisted_38, [
              createVNode(_sfc_main$d, {
                providers: iframeProviders.value,
                "dark-mode": __props.darkMode,
                "loading-text": unref(t)("mount.filePreview.loadingPreview"),
                "error-text": unref(t)("mount.filePreview.previewError"),
                "selected-provider": selectedIframeProvider.value,
                onLoad: unref(handleContentLoaded),
                onError: unref(handleContentError),
                onProviderOptions: handleIframeProviderOptions
              }, null, 8, ["providers", "dark-mode", "loading-text", "error-text", "selected-provider", "onLoad", "onError"])
            ])) : isMarkdown.value ? (openBlock(), createElementBlock("div", {
              key: 9,
              class: normalizeClass(unref(isContentFullscreen) ? "fullscreen-text-container" : "")
            }, [
              createVNode(TextPreview, {
                ref_key: "textPreviewRef",
                ref: textPreviewRef,
                file: __props.file,
                "text-url": unref(authenticatedPreviewUrl),
                "dark-mode": __props.darkMode,
                "is-admin": __props.isAdmin,
                "current-path": unref(getCurrentDirectoryPath)(),
                "directory-items": __props.directoryItems,
                "initial-mode": textPreviewMode.value,
                "initial-encoding": textEncoding.value,
                "max-height": dynamicMaxHeight.value,
                onLoad: unref(handleContentLoaded),
                onError: unref(handleContentError),
                onModeChange: handleModeChange,
                onEncodingChange: handleEncodingChange
              }, null, 8, ["file", "text-url", "dark-mode", "is-admin", "current-path", "directory-items", "initial-mode", "initial-encoding", "max-height", "onLoad", "onError"])
            ], 2)) : isText.value ? (openBlock(), createElementBlock("div", {
              key: 10,
              class: normalizeClass(unref(isContentFullscreen) ? "fullscreen-text-container" : "")
            }, [
              createVNode(TextPreview, {
                ref_key: "textPreviewRef",
                ref: textPreviewRef,
                file: __props.file,
                "text-url": unref(authenticatedPreviewUrl),
                "dark-mode": __props.darkMode,
                "is-admin": __props.isAdmin,
                "current-path": unref(getCurrentDirectoryPath)(),
                "directory-items": __props.directoryItems,
                "initial-mode": textPreviewMode.value,
                "initial-encoding": textEncoding.value,
                "max-height": dynamicMaxHeight.value,
                onLoad: unref(handleContentLoaded),
                onError: unref(handleContentError),
                onModeChange: handleModeChange,
                onEncodingChange: handleEncodingChange
              }, null, 8, ["file", "text-url", "dark-mode", "is-admin", "current-path", "directory-items", "initial-mode", "initial-encoding", "max-height", "onLoad", "onError"])
            ], 2)) : unref(loadError) ? (openBlock(), createElementBlock("div", _hoisted_39, [
              createBaseVNode("div", _hoisted_40, [
                createVNode(unref(IconExclamationSolid), {
                  size: "5xl",
                  class: normalizeClass(["mx-auto mb-4", __props.darkMode ? "text-red-400" : "text-red-500"]),
                  "aria-hidden": "true"
                }, null, 8, ["class"]),
                createBaseVNode("p", {
                  class: normalizeClass(["text-lg font-medium mb-2", __props.darkMode ? "text-red-300" : "text-red-700"])
                }, toDisplayString(unref(t)("mount.filePreview.previewError")), 3),
                createBaseVNode("p", {
                  class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("mount.filePreview.retryLoad")), 3)
              ])
            ])) : isArchive.value ? (openBlock(), createElementBlock("div", _hoisted_41, [
              createVNode(ArchivePreview, {
                file: __props.file,
                "dark-mode": __props.darkMode,
                "authenticated-preview-url": unref(authenticatedPreviewUrl),
                onDownload: unref(handleDownload),
                onLoaded: unref(handleContentLoaded),
                onError: unref(handleContentError)
              }, null, 8, ["file", "dark-mode", "authenticated-preview-url", "onDownload", "onLoaded", "onError"])
            ])) : (openBlock(), createElementBlock("div", _hoisted_42, [
              createBaseVNode("div", _hoisted_43, [
                createVNode(unref(IconDocument), {
                  size: "5xl",
                  class: normalizeClass(["mx-auto mb-4", __props.darkMode ? "text-gray-500" : "text-gray-400"]),
                  "aria-hidden": "true"
                }, null, 8, ["class"]),
                createBaseVNode("p", {
                  class: normalizeClass(["text-lg font-medium mb-2", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, toDisplayString(unref(t)("mount.filePreview.cannotPreview")), 3),
                createBaseVNode("p", {
                  class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("mount.filePreview.downloadToView")), 3)
              ])
            ]))
          ], 6)
        ]),
        isVideo.value && unref(authenticatedPreviewUrl) && !unref(isContentFullscreen) ? (openBlock(), createElementBlock("div", _hoisted_44, [
          createVNode(ExternalPlayerDock, {
            "video-url": unref(authenticatedPreviewUrl),
            "file-name": __props.file?.name
          }, null, 8, ["video-url", "file-name"])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
const FilePreview = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d64bc88c"]]);
export {
  FilePreview as default
};
