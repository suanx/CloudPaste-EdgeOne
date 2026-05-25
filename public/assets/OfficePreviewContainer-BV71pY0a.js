const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/mpegts-CqRKED0F.js","assets/index-BQxzU9F1.js","assets/epub-BaFbfj3W.js","assets/fileTypes-C4-giE9O.js","assets/index-Sde1Raj0.js","assets/MarkdownDisplay-DriQfnOJ.js","assets/LoadingIndicator-C1Dntewf.js","assets/livePhotoBadgeIconSvg-DVbmCKIq.js","assets/timeUtils-D81jJILb.js","assets/docx-preview-CiB19rAa.js","assets/index-jrKUP1zO.js","assets/index-BG7Kfvx4.js","assets/index-CfSNuPLK.js"])))=>i.map(i=>d[i]);
import { a as getExtension, F as FileType, i as isArchiveFile, j as getArchiveType, S as SUPPORTED_ENCODINGS, n as getEncodingInfo, o as normalizeEncoding, p as isEncodingSupported, s as smartDetectEncoding, q as getTextStats, r as isBinaryContent, t as decodeText, u as cleanText, v as fetchAndDecodeText, w as fetchFileBinaryWithAuth } from "./fileTypes-C4-giE9O.js";
import { terminateWorkers as terminateWorkersAndModule, HttpRangeReader, ZipReader, BlobReader, BlobWriter, ZipReaderStream, configure, ERR_ENCRYPTED, ERR_CENTRAL_DIRECTORY_NOT_FOUND, ERR_INVALID_ENTRY_NAME } from "./index-Sde1Raj0.js";
import { c as createLogger, _ as __vitePreload, y as unref, r as reactive, g as ref, F as computed, w as watch, o as onMounted, u as useEventListener, aY as onBeforeUnmount, bk as useIntersectionObserver, e as useI18n, df as toRef, eS as useResizeObserver, j as createElementBlock, k as openBlock, l as createBaseVNode, p as createCommentVNode, z as createVNode, aD as normalizeStyle, n as normalizeClass, M as createBlock, aC as IconExclamationSolid, t as toDisplayString, m as withModifiers, aE as withCtx, aF as Transition, aK as _export_sfc, aU as renderSlot, K as Fragment, L as renderList, e8 as IconExpand, e9 as IconCollapse, aX as getDefaultExportFromCjs, aW as commonjsGlobal, aP as nextTick, i as useLocalStorage, W as useDebounceFn, q as withDirectives, dK as IconMenu, eT as IconArrowLeft, eU as IconArrowRight, eV as IconBookmarkSolid, eW as IconBookmark, ae as vModelSelect, aa as IconChevronLeft, ab as IconChevronRight, aq as vShow, G as IconClose, bi as defineComponent, aL as IconExclamation, v as vModelText, a$ as h, aS as VDITOR_ASSETS_BASE, bj as watchEffect, ax as onUnmounted, a_ as shallowRef, N as resolveDynamicComponent, b4 as IconDocumentText, A as createTextVNode } from "./index-BQxzU9F1.js";
import { g as getZipJsDefaultConfig, M as MarkdownDisplay } from "./MarkdownDisplay-DriQfnOJ.js";
import { L as LIVE_PHOTO_BADGE_ICON_SVG } from "./livePhotoBadgeIconSvg-DVbmCKIq.js";
import { _ as _sfc_main$e } from "./LoadingIndicator-C1Dntewf.js";
import { d as formatLocalDateTimeWithSeconds } from "./timeUtils-D81jJILb.js";
const PREVIEW_KEYS = Object.freeze({
  IMAGE: "image",
  VIDEO: "video",
  AUDIO: "audio",
  PDF: "pdf",
  EPUB: "epub",
  OFFICE: "office",
  TEXT: "text",
  CODE: "code",
  MARKDOWN: "markdown",
  HTML: "html",
  ARCHIVE: "archive",
  IFRAME: "iframe",
  DOWNLOAD: "download"
});
const PREVIEW_KINDS = Object.freeze({
  COMPONENT: "component",
  IFRAME: "iframe",
  DOWNLOAD: "download"
});
function normalizeTextKey(key) {
  if ([PREVIEW_KEYS.TEXT, PREVIEW_KEYS.CODE, PREVIEW_KEYS.MARKDOWN, PREVIEW_KEYS.HTML].includes(key)) {
    return PREVIEW_KEYS.TEXT;
  }
  return key;
}
function normalizeSelection(selection, filename) {
  if (!selection || !selection.key) return null;
  const key = normalizeTextKey(selection.key);
  const providers = selection.providers || {};
  const kind = selection.kind || (key === PREVIEW_KEYS.IFRAME ? PREVIEW_KINDS.IFRAME : key === PREVIEW_KEYS.DOWNLOAD ? PREVIEW_KINDS.DOWNLOAD : PREVIEW_KINDS.COMPONENT);
  if (key === PREVIEW_KEYS.IFRAME && !Object.keys(providers).length) {
    return null;
  }
  return {
    ...selection,
    key,
    kind
  };
}
function resolvePreviewSelection({ file }) {
  const filename = file?.name || file?.filename || "";
  const extension = getExtension(filename);
  const type = file?.type;
  const normalized = normalizeSelection(file?.previewSelection);
  if (normalized) {
    return normalized;
  }
  if (type === FileType.IMAGE) return { key: PREVIEW_KEYS.IMAGE, kind: PREVIEW_KINDS.COMPONENT };
  if (type === FileType.VIDEO) return { key: PREVIEW_KEYS.VIDEO, kind: PREVIEW_KINDS.COMPONENT };
  if (type === FileType.AUDIO) return { key: PREVIEW_KEYS.AUDIO, kind: PREVIEW_KINDS.COMPONENT };
  if (type === FileType.DOCUMENT) return { key: PREVIEW_KEYS.PDF, kind: PREVIEW_KINDS.COMPONENT };
  if (type === FileType.OFFICE) return { key: PREVIEW_KEYS.OFFICE, kind: PREVIEW_KINDS.COMPONENT };
  if (type === FileType.TEXT) {
    return { key: PREVIEW_KEYS.TEXT, kind: PREVIEW_KINDS.COMPONENT };
  }
  if (isArchiveFile(filename)) {
    return { key: PREVIEW_KEYS.ARCHIVE, kind: PREVIEW_KINDS.COMPONENT };
  }
  if (extension) {
    return { key: PREVIEW_KEYS.DOWNLOAD, kind: PREVIEW_KINDS.DOWNLOAD };
  }
  return { key: PREVIEW_KEYS.DOWNLOAD, kind: PREVIEW_KINDS.DOWNLOAD };
}
class LRUCache {
  constructor(maxSize = 50) {
    this.maxSize = maxSize;
    this.cache = /* @__PURE__ */ new Map();
  }
  /**
   * 获取缓存项
   * @param {string} key - 缓存键
   * @returns {any} 缓存值，如果不存在或已过期则返回 null
   */
  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }
    const item = this.cache.get(key);
    if (item.expiry && Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    this.cache.delete(key);
    this.cache.set(key, item);
    return item.value;
  }
  /**
   * 设置缓存项
   * @param {string} key - 缓存键
   * @param {any} value - 缓存值
   * @param {number} ttl - 生存时间（毫秒），可选
   */
  set(key, value, ttl = null) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    const item = {
      value,
      timestamp: Date.now(),
      expiry: ttl ? Date.now() + ttl : null
    };
    this.cache.set(key, item);
  }
  /**
   * 检查是否存在缓存项
   * @param {string} key - 缓存键
   * @returns {boolean}
   */
  has(key) {
    return this.get(key) !== null;
  }
  /**
   * 删除缓存项
   * @param {string} key - 缓存键
   * @returns {boolean} 是否成功删除
   */
  delete(key) {
    return this.cache.delete(key);
  }
  /**
   * 清空缓存
   */
  clear() {
    this.cache.clear();
  }
  /**
   * 获取缓存大小
   * @returns {number}
   */
  size() {
    return this.cache.size;
  }
  /**
   * 清理过期项
   * @returns {number} 清理的项目数量
   */
  cleanup() {
    let cleanedCount = 0;
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (item.expiry && now > item.expiry) {
        this.cache.delete(key);
        cleanedCount++;
      }
    }
    return cleanedCount;
  }
  /**
   * 获取缓存统计信息
   * @returns {Object} 统计信息
   */
  getStats() {
    const now = Date.now();
    let expiredCount = 0;
    let totalAge = 0;
    for (const [key, item] of this.cache.entries()) {
      if (item.expiry && now > item.expiry) {
        expiredCount++;
      }
      totalAge += now - item.timestamp;
    }
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      expiredCount,
      averageAge: this.cache.size > 0 ? Math.round(totalAge / this.cache.size) : 0,
      utilizationRate: Math.round(this.cache.size / this.maxSize * 100)
    };
  }
}
const log$4 = createLogger("ArchiveUtils");
const ARCHIVE_CONSTANTS = {
  // 缓存配置
  CACHE: {
    EXTRACT_SIZE: 10,
    // 解压结果缓存大小
    FILE_BLOB_SIZE: 2,
    // 文件Blob缓存大小
    TTL: 10 * 60 * 1e3
    // 缓存时间：10分钟
  },
  // 检测配置
  DETECTION: {
    MAX_CHECK_ENTRIES: 3
    // 加密检测最大检查条目数
  },
  // 进度分配
  PROGRESS: {
    DOWNLOAD_RATIO: 70,
    // 下载进度占比：70%
    EXTRACT_RATIO: 30
    // 解压进度占比：30%
  },
  // 估算配置
  ESTIMATION: {
    INITIAL_ENTRIES: 10
    // 初始估算条目数
  }
};
const sharedFileBlobCache = new LRUCache(ARCHIVE_CONSTANTS.CACHE.FILE_BLOB_SIZE);
async function getOrDownloadFileBlob(fileUrl, progressCallback = null, startProgress = 0, endProgress = 100, stage = "下载中") {
  const cacheKey = fileUrl;
  const cachedBlob = sharedFileBlobCache.get(cacheKey);
  if (cachedBlob) {
    log$4.debug("使用缓存文件:", fileUrl);
    if (progressCallback) progressCallback(endProgress, "使用缓存文件");
    return cachedBlob;
  }
  const fileBlob = await downloadFileWithProgress(fileUrl, progressCallback, startProgress, endProgress, stage);
  sharedFileBlobCache.set(cacheKey, fileBlob, ARCHIVE_CONSTANTS.CACHE.TTL);
  log$4.debug("文件已下载并缓存:", fileUrl);
  return fileBlob;
}
async function downloadFileWithProgress(url, progressCallback = null, progressStart = 0, progressEnd = 100, stage = "下载中") {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  const contentLength = response.headers.get("content-length");
  const total = contentLength ? parseInt(contentLength, 10) : 0;
  let loaded = 0;
  const reader = response.body.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.length;
    if (total > 0 && progressCallback) {
      const progress = progressStart + loaded / total * (progressEnd - progressStart);
      progressCallback(Math.min(progress, progressEnd), stage);
    }
  }
  return new Blob(chunks);
}
function isWebAssemblySupported() {
  return typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function";
}
function clearSharedFileBlobCache(fileUrl) {
  if (!fileUrl) return;
  sharedFileBlobCache.delete(fileUrl);
  log$4.debug("已清除共享文件Blob缓存:", fileUrl);
}
function countTotalFiles(filesObject) {
  let count = 0;
  const countRecursive = (obj) => {
    for (const [, item] of Object.entries(obj)) {
      if (item && typeof item.extract === "function") {
        count++;
      } else if (typeof item === "object" && item !== null) {
        count++;
        countRecursive(item);
      }
    }
  };
  countRecursive(filesObject);
  return count;
}
function countExtractedFiles(extractedFiles) {
  let count = 0;
  const countRecursive = (obj) => {
    for (const [, item] of Object.entries(obj)) {
      if (item instanceof File) {
        count++;
      } else if (typeof item === "object" && item !== null) {
        count++;
        countRecursive(item);
      }
    }
  };
  countRecursive(extractedFiles);
  return count;
}
let isZipJSConfigured = false;
const log$3 = createLogger("ZipService");
function initializeZipJSConfig() {
  if (isZipJSConfigured) return;
  const config2 = getZipJsDefaultConfig();
  configure(config2);
  isZipJSConfigured = true;
  log$3.debug(`zip.js 全局配置已初始化:
    - chunkSize: ${Math.round((config2.chunkSize || 0) / 1024)}KB
    - maxWorkers: ${config2.maxWorkers}
    - useWebWorkers: enabled
    - useCompressionStream: enabled
    - workerURI/wasmURI: configured`);
}
function handleZipError(error) {
  const errorMessage = error.message || "";
  if (errorMessage === ERR_ENCRYPTED) {
    throw new Error("ENCRYPTED_ARCHIVE_DETECTED");
  }
  if (errorMessage === ERR_CENTRAL_DIRECTORY_NOT_FOUND) {
    throw new Error("CORRUPTED_ARCHIVE");
  }
  if (errorMessage === ERR_INVALID_ENTRY_NAME) {
    throw new Error("INVALID_ARCHIVE_STRUCTURE");
  }
  if (errorMessage.includes("Invalid password") || errorMessage.includes("Wrong password")) {
    throw new Error("INVALID_ARCHIVE_PASSWORD");
  }
  log$3.warn("zip.js 错误:", errorMessage);
  throw error;
}
class ZIP64Detector {
  /**
   * 检测ZIP文件是否为ZIP64格式
   * @param {ZipReader} zipReader - ZIP读取器实例
   * @returns {Promise<Object>} ZIP64检测结果
   */
  static async detectZIP64Support(zipReader) {
    try {
      const entries = await zipReader.getEntries();
      let hasLargeFiles = false;
      let hasManyEntries = false;
      let largestFileSize = 0;
      let largestFileName = "";
      for (const entry of entries) {
        const uncompressedSize = entry.uncompressedSize || 0;
        const compressedSize = entry.compressedSize || 0;
        if (uncompressedSize > largestFileSize) {
          largestFileSize = uncompressedSize;
          largestFileName = entry.filename;
        }
        if (uncompressedSize > 4294967295 || compressedSize > 4294967295) {
          hasLargeFiles = true;
        }
      }
      if (entries.length > 65535) {
        hasManyEntries = true;
      }
      const isZIP64 = hasLargeFiles || hasManyEntries;
      return {
        isZIP64,
        hasLargeFiles,
        hasManyEntries,
        totalEntries: entries.length,
        largestFileSize,
        largestFileName,
        largestFileSizeMB: (largestFileSize / 1024 / 1024).toFixed(2),
        requiresZIP64: isZIP64
      };
    } catch (error) {
      log$3.warn("ZIP64检测失败:", error);
      return {
        isZIP64: false,
        hasLargeFiles: false,
        hasManyEntries: false,
        totalEntries: 0,
        largestFileSize: 0,
        largestFileName: "",
        largestFileSizeMB: "0",
        requiresZIP64: false,
        error: error.message
      };
    }
  }
}
class ParallelExtractionManager {
  constructor(maxConcurrency = navigator.hardwareConcurrency || 2) {
    this.maxConcurrency = Math.min(maxConcurrency, 8);
    this.semaphore = new Semaphore(this.maxConcurrency);
  }
  /**
   * 并行解压多个文件条目
   * @param {Array} entries - 文件条目数组
   * @param {Function} progressCallback - 进度回调
   * @returns {Promise<Array>} 解压结果数组
   */
  async extractEntriesInParallel(entries, progressCallback = null) {
    let completedCount = 0;
    log$3.debug(`开始并行解压 ${entries.length} 个文件，并发数: ${this.maxConcurrency}`);
    const extractPromises = entries.map(async (entry) => {
      await this.semaphore.acquire();
      try {
        const startTime = performance.now();
        const writer = new BlobWriter();
        await entry.getData(writer, {
          onprogress: () => {
          }
        });
        const blob = await writer.getData();
        const content = await blob.arrayBuffer();
        const endTime = performance.now();
        completedCount++;
        if (progressCallback) {
          const overallProgress = completedCount / entries.length * 100;
          progressCallback(overallProgress, `并行解压 ${completedCount}/${entries.length}`);
        }
        return {
          name: entry.filename,
          size: entry.uncompressedSize || 0,
          compressedSize: entry.compressedSize || 0,
          isDirectory: false,
          lastModDate: entry.lastModDate || /* @__PURE__ */ new Date(),
          content,
          extractionTime: endTime - startTime,
          entry: {
            entry,
            type: "zipjs-parallel",
            cachedContent: content,
            async getContent() {
              return this.cachedContent;
            }
          }
        };
      } finally {
        this.semaphore.release();
      }
    });
    const extractedFiles = await Promise.all(extractPromises);
    log$3.debug(`并行解压完成！总计 ${extractedFiles.length} 个文件`);
    return extractedFiles;
  }
}
class Semaphore {
  constructor(max) {
    this.max = max;
    this.current = 0;
    this.queue = [];
  }
  async acquire() {
    if (this.current < this.max) {
      this.current++;
      return;
    }
    return new Promise((resolve) => {
      this.queue.push(resolve);
    });
  }
  release() {
    this.current--;
    if (this.queue.length > 0) {
      const resolve = this.queue.shift();
      this.current++;
      resolve();
    }
  }
}
function createOptimalZipReaderConfig(options = {}) {
  return {
    useWebWorkers: true,
    // 启用Web Workers
    useCompressionStream: true,
    // 使用原生压缩流
    transferStreams: true,
    // 启用流传输优化
    // 允许特定场景的覆盖
    ...options
  };
}
class ZipService {
  constructor() {
    this.fileBlobCache = sharedFileBlobCache;
    this.zip64Detector = ZIP64Detector;
    this.parallelManager = new ParallelExtractionManager();
    initializeZipJSConfig();
  }
  /**
   * 清理zip.js资源
   */
  async cleanup() {
    try {
      await terminateWorkersAndModule();
      log$3.debug("zip.js Workers已终止");
    } catch (error) {
      log$3.warn("清理zip.js资源时出错:", error);
    }
  }
  /**
   * 统一的ZIP文件解压接口
   * @param {Blob|File|string} fileBlobOrUrl - 压缩文件 Blob 对象或URL
   * @param {string} filename - 文件名
   * @param {string} fileUrl - 文件URL（用于缓存键）
   * @param {Function} progressCallback - 进度回调函数 (progress: 0-100)
   * @param {string|null} password - 可选的解压密码
   * @returns {Promise<Array>} 统一格式的文件列表
   */
  async extractArchive(fileBlobOrUrl, filename, fileUrl = "", progressCallback = null, password = null) {
    log$3.debug(`开始处理 ZIP 格式文件:`, filename);
    let isEncrypted = false;
    let fileBlob = null;
    if (typeof fileBlobOrUrl === "string" && fileBlobOrUrl.startsWith("http")) {
      isEncrypted = await this.lightweightEncryptionCheck(fileBlobOrUrl, progressCallback);
    } else {
      isEncrypted = await this.quickEncryptionCheck(fileBlobOrUrl);
      fileBlob = fileBlobOrUrl;
    }
    if (isEncrypted && !password) {
      throw new Error("ENCRYPTED_ARCHIVE_DETECTED");
    } else if (isEncrypted && password) {
      if (!fileBlob && typeof fileBlobOrUrl === "string" && fileBlobOrUrl.startsWith("http")) {
        fileBlob = await getOrDownloadFileBlob(fileBlobOrUrl, progressCallback, 0, 70, "下载中");
      } else if (!fileBlob) {
        fileBlob = fileBlobOrUrl;
        if (progressCallback) progressCallback(70, "准备解压");
      }
      return await this.extractZipWithPassword(fileBlob, password, progressCallback);
    } else {
      if (typeof fileBlobOrUrl === "string" && fileBlobOrUrl.startsWith("http")) {
        const cachedBlob = sharedFileBlobCache.get(fileBlobOrUrl);
        if (cachedBlob) {
          log$3.debug("使用缓存文件进行流式解压:", fileBlobOrUrl);
          return await this.extractWithZipReaderStream(cachedBlob, progressCallback);
        }
      }
      return await this.extractWithZipReaderStream(fileBlobOrUrl, progressCallback);
    }
  }
  /**
   * 基于Range请求的加密检测
   * @param {string} fileUrl - 远程文件URL
   * @param {Function} progressCallback - 进度回调函数
   * @returns {Promise<boolean>} true表示检测到加密，false表示无加密
   */
  async rangeBasedEncryptionCheck(fileUrl, progressCallback = null) {
    try {
      log$3.debug("开始HttpRangeReader加密检测:", fileUrl);
      if (progressCallback) progressCallback(20, "Range检测");
      const httpRangeReader = new HttpRangeReader(fileUrl, {
        useXHR: false
      });
      const zipReader = new ZipReader(httpRangeReader, createOptimalZipReaderConfig());
      if (progressCallback) progressCallback(50, "获取文件列表");
      const entries = await zipReader.getEntries();
      if (progressCallback) progressCallback(80, "检测加密");
      const checkCount = Math.min(entries.length, ARCHIVE_CONSTANTS.DETECTION.MAX_CHECK_ENTRIES);
      let hasEncrypted = false;
      for (let i = 0; i < checkCount; i++) {
        const entry = entries[i];
        if (entry.encrypted) {
          hasEncrypted = true;
          break;
        }
      }
      await zipReader.close();
      log$3.debug(`HttpRangeReader检测完成: ${hasEncrypted ? "发现加密" : "无加密"}, 检查了${checkCount}个条目`);
      return hasEncrypted;
    } catch (error) {
      log$3.warn("⚠️ HttpRangeReader检测失败:", error.message);
      throw error;
    }
  }
  /**
   * 轻量级加密检测（智能检测，适用于远程文件）
   * 优先使用HttpRangeReader进行部分下载检测，失败时降级到缓存下载检测
   * 降级时会缓存完整文件，避免后续extractArchive重复下载
   * @param {string} fileUrl - 远程文件URL
   * @param {Function} progressCallback - 进度回调函数
   * @returns {Promise<boolean>} true表示检测到加密，false表示无加密
   */
  async lightweightEncryptionCheck(fileUrl, progressCallback = null) {
    try {
      log$3.debug("开始加密检测:", fileUrl);
      if (progressCallback) progressCallback(10, "开始检测");
      try {
        const hasEncrypted2 = await this.rangeBasedEncryptionCheck(fileUrl, progressCallback);
        if (progressCallback) {
          progressCallback(100, hasEncrypted2 ? "发现加密" : "无加密");
        }
        log$3.debug(`HttpRangeReader检测成功: ${hasEncrypted2 ? "发现加密" : "无加密"}`);
        return hasEncrypted2;
      } catch (rangeError) {
        log$3.warn("⚠️ HttpRangeReader检测失败，降级到缓存下载检测:", rangeError.message);
        if (progressCallback) progressCallback(30, "降级检测");
      }
      log$3.debug("降级使用缓存下载检测方式...");
      if (progressCallback) progressCallback(40, "下载检测");
      const fileBlob = await getOrDownloadFileBlob(fileUrl, progressCallback, 40, 80, "下载中");
      if (progressCallback) progressCallback(90, "检测加密");
      const hasEncrypted = await this.quickEncryptionCheck(fileBlob);
      if (progressCallback) {
        progressCallback(100, hasEncrypted ? "发现加密" : "无加密");
      }
      log$3.debug(`缓存下载检测完成: ${hasEncrypted ? "发现加密" : "无加密"}`);
      return hasEncrypted;
    } catch (error) {
      log$3.warn("⚠️ 加密检测失败:", error.message);
      try {
        handleZipError(error);
      } catch (handledError) {
        if (handledError.message.includes("CORRUPTED_ARCHIVE")) {
          throw handledError;
        }
      }
      return false;
    }
  }
  /**
   * 快速加密检测（纯检测，无下载）
   * @param {Blob} fileBlob - 已下载的文件Blob
   * @returns {Promise<boolean>} true表示检测到加密，false表示无加密
   */
  async quickEncryptionCheck(fileBlob) {
    try {
      log$3.debug("开始加密检测blob...");
      const zipReader = new ZipReader(new BlobReader(fileBlob));
      const entries = await zipReader.getEntries();
      const checkCount = Math.min(entries.length, ARCHIVE_CONSTANTS.DETECTION.MAX_CHECK_ENTRIES);
      for (let i = 0; i < checkCount; i++) {
        const entry = entries[i];
        if (entry.encrypted) {
          await zipReader.close();
          return true;
        }
      }
      await zipReader.close();
      return false;
    } catch (error) {
      log$3.warn("⚠️ 快速加密检测失败:", error.message);
      return false;
    }
  }
  /**
   * ZIP密码解压（纯解压，无下载）
   * @param {Blob} fileBlob - 已下载的文件Blob
   * @param {string} password - 解压密码
   * @param {Function} progressCallback - 进度回调函数
   * @returns {Promise<Array>} 统一格式的文件列表
   */
  async extractZipWithPassword(fileBlob, password, progressCallback = null) {
    try {
      log$3.debug("开始ZipReader进行密码解压...");
      if (progressCallback) progressCallback(75, "解析中");
      const zipReader = new ZipReader(new BlobReader(fileBlob), {
        password
      });
      const entries = await zipReader.getEntries({
        // 获取条目列表时的进度回调
        onprogress: (progress, total) => {
          if (progressCallback && total > 0) {
            const percentage = 75 + progress / total * 5;
            progressCallback(percentage, "扫描文件");
          }
        }
      });
      const zip64Info = await this.zip64Detector.detectZIP64Support(zipReader);
      if (zip64Info.isZIP64) {
        log$3.debug(`ZIP64格式: ${zip64Info.totalEntries}个文件, 最大${zip64Info.largestFileSizeMB}MB (${zip64Info.largestFileName})`);
      }
      const shouldUseParallel = this.shouldUseParallelExtraction(entries, zip64Info);
      if (shouldUseParallel) {
        log$3.debug("使用并行解压策略");
        if (progressCallback) progressCallback(80, "并行解压中");
        const fileEntries = entries.filter((entry) => !entry.directory);
        const directoryEntries = entries.filter((entry) => entry.directory);
        const parallelResults = await this.parallelManager.extractEntriesInParallel(fileEntries, (progress, status) => {
          if (progressCallback) {
            const adjustedProgress = 80 + progress * 0.15;
            progressCallback(adjustedProgress, status);
          }
        });
        const directoryResults = directoryEntries.map((entry) => ({
          name: entry.filename,
          size: 0,
          compressedSize: 0,
          isDirectory: true,
          lastModDate: entry.lastModDate || /* @__PURE__ */ new Date(),
          entry: {
            entry,
            type: "zipjs-reader",
            async getContent() {
              throw new Error("Cannot extract directory");
            }
          }
        }));
        const result2 = [...parallelResults, ...directoryResults];
        await zipReader.close();
        if (progressCallback) progressCallback(100, "完成");
        log$3.debug(`并行解压完成，处理了 ${entries.length} 个条目`);
        return result2;
      }
      log$3.debug("使用传统顺序解压策略");
      const result = [];
      let processedEntries = 0;
      for (const entry of entries) {
        if (entry.directory) {
          result.push({
            name: entry.filename,
            size: 0,
            compressedSize: 0,
            isDirectory: true,
            lastModDate: entry.lastModDate || /* @__PURE__ */ new Date(),
            entry: {
              entry,
              type: "zipjs-reader",
              async getContent() {
                throw new Error("Cannot extract directory");
              }
            }
          });
        } else {
          let cachedContent;
          try {
            const writer = new BlobWriter();
            await entry.getData(writer, {
              onprogress: (index2, max) => {
                if (progressCallback && max > 0) {
                  const fileProgress = index2 / max * 100;
                  const overallProgress = 80 + processedEntries / entries.length * 15 + fileProgress / entries.length * 0.15;
                  progressCallback(Math.min(overallProgress, 95), `解压 ${entry.filename}`);
                }
              }
            });
            const blob = await writer.getData();
            cachedContent = await blob.arrayBuffer();
          } catch (error) {
            handleZipError(error);
          }
          result.push({
            name: entry.filename,
            size: entry.uncompressedSize || 0,
            compressedSize: entry.compressedSize || 0,
            isDirectory: false,
            lastModDate: entry.lastModDate || /* @__PURE__ */ new Date(),
            entry: {
              entry,
              type: "zipjs-reader",
              cachedContent,
              async getContent() {
                return this.cachedContent;
              }
            }
          });
        }
        processedEntries++;
        if (progressCallback) {
          const extractProgress = 75 + processedEntries / entries.length * 25;
          progressCallback(Math.min(extractProgress, 100), "解压中");
        }
      }
      await zipReader.close();
      if (progressCallback) progressCallback(100, "完成");
      log$3.debug(`ZipReader 密码解压完成，处理了 ${entries.length} 个条目`);
      return result;
    } catch (error) {
      log$3.error("ZIP密码解压失败:", error);
      handleZipError(error);
    }
  }
  /**
   * 智能解压策略选择
   * @param {Array} entries - 文件条目数组
   * @param {Object} zip64Info - ZIP64检测信息
   * @returns {boolean} 是否应该使用并行解压
   */
  shouldUseParallelExtraction(entries, zip64Info) {
    const fileEntries = entries.filter((entry) => !entry.directory);
    const totalFiles = fileEntries.length;
    const hasVeryLargeFiles = fileEntries.some(
      (entry) => (entry.uncompressedSize || 0) > 50 * 1024 * 1024
      // 50MB
    );
    const totalUncompressedSize = fileEntries.reduce((sum, entry) => sum + (entry.uncompressedSize || 0), 0);
    const cpuCores = navigator.hardwareConcurrency || 2;
    if (totalFiles < 3) {
      log$3.debug(`使用顺序解压: 文件数量少(${totalFiles}个)`);
      return false;
    }
    if (hasVeryLargeFiles) {
      log$3.debug("使用顺序解压: 检测到超大文件(>50MB)");
      return false;
    }
    if (totalUncompressedSize > 200 * 1024 * 1024) {
      log$3.debug(`使用顺序解压: 总体积过大(${(totalUncompressedSize / 1024 / 1024).toFixed(0)}MB)`);
      return false;
    }
    if (cpuCores < 4) {
      log$3.debug(`使用顺序解压: CPU核心不足(${cpuCores}核)`);
      return false;
    }
    if (zip64Info.isZIP64) {
      if (zip64Info.hasLargeFiles && !zip64Info.hasManyEntries) {
        log$3.debug("ZIP64大文件格式 → 顺序解压");
        return false;
      } else if (zip64Info.hasManyEntries && !zip64Info.hasLargeFiles) {
        if (totalFiles >= 10 && totalFiles <= 200 && cpuCores >= 4) {
          log$3.debug("ZIP64大量文件格式 → 并行解压");
          return true;
        }
      } else if (zip64Info.hasLargeFiles && zip64Info.hasManyEntries) {
        if (cpuCores >= 8 && totalFiles <= 50) {
          log$3.debug("ZIP64复合格式 → 高性能并行解压");
          return true;
        }
        log$3.debug("ZIP64复合格式 → 顺序解压");
        return false;
      }
    }
    if (totalFiles >= 4 && totalFiles <= 50) {
      log$3.debug(`使用并行解压: ${totalFiles}个文件，${cpuCores}核CPU`);
      return true;
    }
    log$3.debug("使用默认顺序解压策略");
    return false;
  }
  /**
   * 使用 ZipReaderStream 统一流式解压 ZIP 文件（支持URL和Blob输入）
   * @param {string|Blob|File} fileBlobOrUrl - ZIP 文件URL或Blob对象
   * @param {Function} progressCallback - 进度回调函数 (progress: 0-100)
   * @returns {Promise<Array>} 统一格式的文件列表
   */
  async extractWithZipReaderStream(fileBlobOrUrl, progressCallback = null) {
    try {
      let readableStream;
      let totalSize = 0;
      let loaded = 0;
      let isRemoteFile = false;
      if (typeof fileBlobOrUrl === "string" && fileBlobOrUrl.startsWith("http")) {
        log$3.debug("ZipReaderStream 处理远程ZIP文件:", fileBlobOrUrl);
        isRemoteFile = true;
        const response = await fetch(fileBlobOrUrl);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const contentLength = response.headers.get("content-length");
        totalSize = contentLength ? parseInt(contentLength, 10) : 0;
        readableStream = response.body;
        log$3.debug(`远程ZIP文件大小: ${totalSize ? (totalSize / 1024 / 1024).toFixed(2) + "MB" : "未知"}`);
      } else {
        log$3.debug("ZipReaderStream 处理本地ZIP文件");
        const blob = fileBlobOrUrl;
        totalSize = blob.size;
        readableStream = blob.stream();
        log$3.debug(`本地ZIP文件大小: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
      }
      const progressMonitorStream = new TransformStream({
        transform(chunk, controller) {
          loaded += chunk.length;
          if (totalSize > 0 && progressCallback) {
            const readProgress = loaded / totalSize * ARCHIVE_CONSTANTS.PROGRESS.DOWNLOAD_RATIO;
            const stage = isRemoteFile ? "下载中" : "读取中";
            progressCallback(Math.min(readProgress, ARCHIVE_CONSTANTS.PROGRESS.DOWNLOAD_RATIO), stage);
          }
          controller.enqueue(chunk);
        }
      });
      const result = [];
      let processedEntries = 0;
      let estimatedTotalEntries = ARCHIVE_CONSTANTS.ESTIMATION.INITIAL_ENTRIES;
      const zipReaderStream = new ZipReaderStream(createOptimalZipReaderConfig());
      log$3.debug("开始流式解析ZIP条目...");
      for await (const entry of readableStream.pipeThrough(progressMonitorStream).pipeThrough(zipReaderStream)) {
        const fileInfo = {
          name: entry.filename,
          size: entry.uncompressedSize || 0,
          compressedSize: entry.compressedSize || 0,
          isDirectory: entry.directory,
          lastModDate: entry.lastModDate || /* @__PURE__ */ new Date(),
          entry: {
            entry,
            type: "zipjs-stream",
            async getContent() {
              if (!entry.readable) {
                throw new Error(`Entry "${entry.filename}" readable stream is not available`);
              }
              return new Response(entry.readable).arrayBuffer();
            }
          }
        };
        result.push(fileInfo);
        processedEntries++;
        if (processedEntries > estimatedTotalEntries * 0.8) {
          estimatedTotalEntries = Math.ceil(processedEntries * 1.5);
        }
        if (progressCallback) {
          const extractProgress = ARCHIVE_CONSTANTS.PROGRESS.DOWNLOAD_RATIO + processedEntries / estimatedTotalEntries * ARCHIVE_CONSTANTS.PROGRESS.EXTRACT_RATIO;
          progressCallback(Math.min(extractProgress, 95), "解压中");
        }
      }
      if (progressCallback) {
        progressCallback(100, "完成");
      }
      log$3.debug(`ZipReaderStream 流式解压完成: ${result.length}个文件 (${(loaded / 1024 / 1024).toFixed(1)}MB)`);
      return result;
    } catch (error) {
      log$3.error("ZipReaderStream 流式解压失败:", error);
      throw error;
    }
  }
  /**
   * 清除文件Blob缓存
   * @param {string} fileUrl - 文件URL
   */
  clearFileBlobCache(fileUrl) {
    if (!fileUrl) return;
    this.fileBlobCache.delete(fileUrl);
    log$3.debug("已清除ZIP服务文件Blob缓存:", fileUrl);
  }
}
const zipService = new ZipService();
const cleanupZipJS = async () => {
  await zipService.cleanup();
};
const log$2 = createLogger("Libarchive");
class LibarchiveService {
  constructor() {
    this.libarchiveInitialized = false;
    this.initPromise = null;
    this.Archive = null;
    this.config = {
      workerUrl: "/libarchive.js/dist/worker-bundle.js"
    };
    this.fileBlobCache = sharedFileBlobCache;
  }
  /**
   * 统一的libarchive文件解压接口
   * @param {Blob|File|string} fileBlobOrUrl - 压缩文件 Blob 对象或URL
   * @param {string} filename - 文件名
   * @param {string} fileUrl - 文件URL（用于缓存键）
   * @param {Function} progressCallback - 进度回调函数 (progress: 0-100)
   * @param {string|null} password - 可选的解压密码
   * @param {Object} archiveType - 压缩格式信息
   * @returns {Promise<Array>} 统一格式的文件列表
   */
  async extractArchive(fileBlobOrUrl, filename, fileUrl = "", progressCallback = null, password = null, archiveType) {
    log$2.debug(`开始处理 ${archiveType.name} 格式文件:`, filename);
    let hasEncrypted = false;
    let fileBlob = null;
    if (typeof fileBlobOrUrl === "string" && fileBlobOrUrl.startsWith("http")) {
      fileBlob = await getOrDownloadFileBlob(fileBlobOrUrl, progressCallback, 0, 50, "下载中");
      hasEncrypted = await this.libarchiveEncryptionCheck(fileBlob, archiveType, progressCallback);
    } else {
      hasEncrypted = await this.libarchiveEncryptionCheck(fileBlobOrUrl, archiveType, progressCallback);
      fileBlob = fileBlobOrUrl;
    }
    if (hasEncrypted && !password) {
      throw new Error("ENCRYPTED_ARCHIVE_DETECTED");
    } else if (hasEncrypted && password) {
      if (!fileBlob) {
        log$2.warn("密码解压时fileBlob为空，尝试重新获取");
        if (typeof fileBlobOrUrl === "string" && fileBlobOrUrl.startsWith("http")) {
          fileBlob = await getOrDownloadFileBlob(fileBlobOrUrl, progressCallback, 60, 70, "重新下载");
        } else {
          fileBlob = fileBlobOrUrl;
        }
      }
      if (progressCallback) progressCallback(70, "准备密码解压");
      return await this.extractLibarchiveWithPassword(fileBlob, archiveType, password, progressCallback);
    } else {
      return await this.extractWithLibarchiveStream(fileBlob, archiveType, progressCallback);
    }
  }
  /**
   * 初始化 libarchive.js（懒加载）
   * @returns {Promise<boolean>} 是否初始化成功
   */
  async initLibarchive() {
    if (this.libarchiveInitialized) {
      return true;
    }
    if (this.initPromise) {
      return await this.initPromise;
    }
    this.initPromise = this._performInit();
    return await this.initPromise;
  }
  async _performInit() {
    try {
      if (!isWebAssemblySupported()) {
        log$2.warn("当前浏览器不支持 WebAssembly，libarchive.js 功能将不可用");
        return false;
      }
      log$2.debug("正在初始化 libarchive.js WebWorker:", this.config.workerUrl);
      if (!this.Archive) {
        const libarchiveModule = await __vitePreload(() => import("./libarchive-EEVezZyu.js"), true ? [] : void 0);
        this.Archive = libarchiveModule?.Archive || libarchiveModule?.default?.Archive || libarchiveModule?.default;
      }
      if (!this.Archive || typeof this.Archive.init !== "function") {
        throw new Error("libarchive.js 未能正确加载 Archive");
      }
      this.Archive.init({
        workerUrl: this.config.workerUrl
      });
      this.libarchiveInitialized = true;
      log$2.debug("libarchive.js 初始化成功，WebWorker已配置");
      return true;
    } catch (error) {
      log$2.warn("libarchive.js 初始化失败，将降级到仅支持 ZIP:", error);
      return false;
    }
  }
  /**
   * libarchive加密检测
   * @param {Blob} fileBlob - 已下载的文件Blob
   * @param {Object} archiveType - 压缩格式信息
   * @param {Function} progressCallback - 进度回调函数
   * @returns {Promise<boolean>} true表示检测到加密，false表示无加密
   */
  async libarchiveEncryptionCheck(fileBlob, archiveType, progressCallback = null) {
    const initialized = await this.initLibarchive();
    if (!initialized) {
      throw new Error(`libarchive.js 未初始化，无法检测 ${archiveType.name} 格式`);
    }
    try {
      log$2.debug(`开始检测 ${archiveType.name} 文件是否加密...`);
      if (progressCallback) progressCallback(55, "检测加密");
      const archive = await this.Archive.open(fileBlob);
      try {
        const hasEncrypted = await archive.hasEncryptedData();
        if (progressCallback) {
          progressCallback(60, hasEncrypted ? "发现加密" : "无加密");
        }
        log$2.debug(`${archiveType.name} 加密检测完成:`, hasEncrypted === true ? "有加密" : "无加密");
        return hasEncrypted === true;
      } finally {
        try {
          await archive.close();
        } catch (closeError) {
          log$2.warn("关闭archive时出错:", closeError);
        }
      }
    } catch (error) {
      log$2.warn(`⚠️ ${archiveType.name} 加密检测失败:`, error.message);
      return false;
    }
  }
  /**
   * libarchive密码解压
   * @param {Blob} fileBlob - 已下载的文件Blob
   * @param {Object} archiveType - 压缩格式信息
   * @param {string} password - 解压密码
   * @param {Function} progressCallback - 进度回调函数
   * @returns {Promise<Array>} 统一格式的文件列表
   */
  async extractLibarchiveWithPassword(fileBlob, archiveType, password, progressCallback = null) {
    const initialized = await this.initLibarchive();
    if (!initialized) {
      throw new Error(`libarchive.js 未初始化，无法处理 ${archiveType.name} 格式`);
    }
    let archive = null;
    try {
      log$2.debug(`开始libarchive密码解压 ${archiveType.name} 文件...`);
      if (progressCallback) progressCallback(75, "解析中");
      archive = await this.Archive.open(fileBlob);
      await archive.usePassword(password);
      log$2.debug(`${archiveType.name} 文件密码已设置`);
      const extractedFiles = await archive.extractFiles((entry) => {
        if (progressCallback && entry.path) {
          log$2.debug(`正在解压: ${entry.path}`);
        }
      });
      log$2.debug(`${archiveType.name} 全量解压完成`);
      const result = [];
      let processedFiles = 0;
      const totalFiles = countExtractedFiles(extractedFiles);
      const processFiles = (obj, basePath = "") => {
        for (const [name, item] of Object.entries(obj)) {
          const fullPath = basePath ? `${basePath}/${name}` : name;
          if (item instanceof File) {
            result.push({
              name: fullPath,
              size: item.size || 0,
              compressedSize: 0,
              isDirectory: false,
              lastModDate: item.lastModified ? new Date(item.lastModified) : /* @__PURE__ */ new Date(),
              entry: {
                entry: item,
                type: "libarchive-password",
                cachedContent: null,
                // 将在下面设置
                async getContent() {
                  if (!this.cachedContent) {
                    this.cachedContent = await item.arrayBuffer();
                  }
                  return this.cachedContent;
                }
              }
            });
            item.arrayBuffer().then((buffer) => {
              result[result.length - 1].entry.cachedContent = buffer;
            });
          } else if (typeof item === "object" && item !== null) {
            result.push({
              name: fullPath + "/",
              size: 0,
              compressedSize: 0,
              isDirectory: true,
              lastModDate: /* @__PURE__ */ new Date(),
              entry: {
                entry: null,
                type: "libarchive-password",
                async getContent() {
                  throw new Error("Cannot extract directory");
                }
              }
            });
            processFiles(item, fullPath);
          }
          processedFiles++;
          if (progressCallback) {
            const extractProgress = 75 + processedFiles / totalFiles * 25;
            progressCallback(Math.min(extractProgress, 100), "解压中");
          }
        }
      };
      processFiles(extractedFiles);
      if (progressCallback) progressCallback(100, "完成");
      log$2.debug(`libarchive密码解压完成，处理了 ${result.length} 个项目`);
      return result;
    } catch (error) {
      log$2.error(`libarchive密码解压 ${archiveType.name} 失败:`, error);
      throw new Error(`${archiveType.name} 密码解压失败: ${error.message}`);
    } finally {
      if (archive) {
        try {
          await archive.close();
        } catch (closeError) {
          log$2.warn("关闭archive时出错:", closeError);
        }
      }
    }
  }
  /**
   * 使用 libarchive.js 按需解压模式
   * @param {Blob|File} fileBlob - 压缩文件 Blob 对象
   * @param {Object} archiveType - 压缩格式信息
   * @param {Function} progressCallback - 进度回调函数 (progress: 0-100)
   * @returns {Promise<Array>} 统一格式的文件列表
   */
  async extractWithLibarchiveStream(fileBlob, archiveType, progressCallback = null) {
    const initialized = await this.initLibarchive();
    if (!initialized) {
      throw new Error(`libarchive.js 未初始化，无法处理 ${archiveType.name} 格式`);
    }
    let archive = null;
    try {
      archive = await this.Archive.open(fileBlob);
      const filesObject = await archive.getFilesObject();
      log$2.debug(`libarchive.js 获取 ${archiveType.name} 文件列表完成`);
      log$2.debug(`文件内容将按需解压，不占用大量内存`);
      const result = [];
      let processedFiles = 0;
      const totalFiles = countTotalFiles(filesObject);
      const processFiles = (obj, basePath = "") => {
        for (const [name, item] of Object.entries(obj)) {
          const fullPath = basePath ? `${basePath}/${name}` : name;
          if (item && typeof item.extract === "function") {
            result.push({
              name: fullPath,
              size: item.size || 0,
              compressedSize: item.compressedSize || 0,
              isDirectory: false,
              lastModDate: /* @__PURE__ */ new Date(),
              entry: {
                entry: item,
                type: "libarchive",
                async getContent() {
                  log$2.debug(`按需解压文件: ${fullPath}`);
                  try {
                    const file = await item.extract();
                    return await file.arrayBuffer();
                  } catch (error) {
                    log$2.error(`解压文件 ${fullPath} 失败:`, error);
                    throw new Error(`解压文件失败: ${error.message}`);
                  }
                }
              }
            });
          } else if (typeof item === "object" && item !== null) {
            result.push({
              name: fullPath + "/",
              size: 0,
              compressedSize: 0,
              isDirectory: true,
              lastModDate: /* @__PURE__ */ new Date(),
              entry: {
                entry: null,
                type: "libarchive",
                async getContent() {
                  throw new Error("Cannot extract directory");
                }
              }
            });
            processFiles(item, fullPath);
          }
          processedFiles++;
          if (progressCallback) {
            const progress = processedFiles / totalFiles * 100;
            progressCallback(Math.min(progress, 100), "分析文件");
          }
        }
      };
      processFiles(filesObject);
      log$2.debug(`libarchive按需解压准备完成，处理了 ${result.length} 个项目`);
      return result;
    } catch (error) {
      log$2.error(`libarchive.js 解压 ${archiveType.name} 失败:`, error);
      throw new Error(`${archiveType.name} 文件解压失败: ${error.message}`);
    }
  }
  /**
   * 清除文件Blob缓存
   * @param {string} fileUrl - 文件URL
   */
  clearFileBlobCache(fileUrl) {
    if (!fileUrl) return;
    this.fileBlobCache.delete(fileUrl);
    log$2.debug("已清除libarchive服务文件Blob缓存:", fileUrl);
  }
}
const libarchiveService = new LibarchiveService();
const log$1 = createLogger("ArchiveService");
class ArchiveService {
  constructor() {
    this.config = {
      cacheEnabled: true
    };
    this.extractCache = new LRUCache(ARCHIVE_CONSTANTS.CACHE.EXTRACT_SIZE);
    this.fileBlobCache = new LRUCache(ARCHIVE_CONSTANTS.CACHE.FILE_BLOB_SIZE);
  }
  // ===================================================================
  // 统一入口
  // ===================================================================
  /**
   * 统一的压缩文件解压接口
   * @param {Blob|File|string} fileBlobOrUrl - 压缩文件 Blob 对象或URL
   * @param {string} filename - 文件名
   * @param {string} fileUrl - 文件URL（用于缓存键）
   * @param {Function} progressCallback - 进度回调函数 (progress: 0-100)
   * @param {string|null} password - 可选的解压密码
   * @returns {Promise<Array>} 统一格式的文件列表
   */
  async extractArchive(fileBlobOrUrl, filename, fileUrl = "", progressCallback = null, password = null) {
    log$1.debug("开始解压文件:", filename);
    if (this.config.cacheEnabled && fileUrl) {
      const cacheKey = `${fileUrl}_${filename}`;
      const cached = this.extractCache.get(cacheKey);
      if (cached) {
        log$1.debug("使用缓存的解压结果:", filename);
        if (progressCallback) progressCallback(100);
        return cached;
      }
    }
    const archiveType = getArchiveType(filename);
    if (!archiveType.supported) {
      throw new Error(`不支持的压缩格式: ${archiveType.name}`);
    }
    let result;
    if (archiveType.name === "ZIP") {
      result = await zipService.extractArchive(fileBlobOrUrl, filename, fileUrl, progressCallback, password);
    } else {
      result = await libarchiveService.extractArchive(fileBlobOrUrl, filename, fileUrl, progressCallback, password, archiveType);
    }
    if (this.config.cacheEnabled && fileUrl && result) {
      const cacheKey = `${fileUrl}_${filename}`;
      this.extractCache.set(cacheKey, result);
    }
    log$1.debug(`解压完成，共 ${result.length} 个文件/目录`);
    return result;
  }
  // ===================================================================
  // 缓存管理
  // ===================================================================
  /**
   * 清除解压结果缓存
   * @param {string} fileUrl - 文件URL
   * @param {string} filename - 文件名
   */
  clearFileCache(fileUrl, filename) {
    if (!fileUrl || !filename) return;
    const cacheKey = `${fileUrl}_${filename}`;
    this.extractCache.delete(cacheKey);
    log$1.debug("已清除解压缓存:", cacheKey);
  }
  /**
   * 清除文件Blob缓存
   * @param {string} fileUrl - 文件URL
   */
  clearFileBlobCache(fileUrl) {
    if (!fileUrl) return;
    this.fileBlobCache.delete(fileUrl);
    clearSharedFileBlobCache(fileUrl);
    log$1.debug("已清除文件Blob缓存:", fileUrl);
  }
  // ===================================================================
  // 工具方法
  // ===================================================================
  /**
   * 统一的文件内容获取接口
   * @param {Object} entryWrapper - 文件条目包装对象
   * @returns {Promise<ArrayBuffer>} 文件内容
   */
  async getFileContent(entryWrapper) {
    try {
      return await entryWrapper.getContent();
    } catch (error) {
      log$1.error("获取文件内容失败:", error);
      throw new Error(`获取文件内容失败: ${error.message}`);
    }
  }
}
const archiveService = new ArchiveService();
const LivePhotoErrorType = {
  VIDEO_LOAD_ERROR: "VIDEO_LOAD_ERROR",
  PHOTO_LOAD_ERROR: "PHOTO_LOAD_ERROR",
  PLAYBACK_ERROR: "PLAYBACK_ERROR",
  NETWORK_ERROR: "NETWORK_ERROR",
  FORMAT_NOT_SUPPORTED: "FORMAT_NOT_SUPPORTED"
};
const PlaybackStyle = {
  HINT: "hint",
  // 短预览（约1秒）
  FULL: "full"
  // 完整播放
};
const createLivePhotoError = (type, message, originalError = null) => ({
  type,
  message,
  originalError,
  timestamp: Date.now()
});
const isMobile = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};
function useLivePhoto(options = {}) {
  const log2 = createLogger("LivePhoto");
  const readSources = () => ({
    photoSrc: unref(options.photoSrc) || "",
    videoSrc: unref(options.videoSrc) || ""
  });
  const initialSources = readSources();
  const config2 = reactive({
    photoSrc: initialSources.photoSrc,
    videoSrc: initialSources.videoSrc,
    autoplay: options.autoplay ?? false,
    lazyLoad: options.lazyLoad ?? true,
    longPressDelay: options.longPressDelay ?? 300,
    enableVibration: options.enableVibration ?? true,
    stillImageTime: options.stillImageTime ?? null,
    playbackStyle: options.playbackStyle ?? PlaybackStyle.FULL
  });
  const state = reactive({
    isPlaying: false,
    isLoading: false,
    isLoaded: false,
    hasError: false,
    errorMessage: "",
    progress: 0,
    duration: 0,
    currentTime: 0,
    isWarmed: false,
    // 视频是否已预热
    isVisible: false
    // 是否在视口内
  });
  const containerRef = ref(null);
  const videoRef = ref(null);
  const imageRef = ref(null);
  let touchStartTime = 0;
  let isWithin = false;
  let stopIntersectionObserver = null;
  let previewTimeoutId = null;
  let isLazyLoadSetup = false;
  const canPlay = computed(() => state.isLoaded && !state.hasError);
  const isMobileDevice = computed(() => isMobile());
  const warmVideo = async () => {
    const video = videoRef.value;
    if (!video || state.isWarmed || !video.src) return;
    try {
      const wasMuted = video.muted;
      video.muted = true;
      await video.play();
      video.pause();
      video.muted = wasMuted;
      video.currentTime = 0;
      state.isWarmed = true;
    } catch (e) {
      log2.warn("[LivePhoto] Video warm-up failed:", e.message);
    }
  };
  const setupLazyLoad = () => {
    if (!config2.lazyLoad || !containerRef.value || isLazyLoadSetup) return;
    const { stop: stop2 } = useIntersectionObserver(
      containerRef,
      (entries) => {
        entries.forEach((entry) => {
          state.isVisible = entry.isIntersecting;
          if (entry.isIntersecting && videoRef.value && !videoRef.value.src && config2.videoSrc) {
            videoRef.value.src = config2.videoSrc;
            state.isLoading = true;
          }
        });
      },
      { rootMargin: "100px" }
    );
    stopIntersectionObserver = stop2;
    isLazyLoadSetup = true;
  };
  const updateProgress = () => {
    const video = videoRef.value;
    if (!video || !video.buffered.length) return;
    const lastRangeIndex = Math.max(0, video.buffered.length - 1);
    const buffered = video.buffered.end(lastRangeIndex);
    const duration = video.duration || 1;
    state.progress = Math.floor(buffered / duration * 100);
    state.duration = duration;
    options.onProgress?.(state.progress);
    if (state.progress >= 100) {
      state.isLoading = false;
    }
  };
  const play = async () => {
    const video = videoRef.value;
    if (!video || state.isPlaying || state.hasError) return;
    try {
      if (!video.src && config2.videoSrc) {
        video.src = config2.videoSrc;
        state.isLoading = true;
      }
      if (config2.playbackStyle === PlaybackStyle.HINT && config2.stillImageTime) {
        const previewStart = Math.max(0, config2.stillImageTime - 1);
        video.currentTime = previewStart;
      } else {
        video.currentTime = 0;
      }
      await video.play();
      state.isPlaying = true;
      if (config2.enableVibration && navigator.vibrate) {
        navigator.vibrate(50);
      }
      options.onPlay?.();
      if (config2.playbackStyle === PlaybackStyle.HINT && config2.stillImageTime) {
        const duration = config2.stillImageTime - video.currentTime;
        previewTimeoutId = setTimeout(() => {
          stop();
        }, duration * 1e3);
      }
    } catch (error) {
      handleError(error);
    }
  };
  const pause = () => {
    const video = videoRef.value;
    if (!video || !state.isPlaying) return;
    video.pause();
    state.isPlaying = false;
    clearTimeout(previewTimeoutId);
    options.onPause?.();
  };
  const stop = () => {
    const video = videoRef.value;
    if (!video) return;
    video.pause();
    state.isPlaying = false;
    clearTimeout(previewTimeoutId);
    options.onPause?.();
  };
  const toggle = () => {
    state.isPlaying ? pause() : play();
  };
  const handleError = (error) => {
    if (!isWithin && error instanceof DOMException && error.name === "AbortError") {
      return;
    }
    state.hasError = true;
    state.isPlaying = false;
    state.isLoading = false;
    state.isLoaded = false;
    let errorType = LivePhotoErrorType.PLAYBACK_ERROR;
    let messageKey = "livePhoto.errors.playbackFailed";
    if (error instanceof DOMException) {
      const nameToKey = {
        NotAllowedError: "livePhoto.errors.notAllowed",
        AbortError: "livePhoto.errors.aborted",
        NotSupportedError: "livePhoto.errors.notSupported",
        NetworkError: "livePhoto.errors.networkError"
      };
      messageKey = nameToKey[error.name] || "livePhoto.errors.playbackFailed";
      if (error.name === "NotSupportedError") {
        errorType = LivePhotoErrorType.FORMAT_NOT_SUPPORTED;
      }
    } else if (error.target?.error) {
      const mediaError = error.target.error;
      const codeToKey = {
        1: "livePhoto.errors.aborted",
        2: "livePhoto.errors.networkError",
        3: "livePhoto.errors.decodeFailed",
        4: "livePhoto.errors.notSupported"
      };
      messageKey = codeToKey[mediaError.code] || "livePhoto.errors.videoLoadFailed";
      errorType = mediaError.code === 2 ? LivePhotoErrorType.NETWORK_ERROR : LivePhotoErrorType.VIDEO_LOAD_ERROR;
    }
    state.errorMessage = messageKey;
    const livePhotoError = createLivePhotoError(errorType, messageKey, error);
    options.onError?.(livePhotoError);
  };
  const handleTouchStart = (e) => {
    e.preventDefault();
    touchStartTime = Date.now();
    isWithin = true;
    play();
  };
  const handleTouchEnd = (e) => {
    const touchDuration = Date.now() - touchStartTime;
    isWithin = false;
    if (touchDuration < config2.longPressDelay) {
      options.onClick?.(e);
    }
    stop();
  };
  const handleMouseEnter = () => {
    if (!state.hasError) {
      play();
    }
  };
  const handleMouseLeave = () => {
    if (!state.hasError) {
      stop();
    }
  };
  const handleLoadedMetadata = () => {
    const video = videoRef.value;
    if (!video) return;
    state.duration = video.duration;
    if (config2.stillImageTime === null) {
      config2.stillImageTime = video.duration / 2;
    }
  };
  const handleCanPlayThrough = () => {
    state.isLoaded = true;
    state.isLoading = false;
    options.onCanPlay?.();
  };
  const handleEnded = () => {
    state.isPlaying = false;
    options.onEnded?.();
  };
  const handleTimeUpdate = () => {
    const video = videoRef.value;
    if (!video) return;
    state.currentTime = video.currentTime;
  };
  const handleProgressEvent = () => updateProgress();
  let stopVideoEventListeners = [];
  const setupVideoEvents = () => {
    const video = videoRef.value;
    if (!video) return;
    cleanupVideoEvents();
    stopVideoEventListeners = [
      useEventListener(video, "progress", handleProgressEvent),
      useEventListener(video, "loadedmetadata", handleLoadedMetadata),
      useEventListener(video, "canplaythrough", handleCanPlayThrough),
      useEventListener(video, "ended", handleEnded),
      useEventListener(video, "error", handleError),
      useEventListener(video, "timeupdate", handleTimeUpdate)
    ];
  };
  const cleanupVideoEvents = () => {
    if (Array.isArray(stopVideoEventListeners) && stopVideoEventListeners.length > 0) {
      stopVideoEventListeners.forEach((stop2) => {
        try {
          stop2?.();
        } catch {
        }
      });
    }
    stopVideoEventListeners = [];
  };
  const destroy = () => {
    stopIntersectionObserver?.();
    stopIntersectionObserver = null;
    clearTimeout(previewTimeoutId);
    cleanupVideoEvents();
    const video = videoRef.value;
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
    const image = imageRef.value;
    if (image) {
      image.removeAttribute("src");
    }
  };
  const updateConfig = (newOptions) => {
    Object.assign(config2, newOptions);
  };
  const reset = () => {
    state.isPlaying = false;
    state.isLoading = false;
    state.hasError = false;
    state.errorMessage = "";
    state.progress = 0;
    state.currentTime = 0;
    const video = videoRef.value;
    if (video) {
      video.currentTime = 0;
    }
  };
  watch(
    () => [unref(options.photoSrc), unref(options.videoSrc)],
    ([newPhotoSrc, newVideoSrc]) => {
      const nextPhotoSrc = newPhotoSrc || "";
      const nextVideoSrc = newVideoSrc || "";
      if (nextPhotoSrc === config2.photoSrc && nextVideoSrc === config2.videoSrc) return;
      reset();
      config2.photoSrc = nextPhotoSrc;
      config2.videoSrc = nextVideoSrc;
      state.isLoaded = false;
      state.isWarmed = false;
      const video = videoRef.value;
      if (video && config2.lazyLoad) {
        video.pause();
        video.removeAttribute("src");
        video.load();
        if (state.isVisible && config2.videoSrc) {
          video.src = config2.videoSrc;
          state.isLoading = true;
        }
      }
    }
  );
  onMounted(() => {
    setupVideoEvents();
    setupLazyLoad();
    const warmOnInteraction = () => {
      warmVideo();
      stopWarmTouch?.();
      stopWarmMouse?.();
      stopWarmTouch = null;
      stopWarmMouse = null;
    };
    let stopWarmTouch = useEventListener(containerRef, "touchstart", warmOnInteraction, { once: true, passive: true });
    let stopWarmMouse = useEventListener(containerRef, "mouseenter", warmOnInteraction, { once: true });
  });
  onBeforeUnmount(() => {
    destroy();
  });
  return {
    // 状态
    state,
    config: config2,
    // DOM 引用
    containerRef,
    videoRef,
    imageRef,
    // 计算属性
    canPlay,
    isMobileDevice,
    // 方法
    play,
    pause,
    stop,
    toggle,
    warmVideo,
    destroy,
    reset,
    updateConfig,
    // 事件处理器
    handleTouchStart,
    handleTouchEnd,
    handleMouseEnter,
    handleMouseLeave
  };
}
const _hoisted_1$b = { class: "live-photo-viewer__media" };
const _hoisted_2$b = ["src", "data-src", "muted", "loop"];
const _hoisted_3$a = ["src", "alt"];
const _hoisted_4$a = {
  key: 0,
  class: "live-photo-viewer__progress"
};
const _hoisted_5$9 = ["innerHTML"];
const _hoisted_6$6 = {
  key: 2,
  class: "live-photo-viewer__badge-text"
};
const _hoisted_7$4 = {
  key: 0,
  class: "live-photo-viewer__warning"
};
const _hoisted_8$2 = {
  key: 3,
  class: "live-photo-viewer__loading"
};
const _sfc_main$d = {
  __name: "LivePhotoViewer",
  props: {
    // 必需属性
    photoSrc: {
      type: String,
      required: true
    },
    videoSrc: {
      type: String,
      required: true
    },
    // 尺寸控制
    width: {
      type: [Number, String],
      default: null
    },
    height: {
      type: [Number, String],
      default: null
    },
    aspectRatio: {
      type: [Number, String],
      default: null
    },
    maxWidth: {
      type: [Number, String],
      default: "100%"
    },
    maxHeight: {
      type: [Number, String],
      default: null
    },
    // 行为控制
    autoplay: {
      type: Boolean,
      default: false
    },
    lazyLoad: {
      type: Boolean,
      default: true
    },
    longPressDelay: {
      type: Number,
      default: 300
    },
    enableVibration: {
      type: Boolean,
      default: true
    },
    muted: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: false
    },
    playbackStyle: {
      type: String,
      default: PlaybackStyle.FULL,
      validator: (value) => Object.values(PlaybackStyle).includes(value)
    },
    stillImageTime: {
      type: Number,
      default: null
    },
    // 外观控制
    darkMode: {
      type: Boolean,
      default: false
    },
    borderRadius: {
      type: [Number, String],
      default: 8
    },
    showBadge: {
      type: Boolean,
      default: true
    },
    showBadgeText: {
      type: Boolean,
      default: true
    },
    badgeText: {
      type: String,
      default: ""
    },
    staticBadge: {
      type: Boolean,
      default: false
    },
    showProgress: {
      type: Boolean,
      default: true
    },
    showLoadingIndicator: {
      type: Boolean,
      default: false
    },
    alt: {
      type: String,
      default: "Live Photo"
    },
    // 样式定制
    imageStyle: {
      type: Object,
      default: () => ({})
    },
    videoStyle: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["play", "pause", "ended", "error", "load", "progress", "canplay", "click"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { t } = useI18n();
    const livePhotoBadgeIconSvg = LIVE_PHOTO_BADGE_ICON_SVG;
    const props = __props;
    const emit = __emit;
    const {
      state,
      containerRef,
      videoRef,
      imageRef,
      canPlay,
      isMobileDevice,
      play,
      pause,
      stop,
      toggle,
      warmVideo,
      destroy,
      reset,
      handleTouchStart: baseTouchStart,
      handleTouchEnd: baseTouchEnd,
      handleMouseEnter,
      handleMouseLeave
    } = useLivePhoto({
      // 传入 Ref，确保 composable 内部 watch 能正确响应 prop 变化
      photoSrc: toRef(props, "photoSrc"),
      videoSrc: toRef(props, "videoSrc"),
      autoplay: props.autoplay,
      lazyLoad: props.lazyLoad,
      longPressDelay: props.longPressDelay,
      enableVibration: props.enableVibration,
      stillImageTime: props.stillImageTime,
      playbackStyle: props.playbackStyle,
      onPlay: () => emit("play"),
      onPause: () => emit("pause"),
      onEnded: () => emit("ended"),
      onError: (error) => emit("error", error),
      onProgress: (progress) => emit("progress", progress),
      onCanPlay: () => emit("canplay"),
      onClick: (e) => emit("click", e)
    });
    const warningMessage = computed(() => {
      if (!state.hasError || !state.errorMessage) return "";
      if (typeof state.errorMessage === "string" && state.errorMessage.startsWith("livePhoto.")) {
        return t(state.errorMessage);
      }
      return state.errorMessage;
    });
    const parseAspectRatio = (value) => {
      if (value == null) return null;
      if (typeof value === "number") return value > 0 ? value : null;
      const text = value.toString().trim();
      if (!text) return null;
      if (text.includes("/")) {
        const [aRaw, bRaw] = text.split("/");
        const a = Number(aRaw?.trim());
        const b = Number(bRaw?.trim());
        if (Number.isFinite(a) && Number.isFinite(b) && a > 0 && b > 0) return a / b;
        return null;
      }
      const num = Number(text);
      if (!Number.isFinite(num) || num <= 0) return null;
      return num;
    };
    const measuredAspectRatio = ref(null);
    const containerSize = ref({ width: 0, height: 0 });
    const measureContainer = () => {
      const el = containerRef.value;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      containerSize.value = { width: rect.width, height: rect.height };
    };
    const { stop: stopResizeObserver } = useResizeObserver(containerRef, () => {
      measureContainer();
    });
    const baseAspectRatio = computed(() => {
      return parseAspectRatio(props.aspectRatio) ?? measuredAspectRatio.value ?? null;
    });
    const contentStyle = computed(() => {
      const ratio = baseAspectRatio.value;
      const { width, height } = containerSize.value;
      if (!ratio || !width || !height) {
        return { top: "0px", left: "0px", width: "100%", height: "100%" };
      }
      const containerRatio = width / height;
      let contentWidth = width;
      let contentHeight = height;
      let left = 0;
      let top = 0;
      if (containerRatio > ratio) {
        contentHeight = height;
        contentWidth = height * ratio;
        left = (width - contentWidth) / 2;
        top = 0;
      } else {
        contentWidth = width;
        contentHeight = width / ratio;
        left = 0;
        top = (height - contentHeight) / 2;
      }
      return {
        top: `${top}px`,
        left: `${left}px`,
        width: `${contentWidth}px`,
        height: `${contentHeight}px`
      };
    });
    const containerStyle = computed(() => {
      const style = {};
      if (!props.width && !props.height) {
        style.width = "100%";
      }
      if (props.width) {
        style.width = typeof props.width === "number" ? `${props.width}px` : props.width;
      }
      if (props.height) {
        style.height = typeof props.height === "number" ? `${props.height}px` : props.height;
      }
      if (props.aspectRatio) {
        style.aspectRatio = props.aspectRatio.toString();
      }
      if (props.maxWidth) {
        style.maxWidth = typeof props.maxWidth === "number" ? `${props.maxWidth}px` : props.maxWidth;
      }
      if (props.maxHeight) {
        style.maxHeight = typeof props.maxHeight === "number" ? `${props.maxHeight}px` : props.maxHeight;
      }
      if (props.borderRadius) {
        style["--live-photo-border-radius"] = typeof props.borderRadius === "number" ? `${props.borderRadius}px` : props.borderRadius;
      }
      return style;
    });
    const handleTouchStart = (e) => {
      baseTouchStart(e);
    };
    const handleTouchEnd = (e) => {
      baseTouchEnd(e);
    };
    const handleImageLoad = (e) => {
      if (!props.aspectRatio && imageRef.value) {
        const img = imageRef.value;
        const ratio = img.naturalWidth / img.naturalHeight;
        measuredAspectRatio.value = ratio;
        if (containerRef.value && !props.width && !props.height) {
          containerRef.value.style.aspectRatio = ratio.toString();
        }
      }
      requestAnimationFrame(() => measureContainer());
      emit("load", e);
    };
    const handleImageError = (e) => {
      state.hasError = true;
      state.isPlaying = false;
      state.isLoading = false;
      state.isLoaded = false;
      state.errorMessage = "livePhoto.errors.photoLoadFailed";
      emit("error", { type: LivePhotoErrorType.PHOTO_LOAD_ERROR, message: state.errorMessage, originalError: e });
    };
    const handleVideoLoadedMetadata = () => {
    };
    watch(
      () => [props.autoplay, canPlay.value],
      ([autoplay, ready]) => {
        if (autoplay && ready) {
          play();
        }
      },
      { immediate: true }
    );
    __expose({
      play,
      pause,
      stop,
      toggle,
      reset,
      destroy,
      warmVideo,
      state,
      canPlay
    });
    onMounted(() => {
      measureContainer();
    });
    onBeforeUnmount(() => {
      stopResizeObserver?.();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "containerRef",
        ref: containerRef,
        class: normalizeClass(["live-photo-viewer", {
          "live-photo-viewer--playing": unref(state).isPlaying,
          "live-photo-viewer--loading": unref(state).isLoading,
          "live-photo-viewer--error": unref(state).hasError,
          "live-photo-viewer--dark": __props.darkMode
        }]),
        style: normalizeStyle(containerStyle.value)
      }, [
        createBaseVNode("div", {
          class: "live-photo-viewer__content",
          style: normalizeStyle(contentStyle.value)
        }, [
          createBaseVNode("div", _hoisted_1$b, [
            createBaseVNode("video", {
              ref_key: "videoRef",
              ref: videoRef,
              class: "live-photo-viewer__video",
              src: __props.lazyLoad ? void 0 : __props.videoSrc,
              "data-src": __props.lazyLoad ? __props.videoSrc : void 0,
              playsinline: "",
              preload: "metadata",
              muted: __props.muted,
              loop: __props.loop,
              onLoadedmetadata: handleVideoLoadedMetadata
            }, null, 40, _hoisted_2$b),
            createBaseVNode("img", {
              ref_key: "imageRef",
              ref: imageRef,
              class: "live-photo-viewer__image",
              src: __props.photoSrc,
              alt: __props.alt,
              loading: "lazy",
              onLoad: handleImageLoad,
              onError: handleImageError
            }, null, 40, _hoisted_3$a)
          ]),
          __props.showProgress && unref(state).isLoading ? (openBlock(), createElementBlock("div", _hoisted_4$a, [
            createBaseVNode("div", {
              class: "live-photo-viewer__progress-bar",
              style: normalizeStyle({ width: `${unref(state).progress}%` })
            }, null, 4)
          ])) : createCommentVNode("", true),
          __props.showBadge ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(["live-photo-viewer__badge", { "live-photo-viewer__badge--static": __props.staticBadge }]),
            onMouseenter: _cache[0] || (_cache[0] = ($event) => !unref(isMobileDevice) && unref(handleMouseEnter)()),
            onMouseleave: _cache[1] || (_cache[1] = ($event) => !unref(isMobileDevice) && unref(handleMouseLeave)())
          }, [
            unref(state).hasError ? (openBlock(), createBlock(unref(IconExclamationSolid), {
              key: 0,
              class: "live-photo-viewer__badge-icon live-photo-viewer__badge-icon--error"
            })) : (openBlock(), createElementBlock("span", {
              key: 1,
              innerHTML: unref(livePhotoBadgeIconSvg)
            }, null, 8, _hoisted_5$9)),
            __props.showBadgeText ? (openBlock(), createElementBlock("span", _hoisted_6$6, toDisplayString(__props.badgeText || unref(t)("livePhoto.badge")), 1)) : createCommentVNode("", true)
          ], 34)) : createCommentVNode("", true),
          unref(isMobileDevice) ? (openBlock(), createElementBlock("div", {
            key: 2,
            class: "live-photo-viewer__overlay",
            onTouchstart: withModifiers(handleTouchStart, ["prevent"]),
            onTouchend: handleTouchEnd,
            onTouchcancel: handleTouchEnd
          }, null, 32)) : createCommentVNode("", true),
          createVNode(Transition, { name: "live-photo-warning" }, {
            default: withCtx(() => [
              unref(state).hasError && unref(state).errorMessage ? (openBlock(), createElementBlock("div", _hoisted_7$4, toDisplayString(warningMessage.value), 1)) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          unref(state).isLoading && __props.showLoadingIndicator ? (openBlock(), createElementBlock("div", _hoisted_8$2, [
            createVNode(_sfc_main$e, {
              size: "xl",
              "icon-class": "text-white"
            })
          ])) : createCommentVNode("", true)
        ], 4)
      ], 6);
    };
  }
};
function useProviderSelector({
  providers,
  nativeUrl,
  nativeLabel,
  initialKey = "native",
  labelMap,
  filter: filter2
}) {
  const selectedKey = ref(initialKey);
  const providerOptions = computed(() => {
    const map = unref(providers) || {};
    const native = String(unref(nativeUrl) || "").trim();
    const labelForNative = unref(nativeLabel) || "native";
    const mappedLabels = unref(labelMap) || {};
    const options = [];
    const hasNativePlaceholder = Object.values(map).some((v) => v === "native");
    if (!hasNativePlaceholder && native) {
      options.push({
        key: "native",
        label: labelForNative,
        url: native,
        isNative: true
      });
    }
    for (const [key, rawUrl] of Object.entries(map)) {
      if (!rawUrl) continue;
      if (typeof filter2 === "function" && !filter2({ key, url: rawUrl })) {
        continue;
      }
      if (rawUrl === "native") {
        if (!native) continue;
        options.push({
          key,
          label: key === "native" ? labelForNative : key,
          url: native,
          isNative: true
        });
        continue;
      }
      options.push({
        key,
        label: mappedLabels[key] || key,
        url: String(rawUrl),
        isNative: false
      });
    }
    return options;
  });
  const currentOption = computed(() => {
    const options = providerOptions.value;
    if (!options.length) return null;
    return options.find((opt) => opt.key === selectedKey.value) || options[0];
  });
  const currentUrl = computed(() => {
    return currentOption.value?.url || "";
  });
  const isNativeProvider = computed(() => {
    return Boolean(currentOption.value?.isNative);
  });
  const currentIframeProviders = computed(() => {
    const opt = currentOption.value;
    if (!opt || opt.isNative) return {};
    if (!opt.url) return {};
    return { [opt.key]: opt.url };
  });
  watch(
    providerOptions,
    (options) => {
      if (!options.length) {
        selectedKey.value = "";
        return;
      }
      const exists = options.some((opt) => opt.key === selectedKey.value);
      if (exists) return;
      selectedKey.value = options.some((opt) => opt.key === "native") ? "native" : options[0].key;
    },
    { immediate: true }
  );
  return {
    providerOptions,
    selectedKey,
    currentOption,
    currentUrl,
    isNativeProvider,
    currentIframeProviders
  };
}
function useElementFullscreen(targetRef, options = {}) {
  const log2 = createLogger("ElementFullscreen");
  const includeChildren = options?.includeChildren !== false;
  const isFullscreen = ref(false);
  const getTargetEl = () => {
    const value = typeof targetRef === "function" ? targetRef() : unref(targetRef);
    return unref(value) || null;
  };
  const syncState = () => {
    const el = getTargetEl();
    const fullscreenEl = document.fullscreenElement;
    if (!el || !fullscreenEl) {
      isFullscreen.value = false;
      return;
    }
    isFullscreen.value = includeChildren ? fullscreenEl === el || el.contains(fullscreenEl) : fullscreenEl === el;
  };
  const requestFullscreen = async () => {
    const el = getTargetEl();
    if (!el) {
      log2.warn("[useElementFullscreen] No target element found for fullscreen");
      return;
    }
    try {
      await el.requestFullscreen();
    } catch (err) {
      log2.warn("[useElementFullscreen] Fullscreen request failed:", err);
    } finally {
      syncState();
    }
  };
  const exitFullscreen = async () => {
    const el = getTargetEl();
    const fullscreenEl = document.fullscreenElement;
    if (!el || !fullscreenEl) return;
    if (includeChildren) {
      if (fullscreenEl !== el && !el.contains(fullscreenEl)) return;
    } else {
      if (fullscreenEl !== el) return;
    }
    try {
      await document.exitFullscreen();
    } catch {
    } finally {
      syncState();
    }
  };
  const toggleFullscreen = async () => {
    if (isFullscreen.value) {
      await exitFullscreen();
      return;
    }
    await requestFullscreen();
  };
  const handleFullscreenChange = () => {
    syncState();
  };
  useEventListener(document, "fullscreenchange", handleFullscreenChange);
  onMounted(() => {
    syncState();
  });
  return {
    isFullscreen,
    requestFullscreen,
    exitFullscreen,
    toggleFullscreen,
    syncState
  };
}
const _hoisted_1$a = {
  key: 0,
  class: "office-header"
};
const _hoisted_2$a = { class: "office-type-label" };
const _hoisted_3$9 = { class: "office-header-actions" };
const _hoisted_4$9 = ["value"];
const _hoisted_5$8 = ["value"];
const _hoisted_6$5 = ["title"];
const _sfc_main$c = {
  __name: "PreviewProviderHeader",
  props: {
    title: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: String,
      default: ""
    },
    show: {
      type: Boolean,
      default: true
    },
    showSelect: {
      type: Boolean,
      default: true
    },
    /** 是否显示全屏按钮 */
    showFullscreen: {
      type: Boolean,
      default: false
    },
    /** 全屏目标元素的 ref（由父组件传入） */
    fullscreenTarget: {
      type: Object,
      default: null
    }
  },
  emits: ["update:modelValue", "change", "fullscreen-change"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const handleChange = (e) => {
      const value = String(e?.target?.value || "");
      emit("update:modelValue", value);
      emit("change", value);
    };
    const { isFullscreen, toggleFullscreen } = useElementFullscreen(() => props.fullscreenTarget);
    const handleToggleFullscreen = async () => {
      await toggleFullscreen();
      emit("fullscreen-change", isFullscreen.value);
    };
    watch(isFullscreen, (val) => {
      emit("fullscreen-change", val);
    });
    return (_ctx, _cache) => {
      return __props.show ? (openBlock(), createElementBlock("div", _hoisted_1$a, [
        createBaseVNode("span", _hoisted_2$a, toDisplayString(__props.title), 1),
        createBaseVNode("div", _hoisted_3$9, [
          __props.showSelect ? (openBlock(), createElementBlock("select", {
            key: 0,
            value: __props.modelValue,
            class: "office-provider-select",
            onChange: handleChange
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (opt) => {
              return openBlock(), createElementBlock("option", {
                key: opt.key,
                value: opt.key
              }, toDisplayString(opt.label), 9, _hoisted_5$8);
            }), 128))
          ], 40, _hoisted_4$9)) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "actions", {}, void 0, true),
          __props.showFullscreen ? (openBlock(), createElementBlock("button", {
            key: 1,
            type: "button",
            class: "fullscreen-btn",
            onClick: handleToggleFullscreen,
            title: unref(isFullscreen) ? unref(t)("fileView.preview.exitFullscreen") : unref(t)("fileView.preview.fullscreen")
          }, [
            !unref(isFullscreen) ? (openBlock(), createBlock(unref(IconExpand), {
              key: 0,
              size: "sm",
              class: "w-4 h-4"
            })) : (openBlock(), createBlock(unref(IconCollapse), {
              key: 1,
              size: "sm",
              class: "w-4 h-4"
            }))
          ], 8, _hoisted_6$5)) : createCommentVNode("", true)
        ])
      ])) : createCommentVNode("", true);
    };
  }
};
const PreviewProviderHeader = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-f9f9b4dd"]]);
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var artplayer = { exports: {} };
artplayer.exports;
(function(module, exports) {
  /*!
   * artplayer.js v5.2.5
   * Github: https://github.com/zhw2590582/ArtPlayer
   * (c) 2017-2025 Harvey Zack
   * Released under the MIT License.
   */
  !function(e, t, r, a, o, i, n, s) {
    var l = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof commonjsGlobal ? commonjsGlobal : {}, c = "function" == typeof l[a] && l[a], p = c.i || {}, u = c.cache || {}, d = "function" == typeof commonjsRequire && commonjsRequire.bind(module);
    function f(t2, r2) {
      if (!u[t2]) {
        if (!e[t2]) {
          if (o[t2]) return o[t2];
          var i2 = "function" == typeof l[a] && l[a];
          if (!r2 && i2) return i2(t2, true);
          if (c) return c(t2, true);
          if (d && "string" == typeof t2) return d(t2);
          var n2 = Error("Cannot find module '" + t2 + "'");
          throw n2.code = "MODULE_NOT_FOUND", n2;
        }
        p2.resolve = function(r3) {
          var a2 = e[t2][1][r3];
          return null != a2 ? a2 : r3;
        }, p2.cache = {};
        var s2 = u[t2] = new f.Module(t2);
        e[t2][0].call(s2.exports, p2, s2, s2.exports, l);
      }
      return u[t2].exports;
      function p2(e2) {
        var t3 = p2.resolve(e2);
        return false === t3 ? {} : f(t3);
      }
    }
    f.isParcelRequire = true, f.Module = function(e2) {
      this.id = e2, this.bundle = f, this.require = d, this.exports = {};
    }, f.modules = e, f.cache = u, f.parent = c, f.distDir = void 0, f.publicUrl = void 0, f.devServer = void 0, f.i = p, f.register = function(t2, r2) {
      e[t2] = [function(e2, t3) {
        t3.exports = r2;
      }, {}];
    }, Object.defineProperty(f, "root", { get: function() {
      return l[a];
    } }), l[a] = f;
    for (var h2 = 0; h2 < t.length; h2++) f(t[h2]);
    {
      var m = f(r);
      module.exports = m;
    }
  }({ jz4E5: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r);
    var i = e("../package.json"), n = e("bundle-text:./style/index.less"), s = o.interopDefault(n), l = e("option-validator"), c = o.interopDefault(l), p = e("./utils/emitter"), u = o.interopDefault(p), d = e("./utils"), f = e("./scheme"), h2 = o.interopDefault(f), m = e("./config"), g = o.interopDefault(m), v = e("./template"), y = o.interopDefault(v), b = e("./i18n"), x = o.interopDefault(b), w = e("./player"), j = o.interopDefault(w), k = e("./control"), S = o.interopDefault(k), E = e("./contextmenu"), z = o.interopDefault(E), $ = e("./info"), I = o.interopDefault($), T = e("./subtitle"), M = o.interopDefault(T), F = e("./events"), P = o.interopDefault(F), C = e("./hotkey"), D = o.interopDefault(C), A = e("./layer"), R = o.interopDefault(A), L = e("./loading"), O = o.interopDefault(L), q = e("./notice"), _ = o.interopDefault(q), H = e("./mask"), V = o.interopDefault(H), N = e("./icons"), B = o.interopDefault(N), U = e("./setting"), Y = o.interopDefault(U), W = e("./storage"), K = o.interopDefault(W), Q = e("./plugins"), X = o.interopDefault(Q);
    let Z = 0, G = [];
    class J extends u.default {
      constructor(e2, t2) {
        super(), this.id = ++Z;
        let r2 = d.mergeDeep(J.option, e2);
        if (r2.container = e2.container, this.option = (0, c.default)(r2, h2.default), this.isLock = false, this.isReady = false, this.isFocus = false, this.isInput = false, this.isRotate = false, this.isDestroy = false, this.template = new y.default(this), this.events = new P.default(this), this.storage = new K.default(this), this.icons = new B.default(this), this.i18n = new x.default(this), this.notice = new _.default(this), this.player = new j.default(this), this.layers = new R.default(this), this.controls = new S.default(this), this.contextmenu = new z.default(this), this.subtitle = new M.default(this), this.info = new I.default(this), this.loading = new O.default(this), this.hotkey = new D.default(this), this.mask = new V.default(this), this.setting = new Y.default(this), this.plugins = new X.default(this), "function" == typeof t2 && this.on("ready", () => t2.call(this, this)), J.DEBUG) {
          let e3 = (e4) => console.log(`[ART.${this.id}] -> ${e4}`);
          e3("Version@" + J.version);
          for (let t3 = 0; t3 < g.default.events.length; t3++) this.on("video:" + g.default.events[t3], (t4) => e3("Event@" + t4.type));
        }
        G.push(this);
      }
      static get instances() {
        return G;
      }
      static get version() {
        return i.version;
      }
      static get config() {
        return g.default;
      }
      static get utils() {
        return d;
      }
      static get scheme() {
        return h2.default;
      }
      static get Emitter() {
        return u.default;
      }
      static get validator() {
        return c.default;
      }
      static get kindOf() {
        return c.default.kindOf;
      }
      static get html() {
        return y.default.html;
      }
      static get option() {
        return { id: "", container: "#artplayer", url: "", poster: "", type: "", theme: "#f00", volume: 0.7, isLive: false, muted: false, autoplay: false, autoSize: false, autoMini: false, loop: false, flip: false, playbackRate: false, aspectRatio: false, screenshot: false, setting: false, hotkey: true, pip: false, mutex: true, backdrop: true, fullscreen: false, fullscreenWeb: false, subtitleOffset: false, miniProgressBar: false, useSSR: false, playsInline: true, lock: false, gesture: true, fastForward: false, autoPlayback: false, autoOrientation: false, airplay: false, proxy: void 0, layers: [], contextmenu: [], controls: [], settings: [], quality: [], highlight: [], plugins: [], thumbnails: { url: "", number: 60, column: 10, width: 0, height: 0, scale: 1 }, subtitle: { url: "", type: "", style: {}, name: "", escape: true, encoding: "utf-8", onVttLoad: (e2) => e2 }, moreVideoAttr: { controls: false, preload: d.isSafari ? "auto" : "metadata" }, i18n: {}, icons: {}, cssVar: {}, customType: {}, lang: navigator?.language.toLowerCase() };
      }
      get proxy() {
        return this.events.proxy;
      }
      get query() {
        return this.template.query;
      }
      get video() {
        return this.template.$video;
      }
      destroy(e2 = true) {
        this.events.destroy(), this.template.destroy(e2), G.splice(G.indexOf(this), 1), this.isDestroy = true, this.emit("destroy");
      }
    }
    r.default = J, J.STYLE = s.default, J.DEBUG = false, J.CONTEXTMENU = true, J.NOTICE_TIME = 2e3, J.SETTING_WIDTH = 250, J.SETTING_ITEM_WIDTH = 200, J.SETTING_ITEM_HEIGHT = 35, J.RESIZE_TIME = 200, J.SCROLL_TIME = 200, J.SCROLL_GAP = 50, J.AUTO_PLAYBACK_MAX = 10, J.AUTO_PLAYBACK_MIN = 5, J.AUTO_PLAYBACK_TIMEOUT = 3e3, J.RECONNECT_TIME_MAX = 5, J.RECONNECT_SLEEP_TIME = 1e3, J.CONTROL_HIDE_TIME = 3e3, J.DBCLICK_TIME = 300, J.DBCLICK_FULLSCREEN = true, J.MOBILE_DBCLICK_PLAY = true, J.MOBILE_CLICK_PLAY = false, J.AUTO_ORIENTATION_TIME = 200, J.INFO_LOOP_TIME = 1e3, J.FAST_FORWARD_VALUE = 3, J.FAST_FORWARD_TIME = 1e3, J.TOUCH_MOVE_RATIO = 0.5, J.VOLUME_STEP = 0.1, J.SEEK_STEP = 5, J.PLAYBACK_RATE = [0.5, 0.75, 1, 1.25, 1.5, 2], J.ASPECT_RATIO = ["default", "4:3", "16:9"], J.FLIP = ["normal", "horizontal", "vertical"], J.FULLSCREEN_WEB_IN_BODY = false, J.LOG_VERSION = true, J.USE_RAF = false, d.isBrowser && (window.Artplayer = J, d.setStyleText("artplayer-style", s.default), setTimeout(() => {
      J.LOG_VERSION && console.log(`%c ArtPlayer %c ${J.version} %c https://artplayer.org`, "color: #fff; background: #5f5f5f", "color: #fff; background: #4bc729", "");
    }, 100));
  }, { "../package.json": "aQnLI", "bundle-text:./style/index.less": "6KiDz", "option-validator": "49gY0", "./utils/emitter": "b0EdR", "./utils": "gpvEP", "./scheme": "bEi0U", "./config": "eQRJX", "./template": "dokTM", "./i18n": "1bZfm", "./player": "3xuL2", "./control": "4zOCk", "./contextmenu": "iAXzm", "./info": "bFUCG", "./subtitle": "lEARb", "./events": "fpHt3", "./hotkey": "9z96t", "./layer": "e9ahx", "./loading": "hlSVU", "./notice": "eDyfI", "./mask": "uwUok", "./icons": "1F2QO", "./setting": "aqPSH", "./storage": "48Pli", "./plugins": "eOOz3", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], aQnLI: [function(e, t, r, a) {
    t.exports = JSON.parse('{"license":"MIT","name":"artplayer","version":"5.2.5","main":"dist/artplayer.js","legacy":"dist/artplayer.legacy.js","types":"types/artplayer.d.ts","homepage":"https://artplayer.org","author":"Harvey Zack<laozhaochaguan@gmail.com>","browserslist":"last 1 Chrome version","description":"ArtPlayer.js is a modern and full featured HTML5 video player","repository":{"type":"git","url":"git+https://github.com/zhw2590582/ArtPlayer.git"},"bugs":{"url":"https://github.com/zhw2590582/ArtPlayer/issues"},"keywords":["html5","video","player"],"dependencies":{"option-validator":"^2.0.6"}}');
  }, {}], "6KiDz": [function(e, t, r, a) {
    t.exports = '.art-video-player{--art-theme:red;--art-font-color:#fff;--art-background-color:#000;--art-text-shadow-color:#00000080;--art-transition-duration:.2s;--art-padding:10px;--art-border-radius:3px;--art-progress-height:6px;--art-progress-color:#ffffff40;--art-hover-color:#ffffff40;--art-loaded-color:#ffffff40;--art-state-size:80px;--art-state-opacity:.8;--art-bottom-height:100px;--art-bottom-offset:20px;--art-bottom-gap:5px;--art-highlight-width:8px;--art-highlight-color:#ffffff80;--art-control-height:46px;--art-control-opacity:.75;--art-control-icon-size:36px;--art-control-icon-scale:1.1;--art-volume-height:120px;--art-volume-handle-size:14px;--art-lock-size:36px;--art-indicator-scale:0;--art-indicator-size:16px;--art-fullscreen-web-index:9999;--art-settings-icon-size:24px;--art-settings-max-height:300px;--art-selector-max-height:300px;--art-contextmenus-min-width:250px;--art-subtitle-font-size:20px;--art-subtitle-gap:5px;--art-subtitle-bottom:15px;--art-subtitle-border:#000;--art-widget-background:#000000d9;--art-tip-background:#000000b3;--art-scrollbar-size:4px;--art-scrollbar-background:#ffffff40;--art-scrollbar-background-hover:#ffffff80;--art-mini-progress-height:2px}.art-bg-cover{background-position:50%;background-repeat:no-repeat;background-size:cover}.art-bottom-gradient{background-image:linear-gradient(#0000,#0006,#000);background-position:bottom;background-repeat:repeat-x}.art-backdrop-filter{backdrop-filter:saturate(180%)blur(20px);background-color:#000000bf!important}.art-truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.art-video-player{zoom:1;text-align:left;user-select:none;box-sizing:border-box;width:100%;height:100%;color:var(--art-font-color);background-color:var(--art-background-color);text-shadow:0 0 2px var(--art-text-shadow-color);-webkit-tap-highlight-color:#0000;-ms-touch-action:manipulation;touch-action:manipulation;-ms-high-contrast-adjust:none;direction:ltr;outline:0;margin:0 auto;padding:0;font-family:PingFang SC,Helvetica Neue,Microsoft YaHei,Roboto,Arial,sans-serif;font-size:14px;line-height:1.3;position:relative}.art-video-player *,.art-video-player :before,.art-video-player :after{box-sizing:border-box}.art-video-player ::-webkit-scrollbar{width:var(--art-scrollbar-size);height:var(--art-scrollbar-size)}.art-video-player ::-webkit-scrollbar-thumb{background-color:var(--art-scrollbar-background)}.art-video-player ::-webkit-scrollbar-thumb:hover{background-color:var(--art-scrollbar-background-hover)}.art-video-player img{vertical-align:top;max-width:100%}.art-video-player svg{fill:var(--art-font-color)}.art-video-player a{color:var(--art-font-color);text-decoration:none}.art-icon{justify-content:center;align-items:center;line-height:1;display:flex}.art-video-player.art-backdrop .art-contextmenus,.art-video-player.art-backdrop .art-info,.art-video-player.art-backdrop .art-settings,.art-video-player.art-backdrop .art-layer-auto-playback,.art-video-player.art-backdrop .art-selector-list,.art-video-player.art-backdrop .art-volume-inner{backdrop-filter:saturate(180%)blur(20px);background-color:#000000bf!important}.art-video{z-index:10;cursor:pointer;width:100%;height:100%;position:absolute;inset:0}.art-poster{z-index:11;pointer-events:none;background-position:50%;background-repeat:no-repeat;background-size:cover;width:100%;height:100%;position:absolute;inset:0}.art-video-player .art-subtitle{z-index:20;text-align:center;pointer-events:none;justify-content:center;align-items:center;gap:var(--art-subtitle-gap);width:100%;bottom:var(--art-subtitle-bottom);font-size:var(--art-subtitle-font-size);transition:bottom var(--art-transition-duration)ease;text-shadow:var(--art-subtitle-border)1px 0 1px,var(--art-subtitle-border)0 1px 1px,var(--art-subtitle-border)-1px 0 1px,var(--art-subtitle-border)0 -1px 1px,var(--art-subtitle-border)1px 1px 1px,var(--art-subtitle-border)-1px -1px 1px,var(--art-subtitle-border)1px -1px 1px,var(--art-subtitle-border)-1px 1px 1px;flex-direction:column;padding:0 5%;display:none;position:absolute}.art-video-player.art-subtitle-show .art-subtitle{display:flex}.art-video-player.art-control-show .art-subtitle{bottom:calc(var(--art-control-height) + var(--art-subtitle-bottom))}.art-danmuku{z-index:30;pointer-events:none;width:100%;height:100%;position:absolute;inset:0;overflow:hidden}.art-video-player .art-layers{z-index:40;pointer-events:none;width:100%;height:100%;display:none;position:absolute;inset:0}.art-video-player .art-layers .art-layer{pointer-events:auto}.art-video-player.art-layer-show .art-layers{display:flex}.art-video-player .art-mask{z-index:50;pointer-events:none;justify-content:center;align-items:center;width:100%;height:100%;display:flex;position:absolute;inset:0}.art-video-player .art-mask .art-state{opacity:0;width:var(--art-state-size);height:var(--art-state-size);transition:all var(--art-transition-duration)ease;justify-content:center;align-items:center;display:flex;transform:scale(2)}.art-video-player.art-mask-show .art-state{cursor:pointer;pointer-events:auto;opacity:var(--art-state-opacity);transform:scale(1)}.art-video-player.art-loading-show .art-state{display:none}.art-video-player .art-loading{z-index:70;pointer-events:none;justify-content:center;align-items:center;width:100%;height:100%;display:none;position:absolute;inset:0}.art-video-player.art-loading-show .art-loading{display:flex}.art-video-player .art-bottom{z-index:60;opacity:0;pointer-events:none;width:100%;height:100%;padding:0 var(--art-padding);transition:all var(--art-transition-duration)ease;background-size:100% var(--art-bottom-height);background-image:linear-gradient(#0000,#0006,#000);background-position:bottom;background-repeat:repeat-x;flex-direction:column;justify-content:flex-end;display:flex;position:absolute;inset:0;overflow:hidden}.art-video-player .art-bottom .art-controls,.art-video-player .art-bottom .art-progress{transform:translateY(var(--art-bottom-offset));transition:transform var(--art-transition-duration)ease}.art-video-player.art-control-show .art-bottom,.art-video-player.art-hover .art-bottom{opacity:1}.art-video-player.art-control-show .art-bottom .art-controls,.art-video-player.art-hover .art-bottom .art-controls,.art-video-player.art-control-show .art-bottom .art-progress,.art-video-player.art-hover .art-bottom .art-progress{transform:translateY(0)}.art-bottom .art-progress{z-index:0;pointer-events:auto;padding-bottom:var(--art-bottom-gap);position:relative}.art-bottom .art-progress .art-control-progress{cursor:pointer;height:var(--art-progress-height);justify-content:center;align-items:center;display:flex;position:relative}.art-bottom .art-progress .art-control-progress .art-control-progress-inner{width:100%;height:50%;transition:height var(--art-transition-duration)ease;background-color:var(--art-progress-color);align-items:center;display:flex;position:relative}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-hover{z-index:0;background-color:var(--art-hover-color);width:0%;height:100%;position:absolute;inset:0}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-loaded{z-index:10;background-color:var(--art-loaded-color);width:0%;height:100%;position:absolute;inset:0}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-played{z-index:20;background-color:var(--art-theme);width:0%;height:100%;position:absolute;inset:0}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-highlight{z-index:30;pointer-events:none;width:100%;height:100%;position:absolute;inset:0}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-highlight span{z-index:0;pointer-events:auto;width:100%;height:100%;transform:translateX(calc(var(--art-highlight-width)/-2));background-color:var(--art-highlight-color);position:absolute;inset:0 auto 0 0;width:var(--art-highlight-width)!important}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-indicator{z-index:40;width:var(--art-indicator-size);height:var(--art-indicator-size);transform:scale(var(--art-indicator-scale));margin-left:calc(var(--art-indicator-size)/-2);transition:transform var(--art-transition-duration)ease;border-radius:50%;justify-content:center;align-items:center;display:flex;position:absolute;left:0}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-indicator .art-icon{pointer-events:none;width:100%;height:100%}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-indicator:hover{transform:scale(1.2)!important}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-indicator:active{transform:scale(1)!important}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-tip{z-index:50;border-radius:var(--art-border-radius);white-space:nowrap;background-color:var(--art-tip-background);padding:3px 5px;font-size:12px;line-height:1;display:none;position:absolute;top:-25px;left:0}.art-bottom .art-progress .art-control-progress:hover .art-control-progress-inner{height:100%}.art-bottom .art-progress .art-control-thumbnails{bottom:calc(var(--art-bottom-gap) + 10px);border-radius:var(--art-border-radius);pointer-events:none;background-color:var(--art-widget-background);display:none;position:absolute;left:0;box-shadow:0 1px 3px #0003,0 1px 2px -1px #0003}.art-bottom:hover .art-progress .art-control-progress .art-control-progress-inner .art-progress-indicator{transform:scale(1)}.art-controls{z-index:10;pointer-events:auto;height:var(--art-control-height);justify-content:space-between;align-items:center;display:flex;position:relative}.art-controls .art-controls-left,.art-controls .art-controls-right{height:100%;display:flex}.art-controls .art-controls-center{flex:1;justify-content:center;align-items:center;height:100%;padding:0 10px;display:none}.art-controls .art-controls-right{justify-content:flex-end}.art-controls .art-control{cursor:pointer;white-space:nowrap;opacity:var(--art-control-opacity);min-height:var(--art-control-height);min-width:var(--art-control-height);transition:opacity var(--art-transition-duration)ease;flex-shrink:0;justify-content:center;align-items:center;display:flex}.art-controls .art-control .art-icon{height:var(--art-control-icon-size);width:var(--art-control-icon-size);transform:scale(var(--art-control-icon-scale));transition:transform var(--art-transition-duration)ease}.art-controls .art-control .art-icon:active{transform:scale(calc(var(--art-control-icon-scale)*.8))}.art-controls .art-control:hover{opacity:1}.art-control-volume{position:relative}.art-control-volume .art-volume-panel{text-align:center;cursor:default;opacity:0;pointer-events:none;left:0;right:0;bottom:var(--art-control-height);width:var(--art-control-height);height:var(--art-volume-height);transition:all var(--art-transition-duration)ease;justify-content:center;align-items:center;padding:0 5px;font-size:12px;display:flex;position:absolute;transform:translateY(10px)}.art-control-volume .art-volume-panel .art-volume-inner{border-radius:var(--art-border-radius);background-color:var(--art-widget-background);flex-direction:column;align-items:center;gap:10px;width:100%;height:100%;padding:10px 0 12px;display:flex}.art-control-volume .art-volume-panel .art-volume-inner .art-volume-slider{cursor:pointer;flex:1;justify-content:center;width:100%;display:flex;position:relative}.art-control-volume .art-volume-panel .art-volume-inner .art-volume-slider .art-volume-handle{border-radius:var(--art-border-radius);background-color:#ffffff40;justify-content:center;width:2px;display:flex;position:relative;overflow:hidden}.art-control-volume .art-volume-panel .art-volume-inner .art-volume-slider .art-volume-handle .art-volume-loaded{z-index:0;background-color:var(--art-theme);width:100%;height:100%;position:absolute;inset:0}.art-control-volume .art-volume-panel .art-volume-inner .art-volume-slider .art-volume-indicator{width:var(--art-volume-handle-size);height:var(--art-volume-handle-size);margin-top:calc(var(--art-volume-handle-size)/-2);background-color:var(--art-theme);transition:transform var(--art-transition-duration)ease;border-radius:100%;flex-shrink:0;position:absolute;transform:scale(1)}.art-control-volume .art-volume-panel .art-volume-inner .art-volume-slider:active .art-volume-indicator{transform:scale(.9)}.art-control-volume:hover .art-volume-panel{opacity:1;pointer-events:auto;transform:translateY(0)}.art-video-player .art-notice{z-index:80;width:100%;height:auto;padding:var(--art-padding);pointer-events:none;display:none;position:absolute;inset:0 0 auto}.art-video-player .art-notice .art-notice-inner{border-radius:var(--art-border-radius);background-color:var(--art-tip-background);padding:5px;line-height:1;display:inline-flex}.art-video-player.art-notice-show .art-notice{display:flex}.art-video-player .art-contextmenus{z-index:120;border-radius:var(--art-border-radius);background-color:var(--art-widget-background);min-width:var(--art-contextmenus-min-width);flex-direction:column;padding:5px 0;font-size:12px;display:none;position:absolute}.art-video-player .art-contextmenus .art-contextmenu{cursor:pointer;border-bottom:1px solid #ffffff1a;padding:10px 15px;display:flex}.art-video-player .art-contextmenus .art-contextmenu span{padding:0 8px}.art-video-player .art-contextmenus .art-contextmenu span:hover,.art-video-player .art-contextmenus .art-contextmenu span.art-current{color:var(--art-theme)}.art-video-player .art-contextmenus .art-contextmenu:hover{background-color:#ffffff1a}.art-video-player .art-contextmenus .art-contextmenu:last-child{border-bottom:none}.art-video-player.art-contextmenu-show .art-contextmenus{display:flex}.art-video-player .art-settings{z-index:90;border-radius:var(--art-border-radius);max-height:var(--art-settings-max-height);left:auto;right:var(--art-padding);bottom:var(--art-control-height);transition:all var(--art-transition-duration)ease;background-color:var(--art-widget-background);flex-direction:column;display:none;position:absolute;overflow:hidden auto}.art-video-player .art-settings .art-setting-panel{flex-direction:column;display:none}.art-video-player .art-settings .art-setting-panel.art-current{display:flex}.art-video-player .art-settings .art-setting-panel .art-setting-item{cursor:pointer;transition:background-color var(--art-transition-duration)ease;justify-content:space-between;align-items:center;padding:0 5px;display:flex;overflow:hidden}.art-video-player .art-settings .art-setting-panel .art-setting-item:hover{background-color:#ffffff1a}.art-video-player .art-settings .art-setting-panel .art-setting-item.art-current{color:var(--art-theme)}.art-video-player .art-settings .art-setting-panel .art-setting-item .art-icon-check{visibility:hidden;height:15px}.art-video-player .art-settings .art-setting-panel .art-setting-item.art-current .art-icon-check{visibility:visible}.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-left{flex-shrink:0;justify-content:center;align-items:center;gap:5px;display:flex}.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-left .art-setting-item-left-icon{height:var(--art-settings-icon-size);width:var(--art-settings-icon-size);justify-content:center;align-items:center;display:flex}.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-right{justify-content:center;align-items:center;gap:5px;font-size:12px;display:flex}.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-right .art-setting-item-right-tooltip{white-space:nowrap;color:#ffffff80}.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-right .art-setting-item-right-icon{justify-content:center;align-items:center;min-width:32px;height:24px;display:flex}.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-right .art-setting-range{appearance:none;background-color:#fff3;outline:none;width:80px;height:3px}.art-video-player .art-settings .art-setting-panel .art-setting-item-back{border-bottom:1px solid #ffffff1a}.art-video-player.art-setting-show .art-settings{display:flex}.art-video-player .art-info{left:var(--art-padding);top:var(--art-padding);z-index:100;border-radius:var(--art-border-radius);background-color:var(--art-widget-background);padding:10px;font-size:12px;display:none;position:absolute}.art-video-player .art-info .art-info-panel{flex-direction:column;gap:5px;display:flex}.art-video-player .art-info .art-info-panel .art-info-item{align-items:center;gap:5px;display:flex}.art-video-player .art-info .art-info-panel .art-info-item .art-info-title{text-align:right;width:100px}.art-video-player .art-info .art-info-panel .art-info-item .art-info-content{text-overflow:ellipsis;white-space:nowrap;user-select:all;width:250px;overflow:hidden}.art-video-player .art-info .art-info-close{cursor:pointer;position:absolute;top:5px;right:5px}.art-video-player.art-info-show .art-info{display:flex}.art-hide-cursor *{cursor:none!important}.art-video-player[data-aspect-ratio]{overflow:hidden}.art-video-player[data-aspect-ratio] .art-video{object-fit:fill;box-sizing:content-box}.art-fullscreen{--art-progress-height:8px;--art-indicator-size:20px;--art-control-height:60px;--art-control-icon-scale:1.3}.art-fullscreen-web{--art-progress-height:8px;--art-indicator-size:20px;--art-control-height:60px;--art-control-icon-scale:1.3;z-index:var(--art-fullscreen-web-index);width:100%;height:100%;position:fixed;inset:0}.art-mini-popup{z-index:9999;border-radius:var(--art-border-radius);cursor:move;user-select:none;background:#000;width:320px;height:180px;transition:opacity .2s;position:fixed;overflow:hidden;box-shadow:0 0 5px #00000080}.art-mini-popup svg{fill:#fff}.art-mini-popup .art-video{pointer-events:none}.art-mini-popup .art-mini-close{z-index:20;cursor:pointer;opacity:0;transition:opacity .2s;position:absolute;top:10px;right:10px}.art-mini-popup .art-mini-state{z-index:30;pointer-events:none;opacity:0;background-color:#00000040;justify-content:center;align-items:center;width:100%;height:100%;transition:opacity .2s;display:flex;position:absolute;inset:0}.art-mini-popup .art-mini-state .art-icon{opacity:.75;cursor:pointer;pointer-events:auto;transition:transform .2s;transform:scale(3)}.art-mini-popup .art-mini-state .art-icon:active{transform:scale(2.5)}.art-mini-popup.art-mini-dragging{opacity:.9}.art-mini-popup:hover .art-mini-close,.art-mini-popup:hover .art-mini-state{opacity:1}.art-video-player[data-flip=horizontal] .art-video{transform:scaleX(-1)}.art-video-player[data-flip=vertical] .art-video{transform:scaleY(-1)}.art-video-player .art-layer-lock{height:var(--art-lock-size);width:var(--art-lock-size);top:50%;left:var(--art-padding);background-color:var(--art-tip-background);border-radius:50%;justify-content:center;align-items:center;display:none;position:absolute;transform:translateY(-50%)}.art-video-player .art-layer-auto-playback{border-radius:var(--art-border-radius);left:var(--art-padding);bottom:calc(var(--art-control-height) + var(--art-bottom-gap) + 10px);background-color:var(--art-widget-background);align-items:center;gap:10px;padding:10px;line-height:1;display:none;position:absolute}.art-video-player .art-layer-auto-playback .art-auto-playback-close{cursor:pointer;justify-content:center;align-items:center;display:flex}.art-video-player .art-layer-auto-playback .art-auto-playback-close svg{width:15px;height:15px;fill:var(--art-theme)}.art-video-player .art-layer-auto-playback .art-auto-playback-jump{color:var(--art-theme);cursor:pointer}.art-video-player.art-lock .art-subtitle{bottom:var(--art-subtitle-bottom)!important}.art-video-player.art-mini-progress-bar .art-bottom,.art-video-player.art-lock .art-bottom{opacity:1;background-image:none;padding:0}.art-video-player.art-mini-progress-bar .art-bottom .art-controls,.art-video-player.art-lock .art-bottom .art-controls,.art-video-player.art-mini-progress-bar .art-bottom .art-progress,.art-video-player.art-lock .art-bottom .art-progress{transform:translateY(calc(var(--art-control-height) + var(--art-bottom-gap) + var(--art-progress-height)/4))}.art-video-player.art-mini-progress-bar .art-bottom .art-progress-indicator,.art-video-player.art-lock .art-bottom .art-progress-indicator{display:none!important}.art-video-player.art-control-show .art-layer-lock{display:flex}.art-control-selector{justify-content:center;display:flex;position:relative}.art-control-selector .art-selector-list{text-align:center;border-radius:var(--art-border-radius);opacity:0;pointer-events:none;bottom:var(--art-control-height);max-height:var(--art-selector-max-height);background-color:var(--art-widget-background);transition:all var(--art-transition-duration)ease;flex-direction:column;align-items:center;display:flex;position:absolute;overflow:hidden auto;transform:translateY(10px)}.art-control-selector .art-selector-list .art-selector-item{flex-shrink:0;justify-content:center;align-items:center;width:100%;padding:10px 15px;line-height:1;display:flex}.art-control-selector .art-selector-list .art-selector-item:hover{background-color:#ffffff1a}.art-control-selector .art-selector-list .art-selector-item:hover,.art-control-selector .art-selector-list .art-selector-item.art-current{color:var(--art-theme)}.art-control-selector:hover .art-selector-list{opacity:1;pointer-events:auto;transform:translateY(0)}[class*=hint--]{font-style:normal;display:inline-block;position:relative}[class*=hint--]:before,[class*=hint--]:after{visibility:hidden;opacity:0;z-index:1000000;pointer-events:none;transition:all .3s;position:absolute;transform:translate(0,0)}[class*=hint--]:hover:before,[class*=hint--]:hover:after{visibility:visible;opacity:1;transition-delay:.1s}[class*=hint--]:before{content:"";z-index:1000001;background:0 0;border:6px solid #0000;position:absolute}[class*=hint--]:after{color:#fff;white-space:nowrap;background:#000;padding:8px 10px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:12px;line-height:12px}[class*=hint--][aria-label]:after{content:attr(aria-label)}[class*=hint--][data-hint]:after{content:attr(data-hint)}[aria-label=""]:before,[aria-label=""]:after,[data-hint=""]:before,[data-hint=""]:after{display:none!important}.hint--top-left:before,.hint--top-right:before,.hint--top:before{border-top-color:#000}.hint--bottom-left:before,.hint--bottom-right:before,.hint--bottom:before{border-bottom-color:#000}.hint--left:before{border-left-color:#000}.hint--right:before{border-right-color:#000}.hint--top:before{margin-bottom:-11px}.hint--top:before,.hint--top:after{bottom:100%;left:50%}.hint--top:before{left:calc(50% - 6px)}.hint--top:after{transform:translate(-50%)}.hint--top:hover:before{transform:translateY(-8px)}.hint--top:hover:after{transform:translate(-50%)translateY(-8px)}.hint--bottom:before{margin-top:-11px}.hint--bottom:before,.hint--bottom:after{top:100%;left:50%}.hint--bottom:before{left:calc(50% - 6px)}.hint--bottom:after{transform:translate(-50%)}.hint--bottom:hover:before{transform:translateY(8px)}.hint--bottom:hover:after{transform:translate(-50%)translateY(8px)}.hint--right:before{margin-bottom:-6px;margin-left:-11px}.hint--right:after{margin-bottom:-14px}.hint--right:before,.hint--right:after{bottom:50%;left:100%}.hint--right:hover:before,.hint--right:hover:after{transform:translate(8px)}.hint--left:before{margin-bottom:-6px;margin-right:-11px}.hint--left:after{margin-bottom:-14px}.hint--left:before,.hint--left:after{bottom:50%;right:100%}.hint--left:hover:before,.hint--left:hover:after{transform:translate(-8px)}.hint--top-left:before{margin-bottom:-11px}.hint--top-left:before,.hint--top-left:after{bottom:100%;left:50%}.hint--top-left:before{left:calc(50% - 6px)}.hint--top-left:after{margin-left:12px;transform:translate(-100%)}.hint--top-left:hover:before{transform:translateY(-8px)}.hint--top-left:hover:after{transform:translate(-100%)translateY(-8px)}.hint--top-right:before{margin-bottom:-11px}.hint--top-right:before,.hint--top-right:after{bottom:100%;left:50%}.hint--top-right:before{left:calc(50% - 6px)}.hint--top-right:after{margin-left:-12px;transform:translate(0)}.hint--top-right:hover:before,.hint--top-right:hover:after{transform:translateY(-8px)}.hint--bottom-left:before{margin-top:-11px}.hint--bottom-left:before,.hint--bottom-left:after{top:100%;left:50%}.hint--bottom-left:before{left:calc(50% - 6px)}.hint--bottom-left:after{margin-left:12px;transform:translate(-100%)}.hint--bottom-left:hover:before{transform:translateY(8px)}.hint--bottom-left:hover:after{transform:translate(-100%)translateY(8px)}.hint--bottom-right:before{margin-top:-11px}.hint--bottom-right:before,.hint--bottom-right:after{top:100%;left:50%}.hint--bottom-right:before{left:calc(50% - 6px)}.hint--bottom-right:after{margin-left:-12px;transform:translate(0)}.hint--bottom-right:hover:before,.hint--bottom-right:hover:after{transform:translateY(8px)}.hint--small:after,.hint--medium:after,.hint--large:after{white-space:normal;word-wrap:break-word;line-height:1.4em}.hint--small:after{width:80px}.hint--medium:after{width:150px}.hint--large:after{width:300px}[class*=hint--]:after{text-shadow:0 -1px #000;box-shadow:4px 4px 8px #0000004d}.hint--error:after{text-shadow:0 -1px #592726;background-color:#b34e4d}.hint--error.hint--top-left:before,.hint--error.hint--top-right:before,.hint--error.hint--top:before{border-top-color:#b34e4d}.hint--error.hint--bottom-left:before,.hint--error.hint--bottom-right:before,.hint--error.hint--bottom:before{border-bottom-color:#b34e4d}.hint--error.hint--left:before{border-left-color:#b34e4d}.hint--error.hint--right:before{border-right-color:#b34e4d}.hint--warning:after{text-shadow:0 -1px #6c5328;background-color:#c09854}.hint--warning.hint--top-left:before,.hint--warning.hint--top-right:before,.hint--warning.hint--top:before{border-top-color:#c09854}.hint--warning.hint--bottom-left:before,.hint--warning.hint--bottom-right:before,.hint--warning.hint--bottom:before{border-bottom-color:#c09854}.hint--warning.hint--left:before{border-left-color:#c09854}.hint--warning.hint--right:before{border-right-color:#c09854}.hint--info:after{text-shadow:0 -1px #1a3c4d;background-color:#3986ac}.hint--info.hint--top-left:before,.hint--info.hint--top-right:before,.hint--info.hint--top:before{border-top-color:#3986ac}.hint--info.hint--bottom-left:before,.hint--info.hint--bottom-right:before,.hint--info.hint--bottom:before{border-bottom-color:#3986ac}.hint--info.hint--left:before{border-left-color:#3986ac}.hint--info.hint--right:before{border-right-color:#3986ac}.hint--success:after{text-shadow:0 -1px #1a321a;background-color:#458746}.hint--success.hint--top-left:before,.hint--success.hint--top-right:before,.hint--success.hint--top:before{border-top-color:#458746}.hint--success.hint--bottom-left:before,.hint--success.hint--bottom-right:before,.hint--success.hint--bottom:before{border-bottom-color:#458746}.hint--success.hint--left:before{border-left-color:#458746}.hint--success.hint--right:before{border-right-color:#458746}.hint--always:after,.hint--always:before{opacity:1;visibility:visible}.hint--always.hint--top:before{transform:translateY(-8px)}.hint--always.hint--top:after{transform:translate(-50%)translateY(-8px)}.hint--always.hint--top-left:before{transform:translateY(-8px)}.hint--always.hint--top-left:after{transform:translate(-100%)translateY(-8px)}.hint--always.hint--top-right:before,.hint--always.hint--top-right:after{transform:translateY(-8px)}.hint--always.hint--bottom:before{transform:translateY(8px)}.hint--always.hint--bottom:after{transform:translate(-50%)translateY(8px)}.hint--always.hint--bottom-left:before{transform:translateY(8px)}.hint--always.hint--bottom-left:after{transform:translate(-100%)translateY(8px)}.hint--always.hint--bottom-right:before,.hint--always.hint--bottom-right:after{transform:translateY(8px)}.hint--always.hint--left:before,.hint--always.hint--left:after{transform:translate(-8px)}.hint--always.hint--right:before,.hint--always.hint--right:after{transform:translate(8px)}.hint--rounded:after{border-radius:4px}.hint--no-animate:before,.hint--no-animate:after{transition-duration:0s}.hint--bounce:before,.hint--bounce:after{-webkit-transition:opacity .3s,visibility .3s,-webkit-transform .3s cubic-bezier(.71,1.7,.77,1.24);-moz-transition:opacity .3s,visibility .3s,-moz-transform .3s cubic-bezier(.71,1.7,.77,1.24);transition:opacity .3s,visibility .3s,transform .3s cubic-bezier(.71,1.7,.77,1.24)}.hint--no-shadow:before,.hint--no-shadow:after{text-shadow:initial;box-shadow:initial}.hint--no-arrow:before{display:none}.art-video-player.art-mobile{--art-bottom-gap:10px;--art-control-height:38px;--art-control-icon-scale:1;--art-state-size:60px;--art-settings-max-height:180px;--art-selector-max-height:180px;--art-indicator-scale:1;--art-control-opacity:1}.art-video-player.art-mobile .art-controls-left{margin-left:calc(var(--art-padding)/-1)}.art-video-player.art-mobile .art-controls-right{margin-right:calc(var(--art-padding)/-1)}';
  }, {}], "49gY0": [function(e, t, r, a) {
    t.exports = function() {
      function e2(t3) {
        return (e2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
          return typeof e3;
        } : function(e3) {
          return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
        })(t3);
      }
      var t2 = Object.prototype.toString, r2 = function(r3) {
        if (void 0 === r3) return "undefined";
        if (null === r3) return "null";
        var o2 = e2(r3);
        if ("boolean" === o2) return "boolean";
        if ("string" === o2) return "string";
        if ("number" === o2) return "number";
        if ("symbol" === o2) return "symbol";
        if ("function" === o2) return "GeneratorFunction" === a2(r3) ? "generatorfunction" : "function";
        if (Array.isArray ? Array.isArray(r3) : r3 instanceof Array) return "array";
        if (r3.constructor && "function" == typeof r3.constructor.isBuffer && r3.constructor.isBuffer(r3)) return "buffer";
        if (function(e3) {
          try {
            if ("number" == typeof e3.length && "function" == typeof e3.callee) return true;
          } catch (e4) {
            if (-1 !== e4.message.indexOf("callee")) return true;
          }
          return false;
        }(r3)) return "arguments";
        if (r3 instanceof Date || "function" == typeof r3.toDateString && "function" == typeof r3.getDate && "function" == typeof r3.setDate) return "date";
        if (r3 instanceof Error || "string" == typeof r3.message && r3.constructor && "number" == typeof r3.constructor.stackTraceLimit) return "error";
        if (r3 instanceof RegExp || "string" == typeof r3.flags && "boolean" == typeof r3.ignoreCase && "boolean" == typeof r3.multiline && "boolean" == typeof r3.global) return "regexp";
        switch (a2(r3)) {
          case "Symbol":
            return "symbol";
          case "Promise":
            return "promise";
          case "WeakMap":
            return "weakmap";
          case "WeakSet":
            return "weakset";
          case "Map":
            return "map";
          case "Set":
            return "set";
          case "Int8Array":
            return "int8array";
          case "Uint8Array":
            return "uint8array";
          case "Uint8ClampedArray":
            return "uint8clampedarray";
          case "Int16Array":
            return "int16array";
          case "Uint16Array":
            return "uint16array";
          case "Int32Array":
            return "int32array";
          case "Uint32Array":
            return "uint32array";
          case "Float32Array":
            return "float32array";
          case "Float64Array":
            return "float64array";
        }
        if ("function" == typeof r3.throw && "function" == typeof r3.return && "function" == typeof r3.next) return "generator";
        switch (o2 = t2.call(r3)) {
          case "[object Object]":
            return "object";
          case "[object Map Iterator]":
            return "mapiterator";
          case "[object Set Iterator]":
            return "setiterator";
          case "[object String Iterator]":
            return "stringiterator";
          case "[object Array Iterator]":
            return "arrayiterator";
        }
        return o2.slice(8, -1).toLowerCase().replace(/\s/g, "");
      };
      function a2(e3) {
        return e3.constructor ? e3.constructor.name : null;
      }
      function o(e3, t3) {
        var a3 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : ["option"];
        return i(e3, t3, a3), n(e3, t3, a3), function(e4, t4, a4) {
          var s = r2(t4), l = r2(e4);
          if ("object" === s) {
            if ("object" !== l) throw Error("[Type Error]: '".concat(a4.join("."), "' require 'object' type, but got '").concat(l, "'"));
            Object.keys(t4).forEach(function(r3) {
              var s2 = e4[r3], l2 = t4[r3], c = a4.slice();
              c.push(r3), i(s2, l2, c), n(s2, l2, c), o(s2, l2, c);
            });
          }
          if ("array" === s) {
            if ("array" !== l) throw Error("[Type Error]: '".concat(a4.join("."), "' require 'array' type, but got '").concat(l, "'"));
            e4.forEach(function(r3, s2) {
              var l2 = e4[s2], c = t4[s2] || t4[0], p = a4.slice();
              p.push(s2), i(l2, c, p), n(l2, c, p), o(l2, c, p);
            });
          }
        }(e3, t3, a3), e3;
      }
      function i(e3, t3, a3) {
        if ("string" === r2(t3)) {
          var o2 = r2(e3);
          if ("?" === t3[0] && (t3 = t3.slice(1) + "|undefined"), !(-1 < t3.indexOf("|") ? t3.split("|").map(function(e4) {
            return e4.toLowerCase().trim();
          }).filter(Boolean).some(function(e4) {
            return o2 === e4;
          }) : t3.toLowerCase().trim() === o2)) throw Error("[Type Error]: '".concat(a3.join("."), "' require '").concat(t3, "' type, but got '").concat(o2, "'"));
        }
      }
      function n(e3, t3, a3) {
        if ("function" === r2(t3)) {
          var o2 = t3(e3, r2(e3), a3);
          if (true !== o2) {
            var i2 = r2(o2);
            throw "string" === i2 ? Error(o2) : "error" === i2 ? o2 : Error("[Validator Error]: The scheme for '".concat(a3.join("."), "' validator require return true, but got '").concat(o2, "'"));
          }
        }
      }
      return o.kindOf = r2, o;
    }();
  }, {}], b0EdR: [function(e, t, r, a) {
    e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r), r.default = class {
      on(e2, t2, r2) {
        let a2 = this.e || (this.e = {});
        return (a2[e2] || (a2[e2] = [])).push({ fn: t2, ctx: r2 }), this;
      }
      once(e2, t2, r2) {
        let a2 = this;
        function o(...i) {
          a2.off(e2, o), t2.apply(r2, i);
        }
        return o._ = t2, this.on(e2, o, r2);
      }
      emit(e2, ...t2) {
        let r2 = ((this.e || (this.e = {}))[e2] || []).slice();
        for (let e3 = 0; e3 < r2.length; e3 += 1) r2[e3].fn.apply(r2[e3].ctx, t2);
        return this;
      }
      off(e2, t2) {
        let r2 = this.e || (this.e = {}), a2 = r2[e2], o = [];
        if (a2 && t2) for (let e3 = 0, r3 = a2.length; e3 < r3; e3 += 1) a2[e3].fn !== t2 && a2[e3].fn._ !== t2 && o.push(a2[e3]);
        return o.length ? r2[e2] = o : delete r2[e2], this;
      }
    };
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "7o2zS": [function(e, t, r, a) {
    r.interopDefault = function(e2) {
      return e2 && e2.__esModule ? e2 : { default: e2 };
    }, r.defineInteropFlag = function(e2) {
      Object.defineProperty(e2, "__esModule", { value: true });
    }, r.exportAll = function(e2, t2) {
      return Object.keys(e2).forEach(function(r2) {
        "default" === r2 || "__esModule" === r2 || Object.prototype.hasOwnProperty.call(t2, r2) || Object.defineProperty(t2, r2, { enumerable: true, get: function() {
          return e2[r2];
        } });
      }), t2;
    }, r.export = function(e2, t2, r2) {
      Object.defineProperty(e2, t2, { enumerable: true, get: r2 });
    };
  }, {}], gpvEP: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r);
    var i = e("./dom");
    o.exportAll(i, r);
    var n = e("./error");
    o.exportAll(n, r);
    var s = e("./subtitle");
    o.exportAll(s, r);
    var l = e("./file");
    o.exportAll(l, r);
    var c = e("./property");
    o.exportAll(c, r);
    var p = e("./time");
    o.exportAll(p, r);
    var u = e("./format");
    o.exportAll(u, r);
    var d = e("./compatibility");
    o.exportAll(d, r);
  }, { "./dom": "jghk1", "./error": "9OXL0", "./subtitle": "dSV4f", "./file": "8Ue1J", "./property": "6OkQd", "./time": "55T7g", "./format": "4YeYK", "./compatibility": "h19pd", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], jghk1: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "query", () => n), o.export(r, "queryAll", () => s), o.export(r, "addClass", () => l), o.export(r, "removeClass", () => c), o.export(r, "hasClass", () => p), o.export(r, "append", () => u), o.export(r, "remove", () => d), o.export(r, "setStyle", () => f), o.export(r, "setStyles", () => h2), o.export(r, "getStyle", () => m), o.export(r, "siblings", () => g), o.export(r, "inverseClass", () => v), o.export(r, "tooltip", () => y), o.export(r, "isInViewport", () => b), o.export(r, "includeFromEvent", () => x), o.export(r, "replaceElement", () => w), o.export(r, "createElement", () => j), o.export(r, "getIcon", () => k), o.export(r, "setStyleText", () => S), o.export(r, "supportsFlex", () => E), o.export(r, "getRect", () => z), o.export(r, "loadImg", () => $);
    var i = e("./compatibility");
    function n(e2, t2 = document) {
      return t2.querySelector(e2);
    }
    function s(e2, t2 = document) {
      return Array.from(t2.querySelectorAll(e2));
    }
    function l(e2, t2) {
      return e2.classList.add(t2);
    }
    function c(e2, t2) {
      return e2.classList.remove(t2);
    }
    function p(e2, t2) {
      return e2.classList.contains(t2);
    }
    function u(e2, t2) {
      return t2 instanceof Element ? e2.appendChild(t2) : e2.insertAdjacentHTML("beforeend", String(t2)), e2.lastElementChild || e2.lastChild;
    }
    function d(e2) {
      return e2.parentNode.removeChild(e2);
    }
    function f(e2, t2, r2) {
      return e2.style[t2] = r2, e2;
    }
    function h2(e2, t2) {
      for (let r2 in t2) f(e2, r2, t2[r2]);
      return e2;
    }
    function m(e2, t2, r2 = true) {
      let a2 = window.getComputedStyle(e2, null).getPropertyValue(t2);
      return r2 ? parseFloat(a2) : a2;
    }
    function g(e2) {
      return Array.from(e2.parentElement.children).filter((t2) => t2 !== e2);
    }
    function v(e2, t2) {
      g(e2).forEach((e3) => c(e3, t2)), l(e2, t2);
    }
    function y(e2, t2, r2 = "top") {
      i.isMobile || (e2.setAttribute("aria-label", t2), l(e2, "hint--rounded"), l(e2, `hint--${r2}`));
    }
    function b(e2, t2 = 0) {
      let r2 = e2.getBoundingClientRect(), a2 = window.innerHeight || document.documentElement.clientHeight, o2 = window.innerWidth || document.documentElement.clientWidth, i2 = r2.top - t2 <= a2 && r2.top + r2.height + t2 >= 0, n2 = r2.left - t2 <= o2 + t2 && r2.left + r2.width + t2 >= 0;
      return i2 && n2;
    }
    function x(e2, t2) {
      return e2.composedPath && e2.composedPath().indexOf(t2) > -1;
    }
    function w(e2, t2) {
      return t2.parentNode.replaceChild(e2, t2), e2;
    }
    function j(e2) {
      return document.createElement(e2);
    }
    function k(e2 = "", t2 = "") {
      let r2 = j("i");
      return l(r2, "art-icon"), l(r2, `art-icon-${e2}`), u(r2, t2), r2;
    }
    function S(e2, t2) {
      let r2 = document.getElementById(e2);
      r2 || ((r2 = document.createElement("style")).id = e2, "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", () => {
        document.head.appendChild(r2);
      }) : (document.head || document.documentElement).appendChild(r2)), r2.textContent = t2;
    }
    function E() {
      let e2 = document.createElement("div");
      return e2.style.display = "flex", "flex" === e2.style.display;
    }
    function z(e2) {
      return e2.getBoundingClientRect();
    }
    function $(e2, t2) {
      return new Promise((r2, a2) => {
        let o2 = new Image();
        o2.onload = function() {
          if (t2 && 1 !== t2) {
            let i2 = document.createElement("canvas"), n2 = i2.getContext("2d");
            i2.width = o2.width * t2, i2.height = o2.height * t2, n2.drawImage(o2, 0, 0, i2.width, i2.height), i2.toBlob((t3) => {
              let o3 = URL.createObjectURL(t3), i3 = new Image();
              i3.onload = function() {
                r2(i3);
              }, i3.onerror = function() {
                URL.revokeObjectURL(o3), a2(Error(`Image load failed: ${e2}`));
              }, i3.src = o3;
            });
          } else r2(o2);
        }, o2.onerror = function() {
          a2(Error(`Image load failed: ${e2}`));
        }, o2.src = e2;
      });
    }
  }, { "./compatibility": "h19pd", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], h19pd: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "userAgent", () => i), o.export(r, "isSafari", () => n), o.export(r, "isWechat", () => s), o.export(r, "isIE", () => l), o.export(r, "isAndroid", () => c), o.export(r, "isIOS", () => p), o.export(r, "isIOS13", () => u), o.export(r, "isMobile", () => d), o.export(r, "isBrowser", () => f);
    let i = globalThis?.CUSTOM_USER_AGENT ?? ("undefined" != typeof navigator ? navigator.userAgent : ""), n = /^((?!chrome|android).)*safari/i.test(i), s = /MicroMessenger/i.test(i), l = /MSIE|Trident/i.test(i), c = /android/i.test(i), p = /iPad|iPhone|iPod/i.test(i) && !window.MSStream, u = p || i.includes("Macintosh") && navigator.maxTouchPoints >= 1, d = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(i) || u, f = "undefined" != typeof window;
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "9OXL0": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "ArtPlayerError", () => i), o.export(r, "errorHandle", () => n);
    class i extends Error {
      constructor(e2, t2) {
        super(e2), "function" == typeof Error.captureStackTrace && Error.captureStackTrace(this, t2 || this.constructor), this.name = "ArtPlayerError";
      }
    }
    function n(e2, t2) {
      if (!e2) throw new i(t2);
      return e2;
    }
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], dSV4f: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    function i(e2) {
      return "WEBVTT \r\n\r\n".concat(e2.replace(/(\d\d:\d\d:\d\d)[,.](\d+)/g, (e3, t2, r2) => {
        let a2 = r2.slice(0, 3);
        return 1 === r2.length && (a2 = r2 + "00"), 2 === r2.length && (a2 = r2 + "0"), `${t2},${a2}`;
      }).replace(/\{\\([ibu])\}/g, "</$1>").replace(/\{\\([ibu])1\}/g, "<$1>").replace(/\{([ibu])\}/g, "<$1>").replace(/\{\/([ibu])\}/g, "</$1>").replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, "$1.$2").replace(/{[\s\S]*?}/g, "").concat("\r\n\r\n"));
    }
    function n(e2) {
      return URL.createObjectURL(new Blob([e2], { type: "text/vtt" }));
    }
    function s(e2) {
      let t2 = RegExp("Dialogue:\\s\\d,(\\d+:\\d\\d:\\d\\d.\\d\\d),(\\d+:\\d\\d:\\d\\d.\\d\\d),([^,]*),([^,]*),(?:[^,]*,){4}([\\s\\S]*)$", "i");
      function r2(e3 = "") {
        return e3.split(/[:.]/).map((e4, t3, r3) => {
          if (t3 === r3.length - 1) {
            if (1 === e4.length) return `.${e4}00`;
            if (2 === e4.length) return `.${e4}0`;
          } else if (1 === e4.length) return (0 === t3 ? "0" : ":0") + e4;
          return 0 === t3 ? e4 : t3 === r3.length - 1 ? `.${e4}` : `:${e4}`;
        }).join("");
      }
      return "WEBVTT\n\n" + e2.split(/\r?\n/).map((e3) => {
        let a2 = e3.match(t2);
        return a2 ? { start: r2(a2[1].trim()), end: r2(a2[2].trim()), text: a2[5].replace(/{[\s\S]*?}/g, "").replace(/(\\N)/g, "\n").trim().split(/\r?\n/).map((e4) => e4.trim()).join("\n") } : null;
      }).filter((e3) => e3).map((e3, t3) => e3 ? t3 + 1 + `
${e3.start} --> ${e3.end}
${e3.text}` : "").filter((e3) => e3.trim()).join("\n\n");
    }
    o.defineInteropFlag(r), o.export(r, "srtToVtt", () => i), o.export(r, "vttToBlob", () => n), o.export(r, "assToVtt", () => s);
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "8Ue1J": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    function i(e2, t2) {
      let r2 = document.createElement("a");
      r2.style.display = "none", r2.href = e2, r2.download = t2, document.body.appendChild(r2), r2.click(), document.body.removeChild(r2);
    }
    o.defineInteropFlag(r), o.export(r, "getExt", () => function e2(t2) {
      return t2.includes("?") ? e2(t2.split("?")[0]) : t2.includes("#") ? e2(t2.split("#")[0]) : t2.trim().toLowerCase().split(".").pop();
    }), o.export(r, "download", () => i);
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "6OkQd": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "def", () => i), o.export(r, "has", () => s), o.export(r, "get", () => l), o.export(r, "mergeDeep", () => function e2(...t2) {
      let r2 = (e3) => e3 && "object" == typeof e3 && !Array.isArray(e3);
      return t2.reduce((t3, a2) => (Object.keys(a2).forEach((o2) => {
        let i2 = t3[o2], n2 = a2[o2];
        Array.isArray(i2) && Array.isArray(n2) ? t3[o2] = i2.concat(...n2) : r2(i2) && r2(n2) ? t3[o2] = e2(i2, n2) : t3[o2] = n2;
      }), t3), {});
    });
    let i = Object.defineProperty, { hasOwnProperty: n } = Object.prototype;
    function s(e2, t2) {
      return n.call(e2, t2);
    }
    function l(e2, t2) {
      return Object.getOwnPropertyDescriptor(e2, t2);
    }
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "55T7g": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    function i(e2 = 0) {
      return new Promise((t2) => setTimeout(t2, e2));
    }
    function n(e2, t2) {
      let r2;
      return function(...a2) {
        clearTimeout(r2), r2 = setTimeout(() => (r2 = null, e2.apply(this, a2)), t2);
      };
    }
    function s(e2, t2) {
      let r2 = false;
      return function(...a2) {
        r2 || (e2.apply(this, a2), r2 = true, setTimeout(function() {
          r2 = false;
        }, t2));
      };
    }
    o.defineInteropFlag(r), o.export(r, "sleep", () => i), o.export(r, "debounce", () => n), o.export(r, "throttle", () => s);
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "4YeYK": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    function i(e2, t2, r2) {
      return Math.max(Math.min(e2, Math.max(t2, r2)), Math.min(t2, r2));
    }
    function n(e2) {
      return e2.charAt(0).toUpperCase() + e2.slice(1);
    }
    function s(e2) {
      if (!e2) return "00:00";
      let t2 = Math.floor(e2 / 3600), r2 = Math.floor((e2 - 3600 * t2) / 60), a2 = Math.floor(e2 - 3600 * t2 - 60 * r2);
      return (t2 > 0 ? [t2, r2, a2] : [r2, a2]).map((e3) => e3 < 10 ? `0${e3}` : String(e3)).join(":");
    }
    function l(e2) {
      return e2.replace(/[&<>'"]/g, (e3) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[e3] || e3);
    }
    function c(e2) {
      let t2 = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&#39;": "'", "&quot;": '"' }, r2 = RegExp(`(${Object.keys(t2).join("|")})`, "g");
      return e2.replace(r2, (e3) => t2[e3] || e3);
    }
    o.defineInteropFlag(r), o.export(r, "clamp", () => i), o.export(r, "capitalize", () => n), o.export(r, "secondToTime", () => s), o.export(r, "escape", () => l), o.export(r, "unescape", () => c);
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], bEi0U: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "ComponentOption", () => f);
    var i = e("../utils");
    let n = "array", s = "boolean", l = "string", c = "number", p = "object", u = "function";
    function d(e2, t2, r2) {
      return (0, i.errorHandle)(t2 === l || t2 === c || e2 instanceof Element, `${r2.join(".")} require '${l}' or 'Element' type`);
    }
    let f = { html: d, disable: `?${s}`, name: `?${l}`, index: `?${c}`, style: `?${p}`, click: `?${u}`, mounted: `?${u}`, tooltip: `?${l}|${c}`, width: `?${c}`, selector: `?${n}`, onSelect: `?${u}`, switch: `?${s}`, onSwitch: `?${u}`, range: `?${n}`, onRange: `?${u}`, onChange: `?${u}` };
    r.default = { id: l, container: d, url: l, poster: l, type: l, theme: l, lang: l, volume: c, isLive: s, muted: s, autoplay: s, autoSize: s, autoMini: s, loop: s, flip: s, playbackRate: s, aspectRatio: s, screenshot: s, setting: s, hotkey: s, pip: s, mutex: s, backdrop: s, fullscreen: s, fullscreenWeb: s, subtitleOffset: s, miniProgressBar: s, useSSR: s, playsInline: s, lock: s, gesture: s, fastForward: s, autoPlayback: s, autoOrientation: s, airplay: s, proxy: `?${u}`, plugins: [u], layers: [f], contextmenu: [f], settings: [f], controls: [{ ...f, position: (e2, t2, r2) => {
      let a2 = ["top", "left", "right"];
      return (0, i.errorHandle)(a2.includes(e2), `${r2.join(".")} only accept ${a2.toString()} as parameters`);
    } }], quality: [{ default: `?${s}`, html: l, url: l }], highlight: [{ time: c, text: l }], thumbnails: { url: l, number: c, column: c, width: c, height: c, scale: c }, subtitle: { url: l, name: l, type: l, style: p, escape: s, encoding: l, onVttLoad: u }, moreVideoAttr: p, i18n: p, icons: p, cssVar: p, customType: p };
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], eQRJX: [function(e, t, r, a) {
    e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r), r.default = { properties: ["audioTracks", "autoplay", "buffered", "controller", "controls", "crossOrigin", "currentSrc", "currentTime", "defaultMuted", "defaultPlaybackRate", "duration", "ended", "error", "loop", "mediaGroup", "muted", "networkState", "paused", "playbackRate", "played", "preload", "readyState", "seekable", "seeking", "src", "startDate", "textTracks", "videoTracks", "volume"], methods: ["addTextTrack", "canPlayType", "load", "play", "pause"], events: ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], prototypes: ["width", "height", "videoWidth", "videoHeight", "poster", "webkitDecodedFrameCount", "webkitDroppedFrameCount", "playsInline", "webkitSupportsFullscreen", "webkitDisplayingFullscreen", "onenterpictureinpicture", "onleavepictureinpicture", "disablePictureInPicture", "cancelVideoFrameCallback", "requestVideoFrameCallback", "getVideoPlaybackQuality", "requestPictureInPicture", "webkitEnterFullScreen", "webkitEnterFullscreen", "webkitExitFullScreen", "webkitExitFullscreen"] };
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], dokTM: [function(e, t, r, a) {
    e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r);
    var o = e("../package.json"), i = e("./utils");
    class n {
      constructor(e2) {
        this.art = e2;
        let { option: t2, constructor: r2 } = e2;
        t2.container instanceof Element ? this.$container = t2.container : (this.$container = (0, i.query)(t2.container), (0, i.errorHandle)(this.$container, `No container element found by ${t2.container}`)), (0, i.errorHandle)((0, i.supportsFlex)(), "The current browser does not support flex layout");
        let a2 = this.$container.tagName.toLowerCase();
        (0, i.errorHandle)("div" === a2, `Unsupported container element type, only support 'div' but got '${a2}'`), (0, i.errorHandle)(r2.instances.every((e3) => e3.template.$container !== this.$container), "Cannot mount multiple instances on the same dom element"), this.query = this.query.bind(this), this.$container.dataset.artId = e2.id, this.init();
      }
      static get html() {
        return `<div class="art-video-player art-subtitle-show art-layer-show art-control-show art-mask-show"><video class="art-video"><track default kind="metadata" src=""></track></video><div class="art-poster"></div><div class="art-subtitle"></div><div class="art-danmuku"></div><div class="art-layers"></div><div class="art-mask"><div class="art-state"></div></div><div class="art-bottom"><div class="art-progress"></div><div class="art-controls"><div class="art-controls-left"></div><div class="art-controls-center"></div><div class="art-controls-right"></div></div></div><div class="art-loading"></div><div class="art-notice"><div class="art-notice-inner"></div></div><div class="art-settings"></div><div class="art-info"><div class="art-info-panel"><div class="art-info-item"><div class="art-info-title">Player version:</div><div class="art-info-content">${o.version}</div></div><div class="art-info-item"><div class="art-info-title">Video url:</div><div class="art-info-content" data-video="src"></div></div><div class="art-info-item"><div class="art-info-title">Video volume:</div><div class="art-info-content" data-video="volume"></div></div><div class="art-info-item"><div class="art-info-title">Video time:</div><div class="art-info-content" data-video="currentTime"></div></div><div class="art-info-item"><div class="art-info-title">Video duration:</div><div class="art-info-content" data-video="duration"></div></div><div class="art-info-item"><div class="art-info-title">Video resolution:</div><div class="art-info-content"><span data-video="videoWidth"></span>x<span data-video="videoHeight"></span></div></div></div><div class="art-info-close">[x]</div></div><div class="art-contextmenus"></div></div>`;
      }
      query(e2) {
        return (0, i.query)(e2, this.$container);
      }
      init() {
        let { option: e2 } = this.art;
        if (e2.useSSR || (this.$container.innerHTML = n.html), this.$player = this.query(".art-video-player"), this.$video = this.query(".art-video"), this.$track = this.query("track"), this.$poster = this.query(".art-poster"), this.$subtitle = this.query(".art-subtitle"), this.$danmuku = this.query(".art-danmuku"), this.$bottom = this.query(".art-bottom"), this.$progress = this.query(".art-progress"), this.$controls = this.query(".art-controls"), this.$controlsLeft = this.query(".art-controls-left"), this.$controlsCenter = this.query(".art-controls-center"), this.$controlsRight = this.query(".art-controls-right"), this.$layer = this.query(".art-layers"), this.$loading = this.query(".art-loading"), this.$notice = this.query(".art-notice"), this.$noticeInner = this.query(".art-notice-inner"), this.$mask = this.query(".art-mask"), this.$state = this.query(".art-state"), this.$setting = this.query(".art-settings"), this.$info = this.query(".art-info"), this.$infoPanel = this.query(".art-info-panel"), this.$infoClose = this.query(".art-info-close"), this.$contextmenu = this.query(".art-contextmenus"), e2.proxy) {
          let t2 = e2.proxy.call(this.art, this.art);
          (0, i.errorHandle)(t2 instanceof HTMLVideoElement || t2 instanceof HTMLCanvasElement, "Function 'option.proxy' needs to return 'HTMLVideoElement' or 'HTMLCanvasElement'"), (0, i.replaceElement)(t2, this.$video), t2.className = "art-video", this.$video = t2;
        }
        e2.backdrop && (0, i.addClass)(this.$player, "art-backdrop"), i.isMobile && (0, i.addClass)(this.$player, "art-mobile");
      }
      destroy(e2) {
        this.$video.src = "", e2 ? this.$container.innerHTML = "" : (0, i.addClass)(this.$player, "art-destroy");
      }
    }
    r.default = n;
  }, { "../package.json": "aQnLI", "./utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "1bZfm": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r);
    var i = e("../utils"), n = e("./zh-cn"), s = o.interopDefault(n);
    r.default = class {
      constructor(e2) {
        this.art = e2, this.languages = { "zh-cn": s.default }, this.language = {}, this.update(e2.option.i18n);
      }
      init() {
        let e2 = this.art.option.lang.toLowerCase();
        this.language = this.languages[e2] || {};
      }
      get(e2) {
        return this.language[e2] || e2;
      }
      update(e2) {
        this.languages = (0, i.mergeDeep)(this.languages, e2), this.init();
      }
    };
  }, { "../utils": "gpvEP", "./zh-cn": "kRuwK", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], kRuwK: [function(e, t, r, a) {
    e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r);
    let o = { "Video Info": "统计信息", Close: "关闭", "Video Load Failed": "加载失败", Volume: "音量", Play: "播放", Pause: "暂停", Rate: "速度", Mute: "静音", "Video Flip": "画面翻转", Horizontal: "水平", Vertical: "垂直", Reconnect: "重新连接", "Show Setting": "显示设置", "Hide Setting": "隐藏设置", Screenshot: "截图", "Play Speed": "播放速度", "Aspect Ratio": "画面比例", Default: "默认", Normal: "正常", Open: "打开", "Switch Video": "切换", "Switch Subtitle": "切换字幕", Fullscreen: "全屏", "Exit Fullscreen": "退出全屏", "Web Fullscreen": "网页全屏", "Exit Web Fullscreen": "退出网页全屏", "Mini Player": "迷你播放器", "PIP Mode": "开启画中画", "Exit PIP Mode": "退出画中画", "PIP Not Supported": "不支持画中画", "Fullscreen Not Supported": "不支持全屏", "Subtitle Offset": "字幕偏移", "Last Seen": "上次看到", "Jump Play": "跳转播放", AirPlay: "隔空播放", "AirPlay Not Available": "隔空播放不可用" };
    r.default = o, "undefined" != typeof window && (window["artplayer-i18n-zh-cn"] = o);
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "3xuL2": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r);
    var i = e("./urlMix"), n = o.interopDefault(i), s = e("./attrMix"), l = o.interopDefault(s), c = e("./playMix"), p = o.interopDefault(c), u = e("./pauseMix"), d = o.interopDefault(u), f = e("./toggleMix"), h2 = o.interopDefault(f), m = e("./seekMix"), g = o.interopDefault(m), v = e("./volumeMix"), y = o.interopDefault(v), b = e("./currentTimeMix"), x = o.interopDefault(b), w = e("./durationMix"), j = o.interopDefault(w), k = e("./switchMix"), S = o.interopDefault(k), E = e("./playbackRateMix"), z = o.interopDefault(E), $ = e("./aspectRatioMix"), I = o.interopDefault($), T = e("./screenshotMix"), M = o.interopDefault(T), F = e("./fullscreenMix"), P = o.interopDefault(F), C = e("./fullscreenWebMix"), D = o.interopDefault(C), A = e("./pipMix"), R = o.interopDefault(A), L = e("./loadedMix"), O = o.interopDefault(L), q = e("./playedMix"), _ = o.interopDefault(q), H = e("./playingMix"), V = o.interopDefault(H), N = e("./autoSizeMix"), B = o.interopDefault(N), U = e("./rectMix"), Y = o.interopDefault(U), W = e("./flipMix"), K = o.interopDefault(W), Q = e("./miniMix"), X = o.interopDefault(Q), Z = e("./posterMix"), G = o.interopDefault(Z), J = e("./autoHeightMix"), ee = o.interopDefault(J), et = e("./cssVarMix"), er = o.interopDefault(et), ea = e("./themeMix"), eo = o.interopDefault(ea), ei = e("./typeMix"), en = o.interopDefault(ei), es = e("./stateMix"), el = o.interopDefault(es), ec = e("./subtitleOffsetMix"), ep = o.interopDefault(ec), eu = e("./airplayMix"), ed = o.interopDefault(eu), ef = e("./qualityMix"), eh = o.interopDefault(ef), em = e("./thumbnailsMix"), eg = o.interopDefault(em), ev = e("./optionInit"), ey = o.interopDefault(ev), eb = e("./eventInit"), ex = o.interopDefault(eb);
    r.default = class {
      constructor(e2) {
        (0, n.default)(e2), (0, l.default)(e2), (0, p.default)(e2), (0, d.default)(e2), (0, h2.default)(e2), (0, g.default)(e2), (0, y.default)(e2), (0, x.default)(e2), (0, j.default)(e2), (0, S.default)(e2), (0, z.default)(e2), (0, I.default)(e2), (0, M.default)(e2), (0, P.default)(e2), (0, D.default)(e2), (0, R.default)(e2), (0, O.default)(e2), (0, _.default)(e2), (0, V.default)(e2), (0, B.default)(e2), (0, Y.default)(e2), (0, K.default)(e2), (0, X.default)(e2), (0, G.default)(e2), (0, ee.default)(e2), (0, er.default)(e2), (0, eo.default)(e2), (0, en.default)(e2), (0, el.default)(e2), (0, ep.default)(e2), (0, ed.default)(e2), (0, eh.default)(e2), (0, eg.default)(e2), (0, ex.default)(e2), (0, ey.default)(e2);
      }
    };
  }, { "./urlMix": "hXrQD", "./attrMix": "6pNgq", "./playMix": "krR40", "./pauseMix": "eFrQn", "./toggleMix": "5mk0x", "./seekMix": "kNVxo", "./volumeMix": "j0CPw", "./currentTimeMix": "3Qlk2", "./durationMix": "ej83c", "./switchMix": "4DKMC", "./playbackRateMix": "3q2BJ", "./aspectRatioMix": "kKNdy", "./screenshotMix": "jEOGf", "./fullscreenMix": "6fcMx", "./fullscreenWebMix": "2fgOZ", "./pipMix": "7ctTv", "./loadedMix": "748cK", "./playedMix": "2v3kJ", "./playingMix": "7NTUH", "./autoSizeMix": "lVqio", "./rectMix": "i0rvQ", "./flipMix": "f8acK", "./miniMix": "htzAz", "./posterMix": "iIy8c", "./autoHeightMix": "4JyZb", "./cssVarMix": "9iyPY", "./themeMix": "7NNfU", "./typeMix": "ipJQa", "./stateMix": "6P1Bw", "./subtitleOffsetMix": "eqBmH", "./airplayMix": "etKzV", "./qualityMix": "1CuDr", "./thumbnailsMix": "63zKA", "./optionInit": "cIuaY", "./eventInit": "lqh1e", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], hXrQD: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { option: t2, template: { $video: r2 } } = e2;
      (0, i.def)(e2, "url", { get: () => r2.src, async set(a2) {
        if (a2) {
          let o2 = e2.url, n2 = t2.type || (0, i.getExt)(a2), s = t2.customType[n2];
          n2 && s ? (await (0, i.sleep)(), e2.loading.show = true, s.call(e2, r2, a2, e2)) : (URL.revokeObjectURL(o2), r2.src = a2), o2 !== e2.url && (e2.option.url = a2, e2.isReady && o2 && e2.once("video:canplay", () => {
            e2.emit("restart", a2);
          }));
        } else await (0, i.sleep)(), e2.loading.show = true;
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "6pNgq": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { template: { $video: t2 } } = e2;
      (0, i.def)(e2, "attr", { value(e3, r2) {
        if (void 0 === r2) return t2[e3];
        t2[e3] = r2;
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], krR40: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { i18n: t2, notice: r2, option: a2, constructor: { instances: o2 }, template: { $video: n2 } } = e2;
      (0, i.def)(e2, "play", { value: async function() {
        let i2 = await n2.play();
        if (r2.show = t2.get("Play"), e2.emit("play"), a2.mutex) for (let t3 = 0; t3 < o2.length; t3++) {
          let r3 = o2[t3];
          r3 !== e2 && r3.pause();
        }
        return i2;
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], eFrQn: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { template: { $video: t2 }, i18n: r2, notice: a2 } = e2;
      (0, i.def)(e2, "pause", { value() {
        let o2 = t2.pause();
        return a2.show = r2.get("Pause"), e2.emit("pause"), o2;
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "5mk0x": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      (0, i.def)(e2, "toggle", { value: () => e2.playing ? e2.pause() : e2.play() });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], kNVxo: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { notice: t2 } = e2;
      (0, i.def)(e2, "seek", { set(r2) {
        e2.currentTime = r2, e2.duration && (t2.show = `${(0, i.secondToTime)(e2.currentTime)} / ${(0, i.secondToTime)(e2.duration)}`), e2.emit("seek", e2.currentTime);
      } }), (0, i.def)(e2, "forward", { set(t3) {
        e2.seek = e2.currentTime + t3;
      } }), (0, i.def)(e2, "backward", { set(t3) {
        e2.seek = e2.currentTime - t3;
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], j0CPw: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { template: { $video: t2 }, i18n: r2, notice: a2, storage: o2 } = e2;
      (0, i.def)(e2, "volume", { get: () => t2.volume || 0, set: (e3) => {
        t2.volume = (0, i.clamp)(e3, 0, 1), a2.show = `${r2.get("Volume")}: ${parseInt(100 * t2.volume, 10)}`, 0 !== t2.volume && o2.set("volume", t2.volume);
      } }), (0, i.def)(e2, "muted", { get: () => t2.muted, set: (r3) => {
        t2.muted = r3, e2.emit("muted", r3);
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "3Qlk2": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { $video: t2 } = e2.template;
      (0, i.def)(e2, "currentTime", { get: () => t2.currentTime || 0, set: (r2) => {
        Number.isNaN(r2 = parseFloat(r2)) || (t2.currentTime = (0, i.clamp)(r2, 0, e2.duration));
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], ej83c: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      (0, i.def)(e2, "duration", { get: () => {
        let { duration: t2 } = e2.template.$video;
        return t2 === 1 / 0 ? 0 : t2 || 0;
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "4DKMC": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      function t2(t3, r2) {
        return new Promise((a2, o2) => {
          if (t3 === e2.url) return;
          let { playing: i2, aspectRatio: n2, playbackRate: s } = e2;
          e2.pause(), e2.url = t3, e2.notice.show = "", e2.once("video:error", o2), e2.once("video:loadedmetadata", () => {
            e2.currentTime = r2;
          }), e2.once("video:canplay", async () => {
            e2.playbackRate = s, e2.aspectRatio = n2, i2 && await e2.play(), e2.notice.show = "", a2();
          });
        });
      }
      (0, i.def)(e2, "switchQuality", { value: (r2) => t2(r2, e2.currentTime) }), (0, i.def)(e2, "switchUrl", { value: (e3) => t2(e3, 0) }), (0, i.def)(e2, "switch", { set: e2.switchUrl });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "3q2BJ": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { template: { $video: t2 }, i18n: r2, notice: a2 } = e2;
      (0, i.def)(e2, "playbackRate", { get: () => t2.playbackRate, set(o2) {
        o2 ? o2 !== t2.playbackRate && (t2.playbackRate = o2, a2.show = `${r2.get("Rate")}: ${1 === o2 ? r2.get("Normal") : `${o2}x`}`) : e2.playbackRate = 1;
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], kKNdy: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { i18n: t2, notice: r2, template: { $video: a2, $player: o2 } } = e2;
      (0, i.def)(e2, "aspectRatio", { get: () => o2.dataset.aspectRatio || "default", set(n2) {
        if (n2 || (n2 = "default"), "default" === n2) (0, i.setStyle)(a2, "width", null), (0, i.setStyle)(a2, "height", null), (0, i.setStyle)(a2, "margin", null), delete o2.dataset.aspectRatio;
        else {
          let e3 = n2.split(":").map(Number), { clientWidth: t3, clientHeight: r3 } = o2, s = e3[0] / e3[1];
          t3 / r3 > s ? ((0, i.setStyle)(a2, "width", `${s * r3}px`), (0, i.setStyle)(a2, "height", "100%"), (0, i.setStyle)(a2, "margin", "0 auto")) : ((0, i.setStyle)(a2, "width", "100%"), (0, i.setStyle)(a2, "height", `${t3 / s}px`), (0, i.setStyle)(a2, "margin", "auto 0")), o2.dataset.aspectRatio = n2;
        }
        r2.show = `${t2.get("Aspect Ratio")}: ${"default" === n2 ? t2.get("Default") : n2}`, e2.emit("aspectRatio", n2);
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], jEOGf: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { notice: t2, template: { $video: r2 } } = e2, a2 = (0, i.createElement)("canvas");
      (0, i.def)(e2, "getDataURL", { value: () => new Promise((e3, o2) => {
        try {
          a2.width = r2.videoWidth, a2.height = r2.videoHeight, a2.getContext("2d").drawImage(r2, 0, 0), e3(a2.toDataURL("image/png"));
        } catch (e4) {
          t2.show = e4, o2(e4);
        }
      }) }), (0, i.def)(e2, "getBlobUrl", { value: () => new Promise((e3, o2) => {
        try {
          a2.width = r2.videoWidth, a2.height = r2.videoHeight, a2.getContext("2d").drawImage(r2, 0, 0), a2.toBlob((t3) => {
            e3(URL.createObjectURL(t3));
          });
        } catch (e4) {
          t2.show = e4, o2(e4);
        }
      }) }), (0, i.def)(e2, "screenshot", { value: async (t3) => {
        let a3 = await e2.getDataURL(), o2 = t3 || `artplayer_${(0, i.secondToTime)(r2.currentTime)}`;
        return (0, i.download)(a3, `${o2}.png`), e2.emit("screenshot", a3), a3;
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "6fcMx": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => l);
    var i = e("../libs/screenfull"), n = o.interopDefault(i), s = e("../utils");
    function l(e2) {
      let { i18n: t2, notice: r2, template: { $video: a2, $player: o2 } } = e2, i2 = (e3) => {
        n.default.on("change", () => {
          e3.emit("fullscreen", n.default.isFullscreen), n.default.isFullscreen ? (e3.state = "fullscreen", (0, s.addClass)(o2, "art-fullscreen")) : (0, s.removeClass)(o2, "art-fullscreen"), e3.emit("resize");
        }), n.default.on("error", (t3) => {
          e3.emit("fullscreenError", t3);
        }), (0, s.def)(e3, "fullscreen", { get: () => n.default.isFullscreen, async set(e4) {
          e4 ? await n.default.request(o2) : await n.default.exit();
        } });
      }, l2 = (e3) => {
        e3.proxy(document, "webkitfullscreenchange", () => {
          e3.emit("fullscreen", e3.fullscreen), e3.emit("resize");
        }), (0, s.def)(e3, "fullscreen", { get: () => document.fullscreenElement === a2, set(t3) {
          t3 ? (e3.state = "fullscreen", a2.webkitEnterFullscreen()) : a2.webkitExitFullscreen();
        } });
      };
      e2.once("video:loadedmetadata", () => {
        n.default.isEnabled ? i2(e2) : a2.webkitSupportsFullscreen ? l2(e2) : (0, s.def)(e2, "fullscreen", { get: () => false, set() {
          r2.show = t2.get("Fullscreen Not Supported");
        } }), (0, s.def)(e2, "fullscreen", (0, s.get)(e2, "fullscreen"));
      });
    }
  }, { "../libs/screenfull": "kQNoU", "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], kQNoU: [function(e, t, r, a) {
    e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r);
    let o = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], i = (() => {
      if ("undefined" == typeof document) return false;
      let e2 = o[0], t2 = {};
      for (let r2 of o) if (r2[1] in document) {
        for (let [a2, o2] of r2.entries()) t2[e2[a2]] = o2;
        return t2;
      }
      return false;
    })(), n = { change: i.fullscreenchange, error: i.fullscreenerror }, s = { request: (e2 = document.documentElement, t2) => new Promise((r2, a2) => {
      let o2 = () => {
        s.off("change", o2), r2();
      };
      s.on("change", o2);
      let n2 = e2[i.requestFullscreen](t2);
      n2 instanceof Promise && n2.then(o2).catch(a2);
    }), exit: () => new Promise((e2, t2) => {
      if (!s.isFullscreen) return void e2();
      let r2 = () => {
        s.off("change", r2), e2();
      };
      s.on("change", r2);
      let a2 = document[i.exitFullscreen]();
      a2 instanceof Promise && a2.then(r2).catch(t2);
    }), toggle: (e2, t2) => s.isFullscreen ? s.exit() : s.request(e2, t2), onchange(e2) {
      s.on("change", e2);
    }, onerror(e2) {
      s.on("error", e2);
    }, on(e2, t2) {
      let r2 = n[e2];
      r2 && document.addEventListener(r2, t2, false);
    }, off(e2, t2) {
      let r2 = n[e2];
      r2 && document.removeEventListener(r2, t2, false);
    }, raw: i };
    Object.defineProperties(s, { isFullscreen: { get: () => !!document[i.fullscreenElement] }, element: { enumerable: true, get: () => document[i.fullscreenElement] }, isEnabled: { enumerable: true, get: () => !!document[i.fullscreenEnabled] } }), i || (s = { isEnabled: false }), r.default = s;
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "2fgOZ": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { constructor: t2, template: { $container: r2, $player: a2 } } = e2, o2 = "";
      (0, i.def)(e2, "fullscreenWeb", { get: () => (0, i.hasClass)(a2, "art-fullscreen-web"), set(n2) {
        n2 ? (o2 = a2.style.cssText, t2.FULLSCREEN_WEB_IN_BODY && (0, i.append)(document.body, a2), e2.state = "fullscreenWeb", (0, i.setStyle)(a2, "width", "100%"), (0, i.setStyle)(a2, "height", "100%"), (0, i.addClass)(a2, "art-fullscreen-web"), e2.emit("fullscreenWeb", true)) : (t2.FULLSCREEN_WEB_IN_BODY && (0, i.append)(r2, a2), o2 && (a2.style.cssText = o2, o2 = ""), (0, i.removeClass)(a2, "art-fullscreen-web"), e2.emit("fullscreenWeb", false)), e2.emit("resize");
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "7ctTv": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { i18n: t2, notice: r2, template: { $video: a2 } } = e2;
      if (document.pictureInPictureEnabled) {
        let { template: { $video: t3 }, proxy: r3, notice: a3 } = e2;
        t3.disablePictureInPicture = false, (0, i.def)(e2, "pip", { get: () => document.pictureInPictureElement, set(r4) {
          r4 ? (e2.state = "pip", t3.requestPictureInPicture().catch((e3) => {
            throw a3.show = e3, e3;
          })) : document.exitPictureInPicture().catch((e3) => {
            throw a3.show = e3, e3;
          });
        } }), r3(t3, "enterpictureinpicture", () => {
          e2.emit("pip", true);
        }), r3(t3, "leavepictureinpicture", () => {
          e2.emit("pip", false);
        });
      } else if (a2.webkitSupportsPresentationMode) {
        let { $video: t3 } = e2.template;
        t3.webkitSetPresentationMode("inline"), (0, i.def)(e2, "pip", { get: () => "picture-in-picture" === t3.webkitPresentationMode, set(r3) {
          r3 ? (e2.state = "pip", t3.webkitSetPresentationMode("picture-in-picture"), e2.emit("pip", true)) : (t3.webkitSetPresentationMode("inline"), e2.emit("pip", false));
        } });
      } else (0, i.def)(e2, "pip", { get: () => false, set() {
        r2.show = t2.get("PIP Not Supported");
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "748cK": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { $video: t2 } = e2.template;
      (0, i.def)(e2, "loaded", { get: () => e2.loadedTime / t2.duration }), (0, i.def)(e2, "loadedTime", { get: () => t2.buffered.length ? t2.buffered.end(t2.buffered.length - 1) : 0 });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "2v3kJ": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      (0, i.def)(e2, "played", { get: () => e2.currentTime / e2.duration });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "7NTUH": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { $video: t2 } = e2.template;
      (0, i.def)(e2, "playing", { get: () => "boolean" == typeof t2.playing ? t2.playing : !!(t2.currentTime > 0 && !t2.paused && !t2.ended && t2.readyState > 2) });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], lVqio: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { $container: t2, $player: r2, $video: a2 } = e2.template;
      (0, i.def)(e2, "autoSize", { value() {
        let { videoWidth: o2, videoHeight: n2 } = a2, { width: s, height: l } = (0, i.getRect)(t2), c = o2 / n2;
        s / l > c ? ((0, i.setStyle)(r2, "width", `${l * c / s * 100}%`), (0, i.setStyle)(r2, "height", "100%")) : ((0, i.setStyle)(r2, "width", "100%"), (0, i.setStyle)(r2, "height", `${s / c / l * 100}%`)), e2.emit("autoSize", { width: e2.width, height: e2.height });
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], i0rvQ: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      (0, i.def)(e2, "rect", { get: () => (0, i.getRect)(e2.template.$player) });
      let t2 = ["bottom", "height", "left", "right", "top", "width"];
      for (let r2 = 0; r2 < t2.length; r2++) {
        let a2 = t2[r2];
        (0, i.def)(e2, a2, { get: () => e2.rect[a2] });
      }
      (0, i.def)(e2, "x", { get: () => e2.left + window.pageXOffset }), (0, i.def)(e2, "y", { get: () => e2.top + window.pageYOffset });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], f8acK: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { template: { $player: t2 }, i18n: r2, notice: a2 } = e2;
      (0, i.def)(e2, "flip", { get: () => t2.dataset.flip || "normal", set(o2) {
        o2 || (o2 = "normal"), "normal" === o2 ? delete t2.dataset.flip : t2.dataset.flip = o2, a2.show = `${r2.get("Video Flip")}: ${r2.get((0, i.capitalize)(o2))}`, e2.emit("flip", o2);
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], htzAz: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { icons: t2, proxy: r2, storage: a2, template: { $player: o2, $video: n2 } } = e2, s = false, l = 0, c = 0;
      function p() {
        let { $mini: t3 } = e2.template;
        t3 && ((0, i.removeClass)(o2, "art-mini"), (0, i.setStyle)(t3, "display", "none"), o2.prepend(n2), e2.emit("mini", false));
      }
      function u(t3, r3) {
        e2.playing ? ((0, i.setStyle)(t3, "display", "none"), (0, i.setStyle)(r3, "display", "flex")) : ((0, i.setStyle)(t3, "display", "flex"), (0, i.setStyle)(r3, "display", "none"));
      }
      function d() {
        let { $mini: t3 } = e2.template, r3 = (0, i.getRect)(t3), o3 = window.innerHeight - r3.height - 50, n3 = window.innerWidth - r3.width - 50;
        a2.set("top", o3), a2.set("left", n3), (0, i.setStyle)(t3, "top", `${o3}px`), (0, i.setStyle)(t3, "left", `${n3}px`);
      }
      (0, i.def)(e2, "mini", { get: () => (0, i.hasClass)(o2, "art-mini"), set(f) {
        if (f) {
          e2.state = "mini", (0, i.addClass)(o2, "art-mini");
          let f2 = function() {
            let { $mini: o3 } = e2.template;
            if (o3) return (0, i.append)(o3, n2), (0, i.setStyle)(o3, "display", "flex");
            {
              let o4 = (0, i.createElement)("div");
              (0, i.addClass)(o4, "art-mini-popup"), (0, i.append)(document.body, o4), e2.template.$mini = o4, (0, i.append)(o4, n2);
              let d2 = (0, i.append)(o4, '<div class="art-mini-close"></div>');
              (0, i.append)(d2, t2.close), r2(d2, "click", p);
              let f3 = (0, i.append)(o4, '<div class="art-mini-state"></div>'), h3 = (0, i.append)(f3, t2.play), m2 = (0, i.append)(f3, t2.pause);
              return r2(h3, "click", () => e2.play()), r2(m2, "click", () => e2.pause()), u(h3, m2), e2.on("video:playing", () => u(h3, m2)), e2.on("video:pause", () => u(h3, m2)), e2.on("video:timeupdate", () => u(h3, m2)), r2(o4, "mousedown", (e3) => {
                s = 0 === e3.button, l = e3.pageX, c = e3.pageY;
              }), e2.on("document:mousemove", (e3) => {
                if (s) {
                  (0, i.addClass)(o4, "art-mini-dragging");
                  let t3 = e3.pageX - l, r3 = e3.pageY - c;
                  (0, i.setStyle)(o4, "transform", `translate(${t3}px, ${r3}px)`);
                }
              }), e2.on("document:mouseup", () => {
                if (s) {
                  s = false, (0, i.removeClass)(o4, "art-mini-dragging");
                  let e3 = (0, i.getRect)(o4);
                  a2.set("left", e3.left), a2.set("top", e3.top), (0, i.setStyle)(o4, "left", `${e3.left}px`), (0, i.setStyle)(o4, "top", `${e3.top}px`), (0, i.setStyle)(o4, "transform", null);
                }
              }), o4;
            }
          }(), h2 = a2.get("top"), m = a2.get("left");
          "number" == typeof h2 && "number" == typeof m ? ((0, i.setStyle)(f2, "top", `${h2}px`), (0, i.setStyle)(f2, "left", `${m}px`), (0, i.isInViewport)(f2) || d()) : d(), e2.emit("mini", true);
        } else p();
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], iIy8c: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { template: { $poster: t2 } } = e2;
      (0, i.def)(e2, "poster", { get: () => {
        try {
          return t2.style.backgroundImage.match(/"(.*)"/)[1];
        } catch (e3) {
          return "";
        }
      }, set(e3) {
        (0, i.setStyle)(t2, "backgroundImage", `url(${e3})`);
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "4JyZb": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { template: { $container: t2, $video: r2 } } = e2;
      (0, i.def)(e2, "autoHeight", { value() {
        let { clientWidth: a2 } = t2, { videoHeight: o2, videoWidth: n2 } = r2, s = a2 / n2 * o2;
        (0, i.setStyle)(t2, "height", s + "px"), e2.emit("autoHeight", s);
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "9iyPY": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { $player: t2 } = e2.template;
      (0, i.def)(e2, "cssVar", { value: (e3, r2) => r2 ? t2.style.setProperty(e3, r2) : getComputedStyle(t2).getPropertyValue(e3) });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "7NNfU": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      (0, i.def)(e2, "theme", { get: () => e2.cssVar("--art-theme"), set(t2) {
        e2.cssVar("--art-theme", t2);
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], ipJQa: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      (0, i.def)(e2, "type", { get: () => e2.option.type, set(t2) {
        e2.option.type = t2;
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "6P1Bw": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let t2 = ["mini", "pip", "fullscreen", "fullscreenWeb"];
      (0, i.def)(e2, "state", { get: () => t2.find((t3) => e2[t3]) || "standard", set(r2) {
        for (let a2 = 0; a2 < t2.length; a2++) {
          let o2 = t2[a2];
          o2 !== r2 && e2[o2] && (e2[o2] = false);
        }
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], eqBmH: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { notice: t2, i18n: r2, template: a2 } = e2;
      (0, i.def)(e2, "subtitleOffset", { get: () => a2.$track?.offset || 0, set(o2) {
        let { cues: n2 } = e2.subtitle;
        if (!a2.$track || 0 === n2.length) return;
        let s = (0, i.clamp)(o2, -10, 10);
        a2.$track.offset = s;
        for (let t3 = 0; t3 < n2.length; t3++) {
          let r3 = n2[t3];
          r3.originalStartTime = r3.originalStartTime ?? r3.startTime, r3.originalEndTime = r3.originalEndTime ?? r3.endTime, r3.startTime = (0, i.clamp)(r3.originalStartTime + s, 0, e2.duration), r3.endTime = (0, i.clamp)(r3.originalEndTime + s, 0, e2.duration);
        }
        e2.subtitle.update(), t2.show = `${r2.get("Subtitle Offset")}: ${o2}s`, e2.emit("subtitleOffset", o2);
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], etKzV: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { i18n: t2, notice: r2, proxy: a2, template: { $video: o2 } } = e2, n2 = true;
      window.WebKitPlaybackTargetAvailabilityEvent && o2.webkitShowPlaybackTargetPicker ? a2(o2, "webkitplaybacktargetavailabilitychanged", (e3) => {
        switch (e3.availability) {
          case "available":
            n2 = true;
            break;
          case "not-available":
            n2 = false;
        }
      }) : n2 = false, (0, i.def)(e2, "airplay", { value() {
        n2 ? (o2.webkitShowPlaybackTargetPicker(), e2.emit("airplay")) : r2.show = t2.get("AirPlay Not Available");
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "1CuDr": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      (0, i.def)(e2, "quality", { set(t2) {
        let { controls: r2, notice: a2, i18n: o2 } = e2, i2 = t2.find((e3) => e3.default) || t2[0];
        r2.update({ name: "quality", position: "right", index: 10, style: { marginRight: "10px" }, html: i2?.html || "", selector: t2, onSelect: async (t3) => (await e2.switchQuality(t3.url), a2.show = `${o2.get("Switch Video")}: ${t3.html}`, t3.html) });
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "63zKA": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { events: t2, option: r2, template: { $progress: a2, $video: o2 } } = e2, n2 = null, s = null, l = false, c = false, p = false;
      t2.hover(a2, () => {
        p = true;
      }, () => {
        p = false;
      }), e2.on("setBar", async (t3, u, d) => {
        let f = e2.controls?.thumbnails, { url: h2, scale: m } = r2.thumbnails;
        if (!f || !h2) return;
        let g = "played" === t3 && d && i.isMobile;
        if ("hover" === t3 || g) {
          if (l || (l = true, s = await (0, i.loadImg)(h2, m), c = true), !c || !p) return;
          let t4 = a2.clientWidth * u;
          (0, i.setStyle)(f, "display", "flex"), t4 > 0 && t4 < a2.clientWidth ? function(t5) {
            let n3 = e2.controls?.thumbnails;
            if (!n3) return;
            let { number: l2, column: c2, width: p2, height: u2, scale: d2 } = r2.thumbnails, f2 = p2 * d2 || s.naturalWidth / c2, h3 = u2 * d2 || f2 / (o2.videoWidth / o2.videoHeight), m2 = Math.floor(t5 / (a2.clientWidth / l2)), g2 = Math.ceil(m2 / c2) - 1;
            (0, i.setStyle)(n3, "backgroundImage", `url(${s.src})`), (0, i.setStyle)(n3, "height", `${h3}px`), (0, i.setStyle)(n3, "width", `${f2}px`), (0, i.setStyle)(n3, "backgroundPosition", `-${(m2 % c2 || c2 - 1) * f2}px -${g2 * h3}px`), t5 <= f2 / 2 ? (0, i.setStyle)(n3, "left", 0) : t5 > a2.clientWidth - f2 / 2 ? (0, i.setStyle)(n3, "left", `${a2.clientWidth - f2}px`) : (0, i.setStyle)(n3, "left", `${t5 - f2 / 2}px`);
          }(t4) : i.isMobile || (0, i.setStyle)(f, "display", "none"), g && (clearTimeout(n2), n2 = setTimeout(() => {
            (0, i.setStyle)(f, "display", "none");
          }, 500));
        }
      }), (0, i.def)(e2, "thumbnails", { get: () => e2.option.thumbnails, set(t3) {
        t3.url && !e2.option.isLive && (e2.option.thumbnails = t3, clearTimeout(n2), n2 = null, s = null, l = false, c = false);
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], cIuaY: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { option: t2, storage: r2, template: { $video: a2, $poster: o2 } } = e2;
      for (let r3 in t2.moreVideoAttr) e2.attr(r3, t2.moreVideoAttr[r3]);
      t2.muted && (e2.muted = t2.muted), t2.volume && (a2.volume = (0, i.clamp)(t2.volume, 0, 1));
      let n2 = r2.get("volume");
      for (let r3 in "number" == typeof n2 && (a2.volume = (0, i.clamp)(n2, 0, 1)), t2.poster && (0, i.setStyle)(o2, "backgroundImage", `url(${t2.poster})`), t2.autoplay && (a2.autoplay = t2.autoplay), t2.playsInline && (a2.playsInline = true, a2["webkit-playsinline"] = true), t2.theme && (t2.cssVar["--art-theme"] = t2.theme), t2.cssVar) e2.cssVar(r3, t2.cssVar[r3]);
      e2.url = t2.url;
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], lqh1e: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => l);
    var i = e("../config"), n = o.interopDefault(i), s = e("../utils");
    function l(e2) {
      let { i18n: t2, notice: r2, option: a2, constructor: o2, proxy: i2, template: { $player: l2, $video: c, $poster: p } } = e2, u = 0;
      for (let t3 = 0; t3 < n.default.events.length; t3++) i2(c, n.default.events[t3], (t4) => {
        e2.emit(`video:${t4.type}`, t4);
      });
      e2.on("video:canplay", () => {
        u = 0, e2.loading.show = false;
      }), e2.once("video:canplay", () => {
        e2.loading.show = false, e2.controls.show = true, e2.mask.show = true, e2.isReady = true, e2.emit("ready");
      }), e2.on("video:ended", () => {
        a2.loop ? (e2.seek = 0, e2.play(), e2.controls.show = false, e2.mask.show = false) : (e2.controls.show = true, e2.mask.show = true);
      }), e2.on("video:error", async (i3) => {
        u < o2.RECONNECT_TIME_MAX ? (await (0, s.sleep)(o2.RECONNECT_SLEEP_TIME), u += 1, e2.url = a2.url, r2.show = `${t2.get("Reconnect")}: ${u}`, e2.emit("error", i3, u)) : (e2.mask.show = true, e2.loading.show = false, e2.controls.show = true, (0, s.addClass)(l2, "art-error"), await (0, s.sleep)(o2.RECONNECT_SLEEP_TIME), r2.show = t2.get("Video Load Failed"));
      }), e2.on("video:loadedmetadata", () => {
        e2.emit("resize"), s.isMobile && (e2.loading.show = false, e2.controls.show = true, e2.mask.show = true);
      }), e2.on("video:loadstart", () => {
        e2.loading.show = true, e2.mask.show = false, e2.controls.show = true;
      }), e2.on("video:pause", () => {
        e2.controls.show = true, e2.mask.show = true;
      }), e2.on("video:play", () => {
        e2.mask.show = false, (0, s.setStyle)(p, "display", "none");
      }), e2.on("video:playing", () => {
        e2.mask.show = false;
      }), e2.on("video:progress", () => {
        e2.playing && (e2.loading.show = false);
      }), e2.on("video:seeked", () => {
        e2.loading.show = false, e2.mask.show = true;
      }), e2.on("video:seeking", () => {
        e2.loading.show = true, e2.mask.show = false;
      }), e2.on("video:timeupdate", () => {
        e2.mask.show = false;
      }), e2.on("video:waiting", () => {
        e2.loading.show = true, e2.mask.show = false;
      });
    }
  }, { "../config": "eQRJX", "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "4zOCk": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r);
    var i = e("../utils/component"), n = o.interopDefault(i), s = e("./fullscreen"), l = o.interopDefault(s), c = e("./fullscreenWeb"), p = o.interopDefault(c), u = e("./pip"), d = o.interopDefault(u), f = e("./playAndPause"), h2 = o.interopDefault(f), m = e("./progress"), g = o.interopDefault(m), v = e("./time"), y = o.interopDefault(v), b = e("./volume"), x = o.interopDefault(b), w = e("./setting"), j = o.interopDefault(w), k = e("./screenshot"), S = o.interopDefault(k), E = e("./airplay"), z = o.interopDefault(E), $ = e("../utils");
    class I extends n.default {
      constructor(e2) {
        super(e2), this.isHover = false, this.name = "control", this.timer = Date.now();
        let { constructor: t2 } = e2, { $player: r2, $bottom: a2 } = this.art.template;
        e2.on("mousemove", () => {
          $.isMobile || (this.show = true);
        }), e2.on("click", () => {
          $.isMobile ? this.toggle() : this.show = true;
        }), e2.on("document:mousemove", (e3) => {
          this.isHover = (0, $.includeFromEvent)(e3, a2);
        }), e2.on("video:timeupdate", () => {
          !e2.setting.show && !this.isHover && !e2.isInput && e2.playing && this.show && Date.now() - this.timer >= t2.CONTROL_HIDE_TIME && (this.show = false);
        }), e2.on("control", (e3) => {
          e3 ? ((0, $.removeClass)(r2, "art-hide-cursor"), (0, $.addClass)(r2, "art-hover"), this.timer = Date.now()) : ((0, $.addClass)(r2, "art-hide-cursor"), (0, $.removeClass)(r2, "art-hover"));
        }), this.init();
      }
      init() {
        let { option: e2 } = this.art;
        e2.isLive || this.add((0, g.default)({ name: "progress", position: "top", index: 10 })), this.add({ name: "thumbnails", position: "top", index: 20 }), this.add((0, h2.default)({ name: "playAndPause", position: "left", index: 10 })), this.add((0, x.default)({ name: "volume", position: "left", index: 20 })), e2.isLive || this.add((0, y.default)({ name: "time", position: "left", index: 30 })), e2.quality.length && (0, $.sleep)().then(() => {
          this.art.quality = e2.quality;
        }), e2.screenshot && !$.isMobile && this.add((0, S.default)({ name: "screenshot", position: "right", index: 20 })), e2.setting && this.add((0, j.default)({ name: "setting", position: "right", index: 30 })), e2.pip && this.add((0, d.default)({ name: "pip", position: "right", index: 40 })), e2.airplay && window.WebKitPlaybackTargetAvailabilityEvent && this.add((0, z.default)({ name: "airplay", position: "right", index: 50 })), e2.fullscreenWeb && this.add((0, p.default)({ name: "fullscreenWeb", position: "right", index: 60 })), e2.fullscreen && this.add((0, l.default)({ name: "fullscreen", position: "right", index: 70 }));
        for (let t2 = 0; t2 < e2.controls.length; t2++) this.add(e2.controls[t2]);
      }
      add(e2) {
        let t2 = "function" == typeof e2 ? e2(this.art) : e2, { $progress: r2, $controlsLeft: a2, $controlsRight: o2 } = this.art.template;
        switch (t2.position) {
          case "top":
            this.$parent = r2;
            break;
          case "left":
            this.$parent = a2;
            break;
          case "right":
            this.$parent = o2;
            break;
          default:
            (0, $.errorHandle)(false, "Control option.position must one of 'top', 'left', 'right'");
        }
        super.add(t2);
      }
      check(e2) {
        e2.$control_value.innerHTML = e2.html;
        for (let t2 = 0; t2 < e2.$control_option.length; t2++) {
          let r2 = e2.$control_option[t2];
          r2.default = r2 === e2, r2.default && (0, $.inverseClass)(r2.$control_item, "art-current");
        }
      }
      selector(e2, t2, r2) {
        let { proxy: a2 } = this.art.events;
        (0, $.addClass)(t2, "art-control-selector");
        let o2 = (0, $.createElement)("div");
        (0, $.addClass)(o2, "art-selector-value"), (0, $.append)(o2, e2.html), t2.innerText = "", (0, $.append)(t2, o2);
        let i2 = (0, $.createElement)("div");
        (0, $.addClass)(i2, "art-selector-list"), (0, $.append)(t2, i2);
        for (let t3 = 0; t3 < e2.selector.length; t3++) {
          let r3 = e2.selector[t3], a3 = (0, $.createElement)("div");
          (0, $.addClass)(a3, "art-selector-item"), r3.default && (0, $.addClass)(a3, "art-current"), a3.dataset.index = t3, a3.dataset.value = r3.value, a3.innerHTML = r3.html, (0, $.append)(i2, a3), (0, $.def)(r3, "$control_option", { get: () => e2.selector }), (0, $.def)(r3, "$control_item", { get: () => a3 }), (0, $.def)(r3, "$control_value", { get: () => o2 });
        }
        let n2 = a2(i2, "click", async (t3) => {
          let r3 = t3.composedPath() || [], a3 = e2.selector.find((e3) => e3.$control_item === r3.find((t4) => e3.$control_item === t4));
          this.check(a3), e2.onSelect && (o2.innerHTML = await e2.onSelect.call(this.art, a3, a3.$control_item, t3));
        });
        r2.push(n2);
      }
    }
    r.default = I;
  }, { "../utils/component": "j4qZZ", "./fullscreen": "7juzt", "./fullscreenWeb": "dukaq", "./pip": "lt0U6", "./playAndPause": "eyIIx", "./progress": "2S7vj", "./time": "bgLbI", "./volume": "lA6hu", "./setting": "cH3Og", "./screenshot": "gGGQI", "./airplay": "4TMBv", "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], j4qZZ: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r);
    var i = e("./dom"), n = e("./error"), s = e("option-validator"), l = o.interopDefault(s), c = e("../scheme");
    r.default = class {
      constructor(e2) {
        this.id = 0, this.art = e2, this.cache = /* @__PURE__ */ new Map(), this.add = this.add.bind(this), this.remove = this.remove.bind(this), this.update = this.update.bind(this);
      }
      get show() {
        return (0, i.hasClass)(this.art.template.$player, `art-${this.name}-show`);
      }
      set show(e2) {
        let { $player: t2 } = this.art.template, r2 = `art-${this.name}-show`;
        e2 ? (0, i.addClass)(t2, r2) : (0, i.removeClass)(t2, r2), this.art.emit(this.name, e2);
      }
      toggle() {
        this.show = !this.show;
      }
      add(e2) {
        let t2 = "function" == typeof e2 ? e2(this.art) : e2;
        if (t2.html = t2.html || "", (0, l.default)(t2, c.ComponentOption), !this.$parent || !this.name || t2.disable) return;
        let r2 = t2.name || `${this.name}${this.id}`, a2 = this.cache.get(r2);
        (0, n.errorHandle)(!a2, `Can't add an existing [${r2}] to the [${this.name}]`), this.id += 1;
        let o2 = (0, i.createElement)("div");
        (0, i.addClass)(o2, `art-${this.name}`), (0, i.addClass)(o2, `art-${this.name}-${r2}`);
        let s2 = Array.from(this.$parent.children);
        o2.dataset.index = t2.index || this.id;
        let p = s2.find((e3) => Number(e3.dataset.index) >= Number(o2.dataset.index));
        p ? p.insertAdjacentElement("beforebegin", o2) : (0, i.append)(this.$parent, o2), t2.html && (0, i.append)(o2, t2.html), t2.style && (0, i.setStyles)(o2, t2.style), t2.tooltip && (0, i.tooltip)(o2, t2.tooltip);
        let u = [];
        if (t2.click) {
          let e3 = this.art.events.proxy(o2, "click", (e4) => {
            e4.preventDefault(), t2.click.call(this.art, this, e4);
          });
          u.push(e3);
        }
        return t2.selector && ["left", "right"].includes(t2.position) && this.selector(t2, o2, u), this[r2] = o2, this.cache.set(r2, { $ref: o2, events: u, option: t2 }), t2.mounted && t2.mounted.call(this.art, o2), o2;
      }
      remove(e2) {
        let t2 = this.cache.get(e2);
        (0, n.errorHandle)(t2, `Can't find [${e2}] from the [${this.name}]`), t2.option.beforeUnmount && t2.option.beforeUnmount.call(this.art, t2.$ref);
        for (let e3 = 0; e3 < t2.events.length; e3++) this.art.events.remove(t2.events[e3]);
        this.cache.delete(e2), delete this[e2], (0, i.remove)(t2.$ref);
      }
      update(e2) {
        let t2 = this.cache.get(e2.name);
        return t2 && (e2 = Object.assign(t2.option, e2), this.remove(e2.name)), this.add(e2);
      }
    };
  }, { "./dom": "jghk1", "./error": "9OXL0", "option-validator": "49gY0", "../scheme": "bEi0U", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "7juzt": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      return (t2) => ({ ...e2, tooltip: t2.i18n.get("Fullscreen"), mounted: (e3) => {
        let { proxy: r2, icons: a2, i18n: o2 } = t2, n2 = (0, i.append)(e3, a2.fullscreenOn), s = (0, i.append)(e3, a2.fullscreenOff);
        (0, i.setStyle)(s, "display", "none"), r2(e3, "click", () => {
          t2.fullscreen = !t2.fullscreen;
        }), t2.on("fullscreen", (t3) => {
          t3 ? ((0, i.tooltip)(e3, o2.get("Exit Fullscreen")), (0, i.setStyle)(n2, "display", "none"), (0, i.setStyle)(s, "display", "inline-flex")) : ((0, i.tooltip)(e3, o2.get("Fullscreen")), (0, i.setStyle)(n2, "display", "inline-flex"), (0, i.setStyle)(s, "display", "none"));
        });
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], dukaq: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      return (t2) => ({ ...e2, tooltip: t2.i18n.get("Web Fullscreen"), mounted: (e3) => {
        let { proxy: r2, icons: a2, i18n: o2 } = t2, n2 = (0, i.append)(e3, a2.fullscreenWebOn), s = (0, i.append)(e3, a2.fullscreenWebOff);
        (0, i.setStyle)(s, "display", "none"), r2(e3, "click", () => {
          t2.fullscreenWeb = !t2.fullscreenWeb;
        }), t2.on("fullscreenWeb", (t3) => {
          t3 ? ((0, i.tooltip)(e3, o2.get("Exit Web Fullscreen")), (0, i.setStyle)(n2, "display", "none"), (0, i.setStyle)(s, "display", "inline-flex")) : ((0, i.tooltip)(e3, o2.get("Web Fullscreen")), (0, i.setStyle)(n2, "display", "inline-flex"), (0, i.setStyle)(s, "display", "none"));
        });
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], lt0U6: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      return (t2) => ({ ...e2, tooltip: t2.i18n.get("PIP Mode"), mounted: (e3) => {
        let { proxy: r2, icons: a2, i18n: o2 } = t2;
        (0, i.append)(e3, a2.pip), r2(e3, "click", () => {
          t2.pip = !t2.pip;
        }), t2.on("pip", (t3) => {
          (0, i.tooltip)(e3, o2.get(t3 ? "Exit PIP Mode" : "PIP Mode"));
        });
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], eyIIx: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      return (t2) => ({ ...e2, mounted: (e3) => {
        let { proxy: r2, icons: a2, i18n: o2 } = t2, n2 = (0, i.append)(e3, a2.play), s = (0, i.append)(e3, a2.pause);
        function l() {
          (0, i.setStyle)(n2, "display", "flex"), (0, i.setStyle)(s, "display", "none");
        }
        function c() {
          (0, i.setStyle)(n2, "display", "none"), (0, i.setStyle)(s, "display", "flex");
        }
        (0, i.tooltip)(n2, o2.get("Play")), (0, i.tooltip)(s, o2.get("Pause")), r2(n2, "click", () => {
          t2.play();
        }), r2(s, "click", () => {
          t2.pause();
        }), t2.playing ? c() : l(), t2.on("video:playing", () => {
          c();
        }), t2.on("video:pause", () => {
          l();
        });
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "2S7vj": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "getPosFromEvent", () => n), o.export(r, "setCurrentTime", () => s), o.export(r, "default", () => l);
    var i = e("../utils");
    function n(e2, t2) {
      let { $progress: r2 } = e2.template, { left: a2 } = (0, i.getRect)(r2), o2 = i.isMobile ? t2.touches[0].clientX : t2.clientX, n2 = (0, i.clamp)(o2 - a2, 0, r2.clientWidth), s2 = n2 / r2.clientWidth * e2.duration, l2 = (0, i.secondToTime)(s2), c = (0, i.clamp)(n2 / r2.clientWidth, 0, 1);
      return { second: s2, time: l2, width: n2, percentage: c };
    }
    function s(e2, t2) {
      if (e2.isRotate) {
        let r2 = t2.touches[0].clientY / e2.height, a2 = r2 * e2.duration;
        e2.emit("setBar", "played", r2, t2), e2.seek = a2;
      } else {
        let { second: r2, percentage: a2 } = n(e2, t2);
        e2.emit("setBar", "played", a2, t2), e2.seek = r2;
      }
    }
    function l(e2) {
      return (t2) => {
        let { icons: r2, option: a2, proxy: o2 } = t2;
        return { ...e2, html: `<div class="art-control-progress-inner"><div class="art-progress-hover"></div><div class="art-progress-loaded"></div><div class="art-progress-played"></div><div class="art-progress-highlight"></div><div class="art-progress-indicator"></div><div class="art-progress-tip"></div></div>`, mounted: (e3) => {
          let l2 = null, c = false, p = (0, i.query)(".art-progress-hover", e3), u = (0, i.query)(".art-progress-loaded", e3), d = (0, i.query)(".art-progress-played", e3), f = (0, i.query)(".art-progress-highlight", e3), h2 = (0, i.query)(".art-progress-indicator", e3), m = (0, i.query)(".art-progress-tip", e3);
          function g(r3, a3) {
            let { width: o3, time: s2 } = a3 || n(t2, r3);
            m.innerText = s2;
            let l3 = m.clientWidth;
            o3 <= l3 / 2 ? (0, i.setStyle)(m, "left", 0) : o3 > e3.clientWidth - l3 / 2 ? (0, i.setStyle)(m, "left", `${e3.clientWidth - l3}px`) : (0, i.setStyle)(m, "left", `${o3 - l3 / 2}px`);
          }
          r2.indicator ? (0, i.append)(h2, r2.indicator) : (0, i.setStyle)(h2, "backgroundColor", "var(--art-theme)"), t2.on("setBar", function(r3, a3, o3) {
            let n2 = "played" === r3 && o3 && i.isMobile;
            "loaded" === r3 && (0, i.setStyle)(u, "width", `${100 * a3}%`), "hover" === r3 && (0, i.setStyle)(p, "width", `${100 * a3}%`), "played" === r3 && ((0, i.setStyle)(d, "width", `${100 * a3}%`), (0, i.setStyle)(h2, "left", `${100 * a3}%`)), n2 && ((0, i.setStyle)(m, "display", "flex"), g(o3, { width: e3.clientWidth * a3, time: (0, i.secondToTime)(a3 * t2.duration) }), clearTimeout(l2), l2 = setTimeout(() => {
              (0, i.setStyle)(m, "display", "none");
            }, 500));
          }), t2.on("video:loadedmetadata", function() {
            f.innerText = "";
            for (let e4 = 0; e4 < a2.highlight.length; e4++) {
              let r3 = a2.highlight[e4], o3 = (0, i.clamp)(r3.time, 0, t2.duration) / t2.duration * 100, n2 = `<span data-text="${r3.text}" data-time="${r3.time}" style="left: ${o3}%"></span>`;
              (0, i.append)(f, n2);
            }
          }), t2.constructor.USE_RAF ? t2.on("raf", () => {
            t2.emit("setBar", "played", t2.played), t2.emit("setBar", "loaded", t2.loaded);
          }) : (t2.on("video:timeupdate", () => {
            t2.emit("setBar", "played", t2.played);
          }), t2.on("video:progress", () => {
            t2.emit("setBar", "loaded", t2.loaded);
          }), t2.on("video:ended", () => {
            t2.emit("setBar", "played", 1);
          })), t2.emit("setBar", "loaded", t2.loaded || 0), i.isMobile || (o2(e3, "click", (e4) => {
            e4.target !== h2 && s(t2, e4);
          }), o2(e3, "mousemove", (r3) => {
            let { percentage: a3 } = n(t2, r3);
            if (t2.emit("setBar", "hover", a3, r3), (0, i.setStyle)(m, "display", "flex"), (0, i.includeFromEvent)(r3, f)) {
              let { width: a4 } = n(t2, r3), { text: o3 } = r3.target.dataset;
              m.innerText = o3;
              let s2 = m.clientWidth;
              a4 <= s2 / 2 ? (0, i.setStyle)(m, "left", 0) : a4 > e3.clientWidth - s2 / 2 ? (0, i.setStyle)(m, "left", `${e3.clientWidth - s2}px`) : (0, i.setStyle)(m, "left", `${a4 - s2 / 2}px`);
            } else g(r3);
          }), o2(e3, "mouseleave", (e4) => {
            (0, i.setStyle)(m, "display", "none"), t2.emit("setBar", "hover", 0, e4);
          }), o2(e3, "mousedown", (e4) => {
            c = 0 === e4.button;
          }), t2.on("document:mousemove", (e4) => {
            if (c) {
              let { second: r3, percentage: a3 } = n(t2, e4);
              t2.emit("setBar", "played", a3, e4), t2.seek = r3;
            }
          }), t2.on("document:mouseup", () => {
            c && (c = false);
          }));
        } };
      };
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], bgLbI: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      return (t2) => ({ ...e2, style: i.isMobile ? { fontSize: "12px", padding: "0 5px" } : { cursor: "auto", padding: "0 10px" }, mounted: (e3) => {
        function r2() {
          let r3 = `${(0, i.secondToTime)(t2.currentTime)} / ${(0, i.secondToTime)(t2.duration)}`;
          r3 !== e3.innerText && (e3.innerText = r3);
        }
        r2();
        let a2 = ["video:loadedmetadata", "video:timeupdate", "video:progress"];
        for (let e4 = 0; e4 < a2.length; e4++) t2.on(a2[e4], r2);
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], lA6hu: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      return (t2) => ({ ...e2, mounted: (e3) => {
        let { proxy: r2, icons: a2 } = t2, o2 = (0, i.append)(e3, a2.volume), n2 = (0, i.append)(e3, a2.volumeClose), s = (0, i.append)(e3, '<div class="art-volume-panel"></div>'), l = (0, i.append)(s, '<div class="art-volume-inner"></div>'), c = (0, i.append)(l, '<div class="art-volume-val"></div>'), p = (0, i.append)(l, '<div class="art-volume-slider"></div>'), u = (0, i.append)(p, '<div class="art-volume-handle"></div>'), d = (0, i.append)(u, '<div class="art-volume-loaded"></div>'), f = (0, i.append)(p, '<div class="art-volume-indicator"></div>');
        function h2(e4) {
          let { top: t3, height: r3 } = (0, i.getRect)(p);
          return 1 - (e4.clientY - t3) / r3;
        }
        function m() {
          if (t2.muted || 0 === t2.volume) (0, i.setStyle)(o2, "display", "none"), (0, i.setStyle)(n2, "display", "flex"), (0, i.setStyle)(f, "top", "100%"), (0, i.setStyle)(d, "top", "100%"), c.innerText = 0;
          else {
            let e4 = 100 * t2.volume;
            (0, i.setStyle)(o2, "display", "flex"), (0, i.setStyle)(n2, "display", "none"), (0, i.setStyle)(f, "top", `${100 - e4}%`), (0, i.setStyle)(d, "top", `${100 - e4}%`), c.innerText = Math.floor(e4);
          }
        }
        if (m(), t2.on("video:volumechange", m), r2(o2, "click", () => {
          t2.muted = true;
        }), r2(n2, "click", () => {
          t2.muted = false;
        }), i.isMobile) (0, i.setStyle)(s, "display", "none");
        else {
          let e4 = false;
          r2(p, "mousedown", (r3) => {
            e4 = 0 === r3.button, t2.volume = h2(r3);
          }), t2.on("document:mousemove", (r3) => {
            e4 && (t2.muted = false, t2.volume = h2(r3));
          }), t2.on("document:mouseup", () => {
            e4 && (e4 = false);
          });
        }
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], cH3Og: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      return (t2) => ({ ...e2, tooltip: t2.i18n.get("Show Setting"), mounted: (e3) => {
        let { proxy: r2, icons: a2, i18n: o2 } = t2;
        (0, i.append)(e3, a2.setting), r2(e3, "click", () => {
          t2.setting.toggle(), t2.setting.resize();
        }), t2.on("setting", (t3) => {
          (0, i.tooltip)(e3, o2.get(t3 ? "Hide Setting" : "Show Setting"));
        });
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], gGGQI: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      return (t2) => ({ ...e2, tooltip: t2.i18n.get("Screenshot"), mounted: (e3) => {
        let { proxy: r2, icons: a2 } = t2;
        (0, i.append)(e3, a2.screenshot), r2(e3, "click", () => {
          t2.screenshot();
        });
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "4TMBv": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      return (t2) => ({ ...e2, tooltip: t2.i18n.get("AirPlay"), mounted: (e3) => {
        let { proxy: r2, icons: a2 } = t2;
        (0, i.append)(e3, a2.airplay), r2(e3, "click", () => t2.airplay());
      } });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], iAXzm: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r);
    var i = e("../utils"), n = e("../utils/component"), s = o.interopDefault(n), l = e("./playbackRate"), c = o.interopDefault(l), p = e("./aspectRatio"), u = o.interopDefault(p), d = e("./flip"), f = o.interopDefault(d), h2 = e("./info"), m = o.interopDefault(h2), g = e("./version"), v = o.interopDefault(g), y = e("./close"), b = o.interopDefault(y);
    class x extends s.default {
      constructor(e2) {
        super(e2), this.name = "contextmenu", this.$parent = e2.template.$contextmenu, i.isMobile || this.init();
      }
      init() {
        let { option: e2, proxy: t2, template: { $player: r2, $contextmenu: a2 } } = this.art;
        e2.playbackRate && this.add((0, c.default)({ name: "playbackRate", index: 10 })), e2.aspectRatio && this.add((0, u.default)({ name: "aspectRatio", index: 20 })), e2.flip && this.add((0, f.default)({ name: "flip", index: 30 })), this.add((0, m.default)({ name: "info", index: 40 })), this.add((0, v.default)({ name: "version", index: 50 })), this.add((0, b.default)({ name: "close", index: 60 }));
        for (let t3 = 0; t3 < e2.contextmenu.length; t3++) this.add(e2.contextmenu[t3]);
        t2(r2, "contextmenu", (e3) => {
          if (!this.art.constructor.CONTEXTMENU) return;
          e3.preventDefault(), this.show = true;
          let t3 = e3.clientX, o2 = e3.clientY, { height: n2, width: s2, left: l2, top: c2 } = (0, i.getRect)(r2), { height: p2, width: u2 } = (0, i.getRect)(a2), d2 = t3 - l2, f2 = o2 - c2;
          t3 + u2 > l2 + s2 && (d2 = s2 - u2), o2 + p2 > c2 + n2 && (f2 = n2 - p2), (0, i.setStyles)(a2, { top: `${f2}px`, left: `${d2}px` });
        }), t2(r2, "click", (e3) => {
          (0, i.includeFromEvent)(e3, a2) || (this.show = false);
        }), this.art.on("blur", () => {
          this.show = false;
        });
      }
    }
    r.default = x;
  }, { "../utils": "gpvEP", "../utils/component": "j4qZZ", "./playbackRate": "9jior", "./aspectRatio": "igCMy", "./flip": "4eLts", "./info": "kETiY", "./version": "abcPF", "./close": "aWF54", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "9jior": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      return (t2) => {
        let { i18n: r2, constructor: { PLAYBACK_RATE: a2 } } = t2, o2 = a2.map((e3) => `<span data-value="${e3}">${1 === e3 ? r2.get("Normal") : e3.toFixed(1)}</span>`).join("");
        return { ...e2, html: `${r2.get("Play Speed")}: ${o2}`, click: (e3, r3) => {
          let { value: a3 } = r3.target.dataset;
          a3 && (t2.playbackRate = Number(a3), e3.show = false);
        }, mounted: (e3) => {
          let r3 = (0, i.query)('[data-value="1"]', e3);
          r3 && (0, i.inverseClass)(r3, "art-current"), t2.on("video:ratechange", () => {
            let r4 = (0, i.queryAll)("span", e3).find((e4) => Number(e4.dataset.value) === t2.playbackRate);
            r4 && (0, i.inverseClass)(r4, "art-current");
          });
        } };
      };
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], igCMy: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      return (t2) => {
        let { i18n: r2, constructor: { ASPECT_RATIO: a2 } } = t2, o2 = a2.map((e3) => `<span data-value="${e3}">${"default" === e3 ? r2.get("Default") : e3}</span>`).join("");
        return { ...e2, html: `${r2.get("Aspect Ratio")}: ${o2}`, click: (e3, r3) => {
          let { value: a3 } = r3.target.dataset;
          a3 && (t2.aspectRatio = a3, e3.show = false);
        }, mounted: (e3) => {
          let r3 = (0, i.query)('[data-value="default"]', e3);
          r3 && (0, i.inverseClass)(r3, "art-current"), t2.on("aspectRatio", (t3) => {
            let r4 = (0, i.queryAll)("span", e3).find((e4) => e4.dataset.value === t3);
            r4 && (0, i.inverseClass)(r4, "art-current");
          });
        } };
      };
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "4eLts": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      return (t2) => {
        let { i18n: r2, constructor: { FLIP: a2 } } = t2, o2 = a2.map((e3) => `<span data-value="${e3}">${r2.get((0, i.capitalize)(e3))}</span>`).join("");
        return { ...e2, html: `${r2.get("Video Flip")}: ${o2}`, click: (e3, r3) => {
          let { value: a3 } = r3.target.dataset;
          a3 && (t2.flip = a3.toLowerCase(), e3.show = false);
        }, mounted: (e3) => {
          let r3 = (0, i.query)('[data-value="normal"]', e3);
          r3 && (0, i.inverseClass)(r3, "art-current"), t2.on("flip", (t3) => {
            let r4 = (0, i.queryAll)("span", e3).find((e4) => e4.dataset.value === t3);
            r4 && (0, i.inverseClass)(r4, "art-current");
          });
        } };
      };
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], kETiY: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    function i(e2) {
      return (t2) => ({ ...e2, html: t2.i18n.get("Video Info"), click: (e3) => {
        t2.info.show = true, e3.show = false;
      } });
    }
    o.defineInteropFlag(r), o.export(r, "default", () => i);
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], abcPF: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => function(e2) {
      return { ...e2, html: `<a href="https://artplayer.org" target="_blank">ArtPlayer ${i.version}</a>` };
    });
    var i = e("../../package.json");
  }, { "../../package.json": "aQnLI", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], aWF54: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    function i(e2) {
      return (t2) => ({ ...e2, html: t2.i18n.get("Close"), click: (e3) => {
        e3.show = false;
      } });
    }
    o.defineInteropFlag(r), o.export(r, "default", () => i);
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], bFUCG: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r);
    var i = e("./utils"), n = e("./utils/component"), s = o.interopDefault(n);
    class l extends s.default {
      constructor(e2) {
        super(e2), this.name = "info", i.isMobile || this.init();
      }
      init() {
        let { proxy: e2, constructor: t2, template: { $infoPanel: r2, $infoClose: a2, $video: o2 } } = this.art;
        e2(a2, "click", () => {
          this.show = false;
        });
        let n2 = null, s2 = (0, i.queryAll)("[data-video]", r2) || [];
        this.art.on("destroy", () => clearTimeout(n2)), !function e3() {
          for (let e4 = 0; e4 < s2.length; e4++) {
            let t3 = s2[e4], r3 = o2[t3.dataset.video], a3 = "number" == typeof r3 ? r3.toFixed(2) : r3;
            t3.innerText !== a3 && (t3.innerText = a3);
          }
          n2 = setTimeout(e3, t2.INFO_LOOP_TIME);
        }();
      }
    }
    r.default = l;
  }, { "./utils": "gpvEP", "./utils/component": "j4qZZ", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], lEARb: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r);
    var i = e("./utils"), n = e("./utils/component"), s = o.interopDefault(n), l = e("option-validator"), c = o.interopDefault(l), p = e("./scheme"), u = o.interopDefault(p);
    class d extends s.default {
      constructor(e2) {
        super(e2), this.name = "subtitle", this.option = null, this.destroyEvent = () => null, this.init(e2.option.subtitle);
        let t2 = false;
        e2.on("video:timeupdate", () => {
          if (!this.url) return;
          let e3 = this.art.template.$video.webkitDisplayingFullscreen;
          "boolean" == typeof e3 && e3 !== t2 && (t2 = e3, this.createTrack(e3 ? "subtitles" : "metadata", this.url));
        });
      }
      get url() {
        return this.art.template.$track.src;
      }
      set url(e2) {
        this.switch(e2);
      }
      get textTrack() {
        return this.art.template.$video?.textTracks?.[0];
      }
      get activeCues() {
        return this.textTrack ? Array.from(this.textTrack.activeCues) : [];
      }
      get cues() {
        return this.textTrack ? Array.from(this.textTrack.cues) : [];
      }
      style(e2, t2) {
        let { $subtitle: r2 } = this.art.template;
        return "object" == typeof e2 ? (0, i.setStyles)(r2, e2) : (0, i.setStyle)(r2, e2, t2);
      }
      update() {
        let { option: { subtitle: e2 }, template: { $subtitle: t2 } } = this.art;
        t2.innerHTML = "", this.activeCues.length && (this.art.emit("subtitleBeforeUpdate", this.activeCues), t2.innerHTML = this.activeCues.map((t3, r2) => t3.text.split(/\r?\n/).filter((e3) => e3.trim()).map((t4) => `<div class="art-subtitle-line" data-group="${r2}">${e2.escape ? (0, i.escape)(t4) : t4}</div>`).join("")).join(""), this.art.emit("subtitleAfterUpdate", this.activeCues));
      }
      async switch(e2, t2 = {}) {
        let { i18n: r2, notice: a2, option: o2 } = this.art, i2 = { ...o2.subtitle, ...t2, url: e2 }, n2 = await this.init(i2);
        return t2.name && (a2.show = `${r2.get("Switch Subtitle")}: ${t2.name}`), n2;
      }
      createTrack(e2, t2) {
        let { template: r2, proxy: a2, option: o2 } = this.art, { $video: n2, $track: s2 } = r2, l2 = (0, i.createElement)("track");
        l2.default = true, l2.kind = e2, l2.src = t2, l2.label = o2.subtitle.name || "Artplayer", l2.track.mode = "hidden", l2.onload = () => {
          this.art.emit("subtitleLoad", this.cues, this.option);
        }, this.art.events.remove(this.destroyEvent), s2.onload = null, (0, i.remove)(s2), (0, i.append)(n2, l2), r2.$track = l2, this.destroyEvent = a2(this.textTrack, "cuechange", () => this.update());
      }
      async init(e2) {
        let { notice: t2, template: { $subtitle: r2 } } = this.art;
        return this.textTrack ? ((0, c.default)(e2, u.default.subtitle), e2.url) ? (this.option = e2, this.style(e2.style), fetch(e2.url).then((e3) => e3.arrayBuffer()).then((t3) => {
          let r3 = new TextDecoder(e2.encoding).decode(t3);
          switch (e2.type || (0, i.getExt)(e2.url)) {
            case "srt": {
              let t4 = (0, i.srtToVtt)(r3), a2 = e2.onVttLoad(t4);
              return (0, i.vttToBlob)(a2);
            }
            case "ass": {
              let t4 = (0, i.assToVtt)(r3), a2 = e2.onVttLoad(t4);
              return (0, i.vttToBlob)(a2);
            }
            case "vtt": {
              let t4 = e2.onVttLoad(r3);
              return (0, i.vttToBlob)(t4);
            }
            default:
              return e2.url;
          }
        }).then((e3) => (r2.innerHTML = "", this.url === e3 || (URL.revokeObjectURL(this.url), this.createTrack("metadata", e3)), e3)).catch((e3) => {
          throw r2.innerHTML = "", t2.show = e3, e3;
        })) : void 0 : null;
      }
    }
    r.default = d;
  }, { "./utils": "gpvEP", "./utils/component": "j4qZZ", "option-validator": "49gY0", "./scheme": "bEi0U", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], fpHt3: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r);
    var i = e("./clickInit"), n = o.interopDefault(i), s = e("./hoverInit"), l = o.interopDefault(s), c = e("./moveInit"), p = o.interopDefault(c), u = e("./resizeInit"), d = o.interopDefault(u), f = e("./gestureInit"), h2 = o.interopDefault(f), m = e("./viewInit"), g = o.interopDefault(m), v = e("./documentInit"), y = o.interopDefault(v), b = e("./updateInit"), x = o.interopDefault(b), w = e("./restoreInit"), j = o.interopDefault(w);
    r.default = class {
      constructor(e2) {
        this.destroyEvents = [], this.proxy = this.proxy.bind(this), this.hover = this.hover.bind(this), (0, n.default)(e2, this), (0, l.default)(e2, this), (0, p.default)(e2, this), (0, d.default)(e2, this), (0, h2.default)(e2, this), (0, g.default)(e2, this), (0, y.default)(e2, this), (0, x.default)(e2, this), (0, j.default)(e2, this);
      }
      proxy(e2, t2, r2, a2 = {}) {
        if (Array.isArray(t2)) return t2.map((t3) => this.proxy(e2, t3, r2, a2));
        e2.addEventListener(t2, r2, a2);
        let o2 = () => e2.removeEventListener(t2, r2, a2);
        return this.destroyEvents.push(o2), o2;
      }
      hover(e2, t2, r2) {
        t2 && this.proxy(e2, "mouseenter", t2), r2 && this.proxy(e2, "mouseleave", r2);
      }
      remove(e2) {
        let t2 = this.destroyEvents.indexOf(e2);
        t2 > -1 && (e2(), this.destroyEvents.splice(t2, 1));
      }
      destroy() {
        for (let e2 = 0; e2 < this.destroyEvents.length; e2++) this.destroyEvents[e2]();
      }
    };
  }, { "./clickInit": "iJ3NQ", "./hoverInit": "8qahy", "./moveInit": "5Eivu", "./resizeInit": "905Dr", "./gestureInit": "8F0uv", "./viewInit": "26qSX", "./documentInit": "9wES9", "./updateInit": "cY9iQ", "./restoreInit": "3YYY5", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], iJ3NQ: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2, t2) {
      let { constructor: r2, template: { $player: a2, $video: o2 } } = e2;
      t2.proxy(document, ["click", "contextmenu"], (t3) => {
        (0, i.includeFromEvent)(t3, a2) ? (e2.isInput = "INPUT" === t3.target.tagName, e2.isFocus = true, e2.emit("focus", t3)) : (e2.isInput = false, e2.isFocus = false, e2.emit("blur", t3));
      });
      let n2 = [];
      t2.proxy(o2, "click", (t3) => {
        let a3 = Date.now();
        n2.push(a3);
        let { MOBILE_CLICK_PLAY: o3, DBCLICK_TIME: s, MOBILE_DBCLICK_PLAY: l, DBCLICK_FULLSCREEN: c } = r2, p = n2.filter((e3) => a3 - e3 <= s);
        switch (p.length) {
          case 1:
            e2.emit("click", t3), i.isMobile ? !e2.isLock && o3 && e2.toggle() : e2.toggle(), n2 = p;
            break;
          case 2:
            e2.emit("dblclick", t3), i.isMobile ? !e2.isLock && l && e2.toggle() : c && (e2.fullscreen = !e2.fullscreen), n2 = [];
            break;
          default:
            n2 = [];
        }
      });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "8qahy": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2, t2) {
      let { $player: r2 } = e2.template;
      t2.hover(r2, (t3) => {
        (0, i.addClass)(r2, "art-hover"), e2.emit("hover", true, t3);
      }, (t3) => {
        (0, i.removeClass)(r2, "art-hover"), e2.emit("hover", false, t3);
      });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "5Eivu": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    function i(e2, t2) {
      let { $player: r2 } = e2.template;
      t2.proxy(r2, "mousemove", (t3) => {
        e2.emit("mousemove", t3);
      });
    }
    o.defineInteropFlag(r), o.export(r, "default", () => i);
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "905Dr": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2, t2) {
      let { option: r2, constructor: a2 } = e2;
      e2.on("resize", () => {
        let { aspectRatio: t3, notice: a3 } = e2;
        "standard" === e2.state && r2.autoSize && e2.autoSize(), e2.aspectRatio = t3, a3.show = "";
      });
      let o2 = (0, i.debounce)(() => e2.emit("resize"), a2.RESIZE_TIME);
      t2.proxy(window, ["orientationchange", "resize"], () => o2()), screen && screen.orientation && screen.orientation.onchange && t2.proxy(screen.orientation, "change", () => o2());
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "8F0uv": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => s);
    var i = e("../utils"), n = e("../control/progress");
    function s(e2, t2) {
      if (i.isMobile && !e2.option.isLive) {
        let { $video: r2, $progress: a2 } = e2.template, o2 = null, s2 = false, l = 0, c = 0, p = 0, u = (t3) => {
          if (1 === t3.touches.length && !e2.isLock) {
            o2 === a2 && (0, n.setCurrentTime)(e2, t3), s2 = true;
            let { pageX: r3, pageY: i2 } = t3.touches[0];
            l = r3, c = i2, p = e2.currentTime;
          }
        }, d = (t3) => {
          if (1 === t3.touches.length && s2 && e2.duration) {
            let { pageX: a3, pageY: n2 } = t3.touches[0], s3 = function(e3, t4, r3, a4) {
              var o3 = t4 - a4, i2 = r3 - e3, n3 = 0;
              if (2 > Math.abs(i2) && 2 > Math.abs(o3)) return n3;
              var s4 = 180 * Math.atan2(o3, i2) / Math.PI;
              return s4 >= -45 && s4 < 45 ? n3 = 4 : s4 >= 45 && s4 < 135 ? n3 = 1 : s4 >= -135 && s4 < -45 ? n3 = 2 : (s4 >= 135 && s4 <= 180 || s4 >= -180 && s4 < -135) && (n3 = 3), n3;
            }(l, c, a3, n2), u2 = [3, 4].includes(s3), d2 = [1, 2].includes(s3);
            if (u2 && !e2.isRotate || d2 && e2.isRotate) {
              let s4 = (0, i.clamp)((a3 - l) / e2.width, -1, 1), u3 = (0, i.clamp)((n2 - c) / e2.height, -1, 1), d3 = e2.isRotate ? u3 : s4, f = o2 === r2 ? e2.constructor.TOUCH_MOVE_RATIO : 1, h2 = (0, i.clamp)(p + e2.duration * d3 * f, 0, e2.duration);
              e2.seek = h2, e2.emit("setBar", "played", (0, i.clamp)(h2 / e2.duration, 0, 1), t3), e2.notice.show = `${(0, i.secondToTime)(h2)} / ${(0, i.secondToTime)(e2.duration)}`;
            }
          }
        };
        e2.option.gesture && (t2.proxy(r2, "touchstart", (e3) => {
          o2 = r2, u(e3);
        }), t2.proxy(r2, "touchmove", d)), t2.proxy(a2, "touchstart", (e3) => {
          o2 = a2, u(e3);
        }), t2.proxy(a2, "touchmove", d), t2.proxy(document, "touchend", () => {
          s2 && (l = 0, c = 0, p = 0, s2 = false, o2 = null);
        });
      }
    }
  }, { "../utils": "gpvEP", "../control/progress": "2S7vj", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "26qSX": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2, t2) {
      let { option: r2, constructor: a2, template: { $container: o2 } } = e2, n2 = (0, i.throttle)(() => {
        e2.emit("view", (0, i.isInViewport)(o2, a2.SCROLL_GAP));
      }, a2.SCROLL_TIME);
      t2.proxy(window, "scroll", () => n2()), e2.on("view", (t3) => {
        r2.autoMini && (e2.mini = !t3);
      });
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "9wES9": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    function i(e2, t2) {
      t2.proxy(document, "mousemove", (t3) => {
        e2.emit("document:mousemove", t3);
      }), t2.proxy(document, "mouseup", (t3) => {
        e2.emit("document:mouseup", t3);
      });
    }
    o.defineInteropFlag(r), o.export(r, "default", () => i);
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], cY9iQ: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    function i(e2) {
      if (e2.constructor.USE_RAF) {
        let t2 = null;
        !function r2() {
          e2.playing && e2.emit("raf"), e2.isDestroy || (t2 = requestAnimationFrame(r2));
        }(), e2.on("destroy", () => {
          cancelAnimationFrame(t2);
        });
      }
    }
    o.defineInteropFlag(r), o.export(r, "default", () => i);
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "3YYY5": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    function i(e2, t2) {
    }
    o.defineInteropFlag(r), o.export(r, "default", () => i);
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "9z96t": [function(e, t, r, a) {
    e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r);
    var o = e("./utils");
    r.default = class {
      constructor(e2) {
        this.art = e2, this.keys = {}, e2.option.hotkey && !o.isMobile && this.init();
      }
      init() {
        let { proxy: e2, constructor: t2 } = this.art;
        this.add("Escape", () => {
          this.art.fullscreenWeb && (this.art.fullscreenWeb = false);
        }), this.add("Space", () => {
          this.art.toggle();
        }), this.add("ArrowLeft", () => {
          this.art.backward = t2.SEEK_STEP;
        }), this.add("ArrowUp", () => {
          this.art.volume += t2.VOLUME_STEP;
        }), this.add("ArrowRight", () => {
          this.art.forward = t2.SEEK_STEP;
        }), this.add("ArrowDown", () => {
          this.art.volume -= t2.VOLUME_STEP;
        }), e2(document, "keydown", (e3) => {
          if (this.art.isFocus) {
            let t3 = document.activeElement.tagName.toUpperCase(), r2 = document.activeElement.getAttribute("contenteditable");
            if ("INPUT" !== t3 && "TEXTAREA" !== t3 && "" !== r2 && "true" !== r2 && !e3.altKey && !e3.ctrlKey && !e3.metaKey && !e3.shiftKey) {
              let t4 = this.keys[e3.code];
              if (t4) {
                e3.preventDefault();
                for (let r3 = 0; r3 < t4.length; r3++) t4[r3].call(this.art, e3);
                this.art.emit("hotkey", e3);
              }
            }
          }
          this.art.emit("keydown", e3);
        });
      }
      add(e2, t2) {
        return this.keys[e2] ? this.keys[e2].push(t2) : this.keys[e2] = [t2], this;
      }
      remove(e2, t2) {
        if (this.keys[e2]) {
          let r2 = this.keys[e2].indexOf(t2);
          -1 !== r2 && this.keys[e2].splice(r2, 1);
        }
        return this;
      }
    };
  }, { "./utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], e9ahx: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r);
    var i = e("./utils/component"), n = o.interopDefault(i);
    class s extends n.default {
      constructor(e2) {
        super(e2);
        let { option: t2, template: { $layer: r2 } } = e2;
        this.name = "layer", this.$parent = r2;
        for (let e3 = 0; e3 < t2.layers.length; e3++) this.add(t2.layers[e3]);
      }
    }
    r.default = s;
  }, { "./utils/component": "j4qZZ", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], hlSVU: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r);
    var i = e("./utils"), n = e("./utils/component"), s = o.interopDefault(n);
    class l extends s.default {
      constructor(e2) {
        super(e2), this.name = "loading", (0, i.append)(e2.template.$loading, e2.icons.loading);
      }
    }
    r.default = l;
  }, { "./utils": "gpvEP", "./utils/component": "j4qZZ", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], eDyfI: [function(e, t, r, a) {
    e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r);
    var o = e("./utils");
    r.default = class {
      constructor(e2) {
        this.art = e2, this.timer = null;
      }
      set show(e2) {
        let { constructor: t2, template: { $player: r2, $noticeInner: a2 } } = this.art;
        e2 ? (a2.innerText = e2 instanceof Error ? e2.message.trim() : e2, (0, o.addClass)(r2, "art-notice-show"), clearTimeout(this.timer), this.timer = setTimeout(() => {
          a2.innerText = "", (0, o.removeClass)(r2, "art-notice-show");
        }, t2.NOTICE_TIME)) : (0, o.removeClass)(r2, "art-notice-show");
      }
    };
  }, { "./utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], uwUok: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r);
    var i = e("./utils"), n = e("./utils/component"), s = o.interopDefault(n);
    class l extends s.default {
      constructor(e2) {
        super(e2), this.name = "mask";
        let { template: t2, icons: r2, events: a2 } = e2, o2 = (0, i.append)(t2.$state, r2.state), n2 = (0, i.append)(t2.$state, r2.error);
        (0, i.setStyle)(n2, "display", "none"), e2.on("destroy", () => {
          (0, i.setStyle)(o2, "display", "none"), (0, i.setStyle)(n2, "display", null);
        }), a2.proxy(t2.$state, "click", () => e2.play());
      }
    }
    r.default = l;
  }, { "./utils": "gpvEP", "./utils/component": "j4qZZ", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "1F2QO": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r);
    var i = e("../utils"), n = e("bundle-text:./loading.svg"), s = o.interopDefault(n), l = e("bundle-text:./state.svg"), c = o.interopDefault(l), p = e("bundle-text:./check.svg"), u = o.interopDefault(p), d = e("bundle-text:./play.svg"), f = o.interopDefault(d), h2 = e("bundle-text:./pause.svg"), m = o.interopDefault(h2), g = e("bundle-text:./volume.svg"), v = o.interopDefault(g), y = e("bundle-text:./volume-close.svg"), b = o.interopDefault(y), x = e("bundle-text:./screenshot.svg"), w = o.interopDefault(x), j = e("bundle-text:./setting.svg"), k = o.interopDefault(j), S = e("bundle-text:./arrow-left.svg"), E = o.interopDefault(S), z = e("bundle-text:./arrow-right.svg"), $ = o.interopDefault(z), I = e("bundle-text:./playback-rate.svg"), T = o.interopDefault(I), M = e("bundle-text:./aspect-ratio.svg"), F = o.interopDefault(M), P = e("bundle-text:./config.svg"), C = o.interopDefault(P), D = e("bundle-text:./pip.svg"), A = o.interopDefault(D), R = e("bundle-text:./lock.svg"), L = o.interopDefault(R), O = e("bundle-text:./unlock.svg"), q = o.interopDefault(O), _ = e("bundle-text:./fullscreen-off.svg"), H = o.interopDefault(_), V = e("bundle-text:./fullscreen-on.svg"), N = o.interopDefault(V), B = e("bundle-text:./fullscreen-web-off.svg"), U = o.interopDefault(B), Y = e("bundle-text:./fullscreen-web-on.svg"), W = o.interopDefault(Y), K = e("bundle-text:./switch-on.svg"), Q = o.interopDefault(K), X = e("bundle-text:./switch-off.svg"), Z = o.interopDefault(X), G = e("bundle-text:./flip.svg"), J = o.interopDefault(G), ee = e("bundle-text:./error.svg"), et = o.interopDefault(ee), er = e("bundle-text:./close.svg"), ea = o.interopDefault(er), eo = e("bundle-text:./airplay.svg"), ei = o.interopDefault(eo);
    r.default = class {
      constructor(e2) {
        let t2 = { loading: s.default, state: c.default, play: f.default, pause: m.default, check: u.default, volume: v.default, volumeClose: b.default, screenshot: w.default, setting: k.default, pip: A.default, arrowLeft: E.default, arrowRight: $.default, playbackRate: T.default, aspectRatio: F.default, config: C.default, lock: L.default, flip: J.default, unlock: q.default, fullscreenOff: H.default, fullscreenOn: N.default, fullscreenWebOff: U.default, fullscreenWebOn: W.default, switchOn: Q.default, switchOff: Z.default, error: et.default, close: ea.default, airplay: ei.default, ...e2.option.icons };
        for (let e3 in t2) (0, i.def)(this, e3, { get: () => (0, i.getIcon)(e3, t2[e3]) });
      }
    };
  }, { "../utils": "gpvEP", "bundle-text:./loading.svg": "OH22M", "bundle-text:./state.svg": "exeDr", "bundle-text:./check.svg": "jDV5m", "bundle-text:./play.svg": "8azN4", "bundle-text:./pause.svg": "5ROTD", "bundle-text:./volume.svg": "gd6yR", "bundle-text:./volume-close.svg": "3xcqi", "bundle-text:./screenshot.svg": "4bQmt", "bundle-text:./setting.svg": "8JYeE", "bundle-text:./arrow-left.svg": "1vtAE", "bundle-text:./arrow-right.svg": "89K7J", "bundle-text:./playback-rate.svg": "aboDI", "bundle-text:./aspect-ratio.svg": "iXCLk", "bundle-text:./config.svg": "f8v0I", "bundle-text:./pip.svg": "5TDKn", "bundle-text:./lock.svg": "7ioy7", "bundle-text:./unlock.svg": "8M4rv", "bundle-text:./fullscreen-off.svg": "iY4Nz", "bundle-text:./fullscreen-on.svg": "8DF0G", "bundle-text:./fullscreen-web-off.svg": "64eDf", "bundle-text:./fullscreen-web-on.svg": "gxLKk", "bundle-text:./switch-on.svg": "1a3p7", "bundle-text:./switch-off.svg": "ioXaN", "bundle-text:./flip.svg": "ghEK8", "bundle-text:./error.svg": "3iobs", "bundle-text:./close.svg": "dhbAn", "bundle-text:./airplay.svg": "hbZQA", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], OH22M: [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" class="uil-default" preserveAspectRatio="xMidYMid" viewBox="0 0 100 100"><path fill="none" d="M0 0h100v100H0z" class="bk"/><rect width="6" height="20" x="47" y="40" fill="#fff" rx="5" ry="5" transform="translate(0 -30)"><animate attributeName="opacity" begin="-1s" dur="1s" from="1" repeatCount="indefinite" to="0"/></rect><rect width="6" height="20" x="47" y="40" fill="#fff" rx="5" ry="5" transform="rotate(30 105.98 65)"><animate attributeName="opacity" begin="-0.9166666666666666s" dur="1s" from="1" repeatCount="indefinite" to="0"/></rect><rect width="6" height="20" x="47" y="40" fill="#fff" rx="5" ry="5" transform="rotate(60 75.98 65)"><animate attributeName="opacity" begin="-0.8333333333333334s" dur="1s" from="1" repeatCount="indefinite" to="0"/></rect><rect width="6" height="20" x="47" y="40" fill="#fff" rx="5" ry="5" transform="rotate(90 65 65)"><animate attributeName="opacity" begin="-0.75s" dur="1s" from="1" repeatCount="indefinite" to="0"/></rect><rect width="6" height="20" x="47" y="40" fill="#fff" rx="5" ry="5" transform="rotate(120 58.66 65)"><animate attributeName="opacity" begin="-0.6666666666666666s" dur="1s" from="1" repeatCount="indefinite" to="0"/></rect><rect width="6" height="20" x="47" y="40" fill="#fff" rx="5" ry="5" transform="rotate(150 54.02 65)"><animate attributeName="opacity" begin="-0.5833333333333334s" dur="1s" from="1" repeatCount="indefinite" to="0"/></rect><rect width="6" height="20" x="47" y="40" fill="#fff" rx="5" ry="5" transform="rotate(180 50 65)"><animate attributeName="opacity" begin="-0.5s" dur="1s" from="1" repeatCount="indefinite" to="0"/></rect><rect width="6" height="20" x="47" y="40" fill="#fff" rx="5" ry="5" transform="rotate(-150 45.98 65)"><animate attributeName="opacity" begin="-0.4166666666666667s" dur="1s" from="1" repeatCount="indefinite" to="0"/></rect><rect width="6" height="20" x="47" y="40" fill="#fff" rx="5" ry="5" transform="rotate(-120 41.34 65)"><animate attributeName="opacity" begin="-0.3333333333333333s" dur="1s" from="1" repeatCount="indefinite" to="0"/></rect><rect width="6" height="20" x="47" y="40" fill="#fff" rx="5" ry="5" transform="rotate(-90 35 65)"><animate attributeName="opacity" begin="-0.25s" dur="1s" from="1" repeatCount="indefinite" to="0"/></rect><rect width="6" height="20" x="47" y="40" fill="#fff" rx="5" ry="5" transform="rotate(-60 24.02 65)"><animate attributeName="opacity" begin="-0.16666666666666666s" dur="1s" from="1" repeatCount="indefinite" to="0"/></rect><rect width="6" height="20" x="47" y="40" fill="#fff" rx="5" ry="5" transform="rotate(-30 -5.98 65)"><animate attributeName="opacity" begin="-0.08333333333333333s" dur="1s" from="1" repeatCount="indefinite" to="0"/></rect></svg>';
  }, {}], exeDr: [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24"><path fill="#fff" d="M9.5 9.325v5.35q0 .575.525.875t1.025-.05l4.15-2.65q.475-.3.475-.85t-.475-.85L11.05 8.5q-.5-.35-1.025-.05t-.525.875M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12t.788-3.9 2.137-3.175q1.35-1.35 3.175-2.137T12 2t3.9.788 3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"/></svg>';
  }, {}], jDV5m: [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%" viewBox="0 0 24 24"><path fill="#fff" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>';
  }, {}], "8azN4": [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"><path d="M17.982 9.275 8.06 3.27A2.013 2.013 0 0 0 5 4.994v12.011a2.017 2.017 0 0 0 3.06 1.725l9.922-6.005a2.017 2.017 0 0 0 0-3.45"/></svg>';
  }, {}], "5ROTD": [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"><path d="M7 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2m8 0a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2"/></svg>';
  }, {}], gd6yR: [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"><path d="M10.188 4.65 6 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39V5.04a.498.498 0 0 0-.812-.39m4.258-.872a1 1 0 0 0-.862 1.804 6.002 6.002 0 0 1-.007 10.838 1 1 0 0 0 .86 1.806A8 8 0 0 0 19 11a8 8 0 0 0-4.554-7.222"/><path d="M15 11a4 4 0 0 0-2-3.465v6.93A4 4 0 0 0 15 11"/></svg>';
  }, {}], "3xcqi": [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"><path d="M15 11a4 4 0 0 0-2-3.465v2.636l1.865 1.865A4 4 0 0 0 15 11"/><path d="M13.583 5.583A6 6 0 0 1 17 11a6 6 0 0 1-.585 2.587l1.477 1.477a8 8 0 0 0-3.446-11.286 1 1 0 0 0-.863 1.805m5.195 13.195-2.121-2.121-1.414-1.414-1.415-1.415L13 13l-2-2-3.889-3.889-3.889-3.889a.999.999 0 1 0-1.414 1.414L5.172 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39v-3.131l2.587 2.587-.01.005a1 1 0 0 0 .86 1.806q.322-.154.627-.333l2.3 2.3a1.001 1.001 0 0 0 1.414-1.416M11 5.04a.5.5 0 0 0-.813-.39L8.682 5.854 11 8.172z"/></svg>';
  }, {}], "4bQmt": [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 50 50"><path d="M19.402 6a5 5 0 0 0-4.902 4.012L14.098 12H9a5 5 0 0 0-5 5v21a5 5 0 0 0 5 5h32a5 5 0 0 0 5-5V17a5 5 0 0 0-5-5h-5.098l-.402-1.988A5 5 0 0 0 30.598 6ZM25 17c5.52 0 10 4.48 10 10s-4.48 10-10 10-10-4.48-10-10 4.48-10 10-10m0 2c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8"/></svg>';
  }, {}], "8JYeE": [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"><circle cx="11" cy="11" r="2"/><path d="M19.164 8.861 17.6 8.6a7 7 0 0 0-1.186-2.099l.574-1.533a1 1 0 0 0-.436-1.217l-1.997-1.153a1 1 0 0 0-1.272.23l-1.008 1.225a7 7 0 0 0-2.55.001L8.716 2.829a1 1 0 0 0-1.272-.23L5.447 3.751a1 1 0 0 0-.436 1.217l.574 1.533A7 7 0 0 0 4.4 8.6l-1.564.261A1 1 0 0 0 2 9.847v2.306c0 .489.353.906.836.986l1.613.269a7 7 0 0 0 1.228 2.075l-.558 1.487a1 1 0 0 0 .436 1.217l1.997 1.153c.423.244.961.147 1.272-.23l1.04-1.263a7.1 7.1 0 0 0 2.272 0l1.04 1.263a1 1 0 0 0 1.272.23l1.997-1.153a1 1 0 0 0 .436-1.217l-.557-1.487c.521-.61.94-1.31 1.228-2.075l1.613-.269a1 1 0 0 0 .835-.986V9.847a1 1 0 0 0-.836-.986M11 15a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/></svg>';
  }, {}], "1vtAE": [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path fill="#fff" d="m19.41 20.09-4.58-4.59 4.58-4.59L18 9.5l-6 6 6 6z"/></svg>';
  }, {}], "89K7J": [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path fill="#fff" d="m12.59 20.34 4.58-4.59-4.58-4.59L14 9.75l6 6-6 6z"/></svg>';
  }, {}], aboDI: [function(e, t, r, a) {
    t.exports = '<svg width="24" height="24"><path fill="#fff" d="M10 8v8l6-4zM6.3 5l-.6-.8C7.2 3 9 2.2 11 2l.1 1c-1.8.2-3.4.9-4.8 2M5 6.3l-.8-.6C3 7.2 2.2 9 2 11l1 .1c.2-1.8.9-3.4 2-4.8m0 11.4c-1.1-1.4-1.8-3.1-2-4.8L2 13c.2 2 1 3.8 2.2 5.4zm6.1 3.3c-1.8-.2-3.4-.9-4.8-2l-.6.8C7.2 21 9 21.8 11 22zM22 12c0-5.2-3.9-9.4-9-10l-.1 1c4.6.5 8.1 4.3 8.1 9s-3.5 8.5-8.1 9l.1 1c5.2-.5 9-4.8 9-10" style="--darkreader-inline-fill:#a8a6a4"/></svg>';
  }, {}], iXCLk: [function(e, t, r, a) {
    t.exports = `<svg xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;transform:translate(0,0)" viewBox="0 0 88 88"><defs><clipPath id="__lottie_element_216"><path d="M0 0h88v88H0z"/></clipPath></defs><g clip-path="url('#__lottie_element_216')" style="display:block"><path fill="#FFF" d="m12.438-12.702-2.82 2.82c-.79.79-.79 2.05 0 2.83l7.07 7.07-7.07 7.07c-.79.79-.79 2.05 0 2.83l2.82 2.83c.79.78 2.05.78 2.83 0l11.32-11.31c.78-.78.78-2.05 0-2.83l-11.32-11.31c-.78-.79-2.04-.79-2.83 0m-24.88 0c-.74-.74-1.92-.78-2.7-.12l-.13.12-11.31 11.31a2 2 0 0 0-.12 2.7l.12.13 11.31 11.31a2 2 0 0 0 2.7.12l.13-.12 2.83-2.83c.74-.74.78-1.91.11-2.7l-.11-.13-7.07-7.07 7.07-7.07c.74-.74.78-1.91.11-2.7l-.11-.13zM28-28c4.42 0 8 3.58 8 8v40c0 4.42-3.58 8-8 8h-56c-4.42 0-8-3.58-8-8v-40c0-4.42 3.58-8 8-8z" style="--darkreader-inline-fill:#a8a6a4" transform="translate(44 44)"/></g></svg>`;
  }, {}], f8v0I: [function(e, t, r, a) {
    t.exports = '<svg width="24" height="24"><path fill="#fff" d="M15 17h6v1h-6zm-4 0H3v1h8v2h1v-5h-1zm3-9h1V3h-1v2H3v1h11zm4-3v1h3V5zM6 14h1V9H6v2H3v1h3zm4-2h11v-1H10z" style="--darkreader-inline-fill:#a8a6a4"/></svg>';
  }, {}], "5TDKn": [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 36 36"><path d="M25 17h-8v6h8zm4 8V10.98C29 9.88 28.1 9 27 9H9c-1.1 0-2 .88-2 1.98V25c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2m-2 .02H9V10.97h18z"/></svg>';
  }, {}], "7ioy7": [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon" viewBox="0 0 1024 1024"><path fill="#fff" d="M298.667 426.667v-85.334a213.333 213.333 0 1 1 426.666 0v85.334H768A85.333 85.333 0 0 1 853.333 512v256A85.333 85.333 0 0 1 768 853.333H256A85.333 85.333 0 0 1 170.667 768V512A85.333 85.333 0 0 1 256 426.667zM512 213.333a128 128 0 0 0-128 128v85.334h256v-85.334a128 128 0 0 0-128-128"/></svg>';
  }, {}], "8M4rv": [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon" viewBox="0 0 1024 1024"><path fill="#fff" d="m666.752 194.517-49.365 74.112A128 128 0 0 0 384 341.333l.043 85.334h384A85.333 85.333 0 0 1 853.376 512v256a85.333 85.333 0 0 1-85.333 85.333H256A85.333 85.333 0 0 1 170.667 768V512A85.333 85.333 0 0 1 256 426.667h42.667v-85.334a213.333 213.333 0 0 1 368.085-146.816"/></svg>';
  }, {}], iY4Nz: [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" class="icon" viewBox="0 0 1024 1024"><path fill="#fff" d="M768 298.667h170.667V384h-256V128H768zM341.333 384h-256v-85.333H256V128h85.333zM768 725.333V896h-85.333V640h256v85.333zM341.333 640v256H256V725.333H85.333V640z"/></svg>';
  }, {}], "8DF0G": [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" class="icon" viewBox="0 0 1024 1024"><path fill="#fff" d="M625.778 256H768v142.222h113.778v-256h-256zM256 398.222V256h142.222V142.222h-256v256zm512 227.556V768H625.778v113.778h256v-256zM398.222 768H256V625.778H142.222v256h256z"/></svg>';
  }, {}], "64eDf": [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="icon" viewBox="0 0 1152 1024"><path fill="#fff" d="M1075.2 0H76.8A76.8 76.8 0 0 0 0 76.8v870.4a76.8 76.8 0 0 0 76.8 76.8h998.4a76.8 76.8 0 0 0 76.8-76.8V76.8A76.8 76.8 0 0 0 1075.2 0M1024 128v768H128V128zM896 512a64 64 0 0 1 7.488 127.552L896 640H768v128a64 64 0 0 1-56.512 63.552L704 832a64 64 0 0 1-63.552-56.512L640 768V582.592c0-34.496 25.024-66.112 61.632-70.208l8-.384zm-640 0a64 64 0 0 1-7.488-127.552L256 384h128V256a64 64 0 0 1 56.512-63.552L448 192a64 64 0 0 1 63.552 56.512L512 256v185.408c0 34.432-25.024 66.112-61.632 70.144l-8 .448z"/></svg>';
  }, {}], gxLKk: [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="icon" viewBox="0 0 1152 1024"><path fill="#fff" d="M1075.2 0H76.8A76.8 76.8 0 0 0 0 76.8v870.4a76.8 76.8 0 0 0 76.8 76.8h998.4a76.8 76.8 0 0 0 76.8-76.8V76.8A76.8 76.8 0 0 0 1075.2 0M1024 128v768H128V128zm-576 64a64 64 0 0 1 7.488 127.552L448 320H320v128a64 64 0 0 1-56.512 63.552L256 512a64 64 0 0 1-63.552-56.512L192 448V262.592c0-34.432 25.024-66.112 61.632-70.144l8-.448zm256 640a64 64 0 0 1-7.488-127.552L704 704h128V576a64 64 0 0 1 56.512-63.552L896 512a64 64 0 0 1 63.552 56.512L960 576v185.408c0 34.496-25.024 66.112-61.632 70.208l-8 .384z"/></svg>';
  }, {}], "1a3p7": [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" class="icon" viewBox="0 0 1664 1024"><path fill="#648FFC" d="M1152 0H512a512 512 0 0 0 0 1024h640a512 512 0 0 0 0-1024m0 960a448 448 0 1 1 448-448 448 448 0 0 1-448 448"/></svg>';
  }, {}], ioXaN: [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" class="icon" viewBox="0 0 1740 1024"><path fill="#fff" d="M511.898 1024h670.515c282.419-.41 511.18-229.478 511.18-511.898 0-282.419-228.761-511.488-511.18-511.897H511.898C229.478.615.717 229.683.717 512.102c0 282.42 228.761 511.488 511.18 511.898m-.564-975.36A464.589 464.589 0 1 1 48.026 513.024 463.87 463.87 0 0 1 511.334 48.435z"/></svg>';
  }, {}], ghEK8: [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="icon" viewBox="0 0 1024 1024"><path fill="#fff" d="M554.667 810.667V896h-85.334v-85.333zm-384-632.662a42.67 42.67 0 0 1 34.986 18.219l203.904 291.328a42.67 42.67 0 0 1 0 48.896L205.611 827.776A42.667 42.667 0 0 1 128 803.328V220.672a42.667 42.667 0 0 1 42.667-42.667m682.666 0a42.667 42.667 0 0 1 42.368 37.718l.299 4.949v582.656a42.667 42.667 0 0 1-74.24 28.63l-3.413-4.182-203.904-291.328a42.67 42.67 0 0 1-3.03-43.861l3.03-5.035 203.946-291.328a42.67 42.67 0 0 1 34.944-18.219M554.667 640v85.333h-85.334V640zm-358.4-320.896V716.8L335.957 512 196.31 319.104zm358.4 150.23v85.333h-85.334v-85.334zm0-170.667V384h-85.334v-85.333zm0-170.667v85.333h-85.334V128z"/></svg>';
  }, {}], "3iobs": [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024"><path d="M593.818 168.55 949.82 763.76c26.153 43.746 10.732 99.738-34.447 125.052-14.397 8.069-30.72 12.308-47.37 12.308H155.976c-52.224 0-94.536-40.96-94.536-91.505 0-16.097 4.383-31.928 12.718-45.875l356.004-595.19c26.173-43.724 84.009-58.654 129.208-33.341a93.1 93.1 0 0 1 34.448 33.341M512 819.2a61.44 61.44 0 1 0 0-122.88 61.44 61.44 0 0 0 0 122.88m0-512a72.315 72.315 0 0 0-71.762 81.306l25.723 205.721a46.408 46.408 0 0 0 92.078 0l25.723-205.742A72.315 72.315 0 0 0 512 307.2"/></svg>';
  }, {}], dhbAn: [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" class="icon" viewBox="0 0 1024 1024"><path d="m571.733 512 268.8-268.8c17.067-17.067 17.067-42.667 0-59.733-17.066-17.067-42.666-17.067-59.733 0L512 452.267l-268.8-268.8c-17.067-17.067-42.667-17.067-59.733 0-17.067 17.066-17.067 42.666 0 59.733l268.8 268.8-268.8 268.8c-17.067 17.067-17.067 42.667 0 59.733 8.533 8.534 19.2 12.8 29.866 12.8s21.334-4.266 29.867-12.8l268.8-268.8 268.8 268.8c8.533 8.534 19.2 12.8 29.867 12.8s21.333-4.266 29.866-12.8c17.067-17.066 17.067-42.666 0-59.733z"/></svg>';
  }, {}], hbZQA: [function(e, t, r, a) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><g fill="#fff"><path d="M16 1H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3v-2H3V3h12v8h-2v2h3a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"/><path d="M4 17h10l-5-6z"/></g></svg>';
  }, {}], aqPSH: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r);
    var i = e("./flip"), n = o.interopDefault(i), s = e("./aspectRatio"), l = o.interopDefault(s), c = e("./playbackRate"), p = o.interopDefault(c), u = e("./subtitleOffset"), d = o.interopDefault(u), f = e("../utils/component"), h2 = o.interopDefault(f), m = e("../utils");
    class g extends h2.default {
      constructor(e2) {
        super(e2);
        let { option: t2, controls: r2, template: { $setting: a2 } } = e2;
        this.name = "setting", this.$parent = a2, this.id = 0, this.active = null, this.cache = /* @__PURE__ */ new Map(), this.option = [...this.builtin, ...t2.settings], t2.setting && (this.format(), this.render(), e2.on("blur", () => {
          this.show && (this.show = false, this.render());
        }), e2.on("focus", (e3) => {
          let t3 = (0, m.includeFromEvent)(e3, r2.setting), a3 = (0, m.includeFromEvent)(e3, this.$parent);
          !this.show || t3 || a3 || (this.show = false, this.render());
        }), e2.on("resize", () => this.resize()));
      }
      get builtin() {
        let e2 = [], { option: t2 } = this.art;
        return t2.playbackRate && e2.push((0, p.default)(this.art)), t2.aspectRatio && e2.push((0, l.default)(this.art)), t2.flip && e2.push((0, n.default)(this.art)), t2.subtitleOffset && e2.push((0, d.default)(this.art)), e2;
      }
      traverse(e2, t2 = this.option) {
        for (let r2 = 0; r2 < t2.length; r2++) {
          let a2 = t2[r2];
          e2(a2), a2.selector?.length && this.traverse.call(this, e2, a2.selector);
        }
      }
      check(e2) {
        e2.$parent.tooltip = e2.html, this.traverse((t2) => {
          t2.default = t2 === e2, t2.default && t2.$item && (0, m.inverseClass)(t2.$item, "art-current");
        }, e2.$option), this.render(e2.$parents);
      }
      format(e2 = this.option, t2, r2, a2 = []) {
        for (let o2 = 0; o2 < e2.length; o2++) {
          let i2 = e2[o2];
          if (i2?.name ? ((0, m.errorHandle)(!a2.includes(i2.name), `The [${i2.name}] already exists in [setting]`), a2.push(i2.name)) : i2.name = `setting-${this.id++}`, !i2.$formatted) {
            (0, m.def)(i2, "$parent", { get: () => t2 }), (0, m.def)(i2, "$parents", { get: () => r2 }), (0, m.def)(i2, "$option", { get: () => e2 });
            let a3 = [];
            (0, m.def)(i2, "$events", { get: () => a3 }), (0, m.def)(i2, "$formatted", { get: () => true });
          }
          this.format(i2.selector || [], i2, e2, a2);
        }
        this.option = e2;
      }
      find(e2 = "") {
        let t2 = null;
        return this.traverse((r2) => {
          r2.name === e2 && (t2 = r2);
        }), t2;
      }
      resize() {
        let { controls: e2, constructor: { SETTING_WIDTH: t2, SETTING_ITEM_HEIGHT: r2 }, template: { $player: a2, $setting: o2 } } = this.art;
        if (e2.setting && this.show) {
          let i2 = this.active[0]?.$parent?.width || t2, { left: n2, width: s2 } = (0, m.getRect)(e2.setting), { left: l2, width: c2 } = (0, m.getRect)(a2), p2 = n2 - l2 + s2 / 2 - i2 / 2, u2 = this.active === this.option ? this.active.length * r2 : (this.active.length + 1) * r2;
          if ((0, m.setStyle)(o2, "height", `${u2}px`), (0, m.setStyle)(o2, "width", `${i2}px`), this.art.isRotate || m.isMobile) return;
          p2 + i2 > c2 ? ((0, m.setStyle)(o2, "left", null), (0, m.setStyle)(o2, "right", null)) : ((0, m.setStyle)(o2, "left", `${p2}px`), (0, m.setStyle)(o2, "right", "auto"));
        }
      }
      inactivate(e2) {
        for (let t2 = 0; t2 < e2.$events.length; t2++) this.art.events.remove(e2.$events[t2]);
        e2.$events.length = 0;
      }
      remove(e2) {
        let t2 = this.find(e2);
        (0, m.errorHandle)(t2, `Can't find [${e2}] in the [setting]`);
        let r2 = t2.$option.indexOf(t2);
        t2.$option.splice(r2, 1), this.inactivate(t2), t2.$item && (0, m.remove)(t2.$item), this.render();
      }
      update(e2) {
        let t2 = this.find(e2.name);
        return t2 ? (this.inactivate(t2), Object.assign(t2, e2), this.format(), this.createItem(t2, true), this.render(), t2) : this.add(e2);
      }
      add(e2, t2 = this.option) {
        return t2.push(e2), this.format(), this.createItem(e2), this.render(), e2;
      }
      createHeader(e2) {
        if (!this.cache.has(e2.$option)) return;
        let t2 = this.cache.get(e2.$option), { proxy: r2, icons: { arrowLeft: a2 }, constructor: { SETTING_ITEM_HEIGHT: o2 } } = this.art, i2 = (0, m.createElement)("div");
        (0, m.setStyle)(i2, "height", `${o2}px`), (0, m.addClass)(i2, "art-setting-item"), (0, m.addClass)(i2, "art-setting-item-back");
        let n2 = (0, m.append)(i2, '<div class="art-setting-item-left"></div>'), s2 = (0, m.createElement)("div");
        (0, m.addClass)(s2, "art-setting-item-left-icon"), (0, m.append)(s2, a2), (0, m.append)(n2, s2), (0, m.append)(n2, e2.$parent.html);
        let l2 = r2(i2, "click", () => this.render(e2.$parents));
        e2.$parent.$events.push(l2), (0, m.append)(t2, i2);
      }
      createItem(e2, t2 = false) {
        if (!this.cache.has(e2.$option)) return;
        let r2 = this.cache.get(e2.$option), a2 = e2.$item, o2 = "selector";
        (0, m.has)(e2, "switch") && (o2 = "switch"), (0, m.has)(e2, "range") && (o2 = "range"), (0, m.has)(e2, "onClick") && (o2 = "button");
        let { icons: i2, proxy: n2, constructor: s2 } = this.art, l2 = (0, m.createElement)("div");
        (0, m.addClass)(l2, "art-setting-item"), (0, m.setStyle)(l2, "height", `${s2.SETTING_ITEM_HEIGHT}px`), l2.dataset.name = e2.name || "", l2.dataset.value = e2.value || "";
        let c2 = (0, m.append)(l2, '<div class="art-setting-item-left"></div>'), p2 = (0, m.append)(l2, '<div class="art-setting-item-right"></div>'), u2 = (0, m.createElement)("div");
        switch ((0, m.addClass)(u2, "art-setting-item-left-icon"), o2) {
          case "button":
          case "switch":
          case "range":
            (0, m.append)(u2, e2.icon || i2.config);
            break;
          case "selector":
            e2.selector?.length ? (0, m.append)(u2, e2.icon || i2.config) : (0, m.append)(u2, i2.check);
        }
        (0, m.append)(c2, u2), (0, m.def)(e2, "$icon", { configurable: true, get: () => u2 }), (0, m.def)(e2, "icon", { configurable: true, get: () => u2.innerHTML, set(e3) {
          u2.innerHTML = "", (0, m.append)(u2, e3);
        } });
        let d2 = (0, m.createElement)("div");
        (0, m.addClass)(d2, "art-setting-item-left-text"), (0, m.append)(d2, e2.html || ""), (0, m.append)(c2, d2), (0, m.def)(e2, "$html", { configurable: true, get: () => d2 }), (0, m.def)(e2, "html", { configurable: true, get: () => d2.innerHTML, set(e3) {
          d2.innerHTML = "", (0, m.append)(d2, e3);
        } });
        let f2 = (0, m.createElement)("div");
        switch ((0, m.addClass)(f2, "art-setting-item-right-tooltip"), (0, m.append)(f2, e2.tooltip || ""), (0, m.append)(p2, f2), (0, m.def)(e2, "$tooltip", { configurable: true, get: () => f2 }), (0, m.def)(e2, "tooltip", { configurable: true, get: () => f2.innerHTML, set(e3) {
          f2.innerHTML = "", (0, m.append)(f2, e3);
        } }), o2) {
          case "switch": {
            let t3 = (0, m.createElement)("div");
            (0, m.addClass)(t3, "art-setting-item-right-icon");
            let r3 = (0, m.append)(t3, i2.switchOn), a3 = (0, m.append)(t3, i2.switchOff);
            (0, m.setStyle)(e2.switch ? a3 : r3, "display", "none"), (0, m.append)(p2, t3), (0, m.def)(e2, "$switch", { configurable: true, get: () => t3 });
            let o3 = e2.switch;
            (0, m.def)(e2, "switch", { configurable: true, get: () => o3, set(e3) {
              o3 = e3, e3 ? ((0, m.setStyle)(a3, "display", "none"), (0, m.setStyle)(r3, "display", null)) : ((0, m.setStyle)(a3, "display", null), (0, m.setStyle)(r3, "display", "none"));
            } });
            break;
          }
          case "range":
            {
              let t3 = (0, m.createElement)("div");
              (0, m.addClass)(t3, "art-setting-item-right-icon");
              let r3 = (0, m.append)(t3, '<input type="range">');
              r3.value = e2.range[0], r3.min = e2.range[1], r3.max = e2.range[2], r3.step = e2.range[3], (0, m.addClass)(r3, "art-setting-range"), (0, m.append)(p2, t3), (0, m.def)(e2, "$range", { configurable: true, get: () => r3 });
              let a3 = [...e2.range];
              (0, m.def)(e2, "range", { configurable: true, get: () => a3, set(e3) {
                a3 = [...e3], r3.value = e3[0], r3.min = e3[1], r3.max = e3[2], r3.step = e3[3];
              } });
            }
            break;
          case "selector":
            if (e2.selector?.length) {
              let e3 = (0, m.createElement)("div");
              (0, m.addClass)(e3, "art-setting-item-right-icon"), (0, m.append)(e3, i2.arrowRight), (0, m.append)(p2, e3);
            }
        }
        switch (o2) {
          case "switch":
            if (e2.onSwitch) {
              let t3 = n2(l2, "click", async (t4) => {
                e2.switch = await e2.onSwitch.call(this.art, e2, l2, t4);
              });
              e2.$events.push(t3);
            }
            break;
          case "range":
            if (e2.$range) {
              if (e2.onRange) {
                let t3 = n2(e2.$range, "change", async (t4) => {
                  e2.range[0] = e2.$range.valueAsNumber, e2.tooltip = await e2.onRange.call(this.art, e2, l2, t4);
                });
                e2.$events.push(t3);
              }
              if (e2.onChange) {
                let t3 = n2(e2.$range, "input", async (t4) => {
                  e2.range[0] = e2.$range.valueAsNumber, e2.tooltip = await e2.onChange.call(this.art, e2, l2, t4);
                });
                e2.$events.push(t3);
              }
            }
            break;
          case "selector":
            {
              let t3 = n2(l2, "click", async (t4) => {
                e2.selector?.length ? this.render(e2.selector) : (this.check(e2), e2.$parent.onSelect && (e2.$parent.tooltip = await e2.$parent.onSelect.call(this.art, e2, l2, t4)));
              });
              e2.$events.push(t3), e2.default && (0, m.addClass)(l2, "art-current");
            }
            break;
          case "button":
            if (e2.onClick) {
              let t3 = n2(l2, "click", async (t4) => {
                e2.tooltip = await e2.onClick.call(this.art, e2, l2, t4);
              });
              e2.$events.push(t3);
            }
        }
        (0, m.def)(e2, "$item", { configurable: true, get: () => l2 }), t2 ? (0, m.replaceElement)(l2, a2) : (0, m.append)(r2, l2), e2.mounted && setTimeout(() => e2.mounted.call(this.art, e2.$item, e2), 0);
      }
      render(e2 = this.option) {
        if (this.active = e2, this.cache.has(e2)) {
          let t2 = this.cache.get(e2);
          (0, m.inverseClass)(t2, "art-current");
        } else {
          let t2 = (0, m.createElement)("div");
          this.cache.set(e2, t2), (0, m.addClass)(t2, "art-setting-panel"), (0, m.append)(this.$parent, t2), (0, m.inverseClass)(t2, "art-current"), e2[0]?.$parent && this.createHeader(e2[0]);
          for (let t3 = 0; t3 < e2.length; t3++) this.createItem(e2[t3]);
        }
        this.resize();
      }
    }
    r.default = g;
  }, { "./flip": "7YotA", "./aspectRatio": "6Hidr", "./playbackRate": "3qrNj", "./subtitleOffset": "4G52T", "../utils/component": "j4qZZ", "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "7YotA": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { i18n: t2, icons: r2, constructor: { SETTING_ITEM_WIDTH: a2, FLIP: o2 } } = e2;
      function n2(e3) {
        return t2.get((0, i.capitalize)(e3));
      }
      function s() {
        let t3 = e2.setting.find(`flip-${e2.flip}`);
        e2.setting.check(t3);
      }
      return { width: a2, name: "flip", html: t2.get("Video Flip"), tooltip: n2(e2.flip), icon: r2.flip, selector: o2.map((t3) => ({ value: t3, name: `flip-${t3}`, default: t3 === e2.flip, html: n2(t3) })), onSelect: (t3) => (e2.flip = t3.value, t3.html), mounted: () => {
        s(), e2.on("flip", () => s());
      } };
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "6Hidr": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    function i(e2) {
      let { i18n: t2, icons: r2, constructor: { SETTING_ITEM_WIDTH: a2, ASPECT_RATIO: o2 } } = e2;
      function i2(e3) {
        return "default" === e3 ? t2.get("Default") : e3;
      }
      function n() {
        let t3 = e2.setting.find(`aspect-ratio-${e2.aspectRatio}`);
        e2.setting.check(t3);
      }
      return { width: a2, name: "aspect-ratio", html: t2.get("Aspect Ratio"), icon: r2.aspectRatio, tooltip: i2(e2.aspectRatio), selector: o2.map((t3) => ({ value: t3, name: `aspect-ratio-${t3}`, default: t3 === e2.aspectRatio, html: i2(t3) })), onSelect: (t3) => (e2.aspectRatio = t3.value, t3.html), mounted: () => {
        n(), e2.on("aspectRatio", () => n());
      } };
    }
    o.defineInteropFlag(r), o.export(r, "default", () => i);
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "3qrNj": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    function i(e2) {
      let { i18n: t2, icons: r2, constructor: { SETTING_ITEM_WIDTH: a2, PLAYBACK_RATE: o2 } } = e2;
      function i2(e3) {
        return 1 === e3 ? t2.get("Normal") : e3.toFixed(1);
      }
      function n() {
        let t3 = e2.setting.find(`playback-rate-${e2.playbackRate}`);
        e2.setting.check(t3);
      }
      return { width: a2, name: "playback-rate", html: t2.get("Play Speed"), tooltip: i2(e2.playbackRate), icon: r2.playbackRate, selector: o2.map((t3) => ({ value: t3, name: `playback-rate-${t3}`, default: t3 === e2.playbackRate, html: i2(t3) })), onSelect: (t3) => (e2.playbackRate = t3.value, t3.html), mounted: () => {
        n(), e2.on("video:ratechange", () => n());
      } };
    }
    o.defineInteropFlag(r), o.export(r, "default", () => i);
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "4G52T": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    function i(e2) {
      let { i18n: t2, icons: r2, constructor: a2 } = e2;
      return { width: a2.SETTING_ITEM_WIDTH, name: "subtitle-offset", html: t2.get("Subtitle Offset"), icon: r2.subtitle, tooltip: "0s", range: [0, -10, 10, 0.1], onChange: (t3) => (e2.subtitleOffset = t3.range[0], t3.range[0] + "s"), mounted: (t3, r3) => {
        e2.on("subtitleOffset", (e3) => {
          r3.$range.value = e3, r3.tooltip = e3 + "s";
        });
      } };
    }
    o.defineInteropFlag(r), o.export(r, "default", () => i);
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "48Pli": [function(e, t, r, a) {
    e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r), r.default = class {
      constructor() {
        this.name = "artplayer_settings", this.settings = {};
      }
      get(e2) {
        try {
          let t2 = JSON.parse(window.localStorage.getItem(this.name)) || {};
          return e2 ? t2[e2] : t2;
        } catch (t2) {
          return e2 ? this.settings[e2] : this.settings;
        }
      }
      set(e2, t2) {
        try {
          let r2 = Object.assign({}, this.get(), { [e2]: t2 });
          window.localStorage.setItem(this.name, JSON.stringify(r2));
        } catch (r2) {
          this.settings[e2] = t2;
        }
      }
      del(e2) {
        try {
          let t2 = this.get();
          delete t2[e2], window.localStorage.setItem(this.name, JSON.stringify(t2));
        } catch (t2) {
          delete this.settings[e2];
        }
      }
      clear() {
        try {
          window.localStorage.removeItem(this.name);
        } catch (e2) {
          this.settings = {};
        }
      }
    };
  }, { "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], eOOz3: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r);
    var i = e("../utils"), n = e("./miniProgressBar"), s = o.interopDefault(n), l = e("./autoOrientation"), c = o.interopDefault(l), p = e("./autoPlayback"), u = o.interopDefault(p), d = e("./fastForward"), f = o.interopDefault(d), h2 = e("./lock"), m = o.interopDefault(h2);
    r.default = class {
      constructor(e2) {
        this.art = e2, this.id = 0;
        let { option: t2 } = e2;
        t2.miniProgressBar && !t2.isLive && this.add(s.default), t2.lock && i.isMobile && this.add(m.default), t2.autoPlayback && !t2.isLive && this.add(u.default), t2.autoOrientation && i.isMobile && this.add(c.default), t2.fastForward && i.isMobile && !t2.isLive && this.add(f.default);
        for (let e3 = 0; e3 < t2.plugins.length; e3++) this.add(t2.plugins[e3]);
      }
      add(e2) {
        this.id += 1;
        let t2 = e2.call(this.art, this.art);
        return t2 instanceof Promise ? t2.then((t3) => this.next(e2, t3)) : this.next(e2, t2);
      }
      next(e2, t2) {
        let r2 = t2 && t2.name || e2.name || `plugin${this.id}`;
        return (0, i.errorHandle)(!(0, i.has)(this, r2), `Cannot add a plugin that already has the same name: ${r2}`), (0, i.def)(this, r2, { value: t2 }), this;
      }
    };
  }, { "../utils": "gpvEP", "./miniProgressBar": "bAQc0", "./autoOrientation": "31jHc", "./autoPlayback": "UojkI", "./fastForward": "k8rjo", "./lock": "ifBkM", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], bAQc0: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      return e2.on("control", (t2) => {
        t2 ? (0, i.removeClass)(e2.template.$player, "art-mini-progress-bar") : (0, i.addClass)(e2.template.$player, "art-mini-progress-bar");
      }), { name: "mini-progress-bar" };
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], "31jHc": [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { constructor: t2, template: { $player: r2, $video: a2 } } = e2;
      return e2.on("fullscreenWeb", (o2) => {
        if (o2) {
          let { videoWidth: o3, videoHeight: n2 } = a2, { clientWidth: s, clientHeight: l } = document.documentElement;
          (o3 > n2 && s < l || o3 < n2 && s > l) && setTimeout(() => {
            (0, i.setStyle)(r2, "width", `${l}px`), (0, i.setStyle)(r2, "height", `${s}px`), (0, i.setStyle)(r2, "transform-origin", "0 0"), (0, i.setStyle)(r2, "transform", `rotate(90deg) translate(0, -${s}px)`), (0, i.addClass)(r2, "art-auto-orientation"), e2.isRotate = true, e2.emit("resize");
          }, t2.AUTO_ORIENTATION_TIME);
        } else (0, i.hasClass)(r2, "art-auto-orientation") && ((0, i.removeClass)(r2, "art-auto-orientation"), e2.isRotate = false, e2.emit("resize"));
      }), e2.on("fullscreen", async (e3) => {
        if (!screen?.orientation?.lock) return;
        let t3 = screen.orientation.type;
        if (e3) {
          let { videoWidth: e4, videoHeight: o2 } = a2, { clientWidth: n2, clientHeight: s } = document.documentElement;
          if (e4 > o2 && n2 < s || e4 < o2 && n2 > s) {
            let e5 = t3.startsWith("portrait") ? "landscape" : "portrait";
            await screen.orientation.lock(e5), (0, i.addClass)(r2, "art-auto-orientation-fullscreen");
          }
        } else (0, i.hasClass)(r2, "art-auto-orientation-fullscreen") && (await screen.orientation.lock(t3), (0, i.removeClass)(r2, "art-auto-orientation-fullscreen"));
      }), { name: "autoOrientation", get state() {
        return (0, i.hasClass)(r2, "art-auto-orientation");
      } };
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], UojkI: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { i18n: t2, icons: r2, storage: a2, constructor: o2, proxy: n2, template: { $poster: s } } = e2, l = e2.layers.add({ name: "auto-playback", html: `<div class="art-auto-playback-close"></div><div class="art-auto-playback-last"></div><div class="art-auto-playback-jump"></div>` }), c = (0, i.query)(".art-auto-playback-last", l), p = (0, i.query)(".art-auto-playback-jump", l), u = (0, i.query)(".art-auto-playback-close", l);
      (0, i.append)(u, r2.close);
      let d = null;
      function f() {
        let r3 = (a2.get("times") || {})[e2.option.id || e2.option.url];
        clearTimeout(d), (0, i.setStyle)(l, "display", "none"), r3 && r3 >= o2.AUTO_PLAYBACK_MIN && ((0, i.setStyle)(l, "display", "flex"), c.innerText = `${t2.get("Last Seen")} ${(0, i.secondToTime)(r3)}`, p.innerText = t2.get("Jump Play"), n2(u, "click", () => {
          (0, i.setStyle)(l, "display", "none");
        }), n2(p, "click", () => {
          e2.seek = r3, e2.play(), (0, i.setStyle)(s, "display", "none"), (0, i.setStyle)(l, "display", "none");
        }), e2.once("video:timeupdate", () => {
          d = setTimeout(() => {
            (0, i.setStyle)(l, "display", "none");
          }, o2.AUTO_PLAYBACK_TIMEOUT);
        }));
      }
      return e2.on("video:timeupdate", () => {
        if (e2.playing) {
          let t3 = a2.get("times") || {}, r3 = Object.keys(t3);
          r3.length > o2.AUTO_PLAYBACK_MAX && delete t3[r3[0]], t3[e2.option.id || e2.option.url] = e2.currentTime, a2.set("times", t3);
        }
      }), e2.on("ready", f), e2.on("restart", f), { name: "auto-playback", get times() {
        return a2.get("times") || {};
      }, clear: () => a2.del("times"), delete(e3) {
        let t3 = a2.get("times") || {};
        return delete t3[e3], a2.set("times", t3), t3;
      } };
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], k8rjo: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { constructor: t2, proxy: r2, template: { $player: a2, $video: o2 } } = e2, n2 = null, s = false, l = 1, c = () => {
        clearTimeout(n2), s && (s = false, e2.playbackRate = l, (0, i.removeClass)(a2, "art-fast-forward"));
      };
      return r2(o2, "touchstart", (r3) => {
        1 === r3.touches.length && e2.playing && !e2.isLock && (n2 = setTimeout(() => {
          s = true, l = e2.playbackRate, e2.playbackRate = t2.FAST_FORWARD_VALUE, (0, i.addClass)(a2, "art-fast-forward");
        }, t2.FAST_FORWARD_TIME));
      }), r2(document, "touchmove", c), r2(document, "touchend", c), { name: "fastForward", get state() {
        return (0, i.hasClass)(a2, "art-fast-forward");
      } };
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }], ifBkM: [function(e, t, r, a) {
    var o = e("@parcel/transformer-js/src/esmodule-helpers.js");
    o.defineInteropFlag(r), o.export(r, "default", () => n);
    var i = e("../utils");
    function n(e2) {
      let { layers: t2, icons: r2, template: { $player: a2 } } = e2;
      function o2() {
        return (0, i.hasClass)(a2, "art-lock");
      }
      function n2() {
        (0, i.addClass)(a2, "art-lock"), e2.isLock = true, e2.emit("lock", true);
      }
      function s() {
        (0, i.removeClass)(a2, "art-lock"), e2.isLock = false, e2.emit("lock", false);
      }
      return t2.add({ name: "lock", mounted(t3) {
        let a3 = (0, i.append)(t3, r2.lock), o3 = (0, i.append)(t3, r2.unlock);
        (0, i.setStyle)(a3, "display", "none"), e2.on("lock", (e3) => {
          e3 ? ((0, i.setStyle)(a3, "display", "inline-flex"), (0, i.setStyle)(o3, "display", "none")) : ((0, i.setStyle)(a3, "display", "none"), (0, i.setStyle)(o3, "display", "inline-flex"));
        });
      }, click() {
        o2() ? s() : n2();
      } }), { name: "lock", get state() {
        return o2();
      }, set state(value) {
        value ? n2() : s();
      } };
    }
  }, { "../utils": "gpvEP", "@parcel/transformer-js/src/esmodule-helpers.js": "7o2zS" }] }, ["jz4E5"], "jz4E5", "parcelRequireb749", {});
})(artplayer, artplayer.exports);
var artplayerExports = artplayer.exports;
const Artplayer = /* @__PURE__ */ getDefaultExportFromCjs(artplayerExports);
const _sfc_main$b = {
  __name: "VideoPlayer",
  props: {
    // 视频文件信息
    video: {
      type: Object,
      required: true
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
    // 播放器主题色
    theme: {
      type: String,
      default: "#3b82f6"
    },
    // 播放器模式：'normal', 'mini', 'fullscreen'
    mode: {
      type: String,
      default: "normal"
    },
    // 是否循环播放
    loop: {
      type: Boolean,
      default: false
    },
    // 音量
    volume: {
      type: Number,
      default: 0.7
    },
    // 是否静音
    muted: {
      type: Boolean,
      default: false
    },
    // 播放速度由 Artplayer 内置功能提供，无需额外配置
    // 是否显示字幕
    showSubtitle: {
      type: Boolean,
      default: false
    },
    // 字幕文件URL
    subtitleUrl: {
      type: String,
      default: ""
    },
    // 是否显示全屏按钮
    showFullscreenControl: {
      type: Boolean,
      default: true
    },
    // 外层容器是否处于全屏状态（用于样式控制）
    isFullscreen: {
      type: Boolean,
      default: false
    },
    // 自定义控制器数组
    customControls: {
      type: Array,
      default: () => []
    },
    // 预加载策略
    preload: {
      type: String,
      default: "metadata"
      // none, metadata, auto
    }
  },
  emits: [
    // 基础播放事件
    "play",
    "pause",
    "ended",
    "timeupdate",
    "loadstart",
    "canplay",
    "error",
    "ready",
    "loaded",
    // 全屏事件
    "fullscreen",
    "fullscreenExit",
    "fullscreenWeb",
    // 音频和进度事件
    "volumechange",
    "seeked",
    "flip",
    // 视频翻转事件
    "aspectRatio",
    // 长宽比变化事件
    "pip",
    // 画中画事件
    "lock",
    // 移动端锁定事件
    "screenshot",
    // 截图事件
    "gesture"
    // 移动端手势事件
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const log2 = createLogger("VideoPlayer");
    const getExtLower = (name) => {
      const n = String(name || "");
      const idx = n.lastIndexOf(".");
      if (idx < 0) return "";
      return n.slice(idx + 1).toLowerCase();
    };
    const props = __props;
    const emit = __emit;
    const artplayerContainer = ref(null);
    const artplayerInstance = ref(null);
    const didAutoApplyDefaultSubtitle = ref(false);
    const getThemeColor = () => {
      if (props.darkMode) {
        return "#8b5cf6";
      }
      return props.theme;
    };
    const getVideoSourceKey = () => {
      const v = props.video || {};
      const url = String(v.url || "");
      const name = String(v.name || v.title || "");
      const contentType = String(v.contentType || v.mimetype || "");
      const linkType = String(v.linkType || v.originalFile?.linkType || "");
      return `${url}::${name}::${contentType}::${linkType}`;
    };
    const getEffectiveSubtitleTracks = () => {
      const rawTracks = Array.isArray(props.video?.subtitleTracks) ? props.video.subtitleTracks : [];
      if (rawTracks.length > 0) return rawTracks;
      if (props.showSubtitle && props.subtitleUrl) {
        return [{ name: "字幕", url: props.subtitleUrl, type: "srt", default: true }];
      }
      return [];
    };
    const buildSubtitleSettingPayload = (tracks) => {
      const effectiveTracks = Array.isArray(tracks) ? tracks : [];
      if (effectiveTracks.length <= 0) return null;
      const defaultTrack = effectiveTracks.find((t) => t && t.default && t.url) || effectiveTracks.find((t) => t && t.url) || null;
      const selector = [
        { default: !defaultTrack, html: "关闭字幕", url: "" },
        ...effectiveTracks.map((t) => ({
          default: !!t?.default,
          html: String(t?.name || "字幕"),
          url: String(t?.url || ""),
          type: String(t?.type || getExtLower(t?.name) || "srt")
        }))
      ];
      return {
        name: "subtitle",
        html: "字幕",
        width: 260,
        tooltip: defaultTrack?.name || "关闭字幕",
        selector,
        onSelect: function(item) {
          const art = artplayerInstance.value;
          if (!art) return item?.html;
          const nextUrl = String(item?.url || "");
          if (!nextUrl) {
            if (art.subtitle) art.subtitle.show = false;
            didAutoApplyDefaultSubtitle.value = true;
            return "关闭字幕";
          }
          if (art.subtitle) {
            art.subtitle.url = nextUrl;
            art.subtitle.show = true;
          }
          didAutoApplyDefaultSubtitle.value = true;
          return String(item?.html || "字幕");
        }
      };
    };
    const applySubtitleSettingsToInstance = () => {
      const art = artplayerInstance.value;
      if (!art) return;
      const tracks = getEffectiveSubtitleTracks();
      const payload = buildSubtitleSettingPayload(tracks);
      if (!payload) return;
      if (art.setting && typeof art.setting.update === "function" && art.__cpSubtitleInstalled) {
        art.setting.update(payload);
      } else if (art.setting && typeof art.setting.add === "function" && !art.__cpSubtitleInstalled) {
        art.setting.add(payload);
        art.__cpSubtitleInstalled = true;
      }
      const defaultTrack = tracks.find((t) => t && t.default && t.url) || tracks.find((t) => t && t.url) || null;
      if (!defaultTrack?.url) return;
      const currentUrl = String(art.subtitle?.url || "");
      if (!didAutoApplyDefaultSubtitle.value && !currentUrl) {
        if (art.subtitle) {
          art.subtitle.url = String(defaultTrack.url);
          art.subtitle.show = true;
        }
        didAutoApplyDefaultSubtitle.value = true;
      }
    };
    const shouldEnableCorsMode = (rawUrl, linkType) => {
      if (!rawUrl) return false;
      try {
        const resolvedUrl = new URL(rawUrl, window.location.href);
        if (resolvedUrl.origin === window.location.origin) {
          return true;
        }
        if (linkType === "proxy") {
          return true;
        }
        return false;
      } catch {
        return false;
      }
    };
    const initArtplayer = async () => {
      if (!artplayerContainer.value || !props.video?.url) return;
      didAutoApplyDefaultSubtitle.value = false;
      if (artplayerInstance.value) {
        if (artplayerInstance.value.streamPlayer) {
          try {
            if (artplayerInstance.value.streamPlayer.pause) {
              artplayerInstance.value.streamPlayer.pause();
            }
            if (artplayerInstance.value.streamPlayer.unload) {
              artplayerInstance.value.streamPlayer.unload();
            }
            if (artplayerInstance.value.streamPlayer.detachMediaElement) {
              artplayerInstance.value.streamPlayer.detachMediaElement();
            }
            if (artplayerInstance.value.streamPlayer.destroy) {
              artplayerInstance.value.streamPlayer.destroy();
            }
            log2.debug("流媒体播放器清理完成");
          } catch (error) {
            log2.warn("清理流媒体播放器时出错:", error);
          }
        }
        artplayerInstance.value.destroy();
        artplayerInstance.value = null;
      }
      const options = {
        container: artplayerContainer.value,
        url: props.video.url
      };
      if (props.video.name || props.video.title) {
        options.title = props.video.name || props.video.title || "视频播放";
      }
      if (props.video.poster || props.video.cover) {
        options.poster = props.video.poster || props.video.cover;
      }
      options.autoplay = props.autoplay;
      options.volume = props.volume;
      options.muted = props.muted;
      options.loop = props.loop;
      options.theme = getThemeColor();
      options.lang = "zh-cn";
      options.playbackRate = true;
      options.setting = true;
      options.settings = [];
      options.hotkey = true;
      options.pip = true;
      options.screenshot = true;
      options.miniProgressBar = true;
      options.fullscreen = props.showFullscreenControl;
      options.fullscreenWeb = props.showFullscreenControl;
      options.flip = true;
      options.aspectRatio = true;
      options.autoOrientation = true;
      options.fastForward = true;
      options.lock = true;
      options.autoPlayback = true;
      options.mutex = true;
      options.subtitleOffset = true;
      options.controls = props.customControls;
      if (props.showSubtitle && props.subtitleUrl) {
        options.subtitle = {
          url: props.subtitleUrl,
          type: "srt",
          encoding: "utf-8",
          escape: true
        };
      }
      const effectiveTracks = getEffectiveSubtitleTracks();
      let initialSubtitleSettingPayload = null;
      if (effectiveTracks.length > 0) {
        const defaultTrack = effectiveTracks.find((t) => t && t.default && t.url) || effectiveTracks.find((t) => t && t.url) || null;
        if (!options.subtitle && defaultTrack?.url) {
          options.subtitle = {
            url: defaultTrack.url,
            type: String(defaultTrack.type || getExtLower(defaultTrack.name) || "srt"),
            encoding: "utf-8",
            escape: true
          };
        }
        initialSubtitleSettingPayload = buildSubtitleSettingPayload(effectiveTracks);
        if (initialSubtitleSettingPayload) options.settings.push(initialSubtitleSettingPayload);
      }
      const effectiveLinkType = props.video?.linkType || props.video?.originalFile?.linkType || null;
      const enableCorsMode = shouldEnableCorsMode(
        props.video.url,
        effectiveLinkType
      );
      options.moreVideoAttr = enableCorsMode ? { crossOrigin: "anonymous", preload: "metadata" } : { preload: "metadata" };
      if (props.mode === "mini") {
        options.autoSize = true;
        options.controls = [];
      }
      await addStreamingSupport(options);
      try {
        artplayerInstance.value = new Artplayer(options);
        if (initialSubtitleSettingPayload) {
          artplayerInstance.value.__cpSubtitleInstalled = true;
        }
        if (artplayerInstance.value.video) {
          if (artplayerInstance.value.video.streamPlayer) {
            artplayerInstance.value.streamPlayer = artplayerInstance.value.video.streamPlayer;
            log2.debug("流媒体播放器实例已转移到Artplayer实例");
          }
        }
        bindEvents();
        applyThemeStyles();
        applySubtitleSettingsToInstance();
        emit("ready", artplayerInstance.value);
      } catch (error) {
        log2.error("Artplayer 初始化失败:", error);
        emit("error", error);
      }
    };
    const detectStreamingFormat = (url, contentType, fileName) => {
      if (url.toLowerCase().includes(".m3u8") || fileName.toLowerCase().endsWith(".m3u8") || contentType.includes("mpegurl") || contentType.includes("application/vnd.apple.mpegurl")) {
        return "m3u8";
      }
      if (url.toLowerCase().includes(".ts") || url.toLowerCase().includes(".m2ts") || contentType.includes("mp2t") || fileName.toLowerCase().endsWith(".ts") || fileName.toLowerCase().endsWith(".m2ts")) {
        return "mpegts";
      }
      if (url.toLowerCase().includes(".flv") || contentType.includes("flv") || contentType === "video/x-flv" || fileName.toLowerCase().endsWith(".flv")) {
        return "flv";
      }
      return null;
    };
    const addStreamingSupport = async (options) => {
      const videoUrl = props.video?.url || "";
      const contentType = props.video?.contentType || props.video?.mimetype || "";
      const fileName = props.video?.name || "";
      const streamingFormat = detectStreamingFormat(videoUrl, contentType, fileName);
      if (!streamingFormat) {
        log2.debug("非流媒体格式，使用默认播放器");
        return;
      }
      log2.debug(`检测到${streamingFormat.toUpperCase()}格式，正在加载相应播放器...`);
      try {
        options.customType = options.customType || {};
        if (streamingFormat === "m3u8") {
          await setupHLSPlayer(options, videoUrl);
        } else if (streamingFormat === "flv" || streamingFormat === "mpegts") {
          await setupMpegTSPlayer(options, videoUrl, streamingFormat);
        }
      } catch (error) {
        log2.error(`加载${streamingFormat}播放器失败:`, error);
        emit("error", {
          type: `${streamingFormat}_load_error`,
          message: `加载${streamingFormat.toUpperCase()}播放器失败: ${error.message}`,
          originalError: error
        });
      }
    };
    const setupHLSPlayer = async (options, videoUrl) => {
      const Hls = await __vitePreload(() => import("./hls-wRHk_9Gw.js"), true ? [] : void 0);
      if (!Hls.default.isSupported()) {
        log2.warn(" 当前浏览器不支持HLS播放");
        emit("error", {
          type: "hls_not_supported",
          message: "当前浏览器不支持HLS播放，请使用Chrome、Firefox或Edge浏览器"
        });
        return;
      }
      options.customType.m3u8 = function(video, url, art) {
        const urlTransform = typeof props.video?.hlsUrlTransform === "function" ? props.video.hlsUrlTransform : null;
        const installHlsMenus = (targetArt, hlsInstance) => {
          if (!targetArt?.setting || typeof targetArt.setting.add !== "function") return;
          const updateQuality = () => {
            const levels = Array.isArray(hlsInstance.levels) ? hlsInstance.levels : [];
            if (!levels.length) return;
            const auto = hlsInstance.currentLevel === -1 || hlsInstance.autoLevelEnabled === true;
            const selector = [
              { default: auto, html: "自动", level: -1 },
              ...levels.map((lvl, idx) => {
                const label = lvl?.height ? `${lvl.height}P` : lvl?.bitrate ? `${Math.round(lvl.bitrate / 1e3)}kbps` : `L${idx}`;
                return { default: !auto && hlsInstance.currentLevel === idx, html: label, level: idx };
              })
            ];
            const currentLabel = auto ? "自动" : selector.find((x) => x.default)?.html || "自动";
            const payload = {
              name: "hls-quality",
              html: "清晰度",
              width: 180,
              tooltip: currentLabel,
              selector,
              onSelect: function(item) {
                const level = Number(item?.level);
                if (!Number.isFinite(level)) return String(item?.html || "自动");
                if (level < 0) {
                  hlsInstance.currentLevel = -1;
                  return "自动";
                }
                hlsInstance.currentLevel = level;
                return String(item?.html || "清晰度");
              }
            };
            if (!targetArt.__cpHlsQualityInstalled) {
              targetArt.setting.add(payload);
              targetArt.__cpHlsQualityInstalled = true;
            } else if (typeof targetArt.setting.update === "function") {
              targetArt.setting.update(payload);
            }
          };
          const updateAudio = () => {
            const tracks = Array.isArray(hlsInstance.audioTracks) ? hlsInstance.audioTracks : [];
            if (tracks.length <= 1) return;
            const selector = tracks.map((tr, idx) => ({
              default: hlsInstance.audioTrack === idx,
              html: String(tr?.name || tr?.lang || `音轨 ${idx + 1}`),
              track: idx
            }));
            const currentLabel = selector.find((x) => x.default)?.html || "音轨";
            const payload = {
              name: "hls-audio",
              html: "音轨",
              width: 220,
              tooltip: currentLabel,
              selector,
              onSelect: function(item) {
                const track = Number(item?.track);
                if (!Number.isFinite(track) || track < 0) return String(item?.html || "音轨");
                hlsInstance.audioTrack = track;
                return String(item?.html || "音轨");
              }
            };
            if (!targetArt.__cpHlsAudioInstalled) {
              targetArt.setting.add(payload);
              targetArt.__cpHlsAudioInstalled = true;
            } else if (typeof targetArt.setting.update === "function") {
              targetArt.setting.update(payload);
            }
          };
          updateQuality();
          updateAudio();
          try {
            hlsInstance.on(Hls.default.Events.MANIFEST_PARSED, () => updateQuality());
            hlsInstance.on(Hls.default.Events.LEVEL_SWITCHED, () => updateQuality());
            hlsInstance.on(Hls.default.Events.AUDIO_TRACKS_UPDATED, () => updateAudio());
            hlsInstance.on(Hls.default.Events.AUDIO_TRACK_SWITCHED, () => updateAudio());
          } catch {
          }
        };
        const hlsPlayer = new Hls.default({
          debug: false,
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 30,
          maxBufferLength: 30,
          maxMaxBufferLength: 120,
          maxBufferSize: 60 * 1e3 * 1e3,
          maxBufferHole: 0.5,
          highBufferWatchdogPeriod: 2,
          nudgeOffset: 0.1,
          nudgeMaxRetry: 3,
          maxFragLookUpTolerance: 0.25,
          liveSyncDurationCount: 3,
          liveMaxLatencyDurationCount: 10,
          abrBandWidthFactor: 0.8,
          //重试配置
          fragLoadPolicy: {
            default: {
              maxTimeToFirstByteMs: 1e4,
              maxLoadTimeMs: 12e4,
              timeoutRetry: {
                maxNumRetry: 2,
                // 最多重试2次
                retryDelayMs: 1e3,
                maxRetryDelayMs: 8e3
              },
              errorRetry: {
                maxNumRetry: 1,
                // 错误重试最多1次
                retryDelayMs: 1e3,
                maxRetryDelayMs: 8e3
              }
            }
          },
          playlistLoadPolicy: {
            default: {
              maxTimeToFirstByteMs: 1e4,
              maxLoadTimeMs: 12e4,
              timeoutRetry: {
                maxNumRetry: 2,
                retryDelayMs: 1e3,
                maxRetryDelayMs: 8e3
              },
              errorRetry: {
                maxNumRetry: 1,
                retryDelayMs: 1e3,
                maxRetryDelayMs: 8e3
              }
            }
          },
          // 用自定义 loader 在加载前“改 URL”
          ...urlTransform ? {
            pLoader: class extends Hls.default.DefaultConfig.loader {
              constructor(config2) {
                super(config2);
                const originalLoad = this.load.bind(this);
                this.load = function(context, config3, callbacks) {
                  urlTransform(context.url, true).then((nextUrl) => {
                    const finalUrl = nextUrl || context.url;
                    const complete = callbacks.onSuccess;
                    callbacks.onSuccess = (loaderResponse, stats, successContext, networkDetails) => {
                      loaderResponse.url = finalUrl;
                      complete(loaderResponse, stats, successContext, networkDetails);
                    };
                    originalLoad({ ...context, url: finalUrl }, config3, callbacks);
                  }).catch(() => originalLoad(context, config3, callbacks));
                };
              }
            },
            fLoader: class extends Hls.default.DefaultConfig.loader {
              constructor(config2) {
                super(config2);
                const originalLoad = this.load.bind(this);
                this.load = function(context, config3, callbacks) {
                  urlTransform(context.url, false).then((nextUrl) => {
                    const finalUrl = nextUrl || context.url;
                    const complete = callbacks.onSuccess;
                    callbacks.onSuccess = (loaderResponse, stats, successContext, networkDetails) => {
                      loaderResponse.url = finalUrl;
                      complete(loaderResponse, stats, successContext, networkDetails);
                    };
                    originalLoad(
                      { ...context, frag: { ...context.frag || {}, relurl: finalUrl, _url: finalUrl }, url: finalUrl },
                      config3,
                      callbacks
                    );
                  }).catch(() => originalLoad(context, config3, callbacks));
                };
              }
            }
          } : {},
          // 兜底：禁用凭据传递
          xhrSetup: function(xhr) {
            xhr.withCredentials = false;
          }
        });
        hlsPlayer.on(Hls.default.Events.ERROR, (event, data) => {
          let errorMessage = "HLS播放出现错误";
          if (data.fatal) {
            switch (data.type) {
              case Hls.default.ErrorTypes.NETWORK_ERROR:
                errorMessage = "网络错误，HLS.js将自动重试";
                break;
              case Hls.default.ErrorTypes.MEDIA_ERROR:
                errorMessage = "媒体解码错误，HLS.js将自动恢复";
                break;
              default:
                errorMessage = `HLS播放错误: ${data.details || "未知错误"}`;
                log2.error("HLS致命错误，销毁播放器:", data.details);
                hlsPlayer.destroy();
                break;
            }
            emit("error", {
              type: "hls_error",
              errorType: data.type,
              errorDetail: data,
              message: errorMessage
            });
          }
        });
        hlsPlayer.loadSource(url);
        hlsPlayer.attachMedia(video);
        if (!video.src) {
          try {
            video.src = url;
          } catch {
          }
        }
        video.streamPlayer = hlsPlayer;
        if (art) {
          art.hls = hlsPlayer;
          try {
            art.on("destroy", () => hlsPlayer.destroy());
          } catch {
          }
          installHlsMenus(art, hlsPlayer);
        }
        log2.debug("HLS播放器初始化完成");
      };
      options.type = "m3u8";
    };
    const setupMpegTSPlayer = async (options, videoUrl, format) => {
      log2.debug(`正在加载 mpegts.js 用于 ${format.toUpperCase()} 播放...`);
      const mpegts = await __vitePreload(() => import("./mpegts-CqRKED0F.js").then((n) => n.m), true ? __vite__mapDeps([0,1]) : void 0);
      if (!mpegts.isSupported?.()) {
        log2.warn("当前浏览器不支持MPEG-TS/FLV播放");
        emit("error", {
          type: `${format}_not_supported`,
          message: `当前浏览器不支持${format.toUpperCase()}播放，请使用Chrome、Firefox或Edge浏览器`
        });
        return;
      }
      log2.debug(`mpegts.js加载成功，配置${format.toUpperCase()}播放器...`);
      options.customType[format] = function(video, url) {
        log2.debug(`初始化${format.toUpperCase()}播放器，URL:`, url);
        const inferredTsType = format === "flv" ? "flv" : url.toLowerCase().includes(".m2ts") || (props.video?.name || "").toLowerCase().endsWith(".m2ts") ? "m2ts" : "mpegts";
        const playerConfig = {
          type: inferredTsType,
          isLive: false,
          cors: true,
          withCredentials: false,
          url
        };
        const mediaConfig = {
          accurateSeek: true,
          seekType: "range",
          lazyLoadMaxDuration: 5 * 60,
          reuseRedirectedURL: true
        };
        const streamPlayer = mpegts.createPlayer(playerConfig, mediaConfig);
        streamPlayer.on(mpegts.Events.ERROR, (errorType, errorDetail) => {
          log2.error(`${format.toUpperCase()}播放错误:`, errorType, errorDetail);
          let errorMessage = `${format.toUpperCase()}播放出现错误`;
          switch (errorType) {
            case mpegts.ErrorTypes.NETWORK_ERROR:
              errorMessage = `网络错误，无法加载${format.toUpperCase()}视频`;
              break;
            case mpegts.ErrorTypes.MEDIA_ERROR:
              errorMessage = `媒体解码错误，${format.toUpperCase()}格式可能不兼容`;
              break;
            case mpegts.ErrorTypes.OTHER_ERROR:
              errorMessage = `加载错误，无法获取${format.toUpperCase()}视频数据`;
              break;
            default:
              errorMessage = `${format.toUpperCase()}播放错误: ${errorDetail?.info || "未知错误"}`;
          }
          emit("error", {
            type: `${format}_error`,
            errorType,
            errorDetail,
            message: errorMessage
          });
        });
        streamPlayer.on(mpegts.Events.LOADING_COMPLETE, () => {
          log2.debug(`${format.toUpperCase()}加载完成`);
        });
        streamPlayer.on(mpegts.Events.RECOVERED_EARLY_EOF, () => {
          log2.debug(`${format.toUpperCase()}早期EOF恢复`);
        });
        streamPlayer.on(mpegts.Events.MEDIA_INFO, (mediaInfo) => {
          log2.debug(`${format.toUpperCase()}媒体信息:`, mediaInfo);
        });
        streamPlayer.attachMediaElement(video);
        streamPlayer.load();
        video.streamPlayer = streamPlayer;
        log2.debug(`${format.toUpperCase()}播放器初始化完成`);
      };
      options.type = format;
      log2.debug(`${format.toUpperCase()}支持配置完成`);
    };
    const bindEvents = () => {
      if (!artplayerInstance.value) return;
      const art = artplayerInstance.value;
      art.on("play", () => {
        emit("play", {
          video: props.video,
          currentTime: art.currentTime,
          duration: art.duration
        });
      });
      art.on("pause", () => {
        emit("pause", {
          video: props.video,
          currentTime: art.currentTime,
          duration: art.duration
        });
      });
      art.on("ended", () => {
        emit("ended", {
          video: props.video,
          currentTime: art.currentTime,
          duration: art.duration
        });
      });
      art.on("timeupdate", () => {
        emit("timeupdate", {
          currentTime: art.currentTime,
          duration: art.duration,
          percentage: art.duration > 0 ? art.currentTime / art.duration * 100 : 0
        });
      });
      art.on("loadstart", () => {
        emit("loadstart");
      });
      art.on("canplay", () => {
        emit("canplay");
      });
      art.on("error", (error) => {
        log2.error("Artplayer 播放错误:", error);
        emit("error", error);
      });
      art.on("fullscreen", (state) => {
        if (state) {
          emit("fullscreen");
        } else {
          emit("fullscreenExit");
        }
      });
      art.on("volumechange", () => {
        emit("volumechange", {
          volume: art.volume,
          muted: art.muted
        });
      });
      art.on("seeked", () => {
        emit("seeked", {
          currentTime: art.currentTime,
          duration: art.duration
        });
      });
      art.on("flip", (flip) => {
        emit("flip", flip);
      });
      art.on("aspectRatio", (ratio) => {
        emit("aspectRatio", ratio);
      });
      art.on("pip", (state) => {
        emit("pip", state);
      });
      art.on("lock", (state) => {
        emit("lock", state);
      });
      art.on("screenshot", (dataUri) => {
        emit("screenshot", dataUri);
      });
      art.on("gesture", (event) => {
        emit("gesture", event);
      });
      art.on("fullscreenWeb", (state) => {
        emit("fullscreenWeb", state);
      });
    };
    const applyThemeStyles = () => {
      if (!artplayerContainer.value) return;
      nextTick(() => {
        const artplayerElement = artplayerContainer.value.querySelector(".art-video-player");
        if (!artplayerElement) return;
        const themeColor = getThemeColor();
        artplayerElement.style.setProperty("--art-theme", themeColor);
        if (props.darkMode) {
          artplayerContainer.value.classList.add("dark-theme");
        } else {
          artplayerContainer.value.classList.remove("dark-theme");
        }
      });
    };
    const play = () => {
      if (artplayerInstance.value) {
        artplayerInstance.value.play();
      }
    };
    const pause = () => {
      if (artplayerInstance.value) {
        artplayerInstance.value.pause();
      }
    };
    const toggle = () => {
      if (artplayerInstance.value) {
        artplayerInstance.value.toggle();
      }
    };
    const seek = (time) => {
      if (artplayerInstance.value) {
        artplayerInstance.value.seek = time;
      }
    };
    const setVolume = (volume) => {
      if (artplayerInstance.value) {
        artplayerInstance.value.volume = volume;
      }
    };
    const setMuted = (muted) => {
      if (artplayerInstance.value) {
        artplayerInstance.value.muted = muted;
      }
    };
    const setPlaybackRate = (rate) => {
      if (artplayerInstance.value) {
        artplayerInstance.value.playbackRate = rate;
      }
    };
    const enterFullscreen = () => {
      if (artplayerInstance.value) {
        artplayerInstance.value.fullscreen = true;
      }
    };
    const exitFullscreen = () => {
      if (artplayerInstance.value) {
        artplayerInstance.value.fullscreen = false;
      }
    };
    const screenshot = async (filename) => {
      if (artplayerInstance.value) {
        try {
          artplayerInstance.value.screenshot(filename || `video-screenshot-${Date.now()}`);
          return true;
        } catch (error) {
          log2.error("截图失败:", error);
          return false;
        }
      }
      return false;
    };
    const getScreenshotDataURL = async () => {
      if (artplayerInstance.value) {
        try {
          return await artplayerInstance.value.getDataURL();
        } catch (error) {
          log2.error("获取截图 DataURL 失败:", error);
          return null;
        }
      }
      return null;
    };
    const getScreenshotBlobUrl = async () => {
      if (artplayerInstance.value) {
        try {
          return await artplayerInstance.value.getBlobUrl();
        } catch (error) {
          log2.error("获取截图 BlobUrl 失败:", error);
          return null;
        }
      }
      return null;
    };
    const setFlip = (flipType) => {
      if (artplayerInstance.value) {
        artplayerInstance.value.flip = flipType;
      }
    };
    const getFlip = () => {
      if (artplayerInstance.value) {
        return artplayerInstance.value.flip;
      }
      return "normal";
    };
    const setAspectRatio = (ratio) => {
      if (artplayerInstance.value) {
        artplayerInstance.value.aspectRatio = ratio;
      }
    };
    const getAspectRatio = () => {
      if (artplayerInstance.value) {
        return artplayerInstance.value.aspectRatio;
      }
      return "default";
    };
    const setLock = (locked) => {
      if (artplayerInstance.value) {
        artplayerInstance.value.lock = locked;
      }
    };
    const getLock = () => {
      if (artplayerInstance.value) {
        return artplayerInstance.value.lock;
      }
      return false;
    };
    const enterPip = () => {
      if (artplayerInstance.value) {
        artplayerInstance.value.pip = true;
      }
    };
    const exitPip = () => {
      if (artplayerInstance.value) {
        artplayerInstance.value.pip = false;
      }
    };
    __expose({
      play,
      pause,
      toggle,
      seek,
      setVolume,
      setMuted,
      setPlaybackRate,
      enterFullscreen,
      exitFullscreen,
      screenshot,
      getScreenshotDataURL,
      getScreenshotBlobUrl,
      setFlip,
      getFlip,
      setAspectRatio,
      getAspectRatio,
      setLock,
      getLock,
      enterPip,
      exitPip,
      getInstance: () => artplayerInstance.value
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
        if (artplayerInstance.value) {
          artplayerInstance.value.theme = getThemeColor();
        }
        applyThemeStyles();
      }
    );
    watch(
      () => getVideoSourceKey(),
      () => {
        initArtplayer();
      }
    );
    watch(
      () => props.volume,
      (newVolume) => {
        setVolume(newVolume);
      }
    );
    watch(
      () => props.muted,
      (newMuted) => {
        setMuted(newMuted);
      }
    );
    watch(
      () => props.loop,
      (val) => {
        const art = artplayerInstance.value;
        if (!art) return;
        try {
          art.loop = !!val;
        } catch {
          initArtplayer();
        }
      }
    );
    watch(
      () => {
        const tracks = getEffectiveSubtitleTracks();
        const key = tracks.map((t) => `${String(t?.url || "")}:${t?.default ? 1 : 0}:${String(t?.type || "")}`).join("|");
        return `${props.showSubtitle ? 1 : 0}::${String(props.subtitleUrl || "")}::${key}`;
      },
      () => {
        applySubtitleSettingsToInstance();
      }
    );
    onMounted(() => {
      nextTick(() => {
        initArtplayer();
      });
    });
    onBeforeUnmount(() => {
      if (artplayerInstance.value) {
        if (artplayerInstance.value.streamPlayer) {
          try {
            log2.debug("清理流媒体播放器实例...");
            if (artplayerInstance.value.streamPlayer.pause) {
              artplayerInstance.value.streamPlayer.pause();
            }
            if (artplayerInstance.value.streamPlayer.unload) {
              artplayerInstance.value.streamPlayer.unload();
            }
            if (artplayerInstance.value.streamPlayer.detachMediaElement) {
              artplayerInstance.value.streamPlayer.detachMediaElement();
            }
            if (artplayerInstance.value.streamPlayer.destroy) {
              artplayerInstance.value.streamPlayer.destroy();
            }
            log2.debug("流媒体播放器清理完成");
          } catch (error) {
            log2.warn("清理流媒体播放器时出错:", error);
          }
        }
        artplayerInstance.value.destroy();
        artplayerInstance.value = null;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["video-player-container", { "dark-theme": __props.darkMode, "is-fullscreen": __props.isFullscreen }])
      }, [
        createBaseVNode("div", {
          ref_key: "artplayerContainer",
          ref: artplayerContainer,
          class: "artplayer-container"
        }, null, 512)
      ], 2);
    };
  }
};
const VideoPlayer = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-da9a6995"]]);
const STORAGE_KEY = "cloudpaste-epub-progress";
const MAX_BOOKS = 30;
const SAVE_DEBOUNCE_MS = 1e3;
const log = createLogger("EpubProgress");
const storedAllProgress = useLocalStorage(STORAGE_KEY, {});
function loadAllProgress() {
  try {
    return storedAllProgress.value || {};
  } catch (e) {
    log.warn("[EpubProgress] 加载进度数据失败:", e);
    return {};
  }
}
function saveAllProgress(data) {
  try {
    const entries = Object.entries(data);
    if (entries.length > MAX_BOOKS) {
      entries.sort((a, b) => (b[1].lastReadTime || 0) - (a[1].lastReadTime || 0));
      data = Object.fromEntries(entries.slice(0, MAX_BOOKS));
    }
    storedAllProgress.value = data;
    return true;
  } catch (e) {
    log.warn("[EpubProgress] 保存进度数据失败:", e);
    return false;
  }
}
function generateBookId(url, title = "", author = "") {
  if (url) {
    try {
      const urlObj = new URL(url, window.location.origin);
      const pathname = urlObj.pathname;
      const filename = pathname.split("/").pop() || pathname;
      if (filename) {
        return `url:${filename}`;
      }
    } catch {
      return `url:${btoa(url).slice(0, 32)}`;
    }
  }
  if (title) {
    const id = `${title}-${author}`.replace(/\s+/g, "-").toLowerCase();
    return `meta:${id}`;
  }
  return `unknown:${Date.now()}`;
}
function useEpubProgress(bookId) {
  const currentCfi = ref("");
  const currentFraction = ref(0);
  const bookmarks = ref([]);
  const isLoaded = ref(false);
  const saveProgressDebounced = useDebounceFn(() => {
    const allData = loadAllProgress();
    allData[bookId] = {
      cfi: currentCfi.value,
      fraction: currentFraction.value,
      lastReadTime: Date.now(),
      bookmarks: bookmarks.value
    };
    saveAllProgress(allData);
  }, SAVE_DEBOUNCE_MS);
  function loadProgress() {
    if (!bookId) return null;
    const allData = loadAllProgress();
    const bookData = allData[bookId];
    if (bookData) {
      currentCfi.value = bookData.cfi || "";
      currentFraction.value = bookData.fraction || 0;
      bookmarks.value = Array.isArray(bookData.bookmarks) ? bookData.bookmarks : [];
      isLoaded.value = true;
      return bookData;
    }
    isLoaded.value = true;
    return null;
  }
  function saveProgress(cfi, fraction) {
    if (!bookId) return;
    currentCfi.value = cfi || currentCfi.value;
    currentFraction.value = fraction ?? currentFraction.value;
    saveProgressDebounced();
  }
  function saveProgressImmediate() {
    if (!bookId) return;
    saveProgressDebounced.cancel?.();
    const allData = loadAllProgress();
    allData[bookId] = {
      cfi: currentCfi.value,
      fraction: currentFraction.value,
      lastReadTime: Date.now(),
      bookmarks: bookmarks.value
    };
    saveAllProgress(allData);
  }
  function addBookmark(cfi, title = "", excerpt = "") {
    if (!cfi) return false;
    const exists = bookmarks.value.some((b) => b.cfi === cfi);
    if (exists) return false;
    bookmarks.value.push({
      cfi,
      title: title || `书签 ${bookmarks.value.length + 1}`,
      excerpt: excerpt || "",
      createdAt: Date.now()
    });
    saveProgressImmediate();
    return true;
  }
  function removeBookmark(cfi) {
    const index2 = bookmarks.value.findIndex((b) => b.cfi === cfi);
    if (index2 === -1) return false;
    bookmarks.value.splice(index2, 1);
    saveProgressImmediate();
    return true;
  }
  function hasBookmark(cfi) {
    if (!cfi) return false;
    return bookmarks.value.some((b) => b.cfi === cfi);
  }
  function clearProgress() {
    if (!bookId) return;
    currentCfi.value = "";
    currentFraction.value = 0;
    bookmarks.value = [];
    const allData = loadAllProgress();
    delete allData[bookId];
    saveAllProgress(allData);
  }
  onBeforeUnmount(() => {
    saveProgressDebounced.cancel?.();
    saveProgressImmediate();
  });
  return {
    // 状态
    currentCfi,
    currentFraction,
    bookmarks,
    isLoaded,
    // 方法
    loadProgress,
    saveProgress,
    saveProgressImmediate,
    addBookmark,
    removeBookmark,
    hasBookmark,
    clearProgress
  };
}
function useReadingHistory(maxSize = 50) {
  const history = ref([]);
  const currentIndex = ref(-1);
  function push(cfi, title = "") {
    if (!cfi) return;
    if (currentIndex.value < history.value.length - 1) {
      history.value = history.value.slice(0, currentIndex.value + 1);
    }
    const last = history.value[history.value.length - 1];
    if (last?.cfi === cfi) return;
    history.value.push({ cfi, title, timestamp: Date.now() });
    if (history.value.length > maxSize) {
      history.value.shift();
    } else {
      currentIndex.value = history.value.length - 1;
    }
  }
  const canGoBack = computed(() => currentIndex.value > 0);
  const canGoForward = computed(() => currentIndex.value < history.value.length - 1);
  function goBack() {
    if (!canGoBack.value) return null;
    currentIndex.value--;
    return history.value[currentIndex.value];
  }
  function goForward() {
    if (!canGoForward.value) return null;
    currentIndex.value++;
    return history.value[currentIndex.value];
  }
  function clear() {
    history.value = [];
    currentIndex.value = -1;
  }
  return {
    history,
    currentIndex,
    canGoBack,
    canGoForward,
    push,
    goBack,
    goForward,
    clear
  };
}
const findIndices = (arr, f) => arr.map((x, i, a) => f(x, i, a) ? i : null).filter((x) => x != null);
const splitAt = (arr, is) => [-1, ...is, arr.length].reduce(({ xs, a }, b) => ({ xs: xs?.concat([arr.slice(a + 1, b)]) ?? [], a: b }), {}).xs;
const concatArrays = (a, b) => a.slice(0, -1).concat([a[a.length - 1].concat(b[0])]).concat(b.slice(1));
const isNumber = /\d/;
const isCFI = /^epubcfi\((.*)\)$/;
const escapeCFI = (str) => str.replace(/[\^[\](),;=]/g, "^$&");
const wrap = (x) => isCFI.test(x) ? x : `epubcfi(${x})`;
const unwrap = (x) => x.match(isCFI)?.[1] ?? x;
const lift = (f) => (...xs) => `epubcfi(${f(...xs.map((x) => x.match(isCFI)?.[1] ?? x))})`;
const joinIndir = lift((...xs) => xs.join("!"));
const tokenizer = (str) => {
  const tokens = [];
  let state, escape, value = "";
  const push = (x) => (tokens.push(x), state = null, value = "");
  const cat = (x) => (value += x, escape = false);
  for (const char of Array.from(str.trim()).concat("")) {
    if (char === "^" && !escape) {
      escape = true;
      continue;
    }
    if (state === "!") push(["!"]);
    else if (state === ",") push([","]);
    else if (state === "/" || state === ":") {
      if (isNumber.test(char)) {
        cat(char);
        continue;
      } else push([state, parseInt(value)]);
    } else if (state === "~") {
      if (isNumber.test(char) || char === ".") {
        cat(char);
        continue;
      } else push(["~", parseFloat(value)]);
    } else if (state === "@") {
      if (char === ":") {
        push(["@", parseFloat(value)]);
        state = "@";
        continue;
      }
      if (isNumber.test(char) || char === ".") {
        cat(char);
        continue;
      } else push(["@", parseFloat(value)]);
    } else if (state === "[") {
      if (char === ";" && !escape) {
        push(["[", value]);
        state = ";";
      } else if (char === "," && !escape) {
        push(["[", value]);
        state = "[";
      } else if (char === "]" && !escape) push(["[", value]);
      else cat(char);
      continue;
    } else if (state?.startsWith(";")) {
      if (char === "=" && !escape) {
        state = `;${value}`;
        value = "";
      } else if (char === ";" && !escape) {
        push([state, value]);
        state = ";";
      } else if (char === "]" && !escape) push([state, value]);
      else cat(char);
      continue;
    }
    if (char === "/" || char === ":" || char === "~" || char === "@" || char === "[" || char === "!" || char === ",") state = char;
  }
  return tokens;
};
const findTokens = (tokens, x) => findIndices(tokens, ([t]) => t === x);
const parser = (tokens) => {
  const parts = [];
  let state;
  for (const [type, val] of tokens) {
    if (type === "/") parts.push({ index: val });
    else {
      const last = parts[parts.length - 1];
      if (type === ":") last.offset = val;
      else if (type === "~") last.temporal = val;
      else if (type === "@") last.spatial = (last.spatial ?? []).concat(val);
      else if (type === ";s") last.side = val;
      else if (type === "[") {
        if (state === "/" && val) last.id = val;
        else {
          last.text = (last.text ?? []).concat(val);
          continue;
        }
      }
    }
    state = type;
  }
  return parts;
};
const parserIndir = (tokens) => splitAt(tokens, findTokens(tokens, "!")).map(parser);
const parse = (cfi) => {
  const tokens = tokenizer(unwrap(cfi));
  const commas = findTokens(tokens, ",");
  if (!commas.length) return parserIndir(tokens);
  const [parent, start, end] = splitAt(tokens, commas).map(parserIndir);
  return { parent, start, end };
};
const partToString = ({ index: index2, id, offset, temporal, spatial, text, side }) => {
  const param = side ? `;s=${side}` : "";
  return `/${index2}` + (id ? `[${escapeCFI(id)}${param}]` : "") + (offset != null && index2 % 2 ? `:${offset}` : "") + (temporal ? `~${temporal}` : "") + (spatial ? `@${spatial.join(":")}` : "") + (text || !id && side ? "[" + (text?.map(escapeCFI)?.join(",") ?? "") + param + "]" : "");
};
const toInnerString = (parsed) => parsed.parent ? [parsed.parent, parsed.start, parsed.end].map(toInnerString).join(",") : parsed.map((parts) => parts.map(partToString).join("")).join("!");
const toString = (parsed) => wrap(toInnerString(parsed));
const collapse = (x, toEnd) => typeof x === "string" ? toString(collapse(parse(x), toEnd)) : x.parent ? concatArrays(x.parent, x[toEnd ? "end" : "start"]) : x;
const buildRange = (from, to) => {
  if (typeof from === "string") from = parse(from);
  if (typeof to === "string") to = parse(to);
  from = collapse(from);
  to = collapse(to, true);
  const localFrom = from[from.length - 1], localTo = to[to.length - 1];
  const localParent = [], localStart = [], localEnd = [];
  let pushToParent = true;
  const len = Math.max(localFrom.length, localTo.length);
  for (let i = 0; i < len; i++) {
    const a = localFrom[i], b = localTo[i];
    pushToParent &&= a?.index === b?.index && !a?.offset && !b?.offset;
    if (pushToParent) localParent.push(a);
    else {
      if (a) localStart.push(a);
      if (b) localEnd.push(b);
    }
  }
  const parent = from.slice(0, -1).concat([localParent]);
  return toString({ parent, start: [localStart], end: [localEnd] });
};
const isTextNode = ({ nodeType }) => nodeType === 3 || nodeType === 4;
const isElementNode = ({ nodeType }) => nodeType === 1;
const getChildNodes = (node, filter2) => {
  const nodes = Array.from(node.childNodes).filter((node2) => isTextNode(node2) || isElementNode(node2));
  return filter2 ? nodes.map((node2) => {
    const accept = filter2(node2);
    if (accept === NodeFilter.FILTER_REJECT) return null;
    else if (accept === NodeFilter.FILTER_SKIP) return getChildNodes(node2, filter2);
    else return node2;
  }).flat().filter((x) => x) : nodes;
};
const indexChildNodes = (node, filter2) => {
  const nodes = getChildNodes(node, filter2).reduce((arr, node2) => {
    let last = arr[arr.length - 1];
    if (!last) arr.push(node2);
    else if (isTextNode(node2)) {
      if (Array.isArray(last)) last.push(node2);
      else if (isTextNode(last)) arr[arr.length - 1] = [last, node2];
      else arr.push(node2);
    } else {
      if (isElementNode(last)) arr.push(null, node2);
      else arr.push(node2);
    }
    return arr;
  }, []);
  if (isElementNode(nodes[0])) nodes.unshift("first");
  if (isElementNode(nodes[nodes.length - 1])) nodes.push("last");
  nodes.unshift("before");
  nodes.push("after");
  return nodes;
};
const partsToNode = (node, parts, filter2) => {
  const { id } = parts[parts.length - 1];
  if (id) {
    const el = node.ownerDocument.getElementById(id);
    if (el) return { node: el, offset: 0 };
  }
  for (const { index: index2 } of parts) {
    const newNode = node ? indexChildNodes(node, filter2)[index2] : null;
    if (newNode === "first") return { node: node.firstChild ?? node };
    if (newNode === "last") return { node: node.lastChild ?? node };
    if (newNode === "before") return { node, before: true };
    if (newNode === "after") return { node, after: true };
    node = newNode;
  }
  const { offset } = parts[parts.length - 1];
  if (!Array.isArray(node)) return { node, offset };
  let sum = 0;
  for (const n of node) {
    const { length } = n.nodeValue;
    if (sum + length >= offset) return { node: n, offset: offset - sum };
    sum += length;
  }
};
const nodeToParts = (node, offset, filter2) => {
  const { parentNode, id } = node;
  const indexed = indexChildNodes(parentNode, filter2);
  const index2 = indexed.findIndex((x) => Array.isArray(x) ? x.some((x2) => x2 === node) : x === node);
  const chunk = indexed[index2];
  if (Array.isArray(chunk)) {
    let sum = 0;
    for (const x of chunk) {
      if (x === node) {
        sum += offset;
        break;
      } else sum += x.nodeValue.length;
    }
    offset = sum;
  }
  const part = { id, index: index2, offset };
  return (parentNode !== node.ownerDocument.documentElement ? nodeToParts(parentNode, null, filter2).concat(part) : [part]).filter((x) => x.index !== -1);
};
const fromRange = (range, filter2) => {
  const { startContainer, startOffset, endContainer, endOffset } = range;
  const start = nodeToParts(startContainer, startOffset, filter2);
  if (range.collapsed) return toString([start]);
  const end = nodeToParts(endContainer, endOffset, filter2);
  return buildRange([start], [end]);
};
const toRange = (doc, parts, filter2) => {
  const startParts = collapse(parts);
  const endParts = collapse(parts, true);
  const root = doc.documentElement;
  const start = partsToNode(root, startParts[0], filter2);
  const end = partsToNode(root, endParts[0], filter2);
  const range = doc.createRange();
  if (start.before) range.setStartBefore(start.node);
  else if (start.after) range.setStartAfter(start.node);
  else range.setStart(start.node, start.offset);
  if (end.before) range.setEndBefore(end.node);
  else if (end.after) range.setEndAfter(end.node);
  else range.setEnd(end.node, end.offset);
  return range;
};
const fromElements = (elements) => {
  const results = [];
  const { parentNode } = elements[0];
  const parts = nodeToParts(parentNode);
  for (const [index2, node] of indexChildNodes(parentNode).entries()) {
    const el = elements[results.length];
    if (node === el)
      results.push(toString([parts.concat({ id: el.id, index: index2 })]));
  }
  return results;
};
const toElement = (doc, parts) => partsToNode(doc.documentElement, collapse(parts)).node;
const fake = {
  fromIndex: (index2) => wrap(`/6/${(index2 + 1) * 2}`),
  toIndex: (parts) => parts?.at(-1).index / 2 - 1
};
const assignIDs = (toc) => {
  let id = 0;
  const assignID = (item) => {
    item.id = id++;
    if (item.subitems) for (const subitem of item.subitems) assignID(subitem);
  };
  for (const item of toc) assignID(item);
  return toc;
};
const flatten = (items) => items.map((item) => item.subitems?.length ? [item, flatten(item.subitems)].flat() : item).flat();
class TOCProgress {
  async init({ toc, ids, splitHref, getFragment }) {
    assignIDs(toc);
    const items = flatten(toc);
    const grouped = /* @__PURE__ */ new Map();
    for (const [i, item] of items.entries()) {
      const [id, fragment] = await splitHref(item?.href) ?? [];
      const value = { fragment, item };
      if (grouped.has(id)) grouped.get(id).items.push(value);
      else grouped.set(id, { prev: items[i - 1], items: [value] });
    }
    const map = /* @__PURE__ */ new Map();
    for (const [i, id] of ids.entries()) {
      if (grouped.has(id)) map.set(id, grouped.get(id));
      else map.set(id, map.get(ids[i - 1]));
    }
    this.ids = ids;
    this.map = map;
    this.getFragment = getFragment;
  }
  getProgress(index2, range) {
    if (!this.ids) return;
    const id = this.ids[index2];
    const obj = this.map.get(id);
    if (!obj) return null;
    const { prev, items } = obj;
    if (!items) return prev;
    if (!range || items.length === 1 && !items[0].fragment) return items[0].item;
    const doc = range.startContainer.getRootNode();
    for (const [i, { fragment }] of items.entries()) {
      const el = this.getFragment(doc, fragment);
      if (!el) continue;
      if (range.comparePoint(el, 0) > 0)
        return items[i - 1]?.item ?? prev;
    }
    return items[items.length - 1].item;
  }
}
class SectionProgress {
  constructor(sections, sizePerLoc, sizePerTimeUnit) {
    this.sizes = sections.map((s) => s.linear != "no" && s.size > 0 ? s.size : 0);
    this.sizePerLoc = sizePerLoc;
    this.sizePerTimeUnit = sizePerTimeUnit;
    this.sizeTotal = this.sizes.reduce((a, b) => a + b, 0);
    this.sectionFractions = this.#getSectionFractions();
  }
  #getSectionFractions() {
    const { sizeTotal } = this;
    const results = [0];
    let sum = 0;
    for (const size of this.sizes) results.push((sum += size) / sizeTotal);
    return results;
  }
  // get progress given index of and fractions within a section
  getProgress(index2, fractionInSection, pageFraction = 0) {
    const { sizes, sizePerLoc, sizePerTimeUnit, sizeTotal } = this;
    const sizeInSection = sizes[index2] ?? 0;
    const sizeBefore = sizes.slice(0, index2).reduce((a, b) => a + b, 0);
    const size = sizeBefore + fractionInSection * sizeInSection;
    const nextSize = size + pageFraction * sizeInSection;
    const remainingTotal = sizeTotal - size;
    const remainingSection = (1 - fractionInSection) * sizeInSection;
    return {
      fraction: nextSize / sizeTotal,
      section: {
        current: index2,
        total: sizes.length
      },
      location: {
        current: Math.floor(size / sizePerLoc),
        next: Math.floor(nextSize / sizePerLoc),
        total: Math.ceil(sizeTotal / sizePerLoc)
      },
      time: {
        section: remainingSection / sizePerTimeUnit,
        total: remainingTotal / sizePerTimeUnit
      }
    };
  }
  // the inverse of `getProgress`
  // get index of and fraction in section based on total fraction
  getSection(fraction) {
    if (fraction <= 0) return [0, 0];
    if (fraction >= 1) return [this.sizes.length - 1, 1];
    fraction = fraction + Number.EPSILON;
    const { sizeTotal } = this;
    let index2 = this.sectionFractions.findIndex((x) => x > fraction) - 1;
    if (index2 < 0) return [0, 0];
    while (!this.sizes[index2]) index2++;
    const fractionInSection = (fraction - this.sectionFractions[index2]) / (this.sizes[index2] / sizeTotal);
    return [index2, fractionInSection];
  }
}
const createSVGElement = (tag) => document.createElementNS("http://www.w3.org/2000/svg", tag);
class Overlayer {
  #svg = createSVGElement("svg");
  #map = /* @__PURE__ */ new Map();
  constructor() {
    Object.assign(this.#svg.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none"
    });
  }
  get element() {
    return this.#svg;
  }
  add(key, range, draw, options) {
    if (this.#map.has(key)) this.remove(key);
    if (typeof range === "function") range = range(this.#svg.getRootNode());
    const rects = range.getClientRects();
    const element = draw(rects, options);
    this.#svg.append(element);
    this.#map.set(key, { range, draw, options, element, rects });
  }
  remove(key) {
    if (!this.#map.has(key)) return;
    this.#svg.removeChild(this.#map.get(key).element);
    this.#map.delete(key);
  }
  redraw() {
    for (const obj of this.#map.values()) {
      const { range, draw, options, element } = obj;
      this.#svg.removeChild(element);
      const rects = range.getClientRects();
      const el = draw(rects, options);
      this.#svg.append(el);
      obj.element = el;
      obj.rects = rects;
    }
  }
  hitTest({ x, y }) {
    const arr = Array.from(this.#map.entries());
    for (let i = arr.length - 1; i >= 0; i--) {
      const [key, obj] = arr[i];
      for (const { left, top, right, bottom } of obj.rects)
        if (top <= y && left <= x && bottom > y && right > x)
          return [key, obj.range];
    }
    return [];
  }
  static underline(rects, options = {}) {
    const { color = "red", width: strokeWidth = 2, writingMode } = options;
    const g = createSVGElement("g");
    g.setAttribute("fill", color);
    if (writingMode === "vertical-rl" || writingMode === "vertical-lr")
      for (const { right, top, height } of rects) {
        const el = createSVGElement("rect");
        el.setAttribute("x", right - strokeWidth);
        el.setAttribute("y", top);
        el.setAttribute("height", height);
        el.setAttribute("width", strokeWidth);
        g.append(el);
      }
    else for (const { left, bottom, width } of rects) {
      const el = createSVGElement("rect");
      el.setAttribute("x", left);
      el.setAttribute("y", bottom - strokeWidth);
      el.setAttribute("height", strokeWidth);
      el.setAttribute("width", width);
      g.append(el);
    }
    return g;
  }
  static strikethrough(rects, options = {}) {
    const { color = "red", width: strokeWidth = 2, writingMode } = options;
    const g = createSVGElement("g");
    g.setAttribute("fill", color);
    if (writingMode === "vertical-rl" || writingMode === "vertical-lr")
      for (const { right, left, top, height } of rects) {
        const el = createSVGElement("rect");
        el.setAttribute("x", (right + left) / 2);
        el.setAttribute("y", top);
        el.setAttribute("height", height);
        el.setAttribute("width", strokeWidth);
        g.append(el);
      }
    else for (const { left, top, bottom, width } of rects) {
      const el = createSVGElement("rect");
      el.setAttribute("x", left);
      el.setAttribute("y", (top + bottom) / 2);
      el.setAttribute("height", strokeWidth);
      el.setAttribute("width", width);
      g.append(el);
    }
    return g;
  }
  static squiggly(rects, options = {}) {
    const { color = "red", width: strokeWidth = 2, writingMode } = options;
    const g = createSVGElement("g");
    g.setAttribute("fill", "none");
    g.setAttribute("stroke", color);
    g.setAttribute("stroke-width", strokeWidth);
    const block = strokeWidth * 1.5;
    if (writingMode === "vertical-rl" || writingMode === "vertical-lr")
      for (const { right, top, height } of rects) {
        const el = createSVGElement("path");
        const n = Math.round(height / block / 1.5);
        const inline = height / n;
        const ls = Array.from(
          { length: n },
          (_, i) => `l${i % 2 ? -block : block} ${inline}`
        ).join("");
        el.setAttribute("d", `M${right} ${top}${ls}`);
        g.append(el);
      }
    else for (const { left, bottom, width } of rects) {
      const el = createSVGElement("path");
      const n = Math.round(width / block / 1.5);
      const inline = width / n;
      const ls = Array.from(
        { length: n },
        (_, i) => `l${inline} ${i % 2 ? block : -block}`
      ).join("");
      el.setAttribute("d", `M${left} ${bottom}${ls}`);
      g.append(el);
    }
    return g;
  }
  static highlight(rects, options = {}) {
    const { color = "red" } = options;
    const g = createSVGElement("g");
    g.setAttribute("fill", color);
    g.style.opacity = "var(--overlayer-highlight-opacity, .3)";
    g.style.mixBlendMode = "var(--overlayer-highlight-blend-mode, normal)";
    for (const { left, top, height, width } of rects) {
      const el = createSVGElement("rect");
      el.setAttribute("x", left);
      el.setAttribute("y", top);
      el.setAttribute("height", height);
      el.setAttribute("width", width);
      g.append(el);
    }
    return g;
  }
  static outline(rects, options = {}) {
    const { color = "red", width: strokeWidth = 3, radius = 3 } = options;
    const g = createSVGElement("g");
    g.setAttribute("fill", "none");
    g.setAttribute("stroke", color);
    g.setAttribute("stroke-width", strokeWidth);
    for (const { left, top, height, width } of rects) {
      const el = createSVGElement("rect");
      el.setAttribute("x", left);
      el.setAttribute("y", top);
      el.setAttribute("height", height);
      el.setAttribute("width", width);
      el.setAttribute("rx", radius);
      g.append(el);
    }
    return g;
  }
  // make an exact copy of an image in the overlay
  // one can then apply filters to the entire element, without affecting them;
  // it's a bit silly and probably better to just invert images twice
  // (though the color will be off in that case if you do heu-rotate)
  static copyImage([rect], options = {}) {
    const { src } = options;
    const image = createSVGElement("image");
    const { left, top, height, width } = rect;
    image.setAttribute("href", src);
    image.setAttribute("x", left);
    image.setAttribute("y", top);
    image.setAttribute("height", height);
    image.setAttribute("width", width);
    return image;
  }
}
const walkRange = (range, walker) => {
  const nodes = [];
  for (let node = walker.currentNode; node; node = walker.nextNode()) {
    const compare = range.comparePoint(node, 0);
    if (compare === 0) nodes.push(node);
    else if (compare > 0) break;
  }
  return nodes;
};
const walkDocument = (_, walker) => {
  const nodes = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode())
    nodes.push(node);
  return nodes;
};
const filter = NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_CDATA_SECTION;
const acceptNode = (node) => {
  if (node.nodeType === 1) {
    const name = node.tagName.toLowerCase();
    if (name === "script" || name === "style") return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_SKIP;
  }
  return NodeFilter.FILTER_ACCEPT;
};
const textWalker = function* (x, func, filterFunc) {
  const root = x.commonAncestorContainer ?? x.body ?? x;
  const walker = document.createTreeWalker(root, filter, { acceptNode: filterFunc || acceptNode });
  const walk = x.commonAncestorContainer ? walkRange : walkDocument;
  const nodes = walk(x, walker);
  const strs = nodes.map((node) => node.nodeValue);
  const makeRange = (startIndex, startOffset, endIndex, endOffset) => {
    const range = document.createRange();
    range.setStart(nodes[startIndex], startOffset);
    range.setEnd(nodes[endIndex], endOffset);
    return range;
  };
  for (const match of func(strs, makeRange)) yield match;
};
const SEARCH_PREFIX = "foliate-search:";
const isZip = async (file) => {
  const arr = new Uint8Array(await file.slice(0, 4).arrayBuffer());
  return arr[0] === 80 && arr[1] === 75 && arr[2] === 3 && arr[3] === 4;
};
const isPDF = async (file) => {
  const arr = new Uint8Array(await file.slice(0, 5).arrayBuffer());
  return arr[0] === 37 && arr[1] === 80 && arr[2] === 68 && arr[3] === 70 && arr[4] === 45;
};
const isCBZ = ({ name, type }) => type === "application/vnd.comicbook+zip" || name.endsWith(".cbz");
const isFB2 = ({ name, type }) => type === "application/x-fictionbook+xml" || name.endsWith(".fb2");
const isFBZ = ({ name, type }) => type === "application/x-zip-compressed-fb2" || name.endsWith(".fb2.zip") || name.endsWith(".fbz");
const makeZipLoader = async (file) => {
  const { configure: configure2, ZipReader: ZipReader2, BlobReader: BlobReader2, TextWriter, BlobWriter: BlobWriter2 } = await __vitePreload(async () => {
    const { configure: configure3, ZipReader: ZipReader3, BlobReader: BlobReader3, TextWriter: TextWriter2, BlobWriter: BlobWriter3 } = await import("./zip-DbJSXXRR.js");
    return { configure: configure3, ZipReader: ZipReader3, BlobReader: BlobReader3, TextWriter: TextWriter2, BlobWriter: BlobWriter3 };
  }, true ? [] : void 0);
  configure2({ useWebWorkers: false });
  const reader = new ZipReader2(new BlobReader2(file));
  const entries = await reader.getEntries();
  const map = new Map(entries.map((entry) => [entry.filename, entry]));
  const load = (f) => (name, ...args) => map.has(name) ? f(map.get(name), ...args) : null;
  const loadText = load((entry) => entry.getData(new TextWriter()));
  const loadBlob = load((entry, type) => entry.getData(new BlobWriter2(type)));
  const getSize = (name) => map.get(name)?.uncompressedSize ?? 0;
  return { entries, loadText, loadBlob, getSize };
};
const getFileEntries = async (entry) => entry.isFile ? entry : (await Promise.all(Array.from(
  await new Promise((resolve, reject) => entry.createReader().readEntries((entries) => resolve(entries), (error) => reject(error))),
  getFileEntries
))).flat();
const makeDirectoryLoader = async (entry) => {
  const entries = await getFileEntries(entry);
  const files = await Promise.all(
    entries.map((entry2) => new Promise((resolve, reject) => entry2.file(
      (file) => resolve([file, entry2.fullPath]),
      (error) => reject(error)
    )))
  );
  const map = new Map(files.map(([file, path]) => [path.replace(entry.fullPath + "/", ""), file]));
  const decoder = new TextDecoder();
  const decode = (x) => x ? decoder.decode(x) : null;
  const getBuffer = (name) => map.get(name)?.arrayBuffer() ?? null;
  const loadText = async (name) => decode(await getBuffer(name));
  const loadBlob = (name) => map.get(name);
  const getSize = (name) => map.get(name)?.size ?? 0;
  return { loadText, loadBlob, getSize };
};
class ResponseError extends Error {
}
class NotFoundError extends Error {
}
class UnsupportedTypeError extends Error {
}
const fetchFile = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new ResponseError(
    `${res.status} ${res.statusText}`,
    { cause: res }
  );
  return new File([await res.blob()], new URL(res.url).pathname);
};
const makeBook = async (file) => {
  if (typeof file === "string") file = await fetchFile(file);
  let book;
  if (file.isDirectory) {
    const loader2 = await makeDirectoryLoader(file);
    const { EPUB } = await __vitePreload(async () => {
      const { EPUB: EPUB2 } = await import("./epub-BaFbfj3W.js");
      return { EPUB: EPUB2 };
    }, true ? __vite__mapDeps([2,3,1,4,5,6,7,8]) : void 0);
    book = await new EPUB(loader2).init();
  } else if (!file.size) throw new NotFoundError("File not found");
  else if (await isZip(file)) {
    const loader2 = await makeZipLoader(file);
    if (isCBZ(file)) {
      const { makeComicBook } = await __vitePreload(async () => {
        const { makeComicBook: makeComicBook2 } = await import("./comic-book-BpMxmBOj.js");
        return { makeComicBook: makeComicBook2 };
      }, true ? [] : void 0);
      book = makeComicBook(loader2, file);
    } else if (isFBZ(file)) {
      const { makeFB2 } = await __vitePreload(async () => {
        const { makeFB2: makeFB22 } = await import("./fb2-XpRl65BK.js");
        return { makeFB2: makeFB22 };
      }, true ? [] : void 0);
      const { entries } = loader2;
      const entry = entries.find((entry2) => entry2.filename.endsWith(".fb2"));
      const blob = await loader2.loadBlob((entry ?? entries[0]).filename);
      book = await makeFB2(blob);
    } else {
      const { EPUB } = await __vitePreload(async () => {
        const { EPUB: EPUB2 } = await import("./epub-BaFbfj3W.js");
        return { EPUB: EPUB2 };
      }, true ? __vite__mapDeps([2,3,1,4,5,6,7,8]) : void 0);
      book = await new EPUB(loader2).init();
    }
  } else if (await isPDF(file)) {
    const { makePDF } = await __vitePreload(async () => {
      const { makePDF: makePDF2 } = await import("./pdf-BACJ4Odf.js");
      return { makePDF: makePDF2 };
    }, true ? [] : void 0);
    book = await makePDF(file);
  } else {
    const { isMOBI, MOBI } = await __vitePreload(async () => {
      const { isMOBI: isMOBI2, MOBI: MOBI2 } = await import("./mobi-CPjEMsPC.js");
      return { isMOBI: isMOBI2, MOBI: MOBI2 };
    }, true ? [] : void 0);
    if (await isMOBI(file)) {
      const fflate = await __vitePreload(() => import("./fflate-_abAaq3-.js"), true ? [] : void 0);
      book = await new MOBI({ unzlib: fflate.unzlibSync }).open(file);
    } else if (isFB2(file)) {
      const { makeFB2 } = await __vitePreload(async () => {
        const { makeFB2: makeFB22 } = await import("./fb2-XpRl65BK.js");
        return { makeFB2: makeFB22 };
      }, true ? [] : void 0);
      book = await makeFB2(file);
    }
  }
  if (!book) throw new UnsupportedTypeError("File type not supported");
  return book;
};
class CursorAutohider {
  #timeout;
  #el;
  #check;
  #state;
  constructor(el, check, state = {}) {
    this.#el = el;
    this.#check = check;
    this.#state = state;
    if (this.#state.hidden) this.hide();
    this.#el.addEventListener("mousemove", ({ screenX, screenY }) => {
      if (screenX === this.#state.x && screenY === this.#state.y) return;
      this.#state.x = screenX, this.#state.y = screenY;
      this.show();
      if (this.#timeout) clearTimeout(this.#timeout);
      if (check()) this.#timeout = setTimeout(this.hide.bind(this), 1e3);
    }, false);
  }
  cloneFor(el) {
    return new CursorAutohider(el, this.#check, this.#state);
  }
  hide() {
    this.#el.style.cursor = "none";
    this.#state.hidden = true;
  }
  show() {
    this.#el.style.removeProperty("cursor");
    this.#state.hidden = false;
  }
}
class History extends EventTarget {
  #arr = [];
  #index = -1;
  pushState(x) {
    const last = this.#arr[this.#index];
    if (last === x || last?.fraction && last.fraction === x.fraction) return;
    this.#arr[++this.#index] = x;
    this.#arr.length = this.#index + 1;
    this.dispatchEvent(new Event("index-change"));
  }
  replaceState(x) {
    const index2 = this.#index;
    this.#arr[index2] = x;
  }
  back() {
    const index2 = this.#index;
    if (index2 <= 0) return;
    const detail = { state: this.#arr[index2 - 1] };
    this.#index = index2 - 1;
    this.dispatchEvent(new CustomEvent("popstate", { detail }));
    this.dispatchEvent(new Event("index-change"));
  }
  forward() {
    const index2 = this.#index;
    if (index2 >= this.#arr.length - 1) return;
    const detail = { state: this.#arr[index2 + 1] };
    this.#index = index2 + 1;
    this.dispatchEvent(new CustomEvent("popstate", { detail }));
    this.dispatchEvent(new Event("index-change"));
  }
  get canGoBack() {
    return this.#index > 0;
  }
  get canGoForward() {
    return this.#index < this.#arr.length - 1;
  }
  clear() {
    this.#arr = [];
    this.#index = -1;
  }
}
const languageInfo = (lang) => {
  if (!lang) return {};
  try {
    const canonical = Intl.getCanonicalLocales(lang)[0];
    const locale = new Intl.Locale(canonical);
    const isCJK = ["zh", "ja", "kr"].includes(locale.language);
    const direction = (locale.getTextInfo?.() ?? locale.textInfo)?.direction;
    return { canonical, locale, isCJK, direction };
  } catch (e) {
    console.warn(e);
    return {};
  }
};
class View extends HTMLElement {
  #root = this.attachShadow({ mode: "closed" });
  #sectionProgress;
  #tocProgress;
  #pageProgress;
  #searchResults = /* @__PURE__ */ new Map();
  #cursorAutohider = new CursorAutohider(this, () => this.hasAttribute("autohide-cursor"));
  isFixedLayout = false;
  lastLocation;
  history = new History();
  constructor() {
    super();
    this.history.addEventListener("popstate", ({ detail }) => {
      const resolved = this.resolveNavigation(detail.state);
      this.renderer.goTo(resolved);
    });
  }
  async open(book) {
    if (typeof book === "string" || typeof book.arrayBuffer === "function" || book.isDirectory) book = await makeBook(book);
    this.book = book;
    this.language = languageInfo(book.metadata?.language);
    if (book.splitTOCHref && book.getTOCFragment) {
      const ids = book.sections.map((s) => s.id);
      this.#sectionProgress = new SectionProgress(book.sections, 1500, 1600);
      const splitHref = book.splitTOCHref.bind(book);
      const getFragment = book.getTOCFragment.bind(book);
      this.#tocProgress = new TOCProgress();
      await this.#tocProgress.init({
        toc: book.toc ?? [],
        ids,
        splitHref,
        getFragment
      });
      this.#pageProgress = new TOCProgress();
      await this.#pageProgress.init({
        toc: book.pageList ?? [],
        ids,
        splitHref,
        getFragment
      });
    }
    this.isFixedLayout = this.book.rendition?.layout === "pre-paginated";
    if (this.isFixedLayout) {
      await __vitePreload(() => import("./fixed-layout-Cf_uieNT.js"), true ? [] : void 0);
      this.renderer = document.createElement("foliate-fxl");
    } else {
      await __vitePreload(() => import("./paginator-BcYeI_gD.js"), true ? [] : void 0);
      this.renderer = document.createElement("foliate-paginator");
    }
    this.renderer.setAttribute("exportparts", "head,foot,filter");
    this.renderer.addEventListener("load", (e) => this.#onLoad(e.detail));
    this.renderer.addEventListener("relocate", (e) => this.#onRelocate(e.detail));
    this.renderer.addEventListener("create-overlayer", (e) => e.detail.attach(this.#createOverlayer(e.detail)));
    this.renderer.open(book);
    this.#root.append(this.renderer);
    if (book.sections.some((section) => section.mediaOverlay)) {
      const activeClass = book.media.activeClass;
      const playbackActiveClass = book.media.playbackActiveClass;
      this.mediaOverlay = book.getMediaOverlay();
      let lastActive;
      this.mediaOverlay.addEventListener("highlight", (e) => {
        const resolved = this.resolveNavigation(e.detail.text);
        this.renderer.goTo(resolved).then(() => {
          const { doc } = this.renderer.getContents().find((x) => x.index = resolved.index);
          const el = resolved.anchor(doc);
          el.classList.add(activeClass);
          if (playbackActiveClass) el.ownerDocument.documentElement.classList.add(playbackActiveClass);
          lastActive = new WeakRef(el);
        });
      });
      this.mediaOverlay.addEventListener("unhighlight", () => {
        const el = lastActive?.deref();
        if (el) {
          el.classList.remove(activeClass);
          if (playbackActiveClass) el.ownerDocument.documentElement.classList.remove(playbackActiveClass);
        }
      });
    }
  }
  close() {
    this.renderer?.destroy();
    this.renderer?.remove();
    this.#sectionProgress = null;
    this.#tocProgress = null;
    this.#pageProgress = null;
    this.#searchResults = /* @__PURE__ */ new Map();
    this.lastLocation = null;
    this.history.clear();
    this.tts = null;
    this.mediaOverlay = null;
  }
  goToTextStart() {
    return this.goTo(this.book.landmarks?.find((m) => m.type.includes("bodymatter") || m.type.includes("text"))?.href ?? this.book.sections.findIndex((s) => s.linear !== "no"));
  }
  async init({ lastLocation, showTextStart }) {
    const resolved = lastLocation ? this.resolveNavigation(lastLocation) : null;
    if (resolved) {
      await this.renderer.goTo(resolved);
      this.history.pushState(lastLocation);
    } else if (showTextStart) await this.goToTextStart();
    else {
      this.history.pushState(0);
      await this.next();
    }
  }
  #emit(name, detail, cancelable) {
    return this.dispatchEvent(new CustomEvent(name, { detail, cancelable }));
  }
  #onRelocate({ reason, range, index: index2, fraction, size }) {
    const progress = this.#sectionProgress?.getProgress(index2, fraction, size) ?? {};
    const tocItem = this.#tocProgress?.getProgress(index2, range);
    const pageItem = this.#pageProgress?.getProgress(index2, range);
    const cfi = this.getCFI(index2, range);
    this.lastLocation = { ...progress, tocItem, pageItem, cfi, range };
    if (reason === "snap" || reason === "page" || reason === "scroll")
      this.history.replaceState(cfi);
    this.#emit("relocate", this.lastLocation);
  }
  #onLoad({ doc, index: index2 }) {
    doc.documentElement.lang ||= this.language.canonical ?? "";
    if (!this.language.isCJK)
      doc.documentElement.dir ||= this.language.direction ?? "";
    this.#handleLinks(doc, index2);
    this.#cursorAutohider.cloneFor(doc.documentElement);
    this.#emit("load", { doc, index: index2 });
  }
  #handleLinks(doc, index2) {
    const { book } = this;
    const section = book.sections[index2];
    doc.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a) return;
      e.preventDefault();
      const href_ = a.getAttribute("href");
      const href = section?.resolveHref?.(href_) ?? href_;
      if (book?.isExternal?.(href))
        Promise.resolve(this.#emit("external-link", { a, href }, true)).then((x) => x ? globalThis.open(href, "_blank") : null).catch((e2) => console.error(e2));
      else Promise.resolve(this.#emit("link", { a, href }, true)).then((x) => x ? this.goTo(href) : null).catch((e2) => console.error(e2));
    });
  }
  async addAnnotation(annotation, remove) {
    const { value } = annotation;
    if (value.startsWith(SEARCH_PREFIX)) {
      const cfi = value.replace(SEARCH_PREFIX, "");
      const { index: index3, anchor: anchor2 } = await this.resolveNavigation(cfi);
      const obj2 = this.#getOverlayer(index3);
      if (obj2) {
        const { overlayer, doc } = obj2;
        if (remove) {
          overlayer.remove(value);
          return;
        }
        const range = doc ? anchor2(doc) : anchor2;
        overlayer.add(value, range, Overlayer.outline);
      }
      return;
    }
    const { index: index2, anchor } = await this.resolveNavigation(value);
    const obj = this.#getOverlayer(index2);
    if (obj) {
      const { overlayer, doc } = obj;
      overlayer.remove(value);
      if (!remove) {
        const range = doc ? anchor(doc) : anchor;
        const draw = (func, opts) => overlayer.add(value, range, func, opts);
        this.#emit("draw-annotation", { draw, annotation, doc, range });
      }
    }
    const label = this.#tocProgress.getProgress(index2)?.label ?? "";
    return { index: index2, label };
  }
  deleteAnnotation(annotation) {
    return this.addAnnotation(annotation, true);
  }
  #getOverlayer(index2) {
    return this.renderer.getContents().find((x) => x.index === index2 && x.overlayer);
  }
  #createOverlayer({ doc, index: index2 }) {
    const overlayer = new Overlayer();
    doc.addEventListener("click", (e) => {
      const [value, range] = overlayer.hitTest(e);
      if (value && !value.startsWith(SEARCH_PREFIX)) {
        this.#emit("show-annotation", { value, index: index2, range });
      }
    }, false);
    const list = this.#searchResults.get(index2);
    if (list) for (const item of list) this.addAnnotation(item);
    this.#emit("create-overlay", { index: index2 });
    return overlayer;
  }
  async showAnnotation(annotation) {
    const { value } = annotation;
    const resolved = await this.goTo(value);
    if (resolved) {
      const { index: index2, anchor } = resolved;
      const { doc } = this.#getOverlayer(index2);
      const range = anchor(doc);
      this.#emit("show-annotation", { value, index: index2, range });
    }
  }
  getCFI(index2, range) {
    const baseCFI = this.book.sections[index2].cfi ?? fake.fromIndex(index2);
    if (!range) return baseCFI;
    return joinIndir(baseCFI, fromRange(range));
  }
  resolveCFI(cfi) {
    if (this.book.resolveCFI)
      return this.book.resolveCFI(cfi);
    else {
      const parts = parse(cfi);
      const index2 = fake.toIndex((parts.parent ?? parts).shift());
      const anchor = (doc) => toRange(doc, parts);
      return { index: index2, anchor };
    }
  }
  resolveNavigation(target) {
    try {
      if (typeof target === "number") return { index: target };
      if (typeof target.fraction === "number") {
        const [index2, anchor] = this.#sectionProgress.getSection(target.fraction);
        return { index: index2, anchor };
      }
      if (isCFI.test(target)) return this.resolveCFI(target);
      return this.book.resolveHref(target);
    } catch (e) {
      console.error(e);
      console.error(`Could not resolve target ${target}`);
    }
  }
  async goTo(target) {
    const resolved = this.resolveNavigation(target);
    try {
      await this.renderer.goTo(resolved);
      this.history.pushState(target);
      return resolved;
    } catch (e) {
      console.error(e);
      console.error(`Could not go to ${target}`);
    }
  }
  async goToFraction(frac) {
    const [index2, anchor] = this.#sectionProgress.getSection(frac);
    await this.renderer.goTo({ index: index2, anchor });
    this.history.pushState({ fraction: frac });
  }
  async select(target) {
    try {
      const obj = await this.resolveNavigation(target);
      await this.renderer.goTo({ ...obj, select: true });
      this.history.pushState(target);
    } catch (e) {
      console.error(e);
      console.error(`Could not go to ${target}`);
    }
  }
  deselect() {
    for (const { doc } of this.renderer.getContents())
      doc.defaultView.getSelection().removeAllRanges();
  }
  getSectionFractions() {
    return (this.#sectionProgress?.sectionFractions ?? []).map((x) => x + Number.EPSILON);
  }
  getProgressOf(index2, range) {
    const tocItem = this.#tocProgress?.getProgress(index2, range);
    const pageItem = this.#pageProgress?.getProgress(index2, range);
    return { tocItem, pageItem };
  }
  async getTOCItemOf(target) {
    try {
      const { index: index2, anchor } = await this.resolveNavigation(target);
      const doc = await this.book.sections[index2].createDocument();
      const frag = anchor(doc);
      const isRange = frag instanceof Range;
      const range = isRange ? frag : doc.createRange();
      if (!isRange) range.selectNodeContents(frag);
      return this.#tocProgress.getProgress(index2, range);
    } catch (e) {
      console.error(e);
      console.error(`Could not get ${target}`);
    }
  }
  async prev(distance) {
    await this.renderer.prev(distance);
  }
  async next(distance) {
    await this.renderer.next(distance);
  }
  goLeft() {
    return this.book.dir === "rtl" ? this.next() : this.prev();
  }
  goRight() {
    return this.book.dir === "rtl" ? this.prev() : this.next();
  }
  async *#searchSection(matcher, query, index2) {
    const doc = await this.book.sections[index2].createDocument();
    for (const { range, excerpt } of matcher(doc, query))
      yield { cfi: this.getCFI(index2, range), excerpt };
  }
  async *#searchBook(matcher, query) {
    const { sections } = this.book;
    for (const [index2, { createDocument }] of sections.entries()) {
      if (!createDocument) continue;
      const doc = await createDocument();
      const subitems = Array.from(matcher(doc, query), ({ range, excerpt }) => ({ cfi: this.getCFI(index2, range), excerpt }));
      const progress = (index2 + 1) / sections.length;
      yield { progress };
      if (subitems.length) yield { index: index2, subitems };
    }
  }
  async *search(opts) {
    this.clearSearch();
    const { searchMatcher } = await __vitePreload(async () => {
      const { searchMatcher: searchMatcher2 } = await import("./search-CTmKvyP1.js");
      return { searchMatcher: searchMatcher2 };
    }, true ? [] : void 0);
    const { query, index: index2 } = opts;
    const matcher = searchMatcher(
      textWalker,
      { defaultLocale: this.language, ...opts }
    );
    const iter = index2 != null ? this.#searchSection(matcher, query, index2) : this.#searchBook(matcher, query);
    const list = [];
    this.#searchResults.set(index2, list);
    for await (const result of iter) {
      if (result.subitems) {
        const list2 = result.subitems.map(({ cfi }) => ({ value: SEARCH_PREFIX + cfi }));
        this.#searchResults.set(result.index, list2);
        for (const item of list2) this.addAnnotation(item);
        yield {
          label: this.#tocProgress.getProgress(result.index)?.label ?? "",
          subitems: result.subitems
        };
      } else {
        if (result.cfi) {
          const item = { value: SEARCH_PREFIX + result.cfi };
          list.push(item);
          this.addAnnotation(item);
        }
        yield result;
      }
    }
    yield "done";
  }
  clearSearch() {
    for (const list of this.#searchResults.values())
      for (const item of list) this.deleteAnnotation(item);
    this.#searchResults.clear();
  }
  async initTTS(granularity = "word", highlight) {
    const doc = this.renderer.getContents()[0].doc;
    if (this.tts && this.tts.doc === doc) return;
    const { TTS } = await __vitePreload(async () => {
      const { TTS: TTS2 } = await import("./tts-U-en5Uvh.js");
      return { TTS: TTS2 };
    }, true ? [] : void 0);
    this.tts = new TTS(doc, textWalker, highlight || ((range) => this.renderer.scrollToAnchor(range, true)), granularity);
  }
  startMediaOverlay() {
    const { index: index2 } = this.renderer.getContents()[0];
    return this.mediaOverlay.start(index2);
  }
}
customElements.define("foliate-view", View);
const _hoisted_1$9 = { class: "toolbar-container absolute top-0 left-0 right-0 z-20" };
const _hoisted_2$9 = { class: "flex items-center gap-3 min-w-0 flex-1" };
const _hoisted_3$8 = ["disabled", "title"];
const _hoisted_4$8 = { class: "text-sm hidden sm:inline" };
const _hoisted_5$7 = {
  key: 0,
  class: "hidden md:block min-w-0 flex-1"
};
const _hoisted_6$4 = { class: "flex items-center gap-2" };
const _hoisted_7$3 = ["disabled", "title"];
const _hoisted_8$1 = ["disabled", "title"];
const _hoisted_9$1 = ["disabled", "title"];
const _hoisted_10$1 = ["disabled", "title"];
const _hoisted_11$1 = { value: "paginated" };
const _hoisted_12$1 = { value: "scrolled" };
const _hoisted_13$1 = ["disabled", "title"];
const _hoisted_14$1 = ["disabled", "title"];
const _hoisted_15$1 = { class: "flex-1 relative overflow-hidden" };
const _hoisted_16$1 = { class: "min-w-0 flex-1" };
const _hoisted_17 = ["title"];
const _hoisted_18 = { class: "flex-1 overflow-auto p-2" };
const _hoisted_19 = {
  key: 0,
  class: "mb-4"
};
const _hoisted_20 = { class: "space-y-0.5" };
const _hoisted_21 = ["onClick", "title"];
const _hoisted_22 = { class: "truncate" };
const _hoisted_23 = ["onClick", "title"];
const _hoisted_24 = {
  key: 3,
  class: "space-y-0.5"
};
const _hoisted_25 = { class: "text-center p-4" };
const _hoisted_26 = { class: "progress-container absolute bottom-0 left-0 right-0 z-20" };
const _hoisted_27 = ["dir", "disabled", "title"];
const _hoisted_28 = { class: "flex items-center justify-between text-sm" };
const _hoisted_29 = { class: "absolute inset-y-0 left-0 w-full flex items-center justify-start pl-4" };
const _hoisted_30 = { class: "absolute inset-y-0 right-0 w-full flex items-center justify-end pr-4" };
const _sfc_main$a = {
  __name: "FoliateEpubView",
  props: {
    srcUrl: {
      type: String,
      default: ""
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    isFullscreen: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: "Loading..."
    },
    errorText: {
      type: String,
      default: "Failed to load."
    },
    // 书籍唯一标识，用于保存阅读进度
    bookId: {
      type: String,
      default: ""
    }
  },
  emits: ["load", "error"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const hostRef = ref(null);
    const rootRef = ref(null);
    const loading = ref(true);
    const error = ref(false);
    const currentViewEl = ref(null);
    const currentContentDocRef = ref(null);
    let loadSeq = 0;
    let stopViewRelocateListener = null;
    let stopViewLoadListener = null;
    const viewReady = computed(() => Boolean(currentViewEl.value));
    const toolbarVisible = ref(true);
    let toolbarTimer = null;
    const showToolbar = () => {
      toolbarVisible.value = true;
      clearTimeout(toolbarTimer);
      toolbarTimer = setTimeout(() => {
        if (!sidebarOpen.value) {
          toolbarVisible.value = false;
        }
      }, 3e3);
    };
    const handleContainerClick = (e) => {
      const rect = rootRef.value?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const centerStart = rect.width * 0.25;
      const centerEnd = rect.width * 0.75;
      if (x > centerStart && x < centerEnd) {
        toolbarVisible.value = !toolbarVisible.value;
        if (toolbarVisible.value) {
          showToolbar();
        }
      }
    };
    const handleMouseMove = () => {
      showToolbar();
    };
    const sidebarOpen = ref(false);
    const tocItems = ref([]);
    const bookTitle = ref("");
    const bookAuthor = ref("");
    const bookDir = ref("ltr");
    const fraction = ref(0);
    const percentText = computed(() => {
      const v = Number(fraction.value || 0);
      if (!Number.isFinite(v)) return "0%";
      return `${Math.round(v * 100)}%`;
    });
    const progressTitle = ref("");
    const flowMode = ref("paginated");
    const currentCfi = ref("");
    const computedBookId = computed(() => {
      if (props.bookId) return props.bookId;
      return generateBookId(props.srcUrl, bookTitle.value, bookAuthor.value);
    });
    const epubProgress = ref(null);
    const readingHistory = useReadingHistory(50);
    const bookmarksList = ref([]);
    const initProgressManager = () => {
      const id = computedBookId.value;
      if (!id) return;
      const {
        currentCfi: savedCfi,
        currentFraction: savedFraction,
        bookmarks,
        isLoaded,
        loadProgress,
        saveProgress,
        saveProgressImmediate,
        addBookmark: addBookmarkFn,
        removeBookmark: removeBookmarkFn,
        hasBookmark: hasBookmarkFn
      } = useEpubProgress(id);
      epubProgress.value = {
        savedCfi,
        savedFraction,
        bookmarks,
        isLoaded,
        loadProgress: () => {
          const result = loadProgress();
          bookmarksList.value = [...bookmarks.value];
          return result;
        },
        saveProgress,
        saveProgressImmediate,
        addBookmark: (cfi, title, excerpt) => {
          const result = addBookmarkFn(cfi, title, excerpt);
          bookmarksList.value = [...bookmarks.value];
          return result;
        },
        removeBookmark: (cfi) => {
          const result = removeBookmarkFn(cfi);
          bookmarksList.value = [...bookmarks.value];
          return result;
        },
        hasBookmark: hasBookmarkFn
      };
    };
    const isCurrentBookmarked = computed(() => {
      if (!currentCfi.value || !epubProgress.value) return false;
      return epubProgress.value.hasBookmark(currentCfi.value);
    });
    const toggleBookmark = () => {
      if (!currentCfi.value || !epubProgress.value) return;
      if (isCurrentBookmarked.value) {
        epubProgress.value.removeBookmark(currentCfi.value);
      } else {
        const tocItem = currentViewEl.value?.getTOCItemOf?.(currentCfi.value);
        const title = tocItem?.label || progressTitle.value || "";
        epubProgress.value.addBookmark(currentCfi.value, title);
      }
    };
    const goToBookmark = async (bookmark) => {
      if (!bookmark?.cfi || !currentViewEl.value) return;
      try {
        await currentViewEl.value.goTo(bookmark.cfi);
        sidebarOpen.value = false;
      } catch {
      }
    };
    const historyBack = async () => {
      const target = readingHistory.goBack();
      if (target?.cfi && currentViewEl.value) {
        try {
          await currentViewEl.value.goTo(target.cfi);
        } catch {
        }
      }
    };
    const historyForward = async () => {
      const target = readingHistory.goForward();
      if (target?.cfi && currentViewEl.value) {
        try {
          await currentViewEl.value.goTo(target.cfi);
        } catch {
        }
      }
    };
    const formatLanguageMap = (x) => {
      if (!x) return "";
      if (typeof x === "string") return x;
      const keys = Object.keys(x);
      return x[keys[0]] || "";
    };
    const formatContributor = (contributor) => {
      if (!contributor) return "";
      if (typeof contributor === "string") return contributor;
      if (Array.isArray(contributor)) {
        const names = contributor.map((c) => typeof c === "string" ? c : formatLanguageMap(c?.name)).filter(Boolean);
        return names.join(", ");
      }
      return formatLanguageMap(contributor?.name);
    };
    const nodeKey = (node) => {
      return `${String(node?.href || "")}::${String(node?.label || "")}`;
    };
    const goToToc = async (href) => {
      if (!href || !currentViewEl.value) return;
      try {
        await currentViewEl.value.goTo(href);
        sidebarOpen.value = false;
      } catch {
      }
    };
    const handleKeydown = (event) => {
      if (!currentViewEl.value) return;
      const k = event.key;
      if (k === "ArrowLeft" || k === "h") {
        event.preventDefault();
        currentViewEl.value.goLeft?.();
      } else if (k === "ArrowRight" || k === "l") {
        event.preventDefault();
        currentViewEl.value.goRight?.();
      } else if (k === "Escape") {
        sidebarOpen.value = false;
      }
    };
    useEventListener(document, "keydown", handleKeydown);
    useEventListener(currentContentDocRef, "keydown", handleKeydown);
    const handleRelocate = (event) => {
      const detail = event?.detail || {};
      if (typeof detail.fraction === "number" && Number.isFinite(detail.fraction)) {
        fraction.value = detail.fraction;
      }
      percentText.value;
      const pageItem = detail.pageItem;
      const location = detail.location;
      const locText = pageItem?.label ? `${t("fileView.preview.epub.page")} ${pageItem.label}` : location?.current ? `Loc ${location.current}` : "";
      progressTitle.value = locText ? `${locText}` : "";
      const cfi = detail.cfi || detail.location?.start?.cfi || "";
      if (cfi) {
        currentCfi.value = cfi;
        if (epubProgress.value) {
          epubProgress.value.saveProgress(cfi, fraction.value);
        }
        const tocItem = detail.tocItem;
        readingHistory.push(cfi, tocItem?.label || "");
      }
    };
    const handleLoadContentDoc = (event) => {
      const doc = event?.detail?.doc;
      if (doc && typeof doc.addEventListener === "function") {
        currentContentDocRef.value = doc;
      }
    };
    const applyFlowMode = () => {
      if (!currentViewEl.value?.renderer) return;
      currentViewEl.value.renderer.setAttribute?.("flow", flowMode.value);
    };
    const applyDarkMode = () => {
      if (!currentViewEl.value) return;
      if (props.darkMode) {
        currentViewEl.value.setAttribute("data-dark", "");
      } else {
        currentViewEl.value.removeAttribute("data-dark");
      }
    };
    const goLeft = () => {
      if (!currentViewEl.value) return;
      currentViewEl.value.goLeft?.();
    };
    const goRight = () => {
      if (!currentViewEl.value) return;
      currentViewEl.value.goRight?.();
    };
    const handleGoToFraction = async () => {
      if (!currentViewEl.value) return;
      const v = Number(fraction.value);
      if (!Number.isFinite(v)) return;
      try {
        await currentViewEl.value.goToFraction?.(v);
      } catch {
      }
    };
    const cleanup = () => {
      currentContentDocRef.value = null;
      if (typeof stopViewRelocateListener === "function") {
        stopViewRelocateListener();
        stopViewRelocateListener = null;
      }
      if (typeof stopViewLoadListener === "function") {
        stopViewLoadListener();
        stopViewLoadListener = null;
      }
      if (currentViewEl.value) {
        try {
          currentViewEl.value.close?.();
          currentViewEl.value.remove?.();
        } catch {
        }
      }
      currentViewEl.value = null;
      if (hostRef.value) {
        hostRef.value.innerHTML = "";
      }
    };
    const openBook = async () => {
      const seq = ++loadSeq;
      loading.value = true;
      error.value = false;
      cleanup();
      const url = String(props.srcUrl || "").trim();
      if (!url) {
        loading.value = false;
        error.value = true;
        emit("error");
        return;
      }
      try {
        const viewEl = document.createElement("foliate-view");
        viewEl.className = "w-full h-full";
        viewEl.style.colorScheme = "light dark";
        hostRef.value?.appendChild(viewEl);
        currentViewEl.value = viewEl;
        stopViewRelocateListener = useEventListener(viewEl, "relocate", handleRelocate);
        stopViewLoadListener = useEventListener(viewEl, "load", handleLoadContentDoc);
        await viewEl.open(url);
        if (seq !== loadSeq) return;
        const book = viewEl.book;
        const title = formatLanguageMap(book?.metadata?.title) || "";
        const author = formatContributor(book?.metadata?.author) || "";
        bookTitle.value = title;
        bookAuthor.value = author;
        bookDir.value = book?.dir || "ltr";
        tocItems.value = Array.isArray(book?.toc) ? book.toc : [];
        applyFlowMode();
        applyDarkMode();
        initProgressManager();
        if (epubProgress.value) {
          const savedData = epubProgress.value.loadProgress();
          if (epubProgress.value.bookmarks?.value) {
            bookmarksList.value = [...epubProgress.value.bookmarks.value];
          }
          if (savedData?.cfi) {
            try {
              await viewEl.goTo(savedData.cfi);
            } catch {
              viewEl.renderer?.next?.();
            }
          } else {
            viewEl.renderer?.next?.();
          }
        } else {
          viewEl.renderer?.next?.();
        }
        loading.value = false;
        error.value = false;
        emit("load");
        showToolbar();
      } catch (e) {
        if (seq !== loadSeq) return;
        loading.value = false;
        error.value = true;
        emit("error", e);
      }
    };
    onMounted(() => {
      openBook();
    });
    watch(
      flowMode,
      () => {
        applyFlowMode();
      },
      { immediate: true }
    );
    watch(
      () => props.srcUrl,
      () => {
        openBook();
      }
    );
    watch(
      () => props.darkMode,
      () => {
        applyDarkMode();
      }
    );
    watch(sidebarOpen, (open) => {
      if (open) {
        toolbarVisible.value = true;
        clearTimeout(toolbarTimer);
      } else {
        showToolbar();
      }
    });
    onBeforeUnmount(() => {
      loadSeq++;
      clearTimeout(toolbarTimer);
      if (epubProgress.value) {
        epubProgress.value.saveProgressImmediate();
      }
      cleanup();
    });
    const TocNode = defineComponent({
      name: "TocNode",
      props: {
        node: { type: Object, required: true },
        darkMode: { type: Boolean, default: false },
        depth: { type: Number, default: 0 }
      },
      emits: ["go"],
      setup(props2, { emit: emit2 }) {
        const children = computed(() => Array.isArray(props2.node?.subitems) ? props2.node.subitems : []);
        const label = computed(() => String(props2.node?.label || "").trim() || "Untitled");
        const href = computed(() => props2.node?.href ?? "");
        const expanded = ref(false);
        const toggle = () => {
          if (!children.value.length) return;
          expanded.value = !expanded.value;
        };
        const go = () => {
          if (href.value === null || href.value === void 0) return;
          if (typeof href.value === "string" && !href.value.trim()) return;
          emit2("go", href.value);
        };
        return () => {
          const hasChildren = children.value.length > 0;
          const rowClass = `flex items-center gap-1 rounded-md transition-colors ${props2.darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`;
          const toggleBtn = hasChildren ? h(
            "button",
            {
              type: "button",
              class: `w-7 h-7 flex items-center justify-center rounded transition-colors flex-shrink-0 ${props2.darkMode ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`,
              onClick: toggle,
              title: expanded.value ? "收起" : "展开"
            },
            [h("span", { class: "text-xs" }, expanded.value ? "▾" : "▸")]
          ) : h("span", { class: "w-7 h-7 flex-shrink-0" });
          const labelBtn = h(
            "button",
            {
              type: "button",
              class: `flex-1 text-left text-sm py-2 pr-2 rounded transition-colors truncate ${props2.darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}`,
              onClick: go,
              title: label.value
            },
            label.value
          );
          const childList = expanded.value && hasChildren ? h(
            "ul",
            { class: "pl-4 mt-0.5 space-y-0.5" },
            children.value.map(
              (child) => h(TocNode, {
                key: nodeKey(child),
                node: child,
                darkMode: props2.darkMode,
                depth: props2.depth + 1,
                onGo: (payload) => emit2("go", payload)
              })
            )
          ) : null;
          return h("li", null, [h("div", { class: rowClass }, [toggleBtn, labelBtn]), childList]);
        };
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "rootRef",
        ref: rootRef,
        class: normalizeClass(["foliate-epub-view w-full h-full relative flex flex-col", [
          __props.darkMode ? "bg-gray-900" : "bg-white"
        ]]),
        onClick: handleContainerClick,
        onMousemove: handleMouseMove
      }, [
        createVNode(Transition, { name: "toolbar-fade" }, {
          default: withCtx(() => [
            withDirectives(createBaseVNode("div", _hoisted_1$9, [
              createBaseVNode("div", {
                class: normalizeClass(["flex items-center justify-between gap-2 px-3 py-2 backdrop-blur-sm", __props.darkMode ? "bg-gray-800/90" : "bg-white/90"])
              }, [
                createBaseVNode("div", _hoisted_2$9, [
                  createBaseVNode("button", {
                    type: "button",
                    class: normalizeClass(["toolbar-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-colors", [
                      __props.darkMode ? "hover:bg-gray-700 text-gray-300 hover:text-white" : "hover:bg-gray-100 text-gray-600 hover:text-gray-900",
                      sidebarOpen.value ? __props.darkMode ? "bg-gray-700" : "bg-gray-100" : ""
                    ]]),
                    onClick: _cache[0] || (_cache[0] = withModifiers(($event) => sidebarOpen.value = !sidebarOpen.value, ["stop"])),
                    disabled: loading.value || error.value || tocItems.value.length === 0,
                    title: sidebarOpen.value ? unref(t)("fileView.preview.epub.closeToc") : unref(t)("fileView.preview.epub.toc")
                  }, [
                    createVNode(unref(IconMenu), {
                      size: "sm",
                      class: "w-4 h-4"
                    }),
                    createBaseVNode("span", _hoisted_4$8, toDisplayString(unref(t)("fileView.preview.epub.toc")), 1)
                  ], 10, _hoisted_3$8),
                  bookTitle.value ? (openBlock(), createElementBlock("div", _hoisted_5$7, [
                    createBaseVNode("div", {
                      class: normalizeClass(["text-sm font-medium truncate", __props.darkMode ? "text-gray-200" : "text-gray-800"])
                    }, toDisplayString(bookTitle.value), 3)
                  ])) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_6$4, [
                  createBaseVNode("div", {
                    class: normalizeClass(["flex items-center rounded-md overflow-hidden", __props.darkMode ? "bg-gray-700" : "bg-gray-100"])
                  }, [
                    createBaseVNode("button", {
                      type: "button",
                      class: normalizeClass(["px-2 py-1.5 transition-colors", [
                        __props.darkMode ? "text-gray-300" : "text-gray-600",
                        unref(readingHistory).canGoBack.value ? __props.darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200" : "opacity-40 cursor-not-allowed"
                      ]]),
                      onClick: withModifiers(historyBack, ["stop"]),
                      disabled: !unref(readingHistory).canGoBack.value || loading.value || error.value,
                      title: unref(t)("fileView.preview.epub.historyBack")
                    }, [
                      createVNode(unref(IconArrowLeft), {
                        size: "sm",
                        class: "w-4 h-4"
                      })
                    ], 10, _hoisted_7$3),
                    createBaseVNode("div", {
                      class: normalizeClass(["w-px h-4", __props.darkMode ? "bg-gray-600" : "bg-gray-300"])
                    }, null, 2),
                    createBaseVNode("button", {
                      type: "button",
                      class: normalizeClass(["px-2 py-1.5 transition-colors", [
                        __props.darkMode ? "text-gray-300" : "text-gray-600",
                        unref(readingHistory).canGoForward.value ? __props.darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200" : "opacity-40 cursor-not-allowed"
                      ]]),
                      onClick: withModifiers(historyForward, ["stop"]),
                      disabled: !unref(readingHistory).canGoForward.value || loading.value || error.value,
                      title: unref(t)("fileView.preview.epub.historyForward")
                    }, [
                      createVNode(unref(IconArrowRight), {
                        size: "sm",
                        class: "w-4 h-4"
                      })
                    ], 10, _hoisted_8$1)
                  ], 2),
                  createBaseVNode("button", {
                    type: "button",
                    class: normalizeClass(["px-2.5 py-1.5 rounded-md transition-colors", [
                      __props.darkMode ? "hover:bg-gray-700 text-gray-300 hover:text-white" : "hover:bg-gray-100 text-gray-600 hover:text-gray-900",
                      isCurrentBookmarked.value ? __props.darkMode ? "text-yellow-400" : "text-yellow-500" : ""
                    ]]),
                    onClick: withModifiers(toggleBookmark, ["stop"]),
                    disabled: loading.value || error.value || !viewReady.value || !currentCfi.value,
                    title: isCurrentBookmarked.value ? unref(t)("fileView.preview.epub.removeBookmark") : unref(t)("fileView.preview.epub.addBookmark")
                  }, [
                    isCurrentBookmarked.value ? (openBlock(), createBlock(unref(IconBookmarkSolid), {
                      key: 0,
                      size: "sm",
                      class: "w-4 h-4"
                    })) : (openBlock(), createBlock(unref(IconBookmark), {
                      key: 1,
                      size: "sm",
                      class: "w-4 h-4"
                    }))
                  ], 10, _hoisted_9$1),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => flowMode.value = $event),
                    class: normalizeClass(["text-sm px-2 py-1.5 rounded-md border-0 cursor-pointer transition-colors", __props.darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"]),
                    disabled: loading.value || error.value || !viewReady.value,
                    title: unref(t)("fileView.preview.epub.readingMode")
                  }, [
                    createBaseVNode("option", _hoisted_11$1, toDisplayString(unref(t)("fileView.preview.epub.modePaginated")), 1),
                    createBaseVNode("option", _hoisted_12$1, toDisplayString(unref(t)("fileView.preview.epub.modeScrolled")), 1)
                  ], 10, _hoisted_10$1), [
                    [vModelSelect, flowMode.value]
                  ]),
                  createBaseVNode("div", {
                    class: normalizeClass(["flex items-center rounded-md overflow-hidden", __props.darkMode ? "bg-gray-700" : "bg-gray-100"])
                  }, [
                    createBaseVNode("button", {
                      type: "button",
                      class: normalizeClass(["px-3 py-1.5 transition-colors", __props.darkMode ? "hover:bg-gray-600 text-gray-300" : "hover:bg-gray-200 text-gray-600"]),
                      onClick: withModifiers(goLeft, ["stop"]),
                      disabled: loading.value || error.value || !viewReady.value,
                      title: unref(t)("fileView.preview.epub.prevPage")
                    }, [
                      createVNode(unref(IconChevronLeft), {
                        size: "sm",
                        class: "w-4 h-4"
                      })
                    ], 10, _hoisted_13$1),
                    createBaseVNode("div", {
                      class: normalizeClass(["w-px h-4", __props.darkMode ? "bg-gray-600" : "bg-gray-300"])
                    }, null, 2),
                    createBaseVNode("button", {
                      type: "button",
                      class: normalizeClass(["px-3 py-1.5 transition-colors", __props.darkMode ? "hover:bg-gray-600 text-gray-300" : "hover:bg-gray-200 text-gray-600"]),
                      onClick: withModifiers(goRight, ["stop"]),
                      disabled: loading.value || error.value || !viewReady.value,
                      title: unref(t)("fileView.preview.epub.nextPage")
                    }, [
                      createVNode(unref(IconChevronRight), {
                        size: "sm",
                        class: "w-4 h-4"
                      })
                    ], 10, _hoisted_14$1)
                  ], 2)
                ])
              ], 2)
            ], 512), [
              [vShow, toolbarVisible.value || loading.value || error.value]
            ])
          ]),
          _: 1
        }),
        createBaseVNode("div", _hoisted_15$1, [
          createVNode(Transition, { name: "sidebar-fade" }, {
            default: withCtx(() => [
              sidebarOpen.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "absolute inset-0 z-10 bg-black/30",
                onClick: _cache[2] || (_cache[2] = ($event) => sidebarOpen.value = false)
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          createVNode(Transition, { name: "sidebar-slide" }, {
            default: withCtx(() => [
              sidebarOpen.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["absolute left-0 top-0 bottom-0 z-20 w-72 max-w-[80%] flex flex-col shadow-xl", __props.darkMode ? "bg-gray-800" : "bg-white"]),
                onClick: _cache[4] || (_cache[4] = withModifiers(() => {
                }, ["stop"]))
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["flex items-center justify-between p-4 border-b", __props.darkMode ? "border-gray-700" : "border-gray-200"])
                }, [
                  createBaseVNode("div", _hoisted_16$1, [
                    createBaseVNode("div", {
                      class: normalizeClass(["text-base font-semibold truncate", __props.darkMode ? "text-gray-100" : "text-gray-900"])
                    }, toDisplayString(bookTitle.value || "EPUB"), 3),
                    bookAuthor.value ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: normalizeClass(["text-sm truncate mt-0.5", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                    }, toDisplayString(bookAuthor.value), 3)) : createCommentVNode("", true)
                  ]),
                  createBaseVNode("button", {
                    type: "button",
                    class: normalizeClass(["ml-2 p-1.5 rounded-md transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"]),
                    onClick: _cache[3] || (_cache[3] = ($event) => sidebarOpen.value = false),
                    title: unref(t)("fileView.preview.epub.closeToc")
                  }, [
                    createVNode(unref(IconClose), {
                      size: "sm",
                      class: "w-5 h-5"
                    })
                  ], 10, _hoisted_17)
                ], 2),
                createBaseVNode("div", _hoisted_18, [
                  bookmarksList.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_19, [
                    createBaseVNode("div", {
                      class: normalizeClass(["text-xs font-semibold uppercase tracking-wider px-2 py-1 mb-1", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                    }, toDisplayString(unref(t)("fileView.preview.epub.bookmarks")), 3),
                    createBaseVNode("ul", _hoisted_20, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(bookmarksList.value, (bookmark) => {
                        return openBlock(), createElementBlock("li", {
                          key: bookmark.cfi,
                          class: "group"
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["flex items-center gap-1 rounded-md transition-colors cursor-pointer", __props.darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"])
                          }, [
                            createBaseVNode("button", {
                              type: "button",
                              class: normalizeClass(["flex-1 text-left text-sm py-2 px-2 rounded transition-colors truncate flex items-center gap-2", __props.darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"]),
                              onClick: ($event) => goToBookmark(bookmark),
                              title: bookmark.title
                            }, [
                              createVNode(unref(IconBookmarkSolid), {
                                size: "sm",
                                class: normalizeClass(["w-3 h-3 flex-shrink-0", __props.darkMode ? "text-yellow-400" : "text-yellow-500"])
                              }, null, 8, ["class"]),
                              createBaseVNode("span", _hoisted_22, toDisplayString(bookmark.title || unref(t)("fileView.preview.epub.untitledBookmark")), 1)
                            ], 10, _hoisted_21),
                            createBaseVNode("button", {
                              type: "button",
                              class: normalizeClass(["p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity", __props.darkMode ? "hover:bg-gray-600 text-gray-400" : "hover:bg-gray-200 text-gray-500"]),
                              onClick: withModifiers(($event) => epubProgress.value?.removeBookmark(bookmark.cfi), ["stop"]),
                              title: unref(t)("fileView.preview.epub.removeBookmark")
                            }, [
                              createVNode(unref(IconClose), {
                                size: "sm",
                                class: "w-3 h-3"
                              })
                            ], 10, _hoisted_23)
                          ], 2)
                        ]);
                      }), 128))
                    ]),
                    createBaseVNode("div", {
                      class: normalizeClass(["border-b my-2", __props.darkMode ? "border-gray-700" : "border-gray-200"])
                    }, null, 2)
                  ])) : createCommentVNode("", true),
                  tocItems.value.length > 0 ? (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(["text-xs font-semibold uppercase tracking-wider px-2 py-1 mb-1", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                  }, toDisplayString(unref(t)("fileView.preview.epub.toc")), 3)) : createCommentVNode("", true),
                  !tocItems.value.length && !bookmarksList.value.length ? (openBlock(), createElementBlock("div", {
                    key: 2,
                    class: normalizeClass(["text-sm p-3", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                  }, toDisplayString(unref(t)("fileView.preview.epub.noToc")), 3)) : createCommentVNode("", true),
                  tocItems.value.length ? (openBlock(), createElementBlock("ul", _hoisted_24, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(tocItems.value, (node) => {
                      return openBlock(), createBlock(unref(TocNode), {
                        key: nodeKey(node),
                        node,
                        "dark-mode": __props.darkMode,
                        onGo: goToToc
                      }, null, 8, ["node", "dark-mode"]);
                    }), 128))
                  ])) : createCommentVNode("", true)
                ])
              ], 2)) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          createBaseVNode("div", {
            ref_key: "hostRef",
            ref: hostRef,
            class: "w-full h-full"
          }, null, 512),
          loading.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["absolute inset-0 flex items-center justify-center", __props.darkMode ? "bg-gray-900" : "bg-white"])
          }, [
            createVNode(_sfc_main$e, {
              text: __props.loadingText,
              "dark-mode": __props.darkMode,
              size: "xl",
              "icon-class": "text-blue-500",
              "text-class": __props.darkMode ? "text-blue-400" : "text-blue-600"
            }, null, 8, ["text", "dark-mode", "text-class"])
          ], 2)) : error.value ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(["absolute inset-0 flex items-center justify-center", __props.darkMode ? "bg-gray-900" : "bg-white"])
          }, [
            createBaseVNode("div", _hoisted_25, [
              createVNode(unref(IconExclamation), { class: "h-12 w-12 text-red-500 mx-auto mb-3" }),
              createBaseVNode("p", {
                class: normalizeClass(["text-base", __props.darkMode ? "text-red-400" : "text-red-600"])
              }, toDisplayString(__props.errorText), 3)
            ])
          ], 2)) : createCommentVNode("", true)
        ]),
        createVNode(Transition, { name: "toolbar-fade" }, {
          default: withCtx(() => [
            withDirectives(createBaseVNode("div", _hoisted_26, [
              createBaseVNode("div", {
                class: normalizeClass(["px-4 py-3 backdrop-blur-sm", __props.darkMode ? "bg-gray-800/90" : "bg-white/90"])
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["relative h-1 rounded-full overflow-hidden mb-2", __props.darkMode ? "bg-gray-700" : "bg-gray-200"])
                }, [
                  createBaseVNode("div", {
                    class: normalizeClass(["absolute left-0 top-0 h-full rounded-full transition-all duration-300", __props.darkMode ? "bg-blue-500" : "bg-blue-600"]),
                    style: normalizeStyle({ width: `${fraction.value * 100}%` })
                  }, null, 6),
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "0",
                    max: "1",
                    step: "0.0001",
                    dir: bookDir.value,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => fraction.value = $event),
                    onChange: handleGoToFraction,
                    disabled: loading.value || error.value || !viewReady.value,
                    class: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
                    title: progressTitle.value
                  }, null, 40, _hoisted_27), [
                    [
                      vModelText,
                      fraction.value,
                      void 0,
                      { number: true }
                    ]
                  ])
                ], 2),
                createBaseVNode("div", _hoisted_28, [
                  createBaseVNode("span", {
                    class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
                  }, toDisplayString(progressTitle.value || percentText.value), 3),
                  createBaseVNode("span", {
                    class: normalizeClass(["font-medium", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                  }, toDisplayString(percentText.value), 3)
                ])
              ], 2)
            ], 512), [
              [vShow, (toolbarVisible.value || loading.value || error.value) && viewReady.value]
            ])
          ]),
          _: 1
        }),
        viewReady.value && !loading.value && !error.value && flowMode.value === "paginated" ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "absolute inset-y-0 left-0 w-1/4 cursor-pointer z-10 opacity-0 hover:opacity-100 transition-opacity",
          onClick: withModifiers(goLeft, ["stop"])
        }, [
          createBaseVNode("div", _hoisted_29, [
            createBaseVNode("div", {
              class: normalizeClass(["p-3 rounded-full transition-colors", __props.darkMode ? "bg-gray-800/50 text-gray-300" : "bg-white/50 text-gray-600"])
            }, [
              createVNode(unref(IconChevronLeft), {
                size: "lg",
                class: "w-6 h-6"
              })
            ], 2)
          ])
        ])) : createCommentVNode("", true),
        viewReady.value && !loading.value && !error.value && flowMode.value === "paginated" ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "absolute inset-y-0 right-0 w-1/4 cursor-pointer z-10 opacity-0 hover:opacity-100 transition-opacity",
          onClick: withModifiers(goRight, ["stop"])
        }, [
          createBaseVNode("div", _hoisted_30, [
            createBaseVNode("div", {
              class: normalizeClass(["p-3 rounded-full transition-colors", __props.darkMode ? "bg-gray-800/50 text-gray-300" : "bg-white/50 text-gray-600"])
            }, [
              createVNode(unref(IconChevronRight), {
                size: "lg",
                class: "w-6 h-6"
              })
            ], 2)
          ])
        ])) : createCommentVNode("", true)
      ], 34);
    };
  }
};
const FoliateEpubView = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-3f019ef4"]]);
const _hoisted_1$8 = { class: "iframe-preview flex flex-col h-full w-full relative bg-white dark:bg-gray-800" };
const _hoisted_2$8 = { class: "iframe-container relative flex-grow h-[calc(100vh-350px)] min-h-[300px]" };
const _hoisted_3$7 = ["src"];
const _hoisted_4$7 = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
};
const _hoisted_5$6 = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
};
const _hoisted_6$3 = { class: "text-red-600 dark:text-red-400 text-sm" };
const _sfc_main$9 = {
  __name: "IframePreview",
  props: {
    /** 预览渠道配置对象，格式：{ key: url } */
    providers: {
      type: Object,
      default: () => ({})
    },
    /** 暗色模式 */
    darkMode: {
      type: Boolean,
      default: false
    },
    /** 加载中提示文本 */
    loadingText: {
      type: String,
      default: ""
    },
    /** 错误提示文本 */
    errorText: {
      type: String,
      default: ""
    },
    /** 外部传入的选中渠道 key（可选，用于父组件控制） */
    selectedProvider: {
      type: String,
      default: ""
    }
  },
  emits: ["load", "error", "provider-options"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const loading = ref(true);
    const error = ref(false);
    const { providerOptions, selectedKey: internalSelectedKey, currentUrl: currentPreviewUrl } = useProviderSelector({
      providers: computed(() => props.providers || {}),
      nativeUrl: "",
      filter: ({ url }) => url !== "native"
    });
    watch(
      () => props.selectedProvider,
      (newKey) => {
        if (newKey && providerOptions.value.some((opt) => opt.key === newKey)) {
          internalSelectedKey.value = newKey;
        }
      },
      { immediate: true }
    );
    watch(
      providerOptions,
      (options) => {
        emit("provider-options", options);
      },
      { immediate: true }
    );
    const handleLoad = () => {
      loading.value = false;
      error.value = false;
      emit("load");
    };
    const handleError = () => {
      loading.value = false;
      error.value = true;
      emit("error");
    };
    watch(
      currentPreviewUrl,
      (url) => {
        if (!url) return;
        loading.value = true;
        error.value = false;
      },
      { immediate: true }
    );
    __expose({
      providerOptions,
      selectedKey: internalSelectedKey,
      currentUrl: currentPreviewUrl
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createBaseVNode("div", _hoisted_2$8, [
          withDirectives(createBaseVNode("iframe", {
            src: unref(currentPreviewUrl),
            allow: "fullscreen",
            allowfullscreen: "",
            frameborder: "0",
            class: "w-full h-full",
            onLoad: handleLoad,
            onError: handleError
          }, null, 40, _hoisted_3$7), [
            [vShow, !!unref(currentPreviewUrl) && !loading.value && !error.value]
          ]),
          loading.value ? (openBlock(), createElementBlock("div", _hoisted_4$7, [
            createVNode(_sfc_main$e, {
              text: __props.loadingText || unref(t)("fileView.preview.loading"),
              "dark-mode": __props.darkMode,
              size: "xl",
              "icon-class": "text-blue-500",
              "text-class": __props.darkMode ? "text-blue-400" : "text-blue-600"
            }, null, 8, ["text", "dark-mode", "text-class"])
          ])) : error.value ? (openBlock(), createElementBlock("div", _hoisted_5$6, [
            createBaseVNode("p", _hoisted_6$3, toDisplayString(__props.errorText || unref(t)("fileView.preview.error")), 1)
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
};
const _sfc_main$8 = {
  __name: "TextDisplay",
  props: {
    content: {
      type: String,
      required: true
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const textClass = computed(() => ({
      "text-content-dark": props.darkMode,
      "text-content-light": !props.darkMode
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["text-display", { "text-display-dark": __props.darkMode }])
      }, [
        createBaseVNode("pre", {
          class: normalizeClass(["text-content", textClass.value])
        }, toDisplayString(__props.content), 3)
      ], 2);
    };
  }
};
const TextDisplay = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-82ca5e77"]]);
function useCodeHighlight() {
  const log2 = createLogger("CodeHighlight");
  const isHighlightLoaded = ref(false);
  const highlightInstance = ref(null);
  const loadingError = ref(null);
  const supportedLanguages = ref([
    "javascript",
    "typescript",
    "python",
    "java",
    "cpp",
    "c",
    "csharp",
    "php",
    "ruby",
    "go",
    "rust",
    "swift",
    "kotlin",
    "scala",
    "dart",
    "r",
    "html",
    "css",
    "scss",
    "less",
    "sass",
    "xml",
    "json",
    "yaml",
    "toml",
    "sql",
    "bash",
    "shell",
    "powershell",
    "dockerfile",
    "nginx",
    "markdown",
    "latex",
    "makefile",
    "cmake",
    "gradle",
    "maven",
    "vue",
    "jsx",
    "tsx",
    "svelte",
    "angular",
    "react",
    "perl",
    "lua",
    "vim",
    "ini",
    "properties",
    "diff",
    "patch"
  ]);
  const availableThemes = ref([
    { value: "github", label: "GitHub", description: "经典GitHub风格" },
    { value: "vs2015", label: "VS2015", description: "Visual Studio 2015暗色主题" },
    { value: "atom-one-dark", label: "Atom One Dark", description: "Atom编辑器暗色主题" },
    { value: "atom-one-light", label: "Atom One Light", description: "Atom编辑器亮色主题" },
    { value: "monokai", label: "Monokai", description: "经典Monokai主题" },
    { value: "dracula", label: "Dracula", description: "Dracula暗色主题" },
    { value: "tomorrow", label: "Tomorrow", description: "Tomorrow亮色主题" },
    { value: "tomorrow-night", label: "Tomorrow Night", description: "Tomorrow暗色主题" },
    { value: "solarized-light", label: "Solarized Light", description: "Solarized亮色主题" },
    { value: "solarized-dark", label: "Solarized Dark", description: "Solarized暗色主题" }
  ]);
  const isReady = computed(() => isHighlightLoaded.value && !loadingError.value);
  const loadHighlightJs = async () => {
    if (highlightInstance.value) {
      return highlightInstance.value;
    }
    try {
      loadingError.value = null;
      if (window.hljs) {
        log2.debug("使用已加载的 highlight.js 实例");
        highlightInstance.value = window.hljs;
        isHighlightLoaded.value = true;
        return highlightInstance.value;
      }
      log2.debug("通过 Vditor 方式加载 highlight.js");
      await loadScript(`${VDITOR_ASSETS_BASE}/dist/js/highlight.js/highlight.min.js`);
      await loadScript(`${VDITOR_ASSETS_BASE}/dist/js/highlight.js/third-languages.js`);
      await waitForGlobal("hljs", 5e3);
      highlightInstance.value = window.hljs;
      isHighlightLoaded.value = true;
      log2.debug("highlight.js 加载成功，支持语言:", window.hljs.listLanguages());
      return highlightInstance.value;
    } catch (error) {
      log2.error("加载 highlight.js 失败:", error);
      loadingError.value = error.message;
      throw error;
    }
  };
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`无法加载脚本: ${src}`));
      document.head.appendChild(script);
    });
  };
  const waitForGlobal = (globalName, timeout = 5e3) => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const check = () => {
        if (window[globalName]) {
          resolve();
        } else if (Date.now() - startTime > timeout) {
          reject(new Error(`等待全局变量 ${globalName} 超时`));
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  };
  const highlightCode = async (code, language = "", options = {}) => {
    if (!code || typeof code !== "string") {
      return {
        success: false,
        html: "",
        language: "",
        error: "代码内容为空或无效"
      };
    }
    try {
      const hljs = await loadHighlightJs();
      let result;
      if (language && supportedLanguages.value.includes(language.toLowerCase())) {
        try {
          result = hljs.highlight(code, { language: language.toLowerCase() });
        } catch (err) {
          log2.warn(`指定语言 ${language} 高亮失败，尝试自动检测:`, err);
          result = hljs.highlightAuto(code);
        }
      } else {
        result = hljs.highlightAuto(code);
      }
      return {
        success: true,
        html: result.value,
        language: result.language || "plaintext",
        relevance: result.relevance || 0,
        error: null
      };
    } catch (error) {
      log2.error("代码高亮失败:", error);
      return {
        success: false,
        html: escapeHtml(code),
        // 返回转义的原始代码
        language: language || "plaintext",
        relevance: 0,
        error: error.message
      };
    }
  };
  const detectLanguageFromFilename = (filename) => {
    if (!filename) return "";
    const ext = filename.split(".").pop()?.toLowerCase();
    const extensionMap = {
      // JavaScript 系列
      js: "javascript",
      jsx: "javascript",
      ts: "typescript",
      tsx: "typescript",
      vue: "vue",
      mjs: "javascript",
      cjs: "javascript",
      // Python
      py: "python",
      pyw: "python",
      pyi: "python",
      // Java 系列
      java: "java",
      kt: "kotlin",
      kts: "kotlin",
      scala: "scala",
      // C 系列
      c: "c",
      h: "c",
      cpp: "cpp",
      cxx: "cpp",
      cc: "cpp",
      hpp: "cpp",
      hxx: "cpp",
      cs: "csharp",
      // Web 技术
      html: "html",
      htm: "html",
      xhtml: "html",
      css: "css",
      scss: "scss",
      sass: "sass",
      less: "less",
      // 数据格式
      json: "json",
      xml: "xml",
      yaml: "yaml",
      yml: "yaml",
      toml: "toml",
      ini: "ini",
      cfg: "ini",
      conf: "ini",
      // 脚本语言
      php: "php",
      rb: "ruby",
      go: "go",
      rs: "rust",
      swift: "swift",
      dart: "dart",
      r: "r",
      R: "r",
      perl: "perl",
      pl: "perl",
      lua: "lua",
      // Shell 脚本
      sh: "bash",
      bash: "bash",
      zsh: "bash",
      fish: "bash",
      ps1: "powershell",
      psm1: "powershell",
      // 数据库
      sql: "sql",
      // 配置文件
      dockerfile: "dockerfile",
      makefile: "makefile",
      cmake: "cmake",
      gradle: "gradle",
      maven: "xml",
      // 文档
      md: "markdown",
      markdown: "markdown",
      tex: "latex",
      latex: "latex",
      // 其他
      vim: "vim",
      diff: "diff",
      patch: "diff"
    };
    return extensionMap[ext] || "";
  };
  const loadTheme = async (theme, darkMode = false) => {
    if (!theme) {
      theme = darkMode ? "vs2015" : "github";
    }
    try {
      const oldStyle = document.getElementById("hljs-theme");
      if (oldStyle) {
        oldStyle.remove();
      }
      const possiblePaths = [
        `${VDITOR_ASSETS_BASE}/dist/js/highlight.js/styles/${theme}.min.css`,
        `${VDITOR_ASSETS_BASE}/dist/js/highlight.js/styles/${theme}.css`
      ];
      let loaded = false;
      for (const path of possiblePaths) {
        try {
          await loadStylesheet(path, "hljs-theme");
          log2.debug(`成功加载主题: ${theme} from ${path}`);
          loaded = true;
          break;
        } catch (err) {
          log2.warn(`无法从 ${path} 加载主题 ${theme}:`, err.message);
        }
      }
      if (!loaded) {
        log2.warn(`所有路径都无法加载主题 ${theme}，使用默认样式`);
      }
    } catch (error) {
      log2.error("加载主题失败:", error);
    }
  };
  const loadStylesheet = (href, id) => {
    return new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = href;
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`无法加载样式表: ${href}`));
      document.head.appendChild(link);
    });
  };
  const escapeHtml = (text) => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  };
  const getRecommendedTheme = (darkMode) => {
    return darkMode ? "vs2015" : "github";
  };
  return {
    // 状态
    isHighlightLoaded,
    loadingError,
    supportedLanguages,
    availableThemes,
    // 计算属性
    isReady,
    // 方法
    loadHighlightJs,
    highlightCode,
    detectLanguageFromFilename,
    loadTheme,
    getRecommendedTheme
  };
}
const _hoisted_1$7 = {
  key: 0,
  class: "loading-state"
};
const _hoisted_2$7 = {
  key: 1,
  class: "error-state"
};
const _hoisted_3$6 = { class: "error-text" };
const _hoisted_4$6 = { class: "fallback-code" };
const _hoisted_5$5 = ["innerHTML"];
const _sfc_main$7 = {
  __name: "CodeDisplay",
  props: {
    content: {
      type: String,
      required: true
    },
    language: {
      type: String,
      default: ""
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    showLineNumbers: {
      type: Boolean,
      default: true
    },
    filename: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const { t } = useI18n();
    const log2 = createLogger("CodeDisplay");
    const props = __props;
    const codeContainer = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const highlightedCode = ref("");
    const { highlightCode, detectLanguageFromFilename, loadTheme } = useCodeHighlight();
    const renderCode = async () => {
      if (!props.content) {
        highlightedCode.value = "";
        return;
      }
      try {
        loading.value = true;
        error.value = null;
        let language = props.language;
        if (!language && props.filename) {
          language = detectLanguageFromFilename(props.filename);
        }
        await loadTheme(null, props.darkMode);
        const result = await highlightCode(props.content, language);
        if (result.success) {
          let html = `<pre class="hljs-pre"><code class="hljs language-${result.language}">${result.html}</code></pre>`;
          if (props.showLineNumbers && props.content.split("\n").length > 1) {
            html = addLineNumbersToHTML(html, props.content);
          }
          highlightedCode.value = html;
        } else {
          throw new Error(result.error || "Code highlighting failed");
        }
      } catch (err) {
        log2.error("代码高亮渲染失败:", err);
        error.value = err.message;
        highlightedCode.value = `<pre class="hljs-pre"><code class="hljs">${escapeHtml(props.content)}</code></pre>`;
      } finally {
        loading.value = false;
      }
    };
    const addLineNumbersToHTML = (html, content) => {
      if (!props.showLineNumbers) {
        return html;
      }
      const lineCount = content.split("\n").length;
      const lineNumbers = [];
      lineNumbers.push('<div class="hljs-line-numbers">');
      for (let i = 1; i <= lineCount; i++) {
        lineNumbers.push(`<div class="hljs-line-number">${i}</div>`);
      }
      lineNumbers.push("</div>");
      const lineNumbersHTML = lineNumbers.join("");
      const wrappedHTML = html.replace(
        /<pre class="hljs-pre"><code class="([^"]*)">([\s\S]*?)<\/code><\/pre>/,
        `<pre class="hljs-pre hljs-with-line-numbers">${lineNumbersHTML}<div class="hljs-code-wrapper"><code class="$1">$2</code></div></pre>`
      );
      return wrappedHTML;
    };
    const escapeHtml = (text) => {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    };
    let renderTimer = null;
    const debouncedRender = () => {
      if (renderTimer) {
        clearTimeout(renderTimer);
      }
      renderTimer = setTimeout(() => {
        renderCode();
        renderTimer = null;
      }, 100);
    };
    watchEffect(() => {
      const { content, language, darkMode, showLineNumbers, filename } = props;
      if (!content) {
        highlightedCode.value = "";
        return;
      }
      debouncedRender();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["code-display", { "code-display-dark": __props.darkMode }])
      }, [
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_1$7, [
          createVNode(_sfc_main$e, {
            text: _ctx.$t("textPreview.loadingHighlight"),
            "dark-mode": __props.darkMode,
            size: "xl",
            "icon-class": __props.darkMode ? "text-primary-500" : "text-primary-600"
          }, null, 8, ["text", "dark-mode", "icon-class"])
        ])) : error.value ? (openBlock(), createElementBlock("div", _hoisted_2$7, [
          createBaseVNode("p", _hoisted_3$6, toDisplayString(error.value), 1),
          createBaseVNode("pre", _hoisted_4$6, toDisplayString(__props.content), 1)
        ])) : (openBlock(), createElementBlock("div", {
          key: 2,
          ref_key: "codeContainer",
          ref: codeContainer,
          class: "code-container",
          innerHTML: highlightedCode.value
        }, null, 8, _hoisted_5$5))
      ], 2);
    };
  }
};
const CodeDisplay = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-60e1e369"]]);
const _hoisted_1$6 = { class: "html-rendered" };
const _hoisted_2$6 = ["srcdoc"];
const _sfc_main$6 = {
  __name: "HtmlDisplay",
  props: {
    content: {
      type: String,
      required: true
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const htmlFrame = ref(null);
    const wrappedContent = computed(() => {
      if (!props.content) return "";
      const isFullDocument = props.content.toLowerCase().includes("<!doctype") || props.content.toLowerCase().includes("<html");
      if (isFullDocument) {
        let modifiedContent = props.content.replace(
          /<body([^>]*)>/i,
          `<body$1 style="padding: 1.5rem; margin: 0; box-sizing: border-box; background-color: ${props.darkMode ? "#1f2937" : "#ffffff"}; color: ${props.darkMode ? "#d4d4d4" : "#374151"}; min-height: 100vh; overflow-x: auto; overflow-y: auto; position: relative; min-width: 800px;">`
        );
        if (!modifiedContent.includes('style="')) {
          modifiedContent = modifiedContent.replace(
            /<\/head>/i,
            `<style>
          html, body {
            margin: 0;
            padding: 1.5rem;
            box-sizing: border-box;
            background-color: ${props.darkMode ? "#1f2937" : "#ffffff"};
            color: ${props.darkMode ? "#d4d4d4" : "#374151"};
            min-height: 100vh;
            overflow-x: auto;
            overflow-y: auto;
            position: relative;
            min-width: 800px;
          }

          /* 自定义滚动条样式 - 与其他预览模式保持一致 */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          ::-webkit-scrollbar-track {
            background-color: ${props.darkMode ? "#374151" : "#f3f4f6"};
          }

          ::-webkit-scrollbar-thumb {
            background-color: ${props.darkMode ? "#6b7280" : "#d1d5db"};
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background-color: #9ca3af;
          }
        </style>
        </head>`
          );
        }
        return modifiedContent;
      } else {
        return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    html, body {
      margin: 0;
      padding: 1.5rem;
      box-sizing: border-box;
      font-family: system-ui, -apple-system, sans-serif;
      background-color: ${props.darkMode ? "#1f2937" : "#ffffff"};
      color: ${props.darkMode ? "#d4d4d4" : "#374151"};
      line-height: 1.6;
      min-height: 100vh;
      overflow-x: auto;
      overflow-y: auto;
    }

    /* 确保绝对定位元素不会被截断 */
    body {
      position: relative;
      min-width: 800px;
    }

    /* 自定义滚动条样式 - 与其他预览模式保持一致 */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-track {
      background-color: ${props.darkMode ? "#374151" : "#f3f4f6"};
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${props.darkMode ? "#6b7280" : "#d1d5db"};
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #9ca3af;
    }
  </style>
</head>
<body>
  ${props.content}
</body>
</html>`;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["html-display", { "html-display-dark": __props.darkMode }])
      }, [
        createBaseVNode("div", _hoisted_1$6, [
          createBaseVNode("iframe", {
            ref_key: "htmlFrame",
            ref: htmlFrame,
            class: "html-iframe",
            sandbox: "allow-scripts allow-same-origin",
            srcdoc: wrappedContent.value
          }, null, 8, _hoisted_2$6)
        ])
      ], 2);
    };
  }
};
const HtmlDisplay = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-ecaa09ec"]]);
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function(key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = void 0;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function compose$1() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function(x) {
    return fns.reduceRight(function(y, f) {
      return f(y);
    }, x);
  };
}
function curry$1(fn) {
  return function curried() {
    var _this = this;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return args.length >= fn.length ? fn.apply(this, args) : function() {
      for (var _len3 = arguments.length, nextArgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        nextArgs[_key3] = arguments[_key3];
      }
      return curried.apply(_this, [].concat(args, nextArgs));
    };
  };
}
function isObject$1(value) {
  return {}.toString.call(value).includes("Object");
}
function isEmpty(obj) {
  return !Object.keys(obj).length;
}
function isFunction(value) {
  return typeof value === "function";
}
function hasOwnProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}
function validateChanges(initial, changes) {
  if (!isObject$1(changes)) errorHandler$1("changeType");
  if (Object.keys(changes).some(function(field) {
    return !hasOwnProperty(initial, field);
  })) errorHandler$1("changeField");
  return changes;
}
function validateSelector(selector) {
  if (!isFunction(selector)) errorHandler$1("selectorType");
}
function validateHandler(handler) {
  if (!(isFunction(handler) || isObject$1(handler))) errorHandler$1("handlerType");
  if (isObject$1(handler) && Object.values(handler).some(function(_handler) {
    return !isFunction(_handler);
  })) errorHandler$1("handlersType");
}
function validateInitial(initial) {
  if (!initial) errorHandler$1("initialIsRequired");
  if (!isObject$1(initial)) errorHandler$1("initialType");
  if (isEmpty(initial)) errorHandler$1("initialContent");
}
function throwError$1(errorMessages2, type) {
  throw new Error(errorMessages2[type] || errorMessages2["default"]);
}
var errorMessages$1 = {
  initialIsRequired: "initial state is required",
  initialType: "initial state should be an object",
  initialContent: "initial state shouldn't be an empty object",
  handlerType: "handler should be an object or a function",
  handlersType: "all handlers should be a functions",
  selectorType: "selector should be a function",
  changeType: "provided value of changes should be an object",
  changeField: 'it seams you want to change a field in the state which is not specified in the "initial" state',
  "default": "an unknown error accured in `state-local` package"
};
var errorHandler$1 = curry$1(throwError$1)(errorMessages$1);
var validators$1 = {
  changes: validateChanges,
  selector: validateSelector,
  handler: validateHandler,
  initial: validateInitial
};
function create(initial) {
  var handler = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  validators$1.initial(initial);
  validators$1.handler(handler);
  var state = {
    current: initial
  };
  var didUpdate = curry$1(didStateUpdate)(state, handler);
  var update = curry$1(updateState)(state);
  var validate = curry$1(validators$1.changes)(initial);
  var getChanges = curry$1(extractChanges)(state);
  function getState2() {
    var selector = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function(state2) {
      return state2;
    };
    validators$1.selector(selector);
    return selector(state.current);
  }
  function setState2(causedChanges) {
    compose$1(didUpdate, update, validate, getChanges)(causedChanges);
  }
  return [getState2, setState2];
}
function extractChanges(state, causedChanges) {
  return isFunction(causedChanges) ? causedChanges(state.current) : causedChanges;
}
function updateState(state, changes) {
  state.current = _objectSpread2(_objectSpread2({}, state.current), changes);
  return changes;
}
function didStateUpdate(state, handler, changes) {
  isFunction(handler) ? handler(state.current) : Object.keys(changes).forEach(function(field) {
    var _handler$field;
    return (_handler$field = handler[field]) === null || _handler$field === void 0 ? void 0 : _handler$field.call(handler, state.current[field]);
  });
  return changes;
}
var index = {
  create
};
var config$1 = {
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs"
  }
};
function curry(fn) {
  return function curried() {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return args.length >= fn.length ? fn.apply(this, args) : function() {
      for (var _len2 = arguments.length, nextArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        nextArgs[_key2] = arguments[_key2];
      }
      return curried.apply(_this, [].concat(args, nextArgs));
    };
  };
}
function isObject(value) {
  return {}.toString.call(value).includes("Object");
}
function validateConfig(config2) {
  if (!config2) errorHandler("configIsRequired");
  if (!isObject(config2)) errorHandler("configType");
  if (config2.urls) {
    informAboutDeprecation();
    return {
      paths: {
        vs: config2.urls.monacoBase
      }
    };
  }
  return config2;
}
function informAboutDeprecation() {
  console.warn(errorMessages.deprecation);
}
function throwError(errorMessages2, type) {
  throw new Error(errorMessages2[type] || errorMessages2["default"]);
}
var errorMessages = {
  configIsRequired: "the configuration object is required",
  configType: "the configuration object should be an object",
  "default": "an unknown error accured in `@monaco-editor/loader` package",
  deprecation: "Deprecation warning!\n    You are using deprecated way of configuration.\n\n    Instead of using\n      monaco.config({ urls: { monacoBase: '...' } })\n    use\n      monaco.config({ paths: { vs: '...' } })\n\n    For more please check the link https://github.com/suren-atoyan/monaco-loader#config\n  "
};
var errorHandler = curry(throwError)(errorMessages);
var validators = {
  config: validateConfig
};
var compose = function compose2() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function(x) {
    return fns.reduceRight(function(y, f) {
      return f(y);
    }, x);
  };
};
function merge(target, source) {
  Object.keys(source).forEach(function(key) {
    if (source[key] instanceof Object) {
      if (target[key]) {
        Object.assign(source[key], merge(target[key], source[key]));
      }
    }
  });
  return _objectSpread2$1(_objectSpread2$1({}, target), source);
}
var CANCELATION_MESSAGE = {
  type: "cancelation",
  msg: "operation is manually canceled"
};
function makeCancelable(promise) {
  var hasCanceled_ = false;
  var wrappedPromise = new Promise(function(resolve, reject) {
    promise.then(function(val) {
      return hasCanceled_ ? reject(CANCELATION_MESSAGE) : resolve(val);
    });
    promise["catch"](reject);
  });
  return wrappedPromise.cancel = function() {
    return hasCanceled_ = true;
  }, wrappedPromise;
}
var _state$create = index.create({
  config: config$1,
  isInitialized: false,
  resolve: null,
  reject: null,
  monaco: null
}), _state$create2 = _slicedToArray(_state$create, 2), getState = _state$create2[0], setState = _state$create2[1];
function config(globalConfig) {
  var _validators$config = validators.config(globalConfig), monaco = _validators$config.monaco, config2 = _objectWithoutProperties(_validators$config, ["monaco"]);
  setState(function(state) {
    return {
      config: merge(state.config, config2),
      monaco
    };
  });
}
function init() {
  var state = getState(function(_ref) {
    var monaco = _ref.monaco, isInitialized = _ref.isInitialized, resolve = _ref.resolve;
    return {
      monaco,
      isInitialized,
      resolve
    };
  });
  if (!state.isInitialized) {
    setState({
      isInitialized: true
    });
    if (state.monaco) {
      state.resolve(state.monaco);
      return makeCancelable(wrapperPromise);
    }
    if (window.monaco && window.monaco.editor) {
      storeMonacoInstance(window.monaco);
      state.resolve(window.monaco);
      return makeCancelable(wrapperPromise);
    }
    compose(injectScripts, getMonacoLoaderScript)(configureLoader);
  }
  return makeCancelable(wrapperPromise);
}
function injectScripts(script) {
  return document.body.appendChild(script);
}
function createScript(src) {
  var script = document.createElement("script");
  return src && (script.src = src), script;
}
function getMonacoLoaderScript(configureLoader2) {
  var state = getState(function(_ref2) {
    var config2 = _ref2.config, reject = _ref2.reject;
    return {
      config: config2,
      reject
    };
  });
  var loaderScript = createScript("".concat(state.config.paths.vs, "/loader.js"));
  loaderScript.onload = function() {
    return configureLoader2();
  };
  loaderScript.onerror = state.reject;
  return loaderScript;
}
function configureLoader() {
  var state = getState(function(_ref3) {
    var config2 = _ref3.config, resolve = _ref3.resolve, reject = _ref3.reject;
    return {
      config: config2,
      resolve,
      reject
    };
  });
  var require2 = window.require;
  require2.config(state.config);
  require2(["vs/editor/editor.main"], function(monaco) {
    storeMonacoInstance(monaco);
    state.resolve(monaco);
  }, function(error) {
    state.reject(error);
  });
}
function storeMonacoInstance(monaco) {
  if (!getState().monaco) {
    setState({
      monaco
    });
  }
}
function __getMonacoInstance() {
  return getState(function(_ref4) {
    var monaco = _ref4.monaco;
    return monaco;
  });
}
var wrapperPromise = new Promise(function(resolve, reject) {
  return setState({
    resolve,
    reject
  });
});
var loader = {
  config,
  init,
  __getMonacoInstance
};
const _hoisted_1$5 = {
  key: 0,
  class: "loading-overlay"
};
const _hoisted_2$5 = {
  key: 1,
  class: "error-overlay"
};
const _hoisted_3$5 = { class: "error-text" };
const _hoisted_4$5 = { class: "fallback-editor" };
const _hoisted_5$4 = ["readonly", "placeholder"];
const _sfc_main$5 = {
  __name: "TextEditor",
  props: {
    content: {
      type: String,
      default: ""
    },
    language: {
      type: String,
      default: "plaintext"
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    height: {
      type: [Number, String],
      default: 400
    },
    fontSize: {
      type: Number,
      default: 14
    },
    wordWrap: {
      type: String,
      default: "on"
      // "on" | "off" | "wordWrapColumn" | "bounded"
    },
    minimap: {
      type: Boolean,
      default: false
    }
  },
  emits: ["change", "focus", "blur"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { t } = useI18n();
    const log2 = createLogger("TextEditor");
    const CDN_LIST = [
      "https://cdnjs.znnu.com/monaco-editor/0.52.2/min/vs",
      // cdnjs CDN
      "https://s4.zstatic.net/npm/monaco-editor@0.52.2/min/vs",
      // ZStatic
      "https://fastly.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs",
      // JSDelivr
      "https://unpkg.com/monaco-editor@0.52.2/min/vs"
      // unpkg
    ];
    const props = __props;
    const emit = __emit;
    const loading = ref(true);
    const error = ref(null);
    const editorContainer = ref(null);
    const localContent = ref(props.content);
    let monacoEditor = null;
    let monaco = null;
    let contentChangeDisposable = null;
    let focusDisposable = null;
    let blurDisposable = null;
    const addEditorActions = (editor, monaco2) => {
      editor.addAction({
        id: "toggle-word-wrap",
        label: "切换自动换行",
        keybindings: [monaco2.KeyMod.Alt | monaco2.KeyCode.KeyZ],
        contextMenuGroupId: "view",
        contextMenuOrder: 1,
        run: function(ed) {
          const currentWordWrap = ed.getOption(monaco2.editor.EditorOption.wordWrap);
          ed.updateOptions({
            wordWrap: currentWordWrap === "on" ? "off" : "on"
          });
        }
      });
      editor.addAction({
        id: "insert-timestamp",
        label: "插入时间戳",
        contextMenuGroupId: "modification",
        contextMenuOrder: 1,
        run: function(ed) {
          const timestamp = formatLocalDateTimeWithSeconds(/* @__PURE__ */ new Date());
          const selection = ed.getSelection();
          ed.executeEdits("", [
            {
              range: selection,
              text: timestamp
            }
          ]);
        }
      });
      editor.addAction({
        id: "show-text-stats",
        label: "显示文本统计",
        contextMenuGroupId: "view",
        contextMenuOrder: 2,
        run: function(ed) {
          const content = ed.getValue();
          const lines = content.split("\n").length;
          const chars = content.length;
          const words = content.trim() ? content.trim().split(/\s+/).length : 0;
          log2.debug("文本统计:", { lines, chars, words });
        }
      });
      editor.addAction({
        id: "convert-to-uppercase",
        label: "转换为大写",
        contextMenuGroupId: "modification",
        contextMenuOrder: 2,
        run: function(ed) {
          const selection = ed.getSelection();
          const selectedText = ed.getModel().getValueInRange(selection);
          if (selectedText) {
            ed.executeEdits("", [
              {
                range: selection,
                text: selectedText.toUpperCase()
              }
            ]);
          }
        }
      });
      editor.addAction({
        id: "convert-to-lowercase",
        label: "转换为小写",
        contextMenuGroupId: "modification",
        contextMenuOrder: 3,
        run: function(ed) {
          const selection = ed.getSelection();
          const selectedText = ed.getModel().getValueInRange(selection);
          if (selectedText) {
            ed.executeEdits("", [
              {
                range: selection,
                text: selectedText.toLowerCase()
              }
            ]);
          }
        }
      });
      editor.addAction({
        id: "toggle-minimap",
        label: "切换代码缩略图",
        keybindings: [monaco2.KeyMod.CtrlCmd | monaco2.KeyMod.Shift | monaco2.KeyCode.KeyM],
        contextMenuGroupId: "view",
        contextMenuOrder: 3,
        run: function(ed) {
          const currentMinimap = ed.getOption(monaco2.editor.EditorOption.minimap);
          ed.updateOptions({
            minimap: {
              ...currentMinimap,
              enabled: !currentMinimap.enabled
            }
          });
        }
      });
    };
    const initMonacoEditor = async () => {
      try {
        loading.value = true;
        error.value = null;
        await nextTick();
        let retryCount = 0;
        const maxRetries = 5;
        while (!editorContainer.value && retryCount < maxRetries) {
          log2.debug(`等待编辑器容器准备就绪... (${retryCount + 1}/${maxRetries})`);
          await new Promise((resolve) => setTimeout(resolve, 50));
          retryCount++;
        }
        if (!editorContainer.value) {
          throw new Error(`编辑器容器不存在 (重试${retryCount}次后仍然失败)`);
        }
        log2.debug("编辑器容器准备就绪，开始初始化Monaco编辑器");
        log2.debug("开始加载Monaco编辑器...");
        let lastError = null;
        for (let i = 0; i < CDN_LIST.length; i++) {
          try {
            const cdnUrl = CDN_LIST[i];
            log2.debug(`尝试 CDN ${i + 1}/${CDN_LIST.length}: ${cdnUrl}`);
            loader.config({
              paths: {
                vs: cdnUrl
              }
            });
            monaco = await loader.init();
            if (monaco && monaco.editor) {
              log2.debug(`Monaco编辑器加载成功，使用 CDN: ${cdnUrl}`);
              break;
            } else {
              throw new Error("Monaco编辑器对象无效");
            }
          } catch (error2) {
            lastError = error2;
            log2.warn(`CDN ${i + 1} 加载失败:`, error2.message);
            if (i === CDN_LIST.length - 1) {
              throw new Error(`所有 CDN 都无法加载 Monaco Editor。最后错误: ${lastError?.message}`);
            }
            continue;
          }
        }
        monacoEditor = monaco.editor.create(editorContainer.value, {
          value: props.content,
          language: props.language,
          theme: props.darkMode ? "vs-dark" : "vs",
          readOnly: props.readOnly,
          fontSize: props.fontSize,
          wordWrap: props.wordWrap,
          // 启用 minimap（代码缩略图）
          minimap: {
            enabled: true,
            side: "right",
            showSlider: "mouseover",
            renderCharacters: true,
            maxColumn: 120,
            scale: 1
          },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          lineNumbers: "on",
          renderWhitespace: "selection",
          tabSize: 2,
          insertSpaces: true,
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          glyphMargin: false,
          contextmenu: true,
          mouseWheelZoom: true,
          smoothScrolling: true,
          cursorBlinking: "blink",
          cursorSmoothCaretAnimation: "on",
          renderLineHighlight: "line",
          selectionHighlight: true,
          occurrencesHighlight: "singleFile",
          codeLens: false,
          suggest: {
            showKeywords: true,
            showSnippets: true
          }
        });
        let changeTimer = null;
        let lastEmittedValue = "";
        contentChangeDisposable = monacoEditor.onDidChangeModelContent(() => {
          if (changeTimer) clearTimeout(changeTimer);
          changeTimer = setTimeout(() => {
            const value = monacoEditor.getValue();
            if (value !== lastEmittedValue) {
              lastEmittedValue = value;
              localContent.value = value;
              emit("change", value);
              if (false) ;
            }
            changeTimer = null;
          }, 300);
        });
        focusDisposable = monacoEditor.onDidFocusEditorText(() => {
          emit("focus");
        });
        blurDisposable = monacoEditor.onDidBlurEditorText(() => {
          emit("blur");
        });
        addEditorActions(monacoEditor, monaco);
        loading.value = false;
        log2.debug("Monaco编辑器初始化成功", {
          language: props.language,
          theme: props.darkMode ? "vs-dark" : "vs",
          readOnly: props.readOnly
        });
      } catch (err) {
        log2.error("Monaco编辑器初始化失败:", err);
        log2.error("错误详情:", {
          containerExists: !!editorContainer.value,
          containerElement: editorContainer.value,
          props: {
            content: props.content?.length || 0,
            language: props.language,
            darkMode: props.darkMode,
            readOnly: props.readOnly
          }
        });
        error.value = err.message || t("textPreview.editorInitFailed");
        loading.value = false;
      }
    };
    const handleInput = (event) => {
      const value = event.target.value;
      localContent.value = value;
      emit("change", value);
    };
    const setValue = (value) => {
      if (monacoEditor) {
        monacoEditor.setValue(value || "");
      } else {
        localContent.value = value || "";
      }
    };
    const getValue = () => {
      if (monacoEditor) {
        return monacoEditor.getValue();
      }
      return localContent.value;
    };
    const setLanguage = (language) => {
      if (monacoEditor && monaco) {
        const model = monacoEditor.getModel();
        if (model) {
          monaco.editor.setModelLanguage(model, language);
        }
      }
    };
    const focus = () => {
      if (monacoEditor) {
        monacoEditor.focus();
      }
    };
    const resize = () => {
      if (monacoEditor) {
        monacoEditor.layout();
      }
    };
    watch(
      () => props.content,
      (newContent) => {
        if (newContent !== getValue()) {
          setValue(newContent);
        }
      }
    );
    watch(
      () => props.language,
      (newLanguage) => {
        setLanguage(newLanguage);
      }
    );
    watch(
      () => props.darkMode,
      (newDarkMode) => {
        if (monacoEditor) {
          monacoEditor.updateOptions({
            theme: newDarkMode ? "vs-dark" : "vs"
          });
        }
      }
    );
    watch(
      () => props.readOnly,
      (newReadOnly) => {
        if (monacoEditor) {
          monacoEditor.updateOptions({
            readOnly: newReadOnly
          });
        }
      }
    );
    onMounted(async () => {
      await nextTick();
      const initializeEditor = async () => {
        try {
          await initMonacoEditor();
        } catch (error2) {
          log2.error("初始化编辑器时出错:", error2);
        }
      };
      if (window.requestIdleCallback) {
        window.requestIdleCallback(initializeEditor, { timeout: 1e3 });
      } else {
        setTimeout(initializeEditor, 100);
      }
    });
    onBeforeUnmount(() => {
      if (contentChangeDisposable) {
        contentChangeDisposable.dispose();
        contentChangeDisposable = null;
      }
      if (focusDisposable) {
        focusDisposable.dispose();
        focusDisposable = null;
      }
      if (blurDisposable) {
        blurDisposable.dispose();
        blurDisposable = null;
      }
      if (monacoEditor) {
        monacoEditor.dispose();
        monacoEditor = null;
      }
    });
    __expose({
      setValue,
      getValue,
      setLanguage,
      focus,
      resize,
      getEditor: () => monacoEditor
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["text-editor", { "text-editor-dark": __props.darkMode }])
      }, [
        createBaseVNode("div", {
          ref_key: "editorContainer",
          ref: editorContainer,
          class: "editor-container"
        }, [
          loading.value ? (openBlock(), createElementBlock("div", _hoisted_1$5, [
            createVNode(_sfc_main$e, {
              text: _ctx.$t("textPreview.loadingEditor"),
              "dark-mode": __props.darkMode,
              size: "xl",
              "icon-class": __props.darkMode ? "text-primary-500" : "text-primary-600"
            }, null, 8, ["text", "dark-mode", "icon-class"])
          ])) : error.value ? (openBlock(), createElementBlock("div", _hoisted_2$5, [
            createBaseVNode("p", _hoisted_3$5, toDisplayString(error.value), 1),
            createBaseVNode("div", _hoisted_4$5, [
              withDirectives(createBaseVNode("textarea", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => localContent.value = $event),
                class: normalizeClass(["fallback-textarea", { "fallback-dark": __props.darkMode }]),
                readonly: __props.readOnly,
                onInput: handleInput,
                placeholder: _ctx.$t("textPreview.fallbackEditor")
              }, null, 42, _hoisted_5$4), [
                [vModelText, localContent.value]
              ])
            ])
          ])) : createCommentVNode("", true)
        ], 512)
      ], 2);
    };
  }
};
const TextEditor = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-315bd9ae"]]);
const _hoisted_1$4 = {
  key: 0,
  class: "empty-state"
};
const _hoisted_2$4 = {
  key: 1,
  class: "text-content"
};
const _hoisted_3$4 = { class: "stat-item" };
const _hoisted_4$4 = { class: "stat-item" };
const _sfc_main$4 = {
  __name: "TextRenderer",
  props: {
    // 文本内容
    content: {
      type: String,
      required: true
    },
    // 渲染模式
    mode: {
      type: String,
      default: "text",
      validator: (value) => ["text", "code", "markdown", "html", "edit"].includes(value)
    },
    // 代码语言（仅代码模式需要）
    language: {
      type: String,
      default: ""
    },
    // 文件名（用于语言检测）
    filename: {
      type: String,
      default: ""
    },
    // 是否暗色模式
    darkMode: {
      type: Boolean,
      default: false
    },
    // 是否显示行号（代码模式）
    showLineNumbers: {
      type: Boolean,
      default: true
    },
    // 是否只读（编辑模式）
    readOnly: {
      type: Boolean,
      default: true
    },
    // 最大高度
    maxHeight: {
      type: [Number, String],
      default: 600
    },
    // 是否显示统计信息
    showStats: {
      type: Boolean,
      default: true
    }
  },
  emits: ["content-change", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const contentStyle = computed(() => {
      const styles = {};
      if (props.maxHeight) {
        styles.maxHeight = typeof props.maxHeight === "number" ? `${props.maxHeight}px` : props.maxHeight;
      }
      return styles;
    });
    const textClass = computed(() => ({
      "text-dark": props.darkMode,
      "text-light": !props.darkMode
    }));
    const textStats = computed(() => {
      if (!props.content) {
        return { lineCount: 0, characterCount: 0 };
      }
      let lineCount2 = 1;
      const characterCount2 = props.content.length;
      for (let i = 0; i < characterCount2; i++) {
        if (props.content[i] === "\n") {
          lineCount2++;
        }
      }
      return { lineCount: lineCount2, characterCount: characterCount2 };
    });
    const lineCount = computed(() => textStats.value.lineCount);
    const characterCount = computed(() => textStats.value.characterCount);
    const handleContentChange = (newContent) => {
      emit("content-change", newContent);
    };
    const handleSave = (content) => {
      emit("save", content);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["text-renderer", { "dark-mode": __props.darkMode }])
      }, [
        createBaseVNode("div", {
          class: "content-area",
          style: normalizeStyle(contentStyle.value)
        }, [
          !__props.content ? (openBlock(), createElementBlock("div", _hoisted_1$4, [
            _cache[0] || (_cache[0] = createBaseVNode("div", { class: "empty-icon" }, "📄", -1)),
            createBaseVNode("p", {
              class: normalizeClass(["empty-message", textClass.value])
            }, "内容为空", 2)
          ])) : (openBlock(), createElementBlock("div", _hoisted_2$4, [
            __props.mode === "text" ? (openBlock(), createBlock(TextDisplay, {
              key: 0,
              content: __props.content,
              "dark-mode": __props.darkMode
            }, null, 8, ["content", "dark-mode"])) : __props.mode === "code" ? (openBlock(), createBlock(CodeDisplay, {
              key: 1,
              content: __props.content,
              language: __props.language,
              "dark-mode": __props.darkMode,
              "show-line-numbers": __props.showLineNumbers,
              filename: __props.filename
            }, null, 8, ["content", "language", "dark-mode", "show-line-numbers", "filename"])) : __props.mode === "markdown" ? (openBlock(), createBlock(MarkdownDisplay, {
              key: 2,
              content: __props.content,
              "dark-mode": __props.darkMode
            }, null, 8, ["content", "dark-mode"])) : __props.mode === "html" ? (openBlock(), createBlock(HtmlDisplay, {
              key: 3,
              content: __props.content,
              "dark-mode": __props.darkMode
            }, null, 8, ["content", "dark-mode"])) : __props.mode === "edit" ? (openBlock(), createBlock(TextEditor, {
              key: 4,
              content: __props.content,
              language: __props.language,
              "dark-mode": __props.darkMode,
              "read-only": __props.readOnly,
              onChange: handleContentChange,
              onSave: handleSave
            }, null, 8, ["content", "language", "dark-mode", "read-only"])) : (openBlock(), createBlock(TextDisplay, {
              key: 5,
              content: __props.content,
              "dark-mode": __props.darkMode
            }, null, 8, ["content", "dark-mode"]))
          ])),
          __props.showStats && __props.content ? (openBlock(), createElementBlock("div", {
            key: 2,
            class: normalizeClass(["text-stats-footer", { "stats-dark": __props.darkMode }])
          }, [
            createBaseVNode("span", _hoisted_3$4, toDisplayString(lineCount.value) + " L", 1),
            createBaseVNode("span", _hoisted_4$4, toDisplayString(characterCount.value) + " Chars", 1)
          ], 2)) : createCommentVNode("", true)
        ], 4)
      ], 2);
    };
  }
};
const TextRenderer = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-31fa56d4"]]);
function useEncodingDetection() {
  const log2 = createLogger("EncodingDetection");
  const selectedEncoding = ref("utf-8");
  const detectionResult = ref(null);
  const isDetecting = ref(false);
  const detectionError = ref(null);
  const hasDetectionResult = computed(() => !!detectionResult.value);
  const detectionConfidence = computed(() => {
    return detectionResult.value?.confidence || 0;
  });
  const isDetectionReliable = computed(() => {
    return detectionConfidence.value >= 70;
  });
  const availableEncodings = computed(() => {
    return SUPPORTED_ENCODINGS;
  });
  const selectedEncodingInfo = computed(() => {
    return getEncodingInfo(selectedEncoding.value);
  });
  const detectEncoding = async (url, filename = "", options = {}) => {
    if (!url) {
      throw new Error("URL不能为空");
    }
    try {
      isDetecting.value = true;
      detectionError.value = null;
      const result = await smartDetectEncoding(url, filename, options);
      detectionResult.value = result;
      if (result.success) {
        selectEncoding(result.encoding);
      } else {
        detectionError.value = result.error;
      }
      return result;
    } catch (error) {
      log2.error("编码检测失败:", error);
      detectionError.value = error.message;
      return {
        success: false,
        encoding: "utf-8",
        confidence: 0,
        allResults: [],
        error: error.message
      };
    } finally {
      isDetecting.value = false;
    }
  };
  const selectEncoding = (encoding) => {
    if (!encoding) return;
    const normalized = normalizeEncoding(encoding);
    if (isEncodingSupported(normalized)) {
      selectedEncoding.value = normalized;
    } else {
      log2.warn(`不支持的编码: ${encoding}，使用默认编码 utf-8`);
      selectedEncoding.value = "utf-8";
    }
  };
  const resetDetection = () => {
    selectedEncoding.value = "utf-8";
    detectionResult.value = null;
    isDetecting.value = false;
    detectionError.value = null;
  };
  const getEncodingSuggestions = () => {
    if (!detectionResult.value || !detectionResult.value.allResults) {
      return [
        { encoding: "utf-8", confidence: 100, reason: "默认编码" }
      ];
    }
    const suggestions = detectionResult.value.allResults.filter((result) => result.confidence > 20).slice(0, 5).map((result) => ({
      encoding: result.encoding,
      confidence: result.confidence,
      reason: getConfidenceReason(result.confidence),
      language: result.language
    }));
    if (!suggestions.find((s) => s.encoding === "utf-8")) {
      suggestions.push({
        encoding: "utf-8",
        confidence: 50,
        reason: "通用编码",
        language: null
      });
    }
    return suggestions.sort((a, b) => b.confidence - a.confidence);
  };
  const getConfidenceReason = (confidence) => {
    if (confidence >= 90) return "非常可能";
    if (confidence >= 70) return "很可能";
    if (confidence >= 50) return "可能";
    if (confidence >= 30) return "不太确定";
    return "不确定";
  };
  const validateEncoding = (encoding) => {
    const normalized = normalizeEncoding(encoding);
    const isSupported = isEncodingSupported(normalized);
    const info = getEncodingInfo(normalized);
    return {
      isValid: isSupported,
      normalized,
      info,
      message: isSupported ? "编码有效" : `不支持的编码: ${encoding}`
    };
  };
  return {
    // 状态
    selectedEncoding,
    detectionResult,
    isDetecting,
    detectionError,
    // 计算属性
    hasDetectionResult,
    detectionConfidence,
    isDetectionReliable,
    availableEncodings,
    selectedEncodingInfo,
    // 方法
    detectEncoding,
    selectEncoding,
    resetDetection,
    getEncodingSuggestions,
    validateEncoding
  };
}
function useFetchText() {
  const log2 = createLogger("FetchText");
  let currentAbortController = null;
  const loading = ref(false);
  const error = ref(null);
  const textContent = ref("");
  const rawBuffer = ref(null);
  const fileInfo = ref(null);
  const textStats = computed(() => {
    return textContent.value ? getTextStats(textContent.value) : null;
  });
  const { selectedEncoding, detectionResult, hasDetectionResult, selectEncoding, resetDetection, detectEncoding, availableEncodings } = useEncodingDetection();
  const hasContent = computed(() => !!textContent.value);
  const isTextValid = computed(() => hasContent.value && !error.value);
  const isBinary = computed(() => {
    return textContent.value ? isBinaryContent(textContent.value) : false;
  });
  const cancelCurrentOperation = () => {
    if (currentAbortController) {
      currentAbortController.abort();
      currentAbortController = null;
    }
  };
  const clearRawBuffer = () => {
    if (rawBuffer.value) {
      rawBuffer.value = null;
    }
  };
  const fetchText = async (url, fileData = null, options = {}) => {
    if (!url) {
      throw new Error("URL不能为空");
    }
    const MAX_FILE_SIZE = 50 * 1024 * 1024;
    if (fileData?.size && fileData.size > MAX_FILE_SIZE) {
      throw new Error(`文件过大 (${(fileData.size / 1024 / 1024).toFixed(1)}MB)，最大支持 ${MAX_FILE_SIZE / 1024 / 1024}MB`);
    }
    if (currentAbortController) {
      currentAbortController.abort();
    }
    currentAbortController = new AbortController();
    const signal = currentAbortController.signal;
    try {
      loading.value = true;
      error.value = null;
      fileInfo.value = fileData;
      const filename = fileData?.name || fileData?.filename || "";
      const detectionResult2 = await detectEncoding(url, filename, {
        ...options,
        signal
        // 传递取消信号
      });
      if (signal.aborted) {
        throw new Error("操作已取消");
      }
      if (detectionResult2.success) {
        log2.debug("编码自动检测成功:", {
          文件名: filename,
          检测编码: detectionResult2.encoding,
          可信度: `${detectionResult2.confidence}%`,
          检测方法: detectionResult2.method || "智能检测",
          所有候选: detectionResult2.allResults?.slice(0, 3).map((r) => `${r.encoding}(${r.confidence}%)`) || [],
          文件大小: detectionResult2.fullFileSize ? `${(detectionResult2.fullFileSize / 1024).toFixed(1)}KB` : "未知"
        });
      } else {
        log2.warn(" 编码检测失败，使用默认编码 utf-8:", detectionResult2.error);
      }
      let fetchResult;
      if (detectionResult2.success && detectionResult2.rawBuffer) {
        const encoding = detectionResult2.encoding || "utf-8";
        const decodeResult = await decodeText(detectionResult2.rawBuffer, encoding);
        fetchResult = {
          ...decodeResult,
          fileSize: detectionResult2.fullFileSize || detectionResult2.rawBuffer.byteLength,
          rawBuffer: detectionResult2.rawBuffer,
          url
        };
      } else {
        const encoding = detectionResult2.encoding || "utf-8";
        fetchResult = await fetchAndDecodeText(url, encoding, {
          ...options,
          signal
          // 传递取消信号
        });
      }
      if (fetchResult.success) {
        textContent.value = cleanText(fetchResult.text, {
          removeNullBytes: true,
          normalizeLineEndings: true,
          maxLength: options.maxLength
        });
        rawBuffer.value = fetchResult.rawBuffer;
        if (!options.keepRawBuffer) {
          setTimeout(clearRawBuffer, 2e3);
        }
        return {
          success: true,
          text: textContent.value,
          encoding: fetchResult.encoding,
          stats: textStats.value,
          fileSize: fetchResult.fileSize
        };
      } else {
        throw new Error(fetchResult.error || "文本获取失败");
      }
    } catch (err) {
      if (err.name === "AbortError" || err.message === "操作已取消") {
        log2.debug("文本获取操作已取消");
        return {
          success: false,
          text: "",
          encoding: "utf-8",
          stats: null,
          fileSize: 0,
          error: "操作已取消",
          cancelled: true
        };
      }
      log2.error("获取文本失败:", err);
      error.value = err.message;
      return {
        success: false,
        text: "",
        encoding: "utf-8",
        stats: null,
        fileSize: 0,
        error: err.message
      };
    } finally {
      loading.value = false;
      currentAbortController = null;
    }
  };
  const reDecodeWithEncoding = async (encoding) => {
    if (!rawBuffer.value) {
      const info = fileInfo.value;
      const retryUrl = info && info.contentUrl;
      if (!retryUrl) {
        throw new Error("没有可用的内容 URL（contentUrl）用于重新解码");
      }
      const retryResult = await fetchText(retryUrl, info, { keepRawBuffer: true });
      if (!retryResult.success) {
        throw new Error(retryResult.error || "重新获取文件内容失败");
      }
    }
    try {
      loading.value = true;
      error.value = null;
      selectEncoding(encoding);
      const decodeResult = await decodeText(rawBuffer.value, encoding);
      if (decodeResult.success) {
        textContent.value = cleanText(decodeResult.text, {
          removeNullBytes: true,
          normalizeLineEndings: true
        });
        return {
          success: true,
          text: textContent.value,
          encoding: decodeResult.encoding,
          stats: textStats.value
        };
      } else {
        throw new Error(decodeResult.error || "重新解码失败");
      }
    } catch (err) {
      log2.error("重新解码失败:", err);
      error.value = err.message;
      return {
        success: false,
        text: textContent.value,
        // 保持原有内容
        encoding: selectedEncoding.value,
        stats: textStats.value,
        error: err.message
      };
    } finally {
      loading.value = false;
    }
  };
  const detectAndDecodeText = async (filename) => {
    if (!rawBuffer.value) {
      throw new Error("没有原始数据");
    }
    try {
      const detection = { encoding: "utf-8", confidence: 1 };
      detectionResult.value = detection;
      const encoding = detection.encoding || "utf-8";
      selectEncoding(encoding);
      await decodeWithEncoding(encoding);
    } catch (err) {
      log2.error("编码检测失败:", err, "文件:", filename);
      selectEncoding("utf-8");
      await decodeWithEncoding("utf-8");
    }
  };
  const decodeWithEncoding = async (encoding) => {
    if (!rawBuffer.value) {
      throw new Error("没有原始数据");
    }
    const decodeResult = await decodeText(rawBuffer.value, encoding);
    if (decodeResult.success) {
      textContent.value = cleanText(decodeResult.text);
    } else {
      throw new Error(decodeResult.error || "解码失败");
    }
  };
  const reset = () => {
    cancelCurrentOperation();
    loading.value = false;
    error.value = null;
    textContent.value = "";
    rawBuffer.value = null;
    fileInfo.value = null;
    resetDetection();
  };
  const getSupportedEncodings = () => {
    return SUPPORTED_ENCODINGS;
  };
  const isEncodingSupported2 = (encoding) => {
    return SUPPORTED_ENCODINGS.some((enc) => enc.value === encoding);
  };
  onUnmounted(() => {
    cancelCurrentOperation();
  });
  return {
    // 状态
    loading,
    error,
    textContent,
    rawBuffer,
    fileInfo,
    textStats,
    selectedEncoding,
    detectionResult,
    hasDetectionResult,
    // 计算属性
    hasContent,
    isTextValid,
    isBinary,
    availableEncodings,
    // 方法
    fetchText,
    reDecodeWithEncoding,
    reset,
    getSupportedEncodings,
    isEncodingSupported: isEncodingSupported2,
    cancelCurrentOperation,
    clearRawBuffer,
    // 内存管理
    // 内部方法（供高级用户使用）
    detectAndDecodeText,
    decodeWithEncoding
  };
}
function useTextPreview(options = {}) {
  const log2 = createLogger("TextPreview");
  const {
    checkCancelled = false,
    emitEncodingChange = false
  } = options;
  const textContent = ref("");
  const detectedLanguage = ref("");
  const currentEncoding = ref("utf-8");
  const loading = ref(false);
  const error = ref(null);
  const { fetchText, reDecodeWithEncoding } = useFetchText();
  const { detectLanguageFromFilename } = useCodeHighlight();
  const loadTextContent = async (fileData, emitFn) => {
    const effectiveUrl = fileData?.contentUrl;
    if (!effectiveUrl) {
      log2.error("文件数据缺少 contentUrl，无法进行文本加载:", fileData);
      return { success: false, error: "缺少可用的内容预览 URL（contentUrl）" };
    }
    try {
      loading.value = true;
      error.value = null;
      const url = effectiveUrl;
      const result = await fetchText(url, fileData, { keepRawBuffer: true });
      if (result.success) {
        textContent.value = result.text;
        currentEncoding.value = result.encoding || "utf-8";
        const filename = fileData.name || "";
        detectedLanguage.value = detectLanguageFromFilename(filename);
        log2.debug("文本加载成功:", {
          encoding: result.encoding,
          textLength: result.text.length,
          filename
        });
        emitFn?.("load", result);
        return { success: true, result };
      } else {
        if (!result.cancelled || !checkCancelled) {
          emitFn?.("error", result.error);
        }
        return { success: false, error: result.error };
      }
    } catch (err) {
      log2.error("加载文本内容失败:", err);
      error.value = err.message;
      emitFn?.("error", err.message);
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  };
  const handleEncodingChange = async (encoding, emitFn) => {
    try {
      loading.value = true;
      error.value = null;
      const result = await reDecodeWithEncoding(encoding);
      if (result.success) {
        textContent.value = result.text;
        currentEncoding.value = encoding;
        log2.debug("编码切换成功:", {
          encoding,
          textLength: result.text.length
        });
        if (emitEncodingChange) {
          emitFn?.("encoding-change", encoding);
        }
        return { success: true };
      } else {
        log2.error("编码切换失败:", result.error);
        error.value = result.error;
        emitFn?.("error", result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      log2.error("编码切换失败:", err);
      error.value = err.message;
      emitFn?.("error", err.message);
      return { success: false, error: err.message };
    } finally {
      loading.value = false;
    }
  };
  const reset = () => {
    textContent.value = "";
    detectedLanguage.value = "";
    currentEncoding.value = "utf-8";
    loading.value = false;
    error.value = null;
  };
  return {
    // 状态
    textContent,
    detectedLanguage,
    currentEncoding,
    loading,
    error,
    // 方法
    loadTextContent,
    handleEncodingChange,
    reset
  };
}
const _hoisted_1$3 = { class: "office-native-viewer" };
const _hoisted_2$3 = {
  key: 0,
  class: "loading-overlay"
};
const _hoisted_3$3 = {
  key: 1,
  class: "loading-overlay"
};
const _hoisted_4$3 = { class: "text-center p-4" };
const _hoisted_5$3 = { class: "text-sm text-red-600" };
const _sfc_main$3 = {
  __name: "DocxViewer",
  props: {
    contentUrl: { type: String, required: true },
    isFullscreen: { type: Boolean, default: false }
  },
  emits: ["load", "error"],
  setup(__props, { emit: __emit }) {
    const log2 = createLogger("DocxViewer");
    const props = __props;
    const emit = __emit;
    const containerRef = ref(null);
    const loading = ref(true);
    const errorMessage = ref("");
    const cleanupContainer = () => {
      if (containerRef.value) {
        containerRef.value.innerHTML = "";
      }
    };
    onMounted(async () => {
      try {
        loading.value = true;
        errorMessage.value = "";
        if (!props.contentUrl) {
          throw new Error("缺少 contentUrl");
        }
        const [{ buffer }, docxPreview] = await Promise.all([
          fetchFileBinaryWithAuth(props.contentUrl),
          __vitePreload(() => import("./docx-preview-CiB19rAa.js"), true ? __vite__mapDeps([9,1,3,4,5,6,7,8]) : void 0)
        ]);
        await nextTick();
        if (!containerRef.value) {
          throw new Error("预览容器未就绪");
        }
        cleanupContainer();
        const renderAsync = docxPreview?.renderAsync;
        if (typeof renderAsync !== "function") {
          throw new Error("docx-preview renderAsync 不可用");
        }
        await renderAsync(buffer, containerRef.value, null, {
          className: "docx-preview",
          breakPages: true,
          ignoreLastRenderedPageBreak: false,
          // 编辑器插入的分页符
          experimental: true,
          // 启用实验性功能（tab stops 计算），提升排版准确性
          renderComments: true,
          // 渲染文档评论（协作批注）
          renderChanges: false,
          // 渲染修订记录（插入/删除标记）
          renderHeaders: true,
          renderFooters: true,
          renderFootnotes: true,
          renderEndnotes: true,
          useBase64URL: false,
          // 使用 URL.createObjectURL 以获得更好的性能
          trimXmlDeclaration: true
          // 移除 XML 声明以避免解析问题
        });
        loading.value = false;
        emit("load");
      } catch (err) {
        log2.error("DOCX 本地预览失败:", err);
        loading.value = false;
        errorMessage.value = err?.message || String(err);
        emit("error", err);
      }
    });
    onUnmounted(() => {
      cleanupContainer();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: containerRef,
          class: "docx-container"
        }, null, 512),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
          createVNode(_sfc_main$e, {
            size: "xl",
            "icon-class": "text-blue-500"
          })
        ])) : errorMessage.value ? (openBlock(), createElementBlock("div", _hoisted_3$3, [
          createBaseVNode("div", _hoisted_4$3, [
            createBaseVNode("div", _hoisted_5$3, toDisplayString(errorMessage.value), 1)
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
const DocxViewer = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-968f32e7"]]);
const _hoisted_1$2 = { class: "office-native-viewer" };
const _hoisted_2$2 = {
  key: 0,
  class: "loading-overlay"
};
const _hoisted_3$2 = {
  key: 1,
  class: "loading-overlay"
};
const _hoisted_4$2 = { class: "text-center p-4" };
const _hoisted_5$2 = { class: "text-sm text-red-600" };
const _hoisted_6$2 = {
  key: 2,
  class: "xlsx-content"
};
const _hoisted_7$2 = {
  key: 1,
  class: "loading-overlay"
};
const _sfc_main$2 = {
  __name: "XlsxViewer",
  props: {
    contentUrl: { type: String, required: true },
    isFullscreen: { type: Boolean, default: false }
  },
  emits: ["load", "error"],
  setup(__props, { emit: __emit }) {
    const log2 = createLogger("XlsxViewer");
    const props = __props;
    const emit = __emit;
    const loading = ref(true);
    const errorMessage = ref("");
    const objectUrl = ref("");
    const showViewer = ref(true);
    const isRemounting = ref(false);
    const OfficeExcelComponent = shallowRef(null);
    let officeExcelLoadingPromise = null;
    const ensureOfficeExcelLoaded = async () => {
      if (OfficeExcelComponent.value) return;
      if (officeExcelLoadingPromise) return officeExcelLoadingPromise;
      officeExcelLoadingPromise = (async () => {
        const [mod] = await Promise.all([
          __vitePreload(() => import("./index-jrKUP1zO.js").then((n) => n.i), true ? __vite__mapDeps([10,1,11]) : void 0),
          __vitePreload(() => Promise.resolve({}), true ? [] : void 0)
        ]);
        OfficeExcelComponent.value = mod?.default || mod;
      })();
      try {
        await officeExcelLoadingPromise;
      } finally {
        officeExcelLoadingPromise = null;
      }
    };
    const revokeObjectUrl = () => {
      if (objectUrl.value) {
        URL.revokeObjectURL(objectUrl.value);
        objectUrl.value = "";
      }
    };
    const handleRendered = () => {
      isRemounting.value = false;
      emit("load");
    };
    const handleError = (err) => {
      log2.error("XLSX 本地预览失败:", err);
      errorMessage.value = "XLSX 本地预览失败";
      isRemounting.value = false;
      emit("error", err);
    };
    watch(() => props.isFullscreen, async (isFullscreen, oldValue) => {
      if (isFullscreen !== oldValue && objectUrl.value) {
        isRemounting.value = true;
        showViewer.value = false;
        await nextTick();
        await new Promise((resolve) => setTimeout(resolve, 300));
        showViewer.value = true;
      }
    });
    onMounted(async () => {
      try {
        loading.value = true;
        errorMessage.value = "";
        const [{ buffer }] = await Promise.all([
          fetchFileBinaryWithAuth(props.contentUrl),
          ensureOfficeExcelLoaded()
        ]);
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        objectUrl.value = URL.createObjectURL(blob);
        loading.value = false;
      } catch (err) {
        log2.error("XLSX 本地预览加载失败:", err);
        loading.value = false;
        errorMessage.value = err?.message || String(err);
        emit("error", err);
      }
    });
    onUnmounted(() => {
      revokeObjectUrl();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
          createVNode(_sfc_main$e, {
            size: "xl",
            "icon-class": "text-blue-500"
          })
        ])) : errorMessage.value ? (openBlock(), createElementBlock("div", _hoisted_3$2, [
          createBaseVNode("div", _hoisted_4$2, [
            createBaseVNode("div", _hoisted_5$2, toDisplayString(errorMessage.value), 1)
          ])
        ])) : (openBlock(), createElementBlock("div", _hoisted_6$2, [
          showViewer.value && OfficeExcelComponent.value ? (openBlock(), createBlock(resolveDynamicComponent(OfficeExcelComponent.value), {
            key: 0,
            src: objectUrl.value,
            class: "h-full w-full",
            onRendered: handleRendered,
            onError: handleError
          }, null, 40, ["src"])) : createCommentVNode("", true),
          isRemounting.value ? (openBlock(), createElementBlock("div", _hoisted_7$2, [
            createVNode(_sfc_main$e, {
              size: "xl",
              "icon-class": "text-blue-500"
            })
          ])) : createCommentVNode("", true)
        ]))
      ]);
    };
  }
};
const XlsxViewer = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-ac6cf579"]]);
const _hoisted_1$1 = { class: "office-native-viewer" };
const _hoisted_2$1 = {
  key: 0,
  class: "loading-overlay"
};
const _hoisted_3$1 = {
  key: 1,
  class: "loading-overlay"
};
const _hoisted_4$1 = { class: "text-center p-4" };
const _hoisted_5$1 = { class: "text-sm text-red-600" };
const _hoisted_6$1 = {
  key: 2,
  class: "pptx-content"
};
const _hoisted_7$1 = {
  key: 1,
  class: "loading-overlay"
};
const _sfc_main$1 = {
  __name: "PptxViewer",
  props: {
    contentUrl: { type: String, required: true },
    isFullscreen: { type: Boolean, default: false }
  },
  emits: ["load", "error"],
  setup(__props, { emit: __emit }) {
    const log2 = createLogger("PptxViewer");
    const props = __props;
    const emit = __emit;
    const loading = ref(true);
    const errorMessage = ref("");
    const objectUrl = ref("");
    const showViewer = ref(true);
    const isRemounting = ref(false);
    const OfficePptxComponent = shallowRef(null);
    let officePptxLoadingPromise = null;
    const ensureOfficePptxLoaded = async () => {
      if (OfficePptxComponent.value) return;
      if (officePptxLoadingPromise) return officePptxLoadingPromise;
      officePptxLoadingPromise = (async () => {
        const mod = await __vitePreload(() => import("./index-CfSNuPLK.js").then((n) => n.i), true ? __vite__mapDeps([12,1,11]) : void 0);
        OfficePptxComponent.value = mod?.default || mod;
      })();
      try {
        await officePptxLoadingPromise;
      } finally {
        officePptxLoadingPromise = null;
      }
    };
    const revokeObjectUrl = () => {
      if (objectUrl.value) {
        URL.revokeObjectURL(objectUrl.value);
        objectUrl.value = "";
      }
    };
    const handleRendered = () => {
      isRemounting.value = false;
      emit("load");
    };
    const handleError = (err) => {
      log2.error("PPTX 本地预览失败:", err);
      errorMessage.value = "PPTX 本地预览失败";
      isRemounting.value = false;
      emit("error", err);
    };
    watch(() => props.isFullscreen, async (isFullscreen, oldValue) => {
      if (isFullscreen !== oldValue && objectUrl.value) {
        isRemounting.value = true;
        showViewer.value = false;
        await nextTick();
        await new Promise((resolve) => setTimeout(resolve, 300));
        showViewer.value = true;
      }
    });
    onMounted(async () => {
      try {
        loading.value = true;
        errorMessage.value = "";
        const [{ buffer }] = await Promise.all([
          fetchFileBinaryWithAuth(props.contentUrl),
          ensureOfficePptxLoaded()
        ]);
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" });
        objectUrl.value = URL.createObjectURL(blob);
        loading.value = false;
      } catch (err) {
        log2.error("PPTX 本地预览加载失败:", err);
        loading.value = false;
        errorMessage.value = err?.message || String(err);
        emit("error", err);
      }
    });
    onUnmounted(() => {
      revokeObjectUrl();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          createVNode(_sfc_main$e, {
            size: "xl",
            "icon-class": "text-blue-500"
          })
        ])) : errorMessage.value ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
          createBaseVNode("div", _hoisted_4$1, [
            createBaseVNode("div", _hoisted_5$1, toDisplayString(errorMessage.value), 1)
          ])
        ])) : (openBlock(), createElementBlock("div", _hoisted_6$1, [
          showViewer.value && OfficePptxComponent.value ? (openBlock(), createBlock(resolveDynamicComponent(OfficePptxComponent.value), {
            key: 0,
            src: objectUrl.value,
            class: "h-full w-full",
            onRendered: handleRendered,
            onError: handleError
          }, null, 40, ["src"])) : createCommentVNode("", true),
          isRemounting.value ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
            createVNode(_sfc_main$e, {
              size: "xl",
              "icon-class": "text-blue-500"
            })
          ])) : createCommentVNode("", true)
        ]))
      ]);
    };
  }
};
const PptxViewer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f5bd7afa"]]);
const _hoisted_1 = { class: "office-content bg-white" };
const _hoisted_2 = {
  key: 0,
  class: "office-native-wrapper"
};
const _hoisted_3 = {
  key: 3,
  class: "office-placeholder"
};
const _hoisted_4 = {
  key: 1,
  class: "office-placeholder"
};
const _hoisted_5 = { class: "placeholder-content" };
const _hoisted_6 = { class: "text-gray-600 mb-2" };
const _hoisted_7 = {
  key: 1,
  class: "office-iframe-wrapper"
};
const _hoisted_8 = ["src"];
const _hoisted_9 = {
  key: 0,
  class: "loading-overlay"
};
const _hoisted_10 = {
  key: 2,
  class: "office-placeholder"
};
const _hoisted_11 = { class: "placeholder-content" };
const _hoisted_12 = { class: "text-sm text-gray-500" };
const _hoisted_13 = {
  key: 0,
  class: "office-footer"
};
const _hoisted_14 = {
  key: 0,
  class: "text-red-500 mb-1"
};
const _hoisted_15 = { key: 1 };
const _hoisted_16 = ["href"];
const _sfc_main = {
  __name: "OfficePreviewContainer",
  props: {
    // Native 渲染内容 URL（同源）
    contentUrl: {
      type: String,
      default: ""
    },
    // 文件名（用于判断文件类型）
    filename: {
      type: String,
      required: true
    },
    // 是否显示全屏按钮
    showFullscreen: {
      type: Boolean,
      default: false
    },
    // 全屏目标元素 ref
    fullscreenTarget: {
      type: Object,
      default: null
    },
    // 全屏模式（外部传入状态）
    isFullscreen: {
      type: Boolean,
      default: false
    },
    // 预览渠道映射：{ native: 'native', microsoft: 'url', google: 'url' }
    providers: {
      type: Object,
      default: () => ({})
    },
    // 默认选中的渠道 key
    defaultProvider: {
      type: String,
      default: ""
    },
    // 高度模式: 'fixed' (65vh) / 'flex' (flex: 1) / 'auto' (内容决定)
    heightMode: {
      type: String,
      default: "fixed",
      validator: (v) => ["fixed", "flex", "auto"].includes(v)
    },
    // 是否显示渠道选择器
    showProviderSelector: {
      type: Boolean,
      default: true
    },
    // 是否显示底部提示
    showFooter: {
      type: Boolean,
      default: true
    },
    // 下载链接（用于底部提示）
    downloadUrl: {
      type: String,
      default: ""
    },
    // 错误消息
    errorMessage: {
      type: String,
      default: ""
    }
  },
  emits: ["load", "error", "provider-change"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const log2 = createLogger("OfficePreview");
    const props = __props;
    const emit = __emit;
    const selectedProvider = ref("");
    const iframeLoading = ref(true);
    const nativeErrorMessage = ref("");
    const normalizedProviders = computed(() => {
      const options = [];
      const providers = props.providers || {};
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
    const currentPreviewUrl = computed(() => {
      const options = normalizedProviders.value;
      if (!options.length) return "";
      const current = options.find((opt) => opt.key === selectedProvider.value) || options[0];
      return current?.url || "";
    });
    const isNativeProvider = computed(() => {
      return selectedProvider.value === "native" || currentPreviewUrl.value === "native";
    });
    const nativeViewerType = computed(() => {
      const parts = (props.filename || "").split(".");
      const ext = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
      if (ext === "docx") return "docx";
      if (ext === "xlsx") return "xlsx";
      if (ext === "pptx") return "pptx";
      return "";
    });
    const officeTypeDisplayName = computed(() => {
      const filename = props.filename || "";
      const ext = filename.split(".").pop()?.toLowerCase() || "";
      if (["doc", "docx", "odt", "rtf"].includes(ext)) {
        return t("mount.filePreview.wordPreview") || "Word 文档";
      }
      if (["xls", "xlsx", "ods", "csv"].includes(ext)) {
        return t("mount.filePreview.excelPreview") || "Excel 表格";
      }
      if (["ppt", "pptx", "odp"].includes(ext)) {
        return t("mount.filePreview.powerpointPreview") || "PowerPoint";
      }
      return t("mount.filePreview.officePreview") || "Office 文档";
    });
    const containerStyle = computed(() => {
      if (props.isFullscreen) {
        return { height: "100%" };
      }
      switch (props.heightMode) {
        case "flex":
          return { flex: "1", minHeight: "0" };
        case "auto":
          return { minHeight: "400px" };
        case "fixed":
        default:
          return {
            height: "65vh",
            minHeight: "400px",
            maxHeight: "800px"
          };
      }
    });
    const handleProviderSelect = (key) => {
      selectedProvider.value = key;
      if (!isNativeProvider.value) {
        iframeLoading.value = true;
      }
      emit("provider-change", key);
    };
    const handleLoad = () => {
      nativeErrorMessage.value = "";
      emit("load");
    };
    const handleError = (err) => {
      log2.error("Office 预览错误:", err);
      nativeErrorMessage.value = err?.message || String(err);
      emit("error", err);
    };
    const handleIframeLoad = () => {
      iframeLoading.value = false;
      emit("load");
    };
    const handleIframeError = (event) => {
      iframeLoading.value = false;
      emit("error", event);
    };
    watch(
      normalizedProviders,
      (options) => {
        if (!options.length) {
          selectedProvider.value = "";
          return;
        }
        if (props.defaultProvider && options.some((opt) => opt.key === props.defaultProvider)) {
          selectedProvider.value = props.defaultProvider;
        } else if (!options.some((opt) => opt.key === selectedProvider.value)) {
          selectedProvider.value = options[0].key;
        }
      },
      { immediate: true }
    );
    watch(
      currentPreviewUrl,
      () => {
        if (!isNativeProvider.value) {
          iframeLoading.value = true;
        }
      }
    );
    onMounted(() => {
      if (currentPreviewUrl.value && !isNativeProvider.value) {
        iframeLoading.value = true;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "office-preview-container",
        style: normalizeStyle(containerStyle.value)
      }, [
        renderSlot(_ctx.$slots, "header", {
          providers: normalizedProviders.value,
          selectedProvider: selectedProvider.value,
          onSelect: handleProviderSelect
        }, () => [
          __props.showProviderSelector && normalizedProviders.value.length > 1 ? (openBlock(), createBlock(PreviewProviderHeader, {
            key: 0,
            "show-fullscreen": __props.showFullscreen,
            "fullscreen-target": __props.fullscreenTarget,
            title: officeTypeDisplayName.value,
            options: normalizedProviders.value,
            "model-value": selectedProvider.value,
            "onUpdate:modelValue": handleProviderSelect
          }, null, 8, ["show-fullscreen", "fullscreen-target", "title", "options", "model-value"])) : createCommentVNode("", true)
        ], true),
        createBaseVNode("div", _hoisted_1, [
          isNativeProvider.value ? (openBlock(), createElementBlock("div", _hoisted_2, [
            __props.contentUrl && __props.filename ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              nativeViewerType.value === "docx" ? (openBlock(), createBlock(DocxViewer, {
                key: 0,
                "content-url": __props.contentUrl,
                filename: __props.filename,
                "is-fullscreen": __props.isFullscreen,
                onLoad: handleLoad,
                onError: handleError
              }, null, 8, ["content-url", "filename", "is-fullscreen"])) : nativeViewerType.value === "xlsx" ? (openBlock(), createBlock(XlsxViewer, {
                key: 1,
                "content-url": __props.contentUrl,
                filename: __props.filename,
                "is-fullscreen": __props.isFullscreen,
                onLoad: handleLoad,
                onError: handleError
              }, null, 8, ["content-url", "filename", "is-fullscreen"])) : nativeViewerType.value === "pptx" ? (openBlock(), createBlock(PptxViewer, {
                key: 2,
                "content-url": __props.contentUrl,
                filename: __props.filename,
                "is-fullscreen": __props.isFullscreen,
                onLoad: handleLoad,
                onError: handleError
              }, null, 8, ["content-url", "filename", "is-fullscreen"])) : (openBlock(), createElementBlock("div", _hoisted_3, _cache[0] || (_cache[0] = [
                createBaseVNode("div", { class: "placeholder-content" }, [
                  createBaseVNode("p", { class: "text-gray-600 mb-2" }, "该文件格式不支持本地预览"),
                  createBaseVNode("p", { class: "text-sm text-gray-500" }, "请尝试切换到其他预览渠道")
                ], -1)
              ])))
            ], 64)) : (openBlock(), createElementBlock("div", _hoisted_4, [
              renderSlot(_ctx.$slots, "error", {
                error: nativeErrorMessage.value,
                retry: () => {
                }
              }, () => [
                createBaseVNode("div", _hoisted_5, [
                  createBaseVNode("p", _hoisted_6, toDisplayString(nativeErrorMessage.value || "本地预览失败"), 1),
                  _cache[1] || (_cache[1] = createBaseVNode("p", { class: "text-sm text-gray-500" }, " 请尝试切换到其他预览渠道 ", -1))
                ])
              ], true)
            ]))
          ])) : currentPreviewUrl.value && currentPreviewUrl.value !== "native" ? (openBlock(), createElementBlock("div", _hoisted_7, [
            createBaseVNode("iframe", {
              src: currentPreviewUrl.value,
              allow: "fullscreen",
              allowfullscreen: "",
              frameborder: "0",
              class: "office-iframe",
              sandbox: "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation",
              onLoad: handleIframeLoad,
              onError: handleIframeError
            }, null, 40, _hoisted_8),
            iframeLoading.value ? (openBlock(), createElementBlock("div", _hoisted_9, [
              createVNode(_sfc_main$e, {
                size: "xl",
                "icon-class": "text-blue-500"
              })
            ])) : createCommentVNode("", true)
          ])) : (openBlock(), createElementBlock("div", _hoisted_10, [
            renderSlot(_ctx.$slots, "error", {
              error: __props.errorMessage,
              retry: () => {
              }
            }, () => [
              createBaseVNode("div", _hoisted_11, [
                createVNode(unref(IconDocumentText), { class: "placeholder-icon" }),
                _cache[2] || (_cache[2] = createBaseVNode("p", { class: "text-gray-600 mb-2" }, "无法加载 Office 预览", -1)),
                createBaseVNode("p", _hoisted_12, toDisplayString(__props.errorMessage || "请下载文件后在本地查看"), 1)
              ])
            ], true)
          ]))
        ]),
        renderSlot(_ctx.$slots, "footer", { downloadUrl: __props.downloadUrl }, () => [
          __props.showFooter ? (openBlock(), createElementBlock("div", _hoisted_13, [
            __props.errorMessage ? (openBlock(), createElementBlock("p", _hoisted_14, toDisplayString(__props.errorMessage), 1)) : createCommentVNode("", true),
            __props.downloadUrl ? (openBlock(), createElementBlock("p", _hoisted_15, [
              _cache[3] || (_cache[3] = createTextVNode(" 预览有问题？请尝试切换预览渠道，或 ", -1)),
              createBaseVNode("a", {
                href: __props.downloadUrl,
                class: "text-blue-500 hover:underline",
                target: "_blank"
              }, "下载文件", 8, _hoisted_16),
              _cache[4] || (_cache[4] = createTextVNode(" 后在本地查看 ", -1))
            ])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], true)
      ], 4);
    };
  }
};
const OfficePreviewContainer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-777ca430"]]);
export {
  FoliateEpubView as F,
  OfficePreviewContainer as O,
  PreviewProviderHeader as P,
  TextRenderer as T,
  VideoPlayer as V,
  _sfc_main$d as _,
  toRange as a,
  _sfc_main$9 as b,
  commonjsRequire as c,
  useTextPreview as d,
  useFetchText as e,
  fromElements as f,
  PREVIEW_KEYS as g,
  cleanupZipJS as h,
  archiveService as i,
  useElementFullscreen as j,
  parse as p,
  resolvePreviewSelection as r,
  toElement as t,
  useProviderSelector as u
};
