import { toCanvas as W } from "./toCanvas-BG7QrbWt.js";
import "./snapdom-DlDAnO_e.js";
import "./index-BQxzU9F1.js";
async function m(o, t) {
  let n = t.type;
  if (n === "svg") {
    let e = decodeURIComponent(o.split(",")[1]);
    return new Blob([e], { type: "image/svg+xml" });
  }
  let s = await W(o, t);
  return new Promise((e) => s.toBlob((c) => e(c), `image/${n}`, t.quality));
}
export {
  m as toBlob
};
