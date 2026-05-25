import { F as computed, j as createElementBlock, k as openBlock, l as createBaseVNode, p as createCommentVNode, z as createVNode, y as unref, V as IconSearch, n as normalizeClass, G as IconClose, t as toDisplayString, W as useDebounceFn } from "./index-BQxzU9F1.js";
const _hoisted_1 = { class: "relative" };
const _hoisted_2 = { class: "relative" };
const _hoisted_3 = { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" };
const _hoisted_4 = ["value", "placeholder"];
const _hoisted_5 = {
  key: 0,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center"
};
const _hoisted_6 = ["title"];
const _hoisted_7 = {
  key: 0,
  class: "mt-1 text-xs text-gray-500 dark:text-gray-400"
};
const _sfc_main = {
  __name: "GlobalSearchBox",
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "搜索..."
    },
    size: {
      type: String,
      default: "md",
      // sm, md, lg
      validator: (value) => ["sm", "md", "lg"].includes(value)
    },
    showHint: {
      type: Boolean,
      default: false
    },
    searchHint: {
      type: String,
      default: "支持搜索文件名、内容等"
    },
    clearButtonTitle: {
      type: String,
      default: "清除搜索"
    },
    debounceMs: {
      type: Number,
      default: 300
    },
    minSearchLength: {
      type: Number,
      default: 2
    }
  },
  emits: ["update:modelValue", "search", "clear"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const sizeClass = computed(() => {
      const sizeMap = {
        sm: "text-sm py-1.5",
        md: "text-sm py-2",
        lg: "text-base py-2.5"
      };
      return sizeMap[props.size] || sizeMap.md;
    });
    const emitSearchDebounced = useDebounceFn(
      (value) => {
        if (value.length >= props.minSearchLength || value.length === 0) {
          emit("search", value);
        }
      },
      () => props.debounceMs
    );
    const handleInput = (event) => {
      const value = event.target.value;
      emit("update:modelValue", value);
      emitSearchDebounced(value);
    };
    const clearSearch = () => {
      emit("update:modelValue", "");
      emit("search", "");
      emit("clear");
      emitSearchDebounced.cancel?.();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(unref(IconSearch), {
              size: "sm",
              class: "text-gray-400 dark:text-gray-500"
            })
          ]),
          createBaseVNode("input", {
            value: __props.modelValue,
            onInput: handleInput,
            type: "text",
            placeholder: __props.placeholder,
            class: normalizeClass([
              "block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 transition-colors duration-200",
              sizeClass.value
            ])
          }, null, 42, _hoisted_4),
          __props.modelValue ? (openBlock(), createElementBlock("div", _hoisted_5, [
            createBaseVNode("button", {
              onClick: clearSearch,
              type: "button",
              class: "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:text-gray-600 dark:focus:text-gray-300 transition-colors duration-200",
              title: __props.clearButtonTitle
            }, [
              createVNode(unref(IconClose), { size: "sm" })
            ], 8, _hoisted_6)
          ])) : createCommentVNode("", true)
        ]),
        __props.showHint && __props.modelValue ? (openBlock(), createElementBlock("div", _hoisted_7, toDisplayString(__props.searchHint), 1)) : createCommentVNode("", true)
      ]);
    };
  }
};
export {
  _sfc_main as _
};
