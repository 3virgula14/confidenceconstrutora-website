import { componentQrl, inlinedQrl, useStylesScopedQrl, Slot, useContext, jsx as jsx$1, SkipRender, useEnvData, useStore, useContextProvider, useWatchQrl, useLexicalScope, noSerialize, createContext } from "@builder.io/qwik";
import { jsx, jsxs, Fragment } from "@builder.io/qwik/jsx-runtime";
import fetch$1, { Headers as Headers$1, Request, Response } from "node-fetch";
import { renderToStream } from "@builder.io/qwik/server";
const styles = "header{}";
const Header = /* @__PURE__ */ componentQrl(inlinedQrl(() => {
  useStylesScopedQrl(inlinedQrl(styles, "s_N39ca0w8E8Y"));
  return /* @__PURE__ */ jsx("header", {
    children: /* @__PURE__ */ jsx("nav", {
      children: /* @__PURE__ */ jsxs("ul", {
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
          /* @__PURE__ */ jsxs("div", {
            id: "acesso",
            children: [
              /* @__PURE__ */ jsx("button", {
                id: "acessar",
                children: "Acessar"
              }),
              /* @__PURE__ */ jsxs("span", {
                id: "itens",
                children: [
                  /* @__PURE__ */ jsx("icon", {
                    id: "carrinho"
                  }),
                  /* @__PURE__ */ jsx("span", {
                    id: "n-items",
                    children: "(0)"
                  })
                ]
              })
            ]
          })
        ]
      })
    })
  });
}, "s_ceU05TscGYE"));
const layout = /* @__PURE__ */ componentQrl(inlinedQrl(() => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
      /* @__PURE__ */ jsxs("main", {
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
  [/^\/$/, [Layout, () => Index], void 0, "/", ["q-d312b128.js", "q-d1379dc0.js"]],
  [/^\/portifolio\/?$/, [Layout, () => Portifolio], void 0, "/portifolio", ["q-d312b128.js", "q-e17920fb.js"]],
  [/^\/quemsomos\/?$/, [Layout, () => Quemsomos], void 0, "/quemsomos", ["q-d312b128.js", "q-2d41746e.js"]]
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
var HEADERS = Symbol("headers");
var _a;
var HeadersPolyfill = class {
  constructor() {
    this[_a] = {};
  }
  [(_a = HEADERS, Symbol.iterator)]() {
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
function errorHandler(requestCtx, e) {
  const status = 500;
  let message = "Server Error";
  let stack = void 0;
  if (e != null) {
    if (typeof e === "object") {
      if (typeof e.message === "string") {
        message = e.message;
      }
      if (e.stack != null) {
        stack = String(e.stack);
      }
    } else {
      message = String(e);
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
    e
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
        loaders.forEach((moduleLoader, i) => {
          loadModule$1(
            moduleLoader,
            pendingLoads,
            (routeModule) => mods[i] = routeModule,
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
      (m) => m[0] === pathname || pathname.startsWith(m[0] + (pathname.endsWith("/") ? "" : "/"))
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
    for (let i = 0; i < paramNames.length; i++) {
      params[paramNames[i]] = match ? match[i + 1] : "";
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
    } catch (e) {
      reject(e);
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
  const addBundle = (bundleName) => {
    if (bundleName && !bundleNames.includes(bundleName)) {
      bundleNames.push(bundleName);
    }
  };
  const addPrefetchResource = (prefetchResources) => {
    if (Array.isArray(prefetchResources)) {
      for (const prefetchResource of prefetchResources) {
        const bundleName = prefetchResource.url.split("/").pop();
        if (bundleName && !bundleNames.includes(bundleName)) {
          addBundle(bundleName);
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
        addBundle(manifest2.mapping[renderedSymbolName]);
      }
    }
  }
  if (routeBundleNames) {
    for (const routeBundleName of routeBundleNames) {
      addBundle(routeBundleName);
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
  } catch (e) {
    if (e instanceof RedirectResponse) {
      return redirectResponse(requestCtx, e);
    }
    if (e instanceof ErrorResponse) {
      return errorResponse(requestCtx, e);
    }
    return errorHandler(requestCtx, e);
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
      } catch (e) {
        await errorHandler(requestCtx, e);
      }
    } catch (e) {
      next(e);
    }
  };
  const notFound = async (req, res, next) => {
    try {
      const requestCtx = fromNodeHttp(getUrl(req), req, res);
      await notFoundHandler(requestCtx);
    } catch (e) {
      next(e);
    }
  };
  return {
    router,
    notFound
  };
}
const manifest = { "symbols": { "s_hA9UPaY8sNQ": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component_a_onClick", "canonicalFilename": "s_ha9upay8snq", "hash": "hA9UPaY8sNQ", "ctxKind": "event", "ctxName": "onClick$", "captures": true, "parent": "s_mYsiJcA4IBc" }, "s_skxgNVWVOT8": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component_a_onMouseOver", "canonicalFilename": "s_skxgnvwvot8", "hash": "skxgNVWVOT8", "ctxKind": "event", "ctxName": "onMouseOver$", "captures": false, "parent": "s_mYsiJcA4IBc" }, "s_uVE5iM9H73c": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component_a_onQVisible", "canonicalFilename": "s_uve5im9h73c", "hash": "uVE5iM9H73c", "ctxKind": "event", "ctxName": "onQVisible$", "captures": false, "parent": "s_mYsiJcA4IBc" }, "s_AaAlzKH0KlQ": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCity_component_useWatch", "canonicalFilename": "s_aaalzkh0klq", "hash": "AaAlzKH0KlQ", "ctxKind": "function", "ctxName": "useWatch$", "captures": true, "parent": "s_z1nvHyEppoI" }, "s_3sccYCDd1Z0": { "origin": "root.tsx", "displayName": "root_component", "canonicalFilename": "s_3sccycdd1z0", "hash": "3sccYCDd1Z0", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_VkLNXphUh5s": { "origin": "routes/layout.tsx", "displayName": "layout_component", "canonicalFilename": "s_vklnxphuh5s", "hash": "VkLNXphUh5s", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_ceU05TscGYE": { "origin": "components/header/header.tsx", "displayName": "header_component", "canonicalFilename": "s_ceu05tscgye", "hash": "ceU05TscGYE", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_flbgQB75nqU": { "origin": "routes/quemsomos/index.tsx", "displayName": "quemsomos_component", "canonicalFilename": "s_flbgqb75nqu", "hash": "flbgQB75nqU", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_hGK5aNZYjtw": { "origin": "routes/portifolio/index.tsx", "displayName": "portifolio_component", "canonicalFilename": "s_hgk5anzyjtw", "hash": "hGK5aNZYjtw", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_mYsiJcA4IBc": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component", "canonicalFilename": "s_mysijca4ibc", "hash": "mYsiJcA4IBc", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_nd8yk3KO22c": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "RouterOutlet_component", "canonicalFilename": "s_nd8yk3ko22c", "hash": "nd8yk3KO22c", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_xYL1qOwPyDI": { "origin": "routes/index.tsx", "displayName": "routes_component", "canonicalFilename": "s_xyl1qowpydi", "hash": "xYL1qOwPyDI", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_z1nvHyEppoI": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCity_component", "canonicalFilename": "s_z1nvhyeppoi", "hash": "z1nvHyEppoI", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_zrbrqoaqXSY": { "origin": "components/router-head/router-head.tsx", "displayName": "RouterHead_component", "canonicalFilename": "s_zrbrqoaqxsy", "hash": "zrbrqoaqXSY", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_N39ca0w8E8Y": { "origin": "components/header/header.tsx", "displayName": "header_component_useStylesScoped", "canonicalFilename": "s_n39ca0w8e8y", "hash": "N39ca0w8E8Y", "ctxKind": "function", "ctxName": "useStylesScoped$", "captures": false, "parent": "s_ceU05TscGYE" } }, "mapping": { "s_hA9UPaY8sNQ": "q-50689fd0.js", "s_skxgNVWVOT8": "q-50689fd0.js", "s_uVE5iM9H73c": "q-50689fd0.js", "s_AaAlzKH0KlQ": "q-62b890ef.js", "s_3sccYCDd1Z0": "q-5592b44e.js", "s_VkLNXphUh5s": "q-afba74b1.js", "s_ceU05TscGYE": "q-e80fd353.js", "s_flbgQB75nqU": "q-3995a2c6.js", "s_hGK5aNZYjtw": "q-175f6b43.js", "s_mYsiJcA4IBc": "q-50689fd0.js", "s_nd8yk3KO22c": "q-2b100383.js", "s_xYL1qOwPyDI": "q-944da4e1.js", "s_z1nvHyEppoI": "q-62b890ef.js", "s_zrbrqoaqXSY": "q-9e7b7810.js", "s_N39ca0w8E8Y": "q-e80fd353.js" }, "bundles": { "q-143c7194.js": { "size": 2180, "origins": ["node_modules/@builder.io/qwik-city/service-worker.mjs", "src/routes/service-worker.js"] }, "q-175f6b43.js": { "size": 93, "imports": ["q-1a8073c9.js"], "origins": ["src/entry_portifolio.js", "src/s_hgk5anzyjtw.js"], "symbols": ["s_hGK5aNZYjtw"] }, "q-1a8073c9.js": { "size": 35907, "dynamicImports": ["q-5592b44e.js"], "origins": ["\0vite/preload-helper", "node_modules/@builder.io/qwik/core.min.mjs", "src/global.css", "src/root.js"] }, "q-2b100383.js": { "size": 269, "imports": ["q-1a8073c9.js", "q-5592b44e.js"], "origins": ["src/entry_RouterOutlet.js", "src/s_nd8yk3ko22c.js"], "symbols": ["s_nd8yk3KO22c"] }, "q-2d41746e.js": { "size": 158, "imports": ["q-1a8073c9.js"], "dynamicImports": ["q-3995a2c6.js"], "origins": ["src/routes/quemsomos/index.js"] }, "q-3995a2c6.js": { "size": 93, "imports": ["q-1a8073c9.js"], "origins": ["src/entry_quemsomos.js", "src/s_flbgqb75nqu.js"], "symbols": ["s_flbgQB75nqU"] }, "q-50689fd0.js": { "size": 886, "imports": ["q-1a8073c9.js", "q-5592b44e.js"], "origins": ["src/entry_Link.js", "src/s_ha9upay8snq.js", "src/s_mysijca4ibc.js", "src/s_skxgnvwvot8.js", "src/s_uve5im9h73c.js"], "symbols": ["s_hA9UPaY8sNQ", "s_mYsiJcA4IBc", "s_skxgNVWVOT8", "s_uVE5iM9H73c"] }, "q-54fd9567.js": { "size": 58, "imports": ["q-1a8073c9.js"] }, "q-5592b44e.js": { "size": 4424, "imports": ["q-1a8073c9.js"], "dynamicImports": ["q-2b100383.js", "q-50689fd0.js", "q-55b469f3.js", "q-62b890ef.js", "q-9e7b7810.js"], "origins": ["node_modules/@builder.io/qwik-city/index.qwik.mjs", "src/components/router-head/router-head.js", "src/entry_root.js", "src/s_3sccycdd1z0.js"], "symbols": ["s_3sccYCDd1Z0"] }, "q-55b469f3.js": { "size": 509, "imports": ["q-1a8073c9.js"], "dynamicImports": ["q-2d41746e.js", "q-be13f3f5.js", "q-d1379dc0.js", "q-d312b128.js", "q-e17920fb.js"], "origins": ["@qwik-city-plan"] }, "q-62b890ef.js": { "size": 1489, "imports": ["q-1a8073c9.js", "q-5592b44e.js"], "dynamicImports": ["q-55b469f3.js"], "origins": ["@builder.io/qwik/build", "src/entry_QwikCity.js", "src/s_aaalzkh0klq.js", "src/s_z1nvhyeppoi.js"], "symbols": ["s_AaAlzKH0KlQ", "s_z1nvHyEppoI"] }, "q-944da4e1.js": { "size": 132, "imports": ["q-1a8073c9.js"], "origins": ["src/entry_routes.js", "src/s_xyl1qowpydi.js"], "symbols": ["s_xYL1qOwPyDI"] }, "q-9e7b7810.js": { "size": 909, "imports": ["q-1a8073c9.js", "q-5592b44e.js"], "origins": ["src/entry_RouterHead.js", "src/s_zrbrqoaqxsy.js"], "symbols": ["s_zrbrqoaqXSY"] }, "q-afba74b1.js": { "size": 386, "imports": ["q-1a8073c9.js"], "dynamicImports": ["q-e80fd353.js"], "origins": ["src/components/header/header.js", "src/entry_layout.js", "src/s_vklnxphuh5s.js"], "symbols": ["s_VkLNXphUh5s"] }, "q-be13f3f5.js": { "size": 128, "imports": ["q-1a8073c9.js"], "dynamicImports": ["q-143c7194.js"], "origins": ["@qwik-city-entries"] }, "q-d1379dc0.js": { "size": 196, "imports": ["q-1a8073c9.js"], "dynamicImports": ["q-944da4e1.js"], "origins": ["src/routes/index.js"] }, "q-d312b128.js": { "size": 158, "imports": ["q-1a8073c9.js"], "dynamicImports": ["q-afba74b1.js"], "origins": ["src/routes/layout.js"] }, "q-e17920fb.js": { "size": 158, "imports": ["q-1a8073c9.js"], "dynamicImports": ["q-175f6b43.js"], "origins": ["src/routes/portifolio/index.js"] }, "q-e80fd353.js": { "size": 674, "imports": ["q-1a8073c9.js"], "origins": ["src/components/header/header.css?used&inline", "src/entry_header.js", "src/s_ceu05tscgye.js", "src/s_n39ca0w8e8y.js"], "symbols": ["s_ceU05TscGYE", "s_N39ca0w8E8Y"] } }, "injections": [{ "tag": "link", "location": "head", "attributes": { "rel": "stylesheet", "href": "/build/q-0ea8883c.css" } }], "version": "1", "options": { "target": "client", "buildMode": "production", "forceFullBuild": true, "entryStrategy": { "type": "smart" } }, "platform": { "qwik": "0.9.0", "vite": "", "rollup": "2.78.1", "env": "node", "os": "linux", "node": "16.15.0" } };
const isServer = true;
const isBrowser = false;
const ContentContext = /* @__PURE__ */ createContext("qc-c");
const ContentInternalContext = /* @__PURE__ */ createContext("qc-ic");
const DocumentHeadContext = /* @__PURE__ */ createContext("qc-h");
const RouteLocationContext = /* @__PURE__ */ createContext("qc-l");
const RouteNavigateContext = /* @__PURE__ */ createContext("qc-n");
const RouterOutlet = /* @__PURE__ */ componentQrl(inlinedQrl(() => {
  const { contents } = useContext(ContentInternalContext);
  if (contents && contents.length > 0) {
    const contentsLen = contents.length;
    let cmp = null;
    for (let i = contentsLen - 1; i >= 0; i--)
      cmp = jsx$1(contents[i].default, {
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
        loaders.forEach((moduleLoader, i) => {
          loadModule(moduleLoader, pendingLoads, (routeModule) => mods[i] = routeModule, cacheModules2);
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
    const menu = menus2.find((m) => m[0] === pathname || pathname.startsWith(m[0] + (pathname.endsWith("/") ? "" : "/")));
    if (menu)
      return menu[1];
  }
  return void 0;
};
const getRouteParams = (paramNames, match) => {
  const params = {};
  if (paramNames)
    for (let i = 0; i < paramNames.length; i++)
      params[paramNames[i]] = match ? match[i + 1] : "";
  return params;
};
const resolveHead = (endpoint, routeLocation, contentModules) => {
  const head2 = createDocumentHead();
  const headProps = {
    data: endpoint ? endpoint.body : null,
    head: head2,
    ...routeLocation
  };
  for (let i = contentModules.length - 1; i >= 0; i--) {
    const contentModuleHead = contentModules[i] && contentModules[i].head;
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
        const existingIndex = existingArr.findIndex((i) => i.key === newItem.key);
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
const isSameOrigin = (a, b) => a.origin === b.origin;
const isSamePath = (a, b) => a.pathname + a.search === b.pathname + b.search;
const isSamePathname = (a, b) => a.pathname === b.pathname;
const isSameOriginDifferentPathname = (a, b) => isSameOrigin(a, b) && !isSamePath(a, b);
const getClientEndpointPath = (pathname) => pathname + (pathname.endsWith("/") ? "" : "/") + "q-data.json";
const getClientNavPath = (props, baseUrl) => {
  const href = props.href;
  if (typeof href === "string" && href.trim() !== "" && typeof props.target !== "string")
    try {
      const linkUrl = toUrl(href, baseUrl);
      const currentUrl = toUrl("", baseUrl);
      if (isSameOrigin(linkUrl, currentUrl))
        return toPath(linkUrl);
    } catch (e) {
      console.error(e);
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
      for (let i = 0; i < 24; i++) {
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
    for (let i = cachedClientPages.length - 1; i >= 0; i--)
      if (cachedClientPages[i].t + expiration < now)
        cachedClientPages.splice(i, 1);
    cachedClientPages.push(cachedClientPageData);
  }
  cachedClientPageData.c.catch((e) => console.error(e));
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
  var _a2;
  const prefetchUrl = (_a2 = elm == null ? void 0 : elm.dataset) == null ? void 0 : _a2.prefetch;
  if (prefetchUrl) {
    if (!windowInnerWidth)
      windowInnerWidth = window.innerWidth;
    if (!isOnVisible || isOnVisible && windowInnerWidth < 520)
      loadClientData(prefetchUrl);
  }
};
let windowInnerWidth = 0;
const swRegister = '((s,a,r,i)=>{r=(e,t)=>{t=document.querySelector("[q\\\\:base]"),t&&a.active&&a.active.postMessage({type:"qprefetch",base:t.getAttribute("q:base"),...e})},addEventListener("qprefetch",e=>{const t=e.detail;a?r(t):t.bundles&&s.push(...t.bundles)}),navigator.serviceWorker.register("/service-worker.js").then(e=>{i=()=>{a=e,r({bundles:s})},e.installing?e.installing.addEventListener("statechange",t=>{t.target.state=="activated"&&i()}):e.active&&i()}).catch(e=>console.error(e))})([])';
const ServiceWorkerRegister = () => jsx$1("script", {
  dangerouslySetInnerHTML: swRegister
});
const RouterHead = /* @__PURE__ */ componentQrl(inlinedQrl(() => {
  const head2 = useDocumentHead();
  const loc = useLocation();
  return /* @__PURE__ */ jsxs(Fragment, {
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
      head2.meta.map((m) => /* @__PURE__ */ jsx("meta", {
        ...m
      })),
      head2.links.map((l) => /* @__PURE__ */ jsx("link", {
        ...l
      })),
      head2.styles.map((s) => /* @__PURE__ */ jsx("style", {
        ...s.props,
        dangerouslySetInnerHTML: s.style
      }))
    ]
  });
}, "s_zrbrqoaqXSY"));
const global$1 = "";
const Root = /* @__PURE__ */ componentQrl(inlinedQrl(() => {
  return /* @__PURE__ */ jsxs(QwikCity, {
    children: [
      /* @__PURE__ */ jsxs("head", {
        children: [
          /* @__PURE__ */ jsx("meta", {
            charSet: "utf-8"
          }),
          /* @__PURE__ */ jsx(RouterHead, {})
        ]
      }),
      /* @__PURE__ */ jsxs("body", {
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
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
const entry_preview = qwikCity(render);
export {
  entry_preview as default
};
