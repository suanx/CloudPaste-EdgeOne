import { e as useI18n, F as computed, j as createElementBlock, p as createCommentVNode, k as openBlock, l as createBaseVNode, n as normalizeClass, z as createVNode, y as unref, aa as IconChevronLeft, t as toDisplayString, ab as IconChevronRight, K as Fragment, L as renderList } from "./index-BQxzU9F1.js";
const _hoisted_1 = {
  key: 0,
  class: "mt-2 sm:mt-4 flex flex-col sm:flex-row items-center justify-between"
};
const _hoisted_2 = { class: "w-full flex justify-between items-center mb-2 sm:mb-3 sm:hidden" };
const _hoisted_3 = ["disabled"];
const _hoisted_4 = { class: "ml-1" };
const _hoisted_5 = { class: "text-xs xs:text-sm text-gray-700 dark:text-gray-300 mx-1 xs:mx-2 whitespace-nowrap" };
const _hoisted_6 = ["disabled"];
const _hoisted_7 = { class: "mr-1" };
const _hoisted_8 = { class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" };
const _hoisted_9 = { class: "flex items-center space-x-4" };
const _hoisted_10 = { class: "text-xs md:text-sm text-gray-700 dark:text-gray-300" };
const _hoisted_11 = { key: 0 };
const _hoisted_12 = { key: 1 };
const _hoisted_13 = {
  key: 0,
  class: "flex items-center space-x-2"
};
const _hoisted_14 = { class: "text-xs md:text-sm text-gray-700 dark:text-gray-300" };
const _hoisted_15 = ["value"];
const _hoisted_16 = ["value"];
const _hoisted_17 = ["aria-label"];
const _hoisted_18 = ["disabled"];
const _hoisted_19 = { class: "sr-only" };
const _hoisted_20 = { class: "inline-flex items-center" };
const _hoisted_21 = ["disabled"];
const _hoisted_22 = { class: "sr-only" };
const _hoisted_23 = ["onClick"];
const _hoisted_24 = ["disabled"];
const _hoisted_25 = { class: "sr-only" };
const _hoisted_26 = ["disabled"];
const _hoisted_27 = { class: "sr-only" };
const _hoisted_28 = { class: "inline-flex items-center" };
const _sfc_main = {
  __name: "CommonPagination",
  props: {
    darkMode: {
      type: Boolean,
      required: true
    },
    pagination: {
      type: Object,
      required: true
      // 支持两种分页模式：
      // 1. page模式：{ page, limit, total, totalPages }
      // 2. offset模式：{ offset, limit, total, hasMore }
    },
    mode: {
      type: String,
      default: "page",
      // 'page' 或 'offset'
      validator: (value) => ["page", "offset"].includes(value)
    },
    showPageSizeSelector: {
      type: Boolean,
      default: true
    },
    pageSizeOptions: {
      type: Array,
      default: () => [10, 20, 30, 50, 100]
    },
    searchMode: {
      type: Boolean,
      default: false
    },
    searchTerm: {
      type: String,
      default: ""
    }
  },
  emits: ["page-changed", "offset-changed", "limit-changed"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emit = __emit;
    const displayRange = computed(() => {
      if (props.mode === "page") {
        const { page, limit, total } = props.pagination;
        const start = (page - 1) * limit + 1;
        const end = Math.min(page * limit, total);
        return { start, end };
      } else {
        const { offset, limit, total } = props.pagination;
        const start = offset + 1;
        const end = Math.min(offset + limit, total);
        return { start, end };
      }
    });
    const currentPage = computed(() => {
      if (props.mode === "offset") {
        return Math.floor(props.pagination.offset / props.pagination.limit) + 1;
      }
      return props.pagination.page;
    });
    const totalPages = computed(() => {
      if (props.mode === "page") {
        return props.pagination.totalPages;
      }
      return Math.ceil(props.pagination.total / props.pagination.limit);
    });
    const hasNextPage = computed(() => {
      if (props.mode === "page") {
        return currentPage.value < totalPages.value;
      } else {
        if (props.pagination.hasMore !== void 0) {
          return props.pagination.hasMore;
        }
        const { offset, limit, total } = props.pagination;
        return offset + limit < total;
      }
    });
    const handlePageChange = (targetPage) => {
      if (props.mode === "page") {
        emit("page-changed", targetPage);
      } else {
        const newOffset = (targetPage - 1) * props.pagination.limit;
        emit("offset-changed", newOffset);
      }
    };
    const handlePageSizeChange = (event) => {
      const newSize = parseInt(event.target.value);
      emit("limit-changed", newSize);
    };
    return (_ctx, _cache) => {
      return __props.pagination.total > 0 ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => handlePageChange(currentPage.value - 1)),
            disabled: currentPage.value <= 1,
            class: normalizeClass([
              currentPage.value <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 dark:hover:bg-gray-700",
              "flex-grow flex justify-center items-center px-2 py-1.5 xs:px-3 xs:py-2 border border-gray-300 dark:border-gray-600 text-xs xs:text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 mr-1 xs:mr-2"
            ])
          }, [
            createVNode(unref(IconChevronLeft), { class: "h-4 w-4 xs:h-5 xs:w-5" }),
            createBaseVNode("span", _hoisted_4, toDisplayString(unref(t)("common.pagination.previousPage")), 1)
          ], 10, _hoisted_3),
          createBaseVNode("span", _hoisted_5, toDisplayString(unref(t)("common.pagination.pageInfo", { current: currentPage.value, total: totalPages.value })), 1),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => handlePageChange(currentPage.value + 1)),
            disabled: !hasNextPage.value,
            class: normalizeClass([
              !hasNextPage.value ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 dark:hover:bg-gray-700",
              "flex-grow flex justify-center items-center px-2 py-1.5 xs:px-3 xs:py-2 border border-gray-300 dark:border-gray-600 text-xs xs:text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 ml-1 xs:ml-2"
            ])
          }, [
            createBaseVNode("span", _hoisted_7, toDisplayString(unref(t)("common.pagination.nextPage")), 1),
            createVNode(unref(IconChevronRight), { class: "h-4 w-4 xs:h-5 xs:w-5" })
          ], 10, _hoisted_6)
        ]),
        createBaseVNode("div", _hoisted_8, [
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("div", null, [
              createBaseVNode("p", _hoisted_10, [
                __props.searchMode && __props.searchTerm ? (openBlock(), createElementBlock("span", _hoisted_11, toDisplayString(unref(t)("common.pagination.searchResults", { term: __props.searchTerm, start: displayRange.value.start, end: displayRange.value.end, total: __props.pagination.total })), 1)) : (openBlock(), createElementBlock("span", _hoisted_12, toDisplayString(unref(t)("common.pagination.showingRange", {
                  start: displayRange.value.start,
                  end: displayRange.value.end,
                  total: __props.pagination.total
                })), 1))
              ])
            ]),
            __props.showPageSizeSelector ? (openBlock(), createElementBlock("div", _hoisted_13, [
              createBaseVNode("span", _hoisted_14, toDisplayString(unref(t)("common.pagination.pageSize")), 1),
              createBaseVNode("select", {
                value: __props.pagination.limit,
                onChange: handlePageSizeChange,
                class: "px-2 py-1 text-xs md:text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.pageSizeOptions, (size) => {
                  return openBlock(), createElementBlock("option", {
                    key: size,
                    value: size
                  }, toDisplayString(size), 9, _hoisted_16);
                }), 128))
              ], 40, _hoisted_15)
            ])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", null, [
            createBaseVNode("nav", {
              class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
              "aria-label": unref(t)("common.pagination.ariaLabel")
            }, [
              createBaseVNode("button", {
                onClick: _cache[2] || (_cache[2] = ($event) => handlePageChange(1)),
                disabled: currentPage.value <= 1,
                class: normalizeClass([
                  currentPage.value <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 dark:hover:bg-gray-700",
                  "relative inline-flex items-center px-1 py-1 md:px-2 md:py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs md:text-sm font-medium text-gray-500 dark:text-gray-300"
                ])
              }, [
                createBaseVNode("span", _hoisted_19, toDisplayString(unref(t)("common.pagination.srFirstPage")), 1),
                createBaseVNode("span", _hoisted_20, [
                  createVNode(unref(IconChevronLeft), { class: "h-4 w-4 md:h-5 md:w-5" }),
                  createVNode(unref(IconChevronLeft), { class: "h-4 w-4 md:h-5 md:w-5 -ml-2" })
                ])
              ], 10, _hoisted_18),
              createBaseVNode("button", {
                onClick: _cache[3] || (_cache[3] = ($event) => handlePageChange(currentPage.value - 1)),
                disabled: currentPage.value <= 1,
                class: normalizeClass([
                  currentPage.value <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 dark:hover:bg-gray-700",
                  "relative inline-flex items-center px-1 py-1 md:px-2 md:py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs md:text-sm font-medium text-gray-500 dark:text-gray-300"
                ])
              }, [
                createBaseVNode("span", _hoisted_22, toDisplayString(unref(t)("common.pagination.srPreviousPage")), 1),
                createVNode(unref(IconChevronLeft), { class: "h-4 w-4 md:h-5 md:w-5" })
              ], 10, _hoisted_21),
              (openBlock(true), createElementBlock(Fragment, null, renderList(totalPages.value, (pageNum) => {
                return openBlock(), createElementBlock(Fragment, null, [
                  pageNum === 1 || pageNum === totalPages.value || pageNum >= currentPage.value - 1 && pageNum <= currentPage.value + 1 ? (openBlock(), createElementBlock("button", {
                    key: pageNum,
                    onClick: ($event) => handlePageChange(pageNum),
                    class: normalizeClass([
                      "relative inline-flex items-center px-2 py-1 md:px-4 md:py-2 border text-xs md:text-sm font-medium",
                      pageNum === currentPage.value ? "z-10 bg-primary-50 dark:bg-primary-900 border-primary-500 dark:border-primary-500 text-primary-600 dark:text-primary-200" : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    ])
                  }, toDisplayString(pageNum), 11, _hoisted_23)) : pageNum === 2 && currentPage.value > 3 || pageNum === totalPages.value - 1 && currentPage.value < totalPages.value - 2 ? (openBlock(), createElementBlock("span", {
                    key: `ellipsis-${pageNum}`,
                    class: "relative inline-flex items-center px-2 py-1 md:px-4 md:py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300"
                  }, " ... ")) : createCommentVNode("", true)
                ], 64);
              }), 256)),
              createBaseVNode("button", {
                onClick: _cache[4] || (_cache[4] = ($event) => handlePageChange(currentPage.value + 1)),
                disabled: !hasNextPage.value,
                class: normalizeClass([
                  !hasNextPage.value ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 dark:hover:bg-gray-700",
                  "relative inline-flex items-center px-1 py-1 md:px-2 md:py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs md:text-sm font-medium text-gray-500 dark:text-gray-300"
                ])
              }, [
                createBaseVNode("span", _hoisted_25, toDisplayString(unref(t)("common.pagination.srNextPage")), 1),
                createVNode(unref(IconChevronRight), { class: "h-4 w-4 md:h-5 md:w-5" })
              ], 10, _hoisted_24),
              createBaseVNode("button", {
                onClick: _cache[5] || (_cache[5] = ($event) => handlePageChange(totalPages.value)),
                disabled: !hasNextPage.value,
                class: normalizeClass([
                  !hasNextPage.value ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 dark:hover:bg-gray-700",
                  "relative inline-flex items-center px-1 py-1 md:px-2 md:py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs md:text-sm font-medium text-gray-500 dark:text-gray-300"
                ])
              }, [
                createBaseVNode("span", _hoisted_27, toDisplayString(unref(t)("common.pagination.srLastPage")), 1),
                createBaseVNode("span", _hoisted_28, [
                  createVNode(unref(IconChevronRight), { class: "h-4 w-4 md:h-5 md:w-5" }),
                  createVNode(unref(IconChevronRight), { class: "h-4 w-4 md:h-5 md:w-5 -ml-2" })
                ])
              ], 10, _hoisted_26)
            ], 8, _hoisted_17)
          ])
        ])
      ])) : createCommentVNode("", true);
    };
  }
};
export {
  _sfc_main as _
};
