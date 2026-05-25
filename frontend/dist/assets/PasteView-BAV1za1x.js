const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/PasteViewOutline-CxFraumo.js","assets/index-BQxzU9F1.js","assets/timeUtils-D81jJILb.js","assets/LoadingIndicator-C1Dntewf.js","assets/clipboard-GLHRBPpJ.js","assets/pasteService-CHRbddSC.js","assets/useAdminBase-CxkodUK-.js","assets/storageConfigsStore-DUFoycii.js","assets/PasteViewEditor-BLKgE2Lr.js","assets/VditorUnified-CK_SUxJD.js","assets/useConfirmDialog-c5dcTgIB.js","assets/markdownToWord-7ASpIkki.js","assets/FileSaver.min-CQ6SkgWv.js","assets/snapdomCapture-U4IMZ2vT.js"])))=>i.map(i=>d[i]);
import { c as createLogger, aK as _export_sfc, g as ref, F as computed, aT as onKeyStroke, w as watch, o as onMounted, j as createElementBlock, p as createCommentVNode, k as openBlock, l as createBaseVNode, t as toDisplayString, M as createBlock, y as unref, e8 as IconExpand, e9 as IconCollapse, z as createVNode, G as IconClose, q as withDirectives, aq as vShow, n as normalizeClass, aP as nextTick, Z as useTimeoutFn, aN as useCssVars, ea as useWindowScroll, eb as useScroll, aY as onBeforeUnmount, J as IconRefresh, e2 as mightContainMermaid, e3 as ensureMermaidPatchedForVditor, aR as loadVditor, ec as useMutationObserver, aS as VDITOR_ASSETS_BASE, u as useEventListener, d0 as render, a$ as h, ao as IconChevronDown, bg as IconEye, d as useRouter, dL as useRoute, f as useAuthStore, A as createTextVNode, B as IconUser, aL as IconExclamation, bG as vModelDynamic, aG as withKeys, dN as IconEyeOff, aE as withCtx, c9 as defineAsyncComponent, D as ApiStatus, _ as __vitePreload, ac as useThemeMode } from "./index-BQxzU9F1.js";
import { h as formatExpiry$1, i as isExpired } from "./timeUtils-D81jJILb.js";
import { _ as _sfc_main$4 } from "./LoadingIndicator-C1Dntewf.js";
import { c as copyToClipboard } from "./clipboard-GLHRBPpJ.js";
import { u as usePasteService } from "./pasteService-CHRbddSC.js";
import "./useAdminBase-CxkodUK-.js";
import "./storageConfigsStore-DUFoycii.js";
const log = createLogger("PasteView");
function debugLog(enableDebug, isDev, ...args) {
  if (!enableDebug) return;
  if (!isDev) return;
  log.debug(...args);
}
function formatExpiry(expiryDateString) {
  return formatExpiry$1(expiryDateString);
}
function getInputClasses(darkMode) {
  if (darkMode) {
    return "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500";
  }
  return "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500";
}
const _hoisted_1$2 = {
  key: 0,
  class: "html-preview-modal"
};
const _hoisted_2$2 = { class: "modal-header" };
const _hoisted_3$2 = { class: "modal-actions" };
const _hoisted_4$2 = { class: "modal-content" };
const _hoisted_5$1 = {
  key: 0,
  class: "loading-state"
};
const _hoisted_6$1 = {
  key: 1,
  class: "error-state"
};
const _hoisted_7$1 = ["srcdoc"];
const _sfc_main$3 = {
  __name: "HtmlPreviewModal",
  props: {
    // HTML 代码内容
    htmlContent: {
      type: String,
      default: ""
    },
    // 是否显示弹窗
    show: {
      type: Boolean,
      default: false
    },
    // 暗色模式
    darkMode: {
      type: Boolean,
      default: false
    },
    // 内容类型
    contentType: {
      type: String,
      default: "html"
    }
  },
  emits: ["close", "open-external"],
  setup(__props, { emit: __emit }) {
    const log2 = createLogger("HtmlPreviewModal");
    const props = __props;
    const emit = __emit;
    const iframeRef = ref(null);
    const renderState = ref("idle");
    const errorMessage = ref("");
    const copyButtonRef = ref(null);
    const isFullscreen = ref(false);
    const htmlTemplate = computed(() => {
      if (!props.htmlContent) return "";
      return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML预览</title>
  <style>
    body {
      margin: 0;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: ${props.darkMode ? "#d4d4d4" : "#333"};
      background-color: ${props.darkMode ? "#1a1a1a" : "#fff"};
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
      body {
        padding: 8px;
        font-size: 14px;
      }
    }

    /* 基础样式重置 */
    * {
      box-sizing: border-box;
    }

    img {
      max-width: 100%;
      height: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1em 0;
    }

    th, td {
      border: 1px solid ${props.darkMode ? "#444" : "#ddd"};
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: ${props.darkMode ? "#333" : "#f5f5f5"};
    }

    pre {
      background-color: ${props.darkMode ? "#2d2d2d" : "#f5f5f5"};
      padding: 1em;
      border-radius: 4px;
      overflow-x: auto;
    }

    code {
      background-color: ${props.darkMode ? "#2d2d2d" : "#f5f5f5"};
      padding: 2px 4px;
      border-radius: 2px;
      font-family: 'Courier New', monospace;
    }
  </style>
</head>
<body>
  ${props.htmlContent}
</body>
</html>
  `.trim();
    });
    const toggleFullscreen = () => {
      isFullscreen.value = !isFullscreen.value;
    };
    onKeyStroke("Escape", () => {
      if (isFullscreen.value) {
        isFullscreen.value = false;
      }
    });
    watch([() => props.show, () => props.htmlContent], ([newShow, newHtml]) => {
      if (newShow && newHtml) {
        nextTick(() => renderHtml());
      }
    });
    const closeModal = () => {
      emit("close");
    };
    const renderHtml = () => {
      if (!props.htmlContent) return;
      try {
        renderState.value = "loading";
        nextTick(() => {
          renderState.value = "rendered";
        });
      } catch (error) {
        log2.error("渲染 HTML 时出错:", error);
        errorMessage.value = error.message || "渲染 HTML 时发生错误";
        renderState.value = "error";
      }
    };
    const openInNewWindow = () => {
      emit("open-external", props.htmlContent);
    };
    const copyHtml = async () => {
      try {
        const success = await copyToClipboard(props.htmlContent);
        if (!success) {
          throw new Error("copy_failed");
        }
        const btn = copyButtonRef.value;
        if (btn) {
          const original = btn.textContent;
          btn.textContent = "已复制";
          useTimeoutFn(() => {
            if (copyButtonRef.value) {
              copyButtonRef.value.textContent = original || "复制代码";
            }
          }, 2e3);
        }
      } catch (err) {
        log2.error("复制失败:", err);
      }
    };
    onMounted(() => {
      if (props.show && props.htmlContent) {
        renderHtml();
      }
    });
    return (_ctx, _cache) => {
      return __props.show ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", {
          class: "modal-overlay",
          onClick: closeModal
        }),
        createBaseVNode("div", {
          class: normalizeClass(["modal-container", { "dark-mode": __props.darkMode, fullscreen: isFullscreen.value }])
        }, [
          createBaseVNode("div", _hoisted_2$2, [
            createBaseVNode("h3", null, toDisplayString(__props.contentType === "svg" ? "SVG 预览" : "HTML 预览"), 1),
            createBaseVNode("div", _hoisted_3$2, [
              createBaseVNode("button", {
                ref_key: "copyButtonRef",
                ref: copyButtonRef,
                class: "action-button copy-button",
                onClick: copyHtml
              }, "复制代码", 512),
              createBaseVNode("button", {
                class: "action-button",
                onClick: openInNewWindow
              }, "在新窗口打开"),
              createBaseVNode("button", {
                class: "action-button",
                onClick: toggleFullscreen
              }, [
                !isFullscreen.value ? (openBlock(), createBlock(unref(IconExpand), {
                  key: 0,
                  size: "sm"
                })) : (openBlock(), createBlock(unref(IconCollapse), {
                  key: 1,
                  size: "sm"
                }))
              ]),
              createBaseVNode("button", {
                class: "close-button",
                onClick: closeModal
              }, [
                createVNode(unref(IconClose))
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_4$2, [
            renderState.value === "loading" ? (openBlock(), createElementBlock("div", _hoisted_5$1, [
              createVNode(_sfc_main$4, {
                text: "正在渲染 HTML...",
                "dark-mode": __props.darkMode,
                size: "2xl",
                "icon-class": __props.darkMode ? "text-blue-400" : "text-blue-600",
                "text-class": "text-inherit"
              }, null, 8, ["dark-mode", "icon-class"])
            ])) : renderState.value === "error" ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
              createBaseVNode("p", null, "渲染失败: " + toDisplayString(errorMessage.value), 1)
            ])) : createCommentVNode("", true),
            withDirectives(createBaseVNode("iframe", {
              ref_key: "iframeRef",
              ref: iframeRef,
              class: "preview-iframe",
              srcdoc: htmlTemplate.value,
              sandbox: "allow-same-origin allow-scripts",
              title: "HTML 预览",
              onLoad: _cache[0] || (_cache[0] = ($event) => renderState.value = "rendered")
            }, null, 40, _hoisted_7$1), [
              [vShow, renderState.value === "rendered"]
            ])
          ])
        ], 2)
      ])) : createCommentVNode("", true);
    };
  }
};
const HtmlPreviewModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-7dbc7c6b"]]);
const _hoisted_1$1 = { class: "paste-view-preview" };
const _hoisted_2$1 = {
  key: 0,
  class: "py-10 flex justify-center items-center"
};
const _hoisted_3$1 = {
  key: 1,
  class: "plain-text-container"
};
const _hoisted_4$1 = { key: 2 };
const _sfc_main$2 = {
  __name: "PasteViewPreview",
  props: {
    // 是否为暗色模式，控制渲染主题
    darkMode: {
      type: Boolean,
      required: true
    },
    // 要渲染的Markdown内容
    content: {
      type: String,
      default: ""
    },
    // 是否为开发环境
    isDev: {
      type: Boolean,
      default: false
    },
    // 是否启用调试日志
    enableDebug: {
      type: Boolean,
      default: false
    },
    // 是否为纯文本模式（不渲染Markdown）
    isPlainTextMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["rendered"],
  setup(__props, { expose: __expose, emit: __emit }) {
    useCssVars((_ctx) => ({
      "b4b96070": props.darkMode ? "#d4d4d4" : "#374151",
      "6c3793b7": props.darkMode ? "transparent" : "transparent",
      "03399bc5": props.darkMode ? "#30363d" : "#e5e7eb",
      "1c0086c0": props.darkMode ? "#252526" : "#f3f4f6",
      "b08d064e": props.darkMode ? "#ce9178" : "#ef4444",
      "717aa5ea": props.darkMode ? "#4b5563" : "#e5e7eb",
      "553aecf5": props.darkMode ? "#9ca3af" : "#6b7280",
      "2c8847db": props.darkMode ? "#1a1a1a" : "#f9fafb",
      "3927a49f": props.darkMode ? "#3b82f6" : "#2563eb",
      "254a1e64": props.darkMode ? "#e2e8f0" : "#374151",
      "cd4a6ece": props.darkMode ? "#1e1e1e" : "#ffffff",
      "26521481": props.darkMode ? "#252526" : "#f9fafb",
      "e7717e14": props.darkMode ? "#2c2c2d" : "#f3f4f6",
      "e8a902f2": props.darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
      "b7f4ec16": props.darkMode ? "#6b7280" : "#9ca3af",
      "2ac14045": props.darkMode ? "#1a1a1a" : "#f8f9fa",
      "18966104": props.darkMode ? "#252526" : "#f1f3f5",
      "6bb17bc0": props.darkMode ? "#e2e8f0" : "#4b5563",
      "61a5616e": props.darkMode ? "#2c2c2d" : "#e9ecef",
      "3ed1d198": props.darkMode ? "#1e1e1e" : "#f1f1f1",
      "568784b4": props.darkMode ? "#4b5563" : "#c1c9d6",
      "daa1958c": props.darkMode ? "#6b7280" : "#a1a9b6"
    }));
    const log2 = createLogger("PasteViewPreview");
    const props = __props;
    const showHtmlPreview = ref(false);
    const previewHtmlContent = ref("");
    const showSvgPreview = ref(false);
    const previewSvgContent = ref("");
    const emit = __emit;
    const previewElement = ref(null);
    const { y: windowScrollY } = useWindowScroll();
    const { y: contentScrollY } = useScroll(previewElement);
    const contentRendered = ref(false);
    const savedScrollPosition = ref({ window: 0, content: 0 });
    let stopMutationObserver = null;
    const timeoutIds = /* @__PURE__ */ new Set();
    let stopPreviewImageClickListener = null;
    const renderIconInto = (container, IconComponent, props2 = {}) => {
      render(h(IconComponent, props2), container);
    };
    const safeSetTimeout = (callback, delay) => {
      const id = setTimeout(() => {
        timeoutIds.delete(id);
        callback();
      }, delay);
      timeoutIds.add(id);
      return id;
    };
    const clearAllTimeouts = () => {
      timeoutIds.forEach((id) => clearTimeout(id));
      timeoutIds.clear();
    };
    const saveScrollPosition = () => {
      savedScrollPosition.value = {
        window: windowScrollY.value,
        content: previewElement.value ? contentScrollY.value : 0
      };
      debugLog(props.enableDebug, props.isDev, "保存滚动位置:", savedScrollPosition.value);
    };
    const restoreScrollPosition = () => {
      nextTick(() => {
        windowScrollY.value = savedScrollPosition.value.window;
        if (previewElement.value) {
          contentScrollY.value = savedScrollPosition.value.content;
        }
        debugLog(props.enableDebug, props.isDev, "恢复滚动位置:", savedScrollPosition.value);
      });
    };
    watch(
      () => props.darkMode,
      () => {
        if (props.content) {
          saveScrollPosition();
          nextTick(() => {
            renderContent(props.content);
          });
        }
      }
    );
    let lastRenderedContent = "";
    let diagramContainersCache = null;
    let checkboxesCache = null;
    let codeBlocksCache = null;
    const mightContainCodeFence = (text) => /(^|\n)\s*```|(^|\n)\s*~~~/m.test(String(text || ""));
    const mightContainFlowchart = (text) => /(^|\n)\s*```+\s*flowchart\b|(^|\n)\s*~~~+\s*flowchart\b/im.test(String(text || ""));
    const mightContainGraphviz = (text) => /(^|\n)\s*```+\s*(graphviz|dot|viz)\b|(^|\n)\s*~~~+\s*(graphviz|dot|viz)\b/im.test(String(text || ""));
    const mightContainAbc = (text) => /(^|\n)\s*```+\s*abc\b|(^|\n)\s*~~~+\s*abc\b/im.test(String(text || ""));
    const mightContainEcharts = (text) => /(^|\n)\s*```+\s*(echarts|chart|mindmap)\b|(^|\n)\s*~~~+\s*(echarts|chart|mindmap)\b/im.test(String(text || ""));
    watch(
      () => props.content,
      (newContent, oldContent) => {
        if (newContent && newContent !== lastRenderedContent && newContent !== oldContent) {
          lastRenderedContent = newContent;
          contentRendered.value = false;
          nextTick(() => {
            renderContent(newContent);
          });
        }
      }
    );
    watch(
      () => props.isPlainTextMode,
      (newMode) => {
        if (!newMode && props.content) {
          contentRendered.value = false;
          nextTick(() => {
            renderContent(props.content);
          });
        }
        debugLog(props.enableDebug, props.isDev, `显示模式切换: ${newMode ? "纯文本模式" : "Markdown渲染模式"}`);
      }
    );
    const renderContent = (content) => {
      if (props.isPlainTextMode) {
        contentRendered.value = true;
        emit("rendered");
        return;
      }
      if (!content) {
        log2.warn("没有内容可渲染");
        return;
      }
      if (!previewElement.value) {
        debugLog(props.enableDebug, props.isDev, "预览元素尚未准备好，将在下一个渲染周期尝试");
        nextTick(() => {
          if (previewElement.value) {
            debugLog(props.enableDebug, props.isDev, "预览元素已就绪，现在开始渲染");
            renderContentInternal(content);
          } else {
            log2.error("预览元素始终不可用，无法渲染内容");
          }
        });
        return;
      }
      renderContentInternal(content);
    };
    const renderContentInternal = async (content) => {
      if (previewElement.value) {
        previewElement.value.innerHTML = "";
        previewElement.value.classList.remove("vditor-reset--dark", "vditor-reset--light");
        diagramContainersCache = null;
        checkboxesCache = null;
        codeBlocksCache = null;
        try {
          const hasMermaid = mightContainMermaid(content);
          const hasFlowchart = mightContainFlowchart(content);
          const hasGraphviz = mightContainGraphviz(content);
          const hasAbc = mightContainAbc(content);
          const hasEcharts = mightContainEcharts(content);
          const hasCodeFence = mightContainCodeFence(content);
          const hasAnyDiagram = hasMermaid || hasFlowchart || hasGraphviz || hasAbc || hasEcharts;
          if (hasMermaid) {
            try {
              await ensureMermaidPatchedForVditor();
            } catch (e) {
              log2.warn("[PasteViewPreview] Mermaid 补丁加载失败（将继续渲染）:", e);
            }
          }
          const VditorConstructor = await loadVditor();
          safeSetTimeout(() => {
            try {
              VditorConstructor.preview(previewElement.value, content, {
                mode: "dark-light",
                // 支持明暗主题
                theme: {
                  current: props.darkMode ? "dark" : "light",
                  // 根据darkMode设置主题
                  path: `${VDITOR_ASSETS_BASE}/dist/css/content-theme`
                },
                cdn: VDITOR_ASSETS_BASE,
                hljs: {
                  // 性能优化：只有确实存在代码块时才显示行号，避免无意义的行号计算
                  lineNumber: hasCodeFence,
                  style: props.darkMode ? "vs2015" : "github"
                  // 代码高亮样式
                },
                markdown: {
                  toc: true,
                  // 启用目录
                  mark: true,
                  // 启用标记
                  footnotes: true,
                  // 启用脚注
                  autoSpace: true,
                  // 自动空格
                  media: true,
                  // 启用媒体链接解析（视频、音频等）
                  listStyle: true,
                  // 启用列表样式支持
                  // 添加任务列表支持
                  task: true,
                  // 启用任务列表
                  // 图表渲染相关配置
                  mermaid: hasMermaid ? {
                    theme: "default",
                    // 使用固定的主题，不跟随暗色模式变化
                    useMaxWidth: false
                    // 不使用最大宽度限制
                  } : false,
                  flowchart: hasFlowchart ? {
                    theme: "default"
                    // 使用固定的主题
                  } : false,
                  graphviz: hasGraphviz,
                  abc: hasAbc,
                  chart: hasEcharts,
                  mindmap: hasEcharts,
                  fixDiagramTheme: hasAnyDiagram
                  // 自定义属性，用于CSS选择器中识别
                },
                math: {
                  engine: "KaTeX",
                  // 数学公式渲染引擎
                  inlineDigit: true
                  // 启用行内数学公式
                },
                after: () => {
                  debugLog(props.enableDebug, props.isDev, "Markdown 内容渲染完成");
                  if (props.darkMode) {
                    previewElement.value.classList.add("vditor-reset--dark");
                    previewElement.value.classList.remove("vditor-reset--light");
                  } else {
                    previewElement.value.classList.add("vditor-reset--light");
                    previewElement.value.classList.remove("vditor-reset--dark");
                  }
                  if (!diagramContainersCache || diagramContainersCache.length === 0) {
                    diagramContainersCache = previewElement.value.querySelectorAll(".language-mermaid, .language-flow, .language-plantuml, .language-gantt");
                  }
                  diagramContainersCache.forEach((container) => {
                    container.classList.add("diagram-fixed-theme");
                  });
                  const setupTaskListInteraction = () => {
                    if (!previewElement.value) {
                      log2.warn("setupTaskListInteraction: 预览元素不存在，跳过任务列表交互设置");
                      return;
                    }
                    if (!checkboxesCache || checkboxesCache.length === 0) {
                      checkboxesCache = previewElement.value.querySelectorAll('.vditor-task input[type="checkbox"]');
                    }
                    checkboxesCache.forEach((checkbox) => {
                      checkbox.disabled = false;
                      checkbox.style.pointerEvents = "auto";
                      checkbox.style.cursor = "pointer";
                      const parentLi = checkbox.closest("li");
                      if (parentLi) {
                        if (checkbox.checked) {
                          parentLi.setAttribute("data-task-checked", "true");
                        }
                        checkbox.addEventListener("change", (e) => {
                          const isChecked = e.target.checked;
                          parentLi.setAttribute("data-task-checked", isChecked.toString());
                        });
                      }
                    });
                  };
                  setupTaskListInteraction();
                  if (typeof stopMutationObserver === "function") {
                    stopMutationObserver();
                    stopMutationObserver = null;
                  }
                  if (previewElement.value) {
                    const { stop } = useMutationObserver(
                      previewElement,
                      (mutations) => {
                        const hasRelevantChanges = mutations.some(
                          (mutation) => mutation.type === "childList" && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)
                        );
                        if (hasRelevantChanges) {
                          checkboxesCache = null;
                          diagramContainersCache = null;
                          codeBlocksCache = null;
                          safeSetTimeout(setupTaskListInteraction, 50);
                        }
                      },
                      {
                        childList: true,
                        subtree: true,
                        attributes: false,
                        // 不监听属性变化
                        characterData: false
                        // 不监听文本变化
                      }
                    );
                    stopMutationObserver = stop;
                  } else {
                    log2.warn("无法设置MutationObserver：预览元素不存在");
                  }
                  setupCodeBlockCollapse();
                  setupImagePreview();
                  contentRendered.value = true;
                  emit("rendered");
                  restoreScrollPosition();
                }
              });
            } catch (previewError) {
              log2.error("Vditor预览渲染失败:", previewError);
              if (previewElement.value) {
                const safeContent = content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                previewElement.value.innerHTML = `<pre class="whitespace-pre-wrap">${safeContent}</pre>`;
                contentRendered.value = true;
                emit("rendered");
                restoreScrollPosition();
              }
            }
          }, 100);
        } catch (e) {
          log2.error("渲染 Markdown 内容时发生错误:", e);
          if (previewElement.value) {
            const safeContent = content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
            previewElement.value.innerHTML = `<pre class="whitespace-pre-wrap">${safeContent}</pre>`;
            contentRendered.value = true;
            emit("rendered");
            restoreScrollPosition();
          }
        }
      } else {
        debugLog(props.enableDebug, props.isDev, "renderContentInternal: 预览元素不存在");
        safeSetTimeout(() => {
          if (previewElement.value && !contentRendered.value) {
            debugLog(props.enableDebug, props.isDev, "延迟后重试渲染");
            renderContentInternal(content);
          }
        }, 150);
      }
    };
    const isContentRendered = () => {
      if (contentRendered.value) {
        return true;
      }
      if (!previewElement.value) return false;
      const innerHTML = previewElement.value.innerHTML || "";
      const hasVditorContent = innerHTML.includes('class="vditor') || previewElement.value.querySelectorAll(".vditor-reset").length > 0;
      if (hasVditorContent || innerHTML.trim().length > 50) {
        contentRendered.value = true;
        return true;
      }
      return false;
    };
    __expose({
      renderContent,
      isContentRendered
    });
    onMounted(() => {
      if (props.content) {
        renderContent(props.content);
      }
    });
    const setupImagePreview = () => {
      if (!previewElement.value) return;
      if (typeof stopPreviewImageClickListener === "function") {
        stopPreviewImageClickListener();
        stopPreviewImageClickListener = null;
      }
      stopPreviewImageClickListener = useEventListener(previewElement, "click", handleImageClick);
      const images = previewElement.value.querySelectorAll("img");
      images.forEach((img) => {
        img.style.cursor = "pointer";
      });
    };
    const handleImageClick = (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
        const img = e.target;
        const previewContainer = document.createElement("div");
        previewContainer.className = "image-preview-container";
        previewContainer.style.position = "fixed";
        previewContainer.style.top = "0";
        previewContainer.style.left = "0";
        previewContainer.style.width = "100%";
        previewContainer.style.height = "100%";
        previewContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        previewContainer.style.zIndex = "10000";
        previewContainer.style.display = "flex";
        previewContainer.style.justifyContent = "center";
        previewContainer.style.alignItems = "center";
        previewContainer.style.cursor = "zoom-out";
        const previewImg = document.createElement("img");
        previewImg.src = img.src;
        previewImg.style.maxWidth = "90%";
        previewImg.style.maxHeight = "90%";
        previewImg.style.objectFit = "contain";
        previewImg.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.5)";
        previewImg.style.transition = "transform 0.3s ease";
        previewContainer.addEventListener("click", () => {
          document.body.removeChild(previewContainer);
        });
        previewImg.addEventListener("click", (e2) => {
          e2.stopPropagation();
        });
        previewContainer.appendChild(previewImg);
        document.body.appendChild(previewContainer);
      }
    };
    onBeforeUnmount(() => {
      clearAllTimeouts();
      if (typeof stopMutationObserver === "function") {
        stopMutationObserver();
        stopMutationObserver = null;
      }
      if (typeof stopPreviewImageClickListener === "function") {
        stopPreviewImageClickListener();
        stopPreviewImageClickListener = null;
      }
      diagramContainersCache = null;
      checkboxesCache = null;
      codeBlocksCache = null;
    });
    const setupCodeBlockCollapse = () => {
      if (!previewElement.value) return;
      if (!codeBlocksCache || codeBlocksCache.length === 0) {
        codeBlocksCache = previewElement.value.querySelectorAll('pre code[class*="language-"]');
      }
      const codeBlocks = codeBlocksCache;
      codeBlocks.forEach((codeBlock) => {
        if (codeBlock.parentElement.getAttribute("data-collapsible") === "true") {
          return;
        }
        codeBlock.parentElement.setAttribute("data-collapsible", "true");
        const languageClass = Array.from(codeBlock.classList).find((cls) => cls.startsWith("language-"));
        const language = languageClass ? languageClass.replace("language-", "") : "代码";
        const codeText = codeBlock.textContent || "";
        const lineCount = (codeText.match(/\n/g) || []).length + 1;
        const isLargeCodeBlock = lineCount > 15 || codeText.length > 2e3;
        const details = document.createElement("details");
        details.className = "code-block-collapsible";
        details.open = !isLargeCodeBlock;
        const summary = document.createElement("summary");
        summary.className = "code-block-summary";
        const langLabel = document.createElement("span");
        langLabel.className = "code-block-language";
        langLabel.textContent = language;
        const lineInfo = document.createElement("span");
        lineInfo.className = "code-block-line-info";
        lineInfo.textContent = `${lineCount}行`;
        const actionText = document.createElement("span");
        actionText.className = "code-block-action-text";
        actionText.textContent = "折叠";
        const collapseHint = document.createElement("span");
        collapseHint.className = "code-block-collapse-hint";
        renderIconInto(collapseHint, IconChevronDown, { size: "sm" });
        const leftContainer = document.createElement("div");
        leftContainer.className = "code-block-info";
        leftContainer.appendChild(langLabel);
        leftContainer.appendChild(lineInfo);
        summary.appendChild(leftContainer);
        const actionsContainer = document.createElement("div");
        actionsContainer.className = "code-block-actions";
        if (language.toLowerCase() === "html") {
          const previewButton = document.createElement("button");
          previewButton.className = "code-block-preview-button";
          renderIconInto(previewButton, IconEye, { size: "sm" });
          previewButton.title = "预览 HTML";
          previewButton.addEventListener("click", (e) => {
            e.stopPropagation();
            previewHtmlContent.value = codeText;
            showHtmlPreview.value = true;
          });
          actionsContainer.appendChild(previewButton);
        }
        if (language.toLowerCase() === "svg") {
          const previewButton = document.createElement("button");
          previewButton.className = "code-block-preview-button";
          renderIconInto(previewButton, IconEye, { size: "sm" });
          previewButton.title = "预览 SVG";
          previewButton.addEventListener("click", (e) => {
            e.stopPropagation();
            previewSvgContent.value = codeText;
            showSvgPreview.value = true;
          });
          actionsContainer.appendChild(previewButton);
        }
        actionsContainer.appendChild(actionText);
        actionsContainer.appendChild(collapseHint);
        summary.appendChild(actionsContainer);
        const preElement = codeBlock.parentElement;
        const preParent = preElement.parentElement;
        details.appendChild(summary);
        preParent.replaceChild(details, preElement);
        details.appendChild(preElement);
        summary.addEventListener("click", (e) => {
          e.stopPropagation();
          safeSetTimeout(() => {
            actionText.textContent = details.open ? "折叠" : "展开";
          }, 0);
        });
        actionText.textContent = details.open ? "折叠" : "展开";
      });
    };
    const openHtmlInExternalBrowser = (htmlContent) => {
      const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTML 预览</title>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;
      const blob = new Blob([htmlTemplate], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      safeSetTimeout(() => URL.revokeObjectURL(url), 100);
    };
    const openSvgInExternalBrowser = (svgContent) => {
      const svgTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SVG 预览</title>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: ${props.darkMode ? "#1a1a1a" : "#ffffff"};
          }
          svg {
            max-width: 100%;
            max-height: 100vh;
          }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
    </html>
  `;
      const blob = new Blob([svgTemplate], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      safeSetTimeout(() => URL.revokeObjectURL(url), 100);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        props.content && !contentRendered.value && !props.isPlainTextMode ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          createVNode(unref(IconRefresh), {
            class: normalizeClass(["animate-spin h-8 w-8", props.darkMode ? "text-blue-400" : "text-primary-500"])
          }, null, 8, ["class"]),
          createBaseVNode("span", {
            class: normalizeClass(["ml-3 text-sm", props.darkMode ? "text-gray-300" : "text-gray-500"])
          }, "正在渲染内容...", 2)
        ])) : createCommentVNode("", true),
        props.isPlainTextMode && props.content ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
          createBaseVNode("pre", {
            class: normalizeClass(["whitespace-pre-wrap p-4 font-mono text-base overflow-auto min-h-[300px]", props.darkMode ? "text-gray-200" : "text-gray-800"])
          }, toDisplayString(props.content), 3)
        ])) : (openBlock(), createElementBlock("div", _hoisted_4$1, [
          createBaseVNode("div", {
            ref_key: "previewElement",
            ref: previewElement,
            class: normalizeClass(["vditor-reset markdown-body min-h-[300px]", { "opacity-0": !contentRendered.value }])
          }, null, 2),
          props.content && !isContentRendered() && previewElement.value && contentRendered.value === false ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["mt-4 p-3 border rounded", props.darkMode ? "border-yellow-600 bg-yellow-900/20" : "border-yellow-500 bg-yellow-50"])
          }, [
            createBaseVNode("p", {
              class: normalizeClass(["text-sm mb-2", props.darkMode ? "text-yellow-300" : "text-yellow-700"])
            }, "Markdown 渲染失败，显示原始内容：", 2),
            createBaseVNode("pre", {
              class: normalizeClass(["whitespace-pre-wrap overflow-auto max-h-[600px] p-3 rounded", props.darkMode ? "text-gray-200 bg-gray-800" : "text-gray-800 bg-gray-100"])
            }, toDisplayString(props.content), 3)
          ], 2)) : createCommentVNode("", true)
        ])),
        !props.content ? (openBlock(), createElementBlock("p", {
          key: 3,
          class: normalizeClass(props.darkMode ? "text-gray-400" : "text-gray-500")
        }, "无内容", 2)) : createCommentVNode("", true),
        createVNode(HtmlPreviewModal, {
          show: showHtmlPreview.value,
          "html-content": previewHtmlContent.value,
          "dark-mode": props.darkMode,
          "content-type": "html",
          onClose: _cache[0] || (_cache[0] = ($event) => showHtmlPreview.value = false),
          onOpenExternal: openHtmlInExternalBrowser
        }, null, 8, ["show", "html-content", "dark-mode"]),
        createVNode(HtmlPreviewModal, {
          show: showSvgPreview.value,
          "html-content": previewSvgContent.value,
          "dark-mode": props.darkMode,
          "content-type": "svg",
          onClose: _cache[1] || (_cache[1] = ($event) => showSvgPreview.value = false),
          onOpenExternal: openSvgInExternalBrowser
        }, null, 8, ["show", "html-content", "dark-mode"])
      ]);
    };
  }
};
const PasteViewPreview = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-dba35057"]]);
const _hoisted_1 = { class: "paste-view max-w-6xl mx-auto px-3 sm:px-6 flex-1 flex flex-col pt-6 sm:pt-8" };
const _hoisted_2 = { class: "mb-6" };
const _hoisted_3 = {
  key: 0,
  class: "mb-3"
};
const _hoisted_4 = { class: "flex items-center flex-wrap gap-2" };
const _hoisted_5 = { class: "text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white" };
const _hoisted_6 = {
  key: 0,
  class: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
};
const _hoisted_7 = {
  key: 1,
  class: "py-16 flex justify-center"
};
const _hoisted_8 = {
  key: 2,
  class: "error-container py-12 px-4 max-w-4xl mx-auto text-center"
};
const _hoisted_9 = { class: "text-lg mb-6 text-gray-600 dark:text-gray-300" };
const _hoisted_10 = {
  key: 3,
  class: "py-6 px-4 flex justify-center"
};
const _hoisted_11 = { class: "mb-4" };
const _hoisted_12 = { class: "relative" };
const _hoisted_13 = ["type"];
const _hoisted_14 = {
  key: 0,
  class: "mt-2 text-sm text-red-500 dark:text-red-400"
};
const _hoisted_15 = {
  key: 5,
  class: "mt-6"
};
const _hoisted_16 = { class: "grid grid-cols-1 gap-4 text-sm" };
const _hoisted_17 = { key: 0 };
const _hoisted_18 = { key: 1 };
const _hoisted_19 = { class: "mb-4 flex items-center justify-between flex-wrap gap-2" };
const _hoisted_20 = {
  key: 2,
  class: "flex items-center gap-2"
};
const _hoisted_21 = {
  key: 3,
  class: "ml-auto"
};
const _hoisted_22 = {
  key: 0,
  class: "mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 text-xs rounded"
};
const _hoisted_23 = { open: "" };
const _hoisted_24 = { class: "mt-2 whitespace-pre-wrap text-gray-700 dark:text-gray-300 break-all" };
const _hoisted_25 = {
  key: 0,
  class: "p-6"
};
const _hoisted_26 = { key: 1 };
const _hoisted_27 = { class: "content-scroll flex-1 p-4 overflow-y-auto md:absolute md:inset-0" };
const _hoisted_28 = {
  key: 2,
  class: "flex flex-col p-6"
};
const _sfc_main$1 = {
  __name: "PasteViewMain",
  props: {
    // 是否为暗色模式
    darkMode: {
      type: Boolean,
      required: true
    },
    // 文本分享的唯一标识符
    slug: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const PasteViewOutline = defineAsyncComponent(() => __vitePreload(() => import("./PasteViewOutline-CxFraumo.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0));
    const PasteViewEditor = defineAsyncComponent(() => __vitePreload(() => import("./PasteViewEditor-BLKgE2Lr.js"), true ? __vite__mapDeps([8,1,9,10,4,11,2,12,13,3,5,6,7]) : void 0));
    const log2 = createLogger("PasteViewMain");
    const isDev = false;
    const enableDebug = ref(false);
    const forceShowEditButton = ref(false);
    const props = __props;
    const router = useRouter();
    const route = useRoute();
    const pasteService = usePasteService();
    const paste = ref(null);
    const loading = ref(true);
    const error = ref("");
    const passwordInput = ref("");
    const needPassword = ref(false);
    const showPassword = ref(false);
    let mounted = false;
    const previewRef = ref(null);
    const editContent = ref("");
    const viewMode = ref("preview");
    const isPlainTextMode = ref(false);
    const hasUserSelectedTextMode = ref(false);
    const authStore = useAuthStore();
    const isAdmin = computed(() => authStore.isAdmin);
    const hasApiKey = computed(() => authStore.isKeyUser && !!authStore.apiKey);
    const hasTextPermission = computed(() => authStore.hasTextManagePermission);
    const isCreator = ref(false);
    const outlineData = ref([]);
    const outlineTreeData = ref([]);
    const isCancelling = ref(false);
    const checkCreatorStatus = () => {
      if (paste.value && hasApiKey.value) {
        try {
          debugLog(enableDebug.value, isDev, "检查API密钥用户是否为创建者，文本created_by:", paste.value.created_by);
          if (!paste.value.created_by) {
            debugLog(enableDebug.value, isDev, "文本没有创建者信息");
            isCreator.value = false;
            return;
          }
          const keyInfo = authStore.apiKeyInfo;
          if (keyInfo) {
            debugLog(enableDebug.value, isDev, "API密钥信息:", keyInfo);
            const createdBy = paste.value.created_by;
            if (typeof createdBy === "string" && createdBy.startsWith("apikey:")) {
              const actualKeyId = createdBy.substring(7);
              isCreator.value = keyInfo.id === actualKeyId;
              debugLog(enableDebug.value, isDev, `比较创建者ID "${actualKeyId}" 与当前API密钥ID "${keyInfo.id}": ${isCreator.value ? "匹配" : "不匹配"}`);
            } else {
              isCreator.value = keyInfo.id === createdBy;
              debugLog(enableDebug.value, isDev, `直接比较创建者 "${createdBy}" 与API密钥ID "${keyInfo.id}": ${isCreator.value ? "匹配" : "不匹配"}`);
            }
            return;
          }
          if (hasTextPermission.value) {
            debugLog(enableDebug.value, isDev, "尝试使用API密钥直接验证创建者身份");
            const createdBy = paste.value.created_by;
            if (typeof createdBy === "string" && createdBy.startsWith("apikey:")) {
              isCreator.value = true;
              debugLog(enableDebug.value, isDev, "放宽条件: 允许API密钥用户编辑任何API密钥创建的内容");
            } else {
              isCreator.value = false;
            }
          } else {
            isCreator.value = false;
          }
        } catch (e) {
          log2.error("检查创建者状态失败:", e);
          isCreator.value = false;
        }
      } else {
        isCreator.value = false;
      }
      debugLog(enableDebug.value, isDev, "API密钥用户最终状态:", {
        hasApiKey: hasApiKey.value,
        hasTextPermission: hasTextPermission.value,
        isCreator: isCreator.value
      });
    };
    watch(
      () => props.slug,
      (newSlug) => {
        if (mounted && newSlug) {
          debugLog(enableDebug.value, isDev, "PasteView: 检测到slug变化，重新加载", newSlug);
          loadPaste();
        }
      }
    );
    const loadPaste = async (password = null) => {
      if (!mounted) return;
      loading.value = true;
      error.value = "";
      try {
        debugLog(enableDebug.value, isDev, "PasteView: 开始加载内容", props.slug);
        const result = await pasteService.getPasteBySlug(props.slug, password);
        paste.value = result;
        debugLog(enableDebug.value, isDev, "文本分享加载成功", {
          slug: result.slug,
          title: result.title || "",
          is_public: result.is_public,
          hasPassword: result.hasPassword,
          created_by: result.created_by || "无",
          contentLength: result.content?.length || 0
        });
        if (!result.created_by) {
          debugLog(enableDebug.value, isDev, "警告: 文本分享没有创建者信息");
        }
        if (result.requiresPassword) {
          needPassword.value = true;
          loading.value = false;
          return;
        }
        needPassword.value = false;
        editContent.value = result.content || "";
        if (!hasUserSelectedTextMode.value) {
          const contentText = String(result.content || "");
          const looksLikeMarkdown = /(?:```|~~~)|\[[^\]]+\]\([^)]+\)|(^|\n)\s{0,3}#{1,6}\s|\*\*|__|[*_-]{3,}/m.test(contentText);
          isPlainTextMode.value = !looksLikeMarkdown;
        }
        if (authStore.needsRevalidation) {
          await authStore.validateAuth();
        }
        checkCreatorStatus();
      } catch (err) {
        log2.error("获取文本分享失败:", err);
        if (err.status === ApiStatus.UNAUTHORIZED || err.response?.status === ApiStatus.UNAUTHORIZED || err.code === ApiStatus.UNAUTHORIZED) {
          error.value = "密码验证失败，请重试";
          needPassword.value = true;
        } else if (err.status === ApiStatus.GONE || err.response?.status === ApiStatus.GONE || err.code === ApiStatus.GONE) {
          error.value = "此文本分享已不可访问：达到最大查看次数或已过期";
          needPassword.value = false;
        } else if (err.status === ApiStatus.NOT_FOUND || err.response?.status === ApiStatus.NOT_FOUND || err.code === ApiStatus.NOT_FOUND) {
          error.value = "此文本分享不存在或已被删除";
          needPassword.value = false;
        } else {
          if (err.message && (err.message.includes("密码错误") || err.message.includes("密码不正确") || err.message.includes("401"))) {
            error.value = "密码验证失败，请重试";
            needPassword.value = true;
          } else if (err.message && (err.message.includes("文本分享已过期") || err.message.includes("最大查看次数") || err.message.includes("410"))) {
            error.value = "此文本分享已不可访问：达到最大查看次数或已过期";
            needPassword.value = false;
          } else if (err.message && (err.message.includes("找不到") || err.message.includes("不存在") || err.message.includes("404"))) {
            error.value = "此文本分享不存在或已被删除";
            needPassword.value = false;
          } else {
            error.value = err.message || "获取文本分享失败";
            needPassword.value = false;
          }
        }
      } finally {
        loading.value = false;
      }
    };
    const extractOutline = () => {
      if (!mounted) return;
      const previewElement = document.querySelector(".vditor-reset");
      if (!previewElement) return;
      const headings = previewElement.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const outline = [];
      const outlineTree = [];
      let currentParents = [];
      headings.forEach((heading) => {
        const level = parseInt(heading.tagName.substring(1));
        const text = heading.textContent;
        const id = heading.id;
        const item = {
          level,
          text,
          id,
          children: [],
          expanded: true
          // 默认展开
        };
        if (level === 1) {
          outlineTree.push(item);
          currentParents = [item];
        } else {
          let parentLevel = level - 1;
          while (parentLevel >= 1) {
            if (currentParents[parentLevel - 1]) {
              currentParents[parentLevel - 1].children.push(item);
              break;
            }
            parentLevel--;
          }
          if (parentLevel < 1) {
            outlineTree.push(item);
          }
          currentParents[level - 1] = item;
          for (let i = level; i < 6; i++) {
            currentParents[i] = null;
          }
        }
        outline.push(item);
      });
      outlineData.value = outline;
      outlineTreeData.value = outlineTree;
      debugLog(enableDebug.value, isDev, "提取大纲数据:", outline.length, "项");
    };
    const handlePreviewRendered = () => {
      extractOutline();
    };
    const switchViewMode = (mode) => {
      if (viewMode.value === "edit" && mode !== "preview") {
        return;
      }
      if (viewMode.value === mode) return;
      if (viewMode.value === "edit" && mode === "preview") {
        isCancelling.value = true;
      }
      viewMode.value = mode;
    };
    const scrollToHeading = (id) => {
      if (!id) return;
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    const saveEdit = async (updateData) => {
      if (!paste.value) return;
      loading.value = true;
      error.value = "";
      try {
        if (!isAdmin.value && !(hasApiKey.value && hasTextPermission.value && isCreator.value)) {
          throw new Error("您没有编辑权限");
        }
        const slug = paste.value.slug;
        if (!slug) {
          throw new Error("无法获取文本分享的唯一标识");
        }
        const passwordChanged = updateData.password || updateData.clearPassword;
        const updateResult = await pasteService.updatePaste(slug, updateData);
        const updatedSlug = updateResult && typeof updateResult === "object" && updateResult.slug ? updateResult.slug : paste.value.slug;
        const slugChanged = updatedSlug && updatedSlug !== paste.value.slug;
        paste.value.content = updateData.content;
        editContent.value = updateData.content;
        if (Object.prototype.hasOwnProperty.call(updateData, "title")) {
          paste.value.title = updateData.title;
        }
        paste.value.remark = updateData.remark;
        paste.value.max_views = updateData.max_views;
        paste.value.expires_at = updateData.expires_at;
        if (Object.prototype.hasOwnProperty.call(updateData, "is_public")) {
          paste.value.is_public = updateData.is_public;
        }
        if (slugChanged) {
          paste.value.slug = updatedSlug;
        }
        switchViewMode("preview");
        error.value = "保存成功";
        setTimeout(() => {
          error.value = "";
        }, 3e3);
        if (slugChanged) {
          try {
            const currentQuery = { ...route.query };
            const currentHash = route.hash;
            await router.replace({
              name: "PasteView",
              params: { slug: updatedSlug },
              query: currentQuery,
              hash: currentHash
            });
          } catch (replaceError) {
            log2.warn("重定向到新链接失败", replaceError);
          }
        }
        if (passwordChanged) {
          passwordInput.value = "";
          setTimeout(() => {
            debugLog(enableDebug.value, isDev, "密码已修改，重新加载内容以更新验证状态");
            loadPaste();
          });
        }
      } catch (err) {
        log2.error("保存内容失败:", err);
        error.value = err.message || "保存失败，请重试";
      } finally {
        loading.value = false;
      }
    };
    const cancelEdit = () => {
      isCancelling.value = true;
      switchViewMode("preview");
      isCancelling.value = false;
    };
    const submitPassword = async () => {
      if (!passwordInput.value) {
        error.value = "请输入密码";
        return;
      }
      loading.value = true;
      error.value = "";
      try {
        await loadPaste(passwordInput.value);
        if (!needPassword.value) {
          passwordInput.value = "";
        }
      } catch (err) {
        loading.value = false;
      }
    };
    const copyContentToClipboard = async () => {
      if (!paste.value || !paste.value.content) {
        error.value = "没有可复制的内容";
        return;
      }
      try {
        const success = await copyToClipboard(paste.value.content);
        if (success) {
          error.value = "复制成功：内容已复制到剪贴板";
          setTimeout(() => {
            error.value = "";
          }, 3e3);
        } else {
          throw new Error("复制失败");
        }
      } catch (e) {
        log2.error("复制失败:", e);
        error.value = "复制失败，请手动选择内容复制";
      }
    };
    const copyRawLink = async () => {
      if (!paste.value || !paste.value.slug) {
        error.value = "没有可复制的原始链接";
        return;
      }
      try {
        const rawLink = pasteService.getRawPasteUrl(paste.value.slug, paste.value.plain_password || null);
        const success = await copyToClipboard(rawLink);
        if (success) {
          error.value = "复制成功：原始链接已复制到剪贴板";
          setTimeout(() => {
            error.value = "";
          }, 3e3);
        } else {
          throw new Error("复制失败");
        }
      } catch (e) {
        log2.error("复制失败:", e);
        error.value = "复制失败，请手动复制原始链接";
      }
    };
    const toggleDebug = () => {
      enableDebug.value = !enableDebug.value;
      debugLog(true, isDev, enableDebug.value ? "调试模式已开启" : "调试模式已关闭");
    };
    const toggleForceEditButton = () => {
    };
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
    const toggleTextMode = (isPlainText) => {
      hasUserSelectedTextMode.value = true;
      isPlainTextMode.value = isPlainText;
      debugLog(enableDebug.value, isDev, isPlainText ? "切换到TXT模式" : "切换到MD渲染模式");
    };
    onMounted(async () => {
      debugLog(enableDebug.value, isDev, "PasteView: 组件挂载", props.slug);
      mounted = true;
      setTimeout(async () => {
        await loadPaste();
      }, 150);
    });
    function handleAuthStateChange(event) {
      debugLog(enableDebug.value, isDev, "PasteViewMain: 认证状态变化", event.detail);
      checkCreatorStatus();
    }
    useEventListener(window, "auth-state-changed", handleAuthStateChange);
    onBeforeUnmount(() => {
      debugLog(enableDebug.value, isDev, "PasteView: 组件卸载");
      mounted = false;
      paste.value = null;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[11] || (_cache[11] = createBaseVNode("div", { class: "py-3 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 mb-4" }, [
            createBaseVNode("a", {
              href: "/",
              class: "hover:text-primary-600 dark:hover:text-primary-400"
            }, "首页"),
            createBaseVNode("span", { class: "mx-2" }, "/"),
            createBaseVNode("span", { class: "text-gray-700 dark:text-gray-300" }, "文本分享")
          ], -1)),
          paste.value && !needPassword.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("h1", _hoisted_5, toDisplayString(paste.value.title || paste.value.slug || "未命名文本"), 1),
              paste.value.is_public === false ? (openBlock(), createElementBlock("span", _hoisted_6, [
                createVNode(unref(IconUser), {
                  size: "xs",
                  class: "h-3.5 w-3.5 mr-1"
                }),
                _cache[7] || (_cache[7] = createTextVNode(" 仅内部可见 ", -1))
              ])) : createCommentVNode("", true)
            ])
          ])) : createCommentVNode("", true),
          loading.value ? (openBlock(), createElementBlock("div", _hoisted_7, [
            createVNode(unref(IconRefresh), { class: "animate-spin h-12 w-12 text-primary-500" })
          ])) : error.value && !needPassword.value && !error.value.includes("成功") ? (openBlock(), createElementBlock("div", _hoisted_8, [
            createVNode(unref(IconExclamation), { class: "h-16 w-16 mx-auto mb-4 text-red-600 dark:text-red-500" }),
            _cache[8] || (_cache[8] = createBaseVNode("h2", { class: "text-2xl font-bold mb-2 text-gray-900 dark:text-white" }, "文本访问错误", -1)),
            createBaseVNode("p", _hoisted_9, toDisplayString(error.value), 1),
            _cache[9] || (_cache[9] = createBaseVNode("a", {
              href: "/",
              class: "inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            }, " 返回首页 ", -1))
          ])) : needPassword.value ? (openBlock(), createElementBlock("div", _hoisted_10, [
            createBaseVNode("div", {
              class: normalizeClass(["max-w-sm w-full p-5 border rounded-lg shadow-sm", __props.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
            }, [
              createBaseVNode("h3", {
                class: normalizeClass(["text-lg font-medium mb-4", __props.darkMode ? "text-white" : "text-gray-900"])
              }, "此内容需要密码访问", 2),
              createBaseVNode("p", {
                class: normalizeClass(["mb-4 text-sm", __props.darkMode ? "text-gray-300" : "text-gray-600"])
              }, "此文本分享已被密码保护，请输入密码查看内容", 2),
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("label", {
                  for: "password",
                  class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, "密码", 2),
                createBaseVNode("div", _hoisted_12, [
                  withDirectives(createBaseVNode("input", {
                    type: showPassword.value ? "text" : "password",
                    id: "password",
                    autocomplete: "current-password",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => passwordInput.value = $event),
                    onKeyup: withKeys(submitPassword, ["enter"]),
                    class: normalizeClass(["block w-full px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 password-input", __props.darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-offset-gray-800" : "border-gray-300 text-gray-900 focus:ring-offset-white"]),
                    placeholder: "请输入密码"
                  }, null, 42, _hoisted_13), [
                    [vModelDynamic, passwordInput.value]
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
                error.value ? (openBlock(), createElementBlock("p", _hoisted_14, toDisplayString(error.value), 1)) : createCommentVNode("", true)
              ]),
              createBaseVNode("button", {
                onClick: submitPassword,
                class: normalizeClass(["w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500", __props.darkMode ? "focus:ring-offset-gray-800" : "focus:ring-offset-white"])
              }, " 提交 ", 2)
            ], 2)
          ])) : createCommentVNode("", true),
          error.value && error.value.includes("成功") ? (openBlock(), createElementBlock("div", {
            key: 4,
            class: normalizeClass(["mt-4 p-4 rounded-md", __props.darkMode ? "bg-green-900/30" : "bg-green-50"])
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["text-sm", __props.darkMode ? "text-green-200" : "text-green-700"])
            }, toDisplayString(error.value), 3)
          ], 2)) : createCommentVNode("", true),
          paste.value && !needPassword.value && !(error.value && !error.value.includes("成功") && !needPassword.value) ? (openBlock(), createElementBlock("div", _hoisted_15, [
            createBaseVNode("div", {
              class: normalizeClass(["mb-6 p-5 border rounded-lg", __props.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
            }, [
              createBaseVNode("div", _hoisted_16, [
                paste.value.expires_at ? (openBlock(), createElementBlock("div", _hoisted_17, [
                  createBaseVNode("span", {
                    class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
                  }, "过期时间:", 2),
                  createBaseVNode("span", {
                    class: normalizeClass(["ml-2", [__props.darkMode ? "text-white" : "text-gray-900", unref(isExpired)(paste.value.expires_at) ? "text-red-500" : ""]])
                  }, toDisplayString(unref(formatExpiry)(paste.value.expires_at)), 3)
                ])) : createCommentVNode("", true),
                paste.value.max_views ? (openBlock(), createElementBlock("div", _hoisted_18, [
                  createBaseVNode("span", {
                    class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500")
                  }, "剩余查看次数:", 2),
                  createBaseVNode("span", {
                    class: normalizeClass(["ml-2", [
                      __props.darkMode ? "text-white" : "text-gray-900",
                      paste.value.max_views - paste.value.views <= 5 ? "text-amber-500" : "",
                      paste.value.max_views - paste.value.views <= 1 ? "text-red-500" : ""
                    ]])
                  }, toDisplayString(paste.value.max_views - paste.value.views), 3)
                ])) : createCommentVNode("", true)
              ])
            ], 2),
            createBaseVNode("div", _hoisted_19, [
              viewMode.value !== "edit" ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["flex border rounded-md overflow-hidden", __props.darkMode ? "border-gray-700" : "border-gray-200"])
              }, [
                createBaseVNode("button", {
                  onClick: _cache[1] || (_cache[1] = ($event) => switchViewMode("preview")),
                  class: normalizeClass(["px-3 py-1.5 text-sm font-medium", [
                    viewMode.value === "preview" ? __props.darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900" : __props.darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-white text-gray-700 hover:bg-gray-50"
                  ]])
                }, " 预览 ", 2),
                createBaseVNode("button", {
                  onClick: _cache[2] || (_cache[2] = ($event) => switchViewMode("outline")),
                  class: normalizeClass(["px-3 py-1.5 text-sm font-medium", [
                    viewMode.value === "outline" ? __props.darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900" : __props.darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-white text-gray-700 hover:bg-gray-50"
                  ]])
                }, " 大纲 ", 2),
                createBaseVNode("button", {
                  onClick: _cache[3] || (_cache[3] = ($event) => toggleTextMode(false)),
                  class: normalizeClass(["px-3 py-1.5 text-sm font-medium", [
                    !isPlainTextMode.value ? __props.darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900" : __props.darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-white text-gray-700 hover:bg-gray-50"
                  ]])
                }, " MD ", 2),
                createBaseVNode("button", {
                  onClick: _cache[4] || (_cache[4] = ($event) => toggleTextMode(true)),
                  class: normalizeClass(["px-3 py-1.5 text-sm font-medium", [
                    isPlainTextMode.value ? __props.darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900" : __props.darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-white text-gray-700 hover:bg-gray-50"
                  ]])
                }, " TXT ", 2)
              ], 2)) : (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
              }, "编辑模式 - 请使用下方按钮保存或取消", 2)),
              viewMode.value !== "edit" ? (openBlock(), createElementBlock("div", _hoisted_20, [
                paste.value && paste.value.content ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  onClick: copyContentToClipboard,
                  class: normalizeClass(["px-4 py-1.5 text-sm font-medium border rounded-md", __props.darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-50"])
                }, " 复制内容 ", 2)) : createCommentVNode("", true),
                paste.value && paste.value.slug ? (openBlock(), createElementBlock("button", {
                  key: 1,
                  onClick: copyRawLink,
                  class: normalizeClass(["px-4 py-1.5 text-sm font-medium border rounded-md", __props.darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-50"])
                }, " raw ", 2)) : createCommentVNode("", true),
                isAdmin.value || hasApiKey.value && hasTextPermission.value && isCreator.value || unref(isDev) && forceShowEditButton.value ? (openBlock(), createElementBlock("button", {
                  key: 2,
                  onClick: _cache[5] || (_cache[5] = ($event) => switchViewMode("edit")),
                  class: normalizeClass(["px-4 py-1.5 text-sm font-medium border rounded-md", __props.darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-50"])
                }, " 编辑内容 ", 2)) : createCommentVNode("", true)
              ])) : createCommentVNode("", true),
              unref(isDev) ? (openBlock(), createElementBlock("div", _hoisted_21, [
                createBaseVNode("button", {
                  onClick: toggleDebug,
                  class: normalizeClass(["text-xs px-2 py-1 mr-2 rounded transition-colors", enableDebug.value ? "bg-yellow-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"])
                }, toDisplayString(enableDebug.value ? "隐藏调试" : "调试"), 3),
                createBaseVNode("button", {
                  onClick: toggleForceEditButton,
                  class: normalizeClass(["text-xs px-2 py-1 rounded transition-colors", forceShowEditButton.value ? "bg-pink-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"])
                }, toDisplayString(forceShowEditButton.value ? "取消强制编辑" : "强制编辑"), 3)
              ])) : createCommentVNode("", true)
            ]),
            enableDebug.value && paste.value && paste.value.content ? (openBlock(), createElementBlock("div", _hoisted_22, [
              createBaseVNode("details", _hoisted_23, [
                _cache[10] || (_cache[10] = createBaseVNode("summary", { class: "cursor-pointer text-yellow-700 dark:text-yellow-300" }, "调试信息", -1)),
                createBaseVNode("div", _hoisted_24, [
                  createBaseVNode("div", null, "内容长度: " + toDisplayString(paste.value.content?.length || 0) + "字符", 1),
                  createBaseVNode("div", null, "预览组件: " + toDisplayString(previewRef.value ? "已引用" : "未引用"), 1),
                  createBaseVNode("div", null, "大纲项数: " + toDisplayString(outlineData.value.length), 1),
                  createBaseVNode("div", null, "是否管理员: " + toDisplayString(isAdmin.value ? "是" : "否"), 1),
                  createBaseVNode("div", null, "是否有API密钥: " + toDisplayString(hasApiKey.value ? "是" : "否"), 1),
                  createBaseVNode("div", null, "是否有文本权限: " + toDisplayString(hasTextPermission.value ? "是" : "否"), 1),
                  createBaseVNode("div", null, "是否为创建者: " + toDisplayString(isCreator.value ? "是" : "否"), 1),
                  createBaseVNode("div", null, "强制显示编辑按钮: " + toDisplayString(forceShowEditButton.value ? "是" : "否"), 1),
                  createBaseVNode("div", null, "当前模式: " + toDisplayString(viewMode.value), 1),
                  createBaseVNode("div", null, "显示格式: " + toDisplayString(isPlainTextMode.value ? "TXT模式" : "MD渲染模式"), 1),
                  createBaseVNode("div", null, "内容前20字符: " + toDisplayString(paste.value.content?.substring(0, 20)) + "...", 1),
                  createBaseVNode("div", null, "创建者信息: " + toDisplayString(paste.value.created_by || "无"), 1)
                ])
              ])
            ])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["border rounded-lg shadow-sm overflow-hidden", __props.darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"])
            }, [
              viewMode.value === "preview" ? (openBlock(), createElementBlock("div", _hoisted_25, [
                createVNode(PasteViewPreview, {
                  ref_key: "previewRef",
                  ref: previewRef,
                  "dark-mode": __props.darkMode,
                  content: paste.value.content,
                  "is-dev": unref(isDev),
                  "enable-debug": enableDebug.value,
                  "is-plain-text-mode": isPlainTextMode.value,
                  onRendered: handlePreviewRendered
                }, null, 8, ["dark-mode", "content", "is-dev", "enable-debug", "is-plain-text-mode"])
              ])) : viewMode.value === "outline" ? (openBlock(), createElementBlock("div", _hoisted_26, [
                createVNode(unref(PasteViewOutline), {
                  "dark-mode": __props.darkMode,
                  "outline-data": outlineData.value,
                  "outline-tree-data": outlineTreeData.value,
                  content: paste.value.content,
                  "is-dev": unref(isDev),
                  "enable-debug": enableDebug.value,
                  onHeadingClick: scrollToHeading
                }, {
                  content: withCtx(() => [
                    createBaseVNode("div", _hoisted_27, [
                      createVNode(PasteViewPreview, {
                        "dark-mode": __props.darkMode,
                        content: paste.value.content,
                        "is-dev": unref(isDev),
                        "enable-debug": enableDebug.value,
                        "is-plain-text-mode": isPlainTextMode.value,
                        onRendered: handlePreviewRendered
                      }, null, 8, ["dark-mode", "content", "is-dev", "enable-debug", "is-plain-text-mode"])
                    ])
                  ]),
                  _: 1
                }, 8, ["dark-mode", "outline-data", "outline-tree-data", "content", "is-dev", "enable-debug"])
              ])) : viewMode.value === "edit" ? (openBlock(), createElementBlock("div", _hoisted_28, [
                createVNode(unref(PasteViewEditor), {
                  "dark-mode": __props.darkMode,
                  content: editContent.value,
                  paste: paste.value,
                  loading: loading.value,
                  error: error.value,
                  "is-dev": unref(isDev),
                  "enable-debug": enableDebug.value,
                  onSave: saveEdit,
                  onCancel: cancelEdit,
                  "onUpdate:error": _cache[6] || (_cache[6] = (val) => error.value = val)
                }, null, 8, ["dark-mode", "content", "paste", "loading", "error", "is-dev", "enable-debug"])
              ])) : createCommentVNode("", true)
            ], 2)
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
};
const PasteViewMain = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-d5c1dcc9"]]);
const _sfc_main = {
  __name: "PasteView",
  props: {
    // 文本分享的唯一标识符
    slug: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const { isDarkMode: darkMode } = useThemeMode();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(PasteViewMain, {
        "dark-mode": unref(darkMode),
        slug: __props.slug
      }, null, 8, ["dark-mode", "slug"]);
    };
  }
};
const PasteView = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));
export {
  PasteView as P,
  debugLog as d,
  getInputClasses as g
};
