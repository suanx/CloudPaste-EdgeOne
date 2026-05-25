import { f as useAuthStore, e as useI18n, dD as usePathPassword, c as createLogger, F as computed, E as api, g as ref, i as useLocalStorage, w as watch, aK as _export_sfc, r as reactive, j as createElementBlock, k as openBlock, p as createCommentVNode, z as createVNode, y as unref, l as createBaseVNode, dE as IconError, n as normalizeClass, t as toDisplayString, K as Fragment, L as renderList, m as withModifiers, al as IconCopy, A as createTextVNode, J as IconRefresh, V as IconSearch, dF as IconFolderOpen, aT as onKeyStroke, G as IconClose, q as withDirectives, ae as vModelSelect, v as vModelText, aG as withKeys, be as isRef, M as createBlock, aP as nextTick } from "./index-BQxzU9F1.js";
import { b as useUIState } from "./MountExplorerView-CPmqHPnN.js";
import { _ as _sfc_main$2 } from "./LoadingIndicator-C1Dntewf.js";
import { c as copyToClipboard } from "./clipboard-GLHRBPpJ.js";
import { g as getFileIcon } from "./fileTypeIcons-s4hrDi1Q.js";
import { f as formatFileSize } from "./fileUtils-CALGFK20.js";
import "./timeUtils-D81jJILb.js";
import "./MarkdownDisplay-DriQfnOJ.js";
import "./useConfirmDialog-c5dcTgIB.js";
import "./fsMetaService-BlI_oFcH.js";
import "./PermissionManager-BpGELUYQ.js";
import "./fileTypes-C4-giE9O.js";
function useFileSearch() {
  const authStore = useAuthStore();
  const { t } = useI18n();
  const { getPathToken, getAllPathTokens } = usePathPassword();
  const log = createLogger("FileSearch");
  const searchApi = computed(() => {
    return api.fs.searchFiles;
  });
  const searchQuery = ref("");
  const searchResults = ref([]);
  const isSearching = ref(false);
  const searchError = ref(null);
  const hasPerformedSearch = ref(false);
  const searchNotices = ref([]);
  const passwordFilteredTotal = ref(0);
  const pathRestrictedPrefix = ref(null);
  const searchParams = ref({
    scope: "global",
    // 'global', 'mount', 'directory'
    mountId: "",
    path: "",
    limit: 50,
    cursor: null
  });
  const searchHistory = useLocalStorage("fileSearchHistory", []);
  const maxHistoryItems = 10;
  const hasSearchQuery = computed(() => searchQuery.value.trim().length >= 3);
  const hasSearchResults = computed(() => searchResults.value.length > 0);
  const searchResultsCount = computed(() => searchResults.value.length);
  const canSearch = computed(() => hasSearchQuery.value && !isSearching.value);
  const searchStats = ref({
    total: 0,
    hasMore: false,
    mountsSearched: 0,
    nextCursor: null
  });
  const performSearch = async (query = null, options = {}) => {
    try {
      const searchTerm = query || searchQuery.value;
      if (!searchTerm || searchTerm.trim().length < 3) {
        searchError.value = t("search.errors.queryTooShort");
        return;
      }
      isSearching.value = true;
      searchError.value = null;
      searchNotices.value = [];
      passwordFilteredTotal.value = 0;
      pathRestrictedPrefix.value = null;
      const finalSearchParams = {
        ...searchParams.value,
        ...options,
        // 执行新搜索时强制从第一页开始
        cursor: null
      };
      const tokenPath = finalSearchParams.path || "/";
      const token = getPathToken(tokenPath);
      if (token) {
        finalSearchParams.pathToken = token;
      }
      const tokens = getAllPathTokens();
      if (tokens.length > 0) {
        finalSearchParams.pathTokens = tokens;
      }
      log.debug("开始搜索文件:", searchTerm, finalSearchParams);
      hasPerformedSearch.value = true;
      const response = await searchApi.value(searchTerm, finalSearchParams);
      if (response.success) {
        const searchData = response.data;
        searchResults.value = searchData.results || [];
        searchStats.value = {
          total: searchData.total || 0,
          hasMore: searchData.hasMore || false,
          mountsSearched: searchData.mountsSearched || 0,
          nextCursor: searchData.nextCursor || null
        };
        if (searchData.pathRestricted && searchData.pathRestrictedPrefix) {
          pathRestrictedPrefix.value = searchData.pathRestrictedPrefix;
        }
        if (searchData.passwordFilteredCount) {
          passwordFilteredTotal.value += Number(searchData.passwordFilteredCount) || 0;
        }
        const notices = [];
        if (pathRestrictedPrefix.value) {
          notices.push(t("search.notices.pathRestricted", { path: pathRestrictedPrefix.value }));
        }
        if (passwordFilteredTotal.value > 0) {
          notices.push(t("search.notices.passwordFiltered", { count: passwordFilteredTotal.value }));
        }
        searchNotices.value = notices;
        if (searchData && searchData.indexReady === false && searchData.hint) {
          searchError.value = searchData.hint;
        }
        addToSearchHistory(searchTerm);
        log.debug("搜索完成:", {
          query: searchTerm,
          results: searchResults.value.length,
          total: searchStats.value.total
        });
      } else {
        throw new Error(response.message || t("search.errors.searchFailed"));
      }
    } catch (err) {
      log.error("搜索失败:", err);
      searchError.value = err.message || t("search.errors.searchFailed");
      searchResults.value = [];
      searchStats.value = { total: 0, hasMore: false, mountsSearched: 0, nextCursor: null };
    } finally {
      isSearching.value = false;
    }
  };
  const loadMoreResults = async () => {
    if (!searchStats.value.hasMore || !searchStats.value.nextCursor || isSearching.value) {
      return;
    }
    try {
      isSearching.value = true;
      searchError.value = null;
      const paginationParams = {
        ...searchParams.value,
        cursor: searchStats.value.nextCursor
      };
      const tokenPath = paginationParams.path || "/";
      const token = getPathToken(tokenPath);
      if (token) {
        paginationParams.pathToken = token;
      }
      const tokens = getAllPathTokens();
      if (tokens.length > 0) {
        paginationParams.pathTokens = tokens;
      }
      log.debug("加载更多搜索结果:", { cursor: searchStats.value.nextCursor });
      const response = await searchApi.value(searchQuery.value, paginationParams);
      if (response.success) {
        const searchData = response.data;
        searchResults.value.push(...searchData.results || []);
        const existingTotal = searchStats.value.total || 0;
        const incomingTotal = Number(searchData.total || 0);
        searchStats.value = {
          total: incomingTotal > existingTotal ? incomingTotal : existingTotal,
          hasMore: searchData.hasMore || false,
          mountsSearched: searchData.mountsSearched || 0,
          nextCursor: searchData.nextCursor || null
        };
        log.debug("加载更多结果完成:", {
          newResults: searchData.results?.length || 0,
          totalResults: searchResults.value.length
        });
      } else {
        throw new Error(response.message || t("search.errors.loadMoreFailed"));
      }
    } catch (err) {
      log.error("加载更多结果失败:", err);
      searchError.value = err.message || t("search.errors.loadMoreFailed");
    } finally {
      isSearching.value = false;
    }
  };
  const clearSearch = () => {
    searchQuery.value = "";
    searchResults.value = [];
    searchError.value = null;
    hasPerformedSearch.value = false;
    searchNotices.value = [];
    passwordFilteredTotal.value = 0;
    pathRestrictedPrefix.value = null;
    searchStats.value = { total: 0, hasMore: false, mountsSearched: 0, nextCursor: null };
    searchParams.value.cursor = null;
    log.debug("搜索结果已清除");
  };
  const updateSearchParams = (params) => {
    searchParams.value = {
      ...searchParams.value,
      ...params,
      cursor: null
      // 重置分页游标
    };
    log.debug("搜索参数已更新:", searchParams.value);
  };
  const setSearchScope = (scope, options = {}) => {
    const newParams = {
      scope,
      mountId: options.mountId || "",
      path: options.path || "",
      cursor: null
    };
    updateSearchParams(newParams);
  };
  const addToSearchHistory = (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    const filteredHistory = searchHistory.value.filter((item) => item !== trimmedQuery);
    searchHistory.value = [trimmedQuery, ...filteredHistory].slice(0, maxHistoryItems);
  };
  const loadSearchHistory = () => {
    if (!Array.isArray(searchHistory.value)) {
      searchHistory.value = [];
    }
  };
  const clearSearchHistory = () => {
    searchHistory.value = [];
  };
  const clearSearchError = () => {
    searchError.value = null;
  };
  const getSearchError = () => {
    return searchError.value;
  };
  loadSearchHistory();
  watch(
    () => authStore.isAuthenticated,
    (newValue) => {
      if (!newValue) {
        clearSearch();
      }
    }
  );
  return {
    // 状态
    searchQuery,
    searchResults,
    isSearching,
    searchError,
    searchNotices,
    searchParams,
    searchHistory,
    searchStats,
    hasPerformedSearch,
    // 计算属性
    hasSearchQuery,
    hasSearchResults,
    searchResultsCount,
    canSearch,
    // 方法
    performSearch,
    loadMoreResults,
    clearSearch,
    updateSearchParams,
    setSearchScope,
    addToSearchHistory,
    loadSearchHistory,
    clearSearchHistory,
    clearSearchError,
    getSearchError
  };
}
const _hoisted_1$1 = { class: "flex flex-col h-full min-h-0" };
const _hoisted_2$1 = {
  key: 0,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_3$1 = {
  key: 1,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_4$1 = { class: "text-center" };
const _hoisted_5$1 = {
  key: 2,
  class: "flex-1 overflow-y-auto custom-scrollbar min-h-0"
};
const _hoisted_6$1 = { class: "p-4 space-y-2" };
const _hoisted_7$1 = ["onClick"];
const _hoisted_8$1 = { class: "flex items-center space-x-3" };
const _hoisted_9$1 = { class: "flex-shrink-0" };
const _hoisted_10$1 = ["innerHTML"];
const _hoisted_11$1 = { class: "flex-1 min-w-0" };
const _hoisted_12$1 = { class: "flex items-center gap-2" };
const _hoisted_13$1 = ["title", "innerHTML"];
const _hoisted_14$1 = ["title"];
const _hoisted_15$1 = { class: "flex-shrink-0 flex space-x-1" };
const _hoisted_16$1 = ["onClick", "title"];
const _hoisted_17$1 = ["disabled"];
const _hoisted_18 = {
  key: 0,
  class: "flex items-center"
};
const _hoisted_19 = { key: 1 };
const _hoisted_20 = {
  key: 3,
  class: "py-12"
};
const _hoisted_21 = { class: "text-center" };
const _hoisted_22 = {
  key: 4,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_23 = { class: "text-center max-w-sm mx-auto px-4" };
const _hoisted_24 = { class: "relative mx-auto h-16 w-16 mb-6" };
const _hoisted_25 = { class: "absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-1" };
const _sfc_main$1 = {
  __name: "SearchResultList",
  props: {
    results: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    },
    hasMore: {
      type: Boolean,
      default: false
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    hasSearchQuery: {
      type: Boolean,
      default: false
    },
    hasSearchResults: {
      type: Boolean,
      default: false
    },
    searchQuery: {
      type: String,
      default: ""
    },
    hasPerformedSearch: {
      type: Boolean,
      default: false
    }
  },
  emits: ["item-click", "load-more"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const log = createLogger("SearchResultList");
    const copiedPaths = reactive({});
    const getFileIcon$1 = (item) => {
      return getFileIcon(
        {
          name: item.name,
          type: item.type,
          isDirectory: item.isDirectory || false,
          isMount: false
        },
        props.darkMode
      );
    };
    const highlightSearchQuery = (text, query) => {
      if (!query || !text) {
        return text;
      }
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${escapedQuery})`, "gi");
      return text.replace(regex, '<mark class="search-highlight">$1</mark>');
    };
    const handleItemClick = (item) => {
      emit("item-click", item);
    };
    const loadMore = () => {
      if (!props.loading && props.hasMore) {
        emit("load-more");
      }
    };
    const copyPath = async (item) => {
      try {
        const success = await copyToClipboard(item.path);
        if (!success) {
          throw new Error("copy_failed");
        }
        copiedPaths[item.s3_key] = true;
        setTimeout(() => {
          copiedPaths[item.s3_key] = false;
        }, 2e3);
      } catch (error) {
        log.error("复制路径失败:", error);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        __props.loading && __props.results.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          createVNode(_sfc_main$2, {
            text: unref(t)("search.status.searching"),
            "dark-mode": __props.darkMode,
            size: "xl",
            "icon-class": "text-blue-500",
            "text-class": __props.darkMode ? "text-gray-400" : "text-gray-500"
          }, null, 8, ["text", "dark-mode", "text-class"])
        ])) : __props.error ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
          createBaseVNode("div", _hoisted_4$1, [
            createVNode(unref(IconError), {
              size: "3xl",
              class: "mx-auto mb-4 text-red-500",
              "aria-hidden": "true"
            }),
            createBaseVNode("h3", {
              class: normalizeClass(["text-lg font-medium mb-2", __props.darkMode ? "text-gray-300" : "text-gray-900"])
            }, toDisplayString(unref(t)("search.status.failed")), 3),
            createBaseVNode("p", {
              class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-400" : "text-gray-500"])
            }, toDisplayString(__props.error), 3)
          ])
        ])) : __props.results.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_5$1, [
          createBaseVNode("div", _hoisted_6$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.results, (item, index) => {
              return openBlock(), createElementBlock("div", {
                key: `${item.mount_id}-${item.s3_key}-${index}`,
                class: normalizeClass(["result-item p-3 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer", __props.darkMode ? "border-gray-700 hover:border-gray-600 bg-gray-800 hover:bg-gray-750" : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"]),
                onClick: ($event) => handleItemClick(item)
              }, [
                createBaseVNode("div", _hoisted_8$1, [
                  createBaseVNode("div", _hoisted_9$1, [
                    createBaseVNode("div", {
                      class: "w-8 h-8 flex items-center justify-center",
                      innerHTML: getFileIcon$1(item)
                    }, null, 8, _hoisted_10$1)
                  ]),
                  createBaseVNode("div", _hoisted_11$1, [
                    createBaseVNode("div", _hoisted_12$1, [
                      createBaseVNode("div", {
                        class: normalizeClass(["font-medium truncate", __props.darkMode ? "text-white" : "text-gray-900"]),
                        title: item.name,
                        innerHTML: highlightSearchQuery(item.name, __props.searchQuery)
                      }, null, 10, _hoisted_13$1),
                      createBaseVNode("span", {
                        class: normalizeClass(["inline-flex items-center px-2 py-1 rounded-md text-xs font-medium flex-shrink-0", __props.darkMode ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800"])
                      }, toDisplayString(typeof item.size === "number" ? unref(formatFileSize)(item.size) : "-"), 3)
                    ]),
                    createBaseVNode("div", {
                      class: normalizeClass(["text-xs truncate mt-1", __props.darkMode ? "text-gray-400" : "text-gray-500"]),
                      title: item.path
                    }, toDisplayString(item.path), 11, _hoisted_14$1)
                  ]),
                  createBaseVNode("div", _hoisted_15$1, [
                    createBaseVNode("button", {
                      onClick: withModifiers(($event) => copyPath(item), ["stop"]),
                      class: normalizeClass(["p-1.5 rounded-md transition-colors", __props.darkMode ? "text-gray-400 hover:text-green-400 hover:bg-gray-700" : "text-gray-500 hover:text-green-600 hover:bg-gray-100"]),
                      title: unref(t)("search.results.item.copyPath")
                    }, [
                      createVNode(unref(IconCopy), {
                        size: "sm",
                        "aria-hidden": "true"
                      })
                    ], 10, _hoisted_16$1)
                  ])
                ])
              ], 10, _hoisted_7$1);
            }), 128))
          ]),
          __props.hasMore ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["p-4 text-center border-t", __props.darkMode ? "border-gray-700" : "border-gray-200"])
          }, [
            createBaseVNode("button", {
              onClick: loadMore,
              disabled: __props.loading,
              class: normalizeClass([
                "px-4 py-2 rounded-md border transition-colors",
                __props.loading ? __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed" : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed" : __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              ])
            }, [
              __props.loading ? (openBlock(), createElementBlock("span", _hoisted_18, [
                createVNode(unref(IconRefresh), {
                  class: "animate-spin h-4 w-4 mr-2",
                  "aria-hidden": "true"
                }),
                createTextVNode(" " + toDisplayString(unref(t)("search.results.loadingMore")), 1)
              ])) : (openBlock(), createElementBlock("span", _hoisted_19, toDisplayString(unref(t)("search.results.loadMore")), 1))
            ], 10, _hoisted_17$1)
          ], 2)) : createCommentVNode("", true)
        ])) : !__props.hasPerformedSearch && !__props.hasSearchResults && !__props.loading ? (openBlock(), createElementBlock("div", _hoisted_20, [
          createBaseVNode("div", _hoisted_21, [
            createVNode(unref(IconSearch), {
              size: "2xl",
              class: normalizeClass(["mx-auto mb-3", __props.darkMode ? "text-gray-500" : "text-gray-400"]),
              "aria-hidden": "true"
            }, null, 8, ["class"]),
            createBaseVNode("h3", {
              class: normalizeClass(["text-base font-medium mb-1", __props.darkMode ? "text-gray-300" : "text-gray-900"])
            }, toDisplayString(unref(t)("search.status.idle")), 3),
            createBaseVNode("p", {
              class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-400" : "text-gray-500"])
            }, toDisplayString(unref(t)("search.tips.keywordTips")), 3)
          ])
        ])) : __props.hasPerformedSearch && !__props.hasSearchResults && !__props.loading ? (openBlock(), createElementBlock("div", _hoisted_22, [
          createBaseVNode("div", _hoisted_23, [
            createBaseVNode("div", _hoisted_24, [
              createVNode(unref(IconFolderOpen), {
                size: "4xl",
                class: normalizeClass(__props.darkMode ? "text-gray-500" : "text-gray-400"),
                "aria-hidden": "true"
              }, null, 8, ["class"]),
              createBaseVNode("div", _hoisted_25, [
                createVNode(unref(IconSearch), {
                  size: "sm",
                  class: normalizeClass(__props.darkMode ? "text-gray-400" : "text-gray-500"),
                  "aria-hidden": "true"
                }, null, 8, ["class"])
              ])
            ]),
            createBaseVNode("h3", {
              class: normalizeClass(["text-lg font-medium mb-2", __props.darkMode ? "text-gray-300" : "text-gray-900"])
            }, toDisplayString(unref(t)("search.results.noResults")), 3),
            createBaseVNode("p", {
              class: normalizeClass(["text-sm leading-relaxed", __props.darkMode ? "text-gray-400" : "text-gray-500"])
            }, toDisplayString(unref(t)("search.results.noResultsHint")), 3)
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
const SearchResultList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-190aeab3"]]);
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 z-[60] overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 pt-20 sm:pt-4"
};
const _hoisted_2 = { class: "flex gap-2 sm:gap-3 items-center" };
const _hoisted_3 = { class: "flex-shrink-0 w-20 sm:w-32 lg:w-36" };
const _hoisted_4 = { value: "global" };
const _hoisted_5 = { value: "mount" };
const _hoisted_6 = { value: "directory" };
const _hoisted_7 = { class: "flex-1 relative min-w-0" };
const _hoisted_8 = ["placeholder", "disabled"];
const _hoisted_9 = { class: "flex-shrink-0 w-10 sm:w-auto" };
const _hoisted_10 = ["disabled"];
const _hoisted_11 = {
  key: 0,
  class: "mt-3"
};
const _hoisted_12 = { class: "flex items-center justify-between mb-2" };
const _hoisted_13 = { class: "flex flex-wrap gap-2" };
const _hoisted_14 = ["onClick"];
const _hoisted_15 = { class: "flex-1 flex flex-col min-h-0" };
const _hoisted_16 = { key: 0 };
const _hoisted_17 = { key: 1 };
const _sfc_main = {
  __name: "SearchModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    currentPath: {
      type: String,
      default: "/"
    },
    currentMountId: {
      type: String,
      default: ""
    }
  },
  emits: ["close", "item-click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    useUIState();
    const {
      searchQuery,
      searchResults,
      isSearching,
      searchError,
      searchNotices,
      searchParams,
      searchHistory,
      searchStats,
      hasSearchQuery,
      hasSearchResults,
      hasPerformedSearch,
      canSearch,
      performSearch,
      loadMoreResults,
      clearSearch,
      clearSearchHistory
    } = useFileSearch();
    const searchInputRef = ref(null);
    const modalHeight = computed(() => {
      if (hasSearchResults.value || isSearching.value || hasPerformedSearch.value && searchStats.value.total > 0) {
        return "h-[75vh] sm:h-[70vh]";
      }
      return "h-auto max-h-[60vh]";
    });
    const handleEnterSearch = async () => {
      if (searchQuery.value.trim().length >= 2) {
        await performSearch();
      }
    };
    const handleSearchClick = async () => {
      if (searchQuery.value.trim().length >= 2) {
        await performSearch();
      }
    };
    const handleScopeChange = () => {
      if (searchParams.value.scope === "mount") {
        searchParams.value.mountId = props.currentMountId;
        searchParams.value.path = "";
      } else if (searchParams.value.scope === "directory") {
        searchParams.value.mountId = props.currentMountId;
        searchParams.value.path = props.currentPath;
      } else {
        searchParams.value.mountId = "";
        searchParams.value.path = "";
      }
    };
    const useHistorySearch = (historyItem) => {
      searchQuery.value = historyItem;
      performSearch();
    };
    const handleItemClick = (item) => {
      emit("item-click", item);
      closeModal();
    };
    const closeModal = () => {
      if (isSearching.value) return;
      emit("close");
    };
    onKeyStroke("Escape", () => {
      if (props.isOpen) {
        closeModal();
      }
    });
    watch(
      () => props.isOpen,
      (newValue) => {
        if (newValue) {
          nextTick(() => {
            if (searchInputRef.value) {
              searchInputRef.value.focus();
            }
          });
          if (props.currentMountId) {
            searchParams.value.scope = "directory";
            searchParams.value.mountId = props.currentMountId;
            searchParams.value.path = props.currentPath;
          }
        } else {
          clearSearch();
        }
      }
    );
    return (_ctx, _cache) => {
      return __props.isOpen ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: normalizeClass(["relative w-full max-w-sm sm:max-w-2xl lg:max-w-3xl min-h-[300px] rounded-lg shadow-xl flex flex-col transition-all duration-300", [__props.darkMode ? "bg-gray-800" : "bg-white", modalHeight.value]])
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["px-4 py-3 border-b flex justify-between items-center", __props.darkMode ? "border-gray-700" : "border-gray-200"])
          }, [
            createBaseVNode("h3", {
              class: normalizeClass(["text-lg font-medium", __props.darkMode ? "text-gray-100" : "text-gray-900"])
            }, toDisplayString(unref(t)("search.title")), 3),
            createBaseVNode("button", {
              onClick: closeModal,
              class: "text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            }, [
              createVNode(unref(IconClose), {
                size: "lg",
                "aria-hidden": "true"
              })
            ])
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass(["px-4 py-4 border-b bg-gradient-to-r", __props.darkMode ? "border-gray-700 from-gray-800 to-gray-800" : "border-gray-200 from-gray-50 to-white"])
          }, [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, [
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(searchParams).scope = $event),
                  onChange: handleScopeChange,
                  class: normalizeClass(["w-full h-10 px-2 sm:px-3 text-xs sm:text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent truncate", __props.darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"])
                }, [
                  createBaseVNode("option", _hoisted_4, toDisplayString(unref(t)("search.scope.global")), 1),
                  createBaseVNode("option", _hoisted_5, toDisplayString(unref(t)("search.scope.mount")), 1),
                  createBaseVNode("option", _hoisted_6, toDisplayString(unref(t)("search.scope.directory")), 1)
                ], 34), [
                  [vModelSelect, unref(searchParams).scope]
                ])
              ]),
              createBaseVNode("div", _hoisted_7, [
                withDirectives(createBaseVNode("input", {
                  ref_key: "searchInputRef",
                  ref: searchInputRef,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(searchQuery) ? searchQuery.value = $event : null),
                  onKeydown: [
                    withKeys(handleEnterSearch, ["enter"]),
                    _cache[2] || (_cache[2] = withKeys((...args) => unref(clearSearch) && unref(clearSearch)(...args), ["esc"]))
                  ],
                  type: "text",
                  placeholder: unref(t)("search.placeholder"),
                  class: normalizeClass([
                    "w-full h-10 px-3 sm:px-4 pr-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm focus:shadow-md",
                    __props.darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-gray-50"
                  ]),
                  disabled: unref(isSearching)
                }, null, 42, _hoisted_8), [
                  [vModelText, unref(searchQuery)]
                ]),
                unref(searchQuery) && !unref(isSearching) ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  onClick: _cache[3] || (_cache[3] = (...args) => unref(clearSearch) && unref(clearSearch)(...args)),
                  class: normalizeClass(["absolute right-3 top-1/2 transform -translate-y-1/2 p-1", __props.darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-400 hover:text-gray-500"])
                }, [
                  createVNode(unref(IconClose), {
                    size: "sm",
                    "aria-hidden": "true"
                  })
                ], 2)) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_9, [
                createBaseVNode("button", {
                  onClick: handleSearchClick,
                  disabled: !unref(canSearch),
                  class: normalizeClass(["w-full h-10 px-2 sm:px-3 rounded-md border transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-105", [
                    unref(canSearch) ? __props.darkMode ? "bg-blue-600 hover:bg-blue-700 border-blue-600 text-white shadow-blue-500/25" : "bg-blue-500 hover:bg-blue-600 border-blue-500 text-white shadow-blue-500/25" : __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed" : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                  ]])
                }, [
                  !unref(isSearching) ? (openBlock(), createBlock(unref(IconSearch), {
                    key: 0,
                    class: "h-4 w-4 sm:h-5 sm:w-5",
                    "aria-hidden": "true"
                  })) : (openBlock(), createBlock(unref(IconRefresh), {
                    key: 1,
                    class: "animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white",
                    "aria-hidden": "true"
                  }))
                ], 10, _hoisted_10)
              ])
            ]),
            unref(searchHistory).length > 0 && !unref(searchQuery) && !unref(hasSearchResults) ? (openBlock(), createElementBlock("div", _hoisted_11, [
              createBaseVNode("div", _hoisted_12, [
                createBaseVNode("div", {
                  class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, toDisplayString(unref(t)("search.history.recent")), 3),
                createBaseVNode("button", {
                  onClick: _cache[4] || (_cache[4] = (...args) => unref(clearSearchHistory) && unref(clearSearchHistory)(...args)),
                  class: "text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                }, toDisplayString(unref(t)("search.history.clear")), 1)
              ]),
              createBaseVNode("div", _hoisted_13, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(searchHistory).slice(0, 5), (historyItem, index) => {
                  return openBlock(), createElementBlock("button", {
                    key: index,
                    onClick: ($event) => useHistorySearch(historyItem),
                    class: normalizeClass([
                      "px-3 py-1.5 text-sm rounded-full transition-all duration-200 border hover:shadow-sm transform hover:scale-105",
                      __props.darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600 hover:border-gray-500" : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200 hover:border-gray-300"
                    ])
                  }, toDisplayString(historyItem), 11, _hoisted_14);
                }), 128))
              ])
            ])) : createCommentVNode("", true)
          ], 2),
          createBaseVNode("div", _hoisted_15, [
            unref(isSearching) || unref(hasPerformedSearch) && unref(searchStats).total > 0 ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["px-4 py-2 border-b", __props.darkMode ? "border-gray-700" : "border-gray-200"])
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-300" : "text-gray-600"])
              }, [
                unref(isSearching) ? (openBlock(), createElementBlock("span", _hoisted_16, toDisplayString(unref(t)("search.status.searching")), 1)) : unref(searchStats).total > 0 ? (openBlock(), createElementBlock("span", _hoisted_17, toDisplayString(unref(t)("search.results.foundInMounts", { count: unref(searchStats).total, mounts: unref(searchStats).mountsSearched })), 1)) : createCommentVNode("", true)
              ], 2)
            ], 2)) : createCommentVNode("", true),
            unref(searchNotices).length > 0 ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(["px-4 py-2 border-b", __props.darkMode ? "border-gray-700" : "border-gray-200"])
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["space-y-1 text-xs", __props.darkMode ? "text-blue-300" : "text-blue-600"])
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(searchNotices), (notice, index) => {
                  return openBlock(), createElementBlock("div", { key: index }, toDisplayString(notice), 1);
                }), 128))
              ], 2)
            ], 2)) : createCommentVNode("", true),
            createVNode(SearchResultList, {
              results: unref(searchResults),
              loading: unref(isSearching),
              error: unref(searchError),
              "has-more": unref(searchStats).hasMore,
              "dark-mode": __props.darkMode,
              "has-search-query": unref(hasSearchQuery),
              "has-search-results": unref(hasSearchResults),
              "has-performed-search": unref(hasPerformedSearch),
              "search-query": unref(searchQuery),
              onItemClick: handleItemClick,
              onLoadMore: unref(loadMoreResults),
              class: "flex-1"
            }, null, 8, ["results", "loading", "error", "has-more", "dark-mode", "has-search-query", "has-search-results", "has-performed-search", "search-query", "onLoadMore"])
          ])
        ], 2)
      ])) : createCommentVNode("", true);
    };
  }
};
export {
  _sfc_main as default
};
