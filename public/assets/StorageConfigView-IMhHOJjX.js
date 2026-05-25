import { e as useI18n, c as createLogger, g as ref, F as computed, w as watch, i as useLocalStorage, b1 as storeToRefs, r as reactive, o as onMounted, j as createElementBlock, k as openBlock, l as createBaseVNode, n as normalizeClass, t as toDisplayString, p as createCommentVNode, m as withModifiers, q as withDirectives, A as createTextVNode, ae as vModelSelect, K as Fragment, L as renderList, v as vModelText, y as unref, x as vModelCheckbox, M as createBlock, bg as IconEye, dN as IconEyeOff, J as IconRefresh, bG as vModelDynamic, aK as _export_sfc, ac as useThemeMode, z as createVNode, bd as IconFolderPlus, be as isRef, dE as IconError, G as IconClose, N as resolveDynamicComponent, bo as IconLink, aA as IconCheckCircle, aB as IconXCircle, aC as IconExclamationSolid, ab as IconChevronRight, aj as IconCheck, af as IconShieldCheck, bh as IconRename, b7 as IconDelete, ah as IconCloud, ar as mergeProps } from "./index-BQxzU9F1.js";
import { u as useAdminBase } from "./useAdminBase-CxkodUK-.js";
import { u as useStorageConfigsStore } from "./storageConfigsStore-DUFoycii.js";
import { useAdminStorageConfigService } from "./storageConfigService-CIShtBVl.js";
import { _ as _sfc_main$2 } from "./CommonPagination-WikHSq_I.js";
import { u as useConfirmDialog, _ as _sfc_main$3, c as createConfirmFn } from "./useConfirmDialog-c5dcTgIB.js";
import { b as formatDateTimeWithSeconds } from "./timeUtils-D81jJILb.js";
import { u as useStorageTypePresentation } from "./useStorageTypePresentation-C9r7i_aK.js";
import { u as useStorageTypeIcon } from "./useStorageTypeIcon-CXKeFzX3.js";
function useStorageConfigManagement(options = {}) {
  const { confirmFn } = options;
  if (!confirmFn) {
    throw new Error("useStorageConfigManagement 必须传入 confirmFn（请在 View 里用 useConfirmDialog + createConfirmFn 创建）");
  }
  const { t } = useI18n();
  const log = createLogger("StorageConfigManagement");
  const base = useAdminBase("storage");
  const storageConfigsStore = useStorageConfigsStore();
  const { getStorageConfigs, getStorageConfigReveal, deleteStorageConfig, setDefaultStorageConfig, testStorageConfig } = useAdminStorageConfigService();
  const STORAGE_TYPE_UNKNOWN = "__UNSPECIFIED__";
  const refreshSharedConfigs = async () => {
    try {
      await storageConfigsStore.refreshConfigs();
    } catch (error) {
      log.warn("刷新全局存储配置缓存失败", error);
    }
  };
  const storageConfigs = ref([]);
  const currentConfig = ref(null);
  const showAddForm = ref(false);
  const showEditForm = ref(false);
  const testResults = ref({});
  const deletingConfigIds = ref(/* @__PURE__ */ new Set());
  const settingDefaultConfigIds = ref(/* @__PURE__ */ new Set());
  const storageTypeFilter = ref("all");
  const normalizeStorageTypeValue = (value) => {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
    return STORAGE_TYPE_UNKNOWN;
  };
  const availableStorageTypes = computed(() => {
    const set = /* @__PURE__ */ new Set();
    storageConfigs.value.forEach((config) => {
      set.add(normalizeStorageTypeValue(config.storage_type));
    });
    return Array.from(set);
  });
  const filteredConfigs = computed(() => {
    const filtered = storageTypeFilter.value === "all" ? storageConfigs.value : storageConfigs.value.filter((config) => normalizeStorageTypeValue(config.storage_type) === storageTypeFilter.value);
    const start = (base.pagination.page - 1) * base.pagination.limit;
    const end = start + base.pagination.limit;
    return filtered.slice(start, end);
  });
  watch(availableStorageTypes, (types) => {
    if (storageTypeFilter.value !== "all" && !types.includes(storageTypeFilter.value)) {
      storageTypeFilter.value = "all";
    }
  });
  watch(storageTypeFilter, () => {
    base.resetPagination();
  });
  const showTestDetails = ref(false);
  const selectedTestResult = ref(null);
  const showDetailedResults = ref(true);
  const pageSizeOptions = [4, 8, 12];
  const storedPageSizes = useLocalStorage("admin-page-size", {});
  const getDefaultPageSize = () => {
    try {
      const pageSizes = storedPageSizes.value;
      const savedSize = pageSizes && typeof pageSizes === "object" ? pageSizes["storage"] || 4 : 4;
      return pageSizeOptions.includes(savedSize) ? savedSize : 4;
    } catch (error) {
      log.warn("解析存储配置分页设置失败:", error);
    }
    return 4;
  };
  base.pagination.limit = getDefaultPageSize();
  const filteredTotal = computed(() => {
    const filtered = storageTypeFilter.value === "all" ? storageConfigs.value : storageConfigs.value.filter((config) => normalizeStorageTypeValue(config.storage_type) === storageTypeFilter.value);
    return filtered.length;
  });
  watch([filteredTotal, () => base.pagination.limit], () => {
    base.updatePagination({ total: filteredTotal.value }, "page");
  });
  const loadStorageConfigs = async (options2 = {}) => {
    const { silent = false } = options2;
    if (silent) {
      try {
        const { items } = await getStorageConfigs();
        storageConfigs.value = items;
        base.updatePagination({ total: filteredTotal.value }, "page");
        base.updateLastRefreshTime();
      } catch (error) {
        log.error("静默加载存储配置列表失败:", error);
        throw error;
      }
      return;
    }
    return await base.withLoading(async () => {
      try {
        const { items } = await getStorageConfigs();
        storageConfigs.value = items;
        base.updatePagination({ total: filteredTotal.value }, "page");
        base.updateLastRefreshTime();
      } catch (error) {
        log.error("加载存储配置列表失败:", error);
        storageConfigs.value = [];
        throw error;
      }
    });
  };
  const handlePageChange = (page) => {
    base.handlePaginationChange(page, "page");
  };
  const handleLimitChange = (newLimit) => {
    base.changePageSize(newLimit);
  };
  const handleDeleteConfig = async (configId) => {
    const confirmed = await confirmFn({
      title: t("common.dialogs.deleteTitle"),
      message: t("common.dialogs.deleteItem", { name: t("admin.storage.item", "此存储配置") }),
      confirmType: "danger"
    });
    if (!confirmed) {
      return;
    }
    deletingConfigIds.value = /* @__PURE__ */ new Set([...deletingConfigIds.value, configId]);
    try {
      await deleteStorageConfig(configId);
      base.showSuccess("删除成功");
      await loadStorageConfigs({ silent: true });
      await refreshSharedConfigs();
    } catch (err) {
      log.error("删除存储配置失败:", err);
      if (err.message && err.message.includes("有文件正在使用")) {
        base.showError(`无法删除此配置：${err.message}`);
      } else {
        base.showError(err.message || "删除存储配置失败，请稍后再试");
      }
    } finally {
      const newSet = new Set(deletingConfigIds.value);
      newSet.delete(configId);
      deletingConfigIds.value = newSet;
    }
  };
  const editConfig = async (config) => {
    try {
      const maskedConfig = await getStorageConfigReveal(config.id, "masked");
      const finalConfig = maskedConfig?.data || maskedConfig || { ...config };
      currentConfig.value = finalConfig;
      showEditForm.value = true;
      showAddForm.value = false;
    } catch (err) {
      log.error("加载配置失败:", err);
      currentConfig.value = { ...config };
      showEditForm.value = true;
      showAddForm.value = false;
    }
  };
  const addNewConfig = () => {
    currentConfig.value = null;
    showAddForm.value = true;
    showEditForm.value = false;
  };
  const handleFormSuccess = async () => {
    showAddForm.value = false;
    showEditForm.value = false;
    await loadStorageConfigs();
    await refreshSharedConfigs();
  };
  const handleSetDefaultConfig = async (configId) => {
    settingDefaultConfigIds.value = /* @__PURE__ */ new Set([...settingDefaultConfigIds.value, configId]);
    try {
      await setDefaultStorageConfig(configId);
      base.showSuccess("设置默认配置成功");
      await loadStorageConfigs({ silent: true });
      await refreshSharedConfigs();
    } catch (err) {
      log.error("设置默认存储配置失败:", err);
      base.showError(err.message || "无法设置为默认配置，请稍后再试");
    } finally {
      const newSet = new Set(settingDefaultConfigIds.value);
      newSet.delete(configId);
      settingDefaultConfigIds.value = newSet;
    }
  };
  class TestResultProcessor {
    constructor(testData) {
      this.raw = testData || {};
      this.success = this.raw?.success === true;
      this.message = typeof this.raw?.message === "string" ? this.raw.message : "";
      const report = this.raw?.report && typeof this.raw.report === "object" ? this.raw.report : null;
      this.report = report || { version: "", storageType: "", info: {}, checks: [] };
      this.checks = Array.isArray(this.report.checks) ? this.report.checks : [];
    }
    /**
     * 计算测试状态
     */
    calculateStatus() {
      const isFullSuccess = this.success;
      const anyOk = this.checks.some((c) => c && c.success === true);
      const isPartialSuccess = !isFullSuccess && anyOk;
      const isSuccess = isFullSuccess || isPartialSuccess;
      return { isFullSuccess, isPartialSuccess, isSuccess };
    }
    /**
     * 生成状态消息
     */
    generateStatusMessage() {
      if (this.message) return this.message;
      const status = this.calculateStatus();
      if (status.isFullSuccess) return "连接测试成功";
      if (status.isPartialSuccess) return "连接测试部分成功";
      return "连接测试失败";
    }
    /**
     * 生成简洁的状态消息
     */
    generateDetailsMessage() {
      const lines = [];
      for (const c of this.checks) {
        if (!c) continue;
        const label = c.label || c.key || "检查项";
        if (c.skipped) {
          lines.push(`✓ ${label}（已跳过）`);
          continue;
        }
        if (c.success) {
          lines.push(`✓ ${label} 正常`);
        } else {
          lines.push(`✗ ${label} 失败`);
          if (c.error) lines.push(`  ${String(c.error).split("\n")[0]}`);
        }
      }
      return lines.join("\n");
    }
  }
  const testConnection = async (configId) => {
    try {
      testResults.value[configId] = { loading: true };
      const data = await testStorageConfig(configId);
      const processor = new TestResultProcessor(data || {});
      const status = processor.calculateStatus();
      testResults.value[configId] = {
        success: status.isFullSuccess,
        partialSuccess: status.isPartialSuccess,
        message: processor.generateStatusMessage(),
        details: processor.generateDetailsMessage(),
        report: processor.report || null,
        loading: false
      };
    } catch (err) {
      testResults.value[configId] = {
        success: false,
        partialSuccess: false,
        message: "测试连接失败",
        details: err.message || "无法连接到服务器",
        loading: false
      };
    }
  };
  const showTestDetailsModal = (configId) => {
    selectedTestResult.value = testResults.value[configId];
    showTestDetails.value = true;
    showDetailedResults.value = true;
  };
  const isConfigDeleting = (configId) => {
    return deletingConfigIds.value.has(configId);
  };
  const isConfigSettingDefault = (configId) => {
    return settingDefaultConfigIds.value.has(configId);
  };
  return {
    // 继承基础功能
    ...base,
    // 重写分页选项
    pageSizeOptions,
    // 存储配置状态
    storageConfigs,
    filteredConfigs,
    storageTypeFilter,
    availableStorageTypes,
    currentConfig,
    showAddForm,
    showEditForm,
    testResults,
    showTestDetails,
    selectedTestResult,
    showDetailedResults,
    // 行级加载状态
    deletingConfigIds,
    settingDefaultConfigIds,
    isConfigDeleting,
    isConfigSettingDefault,
    // 存储配置管理方法
    loadStorageConfigs,
    handlePageChange,
    handleLimitChange,
    handleDeleteConfig,
    editConfig,
    addNewConfig,
    handleFormSuccess,
    handleSetDefaultConfig,
    // 测试功能方法
    testConnection,
    showTestDetailsModal,
    // 工具方法
    normalizeStorageTypeValue,
    STORAGE_TYPE_UNKNOWN
  };
}
const STORAGE_UNITS = [
  { value: 1, label: "B" },
  { value: 1024, label: "KB" },
  { value: 1024 * 1024, label: "MB" },
  { value: 1024 * 1024 * 1024, label: "GB" },
  { value: 1024 * 1024 * 1024 * 1024, label: "TB" }
];
function getDefaultStorageByProvider(provider) {
  return 10 * 1024 * 1024 * 1024;
}
function setStorageSizeFromBytes(bytes, state) {
  if (!bytes || bytes <= 0) {
    state.storageSize = "";
    state.storageUnit = 1024 * 1024 * 1024;
    return;
  }
  let unitIndex = 0;
  let value = bytes;
  while (value >= 1024 && unitIndex < STORAGE_UNITS.length - 1) {
    value /= 1024;
    unitIndex++;
  }
  state.storageSize = value.toFixed(2);
  state.storageUnit = STORAGE_UNITS[unitIndex].value;
}
function calculateStorageBytes(state) {
  if (!state.storageSize || isNaN(state.storageSize) || state.storageSize <= 0) {
    return null;
  }
  return Math.floor(parseFloat(state.storageSize) * state.storageUnit);
}
function normalizeDefaultFolder(value) {
  if (!value) return "";
  return value.toString().replace(/^\/+/, "");
}
function isValidUrl(url) {
  if (!url) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}
const _hoisted_1$1 = { class: "text-base sm:text-lg font-semibold" };
const _hoisted_2$1 = { class: "p-4 sm:p-6 space-y-3 sm:space-y-4 flex-1 overflow-y-auto" };
const _hoisted_3$1 = {
  key: 0,
  class: "p-3 rounded-md text-sm font-medium mb-4 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
};
const _hoisted_4$1 = {
  key: 1,
  class: "p-3 rounded-md text-sm font-medium mb-4 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
};
const _hoisted_5$1 = { class: "space-y-4" };
const _hoisted_6$1 = ["value"];
const _hoisted_7$1 = { class: "flex space-x-2" };
const _hoisted_8$1 = ["value"];
const _hoisted_9$1 = {
  key: 0,
  class: "space-y-4"
};
const _hoisted_10$1 = ["id", "onUpdate:modelValue"];
const _hoisted_11$1 = ["for"];
const _hoisted_12$1 = {
  key: 0,
  class: "text-red-500"
};
const _hoisted_13$1 = ["id", "checked", "onChange"];
const _hoisted_14$1 = ["for"];
const _hoisted_15$1 = ["id", "onUpdate:modelValue"];
const _hoisted_16$1 = ["value"];
const _hoisted_17$1 = { class: "flex items-center justify-between mb-1" };
const _hoisted_18$1 = ["for"];
const _hoisted_19$1 = {
  key: 0,
  class: "text-red-500"
};
const _hoisted_20$1 = ["onClick", "disabled"];
const _hoisted_21$1 = ["type", "id", "onUpdate:modelValue", "required", "placeholder"];
const _hoisted_22$1 = {
  key: 0,
  class: "text-red-500"
};
const _hoisted_23$1 = ["type", "id", "onUpdate:modelValue", "required", "disabled", "placeholder", "onBlur"];
const _hoisted_24$1 = {
  key: 0,
  class: "mt-1 text-xs text-red-500"
};
const _hoisted_25$1 = ["id", "onUpdate:modelValue"];
const _hoisted_26$1 = ["for"];
const _hoisted_27$1 = {
  key: 0,
  class: "text-red-500"
};
const _hoisted_28$1 = ["id", "checked", "onChange"];
const _hoisted_29$1 = ["for"];
const _hoisted_30$1 = ["id", "onUpdate:modelValue"];
const _hoisted_31$1 = ["value"];
const _hoisted_32$1 = { class: "flex items-center justify-between mb-1" };
const _hoisted_33$1 = ["for"];
const _hoisted_34$1 = {
  key: 0,
  class: "text-red-500"
};
const _hoisted_35$1 = ["onClick", "disabled"];
const _hoisted_36$1 = ["type", "id", "onUpdate:modelValue", "required", "placeholder"];
const _hoisted_37$1 = ["type", "id", "onUpdate:modelValue", "required", "placeholder"];
const _hoisted_38$1 = {
  key: 0,
  class: "text-red-500"
};
const _hoisted_39$1 = ["type", "id", "onUpdate:modelValue", "required", "disabled", "placeholder", "onBlur"];
const _hoisted_40$1 = {
  key: 0,
  class: "mt-1 text-xs text-red-500"
};
const _hoisted_41$1 = { class: "space-y-4" };
const _hoisted_42$1 = { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" };
const _hoisted_43$1 = ["disabled"];
const _sfc_main$1 = {
  __name: "ConfigForm",
  props: {
    darkMode: {
      type: Boolean,
      required: true
    },
    config: {
      type: Object,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const log = createLogger("ConfigForm");
    const props = __props;
    const emit = __emit;
    const storageConfigsStore = useStorageConfigsStore();
    const { storageTypesMeta } = storeToRefs(storageConfigsStore);
    const formData = ref({
      name: "",
      storage_type: ""
    });
    const storageSize = ref("");
    const storageUnit = ref(1024 * 1024 * 1024);
    const storageUnits = STORAGE_UNITS;
    const storageTypes = computed(
      () => storageTypesMeta.value.map((meta) => ({
        value: meta.type,
        label: meta.displayName || meta.type
      }))
    );
    const currentTypeMeta = computed(
      () => storageTypesMeta.value.find((meta) => meta.type === formData.value.storage_type) || null
    );
    const providerTypes = computed(() => currentTypeMeta.value?.providerOptions || []);
    const currentConfigSchema = computed(() => currentTypeMeta.value?.configSchema || null);
    const layoutGroups = computed(() => currentConfigSchema.value?.layout?.groups || []);
    const FIELDS_HANDLED_EXTERNALLY = /* @__PURE__ */ new Set(["name", "storage_type", "is_public"]);
    const loading = ref(false);
    const error = ref("");
    const success = ref("");
    const { getStorageConfigReveal, updateStorageConfig, createStorageConfig } = useAdminStorageConfigService();
    const configIdRef = computed(() => props.config && props.config.id || null);
    const currentType = computed(() => formData.value.storage_type || "");
    computed(() => formData.value.storage_type === "WEBDAV");
    const isOneDriveType = computed(() => currentType.value === "ONEDRIVE");
    computed(() => currentType.value === "GOOGLE_DRIVE");
    const formTitle = computed(() => {
      return props.isEdit ? "编辑存储配置" : "添加存储配置";
    });
    const trimInput = (field) => {
      const value = formData.value[field];
      if (typeof value === "string") {
        formData.value[field] = value.trim();
      }
    };
    const formatUrl = (field) => {
      const value = formData.value[field];
      if (!value) {
        return;
      }
      if (typeof value !== "string") {
        return;
      }
      let url = value.trim();
      url = url.replace(/\/+$/, "");
      formData.value[field] = url;
    };
    const getFieldMeta = (fieldName) => {
      const schema = currentConfigSchema.value;
      if (!schema?.fields) return null;
      return schema.fields.find((f) => f.name === fieldName) || null;
    };
    const matchSchemaCondition = (condition) => {
      if (!condition || typeof condition !== "object") return false;
      const fieldName = condition.field;
      if (typeof fieldName !== "string" || !fieldName) return false;
      const currentValue = formData.value[fieldName];
      if (Object.prototype.hasOwnProperty.call(condition, "equals")) {
        return currentValue === condition.equals;
      }
      if (Object.prototype.hasOwnProperty.call(condition, "value")) {
        return currentValue === condition.value;
      }
      if (Object.prototype.hasOwnProperty.call(condition, "notEquals")) {
        return currentValue !== condition.notEquals;
      }
      if (Array.isArray(condition.values)) {
        return condition.values.includes(currentValue);
      }
      if (condition.truthy === true) {
        return !!currentValue;
      }
      if (condition.falsy === true) {
        return !currentValue;
      }
      return false;
    };
    const shouldRenderField = (fieldName) => {
      if (FIELDS_HANDLED_EXTERNALLY.has(fieldName)) return false;
      const meta = getFieldMeta(fieldName);
      if (!meta) return false;
      const dependsOn = meta?.ui?.dependsOn;
      if (dependsOn && typeof dependsOn === "object") {
        const depField = dependsOn.field;
        if (typeof depField === "string" && depField) {
          const currentValue = formData.value[depField];
          if (Object.prototype.hasOwnProperty.call(dependsOn, "value")) {
            return currentValue === dependsOn.value;
          }
          if (Array.isArray(dependsOn.values)) {
            return dependsOn.values.includes(currentValue);
          }
          if (dependsOn.truthy === true) {
            return !!currentValue;
          }
        }
      }
      return true;
    };
    const isFieldDisabled = (fieldName) => {
      const meta = getFieldMeta(fieldName);
      const disabledWhen = meta?.ui?.disabledWhen;
      if (disabledWhen && typeof disabledWhen === "object") {
        return matchSchemaCondition(disabledWhen);
      }
      return false;
    };
    const secretVisibleByField = reactive({});
    const secretsLoaded = ref(false);
    const secretsRevealing = ref(false);
    const getSecretFieldNames = () => {
      const schema = currentConfigSchema.value;
      if (!schema?.fields) return [];
      return schema.fields.filter((f) => f && typeof f === "object" && f.type === "secret" && typeof f.name === "string" && f.name).map((f) => f.name);
    };
    const resetSecretUiState = () => {
      for (const key of Object.keys(secretVisibleByField)) {
        delete secretVisibleByField[key];
      }
      secretsLoaded.value = false;
      secretsRevealing.value = false;
    };
    const getLayoutRowsForGroup = (group) => {
      if (!group || !Array.isArray(group.fields)) return [];
      return group.fields.map((item) => {
        if (Array.isArray(item)) {
          const renderableFields = item.filter((name) => shouldRenderField(name));
          if (renderableFields.length === 0) return null;
          return { type: "row", fields: renderableFields };
        } else if (typeof item === "string") {
          if (!shouldRenderField(item)) return null;
          return { type: "full", field: item };
        }
        return null;
      }).filter(Boolean);
    };
    const getFieldType = (fieldName) => {
      const meta = getFieldMeta(fieldName);
      return meta?.type || "string";
    };
    const isSecretField = (fieldName) => getFieldType(fieldName) === "secret";
    const isSecretVisible = (fieldName) => !!secretVisibleByField[fieldName];
    const isSecretRevealing = (_fieldName) => secretsRevealing.value;
    const getSecretInputType = (fieldName) => isSecretVisible(fieldName) ? "text" : "password";
    const handleSecretToggle = async (fieldName) => {
      if (!isSecretField(fieldName)) return;
      const nextVisible = !isSecretVisible(fieldName);
      if (!props.isEdit || !configIdRef.value) {
        secretVisibleByField[fieldName] = nextVisible;
        return;
      }
      if (nextVisible && !secretsLoaded.value && !secretsRevealing.value) {
        secretsRevealing.value = true;
        try {
          const resp = await getStorageConfigReveal(configIdRef.value, "plain");
          const data = resp?.data || resp || {};
          const secretFields = getSecretFieldNames();
          for (const key of secretFields) {
            formData.value[key] = data[key] || "";
          }
          secretsLoaded.value = true;
        } catch (e) {
          error.value = e?.message || "获取存储密钥失败";
        } finally {
          secretsRevealing.value = false;
        }
      }
      secretVisibleByField[fieldName] = nextVisible;
    };
    const getFieldLabel = (fieldName) => {
      const meta = getFieldMeta(fieldName);
      if (meta?.labelKey) {
        return t(meta.labelKey);
      }
      return fieldName;
    };
    const getFieldPlaceholder = (fieldName) => {
      const meta = getFieldMeta(fieldName);
      if (meta?.ui?.placeholderKey) {
        return t(meta.ui.placeholderKey);
      }
      return "";
    };
    const getFieldDescription = (fieldName) => {
      const meta = getFieldMeta(fieldName);
      if (meta?.ui?.descriptionKey) {
        return t(meta.ui.descriptionKey);
      }
      return "";
    };
    const getBooleanDisplayValue = (fieldName) => {
      return formData.value[fieldName] ? t("common.enabled") : t("common.disabled");
    };
    const getEnumOptions = (fieldName) => {
      const meta = getFieldMeta(fieldName);
      if (Array.isArray(meta?.enumValues) && meta.enumValues.length > 0) {
        return meta.enumValues;
      }
      if (fieldName === "provider_type" && Array.isArray(providerTypes.value)) {
        return providerTypes.value;
      }
      return [];
    };
    const isEnumToggle = (fieldName) => {
      const meta = getFieldMeta(fieldName);
      if (meta?.type !== "enum") return false;
      if (meta?.ui?.renderAs !== "toggle") return false;
      const opts = getEnumOptions(fieldName);
      return Array.isArray(opts) && opts.length === 2;
    };
    const getEnumToggleValues = (fieldName) => {
      const opts = getEnumOptions(fieldName);
      const values = (opts || []).map((o) => o?.value).filter(Boolean);
      const onValue = values.includes("self_hosted") ? "self_hosted" : values[1];
      const offValue = values.includes("official") ? "official" : values[0];
      return { onValue, offValue };
    };
    const getEnumToggleLabel = (fieldName) => {
      const meta = getFieldMeta(fieldName);
      if (meta?.ui?.toggleLabelKey) {
        return t(meta.ui.toggleLabelKey);
      }
      const { onValue } = getEnumToggleValues(fieldName);
      const opts = getEnumOptions(fieldName) || [];
      const onOpt = opts.find((o) => o?.value === onValue) || null;
      if (onOpt?.labelKey) return t(onOpt.labelKey);
      return onOpt?.label || String(onValue || "");
    };
    const handleEnumToggleChange = (fieldName, checked) => {
      const { onValue, offValue } = getEnumToggleValues(fieldName);
      formData.value[fieldName] = checked ? onValue : offValue;
    };
    const isUrlField = (fieldName) => {
      const meta = getFieldMeta(fieldName);
      return meta?.validation?.rule === "url";
    };
    const isFieldRequiredOnCreate = (fieldName) => {
      const meta = getFieldMeta(fieldName);
      if (!meta) return false;
      const requiredWhen = meta?.requiredWhen;
      if (requiredWhen && typeof requiredWhen === "object") {
        if (matchSchemaCondition(requiredWhen)) {
          return true;
        }
      }
      if (props.isEdit) {
        return !!meta.required;
      }
      if (meta.requiredOnCreate === true) {
        return true;
      }
      return !!meta.required;
    };
    const isMaskedValue = (value) => {
      return typeof value === "string" && value.startsWith("*");
    };
    const normalizeBooleanLike = (value) => {
      if (value === 1 || value === "1") return true;
      if (value === 0 || value === "0") return false;
      return value;
    };
    const normalizeFormBooleans = (schema = currentConfigSchema.value) => {
      formData.value.is_public = normalizeBooleanLike(formData.value.is_public);
      if (!schema?.fields) return;
      for (const field of schema.fields) {
        if (!field || field.type !== "boolean" || !field.name) continue;
        formData.value[field.name] = normalizeBooleanLike(formData.value[field.name]);
      }
    };
    const applySchemaDefaultValues = (schema = currentConfigSchema.value) => {
      if (!schema?.fields) return;
      for (const field of schema.fields) {
        const key = field?.name;
        if (!key) continue;
        const current = formData.value[key];
        if ((current === void 0 || current === null || current === "") && field.defaultValue !== void 0) {
          formData.value[key] = field.defaultValue;
        }
      }
    };
    const handleFieldBlur = (fieldName) => {
      if (fieldName === "name") {
        trimInput("name");
        return;
      }
      if (fieldName === "default_folder") {
        formData.value.default_folder = normalizeDefaultFolder(formData.value.default_folder);
        return;
      }
      if (fieldName === "endpoint_url") {
        formatUrl("endpoint_url");
        return;
      }
      if (isUrlField(fieldName)) {
        formatUrl(fieldName);
        return;
      }
      trimInput(fieldName);
    };
    const buildPayload = () => {
      const base = {
        name: formData.value.name,
        storage_type: formData.value.storage_type,
        is_public: formData.value.is_public
      };
      if (formData.value.total_storage_bytes !== void 0) {
        base.total_storage_bytes = formData.value.total_storage_bytes;
      }
      const extra = {};
      const schema = currentConfigSchema.value;
      if (schema?.fields) {
        for (const field of schema.fields) {
          const key = field.name;
          if (FIELDS_HANDLED_EXTERNALLY.has(key)) continue;
          const value = formData.value[key];
          if (value !== void 0) {
            extra[key] = value;
          }
        }
      }
      return {
        ...base,
        ...extra
      };
    };
    const formValid = computed(() => {
      const hasName = Boolean(formData.value.name && formData.value.name.trim());
      if (!hasName || !formData.value.storage_type) {
        return false;
      }
      const schema = currentConfigSchema.value;
      if (!schema || !Array.isArray(schema.fields)) {
        return true;
      }
      for (const field of schema.fields) {
        const key = field.name;
        if (FIELDS_HANDLED_EXTERNALLY.has(key)) continue;
        const value = formData.value[key];
        const requiredOnCreate = isFieldRequiredOnCreate(key);
        if (requiredOnCreate) {
          const missing = value === void 0 || value === null || typeof value === "string" && value.trim().length === 0;
          if (missing) {
            return false;
          }
        }
        if (field.validation?.rule === "url") {
          if (value && !isValidUrl(value)) {
            return false;
          }
        }
        if (field.validation?.rule === "abs_path" && typeof value === "string") {
          const trimmed = value.trim();
          const isPosixAbs = trimmed.startsWith("/");
          const isWinAbs = /^[a-zA-Z]:[\\/]/.test(trimmed);
          if (!isPosixAbs && !isWinAbs) {
            return false;
          }
        }
      }
      return true;
    });
    const ensureTypeDefaults = () => {
      const type = currentType.value;
      if (type === "S3") {
        const providerType = formData.value.provider_type;
        if (!providerType) return;
        if (formData.value.endpoint_url) return;
        switch (providerType) {
          case "Cloudflare R2":
            formData.value.endpoint_url = "https://<accountid>.r2.cloudflarestorage.com";
            formData.value.region = "auto";
            formData.value.path_style = false;
            break;
          case "Backblaze B2":
            formData.value.endpoint_url = "https://s3.us-west-000.backblazeb2.com";
            formData.value.region = "";
            formData.value.path_style = true;
            break;
          case "AWS S3":
            formData.value.endpoint_url = "https://s3.amazonaws.com";
            formData.value.path_style = false;
            break;
          case "Aliyun OSS":
            formData.value.endpoint_url = "https://oss-cn-hangzhou.aliyuncs.com";
            formData.value.region = "oss-cn-hangzhou";
            formData.value.path_style = false;
            break;
          default:
            formData.value.endpoint_url = "https://your-s3-endpoint.com";
            formData.value.path_style = false;
            break;
        }
      }
      if (type === "MIRROR") {
        const preset = formData.value.preset;
        if (!preset) return;
        const currentEndpoint = (formData.value.endpoint_url || "").trim();
        const defaultsByPreset = {
          tuna: "https://mirrors.tuna.tsinghua.edu.cn/",
          ustc: "https://mirrors.ustc.edu.cn/",
          aliyun: "https://mirrors.aliyun.com/"
        };
        const key = String(preset).trim().toLowerCase();
        const nextDefault = defaultsByPreset[key] || "";
        if (!nextDefault) return;
        if (!currentEndpoint) {
          formData.value.endpoint_url = nextDefault;
          return;
        }
        const knownDefaults = new Set(Object.values(defaultsByPreset));
        if (knownDefaults.has(currentEndpoint)) {
          formData.value.endpoint_url = nextDefault;
        }
      }
    };
    watch(
      () => formData.value.provider_type,
      () => {
        ensureTypeDefaults();
      }
    );
    watch(
      () => [formData.value.storage_type, formData.value.preset],
      ([type]) => {
        if (type === "MIRROR") {
          ensureTypeDefaults();
        }
      }
    );
    watch(
      () => currentType.value,
      () => {
        resetSecretUiState();
      }
    );
    watch(
      () => props.config,
      () => {
        resetSecretUiState();
        const config = props.config;
        if (config) {
          const type = config.storage_type || (storageTypes.value[0]?.value || "");
          const next = { ...config, storage_type: type };
          if (next.storage_type === "GOOGLE_DRIVE" && (!next.root_id || String(next.root_id).trim().length === 0)) {
            next.root_id = "root";
          }
          formData.value = next;
          normalizeFormBooleans();
          const sizeState = { storageSize: "", storageUnit: storageUnit.value };
          setStorageSizeFromBytes(formData.value.total_storage_bytes, sizeState);
          storageSize.value = sizeState.storageSize;
          storageUnit.value = sizeState.storageUnit;
        } else {
          const type = storageTypes.value[0]?.value || "";
          formData.value = {
            name: "",
            storage_type: type
          };
          normalizeFormBooleans();
          const defaultBytes = getDefaultStorageByProvider();
          formData.value.total_storage_bytes = defaultBytes;
          const sizeState = { storageSize: "", storageUnit: storageUnit.value };
          setStorageSizeFromBytes(defaultBytes, sizeState);
          storageSize.value = sizeState.storageSize;
          storageUnit.value = sizeState.storageUnit;
        }
      },
      { immediate: true }
    );
    watch(
      () => formData.value.provider_type,
      (newProvider) => {
        if (!formData.value.total_storage_bytes) {
          const defaultBytes = getDefaultStorageByProvider();
          formData.value.total_storage_bytes = defaultBytes;
          const sizeState = { storageSize: "", storageUnit: storageUnit.value };
          setStorageSizeFromBytes(defaultBytes, sizeState);
          storageSize.value = sizeState.storageSize;
          storageUnit.value = sizeState.storageUnit;
        }
      }
    );
    watch([storageSize, storageUnit], () => {
      formData.value.total_storage_bytes = calculateStorageBytes({
        storageSize: storageSize.value,
        storageUnit: storageUnit.value
      });
    });
    watch(
      () => currentConfigSchema.value,
      (schema) => {
        if (!schema) return;
        applySchemaDefaultValues(schema);
        normalizeFormBooleans(schema);
        ensureTypeDefaults();
      }
    );
    const submitForm = async () => {
      loading.value = true;
      error.value = "";
      success.value = "";
      try {
        let savedConfig;
        if (props.isEdit && props.config?.id) {
          const updateData = { ...buildPayload() };
          const schema = currentConfigSchema.value;
          const secretFields = Array.isArray(schema?.fields) ? schema.fields.filter((f) => f && typeof f === "object" && f.type === "secret" && typeof f.name === "string" && f.name).map((f) => f.name) : [];
          for (const fieldName of secretFields) {
            if (!Object.prototype.hasOwnProperty.call(updateData, fieldName)) continue;
            const raw = updateData[fieldName];
            const str = typeof raw === "string" ? raw.trim() : "";
            const shouldSkip = raw === null || raw === void 0 || str.length === 0 || isMaskedValue(str);
            if (shouldSkip) {
              delete updateData[fieldName];
            }
          }
          savedConfig = await updateStorageConfig(props.config.id, updateData);
        } else {
          savedConfig = await createStorageConfig(buildPayload());
        }
        success.value = props.isEdit ? "存储配置更新成功！" : "存储配置创建成功！";
        try {
          if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
            const configId = props.isEdit ? props.config?.id : savedConfig?.data?.id || savedConfig?.id;
            window.dispatchEvent(
              new CustomEvent("cloudpaste:storage-config-changed", {
                detail: {
                  id: configId || null,
                  storage_type: formData.value.storage_type || null
                }
              })
            );
          }
        } catch {
        }
        emit("success", savedConfig);
        setTimeout(() => {
          emit("close");
        }, 1e3);
      } catch (err) {
        log.error("存储配置操作失败:", err);
        error.value = err.message || "操作失败，请重试";
      } finally {
        loading.value = false;
      }
    };
    const closeModal = () => {
      emit("close");
    };
    onMounted(async () => {
      try {
        await storageConfigsStore.loadStorageTypes();
        if (!formData.value.storage_type && storageTypes.value.length > 0) {
          formData.value.storage_type = storageTypes.value[0].value;
        }
        applySchemaDefaultValues(currentConfigSchema.value);
        normalizeFormBooleans();
      } catch (e) {
        log.error("加载存储类型元数据失败:", e);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 pt-20 sm:pt-4 bg-black bg-opacity-50 overflow-y-auto",
        onClick: withModifiers(closeModal, ["self"])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["w-full max-w-md sm:max-w-xl rounded-lg shadow-xl overflow-hidden transition-colors max-h-[85vh] sm:max-h-[80vh] flex flex-col", __props.darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"]),
          onClick: _cache[6] || (_cache[6] = withModifiers(() => {
          }, ["stop"]))
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["px-4 sm:px-6 py-3 sm:py-4 border-b", __props.darkMode ? "border-gray-700" : "border-gray-200"])
          }, [
            createBaseVNode("h2", _hoisted_1$1, toDisplayString(formTitle.value), 1)
          ], 2),
          createBaseVNode("div", _hoisted_2$1, [
            success.value ? (openBlock(), createElementBlock("div", _hoisted_3$1, toDisplayString(success.value), 1)) : createCommentVNode("", true),
            error.value ? (openBlock(), createElementBlock("div", _hoisted_4$1, toDisplayString(error.value), 1)) : createCommentVNode("", true),
            createBaseVNode("form", {
              onSubmit: withModifiers(submitForm, ["prevent"]),
              class: "space-y-6"
            }, [
              createBaseVNode("div", _hoisted_5$1, [
                createBaseVNode("h3", {
                  class: normalizeClass(["text-sm font-medium border-b pb-2", __props.darkMode ? "text-gray-200 border-gray-600" : "text-gray-700 border-gray-200"])
                }, "基本信息", 2),
                createBaseVNode("div", null, [
                  createBaseVNode("label", {
                    for: "storage_type",
                    class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                  }, _cache[7] || (_cache[7] = [
                    createTextVNode(" 存储类型 ", -1),
                    createBaseVNode("span", { class: "text-red-500" }, "*", -1)
                  ]), 2),
                  withDirectives(createBaseVNode("select", {
                    id: "storage_type",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.value.storage_type = $event),
                    class: normalizeClass(["block w-full px-3 py-2 rounded-md text-sm transition-colors duration-200 border", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 text-gray-900"])
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(storageTypes.value, (type) => {
                      return openBlock(), createElementBlock("option", {
                        key: type.value,
                        value: type.value
                      }, toDisplayString(type.label), 9, _hoisted_6$1);
                    }), 128))
                  ], 2), [
                    [vModelSelect, formData.value.storage_type]
                  ]),
                  createBaseVNode("p", {
                    class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                  }, "请先选择存储类型。", 2)
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("label", {
                    for: "name",
                    class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                  }, _cache[8] || (_cache[8] = [
                    createTextVNode(" 配置名称 ", -1),
                    createBaseVNode("span", { class: "text-red-500" }, "*", -1)
                  ]), 2),
                  withDirectives(createBaseVNode("input", {
                    type: "text",
                    id: "name",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => formData.value.name = $event),
                    required: "",
                    onBlur: _cache[2] || (_cache[2] = ($event) => trimInput("name")),
                    class: normalizeClass(["block w-full px-3 py-2 rounded-md text-sm transition-colors duration-200 border", __props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500"]),
                    placeholder: "例如：我的备份存储"
                  }, null, 34), [
                    [vModelText, formData.value.name]
                  ]),
                  createBaseVNode("p", {
                    class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                  }, "为此配置指定一个易于识别的名称", 2)
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("label", {
                    for: "storage_size",
                    class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                  }, " 存储容量限制 ", 2),
                  createBaseVNode("div", _hoisted_7$1, [
                    withDirectives(createBaseVNode("input", {
                      type: "number",
                      id: "storage_size",
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => storageSize.value = $event),
                      min: "0",
                      step: "0.01",
                      class: normalizeClass(["block w-2/3 px-3 py-2 rounded-md text-sm transition-colors duration-200 border", __props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500"]),
                      placeholder: "例如：10"
                    }, null, 2), [
                      [vModelText, storageSize.value]
                    ]),
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => storageUnit.value = $event),
                      class: normalizeClass(["block w-1/3 px-3 py-2 rounded-md text-sm transition-colors duration-200 border", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 text-gray-900"])
                    }, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(storageUnits), (unit) => {
                        return openBlock(), createElementBlock("option", {
                          key: unit.value,
                          value: unit.value
                        }, toDisplayString(unit.label), 9, _hoisted_8$1);
                      }), 128))
                    ], 2), [
                      [vModelSelect, storageUnit.value]
                    ])
                  ]),
                  createBaseVNode("p", {
                    class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                  }, " 用于限制该存储的最大可用容量（默认 10GB，清空=不限额） ", 2)
                ]),
                currentConfigSchema.value && layoutGroups.value && layoutGroups.value.length ? (openBlock(), createElementBlock("div", _hoisted_9$1, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(layoutGroups.value, (group) => {
                    return openBlock(), createElementBlock("div", {
                      key: group.name,
                      class: "space-y-3"
                    }, [
                      createBaseVNode("h3", {
                        class: normalizeClass(["text-sm font-medium border-b pb-2", __props.darkMode ? "text-gray-200 border-gray-600" : "text-gray-700 border-gray-200"])
                      }, toDisplayString(group.titleKey ? unref(t)(group.titleKey) : "存储配置"), 3),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(getLayoutRowsForGroup(group), (row, rowIndex) => {
                        return openBlock(), createElementBlock(Fragment, null, [
                          row.type === "row" ? (openBlock(), createElementBlock("div", {
                            key: `row-${rowIndex}`,
                            class: "grid grid-cols-1 sm:grid-cols-2 gap-4"
                          }, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(row.fields, (fieldName) => {
                              return openBlock(), createElementBlock("div", { key: fieldName }, [
                                getFieldType(fieldName) === "boolean" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                  createBaseVNode("label", {
                                    class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                                  }, toDisplayString(getFieldLabel(fieldName)), 3),
                                  createBaseVNode("div", {
                                    class: normalizeClass(["flex items-center h-10 px-3 py-2 rounded-md border", __props.darkMode ? "border-gray-600" : "border-gray-300"])
                                  }, [
                                    withDirectives(createBaseVNode("input", {
                                      type: "checkbox",
                                      id: fieldName,
                                      "onUpdate:modelValue": ($event) => formData.value[fieldName] = $event,
                                      class: normalizeClass(["h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500", __props.darkMode ? "bg-gray-700 border-gray-600" : ""])
                                    }, null, 10, _hoisted_10$1), [
                                      [vModelCheckbox, formData.value[fieldName]]
                                    ]),
                                    createBaseVNode("label", {
                                      for: fieldName,
                                      class: normalizeClass(["ml-2 text-sm", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                                    }, toDisplayString(getBooleanDisplayValue(fieldName)), 11, _hoisted_11$1)
                                  ], 2),
                                  getFieldDescription(fieldName) ? (openBlock(), createElementBlock("p", {
                                    key: 0,
                                    class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                                  }, toDisplayString(getFieldDescription(fieldName)), 3)) : createCommentVNode("", true)
                                ], 64)) : getFieldType(fieldName) === "enum" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                  createBaseVNode("label", {
                                    class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                                  }, [
                                    createTextVNode(toDisplayString(getFieldLabel(fieldName)) + " ", 1),
                                    isFieldRequiredOnCreate(fieldName) ? (openBlock(), createElementBlock("span", _hoisted_12$1, "*")) : createCommentVNode("", true)
                                  ], 2),
                                  isEnumToggle(fieldName) ? (openBlock(), createElementBlock("div", {
                                    key: 0,
                                    class: normalizeClass(["flex items-center h-10 px-3 py-2 rounded-md border", __props.darkMode ? "border-gray-600" : "border-gray-300"])
                                  }, [
                                    createBaseVNode("input", {
                                      type: "checkbox",
                                      id: fieldName,
                                      checked: formData.value[fieldName] === getEnumToggleValues(fieldName).onValue,
                                      onChange: ($event) => handleEnumToggleChange(fieldName, $event.target.checked),
                                      class: normalizeClass(["h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500", __props.darkMode ? "bg-gray-700 border-gray-600" : ""])
                                    }, null, 42, _hoisted_13$1),
                                    createBaseVNode("label", {
                                      for: fieldName,
                                      class: normalizeClass(["ml-2 text-sm", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                                    }, toDisplayString(getEnumToggleLabel(fieldName)), 11, _hoisted_14$1)
                                  ], 2)) : withDirectives((openBlock(), createElementBlock("select", {
                                    key: 1,
                                    id: fieldName,
                                    "onUpdate:modelValue": ($event) => formData.value[fieldName] = $event,
                                    class: normalizeClass(["block w-full px-3 py-2 rounded-md text-sm transition-colors duration-200 border", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 text-gray-900"])
                                  }, [
                                    (openBlock(true), createElementBlock(Fragment, null, renderList(getEnumOptions(fieldName), (opt) => {
                                      return openBlock(), createElementBlock("option", {
                                        key: opt.value,
                                        value: opt.value
                                      }, toDisplayString(opt.labelKey ? unref(t)(opt.labelKey) : opt.label || opt.value), 9, _hoisted_16$1);
                                    }), 128))
                                  ], 10, _hoisted_15$1)), [
                                    [vModelSelect, formData.value[fieldName]]
                                  ]),
                                  getFieldDescription(fieldName) ? (openBlock(), createElementBlock("p", {
                                    key: 2,
                                    class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                                  }, toDisplayString(getFieldDescription(fieldName)), 3)) : createCommentVNode("", true)
                                ], 64)) : getFieldType(fieldName) === "secret" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                                  createBaseVNode("div", _hoisted_17$1, [
                                    createBaseVNode("label", {
                                      for: fieldName,
                                      class: normalizeClass(["block text-sm font-medium", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                                    }, [
                                      createTextVNode(toDisplayString(getFieldLabel(fieldName)) + " ", 1),
                                      isFieldRequiredOnCreate(fieldName) ? (openBlock(), createElementBlock("span", _hoisted_19$1, "*")) : createCommentVNode("", true)
                                    ], 10, _hoisted_18$1),
                                    isSecretField(fieldName) ? (openBlock(), createElementBlock("button", {
                                      key: 0,
                                      type: "button",
                                      onClick: withModifiers(($event) => handleSecretToggle(fieldName), ["stop"]),
                                      class: normalizeClass(["inline-flex items-center px-2 py-1 rounded text-xs flex-shrink-0", __props.darkMode ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"]),
                                      disabled: isSecretRevealing()
                                    }, [
                                      !isSecretRevealing() && !isSecretVisible(fieldName) ? (openBlock(), createBlock(unref(IconEye), {
                                        key: 0,
                                        size: "sm"
                                      })) : !isSecretRevealing() && isSecretVisible(fieldName) ? (openBlock(), createBlock(unref(IconEyeOff), {
                                        key: 1,
                                        size: "sm"
                                      })) : (openBlock(), createBlock(unref(IconRefresh), {
                                        key: 2,
                                        size: "sm",
                                        class: "animate-spin"
                                      }))
                                    ], 10, _hoisted_20$1)) : createCommentVNode("", true)
                                  ]),
                                  withDirectives(createBaseVNode("input", {
                                    type: getSecretInputType(fieldName),
                                    id: fieldName,
                                    "onUpdate:modelValue": ($event) => formData.value[fieldName] = $event,
                                    required: isFieldRequiredOnCreate(fieldName) && !__props.isEdit,
                                    placeholder: getFieldPlaceholder(fieldName),
                                    autocomplete: "new-password",
                                    class: normalizeClass(["block w-full px-3 py-2 rounded-md text-sm transition-colors duration-200 border", __props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500"])
                                  }, null, 10, _hoisted_21$1), [
                                    [vModelDynamic, formData.value[fieldName]]
                                  ]),
                                  getFieldDescription(fieldName) ? (openBlock(), createElementBlock("p", {
                                    key: 0,
                                    class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                                  }, toDisplayString(getFieldDescription(fieldName)), 3)) : createCommentVNode("", true)
                                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                                  createBaseVNode("label", {
                                    class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                                  }, [
                                    createTextVNode(toDisplayString(getFieldLabel(fieldName)) + " ", 1),
                                    isFieldRequiredOnCreate(fieldName) ? (openBlock(), createElementBlock("span", _hoisted_22$1, "*")) : createCommentVNode("", true)
                                  ], 2),
                                  withDirectives(createBaseVNode("input", {
                                    type: getFieldType(fieldName) === "number" ? "number" : "text",
                                    id: fieldName,
                                    "onUpdate:modelValue": ($event) => formData.value[fieldName] = $event,
                                    required: isFieldRequiredOnCreate(fieldName),
                                    disabled: isFieldDisabled(fieldName),
                                    placeholder: getFieldPlaceholder(fieldName),
                                    onBlur: ($event) => handleFieldBlur(fieldName),
                                    class: normalizeClass(["block w-full px-3 py-2 rounded-md text-sm transition-colors duration-200 border", [
                                      __props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500",
                                      isUrlField(fieldName) && formData.value[fieldName] && !unref(isValidUrl)(formData.value[fieldName]) ? "border-red-500" : "",
                                      isFieldDisabled(fieldName) ? "opacity-50 cursor-not-allowed" : ""
                                    ]])
                                  }, null, 42, _hoisted_23$1), [
                                    [vModelDynamic, formData.value[fieldName]]
                                  ]),
                                  isUrlField(fieldName) && formData.value[fieldName] && !unref(isValidUrl)(formData.value[fieldName]) ? (openBlock(), createElementBlock("p", _hoisted_24$1, " 请输入有效的 URL 格式，如 https://xxx.com ")) : getFieldDescription(fieldName) ? (openBlock(), createElementBlock("p", {
                                    key: 1,
                                    class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                                  }, toDisplayString(getFieldDescription(fieldName)), 3)) : createCommentVNode("", true)
                                ], 64))
                              ]);
                            }), 128))
                          ])) : row.type === "full" ? (openBlock(), createElementBlock("div", {
                            key: `full-${rowIndex}`,
                            class: "w-full"
                          }, [
                            getFieldType(row.field) === "boolean" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                              createBaseVNode("div", {
                                class: normalizeClass(["flex items-center h-10 px-3 py-2 rounded-md border", __props.darkMode ? "border-gray-600" : "border-gray-300"])
                              }, [
                                withDirectives(createBaseVNode("input", {
                                  type: "checkbox",
                                  id: row.field,
                                  "onUpdate:modelValue": ($event) => formData.value[row.field] = $event,
                                  class: normalizeClass(["h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500", __props.darkMode ? "bg-gray-700 border-gray-600" : ""])
                                }, null, 10, _hoisted_25$1), [
                                  [vModelCheckbox, formData.value[row.field]]
                                ]),
                                createBaseVNode("label", {
                                  for: row.field,
                                  class: normalizeClass(["ml-2 text-sm", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                                }, toDisplayString(getFieldLabel(row.field)), 11, _hoisted_26$1)
                              ], 2),
                              getFieldDescription(row.field) ? (openBlock(), createElementBlock("p", {
                                key: 0,
                                class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                              }, toDisplayString(getFieldDescription(row.field)), 3)) : createCommentVNode("", true)
                            ], 64)) : getFieldType(row.field) === "enum" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createBaseVNode("label", {
                                class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                              }, [
                                createTextVNode(toDisplayString(getFieldLabel(row.field)) + " ", 1),
                                isFieldRequiredOnCreate(row.field) ? (openBlock(), createElementBlock("span", _hoisted_27$1, "*")) : createCommentVNode("", true)
                              ], 2),
                              isEnumToggle(row.field) ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: normalizeClass(["flex items-center h-10 px-3 py-2 rounded-md border", __props.darkMode ? "border-gray-600" : "border-gray-300"])
                              }, [
                                createBaseVNode("input", {
                                  type: "checkbox",
                                  id: row.field,
                                  checked: formData.value[row.field] === getEnumToggleValues(row.field).onValue,
                                  onChange: ($event) => handleEnumToggleChange(row.field, $event.target.checked),
                                  class: normalizeClass(["h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500", __props.darkMode ? "bg-gray-700 border-gray-600" : ""])
                                }, null, 42, _hoisted_28$1),
                                createBaseVNode("label", {
                                  for: row.field,
                                  class: normalizeClass(["ml-2 text-sm", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                                }, toDisplayString(getEnumToggleLabel(row.field)), 11, _hoisted_29$1)
                              ], 2)) : withDirectives((openBlock(), createElementBlock("select", {
                                key: 1,
                                id: row.field,
                                "onUpdate:modelValue": ($event) => formData.value[row.field] = $event,
                                class: normalizeClass(["block w-full px-3 py-2 rounded-md text-sm transition-colors duration-200 border", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 text-gray-900"])
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(getEnumOptions(row.field), (opt) => {
                                  return openBlock(), createElementBlock("option", {
                                    key: opt.value,
                                    value: opt.value
                                  }, toDisplayString(opt.labelKey ? unref(t)(opt.labelKey) : opt.label || opt.value), 9, _hoisted_31$1);
                                }), 128))
                              ], 10, _hoisted_30$1)), [
                                [vModelSelect, formData.value[row.field]]
                              ]),
                              getFieldDescription(row.field) ? (openBlock(), createElementBlock("p", {
                                key: 2,
                                class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                              }, toDisplayString(getFieldDescription(row.field)), 3)) : createCommentVNode("", true)
                            ], 64)) : getFieldType(row.field) === "secret" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                              createBaseVNode("div", _hoisted_32$1, [
                                createBaseVNode("label", {
                                  for: row.field,
                                  class: normalizeClass(["block text-sm font-medium", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                                }, [
                                  createTextVNode(toDisplayString(getFieldLabel(row.field)) + " ", 1),
                                  isFieldRequiredOnCreate(row.field) ? (openBlock(), createElementBlock("span", _hoisted_34$1, "*")) : createCommentVNode("", true)
                                ], 10, _hoisted_33$1),
                                isSecretField(row.field) ? (openBlock(), createElementBlock("button", {
                                  key: 0,
                                  type: "button",
                                  onClick: withModifiers(($event) => handleSecretToggle(row.field), ["stop"]),
                                  class: normalizeClass(["inline-flex items-center px-2 py-1 rounded text-xs flex-shrink-0", __props.darkMode ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"]),
                                  disabled: isSecretRevealing(row.field)
                                }, [
                                  !isSecretRevealing(row.field) && !isSecretVisible(row.field) ? (openBlock(), createBlock(unref(IconEye), {
                                    key: 0,
                                    size: "sm"
                                  })) : !isSecretRevealing(row.field) && isSecretVisible(row.field) ? (openBlock(), createBlock(unref(IconEyeOff), {
                                    key: 1,
                                    size: "sm"
                                  })) : (openBlock(), createBlock(unref(IconRefresh), {
                                    key: 2,
                                    size: "sm",
                                    class: "animate-spin"
                                  }))
                                ], 10, _hoisted_35$1)) : createCommentVNode("", true)
                              ]),
                              row.field === "refresh_token" && isOneDriveType.value ? withDirectives((openBlock(), createElementBlock("input", {
                                key: 0,
                                type: getSecretInputType(row.field),
                                id: row.field,
                                "onUpdate:modelValue": ($event) => formData.value[row.field] = $event,
                                required: isFieldRequiredOnCreate(row.field) && !__props.isEdit,
                                placeholder: getFieldPlaceholder(row.field),
                                autocomplete: "new-password",
                                class: normalizeClass(["block w-full px-3 py-2 rounded-md text-sm transition-colors duration-200 border", __props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500"])
                              }, null, 10, _hoisted_36$1)), [
                                [vModelDynamic, formData.value[row.field]]
                              ]) : withDirectives((openBlock(), createElementBlock("input", {
                                key: 1,
                                type: getSecretInputType(row.field),
                                id: row.field,
                                "onUpdate:modelValue": ($event) => formData.value[row.field] = $event,
                                required: isFieldRequiredOnCreate(row.field) && !__props.isEdit,
                                placeholder: getFieldPlaceholder(row.field),
                                autocomplete: "new-password",
                                class: normalizeClass(["block w-full px-3 py-2 rounded-md text-sm transition-colors duration-200 border", __props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500"])
                              }, null, 10, _hoisted_37$1)), [
                                [vModelDynamic, formData.value[row.field]]
                              ]),
                              row.field === "refresh_token" && isOneDriveType.value ? (openBlock(), createElementBlock("p", {
                                key: 2,
                                class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                              }, " 请输入在外部授权页面（如 OpenList APIPages）获取的刷新令牌 ", 2)) : getFieldDescription(row.field) ? (openBlock(), createElementBlock("p", {
                                key: 3,
                                class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                              }, toDisplayString(getFieldDescription(row.field)), 3)) : createCommentVNode("", true)
                            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                              createBaseVNode("label", {
                                class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                              }, [
                                createTextVNode(toDisplayString(getFieldLabel(row.field)) + " ", 1),
                                isFieldRequiredOnCreate(row.field) ? (openBlock(), createElementBlock("span", _hoisted_38$1, "*")) : createCommentVNode("", true)
                              ], 2),
                              withDirectives(createBaseVNode("input", {
                                type: getFieldType(row.field) === "number" ? "number" : "text",
                                id: row.field,
                                "onUpdate:modelValue": ($event) => formData.value[row.field] = $event,
                                required: isFieldRequiredOnCreate(row.field),
                                disabled: isFieldDisabled(row.field),
                                placeholder: getFieldPlaceholder(row.field),
                                onBlur: ($event) => handleFieldBlur(row.field),
                                class: normalizeClass(["block w-full px-3 py-2 rounded-md text-sm transition-colors duration-200 border", [
                                  __props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500",
                                  isUrlField(row.field) && formData.value[row.field] && !unref(isValidUrl)(formData.value[row.field]) ? "border-red-500" : "",
                                  isFieldDisabled(row.field) ? "opacity-50 cursor-not-allowed" : ""
                                ]])
                              }, null, 42, _hoisted_39$1), [
                                [vModelDynamic, formData.value[row.field]]
                              ]),
                              isUrlField(row.field) && formData.value[row.field] && !unref(isValidUrl)(formData.value[row.field]) ? (openBlock(), createElementBlock("p", _hoisted_40$1, " 请输入有效的 URL 格式，如 https://xxx.com ")) : getFieldDescription(row.field) ? (openBlock(), createElementBlock("p", {
                                key: 1,
                                class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                              }, toDisplayString(getFieldDescription(row.field)), 3)) : createCommentVNode("", true)
                            ], 64))
                          ])) : createCommentVNode("", true)
                        ], 64);
                      }), 256))
                    ]);
                  }), 128))
                ])) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_41$1, [
                createBaseVNode("h3", {
                  class: normalizeClass(["text-sm font-medium border-b pb-2", __props.darkMode ? "text-gray-200 border-gray-600" : "text-gray-700 border-gray-200"])
                }, "其他选项", 2),
                createBaseVNode("div", _hoisted_42$1, [
                  createBaseVNode("div", null, [
                    createBaseVNode("label", {
                      class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                    }, "API密钥权限", 2),
                    createBaseVNode("div", {
                      class: normalizeClass(["flex items-center h-10 px-3 py-2 rounded-md border", __props.darkMode ? "border-gray-600" : "border-gray-300"])
                    }, [
                      withDirectives(createBaseVNode("input", {
                        type: "checkbox",
                        id: "is_public",
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => formData.value.is_public = $event),
                        class: normalizeClass(["h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500", __props.darkMode ? "bg-gray-700 border-gray-600" : ""])
                      }, null, 2), [
                        [vModelCheckbox, formData.value.is_public]
                      ]),
                      createBaseVNode("label", {
                        for: "is_public",
                        class: normalizeClass(["ml-2 text-sm", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                      }, "允许API密钥用户使用", 2)
                    ], 2),
                    createBaseVNode("p", {
                      class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                    }, "允许API密钥用户使用此存储", 2)
                  ])
                ])
              ])
            ], 32)
          ]),
          createBaseVNode("div", {
            class: normalizeClass(["px-3 sm:px-4 py-2 sm:py-3 border-t transition-colors duration-200 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-2 space-y-reverse sm:space-y-0", __props.darkMode ? "border-gray-700" : "border-gray-200"])
          }, [
            createBaseVNode("button", {
              onClick: closeModal,
              class: normalizeClass(["w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-200 hover:bg-gray-300 text-gray-700"])
            }, " 取消 ", 2),
            createBaseVNode("button", {
              onClick: submitForm,
              disabled: !formValid.value || loading.value,
              class: normalizeClass(["w-full sm:w-auto flex justify-center items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 bg-primary-500 hover:bg-primary-600 text-white", { "opacity-50 cursor-not-allowed": !formValid.value || loading.value }])
            }, [
              loading.value ? (openBlock(), createBlock(unref(IconRefresh), {
                key: 0,
                size: "sm",
                class: "animate-spin -ml-1 mr-2 text-white"
              })) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(loading.value ? "保存中..." : "保存配置"), 1)
            ], 10, _hoisted_43$1)
          ], 2)
        ], 2)
      ]);
    };
  }
};
const _hoisted_1 = { class: "p-4 flex-1 flex flex-col overflow-y-auto" };
const _hoisted_2 = { class: "flex flex-wrap gap-3 mb-5 items-center" };
const _hoisted_3 = ["value"];
const _hoisted_4 = { class: "flex justify-between items-start" };
const _hoisted_5 = { class: "flex items-start" };
const _hoisted_6 = { class: "mt-1" };
const _hoisted_7 = { class: "flex-1 flex flex-col" };
const _hoisted_8 = {
  key: 0,
  class: "flex justify-center items-center h-40"
};
const _hoisted_9 = {
  key: 0,
  class: "bg-white dark:bg-gray-800 shadow-md rounded-lg p-0 sm:p-3"
};
const _hoisted_10 = { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4" };
const _hoisted_11 = { class: "flex items-center gap-1 sm:gap-2 flex-wrap min-w-0" };
const _hoisted_12 = ["title"];
const _hoisted_13 = { class: "flex items-center gap-1 sm:gap-2 flex-wrap flex-shrink-0" };
const _hoisted_14 = { class: "p-3 sm:p-4" };
const _hoisted_15 = {
  key: 0,
  class: "grid grid-cols-1 gap-2 text-sm"
};
const _hoisted_16 = { class: "font-medium" };
const _hoisted_17 = ["title"];
const _hoisted_18 = { key: 1 };
const _hoisted_19 = { class: "flex justify-between" };
const _hoisted_20 = { class: "flex items-center" };
const _hoisted_21 = { class: "flex justify-between" };
const _hoisted_22 = { class: "flex justify-between" };
const _hoisted_23 = {
  key: 1,
  class: "mt-3"
};
const _hoisted_24 = { class: "flex-1 min-w-0" };
const _hoisted_25 = ["onClick"];
const _hoisted_26 = { class: "mt-4 flex flex-wrap gap-2" };
const _hoisted_27 = ["onClick", "disabled"];
const _hoisted_28 = ["onClick", "disabled"];
const _hoisted_29 = ["onClick"];
const _hoisted_30 = ["onClick", "disabled"];
const _hoisted_31 = { class: "mt-4" };
const _hoisted_32 = { class: "p-4 max-h-[70vh] overflow-y-auto" };
const _hoisted_33 = { class: "flex-1 min-w-0" };
const _hoisted_34 = {
  key: 0,
  class: "mt-1 text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line"
};
const _hoisted_35 = { class: "mb-3" };
const _hoisted_36 = {
  key: 0,
  class: "space-y-4"
};
const _hoisted_37 = {
  key: 0,
  class: "mb-3"
};
const _hoisted_38 = { class: "bg-gray-50 dark:bg-gray-900/50 rounded p-3 text-xs sm:text-sm" };
const _hoisted_39 = { class: "grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2" };
const _hoisted_40 = { class: "text-gray-500 dark:text-gray-400 text-xs font-medium" };
const _hoisted_41 = {
  key: 0,
  class: "text-gray-900 dark:text-gray-200 break-all"
};
const _hoisted_42 = {
  key: 1,
  class: "bg-gray-100 dark:bg-gray-800 rounded p-1 text-xs overflow-auto max-h-24 mt-0.5"
};
const _hoisted_43 = {
  key: 1,
  class: "mb-3"
};
const _hoisted_44 = { class: "bg-gray-50 dark:bg-gray-900/50 rounded p-3 space-y-2.5" };
const _hoisted_45 = {
  key: 2,
  class: "h-4 w-4 flex items-center justify-center text-xs text-gray-400 flex-shrink-0 mt-0.5"
};
const _hoisted_46 = { class: "flex-1 min-w-0" };
const _hoisted_47 = { class: "flex items-center gap-1.5 flex-wrap" };
const _hoisted_48 = {
  key: 0,
  class: "text-xs text-gray-400 dark:text-gray-500"
};
const _hoisted_49 = {
  key: 0,
  class: "mt-1 text-xs text-gray-500 dark:text-gray-400 italic"
};
const _hoisted_50 = {
  key: 1,
  class: "mt-1.5"
};
const _hoisted_51 = { class: "bg-red-50 dark:bg-red-900/20 p-2 rounded text-xs text-red-600 dark:text-red-400 max-h-20 overflow-auto" };
const _hoisted_52 = {
  key: 2,
  class: "mt-2 pl-0.5"
};
const _hoisted_53 = { class: "grid grid-cols-2 gap-x-3 gap-y-1 text-xs" };
const _hoisted_54 = { class: "text-gray-500 dark:text-gray-400" };
const _hoisted_55 = { class: "text-gray-700 dark:text-gray-300 break-all" };
const _hoisted_56 = { class: "text-gray-500 dark:text-gray-400 col-span-2" };
const _hoisted_57 = { class: "col-span-2 bg-gray-100 dark:bg-gray-800 rounded p-1.5 text-xs overflow-auto max-h-24 -mt-0.5" };
const _hoisted_58 = {
  key: 3,
  class: "mt-2 pl-0.5"
};
const _hoisted_59 = { class: "grid grid-cols-2 gap-x-3 gap-y-1 text-xs" };
const _hoisted_60 = { class: "text-gray-500 dark:text-gray-400" };
const _hoisted_61 = { class: "text-gray-700 dark:text-gray-300 break-all" };
const _hoisted_62 = { class: "text-gray-500 dark:text-gray-400 col-span-2" };
const _hoisted_63 = { class: "col-span-2 bg-gray-100 dark:bg-gray-800 rounded p-1.5 text-xs overflow-auto max-h-24 -mt-0.5" };
const _hoisted_64 = {
  key: 2,
  class: "mb-3"
};
const _hoisted_65 = { class: "bg-gray-50 dark:bg-gray-900/50 rounded p-2 sm:p-3 text-xs sm:text-sm" };
const _hoisted_66 = { class: "bg-gray-100 dark:bg-gray-800 rounded p-1 text-xs overflow-auto max-h-56" };
const _hoisted_67 = {
  key: 3,
  class: "mb-3"
};
const _hoisted_68 = { class: "bg-gray-50 dark:bg-gray-900/50 rounded p-2 sm:p-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300" };
const _hoisted_69 = {
  key: 1,
  class: "space-y-4"
};
const _hoisted_70 = { class: "p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end" };
const _sfc_main = {
  __name: "StorageConfigView",
  setup(__props) {
    const { isDarkMode: darkMode } = useThemeMode();
    const { t } = useI18n();
    const { dialogState, confirm, handleConfirm, handleCancel } = useConfirmDialog();
    const confirmFn = createConfirmFn(confirm, {
      t,
      darkMode,
      getConfirmText: () => t("common.dialogs.deleteButton")
    });
    const {
      // 状态
      loading,
      error,
      storageConfigs,
      filteredConfigs,
      storageTypeFilter,
      availableStorageTypes,
      pagination,
      pageSizeOptions,
      currentConfig,
      showAddForm,
      showEditForm,
      testResults,
      showTestDetails,
      selectedTestResult,
      showDetailedResults,
      // 行级加载状态
      isConfigDeleting,
      isConfigSettingDefault,
      // 方法
      loadStorageConfigs,
      handlePageChange,
      handleLimitChange,
      handleDeleteConfig,
      editConfig,
      addNewConfig,
      handleFormSuccess,
      handleSetDefaultConfig,
      testConnection,
      showTestDetailsModal,
      STORAGE_TYPE_UNKNOWN
    } = useStorageConfigManagement({ confirmFn });
    const { getStorageTypeIcon, getStorageTypeIconClass } = useStorageTypeIcon();
    const { getTypeMeta, getTypeLabel, getBadgeClass, ensureLoaded } = useStorageTypePresentation();
    const formatStorageTypeLabel = (type) => {
      return getTypeLabel(type === STORAGE_TYPE_UNKNOWN ? null : type, t);
    };
    const getConfigSummaryRows = (config) => {
      if (!config) return [];
      const meta = getTypeMeta(config.storage_type);
      const schema = meta?.configSchema;
      const layout = schema?.layout;
      const summaryFields = layout?.summaryFields;
      if (!schema || !Array.isArray(summaryFields) || summaryFields.length === 0) {
        return [];
      }
      return summaryFields.map((fieldName) => {
        const fieldMeta = schema.fields?.find((f) => f.name === fieldName) || null;
        const labelKey = fieldMeta?.labelKey;
        const label = labelKey ? t(labelKey) : fieldName;
        let rawValue = config[fieldName];
        let value = rawValue;
        const ui = fieldMeta?.ui;
        const isBooleanField = fieldMeta?.type === "boolean" || typeof rawValue === "boolean";
        if (isBooleanField) {
          const boolValue = rawValue === true || rawValue === 1 || rawValue === "1";
          const displayOpts = ui?.displayOptions;
          if (displayOpts) {
            value = boolValue ? t(displayOpts.trueKey) : t(displayOpts.falseKey);
          } else {
            value = boolValue ? "是" : "否";
          }
        }
        if (fieldMeta?.type === "computed" && ui?.displayOptions) {
          const displayKey = ui.displayOptions[rawValue];
          if (displayKey) {
            value = t(displayKey);
          }
        }
        const isEmpty = value === void 0 || value === null || String(value).trim().length === 0;
        if (isEmpty && ui?.emptyTextKey) {
          value = t(ui.emptyTextKey);
        }
        const show = !isEmpty || !!ui?.emptyTextKey;
        return {
          key: fieldName,
          label,
          value,
          show
        };
      }).filter((row) => row.show);
    };
    const storageTypeOptions = computed(
      () => availableStorageTypes.value.map((type) => ({
        value: type,
        label: formatStorageTypeLabel(type)
      }))
    );
    const hasAnyConfig = computed(() => storageConfigs.value.length > 0);
    const hasFilteredResult = computed(() => filteredConfigs.value.length > 0);
    const camelToReadable = (str) => {
      if (!str) return str;
      return str.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (c) => c.toUpperCase());
    };
    const formatLabel = (key, storageType = null) => {
      const commonKey = `admin.storage.fields.${key}`;
      if (t(commonKey) !== commonKey) {
        return t(commonKey);
      }
      if (storageType) {
        const typeKey = `admin.storage.fields.${storageType.toLowerCase()}.${key}`;
        if (t(typeKey) !== typeKey) {
          return t(typeKey);
        }
      }
      return camelToReadable(key);
    };
    const isPrimitiveValue = (value) => value == null || ["string", "number", "boolean"].includes(typeof value);
    const formatJson = (value) => {
      try {
        return JSON.stringify(value, null, 2);
      } catch {
        return String(value);
      }
    };
    const formatCheckDetails = (details, storageType = null) => {
      if (!details || typeof details !== "object") return [];
      const result = [];
      for (const [key, value] of Object.entries(details)) {
        const label = formatLabel(key, storageType);
        result.push({ key, label, value });
      }
      return result;
    };
    const isLikelyMsKey = (key) => {
      if (!key) return false;
      const k = String(key);
      if (/_ms$/i.test(k)) return true;
      if (/Ms$/.test(k)) return true;
      if (k === "uploadTime" || k === "responseTime" || k === "totalDuration" || k === "durationMs" || k === "retryAfterMs") {
        return true;
      }
      return false;
    };
    const formatDetailValue = (value, key = "") => {
      if (value === true) return "✓ 是";
      if (value === false) return "✗ 否";
      if (value === null || value === void 0) return "—";
      if (typeof value === "number") {
        if (isLikelyMsKey(key)) return `${value} ms`;
        return String(value);
      }
      if (typeof value === "string") return value || "—";
      return null;
    };
    const formatDate = (isoDate) => {
      if (!isoDate) return "";
      return formatDateTimeWithSeconds(isoDate);
    };
    onMounted(async () => {
      await ensureLoaded();
      await loadStorageConfigs();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("h2", {
          class: normalizeClass(["text-lg sm:text-xl font-medium mb-4", unref(darkMode) ? "text-gray-100" : "text-gray-900"])
        }, "存储管理", 2),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = (...args) => unref(addNewConfig) && unref(addNewConfig)(...args)),
            class: "px-3 py-2 rounded-md flex items-center space-x-1 bg-primary-500 hover:bg-primary-600 text-white font-medium transition text-sm"
          }, [
            createVNode(unref(IconFolderPlus), { class: "h-4 w-4" }),
            _cache[11] || (_cache[11] = createBaseVNode("span", null, "添加新配置", -1))
          ]),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = (...args) => unref(loadStorageConfigs) && unref(loadStorageConfigs)(...args)),
            class: normalizeClass(["px-3 py-2 rounded-md flex items-center space-x-1 font-medium transition text-sm", unref(darkMode) ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-200 hover:bg-gray-300 text-gray-700"])
          }, [
            createVNode(unref(IconRefresh), { class: "h-4 w-4" }),
            _cache[12] || (_cache[12] = createBaseVNode("span", null, "刷新列表", -1))
          ], 2),
          storageTypeOptions.value.length > 0 ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["flex items-center gap-2 text-sm ml-auto", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
          }, [
            _cache[14] || (_cache[14] = createBaseVNode("span", null, "存储类型", -1)),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(storageTypeFilter) ? storageTypeFilter.value = $event : null),
              class: normalizeClass(["px-2 py-1 rounded-md border text-sm", unref(darkMode) ? "bg-gray-800 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-800"])
            }, [
              _cache[13] || (_cache[13] = createBaseVNode("option", { value: "all" }, "全部", -1)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(storageTypeOptions.value, (option) => {
                return openBlock(), createElementBlock("option", {
                  key: option.value,
                  value: option.value
                }, toDisplayString(option.label), 9, _hoisted_3);
              }), 128))
            ], 2), [
              [vModelSelect, unref(storageTypeFilter)]
            ])
          ], 2)) : createCommentVNode("", true)
        ]),
        unref(error) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["mb-4 p-3 rounded-md text-sm", unref(darkMode) ? "bg-red-900/40 border border-red-800 text-red-200" : "bg-red-50 text-red-800 border border-red-200"])
        }, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, [
              createVNode(unref(IconError), { class: "h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" }),
              createBaseVNode("div", null, [
                _cache[15] || (_cache[15] = createBaseVNode("div", { class: "font-medium" }, "操作失败", -1)),
                createBaseVNode("div", _hoisted_6, toDisplayString(unref(error)), 1)
              ])
            ]),
            createBaseVNode("button", {
              onClick: _cache[3] || (_cache[3] = ($event) => error.value = ""),
              class: normalizeClass(["text-red-400 hover:text-red-500", unref(darkMode) ? "hover:text-red-300" : "hover:text-red-600"])
            }, [
              createVNode(unref(IconClose), { class: "h-5 w-5" })
            ], 2)
          ])
        ], 2)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_7, [
          unref(loading) ? (openBlock(), createElementBlock("div", _hoisted_8, [
            createVNode(unref(IconRefresh), { class: "animate-spin h-8 w-8 text-primary-500" })
          ])) : hasAnyConfig.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            hasFilteredResult.value ? (openBlock(), createElementBlock("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(filteredConfigs), (config) => {
                  return openBlock(), createElementBlock("div", {
                    key: config.id,
                    class: normalizeClass(["rounded-lg shadow-md overflow-hidden transition-colors duration-200 border relative", [
                      unref(darkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
                      config.is_default ? unref(darkMode) ? "ring-3 ring-primary-500 border-primary-500 shadow-lg" : "ring-3 ring-primary-500 border-primary-500 shadow-lg" : ""
                    ]])
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["px-2 py-2 sm:px-3 sm:py-2.5 flex flex-wrap justify-between items-center gap-2 border-b", unref(darkMode) ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"])
                    }, [
                      createBaseVNode("div", _hoisted_11, [
                        (openBlock(), createBlock(resolveDynamicComponent(unref(getStorageTypeIcon)(config.storage_type)), {
                          class: normalizeClass(["h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0", unref(getStorageTypeIconClass)(config.storage_type, unref(darkMode))])
                        }, null, 8, ["class"])),
                        createBaseVNode("h3", {
                          class: normalizeClass(["font-medium text-sm", [unref(darkMode) ? "text-gray-100" : "text-gray-900", config.is_default ? "font-semibold" : ""]])
                        }, toDisplayString(config.name), 3),
                        config.is_default ? (openBlock(), createElementBlock("span", {
                          key: 0,
                          class: normalizeClass(["text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium flex-shrink-0", unref(darkMode) ? "bg-primary-600 text-white" : "bg-primary-500 text-white"])
                        }, " 默认 ", 2)) : createCommentVNode("", true),
                        config.url_proxy ? (openBlock(), createElementBlock("span", {
                          key: 1,
                          class: normalizeClass(["text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium flex items-center gap-0.5 sm:gap-1 flex-shrink-0", unref(darkMode) ? "bg-blue-600/20 text-blue-300 border border-blue-500/30" : "bg-blue-100 text-blue-700 border border-blue-200"]),
                          title: `代理URL: ${config.url_proxy}`
                        }, [
                          createVNode(unref(IconLink), { class: "h-3 w-3" }),
                          _cache[16] || (_cache[16] = createBaseVNode("span", { class: "hidden sm:inline" }, "代理", -1))
                        ], 10, _hoisted_12)) : createCommentVNode("", true)
                      ]),
                      createBaseVNode("div", _hoisted_13, [
                        config.provider_type ? (openBlock(), createElementBlock("span", {
                          key: 0,
                          class: normalizeClass(["text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium whitespace-nowrap", unref(darkMode) ? "bg-primary-900/40 text-primary-200" : "bg-primary-100 text-primary-800"])
                        }, toDisplayString(config.provider_type), 3)) : createCommentVNode("", true),
                        createBaseVNode("span", {
                          class: normalizeClass(["text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium whitespace-nowrap", unref(getBadgeClass)(config.storage_type, unref(darkMode))])
                        }, toDisplayString(formatStorageTypeLabel(config.storage_type)), 3)
                      ])
                    ], 2),
                    createBaseVNode("div", _hoisted_14, [
                      createBaseVNode("div", {
                        class: normalizeClass(unref(darkMode) ? "text-gray-300" : "text-gray-600")
                      }, [
                        getConfigSummaryRows(config).length ? (openBlock(), createElementBlock("div", _hoisted_15, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(getConfigSummaryRows(config), (row) => {
                            return openBlock(), createElementBlock("div", {
                              key: row.key,
                              class: "flex justify-between"
                            }, [
                              createBaseVNode("span", _hoisted_16, toDisplayString(row.label) + ":", 1),
                              row.key === "endpoint_url" ? (openBlock(), createElementBlock("span", {
                                key: 0,
                                class: "truncate ml-2 max-w-[60%] text-right",
                                title: row.value
                              }, toDisplayString(row.value), 9, _hoisted_17)) : (openBlock(), createElementBlock("span", _hoisted_18, toDisplayString(row.value), 1))
                            ]);
                          }), 128))
                        ])) : createCommentVNode("", true),
                        createBaseVNode("div", {
                          class: normalizeClass(["grid grid-cols-1 gap-2 text-sm mt-2 pt-2 border-t", unref(darkMode) ? "border-gray-600" : "border-gray-200"])
                        }, [
                          createBaseVNode("div", _hoisted_19, [
                            _cache[17] || (_cache[17] = createBaseVNode("span", { class: "font-medium" }, "API密钥可见:", -1)),
                            createBaseVNode("span", _hoisted_20, [
                              config.is_public ? (openBlock(), createBlock(unref(IconCheckCircle), {
                                key: 0,
                                class: "h-4 w-4 mr-1 text-green-500"
                              })) : (openBlock(), createBlock(unref(IconXCircle), {
                                key: 1,
                                class: "h-4 w-4 mr-1 text-gray-400"
                              })),
                              createTextVNode(" " + toDisplayString(config.is_public ? "允许" : "禁止"), 1)
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_21, [
                            _cache[18] || (_cache[18] = createBaseVNode("span", { class: "font-medium" }, "上次使用:", -1)),
                            createBaseVNode("span", null, toDisplayString(config.last_used ? formatDate(config.last_used) : "从未使用"), 1)
                          ]),
                          createBaseVNode("div", _hoisted_22, [
                            _cache[19] || (_cache[19] = createBaseVNode("span", { class: "font-medium" }, "创建时间:", -1)),
                            createBaseVNode("span", null, toDisplayString(formatDate(config.created_at)), 1)
                          ])
                        ], 2),
                        unref(testResults)[config.id] && !unref(testResults)[config.id].loading ? (openBlock(), createElementBlock("div", _hoisted_23, [
                          createBaseVNode("div", {
                            class: normalizeClass(["p-3 rounded-lg border flex items-start gap-2.5 transition-all", [
                              unref(testResults)[config.id].success ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/50" : unref(testResults)[config.id].partialSuccess ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700/50" : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700/50"
                            ]])
                          }, [
                            unref(testResults)[config.id].success ? (openBlock(), createBlock(unref(IconCheckCircle), {
                              key: 0,
                              class: "h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5"
                            })) : unref(testResults)[config.id].partialSuccess ? (openBlock(), createBlock(unref(IconExclamationSolid), {
                              key: 1,
                              class: "h-5 w-5 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5"
                            })) : (openBlock(), createBlock(unref(IconXCircle), {
                              key: 2,
                              class: "h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5"
                            })),
                            createBaseVNode("div", _hoisted_24, [
                              createBaseVNode("div", {
                                class: normalizeClass(["font-semibold text-sm", [
                                  unref(testResults)[config.id].success ? "text-green-700 dark:text-green-300" : unref(testResults)[config.id].partialSuccess ? "text-amber-700 dark:text-amber-300" : "text-red-700 dark:text-red-300"
                                ]])
                              }, toDisplayString(unref(testResults)[config.id].message), 3),
                              unref(testResults)[config.id].details ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: normalizeClass(["mt-1.5 text-xs whitespace-pre-line leading-relaxed", [
                                  unref(testResults)[config.id].success ? "text-green-600 dark:text-green-400/80" : unref(testResults)[config.id].partialSuccess ? "text-amber-600 dark:text-amber-400/80" : "text-red-600 dark:text-red-400/80"
                                ]])
                              }, toDisplayString(unref(testResults)[config.id].details), 3)) : createCommentVNode("", true),
                              unref(testResults)[config.id].report ? (openBlock(), createElementBlock("button", {
                                key: 1,
                                onClick: ($event) => unref(showTestDetailsModal)(config.id),
                                class: normalizeClass(["mt-2 inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded transition-colors", [
                                  unref(testResults)[config.id].success ? "text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-800/30 hover:bg-green-200 dark:hover:bg-green-800/50" : unref(testResults)[config.id].partialSuccess ? "text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-800/30 hover:bg-amber-200 dark:hover:bg-amber-800/50" : "text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-800/30 hover:bg-red-200 dark:hover:bg-red-800/50"
                                ]])
                              }, [
                                createVNode(unref(IconChevronRight), { class: "h-3 w-3" }),
                                _cache[20] || (_cache[20] = createTextVNode(" 查看详细信息 ", -1))
                              ], 10, _hoisted_25)) : createCommentVNode("", true)
                            ])
                          ], 2)
                        ])) : createCommentVNode("", true)
                      ], 2),
                      createBaseVNode("div", _hoisted_26, [
                        !config.is_default ? (openBlock(), createElementBlock("button", {
                          key: 0,
                          onClick: ($event) => unref(handleSetDefaultConfig)(config.id),
                          disabled: unref(isConfigSettingDefault)(config.id),
                          class: normalizeClass(["flex items-center px-3 py-1.5 rounded text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed", unref(darkMode) ? "bg-primary-600 hover:bg-primary-700 text-white" : "bg-primary-100 hover:bg-primary-200 text-primary-800"])
                        }, [
                          unref(isConfigSettingDefault)(config.id) ? (openBlock(), createBlock(unref(IconRefresh), {
                            key: 0,
                            class: "animate-spin h-4 w-4 mr-1.5"
                          })) : (openBlock(), createBlock(unref(IconCheck), {
                            key: 1,
                            class: "h-4 w-4 mr-1.5"
                          })),
                          createTextVNode(" " + toDisplayString(unref(isConfigSettingDefault)(config.id) ? "设置中..." : "设为默认"), 1)
                        ], 10, _hoisted_27)) : createCommentVNode("", true),
                        createBaseVNode("button", {
                          onClick: ($event) => unref(testConnection)(config.id),
                          class: normalizeClass([
                            "flex items-center px-3 py-1.5 rounded text-sm font-medium transition",
                            unref(testResults)[config.id]?.loading ? "opacity-50 cursor-wait" : unref(darkMode) ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                          ]),
                          disabled: unref(testResults)[config.id]?.loading
                        }, [
                          unref(testResults)[config.id]?.loading ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                            createVNode(unref(IconRefresh), { class: "animate-spin h-4 w-4 mr-1.5" }),
                            _cache[21] || (_cache[21] = createTextVNode(" 测试中... ", -1))
                          ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                            createVNode(unref(IconShieldCheck), { class: "h-4 w-4 mr-1.5" }),
                            _cache[22] || (_cache[22] = createTextVNode(" 测试连接 ", -1))
                          ], 64))
                        ], 10, _hoisted_28),
                        createBaseVNode("button", {
                          onClick: ($event) => unref(editConfig)(config),
                          class: normalizeClass(["flex items-center px-3 py-1.5 rounded text-sm font-medium transition", unref(darkMode) ? "bg-gray-600 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"])
                        }, [
                          createVNode(unref(IconRename), { class: "h-4 w-4 mr-1.5" }),
                          _cache[23] || (_cache[23] = createTextVNode(" 编辑 ", -1))
                        ], 10, _hoisted_29),
                        createBaseVNode("button", {
                          onClick: ($event) => unref(handleDeleteConfig)(config.id),
                          disabled: unref(isConfigDeleting)(config.id),
                          class: normalizeClass(["flex items-center px-3 py-1.5 rounded text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed", unref(darkMode) ? "bg-red-600 hover:bg-red-700 text-white" : "bg-red-100 hover:bg-red-200 text-red-800"])
                        }, [
                          unref(isConfigDeleting)(config.id) ? (openBlock(), createBlock(unref(IconRefresh), {
                            key: 0,
                            class: "animate-spin h-4 w-4 mr-1.5"
                          })) : (openBlock(), createBlock(unref(IconDelete), {
                            key: 1,
                            class: "h-4 w-4 mr-1.5"
                          })),
                          createTextVNode(" " + toDisplayString(unref(isConfigDeleting)(config.id) ? "删除中..." : "删除"), 1)
                        ], 10, _hoisted_30)
                      ])
                    ])
                  ], 2);
                }), 128))
              ]),
              createBaseVNode("div", _hoisted_31, [
                createVNode(_sfc_main$2, {
                  "dark-mode": unref(darkMode),
                  pagination: unref(pagination),
                  "page-size-options": unref(pageSizeOptions),
                  mode: "page",
                  onPageChanged: unref(handlePageChange),
                  onLimitChanged: unref(handleLimitChange)
                }, null, 8, ["dark-mode", "pagination", "page-size-options", "onPageChanged", "onLimitChanged"])
              ])
            ])) : createCommentVNode("", true),
            !hasFilteredResult.value ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(["bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center text-sm", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
            }, _cache[24] || (_cache[24] = [
              createBaseVNode("p", null, "没有符合当前筛选条件的存储配置。", -1)
            ]), 2)) : createCommentVNode("", true)
          ], 64)) : !unref(loading) ? (openBlock(), createElementBlock("div", {
            key: 2,
            class: normalizeClass(["rounded-lg p-6 text-center transition-colors duration-200 flex-1 flex flex-col justify-center items-center bg-white dark:bg-gray-800 shadow-md", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
          }, [
            createVNode(unref(IconCloud), { class: "mx-auto h-16 w-16 mb-4 text-gray-400" }),
            createBaseVNode("h3", {
              class: normalizeClass(["text-lg font-medium mb-2", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
            }, "尚未配置任何存储", 2),
            _cache[26] || (_cache[26] = createBaseVNode("p", { class: "mb-5 text-sm max-w-md" }, "添加您的第一个存储配置，支持多种对象存储或 WebDAV 服务。", -1)),
            createBaseVNode("button", {
              onClick: _cache[4] || (_cache[4] = (...args) => unref(addNewConfig) && unref(addNewConfig)(...args)),
              class: "px-4 py-2 rounded-md bg-primary-500 hover:bg-primary-600 text-white font-medium transition inline-flex items-center"
            }, [
              createVNode(unref(IconFolderPlus), { class: "h-5 w-5 mr-1.5" }),
              _cache[25] || (_cache[25] = createTextVNode(" 添加配置 ", -1))
            ])
          ], 2)) : createCommentVNode("", true)
        ]),
        unref(showAddForm) || unref(showEditForm) ? (openBlock(), createBlock(_sfc_main$1, {
          key: 1,
          "dark-mode": unref(darkMode),
          config: unref(currentConfig),
          "is-edit": unref(showEditForm),
          onClose: _cache[5] || (_cache[5] = ($event) => {
            showAddForm.value = false;
            showEditForm.value = false;
          }),
          onSuccess: unref(handleFormSuccess)
        }, null, 8, ["dark-mode", "config", "is-edit", "onSuccess"])) : createCommentVNode("", true),
        unref(showTestDetails) && unref(selectedTestResult) ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50 overflow-y-auto",
          onClick: _cache[10] || (_cache[10] = ($event) => showTestDetails.value = false)
        }, [
          createBaseVNode("div", {
            class: "bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg overflow-hidden",
            onClick: _cache[9] || (_cache[9] = withModifiers(() => {
            }, ["stop"]))
          }, [
            createBaseVNode("div", {
              class: normalizeClass(["px-4 py-3 border-b flex justify-between items-center", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
            }, [
              createBaseVNode("h3", {
                class: normalizeClass(["text-base sm:text-lg font-medium", unref(darkMode) ? "text-white" : "text-gray-900"])
              }, "存储连接测试结果", 2),
              createBaseVNode("button", {
                onClick: _cache[6] || (_cache[6] = ($event) => showTestDetails.value = false),
                class: "text-gray-400 hover:text-gray-500"
              }, [
                createVNode(unref(IconClose), { class: "h-5 w-5" })
              ])
            ], 2),
            createBaseVNode("div", _hoisted_32, [
              createBaseVNode("div", {
                class: normalizeClass(["mb-4 p-3 rounded-lg border flex items-start gap-2.5", [
                  unref(selectedTestResult).success ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50" : unref(selectedTestResult).partialSuccess ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50" : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50"
                ]])
              }, [
                unref(selectedTestResult).success ? (openBlock(), createBlock(unref(IconCheckCircle), {
                  key: 0,
                  class: "h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5"
                })) : unref(selectedTestResult).partialSuccess ? (openBlock(), createBlock(unref(IconExclamationSolid), {
                  key: 1,
                  class: "h-5 w-5 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5"
                })) : (openBlock(), createBlock(unref(IconXCircle), {
                  key: 2,
                  class: "h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5"
                })),
                createBaseVNode("div", _hoisted_33, [
                  createBaseVNode("div", {
                    class: normalizeClass(["font-semibold", [
                      unref(selectedTestResult).success ? "text-green-700 dark:text-green-300" : unref(selectedTestResult).partialSuccess ? "text-amber-700 dark:text-amber-300" : "text-red-700 dark:text-red-300"
                    ]])
                  }, toDisplayString(unref(selectedTestResult).message), 3),
                  unref(selectedTestResult).details ? (openBlock(), createElementBlock("div", _hoisted_34, toDisplayString(unref(selectedTestResult).details), 1)) : createCommentVNode("", true)
                ])
              ], 2),
              createBaseVNode("div", _hoisted_35, [
                createBaseVNode("button", {
                  onClick: _cache[7] || (_cache[7] = ($event) => showDetailedResults.value = !unref(showDetailedResults)),
                  class: normalizeClass(["text-sm flex items-center gap-1 px-2 py-1.5 rounded transition-colors", unref(darkMode) ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"])
                }, [
                  createVNode(unref(IconChevronRight), {
                    class: normalizeClass(["h-4 w-4 transition-transform duration-200", unref(showDetailedResults) ? "rotate-90" : ""])
                  }, null, 8, ["class"]),
                  createTextVNode(" " + toDisplayString(unref(showDetailedResults) ? "隐藏详细结果" : "显示详细结果") + " ", 1),
                  unref(selectedTestResult).report?.checks?.length ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: normalizeClass(["text-xs px-1.5 py-0.5 rounded-full ml-1", unref(darkMode) ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-500"])
                  }, toDisplayString(unref(selectedTestResult).report.checks.length), 3)) : createCommentVNode("", true)
                ], 2)
              ]),
              unref(showDetailedResults) && unref(selectedTestResult).report ? (openBlock(), createElementBlock("div", _hoisted_36, [
                unref(selectedTestResult).report?.info ? (openBlock(), createElementBlock("div", _hoisted_37, [
                  _cache[27] || (_cache[27] = createBaseVNode("h4", { class: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" }, "连接信息", -1)),
                  createBaseVNode("div", _hoisted_38, [
                    createBaseVNode("div", _hoisted_39, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(selectedTestResult).report.info, (value, key) => {
                        return openBlock(), createElementBlock("div", {
                          key,
                          class: "flex flex-col"
                        }, [
                          createBaseVNode("span", _hoisted_40, toDisplayString(formatLabel(String(key))), 1),
                          isPrimitiveValue(value) ? (openBlock(), createElementBlock("span", _hoisted_41, toDisplayString(value == null || value === "" ? "未设置" : String(value)), 1)) : (openBlock(), createElementBlock("pre", _hoisted_42, toDisplayString(formatJson(value)), 1))
                        ]);
                      }), 128))
                    ])
                  ])
                ])) : createCommentVNode("", true),
                unref(selectedTestResult).report?.checks?.length ? (openBlock(), createElementBlock("div", _hoisted_43, [
                  _cache[28] || (_cache[28] = createBaseVNode("h4", { class: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" }, "检查项", -1)),
                  createBaseVNode("div", _hoisted_44, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(selectedTestResult).report.checks, (check, idx) => {
                      return openBlock(), createElementBlock("div", {
                        key: check.key || idx,
                        class: "flex items-start gap-2"
                      }, [
                        check.success && !check.skipped ? (openBlock(), createBlock(unref(IconCheck), {
                          key: 0,
                          class: "h-4 w-4 text-green-500 flex-shrink-0 mt-0.5"
                        })) : !check.success && !check.skipped ? (openBlock(), createBlock(unref(IconClose), {
                          key: 1,
                          class: "h-4 w-4 text-red-500 flex-shrink-0 mt-0.5"
                        })) : (openBlock(), createElementBlock("span", _hoisted_45, "—")),
                        createBaseVNode("div", _hoisted_46, [
                          createBaseVNode("div", _hoisted_47, [
                            createBaseVNode("span", {
                              class: normalizeClass(["font-medium text-sm", [
                                check.skipped ? "text-gray-500 dark:text-gray-400" : check.success ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
                              ]])
                            }, toDisplayString(check.label || check.key || `检查项${idx + 1}`), 3),
                            check.skipped ? (openBlock(), createElementBlock("span", _hoisted_48, " (已跳过) ")) : createCommentVNode("", true)
                          ]),
                          check.note ? (openBlock(), createElementBlock("div", _hoisted_49, toDisplayString(check.note), 1)) : createCommentVNode("", true),
                          check.error ? (openBlock(), createElementBlock("div", _hoisted_50, [
                            createBaseVNode("div", _hoisted_51, toDisplayString(check.error), 1)
                          ])) : createCommentVNode("", true),
                          Array.isArray(check.items) && check.items.length ? (openBlock(), createElementBlock("div", _hoisted_52, [
                            createBaseVNode("div", _hoisted_53, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(check.items, (item) => {
                                return openBlock(), createElementBlock(Fragment, {
                                  key: item.key || item.label
                                }, [
                                  formatDetailValue(item.value, item.key) !== null ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                    createBaseVNode("span", _hoisted_54, toDisplayString(item.label || formatLabel(String(item.key || ""))), 1),
                                    createBaseVNode("span", _hoisted_55, toDisplayString(formatDetailValue(item.value, item.key)), 1)
                                  ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                    createBaseVNode("span", _hoisted_56, toDisplayString(item.label || formatLabel(String(item.key || ""))), 1),
                                    createBaseVNode("pre", _hoisted_57, toDisplayString(formatJson(item.value)), 1)
                                  ], 64))
                                ], 64);
                              }), 128))
                            ])
                          ])) : check.details && typeof check.details === "object" && Object.keys(check.details).length ? (openBlock(), createElementBlock("div", _hoisted_58, [
                            createBaseVNode("div", _hoisted_59, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(formatCheckDetails(check.details, unref(selectedTestResult)?.report?.storageType), (item) => {
                                return openBlock(), createElementBlock(Fragment, {
                                  key: item.key
                                }, [
                                  formatDetailValue(item.value, item.key) !== null ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                    createBaseVNode("span", _hoisted_60, toDisplayString(item.label), 1),
                                    createBaseVNode("span", _hoisted_61, toDisplayString(formatDetailValue(item.value, item.key)), 1)
                                  ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                    createBaseVNode("span", _hoisted_62, toDisplayString(item.label), 1),
                                    createBaseVNode("pre", _hoisted_63, toDisplayString(formatJson(item.value)), 1)
                                  ], 64))
                                ], 64);
                              }), 128))
                            ])
                          ])) : createCommentVNode("", true)
                        ])
                      ]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true),
                unref(selectedTestResult).report?.diagnostics ? (openBlock(), createElementBlock("div", _hoisted_64, [
                  _cache[29] || (_cache[29] = createBaseVNode("h4", { class: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center" }, [
                    createTextVNode(" 诊断信息 "),
                    createBaseVNode("span", { class: "ml-1.5 text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400" }, "辅助")
                  ], -1)),
                  createBaseVNode("div", _hoisted_65, [
                    createBaseVNode("pre", _hoisted_66, toDisplayString(formatJson(unref(selectedTestResult).report.diagnostics)), 1)
                  ])
                ])) : createCommentVNode("", true),
                unref(selectedTestResult).report?.timing?.durationMs != null ? (openBlock(), createElementBlock("div", _hoisted_67, [
                  _cache[30] || (_cache[30] = createBaseVNode("h4", { class: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" }, "耗时", -1)),
                  createBaseVNode("div", _hoisted_68, toDisplayString(unref(selectedTestResult).report.timing.durationMs) + "ms ", 1)
                ])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true),
              unref(showDetailedResults) && !unref(selectedTestResult).report ? (openBlock(), createElementBlock("div", _hoisted_69, _cache[31] || (_cache[31] = [
                createBaseVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, " 后端没有返回详细报告（report），只能显示上面的摘要信息。 ", -1)
              ]))) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_70, [
              createBaseVNode("button", {
                onClick: _cache[8] || (_cache[8] = ($event) => showTestDetails.value = false),
                class: "px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-sm"
              }, " 关闭 ")
            ])
          ])
        ])) : createCommentVNode("", true),
        createVNode(_sfc_main$3, mergeProps(unref(dialogState), {
          onConfirm: unref(handleConfirm),
          onCancel: unref(handleCancel)
        }), null, 16, ["onConfirm", "onCancel"])
      ]);
    };
  }
};
const StorageConfigView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7e57d13f"]]);
export {
  StorageConfigView as default
};
