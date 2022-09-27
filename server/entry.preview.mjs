import { componentQrl, inlinedQrl, useStylesScopedQrl, Slot, useContext, jsx as jsx$1, SkipRender, useEnvData, useStore, useContextProvider, useWatchQrl, useLexicalScope, noSerialize, createContext, useClientEffectQrl } from "@builder.io/qwik";
import { jsxs, jsx, Fragment } from "@builder.io/qwik/jsx-runtime";
import fetch$1, { Headers as Headers$1, Request, Response } from "node-fetch";
import { renderToStream } from "@builder.io/qwik/server";
const QwikLogo = () => /* @__PURE__ */ jsxs("svg", {
  width: "100",
  height: "35",
  viewBox: "0 0 167 53",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: [
    /* @__PURE__ */ jsx("path", {
      d: "M81.9545 46.5859H75.5513V35.4045C73.4363 36.8579 71.0496 37.5749 68.4884 37.5749C65.0151 37.5749 62.4344 36.6253 60.8239 34.6487C59.2134 32.6915 58.3984 29.2034 58.3984 24.2231C58.3984 19.1266 59.3492 15.5997 61.2702 13.5456C63.23 11.4721 66.3734 10.4644 70.7004 10.4644C74.7946 10.4644 78.5201 11.0264 81.9545 12.131V46.5859ZM75.5513 16.278C74.096 15.8323 72.4661 15.6191 70.7004 15.6191C68.5272 15.6191 66.9749 16.1811 66.1017 17.3244C65.2479 18.4871 64.7823 20.6962 64.7823 23.9712C64.7823 27.0524 65.1897 29.1065 66.0435 30.2304C66.8973 31.335 68.3719 31.897 70.5452 31.897C73.3781 31.897 75.5513 30.7343 75.5513 29.2809V16.278Z",
      fill: "black"
    }),
    /* @__PURE__ */ jsx("path", {
      d: "M91.133 11.1426C93.4033 17.4406 95.3242 23.7386 96.993 30.0948C99.205 23.5836 101.087 17.2856 102.542 11.1426H108.15C110.265 17.4406 112.031 23.7386 113.447 30.0948C115.97 23.196 117.949 16.8787 119.404 11.1426H125.71C123.033 20.173 120.064 28.777 116.785 36.8966H109.256C108.402 32.3039 107.044 26.7617 105.22 20.1536C104.056 25.2889 102.445 30.8893 100.33 36.8966H92.8018C90.2793 27.5174 87.5434 18.9522 84.6328 11.1426H91.133Z",
      fill: "black"
    }),
    /* @__PURE__ */ jsx("path", {
      d: "M132.832 7.55758C129.999 7.55758 129.203 6.85996 129.203 3.97257C129.203 1.39523 130.018 0.794495 132.832 0.794495C135.665 0.794495 136.46 1.39523 136.46 3.97257C136.46 6.85996 135.665 7.55758 132.832 7.55758ZM129.649 11.1426H136.053V36.8966H129.649V11.1426Z",
      fill: "black"
    }),
    /* @__PURE__ */ jsx("path", {
      d: "M166.303 11.1426C161.763 17.5956 158.581 21.5295 156.815 22.9441C158.27 23.8937 162.17 28.8933 167.002 36.916H159.628C153.613 27.7887 150.742 23.8549 149.325 23.2542V36.916H142.922V0H149.325V23.2348C150.78 22.169 153.963 18.1382 158.872 11.1426H166.303Z",
      fill: "black"
    }),
    /* @__PURE__ */ jsx("path", {
      d: "M40.973 52.5351L32.0861 43.6985L31.9503 43.7179V43.621L13.0511 24.9595L17.708 20.4637L14.9721 4.76715L1.99103 20.8513C-0.220992 23.0798 -0.628467 26.7036 0.962635 29.3778L9.07337 42.8265C10.3152 44.9 12.566 46.1402 14.9915 46.1208L19.0081 46.082L40.973 52.5351Z",
      fill: "#18B6F6"
    }),
    /* @__PURE__ */ jsx("path", {
      d: "M45.8232 20.5411L44.038 17.2468L43.1066 15.5609L42.738 14.902L42.6992 14.9408L37.8094 6.47238C36.587 4.34075 34.2974 3.02301 31.8137 3.04239L27.5255 3.15865L14.7384 3.19741C12.313 3.21679 10.101 4.49577 8.87853 6.56927L1.09766 21.9945L15.0101 4.72831L33.2496 24.7656L30.0091 28.0406L31.9495 43.7178L31.9689 43.679V43.7178H31.9301L31.9689 43.7565L33.4824 45.2293L40.8364 52.4187C41.1469 52.7094 41.6514 52.3606 41.4379 51.9924L36.8975 43.0589L44.8142 28.4282L45.0664 28.1375C45.1634 28.0212 45.2604 27.905 45.3381 27.7887C46.8904 25.6764 47.1038 22.8472 45.8232 20.5411Z",
      fill: "#AC7EF4"
    }),
    /* @__PURE__ */ jsx("path", {
      d: "M33.3076 24.6882L15.0099 4.74774L17.61 20.3668L12.9531 24.882L31.9105 43.6985L30.203 28.0794L33.3076 24.6882Z",
      fill: "white"
    })
  ]
});
const styles$1 = "header {\n  background: var(--qwik-purple);\n}\nheader {\n  display: flex;\n  background: white;\n  border-bottom: 10px solid var(--qwik-dark-purple);\n}\n\nheader .logo a {\n  display: inline-block;\n  padding: 10px 10px 7px 20px;\n}\n\nheader ul {\n  margin: 0;\n  padding: 3px 10px 0 0;\n  list-style: none;\n  flex: 1;\n  text-align: right;\n}\n\nheader li {\n  display: inline-block;\n  margin: 0;\n  padding: 0;\n}\n\nheader li a {\n  display: inline-block;\n  padding: 15px 10px;\n  text-decoration: none;\n}\n\nheader li a:hover {\n  text-decoration: underline;\n}\n";
const Header = /* @__PURE__ */ componentQrl(inlinedQrl(() => {
  useStylesScopedQrl(inlinedQrl(styles$1, "s_N39ca0w8E8Y"));
  return /* @__PURE__ */ jsxs("header", {
    children: [
      /* @__PURE__ */ jsx("div", {
        class: "logo",
        children: /* @__PURE__ */ jsx("a", {
          href: "https://qwik.builder.io/",
          target: "_blank",
          children: /* @__PURE__ */ jsx(QwikLogo, {})
        })
      }),
      /* @__PURE__ */ jsxs("ul", {
        children: [
          /* @__PURE__ */ jsx("li", {
            children: /* @__PURE__ */ jsx("a", {
              href: "https://qwik.builder.io/docs/components/overview/",
              target: "_blank",
              children: "Docs"
            })
          }),
          /* @__PURE__ */ jsx("li", {
            children: /* @__PURE__ */ jsx("a", {
              href: "https://qwik.builder.io/examples/introduction/hello-world/",
              target: "_blank",
              children: "Examples"
            })
          }),
          /* @__PURE__ */ jsx("li", {
            children: /* @__PURE__ */ jsx("a", {
              href: "https://qwik.builder.io/tutorial/welcome/overview/",
              target: "_blank",
              children: "Tutorials"
            })
          })
        ]
      })
    ]
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
        children: /* @__PURE__ */ jsx("a", {
          href: "https://www.builder.io/",
          target: "_blank",
          children: "Made with \u2661 by Builder.io"
        })
      })
    ]
  });
}, "s_VkLNXphUh5s"));
const Layout_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: layout
}, Symbol.toStringTag, { value: "Module" }));
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
const MODULE_CACHE$1 = /* @__PURE__ */ new WeakMap();
const loadRoute$1 = async (routes2, menus2, cacheModules2, pathname) => {
  if (Array.isArray(routes2))
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
          loadModule$1(moduleLoader, pendingLoads, (routeModule) => mods[i] = routeModule, cacheModules2);
        });
        loadModule$1(menuLoader, pendingLoads, (menuModule) => menu = menuModule == null ? void 0 : menuModule.default, cacheModules2);
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
const loadModule$1 = (moduleLoader, pendingLoads, moduleSetter, cacheModules2) => {
  if (typeof moduleLoader === "function") {
    const loadedModule = MODULE_CACHE$1.get(moduleLoader);
    if (loadedModule)
      moduleSetter(loadedModule);
    else {
      const l = moduleLoader();
      if (typeof l.then === "function")
        pendingLoads.push(l.then((loadedModule2) => {
          if (cacheModules2 !== false)
            MODULE_CACHE$1.set(moduleLoader, loadedModule2);
          moduleSetter(loadedModule2);
        }));
      else if (l)
        moduleSetter(l);
    }
  }
};
const getMenuLoader$1 = (menus2, pathname) => {
  if (menus2) {
    const menu = menus2.find((m) => m[0] === pathname || pathname.startsWith(m[0] + (pathname.endsWith("/") ? "" : "/")));
    if (menu)
      return menu[1];
  }
  return void 0;
};
const getRouteParams$1 = (paramNames, match) => {
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
    const loadRoutePromise = loadRoute$1(routes2, menus2, cacheModules2, pathname);
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
const Link = /* @__PURE__ */ componentQrl(inlinedQrl((props) => {
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
const index$1 = /* @__PURE__ */ componentQrl(inlinedQrl(() => {
  return /* @__PURE__ */ jsxs("div", {
    children: [
      /* @__PURE__ */ jsxs("h1", {
        children: [
          "Welcome to Qwik ",
          /* @__PURE__ */ jsx("span", {
            class: "lightning",
            children: "\u26A1\uFE0F"
          })
        ]
      }),
      /* @__PURE__ */ jsxs("ul", {
        children: [
          /* @__PURE__ */ jsxs("li", {
            children: [
              "Check out the ",
              /* @__PURE__ */ jsx("code", {
                children: "src/routes"
              }),
              " directory to get started."
            ]
          }),
          /* @__PURE__ */ jsxs("li", {
            children: [
              "Add integrations with ",
              /* @__PURE__ */ jsx("code", {
                children: "npm run qwik add"
              }),
              "."
            ]
          }),
          /* @__PURE__ */ jsxs("li", {
            children: [
              "More info about development in ",
              /* @__PURE__ */ jsx("code", {
                children: "README.md"
              })
            ]
          })
        ]
      }),
      /* @__PURE__ */ jsx("h2", {
        children: "Commands"
      }),
      /* @__PURE__ */ jsxs("table", {
        class: "commands",
        children: [
          /* @__PURE__ */ jsxs("tr", {
            children: [
              /* @__PURE__ */ jsx("td", {
                children: /* @__PURE__ */ jsx("code", {
                  children: "npm run dev"
                })
              }),
              /* @__PURE__ */ jsx("td", {
                children: "Start the dev server and watch for changes."
              })
            ]
          }),
          /* @__PURE__ */ jsxs("tr", {
            children: [
              /* @__PURE__ */ jsx("td", {
                children: /* @__PURE__ */ jsx("code", {
                  children: "npm run preview"
                })
              }),
              /* @__PURE__ */ jsx("td", {
                children: "Production build and start preview server."
              })
            ]
          }),
          /* @__PURE__ */ jsxs("tr", {
            children: [
              /* @__PURE__ */ jsx("td", {
                children: /* @__PURE__ */ jsx("code", {
                  children: "npm run build"
                })
              }),
              /* @__PURE__ */ jsx("td", {
                children: "Production build."
              })
            ]
          }),
          /* @__PURE__ */ jsxs("tr", {
            children: [
              /* @__PURE__ */ jsx("td", {
                children: /* @__PURE__ */ jsx("code", {
                  children: "npm run qwik add"
                })
              }),
              /* @__PURE__ */ jsx("td", {
                children: "Select an integration to add."
              })
            ]
          })
        ]
      }),
      /* @__PURE__ */ jsx("h2", {
        children: "Add Integrations"
      }),
      /* @__PURE__ */ jsxs("table", {
        class: "commands",
        children: [
          /* @__PURE__ */ jsxs("tr", {
            children: [
              /* @__PURE__ */ jsx("td", {
                children: /* @__PURE__ */ jsx("code", {
                  children: "npm run qwik add cloudflare-pages"
                })
              }),
              /* @__PURE__ */ jsx("td", {
                children: /* @__PURE__ */ jsx("a", {
                  href: "https://developers.cloudflare.com/pages",
                  target: "_blank",
                  children: "Cloudflare Pages Server"
                })
              })
            ]
          }),
          /* @__PURE__ */ jsxs("tr", {
            children: [
              /* @__PURE__ */ jsx("td", {
                children: /* @__PURE__ */ jsx("code", {
                  children: "npm run qwik add express"
                })
              }),
              /* @__PURE__ */ jsx("td", {
                children: /* @__PURE__ */ jsx("a", {
                  href: "https://expressjs.com/",
                  target: "_blank",
                  children: "Nodejs Express Server"
                })
              })
            ]
          }),
          /* @__PURE__ */ jsxs("tr", {
            children: [
              /* @__PURE__ */ jsx("td", {
                children: /* @__PURE__ */ jsx("code", {
                  children: "npm run qwik add netlify-edge"
                })
              }),
              /* @__PURE__ */ jsx("td", {
                children: /* @__PURE__ */ jsx("a", {
                  href: "https://docs.netlify.com/",
                  target: "_blank",
                  children: "Netlify Edge Functions"
                })
              })
            ]
          }),
          /* @__PURE__ */ jsxs("tr", {
            children: [
              /* @__PURE__ */ jsx("td", {
                children: /* @__PURE__ */ jsx("code", {
                  children: "npm run qwik add static-node"
                })
              }),
              /* @__PURE__ */ jsx("td", {
                children: /* @__PURE__ */ jsx("a", {
                  href: "https://qwik.builder.io/qwikcity/static-site-generation/overview/",
                  target: "_blank",
                  children: "Static Site Generation (SSG)"
                })
              })
            ]
          })
        ]
      }),
      /* @__PURE__ */ jsx("h2", {
        children: "Community"
      }),
      /* @__PURE__ */ jsxs("ul", {
        children: [
          /* @__PURE__ */ jsxs("li", {
            children: [
              /* @__PURE__ */ jsx("span", {
                children: "Questions or just want to say hi? "
              }),
              /* @__PURE__ */ jsx("a", {
                href: "https://qwik.builder.io/chat",
                target: "_blank",
                children: "Chat on discord!"
              })
            ]
          }),
          /* @__PURE__ */ jsxs("li", {
            children: [
              /* @__PURE__ */ jsx("span", {
                children: "Follow "
              }),
              /* @__PURE__ */ jsx("a", {
                href: "https://twitter.com/QwikDev",
                target: "_blank",
                children: "@QwikDev"
              }),
              /* @__PURE__ */ jsx("span", {
                children: " on Twitter"
              })
            ]
          }),
          /* @__PURE__ */ jsxs("li", {
            children: [
              /* @__PURE__ */ jsx("span", {
                children: "Open issues and contribute on "
              }),
              /* @__PURE__ */ jsx("a", {
                href: "https://github.com/BuilderIO/qwik",
                target: "_blank",
                children: "Github"
              })
            ]
          })
        ]
      }),
      /* @__PURE__ */ jsx(Link, {
        class: "mindblow",
        href: "/flower",
        children: "Blow my mind \u{1F92F}"
      })
    ]
  });
}, "s_xYL1qOwPyDI"));
const head$1 = {
  title: "Welcome to Qwik"
};
const Index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$1,
  head: head$1
}, Symbol.toStringTag, { value: "Module" }));
const styles = ".host {\n  display: grid;\n\n  align-items: center;\n  justify-content: center;\n  justify-items: center;\n  --rotation: 135deg;\n  --rotation: 225deg;\n  --size-step: 10px;\n  --odd-color-step: 5;\n  --even-color-step: 5;\n  --center: 12;\n\n  width: 100%;\n  height: 500px;\n\n  contain: strict;\n}\n\ninput {\n  width: 100%;\n}\n\n.square {\n  --size: calc(40px + var(--index) * var(--size-step));\n\n  display: block;\n  width: var(--size);\n  height: var(--size);\n  transform: rotateZ(calc(var(--rotation) * var(--state) * (var(--center) - var(--index))));\n  transition-property: transform, border-color;\n  transition-duration: 5s;\n  transition-timing-function: ease-in-out;\n  grid-area: 1 / 1;\n  background: white;\n  border-width: 2px;\n  border-style: solid;\n  border-color: black;\n  box-sizing: border-box;\n  will-change: transform, border-color;\n\n  contain: strict;\n}\n\n.square.odd {\n  --luminance: calc(1 - calc(calc(var(--index) * var(--odd-color-step)) / 256));\n  background: rgb(\n    calc(172 * var(--luminance)),\n    calc(127 * var(--luminance)),\n    calc(244 * var(--luminance))\n  );\n}\n\n.pride .square:nth-child(12n + 1) {\n  background: #e70000;\n}\n.pride .square:nth-child(12n + 3) {\n  background: #ff8c00;\n}\n.pride .square:nth-child(12n + 5) {\n  background: #ffef00;\n}\n.pride .square:nth-child(12n + 7) {\n  background: #00811f;\n}\n.pride .square:nth-child(12n + 9) {\n  background: #0044ff;\n}\n.pride .square:nth-child(12n + 11) {\n  background: #760089;\n}\n";
const index = /* @__PURE__ */ componentQrl(inlinedQrl(() => {
  useStylesScopedQrl(inlinedQrl(styles, "s_p4UiTwsJc7c"));
  const loc = useLocation();
  const state = useStore({
    count: 0,
    number: 20
  });
  useClientEffectQrl(inlinedQrl(({ cleanup }) => {
    const [state2] = useLexicalScope();
    const timeout = setTimeout(() => state2.count = 1, 500);
    cleanup(() => clearTimeout(timeout));
    const internal = setInterval(() => state2.count++, 7e3);
    cleanup(() => clearInterval(internal));
  }, "s_V0Y6u0VD1eY", [
    state
  ]));
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
      /* @__PURE__ */ jsx("input", {
        type: "range",
        value: state.number,
        max: 50,
        onInput$: inlinedQrl((ev) => {
          const [state2] = useLexicalScope();
          state2.number = ev.target.valueAsNumber;
        }, "s_dznIGAlrcag", [
          state
        ])
      }),
      /* @__PURE__ */ jsx("div", {
        style: {
          "--state": `${state.count * 0.1}`
        },
        class: {
          host: true,
          pride: loc.query["pride"] === "true"
        },
        children: Array.from({
          length: state.number
        }, (_, i) => /* @__PURE__ */ jsx("div", {
          class: {
            square: true,
            odd: i % 2 === 0
          },
          style: {
            "--index": `${i + 1}`
          }
        }, i)).reverse()
      })
    ]
  });
}, "s_OW4nu0I1yZ8"));
const head = {
  title: "Qwik Flower"
};
const Flower = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index,
  head
}, Symbol.toStringTag, { value: "Module" }));
const Layout = () => Layout_;
const routes = [
  [/^\/$/, [Layout, () => Index], void 0, "/", ["q-12e642bf.js", "q-5c3dcd0e.js"]],
  [/^\/flower\/?$/, [Layout, () => Flower], void 0, "/flower", ["q-12e642bf.js", "q-caae95b2.js"]]
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
var MODULE_CACHE = /* @__PURE__ */ new WeakMap();
var loadRoute = async (routes2, menus2, cacheModules2, pathname) => {
  if (Array.isArray(routes2)) {
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
          loadModule(
            moduleLoader,
            pendingLoads,
            (routeModule) => mods[i] = routeModule,
            cacheModules2
          );
        });
        loadModule(
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
var loadModule = (moduleLoader, pendingLoads, moduleSetter, cacheModules2) => {
  if (typeof moduleLoader === "function") {
    const loadedModule = MODULE_CACHE.get(moduleLoader);
    if (loadedModule) {
      moduleSetter(loadedModule);
    } else {
      const l = moduleLoader();
      if (typeof l.then === "function") {
        pendingLoads.push(
          l.then((loadedModule2) => {
            if (cacheModules2 !== false) {
              MODULE_CACHE.set(moduleLoader, loadedModule2);
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
var getMenuLoader = (menus2, pathname) => {
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
var getRouteParams = (paramNames, match) => {
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
    const loadedRoute = await loadRoute(routes, menus, cacheModules, requestCtx.url.pathname);
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
const manifest = { "symbols": { "s_hA9UPaY8sNQ": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component_a_onClick", "canonicalFilename": "s_ha9upay8snq", "hash": "hA9UPaY8sNQ", "ctxKind": "event", "ctxName": "onClick$", "captures": true, "parent": "s_mYsiJcA4IBc" }, "s_skxgNVWVOT8": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component_a_onMouseOver", "canonicalFilename": "s_skxgnvwvot8", "hash": "skxgNVWVOT8", "ctxKind": "event", "ctxName": "onMouseOver$", "captures": false, "parent": "s_mYsiJcA4IBc" }, "s_dznIGAlrcag": { "origin": "routes/flower/index.tsx", "displayName": "flower_component__Fragment_input_onInput", "canonicalFilename": "s_dznigalrcag", "hash": "dznIGAlrcag", "ctxKind": "event", "ctxName": "onInput$", "captures": true, "parent": "s_OW4nu0I1yZ8" }, "s_uVE5iM9H73c": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component_a_onQVisible", "canonicalFilename": "s_uve5im9h73c", "hash": "uVE5iM9H73c", "ctxKind": "event", "ctxName": "onQVisible$", "captures": false, "parent": "s_mYsiJcA4IBc" }, "s_AaAlzKH0KlQ": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCity_component_useWatch", "canonicalFilename": "s_aaalzkh0klq", "hash": "AaAlzKH0KlQ", "ctxKind": "function", "ctxName": "useWatch$", "captures": true, "parent": "s_z1nvHyEppoI" }, "s_V0Y6u0VD1eY": { "origin": "routes/flower/index.tsx", "displayName": "flower_component_useClientEffect", "canonicalFilename": "s_v0y6u0vd1ey", "hash": "V0Y6u0VD1eY", "ctxKind": "function", "ctxName": "useClientEffect$", "captures": true, "parent": "s_OW4nu0I1yZ8" }, "s_3sccYCDd1Z0": { "origin": "root.tsx", "displayName": "root_component", "canonicalFilename": "s_3sccycdd1z0", "hash": "3sccYCDd1Z0", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_OW4nu0I1yZ8": { "origin": "routes/flower/index.tsx", "displayName": "flower_component", "canonicalFilename": "s_ow4nu0i1yz8", "hash": "OW4nu0I1yZ8", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_VkLNXphUh5s": { "origin": "routes/layout.tsx", "displayName": "layout_component", "canonicalFilename": "s_vklnxphuh5s", "hash": "VkLNXphUh5s", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_ceU05TscGYE": { "origin": "components/header/header.tsx", "displayName": "header_component", "canonicalFilename": "s_ceu05tscgye", "hash": "ceU05TscGYE", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_mYsiJcA4IBc": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "Link_component", "canonicalFilename": "s_mysijca4ibc", "hash": "mYsiJcA4IBc", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_nd8yk3KO22c": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "RouterOutlet_component", "canonicalFilename": "s_nd8yk3ko22c", "hash": "nd8yk3KO22c", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_xYL1qOwPyDI": { "origin": "routes/index.tsx", "displayName": "routes_component", "canonicalFilename": "s_xyl1qowpydi", "hash": "xYL1qOwPyDI", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_z1nvHyEppoI": { "origin": "../node_modules/@builder.io/qwik-city/index.qwik.mjs", "displayName": "QwikCity_component", "canonicalFilename": "s_z1nvhyeppoi", "hash": "z1nvHyEppoI", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_zrbrqoaqXSY": { "origin": "components/router-head/router-head.tsx", "displayName": "RouterHead_component", "canonicalFilename": "s_zrbrqoaqxsy", "hash": "zrbrqoaqXSY", "ctxKind": "function", "ctxName": "component$", "captures": false }, "s_N39ca0w8E8Y": { "origin": "components/header/header.tsx", "displayName": "header_component_useStylesScoped", "canonicalFilename": "s_n39ca0w8e8y", "hash": "N39ca0w8E8Y", "ctxKind": "function", "ctxName": "useStylesScoped$", "captures": false, "parent": "s_ceU05TscGYE" }, "s_p4UiTwsJc7c": { "origin": "routes/flower/index.tsx", "displayName": "flower_component_useStylesScoped", "canonicalFilename": "s_p4uitwsjc7c", "hash": "p4UiTwsJc7c", "ctxKind": "function", "ctxName": "useStylesScoped$", "captures": false, "parent": "s_OW4nu0I1yZ8" } }, "mapping": { "s_hA9UPaY8sNQ": "q-def503e9.js", "s_skxgNVWVOT8": "q-def503e9.js", "s_dznIGAlrcag": "q-e929a10e.js", "s_uVE5iM9H73c": "q-def503e9.js", "s_AaAlzKH0KlQ": "q-35bf46d4.js", "s_V0Y6u0VD1eY": "q-e929a10e.js", "s_3sccYCDd1Z0": "q-27aa1930.js", "s_OW4nu0I1yZ8": "q-e929a10e.js", "s_VkLNXphUh5s": "q-b86ece1a.js", "s_ceU05TscGYE": "q-9a2fd075.js", "s_mYsiJcA4IBc": "q-def503e9.js", "s_nd8yk3KO22c": "q-66c4d9a6.js", "s_xYL1qOwPyDI": "q-0847c181.js", "s_z1nvHyEppoI": "q-35bf46d4.js", "s_zrbrqoaqXSY": "q-cdb8ccea.js", "s_N39ca0w8E8Y": "q-9a2fd075.js", "s_p4UiTwsJc7c": "q-e929a10e.js" }, "bundles": { "q-0847c181.js": { "size": 2698, "imports": ["q-27aa1930.js", "q-a5f4787b.js"], "origins": ["src/entry_routes.js", "src/s_xyl1qowpydi.js"], "symbols": ["s_xYL1qOwPyDI"] }, "q-12e642bf.js": { "size": 158, "imports": ["q-a5f4787b.js"], "dynamicImports": ["q-b86ece1a.js"], "origins": ["src/routes/layout.js"] }, "q-13745fbc.js": { "size": 58, "imports": ["q-a5f4787b.js"] }, "q-143c7194.js": { "size": 2180, "origins": ["node_modules/@builder.io/qwik-city/service-worker.mjs", "src/routes/service-worker.js"] }, "q-27aa1930.js": { "size": 4429, "imports": ["q-a5f4787b.js"], "dynamicImports": ["q-2ba8a3db.js", "q-35bf46d4.js", "q-66c4d9a6.js", "q-cdb8ccea.js", "q-def503e9.js"], "origins": ["node_modules/@builder.io/qwik-city/index.qwik.mjs", "src/components/router-head/router-head.js", "src/entry_root.js", "src/s_3sccycdd1z0.js"], "symbols": ["s_3sccYCDd1Z0"] }, "q-2ba8a3db.js": { "size": 424, "imports": ["q-a5f4787b.js"], "dynamicImports": ["q-12e642bf.js", "q-5c3dcd0e.js", "q-9f98f7a3.js", "q-caae95b2.js"], "origins": ["@qwik-city-plan"] }, "q-35bf46d4.js": { "size": 1489, "imports": ["q-27aa1930.js", "q-a5f4787b.js"], "dynamicImports": ["q-2ba8a3db.js"], "origins": ["@builder.io/qwik/build", "src/entry_QwikCity.js", "src/s_aaalzkh0klq.js", "src/s_z1nvhyeppoi.js"], "symbols": ["s_AaAlzKH0KlQ", "s_z1nvHyEppoI"] }, "q-5c3dcd0e.js": { "size": 196, "imports": ["q-a5f4787b.js"], "dynamicImports": ["q-0847c181.js"], "origins": ["src/routes/index.js"] }, "q-66c4d9a6.js": { "size": 269, "imports": ["q-27aa1930.js", "q-a5f4787b.js"], "origins": ["src/entry_RouterOutlet.js", "src/s_nd8yk3ko22c.js"], "symbols": ["s_nd8yk3KO22c"] }, "q-9a2fd075.js": { "size": 4135, "imports": ["q-a5f4787b.js"], "origins": ["src/components/header/header.css?used&inline", "src/components/icons/qwik.js", "src/entry_header.js", "src/s_ceu05tscgye.js", "src/s_n39ca0w8e8y.js"], "symbols": ["s_ceU05TscGYE", "s_N39ca0w8E8Y"] }, "q-9f98f7a3.js": { "size": 128, "imports": ["q-a5f4787b.js"], "dynamicImports": ["q-143c7194.js"], "origins": ["@qwik-city-entries"] }, "q-a5f4787b.js": { "size": 36362, "dynamicImports": ["q-27aa1930.js"], "origins": ["\0vite/preload-helper", "node_modules/@builder.io/qwik/core.min.mjs", "src/global.css", "src/root.js"] }, "q-b86ece1a.js": { "size": 393, "imports": ["q-a5f4787b.js"], "dynamicImports": ["q-9a2fd075.js"], "origins": ["src/components/header/header.js", "src/entry_layout.js", "src/s_vklnxphuh5s.js"], "symbols": ["s_VkLNXphUh5s"] }, "q-caae95b2.js": { "size": 192, "imports": ["q-a5f4787b.js"], "dynamicImports": ["q-e929a10e.js"], "origins": ["src/routes/flower/index.js"] }, "q-cdb8ccea.js": { "size": 909, "imports": ["q-27aa1930.js", "q-a5f4787b.js"], "origins": ["src/entry_RouterHead.js", "src/s_zrbrqoaqxsy.js"], "symbols": ["s_zrbrqoaqXSY"] }, "q-def503e9.js": { "size": 886, "imports": ["q-27aa1930.js", "q-a5f4787b.js"], "origins": ["src/entry_Link.js", "src/s_ha9upay8snq.js", "src/s_mysijca4ibc.js", "src/s_skxgnvwvot8.js", "src/s_uve5im9h73c.js"], "symbols": ["s_hA9UPaY8sNQ", "s_mYsiJcA4IBc", "s_skxgNVWVOT8", "s_uVE5iM9H73c"] }, "q-e929a10e.js": { "size": 2457, "imports": ["q-27aa1930.js", "q-a5f4787b.js"], "origins": ["src/entry_flower.js", "src/routes/flower/flower.css?used&inline", "src/s_dznigalrcag.js", "src/s_ow4nu0i1yz8.js", "src/s_p4uitwsjc7c.js", "src/s_v0y6u0vd1ey.js"], "symbols": ["s_dznIGAlrcag", "s_OW4nu0I1yZ8", "s_p4UiTwsJc7c", "s_V0Y6u0VD1eY"] } }, "injections": [{ "tag": "link", "location": "head", "attributes": { "rel": "stylesheet", "href": "/build/q-0ea8883c.css" } }], "version": "1", "options": { "target": "client", "buildMode": "production", "forceFullBuild": true, "entryStrategy": { "type": "smart" } }, "platform": { "qwik": "0.9.0", "vite": "", "rollup": "2.78.1", "env": "node", "os": "linux", "node": "16.15.0" } };
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
        lang: "en",
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
