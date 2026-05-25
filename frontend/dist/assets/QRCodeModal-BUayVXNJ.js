import { aK as _export_sfc, aN as useCssVars, g as ref, aw as useIntervalFn, w as watch, ax as onUnmounted, F as computed, j as createElementBlock, p as createCommentVNode, k as openBlock, l as createBaseVNode, n as normalizeClass, t as toDisplayString, z as createVNode, y as unref, al as IconCopy, bn as IconQrCode, bo as IconLink, e as useI18n, c as createLogger, G as IconClose } from "./index-BQxzU9F1.js";
import { c as copyToClipboard } from "./clipboard-GLHRBPpJ.js";
import { g as generateQRCode } from "./qrcodeUtils-xDdVh-90.js";
const _hoisted_1$1 = { class: "flex items-center" };
const _hoisted_2$1 = ["href"];
const _hoisted_3$1 = ["title"];
const _hoisted_4$1 = ["title"];
const _hoisted_5$1 = ["title"];
const _sfc_main$1 = {
  __name: "ShareLinkBox",
  props: {
    darkMode: { type: Boolean, default: false },
    label: { type: String, default: "" },
    shareLink: { type: String, default: "" },
    copyTooltip: { type: String, default: "" },
    copySuccessText: { type: String, default: "" },
    copyFailureText: { type: String, default: "" },
    showQrButton: { type: Boolean, default: false },
    qrTooltip: { type: String, default: "" },
    secondaryLink: { type: String, default: "" },
    secondaryTooltip: { type: String, default: "" },
    secondarySuccessText: { type: String, default: "" },
    secondaryFailureText: { type: String, default: "" },
    showCountdown: { type: Boolean, default: false },
    countdownSeconds: { type: Number, default: 15 },
    countdownFormatter: { type: Function, default: null }
  },
  emits: ["show-qr-code", "status-message", "countdown-end"],
  setup(__props, { expose: __expose, emit: __emit }) {
    useCssVars((_ctx) => ({
      "48929860": props.darkMode ? "rgba(75, 85, 99, 0.3)" : "rgba(229, 231, 235, 0.8)"
    }));
    const props = __props;
    const emit = __emit;
    const countdown = ref(props.countdownSeconds);
    const { pause: stopCountdown, resume: resumeCountdown } = useIntervalFn(
      () => {
        countdown.value--;
        if (countdown.value <= 0) {
          stopCountdown();
          emit("countdown-end");
        }
      },
      1e3,
      { immediate: false }
    );
    const startCountdown = () => {
      if (!props.showCountdown) return;
      stopCountdown();
      countdown.value = props.countdownSeconds;
      resumeCountdown();
    };
    watch(
      () => props.shareLink,
      (link) => {
        if (link && props.showCountdown) {
          startCountdown();
        } else {
          stopCountdown();
        }
      }
    );
    onUnmounted(() => {
      stopCountdown();
    });
    const emitStatus = (type, message) => {
      if (message) {
        emit("status-message", { type, message });
      }
    };
    const copyPrimaryLink = async () => {
      if (!props.shareLink) return;
      try {
        const success = await copyToClipboard(props.shareLink);
        emitStatus(success ? "success" : "error", success ? props.copySuccessText : props.copyFailureText);
      } catch {
        emitStatus("error", props.copyFailureText);
      }
    };
    const copySecondaryLink = async () => {
      if (!props.secondaryLink) return;
      try {
        const success = await copyToClipboard(props.secondaryLink);
        emitStatus(success ? "success" : "error", success ? props.secondarySuccessText : props.secondaryFailureText);
      } catch {
        emitStatus("error", props.secondaryFailureText);
      }
    };
    const countdownText = computed(() => {
      if (!props.showCountdown) return "";
      if (typeof props.countdownFormatter === "function") {
        return props.countdownFormatter(countdown.value);
      }
      return `${countdown.value}s`;
    });
    __expose({
      startCountdown,
      stopCountdown
    });
    return (_ctx, _cache) => {
      return __props.shareLink ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["mt-3 p-3 rounded-md share-link-box", __props.darkMode ? "bg-gray-800/50" : "bg-gray-50"])
      }, [
        createBaseVNode("div", _hoisted_1$1, [
          createBaseVNode("span", {
            class: normalizeClass(["text-sm mr-2", __props.darkMode ? "text-gray-400" : "text-gray-500"])
          }, toDisplayString(__props.label), 3),
          createBaseVNode("a", {
            href: __props.shareLink,
            target: "_blank",
            rel: "noopener",
            class: normalizeClass(["link-text text-sm flex-grow", __props.darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"])
          }, toDisplayString(__props.shareLink), 11, _hoisted_2$1),
          createBaseVNode("button", {
            onClick: copyPrimaryLink,
            class: normalizeClass(["ml-2 p-1 rounded-md transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-400 hover:text-gray-200" : "hover:bg-gray-200 text-gray-500 hover:text-gray-700"]),
            title: __props.copyTooltip
          }, [
            createVNode(unref(IconCopy), {
              size: "md",
              "aria-hidden": "true"
            })
          ], 10, _hoisted_3$1),
          __props.showQrButton ? (openBlock(), createElementBlock("button", {
            key: 0,
            onClick: _cache[0] || (_cache[0] = ($event) => emit("show-qr-code", __props.shareLink)),
            class: normalizeClass(["ml-2 p-1 rounded-md transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-400 hover:text-gray-200" : "hover:bg-gray-200 text-gray-500 hover:text-gray-700"]),
            title: __props.qrTooltip
          }, [
            createVNode(unref(IconQrCode), {
              size: "md",
              "aria-hidden": "true"
            })
          ], 10, _hoisted_4$1)) : createCommentVNode("", true),
          __props.secondaryLink ? (openBlock(), createElementBlock("button", {
            key: 1,
            onClick: copySecondaryLink,
            class: normalizeClass(["ml-2 p-1 rounded-md transition-colors", __props.darkMode ? "hover:bg-gray-700 text-gray-400 hover:text-gray-200" : "hover:bg-gray-200 text-gray-500 hover:text-gray-700"]),
            title: __props.secondaryTooltip
          }, [
            createVNode(unref(IconLink), {
              size: "md",
              "aria-hidden": "true"
            })
          ], 10, _hoisted_5$1)) : createCommentVNode("", true),
          __props.showCountdown && __props.countdownSeconds > 0 ? (openBlock(), createElementBlock("span", {
            key: 2,
            class: normalizeClass(["ml-2 text-xs", __props.darkMode ? "text-gray-500" : "text-gray-400"])
          }, toDisplayString(countdownText.value), 3)) : createCommentVNode("", true)
        ])
      ], 2)) : createCommentVNode("", true);
    };
  }
};
const ShareLinkBox = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c617cc3c"]]);
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 flex items-center justify-center z-50"
};
const _hoisted_2 = { class: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-md w-full relative z-10" };
const _hoisted_3 = { class: "text-lg font-medium mb-4 text-gray-900 dark:text-gray-100" };
const _hoisted_4 = { class: "flex flex-col items-center" };
const _hoisted_5 = {
  key: 0,
  class: "bg-white p-4 rounded-lg mb-4"
};
const _hoisted_6 = ["src", "alt"];
const _hoisted_7 = {
  key: 1,
  class: "bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4 w-48 h-48 flex items-center justify-center"
};
const _hoisted_8 = { class: "text-gray-500 dark:text-gray-400" };
const _hoisted_9 = { class: "text-sm text-gray-600 dark:text-gray-300 mb-4 text-center max-w-xs" };
const _hoisted_10 = ["disabled"];
const _sfc_main = {
  __name: "QRCodeModal",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    shareLink: {
      type: String,
      default: ""
    }
  },
  emits: ["close", "status-message"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const log = createLogger("QRCodeModal");
    const props = __props;
    const emit = __emit;
    const qrCodeDataURL = ref("");
    const generateQRCode$1 = async (url) => {
      if (!url) return;
      qrCodeDataURL.value = "";
      try {
        const dataURL = await generateQRCode(url, { width: 240, margin: 1 });
        qrCodeDataURL.value = dataURL;
      } catch (error) {
        log.error("生成二维码时出错:", error);
        emit("status-message", t("markdown.messages.qrCodeGenerateFailed"));
      }
    };
    const closeModal = () => {
      emit("close");
    };
    const downloadQRCode = () => {
      if (!qrCodeDataURL.value) return;
      const link = document.createElement("a");
      link.href = qrCodeDataURL.value;
      link.download = `cloudpaste-qrcode-${(/* @__PURE__ */ new Date()).getTime()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      emit("status-message", t("markdown.qrCodeDownloaded"));
    };
    watch(
      () => props.visible,
      (newVisible) => {
        if (newVisible && props.shareLink) {
          generateQRCode$1(props.shareLink);
        } else {
          qrCodeDataURL.value = "";
        }
      }
    );
    watch(
      () => props.shareLink,
      (newLink) => {
        if (props.visible && newLink) {
          generateQRCode$1(newLink);
        }
      }
    );
    return (_ctx, _cache) => {
      return __props.visible ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: "absolute inset-0 bg-black opacity-50",
          onClick: closeModal
        }),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("button", {
            onClick: closeModal,
            class: "absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }, [
            createVNode(unref(IconClose), {
              size: "lg",
              "aria-hidden": "true"
            })
          ]),
          createBaseVNode("h3", _hoisted_3, toDisplayString(_ctx.$t("markdown.qrCodeTitle")), 1),
          createBaseVNode("div", _hoisted_4, [
            qrCodeDataURL.value ? (openBlock(), createElementBlock("div", _hoisted_5, [
              createBaseVNode("img", {
                src: qrCodeDataURL.value,
                alt: _ctx.$t("markdown.qrCodeTitle"),
                class: "w-48 h-48"
              }, null, 8, _hoisted_6)
            ])) : (openBlock(), createElementBlock("div", _hoisted_7, [
              createBaseVNode("span", _hoisted_8, toDisplayString(_ctx.$t("markdown.qrCodeGenerating")), 1)
            ])),
            createBaseVNode("div", _hoisted_9, toDisplayString(_ctx.$t("markdown.qrCodeScanToAccess")), 1),
            createBaseVNode("button", {
              onClick: downloadQRCode,
              class: "w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors",
              disabled: !qrCodeDataURL.value
            }, toDisplayString(_ctx.$t("markdown.downloadQRCode")), 9, _hoisted_10)
          ])
        ])
      ])) : createCommentVNode("", true);
    };
  }
};
const QRCodeModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-543fc848"]]);
export {
  QRCodeModal as Q,
  ShareLinkBox as S
};
