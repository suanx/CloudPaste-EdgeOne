import { aK as _export_sfc, e as useI18n, b0 as useExplorerSettings, b1 as storeToRefs, M as createBlock, k as openBlock, z as createVNode, aE as withCtx, j as createElementBlock, p as createCommentVNode, aF as Transition, m as withModifiers, n as normalizeClass, l as createBaseVNode, t as toDisplayString, y as unref, G as IconClose, K as Fragment, L as renderList, Q as IconList, O as IconGrid, at as IconGallery, N as resolveDynamicComponent, ap as IconChevronUp, aV as Teleport, a$ as h } from "./index-BQxzU9F1.js";
const _hoisted_1 = { class: "p-4 space-y-6" };
const _hoisted_2 = { class: "flex gap-2" };
const _hoisted_3 = { class: "text-xs" };
const _hoisted_4 = { class: "space-y-2" };
const _hoisted_5 = { class: "flex items-center gap-3" };
const _hoisted_6 = ["value"];
const _hoisted_7 = { class: "space-y-2" };
const _hoisted_8 = { class: "flex items-center gap-3" };
const _hoisted_9 = ["value"];
const _hoisted_10 = { class: "space-y-3" };
const _hoisted_11 = { class: "space-y-3" };
const _hoisted_12 = ["value"];
const _hoisted_13 = { value: "name" };
const _hoisted_14 = { value: "size" };
const _hoisted_15 = { value: "modified" };
const _hoisted_16 = { value: "type" };
const _hoisted_17 = { class: "flex items-center justify-between" };
const _hoisted_18 = ["value"];
const _hoisted_19 = { value: "ellipsis" };
const _hoisted_20 = { value: "scroll" };
const _hoisted_21 = { value: "wrap" };
const _sfc_main = {
  __name: "SettingsDrawer",
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
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const SettingSection = (props, { slots }) => {
      return h("div", { class: "space-y-2" }, [
        h("h4", {
          class: `text-sm font-medium ${props.darkMode ? "text-gray-200" : "text-gray-800"}`
        }, props.title),
        slots.default?.()
      ]);
    };
    SettingSection.props = ["title", "darkMode"];
    const ToggleItem = (props, { emit: emit2 }) => {
      return h("label", {
        class: `flex items-center justify-between cursor-pointer`
      }, [
        h("span", {
          class: `text-sm ${props.darkMode ? "text-gray-300" : "text-gray-700"}`
        }, props.label),
        h("button", {
          type: "button",
          role: "switch",
          "aria-checked": props.checked,
          class: `relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-token-fast ${props.checked ? "bg-primary-500" : props.darkMode ? "bg-gray-600" : "bg-gray-300"}`,
          onClick: () => emit2("change", !props.checked)
        }, [
          h("span", {
            class: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-token-fast ${props.checked ? "translate-x-4" : "translate-x-0.5"}`
          })
        ])
      ]);
    };
    ToggleItem.props = ["label", "checked", "darkMode"];
    ToggleItem.emits = ["change"];
    const ViewModeButton = (props, { slots, emit: emit2 }) => {
      return h("button", {
        class: `flex-1 flex flex-col items-center gap-1 px-3 py-2 rounded-token-md border transition-all duration-token-fast ${props.active ? props.darkMode ? "bg-primary-500/20 border-primary-500 text-primary-400" : "bg-primary-50 border-primary-500 text-primary-600" : props.darkMode ? "bg-gray-700 border-gray-600 text-gray-400 hover:border-gray-500" : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"}`,
        onClick: () => emit2("click")
      }, slots.default?.());
    };
    ViewModeButton.props = ["active", "darkMode"];
    ViewModeButton.emits = ["click"];
    const emit = __emit;
    const { t } = useI18n();
    const explorerSettings = useExplorerSettings();
    const { settings } = storeToRefs(explorerSettings);
    const viewModes = [
      {
        value: "list",
        label: "mount.settings.listView",
        icon: IconList
      },
      {
        value: "grid",
        label: "mount.settings.gridView",
        icon: IconGrid
      },
      {
        value: "gallery",
        label: "mount.settings.galleryView",
        icon: IconGallery
      }
    ];
    function updateSetting(key, value) {
      explorerSettings.updateSetting(key, value);
    }
    function toggleSortOrder() {
      explorerSettings.toggleSortOrder();
    }
    function handleReset() {
      explorerSettings.resetSettings();
    }
    function handleClose() {
      emit("close");
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(Transition, { name: "fade" }, {
          default: withCtx(() => [
            __props.isOpen ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm",
              onClick: handleClose
            })) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(Transition, { name: "slide-right" }, {
          default: withCtx(() => [
            __props.isOpen ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["fixed top-0 right-0 z-[61] h-full w-80 max-w-[90vw] overflow-y-auto shadow-token-4", __props.darkMode ? "bg-gray-800" : "bg-white"]),
              onClick: _cache[8] || (_cache[8] = withModifiers(() => {
              }, ["stop"]))
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b", __props.darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"])
              }, [
                createBaseVNode("h3", {
                  class: normalizeClass(["text-base font-medium", __props.darkMode ? "text-gray-100" : "text-gray-900"])
                }, toDisplayString(unref(t)("mount.settings.title")), 3),
                createBaseVNode("button", {
                  onClick: handleClose,
                  class: normalizeClass(["p-1.5 rounded-token-md transition-colors duration-token-fast", __props.darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"])
                }, [
                  createVNode(unref(IconClose), {
                    size: "md",
                    class: "w-5 h-5",
                    "aria-hidden": "true"
                  })
                ], 2)
              ], 2),
              createBaseVNode("div", _hoisted_1, [
                createVNode(SettingSection, {
                  title: unref(t)("mount.settings.viewMode"),
                  "dark-mode": __props.darkMode
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2, [
                      (openBlock(), createElementBlock(Fragment, null, renderList(viewModes, (mode) => {
                        return createVNode(ViewModeButton, {
                          key: mode.value,
                          active: unref(settings).viewMode === mode.value,
                          "dark-mode": __props.darkMode,
                          onClick: ($event) => updateSetting("viewMode", mode.value)
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(mode.icon), {
                              size: "sm",
                              "aria-hidden": "true"
                            })),
                            createBaseVNode("span", _hoisted_3, toDisplayString(unref(t)(mode.label)), 1)
                          ]),
                          _: 2
                        }, 1032, ["active", "dark-mode", "onClick"]);
                      }), 64))
                    ])
                  ]),
                  _: 1
                }, 8, ["title", "dark-mode"]),
                createVNode(SettingSection, {
                  title: unref(t)("mount.settings.density"),
                  "dark-mode": __props.darkMode
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_4, [
                      createBaseVNode("div", _hoisted_5, [
                        createBaseVNode("input", {
                          type: "range",
                          min: "0",
                          max: "100",
                          value: unref(settings).densityValue,
                          onInput: _cache[0] || (_cache[0] = ($event) => updateSetting("densityValue", parseInt($event.target.value))),
                          class: normalizeClass(["flex-1 h-2 rounded-full appearance-none cursor-pointer slider-thumb", __props.darkMode ? "bg-gray-600" : "bg-gray-200"])
                        }, null, 42, _hoisted_6),
                        createBaseVNode("span", {
                          class: normalizeClass(["text-xs w-8 text-right", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                        }, toDisplayString(unref(settings).densityValue), 3)
                      ]),
                      createBaseVNode("div", {
                        class: normalizeClass(["flex justify-between text-xs", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                      }, [
                        createBaseVNode("span", null, toDisplayString(unref(t)("mount.settings.densityCompact")), 1),
                        createBaseVNode("span", null, toDisplayString(unref(t)("mount.settings.densitySpacious")), 1)
                      ], 2)
                    ])
                  ]),
                  _: 1
                }, 8, ["title", "dark-mode"]),
                createVNode(SettingSection, {
                  title: unref(t)("mount.settings.itemSpacing"),
                  "dark-mode": __props.darkMode
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_7, [
                      createBaseVNode("div", _hoisted_8, [
                        createBaseVNode("input", {
                          type: "range",
                          min: "0",
                          max: "100",
                          value: unref(settings).spacingValue,
                          onInput: _cache[1] || (_cache[1] = ($event) => updateSetting("spacingValue", parseInt($event.target.value))),
                          class: normalizeClass(["flex-1 h-2 rounded-full appearance-none cursor-pointer slider-thumb", __props.darkMode ? "bg-gray-600" : "bg-gray-200"])
                        }, null, 42, _hoisted_9),
                        createBaseVNode("span", {
                          class: normalizeClass(["text-xs w-8 text-right", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                        }, toDisplayString(unref(settings).spacingValue), 3)
                      ]),
                      createBaseVNode("div", {
                        class: normalizeClass(["flex justify-between text-xs", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                      }, [
                        createBaseVNode("span", null, toDisplayString(unref(t)("mount.settings.spacingCompact")), 1),
                        createBaseVNode("span", null, toDisplayString(unref(t)("mount.settings.spacingRelaxed")), 1)
                      ], 2)
                    ])
                  ]),
                  _: 1
                }, 8, ["title", "dark-mode"]),
                createVNode(SettingSection, {
                  title: unref(t)("mount.settings.displayOptions"),
                  "dark-mode": __props.darkMode
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_10, [
                      createVNode(ToggleItem, {
                        label: unref(t)("mount.settings.showCheckboxes"),
                        checked: unref(settings).showCheckboxes,
                        "dark-mode": __props.darkMode,
                        onChange: _cache[2] || (_cache[2] = ($event) => updateSetting("showCheckboxes", $event))
                      }, null, 8, ["label", "checked", "dark-mode"]),
                      createVNode(ToggleItem, {
                        label: unref(t)("mount.settings.showActionButtons"),
                        checked: unref(settings).showActionButtons,
                        "dark-mode": __props.darkMode,
                        onChange: _cache[3] || (_cache[3] = ($event) => updateSetting("showActionButtons", $event))
                      }, null, 8, ["label", "checked", "dark-mode"])
                    ])
                  ]),
                  _: 1
                }, 8, ["title", "dark-mode"]),
                createVNode(SettingSection, {
                  title: unref(t)("mount.settings.sorting"),
                  "dark-mode": __props.darkMode
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_11, [
                      createBaseVNode("div", null, [
                        createBaseVNode("label", {
                          class: normalizeClass(["block text-xs mb-1", __props.darkMode ? "text-gray-400" : "text-gray-500"])
                        }, toDisplayString(unref(t)("mount.settings.sortBy")), 3),
                        createBaseVNode("select", {
                          value: unref(settings).sortBy,
                          onChange: _cache[4] || (_cache[4] = ($event) => updateSetting("sortBy", $event.target.value)),
                          class: normalizeClass(["w-full px-3 py-2 rounded-token-md border text-sm transition-colors duration-token-fast", __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-700"])
                        }, [
                          createBaseVNode("option", _hoisted_13, toDisplayString(unref(t)("mount.settings.sortByName")), 1),
                          createBaseVNode("option", _hoisted_14, toDisplayString(unref(t)("mount.settings.sortBySize")), 1),
                          createBaseVNode("option", _hoisted_15, toDisplayString(unref(t)("mount.settings.sortByModified")), 1),
                          createBaseVNode("option", _hoisted_16, toDisplayString(unref(t)("mount.settings.sortByType")), 1)
                        ], 42, _hoisted_12)
                      ]),
                      createBaseVNode("div", _hoisted_17, [
                        createBaseVNode("span", {
                          class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                        }, toDisplayString(unref(t)("mount.settings.sortOrder")), 3),
                        createBaseVNode("button", {
                          onClick: toggleSortOrder,
                          class: normalizeClass(["flex items-center gap-1 px-2 py-1 rounded-token-md text-sm transition-colors duration-token-fast", __props.darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"])
                        }, [
                          createVNode(unref(IconChevronUp), {
                            size: "sm",
                            class: normalizeClass(["w-4 h-4 transition-transform duration-token-fast", { "rotate-180": unref(settings).sortOrder === "desc" }]),
                            "aria-hidden": "true"
                          }, null, 8, ["class"]),
                          createBaseVNode("span", null, toDisplayString(unref(settings).sortOrder === "asc" ? unref(t)("mount.settings.ascending") : unref(t)("mount.settings.descending")), 1)
                        ], 2)
                      ]),
                      createVNode(ToggleItem, {
                        label: unref(t)("mount.settings.foldersFirst"),
                        checked: unref(settings).foldersFirst,
                        "dark-mode": __props.darkMode,
                        onChange: _cache[5] || (_cache[5] = ($event) => updateSetting("foldersFirst", $event))
                      }, null, 8, ["label", "checked", "dark-mode"])
                    ])
                  ]),
                  _: 1
                }, 8, ["title", "dark-mode"]),
                createVNode(SettingSection, {
                  title: unref(t)("mount.settings.animations"),
                  "dark-mode": __props.darkMode
                }, {
                  default: withCtx(() => [
                    createVNode(ToggleItem, {
                      label: unref(t)("mount.settings.enableAnimations"),
                      checked: unref(settings).animationsEnabled,
                      "dark-mode": __props.darkMode,
                      onChange: _cache[6] || (_cache[6] = ($event) => updateSetting("animationsEnabled", $event))
                    }, null, 8, ["label", "checked", "dark-mode"])
                  ]),
                  _: 1
                }, 8, ["title", "dark-mode"]),
                createVNode(SettingSection, {
                  title: unref(t)("mount.settings.fileNameDisplay"),
                  "dark-mode": __props.darkMode
                }, {
                  default: withCtx(() => [
                    createBaseVNode("select", {
                      value: unref(settings).fileNameOverflow,
                      onChange: _cache[7] || (_cache[7] = ($event) => updateSetting("fileNameOverflow", $event.target.value)),
                      class: normalizeClass(["w-full px-3 py-2 rounded-token-md border text-sm transition-colors duration-token-fast", __props.darkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-700"])
                    }, [
                      createBaseVNode("option", _hoisted_19, toDisplayString(unref(t)("mount.settings.fileNameEllipsis")), 1),
                      createBaseVNode("option", _hoisted_20, toDisplayString(unref(t)("mount.settings.fileNameScroll")), 1),
                      createBaseVNode("option", _hoisted_21, toDisplayString(unref(t)("mount.settings.fileNameWrap")), 1)
                    ], 42, _hoisted_18)
                  ]),
                  _: 1
                }, 8, ["title", "dark-mode"]),
                createBaseVNode("div", {
                  class: normalizeClass(["pt-4 border-t", __props.darkMode ? "border-gray-700" : "border-gray-200"])
                }, [
                  createBaseVNode("button", {
                    onClick: handleReset,
                    class: normalizeClass(["w-full px-4 py-2 rounded-token-md text-sm font-medium transition-colors duration-token-fast", __props.darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"])
                  }, toDisplayString(unref(t)("mount.settings.resetToDefault")), 3)
                ], 2)
              ])
            ], 2)) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
};
const SettingsDrawer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c21a5b56"]]);
export {
  SettingsDrawer as default
};
