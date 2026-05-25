import { e as useI18n, F as computed, aT as onKeyStroke, M as createBlock, k as openBlock, j as createElementBlock, p as createCommentVNode, l as createBaseVNode, n as normalizeClass, t as toDisplayString, aU as renderSlot, y as unref, J as IconRefresh, m as withModifiers, aV as Teleport, r as reactive, c as createLogger } from "./index-BQxzU9F1.js";
const _hoisted_1 = { class: "mb-4" };
const _hoisted_2 = { class: "flex justify-end space-x-2" };
const _hoisted_3 = ["disabled"];
const _hoisted_4 = ["disabled"];
const _sfc_main = {
  __name: "ConfirmDialog",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: ""
    },
    confirmText: {
      type: String,
      default: ""
    },
    cancelText: {
      type: String,
      default: ""
    },
    confirmType: {
      type: String,
      default: "primary",
      // 'primary', 'danger', 'warning'
      validator: (value) => ["primary", "danger", "warning"].includes(value)
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: ""
    },
    allowBackdropClose: {
      type: Boolean,
      default: true
    }
  },
  emits: ["confirm", "cancel", "close"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const displayConfirmText = computed(() => {
      return props.confirmText || t("common.dialogs.confirm");
    });
    const displayCancelText = computed(() => {
      return props.cancelText || t("common.dialogs.cancel");
    });
    const displayLoadingText = computed(() => {
      return props.loadingText || t("common.dialogs.processing");
    });
    const confirmButtonClass = computed(() => {
      const baseClass = "transition-colors";
      const loadingClass = props.loading ? "cursor-not-allowed" : "";
      switch (props.confirmType) {
        case "danger":
          return `${baseClass} ${props.loading ? "bg-red-500" : "bg-red-600 hover:bg-red-700"} ${loadingClass}`;
        case "warning":
          return `${baseClass} ${props.loading ? "bg-yellow-500" : "bg-yellow-600 hover:bg-yellow-700"} ${loadingClass}`;
        case "primary":
        default:
          return `${baseClass} ${props.loading ? "bg-primary-500" : props.darkMode ? "bg-primary-600 hover:bg-primary-700" : "bg-primary-500 hover:bg-primary-600"} ${loadingClass}`;
      }
    });
    const handleConfirm = () => {
      if (props.loading) return;
      emit("confirm");
    };
    const handleCancel = () => {
      if (props.loading) return;
      emit("cancel");
      emit("close");
    };
    const handleBackdropClick = () => {
      if (props.allowBackdropClose && !props.loading) {
        handleCancel();
      }
    };
    onKeyStroke("Escape", () => {
      if (!props.isOpen || props.loading) return;
      handleCancel();
    });
    onKeyStroke("Enter", () => {
      if (!props.isOpen || props.loading) return;
      handleConfirm();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        __props.isOpen ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "fixed inset-0 z-[70] overflow-auto bg-black bg-opacity-50 flex items-center justify-center",
          onClick: handleBackdropClick
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["relative w-full max-w-md p-6 rounded-lg shadow-xl", __props.darkMode ? "bg-gray-800" : "bg-white"]),
            onClick: _cache[0] || (_cache[0] = withModifiers(() => {
            }, ["stop"]))
          }, [
            createBaseVNode("div", _hoisted_1, [
              createBaseVNode("h3", {
                class: normalizeClass(["text-lg font-semibold", __props.darkMode ? "text-gray-100" : "text-gray-900"])
              }, toDisplayString(__props.title), 3),
              __props.message ? (openBlock(), createElementBlock("p", {
                key: 0,
                class: normalizeClass(["text-sm mt-1", __props.darkMode ? "text-gray-400" : "text-gray-500"])
              }, toDisplayString(__props.message), 3)) : createCommentVNode("", true),
              _ctx.$slots.content ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(["text-sm mt-1", __props.darkMode ? "text-gray-400" : "text-gray-500"])
              }, [
                renderSlot(_ctx.$slots, "content")
              ], 2)) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("button", {
                onClick: handleCancel,
                disabled: __props.loading,
                class: normalizeClass(["px-4 py-2 rounded-md transition-colors", [__props.darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100", __props.loading ? "opacity-50 cursor-not-allowed" : ""]])
              }, toDisplayString(displayCancelText.value), 11, _hoisted_3),
              createBaseVNode("button", {
                onClick: handleConfirm,
                disabled: __props.loading,
                class: normalizeClass(["px-4 py-2 rounded-md text-white transition-colors flex items-center space-x-2", confirmButtonClass.value])
              }, [
                __props.loading ? (openBlock(), createBlock(unref(IconRefresh), {
                  key: 0,
                  class: "animate-spin h-4 w-4",
                  "aria-hidden": "true"
                })) : createCommentVNode("", true),
                createBaseVNode("span", null, toDisplayString(__props.loading ? displayLoadingText.value : displayConfirmText.value), 1)
              ], 10, _hoisted_4)
            ])
          ], 2)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
const log = createLogger("ConfirmDialog");
function useConfirmDialog() {
  const dialogState = reactive({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    confirmType: "primary",
    loading: false,
    loadingText: "",
    allowBackdropClose: true,
    darkMode: false
  });
  let resolvePromise = null;
  let onConfirmCallback = null;
  const confirm = (options) => {
    return new Promise((resolve) => {
      resolvePromise = resolve;
      onConfirmCallback = options.onConfirm || null;
      dialogState.isOpen = true;
      dialogState.title = options.title || "";
      dialogState.message = options.message || "";
      dialogState.confirmText = options.confirmText || "";
      dialogState.cancelText = options.cancelText || "";
      dialogState.confirmType = options.confirmType || "primary";
      dialogState.loading = false;
      dialogState.loadingText = options.loadingText || "";
      dialogState.allowBackdropClose = options.allowBackdropClose !== false;
      dialogState.darkMode = options.darkMode !== void 0 ? options.darkMode : false;
    });
  };
  const handleConfirm = async () => {
    if (onConfirmCallback) {
      dialogState.loading = true;
      dialogState.allowBackdropClose = false;
      try {
        await onConfirmCallback();
        closeDialog(true);
      } catch (error) {
        log.error("Confirm dialog callback error:", error);
        closeDialog(false);
        throw error;
      }
    } else {
      closeDialog(true);
    }
  };
  const handleCancel = () => {
    closeDialog(false);
  };
  const closeDialog = (result) => {
    dialogState.isOpen = false;
    dialogState.loading = false;
    onConfirmCallback = null;
    if (resolvePromise) {
      resolvePromise(result);
      resolvePromise = null;
    }
  };
  const setDarkMode = (isDark) => {
    dialogState.darkMode = isDark;
  };
  return {
    // 状态（绑定到 ConfirmDialog 组件）
    dialogState,
    // 方法
    confirm,
    handleConfirm,
    handleCancel,
    setDarkMode
  };
}
function createConfirmFn(confirm, { t, darkMode, getConfirmText } = {}) {
  return async ({ title, message, confirmType, confirmText }) => {
    const resolvedDarkMode = typeof darkMode === "object" && darkMode ? !!darkMode.value : !!darkMode;
    const resolvedConfirmType = confirmType || "primary";
    const resolvedConfirmText = confirmText || (typeof getConfirmText === "function" ? getConfirmText({ confirmType: resolvedConfirmType, title, message }) : "") || (t && typeof t === "function" ? resolvedConfirmType === "danger" ? t("common.dialogs.deleteButton") : t("common.dialogs.confirmButton") : resolvedConfirmType === "danger" ? "删除" : "确认");
    return await confirm({
      title,
      message,
      confirmType: resolvedConfirmType,
      confirmText: resolvedConfirmText,
      darkMode: resolvedDarkMode
    });
  };
}
export {
  _sfc_main as _,
  createConfirmFn as c,
  useConfirmDialog as u
};
