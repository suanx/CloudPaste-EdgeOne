const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/markdownToWord-7ASpIkki.js","assets/index-BQxzU9F1.js","assets/snapdomCapture-U4IMZ2vT.js","assets/FileSaver.min-CQ6SkgWv.js"])))=>i.map(i=>d[i]);
import { aK as _export_sfc, aN as useCssVars, e as useI18n, r as reactive, g as ref, j as createElementBlock, k as openBlock, l as createBaseVNode, q as withDirectives, n as normalizeClass, t as toDisplayString, v as vModelText, ae as vModelSelect, p as createCommentVNode, c as createLogger, u as useEventListener, z as createVNode, y as unref, b4 as IconDocumentText, bF as IconCode, H as IconDownload, aD as normalizeStyle, _ as __vitePreload, f as useAuthStore, Y as useGlobalMessage, i as useLocalStorage, Z as useTimeoutFn, F as computed, o as onMounted, ax as onUnmounted, W as useDebounceFn } from "./index-BQxzU9F1.js";
import { u as usePasteService } from "./pasteService-CHRbddSC.js";
import { c as copyToClipboard } from "./clipboard-GLHRBPpJ.js";
import "./useAdminBase-CxkodUK-.js";
import "./storageConfigsStore-DUFoycii.js";
import { e as formatNowForFilename } from "./timeUtils-D81jJILb.js";
import { V as VditorUnified } from "./VditorUnified-CK_SUxJD.js";
import { P as PermissionManager } from "./PermissionManager-BpGELUYQ.js";
import { S as ShareLinkBox, Q as QRCodeModal } from "./QRCodeModal-BUayVXNJ.js";
import { a as FileSaver_minExports } from "./FileSaver.min-CQ6SkgWv.js";
import "./useConfirmDialog-c5dcTgIB.js";
import "./qrcodeUtils-xDdVh-90.js";
const _hoisted_1$1 = { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-2" };
const _hoisted_2$1 = { class: "form-group" };
const _hoisted_3$1 = ["placeholder", "disabled"];
const _hoisted_4$1 = { class: "form-group" };
const _hoisted_5$1 = ["placeholder", "disabled"];
const _hoisted_6 = { class: "form-group" };
const _hoisted_7 = ["placeholder", "disabled"];
const _hoisted_8 = {
  key: 1,
  class: "mt-1 text-xs text-gray-500 dark:text-gray-400"
};
const _hoisted_9 = { class: "form-group" };
const _hoisted_10 = ["placeholder", "disabled"];
const _hoisted_11 = { class: "form-group" };
const _hoisted_12 = ["disabled"];
const _hoisted_13 = { value: "1" };
const _hoisted_14 = { value: "24" };
const _hoisted_15 = { value: "168" };
const _hoisted_16 = { value: "720" };
const _hoisted_17 = { value: "0" };
const _hoisted_18 = { class: "form-group" };
const _hoisted_19 = ["placeholder", "disabled"];
const _hoisted_20 = { class: "form-group" };
const _hoisted_21 = { class: "flex items-center mt-2" };
const _hoisted_22 = ["disabled"];
const _hoisted_23 = { class: "submit-section mt-4 flex flex-row items-center gap-4" };
const _hoisted_24 = ["disabled"];
const _hoisted_25 = {
  key: 0,
  class: "saving-status ml-auto text-sm"
};
const _sfc_main$2 = {
  __name: "EditorForm",
  props: {
    darkMode: {
      type: Boolean,
      default: false
    },
    hasPermission: {
      type: Boolean,
      default: false
    },
    isSubmitting: {
      type: Boolean,
      default: false
    },
    savingStatus: {
      type: String,
      default: ""
    }
  },
  emits: ["submit", "form-change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    useCssVars((_ctx) => ({
      "6fe1fb5a": props.darkMode ? "#3b82f6" : "#2563eb",
      "2f47748a": props.darkMode ? "#2563eb" : "#1d4ed8"
    }));
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const formData = reactive({
      title: "",
      remark: "",
      customLink: "",
      password: "",
      expiry_time: "0",
      max_views: 0,
      is_public: true
    });
    const slugError = ref("");
    const validateCustomLink = () => {
      slugError.value = "";
      if (!formData.customLink) {
        emit("form-change", { ...formData, isValid: true });
        return true;
      }
      const slugRegex = /^[a-zA-Z0-9._-]+$/;
      if (!slugRegex.test(formData.customLink)) {
        slugError.value = t("markdown.validation.slugInvalid");
        emit("form-change", { ...formData, isValid: false });
        return false;
      }
      emit("form-change", { ...formData, isValid: true });
      return true;
    };
    const validateMaxViews = (event) => {
      const value = event.target.value;
      if (value < 0) {
        formData.max_views = 0;
        return;
      }
      if (value.toString().includes(".")) {
        formData.max_views = parseInt(value);
      }
      if (isNaN(value) || value === "") {
        formData.max_views = 0;
      } else {
        formData.max_views = parseInt(value);
      }
      emit("form-change", { ...formData, isValid: !slugError.value });
    };
    const getInputClasses = () => {
      return props.darkMode ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-primary-600 focus:border-primary-600" : "bg-white border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500";
    };
    const isErrorMessage = (message) => {
      const errorKeywords = [
        t("markdown.messages.createFailed"),
        t("markdown.messages.linkOccupied"),
        t("common.noPermission"),
        t("markdown.messages.contentTooLarge"),
        t("markdown.messages.unknownError"),
        t("markdown.copyFailed"),
        "失败",
        "错误",
        "不能"
        // 保留中文关键词作为后备
      ];
      return errorKeywords.some((keyword) => message.includes(keyword));
    };
    const handleSubmit = () => {
      if (!validateCustomLink()) {
        return;
      }
      emit("submit", { ...formData });
    };
    const resetForm = () => {
      formData.title = "";
      formData.remark = "";
      formData.customLink = "";
      formData.password = "";
      formData.expiry_time = "0";
      formData.max_views = 0;
      formData.is_public = true;
      slugError.value = "";
    };
    const getFormData = () => {
      return { ...formData };
    };
    const setFormData = (data) => {
      Object.assign(formData, data);
    };
    __expose({
      resetForm,
      getFormData,
      setFormData,
      validateCustomLink
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["editor-form mt-4 border-t pt-3 w-full overflow-hidden", __props.darkMode ? "border-gray-700" : "border-gray-200"])
      }, [
        createBaseVNode("div", _hoisted_1$1, [
          createBaseVNode("div", _hoisted_2$1, [
            createBaseVNode("label", {
              class: normalizeClass(["form-label", __props.darkMode ? "text-gray-300" : "text-gray-700"])
            }, toDisplayString(_ctx.$t("markdown.form.title")), 3),
            withDirectives(createBaseVNode("input", {
              type: "text",
              class: normalizeClass(["form-input", getInputClasses()]),
              placeholder: _ctx.$t("markdown.form.titlePlaceholder"),
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.title = $event),
              disabled: !__props.hasPermission
            }, null, 10, _hoisted_3$1), [
              [vModelText, formData.title]
            ])
          ]),
          createBaseVNode("div", _hoisted_4$1, [
            createBaseVNode("label", {
              class: normalizeClass(["form-label", __props.darkMode ? "text-gray-300" : "text-gray-700"])
            }, toDisplayString(_ctx.$t("markdown.form.remark")), 3),
            withDirectives(createBaseVNode("input", {
              type: "text",
              class: normalizeClass(["form-input", getInputClasses()]),
              placeholder: _ctx.$t("markdown.form.remarkPlaceholder"),
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => formData.remark = $event),
              disabled: !__props.hasPermission
            }, null, 10, _hoisted_5$1), [
              [vModelText, formData.remark]
            ])
          ]),
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("label", {
              class: normalizeClass(["form-label", __props.darkMode ? "text-gray-300" : "text-gray-700"])
            }, toDisplayString(_ctx.$t("markdown.form.customLink")), 3),
            withDirectives(createBaseVNode("input", {
              type: "text",
              class: normalizeClass(["form-input", [getInputClasses(), slugError.value ? __props.darkMode ? "border-red-500" : "border-red-600" : ""]]),
              placeholder: _ctx.$t("markdown.form.customLinkPlaceholder"),
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => formData.customLink = $event),
              disabled: !__props.hasPermission,
              onInput: validateCustomLink
            }, null, 42, _hoisted_7), [
              [vModelText, formData.customLink]
            ]),
            slugError.value ? (openBlock(), createElementBlock("p", {
              key: 0,
              class: normalizeClass(["mt-1 text-sm", __props.darkMode ? "text-red-400" : "text-red-600"])
            }, toDisplayString(slugError.value), 3)) : (openBlock(), createElementBlock("p", _hoisted_8, toDisplayString(_ctx.$t("markdown.validation.slugInvalid")), 1))
          ]),
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("label", {
              class: normalizeClass(["form-label", __props.darkMode ? "text-gray-300" : "text-gray-700"])
            }, toDisplayString(_ctx.$t("markdown.form.password")), 3),
            withDirectives(createBaseVNode("input", {
              type: "text",
              class: normalizeClass(["form-input", getInputClasses()]),
              placeholder: _ctx.$t("markdown.form.passwordPlaceholder"),
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => formData.password = $event),
              disabled: !__props.hasPermission
            }, null, 10, _hoisted_10), [
              [vModelText, formData.password]
            ])
          ]),
          createBaseVNode("div", _hoisted_11, [
            createBaseVNode("label", {
              class: normalizeClass(["form-label", __props.darkMode ? "text-gray-300" : "text-gray-700"])
            }, toDisplayString(_ctx.$t("markdown.form.expiryTime")), 3),
            withDirectives(createBaseVNode("select", {
              class: normalizeClass(["form-input", getInputClasses()]),
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => formData.expiry_time = $event),
              disabled: !__props.hasPermission
            }, [
              createBaseVNode("option", _hoisted_13, "1 " + toDisplayString(_ctx.$t("markdown.form.expiryHour")), 1),
              createBaseVNode("option", _hoisted_14, "1 " + toDisplayString(_ctx.$t("markdown.form.expiryDay")), 1),
              createBaseVNode("option", _hoisted_15, "7 " + toDisplayString(_ctx.$t("markdown.form.expiryDay")), 1),
              createBaseVNode("option", _hoisted_16, "30 " + toDisplayString(_ctx.$t("markdown.form.expiryDay")), 1),
              createBaseVNode("option", _hoisted_17, toDisplayString(_ctx.$t("markdown.form.expiryNever")), 1)
            ], 10, _hoisted_12), [
              [vModelSelect, formData.expiry_time]
            ])
          ]),
          createBaseVNode("div", _hoisted_18, [
            createBaseVNode("label", {
              class: normalizeClass(["form-label", __props.darkMode ? "text-gray-300" : "text-gray-700"])
            }, toDisplayString(_ctx.$t("markdown.form.maxViews")), 3),
            withDirectives(createBaseVNode("input", {
              type: "number",
              min: "0",
              step: "1",
              pattern: "\\d*",
              class: normalizeClass(["form-input", getInputClasses()]),
              placeholder: _ctx.$t("markdown.form.maxViewsPlaceholder"),
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => formData.max_views = $event),
              onInput: validateMaxViews,
              disabled: !__props.hasPermission
            }, null, 42, _hoisted_19), [
              [
                vModelText,
                formData.max_views,
                void 0,
                { number: true }
              ]
            ])
          ]),
          createBaseVNode("div", _hoisted_20, [
            createBaseVNode("label", {
              class: normalizeClass(["form-label", __props.darkMode ? "text-gray-300" : "text-gray-700"])
            }, toDisplayString(_ctx.$t("markdown.form.visibility")), 3),
            createBaseVNode("div", _hoisted_21, [
              createBaseVNode("button", {
                type: "button",
                onClick: _cache[6] || (_cache[6] = ($event) => formData.is_public = !formData.is_public),
                disabled: !__props.hasPermission,
                class: normalizeClass(["relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2", [
                  formData.is_public ? "bg-primary-600" : __props.darkMode ? "bg-gray-700" : "bg-gray-200",
                  !__props.hasPermission ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                ]])
              }, [
                createBaseVNode("span", {
                  class: normalizeClass(["inline-block h-4 w-4 transform rounded-full bg-white transition-transform", formData.is_public ? "translate-x-6" : "translate-x-1"])
                }, null, 2)
              ], 10, _hoisted_22),
              createBaseVNode("span", {
                class: normalizeClass(["ml-3 text-sm", __props.darkMode ? "text-gray-300" : "text-gray-700"])
              }, toDisplayString(formData.is_public ? _ctx.$t("markdown.form.publicAccess") : "私密"), 3)
            ]),
            createBaseVNode("p", {
              class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-500" : "text-gray-400"])
            }, toDisplayString(_ctx.$t("markdown.form.publicAccessHelper")), 3)
          ])
        ]),
        createBaseVNode("div", _hoisted_23, [
          createBaseVNode("button", {
            class: "btn-primary",
            onClick: handleSubmit,
            disabled: __props.isSubmitting || !__props.hasPermission
          }, toDisplayString(__props.isSubmitting ? _ctx.$t("markdown.form.creating") : _ctx.$t("markdown.form.createShare")), 9, _hoisted_24),
          __props.savingStatus ? (openBlock(), createElementBlock("div", _hoisted_25, [
            createBaseVNode("span", {
              class: normalizeClass([isErrorMessage(__props.savingStatus) ? __props.darkMode ? "text-red-400" : "text-red-600" : __props.darkMode ? "text-gray-300" : "text-gray-600"])
            }, toDisplayString(__props.savingStatus), 3)
          ])) : createCommentVNode("", true)
        ])
      ], 2);
    };
  }
};
const EditorForm = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-11c65b08"]]);
const _sfc_main$1 = {
  __name: "CopyFormatMenu",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    position: {
      type: Object,
      default: () => ({ x: 0, y: 0 })
    },
    editor: {
      type: Object,
      default: null
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close", "status-message"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const log = createLogger("CopyFormatMenu");
    const props = __props;
    const emit = __emit;
    const copyAsMarkdown = () => {
      if (!props.editor || typeof props.editor.getValue !== "function") {
        emit("status-message", t("markdown.messages.editorNotReady"));
        return;
      }
      const mdContent = props.editor.getValue();
      copyToClipboard$1(mdContent, t("markdown.markdownCopied"));
      emit("close");
    };
    const copyAsHTML = () => {
      if (!props.editor || typeof props.editor.getHTML !== "function") {
        emit("status-message", t("markdown.messages.editorNotReady"));
        return;
      }
      const htmlContent = props.editor.getHTML();
      copyToClipboard$1(htmlContent, t("markdown.htmlCopied"));
      emit("close");
    };
    const copyAsPlainText = () => {
      if (!props.editor || typeof props.editor.getHTML !== "function") {
        emit("status-message", t("markdown.messages.editorNotReady"));
        return;
      }
      const htmlContent = props.editor.getHTML();
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;
      const plainText = tempDiv.textContent || tempDiv.innerText || "";
      copyToClipboard$1(plainText, t("markdown.plainTextCopied"));
      emit("close");
    };
    const exportWordDocument = async () => {
      if (!props.editor || typeof props.editor.getValue !== "function") {
        emit("status-message", t("markdown.messages.editorNotReady"));
        return;
      }
      emit("status-message", t("markdown.messages.generatingWord"));
      try {
        const markdownContent = props.editor.getValue();
        if (!markdownContent) {
          emit("status-message", t("markdown.messages.contentEmpty"));
          return;
        }
        const { default: markdownToWord } = await __vitePreload(async () => {
          const { default: markdownToWord2 } = await import("./markdownToWord-7ASpIkki.js");
          return { default: markdownToWord2 };
        }, true ? __vite__mapDeps([0,1]) : void 0);
        const blob = await markdownToWord(markdownContent, {
          title: t("markdown.exportDocumentTitle")
        });
        const timestamp = formatNowForFilename();
        const fileName = `markdown-${timestamp}.docx`;
        FileSaver_minExports.saveAs(blob, fileName);
        emit("status-message", t("markdown.messages.wordExported"));
      } catch (error) {
        log.error("导出Word文档时出错:", error);
        emit("status-message", t("markdown.messages.wordExportFailed"));
      } finally {
        emit("close");
      }
    };
    const exportAsPng = async () => {
      if (!props.editor || typeof props.editor.getValue !== "function") {
        log.error("导出PNG失败：编辑器实例不存在");
        emit("status-message", t("markdown.messages.editorNotReady"));
        return;
      }
      emit("status-message", t("markdown.messages.exportingPng"));
      try {
        const timestamp = formatNowForFilename();
        const fileName = `markdown-${timestamp}.png`;
        const { editorContentToPng: snapdomEditorContentToPng } = await __vitePreload(async () => {
          const { editorContentToPng: snapdomEditorContentToPng2 } = await import("./snapdomCapture-U4IMZ2vT.js");
          return { editorContentToPng: snapdomEditorContentToPng2 };
        }, true ? __vite__mapDeps([2,1,3]) : void 0);
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        const result = await snapdomEditorContentToPng(props.editor, {
          filename: fileName,
          autoUseProxy: true,
          snapdomOptions: {
            backgroundColor: props.darkMode ? "#1e1e1e" : "#ffffff",
            cache: "auto",
            embedFonts: true,
            placeholders: true,
            outerTransforms: true
          },
          onSuccess: (dataUrl, blob) => {
            emit("status-message", t("markdown.messages.pngExported"));
          },
          onError: (error) => {
            log.error("导出PNG图片时出错:", error);
            if (error instanceof Event && error.type === "error" && error.target instanceof HTMLImageElement) {
              emit("status-message", t("markdown.messages.corsImageError"));
            } else {
              emit("status-message", t("markdown.messages.pngExportFailed") + ": " + (error.message || t("markdown.messages.unknownError")));
            }
          }
        });
        if (!result || !result.success) {
          const errorMsg = result && result.error instanceof Event && result.error.type === "error" && result.error.target instanceof HTMLImageElement ? t("markdown.messages.corsImageError") : t("markdown.messages.pngExportFailed");
          throw result?.error || new Error(errorMsg);
        }
        if (Array.isArray(result.warnings) && result.warnings.length > 0) {
          const proxyWarn = result.warnings.find((w) => w && w.code === "proxy_unavailable");
          if (proxyWarn) {
            emit("status-message", proxyWarn.message);
          }
        }
      } catch (error) {
        log.error("导出PNG图片过程中发生错误:", error);
        if (error instanceof Event && error.type === "error") {
          emit("status-message", t("markdown.messages.corsImageError"));
        } else {
          emit("status-message", t("markdown.messages.pngExportFailed"));
        }
      } finally {
        emit("close");
      }
    };
    const copyToClipboard$1 = async (text, successMessage) => {
      if (!text) {
        emit("status-message", t("markdown.messages.contentEmpty"));
        return;
      }
      try {
        const success = await copyToClipboard(text);
        if (success) {
          emit("status-message", successMessage);
        } else {
          throw new Error(t("markdown.copyFailed"));
        }
      } catch (e) {
        log.error("复制失败:", e);
        emit("status-message", t("markdown.copyFailed"));
      }
    };
    const handleGlobalClick = (event) => {
      const menu = document.getElementById("copyFormatMenu");
      if (menu && !menu.contains(event.target) && !event.target.closest('.vditor-toolbar button[data-type="copy-formats"]') && props.visible) {
        emit("close");
      }
    };
    useEventListener(document, "click", handleGlobalClick);
    return (_ctx, _cache) => {
      return __props.visible ? (openBlock(), createElementBlock("div", {
        key: 0,
        id: "copyFormatMenu",
        class: "vditor-hint vditor-panel--arrow absolute z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg",
        style: normalizeStyle({ top: `${__props.position.y}px`, left: `${__props.position.x}px`, display: "block" })
      }, [
        createBaseVNode("div", {
          class: "px-4 py-2 cursor-pointer flex items-center",
          onClick: copyAsMarkdown
        }, [
          createVNode(unref(IconDocumentText), {
            size: "sm",
            class: "mr-2",
            "aria-hidden": "true"
          }),
          createBaseVNode("span", null, toDisplayString(_ctx.$t("markdown.copyAsMarkdown")), 1)
        ]),
        createBaseVNode("div", {
          class: "px-4 py-2 cursor-pointer flex items-center",
          onClick: copyAsHTML
        }, [
          createVNode(unref(IconCode), {
            size: "sm",
            class: "mr-2",
            "aria-hidden": "true"
          }),
          createBaseVNode("span", null, toDisplayString(_ctx.$t("markdown.copyAsHTML")), 1)
        ]),
        createBaseVNode("div", {
          class: "px-4 py-2 cursor-pointer flex items-center",
          onClick: copyAsPlainText
        }, [
          createVNode(unref(IconDocumentText), {
            size: "sm",
            class: "mr-2",
            "aria-hidden": "true"
          }),
          createBaseVNode("span", null, toDisplayString(_ctx.$t("markdown.copyAsPlainText")), 1)
        ]),
        createBaseVNode("div", {
          class: "px-4 py-2 cursor-pointer flex items-center",
          onClick: exportWordDocument
        }, [
          createVNode(unref(IconDocumentText), {
            size: "sm",
            class: "mr-2",
            "aria-hidden": "true"
          }),
          createBaseVNode("span", null, toDisplayString(_ctx.$t("markdown.exportAsWord")), 1)
        ]),
        createBaseVNode("div", {
          class: "px-4 py-2 cursor-pointer flex items-center",
          onClick: exportAsPng
        }, [
          createVNode(unref(IconDownload), {
            size: "sm",
            class: "mr-2",
            "aria-hidden": "true"
          }),
          createBaseVNode("span", null, toDisplayString(_ctx.$t("markdown.exportAsPng")), 1)
        ])
      ], 4)) : createCommentVNode("", true);
    };
  }
};
const CopyFormatMenu = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-86675919"]]);
const _hoisted_1 = { class: "editor-container mx-auto px-3 sm:px-6 flex-1 flex flex-col pt-6 sm:pt-8 w-full max-w-full sm:max-w-6xl" };
const _hoisted_2 = { class: "flex justify-between items-center" };
const _hoisted_3 = { class: "text-xl font-semibold" };
const _hoisted_4 = { class: "editor-wrapper" };
const _hoisted_5 = { class: "flex flex-col md:flex-row gap-4" };
const _sfc_main = {
  __name: "MarkdownEditorView",
  props: {
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "ef50feb8": props.darkMode ? "#3b82f6" : "#2563eb",
      "00d1cb05": props.darkMode ? "#2563eb" : "#1d4ed8",
      "446fb252": props.darkMode ? "rgba(75, 85, 99, 0.3)" : "rgba(229, 231, 235, 0.8)"
    }));
    const { t } = useI18n();
    const log = createLogger("MarkdownEditor");
    const authStore = useAuthStore();
    const pasteService = usePasteService();
    const { showSuccess, showError, showWarning, showInfo } = useGlobalMessage();
    const props = __props;
    const editorRef = ref(null);
    const formRef = ref(null);
    const shareLinkRef = ref(null);
    const markdownImporter = ref(null);
    const savingStatus = ref("");
    const isSubmitting = ref(false);
    const shareLink = ref("");
    const currentSharePassword = ref("");
    const draftContent = useLocalStorage("cloudpaste-content", "");
    const clearSavingStatusDelayMs = ref(0);
    const { start: startClearSavingStatus, stop: stopClearSavingStatus } = useTimeoutFn(
      () => {
        savingStatus.value = "";
      },
      clearSavingStatusDelayMs,
      { immediate: false }
    );
    const rawShareLink = computed(() => {
      if (!shareLink.value) return "";
      const slug = shareLink.value.split("/").pop();
      return slug ? pasteService.getRawPasteUrl(slug, currentSharePassword.value || null) : "";
    });
    const formatCountdownText = (seconds) => t("markdown.linkExpireIn", { seconds });
    const isPlainTextMode = ref(false);
    const editorContent = ref("");
    const currentEditor = ref(null);
    const hasPermission = computed(() => authStore.hasTextSharePermission);
    const showQRCodeModal = ref(false);
    const copyFormatMenuVisible = ref(false);
    const copyFormatMenuPosition = ref({ x: 0, y: 0 });
    const handlePermissionChange = (hasPermissionValue) => {
      log.debug("权限状态变化", hasPermissionValue);
    };
    const handleEditorReady = (editor) => {
      currentEditor.value = editor;
      if (!editor || typeof editor.getValue !== "function" || typeof editor.getHTML !== "function") {
        log.error("Editor instance validation failed, missing required methods");
      }
    };
    const handleContentChange = (content) => {
      editorContent.value = content;
      autoSaveDebounce();
    };
    const handleFormChange = (formData) => {
      log.debug("Form data changed:", formData);
    };
    const handleStatusMessage = (payload) => {
      const message = typeof payload === "string" ? payload : payload?.message;
      const type = typeof payload === "object" && payload?.type ? payload.type : "info";
      if (!message) return;
      savingStatus.value = message;
      if (type === "error") {
        showError(message);
      } else if (type === "success") {
        showSuccess(message);
      } else if (type === "warning") {
        showWarning(message);
      } else {
        showInfo(message);
      }
      stopClearSavingStatus();
      clearSavingStatusDelayMs.value = type === "error" ? 4e3 : 3e3;
      startClearSavingStatus();
    };
    const handleCountdownEnd = () => {
      shareLink.value = "";
      currentSharePassword.value = "";
    };
    const navigateToAdmin = () => {
      __vitePreload(async () => {
        const { routerUtils } = await import("./index-BQxzU9F1.js").then((n) => n.f9);
        return { routerUtils };
      }, true ? [] : void 0).then(({ routerUtils }) => {
        routerUtils.navigateTo("admin");
      });
    };
    const toggleEditorMode = () => {
      isPlainTextMode.value = !isPlainTextMode.value;
      log.debug("切换编辑器模式:", isPlainTextMode.value ? t("markdown.switchToPlainText") : t("markdown.switchToMarkdown"));
    };
    const triggerImportFile = () => {
      if (markdownImporter.value) {
        markdownImporter.value.click();
      }
    };
    const importMarkdownFile = (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        if (editorRef.value) {
          editorRef.value.setValue(content);
        }
        editorContent.value = content;
      };
      reader.readAsText(file);
      event.target.value = "";
    };
    const clearEditorContent = () => {
      if (editorRef.value) {
        editorRef.value.clearContent();
      }
      editorContent.value = "";
    };
    const updateCopyFormatMenuPosition = () => {
      if (!copyFormatMenuVisible.value) {
        return;
      }
      const copyFormatBtn = document.querySelector('.vditor-toolbar .vditor-tooltipped[data-type="copy-formats"]');
      if (copyFormatBtn) {
        const rect = copyFormatBtn.getBoundingClientRect();
        copyFormatMenuPosition.value = {
          x: rect.left,
          y: rect.bottom + 5
        };
      }
    };
    const showCopyFormatsMenu = (position) => {
      if (!currentEditor.value) return;
      if (position && position.x !== void 0 && position.y !== void 0) {
        copyFormatMenuPosition.value = position;
      } else {
        const copyFormatBtn = document.querySelector('.vditor-toolbar .vditor-tooltipped[data-type="copy-formats"]');
        if (copyFormatBtn) {
          const rect = copyFormatBtn.getBoundingClientRect();
          copyFormatMenuPosition.value = {
            x: rect.left,
            y: rect.bottom + 5
          };
        } else {
          copyFormatMenuPosition.value = { x: 100, y: 100 };
        }
      }
      copyFormatMenuVisible.value = true;
    };
    const closeCopyFormatMenu = () => {
      copyFormatMenuVisible.value = false;
    };
    useEventListener(window, "resize", updateCopyFormatMenuPosition);
    const showQRCode = () => {
      showQRCodeModal.value = true;
    };
    const closeQRCodeModal = () => {
      showQRCodeModal.value = false;
    };
    const saveContent = async (formData) => {
      if (!hasPermission.value) {
        handleStatusMessage(t("common.noPermission"));
        return;
      }
      if (!editorContent.value.trim()) {
        handleStatusMessage(t("markdown.messages.contentEmpty"));
        return;
      }
      isSubmitting.value = true;
      handleStatusMessage(t("markdown.messages.creating"));
      try {
        const pasteData = {
          content: editorContent.value
        };
        if (formData.customLink && formData.customLink.trim()) {
          pasteData.slug = formData.customLink.trim();
        }
        if (formData.title && formData.title.trim()) {
          pasteData.title = formData.title.trim();
        }
        if (formData.remark && formData.remark.trim()) {
          pasteData.remark = formData.remark.trim();
        }
        if (formData.password && formData.password.trim()) {
          pasteData.password = formData.password.trim();
        }
        if (formData.max_views && parseInt(formData.max_views) > 0) {
          pasteData.max_views = parseInt(formData.max_views);
        }
        if (typeof formData.is_public === "boolean") {
          pasteData.is_public = formData.is_public;
        }
        const expiryHours = parseInt(formData.expiry_time);
        if (expiryHours > 0) {
          const expiresAt = /* @__PURE__ */ new Date();
          expiresAt.setHours(expiresAt.getHours() + expiryHours);
          pasteData.expires_at = expiresAt.toISOString();
        }
        log.debug("创建分享，数据:", pasteData);
        const slug = await pasteService.createPaste(pasteData);
        log.debug("创建分享结果 slug:", slug);
        shareLink.value = `${window.location.origin}/paste/${slug}`;
        currentSharePassword.value = formData.password || "";
        if (shareLinkRef.value) {
          shareLinkRef.value.startCountdown();
        }
        if (formRef.value) {
          formRef.value.resetForm();
        }
        handleStatusMessage(t("markdown.messages.createSuccess"));
      } catch (error) {
        log.error("保存失败:", error);
        if (error.message && error.message.includes("已被占用")) {
          handleStatusMessage(t("markdown.messages.linkOccupied"));
        } else if (error.message && error.message.includes("权限")) {
          handleStatusMessage(t("common.noPermission"));
        } else if (error.message && error.message.includes("内容过大")) {
          handleStatusMessage(t("markdown.messages.contentTooLarge"));
        } else {
          handleStatusMessage(`${t("markdown.messages.createFailed")}: ${error.message || t("markdown.messages.unknownError")}`);
        }
      } finally {
        isSubmitting.value = false;
      }
    };
    const autoSaveDebounce = useDebounceFn(() => {
      try {
        draftContent.value = editorContent.value;
      } catch (e) {
        log.warn(t("markdown.messages.autoSaveFailed"), e);
      }
    }, 1e3);
    onMounted(async () => {
      try {
        if (draftContent.value) {
          editorContent.value = draftContent.value;
        }
      } catch (e) {
        log.warn(t("markdown.messages.restoreContentFailed"), e);
      }
    });
    onUnmounted(() => {
      stopClearSavingStatus();
      autoSaveDebounce.cancel?.();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("input", {
          type: "file",
          ref_key: "markdownImporter",
          ref: markdownImporter,
          accept: ".md,.markdown,.mdown,.mkd",
          style: { "display": "none" },
          onChange: importMarkdownFile
        }, null, 544),
        createBaseVNode("div", {
          class: normalizeClass(["header mb-4 border-b pb-2", __props.darkMode ? "border-gray-700" : "border-gray-200"])
        }, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("markdown.title")), 1),
            createBaseVNode("button", {
              class: normalizeClass(["px-2 py-1 text-sm rounded transition-colors", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-100 hover:bg-gray-200 text-gray-700"]),
              onClick: toggleEditorMode
            }, toDisplayString(isPlainTextMode.value ? _ctx.$t("markdown.switchToMarkdown") : _ctx.$t("markdown.switchToPlainText")), 3)
          ])
        ], 2),
        createVNode(PermissionManager, {
          "dark-mode": __props.darkMode,
          "permission-type": "text",
          "permission-required-text": _ctx.$t("markdown.permissionRequired"),
          "login-auth-text": _ctx.$t("markdown.loginOrAuth"),
          onPermissionChange: handlePermissionChange,
          onNavigateToAdmin: navigateToAdmin
        }, null, 8, ["dark-mode", "permission-required-text", "login-auth-text"]),
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("div", _hoisted_5, [
            createVNode(VditorUnified, {
              ref_key: "editorRef",
              ref: editorRef,
              "dark-mode": __props.darkMode,
              "is-plain-text-mode": isPlainTextMode.value,
              modelValue: editorContent.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => editorContent.value = $event),
              onEditorReady: handleEditorReady,
              onContentChange: handleContentChange,
              onImportFile: triggerImportFile,
              onClearContent: clearEditorContent,
              onShowCopyFormats: showCopyFormatsMenu
            }, null, 8, ["dark-mode", "is-plain-text-mode", "modelValue"])
          ])
        ]),
        createVNode(EditorForm, {
          ref_key: "formRef",
          ref: formRef,
          "dark-mode": __props.darkMode,
          "has-permission": hasPermission.value,
          "is-submitting": isSubmitting.value,
          "saving-status": savingStatus.value,
          onSubmit: saveContent,
          onFormChange: handleFormChange
        }, null, 8, ["dark-mode", "has-permission", "is-submitting", "saving-status"]),
        createVNode(ShareLinkBox, {
          ref_key: "shareLinkRef",
          ref: shareLinkRef,
          "dark-mode": __props.darkMode,
          label: unref(t)("markdown.shareLink"),
          "share-link": shareLink.value,
          "copy-tooltip": unref(t)("markdown.copyLink"),
          "copy-success-text": unref(t)("markdown.linkCopied"),
          "copy-failure-text": unref(t)("markdown.copyFailed"),
          "show-qr-button": true,
          "qr-tooltip": unref(t)("markdown.showQRCode"),
          "secondary-link": rawShareLink.value,
          "secondary-tooltip": unref(t)("markdown.copyRawLink"),
          "secondary-success-text": unref(t)("markdown.rawLinkCopied"),
          "secondary-failure-text": unref(t)("markdown.copyFailed"),
          "show-countdown": true,
          "countdown-seconds": 15,
          "countdown-formatter": formatCountdownText,
          onShowQrCode: showQRCode,
          onStatusMessage: handleStatusMessage,
          onCountdownEnd: handleCountdownEnd
        }, null, 8, ["dark-mode", "label", "share-link", "copy-tooltip", "copy-success-text", "copy-failure-text", "qr-tooltip", "secondary-link", "secondary-tooltip", "secondary-success-text", "secondary-failure-text"]),
        createVNode(QRCodeModal, {
          visible: showQRCodeModal.value,
          "share-link": shareLink.value,
          onClose: closeQRCodeModal,
          onStatusMessage: handleStatusMessage
        }, null, 8, ["visible", "share-link"]),
        createVNode(CopyFormatMenu, {
          visible: copyFormatMenuVisible.value,
          position: copyFormatMenuPosition.value,
          editor: currentEditor.value,
          "dark-mode": __props.darkMode,
          onClose: closeCopyFormatMenu,
          onStatusMessage: handleStatusMessage
        }, null, 8, ["visible", "position", "editor", "dark-mode"])
      ]);
    };
  }
};
const MarkdownEditorView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bc3c8812"]]);
export {
  MarkdownEditorView as default
};
