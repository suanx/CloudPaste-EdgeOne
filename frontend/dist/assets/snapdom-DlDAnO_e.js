const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/toImg-DxoOTeWK.js","assets/rasterize-JS5G2XHH-C_3kH5z0.js","assets/toCanvas-BG7QrbWt.js","assets/index-BQxzU9F1.js","assets/toBlob-Bnx0-FJA.js","assets/download-rMLr2jb5.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-BQxzU9F1.js";
var s = { image: /* @__PURE__ */ new Map(), background: /* @__PURE__ */ new Map(), resource: /* @__PURE__ */ new Map(), defaultStyle: /* @__PURE__ */ new Map(), baseStyle: /* @__PURE__ */ new Map(), computedStyle: /* @__PURE__ */ new WeakMap(), font: /* @__PURE__ */ new Set(), session: { styleMap: /* @__PURE__ */ new Map(), styleCache: /* @__PURE__ */ new WeakMap(), nodeMap: /* @__PURE__ */ new Map() } };
function et$2(t = "soft") {
  switch (s.session.__counterEpoch = (s.session.__counterEpoch || 0) + 1, t) {
    case "auto": {
      s.session.styleMap = /* @__PURE__ */ new Map(), s.session.nodeMap = /* @__PURE__ */ new Map();
      return;
    }
    case "soft": {
      s.session.styleMap = /* @__PURE__ */ new Map(), s.session.nodeMap = /* @__PURE__ */ new Map(), s.session.styleCache = /* @__PURE__ */ new WeakMap();
      return;
    }
    case "full":
      return;
    case "disabled": {
      s.session.styleMap = /* @__PURE__ */ new Map(), s.session.nodeMap = /* @__PURE__ */ new Map(), s.session.styleCache = /* @__PURE__ */ new WeakMap(), s.computedStyle = /* @__PURE__ */ new WeakMap(), s.baseStyle = /* @__PURE__ */ new Map(), s.defaultStyle = /* @__PURE__ */ new Map(), s.image = /* @__PURE__ */ new Map(), s.background = /* @__PURE__ */ new Map(), s.resource = /* @__PURE__ */ new Map(), s.font = /* @__PURE__ */ new Set();
      return;
    }
    default: {
      s.session.styleMap = /* @__PURE__ */ new Map(), s.session.nodeMap = /* @__PURE__ */ new Map(), s.session.styleCache = /* @__PURE__ */ new WeakMap();
      return;
    }
  }
}
function A$2(t) {
  let e = t.match(/url\((['"]?)(.*?)(\1)\)/);
  if (!e) return null;
  let n = e[2].trim();
  return n.startsWith("#") ? null : n;
}
function B$1(t) {
  if (!t || t === "none") return "";
  let e = t.replace(/translate[XY]?\([^)]*\)/g, "");
  return e = e.replace(/matrix\(([^)]+)\)/g, (n, o) => {
    let r = o.split(",").map((a2) => a2.trim());
    return r.length !== 6 ? `matrix(${o})` : (r[4] = "0", r[5] = "0", `matrix(${r.join(", ")})`);
  }), e = e.replace(/matrix3d\(([^)]+)\)/g, (n, o) => {
    let r = o.split(",").map((a2) => a2.trim());
    return r.length !== 16 ? `matrix3d(${o})` : (r[12] = "0", r[13] = "0", `matrix3d(${r.join(", ")})`);
  }), e.trim().replace(/\s{2,}/g, " ");
}
function g$1(t) {
  if (/%[0-9A-Fa-f]{2}/.test(t)) return t;
  try {
    return encodeURI(t);
  } catch {
    return t;
  }
}
function D$1(t = "[snapDOM]", { ttlMs: e = 5 * 6e4, maxEntries: n = 12 } = {}) {
  let o = /* @__PURE__ */ new Map(), r = 0;
  function a2(l2, f2, d2) {
    if (r >= n) return;
    let m = Date.now();
    (o.get(f2) || 0) > m || (o.set(f2, m + e), r++, l2 === "warn" && console && console.warn ? console.warn(`${t} ${d2}`) : console && console.error && console.error(`${t} ${d2}`));
  }
  return { warnOnce(l2, f2) {
    a2("warn", l2, f2);
  }, errorOnce(l2, f2) {
    a2("error", l2, f2);
  }, reset() {
    o.clear(), r = 0;
  } };
}
var R$1 = D$1("[snapDOM]", { ttlMs: 3 * 6e4, maxEntries: 10 }), k = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map();
function N$1(t) {
  return /^data:|^blob:|^about:blank$/i.test(t);
}
function F(t, e) {
  try {
    let n = typeof location < "u" && location.href ? location.href : "http://localhost/", o = e.includes("{url}") ? e.split("{url}")[0] : e, r = new URL(o || ".", n), a2 = new URL(t, n);
    if (a2.origin === r.origin) return true;
    let l2 = a2.searchParams;
    if (l2 && (l2.has("url") || l2.has("target"))) return true;
  } catch {
  }
  return false;
}
function P$1(t, e) {
  if (!e || N$1(t) || F(t, e)) return false;
  try {
    let n = typeof location < "u" && location.href ? location.href : "http://localhost/", o = new URL(t, n);
    return typeof location < "u" ? o.origin !== location.origin : true;
  } catch {
    return !!e;
  }
}
function j(t, e) {
  if (!e) return t;
  if (e.includes("{url}")) return e.replace("{urlRaw}", g$1(t)).replace("{url}", encodeURIComponent(t));
  if (/[?&]url=?$/.test(e)) return `${e}${encodeURIComponent(t)}`;
  if (e.endsWith("?")) return `${e}url=${encodeURIComponent(t)}`;
  if (e.endsWith("/")) return `${e}${g$1(t)}`;
  let n = e.includes("?") ? "&" : "?";
  return `${e}${n}url=${encodeURIComponent(t)}`;
}
function T$1(t) {
  return new Promise((e, n) => {
    let o = new FileReader();
    o.onload = () => e(String(o.result || "")), o.onerror = () => n(new Error("read_failed")), o.readAsDataURL(t);
  });
}
function W$2(t, e) {
  return [e.as || "blob", e.timeout ?? 3e3, e.useProxy || "", e.errorTTL ?? 8e3, t].join("|");
}
async function E$1(t, e = {}) {
  let n = e.as ?? "blob", o = e.timeout ?? 3e3, r = e.useProxy || "", a2 = e.errorTTL ?? 8e3, l2 = e.headers || {}, f2 = !!e.silent;
  if (/^data:/i.test(t)) try {
    if (n === "text") return { ok: true, data: String(t), status: 200, url: t, fromCache: false };
    if (n === "dataURL") return { ok: true, data: String(t), status: 200, url: t, fromCache: false, mime: String(t).slice(5).split(";")[0] || "" };
    let [, i = "", c2 = ""] = String(t).match(/^data:([^,]*),(.*)$/) || [], p2 = /;base64/i.test(i) ? atob(c2) : decodeURIComponent(c2), w = new Uint8Array([...p2].map((I2) => I2.charCodeAt(0))), U2 = new Blob([w], { type: (i || "").split(";")[0] || "" });
    return { ok: true, data: U2, status: 200, url: t, fromCache: false, mime: U2.type || "" };
  } catch {
    return { ok: false, data: null, status: 0, url: t, fromCache: false, reason: "special_url_error" };
  }
  if (/^blob:/i.test(t)) try {
    let i = await fetch(t);
    if (!i.ok) return { ok: false, data: null, status: i.status, url: t, fromCache: false, reason: "http_error" };
    let c2 = await i.blob(), u = c2.type || i.headers.get("content-type") || "";
    return n === "dataURL" ? { ok: true, data: await T$1(c2), status: i.status, url: t, fromCache: false, mime: u } : n === "text" ? { ok: true, data: await c2.text(), status: i.status, url: t, fromCache: false, mime: u } : { ok: true, data: c2, status: i.status, url: t, fromCache: false, mime: u };
  } catch {
    return { ok: false, data: null, status: 0, url: t, fromCache: false, reason: "network" };
  }
  if (/^about:blank$/i.test(t)) return n === "dataURL" ? { ok: true, data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==", status: 200, url: t, fromCache: false, mime: "image/png" } : { ok: true, data: n === "text" ? "" : new Blob([]), status: 200, url: t, fromCache: false };
  let d2 = W$2(t, { as: n, timeout: o, useProxy: r, errorTTL: a2 }), m = b.get(d2);
  if (m && m.until > Date.now()) return { ...m.result, fromCache: true };
  m && b.delete(d2);
  let S2 = k.get(d2);
  if (S2) return S2;
  let h = P$1(t, r) ? j(t, r) : t, y2 = e.credentials;
  if (!y2) try {
    let i = typeof location < "u" && location.href ? location.href : "http://localhost/", c2 = new URL(t, i);
    y2 = typeof location < "u" && c2.origin === location.origin ? "include" : "omit";
  } catch {
    y2 = "omit";
  }
  let M2 = new AbortController(), O2 = setTimeout(() => M2.abort("timeout"), o), $ = (async () => {
    try {
      let i = await fetch(h, { signal: M2.signal, credentials: y2, headers: l2 });
      if (!i.ok) {
        let p2 = { ok: false, data: null, status: i.status, url: h, fromCache: false, reason: "http_error" };
        if (a2 > 0 && b.set(d2, { until: Date.now() + a2, result: p2 }), !f2) {
          let w = `${i.status} ${i.statusText || ""}`.trim();
          R$1.warnOnce(`http:${i.status}:${n}:${new URL(t, location?.href ?? "http://localhost/").origin}`, `HTTP error ${w} while fetching ${n} ${t}`);
        }
        return e.onError && e.onError(p2), p2;
      }
      if (n === "text") return { ok: true, data: await i.text(), status: i.status, url: h, fromCache: false };
      let c2 = await i.blob(), u = c2.type || i.headers.get("content-type") || "";
      return n === "dataURL" ? { ok: true, data: await T$1(c2), status: i.status, url: h, fromCache: false, mime: u } : { ok: true, data: c2, status: i.status, url: h, fromCache: false, mime: u };
    } catch (i) {
      let c2 = i && typeof i == "object" && "name" in i && i.name === "AbortError" ? String(i.message || "").includes("timeout") ? "timeout" : "abort" : "network", u = { ok: false, data: null, status: 0, url: h, fromCache: false, reason: c2 };
      if (!/^blob:/i.test(t) && a2 > 0 && b.set(d2, { until: Date.now() + a2, result: u }), !f2) {
        let p2 = `${c2}:${n}:${new URL(t, location?.href ?? "http://localhost/").origin}`, w = c2 === "timeout" ? `Timeout after ${o}ms. Consider increasing timeout or using a proxy for ${t}` : c2 === "abort" ? `Request aborted while fetching ${n} ${t}` : `Network/CORS issue while fetching ${n} ${t}. A proxy may be required`;
        R$1.errorOnce(p2, w);
      }
      return e.onError && e.onError(u), u;
    } finally {
      clearTimeout(O2), k.delete(d2);
    }
  })();
  return k.set(d2, $), $;
}
async function G$1(t, e = {}) {
  if (/^((repeating-)?(linear|radial|conic)-gradient)\(/i.test(t) || t.trim() === "none") return t;
  let o = A$2(t);
  if (!o) return t;
  let r = g$1(o);
  if (s.background.has(r)) {
    let a2 = s.background.get(r);
    return a2 ? `url("${a2}")` : "none";
  }
  try {
    let a2 = await E$1(r, { as: "dataURL", useProxy: e.useProxy });
    return a2.ok ? (s.background.set(r, a2.data), `url("${a2.data}")`) : (s.background.set(r, null), "none");
  } catch {
    return s.background.set(r, null), "none";
  }
}
var L = /* @__PURE__ */ new Set(["meta", "script", "noscript", "title", "link", "template"]), C = /* @__PURE__ */ new Set(["meta", "link", "style", "title", "noscript", "script", "template", "g", "defs", "use", "marker", "mask", "clipPath", "pattern", "path", "polygon", "polyline", "line", "circle", "ellipse", "rect", "filter", "lineargradient", "radialgradient", "stop"]), v = ["div", "span", "p", "a", "img", "ul", "li", "button", "input", "select", "textarea", "label", "section", "article", "header", "footer", "nav", "main", "aside", "h1", "h2", "h3", "h4", "h5", "h6", "table", "thead", "tbody", "tr", "td", "th"];
function K$2() {
  for (let t of v) {
    let e = String(t).toLowerCase();
    L.has(e) || C.has(e) || x$1(e);
  }
}
function x$1(t) {
  if (t = String(t).toLowerCase(), C.has(t)) {
    let a2 = {};
    return s.defaultStyle.set(t, a2), a2;
  }
  if (s.defaultStyle.has(t)) return s.defaultStyle.get(t);
  let e = document.getElementById("snapdom-sandbox");
  e || (e = document.createElement("div"), e.id = "snapdom-sandbox", e.setAttribute("data-snapdom-sandbox", "true"), e.setAttribute("aria-hidden", "true"), e.style.position = "absolute", e.style.left = "-9999px", e.style.top = "-9999px", e.style.width = "0px", e.style.height = "0px", e.style.overflow = "hidden", document.body.appendChild(e));
  let n = document.createElement(t);
  n.style.all = "initial", e.appendChild(n);
  let o = getComputedStyle(n), r = {};
  for (let a2 of o) {
    if (_$1(a2)) continue;
    let l2 = o.getPropertyValue(a2);
    r[a2] = l2;
  }
  return e.removeChild(n), s.defaultStyle.set(t, r), r;
}
var Q$1 = /(?:^|-)(animation|transition)(?:-|$)/i, q$1 = /^(--|view-timeline|scroll-timeline|animation-trigger|offset-|position-try|app-region|interactivity|overlay|view-transition|-webkit-locale|-webkit-user-(?:drag|modify)|-webkit-tap-highlight-color|-webkit-text-security)$/i, V = /* @__PURE__ */ new Set(["cursor", "pointer-events", "touch-action", "user-select", "print-color-adjust", "speak", "reading-flow", "reading-order", "anchor-name", "anchor-scope", "container-name", "container-type", "timeline-scope"]);
function _$1(t) {
  let e = String(t).toLowerCase();
  return !!(V.has(e) || q$1.test(e) || Q$1.test(e));
}
function H$1(t, e) {
  if (e = String(e || "").toLowerCase(), C.has(e)) return "";
  let n = [], o = x$1(e);
  for (let [r, a2] of Object.entries(t)) {
    if (_$1(r)) continue;
    let l2 = o[r];
    a2 && a2 !== l2 && n.push(`${r}:${a2}`);
  }
  return n.sort(), n.join(";");
}
function X$1(t) {
  let e = /* @__PURE__ */ new Set();
  return t.nodeType !== Node.ELEMENT_NODE && t.nodeType !== Node.DOCUMENT_FRAGMENT_NODE ? [] : (t.tagName && e.add(t.tagName.toLowerCase()), typeof t.querySelectorAll == "function" && t.querySelectorAll("*").forEach((n) => e.add(n.tagName.toLowerCase())), Array.from(e));
}
function J$1(t) {
  let e = /* @__PURE__ */ new Map();
  for (let o of t) {
    let r = s.defaultStyle.get(o);
    if (!r) continue;
    let a2 = Object.entries(r).map(([l2, f2]) => `${l2}:${f2};`).sort().join("");
    a2 && (e.has(a2) || e.set(a2, []), e.get(a2).push(o));
  }
  let n = "";
  for (let [o, r] of e.entries()) n += `${r.join(",")} { ${o} }
`;
  return n;
}
function z$2(t) {
  let e = Array.from(new Set(t.values())).filter(Boolean).sort(), n = /* @__PURE__ */ new Map(), o = 1;
  for (let r of e) n.set(r, `c${o++}`);
  return n;
}
function Y$1(t, e = null) {
  if (!(t instanceof Element)) return window.getComputedStyle(t, e);
  let n = s.computedStyle.get(t);
  if (n || (n = /* @__PURE__ */ new Map(), s.computedStyle.set(t, n)), !n.has(e)) {
    let o = window.getComputedStyle(t, e);
    n.set(e, o);
  }
  return n.get(e);
}
function Z$1(t) {
  let e = {};
  for (let n of t) e[n] = t.getPropertyValue(n);
  return e;
}
function tt$2(t) {
  let e = [], n = 0, o = 0;
  for (let r = 0; r < t.length; r++) {
    let a2 = t[r];
    a2 === "(" && n++, a2 === ")" && n--, a2 === "," && n === 0 && (e.push(t.slice(o, r).trim()), o = r + 1);
  }
  return e.push(t.slice(o).trim()), e;
}
var tt$1 = [/font\s*awesome/i, /material\s*icons/i, /ionicons/i, /glyphicons/i, /feather/i, /bootstrap\s*icons/i, /remix\s*icons/i, /heroicons/i, /layui/i, /lucide/i], E = Object.assign({ materialIconsFilled: "https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2", materialIconsOutlined: "https://fonts.gstatic.com/s/materialiconsoutlined/v110/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUcel5euIg.woff2", materialIconsRound: "https://fonts.gstatic.com/s/materialiconsround/v109/LDItaoyNOAY6Uewc665JcIzCKsKc_M9flwmPq_HTTw.woff2", materialIconsSharp: "https://fonts.gstatic.com/s/materialiconssharp/v110/oPWQ_lt5nv4pWNJpghLP75WiFR4kLh3kvmvRImcycg.woff2" }, typeof window < "u" && window.__SNAPDOM_ICON_FONTS__ || {}), W$1 = [];
function St(n) {
  let t = Array.isArray(n) ? n : [n];
  for (let o of t) o instanceof RegExp ? W$1.push(o) : typeof o == "string" ? W$1.push(new RegExp(o, "i")) : console.warn("[snapdom] Ignored invalid iconFont value:", o);
}
function R(n) {
  let t = typeof n == "string" ? n : "", o = [...tt$1, ...W$1];
  for (let s2 of o) if (s2 instanceof RegExp && s2.test(t)) return true;
  return !!(/icon/i.test(t) || /glyph/i.test(t) || /symbols/i.test(t) || /feather/i.test(t) || /fontawesome/i.test(t));
}
function et$1(n = "") {
  let t = String(n).toLowerCase();
  return /\bmaterial\s*icons\b/.test(t) || /\bmaterial\s*symbols\b/.test(t);
}
var H = /* @__PURE__ */ new Map();
function nt(n = "") {
  let t = /* @__PURE__ */ Object.create(null), o = String(n || ""), s2 = /['"]?\s*([A-Za-z]{3,4})\s*['"]?\s*([+-]?\d+(?:\.\d+)?)\s*/g, i;
  for (; i = s2.exec(o); ) t[i[1].toUpperCase()] = Number(i[2]);
  return t;
}
async function ot(n, t, o) {
  let s2 = String(n || ""), i = s2.toLowerCase(), c2 = String(t || "").toLowerCase();
  if (/\bmaterial\s*icons\b/.test(i) && !/\bsymbols\b/.test(i)) return { familyForMeasure: s2, familyForCanvas: s2 };
  if (!/\bmaterial\s*symbols\b/.test(i)) return { familyForMeasure: s2, familyForCanvas: s2 };
  let f2 = o && (o.FILL ?? o.fill), a2 = "outlined";
  /\brounded\b/.test(c2) || /\bround\b/.test(c2) ? a2 = "rounded" : /\bsharp\b/.test(c2) ? a2 = "sharp" : /\boutlined\b/.test(c2) && (a2 = "outlined");
  let m = f2 === 1, u = null;
  if (m && (a2 === "outlined" && E.materialIconsFilled ? u = { url: E.materialIconsFilled, alias: "snapdom-mi-filled" } : a2 === "rounded" && E.materialIconsRound ? u = { url: E.materialIconsRound, alias: "snapdom-mi-round" } : a2 === "sharp" && E.materialIconsSharp && (u = { url: E.materialIconsSharp, alias: "snapdom-mi-sharp" })), !u) return { familyForMeasure: s2, familyForCanvas: s2 };
  if (!H.has(u.alias)) try {
    let d2 = new FontFace(u.alias, `url(${u.url})`, { style: "normal", weight: "400" });
    document.fonts.add(d2), await d2.load(), H.set(u.alias, true);
  } catch {
    return { familyForMeasure: s2, familyForCanvas: s2 };
  }
  let h = `"${u.alias}"`;
  return { familyForMeasure: h, familyForCanvas: h };
}
async function st(n = "Material Icons", t = 24) {
  try {
    await Promise.all([document.fonts.load(`400 ${t}px "${String(n).replace(/["']/g, "")}"`), document.fonts.ready]);
  } catch {
  }
}
function rt(n) {
  let t = n.getPropertyValue("-webkit-text-fill-color")?.trim() || "", o = /^transparent$/i.test(t) || /rgba?\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)/i.test(t);
  if (t && !o && t.toLowerCase() !== "currentcolor") return t;
  let s2 = n.color?.trim();
  return s2 && s2 !== "inherit" ? s2 : "#000";
}
async function it$1(n, { family: t = "Material Icons", weight: o = "normal", fontSize: s2 = 32, color: i = "#000", variation: c2 = "", className: e = "" } = {}) {
  let f2 = String(t || "").replace(/^['"]+|['"]+$/g, ""), a2 = window.devicePixelRatio || 1, m = nt(c2), { familyForMeasure: u, familyForCanvas: h } = await ot(f2, e, m);
  await st(h.replace(/^["']+|["']+$/g, ""), s2);
  let d2 = document.createElement("span");
  d2.textContent = n, d2.style.position = "absolute", d2.style.visibility = "hidden", d2.style.left = "-99999px", d2.style.whiteSpace = "nowrap", d2.style.fontFamily = u, d2.style.fontWeight = String(o || "normal"), d2.style.fontSize = `${s2}px`, d2.style.lineHeight = "1", d2.style.margin = "0", d2.style.padding = "0", d2.style.fontFeatureSettings = "'liga' 1", d2.style.fontVariantLigatures = "normal", d2.style.color = i, document.body.appendChild(d2);
  let b2 = d2.getBoundingClientRect(), S2 = Math.max(1, Math.ceil(b2.width)), r = Math.max(1, Math.ceil(b2.height));
  document.body.removeChild(d2);
  let l2 = document.createElement("canvas");
  l2.width = S2 * a2, l2.height = r * a2;
  let p2 = l2.getContext("2d");
  p2.scale(a2, a2), p2.font = `${o ? `${o} ` : ""}${s2}px ${h}`, p2.textAlign = "left", p2.textBaseline = "top", p2.fillStyle = i;
  try {
    p2.fontKerning = "normal";
  } catch {
  }
  return p2.fillText(n, 0, 0), { dataUrl: l2.toDataURL(), width: S2, height: r };
}
async function bt(n, t) {
  if (!(n instanceof Element)) return 0;
  let o = '.material-icons, [class*="material-symbols"]', s2 = Array.from(n.querySelectorAll(o)).filter((e) => e && e.textContent && e.textContent.trim());
  if (s2.length === 0) return 0;
  let i = t instanceof Element ? Array.from(t.querySelectorAll(o)).filter((e) => e && e.textContent && e.textContent.trim()) : [], c2 = 0;
  for (let e = 0; e < s2.length; e++) {
    let f2 = s2[e], a2 = i[e] || null;
    try {
      let m = getComputedStyle(a2 || f2), u = m.fontFamily || "Material Icons";
      if (!et$1(u)) continue;
      let h = (a2 || f2).textContent.trim();
      if (!h) continue;
      let d2 = parseInt(m.fontSize, 10) || 24, b2 = m.fontWeight && m.fontWeight !== "normal" ? m.fontWeight : "normal", S2 = rt(m), r = m.fontVariationSettings && m.fontVariationSettings !== "normal" ? m.fontVariationSettings : "", l2 = (a2 || f2).className || "", { dataUrl: p2, width: w, height: g2 } = await it$1(h, { family: u, weight: b2, fontSize: d2, color: S2, variation: r, className: l2 });
      f2.textContent = "";
      let y2 = f2.ownerDocument.createElement("img");
      y2.src = p2, y2.alt = h, y2.style.height = `${d2}px`, y2.style.width = `${Math.max(1, Math.round(w / g2 * d2))}px`, y2.style.objectFit = "contain", y2.style.verticalAlign = getComputedStyle(f2).verticalAlign || "baseline", f2.appendChild(y2), c2++;
    } catch {
    }
  }
  return c2;
}
async function Rt(n, t, o, s2 = 32, i = "#000") {
  t = t.replace(/^['"]+|['"]+$/g, "");
  let c2 = window.devicePixelRatio || 1;
  try {
    await document.fonts.ready;
  } catch {
  }
  let e = document.createElement("span");
  e.textContent = n, e.style.position = "absolute", e.style.visibility = "hidden", e.style.fontFamily = `"${t}"`, e.style.fontWeight = o || "normal", e.style.fontSize = `${s2}px`, e.style.lineHeight = "1", e.style.whiteSpace = "nowrap", e.style.padding = "0", e.style.margin = "0", document.body.appendChild(e);
  let f2 = e.getBoundingClientRect(), a2 = Math.ceil(f2.width), m = Math.ceil(f2.height);
  document.body.removeChild(e);
  let u = document.createElement("canvas");
  u.width = Math.max(1, a2 * c2), u.height = Math.max(1, m * c2);
  let h = u.getContext("2d");
  return h.scale(c2, c2), h.font = o ? `${o} ${s2}px "${t}"` : `${s2}px "${t}"`, h.textAlign = "left", h.textBaseline = "top", h.fillStyle = i, h.fillText(n, 0, 0), { dataUrl: u.toDataURL(), width: a2, height: m };
}
var at$1 = /* @__PURE__ */ new Set(["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "emoji", "math", "fangsong", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded"]);
function T(n) {
  if (!n) return "";
  for (let t of n.split(",")) {
    let o = t.trim().replace(/^['"]+|['"]+$/g, "");
    if (o && !at$1.has(o.toLowerCase())) return o;
  }
  return "";
}
function P(n) {
  let t = String(n ?? "400").trim().toLowerCase();
  if (t === "normal") return 400;
  if (t === "bold") return 700;
  let o = parseInt(t, 10);
  return Number.isFinite(o) ? Math.min(900, Math.max(100, o)) : 400;
}
function U(n) {
  let t = String(n ?? "normal").trim().toLowerCase();
  return t.startsWith("italic") ? "italic" : t.startsWith("oblique") ? "oblique" : "normal";
}
function ct$1(n) {
  let t = String(n ?? "100%").match(/(\d+(?:\.\d+)?)\s*%/);
  return t ? Math.max(50, Math.min(200, parseFloat(t[1]))) : 100;
}
function lt$1(n) {
  let t = String(n || "400").trim(), o = t.match(/^(\d{2,3})\s+(\d{2,3})$/);
  if (o) {
    let i = P(o[1]), c2 = P(o[2]);
    return { min: Math.min(i, c2), max: Math.max(i, c2) };
  }
  let s2 = P(t);
  return { min: s2, max: s2 };
}
function ft(n) {
  let t = String(n || "normal").trim().toLowerCase();
  return t === "italic" ? { kind: "italic" } : t.startsWith("oblique") ? { kind: "oblique" } : { kind: "normal" };
}
function mt$1(n) {
  let t = String(n || "100%").trim(), o = t.match(/(\d+(?:\.\d+)?)\s*%\s+(\d+(?:\.\d+)?)\s*%/);
  if (o) {
    let c2 = parseFloat(o[1]), e = parseFloat(o[2]);
    return { min: Math.min(c2, e), max: Math.max(c2, e) };
  }
  let s2 = t.match(/(\d+(?:\.\d+)?)\s*%/), i = s2 ? parseFloat(s2[1]) : 100;
  return { min: i, max: i };
}
function ut(n, t) {
  if (!n) return false;
  try {
    let o = new URL(n, location.href);
    if (o.origin === location.origin) return true;
    let i = o.host.toLowerCase();
    if (["fonts.googleapis.com", "fonts.gstatic.com", "use.typekit.net", "p.typekit.net", "kit.fontawesome.com", "use.fontawesome.com"].some((f2) => i.endsWith(f2))) return true;
    let e = (o.pathname + o.search).toLowerCase();
    if (/\bfont(s)?\b/.test(e) || /\.woff2?(\b|$)/.test(e)) return true;
    for (let f2 of t) {
      let a2 = f2.toLowerCase().replace(/\s+/g, "+"), m = f2.toLowerCase().replace(/\s+/g, "-");
      if (e.includes(a2) || e.includes(m)) return true;
    }
    return false;
  } catch {
    return false;
  }
}
function dt(n) {
  let t = /* @__PURE__ */ new Set();
  for (let o of n || []) {
    let s2 = String(o).split("__")[0]?.trim();
    s2 && t.add(s2);
  }
  return t;
}
function K$1(n, t) {
  return n && n.replace(/url\(\s*(['"]?)([^)'"]+)\1\s*\)/g, (o, s2, i) => {
    let c2 = (i || "").trim();
    if (!c2 || /^data:|^blob:|^https?:|^file:|^about:/i.test(c2)) return o;
    let e = c2;
    try {
      e = new URL(c2, t || location.href).href;
    } catch {
    }
    return `url("${e}")`;
  });
}
var q = /@import\s+(?:url\(\s*(['"]?)([^)"']+)\1\s*\)|(['"])([^"']+)\3)([^;]*);/g, N = 4;
async function ht$1(n, t, o) {
  if (!n) return n;
  let s2 = /* @__PURE__ */ new Set();
  function i(f2, a2) {
    try {
      return new URL(f2, a2 || location.href).href;
    } catch {
      return f2;
    }
  }
  async function c2(f2, a2, m = 0) {
    if (m > N) return console.warn(`[snapDOM] @import depth exceeded (${N}) at ${a2}`), f2;
    let u = "", h = 0, d2;
    for (; d2 = q.exec(f2); ) {
      u += f2.slice(h, d2.index), h = q.lastIndex;
      let b2 = (d2[2] || d2[4] || "").trim(), S2 = i(b2, a2);
      if (s2.has(S2)) {
        console.warn(`[snapDOM] Skipping circular @import: ${S2}`);
        continue;
      }
      s2.add(S2);
      let r = "";
      try {
        let l2 = await E$1(S2, { as: "text", useProxy: o, silent: true });
        l2.ok && typeof l2.data == "string" && (r = l2.data);
      } catch {
      }
      r ? (r = K$1(r, S2), r = await c2(r, S2, m + 1), u += `
/* inlined: ${S2} */
${r}
`) : u += d2[0];
    }
    return u += f2.slice(h), u;
  }
  let e = K$1(n, t || location.href);
  return e = await c2(e, t || location.href, 0), e;
}
var X = /url\((["']?)([^"')]+)\1\)/g, pt = /@font-face[^{}]*\{[^}]*\}/g;
function J(n) {
  if (!n) return [];
  let t = [], o = n.split(",").map((s2) => s2.trim()).filter(Boolean);
  for (let s2 of o) {
    let i = s2.match(/^U\+([0-9A-Fa-f?]+)(?:-([0-9A-Fa-f?]+))?$/);
    if (!i) continue;
    let c2 = i[1], e = i[2], f2 = (a2) => {
      if (!a2.includes("?")) return parseInt(a2, 16);
      let m = parseInt(a2.replace(/\?/g, "0"), 16), u = parseInt(a2.replace(/\?/g, "F"), 16);
      return [m, u];
    };
    if (e) {
      let a2 = f2(c2), m = f2(e), u = Array.isArray(a2) ? a2[0] : a2, h = Array.isArray(m) ? m[1] : m;
      t.push([Math.min(u, h), Math.max(u, h)]);
    } else {
      let a2 = f2(c2);
      Array.isArray(a2) ? t.push([a2[0], a2[1]]) : t.push([a2, a2]);
    }
  }
  return t;
}
function Q(n, t) {
  if (!t.length || !n || n.size === 0) return true;
  for (let o of n) for (let [s2, i] of t) if (o >= s2 && o <= i) return true;
  return false;
}
function D(n, t) {
  let o = [];
  if (!n) return o;
  for (let s2 of n.matchAll(X)) {
    let i = (s2[2] || "").trim();
    if (!(!i || i.startsWith("data:"))) {
      if (!/^https?:/i.test(i)) try {
        i = new URL(i, t || location.href).href;
      } catch {
      }
      o.push(i);
    }
  }
  return o;
}
async function Y(n, t, o = "") {
  let s$1 = n;
  for (let i of n.matchAll(X)) {
    let c2 = A$2(i[0]);
    if (!c2) continue;
    let e = c2;
    if (!e.startsWith("http") && !e.startsWith("data:")) try {
      e = new URL(e, t || location.href).href;
    } catch {
    }
    if (!R(e)) {
      if (s.resource?.has(e)) {
        s.font?.add(e), s$1 = s$1.replace(i[0], `url(${s.resource.get(e)})`);
        continue;
      }
      if (!s.font?.has(e)) try {
        let f2 = await E$1(e, { as: "dataURL", useProxy: o, silent: true });
        if (f2.ok && typeof f2.data == "string") {
          let a2 = f2.data;
          s.resource?.set(e, a2), s.font?.add(e), s$1 = s$1.replace(i[0], `url(${a2})`);
        }
      } catch {
        console.warn("[snapDOM] Failed to fetch font resource:", e);
      }
    }
  }
  return s$1;
}
function yt(n) {
  if (!n.length) return null;
  let t = (f2, a2) => n.some(([m, u]) => !(u < f2 || m > a2)), o = t(0, 255) || t(305, 305), s2 = t(256, 591) || t(7680, 7935), i = t(880, 1023), c2 = t(1024, 1279);
  return t(7840, 7929) || t(258, 259) || t(416, 417) || t(431, 432) ? "vietnamese" : c2 ? "cyrillic" : i ? "greek" : s2 ? "latin-ext" : o ? "latin" : null;
}
function G(n = {}) {
  let t = new Set((n.families || []).map((i) => String(i).toLowerCase())), o = new Set((n.domains || []).map((i) => String(i).toLowerCase())), s2 = new Set((n.subsets || []).map((i) => String(i).toLowerCase()));
  return (i, c2) => {
    if (t.size && t.has(i.family.toLowerCase())) return true;
    if (o.size) for (let e of i.srcUrls) try {
      if (o.has(new URL(e).host.toLowerCase())) return true;
    } catch {
    }
    if (s2.size) {
      let e = yt(c2);
      if (e && s2.has(e)) return true;
    }
    return false;
  };
}
function gt(n) {
  if (!n) return n;
  let t = /@font-face[^{}]*\{[^}]*\}/gi, o = /* @__PURE__ */ new Set(), s2 = [];
  for (let c2 of n.match(t) || []) {
    let e = c2.match(/font-family:\s*([^;]+);/i)?.[1] || "", f2 = T(e), a2 = (c2.match(/font-weight:\s*([^;]+);/i)?.[1] || "400").trim(), m = (c2.match(/font-style:\s*([^;]+);/i)?.[1] || "normal").trim(), u = (c2.match(/font-stretch:\s*([^;]+);/i)?.[1] || "100%").trim(), h = (c2.match(/unicode-range:\s*([^;]+);/i)?.[1] || "").trim(), d2 = (c2.match(/src\s*:\s*([^;}]+)[;}]/i)?.[1] || "").trim(), b2 = D(d2, location.href), S2 = b2.length ? b2.map((l2) => String(l2).toLowerCase()).sort().join("|") : d2.toLowerCase(), r = [String(f2 || "").toLowerCase(), a2, m, u, h.toLowerCase(), S2].join("|");
    o.has(r) || (o.add(r), s2.push(c2));
  }
  if (s2.length === 0) return n;
  let i = 0;
  return n.replace(t, () => s2[i++] || "");
}
function wt(n, t, o, s2) {
  let i = Array.from(n || []).sort().join("|"), c2 = t ? JSON.stringify({ families: (t.families || []).map((a2) => String(a2).toLowerCase()).sort(), domains: (t.domains || []).map((a2) => String(a2).toLowerCase()).sort(), subsets: (t.subsets || []).map((a2) => String(a2).toLowerCase()).sort() }) : "", e = (o || []).map((a2) => `${(a2.family || "").toLowerCase()}::${a2.weight || "normal"}::${a2.style || "normal"}::${a2.src || ""}`).sort().join("|");
  return `fonts-embed-css::req=${i}::ex=${c2}::lf=${e}::px=${s2 || ""}`;
}
async function Z(n, t, o, s2) {
  let i;
  try {
    i = n.cssRules || [];
  } catch {
    return;
  }
  let c2 = (e, f2) => {
    try {
      return new URL(e, f2 || location.href).href;
    } catch {
      return e;
    }
  };
  for (let e of i) {
    if (e.type === CSSRule.IMPORT_RULE && e.styleSheet) {
      let f2 = e.href ? c2(e.href, t) : t;
      if (s2.depth >= N) {
        console.warn(`[snapDOM] CSSOM import depth exceeded (${N}) at ${f2}`);
        continue;
      }
      if (f2 && s2.visitedSheets.has(f2)) {
        console.warn(`[snapDOM] Skipping circular CSSOM import: ${f2}`);
        continue;
      }
      f2 && s2.visitedSheets.add(f2);
      let a2 = { ...s2, depth: (s2.depth || 0) + 1 };
      await Z(e.styleSheet, f2, o, a2);
      continue;
    }
    if (e.type === CSSRule.FONT_FACE_RULE) {
      let f2 = (e.style.getPropertyValue("font-family") || "").trim(), a2 = T(f2);
      if (!a2 || R(a2)) continue;
      let m = (e.style.getPropertyValue("font-weight") || "400").trim(), u = (e.style.getPropertyValue("font-style") || "normal").trim(), h = (e.style.getPropertyValue("font-stretch") || "100%").trim(), d2 = (e.style.getPropertyValue("src") || "").trim(), b2 = (e.style.getPropertyValue("unicode-range") || "").trim();
      if (!s2.faceMatchesRequired(a2, u, m, h)) continue;
      let S2 = J(b2);
      if (!Q(s2.usedCodepoints, S2)) continue;
      let r = { family: a2, weightSpec: m, styleSpec: u, stretchSpec: h, unicodeRange: b2, srcRaw: d2, srcUrls: D(d2, t || location.href), href: t || location.href };
      if (s2.simpleExcluder && s2.simpleExcluder(r, S2)) continue;
      if (/url\(/i.test(d2)) {
        let l2 = await Y(d2, t || location.href, s2.useProxy);
        await o(`@font-face{font-family:${a2};src:${l2};font-style:${u};font-weight:${m};font-stretch:${h};${b2 ? `unicode-range:${b2};` : ""}}`);
      } else await o(`@font-face{font-family:${a2};src:${d2};font-style:${u};font-weight:${m};font-stretch:${h};${b2 ? `unicode-range:${b2};` : ""}}`);
    }
  }
}
async function Lt({ required: n, usedCodepoints: t, exclude: o = void 0, localFonts: s$1 = [], useProxy: i = "" } = {}) {
  n instanceof Set || (n = /* @__PURE__ */ new Set()), t instanceof Set || (t = /* @__PURE__ */ new Set());
  let c2 = /* @__PURE__ */ new Map();
  for (let r of n) {
    let [l2, p2, w, g2] = String(r).split("__");
    if (!l2) continue;
    let y2 = c2.get(l2) || [];
    y2.push({ w: parseInt(p2, 10), s: w, st: parseInt(g2, 10) }), c2.set(l2, y2);
  }
  function e(r, l2, p2, w) {
    if (!c2.has(r)) return false;
    let g2 = c2.get(r), y2 = lt$1(p2), C2 = ft(l2), F2 = mt$1(w), M2 = y2.min !== y2.max, A2 = y2.min, v2 = (k2) => C2.kind === "normal" && k2 === "normal" || C2.kind !== "normal" && (k2 === "italic" || k2 === "oblique"), I2 = false;
    for (let k2 of g2) {
      let $ = M2 ? k2.w >= y2.min && k2.w <= y2.max : k2.w === A2, L2 = v2(U(k2.s)), _2 = k2.st >= F2.min && k2.st <= F2.max;
      if ($ && L2 && _2) {
        I2 = true;
        break;
      }
    }
    if (I2) return true;
    if (!M2) for (let k2 of g2) {
      let $ = v2(U(k2.s)), L2 = k2.st >= F2.min && k2.st <= F2.max;
      if (Math.abs(A2 - k2.w) <= 300 && $ && L2) return true;
    }
    if (!M2 && C2.kind === "normal" && g2.some(($) => U($.s) !== "normal")) for (let $ of g2) {
      let L2 = Math.abs(A2 - $.w) <= 300, _2 = $.st >= F2.min && $.st <= F2.max;
      if (L2 && _2) return true;
    }
    return false;
  }
  let f2 = G(o), a2 = wt(n, o, s$1, i);
  if (s.resource?.has(a2)) return s.resource.get(a2);
  let m = dt(n), u = [], h = q;
  for (let r of document.querySelectorAll("style")) {
    let l2 = r.textContent || "";
    for (let p2 of l2.matchAll(h)) {
      let w = (p2[2] || p2[4] || "").trim();
      if (!w || R(w)) continue;
      !!document.querySelector(`link[rel="stylesheet"][href="${w}"]`) || u.push(w);
    }
  }
  u.length && await Promise.all(u.map((r) => new Promise((l2) => {
    if (document.querySelector(`link[rel="stylesheet"][href="${r}"]`)) return l2(null);
    let p2 = document.createElement("link");
    p2.rel = "stylesheet", p2.href = r, p2.setAttribute("data-snapdom", "injected-import"), p2.onload = () => l2(p2), p2.onerror = () => l2(null), document.head.appendChild(p2);
  })));
  let d2 = "", b2 = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).filter((r) => !!r.href);
  for (let r of b2) try {
    if (R(r.href)) continue;
    let l2 = "", p2 = false;
    try {
      p2 = new URL(r.href, location.href).origin === location.origin;
    } catch {
    }
    if (!p2 && !ut(r.href, m)) continue;
    if (p2) {
      let g2 = Array.from(document.styleSheets).find((y2) => y2.href === r.href);
      if (g2) try {
        let y2 = g2.cssRules || [];
        l2 = Array.from(y2).map((C2) => C2.cssText).join("");
      } catch {
      }
    }
    if (!l2 && (l2 = (await E$1(r.href, { as: "text", useProxy: i })).data, R(r.href))) continue;
    l2 = await ht$1(l2, r.href, i);
    let w = "";
    for (let g2 of l2.match(pt) || []) {
      let y2 = (g2.match(/font-family:\s*([^;]+);/i)?.[1] || "").trim(), C2 = T(y2);
      if (!C2 || R(C2)) continue;
      let F2 = (g2.match(/font-weight:\s*([^;]+);/i)?.[1] || "400").trim(), M2 = (g2.match(/font-style:\s*([^;]+);/i)?.[1] || "normal").trim(), A2 = (g2.match(/font-stretch:\s*([^;]+);/i)?.[1] || "100%").trim(), v2 = (g2.match(/unicode-range:\s*([^;]+);/i)?.[1] || "").trim(), I2 = (g2.match(/src\s*:\s*([^;}]+)[;}]/i)?.[1] || "").trim(), k2 = D(I2, r.href);
      if (!e(C2, M2, F2, A2)) continue;
      let $ = J(v2);
      if (!Q(t, $)) continue;
      let L2 = { family: C2, weightSpec: F2, styleSpec: M2, stretchSpec: A2, unicodeRange: v2, srcRaw: I2, srcUrls: k2, href: r.href };
      if (o && f2(L2, $)) continue;
      let _2 = /url\(/i.test(I2) ? await Y(g2, r.href, i) : g2;
      w += _2;
    }
    w.trim() && (d2 += w);
  } catch {
    console.warn("[snapDOM] Failed to process stylesheet:", r.href);
  }
  let S2 = { requiredIndex: c2, usedCodepoints: t, faceMatchesRequired: e, simpleExcluder: o ? G(o) : null, useProxy: i, visitedSheets: /* @__PURE__ */ new Set(), depth: 0 };
  for (let r of document.styleSheets) if (!(r.href && b2.some((l2) => l2.href === r.href))) try {
    let l2 = r.href || location.href;
    l2 && S2.visitedSheets.add(l2), await Z(r, l2, async (p2) => {
      d2 += p2;
    }, S2);
  } catch {
  }
  try {
    for (let r of document.fonts || []) {
      if (!r || !r.family || r.status !== "loaded" || !r._snapdomSrc) continue;
      let l2 = String(r.family).replace(/^['"]+|['"]+$/g, "");
      if (R(l2) || !c2.has(l2) || o?.families && o.families.some((w) => String(w).toLowerCase() === l2.toLowerCase())) continue;
      let p2 = r._snapdomSrc;
      if (!String(p2).startsWith("data:")) {
        if (s.resource?.has(r._snapdomSrc)) p2 = s.resource.get(r._snapdomSrc), s.font?.add(r._snapdomSrc);
        else if (!s.font?.has(r._snapdomSrc)) try {
          let w = await E$1(r._snapdomSrc, { as: "dataURL", useProxy: i, silent: true });
          if (w.ok && typeof w.data == "string") p2 = w.data, s.resource?.set(r._snapdomSrc, p2), s.font?.add(r._snapdomSrc);
          else continue;
        } catch {
          console.warn("[snapDOM] Failed to fetch dynamic font src:", r._snapdomSrc);
          continue;
        }
      }
      d2 += `@font-face{font-family:'${l2}';src:url(${p2});font-style:${r.style || "normal"};font-weight:${r.weight || "normal"};}`;
    }
  } catch {
  }
  for (let r of s$1) {
    if (!r || typeof r != "object") continue;
    let l2 = String(r.family || "").replace(/^['"]+|['"]+$/g, "");
    if (!l2 || R(l2) || !c2.has(l2) || o?.families && o.families.some((F2) => String(F2).toLowerCase() === l2.toLowerCase())) continue;
    let p2 = r.weight != null ? String(r.weight) : "normal", w = r.style != null ? String(r.style) : "normal", g2 = r.stretchPct != null ? `${r.stretchPct}%` : "100%", y2 = String(r.src || ""), C2 = y2;
    if (!C2.startsWith("data:")) {
      if (s.resource?.has(y2)) C2 = s.resource.get(y2), s.font?.add(y2);
      else if (!s.font?.has(y2)) try {
        let F2 = await E$1(y2, { as: "dataURL", useProxy: i, silent: true });
        if (F2.ok && typeof F2.data == "string") C2 = F2.data, s.resource?.set(y2, C2), s.font?.add(y2);
        else continue;
      } catch {
        console.warn("[snapDOM] Failed to fetch localFonts src:", y2);
        continue;
      }
    }
    d2 += `@font-face{font-family:'${l2}';src:url(${C2});font-style:${w};font-weight:${p2};font-stretch:${g2};}`;
  }
  return d2 && (d2 = gt(d2), s.resource?.set(a2, d2)), d2;
}
function Mt$1(n) {
  let t = /* @__PURE__ */ new Set();
  if (!n) return t;
  let o = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, null), s2 = (e) => {
    let f2 = T(e.fontFamily);
    if (!f2) return;
    let a2 = (m, u, h) => `${f2}__${P(m)}__${U(u)}__${ct$1(h)}`;
    t.add(a2(e.fontWeight, e.fontStyle, e.fontStretch));
  };
  s2(getComputedStyle(n));
  let i = getComputedStyle(n, "::before");
  i && i.content && i.content !== "none" && s2(i);
  let c2 = getComputedStyle(n, "::after");
  for (c2 && c2.content && c2.content !== "none" && s2(c2); o.nextNode(); ) {
    let e = o.currentNode, f2 = getComputedStyle(e);
    s2(f2);
    let a2 = getComputedStyle(e, "::before");
    a2 && a2.content && a2.content !== "none" && s2(a2);
    let m = getComputedStyle(e, "::after");
    m && m.content && m.content !== "none" && s2(m);
  }
  return t;
}
function At$1(n) {
  let t = /* @__PURE__ */ new Set(), o = (i) => {
    if (i) for (let c2 of i) t.add(c2.codePointAt(0));
  }, s2 = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null);
  for (; s2.nextNode(); ) {
    let i = s2.currentNode;
    if (i.nodeType === Node.TEXT_NODE) o(i.nodeValue || "");
    else if (i.nodeType === Node.ELEMENT_NODE) {
      let c2 = i;
      for (let e of ["::before", "::after"]) {
        let a2 = getComputedStyle(c2, e)?.getPropertyValue("content");
        if (!(!a2 || a2 === "none")) if (/^"/.test(a2) || /^'/.test(a2)) o(a2.slice(1, -1));
        else {
          let m = a2.match(/\\[0-9A-Fa-f]{1,6}/g);
          if (m) for (let u of m) try {
            t.add(parseInt(u.slice(1), 16));
          } catch {
          }
        }
      }
    }
  }
  return t;
}
async function It(n, t = 2) {
  try {
    await document.fonts.ready;
  } catch {
  }
  let o = Array.from(n || []).filter(Boolean);
  if (o.length === 0) return;
  let s2 = () => {
    let i = document.createElement("div");
    i.style.cssText = "position:absolute!important;left:-9999px!important;top:0!important;opacity:0!important;pointer-events:none!important;contain:layout size style;";
    for (let c2 of o) {
      let e = document.createElement("span");
      e.textContent = "AaBbGg1234ÁÉÍÓÚçñ—∞", e.style.fontFamily = `"${c2}"`, e.style.fontWeight = "700", e.style.fontStyle = "italic", e.style.fontSize = "32px", e.style.lineHeight = "1", e.style.whiteSpace = "nowrap", e.style.margin = "0", e.style.padding = "0", i.appendChild(e);
    }
    document.body.appendChild(i), i.offsetWidth, document.body.removeChild(i);
  };
  for (let i = 0; i < Math.max(1, t); i++) s2(), await new Promise((c2) => requestAnimationFrame(() => requestAnimationFrame(c2)));
}
async function Et$1(n, t, o, s2 = {}) {
  let i = [[n, t]], c2 = ["background-image", "mask", "mask-image", "-webkit-mask", "-webkit-mask-image", "mask-source", "mask-box-image-source", "mask-border-source", "-webkit-mask-box-image-source", "border-image", "border-image-source"], e = ["mask-position", "mask-size", "mask-repeat", "-webkit-mask-position", "-webkit-mask-size", "-webkit-mask-repeat", "mask-origin", "mask-clip", "-webkit-mask-origin", "-webkit-mask-clip", "-webkit-mask-position-x", "-webkit-mask-position-y"], f2 = ["background-position", "background-position-x", "background-position-y", "background-size", "background-repeat", "background-origin", "background-clip", "background-attachment", "background-blend-mode"], a2 = ["border-image-slice", "border-image-width", "border-image-outset", "border-image-repeat"];
  for (; i.length; ) {
    let [m, u] = i.shift(), h = o.get(m) || Y$1(m);
    o.has(m) || o.set(m, h);
    let d2 = (() => {
      let r = h.getPropertyValue("border-image"), l2 = h.getPropertyValue("border-image-source");
      return r && r !== "none" || l2 && l2 !== "none";
    })();
    for (let r of f2) {
      let l2 = h.getPropertyValue(r);
      l2 && u.style.setProperty(r, l2);
    }
    for (let r of c2) {
      let l2 = h.getPropertyValue(r);
      if (!l2 || l2 === "none") continue;
      let p2 = tt$2(l2), w = await Promise.all(p2.map((g2) => G$1(g2, s2)));
      w.some((g2) => g2 && g2 !== "none" && !/^url\(undefined/.test(g2)) && u.style.setProperty(r, w.join(", "));
    }
    for (let r of e) {
      let l2 = h.getPropertyValue(r);
      !l2 || l2 === "initial" || u.style.setProperty(r, l2);
    }
    if (d2) for (let r of a2) {
      let l2 = h.getPropertyValue(r);
      !l2 || l2 === "initial" || u.style.setProperty(r, l2);
    }
    let b2 = Array.from(m.children), S2 = Array.from(u.children).filter((r) => !(r.dataset && r.dataset.snapdomPseudo));
    for (let r = 0; r < Math.min(b2.length, S2.length); r++) i.push([b2[r], S2[r]]);
  }
}
function d(e, { fast: i = false } = {}) {
  if (i) return e();
  "requestIdleCallback" in window ? requestIdleCallback(e, { timeout: 50 }) : setTimeout(e, 1);
}
function l$1() {
  if (typeof navigator > "u") return false;
  let e = navigator.userAgent || "", i = e.toLowerCase(), t = i.includes("safari") && !i.includes("chrome") && !i.includes("crios") && !i.includes("fxios") && !i.includes("android"), s2 = /applewebkit/i.test(e), o = /mobile/i.test(e), a2 = !/safari/i.test(e), n = s2 && o && a2, r = /(micromessenger|wxwork|wecom|windowswechat|macwechat)/i.test(e), c2 = /(baiduboxapp|baidubrowser|baidusearch|baiduboxlite)/i.test(i), u = /ipad|iphone|ipod/.test(i) && s2;
  return t || n || r || c2 || u;
}
async function I(e = document, t = {}) {
  let { embedFonts: k2 = true, useProxy: i = "" } = t, F2 = t.cache ?? t.cacheOpt ?? "full";
  et$2(F2);
  try {
    await document.fonts?.ready;
  } catch {
  }
  try {
    K$2();
  } catch {
  }
  s.session = s.session || {}, s.session.styleCache || (s.session.styleCache = /* @__PURE__ */ new WeakMap()), s.image = s.image || /* @__PURE__ */ new Map(), s.background = s.background || /* @__PURE__ */ new Map();
  try {
    await Et$1(e, void 0, s.session.styleCache, { useProxy: i });
  } catch {
  }
  let n = [], m = [];
  try {
    if (e && e.nodeType === 1) {
      let s2 = e.querySelectorAll ? Array.from(e.querySelectorAll("*")) : [];
      m = [e, ...s2], n = [], e.tagName === "IMG" && e.getAttribute("src") && n.push(e), n.push(...Array.from(e.querySelectorAll?.("img[src]") || []));
    } else e?.querySelectorAll && (n = Array.from(e.querySelectorAll("img[src]")), m = Array.from(e.querySelectorAll("*")));
  } catch {
  }
  let f2 = [];
  for (let s$1 of n) {
    let a2 = s$1?.currentSrc || s$1?.src;
    if (a2 && !s.image.has(a2)) {
      let l2 = Promise.resolve().then(async () => {
        let r = await E$1(a2, { as: "dataURL", useProxy: i });
        r?.ok && typeof r.data == "string" && s.image.set(a2, r.data);
      }).catch(() => {
      });
      f2.push(l2);
    }
  }
  for (let s2 of m) {
    let a2 = "";
    try {
      a2 = s2?.style?.backgroundImage || "", (!a2 || a2 === "none") && (a2 = Y$1(s2).backgroundImage);
    } catch {
    }
    if (a2 && a2 !== "none") {
      let l2 = a2.match(/url\((?:[^()"']+|"(?:[^"]*)"|'(?:[^']*)')\)/gi) || [];
      for (let r of l2) {
        let u = Promise.resolve().then(() => G$1(r, { ...t, useProxy: i })).catch(() => {
        });
        f2.push(u);
      }
    }
  }
  if (k2) try {
    let s2 = Mt$1(e), a2 = At$1(e);
    if (typeof l$1 == "function" ? l$1() : !!l$1) {
      let r = new Set(Array.from(s2).map((u) => String(u).split("__")[0]).filter(Boolean));
      await It(r, 3);
    }
    await Lt({ required: s2, usedCodepoints: a2, exclude: t.excludeFonts, localFonts: t.localFonts, useProxy: t.useProxy ?? i });
  } catch {
  }
  await Promise.allSettled(f2);
}
var f$1 = [];
function c$1(n) {
  if (!n) return null;
  if (Array.isArray(n)) {
    let [t, o] = n;
    return typeof t == "function" ? t(o) : t;
  }
  if (typeof n == "object" && "plugin" in n) {
    let { plugin: t, options: o } = n;
    return typeof t == "function" ? t(o) : t;
  }
  return typeof n == "function" ? n() : n;
}
function p(...n) {
  let t = n.flat();
  for (let o of t) {
    let i = c$1(o);
    i && (f$1.some((r) => r && r.name && i.name && r.name === i.name) || f$1.push(i));
  }
}
function l(n) {
  return (n && Array.isArray(n.plugins) ? n.plugins : f$1) || f$1;
}
async function g(n, t, o) {
  let i = o, r = l(t);
  for (let u of r) {
    let e = u && typeof u[n] == "function" ? u[n] : null;
    if (!e) continue;
    let s2 = await e(t, i);
    typeof s2 < "u" && (i = s2);
  }
  return i;
}
async function y(n, t, o) {
  let i = [], r = l(t);
  for (let u of r) {
    let e = u && typeof u[n] == "function" ? u[n] : null;
    if (!e) continue;
    let s2 = await e(t, o);
    typeof s2 < "u" && i.push(s2);
  }
  return i;
}
function a(n) {
  let t = [];
  if (Array.isArray(n)) for (let o of n) {
    let i = c$1(o);
    if (!i || !i.name) continue;
    let r = t.findIndex((u) => u && u.name === i.name);
    r >= 0 && t.splice(r, 1), t.push(i);
  }
  for (let o of f$1) o && o.name && !t.some((i) => i.name === o.name) && t.push(o);
  return Object.freeze(t);
}
function A$1(n, t, o = false) {
  return !n || n.plugins && !o || (n.plugins = a(t)), n;
}
var Jt = /* @__PURE__ */ new WeakMap(), Ct = /* @__PURE__ */ new Map(), vt = 0;
function it() {
  vt++;
}
var Qt = false;
function en(t = document.documentElement) {
  if (!Qt) {
    Qt = true;
    try {
      new MutationObserver(() => it()).observe(t, { subtree: true, childList: true, characterData: true, attributes: true });
    } catch {
    }
    try {
      new MutationObserver(() => it()).observe(document.head, { subtree: true, childList: true, characterData: true, attributes: true });
    } catch {
    }
    try {
      let e = document.fonts;
      e && (e.addEventListener?.("loadingdone", it), e.ready?.then(() => it()).catch(() => {
      }));
    } catch {
    }
  }
}
function nn(t, e = {}) {
  let n = {}, r = t.getPropertyValue("visibility");
  for (let o = 0; o < t.length; o++) {
    let s2 = t[o], u = t.getPropertyValue(s2);
    (s2 === "background-image" || s2 === "content") && u.includes("url(") && !u.includes("data:") && (u = "none"), n[s2] = u;
  }
  let a2 = ["text-decoration-line", "text-decoration-color", "text-decoration-style", "text-decoration-thickness", "text-underline-offset", "text-decoration-skip-ink"];
  for (let o of a2) if (!n[o]) try {
    let s2 = t.getPropertyValue(o);
    s2 && (n[o] = s2);
  } catch {
  }
  if (e.embedFonts) {
    let o = ["font-feature-settings", "font-variation-settings", "font-kerning", "font-variant", "font-variant-ligatures", "font-optical-sizing"];
    for (let s2 of o) if (!n[s2]) try {
      let u = t.getPropertyValue(s2);
      u && (n[s2] = u);
    } catch {
    }
  }
  return r === "hidden" && (n.opacity = "0"), n;
}
var te = /* @__PURE__ */ new WeakMap();
function rn(t) {
  let e = te.get(t);
  return e || (e = Object.entries(t).sort((r, a2) => r[0] < a2[0] ? -1 : r[0] > a2[0] ? 1 : 0).map(([r, a2]) => `${r}:${a2}`).join(";"), te.set(t, e), e);
}
function on(t, e = null, n = {}) {
  let r = Jt.get(t);
  if (r && r.epoch === vt) return r.snapshot;
  let a2 = e || getComputedStyle(t), o = nn(a2, n);
  return fn(t, a2, o), Jt.set(t, { epoch: vt, snapshot: o }), o;
}
function sn(t, e) {
  return t && t.session && t.persist ? t : t && (t.styleMap || t.styleCache || t.nodeMap) ? { session: t, persist: { snapshotKeyCache: Ct, defaultStyle: s.defaultStyle, baseStyle: s.baseStyle, image: s.image, resource: s.resource, background: s.background, font: s.font }, options: e || {} } : { session: s.session, persist: { snapshotKeyCache: Ct, defaultStyle: s.defaultStyle, baseStyle: s.baseStyle, image: s.image, resource: s.resource, background: s.background, font: s.font }, options: t || e || {} };
}
async function z$1(t, e, n, r) {
  if (t.tagName === "STYLE") return;
  let a2 = sn(n, r), o = a2.options && a2.options.cache || "auto";
  if (o !== "disabled" && en(document.documentElement), o === "disabled" && !a2.session.__bumpedForDisabled && (it(), Ct.clear(), a2.session.__bumpedForDisabled = true), C.has(t.tagName?.toLowerCase())) {
    let d2 = t.getAttribute?.("style");
    d2 && e.setAttribute("style", d2);
  }
  let { session: s2, persist: u } = a2;
  s2.styleCache.has(t) || s2.styleCache.set(t, getComputedStyle(t));
  let c2 = s2.styleCache.get(t), i = on(t, c2, a2.options), l2 = rn(i), f2 = u.snapshotKeyCache.get(l2);
  if (!f2) {
    let d2 = t.tagName?.toLowerCase() || "div";
    f2 = H$1(i, d2), u.snapshotKeyCache.set(l2, f2);
  }
  s2.styleMap.set(e, f2);
}
function an(t) {
  return t instanceof HTMLImageElement || t instanceof HTMLCanvasElement || t instanceof HTMLVideoElement || t instanceof HTMLIFrameElement || t instanceof SVGElement || t instanceof HTMLObjectElement || t instanceof HTMLEmbedElement;
}
function ln(t) {
  return t.backgroundImage && t.backgroundImage !== "none" || t.backgroundColor && t.backgroundColor !== "rgba(0, 0, 0, 0)" && t.backgroundColor !== "transparent" || (parseFloat(t.borderTopWidth) || 0) > 0 || (parseFloat(t.borderBottomWidth) || 0) > 0 || (parseFloat(t.paddingTop) || 0) > 0 || (parseFloat(t.paddingBottom) || 0) > 0 ? true : (t.overflowBlock || t.overflowY || "visible") !== "visible";
}
function cn(t) {
  let e = t.parentElement;
  if (!e) return false;
  let n = getComputedStyle(e).display || "";
  return n.includes("flex") || n.includes("grid");
}
function un(t, e) {
  if (t.textContent && /\S/.test(t.textContent)) return true;
  let n = t.firstElementChild, r = t.lastElementChild;
  if (n && n.tagName === "BR" || r && r.tagName === "BR") return true;
  let a2 = t.scrollHeight;
  if (a2 === 0) return false;
  let o = parseFloat(e.paddingTop) || 0, s2 = parseFloat(e.paddingBottom) || 0;
  return a2 > o + s2;
}
function fn(t, e, n) {
  if (t instanceof HTMLElement && t.style && t.style.height) return;
  let r = t.tagName && t.tagName.toLowerCase();
  if (!r || r !== "div" && r !== "section" && r !== "article" && r !== "main" && r !== "aside" && r !== "header" && r !== "footer" && r !== "nav" && r !== "ol" && r !== "ul" && r !== "li") return;
  let a2 = e.display || "";
  if (a2.includes("flex") || a2.includes("grid") || an(t)) return;
  let o = e.position;
  if (o === "absolute" || o === "fixed" || o === "sticky" || e.transform !== "none" || ln(e) || cn(t)) return;
  let s2 = e.overflowX || e.overflow || "visible", u = e.overflowY || e.overflow || "visible";
  if (s2 !== "visible" || u !== "visible") return;
  let c2 = e.clip;
  c2 && c2 !== "auto" && c2 !== "rect(auto, auto, auto, auto)" || e.visibility === "hidden" || e.opacity === "0" || un(t, e) && (delete n.height, delete n["block-size"]);
}
var ne = ["fill", "stroke", "color", "background-color", "stop-color"], ee = /* @__PURE__ */ new Map();
function dn(t, e) {
  let n = e + "::" + t.toLowerCase(), r = ee.get(n);
  if (r) return r;
  let a2 = document, o = e === "http://www.w3.org/2000/svg" ? a2.createElementNS(e, t) : a2.createElement(t), s2 = a2.createElement("div");
  s2.style.cssText = "position:absolute;left:-99999px;top:-99999px;contain:strict;display:block;", s2.appendChild(o), a2.documentElement.appendChild(s2);
  let u = getComputedStyle(o), c2 = {};
  for (let i of ne) c2[i] = u.getPropertyValue(i) || "";
  return s2.remove(), ee.set(n, c2), c2;
}
function re(t, e) {
  if (!(t instanceof Element) || !(e instanceof Element)) return;
  let n = t.getAttribute?.("style"), r = !!(n && n.includes("var("));
  if (!r && t.attributes?.length) {
    let o = t.attributes;
    for (let s2 = 0; s2 < o.length; s2++) {
      let u = o[s2];
      if (u && typeof u.value == "string" && u.value.includes("var(")) {
        r = true;
        break;
      }
    }
  }
  let a2 = null;
  if (r) try {
    a2 = getComputedStyle(t);
  } catch {
  }
  if (r) {
    let o = t.style;
    if (o && o.length) for (let s2 = 0; s2 < o.length; s2++) {
      let u = o[s2], c2 = o.getPropertyValue(u);
      if (!c2 || !c2.includes("var(")) continue;
      let i = a2 && a2.getPropertyValue(u);
      if (i) try {
        e.style.setProperty(u, i.trim(), o.getPropertyPriority(u));
      } catch {
      }
    }
  }
  if (r && t.attributes?.length) {
    let o = t.attributes;
    for (let s2 = 0; s2 < o.length; s2++) {
      let u = o[s2];
      if (!u || typeof u.value != "string" || !u.value.includes("var(")) continue;
      let c2 = u.name, i = a2 && a2.getPropertyValue(c2);
      if (i) try {
        e.style.setProperty(c2, i.trim());
      } catch {
      }
    }
  }
  if (!r) {
    if (!a2) try {
      a2 = getComputedStyle(t);
    } catch {
      a2 = null;
    }
    if (!a2) return;
    let o = t.namespaceURI || "html", s2 = dn(t.tagName, o);
    for (let u of ne) {
      let c2 = a2.getPropertyValue(u) || "", i = s2[u] || "";
      if (c2 && c2 !== i) try {
        e.style.setProperty(u, c2.trim());
      } catch {
      }
    }
  }
}
function mt(t, e, n) {
  return Promise.all(t.map((r) => new Promise((a2) => {
    function o() {
      d((s2) => {
        (s2 && typeof s2.timeRemaining == "function" ? s2.timeRemaining() > 0 : true) ? e(r, a2) : o();
      }, { fast: n });
    }
    o();
  })));
}
function hn(t) {
  return t = t.trim(), !t || /:not\(\s*\[data-sd-slotted\]\s*\)\s*$/.test(t) ? t : `${t}:not([data-sd-slotted])`;
}
function mn(t, e, n = true) {
  return t.split(",").map((r) => r.trim()).filter(Boolean).map((r) => {
    if (r.startsWith(":where(") || r.startsWith("@")) return r;
    let a2 = n ? hn(r) : r;
    return `:where(${e} ${a2})`;
  }).join(", ");
}
function se(t, e) {
  return t ? (t = t.replace(/:host\(([^)]+)\)/g, (n, r) => `:where(${e}:is(${r.trim()}))`), t = t.replace(/:host\b/g, `:where(${e})`), t = t.replace(/:host-context\(([^)]+)\)/g, (n, r) => `:where(:where(${r.trim()}) ${e})`), t = t.replace(/::slotted\(([^)]+)\)/g, (n, r) => `:where(${e} ${r.trim()})`), t = t.replace(/(^|})(\s*)([^@}{]+){/g, (n, r, a2, o) => {
    let s2 = mn(o, e, true);
    return `${r}${a2}${s2}{`;
  }), t) : "";
}
function ie(t) {
  return t.shadowScopeSeq = (t.shadowScopeSeq || 0) + 1, `s${t.shadowScopeSeq}`;
}
function ae(t) {
  let e = "";
  try {
    t.querySelectorAll("style").forEach((r) => {
      e += (r.textContent || "") + `
`;
    });
    let n = t.adoptedStyleSheets || [];
    for (let r of n) try {
      if (r && r.cssRules) for (let a2 of r.cssRules) e += a2.cssText + `
`;
    } catch {
    }
  } catch {
  }
  return e;
}
function le(t, e, n) {
  if (!e) return;
  let r = document.createElement("style");
  r.setAttribute("data-sd", n), r.textContent = e, t.insertBefore(r, t.firstChild || null);
}
function ce(t, e) {
  try {
    let n = t.currentSrc || t.src || "";
    if (!n) return;
    e.setAttribute("src", n), e.removeAttribute("srcset"), e.removeAttribute("sizes"), e.loading = "eager", e.decoding = "sync";
  } catch {
  }
}
function ue(t) {
  let e = /* @__PURE__ */ new Set();
  if (!t) return e;
  let n = /var\(\s*(--[A-Za-z0-9_-]+)\b/g, r;
  for (; r = n.exec(t); ) e.add(r[1]);
  return e;
}
function pn(t, e) {
  try {
    let r = getComputedStyle(t).getPropertyValue(e).trim();
    if (r) return r;
  } catch {
  }
  try {
    let r = getComputedStyle(document.documentElement).getPropertyValue(e).trim();
    if (r) return r;
  } catch {
  }
  return "";
}
function fe(t, e, n) {
  let r = [];
  for (let a2 of e) {
    let o = pn(t, a2);
    o && r.push(`${a2}: ${o};`);
  }
  return r.length ? `${n}{${r.join("")}}
` : "";
}
function de(t) {
  t && (t.nodeType === Node.ELEMENT_NODE && t.setAttribute("data-sd-slotted", ""), t.querySelectorAll && t.querySelectorAll("*").forEach((e) => e.setAttribute("data-sd-slotted", "")));
}
async function gn(t, e = 3) {
  let n = () => {
    try {
      return t.contentDocument || t.contentWindow?.document || null;
    } catch {
      return null;
    }
  }, r = n(), a2 = 0;
  for (; a2 < e && (!r || !r.body && !r.documentElement); ) await new Promise((o) => setTimeout(o, 0)), r = n(), a2++;
  return r && (r.body || r.documentElement) ? r : null;
}
function yn(t) {
  let e = t.getBoundingClientRect(), n = 0, r = 0, a2 = 0, o = 0;
  try {
    let c2 = getComputedStyle(t);
    n = parseFloat(c2.borderLeftWidth) || 0, r = parseFloat(c2.borderRightWidth) || 0, a2 = parseFloat(c2.borderTopWidth) || 0, o = parseFloat(c2.borderBottomWidth) || 0;
  } catch {
  }
  let s2 = Math.max(0, Math.round(e.width - (n + r))), u = Math.max(0, Math.round(e.height - (a2 + o)));
  return { contentWidth: s2, contentHeight: u, rect: e };
}
function bn(t, e, n) {
  let r = t.createElement("style");
  return r.setAttribute("data-sd-iframe-pin", ""), r.textContent = `html, body {margin: 0 !important;padding: 0 !important;width: ${e}px !important;height: ${n}px !important;min-width: ${e}px !important;min-height: ${n}px !important;box-sizing: border-box !important;overflow: hidden !important;background-clip: border-box !important;}`, (t.head || t.documentElement).appendChild(r), () => {
    try {
      r.remove();
    } catch {
    }
  };
}
async function he(t, e, n) {
  let r = await gn(t, 3);
  if (!r) throw new Error("iframe document not accessible/ready");
  let { contentWidth: a2, contentHeight: o, rect: s2 } = yn(t), u = n?.snap;
  if (!u || typeof u.toPng != "function") throw new Error("snapdom.toPng not available in iframe or window");
  let c2 = { ...n, scale: 1 }, i = bn(r, a2, o), l2;
  try {
    l2 = await u.toPng(r.documentElement, c2);
  } finally {
    i();
  }
  l2.style.display = "block", l2.style.width = `${a2}px`, l2.style.height = `${o}px`;
  let f2 = document.createElement("div");
  return e.nodeMap.set(f2, t), z$1(t, f2, e, n), f2.style.overflow = "hidden", f2.style.display = "block", f2.style.width || (f2.style.width = `${Math.round(s2.width)}px`), f2.style.height || (f2.style.height = `${Math.round(s2.height)}px`), f2.appendChild(l2), f2;
}
var at = /* @__PURE__ */ new Map();
async function lt(t) {
  if (s.resource?.has(t)) return s.resource.get(t);
  if (at.has(t)) return at.get(t);
  let e = (async () => {
    let n = await E$1(t, { as: "dataURL", silent: true });
    if (!n.ok || typeof n.data != "string") throw new Error(`[snapDOM] Failed to read blob URL: ${t}`);
    return s.resource?.set(t, n.data), n.data;
  })();
  at.set(t, e);
  try {
    let n = await e;
    return at.set(t, n), n;
  } catch (n) {
    throw at.delete(t), n;
  }
}
var xn = /\bblob:[^)"'\s]+/g;
async function oe(t) {
  if (!t || t.indexOf("blob:") === -1) return t;
  let e = Array.from(new Set(t.match(xn) || []));
  if (e.length === 0) return t;
  let n = t;
  for (let r of e) try {
    let a2 = await lt(r);
    n = n.split(r).join(a2);
  } catch {
  }
  return n;
}
function ht(t) {
  return typeof t == "string" && t.startsWith("blob:");
}
function wn(t) {
  return (t || "").split(",").map((e) => e.trim()).filter(Boolean).map((e) => {
    let n = e.match(/^(\S+)(\s+.+)?$/);
    return n ? { url: n[1], desc: n[2] || "" } : null;
  }).filter(Boolean);
}
function Sn(t) {
  return t.map((e) => e.desc ? `${e.url} ${e.desc.trim()}` : e.url).join(", ");
}
async function me(t) {
  if (!t) return;
  let e = t.querySelectorAll ? t.querySelectorAll("img") : [];
  for (let s2 of e) try {
    let c2 = s2.getAttribute("src") || s2.currentSrc || "";
    if (ht(c2)) {
      let l2 = await lt(c2);
      s2.setAttribute("src", l2);
    }
    let i = s2.getAttribute("srcset");
    if (i && i.includes("blob:")) {
      let l2 = wn(i), f2 = false;
      for (let d2 of l2) if (ht(d2.url)) try {
        d2.url = await lt(d2.url), f2 = true;
      } catch {
      }
      f2 && s2.setAttribute("srcset", Sn(l2));
    }
  } catch {
  }
  let n = t.querySelectorAll ? t.querySelectorAll("image") : [];
  for (let s2 of n) try {
    let u = "http://www.w3.org/1999/xlink", c2 = s2.getAttribute("href") || s2.getAttributeNS?.(u, "href");
    if (ht(c2)) {
      let i = await lt(c2);
      s2.setAttribute("href", i), s2.removeAttributeNS?.(u, "href");
    }
  } catch {
  }
  let r = t.querySelectorAll ? t.querySelectorAll("[style*='blob:']") : [];
  for (let s2 of r) try {
    let u = s2.getAttribute("style");
    if (u && u.includes("blob:")) {
      let c2 = await oe(u);
      s2.setAttribute("style", c2);
    }
  } catch {
  }
  let a2 = t.querySelectorAll ? t.querySelectorAll("style") : [];
  for (let s2 of a2) try {
    let u = s2.textContent || "";
    u.includes("blob:") && (s2.textContent = await oe(u));
  } catch {
  }
  let o = ["poster"];
  for (let s2 of o) {
    let u = t.querySelectorAll ? t.querySelectorAll(`[${s2}^='blob:']`) : [];
    for (let c2 of u) try {
      let i = c2.getAttribute(s2);
      ht(i) && c2.setAttribute(s2, await lt(i));
    } catch {
    }
  }
}
async function ct(t, e, n) {
  if (!t) throw new Error("Invalid node");
  let r = /* @__PURE__ */ new Set(), a2 = null, o = null;
  if (t.nodeType === Node.ELEMENT_NODE) {
    let i = (t.localName || t.tagName || "").toLowerCase();
    if (t.id === "snapdom-sandbox" || t.hasAttribute("data-snapdom-sandbox") || L.has(i)) return null;
  }
  if (t.nodeType === Node.TEXT_NODE || t.nodeType !== Node.ELEMENT_NODE) return t.cloneNode(true);
  if (t.getAttribute("data-capture") === "exclude") {
    if (n.excludeMode === "hide") {
      let i = document.createElement("div"), l2 = t.getBoundingClientRect();
      return i.style.cssText = `display:inline-block;width:${l2.width}px;height:${l2.height}px;visibility:hidden;`, i;
    } else if (n.excludeMode === "remove") return null;
  }
  if (n.exclude && Array.isArray(n.exclude)) for (let i of n.exclude) try {
    if (t.matches?.(i)) {
      if (n.excludeMode === "hide") {
        let l2 = document.createElement("div"), f2 = t.getBoundingClientRect();
        return l2.style.cssText = `display:inline-block;width:${f2.width}px;height:${f2.height}px;visibility:hidden;`, l2;
      } else if (n.excludeMode === "remove") return null;
    }
  } catch (l2) {
    console.warn(`Invalid selector in exclude option: ${i}`, l2);
  }
  if (typeof n.filter == "function") try {
    if (!n.filter(t)) {
      if (n.filterMode === "hide") {
        let i = document.createElement("div"), l2 = t.getBoundingClientRect();
        return i.style.cssText = `display:inline-block;width:${l2.width}px;height:${l2.height}px;visibility:hidden;`, i;
      } else if (n.filterMode === "remove") return null;
    }
  } catch (i) {
    console.warn("Error in filter function:", i);
  }
  if (t.tagName === "IFRAME") {
    let i = false;
    try {
      i = !!(t.contentDocument || t.contentWindow?.document);
    } catch {
      i = false;
    }
    if (i) try {
      return await he(t, e, n);
    } catch (l2) {
      console.warn("[SnapDOM] iframe rasterization failed, fallback:", l2);
    }
    if (n.placeholders) {
      let l2 = document.createElement("div");
      return l2.style.cssText = `width:${t.offsetWidth}px;height:${t.offsetHeight}px;background-image:repeating-linear-gradient(45deg,#ddd,#ddd 5px,#f9f9f9 5px,#f9f9f9 10px);display:flex;align-items:center;justify-content:center;font-size:12px;color:#555;border:1px solid #aaa;`, z$1(t, l2, e, n), l2;
    } else {
      let l2 = t.getBoundingClientRect(), f2 = document.createElement("div");
      return f2.style.cssText = `display:inline-block;width:${l2.width}px;height:${l2.height}px;visibility:hidden;`, z$1(t, f2, e, n), f2;
    }
  }
  if (t.getAttribute("data-capture") === "placeholder") {
    let i = t.cloneNode(false);
    e.nodeMap.set(i, t), z$1(t, i, e, n);
    let l2 = document.createElement("div");
    return l2.textContent = t.getAttribute("data-placeholder-text") || "", l2.style.cssText = "color:#666;font-size:12px;text-align:center;line-height:1.4;padding:0.5em;box-sizing:border-box;", i.appendChild(l2), i;
  }
  if (t.tagName === "CANVAS") {
    let i = "";
    try {
      let f2 = t.getContext("2d", { willReadFrequently: true });
      try {
        f2 && f2.getImageData(0, 0, 1, 1);
      } catch {
      }
      if (await new Promise((d2) => requestAnimationFrame(d2)), i = t.toDataURL("image/png"), !i || i === "data:,") {
        try {
          f2 && f2.getImageData(0, 0, 1, 1);
        } catch {
        }
        if (await new Promise((d2) => requestAnimationFrame(d2)), i = t.toDataURL("image/png"), !i || i === "data:,") {
          let d2 = document.createElement("canvas");
          d2.width = t.width, d2.height = t.height;
          let h = d2.getContext("2d");
          h && (h.drawImage(t, 0, 0), i = d2.toDataURL("image/png"));
        }
      }
    } catch {
    }
    let l2 = document.createElement("img");
    try {
      l2.decoding = "sync", l2.loading = "eager";
    } catch {
    }
    i && (l2.src = i), l2.width = t.width, l2.height = t.height;
    try {
      let f2 = getComputedStyle(t);
      f2.width && (l2.style.width = f2.width), f2.height && (l2.style.height = f2.height);
    } catch {
    }
    return e.nodeMap.set(l2, t), z$1(t, l2, e, n), l2;
  }
  let s2;
  try {
    if (s2 = t.cloneNode(false), re(t, s2), e.nodeMap.set(s2, t), t.tagName === "IMG") {
      ce(t, s2);
      try {
        let i = t.getBoundingClientRect(), l2 = Math.round(i.width || 0), f2 = Math.round(i.height || 0);
        if (!l2 || !f2) {
          let d2 = window.getComputedStyle(t), h = parseFloat(d2.width) || 0, m = parseFloat(d2.height) || 0, g2 = parseInt(t.getAttribute("width") || "", 10) || 0, w = parseInt(t.getAttribute("height") || "", 10) || 0, M2 = t.width || t.naturalWidth || 0, b2 = t.height || t.naturalHeight || 0;
          l2 = Math.round(l2 || h || g2 || M2 || 0), f2 = Math.round(f2 || m || w || b2 || 0);
        }
        l2 && (s2.dataset.snapdomWidth = String(l2)), f2 && (s2.dataset.snapdomHeight = String(f2));
      } catch {
      }
      try {
        let i = t.getAttribute("style") || "", l2 = window.getComputedStyle(t), f2 = (w) => {
          let M2 = i.match(new RegExp(`${w}\\s*:\\s*([^;]+)`, "i")), b2 = M2 ? M2[1].trim() : l2.getPropertyValue(w);
          return /%|auto/i.test(String(b2 || ""));
        }, d2 = parseInt(s2.dataset.snapdomWidth || "0", 10), h = parseInt(s2.dataset.snapdomHeight || "0", 10), m = f2("width") || !d2, g2 = f2("height") || !h;
        m && d2 && (s2.style.width = `${d2}px`), g2 && h && (s2.style.height = `${h}px`), d2 && (s2.style.minWidth = `${d2}px`), h && (s2.style.minHeight = `${h}px`);
      } catch {
      }
    }
  } catch (i) {
    throw console.error("[Snapdom] Failed to clone node:", t, i), i;
  }
  if (t instanceof HTMLTextAreaElement) {
    let i = t.getBoundingClientRect();
    s2.style.width = `${i.width}px`, s2.style.height = `${i.height}px`;
  }
  if (t instanceof HTMLInputElement && (s2.value = t.value, s2.setAttribute("value", t.value), t.checked !== void 0 && (s2.checked = t.checked, t.checked && s2.setAttribute("checked", ""), t.indeterminate && (s2.indeterminate = t.indeterminate))), t instanceof HTMLSelectElement && (a2 = t.value), t instanceof HTMLTextAreaElement && (o = t.value), z$1(t, s2, e, n), t.shadowRoot) {
    let w = function(b2, x2) {
      if (b2.nodeType === Node.ELEMENT_NODE && b2.tagName === "STYLE") return x2(null);
      ct(b2, e, n).then((p2) => {
        x2(p2 || null);
      }).catch(() => {
        x2(null);
      });
    };
    try {
      let b2 = t.shadowRoot.querySelectorAll("slot");
      for (let x2 of b2) {
        let p2 = [];
        try {
          p2 = x2.assignedNodes?.({ flatten: true }) || x2.assignedNodes?.() || [];
        } catch {
          p2 = x2.assignedNodes?.() || [];
        }
        for (let C2 of p2) r.add(C2);
      }
    } catch {
    }
    let i = ie(e), l2 = `[data-sd="${i}"]`;
    try {
      s2.setAttribute("data-sd", i);
    } catch {
    }
    let f2 = ae(t.shadowRoot), d2 = se(f2, l2), h = ue(f2), m = fe(t, h, l2);
    le(s2, m + d2, i);
    let g2 = document.createDocumentFragment(), M2 = await mt(Array.from(t.shadowRoot.childNodes), w, n.fast);
    g2.append(...M2.filter((b2) => !!b2)), s2.appendChild(g2);
  }
  if (t.tagName === "SLOT") {
    let d2 = function(m, g2) {
      ct(m, e, n).then((w) => {
        w && de(w), g2(w || null);
      }).catch(() => {
        g2(null);
      });
    }, i = t.assignedNodes?.({ flatten: true }) || [], l2 = i.length > 0 ? i : Array.from(t.childNodes), f2 = document.createDocumentFragment(), h = await mt(Array.from(l2), d2, n.fast);
    return f2.append(...h.filter((m) => !!m)), f2;
  }
  function u(i, l2) {
    if (r.has(i)) return l2(null);
    ct(i, e, n).then((f2) => {
      l2(f2 || null);
    }).catch(() => {
      l2(null);
    });
  }
  let c2 = await mt(Array.from(t.childNodes), u, n.fast);
  if (s2.append(...c2.filter((i) => !!i)), a2 !== null && s2 instanceof HTMLSelectElement) {
    s2.value = a2;
    for (let i of s2.options) i.value === a2 ? i.setAttribute("selected", "") : i.removeAttribute("selected");
  }
  return o !== null && s2 instanceof HTMLTextAreaElement && (s2.textContent = o), s2;
}
function be(t) {
  return /\bcounter\s*\(|\bcounters\s*\(/.test(t || "");
}
function Cn(t) {
  return (t || "").replace(/"([^"]*)"/g, "$1");
}
function pe(t, e = false) {
  let n = "", r = Math.max(1, t);
  for (; r > 0; ) r--, n = String.fromCharCode(97 + r % 26) + n, r = Math.floor(r / 26);
  return e ? n.toUpperCase() : n;
}
function ge(t, e = true) {
  let n = [[1e3, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]], r = Math.max(1, Math.min(3999, t)), a2 = "";
  for (let [o, s2] of n) for (; r >= o; ) a2 += s2, r -= o;
  return e ? a2 : a2.toLowerCase();
}
function ye(t, e) {
  switch ((e || "decimal").toLowerCase()) {
    case "decimal":
      return String(Math.max(0, t));
    case "decimal-leading-zero":
      return (t < 10 ? "0" : "") + String(Math.max(0, t));
    case "lower-alpha":
      return pe(t, false);
    case "upper-alpha":
      return pe(t, true);
    case "lower-roman":
      return ge(t, false);
    case "upper-roman":
      return ge(t, true);
    default:
      return String(Math.max(0, t));
  }
}
function xe(t) {
  let e = () => s?.session?.__counterEpoch ?? 0, n = e(), r = /* @__PURE__ */ new WeakMap(), a2 = t instanceof Document ? t.documentElement : t, o = (d2) => d2 && d2.tagName === "LI", s$1 = (d2) => {
    let h = 0, m = d2?.parentElement;
    if (!m) return 0;
    for (let g2 of m.children) {
      if (g2 === d2) break;
      g2.tagName === "LI" && h++;
    }
    return h;
  }, u = (d2) => {
    let h = /* @__PURE__ */ new Map();
    for (let [m, g2] of d2) h.set(m, g2.slice());
    return h;
  }, c2 = (d2, h, m) => {
    let g2 = u(d2), w;
    try {
      w = m.style?.counterReset || getComputedStyle(m).counterReset;
    } catch {
    }
    if (w && w !== "none") for (let b2 of w.split(",")) {
      let x2 = b2.trim().split(/\s+/), p2 = x2[0], C2 = Number.isFinite(Number(x2[1])) ? Number(x2[1]) : 0;
      if (!p2) continue;
      let y2 = h.get(p2);
      if (y2 && y2.length) {
        let v2 = y2.slice();
        v2.push(C2), g2.set(p2, v2);
      } else g2.set(p2, [C2]);
    }
    let M2;
    try {
      M2 = m.style?.counterIncrement || getComputedStyle(m).counterIncrement;
    } catch {
    }
    if (M2 && M2 !== "none") for (let b2 of M2.split(",")) {
      let x2 = b2.trim().split(/\s+/), p2 = x2[0], C2 = Number.isFinite(Number(x2[1])) ? Number(x2[1]) : 1;
      if (!p2) continue;
      let y2 = g2.get(p2) || [];
      y2.length === 0 && y2.push(0), y2[y2.length - 1] += C2, g2.set(p2, y2);
    }
    try {
      if (getComputedStyle(m).display === "list-item" && o(m)) {
        let x2 = m.parentElement, p2 = 1;
        if (x2 && x2.tagName === "OL") {
          let y2 = x2.getAttribute("start"), v2 = Number.isFinite(Number(y2)) ? Number(y2) : 1, E2 = s$1(m), F2 = m.getAttribute("value");
          p2 = Number.isFinite(Number(F2)) ? Number(F2) : v2 + E2;
        } else p2 = 1 + s$1(m);
        let C2 = g2.get("list-item") || [];
        C2.length === 0 && C2.push(0), C2[C2.length - 1] = p2, g2.set("list-item", C2);
      }
    } catch {
    }
    return g2;
  }, i = (d2, h, m) => {
    let g2 = c2(m, h, d2);
    r.set(d2, g2);
    let w = g2;
    for (let M2 of d2.children) w = i(M2, g2, w);
    return g2;
  }, l2 = /* @__PURE__ */ new Map();
  i(a2, l2, l2);
  function f2() {
    let d2 = e();
    if (d2 !== n) {
      n = d2;
      let h = /* @__PURE__ */ new Map();
      i(a2, h, h);
    }
  }
  return { get(d2, h) {
    f2();
    let m = r.get(d2)?.get(h);
    return m && m.length ? m[m.length - 1] : 0;
  }, getStack(d2, h) {
    f2();
    let m = r.get(d2)?.get(h);
    return m ? m.slice() : [];
  } };
}
function we(t, e, n) {
  if (!t || t === "none") return t;
  try {
    let r = /\b(counter|counters)\s*\(([^)]+)\)/g, a2 = t.replace(r, (o, s2, u) => {
      let c2 = String(u).split(",").map((i) => i.trim());
      if (s2 === "counter") {
        let i = c2[0]?.replace(/^["']|["']$/g, ""), l2 = (c2[1] || "decimal").toLowerCase(), f2 = n.get(e, i);
        return ye(f2, l2);
      } else {
        let i = c2[0]?.replace(/^["']|["']$/g, ""), l2 = c2[1]?.replace(/^["']|["']$/g, "") ?? "", f2 = (c2[2] || "decimal").toLowerCase(), d2 = n.getStack(e, i);
        return d2.length ? d2.map((m) => ye(m, f2)).join(l2) : "";
      }
    });
    return Cn(a2);
  } catch {
    return "- ";
  }
}
var tt = /* @__PURE__ */ new WeakMap(), Se = 300;
function vn(t, e) {
  let n = ke(t);
  return e ? (e.__pseudoPreflightFp !== n && (e.__pseudoPreflight = ve(t), e.__pseudoPreflightFp = n), !!e.__pseudoPreflight) : ve(t);
}
function Mt(t) {
  try {
    return t && t.cssRules ? t.cssRules : null;
  } catch {
    return null;
  }
}
function ke(t) {
  let e = t.querySelectorAll('style,link[rel~="stylesheet"]'), n = `n:${e.length}|`, r = 0;
  for (let o = 0; o < e.length; o++) {
    let s2 = e[o];
    if (s2.tagName === "STYLE") {
      let u = s2.textContent ? s2.textContent.length : 0;
      n += `S${u}|`;
      let c2 = s2.sheet, i = c2 ? Mt(c2) : null;
      i && (r += i.length);
    } else {
      let u = s2.getAttribute("href") || "", c2 = s2.getAttribute("media") || "all";
      n += `L${u}|m:${c2}|`;
      let i = s2.sheet, l2 = i ? Mt(i) : null;
      l2 && (r += l2.length);
    }
  }
  let a2 = t.adoptedStyleSheets;
  return n += `ass:${Array.isArray(a2) ? a2.length : 0}|tr:${r}`, n;
}
function Ce(t, e, n) {
  let r = Mt(t);
  if (!r) return false;
  for (let a2 = 0; a2 < r.length; a2++) {
    if (n.budget <= 0) return false;
    let o = r[a2], s2 = o && o.cssText ? o.cssText : "";
    n.budget--;
    for (let u of e) if (s2.includes(u)) return true;
    if (o && o.cssRules && o.cssRules.length) for (let u = 0; u < o.cssRules.length && n.budget > 0; u++) {
      let c2 = o.cssRules[u], i = c2 && c2.cssText ? c2.cssText : "";
      n.budget--;
      for (let l2 of e) if (i.includes(l2)) return true;
    }
    if (n.budget <= 0) return false;
  }
  return false;
}
function ve(t = document) {
  let e = ke(t), n = tt.get(t);
  if (n && n.fingerprint === e) return n.result;
  let r = ["::before", "::after", "::first-letter", ":before", ":after", ":first-letter", "counter(", "counters(", "counter-increment", "counter-reset"], a2 = t.querySelectorAll("style");
  for (let s2 = 0; s2 < a2.length; s2++) {
    let u = a2[s2].textContent || "";
    for (let c2 of r) if (u.includes(c2)) return tt.set(t, { fingerprint: e, result: true }), true;
  }
  let o = t.adoptedStyleSheets;
  if (Array.isArray(o) && o.length) {
    let s2 = { budget: Se };
    try {
      for (let u of o) if (Ce(u, r, s2)) return tt.set(t, { fingerprint: e, result: true }), true;
    } catch {
    }
  }
  {
    let s2 = t.querySelectorAll('style,link[rel~="stylesheet"]'), u = { budget: Se };
    for (let c2 = 0; c2 < s2.length && u.budget > 0; c2++) {
      let i = s2[c2], l2 = null;
      if (i.tagName, l2 = i.sheet || null, l2 && Ce(l2, r, u)) return tt.set(t, { fingerprint: e, result: true }), true;
    }
  }
  return t.querySelector('[style*="counter("], [style*="counters("]') ? (tt.set(t, { fingerprint: e, result: true }), true) : (tt.set(t, { fingerprint: e, result: false }), false);
}
var et = /* @__PURE__ */ new WeakMap(), Me = -1;
function Mn(t) {
  return (t || "").replace(/"([^"]*)"/g, "$1");
}
function kn(t) {
  if (!t) return "";
  let e = [], n = /"([^"]*)"/g, r;
  for (; r = n.exec(t); ) e.push(r[1]);
  return e.length ? e.join("") : Mn(t);
}
function kt(t, e) {
  let n = t.parentElement, r = n ? et.get(n) : null;
  return r ? { get(a2, o) {
    let s2 = e.get(a2, o), u = r.get(o);
    return typeof u == "number" ? Math.max(s2, u) : s2;
  }, getStack(a2, o) {
    let s2 = e.getStack(a2, o);
    if (!s2.length) return s2;
    let u = r.get(o);
    if (typeof u == "number") {
      let c2 = s2.slice();
      return c2[c2.length - 1] = Math.max(c2[c2.length - 1], u), c2;
    }
    return s2;
  } } : e;
}
function At(t, e, n) {
  let r = /* @__PURE__ */ new Map();
  function a2(c2) {
    let i = [];
    if (!c2 || c2 === "none") return i;
    for (let l2 of String(c2).split(",")) {
      let f2 = l2.trim().split(/\s+/), d2 = f2[0], h = Number.isFinite(Number(f2[1])) ? Number(f2[1]) : void 0;
      d2 && i.push({ name: d2, num: h });
    }
    return i;
  }
  let o = a2(e?.counterReset), s2 = a2(e?.counterIncrement);
  function u(c2) {
    if (r.has(c2)) return r.get(c2).slice();
    let i = n.getStack(t, c2);
    i = i.length ? i.slice() : [];
    let l2 = o.find((d2) => d2.name === c2);
    if (l2) {
      let d2 = Number.isFinite(l2.num) ? l2.num : 0;
      i = i.length ? [...i, d2] : [d2];
    }
    let f2 = s2.find((d2) => d2.name === c2);
    if (f2) {
      let d2 = Number.isFinite(f2.num) ? f2.num : 1;
      i.length === 0 && (i = [0]), i[i.length - 1] += d2;
    }
    return r.set(c2, i.slice()), i;
  }
  return { get(c2, i) {
    let l2 = u(i);
    return l2.length ? l2[l2.length - 1] : 0;
  }, getStack(c2, i) {
    return u(i);
  }, __incs: s2 };
}
function An(t, e, n) {
  let r;
  try {
    r = getComputedStyle(t, e);
  } catch {
  }
  let a2 = r?.content;
  if (!a2 || a2 === "none" || a2 === "normal") return { text: "", incs: [] };
  let o = kt(t, n), s2 = At(t, r, o), u = be(a2) ? we(a2, t, s2) : a2;
  return { text: kn(u), incs: s2.__incs || [] };
}
async function Et(t, e, n, r) {
  if (!(t instanceof Element) || !(e instanceof Element)) return;
  let a2 = t.ownerDocument || document;
  if (!vn(a2, n)) return;
  let o = s?.session?.__counterEpoch ?? 0;
  if (Me !== o && (et = /* @__PURE__ */ new WeakMap(), n && (n.__counterCtx = null), Me = o), !n.__counterCtx) try {
    n.__counterCtx = xe(t.ownerDocument || document);
  } catch {
  }
  let s$1 = n.__counterCtx;
  for (let i of ["::before", "::after", "::first-letter"]) try {
    let l2 = Y$1(t, i);
    if (!l2 || l2.content === "none" && l2.backgroundImage === "none" && l2.backgroundColor === "transparent" && (l2.borderStyle === "none" || parseFloat(l2.borderWidth) === 0) && (!l2.transform || l2.transform === "none") && l2.display === "inline") continue;
    if (i === "::first-letter") {
      let N2 = getComputedStyle(t);
      if (!(l2.color !== N2.color || l2.fontSize !== N2.fontSize || l2.fontWeight !== N2.fontWeight)) continue;
      let I2 = Array.from(e.childNodes).find((yt2) => yt2.nodeType === Node.TEXT_NODE && yt2.textContent?.trim().length > 0);
      if (!I2) continue;
      let L2 = I2.textContent, K2 = L2.match(/^([^\p{L}\p{N}\s]*[\p{L}\p{N}](?:['’])?)/u)?.[0], pt2 = L2.slice(K2?.length || 0);
      if (!K2 || /[\uD800-\uDFFF]/.test(K2)) continue;
      let G2 = document.createElement("span");
      G2.textContent = K2, G2.dataset.snapdomPseudo = "::first-letter";
      let gt2 = Z$1(l2), ut2 = H$1(gt2, "span");
      n.styleMap.set(G2, ut2);
      let ft2 = document.createTextNode(pt2);
      e.replaceChild(ft2, I2), e.insertBefore(G2, ft2);
      continue;
    }
    let d2 = l2.content ?? "", h = d2 === "" || d2 === "none" || d2 === "normal", { text: m, incs: g2 } = An(t, i, s$1), w = l2.backgroundImage, M2 = l2.backgroundColor, b2 = l2.fontFamily, x2 = parseInt(l2.fontSize) || 32, p2 = parseInt(l2.fontWeight) || false, C2 = l2.color || "#000", y2 = l2.borderStyle, v2 = parseFloat(l2.borderWidth), E2 = l2.transform, F2 = R(b2), $ = !h && m !== "", P2 = w && w !== "none", W2 = M2 && M2 !== "transparent" && M2 !== "rgba(0, 0, 0, 0)", B2 = y2 && y2 !== "none" && v2 > 0, nt2 = E2 && E2 !== "none";
    if (!($ || P2 || W2 || B2 || nt2)) {
      if (g2 && g2.length && t.parentElement) {
        let N2 = et.get(t.parentElement) || /* @__PURE__ */ new Map();
        for (let { name: T2 } of g2) {
          if (!T2) continue;
          let I2 = kt(t, s$1), Y2 = At(t, getComputedStyle(t, i), I2).get(t, T2);
          N2.set(T2, Y2);
        }
        et.set(t.parentElement, N2);
      }
      continue;
    }
    let k2 = document.createElement("span");
    k2.dataset.snapdomPseudo = i, k2.style.pointerEvents = "none";
    let q2 = Z$1(l2), V2 = H$1(q2, "span");
    if (n.styleMap.set(k2, V2), F2 && m && m.length === 1) {
      let { dataUrl: N2, width: T2, height: I2 } = await Rt(m, b2, p2, x2, C2), L2 = document.createElement("img");
      L2.src = N2, L2.style = `height:${x2}px;width:${T2 / I2 * x2}px;object-fit:contain;`, k2.appendChild(L2), e.dataset.snapdomHasIcon = "true";
    } else if (m && m.startsWith("url(")) {
      let N2 = A$2(m);
      if (N2?.trim()) try {
        let T2 = document.createElement("img"), I2 = await E$1(g$1(N2), { as: "dataURL", useProxy: r.useProxy });
        T2.src = I2.data, T2.style = `width:${x2}px;height:auto;object-fit:contain;`, k2.appendChild(T2);
      } catch (T2) {
        console.error(`[snapdom] Error in pseudo ${i} for`, t, T2);
      }
    } else !F2 && $ && (k2.textContent = m);
    k2.style.backgroundImage = "none", "maskImage" in k2.style && (k2.style.maskImage = "none"), "webkitMaskImage" in k2.style && (k2.style.webkitMaskImage = "none");
    try {
      k2.style.backgroundRepeat = l2.backgroundRepeat, k2.style.backgroundSize = l2.backgroundSize, l2.backgroundPositionX && l2.backgroundPositionY ? (k2.style.backgroundPositionX = l2.backgroundPositionX, k2.style.backgroundPositionY = l2.backgroundPositionY) : k2.style.backgroundPosition = l2.backgroundPosition, k2.style.backgroundOrigin = l2.backgroundOrigin, k2.style.backgroundClip = l2.backgroundClip, k2.style.backgroundAttachment = l2.backgroundAttachment, k2.style.backgroundBlendMode = l2.backgroundBlendMode;
    } catch {
    }
    if (P2) try {
      let N2 = tt$2(w), T2 = await Promise.all(N2.map(G$1));
      k2.style.backgroundImage = T2.join(", ");
    } catch (N2) {
      console.warn(`[snapdom] Failed to inline background-image for ${i}`, N2);
    }
    W2 && (k2.style.backgroundColor = M2);
    let j2 = k2.childNodes.length > 0 || k2.textContent?.trim() !== "" || P2 || W2 || B2 || nt2;
    if (g2 && g2.length && t.parentElement) {
      let N2 = et.get(t.parentElement) || /* @__PURE__ */ new Map(), T2 = kt(t, s$1), I2 = At(t, getComputedStyle(t, i), T2);
      for (let { name: L2 } of g2) {
        if (!L2) continue;
        let Y2 = I2.get(t, L2);
        N2.set(L2, Y2);
      }
      et.set(t.parentElement, N2);
    }
    if (!j2) continue;
    i === "::before" ? e.insertBefore(k2, e.firstChild) : e.appendChild(k2);
  } catch (l2) {
    console.warn(`[snapdom] Failed to capture ${i} for`, t, l2);
  }
  let u = Array.from(t.children), c2 = Array.from(e.children).filter((i) => !i.dataset.snapdomPseudo);
  for (let i = 0; i < Math.min(u.length, c2.length); i++) await Et(u[i], c2[i], n, r);
}
function Ae(t, e) {
  if (!t || !(t instanceof Element)) return;
  let n = t.ownerDocument || document, r = n, a2 = t instanceof SVGSVGElement ? [t] : Array.from(t.querySelectorAll("svg"));
  if (a2.length === 0) return;
  let o = /url\(\s*#([^)]+)\)/g, s2 = ["fill", "stroke", "filter", "clip-path", "mask", "marker", "marker-start", "marker-mid", "marker-end"], u = (p2) => window.CSS && CSS.escape ? CSS.escape(p2) : p2.replace(/[^a-zA-Z0-9_-]/g, "\\$&"), c2 = "http://www.w3.org/1999/xlink", i = (p2) => {
    if (!p2 || !p2.getAttribute) return null;
    let C2 = p2.getAttribute("href") || p2.getAttribute("xlink:href") || (typeof p2.getAttributeNS == "function" ? p2.getAttributeNS(c2, "href") : null);
    if (C2) return C2;
    let y2 = p2.attributes;
    if (!y2) return null;
    for (let v2 = 0; v2 < y2.length; v2++) {
      let E2 = y2[v2];
      if (!E2 || !E2.name) continue;
      if (E2.name === "href") return E2.value;
      let F2 = E2.name.indexOf(":");
      if (F2 !== -1 && E2.name.slice(F2 + 1) === "href") return E2.value;
    }
    return null;
  }, l2 = new Set(Array.from(t.querySelectorAll("[id]")).map((p2) => p2.id)), f2 = /* @__PURE__ */ new Set(), d2 = false, h = (p2, C2 = null) => {
    if (!p2) return;
    o.lastIndex = 0;
    let y2;
    for (; y2 = o.exec(p2); ) {
      d2 = true;
      let v2 = (y2[1] || "").trim();
      v2 && (l2.has(v2) || (f2.add(v2), C2 && !C2.has(v2) && C2.add(v2)));
    }
  }, m = (p2) => {
    let C2 = p2.querySelectorAll("use");
    for (let E2 of C2) {
      let F2 = i(E2);
      if (!F2 || !F2.startsWith("#")) continue;
      d2 = true;
      let $ = F2.slice(1).trim();
      $ && !l2.has($) && f2.add($);
    }
    let v2 = p2.querySelectorAll('*[style*="url("],*[fill^="url("], *[stroke^="url("],*[filter^="url("],*[clip-path^="url("],*[mask^="url("],*[marker^="url("],*[marker-start^="url("],*[marker-mid^="url("],*[marker-end^="url("]');
    for (let E2 of v2) {
      h(E2.getAttribute("style") || "");
      for (let F2 of s2) h(E2.getAttribute(F2));
    }
  };
  for (let p2 of a2) m(p2);
  if (!d2) return;
  let g2 = t.querySelector("svg.inline-defs-container");
  g2 || (g2 = n.createElementNS("http://www.w3.org/2000/svg", "svg"), g2.classList.add("inline-defs-container"), g2.setAttribute("aria-hidden", "true"), g2.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden"), t.insertBefore(g2, t.firstChild || null));
  let w = g2.querySelector("defs") || null, M2 = (p2) => {
    if (!p2 || l2.has(p2)) return null;
    let C2 = u(p2), y2 = (v2) => {
      let E2 = r.querySelector(v2);
      return E2 && !t.contains(E2) ? E2 : null;
    };
    return y2(`svg defs > *#${C2}`) || y2(`svg > symbol#${C2}`) || y2(`*#${C2}`);
  };
  if (!f2.size) return;
  let b2 = new Set(f2), x2 = /* @__PURE__ */ new Set();
  for (; b2.size; ) {
    let p2 = b2.values().next().value;
    if (b2.delete(p2), !p2 || l2.has(p2) || x2.has(p2)) continue;
    let C2 = M2(p2);
    if (!C2) {
      x2.add(p2);
      continue;
    }
    w || (w = n.createElementNS("http://www.w3.org/2000/svg", "defs"), g2.appendChild(w));
    let y2 = C2.cloneNode(true);
    y2.id || y2.setAttribute("id", p2), w.appendChild(y2), x2.add(p2), l2.add(p2);
    let v2 = [y2, ...y2.querySelectorAll("*")];
    for (let E2 of v2) {
      let F2 = i(E2);
      if (F2 && F2.startsWith("#")) {
        let P2 = F2.slice(1).trim();
        P2 && !l2.has(P2) && !x2.has(P2) && b2.add(P2);
      }
      let $ = E2.getAttribute?.("style") || "";
      $ && h($, b2);
      for (let P2 of s2) {
        let W2 = E2.getAttribute?.(P2);
        W2 && h(W2, b2);
      }
    }
  }
}
function Ne(t, e) {
  if (!t || !e) return;
  let n = t.scrollTop || 0;
  if (!n) return;
  getComputedStyle(e).position === "static" && (e.style.position = "relative");
  let r = t.getBoundingClientRect(), a2 = t.clientHeight, o = "data-snap-ph", s2 = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT);
  for (; s2.nextNode(); ) {
    let u = s2.currentNode, c2 = getComputedStyle(u), i = c2.position;
    if (i !== "sticky" && i !== "-webkit-sticky") continue;
    let l2 = Ee(c2.top), f2 = Ee(c2.bottom);
    if (l2 == null && f2 == null) continue;
    let d2 = En(u, t), h = Nn(e, d2, o);
    if (!h) continue;
    let m = u.getBoundingClientRect(), g2 = m.width, w = m.height, M2 = m.left - r.left;
    if (!(g2 > 0 && w > 0) || !Number.isFinite(M2)) continue;
    let b2 = l2 != null ? l2 + n : n + (a2 - w - f2);
    if (!Number.isFinite(b2)) continue;
    let x2 = Number.parseInt(c2.zIndex, 10), p2 = Number.isFinite(x2), C2 = p2 ? Math.max(x2, 1) + 1 : 2, y2 = p2 ? x2 - 1 : 0, v2 = h.cloneNode(false);
    v2.setAttribute(o, "1"), v2.style.position = "sticky", v2.style.left = `${M2}px`, v2.style.top = `${b2}px`, v2.style.width = `${g2}px`, v2.style.height = `${w}px`, v2.style.visibility = "hidden", v2.style.zIndex = String(y2), v2.style.overflow = "hidden", v2.style.background = "transparent", v2.style.boxShadow = "none", v2.style.filter = "none", h.parentElement?.insertBefore(v2, h), h.style.position = "absolute", h.style.left = `${M2}px`, h.style.top = `${b2}px`, h.style.bottom = "auto", h.style.zIndex = String(C2), h.style.pointerEvents = "none";
  }
}
function Ee(t) {
  if (!t || t === "auto") return null;
  let e = Number.parseFloat(t);
  return Number.isFinite(e) ? e : null;
}
function En(t, e) {
  let n = [];
  for (let r = t; r && r !== e; ) {
    let a2 = r.parentElement;
    if (!a2) break;
    n.push(Array.prototype.indexOf.call(a2.children, r)), r = a2;
  }
  return n.reverse();
}
function Nn(t, e, n) {
  let r = t;
  for (let a2 = 0; a2 < e.length; a2++) if (r = Fn(r, n)[e[a2]], !r) return null;
  return r instanceof HTMLElement ? r : null;
}
function Fn(t, e) {
  let n = [], r = t.children;
  for (let a2 = 0; a2 < r.length; a2++) {
    let o = r[a2];
    o.hasAttribute(e) || n.push(o);
  }
  return n;
}
function Fe(t) {
  let e = getComputedStyle(t), n = e.outlineStyle, r = e.outlineWidth, a2 = e.borderStyle, o = e.borderWidth, s2 = n !== "none" && parseFloat(r) > 0, u = a2 === "none" || parseFloat(o) === 0;
  s2 && u && (t.style.border = `${r} solid transparent`);
}
async function Te(t, e = {}) {
  let n = { styleMap: s.session.styleMap, styleCache: s.session.styleCache, nodeMap: s.session.nodeMap }, r, a2 = "", o = "";
  Fe(t);
  try {
    Ae(t);
  } catch (c2) {
    console.warn("inlineExternal defs or symbol failed:", c2);
  }
  try {
    r = await ct(t, n, e, t);
  } catch (c2) {
    throw console.warn("deepClone failed:", c2), c2;
  }
  try {
    await Et(t, r, n, e);
  } catch (c2) {
    console.warn("inlinePseudoElements failed:", c2);
  }
  await me(r);
  try {
    let c2 = r.querySelectorAll("style[data-sd]");
    for (let i of c2) o += i.textContent || "", i.remove();
  } catch {
  }
  let s$1 = z$2(n.styleMap);
  a2 = Array.from(s$1.entries()).map(([c2, i]) => `.${i}{${c2}}`).join(""), a2 = o + a2;
  for (let [c2, i] of n.styleMap.entries()) {
    if (c2.tagName === "STYLE") continue;
    if (c2.getRootNode && c2.getRootNode() instanceof ShadowRoot) {
      c2.setAttribute("style", i.replace(/;/g, "; "));
      continue;
    }
    let l2 = s$1.get(i);
    l2 && c2.classList.add(l2);
    let f2 = c2.style?.backgroundImage, d2 = c2.dataset?.snapdomHasIcon;
    f2 && f2 !== "none" && (c2.style.backgroundImage = f2), d2 && (c2.style.verticalAlign = "middle", c2.style.display = "inline");
  }
  for (let [c2, i] of n.nodeMap.entries()) {
    let l2 = i.scrollLeft, f2 = i.scrollTop;
    if ((l2 || f2) && c2 instanceof HTMLElement) {
      c2.style.overflow = "hidden", c2.style.scrollbarWidth = "none", c2.style.msOverflowStyle = "none";
      let h = document.createElement("div");
      for (h.style.transform = `translate(${-l2}px, ${-f2}px)`, h.style.willChange = "transform", h.style.display = "inline-block", h.style.width = "100%"; c2.firstChild; ) h.appendChild(c2.firstChild);
      c2.appendChild(h);
    }
  }
  let u = r instanceof HTMLElement && r.firstElementChild instanceof HTMLElement ? r.firstElementChild : r;
  if (Ne(t, u), t === n.nodeMap.get(r)) {
    let c2 = n.styleCache.get(t) || window.getComputedStyle(t);
    n.styleCache.set(t, c2);
    let i = B$1(c2.transform);
    r.style.margin = "0", r.style.top = "auto", r.style.left = "auto", r.style.right = "auto", r.style.bottom = "auto", r.style.animation = "none", r.style.transition = "none", r.style.willChange = "auto", r.style.float = "none", r.style.clear = "none", r.style.transform = i || "";
  }
  for (let [c2, i] of n.nodeMap.entries()) i.tagName === "PRE" && (c2.style.marginTop = "0", c2.style.marginBlockStart = "0");
  return { clone: r, classCSS: a2, styleCache: n.styleCache };
}
function Tn(t) {
  let e = parseInt(t.dataset?.snapdomWidth || "", 10) || 0, n = parseInt(t.dataset?.snapdomHeight || "", 10) || 0, r = parseInt(t.getAttribute("width") || "", 10) || 0, a2 = parseInt(t.getAttribute("height") || "", 10) || 0, o = parseFloat(t.style?.width || "") || 0, s2 = parseFloat(t.style?.height || "") || 0, u = e || o || r || t.width || t.naturalWidth || 100, c2 = n || s2 || a2 || t.height || t.naturalHeight || 100;
  return { width: u, height: c2 };
}
async function Pe(t, e = {}) {
  let n = Array.from(t.querySelectorAll("img")), r = async (a2) => {
    if (!a2.getAttribute("src")) {
      let l2 = a2.currentSrc || a2.src || "";
      l2 && a2.setAttribute("src", l2);
    }
    a2.removeAttribute("srcset"), a2.removeAttribute("sizes");
    let o = a2.src || "";
    if (!o) return;
    let s2 = await E$1(o, { as: "dataURL", useProxy: e.useProxy });
    if (s2.ok && typeof s2.data == "string" && s2.data.startsWith("data:")) {
      a2.src = s2.data, a2.width || (a2.width = a2.naturalWidth || 100), a2.height || (a2.height = a2.naturalHeight || 100);
      return;
    }
    let { width: u, height: c2 } = Tn(a2), { fallbackURL: i } = e || {};
    if (i) try {
      let l2 = typeof i == "function" ? await i({ width: u, height: c2, src: o, element: a2 }) : i;
      if (l2) {
        let f2 = await E$1(l2, { as: "dataURL", useProxy: e.useProxy });
        a2.src = f2.data, a2.width || (a2.width = u), a2.height || (a2.height = c2);
        return;
      }
    } catch {
    }
    if (e.placeholders !== false) {
      let l2 = document.createElement("div");
      l2.style.cssText = [`width:${u}px`, `height:${c2}px`, "background:#ccc", "display:inline-block", "text-align:center", `line-height:${c2}px`, "color:#666", "font-size:12px", "overflow:hidden"].join(";"), l2.textContent = "img", a2.replaceWith(l2);
    } else {
      let l2 = document.createElement("div");
      l2.style.cssText = `display:inline-block;width:${u}px;height:${c2}px;visibility:hidden;`, a2.replaceWith(l2);
    }
  };
  for (let a2 = 0; a2 < n.length; a2 += 4) {
    let o = n.slice(a2, a2 + 4).map(r);
    await Promise.allSettled(o);
  }
}
function $e(t) {
  if (!t) return () => {
  };
  let e = Pn(t);
  if (e <= 0) return () => {
  };
  if (!Ln(t)) return () => {
  };
  let n = getComputedStyle(t), r = Math.round($n(n) * e + In(n)), a2 = t.textContent ?? "", o = a2;
  if (t.scrollHeight <= r + 0.5) return () => {
  };
  let s2 = 0, u = a2.length, c2 = -1;
  for (; s2 <= u; ) {
    let i = s2 + u >> 1;
    t.textContent = a2.slice(0, i) + "…", t.scrollHeight <= r + 0.5 ? (c2 = i, s2 = i + 1) : u = i - 1;
  }
  return t.textContent = (c2 >= 0 ? a2.slice(0, c2) : "") + "…", () => {
    t.textContent = o;
  };
}
function Pn(t) {
  let e = getComputedStyle(t), n = e.getPropertyValue("-webkit-line-clamp") || e.getPropertyValue("line-clamp");
  n = (n || "").trim();
  let r = parseInt(n, 10);
  return Number.isFinite(r) && r > 0 ? r : 0;
}
function $n(t) {
  let e = (t.lineHeight || "").trim(), n = parseFloat(t.fontSize) || 16;
  return !e || e === "normal" ? Math.round(n * 1.2) : e.endsWith("px") ? parseFloat(e) : /^\d+(\.\d+)?$/.test(e) ? Math.round(parseFloat(e) * n) : e.endsWith("%") ? Math.round(parseFloat(e) / 100 * n) : Math.round(n * 1.2);
}
function In(t) {
  return (parseFloat(t.paddingTop) || 0) + (parseFloat(t.paddingBottom) || 0);
}
function Ln(t) {
  return t.childElementCount > 0 ? false : Array.from(t.childNodes).some((e) => e.nodeType === Node.TEXT_NODE);
}
function Ie(t, e) {
  if (!t || !e || !e.style) return;
  let n = getComputedStyle(t);
  try {
    e.style.boxShadow = "none";
  } catch {
  }
  try {
    e.style.textShadow = "none";
  } catch {
  }
  try {
    e.style.outline = "none";
  } catch {
  }
  let a2 = (n.filter || "").replace(/\bblur\([^()]*\)\s*/gi, "").replace(/\bdrop-shadow\([^()]*\)\s*/gi, "").trim().replace(/\s+/g, " ");
  try {
    e.style.filter = a2.length ? a2 : "none";
  } catch {
  }
}
function Wn(t) {
  let e = document.createTreeWalker(t, NodeFilter.SHOW_COMMENT), n = [];
  for (; e.nextNode(); ) n.push(e.currentNode);
  for (let r of n) r.remove();
}
function _n(t, e = {}) {
  let { stripFrameworkDirectives: n = true } = e, r = /* @__PURE__ */ new Set(["xml", "xlink"]), a2 = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT);
  for (; a2.nextNode(); ) {
    let o = a2.currentNode;
    for (let s2 of Array.from(o.attributes)) {
      let u = s2.name;
      if (u.includes("@")) {
        o.removeAttribute(u);
        continue;
      }
      if (u.includes(":")) {
        let c2 = u.split(":", 1)[0];
        if (!r.has(c2)) {
          o.removeAttribute(u);
          continue;
        }
      }
      if (n && (u.startsWith("x-") || u.startsWith("v-") || u.startsWith(":") || u.startsWith("on:") || u.startsWith("bind:") || u.startsWith("let:") || u.startsWith("class:"))) {
        o.removeAttribute(u);
        continue;
      }
    }
  }
}
function Le(t, e = {}) {
  t && (_n(t, e), Wn(t));
}
function Hn(t) {
  try {
    let e = t.getAttribute?.("style") || "";
    return /\b(height|width|block-size|inline-size)\s*:/.test(e);
  } catch {
    return false;
  }
}
function Bn(t) {
  return t instanceof HTMLImageElement || t instanceof HTMLCanvasElement || t instanceof HTMLVideoElement || t instanceof HTMLIFrameElement || t instanceof SVGElement || t instanceof HTMLObjectElement || t instanceof HTMLEmbedElement;
}
function Rn(t, e) {
  if (!(t instanceof Element) || Hn(t) || Bn(t)) return false;
  let n = e.position;
  if (n === "absolute" || n === "fixed" || n === "sticky") return false;
  let r = e.display || "";
  return !(r.includes("flex") || r.includes("grid") || r.startsWith("table") || e.transform && e.transform !== "none");
}
function We(t, e, n = /* @__PURE__ */ new Map()) {
  function r(a2, o) {
    if (!(a2 instanceof Element) || !(o instanceof Element)) return;
    let s2 = a2.childElementCount > o.childElementCount, u = n.get(a2) || getComputedStyle(a2);
    if (n.has(a2) || n.set(a2, u), s2 && Rn(a2, u)) {
      o.style.height || (o.style.height = "auto"), o.style.width || (o.style.width = "auto"), o.style.removeProperty("block-size"), o.style.removeProperty("inline-size"), o.style.minHeight || (o.style.minHeight = "0"), o.style.minWidth || (o.style.minWidth = "0"), o.style.maxHeight || (o.style.maxHeight = "none"), o.style.maxWidth || (o.style.maxWidth = "none");
      let l2 = u.overflowY || u.overflowBlock || "visible", f2 = u.overflowX || u.overflowInline || "visible";
      (l2 !== "visible" || f2 !== "visible") && (o.style.overflow = "visible");
    }
    let c2 = Array.from(a2.children), i = Array.from(o.children);
    for (let l2 = 0; l2 < Math.min(c2.length, i.length); l2++) r(c2[l2], i[l2]);
  }
  r(t, e);
}
function Dn(t) {
  let e = getComputedStyle(t);
  return !(e.display === "none" || e.position === "absolute" || e.position === "fixed" || e.position === "sticky" || (e.cssFloat || e.float || "none") !== "none" || e.transform && e.transform !== "none");
}
function On(t, e) {
  if (!(t instanceof Element)) return false;
  if (t.getAttribute("data-capture") === "exclude" && e?.excludeMode === "remove") return true;
  if (Array.isArray(e?.exclude)) for (let n of e.exclude) try {
    if (t.matches(n)) return e.excludeMode === "remove";
  } catch {
  }
  return false;
}
function _e(t, e) {
  let n = getComputedStyle(t), r = t.getBoundingClientRect(), a2 = 1 / 0, o = -1 / 0, s2 = false, u = Array.from(t.children);
  for (let h of u) {
    if (On(h, e) || !Dn(h)) continue;
    let m = h.getBoundingClientRect(), g2 = m.top - r.top, w = m.bottom - r.top;
    w <= g2 || (g2 < a2 && (a2 = g2), w > o && (o = w), s2 = true);
  }
  let c2 = s2 ? Math.max(0, o - a2) : 0, i = parseFloat(n.borderTopWidth) || 0, l2 = parseFloat(n.borderBottomWidth) || 0, f2 = parseFloat(n.paddingTop) || 0, d2 = parseFloat(n.paddingBottom) || 0;
  return i + l2 + f2 + d2 + c2;
}
var S = (t, e = 3) => Number.isFinite(t) ? Math.round(t * 10 ** e) / 10 ** e : t;
function He(t) {
  let e = t.boxShadow || "";
  if (!e || e === "none") return { top: 0, right: 0, bottom: 0, left: 0 };
  let n = e.split(/\),(?=(?:[^()]*\([^()]*\))*[^()]*$)/).map((u) => u.trim()), r = 0, a2 = 0, o = 0, s2 = 0;
  for (let u of n) {
    let c2 = u.match(/-?\d+(\.\d+)?px/g)?.map((g2) => parseFloat(g2)) || [];
    if (c2.length < 2) continue;
    let [i, l2, f2 = 0, d2 = 0] = c2, h = Math.abs(i) + f2 + d2, m = Math.abs(l2) + f2 + d2;
    a2 = Math.max(a2, h + Math.max(i, 0)), s2 = Math.max(s2, h + Math.max(-i, 0)), o = Math.max(o, m + Math.max(l2, 0)), r = Math.max(r, m + Math.max(-l2, 0));
  }
  return { top: Math.ceil(r), right: Math.ceil(a2), bottom: Math.ceil(o), left: Math.ceil(s2) };
}
function Be(t) {
  let e = (t.filter || "").match(/blur\(\s*([0-9.]+)px\s*\)/), n = e ? Math.ceil(parseFloat(e[1]) || 0) : 0;
  return { top: n, right: n, bottom: n, left: n };
}
function Re(t) {
  if ((t.outlineStyle || "none") === "none") return { top: 0, right: 0, bottom: 0, left: 0 };
  let e = Math.ceil(parseFloat(t.outlineWidth || "0") || 0);
  return { top: e, right: e, bottom: e, left: e };
}
function De(t) {
  let e = `${t.filter || ""} ${t.webkitFilter || ""}`.trim();
  if (!e || e === "none") return { bleed: { top: 0, right: 0, bottom: 0, left: 0 }, has: false };
  let n = e.match(/drop-shadow\((?:[^()]|\([^()]*\))*\)/gi) || [], r = 0, a2 = 0, o = 0, s2 = 0, u = false;
  for (let c2 of n) {
    u = true;
    let i = c2.match(/-?\d+(?:\.\d+)?px/gi)?.map((g2) => parseFloat(g2)) || [], [l2 = 0, f2 = 0, d2 = 0] = i, h = Math.abs(l2) + d2, m = Math.abs(f2) + d2;
    a2 = Math.max(a2, h + Math.max(l2, 0)), s2 = Math.max(s2, h + Math.max(-l2, 0)), o = Math.max(o, m + Math.max(f2, 0)), r = Math.max(r, m + Math.max(-f2, 0));
  }
  return { bleed: { top: S(r), right: S(a2), bottom: S(o), left: S(s2) }, has: u };
}
function Oe(t, e) {
  if (!t || !e || !e.style) return null;
  let n = getComputedStyle(t);
  try {
    e.style.transformOrigin = "0 0";
  } catch {
  }
  try {
    "translate" in e.style && (e.style.translate = "none"), "rotate" in e.style && (e.style.rotate = "none");
  } catch {
  }
  let r = n.transform || "none";
  if (r === "none") try {
    let o = Ye(t);
    if (o.a === 1 && o.b === 0 && o.c === 0 && o.d === 1) return e.style.transform = "none", { a: 1, b: 0, c: 0, d: 1 };
  } catch {
  }
  let a2 = r.match(/^matrix\(\s*([^)]+)\)$/i);
  if (a2) {
    let o = a2[1].split(",").map((s2) => parseFloat(s2.trim()));
    if (o.length === 6 && o.every(Number.isFinite)) {
      let [s2, u, c2, i] = o, l2 = Math.sqrt(s2 * s2 + u * u) || 0, f2 = 0, d2 = 0, h = 0, m = 0, g2 = 0, w = 0;
      l2 > 0 && (f2 = s2 / l2, d2 = u / l2, h = f2 * c2 + d2 * i, m = c2 - f2 * h, g2 = i - d2 * h, w = Math.sqrt(m * m + g2 * g2) || 0, w > 0 ? h = h / w : h = 0);
      let M2 = l2, b2 = 0, x2 = h * w, p2 = w;
      try {
        e.style.transform = `matrix(${M2}, ${b2}, ${x2}, ${p2}, 0, 0)`;
      } catch {
      }
      return { a: M2, b: b2, c: x2, d: p2 };
    }
  }
  try {
    let o = String(r).trim();
    return e.style.transform = o + " translate(0px, 0px) rotate(0deg)", null;
  } catch {
    return null;
  }
}
function Ft(t, e, n, r, a2) {
  let o = n.a, s2 = n.b, u = n.c, c2 = n.d, i = n.e || 0, l2 = n.f || 0;
  function f2(M2, b2) {
    let x2 = M2 - r, p2 = b2 - a2, C2 = o * x2 + u * p2, y2 = s2 * x2 + c2 * p2;
    return C2 += r + i, y2 += a2 + l2, [C2, y2];
  }
  let d2 = [f2(0, 0), f2(t, 0), f2(0, e), f2(t, e)], h = 1 / 0, m = 1 / 0, g2 = -1 / 0, w = -1 / 0;
  for (let [M2, b2] of d2) M2 < h && (h = M2), b2 < m && (m = b2), M2 > g2 && (g2 = M2), b2 > w && (w = b2);
  return { minX: h, minY: m, maxX: g2, maxY: w, width: g2 - h, height: w - m };
}
function ze(t, e, n) {
  let r = (t.transformOrigin || "0 0").trim().split(/\s+/), [a2, o] = [r[0] || "0", r[1] || "0"], s2 = (u, c2) => {
    let i = u.toLowerCase();
    return i === "left" || i === "top" ? 0 : i === "center" ? c2 / 2 : i === "right" || i === "bottom" ? c2 : i.endsWith("px") ? parseFloat(i) || 0 : i.endsWith("%") ? (parseFloat(i) || 0) * c2 / 100 : /^-?\d+(\.\d+)?$/.test(i) && parseFloat(i) || 0;
  };
  return { ox: s2(a2, e), oy: s2(o, n) };
}
function Xe(t) {
  let e = { rotate: "0deg", scale: null, translate: null }, n = typeof t.computedStyleMap == "function" ? t.computedStyleMap() : null;
  if (n) {
    let a2 = (c2) => {
      try {
        return typeof n.has == "function" && !n.has(c2) || typeof n.get != "function" ? null : n.get(c2);
      } catch {
        return null;
      }
    }, o = a2("rotate");
    if (o) if (o.angle) {
      let c2 = o.angle;
      e.rotate = c2.unit === "rad" ? c2.value * 180 / Math.PI + "deg" : c2.value + c2.unit;
    } else o.unit ? e.rotate = o.unit === "rad" ? o.value * 180 / Math.PI + "deg" : o.value + o.unit : e.rotate = String(o);
    else {
      let c2 = getComputedStyle(t);
      e.rotate = c2.rotate && c2.rotate !== "none" ? c2.rotate : "0deg";
    }
    let s2 = a2("scale");
    if (s2) {
      let c2 = "x" in s2 && s2.x?.value != null ? s2.x.value : Array.isArray(s2) ? s2[0]?.value : Number(s2) || 1, i = "y" in s2 && s2.y?.value != null ? s2.y.value : Array.isArray(s2) ? s2[1]?.value : c2;
      e.scale = `${c2} ${i}`;
    } else {
      let c2 = getComputedStyle(t);
      e.scale = c2.scale && c2.scale !== "none" ? c2.scale : null;
    }
    let u = a2("translate");
    if (u) {
      let c2 = "x" in u && "value" in u.x ? u.x.value : Array.isArray(u) ? u[0]?.value : 0, i = "y" in u && "value" in u.y ? u.y.value : Array.isArray(u) ? u[1]?.value : 0, l2 = "x" in u && u.x?.unit ? u.x.unit : "px", f2 = "y" in u && u.y?.unit ? u.y.unit : "px";
      e.translate = `${c2}${l2} ${i}${f2}`;
    } else {
      let c2 = getComputedStyle(t);
      e.translate = c2.translate && c2.translate !== "none" ? c2.translate : null;
    }
    return e;
  }
  let r = getComputedStyle(t);
  return e.rotate = r.rotate && r.rotate !== "none" ? r.rotate : "0deg", e.scale = r.scale && r.scale !== "none" ? r.scale : null, e.translate = r.translate && r.translate !== "none" ? r.translate : null, e;
}
var Nt = null;
function zn() {
  if (Nt) return Nt;
  let t = document.createElement("div");
  return t.id = "snapdom-measure-slot", t.setAttribute("aria-hidden", "true"), Object.assign(t.style, { position: "absolute", left: "-99999px", top: "0px", width: "0px", height: "0px", overflow: "hidden", opacity: "0", pointerEvents: "none", contain: "size layout style" }), document.documentElement.appendChild(t), Nt = t, t;
}
function qe(t) {
  let e = zn(), n = document.createElement("div");
  n.style.transformOrigin = "0 0", t.baseTransform && (n.style.transform = t.baseTransform), t.rotate && (n.style.rotate = t.rotate), t.scale && (n.style.scale = t.scale), t.translate && (n.style.translate = t.translate), e.appendChild(n);
  let r = Ye(n);
  return e.removeChild(n), r;
}
function Ve(t) {
  let e = getComputedStyle(t), n = e.transform || "none";
  if (n !== "none" && !/^matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*,\s*0\s*,\s*0\s*\)$/i.test(n)) return true;
  let a2 = e.rotate && e.rotate !== "none" && e.rotate !== "0deg", o = e.scale && e.scale !== "none" && e.scale !== "1", s2 = e.translate && e.translate !== "none" && e.translate !== "0px 0px";
  return !!(a2 || o || s2);
}
function Ye(t) {
  let e = getComputedStyle(t).transform;
  if (!e || e === "none") return new DOMMatrix();
  try {
    return new DOMMatrix(e);
  } catch {
    return new WebKitCSSMatrix(e);
  }
}
async function Vr(t, e) {
  if (!t) throw new Error("Element cannot be null or undefined");
  et$2(e.cache);
  let n = e.fast, r = e.outerTransforms !== false, a2 = !!e.outerShadows, o = { element: t, options: e, plugins: e.plugins }, s$1, u, c2, i = "", l2 = "", f2, d$1, h = null;
  await g("beforeSnap", o), await g("beforeClone", o);
  let m = $e(o.element);
  try {
    ({ clone: s$1, classCSS: u, styleCache: c2 } = await Te(o.element, o.options)), !r && s$1 && (h = Oe(o.element, s$1)), !a2 && s$1 && Ie(o.element, s$1);
  } finally {
    m();
  }
  if (o = { clone: s$1, classCSS: u, styleCache: c2, ...o }, await g("afterClone", o), Le(o.clone), o.options?.excludeMode === "remove") try {
    We(o.element, o.clone, o.styleCache);
  } catch (b2) {
    console.warn("[snapdom] shrink pass failed:", b2);
  }
  try {
    await bt(o.clone, o.element);
  } catch {
  }
  await new Promise((b2) => {
    d(async () => {
      await Pe(o.clone, o.options), b2();
    }, { fast: n });
  }), await new Promise((b2) => {
    d(async () => {
      await Et$1(o.element, o.clone, o.styleCache, o.options), b2();
    }, { fast: n });
  }), e.embedFonts && await new Promise((b2) => {
    d(async () => {
      let x2 = Mt$1(o.element), p2 = At$1(o.element);
      if (l$1()) {
        let C2 = new Set(Array.from(x2).map((y2) => String(y2).split("__")[0]).filter(Boolean));
        await It(C2, 1);
      }
      i = await Lt({ required: x2, usedCodepoints: p2, exclude: o.options.excludeFonts, useProxy: o.options.useProxy }), b2();
    }, { fast: n });
  });
  let g$12 = X$1(o.clone).sort(), w = g$12.join(",");
  s.baseStyle.has(w) ? l2 = s.baseStyle.get(w) : await new Promise((b2) => {
    d(() => {
      l2 = J$1(g$12), s.baseStyle.set(w, l2), b2();
    }, { fast: n });
  }), o = { fontsCSS: i, baseCSS: l2, ...o }, await g("beforeRender", o), await new Promise((b2) => {
    d(() => {
      let x2 = getComputedStyle(o.element), p2 = o.element.getBoundingClientRect(), C2 = Math.max(1, S(o.element.offsetWidth || parseFloat(x2.width) || p2.width || 1)), y2 = Math.max(1, S(o.element.offsetHeight || parseFloat(x2.height) || p2.height || 1));
      if (o.options?.excludeMode === "remove") {
        let _2 = _e(o.element, o.options);
        Number.isFinite(_2) && _2 > 0 && (y2 = Math.max(1, Math.min(y2, S(_2 + 1))));
      }
      let v2 = (_2, H2 = NaN) => {
        let J2 = typeof _2 == "string" ? parseFloat(_2) : _2;
        return Number.isFinite(J2) ? J2 : H2;
      }, E2 = v2(o.options.width), F2 = v2(o.options.height), $ = C2, P2 = y2, W2 = Number.isFinite(E2), B2 = Number.isFinite(F2), nt2 = y2 > 0 ? C2 / y2 : 1;
      W2 && B2 ? ($ = Math.max(1, S(E2)), P2 = Math.max(1, S(F2))) : W2 ? ($ = Math.max(1, S(E2)), P2 = Math.max(1, S($ / (nt2 || 1)))) : B2 ? (P2 = Math.max(1, S(F2)), $ = Math.max(1, S(P2 * (nt2 || 1)))) : ($ = C2, P2 = y2);
      let X2 = 0, k2 = 0, q2 = C2, V2 = y2;
      if (!r && h && Number.isFinite(h.a)) {
        let _2 = { a: h.a, b: h.b || 0, c: h.c || 0, d: h.d || 1, e: 0, f: 0 }, H2 = Ft(C2, y2, _2, 0, 0);
        X2 = S(H2.minX), k2 = S(H2.minY), q2 = S(H2.maxX), V2 = S(H2.maxY);
      } else if (r && Xn(o.element)) {
        let H2 = x2.transform && x2.transform !== "none" ? x2.transform : "", J2 = Xe(o.element), wt2 = qe({ baseTransform: H2, rotate: J2.rotate || "0deg", scale: J2.scale, translate: J2.translate }), { ox: Je, oy: Qe } = ze(x2, C2, y2), tn = wt2.is2D ? wt2 : new DOMMatrix(wt2.toString()), dt2 = Ft(C2, y2, tn, Je, Qe);
        X2 = S(dt2.minX), k2 = S(dt2.minY), q2 = S(dt2.maxX), V2 = S(dt2.maxY);
      }
      let rt2 = He(x2), j2 = Be(x2), N2 = Re(x2), T2 = De(x2), I2 = a2 ? { top: S(rt2.top + j2.top + N2.top + T2.bleed.top), right: S(rt2.right + j2.right + N2.right + T2.bleed.right), bottom: S(rt2.bottom + j2.bottom + N2.bottom + T2.bleed.bottom), left: S(rt2.left + j2.left + N2.left + T2.bleed.left) } : { top: 0, right: 0, bottom: 0, left: 0 };
      X2 = S(X2 - I2.left), k2 = S(k2 - I2.top), q2 = S(q2 + I2.right), V2 = S(V2 + I2.bottom);
      let L2 = Math.max(1, S(q2 - X2)), Y2 = Math.max(1, S(V2 - k2)), K2 = W2 || B2 ? S($ / C2) : 1, pt2 = B2 || W2 ? S(P2 / y2) : 1, G2 = Math.max(1, S(L2 * K2)), gt2 = Math.max(1, S(Y2 * pt2)), ut2 = "http://www.w3.org/2000/svg", ft2 = l$1() ? 1 : 0, R2 = S(ft2 + (r ? 0 : 1)), D2 = document.createElementNS(ut2, "foreignObject"), Ue = S(X2), je = S(k2);
      D2.setAttribute("x", String(S(-(Ue - R2)))), D2.setAttribute("y", String(S(-(je - R2)))), D2.setAttribute("width", String(S(C2 + R2 * 2))), D2.setAttribute("height", String(S(y2 + R2 * 2))), D2.style.overflow = "visible";
      let Tt = document.createElement("style");
      Tt.textContent = o.baseCSS + o.fontsCSS + "svg{overflow:visible;} foreignObject{overflow:visible;}" + o.classCSS, D2.appendChild(Tt);
      let Z2 = document.createElement("div");
      Z2.setAttribute("xmlns", "http://www.w3.org/1999/xhtml"), Z2.style.width = `${S(C2)}px`, Z2.style.height = `${S(y2)}px`, Z2.style.overflow = "visible", o.clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml"), Z2.appendChild(o.clone), D2.appendChild(Z2);
      let Ke = new XMLSerializer().serializeToString(D2), bt2 = S(L2 + R2 * 2), xt = S(Y2 + R2 * 2), Pt = W2 || B2;
      e.meta = { w0: C2, h0: y2, vbW: bt2, vbH: xt, targetW: $, targetH: P2 };
      let Ge = l$1() && Pt ? bt2 : S(G2 + R2 * 2), Ze = l$1() && Pt ? xt : S(gt2 + R2 * 2);
      d$1 = `<svg xmlns="${ut2}" width="${Ge}" height="${Ze}" viewBox="0 0 ${bt2} ${xt}">` + Ke + "</svg>", f2 = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(d$1)}`, o = { svgString: d$1, dataURL: f2, ...o }, b2();
    }, { fast: n });
  }), await g("afterRender", o);
  let M2 = document.getElementById("snapdom-sandbox");
  return M2 && M2.style.position === "absolute" && M2.remove(), o.dataURL;
}
function Xn(t) {
  return Ve(t);
}
function z(e) {
  if (typeof e == "string") {
    let r = e.toLowerCase().trim();
    if (r === "disabled" || r === "full" || r === "auto" || r === "soft") return r;
  }
  return "soft";
}
function A(e = {}) {
  let r = e.format ?? "png";
  r === "jpg" && (r = "jpeg");
  let n = z(e.cache);
  return { debug: e.debug ?? false, fast: e.fast ?? true, scale: e.scale ?? 1, exclude: e.exclude ?? [], excludeMode: e.excludeMode ?? "hide", filter: e.filter ?? null, filterMode: e.filterMode ?? "hide", placeholders: e.placeholders !== false, embedFonts: e.embedFonts ?? false, iconFonts: Array.isArray(e.iconFonts) ? e.iconFonts : e.iconFonts ? [e.iconFonts] : [], localFonts: Array.isArray(e.localFonts) ? e.localFonts : [], excludeFonts: e.excludeFonts ?? void 0, fallbackURL: e.fallbackURL ?? void 0, cache: n, useProxy: typeof e.useProxy == "string" ? e.useProxy : "", width: e.width ?? null, height: e.height ?? null, format: r, type: e.type ?? "svg", quality: e.quality ?? 0.92, dpr: e.dpr ?? (window.devicePixelRatio || 1), backgroundColor: e.backgroundColor ?? (["jpeg", "webp"].includes(r) ? "#ffffff" : null), filename: e.filename ?? "snapDOM", outerTransforms: e.outerTransforms ?? true, outerShadows: e.outerShadows ?? false };
}
function O(...e) {
  return p(...e), c;
}
var c = Object.assign(_, { plugins: O }), M = Symbol("snapdom.internal"), f = Symbol("snapdom.internal.silent"), x = false;
async function _(e, r) {
  if (!e) throw new Error("Element cannot be null or undefined");
  let n = A(r);
  if (A$1(n, r && r.plugins), l$1() && (n.embedFonts === true || W(e))) for (let o = 0; o < 3; o++) try {
    await B(e, r), x = false;
  } catch {
  }
  return n.iconFonts && n.iconFonts.length > 0 && St(n.iconFonts), n.snap || (n.snap = { toPng: (o, l2) => c.toPng(o, l2), toSvg: (o, l2) => c.toSvg(o, l2) }), c.capture(e, n, M);
}
c.capture = async (e, r, n) => {
  if (n !== M) throw new Error("[snapdom.capture] is internal. Use snapdom(...) instead.");
  let o = await Vr(e, r), l2 = { img: async (t, a2) => {
    let { toImg: s2 } = await __vitePreload(() => import("./toImg-DxoOTeWK.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0);
    return s2(o, { ...t, ...a2 || {} });
  }, svg: async (t, a2) => {
    let { toSvg: s2 } = await __vitePreload(() => import("./toImg-DxoOTeWK.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0);
    return s2(o, { ...t, ...a2 || {} });
  }, canvas: async (t, a2) => {
    let { toCanvas: s2 } = await __vitePreload(() => import("./toCanvas-BG7QrbWt.js"), true ? __vite__mapDeps([2,3]) : void 0);
    return s2(o, { ...t, ...a2 || {} });
  }, blob: async (t, a2) => {
    let { toBlob: s2 } = await __vitePreload(() => import("./toBlob-Bnx0-FJA.js"), true ? __vite__mapDeps([4,2,3]) : void 0);
    return s2(o, { ...t, ...a2 || {} });
  }, png: async (t, a2) => {
    let { rasterize: s2 } = await __vitePreload(() => import("./rasterize-JS5G2XHH-C_3kH5z0.js"), true ? __vite__mapDeps([1,2,3]) : void 0);
    return s2(o, { ...t, ...a2 || {}, format: "png" });
  }, jpeg: async (t, a2) => {
    let { rasterize: s2 } = await __vitePreload(() => import("./rasterize-JS5G2XHH-C_3kH5z0.js"), true ? __vite__mapDeps([1,2,3]) : void 0);
    return s2(o, { ...t, ...a2 || {}, format: "jpeg" });
  }, webp: async (t, a2) => {
    let { rasterize: s2 } = await __vitePreload(() => import("./rasterize-JS5G2XHH-C_3kH5z0.js"), true ? __vite__mapDeps([1,2,3]) : void 0);
    return s2(o, { ...t, ...a2 || {}, format: "webp" });
  }, download: async (t, a2) => {
    let { download: s2 } = await __vitePreload(() => import("./download-rMLr2jb5.js"), true ? __vite__mapDeps([5,4,2,3]) : void 0);
    return s2(o, { ...t, ...a2 || {} });
  } }, g$12 = { ...r, export: { url: o }, exports: { svg: async (t) => {
    let { toSvg: a2 } = await __vitePreload(() => import("./toImg-DxoOTeWK.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0);
    return a2(o, { ...r, ...t || {}, [f]: true });
  }, canvas: async (t) => {
    let { toCanvas: a2 } = await __vitePreload(() => import("./toCanvas-BG7QrbWt.js"), true ? __vite__mapDeps([2,3]) : void 0);
    return a2(o, { ...r, ...t || {}, [f]: true });
  }, png: async (t) => {
    let { rasterize: a2 } = await __vitePreload(() => import("./rasterize-JS5G2XHH-C_3kH5z0.js"), true ? __vite__mapDeps([1,2,3]) : void 0);
    return a2(o, { ...r, ...t || {}, format: "png", [f]: true });
  }, jpeg: async (t) => {
    let { rasterize: a2 } = await __vitePreload(() => import("./rasterize-JS5G2XHH-C_3kH5z0.js"), true ? __vite__mapDeps([1,2,3]) : void 0);
    return a2(o, { ...r, ...t || {}, format: "jpeg", [f]: true });
  }, jpg: async (t) => {
    let { rasterize: a2 } = await __vitePreload(() => import("./rasterize-JS5G2XHH-C_3kH5z0.js"), true ? __vite__mapDeps([1,2,3]) : void 0);
    return a2(o, { ...r, ...t || {}, format: "jpeg", [f]: true });
  }, webp: async (t) => {
    let { rasterize: a2 } = await __vitePreload(() => import("./rasterize-JS5G2XHH-C_3kH5z0.js"), true ? __vite__mapDeps([1,2,3]) : void 0);
    return a2(o, { ...r, ...t || {}, format: "webp", [f]: true });
  }, blob: async (t) => {
    let { toBlob: a2 } = await __vitePreload(() => import("./toBlob-Bnx0-FJA.js"), true ? __vite__mapDeps([4,2,3]) : void 0);
    return a2(o, { ...r, ...t || {}, [f]: true });
  }, img: async (t) => {
    let { toImg: a2 } = await __vitePreload(() => import("./toImg-DxoOTeWK.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0);
    return a2(o, { ...r, ...t || {}, [f]: true });
  } } }, m = await y("defineExports", g$12), N2 = Object.assign({}, ...m.filter((t) => t && typeof t == "object")), p2 = { ...l2, ...N2 };
  p2.jpeg && !p2.jpg && (p2.jpg = (t, a2) => p2.jpeg(t, a2));
  function T2(t, a2) {
    let s2 = { ...r, ...a2 || {} };
    return (t === "jpeg" || t === "jpg") && (s2.backgroundColor == null || s2.backgroundColor === "transparent") && (s2.backgroundColor = "#ffffff"), s2;
  }
  let v2 = false, k2 = Promise.resolve();
  async function u(t, a2) {
    let s2 = async () => {
      let y2 = p2[t];
      if (!y2) throw new Error(`[snapdom] Unknown export type: ${t}`);
      let F2 = T2(t, a2), b2 = { ...r, export: { type: t, options: F2, url: o } };
      await g("beforeExport", b2);
      let j2 = await y2(b2, F2);
      return await g("afterExport", b2, j2), v2 || (v2 = true, await g("afterSnap", r)), j2;
    };
    return k2 = k2.then(s2);
  }
  let w = { url: o, toRaw: () => o, to: (t, a2) => u(t, a2), toImg: (t) => u("img", t), toSvg: (t) => u("svg", t), toCanvas: (t) => u("canvas", t), toBlob: (t) => u("blob", t), toPng: (t) => u("png", t), toJpg: (t) => u("jpg", t), toWebp: (t) => u("webp", t), download: (t) => u("download", t) };
  for (let t of Object.keys(p2)) {
    let a2 = "to" + t.charAt(0).toUpperCase() + t.slice(1);
    w[a2] || (w[a2] = (s2) => u(t, s2));
  }
  return w;
};
c.toRaw = (e, r) => c(e, r).then((n) => n.toRaw());
c.toImg = (e, r) => c(e, r).then((n) => n.toImg());
c.toSvg = (e, r) => c(e, r).then((n) => n.toSvg());
c.toCanvas = (e, r) => c(e, r).then((n) => n.toCanvas());
c.toBlob = (e, r) => c(e, r).then((n) => n.toBlob());
c.toPng = (e, r) => c(e, { ...r, format: "png" }).then((n) => n.toPng());
c.toJpg = (e, r) => c(e, { ...r, format: "jpeg" }).then((n) => n.toJpg());
c.toWebp = (e, r) => c(e, { ...r, format: "webp" }).then((n) => n.toWebp());
c.download = (e, r) => c(e, r).then((n) => n.download());
async function B(e, r) {
  if (x) return;
  let n = { ...r, fast: true, embedFonts: true, scale: 0.2 }, o;
  try {
    o = await Vr(e, n);
  } catch {
  }
  await new Promise((l2) => requestAnimationFrame(() => requestAnimationFrame(l2))), o && await new Promise((l2) => {
    let i = new Image();
    try {
      i.decoding = "sync", i.loading = "eager";
    } catch {
    }
    i.style.cssText = "position:fixed;left:0px;top:0px;width:10px;height:10px;opacity:0.01;pointer-events:none;", i.src = o, document.body.appendChild(i), (async () => {
      try {
        typeof i.decode == "function" && await i.decode();
      } catch {
      }
      let g2 = performance.now();
      for (; !(i.complete && i.naturalWidth > 0) && performance.now() - g2 < 900; ) await new Promise((m) => setTimeout(m, 200));
      await new Promise((m) => requestAnimationFrame(m));
      try {
        i.remove();
      } catch {
      }
      l2();
    })();
  }), e.querySelectorAll("canvas").forEach((l2) => {
    try {
      let i = l2.getContext("2d", { willReadFrequently: true });
      i && i.getImageData(0, 0, 1, 1);
    } catch {
    }
  }), x = true;
}
function W(e) {
  let r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT);
  for (; r.nextNode(); ) {
    let n = r.currentNode, o = getComputedStyle(n), l2 = o.backgroundImage && o.backgroundImage !== "none", i = o.maskImage && o.maskImage !== "none" || o.webkitMaskImage && o.webkitMaskImage !== "none";
    if (l2 || i || n.tagName === "CANVAS") return true;
  }
  return false;
}
var K = c;
const snapdom = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: K,
  plugins: O,
  preCache: I,
  snapdom: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  l$1 as l,
  snapdom as s
};
