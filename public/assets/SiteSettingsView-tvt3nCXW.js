import { e as useI18n, c as createLogger, ac as useThemeMode, Y as useGlobalMessage, g as ref, o as onMounted, j as createElementBlock, k as openBlock, l as createBaseVNode, z as createVNode, n as normalizeClass, y as unref, t as toDisplayString, J as IconRefresh, as as IconHome, q as withDirectives, v as vModelText, M as createBlock, at as IconGallery, p as createCommentVNode, A as createTextVNode, au as IconMegaphone, x as vModelCheckbox, am as IconAdjustments, ar as mergeProps, _ as __vitePreload } from "./index-BQxzU9F1.js";
import { V as VditorUnified } from "./VditorUnified-CK_SUxJD.js";
import { u as useConfirmDialog, _ as _sfc_main$1 } from "./useConfirmDialog-c5dcTgIB.js";
import { u as useAdminSystemService } from "./systemService-BJc_isGU.js";
const _hoisted_1 = { class: "flex-1 flex flex-col overflow-y-auto" };
const _hoisted_2 = { class: "mb-8 flex items-start justify-between" };
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
const _hoisted_9 = { class: "flex-shrink-0 w-64" };
const _hoisted_10 = ["placeholder"];
const _hoisted_11 = { class: "flex items-center justify-between gap-4 mb-2" };
const _hoisted_12 = ["src"];
const _hoisted_13 = ["placeholder"];
const _hoisted_14 = ["placeholder"];
const _hoisted_15 = ["disabled"];
const _hoisted_16 = { class: "flex items-center gap-3" };
const _hoisted_17 = { class: "p-5 space-y-4" };
const _hoisted_18 = { class: "flex items-center justify-between gap-4" };
const _hoisted_19 = { class: "flex-1 min-w-0" };
const _hoisted_20 = { class: "relative inline-flex items-center cursor-pointer flex-shrink-0" };
const _hoisted_21 = ["disabled"];
const _hoisted_22 = { class: "flex items-center gap-3" };
const _hoisted_23 = { class: "p-5 space-y-4" };
const _hoisted_24 = { class: "flex items-center justify-between gap-4" };
const _hoisted_25 = { class: "flex-1 min-w-0" };
const _hoisted_26 = { class: "relative inline-flex items-center cursor-pointer flex-shrink-0" };
const _hoisted_27 = { class: "flex items-center justify-between gap-4" };
const _hoisted_28 = { class: "flex-1 min-w-0" };
const _hoisted_29 = { class: "relative inline-flex items-center cursor-pointer flex-shrink-0" };
const _hoisted_30 = { class: "flex items-center justify-between gap-4" };
const _hoisted_31 = { class: "flex-1 min-w-0" };
const _hoisted_32 = { class: "relative inline-flex items-center cursor-pointer flex-shrink-0" };
const _hoisted_33 = ["placeholder"];
const _hoisted_34 = ["placeholder"];
const _hoisted_35 = ["disabled"];
const _sfc_main = {
  __name: "SiteSettingsView",
  setup(__props) {
    const { t } = useI18n();
    const log = createLogger("SiteSettingsView");
    const { getSiteSettings, updateSiteSettings } = useAdminSystemService();
    const { isDarkMode: darkMode } = useThemeMode();
    const { showSuccess, showError } = useGlobalMessage();
    const { dialogState, confirm, handleConfirm, handleCancel } = useConfirmDialog();
    const siteSettings = ref({
      site_title: "CloudPaste",
      site_favicon_url: "",
      site_footer_markdown: "© 2025 CloudPaste. 保留所有权利。",
      site_announcement_enabled: false,
      site_announcement_content: "",
      site_custom_head: "",
      site_custom_body: "",
      site_home_editor_enabled: true,
      site_upload_page_enabled: true,
      site_mount_explorer_enabled: true
    });
    const isLoading = ref(false);
    const isSavingBasic = ref(false);
    const isSavingAnnouncement = ref(false);
    const isSavingAdvanced = ref(false);
    onMounted(async () => {
      isLoading.value = true;
      try {
        const settings = await getSiteSettings();
        settings.forEach((setting) => {
          switch (setting.key) {
            case "site_title":
              siteSettings.value.site_title = setting.value || "CloudPaste";
              break;
            case "site_favicon_url":
              siteSettings.value.site_favicon_url = setting.value || "";
              break;
            case "site_footer_markdown":
              siteSettings.value.site_footer_markdown = setting.value;
              break;
            case "site_announcement_enabled":
              siteSettings.value.site_announcement_enabled = setting.value === "true";
              break;
            case "site_announcement_content":
              siteSettings.value.site_announcement_content = setting.value || "";
              break;
            case "site_custom_head":
              siteSettings.value.site_custom_head = setting.value || "";
              break;
            case "site_custom_body":
              siteSettings.value.site_custom_body = setting.value || "";
              break;
            case "site_home_editor_enabled":
              siteSettings.value.site_home_editor_enabled = setting.value === "true";
              break;
            case "site_upload_page_enabled":
              siteSettings.value.site_upload_page_enabled = setting.value === "true";
              break;
            case "site_mount_explorer_enabled":
              siteSettings.value.site_mount_explorer_enabled = setting.value === "true";
              break;
          }
        });
      } catch (error) {
        log.error("获取站点设置失败:", error);
        showError(t("admin.site.messages.updateFailed"));
      } finally {
        isLoading.value = false;
      }
    });
    const handleSaveBasic = async () => {
      isSavingBasic.value = true;
      try {
        await updateSiteSettings({
          site_title: siteSettings.value.site_title || "CloudPaste",
          site_favicon_url: siteSettings.value.site_favicon_url || "",
          site_footer_markdown: siteSettings.value.site_footer_markdown || ""
        });
        showSuccess(t("admin.site.messages.updateSuccess"));
        await updateSiteConfigStore();
      } catch (error) {
        log.error("更新基础站点信息失败:", error);
        showError(error.message || t("admin.site.messages.updateFailed"));
      } finally {
        isSavingBasic.value = false;
      }
    };
    const handleSaveAnnouncement = async () => {
      isSavingAnnouncement.value = true;
      try {
        await updateSiteSettings({
          site_announcement_enabled: siteSettings.value.site_announcement_enabled.toString(),
          site_announcement_content: siteSettings.value.site_announcement_content
        });
        showSuccess(t("admin.site.messages.updateSuccess"));
        await updateSiteConfigStore();
      } catch (error) {
        log.error("更新公告设置失败:", error);
        showError(error.message || t("admin.site.messages.updateFailed"));
      } finally {
        isSavingAnnouncement.value = false;
      }
    };
    const handleSaveAdvanced = async () => {
      isSavingAdvanced.value = true;
      try {
        await updateSiteSettings({
          site_home_editor_enabled: siteSettings.value.site_home_editor_enabled.toString(),
          site_upload_page_enabled: siteSettings.value.site_upload_page_enabled.toString(),
          site_mount_explorer_enabled: siteSettings.value.site_mount_explorer_enabled.toString(),
          site_custom_head: siteSettings.value.site_custom_head || "",
          site_custom_body: siteSettings.value.site_custom_body || ""
        });
        showSuccess(t("admin.site.messages.updateSuccess"));
        await updateSiteConfigStore();
      } catch (error) {
        log.error("更新高级设置失败:", error);
        showError(error.message || t("admin.site.messages.updateFailed"));
      } finally {
        isSavingAdvanced.value = false;
      }
    };
    const updateSiteConfigStore = async () => {
      try {
        const { useSiteConfigStore } = await __vitePreload(async () => {
          const { useSiteConfigStore: useSiteConfigStore2 } = await import("./index-BQxzU9F1.js").then((n) => n.f8);
          return { useSiteConfigStore: useSiteConfigStore2 };
        }, true ? [] : void 0);
        const siteConfigStore = useSiteConfigStore();
        siteConfigStore.updateSiteTitle(siteSettings.value.site_title);
        siteConfigStore.updateSiteFavicon(siteSettings.value.site_favicon_url);
        siteConfigStore.updateSiteFooter(siteSettings.value.site_footer_markdown);
        siteConfigStore.updateCustomHead(siteSettings.value.site_custom_head);
        siteConfigStore.updateCustomBody(siteSettings.value.site_custom_body);
        await siteConfigStore.refresh?.();
      } catch (storeError) {
        log.warn("更新站点配置Store失败:", storeError);
      }
    };
    const resetSettings = async () => {
      const confirmed = await confirm({
        title: t("common.dialogs.resetTitle"),
        message: t("common.dialogs.resetConfirm"),
        confirmType: "warning",
        confirmText: t("common.dialogs.resetButton"),
        darkMode: darkMode.value
      });
      if (!confirmed) return;
      siteSettings.value.site_title = "CloudPaste";
      siteSettings.value.site_favicon_url = "";
      siteSettings.value.site_footer_markdown = "© 2025 CloudPaste. 保留所有权利。";
      siteSettings.value.site_announcement_enabled = false;
      siteSettings.value.site_announcement_content = "";
      siteSettings.value.site_home_editor_enabled = true;
      siteSettings.value.site_upload_page_enabled = true;
      siteSettings.value.site_mount_explorer_enabled = true;
      siteSettings.value.site_custom_head = "";
      siteSettings.value.site_custom_body = "";
    };
    const handleClearAnnouncementContent = () => {
      siteSettings.value.site_announcement_content = "";
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", null, [
            createBaseVNode("h1", {
              class: normalizeClass(["text-2xl font-bold mb-2", unref(darkMode) ? "text-white" : "text-gray-900"])
            }, toDisplayString(unref(t)("admin.site.title")), 3),
            createBaseVNode("p", {
              class: normalizeClass(["text-base", unref(darkMode) ? "text-gray-400" : "text-gray-600"])
            }, toDisplayString(unref(t)("admin.site.description")), 3)
          ]),
          createBaseVNode("button", {
            type: "button",
            onClick: resetSettings,
            class: normalizeClass(["flex-shrink-0 px-4 py-2 text-sm font-medium border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", unref(darkMode) ? "text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600" : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"])
          }, toDisplayString(unref(t)("admin.site.buttons.reset")), 3)
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
                  createVNode(unref(IconHome), {
                    size: "sm",
                    class: normalizeClass(unref(darkMode) ? "text-blue-400" : "text-blue-600")
                  }, null, 8, ["class"])
                ], 2),
                createBaseVNode("div", null, [
                  createBaseVNode("h2", {
                    class: normalizeClass(["text-base font-semibold", unref(darkMode) ? "text-white" : "text-gray-900"])
                  }, toDisplayString(unref(t)("admin.site.groups.basic")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.site.siteTitle.hint")), 3)
                ])
              ])
            ], 2),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("div", _hoisted_7, [
                createBaseVNode("div", _hoisted_8, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                  }, toDisplayString(unref(t)("admin.site.siteTitle.label")), 3)
                ]),
                createBaseVNode("div", _hoisted_9, [
                  withDirectives(createBaseVNode("input", {
                    type: "text",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => siteSettings.value.site_title = $event),
                    placeholder: unref(t)("admin.site.siteTitle.placeholder"),
                    class: normalizeClass(["w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40", unref(darkMode) ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"]),
                    maxlength: "100"
                  }, null, 10, _hoisted_10), [
                    [vModelText, siteSettings.value.site_title]
                  ])
                ])
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["border-t", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
              }, null, 2),
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_11, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                  }, toDisplayString(unref(t)("admin.site.favicon.label")), 3),
                  createBaseVNode("div", {
                    class: normalizeClass(["w-8 h-8 border rounded flex items-center justify-center flex-shrink-0", unref(darkMode) ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"])
                  }, [
                    siteSettings.value.site_favicon_url ? (openBlock(), createElementBlock("img", {
                      key: 0,
                      src: siteSettings.value.site_favicon_url,
                      alt: "站点图标预览",
                      class: "w-6 h-6 object-contain",
                      onError: _cache[1] || (_cache[1] = ($event) => $event.target.style.display = "none")
                    }, null, 40, _hoisted_12)) : (openBlock(), createBlock(unref(IconGallery), {
                      key: 1,
                      size: "sm",
                      class: normalizeClass(unref(darkMode) ? "text-gray-400" : "text-gray-500")
                    }, null, 8, ["class"]))
                  ], 2)
                ]),
                withDirectives(createBaseVNode("input", {
                  type: "url",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => siteSettings.value.site_favicon_url = $event),
                  placeholder: unref(t)("admin.site.favicon.placeholder"),
                  class: normalizeClass(["w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40", unref(darkMode) ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"])
                }, null, 10, _hoisted_13), [
                  [vModelText, siteSettings.value.site_favicon_url]
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs mt-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.site.favicon.hint")), 3)
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["border-t", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
              }, null, 2),
              createBaseVNode("div", null, [
                createBaseVNode("label", {
                  class: normalizeClass(["block text-sm font-medium mb-2", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                }, toDisplayString(unref(t)("admin.site.footer.label")), 3),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => siteSettings.value.site_footer_markdown = $event),
                  placeholder: unref(t)("admin.site.footer.placeholder"),
                  rows: "3",
                  class: normalizeClass(["w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-vertical", unref(darkMode) ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"])
                }, null, 10, _hoisted_14), [
                  [vModelText, siteSettings.value.site_footer_markdown]
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs mt-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.site.footer.hint")), 3)
              ])
            ]),
            createBaseVNode("div", {
              class: normalizeClass(["px-5 py-4 border-t flex justify-end", unref(darkMode) ? "border-gray-700 bg-gray-800/30" : "border-gray-100 bg-gray-50/50"])
            }, [
              createBaseVNode("button", {
                type: "button",
                onClick: handleSaveBasic,
                disabled: isSavingBasic.value,
                class: normalizeClass(["inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed", isSavingBasic.value ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"])
              }, [
                isSavingBasic.value ? (openBlock(), createBlock(unref(IconRefresh), {
                  key: 0,
                  size: "sm",
                  class: "animate-spin -ml-0.5 mr-2"
                })) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(isSavingBasic.value ? unref(t)("admin.site.buttons.updating") : unref(t)("admin.site.buttons.updateSettings")), 1)
              ], 10, _hoisted_15)
            ], 2)
          ], 2),
          createBaseVNode("section", {
            class: normalizeClass(["rounded-xl border transition-colors", unref(darkMode) ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"])
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["px-5 py-4 border-b", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
            }, [
              createBaseVNode("div", _hoisted_16, [
                createBaseVNode("div", {
                  class: normalizeClass(["flex items-center justify-center w-9 h-9 rounded-lg", unref(darkMode) ? "bg-amber-500/20" : "bg-amber-50"])
                }, [
                  createVNode(unref(IconMegaphone), {
                    size: "sm",
                    class: normalizeClass(unref(darkMode) ? "text-amber-400" : "text-amber-600")
                  }, null, 8, ["class"])
                ], 2),
                createBaseVNode("div", null, [
                  createBaseVNode("h2", {
                    class: normalizeClass(["text-base font-semibold", unref(darkMode) ? "text-white" : "text-gray-900"])
                  }, toDisplayString(unref(t)("admin.site.groups.announcement")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.site.announcement.enableHint")), 3)
                ])
              ])
            ], 2),
            createBaseVNode("div", _hoisted_17, [
              createBaseVNode("div", _hoisted_18, [
                createBaseVNode("div", _hoisted_19, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                  }, toDisplayString(unref(t)("admin.site.announcement.enableLabel")), 3)
                ]),
                createBaseVNode("label", _hoisted_20, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => siteSettings.value.site_announcement_enabled = $event),
                    class: "sr-only peer"
                  }, null, 512), [
                    [vModelCheckbox, siteSettings.value.site_announcement_enabled]
                  ]),
                  _cache[11] || (_cache[11] = createBaseVNode("div", { class: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" }, null, -1))
                ])
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["border-t", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
              }, null, 2),
              createBaseVNode("div", null, [
                createBaseVNode("label", {
                  class: normalizeClass(["block text-sm font-medium mb-2", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                }, toDisplayString(unref(t)("admin.site.announcement.contentLabel")), 3),
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs mb-3", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.site.announcement.contentHint")), 3),
                createVNode(VditorUnified, {
                  modelValue: siteSettings.value.site_announcement_content,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => siteSettings.value.site_announcement_content = $event),
                  "dark-mode": unref(darkMode),
                  "mini-mode": true,
                  placeholder: unref(t)("admin.site.announcement.contentPlaceholder"),
                  onClearContent: handleClearAnnouncementContent
                }, null, 8, ["modelValue", "dark-mode", "placeholder"])
              ])
            ]),
            createBaseVNode("div", {
              class: normalizeClass(["px-5 py-4 border-t flex justify-end", unref(darkMode) ? "border-gray-700 bg-gray-800/30" : "border-gray-100 bg-gray-50/50"])
            }, [
              createBaseVNode("button", {
                type: "button",
                onClick: handleSaveAnnouncement,
                disabled: isSavingAnnouncement.value,
                class: normalizeClass(["inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed", isSavingAnnouncement.value ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"])
              }, [
                isSavingAnnouncement.value ? (openBlock(), createBlock(unref(IconRefresh), {
                  key: 0,
                  size: "sm",
                  class: "animate-spin -ml-0.5 mr-2"
                })) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(isSavingAnnouncement.value ? unref(t)("admin.site.buttons.updating") : unref(t)("admin.site.buttons.updateSettings")), 1)
              ], 10, _hoisted_21)
            ], 2)
          ], 2),
          createBaseVNode("section", {
            class: normalizeClass(["rounded-xl border transition-colors", unref(darkMode) ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"])
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["px-5 py-4 border-b", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
            }, [
              createBaseVNode("div", _hoisted_22, [
                createBaseVNode("div", {
                  class: normalizeClass(["flex items-center justify-center w-9 h-9 rounded-lg", unref(darkMode) ? "bg-purple-500/20" : "bg-purple-50"])
                }, [
                  createVNode(unref(IconAdjustments), {
                    size: "sm",
                    class: normalizeClass(unref(darkMode) ? "text-purple-400" : "text-purple-600")
                  }, null, 8, ["class"])
                ], 2),
                createBaseVNode("div", null, [
                  createBaseVNode("h2", {
                    class: normalizeClass(["text-base font-semibold", unref(darkMode) ? "text-white" : "text-gray-900"])
                  }, toDisplayString(unref(t)("admin.site.frontendEntries.title")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.site.frontendEntries.hint")), 3)
                ])
              ])
            ], 2),
            createBaseVNode("div", _hoisted_23, [
              createBaseVNode("div", _hoisted_24, [
                createBaseVNode("div", _hoisted_25, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                  }, toDisplayString(unref(t)("admin.site.frontendEntries.homeEditor.label")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs mt-0.5", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.site.frontendEntries.homeEditor.hint")), 3)
                ]),
                createBaseVNode("label", _hoisted_26, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => siteSettings.value.site_home_editor_enabled = $event),
                    class: "sr-only peer"
                  }, null, 512), [
                    [vModelCheckbox, siteSettings.value.site_home_editor_enabled]
                  ]),
                  _cache[12] || (_cache[12] = createBaseVNode("div", { class: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" }, null, -1))
                ])
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["border-t", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
              }, null, 2),
              createBaseVNode("div", _hoisted_27, [
                createBaseVNode("div", _hoisted_28, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                  }, toDisplayString(unref(t)("admin.site.frontendEntries.uploadPage.label")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs mt-0.5", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.site.frontendEntries.uploadPage.hint")), 3)
                ]),
                createBaseVNode("label", _hoisted_29, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => siteSettings.value.site_upload_page_enabled = $event),
                    class: "sr-only peer"
                  }, null, 512), [
                    [vModelCheckbox, siteSettings.value.site_upload_page_enabled]
                  ]),
                  _cache[13] || (_cache[13] = createBaseVNode("div", { class: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" }, null, -1))
                ])
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["border-t", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
              }, null, 2),
              createBaseVNode("div", _hoisted_30, [
                createBaseVNode("div", _hoisted_31, [
                  createBaseVNode("label", {
                    class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                  }, toDisplayString(unref(t)("admin.site.frontendEntries.mountExplorer.label")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs mt-0.5", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.site.frontendEntries.mountExplorer.hint")), 3)
                ]),
                createBaseVNode("label", _hoisted_32, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => siteSettings.value.site_mount_explorer_enabled = $event),
                    class: "sr-only peer"
                  }, null, 512), [
                    [vModelCheckbox, siteSettings.value.site_mount_explorer_enabled]
                  ]),
                  _cache[14] || (_cache[14] = createBaseVNode("div", { class: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" }, null, -1))
                ])
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["border-t", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
              }, null, 2),
              createBaseVNode("div", null, [
                createBaseVNode("label", {
                  class: normalizeClass(["block text-sm font-medium mb-2", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                }, toDisplayString(unref(t)("admin.site.customHead")), 3),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => siteSettings.value.site_custom_head = $event),
                  rows: "6",
                  placeholder: unref(t)("admin.site.customHeadPlaceholder"),
                  class: normalizeClass(["w-full px-3 py-2 border rounded-lg font-mono text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-vertical", unref(darkMode) ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"])
                }, null, 10, _hoisted_33), [
                  [vModelText, siteSettings.value.site_custom_head]
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs mt-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.site.customHeadHelp")), 3)
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["border-t", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
              }, null, 2),
              createBaseVNode("div", null, [
                createBaseVNode("label", {
                  class: normalizeClass(["block text-sm font-medium mb-2", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                }, toDisplayString(unref(t)("admin.site.customBody")), 3),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => siteSettings.value.site_custom_body = $event),
                  rows: "6",
                  placeholder: unref(t)("admin.site.customBodyPlaceholder"),
                  class: normalizeClass(["w-full px-3 py-2 border rounded-lg font-mono text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-vertical", unref(darkMode) ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"])
                }, null, 10, _hoisted_34), [
                  [vModelText, siteSettings.value.site_custom_body]
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs mt-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.site.customBodyHelp")), 3)
              ])
            ]),
            createBaseVNode("div", {
              class: normalizeClass(["px-5 py-4 border-t flex justify-end", unref(darkMode) ? "border-gray-700 bg-gray-800/30" : "border-gray-100 bg-gray-50/50"])
            }, [
              createBaseVNode("button", {
                type: "button",
                onClick: handleSaveAdvanced,
                disabled: isSavingAdvanced.value,
                class: normalizeClass(["inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed", isSavingAdvanced.value ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"])
              }, [
                isSavingAdvanced.value ? (openBlock(), createBlock(unref(IconRefresh), {
                  key: 0,
                  size: "sm",
                  class: "animate-spin -ml-0.5 mr-2"
                })) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(isSavingAdvanced.value ? unref(t)("admin.site.buttons.updating") : unref(t)("admin.site.buttons.updateSettings")), 1)
              ], 10, _hoisted_35)
            ], 2)
          ], 2)
        ])),
        createVNode(_sfc_main$1, mergeProps(unref(dialogState), {
          onConfirm: unref(handleConfirm),
          onCancel: unref(handleCancel)
        }), null, 16, ["onConfirm", "onCancel"])
      ]);
    };
  }
};
export {
  _sfc_main as default
};
