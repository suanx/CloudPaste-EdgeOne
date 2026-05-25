const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/mountService-B4-YQ1h1.js","assets/index-BQxzU9F1.js","assets/storageConfigService-CIShtBVl.js"])))=>i.map(i=>d[i]);
import { c as createLogger, aK as _export_sfc, e as useI18n, g as ref, w as watch, u as useEventListener, M as createBlock, k as openBlock, j as createElementBlock, p as createCommentVNode, l as createBaseVNode, n as normalizeClass, t as toDisplayString, y as unref, K as Fragment, L as renderList, z as createVNode, A as createTextVNode, bb as IconClock, e4 as IconCheckbox, b8 as IconDocument, m as withModifiers, al as IconCopy, aV as Teleport, F as computed, o as onMounted, aP as nextTick, aY as onBeforeUnmount, G as IconClose, b5 as IconFolder, J as IconRefresh, ad as IconUpload, _ as __vitePreload, e5 as fetchUrlContent, e6 as validateUrlInfo, e7 as normalizeFsPath } from "./index-BQxzU9F1.js";
import { B as BasePlugin, r as resolveDriverByConfigId, a as readClientLedgerParts, P as PathResolver, u as useUppyCore, b as useUppyEvents, c as useUppyBackendProgress, d as useUppyPaste, e as useShareUploadController, S as STORAGE_STRATEGIES, f as _sfc_main$2, g as _sfc_main$3, h as _sfc_main$4, i as createUppyPluginManager, D as Dashboard, j as Sha256PreprocessPlugin } from "./UppyPluginManager-AHtBg_Vv.js";
/* empty css                   */
/* empty css                   */
/* empty css                   */
/* empty css                   */
import { u as useStorageConfigsStore } from "./storageConfigsStore-DUFoycii.js";
import { b as formatDateTimeWithSeconds } from "./timeUtils-D81jJILb.js";
import { c as copyToClipboard } from "./clipboard-GLHRBPpJ.js";
const log = createLogger("ServerResumePlugin");
class ServerResumePlugin extends BasePlugin {
  static VERSION = "1.0.0";
  constructor(uppy, opts) {
    super(uppy, {
      // 默认配置
      autoCheck: true,
      // 自动检测模式
      matchThreshold: 0.8,
      // 匹配阈值
      timeWindow: 24,
      // 时间窗口（小时）
      showConfirmDialog: true,
      // 显示确认对话框
      customMatcher: null,
      // 自定义匹配算法
      currentPath: "/",
      // 当前路径
      // 用户选择相关配置
      maxSelectionOptions: 5,
      // 最多显示几个选项
      showMatchScore: true,
      // 是否显示匹配分数
      // client_keeps（HuggingFace 等）需要用 localStorage 读本地账本
      storagePrefix: "uppy_multipart_",
      cacheExpiry: 24 * 60 * 60 * 1e3,
      // 24小时
      ...opts
    });
    this.type = "modifier";
    this.id = this.opts.id || "ServerResumePlugin";
    this.prepareUpload = this.prepareUpload.bind(this);
    this.checkResumableUploads = this.checkResumableUploads.bind(this);
    this.findBestMatches = this.findBestMatches.bind(this);
    this.calculateMatchScore = this.calculateMatchScore.bind(this);
    this.defaultLocale = {
      strings: {
        checkingResumableUploads: "检查可恢复的上传...",
        resumeUploadFound: "发现可恢复的上传",
        resumeUploadConfirm: "是否继续之前的上传？",
        resumingUpload: "恢复上传中..."
      }
    };
    this.i18nInit();
  }
  install() {
    this.uppy.addPreProcessor(this.prepareUpload);
    log.debug("插件已安装");
  }
  uninstall() {
    this.uppy.removePreProcessor(this.prepareUpload);
    log.debug("插件已卸载");
  }
  /**
   * 在上传前检查断点续传
   * @param {Array} fileIDs 文件ID数组
   * @returns {Promise} 处理完成的Promise
   */
  async prepareUpload(fileIDs) {
    if (!this.opts.autoCheck) {
      return Promise.resolve();
    }
    log.debug("开始检查断点续传...");
    const promises = fileIDs.map(async (fileID) => {
      const file = this.uppy.getFile(fileID);
      if (!this.shouldUseMultipart(file)) {
        log.debug(`文件 ${file.name} 不使用分片上传，跳过断点续传检查`);
        this.uppy.emit("preprocess-complete", file);
        return;
      }
      this.uppy.emit("preprocess-progress", file, {
        mode: "indeterminate",
        message: this.i18n("checkingResumableUploads")
      });
      try {
        const resumableUploads = await this.checkResumableUploads(file);
        if (resumableUploads.length > 0) {
          log.debug(`发现 ${resumableUploads.length} 个可恢复的上传`);
          const selectedUpload = await new Promise((resolve) => {
            this.showMultipleUploadsDialog(file, resumableUploads, resolve);
          });
          if (selectedUpload) {
            this.uppy.setFileMeta(fileID, {
              resumable: true,
              existingUpload: selectedUpload,
              serverResume: true
            });
            log.debug(`文件 ${file.name} 已标记为可恢复`);
          }
        }
      } catch (error) {
        log.error(`[ServerResumePlugin] 检查可恢复上传失败:`, error);
      }
      this.uppy.emit("preprocess-complete", file);
    });
    return Promise.all(promises);
  }
  /**
   * 判断文件是否会使用分片上传
   * @param {Object} file Uppy文件对象
   * @returns {boolean} 是否使用分片上传
   */
  shouldUseMultipart(file) {
    if (this.opts && Object.prototype.hasOwnProperty.call(this.opts, "shouldUseMultipart")) {
      const opt = this.opts.shouldUseMultipart;
      if (typeof opt === "function") {
        try {
          return !!opt(file);
        } catch (e) {
        }
      } else {
        return !!opt;
      }
    }
    const awsS3Plugin = this.uppy.getPlugin("AwsS3");
    if (awsS3Plugin && awsS3Plugin.opts.shouldUseMultipart) {
      if (typeof awsS3Plugin.opts.shouldUseMultipart === "function") {
        return awsS3Plugin.opts.shouldUseMultipart(file);
      } else {
        return awsS3Plugin.opts.shouldUseMultipart;
      }
    }
    return false;
  }
  /**
   * 检查可恢复的上传
   */
  async checkResumableUploads(file) {
    try {
      const currentPath = this.getCurrentPath();
      let response;
      if (typeof this.opts.resolveStorageConfigId === "function") {
        try {
          const configId = await this.opts.resolveStorageConfigId();
          if (configId) {
            const driver = resolveDriverByConfigId(configId);
            response = await driver.fs.listUploads({ path: currentPath });
          }
        } catch (e) {
        }
      }
      if (!response) return [];
      if (!response.success || !response.data.uploads) {
        return [];
      }
      const rawUploads = Array.isArray(response.data.uploads) ? response.data.uploads : [];
      return this.findBestMatches(rawUploads, file);
    } catch (error) {
      log.error("[ServerResumePlugin] 检查可恢复上传失败:", error);
      return [];
    }
  }
  /**
   * 智能匹配算法 - 多维度评分
   */
  findBestMatches(uploads, file) {
    if (this.opts.customMatcher) {
      return this.opts.customMatcher(uploads, file);
    }
    return uploads.map((upload) => ({
      upload,
      score: this.calculateMatchScore(upload, file)
    })).filter((item) => item.score >= this.opts.matchThreshold).sort((a, b) => b.score - a.score).map((item) => item.upload);
  }
  /**
   * 计算匹配分数
   */
  calculateMatchScore(upload, file) {
    let score = 0;
    const uploadSizeRaw = upload?.fileSize ?? upload?.file_size ?? null;
    const uploadSize = uploadSizeRaw == null ? null : Number(uploadSizeRaw);
    const currentSize = typeof file?.size === "number" ? file.size : null;
    if (uploadSize != null && Number.isFinite(uploadSize) && currentSize != null && Number.isFinite(currentSize)) {
      if (uploadSize === currentSize) {
        score += 0.3;
      } else {
        return 0;
      }
    }
    if (upload.key.endsWith(file.name)) {
      score += 0.4;
      const expectedPath = this.buildExpectedPath(file);
      if (upload.key === expectedPath) {
        score += 0.1;
      }
    }
    const hoursDiff = this.getHoursDiff(upload.initiated);
    if (hoursDiff <= this.opts.timeWindow) {
      score += 0.3 * (1 - hoursDiff / this.opts.timeWindow);
    }
    const similarity = this.calculateStringSimilarity(upload.key.split("/").pop(), file.name);
    score += 0.2 * similarity;
    return Math.min(score, 1);
  }
  /**
   * 显示多个上传选择对话框
   */
  showMultipleUploadsDialog(file, uploads, resolve) {
    const limitedUploads = uploads.slice(0, this.opts.maxSelectionOptions);
    this.showSelectDialog({
      file,
      uploads: limitedUploads,
      onSelect: (selectedUpload) => resolve(selectedUpload),
      onCancel: () => resolve(null)
    });
  }
  /**
   * 
   * 通过事件系统与 Vue 组件通信
   */
  async showSelectDialog(options) {
    const uploadsWithDetails = (await Promise.all(
      options.uploads.map(async (upload) => {
        try {
          const currentPath = this.getCurrentPath();
          const fullPath = `/${this.buildExpectedPath(options.file)}`.replace(/\/+/g, "/");
          let partsResponse;
          if (typeof this.opts.resolveStorageConfigId === "function") {
            try {
              const configId = await this.opts.resolveStorageConfigId();
              if (configId) {
                const driver = resolveDriverByConfigId(configId);
                partsResponse = await driver.fs.listParts({ path: fullPath, uploadId: upload.uploadId, fileName: options.file.name });
              }
            } catch (e) {
            }
          }
          if (!partsResponse) return null;
          let uploadedParts = [];
          let partErrors = [];
          if (partsResponse.success && partsResponse.data.parts) {
            uploadedParts = partsResponse.data.parts;
            log.debug(`上传 ${upload.uploadId.substring(0, 8)}... 有 ${uploadedParts.length} 个分片`);
          }
          if (partsResponse.success && Array.isArray(partsResponse.data?.errors)) {
            partErrors = partsResponse.data.errors;
          }
          try {
            const policy = partsResponse?.data?.policy || null;
            const ledgerPolicyRaw = policy?.partsLedgerPolicy ?? policy?.parts_ledger_policy ?? null;
            const ledgerPolicy = String(ledgerPolicyRaw || "");
            if (ledgerPolicy === "client_keeps") {
              const localParts = await this.getLocalUploadedParts(upload.key);
              if (Array.isArray(localParts) && localParts.length > 0) {
                uploadedParts = localParts;
                log.debug(`client_keeps：从本地账本读取到 ${localParts.length} 个分片`);
              }
            }
          } catch {
          }
          if (Array.isArray(uploadedParts) && uploadedParts.length === 0 && Array.isArray(partErrors) && partErrors.length === 0) {
            return null;
          }
          const bytesUploaded = Array.isArray(uploadedParts) ? uploadedParts.reduce((sum, p) => {
            const s = Number(p?.size ?? p?.Size ?? 0);
            if (!Number.isFinite(s) || s <= 0) return sum;
            return sum + s;
          }, 0) : 0;
          return {
            ...upload,
            matchScore: this.calculateMatchScore(upload, options.file),
            fileSize: options.file.size,
            uploadedParts,
            // 添加分片信息
            partErrors,
            // 添加失败分片信息
            bytesUploaded
          };
        } catch (error) {
          log.error(`[ServerResumePlugin] 获取上传 ${upload.uploadId} 的分片信息失败:`, error);
          return {
            ...upload,
            matchScore: this.calculateMatchScore(upload, options.file),
            fileSize: options.file.size,
            uploadedParts: [],
            // 失败时使用空数组
            partErrors: []
          };
        }
      })
    )).filter(Boolean);
    if (!uploadsWithDetails || uploadsWithDetails.length === 0) {
      try {
        options.onCancel?.();
      } catch {
      }
      return;
    }
    this.uppy.emit("server-resume-select-dialog", {
      file: options.file,
      uploads: uploadsWithDetails,
      showMatchScore: this.opts.showMatchScore,
      onSelect: options.onSelect,
      onCancel: options.onCancel
    });
  }
  /**
   * 获取当前路径
   */
  getCurrentPath() {
    if (this.opts.currentPath && this.opts.currentPath !== "/") {
      return this.opts.currentPath;
    }
    if (window.currentPath) {
      return window.currentPath;
    }
    return "/";
  }
  /**
   * 从 localStorage 读取“客户端账本”的已上传分片（client_keeps）
   * - StorageAdapter 会用 storagePrefix + storageKey 保存 {parts,timestamp}
   * - 这里只做“是否有进度”的判断：返回的数组长度>0 即视为可恢复
   */
  async getLocalUploadedParts(storageKey) {
    const parts = await readClientLedgerParts({
      storageKey,
      storagePrefix: this.opts.storagePrefix || "uppy_multipart_",
      cacheExpiry: this.opts.cacheExpiry || 24 * 60 * 60 * 1e3
    });
    return (Array.isArray(parts) ? parts : []).map((p) => ({
      partNumber: Number(p?.PartNumber ?? p?.partNumber),
      etag: p?.ETag ?? p?.etag ?? null,
      size: Number(p?.Size ?? p?.size ?? 0)
    })).filter((p) => Number.isFinite(p.partNumber) && p.partNumber > 0);
  }
  /**
   * 构建期望的文件路径
   */
  buildExpectedPath(file) {
    const currentPath = this.getCurrentPath();
    const resolver = new PathResolver(currentPath);
    const full = resolver.buildFullPathFromKey(file?.name || "");
    return String(full || "").replace(/^\/+/, "");
  }
  /**
   * 计算时间差（小时）
   */
  getHoursDiff(initiated) {
    const uploadTime = new Date(initiated);
    const now = /* @__PURE__ */ new Date();
    return (now - uploadTime) / (1e3 * 60 * 60);
  }
  /**
   * 计算字符串相似度
   */
  calculateStringSimilarity(str1, str2) {
    if (str1 === str2) return 1;
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    if (longer.length === 0) return 1;
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }
  /**
   * 计算编辑距离
   */
  levenshteinDistance(str1, str2) {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
        }
      }
    }
    return matrix[str2.length][str1.length];
  }
}
const _hoisted_1$1 = { class: "px-6 py-4" };
const _hoisted_2$1 = { class: "max-h-96 overflow-y-auto space-y-3 custom-scrollbar" };
const _hoisted_3$1 = ["onClick"];
const _hoisted_4$1 = { class: "flex items-center justify-between" };
const _hoisted_5$1 = { class: "flex-1 min-w-0" };
const _hoisted_6$1 = { class: "flex items-center gap-2 mb-2" };
const _hoisted_7$1 = {
  key: 0,
  class: "px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 flex-shrink-0"
};
const _hoisted_8 = { class: "space-y-2" };
const _hoisted_9 = { class: "inline-flex items-center gap-1" };
const _hoisted_10 = {
  key: 0,
  class: "inline-flex items-center gap-1"
};
const _hoisted_11 = {
  key: 1,
  class: "text-gray-300 dark:text-gray-600"
};
const _hoisted_12 = { class: "inline-flex items-center gap-1 flex-wrap" };
const _hoisted_13 = { class: "inline-flex items-center gap-1 text-red-600 dark:text-red-400" };
const _hoisted_14 = ["onClick", "title"];
const _hoisted_15 = { class: "ml-4 flex-shrink-0" };
const _hoisted_16 = {
  key: 0,
  class: "w-2 h-2 bg-white rounded-full"
};
const _sfc_main$1 = {
  __name: "SelectUploadDialog",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    file: {
      type: Object,
      default: null
    },
    uploads: {
      type: Array,
      default: () => []
    },
    showMatchScore: {
      type: Boolean,
      default: true
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    allowBackdropClose: {
      type: Boolean,
      default: true
    }
  },
  emits: ["select", "cancel", "close"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const log2 = createLogger("SelectUploadDialog");
    const props = __props;
    const emit = __emit;
    const selectedIndex = ref(-1);
    watch(
      () => props.isOpen,
      (newValue) => {
        if (newValue) {
          selectedIndex.value = props.uploads.length > 0 ? 0 : -1;
        } else {
          selectedIndex.value = -1;
        }
      }
    );
    const formatDate = (dateString) => {
      return formatDateTimeWithSeconds(dateString);
    };
    const getMatchScoreDisplay = (upload, index) => {
      if (upload.matchScore !== void 0) {
        return (upload.matchScore * 100).toFixed(1);
      }
      const baseScore = 95 - index * 5;
      return Math.max(baseScore, 60).toFixed(1);
    };
    const getUploadedPartsInfo = (upload) => {
      const buildProgressText = () => {
        const totalBytes = Number(upload?.fileSize) || 0;
        if (!Number.isFinite(totalBytes) || totalBytes <= 0) return "";
        let uploadedBytes = Number(upload?.bytesUploaded);
        if (!Number.isFinite(uploadedBytes) || uploadedBytes < 0) {
          const parts = Array.isArray(upload?.uploadedParts) ? upload.uploadedParts : upload?.parts;
          if (!Array.isArray(parts) || parts.length === 0) return "";
          uploadedBytes = parts.reduce((sum, p) => {
            const s = Number(p?.size ?? p?.Size ?? 0);
            if (!Number.isFinite(s) || s <= 0) return sum;
            return sum + s;
          }, 0);
        }
        uploadedBytes = Math.min(Math.max(0, uploadedBytes), totalBytes);
        const uploadedMB = (uploadedBytes / (1024 * 1024)).toFixed(1);
        const totalMB = (totalBytes / (1024 * 1024)).toFixed(1);
        const percentage = totalBytes > 0 ? (uploadedBytes / totalBytes * 100).toFixed(1) : "0.0";
        return t("common.dialogs.selectUpload.progressInfo", {
          percentage,
          uploaded: uploadedMB,
          total: totalMB
        });
      };
      const progressText = buildProgressText();
      if (upload.uploadedParts && Array.isArray(upload.uploadedParts)) {
        const partCount = upload.uploadedParts.length;
        if (partCount > 0) {
          const partSize = Number(upload.partSize) > 0 ? Number(upload.partSize) : 5 * 1024 * 1024;
          const totalParts = upload.fileSize ? Math.ceil(upload.fileSize / partSize) : "?";
          return {
            partsText: t("common.dialogs.selectUpload.partsInfo", { count: partCount, total: totalParts }),
            progressText
          };
        }
      }
      if (upload.parts && Array.isArray(upload.parts)) {
        const partCount = upload.parts.length;
        if (partCount > 0) {
          const partSize = Number(upload.partSize) > 0 ? Number(upload.partSize) : 5 * 1024 * 1024;
          const totalParts = upload.fileSize ? Math.ceil(upload.fileSize / partSize) : "?";
          return {
            partsText: t("common.dialogs.selectUpload.partsInfo", { count: partCount, total: totalParts }),
            progressText
          };
        }
      }
      if (progressText) {
        return {
          partsText: t("common.dialogs.selectUpload.partialComplete"),
          progressText
        };
      }
      if (upload.progress && upload.progress.uploadedBytes && upload.progress.totalBytes) {
        const percentage = (upload.progress.uploadedBytes / upload.progress.totalBytes * 100).toFixed(1);
        const uploadedMB = (upload.progress.uploadedBytes / (1024 * 1024)).toFixed(1);
        const totalMB = (upload.progress.totalBytes / (1024 * 1024)).toFixed(1);
        return {
          partsText: t("common.dialogs.selectUpload.partialComplete"),
          progressText: t("common.dialogs.selectUpload.progressInfo", { percentage, uploaded: uploadedMB, total: totalMB })
        };
      }
      if (upload.partNumber && typeof upload.partNumber === "number") {
        return {
          partsText: t("common.dialogs.selectUpload.atLeastParts", { count: upload.partNumber }),
          progressText: ""
        };
      }
      return {
        partsText: t("common.dialogs.selectUpload.partialComplete"),
        progressText: ""
      };
    };
    const getPartErrorsCount = (upload) => {
      const errors = upload?.partErrors;
      if (!Array.isArray(errors)) return 0;
      return errors.length;
    };
    const formatUploadId = (uploadId) => {
      if (!uploadId) return "";
      if (uploadId.length > 8) {
        return `${uploadId.substring(0, 6)}...${uploadId.substring(uploadId.length - 4)}`;
      }
      return uploadId;
    };
    const copyUploadId = async (uploadId) => {
      try {
        const success = await copyToClipboard(uploadId);
        if (!success) {
          throw new Error("copy_failed");
        }
      } catch (error) {
        log2.error("复制失败:", error);
      }
    };
    const handleConfirm = () => {
      if (selectedIndex.value >= 0) {
        const selectedUpload = props.uploads[selectedIndex.value];
        emit("select", selectedUpload);
        emit("close");
      }
    };
    const handleCancel = () => {
      emit("cancel");
      emit("close");
    };
    const handleBackdropClick = () => {
      if (props.allowBackdropClose) {
        handleCancel();
      }
    };
    const handleKeydown = (event) => {
      if (!props.isOpen) return;
      switch (event.key) {
        case "Escape":
          handleCancel();
          break;
        case "Enter":
          if (selectedIndex.value >= 0) {
            handleConfirm();
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          if (selectedIndex.value > 0) {
            selectedIndex.value--;
          }
          break;
        case "ArrowDown":
          event.preventDefault();
          if (selectedIndex.value < props.uploads.length - 1) {
            selectedIndex.value++;
          }
          break;
      }
    };
    useEventListener(document, "keydown", handleKeydown);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        __props.isOpen ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "fixed inset-0 z-[70] overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4",
          onClick: handleBackdropClick
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["relative w-full max-w-2xl rounded-lg shadow-xl", __props.darkMode ? "bg-gray-800" : "bg-white"]),
            onClick: _cache[0] || (_cache[0] = withModifiers(() => {
            }, ["stop"]))
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["px-6 py-4 border-b", __props.darkMode ? "border-gray-700" : "border-gray-200"])
            }, [
              createBaseVNode("h3", {
                class: normalizeClass(["text-lg font-semibold", __props.darkMode ? "text-gray-100" : "text-gray-900"])
              }, toDisplayString(unref(t)("common.dialogs.selectUpload.title")), 3),
              createBaseVNode("p", {
                class: normalizeClass(["text-sm mt-1", __props.darkMode ? "text-gray-400" : "text-gray-500"])
              }, toDisplayString(unref(t)("common.dialogs.selectUpload.description", { count: __props.uploads.length })), 3)
            ], 2),
            createBaseVNode("div", _hoisted_1$1, [
              createBaseVNode("div", _hoisted_2$1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.uploads, (upload, index) => {
                  return openBlock(), createElementBlock("div", {
                    key: upload.uploadId || index,
                    class: normalizeClass(["p-4 border rounded-lg cursor-pointer transition-all duration-200", [
                      selectedIndex.value === index ? __props.darkMode ? "border-blue-500 bg-blue-900/20 ring-1 ring-blue-500/50" : "border-blue-500 bg-blue-50 ring-1 ring-blue-500/50" : __props.darkMode ? "border-gray-600 hover:border-gray-500 hover:bg-gray-700/50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                      index === 0 ? "ring-2 ring-green-200 dark:ring-green-800" : ""
                    ]]),
                    onClick: ($event) => selectedIndex.value = index
                  }, [
                    createBaseVNode("div", _hoisted_4$1, [
                      createBaseVNode("div", _hoisted_5$1, [
                        createBaseVNode("div", _hoisted_6$1, [
                          createBaseVNode("span", {
                            class: normalizeClass(["font-medium truncate", __props.darkMode ? "text-gray-100" : "text-gray-900"])
                          }, toDisplayString(upload.key), 3),
                          index === 0 ? (openBlock(), createElementBlock("span", _hoisted_7$1, toDisplayString(unref(t)("common.dialogs.selectUpload.recommended")), 1)) : createCommentVNode("", true)
                        ]),
                        createBaseVNode("div", _hoisted_8, [
                          createBaseVNode("div", {
                            class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                          }, [
                            createBaseVNode("span", _hoisted_9, [
                              createVNode(unref(IconClock), {
                                size: "sm",
                                class: "flex-shrink-0"
                              }),
                              createTextVNode(" " + toDisplayString(formatDate(upload.initiated)), 1)
                            ])
                          ], 2),
                          createBaseVNode("div", {
                            class: normalizeClass(["flex items-center gap-3 text-sm flex-wrap", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                          }, [
                            __props.showMatchScore ? (openBlock(), createElementBlock("span", _hoisted_10, [
                              createVNode(unref(IconCheckbox), {
                                size: "sm",
                                class: "flex-shrink-0"
                              }),
                              createTextVNode(" " + toDisplayString(unref(t)("common.dialogs.selectUpload.matchScore", { score: getMatchScoreDisplay(upload, index) })), 1)
                            ])) : createCommentVNode("", true),
                            __props.showMatchScore ? (openBlock(), createElementBlock("span", _hoisted_11, "•")) : createCommentVNode("", true),
                            createBaseVNode("span", _hoisted_12, [
                              createVNode(unref(IconDocument), {
                                size: "sm",
                                class: "flex-shrink-0"
                              }),
                              createBaseVNode("span", null, toDisplayString(getUploadedPartsInfo(upload).partsText), 1),
                              getUploadedPartsInfo(upload).progressText ? (openBlock(), createElementBlock("span", {
                                key: 0,
                                class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                              }, " · " + toDisplayString(getUploadedPartsInfo(upload).progressText), 3)) : createCommentVNode("", true)
                            ]),
                            getPartErrorsCount(upload) > 0 ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                              _cache[1] || (_cache[1] = createBaseVNode("span", { class: "text-gray-300 dark:text-gray-600" }, "•", -1)),
                              createBaseVNode("span", _hoisted_13, toDisplayString(unref(t)("common.dialogs.selectUpload.partErrors", { count: getPartErrorsCount(upload) })), 1)
                            ], 64)) : createCommentVNode("", true),
                            upload.uploadId ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                              _cache[2] || (_cache[2] = createBaseVNode("span", { class: "text-gray-300 dark:text-gray-600" }, "•", -1)),
                              createBaseVNode("button", {
                                onClick: withModifiers(($event) => copyUploadId(upload.uploadId), ["stop"]),
                                class: "text-xs hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer inline-flex items-center gap-1",
                                title: unref(t)("common.dialogs.selectUpload.copyIdTooltip", { id: upload.uploadId })
                              }, [
                                createBaseVNode("span", null, "ID " + toDisplayString(formatUploadId(upload.uploadId)), 1),
                                createVNode(unref(IconCopy), { size: "xs" })
                              ], 8, _hoisted_14)
                            ], 64)) : createCommentVNode("", true)
                          ], 2)
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_15, [
                        createBaseVNode("div", {
                          class: normalizeClass(["w-5 h-5 rounded-full border-2 flex items-center justify-center", selectedIndex.value === index ? "border-blue-500 bg-blue-500" : __props.darkMode ? "border-gray-500" : "border-gray-300"])
                        }, [
                          selectedIndex.value === index ? (openBlock(), createElementBlock("div", _hoisted_16)) : createCommentVNode("", true)
                        ], 2)
                      ])
                    ])
                  ], 10, _hoisted_3$1);
                }), 128))
              ])
            ]),
            createBaseVNode("div", {
              class: normalizeClass(["px-6 py-4 border-t flex justify-end space-x-3", __props.darkMode ? "border-gray-700" : "border-gray-200"])
            }, [
              createBaseVNode("button", {
                onClick: handleCancel,
                class: normalizeClass(["px-4 py-2 text-sm font-medium rounded-md transition-colors", __props.darkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"])
              }, toDisplayString(unref(t)("common.dialogs.selectUpload.reupload")), 3),
              createBaseVNode("button", {
                onClick: handleConfirm,
                class: normalizeClass(["px-4 py-2 text-sm font-medium rounded-md transition-colors", __props.darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"])
              }, toDisplayString(unref(t)("common.dialogs.selectUpload.resumeSelected")), 3)
            ], 2)
          ], 2)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
const SelectUploadDialog = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c90f0dcf"]]);
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 z-[60] overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 pt-20 sm:pt-4"
};
const _hoisted_2 = { class: "flex-1 p-4 overflow-y-auto" };
const _hoisted_3 = { class: "flex justify-between items-center" };
const _hoisted_4 = { class: "flex items-center space-x-4" };
const _hoisted_5 = { class: "flex items-center space-x-2" };
const _hoisted_6 = { class: "flex items-center space-x-2" };
const _hoisted_7 = ["disabled"];
const _sfc_main = {
  __name: "UppyUploadModal",
  props: {
    isOpen: { type: Boolean, default: false },
    darkMode: { type: Boolean, default: false },
    currentPath: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
  },
  emits: ["close", "upload-success", "upload-error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { locale, t } = useI18n();
    const log2 = createLogger("UppyUploadModal");
    const { uppyInstance, initializeUppy, destroyUppy } = useUppyCore();
    const { fileCount } = useUppyEvents({
      uppy: uppyInstance,
      onFileAdded: (file) => {
        ensureUploadIdForFile(file);
        errorMessage.value = "";
      },
      onFileRemoved: (file) => {
      },
      onError: (error) => {
        const message = error?.message || t("file.messages.uploadFailed");
        errorMessage.value = message;
      }
    });
    useUppyPaste({
      uppy: uppyInstance,
      enabled: computed(() => props.isOpen),
      onPaste: (file) => {
      }
    });
    const uppyContainerRef = ref(null);
    const uploadMethod = ref("presigned");
    const canUsePresigned = ref(true);
    const canUseMultipart = ref(true);
    const canUseStream = ref(true);
    const canUseForm = ref(true);
    const currentDriverType = ref(null);
    const errorMessage = ref("");
    const isUploading = ref(false);
    const mediaPlugins = ref([]);
    const showSelectUploadDialog = ref(false);
    const selectUploadData = ref({
      file: null,
      uploads: [],
      showMatchScore: true,
      onSelect: null,
      onCancel: null
    });
    let pluginManager = null;
    let fsAdapterHandle = null;
    let fsUploadSession = null;
    const disposeFsAdapterHandle = () => {
      if (fsAdapterHandle?.adapter?.destroy) {
        try {
          fsAdapterHandle.adapter.destroy();
        } catch (error) {
          log2.warn("[Uppy] 清理StorageAdapter失败", error);
        }
      }
      fsAdapterHandle = null;
    };
    const disposeFsSession = (shouldCancel = false) => {
      if (shouldCancel) {
        try {
          fsUploadSession?.cancel?.();
        } catch {
        }
      }
      try {
        fsUploadSession?.destroy?.();
      } catch {
      }
      fsUploadSession = null;
    };
    const storageConfigsStore = useStorageConfigsStore();
    const { createFsUploadSession } = useShareUploadController();
    const driverStrategy = ref(STORAGE_STRATEGIES.PRESIGNED_SINGLE);
    const mountsCache = ref([]);
    const mountsLoading = ref(false);
    const enforceUploadMethodByDriver = (driver) => {
      const fsCaps = driver?.capabilities?.fs || {};
      const allowPresigned = fsCaps.presignedSingle === true;
      const allowMultipart = fsCaps.multipart === true;
      const allowStream = fsCaps.backendStream !== false;
      const allowForm = fsCaps.backendForm !== false;
      canUsePresigned.value = allowPresigned;
      canUseMultipart.value = allowMultipart;
      canUseStream.value = allowStream;
      canUseForm.value = allowForm;
      currentDriverType.value = driver?.config?.storage_type || driver?.type || null;
      const pickFallback = () => {
        if (allowMultipart) return "multipart";
        if (allowPresigned) return "presigned";
        if (allowStream) return "stream";
        if (allowForm) return "form";
        return "stream";
      };
      if (uploadMethod.value === "presigned" && !allowPresigned) uploadMethod.value = pickFallback();
      if (uploadMethod.value === "multipart" && !allowMultipart) uploadMethod.value = pickFallback();
      if (uploadMethod.value === "stream" && !allowStream) uploadMethod.value = pickFallback();
      if (uploadMethod.value === "form" && !allowForm) uploadMethod.value = pickFallback();
    };
    const getMountRootFromPath = (path) => {
      const normalized = normalizeFsPath(path);
      const segments = normalized.split("/").filter(Boolean);
      if (!segments.length) return null;
      return `/${segments[0]}`;
    };
    const ensureMountsLoaded = async () => {
      if (mountsCache.value.length || mountsLoading.value) return;
      mountsLoading.value = true;
      try {
        const { useAdminMountService } = await __vitePreload(async () => {
          const { useAdminMountService: useAdminMountService2 } = await import("./mountService-B4-YQ1h1.js");
          return { useAdminMountService: useAdminMountService2 };
        }, true ? __vite__mapDeps([0,1]) : void 0);
        const { getMountsList } = useAdminMountService();
        const mounts = await getMountsList();
        mountsCache.value = Array.isArray(mounts) ? mounts : [];
      } catch (error) {
        log2.error("[Uppy] 加载挂载列表失败", error);
      } finally {
        mountsLoading.value = false;
      }
    };
    const getStorageConfigIdForCurrentPath = async () => {
      await ensureMountsLoaded();
      const mountRoot = getMountRootFromPath(props.currentPath);
      if (!mountRoot) return null;
      const mount = mountsCache.value.find((item) => item.mount_path === mountRoot);
      return mount?.storage_config_id || null;
    };
    const ensureStorageConfigForCurrentPath = async () => {
      const id = await getStorageConfigIdForCurrentPath();
      if (!id) throw new Error(t("file.messages.noStorageConfig"));
      let loadError = null;
      try {
        if (!storageConfigsStore.hasFreshCache.value) {
          await storageConfigsStore.loadConfigs();
        }
      } catch (e) {
        loadError = e;
      }
      if (storageConfigsStore.getConfigById(id)) return id;
      if (loadError) {
        throw loadError;
      }
      try {
        const { useAdminStorageConfigService } = await __vitePreload(async () => {
          const { useAdminStorageConfigService: useAdminStorageConfigService2 } = await import("./storageConfigService-CIShtBVl.js");
          return { useAdminStorageConfigService: useAdminStorageConfigService2 };
        }, true ? __vite__mapDeps([2,1]) : void 0);
        const { getStorageConfigs } = useAdminStorageConfigService();
        const resp = await getStorageConfigs();
        if (resp?.data) {
          storageConfigsStore.replaceConfigs(resp.data);
          if (storageConfigsStore.getConfigById(id)) return id;
        }
      } catch (e) {
      }
      throw new Error(`${t("file.messages.noStorageConfig")}: ${id}`);
    };
    const uploadModes = computed(() => {
      return [
        {
          value: "presigned",
          label: t("mount.uppy.presignedUpload"),
          modeLabel: t("mount.uppy.presignedMode"),
          tooltip: t("mount.uppy.presignedModeTooltip"),
          disabled: !canUsePresigned.value
        },
        {
          value: "stream",
          label: t("mount.uppy.streamUpload"),
          modeLabel: t("mount.uppy.streamMode"),
          tooltip: t("mount.uppy.streamModeTooltip"),
          disabled: !canUseStream.value
        },
        {
          value: "form",
          label: t("mount.uppy.formUpload"),
          modeLabel: t("mount.uppy.formMode"),
          tooltip: t("mount.uppy.formModeTooltip"),
          disabled: !canUseForm.value
        },
        {
          value: "multipart",
          label: t("mount.uppy.multipartUpload"),
          modeLabel: t("mount.uppy.multipartMode"),
          tooltip: t("mount.uppy.multipartModeTooltip"),
          badge: t("mount.uppy.resumeSupport"),
          disabled: !canUseMultipart.value
        }
      ];
    });
    const {
      ensureUploadIdForFile,
      resetBackendProgressTracking,
      updateBrowserProgressState,
      startBackendProgressPolling
    } = useUppyBackendProgress({
      uppy: uppyInstance,
      isDirectMode: () => uploadMethod.value === "stream"
    });
    const canStartUpload = computed(() => {
      const hasFiles = fileCount.value > 0 && !isUploading.value;
      if (!hasFiles) return false;
      if (uploadMethod.value === "presigned") return canUsePresigned.value === true;
      if (uploadMethod.value === "multipart") return canUseMultipart.value === true;
      if (uploadMethod.value === "stream") return canUseStream.value === true;
      if (uploadMethod.value === "form") return canUseForm.value === true;
      return false;
    });
    const enabledPluginsCount = computed(() => {
      return pluginManager ? pluginManager.getEnabledPluginsCount() : 0;
    });
    const togglePlugin = (pluginKey) => {
      if (pluginManager) {
        pluginManager.togglePlugin(pluginKey);
        mediaPlugins.value = pluginManager.getPluginList();
        if (props.isOpen && uppyInstance.value) {
          setupUppy();
        }
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
          name: t("mount.uppy.fileName"),
          placeholder: t("mount.uppy.customFilename")
        }
      ],
      locale: {
        strings: {
          dataUploadedOfTotal: "%{complete} / %{total}"
        }
      }
    });
    const getServerResumeConfig = () => ({
      autoCheck: true,
      matchThreshold: 0.8,
      timeWindow: 24,
      showConfirmDialog: true,
      currentPath: props.currentPath,
      maxSelectionOptions: 5,
      showMatchScore: true,
      shouldUseMultipart: () => uploadMethod.value === "multipart",
      resolveStorageConfigId: async () => await ensureStorageConfigForCurrentPath(),
      // 让 ServerResumePlugin 能读取 StorageAdapter 的本地分片账本（client_keeps）
      storagePrefix: fsAdapterHandle?.adapter?.config?.storagePrefix || "uppy_multipart_",
      cacheExpiry: fsAdapterHandle?.adapter?.config?.cacheExpiry || 24 * 60 * 60 * 1e3
    });
    const strategyMap = {
      stream: STORAGE_STRATEGIES.BACKEND_STREAM,
      // 流式直传：PUT /fs/upload
      form: STORAGE_STRATEGIES.BACKEND_FORM,
      // 表单上传：POST /fs/upload
      presigned: STORAGE_STRATEGIES.PRESIGNED_SINGLE,
      multipart: STORAGE_STRATEGIES.PRESIGNED_MULTIPART
    };
    const configureUploadMethod = async () => {
      try {
        const storageConfigId = await ensureStorageConfigForCurrentPath();
        const driver = resolveDriverByConfigId(storageConfigId);
        enforceUploadMethodByDriver(driver);
        driverStrategy.value = strategyMap[uploadMethod.value] || STORAGE_STRATEGIES.BACKEND_STREAM;
        if (driver?.fs?.applyFsUploader && (driverStrategy.value === STORAGE_STRATEGIES.PRESIGNED_SINGLE || driverStrategy.value === STORAGE_STRATEGIES.PRESIGNED_MULTIPART || driverStrategy.value === STORAGE_STRATEGIES.BACKEND_STREAM || driverStrategy.value === STORAGE_STRATEGIES.BACKEND_FORM)) {
          disposeFsAdapterHandle();
          const handle = driver.fs.applyFsUploader(uppyInstance.value, { strategy: driverStrategy.value, path: props.currentPath });
          fsAdapterHandle = handle ? { ...handle, mode: handle.mode || driverStrategy.value } : null;
        }
      } catch (e) {
        log2.warn("[Uppy] configureUploadMethod 解析驱动失败", e);
        disposeFsAdapterHandle();
      }
    };
    const configureServerResumePlugin = () => {
      const uppy = uppyInstance.value;
      if (!uppy) return;
      const existing = uppy.getPlugin("ServerResumePlugin");
      if (uploadMethod.value === "multipart") {
        const opts = getServerResumeConfig();
        if (existing) {
          try {
            existing.setOptions(opts);
          } catch (e) {
            log2.warn("[Uppy] 更新 ServerResumePlugin 配置失败", e);
          }
        } else {
          uppy.use(ServerResumePlugin, opts);
        }
      } else if (existing) {
        try {
          uppy.removePlugin(existing);
        } catch (e) {
          log2.warn("[Uppy] 移除 ServerResumePlugin 失败（可忽略）", e);
        }
      }
    };
    const configureSha256PreprocessPlugin = () => {
      const uppy = uppyInstance.value;
      if (!uppy) return;
      const existing = uppy.getPlugin("Sha256PreprocessPlugin");
      const requireSha256ForPresign = fsAdapterHandle?.adapter?.config?.requireSha256ForPresign === true;
      if ((uploadMethod.value === "presigned" || uploadMethod.value === "multipart") && requireSha256ForPresign) {
        const opts = {
          enabled: true,
          maxWebCryptoSize: 1e7,
          metaKey: "cloudpasteSha256"
        };
        if (existing) {
          try {
            existing.setOptions(opts);
          } catch (e) {
            log2.warn("[Uppy] 更新 Sha256PreprocessPlugin 配置失败", e);
          }
        } else {
          uppy.use(Sha256PreprocessPlugin, opts);
        }
      } else if (existing) {
        try {
          uppy.removePlugin(existing);
        } catch (e) {
          log2.warn("[Uppy] 移除 Sha256PreprocessPlugin 失败（可忽略）", e);
        }
      }
    };
    const setupResumeDialogEvents = () => {
      uppyInstance.value.on("server-resume-select-dialog", (data) => {
        selectUploadData.value = {
          file: data.file,
          uploads: data.uploads,
          showMatchScore: data.showMatchScore,
          onSelect: data.onSelect,
          onCancel: data.onCancel
        };
        showSelectUploadDialog.value = true;
      });
    };
    const setupUppy = async () => {
      try {
        if (uppyInstance.value) {
          disposeFsSession(true);
          destroyUppy();
        }
        disposeFsAdapterHandle();
        await initializeUppy({
          id: "new-uppy-dashboard",
          locale: locale.value
        });
        pluginManager = createUppyPluginManager(uppyInstance.value, locale.value);
        mediaPlugins.value = pluginManager.getPluginList();
        pluginManager.setUrlImportCallbacks({
          validateUrlInfo,
          fetchUrlContent
        });
        uppyInstance.value.use(Dashboard, getDashboardConfig());
        configureServerResumePlugin();
        if (uploadMethod.value === "multipart") {
          setupResumeDialogEvents();
        }
        await configureUploadMethod();
        configureServerResumePlugin();
        configureSha256PreprocessPlugin();
        await pluginManager.addPluginsToUppy();
      } catch (error) {
        log2.error("[Uppy] 初始化失败:", error);
        errorMessage.value = t("mount.uppy.initializationFailed", { message: error.message });
      }
    };
    const handleUploadComplete = async (result) => {
      isUploading.value = false;
      if (result.successful.length > 0) {
        let skippedUploadCount = 0;
        try {
          const fromMeta = result.successful.filter((file) => file?.meta?.cloudpasteSkipUpload === true).length;
          const fromCloudpaste = Number(result?.cloudpaste?.skippedUploadCount || 0);
          skippedUploadCount = Math.max(fromMeta, fromCloudpaste);
        } catch {
          skippedUploadCount = Number(result?.cloudpaste?.skippedUploadCount || 0);
        }
        const successCount = result.successful.length;
        const message = skippedUploadCount > 0 ? `上传完成：成功 ${successCount} 个（其中 ${skippedUploadCount} 个已跳过上传/秒传）` : `上传完成：成功 ${successCount} 个`;
        emit("upload-success", {
          count: result.successful.length,
          skippedUploadCount,
          message,
          commitFailures: [],
          commitStats: {
            successCount: result.successful.length,
            failureCount: 0,
            totalCount: result.successful.length
          },
          results: result.successful.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
            url: file.uploadURL
          }))
        });
        setTimeout(() => {
          if (uppyInstance.value) {
            uppyInstance.value.clear();
          }
        }, 4e3);
      }
      if (result.failed.length > 0) {
        const firstError = result.failed[0].error;
        emit("upload-error", new Error(firstError?.message || "上传失败"));
      }
    };
    const runFsCommitIfNeeded = async (result) => {
      if (!result) return;
      result.failed = result.failed || [];
      result.successful = result.successful || [];
      if (!fsAdapterHandle?.adapter || fsAdapterHandle.mode !== STORAGE_STRATEGIES.PRESIGNED_SINGLE) {
        return;
      }
      if (!result.successful.length) {
        return;
      }
      const adapter = fsAdapterHandle.adapter;
      const skipSnapshot = {};
      try {
        if (adapter?.isUploadSkipped && typeof adapter.isUploadSkipped === "function") {
          result.successful.forEach((file) => {
            skipSnapshot[file.id] = adapter.isUploadSkipped(file.id) === true;
          });
        }
      } catch (e) {
        log2.warn("[Uppy] 生成 skipUpload 快照失败，将忽略该提示", e);
      }
      try {
        const summary = await fsAdapterHandle.adapter.batchCommitPresignedUploads(result.successful);
        const failures = summary?.failures || [];
        if (!failures.length) {
          result.cloudpaste = {
            ...result.cloudpaste || {},
            skippedUploadCount: result.successful.filter((file) => skipSnapshot[file.id] === true).length
          };
          return;
        }
        const failureMap = /* @__PURE__ */ new Map();
        failures.forEach((failure) => {
          const error = new Error(failure.error || "提交预签名上传失败");
          failureMap.set(failure.fileId, error);
        });
        const remaining = [];
        result.successful.forEach((file) => {
          const failureError = failureMap.get(file.id);
          if (failureError) {
            try {
              uppyInstance.value?.emit?.("upload-error", file, failureError);
            } catch {
            }
            result.failed.push({ file, error: failureError });
          } else {
            remaining.push(file);
          }
        });
        result.successful = remaining;
        result.cloudpaste = {
          ...result.cloudpaste || {},
          skippedUploadCount: result.successful.filter((file) => skipSnapshot[file.id] === true).length
        };
      } catch (error) {
        const failureError = error instanceof Error ? error : new Error(String(error));
        const failedFiles = result.successful.slice();
        failedFiles.forEach((file) => {
          try {
            uppyInstance.value?.emit?.("upload-error", file, failureError);
          } catch {
          }
          result.failed.push({ file, error: failureError });
        });
        result.successful = [];
        result.cloudpaste = {
          ...result.cloudpaste || {},
          skippedUploadCount: 0
        };
      }
    };
    const normalizeFsUploadError = (error) => {
      if (!error) {
        return t("file.messages.uploadFailed");
      }
      const status = error?.request?.status || error?.response?.status;
      const body = error?.response?.body;
      const code = body?.code || error.code;
      if (status === 403 || code === "FS_PERMISSION_DENIED") {
        return t("file.messages.permissionError");
      }
      if (typeof body?.message === "string" && body.message) {
        return body.message;
      }
      if (typeof error.message === "string" && error.message) {
        return error.message;
      }
      return t("file.messages.uploadFailed");
    };
    const startUpload = async () => {
      if (!uppyInstance.value || !canStartUpload.value || isUploading.value) {
        return;
      }
      try {
        errorMessage.value = "";
        isUploading.value = true;
        const storageConfigId = await ensureStorageConfigForCurrentPath();
        try {
          const driver = resolveDriverByConfigId(storageConfigId);
          enforceUploadMethodByDriver(driver);
        } catch (e) {
          log2.warn("[Uppy] startUpload 驱动解析失败", e);
        }
        driverStrategy.value = strategyMap[uploadMethod.value] || STORAGE_STRATEGIES.BACKEND_STREAM;
        disposeFsSession();
        resetBackendProgressTracking();
        fsUploadSession = createFsUploadSession({
          storageConfigId,
          fsOptions: { strategy: driverStrategy.value, path: props.currentPath },
          uppy: uppyInstance.value,
          events: {
            onProgress: (progress) => {
              if (progress) {
                updateBrowserProgressState(progress);
              }
            },
            onError: ({ error }) => {
              errorMessage.value = normalizeFsUploadError(error);
            },
            onComplete: async (result) => {
              try {
                await runFsCommitIfNeeded(result);
                await handleUploadComplete(result);
              } finally {
                resetBackendProgressTracking();
                disposeFsSession();
              }
            }
          }
        });
        if (uploadMethod.value === "stream") {
          try {
            uppyInstance.value.getFiles().forEach((file) => ensureUploadIdForFile(file));
          } catch {
          }
          startBackendProgressPolling();
        }
        await fsUploadSession.start();
      } catch (error) {
        log2.error("[Uppy] 上传失败", error);
        errorMessage.value = normalizeFsUploadError(error);
        emit("upload-error", error);
        disposeFsSession();
      } finally {
        resetBackendProgressTracking();
        isUploading.value = false;
      }
    };
    const closeModal = () => {
      if (uppyInstance.value) {
        uppyInstance.value.cancelAll?.();
        uppyInstance.value.clear();
      }
      errorMessage.value = "";
      isUploading.value = false;
      resetBackendProgressTracking();
      disposeFsSession(true);
      disposeFsAdapterHandle();
      emit("close");
    };
    const handleUploadSelect = (selectedUpload) => {
      showSelectUploadDialog.value = false;
      if (selectUploadData.value.onSelect) {
        selectUploadData.value.onSelect(selectedUpload);
      }
    };
    const handleUploadSelectCancel = () => {
      showSelectUploadDialog.value = false;
      if (selectUploadData.value.onCancel) {
        selectUploadData.value.onCancel();
      }
    };
    watch(
      () => uploadMethod.value,
      async () => {
        if (props.isOpen && uppyInstance.value && !isUploading.value) {
          resetBackendProgressTracking();
          disposeFsSession(true);
          await setupUppy();
        }
      }
    );
    watch(
      () => props.isOpen,
      async (newValue) => {
        if (newValue) {
          await ensureMountsLoaded();
          try {
            await storageConfigsStore.loadConfigs();
          } catch (e) {
          }
          await nextTick();
          await setupUppy();
        } else if (uppyInstance.value) {
          uppyInstance.value.cancelAll?.();
          uppyInstance.value.clear();
          errorMessage.value = "";
          isUploading.value = false;
          resetBackendProgressTracking();
          disposeFsSession(true);
          disposeFsAdapterHandle();
        }
      }
    );
    watch(
      () => props.currentPath,
      async () => {
        if (!props.isOpen || !uppyInstance.value || isUploading.value) {
          return;
        }
        resetBackendProgressTracking();
        disposeFsSession(true);
        await setupUppy();
      }
    );
    watch(
      () => props.darkMode,
      async () => {
        if (props.isOpen && uppyInstance.value) {
          resetBackendProgressTracking();
          disposeFsSession(true);
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
        if (props.isOpen && uppyInstance.value) {
          resetBackendProgressTracking();
          disposeFsSession(true);
          setupUppy();
        }
      }
    );
    onMounted(async () => {
      if (props.isOpen) {
        await ensureMountsLoaded();
        await nextTick();
        await setupUppy();
      }
    });
    onBeforeUnmount(() => {
      destroyUppy();
      resetBackendProgressTracking();
      disposeFsSession(true);
      disposeFsAdapterHandle();
    });
    return (_ctx, _cache) => {
      return __props.isOpen ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: normalizeClass(["relative w-full max-w-sm sm:max-w-3xl lg:max-w-5xl h-auto min-h-[400px] sm:min-h-[500px] max-h-[85vh] sm:max-h-[80vh] rounded-lg shadow-xl flex flex-col", __props.darkMode ? "bg-gray-800" : "bg-white"])
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["p-4 flex justify-between items-center border-b", __props.darkMode ? "border-gray-700" : "border-gray-200"])
          }, [
            createBaseVNode("h3", {
              class: normalizeClass(["text-lg font-semibold", __props.darkMode ? "text-gray-100" : "text-gray-900"])
            }, toDisplayString(unref(t)("mount.uppy.title")), 3),
            createBaseVNode("button", {
              onClick: closeModal,
              class: normalizeClass(["p-1 rounded-full transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-400 hover:text-gray-200" : "hover:bg-gray-200 text-gray-500 hover:text-gray-700"])
            }, [
              createVNode(unref(IconClose), {
                size: "lg",
                "aria-hidden": "true"
              })
            ], 2)
          ], 2),
          createBaseVNode("div", _hoisted_2, [
            createVNode(_sfc_main$2, {
              modelValue: uploadMethod.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => uploadMethod.value = $event),
              modes: uploadModes.value,
              title: unref(t)("mount.uppy.uploadMethod"),
              "dark-mode": __props.darkMode,
              disabled: isUploading.value
            }, null, 8, ["modelValue", "modes", "title", "dark-mode", "disabled"]),
            createVNode(_sfc_main$3, {
              plugins: mediaPlugins.value,
              "enabled-count": enabledPluginsCount.value,
              title: unref(t)("mount.uppy.advancedFeatures"),
              "enabled-count-template": unref(t)("mount.uppy.enabledCount", { count: "{count}" }),
              "dark-mode": __props.darkMode,
              onTogglePlugin: togglePlugin
            }, null, 8, ["plugins", "enabled-count", "title", "enabled-count-template", "dark-mode"]),
            createVNode(_sfc_main$4, {
              ref_key: "uppyContainerRef",
              ref: uppyContainerRef,
              "container-id": "uppy-dashboard",
              "dark-mode": __props.darkMode,
              "show-paste-hint": true,
              "paste-hint-prefix": unref(t)("mount.uppy.pasteSupport"),
              "paste-key": unref(t)("mount.uppy.pasteKey"),
              "paste-hint-suffix": unref(t)("mount.uppy.pasteHint")
            }, null, 8, ["dark-mode", "paste-hint-prefix", "paste-key", "paste-hint-suffix"])
          ]),
          createBaseVNode("div", {
            class: normalizeClass(["p-4 border-t", __props.darkMode ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50/50"])
          }, [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("div", _hoisted_4, [
                createBaseVNode("div", _hoisted_5, [
                  createVNode(unref(IconFolder), {
                    size: "sm",
                    class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500"),
                    "aria-hidden": "true"
                  }, null, 8, ["class"]),
                  createBaseVNode("span", {
                    class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("mount.uppy.targetPath")) + " " + toDisplayString(__props.currentPath), 3)
                ])
              ]),
              createBaseVNode("div", _hoisted_6, [
                canStartUpload.value ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  onClick: startUpload,
                  disabled: isUploading.value,
                  class: normalizeClass(["px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-2 disabled:opacity-50", __props.darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"])
                }, [
                  isUploading.value ? (openBlock(), createBlock(unref(IconRefresh), {
                    key: 0,
                    size: "sm",
                    class: "animate-spin",
                    "aria-hidden": "true"
                  })) : (openBlock(), createBlock(unref(IconUpload), {
                    key: 1,
                    size: "sm",
                    "aria-hidden": "true"
                  })),
                  createBaseVNode("span", null, toDisplayString(isUploading.value ? unref(t)("mount.uppy.uploading") : unref(t)("mount.uppy.startUpload")), 1)
                ], 10, _hoisted_7)) : createCommentVNode("", true)
              ])
            ])
          ], 2)
        ], 2),
        (openBlock(), createBlock(Teleport, { to: "body" }, [
          showSelectUploadDialog.value ? (openBlock(), createBlock(SelectUploadDialog, {
            key: 0,
            "is-open": showSelectUploadDialog.value,
            file: selectUploadData.value.file,
            uploads: selectUploadData.value.uploads,
            "show-match-score": selectUploadData.value.showMatchScore,
            "dark-mode": __props.darkMode,
            onSelect: handleUploadSelect,
            onCancel: handleUploadSelectCancel,
            onClose: _cache[1] || (_cache[1] = ($event) => showSelectUploadDialog.value = false)
          }, null, 8, ["is-open", "file", "uploads", "show-match-score", "dark-mode"])) : createCommentVNode("", true)
        ]))
      ])) : createCommentVNode("", true);
    };
  }
};
const UppyUploadModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-38ea0ff9"]]);
export {
  UppyUploadModal as default
};
