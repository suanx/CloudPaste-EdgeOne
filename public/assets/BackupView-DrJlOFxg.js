import { U as get, T as post, aK as _export_sfc, j as createElementBlock, k as openBlock, l as createBaseVNode, n as normalizeClass, t as toDisplayString, p as createCommentVNode, q as withDirectives, ai as vModelRadio, K as Fragment, L as renderList, x as vModelCheckbox, e as useI18n, c as createLogger, ac as useThemeMode, g as ref, F as computed, o as onMounted } from "./index-BQxzU9F1.js";
import { d as formatLocalDateTimeWithSeconds, e as formatNowForFilename } from "./timeUtils-D81jJILb.js";
import { u as useAdminBase } from "./useAdminBase-CxkodUK-.js";
class BackupService {
  /**
   * 获取备份模块信息
   * @returns {Promise<Object>} 模块信息
   */
  static async getModules() {
    return await get("/admin/backup/modules");
  }
  /**
   * 创建备份
   * @param {Object} options - 备份选项
   * @param {string} options.backup_type - 备份类型 ('full' | 'modules')
   * @param {Array} options.selected_modules - 选中的模块（当backup_type为'modules'时）
   * @returns {Promise<Blob>} 备份文件
   */
  static async createBackup(options) {
    return post("/admin/backup/create", options, { responseType: "blob" });
  }
  /**
   * 还原备份
   * @param {File} file - 备份文件
   * @param {string} mode - 还原模式 ('overwrite' | 'merge')
   * @returns {Promise<Object>} 还原结果
   */
  static async restoreBackup(file, mode = "overwrite") {
    const formData = new FormData();
    formData.append("backup_file", file);
    formData.append("mode", mode);
    return post("/admin/backup/restore", formData);
  }
  /**
   * 还原预检查
   * @param {File} file - 备份文件
   * @param {string} mode - 还原模式 ('overwrite' | 'merge')
   * @param {Object} options
   * @param {boolean} options.skipIntegrityCheck - 是否跳过完整性检查
   * @param {boolean} options.preserveTimestamps - 是否保留时间戳
   * @returns {Promise<Object>} 预检查结果
   */
  static async previewRestoreBackup(file, mode = "overwrite", options = {}) {
    const { skipIntegrityCheck = false, preserveTimestamps = false } = options;
    const formData = new FormData();
    formData.append("backup_file", file);
    formData.append("mode", mode);
    formData.append("skipIntegrityCheck", skipIntegrityCheck ? "true" : "false");
    formData.append("preserveTimestamps", preserveTimestamps ? "true" : "false");
    return post("/admin/backup/restore/preview", formData);
  }
  /**
   * 下载备份文件
   * @param {Blob} blob - 备份数据
   * @param {string} filename - 文件名
   */
  static downloadBackup(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "backup.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  /**
   * 解析备份文件预览信息
   * @param {File} file - 备份文件
   * @returns {Promise<Object>} 备份预览信息
   */
  static async parseBackupPreview(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const backupData = JSON.parse(e.target.result);
          if (backupData.metadata) {
            resolve(backupData.metadata);
          } else {
            reject(new Error("备份文件格式错误：缺少元数据"));
          }
        } catch (error) {
          reject(new Error("备份文件格式错误：无效的JSON格式"));
        }
      };
      reader.onerror = () => {
        reject(new Error("文件读取失败"));
      };
      reader.readAsText(file);
    });
  }
}
function useAdminBackupService() {
  const getModules = () => {
    return BackupService.getModules();
  };
  const createBackup = (options) => {
    return BackupService.createBackup(options);
  };
  const restoreBackup = (file, mode = "overwrite") => {
    return BackupService.restoreBackup(file, mode);
  };
  const previewRestoreBackup = (file, mode = "overwrite", options = {}) => {
    return BackupService.previewRestoreBackup(file, mode, options);
  };
  return {
    getModules,
    createBackup,
    restoreBackup,
    previewRestoreBackup
  };
}
const _sfc_main = {
  name: "BackupView",
  setup() {
    const { t } = useI18n();
    const log = createLogger("BackupView");
    const { showSuccess, showError } = useAdminBase();
    const { getModules, createBackup: createBackupRequest, restoreBackup: restoreBackupRequest, previewRestoreBackup: previewRestoreBackupRequest } = useAdminBackupService();
    const { isDarkMode: darkMode } = useThemeMode();
    const showNotification = (message, type) => {
      if (type === "success") {
        showSuccess(message);
      } else if (type === "error") {
        showError(message);
      }
    };
    const backupType = ref("full");
    const selectedModules = ref([]);
    const selectedFile = ref(null);
    const backupPreview = ref(null);
    const restoreMode = ref("overwrite");
    const isCreating = ref(false);
    const isRestoring = ref(false);
    const logs = ref([]);
    const availableModules = ref({});
    const addLog = (message, type = "INFO") => {
      logs.value.push({
        timestamp: /* @__PURE__ */ new Date(),
        type,
        message
      });
    };
    const clearLogs = () => {
      logs.value = [];
    };
    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    const formatLogTime = (timestamp) => {
      return formatLocalDateTimeWithSeconds(timestamp);
    };
    const getLogTypeColor = (type) => {
      switch (type) {
        case "SUCCESS":
          return "text-green-600";
        case "WARNING":
          return "text-yellow-600";
        case "ERROR":
          return "text-red-600";
        case "INFO":
        default:
          return "text-blue-600";
      }
    };
    const getSelectedTablesCount = computed(() => {
      const tables = /* @__PURE__ */ new Set();
      selectedModules.value.forEach((moduleKey) => {
        const module = availableModules.value[moduleKey];
        if (module && module.tables) {
          module.tables.forEach((table) => {
            tables.add(table);
          });
        }
      });
      return tables.size;
    });
    const generateLocalTimestamp = () => {
      return formatNowForFilename();
    };
    const generateModuleBackupFilename = () => {
      const moduleAbbreviations = {
        text_management: "txt",
        file_management: "file",
        mount_management: "mount",
        storage_config: "storage",
        key_management: "key",
        account_management: "admin",
        system_settings: "sys"
      };
      const abbreviations = [...new Set(selectedModules.value)].map((moduleKey) => moduleAbbreviations[moduleKey] || moduleKey).sort().join("_");
      const timestamp = generateLocalTimestamp();
      return `cloudpaste-${abbreviations}-${timestamp}.json`;
    };
    const loadModuleInfo = async () => {
      try {
        addLog(t("admin.backup.logs.gettingModuleInfo"), "INFO");
        const response = await getModules();
        const modules = response.data.modules;
        for (const [key, module] of Object.entries(modules)) {
          module.name = t(`admin.backup.modules.${key}.name`);
          module.description = t(`admin.backup.modules.${key}.description`);
        }
        availableModules.value = modules;
        addLog(t("admin.backup.logs.moduleInfoSuccess"), "SUCCESS");
      } catch (error) {
        log.error("获取模块信息失败:", error);
        addLog(t("admin.backup.errors.getModuleInfoFailed", { error: error.message }), "ERROR");
        showNotification(t("admin.backup.errors.getModuleInfoFailed", { error: error.message }), "error");
      }
    };
    const createBackup = async () => {
      if (backupType.value === "full") {
        await createFullBackup();
      } else if (backupType.value === "modules") {
        await createModuleBackup();
      }
    };
    const createFullBackup = async () => {
      isCreating.value = true;
      try {
        addLog(t("admin.backup.logs.startFullBackup"), "INFO");
        const blob = await createBackupRequest({
          backup_type: "full"
        });
        const backupText = await blob.text();
        const backupData = JSON.parse(backupText);
        if (backupData.metadata && backupData.metadata.tables) {
          for (const [tableName, recordCount] of Object.entries(backupData.metadata.tables)) {
            addLog(t("admin.backup.logs.tableExported", { table: tableName, count: recordCount }), recordCount > 0 ? "SUCCESS" : "INFO");
          }
        }
        addLog(t("admin.backup.logs.backupComplete", { count: backupData.metadata.total_records }), "SUCCESS");
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const timestamp = generateLocalTimestamp();
        link.download = `cloudpaste-full-${timestamp}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        addLog(t("admin.backup.logs.downloadStarted"), "SUCCESS");
        showNotification(t("admin.backup.success.backupCreated"), "success");
      } catch (error) {
        log.error("创建备份失败:", error);
        addLog(t("admin.backup.errors.backupFailed", { error: error.message }), "ERROR");
        showNotification(t("admin.backup.errors.backupFailed", { error: error.message }), "error");
      } finally {
        isCreating.value = false;
      }
    };
    const createModuleBackup = async () => {
      if (selectedModules.value.length === 0) {
        addLog(t("admin.backup.errors.selectAtLeastOneModule"), "ERROR");
        return;
      }
      isCreating.value = true;
      try {
        addLog(t("admin.backup.logs.startModuleBackup", { count: selectedModules.value.length }), "INFO");
        const blob = await createBackupRequest({
          backup_type: "modules",
          selected_modules: selectedModules.value
        });
        const backupText = await blob.text();
        const backupData = JSON.parse(backupText);
        if (backupData.metadata && backupData.metadata.tables) {
          for (const [tableName, recordCount] of Object.entries(backupData.metadata.tables)) {
            addLog(t("admin.backup.logs.tableExported", { table: tableName, count: recordCount }), recordCount > 0 ? "SUCCESS" : "INFO");
          }
        }
        addLog(t("admin.backup.logs.moduleBackupComplete", { count: backupData.metadata.total_records }), "SUCCESS");
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = generateModuleBackupFilename();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        addLog(t("admin.backup.logs.downloadStarted"), "SUCCESS");
        showNotification(t("admin.backup.success.backupCreated"), "success");
      } catch (error) {
        log.error("创建备份失败:", error);
        addLog(t("admin.backup.errors.backupFailed", { error: error.message }), "ERROR");
        showNotification(t("admin.backup.errors.backupFailed", { error: error.message }), "error");
      } finally {
        isCreating.value = false;
      }
    };
    const handleFileSelect = (event) => {
      const file = event.target.files[0];
      if (file) {
        selectedFile.value = file;
        addLog(`${t("admin.backup.restoreOperations.selectFile")}: ${file.name}`, "INFO");
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const backup = JSON.parse(e.target.result);
            backupPreview.value = backup;
            addLog(t("admin.backup.logs.backupFileParsed"), "SUCCESS");
          } catch (error) {
            addLog(t("admin.backup.errors.invalidBackupFile"), "ERROR");
            backupPreview.value = null;
          }
        };
        reader.readAsText(file);
      }
    };
    const restoreBackup = async () => {
      if (!selectedFile.value) {
        addLog(t("admin.backup.errors.fileSelectRequired"), "ERROR");
        return;
      }
      isRestoring.value = true;
      try {
        addLog(t("admin.backup.logs.previewStart", { mode: t(`admin.backup.restoreOperations.${restoreMode.value}Mode`) }), "INFO");
        const previewResponse = await previewRestoreBackupRequest(selectedFile.value, restoreMode.value);
        const previewOk = Boolean(previewResponse?.data?.ok);
        const preview = previewResponse?.data?.preview;
        if (!previewOk) {
          addLog(t("admin.backup.logs.previewFailed"), "ERROR");
          if (preview?.issues && Array.isArray(preview.issues)) {
            for (const issue of preview.issues) {
              const msg = issue?.message || t("admin.backup.logs.previewIssueUnknown");
              addLog(t("admin.backup.logs.previewIssue", { message: msg }), issue?.level === "error" ? "ERROR" : "WARNING");
            }
          }
          showNotification(t("admin.backup.errors.restoreFailed", { error: t("admin.backup.logs.previewBlockedRestore") }), "error");
          return;
        }
        addLog(t("admin.backup.logs.previewPassed"), "SUCCESS");
        if (preview?.integrityIssues && Array.isArray(preview.integrityIssues) && preview.integrityIssues.length > 0) {
          addLog(t("admin.backup.logs.previewIntegrityIssues", { count: preview.integrityIssues.length }), "WARNING");
          for (const issue of preview.integrityIssues) {
            const msg = issue?.message || t("admin.backup.logs.previewIssueUnknown");
            addLog(t("admin.backup.logs.serverWarning", { message: msg }), "WARNING");
          }
        }
        addLog(t("admin.backup.logs.startRestore", { mode: t(`admin.backup.restoreOperations.${restoreMode.value}Mode`) }), "INFO");
        const response = await restoreBackupRequest(selectedFile.value, restoreMode.value);
        if (response?.data?.integrity_issues && Array.isArray(response.data.integrity_issues) && response.data.integrity_issues.length > 0) {
          addLog(t("admin.backup.logs.restoreIntegrityIssues", { count: response.data.integrity_issues.length }), "WARNING");
          for (const issue of response.data.integrity_issues) {
            const msg = issue?.message || t("admin.backup.logs.previewIssueUnknown");
            addLog(t("admin.backup.logs.serverWarning", { message: msg }), "WARNING");
          }
        }
        if (response.data && response.data.results) {
          for (const [tableName, stats] of Object.entries(response.data.results)) {
            if (stats.expected > 0) {
              if (restoreMode.value === "overwrite") {
                addLog(
                  t("admin.backup.logs.tableRestoredOverwrite", {
                    table: tableName,
                    success: stats.success,
                    expected: stats.expected
                  }),
                  stats.failed > 0 ? "WARNING" : "SUCCESS"
                );
              } else {
                addLog(
                  t("admin.backup.logs.tableRestored", {
                    table: tableName,
                    added: stats.success,
                    ignored: stats.ignored,
                    expected: stats.expected
                  }),
                  stats.failed > 0 ? "WARNING" : "SUCCESS"
                );
              }
            }
          }
        }
        if (restoreMode.value === "overwrite") {
          addLog(t("admin.backup.logs.restoreCompleteOverwrite", { count: response.data.total_records }), "SUCCESS");
        } else {
          const totalSuccess = Object.values(response.data.results).reduce((sum, r) => sum + r.success, 0);
          const totalIgnored = Object.values(response.data.results).reduce((sum, r) => sum + r.ignored, 0);
          addLog(t("admin.backup.logs.restoreComplete", { added: totalSuccess, ignored: totalIgnored }), "SUCCESS");
        }
        showNotification(t("admin.backup.success.dataRestored"), "success");
      } catch (error) {
        log.error("恢复失败:", error);
        addLog(t("admin.backup.errors.restoreFailed", { error: error.message }), "ERROR");
        showNotification(t("admin.backup.errors.restoreFailed", { error: error.message }), "error");
      } finally {
        isRestoring.value = false;
      }
    };
    onMounted(() => {
      loadModuleInfo();
    });
    return {
      // 主题
      darkMode,
      // 响应式数据
      backupType,
      selectedModules,
      selectedFile,
      backupPreview,
      restoreMode,
      isCreating,
      isRestoring,
      logs,
      availableModules,
      // 计算属性
      getSelectedTablesCount,
      generateLocalTimestamp,
      generateModuleBackupFilename,
      // 方法
      createBackup,
      createFullBackup,
      createModuleBackup,
      handleFileSelect,
      restoreBackup,
      clearLogs,
      formatFileSize,
      formatLogTime,
      getLogTypeColor,
      showNotification
    };
  }
};
const _hoisted_1 = { class: "backup-management" };
const _hoisted_2 = { class: "mb-6" };
const _hoisted_3 = { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" };
const _hoisted_4 = { class: "backup-type-selection mb-4" };
const _hoisted_5 = { class: "space-y-3" };
const _hoisted_6 = { class: "flex items-start" };
const _hoisted_7 = { class: "flex items-start" };
const _hoisted_8 = {
  key: 0,
  class: "module-selection mb-4"
};
const _hoisted_9 = { class: "flex items-center justify-between mb-3" };
const _hoisted_10 = { class: "max-h-64 overflow-y-auto space-y-2 custom-scrollbar" };
const _hoisted_11 = { class: "flex items-center" };
const _hoisted_12 = ["value"];
const _hoisted_13 = { class: "backup-actions" };
const _hoisted_14 = ["disabled"];
const _hoisted_15 = { class: "restore-controls space-y-4 mb-4" };
const _hoisted_16 = {
  key: 0,
  class: "space-y-4"
};
const _hoisted_17 = { class: "flex items-center space-x-4" };
const _hoisted_18 = { class: "flex items-center" };
const _hoisted_19 = { class: "text-sm" };
const _hoisted_20 = { class: "flex items-center" };
const _hoisted_21 = { class: "text-sm" };
const _hoisted_22 = ["disabled"];
const _hoisted_23 = { class: "flex items-center justify-between mb-4" };
const _hoisted_24 = {
  key: 1,
  class: "p-3 space-y-1"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("h2", {
        class: normalizeClass(["text-2xl font-bold", $setup.darkMode ? "text-white" : "text-gray-900"])
      }, toDisplayString(_ctx.$t("admin.backup.title")), 3),
      createBaseVNode("p", {
        class: normalizeClass(["mt-2 text-sm", $setup.darkMode ? "text-gray-400" : "text-gray-600"])
      }, toDisplayString(_ctx.$t("admin.backup.subtitle")), 3)
    ]),
    createBaseVNode("div", _hoisted_3, [
      createBaseVNode("div", {
        class: normalizeClass(["p-6 rounded-lg border shadow hover:shadow-md transition-shadow", $setup.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
      }, [
        createBaseVNode("h3", {
          class: normalizeClass(["text-lg font-semibold mb-4", $setup.darkMode ? "text-white" : "text-gray-900"])
        }, toDisplayString(_ctx.$t("admin.backup.backupOperations.title")), 3),
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("h4", {
            class: normalizeClass(["text-sm font-medium mb-3", $setup.darkMode ? "text-white" : "text-gray-900"])
          }, toDisplayString(_ctx.$t("admin.backup.backupOperations.backupType")), 3),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("label", _hoisted_6, [
              withDirectives(createBaseVNode("input", {
                type: "radio",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.backupType = $event),
                value: "full",
                class: "mt-1 mr-3"
              }, null, 512), [
                [vModelRadio, $setup.backupType]
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("div", {
                  class: normalizeClass(["font-medium", $setup.darkMode ? "text-white" : "text-gray-900"])
                }, toDisplayString(_ctx.$t("admin.backup.backupOperations.fullBackup.title")), 3),
                createBaseVNode("div", {
                  class: normalizeClass(["text-sm", $setup.darkMode ? "text-gray-400" : "text-gray-600"])
                }, toDisplayString(_ctx.$t("admin.backup.backupOperations.fullBackup.description")), 3)
              ])
            ]),
            createBaseVNode("label", _hoisted_7, [
              withDirectives(createBaseVNode("input", {
                type: "radio",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.backupType = $event),
                value: "modules",
                class: "mt-1 mr-3"
              }, null, 512), [
                [vModelRadio, $setup.backupType]
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("div", {
                  class: normalizeClass(["font-medium", $setup.darkMode ? "text-white" : "text-gray-900"])
                }, toDisplayString(_ctx.$t("admin.backup.backupOperations.moduleBackup.title")), 3),
                createBaseVNode("div", {
                  class: normalizeClass(["text-sm", $setup.darkMode ? "text-gray-400" : "text-gray-600"])
                }, toDisplayString(_ctx.$t("admin.backup.backupOperations.moduleBackup.description")), 3)
              ])
            ])
          ])
        ]),
        $setup.backupType === "modules" ? (openBlock(), createElementBlock("div", _hoisted_8, [
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("h4", {
              class: normalizeClass(["text-sm font-medium", $setup.darkMode ? "text-white" : "text-gray-900"])
            }, toDisplayString(_ctx.$t("admin.backup.backupOperations.selectModules")), 3),
            $setup.selectedModules.length > 0 ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(["text-xs px-2 py-1 rounded", $setup.darkMode ? "bg-blue-900/20 text-blue-300" : "bg-blue-50 text-blue-700"])
            }, toDisplayString(_ctx.$t("admin.backup.backupOperations.selectedModules", { count: $setup.selectedModules.length })), 3)) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_10, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.availableModules, (module, key) => {
              return openBlock(), createElementBlock("label", {
                key,
                class: normalizeClass(["flex items-center justify-between p-3 rounded border cursor-pointer transition-all", [
                  $setup.selectedModules.includes(key) ? $setup.darkMode ? "border-blue-600 bg-blue-900/20" : "border-blue-500 bg-blue-50" : $setup.darkMode ? "border-gray-600 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-50"
                ]])
              }, [
                createBaseVNode("div", _hoisted_11, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.selectedModules = $event),
                    value: key,
                    class: "mr-3"
                  }, null, 8, _hoisted_12), [
                    [vModelCheckbox, $setup.selectedModules]
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("div", {
                      class: normalizeClass(["font-medium", $setup.darkMode ? "text-white" : "text-gray-900"])
                    }, toDisplayString(module.name), 3),
                    createBaseVNode("div", {
                      class: normalizeClass(["text-sm mt-1", $setup.darkMode ? "text-gray-400" : "text-gray-600"])
                    }, toDisplayString(module.description), 3)
                  ])
                ]),
                createBaseVNode("span", {
                  class: normalizeClass(["text-xs px-2 py-1 rounded", $setup.darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"])
                }, toDisplayString(_ctx.$t("admin.backup.logs.recordsCount", { count: module.record_count || 0 })), 3)
              ], 2);
            }), 128))
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_13, [
          createBaseVNode("button", {
            onClick: _cache[3] || (_cache[3] = (...args) => $setup.createBackup && $setup.createBackup(...args)),
            disabled: $setup.isCreating || $setup.backupType === "modules" && $setup.selectedModules.length === 0,
            class: "w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-md transition-colors"
          }, toDisplayString($setup.isCreating ? _ctx.$t("admin.backup.backupOperations.creating") : _ctx.$t("admin.backup.backupOperations.createBackup")), 9, _hoisted_14)
        ])
      ], 2),
      createBaseVNode("div", {
        class: normalizeClass(["p-6 rounded-lg border shadow hover:shadow-md transition-shadow", $setup.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
      }, [
        createBaseVNode("h3", {
          class: normalizeClass(["text-lg font-semibold mb-4", $setup.darkMode ? "text-white" : "text-gray-900"])
        }, toDisplayString(_ctx.$t("admin.backup.restoreOperations.title")), 3),
        createBaseVNode("div", _hoisted_15, [
          createBaseVNode("input", {
            type: "file",
            onChange: _cache[4] || (_cache[4] = (...args) => $setup.handleFileSelect && $setup.handleFileSelect(...args)),
            accept: ".json",
            ref: "fileInput",
            class: "hidden"
          }, null, 544),
          createBaseVNode("button", {
            onClick: _cache[5] || (_cache[5] = ($event) => _ctx.$refs.fileInput.click()),
            class: "w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition-colors"
          }, toDisplayString(_ctx.$t("admin.backup.restoreOperations.selectFile")), 1),
          $setup.selectedFile ? (openBlock(), createElementBlock("div", _hoisted_16, [
            createBaseVNode("div", {
              class: normalizeClass(["p-3 rounded border", $setup.darkMode ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"])
            }, [
              createBaseVNode("span", {
                class: normalizeClass(["text-sm", $setup.darkMode ? "text-gray-300" : "text-gray-700"])
              }, toDisplayString($setup.selectedFile.name) + " (" + toDisplayString($setup.formatFileSize($setup.selectedFile.size)) + ") ", 3)
            ], 2),
            createBaseVNode("div", _hoisted_17, [
              createBaseVNode("span", {
                class: normalizeClass(["text-sm font-medium", $setup.darkMode ? "text-white" : "text-gray-900"])
              }, toDisplayString(_ctx.$t("admin.backup.restoreOperations.restoreMode")), 3),
              createBaseVNode("label", _hoisted_18, [
                withDirectives(createBaseVNode("input", {
                  type: "radio",
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.restoreMode = $event),
                  value: "overwrite",
                  class: "mr-1"
                }, null, 512), [
                  [vModelRadio, $setup.restoreMode]
                ]),
                createBaseVNode("span", _hoisted_19, toDisplayString(_ctx.$t("admin.backup.restoreOperations.overwriteMode")), 1)
              ]),
              createBaseVNode("label", _hoisted_20, [
                withDirectives(createBaseVNode("input", {
                  type: "radio",
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.restoreMode = $event),
                  value: "merge",
                  class: "mr-1"
                }, null, 512), [
                  [vModelRadio, $setup.restoreMode]
                ]),
                createBaseVNode("span", _hoisted_21, toDisplayString(_ctx.$t("admin.backup.restoreOperations.mergeMode")), 1)
              ])
            ]),
            createBaseVNode("button", {
              onClick: _cache[8] || (_cache[8] = (...args) => $setup.restoreBackup && $setup.restoreBackup(...args)),
              disabled: $setup.isRestoring,
              class: "w-full px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-medium rounded-md transition-colors"
            }, toDisplayString($setup.isRestoring ? _ctx.$t("admin.backup.restoreOperations.restoring") : _ctx.$t("admin.backup.restoreOperations.executeRestore")), 9, _hoisted_22)
          ])) : createCommentVNode("", true)
        ])
      ], 2)
    ]),
    createBaseVNode("div", {
      class: normalizeClass(["logs-panel p-6 rounded-lg border", $setup.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
    }, [
      createBaseVNode("div", _hoisted_23, [
        createBaseVNode("h3", {
          class: normalizeClass(["text-lg font-semibold", $setup.darkMode ? "text-white" : "text-gray-900"])
        }, toDisplayString(_ctx.$t("admin.backup.operationLogs")), 3),
        createBaseVNode("button", {
          onClick: _cache[9] || (_cache[9] = (...args) => $setup.clearLogs && $setup.clearLogs(...args)),
          class: normalizeClass(["text-sm px-3 py-1 rounded border", $setup.darkMode ? "border-gray-600 text-gray-400 hover:bg-gray-700" : "border-gray-300 text-gray-600 hover:bg-gray-50"])
        }, toDisplayString(_ctx.$t("admin.backup.logs.clearLogs")), 3)
      ]),
      createBaseVNode("div", {
        class: normalizeClass(["logs-container h-64 overflow-y-auto border rounded", $setup.darkMode ? "border-gray-600 bg-gray-900" : "border-gray-300 bg-gray-50"])
      }, [
        $setup.logs.length === 0 ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["flex items-center justify-center h-full text-sm", $setup.darkMode ? "text-gray-500" : "text-gray-500"])
        }, "暂无操作日志", 2)) : (openBlock(), createElementBlock("div", _hoisted_24, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.logs, (log, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "flex items-start text-sm font-mono"
            }, [
              createBaseVNode("span", {
                class: normalizeClass(["mr-2 font-medium", $setup.getLogTypeColor(log.type)])
              }, " [" + toDisplayString(log.type) + "] ", 3),
              createBaseVNode("span", {
                class: normalizeClass(["mr-2 text-xs", $setup.darkMode ? "text-gray-500" : "text-gray-500"])
              }, toDisplayString($setup.formatLogTime(log.timestamp)), 3),
              createBaseVNode("span", {
                class: normalizeClass($setup.darkMode ? "text-gray-300" : "text-gray-700")
              }, toDisplayString(log.message), 3)
            ]);
          }), 128))
        ]))
      ], 2)
    ], 2)
  ]);
}
const BackupView = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  BackupView as default
};
