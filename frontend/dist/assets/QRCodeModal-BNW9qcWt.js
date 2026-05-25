import { F as computed, j as createElementBlock, k as openBlock, l as createBaseVNode, n as normalizeClass, z as createVNode, y as unref, G as IconClose, A as createTextVNode, H as IconDownload } from "./index-BQxzU9F1.js";
const _hoisted_1 = { class: "fixed inset-0 z-[60] overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 pt-20 sm:pt-4" };
const _hoisted_2 = { class: "relative bg-white dark:bg-gray-800 rounded-lg max-w-xs sm:max-w-md w-full mx-auto shadow-xl overflow-hidden max-h-[95vh] sm:max-h-[85vh]" };
const _hoisted_3 = {
  class: "px-4 sm:px-6 py-3 sm:py-4 flex flex-col items-center overflow-y-auto",
  style: { "max-height": "calc(95vh - 140px)" }
};
const _hoisted_4 = { class: "mb-6 p-4 bg-white rounded-lg" };
const _hoisted_5 = ["src", "alt"];
const _hoisted_6 = { class: "w-full flex space-x-3 mb-2" };
const _hoisted_7 = { class: "flex items-center justify-center" };
const _sfc_main = {
  __name: "QRCodeModal",
  props: {
    qrCodeUrl: {
      type: String,
      required: true
    },
    fileSlug: {
      type: String,
      required: true
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  setup(__props) {
    const props = __props;
    computed(() => {
      const baseUrl = window.location.origin;
      return `${baseUrl}/file/${props.fileSlug}`;
    });
    const downloadQRCode = () => {
      const link = document.createElement("a");
      link.href = props.qrCodeUrl;
      link.download = `cloudpaste-file-${props.fileSlug}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", {
            class: normalizeClass(["px-4 sm:px-6 py-3 sm:py-4 border-b flex justify-between items-center", __props.darkMode ? "border-gray-700" : "border-gray-200"])
          }, [
            createBaseVNode("h3", {
              class: normalizeClass(["text-base sm:text-lg font-medium", __props.darkMode ? "text-white" : "text-gray-900"])
            }, "文件分享二维码", 2),
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close")),
              class: "text-gray-400 hover:text-gray-500"
            }, [
              createVNode(unref(IconClose), { class: "h-6 w-6" })
            ])
          ], 2),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("img", {
                src: __props.qrCodeUrl,
                alt: `QR Code for ${__props.fileSlug}`,
                class: "max-w-full h-auto"
              }, null, 8, _hoisted_5)
            ]),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("button", {
                onClick: downloadQRCode,
                class: "flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
              }, [
                createBaseVNode("span", _hoisted_7, [
                  createVNode(unref(IconDownload), { class: "h-4 w-4 mr-1.5" }),
                  _cache[2] || (_cache[2] = createTextVNode(" 下载二维码 ", -1))
                ])
              ])
            ]),
            createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("close")),
              class: normalizeClass(["w-full px-4 py-2 rounded-md text-sm font-medium transition-colors mt-2", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"])
            }, " 关闭 ", 2)
          ])
        ])
      ]);
    };
  }
};
export {
  _sfc_main as _
};
