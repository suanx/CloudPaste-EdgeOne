import { toBlob as m } from "./toBlob-Bnx0-FJA.js";
import { toCanvas as W } from "./toCanvas-BG7QrbWt.js";
import "./snapdom-DlDAnO_e.js";
import "./index-BQxzU9F1.js";
async function b(c, t) {
  let r = (t?.format || t?.type || "").toLowerCase(), e = r === "jpg" ? "jpeg" : r || "png", m$1 = t?.filename || `snapdom.${e}`, a = { ...t || {}, format: e, type: e };
  if (a.dpr = 1, e === "svg") {
    let i = await m(c, { ...a, type: "svg" }), s = URL.createObjectURL(i), n = document.createElement("a");
    n.href = s, n.download = m$1, n.click(), URL.revokeObjectURL(s);
    return;
  }
  let f = await W(c, a), o = document.createElement("a");
  o.href = f.toDataURL(`image/${e}`, t?.quality), o.download = m$1, o.click();
}
export {
  b as download
};
