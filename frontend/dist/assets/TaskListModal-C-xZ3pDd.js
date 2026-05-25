import { e as useI18n, c as createLogger, d as useRouter, g as ref, aw as useIntervalFn, w as watch, ax as onUnmounted, j as createElementBlock, p as createCommentVNode, k as openBlock, l as createBaseVNode, n as normalizeClass, t as toDisplayString, y as unref, z as createVNode, ay as IconExternalLink, J as IconRefresh, G as IconClose, az as IconTaskList, K as Fragment, L as renderList, M as createBlock, aA as IconCheckCircle, aB as IconXCircle, aC as IconExclamationSolid, A as createTextVNode, m as withModifiers, ao as IconChevronDown, aD as normalizeStyle, aE as withCtx, aF as Transition, aG as withKeys, aH as getJobStatus, aI as listJobs, aJ as cancelJob } from "./index-BQxzU9F1.js";
import { a as formatRelativeTime } from "./timeUtils-D81jJILb.js";
import { f as formatFileSize } from "./fileUtils-CALGFK20.js";
import "./fileTypes-C4-giE9O.js";
const _hoisted_1 = {
  class: "relative w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col",
  style: { "max-width": "480px", "max-height": "420px" }
};
const _hoisted_2 = { class: "flex items-center space-x-2" };
const _hoisted_3 = ["title"];
const _hoisted_4 = { class: "flex items-center space-x-1" };
const _hoisted_5 = ["disabled", "title"];
const _hoisted_6 = {
  class: "flex-1 overflow-y-auto",
  style: { "max-height": "360px" }
};
const _hoisted_7 = {
  key: 0,
  class: "text-center py-10"
};
const _hoisted_8 = {
  key: 1,
  class: "text-center py-10 px-4"
};
const _hoisted_9 = ["onClick"];
const _hoisted_10 = { class: "flex items-center gap-3" };
const _hoisted_11 = { class: "flex-shrink-0 relative" };
const _hoisted_12 = ["title"];
const _hoisted_13 = ["onClick", "title"];
const _hoisted_14 = {
  key: 0,
  class: "mt-2.5 overflow-hidden"
};
const _hoisted_15 = { class: "flex-shrink-0 w-4 text-center" };
const _hoisted_16 = {
  key: 0,
  class: "text-green-500"
};
const _hoisted_17 = {
  key: 1,
  class: "text-blue-500"
};
const _hoisted_18 = {
  key: 2,
  class: "text-orange-500 animate-pulse"
};
const _hoisted_19 = {
  key: 3,
  class: "text-red-500"
};
const _hoisted_20 = {
  key: 4,
  class: "text-yellow-500"
};
const _hoisted_21 = {
  key: 5,
  class: "text-gray-400"
};
const _hoisted_22 = ["title"];
const _hoisted_23 = ["title"];
const _hoisted_24 = {
  key: 0,
  class: "flex-shrink-0 tabular-nums text-blue-500"
};
const _hoisted_25 = ["title"];
const _sfc_main = {
  __name: "TaskListModal",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close", "task-completed"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const log = createLogger("TaskListModal");
    const router = useRouter();
    const props = __props;
    const emit = __emit;
    const tasks = ref([]);
    const isLoading = ref(false);
    const expandedIds = ref(/* @__PURE__ */ new Set());
    const extractNameFromPath = (path) => {
      if (!path || typeof path !== "string") return "";
      return path.replace(/\/+$/, "").split("/").filter(Boolean).pop() || "";
    };
    const generateTaskName = (jobData) => {
      const items = jobData.payload?.items;
      if (!items || items.length === 0) {
        return `#${jobData.jobId?.substring(0, 6) || "???"}`;
      }
      const firstItem = items[0];
      const sourcePath = firstItem?.sourcePath || "";
      const sourceFileName = extractNameFromPath(sourcePath) || t("mount.taskList.unknownFile");
      if (items.length === 1) {
        return sourceFileName;
      } else {
        return `${sourceFileName} (+${items.length - 1})`;
      }
    };
    const transformTaskData = (jobData) => {
      const total = jobData.stats?.totalItems || 0;
      const success = jobData.stats?.successCount || 0;
      const failed = jobData.stats?.failedCount || 0;
      const processed = jobData.stats?.processedItems || 0;
      const bytesTransferred = jobData.stats?.bytesTransferred || 0;
      const totalBytes = jobData.stats?.totalBytes || 0;
      let progress = 0;
      if (totalBytes > 0 && bytesTransferred > 0) {
        progress = Math.round(bytesTransferred / totalBytes * 100);
      } else if (total > 0) {
        progress = Math.round(processed / total * 100);
      }
      progress = Math.min(100, Math.max(0, progress));
      const itemResults = jobData.stats?.itemResults || [];
      const firstFailedItem = itemResults.find((item) => item.status === "failed");
      return {
        id: jobData.jobId,
        name: generateTaskName(jobData),
        type: jobData.taskType,
        status: jobData.status,
        progress,
        stats: {
          total,
          success,
          failed,
          skipped: jobData.stats?.skippedCount || 0
        },
        itemResults,
        relativeTime: formatRelativeTime(jobData.createdAt),
        error: jobData.errorMessage || firstFailedItem?.error || null
      };
    };
    const loadTasks = async () => {
      isLoading.value = true;
      try {
        const response = await listJobs({ taskType: "copy" });
        const jobsList = response?.data?.jobs || response?.jobs || [];
        tasks.value = jobsList.map(transformTaskData);
      } catch (error) {
        log.error("[TaskListModal] Failed to load tasks:", error);
      } finally {
        isLoading.value = false;
      }
    };
    const pollRunningTasks = async () => {
      const runningTasks = tasks.value.filter((task) => task.status === "running" || task.status === "pending");
      if (runningTasks.length === 0) return;
      const completedTasks = [];
      for (const task of runningTasks) {
        try {
          const response = await getJobStatus(task.id);
          const jobData = response?.data || response;
          const index = tasks.value.findIndex((t2) => t2.id === task.id);
          if (index !== -1) {
            const oldStatus = tasks.value[index].status;
            const newTaskData = transformTaskData(jobData);
            tasks.value[index] = newTaskData;
            const wasRunning = oldStatus === "running" || oldStatus === "pending";
            const isNowComplete = newTaskData.status === "completed" || newTaskData.status === "partial";
            if (wasRunning && isNowComplete) {
              completedTasks.push(newTaskData);
            }
          }
        } catch (error) {
          log.error(`[TaskListModal] Failed to poll task ${task.id}:`, error);
        }
      }
      if (completedTasks.length > 0) {
        emit("task-completed", { tasks: completedTasks });
      }
    };
    const handleCancelTask = async (jobId) => {
      try {
        await cancelJob(jobId);
        await loadTasks();
      } catch (error) {
        log.error("[TaskListModal] Failed to cancel task:", error);
      }
    };
    const toggleExpand = (taskId) => {
      if (expandedIds.value.has(taskId)) {
        expandedIds.value.delete(taskId);
      } else {
        expandedIds.value.add(taskId);
      }
    };
    const hasTaskError = (task) => {
      return task.status === "failed" || task.status === "partial";
    };
    const getErrorMessage = (task) => {
      return task.error || null;
    };
    const getStatusTextClass = (task) => {
      const classes = {
        running: "text-blue-500",
        completed: props.darkMode ? "text-gray-400" : "text-gray-500",
        failed: "text-red-500",
        partial: "text-yellow-600",
        cancelled: props.darkMode ? "text-gray-500" : "text-gray-400",
        pending: props.darkMode ? "text-gray-500" : "text-gray-400"
      };
      return classes[task.status] || classes.pending;
    };
    const goToTaskManagement = () => {
      close();
      router.push("/admin/tasks");
    };
    const close = () => {
      emit("close");
    };
    const { pause: stopPolling, resume: startPolling } = useIntervalFn(pollRunningTasks, 3e3, {
      immediate: false,
      immediateCallback: true
    });
    watch(
      () => props.isOpen,
      async (isOpen) => {
        if (isOpen) {
          try {
            await loadTasks();
            if (props.isOpen) {
              startPolling();
            }
          } catch (error) {
            log.error("[TaskListModal] 加载任务失败:", error);
          }
        } else {
          stopPolling();
          expandedIds.value.clear();
        }
      },
      { immediate: true }
    );
    onUnmounted(() => {
      stopPolling();
      expandedIds.value.clear();
    });
    return (_ctx, _cache) => {
      return __props.isOpen ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "fixed inset-0 z-[60] overflow-hidden bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4",
        onClick: withModifiers(close, ["self"]),
        onKeydown: withKeys(close, ["esc"])
      }, [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", {
            class: normalizeClass(["flex-shrink-0 px-4 py-3 border-b flex justify-between items-center", __props.darkMode ? "border-gray-700" : "border-gray-200"])
          }, [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("h3", {
                class: normalizeClass(["text-base font-medium", __props.darkMode ? "text-gray-100" : "text-gray-900"])
              }, toDisplayString(unref(t)("mount.taskList.title")), 3),
              tasks.value.length > 0 ? (openBlock(), createElementBlock("span", {
                key: 0,
                class: normalizeClass(["text-xs px-1.5 py-0.5 rounded-full", __props.darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"])
              }, toDisplayString(tasks.value.length), 3)) : createCommentVNode("", true),
              createBaseVNode("button", {
                onClick: goToTaskManagement,
                class: normalizeClass(["p-1.5 rounded transition-colors duration-150", __props.darkMode ? "hover:bg-gray-700 text-gray-500 hover:text-blue-400" : "hover:bg-gray-100 text-gray-400 hover:text-blue-600"]),
                title: unref(t)("mount.taskList.viewFullManagement")
              }, [
                createVNode(unref(IconExternalLink), { "aria-hidden": "true" })
              ], 10, _hoisted_3)
            ]),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("button", {
                onClick: loadTasks,
                disabled: isLoading.value,
                class: normalizeClass(["p-2 rounded-full transition-colors duration-150", __props.darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"]),
                title: unref(t)("mount.operations.refresh")
              }, [
                createVNode(unref(IconRefresh), {
                  class: normalizeClass({ "animate-spin": isLoading.value }),
                  "aria-hidden": "true"
                }, null, 8, ["class"])
              ], 10, _hoisted_5),
              createBaseVNode("button", {
                onClick: close,
                class: normalizeClass(["p-2 rounded-full transition-colors duration-150", __props.darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"])
              }, [
                createVNode(unref(IconClose), { "aria-hidden": "true" })
              ], 2)
            ])
          ], 2),
          createBaseVNode("div", _hoisted_6, [
            isLoading.value && tasks.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_7, [
              createVNode(unref(IconRefresh), {
                size: "lg",
                class: normalizeClass(["animate-spin mx-auto", __props.darkMode ? "text-gray-400" : "text-gray-500"]),
                "aria-hidden": "true"
              }, null, 8, ["class"]),
              createBaseVNode("p", {
                class: normalizeClass(["mt-2 text-xs", __props.darkMode ? "text-gray-300" : "text-gray-600"])
              }, toDisplayString(unref(t)("mount.taskList.loading")), 3)
            ])) : tasks.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_8, [
              createVNode(unref(IconTaskList), {
                size: "2xl",
                class: normalizeClass(["mx-auto mb-2 opacity-30", __props.darkMode ? "text-gray-500" : "text-gray-400"]),
                "aria-hidden": "true"
              }, null, 8, ["class"]),
              createBaseVNode("p", {
                class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-300" : "text-gray-700"])
              }, toDisplayString(unref(t)("mount.taskList.empty")), 3)
            ])) : (openBlock(), createElementBlock("div", {
              key: 2,
              class: normalizeClass(["divide-y", __props.darkMode ? "divide-gray-700/60" : "divide-gray-200"])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(tasks.value, (task) => {
                return openBlock(), createElementBlock("div", {
                  key: task.id,
                  class: normalizeClass(["group px-4 py-3.5 transition-colors duration-150 cursor-pointer", [
                    __props.darkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50/80",
                    hasTaskError(task) ? __props.darkMode ? "bg-red-900/10" : "bg-red-50/50" : ""
                  ]]),
                  onClick: ($event) => toggleExpand(task.id)
                }, [
                  createBaseVNode("div", _hoisted_10, [
                    createBaseVNode("span", _hoisted_11, [
                      task.status === "running" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                        _cache[0] || (_cache[0] = createBaseVNode("span", { class: "block w-2 h-2 rounded-full bg-blue-500" }, null, -1)),
                        _cache[1] || (_cache[1] = createBaseVNode("span", { class: "absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75" }, null, -1))
                      ], 64)) : task.status === "completed" ? (openBlock(), createBlock(unref(IconCheckCircle), {
                        key: 1,
                        class: "text-green-500",
                        "aria-hidden": "true"
                      })) : task.status === "failed" ? (openBlock(), createBlock(unref(IconXCircle), {
                        key: 2,
                        class: "text-red-500",
                        "aria-hidden": "true"
                      })) : task.status === "partial" ? (openBlock(), createBlock(unref(IconExclamationSolid), {
                        key: 3,
                        class: "text-yellow-500",
                        "aria-hidden": "true"
                      })) : (openBlock(), createElementBlock("span", {
                        key: 4,
                        class: normalizeClass(["block w-2 h-2 rounded-full", __props.darkMode ? "bg-gray-500" : "bg-gray-400"])
                      }, null, 2))
                    ]),
                    createBaseVNode("span", {
                      class: normalizeClass(["flex-1 text-sm font-medium truncate", __props.darkMode ? "text-gray-100" : "text-gray-900"]),
                      title: task.name
                    }, toDisplayString(task.name), 11, _hoisted_12),
                    createBaseVNode("span", {
                      class: normalizeClass(["flex-shrink-0 text-xs tabular-nums", getStatusTextClass(task)])
                    }, [
                      task.status === "running" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                        createTextVNode(toDisplayString(task.progress) + "%", 1)
                      ], 64)) : task.status === "completed" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createTextVNode(toDisplayString(task.relativeTime), 1)
                      ], 64)) : task.status === "failed" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                        createTextVNode(toDisplayString(unref(t)("mount.taskList.status.failed")), 1)
                      ], 64)) : task.status === "partial" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                        createTextVNode(toDisplayString(task.stats.failed) + toDisplayString(unref(t)("mount.taskList.itemsFailed")), 1)
                      ], 64)) : task.status === "cancelled" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
                        createTextVNode(toDisplayString(unref(t)("mount.taskList.status.cancelled")), 1)
                      ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 5 }, [
                        createTextVNode(toDisplayString(unref(t)("mount.taskList.status.pending")), 1)
                      ], 64))
                    ], 2),
                    task.status === "running" || task.status === "pending" ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      onClick: withModifiers(($event) => handleCancelTask(task.id), ["stop"]),
                      class: normalizeClass(["flex-shrink-0 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150", __props.darkMode ? "hover:bg-gray-700 text-gray-400 hover:text-red-400" : "hover:bg-gray-100 text-gray-400 hover:text-red-500"]),
                      title: unref(t)("mount.taskList.cancel")
                    }, [
                      createVNode(unref(IconClose), {
                        size: "sm",
                        "aria-hidden": "true"
                      })
                    ], 10, _hoisted_13)) : createCommentVNode("", true),
                    createVNode(unref(IconChevronDown), {
                      size: "sm",
                      class: normalizeClass(["flex-shrink-0 transition-transform duration-200", [
                        expandedIds.value.has(task.id) ? "rotate-180" : "",
                        __props.darkMode ? "text-gray-500" : "text-gray-400"
                      ]]),
                      "aria-hidden": "true"
                    }, null, 8, ["class"])
                  ]),
                  task.status === "running" ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: normalizeClass(["mt-2 h-1.5 rounded-full overflow-hidden", __props.darkMode ? "bg-gray-700" : "bg-gray-200"])
                  }, [
                    createBaseVNode("div", {
                      class: "h-full bg-blue-500 rounded-full transition-all duration-300 ease-out",
                      style: normalizeStyle({ width: task.progress + "%" })
                    }, null, 4)
                  ], 2)) : createCommentVNode("", true),
                  createVNode(Transition, {
                    "enter-active-class": "transition-all duration-200 ease-out",
                    "enter-from-class": "opacity-0 max-h-0",
                    "enter-to-class": "opacity-100 max-h-40",
                    "leave-active-class": "transition-all duration-150 ease-in",
                    "leave-from-class": "opacity-100 max-h-40",
                    "leave-to-class": "opacity-0 max-h-0"
                  }, {
                    default: withCtx(() => [
                      expandedIds.value.has(task.id) && task.itemResults && task.itemResults.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_14, [
                        createBaseVNode("div", {
                          class: normalizeClass(["space-y-1.5 max-h-32 overflow-y-auto rounded-md p-3", __props.darkMode ? "bg-gray-900/50" : "bg-gray-50"])
                        }, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(task.itemResults, (item, index) => {
                            return openBlock(), createElementBlock("div", {
                              key: index,
                              class: normalizeClass(["flex items-center gap-2 text-xs", __props.darkMode ? "text-gray-300" : "text-gray-600"])
                            }, [
                              createBaseVNode("span", _hoisted_15, [
                                item.status === "success" ? (openBlock(), createElementBlock("span", _hoisted_16, "✓")) : item.status === "processing" ? (openBlock(), createElementBlock("span", _hoisted_17, "●")) : item.status === "retrying" ? (openBlock(), createElementBlock("span", _hoisted_18, "↻")) : item.status === "failed" ? (openBlock(), createElementBlock("span", _hoisted_19, "✗")) : item.status === "skipped" ? (openBlock(), createElementBlock("span", _hoisted_20, "○")) : (openBlock(), createElementBlock("span", _hoisted_21, "·"))
                              ]),
                              createBaseVNode("span", {
                                class: "flex-1 truncate font-mono",
                                title: item.sourcePath
                              }, [
                                createTextVNode(toDisplayString(extractNameFromPath(item.sourcePath)) + " ", 1),
                                item.retryCount && item.retryCount > 0 ? (openBlock(), createElementBlock("span", {
                                  key: 0,
                                  class: "ml-1 text-orange-500",
                                  title: unref(t)("mount.taskList.retry.retryCount", { count: item.retryCount })
                                }, toDisplayString(unref(t)("mount.taskList.retry.withRetry", { count: item.retryCount })), 9, _hoisted_23)) : createCommentVNode("", true)
                              ], 8, _hoisted_22),
                              item.fileSize || item.bytesTransferred ? (openBlock(), createElementBlock("span", _hoisted_24, toDisplayString(unref(formatFileSize)(item.fileSize || item.bytesTransferred)), 1)) : createCommentVNode("", true)
                            ], 2);
                          }), 128))
                        ], 2)
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1024),
                  !expandedIds.value.has(task.id) && hasTaskError(task) && getErrorMessage(task) ? (openBlock(), createElementBlock("p", {
                    key: 1,
                    class: normalizeClass(["mt-1 pl-6 text-xs truncate", __props.darkMode ? "text-red-400" : "text-red-500"]),
                    title: getErrorMessage(task)
                  }, toDisplayString(getErrorMessage(task)), 11, _hoisted_25)) : createCommentVNode("", true)
                ], 10, _hoisted_9);
              }), 128))
            ], 2))
          ])
        ])
      ], 32)) : createCommentVNode("", true);
    };
  }
};
export {
  _sfc_main as default
};
