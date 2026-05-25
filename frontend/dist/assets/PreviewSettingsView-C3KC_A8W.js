import { e as useI18n, c as createLogger, ac as useThemeMode, Y as useGlobalMessage, g as ref, F as computed, o as onMounted, j as createElementBlock, k as openBlock, l as createBaseVNode, z as createVNode, n as normalizeClass, y as unref, t as toDisplayString, J as IconRefresh, P as IconCollection, q as withDirectives, v as vModelText, M as createBlock, p as createCommentVNode, A as createTextVNode, am as IconAdjustments, an as IconPlus, ao as IconChevronDown, ap as IconChevronUp, K as Fragment, L as renderList, ab as IconChevronRight, aq as vShow, ae as vModelSelect, ar as mergeProps } from "./index-BQxzU9F1.js";
import { u as useAdminSystemService } from "./systemService-BJc_isGU.js";
import { u as useConfirmDialog, _ as _sfc_main$1 } from "./useConfirmDialog-c5dcTgIB.js";
const _hoisted_1 = { class: "flex-1 flex flex-col overflow-y-auto" };
const _hoisted_2 = { class: "mb-8 flex items-start justify-between" };
const _hoisted_3 = ["disabled"];
const _hoisted_4 = {
  key: 0,
  class: "flex items-center justify-center py-12"
};
const _hoisted_5 = {
  key: 1,
  class: "space-y-6 max-w-2xl"
};
const _hoisted_6 = { class: "flex items-center gap-3" };
const _hoisted_7 = { class: "p-5 space-y-4" };
const _hoisted_8 = ["placeholder"];
const _hoisted_9 = ["placeholder"];
const _hoisted_10 = ["placeholder"];
const _hoisted_11 = ["placeholder"];
const _hoisted_12 = ["disabled"];
const _hoisted_13 = { class: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" };
const _hoisted_14 = { class: "flex items-center gap-3" };
const _hoisted_15 = { class: "min-w-0" };
const _hoisted_16 = { class: "p-5" };
const _hoisted_17 = {
  key: 0,
  class: "space-y-4"
};
const _hoisted_18 = {
  key: 1,
  class: "flex items-center justify-between"
};
const _hoisted_19 = { class: "flex items-center justify-between gap-2" };
const _hoisted_20 = { class: "flex items-center gap-2 min-w-0" };
const _hoisted_21 = ["title", "onClick"];
const _hoisted_22 = ["title"];
const _hoisted_23 = { class: "flex items-center gap-2 flex-shrink-0" };
const _hoisted_24 = ["disabled", "title", "onClick"];
const _hoisted_25 = ["disabled", "title", "onClick"];
const _hoisted_26 = ["onClick"];
const _hoisted_27 = { class: "space-y-3" };
const _hoisted_28 = { class: "grid grid-cols-1 md:grid-cols-3 gap-3" };
const _hoisted_29 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_30 = ["onUpdate:modelValue"];
const _hoisted_31 = ["onUpdate:modelValue"];
const _hoisted_32 = {
  value: "",
  disabled: ""
};
const _hoisted_33 = ["value"];
const _hoisted_34 = { class: "grid grid-cols-1 md:grid-cols-1 gap-3" };
const _hoisted_35 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_36 = { class: "mt-3" };
const _hoisted_37 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_38 = { class: "space-y-2" };
const _hoisted_39 = { class: "flex items-center justify-between" };
const _hoisted_40 = {
  key: 0,
  class: "text-red-500 ml-1"
};
const _hoisted_41 = ["onClick"];
const _hoisted_42 = {
  key: 0,
  class: "text-xs text-red-500"
};
const _hoisted_43 = {
  key: 1,
  class: "text-xs text-red-500"
};
const _hoisted_44 = {
  key: 2,
  class: "text-xs text-red-500"
};
const _hoisted_45 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_46 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_47 = ["onClick"];
const _hoisted_48 = { key: 1 };
const _hoisted_49 = ["placeholder"];
const _hoisted_50 = ["disabled"];
const _sfc_main = {
  __name: "PreviewSettingsView",
  setup(__props) {
    const { t } = useI18n();
    const log = createLogger("PreviewSettingsView");
    const { getPreviewSettings, updatePreviewSettings } = useAdminSystemService();
    const { isDarkMode: darkMode } = useThemeMode();
    const { showSuccess, showError } = useGlobalMessage();
    const { dialogState, confirm, handleConfirm, handleCancel } = useConfirmDialog();
    const isLoading = ref(false);
    const isSavingFileTypes = ref(false);
    const isSavingProviders = ref(false);
    const providerModes = Object.freeze({
      visual: "visual",
      json: "json"
    });
    const providerMode = ref(providerModes.visual);
    const visualRules = ref([]);
    const collapsedRuleUids = ref({});
    let ruleCounter = 0;
    const isRuleCollapsed = (rule) => Boolean(collapsedRuleUids.value[String(rule?.uid || "")]);
    const toggleRuleCollapsed = (uid) => {
      const key = String(uid || "");
      if (!key) return;
      collapsedRuleUids.value[key] = !collapsedRuleUids.value[key];
    };
    const isAllCollapsed = computed(() => {
      if (!visualRules.value.length) return false;
      return visualRules.value.every((rule) => isRuleCollapsed(rule));
    });
    const toggleAllRulesCollapsed = () => {
      const shouldCollapse = !isAllCollapsed.value;
      visualRules.value.forEach((rule) => {
        if (rule?.uid) {
          collapsedRuleUids.value[rule.uid] = shouldCollapse;
        }
      });
    };
    const getRuleSummary = (rule) => {
      const previewKey = String(rule?.previewKey || "").trim() || "-";
      const priority = Number.isFinite(rule?.priority) ? String(rule.priority) : "0";
      const ext = String(rule?.match?.ext || "").trim();
      const regex = String(rule?.match?.regex || "").trim();
      const parts = [`类型:${previewKey}`, `优先级:${priority}`];
      if (ext) parts.push(`ext:${ext}`);
      if (regex) parts.push(`regex:${regex}`);
      return parts.join(" / ");
    };
    const normalizePreviewKey = (value) => {
      const v = String(value || "").trim();
      if (!v) return "";
      if (["code", "markdown", "html"].includes(v)) return "text";
      return v;
    };
    const previewKeyOptions = computed(() => {
      const keys = [
        "image",
        "video",
        "audio",
        "pdf",
        "epub",
        "office",
        "text",
        "archive",
        "iframe",
        "download"
      ];
      return keys.map((value) => ({
        value,
        label: t(`admin.preview.previewKey.${value}`)
      }));
    });
    const isIframeRule = (rule) => String(rule?.previewKey || "").trim() === "iframe";
    const getIframeValidProviders = (rule) => (rule?.providers || []).map((p) => ({
      key: String(p?.key || "").trim(),
      urlTemplate: String(p?.urlTemplate || "").trim()
    })).filter((p) => p.key && p.urlTemplate && p.urlTemplate !== "native");
    const getDuplicateProviderKeys = (rule) => {
      const seen = /* @__PURE__ */ new Set();
      const duplicates = /* @__PURE__ */ new Set();
      for (const p of rule?.providers || []) {
        const key = String(p?.key || "").trim();
        if (!key) continue;
        if (seen.has(key)) duplicates.add(key);
        seen.add(key);
      }
      return Array.from(duplicates);
    };
    const settings = ref({
      preview_text_types: "",
      preview_image_types: "",
      preview_video_types: "",
      preview_audio_types: "",
      preview_providers: ""
    });
    const defaultSettings = {
      preview_text_types: "txt,htm,html,xml,java,properties,sql,js,md,json,conf,ini,vue,php,py,bat,yml,yaml,go,sh,c,cpp,h,hpp,tsx,vtt,srt,ass,rs,lrc,gitignore",
      preview_image_types: "jpg,tiff,jpeg,png,gif,bmp,svg,ico,swf,webp,avif",
      preview_video_types: "mp4,mkv,avi,mov,rmvb,webm,flv,m3u8,ts,m2ts",
      preview_audio_types: "mp3,flac,ogg,m4a,wav,opus,wma",
      preview_providers: JSON.stringify(
        [
          // 无后缀文件（README/LICENSE/Dockerfile/Makefile 等）兜底：
          // - 这些文件名通常没有扩展名，单靠 ext 无法命中
          // - 文本预览组件内部可切换：文本/代码/Markdown/HTML
          {
            id: "noext-text",
            priority: 0,
            match: { regex: "/^(readme|license|dockerfile|makefile)$/i" },
            previewKey: "text",
            providers: {}
          },
          {
            id: "office-openxml",
            priority: 0,
            match: { ext: ["docx", "xlsx", "pptx"] },
            previewKey: "office",
            providers: {
              native: "native",
              microsoft: { urlTemplate: "https://view.officeapps.live.com/op/view.aspx?src=$e_url" },
              google: { urlTemplate: "https://docs.google.com/viewer?url=$e_url&embedded=true" }
            }
          },
          {
            id: "office-legacy",
            priority: 0,
            match: { ext: ["doc", "xls", "ppt", "rtf"] },
            previewKey: "office",
            providers: {
              microsoft: { urlTemplate: "https://view.officeapps.live.com/op/view.aspx?src=$e_url" },
              google: { urlTemplate: "https://docs.google.com/viewer?url=$e_url&embedded=true" }
            }
          },
          {
            id: "pdf",
            priority: 0,
            match: { ext: ["pdf"] },
            previewKey: "pdf",
            providers: {
              native: "native"
            }
          },
          {
            id: "epub",
            priority: 0,
            match: { ext: ["epub", "mobi", "azw3", "azw", "fb2", "cbz"] },
            previewKey: "epub",
            providers: {
              native: "native"
            }
          },
          {
            id: "archive",
            priority: 0,
            match: {
              ext: ["zip", "rar", "7z", "tar", "gz", "bz2", "xz", "tgz", "tbz", "tbz2", "txz", "cpio", "iso", "cab", "xar", "ar", "a", "mtree"]
            },
            previewKey: "archive",
            providers: {}
          }
        ],
        null,
        2
      )
    };
    const buildList = (value) => {
      if (!value) return [];
      const list = Array.isArray(value) ? value : String(value).split(",");
      return list.map((item) => String(item).trim()).filter((item) => item.length > 0);
    };
    const normalizeList = (value) => buildList(value).join(", ");
    const createRule = (rule = {}) => ({
      uid: `rule-${Date.now()}-${ruleCounter++}`,
      id: rule.id || "",
      priority: Number.isFinite(rule.priority) ? Number(rule.priority) : 0,
      previewKey: normalizePreviewKey(rule.previewKey || rule.key || ""),
      match: {
        ext: normalizeList(rule.match?.ext || rule.match?.exts || rule.match?.extensions || rule.ext),
        regex: String(rule.match?.regex || rule.match?.pattern || "").trim()
      },
      providers: (rule.providers ? Object.entries(rule.providers) : []).map(([key, cfg]) => ({
        uid: `provider-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        key,
        urlTemplate: typeof cfg === "string" ? cfg : cfg?.urlTemplate || ""
      }))
    });
    const syncVisualRulesFromJson = (rawValue) => {
      const raw = rawValue || "";
      if (!raw.trim()) {
        visualRules.value = [];
        collapsedRuleUids.value = {};
        return true;
      }
      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
          return false;
        }
        visualRules.value = parsed.map((rule) => createRule(rule));
        collapsedRuleUids.value = {};
        return true;
      } catch (error) {
        log.error("预览规则配置 JSON 解析失败:", error);
        return false;
      }
    };
    const buildProvidersFromVisual = () => visualRules.value.map((rule) => {
      const match = {};
      const extList = buildList(rule.match.ext);
      if (extList.length) match.ext = extList;
      const regex = String(rule.match.regex || "").trim();
      if (regex) match.regex = regex;
      const providers = {};
      rule.providers.forEach((provider) => {
        const key = String(provider.key || "").trim();
        const urlTemplate = String(provider.urlTemplate || "").trim();
        if (!key || !urlTemplate) return;
        providers[key] = { urlTemplate };
      });
      const output = {
        previewKey: rule.previewKey || ""
      };
      if (rule.id) output.id = rule.id;
      if (Number.isFinite(rule.priority)) output.priority = Number(rule.priority);
      if (Object.keys(match).length) output.match = match;
      if (Object.keys(providers).length) output.providers = providers;
      return output;
    });
    const applyVisualRulesToJson = () => {
      settings.value.preview_providers = JSON.stringify(buildProvidersFromVisual(), null, 2);
    };
    const handleSwitchProviderMode = (mode) => {
      if (mode === providerMode.value) return;
      if (mode === providerModes.json) {
        applyVisualRulesToJson();
        providerMode.value = mode;
        return;
      }
      const ok = syncVisualRulesFromJson(settings.value.preview_providers);
      if (!ok) {
        showError(t("admin.preview.previewProvidersInvalidJson"));
        return;
      }
      providerMode.value = mode;
    };
    const addRule = () => {
      const rule = createRule({
        priority: 0,
        previewKey: "",
        match: { ext: "", regex: "" },
        providers: {}
      });
      visualRules.value.push(rule);
      collapsedRuleUids.value[rule.uid] = false;
    };
    const removeRule = (index) => {
      const rule = visualRules.value[index];
      visualRules.value.splice(index, 1);
      if (rule?.uid) {
        delete collapsedRuleUids.value[rule.uid];
      }
    };
    const moveRuleUp = (index) => {
      const list = visualRules.value;
      if (!Array.isArray(list)) return;
      if (index <= 0 || index >= list.length) return;
      const current = list.splice(index, 1)[0];
      list.splice(index - 1, 0, current);
    };
    const moveRuleDown = (index) => {
      const list = visualRules.value;
      if (!Array.isArray(list)) return;
      if (index < 0 || index >= list.length - 1) return;
      const current = list.splice(index, 1)[0];
      list.splice(index + 1, 0, current);
    };
    const addProvider = (ruleIndex) => {
      const rule = visualRules.value[ruleIndex];
      if (!rule) return;
      rule.providers.push({
        uid: `provider-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        key: "",
        urlTemplate: ""
      });
    };
    const removeProvider = (ruleIndex, providerIndex) => {
      const rule = visualRules.value[ruleIndex];
      if (!rule) return;
      rule.providers.splice(providerIndex, 1);
    };
    const loadSettings = async () => {
      try {
        isLoading.value = true;
        const previewSettings = await getPreviewSettings();
        previewSettings.forEach((setting) => {
          if (Object.prototype.hasOwnProperty.call(settings.value, setting.key)) {
            settings.value[setting.key] = setting.value || "";
          }
        });
        const synced = syncVisualRulesFromJson(settings.value.preview_providers);
        if (!synced) {
          providerMode.value = providerModes.json;
        }
      } catch (err) {
        log.error("加载预览设置失败:", err);
        const message = err.message || "加载设置失败";
        showError(message);
      } finally {
        isLoading.value = false;
      }
    };
    const handleSaveFileTypes = async () => {
      isSavingFileTypes.value = true;
      try {
        await updatePreviewSettings({
          preview_text_types: settings.value.preview_text_types,
          preview_image_types: settings.value.preview_image_types,
          preview_video_types: settings.value.preview_video_types,
          preview_audio_types: settings.value.preview_audio_types
        });
        showSuccess(t("admin.preview.saveSuccess"));
      } catch (err) {
        log.error("保存文件类型设置失败:", err);
        showError(err.message || t("admin.preview.loadError"));
      } finally {
        isSavingFileTypes.value = false;
      }
    };
    const handleSaveProviders = async () => {
      try {
        if (providerMode.value === providerModes.visual) {
          const hasMissingPreviewKey = visualRules.value.some((rule) => !String(rule.previewKey || "").trim());
          if (hasMissingPreviewKey) {
            showError(t("admin.preview.previewRuleMissingPreviewKey"));
            return;
          }
          for (const rule of visualRules.value) {
            const previewKey = String(rule?.previewKey || "").trim();
            if (!previewKey) continue;
            if (getDuplicateProviderKeys(rule).length) {
              showError(t("admin.preview.previewRuleDuplicateProviderKeysShort"));
              return;
            }
            const providers = rule?.providers || [];
            const hasNativePlaceholder = providers.some((p) => String(p?.urlTemplate || "").trim() === "native");
            if (hasNativePlaceholder && !["pdf", "office", "epub", "iframe"].includes(previewKey)) {
              showError(t("admin.preview.previewRuleNativeNotSupported"));
              return;
            }
            if (previewKey === "iframe") {
              if (hasNativePlaceholder) {
                showError(t("admin.preview.previewRuleIframeNativeNotAllowed"));
                return;
              }
              const hasHalfFilledProviderRow = providers.some((p) => {
                const key = String(p?.key || "").trim();
                const urlTemplate = String(p?.urlTemplate || "").trim();
                return key && !urlTemplate || !key && urlTemplate;
              });
              if (hasHalfFilledProviderRow) {
                showError(t("admin.preview.previewRuleIframeProviderIncomplete"));
                return;
              }
              if (getIframeValidProviders(rule).length === 0) {
                showError(t("admin.preview.previewRuleIframeNeedsProvider"));
                return;
              }
            }
          }
          applyVisualRulesToJson();
        }
        if (settings.value.preview_providers && settings.value.preview_providers.trim().length > 0) {
          try {
            const parsed = JSON.parse(settings.value.preview_providers);
            if (!Array.isArray(parsed)) {
              throw new Error("INVALID_PREVIEW_PROVIDERS_JSON");
            }
            settings.value.preview_providers = JSON.stringify(parsed, null, 2);
          } catch (e) {
            log.error("预览规则配置 JSON 解析失败:", e);
            showError(t("admin.preview.previewProvidersInvalidJson"));
            return;
          }
        }
        isSavingProviders.value = true;
        await updatePreviewSettings({
          preview_providers: settings.value.preview_providers
        });
        showSuccess(t("admin.preview.saveSuccess"));
      } catch (err) {
        log.error("保存预览规则设置失败:", err);
        showError(err.message || t("admin.preview.loadError"));
      } finally {
        isSavingProviders.value = false;
      }
    };
    const handleResetToDefaults = async () => {
      const confirmed = await confirm({
        title: t("common.dialogs.resetTitle"),
        message: t("common.dialogs.resetConfirm"),
        confirmType: "warning",
        confirmText: t("common.dialogs.resetButton"),
        darkMode: darkMode.value
      });
      if (!confirmed) {
        return;
      }
      Object.assign(settings.value, defaultSettings);
      syncVisualRulesFromJson(settings.value.preview_providers);
    };
    onMounted(() => {
      loadSettings();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", null, [
            createBaseVNode("h1", {
              class: normalizeClass(["text-2xl font-bold mb-2", unref(darkMode) ? "text-white" : "text-gray-900"])
            }, toDisplayString(unref(t)("admin.preview.title")), 3),
            createBaseVNode("p", {
              class: normalizeClass(["text-base", unref(darkMode) ? "text-gray-400" : "text-gray-600"])
            }, toDisplayString(unref(t)("admin.preview.description")), 3)
          ]),
          createBaseVNode("button", {
            type: "button",
            onClick: handleResetToDefaults,
            disabled: isLoading.value,
            class: normalizeClass(["flex-shrink-0 px-4 py-2 text-sm font-medium border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", unref(darkMode) ? "text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600" : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"])
          }, toDisplayString(unref(t)("admin.preview.resetDefaults")), 11, _hoisted_3)
        ]),
        isLoading.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
          createVNode(unref(IconRefresh), {
            size: "lg",
            class: normalizeClass(["animate-spin", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
          }, null, 8, ["class"])
        ])) : (openBlock(), createElementBlock("div", _hoisted_5, [
          createBaseVNode("section", {
            class: normalizeClass(["rounded-xl border transition-colors", unref(darkMode) ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"])
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["px-5 py-4 border-b", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
            }, [
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("div", {
                  class: normalizeClass(["flex items-center justify-center w-9 h-9 rounded-lg", unref(darkMode) ? "bg-blue-500/20" : "bg-blue-50"])
                }, [
                  createVNode(unref(IconCollection), {
                    size: "sm",
                    class: normalizeClass(unref(darkMode) ? "text-blue-400" : "text-blue-600")
                  }, null, 8, ["class"])
                ], 2),
                createBaseVNode("div", null, [
                  createBaseVNode("h2", {
                    class: normalizeClass(["text-base font-semibold", unref(darkMode) ? "text-white" : "text-gray-900"])
                  }, toDisplayString(unref(t)("admin.preview.textTypes")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.preview.textTypesHelp")), 3)
                ])
              ])
            ], 2),
            createBaseVNode("div", _hoisted_7, [
              createBaseVNode("div", null, [
                createBaseVNode("label", {
                  class: normalizeClass(["block text-sm font-medium mb-2", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                }, toDisplayString(unref(t)("admin.preview.textTypesLabel")), 3),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => settings.value.preview_text_types = $event),
                  placeholder: unref(t)("admin.preview.textTypesPlaceholder"),
                  rows: "2",
                  class: normalizeClass(["w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-vertical", unref(darkMode) ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"])
                }, null, 10, _hoisted_8), [
                  [vModelText, settings.value.preview_text_types]
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs mt-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.preview.textTypesHelp")), 3)
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["border-t", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
              }, null, 2),
              createBaseVNode("div", null, [
                createBaseVNode("label", {
                  class: normalizeClass(["block text-sm font-medium mb-2", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                }, toDisplayString(unref(t)("admin.preview.imageTypesLabel")), 3),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => settings.value.preview_image_types = $event),
                  placeholder: unref(t)("admin.preview.imageTypesPlaceholder"),
                  rows: "2",
                  class: normalizeClass(["w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-vertical", unref(darkMode) ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"])
                }, null, 10, _hoisted_9), [
                  [vModelText, settings.value.preview_image_types]
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs mt-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.preview.imageTypesHelp")), 3)
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["border-t", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
              }, null, 2),
              createBaseVNode("div", null, [
                createBaseVNode("label", {
                  class: normalizeClass(["block text-sm font-medium mb-2", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                }, toDisplayString(unref(t)("admin.preview.videoTypesLabel")), 3),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => settings.value.preview_video_types = $event),
                  placeholder: unref(t)("admin.preview.videoTypesPlaceholder"),
                  rows: "2",
                  class: normalizeClass(["w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-vertical", unref(darkMode) ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"])
                }, null, 10, _hoisted_10), [
                  [vModelText, settings.value.preview_video_types]
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs mt-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.preview.videoTypesHelp")), 3)
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["border-t", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
              }, null, 2),
              createBaseVNode("div", null, [
                createBaseVNode("label", {
                  class: normalizeClass(["block text-sm font-medium mb-2", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                }, toDisplayString(unref(t)("admin.preview.audioTypesLabel")), 3),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => settings.value.preview_audio_types = $event),
                  placeholder: unref(t)("admin.preview.audioTypesPlaceholder"),
                  rows: "2",
                  class: normalizeClass(["w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-vertical", unref(darkMode) ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"])
                }, null, 10, _hoisted_11), [
                  [vModelText, settings.value.preview_audio_types]
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs mt-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.preview.audioTypesHelp")), 3)
              ])
            ]),
            createBaseVNode("div", {
              class: normalizeClass(["px-5 py-4 border-t flex justify-end", unref(darkMode) ? "border-gray-700 bg-gray-800/30" : "border-gray-100 bg-gray-50/50"])
            }, [
              createBaseVNode("button", {
                type: "button",
                onClick: handleSaveFileTypes,
                disabled: isSavingFileTypes.value,
                class: normalizeClass(["inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed", isSavingFileTypes.value ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"])
              }, [
                isSavingFileTypes.value ? (openBlock(), createBlock(unref(IconRefresh), {
                  key: 0,
                  size: "sm",
                  class: "animate-spin -ml-0.5 mr-2"
                })) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(isSavingFileTypes.value ? unref(t)("admin.global.buttons.updating") : unref(t)("admin.global.buttons.updateSettings")), 1)
              ], 10, _hoisted_12)
            ], 2)
          ], 2),
          createBaseVNode("section", {
            class: normalizeClass(["rounded-xl border transition-colors", unref(darkMode) ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"])
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["px-5 py-4 border-b", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
            }, [
              createBaseVNode("div", _hoisted_13, [
                createBaseVNode("div", _hoisted_14, [
                  createBaseVNode("div", {
                    class: normalizeClass(["flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0", unref(darkMode) ? "bg-purple-500/20" : "bg-purple-50"])
                  }, [
                    createVNode(unref(IconAdjustments), {
                      size: "sm",
                      class: normalizeClass(unref(darkMode) ? "text-purple-400" : "text-purple-600")
                    }, null, 8, ["class"])
                  ], 2),
                  createBaseVNode("div", _hoisted_15, [
                    createBaseVNode("h2", {
                      class: normalizeClass(["text-base font-semibold", unref(darkMode) ? "text-white" : "text-gray-900"])
                    }, toDisplayString(unref(t)("admin.preview.previewProvidersLabel")), 3),
                    createBaseVNode("p", {
                      class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                    }, toDisplayString(unref(t)("admin.preview.previewProvidersHelp")), 3)
                  ])
                ]),
                createBaseVNode("div", {
                  class: normalizeClass(["inline-flex items-center rounded-md border text-xs overflow-hidden flex-shrink-0 self-start sm:self-center", unref(darkMode) ? "border-gray-600" : "border-gray-300"])
                }, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: _cache[4] || (_cache[4] = ($event) => handleSwitchProviderMode(unref(providerModes).visual)),
                    class: normalizeClass([
                      "px-3 py-1",
                      providerMode.value === unref(providerModes).visual ? "bg-blue-600 text-white" : unref(darkMode) ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-white text-gray-600 hover:bg-gray-100"
                    ])
                  }, toDisplayString(unref(t)("admin.preview.previewProvidersModeVisual")), 3),
                  createBaseVNode("button", {
                    type: "button",
                    onClick: _cache[5] || (_cache[5] = ($event) => handleSwitchProviderMode(unref(providerModes).json)),
                    class: normalizeClass([
                      "px-3 py-1 border-l",
                      providerMode.value === unref(providerModes).json ? "bg-blue-600 text-white" : unref(darkMode) ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-600" : "bg-white text-gray-600 hover:bg-gray-100 border-gray-300"
                    ])
                  }, toDisplayString(unref(t)("admin.preview.previewProvidersModeJson")), 3)
                ], 2)
              ])
            ], 2),
            createBaseVNode("div", _hoisted_16, [
              providerMode.value === unref(providerModes).visual ? (openBlock(), createElementBlock("div", _hoisted_17, [
                !visualRules.value.length ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["py-8 flex flex-col items-center justify-center rounded-lg border border-dashed", unref(darkMode) ? "border-gray-600 bg-gray-800/30" : "border-gray-300 bg-gray-50/50"])
                }, [
                  createVNode(unref(IconCollection), {
                    size: "2xl",
                    class: normalizeClass(["mb-3", unref(darkMode) ? "text-gray-500" : "text-gray-400"])
                  }, null, 8, ["class"]),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-sm mb-1", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                  }, toDisplayString(unref(t)("admin.preview.previewRulesEmpty")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs mb-4", unref(darkMode) ? "text-gray-500" : "text-gray-400"])
                  }, toDisplayString(unref(t)("admin.preview.previewRulesEmptyHint")), 3),
                  createBaseVNode("button", {
                    type: "button",
                    onClick: addRule,
                    class: normalizeClass([
                      "inline-flex items-center px-3 py-1.5 text-xs rounded-md border",
                      unref(darkMode) ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    ])
                  }, [
                    createVNode(unref(IconPlus), {
                      size: "sm",
                      class: "mr-1"
                    }),
                    createTextVNode(" " + toDisplayString(unref(t)("admin.preview.addRule")), 1)
                  ], 2)
                ], 2)) : createCommentVNode("", true),
                visualRules.value.length ? (openBlock(), createElementBlock("div", _hoisted_18, [
                  createBaseVNode("span", {
                    class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(visualRules.value.length) + " " + toDisplayString(unref(t)("admin.preview.ruleTitle")), 3),
                  createBaseVNode("button", {
                    type: "button",
                    onClick: toggleAllRulesCollapsed,
                    class: normalizeClass(["inline-flex items-center px-2 py-1 text-xs rounded transition-colors", unref(darkMode) ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"])
                  }, [
                    isAllCollapsed.value ? (openBlock(), createBlock(unref(IconChevronDown), {
                      key: 0,
                      size: "sm",
                      class: "mr-1"
                    })) : (openBlock(), createBlock(unref(IconChevronUp), {
                      key: 1,
                      size: "sm",
                      class: "mr-1"
                    })),
                    createTextVNode(" " + toDisplayString(isAllCollapsed.value ? unref(t)("admin.preview.expandRule") : unref(t)("admin.preview.collapseRule")), 1)
                  ], 2)
                ])) : createCommentVNode("", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList(visualRules.value, (rule, ruleIndex) => {
                  return openBlock(), createElementBlock("div", {
                    key: rule.uid,
                    class: normalizeClass(["rounded-lg border p-4", unref(darkMode) ? "border-gray-700 bg-gray-900/40" : "border-gray-200 bg-gray-50"])
                  }, [
                    createBaseVNode("div", _hoisted_19, [
                      createBaseVNode("div", _hoisted_20, [
                        createBaseVNode("button", {
                          type: "button",
                          class: normalizeClass(["p-1 rounded transition-colors flex-shrink-0", unref(darkMode) ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"]),
                          title: isRuleCollapsed(rule) ? unref(t)("admin.preview.expandRule") : unref(t)("admin.preview.collapseRule"),
                          onClick: ($event) => toggleRuleCollapsed(rule.uid)
                        }, [
                          createVNode(unref(IconChevronRight), {
                            size: "sm",
                            class: normalizeClass(["transition-transform duration-200", isRuleCollapsed(rule) ? "" : "rotate-90"]),
                            "aria-hidden": "true"
                          }, null, 8, ["class"])
                        ], 10, _hoisted_21),
                        createBaseVNode("div", {
                          class: normalizeClass(["text-sm font-medium flex-shrink-0", unref(darkMode) ? "text-gray-100" : "text-gray-800"])
                        }, toDisplayString(unref(t)("admin.preview.ruleTitle")) + " #" + toDisplayString(ruleIndex + 1), 3),
                        isRuleCollapsed(rule) ? (openBlock(), createElementBlock("div", {
                          key: 0,
                          class: normalizeClass(["text-xs truncate", unref(darkMode) ? "text-gray-400" : "text-gray-500"]),
                          title: getRuleSummary(rule)
                        }, toDisplayString(getRuleSummary(rule)), 11, _hoisted_22)) : createCommentVNode("", true)
                      ]),
                      createBaseVNode("div", _hoisted_23, [
                        createBaseVNode("button", {
                          type: "button",
                          class: normalizeClass(["p-1 rounded transition-colors", [
                            unref(darkMode) ? "hover:bg-gray-800" : "hover:bg-gray-100",
                            ruleIndex === 0 ? "opacity-40 cursor-not-allowed" : unref(darkMode) ? "text-gray-300" : "text-gray-600"
                          ]]),
                          disabled: ruleIndex === 0,
                          title: unref(t)("admin.preview.moveRuleUp"),
                          onClick: ($event) => moveRuleUp(ruleIndex)
                        }, [
                          createVNode(unref(IconChevronUp), {
                            size: "sm",
                            "aria-hidden": "true"
                          })
                        ], 10, _hoisted_24),
                        createBaseVNode("button", {
                          type: "button",
                          class: normalizeClass(["p-1 rounded transition-colors", [
                            unref(darkMode) ? "hover:bg-gray-800" : "hover:bg-gray-100",
                            ruleIndex === visualRules.value.length - 1 ? "opacity-40 cursor-not-allowed" : unref(darkMode) ? "text-gray-300" : "text-gray-600"
                          ]]),
                          disabled: ruleIndex === visualRules.value.length - 1,
                          title: unref(t)("admin.preview.moveRuleDown"),
                          onClick: ($event) => moveRuleDown(ruleIndex)
                        }, [
                          createVNode(unref(IconChevronDown), {
                            size: "sm",
                            "aria-hidden": "true"
                          })
                        ], 10, _hoisted_25),
                        createBaseVNode("button", {
                          type: "button",
                          onClick: ($event) => removeRule(ruleIndex),
                          class: normalizeClass([
                            "text-xs px-2 py-1 rounded transition",
                            unref(darkMode) ? "bg-red-600/20 text-red-400 hover:bg-red-600/30" : "bg-red-50 text-red-600 hover:bg-red-100"
                          ])
                        }, toDisplayString(unref(t)("admin.preview.removeRule")), 11, _hoisted_26)
                      ])
                    ]),
                    withDirectives(createBaseVNode("div", _hoisted_27, [
                      createBaseVNode("div", _hoisted_28, [
                        createBaseVNode("div", null, [
                          createBaseVNode("label", {
                            class: normalizeClass(["block text-xs font-medium mb-1", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                          }, toDisplayString(unref(t)("admin.preview.ruleIdLabel")), 3),
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": ($event) => rule.id = $event,
                            type: "text",
                            placeholder: unref(t)("admin.preview.ruleIdPlaceholder"),
                            class: normalizeClass([
                              "w-full rounded border px-2 py-1 text-sm",
                              unref(darkMode) ? "bg-gray-800 border-gray-600 text-white placeholder-gray-500" : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                            ])
                          }, null, 10, _hoisted_29), [
                            [vModelText, rule.id]
                          ])
                        ]),
                        createBaseVNode("div", null, [
                          createBaseVNode("label", {
                            class: normalizeClass(["block text-xs font-medium mb-1", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                          }, toDisplayString(unref(t)("admin.preview.rulePriorityLabel")), 3),
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": ($event) => rule.priority = $event,
                            type: "number",
                            step: "1",
                            class: normalizeClass([
                              "w-full rounded border px-2 py-1 text-sm",
                              unref(darkMode) ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
                            ])
                          }, null, 10, _hoisted_30), [
                            [
                              vModelText,
                              rule.priority,
                              void 0,
                              { number: true }
                            ]
                          ]),
                          createBaseVNode("p", {
                            class: normalizeClass(["mt-1 text-[11px]", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                          }, toDisplayString(unref(t)("admin.preview.rulePriorityHelp")), 3)
                        ]),
                        createBaseVNode("div", null, [
                          createBaseVNode("label", {
                            class: normalizeClass(["block text-xs font-medium mb-1", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                          }, [
                            createTextVNode(toDisplayString(unref(t)("admin.preview.rulePreviewKeyLabel")), 1),
                            _cache[7] || (_cache[7] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                          ], 2),
                          withDirectives(createBaseVNode("select", {
                            "onUpdate:modelValue": ($event) => rule.previewKey = $event,
                            class: normalizeClass([
                              "w-full rounded border px-2 py-1 text-sm",
                              unref(darkMode) ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
                            ])
                          }, [
                            createBaseVNode("option", _hoisted_32, toDisplayString(unref(t)("admin.preview.rulePreviewKeyPlaceholder")), 1),
                            (openBlock(true), createElementBlock(Fragment, null, renderList(previewKeyOptions.value, (opt) => {
                              return openBlock(), createElementBlock("option", {
                                key: opt.value,
                                value: opt.value
                              }, toDisplayString(opt.label), 9, _hoisted_33);
                            }), 128))
                          ], 10, _hoisted_31), [
                            [vModelSelect, rule.previewKey]
                          ])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_34, [
                        createBaseVNode("div", null, [
                          createBaseVNode("label", {
                            class: normalizeClass(["block text-xs font-medium mb-1", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                          }, toDisplayString(unref(t)("admin.preview.ruleMatchExtLabel")), 3),
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": ($event) => rule.match.ext = $event,
                            type: "text",
                            placeholder: unref(t)("admin.preview.ruleMatchExtPlaceholder"),
                            class: normalizeClass([
                              "w-full rounded border px-2 py-1 text-sm",
                              unref(darkMode) ? "bg-gray-800 border-gray-600 text-white placeholder-gray-500" : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                            ])
                          }, null, 10, _hoisted_35), [
                            [vModelText, rule.match.ext]
                          ])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_36, [
                        createBaseVNode("label", {
                          class: normalizeClass(["block text-xs font-medium mb-1", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                        }, toDisplayString(unref(t)("admin.preview.ruleMatchRegexLabel")), 3),
                        withDirectives(createBaseVNode("input", {
                          "onUpdate:modelValue": ($event) => rule.match.regex = $event,
                          type: "text",
                          placeholder: unref(t)("admin.preview.ruleMatchRegexPlaceholder"),
                          class: normalizeClass([
                            "w-full rounded border px-2 py-1 text-sm",
                            unref(darkMode) ? "bg-gray-800 border-gray-600 text-white placeholder-gray-500" : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                          ])
                        }, null, 10, _hoisted_37), [
                          [vModelText, rule.match.regex]
                        ]),
                        createBaseVNode("p", {
                          class: normalizeClass(["mt-1 text-[11px]", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                        }, toDisplayString(unref(t)("admin.preview.ruleMatchHelp")), 3)
                      ]),
                      createBaseVNode("div", _hoisted_38, [
                        createBaseVNode("div", _hoisted_39, [
                          createBaseVNode("span", {
                            class: normalizeClass(["text-xs font-medium", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                          }, [
                            createTextVNode(toDisplayString(unref(t)("admin.preview.ruleProvidersLabel")), 1),
                            isIframeRule(rule) ? (openBlock(), createElementBlock("span", _hoisted_40, "*")) : createCommentVNode("", true)
                          ], 2),
                          createBaseVNode("button", {
                            type: "button",
                            onClick: ($event) => addProvider(ruleIndex),
                            class: normalizeClass([
                              "text-xs px-2 py-1 rounded transition",
                              unref(darkMode) ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30" : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                            ])
                          }, toDisplayString(unref(t)("admin.preview.addProvider")), 11, _hoisted_41)
                        ]),
                        isIframeRule(rule) && getIframeValidProviders(rule).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_42, toDisplayString(unref(t)("admin.preview.previewRuleIframeNeedsProvider")), 1)) : createCommentVNode("", true),
                        isIframeRule(rule) && rule.providers.some((p) => String(p?.urlTemplate || "").trim() === "native") ? (openBlock(), createElementBlock("div", _hoisted_43, toDisplayString(unref(t)("admin.preview.previewRuleIframeNativeNotAllowed")), 1)) : createCommentVNode("", true),
                        getDuplicateProviderKeys(rule).length ? (openBlock(), createElementBlock("div", _hoisted_44, toDisplayString(unref(t)("admin.preview.previewRuleDuplicateProviderKeys", { keys: getDuplicateProviderKeys(rule).join(", ") })), 1)) : createCommentVNode("", true),
                        !rule.providers.length ? (openBlock(), createElementBlock("div", {
                          key: 3,
                          class: normalizeClass(["py-3 text-center text-xs rounded border border-dashed", unref(darkMode) ? "border-gray-700 text-gray-500" : "border-gray-200 text-gray-400"])
                        }, toDisplayString(unref(t)("admin.preview.ruleProvidersEmpty")), 3)) : createCommentVNode("", true),
                        (openBlock(true), createElementBlock(Fragment, null, renderList(rule.providers, (provider, providerIndex) => {
                          return openBlock(), createElementBlock("div", {
                            key: provider.uid,
                            class: "grid grid-cols-1 md:grid-cols-6 gap-2"
                          }, [
                            withDirectives(createBaseVNode("input", {
                              "onUpdate:modelValue": ($event) => provider.key = $event,
                              type: "text",
                              placeholder: unref(t)("admin.preview.ruleProviderKeyPlaceholder"),
                              class: normalizeClass([
                                "rounded border px-2 py-1 text-sm md:col-span-2",
                                unref(darkMode) ? "bg-gray-800 border-gray-600 text-white placeholder-gray-500" : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                              ])
                            }, null, 10, _hoisted_45), [
                              [vModelText, provider.key]
                            ]),
                            withDirectives(createBaseVNode("input", {
                              "onUpdate:modelValue": ($event) => provider.urlTemplate = $event,
                              type: "text",
                              placeholder: unref(t)("admin.preview.ruleProviderUrlPlaceholder"),
                              class: normalizeClass([
                                "rounded border px-2 py-1 text-sm md:col-span-3",
                                unref(darkMode) ? "bg-gray-800 border-gray-600 text-white placeholder-gray-500" : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                              ])
                            }, null, 10, _hoisted_46), [
                              [vModelText, provider.urlTemplate]
                            ]),
                            createBaseVNode("button", {
                              type: "button",
                              onClick: ($event) => removeProvider(ruleIndex, providerIndex),
                              class: normalizeClass([
                                "text-xs px-2 py-1 rounded transition md:col-span-1",
                                unref(darkMode) ? "bg-red-600/20 text-red-400 hover:bg-red-600/30" : "bg-red-50 text-red-600 hover:bg-red-100"
                              ])
                            }, toDisplayString(unref(t)("admin.preview.removeProvider")), 11, _hoisted_47)
                          ]);
                        }), 128))
                      ])
                    ], 512), [
                      [vShow, !isRuleCollapsed(rule)]
                    ])
                  ], 2);
                }), 128)),
                visualRules.value.length ? (openBlock(), createElementBlock("button", {
                  key: 2,
                  type: "button",
                  onClick: addRule,
                  class: normalizeClass([
                    "inline-flex items-center px-3 py-1.5 text-xs rounded-md border",
                    unref(darkMode) ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  ])
                }, [
                  createVNode(unref(IconPlus), {
                    size: "sm",
                    class: "mr-1"
                  }),
                  createTextVNode(" " + toDisplayString(unref(t)("admin.preview.addRule")), 1)
                ], 2)) : createCommentVNode("", true)
              ])) : (openBlock(), createElementBlock("div", _hoisted_48, [
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => settings.value.preview_providers = $event),
                  placeholder: unref(t)("admin.preview.previewProvidersPlaceholder"),
                  rows: "10",
                  class: normalizeClass(["w-full px-3 py-2 border rounded-lg text-xs font-mono leading-snug transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-vertical", unref(darkMode) ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"])
                }, null, 10, _hoisted_49), [
                  [vModelText, settings.value.preview_providers]
                ])
              ]))
            ]),
            createBaseVNode("div", {
              class: normalizeClass(["px-5 py-4 border-t flex justify-end", unref(darkMode) ? "border-gray-700 bg-gray-800/30" : "border-gray-100 bg-gray-50/50"])
            }, [
              createBaseVNode("button", {
                type: "button",
                onClick: handleSaveProviders,
                disabled: isSavingProviders.value,
                class: normalizeClass(["inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed", isSavingProviders.value ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"])
              }, [
                isSavingProviders.value ? (openBlock(), createBlock(unref(IconRefresh), {
                  key: 0,
                  size: "sm",
                  class: "animate-spin -ml-0.5 mr-2"
                })) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(isSavingProviders.value ? unref(t)("admin.global.buttons.updating") : unref(t)("admin.global.buttons.updateSettings")), 1)
              ], 10, _hoisted_50)
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
