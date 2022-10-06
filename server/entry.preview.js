"use strict";
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _parts, _type, _size, _endings, _a, _lastModified, _name, _b, _d, _c;
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const http = require("node:http");
const https = require("node:https");
const zlib = require("node:zlib");
const Stream = require("node:stream");
const node_buffer = require("node:buffer");
const node_util = require("node:util");
const node_url = require("node:url");
const node_net = require("node:net");
const _interopDefaultLegacy = (e2) => e2 && typeof e2 === "object" && "default" in e2 ? e2 : { default: e2 };
function _interopNamespace(e2) {
  if (e2 && e2.__esModule)
    return e2;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e2) {
    for (const k in e2) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e2, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e2[k]
        });
      }
    }
  }
  n.default = e2;
  return Object.freeze(n);
}
const http__default = /* @__PURE__ */ _interopDefaultLegacy(http);
const https__default = /* @__PURE__ */ _interopDefaultLegacy(https);
const zlib__default = /* @__PURE__ */ _interopDefaultLegacy(zlib);
const Stream__default = /* @__PURE__ */ _interopDefaultLegacy(Stream);
/**
 * @license
 * @builder.io/qwik 0.9.0
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
const EMPTY_ARRAY$1 = [];
const EMPTY_OBJ$1 = {};
const isSerializableObject = (v) => {
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || null === proto;
};
const isObject = (v) => v && "object" == typeof v;
const isArray = (v) => Array.isArray(v);
const isString = (v) => "string" == typeof v;
const isFunction = (v) => "function" == typeof v;
const QSlot = "q:slot";
const isPromise = (value) => value instanceof Promise;
const safeCall = (call, thenFn, rejectFn) => {
  try {
    const promise = call();
    return isPromise(promise) ? promise.then(thenFn, rejectFn) : thenFn(promise);
  } catch (e2) {
    return rejectFn(e2);
  }
};
const then = (promise, thenFn) => isPromise(promise) ? promise.then(thenFn) : thenFn(promise);
const promiseAll = (promises) => promises.some(isPromise) ? Promise.all(promises) : promises;
const isNotNullable = (v) => null != v;
const delay = (timeout) => new Promise((resolve) => {
  setTimeout(resolve, timeout);
});
let _context;
const tryGetInvokeContext = () => {
  if (!_context) {
    const context = "undefined" != typeof document && document && document.__q_context__;
    if (!context) {
      return;
    }
    return isArray(context) ? document.__q_context__ = newInvokeContextFromTuple(context) : context;
  }
  return _context;
};
const getInvokeContext = () => {
  const ctx = tryGetInvokeContext();
  if (!ctx) {
    throw qError(QError_useMethodOutsideContext);
  }
  return ctx;
};
const useInvokeContext = () => {
  const ctx = getInvokeContext();
  if ("qRender" !== ctx.$event$) {
    throw qError(QError_useInvokeContext);
  }
  return ctx.$hostElement$, ctx.$waitOn$, ctx.$renderCtx$, ctx.$subscriber$, ctx;
};
const invoke = (context, fn, ...args) => {
  const previousContext = _context;
  let returnValue;
  try {
    _context = context, returnValue = fn.apply(null, args);
  } finally {
    _context = previousContext;
  }
  return returnValue;
};
const waitAndRun = (ctx, callback) => {
  const waitOn = ctx.$waitOn$;
  if (0 === waitOn.length) {
    const result = callback();
    isPromise(result) && waitOn.push(result);
  } else {
    waitOn.push(Promise.all(waitOn).then(callback));
  }
};
const newInvokeContextFromTuple = (context) => {
  const element = context[0];
  return newInvokeContext(void 0, element, context[1], context[2]);
};
const newInvokeContext = (hostElement, element, event, url) => ({
  $seq$: 0,
  $hostElement$: hostElement,
  $element$: element,
  $event$: event,
  $url$: url,
  $qrl$: void 0,
  $props$: void 0,
  $renderCtx$: void 0,
  $subscriber$: void 0,
  $waitOn$: void 0
});
const getWrappingContainer = (el) => el.closest("[q\\:container]");
const isNode = (value) => value && "number" == typeof value.nodeType;
const isDocument = (value) => value && 9 === value.nodeType;
const isElement = (value) => 1 === value.nodeType;
const isQwikElement = (value) => isNode(value) && (1 === value.nodeType || 111 === value.nodeType);
const isVirtualElement = (value) => 111 === value.nodeType;
const isModule = (module2) => isObject(module2) && "Module" === module2[Symbol.toStringTag];
let _platform = (() => {
  const moduleCache = /* @__PURE__ */ new Map();
  return {
    isServer: false,
    importSymbol(containerEl, url, symbolName) {
      const urlDoc = ((doc, containerEl2, url2) => {
        var _a3;
        const baseURI = doc.baseURI;
        const base = new URL((_a3 = containerEl2.getAttribute("q:base")) != null ? _a3 : baseURI, baseURI);
        return new URL(url2, base);
      })(containerEl.ownerDocument, containerEl, url).toString();
      const urlCopy = new URL(urlDoc);
      urlCopy.hash = "", urlCopy.search = "";
      const importURL = urlCopy.href;
      const mod = moduleCache.get(importURL);
      return mod ? mod[symbolName] : Promise.resolve().then(() => /* @__PURE__ */ _interopNamespace(require(importURL))).then((mod2) => {
        return module2 = mod2, mod2 = Object.values(module2).find(isModule) || module2, moduleCache.set(importURL, mod2), mod2[symbolName];
        var module2;
      });
    },
    raf: (fn) => new Promise((resolve) => {
      requestAnimationFrame(() => {
        resolve(fn());
      });
    }),
    nextTick: (fn) => new Promise((resolve) => {
      setTimeout(() => {
        resolve(fn());
      });
    }),
    chunkForSymbol() {
    }
  };
})();
const setPlatform = (plt) => _platform = plt;
const getPlatform = () => _platform;
const isServer$1 = () => _platform.isServer;
const directSetAttribute = (el, prop, value) => el.setAttribute(prop, value);
const directGetAttribute = (el, prop) => el.getAttribute(prop);
const ON_PROP_REGEX = /^(on|window:|document:)/;
const isOnProp = (prop) => prop.endsWith("$") && ON_PROP_REGEX.test(prop);
const addQRLListener = (listenersMap, prop, input) => {
  let existingListeners = listenersMap[prop];
  existingListeners || (listenersMap[prop] = existingListeners = []);
  for (const qrl of input) {
    const hash = qrl.$hash$;
    let replaced = false;
    for (let i2 = 0; i2 < existingListeners.length; i2++) {
      if (existingListeners[i2].$hash$ === hash) {
        existingListeners.splice(i2, 1, qrl), replaced = true;
        break;
      }
    }
    replaced || existingListeners.push(qrl);
  }
  return false;
};
const setEvent = (listenerMap, prop, input) => {
  prop.endsWith("$");
  const qrls = isArray(input) ? input.map(ensureQrl) : [ensureQrl(input)];
  return prop = normalizeOnProp(prop.slice(0, -1)), addQRLListener(listenerMap, prop, qrls), prop;
};
const ensureQrl = (value) => isQrl$1(value) ? value : $(value);
const getDomListeners = (ctx, containerEl) => {
  const attributes = ctx.$element$.attributes;
  const listeners = {};
  for (let i2 = 0; i2 < attributes.length; i2++) {
    const { name, value } = attributes.item(i2);
    if (name.startsWith("on:") || name.startsWith("on-window:") || name.startsWith("on-document:")) {
      let array = listeners[name];
      array || (listeners[name] = array = []);
      const urls = value.split("\n");
      for (const url of urls) {
        const qrl = parseQRL(url, containerEl);
        qrl.$capture$ && inflateQrl(qrl, ctx), array.push(qrl);
      }
    }
  }
  return listeners;
};
const useSequentialScope = () => {
  const ctx = useInvokeContext();
  const i2 = ctx.$seq$;
  const hostElement = ctx.$hostElement$;
  const elCtx = getContext(hostElement);
  const seq = elCtx.$seq$ ? elCtx.$seq$ : elCtx.$seq$ = [];
  return ctx.$seq$++, {
    get: seq[i2],
    set: (value) => seq[i2] = value,
    i: i2,
    ctx
  };
};
const useOn = (event, eventQrl) => _useOn(`on-${event}`, eventQrl);
const _useOn = (eventName, eventQrl) => {
  const invokeCtx = useInvokeContext();
  const ctx = getContext(invokeCtx.$hostElement$);
  addQRLListener(ctx.li, normalizeOnProp(eventName), [eventQrl]);
};
const getDocument = (node) => "undefined" != typeof document ? document : 9 === node.nodeType ? node : node.ownerDocument;
const jsx = (type, props, key) => {
  const processed = null == key ? null : String(key);
  return new JSXNodeImpl(type, props, processed);
};
class JSXNodeImpl {
  constructor(type, props, key = null) {
    this.type = type, this.props = props, this.key = key;
  }
}
const isJSXNode = (n) => n instanceof JSXNodeImpl;
const Fragment = (props) => props.children;
const SkipRender = Symbol("skip render");
const SSRComment = () => null;
const Virtual = (props) => props.children;
const InternalSSRStream = () => null;
const fromCamelToKebabCase = (text) => text.replace(/([A-Z])/g, "-$1").toLowerCase();
const setAttribute = (ctx, el, prop, value) => {
  ctx ? ctx.$operations$.push({
    $operation$: _setAttribute,
    $args$: [el, prop, value]
  }) : _setAttribute(el, prop, value);
};
const _setAttribute = (el, prop, value) => {
  if (null == value || false === value) {
    el.removeAttribute(prop);
  } else {
    const str = true === value ? "" : String(value);
    directSetAttribute(el, prop, str);
  }
};
const setProperty = (ctx, node, key, value) => {
  ctx ? ctx.$operations$.push({
    $operation$: _setProperty,
    $args$: [node, key, value]
  }) : _setProperty(node, key, value);
};
const _setProperty = (node, key, value) => {
  try {
    node[key] = value;
  } catch (err) {
    logError(codeToText(QError_setProperty), {
      node,
      key,
      value
    }, err);
  }
};
const createElement = (doc, expectTag, isSvg) => isSvg ? doc.createElementNS(SVG_NS, expectTag) : doc.createElement(expectTag);
const insertBefore = (ctx, parent, newChild, refChild) => (ctx.$operations$.push({
  $operation$: directInsertBefore,
  $args$: [parent, newChild, refChild || null]
}), newChild);
const appendChild = (ctx, parent, newChild) => (ctx.$operations$.push({
  $operation$: directAppendChild,
  $args$: [parent, newChild]
}), newChild);
const appendHeadStyle = (ctx, styleTask) => {
  ctx.$containerState$.$styleIds$.add(styleTask.styleId), ctx.$postOperations$.push({
    $operation$: _appendHeadStyle,
    $args$: [ctx.$containerState$.$containerEl$, styleTask]
  });
};
const _setClasslist = (elm, toRemove, toAdd) => {
  const classList = elm.classList;
  classList.remove(...toRemove), classList.add(...toAdd);
};
const _appendHeadStyle = (containerEl, styleTask) => {
  const doc = getDocument(containerEl);
  const isDoc = doc.documentElement === containerEl;
  const headEl = doc.head;
  const style = doc.createElement("style");
  directSetAttribute(style, "q:style", styleTask.styleId), style.textContent = styleTask.content, isDoc && headEl ? directAppendChild(headEl, style) : directInsertBefore(containerEl, style, containerEl.firstChild);
};
const removeNode = (ctx, el) => {
  ctx.$operations$.push({
    $operation$: _removeNode,
    $args$: [el, ctx]
  });
};
const _removeNode = (el, staticCtx) => {
  const parent = el.parentElement;
  if (parent) {
    if (1 === el.nodeType || 111 === el.nodeType) {
      const subsManager = staticCtx.$containerState$.$subsManager$;
      cleanupTree(el, staticCtx, subsManager, true);
    }
    directRemoveChild(parent, el);
  }
};
const createTemplate = (doc, slotName) => {
  const template = createElement(doc, "q:template", false);
  return directSetAttribute(template, QSlot, slotName), directSetAttribute(template, "hidden", ""), directSetAttribute(template, "aria-hidden", "true"), template;
};
const executeDOMRender = (ctx) => {
  for (const op of ctx.$operations$) {
    op.$operation$.apply(void 0, op.$args$);
  }
  resolveSlotProjection(ctx);
};
const getKey = (el) => directGetAttribute(el, "q:key");
const setKey = (el, key) => {
  null !== key && directSetAttribute(el, "q:key", key);
};
const resolveSlotProjection = (ctx) => {
  const subsManager = ctx.$containerState$.$subsManager$;
  ctx.$rmSlots$.forEach((slotEl) => {
    const key = getKey(slotEl);
    const slotChildren = getChildren(slotEl, "root");
    if (slotChildren.length > 0) {
      const sref = slotEl.getAttribute("q:sref");
      const hostCtx = ctx.$roots$.find((r2) => r2.$id$ === sref);
      if (hostCtx) {
        const template = createTemplate(ctx.$doc$, key);
        const hostElm = hostCtx.$element$;
        for (const child of slotChildren) {
          directAppendChild(template, child);
        }
        directInsertBefore(hostElm, template, hostElm.firstChild);
      } else {
        cleanupTree(slotEl, ctx, subsManager, false);
      }
    }
  }), ctx.$addSlots$.forEach(([slotEl, hostElm]) => {
    const key = getKey(slotEl);
    const template = Array.from(hostElm.childNodes).find((node) => isSlotTemplate(node) && node.getAttribute(QSlot) === key);
    template && (getChildren(template, "root").forEach((child) => {
      directAppendChild(slotEl, child);
    }), template.remove());
  });
};
class VirtualElementImpl {
  constructor(open, close) {
    this.open = open, this.close = close, this._qc_ = null, this.nodeType = 111, this.localName = ":virtual", this.nodeName = ":virtual";
    const doc = this.ownerDocument = open.ownerDocument;
    this.template = createElement(doc, "template", false), this.attributes = ((str) => {
      if (!str) {
        return /* @__PURE__ */ new Map();
      }
      const attributes = str.split(" ");
      return new Map(attributes.map((attr) => {
        const index2 = attr.indexOf("=");
        return index2 >= 0 ? [attr.slice(0, index2), (s2 = attr.slice(index2 + 1), s2.replace(/\+/g, " "))] : [attr, ""];
        var s2;
      }));
    })(open.data.slice(3)), open.data.startsWith("qv "), open.__virtual = this;
  }
  insertBefore(node, ref) {
    const parent = this.parentElement;
    if (parent) {
      const ref2 = ref || this.close;
      parent.insertBefore(node, ref2);
    } else {
      this.template.insertBefore(node, ref);
    }
    return node;
  }
  remove() {
    const parent = this.parentElement;
    if (parent) {
      const ch = Array.from(this.childNodes);
      this.template.childElementCount, parent.removeChild(this.open), this.template.append(...ch), parent.removeChild(this.close);
    }
  }
  appendChild(node) {
    return this.insertBefore(node, null);
  }
  insertBeforeTo(newParent, child) {
    const ch = Array.from(this.childNodes);
    newParent.insertBefore(this.open, child);
    for (const c of ch) {
      newParent.insertBefore(c, child);
    }
    newParent.insertBefore(this.close, child), this.template.childElementCount;
  }
  appendTo(newParent) {
    this.insertBeforeTo(newParent, null);
  }
  removeChild(child) {
    this.parentElement ? this.parentElement.removeChild(child) : this.template.removeChild(child);
  }
  getAttribute(prop) {
    var _a3;
    return (_a3 = this.attributes.get(prop)) != null ? _a3 : null;
  }
  hasAttribute(prop) {
    return this.attributes.has(prop);
  }
  setAttribute(prop, value) {
    this.attributes.set(prop, value), this.open.data = updateComment(this.attributes);
  }
  removeAttribute(prop) {
    this.attributes.delete(prop), this.open.data = updateComment(this.attributes);
  }
  matches(_) {
    return false;
  }
  compareDocumentPosition(other) {
    return this.open.compareDocumentPosition(other);
  }
  closest(query) {
    const parent = this.parentElement;
    return parent ? parent.closest(query) : null;
  }
  querySelectorAll(query) {
    const result = [];
    return getChildren(this, "elements").forEach((el) => {
      isQwikElement(el) && (el.matches(query) && result.push(el), result.concat(Array.from(el.querySelectorAll(query))));
    }), result;
  }
  querySelector(query) {
    for (const el of this.childNodes) {
      if (isElement(el)) {
        if (el.matches(query)) {
          return el;
        }
        const v = el.querySelector(query);
        if (null !== v) {
          return v;
        }
      }
    }
    return null;
  }
  get firstChild() {
    if (this.parentElement) {
      const first = this.open.nextSibling;
      return first === this.close ? null : first;
    }
    return this.template.firstChild;
  }
  get nextSibling() {
    return this.close.nextSibling;
  }
  get previousSibling() {
    return this.open.previousSibling;
  }
  get childNodes() {
    if (!this.parentElement) {
      return this.template.childNodes;
    }
    const nodes = [];
    let node = this.open;
    for (; (node = node.nextSibling) && node !== this.close; ) {
      nodes.push(node);
    }
    return nodes;
  }
  get isConnected() {
    return this.open.isConnected;
  }
  get parentElement() {
    return this.open.parentElement;
  }
}
const updateComment = (attributes) => `qv ${((map) => {
  const attributes2 = [];
  return map.forEach((value, key) => {
    var s2;
    value ? attributes2.push(`${key}=${s2 = value, s2.replace(/ /g, "+")}`) : attributes2.push(`${key}`);
  }), attributes2.join(" ");
})(attributes)}`;
const processVirtualNodes = (node) => {
  if (null == node) {
    return null;
  }
  if (isComment(node)) {
    const virtual = getVirtualElement(node);
    if (virtual) {
      return virtual;
    }
  }
  return node;
};
const getVirtualElement = (open) => {
  const virtual = open.__virtual;
  if (virtual) {
    return virtual;
  }
  if (open.data.startsWith("qv ")) {
    const close = findClose(open);
    return new VirtualElementImpl(open, close);
  }
  return null;
};
const findClose = (open) => {
  let node = open.nextSibling;
  let stack = 1;
  for (; node; ) {
    if (isComment(node)) {
      if (node.data.startsWith("qv ")) {
        stack++;
      } else if ("/qv" === node.data && (stack--, 0 === stack)) {
        return node;
      }
    }
    node = node.nextSibling;
  }
  throw new Error("close not found");
};
const isComment = (node) => 8 === node.nodeType;
const getRootNode = (node) => null == node ? null : isVirtualElement(node) ? node.open : node;
const createContext$1 = (name) => Object.freeze({
  id: fromCamelToKebabCase(name)
});
const useContextProvider = (context, newValue) => {
  const { get, set, ctx } = useSequentialScope();
  if (void 0 !== get) {
    return;
  }
  const hostElement = ctx.$hostElement$;
  const hostCtx = getContext(hostElement);
  let contexts = hostCtx.$contexts$;
  contexts || (hostCtx.$contexts$ = contexts = /* @__PURE__ */ new Map()), contexts.set(context.id, newValue), set(true);
};
const useContext = (context, defaultValue) => {
  const { get, set, ctx } = useSequentialScope();
  if (void 0 !== get) {
    return get;
  }
  const value = resolveContext(context, ctx.$hostElement$, ctx.$renderCtx$);
  if (void 0 !== value) {
    return set(value);
  }
  if (void 0 !== defaultValue) {
    return set(defaultValue);
  }
  throw qError(QError_notFoundContext, context.id);
};
const resolveContext = (context, hostElement, rctx) => {
  const contextID = context.id;
  if (rctx) {
    const contexts = rctx.$localStack$;
    for (let i2 = contexts.length - 1; i2 >= 0; i2--) {
      const ctx = contexts[i2];
      if (hostElement = ctx.$element$, ctx.$contexts$) {
        const found = ctx.$contexts$.get(contextID);
        if (found) {
          return found;
        }
      }
    }
  }
  if (hostElement.closest) {
    const value = queryContextFromDom(hostElement, contextID);
    if (void 0 !== value) {
      return value;
    }
  }
};
const queryContextFromDom = (hostElement, contextId) => {
  var _a3;
  let element = hostElement;
  for (; element; ) {
    let node = element;
    let virtual;
    for (; node && (virtual = findVirtual(node)); ) {
      const contexts = (_a3 = tryGetContext(virtual)) == null ? void 0 : _a3.$contexts$;
      if (contexts && contexts.has(contextId)) {
        return contexts.get(contextId);
      }
      node = virtual;
    }
    element = element.parentElement;
  }
};
const findVirtual = (el) => {
  let node = el;
  let stack = 1;
  for (; node = node.previousSibling; ) {
    if (isComment(node)) {
      if ("/qv" === node.data) {
        stack++;
      } else if (node.data.startsWith("qv ") && (stack--, 0 === stack)) {
        return getVirtualElement(node);
      }
    }
  }
  return null;
};
const ERROR_CONTEXT = createContext$1("qk-error");
const handleError = (err, hostElement, rctx) => {
  if (isServer$1()) {
    throw err;
  }
  {
    const errorStore = resolveContext(ERROR_CONTEXT, hostElement, rctx);
    if (void 0 === errorStore) {
      throw err;
    }
    errorStore.error = err;
  }
};
const executeComponent = (rctx, elCtx) => {
  elCtx.$dirty$ = false, elCtx.$mounted$ = true, elCtx.$slots$ = [];
  const hostElement = elCtx.$element$;
  const onRenderQRL = elCtx.$renderQrl$;
  const props = elCtx.$props$;
  const newCtx = pushRenderContext(rctx, elCtx);
  const invocatinContext = newInvokeContext(hostElement, void 0, "qRender");
  const waitOn = invocatinContext.$waitOn$ = [];
  newCtx.$cmpCtx$ = elCtx, invocatinContext.$subscriber$ = hostElement, invocatinContext.$renderCtx$ = rctx, onRenderQRL.$setContainer$(rctx.$static$.$containerState$.$containerEl$);
  const onRenderFn = onRenderQRL.getFn(invocatinContext);
  return safeCall(() => onRenderFn(props), (jsxNode) => (elCtx.$attachedListeners$ = false, waitOn.length > 0 ? Promise.all(waitOn).then(() => elCtx.$dirty$ ? executeComponent(rctx, elCtx) : {
    node: jsxNode,
    rctx: newCtx
  }) : elCtx.$dirty$ ? executeComponent(rctx, elCtx) : {
    node: jsxNode,
    rctx: newCtx
  }), (err) => (handleError(err, hostElement, rctx), {
    node: SkipRender,
    rctx: newCtx
  }));
};
const createRenderContext = (doc, containerState) => ({
  $static$: {
    $doc$: doc,
    $containerState$: containerState,
    $hostElements$: /* @__PURE__ */ new Set(),
    $operations$: [],
    $postOperations$: [],
    $roots$: [],
    $addSlots$: [],
    $rmSlots$: []
  },
  $cmpCtx$: void 0,
  $localStack$: []
});
const pushRenderContext = (ctx, elCtx) => ({
  $static$: ctx.$static$,
  $cmpCtx$: ctx.$cmpCtx$,
  $localStack$: ctx.$localStack$.concat(elCtx)
});
const serializeClass = (obj) => {
  if (isString(obj)) {
    return obj;
  }
  if (isObject(obj)) {
    if (isArray(obj)) {
      return obj.join(" ");
    }
    {
      let buffer = "";
      let previous = false;
      for (const key of Object.keys(obj)) {
        obj[key] && (previous && (buffer += " "), buffer += key, previous = true);
      }
      return buffer;
    }
  }
  return "";
};
const parseClassListRegex = /\s/;
const parseClassList = (value) => value ? value.split(parseClassListRegex) : EMPTY_ARRAY$1;
const stringifyStyle = (obj) => {
  if (null == obj) {
    return "";
  }
  if ("object" == typeof obj) {
    if (isArray(obj)) {
      throw qError(QError_stringifyClassOrStyle, obj, "style");
    }
    {
      const chunks = [];
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          value && chunks.push(fromCamelToKebabCase(key) + ":" + value);
        }
      }
      return chunks.join(";");
    }
  }
  return String(obj);
};
const getNextIndex = (ctx) => intToStr(ctx.$static$.$containerState$.$elementIndex$++);
const setQId = (rctx, ctx) => {
  const id = getNextIndex(rctx);
  ctx.$id$ = id, ctx.$element$.setAttribute("q:id", id);
};
const SKIPS_PROPS = [QSlot, "q:renderFn", "children"];
const serializeSStyle = (scopeIds) => {
  const value = scopeIds.join(" ");
  if (value.length > 0) {
    return value;
  }
};
const renderComponent = (rctx, ctx, flags) => {
  const justMounted = !ctx.$mounted$;
  const hostElement = ctx.$element$;
  const containerState = rctx.$static$.$containerState$;
  return containerState.$hostsStaging$.delete(hostElement), containerState.$subsManager$.$clearSub$(hostElement), then(executeComponent(rctx, ctx), (res) => {
    const staticCtx = rctx.$static$;
    const newCtx = res.rctx;
    const invocatinContext = newInvokeContext(hostElement);
    if (staticCtx.$hostElements$.add(hostElement), invocatinContext.$subscriber$ = hostElement, invocatinContext.$renderCtx$ = newCtx, justMounted) {
      if (ctx.$appendStyles$) {
        for (const style of ctx.$appendStyles$) {
          appendHeadStyle(staticCtx, style);
        }
      }
      if (ctx.$scopeIds$) {
        const value = serializeSStyle(ctx.$scopeIds$);
        value && hostElement.setAttribute("q:sstyle", value);
      }
    }
    const processedJSXNode = processData$1(res.node, invocatinContext);
    return then(processedJSXNode, (processedJSXNode2) => {
      const newVdom = wrapJSX(hostElement, processedJSXNode2);
      const oldVdom = getVdom(ctx);
      return then(visitJsxNode(newCtx, oldVdom, newVdom, flags), () => {
        ctx.$vdom$ = newVdom;
      });
    });
  });
};
const getVdom = (ctx) => (ctx.$vdom$ || (ctx.$vdom$ = domToVnode(ctx.$element$)), ctx.$vdom$);
class ProcessedJSXNodeImpl {
  constructor($type$, $props$, $children$, $key$) {
    this.$type$ = $type$, this.$props$ = $props$, this.$children$ = $children$, this.$key$ = $key$, this.$elm$ = null, this.$text$ = "";
  }
}
const wrapJSX = (element, input) => {
  const children = void 0 === input ? EMPTY_ARRAY$1 : isArray(input) ? input : [input];
  const node = new ProcessedJSXNodeImpl(":virtual", {}, children, null);
  return node.$elm$ = element, node;
};
const processData$1 = (node, invocationContext) => {
  if (null != node && "boolean" != typeof node) {
    if (isString(node) || "number" == typeof node) {
      const newNode = new ProcessedJSXNodeImpl("#text", EMPTY_OBJ$1, EMPTY_ARRAY$1, null);
      return newNode.$text$ = String(node), newNode;
    }
    if (isJSXNode(node)) {
      return ((node2, invocationContext2) => {
        const key = null != node2.key ? String(node2.key) : null;
        const nodeType = node2.type;
        const props = node2.props;
        const originalChildren = props.children;
        let textType = "";
        if (isString(nodeType)) {
          textType = nodeType;
        } else {
          if (nodeType !== Virtual) {
            if (isFunction(nodeType)) {
              const res = invoke(invocationContext2, nodeType, props, node2.key);
              return processData$1(res, invocationContext2);
            }
            throw qError(QError_invalidJsxNodeType, nodeType);
          }
          textType = ":virtual";
        }
        let children = EMPTY_ARRAY$1;
        return null != originalChildren ? then(processData$1(originalChildren, invocationContext2), (result) => (void 0 !== result && (children = isArray(result) ? result : [result]), new ProcessedJSXNodeImpl(textType, props, children, key))) : new ProcessedJSXNodeImpl(textType, props, children, key);
      })(node, invocationContext);
    }
    if (isArray(node)) {
      const output = promiseAll(node.flatMap((n) => processData$1(n, invocationContext)));
      return then(output, (array) => array.flat(100).filter(isNotNullable));
    }
    return isPromise(node) ? node.then((node2) => processData$1(node2, invocationContext)) : node === SkipRender ? new ProcessedJSXNodeImpl(":skipRender", EMPTY_OBJ$1, EMPTY_ARRAY$1, null) : void logWarn("A unsupported value was passed to the JSX, skipping render. Value:", node);
  }
};
const SVG_NS = "http://www.w3.org/2000/svg";
const CHILDREN_PLACEHOLDER = [];
const visitJsxNode = (ctx, oldVnode, newVnode, flags) => smartUpdateChildren(ctx, oldVnode, newVnode, "root", flags);
const smartUpdateChildren = (ctx, oldVnode, newVnode, mode, flags) => {
  oldVnode.$elm$;
  const ch = newVnode.$children$;
  if (1 === ch.length && ":skipRender" === ch[0].$type$) {
    return;
  }
  const elm = oldVnode.$elm$;
  oldVnode.$children$ === CHILDREN_PLACEHOLDER && "HEAD" === elm.nodeName && (mode = "head", flags |= 2);
  const oldCh = getVnodeChildren(oldVnode, mode);
  return oldCh.length > 0 && ch.length > 0 ? updateChildren(ctx, elm, oldCh, ch, flags) : ch.length > 0 ? addVnodes(ctx, elm, null, ch, 0, ch.length - 1, flags) : oldCh.length > 0 ? removeVnodes(ctx.$static$, oldCh, 0, oldCh.length - 1) : void 0;
};
const getVnodeChildren = (vnode, mode) => {
  const oldCh = vnode.$children$;
  const elm = vnode.$elm$;
  return oldCh === CHILDREN_PLACEHOLDER ? vnode.$children$ = getChildrenVnodes(elm, mode) : oldCh;
};
const updateChildren = (ctx, parentElm, oldCh, newCh, flags) => {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx;
  let idxInOld;
  let elmToMove;
  const results = [];
  const staticCtx = ctx.$static$;
  for (; oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx; ) {
    if (null == oldStartVnode) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (null == oldEndVnode) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (null == newStartVnode) {
      newStartVnode = newCh[++newStartIdx];
    } else if (null == newEndVnode) {
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      results.push(patchVnode(ctx, oldStartVnode, newStartVnode, flags)), oldStartVnode = oldCh[++oldStartIdx], newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      results.push(patchVnode(ctx, oldEndVnode, newEndVnode, flags)), oldEndVnode = oldCh[--oldEndIdx], newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      oldStartVnode.$elm$, oldEndVnode.$elm$, results.push(patchVnode(ctx, oldStartVnode, newEndVnode, flags)), insertBefore(staticCtx, parentElm, oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling), oldStartVnode = oldCh[++oldStartIdx], newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      oldStartVnode.$elm$, oldEndVnode.$elm$, results.push(patchVnode(ctx, oldEndVnode, newStartVnode, flags)), insertBefore(staticCtx, parentElm, oldEndVnode.$elm$, oldStartVnode.$elm$), oldEndVnode = oldCh[--oldEndIdx], newStartVnode = newCh[++newStartIdx];
    } else {
      if (void 0 === oldKeyToIdx && (oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)), idxInOld = oldKeyToIdx[newStartVnode.$key$], void 0 === idxInOld) {
        const newElm = createElm(ctx, newStartVnode, flags);
        results.push(then(newElm, (newElm2) => {
          insertBefore(staticCtx, parentElm, newElm2, oldStartVnode.$elm$);
        }));
      } else if (elmToMove = oldCh[idxInOld], isTagName(elmToMove, newStartVnode.$type$)) {
        results.push(patchVnode(ctx, elmToMove, newStartVnode, flags)), oldCh[idxInOld] = void 0, elmToMove.$elm$, insertBefore(staticCtx, parentElm, elmToMove.$elm$, oldStartVnode.$elm$);
      } else {
        const newElm = createElm(ctx, newStartVnode, flags);
        results.push(then(newElm, (newElm2) => {
          insertBefore(staticCtx, parentElm, newElm2, oldStartVnode.$elm$);
        }));
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }
  if (newStartIdx <= newEndIdx) {
    const before = null == newCh[newEndIdx + 1] ? null : newCh[newEndIdx + 1].$elm$;
    results.push(addVnodes(ctx, parentElm, before, newCh, newStartIdx, newEndIdx, flags));
  }
  let wait = promiseAll(results);
  return oldStartIdx <= oldEndIdx && (wait = then(wait, () => {
    removeVnodes(staticCtx, oldCh, oldStartIdx, oldEndIdx);
  })), wait;
};
const getCh = (elm, filter) => {
  const end = isVirtualElement(elm) ? elm.close : null;
  const nodes = [];
  let node = elm.firstChild;
  for (; (node = processVirtualNodes(node)) && (filter(node) && nodes.push(node), node = node.nextSibling, node !== end); ) {
  }
  return nodes;
};
const getChildren = (elm, mode) => {
  switch (mode) {
    case "root":
      return getCh(elm, isChildComponent);
    case "head":
      return getCh(elm, isHeadChildren);
    case "elements":
      return getCh(elm, isQwikElement);
  }
};
const getChildrenVnodes = (elm, mode) => getChildren(elm, mode).map(getVnodeFromEl);
const getVnodeFromEl = (el) => {
  var _a3, _b2;
  return isElement(el) ? (_b2 = (_a3 = tryGetContext(el)) == null ? void 0 : _a3.$vdom$) != null ? _b2 : domToVnode(el) : domToVnode(el);
};
const domToVnode = (node) => {
  if (isQwikElement(node)) {
    const props = isVirtualElement(node) ? EMPTY_OBJ$1 : getProps(node);
    const t2 = new ProcessedJSXNodeImpl(node.localName, props, CHILDREN_PLACEHOLDER, getKey(node));
    return t2.$elm$ = node, t2;
  }
  if (3 === node.nodeType) {
    const t2 = new ProcessedJSXNodeImpl(node.nodeName, {}, CHILDREN_PLACEHOLDER, null);
    return t2.$text$ = node.data, t2.$elm$ = node, t2;
  }
  throw new Error("invalid node");
};
const getProps = (node) => {
  const props = {};
  const attributes = node.attributes;
  const len = attributes.length;
  for (let i2 = 0; i2 < len; i2++) {
    const attr = attributes.item(i2);
    const name = attr.name;
    name.includes(":") || (props[name] = "class" === name ? parseDomClass(attr.value) : attr.value);
  }
  return props;
};
const parseDomClass = (value) => parseClassList(value).filter((c) => !c.startsWith("\u2B50\uFE0F")).join(" ");
const isHeadChildren = (node) => {
  const type = node.nodeType;
  return 1 === type ? node.hasAttribute("q:head") : 111 === type;
};
const isSlotTemplate = (node) => "Q:TEMPLATE" === node.nodeName;
const isChildComponent = (node) => {
  const type = node.nodeType;
  if (3 === type || 111 === type) {
    return true;
  }
  if (1 !== type) {
    return false;
  }
  const nodeName = node.nodeName;
  return "Q:TEMPLATE" !== nodeName && ("HEAD" !== nodeName || node.hasAttribute("q:head"));
};
const patchVnode = (rctx, oldVnode, newVnode, flags) => {
  oldVnode.$type$, newVnode.$type$;
  const elm = oldVnode.$elm$;
  const tag = newVnode.$type$;
  const staticCtx = rctx.$static$;
  const isVirtual = ":virtual" === tag;
  if (newVnode.$elm$ = elm, "#text" === tag) {
    return void (oldVnode.$text$ !== newVnode.$text$ && setProperty(staticCtx, elm, "data", newVnode.$text$));
  }
  let isSvg = !!(1 & flags);
  isSvg || "svg" !== tag || (flags |= 1, isSvg = true);
  const props = newVnode.$props$;
  const isComponent = isVirtual && "q:renderFn" in props;
  const elCtx = getContext(elm);
  if (!isComponent) {
    const listenerMap = updateProperties(elCtx, staticCtx, oldVnode.$props$, props, isSvg);
    const currentComponent = rctx.$cmpCtx$;
    if (currentComponent && !currentComponent.$attachedListeners$) {
      currentComponent.$attachedListeners$ = true;
      for (const key of Object.keys(currentComponent.li)) {
        addQRLListener(listenerMap, key, currentComponent.li[key]), addGlobalListener(staticCtx, elm, key);
      }
    }
    for (const key of Object.keys(listenerMap)) {
      setAttribute(staticCtx, elm, key, serializeQRLs(listenerMap[key], elCtx));
    }
    if (isSvg && "foreignObject" === newVnode.$type$ && (flags &= -2, isSvg = false), isVirtual && "q:s" in props) {
      const currentComponent2 = rctx.$cmpCtx$;
      return currentComponent2.$slots$, void currentComponent2.$slots$.push(newVnode);
    }
    if (void 0 !== props[dangerouslySetInnerHTML]) {
      return;
    }
    if (isVirtual && "qonce" in props) {
      return;
    }
    return smartUpdateChildren(rctx, oldVnode, newVnode, "root", flags);
  }
  let needsRender = setComponentProps$1(elCtx, rctx, props);
  return needsRender || elCtx.$renderQrl$ || elCtx.$element$.hasAttribute("q:id") || (setQId(rctx, elCtx), elCtx.$renderQrl$ = props["q:renderFn"], elCtx.$renderQrl$, needsRender = true), needsRender ? then(renderComponent(rctx, elCtx, flags), () => renderContentProjection(rctx, elCtx, newVnode, flags)) : renderContentProjection(rctx, elCtx, newVnode, flags);
};
const renderContentProjection = (rctx, hostCtx, vnode, flags) => {
  const newChildren = vnode.$children$;
  const staticCtx = rctx.$static$;
  const splittedNewChidren = ((input) => {
    var _a3;
    const output = {};
    for (const item of input) {
      const key = getSlotName(item);
      ((_a3 = output[key]) != null ? _a3 : output[key] = new ProcessedJSXNodeImpl(":virtual", {
        "q:s": ""
      }, [], key)).$children$.push(item);
    }
    return output;
  })(newChildren);
  const slotRctx = pushRenderContext(rctx, hostCtx);
  const slotMaps = getSlotMap(hostCtx);
  for (const key of Object.keys(slotMaps.slots)) {
    if (!splittedNewChidren[key]) {
      const slotEl = slotMaps.slots[key];
      const oldCh = getChildrenVnodes(slotEl, "root");
      if (oldCh.length > 0) {
        const slotCtx = tryGetContext(slotEl);
        slotCtx && slotCtx.$vdom$ && (slotCtx.$vdom$.$children$ = []), removeVnodes(staticCtx, oldCh, 0, oldCh.length - 1);
      }
    }
  }
  for (const key of Object.keys(slotMaps.templates)) {
    const templateEl = slotMaps.templates[key];
    templateEl && (splittedNewChidren[key] && !slotMaps.slots[key] || (removeNode(staticCtx, templateEl), slotMaps.templates[key] = void 0));
  }
  return promiseAll(Object.keys(splittedNewChidren).map((key) => {
    const newVdom = splittedNewChidren[key];
    const slotElm = getSlotElement(staticCtx, slotMaps, hostCtx.$element$, key);
    const slotCtx = getContext(slotElm);
    const oldVdom = getVdom(slotCtx);
    return slotCtx.$vdom$ = newVdom, newVdom.$elm$ = slotElm, smartUpdateChildren(slotRctx, oldVdom, newVdom, "root", flags);
  }));
};
const addVnodes = (ctx, parentElm, before, vnodes, startIdx, endIdx, flags) => {
  const promises = [];
  let hasPromise = false;
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx];
    const elm = createElm(ctx, ch, flags);
    promises.push(elm), isPromise(elm) && (hasPromise = true);
  }
  if (hasPromise) {
    return Promise.all(promises).then((children) => insertChildren(ctx.$static$, parentElm, children, before));
  }
  insertChildren(ctx.$static$, parentElm, promises, before);
};
const insertChildren = (ctx, parentElm, children, before) => {
  for (const child of children) {
    insertBefore(ctx, parentElm, child, before);
  }
};
const removeVnodes = (ctx, nodes, startIdx, endIdx) => {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = nodes[startIdx];
    ch && (ch.$elm$, removeNode(ctx, ch.$elm$));
  }
};
const getSlotElement = (ctx, slotMaps, parentEl, slotName) => {
  const slotEl = slotMaps.slots[slotName];
  if (slotEl) {
    return slotEl;
  }
  const templateEl = slotMaps.templates[slotName];
  if (templateEl) {
    return templateEl;
  }
  const template = createTemplate(ctx.$doc$, slotName);
  return ((ctx2, parent, newChild) => {
    ctx2.$operations$.push({
      $operation$: directInsertBefore,
      $args$: [parent, newChild, parent.firstChild]
    });
  })(ctx, parentEl, template), slotMaps.templates[slotName] = template, template;
};
const getSlotName = (node) => {
  var _a3;
  return (_a3 = node.$props$[QSlot]) != null ? _a3 : "";
};
const createElm = (rctx, vnode, flags) => {
  const tag = vnode.$type$;
  const doc = rctx.$static$.$doc$;
  if ("#text" === tag) {
    return vnode.$elm$ = ((doc2, text) => doc2.createTextNode(text))(doc, vnode.$text$);
  }
  let elm;
  let isHead = !!(2 & flags);
  let isSvg = !!(1 & flags);
  isSvg || "svg" !== tag || (flags |= 1, isSvg = true);
  const isVirtual = ":virtual" === tag;
  const props = vnode.$props$;
  const isComponent = "q:renderFn" in props;
  const staticCtx = rctx.$static$;
  isVirtual ? elm = ((doc2) => {
    const open = doc2.createComment("qv ");
    const close = doc2.createComment("/qv");
    return new VirtualElementImpl(open, close);
  })(doc) : "head" === tag ? (elm = doc.head, flags |= 2, isHead = true) : (elm = createElement(doc, tag, isSvg), flags &= -3), vnode.$elm$ = elm, isSvg && "foreignObject" === tag && (isSvg = false, flags &= -2);
  const elCtx = getContext(elm);
  if (isComponent) {
    setKey(elm, vnode.$key$);
    const renderQRL = props["q:renderFn"];
    return setComponentProps$1(elCtx, rctx, props), setQId(rctx, elCtx), elCtx.$renderQrl$ = renderQRL, then(renderComponent(rctx, elCtx, flags), () => {
      let children2 = vnode.$children$;
      if (0 === children2.length) {
        return elm;
      }
      1 === children2.length && ":skipRender" === children2[0].$type$ && (children2 = children2[0].$children$);
      const slotRctx = pushRenderContext(rctx, elCtx);
      const slotMap = getSlotMap(elCtx);
      const elements = children2.map((ch) => createElm(slotRctx, ch, flags));
      return then(promiseAll(elements), () => {
        for (const node of children2) {
          node.$elm$, appendChild(staticCtx, getSlotElement(staticCtx, slotMap, elm, getSlotName(node)), node.$elm$);
        }
        return elm;
      });
    });
  }
  const currentComponent = rctx.$cmpCtx$;
  const isSlot = isVirtual && "q:s" in props;
  const hasRef = !isVirtual && "ref" in props;
  const listenerMap = setProperties(staticCtx, elCtx, props, isSvg);
  if (currentComponent && !isVirtual) {
    const scopedIds = currentComponent.$scopeIds$;
    if (scopedIds && scopedIds.forEach((styleId) => {
      elm.classList.add(styleId);
    }), !currentComponent.$attachedListeners$) {
      currentComponent.$attachedListeners$ = true;
      for (const eventName of Object.keys(currentComponent.li)) {
        addQRLListener(listenerMap, eventName, currentComponent.li[eventName]);
      }
    }
  }
  isSlot ? (currentComponent.$slots$, setKey(elm, vnode.$key$), directSetAttribute(elm, "q:sref", currentComponent.$id$), currentComponent.$slots$.push(vnode), staticCtx.$addSlots$.push([elm, currentComponent.$element$])) : setKey(elm, vnode.$key$);
  {
    const listeners = Object.keys(listenerMap);
    isHead && !isVirtual && directSetAttribute(elm, "q:head", ""), (listeners.length > 0 || hasRef) && setQId(rctx, elCtx);
    for (const key of listeners) {
      setAttribute(staticCtx, elm, key, serializeQRLs(listenerMap[key], elCtx));
    }
  }
  if (void 0 !== props[dangerouslySetInnerHTML]) {
    return elm;
  }
  let children = vnode.$children$;
  if (0 === children.length) {
    return elm;
  }
  1 === children.length && ":skipRender" === children[0].$type$ && (children = children[0].$children$);
  const promises = children.map((ch) => createElm(rctx, ch, flags));
  return then(promiseAll(promises), () => {
    for (const node of children) {
      node.$elm$, appendChild(rctx.$static$, elm, node.$elm$);
    }
    return elm;
  });
};
const getSlotMap = (ctx) => {
  var _a3, _b2;
  const slotsArray = ((ctx2) => ctx2.$slots$ || (ctx2.$element$.parentElement, ctx2.$slots$ = readDOMSlots(ctx2)))(ctx);
  const slots = {};
  const templates = {};
  const t2 = Array.from(ctx.$element$.childNodes).filter(isSlotTemplate);
  for (const vnode of slotsArray) {
    vnode.$elm$, slots[(_a3 = vnode.$key$) != null ? _a3 : ""] = vnode.$elm$;
  }
  for (const elm of t2) {
    templates[(_b2 = directGetAttribute(elm, QSlot)) != null ? _b2 : ""] = elm;
  }
  return {
    slots,
    templates
  };
};
const readDOMSlots = (ctx) => ((el, prop, value) => {
  const walker = ((el2, prop2, value2) => el2.ownerDocument.createTreeWalker(el2, 128, {
    acceptNode(c) {
      const virtual = getVirtualElement(c);
      return virtual && directGetAttribute(virtual, "q:sref") === value2 ? 1 : 2;
    }
  }))(el, 0, value);
  const pars = [];
  let currentNode = null;
  for (; currentNode = walker.nextNode(); ) {
    pars.push(getVirtualElement(currentNode));
  }
  return pars;
})(ctx.$element$.parentElement, 0, ctx.$id$).map(domToVnode);
const checkBeforeAssign = (ctx, elm, prop, newValue) => (prop in elm && elm[prop] !== newValue && setProperty(ctx, elm, prop, newValue), true);
const dangerouslySetInnerHTML = "dangerouslySetInnerHTML";
const PROP_HANDLER_MAP = {
  style: (ctx, elm, _, newValue) => (setProperty(ctx, elm.style, "cssText", stringifyStyle(newValue)), true),
  class: (ctx, elm, _, newValue, oldValue) => {
    const oldClasses = parseClassList(oldValue);
    const newClasses = parseClassList(newValue);
    return ((ctx2, elm2, toRemove, toAdd) => {
      ctx2 ? ctx2.$operations$.push({
        $operation$: _setClasslist,
        $args$: [elm2, toRemove, toAdd]
      }) : _setClasslist(elm2, toRemove, toAdd);
    })(ctx, elm, oldClasses.filter((c) => c && !newClasses.includes(c)), newClasses.filter((c) => c && !oldClasses.includes(c))), true;
  },
  value: checkBeforeAssign,
  checked: checkBeforeAssign,
  [dangerouslySetInnerHTML]: (ctx, elm, _, newValue) => (dangerouslySetInnerHTML in elm ? setProperty(ctx, elm, dangerouslySetInnerHTML, newValue) : "innerHTML" in elm && setProperty(ctx, elm, "innerHTML", newValue), true),
  innerHTML: () => true
};
const updateProperties = (elCtx, staticCtx, oldProps, newProps, isSvg) => {
  const keys = getKeys(oldProps, newProps);
  const listenersMap = elCtx.li = {};
  if (0 === keys.length) {
    return listenersMap;
  }
  const elm = elCtx.$element$;
  for (let key of keys) {
    if ("children" === key) {
      continue;
    }
    let newValue = newProps[key];
    "className" === key && (newProps.class = newValue, key = "class"), "class" === key && (newProps.class = newValue = serializeClass(newValue));
    const oldValue = oldProps[key];
    if (oldValue === newValue) {
      continue;
    }
    if ("ref" === key) {
      newValue.current = elm;
      continue;
    }
    if (isOnProp(key)) {
      setEvent(listenersMap, key, newValue);
      continue;
    }
    const exception = PROP_HANDLER_MAP[key];
    exception && exception(staticCtx, elm, key, newValue, oldValue) || (isSvg || !(key in elm) ? setAttribute(staticCtx, elm, key, newValue) : setProperty(staticCtx, elm, key, newValue));
  }
  return listenersMap;
};
const getKeys = (oldProps, newProps) => {
  const keys = Object.keys(newProps);
  return keys.push(...Object.keys(oldProps).filter((p) => !keys.includes(p))), keys;
};
const addGlobalListener = (staticCtx, elm, prop) => {
  try {
    window.qwikevents && window.qwikevents.push(getEventName(prop));
  } catch (err) {
  }
};
const setProperties = (rctx, elCtx, newProps, isSvg) => {
  const elm = elCtx.$element$;
  const keys = Object.keys(newProps);
  const listenerMap = elCtx.li;
  if (0 === keys.length) {
    return listenerMap;
  }
  for (let key of keys) {
    if ("children" === key) {
      continue;
    }
    let newValue = newProps[key];
    if ("className" === key && (newProps.class = newValue, key = "class"), "class" === key && (newProps.class = newValue = serializeClass(newValue)), "ref" === key) {
      newValue.current = elm;
      continue;
    }
    if (isOnProp(key)) {
      addGlobalListener(rctx, elm, setEvent(listenerMap, key, newValue));
      continue;
    }
    const exception = PROP_HANDLER_MAP[key];
    exception && exception(rctx, elm, key, newValue, void 0) || (isSvg || !(key in elm) ? setAttribute(rctx, elm, key, newValue) : setProperty(rctx, elm, key, newValue));
  }
  return listenerMap;
};
const setComponentProps$1 = (ctx, rctx, expectProps) => {
  const keys = Object.keys(expectProps);
  if (0 === keys.length) {
    return false;
  }
  const qwikProps = getPropsMutator(ctx, rctx.$static$.$containerState$);
  for (const key of keys) {
    SKIPS_PROPS.includes(key) || qwikProps.set(key, expectProps[key]);
  }
  return ctx.$dirty$;
};
const cleanupTree = (parent, rctx, subsManager, stopSlots) => {
  if (stopSlots && parent.hasAttribute("q:s")) {
    return void rctx.$rmSlots$.push(parent);
  }
  cleanupElement(parent, subsManager);
  const ch = getChildren(parent, "elements");
  for (const child of ch) {
    cleanupTree(child, rctx, subsManager, stopSlots);
  }
};
const cleanupElement = (el, subsManager) => {
  const ctx = tryGetContext(el);
  ctx && cleanupContext(ctx, subsManager);
};
const directAppendChild = (parent, child) => {
  isVirtualElement(child) ? child.appendTo(parent) : parent.appendChild(child);
};
const directRemoveChild = (parent, child) => {
  isVirtualElement(child) ? child.remove() : parent.removeChild(child);
};
const directInsertBefore = (parent, child, ref) => {
  isVirtualElement(child) ? child.insertBeforeTo(parent, getRootNode(ref)) : parent.insertBefore(child, getRootNode(ref));
};
const createKeyToOldIdx = (children, beginIdx, endIdx) => {
  const map = {};
  for (let i2 = beginIdx; i2 <= endIdx; ++i2) {
    const key = children[i2].$key$;
    null != key && (map[key] = i2);
  }
  return map;
};
const sameVnode = (vnode1, vnode2) => vnode1.$type$ === vnode2.$type$ && vnode1.$key$ === vnode2.$key$;
const isTagName = (elm, tagName) => elm.$type$ === tagName;
const useLexicalScope = () => {
  const context = getInvokeContext();
  let qrl = context.$qrl$;
  if (qrl) {
    qrl.$captureRef$;
  } else {
    const el = context.$element$;
    const container = getWrappingContainer(el);
    const ctx = getContext(el);
    qrl = parseQRL(decodeURIComponent(String(context.$url$)), container), resumeIfNeeded(container), inflateQrl(qrl, ctx);
  }
  return qrl.$captureRef$;
};
const notifyWatch = (watch, containerState) => {
  watch.$flags$ & WatchFlagsIsDirty || (watch.$flags$ |= WatchFlagsIsDirty, void 0 !== containerState.$hostsRendering$ ? (containerState.$renderPromise$, containerState.$watchStaging$.add(watch)) : (containerState.$watchNext$.add(watch), scheduleFrame(containerState)));
};
const scheduleFrame = (containerState) => (void 0 === containerState.$renderPromise$ && (containerState.$renderPromise$ = getPlatform().nextTick(() => renderMarked(containerState))), containerState.$renderPromise$);
const _hW = () => {
  const [watch] = useLexicalScope();
  notifyWatch(watch, getContainerState(getWrappingContainer(watch.$el$)));
};
const renderMarked = async (containerState) => {
  const hostsRendering = containerState.$hostsRendering$ = new Set(containerState.$hostsNext$);
  containerState.$hostsNext$.clear(), await executeWatchesBefore(containerState), containerState.$hostsStaging$.forEach((host) => {
    hostsRendering.add(host);
  }), containerState.$hostsStaging$.clear();
  const doc = getDocument(containerState.$containerEl$);
  const renderingQueue = Array.from(hostsRendering);
  sortNodes(renderingQueue);
  const ctx = createRenderContext(doc, containerState);
  const staticCtx = ctx.$static$;
  for (const el of renderingQueue) {
    if (!staticCtx.$hostElements$.has(el)) {
      const elCtx = getContext(el);
      if (elCtx.$renderQrl$) {
        el.isConnected, staticCtx.$roots$.push(elCtx);
        try {
          await renderComponent(ctx, elCtx, getFlags(el.parentElement));
        } catch (err) {
          logError(err);
        }
      }
    }
  }
  return staticCtx.$operations$.push(...staticCtx.$postOperations$), 0 === staticCtx.$operations$.length ? void postRendering(containerState, staticCtx) : getPlatform().raf(() => {
    (({ $static$: ctx2 }) => {
      executeDOMRender(ctx2);
    })(ctx), postRendering(containerState, staticCtx);
  });
};
const getFlags = (el) => {
  let flags = 0;
  return el && (el.namespaceURI === SVG_NS && (flags |= 1), "HEAD" === el.tagName && (flags |= 2)), flags;
};
const postRendering = async (containerState, ctx) => {
  await executeWatchesAfter(containerState, (watch, stage) => 0 != (watch.$flags$ & WatchFlagsIsEffect) && (!stage || ctx.$hostElements$.has(watch.$el$))), containerState.$hostsStaging$.forEach((el) => {
    containerState.$hostsNext$.add(el);
  }), containerState.$hostsStaging$.clear(), containerState.$hostsRendering$ = void 0, containerState.$renderPromise$ = void 0, containerState.$hostsNext$.size + containerState.$watchNext$.size > 0 && scheduleFrame(containerState);
};
const executeWatchesBefore = async (containerState) => {
  const resourcesPromises = [];
  const containerEl = containerState.$containerEl$;
  const watchPromises = [];
  const isWatch = (watch) => 0 != (watch.$flags$ & WatchFlagsIsWatch);
  const isResourceWatch2 = (watch) => 0 != (watch.$flags$ & WatchFlagsIsResource);
  containerState.$watchNext$.forEach((watch) => {
    isWatch(watch) && (watchPromises.push(then(watch.$qrl$.$resolveLazy$(containerEl), () => watch)), containerState.$watchNext$.delete(watch)), isResourceWatch2(watch) && (resourcesPromises.push(then(watch.$qrl$.$resolveLazy$(containerEl), () => watch)), containerState.$watchNext$.delete(watch));
  });
  do {
    if (containerState.$watchStaging$.forEach((watch) => {
      isWatch(watch) ? watchPromises.push(then(watch.$qrl$.$resolveLazy$(containerEl), () => watch)) : isResourceWatch2(watch) ? resourcesPromises.push(then(watch.$qrl$.$resolveLazy$(containerEl), () => watch)) : containerState.$watchNext$.add(watch);
    }), containerState.$watchStaging$.clear(), watchPromises.length > 0) {
      const watches = await Promise.all(watchPromises);
      sortWatches(watches), await Promise.all(watches.map((watch) => runSubscriber(watch, containerState))), watchPromises.length = 0;
    }
  } while (containerState.$watchStaging$.size > 0);
  if (resourcesPromises.length > 0) {
    const resources = await Promise.all(resourcesPromises);
    sortWatches(resources), resources.forEach((watch) => runSubscriber(watch, containerState));
  }
};
const executeWatchesAfter = async (containerState, watchPred) => {
  const watchPromises = [];
  const containerEl = containerState.$containerEl$;
  containerState.$watchNext$.forEach((watch) => {
    watchPred(watch, false) && (watchPromises.push(then(watch.$qrl$.$resolveLazy$(containerEl), () => watch)), containerState.$watchNext$.delete(watch));
  });
  do {
    if (containerState.$watchStaging$.forEach((watch) => {
      watchPred(watch, true) ? watchPromises.push(then(watch.$qrl$.$resolveLazy$(containerEl), () => watch)) : containerState.$watchNext$.add(watch);
    }), containerState.$watchStaging$.clear(), watchPromises.length > 0) {
      const watches = await Promise.all(watchPromises);
      sortWatches(watches), await Promise.all(watches.map((watch) => runSubscriber(watch, containerState))), watchPromises.length = 0;
    }
  } while (containerState.$watchStaging$.size > 0);
};
const sortNodes = (elements) => {
  elements.sort((a2, b) => 2 & a2.compareDocumentPosition(getRootNode(b)) ? 1 : -1);
};
const sortWatches = (watches) => {
  watches.sort((a2, b) => a2.$el$ === b.$el$ ? a2.$index$ < b.$index$ ? -1 : 1 : 0 != (2 & a2.$el$.compareDocumentPosition(getRootNode(b.$el$))) ? 1 : -1);
};
const CONTAINER_STATE = Symbol("ContainerState");
const getContainerState = (containerEl) => {
  let set = containerEl[CONTAINER_STATE];
  return set || (containerEl[CONTAINER_STATE] = set = createContainerState(containerEl)), set;
};
const createContainerState = (containerEl) => {
  const containerState = {
    $containerEl$: containerEl,
    $proxyMap$: /* @__PURE__ */ new WeakMap(),
    $subsManager$: null,
    $watchNext$: /* @__PURE__ */ new Set(),
    $watchStaging$: /* @__PURE__ */ new Set(),
    $hostsNext$: /* @__PURE__ */ new Set(),
    $hostsStaging$: /* @__PURE__ */ new Set(),
    $renderPromise$: void 0,
    $hostsRendering$: void 0,
    $envData$: {},
    $elementIndex$: 0,
    $styleIds$: /* @__PURE__ */ new Set(),
    $mutableProps$: false
  };
  return containerState.$subsManager$ = createSubscriptionManager(containerState), containerState;
};
const createSubscriptionManager = (containerState) => {
  const objToSubs = /* @__PURE__ */ new Map();
  const subsToObjs = /* @__PURE__ */ new Map();
  const tryGetLocal = (obj) => (getProxyTarget(obj), objToSubs.get(obj));
  const trackSubToObj = (subscriber, map) => {
    let set = subsToObjs.get(subscriber);
    set || subsToObjs.set(subscriber, set = /* @__PURE__ */ new Set()), set.add(map);
  };
  const manager = {
    $tryGetLocal$: tryGetLocal,
    $getLocal$: (obj, initialMap) => {
      let local = tryGetLocal(obj);
      if (local)
        ;
      else {
        const map = initialMap || /* @__PURE__ */ new Map();
        map.forEach((_, key) => {
          trackSubToObj(key, map);
        }), objToSubs.set(obj, local = {
          $subs$: map,
          $addSub$(subscriber, key) {
            if (null == key) {
              map.set(subscriber, null);
            } else {
              let sub = map.get(subscriber);
              void 0 === sub && map.set(subscriber, sub = /* @__PURE__ */ new Set()), sub && sub.add(key);
            }
            trackSubToObj(subscriber, map);
          },
          $notifySubs$(key) {
            map.forEach((value, subscriber) => {
              null !== value && key && !value.has(key) || ((subscriber2, containerState2) => {
                isQwikElement(subscriber2) ? ((hostElement, containerState3) => {
                  const server = isServer$1();
                  server || resumeIfNeeded(containerState3.$containerEl$);
                  const ctx = getContext(hostElement);
                  if (ctx.$renderQrl$, !ctx.$dirty$) {
                    if (ctx.$dirty$ = true, void 0 !== containerState3.$hostsRendering$) {
                      containerState3.$renderPromise$, containerState3.$hostsStaging$.add(hostElement);
                    } else {
                      if (server) {
                        return void logWarn();
                      }
                      containerState3.$hostsNext$.add(hostElement), scheduleFrame(containerState3);
                    }
                  }
                })(subscriber2, containerState2) : notifyWatch(subscriber2, containerState2);
              })(subscriber, containerState);
            });
          }
        });
      }
      return local;
    },
    $clearSub$: (sub) => {
      const subs = subsToObjs.get(sub);
      subs && (subs.forEach((s2) => {
        s2.delete(sub);
      }), subsToObjs.delete(sub), subs.clear());
    }
  };
  return manager;
};
const _pauseFromContexts = async (allContexts, containerState) => {
  const collector = createCollector(containerState);
  const listeners = [];
  for (const ctx of allContexts) {
    const el = ctx.$element$;
    const ctxLi = ctx.li;
    for (const key of Object.keys(ctxLi)) {
      for (const qrl of ctxLi[key]) {
        const captured = qrl.$captureRef$;
        if (captured) {
          for (const obj of captured) {
            collectValue(obj, collector, true);
          }
        }
        isElement(el) && listeners.push({
          key,
          qrl,
          el,
          eventName: getEventName(key)
        });
      }
    }
    ctx.$watches$ && collector.$watches$.push(...ctx.$watches$);
  }
  if (0 === listeners.length) {
    return {
      state: {
        ctx: {},
        objs: [],
        subs: []
      },
      objs: [],
      listeners: [],
      mode: "static"
    };
  }
  let promises;
  for (; (promises = collector.$promises$).length > 0; ) {
    collector.$promises$ = [], await Promise.allSettled(promises);
  }
  const canRender = collector.$elements$.length > 0;
  if (canRender) {
    for (const element of collector.$elements$) {
      collectElementData(tryGetContext(element), collector);
    }
    for (const ctx of allContexts) {
      if (ctx.$props$ && collectMutableProps(ctx.$element$, ctx.$props$, collector), ctx.$contexts$) {
        for (const item of ctx.$contexts$.values()) {
          collectValue(item, collector, false);
        }
      }
    }
  }
  for (; (promises = collector.$promises$).length > 0; ) {
    collector.$promises$ = [], await Promise.allSettled(promises);
  }
  const elementToIndex = /* @__PURE__ */ new Map();
  const objs = Array.from(collector.$objSet$.keys());
  const objToId = /* @__PURE__ */ new Map();
  const getElementID = (el) => {
    let id = elementToIndex.get(el);
    return void 0 === id && (id = ((el2) => {
      const ctx = tryGetContext(el2);
      return ctx ? ctx.$id$ : null;
    })(el), id ? id = "#" + id : console.warn("Missing ID", el), elementToIndex.set(el, id)), id;
  };
  const getObjId = (obj) => {
    let suffix = "";
    if (isMutable(obj) && (obj = obj.mut, suffix = "%"), isPromise(obj)) {
      const { value, resolved } = getPromiseValue(obj);
      obj = value, suffix += resolved ? "~" : "_";
    }
    if (isObject(obj)) {
      const target = getProxyTarget(obj);
      if (target) {
        suffix += "!", obj = target;
      } else if (isQwikElement(obj)) {
        const elID = getElementID(obj);
        return elID ? elID + suffix : null;
      }
    }
    const id = objToId.get(obj);
    return id ? id + suffix : null;
  };
  const mustGetObjId = (obj) => {
    const key = getObjId(obj);
    if (null === key) {
      throw qError(QError_missingObjectId, obj);
    }
    return key;
  };
  const subsMap = /* @__PURE__ */ new Map();
  objs.forEach((obj) => {
    const proxy = containerState.$proxyMap$.get(obj);
    const flags = getProxyFlags(proxy);
    if (void 0 === flags) {
      return;
    }
    const subsObj = [];
    flags > 0 && subsObj.push({
      subscriber: "$",
      data: flags
    }), getProxySubs(proxy).forEach((set, key) => {
      isNode(key) && isVirtualElement(key) && !collector.$elements$.includes(key) || subsObj.push({
        subscriber: key,
        data: set ? Array.from(set) : null
      });
    }), subsObj.length > 0 && subsMap.set(obj, subsObj);
  }), objs.sort((a2, b) => (subsMap.has(a2) ? 0 : 1) - (subsMap.has(b) ? 0 : 1));
  let count = 0;
  for (const obj of objs) {
    objToId.set(obj, intToStr(count)), count++;
  }
  if (collector.$noSerialize$.length > 0) {
    const undefinedID = objToId.get(void 0);
    for (const obj of collector.$noSerialize$) {
      objToId.set(obj, undefinedID);
    }
  }
  const subs = objs.map((obj) => {
    const sub = subsMap.get(obj);
    if (!sub) {
      return;
    }
    const subsObj = {};
    return sub.forEach(({ subscriber, data }) => {
      if ("$" === subscriber) {
        subsObj[subscriber] = data;
      } else {
        const id = getObjId(subscriber);
        null !== id && (subsObj[id] = data);
      }
    }), subsObj;
  }).filter(isNotNullable);
  const convertedObjs = objs.map((obj) => {
    if (null === obj) {
      return null;
    }
    const typeObj = typeof obj;
    switch (typeObj) {
      case "undefined":
        return UNDEFINED_PREFIX;
      case "string":
      case "number":
      case "boolean":
        return obj;
      default:
        const value = serializeValue(obj, getObjId, containerState);
        if (void 0 !== value) {
          return value;
        }
        if ("object" === typeObj) {
          if (isArray(obj)) {
            return obj.map(mustGetObjId);
          }
          if (isSerializableObject(obj)) {
            const output = {};
            for (const key of Object.keys(obj)) {
              output[key] = mustGetObjId(obj[key]);
            }
            return output;
          }
        }
    }
    throw qError(QError_verifySerializable, obj);
  });
  const meta = {};
  allContexts.forEach((ctx) => {
    const node = ctx.$element$;
    const ref = ctx.$refMap$;
    const props = ctx.$props$;
    const contexts = ctx.$contexts$;
    const watches = ctx.$watches$;
    const renderQrl = ctx.$renderQrl$;
    const seq = ctx.$seq$;
    const metaValue = {};
    const elementCaptured = isVirtualElement(node) && collector.$elements$.includes(node);
    let add = false;
    if (ref.length > 0) {
      const value = ref.map(mustGetObjId).join(" ");
      value && (metaValue.r = value, add = true);
    }
    if (canRender) {
      if (elementCaptured && props && (metaValue.h = mustGetObjId(props) + " " + mustGetObjId(renderQrl), add = true), watches && watches.length > 0) {
        const value = watches.map(getObjId).filter(isNotNullable).join(" ");
        value && (metaValue.w = value, add = true);
      }
      if (elementCaptured && seq && seq.length > 0) {
        const value = seq.map(mustGetObjId).join(" ");
        metaValue.s = value, add = true;
      }
      if (contexts) {
        const serializedContexts = [];
        contexts.forEach((value2, key) => {
          serializedContexts.push(`${key}=${mustGetObjId(value2)}`);
        });
        const value = serializedContexts.join(" ");
        value && (metaValue.c = value, add = true);
      }
    }
    if (add) {
      const elementID = getElementID(node);
      meta[elementID] = metaValue;
    }
  });
  for (const watch of collector.$watches$) {
    destroyWatch(watch);
  }
  return {
    state: {
      ctx: meta,
      objs: convertedObjs,
      subs
    },
    objs,
    listeners,
    mode: canRender ? "render" : "listeners"
  };
};
const getNodesInScope = (parent, predicate) => {
  predicate(parent);
  const walker = parent.ownerDocument.createTreeWalker(parent, 129, {
    acceptNode: (node) => isContainer(node) ? 2 : predicate(node) ? 1 : 3
  });
  const pars = [];
  let currentNode = null;
  for (; currentNode = walker.nextNode(); ) {
    pars.push(processVirtualNodes(currentNode));
  }
  return pars;
};
const reviveNestedObjects = (obj, getObject, parser) => {
  if (!parser.fill(obj) && obj && "object" == typeof obj) {
    if (isArray(obj)) {
      for (let i2 = 0; i2 < obj.length; i2++) {
        const value = obj[i2];
        "string" == typeof value ? obj[i2] = getObject(value) : reviveNestedObjects(value, getObject, parser);
      }
    } else if (isSerializableObject(obj)) {
      for (const key of Object.keys(obj)) {
        const value = obj[key];
        "string" == typeof value ? obj[key] = getObject(value) : reviveNestedObjects(value, getObject, parser);
      }
    }
  }
};
const OBJECT_TRANSFORMS = {
  "!": (obj, containerState) => {
    var _a3;
    return (_a3 = containerState.$proxyMap$.get(obj)) != null ? _a3 : getOrCreateProxy(obj, containerState);
  },
  "%": (obj) => mutable(obj),
  "~": (obj) => Promise.resolve(obj),
  _: (obj) => Promise.reject(obj)
};
const collectMutableProps = (el, props, collector) => {
  const subs = getProxySubs(props);
  subs && subs.has(el) && collectElement(el, collector);
};
const createCollector = (containerState) => ({
  $containerState$: containerState,
  $seen$: /* @__PURE__ */ new Set(),
  $objSet$: /* @__PURE__ */ new Set(),
  $noSerialize$: [],
  $elements$: [],
  $watches$: [],
  $promises$: []
});
const collectDeferElement = (el, collector) => {
  collector.$elements$.includes(el) || collector.$elements$.push(el);
};
const collectElement = (el, collector) => {
  if (collector.$elements$.includes(el)) {
    return;
  }
  const ctx = tryGetContext(el);
  ctx && (collector.$elements$.push(el), collectElementData(ctx, collector));
};
const collectElementData = (ctx, collector) => {
  if (ctx.$props$ && collectValue(ctx.$props$, collector, false), ctx.$renderQrl$ && collectValue(ctx.$renderQrl$, collector, false), ctx.$seq$) {
    for (const obj of ctx.$seq$) {
      collectValue(obj, collector, false);
    }
  }
  if (ctx.$watches$) {
    for (const obj of ctx.$watches$) {
      collectValue(obj, collector, false);
    }
  }
  if (ctx.$contexts$) {
    for (const obj of ctx.$contexts$.values()) {
      collectValue(obj, collector, false);
    }
  }
};
const PROMISE_VALUE = Symbol();
const getPromiseValue = (promise) => promise[PROMISE_VALUE];
const collectValue = (obj, collector, leaks) => {
  if (null !== obj) {
    const objType = typeof obj;
    const seen = collector.$seen$;
    switch (objType) {
      case "function":
        if (seen.has(obj)) {
          return;
        }
        if (seen.add(obj), !fastShouldSerialize(obj)) {
          return collector.$objSet$.add(void 0), void collector.$noSerialize$.push(obj);
        }
        if (isQrl$1(obj)) {
          if (collector.$objSet$.add(obj), obj.$captureRef$) {
            for (const item of obj.$captureRef$) {
              collectValue(item, collector, leaks);
            }
          }
          return;
        }
        break;
      case "object": {
        if (seen.has(obj)) {
          return;
        }
        if (seen.add(obj), !fastShouldSerialize(obj)) {
          return collector.$objSet$.add(void 0), void collector.$noSerialize$.push(obj);
        }
        if (isPromise(obj)) {
          return void collector.$promises$.push((promise = obj, promise.then((value) => {
            const v = {
              resolved: true,
              value
            };
            return promise[PROMISE_VALUE] = v, value;
          }, (value) => {
            const v = {
              resolved: false,
              value
            };
            return promise[PROMISE_VALUE] = v, value;
          })).then((value) => {
            collectValue(value, collector, leaks);
          }));
        }
        const target = getProxyTarget(obj);
        const input = obj;
        if (target) {
          if (leaks && ((proxy, collector2) => {
            const subs = getProxySubs(proxy);
            if (!collector2.$seen$.has(subs)) {
              collector2.$seen$.add(subs);
              for (const key of Array.from(subs.keys())) {
                isNode(key) && isVirtualElement(key) ? collectDeferElement(key, collector2) : collectValue(key, collector2, true);
              }
            }
          })(input, collector), obj = target, seen.has(obj)) {
            return;
          }
          if (seen.add(obj), isResourceReturn(obj)) {
            return collector.$objSet$.add(target), collectValue(obj.promise, collector, leaks), void collectValue(obj.resolved, collector, leaks);
          }
        } else if (isNode(obj)) {
          return;
        }
        if (isArray(obj)) {
          for (let i2 = 0; i2 < obj.length; i2++) {
            collectValue(input[i2], collector, leaks);
          }
        } else {
          for (const key of Object.keys(obj)) {
            collectValue(input[key], collector, leaks);
          }
        }
        break;
      }
    }
  }
  var promise;
  collector.$objSet$.add(obj);
};
const isContainer = (el) => isElement(el) && el.hasAttribute("q:container");
const hasQId = (el) => {
  const node = processVirtualNodes(el);
  return !!isQwikElement(node) && node.hasAttribute("q:id");
};
const intToStr = (nu) => nu.toString(36);
const strToInt = (nu) => parseInt(nu, 36);
const getEventName = (attribute) => {
  const colonPos = attribute.indexOf(":");
  return attribute.slice(colonPos + 1).replace(/-./g, (x2) => x2[1].toUpperCase());
};
const WatchFlagsIsEffect = 1;
const WatchFlagsIsWatch = 2;
const WatchFlagsIsDirty = 4;
const WatchFlagsIsCleanup = 8;
const WatchFlagsIsResource = 16;
const useWatchQrl = (qrl, opts) => {
  const { get, set, ctx, i: i2 } = useSequentialScope();
  if (get) {
    return;
  }
  const el = ctx.$hostElement$;
  const containerState = ctx.$renderCtx$.$static$.$containerState$;
  const watch = new Watch(WatchFlagsIsDirty | WatchFlagsIsWatch, i2, el, qrl, void 0);
  const elCtx = getContext(el);
  set(true), qrl.$resolveLazy$(containerState.$containerEl$), elCtx.$watches$ || (elCtx.$watches$ = []), elCtx.$watches$.push(watch), waitAndRun(ctx, () => runSubscriber(watch, containerState, ctx.$renderCtx$)), isServer$1() && useRunWatch(watch, opts == null ? void 0 : opts.eagerness);
};
const isResourceWatch = (watch) => !!watch.$resource$;
const runSubscriber = (watch, containerState, rctx) => (watch.$flags$, isResourceWatch(watch) ? runResource(watch, containerState) : runWatch(watch, containerState, rctx));
const runResource = (watch, containerState, waitOn) => {
  watch.$flags$ &= ~WatchFlagsIsDirty, cleanupWatch(watch);
  const el = watch.$el$;
  const invokationContext = newInvokeContext(el, void 0, "WatchEvent");
  const { $subsManager$: subsManager } = containerState;
  const watchFn = watch.$qrl$.getFn(invokationContext, () => {
    subsManager.$clearSub$(watch);
  });
  const cleanups = [];
  const resource = watch.$resource$;
  const resourceTarget = unwrapProxy(resource);
  const opts = {
    track: (obj, prop) => {
      const target = getProxyTarget(obj);
      return target ? subsManager.$getLocal$(target).$addSub$(watch, prop) : logErrorAndStop(codeToText(QError_trackUseStore), obj), prop ? obj[prop] : obj;
    },
    cleanup(callback) {
      cleanups.push(callback);
    },
    previous: resourceTarget.resolved
  };
  let resolve;
  let reject;
  let done = false;
  const setState = (resolved, value) => !done && (done = true, resolved ? (done = true, resource.state = "resolved", resource.resolved = value, resource.error = void 0, resolve(value)) : (done = true, resource.state = "rejected", resource.resolved = void 0, resource.error = value, reject(value)), true);
  invoke(invokationContext, () => {
    resource.state = "pending", resource.resolved = void 0, resource.promise = new Promise((r2, re) => {
      resolve = r2, reject = re;
    });
  }), watch.$destroy$ = noSerialize(() => {
    cleanups.forEach((fn) => fn());
  });
  const promise = safeCall(() => then(waitOn, () => watchFn(opts)), (value) => {
    setState(true, value);
  }, (reason) => {
    setState(false, reason);
  });
  const timeout = resourceTarget.timeout;
  return timeout ? Promise.race([promise, delay(timeout).then(() => {
    setState(false, "timeout") && cleanupWatch(watch);
  })]) : promise;
};
const runWatch = (watch, containerState, rctx) => {
  watch.$flags$ &= ~WatchFlagsIsDirty, cleanupWatch(watch);
  const hostElement = watch.$el$;
  const invokationContext = newInvokeContext(hostElement, void 0, "WatchEvent");
  const { $subsManager$: subsManager } = containerState;
  const watchFn = watch.$qrl$.getFn(invokationContext, () => {
    subsManager.$clearSub$(watch);
  });
  const cleanups = [];
  watch.$destroy$ = noSerialize(() => {
    cleanups.forEach((fn) => fn());
  });
  const opts = {
    track: (obj, prop) => {
      const target = getProxyTarget(obj);
      return target ? subsManager.$getLocal$(target).$addSub$(watch, prop) : logErrorAndStop(codeToText(QError_trackUseStore), obj), prop ? obj[prop] : obj;
    },
    cleanup(callback) {
      cleanups.push(callback);
    }
  };
  return safeCall(() => watchFn(opts), (returnValue) => {
    isFunction(returnValue) && cleanups.push(returnValue);
  }, (reason) => {
    handleError(reason, hostElement, rctx);
  });
};
const cleanupWatch = (watch) => {
  const destroy = watch.$destroy$;
  if (destroy) {
    watch.$destroy$ = void 0;
    try {
      destroy();
    } catch (err) {
      logError(err);
    }
  }
};
const destroyWatch = (watch) => {
  watch.$flags$ & WatchFlagsIsCleanup ? (watch.$flags$ &= ~WatchFlagsIsCleanup, (0, watch.$qrl$)()) : cleanupWatch(watch);
};
const useRunWatch = (watch, eagerness) => {
  "load" === eagerness ? useOn("qinit", getWatchHandlerQrl(watch)) : "visible" === eagerness && useOn("qvisible", getWatchHandlerQrl(watch));
};
const getWatchHandlerQrl = (watch) => {
  const watchQrl = watch.$qrl$;
  return createQRL(watchQrl.$chunk$, "_hW", _hW, null, null, [watch], watchQrl.$symbol$);
};
class Watch {
  constructor($flags$, $index$, $el$, $qrl$, $resource$) {
    this.$flags$ = $flags$, this.$index$ = $index$, this.$el$ = $el$, this.$qrl$ = $qrl$, this.$resource$ = $resource$;
  }
}
const _createResourceReturn = (opts) => ({
  __brand: "resource",
  promise: void 0,
  resolved: void 0,
  error: void 0,
  state: "pending",
  timeout: opts == null ? void 0 : opts.timeout
});
const isResourceReturn = (obj) => isObject(obj) && "resource" === obj.__brand;
const UNDEFINED_PREFIX = "";
const QRLSerializer = {
  prefix: "",
  test: (v) => isQrl$1(v),
  serialize: (obj, getObjId, containerState) => stringifyQRL(obj, {
    $getObjId$: getObjId
  }),
  prepare: (data, containerState) => parseQRL(data, containerState.$containerEl$),
  fill: (qrl, getObject) => {
    qrl.$capture$ && qrl.$capture$.length > 0 && (qrl.$captureRef$ = qrl.$capture$.map(getObject), qrl.$capture$ = null);
  }
};
const WatchSerializer = {
  prefix: "",
  test: (v) => {
    return isObject(obj = v) && obj instanceof Watch;
    var obj;
  },
  serialize: (obj, getObjId) => ((watch, getObjId2) => {
    let value = `${intToStr(watch.$flags$)} ${intToStr(watch.$index$)} ${getObjId2(watch.$qrl$)} ${getObjId2(watch.$el$)}`;
    return isResourceWatch(watch) && (value += ` ${getObjId2(watch.$resource$)}`), value;
  })(obj, getObjId),
  prepare: (data) => ((data2) => {
    const [flags, index2, qrl, el, resource] = data2.split(" ");
    return new Watch(strToInt(flags), strToInt(index2), el, qrl, resource);
  })(data),
  fill: (watch, getObject) => {
    watch.$el$ = getObject(watch.$el$), watch.$qrl$ = getObject(watch.$qrl$), watch.$resource$ && (watch.$resource$ = getObject(watch.$resource$));
  }
};
const ResourceSerializer = {
  prefix: "",
  test: (v) => isResourceReturn(v),
  serialize: (obj, getObjId) => ((resource, getObjId2) => {
    const state = resource.state;
    return "resolved" === state ? `0 ${getObjId2(resource.resolved)}` : "pending" === state ? "1" : `2 ${getObjId2(resource.error)}`;
  })(obj, getObjId),
  prepare: (data) => ((data2) => {
    const [first, id] = data2.split(" ");
    const result = _createResourceReturn(void 0);
    return result.promise = Promise.resolve(), "0" === first ? (result.state = "resolved", result.resolved = id) : "1" === first ? (result.state = "pending", result.promise = new Promise(() => {
    })) : "2" === first && (result.state = "rejected", result.error = id), result;
  })(data),
  fill: (resource, getObject) => {
    if ("resolved" === resource.state) {
      resource.resolved = getObject(resource.resolved), resource.promise = Promise.resolve(resource.resolved);
    } else if ("rejected" === resource.state) {
      const p = Promise.reject(resource.error);
      p.catch(() => null), resource.error = getObject(resource.error), resource.promise = p;
    }
  }
};
const URLSerializer = {
  prefix: "",
  test: (v) => v instanceof URL,
  serialize: (obj) => obj.href,
  prepare: (data) => new URL(data),
  fill: void 0
};
const DateSerializer = {
  prefix: "",
  test: (v) => v instanceof Date,
  serialize: (obj) => obj.toISOString(),
  prepare: (data) => new Date(data),
  fill: void 0
};
const RegexSerializer = {
  prefix: "\x07",
  test: (v) => v instanceof RegExp,
  serialize: (obj) => `${obj.flags} ${obj.source}`,
  prepare: (data) => {
    const space = data.indexOf(" ");
    const source = data.slice(space + 1);
    const flags = data.slice(0, space);
    return new RegExp(source, flags);
  },
  fill: void 0
};
const ErrorSerializer = {
  prefix: "",
  test: (v) => v instanceof Error,
  serialize: (obj) => obj.message,
  prepare: (text) => {
    const err = new Error(text);
    return err.stack = void 0, err;
  },
  fill: void 0
};
const DocumentSerializer = {
  prefix: "",
  test: (v) => isDocument(v),
  serialize: void 0,
  prepare: (_, _c2, doc) => doc,
  fill: void 0
};
const SERIALIZABLE_STATE = Symbol("serializable-data");
const ComponentSerializer = {
  prefix: "",
  test: (obj) => isQwikComponent(obj),
  serialize: (obj, getObjId, containerState) => {
    const [qrl] = obj[SERIALIZABLE_STATE];
    return stringifyQRL(qrl, {
      $getObjId$: getObjId
    });
  },
  prepare: (data, containerState) => {
    const optionsIndex = data.indexOf("{");
    const qrlString = -1 == optionsIndex ? data : data.slice(0, optionsIndex);
    const qrl = parseQRL(qrlString, containerState.$containerEl$);
    return componentQrl(qrl);
  },
  fill: (component, getObject) => {
    const [qrl] = component[SERIALIZABLE_STATE];
    qrl.$capture$ && qrl.$capture$.length > 0 && (qrl.$captureRef$ = qrl.$capture$.map(getObject), qrl.$capture$ = null);
  }
};
const serializers = [QRLSerializer, WatchSerializer, ResourceSerializer, URLSerializer, DateSerializer, RegexSerializer, ErrorSerializer, DocumentSerializer, ComponentSerializer, {
  prefix: "",
  test: (obj) => "function" == typeof obj && void 0 !== obj.__qwik_serializable__,
  serialize: (obj) => obj.toString(),
  prepare: (data) => {
    const fn = new Function("return " + data)();
    return fn.__qwik_serializable__ = true, fn;
  },
  fill: void 0
}];
const serializeValue = (obj, getObjID, containerState) => {
  for (const s2 of serializers) {
    if (s2.test(obj)) {
      let value = s2.prefix;
      return s2.serialize && (value += s2.serialize(obj, getObjID, containerState)), value;
    }
  }
};
const getOrCreateProxy = (target, containerState, flags = 0) => containerState.$proxyMap$.get(target) || createProxy(target, containerState, flags, void 0);
const createProxy = (target, containerState, flags, subs) => {
  unwrapProxy(target), containerState.$proxyMap$.has(target);
  const manager = containerState.$subsManager$.$getLocal$(target, subs);
  const proxy = new Proxy(target, new ReadWriteProxyHandler(containerState, manager, flags));
  return containerState.$proxyMap$.set(target, proxy), proxy;
};
const QOjectTargetSymbol = Symbol();
const QOjectSubsSymbol = Symbol();
const QOjectFlagsSymbol = Symbol();
class ReadWriteProxyHandler {
  constructor($containerState$, $manager$, $flags$) {
    this.$containerState$ = $containerState$, this.$manager$ = $manager$, this.$flags$ = $flags$;
  }
  get(target, prop) {
    if ("symbol" == typeof prop) {
      return prop === QOjectTargetSymbol ? target : prop === QOjectFlagsSymbol ? this.$flags$ : prop === QOjectSubsSymbol ? this.$manager$.$subs$ : target[prop];
    }
    let subscriber;
    const invokeCtx = tryGetInvokeContext();
    const recursive = 0 != (1 & this.$flags$);
    const immutable = 0 != (2 & this.$flags$);
    invokeCtx && (subscriber = invokeCtx.$subscriber$);
    let value = target[prop];
    if (isMutable(value) ? value = value.mut : immutable && (subscriber = null), subscriber) {
      const isA = isArray(target);
      this.$manager$.$addSub$(subscriber, isA ? void 0 : prop);
    }
    return recursive ? wrap(value, this.$containerState$) : value;
  }
  set(target, prop, newValue) {
    if ("symbol" == typeof prop) {
      return target[prop] = newValue, true;
    }
    if (0 != (2 & this.$flags$)) {
      throw qError(QError_immutableProps);
    }
    const unwrappedNewValue = 0 != (1 & this.$flags$) ? unwrapProxy(newValue) : newValue;
    return isArray(target) ? (target[prop] = unwrappedNewValue, this.$manager$.$notifySubs$(), true) : (target[prop] !== unwrappedNewValue && (target[prop] = unwrappedNewValue, this.$manager$.$notifySubs$(prop)), true);
  }
  has(target, property) {
    return property === QOjectTargetSymbol || property === QOjectFlagsSymbol || Object.prototype.hasOwnProperty.call(target, property);
  }
  ownKeys(target) {
    let subscriber = null;
    const invokeCtx = tryGetInvokeContext();
    return invokeCtx && (subscriber = invokeCtx.$subscriber$), subscriber && this.$manager$.$addSub$(subscriber), Object.getOwnPropertyNames(target);
  }
}
const wrap = (value, containerState) => {
  if (isQrl$1(value)) {
    return value;
  }
  if (isObject(value)) {
    if (Object.isFrozen(value)) {
      return value;
    }
    const nakedValue = unwrapProxy(value);
    return nakedValue !== value || isNode(nakedValue) ? value : shouldSerialize(nakedValue) ? containerState.$proxyMap$.get(value) || getOrCreateProxy(value, containerState, 1) : value;
  }
  return value;
};
const noSerializeSet = /* @__PURE__ */ new WeakSet();
const shouldSerialize = (obj) => !isObject(obj) && !isFunction(obj) || !noSerializeSet.has(obj);
const fastShouldSerialize = (obj) => !noSerializeSet.has(obj);
const noSerialize = (input) => (null != input && noSerializeSet.add(input), input);
const mutable = (v) => new MutableImpl(v);
class MutableImpl {
  constructor(mut) {
    this.mut = mut;
  }
}
const isMutable = (v) => v instanceof MutableImpl;
const unwrapProxy = (proxy) => {
  var _a3;
  return isObject(proxy) ? (_a3 = getProxyTarget(proxy)) != null ? _a3 : proxy : proxy;
};
const getProxyTarget = (obj) => obj[QOjectTargetSymbol];
const getProxySubs = (obj) => obj[QOjectSubsSymbol];
const getProxyFlags = (obj) => {
  if (isObject(obj)) {
    return obj[QOjectFlagsSymbol];
  }
};
const resumeIfNeeded = (containerEl) => {
  "paused" === directGetAttribute(containerEl, "q:container") && (((containerEl2) => {
    if (!isContainer(containerEl2)) {
      return void logWarn();
    }
    const doc = getDocument(containerEl2);
    const script = ((parentElm) => {
      let child = parentElm.lastElementChild;
      for (; child; ) {
        if ("SCRIPT" === child.tagName && "qwik/json" === directGetAttribute(child, "type")) {
          return child;
        }
        child = child.previousElementSibling;
      }
    })(containerEl2 === doc.documentElement ? doc.body : containerEl2);
    if (!script) {
      return void logWarn();
    }
    script.remove();
    const containerState = getContainerState(containerEl2);
    ((containerEl3, containerState2) => {
      const head2 = containerEl3.ownerDocument.head;
      containerEl3.querySelectorAll("style[q\\:style]").forEach((el2) => {
        containerState2.$styleIds$.add(directGetAttribute(el2, "q:style")), head2.appendChild(el2);
      });
    })(containerEl2, containerState);
    const meta = JSON.parse((script.textContent || "{}").replace(/\\x3C(\/?script)/g, "<$1"));
    const elements = /* @__PURE__ */ new Map();
    const getObject = (id) => ((id2, elements2, objs, containerState2) => {
      if ("string" == typeof id2 && id2.length, id2.startsWith("#")) {
        return elements2.has(id2), elements2.get(id2);
      }
      const index2 = strToInt(id2);
      objs.length;
      let obj = objs[index2];
      for (let i2 = id2.length - 1; i2 >= 0; i2--) {
        const code = id2[i2];
        const transform = OBJECT_TRANSFORMS[code];
        if (!transform) {
          break;
        }
        obj = transform(obj, containerState2);
      }
      return obj;
    })(id, elements, meta.objs, containerState);
    let maxId = 0;
    getNodesInScope(containerEl2, hasQId).forEach((el2) => {
      const id = directGetAttribute(el2, "q:id");
      const ctx = getContext(el2);
      ctx.$id$ = id, isElement(el2) && (ctx.$vdom$ = domToVnode(el2)), elements.set("#" + id, el2), maxId = Math.max(maxId, strToInt(id));
    }), containerState.$elementIndex$ = ++maxId;
    const parser = ((getObject2, containerState2, doc2) => {
      const map = /* @__PURE__ */ new Map();
      return {
        prepare(data) {
          for (const s2 of serializers) {
            const prefix = s2.prefix;
            if (data.startsWith(prefix)) {
              const value = s2.prepare(data.slice(prefix.length), containerState2, doc2);
              return s2.fill && map.set(value, s2), value;
            }
          }
          return data;
        },
        fill(obj) {
          const serializer = map.get(obj);
          return !!serializer && (serializer.fill(obj, getObject2, containerState2), true);
        }
      };
    })(getObject, containerState, doc);
    ((objs, subs, getObject2, containerState2, parser2) => {
      for (let i2 = 0; i2 < objs.length; i2++) {
        const value = objs[i2];
        isString(value) && (objs[i2] = value === UNDEFINED_PREFIX ? void 0 : parser2.prepare(value));
      }
      for (let i2 = 0; i2 < subs.length; i2++) {
        const value = objs[i2];
        const sub = subs[i2];
        if (sub) {
          const converted = /* @__PURE__ */ new Map();
          let flags = 0;
          for (const key of Object.keys(sub)) {
            const v = sub[key];
            if ("$" === key) {
              flags = v;
              continue;
            }
            const el2 = getObject2(key);
            if (!el2) {
              continue;
            }
            const set = null === v ? null : new Set(v);
            converted.set(el2, set);
          }
          createProxy(value, containerState2, flags, converted);
        }
      }
    })(meta.objs, meta.subs, getObject, containerState, parser);
    for (const obj of meta.objs) {
      reviveNestedObjects(obj, getObject, parser);
    }
    for (const elementID of Object.keys(meta.ctx)) {
      elementID.startsWith("#");
      const ctxMeta = meta.ctx[elementID];
      const el2 = elements.get(elementID);
      const ctx = getContext(el2);
      const refMap = ctxMeta.r;
      const seq = ctxMeta.s;
      const host = ctxMeta.h;
      const contexts = ctxMeta.c;
      const watches = ctxMeta.w;
      if (refMap && (isElement(el2), ctx.$refMap$ = refMap.split(" ").map(getObject), ctx.li = getDomListeners(ctx, containerEl2)), seq && (ctx.$seq$ = seq.split(" ").map(getObject)), watches && (ctx.$watches$ = watches.split(" ").map(getObject)), contexts) {
        ctx.$contexts$ = /* @__PURE__ */ new Map();
        for (const part of contexts.split(" ")) {
          const [key, value] = part.split("=");
          ctx.$contexts$.set(key, getObject(value));
        }
      }
      if (host) {
        const [props, renderQrl] = host.split(" ");
        const styleIds = el2.getAttribute("q:sstyle");
        ctx.$scopeIds$ = styleIds ? styleIds.split(" ") : null, ctx.$mounted$ = true, ctx.$props$ = getObject(props), ctx.$renderQrl$ = getObject(renderQrl);
      }
    }
    var el;
    directSetAttribute(containerEl2, "q:container", "resumed"), (el = containerEl2) && "function" == typeof CustomEvent && el.dispatchEvent(new CustomEvent("qresume", {
      detail: void 0,
      bubbles: true,
      composed: true
    }));
  })(containerEl), appendQwikDevTools(containerEl));
};
const appendQwikDevTools = (containerEl) => {
  containerEl.qwik = {
    pause: () => (async (elmOrDoc, defaultParentJSON) => {
      const doc = getDocument(elmOrDoc);
      const documentElement = doc.documentElement;
      const containerEl2 = isDocument(elmOrDoc) ? documentElement : elmOrDoc;
      if ("paused" === directGetAttribute(containerEl2, "q:container")) {
        throw qError(QError_containerAlreadyPaused);
      }
      const parentJSON = containerEl2 === doc.documentElement ? doc.body : containerEl2;
      const data = await (async (containerEl3) => {
        const containerState = getContainerState(containerEl3);
        const contexts = getNodesInScope(containerEl3, hasQId).map(tryGetContext);
        return _pauseFromContexts(contexts, containerState);
      })(containerEl2);
      const script = doc.createElement("script");
      return directSetAttribute(script, "type", "qwik/json"), script.textContent = JSON.stringify(data.state, void 0, void 0).replace(/<(\/?script)/g, "\\x3C$1"), parentJSON.appendChild(script), directSetAttribute(containerEl2, "q:container", "paused"), data;
    })(containerEl),
    state: getContainerState(containerEl)
  };
};
const tryGetContext = (element) => element._qc_;
const getContext = (element) => {
  let ctx = tryGetContext(element);
  return ctx || (element._qc_ = ctx = {
    $dirty$: false,
    $mounted$: false,
    $attachedListeners$: false,
    $id$: "",
    $element$: element,
    $refMap$: [],
    li: {},
    $watches$: null,
    $seq$: null,
    $slots$: null,
    $scopeIds$: null,
    $appendStyles$: null,
    $props$: null,
    $vdom$: null,
    $renderQrl$: null,
    $contexts$: null
  }), ctx;
};
const cleanupContext = (ctx, subsManager) => {
  var _a3;
  const el = ctx.$element$;
  (_a3 = ctx.$watches$) == null ? void 0 : _a3.forEach((watch) => {
    subsManager.$clearSub$(watch), destroyWatch(watch);
  }), ctx.$renderQrl$ && subsManager.$clearSub$(el), ctx.$renderQrl$ = null, ctx.$seq$ = null, ctx.$watches$ = null, ctx.$dirty$ = false, el._qc_ = void 0;
};
const PREFIXES = ["on", "window:on", "document:on"];
const SCOPED = ["on", "on-window", "on-document"];
const normalizeOnProp = (prop) => {
  let scope = "on";
  for (let i2 = 0; i2 < PREFIXES.length; i2++) {
    const prefix = PREFIXES[i2];
    if (prop.startsWith(prefix)) {
      scope = SCOPED[i2], prop = prop.slice(prefix.length);
      break;
    }
  }
  return scope + ":" + (prop.startsWith("-") ? fromCamelToKebabCase(prop.slice(1)) : prop.toLowerCase());
};
const createProps = (target, containerState) => createProxy(target, containerState, 2);
const getPropsMutator = (ctx, containerState) => {
  let props = ctx.$props$;
  props || (ctx.$props$ = props = createProps({}, containerState));
  const target = getProxyTarget(props);
  const manager = containerState.$subsManager$.$getLocal$(target);
  return {
    set(prop, value) {
      let oldValue = target[prop];
      isMutable(oldValue) && (oldValue = oldValue.mut), containerState.$mutableProps$ ? isMutable(value) ? (value = value.mut, target[prop] = value) : target[prop] = mutable(value) : (target[prop] = value, isMutable(value) && (value = value.mut, true)), oldValue !== value && manager.$notifySubs$(prop);
    }
  };
};
const inflateQrl = (qrl, elCtx) => (qrl.$capture$, qrl.$captureRef$ = qrl.$capture$.map((idx) => {
  const int = parseInt(idx, 10);
  const obj = elCtx.$refMap$[int];
  return elCtx.$refMap$.length, obj;
}));
const logError = (message, ...optionalParams) => {
  const err = message instanceof Error ? message : new Error(message);
  return "function" == typeof globalThis._handleError && message instanceof Error ? globalThis._handleError(message, optionalParams) : console.error("%cQWIK ERROR", "", err.message, ...printParams(optionalParams), err.stack), err;
};
const logErrorAndStop = (message, ...optionalParams) => logError(message, ...optionalParams);
const logWarn = (message, ...optionalParams) => {
};
const printParams = (optionalParams) => optionalParams;
const QError_stringifyClassOrStyle = 0;
const QError_verifySerializable = 3;
const QError_setProperty = 6;
const QError_notFoundContext = 13;
const QError_useMethodOutsideContext = 14;
const QError_immutableProps = 17;
const QError_useInvokeContext = 20;
const QError_containerAlreadyPaused = 21;
const QError_invalidJsxNodeType = 25;
const QError_trackUseStore = 26;
const QError_missingObjectId = 27;
const qError = (code, ...parts) => {
  const text = codeToText(code);
  return logErrorAndStop(text, ...parts);
};
const codeToText = (code) => `Code(${code})`;
const isQrl$1 = (value) => "function" == typeof value && "function" == typeof value.getSymbol;
const createQRL = (chunk, symbol, symbolRef, symbolFn, capture, captureRef, refSymbol) => {
  let _containerEl;
  const setContainer = (el) => {
    _containerEl || (_containerEl = el);
  };
  const resolve = async (containerEl) => {
    if (containerEl && setContainer(containerEl), symbolRef) {
      return symbolRef;
    }
    if (symbolFn) {
      return symbolRef = symbolFn().then((module2) => symbolRef = module2[symbol]);
    }
    {
      if (!_containerEl) {
        throw new Error(`QRL '${chunk}#${symbol || "default"}' does not have an attached container`);
      }
      const symbol2 = getPlatform().importSymbol(_containerEl, chunk, symbol);
      return symbolRef = then(symbol2, (ref) => symbolRef = ref);
    }
  };
  const resolveLazy = (containerEl) => symbolRef || resolve(containerEl);
  const invokeFn = (currentCtx, beforeFn) => (...args) => {
    const fn = resolveLazy();
    return then(fn, (fn2) => {
      if (isFunction(fn2)) {
        if (beforeFn && false === beforeFn()) {
          return;
        }
        const context = {
          ...createInvokationContext(currentCtx),
          $qrl$: QRL
        };
        return emitUsedSymbol(symbol, context.$element$), invoke(context, fn2, ...args);
      }
      throw qError(10);
    });
  };
  const createInvokationContext = (invoke2) => null == invoke2 ? newInvokeContext() : isArray(invoke2) ? newInvokeContextFromTuple(invoke2) : invoke2;
  const invokeQRL = async function(...args) {
    const fn = invokeFn();
    return await fn(...args);
  };
  const resolvedSymbol = refSymbol != null ? refSymbol : symbol;
  const hash = getSymbolHash$1(resolvedSymbol);
  const QRL = invokeQRL;
  const methods = {
    getSymbol: () => resolvedSymbol,
    getHash: () => hash,
    resolve,
    $resolveLazy$: resolveLazy,
    $setContainer$: setContainer,
    $chunk$: chunk,
    $symbol$: symbol,
    $refSymbol$: refSymbol,
    $hash$: hash,
    getFn: invokeFn,
    $capture$: capture,
    $captureRef$: captureRef
  };
  return Object.assign(invokeQRL, methods);
};
const getSymbolHash$1 = (symbolName) => {
  const index2 = symbolName.lastIndexOf("_");
  return index2 > -1 ? symbolName.slice(index2 + 1) : symbolName;
};
const emitUsedSymbol = (symbol, element) => {
  isServer$1() || "object" != typeof document || document.dispatchEvent(new CustomEvent("qsymbol", {
    bubbles: false,
    detail: {
      symbol,
      element,
      timestamp: performance.now()
    }
  }));
};
let runtimeSymbolId = 0;
const inlinedQrl = (symbol, symbolName, lexicalScopeCapture = EMPTY_ARRAY$1) => createQRL("/inlinedQRL", symbolName, symbol, null, null, lexicalScopeCapture, null);
const stringifyQRL = (qrl, opts = {}) => {
  var _a3;
  let symbol = qrl.$symbol$;
  let chunk = qrl.$chunk$;
  const refSymbol = (_a3 = qrl.$refSymbol$) != null ? _a3 : symbol;
  const platform = getPlatform();
  if (platform) {
    const result = platform.chunkForSymbol(refSymbol);
    result && (chunk = result[1], qrl.$refSymbol$ || (symbol = result[0]));
  }
  chunk.startsWith("./") && (chunk = chunk.slice(2));
  const parts = [chunk];
  symbol && "default" !== symbol && parts.push("#", symbol);
  const capture = qrl.$capture$;
  const captureRef = qrl.$captureRef$;
  if (captureRef && captureRef.length) {
    if (opts.$getObjId$) {
      const capture2 = captureRef.map(opts.$getObjId$);
      parts.push(`[${capture2.join(" ")}]`);
    } else if (opts.$addRefMap$) {
      const capture2 = captureRef.map(opts.$addRefMap$);
      parts.push(`[${capture2.join(" ")}]`);
    }
  } else {
    capture && capture.length > 0 && parts.push(`[${capture.join(" ")}]`);
  }
  return parts.join("");
};
const serializeQRLs = (existingQRLs, elCtx) => {
  var value;
  (function(value2) {
    return value2 && "number" == typeof value2.nodeType;
  })(value = elCtx.$element$) && value.nodeType;
  const opts = {
    $element$: elCtx.$element$,
    $addRefMap$: (obj) => addToArray(elCtx.$refMap$, obj)
  };
  return existingQRLs.map((qrl) => stringifyQRL(qrl, opts)).join("\n");
};
const parseQRL = (qrl, containerEl) => {
  const endIdx = qrl.length;
  const hashIdx = indexOf(qrl, 0, "#");
  const captureIdx = indexOf(qrl, hashIdx, "[");
  const chunkEndIdx = Math.min(hashIdx, captureIdx);
  const chunk = qrl.substring(0, chunkEndIdx);
  const symbolStartIdx = hashIdx == endIdx ? hashIdx : hashIdx + 1;
  const symbolEndIdx = captureIdx;
  const symbol = symbolStartIdx == symbolEndIdx ? "default" : qrl.substring(symbolStartIdx, symbolEndIdx);
  const captureStartIdx = captureIdx;
  const captureEndIdx = endIdx;
  const capture = captureStartIdx === captureEndIdx ? EMPTY_ARRAY$1 : qrl.substring(captureStartIdx + 1, captureEndIdx - 1).split(" ");
  "/runtimeQRL" === chunk && logError(codeToText(2), qrl);
  const iQrl = createQRL(chunk, symbol, null, null, capture, null, null);
  return containerEl && iQrl.$setContainer$(containerEl), iQrl;
};
const indexOf = (text, startIdx, char) => {
  const endIdx = text.length;
  const charIdx = text.indexOf(char, startIdx == endIdx ? 0 : startIdx);
  return -1 == charIdx ? endIdx : charIdx;
};
const addToArray = (array, obj) => {
  const index2 = array.indexOf(obj);
  return -1 === index2 ? (array.push(obj), array.length - 1) : index2;
};
const $ = (expression) => ((symbol, lexicalScopeCapture = EMPTY_ARRAY$1) => createQRL("/runtimeQRL", "s" + runtimeSymbolId++, symbol, null, null, lexicalScopeCapture, null))(expression);
const componentQrl = (onRenderQrl) => {
  function QwikComponent(props, key) {
    const hash = onRenderQrl.$hash$;
    return jsx(Virtual, {
      "q:renderFn": onRenderQrl,
      ...props
    }, hash + ":" + (key || ""));
  }
  return QwikComponent[SERIALIZABLE_STATE] = [onRenderQrl], QwikComponent;
};
const isQwikComponent = (component) => "function" == typeof component && void 0 !== component[SERIALIZABLE_STATE];
const Slot = (props) => {
  var _a3;
  const name = (_a3 = props.name) != null ? _a3 : "";
  return jsx(Virtual, {
    "q:s": ""
  }, name);
};
const renderSSR = async (node, opts) => {
  var _a3;
  const root = opts.containerTagName;
  const containerEl = createContext(1).$element$;
  const containerState = createContainerState(containerEl);
  const rctx = createRenderContext({
    nodeType: 9
  }, containerState);
  const headNodes = (_a3 = opts.beforeContent) != null ? _a3 : [];
  const ssrCtx = {
    rctx,
    $contexts$: [],
    projectedChildren: void 0,
    projectedContext: void 0,
    hostCtx: void 0,
    invocationContext: void 0,
    headNodes: "html" === root ? headNodes : []
  };
  const containerAttributes = {
    ...opts.containerAttributes,
    "q:container": "paused",
    "q:version": "0.9.0",
    "q:render": "ssr",
    "q:base": opts.base,
    children: "html" === root ? [node] : [headNodes, node]
  };
  containerState.$envData$ = {
    url: opts.url,
    ...opts.envData
  }, node = jsx(root, containerAttributes), containerState.$hostsRendering$ = /* @__PURE__ */ new Set(), containerState.$renderPromise$ = Promise.resolve().then(() => renderRoot(node, ssrCtx, opts.stream, containerState, opts)), await containerState.$renderPromise$;
};
const renderRoot = async (node, ssrCtx, stream, containerState, opts) => {
  const beforeClose = opts.beforeClose;
  return await renderNode(node, ssrCtx, stream, 0, beforeClose ? (stream2) => {
    const result = beforeClose(ssrCtx.$contexts$, containerState);
    return processData(result, ssrCtx, stream2, 0, void 0);
  } : void 0), ssrCtx.rctx.$static$;
};
const renderNodeVirtual = (node, elCtx, extraNodes, ssrCtx, stream, flags, beforeClose) => {
  var _a3;
  const props = node.props;
  const renderQrl = props["q:renderFn"];
  if (renderQrl) {
    return elCtx.$renderQrl$ = renderQrl, renderSSRComponent(ssrCtx, stream, elCtx, node, flags, beforeClose);
  }
  let virtualComment = "<!--qv" + renderVirtualAttributes(props);
  const isSlot = "q:s" in props;
  const key = null != node.key ? String(node.key) : null;
  if (isSlot && ((_a3 = ssrCtx.hostCtx) == null ? void 0 : _a3.$id$, virtualComment += " q:sref=" + ssrCtx.hostCtx.$id$), null != key && (virtualComment += " q:key=" + key), virtualComment += "-->", stream.write(virtualComment), extraNodes) {
    for (const node2 of extraNodes) {
      renderNodeElementSync(node2.type, node2.props, stream);
    }
  }
  const promise = walkChildren(props.children, ssrCtx, stream, flags);
  return then(promise, () => {
    var _a4;
    if (!isSlot && !beforeClose) {
      return void stream.write(CLOSE_VIRTUAL);
    }
    let promise2;
    if (isSlot) {
      const content = (_a4 = ssrCtx.projectedChildren) == null ? void 0 : _a4[key];
      content && (ssrCtx.projectedChildren[key] = void 0, promise2 = processData(content, ssrCtx.projectedContext, stream, flags));
    }
    return beforeClose && (promise2 = then(promise2, () => beforeClose(stream))), then(promise2, () => {
      stream.write(CLOSE_VIRTUAL);
    });
  });
};
const CLOSE_VIRTUAL = "<!--/qv-->";
const renderVirtualAttributes = (attributes) => {
  let text = "";
  for (const prop of Object.keys(attributes)) {
    if ("children" === prop) {
      continue;
    }
    const value = attributes[prop];
    null != value && (text += " " + ("" === value ? prop : prop + "=" + value));
  }
  return text;
};
const renderNodeElementSync = (tagName, attributes, stream) => {
  if (stream.write("<" + tagName + ((attributes2) => {
    let text = "";
    for (const prop of Object.keys(attributes2)) {
      if ("dangerouslySetInnerHTML" === prop) {
        continue;
      }
      const value = attributes2[prop];
      null != value && (text += " " + ("" === value ? prop : prop + '="' + value + '"'));
    }
    return text;
  })(attributes) + ">"), !!emptyElements[tagName]) {
    return;
  }
  const innerHTML = attributes.dangerouslySetInnerHTML;
  null != innerHTML && stream.write(innerHTML), stream.write(`</${tagName}>`);
};
const renderSSRComponent = (ssrCtx, stream, elCtx, node, flags, beforeClose) => (setComponentProps(ssrCtx.rctx, elCtx, node.props), then(executeComponent(ssrCtx.rctx, elCtx), (res) => {
  const hostElement = elCtx.$element$;
  const newCtx = res.rctx;
  const invocationContext = newInvokeContext(hostElement, void 0);
  invocationContext.$subscriber$ = hostElement, invocationContext.$renderCtx$ = newCtx;
  const projectedContext = {
    ...ssrCtx,
    rctx: newCtx
  };
  const newSSrContext = {
    ...ssrCtx,
    projectedChildren: splitProjectedChildren(node.props.children, ssrCtx),
    projectedContext,
    rctx: newCtx,
    invocationContext
  };
  const extraNodes = [];
  if (elCtx.$appendStyles$) {
    const array = 4 & flags ? ssrCtx.headNodes : extraNodes;
    for (const style of elCtx.$appendStyles$) {
      array.push(jsx("style", {
        "q:style": style.styleId,
        dangerouslySetInnerHTML: style.content
      }));
    }
  }
  const newID = getNextIndex(ssrCtx.rctx);
  const scopeId = elCtx.$scopeIds$ ? serializeSStyle(elCtx.$scopeIds$) : void 0;
  const processedNode = jsx(node.type, {
    "q:sstyle": scopeId,
    "q:id": newID,
    children: res.node
  }, node.key);
  return elCtx.$id$ = newID, ssrCtx.$contexts$.push(elCtx), newSSrContext.hostCtx = elCtx, renderNodeVirtual(processedNode, elCtx, extraNodes, newSSrContext, stream, flags, (stream2) => beforeClose ? then(renderQTemplates(newSSrContext, stream2), () => beforeClose(stream2)) : renderQTemplates(newSSrContext, stream2));
}));
const renderQTemplates = (ssrContext, stream) => {
  const projectedChildren = ssrContext.projectedChildren;
  if (projectedChildren) {
    const nodes = Object.keys(projectedChildren).map((slotName) => {
      const value = projectedChildren[slotName];
      if (value) {
        return jsx("q:template", {
          [QSlot]: slotName,
          hidden: "",
          "aria-hidden": "true",
          children: value
        });
      }
    });
    return processData(nodes, ssrContext, stream, 0, void 0);
  }
};
const splitProjectedChildren = (children, ssrCtx) => {
  var _a3;
  const flatChildren = flatVirtualChildren(children, ssrCtx);
  if (null === flatChildren) {
    return;
  }
  const slotMap = {};
  for (const child of flatChildren) {
    let slotName = "";
    isJSXNode(child) && (slotName = (_a3 = child.props[QSlot]) != null ? _a3 : "");
    let array = slotMap[slotName];
    array || (slotMap[slotName] = array = []), array.push(child);
  }
  return slotMap;
};
const createContext = (nodeType) => getContext({
  nodeType,
  _qc_: null
});
const renderNode = (node, ssrCtx, stream, flags, beforeClose) => {
  var _a3;
  const tagName = node.type;
  if ("string" == typeof tagName) {
    const key = node.key;
    const props = node.props;
    const elCtx = createContext(1);
    const isHead = "head" === tagName;
    const hostCtx = ssrCtx.hostCtx;
    let openingElement = "<" + tagName + ((elCtx2, attributes) => {
      let text = "";
      for (const prop of Object.keys(attributes)) {
        if ("children" === prop || "key" === prop || "class" === prop || "className" === prop || "dangerouslySetInnerHTML" === prop) {
          continue;
        }
        const value = attributes[prop];
        if ("ref" === prop) {
          value.current = elCtx2.$element$;
          continue;
        }
        if (isOnProp(prop)) {
          setEvent(elCtx2.li, prop, value);
          continue;
        }
        const attrName = processPropKey(prop);
        const attrValue = processPropValue(attrName, value);
        null != attrValue && (text += " " + ("" === value ? attrName : attrName + '="' + escapeAttr(attrValue) + '"'));
      }
      return text;
    })(elCtx, props);
    let classStr = stringifyClass((_a3 = props.class) != null ? _a3 : props.className);
    if (hostCtx && (hostCtx.$scopeIds$ && (classStr = hostCtx.$scopeIds$.join(" ") + " " + classStr), !hostCtx.$attachedListeners$)) {
      hostCtx.$attachedListeners$ = true;
      for (const eventName of Object.keys(hostCtx.li)) {
        addQRLListener(elCtx.li, eventName, hostCtx.li[eventName]);
      }
    }
    isHead && (flags |= 1), classStr = classStr.trim(), classStr && (openingElement += ' class="' + classStr + '"');
    const listeners = Object.keys(elCtx.li);
    for (const key2 of listeners) {
      openingElement += " " + key2 + '="' + serializeQRLs(elCtx.li[key2], elCtx) + '"';
    }
    if (null != key && (openingElement += ' q:key="' + key + '"'), "ref" in props || listeners.length > 0) {
      const newID = getNextIndex(ssrCtx.rctx);
      openingElement += ' q:id="' + newID + '"', elCtx.$id$ = newID, ssrCtx.$contexts$.push(elCtx);
    }
    if (1 & flags && (openingElement += " q:head"), openingElement += ">", stream.write(openingElement), emptyElements[tagName]) {
      return;
    }
    const innerHTML = props.dangerouslySetInnerHTML;
    if (null != innerHTML) {
      return stream.write(String(innerHTML)), void stream.write(`</${tagName}>`);
    }
    isHead || (flags &= -2), "html" === tagName ? flags |= 4 : flags &= -5;
    const promise = processData(props.children, ssrCtx, stream, flags);
    return then(promise, () => {
      if (isHead) {
        for (const node2 of ssrCtx.headNodes) {
          renderNodeElementSync(node2.type, node2.props, stream);
        }
        ssrCtx.headNodes.length = 0;
      }
      if (beforeClose) {
        return then(beforeClose(stream), () => {
          stream.write(`</${tagName}>`);
        });
      }
      stream.write(`</${tagName}>`);
    });
  }
  if (tagName === Virtual) {
    const elCtx = createContext(111);
    return renderNodeVirtual(node, elCtx, void 0, ssrCtx, stream, flags, beforeClose);
  }
  if (tagName === SSRComment) {
    return void stream.write("<!--" + node.props.data + "-->");
  }
  if (tagName === InternalSSRStream) {
    return (async (node2, ssrCtx2, stream2, flags2) => {
      stream2.write("<!--qkssr-f-->");
      const generator = node2.props.children;
      let value;
      if (isFunction(generator)) {
        const v = generator({
          write(chunk) {
            stream2.write(chunk), stream2.write("<!--qkssr-f-->");
          }
        });
        if (isPromise(v)) {
          return v;
        }
        value = v;
      } else {
        value = generator;
      }
      for await (const chunk of value) {
        await processData(chunk, ssrCtx2, stream2, flags2, void 0), stream2.write("<!--qkssr-f-->");
      }
    })(node, ssrCtx, stream, flags);
  }
  const res = invoke(ssrCtx.invocationContext, tagName, node.props, node.key);
  return processData(res, ssrCtx, stream, flags, beforeClose);
};
const processData = (node, ssrCtx, stream, flags, beforeClose) => {
  if (null != node && "boolean" != typeof node) {
    if (isString(node) || "number" == typeof node) {
      stream.write(escapeHtml(String(node)));
    } else {
      if (isJSXNode(node)) {
        return renderNode(node, ssrCtx, stream, flags, beforeClose);
      }
      if (isArray(node)) {
        return walkChildren(node, ssrCtx, stream, flags);
      }
      if (isPromise(node)) {
        return stream.write("<!--qkssr-f-->"), node.then((node2) => processData(node2, ssrCtx, stream, flags, beforeClose));
      }
    }
  }
};
function walkChildren(children, ssrContext, stream, flags) {
  if (null == children) {
    return;
  }
  if (!isArray(children)) {
    return processData(children, ssrContext, stream, flags);
  }
  if (1 === children.length) {
    return processData(children[0], ssrContext, stream, flags);
  }
  if (0 === children.length) {
    return;
  }
  let currentIndex = 0;
  const buffers = [];
  return children.reduce((prevPromise, child, index2) => {
    const buffer = [];
    buffers.push(buffer);
    const rendered = processData(child, ssrContext, prevPromise ? {
      write(chunk) {
        currentIndex === index2 ? stream.write(chunk) : buffer.push(chunk);
      }
    } : stream, flags);
    return isPromise(rendered) || prevPromise ? then(rendered, () => then(prevPromise, () => {
      currentIndex++, buffers.length > currentIndex && buffers[currentIndex].forEach((chunk) => stream.write(chunk));
    })) : void currentIndex++;
  }, void 0);
}
const flatVirtualChildren = (children, ssrCtx) => {
  if (null == children) {
    return null;
  }
  const result = _flatVirtualChildren(children, ssrCtx);
  const nodes = isArray(result) ? result : [result];
  return 0 === nodes.length ? null : nodes;
};
const stringifyClass = (str) => {
  if (!str) {
    return "";
  }
  if ("string" == typeof str) {
    return str;
  }
  if (Array.isArray(str)) {
    return str.join(" ");
  }
  const output = [];
  for (const key in str) {
    Object.prototype.hasOwnProperty.call(str, key) && str[key] && output.push(key);
  }
  return output.join(" ");
};
const _flatVirtualChildren = (children, ssrCtx) => {
  if (null == children) {
    return null;
  }
  if (isArray(children)) {
    return children.flatMap((c) => _flatVirtualChildren(c, ssrCtx));
  }
  if (isJSXNode(children) && isFunction(children.type) && children.type !== SSRComment && children.type !== InternalSSRStream && children.type !== Virtual) {
    const res = invoke(ssrCtx.invocationContext, children.type, children.props, children.key);
    return flatVirtualChildren(res, ssrCtx);
  }
  return children;
};
const setComponentProps = (rctx, ctx, expectProps) => {
  const keys = Object.keys(expectProps);
  if (0 === keys.length) {
    return;
  }
  const target = {};
  ctx.$props$ = createProps(target, rctx.$static$.$containerState$);
  for (const key of keys) {
    "children" !== key && "q:renderFn" !== key && (target[key] = expectProps[key]);
  }
};
function processPropKey(prop) {
  return "htmlFor" === prop ? "for" : prop;
}
function processPropValue(prop, value) {
  return "style" === prop ? stringifyStyle(value) : false === value || null == value ? null : true === value ? "" : String(value);
}
const emptyElements = {
  area: true,
  base: true,
  basefont: true,
  bgsound: true,
  br: true,
  col: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};
const ESCAPE_HTML = /[&<>]/g;
const ESCAPE_ATTRIBUTES = /[&"]/g;
const escapeHtml = (s2) => s2.replace(ESCAPE_HTML, (c) => {
  switch (c) {
    case "&":
      return "&amp;";
    case "<":
      return "&lt;";
    case ">":
      return "&gt;";
    default:
      return "";
  }
});
const escapeAttr = (s2) => s2.replace(ESCAPE_ATTRIBUTES, (c) => {
  switch (c) {
    case "&":
      return "&amp;";
    case '"':
      return "&quot;";
    default:
      return "";
  }
});
const useStore = (initialState, opts) => {
  var _a3;
  const { get, set, ctx } = useSequentialScope();
  if (null != get) {
    return get;
  }
  const value = isFunction(initialState) ? initialState() : initialState;
  if (false === (opts == null ? void 0 : opts.reactive)) {
    return set(value), value;
  }
  {
    const containerState = ctx.$renderCtx$.$static$.$containerState$;
    const newStore = createProxy(value, containerState, ((_a3 = opts == null ? void 0 : opts.recursive) != null ? _a3 : false) ? 1 : 0, void 0);
    return set(newStore), newStore;
  }
};
function useEnvData(key, defaultValue) {
  var _a3;
  return (_a3 = useInvokeContext().$renderCtx$.$static$.$containerState$.$envData$[key]) != null ? _a3 : defaultValue;
}
const STYLE_CACHE = /* @__PURE__ */ new Map();
const getScopedStyles = (css, scopeId) => {
  let styleCss = STYLE_CACHE.get(scopeId);
  return styleCss || STYLE_CACHE.set(scopeId, styleCss = scopeStylesheet(css, scopeId)), styleCss;
};
const scopeStylesheet = (css, scopeId) => {
  const end = css.length;
  const out = [];
  const stack = [];
  let idx = 0;
  let lastIdx = idx;
  let mode = rule;
  let lastCh = 0;
  for (; idx < end; ) {
    let ch = css.charCodeAt(idx++);
    ch === BACKSLASH && (idx++, ch = A$1);
    const arcs = STATE_MACHINE[mode];
    for (let i2 = 0; i2 < arcs.length; i2++) {
      const arc = arcs[i2];
      const [expectLastCh, expectCh, newMode] = arc;
      if ((expectLastCh === lastCh || expectLastCh === ANY || expectLastCh === IDENT && isIdent(lastCh) || expectLastCh === WHITESPACE && isWhiteSpace(lastCh)) && (expectCh === ch || expectCh === ANY || expectCh === IDENT && isIdent(ch) || expectCh === NOT_IDENT && !isIdent(ch) && ch !== DOT || expectCh === WHITESPACE && isWhiteSpace(ch)) && (3 == arc.length || lookAhead(arc))) {
        if (arc.length > 3 && (ch = css.charCodeAt(idx - 1)), newMode === EXIT || newMode == EXIT_INSERT_SCOPE) {
          newMode === EXIT_INSERT_SCOPE && (mode !== starSelector || shouldNotInsertScoping() ? isChainedSelector(ch) || insertScopingSelector(idx - (expectCh == NOT_IDENT ? 1 : expectCh == CLOSE_PARENTHESIS ? 2 : 0)) : (isChainedSelector(ch) ? flush(idx - 2) : insertScopingSelector(idx - 2), lastIdx++)), expectCh === NOT_IDENT && (idx--, ch = lastCh);
          do {
            mode = stack.pop() || rule, mode === pseudoGlobal && (flush(idx - 1), lastIdx++);
          } while (isSelfClosingRule(mode));
        } else {
          stack.push(mode), mode === pseudoGlobal && newMode === rule ? (flush(idx - 8), lastIdx = idx) : newMode === pseudoElement && insertScopingSelector(idx - 2), mode = newMode;
        }
        break;
      }
    }
    lastCh = ch;
  }
  return flush(idx), out.join("");
  function flush(idx2) {
    out.push(css.substring(lastIdx, idx2)), lastIdx = idx2;
  }
  function insertScopingSelector(idx2) {
    mode === pseudoGlobal || shouldNotInsertScoping() || (flush(idx2), out.push(".", "\u2B50\uFE0F", scopeId));
  }
  function lookAhead(arc) {
    let prefix = 0;
    if (css.charCodeAt(idx) === DASH) {
      for (let i2 = 1; i2 < 10; i2++) {
        if (css.charCodeAt(idx + i2) === DASH) {
          prefix = i2 + 1;
          break;
        }
      }
    }
    words:
      for (let arcIndx = 3; arcIndx < arc.length; arcIndx++) {
        const txt = arc[arcIndx];
        for (let i2 = 0; i2 < txt.length; i2++) {
          if ((css.charCodeAt(idx + i2 + prefix) | LOWERCASE) !== txt.charCodeAt(i2)) {
            continue words;
          }
        }
        return idx += txt.length + prefix, true;
      }
    return false;
  }
  function shouldNotInsertScoping() {
    return -1 !== stack.indexOf(pseudoGlobal) || -1 !== stack.indexOf(atRuleSelector);
  }
};
const isIdent = (ch) => ch >= _0 && ch <= _9 || ch >= A$1 && ch <= Z$1 || ch >= a && ch <= z || ch >= 128 || ch === UNDERSCORE || ch === DASH;
const isChainedSelector = (ch) => ch === COLON$1 || ch === DOT || ch === OPEN_BRACKET || ch === HASH || isIdent(ch);
const isSelfClosingRule = (mode) => mode === atRuleBlock || mode === atRuleSelector || mode === atRuleInert || mode === pseudoGlobal;
const isWhiteSpace = (ch) => ch === SPACE$1 || ch === TAB || ch === NEWLINE || ch === CARRIAGE_RETURN;
const rule = 0;
const starSelector = 2;
const pseudoGlobal = 5;
const pseudoElement = 6;
const atRuleSelector = 10;
const atRuleBlock = 11;
const atRuleInert = 12;
const EXIT = 17;
const EXIT_INSERT_SCOPE = 18;
const ANY = 0;
const IDENT = 1;
const NOT_IDENT = 2;
const WHITESPACE = 3;
const TAB = 9;
const NEWLINE = 10;
const CARRIAGE_RETURN = 13;
const SPACE$1 = 32;
const HASH = 35;
const CLOSE_PARENTHESIS = 41;
const DASH = 45;
const DOT = 46;
const _0 = 48;
const _9 = 57;
const COLON$1 = 58;
const A$1 = 65;
const Z$1 = 90;
const OPEN_BRACKET = 91;
const BACKSLASH = 92;
const UNDERSCORE = 95;
const LOWERCASE = 32;
const a = 97;
const z = 122;
const STRINGS_COMMENTS = [[ANY, 39, 14], [ANY, 34, 15], [ANY, 47, 16, "*"]];
const STATE_MACHINE = [[[ANY, 42, starSelector], [ANY, OPEN_BRACKET, 7], [ANY, COLON$1, pseudoElement, ":"], [ANY, COLON$1, pseudoGlobal, "global"], [ANY, COLON$1, 3, "has", "host-context", "not", "where", "is", "matches", "any"], [ANY, COLON$1, 4], [ANY, IDENT, 1], [ANY, DOT, 1], [ANY, HASH, 1], [ANY, 64, atRuleSelector, "keyframe"], [ANY, 64, atRuleBlock, "media", "supports"], [ANY, 64, atRuleInert], [ANY, 123, 13], [47, 42, 16], [ANY, 59, EXIT], [ANY, 125, EXIT], [ANY, CLOSE_PARENTHESIS, EXIT], ...STRINGS_COMMENTS], [[ANY, NOT_IDENT, EXIT_INSERT_SCOPE]], [[ANY, NOT_IDENT, EXIT_INSERT_SCOPE]], [[ANY, 40, rule], [ANY, NOT_IDENT, EXIT_INSERT_SCOPE]], [[ANY, 40, 8], [ANY, NOT_IDENT, EXIT_INSERT_SCOPE]], [[ANY, 40, rule], [ANY, NOT_IDENT, EXIT]], [[ANY, NOT_IDENT, EXIT]], [[ANY, 93, EXIT_INSERT_SCOPE], [ANY, 39, 14], [ANY, 34, 15]], [[ANY, CLOSE_PARENTHESIS, EXIT], ...STRINGS_COMMENTS], [[ANY, 125, EXIT], ...STRINGS_COMMENTS], [[ANY, 125, EXIT], [WHITESPACE, IDENT, 1], [ANY, COLON$1, pseudoGlobal, "global"], [ANY, 123, 13], ...STRINGS_COMMENTS], [[ANY, 123, rule], [ANY, 59, EXIT], ...STRINGS_COMMENTS], [[ANY, 59, EXIT], [ANY, 123, 9], ...STRINGS_COMMENTS], [[ANY, 125, EXIT], [ANY, 123, 13], [ANY, 40, 8], ...STRINGS_COMMENTS], [[ANY, 39, EXIT]], [[ANY, 34, EXIT]], [[42, 47, EXIT]]];
const useStylesScopedQrl = (styles2) => {
  _useStyles(styles2, getScopedStyles, true);
};
const _useStyles = (styleQrl, transform, scoped) => {
  const { get, set, ctx, i: i2 } = useSequentialScope();
  if (get) {
    return get;
  }
  const renderCtx = ctx.$renderCtx$;
  const styleId = (index2 = i2, `${((text, hash = 0) => {
    if (0 === text.length) {
      return hash;
    }
    for (let i3 = 0; i3 < text.length; i3++) {
      hash = (hash << 5) - hash + text.charCodeAt(i3), hash |= 0;
    }
    return Number(Math.abs(hash)).toString(36);
  })(styleQrl.$hash$)}-${index2}`);
  var index2;
  const containerState = renderCtx.$static$.$containerState$;
  const elCtx = getContext(ctx.$hostElement$);
  if (set(styleId), elCtx.$appendStyles$ || (elCtx.$appendStyles$ = []), elCtx.$scopeIds$ || (elCtx.$scopeIds$ = []), scoped && elCtx.$scopeIds$.push(((styleId2) => "\u2B50\uFE0F" + styleId2)(styleId)), ((containerState2, styleId2) => containerState2.$styleIds$.has(styleId2))(containerState, styleId)) {
    return styleId;
  }
  containerState.$styleIds$.add(styleId);
  const value = styleQrl.$resolveLazy$(containerState.$containerEl$);
  const appendStyle = (styleText) => {
    elCtx.$appendStyles$, elCtx.$appendStyles$.push({
      styleId,
      content: transform(styleText, styleId)
    });
  };
  return isPromise(value) ? ctx.$waitOn$.push(value.then(appendStyle)) : appendStyle(value), styleId;
};
const styles = "header{}";
const Header = /* @__PURE__ */ componentQrl(inlinedQrl(() => {
  useStylesScopedQrl(inlinedQrl(styles, "s_N39ca0w8E8Y"));
  return /* @__PURE__ */ jsx("header", {
    children: /* @__PURE__ */ jsx("nav", {
      children: /* @__PURE__ */ jsx("ul", {
        children: [
          /* @__PURE__ */ jsx("li", {
            children: "Landing"
          }),
          /* @__PURE__ */ jsx("li", {
            children: "Quem somos"
          }),
          /* @__PURE__ */ jsx("li", {
            children: "Portif\xF3lio"
          }),
          /* @__PURE__ */ jsx("span", {
            id: "n-items",
            children: "(0)"
          })
        ]
      })
    })
  });
}, "s_ceU05TscGYE"));
const layout = /* @__PURE__ */ componentQrl(inlinedQrl(() => {
  return /* @__PURE__ */ jsx(Fragment, {
    children: [
      /* @__PURE__ */ jsx("main", {
        children: [
          /* @__PURE__ */ jsx(Header, {}),
          /* @__PURE__ */ jsx("section", {
            children: /* @__PURE__ */ jsx(Slot, {})
          })
        ]
      }),
      /* @__PURE__ */ jsx("footer", {
        children: /* @__PURE__ */ jsx("h3", {
          className: "rodape-text",
          children: "Agradecimentos a todos que me d\xE3o for\xE7a"
        })
      })
    ]
  });
}, "s_VkLNXphUh5s"));
const Layout_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: layout
}, Symbol.toStringTag, { value: "Module" }));
const index$2 = /* @__PURE__ */ componentQrl(inlinedQrl(() => {
  return /* @__PURE__ */ jsx("div", {
    id: "content",
    children: "conte\xFAdo do index"
  });
}, "s_xYL1qOwPyDI"));
const head = {
  title: "Welcome to Qwik"
};
const Index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$2,
  head
}, Symbol.toStringTag, { value: "Module" }));
const index$1 = /* @__PURE__ */ componentQrl(inlinedQrl(() => {
  return /* @__PURE__ */ jsx("div", {
    id: ""
  });
}, "s_hGK5aNZYjtw"));
const Portifolio = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$1
}, Symbol.toStringTag, { value: "Module" }));
const index = /* @__PURE__ */ componentQrl(inlinedQrl(() => {
  return /* @__PURE__ */ jsx("div", {
    id: ""
  });
}, "s_flbgQB75nqU"));
const Quemsomos = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" }));
const Layout = () => Layout_;
const routes = [
  [/^\/$/, [Layout, () => Index], void 0, "/", ["q-575e952f.js", "q-66ca9794.js"]],
  [/^\/portifolio\/?$/, [Layout, () => Portifolio], void 0, "/portifolio", ["q-575e952f.js", "q-48c51b28.js"]],
  [/^\/quemsomos\/?$/, [Layout, () => Quemsomos], void 0, "/quemsomos", ["q-575e952f.js", "q-3a1d161c.js"]]
];
const menus = [];
const trailingSlash = false;
const basePathname = "/";
const cacheModules = true;
const _qwikCityPlan = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  routes,
  menus,
  trailingSlash,
  basePathname,
  cacheModules
}, Symbol.toStringTag, { value: "Module" }));
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var ponyfill_es2018 = { exports: {} };
var hasRequiredPonyfill_es2018;
function requirePonyfill_es2018() {
  if (hasRequiredPonyfill_es2018)
    return ponyfill_es2018.exports;
  hasRequiredPonyfill_es2018 = 1;
  (function(module2, exports2) {
    (function(global2, factory) {
      factory(exports2);
    })(commonjsGlobal, function(exports3) {
      const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
      function noop2() {
        return void 0;
      }
      function getGlobals() {
        if (typeof self !== "undefined") {
          return self;
        } else if (typeof window !== "undefined") {
          return window;
        } else if (typeof commonjsGlobal !== "undefined") {
          return commonjsGlobal;
        }
        return void 0;
      }
      const globals = getGlobals();
      function typeIsObject(x2) {
        return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
      }
      const rethrowAssertionErrorRejection = noop2;
      const originalPromise = Promise;
      const originalPromiseThen = Promise.prototype.then;
      const originalPromiseResolve = Promise.resolve.bind(originalPromise);
      const originalPromiseReject = Promise.reject.bind(originalPromise);
      function newPromise(executor) {
        return new originalPromise(executor);
      }
      function promiseResolvedWith(value) {
        return originalPromiseResolve(value);
      }
      function promiseRejectedWith(reason) {
        return originalPromiseReject(reason);
      }
      function PerformPromiseThen(promise, onFulfilled, onRejected) {
        return originalPromiseThen.call(promise, onFulfilled, onRejected);
      }
      function uponPromise(promise, onFulfilled, onRejected) {
        PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
      }
      function uponFulfillment(promise, onFulfilled) {
        uponPromise(promise, onFulfilled);
      }
      function uponRejection(promise, onRejected) {
        uponPromise(promise, void 0, onRejected);
      }
      function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
        return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
      }
      function setPromiseIsHandledToTrue(promise) {
        PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
      }
      const queueMicrotask = (() => {
        const globalQueueMicrotask = globals && globals.queueMicrotask;
        if (typeof globalQueueMicrotask === "function") {
          return globalQueueMicrotask;
        }
        const resolvedPromise = promiseResolvedWith(void 0);
        return (fn) => PerformPromiseThen(resolvedPromise, fn);
      })();
      function reflectCall(F2, V, args) {
        if (typeof F2 !== "function") {
          throw new TypeError("Argument is not a function");
        }
        return Function.prototype.apply.call(F2, V, args);
      }
      function promiseCall(F2, V, args) {
        try {
          return promiseResolvedWith(reflectCall(F2, V, args));
        } catch (value) {
          return promiseRejectedWith(value);
        }
      }
      const QUEUE_MAX_ARRAY_SIZE = 16384;
      class SimpleQueue {
        constructor() {
          this._cursor = 0;
          this._size = 0;
          this._front = {
            _elements: [],
            _next: void 0
          };
          this._back = this._front;
          this._cursor = 0;
          this._size = 0;
        }
        get length() {
          return this._size;
        }
        push(element) {
          const oldBack = this._back;
          let newBack = oldBack;
          if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
            newBack = {
              _elements: [],
              _next: void 0
            };
          }
          oldBack._elements.push(element);
          if (newBack !== oldBack) {
            this._back = newBack;
            oldBack._next = newBack;
          }
          ++this._size;
        }
        shift() {
          const oldFront = this._front;
          let newFront = oldFront;
          const oldCursor = this._cursor;
          let newCursor = oldCursor + 1;
          const elements = oldFront._elements;
          const element = elements[oldCursor];
          if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
            newFront = oldFront._next;
            newCursor = 0;
          }
          --this._size;
          this._cursor = newCursor;
          if (oldFront !== newFront) {
            this._front = newFront;
          }
          elements[oldCursor] = void 0;
          return element;
        }
        forEach(callback) {
          let i2 = this._cursor;
          let node = this._front;
          let elements = node._elements;
          while (i2 !== elements.length || node._next !== void 0) {
            if (i2 === elements.length) {
              node = node._next;
              elements = node._elements;
              i2 = 0;
              if (elements.length === 0) {
                break;
              }
            }
            callback(elements[i2]);
            ++i2;
          }
        }
        peek() {
          const front = this._front;
          const cursor = this._cursor;
          return front._elements[cursor];
        }
      }
      function ReadableStreamReaderGenericInitialize(reader, stream) {
        reader._ownerReadableStream = stream;
        stream._reader = reader;
        if (stream._state === "readable") {
          defaultReaderClosedPromiseInitialize(reader);
        } else if (stream._state === "closed") {
          defaultReaderClosedPromiseInitializeAsResolved(reader);
        } else {
          defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
        }
      }
      function ReadableStreamReaderGenericCancel(reader, reason) {
        const stream = reader._ownerReadableStream;
        return ReadableStreamCancel(stream, reason);
      }
      function ReadableStreamReaderGenericRelease(reader) {
        if (reader._ownerReadableStream._state === "readable") {
          defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        } else {
          defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        }
        reader._ownerReadableStream._reader = void 0;
        reader._ownerReadableStream = void 0;
      }
      function readerLockException(name) {
        return new TypeError("Cannot " + name + " a stream using a released reader");
      }
      function defaultReaderClosedPromiseInitialize(reader) {
        reader._closedPromise = newPromise((resolve, reject) => {
          reader._closedPromise_resolve = resolve;
          reader._closedPromise_reject = reject;
        });
      }
      function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseReject(reader, reason);
      }
      function defaultReaderClosedPromiseInitializeAsResolved(reader) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseResolve(reader);
      }
      function defaultReaderClosedPromiseReject(reader, reason) {
        if (reader._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(reader._closedPromise);
        reader._closedPromise_reject(reason);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      function defaultReaderClosedPromiseResetToRejected(reader, reason) {
        defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
      }
      function defaultReaderClosedPromiseResolve(reader) {
        if (reader._closedPromise_resolve === void 0) {
          return;
        }
        reader._closedPromise_resolve(void 0);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
      const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
      const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
      const PullSteps = SymbolPolyfill("[[PullSteps]]");
      const NumberIsFinite = Number.isFinite || function(x2) {
        return typeof x2 === "number" && isFinite(x2);
      };
      const MathTrunc = Math.trunc || function(v) {
        return v < 0 ? Math.ceil(v) : Math.floor(v);
      };
      function isDictionary(x2) {
        return typeof x2 === "object" || typeof x2 === "function";
      }
      function assertDictionary(obj, context) {
        if (obj !== void 0 && !isDictionary(obj)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertFunction(x2, context) {
        if (typeof x2 !== "function") {
          throw new TypeError(`${context} is not a function.`);
        }
      }
      function isObject2(x2) {
        return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
      }
      function assertObject(x2, context) {
        if (!isObject2(x2)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertRequiredArgument(x2, position, context) {
        if (x2 === void 0) {
          throw new TypeError(`Parameter ${position} is required in '${context}'.`);
        }
      }
      function assertRequiredField(x2, field, context) {
        if (x2 === void 0) {
          throw new TypeError(`${field} is required in '${context}'.`);
        }
      }
      function convertUnrestrictedDouble(value) {
        return Number(value);
      }
      function censorNegativeZero(x2) {
        return x2 === 0 ? 0 : x2;
      }
      function integerPart(x2) {
        return censorNegativeZero(MathTrunc(x2));
      }
      function convertUnsignedLongLongWithEnforceRange(value, context) {
        const lowerBound = 0;
        const upperBound = Number.MAX_SAFE_INTEGER;
        let x2 = Number(value);
        x2 = censorNegativeZero(x2);
        if (!NumberIsFinite(x2)) {
          throw new TypeError(`${context} is not a finite number`);
        }
        x2 = integerPart(x2);
        if (x2 < lowerBound || x2 > upperBound) {
          throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
        }
        if (!NumberIsFinite(x2) || x2 === 0) {
          return 0;
        }
        return x2;
      }
      function assertReadableStream(x2, context) {
        if (!IsReadableStream(x2)) {
          throw new TypeError(`${context} is not a ReadableStream.`);
        }
      }
      function AcquireReadableStreamDefaultReader(stream) {
        return new ReadableStreamDefaultReader(stream);
      }
      function ReadableStreamAddReadRequest(stream, readRequest) {
        stream._reader._readRequests.push(readRequest);
      }
      function ReadableStreamFulfillReadRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readRequest = reader._readRequests.shift();
        if (done) {
          readRequest._closeSteps();
        } else {
          readRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadRequests(stream) {
        return stream._reader._readRequests.length;
      }
      function ReadableStreamHasDefaultReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamDefaultReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamDefaultReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readRequests = new SimpleQueue();
        }
        get closed() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        cancel(reason = void 0) {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        read() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("read"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: () => resolvePromise({ value: void 0, done: true }),
            _errorSteps: (e2) => rejectPromise(e2)
          };
          ReadableStreamDefaultReaderRead(this, readRequest);
          return promise;
        }
        releaseLock() {
          if (!IsReadableStreamDefaultReader(this)) {
            throw defaultReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          if (this._readRequests.length > 0) {
            throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
          }
          ReadableStreamReaderGenericRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamDefaultReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamDefaultReader",
          configurable: true
        });
      }
      function IsReadableStreamDefaultReader(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
          return false;
        }
        return x2 instanceof ReadableStreamDefaultReader;
      }
      function ReadableStreamDefaultReaderRead(reader, readRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "closed") {
          readRequest._closeSteps();
        } else if (stream._state === "errored") {
          readRequest._errorSteps(stream._storedError);
        } else {
          stream._readableStreamController[PullSteps](readRequest);
        }
      }
      function defaultReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
      }
      const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
      }).prototype);
      class ReadableStreamAsyncIteratorImpl {
        constructor(reader, preventCancel) {
          this._ongoingPromise = void 0;
          this._isFinished = false;
          this._reader = reader;
          this._preventCancel = preventCancel;
        }
        next() {
          const nextSteps = () => this._nextSteps();
          this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
          return this._ongoingPromise;
        }
        return(value) {
          const returnSteps = () => this._returnSteps(value);
          return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
        }
        _nextSteps() {
          if (this._isFinished) {
            return Promise.resolve({ value: void 0, done: true });
          }
          const reader = this._reader;
          if (reader._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("iterate"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => {
              this._ongoingPromise = void 0;
              queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
            },
            _closeSteps: () => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              resolvePromise({ value: void 0, done: true });
            },
            _errorSteps: (reason) => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              rejectPromise(reason);
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promise;
        }
        _returnSteps(value) {
          if (this._isFinished) {
            return Promise.resolve({ value, done: true });
          }
          this._isFinished = true;
          const reader = this._reader;
          if (reader._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("finish iterating"));
          }
          if (!this._preventCancel) {
            const result = ReadableStreamReaderGenericCancel(reader, value);
            ReadableStreamReaderGenericRelease(reader);
            return transformPromiseWith(result, () => ({ value, done: true }));
          }
          ReadableStreamReaderGenericRelease(reader);
          return promiseResolvedWith({ value, done: true });
        }
      }
      const ReadableStreamAsyncIteratorPrototype = {
        next() {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
          }
          return this._asyncIteratorImpl.next();
        },
        return(value) {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
          }
          return this._asyncIteratorImpl.return(value);
        }
      };
      if (AsyncIteratorPrototype !== void 0) {
        Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
      }
      function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
        const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
        iterator._asyncIteratorImpl = impl;
        return iterator;
      }
      function IsReadableStreamAsyncIterator(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
          return false;
        }
        try {
          return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
        } catch (_a3) {
          return false;
        }
      }
      function streamAsyncIteratorBrandCheckException(name) {
        return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
      }
      const NumberIsNaN = Number.isNaN || function(x2) {
        return x2 !== x2;
      };
      function CreateArrayFromList(elements) {
        return elements.slice();
      }
      function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
        new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
      }
      function TransferArrayBuffer(O) {
        return O;
      }
      function IsDetachedBuffer(O) {
        return false;
      }
      function ArrayBufferSlice(buffer, begin, end) {
        if (buffer.slice) {
          return buffer.slice(begin, end);
        }
        const length = end - begin;
        const slice = new ArrayBuffer(length);
        CopyDataBlockBytes(slice, 0, buffer, begin, length);
        return slice;
      }
      function IsNonNegativeNumber(v) {
        if (typeof v !== "number") {
          return false;
        }
        if (NumberIsNaN(v)) {
          return false;
        }
        if (v < 0) {
          return false;
        }
        return true;
      }
      function CloneAsUint8Array(O) {
        const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
        return new Uint8Array(buffer);
      }
      function DequeueValue(container) {
        const pair = container._queue.shift();
        container._queueTotalSize -= pair.size;
        if (container._queueTotalSize < 0) {
          container._queueTotalSize = 0;
        }
        return pair.value;
      }
      function EnqueueValueWithSize(container, value, size) {
        if (!IsNonNegativeNumber(size) || size === Infinity) {
          throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
        }
        container._queue.push({ value, size });
        container._queueTotalSize += size;
      }
      function PeekQueueValue(container) {
        const pair = container._queue.peek();
        return pair.value;
      }
      function ResetQueue(container) {
        container._queue = new SimpleQueue();
        container._queueTotalSize = 0;
      }
      class ReadableStreamBYOBRequest {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get view() {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("view");
          }
          return this._view;
        }
        respond(bytesWritten) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respond");
          }
          assertRequiredArgument(bytesWritten, 1, "respond");
          bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(this._view.buffer))
            ;
          ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
        }
        respondWithNewView(view) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respondWithNewView");
          }
          assertRequiredArgument(view, 1, "respondWithNewView");
          if (!ArrayBuffer.isView(view)) {
            throw new TypeError("You can only respond with array buffer views");
          }
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(view.buffer))
            ;
          ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
        }
      }
      Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
        respond: { enumerable: true },
        respondWithNewView: { enumerable: true },
        view: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamBYOBRequest",
          configurable: true
        });
      }
      class ReadableByteStreamController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get byobRequest() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("byobRequest");
          }
          return ReadableByteStreamControllerGetBYOBRequest(this);
        }
        get desiredSize() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("desiredSize");
          }
          return ReadableByteStreamControllerGetDesiredSize(this);
        }
        close() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("close");
          }
          if (this._closeRequested) {
            throw new TypeError("The stream has already been closed; do not close it again!");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
          }
          ReadableByteStreamControllerClose(this);
        }
        enqueue(chunk) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("enqueue");
          }
          assertRequiredArgument(chunk, 1, "enqueue");
          if (!ArrayBuffer.isView(chunk)) {
            throw new TypeError("chunk must be an array buffer view");
          }
          if (chunk.byteLength === 0) {
            throw new TypeError("chunk must have non-zero byteLength");
          }
          if (chunk.buffer.byteLength === 0) {
            throw new TypeError(`chunk's buffer must have non-zero byteLength`);
          }
          if (this._closeRequested) {
            throw new TypeError("stream is closed or draining");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
          }
          ReadableByteStreamControllerEnqueue(this, chunk);
        }
        error(e2 = void 0) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("error");
          }
          ReadableByteStreamControllerError(this, e2);
        }
        [CancelSteps](reason) {
          ReadableByteStreamControllerClearPendingPullIntos(this);
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableByteStreamControllerClearAlgorithms(this);
          return result;
        }
        [PullSteps](readRequest) {
          const stream = this._controlledReadableByteStream;
          if (this._queueTotalSize > 0) {
            const entry = this._queue.shift();
            this._queueTotalSize -= entry.byteLength;
            ReadableByteStreamControllerHandleQueueDrain(this);
            const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
            readRequest._chunkSteps(view);
            return;
          }
          const autoAllocateChunkSize = this._autoAllocateChunkSize;
          if (autoAllocateChunkSize !== void 0) {
            let buffer;
            try {
              buffer = new ArrayBuffer(autoAllocateChunkSize);
            } catch (bufferE) {
              readRequest._errorSteps(bufferE);
              return;
            }
            const pullIntoDescriptor = {
              buffer,
              bufferByteLength: autoAllocateChunkSize,
              byteOffset: 0,
              byteLength: autoAllocateChunkSize,
              bytesFilled: 0,
              elementSize: 1,
              viewConstructor: Uint8Array,
              readerType: "default"
            };
            this._pendingPullIntos.push(pullIntoDescriptor);
          }
          ReadableStreamAddReadRequest(stream, readRequest);
          ReadableByteStreamControllerCallPullIfNeeded(this);
        }
      }
      Object.defineProperties(ReadableByteStreamController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        byobRequest: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableByteStreamController",
          configurable: true
        });
      }
      function IsReadableByteStreamController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
          return false;
        }
        return x2 instanceof ReadableByteStreamController;
      }
      function IsReadableStreamBYOBRequest(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
          return false;
        }
        return x2 instanceof ReadableStreamBYOBRequest;
      }
      function ReadableByteStreamControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }, (e2) => {
          ReadableByteStreamControllerError(controller, e2);
        });
      }
      function ReadableByteStreamControllerClearPendingPullIntos(controller) {
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        controller._pendingPullIntos = new SimpleQueue();
      }
      function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
        let done = false;
        if (stream._state === "closed") {
          done = true;
        }
        const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === "default") {
          ReadableStreamFulfillReadRequest(stream, filledView, done);
        } else {
          ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
        }
      }
      function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
        const bytesFilled = pullIntoDescriptor.bytesFilled;
        const elementSize = pullIntoDescriptor.elementSize;
        return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
      }
      function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
        controller._queue.push({ buffer, byteOffset, byteLength });
        controller._queueTotalSize += byteLength;
      }
      function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
        const elementSize = pullIntoDescriptor.elementSize;
        const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
        const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
        const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
        const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
        let totalBytesToCopyRemaining = maxBytesToCopy;
        let ready = false;
        if (maxAlignedBytes > currentAlignedBytes) {
          totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
          ready = true;
        }
        const queue = controller._queue;
        while (totalBytesToCopyRemaining > 0) {
          const headOfQueue = queue.peek();
          const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
          const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
          if (headOfQueue.byteLength === bytesToCopy) {
            queue.shift();
          } else {
            headOfQueue.byteOffset += bytesToCopy;
            headOfQueue.byteLength -= bytesToCopy;
          }
          controller._queueTotalSize -= bytesToCopy;
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
          totalBytesToCopyRemaining -= bytesToCopy;
        }
        return ready;
      }
      function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
        pullIntoDescriptor.bytesFilled += size;
      }
      function ReadableByteStreamControllerHandleQueueDrain(controller) {
        if (controller._queueTotalSize === 0 && controller._closeRequested) {
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(controller._controlledReadableByteStream);
        } else {
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
      }
      function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
        if (controller._byobRequest === null) {
          return;
        }
        controller._byobRequest._associatedReadableByteStreamController = void 0;
        controller._byobRequest._view = null;
        controller._byobRequest = null;
      }
      function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
        while (controller._pendingPullIntos.length > 0) {
          if (controller._queueTotalSize === 0) {
            return;
          }
          const pullIntoDescriptor = controller._pendingPullIntos.peek();
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
        const stream = controller._controlledReadableByteStream;
        let elementSize = 1;
        if (view.constructor !== DataView) {
          elementSize = view.constructor.BYTES_PER_ELEMENT;
        }
        const ctor = view.constructor;
        const buffer = TransferArrayBuffer(view.buffer);
        const pullIntoDescriptor = {
          buffer,
          bufferByteLength: buffer.byteLength,
          byteOffset: view.byteOffset,
          byteLength: view.byteLength,
          bytesFilled: 0,
          elementSize,
          viewConstructor: ctor,
          readerType: "byob"
        };
        if (controller._pendingPullIntos.length > 0) {
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          return;
        }
        if (stream._state === "closed") {
          const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
          readIntoRequest._closeSteps(emptyView);
          return;
        }
        if (controller._queueTotalSize > 0) {
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
            ReadableByteStreamControllerHandleQueueDrain(controller);
            readIntoRequest._chunkSteps(filledView);
            return;
          }
          if (controller._closeRequested) {
            const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e2);
            readIntoRequest._errorSteps(e2);
            return;
          }
        }
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
        const stream = controller._controlledReadableByteStream;
        if (ReadableStreamHasBYOBReader(stream)) {
          while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
        if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
          return;
        }
        ReadableByteStreamControllerShiftPendingPullInto(controller);
        const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
        if (remainderSize > 0) {
          const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
        }
        pullIntoDescriptor.bytesFilled -= remainderSize;
        ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
      }
      function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          ReadableByteStreamControllerRespondInClosedState(controller);
        } else {
          ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerShiftPendingPullInto(controller) {
        const descriptor = controller._pendingPullIntos.shift();
        return descriptor;
      }
      function ReadableByteStreamControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return false;
        }
        if (controller._closeRequested) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableByteStreamControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
      }
      function ReadableByteStreamControllerClose(controller) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        if (controller._queueTotalSize > 0) {
          controller._closeRequested = true;
          return;
        }
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (firstPendingPullInto.bytesFilled > 0) {
            const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e2);
            throw e2;
          }
        }
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
      }
      function ReadableByteStreamControllerEnqueue(controller, chunk) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        const buffer = chunk.buffer;
        const byteOffset = chunk.byteOffset;
        const byteLength = chunk.byteLength;
        const transferredBuffer = TransferArrayBuffer(buffer);
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (IsDetachedBuffer(firstPendingPullInto.buffer))
            ;
          firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
        }
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        if (ReadableStreamHasDefaultReader(stream)) {
          if (ReadableStreamGetNumReadRequests(stream) === 0) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          } else {
            if (controller._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
            }
            const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
            ReadableStreamFulfillReadRequest(stream, transferredView, false);
          }
        } else if (ReadableStreamHasBYOBReader(stream)) {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        } else {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerError(controller, e2) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return;
        }
        ReadableByteStreamControllerClearPendingPullIntos(controller);
        ResetQueue(controller);
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e2);
      }
      function ReadableByteStreamControllerGetBYOBRequest(controller) {
        if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
          const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
          SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
          controller._byobRequest = byobRequest;
        }
        return controller._byobRequest;
      }
      function ReadableByteStreamControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableByteStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableByteStreamControllerRespond(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (bytesWritten !== 0) {
            throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
          }
        } else {
          if (bytesWritten === 0) {
            throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
          }
          if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
            throw new RangeError("bytesWritten out of range");
          }
        }
        firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
        ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
      }
      function ReadableByteStreamControllerRespondWithNewView(controller, view) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (view.byteLength !== 0) {
            throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
          }
        } else {
          if (view.byteLength === 0) {
            throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
          }
        }
        if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
          throw new RangeError("The region specified by view does not match byobRequest");
        }
        if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
          throw new RangeError("The buffer of view has different capacity than byobRequest");
        }
        if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
          throw new RangeError("The region specified by view is larger than byobRequest");
        }
        const viewByteLength = view.byteLength;
        firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
        ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
      }
      function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
        controller._controlledReadableByteStream = stream;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._byobRequest = null;
        controller._queue = controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._closeRequested = false;
        controller._started = false;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._autoAllocateChunkSize = autoAllocateChunkSize;
        controller._pendingPullIntos = new SimpleQueue();
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }, (r2) => {
          ReadableByteStreamControllerError(controller, r2);
        });
      }
      function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
        const controller = Object.create(ReadableByteStreamController.prototype);
        let startAlgorithm = () => void 0;
        let pullAlgorithm = () => promiseResolvedWith(void 0);
        let cancelAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingByteSource.start !== void 0) {
          startAlgorithm = () => underlyingByteSource.start(controller);
        }
        if (underlyingByteSource.pull !== void 0) {
          pullAlgorithm = () => underlyingByteSource.pull(controller);
        }
        if (underlyingByteSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
        }
        const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
        if (autoAllocateChunkSize === 0) {
          throw new TypeError("autoAllocateChunkSize must be greater than 0");
        }
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
      }
      function SetUpReadableStreamBYOBRequest(request, controller, view) {
        request._associatedReadableByteStreamController = controller;
        request._view = view;
      }
      function byobRequestBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
      }
      function byteStreamControllerBrandCheckException(name) {
        return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
      }
      function AcquireReadableStreamBYOBReader(stream) {
        return new ReadableStreamBYOBReader(stream);
      }
      function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
        stream._reader._readIntoRequests.push(readIntoRequest);
      }
      function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readIntoRequest = reader._readIntoRequests.shift();
        if (done) {
          readIntoRequest._closeSteps(chunk);
        } else {
          readIntoRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadIntoRequests(stream) {
        return stream._reader._readIntoRequests.length;
      }
      function ReadableStreamHasBYOBReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamBYOBReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamBYOBReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          if (!IsReadableByteStreamController(stream._readableStreamController)) {
            throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readIntoRequests = new SimpleQueue();
        }
        get closed() {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        cancel(reason = void 0) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        read(view) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("read"));
          }
          if (!ArrayBuffer.isView(view)) {
            return promiseRejectedWith(new TypeError("view must be an array buffer view"));
          }
          if (view.byteLength === 0) {
            return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
          }
          if (view.buffer.byteLength === 0) {
            return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
          }
          if (IsDetachedBuffer(view.buffer))
            ;
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readIntoRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
            _errorSteps: (e2) => rejectPromise(e2)
          };
          ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
          return promise;
        }
        releaseLock() {
          if (!IsReadableStreamBYOBReader(this)) {
            throw byobReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          if (this._readIntoRequests.length > 0) {
            throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
          }
          ReadableStreamReaderGenericRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamBYOBReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamBYOBReader",
          configurable: true
        });
      }
      function IsReadableStreamBYOBReader(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
          return false;
        }
        return x2 instanceof ReadableStreamBYOBReader;
      }
      function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "errored") {
          readIntoRequest._errorSteps(stream._storedError);
        } else {
          ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
        }
      }
      function byobReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
      }
      function ExtractHighWaterMark(strategy, defaultHWM) {
        const { highWaterMark } = strategy;
        if (highWaterMark === void 0) {
          return defaultHWM;
        }
        if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
          throw new RangeError("Invalid highWaterMark");
        }
        return highWaterMark;
      }
      function ExtractSizeAlgorithm(strategy) {
        const { size } = strategy;
        if (!size) {
          return () => 1;
        }
        return size;
      }
      function convertQueuingStrategy(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        const size = init === null || init === void 0 ? void 0 : init.size;
        return {
          highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
          size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
        };
      }
      function convertQueuingStrategySize(fn, context) {
        assertFunction(fn, context);
        return (chunk) => convertUnrestrictedDouble(fn(chunk));
      }
      function convertUnderlyingSink(original, context) {
        assertDictionary(original, context);
        const abort = original === null || original === void 0 ? void 0 : original.abort;
        const close = original === null || original === void 0 ? void 0 : original.close;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        const write = original === null || original === void 0 ? void 0 : original.write;
        return {
          abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
          close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
          write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
          type
        };
      }
      function convertUnderlyingSinkAbortCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSinkCloseCallback(fn, original, context) {
        assertFunction(fn, context);
        return () => promiseCall(fn, original, []);
      }
      function convertUnderlyingSinkStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertUnderlyingSinkWriteCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      function assertWritableStream(x2, context) {
        if (!IsWritableStream(x2)) {
          throw new TypeError(`${context} is not a WritableStream.`);
        }
      }
      function isAbortSignal2(value) {
        if (typeof value !== "object" || value === null) {
          return false;
        }
        try {
          return typeof value.aborted === "boolean";
        } catch (_a3) {
          return false;
        }
      }
      const supportsAbortController = typeof AbortController === "function";
      function createAbortController() {
        if (supportsAbortController) {
          return new AbortController();
        }
        return void 0;
      }
      class WritableStream {
        constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
          if (rawUnderlyingSink === void 0) {
            rawUnderlyingSink = null;
          } else {
            assertObject(rawUnderlyingSink, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
          InitializeWritableStream(this);
          const type = underlyingSink.type;
          if (type !== void 0) {
            throw new RangeError("Invalid type is specified");
          }
          const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
          const highWaterMark = ExtractHighWaterMark(strategy, 1);
          SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
        }
        get locked() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("locked");
          }
          return IsWritableStreamLocked(this);
        }
        abort(reason = void 0) {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("abort"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
          }
          return WritableStreamAbort(this, reason);
        }
        close() {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("close"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
          }
          if (WritableStreamCloseQueuedOrInFlight(this)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamClose(this);
        }
        getWriter() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("getWriter");
          }
          return AcquireWritableStreamDefaultWriter(this);
        }
      }
      Object.defineProperties(WritableStream.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        getWriter: { enumerable: true },
        locked: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStream",
          configurable: true
        });
      }
      function AcquireWritableStreamDefaultWriter(stream) {
        return new WritableStreamDefaultWriter(stream);
      }
      function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(WritableStream.prototype);
        InitializeWritableStream(stream);
        const controller = Object.create(WritableStreamDefaultController.prototype);
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function InitializeWritableStream(stream) {
        stream._state = "writable";
        stream._storedError = void 0;
        stream._writer = void 0;
        stream._writableStreamController = void 0;
        stream._writeRequests = new SimpleQueue();
        stream._inFlightWriteRequest = void 0;
        stream._closeRequest = void 0;
        stream._inFlightCloseRequest = void 0;
        stream._pendingAbortRequest = void 0;
        stream._backpressure = false;
      }
      function IsWritableStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
          return false;
        }
        return x2 instanceof WritableStream;
      }
      function IsWritableStreamLocked(stream) {
        if (stream._writer === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamAbort(stream, reason) {
        var _a3;
        if (stream._state === "closed" || stream._state === "errored") {
          return promiseResolvedWith(void 0);
        }
        stream._writableStreamController._abortReason = reason;
        (_a3 = stream._writableStreamController._abortController) === null || _a3 === void 0 ? void 0 : _a3.abort();
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseResolvedWith(void 0);
        }
        if (stream._pendingAbortRequest !== void 0) {
          return stream._pendingAbortRequest._promise;
        }
        let wasAlreadyErroring = false;
        if (state === "erroring") {
          wasAlreadyErroring = true;
          reason = void 0;
        }
        const promise = newPromise((resolve, reject) => {
          stream._pendingAbortRequest = {
            _promise: void 0,
            _resolve: resolve,
            _reject: reject,
            _reason: reason,
            _wasAlreadyErroring: wasAlreadyErroring
          };
        });
        stream._pendingAbortRequest._promise = promise;
        if (!wasAlreadyErroring) {
          WritableStreamStartErroring(stream, reason);
        }
        return promise;
      }
      function WritableStreamClose(stream) {
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
        }
        const promise = newPromise((resolve, reject) => {
          const closeRequest = {
            _resolve: resolve,
            _reject: reject
          };
          stream._closeRequest = closeRequest;
        });
        const writer = stream._writer;
        if (writer !== void 0 && stream._backpressure && state === "writable") {
          defaultWriterReadyPromiseResolve(writer);
        }
        WritableStreamDefaultControllerClose(stream._writableStreamController);
        return promise;
      }
      function WritableStreamAddWriteRequest(stream) {
        const promise = newPromise((resolve, reject) => {
          const writeRequest = {
            _resolve: resolve,
            _reject: reject
          };
          stream._writeRequests.push(writeRequest);
        });
        return promise;
      }
      function WritableStreamDealWithRejection(stream, error) {
        const state = stream._state;
        if (state === "writable") {
          WritableStreamStartErroring(stream, error);
          return;
        }
        WritableStreamFinishErroring(stream);
      }
      function WritableStreamStartErroring(stream, reason) {
        const controller = stream._writableStreamController;
        stream._state = "erroring";
        stream._storedError = reason;
        const writer = stream._writer;
        if (writer !== void 0) {
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
        }
        if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
          WritableStreamFinishErroring(stream);
        }
      }
      function WritableStreamFinishErroring(stream) {
        stream._state = "errored";
        stream._writableStreamController[ErrorSteps]();
        const storedError = stream._storedError;
        stream._writeRequests.forEach((writeRequest) => {
          writeRequest._reject(storedError);
        });
        stream._writeRequests = new SimpleQueue();
        if (stream._pendingAbortRequest === void 0) {
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const abortRequest = stream._pendingAbortRequest;
        stream._pendingAbortRequest = void 0;
        if (abortRequest._wasAlreadyErroring) {
          abortRequest._reject(storedError);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
        uponPromise(promise, () => {
          abortRequest._resolve();
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        }, (reason) => {
          abortRequest._reject(reason);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        });
      }
      function WritableStreamFinishInFlightWrite(stream) {
        stream._inFlightWriteRequest._resolve(void 0);
        stream._inFlightWriteRequest = void 0;
      }
      function WritableStreamFinishInFlightWriteWithError(stream, error) {
        stream._inFlightWriteRequest._reject(error);
        stream._inFlightWriteRequest = void 0;
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamFinishInFlightClose(stream) {
        stream._inFlightCloseRequest._resolve(void 0);
        stream._inFlightCloseRequest = void 0;
        const state = stream._state;
        if (state === "erroring") {
          stream._storedError = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._resolve();
            stream._pendingAbortRequest = void 0;
          }
        }
        stream._state = "closed";
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseResolve(writer);
        }
      }
      function WritableStreamFinishInFlightCloseWithError(stream, error) {
        stream._inFlightCloseRequest._reject(error);
        stream._inFlightCloseRequest = void 0;
        if (stream._pendingAbortRequest !== void 0) {
          stream._pendingAbortRequest._reject(error);
          stream._pendingAbortRequest = void 0;
        }
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamCloseQueuedOrInFlight(stream) {
        if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamHasOperationMarkedInFlight(stream) {
        if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamMarkCloseRequestInFlight(stream) {
        stream._inFlightCloseRequest = stream._closeRequest;
        stream._closeRequest = void 0;
      }
      function WritableStreamMarkFirstWriteRequestInFlight(stream) {
        stream._inFlightWriteRequest = stream._writeRequests.shift();
      }
      function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
        if (stream._closeRequest !== void 0) {
          stream._closeRequest._reject(stream._storedError);
          stream._closeRequest = void 0;
        }
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseReject(writer, stream._storedError);
        }
      }
      function WritableStreamUpdateBackpressure(stream, backpressure) {
        const writer = stream._writer;
        if (writer !== void 0 && backpressure !== stream._backpressure) {
          if (backpressure) {
            defaultWriterReadyPromiseReset(writer);
          } else {
            defaultWriterReadyPromiseResolve(writer);
          }
        }
        stream._backpressure = backpressure;
      }
      class WritableStreamDefaultWriter {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
          assertWritableStream(stream, "First parameter");
          if (IsWritableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive writing by another writer");
          }
          this._ownerWritableStream = stream;
          stream._writer = this;
          const state = stream._state;
          if (state === "writable") {
            if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
              defaultWriterReadyPromiseInitialize(this);
            } else {
              defaultWriterReadyPromiseInitializeAsResolved(this);
            }
            defaultWriterClosedPromiseInitialize(this);
          } else if (state === "erroring") {
            defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
            defaultWriterClosedPromiseInitialize(this);
          } else if (state === "closed") {
            defaultWriterReadyPromiseInitializeAsResolved(this);
            defaultWriterClosedPromiseInitializeAsResolved(this);
          } else {
            const storedError = stream._storedError;
            defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
            defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
          }
        }
        get closed() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        get desiredSize() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("desiredSize");
          }
          if (this._ownerWritableStream === void 0) {
            throw defaultWriterLockException("desiredSize");
          }
          return WritableStreamDefaultWriterGetDesiredSize(this);
        }
        get ready() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
          }
          return this._readyPromise;
        }
        abort(reason = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("abort"));
          }
          return WritableStreamDefaultWriterAbort(this, reason);
        }
        close() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("close"));
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("close"));
          }
          if (WritableStreamCloseQueuedOrInFlight(stream)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamDefaultWriterClose(this);
        }
        releaseLock() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("releaseLock");
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return;
          }
          WritableStreamDefaultWriterRelease(this);
        }
        write(chunk = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("write"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          return WritableStreamDefaultWriterWrite(this, chunk);
        }
      }
      Object.defineProperties(WritableStreamDefaultWriter.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        releaseLock: { enumerable: true },
        write: { enumerable: true },
        closed: { enumerable: true },
        desiredSize: { enumerable: true },
        ready: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStreamDefaultWriter",
          configurable: true
        });
      }
      function IsWritableStreamDefaultWriter(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
          return false;
        }
        return x2 instanceof WritableStreamDefaultWriter;
      }
      function WritableStreamDefaultWriterAbort(writer, reason) {
        const stream = writer._ownerWritableStream;
        return WritableStreamAbort(stream, reason);
      }
      function WritableStreamDefaultWriterClose(writer) {
        const stream = writer._ownerWritableStream;
        return WritableStreamClose(stream);
      }
      function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        return WritableStreamDefaultWriterClose(writer);
      }
      function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
        if (writer._closedPromiseState === "pending") {
          defaultWriterClosedPromiseReject(writer, error);
        } else {
          defaultWriterClosedPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
        if (writer._readyPromiseState === "pending") {
          defaultWriterReadyPromiseReject(writer, error);
        } else {
          defaultWriterReadyPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterGetDesiredSize(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (state === "errored" || state === "erroring") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
      }
      function WritableStreamDefaultWriterRelease(writer) {
        const stream = writer._ownerWritableStream;
        const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
        WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
        stream._writer = void 0;
        writer._ownerWritableStream = void 0;
      }
      function WritableStreamDefaultWriterWrite(writer, chunk) {
        const stream = writer._ownerWritableStream;
        const controller = stream._writableStreamController;
        const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
        if (stream !== writer._ownerWritableStream) {
          return promiseRejectedWith(defaultWriterLockException("write to"));
        }
        const state = stream._state;
        if (state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
          return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
        }
        if (state === "erroring") {
          return promiseRejectedWith(stream._storedError);
        }
        const promise = WritableStreamAddWriteRequest(stream);
        WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
        return promise;
      }
      const closeSentinel = {};
      class WritableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get abortReason() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("abortReason");
          }
          return this._abortReason;
        }
        get signal() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("signal");
          }
          if (this._abortController === void 0) {
            throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
          }
          return this._abortController.signal;
        }
        error(e2 = void 0) {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("error");
          }
          const state = this._controlledWritableStream._state;
          if (state !== "writable") {
            return;
          }
          WritableStreamDefaultControllerError(this, e2);
        }
        [AbortSteps](reason) {
          const result = this._abortAlgorithm(reason);
          WritableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        [ErrorSteps]() {
          ResetQueue(this);
        }
      }
      Object.defineProperties(WritableStreamDefaultController.prototype, {
        abortReason: { enumerable: true },
        signal: { enumerable: true },
        error: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStreamDefaultController",
          configurable: true
        });
      }
      function IsWritableStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
          return false;
        }
        return x2 instanceof WritableStreamDefaultController;
      }
      function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledWritableStream = stream;
        stream._writableStreamController = controller;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._abortReason = void 0;
        controller._abortController = createAbortController();
        controller._started = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._writeAlgorithm = writeAlgorithm;
        controller._closeAlgorithm = closeAlgorithm;
        controller._abortAlgorithm = abortAlgorithm;
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
        const startResult = startAlgorithm();
        const startPromise = promiseResolvedWith(startResult);
        uponPromise(startPromise, () => {
          controller._started = true;
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, (r2) => {
          controller._started = true;
          WritableStreamDealWithRejection(stream, r2);
        });
      }
      function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(WritableStreamDefaultController.prototype);
        let startAlgorithm = () => void 0;
        let writeAlgorithm = () => promiseResolvedWith(void 0);
        let closeAlgorithm = () => promiseResolvedWith(void 0);
        let abortAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingSink.start !== void 0) {
          startAlgorithm = () => underlyingSink.start(controller);
        }
        if (underlyingSink.write !== void 0) {
          writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
        }
        if (underlyingSink.close !== void 0) {
          closeAlgorithm = () => underlyingSink.close();
        }
        if (underlyingSink.abort !== void 0) {
          abortAlgorithm = (reason) => underlyingSink.abort(reason);
        }
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function WritableStreamDefaultControllerClearAlgorithms(controller) {
        controller._writeAlgorithm = void 0;
        controller._closeAlgorithm = void 0;
        controller._abortAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function WritableStreamDefaultControllerClose(controller) {
        EnqueueValueWithSize(controller, closeSentinel, 0);
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
        try {
          return controller._strategySizeAlgorithm(chunk);
        } catch (chunkSizeE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
          return 1;
        }
      }
      function WritableStreamDefaultControllerGetDesiredSize(controller) {
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
        try {
          EnqueueValueWithSize(controller, chunk, chunkSize);
        } catch (enqueueE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
          return;
        }
        const stream = controller._controlledWritableStream;
        if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
        const stream = controller._controlledWritableStream;
        if (!controller._started) {
          return;
        }
        if (stream._inFlightWriteRequest !== void 0) {
          return;
        }
        const state = stream._state;
        if (state === "erroring") {
          WritableStreamFinishErroring(stream);
          return;
        }
        if (controller._queue.length === 0) {
          return;
        }
        const value = PeekQueueValue(controller);
        if (value === closeSentinel) {
          WritableStreamDefaultControllerProcessClose(controller);
        } else {
          WritableStreamDefaultControllerProcessWrite(controller, value);
        }
      }
      function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
        if (controller._controlledWritableStream._state === "writable") {
          WritableStreamDefaultControllerError(controller, error);
        }
      }
      function WritableStreamDefaultControllerProcessClose(controller) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkCloseRequestInFlight(stream);
        DequeueValue(controller);
        const sinkClosePromise = controller._closeAlgorithm();
        WritableStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(sinkClosePromise, () => {
          WritableStreamFinishInFlightClose(stream);
        }, (reason) => {
          WritableStreamFinishInFlightCloseWithError(stream, reason);
        });
      }
      function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkFirstWriteRequestInFlight(stream);
        const sinkWritePromise = controller._writeAlgorithm(chunk);
        uponPromise(sinkWritePromise, () => {
          WritableStreamFinishInFlightWrite(stream);
          const state = stream._state;
          DequeueValue(controller);
          if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, (reason) => {
          if (stream._state === "writable") {
            WritableStreamDefaultControllerClearAlgorithms(controller);
          }
          WritableStreamFinishInFlightWriteWithError(stream, reason);
        });
      }
      function WritableStreamDefaultControllerGetBackpressure(controller) {
        const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
        return desiredSize <= 0;
      }
      function WritableStreamDefaultControllerError(controller, error) {
        const stream = controller._controlledWritableStream;
        WritableStreamDefaultControllerClearAlgorithms(controller);
        WritableStreamStartErroring(stream, error);
      }
      function streamBrandCheckException$2(name) {
        return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
      }
      function defaultControllerBrandCheckException$2(name) {
        return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
      }
      function defaultWriterBrandCheckException(name) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
      }
      function defaultWriterLockException(name) {
        return new TypeError("Cannot " + name + " a stream using a released writer");
      }
      function defaultWriterClosedPromiseInitialize(writer) {
        writer._closedPromise = newPromise((resolve, reject) => {
          writer._closedPromise_resolve = resolve;
          writer._closedPromise_reject = reject;
          writer._closedPromiseState = "pending";
        });
      }
      function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseReject(writer, reason);
      }
      function defaultWriterClosedPromiseInitializeAsResolved(writer) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseResolve(writer);
      }
      function defaultWriterClosedPromiseReject(writer, reason) {
        if (writer._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._closedPromise);
        writer._closedPromise_reject(reason);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "rejected";
      }
      function defaultWriterClosedPromiseResetToRejected(writer, reason) {
        defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterClosedPromiseResolve(writer) {
        if (writer._closedPromise_resolve === void 0) {
          return;
        }
        writer._closedPromise_resolve(void 0);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "resolved";
      }
      function defaultWriterReadyPromiseInitialize(writer) {
        writer._readyPromise = newPromise((resolve, reject) => {
          writer._readyPromise_resolve = resolve;
          writer._readyPromise_reject = reject;
        });
        writer._readyPromiseState = "pending";
      }
      function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseReject(writer, reason);
      }
      function defaultWriterReadyPromiseInitializeAsResolved(writer) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseResolve(writer);
      }
      function defaultWriterReadyPromiseReject(writer, reason) {
        if (writer._readyPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._readyPromise);
        writer._readyPromise_reject(reason);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "rejected";
      }
      function defaultWriterReadyPromiseReset(writer) {
        defaultWriterReadyPromiseInitialize(writer);
      }
      function defaultWriterReadyPromiseResetToRejected(writer, reason) {
        defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterReadyPromiseResolve(writer) {
        if (writer._readyPromise_resolve === void 0) {
          return;
        }
        writer._readyPromise_resolve(void 0);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "fulfilled";
      }
      const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
      function isDOMExceptionConstructor(ctor) {
        if (!(typeof ctor === "function" || typeof ctor === "object")) {
          return false;
        }
        try {
          new ctor();
          return true;
        } catch (_a3) {
          return false;
        }
      }
      function createDOMExceptionPolyfill() {
        const ctor = function DOMException2(message, name) {
          this.message = message || "";
          this.name = name || "Error";
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
        };
        ctor.prototype = Object.create(Error.prototype);
        Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
        return ctor;
      }
      const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
      function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
        const reader = AcquireReadableStreamDefaultReader(source);
        const writer = AcquireWritableStreamDefaultWriter(dest);
        source._disturbed = true;
        let shuttingDown = false;
        let currentWrite = promiseResolvedWith(void 0);
        return newPromise((resolve, reject) => {
          let abortAlgorithm;
          if (signal !== void 0) {
            abortAlgorithm = () => {
              const error = new DOMException$1("Aborted", "AbortError");
              const actions = [];
              if (!preventAbort) {
                actions.push(() => {
                  if (dest._state === "writable") {
                    return WritableStreamAbort(dest, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              if (!preventCancel) {
                actions.push(() => {
                  if (source._state === "readable") {
                    return ReadableStreamCancel(source, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error);
            };
            if (signal.aborted) {
              abortAlgorithm();
              return;
            }
            signal.addEventListener("abort", abortAlgorithm);
          }
          function pipeLoop() {
            return newPromise((resolveLoop, rejectLoop) => {
              function next(done) {
                if (done) {
                  resolveLoop();
                } else {
                  PerformPromiseThen(pipeStep(), next, rejectLoop);
                }
              }
              next(false);
            });
          }
          function pipeStep() {
            if (shuttingDown) {
              return promiseResolvedWith(true);
            }
            return PerformPromiseThen(writer._readyPromise, () => {
              return newPromise((resolveRead, rejectRead) => {
                ReadableStreamDefaultReaderRead(reader, {
                  _chunkSteps: (chunk) => {
                    currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop2);
                    resolveRead(false);
                  },
                  _closeSteps: () => resolveRead(true),
                  _errorSteps: rejectRead
                });
              });
            });
          }
          isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
            if (!preventAbort) {
              shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
          });
          isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
          });
          isOrBecomesClosed(source, reader._closedPromise, () => {
            if (!preventClose) {
              shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
            } else {
              shutdown();
            }
          });
          if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
            const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
            } else {
              shutdown(true, destClosed);
            }
          }
          setPromiseIsHandledToTrue(pipeLoop());
          function waitForWritesToFinish() {
            const oldCurrentWrite = currentWrite;
            return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
          }
          function isOrBecomesErrored(stream, promise, action) {
            if (stream._state === "errored") {
              action(stream._storedError);
            } else {
              uponRejection(promise, action);
            }
          }
          function isOrBecomesClosed(stream, promise, action) {
            if (stream._state === "closed") {
              action();
            } else {
              uponFulfillment(promise, action);
            }
          }
          function shutdownWithAction(action, originalIsError, originalError) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), doTheRest);
            } else {
              doTheRest();
            }
            function doTheRest() {
              uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
            }
          }
          function shutdown(isError, error) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error));
            } else {
              finalize(isError, error);
            }
          }
          function finalize(isError, error) {
            WritableStreamDefaultWriterRelease(writer);
            ReadableStreamReaderGenericRelease(reader);
            if (signal !== void 0) {
              signal.removeEventListener("abort", abortAlgorithm);
            }
            if (isError) {
              reject(error);
            } else {
              resolve(void 0);
            }
          }
        });
      }
      class ReadableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("desiredSize");
          }
          return ReadableStreamDefaultControllerGetDesiredSize(this);
        }
        close() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("close");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits close");
          }
          ReadableStreamDefaultControllerClose(this);
        }
        enqueue(chunk = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("enqueue");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits enqueue");
          }
          return ReadableStreamDefaultControllerEnqueue(this, chunk);
        }
        error(e2 = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("error");
          }
          ReadableStreamDefaultControllerError(this, e2);
        }
        [CancelSteps](reason) {
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        [PullSteps](readRequest) {
          const stream = this._controlledReadableStream;
          if (this._queue.length > 0) {
            const chunk = DequeueValue(this);
            if (this._closeRequested && this._queue.length === 0) {
              ReadableStreamDefaultControllerClearAlgorithms(this);
              ReadableStreamClose(stream);
            } else {
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
            readRequest._chunkSteps(chunk);
          } else {
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
          }
        }
      }
      Object.defineProperties(ReadableStreamDefaultController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamDefaultController",
          configurable: true
        });
      }
      function IsReadableStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
          return false;
        }
        return x2 instanceof ReadableStreamDefaultController;
      }
      function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }
        }, (e2) => {
          ReadableStreamDefaultControllerError(controller, e2);
        });
      }
      function ReadableStreamDefaultControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableStream;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableStreamDefaultControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function ReadableStreamDefaultControllerClose(controller) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        controller._closeRequested = true;
        if (controller._queue.length === 0) {
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
      }
      function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          ReadableStreamFulfillReadRequest(stream, chunk, false);
        } else {
          let chunkSize;
          try {
            chunkSize = controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            ReadableStreamDefaultControllerError(controller, chunkSizeE);
            throw chunkSizeE;
          }
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            ReadableStreamDefaultControllerError(controller, enqueueE);
            throw enqueueE;
          }
        }
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
      }
      function ReadableStreamDefaultControllerError(controller, e2) {
        const stream = controller._controlledReadableStream;
        if (stream._state !== "readable") {
          return;
        }
        ResetQueue(controller);
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e2);
      }
      function ReadableStreamDefaultControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableStreamDefaultControllerHasBackpressure(controller) {
        if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
          return false;
        }
        return true;
      }
      function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
        const state = controller._controlledReadableStream._state;
        if (!controller._closeRequested && state === "readable") {
          return true;
        }
        return false;
      }
      function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledReadableStream = stream;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._started = false;
        controller._closeRequested = false;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }, (r2) => {
          ReadableStreamDefaultControllerError(controller, r2);
        });
      }
      function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        let startAlgorithm = () => void 0;
        let pullAlgorithm = () => promiseResolvedWith(void 0);
        let cancelAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingSource.start !== void 0) {
          startAlgorithm = () => underlyingSource.start(controller);
        }
        if (underlyingSource.pull !== void 0) {
          pullAlgorithm = () => underlyingSource.pull(controller);
        }
        if (underlyingSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
        }
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function defaultControllerBrandCheckException$1(name) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
      }
      function ReadableStreamTee(stream, cloneForBranch2) {
        if (IsReadableByteStreamController(stream._readableStreamController)) {
          return ReadableByteStreamTee(stream);
        }
        return ReadableStreamDefaultTee(stream);
      }
      function ReadableStreamDefaultTee(stream, cloneForBranch2) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgain = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve) => {
          resolveCancelPromise = resolve;
        });
        function pullAlgorithm() {
          if (reading) {
            readAgain = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const readRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgain = false;
                const chunk1 = chunk;
                const chunk2 = chunk;
                if (!canceled1) {
                  ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgain) {
                  pullAlgorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableStreamDefaultControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableStreamDefaultControllerClose(branch2._readableStreamController);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
        }
        branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
        branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
        uponRejection(reader._closedPromise, (r2) => {
          ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
          ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
          if (!canceled1 || !canceled2) {
            resolveCancelPromise(void 0);
          }
        });
        return [branch1, branch2];
      }
      function ReadableByteStreamTee(stream) {
        let reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgainForBranch1 = false;
        let readAgainForBranch2 = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve) => {
          resolveCancelPromise = resolve;
        });
        function forwardReaderError(thisReader) {
          uponRejection(thisReader._closedPromise, (r2) => {
            if (thisReader !== reader) {
              return;
            }
            ReadableByteStreamControllerError(branch1._readableStreamController, r2);
            ReadableByteStreamControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
        }
        function pullWithDefaultReader() {
          if (IsReadableStreamBYOBReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamDefaultReader(stream);
            forwardReaderError(reader);
          }
          const readRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const chunk1 = chunk;
                let chunk2 = chunk;
                if (!canceled1 && !canceled2) {
                  try {
                    chunk2 = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                }
                if (!canceled1) {
                  ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableByteStreamControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableByteStreamControllerClose(branch2._readableStreamController);
              }
              if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
              }
              if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
        }
        function pullWithBYOBReader(view, forBranch2) {
          if (IsReadableStreamDefaultReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamBYOBReader(stream);
            forwardReaderError(reader);
          }
          const byobBranch = forBranch2 ? branch2 : branch1;
          const otherBranch = forBranch2 ? branch1 : branch2;
          const readIntoRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!otherCanceled) {
                  let clonedChunk;
                  try {
                    clonedChunk = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                } else if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: (chunk) => {
              reading = false;
              const byobCanceled = forBranch2 ? canceled2 : canceled1;
              const otherCanceled = forBranch2 ? canceled1 : canceled2;
              if (!byobCanceled) {
                ReadableByteStreamControllerClose(byobBranch._readableStreamController);
              }
              if (!otherCanceled) {
                ReadableByteStreamControllerClose(otherBranch._readableStreamController);
              }
              if (chunk !== void 0) {
                if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                }
              }
              if (!byobCanceled || !otherCanceled) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
        }
        function pull1Algorithm() {
          if (reading) {
            readAgainForBranch1 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, false);
          }
          return promiseResolvedWith(void 0);
        }
        function pull2Algorithm() {
          if (reading) {
            readAgainForBranch2 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, true);
          }
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
          return;
        }
        branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
        branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
        forwardReaderError(reader);
        return [branch1, branch2];
      }
      function convertUnderlyingDefaultOrByteSource(source, context) {
        assertDictionary(source, context);
        const original = source;
        const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
        const pull = original === null || original === void 0 ? void 0 : original.pull;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        return {
          autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
          cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
          pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
          type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
        };
      }
      function convertUnderlyingSourceCancelCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSourcePullCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertUnderlyingSourceStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertReadableStreamType(type, context) {
        type = `${type}`;
        if (type !== "bytes") {
          throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
        }
        return type;
      }
      function convertReaderOptions(options, context) {
        assertDictionary(options, context);
        const mode = options === null || options === void 0 ? void 0 : options.mode;
        return {
          mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
        };
      }
      function convertReadableStreamReaderMode(mode, context) {
        mode = `${mode}`;
        if (mode !== "byob") {
          throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
        }
        return mode;
      }
      function convertIteratorOptions(options, context) {
        assertDictionary(options, context);
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        return { preventCancel: Boolean(preventCancel) };
      }
      function convertPipeOptions(options, context) {
        assertDictionary(options, context);
        const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
        const signal = options === null || options === void 0 ? void 0 : options.signal;
        if (signal !== void 0) {
          assertAbortSignal(signal, `${context} has member 'signal' that`);
        }
        return {
          preventAbort: Boolean(preventAbort),
          preventCancel: Boolean(preventCancel),
          preventClose: Boolean(preventClose),
          signal
        };
      }
      function assertAbortSignal(signal, context) {
        if (!isAbortSignal2(signal)) {
          throw new TypeError(`${context} is not an AbortSignal.`);
        }
      }
      function convertReadableWritablePair(pair, context) {
        assertDictionary(pair, context);
        const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
        assertRequiredField(readable, "readable", "ReadableWritablePair");
        assertReadableStream(readable, `${context} has member 'readable' that`);
        const writable = pair === null || pair === void 0 ? void 0 : pair.writable;
        assertRequiredField(writable, "writable", "ReadableWritablePair");
        assertWritableStream(writable, `${context} has member 'writable' that`);
        return { readable, writable };
      }
      class ReadableStream2 {
        constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
          if (rawUnderlyingSource === void 0) {
            rawUnderlyingSource = null;
          } else {
            assertObject(rawUnderlyingSource, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
          InitializeReadableStream(this);
          if (underlyingSource.type === "bytes") {
            if (strategy.size !== void 0) {
              throw new RangeError("The strategy for a byte stream cannot have a size function");
            }
            const highWaterMark = ExtractHighWaterMark(strategy, 0);
            SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
          } else {
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
          }
        }
        get locked() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("locked");
          }
          return IsReadableStreamLocked(this);
        }
        cancel(reason = void 0) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("cancel"));
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
          }
          return ReadableStreamCancel(this, reason);
        }
        getReader(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("getReader");
          }
          const options = convertReaderOptions(rawOptions, "First parameter");
          if (options.mode === void 0) {
            return AcquireReadableStreamDefaultReader(this);
          }
          return AcquireReadableStreamBYOBReader(this);
        }
        pipeThrough(rawTransform, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("pipeThrough");
          }
          assertRequiredArgument(rawTransform, 1, "pipeThrough");
          const transform = convertReadableWritablePair(rawTransform, "First parameter");
          const options = convertPipeOptions(rawOptions, "Second parameter");
          if (IsReadableStreamLocked(this)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
          }
          if (IsWritableStreamLocked(transform.writable)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
          }
          const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          setPromiseIsHandledToTrue(promise);
          return transform.readable;
        }
        pipeTo(destination, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
          }
          if (destination === void 0) {
            return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
          }
          if (!IsWritableStream(destination)) {
            return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
          }
          let options;
          try {
            options = convertPipeOptions(rawOptions, "Second parameter");
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
          }
          if (IsWritableStreamLocked(destination)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
          }
          return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
        }
        tee() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("tee");
          }
          const branches = ReadableStreamTee(this);
          return CreateArrayFromList(branches);
        }
        values(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("values");
          }
          const options = convertIteratorOptions(rawOptions, "First parameter");
          return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
        }
      }
      Object.defineProperties(ReadableStream2.prototype, {
        cancel: { enumerable: true },
        getReader: { enumerable: true },
        pipeThrough: { enumerable: true },
        pipeTo: { enumerable: true },
        tee: { enumerable: true },
        values: { enumerable: true },
        locked: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStream",
          configurable: true
        });
      }
      if (typeof SymbolPolyfill.asyncIterator === "symbol") {
        Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
          value: ReadableStream2.prototype.values,
          writable: true,
          configurable: true
        });
      }
      function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableByteStreamController.prototype);
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
        return stream;
      }
      function InitializeReadableStream(stream) {
        stream._state = "readable";
        stream._reader = void 0;
        stream._storedError = void 0;
        stream._disturbed = false;
      }
      function IsReadableStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
          return false;
        }
        return x2 instanceof ReadableStream2;
      }
      function IsReadableStreamLocked(stream) {
        if (stream._reader === void 0) {
          return false;
        }
        return true;
      }
      function ReadableStreamCancel(stream, reason) {
        stream._disturbed = true;
        if (stream._state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (stream._state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        ReadableStreamClose(stream);
        const reader = stream._reader;
        if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
          reader._readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._closeSteps(void 0);
          });
          reader._readIntoRequests = new SimpleQueue();
        }
        const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
        return transformPromiseWith(sourceCancelPromise, noop2);
      }
      function ReadableStreamClose(stream) {
        stream._state = "closed";
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseResolve(reader);
        if (IsReadableStreamDefaultReader(reader)) {
          reader._readRequests.forEach((readRequest) => {
            readRequest._closeSteps();
          });
          reader._readRequests = new SimpleQueue();
        }
      }
      function ReadableStreamError(stream, e2) {
        stream._state = "errored";
        stream._storedError = e2;
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseReject(reader, e2);
        if (IsReadableStreamDefaultReader(reader)) {
          reader._readRequests.forEach((readRequest) => {
            readRequest._errorSteps(e2);
          });
          reader._readRequests = new SimpleQueue();
        } else {
          reader._readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._errorSteps(e2);
          });
          reader._readIntoRequests = new SimpleQueue();
        }
      }
      function streamBrandCheckException$1(name) {
        return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
      }
      function convertQueuingStrategyInit(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
        return {
          highWaterMark: convertUnrestrictedDouble(highWaterMark)
        };
      }
      const byteLengthSizeFunction = (chunk) => {
        return chunk.byteLength;
      };
      try {
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
      } catch (_a3) {
      }
      class ByteLengthQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        get highWaterMark() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("highWaterMark");
          }
          return this._byteLengthQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("size");
          }
          return byteLengthSizeFunction;
        }
      }
      Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
          value: "ByteLengthQueuingStrategy",
          configurable: true
        });
      }
      function byteLengthBrandCheckException(name) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
      }
      function IsByteLengthQueuingStrategy(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x2 instanceof ByteLengthQueuingStrategy;
      }
      const countSizeFunction = () => {
        return 1;
      };
      try {
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
      } catch (_a3) {
      }
      class CountQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "CountQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._countQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        get highWaterMark() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("highWaterMark");
          }
          return this._countQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("size");
          }
          return countSizeFunction;
        }
      }
      Object.defineProperties(CountQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
          value: "CountQueuingStrategy",
          configurable: true
        });
      }
      function countBrandCheckException(name) {
        return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
      }
      function IsCountQueuingStrategy(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x2 instanceof CountQueuingStrategy;
      }
      function convertTransformer(original, context) {
        assertDictionary(original, context);
        const flush = original === null || original === void 0 ? void 0 : original.flush;
        const readableType = original === null || original === void 0 ? void 0 : original.readableType;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const transform = original === null || original === void 0 ? void 0 : original.transform;
        const writableType = original === null || original === void 0 ? void 0 : original.writableType;
        return {
          flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
          readableType,
          start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
          transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
          writableType
        };
      }
      function convertTransformerFlushCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertTransformerStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertTransformerTransformCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      class TransformStream {
        constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
          if (rawTransformer === void 0) {
            rawTransformer = null;
          }
          const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
          const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
          const transformer = convertTransformer(rawTransformer, "First parameter");
          if (transformer.readableType !== void 0) {
            throw new RangeError("Invalid readableType specified");
          }
          if (transformer.writableType !== void 0) {
            throw new RangeError("Invalid writableType specified");
          }
          const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
          const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
          const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
          const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
          let startPromise_resolve;
          const startPromise = newPromise((resolve) => {
            startPromise_resolve = resolve;
          });
          InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
          if (transformer.start !== void 0) {
            startPromise_resolve(transformer.start(this._transformStreamController));
          } else {
            startPromise_resolve(void 0);
          }
        }
        get readable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("readable");
          }
          return this._readable;
        }
        get writable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("writable");
          }
          return this._writable;
        }
      }
      Object.defineProperties(TransformStream.prototype, {
        readable: { enumerable: true },
        writable: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
          value: "TransformStream",
          configurable: true
        });
      }
      function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
        function startAlgorithm() {
          return startPromise;
        }
        function writeAlgorithm(chunk) {
          return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
        }
        function abortAlgorithm(reason) {
          return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
        }
        function closeAlgorithm() {
          return TransformStreamDefaultSinkCloseAlgorithm(stream);
        }
        stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
        function pullAlgorithm() {
          return TransformStreamDefaultSourcePullAlgorithm(stream);
        }
        function cancelAlgorithm(reason) {
          TransformStreamErrorWritableAndUnblockWrite(stream, reason);
          return promiseResolvedWith(void 0);
        }
        stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        stream._backpressure = void 0;
        stream._backpressureChangePromise = void 0;
        stream._backpressureChangePromise_resolve = void 0;
        TransformStreamSetBackpressure(stream, true);
        stream._transformStreamController = void 0;
      }
      function IsTransformStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
          return false;
        }
        return x2 instanceof TransformStream;
      }
      function TransformStreamError(stream, e2) {
        ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
        TransformStreamErrorWritableAndUnblockWrite(stream, e2);
      }
      function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
        TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
        WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
        if (stream._backpressure) {
          TransformStreamSetBackpressure(stream, false);
        }
      }
      function TransformStreamSetBackpressure(stream, backpressure) {
        if (stream._backpressureChangePromise !== void 0) {
          stream._backpressureChangePromise_resolve();
        }
        stream._backpressureChangePromise = newPromise((resolve) => {
          stream._backpressureChangePromise_resolve = resolve;
        });
        stream._backpressure = backpressure;
      }
      class TransformStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("desiredSize");
          }
          const readableController = this._controlledTransformStream._readable._readableStreamController;
          return ReadableStreamDefaultControllerGetDesiredSize(readableController);
        }
        enqueue(chunk = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("enqueue");
          }
          TransformStreamDefaultControllerEnqueue(this, chunk);
        }
        error(reason = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("error");
          }
          TransformStreamDefaultControllerError(this, reason);
        }
        terminate() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("terminate");
          }
          TransformStreamDefaultControllerTerminate(this);
        }
      }
      Object.defineProperties(TransformStreamDefaultController.prototype, {
        enqueue: { enumerable: true },
        error: { enumerable: true },
        terminate: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "TransformStreamDefaultController",
          configurable: true
        });
      }
      function IsTransformStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
          return false;
        }
        return x2 instanceof TransformStreamDefaultController;
      }
      function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
        controller._controlledTransformStream = stream;
        stream._transformStreamController = controller;
        controller._transformAlgorithm = transformAlgorithm;
        controller._flushAlgorithm = flushAlgorithm;
      }
      function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
        const controller = Object.create(TransformStreamDefaultController.prototype);
        let transformAlgorithm = (chunk) => {
          try {
            TransformStreamDefaultControllerEnqueue(controller, chunk);
            return promiseResolvedWith(void 0);
          } catch (transformResultE) {
            return promiseRejectedWith(transformResultE);
          }
        };
        let flushAlgorithm = () => promiseResolvedWith(void 0);
        if (transformer.transform !== void 0) {
          transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
        }
        if (transformer.flush !== void 0) {
          flushAlgorithm = () => transformer.flush(controller);
        }
        SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
      }
      function TransformStreamDefaultControllerClearAlgorithms(controller) {
        controller._transformAlgorithm = void 0;
        controller._flushAlgorithm = void 0;
      }
      function TransformStreamDefaultControllerEnqueue(controller, chunk) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
          throw new TypeError("Readable side is not in a state that permits enqueue");
        }
        try {
          ReadableStreamDefaultControllerEnqueue(readableController, chunk);
        } catch (e2) {
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
          throw stream._readable._storedError;
        }
        const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
        if (backpressure !== stream._backpressure) {
          TransformStreamSetBackpressure(stream, true);
        }
      }
      function TransformStreamDefaultControllerError(controller, e2) {
        TransformStreamError(controller._controlledTransformStream, e2);
      }
      function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
        const transformPromise = controller._transformAlgorithm(chunk);
        return transformPromiseWith(transformPromise, void 0, (r2) => {
          TransformStreamError(controller._controlledTransformStream, r2);
          throw r2;
        });
      }
      function TransformStreamDefaultControllerTerminate(controller) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        ReadableStreamDefaultControllerClose(readableController);
        const error = new TypeError("TransformStream terminated");
        TransformStreamErrorWritableAndUnblockWrite(stream, error);
      }
      function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
        const controller = stream._transformStreamController;
        if (stream._backpressure) {
          const backpressureChangePromise = stream._backpressureChangePromise;
          return transformPromiseWith(backpressureChangePromise, () => {
            const writable = stream._writable;
            const state = writable._state;
            if (state === "erroring") {
              throw writable._storedError;
            }
            return TransformStreamDefaultControllerPerformTransform(controller, chunk);
          });
        }
        return TransformStreamDefaultControllerPerformTransform(controller, chunk);
      }
      function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
        TransformStreamError(stream, reason);
        return promiseResolvedWith(void 0);
      }
      function TransformStreamDefaultSinkCloseAlgorithm(stream) {
        const readable = stream._readable;
        const controller = stream._transformStreamController;
        const flushPromise = controller._flushAlgorithm();
        TransformStreamDefaultControllerClearAlgorithms(controller);
        return transformPromiseWith(flushPromise, () => {
          if (readable._state === "errored") {
            throw readable._storedError;
          }
          ReadableStreamDefaultControllerClose(readable._readableStreamController);
        }, (r2) => {
          TransformStreamError(stream, r2);
          throw readable._storedError;
        });
      }
      function TransformStreamDefaultSourcePullAlgorithm(stream) {
        TransformStreamSetBackpressure(stream, false);
        return stream._backpressureChangePromise;
      }
      function defaultControllerBrandCheckException(name) {
        return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
      }
      function streamBrandCheckException(name) {
        return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
      }
      exports3.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
      exports3.CountQueuingStrategy = CountQueuingStrategy;
      exports3.ReadableByteStreamController = ReadableByteStreamController;
      exports3.ReadableStream = ReadableStream2;
      exports3.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
      exports3.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
      exports3.ReadableStreamDefaultController = ReadableStreamDefaultController;
      exports3.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
      exports3.TransformStream = TransformStream;
      exports3.TransformStreamDefaultController = TransformStreamDefaultController;
      exports3.WritableStream = WritableStream;
      exports3.WritableStreamDefaultController = WritableStreamDefaultController;
      exports3.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  })(ponyfill_es2018, ponyfill_es2018.exports);
  return ponyfill_es2018.exports;
}
const POOL_SIZE$1 = 65536;
if (!globalThis.ReadableStream) {
  try {
    const process2 = require("node:process");
    const { emitWarning } = process2;
    try {
      process2.emitWarning = () => {
      };
      Object.assign(globalThis, require("node:stream/web"));
      process2.emitWarning = emitWarning;
    } catch (error) {
      process2.emitWarning = emitWarning;
      throw error;
    }
  } catch (error) {
    Object.assign(globalThis, requirePonyfill_es2018());
  }
}
try {
  const { Blob: Blob2 } = require("buffer");
  if (Blob2 && !Blob2.prototype.stream) {
    Blob2.prototype.stream = function name(params) {
      let position = 0;
      const blob = this;
      return new ReadableStream({
        type: "bytes",
        async pull(ctrl) {
          const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
          const buffer = await chunk.arrayBuffer();
          position += buffer.byteLength;
          ctrl.enqueue(new Uint8Array(buffer));
          if (position === blob.size) {
            ctrl.close();
          }
        }
      });
    };
  }
} catch (error) {
}
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
const POOL_SIZE = 65536;
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0, b = part;
      while (position !== b.size) {
        const chunk = b.slice(position, Math.min(b.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
const _Blob = (_a = class {
  constructor(blobParts = [], options = {}) {
    __privateAdd(this, _parts, []);
    __privateAdd(this, _type, "");
    __privateAdd(this, _size, 0);
    __privateAdd(this, _endings, "transparent");
    if (typeof blobParts !== "object" || blobParts === null) {
      throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
    }
    if (typeof blobParts[Symbol.iterator] !== "function") {
      throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
    }
    if (typeof options !== "object" && typeof options !== "function") {
      throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
    }
    if (options === null)
      options = {};
    const encoder = new TextEncoder();
    for (const element of blobParts) {
      let part;
      if (ArrayBuffer.isView(element)) {
        part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
      } else if (element instanceof ArrayBuffer) {
        part = new Uint8Array(element.slice(0));
      } else if (element instanceof _a) {
        part = element;
      } else {
        part = encoder.encode(`${element}`);
      }
      __privateSet(this, _size, __privateGet(this, _size) + (ArrayBuffer.isView(part) ? part.byteLength : part.size));
      __privateGet(this, _parts).push(part);
    }
    __privateSet(this, _endings, `${options.endings === void 0 ? "transparent" : options.endings}`);
    const type = options.type === void 0 ? "" : String(options.type);
    __privateSet(this, _type, /^[\x20-\x7E]*$/.test(type) ? type : "");
  }
  get size() {
    return __privateGet(this, _size);
  }
  get type() {
    return __privateGet(this, _type);
  }
  async text() {
    const decoder = new TextDecoder();
    let str = "";
    for await (const part of toIterator(__privateGet(this, _parts), false)) {
      str += decoder.decode(part, { stream: true });
    }
    str += decoder.decode();
    return str;
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of toIterator(__privateGet(this, _parts), false)) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    const it = toIterator(__privateGet(this, _parts), true);
    return new globalThis.ReadableStream({
      type: "bytes",
      async pull(ctrl) {
        const chunk = await it.next();
        chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
      },
      async cancel() {
        await it.return();
      }
    });
  }
  slice(start = 0, end = this.size, type = "") {
    const { size } = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = __privateGet(this, _parts);
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      if (added >= span) {
        break;
      }
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        let chunk;
        if (ArrayBuffer.isView(part)) {
          chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
          added += chunk.byteLength;
        } else {
          chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
          added += chunk.size;
        }
        relativeEnd -= size2;
        blobParts.push(chunk);
        relativeStart = 0;
      }
    }
    const blob = new _a([], { type: String(type).toLowerCase() });
    __privateSet(blob, _size, span);
    __privateSet(blob, _parts, blobParts);
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
}, _parts = new WeakMap(), _type = new WeakMap(), _size = new WeakMap(), _endings = new WeakMap(), _a);
Object.defineProperties(_Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
const Blob = _Blob;
const Blob$1 = Blob;
const _File = (_b = class extends Blob$1 {
  constructor(fileBits, fileName, options = {}) {
    if (arguments.length < 2) {
      throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
    }
    super(fileBits, options);
    __privateAdd(this, _lastModified, 0);
    __privateAdd(this, _name, "");
    if (options === null)
      options = {};
    const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
    if (!Number.isNaN(lastModified)) {
      __privateSet(this, _lastModified, lastModified);
    }
    __privateSet(this, _name, String(fileName));
  }
  get name() {
    return __privateGet(this, _name);
  }
  get lastModified() {
    return __privateGet(this, _lastModified);
  }
  get [Symbol.toStringTag]() {
    return "File";
  }
  static [Symbol.hasInstance](object) {
    return !!object && object instanceof Blob$1 && /^(File)$/.test(object[Symbol.toStringTag]);
  }
}, _lastModified = new WeakMap(), _name = new WeakMap(), _b);
const File = _File;
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
var { toStringTag: t, iterator: i, hasInstance: h } = Symbol, r = Math.random, m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(","), f$1 = (a2, b, c) => (a2 += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a2), b.name !== c || b[t] == "blob" ? new File([b], c, b) : b] : [a2, b + ""]), e = (c, f2) => (f2 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22"), x = (n, a2, e2) => {
  if (a2.length < e2) {
    throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a2.length} present.`);
  }
};
const FormData = (_c = class {
  constructor(...a2) {
    __privateAdd(this, _d, []);
    if (a2.length)
      throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
  }
  get [t]() {
    return "FormData";
  }
  [i]() {
    return this.entries();
  }
  static [h](o) {
    return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
  }
  append(...a2) {
    x("append", arguments, 2);
    __privateGet(this, _d).push(f$1(...a2));
  }
  delete(a2) {
    x("delete", arguments, 1);
    a2 += "";
    __privateSet(this, _d, __privateGet(this, _d).filter(([b]) => b !== a2));
  }
  get(a2) {
    x("get", arguments, 1);
    a2 += "";
    for (var b = __privateGet(this, _d), l = b.length, c = 0; c < l; c++)
      if (b[c][0] === a2)
        return b[c][1];
    return null;
  }
  getAll(a2, b) {
    x("getAll", arguments, 1);
    b = [];
    a2 += "";
    __privateGet(this, _d).forEach((c) => c[0] === a2 && b.push(c[1]));
    return b;
  }
  has(a2) {
    x("has", arguments, 1);
    a2 += "";
    return __privateGet(this, _d).some((b) => b[0] === a2);
  }
  forEach(a2, b) {
    x("forEach", arguments, 1);
    for (var [c, d] of this)
      a2.call(b, d, c, this);
  }
  set(...a2) {
    x("set", arguments, 2);
    var b = [], c = true;
    a2 = f$1(...a2);
    __privateGet(this, _d).forEach((d) => {
      d[0] === a2[0] ? c && (c = !b.push(a2)) : b.push(d);
    });
    c && b.push(a2);
    __privateSet(this, _d, b);
  }
  *entries() {
    yield* __privateGet(this, _d);
  }
  *keys() {
    for (var [a2] of this)
      yield a2;
  }
  *values() {
    for (var [, a2] of this)
      yield a2;
  }
}, _d = new WeakMap(), _c);
function formDataToBlob(F2, B = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(new RegExp("\\r(?!\\n)|(?<!\\r)\\n", "g"), "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
class FetchBaseError extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
}
class FetchError extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
}
const NAME = Symbol.toStringTag;
const isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
const isBlob = (object) => {
  return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
const isAbortSignal = (object) => {
  return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
};
const isDomainOrSubdomain = (destination, original) => {
  const orig = new URL(original).hostname;
  const dest = new URL(destination).hostname;
  return orig === dest || orig.endsWith(`.${dest}`);
};
const isSameProtocol = (destination, original) => {
  const orig = new URL(original).protocol;
  const dest = new URL(destination).protocol;
  return orig === dest;
};
const pipeline = node_util.promisify(Stream__default.default.pipeline);
const INTERNALS$2 = Symbol("Body internals");
class Body {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = node_buffer.Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (node_buffer.Buffer.isBuffer(body))
      ;
    else if (node_util.types.isAnyArrayBuffer(body)) {
      body = node_buffer.Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = node_buffer.Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof Stream__default.default)
      ;
    else if (body instanceof FormData) {
      body = formDataToBlob(body);
      boundary = body.type.split("=")[1];
    } else {
      body = node_buffer.Buffer.from(String(body));
    }
    let stream = body;
    if (node_buffer.Buffer.isBuffer(body)) {
      stream = Stream__default.default.Readable.from(body);
    } else if (isBlob(body)) {
      stream = Stream__default.default.Readable.from(body.stream());
    }
    this[INTERNALS$2] = {
      body,
      stream,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof Stream__default.default) {
      body.on("error", (error_) => {
        const error = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
        this[INTERNALS$2].error = error;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].stream;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async formData() {
    const ct = this.headers.get("content-type");
    if (ct.startsWith("application/x-www-form-urlencoded")) {
      const formData = new FormData();
      const parameters = new URLSearchParams(await this.text());
      for (const [name, value] of parameters) {
        formData.append(name, value);
      }
      return formData;
    }
    const { toFormData: toFormData2 } = await Promise.resolve().then(() => multipartParser);
    return toFormData2(this.body, ct);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.arrayBuffer();
    return new Blob$1([buf], {
      type: ct
    });
  }
  async json() {
    const text = await this.text();
    return JSON.parse(text);
  }
  async text() {
    const buffer = await consumeBody(this);
    return new TextDecoder().decode(buffer);
  }
  buffer() {
    return consumeBody(this);
  }
}
Body.prototype.buffer = node_util.deprecate(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true },
  data: { get: node_util.deprecate(
    () => {
    },
    "data doesn't exist, use json(), text(), arrayBuffer(), or body instead",
    "https://github.com/node-fetch/node-fetch/issues/1000 (response)"
  ) }
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  const { body } = data;
  if (body === null) {
    return node_buffer.Buffer.alloc(0);
  }
  if (!(body instanceof Stream__default.default)) {
    return node_buffer.Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error);
        throw error;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error) {
    const error_ = error instanceof FetchBaseError ? error : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, "system", error);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return node_buffer.Buffer.from(accum.join(""));
      }
      return node_buffer.Buffer.concat(accum, accumBytes);
    } catch (error) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, "system", error);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
const clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance[INTERNALS$2];
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof Stream__default.default && typeof body.getBoundary !== "function") {
    p1 = new Stream.PassThrough({ highWaterMark });
    p2 = new Stream.PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].stream = p1;
    body = p2;
  }
  return body;
};
const getNonSpecFormDataBoundary = node_util.deprecate(
  (body) => body.getBoundary(),
  "form-data doesn't follow the spec and requires special treatment. Use alternative package",
  "https://github.com/node-fetch/node-fetch/issues/1167"
);
const extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (node_buffer.Buffer.isBuffer(body) || node_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body instanceof FormData) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
  }
  if (body instanceof Stream__default.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
const getTotalBytes = (request) => {
  const { body } = request[INTERNALS$2];
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (node_buffer.Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  return null;
};
const writeToStream = async (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else {
    await pipeline(body, dest);
  }
};
const validateHeaderName = typeof http__default.default.validateHeaderName === "function" ? http__default.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const error = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(error, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw error;
  }
};
const validateHeaderValue = typeof http__default.default.validateHeaderValue === "function" ? http__default.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const error = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(error, "code", { value: "ERR_INVALID_CHAR" });
    throw error;
  }
};
class Headers$1 extends URLSearchParams {
  constructor(init) {
    let result = [];
    if (init instanceof Headers$1) {
      const raw = init.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init == null)
      ;
    else if (typeof init === "object" && !node_util.types.isBoxedPrimitive(init)) {
      const method = init[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init].map((pair) => {
          if (typeof pair !== "object" || node_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(
                target,
                String(name).toLowerCase(),
                String(value)
              );
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(
                target,
                String(name).toLowerCase()
              );
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback, thisArg = void 0) {
    for (const name of this.keys()) {
      Reflect.apply(callback, thisArg, [this.get(name), name, this]);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
}
Object.defineProperties(
  Headers$1.prototype,
  ["get", "entries", "forEach", "values"].reduce((result, property) => {
    result[property] = { enumerable: true };
    return result;
  }, {})
);
function fromRawHeaders(headers = []) {
  return new Headers$1(
    headers.reduce((result, value, index2, array) => {
      if (index2 % 2 === 0) {
        result.push(array.slice(index2, index2 + 2));
      }
      return result;
    }, []).filter(([name, value]) => {
      try {
        validateHeaderName(name);
        validateHeaderValue(name, String(value));
        return true;
      } catch {
        return false;
      }
    })
  );
}
const redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
const isRedirect = (code) => {
  return redirectStatus.has(code);
};
const INTERNALS$1 = Symbol("Response internals");
class Response extends Body {
  constructor(body = null, options = {}) {
    super(body, options);
    const status = options.status != null ? options.status : 200;
    const headers = new Headers$1(options.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      type: "default",
      url: options.url,
      status,
      statusText: options.statusText || "",
      headers,
      counter: options.counter,
      highWaterMark: options.highWaterMark
    };
  }
  get type() {
    return this[INTERNALS$1].type;
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response(clone(this, this.highWaterMark), {
      type: this.type,
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size,
      highWaterMark: this.highWaterMark
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  static error() {
    const response = new Response(null, { status: 0, statusText: "" });
    response[INTERNALS$1].type = "error";
    return response;
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
}
Object.defineProperties(Response.prototype, {
  type: { enumerable: true },
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
const getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
};
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
const ReferrerPolicy = /* @__PURE__ */ new Set([
  "",
  "no-referrer",
  "no-referrer-when-downgrade",
  "same-origin",
  "origin",
  "strict-origin",
  "origin-when-cross-origin",
  "strict-origin-when-cross-origin",
  "unsafe-url"
]);
const DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = node_net.isIP(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (url.host === "localhost" || url.host.endsWith(".localhost")) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
const INTERNALS = Symbol("Request internals");
const isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
const doBadDataWarn = node_util.deprecate(
  () => {
  },
  ".data is not a valid RequestInit property, use .body instead",
  "https://github.com/node-fetch/node-fetch/issues/1000 (request)"
);
class Request extends Body {
  constructor(input, init = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    if (parsedURL.username !== "" || parsedURL.password !== "") {
      throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
    }
    let method = init.method || input.method || "GET";
    if (/^(delete|get|head|options|post|put)$/i.test(method)) {
      method = method.toUpperCase();
    }
    if (!isRequest(init) && "data" in init) {
      doBadDataWarn();
    }
    if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init.body ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init.size || input.size || 0
    });
    const headers = new Headers$1(init.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.set("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init) {
      signal = init.signal;
    }
    if (signal != null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    }
    let referrer = init.referrer == null ? input.referrer : init.referrer;
    if (referrer === "") {
      referrer = "no-referrer";
    } else if (referrer) {
      const parsedReferrer = new URL(referrer);
      referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
    } else {
      referrer = void 0;
    }
    this[INTERNALS] = {
      method,
      redirect: init.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal,
      referrer
    };
    this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
    this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
    this.counter = init.counter || input.counter || 0;
    this.agent = init.agent || input.agent;
    this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
    this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return node_url.format(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  get referrer() {
    if (this[INTERNALS].referrer === "no-referrer") {
      return "";
    }
    if (this[INTERNALS].referrer === "client") {
      return "about:client";
    }
    if (this[INTERNALS].referrer) {
      return this[INTERNALS].referrer.toString();
    }
    return void 0;
  }
  get referrerPolicy() {
    return this[INTERNALS].referrerPolicy;
  }
  set referrerPolicy(referrerPolicy) {
    this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
}
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true },
  referrer: { enumerable: true },
  referrerPolicy: { enumerable: true }
});
const getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers$1(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (request.referrerPolicy === "") {
    request.referrerPolicy = DEFAULT_REFERRER_POLICY;
  }
  if (request.referrer && request.referrer !== "no-referrer") {
    request[INTERNALS].referrer = determineRequestsReferrer(request);
  } else {
    request[INTERNALS].referrer = "no-referrer";
  }
  if (request[INTERNALS].referrer instanceof URL) {
    headers.set("Referer", request.referrer);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip, deflate, br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const options = {
    path: parsedURL.pathname + search,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return {
    parsedURL,
    options
  };
};
class AbortError extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
}
/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
if (!globalThis.DOMException) {
  try {
    const { MessageChannel } = require("worker_threads"), port = new MessageChannel().port1, ab = new ArrayBuffer();
    port.postMessage(ab, [ab, ab]);
  } catch (err) {
    err.constructor.name === "DOMException" && (globalThis.DOMException = err.constructor);
  }
}
const supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
async function fetch$1(url, options_) {
  return new Promise((resolve, reject) => {
    const request = new Request(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? https__default.default : http__default.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error = new AbortError("The operation was aborted.");
      reject(error);
      if (request.body && request.body instanceof Stream__default.default.Readable) {
        request.body.destroy(error);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL.toString(), options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error.message}`, "system", error));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error) => {
      if (response && response.body) {
        response.body.destroy(error);
      }
    });
    if (process.version < "v14") {
      request_.on("socket", (s2) => {
        let endedWithEventsCount;
        s2.prependListener("end", () => {
          endedWithEventsCount = s2._eventsCount;
        });
        s2.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s2._eventsCount && !hadError) {
            const error = new Error("Premature close");
            error.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL(location, request.url);
        } catch {
          if (request.redirect !== "manual") {
            reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers$1(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (!isDomainOrSubdomain(request.url, locationURL) || !isSameProtocol(request.url, locationURL)) {
              for (const name of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOptions.headers.delete(name);
              }
            }
            if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream__default.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve(fetch$1(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = Stream.pipeline(response_, new Stream.PassThrough(), (error) => {
        if (error) {
          reject(error);
        }
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      const zlibOptions = {
        flush: zlib__default.default.Z_SYNC_FLUSH,
        finishFlush: zlib__default.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = Stream.pipeline(body, zlib__default.default.createGunzip(zlibOptions), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = Stream.pipeline(response_, new Stream.PassThrough(), (error) => {
          if (error) {
            reject(error);
          }
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = Stream.pipeline(body, zlib__default.default.createInflate(), (error) => {
              if (error) {
                reject(error);
              }
            });
          } else {
            body = Stream.pipeline(body, zlib__default.default.createInflateRaw(), (error) => {
              if (error) {
                reject(error);
              }
            });
          }
          response = new Response(body, responseOptions);
          resolve(response);
        });
        raw.once("end", () => {
          if (!response) {
            response = new Response(body, responseOptions);
            resolve(response);
          }
        });
        return;
      }
      if (codings === "br") {
        body = Stream.pipeline(body, zlib__default.default.createBrotliDecompress(), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve(response);
    });
    writeToStream(request_, request).catch(reject);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = node_buffer.Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error = new Error("Premature close");
        error.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error);
      }
    };
    const onData = (buf) => {
      properLastChunkReceived = node_buffer.Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = node_buffer.Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && node_buffer.Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    };
    socket.prependListener("close", onSocketClose);
    socket.on("data", onData);
    request.on("close", () => {
      socket.removeListener("close", onSocketClose);
      socket.removeListener("data", onData);
    });
  });
}
var HEADERS = Symbol("headers");
var _a2;
var HeadersPolyfill = class {
  constructor() {
    this[_a2] = {};
  }
  [(_a2 = HEADERS, Symbol.iterator)]() {
    return this.entries();
  }
  *keys() {
    for (const name of Object.keys(this[HEADERS])) {
      yield name;
    }
  }
  *values() {
    for (const value of Object.values(this[HEADERS])) {
      yield value;
    }
  }
  *entries() {
    for (const name of Object.keys(this[HEADERS])) {
      yield [name, this.get(name)];
    }
  }
  get(name) {
    return this[HEADERS][normalizeHeaderName(name)] || null;
  }
  set(name, value) {
    const normalizedName = normalizeHeaderName(name);
    this[HEADERS][normalizedName] = typeof value !== "string" ? String(value) : value;
  }
  append(name, value) {
    const normalizedName = normalizeHeaderName(name);
    const resolvedValue = this.has(normalizedName) ? `${this.get(normalizedName)}, ${value}` : value;
    this.set(name, resolvedValue);
  }
  delete(name) {
    if (!this.has(name)) {
      return;
    }
    const normalizedName = normalizeHeaderName(name);
    delete this[HEADERS][normalizedName];
  }
  all() {
    return this[HEADERS];
  }
  has(name) {
    return this[HEADERS].hasOwnProperty(normalizeHeaderName(name));
  }
  forEach(callback, thisArg) {
    for (const name in this[HEADERS]) {
      if (this[HEADERS].hasOwnProperty(name)) {
        callback.call(thisArg, this[HEADERS][name], name, this);
      }
    }
  }
};
var HEADERS_INVALID_CHARACTERS = /[^a-z0-9\-#$%&'*+.^_`|~]/i;
function normalizeHeaderName(name) {
  if (typeof name !== "string") {
    name = String(name);
  }
  if (HEADERS_INVALID_CHARACTERS.test(name) || name.trim() === "") {
    throw new TypeError("Invalid character in header field name");
  }
  return name.toLowerCase();
}
function createHeaders() {
  return new (typeof Headers === "function" ? Headers : HeadersPolyfill)();
}
var ErrorResponse = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
};
function notFoundHandler(requestCtx) {
  return errorResponse(requestCtx, new ErrorResponse(404, "Not Found"));
}
function errorHandler(requestCtx, e2) {
  const status = 500;
  let message = "Server Error";
  let stack = void 0;
  if (e2 != null) {
    if (typeof e2 === "object") {
      if (typeof e2.message === "string") {
        message = e2.message;
      }
      if (e2.stack != null) {
        stack = String(e2.stack);
      }
    } else {
      message = String(e2);
    }
  }
  const html = minimalHtmlResponse(status, message, stack);
  const headers = createHeaders();
  headers.set("Content-Type", "text/html; charset=utf-8");
  return requestCtx.response(
    status,
    headers,
    async (stream) => {
      stream.write(html);
    },
    e2
  );
}
function errorResponse(requestCtx, errorResponse2) {
  const html = minimalHtmlResponse(
    errorResponse2.status,
    errorResponse2.message,
    errorResponse2.stack
  );
  const headers = createHeaders();
  headers.set("Content-Type", "text/html; charset=utf-8");
  return requestCtx.response(
    errorResponse2.status,
    headers,
    async (stream) => {
      stream.write(html);
    },
    errorResponse2
  );
}
function minimalHtmlResponse(status, message, stack) {
  const width = typeof message === "string" ? "600px" : "300px";
  const color = status >= 500 ? COLOR_500 : COLOR_400;
  if (status < 500) {
    stack = "";
  }
  return `<!DOCTYPE html>
<html data-qwik-city-status="${status}">
<head>
  <meta charset="utf-8">
  <title>${status} ${message}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { color: ${color}; background-color: #fafafa; padding: 30px; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif; }
    p { max-width: ${width}; margin: 60px auto 30px auto; background: white; border-radius: 4px; box-shadow: 0px 0px 50px -20px ${color}; overflow: hidden; }
    strong { display: inline-block; padding: 15px; background: ${color}; color: white; }
    span { display: inline-block; padding: 15px; }
    pre { max-width: 580px; margin: 0 auto; }
  </style>
</head>
<body>
  <p>
    <strong>${status}</strong>
    <span>${message}</span>
  </p>
  ${stack ? `<pre><code>${stack}</code></pre>` : ``}
</body>
</html>
`;
}
var COLOR_400 = "#006ce9";
var COLOR_500 = "#713fc2";
var MODULE_CACHE$1 = /* @__PURE__ */ new WeakMap();
var loadRoute$1 = async (routes2, menus2, cacheModules2, pathname) => {
  if (Array.isArray(routes2)) {
    for (const route of routes2) {
      const match = route[0].exec(pathname);
      if (match) {
        const loaders = route[1];
        const params = getRouteParams$1(route[2], match);
        const routeBundleNames = route[4];
        const mods = new Array(loaders.length);
        const pendingLoads = [];
        const menuLoader = getMenuLoader$1(menus2, pathname);
        let menu = void 0;
        loaders.forEach((moduleLoader, i2) => {
          loadModule$1(
            moduleLoader,
            pendingLoads,
            (routeModule) => mods[i2] = routeModule,
            cacheModules2
          );
        });
        loadModule$1(
          menuLoader,
          pendingLoads,
          (menuModule) => menu = menuModule == null ? void 0 : menuModule.default,
          cacheModules2
        );
        if (pendingLoads.length > 0) {
          await Promise.all(pendingLoads);
        }
        return [params, mods, menu, routeBundleNames];
      }
    }
  }
  return null;
};
var loadModule$1 = (moduleLoader, pendingLoads, moduleSetter, cacheModules2) => {
  if (typeof moduleLoader === "function") {
    const loadedModule = MODULE_CACHE$1.get(moduleLoader);
    if (loadedModule) {
      moduleSetter(loadedModule);
    } else {
      const l = moduleLoader();
      if (typeof l.then === "function") {
        pendingLoads.push(
          l.then((loadedModule2) => {
            if (cacheModules2 !== false) {
              MODULE_CACHE$1.set(moduleLoader, loadedModule2);
            }
            moduleSetter(loadedModule2);
          })
        );
      } else if (l) {
        moduleSetter(l);
      }
    }
  }
};
var getMenuLoader$1 = (menus2, pathname) => {
  if (menus2) {
    const menu = menus2.find(
      (m2) => m2[0] === pathname || pathname.startsWith(m2[0] + (pathname.endsWith("/") ? "" : "/"))
    );
    if (menu) {
      return menu[1];
    }
  }
  return void 0;
};
var getRouteParams$1 = (paramNames, match) => {
  const params = {};
  if (paramNames) {
    for (let i2 = 0; i2 < paramNames.length; i2++) {
      params[paramNames[i2]] = match ? match[i2 + 1] : "";
    }
  }
  return params;
};
var RedirectResponse = class {
  constructor(url, status, headers) {
    this.url = url;
    this.location = url;
    this.status = isRedirectStatus(status) ? status : 307;
    this.headers = headers || createHeaders();
    this.headers.set("Location", this.location);
    this.headers.delete("Cache-Control");
  }
};
function redirectResponse(requestCtx, responseRedirect) {
  return requestCtx.response(responseRedirect.status, responseRedirect.headers, async () => {
  });
}
function isRedirectStatus(status) {
  return typeof status === "number" && status >= 301 && status <= 308;
}
async function loadUserResponse(requestCtx, params, routeModules, platform, trailingSlash2, basePathname2 = "/") {
  if (routeModules.length === 0) {
    throw new ErrorResponse(404, `Not Found`);
  }
  const { request, url } = requestCtx;
  const { pathname } = url;
  const isPageModule = isLastModulePageRoute(routeModules);
  const isPageDataRequest = isPageModule && request.headers.get("Accept") === "application/json";
  const type = isPageDataRequest ? "pagedata" : isPageModule ? "pagehtml" : "endpoint";
  const userResponse = {
    type,
    url,
    params,
    status: 200,
    headers: createHeaders(),
    resolvedBody: void 0,
    pendingBody: void 0,
    aborted: false
  };
  let hasRequestMethodHandler = false;
  if (isPageModule && pathname !== basePathname2) {
    if (trailingSlash2) {
      if (!pathname.endsWith("/")) {
        throw new RedirectResponse(pathname + "/" + url.search, 307);
      }
    } else {
      if (pathname.endsWith("/")) {
        throw new RedirectResponse(
          pathname.slice(0, pathname.length - 1) + url.search,
          307
        );
      }
    }
  }
  let routeModuleIndex = -1;
  const abort = () => {
    routeModuleIndex = ABORT_INDEX;
  };
  const redirect = (url2, status) => {
    return new RedirectResponse(url2, status, userResponse.headers);
  };
  const error = (status, message) => {
    return new ErrorResponse(status, message);
  };
  const next = async () => {
    routeModuleIndex++;
    while (routeModuleIndex < routeModules.length) {
      const endpointModule = routeModules[routeModuleIndex];
      let reqHandler = void 0;
      switch (request.method) {
        case "GET": {
          reqHandler = endpointModule.onGet;
          break;
        }
        case "POST": {
          reqHandler = endpointModule.onPost;
          break;
        }
        case "PUT": {
          reqHandler = endpointModule.onPut;
          break;
        }
        case "PATCH": {
          reqHandler = endpointModule.onPatch;
          break;
        }
        case "OPTIONS": {
          reqHandler = endpointModule.onOptions;
          break;
        }
        case "HEAD": {
          reqHandler = endpointModule.onHead;
          break;
        }
        case "DELETE": {
          reqHandler = endpointModule.onDelete;
          break;
        }
      }
      reqHandler = reqHandler || endpointModule.onRequest;
      if (typeof reqHandler === "function") {
        hasRequestMethodHandler = true;
        const response = {
          get status() {
            return userResponse.status;
          },
          set status(code) {
            userResponse.status = code;
          },
          get headers() {
            return userResponse.headers;
          },
          redirect,
          error
        };
        const requestEv = {
          request,
          url: new URL(url),
          params: { ...params },
          response,
          platform,
          next,
          abort
        };
        const syncData = reqHandler(requestEv);
        if (typeof syncData === "function") {
          userResponse.pendingBody = createPendingBody(syncData);
        } else if (syncData !== null && typeof syncData === "object" && typeof syncData.then === "function") {
          const asyncResolved = await syncData;
          if (typeof asyncResolved === "function") {
            userResponse.pendingBody = createPendingBody(asyncResolved);
          } else {
            userResponse.resolvedBody = asyncResolved;
          }
        } else {
          userResponse.resolvedBody = syncData;
        }
      }
      routeModuleIndex++;
    }
  };
  await next();
  userResponse.aborted = routeModuleIndex >= ABORT_INDEX;
  if (!isPageDataRequest && isRedirectStatus(userResponse.status) && userResponse.headers.has("Location")) {
    throw new RedirectResponse(
      userResponse.headers.get("Location"),
      userResponse.status,
      userResponse.headers
    );
  }
  if (type === "endpoint" && !hasRequestMethodHandler) {
    throw new ErrorResponse(405, `Method Not Allowed`);
  }
  return userResponse;
}
function createPendingBody(cb) {
  return new Promise((resolve, reject) => {
    try {
      const rtn = cb();
      if (rtn !== null && typeof rtn === "object" && typeof rtn.then === "function") {
        rtn.then(resolve, reject);
      } else {
        resolve(rtn);
      }
    } catch (e2) {
      reject(e2);
    }
  });
}
function isLastModulePageRoute(routeModules) {
  const lastRouteModule = routeModules[routeModules.length - 1];
  return lastRouteModule && typeof lastRouteModule.default === "function";
}
function updateRequestCtx(requestCtx, trailingSlash2) {
  let pathname = requestCtx.url.pathname;
  if (pathname.endsWith(QDATA_JSON)) {
    requestCtx.request.headers.set("Accept", "application/json");
    const trimEnd = pathname.length - QDATA_JSON_LEN + (trailingSlash2 ? 1 : 0);
    pathname = pathname.slice(0, trimEnd);
    if (pathname === "") {
      pathname = "/";
    }
    requestCtx.url.pathname = pathname;
  }
}
var QDATA_JSON = "/q-data.json";
var QDATA_JSON_LEN = QDATA_JSON.length;
var ABORT_INDEX = 999999999;
function endpointHandler(requestCtx, userResponse) {
  const { pendingBody, resolvedBody, status, headers } = userResponse;
  const { response } = requestCtx;
  if (pendingBody === void 0 && resolvedBody === void 0) {
    return response(status, headers, asyncNoop);
  }
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }
  const isJson = headers.get("Content-Type").includes("json");
  return response(status, headers, async ({ write }) => {
    const body = pendingBody !== void 0 ? await pendingBody : resolvedBody;
    if (body !== void 0) {
      if (isJson) {
        write(JSON.stringify(body));
      } else {
        const type = typeof body;
        if (type === "string") {
          write(body);
        } else if (type === "number" || type === "boolean") {
          write(String(body));
        } else {
          write(body);
        }
      }
    }
  });
}
var asyncNoop = async () => {
};
function pageHandler(requestCtx, userResponse, render2, opts, routeBundleNames) {
  const { status, headers } = userResponse;
  const { response } = requestCtx;
  const isPageData = userResponse.type === "pagedata";
  if (isPageData) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  } else if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "text/html; charset=utf-8");
  }
  return response(isPageData ? 200 : status, headers, async (stream) => {
    const result = await render2({
      stream: isPageData ? noopStream : stream,
      envData: getQwikCityEnvData(userResponse),
      ...opts
    });
    if (isPageData) {
      stream.write(JSON.stringify(await getClientPageData(userResponse, result, routeBundleNames)));
    } else {
      if ((typeof result).html === "string") {
        stream.write(result.html);
      }
    }
    if (typeof stream.clientData === "function") {
      stream.clientData(await getClientPageData(userResponse, result, routeBundleNames));
    }
  });
}
async function getClientPageData(userResponse, result, routeBundleNames) {
  const prefetchBundleNames = getPrefetchBundleNames(result, routeBundleNames);
  const clientPage = {
    body: userResponse.pendingBody ? await userResponse.pendingBody : userResponse.resolvedBody,
    status: userResponse.status !== 200 ? userResponse.status : void 0,
    redirect: userResponse.status >= 301 && userResponse.status <= 308 && userResponse.headers.get("location") || void 0,
    prefetch: prefetchBundleNames.length > 0 ? prefetchBundleNames : void 0
  };
  return clientPage;
}
function getPrefetchBundleNames(result, routeBundleNames) {
  const bundleNames = [];
  const addBundle2 = (bundleName) => {
    if (bundleName && !bundleNames.includes(bundleName)) {
      bundleNames.push(bundleName);
    }
  };
  const addPrefetchResource = (prefetchResources) => {
    if (Array.isArray(prefetchResources)) {
      for (const prefetchResource of prefetchResources) {
        const bundleName = prefetchResource.url.split("/").pop();
        if (bundleName && !bundleNames.includes(bundleName)) {
          addBundle2(bundleName);
          addPrefetchResource(prefetchResource.imports);
        }
      }
    }
  };
  addPrefetchResource(result.prefetchResources);
  const manifest2 = result.manifest || result._manifest;
  const renderedSymbols = result._symbols;
  if (manifest2 && renderedSymbols) {
    for (const renderedSymbolName of renderedSymbols) {
      const symbol = manifest2.symbols[renderedSymbolName];
      if (symbol && symbol.ctxName === "component$") {
        addBundle2(manifest2.mapping[renderedSymbolName]);
      }
    }
  }
  if (routeBundleNames) {
    for (const routeBundleName of routeBundleNames) {
      addBundle2(routeBundleName);
    }
  }
  return bundleNames;
}
function getQwikCityEnvData(userResponse) {
  const { url, params, pendingBody, resolvedBody, status } = userResponse;
  return {
    url: url.href,
    qwikcity: {
      params: { ...params },
      response: {
        body: pendingBody || resolvedBody,
        status
      }
    }
  };
}
var noopStream = { write: () => {
} };
async function requestHandler(requestCtx, render2, platform, opts) {
  try {
    updateRequestCtx(requestCtx, trailingSlash);
    const loadedRoute = await loadRoute$1(routes, menus, cacheModules, requestCtx.url.pathname);
    if (loadedRoute) {
      const [params, mods, _, routeBundleNames] = loadedRoute;
      const userResponse = await loadUserResponse(
        requestCtx,
        params,
        mods,
        platform,
        trailingSlash,
        basePathname
      );
      if (userResponse.aborted) {
        return null;
      }
      if (userResponse.type === "endpoint") {
        return endpointHandler(requestCtx, userResponse);
      }
      return pageHandler(requestCtx, userResponse, render2, opts, routeBundleNames);
    }
  } catch (e2) {
    if (e2 instanceof RedirectResponse) {
      return redirectResponse(requestCtx, e2);
    }
    if (e2 instanceof ErrorResponse) {
      return errorResponse(requestCtx, e2);
    }
    return errorHandler(requestCtx, e2);
  }
  return null;
}
function getUrl(req) {
  const protocol = req.socket.encrypted || req.connection.encrypted ? "https" : "http";
  return new URL(req.url || "/", `${protocol}://${req.headers.host}`);
}
function fromNodeHttp(url, req, res) {
  const requestHeaders = createHeaders();
  const nodeRequestHeaders = req.headers;
  for (const key in nodeRequestHeaders) {
    const value = nodeRequestHeaders[key];
    if (typeof value === "string") {
      requestHeaders.set(key, value);
    } else if (Array.isArray(value)) {
      for (const v of value) {
        requestHeaders.append(key, v);
      }
    }
  }
  const getRequestBody = async () => {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    return Buffer.concat(buffers).toString();
  };
  const requestCtx = {
    request: {
      headers: requestHeaders,
      formData: async () => {
        return new URLSearchParams(await getRequestBody());
      },
      json: async () => {
        return JSON.parse(await getRequestBody());
      },
      method: req.method || "GET",
      text: getRequestBody,
      url: url.href
    },
    response: async (status, headers, body) => {
      res.statusCode = status;
      headers.forEach((value, key) => res.setHeader(key, value));
      body({
        write: (chunk) => {
          res.write;
          res.write(chunk);
        }
      }).finally(() => {
        res.end();
      });
      return res;
    },
    url
  };
  return requestCtx;
}
function patchGlobalFetch() {
  if (typeof global !== "undefined" && typeof globalThis.fetch !== "function" && typeof process !== "undefined" && process.versions.node) {
    if (!globalThis.fetch) {
      globalThis.fetch = fetch$1;
      globalThis.Headers = Headers$1;
      globalThis.Request = Request;
      globalThis.Response = Response;
    }
  }
}
function qwikCity(render2, opts) {
  patchGlobalFetch();
  const router = async (req, res, next) => {
    try {
      const requestCtx = fromNodeHttp(getUrl(req), req, res);
      try {
        const rsp = await requestHandler(requestCtx, render2, {}, opts);
        if (!rsp) {
          next();
        }
      } catch (e2) {
        await errorHandler(requestCtx, e2);
      }
    } catch (e2) {
      next(e2);
    }
  };
  const notFound = async (req, res, next) => {
    try {
      const requestCtx = fromNodeHttp(getUrl(req), req, res);
      await notFoundHandler(requestCtx);
    } catch (e2) {
      next(e2);
    }
  };
  return {
    router,
    notFound
  };
}
/**
 * @license
 * @builder.io/qwik/server 0.9.0
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
if (typeof global == "undefined") {
  const g = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof self ? self : {};
  g.global = g;
}
var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a2, b) => (typeof require !== "undefined" ? require : a2)[b]
}) : x2)(function(x2) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x2 + '" is not supported');
});
function createTimer() {
  if (typeof performance === "undefined") {
    return () => 0;
  }
  const start = performance.now();
  return () => {
    const end = performance.now();
    const delta = end - start;
    return delta / 1e6;
  };
}
function getBuildBase(opts) {
  let base = opts.base;
  if (typeof base === "string") {
    if (!base.endsWith("/")) {
      base += "/";
    }
    return base;
  }
  return "/build/";
}
function createPlatform(opts, resolvedManifest) {
  const mapper = resolvedManifest == null ? void 0 : resolvedManifest.mapper;
  const mapperFn = opts.symbolMapper ? opts.symbolMapper : (symbolName) => {
    if (mapper) {
      const hash = getSymbolHash(symbolName);
      const result = mapper[hash];
      if (!result) {
        console.error("Cannot resolve symbol", symbolName, "in", mapper);
      }
      return result;
    }
  };
  const serverPlatform = {
    isServer: true,
    async importSymbol(_element, qrl, symbolName) {
      let [modulePath] = String(qrl).split("#");
      if (!modulePath.endsWith(".js")) {
        modulePath += ".js";
      }
      const module2 = __require(modulePath);
      if (!(symbolName in module2)) {
        throw new Error(`Q-ERROR: missing symbol '${symbolName}' in module '${modulePath}'.`);
      }
      const symbol = module2[symbolName];
      return symbol;
    },
    raf: () => {
      console.error("server can not rerender");
      return Promise.resolve();
    },
    nextTick: (fn) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fn());
        });
      });
    },
    chunkForSymbol(symbolName) {
      return mapperFn(symbolName, mapper);
    }
  };
  return serverPlatform;
}
async function setServerPlatform(opts, manifest2) {
  const platform = createPlatform(opts, manifest2);
  setPlatform(platform);
}
var getSymbolHash = (symbolName) => {
  const index2 = symbolName.lastIndexOf("_");
  if (index2 > -1) {
    return symbolName.slice(index2 + 1);
  }
  return symbolName;
};
var QWIK_LOADER_DEFAULT_MINIFIED = '(()=>{function e(e){return"object"==typeof e&&e&&"Module"===e[Symbol.toStringTag]}((t,n)=>{const o="__q_context__",r=window,a=(e,n,o)=>{n=n.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),t.querySelectorAll("[on"+e+"\\\\:"+n+"]").forEach((t=>l(t,e,n,o)))},i=(e,t)=>new CustomEvent(e,{detail:t}),s=e=>{throw Error("QWIK "+e)},c=(e,n)=>(e=e.closest("[q\\\\:container]"),new URL(n,new URL(e?e.getAttribute("q:base"):t.baseURI,t.baseURI))),l=async(n,a,l,d)=>{var u;n.hasAttribute("preventdefault:"+l)&&d.preventDefault();const b="on"+a+":"+l,v=null==(u=n._qc_)?void 0:u.li[b];if(v){for(const e of v)await e.getFn([n,d],(()=>n.isConnected))(d,n);return}const p=n.getAttribute(b);if(p)for(const a of p.split("\\n")){const l=c(n,a);if(l){const a=f(l),c=(r[l.pathname]||(w=await import(l.href.split("#")[0]),Object.values(w).find(e)||w))[a]||s(l+" does not export "+a),u=t[o];if(n.isConnected)try{t[o]=[n,d,l],await c(d,n)}finally{t[o]=u,t.dispatchEvent(i("qsymbol",{symbol:a,element:n}))}}}var w},f=e=>e.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",d=async e=>{let t=e.target;for(a("-document",e.type,e);t&&t.getAttribute;)await l(t,"",e.type,e),t=e.bubbles&&!0!==e.cancelBubble?t.parentElement:null},u=e=>{a("-window",e.type,e)},b=()=>{const e=t.readyState;if(!n&&("interactive"==e||"complete"==e)){n=1,a("","qinit",i("qinit"));const e=t.querySelectorAll("[on\\\\:qvisible]");if(e.length>0){const t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),l(n.target,"","qvisible",i("qvisible",n)))}));e.forEach((e=>t.observe(e)))}}},v=new Set,p=e=>{for(const t of e)v.has(t)||(document.addEventListener(t,d,{capture:!0}),r.addEventListener(t,u),v.add(t))};if(!t.qR){const e=r.qwikevents;Array.isArray(e)&&p(e),r.qwikevents={push:(...e)=>p(e)},t.addEventListener("readystatechange",b),b()}})(document)})();';
var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n    function findModule(module) {\n        return Object.values(module).find(isModule) || module;\n    }\n    function isModule(module) {\n        return "object" == typeof module && module && "Module" === module[Symbol.toStringTag];\n    }\n    ((doc, hasInitialized) => {\n        const win = window;\n        const broadcast = (infix, type, ev) => {\n            type = type.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n            doc.querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, infix, type, ev)));\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const error = msg => {\n            throw new Error("QWIK " + msg);\n        };\n        const qrlResolver = (element, qrl) => {\n            element = element.closest("[q\\\\:container]");\n            return new URL(qrl, new URL(element ? element.getAttribute("q:base") : doc.baseURI, doc.baseURI));\n        };\n        const dispatch = async (element, onPrefix, eventName, ev) => {\n            var _a;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const attrName = "on" + onPrefix + ":" + eventName;\n            const qrls = null == (_a = element._qc_) ? void 0 : _a.li[attrName];\n            if (qrls) {\n                for (const q of qrls) {\n                    await q.getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                }\n                return;\n            }\n            const attrValue = element.getAttribute(attrName);\n            if (attrValue) {\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = qrlResolver(element, qrl);\n                    if (url) {\n                        const symbolName = getSymbolName(url);\n                        const handler = (win[url.pathname] || findModule(await import(url.href.split("#")[0])))[symbolName] || error(url + " does not export " + symbolName);\n                        const previousCtx = doc.__q_context__;\n                        if (element.isConnected) {\n                            try {\n                                doc.__q_context__ = [ element, ev, url ];\n                                await handler(ev, element);\n                            } finally {\n                                doc.__q_context__ = previousCtx;\n                                doc.dispatchEvent(createEvent("qsymbol", {\n                                    symbol: symbolName,\n                                    element: element\n                                }));\n                            }\n                        }\n                    }\n                }\n            }\n        };\n        const getSymbolName = url => url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n        const processDocumentEvent = async ev => {\n            let element = ev.target;\n            broadcast("-document", ev.type, ev);\n            while (element && element.getAttribute) {\n                await dispatch(element, "", ev.type, ev);\n                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev.type, ev);\n        };\n        const processReadyStateChange = () => {\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                hasInitialized = 1;\n                broadcast("", "qinit", createEvent("qinit"));\n                const results = doc.querySelectorAll("[on\\\\:qvisible]");\n                if (results.length > 0) {\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", "qvisible", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const events =  new Set;\n        const push = eventNames => {\n            for (const eventName of eventNames) {\n                if (!events.has(eventName)) {\n                    document.addEventListener(eventName, processDocumentEvent, {\n                        capture: !0\n                    });\n                    win.addEventListener(eventName, processWindowEvent);\n                    events.add(eventName);\n                }\n            }\n        };\n        if (!doc.qR) {\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && push(qwikevents);\n            win.qwikevents = {\n                push: (...e) => push(e)\n            };\n            doc.addEventListener("readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})();';
var QWIK_LOADER_OPTIMIZE_MINIFIED = '(()=>{function e(e){return"object"==typeof e&&e&&"Module"===e[Symbol.toStringTag]}((t,n)=>{const o="__q_context__",r=window,a=(e,n,o)=>{n=n.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),t.querySelectorAll("[on"+e+"\\\\:"+n+"]").forEach((t=>l(t,e,n,o)))},i=(e,t)=>new CustomEvent(e,{detail:t}),s=e=>{throw Error("QWIK "+e)},c=(e,n)=>(e=e.closest("[q\\\\:container]"),new URL(n,new URL(e?e.getAttribute("q:base"):t.baseURI,t.baseURI))),l=async(n,a,l,d)=>{var u;n.hasAttribute("preventdefault:"+l)&&d.preventDefault();const b="on"+a+":"+l,v=null==(u=n._qc_)?void 0:u.li[b];if(v){for(const e of v)await e.getFn([n,d],(()=>n.isConnected))(d,n);return}const p=n.getAttribute(b);if(p)for(const a of p.split("\\n")){const l=c(n,a);if(l){const a=f(l),c=(r[l.pathname]||(w=await import(l.href.split("#")[0]),Object.values(w).find(e)||w))[a]||s(l+" does not export "+a),u=t[o];if(n.isConnected)try{t[o]=[n,d,l],await c(d,n)}finally{t[o]=u,t.dispatchEvent(i("qsymbol",{symbol:a,element:n}))}}}var w},f=e=>e.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",d=async e=>{let t=e.target;for(a("-document",e.type,e);t&&t.getAttribute;)await l(t,"",e.type,e),t=e.bubbles&&!0!==e.cancelBubble?t.parentElement:null},u=e=>{a("-window",e.type,e)},b=()=>{const e=t.readyState;if(!n&&("interactive"==e||"complete"==e)){n=1,a("","qinit",i("qinit"));const e=t.querySelectorAll("[on\\\\:qvisible]");if(e.length>0){const t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),l(n.target,"","qvisible",i("qvisible",n)))}));e.forEach((e=>t.observe(e)))}}},v=new Set,p=e=>{for(const t of e)v.has(t)||(document.addEventListener(t,d,{capture:!0}),r.addEventListener(t,u),v.add(t))};if(!t.qR){const e=r.qwikevents;Array.isArray(e)&&p(e),r.qwikevents={push:(...e)=>p(e)},t.addEventListener("readystatechange",b),b()}})(document)})();';
var QWIK_LOADER_OPTIMIZE_DEBUG = '(() => {\n    function findModule(module) {\n        return Object.values(module).find(isModule) || module;\n    }\n    function isModule(module) {\n        return "object" == typeof module && module && "Module" === module[Symbol.toStringTag];\n    }\n    ((doc, hasInitialized) => {\n        const win = window;\n        const broadcast = (infix, type, ev) => {\n            type = type.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n            doc.querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, infix, type, ev)));\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const error = msg => {\n            throw new Error("QWIK " + msg);\n        };\n        const qrlResolver = (element, qrl) => {\n            element = element.closest("[q\\\\:container]");\n            return new URL(qrl, new URL(element ? element.getAttribute("q:base") : doc.baseURI, doc.baseURI));\n        };\n        const dispatch = async (element, onPrefix, eventName, ev) => {\n            var _a;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            const attrName = "on" + onPrefix + ":" + eventName;\n            const qrls = null == (_a = element._qc_) ? void 0 : _a.li[attrName];\n            if (qrls) {\n                for (const q of qrls) {\n                    await q.getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                }\n                return;\n            }\n            const attrValue = element.getAttribute(attrName);\n            if (attrValue) {\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = qrlResolver(element, qrl);\n                    if (url) {\n                        const symbolName = getSymbolName(url);\n                        const handler = (win[url.pathname] || findModule(await import(url.href.split("#")[0])))[symbolName] || error(url + " does not export " + symbolName);\n                        const previousCtx = doc.__q_context__;\n                        if (element.isConnected) {\n                            try {\n                                doc.__q_context__ = [ element, ev, url ];\n                                await handler(ev, element);\n                            } finally {\n                                doc.__q_context__ = previousCtx;\n                                doc.dispatchEvent(createEvent("qsymbol", {\n                                    symbol: symbolName,\n                                    element: element\n                                }));\n                            }\n                        }\n                    }\n                }\n            }\n        };\n        const getSymbolName = url => url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n        const processDocumentEvent = async ev => {\n            let element = ev.target;\n            broadcast("-document", ev.type, ev);\n            while (element && element.getAttribute) {\n                await dispatch(element, "", ev.type, ev);\n                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev.type, ev);\n        };\n        const processReadyStateChange = () => {\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                hasInitialized = 1;\n                broadcast("", "qinit", createEvent("qinit"));\n                const results = doc.querySelectorAll("[on\\\\:qvisible]");\n                if (results.length > 0) {\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", "qvisible", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const events = new Set;\n        const push = eventNames => {\n            for (const eventName of eventNames) {\n                if (!events.has(eventName)) {\n                    document.addEventListener(eventName, processDocumentEvent, {\n                        capture: !0\n                    });\n                    win.addEventListener(eventName, processWindowEvent);\n                    events.add(eventName);\n                }\n            }\n        };\n        if (!doc.qR) {\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && push(qwikevents);\n            win.qwikevents = {\n                push: (...e) => push(e)\n            };\n            doc.addEventListener("readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})();';
function getQwikLoaderScript(opts = {}) {
  if (Array.isArray(opts.events) && opts.events.length > 0) {
    const loader = opts.debug ? QWIK_LOADER_OPTIMIZE_DEBUG : QWIK_LOADER_OPTIMIZE_MINIFIED;
    return loader.replace("window.qEvents", JSON.stringify(opts.events));
  }
  return opts.debug ? QWIK_LOADER_DEFAULT_DEBUG : QWIK_LOADER_DEFAULT_MINIFIED;
}
function getPrefetchResources(snapshotResult, opts, resolvedManifest) {
  if (!resolvedManifest) {
    return [];
  }
  const prefetchStrategy = opts.prefetchStrategy;
  const buildBase = getBuildBase(opts);
  if (prefetchStrategy !== null) {
    if (!prefetchStrategy || !prefetchStrategy.symbolsToPrefetch || prefetchStrategy.symbolsToPrefetch === "auto") {
      return getAutoPrefetch(snapshotResult, resolvedManifest, buildBase);
    }
    if (typeof prefetchStrategy.symbolsToPrefetch === "function") {
      try {
        return prefetchStrategy.symbolsToPrefetch({ manifest: resolvedManifest.manifest });
      } catch (e2) {
        console.error("getPrefetchUrls, symbolsToPrefetch()", e2);
      }
    }
  }
  return [];
}
function getAutoPrefetch(snapshotResult, resolvedManifest, buildBase) {
  const prefetchResources = [];
  const listeners = snapshotResult == null ? void 0 : snapshotResult.listeners;
  const stateObjs = snapshotResult == null ? void 0 : snapshotResult.objs;
  const { mapper, manifest: manifest2 } = resolvedManifest;
  const urls = /* @__PURE__ */ new Set();
  if (Array.isArray(listeners)) {
    for (const prioritizedSymbolName in mapper) {
      const hasSymbol = listeners.some((l) => {
        return l.qrl.getHash() === prioritizedSymbolName;
      });
      if (hasSymbol) {
        addBundle(manifest2, urls, prefetchResources, buildBase, mapper[prioritizedSymbolName][1]);
      }
    }
  }
  if (Array.isArray(stateObjs)) {
    for (const obj of stateObjs) {
      if (isQrl(obj)) {
        const qrlSymbolName = obj.getHash();
        const resolvedSymbol = mapper[qrlSymbolName];
        if (resolvedSymbol) {
          addBundle(manifest2, urls, prefetchResources, buildBase, resolvedSymbol[0]);
        }
      }
    }
  }
  return prefetchResources;
}
function addBundle(manifest2, urls, prefetchResources, buildBase, bundleFileName) {
  const url = buildBase + bundleFileName;
  if (!urls.has(url)) {
    urls.add(url);
    const bundle = manifest2.bundles[bundleFileName];
    if (bundle) {
      const prefetchResource = {
        url,
        imports: []
      };
      prefetchResources.push(prefetchResource);
      if (Array.isArray(bundle.imports)) {
        for (const importedFilename of bundle.imports) {
          addBundle(manifest2, urls, prefetchResource.imports, buildBase, importedFilename);
        }
      }
    }
  }
}
var isQrl = (value) => {
  return typeof value === "function" && typeof value.getSymbol === "function";
};
var qDev = globalThis.qDev === true;
var EMPTY_ARRAY = [];
var EMPTY_OBJ = {};
if (qDev) {
  Object.freeze(EMPTY_ARRAY);
  Object.freeze(EMPTY_OBJ);
  Error.stackTraceLimit = 9999;
}
[
  "click",
  "dblclick",
  "contextmenu",
  "auxclick",
  "pointerdown",
  "pointerup",
  "pointermove",
  "pointerover",
  "pointerenter",
  "pointerleave",
  "pointerout",
  "pointercancel",
  "gotpointercapture",
  "lostpointercapture",
  "touchstart",
  "touchend",
  "touchmove",
  "touchcancel",
  "mousedown",
  "mouseup",
  "mousemove",
  "mouseenter",
  "mouseleave",
  "mouseover",
  "mouseout",
  "wheel",
  "gesturestart",
  "gesturechange",
  "gestureend",
  "keydown",
  "keyup",
  "keypress",
  "input",
  "change",
  "search",
  "invalid",
  "beforeinput",
  "select",
  "focusin",
  "focusout",
  "focus",
  "blur",
  "submit",
  "reset",
  "scroll"
].map((n) => `on${n.toLowerCase()}$`);
[
  "useWatch$",
  "useClientEffect$",
  "useEffect$",
  "component$",
  "useStyles$",
  "useStylesScoped$"
].map((n) => n.toLowerCase());
function getValidManifest(manifest2) {
  if (manifest2 != null && manifest2.mapping != null && typeof manifest2.mapping === "object" && manifest2.symbols != null && typeof manifest2.symbols === "object" && manifest2.bundles != null && typeof manifest2.bundles === "object") {
    return manifest2;
  }
  return void 0;
}
function workerFetchScript() {
  const fetch2 = `Promise.all(e.data.map(u=>fetch(u))).finally(()=>{setTimeout(postMessage({}),9999)})`;
  const workerBody = `onmessage=(e)=>{${fetch2}}`;
  const blob = `new Blob(['${workerBody}'],{type:"text/javascript"})`;
  const url = `URL.createObjectURL(${blob})`;
  let s2 = `const w=new Worker(${url});`;
  s2 += `w.postMessage(u.map(u=>new URL(u,origin)+''));`;
  s2 += `w.onmessage=()=>{w.terminate()};`;
  return s2;
}
function prefetchUrlsEventScript(prefetchResources) {
  const data = {
    bundles: flattenPrefetchResources(prefetchResources).map((u) => u.split("/").pop())
  };
  return `dispatchEvent(new CustomEvent("qprefetch",{detail:${JSON.stringify(data)}}))`;
}
function flattenPrefetchResources(prefetchResources) {
  const urls = [];
  const addPrefetchResource = (prefetchResources2) => {
    if (Array.isArray(prefetchResources2)) {
      for (const prefetchResource of prefetchResources2) {
        if (!urls.includes(prefetchResource.url)) {
          urls.push(prefetchResource.url);
          addPrefetchResource(prefetchResource.imports);
        }
      }
    }
  };
  addPrefetchResource(prefetchResources);
  return urls;
}
function applyPrefetchImplementation(opts, prefetchResources) {
  const { prefetchStrategy } = opts;
  if (prefetchStrategy !== null) {
    const prefetchImpl = normalizePrefetchImplementation(prefetchStrategy == null ? void 0 : prefetchStrategy.implementation);
    const prefetchNodes = [];
    if (prefetchImpl.prefetchEvent === "always") {
      prefetchUrlsEvent(prefetchNodes, prefetchResources);
    }
    if (prefetchImpl.linkInsert === "html-append") {
      linkHtmlImplementation(prefetchNodes, prefetchResources, prefetchImpl);
    }
    if (prefetchImpl.linkInsert === "js-append") {
      linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl);
    } else if (prefetchImpl.workerFetchInsert === "always") {
      workerFetchImplementation(prefetchNodes, prefetchResources);
    }
    if (prefetchNodes.length > 0) {
      return jsx(Fragment, { children: prefetchNodes });
    }
  }
  return null;
}
function prefetchUrlsEvent(prefetchNodes, prefetchResources) {
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      dangerouslySetInnerHTML: prefetchUrlsEventScript(prefetchResources)
    })
  );
}
function linkHtmlImplementation(prefetchNodes, prefetchResources, prefetchImpl) {
  const urls = flattenPrefetchResources(prefetchResources);
  const rel = prefetchImpl.linkRel || "prefetch";
  for (const url of urls) {
    const attributes = {};
    attributes["href"] = url;
    attributes["rel"] = rel;
    if (rel === "prefetch" || rel === "preload") {
      if (url.endsWith(".js")) {
        attributes["as"] = "script";
      }
    }
    prefetchNodes.push(jsx("link", attributes, void 0));
  }
}
function linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl) {
  const rel = prefetchImpl.linkRel || "prefetch";
  let s2 = ``;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s2 += `let supportsLinkRel = true;`;
  }
  s2 += `const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`;
  s2 += `u.map((u,i)=>{`;
  s2 += `const l=document.createElement('link');`;
  s2 += `l.setAttribute("href",u);`;
  s2 += `l.setAttribute("rel","${rel}");`;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s2 += `if(i===0){`;
    s2 += `try{`;
    s2 += `supportsLinkRel=l.relList.supports("${rel}");`;
    s2 += `}catch(e){}`;
    s2 += `}`;
  }
  s2 += `document.body.appendChild(l);`;
  s2 += `});`;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s2 += `if(!supportsLinkRel){`;
    s2 += workerFetchScript();
    s2 += `}`;
  }
  if (prefetchImpl.workerFetchInsert === "always") {
    s2 += workerFetchScript();
  }
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      dangerouslySetInnerHTML: s2
    })
  );
}
function workerFetchImplementation(prefetchNodes, prefetchResources) {
  let s2 = `const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`;
  s2 += workerFetchScript();
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      dangerouslySetInnerHTML: s2
    })
  );
}
function normalizePrefetchImplementation(input) {
  if (typeof input === "string") {
    switch (input) {
      case "link-prefetch-html": {
        return {
          linkInsert: "html-append",
          linkRel: "prefetch",
          workerFetchInsert: null,
          prefetchEvent: null
        };
      }
      case "link-prefetch": {
        return {
          linkInsert: "js-append",
          linkRel: "prefetch",
          workerFetchInsert: "no-link-support",
          prefetchEvent: null
        };
      }
      case "link-preload-html": {
        return {
          linkInsert: "html-append",
          linkRel: "preload",
          workerFetchInsert: null,
          prefetchEvent: null
        };
      }
      case "link-preload": {
        return {
          linkInsert: "js-append",
          linkRel: "preload",
          workerFetchInsert: "no-link-support",
          prefetchEvent: null
        };
      }
      case "link-modulepreload-html": {
        return {
          linkInsert: "html-append",
          linkRel: "modulepreload",
          workerFetchInsert: null,
          prefetchEvent: null
        };
      }
      case "link-modulepreload": {
        return {
          linkInsert: "js-append",
          linkRel: "modulepreload",
          workerFetchInsert: "no-link-support",
          prefetchEvent: null
        };
      }
    }
    return {
      linkInsert: null,
      linkRel: null,
      workerFetchInsert: "always",
      prefetchEvent: null
    };
  }
  if (input && typeof input === "object") {
    return input;
  }
  const defaultImplementation = {
    linkInsert: null,
    linkRel: null,
    workerFetchInsert: "always",
    prefetchEvent: null
  };
  return defaultImplementation;
}
var DOCTYPE = "<!DOCTYPE html>";
async function renderToStream(rootNode, opts) {
  var _a3, _b2, _c2, _d2, _e, _f;
  let stream = opts.stream;
  let bufferSize = 0;
  let totalSize = 0;
  let networkFlushes = 0;
  let firstFlushTime = 0;
  const inOrderStreaming = (_b2 = (_a3 = opts.streaming) == null ? void 0 : _a3.inOrder) != null ? _b2 : {
    strategy: "auto",
    maximunInitialChunk: 5e4,
    maximunChunk: 3e4
  };
  const containerTagName = (_c2 = opts.containerTagName) != null ? _c2 : "html";
  const containerAttributes = (_d2 = opts.containerAttributes) != null ? _d2 : {};
  let buffer = "";
  const nativeStream = stream;
  const firstFlushTimer = createTimer();
  function flush() {
    if (buffer) {
      nativeStream.write(buffer);
      buffer = "";
      bufferSize = 0;
      networkFlushes++;
      if (networkFlushes === 1) {
        firstFlushTime = firstFlushTimer();
      }
    }
  }
  function enqueue(chunk) {
    bufferSize += chunk.length;
    totalSize += chunk.length;
    buffer += chunk;
  }
  switch (inOrderStreaming.strategy) {
    case "disabled":
      stream = {
        write: enqueue
      };
      break;
    case "direct":
      stream = nativeStream;
      break;
    case "auto":
      let count = 0;
      let forceFlush = false;
      const minimunChunkSize = (_e = inOrderStreaming.maximunChunk) != null ? _e : 0;
      const initialChunkSize = (_f = inOrderStreaming.maximunInitialChunk) != null ? _f : 0;
      stream = {
        write(chunk) {
          if (chunk === "<!--qkssr-f-->") {
            forceFlush || (forceFlush = true);
          } else if (chunk === "<!--qkssr-pu-->") {
            count++;
          } else if (chunk === "<!--qkssr-po-->") {
            count--;
          } else {
            enqueue(chunk);
          }
          const chunkSize = networkFlushes === 0 ? initialChunkSize : minimunChunkSize;
          if (count === 0 && (forceFlush || bufferSize >= chunkSize)) {
            forceFlush = false;
            flush();
          }
        }
      };
      break;
  }
  if (containerTagName === "html") {
    stream.write(DOCTYPE);
  } else {
    if (opts.qwikLoader) {
      if (opts.qwikLoader.include === void 0) {
        opts.qwikLoader.include = "never";
      }
      if (opts.qwikLoader.position === void 0) {
        opts.qwikLoader.position = "bottom";
      }
    } else {
      opts.qwikLoader = {
        include: "never"
      };
    }
  }
  if (!opts.manifest) {
    console.warn("Missing client manifest, loading symbols in the client might 404");
  }
  const buildBase = getBuildBase(opts);
  const resolvedManifest = resolveManifest(opts.manifest);
  await setServerPlatform(opts, resolvedManifest);
  let prefetchResources = [];
  let snapshotResult = null;
  const injections = resolvedManifest == null ? void 0 : resolvedManifest.manifest.injections;
  const beforeContent = injections ? injections.map((injection) => {
    var _a4;
    return jsx(injection.tag, (_a4 = injection.attributes) != null ? _a4 : EMPTY_OBJ);
  }) : void 0;
  const renderTimer = createTimer();
  const renderSymbols = [];
  let renderTime = 0;
  let snapshotTime = 0;
  await renderSSR(rootNode, {
    stream,
    containerTagName,
    containerAttributes,
    envData: opts.envData,
    base: buildBase,
    beforeContent,
    beforeClose: async (contexts, containerState) => {
      var _a4, _b3, _c3;
      renderTime = renderTimer();
      const snapshotTimer = createTimer();
      snapshotResult = await _pauseFromContexts(contexts, containerState);
      prefetchResources = getPrefetchResources(snapshotResult, opts, resolvedManifest);
      const jsonData = JSON.stringify(snapshotResult.state, void 0, qDev ? "  " : void 0);
      const children = [
        jsx("script", {
          type: "qwik/json",
          dangerouslySetInnerHTML: escapeText(jsonData)
        })
      ];
      if (prefetchResources.length > 0) {
        children.push(applyPrefetchImplementation(opts, prefetchResources));
      }
      const needLoader = !snapshotResult || snapshotResult.mode !== "static";
      const includeMode = (_b3 = (_a4 = opts.qwikLoader) == null ? void 0 : _a4.include) != null ? _b3 : "auto";
      const includeLoader = includeMode === "always" || includeMode === "auto" && needLoader;
      if (includeLoader) {
        const qwikLoaderScript = getQwikLoaderScript({
          events: (_c3 = opts.qwikLoader) == null ? void 0 : _c3.events,
          debug: opts.debug
        });
        children.push(
          jsx("script", {
            id: "qwikloader",
            dangerouslySetInnerHTML: qwikLoaderScript
          })
        );
      }
      const uniqueListeners = /* @__PURE__ */ new Set();
      snapshotResult.listeners.forEach((li) => {
        uniqueListeners.add(JSON.stringify(li.eventName));
      });
      const extraListeners = Array.from(uniqueListeners);
      if (extraListeners.length > 0) {
        let content = `window.qwikevents.push(${extraListeners.join(", ")})`;
        if (!includeLoader) {
          content = `window.qwikevents||=[];${content}`;
        }
        children.push(
          jsx("script", {
            dangerouslySetInnerHTML: content
          })
        );
      }
      collectRenderSymbols(renderSymbols, contexts);
      snapshotTime = snapshotTimer();
      return jsx(Fragment, { children });
    }
  });
  flush();
  const result = {
    prefetchResources: void 0,
    snapshotResult,
    flushes: networkFlushes,
    manifest: resolvedManifest == null ? void 0 : resolvedManifest.manifest,
    size: totalSize,
    timing: {
      render: renderTime,
      snapshot: snapshotTime,
      firstFlush: firstFlushTime
    },
    _symbols: renderSymbols
  };
  return result;
}
function resolveManifest(manifest2) {
  if (!manifest2) {
    return void 0;
  }
  if ("mapper" in manifest2) {
    return manifest2;
  }
  manifest2 = getValidManifest(manifest2);
  if (manifest2) {
    const mapper = {};
    Object.entries(manifest2.mapping).forEach(([key, value]) => {
      mapper[getSymbolHash(key)] = [key, value];
    });
    return {
      mapper,
      manifest: manifest2
    };
  }
  return void 0;
}
var escapeText = (str) => {
  return str.replace(/<(\/?script)/g, "\\x3C$1");
};
function collectRenderSymbols(renderSymbols, elements) {
  var _a3;
  for (const ctx of elements) {
    const symbol = (_a3 = ctx.$renderQrl$) == null ? void 0 : _a3.getSymbol();
    if (symbol && !renderSymbols.includes(symbol)) {
      renderSymbols.push(symbol);
    }
  }
}
const manifest = { "symbols": { "s_hA9UPaY8sNQ": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component_a_onClick", "canonicalFilename": "s_ha9upay8snq", "hash": "hA9UPaY8sNQ", "ctxKind": "event", "ctxName": "onClick$", "captures": true, "parent": "s_mYsiJcA4IBc" }, "s_skxgNVWVOT8": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component_a_onMouseOver", "canonicalFilename": "s_skxgnvwvot8", "hash": "skxgNVWVOT8", "ctxKind": "event", "ctxName": "onMouseOver$", "captures": false, "parent": "s_mYsiJcA4IBc" }, "s_uVE5iM9H73c": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component_a_onQVisible", "canonicalFilename": "s_uve5im9h73c", "hash": "uVE5iM9H73c", "ctxKind": "event", "ctxName": "onQVisible$", "captures": false, "parent": "s_mYsiJcA4IBc" }, "s_AaAlzKH0KlQ": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCity_component_useWatch", "canonicalFilename": "s_aaalzkh0klq", "hash": "AaAlzKH0KlQ", "ctxKind": "function", "ctxName": "useWatch$", "captures": true, "parent": "s_z1nvHyEppoI" }, "s_3sccYCDd1Z0": { "origin": "root.tsx", "displayName": "root_component", "canonicalFilename": "s_3sccycdd1z0", "hash": "3sccYCDd1Z0", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_VkLNXphUh5s": { "origin": "routes/layout.tsx", "displayName": "layout_component", "canonicalFilename": "s_vklnxphuh5s", "hash": "VkLNXphUh5s", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_ceU05TscGYE": { "origin": "components/header/header.tsx", "displayName": "header_component", "canonicalFilename": "s_ceu05tscgye", "hash": "ceU05TscGYE", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_flbgQB75nqU": { "origin": "routes/quemsomos/index.tsx", "displayName": "quemsomos_component", "canonicalFilename": "s_flbgqb75nqu", "hash": "flbgQB75nqU", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_hGK5aNZYjtw": { "origin": "routes/portifolio/index.tsx", "displayName": "portifolio_component", "canonicalFilename": "s_hgk5anzyjtw", "hash": "hGK5aNZYjtw", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_mYsiJcA4IBc": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component", "canonicalFilename": "s_mysijca4ibc", "hash": "mYsiJcA4IBc", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_nd8yk3KO22c": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "RouterOutlet_component", "canonicalFilename": "s_nd8yk3ko22c", "hash": "nd8yk3KO22c", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_xYL1qOwPyDI": { "origin": "routes/index.tsx", "displayName": "routes_component", "canonicalFilename": "s_xyl1qowpydi", "hash": "xYL1qOwPyDI", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_z1nvHyEppoI": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCity_component", "canonicalFilename": "s_z1nvhyeppoi", "hash": "z1nvHyEppoI", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_zrbrqoaqXSY": { "origin": "components/router-head/router-head.tsx", "displayName": "RouterHead_component", "canonicalFilename": "s_zrbrqoaqxsy", "hash": "zrbrqoaqXSY", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_N39ca0w8E8Y": { "origin": "components/header/header.tsx", "displayName": "header_component_useStylesScoped", "canonicalFilename": "s_n39ca0w8e8y", "hash": "N39ca0w8E8Y", "ctxKind": "function", "ctxName": "useStylesScoped$", "captures": false, "parent": "s_ceU05TscGYE" } }, "mapping": { "s_hA9UPaY8sNQ": "q-0f5e0418.js", "s_skxgNVWVOT8": "q-0f5e0418.js", "s_uVE5iM9H73c": "q-0f5e0418.js", "s_AaAlzKH0KlQ": "q-f9240e6c.js", "s_3sccYCDd1Z0": "q-061610bd.js", "s_VkLNXphUh5s": "q-25c91d94.js", "s_ceU05TscGYE": "q-9271ae52.js", "s_flbgQB75nqU": "q-6cd2cfa7.js", "s_hGK5aNZYjtw": "q-539cc4ce.js", "s_mYsiJcA4IBc": "q-0f5e0418.js", "s_nd8yk3KO22c": "q-4c60c5eb.js", "s_xYL1qOwPyDI": "q-41c327fb.js", "s_z1nvHyEppoI": "q-f9240e6c.js", "s_zrbrqoaqXSY": "q-c74507ea.js", "s_N39ca0w8E8Y": "q-9271ae52.js" }, "bundles": { "q-061610bd.js": { "size": 4424, "imports": ["q-dcd66212.js"], "dynamicImports": ["q-0f5e0418.js", "q-4c60c5eb.js", "q-c74507ea.js", "q-d877117d.js", "q-f9240e6c.js"], "origins": ["node_modules/@builder.io/qwik-city/index.qwik.mjs", "src/components/router-head/router-head.js", "src/entry_root.js", "src/s_3sccycdd1z0.js"], "symbols": ["s_3sccYCDd1Z0"] }, "q-0f5e0418.js": { "size": 886, "imports": ["q-061610bd.js", "q-dcd66212.js"], "origins": ["src/entry_Link.js", "src/s_ha9upay8snq.js", "src/s_mysijca4ibc.js", "src/s_skxgnvwvot8.js", "src/s_uve5im9h73c.js"], "symbols": ["s_hA9UPaY8sNQ", "s_mYsiJcA4IBc", "s_skxgNVWVOT8", "s_uVE5iM9H73c"] }, "q-143c7194.js": { "size": 2180, "origins": ["node_modules/@builder.io/qwik-city/service-worker.mjs", "src/routes/service-worker.js"] }, "q-25c91d94.js": { "size": 386, "imports": ["q-dcd66212.js"], "dynamicImports": ["q-9271ae52.js"], "origins": ["src/components/header/header.js", "src/entry_layout.js", "src/s_vklnxphuh5s.js"], "symbols": ["s_VkLNXphUh5s"] }, "q-3a1d161c.js": { "size": 158, "imports": ["q-dcd66212.js"], "dynamicImports": ["q-6cd2cfa7.js"], "origins": ["src/routes/quemsomos/index.js"] }, "q-41c327fb.js": { "size": 132, "imports": ["q-dcd66212.js"], "origins": ["src/entry_routes.js", "src/s_xyl1qowpydi.js"], "symbols": ["s_xYL1qOwPyDI"] }, "q-48c51b28.js": { "size": 158, "imports": ["q-dcd66212.js"], "dynamicImports": ["q-539cc4ce.js"], "origins": ["src/routes/portifolio/index.js"] }, "q-4c60c5eb.js": { "size": 269, "imports": ["q-061610bd.js", "q-dcd66212.js"], "origins": ["src/entry_RouterOutlet.js", "src/s_nd8yk3ko22c.js"], "symbols": ["s_nd8yk3KO22c"] }, "q-539cc4ce.js": { "size": 93, "imports": ["q-dcd66212.js"], "origins": ["src/entry_portifolio.js", "src/s_hgk5anzyjtw.js"], "symbols": ["s_hGK5aNZYjtw"] }, "q-575e952f.js": { "size": 158, "imports": ["q-dcd66212.js"], "dynamicImports": ["q-25c91d94.js"], "origins": ["src/routes/layout.js"] }, "q-66ca9794.js": { "size": 196, "imports": ["q-dcd66212.js"], "dynamicImports": ["q-41c327fb.js"], "origins": ["src/routes/index.js"] }, "q-6ada150e.js": { "size": 128, "imports": ["q-dcd66212.js"], "dynamicImports": ["q-143c7194.js"], "origins": ["@qwik-city-entries"] }, "q-6cd2cfa7.js": { "size": 93, "imports": ["q-dcd66212.js"], "origins": ["src/entry_quemsomos.js", "src/s_flbgqb75nqu.js"], "symbols": ["s_flbgQB75nqU"] }, "q-9271ae52.js": { "size": 534, "imports": ["q-dcd66212.js"], "origins": ["src/components/header/header.css?used&inline", "src/entry_header.js", "src/s_ceu05tscgye.js", "src/s_n39ca0w8e8y.js"], "symbols": ["s_ceU05TscGYE", "s_N39ca0w8E8Y"] }, "q-9e07e43e.js": { "size": 58, "imports": ["q-dcd66212.js"] }, "q-c74507ea.js": { "size": 909, "imports": ["q-061610bd.js", "q-dcd66212.js"], "origins": ["src/entry_RouterHead.js", "src/s_zrbrqoaqxsy.js"], "symbols": ["s_zrbrqoaqXSY"] }, "q-d877117d.js": { "size": 509, "imports": ["q-dcd66212.js"], "dynamicImports": ["q-3a1d161c.js", "q-48c51b28.js", "q-575e952f.js", "q-66ca9794.js", "q-6ada150e.js"], "origins": ["@qwik-city-plan"] }, "q-dcd66212.js": { "size": 35907, "dynamicImports": ["q-061610bd.js"], "origins": ["\0vite/preload-helper", "node_modules/@builder.io/qwik/core.min.mjs", "src/global.css", "src/root.js"] }, "q-f9240e6c.js": { "size": 1489, "imports": ["q-061610bd.js", "q-dcd66212.js"], "dynamicImports": ["q-d877117d.js"], "origins": ["@builder.io/qwik/build", "src/entry_QwikCity.js", "src/s_aaalzkh0klq.js", "src/s_z1nvhyeppoi.js"], "symbols": ["s_AaAlzKH0KlQ", "s_z1nvHyEppoI"] } }, "injections": [{ "tag": "link", "location": "head", "attributes": { "rel": "stylesheet", "href": "/build/q-0ea8883c.css" } }], "version": "1", "options": { "target": "client", "buildMode": "production", "forceFullBuild": true, "entryStrategy": { "type": "smart" } }, "platform": { "qwik": "0.9.0", "vite": "", "rollup": "2.78.1", "env": "node", "os": "linux", "node": "16.15.0" } };
const isServer = true;
const isBrowser = false;
const ContentContext = /* @__PURE__ */ createContext$1("qc-c");
const ContentInternalContext = /* @__PURE__ */ createContext$1("qc-ic");
const DocumentHeadContext = /* @__PURE__ */ createContext$1("qc-h");
const RouteLocationContext = /* @__PURE__ */ createContext$1("qc-l");
const RouteNavigateContext = /* @__PURE__ */ createContext$1("qc-n");
const RouterOutlet = /* @__PURE__ */ componentQrl(inlinedQrl(() => {
  const { contents } = useContext(ContentInternalContext);
  if (contents && contents.length > 0) {
    const contentsLen = contents.length;
    let cmp = null;
    for (let i2 = contentsLen - 1; i2 >= 0; i2--)
      cmp = jsx(contents[i2].default, {
        children: cmp
      });
    return cmp;
  }
  return SkipRender;
}, "RouterOutlet_component_nd8yk3KO22c"));
const MODULE_CACHE = /* @__PURE__ */ new WeakMap();
const loadRoute = async (routes2, menus2, cacheModules2, pathname) => {
  if (Array.isArray(routes2))
    for (const route of routes2) {
      const match = route[0].exec(pathname);
      if (match) {
        const loaders = route[1];
        const params = getRouteParams(route[2], match);
        const routeBundleNames = route[4];
        const mods = new Array(loaders.length);
        const pendingLoads = [];
        const menuLoader = getMenuLoader(menus2, pathname);
        let menu = void 0;
        loaders.forEach((moduleLoader, i2) => {
          loadModule(moduleLoader, pendingLoads, (routeModule) => mods[i2] = routeModule, cacheModules2);
        });
        loadModule(menuLoader, pendingLoads, (menuModule) => menu = menuModule == null ? void 0 : menuModule.default, cacheModules2);
        if (pendingLoads.length > 0)
          await Promise.all(pendingLoads);
        return [
          params,
          mods,
          menu,
          routeBundleNames
        ];
      }
    }
  return null;
};
const loadModule = (moduleLoader, pendingLoads, moduleSetter, cacheModules2) => {
  if (typeof moduleLoader === "function") {
    const loadedModule = MODULE_CACHE.get(moduleLoader);
    if (loadedModule)
      moduleSetter(loadedModule);
    else {
      const l = moduleLoader();
      if (typeof l.then === "function")
        pendingLoads.push(l.then((loadedModule2) => {
          if (cacheModules2 !== false)
            MODULE_CACHE.set(moduleLoader, loadedModule2);
          moduleSetter(loadedModule2);
        }));
      else if (l)
        moduleSetter(l);
    }
  }
};
const getMenuLoader = (menus2, pathname) => {
  if (menus2) {
    const menu = menus2.find((m2) => m2[0] === pathname || pathname.startsWith(m2[0] + (pathname.endsWith("/") ? "" : "/")));
    if (menu)
      return menu[1];
  }
  return void 0;
};
const getRouteParams = (paramNames, match) => {
  const params = {};
  if (paramNames)
    for (let i2 = 0; i2 < paramNames.length; i2++)
      params[paramNames[i2]] = match ? match[i2 + 1] : "";
  return params;
};
const resolveHead = (endpoint, routeLocation, contentModules) => {
  const head2 = createDocumentHead();
  const headProps = {
    data: endpoint ? endpoint.body : null,
    head: head2,
    ...routeLocation
  };
  for (let i2 = contentModules.length - 1; i2 >= 0; i2--) {
    const contentModuleHead = contentModules[i2] && contentModules[i2].head;
    if (contentModuleHead) {
      if (typeof contentModuleHead === "function")
        resolveDocumentHead(head2, contentModuleHead(headProps));
      else if (typeof contentModuleHead === "object")
        resolveDocumentHead(head2, contentModuleHead);
    }
  }
  return headProps.head;
};
const resolveDocumentHead = (resolvedHead, updatedHead) => {
  if (typeof updatedHead.title === "string")
    resolvedHead.title = updatedHead.title;
  mergeArray(resolvedHead.meta, updatedHead.meta);
  mergeArray(resolvedHead.links, updatedHead.links);
  mergeArray(resolvedHead.styles, updatedHead.styles);
};
const mergeArray = (existingArr, newArr) => {
  if (Array.isArray(newArr))
    for (const newItem of newArr) {
      if (typeof newItem.key === "string") {
        const existingIndex = existingArr.findIndex((i2) => i2.key === newItem.key);
        if (existingIndex > -1) {
          existingArr[existingIndex] = newItem;
          continue;
        }
      }
      existingArr.push(newItem);
    }
};
const createDocumentHead = () => ({
  title: "",
  meta: [],
  links: [],
  styles: []
});
const useDocumentHead = () => useContext(DocumentHeadContext);
const useLocation = () => useContext(RouteLocationContext);
const useNavigate = () => useContext(RouteNavigateContext);
const useQwikCityEnv = () => noSerialize(useEnvData("qwikcity"));
const toPath = (url) => url.pathname + url.search + url.hash;
const toUrl = (url, baseUrl) => new URL(url, baseUrl.href);
const isSameOrigin = (a2, b) => a2.origin === b.origin;
const isSamePath = (a2, b) => a2.pathname + a2.search === b.pathname + b.search;
const isSamePathname = (a2, b) => a2.pathname === b.pathname;
const isSameOriginDifferentPathname = (a2, b) => isSameOrigin(a2, b) && !isSamePath(a2, b);
const getClientEndpointPath = (pathname) => pathname + (pathname.endsWith("/") ? "" : "/") + "q-data.json";
const getClientNavPath = (props, baseUrl) => {
  const href = props.href;
  if (typeof href === "string" && href.trim() !== "" && typeof props.target !== "string")
    try {
      const linkUrl = toUrl(href, baseUrl);
      const currentUrl = toUrl("", baseUrl);
      if (isSameOrigin(linkUrl, currentUrl))
        return toPath(linkUrl);
    } catch (e2) {
      console.error(e2);
    }
  return null;
};
const getPrefetchUrl = (props, clientNavPath, currentLoc) => {
  if (props.prefetch && clientNavPath) {
    const prefetchUrl = toUrl(clientNavPath, currentLoc);
    if (!isSamePathname(prefetchUrl, toUrl("", currentLoc)))
      return prefetchUrl + "";
  }
  return null;
};
const clientNavigate = (win, routeNavigate) => {
  const currentUrl = win.location;
  const newUrl = toUrl(routeNavigate.path, currentUrl);
  if (isSameOriginDifferentPathname(currentUrl, newUrl)) {
    handleScroll(win, currentUrl, newUrl);
    win.history.pushState("", "", toPath(newUrl));
  }
  if (!win[CLIENT_HISTORY_INITIALIZED]) {
    win[CLIENT_HISTORY_INITIALIZED] = 1;
    win.addEventListener("popstate", () => {
      const currentUrl2 = win.location;
      const previousUrl = toUrl(routeNavigate.path, currentUrl2);
      if (isSameOriginDifferentPathname(currentUrl2, previousUrl)) {
        handleScroll(win, previousUrl, currentUrl2);
        routeNavigate.path = toPath(currentUrl2);
      }
    });
  }
};
const handleScroll = async (win, previousUrl, newUrl) => {
  const doc = win.document;
  const newHash = newUrl.hash;
  if (isSamePath(previousUrl, newUrl)) {
    if (previousUrl.hash !== newHash) {
      await domWait();
      if (newHash)
        scrollToHashId(doc, newHash);
      else
        win.scrollTo(0, 0);
    }
  } else {
    if (newHash)
      for (let i2 = 0; i2 < 24; i2++) {
        await domWait();
        if (scrollToHashId(doc, newHash))
          break;
      }
    else {
      await domWait();
      win.scrollTo(0, 0);
    }
  }
};
const domWait = () => new Promise((resolve) => setTimeout(resolve, 12));
const scrollToHashId = (doc, hash) => {
  const elmId = hash.slice(1);
  const elm = doc.getElementById(elmId);
  if (elm)
    elm.scrollIntoView();
  return elm;
};
const dispatchPrefetchEvent = (prefetchData) => dispatchEvent(new CustomEvent("qprefetch", {
  detail: prefetchData
}));
const CLIENT_HISTORY_INITIALIZED = /* @__PURE__ */ Symbol();
const loadClientData = async (href) => {
  const { cacheModules: cacheModules2 } = await Promise.resolve().then(() => _qwikCityPlan);
  const pagePathname = new URL(href).pathname;
  const endpointUrl = getClientEndpointPath(pagePathname);
  const now = Date.now();
  const expiration = cacheModules2 ? 6e5 : 15e3;
  const cachedClientPageIndex = cachedClientPages.findIndex((c) => c.u === endpointUrl);
  let cachedClientPageData = cachedClientPages[cachedClientPageIndex];
  dispatchPrefetchEvent({
    links: [
      pagePathname
    ]
  });
  if (!cachedClientPageData || cachedClientPageData.t + expiration < now) {
    cachedClientPageData = {
      u: endpointUrl,
      t: now,
      c: new Promise((resolve) => {
        fetch(endpointUrl).then((clientResponse) => {
          const contentType = clientResponse.headers.get("content-type") || "";
          if (clientResponse.ok && contentType.includes("json"))
            clientResponse.json().then((clientData) => {
              dispatchPrefetchEvent({
                bundles: clientData.prefetch,
                links: [
                  pagePathname
                ]
              });
              resolve(clientData);
            }, () => resolve(null));
          else
            resolve(null);
        }, () => resolve(null));
      })
    };
    for (let i2 = cachedClientPages.length - 1; i2 >= 0; i2--)
      if (cachedClientPages[i2].t + expiration < now)
        cachedClientPages.splice(i2, 1);
    cachedClientPages.push(cachedClientPageData);
  }
  cachedClientPageData.c.catch((e2) => console.error(e2));
  return cachedClientPageData.c;
};
const cachedClientPages = [];
const QwikCity = /* @__PURE__ */ componentQrl(inlinedQrl(() => {
  const env = useQwikCityEnv();
  if (!(env == null ? void 0 : env.params))
    throw new Error(`Missing Qwik City Env Data`);
  const urlEnv = useEnvData("url");
  if (!urlEnv)
    throw new Error(`Missing Qwik URL Env Data`);
  const url = new URL(urlEnv);
  const routeLocation = useStore({
    href: url.href,
    pathname: url.pathname,
    query: Object.fromEntries(url.searchParams.entries()),
    params: env.params
  });
  const routeNavigate = useStore({
    path: toPath(url)
  });
  const documentHead = useStore(createDocumentHead);
  const content = useStore({
    headings: void 0,
    menu: void 0
  });
  const contentInternal = useStore({
    contents: void 0
  });
  useContextProvider(ContentContext, content);
  useContextProvider(ContentInternalContext, contentInternal);
  useContextProvider(DocumentHeadContext, documentHead);
  useContextProvider(RouteLocationContext, routeLocation);
  useContextProvider(RouteNavigateContext, routeNavigate);
  useWatchQrl(inlinedQrl(async ({ track }) => {
    const [content2, contentInternal2, documentHead2, env2, routeLocation2, routeNavigate2] = useLexicalScope();
    const { routes: routes2, menus: menus2, cacheModules: cacheModules2 } = await Promise.resolve().then(() => _qwikCityPlan);
    const path = track(routeNavigate2, "path");
    const url2 = new URL(path, routeLocation2.href);
    const pathname = url2.pathname;
    const loadRoutePromise = loadRoute(routes2, menus2, cacheModules2, pathname);
    const endpointResponse = isServer ? env2.response : loadClientData(url2.href);
    const loadedRoute = await loadRoutePromise;
    if (loadedRoute) {
      const [params, mods, menu] = loadedRoute;
      const contentModules = mods;
      const pageModule = contentModules[contentModules.length - 1];
      routeLocation2.href = url2.href;
      routeLocation2.pathname = pathname;
      routeLocation2.params = {
        ...params
      };
      routeLocation2.query = Object.fromEntries(url2.searchParams.entries());
      content2.headings = pageModule.headings;
      content2.menu = menu;
      contentInternal2.contents = noSerialize(contentModules);
      const clientPageData = await endpointResponse;
      const resolvedHead = resolveHead(clientPageData, routeLocation2, contentModules);
      documentHead2.links = resolvedHead.links;
      documentHead2.meta = resolvedHead.meta;
      documentHead2.styles = resolvedHead.styles;
      documentHead2.title = resolvedHead.title;
      if (isBrowser)
        clientNavigate(window, routeNavigate2);
    }
  }, "QwikCity_component_useWatch_AaAlzKH0KlQ", [
    content,
    contentInternal,
    documentHead,
    env,
    routeLocation,
    routeNavigate
  ]));
  return /* @__PURE__ */ jsx(Slot, {});
}, "QwikCity_component_z1nvHyEppoI"));
/* @__PURE__ */ componentQrl(inlinedQrl((props) => {
  const nav = useNavigate();
  const loc = useLocation();
  const originalHref = props.href;
  const linkProps = {
    ...props
  };
  const clientNavPath = getClientNavPath(linkProps, loc);
  const prefetchUrl = getPrefetchUrl(props, clientNavPath, loc);
  linkProps["preventdefault:click"] = !!clientNavPath;
  linkProps.href = clientNavPath || originalHref;
  return /* @__PURE__ */ jsx("a", {
    ...linkProps,
    onClick$: inlinedQrl(() => {
      const [clientNavPath2, linkProps2, nav2] = useLexicalScope();
      if (clientNavPath2)
        nav2.path = linkProps2.href;
    }, "Link_component_a_onClick_hA9UPaY8sNQ", [
      clientNavPath,
      linkProps,
      nav
    ]),
    "data-prefetch": prefetchUrl,
    onMouseOver$: inlinedQrl((_, elm) => prefetchLinkResources(elm), "Link_component_a_onMouseOver_skxgNVWVOT8"),
    onQVisible$: inlinedQrl((_, elm) => prefetchLinkResources(elm, true), "Link_component_a_onQVisible_uVE5iM9H73c"),
    children: /* @__PURE__ */ jsx(Slot, {})
  });
}, "Link_component_mYsiJcA4IBc"));
const prefetchLinkResources = (elm, isOnVisible) => {
  var _a3;
  const prefetchUrl = (_a3 = elm == null ? void 0 : elm.dataset) == null ? void 0 : _a3.prefetch;
  if (prefetchUrl) {
    if (!windowInnerWidth)
      windowInnerWidth = window.innerWidth;
    if (!isOnVisible || isOnVisible && windowInnerWidth < 520)
      loadClientData(prefetchUrl);
  }
};
let windowInnerWidth = 0;
const swRegister = '((s,a,r,i)=>{r=(e,t)=>{t=document.querySelector("[q\\\\:base]"),t&&a.active&&a.active.postMessage({type:"qprefetch",base:t.getAttribute("q:base"),...e})},addEventListener("qprefetch",e=>{const t=e.detail;a?r(t):t.bundles&&s.push(...t.bundles)}),navigator.serviceWorker.register("/service-worker.js").then(e=>{i=()=>{a=e,r({bundles:s})},e.installing?e.installing.addEventListener("statechange",t=>{t.target.state=="activated"&&i()}):e.active&&i()}).catch(e=>console.error(e))})([])';
const ServiceWorkerRegister = () => jsx("script", {
  dangerouslySetInnerHTML: swRegister
});
const RouterHead = /* @__PURE__ */ componentQrl(inlinedQrl(() => {
  const head2 = useDocumentHead();
  const loc = useLocation();
  return /* @__PURE__ */ jsx(Fragment, {
    children: [
      /* @__PURE__ */ jsx("title", {
        children: head2.title
      }),
      /* @__PURE__ */ jsx("link", {
        rel: "canonical",
        href: loc.href
      }),
      /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }),
      /* @__PURE__ */ jsx("link", {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg"
      }),
      /* @__PURE__ */ jsx("link", {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      }),
      /* @__PURE__ */ jsx("link", {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: ""
      }),
      /* @__PURE__ */ jsx("link", {
        href: "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
        rel: "stylesheet"
      }),
      /* @__PURE__ */ jsx("meta", {
        property: "og:site_name",
        content: "Qwik"
      }),
      /* @__PURE__ */ jsx("meta", {
        name: "twitter:site",
        content: "@QwikDev"
      }),
      /* @__PURE__ */ jsx("meta", {
        name: "twitter:title",
        content: "Qwik"
      }),
      head2.meta.map((m2) => /* @__PURE__ */ jsx("meta", {
        ...m2
      })),
      head2.links.map((l) => /* @__PURE__ */ jsx("link", {
        ...l
      })),
      head2.styles.map((s2) => /* @__PURE__ */ jsx("style", {
        ...s2.props,
        dangerouslySetInnerHTML: s2.style
      }))
    ]
  });
}, "s_zrbrqoaqXSY"));
const global$1 = "";
const Root = /* @__PURE__ */ componentQrl(inlinedQrl(() => {
  return /* @__PURE__ */ jsx(QwikCity, {
    children: [
      /* @__PURE__ */ jsx("head", {
        children: [
          /* @__PURE__ */ jsx("meta", {
            charSet: "utf-8"
          }),
          /* @__PURE__ */ jsx(RouterHead, {})
        ]
      }),
      /* @__PURE__ */ jsx("body", {
        lang: "pt-br",
        children: [
          /* @__PURE__ */ jsx(RouterOutlet, {}),
          /* @__PURE__ */ jsx(ServiceWorkerRegister, {})
        ]
      })
    ]
  });
}, "s_3sccYCDd1Z0"));
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a2, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a2, prop, b[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b) => __defProps(a2, __getOwnPropDescs(b));
function render(opts) {
  return renderToStream(/* @__PURE__ */ jsx(Root, {}), __spreadProps(__spreadValues({
    manifest
  }, opts), {
    prefetchStrategy: {
      implementation: {
        linkInsert: null,
        workerFetchInsert: null,
        prefetchEvent: "always"
      }
    }
  }));
}
(function dedupeRequire(dedupe) {
  const Module = require("node:module");
  const resolveFilename = Module._resolveFilename;
  Module._resolveFilename = function(request, parent, isMain, options) {
    if (request[0] !== "." && request[0] !== "/") {
      const parts = request.split("/");
      const pkgName = parts[0][0] === "@" ? parts[0] + "/" + parts[1] : parts[0];
      if (dedupe.includes(pkgName)) {
        parent = module;
      }
    }
    return resolveFilename(request, parent, isMain, options);
  };
})(["@builder.io/qwik", "@builder.io/qwik/jsx-runtime"]);
const entry_preview = qwikCity(render);
let s = 0;
const S = {
  START_BOUNDARY: s++,
  HEADER_FIELD_START: s++,
  HEADER_FIELD: s++,
  HEADER_VALUE_START: s++,
  HEADER_VALUE: s++,
  HEADER_VALUE_ALMOST_DONE: s++,
  HEADERS_ALMOST_DONE: s++,
  PART_DATA_START: s++,
  PART_DATA: s++,
  END: s++
};
let f = 1;
const F = {
  PART_BOUNDARY: f,
  LAST_BOUNDARY: f *= 2
};
const LF = 10;
const CR = 13;
const SPACE = 32;
const HYPHEN = 45;
const COLON = 58;
const A = 97;
const Z = 122;
const lower = (c) => c | 32;
const noop = () => {
};
class MultipartParser {
  constructor(boundary) {
    this.index = 0;
    this.flags = 0;
    this.onHeaderEnd = noop;
    this.onHeaderField = noop;
    this.onHeadersEnd = noop;
    this.onHeaderValue = noop;
    this.onPartBegin = noop;
    this.onPartData = noop;
    this.onPartEnd = noop;
    this.boundaryChars = {};
    boundary = "\r\n--" + boundary;
    const ui8a = new Uint8Array(boundary.length);
    for (let i2 = 0; i2 < boundary.length; i2++) {
      ui8a[i2] = boundary.charCodeAt(i2);
      this.boundaryChars[ui8a[i2]] = true;
    }
    this.boundary = ui8a;
    this.lookbehind = new Uint8Array(this.boundary.length + 8);
    this.state = S.START_BOUNDARY;
  }
  write(data) {
    let i2 = 0;
    const length_ = data.length;
    let previousIndex = this.index;
    let { lookbehind, boundary, boundaryChars, index: index2, state, flags } = this;
    const boundaryLength = this.boundary.length;
    const boundaryEnd = boundaryLength - 1;
    const bufferLength = data.length;
    let c;
    let cl;
    const mark = (name) => {
      this[name + "Mark"] = i2;
    };
    const clear = (name) => {
      delete this[name + "Mark"];
    };
    const callback = (callbackSymbol, start, end, ui8a) => {
      if (start === void 0 || start !== end) {
        this[callbackSymbol](ui8a && ui8a.subarray(start, end));
      }
    };
    const dataCallback = (name, clear2) => {
      const markSymbol = name + "Mark";
      if (!(markSymbol in this)) {
        return;
      }
      if (clear2) {
        callback(name, this[markSymbol], i2, data);
        delete this[markSymbol];
      } else {
        callback(name, this[markSymbol], data.length, data);
        this[markSymbol] = 0;
      }
    };
    for (i2 = 0; i2 < length_; i2++) {
      c = data[i2];
      switch (state) {
        case S.START_BOUNDARY:
          if (index2 === boundary.length - 2) {
            if (c === HYPHEN) {
              flags |= F.LAST_BOUNDARY;
            } else if (c !== CR) {
              return;
            }
            index2++;
            break;
          } else if (index2 - 1 === boundary.length - 2) {
            if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
              state = S.END;
              flags = 0;
            } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
              index2 = 0;
              callback("onPartBegin");
              state = S.HEADER_FIELD_START;
            } else {
              return;
            }
            break;
          }
          if (c !== boundary[index2 + 2]) {
            index2 = -2;
          }
          if (c === boundary[index2 + 2]) {
            index2++;
          }
          break;
        case S.HEADER_FIELD_START:
          state = S.HEADER_FIELD;
          mark("onHeaderField");
          index2 = 0;
        case S.HEADER_FIELD:
          if (c === CR) {
            clear("onHeaderField");
            state = S.HEADERS_ALMOST_DONE;
            break;
          }
          index2++;
          if (c === HYPHEN) {
            break;
          }
          if (c === COLON) {
            if (index2 === 1) {
              return;
            }
            dataCallback("onHeaderField", true);
            state = S.HEADER_VALUE_START;
            break;
          }
          cl = lower(c);
          if (cl < A || cl > Z) {
            return;
          }
          break;
        case S.HEADER_VALUE_START:
          if (c === SPACE) {
            break;
          }
          mark("onHeaderValue");
          state = S.HEADER_VALUE;
        case S.HEADER_VALUE:
          if (c === CR) {
            dataCallback("onHeaderValue", true);
            callback("onHeaderEnd");
            state = S.HEADER_VALUE_ALMOST_DONE;
          }
          break;
        case S.HEADER_VALUE_ALMOST_DONE:
          if (c !== LF) {
            return;
          }
          state = S.HEADER_FIELD_START;
          break;
        case S.HEADERS_ALMOST_DONE:
          if (c !== LF) {
            return;
          }
          callback("onHeadersEnd");
          state = S.PART_DATA_START;
          break;
        case S.PART_DATA_START:
          state = S.PART_DATA;
          mark("onPartData");
        case S.PART_DATA:
          previousIndex = index2;
          if (index2 === 0) {
            i2 += boundaryEnd;
            while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
              i2 += boundaryLength;
            }
            i2 -= boundaryEnd;
            c = data[i2];
          }
          if (index2 < boundary.length) {
            if (boundary[index2] === c) {
              if (index2 === 0) {
                dataCallback("onPartData", true);
              }
              index2++;
            } else {
              index2 = 0;
            }
          } else if (index2 === boundary.length) {
            index2++;
            if (c === CR) {
              flags |= F.PART_BOUNDARY;
            } else if (c === HYPHEN) {
              flags |= F.LAST_BOUNDARY;
            } else {
              index2 = 0;
            }
          } else if (index2 - 1 === boundary.length) {
            if (flags & F.PART_BOUNDARY) {
              index2 = 0;
              if (c === LF) {
                flags &= ~F.PART_BOUNDARY;
                callback("onPartEnd");
                callback("onPartBegin");
                state = S.HEADER_FIELD_START;
                break;
              }
            } else if (flags & F.LAST_BOUNDARY) {
              if (c === HYPHEN) {
                callback("onPartEnd");
                state = S.END;
                flags = 0;
              } else {
                index2 = 0;
              }
            } else {
              index2 = 0;
            }
          }
          if (index2 > 0) {
            lookbehind[index2 - 1] = c;
          } else if (previousIndex > 0) {
            const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
            callback("onPartData", 0, previousIndex, _lookbehind);
            previousIndex = 0;
            mark("onPartData");
            i2--;
          }
          break;
        case S.END:
          break;
        default:
          throw new Error(`Unexpected state entered: ${state}`);
      }
    }
    dataCallback("onHeaderField");
    dataCallback("onHeaderValue");
    dataCallback("onPartData");
    this.index = index2;
    this.state = state;
    this.flags = flags;
  }
  end() {
    if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
      this.onPartEnd();
    } else if (this.state !== S.END) {
      throw new Error("MultipartParser.end(): stream ended unexpectedly");
    }
  }
}
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
const multipartParser = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  toFormData
}, Symbol.toStringTag, { value: "Module" }));
exports.default = entry_preview;
