import { aK as _export_sfc, e as useI18n, c as createLogger, g as ref, F as computed, o as onMounted, w as watch, aY as onBeforeUnmount, j as createElementBlock, k as openBlock, z as createVNode, l as createBaseVNode, p as createCommentVNode, y as unref, be as isRef, M as createBlock, n as normalizeClass, aL as IconExclamation, t as toDisplayString, u as useEventListener, A as createTextVNode, q as withDirectives, aq as vShow, ae as vModelSelect, K as Fragment, L as renderList, aE as withCtx, b4 as IconDocumentText, dL as useRoute, dI as IconBookOpen, ax as onUnmounted, N as resolveDynamicComponent, ar as mergeProps, eB as IconCamera, eC as IconLocationMarker, ao as IconChevronDown, bb as IconClock, m as withModifiers, ay as IconExternalLink, aF as Transition, bB as IconCalendar, bg as IconEye, af as IconShieldCheck, bo as IconLink, al as IconCopy, aj as IconCheck, bG as vModelDynamic, dN as IconEyeOff, J as IconRefresh, D as ApiStatus, eD as IconWeibo, eE as IconTwitter, eF as IconTelegram, eG as IconShare, bn as IconQrCode, eH as IconQQ, eI as IconFacebook, G as IconClose, d1 as resolveComponent, aT as onKeyStroke, Y as useGlobalMessage, f as useAuthStore, H as IconDownload, bh as IconRename, b7 as IconDelete, aw as useIntervalFn, d as useRouter } from "./index-BQxzU9F1.js";
import { u as useFileshareService, s as setFilePassword, g as getFileErrorKey, a as useDeleteSettingsStore } from "./deleteSettingsStore-WCtYZw-P.js";
import { u as useFileShareStore, _ as _sfc_main$g } from "./FileEditModal-BjxRZLXf.js";
import { _ as _sfc_main$e } from "./LoadingIndicator-C1Dntewf.js";
import { i as isImageLikeForExif, M as MapEmbed, l as loadExifTagsFromArrayBufferAsync, r as resolveGpsCoordinates, b as buildExifRows } from "./MapEmbed-BRXo7_oo.js";
import { h as getPreviewModeFromFilename, f as formatFileSize, g as getIconType, F as FileType } from "./fileTypes-C4-giE9O.js";
import { c as formatDateTime } from "./timeUtils-D81jJILb.js";
import { c as copyToClipboard } from "./clipboard-GLHRBPpJ.js";
import { u as useProviderSelector, P as PreviewProviderHeader, _ as _sfc_main$d, V as VideoPlayer, F as FoliateEpubView, b as _sfc_main$f, d as useTextPreview, e as useFetchText, T as TextRenderer, O as OfficePreviewContainer, r as resolvePreviewSelection, g as PREVIEW_KEYS } from "./OfficePreviewContainer-BV71pY0a.js";
import "./MarkdownDisplay-DriQfnOJ.js";
/* empty css                           */
import "./livePhotoBadgeIconSvg-DVbmCKIq.js";
import "./storageConfigsStore-DUFoycii.js";
import { i as isLivePhotoImage, r as revokeObjectUrl, s as shouldAttemptDecodeImagePreview, b as decodeImagePreviewUrlToPngObjectUrl } from "./livePhotoUtils-x9T853K7.js";
import { f as formatFileSize$1 } from "./fileUtils-CALGFK20.js";
import { g as generateQRCode } from "./qrcodeUtils-xDdVh-90.js";
import "./index-Sde1Raj0.js";
const _hoisted_1$b = ["src", "alt"];
const _hoisted_2$b = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg"
};
const _hoisted_3$a = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg"
};
const _hoisted_4$a = { class: "text-center p-4" };
const _hoisted_5$a = { class: "text-red-600 dark:text-red-400 mb-2" };
const _hoisted_6$9 = { class: "text-gray-500 dark:text-gray-400 text-sm" };
const _sfc_main$c = {
  __name: "ImagePreview",
  props: {
    // 多源预览架构
    providers: {
      type: Object,
      default: () => ({})
    },
    nativeUrl: {
      type: String,
      default: ""
    },
    // 兼容旧调用
    previewUrl: {
      type: String,
      default: ""
    },
    filename: {
      type: String,
      required: true
    },
    // Live Photo 视频 URL
    videoUrl: {
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
    const log = createLogger("ImagePreview");
    const props = __props;
    const emit = __emit;
    const previewContainerRef = ref(null);
    const isFullscreen = ref(false);
    const handleFullscreenChange = (val) => {
      isFullscreen.value = val;
    };
    const resolvedNativeUrl = computed(() => props.nativeUrl || props.previewUrl || "");
    const {
      providerOptions,
      selectedKey: selectedProviderKey,
      currentUrl: currentPreviewUrl
    } = useProviderSelector({
      providers: computed(() => props.providers || {}),
      nativeUrl: resolvedNativeUrl,
      nativeLabel: computed(() => t("fileView.preview.image.browserNative"))
    });
    const isLivePhoto = computed(() => {
      return isLivePhotoImage(props.filename) && !!props.videoUrl;
    });
    const loading = ref(true);
    const error = ref(false);
    const showImage = ref(false);
    const resolvedSrc = ref("");
    const decodeAttempted = ref(false);
    const decodedObjectUrl = ref("");
    const decodeAbortController = ref(null);
    const abortDecode = () => {
      if (decodeAbortController.value) {
        decodeAbortController.value.abort();
        decodeAbortController.value = null;
      }
    };
    const loadPreview = async () => {
      abortDecode();
      revokeObjectUrl(decodedObjectUrl.value);
      decodedObjectUrl.value = "";
      decodeAttempted.value = false;
      loading.value = true;
      error.value = false;
      showImage.value = false;
      const url = currentPreviewUrl.value || "";
      if (!url) {
        loading.value = false;
        error.value = true;
        emit("error");
        return;
      }
      if (shouldAttemptDecodeImagePreview({ filename: props.filename, mimetype: "" })) {
        decodeAttempted.value = true;
        const controller = new AbortController();
        decodeAbortController.value = controller;
        try {
          const decoded = await decodeImagePreviewUrlToPngObjectUrl({
            url,
            filename: props.filename,
            signal: controller.signal
          });
          if (controller.signal.aborted) return;
          decodedObjectUrl.value = decoded.objectUrl;
          resolvedSrc.value = decoded.objectUrl;
          showImage.value = true;
          return;
        } catch (err) {
          if (controller.signal.aborted) return;
          log.error("图片预览预解码失败:", err);
          loading.value = false;
          error.value = true;
          emit("error");
          return;
        } finally {
          if (decodeAbortController.value === controller) {
            decodeAbortController.value = null;
          }
        }
      }
      resolvedSrc.value = url;
      showImage.value = true;
    };
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
    onMounted(() => {
      loadPreview();
    });
    watch(
      currentPreviewUrl,
      (nextUrl) => {
        if (!nextUrl) {
          loading.value = false;
          showImage.value = false;
          error.value = true;
          emit("error");
          return;
        }
        loadPreview();
      }
    );
    onBeforeUnmount(() => {
      abortDecode();
      revokeObjectUrl(decodedObjectUrl.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "previewContainerRef",
        ref: previewContainerRef,
        class: normalizeClass(["image-preview rounded-lg overflow-hidden mb-2 w-full relative border border-gray-200 dark:border-gray-700 flex flex-col", isFullscreen.value ? "h-screen" : ""])
      }, [
        createVNode(PreviewProviderHeader, {
          title: __props.filename || unref(t)("fileView.preview.image.title"),
          options: unref(providerOptions),
          "show-select": unref(providerOptions).length > 1,
          "show-fullscreen": true,
          "fullscreen-target": previewContainerRef.value,
          modelValue: unref(selectedProviderKey),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(selectedProviderKey) ? selectedProviderKey.value = $event : null),
          onFullscreenChange: handleFullscreenChange
        }, null, 8, ["title", "options", "show-select", "fullscreen-target", "modelValue"]),
        createBaseVNode("div", {
          class: normalizeClass(["flex justify-center items-center bg-gray-50 dark:bg-gray-800", isFullscreen.value ? "flex-1 min-h-0" : "h-[calc(100vh-350px)] min-h-[300px]"])
        }, [
          isLivePhoto.value && showImage.value ? (openBlock(), createBlock(unref(_sfc_main$d), {
            key: 0,
            "photo-src": resolvedSrc.value,
            "video-src": __props.videoUrl,
            "dark-mode": __props.darkMode,
            "max-width": "100%",
            "show-badge": true,
            "show-badge-text": true,
            "show-progress": true,
            "lazy-load": true,
            "enable-vibration": true,
            class: "max-w-full max-h-full",
            onLoad: handleLoad,
            onError: handleError
          }, null, 8, ["photo-src", "video-src", "dark-mode"])) : showImage.value ? (openBlock(), createElementBlock("img", {
            key: 1,
            src: resolvedSrc.value,
            alt: __props.filename,
            class: "max-w-full max-h-full h-auto object-contain",
            onLoad: handleLoad,
            onError: handleError
          }, null, 40, _hoisted_1$b)) : createCommentVNode("", true)
        ], 2),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_2$b, [
          createVNode(_sfc_main$e, {
            text: unref(t)("fileView.preview.image.loading"),
            "dark-mode": __props.darkMode,
            size: "2xl",
            "icon-class": __props.darkMode ? "text-primary-500" : "text-primary-600",
            "text-class": __props.darkMode ? "text-primary-400" : "text-primary-600"
          }, null, 8, ["text", "dark-mode", "icon-class", "text-class"])
        ])) : createCommentVNode("", true),
        error.value ? (openBlock(), createElementBlock("div", _hoisted_3$a, [
          createBaseVNode("div", _hoisted_4$a, [
            createVNode(unref(IconExclamation), { class: "h-12 w-12 text-red-500 mx-auto mb-2" }),
            createBaseVNode("p", _hoisted_5$a, toDisplayString(unref(t)("fileView.preview.image.error")), 1),
            createBaseVNode("p", _hoisted_6$9, toDisplayString(unref(t)("fileView.preview.downloadToView")), 1)
          ])
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
};
const ImagePreview = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-b7134585"]]);
const _hoisted_1$a = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 p-6"
};
const _hoisted_2$a = { class: "max-w-xl w-full rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-4" };
const _hoisted_3$9 = { class: "text-base font-semibold text-gray-900 dark:text-white mb-2" };
const _hoisted_4$9 = { class: "text-sm text-gray-700 dark:text-gray-200 leading-relaxed" };
const _hoisted_5$9 = {
  key: 2,
  class: "absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
};
const _sfc_main$b = {
  __name: "VideoPreview",
  props: {
    // 多源预览架构
    providers: {
      type: Object,
      default: () => ({})
    },
    nativeUrl: {
      type: String,
      default: ""
    },
    // 兼容旧调用
    previewUrl: {
      type: String,
      default: ""
    },
    linkType: {
      type: String,
      default: null
    },
    mimetype: {
      type: String,
      required: true
    },
    filename: {
      type: String,
      default: ""
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["load", "error", "play", "pause", "fullscreen", "fullscreenExit"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const log = createLogger("VideoPreview");
    const props = __props;
    const emit = __emit;
    const previewContainerRef = ref(null);
    const isFullscreen = ref(false);
    const handleFullscreenChange = (val) => {
      isFullscreen.value = val;
    };
    const resolvedNativeUrl = computed(() => props.nativeUrl || props.previewUrl || "");
    const {
      providerOptions,
      selectedKey: selectedProviderKey,
      currentUrl: currentPreviewUrl
    } = useProviderSelector({
      providers: computed(() => props.providers || {}),
      nativeUrl: resolvedNativeUrl,
      nativeLabel: computed(() => t("fileView.preview.video.browserNative"))
    });
    const videoPlayerRef = ref(null);
    const isPlaying = ref(false);
    const originalTitle = ref("");
    const currentTime = ref(0);
    const duration = ref(0);
    const currentVideoData = ref(null);
    const videoData = computed(() => currentVideoData.value);
    const shareHlsBlocked = ref(false);
    const isHlsByMeta = computed(() => {
      const name = String(props.filename || "").toLowerCase();
      const mt = String(props.mimetype || "").toLowerCase();
      return name.endsWith(".m3u8") || mt.includes("mpegurl") || mt.includes("application/vnd.apple.mpegurl");
    });
    const createShareHlsUrlTransform = () => {
      return async (requestUrl) => {
        const raw = String(requestUrl || "").trim();
        if (!raw) return requestUrl;
        if (/^[a-z][a-z0-9+.-]*:\/\//i.test(raw) || raw.startsWith("//") || raw.startsWith("/") || raw.startsWith("data:") || raw.startsWith("blob:")) {
          return requestUrl;
        }
        if (raw.split("/").includes("..")) return requestUrl;
        try {
          const base = new URL(currentPreviewUrl.value, window.location.href);
          return new URL(raw, base).toString();
        } catch {
          return requestUrl;
        }
      };
    };
    const shareHlsUrlTransform = computed(() => isHlsByMeta.value ? createShareHlsUrlTransform() : null);
    const detectRelativeRefsInM3u8 = async (playlistUrl) => {
      const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
      const timer = controller ? setTimeout(() => controller.abort(), 6e3) : null;
      try {
        const res = await fetch(playlistUrl, {
          method: "GET",
          headers: { accept: "application/vnd.apple.mpegurl, application/x-mpegurl, */*" },
          signal: controller?.signal
        });
        if (!res.ok) return false;
        const text = await res.text();
        if (!text) return false;
        const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
        for (const line of lines) {
          if (line.startsWith("#EXT-X-KEY")) {
            const m = /URI="([^"]+)"/i.exec(line);
            const uri = m?.[1] ? String(m[1]).trim() : "";
            if (uri && !/^[a-z][a-z0-9+.-]*:\/\//i.test(uri) && !uri.startsWith("/") && !uri.startsWith("//")) return true;
            continue;
          }
          if (line.startsWith("#")) continue;
          if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(line) && !line.startsWith("/") && !line.startsWith("//")) return true;
        }
        return false;
      } catch {
        return false;
      } finally {
        if (timer) clearTimeout(timer);
      }
    };
    const updatePageTitle = (playing = false, fileName = null) => {
      const title = fileName || "视频预览";
      document.title = playing ? `${title}` : `${title}`;
    };
    const restoreOriginalTitle = () => {
      if (originalTitle.value) {
        document.title = originalTitle.value;
      }
    };
    const generateDefaultPoster = (fileName) => {
      const canvas = document.createElement("canvas");
      canvas.width = 320;
      canvas.height = 180;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#1f2937";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("🎬", canvas.width / 2, canvas.height / 2 - 10);
      ctx.font = "12px Arial";
      ctx.fillText(fileName || "视频文件", canvas.width / 2, canvas.height / 2 + 15);
      return canvas.toDataURL();
    };
    const handlePlay = (data) => {
      isPlaying.value = true;
      const videoName = data?.video?.name || props.filename;
      updatePageTitle(true, videoName);
      emit("play", data);
    };
    const handlePause = (data) => {
      isPlaying.value = false;
      const videoName = data?.video?.name || props.filename;
      updatePageTitle(false, videoName);
      emit("pause", data);
    };
    const handleError = (error) => {
      if (error?.target?.src?.includes(window.location.origin) && currentVideoData.value?.url) {
        return;
      }
      isPlaying.value = false;
      log.error("视频播放错误:", error);
      emit("error", error);
    };
    const handleCanPlay = () => {
      emit("load");
    };
    const handleTimeUpdate = (data) => {
      currentTime.value = data.currentTime;
      duration.value = data.duration;
    };
    const handleVideoEnded = () => {
      isPlaying.value = false;
      updatePageTitle(false, props.filename);
    };
    const handlePlayerFullscreen = () => {
      emit("fullscreen");
    };
    const handleFullscreenExit = () => {
      emit("fullscreenExit");
    };
    const handlePlayerReady = () => {
    };
    const initializeCurrentVideo = async () => {
      const url = currentPreviewUrl.value;
      if (!url) {
        return;
      }
      shareHlsBlocked.value = false;
      if (isHlsByMeta.value) {
        const hasRelative = await detectRelativeRefsInM3u8(url);
        if (hasRelative) {
          shareHlsBlocked.value = true;
          currentVideoData.value = null;
          return;
        }
      }
      currentVideoData.value = {
        name: props.filename || "视频文件",
        title: props.filename || "视频预览",
        url,
        linkType: props.linkType || null,
        poster: generateDefaultPoster(props.filename),
        contentType: props.mimetype,
        mimetype: props.mimetype,
        isHLS: isHlsByMeta.value,
        hlsUrlTransform: isHlsByMeta.value ? shareHlsUrlTransform.value : null
      };
    };
    watch(
      currentPreviewUrl,
      async (newUrl) => {
        if (newUrl) {
          await initializeCurrentVideo();
        }
      },
      { immediate: true }
    );
    const handleKeydown = (event) => {
      if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
        return;
      }
      const player = videoPlayerRef.value?.getInstance();
      if (!player) return;
      switch (event.code) {
        case "Space":
          event.preventDefault();
          player.toggle();
          break;
        case "ArrowLeft":
          event.preventDefault();
          player.seek = Math.max(0, player.currentTime - 10);
          break;
        case "ArrowRight":
          event.preventDefault();
          player.seek = Math.min(player.duration, player.currentTime + 10);
          break;
        case "ArrowUp":
          event.preventDefault();
          player.volume = Math.min(1, player.volume + 0.1);
          break;
        case "ArrowDown":
          event.preventDefault();
          player.volume = Math.max(0, player.volume - 0.1);
          break;
        case "KeyF":
          event.preventDefault();
          player.fullscreen = !player.fullscreen;
          break;
      }
    };
    useEventListener(document, "keydown", handleKeydown);
    onMounted(() => {
      originalTitle.value = document.title;
    });
    onBeforeUnmount(() => {
      restoreOriginalTitle();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "previewContainerRef",
        ref: previewContainerRef,
        class: normalizeClass(["video-preview rounded-lg overflow-hidden mb-2 w-full relative border border-gray-200 dark:border-gray-700 flex flex-col", isFullscreen.value ? "h-screen" : ""])
      }, [
        createVNode(PreviewProviderHeader, {
          title: __props.filename || unref(t)("fileView.preview.video.title"),
          options: unref(providerOptions),
          "show-select": unref(providerOptions).length > 1,
          "show-fullscreen": true,
          "fullscreen-target": previewContainerRef.value,
          modelValue: unref(selectedProviderKey),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(selectedProviderKey) ? selectedProviderKey.value = $event : null),
          onFullscreenChange: handleFullscreenChange
        }, null, 8, ["title", "options", "show-select", "fullscreen-target", "modelValue"]),
        createBaseVNode("div", {
          class: normalizeClass(["relative bg-gray-900", isFullscreen.value ? "flex-1 min-h-0" : "h-[calc(100vh-350px)] min-h-[300px]"])
        }, [
          unref(currentPreviewUrl) && videoData.value && !shareHlsBlocked.value ? (openBlock(), createBlock(VideoPlayer, {
            key: 0,
            ref_key: "videoPlayerRef",
            ref: videoPlayerRef,
            video: videoData.value,
            "dark-mode": __props.darkMode,
            autoplay: false,
            volume: 0.7,
            muted: false,
            loop: false,
            "custom-controls": [],
            class: "w-full h-full",
            onPlay: handlePlay,
            onPause: handlePause,
            onError: handleError,
            onCanplay: handleCanPlay,
            onEnded: handleVideoEnded,
            onTimeupdate: handleTimeUpdate,
            onFullscreen: handlePlayerFullscreen,
            onFullscreenExit: handleFullscreenExit,
            onReady: handlePlayerReady
          }, null, 8, ["video", "dark-mode"])) : createCommentVNode("", true),
          shareHlsBlocked.value ? (openBlock(), createElementBlock("div", _hoisted_1$a, [
            createBaseVNode("div", _hoisted_2$a, [
              createBaseVNode("div", _hoisted_3$9, toDisplayString(unref(t)("fileView.preview.video.hlsShareNotSupportedTitle")), 1),
              createBaseVNode("div", _hoisted_4$9, toDisplayString(unref(t)("fileView.preview.video.hlsShareNotSupportedTip")), 1)
            ])
          ])) : createCommentVNode("", true),
          !videoData.value && !shareHlsBlocked.value ? (openBlock(), createElementBlock("div", _hoisted_5$9, [
            createVNode(_sfc_main$e, {
              text: unref(t)("fileView.preview.video.loading"),
              "dark-mode": __props.darkMode,
              size: "2xl",
              "icon-class": __props.darkMode ? "text-primary-500" : "text-primary-600"
            }, null, 8, ["text", "dark-mode", "icon-class"])
          ])) : createCommentVNode("", true)
        ], 2)
      ], 2);
    };
  }
};
const VideoPreview = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-33bfa7b5"]]);
const _hoisted_1$9 = { class: "w-full max-w-2xl mx-auto" };
const _hoisted_2$9 = ["src", "type"];
const _sfc_main$a = {
  __name: "AudioPreview",
  props: {
    // 多源预览架构
    providers: {
      type: Object,
      default: () => ({})
    },
    nativeUrl: {
      type: String,
      default: ""
    },
    // 兼容旧调用
    previewUrl: {
      type: String,
      default: ""
    },
    mimetype: {
      type: String,
      required: true
    },
    filename: {
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
    const previewContainerRef = ref(null);
    const isFullscreen = ref(false);
    const handleFullscreenChange = (val) => {
      isFullscreen.value = val;
    };
    const resolvedNativeUrl = computed(() => props.nativeUrl || props.previewUrl || "");
    const {
      providerOptions,
      selectedKey: selectedProviderKey,
      currentUrl: currentPreviewUrl
    } = useProviderSelector({
      providers: computed(() => props.providers || {}),
      nativeUrl: resolvedNativeUrl,
      nativeLabel: computed(() => t("fileView.preview.audio.browserNative"))
    });
    const handleLoad = () => {
      emit("load");
    };
    const handleError = () => {
      emit("error");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "previewContainerRef",
        ref: previewContainerRef,
        class: normalizeClass(["audio-preview rounded-lg overflow-hidden mb-2 w-full relative border border-gray-200 dark:border-gray-700", isFullscreen.value ? "flex flex-col h-screen" : ""])
      }, [
        createVNode(PreviewProviderHeader, {
          title: __props.filename || unref(t)("fileView.preview.audio.title"),
          options: unref(providerOptions),
          "show-select": unref(providerOptions).length > 1,
          "show-fullscreen": true,
          "fullscreen-target": previewContainerRef.value,
          modelValue: unref(selectedProviderKey),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(selectedProviderKey) ? selectedProviderKey.value = $event : null),
          onFullscreenChange: handleFullscreenChange
        }, null, 8, ["title", "options", "show-select", "fullscreen-target", "modelValue"]),
        createBaseVNode("div", {
          class: normalizeClass(["bg-gray-100 dark:bg-gray-700", isFullscreen.value ? "flex-1 flex items-center justify-center px-6" : "py-3 px-4"])
        }, [
          createBaseVNode("div", _hoisted_1$9, [
            createBaseVNode("audio", {
              controls: "",
              class: "w-full",
              onLoadeddata: handleLoad,
              onError: handleError
            }, [
              createBaseVNode("source", {
                src: unref(currentPreviewUrl),
                type: __props.mimetype
              }, null, 8, _hoisted_2$9),
              createTextVNode(" " + toDisplayString(unref(t)("fileView.preview.audio.notSupported")), 1)
            ], 32)
          ])
        ], 2)
      ], 2);
    };
  }
};
const AudioPreview = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-531d5a4f"]]);
const _hoisted_1$8 = ["src"];
const _hoisted_2$8 = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg"
};
const _hoisted_3$8 = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg"
};
const _hoisted_4$8 = { class: "text-center p-4" };
const _hoisted_5$8 = { class: "text-red-600 dark:text-red-400 mb-2" };
const _hoisted_6$8 = { class: "text-gray-500 dark:text-gray-400 text-sm" };
const _sfc_main$9 = {
  __name: "PdfPreview",
  props: {
    // 为保持兼容保留 previewUrl，但推荐使用 providers + nativeUrl
    previewUrl: {
      type: String,
      default: ""
    },
    // DocumentApp providers，例如 { pdfjs: 'https://...' }
    providers: {
      type: Object,
      default: () => ({})
    },
    // 原生浏览器预览 URL（直链 / 代理）
    nativeUrl: {
      type: String,
      default: ""
    },
    filename: {
      type: String,
      default: ""
    }
  },
  emits: ["load", "error"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const loading = ref(true);
    const error = ref(false);
    const previewContainerRef = ref(null);
    const isFullscreen = ref(false);
    const handleFullscreenChange = (val) => {
      isFullscreen.value = val;
    };
    const resolvedNativeUrl = computed(() => props.nativeUrl || props.previewUrl || "");
    const {
      providerOptions,
      selectedKey: selectedProviderKey,
      currentUrl: currentPreviewUrl
    } = useProviderSelector({
      providers: computed(() => props.providers || {}),
      nativeUrl: resolvedNativeUrl,
      nativeLabel: computed(() => t("fileView.preview.pdf.browserNative")),
      labelMap: computed(() => ({
        pdfjs: t("fileView.preview.pdf.pdfjsLabel")
      }))
    });
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
      { immediate: false }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "previewContainerRef",
        ref: previewContainerRef,
        class: "pdf-preview rounded-lg overflow-hidden mb-2 flex-grow w-full relative border border-gray-200 dark:border-gray-700"
      }, [
        createVNode(PreviewProviderHeader, {
          title: __props.filename || "PDF",
          options: unref(providerOptions),
          "show-select": unref(providerOptions).length > 1,
          "show-fullscreen": true,
          "fullscreen-target": previewContainerRef.value,
          modelValue: unref(selectedProviderKey),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(selectedProviderKey) ? selectedProviderKey.value = $event : null),
          onFullscreenChange: handleFullscreenChange
        }, null, 8, ["title", "options", "show-select", "fullscreen-target", "modelValue"]),
        withDirectives(createBaseVNode("iframe", {
          src: unref(currentPreviewUrl),
          allow: "fullscreen",
          allowfullscreen: "",
          frameborder: "0",
          class: normalizeClass(["w-full", isFullscreen.value ? "h-screen" : "h-[calc(100vh-350px)] min-h-[300px]"]),
          onLoad: handleLoad,
          onError: handleError
        }, null, 42, _hoisted_1$8), [
          [vShow, !!unref(currentPreviewUrl) && !loading.value && !error.value]
        ]),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_2$8, [
          createVNode(_sfc_main$e, {
            text: unref(t)("fileView.preview.pdf.loading"),
            size: "xl",
            "icon-class": "text-blue-500 dark:text-blue-400",
            "text-class": "text-blue-600 dark:text-blue-400"
          }, null, 8, ["text"])
        ])) : createCommentVNode("", true),
        error.value ? (openBlock(), createElementBlock("div", _hoisted_3$8, [
          createBaseVNode("div", _hoisted_4$8, [
            createVNode(unref(IconExclamation), { class: "h-12 w-12 text-red-500 mx-auto mb-2" }),
            createBaseVNode("p", _hoisted_5$8, toDisplayString(unref(t)("fileView.preview.pdf.error")), 1),
            createBaseVNode("p", _hoisted_6$8, toDisplayString(unref(t)("fileView.preview.downloadToView")), 1)
          ])
        ])) : createCommentVNode("", true)
      ], 512);
    };
  }
};
const PdfPreview = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-be7be4eb"]]);
const _sfc_main$8 = {
  __name: "EpubPreview",
  props: {
    providers: {
      type: Object,
      default: () => ({})
    },
    // 原生/本地渲染用的 URL（直链 / 代理均可）
    nativeUrl: {
      type: String,
      default: ""
    },
    // 兼容旧调用：如果没传 nativeUrl，就用 previewUrl
    previewUrl: {
      type: String,
      default: ""
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    filename: {
      type: String,
      default: ""
    }
  },
  emits: ["load", "error"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const previewContainerRef = ref(null);
    const isFullscreen = ref(false);
    const handleFullscreenChange = (val) => {
      isFullscreen.value = val;
    };
    const resolvedNativeUrl = computed(() => props.nativeUrl || props.previewUrl || "");
    const {
      providerOptions,
      selectedKey: selectedProviderKey,
      isNativeProvider,
      currentUrl: currentNativeUrl,
      currentIframeProviders
    } = useProviderSelector({
      providers: computed(() => props.providers || {}),
      nativeUrl: resolvedNativeUrl,
      nativeLabel: computed(() => t("fileView.preview.epub.browserNative"))
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "previewContainerRef",
        ref: previewContainerRef,
        class: "epub-preview rounded-lg overflow-hidden mb-2 flex-grow w-full relative border border-gray-200 dark:border-gray-700"
      }, [
        createVNode(PreviewProviderHeader, {
          title: __props.filename || "EPUB",
          options: unref(providerOptions),
          modelValue: unref(selectedProviderKey),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(selectedProviderKey) ? selectedProviderKey.value = $event : null),
          "show-select": unref(providerOptions).length > 1,
          "show-fullscreen": true,
          "fullscreen-target": previewContainerRef.value,
          onFullscreenChange: handleFullscreenChange
        }, null, 8, ["title", "options", "modelValue", "show-select", "fullscreen-target"]),
        createBaseVNode("div", {
          class: normalizeClass(["relative w-full", isFullscreen.value ? "h-screen" : "h-[calc(100vh-350px)] min-h-[300px]"])
        }, [
          unref(isNativeProvider) ? (openBlock(), createBlock(FoliateEpubView, {
            key: 0,
            "src-url": unref(currentNativeUrl),
            "dark-mode": __props.darkMode,
            "loading-text": unref(t)("fileView.preview.epub.loading"),
            "error-text": unref(t)("fileView.preview.epub.error"),
            class: "w-full h-full",
            onLoad: _cache[1] || (_cache[1] = ($event) => emit("load")),
            onError: _cache[2] || (_cache[2] = ($event) => emit("error"))
          }, null, 8, ["src-url", "dark-mode", "loading-text", "error-text"])) : (openBlock(), createBlock(_sfc_main$f, {
            key: 1,
            providers: unref(currentIframeProviders),
            "dark-mode": __props.darkMode,
            "loading-text": unref(t)("fileView.preview.loading"),
            "error-text": unref(t)("fileView.preview.error"),
            class: "w-full h-full",
            onLoad: _cache[3] || (_cache[3] = ($event) => emit("load")),
            onError: _cache[4] || (_cache[4] = ($event) => emit("error"))
          }, null, 8, ["providers", "dark-mode", "loading-text", "error-text"]))
        ], 2)
      ], 512);
    };
  }
};
const EpubPreview = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-49a4e783"]]);
const _hoisted_1$7 = { class: "text-preview rounded-lg overflow-hidden mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex-grow flex flex-col w-full" };
const _hoisted_2$7 = { class: "flex flex-wrap items-center justify-between gap-2 p-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600" };
const _hoisted_3$7 = { class: "flex items-center gap-2 min-w-0" };
const _hoisted_4$7 = { class: "text-sm font-medium text-gray-700 dark:text-gray-300 truncate hidden sm:inline" };
const _hoisted_5$7 = ["value"];
const _hoisted_6$7 = { class: "hidden sm:flex items-center gap-1" };
const _hoisted_7$6 = ["onClick"];
const _hoisted_8$6 = { class: "flex items-center gap-2 flex-shrink-0" };
const _hoisted_9$5 = {
  key: 0,
  class: "text-xs text-gray-500 dark:text-gray-400 flex gap-1 sm:gap-2"
};
const _hoisted_10$5 = { class: "hidden sm:inline" };
const _hoisted_11$4 = { class: "sm:hidden" };
const _hoisted_12$4 = { class: "hidden sm:inline" };
const _hoisted_13$4 = { class: "sm:hidden" };
const _hoisted_14$4 = {
  key: 1,
  class: "flex items-center gap-1"
};
const _hoisted_15$2 = ["value"];
const _hoisted_16$2 = {
  class: "p-4 overflow-auto flex-grow relative",
  style: { "max-height": "calc(100vh - 350px)", "min-height": "200px" }
};
const _hoisted_17$2 = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
};
const _hoisted_18$1 = { class: "text-red-600 dark:text-red-400 text-sm" };
const _hoisted_19$1 = {
  key: 2,
  class: "absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
};
const _sfc_main$7 = {
  __name: "TextPreview",
  props: {
    contentUrl: {
      type: String,
      required: true
    },
    filename: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    language: {
      type: String,
      default: ""
    },
    loadingText: {
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
    const log = createLogger("TextPreview");
    const props = __props;
    const emit = __emit;
    const currentMode = ref("text");
    const previewModes = computed(() => [
      { value: "text", label: t("fileView.preview.modes.text") },
      { value: "code", label: t("fileView.preview.modes.code") },
      { value: "markdown", label: t("fileView.preview.modes.markdown") },
      { value: "html", label: t("fileView.preview.modes.html") }
    ]);
    const switchMode = (mode) => {
      currentMode.value = mode;
    };
    const effectiveTitle = computed(() => {
      if (props.title) return props.title;
      if (currentMode.value === "code") return t("fileView.preview.code.title");
      if (currentMode.value === "markdown") return t("fileView.preview.markdown.title");
      if (currentMode.value === "html") return t("fileView.preview.html.title");
      return t("fileView.preview.text.title");
    });
    const {
      textContent,
      detectedLanguage,
      currentEncoding,
      error,
      loadTextContent: loadText,
      handleEncodingChange: changeEncoding
    } = useTextPreview({
      checkCancelled: false,
      emitEncodingChange: false
    });
    const displayedError = computed(() => {
      if (!props.contentUrl) return "预览 URL 不可用";
      return error.value || "";
    });
    const lineCount = computed(() => {
      if (!textContent.value) return 0;
      return textContent.value.split("\n").length;
    });
    const characterCount = computed(() => {
      if (!textContent.value) return 0;
      return textContent.value.length;
    });
    const { availableEncodings } = useFetchText();
    const adaptedFileData = computed(() => {
      if (!props.contentUrl) return null;
      return {
        name: props.filename || "text-file",
        filename: props.filename || "text-file",
        // 文本内容统一通过 contentUrl 访问
        contentUrl: props.contentUrl,
        contentType: "text/plain"
      };
    });
    const loadTextContent = async () => {
      if (!adaptedFileData.value) {
        log.warn("没有可用的文件数据");
        return;
      }
      await loadText(adaptedFileData.value, emit);
    };
    const handleEncodingChange = async () => {
      if (!adaptedFileData.value) return;
      await changeEncoding(currentEncoding.value, emit);
    };
    const handleLoad = () => {
    };
    const handleError = (error2) => {
      emit("error", error2);
    };
    watch(
      () => props.contentUrl,
      (url) => {
        if (!url) {
          emit("error", "预览 URL 不可用");
          return;
        }
        loadTextContent();
      },
      { immediate: true }
    );
    watch(
      () => props.filename,
      (name) => {
        currentMode.value = getPreviewModeFromFilename(name || "");
      },
      { immediate: true }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        createBaseVNode("div", _hoisted_2$7, [
          createBaseVNode("div", _hoisted_3$7, [
            createBaseVNode("span", _hoisted_4$7, toDisplayString(effectiveTitle.value), 1),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => currentMode.value = $event),
              class: "sm:hidden text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(previewModes.value, (mode) => {
                return openBlock(), createElementBlock("option", {
                  key: mode.value,
                  value: mode.value
                }, toDisplayString(mode.label), 9, _hoisted_5$7);
              }), 128))
            ], 512), [
              [vModelSelect, currentMode.value]
            ]),
            createBaseVNode("div", _hoisted_6$7, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(previewModes.value, (mode) => {
                return openBlock(), createElementBlock("button", {
                  key: mode.value,
                  type: "button",
                  class: normalizeClass([
                    "text-xs px-2 py-0.5 rounded border",
                    currentMode.value === mode.value ? "bg-blue-600 text-white border-blue-600" : __props.darkMode ? "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-200"
                  ]),
                  onClick: ($event) => switchMode(mode.value)
                }, toDisplayString(mode.label), 11, _hoisted_7$6);
              }), 128))
            ])
          ]),
          createBaseVNode("div", _hoisted_8$6, [
            unref(textContent) ? (openBlock(), createElementBlock("div", _hoisted_9$5, [
              createBaseVNode("span", _hoisted_10$5, toDisplayString(lineCount.value) + " L", 1),
              createBaseVNode("span", _hoisted_11$4, toDisplayString(lineCount.value) + "L", 1),
              createBaseVNode("span", _hoisted_12$4, toDisplayString(characterCount.value) + " Chars", 1),
              createBaseVNode("span", _hoisted_13$4, toDisplayString(characterCount.value) + "C", 1)
            ])) : createCommentVNode("", true),
            unref(textContent) ? (openBlock(), createElementBlock("div", _hoisted_14$4, [
              _cache[2] || (_cache[2] = createBaseVNode("span", { class: "text-xs text-gray-500 dark:text-gray-400 hidden sm:inline" }, "Enc:", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(currentEncoding) ? currentEncoding.value = $event : null),
                onChange: handleEncodingChange,
                class: "text-xs px-1 py-0.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(availableEncodings), (encoding) => {
                  return openBlock(), createElementBlock("option", {
                    key: encoding.value,
                    value: encoding.value
                  }, toDisplayString(encoding.label), 9, _hoisted_15$2);
                }), 128))
              ], 544), [
                [vModelSelect, unref(currentEncoding)]
              ])
            ])) : createCommentVNode("", true)
          ])
        ]),
        createBaseVNode("div", _hoisted_16$2, [
          unref(textContent) ? (openBlock(), createBlock(TextRenderer, {
            key: 0,
            content: unref(textContent),
            mode: currentMode.value,
            language: currentMode.value === "code" ? unref(detectedLanguage) : "",
            filename: adaptedFileData.value?.name || "",
            "dark-mode": __props.darkMode,
            "show-line-numbers": currentMode.value === "code",
            "read-only": true,
            "show-stats": false,
            "max-height": "100%",
            onLoad: handleLoad,
            onError: handleError
          }, null, 8, ["content", "mode", "language", "filename", "dark-mode", "show-line-numbers"])) : displayedError.value ? (openBlock(), createElementBlock("div", _hoisted_17$2, [
            createBaseVNode("p", _hoisted_18$1, toDisplayString(displayedError.value), 1)
          ])) : (openBlock(), createElementBlock("div", _hoisted_19$1, [
            createVNode(_sfc_main$e, {
              text: __props.loadingText || unref(t)("fileView.preview.text.loading"),
              "dark-mode": __props.darkMode,
              size: "xl",
              "icon-class": "text-blue-500",
              "text-class": __props.darkMode ? "text-blue-400" : "text-blue-600"
            }, null, 8, ["text", "dark-mode", "text-class"])
          ]))
        ])
      ]);
    };
  }
};
const _hoisted_1$6 = { class: "office-custom-footer" };
const _hoisted_2$6 = {
  key: 0,
  class: "text-red-500 mb-1"
};
const _hoisted_3$6 = { key: 1 };
const _hoisted_4$6 = { class: "text-amber-500 text-sm mb-2" };
const _hoisted_5$6 = { class: "text-left text-sm text-gray-600 dark:text-gray-300 list-disc pl-5 mb-2" };
const _hoisted_6$6 = ["href"];
const _sfc_main$6 = {
  __name: "OfficeSharePreview",
  props: {
    // DocumentApp providers 映射，例如 { native: 'native', microsoft: 'https://...', google: 'https://...' }
    providers: {
      type: Object,
      default: () => ({})
    },
    // native 渲染所需内容 URL（同源内容口）
    contentUrl: {
      type: String,
      default: ""
    },
    filename: {
      type: String,
      default: ""
    },
    downloadUrl: {
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
    const log = createLogger("OfficeSharePreview");
    const emit = __emit;
    const previewContainerRef = ref(null);
    const isFullscreen = ref(false);
    const localErrorMessage = ref("");
    const handleLoad = () => {
      localErrorMessage.value = "";
      emit("load");
    };
    const handleError = (err) => {
      log.error("Office 预览错误:", err);
      localErrorMessage.value = err?.message || t("fileView.preview.office.error") || "预览加载失败";
      emit("error", err);
    };
    const handleProviderChange = () => {
      localErrorMessage.value = "";
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "previewContainerRef",
        ref: previewContainerRef,
        class: "office-preview-wrapper flex-grow flex flex-col w-full"
      }, [
        createVNode(unref(OfficePreviewContainer), {
          "content-url": __props.contentUrl,
          filename: __props.filename,
          providers: __props.providers,
          "height-mode": isFullscreen.value ? "flex" : "fixed",
          "show-provider-selector": true,
          "show-footer": true,
          "show-fullscreen": true,
          "fullscreen-target": previewContainerRef.value,
          "download-url": __props.downloadUrl,
          "error-message": localErrorMessage.value,
          onLoad: handleLoad,
          onError: handleError,
          onProviderChange: handleProviderChange
        }, {
          footer: withCtx(({ downloadUrl: dlUrl }) => [
            createBaseVNode("div", _hoisted_1$6, [
              localErrorMessage.value ? (openBlock(), createElementBlock("p", _hoisted_2$6, toDisplayString(localErrorMessage.value), 1)) : createCommentVNode("", true),
              localErrorMessage.value && localErrorMessage.value.includes("401") ? (openBlock(), createElementBlock("div", _hoisted_3$6, [
                createBaseVNode("p", _hoisted_4$6, toDisplayString(unref(t)("fileView.preview.office.passwordIssue")), 1),
                createBaseVNode("ul", _hoisted_5$6, [
                  createBaseVNode("li", null, toDisplayString(unref(t)("fileView.preview.office.refreshAndRetry")), 1),
                  createBaseVNode("li", null, toDisplayString(unref(t)("fileView.preview.office.confirmPassword")), 1),
                  createBaseVNode("li", null, toDisplayString(unref(t)("fileView.preview.office.tryUrlPassword")), 1)
                ])
              ])) : createCommentVNode("", true),
              createBaseVNode("p", null, [
                createTextVNode(toDisplayString(unref(t)("fileView.preview.office.previewTrouble")) + " " + toDisplayString(unref(t)("fileView.preview.office.switchService")) + " ", 1),
                createBaseVNode("a", {
                  href: dlUrl || __props.downloadUrl,
                  class: "text-blue-500 hover:underline",
                  target: "_blank"
                }, toDisplayString(unref(t)("fileView.preview.office.downloadFile")), 9, _hoisted_6$6),
                createTextVNode(" " + toDisplayString(unref(t)("fileView.preview.office.afterDownload")), 1)
              ])
            ])
          ]),
          _: 1
        }, 8, ["content-url", "filename", "providers", "height-mode", "fullscreen-target", "download-url", "error-message"])
      ], 512);
    };
  }
};
const OfficeSharePreview = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-84111b28"]]);
const _hoisted_1$5 = {
  class: "generic-preview text-center py-6 w-full self-center flex flex-col items-center justify-center",
  style: { "min-height": "200px" }
};
const _hoisted_2$5 = { class: "text-gray-600 dark:text-gray-300 font-medium" };
const _hoisted_3$5 = { class: "text-gray-500 dark:text-gray-400 text-sm mt-2" };
const _hoisted_4$5 = {
  key: 0,
  class: "mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-left max-w-md"
};
const _hoisted_5$5 = { class: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_6$5 = { class: "space-y-1 text-xs text-gray-600 dark:text-gray-400" };
const _hoisted_7$5 = { key: 0 };
const _hoisted_8$5 = { class: "font-medium" };
const _hoisted_9$4 = { key: 1 };
const _hoisted_10$4 = { class: "font-medium" };
const _hoisted_11$3 = { key: 2 };
const _hoisted_12$3 = { class: "font-medium" };
const _hoisted_13$3 = { key: 3 };
const _hoisted_14$3 = { class: "font-medium" };
const _sfc_main$5 = {
  __name: "GenericPreview",
  props: {
    iconClass: {
      type: String,
      default: "text-gray-400"
    },
    filename: {
      type: String,
      default: ""
    },
    mimetype: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const { t } = useI18n();
    const props = __props;
    const showDetails = ref(false);
    const fileExtension = computed(() => {
      if (!props.filename) return "";
      const parts = props.filename.split(".");
      return parts.length > 1 ? `.${parts.pop().toLowerCase()}` : "";
    });
    const fileTypeDescription = computed(() => {
      const ext = fileExtension.value.toLowerCase();
      const mime = props.mimetype.toLowerCase();
      const typeDescriptions = {
        // 压缩文件
        ".zip": "压缩文件",
        ".rar": "RAR压缩文件",
        ".7z": "7-Zip压缩文件",
        ".tar": "TAR归档文件",
        ".gz": "Gzip压缩文件",
        // 可执行文件
        ".exe": "Windows可执行文件",
        ".msi": "Windows安装包",
        ".dmg": "macOS磁盘映像",
        ".deb": "Debian安装包",
        ".rpm": "RPM安装包",
        // 数据库文件
        ".db": "数据库文件",
        ".sqlite": "SQLite数据库",
        ".sql": "SQL脚本文件",
        // 字体文件
        ".ttf": "TrueType字体",
        ".otf": "OpenType字体",
        ".woff": "Web字体",
        // 其他
        ".iso": "光盘映像文件",
        ".bin": "二进制文件",
        ".log": "日志文件"
      };
      if (typeDescriptions[ext]) {
        return typeDescriptions[ext];
      }
      if (mime.startsWith("application/")) {
        return t("fileView.preview.generic.applicationFile");
      } else if (mime.startsWith("font/")) {
        return t("fileView.preview.generic.fontFile");
      } else if (mime.startsWith("model/")) {
        return t("fileView.preview.generic.modelFile");
      }
      return t("fileView.preview.generic.unsupportedType");
    });
    const actionSuggestion = computed(() => {
      const ext = fileExtension.value.toLowerCase();
      if ([".zip", ".rar", ".7z", ".tar", ".gz"].includes(ext)) {
        return t("fileView.preview.generic.downloadAndExtract");
      } else if ([".exe", ".msi", ".dmg", ".deb", ".rpm"].includes(ext)) {
        return t("fileView.preview.generic.downloadAndInstall");
      } else if ([".db", ".sqlite"].includes(ext)) {
        return t("fileView.preview.generic.downloadAndOpenWithDb");
      } else if ([".ttf", ".otf", ".woff"].includes(ext)) {
        return t("fileView.preview.generic.downloadAndInstallFont");
      } else if (ext === ".iso") {
        return t("fileView.preview.generic.downloadAndMount");
      }
      return t("fileView.preview.generic.downloadAndOpenWith");
    });
    const suggestedApps = computed(() => {
      const ext = fileExtension.value.toLowerCase();
      const appSuggestions = {
        ".zip": ["WinRAR", "7-Zip", "WinZip"],
        ".rar": ["WinRAR", "7-Zip"],
        ".7z": ["7-Zip", "WinRAR"],
        ".exe": ["Windows系统"],
        ".msi": ["Windows安装程序"],
        ".dmg": ["macOS系统"],
        ".db": ["DB Browser for SQLite", "DBeaver"],
        ".sqlite": ["DB Browser for SQLite", "SQLite Expert"],
        ".sql": ["MySQL Workbench", "phpMyAdmin", "DBeaver"],
        ".ttf": ["字体管理器", "系统字体安装"],
        ".otf": ["字体管理器", "系统字体安装"],
        ".iso": ["虚拟光驱软件", "刻录软件"],
        ".log": ["文本编辑器", "Notepad++", "VS Code"]
      };
      return appSuggestions[ext] || [];
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        createVNode(unref(IconDocumentText), {
          class: normalizeClass(["h-16 w-16 mx-auto mb-3", __props.iconClass])
        }, null, 8, ["class"]),
        createBaseVNode("p", _hoisted_2$5, toDisplayString(fileTypeDescription.value), 1),
        createBaseVNode("p", _hoisted_3$5, toDisplayString(actionSuggestion.value), 1),
        showDetails.value ? (openBlock(), createElementBlock("div", _hoisted_4$5, [
          createBaseVNode("h4", _hoisted_5$5, toDisplayString(unref(t)("fileView.preview.generic.fileInfo")), 1),
          createBaseVNode("div", _hoisted_6$5, [
            __props.filename ? (openBlock(), createElementBlock("div", _hoisted_7$5, [
              createBaseVNode("span", _hoisted_8$5, toDisplayString(unref(t)("fileView.preview.generic.filename")) + ":", 1),
              createTextVNode(" " + toDisplayString(__props.filename), 1)
            ])) : createCommentVNode("", true),
            __props.mimetype ? (openBlock(), createElementBlock("div", _hoisted_9$4, [
              createBaseVNode("span", _hoisted_10$4, toDisplayString(unref(t)("fileView.preview.generic.mimeType")) + ":", 1),
              createTextVNode(" " + toDisplayString(__props.mimetype), 1)
            ])) : createCommentVNode("", true),
            fileExtension.value ? (openBlock(), createElementBlock("div", _hoisted_11$3, [
              createBaseVNode("span", _hoisted_12$3, toDisplayString(unref(t)("fileView.preview.generic.fileExtension")) + ":", 1),
              createTextVNode(" " + toDisplayString(fileExtension.value), 1)
            ])) : createCommentVNode("", true),
            suggestedApps.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_13$3, [
              createBaseVNode("span", _hoisted_14$3, toDisplayString(unref(t)("fileView.preview.generic.suggestedApps")) + ":", 1),
              createTextVNode(" " + toDisplayString(suggestedApps.value.join(", ")), 1)
            ])) : createCommentVNode("", true)
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("button", {
          onClick: _cache[0] || (_cache[0] = ($event) => showDetails.value = !showDetails.value),
          class: "mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline"
        }, toDisplayString(showDetails.value ? unref(t)("fileView.preview.generic.hideDetails") : unref(t)("fileView.preview.generic.showDetails")), 1)
      ]);
    };
  }
};
const _hoisted_1$4 = { class: "file-header mb-6" };
const _hoisted_2$4 = { class: "flex items-center gap-3" };
const _hoisted_3$4 = { class: "file-icon flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700" };
const _hoisted_4$4 = { class: "flex-1 min-w-0" };
const _hoisted_5$4 = { class: "text-xl font-bold truncate text-gray-900 dark:text-white" };
const _hoisted_6$4 = { class: "text-sm text-gray-500 dark:text-gray-400" };
const _hoisted_7$4 = {
  key: 0,
  class: "file-remark mb-6 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-auto max-h-[300px]"
};
const _hoisted_8$4 = { class: "text-blue-600 dark:text-blue-400 break-words whitespace-pre-wrap" };
const _hoisted_9$3 = { class: "flex-grow min-h-0" };
const _hoisted_10$3 = {
  key: 2,
  class: "file-preview mb-6 flex-grow flex items-center justify-center"
};
const _hoisted_11$2 = { class: "text-sm text-gray-600 dark:text-gray-400" };
const _hoisted_12$2 = {
  key: 3,
  class: "exif-compact mb-4 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden"
};
const _hoisted_13$2 = { class: "flex items-center gap-2 min-w-0 flex-1" };
const _hoisted_14$2 = { class: "text-sm text-gray-800 dark:text-gray-200 truncate" };
const _hoisted_15$1 = {
  key: 0,
  class: "flex-shrink-0"
};
const _hoisted_16$1 = { class: "overflow-hidden" };
const _hoisted_17$1 = { class: "px-3 pb-3 space-y-2 border-t border-gray-200 dark:border-gray-700 pt-2" };
const _hoisted_18 = {
  key: 0,
  class: "flex items-center gap-2 flex-wrap"
};
const _hoisted_19 = { class: "text-xs font-mono text-gray-600 dark:text-gray-400" };
const _hoisted_20 = {
  key: 1,
  class: "flex items-center gap-2 flex-wrap text-xs text-gray-500 dark:text-gray-400"
};
const _hoisted_21 = {
  key: 0,
  class: "flex items-center gap-1"
};
const _hoisted_22 = {
  key: 1,
  class: "text-gray-300 dark:text-gray-600"
};
const _hoisted_23 = {
  key: 2,
  class: "flex items-center gap-1"
};
const _hoisted_24 = { class: "font-mono" };
const _hoisted_25 = ["href"];
const _hoisted_26 = ["href"];
const _hoisted_27 = {
  key: 2,
  class: "mt-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
};
const _hoisted_28 = {
  key: 3,
  class: "mt-2 p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-center"
};
const _hoisted_29 = { class: "file-metadata grid grid-cols-1 md:grid-cols-2 gap-3 mb-6" };
const _hoisted_30 = { class: "metadata-item p-3 rounded-lg bg-gray-100 dark:bg-gray-700" };
const _hoisted_31 = { class: "flex items-center" };
const _hoisted_32 = { class: "text-sm font-medium text-gray-600 dark:text-gray-200" };
const _hoisted_33 = { class: "mt-1 text-sm pl-7 text-gray-800 dark:text-white" };
const _hoisted_34 = { class: "metadata-item p-3 rounded-lg bg-gray-100 dark:bg-gray-700" };
const _hoisted_35 = { class: "flex items-center" };
const _hoisted_36 = { class: "text-sm font-medium text-gray-600 dark:text-gray-200" };
const _hoisted_37 = { class: "mt-1 text-sm pl-7 text-gray-800 dark:text-white" };
const _hoisted_38 = {
  key: 0,
  class: "text-xs text-gray-500 dark:text-gray-400"
};
const _hoisted_39 = {
  key: 0,
  class: "metadata-item p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
};
const _hoisted_40 = { class: "flex items-center" };
const _hoisted_41 = { class: "text-sm font-medium text-gray-600 dark:text-gray-200" };
const _hoisted_42 = { class: "mt-1 text-sm pl-7 text-gray-800 dark:text-white" };
const _hoisted_43 = { class: "metadata-item p-3 rounded-lg bg-gray-100 dark:bg-gray-700" };
const _hoisted_44 = { class: "flex items-center" };
const _hoisted_45 = { class: "text-sm font-medium text-gray-600 dark:text-gray-200" };
const _hoisted_46 = { class: "mt-1 text-sm pl-7 text-gray-800 dark:text-white" };
const _hoisted_47 = { class: "metadata-item p-3 rounded-lg bg-gray-100 dark:bg-gray-700" };
const _hoisted_48 = { class: "flex items-center" };
const _hoisted_49 = { class: "text-sm font-medium text-gray-600 dark:text-gray-200" };
const _hoisted_50 = { class: "mt-1 pl-7 flex items-center relative" };
const _hoisted_51 = { class: "text-sm truncate flex-1 text-gray-800 dark:text-white" };
const _hoisted_52 = ["title"];
const _hoisted_53 = {
  key: 1,
  class: "absolute right-0 -top-10 px-3 py-2 rounded-md shadow-md text-sm transition-opacity duration-300 bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 border border-gray-200 dark:border-gray-600"
};
const _hoisted_54 = { class: "flex items-center" };
const _sfc_main$4 = {
  __name: "FileViewInfo",
  props: {
    fileInfo: {
      type: Object,
      required: true
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const { t } = useI18n();
    const fileshareService = useFileshareService();
    const route = useRoute();
    const props = __props;
    const shareUrl = computed(() => {
      return window.location.href;
    });
    const showCopyToast = ref(false);
    const exifData = ref(null);
    const exifExpanded = ref(false);
    const mapLoadError = ref(false);
    const handleMapLoad = () => {
      mapLoadError.value = false;
    };
    const handleMapError = () => {
      mapLoadError.value = true;
    };
    const showExifSection = computed(() => isImageLikeForExif({ ...props.fileInfo, name: props.fileInfo.filename }));
    const processedPreviewUrl = computed(() => {
      return fileshareService.getPermanentPreviewUrl(props.fileInfo) || "";
    });
    const resolvedPreview = computed(() => resolvePreviewSelection({ file: props.fileInfo }));
    const previewKey = computed(() => resolvedPreview.value.key);
    const formattedSize = computed(() => {
      return typeof props.fileInfo.size === "number" ? formatFileSize(props.fileInfo.size) : "-";
    });
    const formattedMimeType = computed(() => {
      return props.fileInfo.mimetype || "";
    });
    const formattedCreatedAt = computed(() => {
      return formatDateTime(props.fileInfo.created_at);
    });
    const formattedExpiresAt = computed(() => {
      return formatDateTime(props.fileInfo.expires_at);
    });
    const isOfficeFile = computed(() => previewKey.value === PREVIEW_KEYS.OFFICE);
    const isImage = computed(() => previewKey.value === PREVIEW_KEYS.IMAGE);
    const isVideo = computed(() => previewKey.value === PREVIEW_KEYS.VIDEO);
    const isAudio = computed(() => previewKey.value === PREVIEW_KEYS.AUDIO);
    const isPdf = computed(() => previewKey.value === PREVIEW_KEYS.PDF);
    const isEpub = computed(() => previewKey.value === PREVIEW_KEYS.EPUB);
    const isText = computed(() => previewKey.value === PREVIEW_KEYS.TEXT);
    const iframeContainerRef = ref(null);
    const iframeFullscreen = ref(false);
    const iframeProviderOptions = ref([]);
    const iframeProviderKey = ref("");
    const handleIframeFullscreenChange = (val) => {
      iframeFullscreen.value = val;
    };
    const handlePreviewProviderOptions = (options) => {
      if (previewKey.value !== PREVIEW_KEYS.IFRAME) return;
      const normalized = Array.isArray(options) ? options : [];
      iframeProviderOptions.value = normalized;
      if (!normalized.length) {
        iframeProviderKey.value = "";
        return;
      }
      if (!iframeProviderKey.value || !normalized.some((opt) => opt.key === iframeProviderKey.value)) {
        iframeProviderKey.value = normalized[0]?.key || "";
      }
    };
    const iconClass = computed(() => {
      const iconType = getIconType(props.fileInfo);
      const colorMap = {
        image: "text-green-500",
        video: "text-purple-500",
        audio: "text-blue-500",
        text: "text-yellow-500",
        document: "text-red-500",
        book: "text-amber-500",
        folder: "text-blue-500",
        file: "text-gray-500"
      };
      return colorMap[iconType] || "text-gray-500";
    });
    const headerIconComponent = computed(() => {
      const iconType = getIconType(props.fileInfo);
      if (iconType === "book") return IconBookOpen;
      return IconDocumentText;
    });
    const currentPreviewComponent = computed(() => {
      const componentMap = {
        [PREVIEW_KEYS.IMAGE]: ImagePreview,
        [PREVIEW_KEYS.VIDEO]: VideoPreview,
        [PREVIEW_KEYS.AUDIO]: AudioPreview,
        [PREVIEW_KEYS.PDF]: PdfPreview,
        [PREVIEW_KEYS.EPUB]: EpubPreview,
        [PREVIEW_KEYS.TEXT]: _sfc_main$7,
        [PREVIEW_KEYS.OFFICE]: OfficeSharePreview,
        [PREVIEW_KEYS.IFRAME]: _sfc_main$f,
        [PREVIEW_KEYS.ARCHIVE]: _sfc_main$5,
        [PREVIEW_KEYS.DOWNLOAD]: _sfc_main$5
      };
      return componentMap[previewKey.value] || _sfc_main$5;
    });
    const shouldShowPreview = computed(() => {
      if (isText.value) {
        return true;
      }
      return Boolean(processedPreviewUrl.value) || isOfficeFile.value;
    });
    const previewComponentProps = computed(() => {
      const previewUrl = processedPreviewUrl.value;
      const baseProps = {
        filename: props.fileInfo.filename,
        mimetype: props.fileInfo.mimetype
      };
      const effectiveSlug = props.fileInfo?.slug || route.params?.slug || route.params?.fileSlug || "";
      const effectiveContentUrl = effectiveSlug ? fileshareService.getPermanentContentUrl({ ...props.fileInfo, slug: effectiveSlug }) : "";
      if (isText.value) {
        return {
          ...baseProps,
          contentUrl: effectiveContentUrl,
          darkMode: props.darkMode,
          loadingText: t("fileView.preview.text.loading")
        };
      }
      if (previewKey.value === PREVIEW_KEYS.IFRAME) {
        return {
          providers: resolvedPreview.value.providers || {},
          selectedProvider: iframeProviderKey.value,
          darkMode: props.darkMode,
          loadingText: t("fileView.preview.loading"),
          errorText: t("fileView.preview.error")
        };
      }
      if (isPdf.value) {
        const providers = resolvedPreview.value.providers || {};
        return {
          ...baseProps,
          previewUrl,
          providers,
          nativeUrl: previewUrl
        };
      }
      if (isEpub.value) {
        return {
          ...baseProps,
          providers: resolvedPreview.value.providers || {},
          previewUrl,
          nativeUrl: previewUrl,
          darkMode: props.darkMode
        };
      }
      if (isOfficeFile.value) {
        return {
          providers: resolvedPreview.value.providers || {},
          filename: props.fileInfo.filename,
          downloadUrl: fileshareService.getPermanentDownloadUrl(props.fileInfo),
          contentUrl: effectiveContentUrl,
          darkMode: props.darkMode
        };
      }
      if (isImage.value) {
        return {
          ...baseProps,
          providers: resolvedPreview.value.providers || {},
          nativeUrl: previewUrl,
          previewUrl,
          darkMode: props.darkMode,
          // Live Photo 支持：videoUrl 需要从外部传入（如果有配对的视频文件）
          // 在单文件分享场景中，通常不会有配对的视频文件
          videoUrl: ""
        };
      }
      if (isAudio.value) {
        return {
          ...baseProps,
          providers: resolvedPreview.value.providers || {},
          nativeUrl: previewUrl,
          previewUrl,
          darkMode: props.darkMode
        };
      }
      if (isVideo.value) {
        return {
          ...baseProps,
          providers: resolvedPreview.value.providers || {},
          nativeUrl: previewUrl,
          previewUrl,
          linkType: props.fileInfo.linkType || null,
          darkMode: props.darkMode
        };
      }
      return {
        iconClass: iconClass.value,
        filename: props.fileInfo.filename,
        mimetype: props.fileInfo.mimetype
      };
    });
    const handlePreviewLoad = () => void 0;
    const handlePreviewError = () => void 0;
    const handleToggleMode = () => void 0;
    const copyToClipboard$1 = async (text) => {
      try {
        const success = await copyToClipboard(text);
        if (success) {
          showCopyToast.value = true;
          setTimeout(() => {
            showCopyToast.value = false;
          }, 3e3);
        } else {
          throw new Error("复制失败");
        }
      } catch {
      }
    };
    const parseExif = async () => {
      if (!showExifSection.value || !processedPreviewUrl.value) {
        exifData.value = null;
        return;
      }
      try {
        const url = processedPreviewUrl.value;
        if (url.startsWith("blob:") || url.startsWith("data:")) {
          exifData.value = null;
          return;
        }
        const res = await fetch(url);
        if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
        const ct = String(res.headers.get("content-type") || "").toLowerCase();
        if (ct && ct.includes("text/html")) throw new Error("unexpected content-type");
        const buf = await res.arrayBuffer();
        const tags = await loadExifTagsFromArrayBufferAsync(buf);
        const gpsCoords = resolveGpsCoordinates(tags);
        const rows = buildExifRows(tags).filter((r) => r.key !== "location");
        const summary = buildExifSummary(rows);
        const hasSummary = !!(summary.camera || summary.params || summary.date);
        const hasGps = !!gpsCoords;
        exifData.value = hasSummary || hasGps ? { gpsCoords, summary, rows } : null;
      } catch {
        exifData.value = null;
      }
    };
    const buildExifSummary = (rows) => {
      const result = { camera: "", params: "", date: "" };
      const rowMap = Object.fromEntries(rows.map((r) => [r.key, r.value]));
      const cameraParts = [rowMap.camera, rowMap.lensModel].filter(Boolean);
      result.camera = cameraParts.join(" · ");
      const paramParts = [rowMap.aperture, rowMap.shutter, rowMap.iso, rowMap.focalLength].filter(Boolean);
      result.params = paramParts.join(" · ");
      result.date = rowMap.dateTimeOriginal || "";
      return result;
    };
    const exifParams = computed(() => {
      if (!exifData.value?.rows) return {};
      const rowMap = Object.fromEntries(exifData.value.rows.map((r) => [r.key, r.value]));
      return {
        aperture: rowMap.aperture || "",
        shutter: rowMap.shutter || "",
        iso: rowMap.iso ? rowMap.iso.replace(/^ISO\s*/i, "") : "",
        focalLength: rowMap.focalLength || ""
      };
    });
    const hasExifParams = computed(() => {
      const p = exifParams.value;
      return !!(p.aperture || p.shutter || p.iso || p.focalLength);
    });
    const googleMapsUrl = computed(() => {
      if (!exifData.value?.gpsCoords) return "";
      const { lat, lng } = exifData.value.gpsCoords;
      const safeLat = Math.min(90, Math.max(-90, Number(lat) || 0));
      const safeLng = Math.min(180, Math.max(-180, Number(lng) || 0));
      const url = new URL("https://www.google.com/maps");
      url.searchParams.set("q", `${safeLat},${safeLng}`);
      return url.toString();
    });
    const amapUrl = computed(() => {
      if (!exifData.value?.gpsCoords) return "";
      const { lat, lng } = exifData.value.gpsCoords;
      const safeLat = Math.min(90, Math.max(-90, Number(lat) || 0));
      const safeLng = Math.min(180, Math.max(-180, Number(lng) || 0));
      const url = new URL("https://uri.amap.com/marker");
      url.searchParams.set("position", `${safeLng},${safeLat}`);
      url.searchParams.set("name", "拍摄位置");
      return url.toString();
    });
    const formattedGps = computed(() => {
      if (!exifData.value?.gpsCoords) return "";
      const { lat, lng } = exifData.value.gpsCoords;
      const latDir = lat >= 0 ? "N" : "S";
      const lngDir = lng >= 0 ? "E" : "W";
      return `${Math.abs(lat).toFixed(5)}°${latDir} ${Math.abs(lng).toFixed(5)}°${lngDir}`;
    });
    const savePasswordToSessionStorage = () => {
      if (!props.fileInfo.slug) return;
      try {
        let password = null;
        if (props.fileInfo.currentPassword) {
          password = props.fileInfo.currentPassword;
        } else {
          const currentUrl = new URL(window.location.href);
          const passwordParam = currentUrl.searchParams.get("password");
          if (passwordParam) {
            password = passwordParam;
          }
        }
        if (password) {
          setFilePassword(props.fileInfo.slug, password);
        }
      } catch {
      }
    };
    onMounted(() => {
      savePasswordToSessionStorage();
    });
    watch(
      () => processedPreviewUrl.value,
      () => {
        void parseExif();
      },
      { immediate: true }
    );
    onUnmounted(() => {
      if (showCopyToast.value) {
        showCopyToast.value = false;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["file-info-container flex flex-col min-h-0", previewKey.value === unref(PREVIEW_KEYS).AUDIO ? "" : "flex-grow"])
      }, [
        createBaseVNode("div", _hoisted_1$4, [
          createBaseVNode("div", _hoisted_2$4, [
            createBaseVNode("div", _hoisted_3$4, [
              (openBlock(), createBlock(resolveDynamicComponent(headerIconComponent.value), {
                class: normalizeClass([iconClass.value, "h-6 w-6"])
              }, null, 8, ["class"]))
            ]),
            createBaseVNode("div", _hoisted_4$4, [
              createBaseVNode("h1", _hoisted_5$4, toDisplayString(__props.fileInfo.filename), 1),
              createBaseVNode("p", _hoisted_6$4, toDisplayString(formattedMimeType.value) + " · " + toDisplayString(formattedSize.value), 1)
            ])
          ])
        ]),
        __props.fileInfo.remark ? (openBlock(), createElementBlock("div", _hoisted_7$4, [
          createBaseVNode("p", _hoisted_8$4, toDisplayString(__props.fileInfo.remark), 1)
        ])) : createCommentVNode("", true),
        shouldShowPreview.value ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["file-preview mb-6 flex flex-col min-h-0 w-full", previewKey.value === unref(PREVIEW_KEYS).AUDIO ? "" : "flex-grow"])
        }, [
          previewKey.value === unref(PREVIEW_KEYS).IFRAME ? (openBlock(), createElementBlock("div", {
            key: 0,
            ref_key: "iframeContainerRef",
            ref: iframeContainerRef,
            class: "iframe-preview-container rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col flex-grow min-h-0"
          }, [
            iframeProviderOptions.value.length > 1 ? (openBlock(), createBlock(PreviewProviderHeader, {
              key: 0,
              "show-fullscreen": true,
              "fullscreen-target": iframeContainerRef.value,
              onFullscreenChange: handleIframeFullscreenChange,
              modelValue: iframeProviderKey.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => iframeProviderKey.value = $event),
              title: __props.fileInfo.filename,
              options: iframeProviderOptions.value
            }, null, 8, ["fullscreen-target", "modelValue", "title", "options"])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_9$3, [
              (openBlock(), createBlock(resolveDynamicComponent(currentPreviewComponent.value), mergeProps(previewComponentProps.value, {
                class: "w-full h-full",
                onLoad: handlePreviewLoad,
                onError: handlePreviewError,
                onToggleMode: handleToggleMode,
                onProviderOptions: handlePreviewProviderOptions
              }), null, 16))
            ])
          ], 512)) : (openBlock(), createBlock(resolveDynamicComponent(currentPreviewComponent.value), mergeProps({ key: 1 }, previewComponentProps.value, {
            class: previewKey.value === unref(PREVIEW_KEYS).AUDIO ? "w-full max-w-3xl mx-auto" : previewKey.value === unref(PREVIEW_KEYS).VIDEO ? "w-full" : "w-full h-full",
            onLoad: handlePreviewLoad,
            onError: handlePreviewError,
            onToggleMode: handleToggleMode,
            onProviderOptions: handlePreviewProviderOptions
          }), null, 16, ["class"]))
        ], 2)) : !__props.fileInfo.use_proxy && !processedPreviewUrl.value ? (openBlock(), createElementBlock("div", _hoisted_10$3, [
          createBaseVNode("p", _hoisted_11$2, toDisplayString(unref(t)("fileView.preview.directNotSupported")), 1)
        ])) : createCommentVNode("", true),
        exifData.value ? (openBlock(), createElementBlock("div", _hoisted_12$2, [
          createBaseVNode("button", {
            type: "button",
            class: "w-full p-3 flex items-center justify-between gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left",
            onClick: _cache[1] || (_cache[1] = ($event) => exifExpanded.value = !exifExpanded.value)
          }, [
            createBaseVNode("div", _hoisted_13$2, [
              createVNode(unref(IconCamera), {
                size: "sm",
                class: "text-gray-500 dark:text-gray-400 flex-shrink-0"
              }),
              createBaseVNode("span", _hoisted_14$2, toDisplayString(exifData.value.summary.camera || "拍摄信息"), 1),
              !exifExpanded.value && exifData.value.gpsCoords ? (openBlock(), createElementBlock("span", _hoisted_15$1, [
                createVNode(unref(IconLocationMarker), { class: "h-3.5 w-3.5 text-blue-500 dark:text-blue-400" })
              ])) : createCommentVNode("", true)
            ]),
            createVNode(unref(IconChevronDown), {
              size: "sm",
              class: normalizeClass(["text-gray-400 dark:text-gray-500 flex-shrink-0 transition-transform duration-200", { "rotate-180": exifExpanded.value }])
            }, null, 8, ["class"])
          ]),
          createVNode(Transition, {
            "enter-active-class": "transition-all duration-200 ease-out",
            "enter-from-class": "max-h-0 opacity-0",
            "enter-to-class": "max-h-[500px] opacity-100",
            "leave-active-class": "transition-all duration-200 ease-in",
            "leave-from-class": "max-h-[500px] opacity-100",
            "leave-to-class": "max-h-0 opacity-0"
          }, {
            default: withCtx(() => [
              withDirectives(createBaseVNode("div", _hoisted_16$1, [
                createBaseVNode("div", _hoisted_17$1, [
                  hasExifParams.value ? (openBlock(), createElementBlock("div", _hoisted_18, [
                    createBaseVNode("span", _hoisted_19, toDisplayString([exifParams.value.aperture, exifParams.value.shutter, exifParams.value.iso ? `ISO ${exifParams.value.iso}` : "", exifParams.value.focalLength].filter(Boolean).join(" · ")), 1)
                  ])) : createCommentVNode("", true),
                  exifData.value.summary.date || exifData.value.gpsCoords ? (openBlock(), createElementBlock("div", _hoisted_20, [
                    exifData.value.summary.date ? (openBlock(), createElementBlock("div", _hoisted_21, [
                      createVNode(unref(IconClock), { class: "h-3.5 w-3.5" }),
                      createBaseVNode("span", null, toDisplayString(exifData.value.summary.date), 1)
                    ])) : createCommentVNode("", true),
                    exifData.value.summary.date && exifData.value.gpsCoords ? (openBlock(), createElementBlock("span", _hoisted_22, "|")) : createCommentVNode("", true),
                    exifData.value.gpsCoords ? (openBlock(), createElementBlock("div", _hoisted_23, [
                      createVNode(unref(IconLocationMarker), { class: "h-3.5 w-3.5" }),
                      createBaseVNode("span", _hoisted_24, toDisplayString(formattedGps.value), 1),
                      createBaseVNode("a", {
                        href: googleMapsUrl.value,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        class: "ml-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300",
                        title: "Google Maps",
                        onClick: _cache[2] || (_cache[2] = withModifiers(() => {
                        }, ["stop"]))
                      }, [
                        createVNode(unref(IconExternalLink), {
                          size: "sm",
                          class: "w-3.5 h-3.5"
                        })
                      ], 8, _hoisted_25),
                      createBaseVNode("a", {
                        href: amapUrl.value,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        class: "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300",
                        title: "高德地图",
                        onClick: _cache[3] || (_cache[3] = withModifiers(() => {
                        }, ["stop"]))
                      }, [
                        createVNode(unref(IconExternalLink), {
                          size: "sm",
                          class: "w-3.5 h-3.5"
                        })
                      ], 8, _hoisted_26)
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true),
                  exifData.value.gpsCoords && !mapLoadError.value ? (openBlock(), createElementBlock("div", _hoisted_27, [
                    createVNode(MapEmbed, {
                      lat: exifData.value.gpsCoords.lat,
                      lng: exifData.value.gpsCoords.lng,
                      height: 140,
                      interactive: true,
                      "show-zoom-controls": true,
                      onLoad: handleMapLoad,
                      onError: handleMapError
                    }, null, 8, ["lat", "lng"])
                  ])) : exifData.value.gpsCoords && mapLoadError.value ? (openBlock(), createElementBlock("div", _hoisted_28, _cache[5] || (_cache[5] = [
                    createBaseVNode("span", { class: "text-xs text-gray-500 dark:text-gray-400" }, "地图加载失败", -1)
                  ]))) : createCommentVNode("", true)
                ])
              ], 512), [
                [vShow, exifExpanded.value]
              ])
            ]),
            _: 1
          })
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_29, [
          createBaseVNode("div", _hoisted_30, [
            createBaseVNode("div", _hoisted_31, [
              createVNode(unref(IconCalendar), {
                size: "md",
                class: "mr-2 text-gray-500 dark:text-gray-400"
              }),
              createBaseVNode("span", _hoisted_32, toDisplayString(unref(t)("fileView.fileInfo.uploadTime")), 1)
            ]),
            createBaseVNode("p", _hoisted_33, toDisplayString(formattedCreatedAt.value), 1)
          ]),
          createBaseVNode("div", _hoisted_34, [
            createBaseVNode("div", _hoisted_35, [
              createVNode(unref(IconEye), {
                size: "md",
                class: "mr-2 text-gray-500 dark:text-gray-400"
              }),
              createBaseVNode("span", _hoisted_36, toDisplayString(unref(t)("fileView.fileInfo.accessCount")), 1)
            ]),
            createBaseVNode("p", _hoisted_37, [
              createTextVNode(toDisplayString(__props.fileInfo.views || 0) + " ", 1),
              __props.fileInfo.max_views ? (openBlock(), createElementBlock("span", _hoisted_38, " / " + toDisplayString(__props.fileInfo.max_views) + " (" + toDisplayString(unref(t)("fileView.fileInfo.limit")) + ") ", 1)) : createCommentVNode("", true)
            ])
          ]),
          __props.fileInfo.expires_at ? (openBlock(), createElementBlock("div", _hoisted_39, [
            createBaseVNode("div", _hoisted_40, [
              createVNode(unref(IconClock), {
                size: "md",
                class: "mr-2 text-gray-500 dark:text-gray-400"
              }),
              createBaseVNode("span", _hoisted_41, toDisplayString(unref(t)("fileView.fileInfo.expiresAt")), 1)
            ]),
            createBaseVNode("p", _hoisted_42, toDisplayString(formattedExpiresAt.value), 1)
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_43, [
            createBaseVNode("div", _hoisted_44, [
              createVNode(unref(IconShieldCheck), {
                size: "md",
                class: "mr-2 text-gray-500 dark:text-gray-400"
              }),
              createBaseVNode("span", _hoisted_45, toDisplayString(unref(t)("fileView.fileInfo.accessMode")), 1)
            ]),
            createBaseVNode("p", _hoisted_46, [
              createBaseVNode("span", {
                class: normalizeClass({ "text-green-600 dark:text-green-400": __props.fileInfo.use_proxy, "text-blue-600 dark:text-blue-400": !__props.fileInfo.use_proxy })
              }, toDisplayString(__props.fileInfo.use_proxy ? unref(t)("fileView.fileInfo.proxyAccess") : unref(t)("fileView.fileInfo.directAccess")), 3)
            ])
          ]),
          createBaseVNode("div", _hoisted_47, [
            createBaseVNode("div", _hoisted_48, [
              createVNode(unref(IconLink), {
                size: "md",
                class: "mr-2 text-gray-500 dark:text-gray-400"
              }),
              createBaseVNode("span", _hoisted_49, toDisplayString(unref(t)("fileView.fileInfo.fileLink")), 1)
            ]),
            createBaseVNode("div", _hoisted_50, [
              createBaseVNode("p", _hoisted_51, toDisplayString(shareUrl.value || unref(t)("fileView.fileInfo.needPassword")), 1),
              shareUrl.value ? (openBlock(), createElementBlock("button", {
                key: 0,
                onClick: _cache[4] || (_cache[4] = ($event) => copyToClipboard$1(shareUrl.value)),
                class: "ml-2 p-1 rounded hover:bg-opacity-80 transition-colors bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500",
                title: unref(t)("fileView.fileInfo.copyLink")
              }, [
                createVNode(unref(IconCopy), {
                  size: "sm",
                  class: "h-4 w-4"
                })
              ], 8, _hoisted_52)) : createCommentVNode("", true),
              showCopyToast.value ? (openBlock(), createElementBlock("div", _hoisted_53, [
                createBaseVNode("div", _hoisted_54, [
                  createVNode(unref(IconCheck), {
                    size: "sm",
                    class: "h-4 w-4 mr-1"
                  }),
                  createTextVNode(" " + toDisplayString(unref(t)("fileView.fileInfo.linkCopied")), 1)
                ])
              ])) : createCommentVNode("", true)
            ])
          ])
        ])
      ], 2);
    };
  }
};
const _hoisted_1$3 = { class: "max-w-sm w-full mx-auto p-5 border rounded-lg shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" };
const _hoisted_2$3 = { class: "text-lg font-medium mb-4 text-gray-900 dark:text-white" };
const _hoisted_3$3 = { class: "mb-4 text-sm text-gray-600 dark:text-gray-300" };
const _hoisted_4$3 = {
  for: "password",
  class: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
};
const _hoisted_5$3 = { class: "relative" };
const _hoisted_6$3 = ["type", "placeholder", "disabled"];
const _hoisted_7$3 = {
  key: 0,
  class: "mt-2 text-sm text-red-500 dark:text-red-400"
};
const _hoisted_8$3 = ["disabled"];
const _hoisted_9$2 = { key: 0 };
const _hoisted_10$2 = { key: 1 };
const _sfc_main$3 = {
  __name: "FileViewPassword",
  props: {
    fileId: {
      type: String,
      required: true
    },
    appUrl: {
      type: String,
      required: false
      // 不再需要appUrl
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    fileThumbnail: {
      type: String,
      default: ""
    }
  },
  emits: ["verified"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const fileshareService = useFileshareService();
    const log = createLogger("FileViewPassword");
    const props = __props;
    const emit = __emit;
    const password = ref("");
    const loading = ref(false);
    const error = ref("");
    const showPassword = ref(false);
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
    const verifyPassword = async () => {
      if (!password.value) return;
      loading.value = true;
      error.value = "";
      try {
        const data = await fileshareService.verifyFilePassword(props.fileId, password.value);
        emit("verified", {
          ...data || {},
          currentPassword: password.value
          // 传递当前输入的密码，用于后续操作
        });
      } catch (err) {
        log.error("验证密码时出错:", err);
        if (err.status === ApiStatus.UNAUTHORIZED || err.response?.status === ApiStatus.UNAUTHORIZED || err.code === ApiStatus.UNAUTHORIZED) {
          error.value = "密码错误，请重新输入";
        } else if (err.status === ApiStatus.GONE || err.response?.status === ApiStatus.GONE || err.code === ApiStatus.GONE) {
          error.value = "此文件已过期或不可访问";
        } else if (err.status === ApiStatus.NOT_FOUND || err.response?.status === ApiStatus.NOT_FOUND || err.code === ApiStatus.NOT_FOUND) {
          error.value = "此文件不存在或已被删除";
        } else {
          const msg = err.message || "";
          if (msg.includes("密码不正确") || msg.includes("密码错误")) {
            error.value = t("fileView.password.error");
          } else if (msg.includes("已过期") || msg.includes("达到最大查看次数") || msg.includes("410")) {
            error.value = "此文件已过期或不可访问";
          } else if (msg.includes("不存在") || msg.includes("已被删除") || msg.includes("404")) {
            error.value = "此文件不存在或已被删除";
          } else {
            error.value = msg || t("fileView.errors.unknown");
          }
        }
      } finally {
        loading.value = false;
      }
    };
    watch(
      () => props.fileId,
      () => {
        password.value = "";
        error.value = "";
        loading.value = false;
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("h3", _hoisted_2$3, toDisplayString(unref(t)("fileView.password.title")), 1),
        createBaseVNode("p", _hoisted_3$3, toDisplayString(unref(t)("fileView.password.description")), 1),
        createBaseVNode("form", {
          onSubmit: withModifiers(verifyPassword, ["prevent"]),
          class: "space-y-4"
        }, [
          createBaseVNode("div", null, [
            createBaseVNode("label", _hoisted_4$3, toDisplayString(unref(t)("fileView.password.label")), 1),
            createBaseVNode("div", _hoisted_5$3, [
              withDirectives(createBaseVNode("input", {
                type: showPassword.value ? "text" : "password",
                id: "password",
                autocomplete: "current-password",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => password.value = $event),
                placeholder: unref(t)("fileView.password.placeholder"),
                class: "block w-full px-3 py-2 rounded-md shadow-sm border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-offset-gray-800 password-input",
                disabled: loading.value
              }, null, 8, _hoisted_6$3), [
                [vModelDynamic, password.value]
              ]),
              createBaseVNode("button", {
                type: "button",
                onClick: togglePasswordVisibility,
                class: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
              }, [
                showPassword.value ? (openBlock(), createBlock(unref(IconEyeOff), {
                  key: 0,
                  size: "md",
                  class: "h-5 w-5"
                })) : (openBlock(), createBlock(unref(IconEye), {
                  key: 1,
                  size: "md",
                  class: "h-5 w-5"
                }))
              ])
            ]),
            error.value ? (openBlock(), createElementBlock("p", _hoisted_7$3, toDisplayString(error.value), 1)) : createCommentVNode("", true)
          ]),
          createBaseVNode("button", {
            type: "submit",
            class: "w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800",
            disabled: loading.value || !password.value
          }, [
            loading.value ? (openBlock(), createElementBlock("span", _hoisted_9$2, [
              createVNode(unref(IconRefresh), { class: "animate-spin h-5 w-5 mr-2 inline-block" }),
              createTextVNode(" " + toDisplayString(unref(t)("fileView.password.loading")), 1)
            ])) : (openBlock(), createElementBlock("span", _hoisted_10$2, toDisplayString(unref(t)("fileView.password.submit")), 1))
          ], 8, _hoisted_8$3)
        ], 32)
      ]);
    };
  }
};
const SOCIAL_PLATFORMS = [
  {
    key: "weibo",
    name: "Weibo",
    bgClass: "bg-red-500 hover:bg-red-600",
    icon: IconWeibo,
    url: "https://service.weibo.com/share/share.php?url={url}&title={title}"
  },
  {
    key: "qq",
    name: "QQ",
    bgClass: "bg-blue-500 hover:bg-blue-600",
    icon: IconQQ,
    url: "https://connect.qq.com/widget/shareqq/index.html?url={url}&title={title}&desc={text}&summary={title}"
  },
  {
    key: "twitter",
    name: "X",
    bgClass: "bg-black hover:bg-gray-800",
    icon: IconTwitter,
    url: "https://twitter.com/intent/tweet?url={url}&text={text}"
  },
  {
    key: "telegram",
    name: "Telegram",
    bgClass: "bg-blue-400 hover:bg-blue-500",
    icon: IconTelegram,
    url: "https://t.me/share/url?url={url}&text={text}"
  },
  {
    key: "facebook",
    name: "Facebook",
    bgClass: "bg-blue-600 hover:bg-blue-700",
    icon: IconFacebook,
    url: "https://www.facebook.com/sharer/sharer.php?u={url}"
  }
];
const _sfc_main$2 = {
  name: "ShareModal",
  components: {
    IconChevronDown,
    IconClose,
    IconCopy,
    IconDocumentText,
    IconFacebook,
    IconQQ,
    IconQrCode,
    IconShare,
    IconTelegram,
    IconTwitter,
    IconWeibo
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    fileInfo: {
      type: Object,
      required: true
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  setup(props, { emit }) {
    const { t } = useI18n();
    const log = createLogger("ShareModal");
    const showQRCode = ref(false);
    const qrCodeDataURL = ref("");
    const copySuccess = ref(false);
    const qrCodeError = ref(false);
    const socialPlatforms = ref(SOCIAL_PLATFORMS);
    const getShareText = () => {
      return t("fileView.actions.shareFileText", { filename: props.fileInfo.filename });
    };
    const copyLink = async () => {
      try {
        const success = await copyToClipboard(window.location.href);
        if (success) {
          copySuccess.value = true;
          setTimeout(() => {
            copySuccess.value = false;
          }, 2e3);
        }
      } catch (error) {
        log.error("Failed to copy link:", error);
      }
    };
    const nativeShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: props.fileInfo.filename,
            text: getShareText(),
            url: window.location.href
          });
        } catch (error) {
          if (error.name !== "AbortError") {
            log.error("Native share failed:", error);
            await copyLink();
          }
        }
      } else {
        await copyLink();
      }
    };
    const shareToSocial = (platform) => {
      const shareUrl = platform.url.replace("{url}", encodeURIComponent(window.location.href)).replace("{title}", encodeURIComponent(props.fileInfo.filename)).replace("{text}", encodeURIComponent(getShareText()));
      window.open(shareUrl, "_blank", "width=600,height=400");
    };
    const toggleQRCode = async () => {
      showQRCode.value = !showQRCode.value;
      if (showQRCode.value && !qrCodeDataURL.value && !qrCodeError.value) {
        try {
          qrCodeDataURL.value = await generateQRCode(window.location.href, { width: 128, margin: 1 });
          qrCodeError.value = false;
        } catch (error) {
          log.error("Failed to generate QR code:", error);
          qrCodeError.value = true;
        }
      }
    };
    const closeModal = () => {
      emit("close");
    };
    onKeyStroke("Escape", () => {
      if (props.visible) {
        closeModal();
      }
    });
    watch(
      () => props.visible,
      (newVal) => {
        if (!newVal) {
          showQRCode.value = false;
          qrCodeDataURL.value = "";
          qrCodeError.value = false;
        }
      }
    );
    return {
      t,
      showQRCode,
      qrCodeDataURL,
      qrCodeError,
      copySuccess,
      socialPlatforms,
      formatFileSize: formatFileSize$1,
      copyLink,
      nativeShare,
      shareToSocial,
      toggleQRCode,
      closeModal
    };
  }
};
const _hoisted_1$2 = { class: "p-6 space-y-6" };
const _hoisted_2$2 = { class: "flex-shrink-0" };
const _hoisted_3$2 = { class: "flex-1 min-w-0" };
const _hoisted_4$2 = { class: "grid grid-cols-2 gap-3" };
const _hoisted_5$2 = { class: "text-sm font-medium" };
const _hoisted_6$2 = { class: "text-sm font-medium" };
const _hoisted_7$2 = { class: "grid grid-cols-5 gap-3" };
const _hoisted_8$2 = ["onClick", "title"];
const _hoisted_9$1 = { class: "text-xs font-medium" };
const _hoisted_10$1 = { class: "flex items-center" };
const _hoisted_11$1 = { class: "h-6 w-6 mr-3 text-green-500" };
const _hoisted_12$1 = {
  key: 0,
  class: "inline-block p-3 bg-white rounded-lg"
};
const _hoisted_13$1 = ["src"];
const _hoisted_14$1 = { class: "text-sm text-red-500" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_IconClose = resolveComponent("IconClose");
  const _component_IconDocumentText = resolveComponent("IconDocumentText");
  const _component_IconCopy = resolveComponent("IconCopy");
  const _component_IconShare = resolveComponent("IconShare");
  const _component_IconQrCode = resolveComponent("IconQrCode");
  const _component_IconChevronDown = resolveComponent("IconChevronDown");
  return $props.visible ? (openBlock(), createElementBlock("div", {
    key: 0,
    class: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50",
    onClick: _cache[4] || (_cache[4] = (...args) => _ctx.handleClickOutside && _ctx.handleClickOutside(...args))
  }, [
    createBaseVNode("div", {
      class: normalizeClass(["relative rounded-lg max-w-md w-full shadow-xl", $props.darkMode ? "bg-gray-800" : "bg-white"])
    }, [
      createBaseVNode("div", {
        class: normalizeClass(["flex items-center justify-between p-6 border-b", $props.darkMode ? "border-gray-700" : "border-gray-200"])
      }, [
        createBaseVNode("h3", {
          class: normalizeClass(["text-lg font-medium", $props.darkMode ? "text-white" : "text-gray-900"])
        }, toDisplayString($setup.t("fileView.actions.share")), 3),
        createBaseVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $setup.closeModal && $setup.closeModal(...args)),
          class: normalizeClass(["transition-colors", $props.darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-400 hover:text-gray-500"])
        }, [
          createVNode(_component_IconClose, { size: "lg" })
        ], 2)
      ], 2),
      createBaseVNode("div", _hoisted_1$2, [
        createBaseVNode("div", {
          class: normalizeClass(["flex items-center space-x-3 p-3 rounded-lg", $props.darkMode ? "bg-gray-700/50" : "bg-gray-50"])
        }, [
          createBaseVNode("div", _hoisted_2$2, [
            createVNode(_component_IconDocumentText, {
              size: "xl",
              class: "text-blue-500"
            })
          ]),
          createBaseVNode("div", _hoisted_3$2, [
            createBaseVNode("p", {
              class: normalizeClass(["text-sm font-medium truncate", $props.darkMode ? "text-gray-100" : "text-gray-900"])
            }, toDisplayString($props.fileInfo.filename), 3),
            createBaseVNode("p", {
              class: normalizeClass(["text-xs", $props.darkMode ? "text-gray-400" : "text-gray-500"])
            }, toDisplayString($setup.formatFileSize($props.fileInfo.size)), 3)
          ])
        ], 2),
        createBaseVNode("div", _hoisted_4$2, [
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = (...args) => $setup.copyLink && $setup.copyLink(...args)),
            class: normalizeClass(["flex items-center justify-center px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2", [
              $setup.copySuccess ? $props.darkMode ? "bg-green-600 text-white" : "bg-green-600 text-white" : $props.darkMode ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 focus:ring-offset-gray-800" : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 focus:ring-offset-white"
            ]])
          }, [
            createVNode(_component_IconCopy, {
              size: "md",
              class: "mr-2"
            }),
            createBaseVNode("span", _hoisted_5$2, toDisplayString($setup.copySuccess ? $setup.t("fileView.actions.copied") : $setup.t("fileView.actions.copyLink")), 1)
          ], 2),
          createBaseVNode("button", {
            onClick: _cache[2] || (_cache[2] = (...args) => $setup.nativeShare && $setup.nativeShare(...args)),
            class: normalizeClass(["flex items-center justify-center px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2", [
              $props.darkMode ? "bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500 focus:ring-offset-gray-800" : "bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500 focus:ring-offset-white"
            ]])
          }, [
            createVNode(_component_IconShare, {
              size: "md",
              class: "mr-2"
            }),
            createBaseVNode("span", _hoisted_6$2, toDisplayString($setup.t("fileView.actions.nativeShare")), 1)
          ], 2)
        ]),
        createBaseVNode("div", null, [
          createBaseVNode("h4", {
            class: normalizeClass(["text-sm font-medium mb-3", $props.darkMode ? "text-gray-100" : "text-gray-700"])
          }, toDisplayString($setup.t("fileView.actions.shareToSocial")), 3),
          createBaseVNode("div", _hoisted_7$2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.socialPlatforms, (platform) => {
              return openBlock(), createElementBlock("button", {
                key: platform.key,
                onClick: ($event) => $setup.shareToSocial(platform),
                class: normalizeClass(["flex flex-col items-center p-3 rounded-lg transition-colors hover:bg-opacity-80 text-white", platform.bgClass]),
                title: platform.name
              }, [
                (openBlock(), createBlock(resolveDynamicComponent(platform.icon), {
                  size: "lg",
                  class: "mb-1"
                })),
                createBaseVNode("span", _hoisted_9$1, toDisplayString(platform.name), 1)
              ], 10, _hoisted_8$2);
            }), 128))
          ])
        ]),
        createBaseVNode("div", null, [
          createBaseVNode("button", {
            onClick: _cache[3] || (_cache[3] = (...args) => $setup.toggleQRCode && $setup.toggleQRCode(...args)),
            class: normalizeClass(["flex items-center justify-between w-full p-3 rounded-lg transition-colors", $props.darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"])
          }, [
            createBaseVNode("div", _hoisted_10$1, [
              createBaseVNode("div", _hoisted_11$1, [
                createVNode(_component_IconQrCode, { size: "lg" })
              ]),
              createBaseVNode("span", {
                class: normalizeClass(["text-sm font-medium", $props.darkMode ? "text-gray-100" : "text-gray-900"])
              }, toDisplayString($setup.t("fileView.actions.qrCode")), 3)
            ]),
            createVNode(_component_IconChevronDown, {
              size: "md",
              class: normalizeClass(["transition-transform", [$setup.showQRCode ? "rotate-180" : "", $props.darkMode ? "text-gray-400" : "text-gray-500"]])
            }, null, 8, ["class"])
          ], 2),
          $setup.showQRCode ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["mt-3 p-4 rounded-lg text-center", $props.darkMode ? "bg-gray-700/50" : "bg-gray-50"])
          }, [
            $setup.qrCodeDataURL ? (openBlock(), createElementBlock("div", _hoisted_12$1, [
              createBaseVNode("img", {
                src: $setup.qrCodeDataURL,
                alt: "QR Code",
                class: "w-32 h-32"
              }, null, 8, _hoisted_13$1)
            ])) : $setup.qrCodeError ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(["w-32 h-32 mx-auto rounded-lg flex items-center justify-center", $props.darkMode ? "bg-red-900/20" : "bg-red-50"])
            }, [
              createBaseVNode("span", _hoisted_14$1, toDisplayString($setup.t("fileView.actions.qrCodeError")), 1)
            ], 2)) : (openBlock(), createElementBlock("div", {
              key: 2,
              class: normalizeClass(["w-32 h-32 mx-auto rounded-lg flex items-center justify-center", $props.darkMode ? "bg-gray-600" : "bg-gray-200"])
            }, [
              createBaseVNode("span", {
                class: normalizeClass(["text-sm", $props.darkMode ? "text-gray-400" : "text-gray-500"])
              }, toDisplayString($setup.t("fileView.actions.generating")), 3)
            ], 2)),
            !$setup.qrCodeError ? (openBlock(), createElementBlock("p", {
              key: 3,
              class: normalizeClass(["text-xs mt-2", $props.darkMode ? "text-gray-400" : "text-gray-500"])
            }, toDisplayString($setup.t("fileView.actions.scanToShare")), 3)) : createCommentVNode("", true)
          ], 2)) : createCommentVNode("", true)
        ])
      ])
    ], 2)
  ])) : createCommentVNode("", true);
}
const ShareModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render]]);
const _hoisted_1$1 = { class: "file-actions flex flex-wrap gap-3" };
const _hoisted_2$1 = {
  key: 4,
  class: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
};
const _hoisted_3$1 = { class: "rounded-lg p-6 max-w-sm w-full shadow-xl bg-white dark:bg-gray-800" };
const _hoisted_4$1 = { class: "text-lg font-medium mb-4 text-gray-900 dark:text-white" };
const _hoisted_5$1 = { class: "mb-6 text-gray-600 dark:text-gray-300" };
const _hoisted_6$1 = { class: "flex justify-end space-x-3" };
const _hoisted_7$1 = ["disabled"];
const _hoisted_8$1 = {
  key: 5,
  class: "fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center transition-opacity duration-200 bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 border border-gray-200 dark:border-gray-700"
};
const _sfc_main$1 = {
  __name: "FileViewActions",
  props: {
    fileInfo: {
      type: Object,
      required: true
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["edit", "delete", "refresh-file-info"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const log = createLogger("FileViewActions");
    const props = __props;
    const emit = __emit;
    const fileshareService = useFileshareService();
    const { showSuccess, showError } = useGlobalMessage();
    const authStore = useAuthStore();
    const isAdmin = computed(() => authStore.isAdmin);
    const hasApiKey = computed(() => authStore.isKeyUser && !!authStore.apiKey);
    const hasFilePermission = computed(() => authStore.hasFileManagePermission);
    const showDeleteConfirm = ref(false);
    const deleting = ref(false);
    const showCopyToast = ref(false);
    const showShareModal = ref(false);
    const isCreator = computed(() => authStore.isFileCreator(props.fileInfo));
    const hasPreviewUrl = computed(() => !!fileshareService.getPermanentPreviewUrl(props.fileInfo));
    const hasDownloadUrl = computed(() => !!fileshareService.getPermanentDownloadUrl(props.fileInfo));
    const previewFile = async () => {
      if (!props.fileInfo) return;
      try {
        if (props.fileInfo.type === FileType.OFFICE) {
          const officePreviewUrl = await fileshareService.getOfficePreviewUrl(props.fileInfo, {
            provider: "microsoft"
          });
          if (!officePreviewUrl) {
            throw new Error(t("fileView.errors.serverError"));
          }
          window.open(officePreviewUrl, "_blank");
          return;
        }
        const previewUrl = fileshareService.getPermanentPreviewUrl(props.fileInfo);
        if (!previewUrl) {
          throw new Error(t("fileView.errors.serverError"));
        }
        window.open(previewUrl, "_blank");
      } catch (error) {
        log.error("预览文件失败:", error);
        let message = error.message || t("fileView.errors.unknown");
        if (error.status) {
          const errorKey = getFileErrorKey(error.status);
          message = t(errorKey);
        }
        showError(`${t("fileView.actions.previewFailed")}: ${message}`);
      }
    };
    const downloadFile = () => {
      if (!props.fileInfo) return;
      try {
        const downloadUrl = fileshareService.getPermanentDownloadUrl(props.fileInfo);
        if (!downloadUrl) {
          throw new Error(t("fileView.errors.serverError"));
        }
        const fileName = props.fileInfo.filename || t("fileView.actions.downloadFile");
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
        }, 100);
      } catch (error) {
        log.error("下载文件失败:", error);
        const fallbackUrl = fileshareService.getPermanentDownloadUrl(props.fileInfo);
        if (fallbackUrl) {
          window.open(fallbackUrl, "_blank");
        }
        showError(`${t("fileView.actions.downloadFailed")}: ${error.message || t("fileView.errors.unknown")}`);
      }
    };
    const openShareModal = () => {
      showShareModal.value = true;
    };
    const closeShareModal = () => {
      showShareModal.value = false;
    };
    const confirmDelete = () => {
      showDeleteConfirm.value = true;
    };
    const deleteFile = async () => {
      if (!props.fileInfo.id) return;
      deleting.value = true;
      try {
        if (isAdmin.value || hasApiKey.value && hasFilePermission.value && isCreator.value) {
          const deleteSettingsStore = useDeleteSettingsStore();
          const response = await fileshareService.deleteFiles([props.fileInfo.id], deleteSettingsStore.getDeleteMode());
          if (response?.data && response.data.failed && response.data.failed.length > 0) {
            const failedItem = response.data.failed[0];
            throw new Error(failedItem.error || "删除失败");
          }
          showDeleteConfirm.value = false;
          emit("delete", props.fileInfo.id);
        } else {
          throw new Error(t("fileView.actions.noPermission"));
        }
      } catch (err) {
        log.error("删除文件错误:", err);
        showError(`${t("fileView.actions.deleteFailed")}: ${err.message || t("fileView.errors.unknown")}`);
      } finally {
        deleting.value = false;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        hasPreviewUrl.value ? (openBlock(), createElementBlock("button", {
          key: 0,
          onClick: previewFile,
          class: "action-button flex items-center justify-center px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-gray-800"
        }, [
          createVNode(unref(IconEye), {
            size: "md",
            class: "mr-2"
          }),
          createBaseVNode("span", null, toDisplayString(unref(t)("fileView.actions.preview")), 1)
        ])) : createCommentVNode("", true),
        hasDownloadUrl.value ? (openBlock(), createElementBlock("button", {
          key: 1,
          onClick: downloadFile,
          class: "action-button flex items-center justify-center px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-gray-800"
        }, [
          createVNode(unref(IconDownload), {
            size: "md",
            class: "mr-2"
          }),
          createBaseVNode("span", null, toDisplayString(unref(t)("fileView.actions.download")), 1)
        ])) : createCommentVNode("", true),
        (isAdmin.value || hasApiKey.value && hasFilePermission.value && isCreator.value) && __props.fileInfo.id ? (openBlock(), createElementBlock("button", {
          key: 2,
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("edit")),
          class: "action-button flex items-center justify-center px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-white dark:focus:ring-offset-gray-800"
        }, [
          createVNode(unref(IconRename), {
            size: "md",
            class: "mr-2"
          }),
          createBaseVNode("span", null, toDisplayString(unref(t)("fileView.actions.edit")), 1)
        ])) : createCommentVNode("", true),
        createBaseVNode("button", {
          onClick: openShareModal,
          class: "action-button flex items-center justify-center px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 focus:ring-offset-white dark:focus:ring-offset-gray-800"
        }, [
          createVNode(unref(IconShare), {
            size: "md",
            class: "mr-2"
          }),
          createBaseVNode("span", null, toDisplayString(unref(t)("fileView.actions.share")), 1)
        ]),
        (isAdmin.value || hasApiKey.value && hasFilePermission.value && isCreator.value) && __props.fileInfo.id ? (openBlock(), createElementBlock("button", {
          key: 3,
          onClick: confirmDelete,
          class: "action-button flex items-center justify-center px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 focus:ring-offset-white dark:focus:ring-offset-gray-800"
        }, [
          createVNode(unref(IconDelete), {
            size: "md",
            class: "mr-2"
          }),
          createBaseVNode("span", null, toDisplayString(unref(t)("fileView.actions.delete")), 1)
        ])) : createCommentVNode("", true),
        showDeleteConfirm.value ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          createBaseVNode("div", _hoisted_3$1, [
            createBaseVNode("h3", _hoisted_4$1, toDisplayString(unref(t)("fileView.actions.delete")), 1),
            createBaseVNode("p", _hoisted_5$1, toDisplayString(unref(t)("fileView.actions.deleteConfirm")), 1),
            createBaseVNode("div", _hoisted_6$1, [
              createBaseVNode("button", {
                onClick: _cache[1] || (_cache[1] = ($event) => showDeleteConfirm.value = false),
                class: "px-4 py-2 rounded-md text-sm font-medium transition-colors bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white"
              }, toDisplayString(unref(t)("common.cancel")), 1),
              createBaseVNode("button", {
                onClick: deleteFile,
                class: "px-4 py-2 rounded-md text-sm font-medium transition-colors bg-red-600 hover:bg-red-700 text-white",
                disabled: deleting.value
              }, toDisplayString(deleting.value ? unref(t)("fileView.actions.deleting") : unref(t)("common.confirm")), 9, _hoisted_7$1)
            ])
          ])
        ])) : createCommentVNode("", true),
        showCopyToast.value ? (openBlock(), createElementBlock("div", _hoisted_8$1, [
          createVNode(unref(IconCheck), {
            size: "md",
            class: "mr-2"
          }),
          createBaseVNode("span", null, toDisplayString(unref(t)("fileView.fileInfo.linkCopied")), 1)
        ])) : createCommentVNode("", true),
        createVNode(ShareModal, {
          visible: showShareModal.value,
          "file-info": __props.fileInfo,
          "dark-mode": __props.darkMode,
          onClose: closeShareModal
        }, null, 8, ["visible", "file-info", "dark-mode"])
      ]);
    };
  }
};
const _hoisted_1 = { class: "file-view-container flex flex-col flex-1 pt-6 sm:pt-8" };
const _hoisted_2 = { class: "max-w-6xl mx-auto w-full px-3 sm:px-6" };
const _hoisted_3 = { class: "py-3 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 mb-4" };
const _hoisted_4 = {
  href: "/",
  class: "hover:text-primary-600 dark:hover:text-primary-400"
};
const _hoisted_5 = { class: "text-gray-700 dark:text-gray-300" };
const _hoisted_6 = {
  key: 0,
  class: "error-container py-12 px-3 sm:px-6 max-w-6xl mx-auto text-center"
};
const _hoisted_7 = { class: "text-2xl font-bold mb-2 text-gray-900 dark:text-white" };
const _hoisted_8 = { class: "text-lg mb-6 text-gray-600 dark:text-gray-300" };
const _hoisted_9 = {
  href: "/",
  class: "inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
};
const _hoisted_10 = {
  key: 1,
  class: "success-container py-12 px-3 sm:px-6 max-w-6xl mx-auto text-center"
};
const _hoisted_11 = { class: "text-2xl font-bold mb-2 text-gray-900 dark:text-white" };
const _hoisted_12 = { class: "text-lg mb-6 text-gray-600 dark:text-gray-300" };
const _hoisted_13 = { class: "animate-pulse text-gray-500 dark:text-gray-400" };
const _hoisted_14 = {
  key: 2,
  class: "loading-container py-12 px-3 sm:px-6 max-w-6xl mx-auto text-center"
};
const _hoisted_15 = {
  key: 3,
  class: "file-container flex-1 flex flex-col py-8 px-4 max-w-4xl mx-auto w-full"
};
const _hoisted_16 = {
  key: 0,
  class: "password-container flex-1 flex items-start justify-center pt-8"
};
const _hoisted_17 = {
  key: 1,
  class: "file-content flex flex-col flex-1"
};
const _sfc_main = {
  __name: "FileView",
  props: {
    slug: {
      type: String,
      required: true
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const { t } = useI18n();
    const log = createLogger("FileView");
    const fileshareService = useFileshareService();
    const fileShareStore = useFileShareStore();
    const { showError, showSuccess } = useGlobalMessage();
    const props = __props;
    const router = useRouter();
    const route = useRoute();
    const slug = ref(props.slug);
    const fileInfo = ref({});
    const loading = ref(true);
    const error = ref("");
    const requiresPassword = ref(false);
    const showEditModal = ref(false);
    const showDeleteSuccess = ref(false);
    const redirectCountdown = ref(3);
    const { pause: stopRedirectCountdown, resume: startRedirectCountdown } = useIntervalFn(
      () => {
        redirectCountdown.value--;
        if (redirectCountdown.value <= 0) {
          stopRedirectCountdown();
          window.location.href = "/";
        }
      },
      1e3,
      { immediate: false }
    );
    const authStore = useAuthStore();
    computed(() => authStore.isAdmin);
    const refreshFileInfo = async () => {
      if (fileInfo.value && fileInfo.value.passwordVerified && fileInfo.value.currentPassword) {
        try {
          setFilePassword(fileInfo.value.slug, fileInfo.value.currentPassword);
        } catch (err) {
          log.error("无法保存密码到会话存储:", err);
        }
      }
      await loadFileInfo(true);
    };
    const loadFileInfo = async (force = false) => {
      loading.value = true;
      error.value = "";
      try {
        const fileSlug = slug.value;
        if (!fileSlug) {
          error.value = t("fileView.errors.missingSlug");
          loading.value = false;
          return;
        }
        const data = await fileShareStore.fetchBySlug(fileSlug, { useCache: !force });
        fileInfo.value = {
          ...data,
          slug: fileSlug
        };
        requiresPassword.value = !!data.requires_password;
      } catch (err) {
        log.error("加载文件信息失败:", err);
        error.value = err.message || t("fileView.errors.loadFailed");
      } finally {
        loading.value = false;
      }
    };
    const handlePasswordVerified = (data) => {
      const updated = {
        ...fileInfo.value,
        ...data,
        passwordVerified: true,
        currentPassword: data.currentPassword
      };
      fileInfo.value = updated;
      if (data.currentPassword) {
        try {
          setFilePassword(fileInfo.value.slug, data.currentPassword);
        } catch (err) {
          log.error("无法保存密码到会话存储:", err);
        }
      }
      requiresPassword.value = false;
      fileShareStore.updateCachedFile(updated);
    };
    const openEditModal = async () => {
      try {
        if (fileInfo.value.id) {
          const prev = fileInfo.value;
          const detail = await fileShareStore.fetchById(fileInfo.value.id, { useCache: false });
          fileInfo.value = {
            ...detail,
            // 保留运行时状态字段
            slug: prev.slug,
            type: prev.type,
            requires_password: prev.requires_password,
            passwordVerified: prev.passwordVerified,
            currentPassword: prev.currentPassword,
            // 移除 use_proxy 的旧值保留，使用从后端获取的最新值
            previewUrl: prev.previewUrl,
            downloadUrl: prev.downloadUrl,
            linkType: prev.linkType,
            previewSelection: prev.previewSelection
          };
        }
        showEditModal.value = true;
      } catch (err) {
        log.error("获取文件详情出错:", err);
        showError(`${t("fileView.errors.getDetailsFailed")}: ${t("fileView.errors.getDetailsFailedMessage")}`);
        showEditModal.value = true;
      }
    };
    const closeEditModal = () => {
      showEditModal.value = false;
    };
    const saveFileChanges = async (updatedFile) => {
      try {
        if (!updatedFile?.id) {
          showError(`${t("fileView.errors.updateFailed")}: ${t("fileView.errors.missingId")}`);
          return;
        }
        const result = await fileshareService.updateFileMetadata(updatedFile.id, updatedFile);
        const updatedSlug = result && typeof result === "object" && result.slug ? result.slug : fileInfo.value.slug;
        const slugChanged = updatedSlug && updatedSlug !== fileInfo.value.slug;
        if (slugChanged) {
          slug.value = updatedSlug;
        }
        await loadFileInfo(true);
        if (slugChanged) {
          try {
            await router.replace({
              name: "FileView",
              params: { slug: updatedSlug },
              query: route.query,
              hash: route.hash
            });
          } catch (replaceError) {
            log.warn("跳转新链接失败", replaceError);
          }
        }
        closeEditModal();
        showSuccess(t("fileView.actions.updateSuccess"));
      } catch (err) {
        log.error("更新文件错误:", err);
        const msg = err?.message || t("fileView.errors.unknown");
        showError(`${t("fileView.errors.updateFailed")}: ${msg}`);
      }
    };
    const handleFileDeleted = () => {
      showDeleteSuccess.value = true;
      redirectCountdown.value = 3;
      stopRedirectCountdown();
      startRedirectCountdown();
    };
    onMounted(() => {
      loadFileInfo();
    });
    onUnmounted(() => {
      stopRedirectCountdown();
    });
    watch(
      () => props.slug,
      (newSlug) => {
        if (newSlug && newSlug !== slug.value) {
          slug.value = newSlug;
          loadFileInfo(true);
        }
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("a", _hoisted_4, toDisplayString(unref(t)("nav.home")), 1),
            _cache[0] || (_cache[0] = createBaseVNode("span", { class: "mx-2" }, "/", -1)),
            createBaseVNode("span", _hoisted_5, toDisplayString(unref(t)("fileView.title")), 1)
          ])
        ]),
        error.value ? (openBlock(), createElementBlock("div", _hoisted_6, [
          createVNode(unref(IconExclamation), { class: "h-16 w-16 mx-auto mb-4 text-red-600 dark:text-red-500" }),
          createBaseVNode("h2", _hoisted_7, toDisplayString(unref(t)("fileView.error")), 1),
          createBaseVNode("p", _hoisted_8, toDisplayString(error.value), 1),
          createBaseVNode("a", _hoisted_9, toDisplayString(unref(t)("common.back")), 1)
        ])) : showDeleteSuccess.value ? (openBlock(), createElementBlock("div", _hoisted_10, [
          createVNode(unref(IconCheck), { class: "h-16 w-16 mx-auto mb-4 text-green-600 dark:text-green-500" }),
          createBaseVNode("h2", _hoisted_11, toDisplayString(unref(t)("fileView.actions.deleteSuccess")), 1),
          createBaseVNode("p", _hoisted_12, toDisplayString(unref(t)("fileView.actions.redirectMessage")), 1),
          createBaseVNode("div", _hoisted_13, toDisplayString(redirectCountdown.value) + " " + toDisplayString(unref(t)("fileView.actions.redirecting")), 1)
        ])) : loading.value ? (openBlock(), createElementBlock("div", _hoisted_14, [
          createVNode(_sfc_main$e, {
            text: unref(t)("fileView.loading"),
            "dark-mode": __props.darkMode,
            size: "4xl",
            "icon-class": __props.darkMode ? "text-blue-400" : "text-blue-600",
            "text-class": __props.darkMode ? "text-gray-300" : "text-gray-600"
          }, null, 8, ["text", "dark-mode", "icon-class", "text-class"])
        ])) : (openBlock(), createElementBlock("div", _hoisted_15, [
          requiresPassword.value ? (openBlock(), createElementBlock("div", _hoisted_16, [
            createVNode(_sfc_main$3, {
              fileId: fileInfo.value.slug,
              onVerified: handlePasswordVerified
            }, null, 8, ["fileId"])
          ])) : (openBlock(), createElementBlock("div", _hoisted_17, [
            createVNode(_sfc_main$4, {
              fileInfo: fileInfo.value,
              darkMode: __props.darkMode
            }, null, 8, ["fileInfo", "darkMode"]),
            createVNode(_sfc_main$1, {
              fileInfo: fileInfo.value,
              darkMode: __props.darkMode,
              onEdit: openEditModal,
              onDelete: handleFileDeleted,
              onRefreshFileInfo: refreshFileInfo
            }, null, 8, ["fileInfo", "darkMode"])
          ])),
          showEditModal.value ? (openBlock(), createBlock(_sfc_main$g, {
            key: 2,
            file: fileInfo.value,
            onClose: closeEditModal,
            onSave: saveFileChanges
          }, null, 8, ["file"])) : createCommentVNode("", true)
        ]))
      ]);
    };
  }
};
export {
  _sfc_main as default
};
