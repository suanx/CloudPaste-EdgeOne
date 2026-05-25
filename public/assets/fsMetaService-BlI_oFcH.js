import { R as del, S as put, T as post, U as get } from "./index-BQxzU9F1.js";
async function getAllFsMeta() {
  return await get("/fs-meta/list");
}
async function createFsMeta(data) {
  return await post("/fs-meta/create", data);
}
async function updateFsMeta(id, data) {
  return await put(`/fs-meta/${id}`, data);
}
async function deleteFsMeta(id) {
  return await del(`/fs-meta/${id}`);
}
async function verifyFsMetaPassword(path, password) {
  const response = await post("/fs/meta/password/verify", { path, password });
  if (response && typeof response === "object" && "data" in response) {
    const data = (
      /** @type {{ verified: boolean; token?: string|null; requiresPassword?: boolean; path?: string }} */
      response.data
    );
    return {
      verified: Boolean(data.verified),
      token: data.token ?? null,
      requiresPassword: data.requiresPassword ?? Boolean(data.token),
      path: data.path ?? path,
      message: response.message || "密码验证成功"
    };
  }
  return response;
}
export {
  createFsMeta as c,
  deleteFsMeta as d,
  getAllFsMeta as g,
  updateFsMeta as u,
  verifyFsMetaPassword as v
};
