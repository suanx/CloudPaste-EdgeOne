import { e as useI18n, c as createLogger, ac as useThemeMode, Y as useGlobalMessage, g as ref, F as computed, o as onMounted, j as createElementBlock, k as openBlock, l as createBaseVNode, n as normalizeClass, y as unref, t as toDisplayString, z as createVNode, J as IconRefresh, ad as IconUpload, A as createTextVNode, q as withDirectives, v as vModelText, ae as vModelSelect, K as Fragment, L as renderList, x as vModelCheckbox, M as createBlock, p as createCommentVNode, af as IconShieldCheck } from "./index-BQxzU9F1.js";
import { u as useAdminSystemService } from "./systemService-BJc_isGU.js";
const _hoisted_1 = { class: "flex-1 flex flex-col overflow-y-auto" };
const _hoisted_2 = { class: "mb-8" };
const _hoisted_3 = {
  key: 0,
  class: "flex items-center justify-center py-12"
};
const _hoisted_4 = {
  key: 1,
  class: "space-y-6 max-w-2xl"
};
const _hoisted_5 = { class: "flex items-center gap-3" };
const _hoisted_6 = { class: "p-5 space-y-4" };
const _hoisted_7 = { class: "flex items-center justify-between gap-4" };
const _hoisted_8 = { class: "flex-1 min-w-0" };
const _hoisted_9 = { class: "flex items-center gap-2 flex-shrink-0" };
const _hoisted_10 = ["placeholder"];
const _hoisted_11 = ["value"];
const _hoisted_12 = { class: "flex items-center justify-between gap-4" };
const _hoisted_13 = { class: "flex-1 min-w-0" };
const _hoisted_14 = { class: "relative inline-flex items-center cursor-pointer flex-shrink-0" };
const _hoisted_15 = { class: "flex items-center justify-between gap-4" };
const _hoisted_16 = { class: "flex-1 min-w-0" };
const _hoisted_17 = { class: "relative inline-flex items-center cursor-pointer flex-shrink-0" };
const _hoisted_18 = ["disabled"];
const _hoisted_19 = { class: "flex items-center gap-3" };
const _hoisted_20 = { class: "p-5 space-y-4" };
const _hoisted_21 = { class: "flex items-center justify-between gap-4" };
const _hoisted_22 = { class: "flex-1 min-w-0" };
const _hoisted_23 = { class: "relative inline-flex items-center cursor-pointer flex-shrink-0" };
const _hoisted_24 = { class: "flex items-center justify-between gap-4" };
const _hoisted_25 = { class: "flex-1 min-w-0" };
const _hoisted_26 = { class: "flex items-center gap-2 flex-shrink-0" };
const _hoisted_27 = ["disabled"];
const _sfc_main = {
  __name: "GlobalSettingsView",
  setup(__props) {
    const { t } = useI18n();
    const log = createLogger("GlobalSettingsView");
    const { getGlobalSettings, updateGlobalSettings } = useAdminSystemService();
    const { isDarkMode: darkMode } = useThemeMode();
    const { showSuccess, showError } = useGlobalMessage();
    const uploadSettings = ref({
      max_upload_size: 100,
      max_upload_size_unit: "MB",
      enableOverwrite: true,
      defaultUseProxy: false
    });
    const signSettings = ref({
      signAll: false,
      expires: 0
    });
    const sizeUnits = ["KB", "MB", "GB"];
    const isLoading = ref(false);
    const isSavingUpload = ref(false);
    const isSavingSign = ref(false);
    const isUploadFormValid = computed(() => {
      return uploadSettings.value.max_upload_size > 0;
    });
    onMounted(async () => {
      isLoading.value = true;
      try {
        const settings = await getGlobalSettings();
        settings.forEach((setting) => {
          switch (setting.key) {
            case "max_upload_size":
              uploadSettings.value.max_upload_size = parseInt(setting.value) || 100;
              uploadSettings.value.max_upload_size_unit = "MB";
              break;
            case "file_naming_strategy":
              uploadSettings.value.enableOverwrite = setting.value === "overwrite";
              break;
            case "default_use_proxy":
              uploadSettings.value.defaultUseProxy = setting.value === "true";
              break;
            case "proxy_sign_all":
              signSettings.value.signAll = setting.value === "true";
              break;
            case "proxy_sign_expires":
              signSettings.value.expires = parseInt(setting.value) || 0;
              break;
          }
        });
      } catch (error) {
        log.error("获取全局设置失败:", error);
        showError(t("admin.global.messages.updateFailed"));
      } finally {
        isLoading.value = false;
      }
    });
    const convertToMB = (value, unit) => {
      switch (unit) {
        case "KB":
          return value / 1024;
        case "GB":
          return value * 1024;
        default:
          return value;
      }
    };
    const handleSaveUpload = async () => {
      if (!isUploadFormValid.value) {
        showError(t("admin.global.uploadSettings.validationError"));
        return;
      }
      isSavingUpload.value = true;
      try {
        const convertedSize = convertToMB(
          uploadSettings.value.max_upload_size,
          uploadSettings.value.max_upload_size_unit
        );
        await updateGlobalSettings({
          max_upload_size: Math.round(convertedSize),
          file_naming_strategy: uploadSettings.value.enableOverwrite ? "overwrite" : "random_suffix",
          default_use_proxy: uploadSettings.value.defaultUseProxy.toString()
        });
        showSuccess(t("admin.global.messages.updateSuccess"));
      } catch (error) {
        log.error("更新上传设置失败:", error);
        showError(error.message || t("admin.global.messages.updateFailed"));
      } finally {
        isSavingUpload.value = false;
      }
    };
    const handleSaveSign = async () => {
      isSavingSign.value = true;
      try {
        await updateGlobalSettings({
          proxy_sign_all: signSettings.value.signAll.toString(),
          proxy_sign_expires: signSettings.value.expires.toString()
        });
        showSuccess(t("admin.global.messages.updateSuccess"));
      } catch (error) {
        log.error("更新签名设置失败:", error);
        showError(error.message || t("admin.global.messages.updateFailed"));
      } finally {
        isSavingSign.value = false;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("h1", {
            class: normalizeClass(["text-2xl font-bold mb-2", unref(darkMode) ? "text-white" : "text-gray-900"])
          }, toDisplayString(unref(t)("admin.global.title")), 3),
          createBaseVNode("p", {
            class: normalizeClass(["text-base", unref(darkMode) ? "text-gray-400" : "text-gray-600"])
          }, toDisplayString(unref(t)("admin.global.description")), 3)
        ]),
        isLoading.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createVNode(unref(IconRefresh), {
            size: "lg",
            class: normalizeClass(["animate-spin", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
          }, null, 8, ["class"])
        ])) : (openBlock(), createElementBlock("div", _hoisted_4, [
          createBaseVNode("section", {
            class: normalizeClass(["rounded-xl border transition-colors", unref(darkMode) ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"])
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["px-5 py-4 border-b", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
            }, [
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("div", {
                  class: normalizeClass(["flex items-center justify-center w-9 h-9 rounded-lg", unref(darkMode) ? "bg-blue-500/20" : "bg-blue-50"])
                }, [
                  createVNode(unref(IconUpload), {
                    size: "sm",
                    class: normalizeClass(unref(darkMode) ? "text-blue-400" : "text-blue-600")
                  }, null, 8, ["class"])
                ], 2),
                createBaseVNode("div", null, [
                  createBaseVNode("h2", {
                    class: normalizeClass(["text-base font-semibold", unref(darkMode) ? "text-white" : "text-gray-900"])
                  }, toDisplayString(unref(t)("admin.global.uploadSettings.title")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.global.uploadSettings.description")), 3)
                ])
              ])
            ], 2),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("div", _hoisted_7, [
                createBaseVNode("div", _hoisted_8, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                  }, [
                    createTextVNode(toDisplayString(unref(t)("admin.global.uploadSettings.maxUploadSizeLabel")) + " ", 1),
                    _cache[6] || (_cache[6] = createBaseVNode("span", { class: "text-red-500 ml-0.5" }, "*", -1))
                  ], 2)
                ]),
                createBaseVNode("div", _hoisted_9, [
                  withDirectives(createBaseVNode("input", {
                    type: "number",
                    min: "1",
                    step: "1",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => uploadSettings.value.max_upload_size = $event),
                    required: "",
                    class: normalizeClass(["w-24 px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40", unref(darkMode) ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"]),
                    placeholder: unref(t)("admin.global.uploadSettings.maxUploadSizePlaceholder")
                  }, null, 10, _hoisted_10), [
                    [
                      vModelText,
                      uploadSettings.value.max_upload_size,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => uploadSettings.value.max_upload_size_unit = $event),
                    class: normalizeClass(["px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40", unref(darkMode) ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"])
                  }, [
                    (openBlock(), createElementBlock(Fragment, null, renderList(sizeUnits, (unit) => {
                      return createBaseVNode("option", {
                        key: unit,
                        value: unit
                      }, toDisplayString(unit), 9, _hoisted_11);
                    }), 64))
                  ], 2), [
                    [vModelSelect, uploadSettings.value.max_upload_size_unit]
                  ])
                ])
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["border-t", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
              }, null, 2),
              createBaseVNode("div", _hoisted_12, [
                createBaseVNode("div", _hoisted_13, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                  }, toDisplayString(unref(t)("admin.global.uploadSettings.fileOverwriteModeLabel")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs mt-0.5", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.global.uploadSettings.fileOverwriteModeHint")), 3)
                ]),
                createBaseVNode("label", _hoisted_14, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => uploadSettings.value.enableOverwrite = $event),
                    class: "sr-only peer"
                  }, null, 512), [
                    [vModelCheckbox, uploadSettings.value.enableOverwrite]
                  ]),
                  _cache[7] || (_cache[7] = createBaseVNode("div", { class: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" }, null, -1))
                ])
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["border-t", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
              }, null, 2),
              createBaseVNode("div", _hoisted_15, [
                createBaseVNode("div", _hoisted_16, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                  }, toDisplayString(unref(t)("admin.global.uploadSettings.defaultUseProxyLabel")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs mt-0.5", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.global.uploadSettings.defaultUseProxyHint")), 3)
                ]),
                createBaseVNode("label", _hoisted_17, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => uploadSettings.value.defaultUseProxy = $event),
                    class: "sr-only peer"
                  }, null, 512), [
                    [vModelCheckbox, uploadSettings.value.defaultUseProxy]
                  ]),
                  _cache[8] || (_cache[8] = createBaseVNode("div", { class: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" }, null, -1))
                ])
              ])
            ]),
            createBaseVNode("div", {
              class: normalizeClass(["px-5 py-4 border-t flex justify-end", unref(darkMode) ? "border-gray-700 bg-gray-800/30" : "border-gray-100 bg-gray-50/50"])
            }, [
              createBaseVNode("button", {
                type: "button",
                onClick: handleSaveUpload,
                disabled: isSavingUpload.value || !isUploadFormValid.value,
                class: normalizeClass(["inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed", isSavingUpload.value ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"])
              }, [
                isSavingUpload.value ? (openBlock(), createBlock(unref(IconRefresh), {
                  key: 0,
                  size: "sm",
                  class: "animate-spin -ml-0.5 mr-2"
                })) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(isSavingUpload.value ? unref(t)("admin.global.buttons.updating") : unref(t)("admin.global.buttons.updateSettings")), 1)
              ], 10, _hoisted_18)
            ], 2)
          ], 2),
          createBaseVNode("section", {
            class: normalizeClass(["rounded-xl border transition-colors", unref(darkMode) ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"])
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["px-5 py-4 border-b", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
            }, [
              createBaseVNode("div", _hoisted_19, [
                createBaseVNode("div", {
                  class: normalizeClass(["flex items-center justify-center w-9 h-9 rounded-lg", unref(darkMode) ? "bg-emerald-500/20" : "bg-emerald-50"])
                }, [
                  createVNode(unref(IconShieldCheck), {
                    size: "sm",
                    class: normalizeClass(unref(darkMode) ? "text-emerald-400" : "text-emerald-600")
                  }, null, 8, ["class"])
                ], 2),
                createBaseVNode("div", null, [
                  createBaseVNode("h2", {
                    class: normalizeClass(["text-base font-semibold", unref(darkMode) ? "text-white" : "text-gray-900"])
                  }, toDisplayString(unref(t)("admin.global.proxySignSettings.title")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.global.proxySignSettings.description")), 3)
                ])
              ])
            ], 2),
            createBaseVNode("div", _hoisted_20, [
              createBaseVNode("div", _hoisted_21, [
                createBaseVNode("div", _hoisted_22, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                  }, toDisplayString(unref(t)("admin.global.proxySignSettings.signAllLabel")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs mt-0.5", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.global.proxySignSettings.signAllHint")), 3)
                ]),
                createBaseVNode("label", _hoisted_23, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => signSettings.value.signAll = $event),
                    class: "sr-only peer"
                  }, null, 512), [
                    [vModelCheckbox, signSettings.value.signAll]
                  ]),
                  _cache[9] || (_cache[9] = createBaseVNode("div", { class: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" }, null, -1))
                ])
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["border-t", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
              }, null, 2),
              createBaseVNode("div", _hoisted_24, [
                createBaseVNode("div", _hoisted_25, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                  }, toDisplayString(unref(t)("admin.global.proxySignSettings.expiresLabel")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs mt-0.5", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.global.proxySignSettings.expiresHint")), 3)
                ]),
                createBaseVNode("div", _hoisted_26, [
                  withDirectives(createBaseVNode("input", {
                    type: "number",
                    min: "0",
                    step: "1",
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => signSettings.value.expires = $event),
                    class: normalizeClass(["w-24 px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40", unref(darkMode) ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"]),
                    placeholder: "0"
                  }, null, 2), [
                    [
                      vModelText,
                      signSettings.value.expires,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("span", {
                    class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.global.proxySignSettings.expiresUnit")), 3)
                ])
              ])
            ]),
            createBaseVNode("div", {
              class: normalizeClass(["px-5 py-4 border-t flex justify-end", unref(darkMode) ? "border-gray-700 bg-gray-800/30" : "border-gray-100 bg-gray-50/50"])
            }, [
              createBaseVNode("button", {
                type: "button",
                onClick: handleSaveSign,
                disabled: isSavingSign.value,
                class: normalizeClass(["inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed", isSavingSign.value ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"])
              }, [
                isSavingSign.value ? (openBlock(), createBlock(unref(IconRefresh), {
                  key: 0,
                  size: "sm",
                  class: "animate-spin -ml-0.5 mr-2"
                })) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(isSavingSign.value ? unref(t)("admin.global.buttons.updating") : unref(t)("admin.global.buttons.updateSettings")), 1)
              ], 10, _hoisted_27)
            ], 2)
          ], 2)
        ]))
      ]);
    };
  }
};
export {
  _sfc_main as default
};
