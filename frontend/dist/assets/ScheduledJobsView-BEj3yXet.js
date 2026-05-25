import { aK as _export_sfc, e as useI18n, i as useLocalStorage, g as ref, w as watch, j as createElementBlock, p as createCommentVNode, k as openBlock, l as createBaseVNode, n as normalizeClass, t as toDisplayString, y as unref, z as createVNode, G as IconClose, aL as IconExclamation, q as withDirectives, A as createTextVNode, bc as IconSettings, ao as IconChevronDown, aq as vShow, bb as IconClock, J as IconRefresh, K as Fragment, L as renderList, aB as IconXCircle, az as IconTaskList, m as withModifiers, d as useRouter, ac as useThemeMode, c as createLogger, aw as useIntervalFn, o as onMounted, ax as onUnmounted, F as computed, a$ as h, aA as IconCheckCircle, b7 as IconDelete, bd as IconFolderPlus, ae as vModelSelect, be as isRef, v as vModelText, V as IconSearch, aD as normalizeStyle, M as createBlock, aE as withCtx, bf as IconArrowUp, bg as IconEye, bh as IconRename } from "./index-BQxzU9F1.js";
import { u as useScheduledJobs } from "./useScheduledJobs-DOzm9zah.js";
import { u as useConfirmDialog, _ as _sfc_main$3, c as createConfirmFn } from "./useConfirmDialog-c5dcTgIB.js";
import { b as formatDateTimeWithSeconds, c as formatDateTime } from "./timeUtils-D81jJILb.js";
import { _ as _sfc_main$2 } from "./AdminTable-CrUS055e.js";
const _hoisted_1$1 = { class: "flex items-start gap-2" };
const _hoisted_2$1 = { class: "font-medium text-sm" };
const _hoisted_3$1 = { class: "text-xs mt-1 opacity-80" };
const _hoisted_4$1 = { class: "mb-5" };
const _hoisted_5$1 = { class: "mb-3" };
const _hoisted_6$1 = { class: "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm" };
const _hoisted_7$1 = { class: "mt-1" };
const _hoisted_8$1 = {
  key: 1,
  class: "mb-5"
};
const _hoisted_9$1 = { class: "flex items-center gap-2" };
const _hoisted_10$1 = { class: "mt-2 overflow-hidden transition-all duration-200" };
const _hoisted_11$1 = { class: "flex items-center gap-2" };
const _hoisted_12$1 = { class: "mt-3 overflow-hidden transition-all duration-200" };
const _hoisted_13$1 = {
  key: 0,
  class: "flex items-center justify-center py-8"
};
const _hoisted_14$1 = {
  key: 1,
  class: "space-y-3"
};
const _hoisted_15$1 = {
  class: "relative flex flex-col items-center",
  style: { "width": "24px" }
};
const _hoisted_16$1 = { class: "relative z-10 mt-2" };
const _hoisted_17$1 = { class: "flex flex-wrap items-center gap-2 mb-2" };
const _hoisted_18$1 = { class: "flex items-start gap-1.5" };
const _hoisted_19$1 = { class: "font-medium" };
const _hoisted_20$1 = {
  key: 2,
  class: "flex flex-col items-center justify-center py-10"
};
const _hoisted_21$1 = { class: "relative mb-3" };
const SETTINGS_KEY$1 = "scheduled-jobs-view-settings";
const _sfc_main$1 = {
  __name: "ScheduledJobDetailModal",
  props: {
    show: {
      type: Boolean,
      required: true
    },
    job: {
      type: Object,
      default: null
    },
    runs: {
      type: Array,
      default: () => []
    },
    runsLoading: {
      type: Boolean,
      default: false
    },
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  setup(__props) {
    const { t } = useI18n();
    const settings = useLocalStorage(SETTINGS_KEY$1, {});
    const configCollapsed = ref(settings.value?.modalConfigCollapsed ?? true);
    const historyCollapsed = ref(settings.value?.modalHistoryCollapsed ?? false);
    watch(configCollapsed, (newValue) => {
      settings.value = { ...settings.value || {}, modalConfigCollapsed: newValue };
    });
    watch(historyCollapsed, (newValue) => {
      settings.value = { ...settings.value || {}, modalHistoryCollapsed: newValue };
    });
    const formatDuration = (ms) => {
      if (!ms && ms !== 0) return "-";
      if (ms < 1e3) return `${ms}ms`;
      return `${(ms / 1e3).toFixed(2)}s`;
    };
    const formatNextRun = (job) => {
      if (!job.nextRunAfter) return t("admin.scheduledJobs.detail.notScheduled");
      return formatDateTimeWithSeconds(job.nextRunAfter);
    };
    return (_ctx, _cache) => {
      return __props.show && __props.job ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50 overflow-y-auto",
        onClick: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("close"))
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden", __props.darkMode ? "bg-gray-800" : "bg-white"]),
          onClick: _cache[3] || (_cache[3] = withModifiers(() => {
          }, ["stop"]))
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["px-5 py-4 border-b flex justify-between items-center", __props.darkMode ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50/50"])
          }, [
            createBaseVNode("h3", {
              class: normalizeClass(["text-lg font-semibold", __props.darkMode ? "text-white" : "text-gray-900"])
            }, toDisplayString(unref(t)("admin.scheduledJobs.detail.title")), 3),
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close")),
              class: normalizeClass(["flex-shrink-0 p-1 rounded-lg transition-colors", __props.darkMode ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"])
            }, [
              createVNode(unref(IconClose), { size: "md" })
            ], 2)
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass(["p-5 max-h-[70vh] overflow-y-auto", [
              __props.darkMode ? "text-gray-300 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800" : "text-gray-600 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            ]])
          }, [
            __props.job.handlerExists === false ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["mb-4 p-3 rounded-lg", __props.darkMode ? "bg-orange-900/30 text-orange-300 border border-orange-700" : "bg-orange-50 text-orange-800 border border-orange-200"])
            }, [
              createBaseVNode("div", _hoisted_1$1, [
                createVNode(unref(IconExclamation), {
                  size: "md",
                  class: "flex-shrink-0 mt-0.5"
                }),
                createBaseVNode("div", null, [
                  createBaseVNode("p", _hoisted_2$1, toDisplayString(unref(t)("admin.scheduledJobs.warnings.handlerNotFound")), 1),
                  createBaseVNode("p", _hoisted_3$1, toDisplayString(unref(t)("admin.scheduledJobs.warnings.handlerNotFoundHint")), 1)
                ])
              ])
            ], 2)) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_4$1, [
              createBaseVNode("div", _hoisted_5$1, [
                createBaseVNode("h4", {
                  class: normalizeClass(["text-base font-semibold mb-1", __props.darkMode ? "text-white" : "text-gray-900"])
                }, toDisplayString(__props.job.taskId), 3),
                __props.job.description ? (openBlock(), createElementBlock("p", {
                  key: 0,
                  class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                }, toDisplayString(__props.job.description), 3)) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_6$1, [
                createBaseVNode("div", null, [
                  createBaseVNode("span", {
                    class: normalizeClass(["font-medium", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                  }, toDisplayString(unref(t)("admin.scheduledJobs.detail.handlerType")), 3),
                  createBaseVNode("div", {
                    class: normalizeClass(["mt-1 font-mono", __props.darkMode ? "text-gray-200" : "text-gray-900"])
                  }, toDisplayString(__props.job.handlerId), 3)
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("span", {
                    class: normalizeClass(["font-medium", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                  }, toDisplayString(unref(t)("admin.scheduledJobs.detail.status")), 3),
                  createBaseVNode("div", _hoisted_7$1, [
                    createBaseVNode("span", {
                      class: normalizeClass([
                        "inline-block px-2 py-0.5 rounded-full text-xs font-medium",
                        __props.job.enabled ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" : __props.darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"
                      ])
                    }, toDisplayString(__props.job.enabled ? unref(t)("admin.scheduledJobs.status.enabled") : unref(t)("admin.scheduledJobs.status.disabled")), 3)
                  ])
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("span", {
                    class: normalizeClass(["font-medium", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                  }, toDisplayString(unref(t)("admin.scheduledJobs.detail.lastRun")), 3),
                  createBaseVNode("div", {
                    class: normalizeClass(["mt-1", __props.darkMode ? "text-gray-200" : "text-gray-900"])
                  }, toDisplayString(__props.job.lastRunFinishedAt ? unref(formatDateTimeWithSeconds)(__props.job.lastRunFinishedAt) : unref(t)("admin.scheduledJobs.card.never")), 3)
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("span", {
                    class: normalizeClass(["font-medium", __props.darkMode ? "text-gray-400" : "text-gray-600"])
                  }, toDisplayString(unref(t)("admin.scheduledJobs.detail.nextRun")), 3),
                  createBaseVNode("div", {
                    class: normalizeClass(["mt-1", __props.darkMode ? "text-gray-200" : "text-gray-900"])
                  }, toDisplayString(formatNextRun(__props.job)), 3)
                ])
              ])
            ]),
            __props.job.config && Object.keys(__props.job.config).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_8$1, [
              createBaseVNode("button", {
                onClick: _cache[1] || (_cache[1] = ($event) => configCollapsed.value = !configCollapsed.value),
                class: normalizeClass(["w-full text-sm font-semibold flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg transition-colors border", __props.darkMode ? "text-gray-200 hover:bg-gray-700/30 border-gray-700" : "text-gray-800 hover:bg-gray-50 border-gray-200"])
              }, [
                createBaseVNode("div", _hoisted_9$1, [
                  createVNode(unref(IconSettings), { size: "sm" }),
                  createTextVNode(" " + toDisplayString(unref(t)("admin.scheduledJobs.detail.configParams")), 1)
                ]),
                createVNode(unref(IconChevronDown), {
                  size: "sm",
                  class: normalizeClass(["transition-transform duration-200", { "rotate-180": !configCollapsed.value }])
                }, null, 8, ["class"])
              ], 2),
              withDirectives(createBaseVNode("div", _hoisted_10$1, [
                createBaseVNode("pre", {
                  class: normalizeClass(["text-xs p-4 rounded-lg overflow-x-auto", __props.darkMode ? "bg-gray-900 text-gray-300 border border-gray-700" : "bg-gray-50 text-gray-700 border border-gray-200"])
                }, toDisplayString(JSON.stringify(__props.job.config, null, 2)), 3)
              ], 512), [
                [vShow, !configCollapsed.value]
              ])
            ])) : createCommentVNode("", true),
            createBaseVNode("div", null, [
              createBaseVNode("button", {
                onClick: _cache[2] || (_cache[2] = ($event) => historyCollapsed.value = !historyCollapsed.value),
                class: normalizeClass(["w-full text-sm font-semibold flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg transition-colors border", __props.darkMode ? "text-gray-200 hover:bg-gray-700/30 border-gray-700" : "text-gray-800 hover:bg-gray-50 border-gray-200"])
              }, [
                createBaseVNode("div", _hoisted_11$1, [
                  createVNode(unref(IconClock), {
                    size: "sm",
                    class: "flex-shrink-0"
                  }),
                  createTextVNode(" " + toDisplayString(unref(t)("admin.scheduledJobs.detail.recentRuns")) + " ", 1),
                  __props.runs.length > 0 ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: normalizeClass(["text-xs px-2 py-0.5 rounded-full font-medium", __props.darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"])
                  }, toDisplayString(__props.runs.length), 3)) : createCommentVNode("", true)
                ]),
                createVNode(unref(IconChevronDown), {
                  size: "sm",
                  class: normalizeClass(["transition-transform duration-200", { "rotate-180": !historyCollapsed.value }])
                }, null, 8, ["class"])
              ], 2),
              withDirectives(createBaseVNode("div", _hoisted_12$1, [
                __props.runsLoading ? (openBlock(), createElementBlock("div", _hoisted_13$1, [
                  createVNode(unref(IconRefresh), {
                    size: "lg",
                    class: normalizeClass(["animate-spin", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                  }, null, 8, ["class"])
                ])) : __props.runs.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_14$1, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(__props.runs, (run, index) => {
                    return openBlock(), createElementBlock("div", {
                      key: run.id,
                      class: "relative flex gap-4 group"
                    }, [
                      createBaseVNode("div", _hoisted_15$1, [
                        index < __props.runs.length - 1 ? (openBlock(), createElementBlock("div", {
                          key: 0,
                          class: normalizeClass(["absolute top-6 left-1/2 -translate-x-1/2 w-px h-full", __props.darkMode ? "bg-gradient-to-b from-gray-600/30 via-gray-600/15 to-transparent" : "bg-gradient-to-b from-gray-400/40 via-gray-400/20 to-transparent"])
                        }, null, 2)) : createCommentVNode("", true),
                        createBaseVNode("div", _hoisted_16$1, [
                          createBaseVNode("div", {
                            class: normalizeClass(["absolute inset-0 w-6 h-6 -left-1.5 -top-1.5 rounded-full transition-all duration-300", [
                              run.status === "success" ? __props.darkMode ? "bg-emerald-400/8" : "bg-emerald-400/12" : run.status === "failure" ? __props.darkMode ? "bg-rose-400/8" : "bg-rose-400/12" : __props.darkMode ? "bg-amber-400/8" : "bg-amber-400/12"
                            ]])
                          }, null, 2),
                          createBaseVNode("div", {
                            class: normalizeClass(["relative w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-125", [
                              run.status === "success" ? __props.darkMode ? "bg-emerald-400/60 ring-2 ring-emerald-400/20" : "bg-emerald-500/50 ring-2 ring-emerald-500/15" : run.status === "failure" ? __props.darkMode ? "bg-rose-400/60 ring-2 ring-rose-400/20" : "bg-rose-500/50 ring-2 ring-rose-500/15" : __props.darkMode ? "bg-amber-400/60 ring-2 ring-amber-400/20" : "bg-amber-500/50 ring-2 ring-amber-500/15"
                            ]])
                          }, _cache[5] || (_cache[5] = [
                            createBaseVNode("div", { class: "absolute inset-0.5 rounded-full bg-white/30" }, null, -1)
                          ]), 2),
                          index === 0 ? (openBlock(), createElementBlock("div", {
                            key: 0,
                            class: normalizeClass(["absolute inset-0 w-6 h-6 -left-1.5 -top-1.5 rounded-full animate-ping", [
                              run.status === "success" ? __props.darkMode ? "bg-emerald-400/15" : "bg-emerald-500/20" : run.status === "failure" ? __props.darkMode ? "bg-rose-400/15" : "bg-rose-500/20" : __props.darkMode ? "bg-amber-400/15" : "bg-amber-500/20"
                            ]])
                          }, null, 2)) : createCommentVNode("", true)
                        ])
                      ]),
                      createBaseVNode("div", {
                        class: normalizeClass(["flex-1 rounded-lg border p-3 transition-all duration-200", __props.darkMode ? "bg-gray-700/20 border-gray-600/50 hover:bg-gray-700/30 hover:border-gray-600 hover:shadow-md" : "bg-gray-50/50 border-gray-200 hover:bg-white hover:shadow-md hover:border-gray-300"])
                      }, [
                        createBaseVNode("div", _hoisted_17$1, [
                          createBaseVNode("span", {
                            class: normalizeClass(["text-xs font-semibold", __props.darkMode ? "text-gray-200" : "text-gray-800"])
                          }, toDisplayString(unref(formatDateTimeWithSeconds)(run.startedAt)), 3),
                          createBaseVNode("span", {
                            class: normalizeClass(["text-xs px-2.5 py-0.5 rounded-full font-medium", [
                              run.status === "success" ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" : run.status === "failure" ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300"
                            ]])
                          }, toDisplayString(unref(t)(`admin.scheduledJobs.runStatus.${run.status}`)), 3),
                          createBaseVNode("span", {
                            class: normalizeClass(["text-xs font-mono px-2 py-0.5 rounded", __props.darkMode ? "bg-gray-800/50 text-gray-400" : "bg-gray-100 text-gray-600"])
                          }, toDisplayString(formatDuration(run.durationMs)), 3)
                        ]),
                        run.summary ? (openBlock(), createElementBlock("div", {
                          key: 0,
                          class: normalizeClass(["text-xs leading-relaxed", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                        }, toDisplayString(run.summary), 3)) : createCommentVNode("", true),
                        run.totalSessions != null ? (openBlock(), createElementBlock("div", {
                          key: 1,
                          class: normalizeClass(["text-xs mt-1", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                        }, toDisplayString(unref(t)("admin.scheduledJobs.detail.totalSessions", { count: run.totalSessions })), 3)) : createCommentVNode("", true),
                        run.errorMessage ? (openBlock(), createElementBlock("div", {
                          key: 2,
                          class: normalizeClass(["text-xs p-2.5 rounded-md border mt-2", __props.darkMode ? "bg-red-900/20 text-red-300 border-red-800/50" : "bg-red-50 text-red-700 border-red-200"])
                        }, [
                          createBaseVNode("div", _hoisted_18$1, [
                            createVNode(unref(IconXCircle), {
                              size: "xs",
                              class: "flex-shrink-0 mt-0.5"
                            }),
                            createBaseVNode("span", _hoisted_19$1, toDisplayString(run.errorMessage), 1)
                          ])
                        ], 2)) : createCommentVNode("", true)
                      ], 2)
                    ]);
                  }), 128))
                ])) : (openBlock(), createElementBlock("div", _hoisted_20$1, [
                  createBaseVNode("div", _hoisted_21$1, [
                    createVNode(unref(IconTaskList), {
                      size: "4xl",
                      class: normalizeClass(__props.darkMode ? "text-gray-600" : "text-gray-400")
                    }, null, 8, ["class"])
                  ]),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                  }, toDisplayString(unref(t)("admin.scheduledJobs.detail.noRuns")), 3)
                ]))
              ], 512), [
                [vShow, !historyCollapsed.value]
              ])
            ])
          ], 2)
        ], 2)
      ])) : createCommentVNode("", true);
    };
  }
};
const ScheduledJobDetailModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-dae3bd2c"]]);
const _hoisted_1 = { class: "p-4 flex-1 flex flex-col overflow-y-auto" };
const _hoisted_2 = { class: "flex flex-col space-y-3 mb-5" };
const _hoisted_3 = { class: "flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3" };
const _hoisted_4 = { class: "flex flex-wrap gap-2" };
const _hoisted_5 = { class: "hidden xs:inline" };
const _hoisted_6 = { class: "xs:hidden" };
const _hoisted_7 = { class: "hidden xs:inline" };
const _hoisted_8 = { class: "xs:hidden" };
const _hoisted_9 = { class: "hidden xs:inline" };
const _hoisted_10 = { class: "xs:hidden" };
const _hoisted_11 = { class: "hidden xs:inline" };
const _hoisted_12 = { class: "xs:hidden" };
const _hoisted_13 = ["disabled"];
const _hoisted_14 = { class: "hidden xs:inline" };
const _hoisted_15 = { class: "xs:hidden" };
const _hoisted_16 = { class: "flex flex-col sm:flex-row sm:justify-end sm:items-center gap-3" };
const _hoisted_17 = { class: "flex items-center gap-2" };
const _hoisted_18 = { class: "hidden sm:inline" };
const _hoisted_19 = { value: "all" };
const _hoisted_20 = { value: "enabled" };
const _hoisted_21 = { value: "disabled" };
const _hoisted_22 = { class: "relative" };
const _hoisted_23 = ["placeholder"];
const _hoisted_24 = { class: "mb-4" };
const _hoisted_25 = { class: "grid grid-cols-1 lg:grid-cols-12 gap-4" };
const _hoisted_26 = { class: "flex items-center justify-between mb-3" };
const _hoisted_27 = { class: "flex items-end gap-0.5 h-16 mb-2" };
const _hoisted_28 = { class: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10" };
const _hoisted_29 = { class: "flex items-center gap-1" };
const _hoisted_30 = { class: "flex items-center gap-1" };
const _hoisted_31 = { class: "flex items-center gap-1" };
const _hoisted_32 = { class: "flex items-center gap-1" };
const _hoisted_33 = { class: "flex items-center gap-1" };
const _hoisted_34 = { class: "lg:col-span-4 grid grid-cols-2 gap-3" };
const _hoisted_35 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-yellow-500 animate-pulse"
};
const _hoisted_36 = ["disabled", "title"];
const _hoisted_37 = { class: "flex-1 flex flex-col" };
const _hoisted_38 = {
  key: 0,
  class: "flex justify-center items-center h-40"
};
const _hoisted_39 = { class: "space-y-3 p-0" };
const _hoisted_40 = { class: "flex items-center gap-2 min-w-0 flex-1" };
const _hoisted_41 = ["checked", "onChange"];
const _hoisted_42 = { class: "min-w-0 flex-1" };
const _hoisted_43 = { class: "flex items-center gap-2 flex-shrink-0" };
const _hoisted_44 = { class: "space-y-2 text-sm" };
const _hoisted_45 = { class: "flex justify-between" };
const _hoisted_46 = { class: "font-medium" };
const _hoisted_47 = { class: "text-right" };
const _hoisted_48 = { class: "flex justify-between" };
const _hoisted_49 = { class: "font-medium" };
const _hoisted_50 = { class: "text-right" };
const _hoisted_51 = { class: "flex justify-between" };
const _hoisted_52 = { class: "font-medium" };
const _hoisted_53 = { class: "mt-3 flex flex-wrap gap-2" };
const _hoisted_54 = ["onClick"];
const _hoisted_55 = ["onClick", "disabled"];
const _hoisted_56 = ["onClick"];
const _hoisted_57 = ["onClick", "disabled"];
const _hoisted_58 = ["onClick"];
const SETTINGS_KEY = "scheduled-jobs-settings";
const _sfc_main = {
  __name: "ScheduledJobsView",
  setup(__props) {
    const { t } = useI18n();
    const router = useRouter();
    const { isDarkMode: darkMode } = useThemeMode();
    const log = createLogger("ScheduledJobsView");
    const currentTick = ref(0);
    let schedulerTickerAutoRefreshTimer = null;
    const { pause: stopGlobalTick, resume: startGlobalTick } = useIntervalFn(
      () => {
        currentTick.value++;
      },
      1e3,
      { immediate: false }
    );
    const schedulerClockOffsetMs = ref(0);
    const schedulerClockHasSync = ref(false);
    onMounted(async () => {
      startGlobalTick();
      loadSettings();
      await Promise.all([loadJobs(), loadHandlerTypes(), loadAnalytics(), loadSchedulerTicker()]);
    });
    onUnmounted(() => {
      stopGlobalTick();
      if (schedulerTickerAutoRefreshTimer) {
        clearTimeout(schedulerTickerAutoRefreshTimer);
        schedulerTickerAutoRefreshTimer = null;
      }
    });
    const { dialogState, confirm, handleConfirm, handleCancel } = useConfirmDialog();
    const confirmFn = createConfirmFn(confirm, {
      t,
      darkMode,
      getConfirmText: () => t("common.dialogs.deleteButton")
    });
    const {
      jobs,
      currentJob,
      jobRuns,
      loading,
      runsLoading,
      filteredJobs,
      enabledFilter,
      showDetailDialog,
      loadJobs,
      toggleJobEnabled,
      deleteJob,
      runJobNow,
      loadJobRuns,
      loadHandlerTypes,
      formatSchedule,
      loadHourlyAnalytics,
      schedulerTicker,
      schedulerTickerLoading,
      loadSchedulerTicker,
      isJobRunning
    } = useScheduledJobs();
    const navigateToCreate = () => {
      router.push({ name: "AdminScheduledJobCreate" });
    };
    const navigateToEdit = (job) => {
      router.push({ name: "AdminScheduledJobEdit", params: { id: job.taskId } });
    };
    const searchQuery = ref("");
    const selectedJobs = ref([]);
    const displayedJobs = computed(() => {
      if (!searchQuery.value) return filteredJobs.value;
      const query = searchQuery.value.toLowerCase();
      return filteredJobs.value.filter((job) => job.taskId.toLowerCase().includes(query));
    });
    const displayedJobsForTable = computed(() => {
      currentTick.value;
      return Array.isArray(displayedJobs.value) ? displayedJobs.value.slice() : [];
    });
    const handleSelectionChange = ({ type, id, item }) => {
      if (type === "toggle-all") {
        if (selectedJobs.value.length === displayedJobs.value.length) {
          selectedJobs.value = [];
        } else {
          selectedJobs.value = displayedJobs.value.map((job) => job.taskId);
        }
      } else if (type === "toggle-item") {
        const index = selectedJobs.value.indexOf(id);
        if (index > -1) {
          selectedJobs.value.splice(index, 1);
        } else {
          selectedJobs.value.push(id);
        }
      }
    };
    const defaultSettings = {
      statsCollapsed: false
      // 扩展更多配置：
    };
    const settings = useLocalStorage(SETTINGS_KEY, { ...defaultSettings });
    settings.value = { ...defaultSettings, ...settings.value || {} };
    const isStatsCollapsed = computed({
      get: () => settings.value.statsCollapsed,
      set: (value) => {
        settings.value.statsCollapsed = value;
      }
    });
    const loadSettings = () => {
      settings.value = { ...defaultSettings, ...settings.value || {} };
    };
    const stats = computed(() => {
      currentTick.value;
      const total = jobs.value.length;
      const enabled = jobs.value.filter((j) => j.enabled).length;
      const running = jobs.value.filter((j) => j.runtimeState === "running").length;
      const now = /* @__PURE__ */ new Date();
      const pending = jobs.value.filter((job) => {
        if (job.runtimeState === "pending") return true;
        if (!job.nextRunAfter) return false;
        const nextRun = new Date(job.nextRunAfter);
        const hasLock = job.lockUntil && new Date(job.lockUntil) > now;
        return nextRun <= now && !hasLock;
      }).length;
      return { total, enabled, running, pending };
    });
    const hourlyAnalytics = ref(null);
    const loadAnalytics = async () => {
      try {
        const data = await loadHourlyAnalytics(24);
        hourlyAnalytics.value = data;
      } catch (error) {
        log.error("[热力图] 加载统计数据失败:", error);
      }
    };
    const hourlyActivity = computed(() => {
      const hours = Array(24).fill(0);
      if (!hourlyAnalytics.value?.buckets) return hours;
      hourlyAnalytics.value.buckets.forEach((bucket) => {
        const startDate = new Date(bucket.start);
        const hour = startDate.getHours();
        hours[hour] += bucket.totalRuns;
      });
      return hours;
    });
    const maxHourlyCount = computed(() => {
      return Math.max(...hourlyActivity.value, 1);
    });
    const getActivityColor = (count) => {
      if (count === 0) return darkMode.value ? "bg-gray-700" : "bg-gray-200";
      if (count <= 3) return darkMode.value ? "bg-blue-600" : "bg-blue-300";
      if (count <= 7) return darkMode.value ? "bg-green-600" : "bg-green-400";
      if (count <= 12) return darkMode.value ? "bg-orange-600" : "bg-orange-400";
      return darkMode.value ? "bg-red-600" : "bg-red-500";
    };
    const formatRelativeTime = (dateStr) => {
      currentTick.value;
      if (!dateStr) return "-";
      const date = new Date(dateStr);
      const now = /* @__PURE__ */ new Date();
      const diffMs = date - now;
      const diffSec = Math.abs(Math.floor(diffMs / 1e3));
      const isPast = diffMs < 0;
      if (diffSec < 60) {
        return isPast ? `${diffSec}${t("common.second")}${t("admin.scheduledJobs.card.ago")}` : `${diffSec}${t("common.second")}${t("admin.scheduledJobs.card.later")}`;
      }
      const diffMin = Math.floor(diffSec / 60);
      if (diffMin < 60) {
        return isPast ? `${diffMin}${t("common.minute")}${t("admin.scheduledJobs.card.ago")}` : `${diffMin}${t("common.minute")}${t("admin.scheduledJobs.card.later")}`;
      }
      const diffHour = Math.floor(diffMin / 60);
      if (diffHour < 24) {
        return isPast ? `${diffHour}${t("common.hour")}${t("admin.scheduledJobs.card.ago")}` : `${diffHour}${t("common.hour")}${t("admin.scheduledJobs.card.later")}`;
      }
      const diffDay = Math.floor(diffHour / 24);
      return isPast ? `${diffDay}${t("common.day")}${t("admin.scheduledJobs.card.ago")}` : `${diffDay}${t("common.day")}${t("admin.scheduledJobs.card.later")}`;
    };
    const formatNextRun = (job) => {
      currentTick.value;
      if (!job.nextRunAfter) return t("admin.scheduledJobs.card.notScheduled");
      const nextRun = new Date(job.nextRunAfter);
      const now = /* @__PURE__ */ new Date();
      const hasLock = job.lockUntil && new Date(job.lockUntil) > now;
      if (nextRun <= now && !hasLock) {
        return t("admin.scheduledJobs.stats.pendingJobs");
      }
      return formatRelativeTime(job.nextRunAfter);
    };
    const getSchedulerNowMs = () => {
      currentTick.value;
      const base = Date.now();
      return schedulerClockHasSync.value ? base + schedulerClockOffsetMs.value : base;
    };
    const formatCountdown = (targetIso) => {
      currentTick.value;
      if (!targetIso) return "-";
      const target = new Date(targetIso);
      if (Number.isNaN(target.getTime())) return "-";
      const nowMs = getSchedulerNowMs();
      const diffMs = target.getTime() - nowMs;
      if (diffMs <= 0) {
        return t("admin.scheduledJobs.ticker.waiting");
      }
      const totalSec = Math.floor(diffMs / 1e3);
      const hours = Math.floor(totalSec / 3600);
      const minutes = Math.floor(totalSec % 3600 / 60);
      const seconds = totalSec % 60;
      const pad2 = (n) => String(n).padStart(2, "0");
      if (hours > 0) {
        return `${hours}:${pad2(minutes)}:${pad2(seconds)}`;
      }
      return `${minutes}:${pad2(seconds)}`;
    };
    const schedulerTickerUiState = ref({
      lastTickMs: null,
      nextAt: null,
      waitingSinceMs: null
    });
    const normalizeLastTickMs = (data) => {
      const ms = data?.lastTick?.ms;
      return typeof ms === "number" && Number.isFinite(ms) && ms > 0 ? ms : null;
    };
    const normalizeNextAt = (data) => {
      const at = data?.nextTick?.at;
      return typeof at === "string" && at ? at : null;
    };
    const syncSchedulerTickerUiState = (data) => {
      const incomingLastTickMs = normalizeLastTickMs(data);
      const incomingNextAt = normalizeNextAt(data);
      const prev = schedulerTickerUiState.value;
      if (prev.nextAt === null && prev.lastTickMs === null) {
        schedulerTickerUiState.value = {
          lastTickMs: incomingLastTickMs,
          nextAt: incomingNextAt,
          waitingSinceMs: null
        };
        return;
      }
      if (incomingLastTickMs && incomingLastTickMs !== prev.lastTickMs) {
        schedulerTickerUiState.value = {
          lastTickMs: incomingLastTickMs,
          nextAt: incomingNextAt,
          waitingSinceMs: null
        };
        return;
      }
      if (prev.waitingSinceMs) {
        return;
      }
      schedulerTickerUiState.value = {
        lastTickMs: prev.lastTickMs ?? incomingLastTickMs,
        nextAt: incomingNextAt,
        waitingSinceMs: null
      };
    };
    const schedulerTickerSummary = computed(() => {
      currentTick.value;
      const data = schedulerTicker.value;
      if (!data) {
        return {
          nextAt: null,
          countdown: "-",
          isDue: false
        };
      }
      const nextAt = schedulerTickerUiState.value.nextAt;
      const lastTickMs = normalizeLastTickMs(data);
      const hasAnyTickEvidence = Boolean(lastTickMs);
      const countdown = nextAt ? formatCountdown(nextAt) : hasAnyTickEvidence ? t("admin.scheduledJobs.ticker.noNext") : t("admin.scheduledJobs.ticker.waiting");
      return {
        nextAt,
        countdown,
        isDue: Boolean(nextAt) && new Date(nextAt).getTime() <= getSchedulerNowMs()
      };
    });
    const handleTickerRefresh = async (options = {}) => {
      const { silent = false, showErrorOnCatch = true } = options || {};
      await Promise.all([
        loadSchedulerTicker({ silent, showErrorOnCatch }),
        loadJobs({}, { silent: true, showErrorOnCatch })
      ]);
    };
    const dueRefreshState = ref({ active: false, attempt: 0 });
    const DUE_BACKOFF_MS = [1500, 3e3, 6e3, 12e3, 3e4];
    const stopDueRefreshLoop = () => {
      dueRefreshState.value = { active: false, attempt: 0 };
      if (schedulerTickerAutoRefreshTimer) {
        clearTimeout(schedulerTickerAutoRefreshTimer);
        schedulerTickerAutoRefreshTimer = null;
      }
    };
    const scheduleDueRefreshAttempt = () => {
      if (!dueRefreshState.value.active) return;
      const attempt = dueRefreshState.value.attempt;
      if (attempt >= DUE_BACKOFF_MS.length) {
        stopDueRefreshLoop();
        return;
      }
      const delay = DUE_BACKOFF_MS[attempt];
      if (schedulerTickerAutoRefreshTimer) {
        clearTimeout(schedulerTickerAutoRefreshTimer);
      }
      schedulerTickerAutoRefreshTimer = setTimeout(async () => {
        try {
          await handleTickerRefresh({ silent: true, showErrorOnCatch: false });
        } catch {
        } finally {
          const baselineLastTickMs = dueRefreshState.value.lastTickMs || null;
          const currentLastTickMs = normalizeLastTickMs(schedulerTicker.value);
          if (baselineLastTickMs !== currentLastTickMs && currentLastTickMs) {
            stopDueRefreshLoop();
            return;
          }
          dueRefreshState.value = {
            active: true,
            attempt: dueRefreshState.value.attempt + 1,
            lastTickMs: baselineLastTickMs
          };
          scheduleDueRefreshAttempt();
        }
      }, delay);
    };
    watch(
      () => schedulerTickerSummary.value.isDue,
      (isDue) => {
        if (isDue) {
          if (!schedulerTickerUiState.value.waitingSinceMs) {
            schedulerTickerUiState.value = {
              ...schedulerTickerUiState.value,
              waitingSinceMs: getSchedulerNowMs()
            };
          }
          if (!dueRefreshState.value.active) {
            dueRefreshState.value = {
              active: true,
              attempt: 0,
              lastTickMs: normalizeLastTickMs(schedulerTicker.value)
            };
            scheduleDueRefreshAttempt();
          }
        } else {
          if (schedulerTickerUiState.value.waitingSinceMs) {
            schedulerTickerUiState.value = {
              ...schedulerTickerUiState.value,
              waitingSinceMs: null
            };
          }
          stopDueRefreshLoop();
        }
      },
      { immediate: true }
    );
    watch(
      () => schedulerTicker.value,
      (data) => {
        if (!data) return;
        syncSchedulerTickerUiState(data);
      },
      { immediate: true }
    );
    watch(
      () => schedulerTicker.value?.nowMs || null,
      (serverNowMs) => {
        if (typeof serverNowMs !== "number") return;
        schedulerClockOffsetMs.value = serverNowMs - Date.now();
        schedulerClockHasSync.value = true;
      }
    );
    const handleBatchEnable = async () => {
      for (const taskId of selectedJobs.value) {
        await toggleJobEnabled(taskId, true);
      }
      selectedJobs.value = [];
      await handleRefresh();
    };
    const handleBatchDisable = async () => {
      for (const taskId of selectedJobs.value) {
        await toggleJobEnabled(taskId, false);
      }
      selectedJobs.value = [];
      await handleRefresh();
    };
    const handleBatchDelete = async () => {
      const confirmed = await confirmFn({
        title: t("admin.scheduledJobs.deleteConfirmTitle"),
        message: `确定要删除选中的 ${selectedJobs.value.length} 个任务吗？此操作不可撤销。`,
        confirmType: "danger"
      });
      if (confirmed) {
        for (const taskId of selectedJobs.value) {
          await deleteJob(taskId);
        }
        selectedJobs.value = [];
      }
    };
    const handleRefresh = async () => {
      await Promise.all([loadJobs(), loadAnalytics(), loadSchedulerTicker()]);
    };
    const handleToggleEnabled = async (job) => {
      await toggleJobEnabled(job.taskId, !job.enabled);
    };
    const handleDelete = async (job) => {
      const confirmed = await confirmFn({
        title: t("admin.scheduledJobs.deleteConfirmTitle"),
        message: t("admin.scheduledJobs.deleteConfirmMessage"),
        confirmType: "danger"
      });
      if (confirmed) {
        await deleteJob(job.taskId);
      }
    };
    const handleRunNow = async (job) => {
      await runJobNow(job.taskId);
      await loadJobs({}, { silent: true });
    };
    const handleViewDetail = async (job) => {
      currentJob.value = job;
      await loadJobRuns(job.taskId);
      showDetailDialog.value = true;
    };
    const jobColumns = computed(() => [
      // 任务名称列（第一列）
      {
        type: "accessor",
        key: "name",
        header: t("admin.scheduledJobs.form.name"),
        sortable: true,
        render: (value, row) => {
          return h("div", { class: "flex flex-col" }, [
            h("span", {
              class: [
                "truncate max-w-[200px]",
                darkMode.value ? "font-medium text-gray-100" : "font-medium text-gray-900"
              ],
              title: value || row.taskId
            }, value || row.taskId),
            row.description ? h("span", {
              class: [
                "text-xs mt-0.5 truncate max-w-[200px]",
                darkMode.value ? "text-gray-400" : "text-gray-500"
              ],
              title: row.description
            }, row.description) : null,
            row.handlerExists === false ? h("span", {
              class: [
                "text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block w-fit",
                darkMode.value ? "bg-orange-900/40 text-orange-300" : "bg-orange-100 text-orange-700"
              ]
            }, t("admin.scheduledJobs.status.unknownType")) : null
          ]);
        }
      },
      // 执行周期列
      {
        type: "display",
        key: "schedule",
        header: t("admin.scheduledJobs.card.interval"),
        sortable: false,
        render: (row) => {
          return h("span", { class: "text-sm" }, formatSchedule(row));
        }
      },
      // 上次执行列
      {
        type: "accessor",
        key: "lastRunFinishedAt",
        header: t("admin.scheduledJobs.detail.lastRun"),
        sortable: true,
        render: (_, row) => {
          const ts = row.lastRunFinishedAt || row.lastRunStartedAt;
          return ts ? formatDateTime(ts) : t("admin.scheduledJobs.card.never");
        }
      },
      // 下次执行列
      {
        type: "display",
        key: "nextRunAfter",
        header: t("admin.scheduledJobs.detail.nextRun"),
        sortable: true,
        render: (row) => {
          const text = formatNextRun(row);
          const now = /* @__PURE__ */ new Date();
          const nextRun = row.nextRunAfter ? new Date(row.nextRunAfter) : null;
          const hasLock = row.lockUntil && new Date(row.lockUntil) > now;
          const isWaitingTrigger = nextRun && nextRun <= now && !hasLock;
          const isPending = row.runtimeState === "pending" || isWaitingTrigger;
          return h("span", {
            class: isPending ? darkMode.value ? "text-yellow-400 font-medium" : "text-yellow-600 font-medium" : ""
          }, text);
        }
      },
      // 执行次数列
      {
        type: "display",
        key: "runCount",
        header: t("admin.scheduledJobs.detail.runCount"),
        sortable: true,
        render: (row) => {
          const runCount = row.runCount || 0;
          return h("span", {
            class: [
              "text-sm font-medium tabular-nums",
              darkMode.value ? "text-gray-300" : "text-gray-700"
            ]
          }, `${runCount}`);
        }
      },
      // 状态列 - 滑块开关
      {
        type: "accessor",
        key: "enabled",
        header: t("admin.scheduledJobs.detail.status"),
        sortable: true,
        render: (value, row) => {
          return h("button", {
            onClick: (e) => {
              e.stopPropagation();
              handleToggleEnabled(row);
            },
            class: [
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
              value ? "bg-emerald-500 focus:ring-emerald-500" : darkMode.value ? "bg-gray-600 focus:ring-gray-500" : "bg-gray-300 focus:ring-gray-400"
            ],
            role: "switch",
            "aria-checked": value,
            title: value ? t("admin.scheduledJobs.actions.disable") : t("admin.scheduledJobs.actions.enable")
          }, [
            h("span", {
              class: [
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                value ? "translate-x-6" : "translate-x-1"
              ]
            })
          ]);
        }
      },
      // 操作列
      {
        type: "display",
        key: "actions",
        header: t("admin.scheduledJobs.detail.actions"),
        sortable: false,
        render: (row) => {
          const running = isJobRunning(row.taskId);
          return h("div", { class: "flex items-center justify-center gap-1" }, [
            // 立即执行按钮
            h("button", {
              class: [
                "p-1.5 rounded transition",
                running ? "opacity-50 cursor-not-allowed" : "",
                darkMode.value ? "text-green-400 hover:bg-gray-700 hover:text-green-300" : "text-green-600 hover:bg-gray-100 hover:text-green-700"
              ],
              title: t("admin.scheduledJobs.actions.runNow"),
              disabled: running,
              onClick: (e) => {
                e.stopPropagation();
                if (!running) {
                  handleRunNow(row);
                }
              }
            }, [
              // 根据运行状态显示不同图标
              running ? h("svg", {
                class: "h-5 w-5 animate-spin",
                fill: "none",
                viewBox: "0 0 24 24"
              }, [
                h("circle", {
                  class: "opacity-25",
                  cx: "12",
                  cy: "12",
                  r: "10",
                  stroke: "currentColor",
                  "stroke-width": "4"
                }),
                h("path", {
                  class: "opacity-75",
                  fill: "currentColor",
                  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                })
              ]) : h("svg", {
                class: "h-5 w-5",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                h("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M13 10V3L4 14h7v7l9-11h-7z"
                })
              ])
            ]),
            // 查看详情按钮
            h("button", {
              class: [
                "p-1.5 rounded transition",
                darkMode.value ? "text-blue-400 hover:bg-gray-700 hover:text-blue-300" : "text-blue-600 hover:bg-gray-100 hover:text-blue-700"
              ],
              title: "查看详情",
              onClick: (e) => {
                e.stopPropagation();
                handleViewDetail(row);
              }
            }, [
              h("svg", {
                class: "h-5 w-5",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
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
            ]),
            // 编辑按钮
            h("button", {
              class: [
                "p-1.5 rounded transition disabled:opacity-50 disabled:cursor-not-allowed",
                darkMode.value ? "text-gray-400 hover:bg-gray-700 hover:text-gray-300" : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"
              ],
              title: t("admin.scheduledJobs.actions.edit"),
              disabled: row.handlerExists === false,
              onClick: (e) => {
                e.stopPropagation();
                navigateToEdit(row);
              }
            }, [
              h("svg", {
                class: "h-5 w-5",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                h("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                })
              ])
            ]),
            // 删除按钮
            h("button", {
              class: [
                "p-1.5 rounded transition",
                darkMode.value ? "text-red-400 hover:bg-gray-700 hover:text-red-300" : "text-red-600 hover:bg-gray-100 hover:text-red-700"
              ],
              title: t("admin.scheduledJobs.actions.delete"),
              onClick: (e) => {
                e.stopPropagation();
                handleDelete(row);
              }
            }, [
              h("svg", {
                class: "h-5 w-5",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                h("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                })
              ])
            ])
          ]);
        }
      }
    ]);
    const jobColumnClasses = {
      select: "w-10 text-center",
      name: "w-48",
      schedule: "w-32 text-center",
      lastRunFinishedAt: "w-32 text-center",
      nextRunAfter: "w-32 text-center",
      runCount: "w-24 text-center",
      enabled: "w-24 text-center",
      actions: "w-40 text-center"
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("h2", {
              class: normalizeClass(["text-lg sm:text-xl font-medium", unref(darkMode) ? "text-gray-100" : "text-gray-900"])
            }, toDisplayString(unref(t)("admin.scheduledJobs.title")), 3),
            createBaseVNode("div", _hoisted_4, [
              selectedJobs.value.length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createBaseVNode("button", {
                  onClick: handleBatchEnable,
                  class: normalizeClass(["inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-all duration-200", unref(darkMode) ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"])
                }, [
                  createVNode(unref(IconCheckCircle), { class: "h-3 w-3 sm:h-4 sm:w-4 mr-1" }),
                  createBaseVNode("span", _hoisted_5, toDisplayString(unref(t)("admin.scheduledJobs.actions.enable")) + " (" + toDisplayString(selectedJobs.value.length) + ") ", 1),
                  createBaseVNode("span", _hoisted_6, toDisplayString(unref(t)("admin.scheduledJobs.actions.enable")), 1)
                ], 2),
                createBaseVNode("button", {
                  onClick: handleBatchDisable,
                  class: normalizeClass(["inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-all duration-200", unref(darkMode) ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-500 hover:bg-gray-600"])
                }, [
                  createVNode(unref(IconXCircle), { class: "h-3 w-3 sm:h-4 sm:w-4 mr-1" }),
                  createBaseVNode("span", _hoisted_7, toDisplayString(unref(t)("admin.scheduledJobs.actions.disable")) + " (" + toDisplayString(selectedJobs.value.length) + ") ", 1),
                  createBaseVNode("span", _hoisted_8, toDisplayString(unref(t)("admin.scheduledJobs.actions.disable")), 1)
                ], 2),
                createBaseVNode("button", {
                  onClick: handleBatchDelete,
                  class: normalizeClass(["inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-all duration-200", unref(darkMode) ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"])
                }, [
                  createVNode(unref(IconDelete), { class: "h-3 w-3 sm:h-4 sm:w-4 mr-1" }),
                  createBaseVNode("span", _hoisted_9, toDisplayString(unref(t)("admin.scheduledJobs.actions.delete")) + " (" + toDisplayString(selectedJobs.value.length) + ") ", 1),
                  createBaseVNode("span", _hoisted_10, toDisplayString(unref(t)("admin.scheduledJobs.actions.delete")), 1)
                ], 2)
              ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createBaseVNode("button", {
                  onClick: navigateToCreate,
                  class: normalizeClass(["inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-all duration-200", unref(darkMode) ? "bg-primary-600 hover:bg-primary-700" : "bg-primary-500 hover:bg-primary-600"])
                }, [
                  createVNode(unref(IconFolderPlus), { class: "h-3 w-3 sm:h-4 sm:w-4 mr-1.5" }),
                  createBaseVNode("span", _hoisted_11, toDisplayString(unref(t)("admin.scheduledJobs.toolbar.createJob")), 1),
                  createBaseVNode("span", _hoisted_12, toDisplayString(unref(t)("admin.scheduledJobs.toolbar.createJob")), 1)
                ], 2),
                createBaseVNode("button", {
                  onClick: handleRefresh,
                  disabled: unref(loading),
                  class: normalizeClass(["inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-all duration-200 disabled:opacity-50", unref(darkMode) ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"])
                }, [
                  createVNode(unref(IconRefresh), {
                    class: normalizeClass(["h-3 w-3 sm:h-4 sm:w-4 mr-1.5", { "animate-spin": unref(loading) }])
                  }, null, 8, ["class"]),
                  createBaseVNode("span", _hoisted_14, toDisplayString(unref(t)("admin.scheduledJobs.toolbar.refresh")), 1),
                  createBaseVNode("span", _hoisted_15, toDisplayString(unref(t)("admin.scheduledJobs.toolbar.refresh")), 1)
                ], 10, _hoisted_13)
              ], 64))
            ])
          ]),
          createBaseVNode("div", _hoisted_16, [
            createBaseVNode("div", _hoisted_17, [
              createBaseVNode("div", {
                class: normalizeClass(["flex items-center gap-2 text-sm", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
              }, [
                createBaseVNode("span", _hoisted_18, toDisplayString(unref(t)("admin.scheduledJobs.toolbar.filter")), 1),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(enabledFilter) ? enabledFilter.value = $event : null),
                  class: normalizeClass(["px-2 py-1 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500", unref(darkMode) ? "bg-gray-800 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-800"])
                }, [
                  createBaseVNode("option", _hoisted_19, toDisplayString(unref(t)("admin.scheduledJobs.toolbar.filterAll")), 1),
                  createBaseVNode("option", _hoisted_20, toDisplayString(unref(t)("admin.scheduledJobs.toolbar.filterEnabled")), 1),
                  createBaseVNode("option", _hoisted_21, toDisplayString(unref(t)("admin.scheduledJobs.toolbar.filterDisabled")), 1)
                ], 2), [
                  [vModelSelect, unref(enabledFilter)]
                ])
              ], 2),
              createBaseVNode("div", _hoisted_22, [
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => searchQuery.value = $event),
                  type: "text",
                  placeholder: unref(t)("admin.scheduledJobs.toolbar.search"),
                  class: normalizeClass(["pl-8 pr-3 py-1 rounded-md border text-sm w-48 focus:outline-none focus:ring-2 focus:ring-primary-500", unref(darkMode) ? "bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500" : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"])
                }, null, 10, _hoisted_23), [
                  [vModelText, searchQuery.value]
                ]),
                createVNode(unref(IconSearch), {
                  class: normalizeClass(["absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none", unref(darkMode) ? "text-gray-500" : "text-gray-400"])
                }, null, 8, ["class"])
              ])
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_24, [
          createBaseVNode("button", {
            onClick: _cache[2] || (_cache[2] = ($event) => isStatsCollapsed.value = !isStatsCollapsed.value),
            class: normalizeClass(["w-full flex items-center justify-between px-4 py-2 mb-3 rounded-lg border transition-colors", unref(darkMode) ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50"])
          }, [
            createBaseVNode("span", {
              class: normalizeClass(["text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
            }, toDisplayString(unref(t)("admin.scheduledJobs.stats.sectionTitle")), 3),
            createVNode(unref(IconChevronDown), {
              class: normalizeClass(["h-5 w-5 transition-transform", [
                isStatsCollapsed.value ? "rotate-180" : "",
                unref(darkMode) ? "text-gray-400" : "text-gray-500"
              ]])
            }, null, 8, ["class"])
          ], 2),
          withDirectives(createBaseVNode("div", _hoisted_25, [
            createBaseVNode("div", {
              class: normalizeClass(["lg:col-span-8 rounded-lg border p-4 shadow-sm", unref(darkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
            }, [
              createBaseVNode("div", _hoisted_26, [
                createBaseVNode("h3", {
                  class: normalizeClass(["text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                }, toDisplayString(unref(t)("admin.scheduledJobs.stats.hourlyActivityTitle")), 3),
                createBaseVNode("div", {
                  class: normalizeClass(["text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.scheduledJobs.stats.hourlyActivitySubtitle")), 3)
              ]),
              createBaseVNode("div", _hoisted_27, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(hourlyActivity.value, (count, hour) => {
                  return openBlock(), createElementBlock("div", {
                    key: hour,
                    class: normalizeClass(["flex-1 rounded-t transition-all hover:opacity-80 cursor-pointer relative group", getActivityColor(count)]),
                    style: normalizeStyle({ height: count > 0 ? `${count / maxHourlyCount.value * 100}%` : "2px" })
                  }, [
                    createBaseVNode("div", _hoisted_28, toDisplayString(unref(t)("admin.scheduledJobs.stats.hourlyTooltip", { hour, count })), 1)
                  ], 6);
                }), 128))
              ]),
              createBaseVNode("div", {
                class: normalizeClass(["flex justify-between text-xs mb-2", unref(darkMode) ? "text-gray-500" : "text-gray-400"])
              }, _cache[4] || (_cache[4] = [
                createBaseVNode("span", null, "00:00", -1),
                createBaseVNode("span", null, "06:00", -1),
                createBaseVNode("span", null, "12:00", -1),
                createBaseVNode("span", null, "18:00", -1),
                createBaseVNode("span", null, "23:59", -1)
              ]), 2),
              createBaseVNode("div", {
                class: normalizeClass(["flex items-center gap-3 text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
              }, [
                createBaseVNode("div", _hoisted_29, [
                  createBaseVNode("div", {
                    class: normalizeClass(["w-2 h-2 rounded", unref(darkMode) ? "bg-gray-700" : "bg-gray-200"])
                  }, null, 2),
                  createBaseVNode("span", null, toDisplayString(unref(t)("admin.scheduledJobs.stats.legendNone")), 1)
                ]),
                createBaseVNode("div", _hoisted_30, [
                  createBaseVNode("div", {
                    class: normalizeClass(["w-2 h-2 rounded", unref(darkMode) ? "bg-blue-600" : "bg-blue-300"])
                  }, null, 2),
                  createBaseVNode("span", null, toDisplayString(unref(t)("admin.scheduledJobs.stats.legendRange1")), 1)
                ]),
                createBaseVNode("div", _hoisted_31, [
                  createBaseVNode("div", {
                    class: normalizeClass(["w-2 h-2 rounded", unref(darkMode) ? "bg-green-600" : "bg-green-400"])
                  }, null, 2),
                  createBaseVNode("span", null, toDisplayString(unref(t)("admin.scheduledJobs.stats.legendRange2")), 1)
                ]),
                createBaseVNode("div", _hoisted_32, [
                  createBaseVNode("div", {
                    class: normalizeClass(["w-2 h-2 rounded", unref(darkMode) ? "bg-orange-600" : "bg-orange-400"])
                  }, null, 2),
                  createBaseVNode("span", null, toDisplayString(unref(t)("admin.scheduledJobs.stats.legendRange3")), 1)
                ]),
                createBaseVNode("div", _hoisted_33, [
                  createBaseVNode("div", {
                    class: normalizeClass(["w-2 h-2 rounded", unref(darkMode) ? "bg-red-600" : "bg-red-500"])
                  }, null, 2),
                  createBaseVNode("span", null, toDisplayString(unref(t)("admin.scheduledJobs.stats.legendRange4")), 1)
                ])
              ], 2)
            ], 2),
            createBaseVNode("div", _hoisted_34, [
              createBaseVNode("div", {
                class: normalizeClass(["rounded-lg border p-3 shadow-sm", unref(darkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["text-xs font-medium mb-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.scheduledJobs.stats.totalJobs")), 3),
                createBaseVNode("div", {
                  class: normalizeClass(["text-xl font-semibold", unref(darkMode) ? "text-blue-400" : "text-blue-600"])
                }, toDisplayString(stats.value.total), 3)
              ], 2),
              createBaseVNode("div", {
                class: normalizeClass(["rounded-lg border p-3 shadow-sm", unref(darkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["text-xs font-medium mb-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, toDisplayString(unref(t)("admin.scheduledJobs.stats.enabledJobs")), 3),
                createBaseVNode("div", {
                  class: normalizeClass(["text-xl font-semibold", unref(darkMode) ? "text-green-400" : "text-green-600"])
                }, toDisplayString(stats.value.enabled), 3)
              ], 2),
              createBaseVNode("div", {
                class: normalizeClass(["rounded-lg border p-3 shadow-sm", unref(darkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["text-xs font-medium mb-1 flex items-center gap-1", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, [
                  createBaseVNode("span", null, toDisplayString(unref(t)("admin.scheduledJobs.stats.pendingJobs")), 1),
                  stats.value.pending > 0 ? (openBlock(), createElementBlock("span", _hoisted_35)) : createCommentVNode("", true)
                ], 2),
                createBaseVNode("div", {
                  class: normalizeClass(["text-xl font-semibold", unref(darkMode) ? "text-yellow-400" : "text-yellow-600"])
                }, toDisplayString(stats.value.pending), 3)
              ], 2),
              createBaseVNode("div", {
                class: normalizeClass(["rounded-lg border p-3 shadow-sm", unref(darkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["text-xs font-medium mb-1 flex items-center justify-between", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                }, [
                  createBaseVNode("span", null, toDisplayString(unref(t)("admin.scheduledJobs.stats.nextTickCountdown")), 1),
                  createBaseVNode("button", {
                    type: "button",
                    class: normalizeClass(["p-0.5 rounded transition disabled:opacity-50", unref(darkMode) ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"]),
                    disabled: unref(schedulerTickerLoading),
                    onClick: handleTickerRefresh,
                    title: unref(t)("admin.scheduledJobs.ticker.refresh")
                  }, [
                    createVNode(unref(IconRefresh), {
                      class: normalizeClass(["h-3 w-3", { "animate-spin": unref(schedulerTickerLoading) }])
                    }, null, 8, ["class"])
                  ], 10, _hoisted_36)
                ], 2),
                createBaseVNode("div", {
                  class: normalizeClass(["text-xl font-semibold", unref(darkMode) ? "text-blue-400" : "text-blue-600"])
                }, toDisplayString(unref(schedulerTickerLoading) ? "..." : schedulerTickerSummary.value.countdown), 3)
              ], 2)
            ])
          ], 512), [
            [vShow, !isStatsCollapsed.value]
          ])
        ]),
        createBaseVNode("div", _hoisted_37, [
          unref(loading) ? (openBlock(), createElementBlock("div", _hoisted_38, [
            createVNode(unref(IconRefresh), { class: "animate-spin h-8 w-8 text-primary-500" })
          ])) : (openBlock(), createBlock(_sfc_main$2, {
            key: 1,
            data: displayedJobsForTable.value,
            columns: jobColumns.value,
            "column-classes": jobColumnClasses,
            selectable: true,
            "selected-items": selectedJobs.value,
            "row-id-field": "taskId",
            "empty-text": unref(t)("admin.scheduledJobs.empty.title"),
            onSelectionChange: handleSelectionChange
          }, {
            mobile: withCtx(({ data }) => [
              createBaseVNode("div", _hoisted_39, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(data, (job) => {
                  return openBlock(), createElementBlock("div", {
                    key: job.taskId,
                    class: normalizeClass(["rounded-lg shadow-md overflow-hidden border", [
                      unref(darkMode) ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
                      !job.enabled ? "opacity-70" : ""
                    ]])
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["px-5 py-3 flex justify-between items-center gap-2 border-b", unref(darkMode) ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"])
                    }, [
                      createBaseVNode("div", _hoisted_40, [
                        createBaseVNode("input", {
                          type: "checkbox",
                          checked: selectedJobs.value.includes(job.taskId),
                          onChange: ($event) => handleSelectionChange({ type: "toggle-item", id: job.taskId }),
                          class: "rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        }, null, 40, _hoisted_41),
                        createBaseVNode("div", _hoisted_42, [
                          createBaseVNode("h3", {
                            class: normalizeClass(["font-medium text-sm truncate", unref(darkMode) ? "text-gray-100" : "text-gray-900"])
                          }, toDisplayString(job.name || job.taskId), 3),
                          job.description ? (openBlock(), createElementBlock("p", {
                            key: 0,
                            class: normalizeClass(["text-xs truncate mt-0.5", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                          }, toDisplayString(job.description), 3)) : createCommentVNode("", true)
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_43, [
                        job.handlerExists === false ? (openBlock(), createElementBlock("span", {
                          key: 0,
                          class: normalizeClass(["text-xs px-2 py-0.5 rounded-full font-medium", unref(darkMode) ? "bg-orange-900/40 text-orange-300" : "bg-orange-100 text-orange-700"])
                        }, toDisplayString(unref(t)("admin.scheduledJobs.status.unknownType")), 3)) : createCommentVNode("", true),
                        createBaseVNode("span", {
                          class: normalizeClass(["text-xs px-2 py-0.5 rounded-full font-medium", job.enabled ? unref(darkMode) ? "bg-green-900/40 text-green-300" : "bg-green-100 text-green-700" : unref(darkMode) ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-600"])
                        }, toDisplayString(job.enabled ? unref(t)("admin.scheduledJobs.status.enabled") : unref(t)("admin.scheduledJobs.status.disabled")), 3)
                      ])
                    ], 2),
                    createBaseVNode("div", {
                      class: normalizeClass(["p-4", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                    }, [
                      createBaseVNode("div", _hoisted_44, [
                        createBaseVNode("div", _hoisted_45, [
                          createBaseVNode("span", _hoisted_46, toDisplayString(unref(t)("admin.scheduledJobs.card.interval")), 1),
                          createBaseVNode("span", _hoisted_47, toDisplayString(unref(formatSchedule)(job)), 1)
                        ]),
                        createBaseVNode("div", _hoisted_48, [
                          createBaseVNode("span", _hoisted_49, toDisplayString(unref(t)("admin.scheduledJobs.detail.lastRun")), 1),
                          createBaseVNode("span", _hoisted_50, toDisplayString(job.lastRunFinishedAt || job.lastRunStartedAt ? unref(formatDateTime)(job.lastRunFinishedAt || job.lastRunStartedAt) : unref(t)("admin.scheduledJobs.card.never")), 1)
                        ]),
                        createBaseVNode("div", _hoisted_51, [
                          createBaseVNode("span", _hoisted_52, toDisplayString(unref(t)("admin.scheduledJobs.detail.nextRun")), 1),
                          createBaseVNode("span", {
                            class: normalizeClass(["text-right", (() => {
                              const now = /* @__PURE__ */ new Date();
                              const nextRun = job.nextRunAfter ? new Date(job.nextRunAfter) : null;
                              const hasLock = job.lockUntil && new Date(job.lockUntil) > now;
                              const isWaitingTrigger = nextRun && nextRun <= now && !hasLock;
                              const isPending = job.runtimeState === "pending" || isWaitingTrigger;
                              return isPending ? unref(darkMode) ? "text-yellow-400 font-medium" : "text-yellow-600 font-medium" : "";
                            })()])
                          }, toDisplayString(formatNextRun(job)), 3)
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_53, [
                        createBaseVNode("button", {
                          onClick: ($event) => handleToggleEnabled(job),
                          class: normalizeClass(["flex items-center px-3 py-1.5 rounded text-sm font-medium transition", job.enabled ? unref(darkMode) ? "bg-gray-600 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800" : unref(darkMode) ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-100 hover:bg-green-200 text-green-800"])
                        }, [
                          job.enabled ? (openBlock(), createBlock(unref(IconXCircle), {
                            key: 0,
                            class: "h-4 w-4 mr-1.5"
                          })) : (openBlock(), createBlock(unref(IconCheckCircle), {
                            key: 1,
                            class: "h-4 w-4 mr-1.5"
                          })),
                          createTextVNode(" " + toDisplayString(job.enabled ? unref(t)("admin.scheduledJobs.actions.disable") : unref(t)("admin.scheduledJobs.actions.enable")), 1)
                        ], 10, _hoisted_54),
                        createBaseVNode("button", {
                          onClick: ($event) => handleRunNow(job),
                          disabled: unref(isJobRunning)(job.taskId),
                          class: normalizeClass(["flex items-center px-3 py-1.5 rounded text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed", unref(darkMode) ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-100 hover:bg-blue-200 text-blue-800"])
                        }, [
                          unref(isJobRunning)(job.taskId) ? (openBlock(), createBlock(unref(IconRefresh), {
                            key: 0,
                            class: "h-4 w-4 mr-1.5 animate-spin"
                          })) : (openBlock(), createBlock(unref(IconArrowUp), {
                            key: 1,
                            class: "h-4 w-4 mr-1.5"
                          })),
                          createTextVNode(" " + toDisplayString(unref(t)("admin.scheduledJobs.actions.runNow")), 1)
                        ], 10, _hoisted_55),
                        createBaseVNode("button", {
                          onClick: ($event) => handleViewDetail(job),
                          class: normalizeClass(["flex items-center px-3 py-1.5 rounded text-sm font-medium transition", unref(darkMode) ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-100 hover:bg-blue-200 text-blue-800"])
                        }, [
                          createVNode(unref(IconEye), { class: "h-4 w-4 mr-1.5" }),
                          createTextVNode(" " + toDisplayString(unref(t)("admin.scheduledJobs.actions.viewDetail")), 1)
                        ], 10, _hoisted_56),
                        createBaseVNode("button", {
                          onClick: ($event) => navigateToEdit(job),
                          disabled: job.handlerExists === false,
                          class: normalizeClass(["flex items-center px-3 py-1.5 rounded text-sm font-medium transition disabled:opacity-50", unref(darkMode) ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-amber-100 hover:bg-amber-200 text-amber-800"])
                        }, [
                          createVNode(unref(IconRename), { class: "h-4 w-4 mr-1.5" }),
                          createTextVNode(" " + toDisplayString(unref(t)("admin.scheduledJobs.actions.edit")), 1)
                        ], 10, _hoisted_57),
                        createBaseVNode("button", {
                          onClick: ($event) => handleDelete(job),
                          class: normalizeClass(["flex items-center px-3 py-1.5 rounded text-sm font-medium transition", unref(darkMode) ? "bg-red-600 hover:bg-red-700 text-white" : "bg-red-100 hover:bg-red-200 text-red-800"])
                        }, [
                          createVNode(unref(IconDelete), { class: "h-4 w-4 mr-1.5" }),
                          createTextVNode(" " + toDisplayString(unref(t)("admin.scheduledJobs.actions.delete")), 1)
                        ], 10, _hoisted_58)
                      ])
                    ], 2)
                  ], 2);
                }), 128))
              ])
            ]),
            _: 1
          }, 8, ["data", "columns", "selected-items", "empty-text"]))
        ]),
        createVNode(ScheduledJobDetailModal, {
          show: unref(showDetailDialog),
          job: unref(currentJob),
          runs: unref(jobRuns),
          "runs-loading": unref(runsLoading),
          "dark-mode": unref(darkMode),
          onClose: _cache[3] || (_cache[3] = ($event) => showDetailDialog.value = false)
        }, null, 8, ["show", "job", "runs", "runs-loading", "dark-mode"]),
        createVNode(_sfc_main$3, {
          "is-open": unref(dialogState).isOpen,
          title: unref(dialogState).title,
          message: unref(dialogState).message,
          "confirm-text": unref(dialogState).confirmText,
          "confirm-type": unref(dialogState).confirmType,
          "dark-mode": unref(darkMode),
          onConfirm: unref(handleConfirm),
          onCancel: unref(handleCancel)
        }, null, 8, ["is-open", "title", "message", "confirm-text", "confirm-type", "dark-mode", "onConfirm", "onCancel"])
      ]);
    };
  }
};
export {
  _sfc_main as default
};
