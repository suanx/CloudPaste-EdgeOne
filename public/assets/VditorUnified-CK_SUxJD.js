import { aK as _export_sfc, aN as useCssVars, e as useI18n, aO as useBreakpoints, c as createLogger, g as ref, w as watch, o as onMounted, aP as nextTick, ax as onUnmounted, j as createElementBlock, k as openBlock, q as withDirectives, z as createVNode, v as vModelText, n as normalizeClass, ar as mergeProps, y as unref, aQ as breakpointsTailwind, aR as loadVditor, aS as VDITOR_ASSETS_BASE } from "./index-BQxzU9F1.js";
import { u as useConfirmDialog, _ as _sfc_main$1 } from "./useConfirmDialog-c5dcTgIB.js";
const _hoisted_1 = { class: "vditor-editor-wrapper" };
const _hoisted_2 = ["placeholder"];
const _sfc_main = {
  __name: "VditorUnified",
  props: {
    darkMode: {
      type: Boolean,
      default: false
    },
    isPlainTextMode: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ""
    },
    miniMode: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue", "editor-ready", "content-change", "import-file", "clear-content", "show-copy-formats"],
  setup(__props, { expose: __expose, emit: __emit }) {
    useCssVars((_ctx) => ({
      "a2533e94": props.darkMode ? "#d4d4d4" : "#374151",
      "09e8bca6": props.darkMode ? "transparent" : ""
    }));
    const { t } = useI18n();
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const isMobileScreen = breakpoints.smaller("md");
    const { dialogState, confirm, handleConfirm, handleCancel } = useConfirmDialog();
    const log = createLogger("VditorUnified");
    const getOptimizedEmojis = () => ({
      // 基本表情 (20个)
      smile: "😊",
      joy: "😂",
      laughing: "😆",
      wink: "😉",
      heart_eyes: "😍",
      thinking: "🤔",
      worried: "😟",
      cry: "😢",
      angry: "😠",
      sunglasses: "😎",
      // 手势表情 (10个)
      thumbsup: "👍",
      thumbsdown: "👎",
      ok_hand: "👌",
      clap: "👏",
      muscle: "💪",
      // 心形表情 (5个)
      heart: "❤️",
      yellow_heart: "💛",
      green_heart: "💚",
      blue_heart: "💙",
      broken_heart: "💔",
      // 符号表情 (10个)
      check: "✅",
      x: "❌",
      warning: "⚠️",
      question: "❓",
      exclamation: "❗",
      star: "⭐",
      fire: "🔥",
      zap: "⚡",
      rocket: "🚀",
      bulb: "💡"
    });
    const props = __props;
    const emit = __emit;
    const confirmClearContent = () => {
      confirm({
        title: t("common.dialogs.warningTitle"),
        message: t("markdown.messages.confirmClearContent"),
        confirmType: "warning",
        darkMode: props.darkMode
      }).then((ok) => {
        if (ok) emit("clear-content");
      });
    };
    let editor = null;
    let isUnmounted = false;
    const vditorId = `vditor-${Math.random().toString(16).slice(2)}-${Date.now()}`;
    const plainTextContent = ref("");
    const originalPlainTextContent = ref("");
    let lastKnownValue = "";
    const getEditorConfig = () => {
      const editorTheme = props.darkMode ? "dark" : "classic";
      const contentTheme = props.darkMode ? "dark" : "light";
      const isMobile = isMobileScreen.value;
      const defaultMode = isMobile || props.miniMode ? "ir" : "sv";
      const enableOutline = !isMobile && !props.miniMode;
      const miniToolbar = [
        "bold",
        "italic",
        "strike",
        "|",
        "list",
        "ordered-list",
        "|",
        "link",
        "quote",
        "line",
        "|",
        "undo",
        "redo",
        {
          name: "clear-content-mini",
          icon: '<svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path></svg>',
          tip: t("markdown.toolbar.clearContent"),
          click() {
            confirmClearContent();
          }
        },
        "|",
        "fullscreen",
        "edit-mode"
      ];
      const fullToolbar = [
        "emoji",
        "headings",
        "bold",
        "italic",
        "strike",
        "link",
        "|",
        "list",
        "ordered-list",
        "check",
        "outdent",
        "indent",
        "|",
        "quote",
        "line",
        "code",
        "inline-code",
        "insert-before",
        "insert-after",
        "|",
        // "upload",
        "table",
        "|",
        "undo",
        "redo",
        "|",
        {
          name: "import-markdown",
          icon: '<svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"></path></svg>',
          tip: t("markdown.toolbar.importFile"),
          click() {
            emit("import-file");
          }
        },
        {
          name: "clear-content",
          icon: '<svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path></svg>',
          tip: t("markdown.toolbar.clearContent"),
          click() {
            confirmClearContent();
          }
        },
        {
          name: "copy-formats",
          icon: '<svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>',
          tip: t("markdown.toolbar.copyFormats"),
          click(event) {
            const buttonElement = event.target.closest(".vditor-tooltipped");
            if (buttonElement) {
              const rect = buttonElement.getBoundingClientRect();
              emit("show-copy-formats", {
                x: rect.left,
                y: rect.bottom + 5
              });
            } else {
              emit("show-copy-formats");
            }
          }
        },
        "|",
        "fullscreen",
        "edit-mode",
        "both",
        "outline",
        "preview",
        "export",
        "help"
      ];
      return {
        height: props.miniMode ? 250 : 600,
        minHeight: props.miniMode ? 200 : 400,
        width: "100%",
        mode: defaultMode,
        // 保持原有的响应式模式逻辑
        theme: editorTheme,
        cdn: VDITOR_ASSETS_BASE,
        resize: {
          enable: true,
          position: "bottom"
        },
        counter: {
          enable: !props.miniMode,
          // Mini 模式不显示计数器
          type: "text"
        },
        tab: "	",
        indent: {
          tab: "	",
          codeBlock: 4
        },
        preview: {
          delay: props.miniMode ? 300 : 800,
          // Mini 模式更快的预览响应
          maxWidth: 800,
          mode: "both",
          theme: {
            current: contentTheme,
            path: `${VDITOR_ASSETS_BASE}/dist/css/content-theme`
          },
          hljs: {
            lineNumber: !props.miniMode,
            // Mini 模式不显示行号
            style: props.darkMode ? "vs2015" : "github",
            js: `${VDITOR_ASSETS_BASE}/dist/js/highlight.js/third-languages.js`,
            css: (style) => `${VDITOR_ASSETS_BASE}/dist/js/highlight.js/styles/${style}.min.css`
          },
          actions: props.miniMode ? [] : ["desktop", "tablet", "mobile", "mp-wechat", "zhihu"],
          markdown: {
            toc: !props.miniMode,
            // Mini 模式不需要目录
            mark: true,
            footnotes: !props.miniMode,
            autoSpace: true,
            listStyle: true,
            task: true,
            paragraphBeginningSpace: true,
            fixTermTypo: true,
            media: !props.miniMode,
            // Mini 模式不需要媒体支持
            mermaid: {
              theme: props.darkMode ? "dark" : "default",
              useMaxWidth: false
            }
          },
          math: {
            engine: "KaTeX",
            inlineDigit: true
          }
        },
        typewriterMode: !props.miniMode,
        // Mini 模式关闭打字机模式
        outline: {
          enable: enableOutline,
          position: "left"
        },
        hint: {
          delay: 200,
          emoji: props.miniMode ? {} : getOptimizedEmojis()
          // Mini 模式简化表情
        },
        toolbar: props.miniMode ? miniToolbar : fullToolbar,
        placeholder: props.placeholder || t("markdown.editorPlaceholder"),
        cache: props.miniMode ? {
          enable: false
        } : {
          enable: true,
          id: "cloudpaste-editor",
          after: (html) => {
            return html;
          }
        },
        upload: props.miniMode ? false : {
          accept: "image/*,.zip,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
          token: "",
          linkToImgUrl: "/api/fetch?url=",
          filename(name) {
            return name.replace(/\W/g, "");
          }
        },
        after: () => {
          emit("editor-ready", editor);
        },
        input: () => {
          try {
            if (editor && editor.getValue && typeof editor.getValue === "function") {
              const content = editor.getValue();
              if (content !== lastKnownValue) {
                lastKnownValue = content;
                emit("update:modelValue", content);
                emit("content-change", content);
              }
            }
          } catch (error) {
            log.error("获取编辑器内容时出错:", error);
          }
        },
        customKeymap: {
          Tab: () => {
            return false;
          }
        }
      };
    };
    const initEditor = async () => {
      if (isUnmounted) return;
      const vditorContainer = document.getElementById(vditorId);
      if (!vditorContainer) {
        log.error("找不到vditor容器元素，无法初始化编辑器");
        return;
      }
      try {
        const VditorConstructor = await loadVditor();
        const config = getEditorConfig();
        if (isUnmounted) return;
        editor = new VditorConstructor(vditorId, config);
      } catch (error) {
        log.error("Vditor编辑器初始化失败:", error);
      }
    };
    const safeSetValue = (content) => {
      if (!editor || !editor.setValue || typeof editor.setValue !== "function") return;
      setTimeout(() => {
        if (editor && editor.setValue && typeof editor.setValue === "function") {
          try {
            editor.setValue(content);
          } catch (error) {
            log.error("设置编辑器内容失败:", error);
          }
        }
      }, 500);
    };
    const syncContentFromPlainText = () => {
      originalPlainTextContent.value = plainTextContent.value;
      emit("update:modelValue", plainTextContent.value);
      emit("content-change", plainTextContent.value);
    };
    const getValue = () => {
      if (props.isPlainTextMode) {
        return originalPlainTextContent.value || plainTextContent.value;
      } else if (editor && editor.getValue && typeof editor.getValue === "function") {
        try {
          return editor.getValue();
        } catch (error) {
          log.error("获取编辑器内容时出错:", error);
          return "";
        }
      }
      return "";
    };
    const setValue = (content) => {
      plainTextContent.value = content;
      originalPlainTextContent.value = content;
      if (!props.isPlainTextMode) {
        safeSetValue(content);
      }
    };
    const getHTML = () => {
      if (editor && editor.getHTML && typeof editor.getHTML === "function") {
        try {
          return editor.getHTML();
        } catch (error) {
          log.error("获取HTML内容时出错:", error);
          return "";
        }
      }
      return "";
    };
    const clearContent = () => {
      if (!props.isPlainTextMode) {
        safeSetValue("");
      }
      plainTextContent.value = "";
      originalPlainTextContent.value = "";
      emit("update:modelValue", "");
      emit("content-change", "");
    };
    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue !== lastKnownValue) {
          setValue(newValue);
          lastKnownValue = newValue;
        }
      },
      { immediate: true }
    );
    watch(
      () => props.darkMode,
      async (newDarkMode, oldDarkMode) => {
        if (!props.isPlainTextMode && editor && newDarkMode !== oldDarkMode) {
          try {
            let currentValue = "";
            if (editor && editor.getValue && typeof editor.getValue === "function") {
              try {
                currentValue = editor.getValue();
              } catch (e) {
                log.warn("获取编辑器内容失败，使用空内容:", e);
                currentValue = "";
              }
            }
            if (editor.destroy) {
              editor.destroy();
            }
            editor = null;
            await initEditor();
            if (currentValue) {
              safeSetValue(currentValue);
            }
          } catch (error) {
            log.error("切换主题时出错:", error);
          }
        }
      }
    );
    watch(
      () => props.isPlainTextMode,
      async (newMode, oldMode) => {
        if (!newMode && oldMode !== newMode) {
          await nextTick();
          if (editor) {
            try {
              if (editor.destroy) {
                editor.destroy();
              }
            } catch (e) {
              log.error("销毁编辑器时出错:", e);
            }
            editor = null;
          }
          const initializeEditor = async () => {
            try {
              await initEditor();
              const contentToSet = plainTextContent.value || "";
              if (contentToSet) {
                safeSetValue(contentToSet);
              }
            } catch (error) {
              log.error("初始化编辑器时出错:", error);
            }
          };
          if (window.requestIdleCallback) {
            window.requestIdleCallback(initializeEditor, { timeout: 1e3 });
          } else {
            setTimeout(initializeEditor, 100);
          }
        }
      }
    );
    onMounted(async () => {
      if (!props.isPlainTextMode) {
        await nextTick();
        const initializeEditor = async () => {
          try {
            if (isUnmounted) return;
            await initEditor();
            if (props.modelValue && editor) {
              safeSetValue(props.modelValue);
            }
          } catch (error) {
            log.error("初始化编辑器时出错:", error);
          }
        };
        if (window.requestIdleCallback) {
          window.requestIdleCallback(initializeEditor, { timeout: 1e3 });
        } else {
          setTimeout(initializeEditor, 100);
        }
      } else {
        plainTextContent.value = props.modelValue;
        originalPlainTextContent.value = props.modelValue;
      }
    });
    onUnmounted(() => {
      isUnmounted = true;
      if (!props.isPlainTextMode && editor) {
        try {
          if (editor.destroy && editor.element) {
            editor.destroy();
          }
          editor = null;
        } catch (e) {
          log.warn("销毁编辑器时发生错误:", e);
          editor = null;
        }
      }
    });
    __expose({
      getValue,
      setValue,
      getHTML,
      clearContent,
      editor: () => editor
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        __props.isPlainTextMode ? withDirectives((openBlock(), createElementBlock("textarea", {
          key: 0,
          class: normalizeClass([
            "w-full p-4 font-mono text-base border rounded-lg resize-y focus:outline-none focus:ring-2",
            __props.miniMode ? "h-[250px]" : "h-[600px]",
            __props.darkMode ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-primary-600" : "bg-white border-gray-300 text-gray-900 focus:ring-primary-500"
          ]),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => plainTextContent.value = $event),
          placeholder: __props.placeholder || _ctx.$t("markdown.plainTextPlaceholder"),
          onInput: syncContentFromPlainText
        }, null, 42, _hoisted_2)), [
          [vModelText, plainTextContent.value]
        ]) : (openBlock(), createElementBlock("div", {
          key: 1,
          id: vditorId,
          class: normalizeClass(["w-full border rounded-lg", __props.darkMode ? "border-gray-700" : "border-gray-200"])
        }, null, 2)),
        createVNode(_sfc_main$1, mergeProps(unref(dialogState), {
          onConfirm: unref(handleConfirm),
          onCancel: unref(handleCancel)
        }), null, 16, ["onConfirm", "onCancel"])
      ]);
    };
  }
};
const VditorUnified = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f835bb18"]]);
export {
  VditorUnified as V
};
