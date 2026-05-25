import { c_ as readonly, r as reactive, c as createLogger, i as useLocalStorage, W as useDebounceFn, aK as _export_sfc, aN as useCssVars, e as useI18n, g as ref, w as watch, o as onMounted, cK as onActivated, cN as onDeactivated, aY as onBeforeUnmount, j as createElementBlock, k as openBlock, l as createBaseVNode, p as createCommentVNode, n as normalizeClass, z as createVNode, t as toDisplayString, aP as nextTick, aR as loadVditor, e2 as mightContainMermaid, e3 as ensureMermaidPatchedForVditor, aS as VDITOR_ASSETS_BASE } from "./index-BQxzU9F1.js";
import { _ as _sfc_main$1 } from "./LoadingIndicator-C1Dntewf.js";
const zipWorkerUri = "/assets/zip-web-worker-CaUoJ94E.js";
const zipWasmUri = "/assets/zip-module-pAP9Y2qv.wasm";
const ZIPJS_RUNTIME_URIS = Object.freeze({
  workerURI: zipWorkerUri,
  wasmURI: zipWasmUri
});
function getZipJsDefaultConfig() {
  const hardwareConcurrency = typeof navigator !== "undefined" && typeof navigator.hardwareConcurrency === "number" ? navigator.hardwareConcurrency : 2;
  return {
    ...ZIPJS_RUNTIME_URIS,
    chunkSize: 64 * 1024,
    maxWorkers: hardwareConcurrency,
    terminateWorkerTimeout: 5e3,
    // 5秒
    useWebWorkers: true,
    useCompressionStream: true
  };
}
const STORAGE_KEY = "cloudpaste_tasks";
const MAX_TASK_AGE_DAYS = 7;
const log = createLogger("TaskManager");
const TaskStatus = {
  PENDING: "pending",
  // 待处理
  RUNNING: "running",
  // 运行中
  COMPLETED: "completed",
  // 已完成
  FAILED: "failed",
  // 失败
  CANCELLED: "cancelled"
  // 已取消
};
const TaskType = {
  COPY: "copy",
  // 复制任务
  UPLOAD: "upload",
  // 上传任务
  DELETE: "delete",
  // 删除任务
  DOWNLOAD: "download"
  // 下载任务
};
const state = reactive({
  tasks: [],
  // 任务列表
  nextId: 1
  // 下一个任务ID
});
const storedTasksState = useLocalStorage(STORAGE_KEY, null);
const persistNow = () => {
  storedTasksState.value = {
    tasks: state.tasks,
    nextId: state.nextId
  };
};
const persistDebounced = useDebounceFn(persistNow, 500);
const saveTasksToStorage = () => {
  try {
    persistDebounced();
  } catch (error) {
    log.error("保存任务到本地存储失败:", error);
  }
};
const cleanExpiredTasks = (tasks) => {
  if (!Array.isArray(tasks)) return [];
  const now = /* @__PURE__ */ new Date();
  const cutoffDate = new Date(now.getTime() - MAX_TASK_AGE_DAYS * 24 * 60 * 60 * 1e3);
  return tasks.filter((task) => {
    const taskDate = new Date(task.updatedAt);
    return taskDate >= cutoffDate;
  });
};
const loadTasksFromStorage = () => {
  try {
    const parsedData = storedTasksState.value;
    if (parsedData) {
      if (parsedData.tasks && Array.isArray(parsedData.tasks)) {
        parsedData.tasks.forEach((task) => {
          task.createdAt = new Date(task.createdAt);
          task.updatedAt = new Date(task.updatedAt);
        });
        const cleanedTasks = cleanExpiredTasks(parsedData.tasks);
        state.tasks = cleanedTasks;
        state.nextId = parsedData.nextId || 1;
        log.debug(`从本地存储加载了 ${cleanedTasks.length} 个任务`);
      }
    }
  } catch (error) {
    log.error("从本地存储加载任务失败:", error);
  }
};
loadTasksFromStorage();
const taskManager = {
  // 添加新任务
  addTask(taskType, name, total = 100) {
    const task = {
      id: state.nextId++,
      type: taskType,
      name,
      progress: 0,
      status: TaskStatus.PENDING,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      total,
      error: null,
      details: {}
    };
    state.tasks.push(task);
    saveTasksToStorage();
    return task.id;
  },
  // 更新任务进度
  updateTaskProgress(taskId, progress, details = {}) {
    const task = state.tasks.find((t) => t.id === taskId);
    if (task) {
      task.progress = progress;
      task.status = TaskStatus.RUNNING;
      task.updatedAt = /* @__PURE__ */ new Date();
      task.details = { ...task.details, ...details };
      saveTasksToStorage();
    }
  },
  // 完成任务
  completeTask(taskId, details = {}) {
    const task = state.tasks.find((t) => t.id === taskId);
    if (task) {
      task.progress = 100;
      task.status = TaskStatus.COMPLETED;
      task.updatedAt = /* @__PURE__ */ new Date();
      task.details = { ...task.details, ...details };
      saveTasksToStorage();
    }
  },
  // 标记任务失败
  failTask(taskId, error, details = {}) {
    const task = state.tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = TaskStatus.FAILED;
      task.error = error;
      task.updatedAt = /* @__PURE__ */ new Date();
      task.details = { ...task.details, ...details };
      saveTasksToStorage();
    }
  },
  // 取消任务
  cancelTask(taskId) {
    const task = state.tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = TaskStatus.CANCELLED;
      task.updatedAt = /* @__PURE__ */ new Date();
      saveTasksToStorage();
    }
  },
  // 清除已完成的任务
  clearCompletedTasks() {
    state.tasks = state.tasks.filter((t) => t.status !== TaskStatus.COMPLETED && t.status !== TaskStatus.FAILED && t.status !== TaskStatus.CANCELLED);
    saveTasksToStorage();
  },
  // 清除所有任务
  clearAllTasks() {
    state.tasks = [];
    saveTasksToStorage();
  },
  // 手动保存任务到本地存储
  manualSaveToStorage() {
    saveTasksToStorage();
  },
  // 手动从本地存储加载任务
  manualLoadFromStorage() {
    loadTasksFromStorage();
  },
  // 获取任务存储统计信息
  getStorageStats() {
    try {
      const stats = {
        totalTasks: state.tasks.length,
        byStatus: {
          [TaskStatus.PENDING]: 0,
          [TaskStatus.RUNNING]: 0,
          [TaskStatus.COMPLETED]: 0,
          [TaskStatus.FAILED]: 0,
          [TaskStatus.CANCELLED]: 0
        },
        byType: {
          [TaskType.COPY]: 0,
          [TaskType.UPLOAD]: 0,
          [TaskType.DELETE]: 0,
          [TaskType.DOWNLOAD]: 0
        },
        oldestTask: null,
        newestTask: null,
        storageUsage: 0
      };
      state.tasks.forEach((task) => {
        stats.byStatus[task.status]++;
        stats.byType[task.type]++;
      });
      if (state.tasks.length > 0) {
        const sortedTasks = [...state.tasks].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        stats.oldestTask = sortedTasks[0].createdAt;
        stats.newestTask = sortedTasks[sortedTasks.length - 1].createdAt;
      }
      const storageData = JSON.stringify({
        tasks: state.tasks,
        nextId: state.nextId
      });
      stats.storageUsage = new Blob([storageData]).size;
      return stats;
    } catch (error) {
      log.error("获取存储统计信息失败:", error);
      return null;
    }
  },
  // 获取所有任务
  getTasks() {
    return state.tasks;
  }
};
const useTaskManager = () => {
  return {
    state: readonly(state),
    ...taskManager
  };
};
const _hoisted_1 = {
  key: 0,
  class: "loading-overlay"
};
const _hoisted_2 = {
  key: 1,
  class: "error-overlay"
};
const _hoisted_3 = { class: "error-text" };
const _hoisted_4 = { class: "fallback-content" };
const _sfc_main = {
  __name: "MarkdownDisplay",
  props: {
    content: {
      type: String,
      required: true
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["load", "error"],
  setup(__props, { expose: __expose, emit: __emit }) {
    useCssVars((_ctx) => ({
      "eaef26a0": props.darkMode ? "#d4d4d4" : "#374151",
      "c49a8946": props.darkMode ? "#1f2937" : "#f8f9fa",
      "27490566": props.darkMode ? "#374151" : "#e9ecef",
      "13942053": props.darkMode ? "#374151" : "#f1f5f9",
      "924c13ae": props.darkMode ? "#e2e8f0" : "#1e293b",
      "3517cbfe": props.darkMode ? "#374151" : "#e5e7eb",
      "166f85c2": props.darkMode ? "#6b7280" : "#d1d5db",
      "c10c7a1a": props.darkMode ? "#1f2937" : "#f9fafb",
      "2484ca7b": props.darkMode ? "#60a5fa" : "#3b82f6",
      "88ba994a": props.darkMode ? "#93c5fd" : "#1d4ed8"
    }));
    const { t } = useI18n();
    const log2 = createLogger("MarkdownDisplay");
    const props = __props;
    const emit = __emit;
    const loading = ref(false);
    const error = ref(null);
    const rendered = ref(false);
    const markdownContainer = ref(null);
    const isDestroyed = ref(false);
    const isActive = ref(true);
    let renderVersion = 0;
    let renderTimer = null;
    const shouldContinue = (version) => {
      return !isDestroyed.value && isActive.value && version === renderVersion;
    };
    const renderMarkdown = async () => {
      const currentVersion = ++renderVersion;
      if (!props.content || !shouldContinue(currentVersion)) return;
      try {
        loading.value = true;
        error.value = null;
        rendered.value = false;
        await nextTick();
        if (!shouldContinue(currentVersion) || !markdownContainer.value) {
          log2.warn("MarkdownDisplay组件已销毁/隐藏或DOM不存在，跳过渲染");
          return;
        }
        markdownContainer.value.innerHTML = "";
        markdownContainer.value.classList.remove("vditor-reset--dark", "vditor-reset--light");
        let VditorConstructor;
        try {
          VditorConstructor = await loadVditor();
        } catch (loadError) {
          log2.error("Vditor 加载失败:", loadError);
          throw new Error(`Vditor 加载失败: ${loadError.message}`);
        }
        if (!shouldContinue(currentVersion) || !markdownContainer.value) {
          log2.warn("MarkdownDisplay组件已销毁/隐藏，取消Vditor渲染");
          return;
        }
        if (!VditorConstructor || typeof VditorConstructor.preview !== "function") {
          throw new Error("Vditor.preview 方法不可用");
        }
        if (mightContainMermaid(props.content)) {
          try {
            await ensureMermaidPatchedForVditor();
          } catch (patchError) {
            log2.warn("Mermaid 补丁加载失败（将继续正常渲染）:", patchError);
          }
          if (!shouldContinue(currentVersion) || !markdownContainer.value) {
            log2.warn("MarkdownDisplay组件已销毁/隐藏，跳过 Mermaid 补丁后的渲染");
            return;
          }
        }
        try {
          VditorConstructor.preview(markdownContainer.value, props.content, {
            mode: "dark-light",
            // 支持明暗主题
            theme: {
              current: props.darkMode ? "dark" : "light",
              // 根据darkMode设置主题
              path: `${VDITOR_ASSETS_BASE}/dist/css/content-theme`
            },
            cdn: VDITOR_ASSETS_BASE,
            hljs: {
              lineNumber: true,
              // 代码块显示行号
              style: props.darkMode ? "vs2015" : "github"
              // 代码高亮样式
            },
            markdown: {
              toc: true,
              // 启用目录
              mark: true,
              // 启用标记
              footnotes: true,
              // 启用脚注
              autoSpace: true,
              // 自动空格
              media: true,
              // 启用媒体链接解析
              listStyle: true,
              // 启用列表样式支持
              task: true,
              // 启用任务列表
              mermaid: {
                theme: "default",
                useMaxWidth: false
              },
              flowchart: {
                theme: "default"
              }
            },
            math: {
              engine: "KaTeX",
              inlineDigit: true
            },
            after: () => {
              if (!shouldContinue(currentVersion) || !markdownContainer.value) {
                log2.warn("MarkdownDisplay组件已销毁/隐藏或渲染已过期，跳过after回调");
                return;
              }
              log2.debug("Markdown 内容渲染完成");
              if (props.darkMode) {
                markdownContainer.value.classList.add("vditor-reset--dark");
                markdownContainer.value.classList.remove("vditor-reset--light");
              } else {
                markdownContainer.value.classList.add("vditor-reset--light");
                markdownContainer.value.classList.remove("vditor-reset--dark");
              }
              rendered.value = true;
              loading.value = false;
              emit("load");
            }
          });
        } catch (previewError) {
          log2.error("Vditor.preview 调用失败:", previewError);
          throw new Error(`Markdown 渲染失败: ${previewError.message}`);
        }
        log2.debug("Markdown 预览渲染成功");
      } catch (err) {
        log2.error("Markdown 预览渲染失败:", err);
        error.value = err.message || t("textPreview.markdownRenderFailed");
        loading.value = false;
        rendered.value = false;
        emit("error", err);
      }
    };
    const scheduleRenderMarkdown = () => {
      renderVersion++;
      clearTimeout(renderTimer);
      renderTimer = setTimeout(() => {
        renderTimer = null;
        renderMarkdown();
      }, 80);
    };
    watch(() => props.content, scheduleRenderMarkdown);
    watch(() => props.darkMode, scheduleRenderMarkdown);
    onMounted(() => {
      if (props.content) {
        scheduleRenderMarkdown();
      }
    });
    onActivated(() => {
      isActive.value = true;
      if (props.content && !rendered.value) {
        scheduleRenderMarkdown();
      }
    });
    onDeactivated(() => {
      isActive.value = false;
      renderVersion++;
    });
    onBeforeUnmount(() => {
      isDestroyed.value = true;
      isActive.value = false;
      renderVersion++;
      clearTimeout(renderTimer);
      renderTimer = null;
      if (markdownContainer.value) {
        markdownContainer.value.innerHTML = "";
      }
      log2.debug("MarkdownDisplay组件销毁");
    });
    __expose({
      // 暂停渲染
      pause: () => {
        isActive.value = false;
        renderVersion++;
      },
      // 恢复渲染
      resume: () => {
        isActive.value = true;
        if (props.content && !rendered.value) {
          renderMarkdown();
        }
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["markdown-display", { "markdown-display-dark": __props.darkMode }])
      }, [
        createBaseVNode("div", {
          ref_key: "markdownContainer",
          ref: markdownContainer,
          class: normalizeClass(["vditor-reset markdown-body", { "opacity-0": !rendered.value }])
        }, null, 2),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
          createVNode(_sfc_main$1, {
            text: _ctx.$t("textPreview.loadingMarkdown"),
            "dark-mode": __props.darkMode,
            size: "xl",
            "icon-class": __props.darkMode ? "text-primary-500" : "text-primary-600"
          }, null, 8, ["text", "dark-mode", "icon-class"])
        ])) : createCommentVNode("", true),
        error.value ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createBaseVNode("p", _hoisted_3, toDisplayString(error.value), 1),
          createBaseVNode("pre", _hoisted_4, toDisplayString(__props.content), 1)
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
};
const MarkdownDisplay = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8b9d4433"]]);
export {
  MarkdownDisplay as M,
  TaskType as T,
  getZipJsDefaultConfig as g,
  useTaskManager as u
};
