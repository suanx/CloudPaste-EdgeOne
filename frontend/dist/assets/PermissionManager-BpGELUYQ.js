import { aK as _export_sfc, f as useAuthStore, c as createLogger, F as computed, o as onMounted, u as useEventListener, j as createElementBlock, p as createCommentVNode, k as openBlock, l as createBaseVNode, M as createBlock, N as resolveDynamicComponent, y as unref, aL as IconExclamation, ak as IconInformationCircle, t as toDisplayString, A as createTextVNode, m as withModifiers, n as normalizeClass } from "./index-BQxzU9F1.js";
const _hoisted_1 = {
  key: 0,
  class: "permission-warning"
};
const _hoisted_2 = { class: "flex items-center" };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { key: 1 };
const _sfc_main = {
  __name: "PermissionManager",
  props: {
    darkMode: {
      type: Boolean,
      default: false
    },
    permissionType: {
      type: String,
      default: "text"
      // text, file, mount
    },
    permissionRequiredText: {
      type: String,
      default: ""
    },
    loginAuthText: {
      type: String,
      default: ""
    }
  },
  emits: ["permission-change", "navigate-to-admin"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const authStore = useAuthStore();
    const log = createLogger("PermissionManager");
    const isAdmin = computed(() => authStore.isAdmin);
    const hasApiKey = computed(() => authStore.isKeyUser && !!authStore.apiKey);
    const hasTextPermission = computed(() => authStore.hasTextSharePermission);
    const hasFilePermission = computed(() => authStore.hasFileSharePermission);
    const hasMountPermission = computed(() => authStore.hasMountPermission);
    const hasPermission = computed(() => {
      switch (props.permissionType) {
        case "file":
          return authStore.hasFileSharePermission;
        case "mount":
          return authStore.hasMountPermission;
        case "text":
        default:
          return authStore.hasTextSharePermission;
      }
    });
    const isApiKeyUserWithoutPermission = computed(() => {
      return authStore.isAuthenticated && authStore.isKeyUser && !hasPermission.value;
    });
    const checkPermissionStatus = async () => {
      log.debug("检查用户权限状态...");
      if (authStore.needsRevalidation) {
        log.debug("需要重新验证认证状态");
        await authStore.validateAuth();
      }
      log.debug("用户权限:", hasPermission.value ? "有权限" : "无权限");
      emit("permission-change", hasPermission.value);
    };
    const navigateToAdmin = () => {
      emit("navigate-to-admin");
    };
    const handleAuthStateChange = async (e) => {
      log.debug("接收到认证状态变化事件:", e.detail);
      emit("permission-change", hasPermission.value);
    };
    onMounted(async () => {
      await checkPermissionStatus();
      useEventListener(window, "auth-state-changed", handleAuthStateChange);
    });
    __expose({
      hasPermission,
      isAdmin,
      hasApiKey,
      hasTextPermission,
      hasFilePermission,
      hasMountPermission,
      isApiKeyUserWithoutPermission,
      checkPermissionStatus
    });
    return (_ctx, _cache) => {
      return !hasPermission.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: normalizeClass([
            "mb-4 p-3 rounded-md border",
            isApiKeyUserWithoutPermission.value ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-700/50 dark:text-red-200" : "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-700/50 dark:text-yellow-200"
          ])
        }, [
          createBaseVNode("div", _hoisted_2, [
            (openBlock(), createBlock(resolveDynamicComponent(isApiKeyUserWithoutPermission.value ? unref(IconExclamation) : unref(IconInformationCircle)), {
              size: "md",
              class: "mr-2",
              "aria-hidden": "true"
            })),
            isApiKeyUserWithoutPermission.value ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(_ctx.$t("common.noPermission")), 1)) : (openBlock(), createElementBlock("span", _hoisted_4, [
              createTextVNode(toDisplayString(__props.permissionRequiredText) + " ", 1),
              createBaseVNode("a", {
                href: "#",
                onClick: withModifiers(navigateToAdmin, ["prevent"]),
                class: "font-medium underline"
              }, toDisplayString(__props.loginAuthText), 1),
              _cache[0] || (_cache[0] = createTextVNode("。 ", -1))
            ]))
          ])
        ], 2)
      ])) : createCommentVNode("", true);
    };
  }
};
const PermissionManager = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7ca21705"]]);
export {
  PermissionManager as P
};
