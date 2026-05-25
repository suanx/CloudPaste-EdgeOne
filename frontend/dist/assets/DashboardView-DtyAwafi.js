import { E as api, aK as _export_sfc, ac as useThemeMode, e as useI18n, c as createLogger, g as ref, b2 as onClickOutside, F as computed, w as watch, o as onMounted, u as useEventListener, j as createElementBlock, k as openBlock, z as createVNode, l as createBaseVNode, n as normalizeClass, y as unref, b3 as IconLockClosed, p as createCommentVNode, t as toDisplayString, A as createTextVNode, J as IconRefresh, b4 as IconDocumentText, b5 as IconFolder, I as IconKey, ah as IconCloud, ao as IconChevronDown, m as withModifiers, K as Fragment, L as renderList, aD as normalizeStyle, aE as withCtx, aF as Transition, b6 as IconChartBar, M as createBlock, b7 as IconDelete, b8 as IconDocument, b9 as IconServerStack, ba as IconCircleStack, bb as IconClock } from "./index-BQxzU9F1.js";
import { C as Chart, a as CategoryScale, L as LinearScale, P as PointElement, b as LineElement, B as BarElement, p as plugin_title, c as plugin_tooltip, d as plugin_legend, e as Bar, f as Line } from "./index-Dd8qcdTI.js";
import { u as useAdminSystemService } from "./systemService-BJc_isGU.js";
import { u as useStorageTypePresentation } from "./useStorageTypePresentation-C9r7i_aK.js";
import { g as getUserLocale, f as formatCurrentTime } from "./timeUtils-D81jJILb.js";
import "./storageConfigsStore-DUFoycii.js";
function useDashboardService() {
  const getDashboardStats = async () => {
    const resp = await api.admin.getDashboardStats();
    if (!resp) {
      throw new Error("获取仪表盘统计数据失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "获取仪表盘统计数据失败");
      }
      return resp.data ?? {};
    }
    return resp;
  };
  const getStorageUsageReport = async () => {
    const resp = await api.admin.getStorageUsageReport();
    if (!resp) {
      throw new Error("获取存储用量报告失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "获取存储用量报告失败");
      }
      return resp.data ?? {};
    }
    return resp;
  };
  const refreshStorageUsageSnapshots = async (options = {}) => {
    const resp = await api.admin.refreshStorageUsageSnapshots(options);
    if (!resp) {
      throw new Error("刷新存储用量快照失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "刷新存储用量快照失败");
      }
      return resp.data ?? {};
    }
    return resp;
  };
  return {
    getDashboardStats,
    getStorageUsageReport,
    refreshStorageUsageSnapshots
  };
}
const _hoisted_1 = {
  key: 0,
  class: "p-6 flex-1 flex flex-col items-center justify-center text-center"
};
const _hoisted_2 = {
  key: 1,
  class: "flex flex-col h-full w-full"
};
const _hoisted_3 = { class: "flex justify-between items-center mb-4 md:mb-6" };
const _hoisted_4 = { class: "flex items-center gap-2" };
const _hoisted_5 = ["disabled", "title"];
const _hoisted_6 = {
  key: 0,
  class: "mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200"
};
const _hoisted_7 = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" };
const _hoisted_8 = { class: "flex justify-between" };
const _hoisted_9 = { class: "flex justify-between" };
const _hoisted_10 = { class: "flex justify-between" };
const _hoisted_11 = { class: "flex justify-between" };
const _hoisted_12 = { class: "mb-6 grid grid-cols-1 lg:grid-cols-2 gap-4" };
const _hoisted_13 = { class: "flex justify-between items-center mb-2" };
const _hoisted_14 = { class: "relative" };
const _hoisted_15 = { class: "py-1" };
const _hoisted_16 = ["onClick"];
const _hoisted_17 = { class: "flex justify-between items-center mb-1.5" };
const _hoisted_18 = { class: "flex flex-wrap items-center gap-2 mb-2" };
const _hoisted_19 = ["title"];
const _hoisted_20 = {
  key: 2,
  class: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
};
const _hoisted_21 = {
  key: 0,
  class: "mb-2"
};
const _hoisted_22 = { key: 0 };
const _hoisted_23 = ["onClick", "title"];
const _hoisted_24 = { class: "py-1" };
const _hoisted_25 = ["title"];
const _hoisted_26 = {
  key: 0,
  class: "relative"
};
const _hoisted_27 = ["title"];
const _hoisted_28 = { class: "py-1" };
const _hoisted_29 = ["title"];
const _hoisted_30 = {
  key: 1,
  class: "relative"
};
const _hoisted_31 = ["title"];
const _hoisted_32 = { class: "py-1" };
const _hoisted_33 = ["title"];
const _hoisted_34 = {
  key: 0,
  class: "text-center py-4"
};
const _hoisted_35 = { key: 1 };
const _hoisted_36 = ["title"];
const _hoisted_37 = {
  role: "list",
  class: "mt-4 flex flex-wrap gap-x-6 gap-y-3"
};
const _hoisted_38 = { class: "mb-6" };
const _hoisted_39 = { class: "flex justify-between items-center" };
const _hoisted_40 = { class: "flex items-center mb-2" };
const _hoisted_41 = {
  key: 1,
  class: "text-sm text-red-500"
};
const _hoisted_42 = { class: "flex items-center gap-2" };
const _hoisted_43 = ["disabled", "title"];
const _hoisted_44 = {
  key: 0,
  class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
};
const _hoisted_45 = {
  key: 1,
  class: "text-center py-4"
};
const _hoisted_46 = { class: "text-red-500" };
const _hoisted_47 = { class: "mb-5" };
const _hoisted_48 = { class: "flex items-center justify-between mb-3" };
const _hoisted_49 = { class: "flex items-center space-x-2" };
const _hoisted_50 = { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4" };
const _hoisted_51 = { class: "flex items-center" };
const _hoisted_52 = { class: "flex items-center" };
const _hoisted_53 = { class: "flex items-center" };
const _hoisted_54 = { class: "flex items-center" };
const _hoisted_55 = { class: "h-60 sm:h-68 md:h-72" };
const _hoisted_56 = { class: "flex flex-col sm:flex-row gap-4" };
const _hoisted_57 = { class: "flex items-center mb-2" };
const _hoisted_58 = {
  key: 1,
  class: "text-sm ml-8 text-red-500"
};
const _hoisted_59 = { class: "flex items-center mb-2" };
const _hoisted_60 = {
  key: 1,
  class: "text-sm ml-8 text-red-500"
};
const _hoisted_61 = { class: "flex items-center mb-2" };
const _hoisted_62 = {
  key: 1,
  class: "text-sm ml-8 text-red-500"
};
const _hoisted_63 = { class: "flex items-center mb-2" };
const _sfc_main = {
  __name: "DashboardView",
  props: {
    permissions: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, plugin_title, plugin_tooltip, plugin_legend);
    const props = __props;
    const { isDarkMode: darkMode } = useThemeMode();
    const { t } = useI18n();
    const log = createLogger("DashboardView");
    const { getCacheStats, getVersionInfo, clearCache } = useAdminSystemService();
    const { getDashboardStats, getStorageUsageReport, refreshStorageUsageSnapshots } = useDashboardService();
    const { getTypeLabel, ensureLoaded: ensureStorageTypesLoaded } = useStorageTypePresentation();
    const statsData = ref({
      totalPastes: 0,
      totalFiles: 0,
      totalApiKeys: 0,
      totalStorageConfigs: 0,
      totalStorageUsed: 0,
      storages: [],
      lastWeekPastes: [],
      lastWeekFiles: []
    });
    const cacheStats = ref({
      directory: {
        cacheSize: 0,
        hitRate: 0
      },
      url: {
        cacheSize: 0,
        hitRate: 0
      },
      search: {
        cacheSize: 0,
        hitRate: 0
      },
      error: null
    });
    const isCacheExpanded = ref(false);
    const isClearingCache = ref(false);
    const versionInfo = ref({
      version: "加载中...",
      environment: "加载中...",
      storage: "加载中...",
      uptime: 0,
      error: null
    });
    const selectedStorageId = ref(null);
    const storageUsageReport = ref({
      storages: [],
      generatedAt: null
    });
    const isRefreshingStorage = ref(false);
    const expandedSourceTag = ref(null);
    const sourcePopoverRef = ref(null);
    onClickOutside(sourcePopoverRef, () => {
      expandedSourceTag.value = null;
    });
    const toggleSourcePopover = (source) => {
      if (expandedSourceTag.value === source) {
        expandedSourceTag.value = null;
      } else {
        expandedSourceTag.value = source;
      }
    };
    const getStorageListBySource = (source) => {
      if (!aggregateStorageStats.value) return [];
      if (source === "unlimited") {
        return aggregateStorageStats.value.unlimitedStorages || [];
      }
      if (source === "exceeded") {
        return aggregateStorageStats.value.exceededStorages || [];
      }
      return aggregateStorageStats.value.sourceStorages?.[source] || [];
    };
    const STORAGE_TYPE_COLORS = {
      LOCAL: { bg: "bg-blue-500", text: "text-blue-500" },
      S3: { bg: "bg-orange-500", text: "text-orange-500" },
      WEBDAV: { bg: "bg-green-500", text: "text-green-500" },
      ONEDRIVE: { bg: "bg-sky-500", text: "text-sky-500" },
      GOOGLE_DRIVE: { bg: "bg-yellow-500", text: "text-yellow-500" },
      TELEGRAM: { bg: "bg-cyan-500", text: "text-cyan-500" },
      DISCORD: { bg: "bg-indigo-500", text: "text-indigo-500" },
      GITHUB_RELEASES: { bg: "bg-slate-400", text: "text-slate-400" },
      GITHUB_API: { bg: "bg-zinc-400", text: "text-zinc-400" },
      HUGGINGFACE_DATASETS: { bg: "bg-amber-500", text: "text-amber-500" },
      MIRROR: { bg: "bg-purple-500", text: "text-purple-500" }
    };
    const isLoading = ref(true);
    const error = ref(null);
    const chartType = ref("bar");
    const dateLabels = computed(() => {
      const dates = [];
      for (let i = 6; i >= 0; i--) {
        const date = /* @__PURE__ */ new Date();
        date.setDate(date.getDate() - i);
        const locale = getUserLocale();
        dates.push(new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }).format(date));
      }
      return dates;
    });
    const chartData = computed(() => {
      return {
        labels: dateLabels.value,
        datasets: [
          {
            label: t("admin.dashboard.totalPastes"),
            backgroundColor: props.darkMode ? "rgba(59, 130, 246, 0.7)" : "rgba(37, 99, 235, 0.7)",
            borderColor: props.darkMode ? "rgba(59, 130, 246, 1)" : "rgba(37, 99, 235, 1)",
            borderWidth: 1,
            data: statsData.value.lastWeekPastes,
            borderRadius: 4
          },
          {
            label: t("admin.dashboard.totalFiles"),
            backgroundColor: props.darkMode ? "rgba(16, 185, 129, 0.7)" : "rgba(5, 150, 105, 0.7)",
            borderColor: props.darkMode ? "rgba(16, 185, 129, 1)" : "rgba(5, 150, 105, 1)",
            borderWidth: 1,
            data: statsData.value.lastWeekFiles,
            borderRadius: 4
          }
        ]
      };
    });
    const chartOptions = computed(() => {
      return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false
        },
        scales: {
          x: {
            grid: {
              color: props.darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              color: props.darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: props.darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              precision: 0,
              color: props.darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"
            }
          }
        },
        plugins: {
          tooltip: {
            backgroundColor: props.darkMode ? "rgba(17, 24, 39, 0.9)" : "rgba(255, 255, 255, 0.9)",
            titleColor: props.darkMode ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)",
            bodyColor: props.darkMode ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)",
            borderColor: props.darkMode ? "rgba(55, 65, 81, 1)" : "rgba(229, 231, 235, 1)",
            borderWidth: 1,
            padding: 10,
            boxPadding: 5,
            callbacks: {
              title: function(tooltipItems) {
                const date = tooltipItems[0].label;
                return date;
              },
              label: function(context) {
                const label = context.dataset.label || "";
                const value = context.parsed.y;
                return `${label}: ${value} ${t("admin.dashboard.items")}`;
              },
              footer: function(tooltipItems) {
                const dataIndex = tooltipItems[0].dataIndex;
                const totalThisDay = statsData.value.lastWeekPastes[dataIndex] + statsData.value.lastWeekFiles[dataIndex];
                return `${t("admin.dashboard.activityOverview")}: ${totalThisDay} ${t("admin.dashboard.items")}`;
              }
            }
          },
          legend: {
            labels: {
              color: props.darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
              boxWidth: 12,
              padding: 15
            },
            position: "top"
          }
        }
      };
    });
    const currentBucketData = computed(() => {
      const storages = storageUsageReport.value.storages || [];
      if (!selectedStorageId.value) {
        const totalUsed2 = storages.reduce((sum, s) => sum + (s.computedUsage?.usedBytes || 0), 0);
        const totalLimit2 = storages.reduce((sum, s) => sum + (s.limitStatus?.limitBytes || s.configuredLimitBytes || 0), 0);
        const usagePercent2 = totalLimit2 > 0 ? Math.min(100, Math.round(totalUsed2 / totalLimit2 * 100)) : 0;
        return {
          isAggregate: true,
          name: t("admin.dashboard.allStorages"),
          usedStorage: totalUsed2,
          totalStorage: totalLimit2,
          usagePercent: usagePercent2,
          source: null,
          snapshotAt: null,
          providerQuota: null,
          storageType: null,
          enableDiskUsage: null
        };
      }
      const storage = storages.find((s) => s.id === selectedStorageId.value);
      if (storage) {
        const usedBytes = storage.computedUsage?.usedBytes || 0;
        const limitBytes = storage.limitStatus?.limitBytes || storage.configuredLimitBytes || 0;
        const usagePercent2 = storage.limitStatus?.percentUsed || (limitBytes > 0 ? Math.min(100, Math.round(usedBytes / limitBytes * 100)) : 0);
        return {
          isAggregate: false,
          name: storage.name,
          usedStorage: usedBytes,
          totalStorage: limitBytes,
          usagePercent: usagePercent2,
          source: storage.computedUsage?.source || null,
          snapshotAt: storage.computedUsage?.snapshotAt || null,
          providerQuota: storage.computedUsage?.source === "provider" ? storage.computedUsage?.details?.quota || null : null,
          storageType: storage.storageType || null,
          enableDiskUsage: storage.enableDiskUsage ?? null,
          exceeded: storage.limitStatus?.exceeded || false,
          configuredLimitBytes: storage.configuredLimitBytes
        };
      }
      const totalUsed = storages.reduce((sum, s) => sum + (s.computedUsage?.usedBytes || 0), 0);
      const totalLimit = storages.reduce((sum, s) => sum + (s.limitStatus?.limitBytes || s.configuredLimitBytes || 0), 0);
      const usagePercent = totalLimit > 0 ? Math.min(100, Math.round(totalUsed / totalLimit * 100)) : 0;
      return {
        isAggregate: true,
        name: t("admin.dashboard.allStorages"),
        usedStorage: totalUsed,
        totalStorage: totalLimit,
        usagePercent,
        source: null,
        snapshotAt: null,
        providerQuota: null,
        storageType: null,
        enableDiskUsage: null
      };
    });
    const getSourceInfo = (source) => {
      const sourceMap = {
        provider: {
          label: t("admin.dashboard.sourceLabels.provider"),
          color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
          description: t("admin.dashboard.sourceDescriptions.provider")
        },
        local_fs: {
          label: t("admin.dashboard.sourceLabels.localFs"),
          color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
          description: t("admin.dashboard.sourceDescriptions.localFs")
        },
        vfs_nodes: {
          label: t("admin.dashboard.sourceLabels.vfsNodes"),
          color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
          description: t("admin.dashboard.sourceDescriptions.vfsNodes")
        },
        fs_index: {
          label: t("admin.dashboard.sourceLabels.fsIndex"),
          color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
          description: t("admin.dashboard.sourceDescriptions.fsIndex")
        }
      };
      return sourceMap[source] || {
        label: source || t("admin.dashboard.sourceLabels.unknown"),
        color: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
        description: ""
      };
    };
    const formatSnapshotTime = (isoString) => {
      if (!isoString) return null;
      try {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat(getUserLocale(), {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }).format(date);
      } catch {
        return null;
      }
    };
    const aggregateStorageStats = computed(() => {
      const storages = storageUsageReport.value.storages || [];
      if (storages.length === 0) return null;
      const sourceCount = {};
      const sourceStorages = {};
      let latestSnapshotAt = null;
      let exceededCount = 0;
      let unlimitedCount = 0;
      const exceededStorages = [];
      const unlimitedStorages = [];
      storages.forEach((s) => {
        const source = s.computedUsage?.source || "unknown";
        sourceCount[source] = (sourceCount[source] || 0) + 1;
        if (!sourceStorages[source]) {
          sourceStorages[source] = [];
        }
        sourceStorages[source].push({
          id: s.id,
          name: s.name,
          storageType: s.storageType
        });
        const snapshotAt = s.computedUsage?.snapshotAt;
        if (snapshotAt) {
          if (!latestSnapshotAt || new Date(snapshotAt) > new Date(latestSnapshotAt)) {
            latestSnapshotAt = snapshotAt;
          }
        }
        if (s.limitStatus?.exceeded) {
          exceededCount++;
          exceededStorages.push({ id: s.id, name: s.name, storageType: s.storageType });
        }
        if (!s.configuredLimitBytes || s.configuredLimitBytes === 0) {
          unlimitedCount++;
          unlimitedStorages.push({ id: s.id, name: s.name, storageType: s.storageType });
        }
      });
      return {
        totalCount: storages.length,
        sourceCount,
        sourceStorages,
        latestSnapshotAt,
        exceededCount,
        exceededStorages,
        unlimitedCount,
        unlimitedStorages
      };
    });
    const storageTypeDistribution = computed(() => {
      const storages = storageUsageReport.value.storages || [];
      if (storages.length === 0) return [];
      const typeMap = /* @__PURE__ */ new Map();
      storages.forEach((s) => {
        const type = s.storageType || "UNKNOWN";
        if (!typeMap.has(type)) {
          typeMap.set(type, { type, count: 0 });
        }
        typeMap.get(type).count++;
      });
      const total = storages.length;
      const result = Array.from(typeMap.values()).map((item) => ({
        ...item,
        percent: Math.round(item.count / total * 100),
        color: STORAGE_TYPE_COLORS[item.type] || { bg: "bg-gray-500", text: "text-gray-500" }
      })).sort((a, b) => b.count - a.count);
      return result;
    });
    const categoryBarSegments = computed(() => {
      return storageTypeDistribution.value.map((item) => ({
        percent: item.percent,
        color: item.color.bg,
        type: item.type,
        count: item.count,
        // tooltip 显示：类型名称 - 数量 (百分比)
        tooltip: `${getStorageTypeName(item.type)}: ${item.count}${t("admin.dashboard.configs")} (${item.percent}%)`
      }));
    });
    const getStorageTypeName = (type) => {
      return getTypeLabel(type, t) || type;
    };
    const formatBytes = (bytes, decimals = 2) => {
      if (bytes === 0) return `0 ${t("admin.dashboard.storageUnits.bytes")}`;
      const k = 1024;
      const sizeKeys = ["bytes", "kb", "mb", "gb", "tb"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const sizeKey = sizeKeys[i] || "bytes";
      const sizeUnit = t(`admin.dashboard.storageUnits.${sizeKey}`);
      return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizeUnit;
    };
    const selectStorage = (storageId) => {
      selectedStorageId.value = storageId;
    };
    const toggleChartType = () => {
      chartType.value = chartType.value === "bar" ? "line" : "bar";
    };
    const totalWeekPastes = computed(() => {
      return statsData.value.lastWeekPastes.reduce((sum, current) => sum + current, 0);
    });
    const totalWeekFiles = computed(() => {
      return statsData.value.lastWeekFiles.reduce((sum, current) => sum + current, 0);
    });
    const weeklyMaxValues = computed(() => {
      const combinedData = [];
      for (let i = 0; i < 7; i++) {
        combinedData.push(statsData.value.lastWeekPastes[i] + statsData.value.lastWeekFiles[i]);
      }
      return {
        maxDay: combinedData.indexOf(Math.max(...combinedData)),
        maxValue: Math.max(...combinedData)
      };
    });
    const fetchCacheStats = async () => {
      try {
        const data = await getCacheStats();
        cacheStats.value = {
          directory: {
            cacheSize: data.cache?.directory?.cacheSize || 0,
            hitRate: data.cache?.directory?.hitRate || 0
          },
          url: {
            cacheSize: data.cache?.url?.cacheSize || 0,
            hitRate: data.cache?.url?.hitRate || 0
          },
          search: {
            cacheSize: data.cache?.search?.cacheSize || 0,
            hitRate: data.cache?.search?.hitRate || 0
          },
          error: null
        };
      } catch (err) {
        log.warn("获取缓存统计失败:", err);
        cacheStats.value.error = "获取缓存数据失败";
      }
    };
    const fetchVersionInfo = async () => {
      try {
        const data = await getVersionInfo();
        versionInfo.value = {
          version: data.version || "1.0.0",
          environment: data.environment || "Docker",
          storage: data.storage || "SQLite",
          uptime: data.uptime || 0,
          error: null
        };
      } catch (err) {
        log.warn("获取版本信息失败:", err);
        versionInfo.value.error = "获取版本信息失败";
      }
    };
    const clearAllCache = async () => {
      if (isClearingCache.value) return;
      isClearingCache.value = true;
      try {
        const result = await clearCache();
        const clearedCount = typeof result?.clearedCount === "number" ? result.clearedCount : 0;
        await fetchCacheStats();
      } catch (err) {
        log.error("清理缓存失败:", err);
      } finally {
        isClearingCache.value = false;
      }
    };
    const fetchStorageUsageReport = async () => {
      try {
        const data = await getStorageUsageReport();
        storageUsageReport.value = {
          storages: Array.isArray(data.storages) ? data.storages : [],
          generatedAt: data.generatedAt || null
        };
      } catch (err) {
        log.warn("获取存储用量报告失败:", err);
      }
    };
    const handleRefreshStorageSnapshots = async () => {
      if (isRefreshingStorage.value) return;
      isRefreshingStorage.value = true;
      try {
        await refreshStorageUsageSnapshots({ maxItems: 50 });
        await fetchStorageUsageReport();
      } catch (err) {
        log.error("刷新存储用量快照失败:", err);
      } finally {
        isRefreshingStorage.value = false;
      }
    };
    const fetchDashboardStats = async () => {
      isLoading.value = true;
      error.value = null;
      try {
        await ensureStorageTypesLoaded().catch(() => null);
        const normalizeDashboardData = (raw) => {
          const data = raw || {};
          const storages = Array.isArray(data.storages) ? data.storages : [];
          return {
            totalPastes: Number.isFinite(data.totalPastes) ? data.totalPastes : 0,
            totalFiles: Number.isFinite(data.totalFiles) ? data.totalFiles : 0,
            totalApiKeys: Number.isFinite(data.totalApiKeys) ? data.totalApiKeys : 0,
            totalStorageConfigs: Number.isFinite(data.totalStorageConfigs) ? data.totalStorageConfigs : 0,
            totalStorageUsed: Number.isFinite(data.totalStorageUsed) ? data.totalStorageUsed : 0,
            storages,
            lastWeekPastes: Array.isArray(data.lastWeekPastes) ? data.lastWeekPastes : [],
            lastWeekFiles: Array.isArray(data.lastWeekFiles) ? data.lastWeekFiles : []
          };
        };
        const [dashboardData] = await Promise.all([
          getDashboardStats(),
          fetchStorageUsageReport(),
          // 存储用量报告（独立接口）
          fetchCacheStats(),
          // 缓存统计失败不影响主要数据
          fetchVersionInfo()
          // 版本信息失败不影响主要数据
        ]);
        statsData.value = normalizeDashboardData(dashboardData || {});
        selectedStorageId.value = null;
      } catch (err) {
        log.error("获取控制面板数据失败:", err);
        error.value = t("admin.dashboard.fetchError");
      } finally {
        isLoading.value = false;
      }
    };
    watch(
      () => props.darkMode,
      () => {
        chartData.value;
        chartOptions.value;
      }
    );
    const handleLanguageChange = () => {
    };
    onMounted(() => {
      fetchDashboardStats();
    });
    useEventListener(window, "languageChanged", handleLanguageChange);
    return (_ctx, _cache) => {
      return !__props.permissions.isAdmin ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(unref(IconLockClosed), {
          class: normalizeClass(["h-16 w-16 mb-4", unref(darkMode) ? "text-gray-600" : "text-gray-400"])
        }, null, 8, ["class"]),
        createBaseVNode("h3", {
          class: normalizeClass(["text-xl font-semibold mb-2", unref(darkMode) ? "text-white" : "text-gray-800"])
        }, "权限不足", 2),
        createBaseVNode("p", {
          class: normalizeClass(["text-base mb-4", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
        }, "您没有访问此页面的权限", 2)
      ])) : (openBlock(), createElementBlock("div", _hoisted_2, [
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("h2", {
            class: normalizeClass(["text-xl font-bold", unref(darkMode) ? "text-white" : "text-gray-800"])
          }, toDisplayString(unref(t)("admin.dashboard.systemOverview")), 3),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("button", {
              onClick: handleRefreshStorageSnapshots,
              disabled: isRefreshingStorage.value,
              class: normalizeClass(["flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors", [
                unref(darkMode) ? "bg-primary-600 text-white hover:bg-primary-500 disabled:bg-gray-600 disabled:text-gray-400" : "bg-primary-500 text-white hover:bg-primary-600 disabled:bg-gray-300 disabled:text-gray-500"
              ]]),
              title: unref(t)("admin.dashboard.refreshStorageTooltip")
            }, [
              createVNode(unref(IconRefresh), {
                class: normalizeClass(["w-4 h-4 mr-1.5", isRefreshingStorage.value ? "animate-spin" : ""])
              }, null, 8, ["class"]),
              createTextVNode(" " + toDisplayString(isRefreshingStorage.value ? unref(t)("admin.dashboard.refreshingStorage") : unref(t)("admin.dashboard.refreshStorage")), 1)
            ], 10, _hoisted_5),
            createBaseVNode("button", {
              onClick: fetchDashboardStats,
              class: normalizeClass(["flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors", [unref(darkMode) ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"]])
            }, [
              createVNode(unref(IconRefresh), {
                class: normalizeClass(["w-4 h-4 mr-1.5", isLoading.value ? "animate-spin" : ""])
              }, null, 8, ["class"]),
              createTextVNode(" " + toDisplayString(isLoading.value ? unref(t)("admin.dashboard.refreshing") : unref(t)("admin.dashboard.refresh")), 1)
            ], 2)
          ])
        ]),
        error.value ? (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_7, [
          createBaseVNode("div", {
            class: normalizeClass(["p-4 rounded-lg shadow transition-shadow hover:shadow-md", unref(darkMode) ? "bg-gray-700" : "bg-white"])
          }, [
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("div", null, [
                createBaseVNode("p", {
                  class: normalizeClass(["text-sm font-medium", unref(darkMode) ? "text-gray-300" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.dashboard.totalPastes")), 3),
                createBaseVNode("p", {
                  class: normalizeClass(["mt-1 text-2xl font-semibold", unref(darkMode) ? "text-white" : "text-gray-800"])
                }, toDisplayString(statsData.value.totalPastes), 3)
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["h-12 w-12 rounded-lg flex items-center justify-center", unref(darkMode) ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"])
              }, [
                createVNode(unref(IconDocumentText), { class: "h-6 w-6" })
              ], 2)
            ])
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass(["p-4 rounded-lg shadow transition-shadow hover:shadow-md", unref(darkMode) ? "bg-gray-700" : "bg-white"])
          }, [
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("div", null, [
                createBaseVNode("p", {
                  class: normalizeClass(["text-sm font-medium", unref(darkMode) ? "text-gray-300" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.dashboard.totalFiles")), 3),
                createBaseVNode("p", {
                  class: normalizeClass(["mt-1 text-2xl font-semibold", unref(darkMode) ? "text-white" : "text-gray-800"])
                }, toDisplayString(statsData.value.totalFiles), 3)
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["h-12 w-12 rounded-lg flex items-center justify-center", unref(darkMode) ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-600"])
              }, [
                createVNode(unref(IconFolder), { class: "h-6 w-6" })
              ], 2)
            ])
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass(["p-4 rounded-lg shadow transition-shadow hover:shadow-md", unref(darkMode) ? "bg-gray-700" : "bg-white"])
          }, [
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("div", null, [
                createBaseVNode("p", {
                  class: normalizeClass(["text-sm font-medium", unref(darkMode) ? "text-gray-300" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.dashboard.totalApiKeys")), 3),
                createBaseVNode("p", {
                  class: normalizeClass(["mt-1 text-2xl font-semibold", unref(darkMode) ? "text-white" : "text-gray-800"])
                }, toDisplayString(statsData.value.totalApiKeys), 3)
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["h-12 w-12 rounded-lg flex items-center justify-center", unref(darkMode) ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-600"])
              }, [
                createVNode(unref(IconKey), { class: "h-6 w-6" })
              ], 2)
            ])
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass(["p-4 rounded-lg shadow transition-shadow hover:shadow-md", unref(darkMode) ? "bg-gray-700" : "bg-white"])
          }, [
            createBaseVNode("div", _hoisted_11, [
              createBaseVNode("div", null, [
                createBaseVNode("p", {
                  class: normalizeClass(["text-sm font-medium", unref(darkMode) ? "text-gray-300" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.dashboard.totalStorageConfigs")), 3),
                createBaseVNode("p", {
                  class: normalizeClass(["mt-1 text-2xl font-semibold", unref(darkMode) ? "text-white" : "text-gray-800"])
                }, toDisplayString(statsData.value.totalStorageConfigs), 3)
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["h-12 w-12 rounded-lg flex items-center justify-center", unref(darkMode) ? "bg-orange-500/20 text-orange-400" : "bg-orange-100 text-orange-600"])
              }, [
                createVNode(unref(IconCloud), { class: "h-6 w-6" })
              ], 2)
            ])
          ], 2)
        ]),
        createBaseVNode("div", _hoisted_12, [
          createBaseVNode("div", {
            class: normalizeClass(["p-4 rounded-lg shadow transition-shadow hover:shadow-md", unref(darkMode) ? "bg-gray-700" : "bg-white"])
          }, [
            createBaseVNode("div", _hoisted_13, [
              createBaseVNode("h3", {
                class: normalizeClass(["text-lg font-semibold", unref(darkMode) ? "text-white" : "text-gray-800"])
              }, toDisplayString(unref(t)("admin.dashboard.storageUsage")), 3),
              createBaseVNode("div", _hoisted_14, [
                createBaseVNode("button", {
                  onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$refs.bucketDropdown.classList.toggle("hidden")),
                  class: normalizeClass(["px-2 py-1 text-xs rounded flex items-center", unref(darkMode) ? "bg-gray-600 text-gray-200 hover:bg-gray-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300"])
                }, [
                  createBaseVNode("span", null, toDisplayString(currentBucketData.value.name), 1),
                  createVNode(unref(IconChevronDown), { class: "h-3 w-3 ml-1" })
                ], 2),
                createBaseVNode("div", {
                  ref: "bucketDropdown",
                  class: normalizeClass(["hidden absolute right-0 mt-1 w-40 rounded-md shadow-lg z-10", unref(darkMode) ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"])
                }, [
                  createBaseVNode("div", _hoisted_15, [
                    createBaseVNode("a", {
                      href: "#",
                      onClick: _cache[1] || (_cache[1] = withModifiers(($event) => selectStorage(null), ["prevent"])),
                      class: normalizeClass(["block px-4 py-2 text-xs", [
                        !selectedStorageId.value ? unref(darkMode) ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900" : "",
                        unref(darkMode) ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      ]])
                    }, toDisplayString(unref(t)("admin.dashboard.allStorages")), 3),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(storageUsageReport.value.storages, (storage) => {
                      return openBlock(), createElementBlock("a", {
                        key: storage.id,
                        href: "#",
                        onClick: withModifiers(($event) => selectStorage(storage.id), ["prevent"]),
                        class: normalizeClass(["block px-4 py-2 text-xs", [
                          selectedStorageId.value === storage.id ? unref(darkMode) ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900" : "",
                          unref(darkMode) ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        ]])
                      }, toDisplayString(storage.name), 11, _hoisted_16);
                    }), 128))
                  ])
                ], 2)
              ])
            ]),
            createBaseVNode("div", _hoisted_17, [
              createBaseVNode("span", {
                class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-300" : "text-gray-500"])
              }, toDisplayString(formatBytes(currentBucketData.value.usedStorage)) + " / " + toDisplayString(currentBucketData.value.totalStorage > 0 ? formatBytes(currentBucketData.value.totalStorage) : unref(t)("admin.dashboard.unlimited")), 3),
              currentBucketData.value.totalStorage > 0 ? (openBlock(), createElementBlock("span", {
                key: 0,
                class: normalizeClass(["text-sm font-medium", [
                  currentBucketData.value.exceeded ? "text-red-500" : currentBucketData.value.usagePercent > 80 ? unref(darkMode) ? "text-red-400" : "text-red-600" : unref(darkMode) ? "text-blue-300" : "text-blue-600"
                ]])
              }, toDisplayString(currentBucketData.value.usagePercent) + "% ", 3)) : (openBlock(), createElementBlock("span", {
                key: 1,
                class: normalizeClass(["text-sm font-medium", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
              }, toDisplayString(unref(t)("admin.dashboard.unlimited")), 3))
            ]),
            currentBucketData.value.totalStorage > 0 ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["w-full bg-gray-200 rounded-full h-2.5", unref(darkMode) ? "bg-gray-600" : "bg-gray-200"])
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["h-2.5 rounded-full transition-all duration-500", [
                  currentBucketData.value.exceeded ? "bg-red-600" : currentBucketData.value.usagePercent > 80 ? "bg-red-500" : currentBucketData.value.usagePercent > 60 ? "bg-orange-500" : "bg-primary-500"
                ]]),
                style: normalizeStyle({ width: `${Math.min(currentBucketData.value.usagePercent, 100)}%` })
              }, null, 6)
            ], 2)) : createCommentVNode("", true),
            !currentBucketData.value.isAggregate ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(["mt-3 pt-3 border-t", unref(darkMode) ? "border-gray-600" : "border-gray-200"])
            }, [
              createBaseVNode("div", _hoisted_18, [
                currentBucketData.value.storageType ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", STORAGE_TYPE_COLORS[currentBucketData.value.storageType]?.bg || "bg-gray-500"]),
                  style: { "color": "white" }
                }, toDisplayString(getStorageTypeName(currentBucketData.value.storageType)), 3)) : createCommentVNode("", true),
                currentBucketData.value.source ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", getSourceInfo(currentBucketData.value.source).color]),
                  title: getSourceInfo(currentBucketData.value.source).description
                }, toDisplayString(getSourceInfo(currentBucketData.value.source).label), 11, _hoisted_19)) : createCommentVNode("", true),
                currentBucketData.value.exceeded ? (openBlock(), createElementBlock("span", _hoisted_20, toDisplayString(unref(t)("admin.dashboard.exceeded")), 1)) : createCommentVNode("", true)
              ]),
              currentBucketData.value.source === "provider" && currentBucketData.value.providerQuota ? (openBlock(), createElementBlock("div", _hoisted_21, [
                createBaseVNode("p", {
                  class: normalizeClass(["text-xs font-medium mb-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.dashboard.providerQuota")), 3),
                createBaseVNode("div", {
                  class: normalizeClass(["flex items-center gap-3 text-xs", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                }, [
                  createBaseVNode("span", null, toDisplayString(unref(t)("admin.dashboard.total")) + ": " + toDisplayString(formatBytes(currentBucketData.value.providerQuota.totalBytes)), 1),
                  createBaseVNode("span", null, toDisplayString(unref(t)("admin.dashboard.used")) + ": " + toDisplayString(formatBytes(currentBucketData.value.providerQuota.usedBytes)), 1),
                  currentBucketData.value.providerQuota.percentUsed !== void 0 && currentBucketData.value.providerQuota.percentUsed !== null ? (openBlock(), createElementBlock("span", _hoisted_22, " (" + toDisplayString(currentBucketData.value.providerQuota.percentUsed) + "%) ", 1)) : createCommentVNode("", true)
                ], 2)
              ])) : createCommentVNode("", true),
              currentBucketData.value.snapshotAt ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-500" : "text-gray-400"])
              }, toDisplayString(unref(t)("admin.dashboard.snapshotTime")) + ": " + toDisplayString(formatSnapshotTime(currentBucketData.value.snapshotAt)), 3)) : createCommentVNode("", true)
            ], 2)) : createCommentVNode("", true),
            currentBucketData.value.isAggregate && aggregateStorageStats.value ? (openBlock(), createElementBlock("div", {
              key: 2,
              class: normalizeClass(["mt-3 pt-3 border-t", unref(darkMode) ? "border-gray-600" : "border-gray-200"])
            }, [
              createBaseVNode("div", {
                ref_key: "sourcePopoverRef",
                ref: sourcePopoverRef,
                class: "flex flex-wrap items-center gap-2 text-xs"
              }, [
                createBaseVNode("span", {
                  class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded font-medium", unref(darkMode) ? "bg-gray-600 text-gray-200" : "bg-gray-100 text-gray-700"])
                }, toDisplayString(aggregateStorageStats.value.totalCount) + toDisplayString(unref(t)("admin.dashboard.configs")), 3),
                (openBlock(true), createElementBlock(Fragment, null, renderList(aggregateStorageStats.value.sourceCount, (count, source) => {
                  return openBlock(), createElementBlock("div", {
                    key: source,
                    class: "relative"
                  }, [
                    createBaseVNode("button", {
                      onClick: ($event) => toggleSourcePopover(source),
                      class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded font-medium cursor-pointer transition-all hover:opacity-80", getSourceInfo(source).color]),
                      title: unref(t)("admin.dashboard.clickToViewList")
                    }, [
                      createTextVNode(toDisplayString(getSourceInfo(source).label) + ": " + toDisplayString(count) + " ", 1),
                      createVNode(unref(IconChevronDown), {
                        class: normalizeClass(["w-3 h-3 ml-0.5 transition-transform duration-200", expandedSourceTag.value === source ? "rotate-180" : ""])
                      }, null, 8, ["class"])
                    ], 10, _hoisted_23),
                    createVNode(Transition, { name: "popover-fade" }, {
                      default: withCtx(() => [
                        expandedSourceTag.value === source ? (openBlock(), createElementBlock("div", {
                          key: 0,
                          class: normalizeClass(["absolute left-0 top-full mt-1 z-20 min-w-[160px] max-w-[240px] max-h-[200px] overflow-y-auto rounded-md shadow-lg border", unref(darkMode) ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"])
                        }, [
                          createBaseVNode("div", _hoisted_24, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(getStorageListBySource(source), (storage) => {
                              return openBlock(), createElementBlock("div", {
                                key: storage.id,
                                class: normalizeClass(["px-3 py-1.5 flex items-center gap-2 text-xs", unref(darkMode) ? "hover:bg-gray-700" : "hover:bg-gray-50"])
                              }, [
                                createBaseVNode("span", {
                                  class: normalizeClass(["w-2 h-2 rounded-sm shrink-0", STORAGE_TYPE_COLORS[storage.storageType]?.bg || "bg-gray-400"])
                                }, null, 2),
                                createBaseVNode("span", {
                                  class: normalizeClass(["truncate", unref(darkMode) ? "text-gray-200" : "text-gray-700"]),
                                  title: storage.name
                                }, toDisplayString(storage.name), 11, _hoisted_25)
                              ], 2);
                            }), 128))
                          ]),
                          createBaseVNode("div", {
                            class: normalizeClass(["px-3 py-1.5 border-t text-xs", unref(darkMode) ? "border-gray-600 text-gray-400" : "border-gray-100 text-gray-500"])
                          }, toDisplayString(unref(t)("admin.dashboard.totalItems", { count })), 3)
                        ], 2)) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1024)
                  ]);
                }), 128)),
                aggregateStorageStats.value.unlimitedCount > 0 ? (openBlock(), createElementBlock("div", _hoisted_26, [
                  createBaseVNode("button", {
                    onClick: _cache[2] || (_cache[2] = ($event) => toggleSourcePopover("unlimited")),
                    class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded font-medium cursor-pointer transition-all hover:opacity-80", unref(darkMode) ? "bg-gray-600 text-gray-300" : "bg-gray-100 text-gray-600"]),
                    title: unref(t)("admin.dashboard.clickToViewList")
                  }, [
                    createTextVNode(toDisplayString(unref(t)("admin.dashboard.unlimited")) + ": " + toDisplayString(aggregateStorageStats.value.unlimitedCount) + " ", 1),
                    createVNode(unref(IconChevronDown), {
                      class: normalizeClass(["w-3 h-3 ml-0.5 transition-transform duration-200", expandedSourceTag.value === "unlimited" ? "rotate-180" : ""])
                    }, null, 8, ["class"])
                  ], 10, _hoisted_27),
                  createVNode(Transition, { name: "popover-fade" }, {
                    default: withCtx(() => [
                      expandedSourceTag.value === "unlimited" ? (openBlock(), createElementBlock("div", {
                        key: 0,
                        class: normalizeClass(["absolute left-0 top-full mt-1 z-20 min-w-[160px] max-w-[240px] max-h-[200px] overflow-y-auto rounded-md shadow-lg border", unref(darkMode) ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"])
                      }, [
                        createBaseVNode("div", _hoisted_28, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(getStorageListBySource("unlimited"), (storage) => {
                            return openBlock(), createElementBlock("div", {
                              key: storage.id,
                              class: normalizeClass(["px-3 py-1.5 flex items-center gap-2 text-xs", unref(darkMode) ? "hover:bg-gray-700" : "hover:bg-gray-50"])
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["w-2 h-2 rounded-sm shrink-0", STORAGE_TYPE_COLORS[storage.storageType]?.bg || "bg-gray-400"])
                              }, null, 2),
                              createBaseVNode("span", {
                                class: normalizeClass(["truncate", unref(darkMode) ? "text-gray-200" : "text-gray-700"]),
                                title: storage.name
                              }, toDisplayString(storage.name), 11, _hoisted_29)
                            ], 2);
                          }), 128))
                        ]),
                        createBaseVNode("div", {
                          class: normalizeClass(["px-3 py-1.5 border-t text-xs", unref(darkMode) ? "border-gray-600 text-gray-400" : "border-gray-100 text-gray-500"])
                        }, toDisplayString(unref(t)("admin.dashboard.totalItems", { count: aggregateStorageStats.value.unlimitedCount })), 3)
                      ], 2)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ])) : createCommentVNode("", true),
                aggregateStorageStats.value.exceededCount > 0 ? (openBlock(), createElementBlock("div", _hoisted_30, [
                  createBaseVNode("button", {
                    onClick: _cache[3] || (_cache[3] = ($event) => toggleSourcePopover("exceeded")),
                    class: "inline-flex items-center px-2 py-0.5 rounded font-medium cursor-pointer transition-all hover:opacity-80 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                    title: unref(t)("admin.dashboard.clickToViewList")
                  }, [
                    createTextVNode(toDisplayString(unref(t)("admin.dashboard.exceeded")) + ": " + toDisplayString(aggregateStorageStats.value.exceededCount) + " ", 1),
                    createVNode(unref(IconChevronDown), {
                      class: normalizeClass(["w-3 h-3 ml-0.5 transition-transform duration-200", expandedSourceTag.value === "exceeded" ? "rotate-180" : ""])
                    }, null, 8, ["class"])
                  ], 8, _hoisted_31),
                  createVNode(Transition, { name: "popover-fade" }, {
                    default: withCtx(() => [
                      expandedSourceTag.value === "exceeded" ? (openBlock(), createElementBlock("div", {
                        key: 0,
                        class: normalizeClass(["absolute left-0 top-full mt-1 z-20 min-w-[160px] max-w-[240px] max-h-[200px] overflow-y-auto rounded-md shadow-lg border", unref(darkMode) ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"])
                      }, [
                        createBaseVNode("div", _hoisted_32, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(getStorageListBySource("exceeded"), (storage) => {
                            return openBlock(), createElementBlock("div", {
                              key: storage.id,
                              class: normalizeClass(["px-3 py-1.5 flex items-center gap-2 text-xs", unref(darkMode) ? "hover:bg-gray-700" : "hover:bg-gray-50"])
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["w-2 h-2 rounded-sm shrink-0", STORAGE_TYPE_COLORS[storage.storageType]?.bg || "bg-gray-400"])
                              }, null, 2),
                              createBaseVNode("span", {
                                class: normalizeClass(["truncate", unref(darkMode) ? "text-gray-200" : "text-gray-700"]),
                                title: storage.name
                              }, toDisplayString(storage.name), 11, _hoisted_33)
                            ], 2);
                          }), 128))
                        ]),
                        createBaseVNode("div", {
                          class: normalizeClass(["px-3 py-1.5 border-t text-xs", unref(darkMode) ? "border-gray-600 text-gray-400" : "border-gray-100 text-gray-500"])
                        }, toDisplayString(unref(t)("admin.dashboard.totalItems", { count: aggregateStorageStats.value.exceededCount })), 3)
                      ], 2)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ])) : createCommentVNode("", true)
              ], 512),
              aggregateStorageStats.value.latestSnapshotAt ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["mt-2 text-xs", unref(darkMode) ? "text-gray-500" : "text-gray-400"])
              }, toDisplayString(unref(t)("admin.dashboard.latestSnapshot")) + ": " + toDisplayString(formatSnapshotTime(aggregateStorageStats.value.latestSnapshotAt)), 3)) : createCommentVNode("", true)
            ], 2)) : createCommentVNode("", true)
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass(["p-4 rounded-lg shadow transition-shadow hover:shadow-md", unref(darkMode) ? "bg-gray-700" : "bg-white"])
          }, [
            createBaseVNode("h3", {
              class: normalizeClass(["text-lg font-semibold mb-3", unref(darkMode) ? "text-white" : "text-gray-800"])
            }, toDisplayString(unref(t)("admin.dashboard.storageTypeDistribution")), 3),
            storageTypeDistribution.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_34, [
              createBaseVNode("p", {
                class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
              }, toDisplayString(unref(t)("admin.dashboard.noStorageConfigs")), 3)
            ])) : (openBlock(), createElementBlock("div", _hoisted_35, [
              createBaseVNode("div", {
                class: normalizeClass(["w-full h-3 rounded-full overflow-hidden flex", unref(darkMode) ? "bg-gray-600" : "bg-gray-200"])
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(categoryBarSegments.value, (segment, index) => {
                  return openBlock(), createElementBlock("div", {
                    key: index,
                    class: normalizeClass(["h-full transition-all duration-300 cursor-pointer hover:opacity-80 hover:scale-y-125", segment.color]),
                    style: normalizeStyle({ width: `${segment.percent}%` }),
                    title: segment.tooltip
                  }, null, 14, _hoisted_36);
                }), 128))
              ], 2),
              createBaseVNode("ul", _hoisted_37, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(storageTypeDistribution.value, (item) => {
                  return openBlock(), createElementBlock("li", {
                    key: item.type,
                    class: "flex items-center gap-2"
                  }, [
                    createBaseVNode("span", {
                      class: normalizeClass(["w-2.5 h-2.5 rounded-sm shrink-0", item.color.bg])
                    }, null, 2),
                    createBaseVNode("span", {
                      class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                    }, toDisplayString(getStorageTypeName(item.type)), 3),
                    createBaseVNode("span", {
                      class: normalizeClass(["text-sm font-semibold", unref(darkMode) ? "text-white" : "text-gray-800"])
                    }, toDisplayString(item.percent) + "% ", 3),
                    createBaseVNode("span", {
                      class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                    }, " (" + toDisplayString(item.count) + toDisplayString(unref(t)("admin.dashboard.configs")) + ") ", 3)
                  ]);
                }), 128))
              ])
            ]))
          ], 2)
        ]),
        createBaseVNode("div", _hoisted_38, [
          createBaseVNode("div", {
            class: normalizeClass(["p-4 rounded-lg shadow transition-shadow hover:shadow-md", unref(darkMode) ? "bg-gray-700" : "bg-white"])
          }, [
            createBaseVNode("div", _hoisted_39, [
              createBaseVNode("div", {
                class: "flex-1 cursor-pointer",
                onClick: _cache[4] || (_cache[4] = ($event) => isCacheExpanded.value = !isCacheExpanded.value)
              }, [
                createBaseVNode("div", _hoisted_40, [
                  createBaseVNode("div", {
                    class: normalizeClass(["h-10 w-10 rounded-lg flex items-center justify-center mr-3", unref(darkMode) ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-100 text-indigo-600"])
                  }, [
                    createVNode(unref(IconChartBar), { class: "h-5 w-5" })
                  ], 2),
                  createBaseVNode("div", null, [
                    createBaseVNode("p", {
                      class: normalizeClass(["text-base font-medium", unref(darkMode) ? "text-white" : "text-gray-800"])
                    }, toDisplayString(unref(t)("admin.dashboard.cacheMonitoring")), 3),
                    !isCacheExpanded.value && !cacheStats.value.error ? (openBlock(), createElementBlock("p", {
                      key: 0,
                      class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-400" : "text-gray-600"])
                    }, toDisplayString(unref(t)("admin.dashboard.directoryCache")) + ": " + toDisplayString(Math.round(cacheStats.value.directory.hitRate * 100)) + "% | " + toDisplayString(unref(t)("admin.dashboard.urlCache")) + ": " + toDisplayString(Math.round(cacheStats.value.url.hitRate * 100)) + "% | " + toDisplayString(unref(t)("admin.dashboard.searchCache")) + ": " + toDisplayString(Math.round(cacheStats.value.search.hitRate * 100)) + "% ", 3)) : !isCacheExpanded.value && cacheStats.value.error ? (openBlock(), createElementBlock("p", _hoisted_41, toDisplayString(unref(t)("admin.dashboard.cacheUnavailable")), 1)) : createCommentVNode("", true)
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_42, [
                createBaseVNode("button", {
                  onClick: withModifiers(clearAllCache, ["stop"]),
                  disabled: isClearingCache.value,
                  class: normalizeClass(["p-2 rounded-lg transition-colors", [
                    unref(darkMode) ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 disabled:bg-gray-600 disabled:text-gray-400" : "bg-red-100 text-red-600 hover:bg-red-200 disabled:bg-gray-100 disabled:text-gray-400"
                  ]]),
                  title: unref(t)("admin.dashboard.clearAllCache")
                }, [
                  !isClearingCache.value ? (openBlock(), createBlock(unref(IconDelete), {
                    key: 0,
                    class: "h-4 w-4"
                  })) : (openBlock(), createBlock(unref(IconRefresh), {
                    key: 1,
                    class: "h-4 w-4 animate-spin"
                  }))
                ], 10, _hoisted_43),
                createBaseVNode("button", {
                  onClick: _cache[5] || (_cache[5] = withModifiers(($event) => isCacheExpanded.value = !isCacheExpanded.value, ["stop"])),
                  class: "p-1"
                }, [
                  createVNode(unref(IconChevronDown), {
                    class: normalizeClass(["w-5 h-5 transition-transform duration-200", [isCacheExpanded.value ? "rotate-180" : "", unref(darkMode) ? "text-gray-400" : "text-gray-500"]])
                  }, null, 8, ["class"])
                ])
              ])
            ]),
            createVNode(Transition, { name: "slide-down" }, {
              default: withCtx(() => [
                isCacheExpanded.value ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["mt-4 pt-4 border-t", unref(darkMode) ? "border-gray-600" : "border-gray-200"])
                }, [
                  !cacheStats.value.error ? (openBlock(), createElementBlock("div", _hoisted_44, [
                    createBaseVNode("div", {
                      class: normalizeClass(["p-3 rounded-lg", unref(darkMode) ? "bg-gray-600" : "bg-gray-50"])
                    }, [
                      createBaseVNode("p", {
                        class: normalizeClass(["text-sm font-medium mb-1", unref(darkMode) ? "text-gray-300" : "text-gray-700"])
                      }, toDisplayString(unref(t)("admin.dashboard.directoryCache")), 3),
                      createBaseVNode("p", {
                        class: normalizeClass(["text-lg font-semibold", unref(darkMode) ? "text-white" : "text-gray-800"])
                      }, toDisplayString(unref(t)("admin.dashboard.hitRate")) + ": " + toDisplayString(Math.round(cacheStats.value.directory.hitRate * 100)) + "% ", 3),
                      createBaseVNode("p", {
                        class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-400" : "text-gray-600"])
                      }, toDisplayString(unref(t)("admin.dashboard.cacheItems")) + ": " + toDisplayString(cacheStats.value.directory.cacheSize), 3)
                    ], 2),
                    createBaseVNode("div", {
                      class: normalizeClass(["p-3 rounded-lg", unref(darkMode) ? "bg-gray-600" : "bg-gray-50"])
                    }, [
                      createBaseVNode("p", {
                        class: normalizeClass(["text-sm font-medium mb-1", unref(darkMode) ? "text-gray-300" : "text-gray-700"])
                      }, toDisplayString(unref(t)("admin.dashboard.urlCache")), 3),
                      createBaseVNode("p", {
                        class: normalizeClass(["text-lg font-semibold", unref(darkMode) ? "text-white" : "text-gray-800"])
                      }, toDisplayString(unref(t)("admin.dashboard.hitRate")) + ": " + toDisplayString(Math.round(cacheStats.value.url.hitRate * 100)) + "% ", 3),
                      createBaseVNode("p", {
                        class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-400" : "text-gray-600"])
                      }, toDisplayString(unref(t)("admin.dashboard.cacheItems")) + ": " + toDisplayString(cacheStats.value.url.cacheSize), 3)
                    ], 2),
                    createBaseVNode("div", {
                      class: normalizeClass(["p-3 rounded-lg", unref(darkMode) ? "bg-gray-600" : "bg-gray-50"])
                    }, [
                      createBaseVNode("p", {
                        class: normalizeClass(["text-sm font-medium mb-1", unref(darkMode) ? "text-gray-300" : "text-gray-700"])
                      }, toDisplayString(unref(t)("admin.dashboard.searchCache")), 3),
                      createBaseVNode("p", {
                        class: normalizeClass(["text-lg font-semibold", unref(darkMode) ? "text-white" : "text-gray-800"])
                      }, toDisplayString(unref(t)("admin.dashboard.hitRate")) + ": " + toDisplayString(Math.round(cacheStats.value.search.hitRate * 100)) + "% ", 3),
                      createBaseVNode("p", {
                        class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-400" : "text-gray-600"])
                      }, toDisplayString(unref(t)("admin.dashboard.cacheItems")) + ": " + toDisplayString(cacheStats.value.search.cacheSize), 3)
                    ], 2)
                  ])) : (openBlock(), createElementBlock("div", _hoisted_45, [
                    createBaseVNode("p", _hoisted_46, toDisplayString(cacheStats.value.error), 1)
                  ]))
                ], 2)) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ], 2)
        ]),
        createBaseVNode("div", _hoisted_47, [
          createBaseVNode("div", {
            class: normalizeClass(["p-3 rounded-lg shadow transition-shadow hover:shadow-md", unref(darkMode) ? "bg-gray-700" : "bg-white"])
          }, [
            createBaseVNode("div", _hoisted_48, [
              createBaseVNode("h3", {
                class: normalizeClass(["text-base font-semibold", unref(darkMode) ? "text-white" : "text-gray-800"])
              }, toDisplayString(unref(t)("admin.dashboard.weeklyActivity")), 3),
              createBaseVNode("div", _hoisted_49, [
                createBaseVNode("button", {
                  onClick: toggleChartType,
                  class: normalizeClass(["px-2 py-1 rounded-md text-xs transition-colors flex items-center", unref(darkMode) ? "bg-gray-600 hover:bg-gray-500 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"])
                }, [
                  createVNode(unref(IconChartBar), { class: "h-3.5 w-3.5 mr-1" }),
                  createTextVNode(" " + toDisplayString(chartType.value === "bar" ? unref(t)("admin.dashboard.switchToLineChart") : unref(t)("admin.dashboard.switchToBarChart")), 1)
                ], 2)
              ])
            ]),
            createBaseVNode("div", _hoisted_50, [
              createBaseVNode("div", {
                class: normalizeClass(["p-2 rounded-lg bg-opacity-10", unref(darkMode) ? "bg-blue-500" : "bg-blue-100"])
              }, [
                createBaseVNode("div", _hoisted_51, [
                  createBaseVNode("div", {
                    class: normalizeClass(["w-7 h-7 rounded-full flex items-center justify-center mr-2", unref(darkMode) ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"])
                  }, [
                    createVNode(unref(IconDocumentText), { class: "h-3.5 w-3.5" })
                  ], 2),
                  createBaseVNode("div", null, [
                    createBaseVNode("p", {
                      class: normalizeClass(["text-xs font-medium", unref(darkMode) ? "text-blue-200" : "text-blue-700"])
                    }, toDisplayString(unref(t)("admin.dashboard.weeklyPastes")), 3),
                    createBaseVNode("p", {
                      class: normalizeClass(["text-lg font-semibold", unref(darkMode) ? "text-white" : "text-gray-800"])
                    }, toDisplayString(totalWeekPastes.value), 3)
                  ])
                ])
              ], 2),
              createBaseVNode("div", {
                class: normalizeClass(["p-2 rounded-lg bg-opacity-10", unref(darkMode) ? "bg-green-500" : "bg-green-100"])
              }, [
                createBaseVNode("div", _hoisted_52, [
                  createBaseVNode("div", {
                    class: normalizeClass(["w-7 h-7 rounded-full flex items-center justify-center mr-2", unref(darkMode) ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-600"])
                  }, [
                    createVNode(unref(IconDocument), { class: "h-3.5 w-3.5" })
                  ], 2),
                  createBaseVNode("div", null, [
                    createBaseVNode("p", {
                      class: normalizeClass(["text-xs font-medium", unref(darkMode) ? "text-green-200" : "text-green-700"])
                    }, toDisplayString(unref(t)("admin.dashboard.weeklyFiles")), 3),
                    createBaseVNode("p", {
                      class: normalizeClass(["text-lg font-semibold", unref(darkMode) ? "text-white" : "text-gray-800"])
                    }, toDisplayString(totalWeekFiles.value), 3)
                  ])
                ])
              ], 2),
              createBaseVNode("div", {
                class: normalizeClass(["p-2 rounded-lg bg-opacity-10", unref(darkMode) ? "bg-purple-500" : "bg-purple-100"])
              }, [
                createBaseVNode("div", _hoisted_53, [
                  createBaseVNode("div", {
                    class: normalizeClass(["w-7 h-7 rounded-full flex items-center justify-center mr-2", unref(darkMode) ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-600"])
                  }, [
                    createVNode(unref(IconChartBar), { class: "h-3.5 w-3.5" })
                  ], 2),
                  createBaseVNode("div", null, [
                    createBaseVNode("p", {
                      class: normalizeClass(["text-xs font-medium", unref(darkMode) ? "text-purple-200" : "text-purple-700"])
                    }, toDisplayString(unref(t)("admin.dashboard.mostActiveDate")), 3),
                    createBaseVNode("p", {
                      class: normalizeClass(["text-lg font-semibold", unref(darkMode) ? "text-white" : "text-gray-800"])
                    }, toDisplayString(dateLabels.value[weeklyMaxValues.value.maxDay]), 3)
                  ])
                ])
              ], 2),
              createBaseVNode("div", {
                class: normalizeClass(["p-2 rounded-lg bg-opacity-10", unref(darkMode) ? "bg-yellow-500" : "bg-yellow-100"])
              }, [
                createBaseVNode("div", _hoisted_54, [
                  createBaseVNode("div", {
                    class: normalizeClass(["w-7 h-7 rounded-full flex items-center justify-center mr-2", unref(darkMode) ? "bg-yellow-500/20 text-yellow-400" : "bg-yellow-100 text-yellow-600"])
                  }, [
                    createVNode(unref(IconChartBar), { class: "h-3.5 w-3.5" })
                  ], 2),
                  createBaseVNode("div", null, [
                    createBaseVNode("p", {
                      class: normalizeClass(["text-xs font-medium", unref(darkMode) ? "text-yellow-200" : "text-yellow-700"])
                    }, toDisplayString(unref(t)("admin.dashboard.highestDailyActivity")), 3),
                    createBaseVNode("p", {
                      class: normalizeClass(["text-lg font-semibold", unref(darkMode) ? "text-white" : "text-gray-800"])
                    }, toDisplayString(weeklyMaxValues.value.maxValue) + " " + toDisplayString(unref(t)("admin.dashboard.items")), 3)
                  ])
                ])
              ], 2)
            ]),
            createBaseVNode("div", _hoisted_55, [
              chartType.value === "bar" ? (openBlock(), createBlock(unref(Bar), {
                key: 0,
                data: chartData.value,
                options: chartOptions.value
              }, null, 8, ["data", "options"])) : (openBlock(), createBlock(unref(Line), {
                key: 1,
                data: chartData.value,
                options: chartOptions.value
              }, null, 8, ["data", "options"]))
            ])
          ], 2)
        ]),
        createBaseVNode("div", _hoisted_56, [
          createBaseVNode("div", {
            class: normalizeClass(["flex-1 p-3 rounded-lg shadow transition-shadow hover:shadow-md", unref(darkMode) ? "bg-gray-700" : "bg-white"])
          }, [
            createBaseVNode("div", _hoisted_57, [
              createBaseVNode("div", {
                class: normalizeClass(["w-6 h-6 rounded-full flex items-center justify-center mr-2", unref(darkMode) ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-600"])
              }, [
                createVNode(unref(IconDocument), { class: "h-3.5 w-3.5" })
              ], 2),
              createBaseVNode("h3", {
                class: normalizeClass(["text-sm font-medium", unref(darkMode) ? "text-gray-300" : "text-gray-500"])
              }, toDisplayString(unref(t)("admin.dashboard.systemVersion")), 3)
            ]),
            !versionInfo.value.error ? (openBlock(), createElementBlock("p", {
              key: 0,
              class: normalizeClass(["text-sm ml-8", unref(darkMode) ? "text-gray-400" : "text-gray-600"])
            }, "v" + toDisplayString(versionInfo.value.version), 3)) : (openBlock(), createElementBlock("p", _hoisted_58, toDisplayString(versionInfo.value.error), 1))
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass(["flex-1 p-3 rounded-lg shadow transition-shadow hover:shadow-md", unref(darkMode) ? "bg-gray-700" : "bg-white"])
          }, [
            createBaseVNode("div", _hoisted_59, [
              createBaseVNode("div", {
                class: normalizeClass(["w-6 h-6 rounded-full flex items-center justify-center mr-2", unref(darkMode) ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"])
              }, [
                createVNode(unref(IconServerStack), { class: "h-3.5 w-3.5" })
              ], 2),
              createBaseVNode("h3", {
                class: normalizeClass(["text-sm font-medium", unref(darkMode) ? "text-gray-300" : "text-gray-500"])
              }, toDisplayString(unref(t)("admin.dashboard.serverEnvironment")), 3)
            ]),
            !versionInfo.value.error ? (openBlock(), createElementBlock("p", {
              key: 0,
              class: normalizeClass(["text-sm ml-8", unref(darkMode) ? "text-gray-400" : "text-gray-600"])
            }, toDisplayString(versionInfo.value.environment), 3)) : (openBlock(), createElementBlock("p", _hoisted_60, toDisplayString(versionInfo.value.error), 1))
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass(["flex-1 p-3 rounded-lg shadow transition-shadow hover:shadow-md", unref(darkMode) ? "bg-gray-700" : "bg-white"])
          }, [
            createBaseVNode("div", _hoisted_61, [
              createBaseVNode("div", {
                class: normalizeClass(["w-6 h-6 rounded-full flex items-center justify-center mr-2", unref(darkMode) ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-600"])
              }, [
                createVNode(unref(IconCircleStack), { class: "h-3.5 w-3.5" })
              ], 2),
              createBaseVNode("h3", {
                class: normalizeClass(["text-sm font-medium", unref(darkMode) ? "text-gray-300" : "text-gray-500"])
              }, toDisplayString(unref(t)("admin.dashboard.dataStorage")), 3)
            ]),
            !versionInfo.value.error ? (openBlock(), createElementBlock("p", {
              key: 0,
              class: normalizeClass(["text-sm ml-8", unref(darkMode) ? "text-gray-400" : "text-gray-600"])
            }, toDisplayString(versionInfo.value.storage), 3)) : (openBlock(), createElementBlock("p", _hoisted_62, toDisplayString(versionInfo.value.error), 1))
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass(["flex-1 p-3 rounded-lg shadow transition-shadow hover:shadow-md", unref(darkMode) ? "bg-gray-700" : "bg-white"])
          }, [
            createBaseVNode("div", _hoisted_63, [
              createBaseVNode("div", {
                class: normalizeClass(["w-6 h-6 rounded-full flex items-center justify-center mr-2", unref(darkMode) ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-600"])
              }, [
                createVNode(unref(IconClock), { class: "h-3.5 w-3.5" })
              ], 2),
              createBaseVNode("h3", {
                class: normalizeClass(["text-sm font-medium", unref(darkMode) ? "text-gray-300" : "text-gray-500"])
              }, toDisplayString(unref(t)("admin.dashboard.lastUpdated")), 3)
            ]),
            createBaseVNode("p", {
              class: normalizeClass(["text-sm ml-8", unref(darkMode) ? "text-gray-400" : "text-gray-600"])
            }, toDisplayString(unref(formatCurrentTime)()), 3)
          ], 2)
        ])
      ]));
    };
  }
};
const DashboardView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a8273909"]]);
export {
  DashboardView as default
};
