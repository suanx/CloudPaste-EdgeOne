import { toCanvas as W } from "./toCanvas-BG7QrbWt.js";
import "./snapdom-DlDAnO_e.js";
import "./index-BQxzU9F1.js";
async function d(i, a) {
  let e = await W(i, a), t = new Image();
  return t.src = e.toDataURL(`image/${a.format}`, a.quality), await t.decode(), t.style.width = `${e.width / a.dpr}px`, t.style.height = `${e.height / a.dpr}px`, t;
}
export {
  d as rasterize
};
