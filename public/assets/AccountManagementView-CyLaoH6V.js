import { E as api, aK as _export_sfc, e as useI18n, f as useAuthStore, ac as useThemeMode, Y as useGlobalMessage, F as computed, g as ref, j as createElementBlock, k as openBlock, l as createBaseVNode, p as createCommentVNode, n as normalizeClass, y as unref, t as toDisplayString, z as createVNode, ak as IconInformationCircle, q as withDirectives, v as vModelText, B as IconUser, A as createTextVNode, I as IconKey, b3 as IconLockClosed, J as IconRefresh, aL as IconExclamation } from "./index-BQxzU9F1.js";
function useAdminAccountService() {
  const changePassword = async (currentPassword, newPassword, newUsername) => {
    const resp = await api.admin.changePassword(currentPassword, newPassword, newUsername);
    if (!resp) {
      throw new Error("修改密码失败");
    }
    if (typeof resp === "object" && "success" in resp) {
      if (!resp.success) {
        throw new Error(resp.message || "修改密码失败");
      }
      return true;
    }
    return true;
  };
  return {
    changePassword
  };
}
const _hoisted_1 = { class: "flex-1 flex flex-col overflow-y-auto" };
const _hoisted_2 = { class: "mb-6" };
const _hoisted_3 = { class: "flex items-start" };
const _hoisted_4 = { class: "font-medium" };
const _hoisted_5 = { class: "mt-1" };
const _hoisted_6 = { class: "space-y-6" };
const _hoisted_7 = {
  key: 0,
  class: "setting-group bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 max-w-2xl"
};
const _hoisted_8 = { class: "text-lg font-medium mb-4 pb-2 border-b border-gray-200 dark:border-gray-700" };
const _hoisted_9 = { class: "space-y-4" };
const _hoisted_10 = { class: "grid grid-cols-1 md:grid-cols-3 gap-4 items-center" };
const _hoisted_11 = { class: "md:col-span-1" };
const _hoisted_12 = { class: "md:col-span-2" };
const _hoisted_13 = { class: "grid grid-cols-1 md:grid-cols-3 gap-4 items-center" };
const _hoisted_14 = { class: "md:col-span-1" };
const _hoisted_15 = { class: "md:col-span-2" };
const _hoisted_16 = {
  key: 1,
  class: "setting-group bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 max-w-2xl"
};
const _hoisted_17 = { class: "text-lg font-medium mb-4 pb-2 border-b border-gray-200 dark:border-gray-700" };
const _hoisted_18 = { class: "space-y-4" };
const _hoisted_19 = { class: "setting-item grid grid-cols-1 md:grid-cols-3 gap-4 items-start" };
const _hoisted_20 = { class: "md:col-span-1" };
const _hoisted_21 = { class: "md:col-span-2" };
const _hoisted_22 = { class: "relative" };
const _hoisted_23 = ["placeholder"];
const _hoisted_24 = { class: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" };
const _hoisted_25 = { class: "setting-item grid grid-cols-1 md:grid-cols-3 gap-4 items-start" };
const _hoisted_26 = { class: "md:col-span-1" };
const _hoisted_27 = { class: "md:col-span-2" };
const _hoisted_28 = { class: "relative" };
const _hoisted_29 = ["placeholder"];
const _hoisted_30 = { class: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" };
const _hoisted_31 = { class: "setting-item grid grid-cols-1 md:grid-cols-3 gap-4 items-start" };
const _hoisted_32 = { class: "md:col-span-1" };
const _hoisted_33 = { class: "md:col-span-2" };
const _hoisted_34 = { class: "relative" };
const _hoisted_35 = ["placeholder"];
const _hoisted_36 = { class: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" };
const _hoisted_37 = { class: "flex justify-end pt-4" };
const _hoisted_38 = ["disabled"];
const _hoisted_39 = {
  key: 0,
  class: "flex items-center"
};
const _hoisted_40 = { key: 1 };
const _hoisted_41 = { class: "flex items-start" };
const _sfc_main = {
  __name: "AccountManagementView",
  emits: ["logout"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const authStore = useAuthStore();
    const { changePassword } = useAdminAccountService();
    const { isDarkMode: darkMode } = useThemeMode();
    const { showSuccess, showError } = useGlobalMessage();
    const isAdmin = computed(() => authStore.isAdmin);
    const isApiKeyUser = computed(() => authStore.authType === "apikey");
    const isGuest = computed(() => authStore.isGuest);
    const emit = __emit;
    const passwordForm = ref({
      currentPassword: "",
      newPassword: "",
      newUsername: ""
    });
    const passwordChangeStatus = ref({
      loading: false
    });
    const handleChangePassword = async (event) => {
      event.preventDefault();
      if (!passwordForm.value.currentPassword) {
        const message = t("admin.account.messages.passwordRequired");
        showError(message);
        return;
      }
      if (!passwordForm.value.newPassword && !passwordForm.value.newUsername) {
        const message = t("admin.account.messages.newFieldRequired");
        showError(message);
        return;
      }
      if (passwordForm.value.newPassword && passwordForm.value.newPassword === passwordForm.value.currentPassword) {
        const message = t("admin.account.messages.samePassword");
        showError(message);
        return;
      }
      passwordChangeStatus.value = {
        loading: true
      };
      try {
        await changePassword(passwordForm.value.currentPassword, passwordForm.value.newPassword, passwordForm.value.newUsername);
        showSuccess(t("admin.account.messages.updateSuccess"));
        showSuccess(t("admin.account.messages.updateSuccess"));
        passwordForm.value = {
          currentPassword: "",
          newPassword: "",
          newUsername: ""
        };
        setTimeout(() => {
          emit("logout");
        }, 3e3);
      } catch (error) {
        const message = error.message || t("admin.account.messages.updateFailed");
        showError(message);
      } finally {
        passwordChangeStatus.value.loading = false;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("h1", {
            class: normalizeClass(["text-2xl font-bold mb-2", unref(darkMode) ? "text-white" : "text-gray-800"])
          }, toDisplayString(isAdmin.value ? unref(t)("admin.account.title") : unref(t)("admin.account.apiKeyTitle")), 3),
          createBaseVNode("p", {
            class: normalizeClass(["text-base", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
          }, toDisplayString(isAdmin.value ? unref(t)("admin.account.description") : unref(t)("admin.account.apiKeyDescription")), 3),
          isApiKeyUser.value && isGuest.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["mt-4 p-4 rounded-md border", unref(darkMode) ? "bg-blue-900/20 border-blue-800/40" : "bg-blue-50 border-blue-200"])
          }, [
            createBaseVNode("div", _hoisted_3, [
              createVNode(unref(IconInformationCircle), {
                class: "h-5 w-5 mr-2 mt-0.5 text-blue-500",
                "aria-hidden": "true"
              }),
              createBaseVNode("div", {
                class: normalizeClass(["text-sm", unref(darkMode) ? "text-blue-100" : "text-blue-800"])
              }, [
                createBaseVNode("p", _hoisted_4, toDisplayString(unref(t)("admin.account.apiKeyInfo.guestBannerTitle")), 1),
                createBaseVNode("p", _hoisted_5, toDisplayString(unref(t)("admin.account.apiKeyInfo.guestBannerDescription")), 1)
              ], 2)
            ])
          ], 2)) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_6, [
          isApiKeyUser.value ? (openBlock(), createElementBlock("div", _hoisted_7, [
            createBaseVNode("h2", _hoisted_8, toDisplayString(unref(t)("admin.account.apiKeyInfo.title")), 1),
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, [
                createBaseVNode("div", _hoisted_11, [
                  createBaseVNode("span", {
                    class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                  }, toDisplayString(unref(t)("admin.account.apiKeyInfo.keyName")), 3)
                ]),
                createBaseVNode("div", _hoisted_12, [
                  createBaseVNode("span", {
                    class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                  }, toDisplayString(unref(authStore).apiKeyInfo?.name || unref(t)("common.unknown")), 3)
                ])
              ]),
              createBaseVNode("div", _hoisted_13, [
                createBaseVNode("div", _hoisted_14, [
                  createBaseVNode("span", {
                    class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                  }, toDisplayString(unref(t)("admin.account.apiKeyInfo.basicPath")), 3)
                ]),
                createBaseVNode("div", _hoisted_15, [
                  createBaseVNode("span", {
                    class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-300" : "text-gray-600"])
                  }, toDisplayString(unref(authStore).apiKeyInfo?.basic_path || "/"), 3)
                ])
              ])
            ])
          ])) : createCommentVNode("", true),
          isAdmin.value ? (openBlock(), createElementBlock("div", _hoisted_16, [
            createBaseVNode("h2", _hoisted_17, toDisplayString(unref(t)("admin.account.adminInfo.title")), 1),
            createBaseVNode("div", _hoisted_18, [
              createBaseVNode("p", {
                class: normalizeClass(["text-sm", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
              }, toDisplayString(unref(t)("admin.account.adminInfo.description")), 3),
              createBaseVNode("form", {
                onSubmit: handleChangePassword,
                class: "space-y-6"
              }, [
                createBaseVNode("div", _hoisted_19, [
                  createBaseVNode("div", _hoisted_20, [
                    createBaseVNode("label", {
                      for: "newUsername",
                      class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                    }, toDisplayString(unref(t)("admin.account.adminInfo.newUsernameLabel")), 3)
                  ]),
                  createBaseVNode("div", _hoisted_21, [
                    createBaseVNode("div", _hoisted_22, [
                      withDirectives(createBaseVNode("input", {
                        type: "text",
                        name: "newUsername",
                        id: "newUsername",
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => passwordForm.value.newUsername = $event),
                        class: normalizeClass([
                          "block w-full rounded border shadow-sm pl-3 pr-10 py-2 text-sm",
                          unref(darkMode) ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                        ]),
                        placeholder: unref(t)("admin.account.adminInfo.newUsernamePlaceholder")
                      }, null, 10, _hoisted_23), [
                        [vModelText, passwordForm.value.newUsername]
                      ]),
                      createBaseVNode("div", _hoisted_24, [
                        createVNode(unref(IconUser), {
                          class: normalizeClass(["h-5 w-5", unref(darkMode) ? "text-gray-500" : "text-gray-400"]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ])
                    ]),
                    createBaseVNode("p", {
                      class: normalizeClass(["mt-2 text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                    }, toDisplayString(unref(t)("admin.account.adminInfo.newUsernameHint")), 3)
                  ])
                ]),
                createBaseVNode("div", _hoisted_25, [
                  createBaseVNode("div", _hoisted_26, [
                    createBaseVNode("label", {
                      for: "currentPassword",
                      class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                    }, [
                      createTextVNode(toDisplayString(unref(t)("admin.account.adminInfo.currentPasswordLabel")) + " ", 1),
                      _cache[3] || (_cache[3] = createBaseVNode("span", { class: "text-red-500" }, "*", -1))
                    ], 2)
                  ]),
                  createBaseVNode("div", _hoisted_27, [
                    createBaseVNode("div", _hoisted_28, [
                      withDirectives(createBaseVNode("input", {
                        type: "password",
                        name: "currentPassword",
                        id: "currentPassword",
                        autocomplete: "current-password",
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => passwordForm.value.currentPassword = $event),
                        class: normalizeClass([
                          "block w-full rounded border shadow-sm pl-3 pr-10 py-2 text-sm",
                          unref(darkMode) ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                        ]),
                        placeholder: unref(t)("admin.account.adminInfo.currentPasswordPlaceholder"),
                        required: ""
                      }, null, 10, _hoisted_29), [
                        [vModelText, passwordForm.value.currentPassword]
                      ]),
                      createBaseVNode("div", _hoisted_30, [
                        createVNode(unref(IconKey), {
                          class: normalizeClass(["h-5 w-5", unref(darkMode) ? "text-gray-500" : "text-gray-400"]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ])
                    ]),
                    createBaseVNode("p", {
                      class: normalizeClass(["mt-1 text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                    }, toDisplayString(unref(t)("admin.account.adminInfo.currentPasswordHint")), 3)
                  ])
                ]),
                createBaseVNode("div", _hoisted_31, [
                  createBaseVNode("div", _hoisted_32, [
                    createBaseVNode("label", {
                      for: "newPassword",
                      class: normalizeClass(["block text-sm font-medium", unref(darkMode) ? "text-gray-200" : "text-gray-700"])
                    }, toDisplayString(unref(t)("admin.account.adminInfo.newPasswordLabel")), 3)
                  ]),
                  createBaseVNode("div", _hoisted_33, [
                    createBaseVNode("div", _hoisted_34, [
                      withDirectives(createBaseVNode("input", {
                        type: "password",
                        name: "newPassword",
                        id: "newPassword",
                        autocomplete: "new-password",
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => passwordForm.value.newPassword = $event),
                        class: normalizeClass([
                          "block w-full rounded border shadow-sm pl-3 pr-10 py-2 text-sm",
                          unref(darkMode) ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                        ]),
                        placeholder: unref(t)("admin.account.adminInfo.newPasswordPlaceholder")
                      }, null, 10, _hoisted_35), [
                        [vModelText, passwordForm.value.newPassword]
                      ]),
                      createBaseVNode("div", _hoisted_36, [
                        createVNode(unref(IconLockClosed), {
                          class: normalizeClass(["h-5 w-5", unref(darkMode) ? "text-gray-500" : "text-gray-400"]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ])
                    ]),
                    createBaseVNode("p", {
                      class: normalizeClass(["mt-1 text-xs", unref(darkMode) ? "text-gray-400" : "text-gray-500"])
                    }, toDisplayString(unref(t)("admin.account.adminInfo.newPasswordHint")), 3)
                  ])
                ]),
                createBaseVNode("div", _hoisted_37, [
                  createBaseVNode("button", {
                    type: "submit",
                    disabled: passwordChangeStatus.value.loading,
                    class: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  }, [
                    passwordChangeStatus.value.loading ? (openBlock(), createElementBlock("span", _hoisted_39, [
                      createVNode(unref(IconRefresh), {
                        size: "sm",
                        class: "animate-spin -ml-0.5 mr-2",
                        "aria-hidden": "true"
                      }),
                      createTextVNode(" " + toDisplayString(unref(t)("admin.account.buttons.updating")), 1)
                    ])) : (openBlock(), createElementBlock("span", _hoisted_40, toDisplayString(unref(t)("admin.account.buttons.updateAccount")), 1))
                  ], 8, _hoisted_38)
                ])
              ], 32),
              createBaseVNode("div", {
                class: normalizeClass(["mt-6 p-4 rounded-md border", unref(darkMode) ? "bg-amber-900/20 border-amber-800/40" : "bg-amber-50 border-amber-200"])
              }, [
                createBaseVNode("div", _hoisted_41, [
                  createVNode(unref(IconExclamation), {
                    class: "h-5 w-5 mr-2 mt-0.5 text-amber-500",
                    "aria-hidden": "true"
                  }),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-sm", unref(darkMode) ? "text-amber-200" : "text-amber-800"])
                  }, toDisplayString(unref(t)("admin.account.adminInfo.warningMessage")), 3)
                ])
              ], 2)
            ])
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
};
const AccountManagementView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4cdd6404"]]);
export {
  AccountManagementView as default
};
