import { aK as _export_sfc, e as useI18n, dG as useSiteConfigStore, i as useLocalStorage, o as onMounted, g as ref, F as computed, d1 as resolveComponent, j as createElementBlock, k as openBlock, l as createBaseVNode, z as createVNode, n as normalizeClass, y as unref, p as createCommentVNode, aE as withCtx, t as toDisplayString, aF as Transition, aa as IconChevronLeft, ab as IconChevronRight, K as Fragment, L as renderList, M as createBlock, N as resolveDynamicComponent, ao as IconChevronDown, dH as IconLogout, dI as IconBookOpen, G as IconClose, A as createTextVNode, V as IconSearch, as as IconHome, bo as IconLink, bg as IconEye, bz as IconGlobeAlt, bc as IconSettings, ba as IconCircleStack, B as IconUser, I as IconKey, Q as IconList, dJ as IconBellAlert, az as IconTaskList, ak as IconInformationCircle, b9 as IconServerStack, ah as IconCloud, b5 as IconFolder, b4 as IconDocumentText, b6 as IconChartBar, dK as IconMenu, dL as useRoute, dM as IconHamburger, ac as useThemeMode, f as useAuthStore, d as useRouter, u as useEventListener } from "./index-BQxzU9F1.js";
const _hoisted_1$1 = { class: "flex flex-col h-full" };
const _hoisted_2$1 = ["src", "alt", "title"];
const _hoisted_3 = {
  key: 0,
  class: "flex-1 min-w-0"
};
const _hoisted_4 = ["title"];
const _hoisted_5 = ["title"];
const _hoisted_6 = { class: "flex-1 flex flex-col overflow-y-auto pt-4" };
const _hoisted_7 = { class: "flex-1 px-2 space-y-1" };
const _hoisted_8 = {
  key: 0,
  class: "whitespace-nowrap"
};
const _hoisted_9 = ["title"];
const _hoisted_10 = ["onClick"];
const _hoisted_11 = { class: "flex items-center" };
const _hoisted_12 = {
  key: 0,
  class: "whitespace-nowrap"
};
const _hoisted_13 = {
  key: 0,
  class: "ml-6 space-y-1"
};
const _hoisted_14 = {
  key: 0,
  class: "whitespace-nowrap"
};
const _hoisted_15 = ["title"];
const _hoisted_16 = {
  key: 0,
  class: "whitespace-nowrap"
};
const _hoisted_17 = { class: "flex justify-center mt-2" };
const _hoisted_18 = {
  key: 0,
  class: "md:hidden fixed inset-0 z-[60] flex"
};
const _hoisted_19 = { class: "flex items-center flex-1 min-w-0" };
const _hoisted_20 = { class: "flex-shrink-0 w-8 h-8 mr-3" };
const _hoisted_21 = ["src", "alt"];
const _hoisted_22 = { class: "flex-1 min-w-0" };
const _hoisted_23 = { class: "sr-only" };
const _hoisted_24 = { class: "flex-1 overflow-y-auto pt-4" };
const _hoisted_25 = { class: "px-4 space-y-2" };
const _hoisted_26 = ["onClick"];
const _hoisted_27 = { class: "flex items-center" };
const _hoisted_28 = {
  key: 0,
  class: "ml-6 space-y-1"
};
const _hoisted_29 = { class: "flex justify-center mt-2" };
const DOC_URL = "https://doc.cloudpaste.qzz.io/";
const _sfc_main$2 = {
  __name: "AdminSidebar",
  props: {
    darkMode: {
      type: Boolean,
      required: true
    },
    permissions: {
      type: Object,
      required: true
    },
    isMobileSidebarOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close-mobile-sidebar", "logout", "sidebar-toggle"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const siteConfigStore = useSiteConfigStore();
    const props = __props;
    const emit = __emit;
    const isCollapsed = useLocalStorage("admin-sidebar-collapsed", false);
    onMounted(() => {
      emit("sidebar-toggle", { collapsed: isCollapsed.value });
    });
    const isSystemSettingsExpanded = ref(false);
    const isTaskManagementExpanded = ref(false);
    const siteFaviconUrl = computed(() => siteConfigStore.siteFaviconUrl);
    const siteTitle = computed(() => siteConfigStore.siteTitle || "CloudPaste");
    const userTypeText = computed(() => props.permissions.isAdmin ? t("admin.sidebar.menuTitle.admin") : t("admin.sidebar.menuTitle.user"));
    const logoutText = computed(() => props.permissions.isAdmin ? t("admin.sidebar.logout") : t("admin.sidebar.logoutAuth"));
    const handleImageError = (event) => {
      event.target.src = "/cloudpaste.svg";
    };
    const menuIconMap = {
      "chart-bar": IconChartBar,
      "document-text": IconDocumentText,
      folder: IconFolder,
      cloud: IconCloud,
      server: IconServerStack,
      "information-circle": IconInformationCircle,
      "clipboard-list": IconTaskList,
      "bell-alert": IconBellAlert,
      "list-bullet": IconList,
      key: IconKey,
      user: IconUser,
      "circle-stack": IconCircleStack,
      cog: IconSettings,
      globe: IconGlobeAlt,
      eye: IconEye,
      "cloud-webdav": IconLink,
      home: IconHome,
      logout: IconLogout,
      "chevron-down": IconChevronDown,
      search: IconSearch
    };
    const getMenuIconComponent = (iconName) => {
      return menuIconMap[iconName] || IconMenu;
    };
    const visibleMenuItems = computed(() => {
      if (props.permissions.isAdmin) {
        return [
          { id: "dashboard", name: t("admin.sidebar.dashboard"), icon: "chart-bar", type: "item", routeName: "AdminDashboard" },
          { id: "text-management", name: t("admin.sidebar.textManagement"), icon: "document-text", type: "item", routeName: "AdminTextManagement" },
          { id: "file-management", name: t("admin.sidebar.fileManagement"), icon: "folder", type: "item", routeName: "AdminFileManagement" },
          { id: "storage", name: t("admin.sidebar.storageConfig"), icon: "cloud", type: "item", routeName: "AdminStorage" },
          { id: "mount-management", name: t("admin.sidebar.mountManagement"), icon: "server", type: "item", routeName: "AdminMountManagement" },
          { id: "fs-meta-management", name: t("admin.sidebar.fsMetaManagement"), icon: "information-circle", type: "item", routeName: "AdminFsMetaManagement" },
          {
            id: "task-management",
            name: t("admin.sidebar.taskManagement"),
            icon: "clipboard-list",
            type: "group",
            children: [
              { id: "scheduled-jobs", name: t("admin.sidebar.scheduledJobs"), icon: "bell-alert", type: "item", routeName: "AdminScheduledJobs" },
              { id: "tasks", name: t("admin.sidebar.tasks"), icon: "list-bullet", type: "item", routeName: "AdminTasks" }
            ]
          },
          { id: "fs-index-management", name: t("admin.sidebar.fsIndexManagement"), icon: "search", type: "item", routeName: "AdminFsIndexManagement" },
          { id: "key-management", name: t("admin.sidebar.keyManagement"), icon: "key", type: "item", routeName: "AdminKeyManagement" },
          { id: "account-management", name: t("admin.sidebar.accountManagement"), icon: "user", type: "item", routeName: "AdminAccountManagement" },
          { id: "backup", name: t("admin.sidebar.backup"), icon: "circle-stack", type: "item", routeName: "AdminBackup" },
          {
            id: "system-settings",
            name: t("admin.sidebar.systemSettings"),
            icon: "cog",
            type: "group",
            children: [
              { id: "settings/global", name: t("admin.sidebar.globalSettings"), icon: "globe", type: "item", routeName: "AdminGlobalSettings" },
              { id: "settings/preview", name: t("admin.sidebar.previewSettings"), icon: "eye", type: "item", routeName: "AdminPreviewSettings" },
              { id: "settings/webdav", name: t("admin.sidebar.webdavSettings"), icon: "cloud-webdav", type: "item", routeName: "AdminWebDAVSettings" },
              { id: "settings/site", name: t("admin.sidebar.siteSettings"), icon: "home", type: "item", routeName: "AdminSiteSettings" }
            ]
          }
        ];
      }
      const items = [];
      if (props.permissions.text) {
        items.push({ id: "text-management", name: t("admin.sidebar.textManagement"), icon: "document-text", type: "item", routeName: "AdminTextManagement" });
      }
      if (props.permissions.file) {
        items.push({ id: "file-management", name: t("admin.sidebar.fileManagement"), icon: "folder", type: "item", routeName: "AdminFileManagement" });
      }
      if (props.permissions.mount) {
        items.push({ id: "mount-management", name: t("admin.sidebar.mountManagement"), icon: "server", type: "item", routeName: "AdminMountManagement" });
      }
      if (props.permissions.mount) {
        items.push({ id: "tasks", name: t("admin.sidebar.tasks"), icon: "list-bullet", type: "item", routeName: "AdminTasks" });
      }
      items.push({ id: "account-management", name: t("admin.sidebar.accountManagement"), icon: "user", type: "item", routeName: "AdminAccountManagement" });
      return items;
    });
    const toggleSystemSettings = () => {
      isSystemSettingsExpanded.value = !isSystemSettingsExpanded.value;
    };
    const toggleTaskManagement = () => {
      isTaskManagementExpanded.value = !isTaskManagementExpanded.value;
    };
    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value;
      emit("sidebar-toggle", { collapsed: isCollapsed.value });
    };
    const handleGroupItemClick = () => {
      isCollapsed.value = false;
      emit("sidebar-toggle", { collapsed: false });
      isSystemSettingsExpanded.value = true;
      isTaskManagementExpanded.value = true;
    };
    const handleLogout = () => {
      emit("logout");
    };
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", {
          class: normalizeClass(["hidden md:block fixed left-0 top-16 border-r shadow-md z-30 transition-all duration-300", [unref(isCollapsed) ? "w-16" : "w-64", "h-[calc(100vh-4rem)]", __props.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"]])
        }, [
          createBaseVNode("div", _hoisted_1$1, [
            createBaseVNode("div", {
              class: normalizeClass(["h-16 flex-shrink-0 border-b flex items-center", __props.darkMode ? "border-gray-700" : "border-gray-200"])
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["relative w-full h-full flex items-center", unref(isCollapsed) ? "justify-center" : "px-4"])
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["flex-shrink-0 w-8 h-8", unref(isCollapsed) ? "" : "mr-3"])
                }, [
                  createBaseVNode("img", {
                    src: siteFaviconUrl.value || "/cloudpaste.svg",
                    alt: siteTitle.value,
                    class: "w-8 h-8 object-contain",
                    title: unref(isCollapsed) ? `${siteTitle.value} - ${userTypeText.value}` : siteTitle.value,
                    onError: handleImageError
                  }, null, 40, _hoisted_2$1)
                ], 2),
                createVNode(Transition, {
                  name: "fade-slide",
                  "enter-active-class": "transition-all duration-300 delay-100",
                  "leave-active-class": "transition-all duration-200",
                  "enter-from-class": "opacity-0 transform translate-x-2",
                  "enter-to-class": "opacity-100 transform translate-x-0",
                  "leave-from-class": "opacity-100 transform translate-x-0",
                  "leave-to-class": "opacity-0 transform translate-x-2"
                }, {
                  default: withCtx(() => [
                    !unref(isCollapsed) ? (openBlock(), createElementBlock("div", _hoisted_3, [
                      createBaseVNode("div", {
                        class: normalizeClass(["font-semibold text-sm truncate", __props.darkMode ? "text-white" : "text-gray-900"])
                      }, toDisplayString(siteTitle.value), 3),
                      createBaseVNode("div", {
                        class: normalizeClass(["text-xs opacity-75 truncate", __props.darkMode ? "text-gray-300" : "text-gray-600"])
                      }, toDisplayString(userTypeText.value), 3)
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode(Transition, {
                  name: "fade-slide",
                  "enter-active-class": "transition-all duration-300 delay-100",
                  "leave-active-class": "transition-all duration-200",
                  "enter-from-class": "opacity-0 transform translate-x-2",
                  "enter-to-class": "opacity-100 transform translate-x-0",
                  "leave-from-class": "opacity-100 transform translate-x-0",
                  "leave-to-class": "opacity-0 transform translate-x-2"
                }, {
                  default: withCtx(() => [
                    !unref(isCollapsed) ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      onClick: toggleCollapse,
                      class: normalizeClass(["p-1.5 rounded-md transition-colors ml-2 flex-shrink-0", __props.darkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"]),
                      title: unref(t)("admin.sidebar.collapse")
                    }, [
                      createVNode(unref(IconChevronLeft), {
                        size: "sm",
                        "aria-hidden": "true"
                      })
                    ], 10, _hoisted_4)) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                unref(isCollapsed) ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  onClick: toggleCollapse,
                  class: normalizeClass([
                    "absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border shadow-sm transition-all flex items-center justify-center",
                    __props.darkMode ? "bg-gray-800 border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700" : "bg-white border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  ]),
                  title: unref(t)("admin.sidebar.expand")
                }, [
                  createVNode(unref(IconChevronRight), {
                    size: "xs",
                    "aria-hidden": "true"
                  })
                ], 10, _hoisted_5)) : createCommentVNode("", true)
              ], 2)
            ], 2),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("nav", _hoisted_7, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(visibleMenuItems.value, (item) => {
                  return openBlock(), createElementBlock(Fragment, null, [
                    item.type === "item" ? (openBlock(), createBlock(_component_router_link, {
                      key: `item-${item.id}`,
                      to: { name: item.routeName },
                      class: normalizeClass([
                        _ctx.$route.name === item.routeName ? __props.darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900" : __props.darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center text-sm font-medium rounded-md transition-colors",
                        unref(isCollapsed) ? "px-3 py-3 justify-center" : "px-3 py-2.5"
                      ]),
                      title: unref(isCollapsed) ? item.name : ""
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(getMenuIconComponent(item.icon)), {
                          size: "lg",
                          class: normalizeClass(["flex-shrink-0", [
                            unref(isCollapsed) ? "mx-auto" : "mr-3",
                            _ctx.$route.name === item.routeName ? "text-primary-500" : __props.darkMode ? "text-gray-400 group-hover:text-gray-300" : "text-gray-400 group-hover:text-gray-500"
                          ]]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])),
                        createVNode(Transition, {
                          name: "fade-slide",
                          "enter-active-class": "transition-all duration-300 delay-100",
                          "leave-active-class": "transition-all duration-200",
                          "enter-from-class": "opacity-0 transform translate-x-2",
                          "enter-to-class": "opacity-100 transform translate-x-0",
                          "leave-from-class": "opacity-100 transform translate-x-0",
                          "leave-to-class": "opacity-0 transform translate-x-2"
                        }, {
                          default: withCtx(() => [
                            !unref(isCollapsed) ? (openBlock(), createElementBlock("span", _hoisted_8, toDisplayString(item.name), 1)) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1032, ["to", "class", "title"])) : item.type === "group" ? (openBlock(), createElementBlock("div", {
                      key: `group-${item.id}`,
                      class: "space-y-1"
                    }, [
                      unref(isCollapsed) ? (openBlock(), createElementBlock("button", {
                        key: 0,
                        onClick: handleGroupItemClick,
                        class: normalizeClass([
                          __props.darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "w-full group flex items-center px-3 py-3 justify-center text-sm font-medium rounded-md cursor-pointer transition-colors"
                        ]),
                        title: item.name
                      }, [
                        (openBlock(), createBlock(resolveDynamicComponent(getMenuIconComponent(item.icon)), {
                          size: "lg",
                          class: normalizeClass(["mx-auto", __props.darkMode ? "text-gray-400 group-hover:text-gray-300" : "text-gray-400 group-hover:text-gray-500"]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"]))
                      ], 10, _hoisted_9)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createBaseVNode("button", {
                          onClick: ($event) => item.id === "system-settings" ? toggleSystemSettings() : toggleTaskManagement(),
                          class: normalizeClass([
                            __props.darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "w-full group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md cursor-pointer"
                          ])
                        }, [
                          createBaseVNode("div", _hoisted_11, [
                            (openBlock(), createBlock(resolveDynamicComponent(getMenuIconComponent(item.icon)), {
                              size: "lg",
                              class: normalizeClass(["flex-shrink-0", [unref(isCollapsed) ? "mx-auto" : "mr-3", __props.darkMode ? "text-gray-400 group-hover:text-gray-300" : "text-gray-400 group-hover:text-gray-500"]]),
                              "aria-hidden": "true"
                            }, null, 8, ["class"])),
                            createVNode(Transition, {
                              name: "fade-slide",
                              "enter-active-class": "transition-all duration-300 delay-100",
                              "leave-active-class": "transition-all duration-200",
                              "enter-from-class": "opacity-0 transform translate-x-2",
                              "enter-to-class": "opacity-100 transform translate-x-0",
                              "leave-from-class": "opacity-100 transform translate-x-0",
                              "leave-to-class": "opacity-0 transform translate-x-2"
                            }, {
                              default: withCtx(() => [
                                !unref(isCollapsed) ? (openBlock(), createElementBlock("span", _hoisted_12, toDisplayString(item.name), 1)) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          createVNode(Transition, {
                            name: "fade-slide",
                            "enter-active-class": "transition-all duration-300 delay-100",
                            "leave-active-class": "transition-all duration-200",
                            "enter-from-class": "opacity-0 transform translate-x-2",
                            "enter-to-class": "opacity-100 transform translate-x-0",
                            "leave-from-class": "opacity-100 transform translate-x-0",
                            "leave-to-class": "opacity-0 transform translate-x-2"
                          }, {
                            default: withCtx(() => [
                              !unref(isCollapsed) ? (openBlock(), createBlock(unref(IconChevronDown), {
                                key: 0,
                                class: normalizeClass(["transition-transform duration-200", [(item.id === "system-settings" ? isSystemSettingsExpanded.value : isTaskManagementExpanded.value) ? "transform rotate-180" : "", __props.darkMode ? "text-gray-400" : "text-gray-500"]]),
                                "aria-hidden": "true"
                              }, null, 8, ["class"])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ], 10, _hoisted_10),
                        (item.id === "system-settings" ? isSystemSettingsExpanded.value : isTaskManagementExpanded.value) ? (openBlock(), createElementBlock("div", _hoisted_13, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(item.children, (child) => {
                            return openBlock(), createBlock(_component_router_link, {
                              key: child.id,
                              to: { name: child.routeName },
                              class: normalizeClass([
                                _ctx.$route.name === child.routeName ? __props.darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900" : __props.darkMode ? "text-gray-400 hover:bg-gray-700 hover:text-white" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
                                "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                              ])
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(resolveDynamicComponent(getMenuIconComponent(child.icon)), {
                                  class: normalizeClass(["flex-shrink-0", [
                                    unref(isCollapsed) ? "mx-auto" : "mr-3",
                                    _ctx.$route.name === child.routeName ? "text-primary-500" : __props.darkMode ? "text-gray-500 group-hover:text-gray-400" : "text-gray-400 group-hover:text-gray-500"
                                  ]]),
                                  "aria-hidden": "true"
                                }, null, 8, ["class"])),
                                createVNode(Transition, {
                                  name: "fade-slide",
                                  "enter-active-class": "transition-all duration-300 delay-100",
                                  "leave-active-class": "transition-all duration-200",
                                  "enter-from-class": "opacity-0 transform translate-x-2",
                                  "enter-to-class": "opacity-100 transform translate-x-0",
                                  "leave-from-class": "opacity-100 transform translate-x-0",
                                  "leave-to-class": "opacity-0 transform translate-x-2"
                                }, {
                                  default: withCtx(() => [
                                    !unref(isCollapsed) ? (openBlock(), createElementBlock("span", _hoisted_14, toDisplayString(child.name), 1)) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["to", "class"]);
                          }), 128))
                        ])) : createCommentVNode("", true)
                      ], 64))
                    ])) : createCommentVNode("", true)
                  ], 64);
                }), 256)),
                createBaseVNode("div", {
                  class: normalizeClass(["pt-4 mt-4 border-t", __props.darkMode ? "border-gray-700" : "border-gray-200"])
                }, [
                  createBaseVNode("a", {
                    onClick: handleLogout,
                    class: normalizeClass([
                      __props.darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center text-sm font-medium rounded-md cursor-pointer transition-colors",
                      unref(isCollapsed) ? "px-3 py-3 justify-center" : "px-3 py-2.5"
                    ]),
                    title: unref(isCollapsed) ? logoutText.value : ""
                  }, [
                    createVNode(unref(IconLogout), {
                      size: "lg",
                      class: normalizeClass(["flex-shrink-0", [unref(isCollapsed) ? "mx-auto" : "mr-3", "text-gray-400"]]),
                      "aria-hidden": "true"
                    }, null, 8, ["class"]),
                    createVNode(Transition, {
                      name: "fade-slide",
                      "enter-active-class": "transition-all duration-300 delay-100",
                      "leave-active-class": "transition-all duration-200",
                      "enter-from-class": "opacity-0 transform translate-x-2",
                      "enter-to-class": "opacity-100 transform translate-x-0",
                      "leave-from-class": "opacity-100 transform translate-x-0",
                      "leave-to-class": "opacity-0 transform translate-x-2"
                    }, {
                      default: withCtx(() => [
                        !unref(isCollapsed) ? (openBlock(), createElementBlock("span", _hoisted_16, toDisplayString(logoutText.value), 1)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ], 10, _hoisted_15),
                  createBaseVNode("div", _hoisted_17, [
                    createBaseVNode("a", {
                      href: DOC_URL,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      class: normalizeClass([
                        __props.darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-400 hover:text-gray-500",
                        "inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200"
                      ]),
                      title: "Document"
                    }, [
                      createVNode(unref(IconBookOpen), {
                        class: "h-7 w-7",
                        "aria-hidden": "true"
                      })
                    ], 2)
                  ])
                ], 2)
              ]),
              _cache[5] || (_cache[5] = createBaseVNode("div", { class: "h-6" }, null, -1))
            ])
          ])
        ], 2),
        createVNode(Transition, { name: "slide" }, {
          default: withCtx(() => [
            __props.isMobileSidebarOpen ? (openBlock(), createElementBlock("div", _hoisted_18, [
              createBaseVNode("div", {
                class: "fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close-mobile-sidebar"))
              }),
              createBaseVNode("div", {
                class: normalizeClass(["relative flex-1 flex flex-col w-full max-w-xs shadow-xl transform transition-transform ease-in-out duration-300", __props.darkMode ? "bg-gray-800" : "bg-white"])
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["flex items-center justify-between p-3 h-14 border-b", __props.darkMode ? "border-gray-700" : "border-gray-200"])
                }, [
                  createBaseVNode("div", _hoisted_19, [
                    createBaseVNode("div", _hoisted_20, [
                      createBaseVNode("img", {
                        src: siteFaviconUrl.value || "/cloudpaste.svg",
                        alt: siteTitle.value,
                        class: "w-8 h-8 object-contain",
                        onError: handleImageError
                      }, null, 40, _hoisted_21)
                    ]),
                    createBaseVNode("div", _hoisted_22, [
                      createBaseVNode("div", {
                        class: normalizeClass(["font-semibold text-base truncate", __props.darkMode ? "text-white" : "text-gray-900"])
                      }, toDisplayString(siteTitle.value), 3),
                      createBaseVNode("div", {
                        class: normalizeClass(["text-sm opacity-75 truncate", __props.darkMode ? "text-gray-300" : "text-gray-600"])
                      }, toDisplayString(userTypeText.value), 3)
                    ])
                  ]),
                  createBaseVNode("button", {
                    type: "button",
                    onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("close-mobile-sidebar")),
                    class: "ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  }, [
                    createBaseVNode("span", _hoisted_23, toDisplayString(unref(t)("admin.sidebar.closeMenu")), 1),
                    createVNode(unref(IconClose), {
                      size: "lg",
                      class: normalizeClass(__props.darkMode ? "text-white" : "text-gray-600"),
                      "aria-hidden": "true"
                    }, null, 8, ["class"])
                  ])
                ], 2),
                createBaseVNode("div", _hoisted_24, [
                  createBaseVNode("nav", _hoisted_25, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(visibleMenuItems.value, (item) => {
                      return openBlock(), createElementBlock(Fragment, null, [
                        item.type === "item" ? (openBlock(), createBlock(_component_router_link, {
                          key: item.id,
                          to: { name: item.routeName },
                          class: normalizeClass([
                            _ctx.$route.name === item.routeName ? __props.darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900" : __props.darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center px-3 py-2.5 text-sm font-medium rounded-md"
                          ]),
                          onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("close-mobile-sidebar"))
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(getMenuIconComponent(item.icon)), {
                              size: "lg",
                              class: normalizeClass(["mr-3 flex-shrink-0", _ctx.$route.name === item.routeName ? "text-primary-500" : __props.darkMode ? "text-gray-400 group-hover:text-gray-300" : "text-gray-400 group-hover:text-gray-500"]),
                              "aria-hidden": "true"
                            }, null, 8, ["class"])),
                            createTextVNode(" " + toDisplayString(item.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["to", "class"])) : item.type === "group" ? (openBlock(), createElementBlock("div", {
                          key: `mobile-group-${item.id}`,
                          class: "space-y-1"
                        }, [
                          createBaseVNode("a", {
                            onClick: ($event) => item.id === "system-settings" ? toggleSystemSettings() : toggleTaskManagement(),
                            class: normalizeClass([
                              __props.darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md cursor-pointer"
                            ])
                          }, [
                            createBaseVNode("div", _hoisted_27, [
                              (openBlock(), createBlock(resolveDynamicComponent(getMenuIconComponent(item.icon)), {
                                size: "lg",
                                class: normalizeClass(["mr-3 flex-shrink-0", __props.darkMode ? "text-gray-400 group-hover:text-gray-300" : "text-gray-400 group-hover:text-gray-500"]),
                                "aria-hidden": "true"
                              }, null, 8, ["class"])),
                              createTextVNode(" " + toDisplayString(item.name), 1)
                            ]),
                            createVNode(unref(IconChevronDown), {
                              class: normalizeClass(["transition-transform duration-200", [(item.id === "system-settings" ? isSystemSettingsExpanded.value : isTaskManagementExpanded.value) ? "transform rotate-180" : "", __props.darkMode ? "text-gray-400" : "text-gray-500"]]),
                              "aria-hidden": "true"
                            }, null, 8, ["class"])
                          ], 10, _hoisted_26),
                          (item.id === "system-settings" ? isSystemSettingsExpanded.value : isTaskManagementExpanded.value) ? (openBlock(), createElementBlock("div", _hoisted_28, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(item.children, (child) => {
                              return openBlock(), createBlock(_component_router_link, {
                                key: child.id,
                                to: { name: child.routeName },
                                class: normalizeClass([
                                  _ctx.$route.name === child.routeName ? __props.darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900" : __props.darkMode ? "text-gray-400 hover:bg-gray-700 hover:text-white" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
                                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                                ]),
                                onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("close-mobile-sidebar"))
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(resolveDynamicComponent(getMenuIconComponent(child.icon)), {
                                    class: normalizeClass([
                                      "mr-3 flex-shrink-0",
                                      _ctx.$route.name === child.routeName ? "text-primary-500" : __props.darkMode ? "text-gray-500 group-hover:text-gray-400" : "text-gray-400 group-hover:text-gray-500"
                                    ]),
                                    "aria-hidden": "true"
                                  }, null, 8, ["class"])),
                                  createTextVNode(" " + toDisplayString(child.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["to", "class"]);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
                      ], 64);
                    }), 256)),
                    createBaseVNode("div", {
                      class: normalizeClass(["pt-4 mt-4 border-t", __props.darkMode ? "border-gray-700" : "border-gray-200"])
                    }, [
                      createBaseVNode("a", {
                        onClick: handleLogout,
                        class: normalizeClass([
                          __props.darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center px-3 py-2.5 text-sm font-medium rounded-md cursor-pointer"
                        ])
                      }, [
                        createVNode(unref(IconLogout), {
                          size: "lg",
                          class: "mr-3 flex-shrink-0 text-gray-400",
                          "aria-hidden": "true"
                        }),
                        createTextVNode(" " + toDisplayString(logoutText.value), 1)
                      ], 2),
                      createBaseVNode("div", _hoisted_29, [
                        createBaseVNode("a", {
                          href: DOC_URL,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          class: normalizeClass([
                            __props.darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-400 hover:text-gray-500",
                            "inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200"
                          ]),
                          title: "Document",
                          onClick: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("close-mobile-sidebar"))
                        }, [
                          createVNode(unref(IconBookOpen), {
                            class: "h-7 w-7",
                            "aria-hidden": "true"
                          })
                        ], 2)
                      ])
                    ], 2)
                  ]),
                  _cache[6] || (_cache[6] = createBaseVNode("div", { class: "h-6" }, null, -1))
                ])
              ], 2)
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
};
const AdminSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-7749c25e"]]);
const _sfc_main$1 = {
  __name: "AdminHeader",
  props: {
    darkMode: {
      type: Boolean,
      required: true
    }
  },
  emits: ["toggle-mobile-sidebar"],
  setup(__props, { emit: __emit }) {
    const route = useRoute();
    const { t } = useI18n();
    const currentPageTitle = computed(() => {
      switch (route.name) {
        case "AdminDashboard":
          return t("pageTitle.adminModules.dashboard");
        case "AdminTextManagement":
          return t("pageTitle.adminModules.textManagement");
        case "AdminFileManagement":
          return t("pageTitle.adminModules.fileManagement");
        case "AdminStorage":
          return t("pageTitle.adminModules.storageConfig");
        case "AdminMountManagement":
          return t("pageTitle.adminModules.mountManagement");
        case "AdminKeyManagement":
          return t("pageTitle.adminModules.keyManagement");
        case "AdminGlobalSettings":
          return t("pageTitle.adminModules.globalSettings");
        case "AdminAccountSettings":
          return t("pageTitle.adminModules.accountSettings");
        case "AdminAccountManagement":
          return t("pageTitle.adminModules.accountSettings");
        case "AdminWebDAVSettings":
          return t("pageTitle.adminModules.webdavSettings");
        default:
          return t("nav.admin");
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["md:hidden sticky top-16 left-0 right-0 z-40 border-b px-4 py-3 flex items-center", __props.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
      }, [
        createBaseVNode("button", {
          type: "button",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("toggle-mobile-sidebar")),
          class: normalizeClass(["h-10 w-10 inline-flex items-center justify-center rounded-md focus:outline-none", __props.darkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-900"])
        }, [
          _cache[1] || (_cache[1] = createBaseVNode("span", { class: "sr-only" }, "打开菜单", -1)),
          createVNode(unref(IconHamburger), {
            size: "lg",
            "aria-hidden": "true"
          })
        ], 2),
        createBaseVNode("h1", {
          class: normalizeClass(["ml-3 text-lg font-medium", __props.darkMode ? "text-white" : "text-gray-900"])
        }, toDisplayString(currentPageTitle.value), 3)
      ], 2);
    };
  }
};
const AdminHeader = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-75778196"]]);
const _hoisted_1 = {
  class: "w-full mx-auto flex-1 flex flex-col",
  style: { "max-width": "1280px" }
};
const _hoisted_2 = { class: "p-2 md:p-4 flex-1 flex flex-col" };
const _sfc_main = {
  __name: "AdminLayout",
  emits: ["logout"],
  setup(__props, { emit: __emit }) {
    const { isDarkMode: darkMode } = useThemeMode();
    const authStore = useAuthStore();
    const router = useRouter();
    const userPermissions = computed(() => ({
      isAdmin: authStore.isAdmin,
      text: authStore.hasTextManagePermission,
      file: authStore.hasFileManagePermission,
      mount: authStore.hasMountPermission
    }));
    const isMobileSidebarOpen = ref(false);
    const sidebarCollapsed = ref(false);
    const toggleMobileSidebar = () => {
      isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
    };
    const closeMobileSidebar = () => {
      isMobileSidebarOpen.value = false;
    };
    const handleSidebarToggle = (event) => {
      sidebarCollapsed.value = event.collapsed;
    };
    onMounted(async () => {
      if (authStore.needsRevalidation) {
        await authStore.validateAuth();
      }
      useEventListener(window, "auth-state-changed", handleAuthStateChange);
    });
    const handleAuthStateChange = (event) => {
    };
    const handleLogout = async () => {
      await authStore.logout();
      router.push({ name: "Home" });
    };
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["h-screen", unref(darkMode) ? "bg-gray-900" : "bg-gray-100"])
      }, [
        createVNode(AdminSidebar, {
          "dark-mode": unref(darkMode),
          permissions: userPermissions.value,
          "is-mobile-sidebar-open": isMobileSidebarOpen.value,
          onCloseMobileSidebar: closeMobileSidebar,
          onSidebarToggle: handleSidebarToggle,
          onLogout: handleLogout
        }, null, 8, ["dark-mode", "permissions", "is-mobile-sidebar-open"]),
        createVNode(AdminHeader, {
          "dark-mode": unref(darkMode),
          onToggleMobileSidebar: toggleMobileSidebar
        }, null, 8, ["dark-mode"]),
        createBaseVNode("main", {
          class: normalizeClass(["w-full md:w-auto md:fixed md:left-64 md:top-16 md:right-0 md:bottom-0 md:overflow-y-auto focus:outline-none z-40 transition-all duration-300", [sidebarCollapsed.value ? "md:left-16" : "md:left-64", unref(darkMode) ? "bg-gray-900" : "bg-white md:bg-gray-100"]])
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["min-h-full flex flex-col pt-2 md:pt-4 pb-4 px-2 sm:px-4 md:px-6 lg:px-8", unref(darkMode) ? "bg-gray-900" : "bg-gray-100 md:bg-transparent"])
          }, [
            createBaseVNode("div", _hoisted_1, [
              createBaseVNode("div", {
                class: normalizeClass(["rounded-lg flex-1 flex flex-col", unref(darkMode) ? "bg-gray-800" : "bg-white border border-gray-200"])
              }, [
                createBaseVNode("div", _hoisted_2, [
                  createVNode(_component_router_view, {
                    permissions: userPermissions.value,
                    "dark-mode": unref(darkMode),
                    onLogout: handleLogout
                  }, null, 8, ["permissions", "dark-mode"])
                ])
              ], 2)
            ])
          ], 2)
        ], 2)
      ], 2);
    };
  }
};
export {
  _sfc_main as default
};
