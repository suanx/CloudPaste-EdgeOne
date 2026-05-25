import { e as useI18n, ac as useThemeMode, F as computed, ed as formatTimestamp, j as createElementBlock, k as openBlock, l as createBaseVNode, n as normalizeClass, y as unref, t as toDisplayString, z as createVNode, aA as IconCheckCircle, aD as normalizeStyle, A as createTextVNode, p as createCommentVNode, ee as IconBolt, bb as IconClock, J as IconRefresh, aK as _export_sfc, ef as getStatusTextKey, eg as IconChartPie, aL as IconExclamation, K as Fragment, L as renderList, g as ref, q as withDirectives, V as IconSearch, ao as IconChevronDown, aq as vShow, G as IconClose, eh as calculateJobProgress, ei as getStatusBadgeClass, aB as IconXCircle, M as createBlock, N as resolveDynamicComponent, ej as IconUpdate, ek as IconRebuild, el as IconTrash, r as reactive, v as vModelText, x as vModelCheckbox, c as createLogger, Y as useGlobalMessage, aw as useIntervalFn, w as watch, a$ as h, E as api, o as onMounted, ax as onUnmounted, ae as vModelSelect, em as IconTable, O as IconGrid, aE as withCtx, b5 as IconFolder, ar as mergeProps } from "./index-BQxzU9F1.js";
import { u as useConfirmDialog, _ as _sfc_main$8 } from "./useConfirmDialog-c5dcTgIB.js";
import { u as useStorageTypeIcon } from "./useStorageTypeIcon-CXKeFzX3.js";
import { _ as _sfc_main$6 } from "./AdminTable-CrUS055e.js";
import { _ as _sfc_main$7 } from "./CommonPagination-WikHSq_I.js";
import { C as Chart, A as ArcElement, c as plugin_tooltip, d as plugin_legend, D as Doughnut } from "./index-Dd8qcdTI.js";
const _hoisted_1$5 = { class: "grid grid-cols-2 gap-3" };
const _hoisted_2$5 = { class: "flex items-center justify-between mb-2" };
const _hoisted_3$5 = { class: "flex items-center justify-between mb-2" };
const _hoisted_4$5 = {
  key: 0,
  class: "h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"
};
const _hoisted_5$5 = { class: "flex items-center justify-between mb-2" };
const _hoisted_6$5 = { class: "flex items-center justify-between mb-2" };
const _hoisted_7$5 = ["title"];
const _sfc_main$5 = {
  __name: "FsIndexKPICards",
  props: {
    indexStatus: {
      type: Object,
      default: null
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const { t } = useI18n();
    const { isDarkMode: darkMode } = useThemeMode();
    const props = __props;
    const healthPercentage = computed(() => {
      if (!props.indexStatus?.items || props.indexStatus.items.length === 0) {
        return 0;
      }
      const readyCount = props.indexStatus.items.filter(
        (item) => item.status === "ready"
      ).length;
      return Math.round(readyCount / props.indexStatus.items.length * 100);
    });
    const runningJobsCount = computed(() => {
      return props.indexStatus?.runningJobs?.length || 0;
    });
    const totalDirtyCount = computed(() => {
      if (!props.indexStatus?.items) return 0;
      return props.indexStatus.items.reduce((sum, item) => {
        return sum + (item.dirtyCount || 0);
      }, 0);
    });
    const latestIndexTime = computed(() => {
      if (!props.indexStatus?.items || props.indexStatus.items.length === 0) {
        return null;
      }
      const times = props.indexStatus.items.map((item) => item.lastIndexedMs).filter(Boolean);
      if (times.length === 0) return null;
      return Math.max(...times);
    });
    const lastUpdateTimeShort = computed(() => {
      if (!latestIndexTime.value) {
        return t("admin.fsIndex.kpi.never");
      }
      const now = Date.now();
      const diff = now - latestIndexTime.value;
      const seconds = Math.floor(diff / 1e3);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      if (seconds < 60) {
        return t("admin.fsIndex.kpi.justNow");
      } else if (minutes < 60) {
        return `${minutes}${t("admin.fsIndex.kpi.minutesAgo")}`;
      } else if (hours < 24) {
        return `${hours}${t("admin.fsIndex.kpi.hoursAgo")}`;
      } else {
        return `${days}${t("admin.fsIndex.kpi.daysAgo")}`;
      }
    });
    const lastUpdateTimeFull = computed(() => {
      if (!latestIndexTime.value) {
        return t("admin.fsIndex.kpi.never");
      }
      return formatTimestamp(latestIndexTime.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        createBaseVNode("div", {
          class: normalizeClass(["rounded-lg border p-3 shadow-sm", unref(darkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
        }, [
          createBaseVNode("div", _hoisted_2$5, [
            createBaseVNode("span", {
              class: normalizeClass(["text-xs font-medium", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
            }, toDisplayString(unref(t)("admin.fsIndex.kpi.health")), 3),
            createBaseVNode("div", {
              class: normalizeClass(["w-8 h-8 rounded-md flex items-center justify-center", unref(darkMode) ? "bg-green-900/30" : "bg-green-100"])
            }, [
              createVNode(unref(IconCheckCircle), {
                class: normalizeClass(["w-4 h-4", unref(darkMode) ? "text-green-400" : "text-green-600"])
              }, null, 8, ["class"])
            ], 2)
          ]),
          __props.isLoading ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["h-7 rounded animate-pulse mb-1.5", unref(darkMode) ? "bg-gray-700" : "bg-gray-200"])
          }, null, 2)) : (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(["text-xl font-semibold mb-1.5", unref(darkMode) ? "text-green-400" : "text-green-600"])
          }, toDisplayString(healthPercentage.value) + "% ", 3)),
          createBaseVNode("div", {
            class: normalizeClass(["w-full rounded-full h-1.5", unref(darkMode) ? "bg-gray-700" : "bg-gray-200"])
          }, [
            createBaseVNode("div", {
              class: "bg-gradient-to-r from-green-400 to-green-600 h-1.5 rounded-full transition-all duration-500",
              style: normalizeStyle({ width: `${healthPercentage.value}%` })
            }, null, 4)
          ], 2)
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(["rounded-lg border p-3 shadow-sm", unref(darkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
        }, [
          createBaseVNode("div", _hoisted_3$5, [
            createBaseVNode("span", {
              class: normalizeClass(["text-xs font-medium flex items-center gap-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
            }, [
              createTextVNode(toDisplayString(unref(t)("admin.fsIndex.kpi.running")) + " ", 1),
              runningJobsCount.value > 0 ? (openBlock(), createElementBlock("span", _hoisted_4$5)) : createCommentVNode("", true)
            ], 2),
            createBaseVNode("div", {
              class: normalizeClass(["w-8 h-8 rounded-md flex items-center justify-center", unref(darkMode) ? "bg-blue-900/30" : "bg-blue-100"])
            }, [
              createVNode(unref(IconBolt), {
                class: normalizeClass(["w-4 h-4", unref(darkMode) ? "text-blue-400" : "text-blue-600"])
              }, null, 8, ["class"])
            ], 2)
          ]),
          __props.isLoading ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["h-7 rounded animate-pulse", unref(darkMode) ? "bg-gray-700" : "bg-gray-200"])
          }, null, 2)) : (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(["text-xl font-semibold", unref(darkMode) ? "text-blue-400" : "text-blue-600"])
          }, toDisplayString(runningJobsCount.value), 3)),
          createBaseVNode("div", {
            class: normalizeClass(["text-xs mt-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
          }, toDisplayString(unref(t)("admin.fsIndex.kpi.activeTasks")), 3)
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(["rounded-lg border p-3 shadow-sm", unref(darkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
        }, [
          createBaseVNode("div", _hoisted_5$5, [
            createBaseVNode("span", {
              class: normalizeClass(["text-xs font-medium", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
            }, toDisplayString(unref(t)("admin.fsIndex.kpi.pending")), 3),
            createBaseVNode("div", {
              class: normalizeClass(["w-8 h-8 rounded-md flex items-center justify-center", unref(darkMode) ? "bg-yellow-900/30" : "bg-yellow-100"])
            }, [
              createVNode(unref(IconClock), {
                class: normalizeClass(["w-4 h-4", unref(darkMode) ? "text-yellow-400" : "text-yellow-600"])
              }, null, 8, ["class"])
            ], 2)
          ]),
          __props.isLoading ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["h-7 rounded animate-pulse", unref(darkMode) ? "bg-gray-700" : "bg-gray-200"])
          }, null, 2)) : (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(["text-xl font-semibold", unref(darkMode) ? "text-yellow-400" : "text-yellow-600"])
          }, toDisplayString(totalDirtyCount.value), 3)),
          createBaseVNode("div", {
            class: normalizeClass(["text-xs mt-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
          }, toDisplayString(unref(t)("admin.fsIndex.kpi.changes")), 3)
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(["rounded-lg border p-3 shadow-sm", unref(darkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
        }, [
          createBaseVNode("div", _hoisted_6$5, [
            createBaseVNode("span", {
              class: normalizeClass(["text-xs font-medium", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
            }, toDisplayString(unref(t)("admin.fsIndex.kpi.lastUpdate")), 3),
            createBaseVNode("div", {
              class: normalizeClass(["w-8 h-8 rounded-md flex items-center justify-center", unref(darkMode) ? "bg-purple-900/30" : "bg-purple-100"])
            }, [
              createVNode(unref(IconRefresh), {
                class: normalizeClass(["w-4 h-4", unref(darkMode) ? "text-purple-400" : "text-purple-600"])
              }, null, 8, ["class"])
            ], 2)
          ]),
          __props.isLoading ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["h-7 rounded animate-pulse", unref(darkMode) ? "bg-gray-700" : "bg-gray-200"])
          }, null, 2)) : (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(["text-base font-semibold", unref(darkMode) ? "text-purple-400" : "text-purple-600"]),
            title: lastUpdateTimeFull.value
          }, toDisplayString(lastUpdateTimeShort.value), 11, _hoisted_7$5))
        ], 2)
      ]);
    };
  }
};
const _hoisted_1$4 = { class: "flex items-center gap-2 mb-4" };
const _hoisted_2$4 = {
  key: 1,
  class: "h-48 flex flex-col items-center justify-center text-center"
};
const _hoisted_3$4 = {
  key: 2,
  class: "relative"
};
const _hoisted_4$4 = { class: "h-40 flex items-center justify-center" };
const _hoisted_5$4 = {
  class: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none",
  style: { "margin-top": "-16px" }
};
const _hoisted_6$4 = { class: "mt-4 grid grid-cols-2 gap-2" };
const _hoisted_7$4 = { class: "flex-1 min-w-0" };
const _sfc_main$4 = {
  __name: "FsIndexStatusChart",
  props: {
    indexStatus: {
      type: Object,
      default: null
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    Chart.register(ArcElement, plugin_tooltip, plugin_legend);
    const { t } = useI18n();
    const { isDarkMode: darkMode } = useThemeMode();
    const props = __props;
    const statusColors = {
      ready: "#10b981",
      // green-500
      indexing: "#3b82f6",
      // blue-500
      not_ready: "#f59e0b",
      // yellow-500
      error: "#ef4444",
      // red-500
      unknown: "#6b7280"
      // gray-500
    };
    const statusDistribution = computed(() => {
      if (!props.indexStatus?.items || props.indexStatus.items.length === 0) {
        return {};
      }
      const distribution = {};
      props.indexStatus.items.forEach((item) => {
        const status = item.status || "unknown";
        distribution[status] = (distribution[status] || 0) + 1;
      });
      return distribution;
    });
    const totalMounts = computed(() => {
      return props.indexStatus?.items?.length || 0;
    });
    const legendItems = computed(() => {
      const items = [];
      const dist = statusDistribution.value;
      Object.keys(dist).forEach((status) => {
        items.push({
          status,
          label: t(getStatusTextKey(status)),
          count: dist[status],
          color: statusColors[status] || statusColors.unknown
        });
      });
      return items;
    });
    const chartData = computed(() => {
      const labels = [];
      const data = [];
      const backgroundColor = [];
      const borderColor = [];
      legendItems.value.forEach((item) => {
        labels.push(item.label);
        data.push(item.count);
        backgroundColor.push(item.color);
        borderColor.push(darkMode.value ? "#1f2937" : "#ffffff");
      });
      return {
        labels,
        datasets: [
          {
            data,
            backgroundColor,
            borderColor,
            borderWidth: 2,
            hoverBorderWidth: 3,
            hoverOffset: 4
          }
        ]
      };
    });
    const chartOptions = computed(() => {
      return {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "65%",
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: darkMode.value ? "#1f2937" : "#ffffff",
            titleColor: darkMode.value ? "#f9fafb" : "#111827",
            bodyColor: darkMode.value ? "#f9fafb" : "#111827",
            borderColor: darkMode.value ? "#374151" : "#e5e7eb",
            borderWidth: 1,
            padding: 8,
            cornerRadius: 6,
            displayColors: true,
            callbacks: {
              label: function(context) {
                const label = context.label || "";
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = (value / total * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 600,
          easing: "easeInOutQuart"
        }
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["rounded-lg border p-4 shadow-sm", unref(darkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
      }, [
        createBaseVNode("div", _hoisted_1$4, [
          createBaseVNode("div", {
            class: normalizeClass(["w-8 h-8 rounded-md flex items-center justify-center", unref(darkMode) ? "bg-purple-900/30" : "bg-purple-100"])
          }, [
            createVNode(unref(IconChartPie), {
              class: normalizeClass(["w-4 h-4", unref(darkMode) ? "text-purple-400" : "text-purple-600"])
            }, null, 8, ["class"])
          ], 2),
          createBaseVNode("h3", {
            class: normalizeClass(["text-sm font-semibold", unref(darkMode) ? "text-white" : "text-gray-900"])
          }, toDisplayString(unref(t)("admin.fsIndex.chart.title")), 3)
        ]),
        __props.isLoading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["h-48 rounded-md animate-pulse", unref(darkMode) ? "bg-gray-700" : "bg-gray-200"])
        }, null, 2)) : !__props.indexStatus || !__props.indexStatus.items || __props.indexStatus.items.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_2$4, [
          createVNode(unref(IconExclamation), {
            class: normalizeClass(["w-8 h-8 mb-2", unref(darkMode) ? "text-gray-600" : "text-gray-400"])
          }, null, 8, ["class"]),
          createBaseVNode("p", {
            class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
          }, toDisplayString(unref(t)("admin.fsIndex.empty.description")), 3)
        ])) : (openBlock(), createElementBlock("div", _hoisted_3$4, [
          createBaseVNode("div", _hoisted_4$4, [
            createVNode(unref(Doughnut), {
              data: chartData.value,
              options: chartOptions.value
            }, null, 8, ["data", "options"])
          ]),
          createBaseVNode("div", _hoisted_5$4, [
            createBaseVNode("div", {
              class: normalizeClass(["text-2xl font-bold", unref(darkMode) ? "text-white" : "text-gray-900"])
            }, toDisplayString(totalMounts.value), 3),
            createBaseVNode("div", {
              class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
            }, toDisplayString(unref(t)("admin.fsIndex.chart.total")), 3)
          ]),
          createBaseVNode("div", _hoisted_6$4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(legendItems.value, (item) => {
              return openBlock(), createElementBlock("div", {
                key: item.status,
                class: "flex items-center gap-1.5"
              }, [
                createBaseVNode("div", {
                  class: "w-3 h-3 rounded-sm flex-shrink-0",
                  style: normalizeStyle({ backgroundColor: item.color })
                }, null, 4),
                createBaseVNode("div", _hoisted_7$4, [
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs truncate", unref(darkMode) ? "text-gray-300" : "text-gray-700"])
                  }, toDisplayString(item.label) + " (" + toDisplayString(item.count) + ") ", 3)
                ])
              ]);
            }), 128))
          ])
        ]))
      ], 2);
    };
  }
};
const FsIndexStatusChart = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-ec0035c0"]]);
const _hoisted_1$3 = { class: "flex items-center gap-2" };
const _hoisted_2$3 = { class: "text-left" };
const _hoisted_3$3 = { class: "px-4 pb-4 space-y-3" };
const _hoisted_4$3 = {
  key: 0,
  class: "text-center py-6"
};
const _hoisted_5$3 = {
  key: 1,
  class: "space-y-3"
};
const _hoisted_6$3 = { class: "flex items-center justify-between gap-3 mb-2" };
const _hoisted_7$3 = { class: "flex-1 min-w-0" };
const _hoisted_8$3 = { class: "flex items-center gap-1.5 mb-0.5" };
const _hoisted_9$3 = { class: "flex items-center gap-2" };
const _hoisted_10$3 = { class: "relative w-12 h-12 flex-shrink-0" };
const _hoisted_11$3 = {
  class: "transform -rotate-90",
  viewBox: "0 0 100 100"
};
const _hoisted_12$2 = ["stroke-dashoffset"];
const _hoisted_13$2 = { class: "absolute inset-0 flex items-center justify-center" };
const _hoisted_14$1 = ["onClick", "title"];
const _hoisted_15$1 = { class: "grid grid-cols-4 gap-2 text-xs" };
const _hoisted_16$1 = { key: 0 };
const _hoisted_17$1 = { key: 1 };
const _hoisted_18$1 = { key: 2 };
const _hoisted_19$1 = { key: 3 };
const _sfc_main$3 = {
  __name: "FsIndexRunningTasks",
  props: {
    runningJobs: {
      type: Array,
      default: () => []
    },
    mounts: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["stop-job"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const { isDarkMode: darkMode } = useThemeMode();
    const props = __props;
    function getMountInfo(mountId) {
      if (!mountId || !props.mounts) return null;
      return props.mounts.find((m) => m.mountId === mountId);
    }
    function getCurrentMountName(job) {
      const mountId = job.stats?.currentMountId;
      if (!mountId) return null;
      const mount = getMountInfo(mountId);
      return mount?.name || mountId;
    }
    function getCurrentMountStorageType(job) {
      const mountId = job.stats?.currentMountId;
      if (!mountId) return null;
      const mount = getMountInfo(mountId);
      return mount?.storageType || null;
    }
    const emit = __emit;
    const isExpanded = ref(true);
    function toggleExpanded() {
      isExpanded.value = !isExpanded.value;
    }
    function getTaskTypeText(taskType) {
      const key = `admin.fsIndex.taskType.${taskType}`;
      return t(key);
    }
    function getTaskTypeBadgeClass(taskType) {
      if (taskType === "fs_index_rebuild") {
        return darkMode.value ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-800";
      } else if (taskType === "fs_index_apply_dirty") {
        return darkMode.value ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-800";
      }
      return darkMode.value ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800";
    }
    function getProgressStrokeClass(taskType) {
      if (taskType === "fs_index_rebuild") {
        return darkMode.value ? "stroke-blue-400" : "stroke-blue-600";
      } else if (taskType === "fs_index_apply_dirty") {
        return darkMode.value ? "stroke-green-400" : "stroke-green-600";
      }
      return darkMode.value ? "stroke-gray-400" : "stroke-gray-600";
    }
    function getProgressPercentage(job) {
      return calculateJobProgress(job.stats);
    }
    function getProgressOffset(job) {
      const percentage = getProgressPercentage(job);
      const circumference = 251.2;
      return circumference * (1 - percentage / 100);
    }
    function formatNumber(num) {
      if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + "M";
      } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + "K";
      }
      return num.toString();
    }
    function formatDuration(startedAt) {
      if (!startedAt) return "0s";
      const startMs = typeof startedAt === "string" ? new Date(startedAt).getTime() : startedAt;
      if (isNaN(startMs)) return "0s";
      const now = Date.now();
      const duration = now - startMs;
      const seconds = Math.floor(duration / 1e3);
      if (seconds < 60) {
        return `${seconds}s`;
      } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
      } else {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor(seconds % 3600 / 60);
        return `${hours}h ${minutes}m`;
      }
    }
    function toMs(value) {
      if (!value) return null;
      if (typeof value === "number" && Number.isFinite(value)) return value;
      if (typeof value === "string") {
        const ms = new Date(value).getTime();
        return Number.isFinite(ms) ? ms : null;
      }
      return null;
    }
    function formatAgo(ms) {
      if (!Number.isFinite(ms)) return "-";
      const diff = Math.max(0, Date.now() - ms);
      const seconds = Math.floor(diff / 1e3);
      if (seconds < 60) return `${seconds}s`;
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes}m`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours}h`;
      const days = Math.floor(hours / 24);
      return `${days}d`;
    }
    function getLastUpdateAgeMs(job) {
      const hb = toMs(job?.stats?.heartbeatAtMs);
      if (hb !== null) return Math.max(0, Date.now() - hb);
      const updatedAt = toMs(job?.updatedAt);
      if (updatedAt !== null) return Math.max(0, Date.now() - updatedAt);
      return null;
    }
    function formatLastUpdate(job) {
      const hb = toMs(job?.stats?.heartbeatAtMs);
      if (hb !== null) return formatAgo(hb);
      const updatedAt = toMs(job?.updatedAt);
      if (updatedAt !== null) return formatAgo(updatedAt);
      const startedAt = toMs(job?.startedAt);
      if (startedAt !== null) return formatAgo(startedAt);
      return "-";
    }
    function shouldShowLastUpdate(job) {
      const ageMs = getLastUpdateAgeMs(job);
      if (!Number.isFinite(ageMs)) return false;
      return ageMs >= 1e4;
    }
    function handleStopJob(jobId) {
      emit("stop-job", jobId);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["rounded-lg border shadow-sm overflow-hidden", unref(darkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
      }, [
        createBaseVNode("button", {
          onClick: toggleExpanded,
          class: normalizeClass(["w-full px-4 py-3 flex items-center justify-between transition-colors", unref(darkMode) ? "hover:bg-gray-700/50" : "hover:bg-gray-50"])
        }, [
          createBaseVNode("div", _hoisted_1$3, [
            createBaseVNode("div", {
              class: normalizeClass(["w-8 h-8 rounded-md flex items-center justify-center relative overflow-hidden", unref(darkMode) ? "bg-blue-900/30" : "bg-blue-100"])
            }, [
              __props.runningJobs.length > 0 ? (openBlock(), createElementBlock("span", {
                key: 0,
                class: normalizeClass(["absolute inset-0 search-scan-glow", unref(darkMode) ? "bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" : "bg-gradient-to-r from-transparent via-blue-500/25 to-transparent"])
              }, null, 2)) : createCommentVNode("", true),
              createVNode(unref(IconSearch), {
                class: normalizeClass(["w-4 h-4 relative z-10", [
                  unref(darkMode) ? "text-blue-400" : "text-blue-600",
                  __props.runningJobs.length > 0 ? "search-icon-scanning" : ""
                ]])
              }, null, 8, ["class"])
            ], 2),
            createBaseVNode("div", _hoisted_2$3, [
              createBaseVNode("h3", {
                class: normalizeClass(["text-sm font-semibold", unref(darkMode) ? "text-white" : "text-gray-900"])
              }, toDisplayString(unref(t)("admin.fsIndex.runningJobs.title")), 3),
              createBaseVNode("p", {
                class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
              }, toDisplayString(__props.runningJobs.length) + " " + toDisplayString(unref(t)("admin.fsIndex.kpi.activeTasks")), 3)
            ])
          ]),
          createVNode(unref(IconChevronDown), {
            class: normalizeClass(["w-4 h-4 transition-transform duration-200", [
              unref(darkMode) ? "text-gray-400" : "text-gray-500",
              { "rotate-180": isExpanded.value }
            ]])
          }, null, 8, ["class"])
        ], 2),
        withDirectives(createBaseVNode("div", _hoisted_3$3, [
          !__props.isLoading && __props.runningJobs.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_4$3, [
            createVNode(unref(IconCheckCircle), {
              class: normalizeClass(["mx-auto w-8 h-8 mb-2", unref(darkMode) ? "text-green-400" : "text-green-500"])
            }, null, 8, ["class"]),
            createBaseVNode("p", {
              class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
            }, toDisplayString(unref(t)("admin.fsIndex.runningJobs.empty")), 3)
          ])) : __props.isLoading ? (openBlock(), createElementBlock("div", _hoisted_5$3, [
            (openBlock(), createElementBlock(Fragment, null, renderList(2, (i) => {
              return createBaseVNode("div", {
                key: i,
                class: normalizeClass(["h-24 rounded-md animate-pulse", unref(darkMode) ? "bg-gray-700" : "bg-gray-200"])
              }, null, 2);
            }), 64))
          ])) : (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(__props.runningJobs, (job) => {
            return openBlock(), createElementBlock("div", {
              key: job.jobId,
              class: normalizeClass(["border rounded-lg p-3 transition-colors", unref(darkMode) ? "border-gray-700 hover:border-blue-700" : "border-gray-200 hover:border-blue-300"])
            }, [
              createBaseVNode("div", _hoisted_6$3, [
                createBaseVNode("div", _hoisted_7$3, [
                  createBaseVNode("div", _hoisted_8$3, [
                    createBaseVNode("span", {
                      class: normalizeClass([
                        "px-1.5 py-0.5 text-xs font-medium rounded",
                        getTaskTypeBadgeClass(job.taskType)
                      ])
                    }, toDisplayString(getTaskTypeText(job.taskType)), 3),
                    createBaseVNode("span", {
                      class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-500" : "text-gray-400"])
                    }, " #" + toDisplayString(job.jobId), 3)
                  ]),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-sm font-medium truncate", unref(darkMode) ? "text-white" : "text-gray-900"])
                  }, [
                    createTextVNode(toDisplayString(getCurrentMountName(job) || unref(t)("admin.fsIndex.runningJobs.processing")) + " ", 1),
                    getCurrentMountStorageType(job) ? (openBlock(), createElementBlock("span", {
                      key: 0,
                      class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-500" : "text-gray-400"])
                    }, " (" + toDisplayString(getCurrentMountStorageType(job)) + ") ", 3)) : createCommentVNode("", true)
                  ], 2)
                ]),
                createBaseVNode("div", _hoisted_9$3, [
                  createBaseVNode("div", _hoisted_10$3, [
                    (openBlock(), createElementBlock("svg", _hoisted_11$3, [
                      createBaseVNode("circle", {
                        cx: "50",
                        cy: "50",
                        r: "40",
                        "stroke-width": "8",
                        fill: "none",
                        class: normalizeClass(unref(darkMode) ? "stroke-gray-700" : "stroke-gray-200")
                      }, null, 2),
                      createBaseVNode("circle", {
                        cx: "50",
                        cy: "50",
                        r: "40",
                        "stroke-width": "8",
                        fill: "none",
                        class: normalizeClass([getProgressStrokeClass(job.taskType), "transition-all duration-500"]),
                        "stroke-dasharray": 251.2,
                        "stroke-dashoffset": getProgressOffset(job),
                        "stroke-linecap": "round"
                      }, null, 10, _hoisted_12$2)
                    ])),
                    createBaseVNode("div", _hoisted_13$2, [
                      createBaseVNode("span", {
                        class: normalizeClass(["text-xs font-bold", unref(darkMode) ? "text-white" : "text-gray-900"])
                      }, toDisplayString(getProgressPercentage(job)) + "% ", 3)
                    ])
                  ]),
                  createBaseVNode("button", {
                    onClick: ($event) => handleStopJob(job.jobId),
                    class: normalizeClass(["p-1.5 rounded transition-colors", unref(darkMode) ? "text-red-400 hover:bg-red-900/20" : "text-red-600 hover:bg-red-50"]),
                    title: unref(t)("admin.fsIndex.actions.stop")
                  }, [
                    createVNode(unref(IconClose), { class: "w-4 h-4" })
                  ], 10, _hoisted_14$1)
                ])
              ]),
              createBaseVNode("div", _hoisted_15$1, [
                job.taskType === "fs_index_rebuild" ? (openBlock(), createElementBlock("div", _hoisted_16$1, [
                  createBaseVNode("span", {
                    class: normalizeClass(unref(darkMode) ? "text-gray-500" : "text-gray-400")
                  }, toDisplayString(unref(t)("admin.fsIndex.runningJobs.mountProgress")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-800"])
                  }, toDisplayString(formatNumber(job.stats?.processedItems || 0)) + "/" + toDisplayString(formatNumber(job.stats?.totalItems || 0)), 3)
                ])) : (openBlock(), createElementBlock("div", _hoisted_17$1, [
                  createBaseVNode("span", {
                    class: normalizeClass(unref(darkMode) ? "text-gray-500" : "text-gray-400")
                  }, toDisplayString(unref(t)("admin.fsIndex.runningJobs.processed")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-800"])
                  }, toDisplayString(formatNumber(job.stats?.processedItems || 0)), 3)
                ])),
                createBaseVNode("div", null, [
                  createBaseVNode("span", {
                    class: normalizeClass(unref(darkMode) ? "text-gray-500" : "text-gray-400")
                  }, toDisplayString(unref(t)("admin.fsIndex.runningJobs.scannedDirs")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-800"])
                  }, toDisplayString(formatNumber(job.stats?.scannedDirs || 0)), 3)
                ]),
                job.taskType === "fs_index_rebuild" ? (openBlock(), createElementBlock("div", _hoisted_18$1, [
                  createBaseVNode("span", {
                    class: normalizeClass(unref(darkMode) ? "text-gray-500" : "text-gray-400")
                  }, toDisplayString(unref(t)("admin.fsIndex.runningJobs.discoveredCount")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-800"])
                  }, toDisplayString(formatNumber(job.stats?.discoveredCount || 0)), 3)
                ])) : (openBlock(), createElementBlock("div", _hoisted_19$1, [
                  createBaseVNode("span", {
                    class: normalizeClass(unref(darkMode) ? "text-gray-500" : "text-gray-400")
                  }, toDisplayString(unref(t)("admin.fsIndex.runningJobs.upsertedCount")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-800"])
                  }, toDisplayString(formatNumber(job.stats?.upsertedCount || 0)), 3)
                ])),
                createBaseVNode("div", null, [
                  createBaseVNode("span", {
                    class: normalizeClass(unref(darkMode) ? "text-gray-500" : "text-gray-400")
                  }, toDisplayString(unref(t)("admin.fsIndex.runningJobs.duration")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-800"])
                  }, toDisplayString(formatDuration(job.startedAt)), 3)
                ])
              ]),
              shouldShowLastUpdate(job) ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["mt-2 text-[11px]", unref(darkMode) ? "text-gray-500" : "text-gray-400"])
              }, toDisplayString(unref(t)("admin.fsIndex.runningJobs.lastUpdate")) + ": " + toDisplayString(formatLastUpdate(job)), 3)) : createCommentVNode("", true)
            ], 2);
          }), 128))
        ], 512), [
          [vShow, isExpanded.value]
        ])
      ], 2);
    };
  }
};
const FsIndexRunningTasks = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c216faaf"]]);
const _hoisted_1$2 = { class: "flex items-start justify-between mb-2" };
const _hoisted_2$2 = { class: "flex items-center gap-2 min-w-0 flex-1" };
const _hoisted_3$2 = { class: "min-w-0 flex-1" };
const _hoisted_4$2 = { class: "flex items-center gap-1.5" };
const _hoisted_5$2 = { class: "space-y-1 mb-2 text-xs" };
const _hoisted_6$2 = { class: "flex justify-between" };
const _hoisted_7$2 = { class: "flex justify-between" };
const _hoisted_8$2 = { class: "flex gap-1" };
const _hoisted_9$2 = ["title"];
const _hoisted_10$2 = ["title"];
const _hoisted_11$2 = ["title"];
const _sfc_main$2 = {
  __name: "FsIndexMountCard",
  props: {
    mount: {
      type: Object,
      required: true
    }
  },
  emits: ["rebuild", "apply-dirty", "clear"],
  setup(__props) {
    const { t } = useI18n();
    const { isDarkMode: darkMode } = useThemeMode();
    const { getStorageTypeIcon, getStorageTypeIconClass, getStorageTypeBgClass } = useStorageTypeIcon();
    const props = __props;
    const statusText = computed(() => {
      return t(getStatusTextKey(props.mount.status));
    });
    const statusBadgeClass = computed(() => {
      return getStatusBadgeClass(props.mount.status);
    });
    const storageTypeIcon = computed(() => {
      return getStorageTypeIcon(props.mount.storageType);
    });
    const storageTypeColorClass = computed(() => {
      return getStorageTypeIconClass(props.mount.storageType, darkMode.value);
    });
    const storageTypeBgClassComputed = computed(() => {
      return getStorageTypeBgClass(props.mount.storageType, darkMode.value);
    });
    const statusIcon = computed(() => {
      switch (props.mount.status) {
        case "ready":
          return IconCheckCircle;
        case "indexing":
          return IconRefresh;
        case "not_ready":
          return IconExclamation;
        case "error":
          return IconXCircle;
        default:
          return IconExclamation;
      }
    });
    const statusIconColorClass = computed(() => {
      switch (props.mount.status) {
        case "ready":
          return darkMode.value ? "text-green-400" : "text-green-600";
        case "indexing":
          return (darkMode.value ? "text-blue-400" : "text-blue-600") + " animate-spin";
        case "not_ready":
          return darkMode.value ? "text-yellow-400" : "text-yellow-600";
        case "error":
          return darkMode.value ? "text-red-400" : "text-red-600";
        default:
          return darkMode.value ? "text-gray-400" : "text-gray-600";
      }
    });
    const borderClass = computed(() => {
      if (props.mount.status === "indexing") {
        return darkMode.value ? "border-2 border-blue-700 bg-blue-900/10" : "border-2 border-blue-300 bg-blue-50/50";
      }
      if (props.mount.recommendedAction === "rebuild") {
        return darkMode.value ? "border-2 border-yellow-700 bg-yellow-900/10" : "border-2 border-yellow-300 bg-yellow-50/50";
      }
      if (props.mount.status === "error") {
        return darkMode.value ? "border-red-700" : "border-red-300";
      }
      return darkMode.value ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-gray-300";
    });
    const borderTopClass = computed(() => {
      if (props.mount.status === "indexing") {
        return darkMode.value ? "border-blue-800" : "border-blue-200";
      }
      if (props.mount.status === "error") {
        return darkMode.value ? "border-red-800" : "border-red-200";
      }
      if (props.mount.recommendedAction === "rebuild") {
        return darkMode.value ? "border-yellow-800" : "border-yellow-200";
      }
      return darkMode.value ? "border-gray-700" : "border-gray-200";
    });
    const lastIndexedText = computed(() => {
      if (!props.mount.lastIndexedMs) {
        return t("admin.fsIndex.card.neverIndexed");
      }
      return formatTimestamp(props.mount.lastIndexedMs);
    });
    const recommendedActionText = computed(() => {
      switch (props.mount.recommendedAction) {
        case "rebuild":
          return t("admin.fsIndex.action.rebuild");
        case "apply-dirty":
          return t("admin.fsIndex.action.applyDirty");
        case "wait":
          return t("admin.fsIndex.action.wait");
        case "none":
          return t("admin.fsIndex.action.none");
        default:
          return t("admin.fsIndex.action.unknown");
      }
    });
    const recommendedActionTextClass = computed(() => {
      switch (props.mount.recommendedAction) {
        case "rebuild":
          return darkMode.value ? "text-yellow-300" : "text-yellow-700";
        case "apply-dirty":
          return darkMode.value ? "text-green-300" : "text-green-700";
        case "wait":
          return darkMode.value ? "text-blue-300" : "text-blue-700";
        default:
          return darkMode.value ? "text-gray-400" : "text-gray-500";
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["border rounded-lg p-3 transition-all duration-200", [
          borderClass.value,
          unref(darkMode) ? "bg-gray-800" : "bg-white"
        ]])
      }, [
        createBaseVNode("div", _hoisted_1$2, [
          createBaseVNode("div", _hoisted_2$2, [
            createBaseVNode("div", {
              class: normalizeClass([
                "w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0",
                storageTypeBgClassComputed.value
              ])
            }, [
              (openBlock(), createBlock(resolveDynamicComponent(storageTypeIcon.value), {
                class: normalizeClass(["w-4 h-4", storageTypeColorClass.value])
              }, null, 8, ["class"]))
            ], 2),
            createBaseVNode("div", _hoisted_3$2, [
              createBaseVNode("div", _hoisted_4$2, [
                createBaseVNode("p", {
                  class: normalizeClass(["font-medium text-sm truncate", unref(darkMode) ? "text-white" : "text-gray-900"])
                }, toDisplayString(__props.mount.name), 3),
                (openBlock(), createBlock(resolveDynamicComponent(statusIcon.value), {
                  class: normalizeClass(["w-3.5 h-3.5 flex-shrink-0", statusIconColorClass.value])
                }, null, 8, ["class"]))
              ]),
              createBaseVNode("p", {
                class: normalizeClass(["text-xs truncate", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
              }, toDisplayString(__props.mount.storageType), 3)
            ])
          ]),
          createBaseVNode("span", {
            class: normalizeClass([
              "px-1.5 py-0.5 text-xs font-medium rounded flex-shrink-0",
              statusBadgeClass.value
            ])
          }, toDisplayString(statusText.value), 3)
        ]),
        createBaseVNode("div", _hoisted_5$2, [
          createBaseVNode("div", _hoisted_6$2, [
            createBaseVNode("span", {
              class: normalizeClass(unref(darkMode) ? "text-gray-400" : "text-gray-500")
            }, toDisplayString(unref(t)("admin.fsIndex.table.dirtyCount")), 3),
            createBaseVNode("span", {
              class: normalizeClass([
                "font-medium",
                __props.mount.dirtyCount > 0 ? unref(darkMode) ? "text-yellow-400" : "text-yellow-600" : unref(darkMode) ? "text-gray-300" : "text-gray-700"
              ])
            }, toDisplayString(__props.mount.dirtyCount || 0), 3)
          ]),
          createBaseVNode("div", _hoisted_7$2, [
            createBaseVNode("span", {
              class: normalizeClass(unref(darkMode) ? "text-gray-400" : "text-gray-500")
            }, toDisplayString(unref(t)("admin.fsIndex.table.lastIndexed")), 3),
            createBaseVNode("span", {
              class: normalizeClass(["font-medium truncate ml-2", unref(darkMode) ? "text-gray-300" : "text-gray-700"])
            }, toDisplayString(lastIndexedText.value), 3)
          ]),
          __props.mount.status === "error" && __props.mount.lastError ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["text-xs p-1.5 rounded mt-1", unref(darkMode) ? "text-red-400 bg-red-900/20" : "text-red-600 bg-red-50"])
          }, toDisplayString(__props.mount.lastError), 3)) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", {
          class: normalizeClass(["flex items-center justify-between pt-2 border-t", borderTopClass.value])
        }, [
          createBaseVNode("span", {
            class: normalizeClass(["text-xs font-medium", recommendedActionTextClass.value])
          }, toDisplayString(recommendedActionText.value), 3),
          createBaseVNode("div", _hoisted_8$2, [
            __props.mount.status !== "indexing" && __props.mount.dirtyCount > 0 ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("apply-dirty")),
              title: unref(t)("admin.fsIndex.actions.applyDirty"),
              class: normalizeClass(["p-1.5 rounded transition-colors", unref(darkMode) ? "text-green-400 hover:bg-green-900/30 hover:text-green-300" : "text-green-600 hover:bg-green-100 hover:text-green-700"])
            }, [
              createVNode(unref(IconUpdate), { class: "w-4 h-4" })
            ], 10, _hoisted_9$2)) : createCommentVNode("", true),
            __props.mount.status !== "indexing" ? (openBlock(), createElementBlock("button", {
              key: 1,
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("rebuild")),
              title: unref(t)("admin.fsIndex.actions.rebuild"),
              class: normalizeClass(["p-1.5 rounded transition-colors", unref(darkMode) ? "text-blue-400 hover:bg-blue-900/30 hover:text-blue-300" : "text-blue-600 hover:bg-blue-100 hover:text-blue-700"])
            }, [
              createVNode(unref(IconRebuild), { class: "w-4 h-4" })
            ], 10, _hoisted_10$2)) : createCommentVNode("", true),
            __props.mount.status !== "indexing" ? (openBlock(), createElementBlock("button", {
              key: 2,
              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("clear")),
              title: unref(t)("admin.fsIndex.actions.clear"),
              class: normalizeClass(["p-1.5 rounded transition-colors", unref(darkMode) ? "text-red-400 hover:bg-red-900/30 hover:text-red-300" : "text-red-500 hover:bg-red-100 hover:text-red-600"])
            }, [
              createVNode(unref(IconTrash), { class: "w-4 h-4" })
            ], 10, _hoisted_11$2)) : createCommentVNode("", true)
          ])
        ], 2)
      ], 2);
    };
  }
};
const _hoisted_1$1 = { class: "p-3 flex-1 flex flex-col overflow-y-auto" };
const _hoisted_2$1 = { class: "space-y-2 flex-1" };
const _hoisted_3$1 = { class: "flex-1 min-w-0" };
const _hoisted_4$1 = { class: "grid grid-cols-2 gap-2 mb-2" };
const _hoisted_5$1 = ["placeholder"];
const _hoisted_6$1 = ["disabled"];
const _hoisted_7$1 = { class: "flex-1 min-w-0" };
const _hoisted_8$1 = { class: "grid grid-cols-2 gap-2 mb-2" };
const _hoisted_9$1 = ["placeholder"];
const _hoisted_10$1 = { class: "flex items-center gap-2 mb-2" };
const _hoisted_11$1 = ["disabled"];
const _hoisted_12$1 = { class: "flex-1 min-w-0" };
const _hoisted_13$1 = ["disabled"];
const _sfc_main$1 = {
  __name: "FsIndexActionPanel",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["rebuild", "applyDirty", "clear", "refresh"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { t } = useI18n();
    const { isDarkMode: darkMode } = useThemeMode();
    const emit = __emit;
    const rebuildExpanded = ref(false);
    const applyDirtyExpanded = ref(false);
    const defaultRebuildOptions = {
      batchSize: 200,
      maxDepth: null
    };
    const defaultApplyDirtyOptions = {
      batchSize: 200,
      maxItems: null,
      rebuildDirectorySubtree: true
    };
    const rebuildOptions = reactive({ ...defaultRebuildOptions });
    const applyDirtyOptions = reactive({ ...defaultApplyDirtyOptions });
    function toggleRebuildExpand() {
      rebuildExpanded.value = !rebuildExpanded.value;
      if (rebuildExpanded.value) {
        applyDirtyExpanded.value = false;
      }
    }
    function toggleApplyDirtyExpand() {
      applyDirtyExpanded.value = !applyDirtyExpanded.value;
      if (applyDirtyExpanded.value) {
        rebuildExpanded.value = false;
      }
    }
    function handleRebuild() {
      emit("rebuild");
    }
    function handleApplyDirty() {
      emit("applyDirty");
    }
    __expose({
      getRebuildOptions: () => {
        const opts = {};
        if (Number.isFinite(rebuildOptions.batchSize) && rebuildOptions.batchSize !== defaultRebuildOptions.batchSize) {
          opts.batchSize = rebuildOptions.batchSize;
        }
        if (rebuildOptions.maxDepth !== null && rebuildOptions.maxDepth !== void 0 && Number.isFinite(rebuildOptions.maxDepth)) {
          opts.maxDepth = rebuildOptions.maxDepth;
        }
        opts.refresh = true;
        return opts;
      },
      getApplyDirtyOptions: () => {
        const opts = {};
        if (Number.isFinite(applyDirtyOptions.batchSize) && applyDirtyOptions.batchSize !== defaultApplyDirtyOptions.batchSize) {
          opts.batchSize = applyDirtyOptions.batchSize;
        }
        if (applyDirtyOptions.maxItems !== null && applyDirtyOptions.maxItems !== void 0 && Number.isFinite(applyDirtyOptions.maxItems)) {
          opts.maxItems = applyDirtyOptions.maxItems;
        }
        if (applyDirtyOptions.rebuildDirectorySubtree !== defaultApplyDirtyOptions.rebuildDirectorySubtree) {
          opts.rebuildDirectorySubtree = applyDirtyOptions.rebuildDirectorySubtree;
        }
        opts.refresh = true;
        return opts;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["rounded-xl border shadow-sm h-full flex flex-col", unref(darkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["px-4 py-3 border-b flex-shrink-0", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
        }, [
          createBaseVNode("h3", {
            class: normalizeClass(["text-sm font-semibold", unref(darkMode) ? "text-white" : "text-gray-900"])
          }, toDisplayString(unref(t)("admin.fsIndex.actions.title")), 3)
        ], 2),
        createBaseVNode("div", _hoisted_1$1, [
          createBaseVNode("div", _hoisted_2$1, [
            createBaseVNode("div", {
              class: normalizeClass(["rounded-lg border overflow-hidden", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["flex items-center gap-3 p-2.5 cursor-pointer transition-colors", unref(darkMode) ? "hover:bg-gray-700/50" : "hover:bg-gray-50"]),
                onClick: toggleRebuildExpand
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0", unref(darkMode) ? "bg-primary-900/30" : "bg-primary-100"])
                }, [
                  createVNode(unref(IconRebuild), {
                    class: normalizeClass(["w-4 h-4", unref(darkMode) ? "text-primary-400" : "text-primary-600"])
                  }, null, 8, ["class"])
                ], 2),
                createBaseVNode("div", _hoisted_3$1, [
                  createBaseVNode("h4", {
                    class: normalizeClass(["text-sm font-medium", unref(darkMode) ? "text-white" : "text-gray-900"])
                  }, toDisplayString(unref(t)("admin.fsIndex.actions.rebuildAll")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs truncate", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.fsIndex.actionPanel.rebuildDesc")), 3)
                ]),
                createVNode(unref(IconChevronDown), {
                  class: normalizeClass(["w-4 h-4 flex-shrink-0 transition-transform duration-200", [
                    unref(darkMode) ? "text-gray-500" : "text-gray-400",
                    { "rotate-180": rebuildExpanded.value }
                  ]])
                }, null, 8, ["class"])
              ], 2),
              withDirectives(createBaseVNode("div", {
                class: normalizeClass(["px-3 pb-3 pt-1 border-t", unref(darkMode) ? "border-gray-700 bg-gray-750" : "border-gray-100 bg-gray-50"])
              }, [
                createBaseVNode("div", _hoisted_4$1, [
                  createBaseVNode("div", null, [
                    createBaseVNode("label", {
                      class: normalizeClass(["block text-xs mb-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                    }, toDisplayString(unref(t)("admin.fsIndex.advancedOptions.batchSize")), 3),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => rebuildOptions.batchSize = $event),
                      type: "number",
                      min: "20",
                      max: "1000",
                      step: "50",
                      class: normalizeClass(["w-full px-2 py-1 text-xs rounded border focus:outline-none focus:ring-1", unref(darkMode) ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-primary-500" : "bg-white border-gray-300 text-gray-700 focus:ring-primary-500"])
                    }, null, 2), [
                      [
                        vModelText,
                        rebuildOptions.batchSize,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("label", {
                      class: normalizeClass(["block text-xs mb-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                    }, toDisplayString(unref(t)("admin.fsIndex.advancedOptions.maxDepth")), 3),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => rebuildOptions.maxDepth = $event),
                      type: "number",
                      min: "0",
                      max: "100",
                      placeholder: unref(t)("admin.fsIndex.advancedOptions.unlimited"),
                      class: normalizeClass(["w-full px-2 py-1 text-xs rounded border focus:outline-none focus:ring-1", unref(darkMode) ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-500 focus:ring-primary-500" : "bg-white border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-primary-500"])
                    }, null, 10, _hoisted_5$1), [
                      [
                        vModelText,
                        rebuildOptions.maxDepth,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ])
                ]),
                createBaseVNode("button", {
                  onClick: handleRebuild,
                  disabled: __props.disabled,
                  class: normalizeClass(["w-full py-1.5 text-xs font-medium text-white rounded transition-colors disabled:opacity-50", unref(darkMode) ? "bg-primary-600 hover:bg-primary-700" : "bg-primary-500 hover:bg-primary-600"])
                }, toDisplayString(unref(t)("admin.fsIndex.actions.rebuild")), 11, _hoisted_6$1)
              ], 2), [
                [vShow, rebuildExpanded.value]
              ])
            ], 2),
            createBaseVNode("div", {
              class: normalizeClass(["rounded-lg border overflow-hidden", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["flex items-center gap-3 p-2.5 cursor-pointer transition-colors", unref(darkMode) ? "hover:bg-gray-700/50" : "hover:bg-gray-50"]),
                onClick: toggleApplyDirtyExpand
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0", unref(darkMode) ? "bg-green-900/30" : "bg-green-100"])
                }, [
                  createVNode(unref(IconUpdate), {
                    class: normalizeClass(["w-4 h-4", unref(darkMode) ? "text-green-400" : "text-green-600"])
                  }, null, 8, ["class"])
                ], 2),
                createBaseVNode("div", _hoisted_7$1, [
                  createBaseVNode("h4", {
                    class: normalizeClass(["text-sm font-medium", unref(darkMode) ? "text-white" : "text-gray-900"])
                  }, toDisplayString(unref(t)("admin.fsIndex.actions.applyDirtyAll")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs truncate", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.fsIndex.actionPanel.applyDirtyDesc")), 3)
                ]),
                createVNode(unref(IconChevronDown), {
                  class: normalizeClass(["w-4 h-4 flex-shrink-0 transition-transform duration-200", [
                    unref(darkMode) ? "text-gray-500" : "text-gray-400",
                    { "rotate-180": applyDirtyExpanded.value }
                  ]])
                }, null, 8, ["class"])
              ], 2),
              withDirectives(createBaseVNode("div", {
                class: normalizeClass(["px-3 pb-3 pt-1 border-t", unref(darkMode) ? "border-gray-700 bg-gray-750" : "border-gray-100 bg-gray-50"])
              }, [
                createBaseVNode("div", _hoisted_8$1, [
                  createBaseVNode("div", null, [
                    createBaseVNode("label", {
                      class: normalizeClass(["block text-xs mb-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                    }, toDisplayString(unref(t)("admin.fsIndex.advancedOptions.batchSize")), 3),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => applyDirtyOptions.batchSize = $event),
                      type: "number",
                      min: "10",
                      max: "2000",
                      step: "50",
                      class: normalizeClass(["w-full px-2 py-1 text-xs rounded border focus:outline-none focus:ring-1", unref(darkMode) ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-primary-500" : "bg-white border-gray-300 text-gray-700 focus:ring-primary-500"])
                    }, null, 2), [
                      [
                        vModelText,
                        applyDirtyOptions.batchSize,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("label", {
                      class: normalizeClass(["block text-xs mb-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                    }, toDisplayString(unref(t)("admin.fsIndex.advancedOptions.maxItems")), 3),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => applyDirtyOptions.maxItems = $event),
                      type: "number",
                      min: "100",
                      max: "100000",
                      step: "100",
                      placeholder: unref(t)("admin.fsIndex.advancedOptions.unlimited"),
                      class: normalizeClass(["w-full px-2 py-1 text-xs rounded border focus:outline-none focus:ring-1", unref(darkMode) ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-500 focus:ring-primary-500" : "bg-white border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-primary-500"])
                    }, null, 10, _hoisted_9$1), [
                      [
                        vModelText,
                        applyDirtyOptions.maxItems,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_10$1, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => applyDirtyOptions.rebuildDirectorySubtree = $event),
                    type: "checkbox",
                    id: "rebuild-subtree",
                    class: normalizeClass(["w-3.5 h-3.5 rounded border focus:ring-primary-500", unref(darkMode) ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"])
                  }, null, 2), [
                    [vModelCheckbox, applyDirtyOptions.rebuildDirectorySubtree]
                  ]),
                  createBaseVNode("label", {
                    for: "rebuild-subtree",
                    class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                  }, toDisplayString(unref(t)("admin.fsIndex.advancedOptions.rebuildSubtree")), 3)
                ]),
                createBaseVNode("button", {
                  onClick: handleApplyDirty,
                  disabled: __props.disabled,
                  class: normalizeClass(["w-full py-1.5 text-xs font-medium text-white rounded transition-colors disabled:opacity-50", unref(darkMode) ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"])
                }, toDisplayString(unref(t)("admin.fsIndex.actions.applyDirty")), 11, _hoisted_11$1)
              ], 2), [
                [vShow, applyDirtyExpanded.value]
              ])
            ], 2),
            createBaseVNode("div", {
              class: normalizeClass(["rounded-lg border overflow-hidden", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["flex items-center gap-3 p-2.5 cursor-pointer transition-colors", unref(darkMode) ? "hover:bg-gray-700/50" : "hover:bg-gray-50"]),
                onClick: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("clear"))
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0", unref(darkMode) ? "bg-red-900/30" : "bg-red-100"])
                }, [
                  createVNode(unref(IconTrash), {
                    class: normalizeClass(["w-4 h-4", unref(darkMode) ? "text-red-400" : "text-red-500"])
                  }, null, 8, ["class"])
                ], 2),
                createBaseVNode("div", _hoisted_12$1, [
                  createBaseVNode("h4", {
                    class: normalizeClass(["text-sm font-medium", unref(darkMode) ? "text-white" : "text-gray-900"])
                  }, toDisplayString(unref(t)("admin.fsIndex.actions.clearAll")), 3),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-xs truncate", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.fsIndex.actionPanel.clearDesc")), 3)
                ])
              ], 2)
            ], 2)
          ]),
          createBaseVNode("div", {
            class: normalizeClass(["pt-2 mt-2 border-t flex-shrink-0", unref(darkMode) ? "border-gray-700" : "border-gray-200"])
          }, [
            createBaseVNode("button", {
              onClick: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("refresh")),
              disabled: __props.isLoading,
              class: normalizeClass(["w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors", unref(darkMode) ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-100 hover:bg-gray-200 text-gray-700"])
            }, [
              createVNode(unref(IconRefresh), {
                class: normalizeClass(["w-4 h-4", { "animate-spin": __props.isLoading }])
              }, null, 8, ["class"]),
              createTextVNode(" " + toDisplayString(unref(t)("admin.fsIndex.actions.refresh")), 1)
            ], 10, _hoisted_13$1)
          ], 2)
        ])
      ], 2);
    };
  }
};
const _hoisted_1 = { class: "p-4 flex-1 flex flex-col overflow-y-auto" };
const _hoisted_2 = { class: "mb-4" };
const _hoisted_3 = { class: "grid grid-cols-1 xl:grid-cols-12 gap-4 mb-4" };
const _hoisted_4 = { class: "xl:col-span-8 space-y-4" };
const _hoisted_5 = { class: "grid grid-cols-1 lg:grid-cols-2 gap-4" };
const _hoisted_6 = { class: "xl:col-span-4" };
const _hoisted_7 = { class: "flex flex-col flex-1" };
const _hoisted_8 = { class: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4" };
const _hoisted_9 = { class: "flex flex-wrap items-center gap-3" };
const _hoisted_10 = { class: "relative" };
const _hoisted_11 = ["placeholder"];
const _hoisted_12 = ["value"];
const _hoisted_13 = ["title"];
const _hoisted_14 = ["title"];
const _hoisted_15 = { class: "flex-1 overflow-y-auto" };
const _hoisted_16 = {
  key: 0,
  class: "flex justify-center items-center h-40"
};
const _hoisted_17 = { class: "space-y-3" };
const _hoisted_18 = { key: 2 };
const _hoisted_19 = {
  key: 0,
  class: "text-center py-10"
};
const _hoisted_20 = {
  key: 1,
  class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3"
};
const _hoisted_21 = {
  key: 0,
  class: "mt-4"
};
const _sfc_main = {
  __name: "FsIndexManagement",
  setup(__props) {
    const { t } = useI18n();
    const log = createLogger("FsIndexManagement");
    const { showSuccess, showError } = useGlobalMessage();
    const { isDarkMode: darkMode } = useThemeMode();
    const { dialogState, confirm, handleConfirm, handleCancel } = useConfirmDialog();
    const { getStorageTypeIcon, getStorageTypeIconClass } = useStorageTypeIcon();
    const isLoading = ref(false);
    const indexStatusData = ref(null);
    const viewMode = ref("card");
    let autoRefreshInFlight = false;
    const { pause: stopAutoRefresh, resume: startAutoRefresh } = useIntervalFn(
      async () => {
        const hasRunningJobs = Array.isArray(indexStatusData.value?.runningJobs) && indexStatusData.value.runningJobs.length > 0;
        const hasIndexingMounts = Array.isArray(indexStatusData.value?.items) && indexStatusData.value.items.some((x) => x?.status === "indexing");
        if (!hasRunningJobs && !hasIndexingMounts) return;
        if (autoRefreshInFlight) return;
        autoRefreshInFlight = true;
        try {
          await loadIndexStatus({ silent: true });
        } finally {
          autoRefreshInFlight = false;
        }
      },
      2e3,
      { immediate: false }
    );
    const actionPanelRef = ref(null);
    const currentPage = ref(1);
    const pageSize = ref(8);
    const pageSizeOptions = [8, 12, 16, 24];
    const statusFilter = ref("all");
    const searchQuery = ref("");
    const statusOptions = computed(() => [
      { value: "all", label: t("admin.fsIndex.filter.all") },
      { value: "ready", label: t("admin.fsIndex.status.ready") },
      { value: "indexing", label: t("admin.fsIndex.status.indexing") },
      { value: "not_ready", label: t("admin.fsIndex.status.notReady") },
      { value: "error", label: t("admin.fsIndex.status.error") }
    ]);
    const hasValidMounts = computed(() => {
      return indexStatusData.value?.items && indexStatusData.value.items.length > 0;
    });
    const filteredMounts = computed(() => {
      if (!indexStatusData.value?.items) return [];
      let items = [...indexStatusData.value.items];
      if (statusFilter.value !== "all") {
        items = items.filter((item) => item.status === statusFilter.value);
      }
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim();
        items = items.filter(
          (item) => item.name?.toLowerCase().includes(query) || item.storageType?.toLowerCase().includes(query)
        );
      }
      return items;
    });
    const paginatedMounts = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return filteredMounts.value.slice(start, end);
    });
    const totalPages = computed(() => {
      return Math.ceil(filteredMounts.value.length / pageSize.value) || 1;
    });
    const paginationData = computed(() => ({
      page: currentPage.value,
      limit: pageSize.value,
      total: filteredMounts.value.length,
      totalPages: totalPages.value
    }));
    watch([statusFilter, searchQuery], () => {
      currentPage.value = 1;
    });
    function handlePageChange(page) {
      currentPage.value = page;
    }
    function handleLimitChange(limit) {
      pageSize.value = limit;
      currentPage.value = 1;
    }
    const mountColumns = computed(() => [
      // 挂载点名称
      {
        type: "accessor",
        key: "name",
        header: t("admin.fsIndex.table.mountName"),
        sortable: true,
        render: (value, row) => {
          return h("div", { class: "flex items-center gap-2" }, [
            // 存储类型品牌图标
            h(getStorageTypeIcon(row.storageType), {
              class: ["w-4 h-4 flex-shrink-0", getStorageTypeIconClass(row.storageType, darkMode.value)]
            }),
            h("span", {
              class: ["font-medium truncate", darkMode.value ? "text-white" : "text-gray-900"],
              title: value
            }, value),
            // 状态小图标
            h(getStatusIcon(row.status), {
              class: ["w-3.5 h-3.5 flex-shrink-0", getStatusIconClass(row.status)]
            })
          ]);
        }
      },
      // 存储类型
      {
        type: "accessor",
        key: "storageType",
        header: t("admin.fsIndex.table.storageType"),
        sortable: true,
        render: (value) => {
          return h("span", {
            class: ["px-1.5 py-0.5 rounded text-xs", darkMode.value ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"]
          }, value);
        }
      },
      // 状态
      {
        type: "accessor",
        key: "status",
        header: t("admin.fsIndex.table.status"),
        sortable: true,
        render: (value) => {
          return h("span", {
            class: ["px-1.5 py-0.5 text-xs font-medium rounded", getStatusBadgeClass(value)]
          }, t(getStatusTextKey(value)));
        }
      },
      // 待处理变更
      {
        type: "accessor",
        key: "dirtyCount",
        header: t("admin.fsIndex.table.dirtyCount"),
        sortable: true,
        render: (value) => {
          return h("span", {
            class: [
              "font-medium tabular-nums",
              value > 0 ? darkMode.value ? "text-yellow-400" : "text-yellow-600" : darkMode.value ? "text-gray-400" : "text-gray-500"
            ]
          }, value || 0);
        }
      },
      // 最后索引时间
      {
        type: "accessor",
        key: "lastIndexedMs",
        header: t("admin.fsIndex.table.lastIndexed"),
        sortable: true,
        render: (value) => {
          const text = value ? formatTimestamp(value) : t("admin.fsIndex.card.neverIndexed");
          return h("span", {
            class: ["text-xs", darkMode.value ? "text-gray-400" : "text-gray-500"]
          }, text);
        }
      },
      // 操作
      {
        type: "display",
        key: "actions",
        header: t("admin.fsIndex.table.actions"),
        sortable: false,
        render: (row) => {
          const buttons = [];
          if (row.status === "indexing") {
            buttons.push(
              h("span", {
                class: [
                  "px-2 py-1 text-xs rounded inline-flex items-center gap-1",
                  darkMode.value ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
                ]
              }, [
                h(IconRefresh, { class: "w-3 h-3 animate-spin" }),
                t("admin.fsIndex.status.indexing")
              ])
            );
          } else {
            if (row.recommendedAction === "rebuild") {
              buttons.push(
                h("button", {
                  onClick: (e) => {
                    e.stopPropagation();
                    handleRebuildMount(row.mountId);
                  },
                  class: [
                    "px-2 py-1 text-xs font-medium text-white rounded transition-colors",
                    darkMode.value ? "bg-yellow-600 hover:bg-yellow-700" : "bg-yellow-500 hover:bg-yellow-600"
                  ],
                  title: t("admin.fsIndex.actions.rebuild")
                }, t("admin.fsIndex.actions.rebuild"))
              );
            } else if (row.recommendedAction === "apply-dirty") {
              buttons.push(
                h("button", {
                  onClick: (e) => {
                    e.stopPropagation();
                    handleApplyDirtyMount(row.mountId);
                  },
                  class: [
                    "px-2 py-1 text-xs font-medium text-white rounded transition-colors",
                    darkMode.value ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
                  ],
                  title: t("admin.fsIndex.actions.applyDirty")
                }, t("admin.fsIndex.actions.applyDirty"))
              );
            }
            const isNotReady = row.status === "not_ready";
            buttons.push(
              h("button", {
                onClick: (e) => {
                  e.stopPropagation();
                  if (!isNotReady) handleClearMount(row.mountId);
                },
                disabled: isNotReady,
                class: [
                  "px-2 py-1 text-xs font-medium rounded transition-colors",
                  isNotReady ? darkMode.value ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-400 cursor-not-allowed" : darkMode.value ? "bg-gray-600 hover:bg-gray-500 text-gray-200" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                ],
                title: t("admin.fsIndex.actions.clear")
              }, t("admin.fsIndex.actions.clear"))
            );
          }
          return h("div", { class: "flex items-center justify-center gap-1.5" }, buttons);
        }
      }
    ]);
    const mountColumnClasses = {
      name: "w-[30%] text-left",
      storageType: "w-[12%] text-center",
      status: "w-[12%] text-center",
      dirtyCount: "w-[12%] text-center",
      lastIndexedMs: "w-[16%] text-center",
      actions: "w-[18%] text-center"
    };
    function getStatusIcon(status) {
      switch (status) {
        case "ready":
          return IconCheckCircle;
        case "indexing":
          return IconRefresh;
        case "not_ready":
          return IconExclamation;
        case "error":
          return IconXCircle;
        default:
          return IconExclamation;
      }
    }
    function getStatusIconClass(status) {
      switch (status) {
        case "ready":
          return darkMode.value ? "text-green-400" : "text-green-600";
        case "indexing":
          return (darkMode.value ? "text-blue-400" : "text-blue-600") + " animate-spin";
        case "not_ready":
          return darkMode.value ? "text-yellow-400" : "text-yellow-600";
        case "error":
          return darkMode.value ? "text-red-400" : "text-red-600";
        default:
          return darkMode.value ? "text-gray-400" : "text-gray-600";
      }
    }
    async function loadIndexStatus(options = {}) {
      const silent = options?.silent === true;
      try {
        if (!silent) isLoading.value = true;
        const response = await api.admin.fsIndex.getIndexStatus();
        indexStatusData.value = response.data;
      } catch (error) {
        log.error("Failed to load index status:", error);
        showError(t("admin.fsIndex.error.loadFailed"));
      } finally {
        if (!silent) isLoading.value = false;
      }
    }
    async function handleRefresh() {
      await loadIndexStatus();
    }
    async function handleRebuildAll() {
      const confirmed = await confirm({
        title: t("admin.fsIndex.confirm.rebuildTitle"),
        message: t("admin.fsIndex.confirm.rebuildAll"),
        confirmType: "danger",
        confirmText: t("admin.fsIndex.actions.rebuildAll"),
        darkMode: darkMode.value
      });
      if (!confirmed) return;
      try {
        const options = actionPanelRef.value?.getRebuildOptions() || {};
        await api.admin.fsIndex.rebuildIndex(null, options);
        showSuccess(t("admin.fsIndex.success.rebuildStarted"));
        await loadIndexStatus();
      } catch (error) {
        log.error("Failed to rebuild index:", error);
        showError(t("admin.fsIndex.error.rebuildFailed"));
      }
    }
    async function handleApplyDirtyAll() {
      const confirmed = await confirm({
        title: t("admin.fsIndex.confirm.applyDirtyTitle"),
        message: t("admin.fsIndex.confirm.applyDirtyAll"),
        confirmType: "warning",
        confirmText: t("admin.fsIndex.actions.applyDirtyAll"),
        darkMode: darkMode.value
      });
      if (!confirmed) return;
      try {
        const options = actionPanelRef.value?.getApplyDirtyOptions() || {};
        await api.admin.fsIndex.applyDirty(null, options);
        showSuccess(t("admin.fsIndex.success.applyDirtyStarted"));
        await loadIndexStatus();
      } catch (error) {
        log.error("Failed to apply dirty:", error);
        showError(t("admin.fsIndex.error.applyDirtyFailed"));
      }
    }
    async function handleClearAll() {
      const confirmed = await confirm({
        title: t("admin.fsIndex.confirm.clearTitle"),
        message: t("admin.fsIndex.confirm.clearAll"),
        confirmType: "danger",
        confirmText: t("admin.fsIndex.actions.clearAll"),
        darkMode: darkMode.value
      });
      if (!confirmed) return;
      try {
        await api.admin.fsIndex.clearIndex(null);
        showSuccess(t("admin.fsIndex.success.cleared"));
        await loadIndexStatus();
      } catch (error) {
        log.error("Failed to clear index:", error);
        showError(t("admin.fsIndex.error.clearFailed"));
      }
    }
    async function handleRebuildMount(mountId) {
      const confirmed = await confirm({
        title: t("admin.fsIndex.confirm.rebuildTitle"),
        message: t("admin.fsIndex.confirm.rebuildSelected", { count: 1 }),
        confirmType: "danger",
        confirmText: t("admin.fsIndex.actions.rebuild"),
        darkMode: darkMode.value
      });
      if (!confirmed) return;
      try {
        await api.admin.fsIndex.rebuildIndex([mountId], {});
        showSuccess(t("admin.fsIndex.success.rebuildStarted"));
        await loadIndexStatus();
      } catch (error) {
        log.error("Failed to rebuild mount:", error);
        showError(t("admin.fsIndex.error.rebuildFailed"));
      }
    }
    async function handleApplyDirtyMount(mountId) {
      const confirmed = await confirm({
        title: t("admin.fsIndex.confirm.applyDirtyTitle"),
        message: t("admin.fsIndex.confirm.applyDirtySelected", { count: 1 }),
        confirmType: "warning",
        confirmText: t("admin.fsIndex.actions.applyDirty"),
        darkMode: darkMode.value
      });
      if (!confirmed) return;
      try {
        await api.admin.fsIndex.applyDirty([mountId], {});
        showSuccess(t("admin.fsIndex.success.applyDirtyStarted"));
        await loadIndexStatus();
      } catch (error) {
        log.error("Failed to apply dirty to mount:", error);
        showError(t("admin.fsIndex.error.applyDirtyFailed"));
      }
    }
    async function handleClearMount(mountId) {
      const confirmed = await confirm({
        title: t("admin.fsIndex.confirm.clearTitle"),
        message: t("admin.fsIndex.confirm.clearSelected", { count: 1 }),
        confirmType: "danger",
        confirmText: t("admin.fsIndex.actions.clear"),
        darkMode: darkMode.value
      });
      if (!confirmed) return;
      try {
        await api.admin.fsIndex.clearIndex([mountId]);
        showSuccess(t("admin.fsIndex.success.cleared"));
        await loadIndexStatus();
      } catch (error) {
        log.error("Failed to clear mount index:", error);
        showError(t("admin.fsIndex.error.clearFailed"));
      }
    }
    async function handleStopJob(jobId) {
      const confirmed = await confirm({
        title: t("admin.fsIndex.confirm.stopTitle"),
        message: t("admin.fsIndex.confirm.stopJob", { jobId }),
        confirmType: "warning",
        confirmText: t("admin.fsIndex.actions.stop"),
        darkMode: darkMode.value
      });
      if (!confirmed) return;
      try {
        await api.admin.fsIndex.stopIndexJob(jobId);
        showSuccess(t("admin.fsIndex.success.stopped"));
        await loadIndexStatus();
      } catch (error) {
        log.error("Failed to stop job:", error);
        showError(t("admin.fsIndex.error.stopFailed"));
      }
    }
    onMounted(async () => {
      await loadIndexStatus();
      startAutoRefresh();
    });
    onUnmounted(() => {
      stopAutoRefresh();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("h2", {
            class: normalizeClass(["text-lg font-medium", unref(darkMode) ? "text-gray-100" : "text-gray-900"])
          }, toDisplayString(unref(t)("admin.fsIndex.title")), 3),
          createBaseVNode("p", {
            class: normalizeClass(["text-xs mt-0.5", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
          }, toDisplayString(unref(t)("admin.fsIndex.description")), 3)
        ]),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, [
              createVNode(FsIndexStatusChart, {
                "index-status": indexStatusData.value,
                "is-loading": isLoading.value
              }, null, 8, ["index-status", "is-loading"]),
              createVNode(_sfc_main$5, {
                "index-status": indexStatusData.value,
                "is-loading": isLoading.value
              }, null, 8, ["index-status", "is-loading"])
            ]),
            createVNode(FsIndexRunningTasks, {
              "running-jobs": indexStatusData.value?.runningJobs || [],
              mounts: indexStatusData.value?.items || [],
              "is-loading": isLoading.value,
              onStopJob: handleStopJob
            }, null, 8, ["running-jobs", "mounts", "is-loading"])
          ]),
          createBaseVNode("div", _hoisted_6, [
            createVNode(_sfc_main$1, {
              ref_key: "actionPanelRef",
              ref: actionPanelRef,
              disabled: isLoading.value || !hasValidMounts.value,
              "is-loading": isLoading.value,
              onRebuild: handleRebuildAll,
              onApplyDirty: handleApplyDirtyAll,
              onClear: handleClearAll,
              onRefresh: handleRefresh
            }, null, 8, ["disabled", "is-loading"])
          ])
        ]),
        createBaseVNode("div", _hoisted_7, [
          createBaseVNode("div", _hoisted_8, [
            createBaseVNode("h3", {
              class: normalizeClass(["text-sm font-semibold", unref(darkMode) ? "text-white" : "text-gray-900"])
            }, toDisplayString(unref(t)("admin.fsIndex.table.title")), 3),
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, [
                createVNode(unref(IconSearch), {
                  class: normalizeClass(["absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4", unref(darkMode) ? "text-gray-500" : "text-gray-400"])
                }, null, 8, ["class"]),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
                  type: "text",
                  placeholder: unref(t)("admin.fsIndex.filter.placeholder"),
                  class: normalizeClass(["pl-8 pr-3 py-2 text-sm rounded-lg border w-48 focus:outline-none focus:ring-2 transition-colors", unref(darkMode) ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-500 focus:ring-primary-500/50 focus:border-primary-500" : "bg-white border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-primary-500/50 focus:border-primary-500"])
                }, null, 10, _hoisted_11), [
                  [vModelText, searchQuery.value]
                ])
              ]),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => statusFilter.value = $event),
                class: normalizeClass(["px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 transition-colors", unref(darkMode) ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-primary-500/50 focus:border-primary-500" : "bg-white border-gray-300 text-gray-700 focus:ring-primary-500/50 focus:border-primary-500"])
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(statusOptions.value, (option) => {
                  return openBlock(), createElementBlock("option", {
                    key: option.value,
                    value: option.value
                  }, toDisplayString(option.label), 9, _hoisted_12);
                }), 128))
              ], 2), [
                [vModelSelect, statusFilter.value]
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["h-6 w-px", unref(darkMode) ? "bg-gray-600" : "bg-gray-300"])
              }, null, 2),
              createBaseVNode("div", {
                class: normalizeClass(["flex items-center rounded-lg border p-0.5", unref(darkMode) ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-200"])
              }, [
                createBaseVNode("button", {
                  onClick: _cache[2] || (_cache[2] = ($event) => viewMode.value = "table"),
                  class: normalizeClass(["p-1.5 rounded-md transition-colors", viewMode.value === "table" ? unref(darkMode) ? "bg-gray-600 text-white shadow-sm" : "bg-white text-gray-900 shadow-sm" : unref(darkMode) ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"]),
                  title: unref(t)("admin.fsIndex.viewMode.table")
                }, [
                  createVNode(unref(IconTable), { class: "w-4 h-4" })
                ], 10, _hoisted_13),
                createBaseVNode("button", {
                  onClick: _cache[3] || (_cache[3] = ($event) => viewMode.value = "card"),
                  class: normalizeClass(["p-1.5 rounded-md transition-colors", viewMode.value === "card" ? unref(darkMode) ? "bg-gray-600 text-white shadow-sm" : "bg-white text-gray-900 shadow-sm" : unref(darkMode) ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"]),
                  title: unref(t)("admin.fsIndex.viewMode.card")
                }, [
                  createVNode(unref(IconGrid), { class: "w-4 h-4" })
                ], 10, _hoisted_14)
              ], 2)
            ])
          ]),
          createBaseVNode("div", _hoisted_15, [
            isLoading.value ? (openBlock(), createElementBlock("div", _hoisted_16, [
              createVNode(unref(IconRefresh), { class: "animate-spin h-8 w-8 text-primary-500" })
            ])) : viewMode.value === "table" ? (openBlock(), createBlock(_sfc_main$6, {
              key: 1,
              data: paginatedMounts.value,
              columns: mountColumns.value,
              "column-classes": mountColumnClasses,
              "empty-text": unref(t)("admin.fsIndex.empty.title")
            }, {
              mobile: withCtx(({ data }) => [
                createBaseVNode("div", _hoisted_17, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(data, (item) => {
                    return openBlock(), createBlock(_sfc_main$2, {
                      key: item.mountId,
                      mount: item,
                      onRebuild: ($event) => handleRebuildMount(item.mountId),
                      onApplyDirty: ($event) => handleApplyDirtyMount(item.mountId),
                      onClear: ($event) => handleClearMount(item.mountId)
                    }, null, 8, ["mount", "onRebuild", "onApplyDirty", "onClear"]);
                  }), 128))
                ])
              ]),
              _: 1
            }, 8, ["data", "columns", "empty-text"])) : (openBlock(), createElementBlock("div", _hoisted_18, [
              paginatedMounts.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_19, [
                createVNode(unref(IconFolder), {
                  class: normalizeClass(["mx-auto w-10 h-10 mb-3", unref(darkMode) ? "text-gray-600" : "text-gray-400"])
                }, null, 8, ["class"]),
                createBaseVNode("h3", {
                  class: normalizeClass(["text-sm font-medium mb-1", unref(darkMode) ? "text-gray-100" : "text-gray-900"])
                }, toDisplayString(searchQuery.value || statusFilter.value !== "all" ? unref(t)("admin.fsIndex.filter.noResults") : unref(t)("admin.fsIndex.empty.title")), 3),
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.fsIndex.empty.description")), 3)
              ])) : (openBlock(), createElementBlock("div", _hoisted_20, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(paginatedMounts.value, (item) => {
                  return openBlock(), createBlock(_sfc_main$2, {
                    key: item.mountId,
                    mount: item,
                    onRebuild: ($event) => handleRebuildMount(item.mountId),
                    onApplyDirty: ($event) => handleApplyDirtyMount(item.mountId),
                    onClear: ($event) => handleClearMount(item.mountId)
                  }, null, 8, ["mount", "onRebuild", "onApplyDirty", "onClear"]);
                }), 128))
              ]))
            ]))
          ]),
          filteredMounts.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_21, [
            createVNode(_sfc_main$7, {
              "dark-mode": unref(darkMode),
              pagination: paginationData.value,
              mode: "page",
              "show-page-size-selector": true,
              "page-size-options": pageSizeOptions,
              onPageChanged: handlePageChange,
              onLimitChanged: handleLimitChange
            }, null, 8, ["dark-mode", "pagination"])
          ])) : createCommentVNode("", true)
        ]),
        createVNode(_sfc_main$8, mergeProps(unref(dialogState), {
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
