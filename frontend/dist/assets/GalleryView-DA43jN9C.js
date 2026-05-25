import { e as useI18n, aZ as useFsService, i as useLocalStorage, g as ref, F as computed, w as watch, aK as _export_sfc, b2 as onClickOutside, bk as useIntersectionObserver, o as onMounted, aP as nextTick, aY as onBeforeUnmount, j as createElementBlock, k as openBlock, l as createBaseVNode, p as createCommentVNode, n as normalizeClass, z as createVNode, y as unref, at as IconGallery, t as toDisplayString, bl as IconSortAscending, ao as IconChevronDown, K as Fragment, L as renderList, am as IconAdjustments, q as withDirectives, v as vModelText, be as isRef, aE as withCtx, m as withModifiers, aD as normalizeStyle, aL as IconExclamation, bm as src_default } from "./index-BQxzU9F1.js";
import { r as revokeObjectUrl, s as shouldAttemptDecodeImagePreview, d as decodeImagePreviewUrlToObjectUrl, a as detectLivePhoto } from "./livePhotoUtils-x9T853K7.js";
import { u as useContextMenu, a as useFsMediaLightbox } from "./MountExplorerView-CPmqHPnN.js";
import { g as getFileIcon } from "./fileTypeIcons-s4hrDi1Q.js";
import { f as formatFileSize } from "./fileUtils-CALGFK20.js";
import { L as LIVE_PHOTO_BADGE_ICON_SVG } from "./livePhotoBadgeIconSvg-DVbmCKIq.js";
import "./fileTypes-C4-giE9O.js";
import "./LoadingIndicator-C1Dntewf.js";
import "./MarkdownDisplay-DriQfnOJ.js";
import "./timeUtils-D81jJILb.js";
import "./clipboard-GLHRBPpJ.js";
import "./useConfirmDialog-c5dcTgIB.js";
import "./fsMetaService-BlI_oFcH.js";
import "./PermissionManager-BpGELUYQ.js";
const INITIAL_RENDER_LIMIT = 120;
const RENDER_BATCH = 120;
const MAX_CONCURRENT_IMAGE_REQUESTS = 6;
function useGalleryView(input = {}) {
  const { t } = useI18n();
  const fsService = useFsService();
  const itemsRef = input.items;
  const columnCount = useLocalStorage("gallery_column_count", "auto");
  const horizontalGap = useLocalStorage("gallery_horizontal_gap", 16);
  const verticalGap = useLocalStorage("gallery_vertical_gap", 20);
  const sortBy = useLocalStorage("gallery_sort_by", "name");
  const showSortMenu = ref(false);
  const showViewSettings = ref(false);
  const baseGap = computed(() => horizontalGap.value);
  const columnWidth = computed(() => {
    return 280;
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
      return void 0;
    }
    const cols = parseInt(columnCount.value);
    return cols;
  });
  const sortOptions = computed(() => [
    { value: "name", label: t("gallery.sortByName") },
    { value: "size", label: t("gallery.sortBySize") },
    { value: "date", label: t("gallery.sortByDate") },
    { value: "type", label: t("gallery.sortByType") }
  ]);
  const imageStates = ref(/* @__PURE__ */ new Map());
  const renderLimit = ref(INITIAL_RENDER_LIMIT);
  const resetRenderWindow = () => {
    renderLimit.value = INITIAL_RENDER_LIMIT;
  };
  const clearImageStates = () => {
    imageStates.value.forEach((state) => {
      revokeObjectUrl(state?.url);
    });
    imageStates.value.clear();
  };
  const groups = computed(() => {
    const items = Array.isArray(itemsRef?.value) ? itemsRef.value : [];
    const allFolders2 = items.filter((item) => item?.isDirectory);
    const allImages2 = items.filter((item) => !item?.isDirectory && item?.type === 5);
    const allOtherFiles2 = items.filter((item) => !item?.isDirectory && item?.type !== 5 && item?.type !== 2);
    return { allFolders: allFolders2, allImages: allImages2, allOtherFiles: allOtherFiles2 };
  });
  const sortImages = (images) => {
    const sorted = [...images];
    switch (sortBy.value) {
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "size":
        return sorted.sort((a, b) => (b.size || 0) - (a.size || 0));
      case "date":
        return sorted.sort((a, b) => new Date(b.modified || 0) - new Date(a.modified || 0));
      case "type":
        return sorted.sort((a, b) => {
          const extA = a.name.split(".").pop().toLowerCase();
          const extB = b.name.split(".").pop().toLowerCase();
          return extA.localeCompare(extB);
        });
      default:
        return sorted;
    }
  };
  const allImages = computed(() => sortImages(groups.value.allImages));
  const allFolders = computed(() => groups.value.allFolders);
  const allOtherFiles = computed(() => groups.value.allOtherFiles);
  const visibleImages = computed(() => {
    return allImages.value.slice(0, renderLimit.value);
  });
  const hasMoreImages = computed(() => {
    return renderLimit.value < allImages.value.length;
  });
  const loadMoreImages = () => {
    if (!hasMoreImages.value) return;
    renderLimit.value = Math.min(renderLimit.value + RENDER_BATCH, allImages.value.length);
  };
  const masonryItems = computed(() => {
    return visibleImages.value.map((image, index) => ({
      id: image.path,
      image,
      index
    }));
  });
  const inFlight = /* @__PURE__ */ new Map();
  const queueHigh = [];
  const queueNormal = [];
  let activeCount = 0;
  const ensureIdleState = (image) => {
    if (!image?.path) return;
    if (!imageStates.value.has(image.path)) {
      imageStates.value.set(image.path, { status: "idle", url: null });
    }
  };
  const dequeue = () => {
    if (queueHigh.length > 0) return queueHigh.shift();
    if (queueNormal.length > 0) return queueNormal.shift();
    return null;
  };
  const runQueue = () => {
    while (activeCount < MAX_CONCURRENT_IMAGE_REQUESTS) {
      const job = dequeue();
      if (!job) return;
      const { image, signal, resolve, reject } = job;
      const path = image?.path;
      if (!path) {
        resolve();
        continue;
      }
      if (signal?.aborted) {
        resolve();
        continue;
      }
      const state = imageStates.value.get(path);
      if (state?.status === "loaded" || state?.status === "loading") {
        resolve();
        continue;
      }
      activeCount += 1;
      void (async () => {
        try {
          await loadImageUrlInternal(image, { signal });
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          activeCount -= 1;
          runQueue();
        }
      })();
    }
  };
  const scheduleLoad = (image, { priority = "normal", signal } = {}) => {
    if (!image?.path) return Promise.resolve();
    if (signal?.aborted) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const job = { image, signal, resolve, reject };
      if (priority === "high") {
        queueHigh.push(job);
      } else {
        queueNormal.push(job);
      }
      runQueue();
    });
  };
  const loadImageUrlInternal = async (image, { signal } = {}) => {
    const imagePath = image?.path || "";
    if (!imagePath) return;
    if (signal?.aborted) return;
    const currentState = imageStates.value.get(imagePath);
    if (currentState?.status === "loading" || currentState?.status === "loaded") return;
    imageStates.value.set(imagePath, { ...currentState || {}, status: "loading", url: null });
    try {
      const fileInfo = await fsService.getFileInfo(imagePath, { cancelPrevious: false, signal });
      if (signal?.aborted) return;
      const previewUrl = fileInfo?.previewUrl || "";
      if (!previewUrl) {
        imageStates.value.set(imagePath, { status: "error", url: null });
        return;
      }
      if (shouldAttemptDecodeImagePreview({ filename: image?.name || "", mimetype: image?.mimetype || "" })) {
        const decoded = await decodeImagePreviewUrlToObjectUrl({
          url: previewUrl,
          filename: image?.name || "",
          mimetype: image?.mimetype || "",
          signal,
          outputType: "image/webp",
          quality: 0.9
        });
        const prevUrl = currentState?.url || "";
        revokeObjectUrl(prevUrl);
        imageStates.value.set(imagePath, {
          status: "loaded",
          url: decoded.objectUrl,
          decoded: true,
          decodeAttempted: true,
          naturalWidth: decoded.width,
          naturalHeight: decoded.height,
          aspectRatio: decoded.width && decoded.height ? decoded.width / decoded.height : void 0
        });
        return;
      }
      imageStates.value.set(imagePath, { status: "loaded", url: previewUrl });
    } catch (error) {
      if (error?.name === "AbortError" || signal?.aborted) return;
      imageStates.value.set(imagePath, { status: "error", url: null });
    }
  };
  const loadImageUrl = async (image, options = {}) => {
    const imagePath = image?.path || "";
    if (!imagePath) return;
    const currentState = imageStates.value.get(imagePath);
    if (currentState?.status === "loaded" || currentState?.status === "loading") return;
    if (inFlight.has(imagePath)) {
      return inFlight.get(imagePath);
    }
    const promise = scheduleLoad(image, options);
    inFlight.set(imagePath, promise);
    try {
      await promise;
    } finally {
      inFlight.delete(imagePath);
    }
  };
  watch(
    visibleImages,
    (images) => {
      images.forEach((img) => ensureIdleState(img));
    },
    { immediate: true }
  );
  watch(
    () => itemsRef?.value,
    () => {
      clearImageStates();
      resetRenderWindow();
    }
  );
  const isDefaultSettings = computed(() => {
    return columnCount.value === "auto" && horizontalGap.value === 16 && verticalGap.value === 20 && sortBy.value === "name";
  });
  const resetGallerySettings = () => {
    columnCount.value = "auto";
    horizontalGap.value = 16;
    verticalGap.value = 20;
    sortBy.value = "name";
  };
  const toggleSortMenu = () => {
    showSortMenu.value = !showSortMenu.value;
    if (showSortMenu.value) {
      showViewSettings.value = false;
    }
  };
  const toggleViewSettings = () => {
    showViewSettings.value = !showViewSettings.value;
    if (showViewSettings.value) {
      showSortMenu.value = false;
    }
  };
  const handleSortChange = (sortValue) => {
    sortBy.value = sortValue;
    showSortMenu.value = false;
  };
  let watchersInitialized = false;
  const setupWatchers = () => {
    if (watchersInitialized) return;
    watchersInitialized = true;
  };
  return {
    // 数据
    allFolders,
    allImages,
    allOtherFiles,
    visibleImages,
    masonryItems,
    hasMoreImages,
    loadMoreImages,
    // 状态
    columnCount,
    horizontalGap,
    verticalGap,
    sortBy,
    showSortMenu,
    showViewSettings,
    // MasonryWall配置
    baseGap,
    columnWidth,
    minColumns,
    maxColumns,
    // 工具栏配置
    sortOptions,
    // 图片状态
    imageStates,
    clearImageStates,
    resetRenderWindow,
    // 图片URL管理
    loadImageUrl,
    // 设置管理
    isDefaultSettings,
    resetGallerySettings,
    // 工具栏交互
    toggleSortMenu,
    toggleViewSettings,
    handleSortChange,
    // 初始化方法
    setupWatchers
  };
}
const _hoisted_1 = { class: "gallery-view" };
const _hoisted_2 = { class: "flex items-center justify-between" };
const _hoisted_3 = { class: "flex items-center gap-3" };
const _hoisted_4 = { class: "flex items-center gap-2" };
const _hoisted_5 = { class: "flex items-center gap-2" };
const _hoisted_6 = { class: "relative" };
const _hoisted_7 = { class: "hidden sm:inline" };
const _hoisted_8 = { class: "py-1" };
const _hoisted_9 = ["onClick"];
const _hoisted_10 = { class: "hidden sm:inline" };
const _hoisted_11 = { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" };
const _hoisted_12 = { class: "space-y-2" };
const _hoisted_13 = { class: "flex items-center gap-2" };
const _hoisted_14 = ["onClick"];
const _hoisted_15 = { class: "space-y-3" };
const _hoisted_16 = { class: "flex items-center justify-between" };
const _hoisted_17 = ["disabled", "title"];
const _hoisted_18 = { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" };
const _hoisted_19 = { class: "space-y-2" };
const _hoisted_20 = { class: "flex items-center justify-between" };
const _hoisted_21 = { class: "relative" };
const _hoisted_22 = { class: "space-y-2" };
const _hoisted_23 = { class: "flex items-center justify-between" };
const _hoisted_24 = { class: "relative" };
const _hoisted_25 = ["onClick", "onContextmenu"];
const _hoisted_26 = { class: "masonry-image-container" };
const _hoisted_27 = ["onClick"];
const _hoisted_28 = ["checked"];
const _hoisted_29 = { class: "masonry-image-wrapper" };
const _hoisted_30 = ["title"];
const _hoisted_31 = ["innerHTML"];
const _hoisted_32 = ["src", "alt", "onLoad", "onError"];
const _hoisted_33 = { class: "placeholder-content" };
const _hoisted_34 = { class: "w-8 h-8 mx-auto mb-2 opacity-50" };
const _hoisted_35 = { class: "text-xs opacity-75 text-red-600 dark:text-red-400" };
const _hoisted_36 = ["data-image-path"];
const _hoisted_37 = { class: "placeholder-content" };
const _hoisted_38 = { class: "w-8 h-8 mx-auto mb-2 opacity-50" };
const _hoisted_39 = ["innerHTML"];
const _hoisted_40 = { class: "masonry-overlay" };
const _hoisted_41 = { class: "masonry-info" };
const _hoisted_42 = { class: "text-sm font-medium truncate" };
const _hoisted_43 = { class: "text-xs opacity-75 mt-1" };
const _hoisted_44 = {
  key: 1,
  class: "text-center py-16"
};
const _hoisted_45 = { class: "max-w-md mx-auto" };
const _hoisted_46 = { class: "w-24 h-24 mx-auto mb-6 opacity-30" };
const _hoisted_47 = { key: 0 };
const _hoisted_48 = { key: 1 };
const _hoisted_49 = { key: 2 };
const _hoisted_50 = { key: 3 };
const _sfc_main = {
  __name: "GalleryView",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    isCheckboxMode: {
      type: Boolean,
      default: false
    },
    selectedItems: {
      type: Array,
      default: () => []
    }
  },
  emits: ["item-click", "item-select", "download", "getLink", "rename", "delete", "contextmenu", "show-message"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const livePhotoBadgeIconSvg = LIVE_PHOTO_BADGE_ICON_SVG;
    const props = __props;
    const emit = __emit;
    const {
      // 数据
      allFolders,
      allImages,
      allOtherFiles,
      masonryItems,
      hasMoreImages,
      loadMoreImages,
      // 设置状态
      columnCount,
      horizontalGap,
      verticalGap,
      sortBy,
      showSortMenu,
      showViewSettings,
      // MasonryWall配置
      baseGap,
      columnWidth,
      minColumns,
      maxColumns,
      // 工具栏配置
      sortOptions,
      // 图片状态/加载
      imageStates,
      loadImageUrl,
      // 设置管理
      isDefaultSettings,
      resetGallerySettings,
      // 工具栏交互
      toggleSortMenu,
      toggleViewSettings,
      handleSortChange,
      // 初始化方法
      setupWatchers,
      clearImageStates,
      resetRenderWindow
    } = useGalleryView({ items: computed(() => props.items) });
    const fsLightbox = useFsMediaLightbox();
    const toolbarRef = ref(null);
    onClickOutside(toolbarRef, () => {
      if (!showSortMenu.value && !showViewSettings.value) return;
      showSortMenu.value = false;
      showViewSettings.value = false;
    });
    const handleDownload = (item) => {
      emit("download", item);
    };
    const handleGetLink = (item) => {
      emit("getLink", item);
    };
    const handleRename = (item) => {
      emit("rename", item);
    };
    const handleDelete = (items) => {
      emit("delete", items);
    };
    const handleCopy = (items) => {
      emit("contextmenu", {
        event: null,
        item: Array.isArray(items) ? items[0] : items,
        items: Array.isArray(items) ? items : [items],
        action: "copy"
      });
    };
    const handleAddToBasket = (items) => {
      emit("contextmenu", {
        event: null,
        item: Array.isArray(items) ? items[0] : items,
        items: Array.isArray(items) ? items : [items],
        action: "add-to-basket"
      });
    };
    const handleToggleCheckboxes = () => {
      emit("contextmenu", {
        event: null,
        item: null,
        items: [],
        action: "toggle-checkboxes"
      });
    };
    const contextMenu = useContextMenu({
      onDownload: handleDownload,
      onGetLink: handleGetLink,
      onRename: handleRename,
      onDelete: handleDelete,
      onCopy: handleCopy,
      onAddToBasket: handleAddToBasket,
      onToggleCheckboxes: handleToggleCheckboxes,
      t
    });
    const getContentSummary = () => {
      const imageCount = allImages.value.length;
      if (imageCount === 0) {
        return t("gallery.noImages");
      }
      return `${imageCount} ${t("gallery.imagesCount")}`;
    };
    const getImageSrc = (image) => {
      const imageState = imageStates.value.get(image.path);
      if (imageState?.status === "loaded" && imageState.url) {
        return imageState.url;
      }
      return "";
    };
    const getImageState = (image) => {
      return imageStates.value.get(image.path);
    };
    const livePhotoInfoByPath = computed(() => {
      const map = /* @__PURE__ */ new Map();
      for (const img of allImages.value) {
        if (!img?.path) continue;
        const result = detectLivePhoto(img, props.items);
        map.set(img.path, {
          isLive: !!result?.isLivePhoto,
          videoPath: result?.videoFile?.path || ""
        });
      }
      return map;
    });
    const isLivePhotoInGallery = (image) => {
      if (!image?.path) return false;
      return !!livePhotoInfoByPath.value.get(image.path)?.isLive;
    };
    const handleImageLoad = (image, event) => {
      const img = event.target;
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      const currentState = imageStates.value.get(image.path);
      if (currentState) {
        imageStates.value.set(image.path, {
          ...currentState,
          aspectRatio,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight
        });
      }
    };
    const errorRetries = /* @__PURE__ */ new Map();
    let galleryAbortController = null;
    const handleImageError = (image) => {
      const current = errorRetries.get(image.path) || 0;
      if (current < 1) {
        errorRetries.set(image.path, current + 1);
        imageStates.value.set(image.path, { status: "idle", url: null });
        void loadImageUrl(image, { priority: "high", signal: galleryAbortController?.signal });
        return;
      }
      imageStates.value.set(image.path, { status: "error", url: null });
    };
    const getPlaceholderStyle = () => {
      return {
        width: "100%",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      };
    };
    const imagesByPath = computed(() => {
      return new Map(allImages.value.map((img) => [img.path, img]));
    });
    const lightboxItems = computed(() => {
      const infoMap = livePhotoInfoByPath.value;
      return allImages.value.map((img) => {
        const info = infoMap.get(img.path);
        if (info?.isLive && info.videoPath) {
          return {
            ...img,
            __cloudpasteLivePhotoVideoPath: info.videoPath
          };
        }
        return img;
      });
    });
    const handleContextMenu = (event, image) => {
      const selectedFiles = props.selectedItems || [];
      const isImageSelected = selectedFiles.some((i) => i.path === image.path);
      let itemsForMenu;
      if (selectedFiles.length > 0) {
        if (isImageSelected) {
          itemsForMenu = selectedFiles;
        } else {
          itemsForMenu = [image];
        }
      } else {
        itemsForMenu = [image];
      }
      contextMenu.showContextMenu(event, image, itemsForMenu, props.darkMode, props.isCheckboxMode);
    };
    const lazyImageTargets = ref([]);
    const { stop: stopLazyImageObserver } = useIntersectionObserver(
      lazyImageTargets,
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const placeholder = (
            /** @type {HTMLElement} */
            entry.target
          );
          const imagePath = placeholder?.dataset?.imagePath;
          if (!imagePath) return;
          const image = imagesByPath.value.get(imagePath);
          if (!image) return;
          const priority = entry.intersectionRatio > 0.5 ? "high" : "normal";
          void loadImageUrl(image, { priority, signal: galleryAbortController?.signal });
          try {
            observer?.unobserve?.(placeholder);
          } catch {
          }
        });
      },
      {
        rootMargin: "200px",
        threshold: [0.1, 0.5]
      }
    );
    const timers = /* @__PURE__ */ new Set();
    const safeSetTimeout = (callback, delay) => {
      const id = setTimeout(() => {
        timers.delete(id);
        callback();
      }, delay);
      timers.add(id);
      return id;
    };
    const initImageLazyLoading = () => {
      lazyImageTargets.value = [];
    };
    const observeLazyImages = (retryCount = 0) => {
      const lazyPlaceholders = document.querySelectorAll(".lazy-image");
      if (lazyPlaceholders.length === 0 && retryCount < 2) {
        safeSetTimeout(() => {
          observeLazyImages(retryCount + 1);
        }, 200 * (retryCount + 1));
        return;
      }
      if (lazyPlaceholders.length === 0) {
        return;
      }
      const targets = [];
      lazyPlaceholders.forEach((placeholder) => {
        const imagePath = placeholder.dataset.imagePath;
        const imageState = imageStates.value.get(imagePath);
        if (imageState?.status === "idle") {
          targets.push(
            /** @type {HTMLElement} */
            placeholder
          );
        }
      });
      lazyImageTargets.value = targets;
    };
    const handleItemClick = async (item) => {
      if (props.isCheckboxMode) {
        toggleItemSelect(item);
        return;
      }
      const currentIndex = lightboxItems.value.findIndex((img) => img.path === item.path);
      if (currentIndex === -1) {
        emit("item-click", item);
        return;
      }
      fsLightbox.open({
        items: lightboxItems.value,
        index: currentIndex,
        darkMode: props.darkMode,
        imageStates: imageStates.value,
        loadImageUrl,
        onDownload: (current) => emit("download", current),
        onGetLink: (current) => emit("getLink", current)
      });
    };
    const toggleItemSelect = (item) => {
      emit("item-select", item, !isItemSelected(item));
    };
    const isItemSelected = (item) => {
      return props.selectedItems.some((selected) => selected.path === item.path);
    };
    const updateSpacingCSSVariables = () => {
      const galleryElement = document.querySelector(".masonry-wall-gallery");
      if (galleryElement) {
        galleryElement.style.setProperty("--vertical-gap", `${verticalGap.value}px`);
      }
    };
    watch(
      verticalGap,
      () => {
        updateSpacingCSSVariables();
      },
      { immediate: true }
    );
    watch(
      masonryItems,
      () => {
        safeSetTimeout(() => {
          observeLazyImages();
        }, 100);
      },
      { flush: "post" }
    );
    const loadMoreSentinelRef = ref(null);
    const { stop: stopLoadMoreObserver } = useIntersectionObserver(
      loadMoreSentinelRef,
      (entries) => {
        const entry = entries?.[0];
        if (!entry?.isIntersecting) return;
        if (!hasMoreImages.value) return;
        loadMoreImages();
        nextTick(() => observeLazyImages());
      },
      { rootMargin: "800px" }
    );
    onMounted(() => {
      setupWatchers();
      galleryAbortController = new AbortController();
      nextTick(() => {
        updateSpacingCSSVariables();
        initImageLazyLoading();
      });
      safeSetTimeout(() => observeLazyImages(), 100);
    });
    watch(
      () => props.items,
      () => {
        errorRetries.clear();
        galleryAbortController?.abort();
        galleryAbortController = new AbortController();
        initImageLazyLoading();
        nextTick(() => {
          observeLazyImages();
        });
      }
    );
    onBeforeUnmount(() => {
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
      stopLazyImageObserver?.();
      stopLoadMoreObserver?.();
      galleryAbortController?.abort();
      galleryAbortController = null;
      clearImageStates();
      resetRenderWindow();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          ref_key: "toolbarRef",
          ref: toolbarRef,
          class: normalizeClass(["gallery-toolbar mb-4", __props.darkMode ? "bg-gray-800/80" : "bg-white/90"])
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["px-3 py-2 border-b", __props.darkMode ? "border-gray-700" : "border-gray-200"])
          }, [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, [
                createBaseVNode("div", _hoisted_4, [
                  createVNode(unref(IconGallery), {
                    class: normalizeClass(__props.darkMode ? "text-blue-400" : "text-blue-600"),
                    "aria-hidden": "true"
                  }, null, 8, ["class"]),
                  createBaseVNode("span", {
                    class: normalizeClass(["font-medium text-sm", __props.darkMode ? "text-gray-200" : "text-gray-900"])
                  }, toDisplayString(unref(t)("gallery.viewModeName")), 3)
                ]),
                createBaseVNode("div", {
                  class: normalizeClass(["w-px h-4", __props.darkMode ? "bg-gray-600" : "bg-gray-300"])
                }, null, 2),
                createBaseVNode("span", {
                  class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                }, toDisplayString(getContentSummary()), 3)
              ]),
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("div", _hoisted_6, [
                  createBaseVNode("button", {
                    onClick: _cache[0] || (_cache[0] = (...args) => unref(toggleSortMenu) && unref(toggleSortMenu)(...args)),
                    class: normalizeClass(["flex items-center gap-1 px-3 py-1.5 text-sm rounded-md transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"])
                  }, [
                    createVNode(unref(IconSortAscending), {
                      size: "sm",
                      "aria-hidden": "true"
                    }),
                    createBaseVNode("span", _hoisted_7, toDisplayString(unref(t)("gallery.sort")), 1),
                    createVNode(unref(IconChevronDown), {
                      size: "xs",
                      "aria-hidden": "true"
                    })
                  ], 2),
                  unref(showSortMenu) ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: normalizeClass(["absolute right-0 top-full mt-1 w-48 rounded-md shadow-lg z-[9999]", __props.darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"])
                  }, [
                    createBaseVNode("div", _hoisted_8, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(sortOptions), (option) => {
                        return openBlock(), createElementBlock("button", {
                          key: option.value,
                          onClick: ($event) => unref(handleSortChange)(option.value),
                          class: normalizeClass(["w-full text-left px-3 py-2 text-sm transition-colors", [
                            unref(sortBy) === option.value ? __props.darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900" : __props.darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"
                          ]])
                        }, toDisplayString(option.label), 11, _hoisted_9);
                      }), 128))
                    ])
                  ], 2)) : createCommentVNode("", true)
                ]),
                createBaseVNode("button", {
                  onClick: _cache[1] || (_cache[1] = (...args) => unref(toggleViewSettings) && unref(toggleViewSettings)(...args)),
                  class: normalizeClass(["flex items-center gap-1 px-3 py-1.5 text-sm rounded-md transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"])
                }, [
                  createVNode(unref(IconAdjustments), {
                    size: "sm",
                    "aria-hidden": "true"
                  }),
                  createBaseVNode("span", _hoisted_10, toDisplayString(unref(t)("gallery.settings")), 1)
                ], 2)
              ])
            ])
          ], 2),
          unref(showViewSettings) ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["px-3 py-2 border-b", __props.darkMode ? "border-gray-700 bg-gray-800/30" : "border-gray-200 bg-gray-50/50"])
          }, [
            createBaseVNode("div", _hoisted_11, [
              createBaseVNode("div", _hoisted_12, [
                createBaseVNode("label", {
                  class: normalizeClass(["block text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, toDisplayString(unref(t)("gallery.columns")), 3),
                createBaseVNode("div", _hoisted_13, [
                  createBaseVNode("button", {
                    onClick: _cache[2] || (_cache[2] = ($event) => columnCount.value = "auto"),
                    class: normalizeClass(["px-3 py-1.5 text-xs rounded-md transition-colors", [
                      unref(columnCount) === "auto" ? __props.darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white" : __props.darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    ]])
                  }, toDisplayString(unref(t)("gallery.auto")), 3),
                  createBaseVNode("div", {
                    class: normalizeClass(["flex rounded-md overflow-hidden border", __props.darkMode ? "border-gray-600" : "border-gray-300"])
                  }, [
                    (openBlock(), createElementBlock(Fragment, null, renderList([2, 3, 4, 5, 6], (cols) => {
                      return createBaseVNode("button", {
                        key: cols,
                        onClick: ($event) => columnCount.value = cols.toString(),
                        class: normalizeClass(["px-2 py-1.5 text-xs transition-colors", [
                          unref(columnCount) === cols.toString() ? __props.darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900" : __props.darkMode ? "bg-gray-800 text-gray-400 hover:bg-gray-700" : "bg-white text-gray-600 hover:bg-gray-50"
                        ]])
                      }, toDisplayString(cols), 11, _hoisted_14);
                    }), 64))
                  ], 2)
                ])
              ]),
              createBaseVNode("div", _hoisted_15, [
                createBaseVNode("div", _hoisted_16, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                  }, toDisplayString(unref(t)("gallery.spacing")), 3),
                  createBaseVNode("button", {
                    onClick: _cache[3] || (_cache[3] = (...args) => unref(resetGallerySettings) && unref(resetGallerySettings)(...args)),
                    disabled: unref(isDefaultSettings),
                    class: normalizeClass(["text-xs px-2 py-1 rounded transition-colors", [
                      unref(isDefaultSettings) ? __props.darkMode ? "text-gray-600 cursor-not-allowed" : "text-gray-400 cursor-not-allowed" : __props.darkMode ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                    ]]),
                    title: unref(isDefaultSettings) ? unref(t)("gallery.alreadyDefault") : unref(t)("gallery.resetSettings")
                  }, toDisplayString(unref(t)("gallery.reset")), 11, _hoisted_17)
                ]),
                createBaseVNode("div", _hoisted_18, [
                  createBaseVNode("div", _hoisted_19, [
                    createBaseVNode("div", _hoisted_20, [
                      createBaseVNode("label", {
                        class: normalizeClass(["text-xs font-medium", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                      }, toDisplayString(unref(t)("gallery.horizontalSpacing")), 3),
                      createBaseVNode("span", {
                        class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                      }, toDisplayString(unref(horizontalGap)) + "px ", 3)
                    ]),
                    createBaseVNode("div", _hoisted_21, [
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => isRef(horizontalGap) ? horizontalGap.value = $event : null),
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
                      }, [
                        createBaseVNode("span", null, toDisplayString(unref(t)("gallery.tight")), 1),
                        createBaseVNode("span", null, toDisplayString(unref(t)("gallery.loose")), 1)
                      ], 2)
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_22, [
                    createBaseVNode("div", _hoisted_23, [
                      createBaseVNode("label", {
                        class: normalizeClass(["text-xs font-medium", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                      }, toDisplayString(unref(t)("gallery.verticalSpacing")), 3),
                      createBaseVNode("span", {
                        class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                      }, toDisplayString(unref(verticalGap)) + "px ", 3)
                    ]),
                    createBaseVNode("div", _hoisted_24, [
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => isRef(verticalGap) ? verticalGap.value = $event : null),
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
                      }, [
                        createBaseVNode("span", null, toDisplayString(unref(t)("gallery.tight")), 1),
                        createBaseVNode("span", null, toDisplayString(unref(t)("gallery.loose")), 1)
                      ], 2)
                    ])
                  ])
                ])
              ])
            ])
          ], 2)) : createCommentVNode("", true)
        ], 2),
        unref(allImages).length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createVNode(unref(src_default), {
            items: unref(masonryItems),
            "column-width": unref(columnWidth),
            gap: unref(baseGap),
            "min-columns": unref(minColumns),
            "max-columns": unref(maxColumns),
            "ssr-columns": 1,
            "key-mapper": (item, column, row, index) => item.id || index,
            class: "masonry-wall-gallery"
          }, {
            default: withCtx(({ item }) => [
              createBaseVNode("div", {
                class: "masonry-item",
                onClick: ($event) => handleItemClick(item.image),
                onContextmenu: withModifiers((event) => handleContextMenu(event, item.image), ["prevent"])
              }, [
                createBaseVNode("div", _hoisted_26, [
                  __props.isCheckboxMode ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "absolute top-2 left-2 z-10",
                    onClick: withModifiers(($event) => toggleItemSelect(item.image), ["stop"])
                  }, [
                    createBaseVNode("input", {
                      type: "checkbox",
                      checked: isItemSelected(item.image),
                      class: normalizeClass(["h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500", __props.darkMode ? "bg-gray-700 border-gray-500" : ""])
                    }, null, 10, _hoisted_28)
                  ], 8, _hoisted_27)) : createCommentVNode("", true),
                  createBaseVNode("div", _hoisted_29, [
                    isLivePhotoInGallery(item.image) ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: normalizeClass(["pointer-events-none", { "live-photo-viewer--dark": __props.darkMode }])
                    }, [
                      createBaseVNode("div", {
                        class: "live-photo-viewer__badge live-photo-viewer__badge--static",
                        title: unref(t)("livePhoto.badge")
                      }, [
                        createBaseVNode("span", { innerHTML: unref(livePhotoBadgeIconSvg) }, null, 8, _hoisted_31)
                      ], 8, _hoisted_30)
                    ], 2)) : createCommentVNode("", true),
                    getImageSrc(item.image) ? (openBlock(), createElementBlock("img", {
                      key: 1,
                      src: getImageSrc(item.image),
                      alt: item.image.name,
                      class: "masonry-image",
                      decoding: "async",
                      onLoad: (event) => handleImageLoad(item.image, event),
                      onError: ($event) => handleImageError(item.image)
                    }, null, 40, _hoisted_32)) : getImageState(item.image)?.status === "error" ? (openBlock(), createElementBlock("div", {
                      key: 2,
                      class: "masonry-placeholder bg-red-100 dark:bg-red-900/20",
                      style: normalizeStyle(getPlaceholderStyle())
                    }, [
                      createBaseVNode("div", _hoisted_33, [
                        createBaseVNode("div", _hoisted_34, [
                          createVNode(unref(IconExclamation), {
                            class: "w-full h-full text-red-500",
                            "aria-hidden": "true"
                          })
                        ]),
                        createBaseVNode("span", _hoisted_35, toDisplayString(unref(t)("gallery.loadError")), 1)
                      ])
                    ], 4)) : (openBlock(), createElementBlock("div", {
                      key: 3,
                      class: "masonry-placeholder lazy-image bg-gray-200 dark:bg-gray-700 animate-pulse",
                      "data-image-path": item.image.path,
                      style: normalizeStyle(getPlaceholderStyle())
                    }, [
                      createBaseVNode("div", _hoisted_37, [
                        createBaseVNode("div", _hoisted_38, [
                          createBaseVNode("div", {
                            innerHTML: unref(getFileIcon)(item.image, __props.darkMode),
                            class: "w-full h-full"
                          }, null, 8, _hoisted_39)
                        ]),
                        createBaseVNode("span", {
                          class: normalizeClass(["text-xs opacity-75", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                        }, toDisplayString(unref(t)("gallery.loading")), 3)
                      ])
                    ], 12, _hoisted_36))
                  ]),
                  createBaseVNode("div", _hoisted_40, [
                    createBaseVNode("div", _hoisted_41, [
                      createBaseVNode("div", _hoisted_42, toDisplayString(item.image.name), 1),
                      createBaseVNode("div", _hoisted_43, toDisplayString(unref(formatFileSize)(item.image.size)), 1)
                    ])
                  ])
                ])
              ], 40, _hoisted_25)
            ]),
            _: 1
          }, 8, ["items", "column-width", "gap", "min-columns", "max-columns", "key-mapper"]),
          unref(hasMoreImages) ? (openBlock(), createElementBlock("div", {
            key: 0,
            ref_key: "loadMoreSentinelRef",
            ref: loadMoreSentinelRef,
            class: "h-1"
          }, null, 512)) : createCommentVNode("", true)
        ], 64)) : (openBlock(), createElementBlock("div", _hoisted_44, [
          createBaseVNode("div", _hoisted_45, [
            createBaseVNode("div", _hoisted_46, [
              createVNode(unref(IconGallery), {
                class: normalizeClass(["w-full h-full", __props.darkMode ? "text-gray-500" : "text-gray-400"]),
                "aria-hidden": "true"
              }, null, 8, ["class"])
            ]),
            createBaseVNode("h3", {
              class: normalizeClass(["text-lg font-medium mb-2", __props.darkMode ? "text-gray-300" : "text-gray-700"])
            }, toDisplayString(unref(t)("gallery.noImagesTitle")), 3),
            createBaseVNode("p", {
              class: normalizeClass(["text-sm mb-4", __props.darkMode ? "text-gray-400" : "text-gray-500"])
            }, toDisplayString(unref(t)("gallery.noImagesDescription")), 3),
            createBaseVNode("div", {
              class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-500" : "text-gray-400"])
            }, [
              unref(allFolders).length > 0 ? (openBlock(), createElementBlock("span", _hoisted_47, toDisplayString(unref(allFolders).length) + " " + toDisplayString(unref(t)("gallery.foldersCount")), 1)) : createCommentVNode("", true),
              unref(allFolders).length > 0 && unref(allOtherFiles).length > 0 ? (openBlock(), createElementBlock("span", _hoisted_48, " • ")) : createCommentVNode("", true),
              unref(allOtherFiles).length > 0 ? (openBlock(), createElementBlock("span", _hoisted_49, toDisplayString(unref(allOtherFiles).length) + " " + toDisplayString(unref(t)("gallery.otherFilesCount")), 1)) : createCommentVNode("", true),
              unref(allFolders).length === 0 && unref(allOtherFiles).length === 0 ? (openBlock(), createElementBlock("span", _hoisted_50, toDisplayString(unref(t)("gallery.emptyFolder")), 1)) : createCommentVNode("", true)
            ], 2)
          ])
        ]))
      ]);
    };
  }
};
const GalleryView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-74b9fbb9"]]);
export {
  GalleryView as default
};
