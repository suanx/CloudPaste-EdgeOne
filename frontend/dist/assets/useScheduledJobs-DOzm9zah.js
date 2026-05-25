import { U as get, c as createLogger, T as post, R as del, S as put, e as useI18n, Y as useGlobalMessage, g as ref, F as computed } from "./index-BQxzU9F1.js";
const log = createLogger("ScheduledJobService");
function useScheduledJobService() {
  const getScheduledJobs = async (params = {}) => {
    try {
      const resp = await get("/admin/scheduled/jobs", { params });
      if (!resp) {
        throw new Error("获取定时任务列表失败");
      }
      if (typeof resp === "object" && "success" in resp) {
        if (!resp.success) {
          throw new Error(resp.message || "获取定时任务列表失败");
        }
        const items2 = resp.data?.items || resp.items || [];
        return { items: items2 };
      }
      const items = Array.isArray(resp) ? resp : resp.items || [];
      return { items };
    } catch (error) {
      log.error("[ScheduledJobService] 获取任务列表失败:", error);
      throw error;
    }
  };
  const getScheduledJob = async (taskId) => {
    try {
      const resp = await get(`/admin/scheduled/jobs/${taskId}`);
      if (!resp) {
        throw new Error("获取任务详情失败");
      }
      if (typeof resp === "object" && "success" in resp) {
        if (!resp.success) {
          throw new Error(resp.message || "获取任务详情失败");
        }
        return resp.data || resp;
      }
      return resp;
    } catch (error) {
      log.error(`[ScheduledJobService] 获取任务详情失败 (${taskId}):`, error);
      throw error;
    }
  };
  const createScheduledJob = async (data) => {
    try {
      const resp = await post("/admin/scheduled/jobs", data);
      if (!resp) {
        throw new Error("创建定时任务失败");
      }
      if (typeof resp === "object" && "success" in resp) {
        if (!resp.success) {
          throw new Error(resp.message || "创建定时任务失败");
        }
        return resp.data || data;
      }
      return resp;
    } catch (error) {
      log.error("[ScheduledJobService] 创建任务失败:", error);
      throw error;
    }
  };
  const updateScheduledJob = async (taskId, data) => {
    try {
      const resp = await put(`/admin/scheduled/jobs/${taskId}`, data);
      if (!resp) {
        throw new Error("更新定时任务失败");
      }
      if (typeof resp === "object" && "success" in resp) {
        if (!resp.success) {
          throw new Error(resp.message || "更新定时任务失败");
        }
        return resp.data || { taskId, ...data };
      }
      return resp;
    } catch (error) {
      log.error(`[ScheduledJobService] 更新任务失败 (${taskId}):`, error);
      throw error;
    }
  };
  const deleteScheduledJob = async (taskId) => {
    try {
      const resp = await del(`/admin/scheduled/jobs/${taskId}`);
      if (typeof resp === "object" && "success" in resp) {
        if (!resp.success) {
          throw new Error(resp.message || "删除定时任务失败");
        }
      }
      return true;
    } catch (error) {
      log.error(`[ScheduledJobService] 删除任务失败 (${taskId}):`, error);
      throw error;
    }
  };
  const getScheduledJobRuns = async (taskId, params = {}) => {
    try {
      const resp = await get(`/admin/scheduled/jobs/${taskId}/runs`, { params });
      if (!resp) {
        throw new Error("获取执行历史失败");
      }
      if (typeof resp === "object" && "success" in resp) {
        if (!resp.success) {
          throw new Error(resp.message || "获取执行历史失败");
        }
        const items2 = resp.data?.items || resp.items || [];
        return { items: items2 };
      }
      const items = Array.isArray(resp) ? resp : resp.items || [];
      return { items };
    } catch (error) {
      log.error(`[ScheduledJobService] 获取执行历史失败 (${taskId}):`, error);
      throw error;
    }
  };
  const toggleScheduledJob = async (taskId, enabled) => {
    return updateScheduledJob(taskId, { enabled });
  };
  const getHandlerTypes = async () => {
    try {
      const resp = await get("/admin/scheduled/types");
      if (!resp) {
        throw new Error("获取handler类型列表失败");
      }
      if (typeof resp === "object" && "success" in resp) {
        if (!resp.success) {
          throw new Error(resp.message || "获取handler类型列表失败");
        }
        const items2 = resp.data?.items || resp.items || [];
        return { items: items2 };
      }
      const items = Array.isArray(resp) ? resp : resp.items || [];
      return { items };
    } catch (error) {
      log.error("[ScheduledJobService] 获取handler类型列表失败:", error);
      throw error;
    }
  };
  const getHandlerType = async (taskId) => {
    try {
      const resp = await get(`/admin/scheduled/types/${taskId}`);
      if (!resp) {
        throw new Error("获取handler类型详情失败");
      }
      if (typeof resp === "object" && "success" in resp) {
        if (!resp.success) {
          throw new Error(resp.message || "获取handler类型详情失败");
        }
        return resp.data || resp;
      }
      return resp;
    } catch (error) {
      log.error(`[ScheduledJobService] 获取handler类型详情失败 (${taskId}):`, error);
      throw error;
    }
  };
  const runScheduledJobNow = async (taskId) => {
    try {
      const resp = await post(`/admin/scheduled/jobs/${taskId}/run`);
      if (!resp) {
        throw new Error("执行任务失败");
      }
      if (typeof resp === "object" && "success" in resp) {
        if (!resp.success) {
          throw new Error(resp.message || "执行任务失败");
        }
        return resp.data || resp;
      }
      return resp;
    } catch (error) {
      log.error(`[ScheduledJobService] 执行任务失败 (${taskId}):`, error);
      throw error;
    }
  };
  const getHourlyAnalytics = async (windowHours = 24) => {
    try {
      const resp = await get("/admin/scheduled/analytics", {
        params: { windowHours }
      });
      if (!resp) {
        throw new Error("获取统计数据失败");
      }
      if (typeof resp === "object" && "success" in resp) {
        if (!resp.success) {
          throw new Error(resp.message || "获取统计数据失败");
        }
        return resp.data || resp;
      }
      return resp;
    } catch (error) {
      log.error("[ScheduledJobService] 获取按小时统计数据失败:", error);
      throw error;
    }
  };
  const getSchedulerTicker = async () => {
    try {
      const resp = await get("/admin/scheduled/ticker");
      if (!resp) {
        throw new Error("获取触发器状态失败");
      }
      if (typeof resp === "object" && "success" in resp) {
        if (!resp.success) {
          throw new Error(resp.message || "获取触发器状态失败");
        }
        return resp.data || resp;
      }
      return resp;
    } catch (error) {
      log.error("[ScheduledJobService] 获取触发器状态失败:", error);
      throw error;
    }
  };
  return {
    getScheduledJobs,
    getScheduledJob,
    createScheduledJob,
    updateScheduledJob,
    deleteScheduledJob,
    getScheduledJobRuns,
    getHourlyAnalytics,
    getSchedulerTicker,
    toggleScheduledJob,
    runScheduledJobNow,
    getHandlerTypes,
    getHandlerType
  };
}
function useScheduledJobs() {
  const { t } = useI18n();
  const service = useScheduledJobService();
  const { showSuccess, showError } = useGlobalMessage();
  const jobs = ref([]);
  const currentJob = ref(null);
  const jobRuns = ref([]);
  const loading = ref(false);
  const runsLoading = ref(false);
  const runningJobIds = ref(/* @__PURE__ */ new Set());
  const handlerTypes = ref([]);
  const handlerTypesLoading = ref(false);
  const schedulerTicker = ref(null);
  const schedulerTickerLoading = ref(false);
  const showDetailDialog = ref(false);
  const enabledFilter = ref("all");
  const filteredJobs = computed(() => {
    if (enabledFilter.value === "all") {
      return jobs.value;
    }
    const isEnabled = enabledFilter.value === "enabled";
    return jobs.value.filter((job) => job.enabled === isEnabled);
  });
  const loadJobs = async (params = {}, options = {}) => {
    const { silent = false, showErrorOnCatch = true } = options || {};
    if (!silent) {
      loading.value = true;
    }
    try {
      const { items } = await service.getScheduledJobs(params);
      jobs.value = items;
      return items;
    } catch (error) {
      if (showErrorOnCatch) {
        showError(error.message || t("admin.scheduledJobs.loadFailed"));
      }
      throw error;
    } finally {
      if (!silent) {
        loading.value = false;
      }
    }
  };
  const loadJob = async (taskId) => {
    loading.value = true;
    try {
      const job = await service.getScheduledJob(taskId);
      currentJob.value = job;
      return job;
    } catch (error) {
      showError(error.message || t("admin.scheduledJobs.loadDetailFailed"));
      throw error;
    } finally {
      loading.value = false;
    }
  };
  const createJob = async (data) => {
    loading.value = true;
    try {
      const created = await service.createScheduledJob(data);
      showSuccess(t("admin.scheduledJobs.createSuccess"));
      return created;
    } catch (error) {
      showError(error.message || t("admin.scheduledJobs.createFailed"));
      throw error;
    } finally {
      loading.value = false;
    }
  };
  const updateJob = async (taskId, data) => {
    loading.value = true;
    try {
      const updated = await service.updateScheduledJob(taskId, data);
      showSuccess(t("admin.scheduledJobs.updateSuccess"));
      return updated;
    } catch (error) {
      showError(error.message || t("admin.scheduledJobs.updateFailed"));
      throw error;
    } finally {
      loading.value = false;
    }
  };
  const deleteJob = async (taskId) => {
    loading.value = true;
    try {
      await service.deleteScheduledJob(taskId);
      showSuccess(t("admin.scheduledJobs.deleteSuccess"));
      await loadJobs();
      return true;
    } catch (error) {
      showError(error.message || t("admin.scheduledJobs.deleteFailed"));
      throw error;
    } finally {
      loading.value = false;
    }
  };
  const toggleJobEnabled = async (taskId, enabled) => {
    loading.value = true;
    try {
      await service.toggleScheduledJob(taskId, enabled);
      const statusText = enabled ? t("admin.scheduledJobs.status.enabled") : t("admin.scheduledJobs.status.disabled");
      showSuccess(t("admin.scheduledJobs.toggleSuccess", { status: statusText }));
      await loadJobs();
      return true;
    } catch (error) {
      showError(error.message || t("admin.scheduledJobs.toggleFailed"));
      throw error;
    } finally {
      loading.value = false;
    }
  };
  const runJobNow = async (taskId) => {
    runningJobIds.value = /* @__PURE__ */ new Set([...runningJobIds.value, taskId]);
    try {
      const result = await service.runScheduledJobNow(taskId);
      if (result.status === "success") {
        showSuccess(t("admin.scheduledJobs.runNowSuccess"));
      } else {
        showError(result.errorMessage || t("admin.scheduledJobs.runNowFailed"));
      }
      return result;
    } catch (error) {
      showError(error.message || t("admin.scheduledJobs.runNowFailed"));
      throw error;
    } finally {
      const newSet = new Set(runningJobIds.value);
      newSet.delete(taskId);
      runningJobIds.value = newSet;
    }
  };
  const loadJobRuns = async (taskId, params = {}) => {
    runsLoading.value = true;
    try {
      const { items } = await service.getScheduledJobRuns(taskId, params);
      jobRuns.value = items;
      return items;
    } catch (error) {
      showError(error.message || t("admin.scheduledJobs.loadRunsFailed"));
      throw error;
    } finally {
      runsLoading.value = false;
    }
  };
  const loadHourlyAnalytics = async (windowHours = 24) => {
    try {
      return await service.getHourlyAnalytics(windowHours);
    } catch (error) {
      showError(error.message || t("admin.scheduledJobs.loadAnalyticsFailed"));
      throw error;
    }
  };
  const loadSchedulerTicker = async (options = {}) => {
    const { silent = false, showErrorOnCatch = true } = options || {};
    if (!silent) {
      schedulerTickerLoading.value = true;
    }
    try {
      const data = await service.getSchedulerTicker();
      schedulerTicker.value = data;
      return data;
    } catch (error) {
      if (showErrorOnCatch) {
        showError(error.message || t("admin.scheduledJobs.ticker.loadFailed"));
      }
      throw error;
    } finally {
      if (!silent) {
        schedulerTickerLoading.value = false;
      }
    }
  };
  const loadHandlerTypes = async () => {
    handlerTypesLoading.value = true;
    try {
      const { items } = await service.getHandlerTypes();
      handlerTypes.value = items;
      return items;
    } catch (error) {
      showError(error.message || t("admin.scheduledJobs.loadHandlerTypesFailed"));
      throw error;
    } finally {
      handlerTypesLoading.value = false;
    }
  };
  const loadHandlerType = async (taskId) => {
    try {
      return await service.getHandlerType(taskId);
    } catch (error) {
      showError(error.message || t("admin.scheduledJobs.loadHandlerTypeFailed"));
      throw error;
    }
  };
  const getHandlerTypeById = (taskId) => {
    return handlerTypes.value.find((h) => h.id === taskId) || null;
  };
  const formatInterval = (seconds) => {
    if (!seconds) return "-";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const secs = seconds % 60;
    const parts = [];
    if (hours > 0) parts.push(`${hours}${t("common.hour")}`);
    if (minutes > 0) parts.push(`${minutes}${t("common.minute")}`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}${t("common.second")}`);
    return `每隔${parts.join("")}`;
  };
  const formatSchedule = (job) => {
    if (!job) return "-";
    const type = (job.scheduleType || "interval").toLowerCase();
    let base = "-";
    if (type === "interval") {
      base = formatInterval(Number(job.intervalSec) || 0);
    } else if (type === "cron") {
      base = job.cronExpression || "-";
    }
    return base;
  };
  const isJobRunning = (taskId) => {
    return runningJobIds.value.has(taskId);
  };
  return {
    // 状态
    jobs,
    currentJob,
    jobRuns,
    loading,
    runsLoading,
    filteredJobs,
    enabledFilter,
    // 行级加载状态
    runningJobIds,
    isJobRunning,
    // Handler 类型状态
    handlerTypes,
    handlerTypesLoading,
    // 平台触发器状态
    schedulerTicker,
    schedulerTickerLoading,
    // 对话框状态
    showDetailDialog,
    // 方法
    loadJobs,
    loadJob,
    createJob,
    updateJob,
    deleteJob,
    toggleJobEnabled,
    runJobNow,
    loadJobRuns,
    loadHourlyAnalytics,
    loadSchedulerTicker,
    // Handler 类型方法
    loadHandlerTypes,
    loadHandlerType,
    getHandlerTypeById,
    // 工具方法
    formatSchedule,
    formatInterval
  };
}
export {
  useScheduledJobs as u
};
