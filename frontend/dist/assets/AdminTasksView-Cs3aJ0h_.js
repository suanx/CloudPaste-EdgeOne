import { j as createElementBlock, k as openBlock, l as createBaseVNode, p as createCommentVNode, t as toDisplayString, M as createBlock, N as resolveDynamicComponent, n as normalizeClass, e as useI18n, F as computed, aK as _export_sfc, aD as normalizeStyle, y as unref, g as ref, z as createVNode, A as createTextVNode, al as IconCopy, J as IconRefresh, K as Fragment, L as renderList, aj as IconCheck, G as IconClose, ab as IconChevronRight, m as withModifiers, ao as IconChevronDown, aE as withCtx, aF as Transition, aL as IconExclamation, en as IconDatabase, eo as IconMinus, b5 as IconFolder, bb as IconClock, ep as IconQueueList, bf as IconArrowUp, el as IconTrash, aO as useBreakpoints, eq as useSwipe, w as watch, er as IconX, aV as Teleport, aQ as breakpointsTailwind, es as IconSync, ac as useThemeMode, c as createLogger, aw as useIntervalFn, a$ as h, aB as IconXCircle, aI as listJobs, et as deleteJob, aJ as cancelJob, aH as getJobStatus, o as onMounted, ax as onUnmounted, eu as IconActivity, aA as IconCheckCircle, ev as IconAlertCircle, q as withDirectives, ae as vModelSelect, ew as IconFilter, V as IconSearch, v as vModelText, ar as mergeProps, ex as listJobTypes, ey as batchCopyItems } from "./index-BQxzU9F1.js";
import { u as useConfirmDialog, _ as _sfc_main$a } from "./useConfirmDialog-c5dcTgIB.js";
import { u as useCreatorBadge } from "./useCreatorBadge-OKtN1JzK.js";
import { _ as _sfc_main$8 } from "./AdminTable-CrUS055e.js";
import { _ as _sfc_main$9 } from "./CommonPagination-WikHSq_I.js";
import { u as useAdminBase } from "./useAdminBase-CxkodUK-.js";
import "./timeUtils-D81jJILb.js";
const _hoisted_1$6 = { class: "bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow" };
const _hoisted_2$6 = { class: "text-sm font-medium text-gray-500 dark:text-gray-400" };
const _hoisted_3$6 = { class: "text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1" };
const _hoisted_4$6 = {
  key: 0,
  class: "text-xs text-gray-400 dark:text-gray-500 mt-2"
};
const _sfc_main$7 = {
  __name: "StatsCard",
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    icon: {
      type: Object,
      required: true
    },
    trend: {
      type: String,
      default: null
    },
    colorClass: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createBaseVNode("div", null, [
          createBaseVNode("p", _hoisted_2$6, toDisplayString(__props.title), 1),
          createBaseVNode("h3", _hoisted_3$6, toDisplayString(__props.value), 1),
          __props.trend ? (openBlock(), createElementBlock("p", _hoisted_4$6, toDisplayString(__props.trend), 1)) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", {
          class: normalizeClass(__props.colorClass + " p-2 rounded-lg")
        }, [
          (openBlock(), createBlock(resolveDynamicComponent(__props.icon), { class: "w-5 h-5" }))
        ], 2)
      ]);
    };
  }
};
const _sfc_main$6 = {
  __name: "StatusBadge",
  props: {
    status: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const statusConfig = {
      pending: {
        class: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
      },
      running: {
        class: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      },
      completed: {
        class: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      },
      partial: {
        class: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      },
      failed: {
        class: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      },
      cancelled: {
        class: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
      }
    };
    const statusText = computed(() => {
      const textMap = {
        pending: t("admin.tasks.status.pending"),
        running: t("admin.tasks.status.running"),
        completed: t("admin.tasks.status.completed"),
        partial: t("admin.tasks.status.partial"),
        failed: t("admin.tasks.status.failed"),
        cancelled: t("admin.tasks.status.cancelled")
      };
      return textMap[props.status] || props.status;
    });
    const badgeClass = computed(() => {
      const baseClass = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium";
      const colorClass = statusConfig[props.status]?.class || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
      return `${baseClass} ${colorClass}`;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(badgeClass.value)
      }, toDisplayString(statusText.value), 3);
    };
  }
};
const _hoisted_1$5 = {
  key: 0,
  class: "w-24 flex flex-col gap-1"
};
const _hoisted_2$5 = { class: "flex justify-between text-[10px] text-gray-500 dark:text-gray-400" };
const _hoisted_3$5 = {
  key: 0,
  class: "animate-pulse text-blue-500 dark:text-blue-400"
};
const _hoisted_4$5 = { class: "flex h-1.5 w-full rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700" };
const _hoisted_5$5 = {
  key: 1,
  class: "w-24 flex flex-col gap-1"
};
const _hoisted_6$5 = { class: "flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400" };
const _hoisted_7$5 = { key: 0 };
const _hoisted_8$5 = {
  key: 1,
  class: "animate-pulse text-blue-500 dark:text-blue-400"
};
const _hoisted_9$5 = {
  key: 0,
  class: "flex h-1 w-full rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700"
};
const _hoisted_10$5 = {
  key: 1,
  class: "h-1 w-full rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700"
};
const _hoisted_11$5 = {
  key: 2,
  class: "text-xs text-gray-400 dark:text-gray-500"
};
const _sfc_main$5 = {
  __name: "TaskProgressBar",
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const hasKnownTotal = computed(() => {
      return props.task.stats && props.task.stats.totalItems && props.task.stats.totalItems > 0;
    });
    const hasDynamicStats = computed(() => {
      if (hasKnownTotal.value) return false;
      const stats = props.task.stats;
      if (!stats) return false;
      return stats.successCount > 0 || stats.failedCount > 0 || stats.skippedCount > 0 || stats.processedItems > 0 || Array.isArray(stats.itemResults) && stats.itemResults.length > 0;
    });
    const total = computed(() => props.task.stats?.totalItems || 0);
    const processed = computed(() => props.task.stats?.processedItems || 0);
    const success = computed(() => props.task.stats?.successCount || 0);
    const failed = computed(() => props.task.stats?.failedCount || 0);
    const skipped = computed(() => props.task.stats?.skippedCount || 0);
    const itemResultsCount = computed(() => {
      const results = props.task.stats?.itemResults;
      return Array.isArray(results) ? results.length : 0;
    });
    const progressPercent = computed(() => {
      if (total.value === 0) return 0;
      return Math.round(processed.value / total.value * 100);
    });
    const successPercent = computed(() => {
      if (total.value === 0) return 0;
      return success.value / total.value * 100;
    });
    const skippedPercent = computed(() => {
      if (total.value === 0) return 0;
      return skipped.value / total.value * 100;
    });
    const failedPercent = computed(() => {
      if (total.value === 0) return 0;
      return failed.value / total.value * 100;
    });
    const dynamicTotal = computed(() => {
      if (processed.value > 0) return processed.value;
      const sum = success.value + failed.value + skipped.value;
      return sum > 0 ? sum : 0;
    });
    const dynamicDisplayCount = computed(() => {
      if (processed.value > 0) return processed.value;
      if (itemResultsCount.value > 0) return itemResultsCount.value;
      return 0;
    });
    const dynamicSuccessPercent = computed(() => {
      if (dynamicTotal.value === 0) return 0;
      return success.value / dynamicTotal.value * 100;
    });
    const dynamicSkippedPercent = computed(() => {
      if (dynamicTotal.value === 0) return 0;
      return skipped.value / dynamicTotal.value * 100;
    });
    const dynamicFailedPercent = computed(() => {
      if (dynamicTotal.value === 0) return 0;
      return failed.value / dynamicTotal.value * 100;
    });
    return (_ctx, _cache) => {
      return hasKnownTotal.value ? (openBlock(), createElementBlock("div", _hoisted_1$5, [
        createBaseVNode("div", _hoisted_2$5, [
          createBaseVNode("span", null, toDisplayString(progressPercent.value) + "%", 1),
          __props.task.status === "running" ? (openBlock(), createElementBlock("span", _hoisted_3$5, "...")) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_4$5, [
          createBaseVNode("div", {
            style: normalizeStyle({ width: `${successPercent.value}%` }),
            class: "bg-emerald-500 dark:bg-emerald-600 transition-all duration-300"
          }, null, 4),
          createBaseVNode("div", {
            style: normalizeStyle({ width: `${skippedPercent.value}%` }),
            class: "bg-amber-400 dark:bg-amber-500 transition-all duration-300"
          }, null, 4),
          createBaseVNode("div", {
            style: normalizeStyle({ width: `${failedPercent.value}%` }),
            class: "bg-red-500 dark:bg-red-600 transition-all duration-300"
          }, null, 4)
        ])
      ])) : hasDynamicStats.value ? (openBlock(), createElementBlock("div", _hoisted_5$5, [
        createBaseVNode("div", _hoisted_6$5, [
          dynamicDisplayCount.value > 0 ? (openBlock(), createElementBlock("span", _hoisted_7$5, toDisplayString(unref(t)("admin.tasks.progress.items", { count: dynamicDisplayCount.value })), 1)) : createCommentVNode("", true),
          __props.task.status === "running" ? (openBlock(), createElementBlock("span", _hoisted_8$5, "...")) : createCommentVNode("", true)
        ]),
        dynamicTotal.value > 0 ? (openBlock(), createElementBlock("div", _hoisted_9$5, [
          createBaseVNode("div", {
            style: normalizeStyle({ width: `${dynamicSuccessPercent.value}%` }),
            class: "bg-emerald-500 dark:bg-emerald-600 transition-all duration-300"
          }, null, 4),
          createBaseVNode("div", {
            style: normalizeStyle({ width: `${dynamicSkippedPercent.value}%` }),
            class: "bg-amber-400 dark:bg-amber-500 transition-all duration-300"
          }, null, 4),
          createBaseVNode("div", {
            style: normalizeStyle({ width: `${dynamicFailedPercent.value}%` }),
            class: "bg-red-500 dark:bg-red-600 transition-all duration-300"
          }, null, 4)
        ])) : __props.task.status === "running" ? (openBlock(), createElementBlock("div", _hoisted_10$5, _cache[0] || (_cache[0] = [
          createBaseVNode("div", { class: "h-full w-1/3 bg-blue-500 dark:bg-blue-400 rounded-full animate-indeterminate" }, null, -1)
        ]))) : createCommentVNode("", true)
      ])) : (openBlock(), createElementBlock("div", _hoisted_11$5, toDisplayString(unref(t)("admin.tasks.progress.empty")), 1));
    };
  }
};
const TaskProgressBar = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-20514f2f"]]);
const _hoisted_1$4 = { class: "space-y-4" };
const _hoisted_2$4 = { class: "flex items-center justify-between" };
const _hoisted_3$4 = { class: "text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2" };
const _hoisted_4$4 = { class: "text-gray-500 dark:text-gray-400 font-normal" };
const _hoisted_5$4 = {
  key: 0,
  class: "space-y-2 max-h-[400px] overflow-y-auto pr-1"
};
const _hoisted_6$4 = ["onClick"];
const _hoisted_7$4 = { class: "flex-shrink-0" };
const _hoisted_8$4 = {
  key: 0,
  class: "w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shadow-sm"
};
const _hoisted_9$4 = {
  key: 1,
  class: "w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shadow-sm"
};
const _hoisted_10$4 = {
  key: 2,
  class: "w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shadow-sm animate-pulse"
};
const _hoisted_11$4 = {
  key: 3,
  class: "w-5 h-5 rounded-full bg-red-500 flex items-center justify-center shadow-sm"
};
const _hoisted_12$4 = {
  key: 4,
  class: "w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center shadow-sm"
};
const _hoisted_13$4 = {
  key: 5,
  class: "w-5 h-5 rounded-full border-2 flex items-center justify-center border-gray-300 dark:border-gray-500 bg-gray-100 dark:bg-gray-700"
};
const _hoisted_14$4 = { class: "flex-shrink-0 max-w-[200px] flex items-center gap-1" };
const _hoisted_15$4 = ["title"];
const _hoisted_16$4 = ["title"];
const _hoisted_17$4 = { class: "flex-1 min-w-0 flex items-center gap-1 text-gray-500 dark:text-gray-400" };
const _hoisted_18$4 = ["title"];
const _hoisted_19$4 = { class: "flex-shrink-0 w-20 text-right font-mono text-gray-500 dark:text-gray-400" };
const _hoisted_20$4 = ["onClick", "title"];
const _hoisted_21$4 = {
  key: 0,
  class: "overflow-hidden"
};
const _hoisted_22$4 = { class: "relative px-3 pb-2 pt-1 space-y-1.5 border-t border-gray-100 dark:border-gray-700/50" };
const _hoisted_23$4 = { class: "flex items-start gap-2 text-xs" };
const _hoisted_24$4 = { class: "flex-shrink-0 text-gray-500 dark:text-gray-400" };
const _hoisted_25$4 = { class: "font-mono text-gray-700 dark:text-gray-300 break-all select-text" };
const _hoisted_26$4 = { class: "flex items-start gap-2 text-xs" };
const _hoisted_27$4 = { class: "flex-shrink-0 text-gray-500 dark:text-gray-400" };
const _hoisted_28$4 = { class: "font-mono text-gray-700 dark:text-gray-300 break-all select-text" };
const _hoisted_29$4 = {
  key: 0,
  class: "relative px-3 pb-2 pt-0"
};
const _hoisted_30$4 = { class: "flex items-start gap-1.5 px-2 py-1.5 rounded text-xs bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300" };
const _hoisted_31$4 = { class: "break-words" };
const _hoisted_32$4 = {
  key: 1,
  class: "relative px-3 pb-2 pt-0"
};
const _hoisted_33$3 = { class: "flex items-start gap-1.5 px-2 py-1.5 rounded text-xs bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-200 border border-yellow-100 dark:border-yellow-800/50" };
const _hoisted_34$3 = { class: "break-words" };
const _hoisted_35$3 = {
  key: 1,
  class: "text-center py-8 text-gray-500 dark:text-gray-400 text-sm"
};
const _sfc_main$4 = {
  __name: "TaskDetailsCopy",
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  emits: ["retry-all-failed", "retry-file"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const expandedItems = ref(/* @__PURE__ */ new Set());
    const toggleExpand = (index) => {
      if (expandedItems.value.has(index)) {
        expandedItems.value.delete(index);
      } else {
        expandedItems.value.add(index);
      }
    };
    const itemResults = computed(() => props.task.stats?.itemResults || []);
    const failedItems = computed(() => {
      return itemResults.value.filter((item) => item.status === "failed");
    });
    const failedCount = computed(() => failedItems.value.length);
    const extractNameFromPath = (path) => {
      if (!path || typeof path !== "string") return "";
      return path.replace(/\/+$/, "").split("/").filter(Boolean).pop() || "";
    };
    const formatFileSize = (bytes) => {
      if (!bytes || bytes === 0) return "0 B";
      const k = 1024;
      const sizes = ["B", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    };
    const getDisplaySize = (item) => {
      if (item?.fileSize) return formatFileSize(item.fileSize);
      if (item?.bytesTransferred) return formatFileSize(item.bytesTransferred);
      return "--";
    };
    const handleRetryAllFailed = () => {
      emit("retry-all-failed", { task: props.task, items: failedItems.value });
    };
    const handleRetryFile = (item) => {
      emit("retry-file", { task: props.task, item });
    };
    const getFileStatusBadgeClass = (status) => {
      const classes = {
        success: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
        processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
        retrying: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
        failed: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
        skipped: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
        pending: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
      };
      return classes[status] || classes.pending;
    };
    const getFileStatusText = (status) => {
      const textMap = {
        success: t("admin.tasks.fileStatus.success"),
        processing: t("admin.tasks.fileStatus.processing"),
        retrying: t("admin.tasks.fileStatus.retrying"),
        failed: t("admin.tasks.fileStatus.failed"),
        skipped: t("admin.tasks.fileStatus.skipped"),
        pending: t("admin.tasks.fileStatus.pending")
      };
      return textMap[status] || status;
    };
    const getFileProgressBgClass = (status) => {
      const classes = {
        success: "bg-green-500/15 dark:bg-green-500/20",
        processing: "bg-blue-500/15 dark:bg-blue-500/20",
        retrying: "bg-orange-500/15 dark:bg-orange-500/20",
        failed: "bg-red-500/10 dark:bg-red-500/15",
        skipped: "bg-yellow-500/10 dark:bg-yellow-500/15",
        pending: "bg-gray-200/50 dark:bg-gray-600/20"
      };
      return classes[status] || classes.pending;
    };
    const getFileProgressWidth = (item) => {
      if (["success", "failed", "skipped"].includes(item.status)) {
        return "100%";
      }
      if (item.status === "processing" || item.status === "retrying") {
        if (item.progress !== void 0 && item.progress > 0) {
          return `${Math.min(100, Math.max(5, item.progress))}%`;
        }
        if (item.bytesTransferred > 0 && item.fileSize > 0) {
          const progress = Math.round(item.bytesTransferred / item.fileSize * 100);
          return `${Math.min(100, Math.max(5, progress))}%`;
        }
        if (item.bytesTransferred > 0) {
          return "50%";
        }
        return "10%";
      }
      return "0%";
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        createBaseVNode("div", _hoisted_2$4, [
          createBaseVNode("h3", _hoisted_3$4, [
            createVNode(unref(IconCopy), { class: "w-4 h-4" }),
            createTextVNode(" " + toDisplayString(unref(t)("admin.tasks.details.fileList")) + " ", 1),
            createBaseVNode("span", _hoisted_4$4, " (" + toDisplayString(itemResults.value.length) + ") ", 1)
          ]),
          __props.task.allowedActions?.canRetry && failedCount.value > 0 ? (openBlock(), createElementBlock("button", {
            key: 0,
            onClick: handleRetryAllFailed,
            class: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white"
          }, [
            createVNode(unref(IconRefresh), { class: "w-4 h-4" }),
            createTextVNode(" " + toDisplayString(unref(t)("admin.tasks.actions.retryAllFailed")) + " (" + toDisplayString(failedCount.value) + ") ", 1)
          ])) : createCommentVNode("", true)
        ]),
        itemResults.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_5$4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(itemResults.value, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "group relative rounded-lg overflow-hidden transition-all duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["absolute inset-0 transition-all duration-500 ease-out", getFileProgressBgClass(item.status)]),
                style: normalizeStyle({ width: getFileProgressWidth(item) })
              }, null, 6),
              createBaseVNode("div", {
                class: "relative flex items-center gap-3 px-3 py-2.5 text-xs cursor-pointer select-none hover:bg-gray-50/50 dark:hover:bg-gray-700/30",
                onClick: ($event) => toggleExpand(index)
              }, [
                createBaseVNode("span", _hoisted_7$4, [
                  item.status === "success" ? (openBlock(), createElementBlock("span", _hoisted_8$4, [
                    createVNode(unref(IconCheck), { class: "w-3 h-3 text-white" })
                  ])) : item.status === "processing" ? (openBlock(), createElementBlock("span", _hoisted_9$4, [
                    createVNode(unref(IconRefresh), { class: "w-3 h-3 text-white animate-spin" })
                  ])) : item.status === "retrying" ? (openBlock(), createElementBlock("span", _hoisted_10$4, [
                    createVNode(unref(IconRefresh), { class: "w-3 h-3 text-white" })
                  ])) : item.status === "failed" ? (openBlock(), createElementBlock("span", _hoisted_11$4, [
                    createVNode(unref(IconClose), { class: "w-3 h-3 text-white" })
                  ])) : item.status === "skipped" ? (openBlock(), createElementBlock("span", _hoisted_12$4, _cache[0] || (_cache[0] = [
                    createBaseVNode("span", { class: "text-white text-xs leading-none" }, "—", -1)
                  ]))) : (openBlock(), createElementBlock("span", _hoisted_13$4, _cache[1] || (_cache[1] = [
                    createBaseVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" }, null, -1)
                  ])))
                ]),
                createBaseVNode("span", _hoisted_14$4, [
                  createBaseVNode("span", {
                    class: "truncate font-medium text-gray-800 dark:text-gray-100",
                    title: item.sourcePath
                  }, toDisplayString(extractNameFromPath(item.sourcePath)), 9, _hoisted_15$4),
                  item.retryCount && item.retryCount > 0 ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: "flex-shrink-0 text-orange-500 text-xs",
                    title: unref(t)("admin.tasks.retry.retryCount", { count: item.retryCount })
                  }, " ×" + toDisplayString(item.retryCount), 9, _hoisted_16$4)) : createCommentVNode("", true)
                ]),
                createBaseVNode("span", _hoisted_17$4, [
                  createVNode(unref(IconChevronRight), { class: "w-3 h-3 flex-shrink-0" }),
                  createBaseVNode("span", {
                    class: "truncate font-mono text-xs",
                    title: item.targetPath
                  }, toDisplayString(item.targetPath || "..."), 9, _hoisted_18$4)
                ]),
                createBaseVNode("span", _hoisted_19$4, toDisplayString(getDisplaySize(item)), 1),
                createBaseVNode("span", {
                  class: normalizeClass(["flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium", getFileStatusBadgeClass(item.status)])
                }, toDisplayString(getFileStatusText(item.status)), 3),
                __props.task.allowedActions?.canRetry && item.status === "failed" ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  onClick: withModifiers(($event) => handleRetryFile(item), ["stop"]),
                  class: "flex-shrink-0 p-1.5 rounded-md transition-colors bg-orange-500/10 hover:bg-orange-500/20 dark:bg-orange-500/20 dark:hover:bg-orange-500/30 text-orange-600 dark:text-orange-400",
                  title: unref(t)("admin.tasks.actions.retryFile")
                }, [
                  createVNode(unref(IconRefresh), { class: "w-4 h-4" })
                ], 8, _hoisted_20$4)) : createCommentVNode("", true),
                createVNode(unref(IconChevronDown), {
                  class: normalizeClass(["w-4 h-4 flex-shrink-0 text-gray-400 dark:text-gray-500 transition-transform duration-200", { "rotate-180": expandedItems.value.has(index) }])
                }, null, 8, ["class"])
              ], 8, _hoisted_6$4),
              createVNode(Transition, {
                "enter-active-class": "transition-all duration-200 ease-out",
                "enter-from-class": "opacity-0 max-h-0",
                "enter-to-class": "opacity-100 max-h-40",
                "leave-active-class": "transition-all duration-150 ease-in",
                "leave-from-class": "opacity-100 max-h-40",
                "leave-to-class": "opacity-0 max-h-0"
              }, {
                default: withCtx(() => [
                  expandedItems.value.has(index) ? (openBlock(), createElementBlock("div", _hoisted_21$4, [
                    createBaseVNode("div", _hoisted_22$4, [
                      createBaseVNode("div", _hoisted_23$4, [
                        createBaseVNode("span", _hoisted_24$4, toDisplayString(unref(t)("admin.tasks.details.sourcePath")) + ":", 1),
                        createBaseVNode("span", _hoisted_25$4, toDisplayString(item.sourcePath), 1)
                      ]),
                      createBaseVNode("div", _hoisted_26$4, [
                        createBaseVNode("span", _hoisted_27$4, toDisplayString(unref(t)("admin.tasks.details.targetPath")) + ":", 1),
                        createBaseVNode("span", _hoisted_28$4, toDisplayString(item.targetPath), 1)
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1024),
              item.status === "failed" && item.error ? (openBlock(), createElementBlock("div", _hoisted_29$4, [
                createBaseVNode("div", _hoisted_30$4, [
                  createVNode(unref(IconExclamation), { class: "w-4 h-4 flex-shrink-0 mt-0.5" }),
                  createBaseVNode("span", _hoisted_31$4, toDisplayString(item.error), 1)
                ])
              ])) : createCommentVNode("", true),
              item.status === "skipped" && item.message ? (openBlock(), createElementBlock("div", _hoisted_32$4, [
                createBaseVNode("div", _hoisted_33$3, [
                  createVNode(unref(IconExclamation), { class: "w-4 h-4 flex-shrink-0 mt-0.5" }),
                  createBaseVNode("span", _hoisted_34$3, toDisplayString(item.message), 1)
                ])
              ])) : createCommentVNode("", true)
            ]);
          }), 128))
        ])) : (openBlock(), createElementBlock("div", _hoisted_35$3, [
          createVNode(unref(IconCopy), { class: "w-8 h-8 mx-auto mb-2 opacity-50" }),
          createBaseVNode("p", null, toDisplayString(unref(t)("admin.tasks.details.noFiles")), 1)
        ]))
      ]);
    };
  }
};
const _hoisted_1$3 = { class: "space-y-4" };
const _hoisted_2$3 = { class: "flex items-center justify-between" };
const _hoisted_3$3 = { class: "font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 text-sm" };
const _hoisted_4$3 = { class: "flex items-center gap-3 text-xs" };
const _hoisted_5$3 = { class: "text-gray-600 dark:text-gray-400" };
const _hoisted_6$3 = { class: "font-semibold text-gray-900 dark:text-gray-100" };
const _hoisted_7$3 = { class: "ml-1" };
const _hoisted_8$3 = { class: "flex items-center gap-2" };
const _hoisted_9$3 = {
  key: 0,
  class: "flex items-center gap-1 text-green-600 dark:text-green-400"
};
const _hoisted_10$3 = {
  key: 1,
  class: "flex items-center gap-1 text-red-600 dark:text-red-400"
};
const _hoisted_11$3 = {
  key: 2,
  class: "flex items-center gap-1 text-yellow-600 dark:text-yellow-400"
};
const _hoisted_12$3 = {
  key: 0,
  class: "relative"
};
const _hoisted_13$3 = { class: "h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden" };
const _hoisted_14$3 = {
  key: 1,
  class: "space-y-1.5 max-h-[400px] overflow-y-auto pr-1"
};
const _hoisted_15$3 = ["onClick"];
const _hoisted_16$3 = { class: "flex-shrink-0" };
const _hoisted_17$3 = {
  key: 0,
  class: "w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
};
const _hoisted_18$3 = {
  key: 1,
  class: "w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center animate-pulse"
};
const _hoisted_19$3 = {
  key: 2,
  class: "w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
};
const _hoisted_20$3 = {
  key: 3,
  class: "w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center"
};
const _hoisted_21$3 = {
  key: 4,
  class: "w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
};
const _hoisted_22$3 = { class: "flex-1 min-w-0 font-medium text-sm text-gray-900 dark:text-gray-100 truncate" };
const _hoisted_23$3 = { class: "flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400" };
const _hoisted_24$3 = {
  key: 0,
  class: "flex items-center gap-1"
};
const _hoisted_25$3 = { class: "font-medium text-gray-700 dark:text-gray-300" };
const _hoisted_26$3 = {
  key: 1,
  class: "flex items-center gap-1"
};
const _hoisted_27$3 = { class: "font-medium text-gray-700 dark:text-gray-300" };
const _hoisted_28$3 = {
  key: 2,
  class: "font-mono"
};
const _hoisted_29$3 = {
  key: 0,
  class: "overflow-hidden"
};
const _hoisted_30$3 = { class: "px-3 pb-3 pt-1 border-t border-gray-100 dark:border-gray-700/50" };
const _hoisted_31$3 = { class: "grid grid-cols-2 gap-x-4 gap-y-2 text-xs" };
const _hoisted_32$3 = { class: "flex items-center justify-between" };
const _hoisted_33$2 = { class: "text-gray-500 dark:text-gray-400 flex items-center gap-1.5" };
const _hoisted_34$2 = { class: "font-medium text-gray-900 dark:text-gray-100" };
const _hoisted_35$2 = { class: "flex items-center justify-between" };
const _hoisted_36$2 = { class: "text-gray-500 dark:text-gray-400 flex items-center gap-1.5" };
const _hoisted_37$2 = { class: "font-medium text-gray-900 dark:text-gray-100" };
const _hoisted_38$2 = {
  key: 0,
  class: "flex items-center justify-between"
};
const _hoisted_39$2 = { class: "text-gray-500 dark:text-gray-400 flex items-center gap-1.5" };
const _hoisted_40$2 = { class: "font-medium font-mono text-gray-900 dark:text-gray-100" };
const _hoisted_41$2 = {
  key: 1,
  class: "col-span-2 flex items-start gap-1.5"
};
const _hoisted_42$2 = { class: "text-gray-500 dark:text-gray-400 flex-shrink-0" };
const _hoisted_43$2 = { class: "font-mono text-gray-700 dark:text-gray-300 break-all" };
const _hoisted_44$2 = {
  key: 0,
  class: "mt-3 p-2 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50"
};
const _hoisted_45$2 = { class: "flex items-center gap-2 mb-2" };
const _hoisted_46$2 = { class: "text-xs font-medium text-blue-700 dark:text-blue-300" };
const _hoisted_47$2 = { class: "grid grid-cols-3 gap-2 text-xs" };
const _hoisted_48$2 = { class: "text-center" };
const _hoisted_49$2 = { class: "font-semibold text-blue-900 dark:text-blue-100" };
const _hoisted_50$2 = { class: "text-blue-600 dark:text-blue-400" };
const _hoisted_51$2 = { class: "text-center" };
const _hoisted_52$2 = { class: "font-semibold text-blue-900 dark:text-blue-100" };
const _hoisted_53$2 = { class: "text-blue-600 dark:text-blue-400" };
const _hoisted_54$1 = { class: "text-center" };
const _hoisted_55$1 = { class: "font-semibold text-blue-900 dark:text-blue-100" };
const _hoisted_56$1 = { class: "text-blue-600 dark:text-blue-400" };
const _hoisted_57$1 = {
  key: 1,
  class: "mt-3 flex items-start gap-2 p-2 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50"
};
const _hoisted_58$1 = { class: "flex-1 min-w-0 text-xs text-red-700 dark:text-red-300 break-words" };
const _hoisted_59$1 = {
  key: 2,
  class: "text-center py-8 text-gray-500 dark:text-gray-400"
};
const _hoisted_60$1 = { class: "text-sm" };
const _sfc_main$3 = {
  __name: "TaskDetailsFsIndexRebuild",
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const expandedItems = ref(/* @__PURE__ */ new Set());
    const stats = computed(() => props.task.stats || {});
    const itemResults = computed(() => props.task.stats?.itemResults || []);
    const isRunning = computed(() => {
      const status = props.task.status;
      return status === "running" || status === "pending";
    });
    const hasRealtimeData = computed(() => {
      const s = stats.value;
      return s.scannedDirs !== void 0 || s.discoveredCount !== void 0 || s.pendingCount !== void 0;
    });
    const progressPercent = computed(() => {
      const total = stats.value.totalItems || 0;
      const processed = stats.value.processedItems || 0;
      if (total === 0) return 0;
      return Math.min(100, Math.round(processed / total * 100));
    });
    const getDiscoveredCount = (item) => {
      if (item.discoveredCount !== void 0) {
        return item.discoveredCount;
      }
      if (item.meta?.discoveredCount !== void 0) {
        return item.meta.discoveredCount;
      }
      if (item.status === "processing" && stats.value.discoveredCount !== void 0) {
        return stats.value.discoveredCount;
      }
      return 0;
    };
    const getUpsertedCount = (item) => {
      if (item.upsertedCount !== void 0) {
        return item.upsertedCount;
      }
      if (item.meta?.upsertedCount !== void 0) {
        return item.meta.upsertedCount;
      }
      if (item.status === "processing" && stats.value.upsertedCount !== void 0) {
        return stats.value.upsertedCount;
      }
      return 0;
    };
    const toggleExpand = (index) => {
      if (expandedItems.value.has(index)) {
        expandedItems.value.delete(index);
      } else {
        expandedItems.value.add(index);
      }
    };
    const formatNumber = (num) => {
      if (num === void 0 || num === null) return "0";
      return num.toLocaleString();
    };
    const formatDuration = (ms) => {
      if (!ms) return "";
      if (ms < 1e3) return `${ms}ms`;
      if (ms < 6e4) {
        const seconds2 = (ms / 1e3).toFixed(1);
        return `${seconds2}s`;
      }
      const minutes = Math.floor(ms / 6e4);
      const seconds = Math.round(ms % 6e4 / 1e3);
      return `${minutes}m ${seconds}s`;
    };
    const getItemContainerClass = (item) => {
      const baseClass = "bg-white dark:bg-gray-800/50";
      const statusClasses = {
        success: "border-green-200 dark:border-green-800/50",
        processing: "border-blue-300 dark:border-blue-700/50 ring-1 ring-blue-200 dark:ring-blue-800/30",
        failed: "border-red-200 dark:border-red-800/50",
        skipped: "border-yellow-200 dark:border-yellow-800/50",
        pending: "border-gray-200 dark:border-gray-700"
      };
      return `${baseClass} ${statusClasses[item.status] || statusClasses.pending}`;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", _hoisted_2$3, [
          createBaseVNode("h3", _hoisted_3$3, [
            createVNode(unref(IconDatabase), { class: "w-4 h-4" }),
            createBaseVNode("span", null, toDisplayString(unref(t)("admin.tasks.indexDetails.rebuildTitle")), 1)
          ]),
          createBaseVNode("div", _hoisted_4$3, [
            createBaseVNode("span", _hoisted_5$3, [
              createBaseVNode("span", _hoisted_6$3, toDisplayString(stats.value.processedItems || 0), 1),
              _cache[0] || (_cache[0] = createBaseVNode("span", { class: "mx-0.5" }, "/", -1)),
              createBaseVNode("span", null, toDisplayString(stats.value.totalItems || 0), 1),
              createBaseVNode("span", _hoisted_7$3, toDisplayString(unref(t)("admin.tasks.indexDetails.mountUnit")), 1)
            ]),
            createBaseVNode("div", _hoisted_8$3, [
              stats.value.successCount ? (openBlock(), createElementBlock("span", _hoisted_9$3, [
                createVNode(unref(IconCheck), { class: "w-3 h-3" }),
                createBaseVNode("span", null, toDisplayString(stats.value.successCount), 1)
              ])) : createCommentVNode("", true),
              stats.value.failedCount ? (openBlock(), createElementBlock("span", _hoisted_10$3, [
                createVNode(unref(IconClose), { class: "w-3 h-3" }),
                createBaseVNode("span", null, toDisplayString(stats.value.failedCount), 1)
              ])) : createCommentVNode("", true),
              stats.value.skippedCount ? (openBlock(), createElementBlock("span", _hoisted_11$3, [
                createVNode(unref(IconMinus), { class: "w-3 h-3" }),
                createBaseVNode("span", null, toDisplayString(stats.value.skippedCount), 1)
              ])) : createCommentVNode("", true)
            ])
          ])
        ]),
        isRunning.value && stats.value.totalItems > 0 ? (openBlock(), createElementBlock("div", _hoisted_12$3, [
          createBaseVNode("div", _hoisted_13$3, [
            createBaseVNode("div", {
              class: "h-full bg-blue-500 dark:bg-blue-400 transition-all duration-300 ease-out",
              style: normalizeStyle({ width: `${progressPercent.value}%` })
            }, null, 4)
          ])
        ])) : createCommentVNode("", true),
        itemResults.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_14$3, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(itemResults.value, (item, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: normalizeClass(["rounded-lg border transition-all duration-200 overflow-hidden", getItemContainerClass(item)])
            }, [
              createBaseVNode("div", {
                class: "flex items-center gap-2.5 px-3 py-2 cursor-pointer select-none hover:bg-gray-50 dark:hover:bg-gray-800/50",
                onClick: ($event) => toggleExpand(index)
              }, [
                createBaseVNode("span", _hoisted_16$3, [
                  item.status === "success" ? (openBlock(), createElementBlock("span", _hoisted_17$3, [
                    createVNode(unref(IconCheck), { class: "w-3 h-3 text-white" })
                  ])) : item.status === "processing" ? (openBlock(), createElementBlock("span", _hoisted_18$3, [
                    createVNode(unref(IconRefresh), { class: "w-3 h-3 text-white animate-spin" })
                  ])) : item.status === "failed" ? (openBlock(), createElementBlock("span", _hoisted_19$3, [
                    createVNode(unref(IconClose), { class: "w-3 h-3 text-white" })
                  ])) : item.status === "skipped" ? (openBlock(), createElementBlock("span", _hoisted_20$3, [
                    createVNode(unref(IconMinus), { class: "w-3 h-3 text-white" })
                  ])) : (openBlock(), createElementBlock("span", _hoisted_21$3, _cache[1] || (_cache[1] = [
                    createBaseVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" }, null, -1)
                  ])))
                ]),
                createBaseVNode("span", _hoisted_22$3, toDisplayString(item.mountName || item.mountPath || item.label || item.sourcePath || unref(t)("admin.tasks.indexDetails.unknownMount")), 1),
                createBaseVNode("div", _hoisted_23$3, [
                  getDiscoveredCount(item) > 0 ? (openBlock(), createElementBlock("span", _hoisted_24$3, [
                    createVNode(unref(IconFolder), { class: "w-3.5 h-3.5" }),
                    createBaseVNode("span", _hoisted_25$3, toDisplayString(formatNumber(getDiscoveredCount(item))), 1)
                  ])) : createCommentVNode("", true),
                  getUpsertedCount(item) > 0 ? (openBlock(), createElementBlock("span", _hoisted_26$3, [
                    createVNode(unref(IconDatabase), { class: "w-3.5 h-3.5" }),
                    createBaseVNode("span", _hoisted_27$3, toDisplayString(formatNumber(getUpsertedCount(item))), 1)
                  ])) : createCommentVNode("", true),
                  item.durationMs ? (openBlock(), createElementBlock("span", _hoisted_28$3, toDisplayString(formatDuration(item.durationMs)), 1)) : createCommentVNode("", true)
                ]),
                createVNode(unref(IconChevronDown), {
                  class: normalizeClass(["w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 flex-shrink-0", { "rotate-180": expandedItems.value.has(index) }])
                }, null, 8, ["class"])
              ], 8, _hoisted_15$3),
              createVNode(Transition, {
                "enter-active-class": "transition-all duration-200 ease-out",
                "enter-from-class": "opacity-0 max-h-0",
                "enter-to-class": "opacity-100 max-h-96",
                "leave-active-class": "transition-all duration-150 ease-in",
                "leave-from-class": "opacity-100 max-h-96",
                "leave-to-class": "opacity-0 max-h-0"
              }, {
                default: withCtx(() => [
                  expandedItems.value.has(index) ? (openBlock(), createElementBlock("div", _hoisted_29$3, [
                    createBaseVNode("div", _hoisted_30$3, [
                      createBaseVNode("div", _hoisted_31$3, [
                        createBaseVNode("div", _hoisted_32$3, [
                          createBaseVNode("span", _hoisted_33$2, [
                            createVNode(unref(IconFolder), { class: "w-3.5 h-3.5" }),
                            createTextVNode(" " + toDisplayString(unref(t)("admin.tasks.indexDetails.discovered")), 1)
                          ]),
                          createBaseVNode("span", _hoisted_34$2, toDisplayString(formatNumber(getDiscoveredCount(item))), 1)
                        ]),
                        createBaseVNode("div", _hoisted_35$2, [
                          createBaseVNode("span", _hoisted_36$2, [
                            createVNode(unref(IconDatabase), { class: "w-3.5 h-3.5" }),
                            createTextVNode(" " + toDisplayString(unref(t)("admin.tasks.indexDetails.upserted")), 1)
                          ]),
                          createBaseVNode("span", _hoisted_37$2, toDisplayString(formatNumber(getUpsertedCount(item))), 1)
                        ]),
                        item.durationMs ? (openBlock(), createElementBlock("div", _hoisted_38$2, [
                          createBaseVNode("span", _hoisted_39$2, [
                            createVNode(unref(IconClock), { class: "w-3.5 h-3.5" }),
                            createTextVNode(" " + toDisplayString(unref(t)("admin.tasks.indexDetails.duration")), 1)
                          ]),
                          createBaseVNode("span", _hoisted_40$2, toDisplayString(formatDuration(item.durationMs)), 1)
                        ])) : createCommentVNode("", true),
                        item.sourcePath && item.sourcePath !== item.label ? (openBlock(), createElementBlock("div", _hoisted_41$2, [
                          createBaseVNode("span", _hoisted_42$2, toDisplayString(unref(t)("admin.tasks.indexDetails.path")) + ":", 1),
                          createBaseVNode("span", _hoisted_43$2, toDisplayString(item.sourcePath), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      item.status === "processing" && hasRealtimeData.value ? (openBlock(), createElementBlock("div", _hoisted_44$2, [
                        createBaseVNode("div", _hoisted_45$2, [
                          _cache[2] || (_cache[2] = createBaseVNode("span", { class: "relative flex h-2 w-2" }, [
                            createBaseVNode("span", { class: "animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" }),
                            createBaseVNode("span", { class: "relative inline-flex rounded-full h-2 w-2 bg-blue-500" })
                          ], -1)),
                          createBaseVNode("span", _hoisted_46$2, toDisplayString(unref(t)("admin.tasks.indexDetails.realtime")), 1)
                        ]),
                        createBaseVNode("div", _hoisted_47$2, [
                          createBaseVNode("div", _hoisted_48$2, [
                            createBaseVNode("div", _hoisted_49$2, toDisplayString(formatNumber(stats.value.scannedDirs || 0)), 1),
                            createBaseVNode("div", _hoisted_50$2, toDisplayString(unref(t)("admin.tasks.indexDetails.scannedDirs")), 1)
                          ]),
                          createBaseVNode("div", _hoisted_51$2, [
                            createBaseVNode("div", _hoisted_52$2, toDisplayString(formatNumber(stats.value.discoveredCount || 0)), 1),
                            createBaseVNode("div", _hoisted_53$2, toDisplayString(unref(t)("admin.tasks.indexDetails.discoveredShort")), 1)
                          ]),
                          createBaseVNode("div", _hoisted_54$1, [
                            createBaseVNode("div", _hoisted_55$1, toDisplayString(formatNumber(stats.value.pendingCount || 0)), 1),
                            createBaseVNode("div", _hoisted_56$1, toDisplayString(unref(t)("admin.tasks.indexDetails.pending")), 1)
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      item.status === "failed" && item.error ? (openBlock(), createElementBlock("div", _hoisted_57$1, [
                        createVNode(unref(IconExclamation), { class: "w-4 h-4 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" }),
                        createBaseVNode("span", _hoisted_58$1, toDisplayString(item.error), 1)
                      ])) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1024)
            ], 2);
          }), 128))
        ])) : (openBlock(), createElementBlock("div", _hoisted_59$1, [
          createVNode(unref(IconDatabase), { class: "w-10 h-10 mx-auto mb-2 opacity-40" }),
          createBaseVNode("p", _hoisted_60$1, toDisplayString(unref(t)("admin.tasks.indexDetails.noMounts")), 1)
        ]))
      ]);
    };
  }
};
const _hoisted_1$2 = { class: "space-y-4" };
const _hoisted_2$2 = { class: "flex items-center justify-between" };
const _hoisted_3$2 = { class: "font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 text-sm" };
const _hoisted_4$2 = { class: "flex items-center gap-3 text-xs" };
const _hoisted_5$2 = { class: "text-gray-600 dark:text-gray-400" };
const _hoisted_6$2 = { class: "font-semibold text-gray-900 dark:text-gray-100" };
const _hoisted_7$2 = { class: "ml-1" };
const _hoisted_8$2 = { class: "flex items-center gap-2" };
const _hoisted_9$2 = {
  key: 0,
  class: "flex items-center gap-1 text-green-600 dark:text-green-400"
};
const _hoisted_10$2 = {
  key: 1,
  class: "flex items-center gap-1 text-red-600 dark:text-red-400"
};
const _hoisted_11$2 = {
  key: 2,
  class: "flex items-center gap-1 text-yellow-600 dark:text-yellow-400"
};
const _hoisted_12$2 = {
  key: 0,
  class: "relative"
};
const _hoisted_13$2 = { class: "h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden" };
const _hoisted_14$2 = {
  key: 1,
  class: "space-y-1.5 max-h-[400px] overflow-y-auto pr-1"
};
const _hoisted_15$2 = ["onClick"];
const _hoisted_16$2 = { class: "flex-shrink-0" };
const _hoisted_17$2 = {
  key: 0,
  class: "w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
};
const _hoisted_18$2 = {
  key: 1,
  class: "w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center animate-pulse"
};
const _hoisted_19$2 = {
  key: 2,
  class: "w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
};
const _hoisted_20$2 = {
  key: 3,
  class: "w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center"
};
const _hoisted_21$2 = {
  key: 4,
  class: "w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
};
const _hoisted_22$2 = { class: "flex-1 min-w-0 font-medium text-sm text-gray-900 dark:text-gray-100 truncate" };
const _hoisted_23$2 = { class: "flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400" };
const _hoisted_24$2 = {
  key: 0,
  class: "flex items-center gap-1"
};
const _hoisted_25$2 = { class: "font-medium text-gray-700 dark:text-gray-300" };
const _hoisted_26$2 = {
  key: 1,
  class: "flex items-center gap-1"
};
const _hoisted_27$2 = { class: "font-medium text-emerald-600 dark:text-emerald-400" };
const _hoisted_28$2 = {
  key: 2,
  class: "flex items-center gap-1"
};
const _hoisted_29$2 = { class: "font-medium text-red-600 dark:text-red-400" };
const _hoisted_30$2 = {
  key: 3,
  class: "flex items-center gap-1"
};
const _hoisted_31$2 = { class: "font-mono" };
const _hoisted_32$2 = {
  key: 0,
  class: "overflow-hidden"
};
const _hoisted_33$1 = { class: "px-3 pb-3 pt-1 border-t border-gray-100 dark:border-gray-700/50" };
const _hoisted_34$1 = { class: "grid grid-cols-2 gap-x-4 gap-y-2 text-xs" };
const _hoisted_35$1 = { class: "flex items-center justify-between" };
const _hoisted_36$1 = { class: "text-gray-500 dark:text-gray-400 flex items-center gap-1.5" };
const _hoisted_37$1 = { class: "font-medium text-gray-900 dark:text-gray-100" };
const _hoisted_38$1 = { class: "flex items-center justify-between" };
const _hoisted_39$1 = { class: "text-gray-500 dark:text-gray-400 flex items-center gap-1.5" };
const _hoisted_40$1 = { class: "font-medium text-emerald-600 dark:text-emerald-400" };
const _hoisted_41$1 = { class: "flex items-center justify-between" };
const _hoisted_42$1 = { class: "text-gray-500 dark:text-gray-400 flex items-center gap-1.5" };
const _hoisted_43$1 = { class: "font-medium text-red-600 dark:text-red-400" };
const _hoisted_44$1 = {
  key: 0,
  class: "flex items-center justify-between"
};
const _hoisted_45$1 = { class: "text-gray-500 dark:text-gray-400 flex items-center gap-1.5" };
const _hoisted_46$1 = { class: "font-medium text-yellow-600 dark:text-yellow-400" };
const _hoisted_47$1 = {
  key: 1,
  class: "flex items-center justify-between"
};
const _hoisted_48$1 = { class: "text-gray-500 dark:text-gray-400 flex items-center gap-1.5" };
const _hoisted_49$1 = { class: "font-medium font-mono text-gray-900 dark:text-gray-100" };
const _hoisted_50$1 = {
  key: 0,
  class: "mt-3 flex items-start gap-2 p-2 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50"
};
const _hoisted_51$1 = { class: "flex-1 min-w-0 text-xs text-red-700 dark:text-red-300 break-words" };
const _hoisted_52$1 = {
  key: 2,
  class: "text-center py-8 text-gray-500 dark:text-gray-400"
};
const _hoisted_53$1 = { class: "text-sm" };
const _sfc_main$2 = {
  __name: "TaskDetailsFsIndexApplyDirty",
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const expandedMounts = ref(/* @__PURE__ */ new Set());
    const stats = computed(() => props.task.stats || {});
    const itemResults = computed(() => props.task.stats?.itemResults || []);
    const isProcessing = computed(() => {
      return props.task.status === "running" || props.task.status === "pending";
    });
    const progressPercent = computed(() => {
      const total = stats.value.totalItems || 0;
      const processed = stats.value.processedItems || 0;
      if (total === 0) return 0;
      return Math.min(100, Math.round(processed / total * 100));
    });
    const mountItems = computed(() => {
      return itemResults.value.filter((item) => item.kind === "mount" || !item.kind);
    });
    const isCurrentMount = (mountId) => {
      const currentMountId = stats.value.currentMountId;
      return isProcessing.value && currentMountId === mountId;
    };
    const toggleExpand = (mountId) => {
      if (expandedMounts.value.has(mountId)) {
        expandedMounts.value.delete(mountId);
      } else {
        expandedMounts.value.add(mountId);
      }
    };
    const getErrorMessage = (error) => {
      const errorMap = {
        "index_not_ready": t("admin.tasks.indexDetails.errors.indexNotReady"),
        "mount_not_found": t("admin.tasks.indexDetails.errors.mountNotFound"),
        "permission_denied": t("admin.tasks.indexDetails.errors.permissionDenied")
      };
      return errorMap[error] || error;
    };
    const formatDuration = (ms) => {
      if (!ms) return "";
      if (ms < 1e3) return `${ms}ms`;
      if (ms < 6e4) {
        const seconds2 = (ms / 1e3).toFixed(1);
        return `${seconds2}s`;
      }
      const minutes = Math.floor(ms / 6e4);
      const seconds = Math.round(ms % 6e4 / 1e3);
      return `${minutes}m ${seconds}s`;
    };
    const getItemContainerClass = (mount) => {
      const baseClass = "bg-white dark:bg-gray-800/50";
      const statusClasses = {
        success: "border-green-200 dark:border-green-800/50",
        processing: "border-blue-300 dark:border-blue-700/50 ring-1 ring-blue-200 dark:ring-blue-800/30",
        failed: "border-red-200 dark:border-red-800/50",
        skipped: "border-yellow-200 dark:border-yellow-800/50",
        pending: "border-gray-200 dark:border-gray-700"
      };
      const currentClass = isCurrentMount(mount.mountId) ? " ring-2 ring-blue-400 dark:ring-blue-500" : "";
      return `${baseClass} ${statusClasses[mount.status] || statusClasses.pending}${currentClass}`;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("h3", _hoisted_3$2, [
            createVNode(unref(IconQueueList), { class: "w-4 h-4" }),
            createBaseVNode("span", null, toDisplayString(unref(t)("admin.tasks.indexDetails.applyDirtyTitle")), 1)
          ]),
          createBaseVNode("div", _hoisted_4$2, [
            createBaseVNode("span", _hoisted_5$2, [
              createBaseVNode("span", _hoisted_6$2, toDisplayString(stats.value.totalDirtyProcessed || 0), 1),
              createBaseVNode("span", _hoisted_7$2, toDisplayString(unref(t)("admin.tasks.indexDetails.queueUnit")), 1)
            ]),
            createBaseVNode("div", _hoisted_8$2, [
              stats.value.successCount ? (openBlock(), createElementBlock("span", _hoisted_9$2, [
                createVNode(unref(IconCheck), { class: "w-3 h-3" }),
                createBaseVNode("span", null, toDisplayString(stats.value.successCount), 1)
              ])) : createCommentVNode("", true),
              stats.value.failedCount ? (openBlock(), createElementBlock("span", _hoisted_10$2, [
                createVNode(unref(IconClose), { class: "w-3 h-3" }),
                createBaseVNode("span", null, toDisplayString(stats.value.failedCount), 1)
              ])) : createCommentVNode("", true),
              stats.value.skippedCount ? (openBlock(), createElementBlock("span", _hoisted_11$2, [
                createVNode(unref(IconMinus), { class: "w-3 h-3" }),
                createBaseVNode("span", null, toDisplayString(stats.value.skippedCount), 1)
              ])) : createCommentVNode("", true)
            ])
          ])
        ]),
        isProcessing.value && stats.value.totalItems > 0 ? (openBlock(), createElementBlock("div", _hoisted_12$2, [
          createBaseVNode("div", _hoisted_13$2, [
            createBaseVNode("div", {
              class: "h-full bg-blue-500 dark:bg-blue-400 transition-all duration-300 ease-out",
              style: normalizeStyle({ width: `${progressPercent.value}%` })
            }, null, 4)
          ])
        ])) : createCommentVNode("", true),
        mountItems.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_14$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(mountItems.value, (mount) => {
            return openBlock(), createElementBlock("div", {
              key: mount.mountId,
              class: normalizeClass(["rounded-lg border transition-all duration-200 overflow-hidden", getItemContainerClass(mount)])
            }, [
              createBaseVNode("div", {
                class: "flex items-center gap-2.5 px-3 py-2 cursor-pointer select-none hover:bg-gray-50 dark:hover:bg-gray-800/50",
                onClick: ($event) => toggleExpand(mount.mountId)
              }, [
                createBaseVNode("span", _hoisted_16$2, [
                  mount.status === "success" ? (openBlock(), createElementBlock("span", _hoisted_17$2, [
                    createVNode(unref(IconCheck), { class: "w-3 h-3 text-white" })
                  ])) : mount.status === "processing" ? (openBlock(), createElementBlock("span", _hoisted_18$2, [
                    createVNode(unref(IconRefresh), { class: "w-3 h-3 text-white animate-spin" })
                  ])) : mount.status === "failed" ? (openBlock(), createElementBlock("span", _hoisted_19$2, [
                    createVNode(unref(IconClose), { class: "w-3 h-3 text-white" })
                  ])) : mount.status === "skipped" ? (openBlock(), createElementBlock("span", _hoisted_20$2, [
                    createVNode(unref(IconMinus), { class: "w-3 h-3 text-white" })
                  ])) : (openBlock(), createElementBlock("span", _hoisted_21$2, _cache[0] || (_cache[0] = [
                    createBaseVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" }, null, -1)
                  ])))
                ]),
                createBaseVNode("span", _hoisted_22$2, toDisplayString(mount.mountName || mount.mountPath || unref(t)("admin.tasks.indexDetails.unknownMount")), 1),
                createBaseVNode("div", _hoisted_23$2, [
                  mount.processedDirtyCount ? (openBlock(), createElementBlock("span", _hoisted_24$2, [
                    createVNode(unref(IconQueueList), { class: "w-3.5 h-3.5" }),
                    createBaseVNode("span", _hoisted_25$2, toDisplayString(mount.processedDirtyCount), 1)
                  ])) : createCommentVNode("", true),
                  mount.upsertedCount ? (openBlock(), createElementBlock("span", _hoisted_26$2, [
                    createVNode(unref(IconArrowUp), { class: "w-3.5 h-3.5 text-emerald-500" }),
                    createBaseVNode("span", _hoisted_27$2, toDisplayString(mount.upsertedCount), 1)
                  ])) : createCommentVNode("", true),
                  mount.deletedCount ? (openBlock(), createElementBlock("span", _hoisted_28$2, [
                    createVNode(unref(IconTrash), { class: "w-3.5 h-3.5 text-red-500" }),
                    createBaseVNode("span", _hoisted_29$2, toDisplayString(mount.deletedCount), 1)
                  ])) : createCommentVNode("", true),
                  mount.durationMs ? (openBlock(), createElementBlock("span", _hoisted_30$2, [
                    createVNode(unref(IconClock), { class: "w-3.5 h-3.5" }),
                    createBaseVNode("span", _hoisted_31$2, toDisplayString(formatDuration(mount.durationMs)), 1)
                  ])) : createCommentVNode("", true)
                ]),
                createVNode(unref(IconChevronDown), {
                  class: normalizeClass(["w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 flex-shrink-0", { "rotate-180": expandedMounts.value.has(mount.mountId) }])
                }, null, 8, ["class"])
              ], 8, _hoisted_15$2),
              createVNode(Transition, {
                "enter-active-class": "transition-all duration-200 ease-out",
                "enter-from-class": "opacity-0 max-h-0",
                "enter-to-class": "opacity-100 max-h-96",
                "leave-active-class": "transition-all duration-150 ease-in",
                "leave-from-class": "opacity-100 max-h-96",
                "leave-to-class": "opacity-0 max-h-0"
              }, {
                default: withCtx(() => [
                  expandedMounts.value.has(mount.mountId) ? (openBlock(), createElementBlock("div", _hoisted_32$2, [
                    createBaseVNode("div", _hoisted_33$1, [
                      createBaseVNode("div", _hoisted_34$1, [
                        createBaseVNode("div", _hoisted_35$1, [
                          createBaseVNode("span", _hoisted_36$1, [
                            createVNode(unref(IconQueueList), { class: "w-3.5 h-3.5" }),
                            createTextVNode(" " + toDisplayString(unref(t)("admin.tasks.indexDetails.queueProcessed")), 1)
                          ]),
                          createBaseVNode("span", _hoisted_37$1, toDisplayString(mount.processedDirtyCount || 0), 1)
                        ]),
                        createBaseVNode("div", _hoisted_38$1, [
                          createBaseVNode("span", _hoisted_39$1, [
                            createVNode(unref(IconArrowUp), { class: "w-3.5 h-3.5" }),
                            createTextVNode(" " + toDisplayString(unref(t)("admin.tasks.indexDetails.updated")), 1)
                          ]),
                          createBaseVNode("span", _hoisted_40$1, toDisplayString(mount.upsertedCount || 0), 1)
                        ]),
                        createBaseVNode("div", _hoisted_41$1, [
                          createBaseVNode("span", _hoisted_42$1, [
                            createVNode(unref(IconTrash), { class: "w-3.5 h-3.5" }),
                            createTextVNode(" " + toDisplayString(unref(t)("admin.tasks.indexDetails.deleted")), 1)
                          ]),
                          createBaseVNode("span", _hoisted_43$1, toDisplayString(mount.deletedCount || 0), 1)
                        ]),
                        mount.skippedCount > 0 ? (openBlock(), createElementBlock("div", _hoisted_44$1, [
                          createBaseVNode("span", _hoisted_45$1, [
                            createVNode(unref(IconMinus), { class: "w-3.5 h-3.5" }),
                            createTextVNode(" " + toDisplayString(unref(t)("admin.tasks.indexDetails.skipped")), 1)
                          ]),
                          createBaseVNode("span", _hoisted_46$1, toDisplayString(mount.skippedCount), 1)
                        ])) : createCommentVNode("", true),
                        mount.durationMs ? (openBlock(), createElementBlock("div", _hoisted_47$1, [
                          createBaseVNode("span", _hoisted_48$1, [
                            createVNode(unref(IconClock), { class: "w-3.5 h-3.5" }),
                            createTextVNode(" " + toDisplayString(unref(t)("admin.tasks.indexDetails.duration")), 1)
                          ]),
                          createBaseVNode("span", _hoisted_49$1, toDisplayString(formatDuration(mount.durationMs)), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      mount.status === "failed" && mount.error ? (openBlock(), createElementBlock("div", _hoisted_50$1, [
                        createVNode(unref(IconExclamation), { class: "w-4 h-4 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" }),
                        createBaseVNode("span", _hoisted_51$1, toDisplayString(getErrorMessage(mount.error)), 1)
                      ])) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1024)
            ], 2);
          }), 128))
        ])) : (openBlock(), createElementBlock("div", _hoisted_52$1, [
          createVNode(unref(IconQueueList), { class: "w-10 h-10 mx-auto mb-2 opacity-40" }),
          createBaseVNode("p", _hoisted_53$1, toDisplayString(unref(t)("admin.tasks.indexDetails.noRecords")), 1)
        ]))
      ]);
    };
  }
};
const _hoisted_1$1 = { class: "flex items-center gap-3 min-w-0 flex-1" };
const _hoisted_2$1 = { class: "min-w-0 flex-1" };
const _hoisted_3$1 = { class: "flex items-center gap-2" };
const _hoisted_4$1 = { class: "text-base font-bold text-gray-900 dark:text-gray-100 capitalize truncate" };
const _hoisted_5$1 = { class: "text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5 truncate" };
const _hoisted_6$1 = ["title"];
const _hoisted_7$1 = {
  key: 0,
  class: "p-4 space-y-4"
};
const _hoisted_8$1 = {
  key: 0,
  class: "flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400"
};
const _hoisted_9$1 = { class: "flex items-center gap-2 flex-wrap" };
const _hoisted_10$1 = {
  key: 0,
  class: "flex items-center gap-1"
};
const _hoisted_11$1 = { class: "text-gray-500 dark:text-gray-500" };
const _hoisted_12$1 = { class: "font-mono text-gray-900 dark:text-gray-100" };
const _hoisted_13$1 = {
  key: 1,
  class: "text-gray-400"
};
const _hoisted_14$1 = {
  key: 2,
  class: "flex items-center gap-1"
};
const _hoisted_15$1 = { class: "text-gray-500 dark:text-gray-500" };
const _hoisted_16$1 = { class: "font-mono text-gray-900 dark:text-gray-100" };
const _hoisted_17$1 = {
  key: 3,
  class: "text-gray-400"
};
const _hoisted_18$1 = {
  key: 4,
  class: "flex items-center gap-1"
};
const _hoisted_19$1 = { class: "text-gray-500 dark:text-gray-500" };
const _hoisted_20$1 = { class: "font-mono font-medium text-gray-900 dark:text-gray-100" };
const _hoisted_21$1 = {
  key: 2,
  class: "space-y-2"
};
const _hoisted_22$1 = { class: "text-xs font-semibold text-red-500 dark:text-red-400 uppercase tracking-wider" };
const _hoisted_23$1 = { class: "bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800" };
const _hoisted_24$1 = { class: "text-sm text-red-700 dark:text-red-400 font-mono break-words" };
const _hoisted_25$1 = {
  key: 3,
  class: "space-y-2"
};
const _hoisted_26$1 = { class: "text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider" };
const _hoisted_27$1 = { class: "bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-600" };
const _hoisted_28$1 = { class: "text-sm text-gray-700 dark:text-gray-300 font-mono break-all" };
const _hoisted_29$1 = {
  key: 4,
  class: "space-y-2"
};
const _hoisted_30$1 = {
  key: 0,
  class: "overflow-hidden"
};
const _hoisted_31$1 = { class: "bg-gray-900 dark:bg-gray-950 p-3 rounded-lg overflow-x-auto" };
const _hoisted_32$1 = { class: "text-xs text-gray-100 dark:text-gray-200 font-mono" };
const _sfc_main$1 = {
  __name: "TaskDrawer",
  props: {
    task: {
      type: Object,
      default: null
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close", "retry-all-failed", "retry-file"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t, locale } = useI18n();
    const payloadExpanded = ref(false);
    const drawerRef = ref(null);
    const contentRef = ref(null);
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const isMobile = breakpoints.smaller("sm");
    const isFromGrabHandle = ref(false);
    const swipeAllowed = ref(false);
    const getSwipeDeltaY = (coordsStart2, coordsEnd2) => {
      const startY = coordsStart2?.y ?? 0;
      const endY = coordsEnd2?.y ?? 0;
      return endY - startY;
    };
    const { isSwiping, coordsStart, coordsEnd } = useSwipe(drawerRef, {
      passive: false,
      threshold: 100,
      onSwipeStart: () => {
        if (!isMobile.value) return;
        const content = contentRef.value;
        const isAtTop = !content || content.scrollTop <= 0;
        swipeAllowed.value = isFromGrabHandle.value || isAtTop;
      },
      onSwipe: (e) => {
        if (!isMobile.value || !swipeAllowed.value) return;
        const deltaY = getSwipeDeltaY(coordsStart, coordsEnd);
        if (deltaY > 0) {
          e.preventDefault();
        }
      },
      onSwipeEnd: (_e, direction) => {
        if (!isMobile.value || !swipeAllowed.value) {
          swipeAllowed.value = false;
          isFromGrabHandle.value = false;
          return;
        }
        const deltaY = getSwipeDeltaY(coordsStart, coordsEnd);
        const threshold = 100;
        if (direction === "down" && deltaY > threshold) {
          emit("close");
        }
        swipeAllowed.value = false;
        isFromGrabHandle.value = false;
      }
    });
    const drawerStyle = computed(() => {
      if (!isMobile.value || !isSwiping.value || !swipeAllowed.value) return {};
      const deltaY = Math.max(0, getSwipeDeltaY(coordsStart, coordsEnd));
      if (deltaY <= 0) return {};
      return {
        transform: `translateY(${deltaY}px)`,
        transition: "none"
      };
    });
    const onGrabHandleTouchStart = () => {
      isFromGrabHandle.value = true;
    };
    watch(() => props.open, (newVal) => {
      if (newVal) {
        swipeAllowed.value = false;
        isFromGrabHandle.value = false;
      }
    });
    const formatTaskType = (type) => {
      if (!type) return t("admin.tasks.taskType.unknown");
      const typeMap = {
        copy: t("admin.tasks.taskType.copy"),
        fs_index_rebuild: t("admin.tasks.taskType.fs_index_rebuild"),
        fs_index_apply_dirty: t("admin.tasks.taskType.fs_index_apply_dirty")
      };
      return typeMap[type] || t("admin.tasks.taskType.unknownWithType", { type });
    };
    const getTaskIcon = (type) => {
      if (!type) return IconSync;
      if (type.includes("copy")) return IconCopy;
      if (type.includes("index")) return IconDatabase;
      return IconSync;
    };
    const getTaskIconWrapperClass = (type) => {
      const baseClass = "p-2 rounded-lg border flex-shrink-0";
      if (!type) return `${baseClass} text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600`;
      if (type.includes("copy")) return `${baseClass} text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800`;
      if (type.includes("index")) return `${baseClass} text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800`;
      return `${baseClass} text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600`;
    };
    const getTaskDetailsComponent = (taskType) => {
      const componentMap = {
        copy: _sfc_main$4,
        fs_index_rebuild: _sfc_main$3,
        fs_index_apply_dirty: _sfc_main$2
      };
      return componentMap[taskType] || null;
    };
    const formatTimestamp = (timestamp) => {
      if (!timestamp) return "-";
      const date = new Date(timestamp);
      return date.toLocaleString(locale.value, {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
    };
    const calculateDuration = (startTimestamp, endTimestamp) => {
      if (!startTimestamp || !endTimestamp) return "-";
      const duration = new Date(endTimestamp) - new Date(startTimestamp);
      const seconds = Math.floor(duration / 1e3);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      if (hours > 0) {
        return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
      } else if (minutes > 0) {
        return `${minutes}m ${seconds % 60}s`;
      } else {
        return `${seconds}s`;
      }
    };
    const formatJSON = (obj) => {
      try {
        if (typeof obj === "string") {
          return JSON.stringify(JSON.parse(obj), null, 2);
        }
        return JSON.stringify(obj, null, 2);
      } catch (e) {
        return String(obj);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(Transition, {
          "enter-active-class": "transition-opacity duration-300",
          "leave-active-class": "transition-opacity duration-300",
          "enter-from-class": "opacity-0",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            __props.open ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "fixed inset-0 bg-black/30 backdrop-blur-sm z-40",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
            })) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(Transition, {
          "enter-active-class": unref(isMobile) ? "transition-transform duration-300 ease-out" : "transition-transform duration-300",
          "leave-active-class": unref(isMobile) ? "transition-transform duration-300 ease-in" : "transition-transform duration-300",
          "enter-from-class": unref(isMobile) ? "translate-y-full" : "translate-x-full",
          "leave-to-class": unref(isMobile) ? "translate-y-full" : "translate-x-full"
        }, {
          default: withCtx(() => [
            __props.open ? (openBlock(), createElementBlock("div", {
              key: 0,
              ref_key: "drawerRef",
              ref: drawerRef,
              class: normalizeClass(["fixed bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col", [
                unref(isMobile) ? "inset-x-0 bottom-0 h-[95vh] rounded-t-2xl" : "right-0 top-0 h-full w-[480px] lg:w-[540px]"
              ]]),
              style: normalizeStyle(drawerStyle.value)
            }, [
              unref(isMobile) ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing shrink-0",
                onTouchstart: onGrabHandleTouchStart
              }, _cache[5] || (_cache[5] = [
                createBaseVNode("div", { class: "w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" }, null, -1)
              ]), 32)) : createCommentVNode("", true),
              createBaseVNode("div", {
                class: normalizeClass(["px-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-900 shrink-0", unref(isMobile) ? "py-2" : "py-3"])
              }, [
                createBaseVNode("div", _hoisted_1$1, [
                  createBaseVNode("div", {
                    class: normalizeClass(getTaskIconWrapperClass(__props.task?.taskType))
                  }, [
                    (openBlock(), createBlock(resolveDynamicComponent(getTaskIcon(__props.task?.taskType)), { class: "w-5 h-5" }))
                  ], 2),
                  createBaseVNode("div", _hoisted_2$1, [
                    createBaseVNode("div", _hoisted_3$1, [
                      createBaseVNode("h2", _hoisted_4$1, toDisplayString(formatTaskType(__props.task?.taskType)), 1),
                      __props.task?.status ? (openBlock(), createBlock(_sfc_main$6, {
                        key: 0,
                        status: __props.task.status,
                        size: "sm"
                      }, null, 8, ["status"])) : createCommentVNode("", true)
                    ]),
                    createBaseVNode("p", _hoisted_5$1, toDisplayString(__props.task?.jobId), 1)
                  ])
                ]),
                createBaseVNode("button", {
                  onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("close")),
                  class: "p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors flex-shrink-0",
                  title: unref(t)("common.close")
                }, [
                  createVNode(unref(IconX), { class: "w-5 h-5" })
                ], 8, _hoisted_6$1)
              ], 2),
              createBaseVNode("div", {
                ref_key: "contentRef",
                ref: contentRef,
                class: "flex-1 overflow-y-auto overscroll-contain"
              }, [
                __props.task ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
                  __props.task.startedAt || __props.task.finishedAt ? (openBlock(), createElementBlock("div", _hoisted_8$1, [
                    createVNode(unref(IconClock), { class: "w-4 h-4 flex-shrink-0" }),
                    createBaseVNode("div", _hoisted_9$1, [
                      __props.task.startedAt ? (openBlock(), createElementBlock("span", _hoisted_10$1, [
                        createBaseVNode("span", _hoisted_11$1, toDisplayString(unref(t)("admin.tasks.timeline.start")) + ":", 1),
                        createBaseVNode("span", _hoisted_12$1, toDisplayString(formatTimestamp(__props.task.startedAt)), 1)
                      ])) : createCommentVNode("", true),
                      __props.task.startedAt && __props.task.finishedAt ? (openBlock(), createElementBlock("span", _hoisted_13$1, "→")) : createCommentVNode("", true),
                      __props.task.finishedAt ? (openBlock(), createElementBlock("span", _hoisted_14$1, [
                        createBaseVNode("span", _hoisted_15$1, toDisplayString(unref(t)("admin.tasks.timeline.finish")) + ":", 1),
                        createBaseVNode("span", _hoisted_16$1, toDisplayString(formatTimestamp(__props.task.finishedAt)), 1)
                      ])) : createCommentVNode("", true),
                      __props.task.startedAt && __props.task.finishedAt ? (openBlock(), createElementBlock("span", _hoisted_17$1, "|")) : createCommentVNode("", true),
                      __props.task.startedAt && __props.task.finishedAt ? (openBlock(), createElementBlock("span", _hoisted_18$1, [
                        createBaseVNode("span", _hoisted_19$1, toDisplayString(unref(t)("admin.tasks.timeline.duration")) + ":", 1),
                        createBaseVNode("span", _hoisted_20$1, toDisplayString(calculateDuration(__props.task.startedAt, __props.task.finishedAt)), 1)
                      ])) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true),
                  getTaskDetailsComponent(__props.task.taskType) ? (openBlock(), createBlock(resolveDynamicComponent(getTaskDetailsComponent(__props.task.taskType)), {
                    key: 1,
                    task: __props.task,
                    onRetryAllFailed: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("retry-all-failed", $event)),
                    onRetryFile: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("retry-file", $event))
                  }, null, 40, ["task"])) : createCommentVNode("", true),
                  __props.task.error ? (openBlock(), createElementBlock("div", _hoisted_21$1, [
                    createBaseVNode("label", _hoisted_22$1, toDisplayString(unref(t)("admin.tasks.details.errorInfo")), 1),
                    createBaseVNode("div", _hoisted_23$1, [
                      createBaseVNode("p", _hoisted_24$1, toDisplayString(__props.task.error), 1)
                    ])
                  ])) : createCommentVNode("", true),
                  __props.task.triggerRef ? (openBlock(), createElementBlock("div", _hoisted_25$1, [
                    createBaseVNode("label", _hoisted_26$1, toDisplayString(unref(t)("admin.tasks.details.triggerRef")), 1),
                    createBaseVNode("div", _hoisted_27$1, [
                      createBaseVNode("p", _hoisted_28$1, toDisplayString(__props.task.triggerRef), 1)
                    ])
                  ])) : createCommentVNode("", true),
                  __props.task.payload ? (openBlock(), createElementBlock("div", _hoisted_29$1, [
                    createBaseVNode("button", {
                      onClick: _cache[4] || (_cache[4] = ($event) => payloadExpanded.value = !payloadExpanded.value),
                      class: "flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    }, [
                      createVNode(unref(IconChevronRight), {
                        class: normalizeClass(["w-4 h-4 transition-transform duration-200", payloadExpanded.value ? "rotate-90" : ""])
                      }, null, 8, ["class"]),
                      createTextVNode(" " + toDisplayString(unref(t)("admin.tasks.details.payload")), 1)
                    ]),
                    createVNode(Transition, {
                      "enter-active-class": "transition-all duration-200 ease-out",
                      "leave-active-class": "transition-all duration-200 ease-in",
                      "enter-from-class": "opacity-0 max-h-0",
                      "enter-to-class": "opacity-100 max-h-[500px]",
                      "leave-from-class": "opacity-100 max-h-[500px]",
                      "leave-to-class": "opacity-0 max-h-0"
                    }, {
                      default: withCtx(() => [
                        payloadExpanded.value ? (openBlock(), createElementBlock("div", _hoisted_30$1, [
                          createBaseVNode("div", _hoisted_31$1, [
                            createBaseVNode("pre", _hoisted_32$1, toDisplayString(formatJSON(__props.task.payload)), 1)
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true)
              ], 512)
            ], 6)) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["enter-active-class", "leave-active-class", "enter-from-class", "leave-to-class"])
      ]);
    };
  }
};
const _hoisted_1 = { class: "h-full flex flex-col" };
const _hoisted_2 = { class: "px-3 sm:px-4 md:px-6 lg:px-8 pt-6 pb-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shrink-0" };
const _hoisted_3 = { class: "max-w-7xl mx-auto" };
const _hoisted_4 = { class: "text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight" };
const _hoisted_5 = { class: "px-3 sm:px-4 md:px-6 lg:px-8 pt-6 shrink-0" };
const _hoisted_6 = { class: "max-w-7xl mx-auto" };
const _hoisted_7 = { class: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" };
const _hoisted_8 = { class: "flex-1 overflow-hidden px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6" };
const _hoisted_9 = { class: "flex-1 flex flex-col" };
const _hoisted_10 = { class: "mb-3 space-y-3" };
const _hoisted_11 = { class: "flex items-center justify-between" };
const _hoisted_12 = { class: "text-lg font-semibold text-gray-900 dark:text-gray-100" };
const _hoisted_13 = { class: "flex items-center gap-2" };
const _hoisted_14 = { class: "hidden sm:inline" };
const _hoisted_15 = { class: "hidden sm:inline" };
const _hoisted_16 = ["disabled"];
const _hoisted_17 = { class: "hidden sm:inline" };
const _hoisted_18 = { class: "flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center" };
const _hoisted_19 = { class: "flex flex-wrap gap-2" };
const _hoisted_20 = { class: "relative w-full sm:w-36" };
const _hoisted_21 = { value: "ALL" };
const _hoisted_22 = { value: "running" };
const _hoisted_23 = { value: "completed" };
const _hoisted_24 = { value: "failed" };
const _hoisted_25 = { value: "partial" };
const _hoisted_26 = { class: "relative w-full sm:w-40" };
const _hoisted_27 = { value: "ALL" };
const _hoisted_28 = ["value"];
const _hoisted_29 = { class: "relative w-full sm:w-36" };
const _hoisted_30 = { value: "ALL" };
const _hoisted_31 = ["value"];
const _hoisted_32 = { class: "relative w-full sm:w-32" };
const _hoisted_33 = { value: "ALL" };
const _hoisted_34 = { value: "manual" };
const _hoisted_35 = { value: "scheduled" };
const _hoisted_36 = { class: "relative w-full sm:w-80" };
const _hoisted_37 = ["placeholder"];
const _hoisted_38 = {
  key: 0,
  class: "flex items-center justify-center h-64"
};
const _hoisted_39 = { class: "flex items-center gap-2 text-gray-500 dark:text-gray-400" };
const _hoisted_40 = { class: "space-y-3 p-0" };
const _hoisted_41 = { class: "px-5 py-3 flex items-center justify-between gap-2 border-b bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600" };
const _hoisted_42 = { class: "flex items-center gap-2 min-w-0 flex-1" };
const _hoisted_43 = ["checked", "onClick"];
const _hoisted_44 = { class: "min-w-0 flex-1" };
const _hoisted_45 = { class: "font-medium text-sm truncate text-gray-900 dark:text-gray-100 capitalize" };
const _hoisted_46 = { class: "text-xs truncate mt-0.5 text-gray-400 dark:text-gray-500 font-mono" };
const _hoisted_47 = { class: "p-4 space-y-3 text-sm text-gray-600 dark:text-gray-300" };
const _hoisted_48 = { class: "flex justify-between items-start" };
const _hoisted_49 = { class: "font-medium" };
const _hoisted_50 = { class: "flex flex-col items-end gap-1" };
const _hoisted_51 = { class: "text-xs text-gray-400 dark:text-gray-500" };
const _hoisted_52 = { class: "flex justify-between" };
const _hoisted_53 = { class: "font-medium" };
const _hoisted_54 = { class: "text-xs text-gray-500 dark:text-gray-400" };
const _hoisted_55 = { class: "flex justify-between items-center" };
const _hoisted_56 = { class: "font-medium" };
const _hoisted_57 = { class: "flex justify-end gap-1 pt-2 border-t border-gray-200 dark:border-gray-600" };
const _hoisted_58 = ["onClick", "title"];
const _hoisted_59 = ["onClick", "title"];
const _hoisted_60 = ["onClick", "title"];
const _sfc_main = {
  __name: "AdminTasksView",
  setup(__props) {
    const { isDarkMode: darkMode } = useThemeMode();
    const { t, locale } = useI18n();
    const log = createLogger("AdminTasksView");
    const { dialogState, confirm, handleConfirm, handleCancel } = useConfirmDialog();
    const { getCreatorBadgeInfo } = useCreatorBadge();
    const tasks = ref([]);
    const loading = ref(false);
    const jobTypes = ref([]);
    const searchQuery = ref("");
    const filters = ref({
      status: "ALL",
      taskType: "ALL",
      creatorType: "ALL",
      triggerType: "ALL"
    });
    const selectedTaskId = ref(null);
    const selectedTasks = ref([]);
    const { pagination, pageSizeOptions, changePageSize } = useAdminBase("tasks");
    const { pause: pausePoll, resume: resumePoll } = useIntervalFn(
      () => {
        if (tasks.value.some((t2) => t2.status === "running" || t2.status === "pending")) {
          pollRunningTasks();
        }
      },
      3e3,
      { immediate: false }
    );
    const isTaskCancellable = (task) => {
      if (!task) return false;
      if (task.allowedActions && typeof task.allowedActions === "object") {
        return task.allowedActions.canCancel === true;
      }
      return task.status === "pending" || task.status === "running";
    };
    const selectedCancellableTaskIds = computed(() => {
      const selected = selectedTasks.value || [];
      if (selected.length === 0) return [];
      const byId = new Map(tasks.value.map((t2) => [t2.jobId, t2]));
      return selected.map((id) => byId.get(id)).filter((t2) => isTaskCancellable(t2)).map((t2) => t2.jobId);
    });
    const availableTaskTypes = computed(() => {
      const types = /* @__PURE__ */ new Set();
      if (jobTypes.value.length > 0) {
        jobTypes.value.forEach((item) => {
          const taskType = item?.taskType || item;
          if (taskType) {
            types.add(taskType);
          }
        });
      } else {
        tasks.value.forEach((task) => {
          if (task?.taskType) {
            types.add(task.taskType);
          }
        });
      }
      return Array.from(types).sort();
    });
    const availableCreators = computed(() => {
      const creators = /* @__PURE__ */ new Set();
      tasks.value.forEach((t2) => {
        if (t2.userId && !t2.keyName) {
          creators.add("admin");
        } else if (t2.keyName) {
          creators.add(t2.keyName);
        }
      });
      return Array.from(creators).sort();
    });
    const isClientFiltering = computed(() => {
      return searchQuery.value.trim().length > 0 || filters.value.creatorType !== "ALL" || filters.value.triggerType !== "ALL";
    });
    const buildServerFilter = () => {
      const serverFilter = {
        limit: pagination.limit,
        offset: pagination.offset
      };
      if (filters.value.status !== "ALL") {
        serverFilter.status = filters.value.status;
      }
      if (filters.value.taskType !== "ALL") {
        serverFilter.taskType = filters.value.taskType;
      }
      return serverFilter;
    };
    const filteredTasks = computed(() => {
      return tasks.value.filter((task) => {
        if (filters.value.status !== "ALL" && task.status !== filters.value.status.toLowerCase()) {
          return false;
        }
        if (filters.value.taskType !== "ALL" && task.taskType !== filters.value.taskType) {
          return false;
        }
        if (filters.value.creatorType !== "ALL") {
          if (filters.value.creatorType === "admin") {
            if (!task.userId || task.keyName) return false;
          } else {
            if (task.keyName !== filters.value.creatorType) return false;
          }
        }
        if (filters.value.triggerType !== "ALL" && task.triggerType !== filters.value.triggerType) {
          return false;
        }
        const matchesSearch = task.jobId?.toLowerCase().includes(searchQuery.value.toLowerCase()) || task.taskType?.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchesSearch;
      });
    });
    watch([filteredTasks, isClientFiltering], ([filtered, clientFiltering]) => {
      if (!clientFiltering) return;
      const total = filtered.length;
      pagination.total = total;
      pagination.hasMore = pagination.offset + pagination.limit < total;
      if (pagination.offset >= total && total > 0) {
        pagination.offset = Math.max(0, total - pagination.limit);
      }
    }, { immediate: true });
    const paginatedTasks = computed(() => {
      if (!isClientFiltering.value) {
        return filteredTasks.value;
      }
      const start = pagination.offset;
      const end = start + pagination.limit;
      return filteredTasks.value.slice(start, end);
    });
    watch(
      [
        () => filters.value.status,
        () => filters.value.taskType,
        () => filters.value.creatorType,
        () => filters.value.triggerType,
        () => searchQuery.value
      ],
      () => {
        pagination.offset = 0;
        fetchTasks();
      }
    );
    const stats = computed(() => {
      return {
        active: tasks.value.filter((t2) => t2.status === "running").length,
        failed: tasks.value.filter((t2) => t2.status === "failed").length,
        completed: tasks.value.filter((t2) => t2.status === "completed").length,
        total: tasks.value.length
      };
    });
    const selectedTask = computed(() => {
      if (!selectedTaskId.value) return null;
      return tasks.value.find((t2) => t2.jobId === selectedTaskId.value) || null;
    });
    const taskColumns = computed(() => [
      {
        type: "display",
        key: "details",
        header: t("admin.tasks.table.details"),
        render: (task) => {
          return h("div", {
            class: "flex items-start gap-3 cursor-pointer",
            onClick: () => selectedTaskId.value = task.jobId
          }, [
            h("div", { class: getTaskColorClass(task.taskType) }, [
              h(getTaskIcon(task.taskType), { class: "w-4 h-4" })
            ]),
            h("div", {}, [
              h("div", {
                class: "font-semibold text-gray-900 dark:text-gray-100 capitalize"
              }, formatTaskType(task.taskType)),
              h("div", {
                class: "text-xs text-gray-400 dark:text-gray-500 mt-1 font-mono"
              }, task.jobId)
            ])
          ]);
        }
      },
      {
        type: "display",
        key: "status",
        header: t("admin.tasks.table.status"),
        render: (task) => {
          return h(_sfc_main$6, { status: task.status });
        }
      },
      {
        type: "display",
        key: "progress",
        header: t("admin.tasks.table.progress"),
        render: (task) => {
          return h(TaskProgressBar, { task });
        }
      },
      {
        type: "display",
        key: "creator",
        header: t("admin.tasks.table.creator"),
        render: (task) => {
          const badgeInfo = getCreatorBadgeInfo(task.userId, task.keyName);
          return h("div", { class: "flex flex-col gap-1" }, [
            // Creator badge
            h("span", {
              class: `px-2 py-0.5 text-xs rounded inline-block text-center w-fit ${badgeInfo.badgeClass}`
            }, badgeInfo.text),
            // Trigger type below (small text)
            h("span", {
              class: "text-xs text-gray-400 dark:text-gray-500"
            }, task.triggerType === "scheduled" ? t("admin.tasks.trigger.scheduled") : t("admin.tasks.trigger.manual"))
          ]);
        }
      },
      {
        type: "display",
        key: "created",
        header: t("admin.tasks.table.createdAt"),
        render: (task) => {
          return h("span", {
            class: "text-sm text-gray-600 dark:text-gray-300"
          }, formatDateTime(task.createdAt));
        }
      },
      {
        type: "display",
        key: "actions",
        header: t("admin.tasks.table.actions"),
        render: (task) => {
          const actions = [
            // View Details Button
            h("button", {
              class: "p-1.5 rounded transition text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",
              title: t("admin.tasks.actions.viewDetails"),
              onClick: (e) => {
                e.stopPropagation();
                selectedTaskId.value = task.jobId;
              }
            }, [
              h("svg", {
                class: "h-5 w-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                h("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                }),
                h("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                })
              ])
            ])
          ];
          if (isTaskCancellable(task)) {
            actions.push(
              h("button", {
                class: "p-1.5 rounded transition text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:text-yellow-700 dark:hover:text-yellow-300",
                title: t("admin.tasks.actions.cancel"),
                onClick: (e) => {
                  e.stopPropagation();
                  handleCancelTask(task);
                }
              }, [
                h(IconXCircle, { class: "w-5 h-5" })
              ])
            );
          }
          actions.push(
            // Delete Button
            h("button", {
              class: "p-1.5 rounded transition text-red-400 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-300",
              title: t("admin.tasks.actions.deleteTask"),
              onClick: (e) => {
                e.stopPropagation();
                handleDeleteTask(task);
              }
            }, [
              h(IconTrash, { class: "w-5 h-5" })
            ])
          );
          return h("div", { class: "flex items-center justify-center gap-1" }, actions);
        }
      }
    ]);
    const taskColumnClasses = {
      details: "text-left",
      creator: "text-left",
      created: "text-left",
      progress: "text-left",
      status: "text-left",
      actions: "text-center"
    };
    const fetchJobTypes = async () => {
      try {
        const response = await listJobTypes();
        const types = response?.data?.types || response?.types || [];
        jobTypes.value = Array.isArray(types) ? types : [];
      } catch (error) {
        log.error("[AdminTasksView] 获取任务类型失败:", error);
      }
    };
    const fetchAllTasks = async () => {
      const serverFilter = buildServerFilter();
      const pageSize = Math.min(100, serverFilter.limit || 50);
      let offset = 0;
      let total = 0;
      const allJobs = [];
      while (true) {
        const response = await listJobs({ ...serverFilter, limit: pageSize, offset });
        const payload = response?.data || response || {};
        const jobs = payload.jobs || [];
        total = Number(payload.total || 0);
        allJobs.push(...jobs);
        offset += jobs.length;
        if (jobs.length === 0 || offset >= total) break;
      }
      tasks.value = allJobs;
      const filteredTotal = filteredTasks.value.length;
      pagination.total = filteredTotal;
      pagination.hasMore = pagination.offset + pagination.limit < filteredTotal;
      if (pagination.offset >= filteredTotal && filteredTotal > 0) {
        pagination.offset = Math.max(0, filteredTotal - pagination.limit);
      }
    };
    const fetchTasks = async () => {
      try {
        loading.value = true;
        if (isClientFiltering.value) {
          await fetchAllTasks();
          return;
        }
        const response = await listJobs(buildServerFilter());
        const payload = response?.data || response || {};
        tasks.value = payload.jobs || [];
        const total = Number(payload.total || 0);
        pagination.total = total;
        pagination.hasMore = pagination.offset + pagination.limit < total;
        if (total > 0 && pagination.offset >= total) {
          pagination.offset = Math.max(0, total - pagination.limit);
          const retryResponse = await listJobs(buildServerFilter());
          const retryPayload = retryResponse?.data || retryResponse || {};
          tasks.value = retryPayload.jobs || [];
          const retryTotal = Number(retryPayload.total || 0);
          pagination.total = retryTotal;
          pagination.hasMore = pagination.offset + pagination.limit < retryTotal;
        }
      } catch (error) {
        log.error("Failed to fetch tasks:", error);
      } finally {
        loading.value = false;
      }
    };
    const formatTaskType = (type) => {
      if (!type) return t("admin.tasks.taskType.unknown");
      const typeMap = {
        copy: t("admin.tasks.taskType.copy"),
        fs_index_rebuild: t("admin.tasks.taskType.fs_index_rebuild"),
        fs_index_apply_dirty: t("admin.tasks.taskType.fs_index_apply_dirty")
      };
      return typeMap[type] || t("admin.tasks.taskType.unknownWithType", { type });
    };
    const formatDateTime = (dateStr) => {
      if (!dateStr) return "-";
      const date = new Date(dateStr);
      return date.toLocaleString(locale.value, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getTaskIcon = (type) => {
      if (!type) return IconSync;
      if (type.includes("copy")) return IconCopy;
      if (type.includes("index")) return IconDatabase;
      return IconSync;
    };
    const getTaskColorClass = (type) => {
      const baseClass = "p-2 rounded-lg mt-0.5 border";
      if (!type) return `${baseClass} text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600`;
      if (type.includes("copy")) return `${baseClass} text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800`;
      if (type.includes("index")) return `${baseClass} text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800`;
      return `${baseClass} text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600`;
    };
    const handleOffsetChange = (newOffset) => {
      pagination.offset = newOffset;
      if (!isClientFiltering.value) {
        fetchTasks();
      }
    };
    const handlePageSizeChange = (newLimit) => {
      changePageSize(newLimit);
      if (!isClientFiltering.value) {
        fetchTasks();
      }
    };
    const handleSelectionChange = ({ type, id }) => {
      if (type === "toggle-all") {
        if (selectedTasks.value.length === paginatedTasks.value.length) {
          selectedTasks.value = [];
        } else {
          selectedTasks.value = paginatedTasks.value.map((t2) => t2.jobId);
        }
      } else if (type === "toggle-item") {
        toggleTask(id);
      }
    };
    const toggleTask = (jobId) => {
      const index = selectedTasks.value.indexOf(jobId);
      if (index > -1) {
        selectedTasks.value.splice(index, 1);
      } else {
        selectedTasks.value.push(jobId);
      }
    };
    const handleDeleteTask = async (task) => {
      const confirmed = await confirm({
        title: t("admin.tasks.confirmDelete.title"),
        message: t("admin.tasks.confirmDelete.single", {
          name: `${formatTaskType(task.taskType)} (${task.jobId})`
        }),
        confirmType: "danger",
        confirmText: t("common.dialogs.deleteButton"),
        darkMode: darkMode.value
      });
      if (confirmed) {
        try {
          await deleteJob(task.jobId);
          await fetchTasks();
        } catch (error) {
          log.error("Failed to delete task:", error);
        }
      }
    };
    const handleCancelTask = async (task) => {
      const confirmed = await confirm({
        title: t("admin.tasks.confirmCancel.title"),
        message: t("admin.tasks.confirmCancel.single", {
          name: `${formatTaskType(task.taskType)} (${task.jobId})`
        }),
        confirmType: "warning",
        confirmText: t("admin.tasks.actions.cancel"),
        darkMode: darkMode.value
      });
      if (confirmed) {
        try {
          await cancelJob(task.jobId);
          await fetchTasks();
        } catch (error) {
          log.error("[AdminTasksView] 取消任务失败:", error);
        }
      }
    };
    const handleBatchDelete = async () => {
      const confirmed = await confirm({
        title: t("admin.tasks.confirmDelete.title"),
        message: t("admin.tasks.confirmDelete.batch", { count: selectedTasks.value.length }),
        confirmType: "danger",
        confirmText: `${t("common.dialogs.deleteButton")} (${selectedTasks.value.length})`,
        darkMode: darkMode.value
      });
      if (confirmed) {
        try {
          const targets = [...selectedTasks.value];
          const results = await Promise.allSettled(targets.map((jobId) => deleteJob(jobId)));
          const failedIds = [];
          results.forEach((result, index) => {
            if (result.status === "rejected") {
              failedIds.push(targets[index]);
            }
          });
          selectedTasks.value = failedIds;
          await fetchTasks();
          if (failedIds.length > 0) {
            log.error("[AdminTasksView] 部分任务删除失败:", failedIds);
          }
        } catch (error) {
          log.error("Failed to batch delete tasks:", error);
        }
      }
    };
    const handleBatchCancel = async () => {
      const targets = selectedCancellableTaskIds.value;
      if (!targets || targets.length === 0) return;
      const confirmed = await confirm({
        title: t("admin.tasks.confirmCancel.title"),
        message: t("admin.tasks.confirmCancel.batch", { count: targets.length }),
        confirmType: "warning",
        confirmText: `${t("admin.tasks.actions.cancel")} (${targets.length})`,
        darkMode: darkMode.value
      });
      if (confirmed) {
        try {
          const results = await Promise.allSettled(targets.map((jobId) => cancelJob(jobId)));
          const failedIds = [];
          results.forEach((result, index) => {
            if (result.status === "rejected") {
              failedIds.push(targets[index]);
            }
          });
          selectedTasks.value = failedIds;
          await fetchTasks();
          if (failedIds.length > 0) {
            log.error("[AdminTasksView] 部分任务取消失败:", failedIds);
          }
        } catch (error) {
          log.error("[AdminTasksView] 批量取消任务失败:", error);
        }
      }
    };
    const normalizeCopyItems = (items = []) => {
      return items.filter((item) => item?.sourcePath && item?.targetPath).map((item) => ({
        sourcePath: item.sourcePath,
        targetPath: item.targetPath
      }));
    };
    const handleRetryAllFailed = async ({ task, items }) => {
      try {
        const rawItems = items && items.length > 0 ? items : task?.stats?.itemResults || [];
        const failedItems = rawItems.filter((item) => item?.status === "failed");
        const copyItems = normalizeCopyItems(failedItems);
        if (copyItems.length === 0) {
          log.warn("[AdminTasksView] 没有可重试的失败项");
          return;
        }
        await batchCopyItems(copyItems, task?.payload?.options || {});
        await fetchTasks();
      } catch (error) {
        log.error("[AdminTasksView] 重试全部失败项失败:", error);
      }
    };
    const handleRetryFile = async ({ task, item }) => {
      try {
        const copyItems = normalizeCopyItems([item]);
        if (copyItems.length === 0) {
          log.warn("[AdminTasksView] 失败项缺少路径，无法重试");
          return;
        }
        await batchCopyItems(copyItems, task?.payload?.options || {});
        await fetchTasks();
      } catch (error) {
        log.error("[AdminTasksView] 重试单个失败项失败:", error);
      }
    };
    const pollRunningTasks = async () => {
      const runningTasks = tasks.value.filter((t2) => t2.status === "running" || t2.status === "pending");
      if (runningTasks.length === 0) return;
      const updates = await Promise.allSettled(
        runningTasks.map((task) => getJobStatus(task.jobId))
      );
      updates.forEach((result, index) => {
        if (result.status === "fulfilled" && result.value?.data) {
          const updatedTask = result.value.data;
          const taskIndex = tasks.value.findIndex((t2) => t2.jobId === updatedTask.jobId);
          if (taskIndex !== -1) {
            tasks.value[taskIndex] = updatedTask;
          }
        }
      });
    };
    onMounted(() => {
      fetchJobTypes();
      fetchTasks();
      resumePoll();
    });
    onUnmounted(() => {
      pausePoll();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("h1", _hoisted_4, toDisplayString(unref(t)("admin.tasks.title")), 1)
          ])
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("div", _hoisted_7, [
              createVNode(_sfc_main$7, {
                title: unref(t)("admin.tasks.stats.running"),
                value: stats.value.active,
                icon: unref(IconActivity),
                colorClass: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
              }, null, 8, ["title", "value", "icon"]),
              createVNode(_sfc_main$7, {
                title: unref(t)("admin.tasks.stats.completed"),
                value: stats.value.completed,
                icon: unref(IconCheckCircle),
                colorClass: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
              }, null, 8, ["title", "value", "icon"]),
              createVNode(_sfc_main$7, {
                title: unref(t)("admin.tasks.stats.failed"),
                value: stats.value.failed,
                icon: unref(IconAlertCircle),
                colorClass: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
              }, null, 8, ["title", "value", "icon"]),
              createVNode(_sfc_main$7, {
                title: unref(t)("admin.tasks.stats.total"),
                value: stats.value.total,
                icon: unref(IconDatabase),
                colorClass: "bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400"
              }, null, 8, ["title", "value", "icon"])
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_8, [
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("h2", _hoisted_12, toDisplayString(unref(t)("admin.tasks.list.title")), 1),
                createBaseVNode("div", _hoisted_13, [
                  selectedTasks.value.length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    selectedCancellableTaskIds.value.length > 0 ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      onClick: handleBatchCancel,
                      class: "flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md text-sm font-medium transition-colors bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 border border-yellow-200 dark:border-yellow-800"
                    }, [
                      createVNode(unref(IconXCircle), { class: "w-4 h-4" }),
                      createBaseVNode("span", _hoisted_14, toDisplayString(unref(t)("admin.tasks.actions.cancel")) + " (" + toDisplayString(selectedCancellableTaskIds.value.length) + ")", 1)
                    ])) : createCommentVNode("", true),
                    createBaseVNode("button", {
                      onClick: handleBatchDelete,
                      class: "flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md text-sm font-medium transition-colors bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800"
                    }, [
                      createVNode(unref(IconTrash), { class: "w-4 h-4" }),
                      createBaseVNode("span", _hoisted_15, toDisplayString(unref(t)("admin.tasks.actions.deleteShort")) + " (" + toDisplayString(selectedTasks.value.length) + ")", 1)
                    ])
                  ], 64)) : (openBlock(), createElementBlock("button", {
                    key: 1,
                    onClick: fetchTasks,
                    disabled: loading.value,
                    class: "flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md text-sm font-medium transition-colors bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  }, [
                    createVNode(unref(IconRefresh), {
                      class: normalizeClass(["w-4 h-4", loading.value && "animate-spin"])
                    }, null, 8, ["class"]),
                    createBaseVNode("span", _hoisted_17, toDisplayString(unref(t)("admin.tasks.actions.refresh")), 1)
                  ], 8, _hoisted_16))
                ])
              ]),
              createBaseVNode("div", _hoisted_18, [
                createBaseVNode("div", _hoisted_19, [
                  createBaseVNode("div", _hoisted_20, [
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filters.value.status = $event),
                      class: "w-full pl-3 pr-8 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none cursor-pointer"
                    }, [
                      createBaseVNode("option", _hoisted_21, toDisplayString(unref(t)("admin.tasks.filters.allStatuses")), 1),
                      createBaseVNode("option", _hoisted_22, toDisplayString(unref(t)("admin.tasks.status.running")), 1),
                      createBaseVNode("option", _hoisted_23, toDisplayString(unref(t)("admin.tasks.status.completed")), 1),
                      createBaseVNode("option", _hoisted_24, toDisplayString(unref(t)("admin.tasks.status.failed")), 1),
                      createBaseVNode("option", _hoisted_25, toDisplayString(unref(t)("admin.tasks.status.partial")), 1)
                    ], 512), [
                      [vModelSelect, filters.value.status]
                    ]),
                    createVNode(unref(IconFilter), { class: "absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" })
                  ]),
                  createBaseVNode("div", _hoisted_26, [
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => filters.value.taskType = $event),
                      class: "w-full pl-3 pr-8 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none cursor-pointer"
                    }, [
                      createBaseVNode("option", _hoisted_27, toDisplayString(unref(t)("admin.tasks.filters.allTypes")), 1),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(availableTaskTypes.value, (type) => {
                        return openBlock(), createElementBlock("option", {
                          key: type,
                          value: type
                        }, toDisplayString(formatTaskType(type)), 9, _hoisted_28);
                      }), 128))
                    ], 512), [
                      [vModelSelect, filters.value.taskType]
                    ]),
                    createVNode(unref(IconFilter), { class: "absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" })
                  ]),
                  createBaseVNode("div", _hoisted_29, [
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => filters.value.creatorType = $event),
                      class: "w-full pl-3 pr-8 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none cursor-pointer"
                    }, [
                      createBaseVNode("option", _hoisted_30, toDisplayString(unref(t)("admin.tasks.filters.allCreators")), 1),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(availableCreators.value, (creator) => {
                        return openBlock(), createElementBlock("option", {
                          key: creator,
                          value: creator
                        }, toDisplayString(creator === "admin" ? unref(t)("admin.tasks.creator.admin") : unref(t)("admin.tasks.creator.keyPrefix", { key: creator })), 9, _hoisted_31);
                      }), 128))
                    ], 512), [
                      [vModelSelect, filters.value.creatorType]
                    ]),
                    createVNode(unref(IconFilter), { class: "absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" })
                  ]),
                  createBaseVNode("div", _hoisted_32, [
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => filters.value.triggerType = $event),
                      class: "w-full pl-3 pr-8 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none cursor-pointer"
                    }, [
                      createBaseVNode("option", _hoisted_33, toDisplayString(unref(t)("admin.tasks.filters.allTriggers")), 1),
                      createBaseVNode("option", _hoisted_34, toDisplayString(unref(t)("admin.tasks.trigger.manual")), 1),
                      createBaseVNode("option", _hoisted_35, toDisplayString(unref(t)("admin.tasks.trigger.scheduled")), 1)
                    ], 512), [
                      [vModelSelect, filters.value.triggerType]
                    ]),
                    createVNode(unref(IconFilter), { class: "absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" })
                  ])
                ]),
                createBaseVNode("div", _hoisted_36, [
                  createVNode(unref(IconSearch), { class: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" }),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => searchQuery.value = $event),
                    type: "text",
                    placeholder: unref(t)("admin.tasks.filters.searchPlaceholder"),
                    class: "w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  }, null, 8, _hoisted_37), [
                    [vModelText, searchQuery.value]
                  ])
                ])
              ])
            ]),
            loading.value ? (openBlock(), createElementBlock("div", _hoisted_38, [
              createBaseVNode("div", _hoisted_39, [
                createVNode(unref(IconRefresh), { class: "w-5 h-5 animate-spin" }),
                createBaseVNode("span", null, toDisplayString(unref(t)("admin.tasks.loading")), 1)
              ])
            ])) : (openBlock(), createBlock(_sfc_main$8, {
              key: 1,
              data: paginatedTasks.value,
              columns: taskColumns.value,
              "column-classes": taskColumnClasses,
              selectable: true,
              "selected-items": selectedTasks.value,
              "row-id-field": "jobId",
              "empty-text": unref(t)("admin.tasks.empty.tableNoData"),
              onSelectionChange: handleSelectionChange
            }, {
              mobile: withCtx(({ data }) => [
                createBaseVNode("div", _hoisted_40, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(data, (task) => {
                    return openBlock(), createElementBlock("div", {
                      key: task.jobId,
                      class: "rounded-lg shadow-md overflow-hidden border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    }, [
                      createBaseVNode("div", _hoisted_41, [
                        createBaseVNode("div", _hoisted_42, [
                          createBaseVNode("input", {
                            type: "checkbox",
                            checked: selectedTasks.value.includes(task.jobId),
                            onClick: withModifiers(($event) => toggleTask(task.jobId), ["stop"]),
                            class: "w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                          }, null, 8, _hoisted_43),
                          createBaseVNode("div", {
                            class: normalizeClass(getTaskColorClass(task.taskType))
                          }, [
                            (openBlock(), createBlock(resolveDynamicComponent(getTaskIcon(task.taskType)), { class: "w-4 h-4" }))
                          ], 2),
                          createBaseVNode("div", _hoisted_44, [
                            createBaseVNode("h3", _hoisted_45, toDisplayString(formatTaskType(task.taskType)), 1),
                            createBaseVNode("p", _hoisted_46, toDisplayString(task.jobId), 1)
                          ])
                        ]),
                        createVNode(_sfc_main$6, {
                          status: task.status
                        }, null, 8, ["status"])
                      ]),
                      createBaseVNode("div", _hoisted_47, [
                        createBaseVNode("div", _hoisted_48, [
                          createBaseVNode("span", _hoisted_49, toDisplayString(unref(t)("admin.tasks.labels.creator")) + ":", 1),
                          createBaseVNode("div", _hoisted_50, [
                            createBaseVNode("span", {
                              class: normalizeClass(`px-2 py-0.5 text-xs rounded inline-block text-center ${unref(getCreatorBadgeInfo)(task.userId, task.keyName).badgeClass}`)
                            }, toDisplayString(unref(getCreatorBadgeInfo)(task.userId, task.keyName).text), 3),
                            createBaseVNode("span", _hoisted_51, toDisplayString(task.triggerType === "scheduled" ? unref(t)("admin.tasks.trigger.scheduled") : unref(t)("admin.tasks.trigger.manual")), 1)
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_52, [
                          createBaseVNode("span", _hoisted_53, toDisplayString(unref(t)("admin.tasks.labels.created")) + ":", 1),
                          createBaseVNode("span", _hoisted_54, toDisplayString(formatDateTime(task.createdAt)), 1)
                        ]),
                        createBaseVNode("div", _hoisted_55, [
                          createBaseVNode("span", _hoisted_56, toDisplayString(unref(t)("admin.tasks.labels.progress")) + ":", 1),
                          createVNode(TaskProgressBar, { task }, null, 8, ["task"])
                        ]),
                        createBaseVNode("div", _hoisted_57, [
                          createBaseVNode("button", {
                            onClick: withModifiers(($event) => selectedTaskId.value = task.jobId, ["stop"]),
                            class: "p-1.5 rounded-full transition-colors text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",
                            title: unref(t)("admin.tasks.actions.viewDetails")
                          }, _cache[6] || (_cache[6] = [
                            createBaseVNode("svg", {
                              class: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createBaseVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              }),
                              createBaseVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              })
                            ], -1)
                          ]), 8, _hoisted_58),
                          isTaskCancellable(task) ? (openBlock(), createElementBlock("button", {
                            key: 0,
                            onClick: withModifiers(($event) => handleCancelTask(task), ["stop"]),
                            class: "p-1.5 rounded-full transition-colors text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20",
                            title: unref(t)("admin.tasks.actions.cancel")
                          }, [
                            createVNode(unref(IconXCircle), { class: "w-4 h-4" })
                          ], 8, _hoisted_59)) : createCommentVNode("", true),
                          createBaseVNode("button", {
                            onClick: withModifiers(($event) => handleDeleteTask(task), ["stop"]),
                            class: "p-1.5 rounded-full transition-colors text-red-400 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20",
                            title: unref(t)("admin.tasks.actions.deleteTask")
                          }, [
                            createVNode(unref(IconTrash), { class: "w-4 h-4" })
                          ], 8, _hoisted_60)
                        ])
                      ])
                    ]);
                  }), 128))
                ])
              ]),
              _: 1
            }, 8, ["data", "columns", "selected-items", "empty-text"])),
            !loading.value && filteredTasks.value.length > 0 ? (openBlock(), createBlock(_sfc_main$9, {
              key: 2,
              "dark-mode": unref(darkMode),
              pagination: unref(pagination),
              "page-size-options": unref(pageSizeOptions),
              mode: "offset",
              onOffsetChanged: handleOffsetChange,
              onLimitChanged: handlePageSizeChange,
              class: "mt-4"
            }, null, 8, ["dark-mode", "pagination", "page-size-options"])) : createCommentVNode("", true)
          ])
        ]),
        createVNode(_sfc_main$1, {
          task: selectedTask.value,
          open: selectedTaskId.value !== null,
          onClose: _cache[5] || (_cache[5] = ($event) => selectedTaskId.value = null),
          onRetryAllFailed: handleRetryAllFailed,
          onRetryFile: handleRetryFile
        }, null, 8, ["task", "open"]),
        createVNode(_sfc_main$a, mergeProps(unref(dialogState), {
          onConfirm: unref(handleConfirm),
          onCancel: unref(handleCancel)
        }), null, 16, ["onConfirm", "onCancel"])
      ]);
    };
  }
};
const AdminTasksView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f4f3ac78"]]);
export {
  AdminTasksView as default
};
