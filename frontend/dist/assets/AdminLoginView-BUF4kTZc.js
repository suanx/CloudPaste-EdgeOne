import { d as useRouter, e as useI18n, c as createLogger, f as useAuthStore, g as ref, r as reactive, i as useLocalStorage, o as onMounted, _ as __vitePreload, j as createElementBlock, k as openBlock, l as createBaseVNode, n as normalizeClass, t as toDisplayString, m as withModifiers, p as createCommentVNode, q as withDirectives, v as vModelText, x as vModelCheckbox, y as unref, z as createVNode, A as createTextVNode, I as IconKey, B as IconUser, C as IconUsers, D as ApiStatus } from "./index-BQxzU9F1.js";
const _hoisted_1 = { class: "h-screen flex flex-col" };
const _hoisted_2 = { class: "flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" };
const _hoisted_3 = { class: "sm:mx-auto sm:w-full sm:max-w-sm" };
const _hoisted_4 = { class: "mt-8 sm:mx-auto sm:w-full sm:max-w-sm" };
const _hoisted_5 = { class: "mt-2" };
const _hoisted_6 = { class: "flex items-center" };
const _hoisted_7 = { class: "flex" };
const _hoisted_8 = ["disabled"];
const _hoisted_9 = { key: 0 };
const _hoisted_10 = { key: 1 };
const _hoisted_11 = { class: "mt-2" };
const _hoisted_12 = { class: "flex items-center justify-between" };
const _hoisted_13 = { class: "mt-2" };
const _hoisted_14 = { class: "flex items-center" };
const _hoisted_15 = { class: "flex" };
const _hoisted_16 = ["disabled"];
const _hoisted_17 = { key: 0 };
const _hoisted_18 = { key: 1 };
const _hoisted_19 = { class: "relative mt-6" };
const _hoisted_20 = { class: "absolute inset-0 flex items-center" };
const _hoisted_21 = { class: "relative flex justify-center text-sm" };
const _hoisted_22 = { class: "mt-6 space-y-3" };
const _hoisted_23 = ["disabled"];
const LOGIN_PREF_KEY = "cp_admin_login_pref";
const _sfc_main = {
  __name: "AdminLoginView",
  props: {
    darkMode: {
      type: Boolean,
      required: true
    }
  },
  setup(__props) {
    const router = useRouter();
    const { t } = useI18n();
    const log = createLogger("AdminLoginView");
    const authStore = useAuthStore();
    const loading = ref(false);
    const error = ref("");
    const isApiKeyMode = ref(false);
    const guestEnabled = ref(false);
    const rememberMe = ref(false);
    const form = reactive({
      username: "",
      password: ""
    });
    const apiKeyForm = reactive({
      apiKey: ""
    });
    const toggleLoginMode = () => {
      isApiKeyMode.value = !isApiKeyMode.value;
      error.value = "";
    };
    const storedLoginPref = useLocalStorage(LOGIN_PREF_KEY, null);
    const loadRemembered = () => {
      try {
        const data = storedLoginPref.value;
        if (!data) return;
        if (data.lastMode === "admin") {
          isApiKeyMode.value = false;
          if (data.rememberAdmin && data.adminUsername) {
            form.username = data.adminUsername;
            rememberMe.value = true;
          }
        } else if (data.lastMode === "apikey") {
          isApiKeyMode.value = true;
          if (data.rememberApiKey && data.apiKey) {
            apiKeyForm.apiKey = data.apiKey;
            rememberMe.value = true;
          }
        }
      } catch {
      }
    };
    const saveRemembered = (mode) => {
      const payload = {
        lastMode: mode,
        rememberAdmin: mode === "admin" && rememberMe.value,
        adminUsername: mode === "admin" && rememberMe.value ? form.username : "",
        rememberApiKey: mode === "apikey" && rememberMe.value,
        apiKey: mode === "apikey" && rememberMe.value ? apiKeyForm.apiKey : ""
      };
      try {
        storedLoginPref.value = payload;
      } catch {
      }
    };
    const handleLogin = async () => {
      if (isApiKeyMode.value) {
        return handleApiKeyLogin();
      }
      if (!form.username || !form.password) {
        error.value = t("admin.login.inputRequired.usernamePassword");
        return;
      }
      loading.value = true;
      error.value = "";
      try {
        await authStore.adminLogin(form.username, form.password);
        saveRemembered("admin");
        const redirectQuery = router.currentRoute.value.query.redirect;
        if (redirectQuery) {
          router.push(redirectQuery);
        } else {
          router.push("/admin");
        }
      } catch (err) {
        log.error("管理员登录失败:", err);
        if (err.status === ApiStatus.UNAUTHORIZED || err.response?.status === ApiStatus.UNAUTHORIZED || err.code === ApiStatus.UNAUTHORIZED) {
          error.value = t("admin.login.errors.invalidCredentials") || "用户名或密码错误";
        } else if (err.message && err.message.includes("认证失败")) {
          error.value = t("admin.login.errors.invalidCredentials") || "用户名或密码错误";
        } else {
          error.value = err.message || t("admin.login.errors.loginFailed");
        }
      } finally {
        loading.value = false;
      }
    };
    const handleApiKeyLogin = async () => {
      if (!apiKeyForm.apiKey) {
        error.value = t("admin.login.inputRequired.apiKey");
        return;
      }
      loading.value = true;
      error.value = "";
      try {
        await authStore.apiKeyLogin(apiKeyForm.apiKey);
        saveRemembered("apikey");
        const redirectQuery = router.currentRoute.value.query.redirect;
        if (redirectQuery) {
          router.push(redirectQuery);
        } else {
          router.push("/admin");
        }
      } catch (err) {
        log.error("API密钥验证失败:", err);
        if (err.status === ApiStatus.UNAUTHORIZED || err.response?.status === ApiStatus.UNAUTHORIZED || err.code === ApiStatus.UNAUTHORIZED) {
          error.value = t("admin.login.errors.invalidApiKey") || "API密钥无效或未授权";
        } else if (err.status === ApiStatus.FORBIDDEN || err.response?.status === ApiStatus.FORBIDDEN || err.code === ApiStatus.FORBIDDEN) {
          error.value = t("admin.login.errors.insufficientPermissions") || "API密钥权限不足";
        } else if (err.message && err.message.includes("认证失败")) {
          error.value = t("admin.login.errors.invalidApiKey") || "API密钥无效或未授权";
        } else {
          error.value = err.message || t("admin.login.errors.keyValidationFailed");
        }
      } finally {
        loading.value = false;
      }
    };
    const handleGuestLogin = async () => {
      loading.value = true;
      error.value = "";
      try {
        await authStore.guestLogin();
        const redirectQuery = router.currentRoute.value.query.redirect;
        if (typeof redirectQuery === "string" && redirectQuery.startsWith("/mount-explorer")) {
          router.push(redirectQuery);
        } else {
          router.push({ name: "MountExplorer" });
        }
      } catch (err) {
        log.error("游客登录失败:", err);
        error.value = err.message || t("admin.login.errors.guestLoginFailed", "游客登录失败");
      } finally {
        loading.value = false;
      }
    };
    onMounted(async () => {
      loadRemembered();
      try {
        const resp = await __vitePreload(() => import("./index-BQxzU9F1.js").then((n) => n.f6), true ? [] : void 0).then((m) => m.api.system.getGuestConfig());
        const data = resp?.data ?? resp;
        guestEnabled.value = Boolean(data && data.enabled && data.key);
      } catch {
        guestEnabled.value = false;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", {
            class: normalizeClass(["mx-auto w-full max-w-sm rounded-lg p-6 shadow-md", [__props.darkMode ? "bg-gray-800 shadow-gray-700/20" : "bg-white shadow-gray-200/70"]])
          }, [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("h2", {
                class: normalizeClass(["mt-4 text-center text-2xl font-bold leading-9 tracking-tight", __props.darkMode ? "text-white" : "text-gray-900"])
              }, toDisplayString(isApiKeyMode.value ? _ctx.$t("admin.login.apiKeyAuth") : _ctx.$t("admin.login.adminLogin")), 3)
            ]),
            createBaseVNode("div", _hoisted_4, [
              isApiKeyMode.value ? (openBlock(), createElementBlock("form", {
                key: 0,
                class: "space-y-6",
                onSubmit: withModifiers(handleLogin, ["prevent"])
              }, [
                createBaseVNode("div", null, [
                  createBaseVNode("label", {
                    for: "apiKey",
                    class: normalizeClass(["block text-sm font-medium leading-6", __props.darkMode ? "text-gray-200" : "text-gray-900"])
                  }, toDisplayString(_ctx.$t("admin.login.apiKey")), 3),
                  createBaseVNode("div", _hoisted_5, [
                    withDirectives(createBaseVNode("input", {
                      id: "apiKey",
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => apiKeyForm.apiKey = $event),
                      name: "apiKey",
                      type: "text",
                      required: "",
                      class: "form-input"
                    }, null, 512), [
                      [vModelText, apiKeyForm.apiKey]
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_6, [
                  withDirectives(createBaseVNode("input", {
                    id: "remember-api-key",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => rememberMe.value = $event),
                    type: "checkbox",
                    class: "h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  }, null, 512), [
                    [vModelCheckbox, rememberMe.value]
                  ]),
                  createBaseVNode("label", {
                    for: "remember-api-key",
                    class: normalizeClass(["ml-2 block text-sm", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                  }, toDisplayString(_ctx.$t("admin.login.rememberMe")), 3)
                ]),
                error.value ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["rounded-md p-4", __props.darkMode ? "bg-red-900/30" : "bg-red-50"])
                }, [
                  createBaseVNode("div", _hoisted_7, [
                    createBaseVNode("div", {
                      class: normalizeClass(["text-sm", __props.darkMode ? "text-red-200" : "text-red-700"])
                    }, toDisplayString(error.value), 3)
                  ])
                ], 2)) : createCommentVNode("", true),
                createBaseVNode("div", null, [
                  createBaseVNode("button", {
                    type: "submit",
                    disabled: loading.value,
                    class: normalizeClass([
                      "flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                      loading.value ? "opacity-70 cursor-not-allowed" : "hover:bg-primary-500",
                      __props.darkMode ? "bg-primary-600 focus-visible:outline-primary-500" : "bg-primary-600 focus-visible:outline-primary-600"
                    ])
                  }, [
                    loading.value ? (openBlock(), createElementBlock("span", _hoisted_9, toDisplayString(unref(t)("common.loading")), 1)) : (openBlock(), createElementBlock("span", _hoisted_10, toDisplayString(unref(t)("common.confirm")), 1))
                  ], 10, _hoisted_8)
                ])
              ], 32)) : (openBlock(), createElementBlock("form", {
                key: 1,
                class: "space-y-6",
                onSubmit: withModifiers(handleLogin, ["prevent"])
              }, [
                createBaseVNode("div", null, [
                  createBaseVNode("label", {
                    for: "username",
                    class: normalizeClass(["block text-sm font-medium leading-6", __props.darkMode ? "text-gray-200" : "text-gray-900"])
                  }, toDisplayString(_ctx.$t("admin.login.username")), 3),
                  createBaseVNode("div", _hoisted_11, [
                    withDirectives(createBaseVNode("input", {
                      id: "username",
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.username = $event),
                      name: "username",
                      type: "text",
                      required: "",
                      class: "form-input"
                    }, null, 512), [
                      [vModelText, form.username]
                    ])
                  ])
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("div", _hoisted_12, [
                    createBaseVNode("label", {
                      for: "password",
                      class: normalizeClass(["block text-sm font-medium leading-6", __props.darkMode ? "text-gray-200" : "text-gray-900"])
                    }, toDisplayString(_ctx.$t("admin.login.password")), 3)
                  ]),
                  createBaseVNode("div", _hoisted_13, [
                    withDirectives(createBaseVNode("input", {
                      id: "password",
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => form.password = $event),
                      name: "password",
                      type: "password",
                      autocomplete: "current-password",
                      required: "",
                      class: "form-input"
                    }, null, 512), [
                      [vModelText, form.password]
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_14, [
                  withDirectives(createBaseVNode("input", {
                    id: "remember-admin",
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => rememberMe.value = $event),
                    type: "checkbox",
                    class: "h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  }, null, 512), [
                    [vModelCheckbox, rememberMe.value]
                  ]),
                  createBaseVNode("label", {
                    for: "remember-admin",
                    class: normalizeClass(["ml-2 block text-sm", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                  }, toDisplayString(_ctx.$t("admin.login.rememberMe")), 3)
                ]),
                error.value ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["rounded-md p-4", __props.darkMode ? "bg-red-900/30" : "bg-red-50"])
                }, [
                  createBaseVNode("div", _hoisted_15, [
                    createBaseVNode("div", {
                      class: normalizeClass(["text-sm", __props.darkMode ? "text-red-200" : "text-red-700"])
                    }, toDisplayString(error.value), 3)
                  ])
                ], 2)) : createCommentVNode("", true),
                createBaseVNode("div", null, [
                  createBaseVNode("button", {
                    type: "submit",
                    disabled: loading.value,
                    class: normalizeClass([
                      "flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                      loading.value ? "opacity-70 cursor-not-allowed" : "hover:bg-primary-500",
                      __props.darkMode ? "bg-primary-600 focus-visible:outline-primary-500" : "bg-primary-600 focus-visible:outline-primary-600"
                    ])
                  }, [
                    loading.value ? (openBlock(), createElementBlock("span", _hoisted_17, toDisplayString(_ctx.$t("admin.login.loggingIn")), 1)) : (openBlock(), createElementBlock("span", _hoisted_18, toDisplayString(_ctx.$t("admin.login.loginButton")), 1))
                  ], 10, _hoisted_16)
                ])
              ], 32)),
              createBaseVNode("div", _hoisted_19, [
                createBaseVNode("div", _hoisted_20, [
                  createBaseVNode("div", {
                    class: normalizeClass(["w-full border-t", __props.darkMode ? "border-gray-600" : "border-gray-300"])
                  }, null, 2)
                ]),
                createBaseVNode("div", _hoisted_21, [
                  createBaseVNode("span", {
                    class: normalizeClass(["px-2 text-gray-500", __props.darkMode ? "bg-gray-800" : "bg-white"])
                  }, toDisplayString(_ctx.$t("admin.login.orLoginWith", "或")), 3)
                ])
              ]),
              createBaseVNode("div", _hoisted_22, [
                !isApiKeyMode.value ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  onClick: toggleLoginMode,
                  class: normalizeClass([
                    "flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors",
                    __props.darkMode ? "border-gray-600 bg-gray-700/50 text-gray-200 hover:bg-gray-700 hover:border-gray-500" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                  ])
                }, [
                  createVNode(unref(IconKey), { "aria-hidden": "true" }),
                  createTextVNode(" " + toDisplayString(_ctx.$t("admin.login.useApiKey")), 1)
                ], 2)) : (openBlock(), createElementBlock("button", {
                  key: 1,
                  onClick: toggleLoginMode,
                  class: normalizeClass([
                    "flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors",
                    __props.darkMode ? "border-gray-600 bg-gray-700/50 text-gray-200 hover:bg-gray-700 hover:border-gray-500" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                  ])
                }, [
                  createVNode(unref(IconUser), { "aria-hidden": "true" }),
                  createTextVNode(" " + toDisplayString(_ctx.$t("admin.login.useAdminAccount")), 1)
                ], 2)),
                guestEnabled.value ? (openBlock(), createElementBlock("button", {
                  key: 2,
                  onClick: handleGuestLogin,
                  disabled: loading.value,
                  class: normalizeClass([
                    "flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    loading.value ? "opacity-50 cursor-not-allowed" : "",
                    __props.darkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700/30" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  ])
                }, [
                  createVNode(unref(IconUsers), { "aria-hidden": "true" }),
                  createTextVNode(" " + toDisplayString(_ctx.$t("admin.login.useGuest", "以游客身份访问")), 1)
                ], 10, _hoisted_23)) : createCommentVNode("", true)
              ])
            ])
          ], 2)
        ])
      ]);
    };
  }
};
export {
  _sfc_main as default
};
