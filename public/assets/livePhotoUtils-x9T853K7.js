const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/wasm-bundle-Crp3YDWK.js","assets/index-BQxzU9F1.js","assets/OfficePreviewContainer-BV71pY0a.js","assets/fileTypes-C4-giE9O.js","assets/index-Sde1Raj0.js","assets/MarkdownDisplay-DriQfnOJ.js","assets/LoadingIndicator-C1Dntewf.js","assets/livePhotoBadgeIconSvg-DVbmCKIq.js","assets/timeUtils-D81jJILb.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-BQxzU9F1.js";
import { a as getExtension$1 } from "./fileTypes-C4-giE9O.js";
let libheifModulePromise = null;
async function loadLibheif() {
  if (!libheifModulePromise) {
    libheifModulePromise = __vitePreload(() => import("./wasm-bundle-Crp3YDWK.js").then((n) => n.w), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8]) : void 0);
  }
  const mod = await libheifModulePromise;
  return mod?.default ?? mod;
}
const createAbortError = () => {
  try {
    return new DOMException("Aborted", "AbortError");
  } catch {
    const err = new Error("Aborted");
    err.name = "AbortError";
    return err;
  }
};
const createSemaphore = (max) => {
  let active = 0;
  const queue = [];
  const acquire = () => {
    if (active < max) {
      active += 1;
      return Promise.resolve();
    }
    return new Promise((resolve) => queue.push(resolve)).then(() => {
      active += 1;
    });
  };
  const release = () => {
    active = Math.max(0, active - 1);
    const next = queue.shift();
    if (next) next();
  };
  const run = async (fn) => {
    await acquire();
    try {
      return await fn();
    } finally {
      release();
    }
  };
  return { run };
};
const HEIF_DECODE_WORKER_POOL_SIZE = 2;
const heifDecodeSemaphore = createSemaphore(HEIF_DECODE_WORKER_POOL_SIZE);
let heifDecodeWorkers = null;
let heifWorkerPendingByIndex = [];
const heifWorkerIndexById = /* @__PURE__ */ new Map();
let heifWorkerRoundRobin = 0;
const createHeifWorker = (index) => {
  const worker = new Worker(new URL(
    /* @vite-ignore */
    "/assets/heifDecodeWorker-DWBS8-2A.js",
    import.meta.url
  ), { type: "module" });
  worker.addEventListener("message", (event) => {
    const data = event?.data || {};
    const { id, ok } = data;
    if (!id) return;
    const pendingMap = heifWorkerPendingByIndex[index];
    const pending = pendingMap?.get(id);
    if (!pending) return;
    pendingMap.delete(id);
    heifWorkerIndexById.delete(id);
    if (ok) {
      pending.resolve(data);
    } else {
      const err = new Error(data?.error?.message || "HEIF Worker 解码失败");
      err.name = data?.error?.name || "Error";
      err.code = data?.error?.code;
      pending.reject(err);
    }
  });
  worker.addEventListener("error", (e) => {
    const pendingMap = heifWorkerPendingByIndex[index];
    if (pendingMap) {
      pendingMap.forEach(({ reject }, id) => {
        heifWorkerIndexById.delete(id);
        reject(e);
      });
      pendingMap.clear();
    }
    try {
      worker.terminate();
    } catch {
    }
    if (heifDecodeWorkers) {
      heifDecodeWorkers[index] = null;
    }
  });
  return worker;
};
const getHeifDecodeWorkers = () => {
  if (typeof Worker === "undefined") return null;
  if (heifDecodeWorkers && heifDecodeWorkers.length === HEIF_DECODE_WORKER_POOL_SIZE) return heifDecodeWorkers;
  heifDecodeWorkers = new Array(HEIF_DECODE_WORKER_POOL_SIZE);
  heifWorkerPendingByIndex = new Array(HEIF_DECODE_WORKER_POOL_SIZE).fill(null).map(() => /* @__PURE__ */ new Map());
  for (let i = 0; i < HEIF_DECODE_WORKER_POOL_SIZE; i += 1) {
    heifDecodeWorkers[i] = createHeifWorker(i);
  }
  return heifDecodeWorkers;
};
const pickHeifWorkerIndex = () => {
  const index = heifWorkerRoundRobin % HEIF_DECODE_WORKER_POOL_SIZE;
  heifWorkerRoundRobin += 1;
  return index;
};
const decodeHeifToObjectUrlViaWorker = async ({ url, signal, outputType, quality } = {}) => {
  const workers = getHeifDecodeWorkers();
  if (!workers) {
    const err = new Error("Worker 不可用");
    err.code = "WORKER_UNAVAILABLE";
    throw err;
  }
  const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const index = pickHeifWorkerIndex();
  const worker = workers[index] || (workers[index] = createHeifWorker(index));
  const abortHandler = () => {
    try {
      worker.postMessage({ type: "abort", id });
    } catch {
    }
    const pendingMap = heifWorkerPendingByIndex[index];
    const pending = pendingMap?.get(id);
    if (!pending) return;
    pendingMap.delete(id);
    heifWorkerIndexById.delete(id);
    pending.reject(createAbortError());
  };
  if (signal?.aborted) {
    throw createAbortError();
  }
  return new Promise((resolve, reject) => {
    heifWorkerIndexById.set(id, index);
    heifWorkerPendingByIndex[index].set(id, { resolve, reject });
    if (signal) signal.addEventListener("abort", abortHandler, { once: true });
    try {
      worker.postMessage({ type: "decode", id, url, outputType, quality });
    } catch (e) {
      heifWorkerIndexById.delete(id);
      heifWorkerPendingByIndex[index].delete(id);
      reject(e);
    }
  }).finally(() => {
    if (signal) {
      try {
        signal.removeEventListener("abort", abortHandler);
      } catch {
      }
    }
  });
};
function isHeifImage({ filename = "", mimetype = "" } = {}) {
  const ext = getExtension$1(filename);
  if (ext === "heic" || ext === "heif") return true;
  if (typeof mimetype === "string" && mimetype.toLowerCase().includes("heic")) return true;
  if (typeof mimetype === "string" && mimetype.toLowerCase().includes("heif")) return true;
  return false;
}
function isAvifImage({ filename = "", mimetype = "" } = {}) {
  const ext = getExtension$1(filename);
  if (ext === "avif") return true;
  if (typeof mimetype === "string" && mimetype.toLowerCase().includes("avif")) return true;
  return false;
}
function shouldAttemptDecodeImagePreview({ filename = "", mimetype = "" } = {}) {
  return isHeifImage({ filename, mimetype });
}
async function decodeImagePreviewUrlToObjectUrl({ url, filename = "", mimetype = "", signal, outputType = "image/png", quality } = {}) {
  if (!url) {
    throw new Error("缺少图片预览 URL，无法解码");
  }
  if (isHeifImage({ filename, mimetype })) {
    return decodeHeifToObjectUrl({ url, signal, outputType, quality });
  }
  if (isAvifImage({ filename, mimetype })) {
    throw new Error("当前前端解码器不支持 AVIF（请走浏览器原生渲染路径）");
  }
  throw new Error(`不支持的解码格式: ${filename || mimetype || "unknown"}`);
}
async function decodeImagePreviewUrlToPngObjectUrl({ url, filename = "", mimetype = "", signal } = {}) {
  return decodeImagePreviewUrlToObjectUrl({ url, filename, mimetype, signal, outputType: "image/png" });
}
async function decodeHeifToObjectUrl({ url, signal, outputType = "image/png", quality } = {}) {
  return heifDecodeSemaphore.run(async () => {
    if (signal?.aborted) throw createAbortError();
    try {
      const data = await decodeHeifToObjectUrlViaWorker({ url, signal, outputType, quality });
      const blob = data?.blob;
      if (!blob) {
        throw new Error("HEIF Worker 返回数据缺失（blob）");
      }
      const objectUrl = URL.createObjectURL(blob);
      return { objectUrl, width: data.width, height: data.height };
    } catch (e) {
      if (e?.name === "AbortError") throw e;
      return decodeHeifToPngObjectUrlMainThread({ url, signal, outputType, quality });
    }
  });
}
async function decodeHeifToPngObjectUrlMainThread({ url, signal, outputType = "image/png", quality } = {}) {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`获取 HEIC/HEIF 数据失败: ${response.status}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  const libheif = await loadLibheif();
  const decoder = new libheif.HeifDecoder();
  const images = decoder.decode(new Uint8Array(arrayBuffer));
  const image = Array.isArray(images) && images.length > 0 ? images[0] : null;
  if (!image) {
    throw new Error("HEIC/HEIF 解码失败：未获取到图像帧");
  }
  const width = image.get_width();
  const height = image.get_height();
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 2D 上下文不可用");
  }
  const imageData = ctx.createImageData(width, height);
  await new Promise((resolve, reject) => {
    image.display(imageData, (displayData) => {
      if (!displayData) {
        reject(new Error("HEIC/HEIF 处理失败（display 返回空）"));
        return;
      }
      resolve();
    });
  });
  ctx.putImageData(imageData, 0, 0);
  try {
    if (typeof image.free === "function") image.free();
    if (typeof decoder.free === "function") decoder.free();
  } catch {
  }
  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (!b) {
          reject(new Error("Canvas 转换 PNG 失败（toBlob 返回空）"));
          return;
        }
        resolve(b);
      },
      outputType,
      typeof quality === "number" ? quality : 1
    );
  });
  const objectUrl = URL.createObjectURL(blob);
  return { objectUrl, width, height };
}
function revokeObjectUrl(objectUrl) {
  if (!objectUrl) return;
  if (typeof objectUrl !== "string") return;
  if (!objectUrl.startsWith("blob:")) return;
  URL.revokeObjectURL(objectUrl);
}
const LIVE_PHOTO_IMAGE_EXTENSIONS = ["heic", "heif", "jpg", "jpeg", "png", "avif", "webp"];
const LIVE_PHOTO_VIDEO_EXTENSIONS = ["mov", "mp4"];
function getExtension(filename) {
  if (!filename) return "";
  const parts = filename.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
}
function getBaseName(filename) {
  if (!filename) return "";
  const lastDotIndex = filename.lastIndexOf(".");
  return lastDotIndex > 0 ? filename.substring(0, lastDotIndex) : filename;
}
function isLivePhotoImage(filename) {
  const ext = getExtension(filename);
  return LIVE_PHOTO_IMAGE_EXTENSIONS.includes(ext);
}
function findLivePhotoVideo(imageFilename, fileList) {
  if (!imageFilename || !fileList || !Array.isArray(fileList)) {
    return null;
  }
  const baseName = getBaseName(imageFilename);
  if (!baseName) return null;
  const possibleVideoNames = [];
  for (const ext of LIVE_PHOTO_VIDEO_EXTENSIONS) {
    possibleVideoNames.push(`${baseName}.${ext}`);
    possibleVideoNames.push(`${baseName}_live.${ext}`);
    possibleVideoNames.push(`${baseName}_video.${ext}`);
  }
  for (const file of fileList) {
    const fileName = file.name || file.filename || "";
    const lowerFileName = fileName.toLowerCase();
    for (const videoName of possibleVideoNames) {
      if (lowerFileName === videoName.toLowerCase()) {
        return file;
      }
    }
  }
  return null;
}
function detectLivePhoto(file, fileList) {
  const filename = file?.name || file?.filename || "";
  if (!isLivePhotoImage(filename)) {
    return { isLivePhoto: false, videoFile: null };
  }
  const videoFile = findLivePhotoVideo(filename, fileList);
  return {
    isLivePhoto: !!videoFile,
    videoFile
  };
}
export {
  detectLivePhoto as a,
  decodeImagePreviewUrlToPngObjectUrl as b,
  decodeImagePreviewUrlToObjectUrl as d,
  isLivePhotoImage as i,
  revokeObjectUrl as r,
  shouldAttemptDecodeImagePreview as s
};
