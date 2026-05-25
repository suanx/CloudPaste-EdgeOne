import { e as useI18n, c as createLogger, ac as useThemeMode, Y as useGlobalMessage, g as ref, o as onMounted, ag as API_BASE_URL, j as createElementBlock, k as openBlock, l as createBaseVNode, n as normalizeClass, y as unref, t as toDisplayString, z as createVNode, J as IconRefresh, ah as IconCloud, K as Fragment, L as renderList, q as withDirectives, ai as vModelRadio, M as createBlock, p as createCommentVNode, aj as IconCheck, A as createTextVNode, ak as IconInformationCircle, al as IconCopy, B as IconUser, I as IconKey } from "./index-BQxzU9F1.js";
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
const _hoisted_6 = { class: "p-5" };
const _hoisted_7 = { class: "space-y-3" };
const _hoisted_8 = { class: "space-y-2" };
const _hoisted_9 = ["value"];
const _hoisted_10 = { class: "flex-1 min-w-0" };
const _hoisted_11 = ["disabled"];
const _hoisted_12 = { class: "flex items-center gap-3" };
const _hoisted_13 = { class: "p-5 space-y-4" };
const _hoisted_14 = { class: "flex items-center justify-between gap-4" };
const _hoisted_15 = { class: "flex-1 min-w-0" };
const _hoisted_16 = { class: "flex items-center gap-2 flex-shrink-0" };
const _hoisted_17 = ["title"];
const _hoisted_18 = { class: "space-y-3" };
const _hoisted_19 = { class: "space-y-2" };
const _sfc_main = {
  __name: "WebDAVSettingsView",
  setup(__props) {
    const { t } = useI18n();
    const log = createLogger("WebDAVSettingsView");
    const { getWebdavSettings, updateWebdavSettings } = useAdminSystemService();
    const { isDarkMode: darkMode } = useThemeMode();
    const { showSuccess, showError } = useGlobalMessage();
    const webdavSettings = ref({
      webdav_upload_mode: "chunked"
    });
    const uploadModes = [
      { value: "chunked", labelKey: "admin.webdav.uploadSettings.modes.chunked" },
      { value: "single", labelKey: "admin.webdav.uploadSettings.modes.single" }
    ];
    const webdavUrl = ref("");
    const isLoading = ref(false);
    const isSaving = ref(false);
    const isCopied = ref(false);
    onMounted(async () => {
      webdavUrl.value = `${API_BASE_URL}/dav`;
      isLoading.value = true;
      try {
        const settings = await getWebdavSettings();
        settings.forEach((setting) => {
          if (setting.key === "webdav_upload_mode") {
            webdavSettings.value.webdav_upload_mode = setting.value || "chunked";
          }
        });
      } catch (error) {
        log.error("获取 WebDAV 设置失败:", error);
        showError(t("admin.webdav.messages.updateFailed"));
      } finally {
        isLoading.value = false;
      }
    });
    const handleSave = async () => {
      isSaving.value = true;
      try {
        await updateWebdavSettings({
          webdav_upload_mode: webdavSettings.value.webdav_upload_mode
        });
        showSuccess(t("admin.webdav.messages.updateSuccess"));
      } catch (error) {
        log.error("更新 WebDAV 设置失败:", error);
        showError(error.message || t("admin.webdav.messages.updateFailed"));
      } finally {
        isSaving.value = false;
      }
    };
    const copyWebdavUrl = async () => {
      try {
        await navigator.clipboard.writeText(webdavUrl.value);
        isCopied.value = true;
        showSuccess(t("fileView.actions.copied"));
        setTimeout(() => {
          isCopied.value = false;
        }, 2e3);
      } catch (error) {
        log.error("复制失败:", error);
        showError(t("fileView.actions.copyFailed"));
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("h1", {
            class: normalizeClass(["text-2xl font-bold mb-2", unref(darkMode) ? "text-white" : "text-gray-900"])
          }, toDisplayString(unref(t)("admin.webdav.title")), 3),
          createBaseVNode("p", {
            class: normalizeClass(["text-base", unref(darkMode) ? "text-gray-400" : "text-gray-600"])
          }, toDisplayString(unref(t)("admin.webdav.description")), 3)
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
                  createVNode(unref(IconCloud), {
                    size: "sm",
                    class: normalizeClass(unref(darkMode) ? "text-blue-400" : "text-blue-600")
                  }, null, 8, ["class"])
                ], 2),
                createBaseVNode("div", null, [
                  createBaseVNode("h2", {
                    class: normalizeClass(["text-base font-semibold", unref(darkMode) ? "text-white" : "text-gray-900"])
                  }, toDisplayString(unref(t)("admin.webdav.uploadSettings.title")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.webdav.uploadSettings.description")), 3)
                ])
              ])
            ], 2),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("div", _hoisted_7, [
                createBaseVNode("label", {
                  class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                }, toDisplayString(unref(t)("admin.webdav.uploadSettings.uploadModeLabel")), 3),
                createBaseVNode("div", _hoisted_8, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(uploadModes, (mode) => {
                    return createBaseVNode("label", {
                      key: mode.value,
                      class: normalizeClass(["relative flex items-start p-3 rounded-lg border-2 cursor-pointer transition-all", [
                        webdavSettings.value.webdav_upload_mode === mode.value ? unref(darkMode) ? "border-blue-500 bg-blue-500/10" : "border-blue-500 bg-blue-50" : unref(darkMode) ? "border-gray-600 hover:border-gray-500 bg-gray-700/30" : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                      ]])
                    }, [
                      withDirectives(createBaseVNode("input", {
                        type: "radio",
                        value: mode.value,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => webdavSettings.value.webdav_upload_mode = $event),
                        class: "sr-only"
                      }, null, 8, _hoisted_9), [
                        [vModelRadio, webdavSettings.value.webdav_upload_mode]
                      ]),
                      createBaseVNode("div", _hoisted_10, [
                        createBaseVNode("span", {
                          class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-white" : "text-gray-900"])
                        }, toDisplayString(unref(t)(mode.labelKey)), 3)
                      ]),
                      createBaseVNode("div", {
                        class: normalizeClass(["w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ml-3 mt-0.5", webdavSettings.value.webdav_upload_mode === mode.value ? "bg-blue-500" : unref(darkMode) ? "border-2 border-gray-500" : "border-2 border-gray-300"])
                      }, [
                        webdavSettings.value.webdav_upload_mode === mode.value ? (openBlock(), createBlock(unref(IconCheck), {
                          key: 0,
                          size: "xs",
                          class: "text-white"
                        })) : createCommentVNode("", true)
                      ], 2)
                    ], 2);
                  }), 64))
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.webdav.uploadSettings.uploadModeHint")), 3)
              ])
            ]),
            createBaseVNode("div", {
              class: normalizeClass(["px-5 py-4 border-t flex justify-end", unref(darkMode) ? "border-gray-700 bg-gray-800/30" : "border-gray-100 bg-gray-50/50"])
            }, [
              createBaseVNode("button", {
                type: "button",
                onClick: handleSave,
                disabled: isSaving.value,
                class: normalizeClass(["inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed", isSaving.value ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"])
              }, [
                isSaving.value ? (openBlock(), createBlock(unref(IconRefresh), {
                  key: 0,
                  size: "sm",
                  class: "animate-spin -ml-0.5 mr-2"
                })) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(isSaving.value ? unref(t)("admin.webdav.buttons.updating") : unref(t)("admin.webdav.buttons.updateSettings")), 1)
              ], 10, _hoisted_11)
            ], 2)
          ], 2),
          createBaseVNode("section", {
            class: normalizeClass(["rounded-xl border transition-colors", unref(darkMode) ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"])
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["px-5 py-4 border-b", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
            }, [
              createBaseVNode("div", _hoisted_12, [
                createBaseVNode("div", {
                  class: normalizeClass(["flex items-center justify-center w-9 h-9 rounded-lg", unref(darkMode) ? "bg-purple-500/20" : "bg-purple-50"])
                }, [
                  createVNode(unref(IconInformationCircle), {
                    size: "sm",
                    class: normalizeClass(unref(darkMode) ? "text-purple-400" : "text-purple-600")
                  }, null, 8, ["class"])
                ], 2),
                createBaseVNode("div", null, [
                  createBaseVNode("h2", {
                    class: normalizeClass(["text-base font-semibold", unref(darkMode) ? "text-white" : "text-gray-900"])
                  }, toDisplayString(unref(t)("admin.webdav.protocolInfo.title")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.webdav.protocolInfo.description")), 3)
                ])
              ])
            ], 2),
            createBaseVNode("div", _hoisted_13, [
              createBaseVNode("div", _hoisted_14, [
                createBaseVNode("div", _hoisted_15, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                  }, toDisplayString(unref(t)("admin.webdav.protocolInfo.webdavUrlLabel")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs mt-0.5", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.webdav.protocolInfo.webdavUrlHint")), 3)
                ]),
                createBaseVNode("div", _hoisted_16, [
                  createBaseVNode("div", {
                    class: normalizeClass(["px-3 py-2 rounded-lg font-mono text-sm", unref(darkMode) ? "bg-gray-700/70 text-gray-200" : "bg-gray-100 text-gray-700"])
                  }, toDisplayString(webdavUrl.value), 3),
                  createBaseVNode("button", {
                    type: "button",
                    onClick: copyWebdavUrl,
                    class: normalizeClass(["flex-shrink-0 p-2 rounded-lg border transition-all", [
                      isCopied.value ? "bg-green-500 border-green-500 text-white" : unref(darkMode) ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-600 hover:bg-gray-100"
                    ]]),
                    title: isCopied.value ? unref(t)("fileView.actions.copied") : unref(t)("fileView.actions.copyLink")
                  }, [
                    isCopied.value ? (openBlock(), createBlock(unref(IconCheck), {
                      key: 0,
                      size: "sm"
                    })) : (openBlock(), createBlock(unref(IconCopy), {
                      key: 1,
                      size: "sm"
                    }))
                  ], 10, _hoisted_17)
                ])
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["border-t", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
              }, null, 2),
              createBaseVNode("div", _hoisted_18, [
                createBaseVNode("label", {
                  class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                }, toDisplayString(unref(t)("admin.webdav.protocolInfo.authMethodLabel")), 3),
                createBaseVNode("div", _hoisted_19, [
                  createBaseVNode("div", {
                    class: normalizeClass(["flex items-center gap-3 p-3 rounded-lg border", unref(darkMode) ? "bg-gray-700/30 border-gray-600" : "bg-gray-50 border-gray-200"])
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", unref(darkMode) ? "bg-gray-600" : "bg-gray-200"])
                    }, [
                      createVNode(unref(IconUser), {
                        size: "sm",
                        class: normalizeClass(unref(darkMode) ? "text-gray-300" : "text-gray-600")
                      }, null, 8, ["class"])
                    ], 2),
                    createBaseVNode("span", {
                      class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                    }, toDisplayString(unref(t)("admin.webdav.protocolInfo.adminAuth")), 3)
                  ], 2),
                  createBaseVNode("div", {
                    class: normalizeClass(["flex items-center gap-3 p-3 rounded-lg border", unref(darkMode) ? "bg-gray-700/30 border-gray-600" : "bg-gray-50 border-gray-200"])
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", unref(darkMode) ? "bg-gray-600" : "bg-gray-200"])
                    }, [
                      createVNode(unref(IconKey), {
                        size: "sm",
                        class: normalizeClass(unref(darkMode) ? "text-gray-300" : "text-gray-600")
                      }, null, 8, ["class"])
                    ], 2),
                    createBaseVNode("span", {
                      class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                    }, toDisplayString(unref(t)("admin.webdav.protocolInfo.apiKeyAuth")), 3)
                  ], 2)
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.webdav.protocolInfo.authHint")), 3)
              ])
            ])
          ], 2)
        ]))
      ]);
    };
  }
};
export {
  _sfc_main as default
};
