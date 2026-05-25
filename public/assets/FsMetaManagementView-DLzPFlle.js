import { e as useI18n, g as ref, F as computed, a$ as h, M as createBlock, k as openBlock, aE as withCtx, j as createElementBlock, K as Fragment, L as renderList, l as createBaseVNode, n as normalizeClass, t as toDisplayString, z as createVNode, y as unref, bh as IconRename, b7 as IconDelete, A as createTextVNode, aj as IconCheck, aK as _export_sfc, c as createLogger, aZ as useFsService, a_ as shallowRef, w as watch, G as IconClose, p as createCommentVNode, q as withDirectives, v as vModelText, b5 as IconFolder, x as vModelCheckbox, J as IconRefresh, m as withModifiers, ac as useThemeMode, o as onMounted, bd as IconFolderPlus, be as isRef, bb as IconClock, by as IconArchive } from "./index-BQxzU9F1.js";
import { u as useAdminBase } from "./useAdminBase-CxkodUK-.js";
import { d as deleteFsMeta, u as updateFsMeta, c as createFsMeta, g as getAllFsMeta } from "./fsMetaService-BlI_oFcH.js";
import { _ as _sfc_main$3 } from "./AdminTable-CrUS055e.js";
import { c as formatDateTime } from "./timeUtils-D81jJILb.js";
import { useAdminMountService } from "./mountService-B4-YQ1h1.js";
import { _ as _sfc_main$5 } from "./CommonPagination-WikHSq_I.js";
import { _ as _sfc_main$4 } from "./GlobalSearchBox-JKLU6Q9a.js";
function useFsMetaManagement() {
  const { t } = useI18n();
  const base = useAdminBase("fsMeta");
  const metaList = ref([]);
  const searchQuery = ref("");
  const isSearchMode = ref(false);
  const searchLoading = ref(false);
  const showForm = ref(false);
  const currentMeta = ref(null);
  const showDeleteConfirm = ref(false);
  const metaToDelete = ref(null);
  const filteredMetaList = computed(() => {
    if (!isSearchMode.value || !searchQuery.value.trim()) {
      return metaList.value;
    }
    const query = searchQuery.value.trim().toLowerCase();
    return metaList.value.filter(
      (meta) => meta.path.toLowerCase().includes(query)
    );
  });
  const paginatedMetaList = computed(() => {
    const start = base.pagination.offset;
    const end = start + base.pagination.limit;
    return filteredMetaList.value.slice(start, end);
  });
  const updatePaginationFromList = () => {
    const total = filteredMetaList.value.length;
    base.updatePagination({ total }, "offset");
  };
  const loadMetaList = async () => {
    return base.withLoading(async () => {
      const response = await getAllFsMeta();
      metaList.value = response.data || [];
      updatePaginationFromList();
      base.updateLastRefreshTime();
    }, {
      showErrorOnCatch: true
    }).catch((err) => {
      base.showError(err.message || t("admin.fsMeta.error.loadFailed"));
    });
  };
  const createMeta = async (data) => {
    return base.withLoading(async () => {
      await createFsMeta(data);
      await loadMetaList();
      base.showSuccess(t("admin.fsMeta.success.created"));
      return true;
    }, {
      showErrorOnCatch: false
    }).catch((err) => {
      base.showError(err.message || t("admin.fsMeta.error.createFailed"));
      return false;
    });
  };
  const updateMeta = async (id, data) => {
    return base.withLoading(async () => {
      await updateFsMeta(id, data);
      await loadMetaList();
      base.showSuccess(t("admin.fsMeta.success.updated"));
      return true;
    }, {
      showErrorOnCatch: false
    }).catch((err) => {
      base.showError(err.message || t("admin.fsMeta.error.updateFailed"));
      return false;
    });
  };
  const deleteMeta = async (id) => {
    return base.withLoading(async () => {
      await deleteFsMeta(id);
      await loadMetaList();
      base.showSuccess(t("admin.fsMeta.success.deleted"));
      return true;
    }, {
      showErrorOnCatch: false
    }).catch((err) => {
      base.showError(err.message || t("admin.fsMeta.error.deleteFailed"));
      return false;
    });
  };
  const handleGlobalSearch = (value) => {
    searchQuery.value = value;
    if (!value || value.trim().length < 2) {
      clearSearch();
      return;
    }
    searchLoading.value = true;
    isSearchMode.value = true;
    base.resetPagination();
    updatePaginationFromList();
    searchLoading.value = false;
  };
  const clearSearch = () => {
    searchQuery.value = "";
    isSearchMode.value = false;
    base.resetPagination();
    updatePaginationFromList();
  };
  const openCreateForm = () => {
    currentMeta.value = null;
    showForm.value = true;
  };
  const openEditForm = (meta) => {
    currentMeta.value = { ...meta };
    showForm.value = true;
  };
  const closeForm = () => {
    showForm.value = false;
    currentMeta.value = null;
  };
  const handleFormSave = async (data) => {
    let success;
    if (currentMeta.value) {
      success = await updateMeta(currentMeta.value.id, data);
    } else {
      success = await createMeta(data);
    }
    if (success) {
      closeForm();
      if (isSearchMode.value && searchQuery.value) {
        updatePaginationFromList();
      }
    }
    return success;
  };
  const confirmDelete = (meta) => {
    metaToDelete.value = meta;
    showDeleteConfirm.value = true;
  };
  const handleDelete = async () => {
    if (!metaToDelete.value) return false;
    const success = await deleteMeta(metaToDelete.value.id);
    if (success) {
      cancelDelete();
      if (isSearchMode.value && searchQuery.value) {
        updatePaginationFromList();
      }
    }
    return success;
  };
  const cancelDelete = () => {
    showDeleteConfirm.value = false;
    metaToDelete.value = null;
  };
  const handleOffsetChange = (newOffset) => {
    base.handlePaginationChange(newOffset, "offset");
  };
  const handlePageSizeChange = (newPageSize) => {
    base.changePageSize(newPageSize);
    updatePaginationFromList();
  };
  return {
    // 来自 useAdminBase 的状态
    loading: base.loading,
    error: base.error,
    pagination: base.pagination,
    pageSizeOptions: base.pageSizeOptions,
    lastRefreshTime: base.lastRefreshTime,
    // 业务数据
    metaList,
    filteredMetaList,
    paginatedMetaList,
    // 搜索状态
    searchQuery,
    isSearchMode,
    searchLoading,
    // 表单状态
    showForm,
    currentMeta,
    // 删除确认状态
    showDeleteConfirm,
    metaToDelete,
    // CRUD 方法
    loadMetaList,
    createMeta,
    updateMeta,
    deleteMeta,
    // 搜索方法
    handleGlobalSearch,
    clearSearch,
    // 表单方法
    openCreateForm,
    openEditForm,
    closeForm,
    handleFormSave,
    // 删除确认方法
    confirmDelete,
    handleDelete,
    cancelDelete,
    // 分页方法
    handleOffsetChange,
    handlePageSizeChange,
    // 工具方法
    showSuccess: base.showSuccess,
    showError: base.showError
  };
}
const _hoisted_1$2 = { class: "p-4" };
const _hoisted_2$2 = { class: "flex justify-between items-start mb-3" };
const _hoisted_3$2 = { class: "flex-1" };
const _hoisted_4$2 = { class: "flex space-x-2 ml-2" };
const _hoisted_5$2 = ["onClick"];
const _hoisted_6$2 = ["onClick"];
const _hoisted_7$2 = { class: "space-y-2 text-sm" };
const _hoisted_8$2 = { class: "flex items-center" };
const _hoisted_9$2 = { class: "text-gray-500 dark:text-gray-400 w-20 flex-shrink-0" };
const _hoisted_10$2 = {
  key: 1,
  class: "text-gray-400"
};
const _hoisted_11$2 = { class: "flex items-center" };
const _hoisted_12$2 = { class: "text-gray-500 dark:text-gray-400 w-20 flex-shrink-0" };
const _hoisted_13$2 = {
  key: 1,
  class: "text-gray-400"
};
const _hoisted_14$2 = { class: "flex items-center" };
const _hoisted_15$2 = { class: "text-gray-500 dark:text-gray-400 w-20 flex-shrink-0" };
const _hoisted_16$2 = {
  key: 1,
  class: "text-gray-400"
};
const _hoisted_17$2 = { class: "flex items-center" };
const _hoisted_18$2 = { class: "text-gray-500 dark:text-gray-400 w-20 flex-shrink-0" };
const _hoisted_19$2 = {
  key: 1,
  class: "text-gray-400 text-xs"
};
const _hoisted_20$2 = { class: "w-20 flex-shrink-0" };
const _sfc_main$2 = {
  __name: "FsMetaTable",
  props: {
    darkMode: {
      type: Boolean,
      required: true
    },
    metaList: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["edit", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const formatDate = (dateString) => {
      return formatDateTime(dateString);
    };
    const renderStatusBadge = (hasValue, inherit, darkMode) => {
      if (!hasValue) {
        return h(
          "span",
          {
            class: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium " + (darkMode ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-500")
          },
          "-"
        );
      }
      if (inherit) {
        return h(
          "span",
          {
            class: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium " + (darkMode ? "bg-blue-500/20 text-blue-300 border border-blue-400/30" : "bg-blue-50 text-blue-700 border border-blue-200")
          },
          [
            h(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-3 w-3",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              },
              [
                h("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M13 10V3L4 14h7v7l9-11h-7z"
                })
              ]
            ),
            t("admin.fsMeta.common.inherited")
          ]
        );
      }
      return h(
        "span",
        {
          class: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium " + (darkMode ? "bg-green-500/20 text-green-300 border border-green-400/30" : "bg-green-50 text-green-700 border border-green-200")
        },
        [
          h(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              class: "h-3 w-3",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            },
            [
              h("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M5 13l4 4L19 7"
              })
            ]
          ),
          t("admin.fsMeta.common.set")
        ]
      );
    };
    const metaColumns = computed(() => [
      {
        key: "path",
        type: "accessor",
        header: t("admin.fsMeta.table.path"),
        sortable: true,
        render: (_, meta) => {
          if (!meta) return h("span", t("admin.fsMeta.common.noDataCell"));
          return h(
            "span",
            {
              class: ["font-mono text-sm", props.darkMode ? "text-gray-100" : "text-gray-900"]
            },
            meta.path
          );
        }
      },
      {
        key: "headerMarkdown",
        type: "display",
        header: t("admin.fsMeta.table.headerMarkdown"),
        sortable: false,
        render: (meta) => {
          if (!meta) return h("span", t("admin.fsMeta.common.noDataCell"));
          return renderStatusBadge(meta.headerMarkdown, meta.headerInherit, props.darkMode);
        }
      },
      {
        key: "footerMarkdown",
        type: "display",
        header: t("admin.fsMeta.table.footerMarkdown"),
        sortable: false,
        render: (meta) => {
          if (!meta) return h("span", t("admin.fsMeta.common.noDataCell"));
          return renderStatusBadge(meta.footerMarkdown, meta.footerInherit, props.darkMode);
        }
      },
      {
        key: "hidePatterns",
        type: "display",
        header: t("admin.fsMeta.table.hidePatterns"),
        sortable: false,
        render: (meta) => {
          if (!meta) return h("span", t("admin.fsMeta.common.noDataCell"));
          if (!meta.hidePatterns || meta.hidePatterns.length === 0) {
            return h(
              "span",
              {
                class: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium " + (props.darkMode ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-500")
              },
              "-"
            );
          }
          if (meta.hideInherit) {
            return h(
              "span",
              {
                class: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium " + (props.darkMode ? "bg-purple-500/20 text-purple-300 border border-purple-400/30" : "bg-purple-50 text-purple-700 border border-purple-200")
              },
              [
                h(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-3 w-3",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  },
                  [
                    h("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M13 10V3L4 14h7v7l9-11h-7z"
                    })
                  ]
                ),
                t("admin.fsMeta.hidePatternsStatus.count", {
                  count: meta.hidePatterns.length
                }) + t("admin.fsMeta.common.inheritedSuffix")
              ]
            );
          }
          return h(
            "span",
            {
              class: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium " + (props.darkMode ? "bg-purple-500/20 text-purple-300 border border-purple-400/30" : "bg-purple-50 text-purple-700 border border-purple-200")
            },
            t("admin.fsMeta.hidePatternsStatus.count", {
              count: meta.hidePatterns.length
            })
          );
        }
      },
      {
        key: "password",
        type: "display",
        header: t("admin.fsMeta.table.password"),
        sortable: false,
        render: (meta) => {
          if (!meta) return h("span", t("admin.fsMeta.common.noDataCell"));
          const password = meta.password || "";
          if (!password) {
            return h(
              "span",
              {
                class: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium " + (props.darkMode ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-500")
              },
              t("admin.fsMeta.common.notSet")
            );
          }
          return h(
            "span",
            {
              class: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono " + (props.darkMode ? "bg-gray-800 text-amber-200 border border-amber-500/40" : "bg-amber-50 text-amber-700 border border-amber-200")
            },
            password
          );
        }
      },
      {
        key: "createdAt",
        type: "accessor",
        header: t("admin.fsMeta.table.createdAt"),
        sortable: true,
        render: (_, meta) => {
          if (!meta) return h("span", t("admin.fsMeta.common.noDataCell"));
          return h(
            "span",
            {
              class: "text-xs " + (props.darkMode ? "text-gray-400" : "text-gray-600")
            },
            formatDate(meta.createdAt)
          );
        }
      },
      {
        key: "actions",
        type: "display",
        header: t("admin.fsMeta.table.actions"),
        sortable: false,
        render: (meta) => {
          if (!meta) return h("span", t("admin.fsMeta.common.noDataCell"));
          return h("div", { class: "flex space-x-2" }, [
            // 编辑按钮
            h(
              "button",
              {
                class: "p-1.5 rounded-full transition-colors " + (props.darkMode ? "text-blue-400 hover:bg-gray-700 hover:text-blue-300" : "text-blue-600 hover:bg-gray-100 hover:text-blue-700"),
                title: t("admin.fsMeta.actions.edit"),
                onClick: () => emit("edit", meta)
              },
              [
                h(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-5 w-5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  },
                  [
                    h("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    })
                  ]
                )
              ]
            ),
            // 删除按钮
            h(
              "button",
              {
                class: "p-1.5 rounded-full transition-colors " + (props.darkMode ? "text-red-400 hover:bg-gray-700 hover:text-red-300" : "text-red-600 hover:bg-gray-100 hover:text-red-700"),
                title: t("admin.fsMeta.actions.delete"),
                onClick: () => emit("delete", meta)
              },
              [
                h(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-5 w-5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  },
                  [
                    h("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    })
                  ]
                )
              ]
            )
          ]);
        }
      }
    ]);
    const metaColumnClasses = computed(() => ({
      path: "",
      headerMarkdown: "hidden sm:table-cell text-center",
      footerMarkdown: "hidden sm:table-cell text-center",
      hidePatterns: "hidden md:table-cell text-center",
      password: "hidden md:table-cell text-center",
      createdAt: "hidden lg:table-cell text-center",
      actions: "text-center"
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$3, {
        data: __props.metaList,
        columns: metaColumns.value,
        "column-classes": metaColumnClasses.value,
        "manual-sorting": false,
        selectable: false,
        "row-id-field": "id",
        "empty-text": _ctx.$t("admin.fsMeta.table.noData")
      }, {
        mobile: withCtx(({ data }) => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(data, (meta) => {
            return openBlock(), createElementBlock("div", {
              key: meta.id,
              class: "bg-white dark:bg-gray-800 border-b dark:border-gray-700 last:border-b-0"
            }, [
              createBaseVNode("div", _hoisted_1$2, [
                createBaseVNode("div", _hoisted_2$2, [
                  createBaseVNode("div", _hoisted_3$2, [
                    createBaseVNode("span", {
                      class: normalizeClass(["font-mono font-semibold text-base", __props.darkMode ? "text-white" : "text-gray-900"])
                    }, toDisplayString(meta.path), 3)
                  ]),
                  createBaseVNode("div", _hoisted_4$2, [
                    createBaseVNode("button", {
                      onClick: ($event) => emit("edit", meta),
                      class: normalizeClass(["p-1.5 rounded-full transition-colors", __props.darkMode ? "text-blue-400 hover:bg-gray-700" : "text-blue-600 hover:bg-gray-100"]),
                      title: "编辑"
                    }, [
                      createVNode(unref(IconRename), { "aria-hidden": "true" })
                    ], 10, _hoisted_5$2),
                    createBaseVNode("button", {
                      onClick: ($event) => emit("delete", meta),
                      class: normalizeClass(["p-1.5 rounded-full transition-colors", __props.darkMode ? "text-red-400 hover:bg-gray-700" : "text-red-600 hover:bg-gray-100"]),
                      title: "删除"
                    }, [
                      createVNode(unref(IconDelete), { "aria-hidden": "true" })
                    ], 10, _hoisted_6$2)
                  ])
                ]),
                createBaseVNode("div", _hoisted_7$2, [
                  createBaseVNode("div", _hoisted_8$2, [
                    createBaseVNode("span", _hoisted_9$2, toDisplayString(_ctx.$t("admin.fsMeta.table.headerMarkdown")) + ": ", 1),
                    meta.headerMarkdown ? (openBlock(), createElementBlock("span", {
                      key: 0,
                      class: normalizeClass(["flex items-center", __props.darkMode ? "text-green-400" : "text-green-600"])
                    }, [
                      createVNode(unref(IconCheck), {
                        size: "sm",
                        class: "mr-1",
                        "aria-hidden": "true"
                      }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("admin.fsMeta.common.set")) + toDisplayString(meta.headerInherit ? _ctx.$t("admin.fsMeta.common.inheritedSuffix") : ""), 1)
                    ], 2)) : (openBlock(), createElementBlock("span", _hoisted_10$2, toDisplayString(_ctx.$t("admin.fsMeta.common.notSet")), 1))
                  ]),
                  createBaseVNode("div", _hoisted_11$2, [
                    createBaseVNode("span", _hoisted_12$2, toDisplayString(_ctx.$t("admin.fsMeta.table.footerMarkdown")) + ": ", 1),
                    meta.footerMarkdown ? (openBlock(), createElementBlock("span", {
                      key: 0,
                      class: normalizeClass(["flex items-center", __props.darkMode ? "text-green-400" : "text-green-600"])
                    }, [
                      createVNode(unref(IconCheck), {
                        size: "sm",
                        class: "mr-1",
                        "aria-hidden": "true"
                      }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("admin.fsMeta.common.set")) + toDisplayString(meta.footerInherit ? _ctx.$t("admin.fsMeta.common.inheritedSuffix") : ""), 1)
                    ], 2)) : (openBlock(), createElementBlock("span", _hoisted_13$2, toDisplayString(_ctx.$t("admin.fsMeta.common.notSet")), 1))
                  ]),
                  createBaseVNode("div", _hoisted_14$2, [
                    createBaseVNode("span", _hoisted_15$2, toDisplayString(_ctx.$t("admin.fsMeta.table.hidePatterns")) + ": ", 1),
                    meta.hidePatterns && meta.hidePatterns.length > 0 ? (openBlock(), createElementBlock("span", {
                      key: 0,
                      class: normalizeClass(["flex items-center", __props.darkMode ? "text-blue-400" : "text-blue-600"])
                    }, toDisplayString(_ctx.$t("admin.fsMeta.hidePatternsStatus.count", {
                      count: meta.hidePatterns.length
                    })) + toDisplayString(meta.hideInherit ? _ctx.$t("admin.fsMeta.common.inheritedSuffix") : ""), 3)) : (openBlock(), createElementBlock("span", _hoisted_16$2, toDisplayString(_ctx.$t("admin.fsMeta.common.notSet")), 1))
                  ]),
                  createBaseVNode("div", _hoisted_17$2, [
                    createBaseVNode("span", _hoisted_18$2, toDisplayString(_ctx.$t("admin.fsMeta.table.password")) + ": ", 1),
                    meta.hasPassword ? (openBlock(), createElementBlock("span", {
                      key: 0,
                      class: normalizeClass(["text-xs", __props.darkMode ? "text-amber-300" : "text-amber-700"])
                    }, toDisplayString(meta.passwordInherit ? _ctx.$t("admin.fsMeta.passwordStatus.inherited") : _ctx.$t("admin.fsMeta.passwordStatus.protected")), 3)) : (openBlock(), createElementBlock("span", _hoisted_19$2, toDisplayString(_ctx.$t("admin.fsMeta.common.notSet")), 1))
                  ]),
                  createBaseVNode("div", {
                    class: normalizeClass(["flex items-center text-xs", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                  }, [
                    createBaseVNode("span", _hoisted_20$2, toDisplayString(_ctx.$t("admin.fsMeta.table.createdAt")) + ": ", 1),
                    createBaseVNode("span", null, toDisplayString(formatDate(meta.createdAt)), 1)
                  ], 2)
                ])
              ])
            ]);
          }), 128))
        ]),
        _: 1
      }, 8, ["data", "columns", "column-classes", "empty-text"]);
    };
  }
};
const _hoisted_1$1 = { class: "sr-only" };
const _hoisted_2$1 = { class: "flex space-x-4 px-3 sm:px-4" };
const _hoisted_3$1 = { class: "px-3 sm:px-4 py-3 sm:py-4 overflow-y-auto flex-1" };
const _hoisted_4$1 = {
  key: 0,
  class: "space-y-3 sm:space-y-4"
};
const _hoisted_5$1 = { class: "flex" };
const _hoisted_6$1 = ["placeholder"];
const _hoisted_7$1 = ["title"];
const _hoisted_8$1 = ["placeholder"];
const _hoisted_9$1 = { class: "flex items-center space-x-2 mt-2" };
const _hoisted_10$1 = ["placeholder"];
const _hoisted_11$1 = { class: "flex items-center space-x-2 mt-2" };
const _hoisted_12$1 = ["placeholder"];
const _hoisted_13$1 = { class: "flex items-center space-x-2 mt-2" };
const _hoisted_14$1 = ["placeholder"];
const _hoisted_15$1 = { class: "flex items-center space-x-2 mt-2" };
const _hoisted_16$1 = {
  key: 0,
  class: "p-2 sm:p-3 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-xs sm:text-sm"
};
const _hoisted_17$1 = {
  key: 1,
  class: "space-y-3 sm:space-y-4"
};
const _hoisted_18$1 = {
  key: 0,
  class: "h-64 flex justify-center items-center"
};
const _hoisted_19$1 = {
  key: 1,
  class: "h-64 overflow-y-auto p-1"
};
const _hoisted_20$1 = { class: "file-tree" };
const _hoisted_21$1 = {
  class: "flex items-center py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer",
  style: { paddingLeft: "0.5rem" }
};
const _hoisted_22$1 = ["disabled"];
const _hoisted_23 = ["disabled"];
const _sfc_main$1 = {
  __name: "FsMetaForm",
  props: {
    darkMode: {
      type: Boolean,
      required: true
    },
    meta: {
      type: Object,
      default: null
    }
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const log = createLogger("FsMetaForm");
    const fsService = useFsService();
    const { getMountsList } = useAdminMountService();
    const directoryCache = shallowRef(/* @__PURE__ */ new Map());
    const props = __props;
    const emit = __emit;
    const formData = ref({
      path: "",
      headerMarkdown: "",
      headerInherit: false,
      footerMarkdown: "",
      footerInherit: false,
      hidePatterns: [],
      hideInherit: false,
      password: "",
      passwordInherit: false
    });
    const isLoading = ref(false);
    const error = ref(null);
    const activeTab = ref("basic");
    const isLoadingMounts = ref(false);
    const mountsList = ref([]);
    const selectedPath = ref("/");
    const rootDirectories = shallowRef([]);
    const hidePatternsText = computed({
      get: () => Array.isArray(formData.value.hidePatterns) ? formData.value.hidePatterns.join("\n") : "",
      set: (value) => {
        formData.value.hidePatterns = value.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
      }
    });
    const formTitle = computed(
      () => props.meta ? t("admin.fsMeta.form.titleEdit") : t("admin.fsMeta.form.titleCreate")
    );
    const submitButtonText = computed(() => {
      if (isLoading.value) {
        return props.meta ? t("admin.fsMeta.form.actions.updating") : t("admin.fsMeta.form.actions.creating");
      }
      return props.meta ? t("admin.fsMeta.form.actions.update") : t("admin.fsMeta.form.actions.create");
    });
    const resetForm = () => {
      formData.value = {
        path: "",
        headerMarkdown: "",
        headerInherit: false,
        footerMarkdown: "",
        footerInherit: false,
        hidePatterns: [],
        hideInherit: false,
        password: "",
        passwordInherit: false
      };
      error.value = null;
      activeTab.value = "basic";
    };
    watch(
      () => props.meta,
      (newMeta) => {
        if (newMeta) {
          formData.value = {
            path: newMeta.path || "",
            headerMarkdown: newMeta.headerMarkdown || "",
            headerInherit: newMeta.headerInherit || false,
            footerMarkdown: newMeta.footerMarkdown || "",
            footerInherit: newMeta.footerInherit || false,
            hidePatterns: Array.isArray(newMeta.hidePatterns) ? [...newMeta.hidePatterns] : [],
            hideInherit: newMeta.hideInherit || false,
            password: newMeta.password || "",
            passwordInherit: newMeta.passwordInherit || false
          };
        } else {
          resetForm();
        }
      },
      { immediate: true }
    );
    const handleSubmit = async () => {
      error.value = null;
      if (!formData.value.path.trim()) {
        error.value = t("admin.fsMeta.form.path.required");
        return;
      }
      let normalizedPath = formData.value.path.trim();
      if (!normalizedPath.startsWith("/")) {
        normalizedPath = `/${normalizedPath}`;
      }
      normalizedPath = normalizedPath.replace(/\/+$/, "") || "/";
      formData.value.path = normalizedPath;
      isLoading.value = true;
      try {
        const submitData = {
          path: formData.value.path,
          headerMarkdown: formData.value.headerMarkdown || null,
          headerInherit: formData.value.headerInherit,
          footerMarkdown: formData.value.footerMarkdown || null,
          footerInherit: formData.value.footerInherit,
          hidePatterns: formData.value.hidePatterns,
          hideInherit: formData.value.hideInherit,
          passwordInherit: formData.value.passwordInherit,
          password: formData.value.password || ""
        };
        emit("save", submitData);
      } catch (err) {
        log.error("表单提交失败:", err);
        error.value = err.message || t("admin.fsMeta.form.errors.submitFailed");
        isLoading.value = false;
      }
    };
    const DirectoryItemVue = {
      name: "DirectoryItemVue",
      props: {
        item: { type: Object, required: true },
        currentPath: { type: String, required: true },
        darkMode: { type: Boolean, default: false },
        level: { type: Number, default: 0 }
      },
      emits: ["select"],
      setup(props2, { emit: emit2 }) {
        const expanded = ref(false);
        const children = shallowRef([]);
        const loading = ref(false);
        const isSelected = computed(() => props2.currentPath === props2.item.path + "/");
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
                    path: (props2.item.path + "/" + item.name).replace(/\/\//g, "/"),
                    isDirectory: true
                  }));
                }
              } catch (err) {
                log.error("加载目录失败:", err);
              }
            }
            children.value = dirItems;
            directoryCache.value.set(cacheKey, dirItems);
          } finally {
            loading.value = false;
          }
        };
        watch(
          () => props2.currentPath,
          (newPath) => {
            if (newPath.startsWith(props2.item.path + "/") && newPath !== props2.item.path + "/") {
              expanded.value = true;
              if (children.value.length === 0) loadChildren();
            }
          },
          { immediate: true }
        );
        const toggleExpand = (event) => {
          event.stopPropagation();
          expanded.value = !expanded.value;
          if (expanded.value && children.value.length === 0) loadChildren();
        };
        const selectFolder = () => emit2("select", props2.item.path);
        return { expanded, children, loading, isSelected, toggleExpand, selectFolder };
      },
      render() {
        return h("div", { class: "directory-item" }, [
          h("div", { class: ["tree-item", { selected: this.isSelected }], onClick: this.selectFolder }, [
            h("div", { class: "flex items-center py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer", style: { paddingLeft: `${this.level * 0.75 + 0.5}rem` } }, [
              h("div", { class: "folder-toggle", onClick: (e) => {
                e.stopPropagation();
                this.toggleExpand(e);
              } }, [
                this.expanded ? h("svg", { class: "h-4 w-4", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "stroke-width": "2" }, [
                  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M19 9l-7 7-7-7" })
                ]) : h("svg", { class: "h-4 w-4", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "stroke-width": "2" }, [
                  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M9 5l7 7-7 7" })
                ])
              ]),
              h("svg", { class: ["h-4 w-4 flex-shrink-0 mr-2", this.darkMode ? "text-yellow-400" : "text-yellow-600"], xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "stroke-width": "2" }, [
                h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" })
              ]),
              h("span", { class: ["truncate", this.darkMode ? "text-gray-200" : "text-gray-700"] }, this.item.name)
            ])
          ]),
          this.expanded ? h("div", { class: "folder-children" }, [
            this.loading ? h("div", { class: "folder-loading", style: { paddingLeft: `${(this.level + 1) * 0.75 + 0.75}rem` } }, [
              h(IconRefresh, { class: "animate-spin h-3 w-3 mr-1", "aria-hidden": "true" }),
              h("span", { class: "text-xs" }, t("admin.fsMeta.common.loading"))
            ]) : this.children.length === 0 ? null : this.children.map(
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
    const loadMounts = async () => {
      if (mountsList.value.length > 0) return;
      isLoadingMounts.value = true;
      try {
        const mounts = await getMountsList();
        mountsList.value = (Array.isArray(mounts) ? mounts : []).filter((mount) => mount.is_active);
        rootDirectories.value = mountsList.value.map((mount) => ({
          name: mount.name,
          path: mount.mount_path,
          isDirectory: true
        }));
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
      selectedPath.value = formData.value.path || "/";
      activeTab.value = "path";
    };
    const selectPath = (path) => {
      selectedPath.value = path.endsWith("/") ? path : path + "/";
      formData.value.path = selectedPath.value;
      activeTab.value = "basic";
    };
    const handleCancel = () => {
      emit("close");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "fixed inset-0 z-[60] overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 pt-20 sm:pt-4",
        onClick: withModifiers(handleCancel, ["self"])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["w-full max-w-sm sm:max-w-lg md:max-w-2xl rounded-lg shadow-xl overflow-hidden max-h-[95vh] sm:max-h-[85vh] flex flex-col", __props.darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"])
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["px-3 sm:px-4 py-2 sm:py-3 border-b flex justify-between items-center sticky top-0 z-10", __props.darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"])
          }, [
            createBaseVNode("h3", {
              class: normalizeClass(["text-base sm:text-lg leading-6 font-medium", __props.darkMode ? "text-white" : "text-gray-900"])
            }, toDisplayString(formTitle.value), 3),
            createBaseVNode("button", {
              onClick: handleCancel,
              class: normalizeClass(["rounded-md p-0.5 sm:p-1 inline-flex items-center justify-center", __props.darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"])
            }, [
              createBaseVNode("span", _hoisted_1$1, toDisplayString(_ctx.$t("common.close")), 1),
              createVNode(unref(IconClose), {
                class: "h-4 w-4 sm:h-5 sm:w-5",
                "aria-hidden": "true"
              })
            ], 2)
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass(["border-b", __props.darkMode ? "border-gray-700" : "border-gray-200"])
          }, [
            createBaseVNode("div", _hoisted_2$1, [
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = ($event) => activeTab.value = "basic"),
                class: normalizeClass(["px-4 py-2 text-sm font-medium", [
                  activeTab.value === "basic" ? __props.darkMode ? "border-b-2 border-primary-500 text-primary-400" : "border-b-2 border-primary-500 text-primary-600" : __props.darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"
                ]])
              }, toDisplayString(_ctx.$t("admin.fsMeta.form.tabs.basic")), 3),
              createBaseVNode("button", {
                onClick: switchToPathTab,
                class: normalizeClass(["px-4 py-2 text-sm font-medium", [
                  activeTab.value === "path" ? __props.darkMode ? "border-b-2 border-primary-500 text-primary-400" : "border-b-2 border-primary-500 text-primary-600" : __props.darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"
                ]])
              }, toDisplayString(_ctx.$t("admin.fsMeta.form.tabs.path")), 3)
            ])
          ], 2),
          createBaseVNode("div", _hoisted_3$1, [
            activeTab.value === "basic" ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
              createBaseVNode("div", null, [
                createBaseVNode("label", {
                  for: "path",
                  class: normalizeClass(["block text-xs sm:text-sm font-medium mb-1", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, [
                  createTextVNode(toDisplayString(_ctx.$t("admin.fsMeta.form.path.label")) + " ", 1),
                  _cache[11] || (_cache[11] = createBaseVNode("span", { class: "text-red-500" }, "*", -1))
                ], 2),
                createBaseVNode("div", _hoisted_5$1, [
                  withDirectives(createBaseVNode("input", {
                    id: "path",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => formData.value.path = $event),
                    type: "text",
                    placeholder: _ctx.$t("admin.fsMeta.form.path.placeholder"),
                    class: normalizeClass(["flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border text-sm sm:text-base rounded-l-md", __props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"])
                  }, null, 10, _hoisted_6$1), [
                    [vModelText, formData.value.path]
                  ]),
                  createBaseVNode("button", {
                    onClick: switchToPathTab,
                    type: "button",
                    class: normalizeClass(["px-2 sm:px-3 py-1.5 sm:py-2 rounded-r-md text-white transition-colors", __props.darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"]),
                    title: _ctx.$t("admin.fsMeta.form.path.selectButton")
                  }, [
                    createVNode(unref(IconFolder), {
                      class: "h-4 w-4 sm:h-5 sm:w-5",
                      "aria-hidden": "true"
                    })
                  ], 10, _hoisted_7$1)
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(_ctx.$t("admin.fsMeta.form.path.helper")), 3)
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("label", {
                  for: "header-markdown",
                  class: normalizeClass(["block text-xs sm:text-sm font-medium mb-1", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, toDisplayString(_ctx.$t("admin.fsMeta.form.headerMarkdown.label")), 3),
                withDirectives(createBaseVNode("textarea", {
                  id: "header-markdown",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => formData.value.headerMarkdown = $event),
                  rows: "3",
                  placeholder: _ctx.$t("admin.fsMeta.form.headerMarkdown.placeholder"),
                  class: normalizeClass(["w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border font-mono text-xs sm:text-sm", __props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"])
                }, null, 10, _hoisted_8$1), [
                  [vModelText, formData.value.headerMarkdown]
                ]),
                createBaseVNode("div", _hoisted_9$1, [
                  withDirectives(createBaseVNode("input", {
                    id: "header-inherit",
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => formData.value.headerInherit = $event),
                    type: "checkbox",
                    class: normalizeClass(["h-3 w-3 sm:h-4 sm:w-4 rounded", __props.darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"])
                  }, null, 2), [
                    [vModelCheckbox, formData.value.headerInherit]
                  ]),
                  createBaseVNode("label", {
                    for: "header-inherit",
                    class: normalizeClass(["text-xs sm:text-sm", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                  }, toDisplayString(_ctx.$t("admin.fsMeta.form.headerMarkdown.inheritLabel")), 3)
                ])
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("label", {
                  for: "footer-markdown",
                  class: normalizeClass(["block text-xs sm:text-sm font-medium mb-1", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, toDisplayString(_ctx.$t("admin.fsMeta.form.footerMarkdown.label")), 3),
                withDirectives(createBaseVNode("textarea", {
                  id: "footer-markdown",
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => formData.value.footerMarkdown = $event),
                  rows: "3",
                  placeholder: _ctx.$t("admin.fsMeta.form.footerMarkdown.placeholder"),
                  class: normalizeClass(["w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border font-mono text-xs sm:text-sm", __props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"])
                }, null, 10, _hoisted_10$1), [
                  [vModelText, formData.value.footerMarkdown]
                ]),
                createBaseVNode("div", _hoisted_11$1, [
                  withDirectives(createBaseVNode("input", {
                    id: "footer-inherit",
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => formData.value.footerInherit = $event),
                    type: "checkbox",
                    class: normalizeClass(["h-3 w-3 sm:h-4 sm:w-4 rounded", __props.darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"])
                  }, null, 2), [
                    [vModelCheckbox, formData.value.footerInherit]
                  ]),
                  createBaseVNode("label", {
                    for: "footer-inherit",
                    class: normalizeClass(["text-xs sm:text-sm", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                  }, toDisplayString(_ctx.$t("admin.fsMeta.form.footerMarkdown.inheritLabel")), 3)
                ])
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("label", {
                  for: "hide-patterns",
                  class: normalizeClass(["block text-xs sm:text-sm font-medium mb-1", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, toDisplayString(_ctx.$t("admin.fsMeta.form.hidePatterns.label")), 3),
                withDirectives(createBaseVNode("textarea", {
                  id: "hide-patterns",
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => hidePatternsText.value = $event),
                  rows: "3",
                  placeholder: _ctx.$t("admin.fsMeta.form.hidePatterns.placeholder"),
                  class: normalizeClass(["w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border font-mono text-xs sm:text-sm", __props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"])
                }, null, 10, _hoisted_12$1), [
                  [vModelText, hidePatternsText.value]
                ]),
                createBaseVNode("div", _hoisted_13$1, [
                  withDirectives(createBaseVNode("input", {
                    id: "hide-inherit",
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => formData.value.hideInherit = $event),
                    type: "checkbox",
                    class: normalizeClass(["h-3 w-3 sm:h-4 sm:w-4 rounded", __props.darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"])
                  }, null, 2), [
                    [vModelCheckbox, formData.value.hideInherit]
                  ]),
                  createBaseVNode("label", {
                    for: "hide-inherit",
                    class: normalizeClass(["text-xs sm:text-sm", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                  }, toDisplayString(_ctx.$t("admin.fsMeta.form.hidePatterns.inheritLabel")), 3)
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(_ctx.$t("admin.fsMeta.form.hidePatterns.helper")), 3)
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("label", {
                  for: "password",
                  class: normalizeClass(["block text-xs sm:text-sm font-medium mb-1", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, toDisplayString(_ctx.$t("admin.fsMeta.form.password.label")), 3),
                withDirectives(createBaseVNode("input", {
                  id: "password",
                  "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => formData.value.password = $event),
                  type: "password",
                  placeholder: __props.meta ? _ctx.$t("admin.fsMeta.form.password.placeholderKeep") : _ctx.$t("admin.fsMeta.form.password.placeholderSetOptional"),
                  class: normalizeClass(["w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border text-sm sm:text-base", __props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"]),
                  autocomplete: "new-password"
                }, null, 10, _hoisted_14$1), [
                  [vModelText, formData.value.password]
                ]),
                createBaseVNode("div", _hoisted_15$1, [
                  withDirectives(createBaseVNode("input", {
                    id: "password-inherit",
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => formData.value.passwordInherit = $event),
                    type: "checkbox",
                    class: normalizeClass(["h-3 w-3 sm:h-4 sm:w-4 rounded", __props.darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"])
                  }, null, 2), [
                    [vModelCheckbox, formData.value.passwordInherit]
                  ]),
                  createBaseVNode("label", {
                    for: "password-inherit",
                    class: normalizeClass(["text-xs sm:text-sm", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                  }, toDisplayString(_ctx.$t("admin.fsMeta.form.password.inheritLabel")), 3)
                ]),
                createBaseVNode("p", {
                  class: normalizeClass(["mt-1 text-xs", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(_ctx.$t("admin.fsMeta.form.password.helper")), 3)
              ]),
              error.value ? (openBlock(), createElementBlock("div", _hoisted_16$1, toDisplayString(error.value), 1)) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            activeTab.value === "path" ? (openBlock(), createElementBlock("div", _hoisted_17$1, [
              createBaseVNode("div", null, [
                createBaseVNode("label", {
                  class: normalizeClass(["block text-xs sm:text-sm font-medium mb-1", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, toDisplayString(_ctx.$t("admin.fsMeta.form.pathSelector.currentSelection")), 3),
                createBaseVNode("div", {
                  class: normalizeClass(["w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border font-mono text-sm sm:text-base", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-800"])
                }, toDisplayString(selectedPath.value), 3)
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("label", {
                  class: normalizeClass(["block text-xs sm:text-sm font-medium mb-1", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, toDisplayString(_ctx.$t("admin.fsMeta.form.pathSelector.selectDirectory")), 3),
                createBaseVNode("div", {
                  class: normalizeClass(["border rounded-md overflow-hidden", __props.darkMode ? "border-gray-600" : "border-gray-300"])
                }, [
                  isLoadingMounts.value ? (openBlock(), createElementBlock("div", _hoisted_18$1, [
                    createVNode(unref(IconRefresh), {
                      size: "xl",
                      class: normalizeClass(["animate-spin", __props.darkMode ? "text-blue-400" : "text-blue-500"]),
                      "aria-hidden": "true"
                    }, null, 8, ["class"])
                  ])) : (openBlock(), createElementBlock("div", _hoisted_19$1, [
                    createBaseVNode("div", _hoisted_20$1, [
                      createBaseVNode("div", {
                        class: normalizeClass(["tree-item", { selected: selectedPath.value === "/" }]),
                        onClick: _cache[10] || (_cache[10] = ($event) => selectPath("/"))
                      }, [
                        createBaseVNode("div", _hoisted_21$1, [
                          createVNode(unref(IconFolder), {
                            size: "sm",
                            class: normalizeClass(["flex-shrink-0 mr-2", __props.darkMode ? "text-yellow-400" : "text-yellow-600"]),
                            "aria-hidden": "true"
                          }, null, 8, ["class"]),
                          createBaseVNode("span", {
                            class: normalizeClass(__props.darkMode ? "text-gray-200" : "text-gray-700")
                          }, "/", 2)
                        ])
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
                ], 2)
              ])
            ])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", {
            class: normalizeClass(["px-3 sm:px-4 py-2 sm:py-3 border-t flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-2 space-y-reverse sm:space-y-0", __props.darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"])
          }, [
            createBaseVNode("button", {
              onClick: handleCancel,
              class: normalizeClass(["w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-200 hover:bg-gray-300 text-gray-700"]),
              disabled: isLoading.value
            }, toDisplayString(_ctx.$t("admin.fsMeta.form.actions.cancel")), 11, _hoisted_22$1),
            createBaseVNode("button", {
              onClick: handleSubmit,
              type: "button",
              class: normalizeClass(["w-full sm:w-auto flex justify-center items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium text-white transition-colors", [isLoading.value ? "opacity-70 cursor-not-allowed" : "hover:bg-primary-600", __props.darkMode ? "bg-primary-600" : "bg-primary-500"]]),
              disabled: isLoading.value
            }, toDisplayString(submitButtonText.value), 11, _hoisted_23)
          ], 2)
        ], 2)
      ]);
    };
  }
};
const FsMetaForm = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1b146f15"]]);
const _hoisted_1 = { class: "p-3 sm:p-4 md:p-5 lg:p-6 flex-1 flex flex-col overflow-y-auto" };
const _hoisted_2 = { class: "flex flex-col space-y-3 mb-4" };
const _hoisted_3 = { class: "flex justify-between items-center" };
const _hoisted_4 = { class: "flex items-center space-x-2" };
const _hoisted_5 = { class: "hidden xs:inline" };
const _hoisted_6 = { class: "xs:hidden" };
const _hoisted_7 = ["disabled"];
const _hoisted_8 = { class: "hidden xs:inline" };
const _hoisted_9 = { class: "xs:hidden" };
const _hoisted_10 = { class: "w-full" };
const _hoisted_11 = { class: "flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0" };
const _hoisted_12 = {
  key: 0,
  class: "ml-2 text-blue-600 dark:text-blue-400"
};
const _hoisted_13 = {
  key: 1,
  class: "flex justify-between items-center mb-2 sm:mb-3"
};
const _hoisted_14 = { class: "inline-flex items-center" };
const _hoisted_15 = {
  key: 2,
  class: "flex justify-center items-center py-12 bg-white dark:bg-gray-800 shadow-md rounded-lg flex-1"
};
const _hoisted_16 = {
  key: 3,
  class: "overflow-hidden bg-white dark:bg-gray-800 shadow-md rounded-lg flex-1"
};
const _hoisted_17 = { class: "flex flex-col h-full" };
const _hoisted_18 = { class: "mb-4" };
const _hoisted_19 = {
  key: 5,
  class: "mt-2 mb-4 sm:mt-4 sm:mb-0"
};
const _hoisted_20 = { class: "text-lg font-semibold mb-4" };
const _hoisted_21 = { class: "mb-6" };
const _hoisted_22 = { class: "flex justify-end gap-2" };
const _sfc_main = {
  __name: "FsMetaManagementView",
  setup(__props) {
    const { isDarkMode: darkMode } = useThemeMode();
    const {
      // 状态
      loading,
      error,
      pagination,
      pageSizeOptions,
      lastRefreshTime,
      // 业务数据
      paginatedMetaList,
      // 搜索状态
      searchQuery,
      isSearchMode,
      searchLoading,
      // 表单状态
      showForm,
      currentMeta,
      // 删除确认状态
      showDeleteConfirm,
      metaToDelete,
      // CRUD 方法
      loadMetaList,
      // 搜索方法
      handleGlobalSearch,
      clearSearch,
      // 表单方法
      openCreateForm,
      openEditForm,
      closeForm,
      handleFormSave,
      // 删除确认方法
      confirmDelete,
      handleDelete,
      cancelDelete,
      // 分页方法
      handleOffsetChange,
      handlePageSizeChange
    } = useFsMetaManagement();
    onMounted(() => {
      loadMetaList();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("h2", {
              class: normalizeClass(["text-lg sm:text-xl font-medium", unref(darkMode) ? "text-white" : "text-gray-900"])
            }, toDisplayString(_ctx.$t("admin.fsMeta.title")), 3),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = (...args) => unref(openCreateForm) && unref(openCreateForm)(...args)),
                class: "inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }, [
                createVNode(unref(IconFolderPlus), { class: "h-3 w-3 sm:h-4 sm:w-4 mr-1" }),
                createBaseVNode("span", _hoisted_5, toDisplayString(_ctx.$t("admin.fsMeta.toolbar.create")), 1),
                createBaseVNode("span", _hoisted_6, toDisplayString(_ctx.$t("admin.fsMeta.toolbar.createShort")), 1)
              ]),
              createBaseVNode("button", {
                class: "inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
                onClick: _cache[1] || (_cache[1] = (...args) => unref(loadMetaList) && unref(loadMetaList)(...args)),
                disabled: unref(loading)
              }, [
                createVNode(unref(IconRefresh), {
                  class: normalizeClass(["h-3 w-3 sm:h-4 sm:w-4 mr-1", unref(loading) ? "animate-spin" : ""])
                }, null, 8, ["class"]),
                createBaseVNode("span", _hoisted_8, toDisplayString(unref(loading) ? _ctx.$t("admin.fsMeta.toolbar.refreshing") : _ctx.$t("admin.fsMeta.toolbar.refresh")), 1),
                createBaseVNode("span", _hoisted_9, toDisplayString(unref(loading) ? "..." : _ctx.$t("admin.fsMeta.toolbar.refreshShort")), 1)
              ], 8, _hoisted_7)
            ])
          ]),
          createBaseVNode("div", _hoisted_10, [
            createVNode(_sfc_main$4, {
              modelValue: unref(searchQuery),
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(searchQuery) ? searchQuery.value = $event : null),
              placeholder: _ctx.$t("admin.fsMeta.search.placeholder"),
              "show-hint": true,
              "search-hint": _ctx.$t("admin.fsMeta.search.hint"),
              size: "md",
              "debounce-ms": 300,
              onSearch: unref(handleGlobalSearch),
              onClear: unref(clearSearch)
            }, null, 8, ["modelValue", "placeholder", "search-hint", "onSearch", "onClear"])
          ]),
          createBaseVNode("div", _hoisted_11, [
            createBaseVNode("div", {
              class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-400" : "text-gray-600"])
            }, [
              createTextVNode(toDisplayString(_ctx.$t("admin.fsMeta.stats.total", { count: unref(pagination).total })) + " ", 1),
              unref(isSearchMode) ? (openBlock(), createElementBlock("span", _hoisted_12, toDisplayString(_ctx.$t("admin.fsMeta.stats.searchResultTag")), 1)) : createCommentVNode("", true)
            ], 2)
          ])
        ]),
        unref(error) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["mb-4 p-3 rounded-lg", unref(darkMode) ? "bg-red-900/20 text-red-400" : "bg-red-100 text-red-600"])
        }, [
          createBaseVNode("p", null, toDisplayString(unref(error)), 1)
        ], 2)) : createCommentVNode("", true),
        unref(lastRefreshTime) ? (openBlock(), createElementBlock("div", _hoisted_13, [
          createBaseVNode("div", {
            class: normalizeClass(["text-xs sm:text-sm", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
          }, [
            createBaseVNode("span", _hoisted_14, [
              createVNode(unref(IconClock), { class: "h-3 w-3 sm:h-4 sm:w-4 mr-1" }),
              createTextVNode(" " + toDisplayString(_ctx.$t("admin.fsMeta.lastRefresh")) + ": " + toDisplayString(unref(lastRefreshTime)), 1)
            ])
          ], 2)
        ])) : createCommentVNode("", true),
        unref(loading) && !unref(paginatedMetaList).length ? (openBlock(), createElementBlock("div", _hoisted_15, [
          createVNode(unref(IconRefresh), {
            class: normalizeClass(["animate-spin h-8 w-8", unref(darkMode) ? "text-blue-400" : "text-blue-500"])
          }, null, 8, ["class"])
        ])) : unref(pagination).total > 0 ? (openBlock(), createElementBlock("div", _hoisted_16, [
          createBaseVNode("div", _hoisted_17, [
            createVNode(_sfc_main$2, {
              "dark-mode": unref(darkMode),
              "meta-list": unref(paginatedMetaList),
              loading: unref(loading) || unref(searchLoading),
              onEdit: unref(openEditForm),
              onDelete: unref(confirmDelete)
            }, null, 8, ["dark-mode", "meta-list", "loading", "onEdit", "onDelete"])
          ])
        ])) : (openBlock(), createElementBlock("div", {
          key: 4,
          class: normalizeClass(["flex flex-col items-center justify-center py-12 bg-white dark:bg-gray-800 shadow-md rounded-lg flex-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
        }, [
          createVNode(unref(IconArchive), { class: "h-16 w-16 mb-4 opacity-50" }),
          createBaseVNode("p", _hoisted_18, toDisplayString(unref(isSearchMode) ? _ctx.$t("admin.fsMeta.empty.noSearchResults") : _ctx.$t("admin.fsMeta.empty.noData")), 1),
          !unref(isSearchMode) ? (openBlock(), createElementBlock("button", {
            key: 0,
            onClick: _cache[3] || (_cache[3] = (...args) => unref(openCreateForm) && unref(openCreateForm)(...args)),
            class: normalizeClass(["px-4 py-2 rounded-lg font-medium transition-colors", unref(darkMode) ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"])
          }, toDisplayString(_ctx.$t("admin.fsMeta.empty.createFirst")), 3)) : createCommentVNode("", true)
        ], 2)),
        unref(pagination).total > 0 ? (openBlock(), createElementBlock("div", _hoisted_19, [
          createVNode(_sfc_main$5, {
            "dark-mode": unref(darkMode),
            pagination: unref(pagination),
            "page-size-options": unref(pageSizeOptions),
            "search-mode": unref(isSearchMode),
            "search-term": unref(searchQuery),
            mode: "offset",
            onOffsetChanged: unref(handleOffsetChange),
            onLimitChanged: unref(handlePageSizeChange)
          }, null, 8, ["dark-mode", "pagination", "page-size-options", "search-mode", "search-term", "onOffsetChanged", "onLimitChanged"])
        ])) : createCommentVNode("", true),
        unref(showForm) ? (openBlock(), createBlock(FsMetaForm, {
          key: 6,
          "dark-mode": unref(darkMode),
          meta: unref(currentMeta),
          onSave: unref(handleFormSave),
          onClose: unref(closeForm)
        }, null, 8, ["dark-mode", "meta", "onSave", "onClose"])) : createCommentVNode("", true),
        unref(showDeleteConfirm) ? (openBlock(), createElementBlock("div", {
          key: 7,
          class: "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
          onClick: _cache[6] || (_cache[6] = withModifiers((...args) => unref(cancelDelete) && unref(cancelDelete)(...args), ["self"]))
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["rounded-lg p-6 max-w-md w-full mx-4", unref(darkMode) ? "bg-gray-800 text-white" : "bg-white text-gray-900"])
          }, [
            createBaseVNode("h3", _hoisted_20, toDisplayString(_ctx.$t("admin.fsMeta.confirmDelete.title")), 1),
            createBaseVNode("p", _hoisted_21, toDisplayString(_ctx.$t("admin.fsMeta.confirmDelete.message", {
              path: unref(metaToDelete)?.path ?? ""
            })), 1),
            createBaseVNode("div", _hoisted_22, [
              createBaseVNode("button", {
                onClick: _cache[4] || (_cache[4] = (...args) => unref(cancelDelete) && unref(cancelDelete)(...args)),
                class: normalizeClass(["px-4 py-2 rounded-lg transition-colors", unref(darkMode) ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"])
              }, toDisplayString(_ctx.$t("admin.fsMeta.confirmDelete.cancel")), 3),
              createBaseVNode("button", {
                onClick: _cache[5] || (_cache[5] = (...args) => unref(handleDelete) && unref(handleDelete)(...args)),
                class: "px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
              }, toDisplayString(_ctx.$t("admin.fsMeta.confirmDelete.confirm")), 1)
            ])
          ], 2)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
export {
  _sfc_main as default
};
