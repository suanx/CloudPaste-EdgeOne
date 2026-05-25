import { F as computed, j as createElementBlock, k as openBlock, z as createVNode, p as createCommentVNode, n as normalizeClass, y as unref, J as IconRefresh, t as toDisplayString } from "./index-BQxzU9F1.js";
const _sfc_main = {
  __name: "LoadingIndicator",
  props: {
    text: {
      type: String,
      default: ""
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "xl"
    },
    iconClass: {
      type: String,
      default: ""
    },
    textClass: {
      type: String,
      default: ""
    },
    containerClass: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const resolvedTextClass = computed(() => {
      if (props.textClass) {
        return props.textClass;
      }
      return props.darkMode ? "text-gray-400" : "text-gray-600";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["loading-indicator flex flex-col items-center justify-center", __props.containerClass])
      }, [
        createVNode(unref(IconRefresh), {
          size: __props.size,
          class: normalizeClass(["animate-spin", [__props.iconClass, __props.text ? "mb-2" : ""]]),
          "aria-hidden": "true"
        }, null, 8, ["size", "class"]),
        __props.text ? (openBlock(), createElementBlock("p", {
          key: 0,
          class: normalizeClass(["text-sm", resolvedTextClass.value])
        }, toDisplayString(__props.text), 3)) : createCommentVNode("", true)
      ], 2);
    };
  }
};
export {
  _sfc_main as _
};
