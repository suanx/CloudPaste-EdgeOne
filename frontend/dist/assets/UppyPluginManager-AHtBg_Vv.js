const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-FnY8_LvA.js","assets/index-BQxzU9F1.js","assets/storageConfigsStore-DUFoycii.js","assets/index-BkILv0fc.js","assets/getFileTypeExtension-BReVzuN7.js","assets/index-iGxz4vyk.js","assets/index-DTAkkwpz.js","assets/UrlImportPlugin-COQNLQA8.js"])))=>i.map(i=>d[i]);
import { eX as buildAuthHeaders, aW as commonjsGlobal, aX as getDefaultExportFromCjs, c as createLogger, a_ as shallowRef, g as ref, w as watch, u as useEventListener, F as computed, j as createElementBlock, k as openBlock, l as createBaseVNode, n as normalizeClass, t as toDisplayString, K as Fragment, L as renderList, p as createCommentVNode, q as withDirectives, z as createVNode, A as createTextVNode, y as unref, ao as IconChevronDown, aq as vShow, eY as API_PREFIX, ag as API_BASE_URL, eZ as listMultipartParts, e_ as signMultipartParts, e$ as initMultipartUpload, f as useAuthStore, f0 as commitPresignedUpload, f1 as getPresignedUploadUrl, f2 as completeMultipartUpload, f3 as abortMultipartUpload, f4 as getFullApiUrl, E as api, i as useLocalStorage, _ as __vitePreload } from "./index-BQxzU9F1.js";
import { u as useStorageConfigsStore } from "./storageConfigsStore-DUFoycii.js";
function buildAuthHeadersForRequest(baseHeaders = {}) {
  return buildAuthHeaders(baseHeaders);
}
function insertReplacement(source, rx, replacement) {
  const newParts = [];
  source.forEach((chunk) => {
    if (typeof chunk !== "string") {
      return newParts.push(chunk);
    }
    return rx[Symbol.split](chunk).forEach((raw, i2, list) => {
      if (raw !== "") {
        newParts.push(raw);
      }
      if (i2 < list.length - 1) {
        newParts.push(replacement);
      }
    });
  });
  return newParts;
}
/**
 * Takes a string with placeholder variables like `%{smart_count} file selected`
 * and replaces it with values from options `{smart_count: 5}`
 *
 * @license https://github.com/airbnb/polyglot.js/blob/master/LICENSE
 * taken from https://github.com/airbnb/polyglot.js/blob/master/lib/polyglot.js#L299
 *
 * @param phrase that needs interpolation, with placeholders
 * @param options with values that will be used to replace placeholders
 */
function interpolate(phrase, options) {
  const dollarRegex = /\$/g;
  const dollarBillsYall = "$$$$";
  let interpolated = [phrase];
  if (options == null)
    return interpolated;
  for (const arg of Object.keys(options)) {
    if (arg !== "_") {
      let replacement = options[arg];
      if (typeof replacement === "string") {
        replacement = dollarRegex[Symbol.replace](replacement, dollarBillsYall);
      }
      interpolated = insertReplacement(interpolated, new RegExp(`%\\{${arg}\\}`, "g"), replacement);
    }
  }
  return interpolated;
}
const defaultOnMissingKey = (key) => {
  throw new Error(`missing string: ${key}`);
};
class Translator {
  locale;
  constructor(locales, { onMissingKey = defaultOnMissingKey } = {}) {
    this.locale = {
      strings: {},
      pluralize(n2) {
        if (n2 === 1) {
          return 0;
        }
        return 1;
      }
    };
    if (Array.isArray(locales)) {
      locales.forEach(this.#apply, this);
    } else {
      this.#apply(locales);
    }
    this.#onMissingKey = onMissingKey;
  }
  #onMissingKey;
  #apply(locale2) {
    if (!locale2?.strings) {
      return;
    }
    const prevLocale = this.locale;
    Object.assign(this.locale, {
      strings: { ...prevLocale.strings, ...locale2.strings },
      pluralize: locale2.pluralize || prevLocale.pluralize
    });
  }
  /**
   * Public translate method
   *
   * @param key
   * @param options with values that will be used later to replace placeholders in string
   * @returns string translated (and interpolated)
   */
  translate(key, options) {
    return this.translateArray(key, options).join("");
  }
  /**
   * Get a translation and return the translated and interpolated parts as an array.
   *
   * @returns The translated and interpolated parts, in order.
   */
  translateArray(key, options) {
    let string = this.locale.strings[key];
    if (string == null) {
      this.#onMissingKey(key);
      string = key;
    }
    const hasPluralForms = typeof string === "object";
    if (hasPluralForms) {
      if (options && typeof options.smart_count !== "undefined") {
        const plural = this.locale.pluralize(options.smart_count);
        return interpolate(string[plural], options);
      }
      throw new Error("Attempted to use a string with plural forms, but no value was given for %{smart_count}");
    }
    if (typeof string !== "string") {
      throw new Error(`string was not a string`);
    }
    return interpolate(string, options);
  }
}
class BasePlugin {
  uppy;
  opts;
  id;
  defaultLocale;
  i18n;
  i18nArray;
  type;
  VERSION;
  constructor(uppy, opts) {
    this.uppy = uppy;
    this.opts = opts ?? {};
  }
  getPluginState() {
    const { plugins } = this.uppy.getState();
    return plugins?.[this.id] || {};
  }
  setPluginState(update) {
    const { plugins } = this.uppy.getState();
    this.uppy.setState({
      plugins: {
        ...plugins,
        [this.id]: {
          ...plugins[this.id],
          ...update
        }
      }
    });
  }
  setOptions(newOpts) {
    this.opts = { ...this.opts, ...newOpts };
    this.setPluginState(void 0);
    this.i18nInit();
  }
  i18nInit() {
    const translator = new Translator([
      this.defaultLocale,
      this.uppy.locale,
      this.opts.locale
    ]);
    this.i18n = translator.translate.bind(translator);
    this.i18nArray = translator.translateArray.bind(translator);
    this.setPluginState(void 0);
  }
  /**
   * Extendable methods
   * ==================
   * These methods are here to serve as an overview of the extendable methods as well as
   * making them not conditional in use, such as `if (this.afterUpdate)`.
   */
  addTarget(plugin) {
    throw new Error("Extend the addTarget method to add your plugin to another plugin's target");
  }
  install() {
  }
  uninstall() {
  }
  update(state) {
  }
  // Called after every state update, after everything's mounted. Debounced.
  afterUpdate() {
  }
}
function pad(number) {
  return number < 10 ? `0${number}` : number.toString();
}
function getTimeStamp() {
  const date = /* @__PURE__ */ new Date();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}
const justErrorsLogger = {
  debug: () => {
  },
  warn: () => {
  },
  error: (...args) => console.error(`[Uppy] [${getTimeStamp()}]`, ...args)
};
const debugLogger = {
  debug: (...args) => console.debug(`[Uppy] [${getTimeStamp()}]`, ...args),
  warn: (...args) => console.warn(`[Uppy] [${getTimeStamp()}]`, ...args),
  error: (...args) => console.error(`[Uppy] [${getTimeStamp()}]`, ...args)
};
function isDOMElement(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  if (!("nodeType" in obj))
    return false;
  return obj.nodeType === Node.ELEMENT_NODE;
}
function findDOMElement(element, context = document) {
  if (typeof element === "string") {
    return context.querySelector(element);
  }
  if (isDOMElement(element)) {
    return element;
  }
  return null;
}
function getTextDirection(element) {
  while (element && !element.dir) {
    element = element.parentNode;
  }
  return element?.dir;
}
var n$1, l$2, u$3, i$2, r$2, o$2, e$2, f$3, c$2, s$2, a$2, p$2 = {}, v$2 = [], y$2 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, w$2 = Array.isArray;
function d$2(n2, l2) {
  for (var u2 in l2) n2[u2] = l2[u2];
  return n2;
}
function g$2(n2) {
  n2 && n2.parentNode && n2.parentNode.removeChild(n2);
}
function _$1(l2, u2, t2) {
  var i2, r2, o2, e2 = {};
  for (o2 in u2) "key" == o2 ? i2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : e2[o2] = u2[o2];
  if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n$1.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (o2 in l2.defaultProps) void 0 === e2[o2] && (e2[o2] = l2.defaultProps[o2]);
  return m$2(l2, e2, i2, r2, null);
}
function m$2(n2, t2, i2, r2, o2) {
  var e2 = { type: n2, props: t2, key: i2, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o2 ? ++u$3 : o2, __i: -1, __u: 0 };
  return null == o2 && null != l$2.vnode && l$2.vnode(e2), e2;
}
function b$1() {
  return { current: null };
}
function k$2(n2) {
  return n2.children;
}
function x(n2, l2) {
  this.props = n2, this.context = l2;
}
function S$1(n2, l2) {
  if (null == l2) return n2.__ ? S$1(n2.__, n2.__i + 1) : null;
  for (var u2; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) return u2.__e;
  return "function" == typeof n2.type ? S$1(n2) : null;
}
function C$1(n2) {
  var l2, u2;
  if (null != (n2 = n2.__) && null != n2.__c) {
    for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) {
      n2.__e = n2.__c.base = u2.__e;
      break;
    }
    return C$1(n2);
  }
}
function M$1(n2) {
  (!n2.__d && (n2.__d = true) && i$2.push(n2) && !$$1.__r++ || r$2 != l$2.debounceRendering) && ((r$2 = l$2.debounceRendering) || o$2)($$1);
}
function $$1() {
  for (var n2, u2, t2, r2, o2, f2, c2, s2 = 1; i$2.length; ) i$2.length > s2 && i$2.sort(e$2), n2 = i$2.shift(), s2 = i$2.length, n2.__d && (t2 = void 0, o2 = (r2 = (u2 = n2).__v).__e, f2 = [], c2 = [], u2.__P && ((t2 = d$2({}, r2)).__v = r2.__v + 1, l$2.vnode && l$2.vnode(t2), O$1(u2.__P, t2, r2, u2.__n, u2.__P.namespaceURI, 32 & r2.__u ? [o2] : null, f2, null == o2 ? S$1(r2) : o2, !!(32 & r2.__u), c2), t2.__v = r2.__v, t2.__.__k[t2.__i] = t2, N$2(f2, t2, c2), t2.__e != o2 && C$1(t2)));
  $$1.__r = 0;
}
function I$1(n2, l2, u2, t2, i2, r2, o2, e2, f2, c2, s2) {
  var a2, h2, y2, w2, d2, g2, _2 = t2 && t2.__k || v$2, m2 = l2.length;
  for (f2 = P$2(u2, l2, _2, f2, m2), a2 = 0; a2 < m2; a2++) null != (y2 = u2.__k[a2]) && (h2 = -1 == y2.__i ? p$2 : _2[y2.__i] || p$2, y2.__i = a2, g2 = O$1(n2, y2, h2, i2, r2, o2, e2, f2, c2, s2), w2 = y2.__e, y2.ref && h2.ref != y2.ref && (h2.ref && B$3(h2.ref, null, y2), s2.push(y2.ref, y2.__c || w2, y2)), null == d2 && null != w2 && (d2 = w2), 4 & y2.__u || h2.__k === y2.__k ? f2 = A$2(y2, f2, n2) : "function" == typeof y2.type && void 0 !== g2 ? f2 = g2 : w2 && (f2 = w2.nextSibling), y2.__u &= -7);
  return u2.__e = d2, f2;
}
function P$2(n2, l2, u2, t2, i2) {
  var r2, o2, e2, f2, c2, s2 = u2.length, a2 = s2, h2 = 0;
  for (n2.__k = new Array(i2), r2 = 0; r2 < i2; r2++) null != (o2 = l2[r2]) && "boolean" != typeof o2 && "function" != typeof o2 ? (f2 = r2 + h2, (o2 = n2.__k[r2] = "string" == typeof o2 || "number" == typeof o2 || "bigint" == typeof o2 || o2.constructor == String ? m$2(null, o2, null, null, null) : w$2(o2) ? m$2(k$2, { children: o2 }, null, null, null) : null == o2.constructor && o2.__b > 0 ? m$2(o2.type, o2.props, o2.key, o2.ref ? o2.ref : null, o2.__v) : o2).__ = n2, o2.__b = n2.__b + 1, e2 = null, -1 != (c2 = o2.__i = L$1(o2, u2, f2, a2)) && (a2--, (e2 = u2[c2]) && (e2.__u |= 2)), null == e2 || null == e2.__v ? (-1 == c2 && (i2 > s2 ? h2-- : i2 < s2 && h2++), "function" != typeof o2.type && (o2.__u |= 4)) : c2 != f2 && (c2 == f2 - 1 ? h2-- : c2 == f2 + 1 ? h2++ : (c2 > f2 ? h2-- : h2++, o2.__u |= 4))) : n2.__k[r2] = null;
  if (a2) for (r2 = 0; r2 < s2; r2++) null != (e2 = u2[r2]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = S$1(e2)), D$2(e2, e2));
  return t2;
}
function A$2(n2, l2, u2) {
  var t2, i2;
  if ("function" == typeof n2.type) {
    for (t2 = n2.__k, i2 = 0; t2 && i2 < t2.length; i2++) t2[i2] && (t2[i2].__ = n2, l2 = A$2(t2[i2], l2, u2));
    return l2;
  }
  n2.__e != l2 && (l2 && n2.type && !u2.contains(l2) && (l2 = S$1(n2)), u2.insertBefore(n2.__e, l2 || null), l2 = n2.__e);
  do {
    l2 = l2 && l2.nextSibling;
  } while (null != l2 && 8 == l2.nodeType);
  return l2;
}
function H$2(n2, l2) {
  return l2 = l2 || [], null == n2 || "boolean" == typeof n2 || (w$2(n2) ? n2.some(function(n3) {
    H$2(n3, l2);
  }) : l2.push(n2)), l2;
}
function L$1(n2, l2, u2, t2) {
  var i2, r2, o2, e2 = n2.key, f2 = n2.type, c2 = l2[u2], s2 = null != c2 && 0 == (2 & c2.__u);
  if (null === c2 && null == n2.key || s2 && e2 == c2.key && f2 == c2.type) return u2;
  if (t2 > (s2 ? 1 : 0)) {
    for (i2 = u2 - 1, r2 = u2 + 1; i2 >= 0 || r2 < l2.length; ) if (null != (c2 = l2[o2 = i2 >= 0 ? i2-- : r2++]) && 0 == (2 & c2.__u) && e2 == c2.key && f2 == c2.type) return o2;
  }
  return -1;
}
function T$3(n2, l2, u2) {
  "-" == l2[0] ? n2.setProperty(l2, null == u2 ? "" : u2) : n2[l2] = null == u2 ? "" : "number" != typeof u2 || y$2.test(l2) ? u2 : u2 + "px";
}
function j$3(n2, l2, u2, t2, i2) {
  var r2, o2;
  n: if ("style" == l2) if ("string" == typeof u2) n2.style.cssText = u2;
  else {
    if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l2 in t2) u2 && l2 in u2 || T$3(n2.style, l2, "");
    if (u2) for (l2 in u2) t2 && u2[l2] == t2[l2] || T$3(n2.style, l2, u2[l2]);
  }
  else if ("o" == l2[0] && "n" == l2[1]) r2 = l2 != (l2 = l2.replace(f$3, "$1")), o2 = l2.toLowerCase(), l2 = o2 in n2 || "onFocusOut" == l2 || "onFocusIn" == l2 ? o2.slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u2, u2 ? t2 ? u2.u = t2.u : (u2.u = c$2, n2.addEventListener(l2, r2 ? a$2 : s$2, r2)) : n2.removeEventListener(l2, r2 ? a$2 : s$2, r2);
  else {
    if ("http://www.w3.org/2000/svg" == i2) l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if ("width" != l2 && "height" != l2 && "href" != l2 && "list" != l2 && "form" != l2 && "tabIndex" != l2 && "download" != l2 && "rowSpan" != l2 && "colSpan" != l2 && "role" != l2 && "popover" != l2 && l2 in n2) try {
      n2[l2] = null == u2 ? "" : u2;
      break n;
    } catch (n3) {
    }
    "function" == typeof u2 || (null == u2 || false === u2 && "-" != l2[4] ? n2.removeAttribute(l2) : n2.setAttribute(l2, "popover" == l2 && 1 == u2 ? "" : u2));
  }
}
function F$2(n2) {
  return function(u2) {
    if (this.l) {
      var t2 = this.l[u2.type + n2];
      if (null == u2.t) u2.t = c$2++;
      else if (u2.t < t2.u) return;
      return t2(l$2.event ? l$2.event(u2) : u2);
    }
  };
}
function O$1(n2, u2, t2, i2, r2, o2, e2, f2, c2, s2) {
  var a2, h2, p2, v2, y2, _2, m2, b2, S2, C2, M2, $2, P2, A2, H2, L2, T2, j2 = u2.type;
  if (null != u2.constructor) return null;
  128 & t2.__u && (c2 = !!(32 & t2.__u), o2 = [f2 = u2.__e = t2.__e]), (a2 = l$2.__b) && a2(u2);
  n: if ("function" == typeof j2) try {
    if (b2 = u2.props, S2 = "prototype" in j2 && j2.prototype.render, C2 = (a2 = j2.contextType) && i2[a2.__c], M2 = a2 ? C2 ? C2.props.value : a2.__ : i2, t2.__c ? m2 = (h2 = u2.__c = t2.__c).__ = h2.__E : (S2 ? u2.__c = h2 = new j2(b2, M2) : (u2.__c = h2 = new x(b2, M2), h2.constructor = j2, h2.render = E$2), C2 && C2.sub(h2), h2.props = b2, h2.state || (h2.state = {}), h2.context = M2, h2.__n = i2, p2 = h2.__d = true, h2.__h = [], h2._sb = []), S2 && null == h2.__s && (h2.__s = h2.state), S2 && null != j2.getDerivedStateFromProps && (h2.__s == h2.state && (h2.__s = d$2({}, h2.__s)), d$2(h2.__s, j2.getDerivedStateFromProps(b2, h2.__s))), v2 = h2.props, y2 = h2.state, h2.__v = u2, p2) S2 && null == j2.getDerivedStateFromProps && null != h2.componentWillMount && h2.componentWillMount(), S2 && null != h2.componentDidMount && h2.__h.push(h2.componentDidMount);
    else {
      if (S2 && null == j2.getDerivedStateFromProps && b2 !== v2 && null != h2.componentWillReceiveProps && h2.componentWillReceiveProps(b2, M2), !h2.__e && null != h2.shouldComponentUpdate && false === h2.shouldComponentUpdate(b2, h2.__s, M2) || u2.__v == t2.__v) {
        for (u2.__v != t2.__v && (h2.props = b2, h2.state = h2.__s, h2.__d = false), u2.__e = t2.__e, u2.__k = t2.__k, u2.__k.some(function(n3) {
          n3 && (n3.__ = u2);
        }), $2 = 0; $2 < h2._sb.length; $2++) h2.__h.push(h2._sb[$2]);
        h2._sb = [], h2.__h.length && e2.push(h2);
        break n;
      }
      null != h2.componentWillUpdate && h2.componentWillUpdate(b2, h2.__s, M2), S2 && null != h2.componentDidUpdate && h2.__h.push(function() {
        h2.componentDidUpdate(v2, y2, _2);
      });
    }
    if (h2.context = M2, h2.props = b2, h2.__P = n2, h2.__e = false, P2 = l$2.__r, A2 = 0, S2) {
      for (h2.state = h2.__s, h2.__d = false, P2 && P2(u2), a2 = h2.render(h2.props, h2.state, h2.context), H2 = 0; H2 < h2._sb.length; H2++) h2.__h.push(h2._sb[H2]);
      h2._sb = [];
    } else do {
      h2.__d = false, P2 && P2(u2), a2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
    } while (h2.__d && ++A2 < 25);
    h2.state = h2.__s, null != h2.getChildContext && (i2 = d$2(d$2({}, i2), h2.getChildContext())), S2 && !p2 && null != h2.getSnapshotBeforeUpdate && (_2 = h2.getSnapshotBeforeUpdate(v2, y2)), L2 = a2, null != a2 && a2.type === k$2 && null == a2.key && (L2 = V$2(a2.props.children)), f2 = I$1(n2, w$2(L2) ? L2 : [L2], u2, t2, i2, r2, o2, e2, f2, c2, s2), h2.base = u2.__e, u2.__u &= -161, h2.__h.length && e2.push(h2), m2 && (h2.__E = h2.__ = null);
  } catch (n3) {
    if (u2.__v = null, c2 || null != o2) if (n3.then) {
      for (u2.__u |= c2 ? 160 : 128; f2 && 8 == f2.nodeType && f2.nextSibling; ) f2 = f2.nextSibling;
      o2[o2.indexOf(f2)] = null, u2.__e = f2;
    } else {
      for (T2 = o2.length; T2--; ) g$2(o2[T2]);
      z$2(u2);
    }
    else u2.__e = t2.__e, u2.__k = t2.__k, n3.then || z$2(u2);
    l$2.__e(n3, u2, t2);
  }
  else null == o2 && u2.__v == t2.__v ? (u2.__k = t2.__k, u2.__e = t2.__e) : f2 = u2.__e = q$3(t2.__e, u2, t2, i2, r2, o2, e2, c2, s2);
  return (a2 = l$2.diffed) && a2(u2), 128 & u2.__u ? void 0 : f2;
}
function z$2(n2) {
  n2 && n2.__c && (n2.__c.__e = true), n2 && n2.__k && n2.__k.forEach(z$2);
}
function N$2(n2, u2, t2) {
  for (var i2 = 0; i2 < t2.length; i2++) B$3(t2[i2], t2[++i2], t2[++i2]);
  l$2.__c && l$2.__c(u2, n2), n2.some(function(u3) {
    try {
      n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
        n3.call(u3);
      });
    } catch (n3) {
      l$2.__e(n3, u3.__v);
    }
  });
}
function V$2(n2) {
  return "object" != typeof n2 || null == n2 || n2.__b && n2.__b > 0 ? n2 : w$2(n2) ? n2.map(V$2) : d$2({}, n2);
}
function q$3(u2, t2, i2, r2, o2, e2, f2, c2, s2) {
  var a2, h2, v2, y2, d2, _2, m2, b2 = i2.props, k2 = t2.props, x2 = t2.type;
  if ("svg" == x2 ? o2 = "http://www.w3.org/2000/svg" : "math" == x2 ? o2 = "http://www.w3.org/1998/Math/MathML" : o2 || (o2 = "http://www.w3.org/1999/xhtml"), null != e2) {
    for (a2 = 0; a2 < e2.length; a2++) if ((d2 = e2[a2]) && "setAttribute" in d2 == !!x2 && (x2 ? d2.localName == x2 : 3 == d2.nodeType)) {
      u2 = d2, e2[a2] = null;
      break;
    }
  }
  if (null == u2) {
    if (null == x2) return document.createTextNode(k2);
    u2 = document.createElementNS(o2, x2, k2.is && k2), c2 && (l$2.__m && l$2.__m(t2, e2), c2 = false), e2 = null;
  }
  if (null == x2) b2 === k2 || c2 && u2.data == k2 || (u2.data = k2);
  else {
    if (e2 = e2 && n$1.call(u2.childNodes), b2 = i2.props || p$2, !c2 && null != e2) for (b2 = {}, a2 = 0; a2 < u2.attributes.length; a2++) b2[(d2 = u2.attributes[a2]).name] = d2.value;
    for (a2 in b2) if (d2 = b2[a2], "children" == a2) ;
    else if ("dangerouslySetInnerHTML" == a2) v2 = d2;
    else if (!(a2 in k2)) {
      if ("value" == a2 && "defaultValue" in k2 || "checked" == a2 && "defaultChecked" in k2) continue;
      j$3(u2, a2, null, d2, o2);
    }
    for (a2 in k2) d2 = k2[a2], "children" == a2 ? y2 = d2 : "dangerouslySetInnerHTML" == a2 ? h2 = d2 : "value" == a2 ? _2 = d2 : "checked" == a2 ? m2 = d2 : c2 && "function" != typeof d2 || b2[a2] === d2 || j$3(u2, a2, d2, b2[a2], o2);
    if (h2) c2 || v2 && (h2.__html == v2.__html || h2.__html == u2.innerHTML) || (u2.innerHTML = h2.__html), t2.__k = [];
    else if (v2 && (u2.innerHTML = ""), I$1("template" == t2.type ? u2.content : u2, w$2(y2) ? y2 : [y2], t2, i2, r2, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o2, e2, f2, e2 ? e2[0] : i2.__k && S$1(i2, 0), c2, s2), null != e2) for (a2 = e2.length; a2--; ) g$2(e2[a2]);
    c2 || (a2 = "value", "progress" == x2 && null == _2 ? u2.removeAttribute("value") : null != _2 && (_2 !== u2[a2] || "progress" == x2 && !_2 || "option" == x2 && _2 != b2[a2]) && j$3(u2, a2, _2, b2[a2], o2), a2 = "checked", null != m2 && m2 != u2[a2] && j$3(u2, a2, m2, b2[a2], o2));
  }
  return u2;
}
function B$3(n2, u2, t2) {
  try {
    if ("function" == typeof n2) {
      var i2 = "function" == typeof n2.__u;
      i2 && n2.__u(), i2 && null == u2 || (n2.__u = n2(u2));
    } else n2.current = u2;
  } catch (n3) {
    l$2.__e(n3, t2);
  }
}
function D$2(n2, u2, t2) {
  var i2, r2;
  if (l$2.unmount && l$2.unmount(n2), (i2 = n2.ref) && (i2.current && i2.current != n2.__e || B$3(i2, null, u2)), null != (i2 = n2.__c)) {
    if (i2.componentWillUnmount) try {
      i2.componentWillUnmount();
    } catch (n3) {
      l$2.__e(n3, u2);
    }
    i2.base = i2.__P = null;
  }
  if (i2 = n2.__k) for (r2 = 0; r2 < i2.length; r2++) i2[r2] && D$2(i2[r2], u2, t2 || "function" != typeof n2.type);
  t2 || g$2(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
}
function E$2(n2, l2, u2) {
  return this.constructor(n2, u2);
}
function G$1(u2, t2, i2) {
  var r2, o2, e2, f2;
  t2 == document && (t2 = document.documentElement), l$2.__ && l$2.__(u2, t2), o2 = (r2 = false) ? null : t2.__k, e2 = [], f2 = [], O$1(t2, u2 = t2.__k = _$1(k$2, null, [u2]), o2 || p$2, p$2, t2.namespaceURI, o2 ? null : t2.firstChild ? n$1.call(t2.childNodes) : null, e2, o2 ? o2.__e : t2.firstChild, r2, f2), N$2(e2, u2, f2);
}
function K$2(l2, u2, t2) {
  var i2, r2, o2, e2, f2 = d$2({}, l2.props);
  for (o2 in l2.type && l2.type.defaultProps && (e2 = l2.type.defaultProps), u2) "key" == o2 ? i2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : f2[o2] = void 0 === u2[o2] && null != e2 ? e2[o2] : u2[o2];
  return arguments.length > 2 && (f2.children = arguments.length > 3 ? n$1.call(arguments, 2) : t2), m$2(l2.type, f2, i2 || l2.key, r2 || l2.ref, null);
}
n$1 = v$2.slice, l$2 = { __e: function(n2, l2, u2, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, u$3 = 0, x.prototype.setState = function(n2, l2) {
  var u2;
  u2 = null != this.__s && this.__s != this.state ? this.__s : this.__s = d$2({}, this.state), "function" == typeof n2 && (n2 = n2(d$2({}, u2), this.props)), n2 && d$2(u2, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), M$1(this));
}, x.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), M$1(this));
}, x.prototype.render = k$2, i$2 = [], o$2 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$2 = function(n2, l2) {
  return n2.__v.__b - l2.__v.__b;
}, $$1.__r = 0, f$3 = /(PointerCapture)$|Capture$/i, c$2 = 0, s$2 = F$2(false), a$2 = F$2(true);
var t$1, r$1, u$2, i$1, o$1 = 0, f$2 = [], c$1 = l$2, e$1 = c$1.__b, a$1 = c$1.__r, v$1 = c$1.diffed, l$1 = c$1.__c, m$1 = c$1.unmount, s$1 = c$1.__;
function p$1(n2, t2) {
  c$1.__h && c$1.__h(r$1, n2, o$1 || t2), o$1 = 0;
  var u2 = r$1.__H || (r$1.__H = { __: [], __h: [] });
  return n2 >= u2.__.length && u2.__.push({}), u2.__[n2];
}
function d$1(n2) {
  return o$1 = 1, h$1(D$1, n2);
}
function h$1(n2, u2, i2) {
  var o2 = p$1(t$1++, 2);
  if (o2.t = n2, !o2.__c && (o2.__ = [i2 ? i2(u2) : D$1(void 0, u2), function(n3) {
    var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n3);
    t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
  }], o2.__c = r$1, !r$1.__f)) {
    var f2 = function(n3, t2, r2) {
      if (!o2.__c.__H) return true;
      var u3 = o2.__c.__H.__.filter(function(n4) {
        return !!n4.__c;
      });
      if (u3.every(function(n4) {
        return !n4.__N;
      })) return !c2 || c2.call(this, n3, t2, r2);
      var i3 = o2.__c.props !== n3;
      return u3.forEach(function(n4) {
        if (n4.__N) {
          var t3 = n4.__[0];
          n4.__ = n4.__N, n4.__N = void 0, t3 !== n4.__[0] && (i3 = true);
        }
      }), c2 && c2.call(this, n3, t2, r2) || i3;
    };
    r$1.__f = true;
    var c2 = r$1.shouldComponentUpdate, e2 = r$1.componentWillUpdate;
    r$1.componentWillUpdate = function(n3, t2, r2) {
      if (this.__e) {
        var u3 = c2;
        c2 = void 0, f2(n3, t2, r2), c2 = u3;
      }
      e2 && e2.call(this, n3, t2, r2);
    }, r$1.shouldComponentUpdate = f2;
  }
  return o2.__N || o2.__;
}
function y$1(n2, u2) {
  var i2 = p$1(t$1++, 3);
  !c$1.__s && C(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r$1.__H.__h.push(i2));
}
function A$1(n2) {
  return o$1 = 5, T$2(function() {
    return { current: n2 };
  }, []);
}
function T$2(n2, r2) {
  var u2 = p$1(t$1++, 7);
  return C(u2.__H, r2) && (u2.__ = n2(), u2.__H = r2, u2.__h = n2), u2.__;
}
function q$2(n2, t2) {
  return o$1 = 8, T$2(function() {
    return n2;
  }, t2);
}
function j$2() {
  for (var n2; n2 = f$2.shift(); ) if (n2.__P && n2.__H) try {
    n2.__H.__h.forEach(z$1), n2.__H.__h.forEach(B$2), n2.__H.__h = [];
  } catch (t2) {
    n2.__H.__h = [], c$1.__e(t2, n2.__v);
  }
}
c$1.__b = function(n2) {
  r$1 = null, e$1 && e$1(n2);
}, c$1.__ = function(n2, t2) {
  n2 && t2.__k && t2.__k.__m && (n2.__m = t2.__k.__m), s$1 && s$1(n2, t2);
}, c$1.__r = function(n2) {
  a$1 && a$1(n2), t$1 = 0;
  var i2 = (r$1 = n2.__c).__H;
  i2 && (u$2 === r$1 ? (i2.__h = [], r$1.__h = [], i2.__.forEach(function(n3) {
    n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
  })) : (i2.__h.forEach(z$1), i2.__h.forEach(B$2), i2.__h = [], t$1 = 0)), u$2 = r$1;
}, c$1.diffed = function(n2) {
  v$1 && v$1(n2);
  var t2 = n2.__c;
  t2 && t2.__H && (t2.__H.__h.length && (1 !== f$2.push(t2) && i$1 === c$1.requestAnimationFrame || ((i$1 = c$1.requestAnimationFrame) || w$1)(j$2)), t2.__H.__.forEach(function(n3) {
    n3.u && (n3.__H = n3.u), n3.u = void 0;
  })), u$2 = r$1 = null;
}, c$1.__c = function(n2, t2) {
  t2.some(function(n3) {
    try {
      n3.__h.forEach(z$1), n3.__h = n3.__h.filter(function(n4) {
        return !n4.__ || B$2(n4);
      });
    } catch (r2) {
      t2.some(function(n4) {
        n4.__h && (n4.__h = []);
      }), t2 = [], c$1.__e(r2, n3.__v);
    }
  }), l$1 && l$1(n2, t2);
}, c$1.unmount = function(n2) {
  m$1 && m$1(n2);
  var t2, r2 = n2.__c;
  r2 && r2.__H && (r2.__H.__.forEach(function(n3) {
    try {
      z$1(n3);
    } catch (n4) {
      t2 = n4;
    }
  }), r2.__H = void 0, t2 && c$1.__e(t2, r2.__v));
};
var k$1 = "function" == typeof requestAnimationFrame;
function w$1(n2) {
  var t2, r2 = function() {
    clearTimeout(u2), k$1 && cancelAnimationFrame(t2), setTimeout(n2);
  }, u2 = setTimeout(r2, 35);
  k$1 && (t2 = requestAnimationFrame(r2));
}
function z$1(n2) {
  var t2 = r$1, u2 = n2.__c;
  "function" == typeof u2 && (n2.__c = void 0, u2()), r$1 = t2;
}
function B$2(n2) {
  var t2 = r$1;
  n2.__c = n2.__(), r$1 = t2;
}
function C(n2, t2) {
  return !n2 || n2.length !== t2.length || t2.some(function(t3, r2) {
    return t3 !== n2[r2];
  });
}
function D$1(n2, t2) {
  return "function" == typeof t2 ? t2(n2) : t2;
}
function g$1(n2, t2) {
  for (var e2 in t2) n2[e2] = t2[e2];
  return n2;
}
function E$1(n2, t2) {
  for (var e2 in n2) if ("__source" !== e2 && !(e2 in t2)) return true;
  for (var r2 in t2) if ("__source" !== r2 && n2[r2] !== t2[r2]) return true;
  return false;
}
function N$1(n2, t2) {
  this.props = n2, this.context = t2;
}
(N$1.prototype = new x()).isPureReactComponent = true, N$1.prototype.shouldComponentUpdate = function(n2, t2) {
  return E$1(this.props, n2) || E$1(this.state, t2);
};
var T$1 = l$2.__b;
l$2.__b = function(n2) {
  n2.type && n2.type.__f && n2.ref && (n2.props.ref = n2.ref, n2.ref = null), T$1 && T$1(n2);
};
var F$1 = l$2.__e;
l$2.__e = function(n2, t2, e2, r2) {
  if (n2.then) {
    for (var u2, o2 = t2; o2 = o2.__; ) if ((u2 = o2.__c) && u2.__c) return null == t2.__e && (t2.__e = e2.__e, t2.__k = e2.__k), u2.__c(n2, t2);
  }
  F$1(n2, t2, e2, r2);
};
var U = l$2.unmount;
function V$1(n2, t2, e2) {
  return n2 && (n2.__c && n2.__c.__H && (n2.__c.__H.__.forEach(function(n3) {
    "function" == typeof n3.__c && n3.__c();
  }), n2.__c.__H = null), null != (n2 = g$1({}, n2)).__c && (n2.__c.__P === e2 && (n2.__c.__P = t2), n2.__c.__e = true, n2.__c = null), n2.__k = n2.__k && n2.__k.map(function(n3) {
    return V$1(n3, t2, e2);
  })), n2;
}
function W$1(n2, t2, e2) {
  return n2 && e2 && (n2.__v = null, n2.__k = n2.__k && n2.__k.map(function(n3) {
    return W$1(n3, t2, e2);
  }), n2.__c && n2.__c.__P === t2 && (n2.__e && e2.appendChild(n2.__e), n2.__c.__e = true, n2.__c.__P = e2)), n2;
}
function P$1() {
  this.__u = 0, this.o = null, this.__b = null;
}
function j$1(n2) {
  var t2 = n2.__.__c;
  return t2 && t2.__a && t2.__a(n2);
}
function B$1() {
  this.i = null, this.l = null;
}
l$2.unmount = function(n2) {
  var t2 = n2.__c;
  t2 && t2.__R && t2.__R(), t2 && 32 & n2.__u && (n2.type = null), U && U(n2);
}, (P$1.prototype = new x()).__c = function(n2, t2) {
  var e2 = t2.__c, r2 = this;
  null == r2.o && (r2.o = []), r2.o.push(e2);
  var u2 = j$1(r2.__v), o2 = false, i2 = function() {
    o2 || (o2 = true, e2.__R = null, u2 ? u2(l2) : l2());
  };
  e2.__R = i2;
  var l2 = function() {
    if (!--r2.__u) {
      if (r2.state.__a) {
        var n3 = r2.state.__a;
        r2.__v.__k[0] = W$1(n3, n3.__c.__P, n3.__c.__O);
      }
      var t3;
      for (r2.setState({ __a: r2.__b = null }); t3 = r2.o.pop(); ) t3.forceUpdate();
    }
  };
  r2.__u++ || 32 & t2.__u || r2.setState({ __a: r2.__b = r2.__v.__k[0] }), n2.then(i2, i2);
}, P$1.prototype.componentWillUnmount = function() {
  this.o = [];
}, P$1.prototype.render = function(n2, e2) {
  if (this.__b) {
    if (this.__v.__k) {
      var r2 = document.createElement("div"), o2 = this.__v.__k[0].__c;
      this.__v.__k[0] = V$1(this.__b, r2, o2.__O = o2.__P);
    }
    this.__b = null;
  }
  var i2 = e2.__a && _$1(k$2, null, n2.fallback);
  return i2 && (i2.__u &= -33), [_$1(k$2, null, e2.__a ? null : n2.children), i2];
};
var H$1 = function(n2, t2, e2) {
  if (++e2[1] === e2[0] && n2.l.delete(t2), n2.props.revealOrder && ("t" !== n2.props.revealOrder[0] || !n2.l.size)) for (e2 = n2.i; e2; ) {
    for (; e2.length > 3; ) e2.pop()();
    if (e2[1] < e2[0]) break;
    n2.i = e2 = e2[2];
  }
};
(B$1.prototype = new x()).__a = function(n2) {
  var t2 = this, e2 = j$1(t2.__v), r2 = t2.l.get(n2);
  return r2[0]++, function(u2) {
    var o2 = function() {
      t2.props.revealOrder ? (r2.push(u2), H$1(t2, n2, r2)) : u2();
    };
    e2 ? e2(o2) : o2();
  };
}, B$1.prototype.render = function(n2) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t2 = H$2(n2.children);
  n2.revealOrder && "b" === n2.revealOrder[0] && t2.reverse();
  for (var e2 = t2.length; e2--; ) this.l.set(t2[e2], this.i = [1, 0, this.i]);
  return n2.children;
}, B$1.prototype.componentDidUpdate = B$1.prototype.componentDidMount = function() {
  var n2 = this;
  this.l.forEach(function(t2, e2) {
    H$1(n2, e2, t2);
  });
};
var q$1 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, G = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, J$1 = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, K$1 = /[A-Z0-9]/g, Q$1 = "undefined" != typeof document, X$1 = function(n2) {
  return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n2);
};
function nn(n2, t2, e2) {
  return null == t2.__k && (t2.textContent = ""), G$1(n2, t2), "function" == typeof e2 && e2(), n2 ? n2.__c : null;
}
x.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t2) {
  Object.defineProperty(x.prototype, t2, { configurable: true, get: function() {
    return this["UNSAFE_" + t2];
  }, set: function(n2) {
    Object.defineProperty(this, t2, { configurable: true, writable: true, value: n2 });
  } });
});
var en = l$2.event;
function rn() {
}
function un() {
  return this.cancelBubble;
}
function on() {
  return this.defaultPrevented;
}
l$2.event = function(n2) {
  return en && (n2 = en(n2)), n2.persist = rn, n2.isPropagationStopped = un, n2.isDefaultPrevented = on, n2.nativeEvent = n2;
};
var cn = { enumerable: false, configurable: true, get: function() {
  return this.class;
} }, fn = l$2.vnode;
l$2.vnode = function(n2) {
  "string" == typeof n2.type && function(n3) {
    var t2 = n3.props, e2 = n3.type, u2 = {}, o2 = -1 === e2.indexOf("-");
    for (var i2 in t2) {
      var l2 = t2[i2];
      if (!("value" === i2 && "defaultValue" in t2 && null == l2 || Q$1 && "children" === i2 && "noscript" === e2 || "class" === i2 || "className" === i2)) {
        var c2 = i2.toLowerCase();
        "defaultValue" === i2 && "value" in t2 && null == t2.value ? i2 = "value" : "download" === i2 && true === l2 ? l2 = "" : "translate" === c2 && "no" === l2 ? l2 = false : "o" === c2[0] && "n" === c2[1] ? "ondoubleclick" === c2 ? i2 = "ondblclick" : "onchange" !== c2 || "input" !== e2 && "textarea" !== e2 || X$1(t2.type) ? "onfocus" === c2 ? i2 = "onfocusin" : "onblur" === c2 ? i2 = "onfocusout" : J$1.test(i2) && (i2 = c2) : c2 = i2 = "oninput" : o2 && G.test(i2) ? i2 = i2.replace(K$1, "-$&").toLowerCase() : null === l2 && (l2 = void 0), "oninput" === c2 && u2[i2 = c2] && (i2 = "oninputCapture"), u2[i2] = l2;
      }
    }
    "select" == e2 && u2.multiple && Array.isArray(u2.value) && (u2.value = H$2(t2.children).forEach(function(n4) {
      n4.props.selected = -1 != u2.value.indexOf(n4.props.value);
    })), "select" == e2 && null != u2.defaultValue && (u2.value = H$2(t2.children).forEach(function(n4) {
      n4.props.selected = u2.multiple ? -1 != u2.defaultValue.indexOf(n4.props.value) : u2.defaultValue == n4.props.value;
    })), t2.class && !t2.className ? (u2.class = t2.class, Object.defineProperty(u2, "className", cn)) : (t2.className && !t2.class || t2.class && t2.className) && (u2.class = u2.className = t2.className), n3.props = u2;
  }(n2), n2.$$typeof = q$1, fn && fn(n2);
};
var an = l$2.__r;
l$2.__r = function(n2) {
  an && an(n2), n2.__c;
};
var sn = l$2.diffed;
l$2.diffed = function(n2) {
  sn && sn(n2);
  var t2 = n2.props, e2 = n2.__e;
  null != e2 && "textarea" === n2.type && "value" in t2 && t2.value !== e2.value && (e2.value = null == t2.value ? "" : t2.value);
};
function debounce$3(fn2) {
  let calling = null;
  let latestArgs;
  return (...args) => {
    latestArgs = args;
    if (!calling) {
      calling = Promise.resolve().then(() => {
        calling = null;
        return fn2(...latestArgs);
      });
    }
    return calling;
  };
}
class UIPlugin extends BasePlugin {
  #updateUI;
  isTargetDOMEl;
  el;
  parent;
  title;
  getTargetPlugin(target) {
    let targetPlugin;
    if (typeof target?.addTarget === "function") {
      targetPlugin = target;
      if (!(targetPlugin instanceof UIPlugin)) {
        console.warn(new Error("The provided plugin is not an instance of UIPlugin. This is an indication of a bug with the way Uppy is bundled.", { cause: { targetPlugin, UIPlugin } }));
      }
    } else if (typeof target === "function") {
      const Target = target;
      this.uppy.iteratePlugins((p2) => {
        if (p2 instanceof Target) {
          targetPlugin = p2;
        }
      });
    }
    return targetPlugin;
  }
  /**
   * Check if supplied `target` is a DOM element or an `object`.
   * If it’s an object — target is a plugin, and we search `plugins`
   * for a plugin with same name and return its target.
   */
  mount(target, plugin) {
    const callerPluginName = plugin.id;
    const targetElement = findDOMElement(target);
    if (targetElement) {
      this.isTargetDOMEl = true;
      const uppyRootElement = document.createElement("div");
      uppyRootElement.classList.add("uppy-Root");
      this.#updateUI = debounce$3((state) => {
        if (!this.uppy.getPlugin(this.id))
          return;
        nn(this.render(state, uppyRootElement), uppyRootElement);
        this.afterUpdate();
      });
      this.uppy.log(`Installing ${callerPluginName} to a DOM element '${target}'`);
      if (this.opts.replaceTargetContent) {
        targetElement.innerHTML = "";
      }
      nn(this.render(this.uppy.getState(), uppyRootElement), uppyRootElement);
      this.el = uppyRootElement;
      targetElement.appendChild(uppyRootElement);
      uppyRootElement.dir = this.opts.direction || getTextDirection(uppyRootElement) || "ltr";
      this.onMount();
      return this.el;
    }
    const targetPlugin = this.getTargetPlugin(target);
    if (targetPlugin) {
      this.uppy.log(`Installing ${callerPluginName} to ${targetPlugin.id}`);
      this.parent = targetPlugin;
      this.el = targetPlugin.addTarget(plugin);
      this.onMount();
      return this.el;
    }
    this.uppy.log(`Not installing ${callerPluginName}`);
    let message = `Invalid target option given to ${callerPluginName}.`;
    if (typeof target === "function") {
      message += " The given target is not a Plugin class. Please check that you're not specifying a React Component instead of a plugin. If you are using @uppy/* packages directly, make sure you have only 1 version of @uppy/core installed: run `npm ls @uppy/core` on the command line and verify that all the versions match and are deduped correctly.";
    } else {
      message += "If you meant to target an HTML element, please make sure that the element exists. Check that the <script> tag initializing Uppy is right before the closing </body> tag at the end of the page. (see https://github.com/transloadit/uppy/issues/1042)\n\nIf you meant to target a plugin, please confirm that your `import` statements or `require` calls are correct.";
    }
    throw new Error(message);
  }
  /**
   * Called when plugin is mounted, whether in DOM or into another plugin.
   * Needed because sometimes plugins are mounted separately/after `install`,
   * so this.el and this.parent might not be available in `install`.
   * This is the case with @uppy/react plugins, for example.
   */
  render(state, container) {
    throw new Error("Extend the render method to add your plugin to a DOM element");
  }
  update(state) {
    if (this.el != null) {
      this.#updateUI?.(state);
    }
  }
  unmount() {
    if (this.isTargetDOMEl) {
      this.el?.remove();
    }
    this.onUnmount();
  }
  onMount() {
  }
  onUnmount() {
  }
}
const version$8 = "4.3.2";
const packageJson$8 = {
  version: version$8
};
class DefaultStore {
  static VERSION = packageJson$8.version;
  state = {};
  #callbacks = /* @__PURE__ */ new Set();
  getState() {
    return this.state;
  }
  setState(patch) {
    const prevState = { ...this.state };
    const nextState = { ...this.state, ...patch };
    this.state = nextState;
    this.#publish(prevState, nextState, patch);
  }
  subscribe(listener) {
    this.#callbacks.add(listener);
    return () => {
      this.#callbacks.delete(listener);
    };
  }
  #publish(...args) {
    this.#callbacks.forEach((listener) => {
      listener(...args);
    });
  }
}
function getFileNameAndExtension(fullFileName) {
  const lastDot = fullFileName.lastIndexOf(".");
  if (lastDot === -1 || lastDot === fullFileName.length - 1) {
    return {
      name: fullFileName,
      extension: void 0
    };
  }
  return {
    name: fullFileName.slice(0, lastDot),
    extension: fullFileName.slice(lastDot + 1)
  };
}
const mimeTypes = {
  __proto__: null,
  md: "text/markdown",
  markdown: "text/markdown",
  mp4: "video/mp4",
  mp3: "audio/mp3",
  svg: "image/svg+xml",
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  heic: "image/heic",
  heif: "image/heif",
  yaml: "text/yaml",
  yml: "text/yaml",
  csv: "text/csv",
  tsv: "text/tab-separated-values",
  tab: "text/tab-separated-values",
  avi: "video/x-msvideo",
  mks: "video/x-matroska",
  mkv: "video/x-matroska",
  mov: "video/quicktime",
  dicom: "application/dicom",
  doc: "application/msword",
  msg: "application/vnd.ms-outlook",
  docm: "application/vnd.ms-word.document.macroenabled.12",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  dot: "application/msword",
  dotm: "application/vnd.ms-word.template.macroenabled.12",
  dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
  xla: "application/vnd.ms-excel",
  xlam: "application/vnd.ms-excel.addin.macroenabled.12",
  xlc: "application/vnd.ms-excel",
  xlf: "application/x-xliff+xml",
  xlm: "application/vnd.ms-excel",
  xls: "application/vnd.ms-excel",
  xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
  xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xlt: "application/vnd.ms-excel",
  xltm: "application/vnd.ms-excel.template.macroenabled.12",
  xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  xlw: "application/vnd.ms-excel",
  txt: "text/plain",
  text: "text/plain",
  conf: "text/plain",
  log: "text/plain",
  pdf: "application/pdf",
  zip: "application/zip",
  "7z": "application/x-7z-compressed",
  rar: "application/x-rar-compressed",
  tar: "application/x-tar",
  gz: "application/gzip",
  dmg: "application/x-apple-diskimage"
};
function getFileType(file) {
  if (file.type)
    return file.type;
  const fileExtension = file.name ? getFileNameAndExtension(file.name).extension?.toLowerCase() : null;
  if (fileExtension && fileExtension in mimeTypes) {
    return mimeTypes[fileExtension];
  }
  return "application/octet-stream";
}
function encodeCharacter(character) {
  return character.charCodeAt(0).toString(32);
}
function encodeFilename(name) {
  let suffix = "";
  return name.replace(/[^A-Z0-9]/gi, (character) => {
    suffix += `-${encodeCharacter(character)}`;
    return "/";
  }) + suffix;
}
function generateFileID(file, instanceId) {
  let id = instanceId || "uppy";
  if (typeof file.name === "string") {
    id += `-${encodeFilename(file.name.toLowerCase())}`;
  }
  if (file.type !== void 0) {
    id += `-${file.type}`;
  }
  if (file.meta && typeof file.meta.relativePath === "string") {
    id += `-${encodeFilename(file.meta.relativePath.toLowerCase())}`;
  }
  if (file.data.size !== void 0) {
    id += `-${file.data.size}`;
  }
  if (file.data.lastModified !== void 0) {
    id += `-${file.data.lastModified}`;
  }
  return id;
}
function hasFileStableId(file) {
  if (!file.isRemote || !file.remote)
    return false;
  const stableIdProviders = /* @__PURE__ */ new Set([
    "box",
    "dropbox",
    "drive",
    "facebook",
    "unsplash"
  ]);
  return stableIdProviders.has(file.remote.provider);
}
function getSafeFileId(file, instanceId) {
  if (hasFileStableId(file))
    return file.id;
  const fileType = getFileType(file);
  return generateFileID({
    ...file,
    type: fileType
  }, instanceId);
}
function isObject$3(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_1 = isObject$3;
var freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal$1;
var freeGlobal = _freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root$2 = freeGlobal || freeSelf || Function("return this")();
var _root = root$2;
var root$1 = _root;
var now$1 = function() {
  return root$1.Date.now();
};
var now_1 = now$1;
var reWhitespace = /\s/;
function trimmedEndIndex$1(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var _trimmedEndIndex = trimmedEndIndex$1;
var trimmedEndIndex = _trimmedEndIndex;
var reTrimStart = /^\s+/;
function baseTrim$1(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
var _baseTrim = baseTrim$1;
var root = _root;
var Symbol$3 = root.Symbol;
var _Symbol = Symbol$3;
var Symbol$2 = _Symbol;
var objectProto$1 = Object.prototype;
var hasOwnProperty = objectProto$1.hasOwnProperty;
var nativeObjectToString$1 = objectProto$1.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag$1(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e2) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var _getRawTag = getRawTag$1;
var objectProto = Object.prototype;
var nativeObjectToString = objectProto.toString;
function objectToString$2(value) {
  return nativeObjectToString.call(value);
}
var _objectToString = objectToString$2;
var Symbol$1 = _Symbol, getRawTag = _getRawTag, objectToString$1 = _objectToString;
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
function baseGetTag$1(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString$1(value);
}
var _baseGetTag = baseGetTag$1;
function isObjectLike$1(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike$1;
var baseGetTag = _baseGetTag, isObjectLike = isObjectLike_1;
var symbolTag = "[object Symbol]";
function isSymbol$1(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
var isSymbol_1 = isSymbol$1;
var baseTrim = _baseTrim, isObject$2 = isObject_1, isSymbol = isSymbol_1;
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber$1(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$2(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject$2(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var toNumber_1 = toNumber$1;
var isObject$1 = isObject_1, now = now_1, toNumber = toNumber_1;
var FUNC_ERROR_TEXT$1 = "Expected a function";
var nativeMax = Math.max, nativeMin = Math.min;
function debounce$1(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber(wait) || 0;
  if (isObject$1(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now());
  }
  function debounced() {
    var time = now(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
var debounce_1 = debounce$1;
const debounce$2 = /* @__PURE__ */ getDefaultExportFromCjs(debounce_1);
var debounce = debounce_1, isObject = isObject_1;
var FUNC_ERROR_TEXT = "Expected a function";
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
var throttle_1 = throttle;
const throttle$1 = /* @__PURE__ */ getDefaultExportFromCjs(throttle_1);
var namespaceEmitter = function createNamespaceEmitter() {
  var emitter = {};
  var _fns = emitter._fns = {};
  emitter.emit = function emit(event, arg1, arg2, arg3, arg4, arg5, arg6) {
    var toEmit = getListeners(event);
    if (toEmit.length) {
      emitAll(event, toEmit, [arg1, arg2, arg3, arg4, arg5, arg6]);
    }
  };
  emitter.on = function on2(event, fn2) {
    if (!_fns[event]) {
      _fns[event] = [];
    }
    _fns[event].push(fn2);
  };
  emitter.once = function once(event, fn2) {
    function one() {
      fn2.apply(this, arguments);
      emitter.off(event, one);
    }
    this.on(event, one);
  };
  emitter.off = function off(event, fn2) {
    var keep = [];
    if (event && fn2) {
      var fns = this._fns[event];
      var i2 = 0;
      var l2 = fns ? fns.length : 0;
      for (i2; i2 < l2; i2++) {
        if (fns[i2] !== fn2) {
          keep.push(fns[i2]);
        }
      }
    }
    keep.length ? this._fns[event] = keep : delete this._fns[event];
  };
  function getListeners(e2) {
    var out = _fns[e2] ? _fns[e2] : [];
    var idx = e2.indexOf(":");
    var args = idx === -1 ? [e2] : [e2.substring(0, idx), e2.substring(idx + 1)];
    var keys = Object.keys(_fns);
    var i2 = 0;
    var l2 = keys.length;
    for (i2; i2 < l2; i2++) {
      var key = keys[i2];
      if (key === "*") {
        out = out.concat(_fns[key]);
      }
      if (args.length === 2 && args[0] === key) {
        out = out.concat(_fns[key]);
        break;
      }
    }
    return out;
  }
  function emitAll(e2, fns, args) {
    var i2 = 0;
    var l2 = fns.length;
    for (i2; i2 < l2; i2++) {
      if (!fns[i2]) break;
      fns[i2].event = e2;
      fns[i2].apply(fns[i2], args);
    }
  }
  return emitter;
};
const ee$1 = /* @__PURE__ */ getDefaultExportFromCjs(namespaceEmitter);
let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let nanoid = (size = 21) => {
  let id = "";
  let i2 = size | 0;
  while (i2--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
};
const version$7 = "4.5.2";
const packageJson$7 = {
  version: version$7
};
function getFileName(fileType, fileDescriptor) {
  if (fileDescriptor.name) {
    return fileDescriptor.name;
  }
  if (fileType.split("/")[0] === "image") {
    return `${fileType.split("/")[0]}.${fileType.split("/")[1]}`;
  }
  return "noname";
}
const locale$4 = {
  strings: {
    addBulkFilesFailed: {
      0: "Failed to add %{smart_count} file due to an internal error",
      1: "Failed to add %{smart_count} files due to internal errors"
    },
    youCanOnlyUploadX: {
      0: "You can only upload %{smart_count} file",
      1: "You can only upload %{smart_count} files"
    },
    youHaveToAtLeastSelectX: {
      0: "You have to select at least %{smart_count} file",
      1: "You have to select at least %{smart_count} files"
    },
    aggregateExceedsSize: "You selected %{size} of files, but maximum allowed size is %{sizeAllowed}",
    exceedsSize: "%{file} exceeds maximum allowed size of %{size}",
    missingRequiredMetaField: "Missing required meta fields",
    missingRequiredMetaFieldOnFile: "Missing required meta fields in %{fileName}",
    inferiorSize: "This file is smaller than the allowed size of %{size}",
    youCanOnlyUploadFileTypes: "You can only upload: %{types}",
    noMoreFilesAllowed: "Cannot add more files",
    noDuplicates: "Cannot add the duplicate file '%{fileName}', it already exists",
    companionError: "Connection with Companion failed",
    authAborted: "Authentication aborted",
    companionUnauthorizeHint: "To unauthorize to your %{provider} account, please go to %{url}",
    failedToUpload: "Failed to upload %{file}",
    noInternetConnection: "No Internet connection",
    connectedToInternet: "Connected to the Internet",
    // Strings for remote providers
    noFilesFound: "You have no files or folders here",
    noSearchResults: "Unfortunately, there are no results for this search",
    selectX: {
      0: "Select %{smart_count}",
      1: "Select %{smart_count}"
    },
    allFilesFromFolderNamed: "All files from folder %{name}",
    openFolderNamed: "Open folder %{name}",
    cancel: "Cancel",
    logOut: "Log out",
    logIn: "Log in",
    pickFiles: "Pick files",
    pickPhotos: "Pick photos",
    filter: "Filter",
    resetFilter: "Reset filter",
    loading: "Loading...",
    loadedXFiles: "Loaded %{numFiles} files",
    authenticateWithTitle: "Please authenticate with %{pluginName} to select files",
    authenticateWith: "Connect to %{pluginName}",
    signInWithGoogle: "Sign in with Google",
    searchImages: "Search for images",
    enterTextToSearch: "Enter text to search for images",
    search: "Search",
    resetSearch: "Reset search",
    emptyFolderAdded: "No files were added from empty folder",
    addedNumFiles: "Added %{numFiles} file(s)",
    folderAlreadyAdded: 'The folder "%{folder}" was already added',
    folderAdded: {
      0: "Added %{smart_count} file from %{folder}",
      1: "Added %{smart_count} files from %{folder}"
    },
    additionalRestrictionsFailed: "%{count} additional restrictions were not fulfilled",
    unnamed: "Unnamed",
    pleaseWait: "Please wait"
  }
};
var prettierBytes = function prettierBytes2(input) {
  if (typeof input !== "number" || Number.isNaN(input)) {
    throw new TypeError(`Expected a number, got ${typeof input}`);
  }
  const neg = input < 0;
  let num = Math.abs(input);
  if (neg) {
    num = -num;
  }
  if (num === 0) {
    return "0 B";
  }
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1024)), units.length - 1);
  const value = Number(num / 1024 ** exponent);
  const unit = units[exponent];
  return `${value >= 10 || value % 1 === 0 ? Math.round(value) : value.toFixed(1)} ${unit}`;
};
const prettierBytes$1 = /* @__PURE__ */ getDefaultExportFromCjs(prettierBytes);
function WildcardMatcher(text, separator2) {
  this.text = text = text || "";
  this.hasWild = ~text.indexOf("*");
  this.separator = separator2;
  this.parts = text.split(separator2);
}
WildcardMatcher.prototype.match = function(input) {
  var matches = true;
  var parts = this.parts;
  var ii;
  var partsCount = parts.length;
  var testParts;
  if (typeof input == "string" || input instanceof String) {
    if (!this.hasWild && this.text != input) {
      matches = false;
    } else {
      testParts = (input || "").split(this.separator);
      for (ii = 0; matches && ii < partsCount; ii++) {
        if (parts[ii] === "*") {
          continue;
        } else if (ii < testParts.length) {
          matches = parts[ii] === testParts[ii];
        } else {
          matches = false;
        }
      }
      matches = matches && testParts;
    }
  } else if (typeof input.splice == "function") {
    matches = [];
    for (ii = input.length; ii--; ) {
      if (this.match(input[ii])) {
        matches[matches.length] = input[ii];
      }
    }
  } else if (typeof input == "object") {
    matches = {};
    for (var key in input) {
      if (this.match(key)) {
        matches[key] = input[key];
      }
    }
  }
  return matches;
};
var wildcard$1 = function(text, test, separator2) {
  var matcher = new WildcardMatcher(text, separator2 || /[\/\.]/);
  if (typeof test != "undefined") {
    return matcher.match(test);
  }
  return matcher;
};
var wildcard = wildcard$1;
var reMimePartSplit = /[\/\+\.]/;
var mimeMatch = function(target, pattern) {
  function test(pattern2) {
    var result = wildcard(pattern2, target, reMimePartSplit);
    return result && result.length >= 2;
  }
  return pattern ? test(pattern.split(";")[0]) : test;
};
const match = /* @__PURE__ */ getDefaultExportFromCjs(mimeMatch);
const defaultOptions$6 = {
  maxFileSize: null,
  minFileSize: null,
  maxTotalFileSize: null,
  maxNumberOfFiles: null,
  minNumberOfFiles: null,
  allowedFileTypes: null,
  requiredMetaFields: []
};
class RestrictionError extends Error {
  isUserFacing;
  file;
  constructor(message, opts) {
    super(message);
    this.isUserFacing = opts?.isUserFacing ?? true;
    if (opts?.file) {
      this.file = opts.file;
    }
  }
  isRestriction = true;
}
class Restricter {
  getI18n;
  getOpts;
  constructor(getOpts, getI18n) {
    this.getI18n = getI18n;
    this.getOpts = () => {
      const opts = getOpts();
      if (opts.restrictions?.allowedFileTypes != null && !Array.isArray(opts.restrictions.allowedFileTypes)) {
        throw new TypeError("`restrictions.allowedFileTypes` must be an array");
      }
      return opts;
    };
  }
  // Because these operations are slow, we cannot run them for every file (if we are adding multiple files)
  validateAggregateRestrictions(existingFiles, addingFiles) {
    const { maxTotalFileSize, maxNumberOfFiles } = this.getOpts().restrictions;
    if (maxNumberOfFiles) {
      const nonGhostFiles = existingFiles.filter((f2) => !f2.isGhost);
      if (nonGhostFiles.length + addingFiles.length > maxNumberOfFiles) {
        throw new RestrictionError(`${this.getI18n()("youCanOnlyUploadX", {
          smart_count: maxNumberOfFiles
        })}`);
      }
    }
    if (maxTotalFileSize) {
      const totalFilesSize = [...existingFiles, ...addingFiles].reduce((total, f2) => total + (f2.size ?? 0), 0);
      if (totalFilesSize > maxTotalFileSize) {
        throw new RestrictionError(this.getI18n()("aggregateExceedsSize", {
          sizeAllowed: prettierBytes$1(maxTotalFileSize),
          size: prettierBytes$1(totalFilesSize)
        }));
      }
    }
  }
  validateSingleFile(file) {
    const { maxFileSize, minFileSize, allowedFileTypes } = this.getOpts().restrictions;
    if (allowedFileTypes) {
      const isCorrectFileType = allowedFileTypes.some((type) => {
        if (type.includes("/")) {
          if (!file.type)
            return false;
          return match(file.type.replace(/;.*?$/, ""), type);
        }
        if (type[0] === "." && file.extension) {
          return file.extension.toLowerCase() === type.slice(1).toLowerCase();
        }
        return false;
      });
      if (!isCorrectFileType) {
        const allowedFileTypesString = allowedFileTypes.join(", ");
        throw new RestrictionError(this.getI18n()("youCanOnlyUploadFileTypes", {
          types: allowedFileTypesString
        }), { file });
      }
    }
    if (maxFileSize && file.size != null && file.size > maxFileSize) {
      throw new RestrictionError(this.getI18n()("exceedsSize", {
        size: prettierBytes$1(maxFileSize),
        file: file.name ?? this.getI18n()("unnamed")
      }), { file });
    }
    if (minFileSize && file.size != null && file.size < minFileSize) {
      throw new RestrictionError(this.getI18n()("inferiorSize", {
        size: prettierBytes$1(minFileSize)
      }), { file });
    }
  }
  validate(existingFiles, addingFiles) {
    addingFiles.forEach((addingFile) => {
      this.validateSingleFile(addingFile);
    });
    this.validateAggregateRestrictions(existingFiles, addingFiles);
  }
  validateMinNumberOfFiles(files) {
    const { minNumberOfFiles } = this.getOpts().restrictions;
    if (minNumberOfFiles && Object.keys(files).length < minNumberOfFiles) {
      throw new RestrictionError(this.getI18n()("youHaveToAtLeastSelectX", {
        smart_count: minNumberOfFiles
      }));
    }
  }
  getMissingRequiredMetaFields(file) {
    const error = new RestrictionError(this.getI18n()("missingRequiredMetaFieldOnFile", {
      fileName: file.name ?? this.getI18n()("unnamed")
    }));
    const { requiredMetaFields } = this.getOpts().restrictions;
    const missingFields = [];
    for (const field of requiredMetaFields) {
      if (!Object.hasOwn(file.meta, field) || file.meta[field] === "") {
        missingFields.push(field);
      }
    }
    return { missingFields, error };
  }
}
function supportsUploadProgress(userAgent) {
  if (userAgent == null && typeof navigator !== "undefined") {
    userAgent = navigator.userAgent;
  }
  if (!userAgent)
    return true;
  const m2 = /Edge\/(\d+\.\d+)/.exec(userAgent);
  if (!m2)
    return true;
  const edgeVersion = m2[1];
  const version2 = edgeVersion.split(".", 2);
  const major = parseInt(version2[0], 10);
  const minor = parseInt(version2[1], 10);
  if (major < 15 || major === 15 && minor < 15063) {
    return true;
  }
  if (major > 18 || major === 18 && minor >= 18218) {
    return true;
  }
  return false;
}
const defaultUploadState = {
  totalProgress: 0,
  allowNewUpload: true,
  error: null,
  recoveredState: null
};
let Uppy$1 = class Uppy2 {
  static VERSION = packageJson$7.version;
  #plugins = /* @__PURE__ */ Object.create(null);
  #restricter;
  #storeUnsubscribe;
  #emitter = ee$1();
  #preProcessors = /* @__PURE__ */ new Set();
  #uploaders = /* @__PURE__ */ new Set();
  #postProcessors = /* @__PURE__ */ new Set();
  defaultLocale;
  locale;
  // The user optionally passes in options, but we set defaults for missing options.
  // We consider all options present after the contructor has run.
  opts;
  store;
  // Warning: do not use this from a plugin, as it will cause the plugins' translations to be missing
  i18n;
  i18nArray;
  scheduledAutoProceed = null;
  wasOffline = false;
  /**
   * Instantiate Uppy
   */
  constructor(opts) {
    this.defaultLocale = locale$4;
    const defaultOptions2 = {
      id: "uppy",
      autoProceed: false,
      allowMultipleUploadBatches: true,
      debug: false,
      restrictions: defaultOptions$6,
      meta: {},
      onBeforeFileAdded: (file, files) => !Object.hasOwn(files, file.id),
      onBeforeUpload: (files) => files,
      store: new DefaultStore(),
      logger: justErrorsLogger,
      infoTimeout: 5e3
    };
    const merged = { ...defaultOptions2, ...opts };
    this.opts = {
      ...merged,
      restrictions: {
        ...defaultOptions2.restrictions,
        ...opts?.restrictions
      }
    };
    if (opts?.logger && opts.debug) {
      this.log("You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.", "warning");
    } else if (opts?.debug) {
      this.opts.logger = debugLogger;
    }
    this.log(`Using Core v${Uppy2.VERSION}`);
    this.i18nInit();
    this.store = this.opts.store;
    this.setState({
      ...defaultUploadState,
      plugins: {},
      files: {},
      currentUploads: {},
      capabilities: {
        uploadProgress: supportsUploadProgress(),
        individualCancellation: true,
        resumableUploads: false
      },
      meta: { ...this.opts.meta },
      info: []
    });
    this.#restricter = new Restricter(() => this.opts, () => this.i18n);
    this.#storeUnsubscribe = this.store.subscribe((prevState, nextState, patch) => {
      this.emit("state-update", prevState, nextState, patch);
      this.updateAll(nextState);
    });
    if (this.opts.debug && typeof window !== "undefined") {
      window[this.opts.id] = this;
    }
    this.#addListeners();
  }
  emit(event, ...args) {
    this.#emitter.emit(event, ...args);
  }
  on(event, callback) {
    this.#emitter.on(event, callback);
    return this;
  }
  once(event, callback) {
    this.#emitter.once(event, callback);
    return this;
  }
  off(event, callback) {
    this.#emitter.off(event, callback);
    return this;
  }
  /**
   * Iterate on all plugins and run `update` on them.
   * Called each time state changes.
   *
   */
  updateAll(state) {
    this.iteratePlugins((plugin) => {
      plugin.update(state);
    });
  }
  /**
   * Updates state with a patch
   */
  setState(patch) {
    this.store.setState(patch);
  }
  /**
   * Returns current state.
   */
  getState() {
    return this.store.getState();
  }
  patchFilesState(filesWithNewState) {
    const existingFilesState = this.getState().files;
    this.setState({
      files: {
        ...existingFilesState,
        ...Object.fromEntries(Object.entries(filesWithNewState).map(([fileID, newFileState]) => [
          fileID,
          {
            ...existingFilesState[fileID],
            ...newFileState
          }
        ]))
      }
    });
  }
  /**
   * Shorthand to set state for a specific file.
   */
  setFileState(fileID, state) {
    if (!this.getState().files[fileID]) {
      throw new Error(`Can’t set state for ${fileID} (the file could have been removed)`);
    }
    this.patchFilesState({ [fileID]: state });
  }
  i18nInit() {
    const onMissingKey = (key) => this.log(`Missing i18n string: ${key}`, "error");
    const translator = new Translator([this.defaultLocale, this.opts.locale], {
      onMissingKey
    });
    this.i18n = translator.translate.bind(translator);
    this.i18nArray = translator.translateArray.bind(translator);
    this.locale = translator.locale;
  }
  setOptions(newOpts) {
    this.opts = {
      ...this.opts,
      ...newOpts,
      restrictions: {
        ...this.opts.restrictions,
        ...newOpts?.restrictions
      }
    };
    if (newOpts.meta) {
      this.setMeta(newOpts.meta);
    }
    this.i18nInit();
    if (newOpts.locale) {
      this.iteratePlugins((plugin) => {
        plugin.setOptions(newOpts);
      });
    }
    this.setState(void 0);
  }
  resetProgress() {
    const defaultProgress = {
      percentage: 0,
      bytesUploaded: false,
      uploadComplete: false,
      uploadStarted: null
    };
    const files = { ...this.getState().files };
    const updatedFiles = /* @__PURE__ */ Object.create(null);
    Object.keys(files).forEach((fileID) => {
      updatedFiles[fileID] = {
        ...files[fileID],
        progress: {
          ...files[fileID].progress,
          ...defaultProgress
        },
        // @ts-expect-error these typed are inserted
        // into the namespace in their respective packages
        // but core isn't ware of those
        tus: void 0,
        transloadit: void 0
      };
    });
    this.setState({ files: updatedFiles, ...defaultUploadState });
  }
  clear() {
    const { capabilities, currentUploads } = this.getState();
    if (Object.keys(currentUploads).length > 0 && !capabilities.individualCancellation) {
      throw new Error("The installed uploader plugin does not allow removing files during an upload.");
    }
    this.setState({ ...defaultUploadState, files: {} });
  }
  addPreProcessor(fn2) {
    this.#preProcessors.add(fn2);
  }
  removePreProcessor(fn2) {
    return this.#preProcessors.delete(fn2);
  }
  addPostProcessor(fn2) {
    this.#postProcessors.add(fn2);
  }
  removePostProcessor(fn2) {
    return this.#postProcessors.delete(fn2);
  }
  addUploader(fn2) {
    this.#uploaders.add(fn2);
  }
  removeUploader(fn2) {
    return this.#uploaders.delete(fn2);
  }
  setMeta(data) {
    const updatedMeta = { ...this.getState().meta, ...data };
    const updatedFiles = { ...this.getState().files };
    Object.keys(updatedFiles).forEach((fileID) => {
      updatedFiles[fileID] = {
        ...updatedFiles[fileID],
        meta: { ...updatedFiles[fileID].meta, ...data }
      };
    });
    this.log("Adding metadata:");
    this.log(data);
    this.setState({
      meta: updatedMeta,
      files: updatedFiles
    });
  }
  setFileMeta(fileID, data) {
    const updatedFiles = { ...this.getState().files };
    if (!updatedFiles[fileID]) {
      this.log(`Was trying to set metadata for a file that has been removed: ${fileID}`);
      return;
    }
    const newMeta = { ...updatedFiles[fileID].meta, ...data };
    updatedFiles[fileID] = { ...updatedFiles[fileID], meta: newMeta };
    this.setState({ files: updatedFiles });
  }
  /**
   * Get a file object.
   */
  getFile(fileID) {
    return this.getState().files[fileID];
  }
  /**
   * Get all files in an array.
   */
  getFiles() {
    const { files } = this.getState();
    return Object.values(files);
  }
  getFilesByIds(ids) {
    return ids.map((id) => this.getFile(id));
  }
  getObjectOfFilesPerState() {
    const { files: filesObject, totalProgress, error } = this.getState();
    const files = Object.values(filesObject);
    const inProgressFiles = [];
    const newFiles = [];
    const startedFiles = [];
    const uploadStartedFiles = [];
    const pausedFiles = [];
    const completeFiles = [];
    const erroredFiles = [];
    const inProgressNotPausedFiles = [];
    const processingFiles = [];
    for (const file of files) {
      const { progress } = file;
      if (!progress.uploadComplete && progress.uploadStarted) {
        inProgressFiles.push(file);
        if (!file.isPaused) {
          inProgressNotPausedFiles.push(file);
        }
      }
      if (!progress.uploadStarted) {
        newFiles.push(file);
      }
      if (progress.uploadStarted || progress.preprocess || progress.postprocess) {
        startedFiles.push(file);
      }
      if (progress.uploadStarted) {
        uploadStartedFiles.push(file);
      }
      if (file.isPaused) {
        pausedFiles.push(file);
      }
      if (progress.uploadComplete) {
        completeFiles.push(file);
      }
      if (file.error) {
        erroredFiles.push(file);
      }
      if (progress.preprocess || progress.postprocess) {
        processingFiles.push(file);
      }
    }
    return {
      newFiles,
      startedFiles,
      uploadStartedFiles,
      pausedFiles,
      completeFiles,
      erroredFiles,
      inProgressFiles,
      inProgressNotPausedFiles,
      processingFiles,
      isUploadStarted: uploadStartedFiles.length > 0,
      isAllComplete: totalProgress === 100 && completeFiles.length === files.length && processingFiles.length === 0,
      isAllErrored: !!error && erroredFiles.length === files.length,
      isAllPaused: inProgressFiles.length !== 0 && pausedFiles.length === inProgressFiles.length,
      isUploadInProgress: inProgressFiles.length > 0,
      isSomeGhost: files.some((file) => file.isGhost)
    };
  }
  #informAndEmit(errors) {
    for (const error of errors) {
      if (error.isRestriction) {
        this.emit("restriction-failed", error.file, error);
      } else {
        this.emit("error", error, error.file);
      }
      this.log(error, "warning");
    }
    const userFacingErrors = errors.filter((error) => error.isUserFacing);
    const maxNumToShow = 4;
    const firstErrors = userFacingErrors.slice(0, maxNumToShow);
    const additionalErrors = userFacingErrors.slice(maxNumToShow);
    firstErrors.forEach(({ message, details = "" }) => {
      this.info({ message, details }, "error", this.opts.infoTimeout);
    });
    if (additionalErrors.length > 0) {
      this.info({
        message: this.i18n("additionalRestrictionsFailed", {
          count: additionalErrors.length
        })
      });
    }
  }
  validateRestrictions(file, files = this.getFiles()) {
    try {
      this.#restricter.validate(files, [file]);
    } catch (err) {
      return err;
    }
    return null;
  }
  validateSingleFile(file) {
    try {
      this.#restricter.validateSingleFile(file);
    } catch (err) {
      return err.message;
    }
    return null;
  }
  validateAggregateRestrictions(files) {
    const existingFiles = this.getFiles();
    try {
      this.#restricter.validateAggregateRestrictions(existingFiles, files);
    } catch (err) {
      return err.message;
    }
    return null;
  }
  #checkRequiredMetaFieldsOnFile(file) {
    const { missingFields, error } = this.#restricter.getMissingRequiredMetaFields(file);
    if (missingFields.length > 0) {
      this.setFileState(file.id, { missingRequiredMetaFields: missingFields });
      this.log(error.message);
      this.emit("restriction-failed", file, error);
      return false;
    }
    if (missingFields.length === 0 && file.missingRequiredMetaFields) {
      this.setFileState(file.id, { missingRequiredMetaFields: [] });
    }
    return true;
  }
  #checkRequiredMetaFields(files) {
    let success = true;
    for (const file of Object.values(files)) {
      if (!this.#checkRequiredMetaFieldsOnFile(file)) {
        success = false;
      }
    }
    return success;
  }
  #assertNewUploadAllowed(file) {
    const { allowNewUpload } = this.getState();
    if (allowNewUpload === false) {
      const error = new RestrictionError(this.i18n("noMoreFilesAllowed"), {
        file
      });
      this.#informAndEmit([error]);
      throw error;
    }
  }
  checkIfFileAlreadyExists(fileID) {
    const { files } = this.getState();
    if (files[fileID] && !files[fileID].isGhost) {
      return true;
    }
    return false;
  }
  /**
   * Create a file state object based on user-provided `addFile()` options.
   */
  #transformFile(fileDescriptorOrFile) {
    const file = fileDescriptorOrFile instanceof File ? {
      name: fileDescriptorOrFile.name,
      type: fileDescriptorOrFile.type,
      size: fileDescriptorOrFile.size,
      data: fileDescriptorOrFile
    } : fileDescriptorOrFile;
    const fileType = getFileType(file);
    const fileName = getFileName(fileType, file);
    const fileExtension = getFileNameAndExtension(fileName).extension;
    const id = getSafeFileId(file, this.getID());
    const meta = file.meta || {};
    meta.name = fileName;
    meta.type = fileType;
    const size = Number.isFinite(file.data.size) ? file.data.size : null;
    return {
      source: file.source || "",
      id,
      name: fileName,
      extension: fileExtension || "",
      meta: {
        ...this.getState().meta,
        ...meta
      },
      type: fileType,
      data: file.data,
      progress: {
        percentage: 0,
        bytesUploaded: false,
        bytesTotal: size,
        uploadComplete: false,
        uploadStarted: null
      },
      size,
      isGhost: false,
      isRemote: file.isRemote || false,
      remote: file.remote,
      preview: file.preview
    };
  }
  // Schedule an upload if `autoProceed` is enabled.
  #startIfAutoProceed() {
    if (this.opts.autoProceed && !this.scheduledAutoProceed) {
      this.scheduledAutoProceed = setTimeout(() => {
        this.scheduledAutoProceed = null;
        this.upload().catch((err) => {
          if (!err.isRestriction) {
            this.log(err.stack || err.message || err);
          }
        });
      }, 4);
    }
  }
  #checkAndUpdateFileState(filesToAdd) {
    let { files: existingFiles } = this.getState();
    let nextFilesState = { ...existingFiles };
    const validFilesToAdd = [];
    const errors = [];
    for (const fileToAdd of filesToAdd) {
      try {
        let newFile = this.#transformFile(fileToAdd);
        const isGhost = existingFiles[newFile.id]?.isGhost;
        if (isGhost) {
          const existingFileState = existingFiles[newFile.id];
          newFile = {
            ...existingFileState,
            isGhost: false,
            data: fileToAdd.data
          };
          this.log(`Replaced the blob in the restored ghost file: ${newFile.name}, ${newFile.id}`);
        }
        const onBeforeFileAddedResult = this.opts.onBeforeFileAdded(newFile, nextFilesState);
        existingFiles = this.getState().files;
        nextFilesState = { ...existingFiles, ...nextFilesState };
        if (!onBeforeFileAddedResult && this.checkIfFileAlreadyExists(newFile.id)) {
          throw new RestrictionError(this.i18n("noDuplicates", {
            fileName: newFile.name ?? this.i18n("unnamed")
          }), { file: fileToAdd });
        }
        if (onBeforeFileAddedResult === false && !isGhost) {
          throw new RestrictionError("Cannot add the file because onBeforeFileAdded returned false.", { isUserFacing: false, file: fileToAdd });
        } else if (typeof onBeforeFileAddedResult === "object" && onBeforeFileAddedResult !== null) {
          newFile = onBeforeFileAddedResult;
        }
        this.#restricter.validateSingleFile(newFile);
        nextFilesState[newFile.id] = newFile;
        validFilesToAdd.push(newFile);
      } catch (err) {
        errors.push(err);
      }
    }
    try {
      this.#restricter.validateAggregateRestrictions(Object.values(existingFiles), validFilesToAdd);
    } catch (err) {
      errors.push(err);
      return {
        nextFilesState: existingFiles,
        validFilesToAdd: [],
        errors
      };
    }
    return {
      nextFilesState,
      validFilesToAdd,
      errors
    };
  }
  /**
   * Add a new file to `state.files`. This will run `onBeforeFileAdded`,
   * try to guess file type in a clever way, check file against restrictions,
   * and start an upload if `autoProceed === true`.
   */
  addFile(file) {
    this.#assertNewUploadAllowed(file);
    const { nextFilesState, validFilesToAdd, errors } = this.#checkAndUpdateFileState([file]);
    const restrictionErrors = errors.filter((error) => error.isRestriction);
    this.#informAndEmit(restrictionErrors);
    if (errors.length > 0)
      throw errors[0];
    this.setState({ files: nextFilesState });
    const [firstValidFileToAdd] = validFilesToAdd;
    this.emit("file-added", firstValidFileToAdd);
    this.emit("files-added", validFilesToAdd);
    this.log(`Added file: ${firstValidFileToAdd.name}, ${firstValidFileToAdd.id}, mime type: ${firstValidFileToAdd.type}`);
    this.#startIfAutoProceed();
    return firstValidFileToAdd.id;
  }
  /**
   * Add multiple files to `state.files`. See the `addFile()` documentation.
   *
   * If an error occurs while adding a file, it is logged and the user is notified.
   * This is good for UI plugins, but not for programmatic use.
   * Programmatic users should usually still use `addFile()` on individual files.
   */
  addFiles(fileDescriptors) {
    this.#assertNewUploadAllowed();
    const { nextFilesState, validFilesToAdd, errors } = this.#checkAndUpdateFileState(fileDescriptors);
    const restrictionErrors = errors.filter((error) => error.isRestriction);
    this.#informAndEmit(restrictionErrors);
    const nonRestrictionErrors = errors.filter((error) => !error.isRestriction);
    if (nonRestrictionErrors.length > 0) {
      let message = "Multiple errors occurred while adding files:\n";
      nonRestrictionErrors.forEach((subError) => {
        message += `
 * ${subError.message}`;
      });
      this.info({
        message: this.i18n("addBulkFilesFailed", {
          smart_count: nonRestrictionErrors.length
        }),
        details: message
      }, "error", this.opts.infoTimeout);
      if (typeof AggregateError === "function") {
        throw new AggregateError(nonRestrictionErrors, message);
      } else {
        const err = new Error(message);
        err.errors = nonRestrictionErrors;
        throw err;
      }
    }
    this.setState({ files: nextFilesState });
    validFilesToAdd.forEach((file) => {
      this.emit("file-added", file);
    });
    this.emit("files-added", validFilesToAdd);
    if (validFilesToAdd.length > 5) {
      this.log(`Added batch of ${validFilesToAdd.length} files`);
    } else {
      Object.values(validFilesToAdd).forEach((file) => {
        this.log(`Added file: ${file.name}
 id: ${file.id}
 type: ${file.type}`);
      });
    }
    if (validFilesToAdd.length > 0) {
      this.#startIfAutoProceed();
    }
  }
  removeFiles(fileIDs) {
    const { files, currentUploads } = this.getState();
    const updatedFiles = { ...files };
    const updatedUploads = { ...currentUploads };
    const removedFiles = /* @__PURE__ */ Object.create(null);
    fileIDs.forEach((fileID) => {
      if (files[fileID]) {
        removedFiles[fileID] = files[fileID];
        delete updatedFiles[fileID];
      }
    });
    function fileIsNotRemoved(uploadFileID) {
      return removedFiles[uploadFileID] === void 0;
    }
    Object.keys(updatedUploads).forEach((uploadID) => {
      const newFileIDs = currentUploads[uploadID].fileIDs.filter(fileIsNotRemoved);
      if (newFileIDs.length === 0) {
        delete updatedUploads[uploadID];
        return;
      }
      const { capabilities } = this.getState();
      if (newFileIDs.length !== currentUploads[uploadID].fileIDs.length && !capabilities.individualCancellation) {
        throw new Error("The installed uploader plugin does not allow removing files during an upload.");
      }
      updatedUploads[uploadID] = {
        ...currentUploads[uploadID],
        fileIDs: newFileIDs
      };
    });
    const stateUpdate = {
      currentUploads: updatedUploads,
      files: updatedFiles
    };
    if (Object.keys(updatedFiles).length === 0) {
      stateUpdate.allowNewUpload = true;
      stateUpdate.error = null;
      stateUpdate.recoveredState = null;
    }
    this.setState(stateUpdate);
    this.#updateTotalProgressThrottled();
    const removedFileIDs = Object.keys(removedFiles);
    removedFileIDs.forEach((fileID) => {
      this.emit("file-removed", removedFiles[fileID]);
    });
    if (removedFileIDs.length > 5) {
      this.log(`Removed ${removedFileIDs.length} files`);
    } else {
      this.log(`Removed files: ${removedFileIDs.join(", ")}`);
    }
  }
  removeFile(fileID) {
    this.removeFiles([fileID]);
  }
  pauseResume(fileID) {
    if (!this.getState().capabilities.resumableUploads || this.getFile(fileID).progress.uploadComplete) {
      return void 0;
    }
    const file = this.getFile(fileID);
    const wasPaused = file.isPaused || false;
    const isPaused = !wasPaused;
    this.setFileState(fileID, {
      isPaused
    });
    this.emit("upload-pause", file, isPaused);
    return isPaused;
  }
  pauseAll() {
    const updatedFiles = { ...this.getState().files };
    const inProgressUpdatedFiles = Object.keys(updatedFiles).filter((file) => {
      return !updatedFiles[file].progress.uploadComplete && updatedFiles[file].progress.uploadStarted;
    });
    inProgressUpdatedFiles.forEach((file) => {
      const updatedFile = { ...updatedFiles[file], isPaused: true };
      updatedFiles[file] = updatedFile;
    });
    this.setState({ files: updatedFiles });
    this.emit("pause-all");
  }
  resumeAll() {
    const updatedFiles = { ...this.getState().files };
    const inProgressUpdatedFiles = Object.keys(updatedFiles).filter((file) => {
      return !updatedFiles[file].progress.uploadComplete && updatedFiles[file].progress.uploadStarted;
    });
    inProgressUpdatedFiles.forEach((file) => {
      const updatedFile = {
        ...updatedFiles[file],
        isPaused: false,
        error: null
      };
      updatedFiles[file] = updatedFile;
    });
    this.setState({ files: updatedFiles });
    this.emit("resume-all");
  }
  #getFilesToRetry() {
    const { files } = this.getState();
    return Object.keys(files).filter((file) => {
      return files[file].error;
    });
  }
  async #doRetryAll() {
    const filesToRetry = this.#getFilesToRetry();
    const updatedFiles = { ...this.getState().files };
    filesToRetry.forEach((fileID) => {
      updatedFiles[fileID] = {
        ...updatedFiles[fileID],
        isPaused: false,
        error: null
      };
    });
    this.setState({
      files: updatedFiles,
      error: null
    });
    this.emit("retry-all", this.getFilesByIds(filesToRetry));
    if (filesToRetry.length === 0) {
      return {
        successful: [],
        failed: []
      };
    }
    const uploadID = this.#createUpload(filesToRetry, {
      forceAllowNewUpload: true
      // create new upload even if allowNewUpload: false
    });
    return this.#runUpload(uploadID);
  }
  async retryAll() {
    const result = await this.#doRetryAll();
    this.emit("complete", result);
    return result;
  }
  cancelAll() {
    this.emit("cancel-all");
    const { files } = this.getState();
    const fileIDs = Object.keys(files);
    if (fileIDs.length) {
      this.removeFiles(fileIDs);
    }
    this.setState(defaultUploadState);
  }
  retryUpload(fileID) {
    this.setFileState(fileID, {
      error: null,
      isPaused: false
    });
    this.emit("upload-retry", this.getFile(fileID));
    const uploadID = this.#createUpload([fileID], {
      forceAllowNewUpload: true
      // create new upload even if allowNewUpload: false
    });
    return this.#runUpload(uploadID);
  }
  logout() {
    this.iteratePlugins((plugin) => {
      plugin.provider?.logout?.();
    });
  }
  #handleUploadProgress = (file, progress) => {
    const fileInState = file ? this.getFile(file.id) : void 0;
    if (file == null || !fileInState) {
      this.log(`Not setting progress for a file that has been removed: ${file?.id}`);
      return;
    }
    if (fileInState.progress.percentage === 100) {
      this.log(`Not setting progress for a file that has been already uploaded: ${file.id}`);
      return;
    }
    const newProgress = {
      bytesTotal: progress.bytesTotal,
      // bytesTotal may be null or zero; in that case we can't divide by it
      percentage: progress.bytesTotal != null && Number.isFinite(progress.bytesTotal) && progress.bytesTotal > 0 ? Math.round(progress.bytesUploaded / progress.bytesTotal * 100) : void 0
    };
    if (fileInState.progress.uploadStarted != null) {
      this.setFileState(file.id, {
        progress: {
          ...fileInState.progress,
          ...newProgress,
          bytesUploaded: progress.bytesUploaded
        }
      });
    } else {
      this.setFileState(file.id, {
        progress: {
          ...fileInState.progress,
          ...newProgress
        }
      });
    }
    this.#updateTotalProgressThrottled();
  };
  #updateTotalProgress() {
    const totalProgress = this.#calculateTotalProgress();
    let totalProgressPercent = null;
    if (totalProgress != null) {
      totalProgressPercent = Math.round(totalProgress * 100);
      if (totalProgressPercent > 100)
        totalProgressPercent = 100;
      else if (totalProgressPercent < 0)
        totalProgressPercent = 0;
    }
    this.emit("progress", totalProgressPercent ?? 0);
    this.setState({
      totalProgress: totalProgressPercent ?? 0
    });
  }
  // ___Why throttle at 500ms?
  //    - We must throttle at >250ms for superfocus in Dashboard to work well
  //    (because animation takes 0.25s, and we want to wait for all animations to be over before refocusing).
  //    [Practical Check]: if thottle is at 100ms, then if you are uploading a file,
  //    and click 'ADD MORE FILES', - focus won't activate in Firefox.
  //    - We must throttle at around >500ms to avoid performance lags.
  //    [Practical Check] Firefox, try to upload a big file for a prolonged period of time. Laptop will start to heat up.
  #updateTotalProgressThrottled = throttle$1(() => this.#updateTotalProgress(), 500, { leading: true, trailing: true });
  [Symbol.for("uppy test: updateTotalProgress")]() {
    return this.#updateTotalProgress();
  }
  #calculateTotalProgress() {
    const files = this.getFiles();
    const filesInProgress = files.filter((file) => {
      return file.progress.uploadStarted || file.progress.preprocess || file.progress.postprocess;
    });
    if (filesInProgress.length === 0) {
      return 0;
    }
    if (filesInProgress.every((file) => file.progress.uploadComplete)) {
      return 1;
    }
    const isSizedFile = (file) => file.progress.bytesTotal != null && file.progress.bytesTotal !== 0;
    const sizedFilesInProgress = filesInProgress.filter(isSizedFile);
    const unsizedFilesInProgress = filesInProgress.filter((file) => !isSizedFile(file));
    if (sizedFilesInProgress.every((file) => file.progress.uploadComplete) && unsizedFilesInProgress.length > 0 && !unsizedFilesInProgress.every((file) => file.progress.uploadComplete)) {
      return null;
    }
    const totalFilesSize = sizedFilesInProgress.reduce((acc, file) => acc + (file.progress.bytesTotal ?? 0), 0);
    const totalUploadedSize = sizedFilesInProgress.reduce((acc, file) => acc + (file.progress.bytesUploaded || 0), 0);
    return totalFilesSize === 0 ? 0 : totalUploadedSize / totalFilesSize;
  }
  /**
   * Registers listeners for all global actions, like:
   * `error`, `file-removed`, `upload-progress`
   */
  #addListeners() {
    const errorHandler = (error, file, response) => {
      let errorMsg = error.message || "Unknown error";
      if (error.details) {
        errorMsg += ` ${error.details}`;
      }
      this.setState({ error: errorMsg });
      if (file != null && file.id in this.getState().files) {
        this.setFileState(file.id, {
          error: errorMsg,
          response
        });
      }
    };
    this.on("error", errorHandler);
    this.on("upload-error", (file, error, response) => {
      errorHandler(error, file, response);
      if (typeof error === "object" && error.message) {
        this.log(error.message, "error");
        const newError = new Error(this.i18n("failedToUpload", { file: file?.name ?? "" }));
        newError.isUserFacing = true;
        newError.details = error.message;
        if (error.details) {
          newError.details += ` ${error.details}`;
        }
        this.#informAndEmit([newError]);
      } else {
        this.#informAndEmit([error]);
      }
    });
    let uploadStalledWarningRecentlyEmitted = null;
    this.on("upload-stalled", (error, files) => {
      const { message } = error;
      const details = files.map((file) => file.meta.name).join(", ");
      if (!uploadStalledWarningRecentlyEmitted) {
        this.info({ message, details }, "warning", this.opts.infoTimeout);
        uploadStalledWarningRecentlyEmitted = setTimeout(() => {
          uploadStalledWarningRecentlyEmitted = null;
        }, this.opts.infoTimeout);
      }
      this.log(`${message} ${details}`.trim(), "warning");
    });
    this.on("upload", () => {
      this.setState({ error: null });
    });
    const onUploadStarted = (files) => {
      const filesFiltered = files.filter((file) => {
        const exists = file != null && this.getFile(file.id);
        if (!exists)
          this.log(`Not setting progress for a file that has been removed: ${file?.id}`);
        return exists;
      });
      const filesState = Object.fromEntries(filesFiltered.map((file) => [
        file.id,
        {
          progress: {
            uploadStarted: Date.now(),
            uploadComplete: false,
            bytesUploaded: 0,
            bytesTotal: file.size
          }
        }
      ]));
      this.patchFilesState(filesState);
    };
    this.on("upload-start", onUploadStarted);
    this.on("upload-progress", this.#handleUploadProgress);
    this.on("upload-success", (file, uploadResp) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file?.id}`);
        return;
      }
      const currentProgress = this.getFile(file.id).progress;
      this.setFileState(file.id, {
        progress: {
          ...currentProgress,
          postprocess: this.#postProcessors.size > 0 ? {
            mode: "indeterminate"
          } : void 0,
          uploadComplete: true,
          percentage: 100,
          bytesUploaded: currentProgress.bytesTotal
        },
        response: uploadResp,
        uploadURL: uploadResp.uploadURL,
        isPaused: false
      });
      if (file.size == null) {
        this.setFileState(file.id, {
          size: uploadResp.bytesUploaded || currentProgress.bytesTotal
        });
      }
      this.#updateTotalProgressThrottled();
    });
    this.on("preprocess-progress", (file, progress) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file?.id}`);
        return;
      }
      this.setFileState(file.id, {
        progress: { ...this.getFile(file.id).progress, preprocess: progress }
      });
    });
    this.on("preprocess-complete", (file) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file?.id}`);
        return;
      }
      const files = { ...this.getState().files };
      files[file.id] = {
        ...files[file.id],
        progress: { ...files[file.id].progress }
      };
      delete files[file.id].progress.preprocess;
      this.setState({ files });
    });
    this.on("postprocess-progress", (file, progress) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file?.id}`);
        return;
      }
      this.setFileState(file.id, {
        progress: {
          ...this.getState().files[file.id].progress,
          postprocess: progress
        }
      });
    });
    this.on("postprocess-complete", (file) => {
      if (file == null || !this.getFile(file.id)) {
        this.log(`Not setting progress for a file that has been removed: ${file?.id}`);
        return;
      }
      const files = {
        ...this.getState().files
      };
      files[file.id] = {
        ...files[file.id],
        progress: {
          ...files[file.id].progress
        }
      };
      delete files[file.id].progress.postprocess;
      this.setState({ files });
    });
    this.on("restored", () => {
      this.#updateTotalProgressThrottled();
    });
    this.on("dashboard:file-edit-complete", (file) => {
      if (file) {
        this.#checkRequiredMetaFieldsOnFile(file);
      }
    });
    if (typeof window !== "undefined" && window.addEventListener) {
      window.addEventListener("online", this.#updateOnlineStatus);
      window.addEventListener("offline", this.#updateOnlineStatus);
      setTimeout(this.#updateOnlineStatus, 3e3);
    }
  }
  updateOnlineStatus() {
    const online = window.navigator.onLine ?? true;
    if (!online) {
      this.emit("is-offline");
      this.info(this.i18n("noInternetConnection"), "error", 0);
      this.wasOffline = true;
    } else {
      this.emit("is-online");
      if (this.wasOffline) {
        this.emit("back-online");
        this.info(this.i18n("connectedToInternet"), "success", 3e3);
        this.wasOffline = false;
      }
    }
  }
  #updateOnlineStatus = this.updateOnlineStatus.bind(this);
  getID() {
    return this.opts.id;
  }
  /**
   * Registers a plugin with Core.
   */
  use(Plugin, ...args) {
    if (typeof Plugin !== "function") {
      const msg = `Expected a plugin class, but got ${Plugin === null ? "null" : typeof Plugin}. Please verify that the plugin was imported and spelled correctly.`;
      throw new TypeError(msg);
    }
    const plugin = new Plugin(this, ...args);
    const pluginId = plugin.id;
    if (!pluginId) {
      throw new Error("Your plugin must have an id");
    }
    if (!plugin.type) {
      throw new Error("Your plugin must have a type");
    }
    const existsPluginAlready = this.getPlugin(pluginId);
    if (existsPluginAlready) {
      const msg = `Already found a plugin named '${existsPluginAlready.id}'. Tried to use: '${pluginId}'.
Uppy plugins must have unique \`id\` options.`;
      throw new Error(msg);
    }
    if (Plugin.VERSION) {
      this.log(`Using ${pluginId} v${Plugin.VERSION}`);
    }
    if (plugin.type in this.#plugins) {
      this.#plugins[plugin.type].push(plugin);
    } else {
      this.#plugins[plugin.type] = [plugin];
    }
    plugin.install();
    this.emit("plugin-added", plugin);
    return this;
  }
  /**
   * Find one Plugin by name.
   */
  getPlugin(id) {
    for (const plugins of Object.values(this.#plugins)) {
      const foundPlugin = plugins.find((plugin) => plugin.id === id);
      if (foundPlugin != null)
        return foundPlugin;
    }
    return void 0;
  }
  [Symbol.for("uppy test: getPlugins")](type) {
    return this.#plugins[type];
  }
  /**
   * Iterate through all `use`d plugins.
   *
   */
  iteratePlugins(method) {
    Object.values(this.#plugins).flat(1).forEach(method);
  }
  /**
   * Uninstall and remove a plugin.
   *
   * @param {object} instance The plugin instance to remove.
   */
  removePlugin(instance) {
    this.log(`Removing plugin ${instance.id}`);
    this.emit("plugin-remove", instance);
    if (instance.uninstall) {
      instance.uninstall();
    }
    const list = this.#plugins[instance.type];
    const index = list.findIndex((item) => item.id === instance.id);
    if (index !== -1) {
      list.splice(index, 1);
    }
    const state = this.getState();
    const updatedState = {
      plugins: {
        ...state.plugins,
        [instance.id]: void 0
      }
    };
    this.setState(updatedState);
  }
  /**
   * Uninstall all plugins and close down this Uppy instance.
   */
  destroy() {
    this.log(`Closing Uppy instance ${this.opts.id}: removing all files and uninstalling plugins`);
    this.cancelAll();
    this.#storeUnsubscribe();
    this.iteratePlugins((plugin) => {
      this.removePlugin(plugin);
    });
    if (typeof window !== "undefined" && window.removeEventListener) {
      window.removeEventListener("online", this.#updateOnlineStatus);
      window.removeEventListener("offline", this.#updateOnlineStatus);
    }
  }
  hideInfo() {
    const { info } = this.getState();
    this.setState({ info: info.slice(1) });
    this.emit("info-hidden");
  }
  /**
   * Set info message in `state.info`, so that UI plugins like `Informer`
   * can display the message.
   */
  info(message, type = "info", duration2 = 3e3) {
    const isComplexMessage = typeof message === "object";
    this.setState({
      info: [
        ...this.getState().info,
        {
          type,
          message: isComplexMessage ? message.message : message,
          details: isComplexMessage ? message.details : null
        }
      ]
    });
    setTimeout(() => this.hideInfo(), duration2);
    this.emit("info-visible");
  }
  /**
   * Passes messages to a function, provided in `opts.logger`.
   * If `opts.logger: Uppy.debugLogger` or `opts.debug: true`, logs to the browser console.
   */
  log(message, type) {
    const { logger } = this.opts;
    switch (type) {
      case "error":
        logger.error(message);
        break;
      case "warning":
        logger.warn(message);
        break;
      default:
        logger.debug(message);
        break;
    }
  }
  // We need to store request clients by a unique ID, so we can share RequestClient instances across files
  // this allows us to do rate limiting and synchronous operations like refreshing provider tokens
  // example: refreshing tokens: if each file has their own requestclient,
  // we don't have any way to synchronize all requests in order to
  // - block all requests
  // - refresh the token
  // - unblock all requests and allow them to run with a the new access token
  // back when we had a requestclient per file, once an access token expired,
  // all 6 files would go ahead and refresh the token at the same time
  // (calling /refresh-token up to 6 times), which will probably fail for some providers
  #requestClientById = /* @__PURE__ */ new Map();
  registerRequestClient(id, client) {
    this.#requestClientById.set(id, client);
  }
  /** @protected */
  getRequestClientForFile(file) {
    if (!file.remote)
      throw new Error(`Tried to get RequestClient for a non-remote file ${file.id}`);
    const requestClient = this.#requestClientById.get(file.remote.requestClientId);
    if (requestClient == null)
      throw new Error(`requestClientId "${file.remote.requestClientId}" not registered for file "${file.id}"`);
    return requestClient;
  }
  /**
   * Restore an upload by its ID.
   */
  restore(uploadID) {
    this.log(`Core: attempting to restore upload "${uploadID}"`);
    if (!this.getState().currentUploads[uploadID]) {
      this.#removeUpload(uploadID);
      return Promise.reject(new Error("Nonexistent upload"));
    }
    return this.#runUpload(uploadID);
  }
  /**
   * Create an upload for a bunch of files.
   *
   */
  #createUpload(fileIDs, opts = {}) {
    const { forceAllowNewUpload = false } = opts;
    const { allowNewUpload, currentUploads } = this.getState();
    if (!allowNewUpload && !forceAllowNewUpload) {
      throw new Error("Cannot create a new upload: already uploading.");
    }
    const uploadID = nanoid();
    this.emit("upload", uploadID, this.getFilesByIds(fileIDs));
    this.setState({
      allowNewUpload: this.opts.allowMultipleUploadBatches !== false && this.opts.allowMultipleUploads !== false,
      currentUploads: {
        ...currentUploads,
        [uploadID]: {
          fileIDs,
          step: 0,
          result: {}
        }
      }
    });
    return uploadID;
  }
  [Symbol.for("uppy test: createUpload")](...args) {
    return this.#createUpload(...args);
  }
  #getUpload(uploadID) {
    const { currentUploads } = this.getState();
    return currentUploads[uploadID];
  }
  /**
   * Add data to an upload's result object.
   */
  addResultData(uploadID, data) {
    if (!this.#getUpload(uploadID)) {
      this.log(`Not setting result for an upload that has been removed: ${uploadID}`);
      return;
    }
    const { currentUploads } = this.getState();
    const currentUpload = {
      ...currentUploads[uploadID],
      result: { ...currentUploads[uploadID].result, ...data }
    };
    this.setState({
      currentUploads: { ...currentUploads, [uploadID]: currentUpload }
    });
  }
  /**
   * Remove an upload, eg. if it has been canceled or completed.
   *
   */
  #removeUpload(uploadID) {
    const currentUploads = { ...this.getState().currentUploads };
    delete currentUploads[uploadID];
    this.setState({
      currentUploads
    });
  }
  /**
   * Run an upload. This picks up where it left off in case the upload is being restored.
   */
  async #runUpload(uploadID) {
    const getCurrentUpload = () => {
      const { currentUploads } = this.getState();
      return currentUploads[uploadID];
    };
    let currentUpload = getCurrentUpload();
    const steps = [
      ...this.#preProcessors,
      ...this.#uploaders,
      ...this.#postProcessors
    ];
    try {
      for (let step = currentUpload.step || 0; step < steps.length; step++) {
        if (!currentUpload) {
          break;
        }
        const fn2 = steps[step];
        this.setState({
          currentUploads: {
            ...this.getState().currentUploads,
            [uploadID]: {
              ...currentUpload,
              step
            }
          }
        });
        const { fileIDs } = currentUpload;
        await fn2(fileIDs, uploadID);
        currentUpload = getCurrentUpload();
      }
    } catch (err) {
      this.#removeUpload(uploadID);
      throw err;
    }
    if (currentUpload) {
      currentUpload.fileIDs.forEach((fileID) => {
        const file = this.getFile(fileID);
        if (file?.progress.postprocess) {
          this.emit("postprocess-complete", file);
        }
      });
      const files = currentUpload.fileIDs.map((fileID) => this.getFile(fileID));
      const successful = files.filter((file) => !file.error);
      const failed = files.filter((file) => file.error);
      this.addResultData(uploadID, { successful, failed, uploadID });
      currentUpload = getCurrentUpload();
    }
    let result;
    if (currentUpload) {
      result = currentUpload.result;
      this.#removeUpload(uploadID);
    }
    if (result == null) {
      this.log(`Not setting result for an upload that has been removed: ${uploadID}`);
      result = {
        successful: [],
        failed: [],
        uploadID
      };
    }
    return result;
  }
  /**
   * Start an upload for all the files that are not currently being uploaded.
   */
  async upload() {
    if (!this.#plugins.uploader?.length) {
      this.log("No uploader type plugins are used", "warning");
    }
    let { files } = this.getState();
    const filesToRetry = this.#getFilesToRetry();
    if (filesToRetry.length > 0) {
      const retryResult = await this.#doRetryAll();
      const hasNewFiles = this.getFiles().filter((file) => file.progress.uploadStarted == null).length > 0;
      if (!hasNewFiles) {
        this.emit("complete", retryResult);
        return retryResult;
      }
      ({ files } = this.getState());
    }
    const onBeforeUploadResult = this.opts.onBeforeUpload(files);
    if (onBeforeUploadResult === false) {
      return Promise.reject(new Error("Not starting the upload because onBeforeUpload returned false"));
    }
    if (onBeforeUploadResult && typeof onBeforeUploadResult === "object") {
      files = onBeforeUploadResult;
      this.setState({
        files
      });
    }
    return Promise.resolve().then(() => this.#restricter.validateMinNumberOfFiles(files)).catch((err) => {
      this.#informAndEmit([err]);
      throw err;
    }).then(() => {
      if (!this.#checkRequiredMetaFields(files)) {
        throw new RestrictionError(this.i18n("missingRequiredMetaField"));
      }
    }).catch((err) => {
      throw err;
    }).then(async () => {
      const { currentUploads } = this.getState();
      const currentlyUploadingFiles = Object.values(currentUploads).flatMap((curr) => curr.fileIDs);
      const waitingFileIDs = [];
      Object.keys(files).forEach((fileID) => {
        const file = this.getFile(fileID);
        if (!file.progress.uploadStarted && currentlyUploadingFiles.indexOf(fileID) === -1) {
          waitingFileIDs.push(file.id);
        }
      });
      const uploadID = this.#createUpload(waitingFileIDs);
      const result = await this.#runUpload(uploadID);
      this.emit("complete", result);
      return result;
    }).catch((err) => {
      this.emit("error", err);
      this.log(err, "error");
      throw err;
    });
  }
};
var f$1 = 0;
function u$1(e2, t2, n2, o2, i2, u2) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f$1, __i: -1, __u: 0, __source: i2, __self: u2 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l$2.vnode && l$2.vnode(l2), l2;
}
const version$6 = "4.3.2";
const packageJson$6 = {
  version: version$6
};
const TRANSITION_MS = 300;
class FadeIn extends x {
  ref = b$1();
  componentWillEnter(callback) {
    this.ref.current.style.opacity = "1";
    this.ref.current.style.transform = "none";
    setTimeout(callback, TRANSITION_MS);
  }
  componentWillLeave(callback) {
    this.ref.current.style.opacity = "0";
    this.ref.current.style.transform = "translateY(350%)";
    setTimeout(callback, TRANSITION_MS);
  }
  render() {
    const { children } = this.props;
    return u$1("div", { className: "uppy-Informer-animated", ref: this.ref, children });
  }
}
function assign(obj, props) {
  return Object.assign(obj, props);
}
function getKey(vnode, fallback) {
  return vnode?.key ?? fallback;
}
function linkRef(component, name) {
  const cache = component._ptgLinkedRefs || (component._ptgLinkedRefs = {});
  return cache[name] || // biome-ignore lint/suspicious/noAssignInExpressions: ...
  (cache[name] = (c2) => {
    component.refs[name] = c2;
  });
}
function getChildMapping(children) {
  const out = {};
  for (let i2 = 0; i2 < children.length; i2++) {
    if (children[i2] != null) {
      const key = getKey(children[i2], i2.toString(36));
      out[key] = children[i2];
    }
  }
  return out;
}
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};
  const getValueForKey = (key) => Object.hasOwn(next, key) ? next[key] : prev[key];
  const nextKeysPending = {};
  let pendingKeys = [];
  for (const prevKey in prev) {
    if (Object.hasOwn(next, prevKey)) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }
  const childMapping = {};
  for (const nextKey in next) {
    if (Object.hasOwn(nextKeysPending, nextKey)) {
      for (let i2 = 0; i2 < nextKeysPending[nextKey].length; i2++) {
        const pendingNextKey = nextKeysPending[nextKey][i2];
        childMapping[nextKeysPending[nextKey][i2]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }
  for (let i2 = 0; i2 < pendingKeys.length; i2++) {
    childMapping[pendingKeys[i2]] = getValueForKey(pendingKeys[i2]);
  }
  return childMapping;
}
const identity = (i2) => i2;
class TransitionGroup extends x {
  constructor(props, context) {
    super(props, context);
    this.refs = {};
    this.state = {
      children: getChildMapping(H$2(H$2(this.props.children)) || [])
    };
    this.performAppear = this.performAppear.bind(this);
    this.performEnter = this.performEnter.bind(this);
    this.performLeave = this.performLeave.bind(this);
  }
  componentWillMount() {
    this.currentlyTransitioningKeys = {};
    this.keysToAbortLeave = [];
    this.keysToEnter = [];
    this.keysToLeave = [];
  }
  componentDidMount() {
    const initialChildMapping = this.state.children;
    for (const key in initialChildMapping) {
      if (initialChildMapping[key]) {
        this.performAppear(key);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    const nextChildMapping = getChildMapping(H$2(nextProps.children) || []);
    const prevChildMapping = this.state.children;
    this.setState((prevState) => ({
      children: mergeChildMappings(prevState.children, nextChildMapping)
    }));
    let key;
    for (key in nextChildMapping) {
      if (Object.hasOwn(nextChildMapping, key)) {
        const hasPrev = prevChildMapping && Object.hasOwn(prevChildMapping, key);
        if (nextChildMapping[key] && hasPrev && this.currentlyTransitioningKeys[key]) {
          this.keysToEnter.push(key);
          this.keysToAbortLeave.push(key);
        } else if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
          this.keysToEnter.push(key);
        }
      }
    }
    for (key in prevChildMapping) {
      if (Object.hasOwn(prevChildMapping, key)) {
        const hasNext = nextChildMapping && Object.hasOwn(nextChildMapping, key);
        if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
          this.keysToLeave.push(key);
        }
      }
    }
  }
  componentDidUpdate() {
    const { keysToEnter } = this;
    this.keysToEnter = [];
    keysToEnter.forEach(this.performEnter);
    const { keysToLeave } = this;
    this.keysToLeave = [];
    keysToLeave.forEach(this.performLeave);
  }
  _finishAbort(key) {
    const idx = this.keysToAbortLeave.indexOf(key);
    if (idx !== -1) {
      this.keysToAbortLeave.splice(idx, 1);
    }
  }
  performAppear(key) {
    this.currentlyTransitioningKeys[key] = true;
    const component = this.refs[key];
    if (component?.componentWillAppear) {
      component.componentWillAppear(this._handleDoneAppearing.bind(this, key));
    } else {
      this._handleDoneAppearing(key);
    }
  }
  _handleDoneAppearing(key) {
    const component = this.refs[key];
    if (component?.componentDidAppear) {
      component.componentDidAppear();
    }
    delete this.currentlyTransitioningKeys[key];
    this._finishAbort(key);
    const currentChildMapping = getChildMapping(H$2(this.props.children) || []);
    if (!currentChildMapping || !Object.hasOwn(currentChildMapping, key)) {
      this.performLeave(key);
    }
  }
  performEnter(key) {
    this.currentlyTransitioningKeys[key] = true;
    const component = this.refs[key];
    if (component?.componentWillEnter) {
      component.componentWillEnter(this._handleDoneEntering.bind(this, key));
    } else {
      this._handleDoneEntering(key);
    }
  }
  _handleDoneEntering(key) {
    const component = this.refs[key];
    if (component?.componentDidEnter) {
      component.componentDidEnter();
    }
    delete this.currentlyTransitioningKeys[key];
    this._finishAbort(key);
    const currentChildMapping = getChildMapping(H$2(this.props.children) || []);
    if (!currentChildMapping || !Object.hasOwn(currentChildMapping, key)) {
      this.performLeave(key);
    }
  }
  performLeave(key) {
    const idx = this.keysToAbortLeave.indexOf(key);
    if (idx !== -1) {
      return;
    }
    this.currentlyTransitioningKeys[key] = true;
    const component = this.refs[key];
    if (component?.componentWillLeave) {
      component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
    } else {
      this._handleDoneLeaving(key);
    }
  }
  _handleDoneLeaving(key) {
    const idx = this.keysToAbortLeave.indexOf(key);
    if (idx !== -1) {
      return;
    }
    const component = this.refs[key];
    if (component?.componentDidLeave) {
      component.componentDidLeave();
    }
    delete this.currentlyTransitioningKeys[key];
    const currentChildMapping = getChildMapping(H$2(this.props.children) || []);
    if (currentChildMapping && Object.hasOwn(currentChildMapping, key)) {
      this.performEnter(key);
    } else {
      const children = assign({}, this.state.children);
      delete children[key];
      this.setState({ children });
    }
  }
  render({ childFactory, transitionLeave, transitionName: transitionName2, transitionAppear, transitionEnter, transitionLeaveTimeout, transitionEnterTimeout, transitionAppearTimeout, component, ...props }, { children }) {
    const childrenToRender = Object.entries(children).map(([key, child]) => {
      if (!child)
        return void 0;
      const ref2 = linkRef(this, key);
      return K$2(childFactory(child), { ref: ref2, key });
    }).filter(Boolean);
    return _$1(component, props, childrenToRender);
  }
}
TransitionGroup.defaultProps = {
  component: "span",
  childFactory: identity
};
class Informer extends UIPlugin {
  static VERSION = packageJson$6.version;
  constructor(uppy, opts) {
    super(uppy, opts);
    this.type = "progressindicator";
    this.id = this.opts.id || "Informer";
    this.title = "Informer";
  }
  render = (state) => {
    return u$1("div", { className: "uppy uppy-Informer", children: u$1(TransitionGroup, { children: state.info.map((info) => u$1(FadeIn, { children: u$1("p", { role: "alert", children: [info.message, " ", info.details && // biome-ignore lint/a11y/useKeyWithClickEvents: ...
    u$1("span", { "aria-label": info.details, "data-microtip-position": "top-left", "data-microtip-size": "medium", role: "tooltip", onClick: () => alert(`${info.message} 

 ${info.details}`), children: "?" })] }) }, info.message)) }) });
  };
  install() {
    const { target } = this.opts;
    if (target) {
      this.mount(target, this);
    }
  }
}
var classnames = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(module) {
  (function() {
    var hasOwn = {}.hasOwnProperty;
    function classNames2() {
      var classes = "";
      for (var i2 = 0; i2 < arguments.length; i2++) {
        var arg = arguments[i2];
        if (arg) {
          classes = appendClass(classes, parseValue(arg));
        }
      }
      return classes;
    }
    function parseValue(arg) {
      if (typeof arg === "string" || typeof arg === "number") {
        return arg;
      }
      if (typeof arg !== "object") {
        return "";
      }
      if (Array.isArray(arg)) {
        return classNames2.apply(null, arg);
      }
      if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
        return arg.toString();
      }
      var classes = "";
      for (var key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes = appendClass(classes, key);
        }
      }
      return classes;
    }
    function appendClass(value, newClass) {
      if (!newClass) {
        return value;
      }
      if (value) {
        return value + " " + newClass;
      }
      return value + newClass;
    }
    if (module.exports) {
      classNames2.default = classNames2;
      module.exports = classNames2;
    } else {
      window.classNames = classNames2;
    }
  })();
})(classnames);
var classnamesExports = classnames.exports;
const classNames = /* @__PURE__ */ getDefaultExportFromCjs(classnamesExports);
const STYLE_INNER = {
  position: "relative",
  // Disabled for our use case: the wrapper elements around FileList already deal with overflow,
  // and this additional property would hide things that we want to show.
  //
  // overflow: 'hidden',
  width: "100%",
  minHeight: "100%"
};
const STYLE_CONTENT = {
  position: "absolute",
  top: 0,
  left: 0,
  // Because the `top` value gets set to some offset, this `height` being 100% would make the scrollbar
  // stretch far beyond the content. For our use case, the content div actually can get its height from
  // the elements inside it, so we don't need to specify a `height` property at all.
  //
  // height: '100%',
  width: "100%",
  overflow: "visible"
};
class VirtualList extends x {
  constructor(props) {
    super(props);
    this.focusElement = null;
    this.state = {
      offset: 0,
      height: 0
    };
  }
  componentDidMount() {
    this.resize();
    window.addEventListener("resize", this.handleResize);
  }
  // TODO: refactor to stable lifecycle method
  componentWillUpdate() {
    if (this.base.contains(document.activeElement)) {
      this.focusElement = document.activeElement;
    }
  }
  componentDidUpdate() {
    if (this.focusElement?.parentNode && document.activeElement !== this.focusElement) {
      this.focusElement.focus();
    }
    this.focusElement = null;
    this.resize();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  handleScroll = () => {
    this.setState({ offset: this.base.scrollTop });
  };
  handleResize = () => {
    this.resize();
  };
  resize() {
    const { height } = this.state;
    if (height !== this.base.offsetHeight) {
      this.setState({
        height: this.base.offsetHeight
      });
    }
  }
  render({ data, rowHeight, renderRow, overscanCount = 10, ...props }) {
    const { offset, height } = this.state;
    let start = Math.floor(offset / rowHeight);
    let visibleRowCount = Math.floor(height / rowHeight);
    if (overscanCount) {
      start = Math.max(0, start - start % overscanCount);
      visibleRowCount += overscanCount;
    }
    const end = start + visibleRowCount + 4;
    const selection = data.slice(start, end);
    const styleInner = { ...STYLE_INNER, height: data.length * rowHeight };
    const styleContent = { ...STYLE_CONTENT, top: start * rowHeight };
    return u$1("div", { onScroll: this.handleScroll, ...props, children: u$1("div", { role: "presentation", style: styleInner, children: u$1("div", { role: "presentation", style: styleContent, children: selection.map(renderRow) }) }) });
  }
}
function defaultPickerIcon() {
  return u$1("svg", { "aria-hidden": "true", focusable: "false", width: "30", height: "30", viewBox: "0 0 30 30", children: u$1("path", { d: "M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm4.258-12.676v6.846h-8.426v-6.846H5.204l9.82-12.364 9.82 12.364H19.26z" }) });
}
function emaFilter(newValue, previousSmoothedValue, halfLife, dt) {
  if (newValue === previousSmoothedValue)
    return newValue;
  if (dt === 0)
    return previousSmoothedValue;
  return newValue + (previousSmoothedValue - newValue) * 2 ** (-dt / halfLife);
}
const version$5 = "4.2.2";
const packageJson$5 = {
  version: version$5
};
const locale$3 = {
  strings: {
    // Shown in the status bar while files are being uploaded.
    uploading: "Uploading",
    // Shown in the status bar once all files have been uploaded.
    complete: "Complete",
    // Shown in the status bar if an upload failed.
    uploadFailed: "Upload failed",
    // Shown in the status bar while the upload is paused.
    paused: "Paused",
    // Used as the label for the button that retries an upload.
    retry: "Retry",
    // Used as the label for the button that cancels an upload.
    cancel: "Cancel",
    // Used as the label for the button that pauses an upload.
    pause: "Pause",
    // Used as the label for the button that resumes an upload.
    resume: "Resume",
    // Used as the label for the button that resets the upload state after an upload
    done: "Done",
    // When `showProgressDetails` is set, shows the number of files that have been fully uploaded so far.
    filesUploadedOfTotal: {
      0: "%{complete} of %{smart_count} file uploaded",
      1: "%{complete} of %{smart_count} files uploaded"
    },
    // When `showProgressDetails` is set, shows the amount of bytes that have been uploaded so far.
    dataUploadedOfTotal: "%{complete} of %{total}",
    dataUploadedOfUnknown: "%{complete} of unknown",
    // When `showProgressDetails` is set, shows an estimation of how long the upload will take to complete.
    xTimeLeft: "%{time} left",
    // Used as the label for the button that starts an upload.
    uploadXFiles: {
      0: "Upload %{smart_count} file",
      1: "Upload %{smart_count} files"
    },
    // Used as the label for the button that starts an upload, if another upload has been started in the past
    // and new files were added later.
    uploadXNewFiles: {
      0: "Upload +%{smart_count} file",
      1: "Upload +%{smart_count} files"
    },
    upload: "Upload",
    retryUpload: "Retry upload",
    xMoreFilesAdded: {
      0: "%{smart_count} more file added",
      1: "%{smart_count} more files added"
    },
    showErrorDetails: "Show error details"
  }
};
const statusBarStates = {
  STATE_ERROR: "error",
  STATE_WAITING: "waiting",
  STATE_PREPROCESSING: "preprocessing",
  STATE_UPLOADING: "uploading",
  STATE_POSTPROCESSING: "postprocessing",
  STATE_COMPLETE: "complete"
};
function secondsToTime(rawSeconds) {
  const hours = Math.floor(rawSeconds / 3600) % 24;
  const minutes = Math.floor(rawSeconds / 60) % 60;
  const seconds = Math.floor(rawSeconds % 60);
  return { hours, minutes, seconds };
}
function prettyETA(seconds) {
  const time = secondsToTime(seconds);
  const hoursStr = time.hours === 0 ? "" : `${time.hours}h`;
  const minutesStr = time.minutes === 0 ? "" : `${time.hours === 0 ? time.minutes : ` ${time.minutes.toString(10).padStart(2, "0")}`}m`;
  const secondsStr = time.hours !== 0 ? "" : `${time.minutes === 0 ? time.seconds : ` ${time.seconds.toString(10).padStart(2, "0")}`}s`;
  return `${hoursStr}${minutesStr}${secondsStr}`;
}
const DOT = `·`;
const renderDot = () => ` ${DOT} `;
function UploadBtn(props) {
  const { newFiles, isUploadStarted, recoveredState, i18n, uploadState, isSomeGhost, startUpload } = props;
  const uploadBtnClassNames = classNames("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--upload", {
    "uppy-c-btn-primary": uploadState === statusBarStates.STATE_WAITING
  }, { "uppy-StatusBar-actionBtn--disabled": isSomeGhost });
  const uploadBtnText = newFiles && isUploadStarted && !recoveredState ? i18n("uploadXNewFiles", { smart_count: newFiles }) : i18n("uploadXFiles", { smart_count: newFiles });
  return u$1("button", { type: "button", className: uploadBtnClassNames, "aria-label": i18n("uploadXFiles", { smart_count: newFiles }), onClick: startUpload, disabled: isSomeGhost, "data-uppy-super-focusable": true, children: uploadBtnText });
}
function RetryBtn(props) {
  const { i18n, uppy } = props;
  return u$1("button", { type: "button", className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--retry", "aria-label": i18n("retryUpload"), onClick: () => uppy.retryAll().catch(() => {
  }), "data-uppy-super-focusable": true, "data-cy": "retry", children: [u$1("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "8", height: "10", viewBox: "0 0 8 10", children: u$1("path", { d: "M4 2.408a2.75 2.75 0 1 0 2.75 2.75.626.626 0 0 1 1.25.018v.023a4 4 0 1 1-4-4.041V.25a.25.25 0 0 1 .389-.208l2.299 1.533a.25.25 0 0 1 0 .416l-2.3 1.533A.25.25 0 0 1 4 3.316v-.908z" }) }), i18n("retry")] });
}
function CancelBtn(props) {
  const { i18n, uppy } = props;
  return u$1("button", { type: "button", className: "uppy-u-reset uppy-StatusBar-actionCircleBtn", title: i18n("cancel"), "aria-label": i18n("cancel"), onClick: () => uppy.cancelAll(), "data-cy": "cancel", "data-uppy-super-focusable": true, children: u$1("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "16", height: "16", viewBox: "0 0 16 16", children: u$1("g", { fill: "none", fillRule: "evenodd", children: [u$1("circle", { fill: "#888", cx: "8", cy: "8", r: "8" }), u$1("path", { fill: "#FFF", d: "M9.283 8l2.567 2.567-1.283 1.283L8 9.283 5.433 11.85 4.15 10.567 6.717 8 4.15 5.433 5.433 4.15 8 6.717l2.567-2.567 1.283 1.283z" })] }) }) });
}
function PauseResumeButton(props) {
  const { isAllPaused, i18n, isAllComplete, resumableUploads, uppy } = props;
  const title = isAllPaused ? i18n("resume") : i18n("pause");
  function togglePauseResume() {
    if (isAllComplete)
      return;
    if (!resumableUploads) {
      uppy.cancelAll();
      return;
    }
    if (isAllPaused) {
      uppy.resumeAll();
      return;
    }
    uppy.pauseAll();
  }
  return u$1("button", { title, "aria-label": title, className: "uppy-u-reset uppy-StatusBar-actionCircleBtn", type: "button", onClick: togglePauseResume, "data-cy": "togglePauseResume", "data-uppy-super-focusable": true, children: u$1("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "16", height: "16", viewBox: "0 0 16 16", children: u$1("g", { fill: "none", fillRule: "evenodd", children: [u$1("circle", { fill: "#888", cx: "8", cy: "8", r: "8" }), u$1("path", { fill: "#FFF", d: isAllPaused ? "M6 4.25L11.5 8 6 11.75z" : "M5 4.5h2v7H5v-7zm4 0h2v7H9v-7z" })] }) }) });
}
function DoneBtn(props) {
  const { i18n, doneButtonHandler } = props;
  return u$1("button", { type: "button", className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--done", onClick: doneButtonHandler, "data-uppy-super-focusable": true, children: i18n("done") });
}
function LoadingSpinner() {
  return u$1("svg", { className: "uppy-StatusBar-spinner", "aria-hidden": "true", focusable: "false", width: "14", height: "14", children: u$1("path", { d: "M13.983 6.547c-.12-2.509-1.64-4.893-3.939-5.936-2.48-1.127-5.488-.656-7.556 1.094C.524 3.367-.398 6.048.162 8.562c.556 2.495 2.46 4.52 4.94 5.183 2.932.784 5.61-.602 7.256-3.015-1.493 1.993-3.745 3.309-6.298 2.868-2.514-.434-4.578-2.349-5.153-4.84a6.226 6.226 0 0 1 2.98-6.778C6.34.586 9.74 1.1 11.373 3.493c.407.596.693 1.282.842 1.988.127.598.073 1.197.161 1.794.078.525.543 1.257 1.15.864.525-.341.49-1.05.456-1.592-.007-.15.02.3 0 0", fillRule: "evenodd" }) });
}
function ProgressBarProcessing(props) {
  const { progress } = props;
  const { value, mode, message } = progress;
  const dot = `·`;
  return u$1("div", { className: "uppy-StatusBar-content", children: [u$1(LoadingSpinner, {}), mode === "determinate" ? `${Math.round(value * 100)}% ${dot} ` : "", message] });
}
function ProgressDetails(props) {
  const { numUploads, complete, totalUploadedSize, totalSize, totalETA, i18n } = props;
  const ifShowFilesUploadedOfTotal = numUploads > 1;
  const totalUploadedSizeStr = prettierBytes$1(totalUploadedSize);
  return u$1("div", { className: "uppy-StatusBar-statusSecondary", children: [ifShowFilesUploadedOfTotal && i18n("filesUploadedOfTotal", {
    complete,
    smart_count: numUploads
  }), u$1("span", { className: "uppy-StatusBar-additionalInfo", children: [ifShowFilesUploadedOfTotal && renderDot(), totalSize != null ? i18n("dataUploadedOfTotal", {
    complete: totalUploadedSizeStr,
    total: prettierBytes$1(totalSize)
  }) : i18n("dataUploadedOfUnknown", { complete: totalUploadedSizeStr }), renderDot(), totalETA != null && i18n("xTimeLeft", {
    time: prettyETA(totalETA)
  })] })] });
}
function FileUploadCount(props) {
  const { i18n, complete, numUploads } = props;
  return u$1("div", { className: "uppy-StatusBar-statusSecondary", children: i18n("filesUploadedOfTotal", { complete, smart_count: numUploads }) });
}
function UploadNewlyAddedFiles(props) {
  const { i18n, newFiles, startUpload } = props;
  const uploadBtnClassNames = classNames("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--uploadNewlyAdded");
  return u$1("div", { className: "uppy-StatusBar-statusSecondary", children: [u$1("div", { className: "uppy-StatusBar-statusSecondaryHint", children: i18n("xMoreFilesAdded", { smart_count: newFiles }) }), u$1("button", { type: "button", className: uploadBtnClassNames, "aria-label": i18n("uploadXFiles", { smart_count: newFiles }), onClick: startUpload, children: i18n("upload") })] });
}
function ProgressBarUploading(props) {
  const { i18n, supportsUploadProgress: supportsUploadProgress2, totalProgress, showProgressDetails, isUploadStarted, isAllComplete, isAllPaused, newFiles, numUploads, complete, totalUploadedSize, totalSize, totalETA, startUpload } = props;
  const showUploadNewlyAddedFiles = newFiles && isUploadStarted;
  if (!isUploadStarted || isAllComplete) {
    return null;
  }
  const title = isAllPaused ? i18n("paused") : i18n("uploading");
  function renderProgressDetails() {
    if (!isAllPaused && !showUploadNewlyAddedFiles && showProgressDetails) {
      if (supportsUploadProgress2) {
        return u$1(ProgressDetails, { numUploads, complete, totalUploadedSize, totalSize, totalETA, i18n });
      }
      return u$1(FileUploadCount, { i18n, complete, numUploads });
    }
    return null;
  }
  return u$1("div", { className: "uppy-StatusBar-content", title, children: [!isAllPaused ? u$1(LoadingSpinner, {}) : null, u$1("div", { className: "uppy-StatusBar-status", children: [u$1("div", { className: "uppy-StatusBar-statusPrimary", children: supportsUploadProgress2 && totalProgress !== 0 ? `${title}: ${totalProgress}%` : title }), renderProgressDetails(), showUploadNewlyAddedFiles ? u$1(UploadNewlyAddedFiles, { i18n, newFiles, startUpload }) : null] })] });
}
function ProgressBarComplete(props) {
  const { i18n } = props;
  return u$1("div", {
    className: "uppy-StatusBar-content",
    // biome-ignore lint/a11y/useSemanticElements: ...
    role: "status",
    title: i18n("complete"),
    children: u$1("div", { className: "uppy-StatusBar-status", children: u$1("div", { className: "uppy-StatusBar-statusPrimary", children: [u$1("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-StatusBar-statusIndicator uppy-c-icon", width: "15", height: "11", viewBox: "0 0 15 11", children: u$1("path", { d: "M.414 5.843L1.627 4.63l3.472 3.472L13.202 0l1.212 1.213L5.1 10.528z" }) }), i18n("complete")] }) })
  });
}
function ProgressBarError(props) {
  const { error, i18n, complete, numUploads } = props;
  function displayErrorAlert() {
    const errorMessage = `${i18n("uploadFailed")} 

 ${error}`;
    alert(errorMessage);
  }
  return u$1("div", { className: "uppy-StatusBar-content", title: i18n("uploadFailed"), children: [u$1("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-StatusBar-statusIndicator uppy-c-icon", width: "11", height: "11", viewBox: "0 0 11 11", children: u$1("path", { d: "M4.278 5.5L0 1.222 1.222 0 5.5 4.278 9.778 0 11 1.222 6.722 5.5 11 9.778 9.778 11 5.5 6.722 1.222 11 0 9.778z" }) }), u$1("div", { className: "uppy-StatusBar-status", children: [u$1("div", { className: "uppy-StatusBar-statusPrimary", children: [i18n("uploadFailed"), u$1("button", { className: "uppy-u-reset uppy-StatusBar-details", "aria-label": i18n("showErrorDetails"), "data-microtip-position": "top-right", "data-microtip-size": "medium", onClick: displayErrorAlert, type: "button", children: "?" })] }), u$1(FileUploadCount, { i18n, complete, numUploads })] })] });
}
function calculateProcessingProgress(files) {
  const values = [];
  let mode = "indeterminate";
  let message;
  for (const { progress } of Object.values(files)) {
    const { preprocess, postprocess } = progress;
    if (message == null && (preprocess || postprocess)) {
      ({ mode, message } = preprocess || postprocess);
    }
    if (preprocess?.mode === "determinate")
      values.push(preprocess.value);
    if (postprocess?.mode === "determinate")
      values.push(postprocess.value);
  }
  const value = values.reduce((total, progressValue) => {
    return total + progressValue / values.length;
  }, 0);
  return {
    mode,
    message,
    value
  };
}
const { STATE_ERROR, STATE_WAITING, STATE_PREPROCESSING, STATE_UPLOADING, STATE_POSTPROCESSING, STATE_COMPLETE } = statusBarStates;
function StatusBarUI({ newFiles, allowNewUpload, isUploadInProgress, isAllPaused, resumableUploads, error, hideUploadButton = void 0, hidePauseResumeButton = false, hideCancelButton = false, hideRetryButton = false, recoveredState, uploadState, totalProgress, files, supportsUploadProgress: supportsUploadProgress2, hideAfterFinish = false, isSomeGhost, doneButtonHandler = void 0, isUploadStarted, i18n, startUpload, uppy, isAllComplete, showProgressDetails = void 0, numUploads, complete, totalSize, totalETA, totalUploadedSize }) {
  function getProgressValue() {
    switch (uploadState) {
      case STATE_POSTPROCESSING:
      case STATE_PREPROCESSING: {
        const progress = calculateProcessingProgress(files);
        if (progress.mode === "determinate") {
          return progress.value * 100;
        }
        return totalProgress;
      }
      case STATE_ERROR: {
        return null;
      }
      case STATE_UPLOADING: {
        if (!supportsUploadProgress2) {
          return null;
        }
        return totalProgress;
      }
      default:
        return totalProgress;
    }
  }
  function getIsIndeterminate() {
    switch (uploadState) {
      case STATE_POSTPROCESSING:
      case STATE_PREPROCESSING: {
        const { mode } = calculateProcessingProgress(files);
        return mode === "indeterminate";
      }
      case STATE_UPLOADING: {
        if (!supportsUploadProgress2) {
          return true;
        }
        return false;
      }
      default:
        return false;
    }
  }
  const progressValue = getProgressValue();
  const width = progressValue ?? 100;
  const showUploadBtn = !error && newFiles && (!isUploadInProgress && !isAllPaused || recoveredState) && allowNewUpload && !hideUploadButton;
  const showCancelBtn = !hideCancelButton && uploadState !== STATE_WAITING && uploadState !== STATE_COMPLETE;
  const showPauseResumeBtn = resumableUploads && !hidePauseResumeButton && uploadState === STATE_UPLOADING;
  const showRetryBtn = error && !isAllComplete && !hideRetryButton;
  const showDoneBtn = doneButtonHandler && uploadState === STATE_COMPLETE;
  const progressClassNames = classNames("uppy-StatusBar-progress", {
    "is-indeterminate": getIsIndeterminate()
  });
  const statusBarClassNames = classNames("uppy-StatusBar", `is-${uploadState}`, { "has-ghosts": isSomeGhost });
  const progressBarStateEl = (() => {
    switch (uploadState) {
      case STATE_PREPROCESSING:
      case STATE_POSTPROCESSING:
        return u$1(ProgressBarProcessing, { progress: calculateProcessingProgress(files) });
      case STATE_COMPLETE:
        return u$1(ProgressBarComplete, { i18n });
      case STATE_ERROR:
        return u$1(ProgressBarError, { error, i18n, numUploads, complete });
      case STATE_UPLOADING:
        return u$1(ProgressBarUploading, { i18n, supportsUploadProgress: supportsUploadProgress2, totalProgress, showProgressDetails, isUploadStarted, isAllComplete, isAllPaused, newFiles, numUploads, complete, totalUploadedSize, totalSize, totalETA, startUpload });
      default:
        return null;
    }
  })();
  const atLeastOneAction = showUploadBtn || showRetryBtn || showPauseResumeBtn || showCancelBtn || showDoneBtn;
  const thereIsNothingInside = !atLeastOneAction && !progressBarStateEl;
  const isHidden = thereIsNothingInside || uploadState === STATE_COMPLETE && hideAfterFinish;
  if (isHidden) {
    return null;
  }
  return u$1("div", { className: statusBarClassNames, children: [u$1("div", { className: progressClassNames, style: { width: `${width}%` }, role: "progressbar", "aria-label": `${width}%`, "aria-valuetext": `${width}%`, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": progressValue }), progressBarStateEl, u$1("div", { className: "uppy-StatusBar-actions", children: [showUploadBtn ? u$1(UploadBtn, { newFiles, isUploadStarted, recoveredState, i18n, isSomeGhost, startUpload, uploadState }) : null, showRetryBtn ? u$1(RetryBtn, { i18n, uppy }) : null, showPauseResumeBtn ? u$1(PauseResumeButton, { isAllPaused, i18n, isAllComplete, resumableUploads, uppy }) : null, showCancelBtn ? u$1(CancelBtn, { i18n, uppy }) : null, showDoneBtn ? u$1(DoneBtn, { i18n, doneButtonHandler }) : null] })] });
}
const speedFilterHalfLife = 2e3;
const ETAFilterHalfLife = 2e3;
function getUploadingState$1(error, isAllComplete, recoveredState, files) {
  if (error) {
    return statusBarStates.STATE_ERROR;
  }
  if (isAllComplete) {
    return statusBarStates.STATE_COMPLETE;
  }
  if (recoveredState) {
    return statusBarStates.STATE_WAITING;
  }
  let state = statusBarStates.STATE_WAITING;
  const fileIDs = Object.keys(files);
  for (let i2 = 0; i2 < fileIDs.length; i2++) {
    const { progress } = files[fileIDs[i2]];
    if (progress.uploadStarted && !progress.uploadComplete) {
      return statusBarStates.STATE_UPLOADING;
    }
    if (progress.preprocess) {
      state = statusBarStates.STATE_PREPROCESSING;
    }
    if (progress.postprocess && state !== statusBarStates.STATE_PREPROCESSING) {
      state = statusBarStates.STATE_POSTPROCESSING;
    }
  }
  return state;
}
const defaultOptions$5 = {
  hideUploadButton: false,
  hideRetryButton: false,
  hidePauseResumeButton: false,
  hideCancelButton: false,
  showProgressDetails: false,
  hideAfterFinish: true,
  doneButtonHandler: null
};
class StatusBar extends UIPlugin {
  static VERSION = packageJson$5.version;
  #lastUpdateTime;
  #previousUploadedBytes;
  #previousSpeed;
  #previousETA;
  constructor(uppy, opts) {
    super(uppy, { ...defaultOptions$5, ...opts });
    this.id = this.opts.id || "StatusBar";
    this.title = "StatusBar";
    this.type = "progressindicator";
    this.defaultLocale = locale$3;
    this.i18nInit();
    this.render = this.render.bind(this);
    this.install = this.install.bind(this);
  }
  #computeSmoothETA(totalBytes) {
    if (totalBytes.total == null || totalBytes.total === 0) {
      return null;
    }
    const remaining = totalBytes.total - totalBytes.uploaded;
    if (remaining <= 0) {
      return null;
    }
    this.#lastUpdateTime ??= performance.now();
    const dt = performance.now() - this.#lastUpdateTime;
    if (dt === 0) {
      return Math.round((this.#previousETA ?? 0) / 100) / 10;
    }
    const uploadedBytesSinceLastTick = totalBytes.uploaded - this.#previousUploadedBytes;
    this.#previousUploadedBytes = totalBytes.uploaded;
    if (uploadedBytesSinceLastTick <= 0) {
      return Math.round((this.#previousETA ?? 0) / 100) / 10;
    }
    const currentSpeed = uploadedBytesSinceLastTick / dt;
    const filteredSpeed = this.#previousSpeed == null ? currentSpeed : emaFilter(currentSpeed, this.#previousSpeed, speedFilterHalfLife, dt);
    this.#previousSpeed = filteredSpeed;
    const instantETA = remaining / filteredSpeed;
    const updatedPreviousETA = Math.max(this.#previousETA - dt, 0);
    const filteredETA = this.#previousETA == null ? instantETA : emaFilter(instantETA, updatedPreviousETA, ETAFilterHalfLife, dt);
    this.#previousETA = filteredETA;
    this.#lastUpdateTime = performance.now();
    return Math.round(filteredETA / 100) / 10;
  }
  startUpload = () => {
    return this.uppy.upload().catch(() => {
    });
  };
  render(state) {
    const { capabilities, files, allowNewUpload, totalProgress, error, recoveredState } = state;
    const { newFiles, startedFiles, completeFiles, isUploadStarted, isAllComplete, isAllPaused, isUploadInProgress, isSomeGhost } = this.uppy.getObjectOfFilesPerState();
    const newFilesOrRecovered = recoveredState ? Object.values(files) : newFiles;
    const resumableUploads = !!capabilities.resumableUploads;
    const supportsUploadProgress2 = capabilities.uploadProgress !== false;
    let totalSize = null;
    let totalUploadedSize = 0;
    if (startedFiles.every((f2) => f2.progress.bytesTotal != null && f2.progress.bytesTotal !== 0)) {
      totalSize = 0;
      startedFiles.forEach((file) => {
        totalSize += file.progress.bytesTotal || 0;
        totalUploadedSize += file.progress.bytesUploaded || 0;
      });
    } else {
      startedFiles.forEach((file) => {
        totalUploadedSize += file.progress.bytesUploaded || 0;
      });
    }
    const totalETA = this.#computeSmoothETA({
      uploaded: totalUploadedSize,
      total: totalSize
    });
    return StatusBarUI({
      error,
      uploadState: getUploadingState$1(error, isAllComplete, recoveredState, state.files || {}),
      allowNewUpload,
      totalProgress,
      totalSize,
      totalUploadedSize,
      isAllComplete: false,
      isAllPaused,
      isUploadStarted,
      isUploadInProgress,
      isSomeGhost,
      recoveredState,
      complete: completeFiles.length,
      newFiles: newFilesOrRecovered.length,
      numUploads: startedFiles.length,
      totalETA,
      files,
      i18n: this.i18n,
      uppy: this.uppy,
      startUpload: this.startUpload,
      doneButtonHandler: this.opts.doneButtonHandler,
      resumableUploads,
      supportsUploadProgress: supportsUploadProgress2,
      showProgressDetails: this.opts.showProgressDetails,
      hideUploadButton: this.opts.hideUploadButton,
      hideRetryButton: this.opts.hideRetryButton,
      hidePauseResumeButton: this.opts.hidePauseResumeButton,
      hideCancelButton: this.opts.hideCancelButton,
      hideAfterFinish: this.opts.hideAfterFinish
    });
  }
  onMount() {
    const element = this.el;
    const direction = getTextDirection(element);
    if (!direction) {
      element.dir = "ltr";
    }
  }
  #onUploadStart = () => {
    const { recoveredState } = this.uppy.getState();
    this.#previousSpeed = null;
    this.#previousETA = null;
    if (recoveredState) {
      this.#previousUploadedBytes = Object.values(recoveredState.files).reduce((pv, { progress }) => pv + progress.bytesUploaded, 0);
      this.uppy.emit("restore-confirmed");
      return;
    }
    this.#lastUpdateTime = performance.now();
    this.#previousUploadedBytes = 0;
  };
  install() {
    const { target } = this.opts;
    if (target) {
      this.mount(target, this);
    }
    this.uppy.on("upload", this.#onUploadStart);
    this.#lastUpdateTime = performance.now();
    this.#previousUploadedBytes = this.uppy.getFiles().reduce((pv, file) => pv + file.progress.bytesUploaded, 0);
  }
  uninstall() {
    this.unmount();
    this.uppy.off("upload", this.#onUploadStart);
  }
}
const DATA_URL_PATTERN = /^data:([^/]+\/[^,;]+(?:[^,]*?))(;base64)?,([\s\S]*)$/;
function dataURItoBlob(dataURI, opts, toFile) {
  const dataURIData = DATA_URL_PATTERN.exec(dataURI);
  const mimeType = opts.mimeType ?? dataURIData?.[1] ?? "plain/text";
  let data;
  if (dataURIData?.[2] != null) {
    const binary = atob(decodeURIComponent(dataURIData[3]));
    const bytes = new Uint8Array(binary.length);
    for (let i2 = 0; i2 < binary.length; i2++) {
      bytes[i2] = binary.charCodeAt(i2);
    }
    data = [bytes];
  } else if (dataURIData?.[3] != null) {
    data = [decodeURIComponent(dataURIData[3])];
  }
  return new Blob(data, { type: mimeType });
}
function isObjectURL(url) {
  return url.startsWith("blob:");
}
function isPreviewSupported(fileType) {
  if (!fileType)
    return false;
  return /^[^/]+\/(jpe?g|gif|png|svg|svg\+xml|bmp|webp|avif)$/.test(fileType);
}
function e(e2, t2, s2) {
  return t2 in e2 ? Object.defineProperty(e2, t2, { value: s2, enumerable: true, configurable: true, writable: true }) : e2[t2] = s2, e2;
}
var t = "undefined" != typeof self ? self : global;
const s = "undefined" != typeof navigator, i = s && "undefined" == typeof HTMLImageElement, n = !("undefined" == typeof global || "undefined" == typeof process || !process.versions || !process.versions.node), r = t.Buffer, a = !!r, h = (e2) => void 0 !== e2;
function f(e2) {
  return void 0 === e2 || (e2 instanceof Map ? 0 === e2.size : 0 === Object.values(e2).filter(h).length);
}
function l(e2) {
  let t2 = new Error(e2);
  throw delete t2.stack, t2;
}
function o(e2) {
  let t2 = function(e3) {
    let t3 = 0;
    return e3.ifd0.enabled && (t3 += 1024), e3.exif.enabled && (t3 += 2048), e3.makerNote && (t3 += 2048), e3.userComment && (t3 += 1024), e3.gps.enabled && (t3 += 512), e3.interop.enabled && (t3 += 100), e3.ifd1.enabled && (t3 += 1024), t3 + 2048;
  }(e2);
  return e2.jfif.enabled && (t2 += 50), e2.xmp.enabled && (t2 += 2e4), e2.iptc.enabled && (t2 += 14e3), e2.icc.enabled && (t2 += 6e3), t2;
}
const u = (e2) => String.fromCharCode.apply(null, e2), d = "undefined" != typeof TextDecoder ? new TextDecoder("utf-8") : void 0;
class c {
  static from(e2, t2) {
    return e2 instanceof this && e2.le === t2 ? e2 : new c(e2, void 0, void 0, t2);
  }
  constructor(e2, t2 = 0, s2, i2) {
    if ("boolean" == typeof i2 && (this.le = i2), Array.isArray(e2) && (e2 = new Uint8Array(e2)), 0 === e2) this.byteOffset = 0, this.byteLength = 0;
    else if (e2 instanceof ArrayBuffer) {
      void 0 === s2 && (s2 = e2.byteLength - t2);
      let i3 = new DataView(e2, t2, s2);
      this._swapDataView(i3);
    } else if (e2 instanceof Uint8Array || e2 instanceof DataView || e2 instanceof c) {
      void 0 === s2 && (s2 = e2.byteLength - t2), (t2 += e2.byteOffset) + s2 > e2.byteOffset + e2.byteLength && l("Creating view outside of available memory in ArrayBuffer");
      let i3 = new DataView(e2.buffer, t2, s2);
      this._swapDataView(i3);
    } else if ("number" == typeof e2) {
      let t3 = new DataView(new ArrayBuffer(e2));
      this._swapDataView(t3);
    } else l("Invalid input argument for BufferView: " + e2);
  }
  _swapArrayBuffer(e2) {
    this._swapDataView(new DataView(e2));
  }
  _swapBuffer(e2) {
    this._swapDataView(new DataView(e2.buffer, e2.byteOffset, e2.byteLength));
  }
  _swapDataView(e2) {
    this.dataView = e2, this.buffer = e2.buffer, this.byteOffset = e2.byteOffset, this.byteLength = e2.byteLength;
  }
  _lengthToEnd(e2) {
    return this.byteLength - e2;
  }
  set(e2, t2, s2 = c) {
    return e2 instanceof DataView || e2 instanceof c ? e2 = new Uint8Array(e2.buffer, e2.byteOffset, e2.byteLength) : e2 instanceof ArrayBuffer && (e2 = new Uint8Array(e2)), e2 instanceof Uint8Array || l("BufferView.set(): Invalid data argument."), this.toUint8().set(e2, t2), new s2(this, t2, e2.byteLength);
  }
  subarray(e2, t2) {
    return t2 = t2 || this._lengthToEnd(e2), new c(this, e2, t2);
  }
  toUint8() {
    return new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
  }
  getUint8Array(e2, t2) {
    return new Uint8Array(this.buffer, this.byteOffset + e2, t2);
  }
  getString(e2 = 0, t2 = this.byteLength) {
    let s2 = this.getUint8Array(e2, t2);
    return i2 = s2, d ? d.decode(i2) : a ? Buffer.from(i2).toString("utf8") : decodeURIComponent(escape(u(i2)));
    var i2;
  }
  getLatin1String(e2 = 0, t2 = this.byteLength) {
    let s2 = this.getUint8Array(e2, t2);
    return u(s2);
  }
  getUnicodeString(e2 = 0, t2 = this.byteLength) {
    const s2 = [];
    for (let i2 = 0; i2 < t2 && e2 + i2 < this.byteLength; i2 += 2) s2.push(this.getUint16(e2 + i2));
    return u(s2);
  }
  getInt8(e2) {
    return this.dataView.getInt8(e2);
  }
  getUint8(e2) {
    return this.dataView.getUint8(e2);
  }
  getInt16(e2, t2 = this.le) {
    return this.dataView.getInt16(e2, t2);
  }
  getInt32(e2, t2 = this.le) {
    return this.dataView.getInt32(e2, t2);
  }
  getUint16(e2, t2 = this.le) {
    return this.dataView.getUint16(e2, t2);
  }
  getUint32(e2, t2 = this.le) {
    return this.dataView.getUint32(e2, t2);
  }
  getFloat32(e2, t2 = this.le) {
    return this.dataView.getFloat32(e2, t2);
  }
  getFloat64(e2, t2 = this.le) {
    return this.dataView.getFloat64(e2, t2);
  }
  getFloat(e2, t2 = this.le) {
    return this.dataView.getFloat32(e2, t2);
  }
  getDouble(e2, t2 = this.le) {
    return this.dataView.getFloat64(e2, t2);
  }
  getUintBytes(e2, t2, s2) {
    switch (t2) {
      case 1:
        return this.getUint8(e2, s2);
      case 2:
        return this.getUint16(e2, s2);
      case 4:
        return this.getUint32(e2, s2);
      case 8:
        return this.getUint64 && this.getUint64(e2, s2);
    }
  }
  getUint(e2, t2, s2) {
    switch (t2) {
      case 8:
        return this.getUint8(e2, s2);
      case 16:
        return this.getUint16(e2, s2);
      case 32:
        return this.getUint32(e2, s2);
      case 64:
        return this.getUint64 && this.getUint64(e2, s2);
    }
  }
  toString(e2) {
    return this.dataView.toString(e2, this.constructor.name);
  }
  ensureChunk() {
  }
}
function p(e2, t2) {
  l(`${e2} '${t2}' was not loaded, try using full build of exifr.`);
}
class g extends Map {
  constructor(e2) {
    super(), this.kind = e2;
  }
  get(e2, t2) {
    return this.has(e2) || p(this.kind, e2), t2 && (e2 in t2 || function(e3, t3) {
      l(`Unknown ${e3} '${t3}'.`);
    }(this.kind, e2), t2[e2].enabled || p(this.kind, e2)), super.get(e2);
  }
  keyList() {
    return Array.from(this.keys());
  }
}
var m = new g("file parser"), y = new g("segment parser"), b = new g("file reader");
let w = t.fetch;
function k(e2, t2) {
  return (i2 = e2).startsWith("data:") || i2.length > 1e4 ? v(e2, t2, "base64") : n && e2.includes("://") ? O(e2, t2, "url", S) : n ? v(e2, t2, "fs") : s ? O(e2, t2, "url", S) : void l("Invalid input argument");
  var i2;
}
async function O(e2, t2, s2, i2) {
  return b.has(s2) ? v(e2, t2, s2) : i2 ? async function(e3, t3) {
    let s3 = await t3(e3);
    return new c(s3);
  }(e2, i2) : void l(`Parser ${s2} is not loaded`);
}
async function v(e2, t2, s2) {
  let i2 = new (b.get(s2))(e2, t2);
  return await i2.read(), i2;
}
const S = (e2) => w(e2).then((e3) => e3.arrayBuffer()), A = (e2) => new Promise((t2, s2) => {
  let i2 = new FileReader();
  i2.onloadend = () => t2(i2.result || new ArrayBuffer()), i2.onerror = s2, i2.readAsArrayBuffer(e2);
});
const B = /* @__PURE__ */ new Map(), V = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Map(), L = ["chunked", "firstChunkSize", "firstChunkSizeNode", "firstChunkSizeBrowser", "chunkSize", "chunkLimit"], T = ["jfif", "xmp", "icc", "iptc", "ihdr"], z = ["tiff", ...T], P = ["ifd0", "ifd1", "exif", "gps", "interop"], F = [...z, ...P], j = ["makerNote", "userComment"], E = ["translateKeys", "translateValues", "reviveValues", "multiSegment"], M = [...E, "sanitize", "mergeOutput", "silentErrors"];
class _ {
  get translate() {
    return this.translateKeys || this.translateValues || this.reviveValues;
  }
}
class D extends _ {
  get needed() {
    return this.enabled || this.deps.size > 0;
  }
  constructor(t2, s2, i2, n2) {
    if (super(), e(this, "enabled", false), e(this, "skip", /* @__PURE__ */ new Set()), e(this, "pick", /* @__PURE__ */ new Set()), e(this, "deps", /* @__PURE__ */ new Set()), e(this, "translateKeys", false), e(this, "translateValues", false), e(this, "reviveValues", false), this.key = t2, this.enabled = s2, this.parse = this.enabled, this.applyInheritables(n2), this.canBeFiltered = P.includes(t2), this.canBeFiltered && (this.dict = B.get(t2)), void 0 !== i2) if (Array.isArray(i2)) this.parse = this.enabled = true, this.canBeFiltered && i2.length > 0 && this.translateTagSet(i2, this.pick);
    else if ("object" == typeof i2) {
      if (this.enabled = true, this.parse = false !== i2.parse, this.canBeFiltered) {
        let { pick: e2, skip: t3 } = i2;
        e2 && e2.length > 0 && this.translateTagSet(e2, this.pick), t3 && t3.length > 0 && this.translateTagSet(t3, this.skip);
      }
      this.applyInheritables(i2);
    } else true === i2 || false === i2 ? this.parse = this.enabled = i2 : l(`Invalid options argument: ${i2}`);
  }
  applyInheritables(e2) {
    let t2, s2;
    for (t2 of E) s2 = e2[t2], void 0 !== s2 && (this[t2] = s2);
  }
  translateTagSet(e2, t2) {
    if (this.dict) {
      let s2, i2, { tagKeys: n2, tagValues: r2 } = this.dict;
      for (s2 of e2) "string" == typeof s2 ? (i2 = r2.indexOf(s2), -1 === i2 && (i2 = n2.indexOf(Number(s2))), -1 !== i2 && t2.add(Number(n2[i2]))) : t2.add(s2);
    } else for (let s2 of e2) t2.add(s2);
  }
  finalizeFilters() {
    !this.enabled && this.deps.size > 0 ? (this.enabled = true, X(this.pick, this.deps)) : this.enabled && this.pick.size > 0 && X(this.pick, this.deps);
  }
}
var N = { jfif: false, tiff: true, xmp: false, icc: false, iptc: false, ifd0: true, ifd1: false, exif: true, gps: true, interop: false, ihdr: void 0, makerNote: false, userComment: false, multiSegment: false, skip: [], pick: [], translateKeys: true, translateValues: true, reviveValues: true, sanitize: true, mergeOutput: true, silentErrors: true, chunked: true, firstChunkSize: void 0, firstChunkSizeNode: 512, firstChunkSizeBrowser: 65536, chunkSize: 65536, chunkLimit: 5 }, $ = /* @__PURE__ */ new Map();
class R extends _ {
  static useCached(e2) {
    let t2 = $.get(e2);
    return void 0 !== t2 || (t2 = new this(e2), $.set(e2, t2)), t2;
  }
  constructor(e2) {
    super(), true === e2 ? this.setupFromTrue() : void 0 === e2 ? this.setupFromUndefined() : Array.isArray(e2) ? this.setupFromArray(e2) : "object" == typeof e2 ? this.setupFromObject(e2) : l(`Invalid options argument ${e2}`), void 0 === this.firstChunkSize && (this.firstChunkSize = s ? this.firstChunkSizeBrowser : this.firstChunkSizeNode), this.mergeOutput && (this.ifd1.enabled = false), this.filterNestedSegmentTags(), this.traverseTiffDependencyTree(), this.checkLoadedPlugins();
  }
  setupFromUndefined() {
    let e2;
    for (e2 of L) this[e2] = N[e2];
    for (e2 of M) this[e2] = N[e2];
    for (e2 of j) this[e2] = N[e2];
    for (e2 of F) this[e2] = new D(e2, N[e2], void 0, this);
  }
  setupFromTrue() {
    let e2;
    for (e2 of L) this[e2] = N[e2];
    for (e2 of M) this[e2] = N[e2];
    for (e2 of j) this[e2] = true;
    for (e2 of F) this[e2] = new D(e2, true, void 0, this);
  }
  setupFromArray(e2) {
    let t2;
    for (t2 of L) this[t2] = N[t2];
    for (t2 of M) this[t2] = N[t2];
    for (t2 of j) this[t2] = N[t2];
    for (t2 of F) this[t2] = new D(t2, false, void 0, this);
    this.setupGlobalFilters(e2, void 0, P);
  }
  setupFromObject(e2) {
    let t2;
    for (t2 of (P.ifd0 = P.ifd0 || P.image, P.ifd1 = P.ifd1 || P.thumbnail, Object.assign(this, e2), L)) this[t2] = W(e2[t2], N[t2]);
    for (t2 of M) this[t2] = W(e2[t2], N[t2]);
    for (t2 of j) this[t2] = W(e2[t2], N[t2]);
    for (t2 of z) this[t2] = new D(t2, N[t2], e2[t2], this);
    for (t2 of P) this[t2] = new D(t2, N[t2], e2[t2], this.tiff);
    this.setupGlobalFilters(e2.pick, e2.skip, P, F), true === e2.tiff ? this.batchEnableWithBool(P, true) : false === e2.tiff ? this.batchEnableWithUserValue(P, e2) : Array.isArray(e2.tiff) ? this.setupGlobalFilters(e2.tiff, void 0, P) : "object" == typeof e2.tiff && this.setupGlobalFilters(e2.tiff.pick, e2.tiff.skip, P);
  }
  batchEnableWithBool(e2, t2) {
    for (let s2 of e2) this[s2].enabled = t2;
  }
  batchEnableWithUserValue(e2, t2) {
    for (let s2 of e2) {
      let e3 = t2[s2];
      this[s2].enabled = false !== e3 && void 0 !== e3;
    }
  }
  setupGlobalFilters(e2, t2, s2, i2 = s2) {
    if (e2 && e2.length) {
      for (let e3 of i2) this[e3].enabled = false;
      let t3 = K(e2, s2);
      for (let [e3, s3] of t3) X(this[e3].pick, s3), this[e3].enabled = true;
    } else if (t2 && t2.length) {
      let e3 = K(t2, s2);
      for (let [t3, s3] of e3) X(this[t3].skip, s3);
    }
  }
  filterNestedSegmentTags() {
    let { ifd0: e2, exif: t2, xmp: s2, iptc: i2, icc: n2 } = this;
    this.makerNote ? t2.deps.add(37500) : t2.skip.add(37500), this.userComment ? t2.deps.add(37510) : t2.skip.add(37510), s2.enabled || e2.skip.add(700), i2.enabled || e2.skip.add(33723), n2.enabled || e2.skip.add(34675);
  }
  traverseTiffDependencyTree() {
    let { ifd0: e2, exif: t2, gps: s2, interop: i2 } = this;
    i2.needed && (t2.deps.add(40965), e2.deps.add(40965)), t2.needed && e2.deps.add(34665), s2.needed && e2.deps.add(34853), this.tiff.enabled = P.some((e3) => true === this[e3].enabled) || this.makerNote || this.userComment;
    for (let e3 of P) this[e3].finalizeFilters();
  }
  get onlyTiff() {
    return !T.map((e2) => this[e2].enabled).some((e2) => true === e2) && this.tiff.enabled;
  }
  checkLoadedPlugins() {
    for (let e2 of z) this[e2].enabled && !y.has(e2) && p("segment parser", e2);
  }
}
function K(e2, t2) {
  let s2, i2, n2, r2, a2 = [];
  for (n2 of t2) {
    for (r2 of (s2 = B.get(n2), i2 = [], s2)) (e2.includes(r2[0]) || e2.includes(r2[1])) && i2.push(r2[0]);
    i2.length && a2.push([n2, i2]);
  }
  return a2;
}
function W(e2, t2) {
  return void 0 !== e2 ? e2 : void 0 !== t2 ? t2 : void 0;
}
function X(e2, t2) {
  for (let s2 of t2) e2.add(s2);
}
e(R, "default", N);
class H {
  constructor(t2) {
    e(this, "parsers", {}), e(this, "output", {}), e(this, "errors", []), e(this, "pushToErrors", (e2) => this.errors.push(e2)), this.options = R.useCached(t2);
  }
  async read(e2) {
    this.file = await function(e3, t2) {
      return "string" == typeof e3 ? k(e3, t2) : s && !i && e3 instanceof HTMLImageElement ? k(e3.src, t2) : e3 instanceof Uint8Array || e3 instanceof ArrayBuffer || e3 instanceof DataView ? new c(e3) : s && e3 instanceof Blob ? O(e3, t2, "blob", A) : void l("Invalid input argument");
    }(e2, this.options);
  }
  setup() {
    if (this.fileParser) return;
    let { file: e2 } = this, t2 = e2.getUint16(0);
    for (let [s2, i2] of m) if (i2.canHandle(e2, t2)) return this.fileParser = new i2(this.options, this.file, this.parsers), e2[s2] = true;
    this.file.close && this.file.close(), l("Unknown file format");
  }
  async parse() {
    let { output: e2, errors: t2 } = this;
    return this.setup(), this.options.silentErrors ? (await this.executeParsers().catch(this.pushToErrors), t2.push(...this.fileParser.errors)) : await this.executeParsers(), this.file.close && this.file.close(), this.options.silentErrors && t2.length > 0 && (e2.errors = t2), f(s2 = e2) ? void 0 : s2;
    var s2;
  }
  async executeParsers() {
    let { output: e2 } = this;
    await this.fileParser.parse();
    let t2 = Object.values(this.parsers).map(async (t3) => {
      let s2 = await t3.parse();
      t3.assignToOutput(e2, s2);
    });
    this.options.silentErrors && (t2 = t2.map((e3) => e3.catch(this.pushToErrors))), await Promise.all(t2);
  }
  async extractThumbnail() {
    this.setup();
    let { options: e2, file: t2 } = this, s2 = y.get("tiff", e2);
    var i2;
    if (t2.tiff ? i2 = { start: 0, type: "tiff" } : t2.jpeg && (i2 = await this.fileParser.getOrFindSegment("tiff")), void 0 === i2) return;
    let n2 = await this.fileParser.ensureSegmentChunk(i2), r2 = this.parsers.tiff = new s2(n2, e2, t2), a2 = await r2.extractThumbnail();
    return t2.close && t2.close(), a2;
  }
}
class J {
  static findPosition(e2, t2) {
    let s2 = e2.getUint16(t2 + 2) + 2, i2 = "function" == typeof this.headerLength ? this.headerLength(e2, t2, s2) : this.headerLength, n2 = t2 + i2, r2 = s2 - i2;
    return { offset: t2, length: s2, headerLength: i2, start: n2, size: r2, end: n2 + r2 };
  }
  static parse(e2, t2 = {}) {
    return new this(e2, new R({ [this.type]: t2 }), e2).parse();
  }
  normalizeInput(e2) {
    return e2 instanceof c ? e2 : new c(e2);
  }
  constructor(t2, s2 = {}, i2) {
    e(this, "errors", []), e(this, "raw", /* @__PURE__ */ new Map()), e(this, "handleError", (e2) => {
      if (!this.options.silentErrors) throw e2;
      this.errors.push(e2.message);
    }), this.chunk = this.normalizeInput(t2), this.file = i2, this.type = this.constructor.type, this.globalOptions = this.options = s2, this.localOptions = s2[this.type], this.canTranslate = this.localOptions && this.localOptions.translate;
  }
  translate() {
    this.canTranslate && (this.translated = this.translateBlock(this.raw, this.type));
  }
  get output() {
    return this.translated ? this.translated : this.raw ? Object.fromEntries(this.raw) : void 0;
  }
  translateBlock(e2, t2) {
    let s2 = I.get(t2), i2 = V.get(t2), n2 = B.get(t2), r2 = this.options[t2], a2 = r2.reviveValues && !!s2, h2 = r2.translateValues && !!i2, f2 = r2.translateKeys && !!n2, l2 = {};
    for (let [t3, r3] of e2) a2 && s2.has(t3) ? r3 = s2.get(t3)(r3) : h2 && i2.has(t3) && (r3 = this.translateValue(r3, i2.get(t3))), f2 && n2.has(t3) && (t3 = n2.get(t3) || t3), l2[t3] = r3;
    return l2;
  }
  translateValue(e2, t2) {
    return t2[e2] || t2.DEFAULT || e2;
  }
  assignToOutput(e2, t2) {
    this.assignObjectToOutput(e2, this.constructor.type, t2);
  }
  assignObjectToOutput(e2, t2, s2) {
    if (this.globalOptions.mergeOutput) return Object.assign(e2, s2);
    e2[t2] ? Object.assign(e2[t2], s2) : e2[t2] = s2;
  }
}
e(J, "headerLength", 4), e(J, "type", void 0), e(J, "multiSegment", false), e(J, "canHandle", () => false);
function q(e2) {
  return 192 === e2 || 194 === e2 || 196 === e2 || 219 === e2 || 221 === e2 || 218 === e2 || 254 === e2;
}
function Q(e2) {
  return e2 >= 224 && e2 <= 239;
}
function Z(e2, t2, s2) {
  for (let [i2, n2] of y) if (n2.canHandle(e2, t2, s2)) return i2;
}
class ee extends class {
  constructor(t2, s2, i2) {
    e(this, "errors", []), e(this, "ensureSegmentChunk", async (e2) => {
      let t3 = e2.start, s3 = e2.size || 65536;
      if (this.file.chunked) if (this.file.available(t3, s3)) e2.chunk = this.file.subarray(t3, s3);
      else try {
        e2.chunk = await this.file.readChunk(t3, s3);
      } catch (t4) {
        l(`Couldn't read segment: ${JSON.stringify(e2)}. ${t4.message}`);
      }
      else this.file.byteLength > t3 + s3 ? e2.chunk = this.file.subarray(t3, s3) : void 0 === e2.size ? e2.chunk = this.file.subarray(t3) : l("Segment unreachable: " + JSON.stringify(e2));
      return e2.chunk;
    }), this.extendOptions && this.extendOptions(t2), this.options = t2, this.file = s2, this.parsers = i2;
  }
  injectSegment(e2, t2) {
    this.options[e2].enabled && this.createParser(e2, t2);
  }
  createParser(e2, t2) {
    let s2 = new (y.get(e2))(t2, this.options, this.file);
    return this.parsers[e2] = s2;
  }
  createParsers(e2) {
    for (let t2 of e2) {
      let { type: e3, chunk: s2 } = t2, i2 = this.options[e3];
      if (i2 && i2.enabled) {
        let t3 = this.parsers[e3];
        t3 && t3.append || t3 || this.createParser(e3, s2);
      }
    }
  }
  async readSegments(e2) {
    let t2 = e2.map(this.ensureSegmentChunk);
    await Promise.all(t2);
  }
} {
  constructor(...t2) {
    super(...t2), e(this, "appSegments", []), e(this, "jpegSegments", []), e(this, "unknownSegments", []);
  }
  static canHandle(e2, t2) {
    return 65496 === t2;
  }
  async parse() {
    await this.findAppSegments(), await this.readSegments(this.appSegments), this.mergeMultiSegments(), this.createParsers(this.mergedAppSegments || this.appSegments);
  }
  setupSegmentFinderArgs(e2) {
    true === e2 ? (this.findAll = true, this.wanted = new Set(y.keyList())) : (e2 = void 0 === e2 ? y.keyList().filter((e3) => this.options[e3].enabled) : e2.filter((e3) => this.options[e3].enabled && y.has(e3)), this.findAll = false, this.remaining = new Set(e2), this.wanted = new Set(e2)), this.unfinishedMultiSegment = false;
  }
  async findAppSegments(e2 = 0, t2) {
    this.setupSegmentFinderArgs(t2);
    let { file: s2, findAll: i2, wanted: n2, remaining: r2 } = this;
    if (!i2 && this.file.chunked && (i2 = Array.from(n2).some((e3) => {
      let t3 = y.get(e3), s3 = this.options[e3];
      return t3.multiSegment && s3.multiSegment;
    }), i2 && await this.file.readWhole()), e2 = this.findAppSegmentsInRange(e2, s2.byteLength), !this.options.onlyTiff && s2.chunked) {
      let t3 = false;
      for (; r2.size > 0 && !t3 && (s2.canReadNextChunk || this.unfinishedMultiSegment); ) {
        let { nextChunkOffset: i3 } = s2, n3 = this.appSegments.some((e3) => !this.file.available(e3.offset || e3.start, e3.length || e3.size));
        if (t3 = e2 > i3 && !n3 ? !await s2.readNextChunk(e2) : !await s2.readNextChunk(i3), void 0 === (e2 = this.findAppSegmentsInRange(e2, s2.byteLength))) return;
      }
    }
  }
  findAppSegmentsInRange(e2, t2) {
    t2 -= 2;
    let s2, i2, n2, r2, a2, h2, { file: f2, findAll: l2, wanted: o2, remaining: u2, options: d2 } = this;
    for (; e2 < t2; e2++) if (255 === f2.getUint8(e2)) {
      if (s2 = f2.getUint8(e2 + 1), Q(s2)) {
        if (i2 = f2.getUint16(e2 + 2), n2 = Z(f2, e2, i2), n2 && o2.has(n2) && (r2 = y.get(n2), a2 = r2.findPosition(f2, e2), h2 = d2[n2], a2.type = n2, this.appSegments.push(a2), !l2 && (r2.multiSegment && h2.multiSegment ? (this.unfinishedMultiSegment = a2.chunkNumber < a2.chunkCount, this.unfinishedMultiSegment || u2.delete(n2)) : u2.delete(n2), 0 === u2.size))) break;
        d2.recordUnknownSegments && (a2 = J.findPosition(f2, e2), a2.marker = s2, this.unknownSegments.push(a2)), e2 += i2 + 1;
      } else if (q(s2)) {
        if (i2 = f2.getUint16(e2 + 2), 218 === s2 && false !== d2.stopAfterSos) return;
        d2.recordJpegSegments && this.jpegSegments.push({ offset: e2, length: i2, marker: s2 }), e2 += i2 + 1;
      }
    }
    return e2;
  }
  mergeMultiSegments() {
    if (!this.appSegments.some((e3) => e3.multiSegment)) return;
    let e2 = function(e3, t2) {
      let s2, i2, n2, r2 = /* @__PURE__ */ new Map();
      for (let a2 = 0; a2 < e3.length; a2++) s2 = e3[a2], i2 = s2[t2], r2.has(i2) ? n2 = r2.get(i2) : r2.set(i2, n2 = []), n2.push(s2);
      return Array.from(r2);
    }(this.appSegments, "type");
    this.mergedAppSegments = e2.map(([e3, t2]) => {
      let s2 = y.get(e3, this.options);
      if (s2.handleMultiSegments) {
        return { type: e3, chunk: s2.handleMultiSegments(t2) };
      }
      return t2[0];
    });
  }
  getSegment(e2) {
    return this.appSegments.find((t2) => t2.type === e2);
  }
  async getOrFindSegment(e2) {
    let t2 = this.getSegment(e2);
    return void 0 === t2 && (await this.findAppSegments(0, [e2]), t2 = this.getSegment(e2)), t2;
  }
}
e(ee, "type", "jpeg"), m.set("jpeg", ee);
const te = [void 0, 1, 1, 2, 4, 8, 1, 1, 2, 4, 8, 4, 8, 4];
class se extends J {
  parseHeader() {
    var e2 = this.chunk.getUint16();
    18761 === e2 ? this.le = true : 19789 === e2 && (this.le = false), this.chunk.le = this.le, this.headerParsed = true;
  }
  parseTags(e2, t2, s2 = /* @__PURE__ */ new Map()) {
    let { pick: i2, skip: n2 } = this.options[t2];
    i2 = new Set(i2);
    let r2 = i2.size > 0, a2 = 0 === n2.size, h2 = this.chunk.getUint16(e2);
    e2 += 2;
    for (let f2 = 0; f2 < h2; f2++) {
      let h3 = this.chunk.getUint16(e2);
      if (r2) {
        if (i2.has(h3) && (s2.set(h3, this.parseTag(e2, h3, t2)), i2.delete(h3), 0 === i2.size)) break;
      } else !a2 && n2.has(h3) || s2.set(h3, this.parseTag(e2, h3, t2));
      e2 += 12;
    }
    return s2;
  }
  parseTag(e2, t2, s2) {
    let { chunk: i2 } = this, n2 = i2.getUint16(e2 + 2), r2 = i2.getUint32(e2 + 4), a2 = te[n2];
    if (a2 * r2 <= 4 ? e2 += 8 : e2 = i2.getUint32(e2 + 8), (n2 < 1 || n2 > 13) && l(`Invalid TIFF value type. block: ${s2.toUpperCase()}, tag: ${t2.toString(16)}, type: ${n2}, offset ${e2}`), e2 > i2.byteLength && l(`Invalid TIFF value offset. block: ${s2.toUpperCase()}, tag: ${t2.toString(16)}, type: ${n2}, offset ${e2} is outside of chunk size ${i2.byteLength}`), 1 === n2) return i2.getUint8Array(e2, r2);
    if (2 === n2) return "" === (h2 = function(e3) {
      for (; e3.endsWith("\0"); ) e3 = e3.slice(0, -1);
      return e3;
    }(h2 = i2.getString(e2, r2)).trim()) ? void 0 : h2;
    var h2;
    if (7 === n2) return i2.getUint8Array(e2, r2);
    if (1 === r2) return this.parseTagValue(n2, e2);
    {
      let t3 = new (function(e3) {
        switch (e3) {
          case 1:
            return Uint8Array;
          case 3:
            return Uint16Array;
          case 4:
            return Uint32Array;
          case 5:
            return Array;
          case 6:
            return Int8Array;
          case 8:
            return Int16Array;
          case 9:
            return Int32Array;
          case 10:
            return Array;
          case 11:
            return Float32Array;
          case 12:
            return Float64Array;
          default:
            return Array;
        }
      }(n2))(r2), s3 = a2;
      for (let i3 = 0; i3 < r2; i3++) t3[i3] = this.parseTagValue(n2, e2), e2 += s3;
      return t3;
    }
  }
  parseTagValue(e2, t2) {
    let { chunk: s2 } = this;
    switch (e2) {
      case 1:
        return s2.getUint8(t2);
      case 3:
        return s2.getUint16(t2);
      case 4:
        return s2.getUint32(t2);
      case 5:
        return s2.getUint32(t2) / s2.getUint32(t2 + 4);
      case 6:
        return s2.getInt8(t2);
      case 8:
        return s2.getInt16(t2);
      case 9:
        return s2.getInt32(t2);
      case 10:
        return s2.getInt32(t2) / s2.getInt32(t2 + 4);
      case 11:
        return s2.getFloat(t2);
      case 12:
        return s2.getDouble(t2);
      case 13:
        return s2.getUint32(t2);
      default:
        l(`Invalid tiff type ${e2}`);
    }
  }
}
class ie extends se {
  static canHandle(e2, t2) {
    return 225 === e2.getUint8(t2 + 1) && 1165519206 === e2.getUint32(t2 + 4) && 0 === e2.getUint16(t2 + 8);
  }
  async parse() {
    this.parseHeader();
    let { options: e2 } = this;
    return e2.ifd0.enabled && await this.parseIfd0Block(), e2.exif.enabled && await this.safeParse("parseExifBlock"), e2.gps.enabled && await this.safeParse("parseGpsBlock"), e2.interop.enabled && await this.safeParse("parseInteropBlock"), e2.ifd1.enabled && await this.safeParse("parseThumbnailBlock"), this.createOutput();
  }
  safeParse(e2) {
    let t2 = this[e2]();
    return void 0 !== t2.catch && (t2 = t2.catch(this.handleError)), t2;
  }
  findIfd0Offset() {
    void 0 === this.ifd0Offset && (this.ifd0Offset = this.chunk.getUint32(4));
  }
  findIfd1Offset() {
    if (void 0 === this.ifd1Offset) {
      this.findIfd0Offset();
      let e2 = this.chunk.getUint16(this.ifd0Offset), t2 = this.ifd0Offset + 2 + 12 * e2;
      this.ifd1Offset = this.chunk.getUint32(t2);
    }
  }
  parseBlock(e2, t2) {
    let s2 = /* @__PURE__ */ new Map();
    return this[t2] = s2, this.parseTags(e2, t2, s2), s2;
  }
  async parseIfd0Block() {
    if (this.ifd0) return;
    let { file: e2 } = this;
    this.findIfd0Offset(), this.ifd0Offset < 8 && l("Malformed EXIF data"), !e2.chunked && this.ifd0Offset > e2.byteLength && l(`IFD0 offset points to outside of file.
this.ifd0Offset: ${this.ifd0Offset}, file.byteLength: ${e2.byteLength}`), e2.tiff && await e2.ensureChunk(this.ifd0Offset, o(this.options));
    let t2 = this.parseBlock(this.ifd0Offset, "ifd0");
    return 0 !== t2.size ? (this.exifOffset = t2.get(34665), this.interopOffset = t2.get(40965), this.gpsOffset = t2.get(34853), this.xmp = t2.get(700), this.iptc = t2.get(33723), this.icc = t2.get(34675), this.options.sanitize && (t2.delete(34665), t2.delete(40965), t2.delete(34853), t2.delete(700), t2.delete(33723), t2.delete(34675)), t2) : void 0;
  }
  async parseExifBlock() {
    if (this.exif) return;
    if (this.ifd0 || await this.parseIfd0Block(), void 0 === this.exifOffset) return;
    this.file.tiff && await this.file.ensureChunk(this.exifOffset, o(this.options));
    let e2 = this.parseBlock(this.exifOffset, "exif");
    return this.interopOffset || (this.interopOffset = e2.get(40965)), this.makerNote = e2.get(37500), this.userComment = e2.get(37510), this.options.sanitize && (e2.delete(40965), e2.delete(37500), e2.delete(37510)), this.unpack(e2, 41728), this.unpack(e2, 41729), e2;
  }
  unpack(e2, t2) {
    let s2 = e2.get(t2);
    s2 && 1 === s2.length && e2.set(t2, s2[0]);
  }
  async parseGpsBlock() {
    if (this.gps) return;
    if (this.ifd0 || await this.parseIfd0Block(), void 0 === this.gpsOffset) return;
    let e2 = this.parseBlock(this.gpsOffset, "gps");
    return e2 && e2.has(2) && e2.has(4) && (e2.set("latitude", ne(...e2.get(2), e2.get(1))), e2.set("longitude", ne(...e2.get(4), e2.get(3)))), e2;
  }
  async parseInteropBlock() {
    if (!this.interop && (this.ifd0 || await this.parseIfd0Block(), void 0 !== this.interopOffset || this.exif || await this.parseExifBlock(), void 0 !== this.interopOffset)) return this.parseBlock(this.interopOffset, "interop");
  }
  async parseThumbnailBlock(e2 = false) {
    if (!this.ifd1 && !this.ifd1Parsed && (!this.options.mergeOutput || e2)) return this.findIfd1Offset(), this.ifd1Offset > 0 && (this.parseBlock(this.ifd1Offset, "ifd1"), this.ifd1Parsed = true), this.ifd1;
  }
  async extractThumbnail() {
    if (this.headerParsed || this.parseHeader(), this.ifd1Parsed || await this.parseThumbnailBlock(true), void 0 === this.ifd1) return;
    let e2 = this.ifd1.get(513), t2 = this.ifd1.get(514);
    return this.chunk.getUint8Array(e2, t2);
  }
  get image() {
    return this.ifd0;
  }
  get thumbnail() {
    return this.ifd1;
  }
  createOutput() {
    let e2, t2, s2, i2 = {};
    for (t2 of P) if (e2 = this[t2], !f(e2)) if (s2 = this.canTranslate ? this.translateBlock(e2, t2) : Object.fromEntries(e2), this.options.mergeOutput) {
      if ("ifd1" === t2) continue;
      Object.assign(i2, s2);
    } else i2[t2] = s2;
    return this.makerNote && (i2.makerNote = this.makerNote), this.userComment && (i2.userComment = this.userComment), i2;
  }
  assignToOutput(e2, t2) {
    if (this.globalOptions.mergeOutput) Object.assign(e2, t2);
    else for (let [s2, i2] of Object.entries(t2)) this.assignObjectToOutput(e2, s2, i2);
  }
}
function ne(e2, t2, s2, i2) {
  var n2 = e2 + t2 / 60 + s2 / 3600;
  return "S" !== i2 && "W" !== i2 || (n2 *= -1), n2;
}
e(ie, "type", "tiff"), e(ie, "headerLength", 10), y.set("tiff", ie);
const ae = { ifd0: false, ifd1: false, exif: false, gps: false, interop: false, sanitize: false, reviveValues: true, translateKeys: false, translateValues: false, mergeOutput: false };
Object.assign({}, ae, { firstChunkSize: 4e4, gps: [1, 2, 3, 4] });
Object.assign({}, ae, { tiff: false, ifd1: true, mergeOutput: false });
const de = Object.assign({}, ae, { firstChunkSize: 4e4, ifd0: [274] });
async function ce(e2) {
  let t2 = new H(de);
  await t2.read(e2);
  let s2 = await t2.parse();
  if (s2 && s2.ifd0) return s2.ifd0[274];
}
const pe = Object.freeze({ 1: { dimensionSwapped: false, scaleX: 1, scaleY: 1, deg: 0, rad: 0 }, 2: { dimensionSwapped: false, scaleX: -1, scaleY: 1, deg: 0, rad: 0 }, 3: { dimensionSwapped: false, scaleX: 1, scaleY: 1, deg: 180, rad: 180 * Math.PI / 180 }, 4: { dimensionSwapped: false, scaleX: -1, scaleY: 1, deg: 180, rad: 180 * Math.PI / 180 }, 5: { dimensionSwapped: true, scaleX: 1, scaleY: -1, deg: 90, rad: 90 * Math.PI / 180 }, 6: { dimensionSwapped: true, scaleX: 1, scaleY: 1, deg: 90, rad: 90 * Math.PI / 180 }, 7: { dimensionSwapped: true, scaleX: 1, scaleY: -1, deg: 270, rad: 270 * Math.PI / 180 }, 8: { dimensionSwapped: true, scaleX: 1, scaleY: 1, deg: 270, rad: 270 * Math.PI / 180 } });
let ge = true, me = true;
if ("object" == typeof navigator) {
  let e2 = navigator.userAgent;
  if (e2.includes("iPad") || e2.includes("iPhone")) {
    let t2 = e2.match(/OS (\d+)_(\d+)/);
    if (t2) {
      let [, e3, s2] = t2, i2 = Number(e3) + 0.1 * Number(s2);
      ge = i2 < 13.4, me = false;
    }
  } else if (e2.includes("OS X 10")) {
    let [, t2] = e2.match(/OS X 10[_.](\d+)/);
    ge = me = Number(t2) < 15;
  }
  if (e2.includes("Chrome/")) {
    let [, t2] = e2.match(/Chrome\/(\d+)/);
    ge = me = Number(t2) < 81;
  } else if (e2.includes("Firefox/")) {
    let [, t2] = e2.match(/Firefox\/(\d+)/);
    ge = me = Number(t2) < 77;
  }
}
async function ye(e2) {
  let t2 = await ce(e2);
  return Object.assign({ canvas: ge, css: me }, pe[t2]);
}
class be extends c {
  constructor(...t2) {
    super(...t2), e(this, "ranges", new we()), 0 !== this.byteLength && this.ranges.add(0, this.byteLength);
  }
  _tryExtend(e2, t2, s2) {
    if (0 === e2 && 0 === this.byteLength && s2) {
      let e3 = new DataView(s2.buffer || s2, s2.byteOffset, s2.byteLength);
      this._swapDataView(e3);
    } else {
      let s3 = e2 + t2;
      if (s3 > this.byteLength) {
        let { dataView: e3 } = this._extend(s3);
        this._swapDataView(e3);
      }
    }
  }
  _extend(e2) {
    let t2;
    t2 = a ? r.allocUnsafe(e2) : new Uint8Array(e2);
    let s2 = new DataView(t2.buffer, t2.byteOffset, t2.byteLength);
    return t2.set(new Uint8Array(this.buffer, this.byteOffset, this.byteLength), 0), { uintView: t2, dataView: s2 };
  }
  subarray(e2, t2, s2 = false) {
    return t2 = t2 || this._lengthToEnd(e2), s2 && this._tryExtend(e2, t2), this.ranges.add(e2, t2), super.subarray(e2, t2);
  }
  set(e2, t2, s2 = false) {
    s2 && this._tryExtend(t2, e2.byteLength, e2);
    let i2 = super.set(e2, t2);
    return this.ranges.add(t2, i2.byteLength), i2;
  }
  async ensureChunk(e2, t2) {
    this.chunked && (this.ranges.available(e2, t2) || await this.readChunk(e2, t2));
  }
  available(e2, t2) {
    return this.ranges.available(e2, t2);
  }
}
class we {
  constructor() {
    e(this, "list", []);
  }
  get length() {
    return this.list.length;
  }
  add(e2, t2, s2 = 0) {
    let i2 = e2 + t2, n2 = this.list.filter((t3) => ke(e2, t3.offset, i2) || ke(e2, t3.end, i2));
    if (n2.length > 0) {
      e2 = Math.min(e2, ...n2.map((e3) => e3.offset)), i2 = Math.max(i2, ...n2.map((e3) => e3.end)), t2 = i2 - e2;
      let s3 = n2.shift();
      s3.offset = e2, s3.length = t2, s3.end = i2, this.list = this.list.filter((e3) => !n2.includes(e3));
    } else this.list.push({ offset: e2, length: t2, end: i2 });
  }
  available(e2, t2) {
    let s2 = e2 + t2;
    return this.list.some((t3) => t3.offset <= e2 && s2 <= t3.end);
  }
}
function ke(e2, t2, s2) {
  return e2 <= t2 && t2 <= s2;
}
class Oe extends be {
  constructor(t2, s2) {
    super(0), e(this, "chunksRead", 0), this.input = t2, this.options = s2;
  }
  async readWhole() {
    this.chunked = false, await this.readChunk(this.nextChunkOffset);
  }
  async readChunked() {
    this.chunked = true, await this.readChunk(0, this.options.firstChunkSize);
  }
  async readNextChunk(e2 = this.nextChunkOffset) {
    if (this.fullyRead) return this.chunksRead++, false;
    let t2 = this.options.chunkSize, s2 = await this.readChunk(e2, t2);
    return !!s2 && s2.byteLength === t2;
  }
  async readChunk(e2, t2) {
    if (this.chunksRead++, 0 !== (t2 = this.safeWrapAddress(e2, t2))) return this._readChunk(e2, t2);
  }
  safeWrapAddress(e2, t2) {
    return void 0 !== this.size && e2 + t2 > this.size ? Math.max(0, this.size - e2) : t2;
  }
  get nextChunkOffset() {
    if (0 !== this.ranges.list.length) return this.ranges.list[0].length;
  }
  get canReadNextChunk() {
    return this.chunksRead < this.options.chunkLimit;
  }
  get fullyRead() {
    return void 0 !== this.size && this.nextChunkOffset === this.size;
  }
  read() {
    return this.options.chunked ? this.readChunked() : this.readWhole();
  }
  close() {
  }
}
b.set("blob", class extends Oe {
  async readWhole() {
    this.chunked = false;
    let e2 = await A(this.input);
    this._swapArrayBuffer(e2);
  }
  readChunked() {
    return this.chunked = true, this.size = this.input.size, super.readChunked();
  }
  async _readChunk(e2, t2) {
    let s2 = t2 ? e2 + t2 : void 0, i2 = this.input.slice(e2, s2), n2 = await A(i2);
    return this.set(n2, e2, true);
  }
});
const version$4 = "4.2.2";
const packageJson$4 = {
  version: version$4
};
const locale$2 = {
  strings: {
    generatingThumbnails: "Generating thumbnails..."
  }
};
function canvasToBlob(canvas, type, quality) {
  try {
    canvas.getContext("2d").getImageData(0, 0, 1, 1);
  } catch (err) {
    if (err.code === 18) {
      return Promise.reject(new Error("cannot read image, probably an svg with external resources"));
    }
  }
  if (canvas.toBlob) {
    return new Promise((resolve) => {
      canvas.toBlob(resolve, type, quality);
    }).then((blob) => {
      if (blob === null) {
        throw new Error("cannot read image, probably an svg with external resources");
      }
      return blob;
    });
  }
  return Promise.resolve().then(() => {
    return dataURItoBlob(canvas.toDataURL(type, quality), {});
  }).then((blob) => {
    if (blob === null) {
      throw new Error("could not extract blob, probably an old browser");
    }
    return blob;
  });
}
function rotateImage(image, translate) {
  let w2 = image.width;
  let h2 = image.height;
  if (translate.deg === 90 || translate.deg === 270) {
    w2 = image.height;
    h2 = image.width;
  }
  const canvas = document.createElement("canvas");
  canvas.width = w2;
  canvas.height = h2;
  const context = canvas.getContext("2d");
  context.translate(w2 / 2, h2 / 2);
  if (translate.canvas) {
    context.rotate(translate.rad);
    context.scale(translate.scaleX, translate.scaleY);
  }
  context.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);
  return canvas;
}
function protect(image) {
  const ratio = image.width / image.height;
  const maxSquare = 5e6;
  const maxSize = 4096;
  let maxW = Math.floor(Math.sqrt(maxSquare * ratio));
  let maxH = Math.floor(maxSquare / Math.sqrt(maxSquare * ratio));
  if (maxW > maxSize) {
    maxW = maxSize;
    maxH = Math.round(maxW / ratio);
  }
  if (maxH > maxSize) {
    maxH = maxSize;
    maxW = Math.round(ratio * maxH);
  }
  if (image.width > maxW) {
    const canvas = document.createElement("canvas");
    canvas.width = maxW;
    canvas.height = maxH;
    canvas.getContext("2d").drawImage(image, 0, 0, maxW, maxH);
    return canvas;
  }
  return image;
}
const defaultOptions$4 = {
  thumbnailWidth: null,
  thumbnailHeight: null,
  thumbnailType: "image/jpeg",
  waitForThumbnailsBeforeUpload: false,
  lazy: false
};
class ThumbnailGenerator extends UIPlugin {
  static VERSION = packageJson$4.version;
  queue;
  queueProcessing;
  defaultThumbnailDimension;
  thumbnailType;
  constructor(uppy, opts) {
    super(uppy, { ...defaultOptions$4, ...opts });
    this.type = "modifier";
    this.id = this.opts.id || "ThumbnailGenerator";
    this.title = "Thumbnail Generator";
    this.queue = [];
    this.queueProcessing = false;
    this.defaultThumbnailDimension = 200;
    this.thumbnailType = this.opts.thumbnailType;
    this.defaultLocale = locale$2;
    this.i18nInit();
    if (this.opts.lazy && this.opts.waitForThumbnailsBeforeUpload) {
      throw new Error("ThumbnailGenerator: The `lazy` and `waitForThumbnailsBeforeUpload` options are mutually exclusive. Please ensure at most one of them is set to `true`.");
    }
  }
  createThumbnail(file, targetWidth, targetHeight) {
    const originalUrl = URL.createObjectURL(file.data);
    const onload = new Promise((resolve, reject) => {
      const image = new Image();
      image.src = originalUrl;
      image.addEventListener("load", () => {
        URL.revokeObjectURL(originalUrl);
        resolve(image);
      });
      image.addEventListener("error", (event) => {
        URL.revokeObjectURL(originalUrl);
        reject(event.error || new Error("Could not create thumbnail"));
      });
    });
    const orientationPromise = ye(file.data).catch(() => 1);
    return Promise.all([onload, orientationPromise]).then(([image, orientation]) => {
      const dimensions = this.getProportionalDimensions(image, targetWidth, targetHeight, orientation.deg);
      const rotatedImage = rotateImage(image, orientation);
      const resizedImage = this.resizeImage(rotatedImage, dimensions.width, dimensions.height);
      return canvasToBlob(resizedImage, this.thumbnailType, 80);
    }).then((blob) => {
      return URL.createObjectURL(blob);
    });
  }
  /**
   * Get the new calculated dimensions for the given image and a target width
   * or height. If both width and height are given, only width is taken into
   * account. If neither width nor height are given, the default dimension
   * is used.
   */
  getProportionalDimensions(img, width, height, deg) {
    let aspect = img.width / img.height;
    if (deg === 90 || deg === 270) {
      aspect = img.height / img.width;
    }
    if (width != null) {
      return {
        width,
        height: Math.round(width / aspect)
      };
    }
    if (height != null) {
      return {
        width: Math.round(height * aspect),
        height
      };
    }
    return {
      width: this.defaultThumbnailDimension,
      height: Math.round(this.defaultThumbnailDimension / aspect)
    };
  }
  /**
   * Resize an image to the target `width` and `height`.
   *
   * Returns a Canvas with the resized image on it.
   */
  resizeImage(image, targetWidth, targetHeight) {
    let img = protect(image);
    let steps = Math.ceil(Math.log2(img.width / targetWidth));
    if (steps < 1) {
      steps = 1;
    }
    let sW = targetWidth * 2 ** (steps - 1);
    let sH = targetHeight * 2 ** (steps - 1);
    const x2 = 2;
    while (steps--) {
      const canvas = document.createElement("canvas");
      canvas.width = sW;
      canvas.height = sH;
      canvas.getContext("2d").drawImage(img, 0, 0, sW, sH);
      img = canvas;
      sW = Math.round(sW / x2);
      sH = Math.round(sH / x2);
    }
    return img;
  }
  /**
   * Set the preview URL for a file.
   */
  setPreviewURL(fileID, preview) {
    this.uppy.setFileState(fileID, { preview });
  }
  addToQueue(fileID) {
    this.queue.push(fileID);
    if (this.queueProcessing === false) {
      this.processQueue();
    }
  }
  processQueue() {
    this.queueProcessing = true;
    if (this.queue.length > 0) {
      const current = this.uppy.getFile(this.queue.shift());
      if (!current) {
        this.uppy.log("[ThumbnailGenerator] file was removed before a thumbnail could be generated, but not removed from the queue. This is probably a bug", "error");
        return Promise.resolve();
      }
      return this.requestThumbnail(current).catch(() => {
      }).then(() => this.processQueue());
    }
    this.queueProcessing = false;
    this.uppy.log("[ThumbnailGenerator] Emptied thumbnail queue");
    this.uppy.emit("thumbnail:all-generated");
    return Promise.resolve();
  }
  requestThumbnail(file) {
    if (isPreviewSupported(file.type) && !file.isRemote) {
      return this.createThumbnail(file, this.opts.thumbnailWidth, this.opts.thumbnailHeight).then((preview) => {
        this.setPreviewURL(file.id, preview);
        this.uppy.log(`[ThumbnailGenerator] Generated thumbnail for ${file.id}`);
        this.uppy.emit("thumbnail:generated", this.uppy.getFile(file.id), preview);
      }).catch((err) => {
        this.uppy.log(`[ThumbnailGenerator] Failed thumbnail for ${file.id}:`, "warning");
        this.uppy.log(err, "warning");
        this.uppy.emit("thumbnail:error", this.uppy.getFile(file.id), err);
      });
    }
    return Promise.resolve();
  }
  onFileAdded = (file) => {
    if (!file.preview && file.data && isPreviewSupported(file.type) && !file.isRemote) {
      this.addToQueue(file.id);
    }
  };
  /**
   * Cancel a lazy request for a thumbnail if the thumbnail has not yet been generated.
   */
  onCancelRequest = (file) => {
    const index = this.queue.indexOf(file.id);
    if (index !== -1) {
      this.queue.splice(index, 1);
    }
  };
  /**
   * Clean up the thumbnail for a file. Cancel lazy requests and free the thumbnail URL.
   */
  onFileRemoved = (file) => {
    const index = this.queue.indexOf(file.id);
    if (index !== -1) {
      this.queue.splice(index, 1);
    }
    if (file.preview && isObjectURL(file.preview)) {
      URL.revokeObjectURL(file.preview);
    }
  };
  onRestored = () => {
    const restoredFiles = this.uppy.getFiles().filter((file) => file.isRestored);
    restoredFiles.forEach((file) => {
      if (!file.preview || isObjectURL(file.preview)) {
        this.addToQueue(file.id);
      }
    });
  };
  onAllFilesRemoved = () => {
    this.queue = [];
  };
  waitUntilAllProcessed = (fileIDs) => {
    fileIDs.forEach((fileID) => {
      const file = this.uppy.getFile(fileID);
      this.uppy.emit("preprocess-progress", file, {
        mode: "indeterminate",
        message: this.i18n("generatingThumbnails")
      });
    });
    const emitPreprocessCompleteForAll = () => {
      fileIDs.forEach((fileID) => {
        const file = this.uppy.getFile(fileID);
        this.uppy.emit("preprocess-complete", file);
      });
    };
    return new Promise((resolve) => {
      if (this.queueProcessing) {
        this.uppy.once("thumbnail:all-generated", () => {
          emitPreprocessCompleteForAll();
          resolve();
        });
      } else {
        emitPreprocessCompleteForAll();
        resolve();
      }
    });
  };
  install() {
    this.uppy.on("file-removed", this.onFileRemoved);
    this.uppy.on("cancel-all", this.onAllFilesRemoved);
    if (this.opts.lazy) {
      this.uppy.on("thumbnail:request", this.onFileAdded);
      this.uppy.on("thumbnail:cancel", this.onCancelRequest);
    } else {
      this.uppy.on("thumbnail:request", this.onFileAdded);
      this.uppy.on("file-added", this.onFileAdded);
      this.uppy.on("restored", this.onRestored);
    }
    if (this.opts.waitForThumbnailsBeforeUpload) {
      this.uppy.addPreProcessor(this.waitUntilAllProcessed);
    }
  }
  uninstall() {
    this.uppy.off("file-removed", this.onFileRemoved);
    this.uppy.off("cancel-all", this.onAllFilesRemoved);
    if (this.opts.lazy) {
      this.uppy.off("thumbnail:request", this.onFileAdded);
      this.uppy.off("thumbnail:cancel", this.onCancelRequest);
    } else {
      this.uppy.off("thumbnail:request", this.onFileAdded);
      this.uppy.off("file-added", this.onFileAdded);
      this.uppy.off("restored", this.onRestored);
    }
    if (this.opts.waitForThumbnailsBeforeUpload) {
      this.uppy.removePreProcessor(this.waitUntilAllProcessed);
    }
  }
}
function findAllDOMElements(element) {
  if (typeof element === "string") {
    const elements = document.querySelectorAll(element);
    return elements.length === 0 ? null : Array.from(elements);
  }
  if (typeof element === "object" && isDOMElement(element)) {
    return [element];
  }
  return null;
}
const toArray = Array.from;
function fallbackApi(dataTransfer) {
  const files = toArray(dataTransfer.files);
  return Promise.resolve(files);
}
function getFilesAndDirectoriesFromDirectory(directoryReader, oldEntries, logDropError, { onSuccess }) {
  directoryReader.readEntries(
    (entries) => {
      const newEntries = [...oldEntries, ...entries];
      if (entries.length) {
        queueMicrotask(() => {
          getFilesAndDirectoriesFromDirectory(directoryReader, newEntries, logDropError, { onSuccess });
        });
      } else {
        onSuccess(newEntries);
      }
    },
    // Make sure we resolve on error anyway, it's fine if only one directory couldn't be parsed!
    (error) => {
      logDropError(error);
      onSuccess(oldEntries);
    }
  );
}
function getAsFileSystemHandleFromEntry(entry, logDropError) {
  if (entry == null)
    return entry;
  return {
    kind: entry.isFile ? "file" : entry.isDirectory ? "directory" : void 0,
    name: entry.name,
    getFile() {
      return new Promise((resolve, reject) => entry.file(resolve, reject));
    },
    async *values() {
      const directoryReader = entry.createReader();
      const entries = await new Promise((resolve) => {
        getFilesAndDirectoriesFromDirectory(directoryReader, [], logDropError, {
          onSuccess: (dirEntries) => resolve(dirEntries.map((file) => getAsFileSystemHandleFromEntry(file, logDropError)))
        });
      });
      yield* entries;
    },
    isSameEntry: void 0
  };
}
async function* createPromiseToAddFileOrParseDirectory(entry, relativePath, lastResortFile = void 0) {
  const getNextRelativePath = () => `${relativePath}/${entry.name}`;
  if (entry.kind === "file") {
    const file = await entry.getFile();
    if (file != null) {
      file.relativePath = relativePath ? getNextRelativePath() : null;
      yield file;
    } else if (lastResortFile != null)
      yield lastResortFile;
  } else if (entry.kind === "directory") {
    for await (const handle of entry.values()) {
      yield* createPromiseToAddFileOrParseDirectory(handle, relativePath ? getNextRelativePath() : entry.name);
    }
  } else if (lastResortFile != null)
    yield lastResortFile;
}
async function* getFilesFromDataTransfer(dataTransfer, logDropError) {
  const fileSystemHandles = await Promise.all(Array.from(dataTransfer.items, async (item) => {
    let fileSystemHandle;
    const getAsEntry = () => typeof item.getAsEntry === "function" ? item.getAsEntry() : item.webkitGetAsEntry();
    fileSystemHandle ??= getAsFileSystemHandleFromEntry(getAsEntry(), logDropError);
    return {
      fileSystemHandle,
      lastResortFile: item.getAsFile()
      // can be used as a fallback in case other methods fail
    };
  }));
  for (const { lastResortFile, fileSystemHandle } of fileSystemHandles) {
    if (fileSystemHandle != null) {
      try {
        yield* createPromiseToAddFileOrParseDirectory(fileSystemHandle, "", lastResortFile);
      } catch (err) {
        if (lastResortFile != null) {
          yield lastResortFile;
        } else {
          logDropError(err);
        }
      }
    } else if (lastResortFile != null)
      yield lastResortFile;
  }
}
async function getDroppedFiles(dataTransfer, options) {
  const logDropError = options?.logDropError ?? Function.prototype;
  try {
    const accumulator = [];
    for await (const file of getFilesFromDataTransfer(dataTransfer, logDropError)) {
      accumulator.push(file);
    }
    return accumulator;
  } catch {
    return fallbackApi(dataTransfer);
  }
}
const version$3 = "4.4.2";
const packageJson$3 = {
  version: version$3
};
function isDragDropSupported() {
  const div = document.body;
  if (!("draggable" in div) || !("ondragstart" in div && "ondrop" in div)) {
    return false;
  }
  if (!("FormData" in window)) {
    return false;
  }
  if (!("FileReader" in window)) {
    return false;
  }
  return true;
}
class AddFiles extends x {
  fileInput = null;
  folderInput = null;
  mobilePhotoFileInput = null;
  mobileVideoFileInput = null;
  triggerFileInputClick = () => {
    this.fileInput?.click();
  };
  triggerFolderInputClick = () => {
    this.folderInput?.click();
  };
  triggerVideoCameraInputClick = () => {
    this.mobileVideoFileInput?.click();
  };
  triggerPhotoCameraInputClick = () => {
    this.mobilePhotoFileInput?.click();
  };
  onFileInputChange = (event) => {
    this.props.handleInputChange(event);
    event.currentTarget.value = "";
  };
  renderHiddenInput = (isFolder, refCallback) => {
    return u$1("input", {
      className: "uppy-Dashboard-input",
      hidden: true,
      "aria-hidden": "true",
      tabIndex: -1,
      // @ts-expect-error default types don't yet know about the `webkitdirectory` property
      webkitdirectory: isFolder,
      type: "file",
      name: "files[]",
      multiple: this.props.maxNumberOfFiles !== 1,
      onChange: this.onFileInputChange,
      accept: this.props.allowedFileTypes?.join(", "),
      ref: refCallback
    });
  };
  renderHiddenCameraInput = (type, nativeCameraFacingMode, refCallback) => {
    const typeToAccept = { photo: "image/*", video: "video/*" };
    const accept = typeToAccept[type];
    return u$1("input", { className: "uppy-Dashboard-input", hidden: true, "aria-hidden": "true", tabIndex: -1, type: "file", name: `camera-${type}`, onChange: this.onFileInputChange, capture: nativeCameraFacingMode === "" ? "environment" : nativeCameraFacingMode, accept, ref: refCallback });
  };
  renderMyDeviceAcquirer = () => {
    return u$1("div", { className: "uppy-DashboardTab", role: "presentation", "data-uppy-acquirer-id": "MyDevice", children: u$1("button", { type: "button", className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn", role: "tab", tabIndex: 0, "data-uppy-super-focusable": true, onClick: this.triggerFileInputClick, children: [u$1("div", { className: "uppy-DashboardTab-inner", children: u$1("svg", { className: "uppy-DashboardTab-iconMyDevice", "aria-hidden": "true", focusable: "false", width: "32", height: "32", viewBox: "0 0 32 32", children: u$1("path", { d: "M8.45 22.087l-1.305-6.674h17.678l-1.572 6.674H8.45zm4.975-12.412l1.083 1.765a.823.823 0 00.715.386h7.951V13.5H8.587V9.675h4.838zM26.043 13.5h-1.195v-2.598c0-.463-.336-.75-.798-.75h-8.356l-1.082-1.766A.823.823 0 0013.897 8H7.728c-.462 0-.815.256-.815.718V13.5h-.956a.97.97 0 00-.746.37.972.972 0 00-.19.81l1.724 8.565c.095.44.484.755.933.755H24c.44 0 .824-.3.929-.727l2.043-8.568a.972.972 0 00-.176-.825.967.967 0 00-.753-.38z", fill: "currentcolor", "fill-rule": "evenodd" }) }) }), u$1("div", { className: "uppy-DashboardTab-name", children: this.props.i18n("myDevice") })] }) });
  };
  renderPhotoCamera = () => {
    return u$1("div", { className: "uppy-DashboardTab", role: "presentation", "data-uppy-acquirer-id": "MobilePhotoCamera", children: u$1("button", { type: "button", className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn", role: "tab", tabIndex: 0, "data-uppy-super-focusable": true, onClick: this.triggerPhotoCameraInputClick, children: [u$1("div", { className: "uppy-DashboardTab-inner", children: u$1("svg", { "aria-hidden": "true", focusable: "false", width: "32", height: "32", viewBox: "0 0 32 32", children: u$1("path", { d: "M23.5 9.5c1.417 0 2.5 1.083 2.5 2.5v9.167c0 1.416-1.083 2.5-2.5 2.5h-15c-1.417 0-2.5-1.084-2.5-2.5V12c0-1.417 1.083-2.5 2.5-2.5h2.917l1.416-2.167C13 7.167 13.25 7 13.5 7h5c.25 0 .5.167.667.333L20.583 9.5H23.5zM16 11.417a4.706 4.706 0 00-4.75 4.75 4.704 4.704 0 004.75 4.75 4.703 4.703 0 004.75-4.75c0-2.663-2.09-4.75-4.75-4.75zm0 7.825c-1.744 0-3.076-1.332-3.076-3.074 0-1.745 1.333-3.077 3.076-3.077 1.744 0 3.074 1.333 3.074 3.076s-1.33 3.075-3.074 3.075z", fill: "#02B383", "fill-rule": "nonzero" }) }) }), u$1("div", { className: "uppy-DashboardTab-name", children: this.props.i18n("takePictureBtn") })] }) });
  };
  renderVideoCamera = () => {
    return u$1("div", { className: "uppy-DashboardTab", role: "presentation", "data-uppy-acquirer-id": "MobileVideoCamera", children: u$1("button", { type: "button", className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn", role: "tab", tabIndex: 0, "data-uppy-super-focusable": true, onClick: this.triggerVideoCameraInputClick, children: [u$1("div", { className: "uppy-DashboardTab-inner", children: u$1("svg", { "aria-hidden": "true", width: "32", height: "32", viewBox: "0 0 32 32", children: u$1("path", { fill: "#FF675E", fillRule: "nonzero", d: "m21.254 14.277 2.941-2.588c.797-.313 1.243.818 1.09 1.554-.01 2.094.02 4.189-.017 6.282-.126.915-1.145 1.08-1.58.34l-2.434-2.142c-.192.287-.504 1.305-.738.468-.104-1.293-.028-2.596-.05-3.894.047-.312.381.823.426 1.069.063-.384.206-.744.362-1.09zm-12.939-3.73c3.858.013 7.717-.025 11.574.02.912.129 1.492 1.237 1.351 2.217-.019 2.412.04 4.83-.03 7.239-.17 1.025-1.166 1.59-2.029 1.429-3.705-.012-7.41.025-11.114-.019-.913-.129-1.492-1.237-1.352-2.217.018-2.404-.036-4.813.029-7.214.136-.82.83-1.473 1.571-1.454z " }) }) }), u$1("div", { className: "uppy-DashboardTab-name", children: this.props.i18n("recordVideoBtn") })] }) });
  };
  renderBrowseButton = (text, onClickFn) => {
    const numberOfAcquirers = this.props.acquirers.length;
    return u$1("button", { type: "button", className: "uppy-u-reset uppy-c-btn uppy-Dashboard-browse", onClick: onClickFn, "data-uppy-super-focusable": numberOfAcquirers === 0, children: text });
  };
  renderDropPasteBrowseTagline = (numberOfAcquirers) => {
    const browseFiles = this.renderBrowseButton(this.props.i18n("browseFiles"), this.triggerFileInputClick);
    const browseFolders = this.renderBrowseButton(this.props.i18n("browseFolders"), this.triggerFolderInputClick);
    const lowerFMSelectionType = this.props.fileManagerSelectionType;
    const camelFMSelectionType = lowerFMSelectionType.charAt(0).toUpperCase() + lowerFMSelectionType.slice(1);
    return u$1("div", { class: "uppy-Dashboard-AddFiles-title", children: this.props.disableLocalFiles ? this.props.i18n("importFiles") : numberOfAcquirers > 0 ? this.props.i18nArray(`dropPasteImport${camelFMSelectionType}`, {
      browseFiles,
      browseFolders,
      browse: browseFiles
    }) : this.props.i18nArray(`dropPaste${camelFMSelectionType}`, {
      browseFiles,
      browseFolders,
      browse: browseFiles
    }) });
  };
  [Symbol.for("uppy test: disable unused locale key warning")]() {
    this.props.i18nArray("dropPasteBoth");
    this.props.i18nArray("dropPasteFiles");
    this.props.i18nArray("dropPasteFolders");
    this.props.i18nArray("dropPasteImportBoth");
    this.props.i18nArray("dropPasteImportFiles");
    this.props.i18nArray("dropPasteImportFolders");
  }
  renderAcquirer = (acquirer) => {
    return u$1("div", { className: "uppy-DashboardTab", role: "presentation", "data-uppy-acquirer-id": acquirer.id, children: u$1("button", { type: "button", className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn", role: "tab", tabIndex: 0, "data-cy": acquirer.id, "aria-controls": `uppy-DashboardContent-panel--${acquirer.id}`, "aria-selected": this.props.activePickerPanel?.id === acquirer.id, "data-uppy-super-focusable": true, onClick: () => this.props.showPanel(acquirer.id), children: [u$1("div", { className: "uppy-DashboardTab-inner", children: acquirer.icon() }), u$1("div", { className: "uppy-DashboardTab-name", children: acquirer.name })] }) });
  };
  renderAcquirers = (acquirers) => {
    const acquirersWithoutLastTwo = [...acquirers];
    const lastTwoAcquirers = acquirersWithoutLastTwo.splice(acquirers.length - 2, acquirers.length);
    return u$1(k$2, { children: [acquirersWithoutLastTwo.map((acquirer) => this.renderAcquirer(acquirer)), u$1("span", { role: "presentation", style: { "white-space": "nowrap" }, children: lastTwoAcquirers.map((acquirer) => this.renderAcquirer(acquirer)) })] });
  };
  renderSourcesList = (acquirers, disableLocalFiles) => {
    const { showNativePhotoCameraButton, showNativeVideoCameraButton } = this.props;
    let list = [];
    const myDeviceKey = "myDevice";
    if (!disableLocalFiles)
      list.push({
        key: myDeviceKey,
        elements: this.renderMyDeviceAcquirer()
      });
    if (showNativePhotoCameraButton)
      list.push({
        key: "nativePhotoCameraButton",
        elements: this.renderPhotoCamera()
      });
    if (showNativeVideoCameraButton)
      list.push({
        key: "nativePhotoCameraButton",
        elements: this.renderVideoCamera()
      });
    list.push(...acquirers.map((acquirer) => ({
      key: acquirer.id,
      elements: this.renderAcquirer(acquirer)
    })));
    const hasOnlyMyDevice = list.length === 1 && list[0].key === myDeviceKey;
    if (hasOnlyMyDevice)
      list = [];
    const listWithoutLastTwo = [...list];
    const lastTwo = listWithoutLastTwo.splice(list.length - 2, list.length);
    return u$1(k$2, { children: [this.renderDropPasteBrowseTagline(list.length), u$1("div", { className: "uppy-Dashboard-AddFiles-list", role: "tablist", children: [listWithoutLastTwo.map(({ key, elements }) => u$1(k$2, { children: elements }, key)), u$1("span", { role: "presentation", style: { "white-space": "nowrap" }, children: lastTwo.map(({ key, elements }) => u$1(k$2, { children: elements }, key)) })] })] });
  };
  renderPoweredByUppy() {
    const { i18nArray } = this.props;
    const uppyBranding = u$1("span", { children: [u$1("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon uppy-Dashboard-poweredByIcon", width: "11", height: "11", viewBox: "0 0 11 11", children: u$1("path", { d: "M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z", fillRule: "evenodd" }) }), u$1("span", { className: "uppy-Dashboard-poweredByUppy", children: "Uppy" })] });
    const linkText = i18nArray("poweredBy", { uppy: uppyBranding });
    return u$1("a", { tabIndex: -1, href: "https://uppy.io", rel: "noreferrer noopener", target: "_blank", className: "uppy-Dashboard-poweredBy", children: linkText });
  }
  render() {
    const { showNativePhotoCameraButton, showNativeVideoCameraButton, nativeCameraFacingMode } = this.props;
    return u$1("div", { className: "uppy-Dashboard-AddFiles", children: [this.renderHiddenInput(false, (ref2) => {
      this.fileInput = ref2;
    }), this.renderHiddenInput(true, (ref2) => {
      this.folderInput = ref2;
    }), showNativePhotoCameraButton && this.renderHiddenCameraInput("photo", nativeCameraFacingMode, (ref2) => {
      this.mobilePhotoFileInput = ref2;
    }), showNativeVideoCameraButton && this.renderHiddenCameraInput("video", nativeCameraFacingMode, (ref2) => {
      this.mobileVideoFileInput = ref2;
    }), this.renderSourcesList(this.props.acquirers, this.props.disableLocalFiles), u$1("div", { className: "uppy-Dashboard-AddFiles-info", children: [this.props.note && u$1("div", { className: "uppy-Dashboard-note", children: this.props.note }), this.props.proudlyDisplayPoweredByUppy && this.renderPoweredByUppy()] })] });
  }
}
const AddFilesPanel = (props) => {
  return u$1("div", { className: classNames("uppy-Dashboard-AddFilesPanel", props.className), "data-uppy-panelType": "AddFiles", "aria-hidden": !props.showAddFilesPanel, children: [u$1("div", { className: "uppy-DashboardContent-bar", children: [u$1("div", {
    className: "uppy-DashboardContent-title",
    // biome-ignore lint/a11y/useSemanticElements: ...
    role: "heading",
    "aria-level": 1,
    children: props.i18n("addingMoreFiles")
  }), u$1("button", { className: "uppy-DashboardContent-back", type: "button", onClick: () => props.toggleAddFilesPanel(false), children: props.i18n("back") })] }), u$1(AddFiles, { ...props })] });
};
function EditorPanel(props) {
  const file = props.files[props.fileCardFor];
  const handleCancel = () => {
    props.uppy.emit("file-editor:cancel", file);
    props.closeFileEditor();
  };
  return u$1("div", { className: classNames("uppy-DashboardContent-panel", props.className), role: "tabpanel", "data-uppy-panelType": "FileEditor", id: "uppy-DashboardContent-panel--editor", children: [u$1("div", { className: "uppy-DashboardContent-bar", children: [u$1("div", {
    className: "uppy-DashboardContent-title",
    // biome-ignore lint/a11y/useSemanticElements: ...
    role: "heading",
    "aria-level": 1,
    children: props.i18nArray("editing", {
      file: u$1("span", { className: "uppy-DashboardContent-titleFile", children: file.meta ? file.meta.name : file.name })
    })
  }), u$1("button", { className: "uppy-DashboardContent-back", type: "button", onClick: handleCancel, children: props.i18n("cancel") }), u$1("button", { className: "uppy-DashboardContent-save", type: "button", onClick: props.saveFileEditor, children: props.i18n("save") })] }), u$1("div", { className: "uppy-DashboardContent-panelBody", children: props.editors.map((target) => {
    return props.uppy.getPlugin(target.id).render(props.state);
  }) })] });
}
function iconImage() {
  return u$1("svg", { "aria-hidden": "true", focusable: "false", width: "25", height: "25", viewBox: "0 0 25 25", children: u$1("g", { fill: "#686DE0", fillRule: "evenodd", children: [u$1("path", { d: "M5 7v10h15V7H5zm0-1h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z", fillRule: "nonzero" }), u$1("path", { d: "M6.35 17.172l4.994-5.026a.5.5 0 0 1 .707 0l2.16 2.16 3.505-3.505a.5.5 0 0 1 .707 0l2.336 2.31-.707.72-1.983-1.97-3.505 3.505a.5.5 0 0 1-.707 0l-2.16-2.159-3.938 3.939-1.409.026z", fillRule: "nonzero" }), u$1("circle", { cx: "7.5", cy: "9.5", r: "1.5" })] }) });
}
function iconAudio() {
  return u$1("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "25", height: "25", viewBox: "0 0 25 25", children: u$1("path", { d: "M9.5 18.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V7.25a.5.5 0 0 1 .379-.485l9-2.25A.5.5 0 0 1 18.5 5v11.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V8.67l-8 2v7.97zm8-11v-2l-8 2v2l8-2zM7 19.64c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1zm9-2c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1z", fill: "#049BCF", fillRule: "nonzero" }) });
}
function iconVideo() {
  return u$1("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "25", height: "25", viewBox: "0 0 25 25", children: u$1("path", { d: "M16 11.834l4.486-2.691A1 1 0 0 1 22 10v6a1 1 0 0 1-1.514.857L16 14.167V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.834zM15 9H5v8h10V9zm1 4l5 3v-6l-5 3z", fill: "#19AF67", fillRule: "nonzero" }) });
}
function iconPDF() {
  return u$1("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "25", height: "25", viewBox: "0 0 25 25", children: u$1("path", { d: "M9.766 8.295c-.691-1.843-.539-3.401.747-3.726 1.643-.414 2.505.938 2.39 3.299-.039.79-.194 1.662-.537 3.148.324.49.66.967 1.055 1.51.17.231.382.488.629.757 1.866-.128 3.653.114 4.918.655 1.487.635 2.192 1.685 1.614 2.84-.566 1.133-1.839 1.084-3.416.249-1.141-.604-2.457-1.634-3.51-2.707a13.467 13.467 0 0 0-2.238.426c-1.392 4.051-4.534 6.453-5.707 4.572-.986-1.58 1.38-4.206 4.914-5.375.097-.322.185-.656.264-1.001.08-.353.306-1.31.407-1.737-.678-1.059-1.2-2.031-1.53-2.91zm2.098 4.87c-.033.144-.068.287-.104.427l.033-.01-.012.038a14.065 14.065 0 0 1 1.02-.197l-.032-.033.052-.004a7.902 7.902 0 0 1-.208-.271c-.197-.27-.38-.526-.555-.775l-.006.028-.002-.003c-.076.323-.148.632-.186.8zm5.77 2.978c1.143.605 1.832.632 2.054.187.26-.519-.087-1.034-1.113-1.473-.911-.39-2.175-.608-3.55-.608.845.766 1.787 1.459 2.609 1.894zM6.559 18.789c.14.223.693.16 1.425-.413.827-.648 1.61-1.747 2.208-3.206-2.563 1.064-4.102 2.867-3.633 3.62zm5.345-10.97c.088-1.793-.351-2.48-1.146-2.28-.473.119-.564 1.05-.056 2.405.213.566.52 1.188.908 1.859.18-.858.268-1.453.294-1.984z", fill: "#E2514A", fillRule: "nonzero" }) });
}
function iconArchive() {
  return u$1("svg", { "aria-hidden": "true", focusable: "false", width: "25", height: "25", viewBox: "0 0 25 25", children: u$1("path", { d: "M10.45 2.05h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V2.55a.5.5 0 0 1 .5-.5zm2.05 1.024h1.05a.5.5 0 0 1 .5.5V3.6a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5v-.001zM10.45 0h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 3.074h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 1.024h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm-2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-1.656 3.074l-.82 5.946c.52.302 1.174.458 1.976.458.803 0 1.455-.156 1.975-.458l-.82-5.946h-2.311zm0-1.025h2.312c.512 0 .946.378 1.015.885l.82 5.946c.056.412-.142.817-.501 1.026-.686.398-1.515.597-2.49.597-.974 0-1.804-.199-2.49-.597a1.025 1.025 0 0 1-.5-1.026l.819-5.946c.07-.507.503-.885 1.015-.885zm.545 6.6a.5.5 0 0 1-.397-.561l.143-.999a.5.5 0 0 1 .495-.429h.74a.5.5 0 0 1 .495.43l.143.998a.5.5 0 0 1-.397.561c-.404.08-.819.08-1.222 0z", fill: "#00C469", fillRule: "nonzero" }) });
}
function iconFile() {
  return u$1("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "25", height: "25", viewBox: "0 0 25 25", children: u$1("g", { fill: "#A7AFB7", fillRule: "nonzero", children: [u$1("path", { d: "M5.5 22a.5.5 0 0 1-.5-.5v-18a.5.5 0 0 1 .5-.5h10.719a.5.5 0 0 1 .367.16l3.281 3.556a.5.5 0 0 1 .133.339V21.5a.5.5 0 0 1-.5.5h-14zm.5-1h13V7.25L16 4H6v17z" }), u$1("path", { d: "M15 4v3a1 1 0 0 0 1 1h3V7h-3V4h-1z" })] }) });
}
function iconText() {
  return u$1("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "25", height: "25", viewBox: "0 0 25 25", children: u$1("path", { d: "M4.5 7h13a.5.5 0 1 1 0 1h-13a.5.5 0 0 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z", fill: "#5A5E69", fillRule: "nonzero" }) });
}
function getIconByMime(fileType) {
  const defaultChoice = {
    color: "#838999",
    icon: iconFile()
  };
  if (!fileType)
    return defaultChoice;
  const fileTypeGeneral = fileType.split("/")[0];
  const fileTypeSpecific = fileType.split("/")[1];
  if (fileTypeGeneral === "text") {
    return {
      color: "#5a5e69",
      icon: iconText()
    };
  }
  if (fileTypeGeneral === "image") {
    return {
      color: "#686de0",
      icon: iconImage()
    };
  }
  if (fileTypeGeneral === "audio") {
    return {
      color: "#068dbb",
      icon: iconAudio()
    };
  }
  if (fileTypeGeneral === "video") {
    return {
      color: "#19af67",
      icon: iconVideo()
    };
  }
  if (fileTypeGeneral === "application" && fileTypeSpecific === "pdf") {
    return {
      color: "#e25149",
      icon: iconPDF()
    };
  }
  const archiveTypes = [
    "zip",
    "x-7z-compressed",
    "x-zip-compressed",
    "x-rar-compressed",
    "x-tar",
    "x-gzip",
    "x-apple-diskimage"
  ];
  if (fileTypeGeneral === "application" && archiveTypes.indexOf(fileTypeSpecific) !== -1) {
    return {
      color: "#00C469",
      icon: iconArchive()
    };
  }
  return defaultChoice;
}
function ignoreEvent(ev) {
  const { tagName } = ev.target;
  if (tagName === "INPUT" || tagName === "TEXTAREA") {
    ev.stopPropagation();
    return;
  }
  ev.preventDefault();
  ev.stopPropagation();
}
function FilePreview(props) {
  const { file } = props;
  if (file.preview) {
    return u$1("img", { draggable: false, className: "uppy-Dashboard-Item-previewImg", alt: file.name, src: file.preview });
  }
  const { color, icon } = getIconByMime(file.type);
  return u$1("div", { className: "uppy-Dashboard-Item-previewIconWrap", children: [u$1("span", { className: "uppy-Dashboard-Item-previewIcon", style: { color }, children: icon }), u$1("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-Dashboard-Item-previewIconBg", width: "58", height: "76", viewBox: "0 0 58 76", children: u$1("rect", { fill: "#FFF", width: "58", height: "76", rx: "3", fillRule: "evenodd" }) })] });
}
function RenderMetaFields(props) {
  const { computedMetaFields, requiredMetaFields, updateMeta, form, formState } = props;
  const fieldCSSClasses = {
    text: "uppy-u-reset uppy-c-textInput uppy-Dashboard-FileCard-input"
  };
  return computedMetaFields.map((field) => {
    const id = `uppy-Dashboard-FileCard-input-${field.id}`;
    const required = requiredMetaFields.includes(field.id);
    return u$1("fieldset", { className: "uppy-Dashboard-FileCard-fieldset", children: [u$1("label", { className: "uppy-Dashboard-FileCard-label", htmlFor: id, children: field.name }), field.render !== void 0 ? field.render({
      value: formState[field.id],
      onChange: (newVal) => updateMeta(newVal, field.id),
      fieldCSSClasses,
      required,
      form: form.id
    }, _$1) : u$1("input", { className: fieldCSSClasses.text, id, form: form.id, type: field.type || "text", required, value: formState[field.id], placeholder: field.placeholder, onInput: (ev) => updateMeta(ev.target.value, field.id), "data-uppy-super-focusable": true })] }, field.id);
  });
}
function FileCard(props) {
  const { files, fileCardFor, toggleFileCard, saveFileCard, metaFields, requiredMetaFields, openFileEditor, i18n, i18nArray, className, canEditFile } = props;
  const getMetaFields = () => {
    return typeof metaFields === "function" ? metaFields(files[fileCardFor]) : metaFields;
  };
  const file = files[fileCardFor];
  const computedMetaFields = getMetaFields() ?? [];
  const showEditButton = canEditFile(file);
  const storedMetaData = {};
  computedMetaFields.forEach((field) => {
    storedMetaData[field.id] = file.meta[field.id] ?? "";
  });
  const [formState, setFormState] = d$1(storedMetaData);
  const handleSave = q$2((ev) => {
    ev.preventDefault();
    saveFileCard(formState, fileCardFor);
  }, [saveFileCard, formState, fileCardFor]);
  const updateMeta = (newVal, name) => {
    setFormState({
      ...formState,
      [name]: newVal
    });
  };
  const handleCancel = () => {
    toggleFileCard(false);
  };
  const [form] = d$1(() => {
    const formEl = document.createElement("form");
    formEl.setAttribute("tabindex", "-1");
    formEl.id = nanoid();
    return formEl;
  });
  y$1(() => {
    document.body.appendChild(form);
    form.addEventListener("submit", handleSave);
    return () => {
      form.removeEventListener("submit", handleSave);
      document.body.removeChild(form);
    };
  }, [form, handleSave]);
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: ...
    u$1("div", { className: classNames("uppy-Dashboard-FileCard", className), "data-uppy-panelType": "FileCard", onDragOver: ignoreEvent, onDragLeave: ignoreEvent, onDrop: ignoreEvent, onPaste: ignoreEvent, children: [u$1("div", { className: "uppy-DashboardContent-bar", children: [u$1("div", {
      className: "uppy-DashboardContent-title",
      // biome-ignore lint/a11y/useSemanticElements: ...
      role: "heading",
      "aria-level": 1,
      children: i18nArray("editing", {
        file: u$1("span", { className: "uppy-DashboardContent-titleFile", children: file.meta ? file.meta.name : file.name })
      })
    }), u$1("button", { className: "uppy-DashboardContent-back", type: "button", form: form.id, title: i18n("finishEditingFile"), onClick: handleCancel, children: i18n("cancel") })] }), u$1("div", { className: "uppy-Dashboard-FileCard-inner", children: [u$1("div", { className: "uppy-Dashboard-FileCard-preview", style: { backgroundColor: getIconByMime(file.type).color }, children: [u$1(FilePreview, { file }), showEditButton && u$1("button", { type: "button", className: "uppy-u-reset uppy-c-btn uppy-Dashboard-FileCard-edit", onClick: (event) => {
      handleSave(event);
      openFileEditor(file);
    }, children: i18n("editImage") })] }), u$1("div", { className: "uppy-Dashboard-FileCard-info", children: u$1(RenderMetaFields, { computedMetaFields, requiredMetaFields, updateMeta, form, formState }) }), u$1("div", { className: "uppy-Dashboard-FileCard-actions", children: [u$1("button", {
      className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-FileCard-actionsBtn",
      // If `form` attribute is supported, we want a submit button to trigger the form validation.
      // Otherwise, fallback to a classic button with a onClick event handler.
      type: "submit",
      form: form.id,
      children: i18n("saveChanges")
    }), u$1("button", { className: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-FileCard-actionsBtn", type: "button", onClick: handleCancel, form: form.id, children: i18n("cancel") })] })] })] })
  );
}
function shallowEqualObjects(objA, objB) {
  if (objA === objB) {
    return true;
  }
  if (!objA || !objB) {
    return false;
  }
  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);
  const len = aKeys.length;
  if (bKeys.length !== len) {
    return false;
  }
  for (let i2 = 0; i2 < len; i2++) {
    const key = aKeys[i2];
    if (objA[key] !== objB[key] || !Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }
  }
  return true;
}
function copyToClipboard(textToCopy, fallbackString = "Copy the URL below") {
  return new Promise((resolve) => {
    const textArea = document.createElement("textarea");
    textArea.setAttribute("style", {
      position: "fixed",
      top: 0,
      left: 0,
      width: "2em",
      height: "2em",
      padding: 0,
      border: "none",
      outline: "none",
      boxShadow: "none",
      background: "transparent"
    });
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    const magicCopyFailed = () => {
      document.body.removeChild(textArea);
      window.prompt(fallbackString, textToCopy);
      resolve();
    };
    try {
      const successful = document.execCommand("copy");
      if (!successful) {
        return magicCopyFailed();
      }
      document.body.removeChild(textArea);
      return resolve();
    } catch (_err) {
      document.body.removeChild(textArea);
      return magicCopyFailed();
    }
  });
}
function EditButton({ file, uploadInProgressOrComplete, metaFields, canEditFile, i18n, onClick }) {
  if (!uploadInProgressOrComplete && metaFields && metaFields.length > 0 || !uploadInProgressOrComplete && canEditFile(file)) {
    return u$1("button", { className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit", type: "button", "aria-label": i18n("editFileWithFilename", { file: file.meta.name }), title: i18n("editFileWithFilename", { file: file.meta.name }), onClick: () => onClick(), children: u$1("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "14", height: "14", viewBox: "0 0 14 14", children: u$1("g", { fillRule: "evenodd", children: [u$1("path", { d: "M1.5 10.793h2.793A1 1 0 0 0 5 10.5L11.5 4a1 1 0 0 0 0-1.414L9.707.793a1 1 0 0 0-1.414 0l-6.5 6.5A1 1 0 0 0 1.5 8v2.793zm1-1V8L9 1.5l1.793 1.793-6.5 6.5H2.5z", fillRule: "nonzero" }), u$1("rect", { x: "1", y: "12.293", width: "11", height: "1", rx: ".5" }), u$1("path", { fillRule: "nonzero", d: "M6.793 2.5L9.5 5.207l.707-.707L7.5 1.793z" })] }) }) });
  }
  return null;
}
function RemoveButton({ i18n, onClick, file }) {
  return u$1("button", { className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--remove", type: "button", "aria-label": i18n("removeFile", { file: file.meta.name }), title: i18n("removeFile", { file: file.meta.name }), onClick: () => onClick(), children: u$1("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "18", height: "18", viewBox: "0 0 18 18", children: [u$1("path", { d: "M9 0C4.034 0 0 4.034 0 9s4.034 9 9 9 9-4.034 9-9-4.034-9-9-9z" }), u$1("path", { fill: "#FFF", d: "M13 12.222l-.778.778L9 9.778 5.778 13 5 12.222 8.222 9 5 5.778 5.778 5 9 8.222 12.222 5l.778.778L9.778 9z" })] }) });
}
function CopyLinkButton({ file, uppy, i18n }) {
  const copyLinkToClipboard = (event) => {
    copyToClipboard(file.uploadURL, i18n("copyLinkToClipboardFallback")).then(() => {
      uppy.log("Link copied to clipboard.");
      uppy.info(i18n("copyLinkToClipboardSuccess"), "info", 3e3);
    }).catch(uppy.log).then(() => event.target.focus({ preventScroll: true }));
  };
  return u$1("button", { className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--copyLink", type: "button", "aria-label": i18n("copyLink"), title: i18n("copyLink"), onClick: (event) => copyLinkToClipboard(event), children: u$1("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "14", height: "14", viewBox: "0 0 14 12", children: u$1("path", { d: "M7.94 7.703a2.613 2.613 0 0 1-.626 2.681l-.852.851a2.597 2.597 0 0 1-1.849.766A2.616 2.616 0 0 1 2.764 7.54l.852-.852a2.596 2.596 0 0 1 2.69-.625L5.267 7.099a1.44 1.44 0 0 0-.833.407l-.852.851a1.458 1.458 0 0 0 1.03 2.486c.39 0 .755-.152 1.03-.426l.852-.852c.231-.231.363-.522.406-.824l1.04-1.038zm4.295-5.937A2.596 2.596 0 0 0 10.387 1c-.698 0-1.355.272-1.849.766l-.852.851a2.614 2.614 0 0 0-.624 2.688l1.036-1.036c.041-.304.173-.6.407-.833l.852-.852c.275-.275.64-.426 1.03-.426a1.458 1.458 0 0 1 1.03 2.486l-.852.851a1.442 1.442 0 0 1-.824.406l-1.04 1.04a2.596 2.596 0 0 0 2.683-.628l.851-.85a2.616 2.616 0 0 0 0-3.697zm-6.88 6.883a.577.577 0 0 0 .82 0l3.474-3.474a.579.579 0 1 0-.819-.82L5.355 7.83a.579.579 0 0 0 0 .819z" }) }) });
}
function Buttons(props) {
  const { uppy, file, uploadInProgressOrComplete, canEditFile, metaFields, showLinkToFileUploadResult, showRemoveButton, i18n, toggleFileCard, openFileEditor } = props;
  const editAction = () => {
    if (metaFields && metaFields.length > 0) {
      toggleFileCard(true, file.id);
    } else {
      openFileEditor(file);
    }
  };
  return u$1("div", { className: "uppy-Dashboard-Item-actionWrapper", children: [u$1(EditButton, { i18n, file, uploadInProgressOrComplete, canEditFile, metaFields, onClick: editAction }), showLinkToFileUploadResult && file.uploadURL ? u$1(CopyLinkButton, { file, uppy, i18n }) : null, showRemoveButton ? u$1(RemoveButton, { i18n, file, onClick: () => uppy.removeFile(file.id) }) : null] });
}
const separator = "...";
function truncateString(string, maxLength) {
  if (maxLength === 0)
    return "";
  if (string.length <= maxLength)
    return string;
  if (maxLength <= separator.length + 1)
    return `${string.slice(0, maxLength - 1)}…`;
  const charsToShow = maxLength - separator.length;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return string.slice(0, frontChars) + separator + string.slice(-backChars);
}
const metaFieldIdToName = (metaFieldId, metaFields) => {
  const fields = typeof metaFields === "function" ? metaFields() : metaFields;
  const field = fields.filter((f2) => f2.id === metaFieldId);
  return field[0].name;
};
function MetaErrorMessage(props) {
  const { file, toggleFileCard, i18n, metaFields } = props;
  const { missingRequiredMetaFields } = file;
  if (!missingRequiredMetaFields?.length) {
    return null;
  }
  const metaFieldsString = missingRequiredMetaFields.map((missingMetaField) => metaFieldIdToName(missingMetaField, metaFields)).join(", ");
  return u$1("div", { className: "uppy-Dashboard-Item-errorMessage", children: [i18n("missingRequiredMetaFields", {
    smart_count: missingRequiredMetaFields.length,
    fields: metaFieldsString
  }), " ", u$1("button", { type: "button", class: "uppy-u-reset uppy-Dashboard-Item-errorMessageBtn", onClick: () => toggleFileCard(true, file.id), children: i18n("editFile") })] });
}
const renderFileName = (props) => {
  const { author, name } = props.file.meta;
  function getMaxNameLength() {
    if (props.isSingleFile && props.containerHeight >= 350) {
      return 90;
    }
    if (props.containerWidth <= 352) {
      return 35;
    }
    if (props.containerWidth <= 576) {
      return 60;
    }
    return author ? 20 : 30;
  }
  return u$1("div", { className: "uppy-Dashboard-Item-name", title: name, children: truncateString(name, getMaxNameLength()) });
};
const renderAuthor = (props) => {
  const { author } = props.file.meta;
  const providerName = props.file.remote?.providerName;
  const dot = `·`;
  if (!author) {
    return null;
  }
  return u$1("div", { className: "uppy-Dashboard-Item-author", children: [u$1("a", { href: `${author.url}?utm_source=Companion&utm_medium=referral`, target: "_blank", rel: "noopener noreferrer", children: truncateString(author.name, 13) }), providerName ? u$1(k$2, { children: [` ${dot} `, providerName, ` ${dot} `] }) : null] });
};
const renderFileSize = (props) => props.file.size && u$1("div", { className: "uppy-Dashboard-Item-statusSize", children: prettierBytes$1(props.file.size) });
const ReSelectButton = (props) => props.file.isGhost && u$1("span", { children: [" • ", u$1("button", { className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-reSelect", type: "button", onClick: () => props.toggleAddFilesPanel(true), children: props.i18n("reSelect") })] });
const ErrorButton = ({ file, onClick }) => {
  if (file.error) {
    return u$1("button", { className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-errorDetails", "aria-label": file.error, "data-microtip-position": "bottom", "data-microtip-size": "medium", onClick, type: "button", children: "?" });
  }
  return null;
};
function FileInfo(props) {
  const { file, i18n, toggleFileCard, metaFields, toggleAddFilesPanel, isSingleFile, containerHeight, containerWidth } = props;
  return u$1("div", { className: "uppy-Dashboard-Item-fileInfo", "data-uppy-file-source": file.source, children: [u$1("div", { className: "uppy-Dashboard-Item-fileName", children: [renderFileName({
    file,
    isSingleFile,
    containerHeight,
    containerWidth
  }), u$1(ErrorButton, { file, onClick: () => alert(file.error) })] }), u$1("div", { className: "uppy-Dashboard-Item-status", children: [renderAuthor({ file }), renderFileSize({ file }), ReSelectButton({ file, toggleAddFilesPanel, i18n })] }), u$1(MetaErrorMessage, { file, i18n, toggleFileCard, metaFields })] });
}
function FilePreviewAndLink(props) {
  const { file, i18n, toggleFileCard, metaFields, showLinkToFileUploadResult } = props;
  const white = "rgba(255, 255, 255, 0.5)";
  const previewBackgroundColor = file.preview ? white : getIconByMime(file.type).color;
  return u$1("div", { className: "uppy-Dashboard-Item-previewInnerWrap", style: { backgroundColor: previewBackgroundColor }, children: [showLinkToFileUploadResult && file.uploadURL && u$1("a", { className: "uppy-Dashboard-Item-previewLink", href: file.uploadURL, rel: "noreferrer noopener", target: "_blank", "aria-label": file.meta.name, children: u$1("span", { hidden: true, children: file.meta.name }) }), u$1(FilePreview, { file }), u$1(MetaErrorMessage, { file, i18n, toggleFileCard, metaFields })] });
}
function onPauseResumeCancelRetry(props) {
  if (props.isUploaded)
    return;
  if (props.error && !props.hideRetryButton) {
    props.uppy.retryUpload(props.file.id);
    return;
  }
  if (props.resumableUploads && !props.hidePauseResumeButton) {
    props.uppy.pauseResume(props.file.id);
  } else if (props.individualCancellation && !props.hideCancelButton) {
    props.uppy.removeFile(props.file.id);
  }
}
function progressIndicatorTitle(props) {
  if (props.isUploaded) {
    return props.i18n("uploadComplete");
  }
  if (props.error) {
    return props.i18n("retryUpload");
  }
  if (props.resumableUploads) {
    if (props.file.isPaused) {
      return props.i18n("resumeUpload");
    }
    return props.i18n("pauseUpload");
  }
  if (props.individualCancellation) {
    return props.i18n("cancelUpload");
  }
  return "";
}
function ProgressIndicatorButton(props) {
  return u$1("div", { className: "uppy-Dashboard-Item-progress", children: u$1("button", { className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-progressIndicator", type: "button", "aria-label": progressIndicatorTitle(props), title: progressIndicatorTitle(props), onClick: () => onPauseResumeCancelRetry(props), children: props.children }) });
}
function ProgressCircleContainer({ children }) {
  return u$1("svg", { "aria-hidden": "true", focusable: "false", width: "70", height: "70", viewBox: "0 0 36 36", className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--circle", children });
}
function ProgressCircle({ progress }) {
  const circleLength = 2 * Math.PI * 15;
  return u$1("g", { children: [u$1("circle", { className: "uppy-Dashboard-Item-progressIcon--bg", r: "15", cx: "18", cy: "18", "stroke-width": "2", fill: "none" }), u$1("circle", { className: "uppy-Dashboard-Item-progressIcon--progress", r: "15", cx: "18", cy: "18", transform: "rotate(-90, 18, 18)", fill: "none", "stroke-width": "2", "stroke-dasharray": circleLength, "stroke-dashoffset": circleLength - circleLength / 100 * progress })] });
}
function FileProgress(props) {
  if (!props.file.progress.uploadStarted) {
    return null;
  }
  if (props.file.progress.percentage === void 0) {
    return null;
  }
  if (props.isUploaded) {
    return u$1("div", { className: "uppy-Dashboard-Item-progress", children: u$1("div", { className: "uppy-Dashboard-Item-progressIndicator", children: u$1(ProgressCircleContainer, { children: [u$1("circle", { r: "15", cx: "18", cy: "18", fill: "#1bb240" }), u$1("polygon", { className: "uppy-Dashboard-Item-progressIcon--check", transform: "translate(2, 3)", points: "14 22.5 7 15.2457065 8.99985857 13.1732815 14 18.3547104 22.9729883 9 25 11.1005634" })] }) }) });
  }
  if (props.recoveredState) {
    return null;
  }
  if (props.error && !props.hideRetryButton) {
    return u$1(ProgressIndicatorButton, { ...props, children: u$1("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--retry", width: "28", height: "31", viewBox: "0 0 16 19", children: [u$1("path", { d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z" }), u$1("path", { d: "M7.9 3H10v2H7.9z" }), u$1("path", { d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z" }), u$1("path", { d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z" })] }) });
  }
  if (props.resumableUploads && !props.hidePauseResumeButton) {
    return u$1(ProgressIndicatorButton, { ...props, children: u$1(ProgressCircleContainer, { children: [u$1(ProgressCircle, { progress: props.file.progress.percentage }), props.file.isPaused ? u$1("polygon", { className: "uppy-Dashboard-Item-progressIcon--play", transform: "translate(3, 3)", points: "12 20 12 10 20 15" }) : u$1("g", { className: "uppy-Dashboard-Item-progressIcon--pause", transform: "translate(14.5, 13)", children: [u$1("rect", { x: "0", y: "0", width: "2", height: "10", rx: "0" }), u$1("rect", { x: "5", y: "0", width: "2", height: "10", rx: "0" })] })] }) });
  }
  if (!props.resumableUploads && props.individualCancellation && !props.hideCancelButton) {
    return u$1(ProgressIndicatorButton, { ...props, children: u$1(ProgressCircleContainer, { children: [u$1(ProgressCircle, { progress: props.file.progress.percentage }), u$1("polygon", { className: "cancel", transform: "translate(2, 2)", points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12" })] }) });
  }
  return u$1("div", { className: "uppy-Dashboard-Item-progress", children: u$1("div", { className: "uppy-Dashboard-Item-progressIndicator", children: u$1(ProgressCircleContainer, { children: u$1(ProgressCircle, { progress: props.file.progress.percentage }) }) }) });
}
class FileItem extends x {
  componentDidMount() {
    const { file } = this.props;
    if (!file.preview) {
      this.props.handleRequestThumbnail(file);
    }
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqualObjects(this.props, nextProps);
  }
  // VirtualList mounts FileItems again and they emit `thumbnail:request`
  // Otherwise thumbnails are broken or missing after Golden Retriever restores files
  componentDidUpdate() {
    const { file } = this.props;
    if (!file.preview) {
      this.props.handleRequestThumbnail(file);
    }
  }
  componentWillUnmount() {
    const { file } = this.props;
    if (!file.preview) {
      this.props.handleCancelThumbnail(file);
    }
  }
  render() {
    const { file } = this.props;
    const isProcessing = file.progress.preprocess || file.progress.postprocess;
    const isUploaded = !!file.progress.uploadComplete && !isProcessing && !file.error;
    const uploadInProgressOrComplete = !!file.progress.uploadStarted || !!isProcessing;
    const uploadInProgress = file.progress.uploadStarted && !file.progress.uploadComplete || isProcessing;
    const error = file.error || false;
    const { isGhost } = file;
    let showRemoveButton = this.props.individualCancellation ? !isUploaded : !uploadInProgress && !isUploaded;
    if (isUploaded && this.props.showRemoveButtonAfterComplete) {
      showRemoveButton = true;
    }
    const dashboardItemClass = classNames({
      "uppy-Dashboard-Item": true,
      "is-inprogress": uploadInProgress && !this.props.recoveredState,
      "is-processing": isProcessing,
      "is-complete": isUploaded,
      "is-error": !!error,
      "is-resumable": this.props.resumableUploads,
      "is-noIndividualCancellation": !this.props.individualCancellation,
      "is-ghost": isGhost
    });
    return u$1("div", { className: dashboardItemClass, id: `uppy_${file.id}`, role: this.props.role, children: [u$1("div", { className: "uppy-Dashboard-Item-preview", children: [u$1(FilePreviewAndLink, { file, showLinkToFileUploadResult: this.props.showLinkToFileUploadResult, i18n: this.props.i18n, toggleFileCard: this.props.toggleFileCard, metaFields: this.props.metaFields }), u$1(FileProgress, { uppy: this.props.uppy, file, error, isUploaded, hideRetryButton: this.props.hideRetryButton, hideCancelButton: this.props.hideCancelButton, hidePauseResumeButton: this.props.hidePauseResumeButton, recoveredState: this.props.recoveredState, resumableUploads: this.props.resumableUploads, individualCancellation: this.props.individualCancellation, i18n: this.props.i18n })] }), u$1("div", { className: "uppy-Dashboard-Item-fileInfoAndButtons", children: [u$1(FileInfo, { file, containerWidth: this.props.containerWidth, containerHeight: this.props.containerHeight, i18n: this.props.i18n, toggleAddFilesPanel: this.props.toggleAddFilesPanel, toggleFileCard: this.props.toggleFileCard, metaFields: this.props.metaFields, isSingleFile: this.props.isSingleFile }), u$1(Buttons, { file, metaFields: this.props.metaFields, showLinkToFileUploadResult: this.props.showLinkToFileUploadResult, showRemoveButton, canEditFile: this.props.canEditFile, uploadInProgressOrComplete, toggleFileCard: this.props.toggleFileCard, openFileEditor: this.props.openFileEditor, uppy: this.props.uppy, i18n: this.props.i18n })] })] });
  }
}
function chunks(list, size) {
  const chunked = [];
  let currentChunk = [];
  list.forEach((item) => {
    if (currentChunk.length < size) {
      currentChunk.push(item);
    } else {
      chunked.push(currentChunk);
      currentChunk = [item];
    }
  });
  if (currentChunk.length)
    chunked.push(currentChunk);
  return chunked;
}
function FileList({ id, i18n, uppy, files, resumableUploads, hideRetryButton, hidePauseResumeButton, hideCancelButton, showLinkToFileUploadResult, showRemoveButtonAfterComplete, metaFields, isSingleFile, toggleFileCard, handleRequestThumbnail, handleCancelThumbnail, recoveredState, individualCancellation, itemsPerRow, openFileEditor, canEditFile, toggleAddFilesPanel, containerWidth, containerHeight }) {
  const rowHeight = itemsPerRow === 1 ? (
    // Mobile
    71
  ) : (
    // 190px height + 2 * 5px margin
    200
  );
  const rows = T$2(() => {
    const sortByGhostComesFirst = (file1, file2) => Number(files[file2].isGhost) - Number(files[file1].isGhost);
    const fileIds = Object.keys(files);
    if (recoveredState)
      fileIds.sort(sortByGhostComesFirst);
    return chunks(fileIds, itemsPerRow);
  }, [files, itemsPerRow, recoveredState]);
  const renderRow = (row) => u$1("div", {
    class: "uppy-Dashboard-filesInner",
    // The `role="presentation` attribute ensures that the list items are properly
    // associated with the `VirtualList` element.
    role: "presentation",
    children: row.map((fileID) => u$1(FileItem, {
      uppy,
      // FIXME This is confusing, it's actually the Dashboard's plugin ID
      id,
      // TODO move this to context
      i18n,
      // features
      resumableUploads,
      individualCancellation,
      // visual options
      hideRetryButton,
      hidePauseResumeButton,
      hideCancelButton,
      showLinkToFileUploadResult,
      showRemoveButtonAfterComplete,
      metaFields,
      recoveredState,
      isSingleFile,
      containerWidth,
      containerHeight,
      // callbacks
      toggleFileCard,
      handleRequestThumbnail,
      handleCancelThumbnail,
      role: "listitem",
      openFileEditor,
      canEditFile,
      toggleAddFilesPanel,
      file: files[fileID]
    }, fileID))
  }, row[0]);
  if (isSingleFile) {
    return u$1("div", { class: "uppy-Dashboard-files", children: renderRow(rows[0]) });
  }
  return u$1(VirtualList, { class: "uppy-Dashboard-files", role: "list", data: rows, renderRow, rowHeight });
}
function PickerPanelContent({ activePickerPanel, className, hideAllPanels, i18n, state, uppy }) {
  const ref2 = A$1(null);
  return u$1("div", { className: classNames("uppy-DashboardContent-panel", className), role: "tabpanel", "data-uppy-panelType": "PickerPanel", id: `uppy-DashboardContent-panel--${activePickerPanel.id}`, onDragOver: ignoreEvent, onDragLeave: ignoreEvent, onDrop: ignoreEvent, onPaste: ignoreEvent, children: [u$1("div", { className: "uppy-DashboardContent-bar", children: [u$1("div", {
    className: "uppy-DashboardContent-title",
    // biome-ignore lint/a11y/useSemanticElements: ...
    role: "heading",
    "aria-level": 1,
    children: i18n("importFrom", { name: activePickerPanel.name })
  }), u$1("button", { className: "uppy-DashboardContent-back", type: "button", onClick: hideAllPanels, children: i18n("cancel") })] }), u$1("div", { ref: ref2, className: "uppy-DashboardContent-panelBody", children: uppy.getPlugin(activePickerPanel.id).render(state, ref2.current) })] });
}
const uploadStates = {
  STATE_ERROR: "error",
  STATE_WAITING: "waiting",
  STATE_PREPROCESSING: "preprocessing",
  STATE_UPLOADING: "uploading",
  STATE_POSTPROCESSING: "postprocessing",
  STATE_COMPLETE: "complete",
  STATE_PAUSED: "paused"
};
function getUploadingState(isAllErrored, isAllComplete, isAllPaused, files = {}) {
  if (isAllErrored) {
    return uploadStates.STATE_ERROR;
  }
  if (isAllComplete) {
    return uploadStates.STATE_COMPLETE;
  }
  if (isAllPaused) {
    return uploadStates.STATE_PAUSED;
  }
  let state = uploadStates.STATE_WAITING;
  const fileIDs = Object.keys(files);
  for (let i2 = 0; i2 < fileIDs.length; i2++) {
    const { progress } = files[fileIDs[i2]];
    if (progress.uploadStarted && !progress.uploadComplete) {
      return uploadStates.STATE_UPLOADING;
    }
    if (progress.preprocess && state !== uploadStates.STATE_UPLOADING) {
      state = uploadStates.STATE_PREPROCESSING;
    }
    if (progress.postprocess && state !== uploadStates.STATE_UPLOADING && state !== uploadStates.STATE_PREPROCESSING) {
      state = uploadStates.STATE_POSTPROCESSING;
    }
  }
  return state;
}
function UploadStatus({ files, i18n, isAllComplete, isAllErrored, isAllPaused, inProgressNotPausedFiles, newFiles, processingFiles }) {
  const uploadingState = getUploadingState(isAllErrored, isAllComplete, isAllPaused, files);
  switch (uploadingState) {
    case "uploading":
      return i18n("uploadingXFiles", {
        smart_count: inProgressNotPausedFiles.length
      });
    case "preprocessing":
    case "postprocessing":
      return i18n("processingXFiles", { smart_count: processingFiles.length });
    case "paused":
      return i18n("uploadPaused");
    case "waiting":
      return i18n("xFilesSelected", { smart_count: newFiles.length });
    case "complete":
      return i18n("uploadComplete");
    case "error":
      return i18n("error");
  }
}
function PanelTopBar(props) {
  const { i18n, isAllComplete, hideCancelButton, maxNumberOfFiles, toggleAddFilesPanel, uppy } = props;
  let { allowNewUpload } = props;
  if (allowNewUpload && maxNumberOfFiles) {
    allowNewUpload = props.totalFileCount < props.maxNumberOfFiles;
  }
  return u$1("div", { className: "uppy-DashboardContent-bar", children: [!isAllComplete && !hideCancelButton ? u$1("button", { className: "uppy-DashboardContent-back", type: "button", onClick: () => uppy.cancelAll(), children: i18n("cancel") }) : u$1("div", {}), u$1("div", { className: "uppy-DashboardContent-title", children: u$1(UploadStatus, { ...props }) }), allowNewUpload ? u$1("button", { className: "uppy-DashboardContent-addMore", type: "button", "aria-label": i18n("addMoreFiles"), title: i18n("addMoreFiles"), onClick: () => toggleAddFilesPanel(true), children: [u$1("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "15", height: "15", viewBox: "0 0 15 15", children: u$1("path", { d: "M8 6.5h6a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V8h-6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h6v-6A.5.5 0 0 1 7 0h.5a.5.5 0 0 1 .5.5v6z" }) }), u$1("span", { className: "uppy-DashboardContent-addMoreCaption", children: i18n("addMore") })] }) : u$1("div", {})] });
}
const transitionName = "uppy-transition-slideDownUp";
const duration = 250;
function Slide({ children }) {
  const [cachedChildren, setCachedChildren] = d$1(null);
  const [className, setClassName] = d$1("");
  const enterTimeoutRef = A$1();
  const leaveTimeoutRef = A$1();
  const animationFrameRef = A$1();
  const handleEnterTransition = () => {
    setClassName(`${transitionName}-enter`);
    cancelAnimationFrame(animationFrameRef.current);
    clearTimeout(leaveTimeoutRef.current);
    leaveTimeoutRef.current = void 0;
    animationFrameRef.current = requestAnimationFrame(() => {
      setClassName(`${transitionName}-enter ${transitionName}-enter-active`);
      enterTimeoutRef.current = setTimeout(() => {
        setClassName("");
      }, duration);
    });
  };
  const handleLeaveTransition = () => {
    setClassName(`${transitionName}-leave`);
    cancelAnimationFrame(animationFrameRef.current);
    clearTimeout(enterTimeoutRef.current);
    enterTimeoutRef.current = void 0;
    animationFrameRef.current = requestAnimationFrame(() => {
      setClassName(`${transitionName}-leave ${transitionName}-leave-active`);
      leaveTimeoutRef.current = setTimeout(() => {
        setCachedChildren(null);
        setClassName("");
      }, duration);
    });
  };
  y$1(() => {
    const child = H$2(children)[0];
    if (cachedChildren === child)
      return;
    if (child && !cachedChildren) {
      handleEnterTransition();
    } else if (cachedChildren && !child && !leaveTimeoutRef.current) {
      handleLeaveTransition();
    }
    setCachedChildren(child);
  }, [children, cachedChildren]);
  y$1(() => {
    return () => {
      clearTimeout(enterTimeoutRef.current);
      clearTimeout(leaveTimeoutRef.current);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);
  if (!cachedChildren)
    return null;
  return K$2(cachedChildren, {
    className: classNames(className, cachedChildren.props.className)
  });
}
const WIDTH_XL = 900;
const WIDTH_LG = 700;
const WIDTH_MD = 576;
const HEIGHT_MD = 330;
function Dashboard$1(props) {
  const isNoFiles = props.totalFileCount === 0;
  const isSingleFile = props.totalFileCount === 1;
  const isSizeMD = props.containerWidth > WIDTH_MD;
  const isSizeHeightMD = props.containerHeight > HEIGHT_MD;
  const dashboardClassName = classNames({
    "uppy-Dashboard": true,
    "uppy-Dashboard--isDisabled": props.disabled,
    "uppy-Dashboard--animateOpenClose": props.animateOpenClose,
    "uppy-Dashboard--isClosing": props.isClosing,
    "uppy-Dashboard--isDraggingOver": props.isDraggingOver,
    "uppy-Dashboard--modal": !props.inline,
    "uppy-size--md": props.containerWidth > WIDTH_MD,
    "uppy-size--lg": props.containerWidth > WIDTH_LG,
    "uppy-size--xl": props.containerWidth > WIDTH_XL,
    "uppy-size--height-md": props.containerHeight > HEIGHT_MD,
    // We might want to enable this in the future
    // 'uppy-size--height-lg': props.containerHeight > HEIGHT_LG,
    // 'uppy-size--height-xl': props.containerHeight > HEIGHT_XL,
    "uppy-Dashboard--isAddFilesPanelVisible": props.showAddFilesPanel,
    "uppy-Dashboard--isInnerWrapVisible": props.areInsidesReadyToBeVisible,
    // Only enable “centered single file” mode when Dashboard is tall enough
    "uppy-Dashboard--singleFile": props.singleFileFullScreen && isSingleFile && isSizeHeightMD
  });
  let itemsPerRow = 1;
  if (props.containerWidth > WIDTH_XL) {
    itemsPerRow = 5;
  } else if (props.containerWidth > WIDTH_LG) {
    itemsPerRow = 4;
  } else if (props.containerWidth > WIDTH_MD) {
    itemsPerRow = 3;
  }
  const showFileList = props.showSelectedFiles && !isNoFiles;
  const numberOfFilesForRecovery = props.recoveredState ? Object.keys(props.recoveredState.files).length : null;
  const numberOfGhosts = props.files ? Object.keys(props.files).filter((fileID) => props.files[fileID].isGhost).length : 0;
  const renderRestoredText = () => {
    if (numberOfGhosts > 0) {
      return props.i18n("recoveredXFiles", {
        smart_count: numberOfGhosts
      });
    }
    return props.i18n("recoveredAllFiles");
  };
  const dashboard = (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: ...
    u$1("div", { className: dashboardClassName, "data-uppy-theme": props.theme, "data-uppy-num-acquirers": props.acquirers.length, "data-uppy-drag-drop-supported": !props.disableLocalFiles && isDragDropSupported(), "aria-hidden": props.inline ? "false" : props.isHidden, "aria-disabled": props.disabled, "aria-label": !props.inline ? props.i18n("dashboardWindowTitle") : props.i18n("dashboardTitle"), onPaste: props.handlePaste, onDragOver: props.handleDragOver, onDragLeave: props.handleDragLeave, onDrop: props.handleDrop, children: [u$1("div", { "aria-hidden": "true", className: "uppy-Dashboard-overlay", tabIndex: -1, onClick: props.handleClickOutside }), u$1("div", { className: "uppy-Dashboard-inner", role: props.inline ? void 0 : "dialog", style: {
      width: props.inline && props.width ? props.width : "",
      height: props.inline && props.height ? props.height : ""
    }, children: [!props.inline ? u$1("button", { className: "uppy-u-reset uppy-Dashboard-close", type: "button", "aria-label": props.i18n("closeModal"), title: props.i18n("closeModal"), onClick: props.closeModal, children: u$1("span", { "aria-hidden": "true", children: "×" }) }) : null, u$1("div", { className: "uppy-Dashboard-innerWrap", children: [u$1("div", { className: "uppy-Dashboard-dropFilesHereHint", children: props.i18n("dropHint") }), showFileList && u$1(PanelTopBar, { ...props }), numberOfFilesForRecovery && u$1("div", { className: "uppy-Dashboard-serviceMsg", children: [u$1("svg", { className: "uppy-Dashboard-serviceMsg-icon", "aria-hidden": "true", focusable: "false", width: "21", height: "16", viewBox: "0 0 24 19", children: u$1("g", { transform: "translate(0 -1)", fill: "none", fillRule: "evenodd", children: [u$1("path", { d: "M12.857 1.43l10.234 17.056A1 1 0 0122.234 20H1.766a1 1 0 01-.857-1.514L11.143 1.429a1 1 0 011.714 0z", fill: "#FFD300" }), u$1("path", { fill: "#000", d: "M11 6h2l-.3 8h-1.4z" }), u$1("circle", { fill: "#000", cx: "12", cy: "17", r: "1" })] }) }), u$1("strong", { className: "uppy-Dashboard-serviceMsg-title", children: props.i18n("sessionRestored") }), u$1("div", { className: "uppy-Dashboard-serviceMsg-text", children: renderRestoredText() })] }), showFileList ? u$1(FileList, { id: props.id, i18n: props.i18n, uppy: props.uppy, files: props.files, resumableUploads: props.resumableUploads, hideRetryButton: props.hideRetryButton, hidePauseResumeButton: props.hidePauseResumeButton, hideCancelButton: props.hideCancelButton, showLinkToFileUploadResult: props.showLinkToFileUploadResult, showRemoveButtonAfterComplete: props.showRemoveButtonAfterComplete, metaFields: props.metaFields, toggleFileCard: props.toggleFileCard, handleRequestThumbnail: props.handleRequestThumbnail, handleCancelThumbnail: props.handleCancelThumbnail, recoveredState: props.recoveredState, individualCancellation: props.individualCancellation, openFileEditor: props.openFileEditor, canEditFile: props.canEditFile, toggleAddFilesPanel: props.toggleAddFilesPanel, isSingleFile, itemsPerRow, containerWidth: props.containerWidth, containerHeight: props.containerHeight }) : u$1(AddFiles, { i18n: props.i18n, i18nArray: props.i18nArray, acquirers: props.acquirers, handleInputChange: props.handleInputChange, maxNumberOfFiles: props.maxNumberOfFiles, allowedFileTypes: props.allowedFileTypes, showNativePhotoCameraButton: props.showNativePhotoCameraButton, showNativeVideoCameraButton: props.showNativeVideoCameraButton, nativeCameraFacingMode: props.nativeCameraFacingMode, showPanel: props.showPanel, activePickerPanel: props.activePickerPanel, disableLocalFiles: props.disableLocalFiles, fileManagerSelectionType: props.fileManagerSelectionType, note: props.note, proudlyDisplayPoweredByUppy: props.proudlyDisplayPoweredByUppy }), u$1(Slide, { children: props.showAddFilesPanel ? u$1(AddFilesPanel, { ...props, isSizeMD }, "AddFiles") : null }), u$1(Slide, { children: props.fileCardFor ? u$1(FileCard, { ...props }, "FileCard") : null }), u$1(Slide, { children: props.activePickerPanel ? u$1(PickerPanelContent, { ...props }, "Picker") : null }), u$1(Slide, { children: props.showFileEditor ? u$1(EditorPanel, { ...props }, "Editor") : null }), u$1("div", { className: "uppy-Dashboard-progressindicators", children: props.progressindicators.map((target) => {
      return props.uppy.getPlugin(target.id).render(props.state);
    }) })] })] })] })
  );
  return dashboard;
}
const locale$1 = {
  strings: {
    // When `inline: false`, used as the screen reader label for the button that closes the modal.
    closeModal: "Close Modal",
    // Used as the screen reader label for the plus (+) button that shows the “Add more files” screen
    addMoreFiles: "Add more files",
    addingMoreFiles: "Adding more files",
    // Used as the header for import panels, e.g., “Import from Google Drive”.
    importFrom: "Import from %{name}",
    // When `inline: false`, used as the screen reader label for the dashboard modal.
    dashboardWindowTitle: "Uppy Dashboard Window (Press escape to close)",
    // When `inline: true`, used as the screen reader label for the dashboard area.
    dashboardTitle: "Uppy Dashboard",
    // Shown in the Informer when a link to a file was copied to the clipboard.
    copyLinkToClipboardSuccess: "Link copied to clipboard.",
    // Used when a link cannot be copied automatically — the user has to select the text from the
    // input element below this string.
    copyLinkToClipboardFallback: "Copy the URL below",
    // Used as the hover title and screen reader label for buttons that copy a file link.
    copyLink: "Copy link",
    back: "Back",
    // Used as the screen reader label for buttons that remove a file.
    removeFile: "Remove file",
    // Used as the screen reader label for buttons that open the metadata editor panel for a file.
    editFile: "Edit file",
    editImage: "Edit image",
    // Shown in the panel header for the metadata editor. Rendered as “Editing image.png”.
    editing: "Editing %{file}",
    // Shown on the main upload screen when an upload error occurs
    error: "Error",
    // Used as the screen reader label for the button that saves metadata edits and returns to the
    // file list view.
    finishEditingFile: "Finish editing file",
    saveChanges: "Save changes",
    // Used as the label for the tab button that opens the system file selection dialog.
    myDevice: "My Device",
    dropHint: "Drop your files here",
    // Used as the hover text and screen reader label for file progress indicators when
    // they have been fully uploaded.
    uploadComplete: "Upload complete",
    uploadPaused: "Upload paused",
    // Used as the hover text and screen reader label for the buttons to resume paused uploads.
    resumeUpload: "Resume upload",
    // Used as the hover text and screen reader label for the buttons to pause uploads.
    pauseUpload: "Pause upload",
    // Used as the hover text and screen reader label for the buttons to retry failed uploads.
    retryUpload: "Retry upload",
    // Used as the hover text and screen reader label for the buttons to cancel uploads.
    cancelUpload: "Cancel upload",
    // Used in a title, how many files are currently selected
    xFilesSelected: {
      0: "%{smart_count} file selected",
      1: "%{smart_count} files selected"
    },
    uploadingXFiles: {
      0: "Uploading %{smart_count} file",
      1: "Uploading %{smart_count} files"
    },
    processingXFiles: {
      0: "Processing %{smart_count} file",
      1: "Processing %{smart_count} files"
    },
    // The "powered by Uppy" link at the bottom of the Dashboard.
    poweredBy: "Powered by %{uppy}",
    addMore: "Add more",
    editFileWithFilename: "Edit file %{file}",
    save: "Save",
    cancel: "Cancel",
    dropPasteFiles: "Drop files here or %{browseFiles}",
    dropPasteFolders: "Drop files here or %{browseFolders}",
    dropPasteBoth: "Drop files here, %{browseFiles} or %{browseFolders}",
    dropPasteImportFiles: "Drop files here, %{browseFiles} or import from:",
    dropPasteImportFolders: "Drop files here, %{browseFolders} or import from:",
    dropPasteImportBoth: "Drop files here, %{browseFiles}, %{browseFolders} or import from:",
    importFiles: "Import files from:",
    browseFiles: "browse files",
    browseFolders: "browse folders",
    recoveredXFiles: {
      0: "We could not fully recover 1 file. Please re-select it and resume the upload.",
      1: "We could not fully recover %{smart_count} files. Please re-select them and resume the upload."
    },
    recoveredAllFiles: "We restored all files. You can now resume the upload.",
    sessionRestored: "Session restored",
    reSelect: "Re-select",
    missingRequiredMetaFields: {
      0: "Missing required meta field: %{fields}.",
      1: "Missing required meta fields: %{fields}."
    },
    // Used for native device camera buttons on mobile
    takePictureBtn: "Take Picture",
    recordVideoBtn: "Record Video"
  }
};
const FOCUSABLE_ELEMENTS = [
  'a[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])',
  'area[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])',
  "input:not([disabled]):not([inert]):not([aria-hidden])",
  "select:not([disabled]):not([inert]):not([aria-hidden])",
  "textarea:not([disabled]):not([inert]):not([aria-hidden])",
  "button:not([disabled]):not([inert]):not([aria-hidden])",
  'iframe:not([tabindex^="-"]):not([inert]):not([aria-hidden])',
  'object:not([tabindex^="-"]):not([inert]):not([aria-hidden])',
  'embed:not([tabindex^="-"]):not([inert]):not([aria-hidden])',
  '[contenteditable]:not([tabindex^="-"]):not([inert]):not([aria-hidden])',
  '[tabindex]:not([tabindex^="-"]):not([inert]):not([aria-hidden])'
];
function getActiveOverlayEl(dashboardEl, activeOverlayType) {
  if (activeOverlayType) {
    const overlayEl = dashboardEl.querySelector(`[data-uppy-paneltype="${activeOverlayType}"]`);
    if (overlayEl)
      return overlayEl;
  }
  return dashboardEl;
}
function createSuperFocus() {
  let lastFocusWasOnSuperFocusableEl = false;
  const superFocus = (dashboardEl, activeOverlayType) => {
    const overlayEl = getActiveOverlayEl(dashboardEl, activeOverlayType);
    const isFocusInOverlay2 = overlayEl.contains(document.activeElement);
    if (isFocusInOverlay2 && lastFocusWasOnSuperFocusableEl)
      return;
    const superFocusableEl = overlayEl.querySelector("[data-uppy-super-focusable]");
    if (isFocusInOverlay2 && !superFocusableEl)
      return;
    if (superFocusableEl) {
      superFocusableEl.focus({ preventScroll: true });
      lastFocusWasOnSuperFocusableEl = true;
    } else {
      const firstEl = overlayEl.querySelector(FOCUSABLE_ELEMENTS);
      firstEl?.focus({ preventScroll: true });
      lastFocusWasOnSuperFocusableEl = false;
    }
  };
  return debounce$2(superFocus, 260);
}
function focusOnFirstNode(event, nodes) {
  const node = nodes[0];
  if (node) {
    node.focus();
    event.preventDefault();
  }
}
function focusOnLastNode(event, nodes) {
  const node = nodes[nodes.length - 1];
  if (node) {
    node.focus();
    event.preventDefault();
  }
}
function isFocusInOverlay(activeOverlayEl) {
  return activeOverlayEl.contains(document.activeElement);
}
function trapFocus(event, activeOverlayType, dashboardEl) {
  const activeOverlayEl = getActiveOverlayEl(dashboardEl, activeOverlayType);
  const focusableNodes = toArray(activeOverlayEl.querySelectorAll(FOCUSABLE_ELEMENTS));
  const focusedItemIndex = focusableNodes.indexOf(document.activeElement);
  if (!isFocusInOverlay(activeOverlayEl)) {
    focusOnFirstNode(event, focusableNodes);
  } else if (event.shiftKey && focusedItemIndex === 0) {
    focusOnLastNode(event, focusableNodes);
  } else if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
    focusOnFirstNode(event, focusableNodes);
  }
}
function forInline(event, activeOverlayType, dashboardEl) {
  if (activeOverlayType === null) ;
  else {
    trapFocus(event, activeOverlayType, dashboardEl);
  }
}
const TAB_KEY = 9;
const ESC_KEY = 27;
function createPromise() {
  const o2 = {};
  o2.promise = new Promise((resolve, reject) => {
    o2.resolve = resolve;
    o2.reject = reject;
  });
  return o2;
}
const defaultOptions$3 = {
  target: "body",
  metaFields: [],
  thumbnailWidth: 280,
  thumbnailType: "image/jpeg",
  waitForThumbnailsBeforeUpload: false,
  defaultPickerIcon,
  showLinkToFileUploadResult: false,
  showProgressDetails: false,
  hideUploadButton: false,
  hideCancelButton: false,
  hideRetryButton: false,
  hidePauseResumeButton: false,
  hideProgressAfterFinish: false,
  note: null,
  singleFileFullScreen: true,
  disableStatusBar: false,
  disableInformer: false,
  disableThumbnailGenerator: false,
  fileManagerSelectionType: "files",
  proudlyDisplayPoweredByUppy: true,
  showSelectedFiles: true,
  showRemoveButtonAfterComplete: false,
  showNativePhotoCameraButton: false,
  showNativeVideoCameraButton: false,
  theme: "light",
  autoOpen: null,
  disabled: false,
  disableLocalFiles: false,
  nativeCameraFacingMode: "",
  onDragLeave: () => {
  },
  onDragOver: () => {
  },
  onDrop: () => {
  },
  plugins: [],
  // Dynamic default options, they have to be defined in the constructor (because
  // they require access to the `this` keyword), but we still want them to
  // appear in the default options so TS knows they'll be defined.
  doneButtonHandler: void 0,
  onRequestCloseModal: null,
  // defaultModalOptions
  inline: false,
  animateOpenClose: true,
  browserBackButtonClose: false,
  closeAfterFinish: false,
  closeModalOnClickOutside: false,
  disablePageScrollWhenModalOpen: true,
  trigger: null,
  // defaultInlineOptions
  width: 750,
  height: 550
};
class Dashboard extends UIPlugin {
  static VERSION = packageJson$3.version;
  #disabledNodes;
  modalName = `uppy-Dashboard-${nanoid()}`;
  superFocus = createSuperFocus();
  ifFocusedOnUppyRecently = false;
  dashboardIsDisabled;
  savedScrollPosition;
  savedActiveElement;
  resizeObserver;
  darkModeMediaQuery;
  // Timeouts
  makeDashboardInsidesVisibleAnywayTimeout;
  constructor(uppy, opts) {
    const autoOpen = opts?.autoOpen ?? null;
    super(uppy, { ...defaultOptions$3, ...opts, autoOpen });
    this.id = this.opts.id || "Dashboard";
    this.title = "Dashboard";
    this.type = "orchestrator";
    this.defaultLocale = locale$1;
    if (this.opts.doneButtonHandler === void 0) {
      this.opts.doneButtonHandler = () => {
        this.uppy.clear();
        this.requestCloseModal();
      };
    }
    this.opts.onRequestCloseModal ??= () => this.closeModal();
    this.i18nInit();
  }
  removeTarget = (plugin) => {
    const pluginState = this.getPluginState();
    const newTargets = pluginState.targets.filter((target) => target.id !== plugin.id);
    this.setPluginState({
      targets: newTargets
    });
  };
  addTarget = (plugin) => {
    const callerPluginId = plugin.id || plugin.constructor.name;
    const callerPluginName = plugin.title || callerPluginId;
    const callerPluginType = plugin.type;
    if (callerPluginType !== "acquirer" && callerPluginType !== "progressindicator" && callerPluginType !== "editor") {
      const msg = "Dashboard: can only be targeted by plugins of types: acquirer, progressindicator, editor";
      this.uppy.log(msg, "error");
      return null;
    }
    const target = {
      id: callerPluginId,
      name: callerPluginName,
      type: callerPluginType
    };
    const state = this.getPluginState();
    const newTargets = state.targets.slice();
    newTargets.push(target);
    this.setPluginState({
      targets: newTargets
    });
    return this.el;
  };
  hideAllPanels = () => {
    const state = this.getPluginState();
    const update = {
      activePickerPanel: void 0,
      showAddFilesPanel: false,
      activeOverlayType: null,
      fileCardFor: null,
      showFileEditor: false
    };
    if (state.activePickerPanel === update.activePickerPanel && state.showAddFilesPanel === update.showAddFilesPanel && state.showFileEditor === update.showFileEditor && state.activeOverlayType === update.activeOverlayType) {
      return;
    }
    this.setPluginState(update);
    this.uppy.emit("dashboard:close-panel", state.activePickerPanel?.id);
  };
  showPanel = (id) => {
    const { targets } = this.getPluginState();
    const activePickerPanel = targets.find((target) => {
      return target.type === "acquirer" && target.id === id;
    });
    this.setPluginState({
      activePickerPanel,
      activeOverlayType: "PickerPanel"
    });
    this.uppy.emit("dashboard:show-panel", id);
  };
  canEditFile = (file) => {
    const { targets } = this.getPluginState();
    const editors = this.#getEditors(targets);
    return editors.some((target) => this.uppy.getPlugin(target.id).canEditFile(file));
  };
  openFileEditor = (file) => {
    const { targets } = this.getPluginState();
    const editors = this.#getEditors(targets);
    this.setPluginState({
      showFileEditor: true,
      fileCardFor: file.id || null,
      activeOverlayType: "FileEditor"
    });
    editors.forEach((editor) => {
      this.uppy.getPlugin(editor.id).selectFile(file);
    });
  };
  closeFileEditor = () => {
    const { metaFields } = this.getPluginState();
    const isMetaEditorEnabled = metaFields && metaFields.length > 0;
    if (isMetaEditorEnabled) {
      this.setPluginState({
        showFileEditor: false,
        activeOverlayType: "FileCard"
      });
    } else {
      this.setPluginState({
        showFileEditor: false,
        fileCardFor: null,
        activeOverlayType: "AddFiles"
      });
    }
  };
  saveFileEditor = () => {
    const { targets } = this.getPluginState();
    const editors = this.#getEditors(targets);
    editors.forEach((editor) => {
      this.uppy.getPlugin(editor.id).save();
    });
    this.closeFileEditor();
  };
  openModal = () => {
    const { promise, resolve } = createPromise();
    this.savedScrollPosition = window.pageYOffset;
    this.savedActiveElement = document.activeElement;
    if (this.opts.disablePageScrollWhenModalOpen) {
      document.body.classList.add("uppy-Dashboard-isFixed");
    }
    if (this.opts.animateOpenClose && this.getPluginState().isClosing) {
      const handler = () => {
        this.setPluginState({
          isHidden: false
        });
        this.el.removeEventListener("animationend", handler, false);
        resolve();
      };
      this.el.addEventListener("animationend", handler, false);
    } else {
      this.setPluginState({
        isHidden: false
      });
      resolve();
    }
    if (this.opts.browserBackButtonClose) {
      this.updateBrowserHistory();
    }
    document.addEventListener("keydown", this.handleKeyDownInModal);
    this.uppy.emit("dashboard:modal-open");
    return promise;
  };
  closeModal = (opts) => {
    const manualClose = opts?.manualClose ?? true;
    const { isHidden, isClosing } = this.getPluginState();
    if (isHidden || isClosing) {
      return void 0;
    }
    const { promise, resolve } = createPromise();
    if (this.opts.disablePageScrollWhenModalOpen) {
      document.body.classList.remove("uppy-Dashboard-isFixed");
    }
    if (this.opts.animateOpenClose) {
      this.setPluginState({
        isClosing: true
      });
      const handler = () => {
        this.setPluginState({
          isHidden: true,
          isClosing: false
        });
        this.superFocus.cancel();
        this.savedActiveElement.focus();
        this.el.removeEventListener("animationend", handler, false);
        resolve();
      };
      this.el.addEventListener("animationend", handler, false);
    } else {
      this.setPluginState({
        isHidden: true
      });
      this.superFocus.cancel();
      this.savedActiveElement.focus();
      resolve();
    }
    document.removeEventListener("keydown", this.handleKeyDownInModal);
    if (manualClose) {
      if (this.opts.browserBackButtonClose) {
        if (history.state?.[this.modalName]) {
          history.back();
        }
      }
    }
    this.uppy.emit("dashboard:modal-closed");
    return promise;
  };
  isModalOpen = () => {
    return !this.getPluginState().isHidden || false;
  };
  requestCloseModal = () => {
    if (this.opts.onRequestCloseModal) {
      return this.opts.onRequestCloseModal();
    }
    return this.closeModal();
  };
  setDarkModeCapability = (isDarkModeOn) => {
    const { capabilities } = this.uppy.getState();
    this.uppy.setState({
      capabilities: {
        ...capabilities,
        darkMode: isDarkModeOn
      }
    });
  };
  handleSystemDarkModeChange = (event) => {
    const isDarkModeOnNow = event.matches;
    this.uppy.log(`[Dashboard] Dark mode is ${isDarkModeOnNow ? "on" : "off"}`);
    this.setDarkModeCapability(isDarkModeOnNow);
  };
  toggleFileCard = (show, fileID) => {
    const file = this.uppy.getFile(fileID);
    if (show) {
      this.uppy.emit("dashboard:file-edit-start", file);
    } else {
      this.uppy.emit("dashboard:file-edit-complete", file);
    }
    this.setPluginState({
      fileCardFor: show ? fileID : null,
      activeOverlayType: show ? "FileCard" : null
    });
  };
  toggleAddFilesPanel = (show) => {
    this.setPluginState({
      showAddFilesPanel: show,
      activeOverlayType: show ? "AddFiles" : null
    });
  };
  addFiles = (files) => {
    const descriptors = files.map((file) => ({
      source: this.id,
      name: file.name,
      type: file.type,
      data: file,
      meta: {
        // path of the file relative to the ancestor directory the user selected.
        // e.g. 'docs/Old Prague/airbnb.pdf'
        relativePath: file.relativePath || file.webkitRelativePath || null
      }
    }));
    try {
      this.uppy.addFiles(descriptors);
    } catch (err) {
      this.uppy.log(err);
    }
  };
  // ___Why make insides of Dashboard invisible until first ResizeObserver event is emitted?
  //    ResizeOberserver doesn't emit the first resize event fast enough, users can see the jump from one .uppy-size-- to
  //    another (e.g. in Safari)
  // ___Why not apply visibility property to .uppy-Dashboard-inner?
  //    Because ideally, acc to specs, ResizeObserver should see invisible elements as of width 0. So even though applying
  //    invisibility to .uppy-Dashboard-inner works now, it may not work in the future.
  startListeningToResize = () => {
    this.resizeObserver = new ResizeObserver((entries) => {
      const uppyDashboardInnerEl = entries[0];
      const { width, height } = uppyDashboardInnerEl.contentRect;
      this.setPluginState({
        containerWidth: width,
        containerHeight: height,
        areInsidesReadyToBeVisible: true
      });
    });
    this.resizeObserver.observe(this.el.querySelector(".uppy-Dashboard-inner"));
    this.makeDashboardInsidesVisibleAnywayTimeout = setTimeout(() => {
      const pluginState = this.getPluginState();
      const isModalAndClosed = !this.opts.inline && pluginState.isHidden;
      if (
        // We might want to enable this in the future
        // if ResizeObserver hasn't yet fired,
        !pluginState.areInsidesReadyToBeVisible && // and it's not due to the modal being closed
        !isModalAndClosed
      ) {
        this.uppy.log("[Dashboard] resize event didn’t fire on time: defaulted to mobile layout", "warning");
        this.setPluginState({
          areInsidesReadyToBeVisible: true
        });
      }
    }, 1e3);
  };
  stopListeningToResize = () => {
    this.resizeObserver.disconnect();
    clearTimeout(this.makeDashboardInsidesVisibleAnywayTimeout);
  };
  // Records whether we have been interacting with uppy right now,
  // which is then used to determine whether state updates should trigger a refocusing.
  recordIfFocusedOnUppyRecently = (event) => {
    if (this.el.contains(event.target)) {
      this.ifFocusedOnUppyRecently = true;
    } else {
      this.ifFocusedOnUppyRecently = false;
      this.superFocus.cancel();
    }
  };
  disableInteractiveElements = (disable) => {
    const NODES_TO_DISABLE = [
      "a[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      '[role="button"]:not([disabled])'
    ];
    const nodesToDisable = this.#disabledNodes ?? toArray(this.el.querySelectorAll(NODES_TO_DISABLE)).filter((node) => !node.classList.contains("uppy-Dashboard-close"));
    for (const node of nodesToDisable) {
      if (node.tagName === "A") {
        node.setAttribute("aria-disabled", disable);
      } else {
        node.disabled = disable;
      }
    }
    if (disable) {
      this.#disabledNodes = nodesToDisable;
    } else {
      this.#disabledNodes = null;
    }
    this.dashboardIsDisabled = disable;
  };
  updateBrowserHistory = () => {
    if (!history.state?.[this.modalName]) {
      history.pushState({
        ...history.state,
        [this.modalName]: true
      }, "");
    }
    window.addEventListener("popstate", this.handlePopState, false);
  };
  handlePopState = (event) => {
    if (this.isModalOpen() && (!event.state || !event.state[this.modalName])) {
      this.closeModal({ manualClose: false });
    }
    if (!this.isModalOpen() && event.state?.[this.modalName]) {
      history.back();
    }
  };
  handleKeyDownInModal = (event) => {
    if (event.keyCode === ESC_KEY)
      this.requestCloseModal();
    if (event.keyCode === TAB_KEY)
      trapFocus(event, this.getPluginState().activeOverlayType, this.el);
  };
  handleClickOutside = () => {
    if (this.opts.closeModalOnClickOutside)
      this.requestCloseModal();
  };
  handlePaste = (event) => {
    this.uppy.iteratePlugins((plugin) => {
      if (plugin.type === "acquirer") {
        plugin.handleRootPaste?.(event);
      }
    });
    const files = toArray(event.clipboardData.files);
    if (files.length > 0) {
      this.uppy.log("[Dashboard] Files pasted");
      this.addFiles(files);
    }
  };
  handleInputChange = (event) => {
    event.preventDefault();
    const files = toArray(event.currentTarget.files || []);
    if (files.length > 0) {
      this.uppy.log("[Dashboard] Files selected through input");
      this.addFiles(files);
    }
  };
  handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const canSomePluginHandleRootDrop = () => {
      let somePluginCanHandleRootDrop2 = true;
      this.uppy.iteratePlugins((plugin) => {
        if (plugin.canHandleRootDrop?.(event)) {
          somePluginCanHandleRootDrop2 = true;
        }
      });
      return somePluginCanHandleRootDrop2;
    };
    const doesEventHaveFiles = () => {
      const { types } = event.dataTransfer;
      return types.some((type) => type === "Files");
    };
    const somePluginCanHandleRootDrop = canSomePluginHandleRootDrop();
    const hasFiles = doesEventHaveFiles();
    if (!somePluginCanHandleRootDrop && !hasFiles || this.opts.disabled || // opts.disableLocalFiles should only be taken into account if no plugins
    // can handle the datatransfer
    this.opts.disableLocalFiles && (hasFiles || !somePluginCanHandleRootDrop) || !this.uppy.getState().allowNewUpload) {
      event.dataTransfer.dropEffect = "none";
      return;
    }
    event.dataTransfer.dropEffect = "copy";
    this.setPluginState({ isDraggingOver: true });
    this.opts.onDragOver(event);
  };
  handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setPluginState({ isDraggingOver: false });
    this.opts.onDragLeave(event);
  };
  handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setPluginState({ isDraggingOver: false });
    this.uppy.iteratePlugins((plugin) => {
      if (plugin.type === "acquirer") {
        plugin.handleRootDrop?.(event);
      }
    });
    let executedDropErrorOnce = false;
    const logDropError = (error) => {
      this.uppy.log(error, "error");
      if (!executedDropErrorOnce) {
        this.uppy.info(error.message, "error");
        executedDropErrorOnce = true;
      }
    };
    this.uppy.log("[Dashboard] Processing dropped files");
    const files = await getDroppedFiles(event.dataTransfer, { logDropError });
    if (files.length > 0) {
      this.uppy.log("[Dashboard] Files dropped");
      this.addFiles(files);
    }
    this.opts.onDrop(event);
  };
  handleRequestThumbnail = (file) => {
    if (!this.opts.waitForThumbnailsBeforeUpload) {
      this.uppy.emit("thumbnail:request", file);
    }
  };
  /**
   * We cancel thumbnail requests when a file item component unmounts to avoid
   * clogging up the queue when the user scrolls past many elements.
   */
  handleCancelThumbnail = (file) => {
    if (!this.opts.waitForThumbnailsBeforeUpload) {
      this.uppy.emit("thumbnail:cancel", file);
    }
  };
  handleKeyDownInInline = (event) => {
    if (event.keyCode === TAB_KEY)
      forInline(event, this.getPluginState().activeOverlayType, this.el);
  };
  // ___Why do we listen to the 'paste' event on a document instead of onPaste={props.handlePaste} prop,
  //    or this.el.addEventListener('paste')?
  //    Because (at least) Chrome doesn't handle paste if focus is on some button, e.g. 'My Device'.
  //    => Therefore, the best option is to listen to all 'paste' events, and only react to them when we are focused on our
  //       particular Uppy instance.
  // ___Why do we still need onPaste={props.handlePaste} for the DashboardUi?
  //    Because if we click on the 'Drop files here' caption e.g., `document.activeElement` will be 'body'. Which means our
  //    standard determination of whether we're pasting into our Uppy instance won't work.
  //    => Therefore, we need a traditional onPaste={props.handlePaste} handler too.
  handlePasteOnBody = (event) => {
    const isFocusInOverlay2 = this.el.contains(document.activeElement);
    if (isFocusInOverlay2) {
      this.handlePaste(event);
    }
  };
  handleComplete = ({ failed }) => {
    if (this.opts.closeAfterFinish && !failed?.length) {
      this.requestCloseModal();
    }
  };
  handleCancelRestore = () => {
    this.uppy.emit("restore-canceled");
  };
  #generateLargeThumbnailIfSingleFile = () => {
    if (this.opts.disableThumbnailGenerator) {
      return;
    }
    const LARGE_THUMBNAIL = 600;
    const files = this.uppy.getFiles();
    if (files.length === 1) {
      const thumbnailGenerator = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
      thumbnailGenerator?.setOptions({ thumbnailWidth: LARGE_THUMBNAIL });
      const fileForThumbnail = { ...files[0], preview: void 0 };
      thumbnailGenerator?.requestThumbnail(fileForThumbnail).then(() => {
        thumbnailGenerator?.setOptions({
          thumbnailWidth: this.opts.thumbnailWidth
        });
      });
    }
  };
  #openFileEditorWhenFilesAdded = (files) => {
    const firstFile = files[0];
    const { metaFields } = this.getPluginState();
    const isMetaEditorEnabled = metaFields && metaFields.length > 0;
    const isImageEditorEnabled = this.canEditFile(firstFile);
    if (isMetaEditorEnabled && this.opts.autoOpen === "metaEditor") {
      this.toggleFileCard(true, firstFile.id);
    } else if (isImageEditorEnabled && this.opts.autoOpen === "imageEditor") {
      this.openFileEditor(firstFile);
    }
  };
  initEvents = () => {
    if (this.opts.trigger && !this.opts.inline) {
      const showModalTrigger = findAllDOMElements(this.opts.trigger);
      if (showModalTrigger) {
        showModalTrigger.forEach((trigger) => trigger.addEventListener("click", this.openModal));
      } else {
        this.uppy.log("Dashboard modal trigger not found. Make sure `trigger` is set in Dashboard options, unless you are planning to call `dashboard.openModal()` method yourself", "warning");
      }
    }
    this.startListeningToResize();
    document.addEventListener("paste", this.handlePasteOnBody);
    this.uppy.on("plugin-added", this.#addSupportedPluginIfNoTarget);
    this.uppy.on("plugin-remove", this.removeTarget);
    this.uppy.on("file-added", this.hideAllPanels);
    this.uppy.on("dashboard:modal-closed", this.hideAllPanels);
    this.uppy.on("complete", this.handleComplete);
    this.uppy.on("files-added", this.#generateLargeThumbnailIfSingleFile);
    this.uppy.on("file-removed", this.#generateLargeThumbnailIfSingleFile);
    document.addEventListener("focus", this.recordIfFocusedOnUppyRecently, true);
    document.addEventListener("click", this.recordIfFocusedOnUppyRecently, true);
    if (this.opts.inline) {
      this.el.addEventListener("keydown", this.handleKeyDownInInline);
    }
    if (this.opts.autoOpen) {
      this.uppy.on("files-added", this.#openFileEditorWhenFilesAdded);
    }
  };
  removeEvents = () => {
    const showModalTrigger = findAllDOMElements(this.opts.trigger);
    if (!this.opts.inline && showModalTrigger) {
      showModalTrigger.forEach((trigger) => trigger.removeEventListener("click", this.openModal));
    }
    this.stopListeningToResize();
    document.removeEventListener("paste", this.handlePasteOnBody);
    window.removeEventListener("popstate", this.handlePopState, false);
    this.uppy.off("plugin-added", this.#addSupportedPluginIfNoTarget);
    this.uppy.off("plugin-remove", this.removeTarget);
    this.uppy.off("file-added", this.hideAllPanels);
    this.uppy.off("dashboard:modal-closed", this.hideAllPanels);
    this.uppy.off("complete", this.handleComplete);
    this.uppy.off("files-added", this.#generateLargeThumbnailIfSingleFile);
    this.uppy.off("file-removed", this.#generateLargeThumbnailIfSingleFile);
    document.removeEventListener("focus", this.recordIfFocusedOnUppyRecently);
    document.removeEventListener("click", this.recordIfFocusedOnUppyRecently);
    if (this.opts.inline) {
      this.el.removeEventListener("keydown", this.handleKeyDownInInline);
    }
    if (this.opts.autoOpen) {
      this.uppy.off("files-added", this.#openFileEditorWhenFilesAdded);
    }
  };
  superFocusOnEachUpdate = () => {
    const isFocusInUppy = this.el.contains(document.activeElement);
    const isFocusNowhere = document.activeElement === document.body || document.activeElement === null;
    const isInformerHidden = this.uppy.getState().info.length === 0;
    const isModal = !this.opts.inline;
    if (
      // If update is connected to showing the Informer - let the screen reader calmly read it.
      isInformerHidden && // If we are in a modal - always superfocus without concern for other elements
      // on the page (user is unlikely to want to interact with the rest of the page)
      (isModal || // If we are already inside of Uppy, or
      isFocusInUppy || // If we are not focused on anything BUT we have already, at least once, focused on uppy
      //   1. We focus when isFocusNowhere, because when the element we were focused
      //      on disappears (e.g. an overlay), - focus gets lost. If user is typing
      //      something somewhere else on the page, - focus won't be 'nowhere'.
      //   2. We only focus when focus is nowhere AND this.ifFocusedOnUppyRecently,
      //      to avoid focus jumps if we do something else on the page.
      //   [Practical check] Without '&& this.ifFocusedOnUppyRecently', in Safari, in inline mode,
      //                     when file is uploading, - navigate via tab to the checkbox,
      //                     try to press space multiple times. Focus will jump to Uppy.
      isFocusNowhere && this.ifFocusedOnUppyRecently)
    ) {
      this.superFocus(this.el, this.getPluginState().activeOverlayType);
    } else {
      this.superFocus.cancel();
    }
  };
  afterUpdate = () => {
    if (this.opts.disabled && !this.dashboardIsDisabled) {
      this.disableInteractiveElements(true);
      return;
    }
    if (!this.opts.disabled && this.dashboardIsDisabled) {
      this.disableInteractiveElements(false);
    }
    this.superFocusOnEachUpdate();
  };
  saveFileCard = (meta, fileID) => {
    this.uppy.setFileMeta(fileID, meta);
    this.toggleFileCard(false, fileID);
  };
  #attachRenderFunctionToTarget = (target) => {
    const plugin = this.uppy.getPlugin(target.id);
    return {
      ...target,
      icon: plugin.icon || this.opts.defaultPickerIcon,
      render: plugin.render
    };
  };
  #isTargetSupported = (target) => {
    const plugin = this.uppy.getPlugin(target.id);
    if (typeof plugin.isSupported !== "function") {
      return true;
    }
    return plugin.isSupported();
  };
  #getAcquirers = (targets) => {
    return targets.filter((target) => target.type === "acquirer" && this.#isTargetSupported(target)).map(this.#attachRenderFunctionToTarget);
  };
  #getProgressIndicators = (targets) => {
    return targets.filter((target) => target.type === "progressindicator").map(this.#attachRenderFunctionToTarget);
  };
  #getEditors = (targets) => {
    return targets.filter((target) => target.type === "editor").map(this.#attachRenderFunctionToTarget);
  };
  render = (state) => {
    const pluginState = this.getPluginState();
    const { files, capabilities, allowNewUpload } = state;
    const { newFiles, uploadStartedFiles, completeFiles, erroredFiles, inProgressFiles, inProgressNotPausedFiles, processingFiles, isUploadStarted, isAllComplete, isAllPaused } = this.uppy.getObjectOfFilesPerState();
    const acquirers = this.#getAcquirers(pluginState.targets);
    const progressindicators = this.#getProgressIndicators(pluginState.targets);
    const editors = this.#getEditors(pluginState.targets);
    let theme;
    if (this.opts.theme === "auto") {
      theme = capabilities.darkMode ? "dark" : "light";
    } else {
      theme = this.opts.theme;
    }
    if (["files", "folders", "both"].indexOf(this.opts.fileManagerSelectionType) < 0) {
      this.opts.fileManagerSelectionType = "files";
      console.warn(`Unsupported option for "fileManagerSelectionType". Using default of "${this.opts.fileManagerSelectionType}".`);
    }
    return Dashboard$1({
      state,
      isHidden: pluginState.isHidden,
      files,
      newFiles,
      uploadStartedFiles,
      completeFiles,
      erroredFiles,
      inProgressFiles,
      inProgressNotPausedFiles,
      processingFiles,
      isUploadStarted,
      isAllComplete,
      isAllPaused,
      totalFileCount: Object.keys(files).length,
      totalProgress: state.totalProgress,
      allowNewUpload,
      acquirers,
      theme,
      disabled: this.opts.disabled,
      disableLocalFiles: this.opts.disableLocalFiles,
      direction: this.opts.direction,
      activePickerPanel: pluginState.activePickerPanel,
      showFileEditor: pluginState.showFileEditor,
      saveFileEditor: this.saveFileEditor,
      closeFileEditor: this.closeFileEditor,
      disableInteractiveElements: this.disableInteractiveElements,
      animateOpenClose: this.opts.animateOpenClose,
      isClosing: pluginState.isClosing,
      progressindicators,
      editors,
      autoProceed: this.uppy.opts.autoProceed,
      id: this.id,
      closeModal: this.requestCloseModal,
      handleClickOutside: this.handleClickOutside,
      handleInputChange: this.handleInputChange,
      handlePaste: this.handlePaste,
      inline: this.opts.inline,
      showPanel: this.showPanel,
      hideAllPanels: this.hideAllPanels,
      i18n: this.i18n,
      i18nArray: this.i18nArray,
      uppy: this.uppy,
      note: this.opts.note,
      recoveredState: state.recoveredState,
      metaFields: pluginState.metaFields,
      resumableUploads: capabilities.resumableUploads || false,
      individualCancellation: capabilities.individualCancellation,
      isMobileDevice: capabilities.isMobileDevice,
      fileCardFor: pluginState.fileCardFor,
      toggleFileCard: this.toggleFileCard,
      toggleAddFilesPanel: this.toggleAddFilesPanel,
      showAddFilesPanel: pluginState.showAddFilesPanel,
      saveFileCard: this.saveFileCard,
      openFileEditor: this.openFileEditor,
      canEditFile: this.canEditFile,
      width: this.opts.width,
      height: this.opts.height,
      showLinkToFileUploadResult: this.opts.showLinkToFileUploadResult,
      fileManagerSelectionType: this.opts.fileManagerSelectionType,
      proudlyDisplayPoweredByUppy: this.opts.proudlyDisplayPoweredByUppy,
      hideCancelButton: this.opts.hideCancelButton,
      hideRetryButton: this.opts.hideRetryButton,
      hidePauseResumeButton: this.opts.hidePauseResumeButton,
      showRemoveButtonAfterComplete: this.opts.showRemoveButtonAfterComplete,
      containerWidth: pluginState.containerWidth,
      containerHeight: pluginState.containerHeight,
      areInsidesReadyToBeVisible: pluginState.areInsidesReadyToBeVisible,
      parentElement: this.el,
      allowedFileTypes: this.uppy.opts.restrictions.allowedFileTypes,
      maxNumberOfFiles: this.uppy.opts.restrictions.maxNumberOfFiles,
      requiredMetaFields: this.uppy.opts.restrictions.requiredMetaFields,
      showSelectedFiles: this.opts.showSelectedFiles,
      showNativePhotoCameraButton: this.opts.showNativePhotoCameraButton,
      showNativeVideoCameraButton: this.opts.showNativeVideoCameraButton,
      nativeCameraFacingMode: this.opts.nativeCameraFacingMode,
      singleFileFullScreen: this.opts.singleFileFullScreen,
      handleCancelRestore: this.handleCancelRestore,
      handleRequestThumbnail: this.handleRequestThumbnail,
      handleCancelThumbnail: this.handleCancelThumbnail,
      // drag props
      isDraggingOver: pluginState.isDraggingOver,
      handleDragOver: this.handleDragOver,
      handleDragLeave: this.handleDragLeave,
      handleDrop: this.handleDrop
    });
  };
  #addSpecifiedPluginsFromOptions = () => {
    const { plugins } = this.opts;
    plugins.forEach((pluginID) => {
      const plugin = this.uppy.getPlugin(pluginID);
      if (plugin) {
        plugin.mount(this, plugin);
      } else {
        this.uppy.log(`[Uppy] Dashboard could not find plugin '${pluginID}', make sure to uppy.use() the plugins you are specifying`, "warning");
      }
    });
  };
  #autoDiscoverPlugins = () => {
    this.uppy.iteratePlugins(this.#addSupportedPluginIfNoTarget);
  };
  #addSupportedPluginIfNoTarget = (plugin) => {
    const typesAllowed = ["acquirer", "editor"];
    if (plugin && !plugin.opts?.target && typesAllowed.includes(plugin.type)) {
      const pluginAlreadyAdded = this.getPluginState().targets.some((installedPlugin) => plugin.id === installedPlugin.id);
      if (!pluginAlreadyAdded) {
        plugin.mount(this, plugin);
      }
    }
  };
  #getStatusBarOpts() {
    const { hideUploadButton, hideRetryButton, hidePauseResumeButton, hideCancelButton, showProgressDetails, hideProgressAfterFinish, locale: l2, doneButtonHandler } = this.opts;
    return {
      hideUploadButton,
      hideRetryButton,
      hidePauseResumeButton,
      hideCancelButton,
      showProgressDetails,
      hideAfterFinish: hideProgressAfterFinish,
      locale: l2,
      doneButtonHandler
    };
  }
  #getThumbnailGeneratorOpts() {
    const { thumbnailWidth, thumbnailHeight, thumbnailType, waitForThumbnailsBeforeUpload } = this.opts;
    return {
      thumbnailWidth,
      thumbnailHeight,
      thumbnailType,
      waitForThumbnailsBeforeUpload,
      // If we don't block on thumbnails, we can lazily generate them
      lazy: !waitForThumbnailsBeforeUpload
    };
  }
  #getInformerOpts() {
    return {
      // currently no options
    };
  }
  setOptions(opts) {
    super.setOptions(opts);
    this.uppy.getPlugin(this.#getStatusBarId())?.setOptions(this.#getStatusBarOpts());
    this.uppy.getPlugin(this.#getThumbnailGeneratorId())?.setOptions(this.#getThumbnailGeneratorOpts());
  }
  #getStatusBarId() {
    return `${this.id}:StatusBar`;
  }
  #getThumbnailGeneratorId() {
    return `${this.id}:ThumbnailGenerator`;
  }
  #getInformerId() {
    return `${this.id}:Informer`;
  }
  install = () => {
    this.setPluginState({
      isHidden: true,
      fileCardFor: null,
      activeOverlayType: null,
      showAddFilesPanel: false,
      activePickerPanel: void 0,
      showFileEditor: false,
      metaFields: this.opts.metaFields,
      targets: [],
      // We'll make them visible once .containerWidth is determined
      areInsidesReadyToBeVisible: false,
      isDraggingOver: false
    });
    const { inline, closeAfterFinish } = this.opts;
    if (inline && closeAfterFinish) {
      throw new Error("[Dashboard] `closeAfterFinish: true` cannot be used on an inline Dashboard, because an inline Dashboard cannot be closed at all. Either set `inline: false`, or disable the `closeAfterFinish` option.");
    }
    const { allowMultipleUploads, allowMultipleUploadBatches } = this.uppy.opts;
    if ((allowMultipleUploads || allowMultipleUploadBatches) && closeAfterFinish) {
      this.uppy.log("[Dashboard] When using `closeAfterFinish`, we recommended setting the `allowMultipleUploadBatches` option to `false` in the Uppy constructor. See https://uppy.io/docs/uppy/#allowMultipleUploads-true", "warning");
    }
    const { target } = this.opts;
    if (target) {
      this.mount(target, this);
    }
    if (!this.opts.disableStatusBar) {
      this.uppy.use(StatusBar, {
        id: this.#getStatusBarId(),
        target: this,
        ...this.#getStatusBarOpts()
      });
    }
    if (!this.opts.disableInformer) {
      this.uppy.use(Informer, {
        id: this.#getInformerId(),
        target: this,
        ...this.#getInformerOpts()
      });
    }
    if (!this.opts.disableThumbnailGenerator) {
      this.uppy.use(ThumbnailGenerator, {
        id: this.#getThumbnailGeneratorId(),
        ...this.#getThumbnailGeneratorOpts()
      });
    }
    this.darkModeMediaQuery = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    const isDarkModeOnFromTheStart = this.darkModeMediaQuery ? this.darkModeMediaQuery.matches : false;
    this.uppy.log(`[Dashboard] Dark mode is ${isDarkModeOnFromTheStart ? "on" : "off"}`);
    this.setDarkModeCapability(isDarkModeOnFromTheStart);
    if (this.opts.theme === "auto") {
      this.darkModeMediaQuery?.addListener(this.handleSystemDarkModeChange);
    }
    this.#addSpecifiedPluginsFromOptions();
    this.#autoDiscoverPlugins();
    this.initEvents();
  };
  uninstall = () => {
    if (!this.opts.disableInformer) {
      const informer = this.uppy.getPlugin(`${this.id}:Informer`);
      if (informer)
        this.uppy.removePlugin(informer);
    }
    if (!this.opts.disableStatusBar) {
      const statusBar = this.uppy.getPlugin(`${this.id}:StatusBar`);
      if (statusBar)
        this.uppy.removePlugin(statusBar);
    }
    if (!this.opts.disableThumbnailGenerator) {
      const thumbnail = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
      if (thumbnail)
        this.uppy.removePlugin(thumbnail);
    }
    const { plugins } = this.opts;
    plugins.forEach((pluginID) => {
      const plugin = this.uppy.getPlugin(pluginID);
      if (plugin)
        plugin.unmount();
    });
    if (this.opts.theme === "auto") {
      this.darkModeMediaQuery?.removeListener(this.handleSystemDarkModeChange);
    }
    if (this.opts.disablePageScrollWhenModalOpen) {
      document.body.classList.remove("uppy-Dashboard-isFixed");
    }
    this.unmount();
    this.removeEvents();
  };
}
const zh_CN = {
  strings: {},
  pluralize() {
    return 0;
  }
};
zh_CN.strings = {
  addBulkFilesFailed: "内部错误导致添加 %{smart_count} 个文件失败",
  addMore: "添加更多文件",
  addMoreFiles: "添加更多文件",
  addingMoreFiles: "添加更多文件",
  allowAccessDescription: "为了通过您的相机进行拍照或录像，请给网站相机的访问权限",
  allowAccessTitle: "请允许对相机的访问权限",
  authenticateWith: "连接到 %{pluginName}",
  authenticateWithTitle: "请使用 %{pluginName} 进行认证以选择文件",
  back: "返回",
  browse: "浏览",
  browseFiles: "浏览",
  cancel: "取消",
  cancelUpload: "取消上传",
  chooseFiles: "选择文件",
  closeModal: "关闭窗口",
  companionError: "和 Companion 连接失败了",
  companionUnauthorizeHint: "请访问 %{url} 以认证您的 %{provider} 账户",
  complete: "上传完毕",
  connectedToInternet: "连接至网络",
  copyLink: "复制链接",
  copyLinkToClipboardFallback: "复制以下网址",
  copyLinkToClipboardSuccess: "链接已复制到剪贴板",
  creatingAssembly: "正在准备上传…",
  creatingAssemblyFailed: "Transloadit：无法创建程序集",
  dashboardTitle: "文件上传工具",
  dashboardWindowTitle: "文件上传工具窗口（点击离开以关闭）",
  dataUploadedOfTotal: "%{total} / %{complete}",
  done: "完成",
  dropHereOr: "拖拽文件到这里，或%{browse}",
  dropHint: "拖拽文件到这里",
  dropPasteBoth: "拖拽文件到这里，或者%{browse}文件",
  dropPasteFiles: "拖拽文件到这里，或者%{browse}文件",
  dropPasteFolders: "拖拽文件到这里，或者%{browse}文件",
  dropPasteImportBoth: "拖拽文件到这里，粘贴、%{browse}或者导入",
  dropPasteImportFiles: "拖拽文件到这里，粘贴、%{browse}或者导入",
  dropPasteImportFolders: "拖拽文件到这里，粘贴、%{browse}或者导入",
  editFile: "编辑文件",
  editImage: "编辑图片",
  editing: "正在编辑 %{file}",
  emptyFolderAdded: "无法从空文件夹添加文件",
  encoding: "正在编码…",
  enterCorrectUrl: "错误链接： 请确认您输入的是文件的链接",
  enterUrlToImport: "输入链接或者导入文件",
  exceedsSize: "文件超过了最大尺寸限制 %{size}",
  failedToFetch: "Companion 无法抓取此链接，请确保它是正确的",
  failedToUpload: "上传 %{file} 失败",
  fileSource: "文件源：%{name}",
  filesUploadedOfTotal: "已上传 %{smart_count} 个文件中的 %{complete} 个",
  filter: "筛选器",
  finishEditingFile: "完成文件编辑",
  folderAdded: "从 %{folder} 添加了 %{smart_count} 个文件",
  generatingThumbnails: "正在生成缩略图…",
  import: "导入",
  importFrom: "从 %{name} 导入",
  inferiorSize: "文件大小必须超过 %{size}",
  loading: "正在载入…",
  logOut: "登出",
  micDisabled: "麦克风的权限访问被用户拒绝",
  myDevice: "我的设备",
  noCameraDescription: "为了拍摄照片或录制视频，请连接一个摄像设备",
  noCameraTitle: "摄像头不可用",
  noDuplicates: "无法添加重复文件 %{fileName}，该文件已存在",
  noFilesFound: "这里空空如也",
  noInternetConnection: "无法连接到网络",
  noMoreFilesAllowed: "无法添加新文件：已正在上传文件",
  openFolderNamed: "打开文件夹 %{name}",
  pause: "暂停",
  pauseUpload: "暂停上传",
  paused: "已暂停",
  poweredBy: "强力驱动于 %{uppy}",
  processingXFiles: "正在处理 %{smart_count} 个文件",
  recording: "正在录制",
  recordingLength: "录制长度 %{recording_length}",
  recordingStoppedMaxSize: "录像已停止，文件大小即将超过限制",
  removeFile: "删除文件",
  resetFilter: "重置筛选器",
  resume: "恢复",
  resumeUpload: "恢复上传",
  retry: "重试",
  retryUpload: "重试",
  saveChanges: "保存变更",
  selectFileNamed: "选择文件 %{name}",
  selectX: "选择 %{smart_count}",
  smile: "笑一笑！",
  startCapturing: "开始屏幕录制",
  startRecording: "开始视频录制",
  stopCapturing: "停止屏幕录制",
  stopRecording: "停止视频录制",
  streamActive: "视频流已激活",
  streamPassive: "视频流未激活",
  submitRecordedFile: "提交已录制视频",
  takePicture: "拍照",
  timedOut: "上传已超时 %{seconds} 秒，中止上传",
  unselectFileNamed: "取消选择文件 %{name}",
  upload: "上传",
  uploadComplete: "上传完成",
  uploadFailed: "上传失败",
  uploadPaused: "上传暂停",
  uploadXFiles: "上传 %{smart_count} 个文件",
  uploadXNewFiles: "新上传了 %{smart_count} 个文件",
  uploading: "正在上传",
  uploadingXFiles: "正在上传 %{smart_count} 个文件",
  xFilesSelected: "%{smart_count} 个文件待上传",
  xMoreFilesAdded: "又有 %{smart_count} 个文件被添加",
  xTimeLeft: "剩余 %{time}",
  youCanOnlyUploadFileTypes: "您只能上传这些文件类型：%{types}",
  youCanOnlyUploadX: "您只能上传 %{smart_count} 个文件",
  youHaveToAtLeastSelectX: "您至少要选择 %{smart_count} 个文件"
};
const en_US = {
  strings: {},
  pluralize(n2) {
    if (n2 === 1) {
      return 0;
    }
    return 1;
  }
};
en_US.strings = {
  "addBulkFilesFailed": {
    "0": "Failed to add %{smart_count} file due to an internal error",
    "1": "Failed to add %{smart_count} files due to internal errors"
  },
  "addedNumFiles": "Added %{numFiles} file(s)",
  "addingMoreFiles": "Adding more files",
  "additionalRestrictionsFailed": "%{count} additional restrictions were not fulfilled",
  "addMore": "Add more",
  "addMoreFiles": "Add more files",
  "aggregateExceedsSize": "You selected %{size} of files, but maximum allowed size is %{sizeAllowed}",
  "allFilesFromFolderNamed": "All files from folder %{name}",
  "allowAccessDescription": "In order to take pictures or record video with your camera, please allow camera access for this site.",
  "allowAccessTitle": "Please allow access to your camera",
  "allowAudioAccessDescription": "In order to record audio, please allow microphone access for this site.",
  "allowAudioAccessTitle": "Please allow access to your microphone",
  "aspectRatioLandscape": "Crop landscape (16:9)",
  "aspectRatioPortrait": "Crop portrait (9:16)",
  "aspectRatioSquare": "Crop square",
  "authAborted": "Authentication aborted",
  "authenticate": "Connect",
  "authenticateWith": "Connect to %{pluginName}",
  "authenticateWithTitle": "Please authenticate with %{pluginName} to select files",
  "back": "Back",
  "browse": "browse",
  "browseFiles": "browse files",
  "browseFolders": "browse folders",
  "cancel": "Cancel",
  "cancelUpload": "Cancel upload",
  "chooseFiles": "Choose files",
  "closeModal": "Close Modal",
  "companionError": "Connection with Companion failed",
  "companionUnauthorizeHint": "To unauthorize to your %{provider} account, please go to %{url}",
  "complete": "Complete",
  "compressedX": "Saved %{size} by compressing images",
  "compressingImages": "Compressing images...",
  "connectedToInternet": "Connected to the Internet",
  "copyLink": "Copy link",
  "copyLinkToClipboardFallback": "Copy the URL below",
  "copyLinkToClipboardSuccess": "Link copied to clipboard.",
  "creatingAssembly": "Preparing upload...",
  "creatingAssemblyFailed": "Transloadit: Could not create Assembly",
  "dashboardTitle": "Uppy Dashboard",
  "dashboardWindowTitle": "Uppy Dashboard Window (Press escape to close)",
  "dataUploadedOfTotal": "%{complete} of %{total}",
  "dataUploadedOfUnknown": "%{complete} of unknown",
  "discardMediaFile": "Discard Media",
  "discardRecordedFile": "Discard recorded file",
  "done": "Done",
  "dropHereOr": "Drop here or %{browse}",
  "dropHint": "Drop your files here",
  "dropPasteBoth": "Drop files here, %{browseFiles} or %{browseFolders}",
  "dropPasteFiles": "Drop files here or %{browseFiles}",
  "dropPasteFolders": "Drop files here or %{browseFolders}",
  "dropPasteImportBoth": "Drop files here, %{browseFiles}, %{browseFolders} or import from:",
  "dropPasteImportFiles": "Drop files here, %{browseFiles} or import from:",
  "dropPasteImportFolders": "Drop files here, %{browseFolders} or import from:",
  "editFile": "Edit file",
  "editFileWithFilename": "Edit file %{file}",
  "editImage": "Edit image",
  "editing": "Editing %{file}",
  "emptyFolderAdded": "No files were added from empty folder",
  "encoding": "Encoding...",
  "enterCorrectUrl": "Incorrect URL: Please make sure you are entering a direct link to a file",
  "enterTextToSearch": "Enter text to search for images",
  "enterUrlToImport": "Enter URL to import a file",
  "error": "Error",
  "exceedsSize": "%{file} exceeds maximum allowed size of %{size}",
  "failedToFetch": "Companion failed to fetch this URL, please make sure it’s correct",
  "failedToUpload": "Failed to upload %{file}",
  "filesUploadedOfTotal": {
    "0": "%{complete} of %{smart_count} file uploaded",
    "1": "%{complete} of %{smart_count} files uploaded"
  },
  "filter": "Filter",
  "finishEditingFile": "Finish editing file",
  "flipHorizontal": "Flip horizontally",
  "folderAdded": {
    "0": "Added %{smart_count} file from %{folder}",
    "1": "Added %{smart_count} files from %{folder}"
  },
  "folderAlreadyAdded": 'The folder "%{folder}" was already added',
  "generatingThumbnails": "Generating thumbnails...",
  "import": "Import",
  "importFiles": "Import files from:",
  "importFrom": "Import from %{name}",
  "inferiorSize": "This file is smaller than the allowed size of %{size}",
  "loadedXFiles": "Loaded %{numFiles} files",
  "loading": "Loading...",
  "logIn": "Log in",
  "logOut": "Log out",
  "micDisabled": "Microphone access denied by user",
  "missingRequiredMetaField": "Missing required meta fields",
  "missingRequiredMetaFieldOnFile": "Missing required meta fields in %{fileName}",
  "missingRequiredMetaFields": {
    "0": "Missing required meta field: %{fields}.",
    "1": "Missing required meta fields: %{fields}."
  },
  "myDevice": "My Device",
  "noAudioDescription": "In order to record audio, please connect a microphone or another audio input device",
  "noAudioTitle": "Microphone Not Available",
  "noCameraDescription": "In order to take pictures or record video, please connect a camera device",
  "noCameraTitle": "Camera Not Available",
  "noDuplicates": "Cannot add the duplicate file '%{fileName}', it already exists",
  "noFilesFound": "You have no files or folders here",
  "noInternetConnection": "No Internet connection",
  "noMoreFilesAllowed": "Cannot add more files",
  "noSearchResults": "Unfortunately, there are no results for this search",
  "openFolderNamed": "Open folder %{name}",
  "pause": "Pause",
  "paused": "Paused",
  "pauseUpload": "Pause upload",
  "pickFiles": "Pick files",
  "pickPhotos": "Pick photos",
  "pleaseWait": "Please wait",
  "pluginNameAudio": "Audio",
  "pluginNameBox": "Box",
  "pluginNameCamera": "Camera",
  "pluginNameDropbox": "Dropbox",
  "pluginNameFacebook": "Facebook",
  "pluginNameGoogleDrive": "Google Drive",
  "pluginNameGoogleDrivePicker": "Google Drive",
  "pluginNameGooglePhotosPicker": "Google Photos",
  "pluginNameInstagram": "Instagram",
  "pluginNameOneDrive": "OneDrive",
  "pluginNameScreenCapture": "Screencast",
  "pluginNameUnsplash": "Unsplash",
  "pluginNameUrl": "Link",
  "pluginNameWebdav": "WebDAV",
  "pluginNameZoom": "Zoom",
  "pluginWebdavInputLabel": "WebDAV URL for a file (e.g. from ownCloud or Nextcloud)",
  "poweredBy": "Powered by %{uppy}",
  "processingXFiles": {
    "0": "Processing %{smart_count} file",
    "1": "Processing %{smart_count} files"
  },
  "recording": "Recording",
  "recordingLength": "Recording length %{recording_length}",
  "recordingStoppedMaxSize": "Recording stopped because the file size is about to exceed the limit",
  "recordVideoBtn": "Record Video",
  "recoveredAllFiles": "We restored all files. You can now resume the upload.",
  "recoveredXFiles": {
    "0": "We could not fully recover 1 file. Please re-select it and resume the upload.",
    "1": "We could not fully recover %{smart_count} files. Please re-select them and resume the upload."
  },
  "removeFile": "Remove file",
  "reSelect": "Re-select",
  "resetFilter": "Reset filter",
  "resetSearch": "Reset search",
  "resume": "Resume",
  "resumeUpload": "Resume upload",
  "retry": "Retry",
  "retryUpload": "Retry upload",
  "revert": "Reset",
  "rotate": "Rotate 90°",
  "save": "Save",
  "saveChanges": "Save changes",
  "search": "Search",
  "searchImages": "Search for images",
  "selectX": {
    "0": "Select %{smart_count}",
    "1": "Select %{smart_count}"
  },
  "sessionRestored": "Session restored",
  "showErrorDetails": "Show error details",
  "signInWithGoogle": "Sign in with Google",
  "smile": "Smile!",
  "startAudioRecording": "Begin audio recording",
  "startCapturing": "Begin screen capturing",
  "startRecording": "Begin video recording",
  "stopAudioRecording": "Stop audio recording",
  "stopCapturing": "Stop screen capturing",
  "stopRecording": "Stop video recording",
  "streamActive": "Stream active",
  "streamPassive": "Stream passive",
  "submitRecordedFile": "Submit recorded file",
  "takePicture": "Take a picture",
  "takePictureBtn": "Take Picture",
  "takeScreenshot": "Take Screenshot",
  "unnamed": "Unnamed",
  "upload": "Upload",
  "uploadComplete": "Upload complete",
  "uploadFailed": "Upload failed",
  "uploading": "Uploading",
  "uploadingXFiles": {
    "0": "Uploading %{smart_count} file",
    "1": "Uploading %{smart_count} files"
  },
  "uploadPaused": "Upload paused",
  "uploadStalled": "Upload has not made any progress for %{seconds} seconds. You may want to retry it.",
  "uploadXFiles": {
    "0": "Upload %{smart_count} file",
    "1": "Upload %{smart_count} files"
  },
  "uploadXNewFiles": {
    "0": "Upload +%{smart_count} file",
    "1": "Upload +%{smart_count} files"
  },
  "xFilesSelected": {
    "0": "%{smart_count} file selected",
    "1": "%{smart_count} files selected"
  },
  "xMoreFilesAdded": {
    "0": "%{smart_count} more file added",
    "1": "%{smart_count} more files added"
  },
  "xTimeLeft": "%{time} left",
  "youCanOnlyUploadFileTypes": "You can only upload: %{types}",
  "youCanOnlyUploadX": {
    "0": "You can only upload %{smart_count} file",
    "1": "You can only upload %{smart_count} files"
  },
  "youHaveToAtLeastSelectX": {
    "0": "You have to select at least %{smart_count} file",
    "1": "You have to select at least %{smart_count} files"
  },
  "zoomIn": "Zoom in",
  "zoomOut": "Zoom out"
};
if (typeof Uppy !== "undefined") {
  globalThis.Uppy.locales.en_US = en_US;
}
const getUppyLocale = (locale2) => {
  return locale2 === "zh-CN" ? zh_CN : en_US;
};
function useUppyCore() {
  const log2 = createLogger("UppyCore");
  const uppyInstance = shallowRef(null);
  const initializeUppy = async (options) => {
    if (uppyInstance.value) {
      destroyUppy();
    }
    uppyInstance.value = new Uppy$1({
      id: options.id,
      autoProceed: options.autoProceed ?? false,
      allowMultipleUploadBatches: options.allowMultipleUploadBatches ?? true,
      debug: false,
      locale: getUppyLocale(options.locale || "zh-CN"),
      restrictions: {
        maxFileSize: options.maxFileSize || null
      }
    });
    if (options.onStateChanged) {
      uppyInstance.value.on("state-update", options.onStateChanged);
    }
  };
  const destroyUppy = () => {
    if (uppyInstance.value) {
      if (uppyInstance.value._cleanupPaste) {
        uppyInstance.value._cleanupPaste();
      }
      uppyInstance.value.destroy();
      uppyInstance.value = null;
    }
  };
  const reinitializeUppy = async (options) => {
    destroyUppy();
    await initializeUppy(options);
  };
  const snapshotFiles = () => {
    if (!uppyInstance.value) return [];
    return uppyInstance.value.getFiles().map((file) => ({
      data: file.data || file,
      name: file.name,
      type: file.type,
      meta: { ...file.meta },
      source: file.source || "local"
    }));
  };
  const restoreFiles = (files = []) => {
    if (!uppyInstance.value || !files.length) return;
    files.forEach((file) => {
      try {
        uppyInstance.value.addFile({
          name: file.name,
          type: file.type,
          data: file.data,
          source: file.source,
          meta: file.meta || {}
        });
      } catch (error) {
        log2.warn("[useUppyCore] 恢复文件失败", error);
      }
    });
  };
  return {
    uppyInstance,
    initializeUppy,
    destroyUppy,
    reinitializeUppy,
    snapshotFiles,
    restoreFiles
  };
}
function useUppyEvents(options) {
  const fileCount = ref(0);
  let eventHandlers = {};
  const log2 = createLogger("useUppyEvents");
  const setupEvents = () => {
    if (!options.uppy?.value) return;
    const uppy = options.uppy.value;
    const onFileAdded = (file) => {
      fileCount.value = uppy.getFiles().length;
      options.onFileAdded?.(file);
    };
    const onFileRemoved = (file) => {
      fileCount.value = uppy.getFiles().length;
      options.onFileRemoved?.(file);
    };
    const onRestrictionFailed = (file, error) => {
      options.onRestrictionFailed?.(file, error);
    };
    const onUploadError = (file, error) => {
      options.onUploadError?.(file, error);
    };
    const onError = (error) => {
      options.onError?.(error);
    };
    const onFileEditComplete = (file) => {
      if (file?.meta?.name && file.meta.name !== file.name) {
        log2.debug("同步编辑后的文件名:", file.name, "->", file.meta.name);
        uppy.setFileState(file.id, { name: file.meta.name });
      }
      options.onFileEditComplete?.(file);
    };
    uppy.on("file-added", onFileAdded);
    uppy.on("file-removed", onFileRemoved);
    if (options.onRestrictionFailed) {
      uppy.on("restriction-failed", onRestrictionFailed);
    }
    if (options.onUploadError) {
      uppy.on("upload-error", onUploadError);
    }
    if (options.onError) {
      uppy.on("error", onError);
    }
    uppy.on("dashboard:file-edit-complete", onFileEditComplete);
    eventHandlers = {
      "file-added": onFileAdded,
      "file-removed": onFileRemoved,
      "restriction-failed": onRestrictionFailed,
      "upload-error": onUploadError,
      "error": onError,
      "dashboard:file-edit-complete": onFileEditComplete
    };
  };
  const cleanupEvents = () => {
    if (!options.uppy?.value) return;
    const uppy = options.uppy.value;
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      if (handler) uppy.off(event, handler);
    });
    eventHandlers = {};
  };
  watch(
    () => options.uppy?.value,
    (newUppy, oldUppy) => {
      if (oldUppy) cleanupEvents();
      if (newUppy) setupEvents();
    },
    { immediate: true }
  );
  return {
    setupEvents,
    cleanupEvents,
    fileCount
  };
}
function useUppyPaste(options) {
  const log2 = createLogger("UppyPaste");
  let pasteHandler = null;
  let stopPasteListener = null;
  const setupPasteListener = () => {
    if (typeof stopPasteListener === "function") {
      stopPasteListener();
      stopPasteListener = null;
    }
    pasteHandler = (event) => {
      if (options.enabled && !options.enabled.value) return;
      if (!options.uppy?.value) return;
      const items = event.clipboardData?.items;
      if (!items) return;
      for (let i2 = 0; i2 < items.length; i2++) {
        const item = items[i2];
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (!file) continue;
          const ext = file.type.split("/")[1] || "bin";
          const fileName = file.name || `pasted-${Date.now()}.${ext}`;
          try {
            options.uppy.value.addFile({
              name: fileName,
              type: file.type,
              data: file,
              source: "clipboard"
            });
            options.onPaste?.(file);
            event.preventDefault();
          } catch (err) {
            log2.error("[useUppyPaste] 添加文件失败:", err);
          }
        }
      }
    };
    stopPasteListener = useEventListener(document, "paste", pasteHandler);
    if (options.uppy?.value) {
      options.uppy.value._cleanupPaste = cleanupPasteListener;
    }
  };
  const cleanupPasteListener = () => {
    if (typeof stopPasteListener === "function") {
      stopPasteListener();
      stopPasteListener = null;
    }
    pasteHandler = null;
  };
  watch(
    () => options.uppy?.value,
    (newUppy, oldUppy) => {
      if (oldUppy) cleanupPasteListener();
      if (newUppy) setupPasteListener();
    },
    { immediate: true }
  );
  return {
    setupPasteListener,
    cleanupPasteListener
  };
}
function useUppyBackendProgress(options) {
  const log2 = createLogger("UppyBackendProgress");
  const { uppy, isDirectMode } = options;
  const backendProgressState = /* @__PURE__ */ new Map();
  const backendProgressTimers = /* @__PURE__ */ new Map();
  const generateUploadId2 = () => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `upload-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  };
  const ensureUploadIdForFile = (file) => {
    if (!uppy?.value || !file?.id) return null;
    const meta = file.meta || {};
    if (meta.upload_id) {
      return meta.upload_id;
    }
    const uploadId = generateUploadId2();
    try {
      uppy.value.setFileMeta(file.id, {
        ...meta,
        upload_id: uploadId
      });
    } catch (error) {
      log2.warn("[useUppyBackendProgress] 设置 upload_id 失败", error);
    }
    return uploadId;
  };
  const resetBackendProgressTracking = () => {
    backendProgressTimers.forEach((timer) => clearInterval(timer));
    backendProgressTimers.clear();
    backendProgressState.clear();
  };
  const updateBrowserProgressState = ({ file, fileId, bytesUploaded, bytesTotal }) => {
    if (!fileId) return;
    const id = fileId;
    const prev = backendProgressState.get(id) || {};
    const next = {
      ...prev,
      file: file || prev.file,
      browserBytesUploaded: typeof bytesUploaded === "number" ? bytesUploaded : prev.browserBytesUploaded || 0,
      browserBytesTotal: typeof bytesTotal === "number" ? bytesTotal : prev.browserBytesTotal || file?.size || 0,
      remoteBytesLoaded: prev.remoteBytesLoaded || 0,
      remoteBytesTotal: prev.remoteBytesTotal || 0,
      currentBytes: prev.currentBytes || 0,
      hasRemote: prev.hasRemote || false
    };
    if (next.browserBytesUploaded > (next.currentBytes || 0)) {
      next.currentBytes = next.browserBytesUploaded;
    }
    backendProgressState.set(id, next);
  };
  const startBackendProgressPolling = () => {
    return;
  };
  return {
    ensureUploadIdForFile,
    resetBackendProgressTracking,
    updateBrowserProgressState,
    startBackendProgressPolling
  };
}
const _hoisted_1$2 = { class: "flex items-center justify-between mb-3" };
const _hoisted_2$2 = ["title"];
const _hoisted_3$2 = { class: "flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0" };
const _hoisted_4$1 = ["name", "value", "checked", "disabled", "onChange"];
const _hoisted_5 = { class: "ml-2 flex items-center flex-wrap gap-1" };
const _sfc_main$2 = {
  __name: "UploadModeSelector",
  props: {
    /**
     * 上传模式列表
     */
    modes: {
      type: Array,
      required: true,
      validator: (modes) => modes.every((m2) => m2.value && m2.label)
    },
    /**
     * 当前选中的模式值 (v-model)
     */
    modelValue: {
      type: String,
      required: true
    },
    /**
     * 标题文本
     */
    title: {
      type: String,
      default: "上传方式"
    },
    /**
     * 表单字段名
     */
    name: {
      type: String,
      default: "uploadMode"
    },
    /**
     * 暗色模式
     */
    darkMode: {
      type: Boolean,
      default: false
    },
    /**
     * 是否禁用所有选项
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const props = __props;
    const currentMode = computed(() => {
      return props.modes.find((m2) => m2.value === props.modelValue) || props.modes[0];
    });
    const currentModeLabel = computed(() => currentMode.value?.modeLabel || currentMode.value?.label);
    const currentModeTooltip = computed(() => currentMode.value?.tooltip || "");
    const currentModeClass = computed(() => {
      const mode = currentMode.value;
      if (!mode) return "";
      if (mode.badgeClass) return mode.badgeClass;
      if (mode.value === "presigned") {
        return props.darkMode ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-700";
      } else if (mode.value === "stream" || mode.value === "form") {
        return props.darkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700";
      } else {
        return props.darkMode ? "bg-amber-900/30 text-amber-300" : "bg-amber-100 text-amber-700";
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["mb-4 p-3 rounded-lg", __props.darkMode ? "bg-gray-700/50" : "bg-gray-100"])
      }, [
        createBaseVNode("div", _hoisted_1$2, [
          createBaseVNode("span", {
            class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
          }, toDisplayString(__props.title), 3),
          createBaseVNode("span", {
            class: normalizeClass(["text-xs px-2 py-1 rounded-full cursor-help", currentModeClass.value]),
            title: currentModeTooltip.value
          }, toDisplayString(currentModeLabel.value), 11, _hoisted_2$2)
        ]),
        createBaseVNode("div", _hoisted_3$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.modes, (mode) => {
            return openBlock(), createElementBlock("label", {
              key: mode.value,
              class: normalizeClass(["flex items-center cursor-pointer", mode.disabled || __props.disabled ? "opacity-50 cursor-not-allowed" : ""])
            }, [
              createBaseVNode("input", {
                type: "radio",
                name: __props.name,
                value: mode.value,
                checked: __props.modelValue === mode.value,
                disabled: mode.disabled || __props.disabled,
                class: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 flex-shrink-0",
                onChange: ($event) => _ctx.$emit("update:modelValue", mode.value)
              }, null, 40, _hoisted_4$1),
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("span", {
                  class: normalizeClass(["text-sm", __props.darkMode ? "text-gray-300" : "text-gray-600"])
                }, toDisplayString(mode.label), 3),
                mode.badge ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: normalizeClass(["text-xs px-1 py-0.5 rounded flex-shrink-0", __props.darkMode ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"])
                }, toDisplayString(mode.badge), 3)) : createCommentVNode("", true),
                mode.disabled && mode.disabledHint ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-500" : "text-gray-400"])
                }, toDisplayString(mode.disabledHint), 3)) : createCommentVNode("", true)
              ])
            ], 2);
          }), 128))
        ])
      ], 2);
    };
  }
};
const _hoisted_1$1 = { class: "mb-4" };
const _hoisted_2$1 = { class: "grid grid-cols-2 sm:grid-cols-3 gap-2" };
const _hoisted_3$1 = ["checked", "onChange"];
const _sfc_main$1 = {
  __name: "AdvancedPluginsPanel",
  props: {
    /**
     * 插件列表
     */
    plugins: {
      type: Array,
      required: true,
      validator: (plugins) => plugins.every((p2) => p2.key && p2.label !== void 0)
    },
    /**
     * 启用的插件数量
     */
    enabledCount: {
      type: Number,
      required: true
    },
    /**
     * 标题文本
     */
    title: {
      type: String,
      default: "高级功能"
    },
    /**
     * 启用数量文本模板 (使用 {count} 占位符)
     */
    enabledCountTemplate: {
      type: String,
      default: "已启用 {count} 个"
    },
    /**
     * 暗色模式
     */
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["toggle-plugin"],
  setup(__props) {
    const props = __props;
    const showAdvanced = ref(false);
    const enabledCountText = computed(() => {
      return props.enabledCountTemplate.replace("{count}", props.enabledCount);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("button", {
          onClick: _cache[0] || (_cache[0] = ($event) => showAdvanced.value = !showAdvanced.value),
          class: normalizeClass(["flex items-center justify-between w-full p-3 text-left rounded-lg transition-colors", __props.darkMode ? "bg-gray-700/50 hover:bg-gray-700/70" : "bg-gray-100 hover:bg-gray-200"])
        }, [
          createBaseVNode("span", {
            class: normalizeClass(["text-sm font-medium", __props.darkMode ? "text-gray-300" : "text-gray-700"])
          }, [
            createTextVNode(toDisplayString(__props.title) + " ", 1),
            __props.enabledCount > 0 ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(["ml-2 px-2 py-0.5 text-xs rounded-full", __props.darkMode ? "bg-blue-900/50 text-blue-300" : "bg-blue-100 text-blue-700"])
            }, toDisplayString(enabledCountText.value), 3)) : createCommentVNode("", true)
          ], 2),
          createVNode(unref(IconChevronDown), {
            size: "sm",
            class: normalizeClass(["transition-transform duration-200", [showAdvanced.value ? "rotate-180" : "", __props.darkMode ? "text-gray-400" : "text-gray-500"]])
          }, null, 8, ["class"])
        ], 2),
        withDirectives(createBaseVNode("div", {
          class: normalizeClass(["mt-2 p-3 rounded border-l-2", __props.darkMode ? "bg-gray-800/30 border-gray-600" : "bg-gray-50 border-gray-300"])
        }, [
          createBaseVNode("div", _hoisted_2$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.plugins, (plugin) => {
              return openBlock(), createElementBlock("label", {
                key: plugin.key,
                class: "flex items-center cursor-pointer"
              }, [
                createBaseVNode("input", {
                  type: "checkbox",
                  checked: plugin.enabled,
                  onChange: ($event) => _ctx.$emit("toggle-plugin", plugin.key),
                  class: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                }, null, 40, _hoisted_3$1),
                createBaseVNode("span", {
                  class: normalizeClass(["ml-2 text-sm", __props.darkMode ? "text-gray-300" : "text-gray-700"])
                }, toDisplayString(plugin.label), 3)
              ]);
            }), 128))
          ])
        ], 2), [
          [vShow, showAdvanced.value]
        ])
      ]);
    };
  }
};
const _hoisted_1 = { class: "uppy-container mb-4" };
const _hoisted_2 = ["id"];
const _hoisted_3 = { class: "mt-2 text-center" };
const _hoisted_4 = { class: "flex items-center justify-center gap-3 flex-wrap" };
const _sfc_main = {
  __name: "UppyDashboardContainer",
  props: {
    /**
     * Dashboard DOM ID
     */
    containerId: {
      type: String,
      required: true
    },
    /**
     * 暗色模式
     */
    darkMode: {
      type: Boolean,
      default: false
    },
    /**
     * 显示粘贴提示
     */
    showPasteHint: {
      type: Boolean,
      default: true
    },
    /**
     * 粘贴提示前缀
     */
    pasteHintPrefix: {
      type: String,
      default: "支持"
    },
    /**
     * 粘贴快捷键
     */
    pasteKey: {
      type: String,
      default: "Ctrl+V"
    },
    /**
     * 粘贴提示后缀
     */
    pasteHintSuffix: {
      type: String,
      default: "粘贴上传"
    },
    /**
     * 最大文件大小提示文本
     */
    maxFileSizeHint: {
      type: String,
      default: ""
    }
  },
  setup(__props, { expose: __expose }) {
    const container = ref(null);
    __expose({ container });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          ref_key: "container",
          ref: container,
          id: __props.containerId,
          class: "min-h-[300px]"
        }, null, 8, _hoisted_2),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            __props.showPasteHint ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-500" : "text-gray-400"])
            }, [
              createTextVNode(toDisplayString(__props.pasteHintPrefix) + " ", 1),
              createBaseVNode("kbd", {
                class: normalizeClass(["px-1 py-0.5 text-xs font-mono rounded", __props.darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"])
              }, toDisplayString(__props.pasteKey), 3),
              createTextVNode(" " + toDisplayString(__props.pasteHintSuffix), 1)
            ], 2)) : createCommentVNode("", true),
            __props.showPasteHint && __props.maxFileSizeHint ? (openBlock(), createElementBlock("span", {
              key: 1,
              class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-600" : "text-gray-300"])
            }, "•", 2)) : createCommentVNode("", true),
            __props.maxFileSizeHint ? (openBlock(), createElementBlock("span", {
              key: 2,
              class: normalizeClass(["text-xs", __props.darkMode ? "text-gray-500" : "text-gray-400"])
            }, toDisplayString(__props.maxFileSizeHint), 3)) : createCommentVNode("", true)
          ])
        ])
      ]);
    };
  }
};
const STORAGE_STRATEGIES = Object.freeze({
  BACKEND_STREAM: "backend-stream",
  BACKEND_FORM: "backend-form",
  PRESIGNED_SINGLE: "presigned-single",
  PRESIGNED_MULTIPART: "presigned-multipart"
});
const DRIVER_TYPES = Object.freeze({
  S3: "S3",
  WEBDAV: "WEBDAV",
  LOCAL: "LOCAL",
  ONEDRIVE: "ONEDRIVE",
  GOOGLE_DRIVE: "GOOGLE_DRIVE",
  GITHUB_RELEASES: "GITHUB_RELEASES",
  GITHUB_API: "GITHUB_API",
  TELEGRAM: "TELEGRAM",
  DISCORD: "DISCORD",
  HUGGINGFACE_DATASETS: "HUGGINGFACE_DATASETS"
});
const DEFAULT_DRIVER_CAPABILITIES = Object.freeze({
  share: {
    // 后端中转上传能力：流式与表单两种
    backendStream: false,
    backendForm: false,
    presigned: false,
    url: false
  },
  fs: {
    // 文件系统挂载页：后端中转上传能力
    backendStream: false,
    backendForm: false,
    presignedSingle: false,
    multipart: false
  }
});
function createCapabilities(overrides = {}) {
  return {
    share: {
      ...DEFAULT_DRIVER_CAPABILITIES.share,
      ...overrides.share || {}
    },
    fs: {
      ...DEFAULT_DRIVER_CAPABILITIES.fs,
      ...overrides.fs || {}
    }
  };
}
class DriverResolutionError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "DriverResolutionError";
    if (options.code) {
      this.code = options.code;
    }
    if (options.meta) {
      this.meta = options.meta;
    }
  }
}
function hasProperty(object, key) {
  return Object.hasOwn(object, key);
}
class ErrorWithCause extends Error {
  isNetworkError;
  cause;
  constructor(message, options) {
    super(message);
    this.cause = options?.cause;
    if (this.cause && hasProperty(this.cause, "isNetworkError")) {
      this.isNetworkError = this.cause.isNetworkError;
    } else {
      this.isNetworkError = false;
    }
  }
}
class NetworkError extends Error {
  cause;
  isNetworkError;
  request;
  constructor(error, xhr = null) {
    super(`This looks like a network error, the endpoint might be blocked by an internet provider or a firewall.`);
    this.cause = error;
    this.isNetworkError = true;
    this.request = xhr;
  }
}
function fetchWithNetworkError(...options) {
  return fetch(...options).catch((err) => {
    if (err.name === "AbortError") {
      throw err;
    } else {
      throw new NetworkError(err);
    }
  });
}
function getSocketHost(url) {
  const regex = /^(?:https?:\/\/|\/\/)?(?:[^@\n]+@)?([^\n]+)/i;
  const host = regex.exec(url)?.[1];
  const socketProtocol = /^http:\/\//i.test(url) ? "ws" : "wss";
  return `${socketProtocol}://${host}`;
}
class UserFacingApiError extends Error {
  name = "UserFacingApiError";
}
var retry$2 = {};
function RetryOperation(timeouts, options) {
  if (typeof options === "boolean") {
    options = { forever: options };
  }
  this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
  this._timeouts = timeouts;
  this._options = options || {};
  this._maxRetryTime = options && options.maxRetryTime || Infinity;
  this._fn = null;
  this._errors = [];
  this._attempts = 1;
  this._operationTimeout = null;
  this._operationTimeoutCb = null;
  this._timeout = null;
  this._operationStart = null;
  this._timer = null;
  if (this._options.forever) {
    this._cachedTimeouts = this._timeouts.slice(0);
  }
}
var retry_operation = RetryOperation;
RetryOperation.prototype.reset = function() {
  this._attempts = 1;
  this._timeouts = this._originalTimeouts.slice(0);
};
RetryOperation.prototype.stop = function() {
  if (this._timeout) {
    clearTimeout(this._timeout);
  }
  if (this._timer) {
    clearTimeout(this._timer);
  }
  this._timeouts = [];
  this._cachedTimeouts = null;
};
RetryOperation.prototype.retry = function(err) {
  if (this._timeout) {
    clearTimeout(this._timeout);
  }
  if (!err) {
    return false;
  }
  var currentTime = (/* @__PURE__ */ new Date()).getTime();
  if (err && currentTime - this._operationStart >= this._maxRetryTime) {
    this._errors.push(err);
    this._errors.unshift(new Error("RetryOperation timeout occurred"));
    return false;
  }
  this._errors.push(err);
  var timeout = this._timeouts.shift();
  if (timeout === void 0) {
    if (this._cachedTimeouts) {
      this._errors.splice(0, this._errors.length - 1);
      timeout = this._cachedTimeouts.slice(-1);
    } else {
      return false;
    }
  }
  var self2 = this;
  this._timer = setTimeout(function() {
    self2._attempts++;
    if (self2._operationTimeoutCb) {
      self2._timeout = setTimeout(function() {
        self2._operationTimeoutCb(self2._attempts);
      }, self2._operationTimeout);
      if (self2._options.unref) {
        self2._timeout.unref();
      }
    }
    self2._fn(self2._attempts);
  }, timeout);
  if (this._options.unref) {
    this._timer.unref();
  }
  return true;
};
RetryOperation.prototype.attempt = function(fn2, timeoutOps) {
  this._fn = fn2;
  if (timeoutOps) {
    if (timeoutOps.timeout) {
      this._operationTimeout = timeoutOps.timeout;
    }
    if (timeoutOps.cb) {
      this._operationTimeoutCb = timeoutOps.cb;
    }
  }
  var self2 = this;
  if (this._operationTimeoutCb) {
    this._timeout = setTimeout(function() {
      self2._operationTimeoutCb();
    }, self2._operationTimeout);
  }
  this._operationStart = (/* @__PURE__ */ new Date()).getTime();
  this._fn(this._attempts);
};
RetryOperation.prototype.try = function(fn2) {
  console.log("Using RetryOperation.try() is deprecated");
  this.attempt(fn2);
};
RetryOperation.prototype.start = function(fn2) {
  console.log("Using RetryOperation.start() is deprecated");
  this.attempt(fn2);
};
RetryOperation.prototype.start = RetryOperation.prototype.try;
RetryOperation.prototype.errors = function() {
  return this._errors;
};
RetryOperation.prototype.attempts = function() {
  return this._attempts;
};
RetryOperation.prototype.mainError = function() {
  if (this._errors.length === 0) {
    return null;
  }
  var counts = {};
  var mainError = null;
  var mainErrorCount = 0;
  for (var i2 = 0; i2 < this._errors.length; i2++) {
    var error = this._errors[i2];
    var message = error.message;
    var count = (counts[message] || 0) + 1;
    counts[message] = count;
    if (count >= mainErrorCount) {
      mainError = error;
      mainErrorCount = count;
    }
  }
  return mainError;
};
(function(exports) {
  var RetryOperation2 = retry_operation;
  exports.operation = function(options) {
    var timeouts = exports.timeouts(options);
    return new RetryOperation2(timeouts, {
      forever: options && (options.forever || options.retries === Infinity),
      unref: options && options.unref,
      maxRetryTime: options && options.maxRetryTime
    });
  };
  exports.timeouts = function(options) {
    if (options instanceof Array) {
      return [].concat(options);
    }
    var opts = {
      retries: 10,
      factor: 2,
      minTimeout: 1 * 1e3,
      maxTimeout: Infinity,
      randomize: false
    };
    for (var key in options) {
      opts[key] = options[key];
    }
    if (opts.minTimeout > opts.maxTimeout) {
      throw new Error("minTimeout is greater than maxTimeout");
    }
    var timeouts = [];
    for (var i2 = 0; i2 < opts.retries; i2++) {
      timeouts.push(this.createTimeout(i2, opts));
    }
    if (options && options.forever && !timeouts.length) {
      timeouts.push(this.createTimeout(i2, opts));
    }
    timeouts.sort(function(a2, b2) {
      return a2 - b2;
    });
    return timeouts;
  };
  exports.createTimeout = function(attempt, opts) {
    var random = opts.randomize ? Math.random() + 1 : 1;
    var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
    timeout = Math.min(timeout, opts.maxTimeout);
    return timeout;
  };
  exports.wrap = function(obj, options, methods) {
    if (options instanceof Array) {
      methods = options;
      options = null;
    }
    if (!methods) {
      methods = [];
      for (var key in obj) {
        if (typeof obj[key] === "function") {
          methods.push(key);
        }
      }
    }
    for (var i2 = 0; i2 < methods.length; i2++) {
      var method = methods[i2];
      var original = obj[method];
      obj[method] = function retryWrapper(original2) {
        var op = exports.operation(options);
        var args = Array.prototype.slice.call(arguments, 1);
        var callback = args.pop();
        args.push(function(err) {
          if (op.retry(err)) {
            return;
          }
          if (err) {
            arguments[0] = op.mainError();
          }
          callback.apply(this, arguments);
        });
        op.attempt(function() {
          original2.apply(obj, args);
        });
      }.bind(obj, original);
      obj[method].options = options;
    }
  };
})(retry$2);
var retry = retry$2;
const retry$1 = /* @__PURE__ */ getDefaultExportFromCjs(retry);
const objectToString = Object.prototype.toString;
const isError = (value) => objectToString.call(value) === "[object Error]";
const errorMessages = /* @__PURE__ */ new Set([
  "network error",
  // Chrome
  "Failed to fetch",
  // Chrome
  "NetworkError when attempting to fetch resource.",
  // Firefox
  "The Internet connection appears to be offline.",
  // Safari 16
  "Load failed",
  // Safari 17+
  "Network request failed",
  // `cross-fetch`
  "fetch failed",
  // Undici (Node.js)
  "terminated"
  // Undici (Node.js)
]);
function isNetworkError$1(error) {
  const isValid = error && isError(error) && error.name === "TypeError" && typeof error.message === "string";
  if (!isValid) {
    return false;
  }
  if (error.message === "Load failed") {
    return error.stack === void 0;
  }
  return errorMessages.has(error.message);
}
class AbortError extends Error {
  constructor(message) {
    super();
    if (message instanceof Error) {
      this.originalError = message;
      ({ message } = message);
    } else {
      this.originalError = new Error(message);
      this.originalError.stack = this.stack;
    }
    this.name = "AbortError";
    this.message = message;
  }
}
const decorateErrorWithCounts = (error, attemptNumber, options) => {
  const retriesLeft = options.retries - (attemptNumber - 1);
  error.attemptNumber = attemptNumber;
  error.retriesLeft = retriesLeft;
  return error;
};
async function pRetry(input, options) {
  return new Promise((resolve, reject) => {
    options = { ...options };
    options.onFailedAttempt ??= () => {
    };
    options.shouldRetry ??= () => true;
    options.retries ??= 10;
    const operation = retry$1.operation(options);
    const abortHandler = () => {
      operation.stop();
      reject(options.signal?.reason);
    };
    if (options.signal && !options.signal.aborted) {
      options.signal.addEventListener("abort", abortHandler, { once: true });
    }
    const cleanUp = () => {
      options.signal?.removeEventListener("abort", abortHandler);
      operation.stop();
    };
    operation.attempt(async (attemptNumber) => {
      try {
        const result = await input(attemptNumber);
        cleanUp();
        resolve(result);
      } catch (error) {
        try {
          if (!(error instanceof Error)) {
            throw new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`);
          }
          if (error instanceof AbortError) {
            throw error.originalError;
          }
          if (error instanceof TypeError && !isNetworkError$1(error)) {
            throw error;
          }
          decorateErrorWithCounts(error, attemptNumber, options);
          if (!await options.shouldRetry(error)) {
            operation.stop();
            reject(error);
          }
          await options.onFailedAttempt(error);
          if (!operation.retry(error)) {
            throw operation.mainError();
          }
        } catch (finalError) {
          decorateErrorWithCounts(finalError, attemptNumber, options);
          cleanUp();
          reject(finalError);
        }
      }
    });
  });
}
const version$2 = "4.5.2";
const packageJson$2 = {
  version: version$2
};
class AuthError extends Error {
  isAuthError;
  constructor() {
    super("Authorization required");
    this.name = "AuthError";
    this.isAuthError = true;
  }
}
function stripSlash(url) {
  return url.replace(/\/$/, "");
}
const retryCount = 10;
const socketActivityTimeoutMs = 5 * 60 * 1e3;
const authErrorStatusCode = 401;
class HttpError extends Error {
  statusCode;
  constructor({ statusCode, message }) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }
}
async function handleJSONResponse(res) {
  if (res.status === authErrorStatusCode) {
    throw new AuthError();
  }
  if (res.ok) {
    return res.json();
  }
  let errMsg = `Failed request with status: ${res.status}. ${res.statusText}`;
  let errData;
  try {
    errData = await res.json();
    if (errData.message)
      errMsg = `${errMsg} message: ${errData.message}`;
    if (errData.requestId)
      errMsg = `${errMsg} request-Id: ${errData.requestId}`;
  } catch (cause) {
    throw new Error(errMsg, { cause });
  }
  if (res.status >= 400 && res.status <= 499 && errData.message) {
    throw new UserFacingApiError(errData.message);
  }
  throw new HttpError({ statusCode: res.status, message: errMsg });
}
function emitSocketProgress(uploader, progressData, file) {
  const { progress, bytesUploaded, bytesTotal } = progressData;
  if (progress) {
    uploader.uppy.log(`Upload progress: ${progress}`);
    uploader.uppy.emit("upload-progress", file, {
      uploadStarted: file.progress.uploadStarted ?? 0,
      bytesUploaded,
      bytesTotal
    });
  }
}
class RequestClient {
  static VERSION = packageJson$2.version;
  #companionHeaders;
  uppy;
  opts;
  constructor(uppy, opts) {
    this.uppy = uppy;
    this.opts = opts;
    this.onReceiveResponse = this.onReceiveResponse.bind(this);
    this.#companionHeaders = opts.companionHeaders;
  }
  setCompanionHeaders(headers) {
    this.#companionHeaders = headers;
  }
  [Symbol.for("uppy test: getCompanionHeaders")]() {
    return this.#companionHeaders;
  }
  get hostname() {
    const { companion } = this.uppy.getState();
    const host = this.opts.companionUrl;
    return stripSlash(companion?.[host] ? companion[host] : host);
  }
  async headers(emptyBody = false) {
    const defaultHeaders = {
      Accept: "application/json",
      ...emptyBody ? void 0 : {
        // Passing those headers on requests with no data forces browsers to first make a preflight request.
        "Content-Type": "application/json"
      }
    };
    return {
      ...defaultHeaders,
      ...this.#companionHeaders
    };
  }
  onReceiveResponse(res) {
    const { headers } = res;
    const state = this.uppy.getState();
    const companion = state.companion || {};
    const host = this.opts.companionUrl;
    if (headers.has("i-am") && headers.get("i-am") !== companion[host]) {
      this.uppy.setState({
        companion: { ...companion, [host]: headers.get("i-am") }
      });
    }
  }
  #getUrl(url) {
    if (/^(https?:|)\/\//.test(url)) {
      return url;
    }
    return `${this.hostname}/${url}`;
  }
  async request({ path, method = "GET", data, skipPostResponse, signal }) {
    try {
      const headers = await this.headers(!data);
      const response = await fetchWithNetworkError(this.#getUrl(path), {
        method,
        signal,
        headers,
        credentials: this.opts.companionCookiesRule || "same-origin",
        body: data ? JSON.stringify(data) : null
      });
      if (!skipPostResponse)
        this.onReceiveResponse(response);
      return await handleJSONResponse(response);
    } catch (err) {
      if (err.isAuthError || err.name === "UserFacingApiError" || err.name === "AbortError")
        throw err;
      throw new ErrorWithCause(`Could not ${method} ${this.#getUrl(path)}`, {
        cause: err
      });
    }
  }
  async get(path, options) {
    return this.request({ ...options, path });
  }
  async post(path, data, options) {
    return this.request({ ...options, path, method: "POST", data });
  }
  async delete(path, data, options) {
    return this.request({ ...options, path, method: "DELETE", data });
  }
  /**
   * Remote uploading consists of two steps:
   * 1. #requestSocketToken which starts the download/upload in companion and returns a unique token for the upload.
   * Then companion will halt the upload until:
   * 2. #awaitRemoteFileUpload is called, which will open/ensure a websocket connection towards companion, with the
   * previously generated token provided. It returns a promise that will resolve/reject once the file has finished
   * uploading or is otherwise done (failed, canceled)
   */
  async uploadRemoteFile(file, reqBody, options) {
    try {
      const { signal, getQueue } = options || {};
      return await pRetry(async () => {
        const existingServerToken = this.uppy.getFile(file.id)?.serverToken;
        if (existingServerToken != null) {
          this.uppy.log(`Connecting to exiting websocket ${existingServerToken}`);
          return this.#awaitRemoteFileUpload({
            file,
            queue: getQueue(),
            signal
          });
        }
        const queueRequestSocketToken = getQueue().wrapPromiseFunction(async (...args) => {
          try {
            return await this.#requestSocketToken(...args);
          } catch (outerErr) {
            if (outerErr.isAuthError)
              throw new AbortError(outerErr);
            if (outerErr.cause == null)
              throw outerErr;
            const err = outerErr.cause;
            const isRetryableHttpError = () => [408, 409, 429, 418, 423].includes(err.statusCode) || err.statusCode >= 500 && err.statusCode <= 599 && ![501, 505].includes(err.statusCode);
            if (err.name === "HttpError" && !isRetryableHttpError())
              throw new AbortError(err);
            throw err;
          }
        }, { priority: -1 });
        const serverToken = await queueRequestSocketToken({
          file,
          postBody: reqBody,
          signal
        }).abortOn(signal);
        if (!this.uppy.getFile(file.id))
          return void 0;
        this.uppy.setFileState(file.id, { serverToken });
        return this.#awaitRemoteFileUpload({
          file: this.uppy.getFile(file.id),
          // re-fetching file because it might have changed in the meantime
          queue: getQueue(),
          signal
        });
      }, {
        retries: retryCount,
        signal,
        onFailedAttempt: (err) => this.uppy.log(`Retrying upload due to: ${err.message}`, "warning")
      });
    } catch (err) {
      if (err.name === "AbortError") {
        return void 0;
      }
      this.uppy.emit("upload-error", file, err);
      throw err;
    }
  }
  #requestSocketToken = async ({ file, postBody, signal }) => {
    if (file.remote?.url == null) {
      throw new Error("Cannot connect to an undefined URL");
    }
    const res = await this.post(file.remote.url, {
      ...file.remote.body,
      ...postBody
    }, { signal });
    return res.token;
  };
  /**
   * This method will ensure a websocket for the specified file and returns a promise that resolves
   * when the file has finished downloading, or rejects if it fails.
   * It will retry if the websocket gets disconnected
   */
  async #awaitRemoteFileUpload({ file, queue, signal }) {
    let removeEventHandlers;
    const { capabilities } = this.uppy.getState();
    try {
      return await new Promise((resolve, reject) => {
        const token = file.serverToken;
        const host = getSocketHost(file.remote.companionUrl);
        let socket;
        let socketAbortController;
        let activityTimeout;
        let { isPaused } = file;
        const socketSend = (action, payload) => {
          if (socket == null || socket.readyState !== socket.OPEN) {
            this.uppy.log(`Cannot send "${action}" to socket ${file.id} because the socket state was ${String(socket?.readyState)}`, "warning");
            return;
          }
          socket.send(JSON.stringify({
            action,
            payload: payload ?? {}
          }));
        };
        function sendState() {
          if (!capabilities.resumableUploads)
            return;
          if (isPaused)
            socketSend("pause");
          else
            socketSend("resume");
        }
        const createWebsocket = async () => {
          if (socketAbortController)
            socketAbortController.abort();
          socketAbortController = new AbortController();
          const onFatalError = (err) => {
            this.uppy.setFileState(file.id, { serverToken: null });
            socketAbortController?.abort?.();
            reject(err);
          };
          function resetActivityTimeout() {
            clearTimeout(activityTimeout);
            if (isPaused)
              return;
            activityTimeout = setTimeout(() => onFatalError(new Error("Timeout waiting for message from Companion socket")), socketActivityTimeoutMs);
          }
          try {
            await queue.wrapPromiseFunction(async () => {
              const reconnectWebsocket = async () => new Promise((_2, rejectSocket) => {
                socket = new WebSocket(`${host}/api/${token}`);
                resetActivityTimeout();
                socket.addEventListener("close", () => {
                  socket = void 0;
                  rejectSocket(new Error("Socket closed unexpectedly"));
                });
                socket.addEventListener("error", (error) => {
                  this.uppy.log(`Companion socket error ${JSON.stringify(error)}, closing socket`, "warning");
                  socket?.close();
                });
                socket.addEventListener("open", () => {
                  sendState();
                });
                socket.addEventListener("message", (e2) => {
                  resetActivityTimeout();
                  try {
                    const { action, payload } = JSON.parse(e2.data);
                    switch (action) {
                      case "progress": {
                        emitSocketProgress(this, payload, this.uppy.getFile(file.id));
                        break;
                      }
                      case "success": {
                        const text = payload.response?.responseText;
                        this.uppy.emit("upload-success", this.uppy.getFile(file.id), {
                          uploadURL: payload.url,
                          status: payload.response?.status ?? 200,
                          body: text ? JSON.parse(text) : void 0
                        });
                        socketAbortController?.abort?.();
                        resolve();
                        break;
                      }
                      case "error": {
                        const { message } = payload.error;
                        throw Object.assign(new Error(message), {
                          cause: payload.error
                        });
                      }
                      default:
                        this.uppy.log(`Companion socket unknown action ${action}`, "warning");
                    }
                  } catch (err) {
                    onFatalError(err);
                  }
                });
                const closeSocket = () => {
                  this.uppy.log(`Closing socket ${file.id}`);
                  clearTimeout(activityTimeout);
                  if (socket)
                    socket.close();
                  socket = void 0;
                };
                socketAbortController.signal.addEventListener("abort", () => {
                  closeSocket();
                });
              });
              await pRetry(reconnectWebsocket, {
                retries: retryCount,
                signal: socketAbortController.signal,
                onFailedAttempt: () => {
                  if (socketAbortController.signal.aborted)
                    return;
                  this.uppy.log(`Retrying websocket ${file.id}`);
                }
              });
            })().abortOn(socketAbortController.signal);
          } catch (err) {
            if (socketAbortController.signal.aborted)
              return;
            onFatalError(err);
          }
        };
        const pause = (newPausedState) => {
          if (!capabilities.resumableUploads)
            return;
          isPaused = newPausedState;
          if (socket)
            sendState();
        };
        const onFileRemove = (targetFile) => {
          if (!capabilities.individualCancellation)
            return;
          if (targetFile.id !== file.id)
            return;
          socketSend("cancel");
          socketAbortController?.abort?.();
          this.uppy.log(`upload ${file.id} was removed`);
          resolve();
        };
        const onCancelAll = () => {
          socketSend("cancel");
          socketAbortController?.abort?.();
          this.uppy.log(`upload ${file.id} was canceled`);
          resolve();
        };
        const onFilePausedChange = (targetFile, newPausedState) => {
          if (targetFile?.id !== file.id)
            return;
          pause(newPausedState);
        };
        const onPauseAll = () => pause(true);
        const onResumeAll = () => pause(false);
        this.uppy.on("file-removed", onFileRemove);
        this.uppy.on("cancel-all", onCancelAll);
        this.uppy.on("upload-pause", onFilePausedChange);
        this.uppy.on("pause-all", onPauseAll);
        this.uppy.on("resume-all", onResumeAll);
        removeEventHandlers = () => {
          this.uppy.off("file-removed", onFileRemove);
          this.uppy.off("cancel-all", onCancelAll);
          this.uppy.off("upload-pause", onFilePausedChange);
          this.uppy.off("pause-all", onPauseAll);
          this.uppy.off("resume-all", onResumeAll);
        };
        signal.addEventListener("abort", () => {
          socketAbortController?.abort();
        });
        createWebsocket();
      });
    } finally {
      removeEventHandlers?.();
    }
  }
}
class EventManager {
  #uppy;
  #events = [];
  constructor(uppy) {
    this.#uppy = uppy;
  }
  on(event, fn2) {
    this.#events.push([event, fn2]);
    return this.#uppy.on(event, fn2);
  }
  remove() {
    for (const [event, fn2] of this.#events.splice(0)) {
      this.#uppy.off(event, fn2);
    }
  }
  onFilePause(fileID, cb) {
    this.on("upload-pause", (file, isPaused) => {
      if (fileID === file?.id) {
        cb(isPaused);
      }
    });
  }
  onFileRemove(fileID, cb) {
    this.on("file-removed", (file) => {
      if (fileID === file.id)
        cb(file.id);
    });
  }
  onPause(fileID, cb) {
    this.on("upload-pause", (file, isPaused) => {
      if (fileID === file?.id) {
        cb(isPaused);
      }
    });
  }
  onRetry(fileID, cb) {
    this.on("upload-retry", (file) => {
      if (fileID === file?.id) {
        cb();
      }
    });
  }
  onRetryAll(fileID, cb) {
    this.on("retry-all", () => {
      if (!this.#uppy.getFile(fileID))
        return;
      cb();
    });
  }
  onPauseAll(fileID, cb) {
    this.on("pause-all", () => {
      if (!this.#uppy.getFile(fileID))
        return;
      cb();
    });
  }
  onCancelAll(fileID, eventHandler) {
    this.on("cancel-all", (...args) => {
      if (!this.#uppy.getFile(fileID))
        return;
      eventHandler(...args);
    });
  }
  onResumeAll(fileID, cb) {
    this.on("resume-all", () => {
      if (!this.#uppy.getFile(fileID))
        return;
      cb();
    });
  }
}
const { AbortController: AbortController$1 } = globalThis;
const createAbortError = (message = "Aborted", options) => {
  const err = new DOMException(message, "AbortError");
  if (options != null && hasProperty(options, "cause")) {
    Object.defineProperty(err, "cause", {
      // @ts-expect-error TS is drunk
      __proto__: null,
      configurable: true,
      writable: true,
      value: options.cause
    });
  }
  return err;
};
function filterNonFailedFiles(files) {
  const hasError = (file) => "error" in file && !!file.error;
  return files.filter((file) => !hasError(file));
}
function filterFilesToEmitUploadStarted(files) {
  return files.filter((file) => !file.progress?.uploadStarted || !file.isRestored);
}
function getAllowedMetaFields(fields, meta) {
  if (fields === true) {
    return Object.keys(meta);
  }
  if (Array.isArray(fields)) {
    return fields;
  }
  return [];
}
function createCancelError(cause) {
  return new Error("Cancelled", { cause });
}
function abortOn(signal) {
  if (signal != null) {
    const abortPromise = () => this.abort(signal.reason);
    signal.addEventListener("abort", abortPromise, { once: true });
    const removeAbortListener = () => {
      signal.removeEventListener("abort", abortPromise);
    };
    this.then?.(removeAbortListener, removeAbortListener);
  }
  return this;
}
class RateLimitedQueue {
  #activeRequests = 0;
  #queuedHandlers = [];
  #paused = false;
  #pauseTimer;
  #downLimit = 1;
  #upperLimit;
  #rateLimitingTimer;
  limit;
  constructor(limit) {
    if (typeof limit !== "number" || limit === 0) {
      this.limit = Infinity;
    } else {
      this.limit = limit;
    }
  }
  #call(fn2) {
    this.#activeRequests += 1;
    let done = false;
    let cancelActive;
    try {
      cancelActive = fn2();
    } catch (err) {
      this.#activeRequests -= 1;
      throw err;
    }
    return {
      abort: (cause) => {
        if (done)
          return;
        done = true;
        this.#activeRequests -= 1;
        cancelActive?.(cause);
        this.#queueNext();
      },
      done: () => {
        if (done)
          return;
        done = true;
        this.#activeRequests -= 1;
        this.#queueNext();
      }
    };
  }
  #queueNext() {
    queueMicrotask(() => this.#next());
  }
  #next() {
    if (this.#paused || this.#activeRequests >= this.limit) {
      return;
    }
    if (this.#queuedHandlers.length === 0) {
      return;
    }
    const next = this.#queuedHandlers.shift();
    if (next == null) {
      throw new Error("Invariant violation: next is null");
    }
    const handler = this.#call(next.fn);
    next.abort = handler.abort;
    next.done = handler.done;
  }
  #queue(fn2, options) {
    const handler = {
      fn: fn2,
      priority: options?.priority || 0,
      abort: () => {
        this.#dequeue(handler);
      },
      done: () => {
        throw new Error("Cannot mark a queued request as done: this indicates a bug");
      }
    };
    const index = this.#queuedHandlers.findIndex((other) => {
      return handler.priority > other.priority;
    });
    if (index === -1) {
      this.#queuedHandlers.push(handler);
    } else {
      this.#queuedHandlers.splice(index, 0, handler);
    }
    return handler;
  }
  #dequeue(handler) {
    const index = this.#queuedHandlers.indexOf(handler);
    if (index !== -1) {
      this.#queuedHandlers.splice(index, 1);
    }
  }
  run(fn2, queueOptions) {
    if (!this.#paused && this.#activeRequests < this.limit) {
      return this.#call(fn2);
    }
    return this.#queue(fn2, queueOptions);
  }
  wrapSyncFunction(fn2, queueOptions) {
    return (...args) => {
      const queuedRequest = this.run(() => {
        fn2(...args);
        queueMicrotask(() => queuedRequest.done());
        return () => {
        };
      }, queueOptions);
      return {
        abortOn,
        abort() {
          queuedRequest.abort();
        }
      };
    };
  }
  wrapPromiseFunction(fn2, queueOptions) {
    return (...args) => {
      let queuedRequest;
      const outerPromise = new Promise((resolve, reject) => {
        queuedRequest = this.run(() => {
          let cancelError;
          let innerPromise;
          try {
            innerPromise = Promise.resolve(fn2(...args));
          } catch (err) {
            innerPromise = Promise.reject(err);
          }
          innerPromise.then((result) => {
            if (cancelError) {
              reject(cancelError);
            } else {
              queuedRequest.done();
              resolve(result);
            }
          }, (err) => {
            if (cancelError) {
              reject(cancelError);
            } else {
              queuedRequest.done();
              reject(err);
            }
          });
          return (cause) => {
            cancelError = createCancelError(cause);
          };
        }, queueOptions);
      });
      outerPromise.abort = (cause) => {
        queuedRequest.abort(cause);
      };
      outerPromise.abortOn = abortOn;
      return outerPromise;
    };
  }
  resume() {
    this.#paused = false;
    clearTimeout(this.#pauseTimer);
    for (let i2 = 0; i2 < this.limit; i2++) {
      this.#queueNext();
    }
  }
  #resume = () => this.resume();
  /**
   * Freezes the queue for a while or indefinitely.
   *
   * @param {number | null } [duration] Duration for the pause to happen, in milliseconds.
   *                                    If omitted, the queue won't resume automatically.
   */
  pause(duration2 = null) {
    this.#paused = true;
    clearTimeout(this.#pauseTimer);
    if (duration2 != null) {
      this.#pauseTimer = setTimeout(this.#resume, duration2);
    }
  }
  /**
   * Pauses the queue for a duration, and lower the limit of concurrent requests
   * when the queue resumes. When the queue resumes, it tries to progressively
   * increase the limit in `this.#increaseLimit` until another call is made to
   * `this.rateLimit`.
   * Call this function when using the RateLimitedQueue for network requests and
   * the remote server responds with 429 HTTP code.
   *
   * @param {number} duration in milliseconds.
   */
  rateLimit(duration2) {
    clearTimeout(this.#rateLimitingTimer);
    this.pause(duration2);
    if (this.limit > 1 && Number.isFinite(this.limit)) {
      this.#upperLimit = this.limit - 1;
      this.limit = this.#downLimit;
      this.#rateLimitingTimer = setTimeout(this.#increaseLimit, duration2);
    }
  }
  #increaseLimit = () => {
    if (this.#paused) {
      this.#rateLimitingTimer = setTimeout(this.#increaseLimit, 0);
      return;
    }
    this.#downLimit = this.limit;
    this.limit = Math.ceil((this.#upperLimit + this.#downLimit) / 2);
    for (let i2 = this.#downLimit; i2 <= this.limit; i2++) {
      this.#queueNext();
    }
    if (this.#upperLimit - this.#downLimit > 3) {
      this.#rateLimitingTimer = setTimeout(this.#increaseLimit, 2e3);
    } else {
      this.#downLimit = Math.floor(this.#downLimit / 2);
    }
  };
  get isPaused() {
    return this.#paused;
  }
}
const internalRateLimitedQueue = Symbol("__queue");
const version$1 = "4.3.2";
const packageJson$1 = {
  version: version$1
};
function createCanonicalRequest({ method = "PUT", CanonicalUri = "/", CanonicalQueryString = "", SignedHeaders, HashedPayload }) {
  const headerKeys = Object.keys(SignedHeaders).map((k2) => k2.toLowerCase()).sort();
  return [
    method,
    CanonicalUri,
    CanonicalQueryString,
    ...headerKeys.map((k2) => `${k2}:${SignedHeaders[k2]}`),
    "",
    headerKeys.join(";"),
    HashedPayload
  ].join("\n");
}
const ec = new TextEncoder();
const algorithm = { name: "HMAC", hash: "SHA-256" };
async function digest(data) {
  const { subtle } = globalThis.crypto;
  return subtle.digest(algorithm.hash, ec.encode(data));
}
async function generateHmacKey(secret) {
  const { subtle } = globalThis.crypto;
  return subtle.importKey("raw", typeof secret === "string" ? ec.encode(secret) : secret, algorithm, false, ["sign"]);
}
function arrayBufferToHexString(arrayBuffer) {
  const byteArray = new Uint8Array(arrayBuffer);
  let hexString = "";
  for (let i2 = 0; i2 < byteArray.length; i2++) {
    hexString += byteArray[i2].toString(16).padStart(2, "0");
  }
  return hexString;
}
async function hash(key, data) {
  const { subtle } = globalThis.crypto;
  return subtle.sign(algorithm, await generateHmacKey(key), ec.encode(data));
}
async function createSignedURL({ accountKey, accountSecret, sessionToken, bucketName, Key, Region, expires, uploadId, partNumber }) {
  const Service = "s3";
  const host = `${Service}.${Region}.amazonaws.com`;
  const CanonicalUri = `/${bucketName}/${encodeURI(Key).replace(/[;?:@&=+$,#!'()*]/g, (c2) => `%${c2.charCodeAt(0).toString(16).toUpperCase()}`)}`;
  const payload = "UNSIGNED-PAYLOAD";
  const requestDateTime = (/* @__PURE__ */ new Date()).toISOString().replace(/[-:]|\.\d+/g, "");
  const date = requestDateTime.slice(0, 8);
  const scope = `${date}/${Region}/${Service}/aws4_request`;
  const url = new URL(`https://${host}${CanonicalUri}`);
  url.searchParams.set("X-Amz-Algorithm", "AWS4-HMAC-SHA256");
  url.searchParams.set("X-Amz-Content-Sha256", payload);
  url.searchParams.set("X-Amz-Credential", `${accountKey}/${scope}`);
  url.searchParams.set("X-Amz-Date", requestDateTime);
  url.searchParams.set("X-Amz-Expires", expires);
  url.searchParams.set("X-Amz-Security-Token", sessionToken);
  url.searchParams.set("X-Amz-SignedHeaders", "host");
  if (partNumber)
    url.searchParams.set("partNumber", partNumber);
  if (uploadId)
    url.searchParams.set("uploadId", uploadId);
  url.searchParams.set("x-id", partNumber && uploadId ? "UploadPart" : "PutObject");
  const canonical = createCanonicalRequest({
    CanonicalUri,
    CanonicalQueryString: url.search.slice(1),
    SignedHeaders: {
      host
    },
    HashedPayload: payload
  });
  const hashedCanonical = arrayBufferToHexString(await digest(canonical));
  const stringToSign = [
    `AWS4-HMAC-SHA256`,
    // The algorithm used to create the hash of the canonical request.
    requestDateTime,
    // The date and time used in the credential scope.
    scope,
    // The credential scope. This restricts the resulting signature to the specified Region and service.
    hashedCanonical
    // The hash of the canonical request.
  ].join("\n");
  const kDate = await hash(`AWS4${accountSecret}`, date);
  const kRegion = await hash(kDate, Region);
  const kService = await hash(kRegion, Service);
  const kSigning = await hash(kService, "aws4_request");
  const signature = arrayBufferToHexString(await hash(kSigning, stringToSign));
  url.searchParams.set("X-Amz-Signature", signature);
  return url;
}
const MB$2 = 1024 * 1024;
const defaultOptions$2 = {
  getChunkSize(file) {
    return Math.ceil(file.size / 1e4);
  },
  onProgress() {
  },
  onPartComplete() {
  },
  onSuccess() {
  },
  onError(err) {
    throw err;
  }
};
function ensureInt(value) {
  if (typeof value === "string") {
    return parseInt(value, 10);
  }
  if (typeof value === "number") {
    return value;
  }
  throw new TypeError("Expected a number");
}
const pausingUploadReason = Symbol("pausing upload, not an actual error");
class MultipartUploader {
  options;
  #abortController = new AbortController$1();
  #chunks = [];
  #chunkState = [];
  /**
   * The (un-chunked) data to upload.
   */
  #data;
  #file;
  #uploadHasStarted = false;
  #onError;
  #onSuccess;
  #shouldUseMultipart;
  #isRestoring;
  #onReject = (err) => err?.cause === pausingUploadReason ? null : this.#onError(err);
  #maxMultipartParts = 1e4;
  #minPartSize = 5 * MB$2;
  constructor(data, options) {
    this.options = {
      ...defaultOptions$2,
      ...options
    };
    this.options.getChunkSize ??= defaultOptions$2.getChunkSize;
    this.#data = data;
    this.#file = options.file;
    this.#onSuccess = this.options.onSuccess;
    this.#onError = this.options.onError;
    this.#shouldUseMultipart = this.options.shouldUseMultipart;
    this.#isRestoring = options.uploadId && options.key;
    this.#initChunks();
  }
  // initChunks checks the user preference for using multipart uploads (opts.shouldUseMultipart)
  // and calculates the optimal part size. When using multipart part uploads every part except for the last has
  // to be at least 5 MB and there can be no more than 10K parts.
  // This means we sometimes need to change the preferred part size from the user in order to meet these requirements.
  #initChunks() {
    const fileSize = this.#data.size;
    const shouldUseMultipart = typeof this.#shouldUseMultipart === "function" ? this.#shouldUseMultipart(this.#file) : Boolean(this.#shouldUseMultipart);
    if (shouldUseMultipart && fileSize > this.#minPartSize) {
      let chunkSize = Math.max(
        this.options.getChunkSize(this.#data),
        // Math.max can take undefined but TS does not think so
        this.#minPartSize
      );
      let arraySize = Math.floor(fileSize / chunkSize);
      if (arraySize > this.#maxMultipartParts) {
        arraySize = this.#maxMultipartParts;
        chunkSize = fileSize / this.#maxMultipartParts;
      }
      this.#chunks = Array(arraySize);
      for (let offset = 0, j2 = 0; offset < fileSize; offset += chunkSize, j2++) {
        const end = Math.min(fileSize, offset + chunkSize);
        const getData = () => {
          const i2 = offset;
          return this.#data.slice(i2, end);
        };
        this.#chunks[j2] = {
          getData,
          onProgress: this.#onPartProgress(j2),
          onComplete: this.#onPartComplete(j2),
          shouldUseMultipart
        };
        if (this.#isRestoring) {
          const size = offset + chunkSize > fileSize ? fileSize - offset : chunkSize;
          this.#chunks[j2].setAsUploaded = () => {
            this.#chunks[j2] = null;
            this.#chunkState[j2].uploaded = size;
          };
        }
      }
    } else {
      this.#chunks = [
        {
          getData: () => this.#data,
          onProgress: this.#onPartProgress(0),
          onComplete: this.#onPartComplete(0),
          shouldUseMultipart
        }
      ];
    }
    this.#chunkState = this.#chunks.map(() => ({ uploaded: 0 }));
  }
  #createUpload() {
    this.options.companionComm.uploadFile(this.#file, this.#chunks, this.#abortController.signal).then(this.#onSuccess, this.#onReject);
    this.#uploadHasStarted = true;
  }
  #resumeUpload() {
    this.options.companionComm.resumeUploadFile(this.#file, this.#chunks, this.#abortController.signal).then(this.#onSuccess, this.#onReject);
  }
  #onPartProgress = (index) => (ev) => {
    if (!ev.lengthComputable)
      return;
    this.#chunkState[index].uploaded = ensureInt(ev.loaded);
    const totalUploaded = this.#chunkState.reduce((n2, c2) => n2 + c2.uploaded, 0);
    this.options.onProgress(totalUploaded, this.#data.size);
  };
  #onPartComplete = (index) => (etag) => {
    this.#chunks[index] = null;
    this.#chunkState[index].etag = etag;
    this.#chunkState[index].done = true;
    const part = {
      PartNumber: index + 1,
      ETag: etag
    };
    this.options.onPartComplete(part);
  };
  #abortUpload() {
    this.#abortController.abort();
    this.options.companionComm.abortFileUpload(this.#file).catch((err) => this.options.log(err));
  }
  start() {
    if (this.#uploadHasStarted) {
      if (!this.#abortController.signal.aborted)
        this.#abortController.abort(pausingUploadReason);
      this.#abortController = new AbortController$1();
      this.#resumeUpload();
    } else if (this.#isRestoring) {
      this.options.companionComm.restoreUploadFile(this.#file, {
        uploadId: this.options.uploadId,
        key: this.options.key
      });
      this.#resumeUpload();
    } else {
      this.#createUpload();
    }
  }
  pause() {
    this.#abortController.abort(pausingUploadReason);
    this.#abortController = new AbortController$1();
  }
  abort(opts) {
    if (opts?.really)
      this.#abortUpload();
    else
      this.pause();
  }
  [Symbol.for("uppy test: getChunkState")]() {
    return this.#chunkState;
  }
}
function throwIfAborted(signal) {
  if (signal?.aborted) {
    throw createAbortError("The operation was aborted", {
      cause: signal.reason
    });
  }
}
function removeMetadataFromURL(urlString) {
  const urlObject = new URL(urlString);
  urlObject.search = "";
  urlObject.hash = "";
  return urlObject.href;
}
class HTTPCommunicationQueue {
  #abortMultipartUpload;
  #cache = /* @__PURE__ */ new WeakMap();
  #createMultipartUpload;
  #fetchSignature;
  #getUploadParameters;
  #listParts;
  #previousRetryDelay;
  #requests;
  #retryDelays;
  #sendCompletionRequest;
  #setS3MultipartState;
  #uploadPartBytes;
  #getFile;
  constructor(requests, options, setS3MultipartState, getFile) {
    this.#requests = requests;
    this.#setS3MultipartState = setS3MultipartState;
    this.#getFile = getFile;
    this.setOptions(options);
  }
  setOptions(options) {
    const requests = this.#requests;
    if ("abortMultipartUpload" in options) {
      this.#abortMultipartUpload = requests.wrapPromiseFunction(options.abortMultipartUpload, { priority: 1 });
    }
    if ("createMultipartUpload" in options) {
      this.#createMultipartUpload = requests.wrapPromiseFunction(options.createMultipartUpload, { priority: -1 });
    }
    if ("signPart" in options) {
      this.#fetchSignature = requests.wrapPromiseFunction(options.signPart);
    }
    if ("listParts" in options) {
      this.#listParts = requests.wrapPromiseFunction(options.listParts);
    }
    if ("completeMultipartUpload" in options) {
      this.#sendCompletionRequest = requests.wrapPromiseFunction(options.completeMultipartUpload, { priority: 1 });
    }
    if ("retryDelays" in options) {
      this.#retryDelays = options.retryDelays ?? [];
    }
    if ("uploadPartBytes" in options) {
      this.#uploadPartBytes = requests.wrapPromiseFunction(options.uploadPartBytes, { priority: Infinity });
    }
    if ("getUploadParameters" in options) {
      this.#getUploadParameters = requests.wrapPromiseFunction(options.getUploadParameters);
    }
  }
  async #shouldRetry(err, retryDelayIterator) {
    const requests = this.#requests;
    const status = err?.source?.status;
    if (status == null) {
      return false;
    }
    if (status === 403 && err.message === "Request has expired") {
      if (!requests.isPaused) {
        if (requests.limit === 1 || this.#previousRetryDelay == null) {
          const next = retryDelayIterator.next();
          if (next == null || next.done) {
            return false;
          }
          this.#previousRetryDelay = next.value;
        }
        requests.rateLimit(0);
        await new Promise((resolve) => setTimeout(resolve, this.#previousRetryDelay));
      }
    } else if (status === 429) {
      if (!requests.isPaused) {
        const next = retryDelayIterator.next();
        if (next == null || next.done) {
          return false;
        }
        requests.rateLimit(next.value);
      }
    } else if (status > 400 && status < 500 && status !== 409) {
      return false;
    } else if (typeof navigator !== "undefined" && navigator.onLine === false) {
      if (!requests.isPaused) {
        requests.pause();
        window.addEventListener("online", () => {
          requests.resume();
        }, { once: true });
      }
    } else {
      const next = retryDelayIterator.next();
      if (next == null || next.done) {
        return false;
      }
      await new Promise((resolve) => setTimeout(resolve, next.value));
    }
    return true;
  }
  async getUploadId(file, signal) {
    let cachedResult;
    for (; ; ) {
      cachedResult = this.#cache.get(file.data);
      if (cachedResult == null)
        break;
      try {
        return await cachedResult;
      } catch {
      }
    }
    const promise = this.#createMultipartUpload(this.#getFile(file), signal);
    const abortPromise = () => {
      promise.abort(signal.reason);
      this.#cache.delete(file.data);
    };
    signal.addEventListener("abort", abortPromise, { once: true });
    this.#cache.set(file.data, promise);
    promise.then(async (result) => {
      signal.removeEventListener("abort", abortPromise);
      this.#setS3MultipartState(file, result);
      this.#cache.set(file.data, result);
    }, () => {
      signal.removeEventListener("abort", abortPromise);
      this.#cache.delete(file.data);
    });
    return promise;
  }
  async abortFileUpload(file) {
    const result = this.#cache.get(file.data);
    if (result == null) {
      return;
    }
    this.#cache.delete(file.data);
    this.#setS3MultipartState(file, /* @__PURE__ */ Object.create(null));
    let awaitedResult;
    try {
      awaitedResult = await result;
    } catch {
      return;
    }
    await this.#abortMultipartUpload(this.#getFile(file), awaitedResult);
  }
  async #nonMultipartUpload(file, chunk, signal) {
    const { method = "POST", url, fields, headers } = await this.#getUploadParameters(this.#getFile(file), {
      signal
    }).abortOn(signal);
    let body;
    const data = chunk.getData();
    if (method.toUpperCase() === "POST") {
      const formData = new FormData();
      Object.entries(fields).forEach(([key2, value]) => formData.set(key2, value));
      formData.set("file", data);
      body = formData;
    } else {
      body = data;
    }
    const { onProgress, onComplete } = chunk;
    const result = await this.#uploadPartBytes({
      signature: { url, headers, method },
      body,
      size: data.size,
      onProgress,
      onComplete,
      signal
    }).abortOn(signal);
    const key = fields?.key;
    this.#setS3MultipartState(file, { key });
    return {
      ...result,
      location: result.location ?? removeMetadataFromURL(url),
      bucket: fields?.bucket,
      key
    };
  }
  async uploadFile(file, chunks2, signal) {
    throwIfAborted(signal);
    if (chunks2.length === 1 && !chunks2[0].shouldUseMultipart) {
      return this.#nonMultipartUpload(file, chunks2[0], signal);
    }
    const { uploadId, key } = await this.getUploadId(file, signal);
    throwIfAborted(signal);
    try {
      const parts = await Promise.all(chunks2.map((chunk, i2) => this.uploadChunk(file, i2 + 1, chunk, signal)));
      throwIfAborted(signal);
      return await this.#sendCompletionRequest(this.#getFile(file), { key, uploadId, parts, signal }, signal).abortOn(signal);
    } catch (err) {
      if (err?.cause !== pausingUploadReason && err?.name !== "AbortError") {
        this.abortFileUpload(file);
      }
      throw err;
    }
  }
  restoreUploadFile(file, uploadIdAndKey) {
    this.#cache.set(file.data, uploadIdAndKey);
  }
  async resumeUploadFile(file, chunks2, signal) {
    throwIfAborted(signal);
    if (chunks2.length === 1 && chunks2[0] != null && !chunks2[0].shouldUseMultipart) {
      return this.#nonMultipartUpload(file, chunks2[0], signal);
    }
    const { uploadId, key } = await this.getUploadId(file, signal);
    throwIfAborted(signal);
    const alreadyUploadedParts = await this.#listParts(this.#getFile(file), { uploadId, key, signal }, signal).abortOn(signal);
    throwIfAborted(signal);
    const parts = await Promise.all(chunks2.map((chunk, i2) => {
      const partNumber = i2 + 1;
      const alreadyUploadedInfo = alreadyUploadedParts.find(({ PartNumber }) => PartNumber === partNumber);
      if (alreadyUploadedInfo == null) {
        return this.uploadChunk(file, partNumber, chunk, signal);
      }
      chunk?.setAsUploaded?.();
      return { PartNumber: partNumber, ETag: alreadyUploadedInfo.ETag };
    }));
    throwIfAborted(signal);
    return this.#sendCompletionRequest(this.#getFile(file), { key, uploadId, parts, signal }, signal).abortOn(signal);
  }
  async uploadChunk(file, partNumber, chunk, signal) {
    throwIfAborted(signal);
    const { uploadId, key } = await this.getUploadId(file, signal);
    const signatureRetryIterator = this.#retryDelays.values();
    const chunkRetryIterator = this.#retryDelays.values();
    const shouldRetrySignature = () => {
      const next = signatureRetryIterator.next();
      if (next == null || next.done) {
        return null;
      }
      return next.value;
    };
    for (; ; ) {
      throwIfAborted(signal);
      const chunkData = chunk.getData();
      const { onProgress, onComplete } = chunk;
      let signature;
      try {
        signature = await this.#fetchSignature(this.#getFile(file), {
          // Always defined for multipart uploads
          uploadId,
          key,
          partNumber,
          body: chunkData,
          signal
        }).abortOn(signal);
      } catch (err) {
        const timeout = shouldRetrySignature();
        if (timeout == null || signal.aborted) {
          throw err;
        }
        await new Promise((resolve) => setTimeout(resolve, timeout));
        continue;
      }
      throwIfAborted(signal);
      try {
        return {
          PartNumber: partNumber,
          ...await this.#uploadPartBytes({
            signature,
            body: chunkData,
            size: chunkData.size,
            onProgress,
            onComplete,
            signal
          }).abortOn(signal)
        };
      } catch (err) {
        if (!await this.#shouldRetry(err, chunkRetryIterator))
          throw err;
      }
    }
  }
}
function assertServerError(res) {
  if (res?.error) {
    const error = new Error(res.message);
    Object.assign(error, res.error);
    throw error;
  }
  return res;
}
function getExpiry(credentials) {
  const expirationDate = credentials.Expiration;
  if (expirationDate) {
    const timeUntilExpiry = Math.floor((new Date(expirationDate) - Date.now()) / 1e3);
    if (timeUntilExpiry > 9) {
      return timeUntilExpiry;
    }
  }
  return void 0;
}
function getAllowedMetadata({ meta, allowedMetaFields, querify = false }) {
  const metaFields = allowedMetaFields ?? Object.keys(meta);
  if (!meta)
    return {};
  return Object.fromEntries(metaFields.filter((key) => meta[key] != null).map((key) => {
    const realKey = querify ? `metadata[${key}]` : key;
    const value = String(meta[key]);
    return [realKey, value];
  }));
}
const defaultOptions$1 = {
  allowedMetaFields: true,
  limit: 6,
  getTemporarySecurityCredentials: false,
  shouldUseMultipart: (file) => (file.size || 0) > 100 * 1024 * 1024,
  retryDelays: [0, 1e3, 3e3, 5e3]
};
class AwsS3Multipart extends BasePlugin {
  static VERSION = packageJson$1.version;
  #companionCommunicationQueue;
  #client;
  requests;
  uploaderEvents;
  uploaders;
  constructor(uppy, opts) {
    super(uppy, {
      ...defaultOptions$1,
      uploadPartBytes: AwsS3Multipart.uploadPartBytes,
      createMultipartUpload: null,
      listParts: null,
      abortMultipartUpload: null,
      completeMultipartUpload: null,
      signPart: null,
      getUploadParameters: null,
      ...opts
    });
    this.type = "uploader";
    this.id = this.opts.id || "AwsS3Multipart";
    this.#setClient(opts);
    const dynamicDefaultOptions = {
      createMultipartUpload: this.createMultipartUpload,
      listParts: this.listParts,
      abortMultipartUpload: this.abortMultipartUpload,
      completeMultipartUpload: this.completeMultipartUpload,
      signPart: opts?.getTemporarySecurityCredentials ? this.createSignedURL : this.signPart,
      getUploadParameters: opts?.getTemporarySecurityCredentials ? this.createSignedURL : this.getUploadParameters
    };
    for (const key of Object.keys(dynamicDefaultOptions)) {
      if (this.opts[key] == null) {
        this.opts[key] = dynamicDefaultOptions[key].bind(this);
      }
    }
    this.requests = this.opts.rateLimitedQueue ?? new RateLimitedQueue(this.opts.limit);
    this.#companionCommunicationQueue = new HTTPCommunicationQueue(this.requests, this.opts, this.#setS3MultipartState, this.#getFile);
    this.uploaders = /* @__PURE__ */ Object.create(null);
    this.uploaderEvents = /* @__PURE__ */ Object.create(null);
  }
  [Symbol.for("uppy test: getClient")]() {
    return this.#client;
  }
  #setClient(opts) {
    if (opts == null || !("endpoint" in opts || "companionUrl" in opts || "headers" in opts || "companionHeaders" in opts || "cookiesRule" in opts || "companionCookiesRule" in opts))
      return;
    if ("companionUrl" in opts && !("endpoint" in opts)) {
      this.uppy.log("`companionUrl` option has been removed in @uppy/aws-s3, use `endpoint` instead.", "warning");
    }
    if ("companionHeaders" in opts && !("headers" in opts)) {
      this.uppy.log("`companionHeaders` option has been removed in @uppy/aws-s3, use `headers` instead.", "warning");
    }
    if ("companionCookiesRule" in opts && !("cookiesRule" in opts)) {
      this.uppy.log("`companionCookiesRule` option has been removed in @uppy/aws-s3, use `cookiesRule` instead.", "warning");
    }
    if ("endpoint" in opts) {
      this.#client = new RequestClient(this.uppy, {
        pluginId: this.id,
        provider: "AWS",
        companionUrl: this.opts.endpoint,
        companionHeaders: this.opts.headers,
        companionCookiesRule: this.opts.cookiesRule
      });
    } else {
      if ("headers" in opts) {
        this.#setCompanionHeaders();
      }
      if ("cookiesRule" in opts) {
        this.#client.opts.companionCookiesRule = opts.cookiesRule;
      }
    }
  }
  setOptions(newOptions) {
    this.#companionCommunicationQueue.setOptions(newOptions);
    super.setOptions(newOptions);
    this.#setClient(newOptions);
  }
  /**
   * Clean up all references for a file's upload: the MultipartUploader instance,
   * any events related to the file, and the Companion WebSocket connection.
   *
   * Set `opts.abort` to tell S3 that the multipart upload is cancelled and must be removed.
   * This should be done when the user cancels the upload, not when the upload is completed or errored.
   */
  resetUploaderReferences(fileID, opts) {
    if (this.uploaders[fileID]) {
      this.uploaders[fileID].abort({ really: opts?.abort || false });
      this.uploaders[fileID] = null;
    }
    if (this.uploaderEvents[fileID]) {
      this.uploaderEvents[fileID].remove();
      this.uploaderEvents[fileID] = null;
    }
  }
  #assertHost(method) {
    if (!this.#client) {
      throw new Error(`Expected a \`endpoint\` option containing a URL, or if you are not using Companion, a custom \`${method}\` implementation.`);
    }
  }
  createMultipartUpload(file, signal) {
    this.#assertHost("createMultipartUpload");
    throwIfAborted(signal);
    const allowedMetaFields = getAllowedMetaFields(this.opts.allowedMetaFields, file.meta);
    const metadata = getAllowedMetadata({ meta: file.meta, allowedMetaFields });
    return this.#client.post("s3/multipart", {
      filename: file.name,
      type: file.type,
      metadata
    }, { signal }).then(assertServerError);
  }
  listParts(file, { key, uploadId, signal }, oldSignal) {
    signal ??= oldSignal;
    this.#assertHost("listParts");
    throwIfAborted(signal);
    const filename = encodeURIComponent(key);
    return this.#client.get(`s3/multipart/${encodeURIComponent(uploadId)}?key=${filename}`, { signal }).then(assertServerError);
  }
  completeMultipartUpload(file, { key, uploadId, parts, signal }, oldSignal) {
    signal ??= oldSignal;
    this.#assertHost("completeMultipartUpload");
    throwIfAborted(signal);
    const filename = encodeURIComponent(key);
    const uploadIdEnc = encodeURIComponent(uploadId);
    return this.#client.post(`s3/multipart/${uploadIdEnc}/complete?key=${filename}`, { parts: parts.map(({ ETag, PartNumber }) => ({ ETag, PartNumber })) }, { signal }).then(assertServerError);
  }
  #cachedTemporaryCredentials;
  async #getTemporarySecurityCredentials(options) {
    throwIfAborted(options?.signal);
    if (this.#cachedTemporaryCredentials == null) {
      const { getTemporarySecurityCredentials } = this.opts;
      if (getTemporarySecurityCredentials === true) {
        this.#assertHost("getTemporarySecurityCredentials");
        this.#cachedTemporaryCredentials = this.#client.get("s3/sts", options).then(assertServerError);
      } else {
        this.#cachedTemporaryCredentials = getTemporarySecurityCredentials(options);
      }
      this.#cachedTemporaryCredentials = await this.#cachedTemporaryCredentials;
      setTimeout(() => {
        this.#cachedTemporaryCredentials = null;
      }, (getExpiry(this.#cachedTemporaryCredentials.credentials) || 0) * 500);
    }
    return this.#cachedTemporaryCredentials;
  }
  async createSignedURL(file, options) {
    const data = await this.#getTemporarySecurityCredentials(options);
    const expires = getExpiry(data.credentials) || 604800;
    const { uploadId, key, partNumber } = options;
    return {
      method: "PUT",
      expires,
      fields: {},
      url: `${await createSignedURL({
        accountKey: data.credentials.AccessKeyId,
        accountSecret: data.credentials.SecretAccessKey,
        sessionToken: data.credentials.SessionToken,
        expires,
        bucketName: data.bucket,
        Region: data.region,
        Key: key ?? `${crypto.randomUUID()}-${file.name}`,
        uploadId,
        partNumber
      })}`,
      // Provide content type header required by S3
      headers: {
        "Content-Type": file.type
      }
    };
  }
  signPart(file, { uploadId, key, partNumber, signal }) {
    this.#assertHost("signPart");
    throwIfAborted(signal);
    if (uploadId == null || key == null || partNumber == null) {
      throw new Error("Cannot sign without a key, an uploadId, and a partNumber");
    }
    const filename = encodeURIComponent(key);
    return this.#client.get(`s3/multipart/${encodeURIComponent(uploadId)}/${partNumber}?key=${filename}`, { signal }).then(assertServerError);
  }
  abortMultipartUpload(file, { key, uploadId, signal }) {
    this.#assertHost("abortMultipartUpload");
    const filename = encodeURIComponent(key);
    const uploadIdEnc = encodeURIComponent(uploadId);
    return this.#client.delete(`s3/multipart/${uploadIdEnc}?key=${filename}`, void 0, {
      signal
    }).then(assertServerError);
  }
  getUploadParameters(file, options) {
    this.#assertHost("getUploadParameters");
    const { meta } = file;
    const { type, name: filename } = meta;
    const allowedMetaFields = getAllowedMetaFields(this.opts.allowedMetaFields, file.meta);
    const metadata = getAllowedMetadata({
      meta,
      allowedMetaFields,
      querify: true
    });
    const query = new URLSearchParams({ filename, type, ...metadata });
    return this.#client.get(`s3/params?${query}`, options);
  }
  static async uploadPartBytes({ signature: { url, expires, headers, method = "PUT" }, body, size = body.size, onProgress, onComplete, signal }) {
    throwIfAborted(signal);
    if (url == null) {
      throw new Error("Cannot upload to an undefined URL");
    }
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }
      xhr.responseType = "text";
      if (typeof expires === "number") {
        xhr.timeout = expires * 1e3;
      }
      function onabort() {
        xhr.abort();
      }
      function cleanup() {
        signal?.removeEventListener("abort", onabort);
      }
      signal?.addEventListener("abort", onabort);
      xhr.upload.addEventListener("progress", (ev) => {
        onProgress(ev);
      });
      xhr.addEventListener("abort", () => {
        cleanup();
        reject(createAbortError());
      });
      xhr.addEventListener("timeout", () => {
        cleanup();
        const error = new Error("Request has expired");
        error.source = { status: 403 };
        reject(error);
      });
      xhr.addEventListener("load", () => {
        cleanup();
        if (xhr.status === 403 && xhr.responseText.includes("<Message>Request has expired</Message>")) {
          const error = new Error("Request has expired");
          error.source = xhr;
          reject(error);
          return;
        }
        if (xhr.status < 200 || xhr.status >= 300) {
          const error = new Error("Non 2xx");
          error.source = xhr;
          reject(error);
          return;
        }
        onProgress?.({ loaded: size, lengthComputable: true });
        const arr = xhr.getAllResponseHeaders().trim().split(/[\r\n]+/);
        const headersMap = { __proto__: null };
        for (const line of arr) {
          const parts = line.split(": ");
          const header = parts.shift();
          const value = parts.join(": ");
          headersMap[header] = value;
        }
        const { etag, location } = headersMap;
        if (method.toUpperCase() === "POST" && location == null) {
          console.error("@uppy/aws-s3: Could not read the Location header. This likely means CORS is not configured correctly on the S3 Bucket. See https://uppy.io/docs/aws-s3/#setting-up-your-s3-bucket");
        }
        if (etag == null) {
          console.error("@uppy/aws-s3: Could not read the ETag header. This likely means CORS is not configured correctly on the S3 Bucket. See https://uppy.io/docs/aws-s3/#setting-up-your-s3-bucket");
          return;
        }
        onComplete?.(etag);
        resolve({
          ...headersMap,
          ETag: etag
          // keep capitalised ETag for backwards compatiblity
        });
      });
      xhr.addEventListener("error", (ev) => {
        cleanup();
        const error = new Error("Unknown error");
        error.source = ev.target;
        reject(error);
      });
      xhr.send(body);
    });
  }
  #setS3MultipartState = (file, { key, uploadId }) => {
    const cFile = this.uppy.getFile(file.id);
    if (cFile == null) {
      return;
    }
    this.uppy.setFileState(file.id, {
      s3Multipart: {
        ...cFile.s3Multipart,
        key,
        uploadId
      }
    });
  };
  #getFile = (file) => {
    return this.uppy.getFile(file.id) || file;
  };
  #uploadLocalFile(file) {
    return new Promise((resolve, reject) => {
      const onProgress = (bytesUploaded, bytesTotal) => {
        const latestFile = this.uppy.getFile(file.id);
        this.uppy.emit("upload-progress", latestFile, {
          uploadStarted: latestFile.progress.uploadStarted ?? 0,
          bytesUploaded,
          bytesTotal
        });
      };
      const onError = (err) => {
        this.uppy.log(err);
        this.uppy.emit("upload-error", file, err);
        this.resetUploaderReferences(file.id);
        reject(err);
      };
      const onSuccess = (result) => {
        const uploadResp = {
          body: {
            ...result
          },
          status: 200,
          uploadURL: result.location
        };
        this.resetUploaderReferences(file.id);
        this.uppy.emit("upload-success", this.#getFile(file), uploadResp);
        if (result.location) {
          this.uppy.log(`Download ${file.name} from ${result.location}`);
        }
        resolve(void 0);
      };
      const upload = new MultipartUploader(file.data, {
        // .bind to pass the file object to each handler.
        companionComm: this.#companionCommunicationQueue,
        log: (...args) => this.uppy.log(...args),
        getChunkSize: this.opts.getChunkSize ? this.opts.getChunkSize.bind(this) : void 0,
        onProgress,
        onError,
        onSuccess,
        onPartComplete: (part) => {
          this.uppy.emit("s3-multipart:part-uploaded", this.#getFile(file), part);
        },
        file,
        shouldUseMultipart: this.opts.shouldUseMultipart,
        ...file.s3Multipart
      });
      this.uploaders[file.id] = upload;
      const eventManager = new EventManager(this.uppy);
      this.uploaderEvents[file.id] = eventManager;
      eventManager.onFileRemove(file.id, (removed) => {
        upload.abort();
        this.resetUploaderReferences(file.id, { abort: true });
        resolve(`upload ${removed} was removed`);
      });
      eventManager.onCancelAll(file.id, () => {
        upload.abort();
        this.resetUploaderReferences(file.id, { abort: true });
        resolve(`upload ${file.id} was canceled`);
      });
      eventManager.onFilePause(file.id, (isPaused) => {
        if (isPaused) {
          upload.pause();
        } else {
          upload.start();
        }
      });
      eventManager.onPauseAll(file.id, () => {
        upload.pause();
      });
      eventManager.onResumeAll(file.id, () => {
        upload.start();
      });
      upload.start();
    });
  }
  #getCompanionClientArgs(file) {
    return {
      ...file.remote?.body,
      protocol: "s3-multipart",
      size: file.data.size,
      metadata: file.meta
    };
  }
  #upload = async (fileIDs) => {
    if (fileIDs.length === 0)
      return void 0;
    const files = this.uppy.getFilesByIds(fileIDs);
    const filesFiltered = filterNonFailedFiles(files);
    const filesToEmit = filterFilesToEmitUploadStarted(filesFiltered);
    this.uppy.emit("upload-start", filesToEmit);
    const promises = filesFiltered.map((file) => {
      if (file.isRemote) {
        const getQueue = () => this.requests;
        this.#setResumableUploadsCapability(false);
        const controller = new AbortController();
        const removedHandler = (removedFile) => {
          if (removedFile.id === file.id)
            controller.abort();
        };
        this.uppy.on("file-removed", removedHandler);
        const uploadPromise = this.uppy.getRequestClientForFile(file).uploadRemoteFile(file, this.#getCompanionClientArgs(file), {
          signal: controller.signal,
          getQueue
        });
        this.requests.wrapSyncFunction(() => {
          this.uppy.off("file-removed", removedHandler);
        }, { priority: -1 })();
        return uploadPromise;
      }
      return this.#uploadLocalFile(file);
    });
    const upload = await Promise.allSettled(promises);
    this.#setResumableUploadsCapability(true);
    return upload;
  };
  #setCompanionHeaders = () => {
    this.#client?.setCompanionHeaders(this.opts.headers);
  };
  #setResumableUploadsCapability = (boolean) => {
    const { capabilities } = this.uppy.getState();
    this.uppy.setState({
      capabilities: {
        ...capabilities,
        resumableUploads: boolean
      }
    });
  };
  #resetResumableCapability = () => {
    this.#setResumableUploadsCapability(true);
  };
  install() {
    this.#setResumableUploadsCapability(true);
    this.uppy.addPreProcessor(this.#setCompanionHeaders);
    this.uppy.addUploader(this.#upload);
    this.uppy.on("cancel-all", this.#resetResumableCapability);
  }
  uninstall() {
    this.uppy.removePreProcessor(this.#setCompanionHeaders);
    this.uppy.removeUploader(this.#upload);
    this.uppy.off("cancel-all", this.#resetResumableCapability);
  }
}
const DEFAULT_MAX_WEBCRYPTO_SIZE = 1e7;
const log$8 = createLogger("sha256");
function bufferToHex(buffer) {
  const bytes = new Uint8Array(buffer);
  let out = "";
  for (let i2 = 0; i2 < bytes.length; i2 += 1) {
    out += bytes[i2].toString(16).padStart(2, "0");
  }
  return out;
}
async function sha256HexViaWebCrypto(blob) {
  if (typeof crypto === "undefined" || !crypto.subtle || typeof crypto.subtle.digest !== "function") {
    throw new Error("sha256HexFromBlob: 当前环境不支持 WebCrypto（crypto.subtle）");
  }
  const ab = await blob.arrayBuffer();
  const digest2 = await crypto.subtle.digest("SHA-256", ab);
  return bufferToHex(digest2);
}
async function sha256HexViaWorker(blob, options = {}) {
  if (typeof Worker === "undefined") {
    throw new Error("sha256HexFromBlob: 当前环境不支持 WebWorker");
  }
  const worker = new Worker(new URL(
    /* @vite-ignore */
    "/assets/sha256.worker-DS-ezKUj.js",
    import.meta.url
  ), { type: "module" });
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      try {
        worker.terminate();
      } catch {
      }
    };
    worker.addEventListener("message", (event) => {
      const data = event?.data || {};
      if (typeof data.progress === "number") {
        try {
          options.onProgress?.(data.progress);
        } catch {
        }
      }
      if (data.sha256) {
        cleanup();
        resolve(String(data.sha256));
        return;
      }
      if (data.error) {
        cleanup();
        reject(new Error(String(data.error)));
      }
    });
    worker.addEventListener("error", (event) => {
      cleanup();
      reject(event?.error || new Error("sha256 worker: unknown error"));
    });
    worker.postMessage({ file: blob });
  });
}
async function sha256HexFromBlob(blob, options = {}) {
  if (!blob || typeof blob.arrayBuffer !== "function") {
    throw new Error("sha256HexFromBlob: blob 无效");
  }
  const maxWebCryptoSize = typeof options.maxWebCryptoSize === "number" && Number.isFinite(options.maxWebCryptoSize) ? options.maxWebCryptoSize : DEFAULT_MAX_WEBCRYPTO_SIZE;
  const useWebWorker = options.useWebWorker !== false;
  if (blob.size < maxWebCryptoSize) {
    log$8.debug(`WebCrypto(全量) size=${blob.size} < ${maxWebCryptoSize}`);
    return sha256HexViaWebCrypto(blob);
  }
  if (useWebWorker) {
    try {
      log$8.debug(`Worker+hash-wasm(流式分块) size=${blob.size} >= ${maxWebCryptoSize}`);
      return await sha256HexViaWorker(blob, { onProgress: options.onProgress });
    } catch (err) {
      log$8.warn("[sha256] Worker 计算失败，将回退到 WebCrypto：", err);
    }
  }
  log$8.debug(`fallback WebCrypto(全量) size=${blob.size}`);
  return sha256HexViaWebCrypto(blob);
}
const GLOBAL_FLUSH_BIND_KEY = Symbol.for("cloudpaste.multipart.partsLedger.flushBind");
function nowMs() {
  return Date.now();
}
function normalizeStorageKey(storageKey) {
  return String(storageKey || "").replace(/^\/+/, "");
}
function toFinitePositiveInt(value) {
  const n2 = Number(value);
  if (!Number.isFinite(n2)) return null;
  const i2 = Math.floor(n2);
  return i2 > 0 ? i2 : null;
}
function normalizeEtag(value) {
  if (value == null) return null;
  const s2 = String(value);
  return s2 ? s2 : null;
}
function normalizeSize(value) {
  const n2 = Number(value);
  if (!Number.isFinite(n2)) return 0;
  return n2 > 0 ? n2 : 0;
}
function normalizePartLike(part) {
  const partNumber = toFinitePositiveInt(part?.PartNumber ?? part?.partNumber);
  const etag = normalizeEtag(part?.ETag ?? part?.etag);
  const size = normalizeSize(part?.Size ?? part?.size);
  if (!partNumber) return null;
  return { PartNumber: partNumber, ETag: etag, Size: size };
}
function ensureGlobalFlushBinding() {
  if (typeof window === "undefined") return;
  if (window[GLOBAL_FLUSH_BIND_KEY]) return;
  window[GLOBAL_FLUSH_BIND_KEY] = true;
  const flushAll = () => {
    try {
      const ledgers = window.__cloudpasteMultipartLedgers;
      if (!Array.isArray(ledgers)) return;
      ledgers.forEach((ledger) => {
        try {
          ledger?.flushNow?.();
        } catch {
        }
      });
    } catch {
    }
  };
  try {
    window.addEventListener("pagehide", flushAll, { capture: true });
  } catch {
  }
  try {
    window.addEventListener("beforeunload", flushAll, { capture: true });
  } catch {
  }
  try {
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.visibilityState === "hidden") flushAll();
      },
      { capture: true }
    );
  } catch {
  }
}
class BasePartsLedger {
  constructor({ storageKey, policy, storagePrefix, cacheExpiry }) {
    this.storageKey = normalizeStorageKey(storageKey);
    this.policy = policy || null;
    this.storagePrefix = String(storagePrefix || "uppy_multipart_");
    this.cacheExpiry = Number(cacheExpiry) || 24 * 60 * 60 * 1e3;
    this._parts = /* @__PURE__ */ new Map();
    this._loaded = false;
  }
  get ledgerPolicy() {
    const p2 = this.policy || null;
    const raw = p2?.partsLedgerPolicy ?? p2?.parts_ledger_policy ?? null;
    return String(raw || "");
  }
  async load() {
    this._loaded = true;
  }
  isLoaded() {
    return this._loaded === true;
  }
  clearInMemory() {
    this._parts.clear();
  }
  /**
   * 直接覆盖当前账本（通常用于：从服务器 list-parts 初始化）
   */
  replaceAll(parts) {
    this._parts.clear();
    const list = Array.isArray(parts) ? parts : [];
    for (const p2 of list) {
      const normalized = normalizePartLike(p2);
      if (!normalized) continue;
      this._parts.set(normalized.PartNumber, normalized);
    }
  }
  /**
   * 合并分片（通常用于：uploadPartBytes 成功后记录）
   */
  recordPart(part) {
    const normalized = normalizePartLike(part);
    if (!normalized) return;
    const prev = this._parts.get(normalized.PartNumber);
    this._parts.set(normalized.PartNumber, { ...prev, ...normalized });
  }
  hasPart(partNumber) {
    const pn = toFinitePositiveInt(partNumber);
    if (!pn) return false;
    return this._parts.has(pn);
  }
  getPart(partNumber) {
    const pn = toFinitePositiveInt(partNumber);
    if (!pn) return null;
    return this._parts.get(pn) || null;
  }
  /**
   * 返回 AWS 风格数组（用于 Uppy / complete / skip）
   */
  toAwsPartsArray() {
    return Array.from(this._parts.values()).sort((a2, b2) => a2.PartNumber - b2.PartNumber);
  }
  /**
   * per_part_url complete 需要的最小字段
   */
  toCompletePartsArray() {
    return this.toAwsPartsArray().map((p2) => ({ PartNumber: p2.PartNumber, ETag: p2.ETag })).filter((p2) => typeof p2.ETag === "string" && p2.ETag.length > 0);
  }
  /**
   * 把“Uppy 本次传进来的 parts”也并进账本，然后返回完整 parts（用于刷新后续传）
   */
  mergeIncomingParts(incomingParts) {
    const list = Array.isArray(incomingParts) ? incomingParts : [];
    for (const p2 of list) {
      this.recordPart(p2);
    }
    return this.toAwsPartsArray();
  }
  // 持久化相关：默认什么都不做
  flushNow() {
  }
  clearPersistent() {
  }
}
class MemoryPartsLedger extends BasePartsLedger {
  // 内存账本：不需要额外实现
}
class LocalStoragePartsLedger extends BasePartsLedger {
  constructor(opts) {
    super(opts);
    this._dirty = false;
    this._flushTimer = null;
    this._flushDebounceMs = 250;
    ensureGlobalFlushBinding();
    try {
      if (!Array.isArray(window.__cloudpasteMultipartLedgers)) {
        window.__cloudpasteMultipartLedgers = [];
      }
      window.__cloudpasteMultipartLedgers.push(this);
    } catch {
    }
  }
  _storageKeyName() {
    return `${this.storagePrefix}${this.storageKey}`;
  }
  async load() {
    if (this._loaded) return;
    this._loaded = true;
    if (!this.storageKey) return;
    try {
      const raw = localStorage.getItem(this._storageKeyName());
      if (!raw) return;
      const data = JSON.parse(raw);
      const ts = Number(data?.timestamp) || 0;
      if (ts > 0 && nowMs() - ts > this.cacheExpiry) {
        return;
      }
      const parts = Array.isArray(data?.parts) ? data.parts : [];
      this.replaceAll(parts);
    } catch {
    }
  }
  recordPart(part) {
    super.recordPart(part);
    this._markDirty();
  }
  replaceAll(parts) {
    super.replaceAll(parts);
    this._markDirty();
  }
  _markDirty() {
    this._dirty = true;
    if (this._flushTimer) return;
    this._flushTimer = setTimeout(() => {
      this._flushTimer = null;
      this.flushNow();
    }, this._flushDebounceMs);
  }
  flushNow() {
    if (!this._dirty) return;
    this._dirty = false;
    if (!this.storageKey) return;
    try {
      const data = {
        parts: this.toAwsPartsArray(),
        timestamp: nowMs()
      };
      localStorage.setItem(this._storageKeyName(), JSON.stringify(data));
    } catch {
    }
  }
  clearPersistent() {
    try {
      if (!this.storageKey) return;
      localStorage.removeItem(this._storageKeyName());
    } catch {
    }
  }
}
function createPartsLedger({ policy, storageKey, storagePrefix, cacheExpiry }) {
  const p2 = policy || null;
  const ledgerPolicyRaw = p2?.partsLedgerPolicy ?? p2?.parts_ledger_policy ?? null;
  const ledgerPolicy = String(ledgerPolicyRaw || "");
  const opts = { policy: p2, storageKey, storagePrefix, cacheExpiry };
  if (ledgerPolicy === "client_keeps") {
    return new LocalStoragePartsLedger(opts);
  }
  return new MemoryPartsLedger(opts);
}
function readClientLedgerParts({ storageKey, storagePrefix, cacheExpiry }) {
  const ledger = new LocalStoragePartsLedger({
    storageKey,
    storagePrefix,
    cacheExpiry,
    policy: { partsLedgerPolicy: "client_keeps" }
  });
  return ledger.load().then(() => ledger.toAwsPartsArray()).catch(() => []);
}
function clearAllClientLedgers({ storagePrefix }) {
  const prefix = String(storagePrefix || "uppy_multipart_");
  try {
    const keysToRemove = [];
    for (let i2 = 0; i2 < localStorage.length; i2 += 1) {
      const k2 = localStorage.key(i2);
      if (k2 && k2.startsWith(prefix)) keysToRemove.push(k2);
    }
    keysToRemove.forEach((k2) => localStorage.removeItem(k2));
    return keysToRemove.length;
  } catch {
    return 0;
  }
}
const log$7 = createLogger("StorageTools");
function resolveAbsoluteApiUrl(url) {
  if (!url) return url;
  const s2 = String(url);
  if (/^https?:\/\//i.test(s2)) return s2;
  if (s2.startsWith(API_PREFIX)) return `${API_BASE_URL}${s2}`;
  if (s2.startsWith(`${API_PREFIX}/`)) return `${API_BASE_URL}${s2}`;
  if (s2.startsWith("/")) return `${API_BASE_URL}${s2}`;
  return `${API_BASE_URL}/${s2}`;
}
class SessionManager {
  constructor(config) {
    this.config = config;
    this.sessions = /* @__PURE__ */ new Map();
    this.pausedFiles = /* @__PURE__ */ new Set();
    this.cleanupTimer = null;
    const loop = () => {
      try {
        this.cleanupExpiredSessions();
      } finally {
        this.cleanupTimer = setTimeout(loop, 5 * 60 * 1e3);
      }
    };
    this.cleanupTimer = setTimeout(loop, 5 * 60 * 1e3);
  }
  createSession(fileId, sessionData) {
    const session = { ...sessionData, createdAt: Date.now(), lastAccessAt: Date.now() };
    this.sessions.set(fileId, session);
    return session;
  }
  getSession(fileId) {
    const session = this.sessions.get(fileId);
    if (session) session.lastAccessAt = Date.now();
    return session;
  }
  updateSession(fileId, updates) {
    const session = this.sessions.get(fileId);
    if (session) Object.assign(session, updates, { lastAccessAt: Date.now() });
  }
  deleteSession(fileId) {
    return this.sessions.delete(fileId);
  }
  setFilePaused(fileId, paused) {
    if (paused) {
      this.pausedFiles.add(fileId);
      log$7.debug(`文件已暂停: ${fileId}`);
    } else {
      this.pausedFiles.delete(fileId);
      log$7.debug(`文件已恢复: ${fileId}`);
    }
  }
  isFilePaused(fileId) {
    return this.pausedFiles.has(fileId);
  }
  cleanupExpiredSessions() {
    const now2 = Date.now();
    let cleanedCount = 0;
    for (const [fileId, session] of this.sessions) {
      if (now2 - session.lastAccessAt > this.config.sessionTimeout) {
        this.sessions.delete(fileId);
        this.pausedFiles.delete(fileId);
        cleanedCount += 1;
      }
    }
    if (cleanedCount > 0) {
      log$7.debug(`清理了 ${cleanedCount} 个过期会话`);
    }
  }
  getStats() {
    return { activeSessions: this.sessions.size, pausedFiles: this.pausedFiles.size };
  }
  destroy() {
    if (this.cleanupTimer) {
      clearTimeout(this.cleanupTimer);
      this.cleanupTimer = null;
    }
    this.sessions.clear();
    this.pausedFiles.clear();
  }
}
class AuthProvider {
  constructor(authStore) {
    this.authStore = authStore;
  }
  getAuthHeaders() {
    const headers = {};
    if (this.authStore.authType === "admin" && this.authStore.adminToken) {
      headers["Authorization"] = `Bearer ${this.authStore.adminToken}`;
    } else if (this.authStore.isKeyUser && this.authStore.apiKey) {
      headers["Authorization"] = `ApiKey ${this.authStore.apiKey}`;
    }
    return headers;
  }
}
class PathResolver {
  constructor(currentPath) {
    this.currentPath = currentPath || "/";
  }
  buildFullPathFromKey(storageKey) {
    const key = String(storageKey || "").replace(/^\/+/, "");
    const path = String(this.currentPath || "/").replace(/\/+$/, "");
    return `${path}/${key}`.replace(/\/+/g, "/");
  }
}
class ErrorHandler {
  constructor(onError) {
    this.onError = onError;
  }
  handle(error, context = "") {
    const message = context ? `${context}: ${error?.message || error}` : error?.message || String(error);
    try {
      if (typeof this.onError === "function") this.onError(error, context);
    } catch {
    }
    return message;
  }
}
const log$6 = createLogger("MultipartCreate");
async function createMultipartUpload(file) {
  try {
    log$6.debug(`创建分片上传: ${file.name}`);
    if (file.meta.resumable && file.meta.existingUpload && file.meta.serverResume) {
      const existingUpload = file.meta.existingUpload;
      log$6.debug(`尝试恢复现有上传: uploadId=${existingUpload.uploadId}, key=${existingUpload.key}`);
      const existingStrategy = existingUpload.strategy || "per_part_url";
      try {
        const fullPathForValidation = this.buildFullPathFromKey(existingUpload.key);
        log$6.debug(`验证uploadId有效性: ${fullPathForValidation}`);
        const listPartsResponse = await listMultipartParts(
          fullPathForValidation,
          existingUpload.uploadId,
          file.name
        );
        if (!listPartsResponse.success) {
          throw new Error(`uploadId已失效: ${listPartsResponse.message}`);
        }
        if (listPartsResponse?.data?.uploadNotFound === true) {
          throw new Error("uploadId已失效：服务器侧多部分上传已不存在（可能已完成/已中止/被清理）");
        }
        const effectivePolicy = listPartsResponse?.data?.policy || existingUpload?.policy || null;
        const ledgerPolicyRaw = effectivePolicy?.partsLedgerPolicy ?? effectivePolicy?.parts_ledger_policy ?? null;
        const ledgerPolicy = String(ledgerPolicyRaw || "");
        const serverParts = Array.isArray(listPartsResponse?.data?.parts) ? listPartsResponse.data.parts : [];
        const partsLedger = this._createPartsLedger(effectivePolicy, existingUpload.key);
        try {
          await partsLedger.load?.();
        } catch {
        }
        const uploadedParts = ledgerPolicy === "client_keeps" ? partsLedger.toAwsPartsArray().map((p2) => ({
          partNumber: Number(p2?.PartNumber),
          etag: p2?.ETag ?? null,
          size: Number(p2?.Size ?? 0)
        })).filter((p2) => Number.isFinite(p2.partNumber) && p2.partNumber > 0) : serverParts;
        if (ledgerPolicy !== "client_keeps") {
          try {
            partsLedger.replaceAll(serverParts);
          } catch {
          }
        }
        const uploadedCount = Array.isArray(uploadedParts) ? uploadedParts.length : 0;
        const sourceLabel = ledgerPolicy === "client_keeps" ? "本地账本" : "服务器";
        log$6.debug(`${sourceLabel}返回: 找到${uploadedCount}个已上传分片（按驱动语义解析）`);
        if (existingStrategy === "per_part_url") {
          const fullPath = this.buildFullPathFromKey(existingUpload.key);
          log$6.debug(`路径转换: StorageKey=${existingUpload.key} -> FullPath=${fullPath}`);
          const basePolicy = effectivePolicy || existingUpload?.policy || null;
          const refreshPolicyRaw = basePolicy?.refreshPolicy ?? basePolicy?.refresh_policy ?? null;
          const refreshPolicy = String(refreshPolicyRaw || "server_decides");
          const signingModeRaw = basePolicy?.signingMode || basePolicy?.signing_mode || null;
          const signingMode = String(signingModeRaw || "on_demand");
          const maxPartsPerRequestRaw = basePolicy?.maxPartsPerRequest ?? basePolicy?.max_parts_per_request ?? null;
          const maxPartsPerRequestParsed = Number(maxPartsPerRequestRaw);
          const maxPartsPerRequest = Number.isFinite(maxPartsPerRequestParsed) && maxPartsPerRequestParsed > 0 ? Math.floor(maxPartsPerRequestParsed) : 1;
          const partSizeCandidate = existingUpload.partSize ?? existingUpload.part_size ?? this.config.partSize ?? 5 * 1024 * 1024;
          const effectivePartSize = Number(partSizeCandidate) || 5 * 1024 * 1024;
          const totalPartsCandidate = existingUpload.totalParts ?? existingUpload.total_parts ?? existingUpload.partCount ?? existingUpload.part_count ?? null;
          const totalPartsFromServer = Number(totalPartsCandidate);
          const totalParts = Number.isFinite(totalPartsFromServer) && totalPartsFromServer > 0 ? Math.floor(totalPartsFromServer) : Math.ceil(file.size / effectivePartSize);
          const uploadedPartNumbers = (uploadedParts || []).map((p2) => Number(p2?.partNumber ?? p2?.PartNumber)).filter((n2) => Number.isFinite(n2) && n2 > 0).sort((a2, b2) => a2 - b2);
          const uploadedSet = new Set(uploadedPartNumbers);
          let nextNeededPartNumber = 1;
          while (nextNeededPartNumber <= totalParts && uploadedSet.has(nextNeededPartNumber)) {
            nextNeededPartNumber += 1;
          }
          const hasMoreParts = nextNeededPartNumber <= totalParts;
          let partNumbersToSign = [];
          if (hasMoreParts) {
            if (refreshPolicy === "server_decides") {
              partNumbersToSign = [];
            } else {
              if (signingMode === "batched" && maxPartsPerRequest > 1) {
                const endPn = Math.min(
                  nextNeededPartNumber + maxPartsPerRequest - 1,
                  totalParts
                );
                partNumbersToSign = Array.from(
                  { length: endPn - nextNeededPartNumber + 1 },
                  (_2, i2) => nextNeededPartNumber + i2
                );
              } else {
                partNumbersToSign = [nextNeededPartNumber];
              }
            }
          }
          let signResponse = { success: true, data: { presignedUrls: [], policy: basePolicy } };
          if (hasMoreParts) {
            signResponse = await signMultipartParts(
              fullPath,
              existingUpload.uploadId,
              partNumbersToSign
            );
            if (!signResponse.success) {
              throw new Error(signResponse.message || "获取分片签名失败");
            }
          }
          const refreshResponse = signResponse;
          const resetUploadedParts = refreshResponse?.data?.resetUploadedParts === true;
          if (resetUploadedParts) {
            try {
              partsLedger.clearInMemory?.();
              partsLedger.clearPersistent?.();
            } catch {
            }
          }
          const effectiveUploadedParts = resetUploadedParts ? [] : uploadedParts;
          const standardParts = effectiveUploadedParts.map((part) => ({
            PartNumber: part.partNumber,
            Size: part.size,
            ETag: part.etag
          }));
          const uploadedBytes = effectiveUploadedParts.reduce((sum, part) => sum + part.size, 0);
          const progressPercent = Math.round(uploadedBytes / file.size * 100);
          if (standardParts.length > 0) {
            const partNums = standardParts.map((p2) => p2.PartNumber).sort((a2, b2) => a2 - b2);
            log$6.debug(`服务器已上传分片: [${partNums.join(", ")}] (${progressPercent}%)`);
          }
          this.uploadSessions.set(file.id, {
            strategy: "per_part_url",
            uploadId: existingUpload.uploadId,
            key: existingUpload.key,
            presignedUrls: refreshResponse?.data?.presignedUrls || [],
            policy: refreshResponse?.data?.policy || basePolicy || null,
            partsLedger,
            path: this.currentPath,
            fileName: file.name,
            fileSize: file.size,
            partSize: effectivePartSize,
            totalParts,
            resumed: true
            // 标记为恢复的上传
          });
          log$6.debug("per_part_url 模式断点续传恢复成功");
          return {
            uploadId: existingUpload.uploadId,
            key: existingUpload.key
          };
        }
        if (existingStrategy === "single_session") {
          const fullPath = this.buildFullPathFromKey(existingUpload.key);
          log$6.debug(`single_session 恢复: StorageKey=${existingUpload.key} -> FullPath=${fullPath}`);
          const refreshResponse = await signMultipartParts(
            fullPath,
            existingUpload.uploadId,
            [1]
            // 对于 single_session，partNumbers 仅为参数校验占位
          );
          if (!refreshResponse.success) {
            throw new Error(refreshResponse.message || "刷新会话信息失败");
          }
          const data = refreshResponse.data || {};
          const session = data.session || {};
          const uploadUrl = session.uploadUrl || existingUpload.uploadId;
          const nextExpectedRanges = session.nextExpectedRanges || [];
          let resumeOffset = 0;
          if (Array.isArray(nextExpectedRanges) && nextExpectedRanges.length > 0) {
            const firstRange = String(nextExpectedRanges[0]);
            const startStr = firstRange.split("-")[0];
            const parsed = Number.parseInt(startStr, 10);
            if (Number.isFinite(parsed) && parsed >= 0) {
              resumeOffset = parsed;
            }
          }
          const effectivePartSize = existingUpload.partSize || this.config.partSize || 5 * 1024 * 1024;
          let completedParts = 0;
          if (Array.isArray(uploadedParts) && uploadedParts.length > 0) {
            const partNumbers = uploadedParts.map((p2) => p2.partNumber ?? p2.PartNumber).filter((n2) => typeof n2 === "number" && Number.isFinite(n2) && n2 > 0).sort((a2, b2) => a2 - b2);
            let expected = 1;
            for (const n2 of partNumbers) {
              if (n2 === expected) {
                completedParts = n2;
                expected += 1;
              } else {
                break;
              }
            }
          }
          this.uploadSessions.set(file.id, {
            strategy: "single_session",
            uploadId: existingUpload.uploadId,
            key: existingUpload.key,
            session: {
              uploadUrl,
              nextExpectedRanges
            },
            path: this.currentPath,
            fileName: file.name,
            fileSize: file.size,
            partSize: effectivePartSize,
            resumed: true,
            resumeOffset,
            completedParts
          });
          log$6.debug(`single_session 模式断点续传恢复成功，resumeOffset=${resumeOffset}，completedParts=${completedParts}`);
          return {
            uploadId: existingUpload.uploadId,
            key: existingUpload.key
          };
        }
        log$6.warn(
          `[StorageAdapter] 未知的 existingUpload.strategy=${existingStrategy}，将回退为全新上传`
        );
      } catch (error) {
        log$6.warn(`[StorageAdapter] 断点续传失败，创建新上传: ${error.message}`);
        if (this.uppyInstance) {
          this.uppyInstance.setFileMeta(file.id, {
            resumable: false,
            existingUpload: null,
            serverResume: false
          });
        }
      }
    }
    const partSize = this.config.partSize || 5 * 1024 * 1024;
    const meta = file?.meta || {};
    const preinit = meta?.cloudpasteMultipartInit && typeof meta.cloudpasteMultipartInit === "object" ? meta.cloudpasteMultipartInit : null;
    const sha256 = typeof meta?.cloudpasteSha256 === "string" && meta.cloudpasteSha256 ? meta.cloudpasteSha256 : typeof meta?.sha256 === "string" && meta.sha256 ? meta.sha256 : null;
    const response = preinit ? { success: true, data: preinit } : await initMultipartUpload(
      this.currentPath,
      file.name,
      file.size,
      file.type,
      partSize,
      { sha256 }
    );
    if (!response?.success) {
      throw new Error(response?.message || "初始化分片上传失败");
    }
    const init = response?.data || {};
    const strategy = init.strategy || "per_part_url";
    const uploadId = init.uploadId;
    const initPartSize = Number(init.partSize || init.part_size || 0);
    const key = String(
      init?.key || `${this.currentPath}/${file.name}`.replace(/\/+/g, "/").replace(/^\/+/, "")
    ).replace(/^\/+/, "");
    if (!uploadId) {
      throw new Error("初始化分片上传失败：缺少 uploadId");
    }
    if (this.uppyInstance && Number.isFinite(initPartSize) && initPartSize > 0) {
      try {
        this.uppyInstance.setFileMeta(file.id, { [this._multipartChunkSizeKey]: Math.floor(initPartSize) });
      } catch {
      }
    }
    if (strategy === "per_part_url") {
      const presignedUrls = Array.isArray(init.presignedUrls) ? init.presignedUrls : [];
      const policy = init.policy || null;
      const signingModeRaw = policy?.signingMode || policy?.signing_mode || null;
      const signingMode = String(signingModeRaw || "eager");
      const partsLedger = this._createPartsLedger(policy, key);
      try {
        await partsLedger.load?.();
      } catch {
      }
      if (presignedUrls.length === 0 && signingMode === "eager") {
        throw new Error("初始化分片上传失败：per_part_url 策略缺少 presignedUrls");
      }
      this.uploadSessions.set(file.id, {
        strategy,
        uploadId,
        key,
        presignedUrls,
        policy,
        partsLedger,
        path: this.currentPath,
        fileName: file.name,
        fileSize: file.size,
        partSize: init.partSize || partSize,
        totalParts: init.totalParts || init.partCount || null,
        skipUpload: init.skipUpload === true,
        resumed: false
      });
      try {
        if (this.uppyInstance) {
          this.uppyInstance.setFileMeta(file.id, { cloudpasteSkipUpload: init.skipUpload === true });
        }
      } catch {
      }
      try {
        partsLedger.clearInMemory?.();
        partsLedger.clearPersistent?.();
      } catch {
      }
      log$6.debug(`新上传初始化完成，已重置分片账本: ${key}`);
      return {
        uploadId,
        key
      };
    }
    if (strategy === "single_session") {
      const session = init.session || {};
      if (!session.uploadUrl) {
        throw new Error("初始化分片上传失败：single_session 策略缺少 session.uploadUrl");
      }
      this.uploadSessions.set(file.id, {
        strategy,
        uploadId,
        key,
        session,
        path: this.currentPath,
        fileName: file.name,
        fileSize: file.size,
        partSize: init.partSize || partSize,
        resumed: false,
        resumeOffset: 0
      });
      log$6.debug("新的 single_session 分片上传会话已创建（OneDrive/Graph 模式）");
      return {
        uploadId,
        key
      };
    }
    throw new Error(`不支持的分片上传策略: ${String(strategy)}`);
  } catch (error) {
    log$6.error("[StorageAdapter] 创建分片上传失败:", error);
    throw error;
  }
}
const log$5 = createLogger("MultipartTransfer");
async function signPart(file, partData) {
  try {
    const session = this.uploadSessions.get(file.id);
    if (!session) {
      throw new Error("找不到上传会话信息");
    }
    log$5.debug(`signPart被调用: 分片${partData.partNumber}`);
    if (session.strategy === "single_session") {
      const totalSize = session.fileSize || file.size;
      const partSize = session.partSize || this.config.partSize || 5 * 1024 * 1024;
      const partNumber = partData.partNumber;
      if (typeof partNumber !== "number" || !Number.isFinite(partNumber) || partNumber <= 0) {
        throw new Error(`无效的单会话分片编号: ${partNumber}`);
      }
      const body = partData.body;
      const currentSize = (body && (body.size ?? body.byteLength)) != null ? body.size ?? body.byteLength : null;
      if (currentSize == null || !Number.isFinite(currentSize) || currentSize <= 0) {
        throw new Error("无法确定当前分片大小，用于计算 Content-Range");
      }
      const start = (partNumber - 1) * partSize;
      const end = Math.min(start + currentSize, totalSize) - 1;
      if (start >= totalSize) {
        throw new Error(
          `分片区间超出文件大小: start=${start}, totalSize=${totalSize}, partNumber=${partNumber}`
        );
      }
      const urlRaw = session.session?.uploadUrl || session.uploadId;
      const url = resolveAbsoluteApiUrl(urlRaw);
      if (!url) {
        throw new Error("single_session 会话缺少有效的 uploadUrl");
      }
      const authHeaders = this.authProvider.getAuthHeaders() || {};
      return {
        url,
        headers: {
          ...authHeaders,
          "Content-Type": "application/octet-stream",
          "Content-Range": `bytes ${start}-${end}/${totalSize}`
        },
        strategy: "single_session",
        partNumber,
        fileId: file.id,
        key: session.key || null
      };
    }
    if (session?.skipUpload === true) {
      return {
        url: resolveAbsoluteApiUrl("/__uppy_skip_upload__"),
        headers: {
          "Content-Type": "application/octet-stream",
          "x-cloudpaste-skip-upload": "1"
        },
        strategy: "per_part_url",
        partNumber: partData.partNumber,
        fileId: file.id,
        key: session.key || null,
        skipUpload: true
      };
    }
    const urls = Array.isArray(session.presignedUrls) ? session.presignedUrls : [];
    let urlInfo = urls.find((url) => url.partNumber === partData.partNumber);
    if (!urlInfo && session.uploadId && session.key) {
      try {
        const fullPath = this.buildFullPathFromKey(session.key);
        const policy = session?.policy || {};
        const signingModeRaw = policy?.signingMode || policy?.signing_mode || null;
        const signingMode = String(signingModeRaw || "on_demand");
        const maxPartsPerRequestRaw = policy?.maxPartsPerRequest ?? policy?.max_parts_per_request ?? null;
        const maxPartsPerRequestParsed = Number(maxPartsPerRequestRaw);
        const maxPartsPerRequest = Number.isFinite(maxPartsPerRequestParsed) && maxPartsPerRequestParsed > 0 ? Math.floor(maxPartsPerRequestParsed) : 1;
        let partNumbersToSign = [partData.partNumber];
        if (signingMode === "batched" && maxPartsPerRequest > 1) {
          const totalPartsCandidate = session?.totalParts ?? session?.total_parts ?? null;
          const totalPartsFromSession = Number(totalPartsCandidate);
          const partSizeCandidate = session?.partSize ?? session?.part_size ?? this.config.partSize ?? 5 * 1024 * 1024;
          const effectivePartSize = Number(partSizeCandidate) || 5 * 1024 * 1024;
          const totalParts = Number.isFinite(totalPartsFromSession) && totalPartsFromSession > 0 ? Math.floor(totalPartsFromSession) : Math.ceil(file.size / effectivePartSize);
          const startPn = Number(partData.partNumber);
          const endPn = Math.min(startPn + maxPartsPerRequest - 1, totalParts);
          partNumbersToSign = Array.from({ length: endPn - startPn + 1 }, (_2, i2) => startPn + i2);
        }
        if (session._cloudpasteSignPartsInFlight) {
          try {
            await session._cloudpasteSignPartsInFlight;
          } catch {
          }
          const latestUrls = Array.isArray(session.presignedUrls) ? session.presignedUrls : [];
          urlInfo = latestUrls.find((url) => url.partNumber === partData.partNumber);
        }
        if (!urlInfo) {
          const p2 = signMultipartParts(fullPath, session.uploadId, partNumbersToSign);
          session._cloudpasteSignPartsInFlight = p2;
          let signResponse;
          try {
            signResponse = await p2;
          } finally {
            if (session._cloudpasteSignPartsInFlight === p2) {
              session._cloudpasteSignPartsInFlight = null;
            }
          }
          if (signResponse?.success && signResponse?.data?.policy) {
            session.policy = signResponse.data.policy;
          }
          const refreshedUrls = signResponse?.success ? signResponse?.data?.presignedUrls || [] : [];
          if (Array.isArray(refreshedUrls) && refreshedUrls.length > 0) {
            const latestUrls = Array.isArray(session.presignedUrls) ? session.presignedUrls : [];
            const merged = [...latestUrls];
            for (const u2 of refreshedUrls) {
              const pn = Number(u2?.partNumber);
              const existingIndex = merged.findIndex((x2) => Number(x2?.partNumber) === pn);
              if (existingIndex >= 0) merged[existingIndex] = u2;
              else merged.push(u2);
            }
            merged.sort((a2, b2) => Number(a2.partNumber) - Number(b2.partNumber));
            session.presignedUrls = merged;
            urlInfo = merged.find((url) => url.partNumber === partData.partNumber);
          }
        }
      } catch (e2) {
        log$5.warn("[StorageAdapter] signPart 请求签名URL失败（可忽略）:", e2?.message || e2);
      }
    }
    if (!urlInfo) {
      const available = (Array.isArray(session.presignedUrls) ? session.presignedUrls : []).map((u2) => Number(u2?.partNumber)).filter((n2) => Number.isFinite(n2) && n2 > 0).sort((a2, b2) => a2 - b2);
      const hint = available.length > 0 ? `当前会话仅有分片: [${available.join(", ")}]。很可能是“Uppy 切片大小”和“后端返回 partSize”不一致。` : "当前会话没有任何 presignedUrls。";
      throw new Error(`找不到分片 ${partData.partNumber} 的预签名URL。${hint}`);
    }
    return {
      url: resolveAbsoluteApiUrl(urlInfo.url),
      headers: {
        "Content-Type": "application/octet-stream",
        ...session?.skipUpload === true ? { "x-cloudpaste-skip-upload": "1" } : {}
      },
      strategy: "per_part_url",
      partNumber: partData.partNumber,
      fileId: file.id,
      uploadId: session.uploadId,
      key: session.key || null
    };
  } catch (error) {
    log$5.error("[StorageAdapter] 签名分片失败:", error);
    throw error;
  }
}
async function uploadPartBytes({ signature, body, onComplete, size, onProgress, signal }) {
  try {
    const { url, headers } = signature;
    const sigHeaders = headers || {};
    const shouldSkip = signature?.skipUpload === true || sigHeaders?.["x-cloudpaste-skip-upload"] === "1" || sigHeaders?.["X-CloudPaste-Skip-Upload"] === "1";
    if (shouldSkip) {
      log$5.debug("skipUpload=true，跳过分片 PUT，直接进入 complete 阶段");
      try {
        const fileId2 = signature && typeof signature.fileId === "string" ? signature.fileId : null;
        if (fileId2) {
          const session = this.uploadSessions.get(fileId2);
          if (session) session.etag = null;
        }
      } catch {
      }
      try {
        onProgress?.({ loaded: size, total: size, lengthComputable: true });
      } catch {
      }
      try {
        onComplete?.(null);
      } catch {
      }
      return { ETag: null };
    }
    if (!url) {
      throw new Error("Cannot upload to an undefined URL");
    }
    log$5.debug(`uploadPartBytes被调用: ${url}`);
    const isSingleSession = signature && signature.strategy === "single_session";
    const signatureKey = signature && typeof signature.key === "string" && signature.key ? String(signature.key) : null;
    const storageKey = signatureKey ? signatureKey.replace(/^\/+/, "") : null;
    let partNumber = signature && typeof signature.partNumber === "number" ? signature.partNumber : null;
    let fileId = signature && typeof signature.fileId === "string" ? signature.fileId : null;
    if (partNumber == null) {
      try {
        const urlObject = new URL(url);
        const partNumberRaw = urlObject.searchParams.get("partNumber");
        partNumber = partNumberRaw != null && partNumberRaw !== "" ? parseInt(partNumberRaw, 10) : null;
      } catch {
      }
    }
    if (partNumber != null) {
      log$5.debug(`处理分片${partNumber}上传...`);
    }
    if (!fileId) {
      fileId = this.getFileIdFromUrl(url);
    }
    const sessionForPolicy = fileId ? this.uploadSessions.get(fileId) : null;
    let partsLedger = sessionForPolicy?.partsLedger || null;
    if (!isSingleSession && storageKey) {
      if (!partsLedger) {
        partsLedger = this._createPartsLedger(sessionForPolicy?.policy || null, storageKey);
        try {
          await partsLedger.load?.();
        } catch {
        }
        if (sessionForPolicy) sessionForPolicy.partsLedger = partsLedger;
      }
      if (partNumber != null && partsLedger?.hasPart?.(partNumber)) {
        const existingPart = partsLedger.getPart(partNumber);
        if (existingPart?.ETag) {
          log$5.debug(`分片${partNumber}已存在（账本命中），跳过上传 (ETag: ${existingPart.ETag})`);
          return new Promise((resolve) => {
            setTimeout(() => {
              try {
                onProgress(size);
              } catch {
              }
              try {
                onComplete(existingPart.ETag);
              } catch {
              }
              resolve({ ETag: existingPart.ETag });
            }, 0);
          });
        }
      }
    }
    if (isSingleSession) {
      const session = fileId ? this.uploadSessions.get(fileId) : null;
      if (session && typeof session.completedParts === "number" && session.completedParts > 0 && partNumber != null && partNumber <= session.completedParts) {
        log$5.debug(`single_session 分片${partNumber}已完成，跳过上传（逻辑跳过，不发HTTP请求）`);
        return new Promise((resolve) => {
          setTimeout(() => {
            try {
              onProgress(size);
            } catch {
            }
            const etag = `onedrive-part-${partNumber}`;
            try {
              onComplete(etag);
            } catch {
            }
            resolve({ ETag: etag });
          }, 0);
        });
      }
    }
    if (!isSingleSession && storageKey && partNumber != null) {
      const pauseFileId = fileId || this.getFileIdFromUrl(url);
      if (pauseFileId && this.isFilePaused(pauseFileId)) {
        log$5.debug(`分片${partNumber}被暂停，等待恢复...`);
        return new Promise((resolve, reject) => {
          let resumeTimer = null;
          const checkResume = () => {
            if (!this.isFilePaused(pauseFileId)) {
              if (resumeTimer) {
                clearTimeout(resumeTimer);
                resumeTimer = null;
              }
              log$5.debug(`分片${partNumber}恢复上传`);
              this.uploadPartBytes({
                signature,
                body,
                onComplete,
                size,
                onProgress,
                signal
              }).then(resolve).catch(reject);
              return;
            }
            resumeTimer = setTimeout(checkResume, 100);
          };
          resumeTimer = setTimeout(checkResume, 100);
          if (signal) {
            signal.addEventListener("abort", () => {
              if (resumeTimer) {
                clearTimeout(resumeTimer);
                resumeTimer = null;
              }
              reject(new DOMException("The operation was aborted", "AbortError"));
            });
          }
        });
      }
    }
    const uploadOnce = (uploadUrl) => new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", uploadUrl, true);
      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }
      xhr.responseType = "text";
      function onabort() {
        xhr.abort();
      }
      function cleanup() {
        if (signal) {
          signal.removeEventListener("abort", onabort);
        }
      }
      if (signal) {
        signal.addEventListener("abort", onabort);
      }
      xhr.onabort = () => {
        cleanup();
        const err = new DOMException("The operation was aborted", "AbortError");
        reject(err);
      };
      const progressHandler = (evt) => {
        try {
          const loaded = evt?.loaded ?? 0;
          const total = evt?.total ?? size;
          onProgress?.({ loaded, total, lengthComputable: true });
        } catch {
        }
      };
      xhr.upload.addEventListener("progress", progressHandler);
      xhr.addEventListener("load", (ev) => {
        cleanup();
        const target = ev.target;
        if (target.status < 200 || target.status >= 300) {
          try {
            log$5.error("[StorageAdapter] uploadPartBytes HTTP error", {
              status: target.status,
              statusText: target.statusText,
              responseText: target.responseText
            });
          } catch {
          }
          const error = new Error(`HTTP ${target.status}: ${target.statusText}`);
          error.source = target;
          reject(error);
          return;
        }
        try {
          onProgress?.({ loaded: size, total: size, lengthComputable: true });
        } catch {
        }
        let etag = target.getResponseHeader("ETag");
        if (etag === null && isSingleSession) {
          etag = `onedrive-part-${Date.now()}`;
        }
        if (etag === null) {
          reject(
            new Error(
              "Could not read the ETag header. This likely means CORS is not configured correctly."
            )
          );
          return;
        }
        if (partNumber == null && fileId) {
          try {
            const session = this.uploadSessions.get(fileId);
            if (session) session.etag = etag;
          } catch {
          }
        }
        if (!isSingleSession && storageKey && partNumber != null) {
          try {
            partsLedger?.recordPart?.({
              ETag: etag,
              PartNumber: partNumber,
              Size: size
            });
          } catch {
          }
          log$5.debug(`分片${partNumber}上传成功，已写入分片账本 (ETag: ${etag})`);
        }
        try {
          onComplete(etag);
        } catch {
        }
        resolve({ ETag: etag });
      });
      xhr.addEventListener("error", (ev) => {
        cleanup();
        const error = new Error("Upload failed");
        error.source = ev.target;
        reject(error);
      });
      xhr.send(body);
    });
    const retryMaxAttemptsCandidate = sessionForPolicy?.policy?.retryPolicy?.maxAttempts ?? sessionForPolicy?.policy?.retry_policy?.maxAttempts ?? null;
    const retryMaxAttemptsParsed = Number(retryMaxAttemptsCandidate);
    const maxAttempts = Number.isFinite(retryMaxAttemptsParsed) && retryMaxAttemptsParsed > 0 ? Math.floor(retryMaxAttemptsParsed) : Number(this.config.maxRetries) || 3;
    let lastError = null;
    let currentUrl = url;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        if (attempt > 1) {
          log$5.warn(
            `[StorageAdapter] ⚠️ 分片${partNumber ?? "?"}重试上传 attempt=${attempt}/${maxAttempts}`
          );
        }
        return await uploadOnce(currentUrl);
      } catch (err) {
        lastError = err;
        if (err?.name === "AbortError") {
          throw err;
        }
        const status = err?.source?.status ?? null;
        const responseText = String(err?.source?.responseText || "");
        if (isSingleSession && status === 404 && /upload session was not found|itemNotFound/i.test(responseText)) {
          throw new Error("上传会话已过期（OneDrive 上游返回 404），请重新开始上传");
        }
        const mayBeExpiredSignature = !isSingleSession && (status === 401 || status === 403 || status === 400 && /expired|signature|token|Request has expired/i.test(responseText));
        if (!mayBeExpiredSignature || attempt >= maxAttempts) {
          throw err;
        }
        if (!storageKey || partNumber == null) {
          throw err;
        }
        const uploadIdForSign = sessionForPolicy?.uploadId || signature?.uploadId || signature?.upload_id || null;
        if (!uploadIdForSign) {
          throw err;
        }
        try {
          const fsPath = this.buildFullPathFromKey(storageKey);
          const signResp = await signMultipartParts(fsPath, uploadIdForSign, [partNumber]);
          const resetUploadedParts = signResp?.success && signResp?.data?.resetUploadedParts === true;
          if (resetUploadedParts) {
            try {
              partsLedger?.clearInMemory?.();
              partsLedger?.clearPersistent?.();
            } catch {
            }
            try {
              if (sessionForPolicy) {
                sessionForPolicy.presignedUrls = [];
              }
            } catch {
            }
            throw new Error("上传链接已过期：服务器已重置上传会话，请重新开始上传");
          }
          const refreshed = signResp?.success ? signResp?.data?.presignedUrls || [] : [];
          const picked = refreshed.find((u2) => Number(u2?.partNumber) === Number(partNumber)) || refreshed[0] || null;
          const nextUrl = picked?.url ? resolveAbsoluteApiUrl(picked.url) : null;
          if (!nextUrl) {
            throw new Error("重新签名失败：后端未返回新的 presignedUrl");
          }
          try {
            if (sessionForPolicy && Array.isArray(sessionForPolicy.presignedUrls)) {
              const merged = [...sessionForPolicy.presignedUrls];
              const existingIndex = merged.findIndex((x2) => Number(x2?.partNumber) === Number(partNumber));
              if (existingIndex >= 0) merged[existingIndex] = picked;
              else merged.push(picked);
              merged.sort((a2, b2) => Number(a2.partNumber) - Number(b2.partNumber));
              sessionForPolicy.presignedUrls = merged;
            }
            if (signResp?.data?.policy && sessionForPolicy) {
              sessionForPolicy.policy = signResp.data.policy;
            }
          } catch {
          }
          currentUrl = nextUrl;
          continue;
        } catch (signError) {
          log$5.warn("[StorageAdapter] 重新签名失败，将抛出原始上传错误:", signError?.message || signError);
          const signMsg = String(signError?.message || "");
          if (signMsg.includes("重置上传会话") || signMsg.includes("重置") || signMsg.includes("重新开始上传")) {
            throw signError;
          }
          throw err;
        }
      }
    }
    throw lastError || new Error("uploadPartBytes failed");
  } catch (error) {
    if (error?.name === "AbortError") {
      log$5.warn("[StorageAdapter] uploadPartBytes已中断(AbortError):", error);
    } else {
      log$5.error("[StorageAdapter] uploadPartBytes失败:", error);
    }
    throw error;
  }
}
const BLOB_FILE_ID_MAP_KEY = Symbol.for("cloudpaste.uppy.blobFileIdMap");
const BLOB_FILE_ID_MAP_BOUND_KEY = Symbol.for("cloudpaste.uppy.blobFileIdMap.bound");
const log$4 = createLogger("StorageAdapter");
class StorageAdapter {
  constructor(currentPath, uppyInstance = null, options = {}) {
    this.config = {
      partSize: options.partSize || 5 * 1024 * 1024,
      // 5MB
      cacheExpiry: options.cacheExpiry || 24 * 60 * 60 * 1e3,
      // 24小时
      storagePrefix: options.storagePrefix || "uppy_multipart_",
      maxRetries: options.maxRetries || 3,
      retryDelay: options.retryDelay || 1e3,
      sessionTimeout: options.sessionTimeout || 60 * 60 * 1e3,
      // 1小时
      requireSha256ForPresign: options.requireSha256ForPresign === true,
      // 分片预初始化：在真正开始上传前，先请求一次 /fs/multipart/init 拿到“真实 partSize”，
      // 然后把 chunkSize 写入 file.meta，让 Uppy(AwsS3) 用正确的大小切片”。
      enableMultipartPreinit: options.enableMultipartPreinit === true,
      onError: options.onError,
      ...options
    };
    this.currentPath = currentPath;
    this.uppyInstance = uppyInstance;
    this.STORAGE_PREFIX = this.config.storagePrefix;
    this.sessionManager = new SessionManager(this.config);
    this.authProvider = new AuthProvider(useAuthStore());
    this.pathResolver = new PathResolver(currentPath);
    this.errorHandler = new ErrorHandler(this.config);
    this.uploadSessions = this.sessionManager.sessions;
    this.customPausedFiles = this.sessionManager.pausedFiles;
    this.authStore = this.authProvider.authStore;
    this._multipartPreinitInstalled = false;
    this._multipartPreinitCacheKey = "cloudpasteMultipartInit";
    this._multipartChunkSizeKey = "cloudpasteMultipartChunkSize";
    this._multipartPreinit = this._multipartPreinit.bind(this);
    this._ensureBlobFileIdMap();
    if (this.config.enableMultipartPreinit && this.uppyInstance) {
      this.installMultipartPreinit();
    }
  }
  /**
   * 维护一个 Blob/File -> Uppy fileId 的 WeakMap
   * - 解决 AwsS3.getChunkSize(blob) 无法直接拿到 file.meta 的问题
   * - 这个映射挂在 uppyInstance 上，避免多个 StorageAdapter 重复绑定事件
   */
  _ensureBlobFileIdMap() {
    const uppy = this.uppyInstance;
    if (!uppy) return null;
    if (!uppy[BLOB_FILE_ID_MAP_KEY]) {
      uppy[BLOB_FILE_ID_MAP_KEY] = /* @__PURE__ */ new WeakMap();
    }
    const map = uppy[BLOB_FILE_ID_MAP_KEY];
    if (!uppy[BLOB_FILE_ID_MAP_BOUND_KEY]) {
      uppy[BLOB_FILE_ID_MAP_BOUND_KEY] = true;
      uppy.on?.("file-added", (file) => {
        try {
          if (file?.data && typeof file.data === "object") {
            map.set(file.data, file.id);
          }
        } catch {
        }
      });
      uppy.on?.("file-removed", (file) => {
        try {
          if (file?.data && typeof file.data === "object") {
            map.delete(file.data);
          }
        } catch {
        }
      });
    }
    try {
      const files = typeof uppy.getFiles === "function" ? uppy.getFiles() : [];
      for (const f2 of files) {
        if (f2?.data && typeof f2.data === "object" && f2?.id) {
          map.set(f2.data, f2.id);
        }
      }
    } catch {
    }
    return map;
  }
  /**
   * @uppy/aws-s3 的 getChunkSize(data) 使用：
   * - data 是 Blob/File
   * - 需要反查到 Uppy file，然后读 meta.cloudpasteMultipartChunkSize
   * @param {any} data Blob/File
   * @returns {number} chunkSize（字节）
   */
  getChunkSizeForAwsS3(data) {
    try {
      if (!data || typeof data !== "object") return this.config.partSize || 5 * 1024 * 1024;
      const uppy = this.uppyInstance;
      if (!uppy) return this.config.partSize || 5 * 1024 * 1024;
      const map = uppy[BLOB_FILE_ID_MAP_KEY];
      const fileId = map?.get?.(data);
      if (!fileId) return this.config.partSize || 5 * 1024 * 1024;
      const uppyFile = typeof uppy.getFile === "function" ? uppy.getFile(fileId) : null;
      const n2 = Number(uppyFile?.meta?.[this._multipartChunkSizeKey]);
      if (Number.isFinite(n2) && n2 > 0) return Math.floor(n2);
      const resumePartSize = Number(uppyFile?.meta?.existingUpload?.partSize);
      if (Number.isFinite(resumePartSize) && resumePartSize > 0) {
        return Math.floor(resumePartSize);
      }
      return this.config.partSize || 5 * 1024 * 1024;
    } catch {
      return this.config.partSize || 5 * 1024 * 1024;
    }
  }
  /**
   * 创建“分片账本”（PartsLedger）
   * 统一管理已上传分片
   */
  _createPartsLedger(policy, storageKey) {
    return createPartsLedger({
      policy: policy || null,
      storageKey,
      storagePrefix: this.config.storagePrefix,
      cacheExpiry: this.config.cacheExpiry
    });
  }
  /**
   * 安装分片预初始化预处理器
   * - 只在“前端直传分片（per_part_url）”模式下需要：S3/HuggingFace
   * - 目的：提前拿到后端返回的 partSize，并写到 file.meta 上（再由 getChunkSizeForAwsS3(blob) 反查读取）
   */
  installMultipartPreinit() {
    if (!this.uppyInstance || this._multipartPreinitInstalled) return;
    try {
      this.uppyInstance.addPreProcessor(this._multipartPreinit);
      this._multipartPreinitInstalled = true;
    } catch (e2) {
      log$4.warn("[StorageAdapter] 安装 multipart 预初始化预处理器失败（可忽略）:", e2?.message || e2);
    }
  }
  /**
   * 分片预初始化（Uppy preProcessor）
   * - 在 AwsS3 构造 MultipartUploader 前执行
   * - 写入 file.meta.cloudpasteMultipartInit + file.meta.cloudpasteMultipartChunkSize
   */
  async _multipartPreinit(fileIDs = []) {
    if (!this.config.enableMultipartPreinit || !this.uppyInstance) return;
    const promises = (fileIDs || []).map(async (fileID) => {
      const file = this.uppyInstance.getFile(fileID);
      if (!file) return;
      const blob = file?.data instanceof Blob ? file.data : null;
      if (!blob) return;
      const meta = file?.meta || {};
      if (meta?.resumable && meta?.existingUpload && meta?.serverResume) {
        const existing = meta.existingUpload;
        const existingPartSize = Number(existing?.partSize ?? existing?.part_size ?? 0);
        if (Number.isFinite(existingPartSize) && existingPartSize > 0) {
          try {
            this.uppyInstance.setFileMeta(fileID, { [this._multipartChunkSizeKey]: Math.floor(existingPartSize) });
          } catch {
          }
        }
        return;
      }
      const cached = meta?.[this._multipartPreinitCacheKey];
      if (cached && typeof cached === "object" && cached.uploadId) {
        const cachedSize = Number(cached.partSize || cached.part_size || meta?.[this._multipartChunkSizeKey] || 0);
        if (Number.isFinite(cachedSize) && cachedSize > 0) {
          try {
            this.uppyInstance.setFileMeta(fileID, { [this._multipartChunkSizeKey]: Math.floor(cachedSize) });
          } catch {
          }
        }
        return;
      }
      let sha256 = null;
      if (this.config.requireSha256ForPresign) {
        if (typeof meta?.cloudpasteSha256 === "string" && meta.cloudpasteSha256) {
          sha256 = meta.cloudpasteSha256;
        } else if (typeof meta?.sha256 === "string" && meta.sha256) {
          sha256 = meta.sha256;
        } else {
          throw new Error("分片上传预初始化失败：缺少 sha256（请先等待 SHA-256 计算完成）");
        }
        if (!sha256) {
          throw new Error("分片上传预初始化失败：缺少 sha256（HuggingFace 需要先算 sha256 才能拿到分片URL）");
        }
      }
      const initMessage = "初始化上传会话（获取分片参数）...";
      try {
        this.uppyInstance.emit("preprocess-progress", file, {
          mode: "indeterminate",
          message: initMessage,
          value: 0
        });
      } catch {
      }
      let response;
      try {
        response = await initMultipartUpload(
          this.currentPath,
          file.name,
          file.size,
          file.type,
          this.config.partSize || 5 * 1024 * 1024,
          sha256 ? { sha256 } : {}
        );
      } finally {
        try {
          this.uppyInstance.emit("preprocess-complete", file);
        } catch {
        }
      }
      if (!response?.success) {
        throw new Error(response?.message || "分片上传预初始化失败：initMultipartUpload 返回失败");
      }
      const init = response.data || {};
      const chunkSize = Number(init.partSize || init.part_size || 0);
      if (!Number.isFinite(chunkSize) || chunkSize <= 0) {
        throw new Error("分片上传预初始化失败：后端没有返回有效的 partSize");
      }
      this.uppyInstance.setFileMeta(fileID, {
        [this._multipartPreinitCacheKey]: init,
        [this._multipartChunkSizeKey]: chunkSize
      });
    });
    await Promise.all(promises);
  }
  /**
   * 设置Uppy实例引用
   * @param {Object} uppyInstance Uppy实例
   */
  setUppyInstance(uppyInstance) {
    this.uppyInstance = uppyInstance;
    this._ensureBlobFileIdMap();
  }
  /**
   * 设置文件暂停状态
   * @param {string} fileId 文件ID
   * @param {boolean} paused 是否暂停
   */
  setFilePaused(fileId, paused) {
    this.sessionManager.setFilePaused(fileId, paused);
  }
  /**
   * 获取性能统计信息
   * @returns {Object} 性能统计
   */
  getPerformanceStats() {
    return {
      ...this.sessionManager.getStats()
    };
  }
  /**
   * 获取某个文件的上传会话信息（用于 UI 提示 / commit 阶段 / 调试）。
   * 注意：这里返回的是“本次上传流程”的会话，不代表存储侧的真实状态。
   * @param {string} fileId
   * @returns {any|null}
   */
  getUploadSession(fileId) {
    return this.uploadSessions.get(fileId) || null;
  }
  /**
   * 判断某个文件是否触发了“跳过上传”（例如：对象存储侧已存在内容，秒传/去重）。
   * @param {string} fileId
   * @returns {boolean}
   */
  isUploadSkipped(fileId) {
    const session = this.getUploadSession(fileId);
    return session?.skipUpload === true;
  }
  /**
   * 更新当前路径
   * @param {string} newPath 新路径
   */
  updatePath(newPath) {
    this.currentPath = newPath;
    this.pathResolver.updatePath(newPath);
  }
  /**
   * 销毁适配器，清理资源
   */
  destroy() {
    this.sessionManager.destroy();
  }
  /**
   * 批量处理预签名上传的commit阶段
   * @param {Array} successfulFiles 成功上传的文件列表
   * @returns {Promise<{failures: Array}>} commit结果
   */
  async batchCommitPresignedUploads(successfulFiles) {
    if (!successfulFiles || successfulFiles.length === 0) {
      return { failures: [] };
    }
    log$4.debug(`开始批量commit ${successfulFiles.length} 个文件`);
    const failures = [];
    const commitPromises = successfulFiles.map(async (file) => {
      try {
        await this.commitPresignedUpload(file, file.response);
        return { file, success: true };
      } catch (error) {
        log$4.error(`[StorageAdapter] ❌ commit失败: ${file.name}`, error);
        failures.push({
          fileName: file.name,
          fileId: file.id,
          error: error instanceof Error ? error.message : String(error),
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        return { file, success: false, error };
      }
    });
    const results = await Promise.allSettled(commitPromises);
    const successCount = results.filter((r2) => r2.status === "fulfilled" && r2.value.success).length;
    const failureCount = failures.length;
    log$4.debug(`批量commit完成: ${successCount}成功, ${failureCount}失败`);
    if (failures.length > 0) {
      log$4.warn(`[StorageAdapter] commit失败详情:`, failures);
    }
    return {
      failures,
      successCount,
      failureCount,
      totalCount: successfulFiles.length
    };
  }
  /**
   * 从 Uppy 的 response 里尽量提取 ETag
   * - ETag 在后端 commit 阶段是可选的：拿不到也不要阻断上传完成
   * @param {any} uploadResponse
   * @returns {string|null}
   */
  _extractEtagFromUploadResponse(uploadResponse) {
    try {
      if (typeof uploadResponse === "string") {
        const s2 = uploadResponse.trim();
        return s2 ? s2 : null;
      }
      const candidates = [
        uploadResponse?.etag,
        uploadResponse?.ETag,
        uploadResponse?.headers?.etag,
        uploadResponse?.headers?.ETag,
        uploadResponse?.body?.etag,
        uploadResponse?.body?.ETag,
        uploadResponse?.body?.headers?.etag,
        uploadResponse?.body?.headers?.ETag
      ];
      for (const value of candidates) {
        if (typeof value === "string") {
          const s2 = value.trim();
          if (s2) return s2;
        }
      }
      return null;
    } catch {
      return null;
    }
  }
  /**
   * 预签名单文件上传（presigned-single）的 commit 阶段
   * - 前端 PUT 直传完成后，还需要调用后端 /api/fs/presign/commit 做“登记/落库/刷新目录缓存”
   * - HuggingFace LFS 场景：commit 需要 sha256（oid），ETag 不强依赖
   * @param {Object} file Uppy file
   * @param {any} uploadResponse Uppy file.response
   */
  async commitPresignedUpload(file, uploadResponse) {
    const fileId = file?.id;
    if (!fileId) {
      throw new Error("提交预签名上传失败：缺少 file.id");
    }
    const session = this.uploadSessions.get(fileId);
    if (!session) {
      throw new Error("提交预签名上传失败：找不到上传会话信息（可能已被清理）");
    }
    const targetPath = session?.targetPath;
    const mountId = session?.mountId;
    if (!targetPath || !mountId) {
      throw new Error("提交预签名上传失败：缺少 targetPath 或 mountId");
    }
    const contentType = session?.contentType || file?.type || "application/octet-stream";
    const fileSize = Number(file?.size ?? 0);
    let etag = null;
    if (session?.skipUpload === true) {
      etag = null;
    } else if (typeof session?.etag === "string" && session.etag.trim()) {
      etag = session.etag.trim();
    } else {
      etag = this._extractEtagFromUploadResponse(uploadResponse);
    }
    const uploadInfo = {
      targetPath,
      mountId,
      storageConfigId: session?.storageConfigId ?? null,
      fileId: session?.fileId ?? null,
      storagePath: session?.storagePath ?? null,
      sha256: session?.sha256 ?? null
    };
    const response = await commitPresignedUpload(uploadInfo, etag, contentType, fileSize);
    if (!response?.success) {
      throw new Error(response?.message || "提交预签名上传失败");
    }
    this.uploadSessions.delete(fileId);
    return response?.data || response;
  }
  /**
   * 检查文件是否被暂停
   * @param {string} fileId 文件ID
   * @returns {boolean} 是否暂停
   */
  isFilePaused(fileId) {
    return this.customPausedFiles.has(fileId);
  }
  /**
   * 从上传URL获取对应的文件ID
   * @param {string} url 上传URL
   * @returns {string|null} 文件ID
   */
  getFileIdFromUrl(url) {
    for (const [fileId, session] of this.uploadSessions.entries()) {
      if (session.presignedUrls && session.presignedUrls.some((urlInfo) => url.includes(urlInfo.partNumber))) {
        return fileId;
      }
    }
    return null;
  }
  /**
   * 获取认证头部 - 用于XHR Upload插件
   * @returns {Object} 认证头部对象
   */
  getAuthHeaders() {
    return this.authProvider.getAuthHeaders();
  }
  /**
   * 单文件上传参数获取 预签名URL上传
   * @param {Object} file Uppy文件对象
   * @param {Object} options 选项
   * @returns {Promise<Object>} {method, url, fields, headers}
   */
  async getUploadParameters(file, options = {}) {
    try {
      log$4.debug(`获取预签名URL上传参数: ${file.name}`);
      const requireSha256ForPresign = this.config.requireSha256ForPresign === true;
      const blob = file?.data instanceof Blob ? file.data : null;
      const metaSha256 = typeof file?.meta?.cloudpasteSha256 === "string" && file.meta.cloudpasteSha256 || typeof file?.meta?.sha256 === "string" && file.meta.sha256 || null;
      let sha256 = null;
      if (requireSha256ForPresign) {
        if (typeof metaSha256 === "string" && metaSha256) {
          sha256 = metaSha256;
        } else if (blob) {
          sha256 = await sha256HexFromBlob(blob);
        }
        if (!sha256) {
          throw new Error("预签名上传需要 sha256，但当前文件无法计算 sha256（请重试或换一种上传方式）");
        }
      }
      const response = await getPresignedUploadUrl(
        this.currentPath,
        file.name,
        file.type,
        file.size,
        sha256
      );
      if (!response.success) {
        throw new Error(response.message || "获取预签名URL失败");
      }
      const data = response.data || {};
      if (requireSha256ForPresign && (!data.sha256 || typeof data.sha256 !== "string")) {
        throw new Error("预签名上传失败：后端没有返回 sha256（无法进入 commit 阶段）");
      }
      let canonicalSha256 = null;
      if (typeof data.sha256 === "string" && data.sha256) {
        canonicalSha256 = data.sha256;
      } else if (typeof sha256 === "string" && sha256) {
        canonicalSha256 = sha256;
      } else if (typeof metaSha256 === "string" && metaSha256) {
        canonicalSha256 = metaSha256;
      }
      this.uploadSessions.set(file.id, {
        targetPath: data.targetPath,
        mountId: data.mountId,
        fileId: data.fileId,
        storagePath: data.storagePath,
        publicUrl: data.publicUrl,
        storageConfigId: data.storageConfigId,
        contentType: data.contentType,
        storageType: data.storageType || data.storage_type || null,
        sha256: canonicalSha256,
        skipUpload: data.skipUpload === true
      });
      try {
        if (this.uppyInstance) {
          this.uppyInstance.setFileMeta(file.id, { cloudpasteSkipUpload: data.skipUpload === true });
        }
      } catch {
      }
      const baseHeaders = data.headers || {};
      const headers = {
        "Content-Type": baseHeaders["Content-Type"] || file.type || "application/octet-stream",
        ...baseHeaders
      };
      const skipUpload = data.skipUpload === true;
      if (skipUpload) {
        headers["x-cloudpaste-skip-upload"] = "1";
      }
      return {
        method: "PUT",
        url: skipUpload ? `${API_BASE_URL}/__uppy_skip_upload__` : data.presignedUrl,
        fields: {},
        headers,
        skipUpload,
        fileId: file.id
      };
    } catch (error) {
      log$4.error("[StorageAdapter] 获取预签名URL上传参数失败:", error);
      throw error;
    }
  }
  /**
   * 创建分片上传
   * @param {Object} file Uppy文件对象
   * @returns {Promise<Object>} {uploadId, key}
   */
  async createMultipartUpload(file) {
    return createMultipartUpload.call(this, file);
  }
  /**
   * 签名分片
   * @param {Object} file Uppy文件对象
   * @param {Object} partData 分片数据 {uploadId, key, partNumber, body}
   * @returns {Promise<Object>} {url, headers}
   */
  async signPart(file, partData) {
    return signPart.call(this, file, partData);
  }
  /**
   * 完成分片上传
   * @param {Object} file Uppy文件对象
   * @param {Object} data {uploadId, key, parts}
   * @returns {Promise<Object>} {location}
   */
  async completeMultipartUpload(file, data) {
    try {
      log$4.debug(`完成分片上传: ${file.name}`);
      const session = this.uploadSessions.get(file.id);
      if (!session) {
        throw new Error("找不到上传会话信息");
      }
      const incomingParts = Array.isArray(data?.parts) ? data.parts : [];
      let partsToSend = incomingParts;
      if (session?.skipUpload === true) {
        partsToSend = [];
      }
      try {
        if (session?.skipUpload !== true && session?.key) {
          const storageKey = String(session.key || "").replace(/^\/+/, "");
          const partsLedger = session?.partsLedger || this._createPartsLedger(session?.policy || null, storageKey);
          if (!session.partsLedger) session.partsLedger = partsLedger;
          try {
            await partsLedger.load?.();
          } catch {
          }
          const mergedAll = partsLedger.mergeIncomingParts(incomingParts);
          const completeParts = (Array.isArray(mergedAll) ? mergedAll : []).filter((p2) => typeof p2?.ETag === "string" && p2.ETag.length > 0).map((p2) => ({ PartNumber: Number(p2.PartNumber), ETag: p2.ETag })).filter((p2) => Number.isFinite(p2.PartNumber) && p2.PartNumber > 0);
          if (completeParts.length > 0) {
            partsToSend = completeParts;
          } else if (Array.isArray(mergedAll) && mergedAll.length > 0) {
            throw new Error("完成分片上传失败：本地账本里缺少 ETag（请重试或重新开始上传）");
          }
        }
      } catch (e2) {
        throw e2;
      }
      const response = await completeMultipartUpload(
        session.path,
        data.uploadId,
        partsToSend,
        session.fileName,
        file.size
      );
      if (!response.success) {
        throw new Error(response.message || "完成分片上传失败");
      }
      this.uploadSessions.delete(file.id);
      try {
        session?.partsLedger?.clearPersistent?.();
      } catch {
      }
      return {
        location: response.data.url || `${session.path}/${session.fileName}`
      };
    } catch (error) {
      log$4.error("[StorageAdapter] 完成分片上传失败:", error);
      throw error;
    }
  }
  /**
   * 中止分片上传
   * @param {Object} file Uppy文件对象
   * @param {Object} data {uploadId, key}
   */
  async abortMultipartUpload(file, data) {
    try {
      log$4.debug(`中止分片上传: ${file.name}`);
      const session = this.uploadSessions.get(file.id);
      if (session) {
        await abortMultipartUpload(session.path, data.uploadId, session.fileName);
        this.uploadSessions.delete(file.id);
        try {
          session?.partsLedger?.clearPersistent?.();
        } catch {
        }
      }
    } catch (error) {
      log$4.error("[StorageAdapter] 中止分片上传失败:", error);
    }
  }
  /**
   * 列出已上传的分片
   * 使用前端缓存，避免重复调用后端API
   * @param {Object} file Uppy文件对象
   * @param {Object} options {uploadId, key}
   * @returns {Promise<Array>} 分片列表
   */
  async listParts(file, { uploadId, key }) {
    try {
      log$4.debug(`listParts被调用: ${file.name}, uploadId: ${uploadId}, key: ${key}`);
      const storageKey = String(key || "").replace(/^\/+/, "");
      const fsPath = this.buildFullPathFromKey(storageKey);
      const session = this.uploadSessions.get(file.id) || null;
      const basePolicy = session?.policy || null;
      let partsLedger = session?.partsLedger || this._createPartsLedger(basePolicy, storageKey);
      if (session && !session.partsLedger) session.partsLedger = partsLedger;
      try {
        await partsLedger.load?.();
      } catch {
      }
      if (partsLedger.ledgerPolicy === "client_keeps") {
        const cached = partsLedger.toAwsPartsArray();
        log$4.debug(`client_keeps：使用本地账本（${cached.length}片）`);
        return cached;
      }
      log$4.debug(`回源查询服务器 listMultipartParts`);
      const response = await listMultipartParts(fsPath, uploadId, file.name);
      if (!response?.success) {
        throw new Error(response?.message || "listMultipartParts 失败");
      }
      const policyFromServer = response?.data?.policy || null;
      const ledgerPolicyFromServerRaw = policyFromServer?.partsLedgerPolicy ?? policyFromServer?.parts_ledger_policy ?? null;
      const ledgerPolicyFromServer = String(ledgerPolicyFromServerRaw || "");
      if (ledgerPolicyFromServer === "client_keeps") {
        partsLedger = this._createPartsLedger(policyFromServer, storageKey);
        try {
          await partsLedger.load?.();
        } catch {
        }
        if (session) session.partsLedger = partsLedger;
        const cached = partsLedger.toAwsPartsArray();
        log$4.debug(`client_keeps：服务端标记后切换到本地账本（${cached.length}片）`);
        return cached;
      }
      const serverParts = Array.isArray(response?.data?.parts) ? response.data.parts : [];
      partsLedger.replaceAll(serverParts);
      const normalized = partsLedger.toAwsPartsArray();
      log$4.debug(`服务器返回${normalized.length}个分片（已写入内存账本）`);
      return normalized;
    } catch (error) {
      log$4.error("[StorageAdapter] listParts失败:", error);
      return [];
    }
  }
  /**
   * 上传分片字节
   * 控制实际的分片上传过程，在这里处理已上传分片的跳过逻辑
   * @param {Object} options {signature, body, onComplete, size, onProgress, signal}
   * @returns {Promise<Object>} {ETag}
   */
  async uploadPartBytes({ signature, body, onComplete, size, onProgress, signal }) {
    return uploadPartBytes.call(this, { signature, body, onComplete, size, onProgress, signal });
  }
  /**
   * 单文件直传（presigned-single）适配
   */
  async uploadSingleFile({ signature, body, onComplete, size, onProgress, signal }) {
    return await this.uploadPartBytes({ signature, body, onComplete, size, onProgress, signal });
  }
  cleanup() {
    this.uploadSessions.clear();
    const removed = clearAllClientLedgers({ storagePrefix: this.config.storagePrefix });
    log$4.debug(`清理所有上传会话与客户端账本：removed=${removed}`);
  }
  /**
   * 从storage key构建完整的挂载点路径
   * @param {string} storageKey 存储的相对路径
   * @returns {string} 完整的挂载点路径
   */
  buildFullPathFromKey(storageKey) {
    return this.pathResolver.buildFullPathFromKey(storageKey);
  }
}
class ProgressTimeout {
  #aliveTimer;
  #isDone = false;
  #onTimedOut;
  #timeout;
  constructor(timeout, timeoutHandler) {
    this.#timeout = timeout;
    this.#onTimedOut = () => timeoutHandler(timeout);
  }
  progress() {
    if (this.#isDone)
      return;
    if (this.#timeout > 0) {
      clearTimeout(this.#aliveTimer);
      this.#aliveTimer = setTimeout(this.#onTimedOut, this.#timeout);
    }
  }
  done() {
    if (!this.#isDone) {
      clearTimeout(this.#aliveTimer);
      this.#aliveTimer = void 0;
      this.#isDone = true;
    }
  }
}
const noop = () => {
};
function fetcher(url, options = {}) {
  const { body = null, headers = {}, method = "GET", onBeforeRequest = noop, onUploadProgress = noop, shouldRetry = () => true, onAfterResponse = noop, onTimeout = noop, responseType, retries = 3, signal = null, timeout = 3e4, withCredentials = false } = options;
  const delay = (attempt) => 0.3 * 2 ** (attempt - 1) * 1e3;
  const timer = new ProgressTimeout(timeout, onTimeout);
  function requestWithRetry(retryCount2 = 0) {
    return new Promise(async (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const onError = (error) => {
        if (shouldRetry(xhr) && retryCount2 < retries) {
          setTimeout(() => {
            requestWithRetry(retryCount2 + 1).then(resolve, reject);
          }, delay(retryCount2));
        } else {
          timer.done();
          reject(error);
        }
      };
      xhr.open(method, url, true);
      xhr.withCredentials = withCredentials;
      if (responseType) {
        xhr.responseType = responseType;
      }
      signal?.addEventListener("abort", () => {
        xhr.abort();
        reject(new DOMException("Aborted", "AbortError"));
      });
      xhr.onload = async () => {
        try {
          await onAfterResponse(xhr, retryCount2);
        } catch (err) {
          err.request = xhr;
          onError(err);
          return;
        }
        if (xhr.status >= 200 && xhr.status < 300) {
          timer.done();
          resolve(xhr);
        } else if (shouldRetry(xhr) && retryCount2 < retries) {
          setTimeout(() => {
            requestWithRetry(retryCount2 + 1).then(resolve, reject);
          }, delay(retryCount2));
        } else {
          timer.done();
          reject(new NetworkError(xhr.statusText, xhr));
        }
      };
      xhr.onerror = () => onError(new NetworkError(xhr.statusText, xhr));
      xhr.upload.onprogress = (event) => {
        timer.progress();
        onUploadProgress(event);
      };
      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }
      await onBeforeRequest(xhr, retryCount2);
      xhr.send(body);
    });
  }
  return requestWithRetry();
}
function isNetworkError(xhr) {
  if (!xhr) {
    return false;
  }
  return xhr.readyState !== 0 && xhr.readyState !== 4 || xhr.status === 0;
}
const version = "4.4.2";
const packageJson = {
  version
};
const locale = {
  strings: {
    // Shown in the Informer if an upload is being canceled because it stalled for too long.
    uploadStalled: "Upload has not made any progress for %{seconds} seconds. You may want to retry it."
  }
};
function buildResponseError(xhr, err) {
  let error = err;
  if (!error)
    error = new Error("Upload error");
  if (typeof error === "string")
    error = new Error(error);
  if (!(error instanceof Error)) {
    error = Object.assign(new Error("Upload error"), { data: error });
  }
  if (isNetworkError(xhr)) {
    error = new NetworkError(error, xhr);
    return error;
  }
  error.request = xhr;
  return error;
}
function setTypeInBlob(file) {
  const dataWithUpdatedType = file.data.slice(0, file.data.size, file.meta.type);
  return dataWithUpdatedType;
}
const defaultOptions = {
  formData: true,
  fieldName: "file",
  method: "post",
  allowedMetaFields: true,
  bundle: false,
  headers: {},
  timeout: 30 * 1e3,
  limit: 5,
  withCredentials: false,
  responseType: ""
};
class XHRUpload extends BasePlugin {
  static VERSION = packageJson.version;
  #getFetcher;
  requests;
  uploaderEvents;
  constructor(uppy, opts) {
    super(uppy, {
      ...defaultOptions,
      fieldName: opts.bundle ? "files[]" : "file",
      ...opts
    });
    this.type = "uploader";
    this.id = this.opts.id || "XHRUpload";
    this.defaultLocale = locale;
    this.i18nInit();
    if (internalRateLimitedQueue in this.opts) {
      this.requests = this.opts[internalRateLimitedQueue];
    } else {
      this.requests = new RateLimitedQueue(this.opts.limit);
    }
    if (this.opts.bundle && !this.opts.formData) {
      throw new Error("`opts.formData` must be true when `opts.bundle` is enabled.");
    }
    if (this.opts.bundle && typeof this.opts.headers === "function") {
      throw new Error("`opts.headers` can not be a function when the `bundle: true` option is set.");
    }
    if (opts?.allowedMetaFields === void 0 && "metaFields" in this.opts) {
      throw new Error("The `metaFields` option has been renamed to `allowedMetaFields`.");
    }
    this.uploaderEvents = /* @__PURE__ */ Object.create(null);
    this.#getFetcher = (files) => {
      return async (url, options) => {
        try {
          const res = await fetcher(url, {
            ...options,
            onBeforeRequest: (xhr, retryCount2) => this.opts.onBeforeRequest?.(xhr, retryCount2, files),
            shouldRetry: this.opts.shouldRetry,
            onAfterResponse: this.opts.onAfterResponse,
            onTimeout: (timeout) => {
              const seconds = Math.ceil(timeout / 1e3);
              const error = new Error(this.i18n("uploadStalled", { seconds }));
              this.uppy.emit("upload-stalled", error, files);
            },
            onUploadProgress: (event) => {
              if (event.lengthComputable) {
                for (const { id } of files) {
                  const file = this.uppy.getFile(id);
                  this.uppy.emit("upload-progress", file, {
                    uploadStarted: file.progress.uploadStarted ?? 0,
                    bytesUploaded: event.loaded / event.total * file.size,
                    bytesTotal: file.size
                  });
                }
              }
            }
          });
          let body = await this.opts.getResponseData?.(res);
          if (res.responseType === "json") {
            body ??= res.response;
          } else {
            try {
              body ??= JSON.parse(res.responseText);
            } catch (cause) {
              throw new Error("@uppy/xhr-upload expects a JSON response (with a `url` property). To parse non-JSON responses, use `getResponseData` to turn your response into JSON.", { cause });
            }
          }
          const uploadURL = typeof body?.url === "string" ? body.url : void 0;
          for (const { id } of files) {
            this.uppy.emit("upload-success", this.uppy.getFile(id), {
              status: res.status,
              body,
              uploadURL
            });
          }
          return res;
        } catch (error) {
          if (error.name === "AbortError") {
            return void 0;
          }
          const request = error.request;
          for (const file of files) {
            this.uppy.emit("upload-error", this.uppy.getFile(file.id), buildResponseError(request, error), request);
          }
          throw error;
        }
      };
    };
  }
  getOptions(file) {
    const overrides = this.uppy.getState().xhrUpload;
    const { headers } = this.opts;
    const opts = {
      ...this.opts,
      ...overrides || {},
      ...file.xhrUpload || {},
      headers: {}
    };
    if (typeof headers === "function") {
      opts.headers = headers(file);
    } else {
      Object.assign(opts.headers, this.opts.headers);
    }
    if (overrides) {
      Object.assign(opts.headers, overrides.headers);
    }
    if (file.xhrUpload) {
      Object.assign(opts.headers, file.xhrUpload.headers);
    }
    return opts;
  }
  addMetadata(formData, meta, opts) {
    const allowedMetaFields = getAllowedMetaFields(opts.allowedMetaFields, meta);
    allowedMetaFields.forEach((item) => {
      const value = meta[item];
      if (Array.isArray(value)) {
        value.forEach((subItem) => formData.append(item, subItem));
      } else {
        formData.append(item, value);
      }
    });
  }
  createFormDataUpload(file, opts) {
    const formPost = new FormData();
    this.addMetadata(formPost, file.meta, opts);
    const dataWithUpdatedType = setTypeInBlob(file);
    if (file.name) {
      formPost.append(opts.fieldName, dataWithUpdatedType, file.meta.name);
    } else {
      formPost.append(opts.fieldName, dataWithUpdatedType);
    }
    return formPost;
  }
  createBundledUpload(files, opts) {
    const formPost = new FormData();
    const { meta } = this.uppy.getState();
    this.addMetadata(formPost, meta, opts);
    files.forEach((file) => {
      const options = this.getOptions(file);
      const dataWithUpdatedType = setTypeInBlob(file);
      if (file.name) {
        formPost.append(options.fieldName, dataWithUpdatedType, file.name);
      } else {
        formPost.append(options.fieldName, dataWithUpdatedType);
      }
    });
    return formPost;
  }
  async #uploadLocalFile(file) {
    const events = new EventManager(this.uppy);
    const controller = new AbortController();
    const uppyFetch = this.requests.wrapPromiseFunction(async () => {
      const opts = this.getOptions(file);
      const fetch2 = this.#getFetcher([file]);
      const body = opts.formData ? this.createFormDataUpload(file, opts) : file.data;
      const endpoint = typeof opts.endpoint === "string" ? opts.endpoint : await opts.endpoint(file);
      return fetch2(endpoint, {
        ...opts,
        body,
        signal: controller.signal
      });
    });
    events.onFileRemove(file.id, () => controller.abort());
    events.onCancelAll(file.id, () => {
      controller.abort();
    });
    try {
      await uppyFetch().abortOn(controller.signal);
    } catch (error) {
      if (error.message !== "Cancelled") {
        throw error;
      }
    } finally {
      events.remove();
    }
  }
  async #uploadBundle(files) {
    const controller = new AbortController();
    const uppyFetch = this.requests.wrapPromiseFunction(async () => {
      const optsFromState = this.uppy.getState().xhrUpload ?? {};
      const fetch2 = this.#getFetcher(files);
      const body = this.createBundledUpload(files, {
        ...this.opts,
        ...optsFromState
      });
      const endpoint = typeof this.opts.endpoint === "string" ? this.opts.endpoint : await this.opts.endpoint(files);
      return fetch2(endpoint, {
        // headers can't be a function with bundle: true
        ...this.opts,
        body,
        signal: controller.signal
      });
    });
    function abort() {
      controller.abort();
    }
    this.uppy.once("cancel-all", abort);
    try {
      await uppyFetch().abortOn(controller.signal);
    } catch (error) {
      if (error.message !== "Cancelled") {
        throw error;
      }
    } finally {
      this.uppy.off("cancel-all", abort);
    }
  }
  #getCompanionClientArgs(file) {
    const opts = this.getOptions(file);
    const allowedMetaFields = getAllowedMetaFields(opts.allowedMetaFields, file.meta);
    return {
      ...file.remote?.body,
      protocol: "multipart",
      endpoint: opts.endpoint,
      size: file.data.size,
      fieldname: opts.fieldName,
      metadata: Object.fromEntries(allowedMetaFields.map((name) => [name, file.meta[name]])),
      httpMethod: opts.method,
      useFormData: opts.formData,
      headers: opts.headers
    };
  }
  async #uploadFiles(files) {
    await Promise.allSettled(files.map((file) => {
      if (file.isRemote) {
        const getQueue = () => this.requests;
        const controller = new AbortController();
        const removedHandler = (removedFile) => {
          if (removedFile.id === file.id)
            controller.abort();
        };
        this.uppy.on("file-removed", removedHandler);
        const uploadPromise = this.uppy.getRequestClientForFile(file).uploadRemoteFile(file, this.#getCompanionClientArgs(file), {
          signal: controller.signal,
          getQueue
        });
        this.requests.wrapSyncFunction(() => {
          this.uppy.off("file-removed", removedHandler);
        }, { priority: -1 })();
        return uploadPromise;
      }
      return this.#uploadLocalFile(file);
    }));
  }
  #handleUpload = async (fileIDs) => {
    if (fileIDs.length === 0) {
      this.uppy.log("[XHRUpload] No files to upload!");
      return;
    }
    if (this.opts.limit === 0 && !this.opts[internalRateLimitedQueue]) {
      this.uppy.log("[XHRUpload] When uploading multiple files at once, consider setting the `limit` option (to `10` for example), to limit the number of concurrent uploads, which helps prevent memory and network issues: https://uppy.io/docs/xhr-upload/#limit-0", "warning");
    }
    this.uppy.log("[XHRUpload] Uploading...");
    const files = this.uppy.getFilesByIds(fileIDs);
    const filesFiltered = filterNonFailedFiles(files);
    const filesToEmit = filterFilesToEmitUploadStarted(filesFiltered);
    this.uppy.emit("upload-start", filesToEmit);
    if (this.opts.bundle) {
      const isSomeFileRemote = filesFiltered.some((file) => file.isRemote);
      if (isSomeFileRemote) {
        throw new Error("Can’t upload remote files when the `bundle: true` option is set");
      }
      if (typeof this.opts.headers === "function") {
        throw new TypeError("`headers` may not be a function when the `bundle: true` option is set");
      }
      await this.#uploadBundle(filesFiltered);
    } else {
      await this.#uploadFiles(filesFiltered);
    }
  };
  install() {
    if (this.opts.bundle) {
      const { capabilities } = this.uppy.getState();
      this.uppy.setState({
        capabilities: {
          ...capabilities,
          individualCancellation: false
        }
      });
    }
    this.uppy.addUploader(this.#handleUpload);
  }
  uninstall() {
    if (this.opts.bundle) {
      const { capabilities } = this.uppy.getState();
      this.uppy.setState({
        capabilities: {
          ...capabilities,
          individualCancellation: true
        }
      });
    }
    this.uppy.removeUploader(this.#handleUpload);
  }
}
const log$3 = createLogger("S3Driver");
class S3Driver {
  constructor(config = {}) {
    this.config = config;
    this.capabilities = createCapabilities({
      share: {
        backendStream: true,
        backendForm: true,
        presigned: true,
        url: true
      },
      fs: {
        backendStream: true,
        backendForm: true,
        presignedSingle: true,
        multipart: true
      }
    });
    this.share = {
      applyShareUploader: this.applyShareUploader.bind(this),
      applyUrlUploader: this.applyUrlUploader.bind(this),
      applyDirectShareUploader: this.applyDirectShareUploader.bind(this)
    };
    this.fs = {
      // 只读辅助：供断点续传插件查询进行中的上传和已上传分片
      listUploads: this.listUploads.bind(this),
      listParts: this.listParts.bind(this),
      applyFsUploader: this.applyFsUploader.bind(this)
    };
  }
  get storageConfigId() {
    return this.config?.id ?? null;
  }
  // FS --------------------------------------------------------------------
  /**
   * 在给定的 Uppy 实例上安装 FS 上传所需的 Uppy 插件
   * - presigned-single: 使用 AwsS3 + getUploadParameters（单请求 PUT 直传）
   * - presigned-multipart: 使用 AwsS3 多分片 hooks（create/sign/complete/listParts/abort）
   * @param {object} uppy 已创建的 Uppy 实例
   * @param {object} options { strategy, path }
   */
  applyFsUploader(uppy, { strategy, path } = {}) {
    if (!uppy) throw new Error("applyFsUploader 需要提供 Uppy 实例");
    if (strategy === STORAGE_STRATEGIES.PRESIGNED_SINGLE || strategy === STORAGE_STRATEGIES.PRESIGNED_MULTIPART) {
      const isMultipart = strategy === STORAGE_STRATEGIES.PRESIGNED_MULTIPART;
      const MB2 = 1024 * 1024;
      const partSizeMbRaw = Number(this.config?.multipart_part_size_mb);
      const partSizeMb = Number.isFinite(partSizeMbRaw) && partSizeMbRaw > 0 ? Math.floor(partSizeMbRaw) : 5;
      const partSizeBytes = Math.max(5 * MB2, Math.min(partSizeMb * MB2, 5 * 1024 * MB2));
      const concurrencyRaw = Number(this.config?.multipart_concurrency);
      const multipartConcurrency = Number.isFinite(concurrencyRaw) && concurrencyRaw > 0 ? Math.max(1, Math.min(Math.floor(concurrencyRaw), 10)) : 3;
      const adapter = new StorageAdapter(path || "/", uppy, {
        // per_part_url 场景：后端可能会调整 partSize（例如 S3 的 10k parts 上限），需要预初始化来拿到真实 chunkSize
        enableMultipartPreinit: isMultipart,
        ...isMultipart ? { partSize: partSizeBytes } : {}
      });
      const awsS3Opts = {
        id: "AwsS3",
        limit: isMultipart ? multipartConcurrency : 3,
        shouldUseMultipart: () => isMultipart,
        getChunkSize: (data) => adapter.getChunkSizeForAwsS3(data)
      };
      if (isMultipart) {
        awsS3Opts.getUploadParameters = adapter.getUploadParameters.bind(adapter);
        awsS3Opts.createMultipartUpload = adapter.createMultipartUpload.bind(adapter);
        awsS3Opts.signPart = adapter.signPart.bind(adapter);
        awsS3Opts.uploadPartBytes = adapter.uploadPartBytes.bind(adapter);
        awsS3Opts.completeMultipartUpload = adapter.completeMultipartUpload.bind(adapter);
        awsS3Opts.abortMultipartUpload = adapter.abortMultipartUpload.bind(adapter);
        awsS3Opts.listParts = adapter.listParts.bind(adapter);
      } else {
        awsS3Opts.getUploadParameters = adapter.getUploadParameters.bind(adapter);
        awsS3Opts.uploadPartBytes = adapter.uploadSingleFile.bind(adapter);
      }
      uppy.use(AwsS3Multipart, awsS3Opts);
      return {
        adapter,
        mode: isMultipart ? STORAGE_STRATEGIES.PRESIGNED_MULTIPART : STORAGE_STRATEGIES.PRESIGNED_SINGLE
      };
    }
    if (strategy === STORAGE_STRATEGIES.BACKEND_STREAM || strategy === STORAGE_STRATEGIES.BACKEND_FORM) {
      const headers = buildAuthHeadersForRequest({});
      try {
        uppy.setMeta({ path: path || "/", use_multipart: "false" });
      } catch {
      }
      if (strategy === STORAGE_STRATEGIES.BACKEND_FORM) {
        uppy.use(XHRUpload, {
          id: "S3BackendForm",
          endpoint: getFullApiUrl("/fs/upload"),
          method: "POST",
          formData: true,
          fieldName: "file",
          limit: 3,
          allowedMetaFields: ["path", "use_multipart", "upload_id"],
          headers
        });
      } else {
        uppy.use(XHRUpload, {
          id: "S3BackendStream",
          endpoint: (file) => {
            const meta = file.meta || {};
            const basePath = meta.path || path || "/";
            const uploadId = meta.upload_id;
            const params = new URLSearchParams();
            params.set("path", basePath);
            if (uploadId) {
              params.set("upload_id", uploadId);
            }
            return `${getFullApiUrl("/fs/upload")}?${params.toString()}`;
          },
          method: "PUT",
          formData: false,
          limit: 3,
          headers: (file) => {
            const meta = file.meta || {};
            const uploadOptions = {
              overwrite: !!meta.overwrite,
              originalFilename: !!meta.original_filename
            };
            const rawName = meta.name || file.name || "upload-file";
            const encodedName = encodeURIComponent(rawName);
            return {
              ...headers,
              "x-fs-filename": encodedName,
              "x-fs-options": btoa(JSON.stringify(uploadOptions))
            };
          }
        });
      }
      uppy.on("upload", () => {
        const files = uppy.getFiles();
        files.forEach((file) => {
          if (file.meta?.name && file.meta.name !== file.name) {
            uppy.setFileState(file.id, { name: file.meta.name });
          }
        });
      });
      return {
        adapter: null,
        mode: strategy
      };
    }
    return null;
  }
  /**
   * 在 Uppy 上安装用于“文件分享（本地）”的一致上传实现（一次性替换版）
   * - 统一走 AwsS3 单请求（getUploadParameters），暂停=取消、恢复=重传
   * - 在 'upload-success' 内部完成 share/commit（/share/presign + /share/commit）
   * @param {object} uppy Uppy 实例
   * @param {object} options { payload }
   */
  applyShareUploader(uppy, { payload, onShareRecord } = {}) {
    if (!uppy) throw new Error("applyShareUploader 需要提供 Uppy 实例");
    const basePayload = this.#withStorageConfig(payload || {});
    const pluginId = "AwsS3Share";
    if (uppy.getPlugin(pluginId)) return;
    const adapter = new StorageAdapter("/", uppy);
    uppy.use(AwsS3Multipart, {
      id: pluginId,
      shouldUseMultipart: () => false,
      limit: 3,
      getUploadParameters: async (file) => {
        const meta = file?.meta || {};
        const fileName = typeof meta?.name === "string" && meta.name ? meta.name : file.name;
        const merged = {
          ...basePayload,
          slug: meta.slug ?? basePayload.slug,
          path: meta.path ?? basePayload.path
        };
        const presign = await api.file.getUploadPresignedUrl({
          storage_config_id: merged.storage_config_id,
          filename: fileName,
          mimetype: file.type || "application/octet-stream",
          path: merged.path,
          size: file.size
        });
        if (!presign?.success || !presign?.data) {
          throw new Error(presign?.message || "获取预签名URL失败");
        }
        const data = presign.data;
        const uploadUrl = data.uploadUrl || data.upload_url;
        try {
          uppy.setFileMeta(file.id, {
            key: data.key,
            storage_config_id: data.storage_config_id || merged.storage_config_id,
            filename: typeof data?.filename === "string" && data.filename ? data.filename : fileName,
            path: merged.path,
            slug: merged.slug,
            password: basePayload.password || meta.password || null,
            expires_in: basePayload.expires_in,
            max_views: basePayload.max_views
          });
        } catch {
        }
        return {
          method: "PUT",
          url: uploadUrl,
          headers: data.headers || {}
        };
      },
      // 使用 XMLHttpRequest 避免 CORS 问题
      uploadPartBytes: adapter.uploadSingleFile.bind(adapter)
    });
    const onSuccess = async (file) => {
      const meta = file?.meta || {};
      try {
        const commitRes = await api.file.completeFileUpload({
          key: meta.key,
          storage_config_id: meta.storage_config_id,
          filename: typeof meta?.filename === "string" && meta.filename ? meta.filename : typeof meta?.name === "string" && meta.name ? meta.name : file.name,
          size: file.size,
          etag: void 0,
          // ETag 可能因 CORS 不可用，后端兼容
          slug: meta.slug,
          remark: basePayload.remark,
          password: basePayload.password,
          expires_in: basePayload.expires_in,
          max_views: basePayload.max_views,
          use_proxy: basePayload.use_proxy,
          original_filename: basePayload.original_filename ?? false,
          path: meta.path
        });
        if (commitRes?.data) {
          const shareRecord = commitRes.data;
          log$3.debug("[ShareUploader] commit result", shareRecord);
          try {
            uppy.setFileMeta(file.id, {
              fileId: shareRecord.id,
              shareRecord
            });
          } catch {
          }
          try {
            uppy.emit("share-record", { file, shareRecord });
          } catch {
          }
          try {
            onShareRecord?.({ file, shareRecord });
          } catch {
          }
        }
      } catch (e2) {
        try {
          uppy.emit("upload-error", file, e2);
        } catch {
        }
      }
    };
    uppy.on("upload-success", onSuccess);
  }
  /**
   * Share 直传上传：通过 Uppy + XHRUpload 调用后端 /share/upload（ObjectStore 多存储通用）
   * S3 在这一模式下与 WebDAV 一致，由后端统一处理写入与建档。
   */
  applyDirectShareUploader(uppy, { payload, onShareRecord, shareMode } = {}) {
    if (!uppy) throw new Error("applyDirectShareUploader 需要提供 Uppy 实例");
    const basePayload = this.#withStorageConfig(payload || {});
    const mode = (shareMode || "stream").toLowerCase();
    const baseMeta = {
      storage_config_id: basePayload.storage_config_id,
      path: basePayload.path || "",
      slug: basePayload.slug || "",
      remark: basePayload.remark || "",
      password: basePayload.password || "",
      expires_in: basePayload.expires_in || "0",
      max_views: basePayload.max_views ?? 0,
      use_proxy: basePayload.use_proxy,
      original_filename: basePayload.original_filename
    };
    const authHeaders = buildAuthHeadersForRequest({});
    try {
      uppy.setMeta(baseMeta);
    } catch {
    }
    if (mode === "stream") {
      uppy.use(XHRUpload, {
        id: "S3ShareUploadStream",
        endpoint: getFullApiUrl("/share/upload"),
        method: "PUT",
        formData: false,
        limit: 3,
        headers: (file) => {
          const meta = file.meta || {};
          const options = {
            storage_config_id: meta.storage_config_id,
            path: meta.path,
            slug: meta.slug,
            remark: meta.remark,
            password: meta.password,
            expires_in: meta.expires_in,
            max_views: meta.max_views,
            use_proxy: meta.use_proxy,
            original_filename: meta.original_filename,
            upload_id: meta.upload_id
          };
          let encodedOptions = "";
          try {
            encodedOptions = btoa(JSON.stringify(options));
          } catch {
            encodedOptions = "";
          }
          const rawName = meta.name || file.name || "upload-file";
          const encodedName = encodeURIComponent(rawName);
          return {
            ...authHeaders,
            "x-share-filename": encodedName,
            ...encodedOptions ? { "x-share-options": encodedOptions } : {}
          };
        }
      });
    } else {
      uppy.use(XHRUpload, {
        id: "S3ShareUploadDirect",
        endpoint: getFullApiUrl("/share/upload"),
        method: "POST",
        formData: true,
        fieldName: "file",
        limit: 3,
        allowedMetaFields: [
          "storage_config_id",
          "path",
          "slug",
          "remark",
          "password",
          "expires_in",
          "max_views",
          "use_proxy",
          "original_filename",
          "upload_id"
        ],
        headers: authHeaders
      });
    }
    uppy.on("upload", () => {
      const files = uppy.getFiles();
      files.forEach((file) => {
        if (file.meta?.name && file.meta.name !== file.name) {
          uppy.setFileState(file.id, { name: file.meta.name });
        }
      });
    });
    const onSuccess = (file, response) => {
      try {
        const body = response && (response.body || response);
        if (!body || body.success !== true) return;
        const shareRecord = body.data;
        if (!shareRecord) return;
        try {
          uppy.setFileMeta(file.id, {
            ...file.meta || {},
            shareRecord,
            fileId: shareRecord.id
          });
        } catch {
        }
        try {
          uppy.emit("share-record", { file, shareRecord });
        } catch {
        }
        try {
          onShareRecord?.({ file, shareRecord });
        } catch {
        }
      } catch {
      }
    };
    uppy.on("upload-success", onSuccess);
  }
  /**
   * URL 分享：使用通用 share/presign + AwsS3 单请求 + 在 'upload-success' 提交 share/commit
   */
  applyUrlUploader(uppy, { payload, onShareRecord } = {}) {
    if (!uppy) throw new Error("applyUrlUploader 需要提供 Uppy 实例");
    const basePayload = this.#withStorageConfig(payload || {});
    const pluginId = "AwsS3UrlShare";
    if (uppy.getPlugin(pluginId)) return;
    const adapter = new StorageAdapter("/", uppy);
    uppy.use(AwsS3Multipart, {
      id: pluginId,
      shouldUseMultipart: () => false,
      limit: 3,
      getUploadParameters: async (file) => {
        const meta = file?.meta || {};
        const fileName = typeof meta?.name === "string" && meta.name ? meta.name : file.name;
        const merged = {
          ...basePayload,
          slug: meta.slug ?? basePayload.slug,
          path: meta.path ?? basePayload.path
        };
        const presign = await api.file.getUploadPresignedUrl({
          storage_config_id: merged.storage_config_id,
          filename: fileName,
          mimetype: file.type || "application/octet-stream",
          path: merged.path,
          size: file.size
        });
        if (!presign?.success || !presign?.data) throw new Error(presign?.message || "获取URL上传预签名失败");
        const presignData = presign.data;
        const uploadUrl = presignData.uploadUrl || presignData.upload_url;
        const resolvedKey = presignData.key;
        const resolvedStorageConfigId = presignData.storage_config_id || merged.storage_config_id;
        const resolvedFilename = typeof presignData?.filename === "string" && presignData.filename ? presignData.filename : fileName;
        if (!uploadUrl || !resolvedKey || !resolvedStorageConfigId) {
          throw new Error("URL上传预签名缺少必要的 key 或上传地址");
        }
        try {
          uppy.setFileMeta(file.id, {
            key: resolvedKey,
            storage_config_id: resolvedStorageConfigId,
            filename: resolvedFilename,
            path: merged.path,
            slug: merged.slug,
            remark: merged.remark,
            password: merged.password,
            expires_in: merged.expires_in,
            max_views: merged.max_views
          });
        } catch {
        }
        return { method: "PUT", url: uploadUrl, headers: presignData.headers || {} };
      },
      // 使用 XMLHttpRequest 避免 CORS 问题
      uploadPartBytes: adapter.uploadSingleFile.bind(adapter)
    });
    const onSuccess = async (file) => {
      const meta = file?.meta || {};
      try {
        const commitRes = await api.file.completeFileUpload({
          key: meta.key,
          storage_config_id: meta.storage_config_id,
          filename: typeof meta?.filename === "string" && meta.filename ? meta.filename : typeof meta?.name === "string" && meta.name ? meta.name : file.name,
          size: file.size,
          etag: void 0,
          path: meta.path,
          slug: meta.slug,
          remark: meta.remark ?? basePayload.remark,
          password: meta.password ?? basePayload.password,
          expires_in: meta.expires_in ?? basePayload.expires_in,
          max_views: meta.max_views ?? basePayload.max_views
        });
        if (commitRes?.data) {
          const shareRecord = commitRes.data;
          log$3.debug("[UrlShareUploader] commit result", shareRecord);
          try {
            uppy.setFileMeta(file.id, {
              fileId: shareRecord.id,
              shareRecord
            });
          } catch {
          }
          try {
            uppy.emit("share-record", { file, shareRecord });
          } catch {
          }
          try {
            onShareRecord?.({ file, shareRecord });
          } catch {
          }
        }
      } catch (e2) {
        try {
          uppy.emit("upload-error", file, e2);
        } catch {
        }
      }
    };
    uppy.on("upload-success", onSuccess);
  }
  // Read-only helpers for resume plugin -------------------------------------
  async listUploads({ path } = {}) {
    return api.fs.listMultipartUploads(path || "");
  }
  async listParts({ path, uploadId, fileName }) {
    return api.fs.listMultipartParts(path, uploadId, fileName);
  }
  // Helpers ---------------------------------------------------------------
  #withStorageConfig(payload) {
    if (payload?.storage_config_id) {
      return payload;
    }
    if (!this.storageConfigId) {
      throw new Error("缺少 storage_config_id，可在 payload 中指定或配置默认值");
    }
    return { ...payload, storage_config_id: this.storageConfigId };
  }
}
[
  STORAGE_STRATEGIES.BACKEND_STREAM,
  STORAGE_STRATEGIES.PRESIGNED_SINGLE,
  STORAGE_STRATEGIES.PRESIGNED_MULTIPART
];
class WebDavDriver {
  constructor(config = {}) {
    this.config = config;
    this.capabilities = createCapabilities({
      share: {
        backendStream: true,
        backendForm: true,
        presigned: false,
        url: false
      },
      fs: {
        backendStream: true,
        backendForm: true,
        presignedSingle: false,
        multipart: false
      }
    });
    this.share = {
      // 直接分享上传（多存储通用，通过 /share/upload）
      applyShareUploader: this.applyShareUploader.bind(this),
      // WebDAV 不支持预签名分享上传
      applyUrlUploader: () => {
        throw new Error("WebDAV 暂不支持外链拉取上传");
      },
      // 为 direct share 模式提供显式入口（与 S3 对齐）
      applyDirectShareUploader: this.applyShareUploader.bind(this)
    };
    this.fs = {
      applyFsUploader: this.applyFsUploader.bind(this)
    };
  }
  get storageConfigId() {
    return this.config?.id ?? null;
  }
  /**
   * WebDAV 分享上传：通过 Uppy + XHRUpload 调用后端 /api/share/upload
   * - 与 FS/Share 其他驱动保持一致：统一走 Uppy 管线
   * - shareMode: 'stream' | 'form'（前端内部使用）
   * - 后端负责写入存储并创建分享记录，响应中返回 share 记录
   */
  applyShareUploader(uppy, { payload, onShareRecord, shareMode } = {}) {
    if (!uppy) {
      throw new Error("applyShareUploader 需要提供 Uppy 实例");
    }
    const storageConfigId = payload?.storage_config_id || this.storageConfigId;
    if (!storageConfigId) {
      throw new Error("缺少 storage_config_id，无法初始化 WebDAV 分享上传");
    }
    const baseMeta = {
      storage_config_id: storageConfigId,
      path: payload?.path || "",
      slug: payload?.slug || "",
      remark: payload?.remark || "",
      password: payload?.password || "",
      expires_in: payload?.expires_in || "0",
      max_views: payload?.max_views ?? 0,
      use_proxy: payload?.use_proxy,
      original_filename: payload?.original_filename
    };
    const authHeaders = buildAuthHeadersForRequest({});
    try {
      uppy.setMeta(baseMeta);
    } catch {
    }
    const mode = (shareMode || "stream").toLowerCase();
    if (mode === "stream") {
      uppy.use(XHRUpload, {
        id: "WebDavShareUploadStream",
        endpoint: getFullApiUrl("/share/upload"),
        method: "PUT",
        formData: false,
        limit: 3,
        headers: (file) => {
          const meta = file.meta || {};
          const options = {
            storage_config_id: meta.storage_config_id,
            path: meta.path,
            slug: meta.slug,
            remark: meta.remark,
            password: meta.password,
            expires_in: meta.expires_in,
            max_views: meta.max_views,
            use_proxy: meta.use_proxy,
            original_filename: meta.original_filename,
            upload_id: meta.upload_id
          };
          let encodedOptions = "";
          try {
            encodedOptions = btoa(JSON.stringify(options));
          } catch {
            encodedOptions = "";
          }
          const rawName = meta.name || file.name || "upload-file";
          const encodedName = encodeURIComponent(rawName);
          return {
            ...authHeaders,
            "x-share-filename": encodedName,
            ...encodedOptions ? { "x-share-options": encodedOptions } : {}
          };
        }
      });
    } else {
      uppy.use(XHRUpload, {
        id: "WebDavShareUpload",
        endpoint: getFullApiUrl("/share/upload"),
        method: "POST",
        formData: true,
        fieldName: "file",
        limit: 3,
        allowedMetaFields: [
          "storage_config_id",
          "path",
          "slug",
          "remark",
          "password",
          "expires_in",
          "max_views",
          "use_proxy",
          "original_filename",
          "upload_id"
        ],
        headers: authHeaders
      });
    }
    uppy.on("upload", () => {
      const files = uppy.getFiles();
      files.forEach((file) => {
        if (file.meta?.name && file.meta.name !== file.name) {
          uppy.setFileState(file.id, { name: file.meta.name });
        }
      });
    });
    const handleSuccess = (file, response) => {
      try {
        const body = response && (response.body || response);
        const payloadBody = body && typeof body === "object" ? body : null;
        if (!payloadBody || payloadBody.success !== true) return;
        const shareRecord = payloadBody.data;
        if (!shareRecord) return;
        try {
          uppy.setFileMeta(file.id, {
            ...file.meta || {},
            shareRecord,
            fileId: shareRecord.id
          });
        } catch {
        }
        try {
          uppy.emit("share-record", { file, shareRecord });
        } catch {
        }
        try {
          onShareRecord?.({ file, shareRecord });
        } catch {
        }
      } catch {
      }
    };
    uppy.on("upload-success", handleSuccess);
  }
  /**
   * WebDAV FS 上传：
   * - 流式模式：通过 PUT /fs/upload 使用原始 body 直传（推荐）
   * - 表单模式：通过 POST /fs/upload multipart/form-data（兼容模式）
   */
  applyFsUploader(uppy, { strategy, path } = {}) {
    if (!uppy) {
      throw new Error("applyFsUploader 需要提供 Uppy 实例");
    }
    const headers = buildAuthHeadersForRequest({});
    try {
      uppy.setMeta({ path: path || "/", use_multipart: "false" });
    } catch {
    }
    if (strategy === STORAGE_STRATEGIES.BACKEND_FORM) {
      uppy.use(XHRUpload, {
        id: "WebDavBackendForm",
        endpoint: getFullApiUrl("/fs/upload"),
        method: "POST",
        formData: true,
        fieldName: "file",
        limit: 3,
        allowedMetaFields: ["path", "use_multipart", "upload_id"],
        headers
      });
    } else {
      uppy.use(XHRUpload, {
        id: "WebDavBackendStream",
        endpoint: (file) => {
          const meta = file.meta || {};
          const basePath = meta.path || path || "/";
          const uploadId = meta.upload_id;
          const params = new URLSearchParams();
          params.set("path", basePath);
          if (uploadId) {
            params.set("upload_id", uploadId);
          }
          return `${getFullApiUrl("/fs/upload")}?${params.toString()}`;
        },
        method: "PUT",
        formData: false,
        limit: 3,
        headers: (file) => {
          const meta = file.meta || {};
          const uploadOptions = {
            overwrite: !!meta.overwrite,
            originalFilename: !!meta.original_filename
          };
          const rawName = meta.name || file.name || "upload-file";
          const encodedName = encodeURIComponent(rawName);
          return {
            ...headers,
            "x-fs-filename": encodedName,
            "x-fs-options": btoa(JSON.stringify(uploadOptions))
          };
        }
      });
    }
    uppy.on("upload", () => {
      const files = uppy.getFiles();
      files.forEach((file) => {
        if (file.meta?.name && file.meta.name !== file.name) {
          uppy.setFileState(file.id, { name: file.meta.name });
        }
      });
    });
    return {
      adapter: null,
      mode: strategy || null
    };
  }
}
class LocalDriver {
  constructor(config = {}) {
    this.config = config;
    this.capabilities = createCapabilities({
      share: {
        backendStream: true,
        backendForm: true,
        presigned: false,
        url: false
      },
      fs: {
        backendStream: true,
        backendForm: true,
        presignedSingle: false,
        multipart: false
      }
    });
    this.share = {
      // 直接分享上传（多存储通用，通过 /share/upload）
      applyShareUploader: this.applyShareUploader.bind(this),
      // LOCAL 不支持预签名 URL 拉取上传
      applyUrlUploader: () => {
        throw new Error("LOCAL 暂不支持外链拉取上传");
      },
      // 为 direct share 模式提供显式入口（与 S3/WebDAV 对齐）
      applyDirectShareUploader: this.applyShareUploader.bind(this)
    };
    this.fs = {
      applyFsUploader: this.applyFsUploader.bind(this)
    };
  }
  get storageConfigId() {
    return this.config?.id ?? null;
  }
  /**
   * LOCAL 分享上传：通过 Uppy + XHRUpload 调用后端 /api/share/upload
   * 与 WebDAV/S3 的分享上传保持一致：统一走 Uppy 管线
   */
  applyShareUploader(uppy, { payload, onShareRecord, shareMode } = {}) {
    if (!uppy) {
      throw new Error("applyShareUploader 需要提供 Uppy 实例");
    }
    const storageConfigId = payload?.storage_config_id || this.storageConfigId;
    if (!storageConfigId) {
      throw new Error("缺少 storage_config_id，无法初始化 LOCAL 分享上传");
    }
    const baseMeta = {
      storage_config_id: storageConfigId,
      path: payload?.path || "",
      slug: payload?.slug || "",
      remark: payload?.remark || "",
      password: payload?.password || "",
      expires_in: payload?.expires_in || "0",
      max_views: payload?.max_views ?? 0,
      use_proxy: payload?.use_proxy,
      original_filename: payload?.original_filename
    };
    const authHeaders = buildAuthHeadersForRequest({});
    try {
      uppy.setMeta(baseMeta);
    } catch {
    }
    const mode = (shareMode || "stream").toLowerCase();
    if (mode === "stream") {
      uppy.use(XHRUpload, {
        id: "LocalShareUploadStream",
        endpoint: getFullApiUrl("/share/upload"),
        method: "PUT",
        formData: false,
        limit: 3,
        headers: (file) => {
          const meta = file.meta || {};
          const options = {
            storage_config_id: meta.storage_config_id,
            path: meta.path,
            slug: meta.slug,
            remark: meta.remark,
            password: meta.password,
            expires_in: meta.expires_in,
            max_views: meta.max_views,
            use_proxy: meta.use_proxy,
            original_filename: meta.original_filename,
            upload_id: meta.upload_id
          };
          let encodedOptions = "";
          try {
            encodedOptions = btoa(JSON.stringify(options));
          } catch {
            encodedOptions = "";
          }
          const rawName = meta.name || file.name || "upload-file";
          const encodedName = encodeURIComponent(rawName);
          return {
            ...authHeaders,
            "x-share-filename": encodedName,
            ...encodedOptions ? { "x-share-options": encodedOptions } : {}
          };
        }
      });
    } else {
      uppy.use(XHRUpload, {
        id: "LocalShareUpload",
        endpoint: getFullApiUrl("/share/upload"),
        method: "POST",
        formData: true,
        fieldName: "file",
        limit: 3,
        allowedMetaFields: [
          "storage_config_id",
          "path",
          "slug",
          "remark",
          "password",
          "expires_in",
          "max_views",
          "use_proxy",
          "original_filename",
          "upload_id"
        ],
        headers: authHeaders
      });
    }
    uppy.on("upload", () => {
      const files = uppy.getFiles();
      files.forEach((file) => {
        if (file.meta?.name && file.meta.name !== file.name) {
          uppy.setFileState(file.id, { name: file.meta.name });
        }
      });
    });
    const handleSuccess = (file, response) => {
      try {
        const body = response && (response.body || response);
        const payloadBody = body && typeof body === "object" ? body : null;
        if (!payloadBody || payloadBody.success !== true) return;
        const shareRecord = payloadBody.data;
        if (!shareRecord) return;
        try {
          uppy.setFileMeta(file.id, {
            ...file.meta || {},
            shareRecord,
            fileId: shareRecord.id
          });
        } catch {
        }
        try {
          uppy.emit("share-record", { file, shareRecord });
        } catch {
        }
        try {
          onShareRecord?.({ file, shareRecord });
        } catch {
        }
      } catch {
      }
    };
    uppy.on("upload-success", handleSuccess);
  }
  /**
   * LOCAL FS 上传：
   * - 流式模式：通过 PUT /fs/upload 使用原始 body 直传
   * - 表单模式：通过 POST /fs/upload multipart/form-data
   */
  applyFsUploader(uppy, { strategy, path } = {}) {
    if (!uppy) {
      throw new Error("applyFsUploader 需要提供 Uppy 实例");
    }
    const headers = buildAuthHeadersForRequest({});
    try {
      uppy.setMeta({ path: path || "/", use_multipart: "false" });
    } catch {
    }
    if (strategy === STORAGE_STRATEGIES.BACKEND_FORM) {
      uppy.use(XHRUpload, {
        id: "LocalBackendForm",
        endpoint: getFullApiUrl("/fs/upload"),
        method: "POST",
        formData: true,
        fieldName: "file",
        limit: 3,
        allowedMetaFields: ["path", "use_multipart", "upload_id"],
        headers
      });
    } else {
      uppy.use(XHRUpload, {
        id: "LocalBackendStream",
        endpoint: (file) => {
          const meta = file.meta || {};
          const basePath = meta.path || path || "/";
          const uploadId = meta.upload_id;
          const params = new URLSearchParams();
          params.set("path", basePath);
          if (uploadId) {
            params.set("upload_id", uploadId);
          }
          return `${getFullApiUrl("/fs/upload")}?${params.toString()}`;
        },
        method: "PUT",
        formData: false,
        limit: 3,
        headers: (file) => {
          const meta = file.meta || {};
          const uploadOptions = {
            overwrite: !!meta.overwrite,
            originalFilename: !!meta.original_filename
          };
          const rawName = meta.name || file.name || "upload-file";
          const encodedName = encodeURIComponent(rawName);
          return {
            ...headers,
            "x-fs-filename": encodedName,
            "x-fs-options": btoa(JSON.stringify(uploadOptions))
          };
        }
      });
    }
    uppy.on("upload", () => {
      const files = uppy.getFiles();
      files.forEach((file) => {
        if (file.meta?.name && file.meta.name !== file.name) {
          uppy.setFileState(file.id, { name: file.meta.name });
        }
      });
    });
    return {
      adapter: null,
      mode: strategy || null
    };
  }
}
class OneDriveDriver {
  constructor(config = {}) {
    this.config = config;
    this.capabilities = createCapabilities({
      share: {
        backendStream: true,
        backendForm: true,
        presigned: true,
        url: false
      },
      fs: {
        backendStream: true,
        backendForm: true,
        presignedSingle: true,
        multipart: true
      }
    });
    this.share = {
      // 预签名分享上传（/share/presign + /share/commit）
      applyShareUploader: this.applyShareUploader.bind(this),
      // 直传分享上传（/share/upload）
      applyDirectShareUploader: this.applyDirectShareUploader.bind(this),
      // URL 分享暂不支持
      applyUrlUploader: () => {
        throw new Error("OneDrive 暂不支持外链拉取上传");
      }
    };
    this.fs = {
      applyFsUploader: this.applyFsUploader.bind(this),
      // 供 ServerResumePlugin 使用的只读查询能力
      listUploads: this.listUploads.bind(this),
      listParts: this.listParts.bind(this)
    };
  }
  get storageConfigId() {
    return this.config?.id ?? null;
  }
  // Share ------------------------------------------------------------------
  /**
   * 预签名分享上传（单请求 PUT）
   * - 使用 /api/share/presign 获取上传 URL 与 key
   * - 使用 StorageAdapter + AwsS3 执行单请求上传（底层实际走 XMLHttpRequest）
   * - 在 upload-success 中调用 /api/share/commit 创建分享记录
   */
  applyShareUploader(uppy, { payload, onShareRecord } = {}) {
    if (!uppy) throw new Error("applyShareUploader 需要提供 Uppy 实例");
    const basePayload = this.#withStorageConfig(payload || {});
    const pluginId = "OneDriveSharePresigned";
    if (uppy.getPlugin(pluginId)) return;
    const adapter = new StorageAdapter("/", uppy);
    uppy.use(AwsS3Multipart, {
      id: pluginId,
      shouldUseMultipart: () => false,
      limit: 3,
      getUploadParameters: async (file) => {
        const meta = file?.meta || {};
        const fileName = typeof meta?.name === "string" && meta.name ? meta.name : file.name;
        const merged = {
          ...basePayload,
          slug: meta.slug ?? basePayload.slug,
          path: meta.path ?? basePayload.path
        };
        const presign = await api.file.getUploadPresignedUrl({
          storage_config_id: merged.storage_config_id,
          filename: fileName,
          mimetype: file.type || "application/octet-stream",
          path: merged.path,
          size: file.size
        });
        if (!presign?.success || !presign?.data) {
          throw new Error(presign?.message || "获取预签名URL失败");
        }
        const data = presign.data;
        const uploadUrl = data.uploadUrl || data.upload_url;
        const headers = {
          ...data.headers || {}
        };
        if (!headers["Content-Type"]) {
          headers["Content-Type"] = file.type || "application/octet-stream";
        }
        const providerType = (data.provider_type || "").toUpperCase();
        const isOneDrive = providerType === "ONEDRIVE";
        if (isOneDrive && typeof file.size === "number" && file.size >= 0 && !headers["Content-Range"]) {
          const total = file.size;
          const end = total > 0 ? total - 1 : 0;
          headers["Content-Range"] = `bytes 0-${end}/${total}`;
        }
        try {
          uppy.setFileMeta(file.id, {
            key: data.key,
            storage_config_id: data.storage_config_id || merged.storage_config_id,
            filename: typeof data?.filename === "string" && data.filename ? data.filename : fileName,
            path: merged.path,
            slug: merged.slug,
            password: basePayload.password || meta.password || null,
            expires_in: basePayload.expires_in,
            max_views: basePayload.max_views
          });
        } catch {
        }
        return {
          method: "PUT",
          url: uploadUrl,
          headers
        };
      },
      // 使用 XMLHttpRequest 避免 CORS 问题
      uploadPartBytes: adapter.uploadSingleFile.bind(adapter)
    });
    const onSuccess = async (file) => {
      const meta = file?.meta || {};
      try {
        const commitRes = await api.file.completeFileUpload({
          key: meta.key,
          storage_config_id: meta.storage_config_id,
          filename: typeof meta?.filename === "string" && meta.filename ? meta.filename : typeof meta?.name === "string" && meta.name ? meta.name : file.name,
          size: file.size,
          etag: void 0,
          slug: meta.slug,
          remark: basePayload.remark,
          password: basePayload.password,
          expires_in: basePayload.expires_in,
          max_views: basePayload.max_views,
          use_proxy: basePayload.use_proxy,
          original_filename: basePayload.original_filename ?? false,
          path: meta.path
        });
        if (commitRes?.data) {
          const shareRecord = commitRes.data;
          try {
            uppy.setFileMeta(file.id, {
              fileId: shareRecord.id,
              shareRecord
            });
          } catch {
          }
          try {
            uppy.emit("share-record", { file, shareRecord });
          } catch {
          }
          try {
            onShareRecord?.({ file, shareRecord });
          } catch {
          }
        }
      } catch (e2) {
        try {
          uppy.emit("upload-error", file, e2);
        } catch {
        }
      }
    };
    uppy.on("upload-success", onSuccess);
  }
  /**
   * 直传分享上传：通过 Uppy + XHRUpload 调用后端 /share/upload（ObjectStore 多存储通用）
   * - 与 S3/WebDAV 一致，由后端处理写入 OneDrive 并创建分享记录
   * @param {object} uppy
   * @param {object} options { payload, onShareRecord, shareMode }
   */
  applyDirectShareUploader(uppy, { payload, onShareRecord, shareMode } = {}) {
    if (!uppy) throw new Error("applyDirectShareUploader 需要提供 Uppy 实例");
    const basePayload = this.#withStorageConfig(payload || {});
    const mode = (shareMode || "stream").toLowerCase();
    const baseMeta = {
      storage_config_id: basePayload.storage_config_id,
      path: basePayload.path || "",
      slug: basePayload.slug || "",
      remark: basePayload.remark || "",
      password: basePayload.password || "",
      expires_in: basePayload.expires_in || "0",
      max_views: basePayload.max_views ?? 0,
      use_proxy: basePayload.use_proxy,
      original_filename: basePayload.original_filename
    };
    const authHeaders = buildAuthHeadersForRequest({});
    try {
      uppy.setMeta(baseMeta);
    } catch {
    }
    if (mode === "stream") {
      uppy.use(XHRUpload, {
        id: "OneDriveShareUploadStream",
        endpoint: getFullApiUrl("/share/upload"),
        method: "PUT",
        formData: false,
        limit: 3,
        headers: (file) => {
          const meta = file.meta || {};
          const options = {
            storage_config_id: meta.storage_config_id,
            path: meta.path,
            slug: meta.slug,
            remark: meta.remark,
            password: meta.password,
            expires_in: meta.expires_in,
            max_views: meta.max_views,
            use_proxy: meta.use_proxy,
            original_filename: meta.original_filename,
            upload_id: meta.upload_id
          };
          let encodedOptions = "";
          try {
            encodedOptions = btoa(JSON.stringify(options));
          } catch {
            encodedOptions = "";
          }
          const rawName = meta.name || file.name || "upload-file";
          const encodedName = encodeURIComponent(rawName);
          return {
            ...authHeaders,
            "x-share-filename": encodedName,
            ...encodedOptions ? { "x-share-options": encodedOptions } : {}
          };
        }
      });
    } else {
      uppy.use(XHRUpload, {
        id: "OneDriveShareUploadDirect",
        endpoint: getFullApiUrl("/share/upload"),
        method: "POST",
        formData: true,
        fieldName: "file",
        limit: 3,
        allowedMetaFields: [
          "storage_config_id",
          "path",
          "slug",
          "remark",
          "password",
          "expires_in",
          "max_views",
          "use_proxy",
          "original_filename",
          "upload_id"
        ],
        headers: authHeaders
      });
    }
    uppy.on("upload", () => {
      const files = uppy.getFiles();
      files.forEach((file) => {
        if (file.meta?.name && file.meta.name !== file.name) {
          uppy.setFileState(file.id, { name: file.meta.name });
        }
      });
    });
    const onSuccess = (file, response) => {
      try {
        const body = response && (response.body || response);
        if (!body || body.success !== true) return;
        const shareRecord = body.data;
        if (!shareRecord) return;
        try {
          uppy.setFileMeta(file.id, {
            ...file.meta || {},
            shareRecord,
            fileId: shareRecord.id
          });
        } catch {
        }
        try {
          uppy.emit("share-record", { file, shareRecord });
        } catch {
        }
        try {
          onShareRecord?.({ file, shareRecord });
        } catch {
        }
      } catch {
      }
    };
    uppy.on("upload-success", onSuccess);
  }
  /**
   * 返回当前驱动在 FS 场景下推荐的上传策略
   * - 由于 OneDrive 的 API 更适合后端中转，我们这里选择 backend-stream
   */
  getDefaultFsStrategy() {
    return STORAGE_STRATEGIES.BACKEND_STREAM;
  }
  /**
   * OneDrive FS 上传：
   * - 预签名单文件：通过 /fs/presign + 直传（PRESIGNED_SINGLE）
   * - 预签名多分片：通过 /fs/multipart/* + Uppy AwsS3 分片（PRESIGNED_MULTIPART，Graph uploadSession）
   * - 流式模式：通过 PUT /fs/upload 使用原始 body 直传（BACKEND_STREAM）
   * - 表单模式：通过 POST /fs/upload multipart/form-data（BACKEND_FORM）
   */
  applyFsUploader(uppy, { strategy, path } = {}) {
    if (!uppy) {
      throw new Error("applyFsUploader 需要提供 Uppy 实例");
    }
    if (strategy === STORAGE_STRATEGIES.PRESIGNED_SINGLE || strategy === STORAGE_STRATEGIES.PRESIGNED_MULTIPART) {
      const adapter = new StorageAdapter(path || "/", uppy);
      const isMultipart = strategy === STORAGE_STRATEGIES.PRESIGNED_MULTIPART;
      const awsS3Opts = {
        id: "OneDriveFsPresigned",
        // 对于 OneDrive 上传会话，强制串行上传，避免 Range 不一致问题
        limit: 1,
        shouldUseMultipart: () => isMultipart
      };
      if (isMultipart) {
        awsS3Opts.getUploadParameters = adapter.getUploadParameters.bind(adapter);
        awsS3Opts.createMultipartUpload = adapter.createMultipartUpload.bind(adapter);
        awsS3Opts.signPart = adapter.signPart.bind(adapter);
        awsS3Opts.uploadPartBytes = adapter.uploadPartBytes.bind(adapter);
        awsS3Opts.completeMultipartUpload = adapter.completeMultipartUpload.bind(adapter);
        awsS3Opts.abortMultipartUpload = adapter.abortMultipartUpload.bind(adapter);
        awsS3Opts.listParts = adapter.listParts.bind(adapter);
      } else {
        awsS3Opts.getUploadParameters = adapter.getUploadParameters.bind(adapter);
        awsS3Opts.uploadPartBytes = adapter.uploadSingleFile.bind(adapter);
      }
      uppy.use(AwsS3Multipart, awsS3Opts);
      return {
        adapter,
        mode: isMultipart ? STORAGE_STRATEGIES.PRESIGNED_MULTIPART : STORAGE_STRATEGIES.PRESIGNED_SINGLE
      };
    }
    const headers = buildAuthHeadersForRequest({});
    try {
      uppy.setMeta({ path: path || "/", use_multipart: "false" });
    } catch {
    }
    if (strategy === STORAGE_STRATEGIES.BACKEND_FORM) {
      uppy.use(XHRUpload, {
        id: "OneDriveBackendForm",
        endpoint: getFullApiUrl("/fs/upload"),
        method: "POST",
        formData: true,
        fieldName: "file",
        limit: 3,
        allowedMetaFields: ["path", "use_multipart", "upload_id"],
        headers
      });
    } else {
      uppy.use(XHRUpload, {
        id: "OneDriveBackendStream",
        endpoint: (file) => {
          const meta = file.meta || {};
          const basePath = meta.path || path || "/";
          const uploadId = meta.upload_id;
          const params = new URLSearchParams();
          params.set("path", basePath);
          if (uploadId) {
            params.set("upload_id", uploadId);
          }
          return `${getFullApiUrl("/fs/upload")}?${params.toString()}`;
        },
        method: "PUT",
        formData: false,
        limit: 3,
        headers: (file) => {
          const meta = file.meta || {};
          const uploadOptions = {
            overwrite: !!meta.overwrite,
            originalFilename: !!meta.original_filename
          };
          const rawName = meta.name || file.name || "upload-file";
          const encodedName = encodeURIComponent(rawName);
          return {
            ...headers,
            "x-fs-filename": encodedName,
            "x-fs-options": btoa(JSON.stringify(uploadOptions))
          };
        }
      });
    }
    uppy.on("upload", () => {
      const files = uppy.getFiles();
      files.forEach((file) => {
        if (file.meta?.name && file.meta.name !== file.name) {
          uppy.setFileState(file.id, { name: file.meta.name });
        }
      });
    });
    return {
      adapter: null,
      mode: strategy
    };
  }
  // Helpers ---------------------------------------------------------------
  #withStorageConfig(payload) {
    if (payload?.storage_config_id) {
      return payload;
    }
    if (!this.storageConfigId) {
      throw new Error("缺少 storage_config_id，可在 payload 中指定或配置默认值");
    }
    return { ...payload, storage_config_id: this.storageConfigId };
  }
  // Read-only helpers for resume plugin -------------------------------------
  async listUploads({ path } = {}) {
    return api.fs.listMultipartUploads(path || "");
  }
  async listParts({ path, uploadId, fileName }) {
    return api.fs.listMultipartParts(path, uploadId, fileName);
  }
}
class GoogleDriveDriver {
  constructor(config = {}) {
    this.config = config;
    this.capabilities = createCapabilities({
      share: {
        backendStream: true,
        backendForm: true,
        presigned: false,
        url: false
      },
      fs: {
        backendStream: true,
        backendForm: true,
        presignedSingle: false,
        multipart: true
      }
    });
    this.share = {
      applyShareUploader: this.applyShareUploader.bind(this),
      applyUrlUploader: () => {
        throw new Error("GoogleDrive 暂不支持外链拉取上传");
      },
      applyDirectShareUploader: this.applyShareUploader.bind(this)
    };
    this.fs = {
      applyFsUploader: this.applyFsUploader.bind(this),
      // 供 ServerResumePlugin 使用的辅助方法
      async listUploads({ path } = {}) {
        return api.fs.listMultipartUploads(path || "");
      },
      async listParts({ path, uploadId, fileName }) {
        return api.fs.listMultipartParts(path, uploadId, fileName);
      }
    };
  }
  get storageConfigId() {
    return this.config?.id ?? null;
  }
  // Share 上传：与 Local/WebDAV 对齐，统一走 /share/upload
  applyShareUploader(uppy, { payload, onShareRecord, shareMode } = {}) {
    if (!uppy) {
      throw new Error("applyShareUploader 需要提供 Uppy 实例");
    }
    const storageConfigId = payload?.storage_config_id || this.storageConfigId;
    if (!storageConfigId) {
      throw new Error("缺少 storage_config_id，无法初始化 GoogleDrive 分享上传");
    }
    const baseMeta = {
      storage_config_id: storageConfigId,
      path: payload?.path || "",
      slug: payload?.slug || "",
      remark: payload?.remark || "",
      password: payload?.password || "",
      expires_in: payload?.expires_in || "0",
      max_views: payload?.max_views ?? 0,
      use_proxy: payload?.use_proxy,
      original_filename: payload?.original_filename
    };
    const authHeaders = buildAuthHeadersForRequest({});
    try {
      uppy.setMeta(baseMeta);
    } catch {
    }
    const mode = (shareMode || "stream").toLowerCase();
    if (mode === "stream") {
      uppy.use(XHRUpload, {
        id: "GoogleDriveShareUploadStream",
        endpoint: getFullApiUrl("/share/upload"),
        method: "PUT",
        formData: false,
        limit: 3,
        headers: (file) => {
          const meta = file.meta || {};
          const options = {
            storage_config_id: meta.storage_config_id,
            path: meta.path,
            slug: meta.slug,
            remark: meta.remark,
            password: meta.password,
            expires_in: meta.expires_in,
            max_views: meta.max_views,
            use_proxy: meta.use_proxy,
            original_filename: meta.original_filename,
            upload_id: meta.upload_id
          };
          let encodedOptions = "";
          try {
            encodedOptions = btoa(JSON.stringify(options));
          } catch {
            encodedOptions = "";
          }
          const rawName = meta.name || file.name || "upload-file";
          const encodedName = encodeURIComponent(rawName);
          return {
            ...authHeaders,
            "x-share-filename": encodedName,
            ...encodedOptions ? { "x-share-options": encodedOptions } : {}
          };
        }
      });
    } else {
      uppy.use(XHRUpload, {
        id: "GoogleDriveShareUpload",
        endpoint: getFullApiUrl("/share/upload"),
        method: "POST",
        formData: true,
        fieldName: "file",
        limit: 3,
        allowedMetaFields: [
          "storage_config_id",
          "path",
          "slug",
          "remark",
          "password",
          "expires_in",
          "max_views",
          "use_proxy",
          "original_filename",
          "upload_id"
        ],
        headers: authHeaders
      });
    }
    uppy.on("upload", () => {
      const files = uppy.getFiles();
      files.forEach((file) => {
        if (file.meta?.name && file.meta.name !== file.name) {
          uppy.setFileState(file.id, { name: file.meta.name });
        }
      });
    });
    const onSuccess = (file, response) => {
      try {
        const body = response && (response.body || response);
        const payloadBody = body && body.data ? body.data : body;
        const shareRecord = payloadBody?.share || payloadBody;
        if (!shareRecord) return;
        try {
          uppy.emit("share-record", { file, shareRecord });
        } catch {
        }
        try {
          onShareRecord?.({ file, shareRecord });
        } catch {
        }
      } catch {
      }
    };
    uppy.on("upload-success", onSuccess);
  }
  getDefaultFsStrategy() {
    return STORAGE_STRATEGIES.BACKEND_STREAM;
  }
  // FS 上传：统一通过 /fs/upload 后端中转（流式/表单）
  applyFsUploader(uppy, { strategy, path } = {}) {
    if (!uppy) {
      throw new Error("applyFsUploader 需要提供 Uppy 实例");
    }
    if (strategy === STORAGE_STRATEGIES.PRESIGNED_SINGLE || strategy === STORAGE_STRATEGIES.PRESIGNED_MULTIPART) {
      const adapter = new StorageAdapter(path || "/", uppy);
      const isMultipart = strategy === STORAGE_STRATEGIES.PRESIGNED_MULTIPART;
      const awsS3Opts = {
        id: "GoogleDriveFsPresigned",
        // Google Drive single_session 模式要求严格顺序，这里限制为串行上传
        limit: 1,
        shouldUseMultipart: () => isMultipart
      };
      if (isMultipart) {
        awsS3Opts.getUploadParameters = adapter.getUploadParameters.bind(adapter);
        awsS3Opts.createMultipartUpload = adapter.createMultipartUpload.bind(adapter);
        awsS3Opts.signPart = adapter.signPart.bind(adapter);
        awsS3Opts.uploadPartBytes = adapter.uploadPartBytes.bind(adapter);
        awsS3Opts.completeMultipartUpload = adapter.completeMultipartUpload.bind(adapter);
        awsS3Opts.abortMultipartUpload = adapter.abortMultipartUpload.bind(adapter);
        awsS3Opts.listParts = adapter.listParts.bind(adapter);
      } else {
        awsS3Opts.getUploadParameters = adapter.getUploadParameters.bind(adapter);
        awsS3Opts.uploadPartBytes = adapter.uploadSingleFile.bind(adapter);
      }
      uppy.use(AwsS3Multipart, awsS3Opts);
      return {
        adapter,
        mode: isMultipart ? STORAGE_STRATEGIES.PRESIGNED_MULTIPART : STORAGE_STRATEGIES.PRESIGNED_SINGLE
      };
    }
    const headersBase = buildAuthHeadersForRequest({});
    try {
      uppy.setMeta({ path: path || "/", use_multipart: "false" });
    } catch {
    }
    if (strategy === STORAGE_STRATEGIES.BACKEND_FORM) {
      uppy.use(XHRUpload, {
        id: "GoogleDriveBackendForm",
        endpoint: getFullApiUrl("/fs/upload"),
        method: "POST",
        formData: true,
        fieldName: "file",
        limit: 3,
        allowedMetaFields: ["path", "use_multipart", "upload_id"],
        headers: headersBase
      });
    } else {
      uppy.use(XHRUpload, {
        id: "GoogleDriveBackendStream",
        endpoint: (file) => {
          const meta = file.meta || {};
          const basePath = meta.path || path || "/";
          const uploadId = meta.upload_id;
          const params = new URLSearchParams();
          params.set("path", basePath);
          if (uploadId) {
            params.set("upload_id", uploadId);
          }
          return `${getFullApiUrl("/fs/upload")}?${params.toString()}`;
        },
        method: "PUT",
        formData: false,
        limit: 3,
        headers: (file) => {
          const meta = file.meta || {};
          const uploadOptions = {
            overwrite: !!meta.overwrite,
            originalFilename: !!meta.original_filename
          };
          const rawName = meta.name || file.name || "upload-file";
          const encodedName = encodeURIComponent(rawName);
          return {
            ...headersBase,
            "x-fs-filename": encodedName,
            "x-fs-options": btoa(JSON.stringify(uploadOptions))
          };
        }
      });
    }
    uppy.on("upload", () => {
      const files = uppy.getFiles();
      files.forEach((file) => {
        if (file.meta?.name && file.meta.name !== file.name) {
          uppy.setFileState(file.id, { name: file.meta.name });
        }
      });
    });
    return {
      adapter: null,
      mode: strategy
    };
  }
}
class GithubApiDriver extends LocalDriver {
  constructor(config = {}) {
    super(config);
  }
}
class GithubReleasesDriver {
  constructor(config = {}) {
    this.config = config;
    this.capabilities = createCapabilities({
      share: {
        backendStream: false,
        backendForm: false,
        presigned: false,
        url: false
      },
      fs: {
        backendStream: false,
        backendForm: false,
        presignedSingle: false,
        multipart: false
      }
    });
    const readonlyError = () => {
      throw new Error("GitHub Releases 是只读存储，不支持上传/写入操作");
    };
    this.share = {
      applyShareUploader: readonlyError,
      applyDirectShareUploader: readonlyError,
      applyUrlUploader: readonlyError
    };
    this.fs = {
      applyFsUploader: readonlyError
    };
  }
  get storageConfigId() {
    return this.config?.id ?? null;
  }
}
const MB$1 = 1024 * 1024;
const DEFAULT_TG_PART_SIZE_BYTES = 15 * MB$1;
const DEFAULT_TG_UPLOAD_CONCURRENCY = 2;
function toPositiveInt$1(value, fallback) {
  const n2 = Number(value);
  if (!Number.isFinite(n2) || n2 <= 0) return fallback;
  return Math.floor(n2);
}
function clampInt$1(value, { min, max, fallback }) {
  const n2 = toPositiveInt$1(value, fallback);
  return Math.min(max, Math.max(min, n2));
}
class TelegramDriver {
  constructor(config = {}) {
    this.config = config;
    this.capabilities = createCapabilities({
      share: {
        backendStream: true,
        backendForm: true,
        presigned: false,
        url: false
      },
      fs: {
        backendStream: true,
        backendForm: true,
        presignedSingle: false,
        multipart: true
      }
    });
    this.share = {
      applyShareUploader: this.applyShareUploader.bind(this),
      applyUrlUploader: () => {
        throw new Error("Telegram 暂不支持外链拉取上传");
      },
      applyDirectShareUploader: this.applyShareUploader.bind(this)
    };
    this.fs = {
      applyFsUploader: this.applyFsUploader.bind(this),
      async listUploads({ path } = {}) {
        return api.fs.listMultipartUploads(path || "");
      },
      async listParts({ path, uploadId, fileName }) {
        return api.fs.listMultipartParts(path, uploadId, fileName);
      }
    };
  }
  get storageConfigId() {
    return this.config?.id ?? null;
  }
  // Share 上传：与 Local/WebDAV/GoogleDrive 对齐，统一走 /share/upload
  applyShareUploader(uppy, { payload, onShareRecord, shareMode } = {}) {
    if (!uppy) {
      throw new Error("applyShareUploader 需要提供 Uppy 实例");
    }
    const storageConfigId = payload?.storage_config_id || this.storageConfigId;
    if (!storageConfigId) {
      throw new Error("缺少 storage_config_id，无法初始化 Telegram 分享上传");
    }
    const baseMeta = {
      storage_config_id: storageConfigId,
      path: payload?.path || "",
      slug: payload?.slug || "",
      remark: payload?.remark || "",
      password: payload?.password || "",
      expires_in: payload?.expires_in || "0",
      max_views: payload?.max_views ?? 0,
      use_proxy: payload?.use_proxy,
      original_filename: payload?.original_filename
    };
    const authHeaders = buildAuthHeadersForRequest({});
    try {
      uppy.setMeta(baseMeta);
    } catch {
    }
    const mode = (shareMode || "stream").toLowerCase();
    if (mode === "stream") {
      uppy.use(XHRUpload, {
        id: "TelegramShareUploadStream",
        endpoint: getFullApiUrl("/share/upload"),
        method: "PUT",
        formData: false,
        limit: 3,
        headers: (file) => {
          const meta = file.meta || {};
          const options = {
            storage_config_id: meta.storage_config_id,
            path: meta.path,
            slug: meta.slug,
            remark: meta.remark,
            password: meta.password,
            expires_in: meta.expires_in,
            max_views: meta.max_views,
            use_proxy: meta.use_proxy,
            original_filename: meta.original_filename,
            upload_id: meta.upload_id
          };
          let encodedOptions = "";
          try {
            encodedOptions = btoa(JSON.stringify(options));
          } catch {
            encodedOptions = "";
          }
          const rawName = meta.name || file.name || "upload-file";
          const encodedName = encodeURIComponent(rawName);
          return {
            ...authHeaders,
            "x-share-filename": encodedName,
            ...encodedOptions ? { "x-share-options": encodedOptions } : {}
          };
        }
      });
    } else {
      uppy.use(XHRUpload, {
        id: "TelegramShareUploadForm",
        endpoint: getFullApiUrl("/share/upload"),
        method: "POST",
        formData: true,
        fieldName: "file",
        limit: 3,
        allowedMetaFields: [
          "storage_config_id",
          "path",
          "slug",
          "remark",
          "password",
          "expires_in",
          "max_views",
          "use_proxy",
          "original_filename",
          "upload_id"
        ],
        headers: authHeaders
      });
    }
    uppy.on("upload", () => {
      const files = uppy.getFiles();
      files.forEach((file) => {
        if (file.meta?.name && file.meta.name !== file.name) {
          uppy.setFileState(file.id, { name: file.meta.name });
        }
      });
    });
    const onSuccess = (file, response) => {
      try {
        const body = response && (response.body || response);
        const payloadBody = body && body.data ? body.data : body;
        const shareRecord = payloadBody?.share || payloadBody;
        if (!shareRecord) return;
        try {
          uppy.emit("share-record", { file, shareRecord });
        } catch {
        }
        try {
          onShareRecord?.({ file, shareRecord });
        } catch {
        }
      } catch {
      }
    };
    uppy.on("upload-success", onSuccess);
  }
  getDefaultFsStrategy() {
    return STORAGE_STRATEGIES.BACKEND_STREAM;
  }
  applyFsUploader(uppy, { strategy, path } = {}) {
    if (!uppy) {
      throw new Error("applyFsUploader 需要提供 Uppy 实例");
    }
    if (strategy === STORAGE_STRATEGIES.PRESIGNED_MULTIPART) {
      const partSizeMb = clampInt$1(this.config?.part_size_mb, {
        min: 5,
        max: 100,
        fallback: DEFAULT_TG_PART_SIZE_BYTES / MB$1
      });
      const partSize = partSizeMb * MB$1;
      const uploadConcurrency = clampInt$1(this.config?.upload_concurrency, {
        min: 1,
        max: 8,
        fallback: DEFAULT_TG_UPLOAD_CONCURRENCY
      });
      const adapter = new StorageAdapter(path || "/", uppy, { partSize });
      const awsS3Options = {
        id: "TelegramFsMultipart",
        limit: uploadConcurrency,
        shouldUseMultipart: () => true,
        getChunkSize: (data) => adapter.getChunkSizeForAwsS3(data),
        createMultipartUpload: adapter.createMultipartUpload.bind(adapter),
        signPart: adapter.signPart.bind(adapter),
        uploadPartBytes: adapter.uploadPartBytes.bind(adapter),
        completeMultipartUpload: adapter.completeMultipartUpload.bind(adapter),
        abortMultipartUpload: adapter.abortMultipartUpload.bind(adapter),
        listParts: adapter.listParts.bind(adapter)
      };
      const existing = uppy.getPlugin?.("TelegramFsMultipart");
      if (existing && typeof existing.setOptions === "function") {
        existing.setOptions(awsS3Options);
      } else {
        try {
          if (existing) uppy.removePlugin(existing);
        } catch {
        }
        uppy.use(AwsS3Multipart, awsS3Options);
      }
      return { adapter, mode: STORAGE_STRATEGIES.PRESIGNED_MULTIPART };
    }
    if (strategy === STORAGE_STRATEGIES.PRESIGNED_SINGLE) {
      strategy = STORAGE_STRATEGIES.BACKEND_STREAM;
    }
    const headersBase = buildAuthHeadersForRequest({});
    try {
      uppy.setMeta({ path: path || "/", use_multipart: "false" });
    } catch {
    }
    if (strategy === STORAGE_STRATEGIES.BACKEND_FORM) {
      uppy.use(XHRUpload, {
        id: "TelegramBackendForm",
        endpoint: getFullApiUrl("/fs/upload"),
        method: "POST",
        formData: true,
        fieldName: "file",
        limit: 3,
        allowedMetaFields: ["path", "use_multipart", "upload_id"],
        headers: headersBase
      });
    } else {
      uppy.use(XHRUpload, {
        id: "TelegramBackendStream",
        endpoint: (file) => {
          const meta = file.meta || {};
          const basePath = meta.path || path || "/";
          const uploadId = meta.upload_id;
          const params = new URLSearchParams();
          params.set("path", basePath);
          if (uploadId) {
            params.set("upload_id", uploadId);
          }
          return `${getFullApiUrl("/fs/upload")}?${params.toString()}`;
        },
        method: "PUT",
        formData: false,
        limit: 3,
        headers: (file) => {
          const meta = file.meta || {};
          const uploadOptions = {
            overwrite: !!meta.overwrite,
            originalFilename: !!meta.original_filename
          };
          const rawName = meta.name || file.name || "upload-file";
          const encodedName = encodeURIComponent(rawName);
          return {
            ...headersBase,
            "x-fs-filename": encodedName,
            "x-fs-options": btoa(JSON.stringify(uploadOptions))
          };
        }
      });
    }
    uppy.on("upload", () => {
      const files = uppy.getFiles();
      files.forEach((file) => {
        if (file.meta?.name && file.meta.name !== file.name) {
          uppy.setFileState(file.id, { name: file.meta.name });
        }
      });
    });
    return { adapter: null, mode: strategy || null };
  }
}
const MB = 1024 * 1024;
const DEFAULT_DISCORD_PART_SIZE_BYTES = 10 * MB;
const DEFAULT_DISCORD_UPLOAD_CONCURRENCY = 1;
function toPositiveInt(value, fallback) {
  const n2 = Number(value);
  if (!Number.isFinite(n2) || n2 <= 0) return fallback;
  return Math.floor(n2);
}
function clampInt(value, { min, max, fallback }) {
  const n2 = toPositiveInt(value, fallback);
  return Math.min(max, Math.max(min, n2));
}
class DiscordDriver {
  constructor(config = {}) {
    this.config = config;
    this.capabilities = createCapabilities({
      share: {
        backendStream: true,
        backendForm: true,
        presigned: false,
        url: false
      },
      fs: {
        backendStream: true,
        backendForm: true,
        presignedSingle: false,
        multipart: true
      }
    });
    this.share = {
      applyShareUploader: this.applyShareUploader.bind(this),
      applyUrlUploader: () => {
        throw new Error("Discord 暂不支持外链拉取上传");
      },
      applyDirectShareUploader: this.applyShareUploader.bind(this)
    };
    this.fs = {
      applyFsUploader: this.applyFsUploader.bind(this),
      async listUploads({ path } = {}) {
        return api.fs.listMultipartUploads(path || "");
      },
      async listParts({ path, uploadId, fileName }) {
        return api.fs.listMultipartParts(path, uploadId, fileName);
      }
    };
  }
  get storageConfigId() {
    return this.config?.id ?? null;
  }
  // Share 上传：统一走 /share/upload（与 Telegram/Local/WebDAV 一致）
  applyShareUploader(uppy, { payload, onShareRecord, shareMode } = {}) {
    if (!uppy) {
      throw new Error("applyShareUploader 需要提供 Uppy 实例");
    }
    const storageConfigId = payload?.storage_config_id || this.storageConfigId;
    if (!storageConfigId) {
      throw new Error("缺少 storage_config_id，无法初始化 Discord 分享上传");
    }
    const baseMeta = {
      storage_config_id: storageConfigId,
      path: payload?.path || "",
      slug: payload?.slug || "",
      remark: payload?.remark || "",
      password: payload?.password || "",
      expires_in: payload?.expires_in || "0",
      max_views: payload?.max_views ?? 0,
      use_proxy: payload?.use_proxy,
      original_filename: payload?.original_filename
    };
    const authHeaders = buildAuthHeadersForRequest({});
    try {
      uppy.setMeta(baseMeta);
    } catch {
    }
    const mode = (shareMode || "stream").toLowerCase();
    if (mode === "stream") {
      uppy.use(XHRUpload, {
        id: "DiscordShareUploadStream",
        endpoint: getFullApiUrl("/share/upload"),
        method: "PUT",
        formData: false,
        limit: 3,
        headers: (file) => {
          const meta = file.meta || {};
          const options = {
            storage_config_id: meta.storage_config_id,
            path: meta.path,
            slug: meta.slug,
            remark: meta.remark,
            password: meta.password,
            expires_in: meta.expires_in,
            max_views: meta.max_views,
            use_proxy: meta.use_proxy,
            original_filename: meta.original_filename,
            upload_id: meta.upload_id
          };
          let encodedOptions = "";
          try {
            encodedOptions = btoa(JSON.stringify(options));
          } catch {
            encodedOptions = "";
          }
          const rawName = meta.name || file.name || "upload-file";
          const encodedName = encodeURIComponent(rawName);
          return {
            ...authHeaders,
            "x-share-filename": encodedName,
            ...encodedOptions ? { "x-share-options": encodedOptions } : {}
          };
        }
      });
    } else {
      uppy.use(XHRUpload, {
        id: "DiscordShareUploadForm",
        endpoint: getFullApiUrl("/share/upload"),
        method: "POST",
        formData: true,
        fieldName: "file",
        limit: 3,
        allowedMetaFields: [
          "storage_config_id",
          "path",
          "slug",
          "remark",
          "password",
          "expires_in",
          "max_views",
          "use_proxy",
          "original_filename",
          "upload_id"
        ],
        headers: authHeaders
      });
    }
    uppy.on("upload", () => {
      const files = uppy.getFiles();
      files.forEach((file) => {
        if (file.meta?.name && file.meta.name !== file.name) {
          uppy.setFileState(file.id, { name: file.meta.name });
        }
      });
    });
    const onSuccess = (file, response) => {
      try {
        const body = response && (response.body || response);
        const payloadBody = body && body.data ? body.data : body;
        const shareRecord = payloadBody?.share || payloadBody;
        if (!shareRecord) return;
        try {
          uppy.emit("share-record", { file, shareRecord });
        } catch {
        }
        try {
          onShareRecord?.({ file, shareRecord });
        } catch {
        }
      } catch {
      }
    };
    uppy.on("upload-success", onSuccess);
  }
  getDefaultFsStrategy() {
    return STORAGE_STRATEGIES.BACKEND_STREAM;
  }
  // FS 上传：走后端 /fs/upload（流式/表单）
  applyFsUploader(uppy, { strategy, path } = {}) {
    if (!uppy) {
      throw new Error("applyFsUploader 需要提供 Uppy 实例");
    }
    if (strategy === STORAGE_STRATEGIES.PRESIGNED_MULTIPART) {
      const partSizeMb = clampInt(this.config?.part_size_mb, {
        min: 1,
        max: 10,
        fallback: DEFAULT_DISCORD_PART_SIZE_BYTES / MB
      });
      const partSize = partSizeMb * MB;
      const uploadConcurrency = clampInt(this.config?.upload_concurrency, {
        min: 1,
        max: 8,
        fallback: DEFAULT_DISCORD_UPLOAD_CONCURRENCY
      });
      const adapter = new StorageAdapter(path || "/", uppy, { partSize });
      const awsS3Options = {
        id: "DiscordFsMultipart",
        limit: uploadConcurrency,
        shouldUseMultipart: () => true,
        getChunkSize: (data) => adapter.getChunkSizeForAwsS3(data),
        createMultipartUpload: adapter.createMultipartUpload.bind(adapter),
        signPart: adapter.signPart.bind(adapter),
        uploadPartBytes: adapter.uploadPartBytes.bind(adapter),
        completeMultipartUpload: adapter.completeMultipartUpload.bind(adapter),
        abortMultipartUpload: adapter.abortMultipartUpload.bind(adapter),
        listParts: adapter.listParts.bind(adapter)
      };
      const existing = uppy.getPlugin?.("DiscordFsMultipart");
      if (existing && typeof existing.setOptions === "function") {
        existing.setOptions(awsS3Options);
      } else {
        try {
          if (existing) uppy.removePlugin(existing);
        } catch {
        }
        uppy.use(AwsS3Multipart, awsS3Options);
      }
      return { adapter, mode: STORAGE_STRATEGIES.PRESIGNED_MULTIPART };
    }
    if (strategy === STORAGE_STRATEGIES.PRESIGNED_SINGLE) {
      strategy = STORAGE_STRATEGIES.BACKEND_STREAM;
    }
    const headersBase = buildAuthHeadersForRequest({});
    try {
      uppy.setMeta({ path: path || "/", use_multipart: "false" });
    } catch {
    }
    if (strategy === STORAGE_STRATEGIES.BACKEND_FORM) {
      uppy.use(XHRUpload, {
        id: "DiscordBackendForm",
        endpoint: getFullApiUrl("/fs/upload"),
        method: "POST",
        formData: true,
        fieldName: "file",
        limit: 3,
        allowedMetaFields: ["path", "use_multipart", "upload_id"],
        headers: headersBase
      });
      return { adapter: null, mode: STORAGE_STRATEGIES.BACKEND_FORM };
    }
    uppy.use(XHRUpload, {
      id: "DiscordBackendStream",
      endpoint: (file) => {
        const meta = file.meta || {};
        const basePath = meta.path || path || "/";
        const uploadId = meta.upload_id;
        const params = new URLSearchParams();
        params.set("path", basePath);
        if (uploadId) {
          params.set("upload_id", uploadId);
        }
        return `${getFullApiUrl("/fs/upload")}?${params.toString()}`;
      },
      method: "PUT",
      formData: false,
      limit: 3,
      headers: (file) => {
        const meta = file.meta || {};
        const uploadOptions = {
          overwrite: !!meta.overwrite,
          originalFilename: !!meta.original_filename
        };
        const rawName = meta.name || file.name || "upload-file";
        const encodedName = encodeURIComponent(rawName);
        return {
          ...headersBase,
          "x-fs-filename": encodedName,
          "x-fs-options": btoa(JSON.stringify(uploadOptions))
        };
      }
    });
    uppy.on("upload", () => {
      const files = uppy.getFiles();
      files.forEach((file) => {
        if (file.meta?.name && file.meta.name !== file.name) {
          uppy.setFileState(file.id, { name: file.meta.name });
        }
      });
    });
    return { adapter: null, mode: STORAGE_STRATEGIES.BACKEND_STREAM };
  }
}
const log$2 = createLogger("Sha256PreprocessPlugin");
class Sha256PreprocessPlugin extends BasePlugin {
  static VERSION = "1.0.0";
  constructor(uppy, opts) {
    super(uppy, {
      enabled: true,
      // 10MB
      maxWebCryptoSize: 1e7,
      // 写入到 file.meta 的字段名
      metaKey: "cloudpasteSha256",
      ...opts
    });
    this.type = "modifier";
    this.id = this.opts.id || "Sha256PreprocessPlugin";
    this.prepareUpload = this.prepareUpload.bind(this);
    this.defaultLocale = {
      strings: {
        hashingSha256: "计算 SHA-256（用于预签名/秒传准备）..."
      }
    };
    this.i18nInit();
  }
  install() {
    this.uppy.addPreProcessor(this.prepareUpload);
    log$2.debug("插件已安装");
  }
  uninstall() {
    this.uppy.removePreProcessor(this.prepareUpload);
    log$2.debug("插件已卸载");
  }
  async prepareUpload(fileIDs) {
    const enabled = typeof this.opts.enabled === "function" ? await this.opts.enabled() : this.opts.enabled !== false;
    if (!enabled) {
      return Promise.resolve();
    }
    const promises = fileIDs.map(async (fileID) => {
      const file = this.uppy.getFile(fileID);
      if (!file) return;
      const metaKey = this.opts.metaKey || "cloudpasteSha256";
      const existing = file?.meta?.[metaKey];
      if (typeof existing === "string" && existing.length > 0) {
        this.uppy.emit("preprocess-complete", file);
        return;
      }
      const blob = file?.data instanceof Blob ? file.data : null;
      if (!blob) {
        this.uppy.emit("preprocess-complete", file);
        return;
      }
      const message = this.i18n("hashingSha256");
      this.uppy.emit("preprocess-progress", file, {
        mode: blob.size >= this.opts.maxWebCryptoSize ? "determinate" : "indeterminate",
        message,
        value: 0
      });
      try {
        const sha256 = await sha256HexFromBlob(blob, {
          maxWebCryptoSize: this.opts.maxWebCryptoSize,
          useWebWorker: true,
          onProgress: (progress) => {
            if (typeof progress === "number") {
              this.uppy.emit("preprocess-progress", file, {
                mode: "determinate",
                message,
                value: progress
              });
            }
          }
        });
        this.uppy.setFileMeta(fileID, { [metaKey]: sha256 });
      } catch (error) {
        log$2.error("[Sha256PreprocessPlugin] sha256 计算失败:", error);
        throw error;
      } finally {
        this.uppy.emit("preprocess-complete", file);
      }
    });
    return Promise.all(promises);
  }
}
class HuggingFaceDatasetsDriver extends LocalDriver {
  constructor(config = {}) {
    super(config);
    this.capabilities = createCapabilities({
      share: {
        backendStream: true,
        backendForm: true,
        presigned: true,
        url: false
      },
      fs: {
        backendStream: true,
        backendForm: true,
        presignedSingle: true,
        multipart: true
      }
    });
    this.share.applyDirectShareUploader = this.applyDirectShareUploader.bind(this);
    this.fs.listUploads = this.listUploads.bind(this);
    this.fs.listParts = this.listParts.bind(this);
  }
  /**
   * FS 上传插件安装
   * - presigned-single：走 /api/fs/presign，拿到 uploadUrl 后直传
   */
  applyFsUploader(uppy, { strategy, path } = {}) {
    if (!uppy) throw new Error("applyFsUploader 需要提供 Uppy 实例");
    if (strategy === STORAGE_STRATEGIES.PRESIGNED_SINGLE || strategy === STORAGE_STRATEGIES.PRESIGNED_MULTIPART) {
      const isMultipart = strategy === STORAGE_STRATEGIES.PRESIGNED_MULTIPART;
      const shaPlugin = uppy.getPlugin("Sha256PreprocessPlugin");
      const shaOpts = { enabled: true, maxWebCryptoSize: 1e7, metaKey: "cloudpasteSha256" };
      if (shaPlugin) {
        try {
          shaPlugin.setOptions(shaOpts);
        } catch {
        }
      } else {
        uppy.use(Sha256PreprocessPlugin, shaOpts);
      }
      const adapter = new StorageAdapter(path || "/", uppy, {
        requireSha256ForPresign: true,
        enableMultipartPreinit: isMultipart
      });
      const limitFromConfig = Number(this.config?.hf_multipart_concurrency);
      const multipartLimit = Number.isFinite(limitFromConfig) && limitFromConfig > 0 ? Math.floor(limitFromConfig) : 5;
      const awsS3Opts = {
        id: "AwsS3",
        limit: isMultipart ? multipartLimit : 3,
        shouldUseMultipart: () => isMultipart,
        // 让 Uppy(AwsS3) 用后端返回的 partSize 切片
        // AwsS3.getChunkSize() 实际拿到的是 file.data（Blob/File），不是 Uppy 的 file 对象。
        getChunkSize: (data) => adapter.getChunkSizeForAwsS3(data)
      };
      if (isMultipart) {
        awsS3Opts.getUploadParameters = adapter.getUploadParameters.bind(adapter);
        awsS3Opts.createMultipartUpload = adapter.createMultipartUpload.bind(adapter);
        awsS3Opts.signPart = adapter.signPart.bind(adapter);
        awsS3Opts.uploadPartBytes = adapter.uploadPartBytes.bind(adapter);
        awsS3Opts.completeMultipartUpload = adapter.completeMultipartUpload.bind(adapter);
        awsS3Opts.abortMultipartUpload = adapter.abortMultipartUpload.bind(adapter);
        awsS3Opts.listParts = adapter.listParts.bind(adapter);
      } else {
        awsS3Opts.getUploadParameters = adapter.getUploadParameters.bind(adapter);
        awsS3Opts.uploadPartBytes = adapter.uploadSingleFile.bind(adapter);
      }
      uppy.use(AwsS3Multipart, awsS3Opts);
      return { adapter, mode: isMultipart ? STORAGE_STRATEGIES.PRESIGNED_MULTIPART : STORAGE_STRATEGIES.PRESIGNED_SINGLE };
    }
    return super.applyFsUploader(uppy, { strategy, path });
  }
  // Read-only helpers for resume plugin -------------------------------------
  async listUploads({ path } = {}) {
    return api.fs.listMultipartUploads(path || "");
  }
  async listParts({ path, uploadId, fileName }) {
    return api.fs.listMultipartParts(path, uploadId, fileName);
  }
  /**
   * Share 预签名上传（上传即分享）
   * - /api/share/presign：拿到 uploadUrl（HF 实际返回的是 S3 presigned URL）
   * - 浏览器 PUT 到 uploadUrl（不经过你的 Worker）
   * - /api/share/commit：后端完成“登记/提交”，并创建 share 记录
   */
  applyShareUploader(uppy, { payload, onShareRecord } = {}) {
    if (!uppy) throw new Error("applyShareUploader 需要提供 Uppy 实例");
    const storageConfigId = payload?.storage_config_id || this.storageConfigId;
    if (!storageConfigId) throw new Error("缺少 storage_config_id，无法初始化 HuggingFace 分享上传");
    const basePayload = {
      ...payload || {},
      storage_config_id: storageConfigId
    };
    const pluginId = "AwsS3ShareHuggingFaceDatasets";
    if (uppy.getPlugin(pluginId)) return;
    const shaPlugin = uppy.getPlugin("Sha256PreprocessPlugin");
    const shaOpts = { enabled: true, maxWebCryptoSize: 1e7, metaKey: "cloudpasteSha256" };
    if (shaPlugin) {
      try {
        shaPlugin.setOptions(shaOpts);
      } catch {
      }
    } else {
      uppy.use(Sha256PreprocessPlugin, shaOpts);
    }
    const adapter = new StorageAdapter("/", uppy);
    uppy.use(AwsS3Multipart, {
      id: pluginId,
      shouldUseMultipart: () => false,
      limit: 3,
      getUploadParameters: async (file) => {
        const meta = file?.meta || {};
        const fileName = typeof meta?.name === "string" && meta.name ? meta.name : file.name;
        const blob = file?.data instanceof Blob ? file.data : null;
        let sha256 = null;
        if (typeof meta?.cloudpasteSha256 === "string" && meta.cloudpasteSha256) {
          sha256 = meta.cloudpasteSha256;
        } else if (typeof meta?.sha256 === "string" && meta.sha256) {
          sha256 = meta.sha256;
        } else if (blob) {
          sha256 = await sha256HexFromBlob(blob);
        }
        if (!sha256) {
          throw new Error("HuggingFace 预签名上传需要 sha256，但当前文件无法计算 sha256");
        }
        const presign = await api.file.getUploadPresignedUrl({
          storage_config_id: basePayload.storage_config_id,
          filename: fileName,
          mimetype: file.type || "application/octet-stream",
          path: meta.path ?? basePayload.path,
          size: file.size,
          sha256
        });
        if (!presign?.success || !presign?.data) {
          throw new Error(presign?.message || "获取预签名URL失败");
        }
        const data = presign.data || {};
        const uploadUrl = data.uploadUrl || data.upload_url || "";
        const skipUpload = data.skipUpload === true || !uploadUrl;
        const canonicalSha256 = typeof data.sha256 === "string" && data.sha256 ? data.sha256 : sha256;
        try {
          uppy.setFileMeta(file.id, {
            key: data.key,
            storage_config_id: data.storage_config_id || basePayload.storage_config_id,
            filename: typeof data.filename === "string" && data.filename ? data.filename : fileName,
            path: meta.path ?? basePayload.path,
            slug: meta.slug ?? basePayload.slug,
            password: basePayload.password || meta.password || null,
            expires_in: basePayload.expires_in,
            max_views: basePayload.max_views,
            sha256: canonicalSha256,
            skipUpload
          });
        } catch {
        }
        const headers = { ...data.headers || {} };
        if (skipUpload) {
          headers["x-cloudpaste-skip-upload"] = "1";
        }
        return {
          method: "PUT",
          url: skipUpload ? `${API_BASE_URL}/__uppy_skip_upload__` : uploadUrl,
          headers,
          skipUpload
        };
      },
      uploadPartBytes: adapter.uploadSingleFile.bind(adapter)
    });
    const onSuccess = async (file) => {
      const meta = file?.meta || {};
      try {
        const commitRes = await api.file.completeFileUpload({
          key: meta.key,
          storage_config_id: meta.storage_config_id,
          filename: typeof meta?.filename === "string" && meta.filename ? meta.filename : typeof meta?.name === "string" && meta.name ? meta.name : file.name,
          size: file.size,
          etag: void 0,
          sha256: typeof meta?.sha256 === "string" && meta.sha256 ? meta.sha256 : null,
          slug: meta.slug,
          remark: basePayload.remark,
          password: basePayload.password,
          expires_in: basePayload.expires_in,
          max_views: basePayload.max_views,
          use_proxy: basePayload.use_proxy,
          original_filename: basePayload.original_filename ?? false,
          path: meta.path
        });
        if (commitRes?.data) {
          const shareRecord = commitRes.data;
          try {
            uppy.setFileMeta(file.id, { fileId: shareRecord.id, shareRecord, skipUpload: meta.skipUpload === true });
          } catch {
          }
          try {
            uppy.emit("share-record", { file, shareRecord });
          } catch {
          }
          try {
            onShareRecord?.({ file, shareRecord });
          } catch {
          }
        }
      } catch (e2) {
        try {
          uppy.emit("upload-error", file, e2);
        } catch {
        }
      }
    };
    uppy.on("upload-success", onSuccess);
  }
  /**
   * Share 直传（stream/form）
   */
  applyDirectShareUploader(uppy, { payload, onShareRecord, shareMode } = {}) {
    return LocalDriver.prototype.applyShareUploader.call(this, uppy, { payload, onShareRecord, shareMode });
  }
}
const driverFactories = /* @__PURE__ */ new Map([
  [DRIVER_TYPES.S3, (config) => new S3Driver(config)],
  [DRIVER_TYPES.WEBDAV, (config) => new WebDavDriver(config)],
  [DRIVER_TYPES.LOCAL, (config) => new LocalDriver(config)],
  [DRIVER_TYPES.ONEDRIVE, (config) => new OneDriveDriver(config)],
  [DRIVER_TYPES.GOOGLE_DRIVE, (config) => new GoogleDriveDriver(config)],
  [DRIVER_TYPES.GITHUB_RELEASES, (config) => new GithubReleasesDriver(config)],
  [DRIVER_TYPES.GITHUB_API, (config) => new GithubApiDriver(config)],
  [DRIVER_TYPES.TELEGRAM, (config) => new TelegramDriver(config)],
  [DRIVER_TYPES.DISCORD, (config) => new DiscordDriver(config)],
  [DRIVER_TYPES.HUGGINGFACE_DATASETS, (config) => new HuggingFaceDatasetsDriver(config)]
]);
const driverCache = /* @__PURE__ */ new Map();
const buildCacheKey = (configId) => `driver:${configId}`;
function resolveDriverByType(type, config) {
  if (!type) {
    throw new DriverResolutionError("缺少 storage_type，无法解析存储驱动", { code: "MISSING_TYPE" });
  }
  const normalizedType = type.toUpperCase();
  const factory = driverFactories.get(normalizedType);
  if (!factory) {
    throw new DriverResolutionError(`未注册的存储驱动: ${normalizedType}`, {
      code: "UNSUPPORTED_TYPE",
      meta: { type: normalizedType }
    });
  }
  return factory(config || {});
}
function resolveDriverByConfigId(configId) {
  if (configId === void 0 || configId === null || configId === "") {
    throw new DriverResolutionError("storage_config_id 不能为空", { code: "MISSING_CONFIG_ID" });
  }
  const cacheKey = buildCacheKey(configId);
  if (driverCache.has(cacheKey)) {
    return driverCache.get(cacheKey);
  }
  const store = useStorageConfigsStore();
  const config = store.getConfigById(Number(configId)) || store.getConfigById(configId);
  if (!config) {
    throw new DriverResolutionError(`未找到存储配置: ${configId}`, {
      code: "CONFIG_NOT_FOUND",
      meta: { configId }
    });
  }
  const driver = resolveDriverByType(config.storage_type || DRIVER_TYPES.S3, config);
  driverCache.set(cacheKey, driver);
  return driver;
}
const DEFAULT_TYPE = "application/octet-stream";
const log$1 = createLogger("UploaderClient");
const generateUploadId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `upload-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};
const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value));
function normalizeProgress(file, progress = {}) {
  const bytesUploaded = progress.bytesUploaded ?? 0;
  const bytesTotal = progress.bytesTotal ?? file?.size ?? file?.data?.size ?? 0;
  const percent = bytesTotal > 0 ? clamp(Math.round(bytesUploaded / bytesTotal * 100)) : 0;
  return { file, fileId: file?.id, bytesUploaded, bytesTotal, percent };
}
function attachLifecycle(uppy, callbacks = {}) {
  const handlers = [];
  if (callbacks.onFileAdded) {
    const handler = (file) => callbacks.onFileAdded?.(file);
    uppy.on("file-added", handler);
    handlers.push(["file-added", handler]);
  }
  if (callbacks.onProgress) {
    const handler = (file, progress) => callbacks.onProgress?.(normalizeProgress(file, progress));
    uppy.on("upload-progress", handler);
    handlers.push(["upload-progress", handler]);
  }
  if (callbacks.onSuccess) {
    const handler = (file, response) => callbacks.onSuccess?.({ file, response });
    uppy.on("upload-success", handler);
    handlers.push(["upload-success", handler]);
  }
  if (callbacks.onError) {
    const handler = (file, error, response) => callbacks.onError?.({ file, error, response });
    uppy.on("upload-error", handler);
    handlers.push(["upload-error", handler]);
  }
  if (callbacks.onComplete) {
    const handler = (result) => callbacks.onComplete?.(result);
    uppy.on("complete", handler);
    handlers.push(["complete", handler]);
  }
  if (callbacks.onShareRecord) {
    log$1.debug("register share-record listener");
    const handler = (payload) => callbacks.onShareRecord?.(payload);
    uppy.on("share-record", handler);
    handlers.push(["share-record", handler]);
  }
  return () => {
    handlers.forEach(([event, handler]) => {
      try {
        uppy.off?.(event, handler);
      } catch {
      }
    });
  };
}
function inferName(file) {
  if (!file) return "upload-file";
  if (typeof file.name === "string" && file.name.length) return file.name;
  if (file.data && typeof file.data.name === "string" && file.data.name.length) return file.data.name;
  return "upload-file";
}
function inferType(file) {
  if (file?.type) return file.type;
  if (file?.data?.type) return file.data.type;
  return DEFAULT_TYPE;
}
function removeUploadPlugins(uppy) {
  if (!uppy) return;
  const pluginIds = Object.keys(uppy.getState().plugins || {});
  pluginIds.forEach((pluginId) => {
    if (pluginId.includes("AwsS3") || pluginId.includes("S3") || pluginId.includes("ShareUpload") || pluginId.includes("FsUpload") || pluginId.includes("UrlUpload") || pluginId.includes("XHRUpload") || pluginId.includes("Tus")) {
      try {
        uppy.removePlugin(uppy.getPlugin(pluginId));
      } catch (error) {
        log$1.debug("移除插件失败:", pluginId, error);
      }
    }
  });
}
function createDriverSession({ payload = {}, storageConfigId, installPlugin, events = {}, uppyOptions = {}, uppy: existingUppy }) {
  const configId = storageConfigId ?? payload?.storage_config_id;
  if (!configId) {
    throw new Error("缺少 storage_config_id，无法初始化上传会话");
  }
  const driver = resolveDriverByConfigId(configId);
  const ownsUppy = !existingUppy;
  const uppy = existingUppy || new Uppy$1({ autoProceed: false, ...uppyOptions });
  const detachLifecycle = attachLifecycle(uppy, events);
  if (existingUppy && typeof installPlugin === "function") {
    removeUploadPlugins(uppy);
  }
  if (typeof installPlugin === "function") {
    installPlugin(driver, uppy, payload, events || {});
  }
  const addFile = (file, meta = {}) => {
    const uploadId = meta.upload_id || generateUploadId();
    const descriptor = {
      data: file?.data ?? file,
      name: inferName(file),
      type: inferType(file),
      meta: { ...meta, upload_id: uploadId }
    };
    const added = uppy.addFile(descriptor);
    return added?.id ?? (Array.isArray(added) ? added[0]?.id : null) ?? uppy.getFiles().slice(-1).pop()?.id ?? null;
  };
  const addFiles = (files = [], buildMeta) => {
    return files.map((file, index) => addFile(file, buildMeta ? buildMeta(file, index) || {} : {}));
  };
  const start = async () => {
    return await uppy.upload();
  };
  const cancel = () => {
    try {
      uppy.cancelAll?.();
    } catch (error) {
      log$1.warn("UploaderClient: cancelAll 失败", error);
    }
  };
  const destroy = () => {
    detachLifecycle?.();
    if (ownsUppy) {
      try {
        uppy.close?.();
      } catch {
      }
      try {
        uppy.destroy?.();
      } catch {
      }
    }
  };
  return { uppy, addFile, addFiles, start, cancel, destroy };
}
function useUploaderClient() {
  const createShareUploadSession = ({ payload, events, uppyOptions, uppy } = {}) => {
    return createDriverSession({
      payload,
      storageConfigId: payload?.storage_config_id,
      events,
      uppyOptions,
      uppy,
      installPlugin: (driver, uppyInstance, payloadRef, lifecycleEvents = {}) => {
        driver.share.applyShareUploader(uppyInstance, {
          payload: payloadRef,
          onShareRecord: lifecycleEvents.onShareRecord
        });
      }
    });
  };
  const createDirectShareUploadSession = ({ payload, events, uppyOptions, uppy, shareMode } = {}) => {
    return createDriverSession({
      payload,
      storageConfigId: payload?.storage_config_id,
      events,
      uppyOptions,
      uppy,
      installPlugin: (driver, uppyInstance, payloadRef, lifecycleEvents = {}) => {
        const impl = typeof driver.share.applyDirectShareUploader === "function" ? driver.share.applyDirectShareUploader.bind(driver) : driver.share.applyShareUploader.bind(driver);
        impl(uppyInstance, {
          payload: payloadRef,
          onShareRecord: lifecycleEvents.onShareRecord,
          shareMode
        });
      }
    });
  };
  const createUrlUploadSession = ({ payload, events, uppyOptions, uppy } = {}) => {
    return createDriverSession({
      payload,
      storageConfigId: payload?.storage_config_id,
      events,
      uppyOptions,
      uppy,
      installPlugin: (driver, uppyInstance, payloadRef, lifecycleEvents = {}) => {
        driver.share.applyUrlUploader(uppyInstance, {
          payload: payloadRef,
          onShareRecord: lifecycleEvents.onShareRecord
        });
      }
    });
  };
  const createFsUploadSession = ({ storageConfigId, fsOptions = {}, events, uppyOptions, uppy } = {}) => {
    return createDriverSession({
      storageConfigId,
      payload: fsOptions,
      events,
      uppyOptions,
      uppy,
      // 对于外部传入的 Uppy 实例（挂载页场景），插件安装由调用方负责（例如 UppyUploadModal.configureUploadMethod）
      // 仅在内部创建 Uppy 实例时才自动安装 FS 上传插件
      installPlugin: uppy ? null : (driver, uppyInstance, options) => {
        driver.fs.applyFsUploader(uppyInstance, options || {});
      }
    });
  };
  return {
    createShareUploadSession,
    createDirectShareUploadSession,
    createUrlUploadSession,
    createFsUploadSession
  };
}
function useShareUploadController() {
  const uploaderClient = useUploaderClient();
  const activeShareSession = ref(null);
  const activeUrlSession = ref(null);
  const disposeGenericSession = (sessionRef, { cancel = false } = {}) => {
    const session = sessionRef.value;
    if (!session) return;
    if (cancel) {
      try {
        session.cancel?.();
      } catch {
      }
    }
    try {
      session.destroy?.();
    } catch {
    }
    sessionRef.value = null;
  };
  const disposeShareSession = (options = {}) => {
    disposeGenericSession(activeShareSession, options);
  };
  const disposeUrlSession = (options = {}) => {
    disposeGenericSession(activeUrlSession, options);
  };
  const createShareSession = ({ payload, events, uppyOptions, uppy } = {}) => {
    disposeShareSession();
    const session = uploaderClient.createShareUploadSession({
      payload,
      events,
      uppyOptions,
      uppy
    });
    activeShareSession.value = session;
    return session;
  };
  const createDirectShareSession = ({ payload, events, uppyOptions, uppy, shareMode } = {}) => {
    disposeShareSession();
    const session = uploaderClient.createDirectShareUploadSession({
      payload,
      events,
      uppyOptions,
      uppy,
      shareMode
    });
    activeShareSession.value = session;
    return session;
  };
  const createUrlSession = ({ payload, events, uppyOptions, uppy } = {}) => {
    disposeUrlSession();
    const session = uploaderClient.createUrlUploadSession({
      payload,
      events,
      uppyOptions,
      uppy
    });
    activeUrlSession.value = session;
    return session;
  };
  const createUrlDirectSession = ({ payload, events, uppyOptions, uppy } = {}) => {
    disposeUrlSession();
    const session = uploaderClient.createDirectShareUploadSession({
      payload,
      events,
      uppyOptions,
      uppy,
      shareMode: "stream"
    });
    activeUrlSession.value = session;
    return session;
  };
  const createFsUploadSession = ({ storageConfigId, fsOptions = {}, events, uppyOptions, uppy } = {}) => {
    return uploaderClient.createFsUploadSession({
      storageConfigId,
      fsOptions,
      events,
      uppyOptions,
      uppy
    });
  };
  const startShareUpload = ({ files = [], payload, buildMeta, events, uppyOptions, uppy } = {}) => {
    const session = createShareSession({ payload, events, uppyOptions, uppy });
    const ids = Array.isArray(files) && files.length ? session.addFiles(files, buildMeta) : [];
    return { session, ids };
  };
  const startDirectShareUpload = ({ files = [], payload, buildMeta, events, uppyOptions, uppy, shareMode } = {}) => {
    const session = createDirectShareSession({ payload, events, uppyOptions, uppy, shareMode });
    const ids = Array.isArray(files) && files.length ? session.addFiles(files, buildMeta) : [];
    return { session, ids };
  };
  const startUrlUpload = ({ files = [], payload, buildMeta, events, uppyOptions } = {}) => {
    const session = createUrlSession({ payload, events, uppyOptions });
    const ids = Array.isArray(files) && files.length ? session.addFiles(files, buildMeta) : [];
    return { session, ids };
  };
  return {
    activeShareSession,
    activeUrlSession,
    createShareSession,
    createDirectShareSession,
    createUrlSession,
    createUrlDirectSession,
    createFsUploadSession,
    startShareUpload,
    startDirectShareUpload,
    startUrlUpload,
    disposeShareSession,
    disposeUrlSession
  };
}
const log = createLogger("UppyPluginManager");
class UppyPluginManager {
  constructor(uppyInstance, locale2 = "zh-CN") {
    this.uppy = uppyInstance;
    this.locale = locale2;
    this.pluginStates = this.loadPluginStates();
    this.pluginDefinitions = this.createPluginDefinitions();
    this._pluginCtorCache = /* @__PURE__ */ new Map();
  }
  /**
   * 从localStorage加载插件状态
   */
  loadPluginStates() {
    const defaultState = {
      webcam: true,
      screen: false,
      audio: false,
      imageEditor: true,
      urlImport: true
    };
    try {
      this._storedPluginStates = useLocalStorage("uppy-plugin-states", defaultState);
      const stored = this._storedPluginStates.value;
      if (stored && typeof stored === "object") {
        return { ...defaultState, ...stored };
      }
    } catch (e2) {
      log.warn("Failed to load plugin states:", e2);
    }
    return defaultState;
  }
  /**
   * 保存插件状态到localStorage
   */
  savePluginStates() {
    try {
      if (this._storedPluginStates) this._storedPluginStates.value = { ...this.pluginStates || {} };
    } catch (e2) {
      log.warn("Failed to save plugin states:", e2);
    }
  }
  /**
   * 获取插件国际化文本
   */
  getPluginTexts() {
    const isZh = this.locale === "zh-CN";
    return {
      webcam: {
        label: isZh ? "摄像头" : "Webcam",
        description: isZh ? "拍照和录制视频" : "Take photos and record videos",
        strings: {
          pluginNameCamera: isZh ? "摄像头" : "Camera",
          smile: isZh ? "微笑！" : "Smile!",
          takePicture: isZh ? "拍照" : "Take a picture",
          startRecording: isZh ? "开始录制" : "Begin recording",
          stopRecording: isZh ? "停止录制" : "Stop recording",
          allowAccessTitle: isZh ? "请允许访问您的摄像头" : "Please allow access to your camera",
          allowAccessDescription: isZh ? "为了拍照或录制视频，请允许此网站访问摄像头。" : "In order to take pictures or record video with your camera, please allow camera access for this site."
        }
      },
      screen: {
        label: isZh ? "屏幕录制" : "Screen Capture",
        description: isZh ? "录制屏幕或应用窗口" : "Record screen or application window",
        strings: {
          startCapturing: isZh ? "开始屏幕录制" : "Begin screen capture",
          stopCapturing: isZh ? "停止屏幕录制" : "Stop screen capture",
          submitRecordedFile: isZh ? "提交录制文件" : "Submit recorded file",
          streamActive: isZh ? "录制中" : "Recording active",
          streamPassive: isZh ? "录制暂停" : "Recording stopped",
          micDisabled: isZh ? "麦克风被禁用" : "Microphone disabled",
          recording: isZh ? "录制中" : "Recording"
        }
      },
      audio: {
        label: isZh ? "音频录制" : "Audio Recording",
        description: isZh ? "录制音频文件" : "Record audio files",
        strings: {
          pluginNameAudio: isZh ? "音频" : "Audio",
          startAudioRecording: isZh ? "开始录音" : "Begin audio recording",
          stopAudioRecording: isZh ? "停止录音" : "Stop audio recording",
          allowAudioAccessTitle: isZh ? "请允许访问您的麦克风" : "Please allow access to your microphone",
          allowAudioAccessDescription: isZh ? "为了录制音频，请允许此网站访问麦克风。" : "In order to record audio with your microphone, please allow microphone access for this site.",
          noAudioTitle: isZh ? "麦克风不可用" : "Microphone not available",
          noAudioDescription: isZh ? "为了录制音频，请连接麦克风或其他音频输入设备" : "To record audio, please connect a microphone or other audio input device",
          recordingStoppedMaxSize: isZh ? "录制已停止，因为文件大小即将超出限制" : "Recording stopped because file size is about to exceed the limit",
          recordingLength: isZh ? "录制时长 %{recording_length}" : "Recording length %{recording_length}",
          submitRecordedFile: isZh ? "提交录制文件" : "Submit recorded file",
          discardRecordedFile: isZh ? "丢弃录制文件" : "Discard recorded file"
        }
      },
      imageEditor: {
        label: isZh ? "图片编辑" : "Image Editor",
        description: isZh ? "编辑和优化图片" : "Edit and optimize images",
        strings: {
          edit: isZh ? "编辑" : "Edit",
          save: isZh ? "保存" : "Save",
          cancel: isZh ? "取消" : "Cancel",
          revert: isZh ? "还原" : "Revert",
          crop: isZh ? "裁剪" : "Crop",
          rotate: isZh ? "旋转" : "Rotate",
          flip: isZh ? "翻转" : "Flip",
          brightness: isZh ? "亮度" : "Brightness",
          contrast: isZh ? "对比度" : "Contrast",
          saturation: isZh ? "饱和度" : "Saturation"
        }
      },
      urlImport: {
        label: isZh ? "URL导入" : "URL Import",
        description: isZh ? "从链接导入文件" : "Import files from URL",
        strings: {
          pluginName: isZh ? "URL" : "URL",
          importFromUrl: isZh ? "从URL导入" : "Import from URL",
          enterUrl: isZh ? "输入文件URL" : "Enter file URL",
          analyzing: isZh ? "分析中..." : "Analyzing...",
          downloading: isZh ? "下载中..." : "Downloading...",
          analyzeUrl: isZh ? "分析 URL" : "Analyze URL",
          download: isZh ? "下载" : "Download",
          fileInfoReady: isZh ? "文件信息已获取" : "File info retrieved",
          unknownFile: isZh ? "未知文件" : "Unknown file",
          reInput: isZh ? "重新输入" : "Re-enter",
          cannotGetUrlInfo: isZh ? "无法获取URL信息" : "Cannot retrieve URL info",
          analysisFailed: isZh ? "URL分析失败" : "URL analysis failed",
          missingFileInfo: isZh ? "缺少文件信息" : "Missing file info",
          downloadFailed: isZh ? "下载失败" : "Download failed",
          downloadComplete: isZh ? "下载完成" : "Download complete",
          progressPercent: "%{progress}%",
          cancelDownload: isZh ? "取消下载" : "Cancel",
          downloadCancelled: isZh ? "下载已取消" : "Download cancelled"
        }
      }
    };
  }
  /**
   * 创建插件定义
   */
  createPluginDefinitions() {
    const texts = this.getPluginTexts();
    return [
      {
        key: "imageEditor",
        label: texts.imageEditor.label,
        description: texts.imageEditor.description,
        enabled: this.pluginStates.imageEditor,
        cssLoader: () => __vitePreload(() => Promise.resolve({}), true ? [] : void 0),
        pluginLoader: async () => {
          const mod = await __vitePreload(() => import("./index-FnY8_LvA.js"), true ? __vite__mapDeps([0,1,2]) : void 0);
          return mod?.default || mod;
        },
        config: {
          quality: 0.8,
          locale: {
            strings: texts.imageEditor.strings
          }
        }
      },
      {
        key: "webcam",
        label: texts.webcam.label,
        description: texts.webcam.description,
        enabled: this.pluginStates.webcam,
        cssLoader: () => __vitePreload(() => Promise.resolve({}), true ? [] : void 0),
        pluginLoader: async () => {
          const mod = await __vitePreload(() => import("./index-BkILv0fc.js"), true ? __vite__mapDeps([3,4,1,2]) : void 0);
          return mod?.default || mod;
        },
        config: {
          modes: ["video-audio", "video-only", "picture"],
          mirror: true,
          showRecordingLength: true,
          locale: {
            strings: texts.webcam.strings
          }
        }
      },
      {
        key: "screen",
        label: texts.screen.label,
        description: texts.screen.description,
        enabled: this.pluginStates.screen,
        cssLoader: () => __vitePreload(() => Promise.resolve({}), true ? [] : void 0),
        pluginLoader: async () => {
          const mod = await __vitePreload(() => import("./index-iGxz4vyk.js"), true ? __vite__mapDeps([5,4,1,2]) : void 0);
          return mod?.default || mod;
        },
        config: {
          displayMediaConstraints: {
            video: {
              width: { min: 640, ideal: 1920, max: 1920 },
              height: { min: 480, ideal: 1080, max: 1080 }
            },
            audio: true
          },
          locale: {
            strings: texts.screen.strings
          }
        }
      },
      {
        key: "audio",
        label: texts.audio.label,
        description: texts.audio.description,
        enabled: this.pluginStates.audio,
        cssLoader: () => __vitePreload(() => Promise.resolve({}), true ? [] : void 0),
        pluginLoader: async () => {
          const mod = await __vitePreload(() => import("./index-DTAkkwpz.js"), true ? __vite__mapDeps([6,4,1,2]) : void 0);
          return mod?.default || mod;
        },
        config: {
          showRecordingLength: true,
          locale: {
            strings: texts.audio.strings
          }
        }
      },
      {
        key: "urlImport",
        label: texts.urlImport.label,
        description: texts.urlImport.description,
        enabled: this.pluginStates.urlImport,
        pluginLoader: async () => {
          const mod = await __vitePreload(() => import("./UrlImportPlugin-COQNLQA8.js"), true ? __vite__mapDeps([7,1,2]) : void 0);
          return mod?.default || mod?.UrlImportPlugin || mod;
        },
        config: {
          // 传入语言包配置（会与插件的 defaultLocale 合并）
          locale: {
            strings: texts.urlImport.strings
          },
          // API回调函数（由外部设置）
          validateUrlInfo: null,
          fetchUrlContent: null
        }
      }
    ];
  }
  /**
   * 获取插件列表（用于UI显示）
   */
  getPluginList() {
    return this.pluginDefinitions.map((plugin) => ({
      key: plugin.key,
      label: plugin.label,
      description: plugin.description,
      enabled: plugin.enabled
    }));
  }
  /**
   * 切换插件状态
   */
  togglePlugin(pluginKey) {
    const plugin = this.pluginDefinitions.find((p2) => p2.key === pluginKey);
    if (plugin) {
      plugin.enabled = !plugin.enabled;
      this.pluginStates[pluginKey] = plugin.enabled;
      this.savePluginStates();
      return plugin.enabled;
    }
    return false;
  }
  /**
   * 设置URL导入插件的回调函数
   * @param {Object} callbacks - 回调函数对象
   * @param {Function} callbacks.validateUrlInfo - URL验证函数
   * @param {Function} callbacks.fetchUrlContent - URL下载函数
   * @param {Function} callbacks.onShowModal - 显示模态框回调
   * @param {Function} callbacks.onHideModal - 隐藏模态框回调
   */
  setUrlImportCallbacks(callbacks = {}) {
    const urlPlugin = this.pluginDefinitions.find((p2) => p2.key === "urlImport");
    if (urlPlugin && urlPlugin.config) {
      Object.assign(urlPlugin.config, callbacks);
    }
  }
  /**
   * 添加所有启用的插件到Uppy实例
   */
  async addPluginsToUppy() {
    if (!this.uppy) return;
    for (const plugin of this.pluginDefinitions) {
      if (!plugin?.enabled) continue;
      try {
        if (typeof plugin.cssLoader === "function") {
          await plugin.cssLoader();
        }
        const PluginCtor = await this._loadPluginCtor(plugin);
        if (!PluginCtor) continue;
        this.uppy.use(PluginCtor, plugin.config || {});
      } catch (e2) {
        log.warn("[UppyPluginManager] 插件加载失败:", plugin?.key, e2);
      }
    }
  }
  /**
   * 动态加载插件构造函数（带缓存）
   * @param {Object} pluginDef - 插件定义
   * @returns {Promise<any>}
   */
  async _loadPluginCtor(pluginDef) {
    const key = pluginDef?.key;
    if (!key) return null;
    if (this._pluginCtorCache?.has(key)) {
      return this._pluginCtorCache.get(key);
    }
    if (typeof pluginDef.pluginLoader !== "function") {
      return null;
    }
    const ctor = await pluginDef.pluginLoader();
    this._pluginCtorCache.set(key, ctor);
    return ctor;
  }
  /**
   * 更新语言设置
   */
  updateLocale(newLocale) {
    this.locale = newLocale;
    this.pluginDefinitions = this.createPluginDefinitions();
  }
  /**
   * 获取启用的插件数量
   */
  getEnabledPluginsCount() {
    return this.pluginDefinitions.filter((p2) => p2.enabled).length;
  }
}
function createUppyPluginManager(uppyInstance, locale2 = "zh-CN") {
  return new UppyPluginManager(uppyInstance, locale2);
}
export {
  A$1 as A,
  BasePlugin as B,
  Dashboard as D,
  PathResolver as P,
  STORAGE_STRATEGIES as S,
  UIPlugin as U,
  _$1 as _,
  readClientLedgerParts as a,
  useUppyEvents as b,
  useUppyBackendProgress as c,
  useUppyPaste as d,
  useShareUploadController as e,
  _sfc_main$2 as f,
  _sfc_main$1 as g,
  _sfc_main as h,
  createUppyPluginManager as i,
  Sha256PreprocessPlugin as j,
  u$1 as k,
  k$2 as l,
  mimeTypes as m,
  resolveDriverByConfigId as r,
  useUppyCore as u,
  x,
  y$1 as y
};
