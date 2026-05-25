import { e as useI18n, F as computed, j as createElementBlock, k as openBlock, K as Fragment, L as renderList, n as normalizeClass, M as createBlock, N as resolveDynamicComponent, O as IconGrid, P as IconCollection, Q as IconList } from "./index-BQxzU9F1.js";
const _hoisted_1 = {
  class: "inline-flex rounded-md shadow-sm",
  role: "group"
};
const _hoisted_2 = ["title", "onClick"];
const _sfc_main = {
  __name: "ViewModeToggle",
  props: {
    /**
     * 当前选中的视图模式值 (v-model)
     */
    modelValue: {
      type: String,
      required: true
    },
    /**
     * 视图选项数组
     * @type {Array<{ value: string, icon: string, titleKey?: string, title?: string }>}
     */
    options: {
      type: Array,
      required: true,
      validator: (val) => val.length >= 2 && val.every((opt) => opt.value && opt.icon)
    },
    /**
     * 暗色模式
     */
    darkMode: {
      type: Boolean,
      default: false
    },
    /**
     * 尺寸大小
     */
    size: {
      type: String,
      default: "md",
      validator: (val) => ["sm", "md"].includes(val)
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t, te } = useI18n();
    const getOptionTitle = (option) => {
      if (option.titleKey && te(option.titleKey)) {
        return t(option.titleKey);
      }
      return option.title || option.value;
    };
    const sizeConfig = computed(() => ({
      sm: {
        button: "px-2 py-1.5 text-xs"
      },
      md: {
        button: "px-3 py-2 text-sm"
      }
    }));
    const currentSize = computed(() => sizeConfig.value[props.size]);
    const getBorderClass = (index) => {
      const total = props.options.length;
      if (index === 0) {
        return "rounded-l-md border";
      } else if (index === total - 1) {
        return "rounded-r-md border-t border-r border-b";
      }
      return "border-t border-r border-b";
    };
    const getStateClass = (isActive) => {
      if (isActive) {
        return "bg-primary-600 text-white border-primary-600 hover:bg-primary-700";
      }
      return props.darkMode ? "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";
    };
    const getButtonClass = (option, index) => {
      const isActive = props.modelValue === option.value;
      return [
        "inline-flex items-center justify-center font-medium",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset",
        "transition-colors duration-200",
        currentSize.value.button,
        getBorderClass(index),
        getStateClass(isActive)
      ];
    };
    const handleClick = (value) => {
      if (value !== props.modelValue) {
        emit("update:modelValue", value);
      }
    };
    const iconComponentMap = {
      table: IconList,
      list: IconList,
      card: IconCollection,
      grid: IconGrid,
      masonry: IconGrid
    };
    const getIconComponent = (icon) => iconComponentMap[icon] || IconList;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (option, index) => {
          return openBlock(), createElementBlock("button", {
            key: option.value,
            type: "button",
            class: normalizeClass(getButtonClass(option, index)),
            title: getOptionTitle(option),
            onClick: ($event) => handleClick(option.value)
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(getIconComponent(option.icon)), {
              size: props.size,
              class: "shrink-0"
            }, null, 8, ["size"]))
          ], 10, _hoisted_2);
        }), 128))
      ]);
    };
  }
};
export {
  _sfc_main as _
};
