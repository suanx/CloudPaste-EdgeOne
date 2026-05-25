import { aK as _export_sfc, e as useI18n, c as createLogger, u as useEventListener, j as createElementBlock, p as createCommentVNode, k as openBlock, l as createBaseVNode, z as createVNode, y as unref, b4 as IconDocumentText, t as toDisplayString, bF as IconCode, H as IconDownload, aD as normalizeStyle, Y as useGlobalMessage, g as ref, w as watch, n as normalizeClass, A as createTextVNode, J as IconRefresh, q as withDirectives, M as createBlock, v as vModelText, bG as vModelDynamic, x as vModelCheckbox, ae as vModelSelect, aM as createStaticVNode } from "./index-BQxzU9F1.js";
import { g as getInputClasses } from "./PasteView-BAV1za1x.js";
import { V as VditorUnified } from "./VditorUnified-CK_SUxJD.js";
import { c as copyToClipboard } from "./clipboard-GLHRBPpJ.js";
import { markdownToWord } from "./markdownToWord-7ASpIkki.js";
import { e as formatNowForFilename } from "./timeUtils-D81jJILb.js";
import { a as FileSaver_minExports } from "./FileSaver.min-CQ6SkgWv.js";
import { editorContentToPng } from "./snapdomCapture-U4IMZ2vT.js";
import "./LoadingIndicator-C1Dntewf.js";
import "./pasteService-CHRbddSC.js";
import "./useAdminBase-CxkodUK-.js";
import "./storageConfigsStore-DUFoycii.js";
import "./useConfirmDialog-c5dcTgIB.js";
const _sfc_main$1 = {
  __name: "PasteCopyFormatMenu",
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
    },
    isPlainTextMode: {
      type: Boolean,
      default: false
    },
    plainTextContent: {
      type: String,
      default: ""
    },
    documentTitle: {
      type: String,
      default: "CloudPaste文档"
    }
  },
  emits: ["close", "status-message"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const log = createLogger("PasteCopyFormatMenu");
    const props = __props;
    const emit = __emit;
    const getMarkdownContent = () => {
      if (props.isPlainTextMode) {
        return props.plainTextContent || "";
      }
      if (!props.editor || typeof props.editor.getValue !== "function") {
        return "";
      }
      return props.editor.getValue();
    };
    const getHtmlContent = () => {
      if (props.isPlainTextMode) {
        return (props.plainTextContent || "").replace(/\n/g, "<br>");
      }
      if (!props.editor || typeof props.editor.getHTML !== "function") {
        return "";
      }
      return props.editor.getHTML();
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
    const copyAsMarkdown = () => {
      const mdContent = getMarkdownContent();
      if (!mdContent) {
        emit("status-message", t("markdown.messages.contentEmpty"));
        return;
      }
      copyToClipboard$1(mdContent, t("markdown.markdownCopied"));
      emit("close");
    };
    const copyAsHTML = () => {
      const htmlContent = getHtmlContent();
      if (!htmlContent) {
        emit("status-message", t("markdown.messages.contentEmpty"));
        return;
      }
      copyToClipboard$1(htmlContent, t("markdown.htmlCopied"));
      emit("close");
    };
    const copyAsPlainText = () => {
      if (props.isPlainTextMode) {
        copyToClipboard$1(props.plainTextContent, t("markdown.plainTextCopied"));
        emit("close");
        return;
      }
      const htmlContent = getHtmlContent();
      if (!htmlContent) {
        emit("status-message", t("markdown.messages.contentEmpty"));
        return;
      }
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;
      const plainText = tempDiv.textContent || tempDiv.innerText || "";
      copyToClipboard$1(plainText, t("markdown.plainTextCopied"));
      emit("close");
    };
    const exportWordDocument = async () => {
      const markdownContent = getMarkdownContent();
      if (!markdownContent) {
        emit("status-message", t("markdown.messages.contentEmpty"));
        return;
      }
      emit("status-message", t("markdown.messages.generatingWord"));
      try {
        const blob = await markdownToWord(markdownContent, {
          title: props.documentTitle || t("markdown.exportDocumentTitle")
        });
        const timestamp = formatNowForFilename();
        const baseName = props.documentTitle || "markdown";
        const fileName = `${baseName}-${timestamp}.docx`;
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
      if (props.isPlainTextMode) {
        emit("status-message", "纯文本模式下无法导出为PNG图片");
        emit("close");
        return;
      }
      if (!props.editor || typeof props.editor.getValue !== "function") {
        log.error("导出PNG失败：编辑器实例不存在");
        emit("status-message", t("markdown.messages.editorNotReady"));
        return;
      }
      emit("status-message", t("markdown.messages.exportingPng"));
      try {
        const timestamp = formatNowForFilename();
        const baseName = props.documentTitle || "markdown";
        const fileName = `${baseName}-${timestamp}.png`;
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        const result = await editorContentToPng(props.editor, {
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
              emit(
                "status-message",
                t("markdown.messages.pngExportFailed") + ": " + (error.message || t("markdown.messages.unknownError"))
              );
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
    const handleGlobalClick = (event) => {
      const menu = document.getElementById("pasteCopyFormatMenu");
      if (menu && !menu.contains(event.target) && !event.target.closest('.vditor-toolbar button[data-type="copy-formats"]') && props.visible) {
        emit("close");
      }
    };
    useEventListener(document, "click", handleGlobalClick);
    return (_ctx, _cache) => {
      return __props.visible ? (openBlock(), createElementBlock("div", {
        key: 0,
        id: "pasteCopyFormatMenu",
        class: "vditor-hint vditor-panel--arrow absolute z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg",
        style: normalizeStyle({ top: `${__props.position.y}px`, left: `${__props.position.x}px`, display: "block" })
      }, [
        createBaseVNode("div", {
          class: "px-4 py-2 cursor-pointer flex items-center",
          onClick: copyAsMarkdown
        }, [
          createVNode(unref(IconDocumentText), {
            size: "sm",
            class: "mr-2"
          }),
          createBaseVNode("span", null, toDisplayString(_ctx.$t("markdown.copyAsMarkdown")), 1)
        ]),
        createBaseVNode("div", {
          class: "px-4 py-2 cursor-pointer flex items-center",
          onClick: copyAsHTML
        }, [
          createVNode(unref(IconCode), {
            size: "sm",
            class: "mr-2"
          }),
          createBaseVNode("span", null, toDisplayString(_ctx.$t("markdown.copyAsHTML")), 1)
        ]),
        createBaseVNode("div", {
          class: "px-4 py-2 cursor-pointer flex items-center",
          onClick: copyAsPlainText
        }, [
          createVNode(unref(IconDocumentText), {
            size: "sm",
            class: "mr-2"
          }),
          createBaseVNode("span", null, toDisplayString(_ctx.$t("markdown.copyAsPlainText")), 1)
        ]),
        createBaseVNode("div", {
          class: "px-4 py-2 cursor-pointer flex items-center",
          onClick: exportWordDocument
        }, [
          createVNode(unref(IconDownload), {
            size: "sm",
            class: "mr-2"
          }),
          createBaseVNode("span", null, toDisplayString(_ctx.$t("markdown.exportAsWord")), 1)
        ]),
        createBaseVNode("div", {
          class: "px-4 py-2 cursor-pointer flex items-center",
          onClick: exportAsPng
        }, [
          createVNode(unref(IconDownload), {
            size: "sm",
            class: "mr-2"
          }),
          createBaseVNode("span", null, toDisplayString(_ctx.$t("markdown.exportAsPng")), 1)
        ])
      ], 4)) : createCommentVNode("", true);
    };
  }
};
const PasteCopyFormatMenu = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-7bb3a407"]]);
const _hoisted_1 = { class: "paste-view-editor-wrapper" };
const _hoisted_2 = { class: "paste-view-editor" };
const _hoisted_3 = { class: "mb-1 flex justify-end" };
const _hoisted_4 = ["title"];
const _hoisted_5 = { class: "inline-flex items-center" };
const _hoisted_6 = { class: "editor-wrapper" };
const _hoisted_7 = { class: "flex flex-col gap-2" };
const _hoisted_8 = { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-2" };
const _hoisted_9 = { class: "form-group" };
const _hoisted_10 = { class: "form-group" };
const _hoisted_11 = { class: "form-group" };
const _hoisted_12 = { class: "flex items-center" };
const _hoisted_13 = { class: "form-group" };
const _hoisted_14 = { class: "flex items-center space-x-2" };
const _hoisted_15 = ["type", "disabled"];
const _hoisted_16 = { class: "mt-2 flex items-center" };
const _hoisted_17 = { class: "form-group" };
const _hoisted_18 = { class: "form-group" };
const _hoisted_19 = { class: "form-group" };
const _hoisted_20 = { class: "flex items-center mt-2" };
const _hoisted_21 = { class: "submit-section mt-6 flex flex-row items-center gap-4" };
const _hoisted_22 = ["disabled"];
const _hoisted_23 = {
  key: 0,
  class: "saving-status ml-auto text-sm"
};
const _sfc_main = {
  __name: "PasteViewEditor",
  props: {
    darkMode: { type: Boolean, required: true },
    content: { type: String, default: "" },
    paste: { type: Object, default: () => ({}) },
    loading: { type: Boolean, default: false },
    error: { type: String, default: "" },
    isDev: { type: Boolean, default: false },
    enableDebug: { type: Boolean, default: false },
    isPlainTextMode: { type: Boolean, default: false }
  },
  emits: ["save", "cancel", "update:error", "update:isPlainTextMode"],
  setup(__props, { emit: __emit }) {
    const log = createLogger("PasteViewEditor");
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const { showSuccess, showError, showWarning, showInfo } = useGlobalMessage();
    const editorRef = ref(null);
    const editorContent = ref(props.content);
    const showPassword = ref(false);
    const markdownImporter = ref(null);
    const isPlainTextMode = ref(props.isPlainTextMode);
    const plainTextContent = ref("");
    const originalPlainTextContent = ref("");
    const copyFormatMenuVisible = ref(false);
    const copyFormatMenuPosition = ref({ x: 0, y: 0 });
    const getInitialExpiryTime = (expiresAt) => {
      if (!expiresAt) return "0";
      const expiryDate = new Date(expiresAt);
      const now = /* @__PURE__ */ new Date();
      const diffHours = Math.round((expiryDate - now) / (1e3 * 60 * 60));
      if (diffHours <= 1) {
        return "1";
      } else if (diffHours <= 24) {
        return "24";
      } else if (diffHours <= 168) {
        return "168";
      } else if (diffHours <= 720) {
        return "720";
      } else {
        return "0";
      }
    };
    const editForm = ref({
      title: props.paste?.title || "",
      remark: props.paste?.remark || "",
      customLink: props.paste?.slug || "",
      expiryTime: getInitialExpiryTime(props.paste?.expires_at),
      maxViews: props.paste?.max_views || 0,
      password: "",
      clearPassword: false,
      is_public: Boolean(props.paste?.is_public ?? true)
    });
    const slugError = ref("");
    const toggleEditorMode = () => {
      isPlainTextMode.value = !isPlainTextMode.value;
      emit("update:isPlainTextMode", isPlainTextMode.value);
      if (isPlainTextMode.value) {
        if (editorRef.value) {
          plainTextContent.value = editorContent.value;
          originalPlainTextContent.value = editorContent.value;
        }
      } else {
        editorContent.value = plainTextContent.value || "";
      }
    };
    const syncContentFromPlainText = () => {
      originalPlainTextContent.value = plainTextContent.value;
      editorContent.value = plainTextContent.value;
    };
    const validateMaxViews = () => {
      const value = editForm.value.maxViews;
      if (value < 0) {
        editForm.value.maxViews = 0;
      }
      if (!Number.isInteger(value)) {
        editForm.value.maxViews = Math.floor(value);
      }
    };
    const validateCustomLink = () => {
      slugError.value = "";
      const raw = editForm.value.customLink ? editForm.value.customLink.trim() : "";
      if (!raw) {
        return true;
      }
      const slugRegex = /^[a-zA-Z0-9._-]+$/;
      if (!slugRegex.test(raw)) {
        slugError.value = "链接后缀只能包含字母、数字、-、_、.";
        return false;
      }
      if (raw.length > 50) {
        slugError.value = "链接后缀不能超过50个字符";
        return false;
      }
      editForm.value.customLink = raw;
      return true;
    };
    const handleSlugInput = () => {
      validateCustomLink();
    };
    const handleEditorReady = () => {
    };
    const handleContentChange = (content) => {
      editorContent.value = content;
    };
    const triggerImportFile = () => {
      if (markdownImporter.value) {
        markdownImporter.value.click();
      }
    };
    const clearEditorContent = () => {
      if (isPlainTextMode.value) {
        plainTextContent.value = "";
        originalPlainTextContent.value = "";
      } else {
        editorContent.value = "";
        if (editorRef.value) {
          editorRef.value.setValue("");
        }
      }
      handleStatusMessage({ type: "success", message: "内容已清空" });
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
    useEventListener(window, "resize", updateCopyFormatMenuPosition);
    const showCopyFormatsMenu = (position = null) => {
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
          copyFormatMenuPosition.value = {
            x: 100,
            y: 100
          };
        }
      }
      copyFormatMenuVisible.value = true;
    };
    const closeCopyFormatMenu = () => {
      copyFormatMenuVisible.value = false;
    };
    const handleStatusMessage = (payload) => {
      let message;
      let type = "info";
      if (typeof payload === "string") {
        message = payload;
      } else if (payload && typeof payload === "object") {
        message = payload.message;
        type = payload.type || "info";
      }
      if (!message) {
        return;
      }
      if (type === "error") {
        emit("update:error", message);
        showError(message);
        return;
      }
      if (type === "success") {
        showSuccess(message);
      } else if (type === "warning") {
        showWarning(message);
      } else {
        showInfo(message);
      }
    };
    watch(
      () => props.content,
      (newContent) => {
        editorContent.value = newContent;
      }
    );
    watch(
      () => props.paste,
      (newPaste) => {
        if (newPaste) {
          editForm.value.title = newPaste.title || "";
          editForm.value.remark = newPaste.remark || "";
          editForm.value.customLink = newPaste.slug || "";
          editForm.value.maxViews = newPaste.max_views || 0;
          editForm.value.password = "";
          slugError.value = "";
          editForm.value.expiryTime = getInitialExpiryTime(newPaste.expires_at);
          editForm.value.is_public = Boolean(newPaste.is_public);
        }
      }
    );
    const saveEdit = async () => {
      let newContent;
      if (isPlainTextMode.value) {
        newContent = originalPlainTextContent.value || plainTextContent.value;
      } else if (editorRef.value) {
        newContent = editorContent.value;
      } else {
        emit("update:error", "编辑器未初始化");
        return;
      }
      if (!newContent || !newContent.trim()) {
        emit("update:error", t("markdown.messages.contentEmpty"));
        return;
      }
      if (!validateCustomLink()) {
        emit("update:error", slugError.value || "链接后缀格式无效");
        return;
      }
      const updateData = {
        content: newContent,
        title: editForm.value.title || null,
        remark: editForm.value.remark || null,
        max_views: editForm.value.maxViews === 0 ? null : parseInt(editForm.value.maxViews),
        is_public: editForm.value.is_public
      };
      const normalizedSlug = editForm.value.customLink ? editForm.value.customLink.trim() : "";
      const currentSlug = props.paste?.slug || "";
      if (normalizedSlug !== currentSlug) {
        updateData.newSlug = normalizedSlug || null;
      }
      if (editForm.value.expiryTime !== "0") {
        const hours = parseInt(editForm.value.expiryTime);
        const expiresAt = /* @__PURE__ */ new Date();
        expiresAt.setHours(expiresAt.getHours() + hours);
        updateData.expires_at = expiresAt.toISOString();
      } else {
        updateData.expires_at = null;
      }
      if (editForm.value.clearPassword) {
        updateData.password = null;
        updateData.clearPassword = true;
      } else if (editForm.value.password && editForm.value.password.trim()) {
        updateData.password = editForm.value.password.trim();
      }
      emit("save", updateData);
    };
    const cancelEdit = () => {
      emit("cancel");
    };
    const importMarkdownFile = (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const allowedTypes = [".md", ".markdown", ".mdown", ".mkd", ".txt"];
      const fileName = file.name.toLowerCase();
      const isValidType = allowedTypes.some((type) => fileName.endsWith(type));
      if (!isValidType) {
        emit("update:error", "请选择有效的Markdown文件（.md, .markdown, .mdown, .mkd, .txt）");
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        emit("update:error", "文件大小不能超过5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target.result;
          if (isPlainTextMode.value) {
            plainTextContent.value = content;
            originalPlainTextContent.value = content;
          } else {
            editorContent.value = content;
            if (editorRef.value) {
              editorRef.value.setValue(content);
            }
          }
          handleStatusMessage({ type: "success", message: "文件导入成功" });
          if (markdownImporter.value) {
            markdownImporter.value.value = "";
          }
        } catch (error) {
          log.error("导入文件时出错:", error);
          emit("update:error", "导入文件失败");
        }
      };
      reader.onerror = () => {
        emit("update:error", "读取文件失败");
      };
      reader.readAsText(file, "UTF-8");
    };
    watch(
      () => isPlainTextMode.value,
      (newMode) => {
        emit("update:isPlainTextMode", newMode);
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("input", {
            type: "file",
            ref_key: "markdownImporter",
            ref: markdownImporter,
            accept: ".md,.markdown,.mdown,.mkd",
            style: { "display": "none" },
            onChange: importMarkdownFile
          }, null, 544),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("button", {
              class: normalizeClass(["px-1.5 py-0.5 text-xs rounded-md border transition-colors", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600" : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"]),
              onClick: toggleEditorMode,
              title: isPlainTextMode.value ? "切换到Markdown模式" : "切换到纯文本模式"
            }, [
              createBaseVNode("span", _hoisted_5, [
                createVNode(unref(IconRefresh), {
                  size: "xs",
                  class: "w-3 h-3 mr-0.5"
                }),
                createTextVNode(" " + toDisplayString(isPlainTextMode.value ? "切换MD" : "切换TXT"), 1)
              ])
            ], 10, _hoisted_4)
          ]),
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("div", _hoisted_7, [
              isPlainTextMode.value ? withDirectives((openBlock(), createElementBlock("textarea", {
                key: 0,
                class: normalizeClass(["w-full h-[500px] p-4 font-mono text-base border rounded-lg resize-y focus:outline-none focus:ring-2", __props.darkMode ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-primary-600" : "bg-white border-gray-300 text-gray-900 focus:ring-primary-500"]),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => plainTextContent.value = $event),
                placeholder: "在此输入纯文本内容...",
                onInput: syncContentFromPlainText
              }, null, 34)), [
                [vModelText, plainTextContent.value]
              ]) : (openBlock(), createBlock(VditorUnified, {
                key: 1,
                ref_key: "editorRef",
                ref: editorRef,
                "dark-mode": __props.darkMode,
                "is-plain-text-mode": false,
                modelValue: editorContent.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => editorContent.value = $event),
                onEditorReady: handleEditorReady,
                onContentChange: handleContentChange,
                onImportFile: triggerImportFile,
                onClearContent: clearEditorContent,
                onShowCopyFormats: showCopyFormatsMenu
              }, null, 8, ["dark-mode", "modelValue"]))
            ])
          ]),
          createBaseVNode("div", {
            class: normalizeClass(["mt-6 border-t pt-4", __props.darkMode ? "border-gray-700" : "border-gray-200"])
          }, [
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("div", _hoisted_9, [
                createBaseVNode("label", {
                  class: normalizeClass(["form-label block mb-1 text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, "标题", 2),
                withDirectives(createBaseVNode("input", {
                  type: "text",
                  class: normalizeClass(["form-input w-full rounded-md shadow-sm", unref(getInputClasses)(__props.darkMode)]),
                  placeholder: "为文本分享添加一个标题（可选）",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => editForm.value.title = $event)
                }, null, 2), [
                  [vModelText, editForm.value.title]
                ])
              ]),
              createBaseVNode("div", _hoisted_10, [
                createBaseVNode("label", {
                  class: normalizeClass(["form-label block mb-1 text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, "备注(可选)", 2),
                withDirectives(createBaseVNode("input", {
                  type: "text",
                  class: normalizeClass(["form-input w-full rounded-md shadow-sm", unref(getInputClasses)(__props.darkMode)]),
                  placeholder: "添加备注信息...",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => editForm.value.remark = $event)
                }, null, 2), [
                  [vModelText, editForm.value.remark]
                ])
              ]),
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("label", {
                  class: normalizeClass(["form-label block mb-1 text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, "链接后缀", 2),
                createBaseVNode("div", _hoisted_12, [
                  withDirectives(createBaseVNode("input", {
                    type: "text",
                    class: normalizeClass(["form-input w-full rounded-md shadow-sm", [unref(getInputClasses)(__props.darkMode), slugError.value ? __props.darkMode ? "border-red-500" : "border-red-600" : ""]]),
                    placeholder: "留空则自动生成",
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => editForm.value.customLink = $event),
                    onInput: handleSlugInput
                  }, null, 34), [
                    [vModelText, editForm.value.customLink]
                  ])
                ]),
                slugError.value ? (openBlock(), createElementBlock("p", {
                  key: 0,
                  class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-red-400" : "text-red-600"])
                }, toDisplayString(slugError.value), 3)) : (openBlock(), createElementBlock("p", {
                  key: 1,
                  class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                }, "仅限字母、数字、-、_、.，留空自动生成", 2))
              ]),
              createBaseVNode("div", _hoisted_13, [
                createBaseVNode("label", {
                  class: normalizeClass(["form-label block mb-1 text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, "访问密码", 2),
                createBaseVNode("div", _hoisted_14, [
                  withDirectives(createBaseVNode("input", {
                    type: showPassword.value ? "text" : "password",
                    autocomplete: "new-password",
                    class: normalizeClass(["form-input w-full rounded-md shadow-sm", unref(getInputClasses)(__props.darkMode)]),
                    placeholder: "设置访问密码...",
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => editForm.value.password = $event),
                    disabled: editForm.value.clearPassword
                  }, null, 10, _hoisted_15), [
                    [vModelDynamic, editForm.value.password]
                  ])
                ]),
                createBaseVNode("div", _hoisted_16, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    id: "clear-password",
                    class: normalizeClass(["h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500", __props.darkMode ? "bg-gray-700 border-gray-600" : ""]),
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => editForm.value.clearPassword = $event)
                  }, null, 2), [
                    [vModelCheckbox, editForm.value.clearPassword]
                  ]),
                  createBaseVNode("label", {
                    for: "clear-password",
                    class: normalizeClass(["ml-2 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                  }, " 清除访问密码 ", 2)
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                }, toDisplayString(editForm.value.clearPassword ? "将移除密码保护" : props.paste?.hasPassword ? "留空表示保持原密码不变" : "设置密码后，他人访问需要输入密码"), 3)
              ]),
              createBaseVNode("div", _hoisted_17, [
                createBaseVNode("label", {
                  class: normalizeClass(["form-label block mb-1 text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, "过期时间", 2),
                withDirectives(createBaseVNode("select", {
                  class: normalizeClass(["form-input w-full rounded-md shadow-sm", unref(getInputClasses)(__props.darkMode)]),
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => editForm.value.expiryTime = $event)
                }, _cache[10] || (_cache[10] = [
                  createStaticVNode('<option value="1" data-v-3f7eaa4e>1小时</option><option value="24" data-v-3f7eaa4e>1天</option><option value="168" data-v-3f7eaa4e>7天</option><option value="720" data-v-3f7eaa4e>30天</option><option value="0" data-v-3f7eaa4e>永不过期</option>', 5)
                ]), 2), [
                  [vModelSelect, editForm.value.expiryTime]
                ])
              ]),
              createBaseVNode("div", _hoisted_18, [
                createBaseVNode("label", {
                  class: normalizeClass(["form-label block mb-1 text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, "可打开次数(0表示无限制)", 2),
                withDirectives(createBaseVNode("input", {
                  type: "number",
                  min: "0",
                  step: "1",
                  pattern: "\\d*",
                  class: normalizeClass(["form-input w-full rounded-md shadow-sm", unref(getInputClasses)(__props.darkMode)]),
                  placeholder: "0表示无限制",
                  "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => editForm.value.maxViews = $event),
                  onInput: validateMaxViews
                }, null, 34), [
                  [
                    vModelText,
                    editForm.value.maxViews,
                    void 0,
                    { number: true }
                  ]
                ])
              ]),
              createBaseVNode("div", _hoisted_19, [
                createBaseVNode("label", {
                  class: normalizeClass(["form-label block mb-1 text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, "可见性", 2),
                createBaseVNode("div", _hoisted_20, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: _cache[9] || (_cache[9] = ($event) => editForm.value.is_public = !editForm.value.is_public),
                    class: normalizeClass(["relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer", editForm.value.is_public ? "bg-primary-600" : __props.darkMode ? "bg-gray-700" : "bg-gray-200"])
                  }, [
                    createBaseVNode("span", {
                      class: normalizeClass(["inline-block h-4 w-4 transform rounded-full bg-white transition-transform", editForm.value.is_public ? "translate-x-6" : "translate-x-1"])
                    }, null, 2)
                  ], 2),
                  createBaseVNode("span", {
                    class: normalizeClass(["ml-3 text-sm", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                  }, toDisplayString(editForm.value.is_public ? "公开" : "私密"), 3)
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                }, "关闭时仅管理员和创建者可访问", 2)
              ])
            ]),
            createBaseVNode("div", _hoisted_21, [
              createBaseVNode("button", {
                onClick: saveEdit,
                class: "btn-primary px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50",
                disabled: __props.loading
              }, toDisplayString(__props.loading ? "保存中..." : "保存修改"), 9, _hoisted_22),
              createBaseVNode("button", {
                onClick: cancelEdit,
                class: normalizeClass(["px-4 py-2 text-sm font-medium border rounded-md transition-colors", __props.darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-50"]),
                title: "取消编辑并恢复原始内容"
              }, " 取消 ", 2),
              __props.error ? (openBlock(), createElementBlock("div", _hoisted_23, [
                createBaseVNode("span", {
                  class: normalizeClass([__props.error.includes("成功") ? __props.darkMode ? "text-green-400" : "text-green-600" : __props.darkMode ? "text-red-400" : "text-red-600"])
                }, toDisplayString(__props.error), 3)
              ])) : createCommentVNode("", true)
            ])
          ], 2)
        ]),
        createVNode(PasteCopyFormatMenu, {
          visible: copyFormatMenuVisible.value,
          position: copyFormatMenuPosition.value,
          editor: editorRef.value,
          "dark-mode": __props.darkMode,
          "is-plain-text-mode": isPlainTextMode.value,
          "plain-text-content": plainTextContent.value,
          "document-title": editForm.value.title || editForm.value.remark || "CloudPaste文档",
          onClose: closeCopyFormatMenu,
          onStatusMessage: handleStatusMessage
        }, null, 8, ["visible", "position", "editor", "dark-mode", "is-plain-text-mode", "plain-text-content", "document-title"])
      ]);
    };
  }
};
const PasteViewEditor = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3f7eaa4e"]]);
export {
  PasteViewEditor as default
};
