import { av as defineStore, c as createLogger, g as ref, F as computed, r as reactive, w as watch, j as createElementBlock, k as openBlock, l as createBaseVNode, p as createCommentVNode, t as toDisplayString, m as withModifiers, q as withDirectives, v as vModelText, ae as vModelSelect, aM as createStaticVNode, x as vModelCheckbox } from "./index-BQxzU9F1.js";
import { u as useFileshareService } from "./deleteSettingsStore-WCtYZw-P.js";
const useFileShareStore = defineStore("fileShare", () => {
  const service = useFileshareService();
  const log = createLogger("FileShareStore");
  const items = ref([]);
  const pagination = ref({
    total: 0,
    limit: 20,
    offset: 0
  });
  const searchTerm = ref("");
  const loading = ref(false);
  const error = ref(
    /** @type {string | null} */
    null
  );
  const lastLoadedAt = ref(
    /** @type {number | null} */
    null
  );
  const cacheById = ref(/* @__PURE__ */ new Map());
  const cacheBySlug = ref(/* @__PURE__ */ new Map());
  const isSearchMode = computed(() => !!searchTerm.value && searchTerm.value.trim().length > 0);
  const loadList = async ({ limit, offset, search } = {}) => {
    const finalLimit = typeof limit === "number" ? limit : pagination.value.limit;
    const finalOffset = typeof offset === "number" ? offset : pagination.value.offset;
    const normalizedSearch = typeof search === "string" ? search.trim() : searchTerm.value.trim();
    loading.value = true;
    error.value = null;
    searchTerm.value = normalizedSearch;
    try {
      const { files, pagination: serverPagination } = await service.fetchList({
        limit: finalLimit,
        offset: finalOffset,
        search: normalizedSearch || void 0
      });
      items.value = files;
      const mergedPagination = serverPagination && typeof serverPagination === "object" ? serverPagination : (
        /** @type {PaginationInfo} */
        {
          total: files.length,
          limit: finalLimit,
          offset: finalOffset
        }
      );
      pagination.value = mergedPagination;
      lastLoadedAt.value = Date.now();
      files.forEach((file) => {
        if (!file) return;
        if (file.id != null) {
          cacheById.value.set(file.id, file);
        }
        if (file.slug) {
          cacheBySlug.value.set(file.slug, file);
        }
      });
      return { files, pagination: mergedPagination };
    } catch (e) {
      log.error("加载文件分享列表失败:", e);
      error.value = /** @type {any} */
      e?.message || "加载文件分享列表失败";
      items.value = [];
      throw e;
    } finally {
      loading.value = false;
    }
  };
  const reloadCurrent = async () => {
    return loadList({});
  };
  const fetchById = async (id, { useCache = true, includeLinks = false } = {}) => {
    if (!id) {
      throw new Error("缺少文件 ID");
    }
    if (useCache && cacheById.value.has(id)) {
      const cached = cacheById.value.get(id) || null;
      const hasLinks = !!(cached && (cached.previewUrl || cached.downloadUrl));
      if (!includeLinks || hasLinks) {
        return cached;
      }
    }
    const file = await service.fetchById(id, includeLinks ? { includeLinks: true } : {});
    if (file) {
      if (file.id != null) {
        cacheById.value.set(file.id, file);
      }
      if (file.slug) {
        cacheBySlug.value.set(file.slug, file);
      }
    }
    return file || null;
  };
  const fetchBySlug = async (slug, { useCache = true } = {}) => {
    if (!slug) {
      throw new Error("缺少文件 slug");
    }
    if (useCache && cacheBySlug.value.has(slug)) {
      return cacheBySlug.value.get(slug) || null;
    }
    const file = await service.fetchBySlug(slug);
    if (file) {
      if (file.id != null) {
        cacheById.value.set(file.id, file);
      }
      if (file.slug) {
        cacheBySlug.value.set(file.slug, file);
      }
    }
    return file || null;
  };
  const updateCachedFile = (partial) => {
    if (!partial) return;
    const id = partial.id;
    const slug = partial.slug;
    const existing = id != null ? cacheById.value.get(id) : null;
    const merged = existing ? { ...existing, ...partial } : partial;
    if (id != null) {
      cacheById.value.set(id, merged);
    }
    if (slug) {
      cacheBySlug.value.set(slug, merged);
    }
    if (id != null) {
      items.value = items.value.map((file) => file && file.id === id ? (
        /** @type {FileshareItem} */
        merged
      ) : file);
    }
  };
  const removeFromStore = (id) => {
    if (!id) return;
    const existing = cacheById.value.get(id);
    if (existing && existing.slug) {
      cacheBySlug.value.delete(existing.slug);
    }
    cacheById.value.delete(id);
    const prevTotal = pagination.value.total || 0;
    items.value = items.value.filter((file) => file && file.id !== id);
    pagination.value = {
      ...pagination.value,
      total: prevTotal > 0 ? prevTotal - 1 : 0
    };
  };
  const resetState = () => {
    items.value = [];
    pagination.value = {
      total: 0,
      limit: pagination.value.limit,
      offset: 0
    };
    searchTerm.value = "";
    loading.value = false;
    error.value = null;
    lastLoadedAt.value = null;
    cacheById.value.clear();
    cacheBySlug.value.clear();
  };
  return {
    // 状态
    items,
    pagination,
    searchTerm,
    loading,
    error,
    lastLoadedAt,
    isSearchMode,
    // 衍生
    hasItems: computed(() => items.value.length > 0),
    // 行为
    loadList,
    reloadCurrent,
    fetchById,
    fetchBySlug,
    updateCachedFile,
    removeFromStore,
    resetState
  };
});
const _hoisted_1 = { class: "fixed inset-0 z-[60] overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 pt-20 sm:pt-4" };
const _hoisted_2 = { class: "relative rounded-lg max-w-sm sm:max-w-lg w-full mx-auto shadow-xl overflow-hidden bg-white dark:bg-gray-800 max-h-[95vh] sm:max-h-[85vh]" };
const _hoisted_3 = {
  class: "px-4 sm:px-6 py-3 sm:py-4 overflow-y-auto",
  style: { "max-height": "calc(95vh - 160px)" }
};
const _hoisted_4 = {
  key: 0,
  class: "mb-4 p-3 rounded bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
};
const _hoisted_5 = { class: "mb-4" };
const _hoisted_6 = ["value"];
const _hoisted_7 = { class: "mb-4" };
const _hoisted_8 = { class: "flex items-center" };
const _hoisted_9 = { class: "mb-4" };
const _hoisted_10 = { class: "mb-4" };
const _hoisted_11 = { class: "mb-4" };
const _hoisted_12 = { class: "mb-4" };
const _hoisted_13 = ["disabled"];
const _hoisted_14 = { class: "mt-2 flex items-center" };
const _hoisted_15 = ["disabled"];
const _hoisted_16 = {
  key: 0,
  class: "mt-1 text-xs text-yellow-500"
};
const _hoisted_17 = {
  key: 1,
  class: "mt-1 text-xs text-red-500"
};
const _hoisted_18 = { class: "mb-4" };
const _hoisted_19 = { class: "flex items-center" };
const _hoisted_20 = { class: "flex justify-end space-x-3 mt-6" };
const _hoisted_21 = ["disabled"];
const _sfc_main = {
  __name: "FileEditModal",
  props: {
    file: {
      type: Object,
      required: true
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const log = createLogger("FileEditModal");
    const props = __props;
    const emit = __emit;
    const error = ref("");
    const saving = ref(false);
    const clearPassword = ref(false);
    const fileData = reactive({
      id: "",
      filename: "",
      slug: "",
      remark: "",
      max_views: null,
      expires_at: null,
      password: "",
      use_proxy: false
    });
    const expiryOption = ref("0");
    watch(
      () => props.file,
      (newFile) => {
        if (newFile) {
          fileData.id = newFile.id;
          fileData.filename = newFile.filename;
          fileData.slug = newFile.slug || "";
          fileData.remark = newFile.remark || "";
          fileData.max_views = newFile.max_views || null;
          fileData.expires_at = newFile.expires_at || null;
          fileData.password = "";
          fileData.use_proxy = newFile.use_proxy === 1 || newFile.use_proxy === true;
          if (newFile.expires_at) {
            const now = /* @__PURE__ */ new Date();
            const expiresAt = new Date(newFile.expires_at);
            const hoursDiff = Math.round((expiresAt - now) / (1e3 * 60 * 60));
            if (hoursDiff <= 0) {
              expiryOption.value = "1";
            } else if (hoursDiff <= 12) {
              expiryOption.value = "1";
            } else if (hoursDiff <= 96) {
              expiryOption.value = "24";
            } else if (hoursDiff <= 336) {
              expiryOption.value = "168";
            } else if (hoursDiff <= 1440) {
              expiryOption.value = "720";
            } else {
              expiryOption.value = "720";
            }
          } else {
            expiryOption.value = "0";
          }
        }
      },
      { immediate: true }
    );
    const saveChanges = () => {
      error.value = "";
      saving.value = true;
      try {
        const updatedFile = {
          id: fileData.id,
          slug: fileData.slug.trim() || null,
          remark: fileData.remark.trim() || null,
          max_views: fileData.max_views !== null ? parseInt(fileData.max_views, 10) : null,
          use_proxy: fileData.use_proxy
        };
        if (fileData.password) {
          updatedFile.password = fileData.password;
        } else if (clearPassword.value) {
          updatedFile.password = "";
        }
        const expiryHours = parseInt(expiryOption.value);
        if (expiryHours > 0) {
          const expiresAt = /* @__PURE__ */ new Date();
          expiresAt.setHours(expiresAt.getHours() + expiryHours);
          updatedFile.expires_at = expiresAt.toISOString();
        } else {
          updatedFile.expires_at = null;
        }
        emit("save", updatedFile);
      } catch (err) {
        log.error("处理表单数据出错:", err);
        error.value = "数据处理错误，请检查输入";
      } finally {
        saving.value = false;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[20] || (_cache[20] = createBaseVNode("div", { class: "px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700" }, [
            createBaseVNode("h3", { class: "text-base sm:text-lg font-medium text-gray-900 dark:text-white" }, "编辑文件信息")
          ], -1)),
          createBaseVNode("div", _hoisted_3, [
            error.value ? (openBlock(), createElementBlock("div", _hoisted_4, toDisplayString(error.value), 1)) : createCommentVNode("", true),
            createBaseVNode("form", {
              onSubmit: withModifiers(saveChanges, ["prevent"])
            }, [
              createBaseVNode("div", _hoisted_5, [
                _cache[8] || (_cache[8] = createBaseVNode("label", { class: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" }, " 文件名 ", -1)),
                createBaseVNode("input", {
                  type: "text",
                  class: "w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-70 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white",
                  disabled: "",
                  value: fileData.filename
                }, null, 8, _hoisted_6)
              ]),
              createBaseVNode("div", _hoisted_7, [
                _cache[10] || (_cache[10] = createBaseVNode("label", { class: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" }, " 自定义短链接 ", -1)),
                createBaseVNode("div", _hoisted_8, [
                  _cache[9] || (_cache[9] = createBaseVNode("span", { class: "text-sm mr-1 text-gray-600 dark:text-gray-400" }, "/", -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "text",
                    class: "w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => fileData.slug = $event),
                    placeholder: "例如: my-file"
                  }, null, 512), [
                    [vModelText, fileData.slug]
                  ])
                ]),
                _cache[11] || (_cache[11] = createBaseVNode("p", { class: "mt-1 text-xs text-gray-500 dark:text-gray-400" }, "留空则系统自动生成", -1))
              ]),
              createBaseVNode("div", _hoisted_9, [
                _cache[12] || (_cache[12] = createBaseVNode("label", { class: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" }, " 备注信息 ", -1)),
                withDirectives(createBaseVNode("textarea", {
                  class: "w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => fileData.remark = $event),
                  rows: "2",
                  placeholder: "文件的描述信息"
                }, null, 512), [
                  [vModelText, fileData.remark]
                ])
              ]),
              createBaseVNode("div", _hoisted_10, [
                _cache[13] || (_cache[13] = createBaseVNode("label", { class: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" }, " 最大查看次数 ", -1)),
                withDirectives(createBaseVNode("input", {
                  type: "number",
                  class: "w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => fileData.max_views = $event),
                  min: "0",
                  placeholder: "留空表示无限制"
                }, null, 512), [
                  [vModelText, fileData.max_views]
                ])
              ]),
              createBaseVNode("div", _hoisted_11, [
                _cache[15] || (_cache[15] = createBaseVNode("label", { class: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" }, " 过期时间 ", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => expiryOption.value = $event),
                  class: "w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                }, _cache[14] || (_cache[14] = [
                  createStaticVNode('<option value="1">1小时</option><option value="24">1天</option><option value="168">7天</option><option value="720">30天</option><option value="0">永不过期</option>', 5)
                ]), 512), [
                  [vModelSelect, expiryOption.value]
                ])
              ]),
              createBaseVNode("div", _hoisted_12, [
                _cache[17] || (_cache[17] = createBaseVNode("label", { class: "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" }, " 访问密码 ", -1)),
                withDirectives(createBaseVNode("input", {
                  type: "text",
                  class: "w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white",
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => fileData.password = $event),
                  placeholder: "留空则不修改密码",
                  disabled: clearPassword.value
                }, null, 8, _hoisted_13), [
                  [vModelText, fileData.password]
                ]),
                createBaseVNode("div", _hoisted_14, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    id: "clear_password",
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => clearPassword.value = $event),
                    class: "rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700",
                    disabled: fileData.password.length > 0
                  }, null, 8, _hoisted_15), [
                    [vModelCheckbox, clearPassword.value]
                  ]),
                  _cache[16] || (_cache[16] = createBaseVNode("label", {
                    for: "clear_password",
                    class: "ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  }, " 清除密码保护 ", -1))
                ]),
                __props.file.has_password && !fileData.password && !clearPassword.value ? (openBlock(), createElementBlock("p", _hoisted_16, "留空将保持原密码不变")) : createCommentVNode("", true),
                clearPassword.value ? (openBlock(), createElementBlock("p", _hoisted_17, "警告：勾选此项将移除密码保护")) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_18, [
                createBaseVNode("div", _hoisted_19, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    id: "use_proxy",
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => fileData.use_proxy = $event),
                    class: "rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700"
                  }, null, 512), [
                    [vModelCheckbox, fileData.use_proxy]
                  ]),
                  _cache[18] || (_cache[18] = createBaseVNode("label", {
                    for: "use_proxy",
                    class: "ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  }, " 使用Worker代理访问 ", -1))
                ]),
                _cache[19] || (_cache[19] = createBaseVNode("p", { class: "mt-1 text-xs text-gray-500 dark:text-gray-400" }, "启用后，预览页将通过Worker代理，否则使用S3直链", -1))
              ]),
              createBaseVNode("div", _hoisted_20, [
                createBaseVNode("button", {
                  type: "button",
                  onClick: _cache[7] || (_cache[7] = ($event) => _ctx.$emit("close")),
                  class: "px-4 py-2 rounded-md text-sm font-medium transition-colors bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white"
                }, " 取消 "),
                createBaseVNode("button", {
                  type: "submit",
                  class: "px-4 py-2 rounded-md text-sm font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white",
                  disabled: saving.value
                }, toDisplayString(saving.value ? "保存中..." : "保存"), 9, _hoisted_21)
              ])
            ], 32)
          ])
        ])
      ]);
    };
  }
};
export {
  _sfc_main as _,
  useFileShareStore as u
};
