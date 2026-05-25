import { e as useI18n, c as createLogger, f as useAuthStore, g as ref, F as computed, w as watch, o as onMounted, j as createElementBlock, k as openBlock, l as createBaseVNode, n as normalizeClass, t as toDisplayString, z as createVNode, y as unref, G as IconClose, p as createCommentVNode, J as IconRefresh, K as Fragment, m as withModifiers, L as renderList, M as createBlock, A as createTextVNode, q as withDirectives, v as vModelText, ae as vModelSelect, x as vModelCheckbox, aE as withCtx, aF as Transition, E as api, aK as _export_sfc, ac as useThemeMode, bd as IconFolderPlus, bb as IconClock, be as isRef, V as IconSearch, by as IconArchive, bh as IconRename, aB as IconXCircle, aA as IconCheckCircle, b7 as IconDelete, b5 as IconFolder, ak as IconInformationCircle, bz as IconGlobeAlt, af as IconShieldCheck, bA as IconCalculator, bB as IconCalendar, B as IconUser, bg as IconEye, ar as mergeProps } from "./index-BQxzU9F1.js";
import { useAdminMountService } from "./mountService-B4-YQ1h1.js";
import { useAdminStorageConfigService } from "./storageConfigService-CIShtBVl.js";
import { u as useAdminSystemService } from "./systemService-BJc_isGU.js";
import { _ as _sfc_main$3 } from "./CommonPagination-WikHSq_I.js";
import { u as useConfirmDialog, _ as _sfc_main$4, c as createConfirmFn } from "./useConfirmDialog-c5dcTgIB.js";
import { _ as _sfc_main$2 } from "./ViewModeToggle-DuPEIoIY.js";
import { u as useAdminBase } from "./useAdminBase-CxkodUK-.js";
import { u as useStorageConfigsStore } from "./storageConfigsStore-DUFoycii.js";
import { c as formatDateTime, b as formatDateTimeWithSeconds } from "./timeUtils-D81jJILb.js";
import { u as useAdminApiKeyService } from "./apiKeyService-BXEkg81t.js";
import { u as useStorageTypePresentation } from "./useStorageTypePresentation-C9r7i_aK.js";
function useMountManagement(options = {}) {
  const { confirmFn } = options;
  if (!confirmFn) {
    throw new Error("useMountManagement 必须传入 confirmFn（请在 View 里用 useConfirmDialog + createConfirmFn 创建）");
  }
  const base = useAdminBase("mount", {
    viewMode: {
      storageKey: "mount-view-mode",
      defaultMode: "grid"
    }
  });
  const { getMountsList, updateMount, createMount, deleteMount } = useAdminMountService();
  const { getAllApiKeys } = useAdminApiKeyService();
  const { t } = useI18n();
  const log = createLogger("MountManagement");
  const authStore = useAuthStore();
  const mounts = ref([]);
  const storageConfigsStore = useStorageConfigsStore();
  const storageConfigs = computed(() => storageConfigsStore.sortedConfigs);
  const storageConfigsLoading = computed(() => storageConfigsStore.isLoading);
  const apiKeyNames = ref({});
  const showForm = ref(false);
  const currentMount = ref(null);
  const searchQuery = ref("");
  const togglingMountIds = ref(/* @__PURE__ */ new Set());
  const deletingMountIds = ref(/* @__PURE__ */ new Set());
  const { getBadgeClass, ensureLoaded: ensureStorageTypesLoaded } = useStorageTypePresentation();
  const { viewMode, switchViewMode: toggleViewMode } = base;
  const pageSizeOptions = [6, 12, 24, 48, 96];
  if (base.pagination.limit === 20) {
    base.pagination.limit = pageSizeOptions[0];
  }
  const isAdmin = computed(() => authStore.isAdmin);
  const isApiKeyUser = computed(() => authStore.authType === "apikey" && authStore.hasMountPermission);
  const isAuthorized = computed(() => isAdmin.value || isApiKeyUser.value);
  const apiUpdateMount = (id, mountData) => {
    if (!isAdmin.value) {
      throw new Error("API密钥用户无权限更新挂载点");
    }
    return updateMount(id, mountData);
  };
  const apiDeleteMount = (id) => {
    if (!isAdmin.value) {
      throw new Error("API密钥用户无权限删除挂载点");
    }
    return deleteMount(id);
  };
  const filteredMounts = computed(() => {
    if (!searchQuery.value) {
      return mounts.value;
    }
    const query = searchQuery.value.toLowerCase();
    return mounts.value.filter(
      (mount) => mount.name.toLowerCase().includes(query) || mount.mount_path.toLowerCase().includes(query) || mount.storage_type.toLowerCase().includes(query) || mount.remark && mount.remark.toLowerCase().includes(query)
    );
  });
  const updateMountPagination = () => {
    base.pagination.total = filteredMounts.value.length;
    base.pagination.hasMore = base.pagination.offset + base.pagination.limit < base.pagination.total;
  };
  watch(
    filteredMounts,
    () => {
      updateMountPagination();
    },
    { immediate: true }
  );
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return formatDateTimeWithSeconds(dateString);
  };
  const formatDateOnly = (dateString) => {
    if (!dateString) return "-";
    return formatDateTime(dateString, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  };
  const loadStorageConfigs = async (options2 = {}) => {
    try {
      if (options2.force) {
        await storageConfigsStore.refreshConfigs();
      } else {
        await storageConfigsStore.loadConfigs();
      }
    } catch (err) {
      log.error("加载存储配置列表错误:", err);
    }
  };
  const getStorageConfigById = (configId) => {
    return storageConfigsStore.getConfigById(configId);
  };
  const loadApiKeyNames = async () => {
    try {
      if (isAdmin.value) {
        const keys = await getAllApiKeys();
        const keyMap = {};
        (Array.isArray(keys) ? keys : []).forEach((key) => {
          keyMap[key.id] = key.name;
        });
        apiKeyNames.value = keyMap;
      } else {
        const keyInfo = authStore.apiKeyInfo;
        if (keyInfo && keyInfo.id) {
          const keyMap = {};
          keyMap[keyInfo.id] = keyInfo.name || t("admin.mount.currentApiKey");
          apiKeyNames.value = keyMap;
        }
      }
    } catch (err) {
      log.error("加载API密钥列表错误:", err);
    }
  };
  const loadMounts = async (options2 = {}) => {
    const { silent = false } = options2;
    if (silent) {
      try {
        const data = await getMountsList();
        mounts.value = Array.isArray(data) ? data : [];
        if (mounts.value.length > 0) {
          base.updateLastRefreshTime();
        }
        updateMountPagination();
        if (!storageConfigs.value.length) {
          await loadStorageConfigs();
        }
        const needsApiKeys = mounts.value.some(
          (mount) => mount.created_by && (mount.created_by.startsWith("apikey:") || /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(mount.created_by))
        );
        if (needsApiKeys) {
          await loadApiKeyNames();
        }
      } catch (err) {
        log.error("静默加载挂载点列表失败:", err);
      }
      return;
    }
    return await base.withLoading(async () => {
      try {
        const data = await getMountsList();
        mounts.value = Array.isArray(data) ? data : [];
        if (mounts.value.length > 0) {
          base.updateLastRefreshTime();
        }
        updateMountPagination();
        if (!storageConfigs.value.length) {
          await loadStorageConfigs();
        }
        const needsApiKeys = mounts.value.some(
          (mount) => mount.created_by && (mount.created_by.startsWith("apikey:") || /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(mount.created_by))
        );
        if (needsApiKeys) {
          await loadApiKeyNames();
        }
      } catch (err) {
        log.error("加载挂载点列表错误:", err);
        base.showError(err.message || t("admin.mount.error.loadFailed"));
        mounts.value = [];
      }
    });
  };
  const handleOffsetChange = (newOffset) => {
    base.handlePaginationChange(newOffset, "offset");
  };
  const handleLimitChange = (newLimit) => {
    base.changePageSize(newLimit);
    base.handlePaginationChange(0, "offset");
    updateMountPagination();
  };
  onMounted(() => {
    ensureStorageTypesLoaded();
  });
  const openCreateForm = () => {
    currentMount.value = null;
    showForm.value = true;
  };
  const openEditForm = (mount) => {
    currentMount.value = { ...mount };
    showForm.value = true;
  };
  const closeForm = () => {
    showForm.value = false;
    currentMount.value = null;
  };
  const handleFormSaveSuccess = (success = true, message = null) => {
    const wasEdit = !!currentMount.value;
    closeForm();
    if (success === false) {
      base.showError(message || t("admin.mount.error.updateFailed"));
      return;
    }
    base.showSuccess(
      message || (wasEdit ? t("admin.mount.success.updated") : t("admin.mount.success.created"))
    );
    loadMounts();
  };
  const confirmDelete = async (id) => {
    const confirmed = await confirmFn({
      title: t("common.dialogs.deleteTitle"),
      message: t("common.dialogs.deleteItem", { name: t("admin.mount.item", "此挂载点") }),
      confirmType: "danger"
    });
    if (!confirmed) {
      return;
    }
    deletingMountIds.value = /* @__PURE__ */ new Set([...deletingMountIds.value, id]);
    try {
      await apiDeleteMount(id);
      base.showSuccess(t("admin.mount.success.deleted"));
      await loadMounts({ silent: true });
    } catch (err) {
      log.error("删除挂载点错误:", err);
      base.showError(err.message || t("admin.mount.error.deleteFailed"));
    } finally {
      const newSet = new Set(deletingMountIds.value);
      newSet.delete(id);
      deletingMountIds.value = newSet;
    }
  };
  const toggleActive = async (mount) => {
    const action = mount.is_active ? t("admin.mount.actions.disable") : t("admin.mount.actions.enable");
    if (isApiKeyUser.value) {
      base.showError(t("admin.mount.error.apiKeyNoPermission"));
      return;
    }
    togglingMountIds.value = /* @__PURE__ */ new Set([...togglingMountIds.value, mount.id]);
    try {
      const updateData = {
        is_active: !mount.is_active
      };
      await apiUpdateMount(mount.id, updateData);
      base.showSuccess(mount.is_active ? t("admin.mount.success.disabled") : t("admin.mount.success.enabled"));
      await loadMounts({ silent: true });
    } catch (err) {
      log.error(`${action}挂载点错误:`, err);
      base.showError(err.message || (mount.is_active ? t("admin.mount.error.disableFailed") : t("admin.mount.error.enableFailed")));
    } finally {
      const newSet = new Set(togglingMountIds.value);
      newSet.delete(mount.id);
      togglingMountIds.value = newSet;
    }
  };
  const getStorageTypeClass = (storageType, darkModeValue = false) => {
    return getBadgeClass(storageType, darkModeValue);
  };
  const getStatusClass = (isActive, darkModeValue = false) => {
    if (isActive) {
      return darkModeValue ? "bg-green-700 text-green-100" : "bg-green-100 text-green-800";
    } else {
      return darkModeValue ? "bg-red-700 text-red-100" : "bg-red-100 text-red-800";
    }
  };
  const getCreatorType = (mount) => {
    if (!mount.created_by) {
      return "system";
    }
    if (mount.created_by === "admin") {
      return "admin";
    }
    if (typeof mount.created_by === "string" && mount.created_by.startsWith("apikey:")) {
      return "apikey";
    }
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(mount.created_by) && apiKeyNames.value && apiKeyNames.value[mount.created_by]) {
      return "apikey";
    }
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(mount.created_by)) {
      return "admin";
    }
    return "other";
  };
  const formatCreator = (mount) => {
    const creatorType = getCreatorType(mount);
    if (creatorType === "system") {
      return t("admin.mount.creators.system", "系统");
    }
    if (creatorType === "admin") {
      return t("admin.mount.creators.admin", "管理员");
    }
    if (creatorType === "apikey") {
      let keyId = mount.created_by;
      if (mount.created_by.startsWith("apikey:")) {
        keyId = mount.created_by.substring(7);
      }
      if (apiKeyNames.value && apiKeyNames.value[keyId]) {
        return `${t("admin.mount.creators.apiKey", "密钥")}：${apiKeyNames.value[keyId]}`;
      } else if (keyId.length > 10) {
        return `${t("admin.mount.creators.apiKey", "密钥")}：${keyId.substring(0, 5)}...`;
      } else {
        return `${t("admin.mount.creators.apiKey", "密钥")}：${keyId}`;
      }
    }
    return mount.created_by;
  };
  const getCreatorClass = (mount, darkModeValue = false) => {
    const creatorType = getCreatorType(mount);
    if (creatorType === "system") {
      return darkModeValue ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700";
    }
    if (creatorType === "admin") {
      return darkModeValue ? "bg-green-900/50 text-green-200 border border-green-800/50" : "bg-green-100 text-green-800 border border-green-200";
    }
    if (creatorType === "apikey") {
      return darkModeValue ? "bg-blue-900/50 text-blue-200 border border-blue-800/50" : "bg-blue-100 text-blue-800 border border-blue-200";
    }
    return darkModeValue ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700";
  };
  const getCreatorDisplayName = (createdBy) => {
    if (!createdBy) return t("admin.mount.info.unknownCreator");
    if (createdBy.startsWith("apikey:")) {
      const keyId = createdBy.replace("apikey:", "");
      return apiKeyNames.value[keyId] || t("admin.mount.info.unknownApiKey");
    }
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(createdBy)) {
      return apiKeyNames.value[createdBy] || t("admin.mount.info.unknownApiKey");
    }
    return t("admin.mount.info.admin");
  };
  const formatStorageType = (mount) => {
    if (!mount) return "-";
    if (mount.storage_config_id) {
      if (!storageConfigs.value.length && storageConfigsLoading.value) {
        return `${mount.storage_type || "-"} (加载中...)`;
      }
      const config = getStorageConfigById(mount.storage_config_id);
      if (config) {
        return storageConfigsStore.formatProviderLabel(config);
      }
      return `${mount.storage_type || "-"} (ID: ${mount.storage_config_id})`;
    }
    return storageConfigsStore.getStorageTypeLabel(mount.storage_type) || mount.storage_type || "-";
  };
  const isMountToggling = (mountId) => {
    return togglingMountIds.value.has(mountId);
  };
  const isMountDeleting = (mountId) => {
    return deletingMountIds.value.has(mountId);
  };
  return {
    // 继承基础功能
    ...base,
    // 挂载点管理特有状态
    mounts,
    storageConfigs,
    storageConfigsLoading,
    apiKeyNames,
    showForm,
    currentMount,
    searchQuery,
    filteredMounts,
    pageSizeOptions,
    viewMode,
    // 行级加载状态
    togglingMountIds,
    deletingMountIds,
    isMountToggling,
    isMountDeleting,
    // 权限状态
    isAdmin,
    isApiKeyUser,
    isAuthorized,
    // 挂载点管理方法
    loadMounts,
    loadStorageConfigs,
    loadApiKeyNames,
    handleOffsetChange,
    handleLimitChange,
    openCreateForm,
    openEditForm,
    closeForm,
    handleFormSaveSuccess,
    confirmDelete,
    toggleActive,
    toggleViewMode,
    // 工具方法
    formatDate,
    formatDateOnly,
    getStorageConfigById,
    updateMountPagination,
    getStorageTypeClass,
    getStatusClass,
    getCreatorType,
    formatCreator,
    getCreatorClass,
    getCreatorDisplayName,
    formatStorageType
  };
}
const _hoisted_1$1 = { class: "flex justify-between items-center" };
const _hoisted_2$1 = { class: "text-base sm:text-lg font-semibold" };
const _hoisted_3$1 = { class: "p-3 sm:p-6 space-y-2 sm:space-y-4 flex-1 overflow-y-auto" };
const _hoisted_4$1 = {
  key: 0,
  class: "flex justify-center items-center py-8"
};
const _hoisted_5$1 = {
  key: 0,
  class: "p-2 sm:p-3 rounded-md bg-red-100 border border-red-300 text-red-700 text-sm"
};
const _hoisted_6$1 = ["for"];
const _hoisted_7$1 = {
  key: 0,
  class: "text-red-500"
};
const _hoisted_8$1 = { class: "relative" };
const _hoisted_9$1 = {
  key: 0,
  class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
};
const _hoisted_10$1 = ["id", "onUpdate:modelValue", "onInput", "onBlur", "placeholder", "maxlength"];
const _hoisted_11$1 = {
  key: 0,
  class: "mt-1 text-sm text-red-500"
};
const _hoisted_12$1 = ["for"];
const _hoisted_13$1 = ["id", "onUpdate:modelValue", "rows", "placeholder"];
const _hoisted_14$1 = ["for"];
const _hoisted_15$1 = { class: "relative" };
const _hoisted_16$1 = ["id", "onUpdate:modelValue", "onInput", "onBlur", "placeholder", "min", "max"];
const _hoisted_17$1 = {
  key: 0,
  class: "mt-1 text-sm text-red-500"
};
const _hoisted_18$1 = ["for"];
const _hoisted_19$1 = {
  key: 0,
  class: "text-red-500"
};
const _hoisted_20$1 = ["id", "onUpdate:modelValue", "onChange", "onBlur", "disabled"];
const _hoisted_21$1 = { value: "" };
const _hoisted_22$1 = ["value"];
const _hoisted_23$1 = {
  key: 0,
  class: "mt-1 text-sm text-red-500"
};
const _hoisted_24$1 = {
  key: 3,
  class: "mt-1 text-xs text-yellow-600 dark:text-yellow-400"
};
const _hoisted_25$1 = {
  key: 4,
  class: "flex items-center"
};
const _hoisted_26$1 = ["id", "onUpdate:modelValue"];
const _hoisted_27$1 = { class: "ml-2 sm:ml-3" };
const _hoisted_28$1 = ["for"];
const _hoisted_29$1 = {
  key: 1,
  class: "grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4"
};
const _hoisted_30$1 = ["for"];
const _hoisted_31$1 = { class: "relative" };
const _hoisted_32$1 = ["id", "onUpdate:modelValue", "onInput", "onBlur", "placeholder", "min", "max"];
const _hoisted_33$1 = ["id", "onUpdate:modelValue", "onInput", "onBlur", "placeholder"];
const _hoisted_34$1 = {
  key: 0,
  class: "mt-1 text-sm text-red-500"
};
const _hoisted_35$1 = { class: "space-y-3" };
const _hoisted_36$1 = {
  key: 0,
  class: "flex items-center"
};
const _hoisted_37$1 = ["id", "onUpdate:modelValue"];
const _hoisted_38$1 = { class: "ml-2 sm:ml-3" };
const _hoisted_39$1 = ["for"];
const _hoisted_40$1 = { key: 1 };
const _hoisted_41$1 = ["for"];
const _hoisted_42$1 = { class: "relative" };
const _hoisted_43$1 = ["id", "onUpdate:modelValue", "disabled", "placeholder", "min", "max"];
const _hoisted_44$1 = ["disabled"];
const _hoisted_45$1 = ["disabled"];
const _sfc_main$1 = {
  __name: "MountForm",
  props: {
    darkMode: { type: Boolean, required: true },
    mount: { type: Object, default: null },
    userType: { type: String, default: "admin", validator: (v) => ["admin", "apikey"].includes(v) }
  },
  emits: ["close", "save-success"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const log = createLogger("MountForm");
    const { updateMount, createMount } = useAdminMountService();
    const { getStorageConfigs } = useAdminStorageConfigService();
    const { getGlobalSettings } = useAdminSystemService();
    const props = __props;
    const emit = __emit;
    const schema = ref(null);
    const storageConfigs = ref([]);
    const formData = ref({});
    const errors = ref({});
    const loading = ref(false);
    const submitting = ref(false);
    const formSubmitted = ref(false);
    const globalError = ref("");
    const globalProxySignAll = ref(false);
    const globalProxySignExpires = ref(0);
    const globalProxySignExpiresLabel = computed(() => {
      const v = Number(globalProxySignExpires.value);
      if (!v || Number.isNaN(v)) return t("admin.mount.form.proxySign.globalExpiresForever");
      return t("admin.mount.form.proxySign.globalExpiresSeconds", { seconds: v });
    });
    const isEditMode = computed(() => !!props.mount);
    const formTitle = computed(() => isEditMode.value ? t("admin.mount.editMount") : t("admin.mount.createMount"));
    computed(() => props.userType === "admin");
    const availableStorageTypes = computed(() => {
      const types = [...new Set(storageConfigs.value.map((c) => c.storage_type).filter(Boolean))];
      return types.map((type) => ({
        value: type,
        label: t(`admin.mount.form.storageTypes.${type}`, type)
      }));
    });
    const filteredStorageConfigs = computed(() => {
      if (!formData.value.storage_type) return storageConfigs.value;
      return storageConfigs.value.filter((c) => c.storage_type === formData.value.storage_type);
    });
    const selectedStorageConfig = computed(() => {
      if (!formData.value.storage_config_id) return null;
      return storageConfigs.value.find((c) => c.id === formData.value.storage_config_id) || null;
    });
    const availableWebdavPolicies = computed(() => {
      const cfg = selectedStorageConfig.value;
      const policies = Array.isArray(cfg?.webdav_supported_policies) ? cfg.webdav_supported_policies : null;
      if (policies && policies.length > 0) return policies;
      return ["native_proxy"];
    });
    const fieldGroups = computed(() => {
      if (!schema.value?.layout?.groups) return [];
      return schema.value.layout.groups.map((group) => ({
        ...group,
        title: group.titleKey ? t(group.titleKey) : group.id,
        // 解析布局项（支持 row/card/full 类型）
        layoutItems: parseLayoutItems(group)
      }));
    });
    const getFieldLabel = (field) => field.labelKey ? t(field.labelKey) : field.name;
    const getFieldPlaceholder = (field) => field.ui?.placeholderKey ? t(field.ui.placeholderKey) : "";
    const getFieldDescription = (field) => field.ui?.descriptionKey ? t(field.ui.descriptionKey) : "";
    const shouldShowDescription = (field) => {
      const alwaysShowDesc = ["mount_path", "webdav_policy", "enable_sign", "sign_expires", "web_proxy"];
      if (alwaysShowDesc.includes(field.name)) return true;
      if ((field.type === "string" || field.type === "select") && field.ui?.placeholderKey) {
        return false;
      }
      return !!field.ui?.descriptionKey;
    };
    const shouldShowField = (field) => {
      if (!field.dependsOn) return true;
      const { field: depField, value: depValue } = field.dependsOn;
      return formData.value[depField] === depValue;
    };
    const parseLayoutItems = (group) => {
      if (!group?.fields) return [];
      return group.fields.map((item) => {
        if (typeof item === "object" && item !== null) {
          if (item.row) {
            return { type: "row", fields: item.row };
          }
          if (item.card) {
            return { type: "card", ...item };
          }
        }
        if (typeof item === "string") {
          return { type: "full", field: item };
        }
        return null;
      }).filter(Boolean);
    };
    const shouldShowCard = (card) => {
      if (!card.dependsOn) return true;
      return formData.value[card.dependsOn.field] === card.dependsOn.value;
    };
    const isCardChildField = (fieldName, groups) => {
      if (!groups) return false;
      for (const group of groups) {
        if (!group.fields) continue;
        for (const item of group.fields) {
          if (typeof item === "object" && item?.card && item.fields?.includes(fieldName)) {
            return true;
          }
        }
      }
      return false;
    };
    const getFieldByName = (fieldName) => {
      return schema.value?.fields?.find((f) => f.name === fieldName) || null;
    };
    const getFieldOptions = (field) => {
      const dynamicOpts = field.ui?.dynamicOptions;
      if (field.name === "storage_type" || dynamicOpts === "storageTypes") {
        return availableStorageTypes.value;
      }
      if (field.name === "storage_config_id" || dynamicOpts === "storageConfigs") {
        return filteredStorageConfigs.value.map((c) => ({
          value: c.id,
          label: `${c.name} (${c.provider_type || c.storage_type})`
        }));
      }
      if (field.name === "webdav_policy" || dynamicOpts === "webdavPolicies") {
        return availableWebdavPolicies.value.map((p) => ({
          value: p,
          label: t(`admin.mount.form.webdavPolicyOptions.${p}`, p)
        }));
      }
      return [];
    };
    const isSelectDisabled = (field) => {
      if (loading.value) return true;
      if (field.name === "storage_config_id") {
        return !formData.value.storage_type || filteredStorageConfigs.value.length === 0;
      }
      if (field.name === "storage_type") {
        return availableStorageTypes.value.length === 0;
      }
      return false;
    };
    const validateField = (fieldName) => {
      const field = schema.value?.fields.find((f) => f.name === fieldName);
      if (!field) return true;
      const value = formData.value[fieldName];
      const newErrors = { ...errors.value };
      if (field.required) {
        const isEmpty = value === void 0 || value === null || String(value).trim() === "";
        if (isEmpty) {
          newErrors[fieldName] = t("admin.mount.validation.required", { field: getFieldLabel(field) });
          errors.value = newErrors;
          return false;
        }
      }
      const validation = field.validation;
      if (validation && value !== void 0 && value !== null && value !== "") {
        if (validation.maxLength && String(value).length > validation.maxLength) {
          newErrors[fieldName] = t("admin.mount.validation.maxLength", { max: validation.maxLength });
          errors.value = newErrors;
          return false;
        }
        if (validation.pattern) {
          const regex = new RegExp(validation.pattern);
          if (!regex.test(String(value))) {
            newErrors[fieldName] = validation.patternMessageKey ? t(validation.patternMessageKey) : t("admin.mount.validation.invalidFormat");
            errors.value = newErrors;
            return false;
          }
        }
        if (field.type === "number") {
          const numVal = Number(value);
          if (validation.min !== void 0 && numVal < validation.min) {
            newErrors[fieldName] = t("admin.mount.validation.min", { min: validation.min });
            errors.value = newErrors;
            return false;
          }
          if (validation.max !== void 0 && numVal > validation.max) {
            newErrors[fieldName] = t("admin.mount.validation.max", { max: validation.max });
            errors.value = newErrors;
            return false;
          }
        }
      }
      if (fieldName === "mount_path" && value) {
        const mountPath = String(value).trim();
        if (!mountPath.startsWith("/")) {
          newErrors[fieldName] = t("admin.mount.validation.mountPathFormat");
          errors.value = newErrors;
          return false;
        }
        if (mountPath === "/") {
          newErrors[fieldName] = t("admin.mount.validation.mountPathInvalid");
          errors.value = newErrors;
          return false;
        }
        const validPathRegex = /^\/(?:[A-Za-z0-9_\-\/]|[\u4e00-\u9fa5]|[\u0080-\uFFFF])+$/;
        if (!validPathRegex.test(mountPath)) {
          newErrors[fieldName] = t("admin.mount.validation.mountPathInvalid");
          errors.value = newErrors;
          return false;
        }
        const forbiddenPaths = ["/bin", "/etc", "/lib", "/root", "/sys", "/proc", "/dev"];
        for (const path of forbiddenPaths) {
          if (mountPath === path || mountPath.startsWith(`${path}/`)) {
            newErrors[fieldName] = t("admin.mount.validation.mountPathSystemReserved");
            errors.value = newErrors;
            return false;
          }
        }
      }
      delete newErrors[fieldName];
      errors.value = newErrors;
      return true;
    };
    const validateForm = () => {
      if (!schema.value?.fields) return false;
      let isValid = true;
      for (const field of schema.value.fields) {
        if (shouldShowField(field)) {
          if (!validateField(field.name)) {
            isValid = false;
          }
        }
      }
      if (!isValid) {
        globalError.value = t("common.required");
      } else {
        globalError.value = "";
      }
      return isValid;
    };
    const handleFieldChange = (fieldName) => {
      if (fieldName === "storage_type" && formData.value.storage_config_id) {
        const selectedConfig = storageConfigs.value.find((c) => c.id === formData.value.storage_config_id);
        if (selectedConfig && selectedConfig.storage_type !== formData.value.storage_type) {
          formData.value.storage_config_id = "";
        }
      }
      if (fieldName === "storage_config_id" && formData.value.storage_config_id) {
        const selectedConfig = storageConfigs.value.find((c) => c.id === formData.value.storage_config_id);
        if (selectedConfig?.storage_type) {
          formData.value.storage_type = selectedConfig.storage_type;
        }
      }
      if (formSubmitted.value || errors.value[fieldName]) {
        validateField(fieldName);
      }
    };
    const submitForm = async () => {
      formSubmitted.value = true;
      if (!validateForm()) return;
      submitting.value = true;
      globalError.value = "";
      try {
        const payload = { ...formData.value };
        if (payload.sort_order !== void 0) payload.sort_order = Number(payload.sort_order);
        if (payload.cache_ttl !== void 0) payload.cache_ttl = Number(payload.cache_ttl);
        if (payload.sign_expires !== void 0 && payload.sign_expires !== null && payload.sign_expires !== "") {
          payload.sign_expires = Number(payload.sign_expires);
        } else {
          payload.sign_expires = null;
        }
        if (props.userType === "apikey") {
          globalError.value = t("admin.mount.error.apiKeyCannotManage");
          return;
        }
        if (isEditMode.value) {
          await updateMount(props.mount.id, payload);
        } else {
          await createMount(payload);
        }
        emit("save-success");
      } catch (err) {
        log.error("保存挂载点错误:", err);
        globalError.value = err.message || t("admin.mount.error.saveFailed");
      } finally {
        submitting.value = false;
      }
    };
    const initFormData = () => {
      if (!schema.value?.fields) return;
      const data = {};
      for (const field of schema.value.fields) {
        if (props.mount && props.mount[field.name] !== void 0) {
          if (field.type === "boolean") {
            data[field.name] = !!props.mount[field.name];
          } else {
            data[field.name] = props.mount[field.name];
          }
        } else {
          data[field.name] = field.defaultValue !== void 0 ? field.defaultValue : field.type === "boolean" ? false : "";
        }
      }
      if (props.mount?.storage_config_id && !data.storage_type) {
        const selectedConfig = storageConfigs.value.find((c) => c.id === props.mount.storage_config_id);
        if (selectedConfig?.storage_type) {
          data.storage_type = selectedConfig.storage_type;
        }
      }
      formData.value = data;
    };
    const loadData = async () => {
      loading.value = true;
      try {
        const [schemaResp, configsResp, globalSettings] = await Promise.all([
          api.mount.getMountSchema(),
          getStorageConfigs({ page: 1, limit: 100 }),
          getGlobalSettings().catch(() => [])
        ]);
        schema.value = schemaResp?.data || schemaResp;
        storageConfigs.value = Array.isArray(configsResp?.items) ? configsResp.items : [];
        (Array.isArray(globalSettings) ? globalSettings : []).forEach((setting) => {
          if (setting?.key === "proxy_sign_all") {
            globalProxySignAll.value = setting.value === "true";
          }
          if (setting?.key === "proxy_sign_expires") {
            globalProxySignExpires.value = parseInt(setting.value, 10) || 0;
          }
        });
        initFormData();
      } catch (err) {
        log.error("加载数据错误:", err);
        globalError.value = err?.message || t("admin.mount.error.loadFailed");
      } finally {
        loading.value = false;
      }
    };
    const closeForm = () => emit("close");
    onMounted(loadData);
    watch(() => props.mount, () => {
      initFormData();
      formSubmitted.value = false;
      globalError.value = "";
      errors.value = {};
    }, { deep: true });
    watch([() => formData.value.storage_type, () => formData.value.storage_config_id], () => {
      const allowed = availableWebdavPolicies.value;
      if (formData.value.webdav_policy && !allowed.includes(formData.value.webdav_policy)) {
        formData.value.webdav_policy = allowed[0] || "native_proxy";
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 pt-20 sm:pt-4 bg-black bg-opacity-50 overflow-y-auto",
        onClick: withModifiers(closeForm, ["self"])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["w-full max-w-sm sm:max-w-lg rounded-lg shadow-xl overflow-hidden transition-colors max-h-[80vh] sm:max-h-[75vh] flex flex-col", __props.darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"]),
          onClick: _cache[0] || (_cache[0] = withModifiers(() => {
          }, ["stop"]))
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["px-3 sm:px-6 py-2 sm:py-4 border-b", __props.darkMode ? "border-gray-700" : "border-gray-200"])
          }, [
            createBaseVNode("div", _hoisted_1$1, [
              createBaseVNode("h3", _hoisted_2$1, toDisplayString(formTitle.value), 1),
              createBaseVNode("button", {
                onClick: closeForm,
                class: "rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              }, [
                createVNode(unref(IconClose), { size: "lg" })
              ])
            ])
          ], 2),
          createBaseVNode("div", _hoisted_3$1, [
            loading.value ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
              createVNode(unref(IconRefresh), {
                size: "xl",
                class: "animate-spin text-primary-500"
              })
            ])) : schema.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              globalError.value ? (openBlock(), createElementBlock("div", _hoisted_5$1, toDisplayString(globalError.value), 1)) : createCommentVNode("", true),
              createBaseVNode("form", {
                onSubmit: withModifiers(submitForm, ["prevent"]),
                class: "space-y-4"
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(fieldGroups.value, (group) => {
                  return openBlock(), createElementBlock("div", {
                    key: group.id,
                    class: "space-y-2"
                  }, [
                    group.titleKey ? (openBlock(), createElementBlock("h4", {
                      key: 0,
                      class: normalizeClass(["text-sm font-medium border-b pb-1 mt-2", __props.darkMode ? "text-gray-300 border-gray-600" : "text-gray-700 border-gray-200"])
                    }, toDisplayString(group.title), 3)) : createCommentVNode("", true),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(group.layoutItems, (layoutItem, idx) => {
                      return openBlock(), createElementBlock("div", {
                        key: `${group.id}-${idx}`,
                        class: "contents"
                      }, [
                        layoutItem.type === "full" ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList([getFieldByName(layoutItem.field)].filter((f) => f && shouldShowField(f) && !isCardChildField(f.name, schema.value?.layout?.groups)), (field) => {
                          return openBlock(), createElementBlock("div", {
                            key: field.name
                          }, [
                            field.type === "string" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                              createBaseVNode("label", {
                                for: field.name,
                                class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                              }, [
                                createTextVNode(toDisplayString(getFieldLabel(field)) + " ", 1),
                                field.required ? (openBlock(), createElementBlock("span", _hoisted_7$1, "*")) : createCommentVNode("", true)
                              ], 10, _hoisted_6$1),
                              createBaseVNode("div", _hoisted_8$1, [
                                field.ui?.prefix ? (openBlock(), createElementBlock("span", _hoisted_9$1, toDisplayString(field.ui.prefix), 1)) : createCommentVNode("", true),
                                withDirectives(createBaseVNode("input", {
                                  id: field.name,
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => formData.value[field.name] = $event,
                                  onInput: ($event) => handleFieldChange(field.name),
                                  onBlur: ($event) => validateField(field.name),
                                  placeholder: getFieldPlaceholder(field),
                                  maxlength: field.ui?.maxLength,
                                  class: normalizeClass(["block w-full px-3 py-1.5 sm:py-2 rounded-md text-sm transition-colors border", [__props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500", errors.value[field.name] ? "border-red-500" : "", field.ui?.prefix ? "pl-6" : ""]])
                                }, null, 42, _hoisted_10$1), [
                                  [vModelText, formData.value[field.name]]
                                ])
                              ]),
                              errors.value[field.name] ? (openBlock(), createElementBlock("p", _hoisted_11$1, toDisplayString(errors.value[field.name]), 1)) : createCommentVNode("", true),
                              shouldShowDescription(field) ? (openBlock(), createElementBlock("p", {
                                key: 1,
                                class: normalizeClass(["mt-0.5 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                              }, toDisplayString(getFieldDescription(field)), 3)) : createCommentVNode("", true)
                            ], 64)) : field.type === "textarea" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createBaseVNode("label", {
                                for: field.name,
                                class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                              }, toDisplayString(getFieldLabel(field)), 11, _hoisted_12$1),
                              withDirectives(createBaseVNode("textarea", {
                                id: field.name,
                                "onUpdate:modelValue": ($event) => formData.value[field.name] = $event,
                                rows: field.ui?.rows || 2,
                                placeholder: getFieldPlaceholder(field),
                                class: normalizeClass(["block w-full px-3 py-1.5 sm:py-2 rounded-md text-sm transition-colors border", __props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500"])
                              }, null, 10, _hoisted_13$1), [
                                [vModelText, formData.value[field.name]]
                              ])
                            ], 64)) : field.type === "number" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                              createBaseVNode("label", {
                                for: field.name,
                                class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                              }, toDisplayString(getFieldLabel(field)), 11, _hoisted_14$1),
                              createBaseVNode("div", _hoisted_15$1, [
                                withDirectives(createBaseVNode("input", {
                                  id: field.name,
                                  type: "number",
                                  "onUpdate:modelValue": ($event) => formData.value[field.name] = $event,
                                  onInput: ($event) => handleFieldChange(field.name),
                                  onBlur: ($event) => validateField(field.name),
                                  placeholder: getFieldPlaceholder(field),
                                  min: field.ui?.min,
                                  max: field.ui?.max,
                                  class: normalizeClass(["block w-full px-3 py-1.5 sm:py-2 rounded-md text-sm transition-colors border", [__props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500", errors.value[field.name] ? "border-red-500" : ""]])
                                }, null, 42, _hoisted_16$1), [
                                  [vModelText, formData.value[field.name]]
                                ]),
                                field.ui?.suffix ? (openBlock(), createElementBlock("span", {
                                  key: 0,
                                  class: normalizeClass(["absolute right-3 top-1/2 -translate-y-1/2 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                                }, toDisplayString(field.ui.suffix.startsWith("admin.") ? unref(t)(field.ui.suffix) : field.ui.suffix), 3)) : createCommentVNode("", true)
                              ]),
                              errors.value[field.name] ? (openBlock(), createElementBlock("p", _hoisted_17$1, toDisplayString(errors.value[field.name]), 1)) : createCommentVNode("", true),
                              shouldShowDescription(field) ? (openBlock(), createElementBlock("p", {
                                key: 1,
                                class: normalizeClass(["mt-0.5 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                              }, toDisplayString(getFieldDescription(field)), 3)) : createCommentVNode("", true)
                            ], 64)) : field.type === "select" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                              createBaseVNode("label", {
                                for: field.name,
                                class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                              }, [
                                createTextVNode(toDisplayString(getFieldLabel(field)) + " ", 1),
                                field.required ? (openBlock(), createElementBlock("span", _hoisted_19$1, "*")) : createCommentVNode("", true)
                              ], 10, _hoisted_18$1),
                              withDirectives(createBaseVNode("select", {
                                id: field.name,
                                "onUpdate:modelValue": ($event) => formData.value[field.name] = $event,
                                onChange: ($event) => handleFieldChange(field.name),
                                onBlur: ($event) => validateField(field.name),
                                disabled: isSelectDisabled(field),
                                class: normalizeClass(["block w-full px-3 py-1.5 sm:py-2 rounded-md text-sm transition-colors border", [__props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 text-gray-900", errors.value[field.name] ? "border-red-500" : ""]])
                              }, [
                                createBaseVNode("option", _hoisted_21$1, toDisplayString(getFieldPlaceholder(field) || unref(t)("common.pleaseSelect")), 1),
                                (openBlock(true), createElementBlock(Fragment, null, renderList(getFieldOptions(field), (opt) => {
                                  return openBlock(), createElementBlock("option", {
                                    key: opt.value,
                                    value: opt.value
                                  }, toDisplayString(opt.label), 9, _hoisted_22$1);
                                }), 128))
                              ], 42, _hoisted_20$1), [
                                [vModelSelect, formData.value[field.name]]
                              ]),
                              errors.value[field.name] ? (openBlock(), createElementBlock("p", _hoisted_23$1, toDisplayString(errors.value[field.name]), 1)) : createCommentVNode("", true),
                              shouldShowDescription(field) ? (openBlock(), createElementBlock("p", {
                                key: 1,
                                class: normalizeClass(["mt-0.5 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                              }, toDisplayString(getFieldDescription(field)), 3)) : createCommentVNode("", true),
                              field.name === "storage_config_id" && !formData.value.storage_type ? (openBlock(), createElementBlock("p", {
                                key: 2,
                                class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                              }, toDisplayString(unref(t)("admin.mount.form.selectStorageTypeFirst")), 3)) : createCommentVNode("", true),
                              field.name === "storage_config_id" && formData.value.storage_type && filteredStorageConfigs.value.length === 0 ? (openBlock(), createElementBlock("p", _hoisted_24$1, toDisplayString(unref(t)("admin.mount.form.noConfigsForType")), 1)) : createCommentVNode("", true)
                            ], 64)) : field.type === "boolean" ? (openBlock(), createElementBlock("div", _hoisted_25$1, [
                              withDirectives(createBaseVNode("input", {
                                id: field.name,
                                type: "checkbox",
                                "onUpdate:modelValue": ($event) => formData.value[field.name] = $event,
                                class: normalizeClass(["h-4 w-4 sm:h-5 sm:w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500", __props.darkMode ? "bg-gray-700 border-gray-600" : ""])
                              }, null, 10, _hoisted_26$1), [
                                [vModelCheckbox, formData.value[field.name]]
                              ]),
                              createBaseVNode("div", _hoisted_27$1, [
                                createBaseVNode("label", {
                                  for: field.name,
                                  class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                                }, toDisplayString(getFieldLabel(field)), 11, _hoisted_28$1),
                                shouldShowDescription(field) ? (openBlock(), createElementBlock("p", {
                                  key: 0,
                                  class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                                }, toDisplayString(getFieldDescription(field)), 3)) : createCommentVNode("", true)
                              ])
                            ])) : createCommentVNode("", true)
                          ]);
                        }), 128)) : layoutItem.type === "row" ? (openBlock(), createElementBlock("div", _hoisted_29$1, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(layoutItem.fields, (fieldName) => {
                            return openBlock(), createElementBlock("div", {
                              key: fieldName,
                              class: "contents"
                            }, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList([getFieldByName(fieldName)].filter((f) => f && shouldShowField(f)), (field) => {
                                return openBlock(), createElementBlock("div", {
                                  key: field.name
                                }, [
                                  createBaseVNode("label", {
                                    for: field.name,
                                    class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                                  }, toDisplayString(getFieldLabel(field)), 11, _hoisted_30$1),
                                  createBaseVNode("div", _hoisted_31$1, [
                                    field.type === "number" ? withDirectives((openBlock(), createElementBlock("input", {
                                      key: 0,
                                      id: field.name,
                                      type: "number",
                                      "onUpdate:modelValue": ($event) => formData.value[field.name] = $event,
                                      onInput: ($event) => handleFieldChange(field.name),
                                      onBlur: ($event) => validateField(field.name),
                                      placeholder: getFieldPlaceholder(field),
                                      min: field.ui?.min,
                                      max: field.ui?.max,
                                      class: normalizeClass(["block w-full px-3 py-1.5 sm:py-2 rounded-md text-sm transition-colors border", [__props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500", errors.value[field.name] ? "border-red-500" : ""]])
                                    }, null, 42, _hoisted_32$1)), [
                                      [vModelText, formData.value[field.name]]
                                    ]) : withDirectives((openBlock(), createElementBlock("input", {
                                      key: 1,
                                      id: field.name,
                                      type: "text",
                                      "onUpdate:modelValue": ($event) => formData.value[field.name] = $event,
                                      onInput: ($event) => handleFieldChange(field.name),
                                      onBlur: ($event) => validateField(field.name),
                                      placeholder: getFieldPlaceholder(field),
                                      class: normalizeClass(["block w-full px-3 py-1.5 sm:py-2 rounded-md text-sm transition-colors border", [__props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500", errors.value[field.name] ? "border-red-500" : ""]])
                                    }, null, 42, _hoisted_33$1)), [
                                      [vModelText, formData.value[field.name]]
                                    ]),
                                    field.ui?.suffix ? (openBlock(), createElementBlock("span", {
                                      key: 2,
                                      class: normalizeClass(["absolute right-3 top-1/2 -translate-y-1/2 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                                    }, toDisplayString(field.ui.suffix.startsWith("admin.") ? unref(t)(field.ui.suffix) : field.ui.suffix), 3)) : createCommentVNode("", true)
                                  ]),
                                  errors.value[field.name] ? (openBlock(), createElementBlock("p", _hoisted_34$1, toDisplayString(errors.value[field.name]), 1)) : createCommentVNode("", true),
                                  shouldShowDescription(field) ? (openBlock(), createElementBlock("p", {
                                    key: 1,
                                    class: normalizeClass(["mt-0.5 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                                  }, toDisplayString(getFieldDescription(field)), 3)) : createCommentVNode("", true)
                                ]);
                              }), 128))
                            ]);
                          }), 128))
                        ])) : layoutItem.type === "card" ? (openBlock(), createBlock(Transition, {
                          key: 2,
                          "enter-active-class": "transition-all duration-200 ease-out",
                          "enter-from-class": "opacity-0 -translate-y-1",
                          "enter-to-class": "opacity-100 translate-y-0",
                          "leave-active-class": "transition-all duration-150 ease-in",
                          "leave-from-class": "opacity-100 translate-y-0",
                          "leave-to-class": "opacity-0 -translate-y-1"
                        }, {
                          default: withCtx(() => [
                            shouldShowCard(layoutItem) ? (openBlock(), createElementBlock("div", {
                              key: 0,
                              class: normalizeClass(["mt-3 sm:mt-4 p-3 rounded-md border", __props.darkMode ? "bg-gray-800/50 border-gray-600" : "bg-gray-50 border-gray-200"])
                            }, [
                              layoutItem.titleKey ? (openBlock(), createElementBlock("h4", {
                                key: 0,
                                class: normalizeClass(["text-sm font-medium mb-3", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                              }, toDisplayString(unref(t)(layoutItem.titleKey)), 3)) : createCommentVNode("", true),
                              layoutItem.card === "proxy_sign" && globalProxySignAll.value ? (openBlock(), createElementBlock("p", {
                                key: 1,
                                class: normalizeClass(["text-xs mb-3", __props.darkMode ? "text-red-400" : "text-red-600"])
                              }, toDisplayString(unref(t)("admin.mount.form.proxySign.globalOverrideHint", { expires: globalProxySignExpiresLabel.value })), 3)) : createCommentVNode("", true),
                              createBaseVNode("div", _hoisted_35$1, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(layoutItem.fields, (cardFieldName) => {
                                  return openBlock(), createElementBlock("div", {
                                    key: cardFieldName,
                                    class: "contents"
                                  }, [
                                    (openBlock(true), createElementBlock(Fragment, null, renderList([getFieldByName(cardFieldName)].filter(Boolean), (cardField) => {
                                      return openBlock(), createElementBlock("div", {
                                        key: cardField.name
                                      }, [
                                        cardField.type === "boolean" ? (openBlock(), createElementBlock("div", _hoisted_36$1, [
                                          withDirectives(createBaseVNode("input", {
                                            id: cardField.name,
                                            type: "checkbox",
                                            "onUpdate:modelValue": ($event) => formData.value[cardField.name] = $event,
                                            class: normalizeClass(["h-4 w-4 sm:h-5 sm:w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500", __props.darkMode ? "bg-gray-700 border-gray-600" : ""])
                                          }, null, 10, _hoisted_37$1), [
                                            [vModelCheckbox, formData.value[cardField.name]]
                                          ]),
                                          createBaseVNode("div", _hoisted_38$1, [
                                            createBaseVNode("label", {
                                              for: cardField.name,
                                              class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                                            }, toDisplayString(getFieldLabel(cardField)), 11, _hoisted_39$1),
                                            shouldShowDescription(cardField) ? (openBlock(), createElementBlock("p", {
                                              key: 0,
                                              class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                                            }, toDisplayString(getFieldDescription(cardField)), 3)) : createCommentVNode("", true)
                                          ])
                                        ])) : cardField.type === "number" ? (openBlock(), createElementBlock("div", _hoisted_40$1, [
                                          createBaseVNode("label", {
                                            for: cardField.name,
                                            class: normalizeClass(["block text-sm font-medium mb-1", [
                                              __props.darkMode ? "text-gray-200" : "text-gray-700",
                                              cardField.name === "sign_expires" && !formData.value.enable_sign ? "opacity-50" : ""
                                            ]])
                                          }, toDisplayString(getFieldLabel(cardField)), 11, _hoisted_41$1),
                                          createBaseVNode("div", _hoisted_42$1, [
                                            withDirectives(createBaseVNode("input", {
                                              id: cardField.name,
                                              type: "number",
                                              "onUpdate:modelValue": ($event) => formData.value[cardField.name] = $event,
                                              disabled: cardField.name === "sign_expires" && !formData.value.enable_sign,
                                              placeholder: getFieldPlaceholder(cardField),
                                              min: cardField.ui?.min,
                                              max: cardField.ui?.max,
                                              class: normalizeClass(["block w-full px-3 py-1.5 sm:py-2 rounded-md text-sm transition-colors border", [
                                                __props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-gray-300 text-gray-900 placeholder-gray-500",
                                                cardField.name === "sign_expires" && !formData.value.enable_sign ? "opacity-50 cursor-not-allowed" : ""
                                              ]])
                                            }, null, 10, _hoisted_43$1), [
                                              [vModelText, formData.value[cardField.name]]
                                            ]),
                                            cardField.ui?.suffix ? (openBlock(), createElementBlock("span", {
                                              key: 0,
                                              class: normalizeClass(["absolute right-3 top-1/2 -translate-y-1/2 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                                            }, toDisplayString(cardField.ui.suffix.startsWith("admin.") ? unref(t)(cardField.ui.suffix) : cardField.ui.suffix), 3)) : createCommentVNode("", true)
                                          ]),
                                          shouldShowDescription(cardField) ? (openBlock(), createElementBlock("p", {
                                            key: 0,
                                            class: normalizeClass(["mt-0.5 text-xs", [
                                              __props.darkMode ? "text-gray-400" : "text-gray-500",
                                              cardField.name === "sign_expires" && !formData.value.enable_sign ? "opacity-50" : ""
                                            ]])
                                          }, toDisplayString(getFieldDescription(cardField)), 3)) : createCommentVNode("", true)
                                        ])) : createCommentVNode("", true)
                                      ]);
                                    }), 128))
                                  ]);
                                }), 128))
                              ])
                            ], 2)) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true)
                      ]);
                    }), 128))
                  ]);
                }), 128))
              ], 32)
            ], 64)) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", {
            class: normalizeClass(["px-3 sm:px-4 py-2 sm:py-3 border-t flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-2 space-y-reverse sm:space-y-0", __props.darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"])
          }, [
            createBaseVNode("button", {
              onClick: closeForm,
              class: normalizeClass(["w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium transition-colors", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-200 hover:bg-gray-300 text-gray-700"]),
              disabled: submitting.value
            }, toDisplayString(unref(t)("admin.mount.form.cancel")), 11, _hoisted_44$1),
            createBaseVNode("button", {
              type: "button",
              onClick: submitForm,
              disabled: submitting.value || loading.value,
              class: normalizeClass(["w-full sm:w-auto flex justify-center items-center px-4 py-2 rounded-md text-sm font-medium transition-colors text-white", [submitting.value ? "opacity-75 cursor-not-allowed" : "hover:bg-primary-600", __props.darkMode ? "bg-primary-600" : "bg-primary-500"]])
            }, [
              submitting.value ? (openBlock(), createBlock(unref(IconRefresh), {
                key: 0,
                size: "sm",
                class: "animate-spin -ml-1 mr-2"
              })) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(submitting.value ? unref(t)("admin.mount.form.saving") : isEditMode.value ? unref(t)("admin.mount.form.save") : unref(t)("admin.mount.form.create")), 1)
            ], 10, _hoisted_45$1)
          ], 2)
        ], 2)
      ]);
    };
  }
};
const _hoisted_1 = { class: "p-4 flex-1 flex flex-col" };
const _hoisted_2 = { class: "flex flex-col sm:flex-row sm:justify-between mb-4" };
const _hoisted_3 = { class: "mb-2 sm:mb-0" };
const _hoisted_4 = { class: "flex flex-wrap gap-2" };
const _hoisted_5 = ["disabled"];
const _hoisted_6 = { class: "flex items-center" };
const _hoisted_7 = { class: "flex items-center" };
const _hoisted_8 = {
  key: 0,
  class: "mb-4 p-3 bg-red-100 text-red-600 rounded-md dark:bg-red-900/50 dark:text-red-200 dark:border dark:border-red-800"
};
const _hoisted_9 = {
  key: 1,
  class: "flex justify-between items-center mb-3 sm:mb-4"
};
const _hoisted_10 = { class: "text-xs sm:text-sm text-gray-500 dark:text-gray-400" };
const _hoisted_11 = { class: "inline-flex items-center" };
const _hoisted_12 = { class: "flex items-center gap-2" };
const _hoisted_13 = { class: "max-w-md" };
const _hoisted_14 = { class: "relative rounded-md shadow-sm" };
const _hoisted_15 = ["placeholder"];
const _hoisted_16 = { class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" };
const _hoisted_17 = {
  key: 2,
  class: "flex justify-center my-8"
};
const _hoisted_18 = {
  key: 3,
  class: "flex-grow flex items-center justify-center p-6"
};
const _hoisted_19 = { class: "text-center" };
const _hoisted_20 = {
  key: 4,
  class: "flex-grow overflow-auto"
};
const _hoisted_21 = { key: 0 };
const _hoisted_22 = { class: "hidden md:block overflow-x-auto" };
const _hoisted_23 = { class: "px-6 py-4 whitespace-nowrap" };
const _hoisted_24 = { class: "flex items-center" };
const _hoisted_25 = { class: "px-6 py-4" };
const _hoisted_26 = ["title"];
const _hoisted_27 = { class: "inline-block max-w-xs truncate" };
const _hoisted_28 = { class: "px-6 py-4 whitespace-nowrap" };
const _hoisted_29 = { class: "px-6 py-4" };
const _hoisted_30 = ["title"];
const _hoisted_31 = { class: "px-6 py-4 whitespace-nowrap" };
const _hoisted_32 = { class: "flex flex-wrap gap-1" };
const _hoisted_33 = { class: "px-6 py-4 whitespace-nowrap" };
const _hoisted_34 = { class: "px-6 py-4 whitespace-nowrap text-center" };
const _hoisted_35 = { class: "flex justify-center space-x-2" };
const _hoisted_36 = ["onClick", "title"];
const _hoisted_37 = ["onClick", "disabled", "title"];
const _hoisted_38 = ["onClick", "disabled", "title"];
const _hoisted_39 = { class: "md:hidden grid grid-cols-1 gap-4" };
const _hoisted_40 = { class: "px-4 py-4 flex-1 flex flex-col justify-between" };
const _hoisted_41 = { class: "flex justify-between items-start mb-3" };
const _hoisted_42 = ["title"];
const _hoisted_43 = ["title"];
const _hoisted_44 = {
  key: 1,
  class: "mb-2 flex flex-wrap gap-1"
};
const _hoisted_45 = { class: "flex justify-end space-x-2 mt-3" };
const _hoisted_46 = ["onClick"];
const _hoisted_47 = ["onClick", "disabled"];
const _hoisted_48 = ["onClick", "disabled"];
const _hoisted_49 = {
  key: 1,
  class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
};
const _hoisted_50 = { class: "px-4 py-4 flex-1 flex flex-col justify-between" };
const _hoisted_51 = { class: "flex justify-between items-start mb-3" };
const _hoisted_52 = ["title"];
const _hoisted_53 = { class: "flex items-center" };
const _hoisted_54 = { class: "mb-3" };
const _hoisted_55 = { class: "flex items-center" };
const _hoisted_56 = ["title"];
const _hoisted_57 = { class: "mb-3" };
const _hoisted_58 = ["title"];
const _hoisted_59 = { class: "mb-3 min-h-[24px]" };
const _hoisted_60 = {
  key: 0,
  class: "flex items-start"
};
const _hoisted_61 = ["title"];
const _hoisted_62 = {
  key: 0,
  class: "mb-2 flex flex-wrap gap-1"
};
const _hoisted_63 = { class: "flex items-center" };
const _hoisted_64 = { class: "flex items-center" };
const _hoisted_65 = { class: "flex justify-end space-x-2" };
const _hoisted_66 = ["onClick"];
const _hoisted_67 = ["onClick", "disabled"];
const _hoisted_68 = ["onClick", "disabled"];
const _hoisted_69 = { class: "mt-2 mb-4 sm:mt-4 sm:mb-0" };
const _sfc_main = {
  __name: "MountManagementView",
  props: {
    userType: {
      type: String,
      default: "admin",
      validator: (value) => ["admin", "apikey"].includes(value)
    }
  },
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
      showForm,
      currentMount,
      searchQuery,
      filteredMounts,
      pagination,
      lastRefreshTime,
      pageSizeOptions,
      viewMode,
      // 权限状态
      isAdmin,
      isApiKeyUser,
      // 行级加载状态
      isMountToggling,
      isMountDeleting,
      // 方法
      loadMounts,
      loadStorageConfigs,
      handleOffsetChange,
      handleLimitChange,
      openCreateForm,
      openEditForm,
      closeForm,
      handleFormSaveSuccess,
      confirmDelete,
      toggleActive,
      // 工具方法
      formatDate,
      formatDateOnly,
      formatCreator,
      getCreatorClass,
      formatStorageType
    } = useMountManagement({ confirmFn });
    const viewModeOptions = [
      { value: "grid", icon: "grid", titleKey: "admin.mount.viewMode.grid" },
      { value: "list", icon: "list", titleKey: "admin.mount.viewMode.list" }
    ];
    onMounted(() => {
      loadStorageConfigs();
      loadMounts();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("h2", {
              class: normalizeClass(["text-lg font-semibold", unref(darkMode) ? "text-white" : "text-gray-900"])
            }, toDisplayString(unref(isApiKeyUser) ? _ctx.$t("admin.mount.accessibleMounts") : _ctx.$t("admin.mount.title")), 3)
          ]),
          createBaseVNode("div", _hoisted_4, [
            unref(isAdmin) ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: _cache[0] || (_cache[0] = (...args) => unref(openCreateForm) && unref(openCreateForm)(...args)),
              class: normalizeClass(["px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow", unref(darkMode) ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"]),
              disabled: unref(loading)
            }, [
              createBaseVNode("span", _hoisted_6, [
                createVNode(unref(IconFolderPlus), { class: "h-4 w-4 mr-1.5" }),
                createTextVNode(" " + toDisplayString(_ctx.$t("admin.mount.createMount")), 1)
              ])
            ], 10, _hoisted_5)) : createCommentVNode("", true),
            createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = (...args) => unref(loadMounts) && unref(loadMounts)(...args)),
              class: normalizeClass(["px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow", unref(darkMode) ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"])
            }, [
              createBaseVNode("span", _hoisted_7, [
                createVNode(unref(IconRefresh), { class: "h-4 w-4 mr-1.5" }),
                createTextVNode(" " + toDisplayString(_ctx.$t("admin.mount.refresh")), 1)
              ])
            ], 2)
          ])
        ]),
        unref(error) ? (openBlock(), createElementBlock("div", _hoisted_8, [
          createBaseVNode("p", null, toDisplayString(unref(error)), 1)
        ])) : createCommentVNode("", true),
        unref(lastRefreshTime) ? (openBlock(), createElementBlock("div", _hoisted_9, [
          createBaseVNode("div", _hoisted_10, [
            createBaseVNode("span", _hoisted_11, [
              createVNode(unref(IconClock), { class: "h-3 w-3 sm:h-4 sm:w-4 mr-1" }),
              createTextVNode(" " + toDisplayString(_ctx.$t("admin.mount.info.lastRefresh")) + ": " + toDisplayString(unref(lastRefreshTime)), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_12, [
            createBaseVNode("div", _hoisted_13, [
              createBaseVNode("div", _hoisted_14, [
                withDirectives(createBaseVNode("input", {
                  type: "text",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(searchQuery) ? searchQuery.value = $event : null),
                  placeholder: _ctx.$t("admin.mount.search"),
                  class: normalizeClass([
                    "w-full px-3 py-1.5 rounded-md focus:outline-none focus:ring-2",
                    unref(darkMode) ? "bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 border border-gray-600" : "bg-white text-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 border border-gray-300"
                  ])
                }, null, 10, _hoisted_15), [
                  [vModelText, unref(searchQuery)]
                ]),
                createBaseVNode("div", _hoisted_16, [
                  createVNode(unref(IconSearch), {
                    class: normalizeClass(["h-4 w-4", unref(darkMode) ? "text-gray-400" : "text-gray-400"])
                  }, null, 8, ["class"])
                ])
              ])
            ]),
            createVNode(_sfc_main$2, {
              modelValue: unref(viewMode),
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(viewMode) ? viewMode.value = $event : null),
              options: viewModeOptions,
              "dark-mode": unref(darkMode),
              size: "md"
            }, null, 8, ["modelValue", "dark-mode"])
          ])
        ])) : createCommentVNode("", true),
        unref(loading) ? (openBlock(), createElementBlock("div", _hoisted_17, [
          createVNode(unref(IconRefresh), {
            class: normalizeClass(["animate-spin h-8 w-8", unref(darkMode) ? "text-blue-400" : "text-blue-500"])
          }, null, 8, ["class"])
        ])) : unref(filteredMounts).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_18, [
          createBaseVNode("div", _hoisted_19, [
            createVNode(unref(IconArchive), {
              class: normalizeClass(["mx-auto h-12 w-12 mb-4", unref(darkMode) ? "text-gray-500" : "text-gray-400"])
            }, null, 8, ["class"]),
            createBaseVNode("h3", {
              class: normalizeClass(["text-lg font-medium mb-2", unref(darkMode) ? "text-white" : "text-gray-900"])
            }, toDisplayString(unref(searchQuery) ? _ctx.$t("admin.mount.searchResults.noResults") : unref(isApiKeyUser) ? _ctx.$t("admin.mount.empty.title") : _ctx.$t("admin.mount.empty.title")), 3),
            createBaseVNode("p", {
              class: normalizeClass(["text-sm mb-4", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
            }, toDisplayString(unref(searchQuery) ? "尝试使用不同的搜索条件" : unref(isApiKeyUser) ? "当前API密钥没有可访问的挂载点，请联系管理员配置权限" : _ctx.$t("admin.mount.empty.description")), 3),
            unref(searchQuery) ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: _cache[4] || (_cache[4] = ($event) => searchQuery.value = ""),
              class: normalizeClass([
                "inline-flex items-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200",
                unref(darkMode) ? "border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-blue-500 focus:ring-offset-gray-800" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500"
              ])
            }, toDisplayString(_ctx.$t("admin.mount.searchResults.clearSearch")), 3)) : createCommentVNode("", true)
          ])
        ])) : (openBlock(), createElementBlock("div", _hoisted_20, [
          unref(viewMode) === "list" ? (openBlock(), createElementBlock("div", _hoisted_21, [
            createBaseVNode("div", _hoisted_22, [
              createBaseVNode("table", {
                class: normalizeClass(["min-w-full divide-y", unref(darkMode) ? "divide-gray-700" : "divide-gray-200"])
              }, [
                createBaseVNode("thead", {
                  class: normalizeClass(unref(darkMode) ? "bg-gray-800" : "bg-gray-50")
                }, [
                  createBaseVNode("tr", null, [
                    createBaseVNode("th", {
                      class: normalizeClass(["px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", unref(darkMode) ? "text-gray-300" : "text-gray-500"])
                    }, toDisplayString(_ctx.$t("admin.mount.form.name")), 3),
                    createBaseVNode("th", {
                      class: normalizeClass(["px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", unref(darkMode) ? "text-gray-300" : "text-gray-500"])
                    }, toDisplayString(_ctx.$t("admin.mount.form.mountPath")), 3),
                    createBaseVNode("th", {
                      class: normalizeClass(["px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", unref(darkMode) ? "text-gray-300" : "text-gray-500"])
                    }, toDisplayString(_ctx.$t("admin.mount.form.storageType")), 3),
                    createBaseVNode("th", {
                      class: normalizeClass(["px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", unref(darkMode) ? "text-gray-300" : "text-gray-500"])
                    }, toDisplayString(_ctx.$t("admin.mount.form.remark")), 3),
                    createBaseVNode("th", {
                      class: normalizeClass(["px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", unref(darkMode) ? "text-gray-300" : "text-gray-500"])
                    }, toDisplayString(_ctx.$t("admin.mount.status.proxySign")), 3),
                    createBaseVNode("th", {
                      class: normalizeClass(["px-6 py-3 text-left text-xs font-medium uppercase tracking-wider", unref(darkMode) ? "text-gray-300" : "text-gray-500"])
                    }, toDisplayString(_ctx.$t("admin.mount.info.createdAt")), 3),
                    createBaseVNode("th", {
                      class: normalizeClass(["px-6 py-3 text-center text-xs font-medium uppercase tracking-wider", unref(darkMode) ? "text-gray-300" : "text-gray-500"])
                    }, toDisplayString(_ctx.$t("common.actions")), 3)
                  ])
                ], 2),
                createBaseVNode("tbody", {
                  class: normalizeClass([unref(darkMode) ? "bg-gray-900 divide-gray-800" : "bg-white divide-gray-200", "divide-y"])
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(filteredMounts).slice(unref(pagination).offset, unref(pagination).offset + unref(pagination).limit), (mount) => {
                    return openBlock(), createElementBlock("tr", {
                      key: mount.id,
                      class: normalizeClass([unref(darkMode) ? "hover:bg-gray-800" : "hover:bg-gray-50", "transition-colors"])
                    }, [
                      createBaseVNode("td", _hoisted_23, [
                        createBaseVNode("div", _hoisted_24, [
                          createBaseVNode("span", {
                            class: normalizeClass(["w-2 h-2 rounded-full mr-2", mount.is_active ? "bg-green-400" : "bg-gray-400"])
                          }, null, 2),
                          createBaseVNode("span", {
                            class: normalizeClass(["text-sm font-medium", unref(darkMode) ? "text-white" : "text-gray-900"])
                          }, toDisplayString(mount.name), 3)
                        ])
                      ]),
                      createBaseVNode("td", _hoisted_25, [
                        createBaseVNode("div", {
                          class: normalizeClass(["text-sm font-mono", unref(darkMode) ? "text-gray-300" : "text-gray-600"]),
                          title: mount.mount_path
                        }, [
                          createBaseVNode("span", _hoisted_27, toDisplayString(mount.mount_path), 1)
                        ], 10, _hoisted_26)
                      ]),
                      createBaseVNode("td", _hoisted_28, [
                        createBaseVNode("span", {
                          class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                        }, toDisplayString(unref(formatStorageType)(mount)), 3)
                      ]),
                      createBaseVNode("td", _hoisted_29, [
                        createBaseVNode("span", {
                          class: normalizeClass(["text-sm inline-block max-w-xs truncate", unref(darkMode) ? "text-gray-400" : "text-gray-500"]),
                          title: mount.remark || "-"
                        }, toDisplayString(mount.remark || "-"), 11, _hoisted_30)
                      ]),
                      createBaseVNode("td", _hoisted_31, [
                        createBaseVNode("div", _hoisted_32, [
                          mount.web_proxy ? (openBlock(), createElementBlock("span", {
                            key: 0,
                            class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", unref(darkMode) ? "bg-blue-900/50 text-blue-200" : "bg-blue-100 text-blue-800"])
                          }, toDisplayString(_ctx.$t("admin.mount.status.proxy")), 3)) : createCommentVNode("", true),
                          mount.enable_sign ? (openBlock(), createElementBlock("span", {
                            key: 1,
                            class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", unref(darkMode) ? "bg-green-900/50 text-green-200" : "bg-green-100 text-green-800"])
                          }, toDisplayString(_ctx.$t("admin.mount.status.signature")), 3)) : createCommentVNode("", true),
                          mount.enable_folder_summary_compute ? (openBlock(), createElementBlock("span", {
                            key: 2,
                            class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", unref(darkMode) ? "bg-purple-900/50 text-purple-200" : "bg-purple-100 text-purple-800"])
                          }, toDisplayString(_ctx.$t("admin.mount.status.folderSummary")), 3)) : createCommentVNode("", true),
                          !mount.web_proxy && !mount.enable_sign && !mount.enable_folder_summary_compute ? (openBlock(), createElementBlock("span", {
                            key: 3,
                            class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-500" : "text-gray-400"])
                          }, "-", 2)) : createCommentVNode("", true)
                        ])
                      ]),
                      createBaseVNode("td", _hoisted_33, [
                        createBaseVNode("span", {
                          class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                        }, toDisplayString(unref(formatDateOnly)(mount.created_at)), 3)
                      ]),
                      createBaseVNode("td", _hoisted_34, [
                        createBaseVNode("div", _hoisted_35, [
                          unref(isAdmin) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                            createBaseVNode("button", {
                              onClick: ($event) => unref(openEditForm)(mount),
                              class: normalizeClass(["p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", unref(darkMode) ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-900"]),
                              title: _ctx.$t("admin.mount.actions.edit")
                            }, [
                              createVNode(unref(IconRename), { class: "h-5 w-5" })
                            ], 10, _hoisted_36),
                            createBaseVNode("button", {
                              onClick: ($event) => unref(toggleActive)(mount),
                              disabled: unref(isMountToggling)(mount.id),
                              class: normalizeClass(["p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", mount.is_active ? unref(darkMode) ? "text-yellow-400 hover:text-yellow-300" : "text-yellow-600 hover:text-yellow-900" : unref(darkMode) ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-900"]),
                              title: mount.is_active ? _ctx.$t("admin.mount.actions.disable") : _ctx.$t("admin.mount.actions.enable")
                            }, [
                              unref(isMountToggling)(mount.id) ? (openBlock(), createBlock(unref(IconRefresh), {
                                key: 0,
                                class: "h-5 w-5 animate-spin"
                              })) : mount.is_active ? (openBlock(), createBlock(unref(IconXCircle), {
                                key: 1,
                                class: "h-5 w-5"
                              })) : (openBlock(), createBlock(unref(IconCheckCircle), {
                                key: 2,
                                class: "h-5 w-5"
                              }))
                            ], 10, _hoisted_37),
                            createBaseVNode("button", {
                              onClick: ($event) => unref(confirmDelete)(mount.id),
                              disabled: unref(isMountDeleting)(mount.id),
                              class: normalizeClass(["p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", unref(darkMode) ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-900"]),
                              title: _ctx.$t("admin.mount.actions.delete")
                            }, [
                              unref(isMountDeleting)(mount.id) ? (openBlock(), createBlock(unref(IconRefresh), {
                                key: 0,
                                class: "h-5 w-5 animate-spin"
                              })) : (openBlock(), createBlock(unref(IconDelete), {
                                key: 1,
                                class: "h-5 w-5"
                              }))
                            ], 10, _hoisted_38)
                          ], 64)) : (openBlock(), createElementBlock("span", {
                            key: 1,
                            class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                          }, toDisplayString(_ctx.$t("admin.mount.actions.view")), 3))
                        ])
                      ])
                    ], 2);
                  }), 128))
                ], 2)
              ], 2)
            ]),
            createBaseVNode("div", _hoisted_39, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(filteredMounts).slice(unref(pagination).offset, unref(pagination).offset + unref(pagination).limit), (mount) => {
                return openBlock(), createElementBlock("div", {
                  key: mount.id,
                  class: normalizeClass(["rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg flex flex-col", unref(darkMode) ? "bg-gray-700 border border-gray-600" : "bg-white border border-gray-200"])
                }, [
                  createBaseVNode("div", _hoisted_40, [
                    createBaseVNode("div", null, [
                      createBaseVNode("div", _hoisted_41, [
                        createBaseVNode("h3", {
                          class: normalizeClass(["text-base font-medium truncate", unref(darkMode) ? "text-white" : "text-gray-900"]),
                          title: mount.name
                        }, toDisplayString(mount.name), 11, _hoisted_42),
                        createBaseVNode("span", {
                          class: normalizeClass(["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", mount.is_active ? unref(darkMode) ? "bg-green-900/50 text-green-200" : "bg-green-100 text-green-800" : unref(darkMode) ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-800"])
                        }, [
                          createBaseVNode("span", {
                            class: normalizeClass(["w-1.5 h-1.5 rounded-full mr-1", mount.is_active ? "bg-green-400" : "bg-gray-400"])
                          }, null, 2),
                          createTextVNode(" " + toDisplayString(mount.is_active ? _ctx.$t("admin.mount.status.enabled") : _ctx.$t("admin.mount.status.disabled")), 1)
                        ], 2)
                      ]),
                      createBaseVNode("div", {
                        class: normalizeClass(["mb-2 text-sm font-mono", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                      }, toDisplayString(mount.mount_path), 3),
                      createBaseVNode("div", {
                        class: normalizeClass(["mb-2 text-sm", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                      }, toDisplayString(unref(formatStorageType)(mount)), 3),
                      mount.remark ? (openBlock(), createElementBlock("div", {
                        key: 0,
                        class: normalizeClass(["mb-2 text-sm truncate", unref(darkMode) ? "text-gray-400" : "text-gray-500"]),
                        title: mount.remark
                      }, toDisplayString(mount.remark), 11, _hoisted_43)) : createCommentVNode("", true),
                      mount.web_proxy || mount.enable_sign || mount.enable_folder_summary_compute ? (openBlock(), createElementBlock("div", _hoisted_44, [
                        mount.web_proxy ? (openBlock(), createElementBlock("span", {
                          key: 0,
                          class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded text-xs", unref(darkMode) ? "bg-blue-900/50 text-blue-200" : "bg-blue-100 text-blue-800"])
                        }, toDisplayString(_ctx.$t("admin.mount.status.proxy")), 3)) : createCommentVNode("", true),
                        mount.enable_sign ? (openBlock(), createElementBlock("span", {
                          key: 1,
                          class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded text-xs", unref(darkMode) ? "bg-green-900/50 text-green-200" : "bg-green-100 text-green-800"])
                        }, toDisplayString(_ctx.$t("admin.mount.status.signature")), 3)) : createCommentVNode("", true),
                        mount.enable_folder_summary_compute ? (openBlock(), createElementBlock("span", {
                          key: 2,
                          class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded text-xs", unref(darkMode) ? "bg-purple-900/50 text-purple-200" : "bg-purple-100 text-purple-800"])
                        }, toDisplayString(_ctx.$t("admin.mount.status.folderSummary")), 3)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ]),
                    createBaseVNode("div", _hoisted_45, [
                      unref(isAdmin) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                        createBaseVNode("button", {
                          onClick: ($event) => unref(openEditForm)(mount),
                          class: normalizeClass(["px-2.5 py-1.5 rounded-md text-xs transition-colors", unref(darkMode) ? "bg-gray-600 hover:bg-gray-500 text-gray-200" : "bg-gray-100 hover:bg-gray-200 text-gray-700"])
                        }, toDisplayString(_ctx.$t("admin.mount.actions.edit")), 11, _hoisted_46),
                        createBaseVNode("button", {
                          onClick: ($event) => unref(toggleActive)(mount),
                          disabled: unref(isMountToggling)(mount.id),
                          class: normalizeClass(["px-2.5 py-1.5 rounded-md text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center", mount.is_active ? unref(darkMode) ? "bg-yellow-700 hover:bg-yellow-600 text-yellow-100" : "bg-yellow-100 hover:bg-yellow-200 text-yellow-800" : unref(darkMode) ? "bg-green-700 hover:bg-green-600 text-green-100" : "bg-green-100 hover:bg-green-200 text-green-800"])
                        }, [
                          unref(isMountToggling)(mount.id) ? (openBlock(), createBlock(unref(IconRefresh), {
                            key: 0,
                            class: "h-3 w-3 mr-1 animate-spin"
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(mount.is_active ? _ctx.$t("admin.mount.actions.disable") : _ctx.$t("admin.mount.actions.enable")), 1)
                        ], 10, _hoisted_47),
                        createBaseVNode("button", {
                          onClick: ($event) => unref(confirmDelete)(mount.id),
                          disabled: unref(isMountDeleting)(mount.id),
                          class: normalizeClass(["px-2.5 py-1.5 rounded-md text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center", unref(darkMode) ? "bg-red-700 hover:bg-red-600 text-red-100" : "bg-red-100 hover:bg-red-200 text-red-800"])
                        }, [
                          unref(isMountDeleting)(mount.id) ? (openBlock(), createBlock(unref(IconRefresh), {
                            key: 0,
                            class: "h-3 w-3 mr-1 animate-spin"
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(_ctx.$t("admin.mount.actions.delete")), 1)
                        ], 10, _hoisted_48)
                      ], 64)) : (openBlock(), createElementBlock("span", {
                        key: 1,
                        class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                      }, toDisplayString(_ctx.$t("admin.mount.actions.view")), 3))
                    ])
                  ])
                ], 2);
              }), 128))
            ])
          ])) : (openBlock(), createElementBlock("div", _hoisted_49, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(filteredMounts).slice(unref(pagination).offset, unref(pagination).offset + unref(pagination).limit), (mount) => {
              return openBlock(), createElementBlock("div", {
                key: mount.id,
                class: normalizeClass(["rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg flex flex-col", unref(darkMode) ? "bg-gray-700 border border-gray-600 hover:border-blue-500/50" : "bg-white border border-gray-200 hover:border-blue-400/50"])
              }, [
                createBaseVNode("div", _hoisted_50, [
                  createBaseVNode("div", null, [
                    createBaseVNode("div", _hoisted_51, [
                      createBaseVNode("h3", {
                        class: normalizeClass(["text-base font-medium truncate", unref(darkMode) ? "text-white" : "text-gray-900"]),
                        title: mount.name
                      }, toDisplayString(mount.name), 11, _hoisted_52),
                      createBaseVNode("span", {
                        class: normalizeClass([
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-200",
                          mount.is_active ? unref(darkMode) ? "bg-green-900/50 text-green-200 border border-green-800/50" : "bg-green-100 text-green-800 border border-green-200" : unref(darkMode) ? "bg-gray-800 text-gray-300 border border-gray-700" : "bg-gray-100 text-gray-800 border border-gray-200"
                        ])
                      }, [
                        createBaseVNode("span", _hoisted_53, [
                          createBaseVNode("span", {
                            class: normalizeClass(["w-1.5 h-1.5 rounded-full mr-1", mount.is_active ? "bg-green-400" : "bg-gray-400"])
                          }, null, 2),
                          createTextVNode(" " + toDisplayString(mount.is_active ? _ctx.$t("admin.mount.status.enabled") : _ctx.$t("admin.mount.status.disabled")), 1)
                        ])
                      ], 2)
                    ]),
                    createBaseVNode("div", _hoisted_54, [
                      createBaseVNode("div", _hoisted_55, [
                        createVNode(unref(IconFolder), {
                          class: normalizeClass(["flex-shrink-0 mr-1.5 h-4 w-4", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                        }, null, 8, ["class"]),
                        createBaseVNode("p", {
                          class: normalizeClass(["text-sm font-mono truncate", unref(darkMode) ? "text-gray-300" : "text-gray-600"]),
                          title: mount.mount_path
                        }, toDisplayString(mount.mount_path), 11, _hoisted_56)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_57, [
                      createBaseVNode("div", {
                        class: normalizeClass(["flex items-center text-sm", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                      }, [
                        createVNode(unref(IconArchive), {
                          class: normalizeClass(["flex-shrink-0 mr-1.5 h-4 w-4", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                        }, null, 8, ["class"]),
                        createBaseVNode("span", {
                          class: "truncate",
                          title: unref(formatStorageType)(mount)
                        }, toDisplayString(unref(formatStorageType)(mount)), 9, _hoisted_58)
                      ], 2)
                    ]),
                    createBaseVNode("div", _hoisted_59, [
                      mount.remark ? (openBlock(), createElementBlock("div", _hoisted_60, [
                        createVNode(unref(IconInformationCircle), {
                          class: normalizeClass(["flex-shrink-0 mr-1.5 h-4 w-4 mt-0.5", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                        }, null, 8, ["class"]),
                        createBaseVNode("p", {
                          class: normalizeClass(["text-sm truncate", unref(darkMode) ? "text-gray-400" : "text-gray-500"]),
                          title: mount.remark
                        }, toDisplayString(mount.remark), 11, _hoisted_61)
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    mount.web_proxy || mount.enable_folder_summary_compute ? (openBlock(), createElementBlock("div", _hoisted_62, [
                      createBaseVNode("span", {
                        class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", unref(darkMode) ? "bg-blue-900/50 text-blue-200 border border-blue-800/50" : "bg-blue-100 text-blue-800 border border-blue-200"])
                      }, [
                        createVNode(unref(IconGlobeAlt), { class: "w-3 h-3 mr-1" }),
                        createTextVNode(" " + toDisplayString(_ctx.$t("admin.mount.status.proxy")), 1)
                      ], 2),
                      mount.enable_sign ? (openBlock(), createElementBlock("span", {
                        key: 0,
                        class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", unref(darkMode) ? "bg-green-900/50 text-green-200 border border-green-800/50" : "bg-green-100 text-green-800 border border-green-200"])
                      }, [
                        createVNode(unref(IconShieldCheck), { class: "w-3 h-3 mr-1" }),
                        createTextVNode(" " + toDisplayString(_ctx.$t("admin.mount.status.signature")), 1)
                      ], 2)) : createCommentVNode("", true),
                      mount.enable_folder_summary_compute ? (openBlock(), createElementBlock("span", {
                        key: 1,
                        class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", unref(darkMode) ? "bg-purple-900/50 text-purple-200 border border-purple-800/50" : "bg-purple-100 text-purple-800 border border-purple-200"])
                      }, [
                        createVNode(unref(IconCalculator), { class: "w-3 h-3 mr-1" }),
                        createTextVNode(" " + toDisplayString(_ctx.$t("admin.mount.status.folderSummary")), 1)
                      ], 2)) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true),
                    createBaseVNode("div", {
                      class: normalizeClass(["text-xs mb-3", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                    }, [
                      createBaseVNode("div", _hoisted_63, [
                        createVNode(unref(IconCalendar), {
                          class: normalizeClass(["flex-shrink-0 mr-1.5 h-3.5 w-3.5", unref(darkMode) ? "text-gray-500" : "text-gray-400"])
                        }, null, 8, ["class"]),
                        createBaseVNode("span", null, toDisplayString(_ctx.$t("admin.mount.info.createdAt")) + ": " + toDisplayString(unref(formatDate)(mount.created_at)), 1)
                      ])
                    ], 2),
                    createBaseVNode("div", {
                      class: normalizeClass(["text-xs mb-3", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                    }, [
                      createBaseVNode("div", _hoisted_64, [
                        createVNode(unref(IconUser), {
                          class: normalizeClass(["flex-shrink-0 mr-1.5 h-3.5 w-3.5", unref(darkMode) ? "text-gray-500" : "text-gray-400"])
                        }, null, 8, ["class"]),
                        createBaseVNode("span", null, toDisplayString(_ctx.$t("admin.mount.info.createdBy")) + ": ", 1),
                        createBaseVNode("span", {
                          class: normalizeClass(["ml-1 px-1.5 py-0.5 text-xs rounded", unref(getCreatorClass)(mount)])
                        }, toDisplayString(unref(formatCreator)(mount)), 3)
                      ])
                    ], 2),
                    createBaseVNode("div", _hoisted_65, [
                      unref(isAdmin) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                        createBaseVNode("button", {
                          onClick: ($event) => unref(openEditForm)(mount),
                          class: normalizeClass([
                            "inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1",
                            unref(darkMode) ? "bg-gray-600 hover:bg-gray-500 text-gray-200 focus:ring-blue-500 focus:ring-offset-gray-800" : "bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-blue-500 focus:ring-offset-white"
                          ])
                        }, [
                          createVNode(unref(IconRename), { class: "h-3.5 w-3.5 mr-1" }),
                          createTextVNode(" " + toDisplayString(_ctx.$t("admin.mount.actions.edit")), 1)
                        ], 10, _hoisted_66),
                        createBaseVNode("button", {
                          onClick: ($event) => unref(toggleActive)(mount),
                          disabled: unref(isMountToggling)(mount.id),
                          class: normalizeClass([
                            "inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed",
                            unref(darkMode) ? mount.is_active ? "bg-yellow-700 hover:bg-yellow-600 text-yellow-100 focus:ring-yellow-500 focus:ring-offset-gray-800" : "bg-green-700 hover:bg-green-600 text-green-100 focus:ring-green-500 focus:ring-offset-gray-800" : mount.is_active ? "bg-yellow-100 hover:bg-yellow-200 text-yellow-800 focus:ring-yellow-500 focus:ring-offset-white" : "bg-green-100 hover:bg-green-200 text-green-800 focus:ring-green-500 focus:ring-offset-white"
                          ])
                        }, [
                          unref(isMountToggling)(mount.id) ? (openBlock(), createBlock(unref(IconRefresh), {
                            key: 0,
                            class: "h-3.5 w-3.5 mr-1 animate-spin"
                          })) : mount.is_active ? (openBlock(), createBlock(unref(IconXCircle), {
                            key: 1,
                            class: "h-3.5 w-3.5 mr-1"
                          })) : (openBlock(), createBlock(unref(IconCheckCircle), {
                            key: 2,
                            class: "h-3.5 w-3.5 mr-1"
                          })),
                          createTextVNode(" " + toDisplayString(mount.is_active ? _ctx.$t("admin.mount.actions.disable") : _ctx.$t("admin.mount.actions.enable")), 1)
                        ], 10, _hoisted_67),
                        createBaseVNode("button", {
                          onClick: ($event) => unref(confirmDelete)(mount.id),
                          disabled: unref(isMountDeleting)(mount.id),
                          class: normalizeClass([
                            "inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed",
                            unref(darkMode) ? "bg-red-700 hover:bg-red-600 text-red-100 focus:ring-red-500 focus:ring-offset-gray-800" : "bg-red-100 hover:bg-red-200 text-red-800 focus:ring-red-500 focus:ring-offset-white"
                          ])
                        }, [
                          unref(isMountDeleting)(mount.id) ? (openBlock(), createBlock(unref(IconRefresh), {
                            key: 0,
                            class: "h-3.5 w-3.5 mr-1 animate-spin"
                          })) : (openBlock(), createBlock(unref(IconDelete), {
                            key: 1,
                            class: "h-3.5 w-3.5 mr-1"
                          })),
                          createTextVNode(" " + toDisplayString(_ctx.$t("admin.mount.actions.delete")), 1)
                        ], 10, _hoisted_68)
                      ], 64)) : (openBlock(), createElementBlock("span", {
                        key: 1,
                        class: normalizeClass(["inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium", unref(darkMode) ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-500"])
                      }, [
                        createVNode(unref(IconEye), { class: "h-3.5 w-3.5 mr-1" }),
                        createTextVNode(" " + toDisplayString(_ctx.$t("admin.mount.actions.view")), 1)
                      ], 2))
                    ])
                  ])
                ])
              ], 2);
            }), 128))
          ]))
        ])),
        createBaseVNode("div", _hoisted_69, [
          createVNode(_sfc_main$3, {
            "dark-mode": unref(darkMode),
            pagination: unref(pagination),
            "page-size-options": unref(pageSizeOptions),
            mode: "offset",
            onOffsetChanged: unref(handleOffsetChange),
            onLimitChanged: unref(handleLimitChange)
          }, null, 8, ["dark-mode", "pagination", "page-size-options", "onOffsetChanged", "onLimitChanged"])
        ]),
        unref(showForm) ? (openBlock(), createBlock(_sfc_main$1, {
          key: 5,
          "dark-mode": unref(darkMode),
          mount: unref(currentMount),
          "user-type": __props.userType,
          onClose: unref(closeForm),
          onSaveSuccess: unref(handleFormSaveSuccess)
        }, null, 8, ["dark-mode", "mount", "user-type", "onClose", "onSaveSuccess"])) : createCommentVNode("", true),
        createVNode(_sfc_main$4, mergeProps(unref(dialogState), {
          onConfirm: unref(handleConfirm),
          onCancel: unref(handleCancel)
        }), null, 16, ["onConfirm", "onCancel"])
      ]);
    };
  }
};
const MountManagementView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c2ac1ca7"]]);
export {
  MountManagementView as default
};
