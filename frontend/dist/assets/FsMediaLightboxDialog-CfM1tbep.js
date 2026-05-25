import { c as createLogger, g as ref, bp as useSessionStorage, aP as nextTick, _ as __vitePreload, $ as useWindowSize, aZ as useFsService, F as computed, w as watch, aY as onBeforeUnmount, j as createElementBlock, k as openBlock, l as createBaseVNode, z as createVNode, y as unref, dO as IconMdiChevronLeft, p as createCommentVNode, t as toDisplayString, dP as IconMdiClockOutline, dQ as IconMdiFileOutline, dR as IconMdiDatabaseOutline, dS as IconMdiAspectRatio, K as Fragment, L as renderList, M as createBlock, dT as IconMdiCalendar, dU as IconMdiMapMarkerOutline, dV as IconMdiCamera, dW as IconMdiFocusAuto, dX as IconMdiRuler, dY as IconMdiCameraIris, dZ as IconMdiTimerOutline, d_ as IconMdiAlphaICircleOutline, d$ as IconMdiInformationOutline, e0 as IconMdiGoogleMaps, e1 as IconMdiMapMarker, u as useEventListener, H as IconDownload, bo as IconLink, G as IconClose, aD as normalizeStyle, n as normalizeClass, aE as withCtx, aF as Transition, aV as Teleport } from "./index-BQxzU9F1.js";
/* empty css                           */
import { L as LIVE_PHOTO_BADGE_ICON_SVG } from "./livePhotoBadgeIconSvg-DVbmCKIq.js";
import { a as useFsMediaLightbox } from "./MountExplorerView-CPmqHPnN.js";
import { f as formatFileSize } from "./fileUtils-CALGFK20.js";
import { c as formatDateTime } from "./timeUtils-D81jJILb.js";
import { i as isImageLikeForExif, M as MapEmbed, l as loadExifTagsFromArrayBufferAsync, b as buildExifRows, r as resolveGpsCoordinates } from "./MapEmbed-BRXo7_oo.js";
import { c as getFileName, d as getMimeTypeDescription } from "./fileTypes-C4-giE9O.js";
import "./LoadingIndicator-C1Dntewf.js";
import "./MarkdownDisplay-DriQfnOJ.js";
import "./clipboard-GLHRBPpJ.js";
import "./fileTypeIcons-s4hrDi1Q.js";
import "./useConfirmDialog-c5dcTgIB.js";
import "./fsMetaService-BlI_oFcH.js";
import "./PermissionManager-BpGELUYQ.js";
/*!
  * PhotoSwipe Lightbox 5.4.4 - https://photoswipe.com
  * (c) 2024 Dmytro Semenov
  */
function createElement(className, tagName, appendToEl) {
  const el = document.createElement(tagName);
  if (className) {
    el.className = className;
  }
  if (appendToEl) {
    appendToEl.appendChild(el);
  }
  return el;
}
function toTransformString(x, y, scale) {
  let propValue = `translate3d(${x}px,${0}px,0)`;
  if (scale !== void 0) {
    propValue += ` scale3d(${scale},${scale},1)`;
  }
  return propValue;
}
function setWidthHeight(el, w, h) {
  el.style.width = typeof w === "number" ? `${w}px` : w;
  el.style.height = typeof h === "number" ? `${h}px` : h;
}
const LOAD_STATE = {
  IDLE: "idle",
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error"
};
function specialKeyUsed(e) {
  return "button" in e && e.button === 1 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function getElementsFromOption(option, legacySelector, parent = document) {
  let elements = [];
  if (option instanceof Element) {
    elements = [option];
  } else if (option instanceof NodeList || Array.isArray(option)) {
    elements = Array.from(option);
  } else {
    const selector = typeof option === "string" ? option : legacySelector;
    if (selector) {
      elements = Array.from(parent.querySelectorAll(selector));
    }
  }
  return elements;
}
function isPswpClass(fn) {
  return typeof fn === "function" && fn.prototype && fn.prototype.goTo;
}
function isSafari() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}
class PhotoSwipeEvent {
  /**
   * @param {T} type
   * @param {PhotoSwipeEventsMap[T]} [details]
   */
  constructor(type, details) {
    this.type = type;
    this.defaultPrevented = false;
    if (details) {
      Object.assign(this, details);
    }
  }
  preventDefault() {
    this.defaultPrevented = true;
  }
}
class Eventable {
  constructor() {
    this._listeners = {};
    this._filters = {};
    this.pswp = void 0;
    this.options = void 0;
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   * @param {number} priority
   */
  addFilter(name, fn, priority = 100) {
    var _this$_filters$name, _this$_filters$name2, _this$pswp;
    if (!this._filters[name]) {
      this._filters[name] = [];
    }
    (_this$_filters$name = this._filters[name]) === null || _this$_filters$name === void 0 || _this$_filters$name.push({
      fn,
      priority
    });
    (_this$_filters$name2 = this._filters[name]) === null || _this$_filters$name2 === void 0 || _this$_filters$name2.sort((f1, f2) => f1.priority - f2.priority);
    (_this$pswp = this.pswp) === null || _this$pswp === void 0 || _this$pswp.addFilter(name, fn, priority);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   */
  removeFilter(name, fn) {
    if (this._filters[name]) {
      this._filters[name] = this._filters[name].filter((filter) => filter.fn !== fn);
    }
    if (this.pswp) {
      this.pswp.removeFilter(name, fn);
    }
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
   * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
   */
  applyFilters(name, ...args) {
    var _this$_filters$name3;
    (_this$_filters$name3 = this._filters[name]) === null || _this$_filters$name3 === void 0 || _this$_filters$name3.forEach((filter) => {
      args[0] = filter.fn.apply(this, args);
    });
    return args[0];
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  on(name, fn) {
    var _this$_listeners$name, _this$pswp2;
    if (!this._listeners[name]) {
      this._listeners[name] = [];
    }
    (_this$_listeners$name = this._listeners[name]) === null || _this$_listeners$name === void 0 || _this$_listeners$name.push(fn);
    (_this$pswp2 = this.pswp) === null || _this$pswp2 === void 0 || _this$pswp2.on(name, fn);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  off(name, fn) {
    var _this$pswp3;
    if (this._listeners[name]) {
      this._listeners[name] = this._listeners[name].filter((listener) => fn !== listener);
    }
    (_this$pswp3 = this.pswp) === null || _this$pswp3 === void 0 || _this$pswp3.off(name, fn);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {PhotoSwipeEventsMap[T]} [details]
   * @returns {AugmentedEvent<T>}
   */
  dispatch(name, details) {
    var _this$_listeners$name2;
    if (this.pswp) {
      return this.pswp.dispatch(name, details);
    }
    const event = (
      /** @type {AugmentedEvent<T>} */
      new PhotoSwipeEvent(name, details)
    );
    (_this$_listeners$name2 = this._listeners[name]) === null || _this$_listeners$name2 === void 0 || _this$_listeners$name2.forEach((listener) => {
      listener.call(this, event);
    });
    return event;
  }
}
class Placeholder {
  /**
   * @param {string | false} imageSrc
   * @param {HTMLElement} container
   */
  constructor(imageSrc, container) {
    this.element = createElement("pswp__img pswp__img--placeholder", imageSrc ? "img" : "div", container);
    if (imageSrc) {
      const imgEl = (
        /** @type {HTMLImageElement} */
        this.element
      );
      imgEl.decoding = "async";
      imgEl.alt = "";
      imgEl.src = imageSrc;
      imgEl.setAttribute("role", "presentation");
    }
    this.element.setAttribute("aria-hidden", "true");
  }
  /**
   * @param {number} width
   * @param {number} height
   */
  setDisplayedSize(width, height) {
    if (!this.element) {
      return;
    }
    if (this.element.tagName === "IMG") {
      setWidthHeight(this.element, 250, "auto");
      this.element.style.transformOrigin = "0 0";
      this.element.style.transform = toTransformString(0, 0, width / 250);
    } else {
      setWidthHeight(this.element, width, height);
    }
  }
  destroy() {
    var _this$element;
    if ((_this$element = this.element) !== null && _this$element !== void 0 && _this$element.parentNode) {
      this.element.remove();
    }
    this.element = null;
  }
}
class Content {
  /**
   * @param {SlideData} itemData Slide data
   * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
   * @param {number} index
   */
  constructor(itemData, instance, index) {
    this.instance = instance;
    this.data = itemData;
    this.index = index;
    this.element = void 0;
    this.placeholder = void 0;
    this.slide = void 0;
    this.displayedImageWidth = 0;
    this.displayedImageHeight = 0;
    this.width = Number(this.data.w) || Number(this.data.width) || 0;
    this.height = Number(this.data.h) || Number(this.data.height) || 0;
    this.isAttached = false;
    this.hasSlide = false;
    this.isDecoding = false;
    this.state = LOAD_STATE.IDLE;
    if (this.data.type) {
      this.type = this.data.type;
    } else if (this.data.src) {
      this.type = "image";
    } else {
      this.type = "html";
    }
    this.instance.dispatch("contentInit", {
      content: this
    });
  }
  removePlaceholder() {
    if (this.placeholder && !this.keepPlaceholder()) {
      setTimeout(() => {
        if (this.placeholder) {
          this.placeholder.destroy();
          this.placeholder = void 0;
        }
      }, 1e3);
    }
  }
  /**
   * Preload content
   *
   * @param {boolean} isLazy
   * @param {boolean} [reload]
   */
  load(isLazy, reload) {
    if (this.slide && this.usePlaceholder()) {
      if (!this.placeholder) {
        const placeholderSrc = this.instance.applyFilters(
          "placeholderSrc",
          // use  image-based placeholder only for the first slide,
          // as rendering (even small stretched thumbnail) is an expensive operation
          this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : false,
          this
        );
        this.placeholder = new Placeholder(placeholderSrc, this.slide.container);
      } else {
        const placeholderEl = this.placeholder.element;
        if (placeholderEl && !placeholderEl.parentElement) {
          this.slide.container.prepend(placeholderEl);
        }
      }
    }
    if (this.element && !reload) {
      return;
    }
    if (this.instance.dispatch("contentLoad", {
      content: this,
      isLazy
    }).defaultPrevented) {
      return;
    }
    if (this.isImageContent()) {
      this.element = createElement("pswp__img", "img");
      if (this.displayedImageWidth) {
        this.loadImage(isLazy);
      }
    } else {
      this.element = createElement("pswp__content", "div");
      this.element.innerHTML = this.data.html || "";
    }
    if (reload && this.slide) {
      this.slide.updateContentSize(true);
    }
  }
  /**
   * Preload image
   *
   * @param {boolean} isLazy
   */
  loadImage(isLazy) {
    var _this$data$src, _this$data$alt;
    if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", {
      content: this,
      isLazy
    }).defaultPrevented) {
      return;
    }
    const imageElement = (
      /** @type HTMLImageElement */
      this.element
    );
    this.updateSrcsetSizes();
    if (this.data.srcset) {
      imageElement.srcset = this.data.srcset;
    }
    imageElement.src = (_this$data$src = this.data.src) !== null && _this$data$src !== void 0 ? _this$data$src : "";
    imageElement.alt = (_this$data$alt = this.data.alt) !== null && _this$data$alt !== void 0 ? _this$data$alt : "";
    this.state = LOAD_STATE.LOADING;
    if (imageElement.complete) {
      this.onLoaded();
    } else {
      imageElement.onload = () => {
        this.onLoaded();
      };
      imageElement.onerror = () => {
        this.onError();
      };
    }
  }
  /**
   * Assign slide to content
   *
   * @param {Slide} slide
   */
  setSlide(slide) {
    this.slide = slide;
    this.hasSlide = true;
    this.instance = slide.pswp;
  }
  /**
   * Content load success handler
   */
  onLoaded() {
    this.state = LOAD_STATE.LOADED;
    if (this.slide && this.element) {
      this.instance.dispatch("loadComplete", {
        slide: this.slide,
        content: this
      });
      if (this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode) {
        this.append();
        this.slide.updateContentSize(true);
      }
      if (this.state === LOAD_STATE.LOADED || this.state === LOAD_STATE.ERROR) {
        this.removePlaceholder();
      }
    }
  }
  /**
   * Content load error handler
   */
  onError() {
    this.state = LOAD_STATE.ERROR;
    if (this.slide) {
      this.displayError();
      this.instance.dispatch("loadComplete", {
        slide: this.slide,
        isError: true,
        content: this
      });
      this.instance.dispatch("loadError", {
        slide: this.slide,
        content: this
      });
    }
  }
  /**
   * @returns {Boolean} If the content is currently loading
   */
  isLoading() {
    return this.instance.applyFilters("isContentLoading", this.state === LOAD_STATE.LOADING, this);
  }
  /**
   * @returns {Boolean} If the content is in error state
   */
  isError() {
    return this.state === LOAD_STATE.ERROR;
  }
  /**
   * @returns {boolean} If the content is image
   */
  isImageContent() {
    return this.type === "image";
  }
  /**
   * Update content size
   *
   * @param {Number} width
   * @param {Number} height
   */
  setDisplayedSize(width, height) {
    if (!this.element) {
      return;
    }
    if (this.placeholder) {
      this.placeholder.setDisplayedSize(width, height);
    }
    if (this.instance.dispatch("contentResize", {
      content: this,
      width,
      height
    }).defaultPrevented) {
      return;
    }
    setWidthHeight(this.element, width, height);
    if (this.isImageContent() && !this.isError()) {
      const isInitialSizeUpdate = !this.displayedImageWidth && width;
      this.displayedImageWidth = width;
      this.displayedImageHeight = height;
      if (isInitialSizeUpdate) {
        this.loadImage(false);
      } else {
        this.updateSrcsetSizes();
      }
      if (this.slide) {
        this.instance.dispatch("imageSizeChange", {
          slide: this.slide,
          width,
          height,
          content: this
        });
      }
    }
  }
  /**
   * @returns {boolean} If the content can be zoomed
   */
  isZoomable() {
    return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== LOAD_STATE.ERROR, this);
  }
  /**
   * Update image srcset sizes attribute based on width and height
   */
  updateSrcsetSizes() {
    if (!this.isImageContent() || !this.element || !this.data.srcset) {
      return;
    }
    const image = (
      /** @type HTMLImageElement */
      this.element
    );
    const sizesWidth = this.instance.applyFilters("srcsetSizesWidth", this.displayedImageWidth, this);
    if (!image.dataset.largestUsedSize || sizesWidth > parseInt(image.dataset.largestUsedSize, 10)) {
      image.sizes = sizesWidth + "px";
      image.dataset.largestUsedSize = String(sizesWidth);
    }
  }
  /**
   * @returns {boolean} If content should use a placeholder (from msrc by default)
   */
  usePlaceholder() {
    return this.instance.applyFilters("useContentPlaceholder", this.isImageContent(), this);
  }
  /**
   * Preload content with lazy-loading param
   */
  lazyLoad() {
    if (this.instance.dispatch("contentLazyLoad", {
      content: this
    }).defaultPrevented) {
      return;
    }
    this.load(true);
  }
  /**
   * @returns {boolean} If placeholder should be kept after content is loaded
   */
  keepPlaceholder() {
    return this.instance.applyFilters("isKeepingPlaceholder", this.isLoading(), this);
  }
  /**
   * Destroy the content
   */
  destroy() {
    this.hasSlide = false;
    this.slide = void 0;
    if (this.instance.dispatch("contentDestroy", {
      content: this
    }).defaultPrevented) {
      return;
    }
    this.remove();
    if (this.placeholder) {
      this.placeholder.destroy();
      this.placeholder = void 0;
    }
    if (this.isImageContent() && this.element) {
      this.element.onload = null;
      this.element.onerror = null;
      this.element = void 0;
    }
  }
  /**
   * Display error message
   */
  displayError() {
    if (this.slide) {
      var _this$instance$option, _this$instance$option2;
      let errorMsgEl = createElement("pswp__error-msg", "div");
      errorMsgEl.innerText = (_this$instance$option = (_this$instance$option2 = this.instance.options) === null || _this$instance$option2 === void 0 ? void 0 : _this$instance$option2.errorMsg) !== null && _this$instance$option !== void 0 ? _this$instance$option : "";
      errorMsgEl = /** @type {HTMLDivElement} */
      this.instance.applyFilters("contentErrorElement", errorMsgEl, this);
      this.element = createElement("pswp__content pswp__error-msg-container", "div");
      this.element.appendChild(errorMsgEl);
      this.slide.container.innerText = "";
      this.slide.container.appendChild(this.element);
      this.slide.updateContentSize(true);
      this.removePlaceholder();
    }
  }
  /**
   * Append the content
   */
  append() {
    if (this.isAttached || !this.element) {
      return;
    }
    this.isAttached = true;
    if (this.state === LOAD_STATE.ERROR) {
      this.displayError();
      return;
    }
    if (this.instance.dispatch("contentAppend", {
      content: this
    }).defaultPrevented) {
      return;
    }
    const supportsDecode = "decode" in this.element;
    if (this.isImageContent()) {
      if (supportsDecode && this.slide && (!this.slide.isActive || isSafari())) {
        this.isDecoding = true;
        this.element.decode().catch(() => {
        }).finally(() => {
          this.isDecoding = false;
          this.appendImage();
        });
      } else {
        this.appendImage();
      }
    } else if (this.slide && !this.element.parentNode) {
      this.slide.container.appendChild(this.element);
    }
  }
  /**
   * Activate the slide,
   * active slide is generally the current one,
   * meaning the user can see it.
   */
  activate() {
    if (this.instance.dispatch("contentActivate", {
      content: this
    }).defaultPrevented || !this.slide) {
      return;
    }
    if (this.isImageContent() && this.isDecoding && !isSafari()) {
      this.appendImage();
    } else if (this.isError()) {
      this.load(false, true);
    }
    if (this.slide.holderElement) {
      this.slide.holderElement.setAttribute("aria-hidden", "false");
    }
  }
  /**
   * Deactivate the content
   */
  deactivate() {
    this.instance.dispatch("contentDeactivate", {
      content: this
    });
    if (this.slide && this.slide.holderElement) {
      this.slide.holderElement.setAttribute("aria-hidden", "true");
    }
  }
  /**
   * Remove the content from DOM
   */
  remove() {
    this.isAttached = false;
    if (this.instance.dispatch("contentRemove", {
      content: this
    }).defaultPrevented) {
      return;
    }
    if (this.element && this.element.parentNode) {
      this.element.remove();
    }
    if (this.placeholder && this.placeholder.element) {
      this.placeholder.element.remove();
    }
  }
  /**
   * Append the image content to slide container
   */
  appendImage() {
    if (!this.isAttached) {
      return;
    }
    if (this.instance.dispatch("contentAppendImage", {
      content: this
    }).defaultPrevented) {
      return;
    }
    if (this.slide && this.element && !this.element.parentNode) {
      this.slide.container.appendChild(this.element);
    }
    if (this.state === LOAD_STATE.LOADED || this.state === LOAD_STATE.ERROR) {
      this.removePlaceholder();
    }
  }
}
function getViewportSize(options, pswp) {
  if (options.getViewportSizeFn) {
    const newViewportSize = options.getViewportSizeFn(options, pswp);
    if (newViewportSize) {
      return newViewportSize;
    }
  }
  return {
    x: document.documentElement.clientWidth,
    // TODO: height on mobile is very incosistent due to toolbar
    // find a way to improve this
    //
    // document.documentElement.clientHeight - doesn't seem to work well
    y: window.innerHeight
  };
}
function parsePaddingOption(prop, options, viewportSize, itemData, index) {
  let paddingValue = 0;
  if (options.paddingFn) {
    paddingValue = options.paddingFn(viewportSize, itemData, index)[prop];
  } else if (options.padding) {
    paddingValue = options.padding[prop];
  } else {
    const legacyPropName = "padding" + prop[0].toUpperCase() + prop.slice(1);
    if (options[legacyPropName]) {
      paddingValue = options[legacyPropName];
    }
  }
  return Number(paddingValue) || 0;
}
function getPanAreaSize(options, viewportSize, itemData, index) {
  return {
    x: viewportSize.x - parsePaddingOption("left", options, viewportSize, itemData, index) - parsePaddingOption("right", options, viewportSize, itemData, index),
    y: viewportSize.y - parsePaddingOption("top", options, viewportSize, itemData, index) - parsePaddingOption("bottom", options, viewportSize, itemData, index)
  };
}
const MAX_IMAGE_WIDTH = 4e3;
class ZoomLevel {
  /**
   * @param {PhotoSwipeOptions} options PhotoSwipe options
   * @param {SlideData} itemData Slide data
   * @param {number} index Slide index
   * @param {PhotoSwipe} [pswp] PhotoSwipe instance, can be undefined if not initialized yet
   */
  constructor(options, itemData, index, pswp) {
    this.pswp = pswp;
    this.options = options;
    this.itemData = itemData;
    this.index = index;
    this.panAreaSize = null;
    this.elementSize = null;
    this.fit = 1;
    this.fill = 1;
    this.vFill = 1;
    this.initial = 1;
    this.secondary = 1;
    this.max = 1;
    this.min = 1;
  }
  /**
   * Calculate initial, secondary and maximum zoom level for the specified slide.
   *
   * It should be called when either image or viewport size changes.
   *
   * @param {number} maxWidth
   * @param {number} maxHeight
   * @param {Point} panAreaSize
   */
  update(maxWidth, maxHeight, panAreaSize) {
    const elementSize = {
      x: maxWidth,
      y: maxHeight
    };
    this.elementSize = elementSize;
    this.panAreaSize = panAreaSize;
    const hRatio = panAreaSize.x / elementSize.x;
    const vRatio = panAreaSize.y / elementSize.y;
    this.fit = Math.min(1, hRatio < vRatio ? hRatio : vRatio);
    this.fill = Math.min(1, hRatio > vRatio ? hRatio : vRatio);
    this.vFill = Math.min(1, vRatio);
    this.initial = this._getInitial();
    this.secondary = this._getSecondary();
    this.max = Math.max(this.initial, this.secondary, this._getMax());
    this.min = Math.min(this.fit, this.initial, this.secondary);
    if (this.pswp) {
      this.pswp.dispatch("zoomLevelsUpdate", {
        zoomLevels: this,
        slideData: this.itemData
      });
    }
  }
  /**
   * Parses user-defined zoom option.
   *
   * @private
   * @param {'initial' | 'secondary' | 'max'} optionPrefix Zoom level option prefix (initial, secondary, max)
   * @returns { number | undefined }
   */
  _parseZoomLevelOption(optionPrefix) {
    const optionName = (
      /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */
      optionPrefix + "ZoomLevel"
    );
    const optionValue = this.options[optionName];
    if (!optionValue) {
      return;
    }
    if (typeof optionValue === "function") {
      return optionValue(this);
    }
    if (optionValue === "fill") {
      return this.fill;
    }
    if (optionValue === "fit") {
      return this.fit;
    }
    return Number(optionValue);
  }
  /**
   * Get zoom level to which image will be zoomed after double-tap gesture,
   * or when user clicks on zoom icon,
   * or mouse-click on image itself.
   * If you return 1 image will be zoomed to its original size.
   *
   * @private
   * @return {number}
   */
  _getSecondary() {
    let currZoomLevel = this._parseZoomLevelOption("secondary");
    if (currZoomLevel) {
      return currZoomLevel;
    }
    currZoomLevel = Math.min(1, this.fit * 3);
    if (this.elementSize && currZoomLevel * this.elementSize.x > MAX_IMAGE_WIDTH) {
      currZoomLevel = MAX_IMAGE_WIDTH / this.elementSize.x;
    }
    return currZoomLevel;
  }
  /**
   * Get initial image zoom level.
   *
   * @private
   * @return {number}
   */
  _getInitial() {
    return this._parseZoomLevelOption("initial") || this.fit;
  }
  /**
   * Maximum zoom level when user zooms
   * via zoom/pinch gesture,
   * via cmd/ctrl-wheel or via trackpad.
   *
   * @private
   * @return {number}
   */
  _getMax() {
    return this._parseZoomLevelOption("max") || Math.max(1, this.fit * 4);
  }
}
function lazyLoadData(itemData, instance, index) {
  const content = instance.createContentFromData(itemData, index);
  let zoomLevel;
  const {
    options
  } = instance;
  if (options) {
    zoomLevel = new ZoomLevel(options, itemData, -1);
    let viewportSize;
    if (instance.pswp) {
      viewportSize = instance.pswp.viewportSize;
    } else {
      viewportSize = getViewportSize(options, instance);
    }
    const panAreaSize = getPanAreaSize(options, viewportSize, itemData, index);
    zoomLevel.update(content.width, content.height, panAreaSize);
  }
  content.lazyLoad();
  if (zoomLevel) {
    content.setDisplayedSize(Math.ceil(content.width * zoomLevel.initial), Math.ceil(content.height * zoomLevel.initial));
  }
  return content;
}
function lazyLoadSlide(index, instance) {
  const itemData = instance.getItemData(index);
  if (instance.dispatch("lazyLoadSlide", {
    index,
    itemData
  }).defaultPrevented) {
    return;
  }
  return lazyLoadData(itemData, instance, index);
}
class PhotoSwipeBase extends Eventable {
  /**
   * Get total number of slides
   *
   * @returns {number}
   */
  getNumItems() {
    var _this$options;
    let numItems = 0;
    const dataSource = (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.dataSource;
    if (dataSource && "length" in dataSource) {
      numItems = dataSource.length;
    } else if (dataSource && "gallery" in dataSource) {
      if (!dataSource.items) {
        dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
      }
      if (dataSource.items) {
        numItems = dataSource.items.length;
      }
    }
    const event = this.dispatch("numItems", {
      dataSource,
      numItems
    });
    return this.applyFilters("numItems", event.numItems, dataSource);
  }
  /**
   * @param {SlideData} slideData
   * @param {number} index
   * @returns {Content}
   */
  createContentFromData(slideData, index) {
    return new Content(slideData, this, index);
  }
  /**
   * Get item data by index.
   *
   * "item data" should contain normalized information that PhotoSwipe needs to generate a slide.
   * For example, it may contain properties like
   * `src`, `srcset`, `w`, `h`, which will be used to generate a slide with image.
   *
   * @param {number} index
   * @returns {SlideData}
   */
  getItemData(index) {
    var _this$options2;
    const dataSource = (_this$options2 = this.options) === null || _this$options2 === void 0 ? void 0 : _this$options2.dataSource;
    let dataSourceItem = {};
    if (Array.isArray(dataSource)) {
      dataSourceItem = dataSource[index];
    } else if (dataSource && "gallery" in dataSource) {
      if (!dataSource.items) {
        dataSource.items = this._getGalleryDOMElements(dataSource.gallery);
      }
      dataSourceItem = dataSource.items[index];
    }
    let itemData = dataSourceItem;
    if (itemData instanceof Element) {
      itemData = this._domElementToItemData(itemData);
    }
    const event = this.dispatch("itemData", {
      itemData: itemData || {},
      index
    });
    return this.applyFilters("itemData", event.itemData, index);
  }
  /**
   * Get array of gallery DOM elements,
   * based on childSelector and gallery element.
   *
   * @param {HTMLElement} galleryElement
   * @returns {HTMLElement[]}
   */
  _getGalleryDOMElements(galleryElement) {
    var _this$options3, _this$options4;
    if ((_this$options3 = this.options) !== null && _this$options3 !== void 0 && _this$options3.children || (_this$options4 = this.options) !== null && _this$options4 !== void 0 && _this$options4.childSelector) {
      return getElementsFromOption(this.options.children, this.options.childSelector, galleryElement) || [];
    }
    return [galleryElement];
  }
  /**
   * Converts DOM element to item data object.
   *
   * @param {HTMLElement} element DOM element
   * @returns {SlideData}
   */
  _domElementToItemData(element) {
    const itemData = {
      element
    };
    const linkEl = (
      /** @type {HTMLAnchorElement} */
      element.tagName === "A" ? element : element.querySelector("a")
    );
    if (linkEl) {
      itemData.src = linkEl.dataset.pswpSrc || linkEl.href;
      if (linkEl.dataset.pswpSrcset) {
        itemData.srcset = linkEl.dataset.pswpSrcset;
      }
      itemData.width = linkEl.dataset.pswpWidth ? parseInt(linkEl.dataset.pswpWidth, 10) : 0;
      itemData.height = linkEl.dataset.pswpHeight ? parseInt(linkEl.dataset.pswpHeight, 10) : 0;
      itemData.w = itemData.width;
      itemData.h = itemData.height;
      if (linkEl.dataset.pswpType) {
        itemData.type = linkEl.dataset.pswpType;
      }
      const thumbnailEl = element.querySelector("img");
      if (thumbnailEl) {
        var _thumbnailEl$getAttri;
        itemData.msrc = thumbnailEl.currentSrc || thumbnailEl.src;
        itemData.alt = (_thumbnailEl$getAttri = thumbnailEl.getAttribute("alt")) !== null && _thumbnailEl$getAttri !== void 0 ? _thumbnailEl$getAttri : "";
      }
      if (linkEl.dataset.pswpCropped || linkEl.dataset.cropped) {
        itemData.thumbCropped = true;
      }
    }
    return this.applyFilters("domItemData", itemData, element, linkEl);
  }
  /**
   * Lazy-load by slide data
   *
   * @param {SlideData} itemData Data about the slide
   * @param {number} index
   * @returns {Content} Image that is being decoded or false.
   */
  lazyLoadData(itemData, index) {
    return lazyLoadData(itemData, this, index);
  }
}
class PhotoSwipeLightbox extends PhotoSwipeBase {
  /**
   * @param {PhotoSwipeOptions} [options]
   */
  constructor(options) {
    super();
    this.options = options || {};
    this._uid = 0;
    this.shouldOpen = false;
    this._preloadedContent = void 0;
    this.onThumbnailsClick = this.onThumbnailsClick.bind(this);
  }
  /**
   * Initialize lightbox, should be called only once.
   * It's not included in the main constructor, so you may bind events before it.
   */
  init() {
    getElementsFromOption(this.options.gallery, this.options.gallerySelector).forEach((galleryElement) => {
      galleryElement.addEventListener("click", this.onThumbnailsClick, false);
    });
  }
  /**
   * @param {MouseEvent} e
   */
  onThumbnailsClick(e) {
    if (specialKeyUsed(e) || window.pswp) {
      return;
    }
    let initialPoint = {
      x: e.clientX,
      y: e.clientY
    };
    if (!initialPoint.x && !initialPoint.y) {
      initialPoint = null;
    }
    let clickedIndex = this.getClickedIndex(e);
    clickedIndex = this.applyFilters("clickedIndex", clickedIndex, e, this);
    const dataSource = {
      gallery: (
        /** @type {HTMLElement} */
        e.currentTarget
      )
    };
    if (clickedIndex >= 0) {
      e.preventDefault();
      this.loadAndOpen(clickedIndex, dataSource, initialPoint);
    }
  }
  /**
   * Get index of gallery item that was clicked.
   *
   * @param {MouseEvent} e click event
   * @returns {number}
   */
  getClickedIndex(e) {
    if (this.options.getClickedIndexFn) {
      return this.options.getClickedIndexFn.call(this, e);
    }
    const clickedTarget = (
      /** @type {HTMLElement} */
      e.target
    );
    const childElements = getElementsFromOption(
      this.options.children,
      this.options.childSelector,
      /** @type {HTMLElement} */
      e.currentTarget
    );
    const clickedChildIndex = childElements.findIndex((child) => child === clickedTarget || child.contains(clickedTarget));
    if (clickedChildIndex !== -1) {
      return clickedChildIndex;
    } else if (this.options.children || this.options.childSelector) {
      return -1;
    }
    return 0;
  }
  /**
   * Load and open PhotoSwipe
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   * @param {Point | null} [initialPoint]
   * @returns {boolean}
   */
  loadAndOpen(index, dataSource, initialPoint) {
    if (window.pswp || !this.options) {
      return false;
    }
    if (!dataSource && this.options.gallery && this.options.children) {
      const galleryElements = getElementsFromOption(this.options.gallery);
      if (galleryElements[0]) {
        dataSource = {
          gallery: galleryElements[0]
        };
      }
    }
    this.options.index = index;
    this.options.initialPointerPos = initialPoint;
    this.shouldOpen = true;
    this.preload(index, dataSource);
    return true;
  }
  /**
   * Load the main module and the slide content by index
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   */
  preload(index, dataSource) {
    const {
      options
    } = this;
    if (dataSource) {
      options.dataSource = dataSource;
    }
    const promiseArray = [];
    const pswpModuleType = typeof options.pswpModule;
    if (isPswpClass(options.pswpModule)) {
      promiseArray.push(Promise.resolve(
        /** @type {Type<PhotoSwipe>} */
        options.pswpModule
      ));
    } else if (pswpModuleType === "string") {
      throw new Error("pswpModule as string is no longer supported");
    } else if (pswpModuleType === "function") {
      promiseArray.push(
        /** @type {() => Promise<Type<PhotoSwipe>>} */
        options.pswpModule()
      );
    } else {
      throw new Error("pswpModule is not valid");
    }
    if (typeof options.openPromise === "function") {
      promiseArray.push(options.openPromise());
    }
    if (options.preloadFirstSlide !== false && index >= 0) {
      this._preloadedContent = lazyLoadSlide(index, this);
    }
    const uid = ++this._uid;
    Promise.all(promiseArray).then((iterableModules) => {
      if (this.shouldOpen) {
        const mainModule = iterableModules[0];
        this._openPhotoswipe(mainModule, uid);
      }
    });
  }
  /**
   * @private
   * @param {Type<PhotoSwipe> | { default: Type<PhotoSwipe> }} module
   * @param {number} uid
   */
  _openPhotoswipe(module, uid) {
    if (uid !== this._uid && this.shouldOpen) {
      return;
    }
    this.shouldOpen = false;
    if (window.pswp) {
      return;
    }
    const pswp = typeof module === "object" ? new module.default(this.options) : new module(this.options);
    this.pswp = pswp;
    window.pswp = pswp;
    Object.keys(this._listeners).forEach((name) => {
      var _this$_listeners$name;
      (_this$_listeners$name = this._listeners[name]) === null || _this$_listeners$name === void 0 || _this$_listeners$name.forEach((fn) => {
        pswp.on(
          name,
          /** @type {EventCallback<typeof name>} */
          fn
        );
      });
    });
    Object.keys(this._filters).forEach((name) => {
      var _this$_filters$name;
      (_this$_filters$name = this._filters[name]) === null || _this$_filters$name === void 0 || _this$_filters$name.forEach((filter) => {
        pswp.addFilter(name, filter.fn, filter.priority);
      });
    });
    if (this._preloadedContent) {
      pswp.contentLoader.addToCache(this._preloadedContent);
      this._preloadedContent = void 0;
    }
    pswp.on("destroy", () => {
      this.pswp = void 0;
      delete window.pswp;
    });
    pswp.init();
  }
  /**
   * Unbinds all events, closes PhotoSwipe if it's open.
   */
  destroy() {
    var _this$pswp;
    (_this$pswp = this.pswp) === null || _this$pswp === void 0 || _this$pswp.destroy();
    this.shouldOpen = false;
    this._listeners = {};
    getElementsFromOption(this.options.gallery, this.options.gallerySelector).forEach((galleryElement) => {
      galleryElement.removeEventListener("click", this.onThumbnailsClick, false);
    });
  }
}
function usePhotoSwipe() {
  const log = createLogger("PhotoSwipe");
  const lightbox = ref(null);
  const isInitialized = ref(false);
  const storedMuted = useSessionStorage("cloudpaste.lightbox.muted", true, { writeDefaults: false });
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const session = {
    items: (
      /** @type {Array<any>} */
      []
    ),
    imageStates: (
      /** @type {Map<string, any> | null} */
      null
    ),
    loadImageUrl: (
      /** @type {Function | null} */
      null
    ),
    abortController: (
      /** @type {AbortController | null} */
      null
    ),
    appendToEl: (
      /** @type {HTMLElement | null} */
      null
    ),
    resolveVideoSrc: (
      /** @type {((path: string) => Promise<string>) | null} */
      null
    ),
    handlers: (
      /** @type {any} */
      {
        onRequestClose: null,
        onToggleSidebar: null,
        onToggleMenu: null,
        onToggleFullscreen: null,
        onToggleSlideshow: null,
        onIndexChange: null,
        onClosed: null,
        getSlideshowActive: null,
        onMenuButtonInit: null
      }
    ),
    darkMode: false,
    muted: true,
    transforms: (
      /** @type {Map<string, { rotate: number; flipY: boolean }>} */
      /* @__PURE__ */ new Map()
    )
  };
  const mobileBreakpoint = 1024;
  const setAppendToEl = (el) => {
    session.appendToEl = el || null;
  };
  const setExternalHandlers = (handlers = {}) => {
    session.handlers = { ...session.handlers || {}, ...handlers || {} };
  };
  const setVideoResolver = (resolver) => {
    session.resolveVideoSrc = typeof resolver === "function" ? resolver : null;
  };
  const getPswp = () => {
    return lightbox.value?.pswp || null;
  };
  const getViewportSize2 = () => {
    const el = session.appendToEl;
    if (el && typeof el.clientWidth === "number" && typeof el.clientHeight === "number") {
      return { x: el.clientWidth, y: el.clientHeight };
    }
    return { x: windowWidth.value, y: windowHeight.value };
  };
  const getPadding = (viewport, data) => {
    let top = 0;
    let bottom = 0;
    let left = 0;
    let right = 0;
    if (!viewport || !data?.width || !data?.height) return { top, bottom, left, right };
    if (viewport.x <= mobileBreakpoint) return { top, bottom, left, right };
    if (!data?.src) return { top, bottom, left, right };
    if (data.width % viewport.x !== 0 && viewport.x > viewport.y) {
      left = 48;
      right = 48;
    }
    if (data.height % viewport.y === 0) {
      top = 48;
      bottom = 48;
      left = 48;
      right = 48;
    } else if (data.height > data.width) {
      top = 48;
      bottom = 48;
    } else {
      top = 72;
      bottom = 64;
    }
    return { top, bottom, left, right };
  };
  const initPhotoSwipe = () => {
    if (isInitialized.value) return;
    if (!session.appendToEl) return;
    try {
      lightbox.value = new PhotoSwipeLightbox({
        // 将 PhotoSwipe 渲染限制在外部壳组件的容器内（用于 sidebar/menu 等外围 UI）
        appendToEl: session.appendToEl,
        pswpModule: () => __vitePreload(() => import("./photoswipe.esm-BMquKub7.js"), true ? [] : void 0),
        // 缩放与平移交互
        zoom: true,
        mouseMovePan: true,
        allowPanToNext: false,
        pinchToClose: false,
        // 关闭动画，外部壳负责遮罩与过渡
        showHideAnimationType: "none",
        showAnimationDuration: 0,
        hideAnimationDuration: 0,
        // 交互：键盘/关闭行为交给外部壳统一处理
        arrowKeys: false,
        escKey: false,
        close: false,
        counter: false,
        closeOnVerticalDrag: false,
        closeOnScroll: false,
        // 缩放
        wheelToZoom: true,
        initialZoomLevel: "fit",
        // 并限制在 maxZoomLevel（当前为 8）以内。
        secondaryZoomLevel: (zoomLevels) => {
          const pan = zoomLevels?.panAreaSize;
          const el = zoomLevels?.elementSize;
          if (!pan || !el || !el.x || !el.y) return zoomLevels?.fill || 1;
          const fillScale = Math.max(pan.x / el.x, pan.y / el.y);
          const next = Number.isFinite(fillScale) ? Math.max(zoomLevels.fit || 1, fillScale) : zoomLevels?.fill || 1;
          return Math.min(8, next);
        },
        maxZoomLevel: 8,
        // 视口与留白计算（影响“看起来是否居中/是否过大”）
        getViewportSizeFn: () => getViewportSize2(),
        paddingFn: (viewportSize, itemData) => getPadding(viewportSize, itemData),
        // 背景：由外部壳提供（避免双层黑底）
        bgOpacity: 1,
        // 为 pswp 根节点添加主类名，便于统一样式覆盖
        mainClass: "p-lightbox__pswp",
        // 背景点击由外部壳统一关闭
        bgClickAction: () => session.handlers?.onRequestClose?.(),
        // 预加载：只加载相邻 slide
        preload: [1, 1]
      });
      setupPhotoSwipeFilters();
      setupPhotoSwipeEvents();
      lightbox.value.init();
      isInitialized.value = true;
    } catch (error) {
      log.error("[PhotoSwipe] 初始化失败:", error);
    }
  };
  const setupPhotoSwipeFilters = () => {
    if (!lightbox.value) return;
    lightbox.value.addFilter("numItems", () => {
      return Array.isArray(session.items) ? session.items.length : 0;
    });
    lightbox.value.addFilter("itemData", (itemData, i) => {
      const item = session.items[i] || itemData;
      const state = session.imageStates ? session.imageStates.get(item?.path) : null;
      const width = state?.naturalWidth || 1200;
      const height = state?.naturalHeight || 800;
      const src = state?.status === "loaded" ? state?.url || "" : "";
      return {
        src,
        width,
        height,
        alt: item?.name || "",
        title: item?.name || "",
        __cloudpasteItem: item
      };
    });
  };
  const setupPhotoSwipeEvents = () => {
    if (!lightbox.value) return;
    lightbox.value.on("close", () => {
      session.abortController?.abort();
      session.abortController = null;
      session.items = [];
      session.imageStates = null;
      session.loadImageUrl = null;
      session.darkMode = false;
      session.transforms.clear();
      session.handlers?.onClosed?.();
    });
    lightbox.value.on("contentDestroy", (e) => {
      const content = e?.content;
      const cleanup = content?.data?.__cloudpasteCleanup;
      if (typeof cleanup === "function") {
        try {
          cleanup();
        } catch {
        }
      }
    });
    lightbox.value.on("change", () => {
      const pswp = lightbox.value?.pswp;
      if (!pswp) return;
      session.handlers?.onIndexChange?.(pswp.currIndex);
      void prefetchAround(pswp.currIndex);
      applyTransformToSlide(pswp.currSlide);
    });
    lightbox.value.on("uiRegister", () => {
      registerCoreUI();
      registerCaptionUI();
    });
    lightbox.value.on("contentLoad", (e) => {
      const content = e?.content;
      const item = content?.data?.__cloudpasteItem;
      if (!content || !item) return;
      if (item?.__cloudpasteLivePhotoVideoPath) {
        void renderLivePhotoContent(e, item);
        return;
      }
    });
    lightbox.value.on("contentLoadImage", (e) => {
      const content = e?.content;
      const item = content?.data?.__cloudpasteItem;
      if (!content || !item) return;
      if (item?.__cloudpasteLivePhotoVideoPath) return;
      e.preventDefault();
      const img = (
        /** @type {HTMLImageElement | undefined} */
        content.element
      );
      if (!img) return;
      const signal = session.abortController?.signal;
      void (async () => {
        try {
          const src = await ensureImageSrc(item, { signal });
          if (signal?.aborted) return;
          img.decoding = "async";
          img.alt = item?.name || "";
          img.onload = () => {
            try {
              const w = img.naturalWidth || 0;
              const h = img.naturalHeight || 0;
              if (w && h) {
                content.data.width = w;
                content.data.height = h;
                content.width = w;
                content.height = h;
              }
              if (session.imageStates && item?.path) {
                const prev = session.imageStates.get(item.path) || null;
                session.imageStates.set(item.path, {
                  ...prev || { status: "loaded", url: src },
                  status: "loaded",
                  url: src,
                  naturalWidth: w || (prev?.naturalWidth || 0),
                  naturalHeight: h || (prev?.naturalHeight || 0),
                  aspectRatio: w && h ? w / h : prev?.aspectRatio
                });
              }
              const slide = content.slide;
              if (slide && w && h) {
                slide.width = w;
                slide.height = h;
                if (slide.data) {
                  slide.data.width = w;
                  slide.data.height = h;
                  slide.data.src = src;
                }
                content.data.src = src;
                slide.resize?.();
              } else {
                content.slide?.updateContentSize?.(true);
              }
            } catch {
            }
            content.onLoaded();
          };
          img.onerror = () => content.onError();
          img.src = src;
        } catch {
          content.onError();
        }
      })();
    });
  };
  const getTransformKey = (slide) => {
    const item = slide?.data?.__cloudpasteItem;
    return item?.path || slide?.data?.src || String(slide?.index ?? "");
  };
  const getTransformState = (key) => {
    return session.transforms.get(key) || { rotate: 0, flipY: false };
  };
  const setTransformState = (key, next) => {
    session.transforms.set(key, next);
  };
  const applyTransformToSlide = (slide) => {
    if (!slide) return;
    const item = slide?.data?.__cloudpasteItem;
    const key = getTransformKey(slide);
    const state = getTransformState(key);
    const rotate = (state.rotate % 360 + 360) % 360;
    const flip = !!state.flipY;
    const extraTransform = `${flip ? "scaleY(-1) " : ""}rotate(${rotate}deg)`.trim() || "none";
    const el = slide?.content?.element;
    if (item?.__cloudpasteLivePhotoVideoPath) {
      if (!(el instanceof HTMLElement)) return;
      el.style.setProperty("--cloudpaste-media-transform", extraTransform);
      return;
    }
    if (!(el instanceof HTMLImageElement)) return;
    el.style.transformOrigin = "center center";
    el.style.transform = extraTransform === "none" ? "" : extraTransform;
    el.style.transition = "transform 120ms ease-out";
  };
  const rotateCurrent = () => {
    const pswp = getPswp();
    const slide = pswp?.currSlide;
    if (!slide) return;
    const key = getTransformKey(slide);
    const prev = getTransformState(key);
    setTransformState(key, { ...prev, rotate: (prev.rotate + 90) % 360 });
    applyTransformToSlide(slide);
  };
  const toggleFlipVerticalCurrent = () => {
    const pswp = getPswp();
    const slide = pswp?.currSlide;
    if (!slide) return;
    const key = getTransformKey(slide);
    const prev = getTransformState(key);
    setTransformState(key, { ...prev, flipY: !prev.flipY });
    applyTransformToSlide(slide);
  };
  const registerCoreUI = () => {
    const pswp = lightbox.value?.pswp;
    if (!pswp) return;
    pswp.ui.registerElement({
      name: "close-button",
      className: "pswp__button pswp__button--close-button",
      title: "关闭",
      ariaLabel: "关闭",
      order: 1,
      isButton: true,
      html: {
        isCustomSVG: true,
        inner: '<path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" id="pswp__icn-close-button"/>',
        outlineID: "pswp__icn-close-button",
        size: 24
      },
      onClick: () => session.handlers?.onRequestClose?.()
    });
    if (windowWidth.value > mobileBreakpoint) {
      pswp.ui.registerElement({
        name: "sidebar-button",
        className: "pswp__button pswp__button--info-button pswp__button--mdi",
        title: "信息",
        ariaLabel: "信息",
        order: 9,
        isButton: true,
        html: {
          isCustomSVG: true,
          inner: '<path d="M11 7V9H13V7H11M14 17V15H13V11H10V13H11V15H10V17H14M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12M20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12Z" id="pswp__icn-info"/>',
          outlineID: "pswp__icn-info",
          size: 24
        },
        onClick: () => session.handlers?.onToggleSidebar?.()
      });
    }
    let soundButtonEl = null;
    const updateSoundButton = () => {
      const item = pswp?.currSlide?.data?.__cloudpasteItem;
      const isLive = !!item?.__cloudpasteLivePhotoVideoPath;
      if (soundButtonEl) {
        soundButtonEl.style.display = isLive ? "" : "none";
        soundButtonEl.classList.toggle("is-muted", !!session.muted);
        soundButtonEl.setAttribute("aria-label", session.muted ? "取消静音" : "静音");
        soundButtonEl.setAttribute("title", session.muted ? "取消静音" : "静音");
      }
    };
    const applyMutedToCurrentVideo = () => {
      const el = pswp?.currSlide?.content?.element;
      const video = el?.querySelector?.(".pswp__video");
      if (!(video instanceof HTMLVideoElement)) return;
      video.muted = !!session.muted;
      if (session.muted) {
        video.setAttribute("muted", "");
      } else {
        video.removeAttribute("muted");
      }
    };
    pswp.ui.registerElement({
      name: "sound-toggle",
      className: "pswp__button pswp__button--sound-toggle pswp__button--mdi",
      title: "静音",
      ariaLabel: "静音",
      order: 10,
      isButton: true,
      html: {
        isCustomSVG: true,
        inner: '<path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" class="pswp__icn-sound-on" id="pswp__icn-sound-on"/><path d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" class="pswp__icn-sound-off" id="pswp__icn-sound-off"/>',
        size: 24
      },
      onInit: (el) => {
        soundButtonEl = el;
        session.muted = !!storedMuted.value;
        pswp.on("change", () => {
          updateSoundButton();
          applyMutedToCurrentVideo();
        });
        updateSoundButton();
        applyTransformToSlide(pswp.currSlide);
      },
      onClick: () => {
        session.muted = !session.muted;
        storedMuted.value = session.muted;
        updateSoundButton();
        applyMutedToCurrentVideo();
      }
    });
    pswp.ui.registerElement({
      name: "rotate-button",
      className: "pswp__button pswp__button--rotate pswp__button--mdi",
      title: "旋转",
      ariaLabel: "旋转",
      order: 10,
      isButton: true,
      html: {
        isCustomSVG: true,
        inner: '<path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" id="pswp__icn-rotate"/>',
        outlineID: "pswp__icn-rotate",
        size: 24
      },
      onClick: () => rotateCurrent()
    });
    let flipButtonEl = null;
    const updateFlipButton = () => {
      if (!flipButtonEl) return;
      const slide = pswp?.currSlide;
      const key = getTransformKey(slide);
      const state = getTransformState(key);
      flipButtonEl.classList.toggle("is-active", !!state.flipY);
    };
    pswp.ui.registerElement({
      name: "flip-vertical-button",
      className: "pswp__button pswp__button--flip-vertical pswp__button--mdi",
      title: "上下翻转",
      ariaLabel: "上下翻转",
      order: 10,
      isButton: true,
      html: {
        isCustomSVG: true,
        inner: '<path d="M12 3l4 4h-3v10h-2V7H8l4-4zm0 18l-4-4h3V7h2v10h3l-4 4z" id="pswp__icn-flip-vertical"/>',
        outlineID: "pswp__icn-flip-vertical",
        size: 24
      },
      onInit: (el) => {
        flipButtonEl = el;
        pswp.on("change", updateFlipButton);
        updateFlipButton();
      },
      onClick: () => {
        toggleFlipVerticalCurrent();
        updateFlipButton();
      }
    });
    pswp.ui.registerElement({
      name: "menu-button",
      className: "pswp__button pswp__button--menu-button pswp__button--mdi",
      title: "更多",
      ariaLabel: "更多",
      order: 10,
      isButton: true,
      html: {
        isCustomSVG: true,
        inner: '<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" id="pswp__icn-menu-button" />',
        outlineID: "pswp__icn-menu-button",
        size: 16
      },
      onInit: (el) => session.handlers?.onMenuButtonInit?.(el),
      onClick: () => session.handlers?.onToggleMenu?.()
    });
    pswp.ui.registerElement({
      name: "fullscreen-toggle",
      className: "pswp__button pswp__button--fullscreen-toggle pswp__button--mdi",
      title: "全屏",
      ariaLabel: "全屏",
      order: 10,
      isButton: true,
      html: {
        isCustomSVG: true,
        inner: '<path d="M7 14H5v5h5v-2H7v-3zm0-4h2V7h3V5H5v5zm10 7h-3v2h5v-5h-2v3zm0-12V7h-3v2h5V5h-2z" id="pswp__icn-fullscreen"/>',
        outlineID: "pswp__icn-fullscreen",
        size: 24
      },
      onClick: () => session.handlers?.onToggleFullscreen?.()
    });
    let slideshowButtonEl = null;
    pswp.ui.registerElement({
      name: "slideshow-toggle",
      className: "pswp__button pswp__button--slideshow-toggle pswp__button--mdi",
      title: "幻灯片",
      ariaLabel: "幻灯片",
      order: 10,
      isButton: true,
      html: {
        isCustomSVG: true,
        inner: '<path d="M14 19h4V5h-4v14zM6 19h4V5H6v14z" id="pswp__icn-slideshow-on" class="pswp__icn-slideshow-on" /><path d="M8 5.14v14l11-7-11-7z" id="pswp__icn-slideshow-off" class="pswp__icn-slideshow-off" />',
        size: 24
      },
      onInit: (el) => {
        slideshowButtonEl = el;
        const update = () => {
          const active = session.handlers?.getSlideshowActive?.();
          el.classList.toggle("is-active", !!active);
        };
        pswp.on("change", update);
        update();
      },
      onClick: () => {
        session.handlers?.onToggleSlideshow?.();
        queueMicrotask(() => {
          const active = session.handlers?.getSlideshowActive?.();
          slideshowButtonEl?.classList.toggle("is-active", !!active);
        });
      }
    });
  };
  const registerCaptionUI = () => {
    const pswp = lightbox.value?.pswp;
    if (!pswp) return;
    pswp.ui.registerElement({
      name: "cloudpaste-caption",
      className: "pswp__cloudpaste-caption",
      appendTo: "root",
      order: 9,
      isButton: false,
      html: "",
      onInit: (el, pswp2) => {
        let isPointerDown = false;
        let revealTimer = null;
        const clearRevealTimer = () => {
          if (!revealTimer) return;
          clearTimeout(revealTimer);
          revealTimer = null;
        };
        const isZoomedIn = () => {
          const slide = pswp2?.currSlide;
          const fit = slide?.zoomLevels?.fit;
          const current = slide?.currZoomLevel;
          if (!fit || !current) return false;
          return current > fit + 0.01;
        };
        const setFaded = (faded) => {
          el.classList.toggle("is-faded", !!faded);
        };
        const update = () => {
          const item = pswp2?.currSlide?.data?.__cloudpasteItem;
          const name = item?.name || "";
          el.textContent = name;
          if (name) el.setAttribute("title", name);
        };
        const updateVisibility = () => {
          setFaded(isPointerDown || isZoomedIn());
        };
        const scheduleReveal = () => {
          clearRevealTimer();
          revealTimer = setTimeout(() => {
            if (!isPointerDown && !isZoomedIn()) setFaded(false);
          }, 120);
        };
        pswp2.on("change", () => {
          update();
          updateVisibility();
        });
        pswp2.on("zoomPanUpdate", () => {
          if (isZoomedIn()) {
            clearRevealTimer();
            setFaded(true);
          } else if (!isPointerDown) {
            scheduleReveal();
          }
        });
        pswp2.on("pointerDown", () => {
          isPointerDown = true;
          clearRevealTimer();
          setFaded(true);
        });
        pswp2.on("pointerUp", () => {
          isPointerDown = false;
          if (!isZoomedIn()) scheduleReveal();
        });
        pswp2.on("destroy", () => {
          clearRevealTimer();
        });
        update();
        updateVisibility();
      }
    });
  };
  const renderLivePhotoContent = async (e, item) => {
    const content = e?.content;
    if (!content || !item) return;
    e.preventDefault();
    const videoPath = item.__cloudpasteLivePhotoVideoPath;
    const ctrl = new AbortController();
    const root = document.createElement("div");
    root.className = "pswp__media pswp__media--live live-photo-viewer--dark";
    const img = document.createElement("img");
    img.className = "pswp__image";
    img.decoding = "async";
    img.alt = item?.name || "";
    const video = document.createElement("video");
    video.className = "pswp__video";
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.muted = !!session.muted;
    if (session.muted) {
      video.setAttribute("muted", "");
    }
    video.preload = "metadata";
    const badge = document.createElement("button");
    badge.type = "button";
    badge.className = "live-photo-viewer__badge";
    badge.setAttribute("aria-label", "播放实况（按住播放 / 点击切换）");
    badge.setAttribute("title", "播放实况（按住播放 / 点击切换）");
    badge.innerHTML = `
      ${LIVE_PHOTO_BADGE_ICON_SVG}
      <span class="live-photo-viewer__badge-text">LIVE</span>
    `;
    const control = document.createElement("button");
    control.type = "button";
    control.className = "pswp__live-toggle";
    control.setAttribute("aria-label", "播放实况");
    control.setAttribute("title", "播放 / 暂停");
    control.innerHTML = `
      <span class="pswp__live-toggle-icon pswp__live-toggle-icon--play" aria-hidden="true">▶</span>
      <span class="pswp__live-toggle-icon pswp__live-toggle-icon--pause" aria-hidden="true">❚❚</span>
    `;
    root.appendChild(img);
    root.appendChild(video);
    root.appendChild(badge);
    root.appendChild(control);
    content.element = root;
    const signal = session.abortController?.signal;
    const state = {
      playing: false,
      loading: false,
      holdActive: false,
      holdTimer: (
        /** @type {ReturnType<typeof setTimeout> | null} */
        null
      ),
      videoUrl: ""
    };
    const cleanup = () => {
      try {
        ctrl.abort();
      } catch {
      }
      try {
        video.pause();
      } catch {
      }
      try {
        video.removeAttribute("src");
        video.load?.();
      } catch {
      }
    };
    content.data.__cloudpasteCleanup = cleanup;
    try {
      const src = await ensureImageSrc(item, { signal });
      if (signal?.aborted) return;
      img.src = src;
    } catch {
    }
    const clearHoldTimer = () => {
      if (!state.holdTimer) return;
      clearTimeout(state.holdTimer);
      state.holdTimer = null;
    };
    const setPlaying = (v) => {
      state.playing = !!v;
      root.classList.toggle("live-photo-viewer--playing", state.playing);
      badge.setAttribute("aria-label", state.playing ? "暂停实况" : "播放实况（按住播放 / 点击切换）");
      control.classList.toggle("is-playing", state.playing);
      control.setAttribute("aria-label", state.playing ? "暂停实况" : "播放实况");
    };
    const setLoading = (v) => {
      state.loading = !!v;
      root.classList.toggle("live-photo-viewer--loading", state.loading);
      badge.disabled = state.loading;
      control.disabled = state.loading;
    };
    const ensureVideoUrl = async () => {
      if (state.videoUrl) return state.videoUrl;
      if (!videoPath || !session.resolveVideoSrc) return "";
      const url = await session.resolveVideoSrc(videoPath);
      state.videoUrl = url || "";
      return state.videoUrl;
    };
    const play = async () => {
      if (signal?.aborted) return;
      if (state.playing) return;
      try {
        setLoading(true);
        const url = await ensureVideoUrl();
        if (!url) return;
        if (!video.src) {
          video.src = url;
        }
        await video.play();
        setPlaying(true);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    const pause = () => {
      clearHoldTimer();
      state.holdActive = false;
      try {
        video.pause();
      } catch {
      }
      setPlaying(false);
    };
    const toggle = () => {
      if (state.playing) {
        pause();
      } else {
        void play();
      }
    };
    root.addEventListener(
      "pointerdown",
      (ev) => {
        if (ev?.target?.closest?.(".live-photo-viewer__badge, .pswp__live-toggle")) return;
        if (state.playing) return;
        if (ev.pointerType === "mouse" && ev.button !== 0) return;
        try {
          root.setPointerCapture?.(ev.pointerId);
        } catch {
        }
        if (!session.muted) {
          state.holdActive = true;
          void play();
          return;
        }
        clearHoldTimer();
        state.holdTimer = setTimeout(() => {
          state.holdActive = true;
          void play();
        }, 160);
      },
      { signal: ctrl.signal }
    );
    root.addEventListener(
      "pointerup",
      (ev) => {
        clearHoldTimer();
        if (state.holdActive) {
          pause();
        }
        try {
          root.releasePointerCapture?.(ev.pointerId);
        } catch {
        }
      },
      { signal: ctrl.signal }
    );
    root.addEventListener(
      "pointercancel",
      () => {
        clearHoldTimer();
        if (state.holdActive) pause();
      },
      { signal: ctrl.signal }
    );
    badge.addEventListener(
      "click",
      (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        toggle();
      },
      { signal: ctrl.signal }
    );
    control.addEventListener(
      "click",
      (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        toggle();
      },
      { signal: ctrl.signal }
    );
    video.addEventListener(
      "ended",
      () => {
        setPlaying(false);
      },
      { signal: ctrl.signal }
    );
    content.onLoaded();
  };
  const ensureImageSrc = async (item, options = {}) => {
    const signal = options.signal;
    if (signal?.aborted) throw new Error("aborted");
    const state = session.imageStates ? session.imageStates.get(item?.path) : null;
    if (state?.status === "loaded" && state?.url) return state.url;
    if (typeof session.loadImageUrl === "function") {
      await session.loadImageUrl(item, { priority: options.priority || "high", signal });
    }
    const nextState = session.imageStates ? session.imageStates.get(item?.path) : null;
    if (nextState?.status === "loaded" && nextState?.url) return nextState.url;
    throw new Error("image src unavailable");
  };
  const prefetchAround = async (idx) => {
    const signal = session.abortController?.signal;
    if (!Array.isArray(session.items) || session.items.length === 0) return;
    if (signal?.aborted) return;
    const candidates = [idx - 2, idx - 1, idx + 1, idx + 2];
    for (const i of candidates) {
      if (i < 0 || i >= session.items.length) continue;
      const item = session.items[i];
      if (!item) continue;
      void ensureImageSrc(item, { signal, priority: "normal" }).catch(() => {
      });
    }
  };
  const openPhotoSwipe = async (items, startIndex = 0, imageStatesArg = null, loadImageUrlArg = null, options = {}) => {
    if (!Array.isArray(items) || items.length === 0) return;
    if (!isInitialized.value) {
      initPhotoSwipe();
      await nextTick();
    }
    if (!lightbox.value) return;
    session.items = items;
    session.imageStates = imageStatesArg;
    session.loadImageUrl = typeof loadImageUrlArg === "function" ? loadImageUrlArg : null;
    session.darkMode = !!options.darkMode;
    session.abortController?.abort();
    session.abortController = new AbortController();
    const validStartIndex = Math.max(0, Math.min(startIndex, items.length - 1));
    const first = items[validStartIndex];
    if (first) {
      try {
        await ensureImageSrc(first, { signal: session.abortController.signal, priority: "high" });
      } catch {
      }
    }
    lightbox.value.loadAndOpen(validStartIndex, items);
    void prefetchAround(validStartIndex);
  };
  const closePhotoSwipe = () => {
    try {
      lightbox.value?.pswp?.close?.();
    } catch {
    }
  };
  const destroyPhotoSwipe = () => {
    try {
      lightbox.value?.destroy?.();
    } catch {
    }
    lightbox.value = null;
    isInitialized.value = false;
  };
  return {
    isInitialized,
    initPhotoSwipe,
    openPhotoSwipe,
    closePhotoSwipe,
    destroyPhotoSwipe,
    setAppendToEl,
    setExternalHandlers,
    setVideoResolver,
    getPswp,
    rotateCurrent,
    toggleFlipVerticalCurrent
  };
}
const _hoisted_1$2 = { class: "p-lightbox__sidebar is-dark" };
const _hoisted_2$1 = { class: "p-sidebar__toolbar" };
const _hoisted_3$1 = { class: "p-sidebar__content" };
const _hoisted_4$1 = {
  key: 0,
  class: "p-sidebar__empty"
};
const _hoisted_5 = {
  key: 1,
  class: "metadata__list"
};
const _hoisted_6 = { class: "metadata__item" };
const _hoisted_7 = ["title"];
const _hoisted_8 = ["title"];
const _hoisted_9 = { class: "metadata__row" };
const _hoisted_10 = { class: "metadata__row-body" };
const _hoisted_11 = {
  class: "meta-value",
  title: "修改时间"
};
const _hoisted_12 = { class: "metadata__row" };
const _hoisted_13 = { class: "metadata__row-body" };
const _hoisted_14 = {
  class: "meta-value",
  title: "类型"
};
const _hoisted_15 = { class: "metadata__row" };
const _hoisted_16 = { class: "metadata__row-body" };
const _hoisted_17 = {
  class: "meta-value",
  title: "大小"
};
const _hoisted_18 = { class: "metadata__row" };
const _hoisted_19 = { class: "metadata__row-body" };
const _hoisted_20 = {
  class: "meta-value",
  title: "尺寸"
};
const _hoisted_21 = {
  key: 0,
  class: "p-sidebar__hint"
};
const _hoisted_22 = {
  key: 0,
  class: "p-sidebar__hint"
};
const _hoisted_23 = {
  key: 1,
  class: "p-sidebar__hint"
};
const _hoisted_24 = {
  key: 2,
  class: "p-sidebar__hint"
};
const _hoisted_25 = {
  key: 3,
  class: "p-sidebar__hint"
};
const _hoisted_26 = { key: 4 };
const _hoisted_27 = { class: "metadata__row-body" };
const _hoisted_28 = ["title"];
const _hoisted_29 = {
  key: 5,
  class: "metadata__map-container"
};
const _hoisted_30 = { class: "metadata__map-actions" };
const _hoisted_31 = ["href"];
const _hoisted_32 = ["href"];
const _hoisted_33 = {
  key: 6,
  class: "metadata__map-fallback"
};
const _hoisted_34 = { class: "metadata__map-actions" };
const _hoisted_35 = ["href"];
const _hoisted_36 = ["href"];
const _sfc_main$2 = {
  __name: "FsMediaLightboxSidebar",
  props: {
    item: { type: Object, default: null },
    imageStates: { type: Object, default: null },
    // Map
    loadImageUrl: { type: Function, default: null }
  },
  emits: ["close"],
  setup(__props) {
    const fsService = useFsService();
    const props = __props;
    const displayName = computed(() => {
      return props.item?.name || props.item?.path || "未命名";
    });
    const formattedSize = computed(() => {
      const bytes = props.item?.size;
      return typeof bytes === "number" ? formatFileSize(bytes) : "-";
    });
    const formattedModified = computed(() => {
      const ts = props.item?.modified || props.item?.updatedAt || props.item?.updated_at || "";
      if (!ts) return "未知";
      return formatDateTime(ts);
    });
    const dimensions = computed(() => {
      const path = props.item?.path || "";
      if (!path || !props.imageStates || typeof props.imageStates.get !== "function") return null;
      const state = props.imageStates.get(path);
      if (!state) return null;
      const w = state.naturalWidth || 0;
      const h = state.naturalHeight || 0;
      if (!w || !h) return null;
      return { w, h };
    });
    const formattedDimensions = computed(() => {
      const d = dimensions.value;
      if (!d) return "未知";
      return `${d.w} × ${d.h}`;
    });
    const formattedType = computed(() => {
      const mimetype = String(props.item?.mimetype || "").trim();
      if (mimetype) return mimetype;
      const filename = getFileName(props.item?.path || props.item?.name || "");
      if (!filename) return "unknown";
      return getMimeTypeDescription({ name: filename, isDirectory: !!props.item?.isDirectory });
    });
    const isLivePhoto = computed(() => {
      return !!props.item?.__cloudpasteLivePhotoVideoPath;
    });
    const showExifSection = computed(() => {
      return isImageLikeForExif(props.item);
    });
    const exifLoading = ref(false);
    const exifError = ref(false);
    const exifRows = ref([]);
    const exifTagCount = ref(0);
    const gpsCoords = ref(null);
    const mapLoadError = ref(false);
    const clampNumber = (n, min, max) => {
      const num = Number(n);
      if (!Number.isFinite(num)) return 0;
      return Math.min(max, Math.max(min, num));
    };
    const googleMapsUrl = computed(() => {
      if (!gpsCoords.value) return "";
      const lat = clampNumber(gpsCoords.value.lat, -90, 90);
      const lng = clampNumber(gpsCoords.value.lng, -180, 180);
      const url = new URL("https://www.google.com/maps");
      url.searchParams.set("q", `${lat},${lng}`);
      return url.toString();
    });
    const amapUrl = computed(() => {
      if (!gpsCoords.value) return "";
      const lat = clampNumber(gpsCoords.value.lat, -90, 90);
      const lng = clampNumber(gpsCoords.value.lng, -180, 180);
      const url = new URL("https://uri.amap.com/marker");
      url.searchParams.set("position", `${lng},${lat}`);
      url.searchParams.set("name", "照片位置");
      return url.toString();
    });
    const handleMapError = () => {
      mapLoadError.value = true;
    };
    const handleMapLoad = () => {
      mapLoadError.value = false;
    };
    let exifAbortController = null;
    const abortExif = () => {
      if (exifAbortController) {
        try {
          exifAbortController.abort();
        } catch {
        }
      }
      exifAbortController = null;
    };
    const ensureImageUrl = async (item, signal) => {
      const path = item?.path || "";
      if (!path) return "";
      const states = props.imageStates;
      const getState = () => states && typeof states.get === "function" ? states.get(path) : null;
      const state = getState();
      if (state?.status === "loaded" && state?.url) return state.url;
      if (typeof props.loadImageUrl === "function") {
        await props.loadImageUrl(item, { priority: "high", signal });
      }
      const nextState = getState();
      if (nextState?.status === "loaded" && nextState?.url) return nextState.url;
      return "";
    };
    const parseExif = async () => {
      abortExif();
      exifLoading.value = false;
      exifError.value = false;
      exifRows.value = [];
      exifTagCount.value = 0;
      gpsCoords.value = null;
      mapLoadError.value = false;
      const item = props.item;
      if (!item || !showExifSection.value) return;
      const controller = new AbortController();
      exifAbortController = controller;
      exifLoading.value = true;
      try {
        let candidateUrl = await ensureImageUrl(item, controller.signal);
        if (candidateUrl?.startsWith?.("blob:") || candidateUrl?.startsWith?.("data:")) {
          candidateUrl = "";
        }
        const tryLoadFromUrl = async (url) => {
          if (!url) return { rows: [], tagCount: 0, tags: null };
          const res = await fetch(url, { signal: controller.signal });
          if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
          const ct = String(res.headers.get("content-type") || "").toLowerCase();
          if (ct && ct.includes("text/html")) throw new Error("unexpected content-type: text/html");
          const buf = await res.arrayBuffer();
          const tags = await loadExifTagsFromArrayBufferAsync(buf);
          const tagCount = Object.keys(tags || {}).length;
          const rows = buildExifRows(tags);
          return { rows, tagCount, tags };
        };
        const first = await tryLoadFromUrl(candidateUrl);
        exifTagCount.value = first.tagCount;
        exifRows.value = first.rows;
        if (first.tags) {
          gpsCoords.value = resolveGpsCoordinates(first.tags);
        }
        const shouldTryRaw = exifRows.value.length === 0 || exifTagCount.value > 0 && !gpsCoords.value;
        if (shouldTryRaw) {
          let rawUrl = "";
          try {
            rawUrl = await fsService.getFileLink(item.path, null, false);
          } catch {
            rawUrl = "";
          }
          if (rawUrl && rawUrl !== candidateUrl) {
            const second = await tryLoadFromUrl(rawUrl);
            exifTagCount.value = second.tagCount;
            exifRows.value = second.rows;
            if (second.tags) {
              gpsCoords.value = resolveGpsCoordinates(second.tags);
            }
          }
        }
      } catch (e) {
        if (e?.name !== "AbortError") {
          exifError.value = true;
        }
      } finally {
        if (exifAbortController === controller) {
          exifAbortController = null;
        }
        exifLoading.value = false;
      }
    };
    watch(
      () => props.item?.path,
      () => {
        void parseExif();
      },
      { immediate: true }
    );
    onBeforeUnmount(() => {
      abortExif();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("button", {
            class: "p-sidebar__close",
            type: "button",
            "aria-label": "关闭侧栏",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
          }, [
            createVNode(unref(IconMdiChevronLeft), {
              size: "sm",
              class: "p-sidebar__close-icon",
              "aria-hidden": "true"
            })
          ]),
          _cache[1] || (_cache[1] = createBaseVNode("div", { class: "p-sidebar__title" }, "信息", -1))
        ]),
        createBaseVNode("div", _hoisted_3$1, [
          !__props.item ? (openBlock(), createElementBlock("div", _hoisted_4$1, "未选择文件")) : (openBlock(), createElementBlock("div", _hoisted_5, [
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("div", {
                class: "meta-title",
                title: displayName.value
              }, toDisplayString(displayName.value), 9, _hoisted_7),
              createBaseVNode("div", {
                class: "meta-caption",
                title: __props.item.path
              }, toDisplayString(__props.item.path), 9, _hoisted_8)
            ]),
            _cache[5] || (_cache[5] = createBaseVNode("div", { class: "metadata__divider" }, null, -1)),
            createBaseVNode("div", _hoisted_9, [
              createVNode(unref(IconMdiClockOutline), {
                size: "sm",
                class: "metadata__row-icon",
                "aria-hidden": "true"
              }),
              createBaseVNode("div", _hoisted_10, [
                createBaseVNode("div", _hoisted_11, toDisplayString(formattedModified.value), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_12, [
              createVNode(unref(IconMdiFileOutline), {
                size: "sm",
                class: "metadata__row-icon",
                "aria-hidden": "true"
              }),
              createBaseVNode("div", _hoisted_13, [
                createBaseVNode("div", _hoisted_14, toDisplayString(formattedType.value), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_15, [
              createVNode(unref(IconMdiDatabaseOutline), {
                size: "sm",
                class: "metadata__row-icon",
                "aria-hidden": "true"
              }),
              createBaseVNode("div", _hoisted_16, [
                createBaseVNode("div", _hoisted_17, toDisplayString(formattedSize.value), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_18, [
              createVNode(unref(IconMdiAspectRatio), {
                size: "sm",
                class: "metadata__row-icon",
                "aria-hidden": "true"
              }),
              createBaseVNode("div", _hoisted_19, [
                createBaseVNode("div", _hoisted_20, toDisplayString(formattedDimensions.value), 1)
              ])
            ]),
            isLivePhoto.value ? (openBlock(), createElementBlock("div", _hoisted_21, "Live Photo：包含视频片段")) : createCommentVNode("", true),
            showExifSection.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              _cache[3] || (_cache[3] = createBaseVNode("div", { class: "metadata__divider" }, null, -1)),
              _cache[4] || (_cache[4] = createBaseVNode("div", { class: "metadata__section-title" }, "EXIF", -1)),
              exifLoading.value ? (openBlock(), createElementBlock("div", _hoisted_22, "正在解析 EXIF…")) : exifError.value ? (openBlock(), createElementBlock("div", _hoisted_23, "EXIF 解析失败")) : exifRows.value.length === 0 && exifTagCount.value === 0 ? (openBlock(), createElementBlock("div", _hoisted_24, "无可用 EXIF")) : exifRows.value.length === 0 && exifTagCount.value > 0 ? (openBlock(), createElementBlock("div", _hoisted_25, " 已解析到 " + toDisplayString(exifTagCount.value) + " 个元数据标签，但未匹配到当前展示字段 ", 1)) : (openBlock(), createElementBlock("div", _hoisted_26, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(exifRows.value, (row) => {
                  return openBlock(), createElementBlock("div", {
                    key: row.key,
                    class: "metadata__row"
                  }, [
                    row.key === "dateTimeOriginal" ? (openBlock(), createBlock(unref(IconMdiCalendar), {
                      key: 0,
                      size: "sm",
                      class: "metadata__row-icon",
                      "aria-hidden": "true"
                    })) : row.key === "location" ? (openBlock(), createBlock(unref(IconMdiMapMarkerOutline), {
                      key: 1,
                      size: "sm",
                      class: "metadata__row-icon",
                      "aria-hidden": "true"
                    })) : row.key === "camera" ? (openBlock(), createBlock(unref(IconMdiCamera), {
                      key: 2,
                      size: "sm",
                      class: "metadata__row-icon",
                      "aria-hidden": "true"
                    })) : row.key === "lensModel" ? (openBlock(), createBlock(unref(IconMdiFocusAuto), {
                      key: 3,
                      size: "sm",
                      class: "metadata__row-icon",
                      "aria-hidden": "true"
                    })) : row.key === "focalLength" ? (openBlock(), createBlock(unref(IconMdiRuler), {
                      key: 4,
                      size: "sm",
                      class: "metadata__row-icon",
                      "aria-hidden": "true"
                    })) : row.key === "aperture" ? (openBlock(), createBlock(unref(IconMdiCameraIris), {
                      key: 5,
                      size: "sm",
                      class: "metadata__row-icon",
                      "aria-hidden": "true"
                    })) : row.key === "shutter" ? (openBlock(), createBlock(unref(IconMdiTimerOutline), {
                      key: 6,
                      size: "sm",
                      class: "metadata__row-icon",
                      "aria-hidden": "true"
                    })) : row.key === "iso" ? (openBlock(), createBlock(unref(IconMdiAlphaICircleOutline), {
                      key: 7,
                      size: "sm",
                      class: "metadata__row-icon",
                      "aria-hidden": "true"
                    })) : (openBlock(), createBlock(unref(IconMdiInformationOutline), {
                      key: 8,
                      size: "sm",
                      class: "metadata__row-icon",
                      "aria-hidden": "true"
                    })),
                    createBaseVNode("div", _hoisted_27, [
                      createBaseVNode("div", {
                        class: "meta-value",
                        title: row.label
                      }, toDisplayString(row.value), 9, _hoisted_28)
                    ])
                  ]);
                }), 128))
              ])),
              gpsCoords.value && !mapLoadError.value ? (openBlock(), createElementBlock("div", _hoisted_29, [
                createVNode(MapEmbed, {
                  class: "metadata__map-iframe",
                  lat: gpsCoords.value.lat,
                  lng: gpsCoords.value.lng,
                  interactive: true,
                  "show-zoom-controls": true,
                  onLoad: handleMapLoad,
                  onError: handleMapError
                }, null, 8, ["lat", "lng"]),
                createBaseVNode("div", _hoisted_30, [
                  createBaseVNode("a", {
                    href: googleMapsUrl.value,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    class: "metadata__map-link",
                    title: "在 Google Maps 中打开"
                  }, [
                    createVNode(unref(IconMdiGoogleMaps), {
                      size: "sm",
                      class: "metadata__map-link-icon",
                      "aria-hidden": "true"
                    })
                  ], 8, _hoisted_31),
                  createBaseVNode("a", {
                    href: amapUrl.value,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    class: "metadata__map-link",
                    title: "在高德地图中打开"
                  }, [
                    createVNode(unref(IconMdiMapMarker), {
                      size: "sm",
                      class: "metadata__map-link-icon",
                      "aria-hidden": "true"
                    })
                  ], 8, _hoisted_32)
                ])
              ])) : gpsCoords.value && mapLoadError.value ? (openBlock(), createElementBlock("div", _hoisted_33, [
                _cache[2] || (_cache[2] = createBaseVNode("div", { class: "metadata__map-fallback-text" }, "地图加载失败", -1)),
                createBaseVNode("div", _hoisted_34, [
                  createBaseVNode("a", {
                    href: googleMapsUrl.value,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    class: "metadata__map-link",
                    title: "在 Google Maps 中打开"
                  }, [
                    createVNode(unref(IconMdiGoogleMaps), {
                      size: "sm",
                      class: "metadata__map-link-icon",
                      "aria-hidden": "true"
                    })
                  ], 8, _hoisted_35),
                  createBaseVNode("a", {
                    href: amapUrl.value,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    class: "metadata__map-link",
                    title: "在高德地图中打开"
                  }, [
                    createVNode(unref(IconMdiMapMarker), {
                      size: "sm",
                      class: "metadata__map-link-icon",
                      "aria-hidden": "true"
                    })
                  ], 8, _hoisted_36)
                ])
              ])) : createCommentVNode("", true)
            ], 64)) : createCommentVNode("", true)
          ]))
        ])
      ]);
    };
  }
};
const _hoisted_1$1 = {
  class: "action-menu action-menu--lightbox",
  role: "menu",
  "aria-label": "更多操作"
};
const _hoisted_2 = {
  class: "action-menu__icon",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  class: "action-menu__icon",
  "aria-hidden": "true"
};
const _hoisted_4 = {
  class: "action-menu__icon",
  "aria-hidden": "true"
};
const _sfc_main$1 = {
  __name: "FsMediaLightboxMenu",
  props: {
    open: { type: Boolean, default: false },
    darkMode: { type: Boolean, default: false },
    anchorEl: { type: Object, default: null }
    // HTMLElement | null
  },
  emits: ["download", "get-link", "close"],
  setup(__props) {
    const props = __props;
    const viewportTick = ref(0);
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const clamp = (n, min, max) => {
      return Math.max(min, Math.min(max, n));
    };
    const menuStyle = computed(() => {
      void viewportTick.value;
      const fallback = { position: "fixed", top: "56px", right: "12px" };
      const el = props.anchorEl;
      if (!props.open || !el || typeof el.getBoundingClientRect !== "function") return fallback;
      const rect = el.getBoundingClientRect();
      const right = clamp(Math.round(windowWidth.value - rect.right - 6), 12, Math.max(12, windowWidth.value - 12));
      const top = clamp(Math.round(rect.bottom + 8), 12, Math.max(12, windowHeight.value - 12));
      return {
        position: "fixed",
        top: `${top}px`,
        right: `${right}px`
      };
    });
    const bump = () => {
      viewportTick.value += 1;
    };
    watch(
      () => props.open,
      (v) => {
        if (v) bump();
      }
    );
    useEventListener(window, "resize", bump, { passive: true });
    useEventListener(window, "scroll", bump, { passive: true, capture: true });
    return (_ctx, _cache) => {
      return __props.open ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["fs-media-lightbox-menu p-lightbox-menu", __props.darkMode ? "is-dark" : "is-light"]),
        style: normalizeStyle(menuStyle.value)
      }, [
        createBaseVNode("div", _hoisted_1$1, [
          createBaseVNode("button", {
            class: "action-menu__item action-download",
            type: "button",
            role: "menuitem",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("download"))
          }, [
            createBaseVNode("span", _hoisted_2, [
              createVNode(unref(IconDownload), { size: "md" })
            ]),
            _cache[3] || (_cache[3] = createBaseVNode("span", { class: "action-menu__text" }, "下载", -1)),
            _cache[4] || (_cache[4] = createBaseVNode("span", { class: "action-menu__shortcut" }, "Ctrl-D", -1))
          ]),
          createBaseVNode("button", {
            class: "action-menu__item action-link",
            type: "button",
            role: "menuitem",
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("get-link"))
          }, [
            createBaseVNode("span", _hoisted_3, [
              createVNode(unref(IconLink), { size: "md" })
            ]),
            _cache[5] || (_cache[5] = createBaseVNode("span", { class: "action-menu__text" }, "获取链接", -1)),
            _cache[6] || (_cache[6] = createBaseVNode("span", { class: "action-menu__shortcut" }, "Ctrl-L", -1))
          ]),
          _cache[9] || (_cache[9] = createBaseVNode("div", {
            class: "action-menu__divider",
            role: "separator"
          }, null, -1)),
          createBaseVNode("button", {
            class: "action-menu__item action-close",
            type: "button",
            role: "menuitem",
            onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("close"))
          }, [
            createBaseVNode("span", _hoisted_4, [
              createVNode(unref(IconClose), { size: "md" })
            ]),
            _cache[7] || (_cache[7] = createBaseVNode("span", { class: "action-menu__text" }, "关闭", -1)),
            _cache[8] || (_cache[8] = createBaseVNode("span", { class: "action-menu__shortcut" }, "Esc", -1))
          ])
        ])
      ], 6)) : createCommentVNode("", true);
    };
  }
};
const _hoisted_1 = { class: "p-lightbox__container" };
const _sfc_main = {
  __name: "FsMediaLightboxDialog",
  setup(__props) {
    const fsService = useFsService();
    const lightbox = useFsMediaLightbox();
    const shellRef = ref(null);
    const pswpHostRef = ref(null);
    const menuButtonEl = ref(null);
    const isZoomable = ref(true);
    let unbindZoomableListeners = null;
    let unbindPswpInteractionListeners = null;
    const syncSlideshowButton = () => {
      const pswp = getPswp();
      const template = pswp?.template;
      if (!template) return;
      const btn = template.querySelector?.(".pswp__button--slideshow-toggle");
      if (!btn) return;
      btn.classList.toggle("is-active", !!lightbox.slideshowActive.value);
    };
    const {
      initPhotoSwipe,
      openPhotoSwipe,
      destroyPhotoSwipe,
      closePhotoSwipe,
      setExternalHandlers,
      setVideoResolver,
      setAppendToEl,
      getPswp
    } = usePhotoSwipe();
    let slideshowTimer = null;
    let slideshowToken = 0;
    const lockBodyScroll = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };
    const unlockBodyScroll = () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
    const handleClose = () => {
      lightbox.close();
    };
    const handleDownload = () => {
      lightbox.requestDownload();
      lightbox.menuOpen.value = false;
    };
    const handleGetLink = () => {
      lightbox.requestGetLink();
      lightbox.menuOpen.value = false;
    };
    const pauseSlideshow = () => {
      if (!lightbox.slideshowActive.value) return;
      stopSlideshow();
    };
    const toggleMenu = () => {
      if (!lightbox.menuOpen.value) pauseSlideshow();
      lightbox.toggleMenu();
    };
    const toggleSidebar = () => {
      if (!lightbox.sidebarOpen.value) pauseSlideshow();
      lightbox.toggleSidebar();
    };
    const handleShellPointerDown = (event) => {
      if (!event?.target?.closest?.(".pswp__button--slideshow-toggle")) {
        pauseSlideshow();
      }
      if (!lightbox.menuOpen.value) return;
      if (event?.target?.closest?.(".fs-media-lightbox-menu")) return;
      if (event?.target?.closest?.(".pswp__button--menu-button")) return;
      lightbox.menuOpen.value = false;
    };
    const handleShellWheel = () => {
      pauseSlideshow();
    };
    const requestFullscreen = async () => {
      const el = shellRef.value;
      if (!el) return;
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await el.requestFullscreen();
      }
    };
    const stopSlideshow = () => {
      slideshowToken += 1;
      if (slideshowTimer) clearTimeout(slideshowTimer);
      slideshowTimer = null;
      lightbox.setSlideshowActive(false);
      syncSlideshowButton();
    };
    const startSlideshow = () => {
      stopSlideshow();
      lightbox.setSlideshowActive(true);
      syncSlideshowButton();
      const token = slideshowToken;
      const tick = () => {
        if (token !== slideshowToken) return;
        if (!lightbox.slideshowActive.value) return;
        getPswp()?.next?.();
        slideshowTimer = setTimeout(tick, 5e3);
      };
      slideshowTimer = setTimeout(tick, 5e3);
    };
    const toggleSlideshow = () => {
      if (lightbox.slideshowActive.value) {
        stopSlideshow();
      } else {
        startSlideshow();
      }
    };
    const onKeyDown = (e) => {
      if (!lightbox.isOpen.value) return;
      const active = document.activeElement;
      if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement || /** @type {any} */
      active?.isContentEditable) {
        return;
      }
      const key = String(e.key || "");
      const lower = key.toLowerCase();
      const hasCtrlLike = !!(e.ctrlKey || e.metaKey);
      if (e.key === "Escape") {
        e.preventDefault();
        pauseSlideshow();
        handleClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        pauseSlideshow();
        getPswp()?.prev?.();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        pauseSlideshow();
        getPswp()?.next?.();
        return;
      }
      if (lower === "i") {
        e.preventDefault();
        pauseSlideshow();
        toggleSidebar();
        return;
      }
      if (lower === "m") {
        e.preventDefault();
        pauseSlideshow();
        toggleMenu();
        return;
      }
      if (lower === "f") {
        e.preventDefault();
        pauseSlideshow();
        void requestFullscreen();
        return;
      }
      if (lower === "d" && (hasCtrlLike || !e.ctrlKey && !e.metaKey && !e.altKey)) {
        e.preventDefault();
        pauseSlideshow();
        handleDownload();
        return;
      }
      if (lower === "l" && (hasCtrlLike || !e.ctrlKey && !e.metaKey && !e.altKey)) {
        e.preventDefault();
        pauseSlideshow();
        handleGetLink();
        return;
      }
      if (e.key === " ") {
        e.preventDefault();
        toggleSlideshow();
        return;
      }
    };
    useEventListener(window, "keydown", onKeyDown, { passive: false });
    const cleanup = () => {
      stopSlideshow();
      unlockBodyScroll();
      closePhotoSwipe();
      destroyPhotoSwipe();
      if (typeof unbindZoomableListeners === "function") {
        unbindZoomableListeners();
        unbindZoomableListeners = null;
      }
      if (typeof unbindPswpInteractionListeners === "function") {
        unbindPswpInteractionListeners();
        unbindPswpInteractionListeners = null;
      }
      isZoomable.value = true;
    };
    watch(
      () => lightbox.isOpen.value,
      async (open) => {
        if (!open) {
          cleanup();
          return;
        }
        await nextTick();
        lockBodyScroll();
        setAppendToEl(pswpHostRef.value);
        setExternalHandlers({
          onRequestClose: handleClose,
          onToggleSidebar: () => toggleSidebar(),
          onToggleMenu: () => toggleMenu(),
          onToggleFullscreen: () => requestFullscreen(),
          onToggleSlideshow: () => toggleSlideshow(),
          getSlideshowActive: () => lightbox.slideshowActive.value,
          onMenuButtonInit: (el) => {
            menuButtonEl.value = el || null;
          },
          onIndexChange: (i) => {
            lightbox.setIndex(i);
            lightbox.menuOpen.value = false;
          },
          onClosed: () => lightbox.close()
        });
        setVideoResolver(async (path) => {
          if (!path) return "";
          try {
            const url = await fsService.getFileLink(path, null, false);
            return url || "";
          } catch {
            return "";
          }
        });
        initPhotoSwipe();
        const items = Array.isArray(lightbox.items.value) ? lightbox.items.value : [];
        if (items.length === 0) return;
        await openPhotoSwipe(items, lightbox.index.value, lightbox.imageStates.value, lightbox.loadImageUrl.value, {
          darkMode: lightbox.darkMode.value
        });
        const pswp = getPswp();
        if (pswp) {
          const updateZoomable = () => {
            const template = pswp.template;
            isZoomable.value = !!template?.classList?.contains?.("pswp--zoom-allowed");
          };
          pswp.on("change", updateZoomable);
          pswp.on("zoomPanUpdate", updateZoomable);
          pswp.on("zoomLevelsUpdate", updateZoomable);
          updateZoomable();
          unbindZoomableListeners = () => {
            try {
              pswp.off("change", updateZoomable);
              pswp.off("zoomPanUpdate", updateZoomable);
              pswp.off("zoomLevelsUpdate", updateZoomable);
            } catch {
            }
          };
        }
        if (pswp) {
          pswp.on("change", syncSlideshowButton);
          unbindPswpInteractionListeners = () => {
            try {
              pswp.off("change", syncSlideshowButton);
            } catch {
            }
          };
        }
        syncSlideshowButton();
        shellRef.value?.focus?.();
      },
      { immediate: true }
    );
    onBeforeUnmount(() => {
      cleanup();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(Transition, { name: "fade" }, {
          default: withCtx(() => [
            unref(lightbox).isOpen.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              ref_key: "shellRef",
              ref: shellRef,
              class: normalizeClass(["p-dialog p-lightbox v-dialog--lightbox v-overlay--active is-ltr", unref(lightbox).darkMode.value ? "is-dark" : "is-light"]),
              tabindex: "-1",
              onPointerdownCapture: handleShellPointerDown,
              onWheelCapturePassive: handleShellWheel
            }, [
              _cache[1] || (_cache[1] = createBaseVNode("div", { class: "p-lightbox__underlay" }, null, -1)),
              createBaseVNode("div", _hoisted_1, [
                createBaseVNode("div", {
                  class: normalizeClass(["p-lightbox__content", {
                    "sidebar-visible": unref(lightbox).sidebarOpen.value,
                    "slideshow-active": unref(lightbox).slideshowActive.value,
                    "is-zoomable": isZoomable.value
                  }])
                }, [
                  createBaseVNode("div", {
                    ref_key: "pswpHostRef",
                    ref: pswpHostRef,
                    class: "p-lightbox__pswp"
                  }, null, 512)
                ], 2),
                unref(lightbox).sidebarOpen.value ? (openBlock(), createBlock(_sfc_main$2, {
                  key: 0,
                  item: unref(lightbox).currentItem.value,
                  "image-states": unref(lightbox).imageStates.value,
                  "load-image-url": unref(lightbox).loadImageUrl.value,
                  onClose: _cache[0] || (_cache[0] = ($event) => unref(lightbox).toggleSidebar())
                }, null, 8, ["item", "image-states", "load-image-url"])) : createCommentVNode("", true)
              ]),
              createVNode(_sfc_main$1, {
                open: unref(lightbox).menuOpen.value,
                "dark-mode": unref(lightbox).darkMode.value,
                "anchor-el": menuButtonEl.value,
                onDownload: handleDownload,
                onGetLink: handleGetLink,
                onClose: handleClose
              }, null, 8, ["open", "dark-mode", "anchor-el"])
            ], 34)) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
};
export {
  _sfc_main as default
};
