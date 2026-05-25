import { aK as _export_sfc, e as useI18n, aZ as useFsService, Y as useGlobalMessage, c as createLogger, a_ as shallowRef, F as computed, g as ref, w as watch, j as createElementBlock, p as createCommentVNode, k as openBlock, l as createBaseVNode, z as createVNode, n as normalizeClass, t as toDisplayString, y as unref, G as IconClose, A as createTextVNode, aL as IconExclamation, J as IconRefresh, as as IconHome, K as Fragment, L as renderList, q as withDirectives, x as vModelCheckbox, ak as IconInformationCircle, ar as mergeProps, a$ as h } from "./index-BQxzU9F1.js";
import { u as useTaskManager, T as TaskType } from "./MarkdownDisplay-DriQfnOJ.js";
import { u as useConfirmDialog, _ as _sfc_main$1 } from "./useConfirmDialog-c5dcTgIB.js";
import "./LoadingIndicator-C1Dntewf.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 z-[60] overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 pt-20 sm:pt-4"
};
const _hoisted_2 = {
  class: "p-3 sm:p-4 overflow-y-auto",
  style: { "max-height": "calc(85vh - 140px)" }
};
const _hoisted_3 = { class: "font-bold" };
const _hoisted_4 = {
  key: 0,
  class: "mb-3 p-2 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-md"
};
const _hoisted_5 = { class: "flex items-start" };
const _hoisted_6 = { class: "text-sm text-yellow-700 dark:text-yellow-300" };
const _hoisted_7 = {
  key: 1,
  class: "h-full overflow-y-auto p-1"
};
const _hoisted_8 = { class: "file-tree" };
const _hoisted_9 = { class: "flex items-center py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" };
const _hoisted_10 = { class: "mb-4 flex items-center" };
const _hoisted_11 = { class: "flex items-center cursor-pointer select-none" };
const _hoisted_12 = { class: "ml-2 group relative" };
const _hoisted_13 = { class: "flex justify-end space-x-3" };
const _hoisted_14 = ["disabled"];
const _sfc_main = {
  __name: "CopyModal",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    selectedItems: {
      type: Array,
      default: () => []
    },
    sourcePath: {
      type: String,
      default: "/"
    },
    isAdmin: {
      type: Boolean,
      default: true
    },
    apiKeyInfo: {
      type: Object,
      default: null
    }
  },
  emits: ["close", "copy-started"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const fsApi = useFsService();
    const { showError } = useGlobalMessage();
    const log = createLogger("CopyModal");
    const { dialogState, confirm, handleConfirm, handleCancel } = useConfirmDialog();
    const directoryCache = shallowRef(/* @__PURE__ */ new Map());
    const DirectoryItemVue = {
      name: "DirectoryItemVue",
      props: {
        item: {
          type: Object,
          required: true
        },
        currentPath: {
          type: String,
          required: true
        },
        darkMode: {
          type: Boolean,
          default: false
        },
        fsApi: {
          type: Object,
          required: true
        },
        level: {
          type: Number,
          default: 0
        }
      },
      emits: ["select"],
      setup(props2, { emit: emit2 }) {
        const expanded = ref(false);
        const children = shallowRef([]);
        const loading2 = ref(false);
        const loadChildren = async () => {
          const cacheKey = props2.item.path;
          if (directoryCache.value.has(cacheKey)) {
            children.value = directoryCache.value.get(cacheKey);
            return;
          }
          loading2.value = true;
          try {
            const data = await props2.fsApi.getDirectoryList(props2.item.path);
            const items = Array.isArray(data?.items) ? data.items : [];
            const dirItems = items.filter((item) => item && item.isDirectory);
            children.value = dirItems;
            directoryCache.value.set(cacheKey, dirItems);
          } catch (error) {
            children.value = [];
          } finally {
            loading2.value = false;
          }
        };
        watch(
          () => props2.currentPath,
          (newPath) => {
            if (newPath.startsWith(props2.item.path + "/") && newPath !== props2.item.path + "/") {
              expanded.value = true;
              if (children.value.length === 0) {
                loadChildren();
              }
            }
          },
          { immediate: true }
        );
        const isSelected = computed(() => {
          return props2.currentPath === props2.item.path + "/";
        });
        const toggleExpand = (event) => {
          event.stopPropagation();
          if (expanded.value) {
            expanded.value = false;
            return;
          }
          expanded.value = true;
          if (children.value.length === 0) {
            loadChildren();
          }
        };
        const selectFolder = () => {
          emit2("select", props2.item.path);
        };
        return {
          expanded,
          children,
          loading: loading2,
          isSelected,
          toggleExpand,
          selectFolder
        };
      },
      render() {
        return h("div", { class: "directory-item" }, [
          h(
            "div",
            {
              class: ["tree-item", { selected: this.isSelected }],
              onClick: this.selectFolder
            },
            [
              h(
                "div",
                {
                  class: "flex items-center py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer",
                  style: { paddingLeft: `${this.level * 0.75 + 0.5}rem` }
                  // 增加层级缩进值
                },
                [
                  h(
                    "div",
                    {
                      class: "folder-toggle",
                      onClick: (e) => {
                        e.stopPropagation();
                        this.toggleExpand(e);
                      }
                    },
                    [
                      this.expanded ? h(
                        "svg",
                        {
                          class: "h-4 w-4",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        },
                        [
                          h("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M19 9l-7 7-7-7"
                          })
                        ]
                      ) : h(
                        "svg",
                        {
                          class: "h-4 w-4",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        },
                        [
                          h("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M9 5l7 7-7 7"
                          })
                        ]
                      )
                    ]
                  ),
                  h(
                    "svg",
                    {
                      class: ["h-4 w-4 flex-shrink-0 mr-2", this.darkMode ? "text-yellow-400" : "text-yellow-600"],
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    },
                    [
                      h("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      })
                    ]
                  ),
                  h(
                    "span",
                    {
                      class: ["truncate", this.darkMode ? "text-gray-200" : "text-gray-700"]
                    },
                    this.item.name
                  )
                ]
              )
            ]
          ),
          this.expanded ? h("div", { class: "folder-children" }, [
            this.loading ? h(
              "div",
              {
                class: "folder-loading",
                style: { paddingLeft: `${(this.level + 1) * 0.75 + 0.75}rem` }
              },
              [
                h(
                  "svg",
                  {
                    class: "animate-spin h-3 w-3 mr-1",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24"
                  },
                  [
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
                  ]
                ),
                h("span", { class: "text-xs" }, t("mount.copyModal.loading"))
              ]
            ) : this.children.length === 0 ? null : this.children.map(
              (child) => h("div", { class: "folder-item", key: child.path }, [
                h(DirectoryItemVue, {
                  item: child,
                  currentPath: this.currentPath,
                  darkMode: this.darkMode,
                  fsApi: this.fsApi,
                  level: this.level + 1,
                  // 增加层级深度
                  onSelect: (path) => this.$emit("select", path)
                })
              ])
            )
          ]) : null
        ]);
      }
    };
    const props = __props;
    const emit = __emit;
    const userBasicPath = computed(() => {
      if (props.isAdmin) {
        return "/";
      }
      return props.apiKeyInfo?.basic_path || "/";
    });
    const rootDisplayName = computed(() => {
      if (props.isAdmin) {
        return t("mount.copyModal.rootDirectory");
      }
      const basicPath = userBasicPath.value;
      if (basicPath === "/") {
        return t("mount.copyModal.rootDirectory");
      }
      const pathParts = basicPath.split("/").filter((part) => part);
      return pathParts.length > 0 ? pathParts[pathParts.length - 1] : t("mount.copyModal.rootDirectory");
    });
    const currentPath = ref("/");
    const rootDirectories = shallowRef([]);
    const loading = ref(false);
    const copying = ref(false);
    const pathWarning = ref("");
    const skipExisting = ref(true);
    const clearDirectoryCache = () => {
      directoryCache.value.clear();
    };
    const loadRootDirectories = async () => {
      const rootPath = userBasicPath.value;
      const cacheKey = rootPath;
      if (directoryCache.value.has(cacheKey)) {
        rootDirectories.value = directoryCache.value.get(cacheKey);
        return;
      }
      loading.value = true;
      try {
        const data = await fsApi.getDirectoryList(rootPath);
        const items = Array.isArray(data?.items) ? data.items : [];
        const dirItems = items.filter((item) => item && item.isDirectory);
        rootDirectories.value = dirItems;
        directoryCache.value.set(cacheKey, dirItems);
      } catch (error) {
        rootDirectories.value = [];
      } finally {
        loading.value = false;
      }
    };
    watch(
      () => props.isOpen,
      (newValue) => {
        if (newValue) {
          currentPath.value = userBasicPath.value;
          loadRootDirectories();
        } else {
          clearDirectoryCache();
        }
      },
      // 关键：当 CopyModal 组件“首次挂载时就已经是打开状态”（例如异步加载 + 首次打开才渲染）也要立刻初始化
      { immediate: true }
    );
    const closeModal = () => {
      if (copying.value) return;
      emit("close");
    };
    const selectDestination = (path) => {
      let formattedPath = path;
      if (!formattedPath.endsWith("/")) {
        formattedPath = formattedPath + "/";
      }
      if (!props.isAdmin) {
        const basicPath = userBasicPath.value;
        const normalizedBasicPath = basicPath === "/" ? "/" : basicPath.replace(/\/+$/, "");
        const normalizedSelectedPath = formattedPath.replace(/\/+$/, "") || "/";
        if (normalizedBasicPath !== "/") {
          if (normalizedSelectedPath !== normalizedBasicPath && !normalizedSelectedPath.startsWith(normalizedBasicPath + "/")) {
            formattedPath = basicPath.endsWith("/") ? basicPath : basicPath + "/";
          }
        }
      }
      currentPath.value = formattedPath;
      pathWarning.value = "";
      validateDestinationPath();
    };
    const validateDestinationPath = () => {
      if (!props.selectedItems || props.selectedItems.length === 0) return;
      for (const item of props.selectedItems) {
        if (item.isDirectory) {
          const sourcePath = item.path.endsWith("/") ? item.path : item.path + "/";
          if (currentPath.value.startsWith(sourcePath)) {
            pathWarning.value = t("mount.copyModal.warnings.recursiveCopy");
            return;
          }
          if (currentPath.value === sourcePath) {
            pathWarning.value = t("mount.copyModal.warnings.selfCopy");
            return;
          }
        }
      }
    };
    const prepareCopyItems = () => {
      return props.selectedItems.map((item) => {
        const basePath = currentPath.value.endsWith("/") ? currentPath.value : currentPath.value + "/";
        return {
          sourcePath: item.path,
          targetPath: `${basePath}${item.name}`
        };
      });
    };
    const createCopyTask = (itemCount, jobId = null) => {
      const taskManager = useTaskManager();
      const taskId = taskManager.addTask(TaskType.COPY, t("mount.taskManager.copyTaskName", { count: itemCount, path: currentPath.value }), itemCount);
      const taskDetails = {
        total: itemCount,
        processed: 0
      };
      if (jobId) {
        taskDetails.jobId = jobId;
      }
      taskManager.updateTaskProgress(taskId, 0, taskDetails);
      return { taskManager, taskId };
    };
    const confirmCopy = async () => {
      if (copying.value) return;
      validateDestinationPath();
      if (pathWarning.value) {
        const confirmed = await confirm({
          title: t("mount.copyModal.warningTitle", "复制警告"),
          message: t("mount.copyModal.confirmPotentialIssue", { warning: pathWarning.value }),
          confirmType: "warning",
          confirmText: t("mount.copyModal.continueCopy", "继续复制"),
          darkMode: props.darkMode
        });
        if (!confirmed) {
          return;
        }
      }
      copying.value = true;
      try {
        const copyItems = prepareCopyItems();
        const response = await fsApi.batchCopyItems(copyItems, {
          skipExisting: skipExisting.value
        });
        if (!response.success || !response.data?.jobId) {
          throw new Error(response.message || "创建复制作业失败");
        }
        const jobId = response.data.jobId;
        const { taskManager, taskId } = createCopyTask(props.selectedItems.length, jobId);
        emit("copy-started", {
          message: t("mount.taskManager.copyStarted", {
            count: props.selectedItems.length,
            path: currentPath.value
          }),
          taskId,
          itemCount: props.selectedItems.length,
          targetPath: currentPath.value,
          jobId
        });
        emit("close");
        copying.value = false;
      } catch (error) {
        log.error("[CopyModal] 复制启动失败:", error);
        showError(error.message || t("mount.copyModal.copyFailed"));
        copying.value = false;
      }
    };
    return (_ctx, _cache) => {
      return __props.isOpen ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: normalizeClass(["relative w-full max-w-sm sm:max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-xl max-h-[85vh] sm:max-h-[80vh] overflow-hidden", __props.darkMode ? "bg-gray-800" : "bg-white"])
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["px-4 py-3 border-b flex justify-between items-center", __props.darkMode ? "border-gray-700" : "border-gray-200"])
          }, [
            createBaseVNode("h3", {
              class: normalizeClass(["text-lg font-medium", __props.darkMode ? "text-gray-100" : "text-gray-900"])
            }, toDisplayString(unref(t)("mount.copyModal.title")), 3),
            createBaseVNode("button", {
              onClick: closeModal,
              class: "text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            }, [
              createVNode(unref(IconClose), { "aria-hidden": "true" })
            ])
          ], 2),
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", {
              class: normalizeClass(["mb-3 text-sm", __props.darkMode ? "text-gray-300" : "text-gray-600"])
            }, toDisplayString(unref(t)("mount.copyModal.selectedInfo", {
              count: __props.selectedItems.length,
              folders: __props.selectedItems.filter((item) => item.isDirectory).length,
              files: __props.selectedItems.filter((item) => !item.isDirectory).length
            })), 3),
            createBaseVNode("div", {
              class: normalizeClass(["mb-3 text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
            }, [
              createTextVNode(toDisplayString(unref(t)("mount.copyModal.targetLocation")) + " ", 1),
              createBaseVNode("span", _hoisted_3, toDisplayString(currentPath.value), 1)
            ], 2),
            pathWarning.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                createVNode(unref(IconExclamation), {
                  class: "text-yellow-500 dark:text-yellow-400 mt-0.5 mr-2 flex-shrink-0",
                  "aria-hidden": "true"
                }),
                createBaseVNode("span", _hoisted_6, toDisplayString(pathWarning.value), 1)
              ])
            ])) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["border rounded-md overflow-hidden mb-4 h-64", __props.darkMode ? "border-gray-700" : "border-gray-300"])
            }, [
              loading.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["h-full flex justify-center items-center", __props.darkMode ? "text-gray-400" : "text-gray-500"])
              }, [
                createVNode(unref(IconRefresh), {
                  class: "animate-spin mr-2",
                  "aria-hidden": "true"
                }),
                createBaseVNode("span", null, toDisplayString(unref(t)("mount.copyModal.loading")), 1)
              ], 2)) : (openBlock(), createElementBlock("div", _hoisted_7, [
                createBaseVNode("div", _hoisted_8, [
                  createBaseVNode("div", {
                    class: normalizeClass(["tree-item", { selected: currentPath.value === userBasicPath.value }]),
                    onClick: _cache[0] || (_cache[0] = ($event) => selectDestination(userBasicPath.value))
                  }, [
                    createBaseVNode("div", _hoisted_9, [
                      createVNode(unref(IconHome), {
                        size: "sm",
                        class: normalizeClass(["flex-shrink-0 mr-2", __props.darkMode ? "text-blue-400" : "text-blue-600"]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"]),
                      createBaseVNode("span", {
                        class: normalizeClass(["truncate", __props.darkMode ? "text-gray-200" : "text-gray-700"])
                      }, toDisplayString(rootDisplayName.value), 3)
                    ])
                  ], 2),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(rootDirectories.value, (item) => {
                    return openBlock(), createElementBlock("div", {
                      key: item.path,
                      class: "folder-item"
                    }, [
                      createVNode(DirectoryItemVue, {
                        item,
                        "current-path": currentPath.value,
                        "dark-mode": __props.darkMode,
                        "fs-api": unref(fsApi),
                        level: 0,
                        onSelect: selectDestination
                      }, null, 8, ["item", "current-path", "dark-mode", "fs-api"])
                    ]);
                  }), 128))
                ])
              ]))
            ], 2),
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("label", _hoisted_11, [
                withDirectives(createBaseVNode("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => skipExisting.value = $event),
                  class: "w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700"
                }, null, 512), [
                  [vModelCheckbox, skipExisting.value]
                ]),
                createBaseVNode("span", {
                  class: normalizeClass(["ml-2 text-sm", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, toDisplayString(unref(t)("mount.copyModal.skipExisting")), 3)
              ]),
              createBaseVNode("div", _hoisted_12, [
                createVNode(unref(IconInformationCircle), {
                  size: "sm",
                  class: "text-gray-400 dark:text-gray-500 cursor-help",
                  "aria-hidden": "true"
                }),
                createBaseVNode("div", {
                  class: normalizeClass(["absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs rounded-md shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10", __props.darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-800 text-white"])
                }, [
                  createTextVNode(toDisplayString(unref(t)("mount.copyModal.skipExistingTooltip")) + " ", 1),
                  createBaseVNode("div", {
                    class: normalizeClass(["absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent", __props.darkMode ? "border-t-gray-700" : "border-t-gray-800"])
                  }, null, 2)
                ], 2)
              ])
            ]),
            createBaseVNode("div", _hoisted_13, [
              createBaseVNode("button", {
                onClick: closeModal,
                class: normalizeClass(["px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300", __props.darkMode ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"])
              }, toDisplayString(unref(t)("mount.copyModal.cancel")), 3),
              createBaseVNode("button", {
                onClick: confirmCopy,
                class: normalizeClass(["px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", [__props.darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white", copying.value ? "opacity-70 cursor-not-allowed" : ""]]),
                disabled: copying.value
              }, toDisplayString(copying.value ? unref(t)("mount.copyModal.copying") : unref(t)("mount.copyModal.confirmCopy")), 11, _hoisted_14)
            ])
          ])
        ], 2),
        createVNode(_sfc_main$1, mergeProps(unref(dialogState), {
          onConfirm: unref(handleConfirm),
          onCancel: unref(handleCancel)
        }), null, 16, ["onConfirm", "onCancel"])
      ])) : createCommentVNode("", true);
    };
  }
};
const CopyModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ca11140f"]]);
export {
  CopyModal as default
};
