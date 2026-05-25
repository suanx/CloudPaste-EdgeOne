import { aK as _export_sfc, a_ as shallowRef, aZ as useFsService, c as createLogger, e as useI18n, F as computed, g as ref, w as watch, o as onMounted, j as createElementBlock, k as openBlock, l as createBaseVNode, n as normalizeClass, t as toDisplayString, z as createVNode, y as unref, G as IconClose, p as createCommentVNode, q as withDirectives, v as vModelText, x as vModelCheckbox, ae as vModelSelect, K as Fragment, L as renderList, b5 as IconFolder, A as createTextVNode, J as IconRefresh, as as IconHome, bw as PermissionChecker, a$ as h, I as IconKey, aE as withCtx, ar as mergeProps, bx as Permission, Y as useGlobalMessage, ac as useThemeMode, b7 as IconDelete, bb as IconClock, m as withModifiers } from "./index-BQxzU9F1.js";
import { _ as _sfc_main$6 } from "./CommonPagination-WikHSq_I.js";
import { u as useConfirmDialog, _ as _sfc_main$5 } from "./useConfirmDialog-c5dcTgIB.js";
import { c as copyToClipboard } from "./clipboard-GLHRBPpJ.js";
import { u as useAdminApiKeyService } from "./apiKeyService-BXEkg81t.js";
import { useAdminMountService } from "./mountService-B4-YQ1h1.js";
import { u as useAdminBase } from "./useAdminBase-CxkodUK-.js";
import { useAdminStorageConfigService } from "./storageConfigService-CIShtBVl.js";
import { _ as _sfc_main$4 } from "./AdminTable-CrUS055e.js";
import { c as formatDateTime } from "./timeUtils-D81jJILb.js";
import { _ as _sfc_main$3 } from "./LoadingIndicator-C1Dntewf.js";
const _hoisted_1$2 = { class: "sr-only" };
const _hoisted_2$2 = { class: "flex" };
const _hoisted_3$2 = { class: "px-3 sm:px-4 py-3 sm:py-4 overflow-y-auto flex-1" };
const _hoisted_4$2 = {
  key: 0,
  class: "space-y-4"
};
const _hoisted_5$2 = ["for"];
const _hoisted_6$2 = ["id", "placeholder", "disabled"];
const _hoisted_7$2 = {
  key: 0,
  class: "space-y-2"
};
const _hoisted_8$2 = { class: "flex items-center space-x-2" };
const _hoisted_9$2 = { key: 0 };
const _hoisted_10$2 = ["placeholder"];
const _hoisted_11$2 = ["for"];
const _hoisted_12$2 = ["id", "disabled"];
const _hoisted_13$2 = ["value"];
const _hoisted_14$1 = { key: 1 };
const _hoisted_15$1 = ["for"];
const _hoisted_16$1 = ["id"];
const _hoisted_17$1 = { class: "space-y-4" };
const _hoisted_18$1 = { class: "grid grid-cols-2 gap-3" };
const _hoisted_19$1 = { class: "flex items-center space-x-2" };
const _hoisted_20$1 = ["id"];
const _hoisted_21$1 = ["for"];
const _hoisted_22 = { class: "flex items-center space-x-2" };
const _hoisted_23 = ["id"];
const _hoisted_24 = ["for"];
const _hoisted_25 = { class: "flex items-center space-x-2" };
const _hoisted_26 = ["id"];
const _hoisted_27 = ["for"];
const _hoisted_28 = { class: "flex items-center space-x-2" };
const _hoisted_29 = ["id"];
const _hoisted_30 = ["for"];
const _hoisted_31 = { class: "grid grid-cols-2 sm:grid-cols-3 gap-3" };
const _hoisted_32 = { class: "flex items-center space-x-2" };
const _hoisted_33 = ["id"];
const _hoisted_34 = ["for"];
const _hoisted_35 = { class: "flex items-center space-x-2" };
const _hoisted_36 = ["id"];
const _hoisted_37 = ["for"];
const _hoisted_38 = { class: "flex items-center space-x-2" };
const _hoisted_39 = ["id"];
const _hoisted_40 = ["for"];
const _hoisted_41 = { class: "flex items-center space-x-2" };
const _hoisted_42 = ["id"];
const _hoisted_43 = ["for"];
const _hoisted_44 = { class: "flex items-center space-x-2" };
const _hoisted_45 = ["id"];
const _hoisted_46 = ["for"];
const _hoisted_47 = { class: "grid grid-cols-1 gap-3" };
const _hoisted_48 = { class: "flex items-center space-x-2" };
const _hoisted_49 = ["id"];
const _hoisted_50 = ["for"];
const _hoisted_51 = { class: "flex items-center space-x-2" };
const _hoisted_52 = ["id"];
const _hoisted_53 = ["for"];
const _hoisted_54 = {
  key: 2,
  class: "mt-2"
};
const _hoisted_55 = ["for"];
const _hoisted_56 = { class: "flex" };
const _hoisted_57 = ["id", "placeholder"];
const _hoisted_58 = ["title"];
const _hoisted_59 = { class: "flex items-center justify-between mb-2" };
const _hoisted_60 = {
  key: 1,
  class: "grid grid-cols-1 sm:grid-cols-2 gap-2"
};
const _hoisted_61 = ["value"];
const _hoisted_62 = { class: "min-w-0" };
const _hoisted_63 = { class: "flex items-center space-x-1" };
const _hoisted_64 = { class: "truncate text-sm font-medium" };
const _hoisted_65 = { class: "font-medium mb-1" };
const _hoisted_66 = {
  key: 1,
  class: "space-y-4"
};
const _hoisted_67 = { class: "font-bold" };
const _hoisted_68 = {
  key: 1,
  class: "h-full overflow-y-auto p-1"
};
const _hoisted_69 = { class: "file-tree" };
const _hoisted_70 = {
  key: 0,
  class: "p-3 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-sm mb-4"
};
const _hoisted_71 = { class: "flex justify-end" };
const _hoisted_72 = {
  key: 2,
  class: "p-3 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-sm mt-4"
};
const _hoisted_73 = ["disabled"];
const _hoisted_74 = ["disabled"];
const _hoisted_75 = { key: 0 };
const _hoisted_76 = { key: 1 };
const _sfc_main$2 = {
  __name: "KeyForm",
  props: {
    darkMode: {
      type: Boolean,
      required: true
    },
    keyData: {
      type: Object,
      default: null
    },
    isEditMode: {
      type: Boolean,
      default: false
    },
    availableMounts: {
      type: Array,
      default: () => []
    }
  },
  emits: ["close", "updated", "created"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const directoryCache = shallowRef(/* @__PURE__ */ new Map());
    const fsService = useFsService();
    const { updateApiKey, createApiKey, getApiKeyStorageAcl, updateApiKeyStorageAcl } = useAdminApiKeyService();
    const { getMountsList } = useAdminMountService();
    const { getStorageConfigs } = useAdminStorageConfigService();
    const log = createLogger("KeyForm");
    const DirectoryItemVue = {
      name: "DirectoryItemVue",
      props: {
        item: {
          type: Object,
          required: true
        },
        currentPath: {
          type: String,
          required: true
        },
        darkMode: {
          type: Boolean,
          default: false
        },
        level: {
          type: Number,
          default: 0
        }
      },
      emits: ["select"],
      setup(props2, { emit: emit2 }) {
        const expanded = ref(false);
        const children = shallowRef([]);
        const loading = ref(false);
        const isSelected = computed(() => {
          return props2.currentPath === props2.item.path + "/";
        });
        const loadChildren = async () => {
          const cacheKey = props2.item.path;
          if (directoryCache.value.has(cacheKey)) {
            children.value = directoryCache.value.get(cacheKey);
            return;
          }
          loading.value = true;
          try {
            let dirItems = [];
            if (props2.item.path === "/") {
              dirItems = mountsList.value.map((mount) => ({
                name: mount.name,
                path: mount.mount_path,
                isDirectory: true
              }));
            } else {
              try {
                const data = await fsService.getDirectoryList(props2.item.path);
                if (data && data.items) {
                  dirItems = data.items.filter((item) => item.isDirectory).map((item) => ({
                    name: item.name,
                    path: props2.item.path + "/" + item.name,
                    isDirectory: true
                  }));
                  dirItems.forEach((item) => {
                    item.path = item.path.replace(/\/\//g, "/");
                  });
                }
              } catch (err) {
                log.error("加载目录失败:", err);
              }
            }
            children.value = dirItems;
            directoryCache.value.set(cacheKey, dirItems);
          } catch (error2) {
            log.error("加载目录失败:", error2);
            children.value = [];
          } finally {
            loading.value = false;
          }
        };
        watch(
          () => props2.currentPath,
          (newPath) => {
            if (newPath.startsWith(props2.item.path + "/") && newPath !== props2.item.path + "/") {
              expanded.value = true;
              if (children.value.length === 0) {
                loadChildren();
              }
            }
          },
          { immediate: true }
        );
        const toggleExpand = (event) => {
          event.stopPropagation();
          if (expanded.value) {
            expanded.value = false;
            return;
          }
          expanded.value = true;
          if (children.value.length === 0) {
            loadChildren();
          }
        };
        const selectFolder = () => {
          emit2("select", props2.item.path);
        };
        return {
          expanded,
          children,
          loading,
          isSelected,
          toggleExpand,
          selectFolder
        };
      },
      render() {
        return h("div", { class: "directory-item" }, [
          h(
            "div",
            {
              class: ["tree-item", { selected: this.isSelected }],
              onClick: this.selectFolder
            },
            [
              h(
                "div",
                {
                  class: "flex items-center py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer",
                  style: { paddingLeft: `${this.level * 0.75 + 0.5}rem` }
                },
                [
                  h(
                    "div",
                    {
                      class: "folder-toggle",
                      onClick: (e) => {
                        e.stopPropagation();
                        this.toggleExpand(e);
                      }
                    },
                    [
                      this.expanded ? h(
                        "svg",
                        {
                          class: "h-4 w-4",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        },
                        [
                          h("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M19 9l-7 7-7-7"
                          })
                        ]
                      ) : h(
                        "svg",
                        {
                          class: "h-4 w-4",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        },
                        [
                          h("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M9 5l7 7-7 7"
                          })
                        ]
                      )
                    ]
                  ),
                  h(
                    "svg",
                    {
                      class: ["h-4 w-4 flex-shrink-0 mr-2", this.darkMode ? "text-yellow-400" : "text-yellow-600"],
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    },
                    [
                      h("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      })
                    ]
                  ),
                  h(
                    "span",
                    {
                      class: ["truncate", this.darkMode ? "text-gray-200" : "text-gray-700"]
                    },
                    this.item.name
                  )
                ]
              )
            ]
          ),
          this.expanded ? h("div", { class: "folder-children" }, [
            this.loading ? h(
              "div",
              {
                class: "folder-loading",
                style: { paddingLeft: `${(this.level + 1) * 0.75 + 0.75}rem` }
              },
              [
                h(IconRefresh, { class: "animate-spin h-3 w-3 mr-1", "aria-hidden": "true" }),
                h("span", { class: "text-xs" }, "加载中...")
              ]
            ) : this.children.length === 0 ? null : this.children.map(
              (child) => h("div", { class: "folder-item", key: child.path }, [
                h(DirectoryItemVue, {
                  item: child,
                  currentPath: this.currentPath,
                  darkMode: this.darkMode,
                  level: this.level + 1,
                  onSelect: (path) => this.$emit("select", path)
                })
              ])
            )
          ]) : null
        ]);
      }
    };
    const { t } = useI18n();
    const props = __props;
    const isGuestKey = computed(() => {
      if (!props.isEditMode || !props.keyData) return false;
      const role = props.keyData.role || "GENERAL";
      return role === "GUEST";
    });
    const emit = __emit;
    const activeTab = ref("basic");
    const isLoading = ref(false);
    const error = ref(null);
    const keyName = ref("");
    const customKey = ref("");
    const useCustomKey = ref(false);
    const expiration = ref("1d");
    const customExpiration = ref("");
    const permissions = ref({
      // 基础权限
      text: false,
      text_manage: false,
      file_share: false,
      file_manage: false,
      // 挂载页权限
      mount_view: false,
      mount_upload: false,
      mount_copy: false,
      mount_rename: false,
      mount_delete: false,
      // WebDAV权限
      webdav_read: false,
      webdav_manage: false
    });
    const basicPath = ref("/");
    const storageConfigs = ref([]);
    const selectedStorageConfigIds = ref([]);
    const isLoadingMounts = ref(false);
    const mountsList = ref([]);
    const selectedPath = ref("/");
    const rootDirectories = shallowRef([]);
    const allPublicMounts = ref([]);
    const expirationOptions = computed(() => {
      const baseKey = props.isEditMode ? "admin.keyManagement.editModal.expirationOptions" : "admin.keyManagement.createModal.expirationOptions";
      return [
        { value: "1d", label: t(`${baseKey}.1d`, "1天") },
        { value: "7d", label: t(`${baseKey}.7d`, "7天") },
        { value: "30d", label: t(`${baseKey}.30d`, "30天") },
        { value: "never", label: t(`${baseKey}.never`, "永不过期") },
        { value: "custom", label: t(`${baseKey}.custom`, "自定义") }
      ];
    });
    const isCustomExpiration = computed(() => {
      return expiration.value === "custom";
    });
    const formTitle = computed(() => {
      return props.isEditMode ? t("admin.keyManagement.editModal.title", "编辑API密钥") : t("admin.keyManagement.createModal.title", "创建新API密钥");
    });
    const saveButtonText = computed(() => {
      return props.isEditMode ? t("admin.keyManagement.editModal.update", "更新") : t("admin.keyManagement.createModal.create", "创建");
    });
    const processingButtonText = computed(() => {
      return props.isEditMode ? t("admin.keyManagement.editModal.processing", "更新中...") : t("admin.keyManagement.createModal.processing", "创建中...");
    });
    const validateCustomKey = (key) => {
      if (!key) return false;
      const keyFormatRegex = /^[a-zA-Z0-9_-]+$/;
      return keyFormatRegex.test(key);
    };
    const convertPermissionsFromBitFlag = (bitFlag) => {
      return PermissionChecker.convertFromBitFlag(bitFlag);
    };
    const convertPermissionsToBitFlag = (perms) => {
      return PermissionChecker.convertToBitFlag(perms);
    };
    const resetForm = () => {
      keyName.value = "";
      customKey.value = "";
      useCustomKey.value = false;
      expiration.value = "1d";
      customExpiration.value = "";
      permissions.value = {
        text: false,
        text_manage: false,
        file_share: false,
        file_manage: false,
        mount_view: false,
        mount_upload: false,
        mount_copy: false,
        mount_rename: false,
        mount_delete: false,
        webdav_read: false,
        webdav_manage: false
      };
      basicPath.value = "/";
      selectedPath.value = "/";
      selectedStorageConfigIds.value = [];
      error.value = null;
      activeTab.value = "basic";
      directoryCache.value.clear();
    };
    const loadStorageAclForKey = async (keyId) => {
      if (!keyId) {
        selectedStorageConfigIds.value = [];
        return;
      }
      try {
        const ids = await getApiKeyStorageAcl(keyId);
        selectedStorageConfigIds.value = Array.isArray(ids) ? ids : [];
      } catch (error2) {
        log.error("加载存储 ACL 失败:", error2);
        selectedStorageConfigIds.value = [];
      }
    };
    watch(
      () => props.keyData,
      (newVal) => {
        if (newVal && props.isEditMode) {
          keyName.value = newVal.name;
          useCustomKey.value = false;
          customKey.value = "";
          permissions.value = convertPermissionsFromBitFlag(newVal.permissions);
          basicPath.value = newVal.basic_path || "/";
          selectedPath.value = newVal.basic_path || "/";
          loadStorageAclForKey(newVal.id);
          if (newVal.expires_at) {
            if (newVal.expires_at === "never" || newVal.expires_at === null) {
              expiration.value = "never";
              customExpiration.value = "";
            } else {
              const expiresAt = new Date(newVal.expires_at);
              if (!isNaN(expiresAt.getTime())) {
                const year = expiresAt.getFullYear();
                if (year >= 9999) {
                  expiration.value = "never";
                  customExpiration.value = "";
                } else {
                  expiration.value = "custom";
                  const month = String(expiresAt.getMonth() + 1).padStart(2, "0");
                  const day = String(expiresAt.getDate()).padStart(2, "0");
                  const hours = String(expiresAt.getHours()).padStart(2, "0");
                  const minutes = String(expiresAt.getMinutes()).padStart(2, "0");
                  customExpiration.value = `${year}-${month}-${day}T${hours}:${minutes}`;
                }
              } else {
                expiration.value = "never";
                customExpiration.value = "";
              }
            }
          } else {
            expiration.value = "never";
            customExpiration.value = "";
          }
        } else {
          resetForm();
        }
      },
      { immediate: true }
    );
    const applyAclToMounts = () => {
      const baseMounts = allPublicMounts.value || [];
      if (!selectedStorageConfigIds.value || selectedStorageConfigIds.value.length === 0) {
        mountsList.value = baseMounts;
      } else {
        const allowedSet = new Set(selectedStorageConfigIds.value);
        mountsList.value = baseMounts.filter((mount) => {
          if (!mount.storage_config_id) {
            return true;
          }
          return allowedSet.has(mount.storage_config_id);
        });
      }
      rootDirectories.value = mountsList.value.map((mount) => ({
        name: mount.name,
        path: mount.mount_path,
        isDirectory: true
      }));
      directoryCache.value.clear();
    };
    const loadMounts = async () => {
      if (allPublicMounts.value.length > 0 && storageConfigs.value.length > 0) {
        applyAclToMounts();
        return;
      }
      isLoadingMounts.value = true;
      try {
        let storageConfigItems = [];
        try {
          const { items } = await getStorageConfigs();
          storageConfigItems = Array.isArray(items) ? items : [];
        } catch (storageError) {
          log.error("加载存储配置列表失败:", storageError);
        }
        const publicStorageConfigs = storageConfigItems.filter(
          (config) => config.is_public === true || config.is_public === 1
        );
        storageConfigs.value = publicStorageConfigs;
        const mounts = await getMountsList();
        allPublicMounts.value = (Array.isArray(mounts) ? mounts : []).filter((mount) => {
          if (!mount.is_active) {
            return false;
          }
          if (mount.storage_config_id) {
            return publicStorageConfigs.some((config) => config.id === mount.storage_config_id);
          }
          return false;
        });
        applyAclToMounts();
      } catch (error2) {
        log.error("加载挂载点列表失败:", error2);
        mountsList.value = [];
        rootDirectories.value = [];
      } finally {
        isLoadingMounts.value = false;
      }
    };
    const switchToPathTab = async () => {
      await loadMounts();
      activeTab.value = "path";
    };
    const selectPath = (path) => {
      selectedPath.value = path.endsWith("/") ? path : path + "/";
    };
    const confirmPathSelection = () => {
      basicPath.value = selectedPath.value;
      activeTab.value = "basic";
    };
    onMounted(() => {
      loadMounts().catch((error2) => {
        log.error("初始化加载存储配置和挂载点失败:", error2);
      });
    });
    watch(
      () => selectedStorageConfigIds.value,
      () => {
        if (allPublicMounts.value.length > 0) {
          applyAclToMounts();
        }
      }
    );
    const handleSubmit = async () => {
      props.isEditMode && isGuestKey.value;
      if (!keyName.value.trim()) {
        error.value = props.isEditMode ? t("admin.keyManagement.editModal.errors.nameRequired", "密钥名称不能为空") : t("admin.keyManagement.createModal.errors.nameRequired", "密钥名称不能为空");
        return;
      }
      if (!props.isEditMode && useCustomKey.value) {
        if (!customKey.value.trim()) {
          error.value = t("admin.keyManagement.createModal.errors.customKeyRequired", "自定义密钥不能为空");
          return;
        }
        if (!validateCustomKey(customKey.value)) {
          error.value = t("admin.keyManagement.createModal.errors.customKeyFormat", "自定义密钥格式不正确，只能包含字母、数字、下划线和短横线");
          return;
        }
      }
      let expiresAt = null;
      if (expiration.value !== "never") {
        if (expiration.value === "custom") {
          if (!customExpiration.value) {
            error.value = props.isEditMode ? t("admin.keyManagement.editModal.errors.expirationRequired", "自定义过期时间不能为空") : t("admin.keyManagement.createModal.errors.expirationRequired", "自定义过期时间不能为空");
            return;
          }
          const customDate = new Date(customExpiration.value);
          if (isNaN(customDate.getTime())) {
            error.value = props.isEditMode ? t("admin.keyManagement.editModal.errors.invalidExpiration", "无效的过期时间") : t("admin.keyManagement.createModal.errors.invalidExpiration", "无效的过期时间");
            return;
          }
          expiresAt = customDate.toISOString();
        } else {
          const days = parseInt(expiration.value);
          if (isNaN(days) || days <= 0) {
            error.value = props.isEditMode ? t("admin.keyManagement.editModal.errors.invalidExpiration", "无效的过期时间") : t("admin.keyManagement.createModal.errors.invalidExpiration", "无效的过期时间");
            return;
          }
          const date = /* @__PURE__ */ new Date();
          date.setDate(date.getDate() + days);
          expiresAt = date.toISOString();
        }
      }
      isLoading.value = true;
      error.value = null;
      try {
        if (props.isEditMode) {
          const updateData = {
            name: keyName.value,
            permissions: convertPermissionsToBitFlag(permissions.value),
            basic_path: basicPath.value
          };
          if (expiresAt) {
            updateData.expires_at = expiresAt;
          } else if (expiration.value === "never") {
            updateData.expires_at = "never";
          }
          await updateApiKey(props.keyData.id, updateData);
          await updateApiKeyStorageAcl(props.keyData.id, selectedStorageConfigIds.value);
          emit("updated", {
            ...props.keyData,
            ...updateData,
            expires_at: expiresAt
          });
        } else {
          const customKeyValue = useCustomKey.value ? customKey.value : null;
          const permissionsBitFlag = convertPermissionsToBitFlag(permissions.value);
          const createdKey = await createApiKey(keyName.value, expiresAt, permissionsBitFlag, "GENERAL", customKeyValue, basicPath.value);
          if (!createdKey || !createdKey.key) {
            throw new Error(t("admin.keyManagement.createModal.errors.createFailed", "创建密钥失败"));
          }
          await updateApiKeyStorageAcl(createdKey.id, selectedStorageConfigIds.value);
          emit(
            "created",
            {
              id: createdKey.id,
              name: createdKey.name,
              key: createdKey.key,
              key_masked: createdKey.key.substring(0, 6) + "...",
              permissions: createdKey.permissions,
              role: createdKey.role,
              basic_path: basicPath.value,
              created_at: createdKey.created_at,
              expires_at: expiresAt,
              last_used: null
            },
            createdKey.key
          );
          resetForm();
        }
      } catch (e) {
        log.error("API密钥操作失败:", e);
        error.value = e.message || (props.isEditMode ? t("admin.keyManagement.editModal.errors.updateFailed", "更新密钥失败") : t("admin.keyManagement.createModal.errors.createFailed", "创建密钥失败"));
      } finally {
        isLoading.value = false;
      }
    };
    const handleCancel = () => {
      emit("close");
    };
    __expose({
      resetForm,
      setBasicPath: (path) => {
        basicPath.value = path;
        selectedPath.value = path;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["relative rounded-lg shadow-xl w-full max-h-[85vh] sm:max-h-[85vh] overflow-hidden max-w-sm sm:max-w-xl flex flex-col", __props.darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["px-4 py-3 sm:py-4 border-b flex justify-between items-center sticky top-0 z-10", [__props.darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"]])
        }, [
          createBaseVNode("h3", {
            class: normalizeClass(["text-lg leading-6 font-medium", __props.darkMode ? "text-white" : "text-gray-900"])
          }, toDisplayString(formTitle.value), 3),
          createBaseVNode("button", {
            onClick: handleCancel,
            class: normalizeClass(["rounded-md p-1 inline-flex items-center justify-center", __props.darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"])
          }, [
            createBaseVNode("span", _hoisted_1$2, toDisplayString(_ctx.$t("admin.keyManagement.createModal.close")), 1),
            createVNode(unref(IconClose), { size: "md" })
          ], 2)
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(["border-b", __props.darkMode ? "border-gray-700" : "border-gray-200"])
        }, [
          createBaseVNode("nav", _hoisted_2$2, [
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => activeTab.value = "basic"),
              class: normalizeClass(["px-4 py-2 text-sm font-medium", [
                activeTab.value === "basic" ? __props.darkMode ? "border-b-2 border-primary-500 text-primary-400" : "border-b-2 border-primary-500 text-primary-600" : __props.darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"
              ]])
            }, toDisplayString(_ctx.$t(__props.isEditMode ? "admin.keyManagement.editModal.tabs.basic" : "admin.keyManagement.createModal.tabs.basic", "基本信息")), 3),
            permissions.value.mount_view ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: switchToPathTab,
              class: normalizeClass(["px-4 py-2 text-sm font-medium", [
                activeTab.value === "path" ? __props.darkMode ? "border-b-2 border-primary-500 text-primary-400" : "border-b-2 border-primary-500 text-primary-600" : __props.darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"
              ]])
            }, toDisplayString(_ctx.$t(__props.isEditMode ? "admin.keyManagement.editModal.tabs.path" : "admin.keyManagement.createModal.tabs.path", "路径选择")), 3)) : createCommentVNode("", true)
          ])
        ], 2),
        createBaseVNode("div", _hoisted_3$2, [
          activeTab.value === "basic" ? (openBlock(), createElementBlock("div", _hoisted_4$2, [
            createBaseVNode("div", null, [
              createBaseVNode("label", {
                for: __props.isEditMode ? "edit-key-name" : "key-name",
                class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-300" : "text-gray-700"])
              }, toDisplayString(_ctx.$t(__props.isEditMode ? "admin.keyManagement.editModal.keyName" : "admin.keyManagement.createModal.keyName")), 11, _hoisted_5$2),
              withDirectives(createBaseVNode("input", {
                id: __props.isEditMode ? "edit-key-name" : "key-name",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => keyName.value = $event),
                type: "text",
                placeholder: _ctx.$t(__props.isEditMode ? "admin.keyManagement.editModal.keyNamePlaceholder" : "admin.keyManagement.createModal.keyNamePlaceholder"),
                class: normalizeClass(["w-full p-2 rounded-md border", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"]),
                disabled: __props.isEditMode && isGuestKey.value
              }, null, 10, _hoisted_6$2), [
                [vModelText, keyName.value]
              ]),
              createBaseVNode("p", {
                class: normalizeClass(["mt-1 text-sm", __props.darkMode ? "text-gray-400" : "text-gray-500"])
              }, toDisplayString(_ctx.$t(__props.isEditMode ? "admin.keyManagement.editModal.keyNameHelp" : "admin.keyManagement.createModal.keyNameHelp")), 3)
            ]),
            !__props.isEditMode ? (openBlock(), createElementBlock("div", _hoisted_7$2, [
              createBaseVNode("div", _hoisted_8$2, [
                withDirectives(createBaseVNode("input", {
                  id: "use-custom-key",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => useCustomKey.value = $event),
                  type: "checkbox",
                  class: normalizeClass(["h-4 w-4 rounded", __props.darkMode ? "bg-gray-700 border-gray-600 text-primary-600" : "bg-white border-gray-300 text-primary-500"])
                }, null, 2), [
                  [vModelCheckbox, useCustomKey.value]
                ]),
                createBaseVNode("label", {
                  for: "use-custom-key",
                  class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, toDisplayString(_ctx.$t("admin.keyManagement.createModal.useCustomKey")), 3)
              ]),
              useCustomKey.value ? (openBlock(), createElementBlock("div", _hoisted_9$2, [
                createBaseVNode("label", {
                  for: "custom-key",
                  class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, toDisplayString(_ctx.$t("admin.keyManagement.createModal.customKey")), 3),
                withDirectives(createBaseVNode("input", {
                  id: "custom-key",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => customKey.value = $event),
                  type: "text",
                  placeholder: _ctx.$t("admin.keyManagement.createModal.customKeyPlaceholder"),
                  class: normalizeClass(["w-full p-2 rounded-md border", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"])
                }, null, 10, _hoisted_10$2), [
                  [vModelText, customKey.value]
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["mt-1 text-sm", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(_ctx.$t("admin.keyManagement.createModal.customKeyHelp")), 3)
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            createBaseVNode("div", null, [
              createBaseVNode("label", {
                for: __props.isEditMode ? "edit-key-expiration" : "key-expiration",
                class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-300" : "text-gray-700"])
              }, toDisplayString(_ctx.$t(__props.isEditMode ? "admin.keyManagement.editModal.expiration" : "admin.keyManagement.createModal.expiration")), 11, _hoisted_11$2),
              withDirectives(createBaseVNode("select", {
                id: __props.isEditMode ? "edit-key-expiration" : "key-expiration",
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => expiration.value = $event),
                class: normalizeClass(["w-full p-2 rounded-md border", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"]),
                disabled: __props.isEditMode && isGuestKey.value
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(expirationOptions.value, (option) => {
                  return openBlock(), createElementBlock("option", {
                    key: option.value,
                    value: option.value
                  }, toDisplayString(option.label), 9, _hoisted_13$2);
                }), 128))
              ], 10, _hoisted_12$2), [
                [vModelSelect, expiration.value]
              ])
            ]),
            isCustomExpiration.value && !(__props.isEditMode && isGuestKey.value) ? (openBlock(), createElementBlock("div", _hoisted_14$1, [
              createBaseVNode("label", {
                for: __props.isEditMode ? "edit-custom-expiration" : "custom-expiration",
                class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-300" : "text-gray-700"])
              }, toDisplayString(_ctx.$t(__props.isEditMode ? "admin.keyManagement.editModal.customExpiration" : "admin.keyManagement.createModal.customExpiration")), 11, _hoisted_15$1),
              withDirectives(createBaseVNode("input", {
                id: __props.isEditMode ? "edit-custom-expiration" : "custom-expiration",
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => customExpiration.value = $event),
                type: "datetime-local",
                class: normalizeClass(["w-full p-2 rounded-md border", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"])
              }, null, 10, _hoisted_16$1), [
                [vModelText, customExpiration.value]
              ])
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_17$1, [
              createBaseVNode("div", null, [
                createBaseVNode("h4", {
                  class: normalizeClass(["text-sm font-medium mb-2", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, toDisplayString(_ctx.$t("admin.keyManagement.permissions.basic", "基础权限")), 3),
                createBaseVNode("div", _hoisted_18$1, [
                  createBaseVNode("div", _hoisted_19$1, [
                    withDirectives(createBaseVNode("input", {
                      id: __props.isEditMode ? "edit-text-permission" : "text-permission",
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => permissions.value.text = $event),
                      type: "checkbox",
                      class: normalizeClass(["h-4 w-4 rounded", __props.darkMode ? "bg-gray-700 border-gray-600 text-primary-600" : "bg-white border-gray-300 text-primary-500"])
                    }, null, 10, _hoisted_20$1), [
                      [vModelCheckbox, permissions.value.text]
                    ]),
                    createBaseVNode("label", {
                      for: __props.isEditMode ? "edit-text-permission" : "text-permission",
                      class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                    }, toDisplayString(_ctx.$t("admin.keyManagement.permissions.text", "文本分享")), 11, _hoisted_21$1)
                  ]),
                  createBaseVNode("div", _hoisted_22, [
                    withDirectives(createBaseVNode("input", {
                      id: __props.isEditMode ? "edit-text-manage-permission" : "text-manage-permission",
                      "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => permissions.value.text_manage = $event),
                      type: "checkbox",
                      class: normalizeClass(["h-4 w-4 rounded", __props.darkMode ? "bg-gray-700 border-gray-600 text-primary-600" : "bg-white border-gray-300 text-primary-500"])
                    }, null, 10, _hoisted_23), [
                      [vModelCheckbox, permissions.value.text_manage]
                    ]),
                    createBaseVNode("label", {
                      for: __props.isEditMode ? "edit-text-manage-permission" : "text-manage-permission",
                      class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                    }, toDisplayString(_ctx.$t("admin.keyManagement.permissions.text_manage", "文本管理")), 11, _hoisted_24)
                  ]),
                  createBaseVNode("div", _hoisted_25, [
                    withDirectives(createBaseVNode("input", {
                      id: __props.isEditMode ? "edit-file-permission" : "file-permission",
                      "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => permissions.value.file_share = $event),
                      type: "checkbox",
                      class: normalizeClass(["h-4 w-4 rounded", __props.darkMode ? "bg-gray-700 border-gray-600 text-primary-600" : "bg-white border-gray-300 text-primary-500"])
                    }, null, 10, _hoisted_26), [
                      [vModelCheckbox, permissions.value.file_share]
                    ]),
                    createBaseVNode("label", {
                      for: __props.isEditMode ? "edit-file-permission" : "file-permission",
                      class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                    }, toDisplayString(_ctx.$t("admin.keyManagement.permissions.file_share", "文件分享")), 11, _hoisted_27)
                  ]),
                  createBaseVNode("div", _hoisted_28, [
                    withDirectives(createBaseVNode("input", {
                      id: __props.isEditMode ? "edit-file-manage-permission" : "file-manage-permission",
                      "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => permissions.value.file_manage = $event),
                      type: "checkbox",
                      class: normalizeClass(["h-4 w-4 rounded", __props.darkMode ? "bg-gray-700 border-gray-600 text-primary-600" : "bg-white border-gray-300 text-primary-500"])
                    }, null, 10, _hoisted_29), [
                      [vModelCheckbox, permissions.value.file_manage]
                    ]),
                    createBaseVNode("label", {
                      for: __props.isEditMode ? "edit-file-manage-permission" : "file-manage-permission",
                      class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                    }, toDisplayString(_ctx.$t("admin.keyManagement.permissions.file_manage", "文件管理")), 11, _hoisted_30)
                  ])
                ])
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("h4", {
                  class: normalizeClass(["text-sm font-medium mb-2", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, toDisplayString(_ctx.$t("admin.keyManagement.permissions.mount", "挂载页权限")), 3),
                createBaseVNode("div", _hoisted_31, [
                  createBaseVNode("div", _hoisted_32, [
                    withDirectives(createBaseVNode("input", {
                      id: __props.isEditMode ? "edit-mount-view" : "mount-view",
                      "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => permissions.value.mount_view = $event),
                      type: "checkbox",
                      class: normalizeClass(["h-4 w-4 rounded", __props.darkMode ? "bg-gray-700 border-gray-600 text-primary-600" : "bg-white border-gray-300 text-primary-500"])
                    }, null, 10, _hoisted_33), [
                      [vModelCheckbox, permissions.value.mount_view]
                    ]),
                    createBaseVNode("label", {
                      for: __props.isEditMode ? "edit-mount-view" : "mount-view",
                      class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                    }, toDisplayString(_ctx.$t("admin.keyManagement.permissions.mount_view", "查看")), 11, _hoisted_34)
                  ]),
                  createBaseVNode("div", _hoisted_35, [
                    withDirectives(createBaseVNode("input", {
                      id: __props.isEditMode ? "edit-mount-upload" : "mount-upload",
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => permissions.value.mount_upload = $event),
                      type: "checkbox",
                      class: normalizeClass(["h-4 w-4 rounded", __props.darkMode ? "bg-gray-700 border-gray-600 text-primary-600" : "bg-white border-gray-300 text-primary-500"])
                    }, null, 10, _hoisted_36), [
                      [vModelCheckbox, permissions.value.mount_upload]
                    ]),
                    createBaseVNode("label", {
                      for: __props.isEditMode ? "edit-mount-upload" : "mount-upload",
                      class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                    }, toDisplayString(_ctx.$t("admin.keyManagement.permissions.mount_upload", "上传")), 11, _hoisted_37)
                  ]),
                  createBaseVNode("div", _hoisted_38, [
                    withDirectives(createBaseVNode("input", {
                      id: __props.isEditMode ? "edit-mount-copy" : "mount-copy",
                      "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => permissions.value.mount_copy = $event),
                      type: "checkbox",
                      class: normalizeClass(["h-4 w-4 rounded", __props.darkMode ? "bg-gray-700 border-gray-600 text-primary-600" : "bg-white border-gray-300 text-primary-500"])
                    }, null, 10, _hoisted_39), [
                      [vModelCheckbox, permissions.value.mount_copy]
                    ]),
                    createBaseVNode("label", {
                      for: __props.isEditMode ? "edit-mount-copy" : "mount-copy",
                      class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                    }, toDisplayString(_ctx.$t("admin.keyManagement.permissions.mount_copy", "复制")), 11, _hoisted_40)
                  ]),
                  createBaseVNode("div", _hoisted_41, [
                    withDirectives(createBaseVNode("input", {
                      id: __props.isEditMode ? "edit-mount-rename" : "mount-rename",
                      "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => permissions.value.mount_rename = $event),
                      type: "checkbox",
                      class: normalizeClass(["h-4 w-4 rounded", __props.darkMode ? "bg-gray-700 border-gray-600 text-primary-600" : "bg-white border-gray-300 text-primary-500"])
                    }, null, 10, _hoisted_42), [
                      [vModelCheckbox, permissions.value.mount_rename]
                    ]),
                    createBaseVNode("label", {
                      for: __props.isEditMode ? "edit-mount-rename" : "mount-rename",
                      class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                    }, toDisplayString(_ctx.$t("admin.keyManagement.permissions.mount_rename", "重命名")), 11, _hoisted_43)
                  ]),
                  createBaseVNode("div", _hoisted_44, [
                    withDirectives(createBaseVNode("input", {
                      id: __props.isEditMode ? "edit-mount-delete" : "mount-delete",
                      "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => permissions.value.mount_delete = $event),
                      type: "checkbox",
                      class: normalizeClass(["h-4 w-4 rounded", __props.darkMode ? "bg-gray-700 border-gray-600 text-primary-600" : "bg-white border-gray-300 text-primary-500"])
                    }, null, 10, _hoisted_45), [
                      [vModelCheckbox, permissions.value.mount_delete]
                    ]),
                    createBaseVNode("label", {
                      for: __props.isEditMode ? "edit-mount-delete" : "mount-delete",
                      class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                    }, toDisplayString(_ctx.$t("admin.keyManagement.permissions.mount_delete", "删除")), 11, _hoisted_46)
                  ])
                ])
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("h4", {
                  class: normalizeClass(["text-sm font-medium mb-2", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, toDisplayString(_ctx.$t("admin.keyManagement.permissions.webdav", "WebDAV权限")), 3),
                createBaseVNode("div", _hoisted_47, [
                  createBaseVNode("div", _hoisted_48, [
                    withDirectives(createBaseVNode("input", {
                      id: __props.isEditMode ? "edit-webdav-read" : "webdav-read",
                      "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => permissions.value.webdav_read = $event),
                      type: "checkbox",
                      class: normalizeClass(["h-4 w-4 rounded", __props.darkMode ? "bg-gray-700 border-gray-600 text-primary-600" : "bg-white border-gray-300 text-primary-500"])
                    }, null, 10, _hoisted_49), [
                      [vModelCheckbox, permissions.value.webdav_read]
                    ]),
                    createBaseVNode("label", {
                      for: __props.isEditMode ? "edit-webdav-read" : "webdav-read",
                      class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                    }, toDisplayString(_ctx.$t("admin.keyManagement.permissions.webdav_read", "WebDAV读取")), 11, _hoisted_50)
                  ]),
                  createBaseVNode("div", _hoisted_51, [
                    withDirectives(createBaseVNode("input", {
                      id: __props.isEditMode ? "edit-webdav-manage" : "webdav-manage",
                      "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => permissions.value.webdav_manage = $event),
                      type: "checkbox",
                      class: normalizeClass(["h-4 w-4 rounded", __props.darkMode ? "bg-gray-700 border-gray-600 text-primary-600" : "bg-white border-gray-300 text-primary-500"])
                    }, null, 10, _hoisted_52), [
                      [vModelCheckbox, permissions.value.webdav_manage]
                    ]),
                    createBaseVNode("label", {
                      for: __props.isEditMode ? "edit-webdav-manage" : "webdav-manage",
                      class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                    }, toDisplayString(_ctx.$t("admin.keyManagement.permissions.webdav_manage", "WebDAV管理")), 11, _hoisted_53)
                  ])
                ])
              ])
            ]),
            permissions.value.mount_view ? (openBlock(), createElementBlock("div", _hoisted_54, [
              createBaseVNode("label", {
                for: __props.isEditMode ? "edit-basic-path" : "basic-path",
                class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-300" : "text-gray-700"])
              }, toDisplayString(_ctx.$t(__props.isEditMode ? "admin.keyManagement.editModal.basicPath" : "admin.keyManagement.createModal.basicPath", "基本路径")), 11, _hoisted_55),
              createBaseVNode("div", _hoisted_56, [
                withDirectives(createBaseVNode("input", {
                  id: __props.isEditMode ? "edit-basic-path" : "basic-path",
                  "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => basicPath.value = $event),
                  type: "text",
                  placeholder: _ctx.$t(__props.isEditMode ? "admin.keyManagement.editModal.basicPathPlaceholder" : "admin.keyManagement.createModal.basicPathPlaceholder", "/"),
                  class: normalizeClass(["w-full p-2 rounded-l-md border", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"]),
                  readonly: ""
                }, null, 10, _hoisted_57), [
                  [vModelText, basicPath.value]
                ]),
                createBaseVNode("button", {
                  onClick: switchToPathTab,
                  class: normalizeClass(["px-2 py-0 rounded-r-md text-white h-[42px]", __props.darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"]),
                  title: _ctx.$t(__props.isEditMode ? "admin.keyManagement.editModal.selectPath" : "admin.keyManagement.createModal.selectPath", "选择路径")
                }, [
                  createVNode(unref(IconFolder), { size: "md" })
                ], 10, _hoisted_58)
              ]),
              createBaseVNode("p", {
                class: normalizeClass(["mt-1 text-sm", __props.darkMode ? "text-gray-400" : "text-gray-500"])
              }, toDisplayString(_ctx.$t(__props.isEditMode ? "admin.keyManagement.editModal.basicPathHelp" : "admin.keyManagement.createModal.basicPathHelp", "设置API密钥可访问的基本路径，默认为根路径")), 3)
            ])) : createCommentVNode("", true),
            createBaseVNode("div", null, [
              createBaseVNode("label", {
                class: normalizeClass(["block text-sm font-medium mb-1", __props.darkMode ? "text-gray-300" : "text-gray-700"])
              }, toDisplayString(_ctx.$t(
                __props.isEditMode ? "admin.keyManagement.editModal.storageAcl" : "admin.keyManagement.createModal.storageAcl",
                "可访问存储配置（可选）"
              )), 3),
              createBaseVNode("div", _hoisted_59, [
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(_ctx.$t(
                  "admin.keyManagement.storageAcl.help",
                  "不选择表示允许访问所有公开的存储配置。"
                )), 3),
                storageConfigs.value.length > 0 ? (openBlock(), createElementBlock("p", {
                  key: 0,
                  class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(selectedStorageConfigIds.value.length) + " / " + toDisplayString(storageConfigs.value.length), 3)) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["max-h-40 overflow-y-auto border rounded-md p-2", __props.darkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"])
              }, [
                storageConfigs.value.length === 0 ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(_ctx.$t("admin.keyManagement.storageAcl.empty", "暂无存储配置或尚未加载。")), 3)) : (openBlock(), createElementBlock("div", _hoisted_60, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(storageConfigs.value, (config) => {
                    return openBlock(), createElementBlock("label", {
                      key: config.id,
                      class: normalizeClass([
                        "flex items-start space-x-2 cursor-pointer rounded-md border px-2 py-1.5 transition",
                        selectedStorageConfigIds.value.includes(config.id) ? __props.darkMode ? "border-primary-500 bg-primary-500/10" : "border-primary-500 bg-primary-50" : __props.darkMode ? "border-gray-700 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"
                      ])
                    }, [
                      withDirectives(createBaseVNode("input", {
                        type: "checkbox",
                        class: normalizeClass(["h-4 w-4 mt-0.5 rounded", __props.darkMode ? "bg-gray-700 border-gray-600 text-primary-500" : "bg-white border-gray-300 text-primary-500"]),
                        value: config.id,
                        "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => selectedStorageConfigIds.value = $event)
                      }, null, 10, _hoisted_61), [
                        [vModelCheckbox, selectedStorageConfigIds.value]
                      ]),
                      createBaseVNode("div", _hoisted_62, [
                        createBaseVNode("div", _hoisted_63, [
                          createBaseVNode("span", _hoisted_64, toDisplayString(config.name || config.id), 1),
                          createBaseVNode("span", {
                            class: normalizeClass(["px-1.5 py-0.5 text-[11px] rounded-full", __props.darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"])
                          }, toDisplayString(config.storage_type || "UNKNOWN"), 3),
                          config.is_public === 1 || config.is_public === true ? (openBlock(), createElementBlock("span", {
                            key: 0,
                            class: normalizeClass(["px-1.5 py-0.5 text-[11px] rounded-full", __props.darkMode ? "bg-green-900/40 text-green-300" : "bg-green-100 text-green-700"])
                          }, toDisplayString(_ctx.$t("admin.keyManagement.storageAcl.public", "公开")), 3)) : createCommentVNode("", true)
                        ]),
                        config.remark ? (openBlock(), createElementBlock("p", {
                          key: 0,
                          class: normalizeClass(["mt-0.5 text-[11px] truncate", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                        }, toDisplayString(config.remark), 3)) : createCommentVNode("", true)
                      ])
                    ], 2);
                  }), 128))
                ]))
              ], 2)
            ]),
            createBaseVNode("div", {
              class: normalizeClass(["p-3 rounded-md text-sm", __props.darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"])
            }, [
              createBaseVNode("p", _hoisted_65, toDisplayString(_ctx.$t(__props.isEditMode ? "admin.keyManagement.editModal.securityTip" : "admin.keyManagement.createModal.securityTip", "安全提示")), 1),
              createBaseVNode("p", null, toDisplayString(_ctx.$t(
                __props.isEditMode ? "admin.keyManagement.editModal.securityMessage" : "admin.keyManagement.createModal.securityMessage",
                "请妥善保管您的API密钥，不要在公共场所或不安全的环境中使用。"
              )), 1)
            ], 2)
          ])) : activeTab.value === "path" ? (openBlock(), createElementBlock("div", _hoisted_66, [
            createBaseVNode("div", {
              class: normalizeClass(["mb-3 text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
            }, [
              createTextVNode(toDisplayString(_ctx.$t(__props.isEditMode ? "admin.keyManagement.editModal.pathSelector.currentPath" : "admin.keyManagement.createModal.pathSelector.currentPath", "当前选择")) + ": ", 1),
              createBaseVNode("span", _hoisted_67, toDisplayString(selectedPath.value), 1)
            ], 2),
            createBaseVNode("div", {
              class: normalizeClass(["border rounded-md overflow-hidden mb-4 h-64", __props.darkMode ? "border-gray-700" : "border-gray-300"])
            }, [
              isLoadingMounts.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["h-full flex justify-center items-center", __props.darkMode ? "text-gray-400" : "text-gray-500"])
              }, [
                createVNode(unref(IconRefresh), {
                  size: "md",
                  class: "animate-spin mr-2"
                }),
                createBaseVNode("span", null, toDisplayString(_ctx.$t(__props.isEditMode ? "admin.keyManagement.editModal.pathSelector.loading" : "admin.keyManagement.createModal.pathSelector.loading", "加载中...")), 1)
              ], 2)) : (openBlock(), createElementBlock("div", _hoisted_68, [
                createBaseVNode("div", _hoisted_69, [
                  createBaseVNode("div", {
                    class: normalizeClass(["tree-item", { selected: selectedPath.value === "/" }]),
                    onClick: _cache[19] || (_cache[19] = ($event) => selectPath("/"))
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["flex items-center py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer", { "bg-blue-50 dark:bg-blue-900/30": selectedPath.value === "/" }])
                    }, [
                      createVNode(unref(IconHome), {
                        size: "sm",
                        class: normalizeClass(["flex-shrink-0 mr-2", __props.darkMode ? "text-blue-400" : "text-blue-600"])
                      }, null, 8, ["class"]),
                      createBaseVNode("span", {
                        class: normalizeClass(["truncate", [__props.darkMode ? "text-gray-200" : "text-gray-700", selectedPath.value === "/" ? "font-medium text-blue-600 dark:text-blue-400" : ""]])
                      }, toDisplayString(_ctx.$t(__props.isEditMode ? "admin.keyManagement.editModal.pathSelector.rootDirectory" : "admin.keyManagement.createModal.pathSelector.rootDirectory", "根目录")), 3)
                    ], 2)
                  ], 2),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(rootDirectories.value, (item) => {
                    return openBlock(), createElementBlock("div", {
                      key: item.path,
                      class: "folder-item"
                    }, [
                      createVNode(DirectoryItemVue, {
                        item,
                        "current-path": selectedPath.value,
                        "dark-mode": __props.darkMode,
                        level: 0,
                        onSelect: selectPath
                      }, null, 8, ["item", "current-path", "dark-mode"])
                    ]);
                  }), 128))
                ])
              ]))
            ], 2),
            error.value ? (openBlock(), createElementBlock("div", _hoisted_70, toDisplayString(error.value), 1)) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_71, [
              createBaseVNode("button", {
                onClick: confirmPathSelection,
                class: normalizeClass(["px-3 py-1.5 text-sm rounded-md text-white", __props.darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"])
              }, toDisplayString(_ctx.$t(__props.isEditMode ? "admin.keyManagement.editModal.pathSelector.confirm" : "admin.keyManagement.createModal.pathSelector.confirm", "确认路径")), 3)
            ])
          ])) : createCommentVNode("", true),
          activeTab.value === "basic" && error.value ? (openBlock(), createElementBlock("div", _hoisted_72, toDisplayString(error.value), 1)) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", {
          class: normalizeClass(["px-3 sm:px-4 py-2 sm:py-3 border-t transition-colors duration-200 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-2 space-y-reverse sm:space-y-0", __props.darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"])
        }, [
          createBaseVNode("button", {
            onClick: handleCancel,
            class: normalizeClass(["w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-200 hover:bg-gray-300 text-gray-700"]),
            disabled: isLoading.value
          }, toDisplayString(_ctx.$t(__props.isEditMode ? "admin.keyManagement.editModal.cancel" : "admin.keyManagement.createModal.cancel")), 11, _hoisted_73),
          createBaseVNode("button", {
            onClick: handleSubmit,
            type: "button",
            class: normalizeClass(["w-full sm:w-auto flex justify-center items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-white", [isLoading.value ? "opacity-70 cursor-not-allowed" : "hover:bg-primary-600", __props.darkMode ? "bg-primary-600" : "bg-primary-500"]]),
            disabled: isLoading.value
          }, [
            isLoading.value ? (openBlock(), createElementBlock("span", _hoisted_75, toDisplayString(processingButtonText.value), 1)) : (openBlock(), createElementBlock("span", _hoisted_76, toDisplayString(saveButtonText.value), 1))
          ], 10, _hoisted_74)
        ], 2)
      ], 2);
    };
  }
};
const KeyForm = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-2b047a3c"]]);
const _hoisted_1$1 = { class: "flex flex-col" };
const _hoisted_2$1 = {
  key: 0,
  class: "flex flex-col items-center justify-center h-40"
};
const _hoisted_3$1 = { class: "text-lg font-semibold mb-2" };
const _hoisted_4$1 = { key: 2 };
const _hoisted_5$1 = { class: "space-y-3 p-2" };
const _hoisted_6$1 = { class: "flex items-start justify-between mb-3" };
const _hoisted_7$1 = { class: "flex items-start gap-2 flex-1 min-w-0" };
const _hoisted_8$1 = ["checked", "onChange", "disabled"];
const _hoisted_9$1 = { class: "min-w-0 flex-1" };
const _hoisted_10$1 = { class: "mt-1.5" };
const _hoisted_11$1 = ["onClick", "aria-checked", "title"];
const _hoisted_12$1 = { class: "flex items-center justify-between" };
const _hoisted_13$1 = ["onClick"];
const _hoisted_14 = { class: "mb-3" };
const _hoisted_15 = { class: "flex flex-wrap gap-1.5" };
const _hoisted_16 = ["title"];
const _hoisted_17 = { class: "font-semibold" };
const _hoisted_18 = { class: "opacity-75" };
const _hoisted_19 = ["title"];
const _hoisted_20 = ["onClick"];
const _hoisted_21 = ["onClick", "disabled"];
const _sfc_main$1 = {
  __name: "KeyTable",
  props: {
    darkMode: {
      type: Boolean,
      required: true
    },
    apiKeys: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    availableMounts: {
      type: Array,
      default: () => []
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  emits: ["refresh", "edit", "success", "error", "selected-keys-change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { t } = useI18n();
    const log = createLogger("KeyTable");
    const { deleteApiKey } = useAdminApiKeyService();
    const { dialogState, confirm, handleConfirm, handleCancel } = useConfirmDialog();
    const props = __props;
    const emit = __emit;
    const error = ref(null);
    ref(null);
    const selectedKeys = ref([]);
    const isGuestKey = (key) => (key.role || "GENERAL") === "GUEST";
    const getPermissionGroups = (permissions) => {
      const groups = [];
      let baseCount = 0;
      const basePerms = [];
      if (PermissionChecker.hasPermission(permissions, Permission.TEXT_SHARE)) {
        baseCount++;
        basePerms.push(t("admin.keyManagement.permissions.text", "文本分享"));
      }
      if (PermissionChecker.hasPermission(permissions, Permission.TEXT_MANAGE)) {
        baseCount++;
        basePerms.push(t("admin.keyManagement.permissions.text_manage", "文本管理"));
      }
      if (PermissionChecker.hasPermission(permissions, Permission.FILE_SHARE)) {
        baseCount++;
        basePerms.push(t("admin.keyManagement.permissions.file_share", "文件分享"));
      }
      if (PermissionChecker.hasPermission(permissions, Permission.FILE_MANAGE)) {
        baseCount++;
        basePerms.push(t("admin.keyManagement.permissions.file_manage", "文件管理"));
      }
      if (baseCount > 0) {
        groups.push({
          name: t("admin.keyManagement.permissions.basic", "基础"),
          count: baseCount,
          items: basePerms,
          color: "blue"
        });
      }
      let mountCount = 0;
      const mountPerms = [];
      if (PermissionChecker.hasPermission(permissions, Permission.MOUNT_VIEW)) {
        mountCount++;
        mountPerms.push(t("admin.keyManagement.permissions.mount_view", "查看"));
      }
      if (PermissionChecker.hasPermission(permissions, Permission.MOUNT_UPLOAD)) {
        mountCount++;
        mountPerms.push(t("admin.keyManagement.permissions.mount_upload", "上传"));
      }
      if (PermissionChecker.hasPermission(permissions, Permission.MOUNT_COPY)) {
        mountCount++;
        mountPerms.push(t("admin.keyManagement.permissions.mount_copy", "复制"));
      }
      if (PermissionChecker.hasPermission(permissions, Permission.MOUNT_RENAME)) {
        mountCount++;
        mountPerms.push(t("admin.keyManagement.permissions.mount_rename", "重命名"));
      }
      if (PermissionChecker.hasPermission(permissions, Permission.MOUNT_DELETE)) {
        mountCount++;
        mountPerms.push(t("admin.keyManagement.permissions.mount_delete", "删除"));
      }
      if (mountCount > 0) {
        groups.push({
          name: t("admin.keyManagement.permissions.mount", "挂载"),
          count: mountCount,
          items: mountPerms,
          color: "purple"
        });
      }
      let webdavCount = 0;
      const webdavPerms = [];
      if (PermissionChecker.hasPermission(permissions, Permission.WEBDAV_READ)) {
        webdavCount++;
        webdavPerms.push(t("admin.keyManagement.permissions.webdav_read", "读取"));
      }
      if (PermissionChecker.hasPermission(permissions, Permission.WEBDAV_MANAGE)) {
        webdavCount++;
        webdavPerms.push(t("admin.keyManagement.permissions.webdav_manage", "管理"));
      }
      if (webdavCount > 0) {
        groups.push({
          name: t("admin.keyManagement.permissions.webdav", "WebDAV"),
          count: webdavCount,
          items: webdavPerms,
          color: "cyan"
        });
      }
      return groups;
    };
    const getGroupColorClass = (color) => {
      const colorMap = {
        blue: props.darkMode ? "bg-blue-500/15 text-blue-300 border-blue-400/30 hover:bg-blue-500/20" : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
        purple: props.darkMode ? "bg-purple-500/15 text-purple-300 border-purple-400/30 hover:bg-purple-500/20" : "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
        cyan: props.darkMode ? "bg-cyan-500/15 text-cyan-300 border-cyan-400/30 hover:bg-cyan-500/20" : "bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100"
      };
      return colorMap[color] || colorMap.blue;
    };
    const formatDate = (dateString) => {
      if (!dateString) return t("admin.keyManagement.neverExpires");
      if (dateString.startsWith("9999-")) {
        return t("admin.keyManagement.neverExpires");
      }
      return formatDateTime(dateString, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });
    };
    const getDisplayPath = (path) => {
      if (!path || path === "/") {
        return "/";
      }
      const mount = props.availableMounts.find((m) => m.mount_path === path);
      if (mount) {
        return `${mount.name} (${path})`;
      }
      if (path.length > 25) {
        const segments = path.split("/");
        if (segments.length <= 2) return path;
        const firstPart = segments[1];
        const lastPart = segments[segments.length - 1];
        const last = lastPart === "" ? segments[segments.length - 2] : lastPart;
        return `/${firstPart}/.../${last}${lastPart === "" ? "/" : ""}`;
      }
      return path;
    };
    const getRoleLabel = (key) => {
      const role = key.role || "GENERAL";
      if (role === "GUEST") return t("admin.keyManagement.role.guest", "游客");
      if (role === "ADMIN") return t("admin.keyManagement.role.admin", "管理员");
      return t("admin.keyManagement.role.general", "普通");
    };
    const keyColumns = computed(() => [
      // 名称列
      {
        key: "name",
        type: "accessor",
        header: t("admin.keyManagement.keyName"),
        sortable: true,
        render: (_, key) => {
          return h("div", { class: "flex flex-col" }, [
            h("span", {
              class: `font-medium ${props.darkMode ? "text-white" : "text-gray-900"}`,
              title: key.name
            }, key.name),
            // 角色徽章
            h("div", { class: "mt-1" }, [
              isGuestKey(key) ? h("span", {
                class: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${props.darkMode ? "bg-amber-500/15 text-amber-200 border border-amber-400/30" : "bg-amber-50 text-amber-700 border border-amber-200"}`
              }, [
                // 游客图标
                h("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-3 w-3",
                  viewBox: "0 0 20 20",
                  fill: "currentColor"
                }, [
                  h("path", {
                    "fill-rule": "evenodd",
                    d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",
                    "clip-rule": "evenodd"
                  })
                ]),
                getRoleLabel(key)
              ]) : h("span", {
                class: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${props.darkMode ? "bg-gray-700 text-gray-300 border border-gray-600" : "bg-gray-100 text-gray-700 border border-gray-300"}`
              }, getRoleLabel(key))
            ])
          ]);
        }
      },
      // 密钥列
      {
        key: "key",
        type: "display",
        header: t("admin.keyManagement.key"),
        sortable: false,
        render: (key) => {
          return h("div", { class: "flex items-center gap-2" }, [
            h("code", {
              class: `px-2 py-1 rounded text-xs font-mono ${props.darkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"}`
            }, key.key_masked || "CKP-···"),
            // 复制按钮
            h("button", {
              onClick: () => copyKeyToClipboard(key.key),
              class: `p-1.5 rounded-md transition-colors ${props.darkMode ? "hover:bg-slate-700 text-slate-400 hover:text-slate-200" : "hover:bg-slate-200 text-slate-500 hover:text-slate-700"}`,
              title: t("admin.keyManagement.copyKeyFull")
            }, [
              h("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                h("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                })
              ])
            ])
          ]);
        }
      },
      // 权限列（分组紧凑显示）
      {
        key: "permissions",
        type: "display",
        header: t("admin.keyManagement.permissionsColumn"),
        sortable: false,
        render: (key) => {
          const groups = getPermissionGroups(key.permissions || 0);
          if (groups.length === 0) {
            return h("span", {
              class: `text-xs ${props.darkMode ? "text-gray-400" : "text-gray-500"}`
            }, t("admin.keyManagement.permissions.none"));
          }
          const tooltipText = groups.map(
            (group) => `${group.name}: ${group.items.join("、")}`
          ).join("\n");
          return h("div", {
            class: "flex items-center gap-1.5",
            title: tooltipText
          }, groups.map(
            (group) => h("span", {
              class: `inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium cursor-help transition-colors ${getGroupColorClass(group.color)}`
            }, [
              h("span", { class: "font-semibold" }, group.name),
              h("span", { class: "opacity-75" }, `(${group.count})`)
            ])
          ));
        }
      },
      // 基础路径列
      {
        key: "basic_path",
        type: "display",
        header: t("admin.keyManagement.basicPath"),
        sortable: false,
        render: (key) => {
          return h("div", {
            class: `text-sm max-w-[180px] truncate ${props.darkMode ? "text-gray-400" : "text-gray-600"}`,
            title: key.basic_path
          }, getDisplayPath(key.basic_path));
        }
      },
      // 过期时间列
      {
        key: "expires_at",
        type: "accessor",
        header: t("admin.keyManagement.expiresAt"),
        sortable: true,
        render: (_, key) => {
          return h("span", {
            class: `text-sm ${props.darkMode ? "text-gray-400" : "text-gray-600"}`
          }, formatDate(key.expires_at));
        }
      },
      // 最后使用时间列
      {
        key: "last_used",
        type: "accessor",
        header: t("admin.keyManagement.lastUsed"),
        sortable: true,
        render: (_, key) => {
          return h("span", {
            class: `text-sm ${props.darkMode ? "text-gray-400" : "text-gray-600"}`
          }, key.last_used ? formatDate(key.last_used) : t("admin.keyManagement.neverUsed"));
        }
      },
      // 状态列（滑动开关）
      {
        key: "status",
        type: "display",
        header: t("admin.keyManagement.table.status"),
        sortable: false,
        render: (key) => {
          const enabled = typeof key.is_enable === "number" ? key.is_enable === 1 : !!key.is_enable;
          return h("div", { class: "flex items-center justify-center" }, [
            // 滑动开关
            h("button", {
              onClick: () => toggleKeyStatus(key),
              class: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${enabled ? "bg-emerald-500 focus:ring-emerald-500" : props.darkMode ? "bg-gray-600 focus:ring-gray-500" : "bg-gray-300 focus:ring-gray-400"}`,
              role: "switch",
              "aria-checked": enabled,
              title: enabled ? t("admin.keyManagement.clickToDisable") : t("admin.keyManagement.clickToEnable")
            }, [
              h("span", {
                class: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`
              })
            ])
          ]);
        }
      },
      // 操作列
      {
        key: "actions",
        type: "display",
        header: t("admin.keyManagement.actions"),
        sortable: false,
        render: (key) => {
          return h("div", { class: "flex justify-center space-x-2" }, [
            // 编辑按钮
            h("button", {
              onClick: () => openEditModal(key),
              class: `text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700`,
              title: t("admin.keyManagement.edit")
            }, [
              h("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-5 w-5",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                h("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                })
              ])
            ]),
            // 删除按钮
            h("button", {
              onClick: () => handleDeleteKey(key),
              disabled: isGuestKey(key),
              class: isGuestKey(key) ? "opacity-40 cursor-not-allowed text-gray-400 p-1.5" : "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700",
              title: isGuestKey(key) ? t("admin.keyManagement.error.cannotDeleteGuest") : t("admin.keyManagement.delete")
            }, [
              h("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-5 w-5",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                h("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                })
              ])
            ])
          ]);
        }
      }
    ]);
    const keyColumnClasses = computed(() => ({
      name: "",
      key: "",
      permissions: "hidden lg:table-cell text-center",
      basic_path: "hidden xl:table-cell text-center",
      expires_at: "hidden 2xl:table-cell text-center",
      last_used: "hidden 2xl:table-cell text-center",
      status: "text-center",
      actions: "text-center"
    }));
    const selectableKeys = computed(
      () => props.apiKeys.filter((key) => !isGuestKey(key)).map((key) => key.id)
    );
    const toggleSelectKey = (keyId) => {
      const key = props.apiKeys.find((k) => k.id === keyId);
      if (key && isGuestKey(key)) return;
      const index = selectedKeys.value.indexOf(keyId);
      if (index === -1) {
        selectedKeys.value.push(keyId);
      } else {
        selectedKeys.value.splice(index, 1);
      }
      emit("selected-keys-change", selectedKeys.value);
    };
    const handleSelectionChange = (event) => {
      if (event.type === "toggle-all") {
        if (selectedKeys.value.length === selectableKeys.value.length) {
          selectedKeys.value = [];
        } else {
          selectedKeys.value = [...selectableKeys.value];
        }
        emit("selected-keys-change", selectedKeys.value);
      } else if (event.type === "toggle-item") {
        toggleSelectKey(event.id);
      }
    };
    const toggleKeyStatus = async (key) => {
      const currentStatus = typeof key.is_enable === "number" ? key.is_enable === 1 : !!key.is_enable;
      const newStatus = !currentStatus;
      try {
        const { updateApiKey } = useAdminApiKeyService();
        await updateApiKey(key.id, { is_enable: newStatus });
        emit("success", t(newStatus ? "admin.keyManagement.success.enabled" : "admin.keyManagement.success.disabled"));
        emit("refresh");
      } catch (e) {
        log.error("切换API密钥状态失败:", e);
        error.value = e.message || t("admin.keyManagement.error.updateFailed");
        emit("error", error.value);
      }
    };
    const handleDeleteKey = async (key) => {
      if (isGuestKey(key)) {
        error.value = t("admin.keyManagement.error.cannotDeleteGuest");
        emit("error", error.value);
        return;
      }
      const confirmed = await confirm({
        title: t("common.dialogs.deleteTitle"),
        message: t("common.dialogs.deleteItem", { name: t("admin.keyManagement.item", "此 API 密钥") }),
        confirmType: "danger",
        confirmText: t("common.dialogs.deleteButton"),
        darkMode: props.darkMode
      });
      if (!confirmed) {
        return;
      }
      try {
        await deleteApiKey(key.id);
        const index = selectedKeys.value.indexOf(key.id);
        if (index !== -1) {
          selectedKeys.value.splice(index, 1);
          emit("selected-keys-change", selectedKeys.value);
        }
        emit("success", t("admin.keyManagement.success.deleted"));
        emit("refresh");
      } catch (e) {
        log.error("删除API密钥失败:", e);
        error.value = e.message || t("admin.keyManagement.error.deleteFailed");
        emit("error", error.value);
      }
    };
    const openEditModal = (key) => {
      emit("edit", key);
    };
    const copyKeyToClipboard = async (keyValue) => {
      try {
        const success = await copyToClipboard(keyValue);
        if (success) {
          emit("success", t("admin.keyManagement.success.copied"));
        } else {
          throw new Error(t("admin.keyManagement.error.copyFailed"));
        }
      } catch (e) {
        log.error("复制到剪贴板失败:", e);
        error.value = t("admin.keyManagement.error.copyFailed");
        emit("error", error.value);
      }
    };
    const clearSelectedKeys = () => {
      selectedKeys.value = [];
      emit("selected-keys-change", selectedKeys.value);
    };
    __expose({
      clearSelectedKeys,
      getSelectedKeys: () => selectedKeys.value
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        __props.isLoading && __props.apiKeys.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          createVNode(_sfc_main$3, {
            text: _ctx.$t("admin.keyManagement.loadingKeys"),
            "dark-mode": __props.darkMode,
            size: "xl",
            "icon-class": __props.darkMode ? "text-white" : "text-primary-500",
            "text-class": __props.darkMode ? "text-gray-300" : "text-gray-600"
          }, null, 8, ["text", "dark-mode", "icon-class", "text-class"])
        ])) : __props.apiKeys.length === 0 ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["text-center p-12 rounded-lg border-2 border-dashed", __props.darkMode ? "border-gray-700 text-gray-400 bg-gray-800/30" : "border-gray-200 text-gray-500 bg-gray-50"])
        }, [
          createVNode(unref(IconKey), {
            size: "4xl",
            class: "mx-auto mb-4 opacity-40",
            "aria-hidden": "true"
          }),
          createBaseVNode("p", _hoisted_3$1, toDisplayString(_ctx.$t("admin.keyManagement.noKeysTitle")), 1),
          createBaseVNode("p", null, toDisplayString(_ctx.$t("admin.keyManagement.noKeysDescription")), 1)
        ], 2)) : (openBlock(), createElementBlock("div", _hoisted_4$1, [
          createVNode(_sfc_main$4, {
            data: __props.apiKeys,
            columns: keyColumns.value,
            "column-classes": keyColumnClasses.value,
            selectable: true,
            "selected-items": selectedKeys.value,
            "row-id-field": "id",
            "empty-text": _ctx.$t("admin.keyManagement.table.noData"),
            onSelectionChange: handleSelectionChange
          }, {
            mobile: withCtx(({ data }) => [
              createBaseVNode("div", _hoisted_5$1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(data, (key) => {
                  return openBlock(), createElementBlock("div", {
                    key: key.id,
                    class: normalizeClass(["rounded-lg border p-4 transition-shadow hover:shadow-md", [
                      __props.darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white",
                      isGuestKey(key) ? __props.darkMode ? "ring-1 ring-amber-400/30" : "ring-1 ring-amber-200" : ""
                    ]])
                  }, [
                    createBaseVNode("div", _hoisted_6$1, [
                      createBaseVNode("div", _hoisted_7$1, [
                        createBaseVNode("input", {
                          type: "checkbox",
                          checked: selectedKeys.value.includes(key.id),
                          onChange: ($event) => toggleSelectKey(key.id),
                          disabled: isGuestKey(key),
                          class: normalizeClass(["rounded border-gray-300 text-primary-600 focus:ring-primary-500 flex-shrink-0 mt-0.5", __props.darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"])
                        }, null, 42, _hoisted_8$1),
                        createBaseVNode("div", _hoisted_9$1, [
                          createBaseVNode("h3", {
                            class: normalizeClass(["font-semibold truncate", __props.darkMode ? "text-white" : "text-gray-900"])
                          }, toDisplayString(key.name), 3),
                          createBaseVNode("div", _hoisted_10$1, [
                            createBaseVNode("span", {
                              class: normalizeClass([
                                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                                isGuestKey(key) ? __props.darkMode ? "bg-amber-500/15 text-amber-200 border border-amber-400/30" : "bg-amber-50 text-amber-700 border border-amber-200" : __props.darkMode ? "bg-gray-700 text-gray-300 border border-gray-600" : "bg-gray-100 text-gray-700 border border-gray-300"
                              ])
                            }, toDisplayString(getRoleLabel(key)), 3)
                          ])
                        ])
                      ]),
                      createBaseVNode("button", {
                        onClick: ($event) => toggleKeyStatus(key),
                        class: normalizeClass([
                          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0",
                          (typeof key.is_enable === "number" ? key.is_enable === 1 : !!key.is_enable) ? "bg-emerald-500 focus:ring-emerald-500" : __props.darkMode ? "bg-gray-600 focus:ring-gray-500" : "bg-gray-300 focus:ring-gray-400"
                        ]),
                        role: "switch",
                        "aria-checked": typeof key.is_enable === "number" ? key.is_enable === 1 : !!key.is_enable,
                        title: (typeof key.is_enable === "number" ? key.is_enable === 1 : !!key.is_enable) ? "点击禁用" : "点击启用"
                      }, [
                        createBaseVNode("span", {
                          class: normalizeClass([
                            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                            (typeof key.is_enable === "number" ? key.is_enable === 1 : !!key.is_enable) ? "translate-x-6" : "translate-x-1"
                          ])
                        }, null, 2)
                      ], 10, _hoisted_11$1)
                    ]),
                    createBaseVNode("div", {
                      class: normalizeClass(["mb-3 p-2 rounded", __props.darkMode ? "bg-slate-800/50" : "bg-slate-50"])
                    }, [
                      createBaseVNode("div", _hoisted_12$1, [
                        createBaseVNode("code", {
                          class: normalizeClass(["text-xs font-mono", __props.darkMode ? "text-slate-300" : "text-slate-700"])
                        }, toDisplayString(key.key_masked || "CKP-···"), 3),
                        createBaseVNode("button", {
                          onClick: ($event) => copyKeyToClipboard(key.key),
                          class: normalizeClass(["p-1.5 rounded-md text-xs transition-colors", __props.darkMode ? "bg-slate-700 hover:bg-slate-600 text-slate-300" : "bg-slate-200 hover:bg-slate-300 text-slate-700"])
                        }, " 复制 ", 10, _hoisted_13$1)
                      ])
                    ], 2),
                    createBaseVNode("div", _hoisted_14, [
                      createBaseVNode("div", {
                        class: normalizeClass(["text-xs font-medium mb-1.5", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                      }, "权限", 2),
                      createBaseVNode("div", _hoisted_15, [
                        getPermissionGroups(key.permissions || 0).length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(getPermissionGroups(key.permissions || 0), (group) => {
                          return openBlock(), createElementBlock("span", {
                            key: group.name,
                            class: normalizeClass(["inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium transition-colors", getGroupColorClass(group.color)]),
                            title: `${group.name}: ${group.items.join("、")}`
                          }, [
                            createBaseVNode("span", _hoisted_17, toDisplayString(group.name), 1),
                            createBaseVNode("span", _hoisted_18, "(" + toDisplayString(group.count) + ")", 1)
                          ], 10, _hoisted_16);
                        }), 128)) : (openBlock(), createElementBlock("span", {
                          key: 1,
                          class: normalizeClass(["px-2 py-1 text-xs rounded-md", __props.darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"])
                        }, toDisplayString(_ctx.$t("admin.keyManagement.permissions.none")), 3))
                      ])
                    ]),
                    createBaseVNode("div", {
                      class: normalizeClass(["grid grid-cols-2 gap-2 text-xs mb-3", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                    }, [
                      createBaseVNode("div", null, [
                        _cache[0] || (_cache[0] = createBaseVNode("div", { class: "font-medium mb-0.5" }, "基础路径", -1)),
                        createBaseVNode("div", {
                          class: "truncate",
                          title: key.basic_path
                        }, toDisplayString(getDisplayPath(key.basic_path)), 9, _hoisted_19)
                      ]),
                      createBaseVNode("div", null, [
                        _cache[1] || (_cache[1] = createBaseVNode("div", { class: "font-medium mb-0.5" }, "过期时间", -1)),
                        createBaseVNode("div", null, toDisplayString(formatDate(key.expires_at)), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _cache[2] || (_cache[2] = createBaseVNode("div", { class: "font-medium mb-0.5" }, "创建时间", -1)),
                        createBaseVNode("div", null, toDisplayString(formatDate(key.created_at)), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _cache[3] || (_cache[3] = createBaseVNode("div", { class: "font-medium mb-0.5" }, "最后使用", -1)),
                        createBaseVNode("div", null, toDisplayString(key.last_used ? formatDate(key.last_used) : _ctx.$t("admin.keyManagement.neverUsed")), 1)
                      ])
                    ], 2),
                    createBaseVNode("div", {
                      class: normalizeClass(["flex justify-end gap-2 pt-3 border-t", __props.darkMode ? "border-gray-700" : "border-gray-200"])
                    }, [
                      createBaseVNode("button", {
                        onClick: ($event) => openEditModal(key),
                        class: normalizeClass(["px-3 py-1.5 rounded-md text-sm font-medium transition-colors", __props.darkMode ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400" : "bg-blue-100 hover:bg-blue-200 text-blue-600"])
                      }, toDisplayString(_ctx.$t("admin.keyManagement.edit")), 11, _hoisted_20),
                      createBaseVNode("button", {
                        onClick: ($event) => handleDeleteKey(key),
                        disabled: isGuestKey(key),
                        class: normalizeClass(["px-3 py-1.5 rounded-md text-sm font-medium transition-colors", [
                          isGuestKey(key) ? "opacity-40 cursor-not-allowed bg-gray-600 text-gray-400" : __props.darkMode ? "bg-red-500/20 hover:bg-red-500/30 text-red-400" : "bg-red-100 hover:bg-red-200 text-red-600"
                        ]])
                      }, toDisplayString(_ctx.$t("admin.keyManagement.delete")), 11, _hoisted_21)
                    ], 2)
                  ], 2);
                }), 128))
              ])
            ]),
            _: 1
          }, 8, ["data", "columns", "column-classes", "selected-items", "empty-text"])
        ])),
        createVNode(_sfc_main$5, mergeProps(unref(dialogState), {
          onConfirm: unref(handleConfirm),
          onCancel: unref(handleCancel)
        }), null, 16, ["onConfirm", "onCancel"])
      ]);
    };
  }
};
const _hoisted_1 = { class: "p-3 sm:p-4 md:p-5 lg:p-6 flex-1 flex flex-col overflow-y-auto" };
const _hoisted_2 = { class: "flex flex-col space-y-3 mb-4" };
const _hoisted_3 = { class: "flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3" };
const _hoisted_4 = { class: "flex flex-wrap gap-2" };
const _hoisted_5 = { class: "hidden xs:inline" };
const _hoisted_6 = ["disabled"];
const _hoisted_7 = { class: "hidden xs:inline" };
const _hoisted_8 = { class: "xs:hidden" };
const _hoisted_9 = { class: "hidden xs:inline" };
const _hoisted_10 = { class: "xs:hidden" };
const _hoisted_11 = { class: "inline-flex items-center" };
const _hoisted_12 = { class: "overflow-hidden bg-white dark:bg-gray-800 shadow-md rounded-lg" };
const _hoisted_13 = {
  key: 0,
  class: "mt-4"
};
const _sfc_main = {
  __name: "KeyManagementView",
  setup(__props) {
    const { t } = useI18n();
    const log = createLogger("KeyManagementView");
    const { getAllApiKeys, deleteApiKey } = useAdminApiKeyService();
    const { getMountsList } = useAdminMountService();
    const { showSuccess, showError } = useGlobalMessage();
    const { isDarkMode: darkMode } = useThemeMode();
    const { dialogState, confirm, handleConfirm, handleCancel } = useConfirmDialog();
    const {
      isMobile,
      lastRefreshTime,
      updateLastRefreshTime,
      pagination,
      handlePaginationChange,
      resetPagination,
      updatePagination
    } = useAdminBase("key-management", {
      mobileDetect: { breakpoint: 768 }
    });
    const apiKeys = ref([]);
    const isLoading = ref(false);
    const showCreateModal = ref(false);
    const showEditModal = ref(false);
    const selectedKeys = ref([]);
    const editingKey = ref(null);
    const currentPageKeys = computed(() => {
      const start = (pagination.page - 1) * pagination.limit;
      const end = start + pagination.limit;
      return apiKeys.value.slice(start, end);
    });
    const handlePageChange = (page) => {
      handlePaginationChange(page, "page");
    };
    const keyFormRef = ref(null);
    const keyTableRef = ref(null);
    const availableMounts = ref([]);
    const loadApiKeys = async () => {
      isLoading.value = true;
      try {
        const keys = await getAllApiKeys();
        apiKeys.value = Array.isArray(keys) ? keys : [];
        resetPagination();
        updatePagination({ total: apiKeys.value.length }, "page");
        updateLastRefreshTime();
      } catch (e) {
        log.error("加载API密钥失败:", e);
        showError(e.message || t("admin.keyManagement.error.loadFailed"));
      } finally {
        isLoading.value = false;
      }
    };
    const loadMounts = async () => {
      try {
        const mounts = await getMountsList();
        availableMounts.value = (Array.isArray(mounts) ? mounts : []).filter((mount) => mount.is_active);
      } catch (error) {
        log.error("加载挂载点列表失败:", error);
        availableMounts.value = [];
      }
    };
    const openCreateModal = () => {
      showCreateModal.value = true;
    };
    const openEditModal = (key) => {
      editingKey.value = key;
      showEditModal.value = true;
    };
    const handleKeyCreated = (newKey, fullKey) => {
      if (fullKey) {
        (async () => {
          try {
            await copyToClipboard(fullKey);
            showSuccess(t("admin.keyManagement.success.createdAndCopied", "密钥已创建并复制到剪贴板"));
          } catch (e) {
            showSuccess(t("admin.keyManagement.success.created", "密钥已成功创建"));
          }
        })();
      } else {
        showSuccess(t("admin.keyManagement.success.created", "密钥已成功创建"));
      }
      apiKeys.value.unshift(newKey);
      showCreateModal.value = false;
    };
    const handleKeyUpdated = (updatedKey) => {
      const index = apiKeys.value.findIndex((key) => key.id === updatedKey.id);
      if (index !== -1) {
        apiKeys.value[index] = updatedKey;
      }
      showEditModal.value = false;
      showSuccess(t("admin.keyManagement.success.updated"));
    };
    const deleteSelectedKeys = async () => {
      if (selectedKeys.value.length === 0) {
        showError(t("admin.keyManagement.selectKeysFirst"));
        return;
      }
      const deletableIds = selectedKeys.value.filter((id) => {
        const key = apiKeys.value.find((k) => k.id === id);
        return key && (key.role || "GENERAL") !== "GUEST";
      });
      if (deletableIds.length === 0) {
        showError(t("admin.keyManagement.error.cannotDeleteGuest", "游客密钥不允许删除，请通过禁用或修改权限控制访问"));
        return;
      }
      const selectedCount = deletableIds.length;
      const confirmed = await confirm({
        title: t("common.dialogs.deleteTitle"),
        message: t("common.dialogs.deleteMultiple", { count: selectedCount }),
        confirmType: "danger",
        confirmText: t("common.dialogs.deleteButton") + ` (${selectedCount})`,
        darkMode: darkMode.value
      });
      if (!confirmed) {
        return;
      }
      isLoading.value = true;
      try {
        const promises = deletableIds.map((id) => deleteApiKey(id));
        await Promise.all(promises);
        selectedKeys.value = [];
        await loadApiKeys();
        if (keyTableRef.value) {
          keyTableRef.value.clearSelectedKeys();
        }
        showSuccess(t("admin.keyManagement.success.bulkDeleted", { count: selectedCount }));
      } catch (e) {
        log.error("批量删除密钥失败:", e);
        showError(t("admin.keyManagement.error.bulkDeleteFailed"));
      } finally {
        isLoading.value = false;
      }
    };
    const handleSelectedKeysChange = (keys) => {
      selectedKeys.value = keys;
    };
    onMounted(() => {
      loadApiKeys();
      loadMounts();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("h2", {
              class: normalizeClass(["text-lg sm:text-xl font-medium", unref(darkMode) ? "text-white" : "text-gray-900"])
            }, toDisplayString(_ctx.$t("admin.keyManagement.title")), 3),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("button", {
                onClick: loadApiKeys,
                class: normalizeClass(["inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-all duration-200 ease-in-out", unref(darkMode) ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"])
              }, [
                createVNode(unref(IconRefresh), {
                  size: "sm",
                  class: "mr-1.5"
                }),
                createBaseVNode("span", _hoisted_5, toDisplayString(_ctx.$t("admin.keyManagement.refresh")), 1)
              ], 2),
              createBaseVNode("button", {
                onClick: deleteSelectedKeys,
                disabled: selectedKeys.value.length === 0,
                class: normalizeClass(["inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-all duration-200 ease-in-out", [
                  selectedKeys.value.length === 0 ? "opacity-50 cursor-not-allowed bg-gray-400 dark:bg-gray-600" : unref(darkMode) ? "bg-red-600 hover:bg-red-700 text-white" : "bg-red-500 hover:bg-red-600 text-white"
                ]])
              }, [
                createVNode(unref(IconDelete), {
                  size: "sm",
                  class: "mr-1.5"
                }),
                createBaseVNode("span", _hoisted_7, toDisplayString(_ctx.$t("admin.keyManagement.bulkDelete")) + toDisplayString(selectedKeys.value.length ? `(${selectedKeys.value.length})` : ""), 1),
                createBaseVNode("span", _hoisted_8, toDisplayString(_ctx.$t("admin.keyManagement.delete")) + toDisplayString(selectedKeys.value.length ? `(${selectedKeys.value.length})` : ""), 1)
              ], 10, _hoisted_6),
              createBaseVNode("button", {
                onClick: openCreateModal,
                class: normalizeClass(["inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-all duration-200 ease-in-out", unref(darkMode) ? "bg-primary-600 hover:bg-primary-700 text-white" : "bg-primary-500 hover:bg-primary-600 text-white"])
              }, [
                createVNode(unref(IconKey), {
                  size: "sm",
                  class: "mr-1.5"
                }),
                createBaseVNode("span", _hoisted_9, toDisplayString(_ctx.$t("admin.keyManagement.create")), 1),
                createBaseVNode("span", _hoisted_10, toDisplayString(_ctx.$t("admin.keyManagement.createShort")), 1)
              ], 2)
            ])
          ]),
          unref(lastRefreshTime) ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["text-xs sm:text-sm", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
          }, [
            createBaseVNode("span", _hoisted_11, [
              createVNode(unref(IconClock), {
                size: "sm",
                class: "mr-1"
              }),
              createTextVNode(" " + toDisplayString(_ctx.$t("admin.keyManagement.lastRefreshed")) + ": " + toDisplayString(unref(lastRefreshTime)), 1)
            ])
          ], 2)) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_12, [
          createVNode(_sfc_main$1, {
            ref_key: "keyTableRef",
            ref: keyTableRef,
            "dark-mode": unref(darkMode),
            "api-keys": currentPageKeys.value,
            "is-loading": isLoading.value,
            "available-mounts": availableMounts.value,
            "is-mobile": unref(isMobile),
            onRefresh: loadApiKeys,
            onEdit: openEditModal,
            onSelectedKeysChange: handleSelectedKeysChange
          }, null, 8, ["dark-mode", "api-keys", "is-loading", "available-mounts", "is-mobile"])
        ]),
        !isLoading.value && apiKeys.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_13, [
          createVNode(_sfc_main$6, {
            "dark-mode": unref(darkMode),
            pagination: unref(pagination),
            mode: "page",
            onPageChanged: handlePageChange
          }, null, 8, ["dark-mode", "pagination"])
        ])) : createCommentVNode("", true),
        showCreateModal.value ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(["fixed inset-0 z-[60] overflow-y-auto flex items-center justify-center p-2 sm:p-4 pt-20 sm:pt-4", unref(darkMode) ? "bg-gray-900/75" : "bg-black/50"]),
          onClick: _cache[2] || (_cache[2] = ($event) => showCreateModal.value = false)
        }, [
          createVNode(KeyForm, {
            ref_key: "keyFormRef",
            ref: keyFormRef,
            "dark-mode": unref(darkMode),
            "available-mounts": availableMounts.value,
            "is-edit-mode": false,
            onClose: _cache[0] || (_cache[0] = ($event) => showCreateModal.value = false),
            onCreated: handleKeyCreated,
            onClick: _cache[1] || (_cache[1] = withModifiers(() => {
            }, ["stop"]))
          }, null, 8, ["dark-mode", "available-mounts"])
        ], 2)) : createCommentVNode("", true),
        showEditModal.value ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass(["fixed inset-0 z-[60] overflow-y-auto flex items-center justify-center p-2 sm:p-4 pt-20 sm:pt-4", unref(darkMode) ? "bg-gray-900/75" : "bg-black/50"]),
          onClick: _cache[5] || (_cache[5] = ($event) => showEditModal.value = false)
        }, [
          createVNode(KeyForm, {
            ref_key: "keyFormRef",
            ref: keyFormRef,
            "dark-mode": unref(darkMode),
            "key-data": editingKey.value,
            "available-mounts": availableMounts.value,
            "is-edit-mode": true,
            onClose: _cache[3] || (_cache[3] = ($event) => showEditModal.value = false),
            onUpdated: handleKeyUpdated,
            onClick: _cache[4] || (_cache[4] = withModifiers(() => {
            }, ["stop"]))
          }, null, 8, ["dark-mode", "key-data", "available-mounts"])
        ], 2)) : createCommentVNode("", true),
        createVNode(_sfc_main$5, mergeProps(unref(dialogState), {
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
