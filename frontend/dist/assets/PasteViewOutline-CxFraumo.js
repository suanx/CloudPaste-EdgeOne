import { aK as _export_sfc, aN as useCssVars, g as ref, aO as useBreakpoints, F as computed, w as watch, aY as onBeforeUnmount, j as createElementBlock, k as openBlock, l as createBaseVNode, q as withDirectives, n as normalizeClass, z as createVNode, y as unref, ao as IconChevronDown, aq as vShow, K as Fragment, L as renderList, p as createCommentVNode, m as withModifiers, t as toDisplayString, aD as normalizeStyle, aU as renderSlot, u as useEventListener, aQ as breakpointsTailwind } from "./index-BQxzU9F1.js";
import { d as debugLog } from "./PasteView-BAV1za1x.js";
import "./timeUtils-D81jJILb.js";
import "./LoadingIndicator-C1Dntewf.js";
import "./clipboard-GLHRBPpJ.js";
import "./pasteService-CHRbddSC.js";
import "./useAdminBase-CxkodUK-.js";
import "./storageConfigsStore-DUFoycii.js";
const _hoisted_1 = { class: "outline-container flex-1 overflow-y-auto pr-2 hide-scrollbar" };
const _hoisted_2 = {
  key: 0,
  class: "py-8 text-center text-gray-500"
};
const _hoisted_3 = {
  key: 1,
  class: "space-y-1"
};
const _hoisted_4 = ["onClick"];
const _hoisted_5 = ["onClick"];
const _hoisted_6 = { key: 0 };
const _hoisted_7 = { key: 1 };
const _hoisted_8 = {
  key: 1,
  class: "w-5"
};
const _hoisted_9 = {
  key: 0,
  class: "pl-4 space-y-1 mt-1"
};
const _hoisted_10 = ["onClick"];
const _hoisted_11 = ["onClick"];
const _hoisted_12 = { key: 0 };
const _hoisted_13 = { key: 1 };
const _hoisted_14 = {
  key: 1,
  class: "w-5"
};
const _hoisted_15 = {
  key: 0,
  class: "pl-4 space-y-1 mt-1"
};
const _hoisted_16 = ["onClick"];
const _hoisted_17 = ["onClick"];
const _hoisted_18 = { key: 0 };
const _hoisted_19 = { key: 1 };
const _hoisted_20 = {
  key: 1,
  class: "w-5"
};
const _hoisted_21 = {
  key: 0,
  class: "pl-4 space-y-1 mt-1"
};
const _hoisted_22 = ["onClick"];
const _hoisted_23 = ["onClick"];
const _hoisted_24 = { key: 0 };
const _hoisted_25 = { key: 1 };
const _hoisted_26 = {
  key: 1,
  class: "w-5"
};
const _hoisted_27 = {
  key: 0,
  class: "pl-4 space-y-1 mt-1"
};
const _hoisted_28 = ["onClick"];
const _hoisted_29 = ["onClick"];
const _hoisted_30 = { key: 0 };
const _hoisted_31 = { key: 1 };
const _hoisted_32 = {
  key: 1,
  class: "w-5"
};
const _hoisted_33 = {
  key: 0,
  class: "pl-4 space-y-1 mt-1"
};
const _hoisted_34 = ["onClick"];
const _sfc_main = {
  __name: "PasteViewOutline",
  props: {
    // 是否为暗色模式
    darkMode: {
      type: Boolean,
      required: true
    },
    // 扁平化的大纲数据数组
    outlineData: {
      type: Array,
      default: () => []
    },
    // 树形结构的大纲数据
    outlineTreeData: {
      type: Array,
      default: () => []
    },
    // 原始Markdown内容
    content: {
      type: String,
      default: ""
    },
    // 是否为开发环境
    isDev: {
      type: Boolean,
      default: false
    },
    // 是否启用调试日志
    enableDebug: {
      type: Boolean,
      default: false
    }
  },
  emits: ["heading-click"],
  setup(__props, { emit: __emit }) {
    useCssVars((_ctx) => ({
      "3c52cc06": __props.darkMode ? "rgba(75, 85, 99, 0.4)" : "rgba(229, 231, 235, 0.6)",
      "4cb35346": __props.darkMode ? "rgba(75, 85, 99, 0.6)" : "rgba(229, 231, 235, 0.8)",
      "23f97904": __props.darkMode ? "#1F2937" : "#F9FAFB",
      "736f2b68": __props.darkMode ? "#374151" : "#E5E7EB"
    }));
    const props = __props;
    const emit = __emit;
    const leftPanelWidth = ref(25);
    const isDragging = ref(false);
    const startX = ref(0);
    const startWidth = ref(0);
    let stopDragMouseMove = null;
    let stopDragMouseUp = null;
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const isMobile = breakpoints.smaller("md");
    const isOutlineExpanded = ref(false);
    const scrollToHeading = (id) => {
      if (!id) return;
      emit("heading-click", id);
    };
    const toggleOutlineItem = (item, event) => {
      if (event) {
        event.stopPropagation();
      }
      if (item.children && item.children.length > 0) {
        item.expanded = !item.expanded;
      }
    };
    const startDrag = (e) => {
      isDragging.value = true;
      startX.value = e.clientX;
      startWidth.value = leftPanelWidth.value;
      if (typeof stopDragMouseMove === "function") stopDragMouseMove();
      if (typeof stopDragMouseUp === "function") stopDragMouseUp();
      stopDragMouseMove = useEventListener(document, "mousemove", onDrag, { passive: false });
      stopDragMouseUp = useEventListener(document, "mouseup", stopDrag);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      const contentScrollEl = document.querySelector(".content-scroll");
      if (contentScrollEl) {
        contentScrollEl.setAttribute("data-scroll-top", contentScrollEl.scrollTop);
        contentScrollEl.classList.add("no-scroll");
        contentScrollEl.style.overflowY = "hidden";
      }
      document.querySelector(".outline-grid-container")?.classList.add("dragging");
    };
    const onDrag = (e) => {
      if (!isDragging.value) return;
      e.preventDefault();
      e.stopPropagation();
      const containerWidth = document.querySelector(".outline-grid-container")?.clientWidth || 1e3;
      const deltaX = e.clientX - startX.value;
      const deltaPercent = deltaX / containerWidth * 100;
      let newWidth = startWidth.value + deltaPercent;
      newWidth = Math.max(10, Math.min(50, newWidth));
      leftPanelWidth.value = newWidth;
      const contentPanel = document.querySelector(".content-panel");
      if (contentPanel) {
        contentPanel.style.width = `${100 - newWidth}%`;
      }
    };
    const stopDrag = () => {
      isDragging.value = false;
      if (typeof stopDragMouseMove === "function") stopDragMouseMove();
      if (typeof stopDragMouseUp === "function") stopDragMouseUp();
      stopDragMouseMove = null;
      stopDragMouseUp = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      const contentScrollEl = document.querySelector(".content-scroll");
      if (contentScrollEl) {
        contentScrollEl.classList.remove("no-scroll");
        contentScrollEl.style.overflowY = "auto";
        const savedScrollTop = contentScrollEl.getAttribute("data-scroll-top");
        if (savedScrollTop) {
          contentScrollTop = parseInt(savedScrollTop);
          contentScrollEl.scrollTop = contentScrollTop;
        }
      }
      document.querySelector(".outline-grid-container")?.classList.remove("dragging");
    };
    const leftPanelStyle = computed(() => {
      return {
        width: `${leftPanelWidth.value}%`
      };
    });
    const rightPanelStyle = computed(() => {
      return {
        width: `${100 - leftPanelWidth.value}%`
      };
    });
    watch(
      isMobile,
      (mobile) => {
        if (mobile) isOutlineExpanded.value = false;
      },
      { immediate: true }
    );
    const toggleOutlineOnMobile = () => {
      if (isMobile.value) {
        isOutlineExpanded.value = !isOutlineExpanded.value;
        debugLog(props.enableDebug, props.isDev, "切换移动端大纲状态:", isOutlineExpanded.value ? "展开" : "收起");
      }
    };
    onBeforeUnmount(() => {
      if (isDragging.value) {
        stopDrag();
      } else {
        if (typeof stopDragMouseMove === "function") stopDragMouseMove();
        if (typeof stopDragMouseUp === "function") stopDragMouseUp();
      }
      stopDragMouseMove = null;
      stopDragMouseUp = null;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["outline-grid-container flex flex-col md:flex-row select-none outline-container-height", { dragging: isDragging.value }])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["outline-panel md:p-4 border-b md:border-b-0 md:border-r overflow-hidden flex flex-col transition-all duration-300", [__props.darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50", unref(isMobile) ? isOutlineExpanded.value ? "h-[300px]" : "h-[48px]" : "h-full"]]),
          style: normalizeStyle(!unref(isMobile) ? leftPanelStyle.value : {})
        }, [
          createBaseVNode("div", {
            class: "flex items-center justify-between p-3 md:p-0 md:mb-4 cursor-pointer md:cursor-default",
            onClick: toggleOutlineOnMobile
          }, [
            createBaseVNode("h3", {
              class: normalizeClass(["text-lg font-medium", [__props.darkMode ? "text-white" : "text-gray-900"]])
            }, "文档大纲", 2),
            createBaseVNode("button", {
              class: normalizeClass(["md:hidden p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700", __props.darkMode ? "text-gray-300" : "text-gray-600"])
            }, [
              createVNode(unref(IconChevronDown), {
                size: "md",
                class: normalizeClass(["w-5 h-5 transform transition-transform duration-300", { "rotate-180": isOutlineExpanded.value }])
              }, null, 8, ["class"])
            ], 2)
          ]),
          withDirectives(createBaseVNode("div", _hoisted_1, [
            __props.outlineTreeData.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_2, _cache[0] || (_cache[0] = [
              createBaseVNode("p", null, "无大纲信息", -1)
            ]))) : (openBlock(), createElementBlock("ul", _hoisted_3, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.outlineTreeData, (item, index) => {
                return openBlock(), createElementBlock("li", {
                  key: index,
                  class: "outline-item"
                }, [
                  createBaseVNode("div", {
                    class: "flex items-center cursor-pointer rounded hover:bg-gray-200 dark:hover:bg-gray-700 py-1.5 px-2 transition-colors",
                    onClick: ($event) => scrollToHeading(item.id)
                  }, [
                    item.children && item.children.length > 0 ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      onClick: withModifiers(($event) => toggleOutlineItem(item, $event), ["stop"]),
                      class: "mr-1 w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",
                      "aria-label": "展开或折叠子项"
                    }, [
                      item.expanded ? (openBlock(), createElementBlock("span", _hoisted_6, "▼")) : (openBlock(), createElementBlock("span", _hoisted_7, "▶"))
                    ], 8, _hoisted_5)) : (openBlock(), createElementBlock("span", _hoisted_8)),
                    createBaseVNode("span", {
                      class: normalizeClass(["block truncate", [item.level === 1 ? "font-bold" : "", item.level === 2 ? "font-semibold" : "", __props.darkMode ? "text-gray-200" : "text-gray-800"]])
                    }, toDisplayString(item.text), 3)
                  ], 8, _hoisted_4),
                  item.children && item.children.length > 0 && item.expanded ? (openBlock(), createElementBlock("ul", _hoisted_9, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.children, (child, childIndex) => {
                      return openBlock(), createElementBlock("li", {
                        key: `${index}-${childIndex}`,
                        class: "outline-item"
                      }, [
                        createBaseVNode("div", {
                          class: "flex items-center cursor-pointer rounded hover:bg-gray-200 dark:hover:bg-gray-700 py-1.5 px-2 transition-colors",
                          onClick: ($event) => scrollToHeading(child.id)
                        }, [
                          child.children && child.children.length > 0 ? (openBlock(), createElementBlock("button", {
                            key: 0,
                            onClick: withModifiers(($event) => toggleOutlineItem(child, $event), ["stop"]),
                            class: "mr-1 w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",
                            "aria-label": "展开或折叠子项"
                          }, [
                            child.expanded ? (openBlock(), createElementBlock("span", _hoisted_12, "▼")) : (openBlock(), createElementBlock("span", _hoisted_13, "▶"))
                          ], 8, _hoisted_11)) : (openBlock(), createElementBlock("span", _hoisted_14)),
                          createBaseVNode("span", {
                            class: normalizeClass(["block truncate", [child.level === 1 ? "font-bold" : "", child.level === 2 ? "font-semibold" : "", __props.darkMode ? "text-gray-200" : "text-gray-800"]])
                          }, toDisplayString(child.text), 3)
                        ], 8, _hoisted_10),
                        child.children && child.children.length > 0 && child.expanded ? (openBlock(), createElementBlock("ul", _hoisted_15, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(child.children, (grandChild, grandChildIndex) => {
                            return openBlock(), createElementBlock("li", {
                              key: `${index}-${childIndex}-${grandChildIndex}`,
                              class: "outline-item"
                            }, [
                              createBaseVNode("div", {
                                class: "flex items-center cursor-pointer rounded hover:bg-gray-200 dark:hover:bg-gray-700 py-1.5 px-2 transition-colors",
                                onClick: ($event) => scrollToHeading(grandChild.id)
                              }, [
                                grandChild.children && grandChild.children.length > 0 ? (openBlock(), createElementBlock("button", {
                                  key: 0,
                                  onClick: withModifiers(($event) => toggleOutlineItem(grandChild, $event), ["stop"]),
                                  class: "mr-1 w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",
                                  "aria-label": "展开或折叠子项"
                                }, [
                                  grandChild.expanded ? (openBlock(), createElementBlock("span", _hoisted_18, "▼")) : (openBlock(), createElementBlock("span", _hoisted_19, "▶"))
                                ], 8, _hoisted_17)) : (openBlock(), createElementBlock("span", _hoisted_20)),
                                createBaseVNode("span", {
                                  class: normalizeClass(["block truncate", [grandChild.level === 1 ? "font-bold" : "", grandChild.level === 2 ? "font-semibold" : "", __props.darkMode ? "text-gray-200" : "text-gray-800"]])
                                }, toDisplayString(grandChild.text), 3)
                              ], 8, _hoisted_16),
                              grandChild.children && grandChild.children.length > 0 && grandChild.expanded ? (openBlock(), createElementBlock("ul", _hoisted_21, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(grandChild.children, (greatGrandChild, greatGrandChildIndex) => {
                                  return openBlock(), createElementBlock("li", {
                                    key: `${index}-${childIndex}-${grandChildIndex}-${greatGrandChildIndex}`,
                                    class: "outline-item"
                                  }, [
                                    createBaseVNode("div", {
                                      class: "flex items-center cursor-pointer rounded hover:bg-gray-200 dark:hover:bg-gray-700 py-1.5 px-2 transition-colors",
                                      onClick: ($event) => scrollToHeading(greatGrandChild.id)
                                    }, [
                                      greatGrandChild.children && greatGrandChild.children.length > 0 ? (openBlock(), createElementBlock("button", {
                                        key: 0,
                                        onClick: withModifiers(($event) => toggleOutlineItem(greatGrandChild, $event), ["stop"]),
                                        class: "mr-1 w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",
                                        "aria-label": "展开或折叠子项"
                                      }, [
                                        greatGrandChild.expanded ? (openBlock(), createElementBlock("span", _hoisted_24, "▼")) : (openBlock(), createElementBlock("span", _hoisted_25, "▶"))
                                      ], 8, _hoisted_23)) : (openBlock(), createElementBlock("span", _hoisted_26)),
                                      createBaseVNode("span", {
                                        class: normalizeClass(["block truncate", [
                                          greatGrandChild.level === 1 ? "font-bold" : "",
                                          greatGrandChild.level === 2 ? "font-semibold" : "",
                                          __props.darkMode ? "text-gray-200" : "text-gray-800"
                                        ]])
                                      }, toDisplayString(greatGrandChild.text), 3)
                                    ], 8, _hoisted_22),
                                    greatGrandChild.children && greatGrandChild.children.length > 0 && greatGrandChild.expanded ? (openBlock(), createElementBlock("ul", _hoisted_27, [
                                      (openBlock(true), createElementBlock(Fragment, null, renderList(greatGrandChild.children, (lvl5Child, lvl5Index) => {
                                        return openBlock(), createElementBlock("li", {
                                          key: `${index}-${childIndex}-${grandChildIndex}-${greatGrandChildIndex}-${lvl5Index}`,
                                          class: "outline-item"
                                        }, [
                                          createBaseVNode("div", {
                                            class: "flex items-center cursor-pointer rounded hover:bg-gray-200 dark:hover:bg-gray-700 py-1.5 px-2 transition-colors",
                                            onClick: ($event) => scrollToHeading(lvl5Child.id)
                                          }, [
                                            lvl5Child.children && lvl5Child.children.length > 0 ? (openBlock(), createElementBlock("button", {
                                              key: 0,
                                              onClick: withModifiers(($event) => toggleOutlineItem(lvl5Child, $event), ["stop"]),
                                              class: "mr-1 w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",
                                              "aria-label": "展开或折叠子项"
                                            }, [
                                              lvl5Child.expanded ? (openBlock(), createElementBlock("span", _hoisted_30, "▼")) : (openBlock(), createElementBlock("span", _hoisted_31, "▶"))
                                            ], 8, _hoisted_29)) : (openBlock(), createElementBlock("span", _hoisted_32)),
                                            createBaseVNode("span", {
                                              class: normalizeClass(["block truncate", [__props.darkMode ? "text-gray-300" : "text-gray-700"]])
                                            }, toDisplayString(lvl5Child.text), 3)
                                          ], 8, _hoisted_28),
                                          lvl5Child.children && lvl5Child.children.length > 0 && lvl5Child.expanded ? (openBlock(), createElementBlock("ul", _hoisted_33, [
                                            (openBlock(true), createElementBlock(Fragment, null, renderList(lvl5Child.children, (lvl6Child, lvl6Index) => {
                                              return openBlock(), createElementBlock("li", {
                                                key: `${index}-${childIndex}-${grandChildIndex}-${greatGrandChildIndex}-${lvl5Index}-${lvl6Index}`,
                                                class: "outline-item"
                                              }, [
                                                createBaseVNode("div", {
                                                  class: "flex items-center cursor-pointer rounded hover:bg-gray-200 dark:hover:bg-gray-700 py-1.5 px-2 transition-colors",
                                                  onClick: ($event) => scrollToHeading(lvl6Child.id)
                                                }, [
                                                  _cache[1] || (_cache[1] = createBaseVNode("span", { class: "w-5" }, null, -1)),
                                                  createBaseVNode("span", {
                                                    class: normalizeClass(["block truncate", [__props.darkMode ? "text-gray-400" : "text-gray-600"]])
                                                  }, toDisplayString(lvl6Child.text), 3)
                                                ], 8, _hoisted_34)
                                              ]);
                                            }), 128))
                                          ])) : createCommentVNode("", true)
                                        ]);
                                      }), 128))
                                    ])) : createCommentVNode("", true)
                                  ]);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ]);
                          }), 128))
                        ])) : createCommentVNode("", true)
                      ]);
                    }), 128))
                  ])) : createCommentVNode("", true)
                ]);
              }), 128))
            ]))
          ], 512), [
            [vShow, isOutlineExpanded.value || !unref(isMobile)]
          ])
        ], 6),
        createBaseVNode("div", {
          class: normalizeClass(["resizer-handle hidden md:block", __props.darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"]),
          onMousedown: withModifiers(startDrag, ["prevent"])
        }, null, 34),
        createBaseVNode("div", {
          class: normalizeClass(["content-panel h-full md:relative flex-grow flex flex-col overflow-hidden", [unref(isMobile) ? "w-full" : "", isOutlineExpanded.value ? "h-[calc(100%-300px)] md:h-full" : "h-[calc(100%-48px)] md:h-full", isDragging.value ? "dragging" : ""]]),
          style: normalizeStyle(unref(isMobile) ? {} : rightPanelStyle.value)
        }, [
          renderSlot(_ctx.$slots, "content", {}, void 0, true)
        ], 6)
      ], 2);
    };
  }
};
const PasteViewOutline = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e601fac4"]]);
export {
  PasteViewOutline as default
};
