import{m,u as E,_ as g,X as l,R as C,w as j,n as H,A as y}from"./q-dcd66212.js";const nt=y("qc-c"),st=y("qc-ic"),V=y("qc-h"),Y=y("qc-l"),z=y("qc-n"),B=m(E(()=>g(()=>import("./q-4c60c5eb.js"),["build/q-4c60c5eb.js","build/q-dcd66212.js","build/q-0ea8883c.css"]),"s_nd8yk3KO22c")),R=new WeakMap,ot=async(t,e,s,n)=>{if(Array.isArray(t))for(const o of t){const c=o[0].exec(n);if(c){const a=o[1],i=N(o[2],c),r=o[4],f=new Array(a.length),h=[],_=M(e,n);let w;return a.forEach((p,U)=>{D(p,h,W=>f[U]=W,s)}),D(_,h,p=>w=p==null?void 0:p.default,s),h.length>0&&await Promise.all(h),[i,f,w,r]}}return null},D=(t,e,s,n)=>{if(typeof t=="function"){const o=R.get(t);if(o)s(o);else{const c=t();typeof c.then=="function"?e.push(c.then(a=>{n!==!1&&R.set(t,a),s(a)})):c&&s(c)}}},M=(t,e)=>{if(t){const s=t.find(n=>n[0]===e||e.startsWith(n[0]+(e.endsWith("/")?"":"/")));if(s)return s[1]}},N=(t,e)=>{const s={};if(t)for(let n=0;n<t.length;n++)s[t[n]]=e?e[n+1]:"";return s},ct=(t,e,s)=>{const n=Q(),o={data:t?t.body:null,head:n,...e};for(let c=s.length-1;c>=0;c--){const a=s[c]&&s[c].head;a&&(typeof a=="function"?L(n,a(o)):typeof a=="object"&&L(n,a))}return o.head},L=(t,e)=>{typeof e.title=="string"&&(t.title=e.title),I(t.meta,e.meta),I(t.links,e.links),I(t.styles,e.styles)},I=(t,e)=>{if(Array.isArray(e))for(const s of e){if(typeof s.key=="string"){const n=t.findIndex(o=>o.key===s.key);if(n>-1){t[n]=s;continue}}t.push(s)}},Q=()=>({title:"",meta:[],links:[],styles:[]}),rt=()=>C(V),at=()=>C(Y),it=()=>C(z),lt=()=>j(H("qwikcity")),k=t=>t.pathname+t.search+t.hash,d=(t,e)=>new URL(t,e.href),O=(t,e)=>t.origin===e.origin,x=(t,e)=>t.pathname+t.search===e.pathname+e.search,X=(t,e)=>t.pathname===e.pathname,b=(t,e)=>O(t,e)&&!x(t,e),Z=t=>t+(t.endsWith("/")?"":"/")+"q-data.json",ft=(t,e)=>{const s=t.href;if(typeof s=="string"&&s.trim()!==""&&typeof t.target!="string")try{const n=d(s,e),o=d("",e);if(O(n,o))return k(n)}catch(n){console.error(n)}return null},ht=(t,e,s)=>{if(t.prefetch&&e){const n=d(e,s);if(!X(n,d("",s)))return n+""}return null},ut=(t,e)=>{const s=t.location,n=d(e.path,s);b(s,n)&&(q(t,s,n),t.history.pushState("","",k(n))),t[S]||(t[S]=1,t.addEventListener("popstate",()=>{const o=t.location,c=d(e.path,o);b(o,c)&&(q(t,c,o),e.path=k(o))}))},q=async(t,e,s)=>{const n=t.document,o=s.hash;if(x(e,s))e.hash!==o&&(await P(),o?T(n,o):t.scrollTo(0,0));else if(o)for(let c=0;c<24&&(await P(),!T(n,o));c++);else await P(),t.scrollTo(0,0)},P=()=>new Promise(t=>setTimeout(t,12)),T=(t,e)=>{const s=e.slice(1),n=t.getElementById(s);return n&&n.scrollIntoView(),n},A=t=>dispatchEvent(new CustomEvent("qprefetch",{detail:t})),S=Symbol(),J=async t=>{const{cacheModules:e}=await g(()=>import("./q-d877117d.js"),["build/q-d877117d.js","build/q-dcd66212.js","build/q-0ea8883c.css"]),s=new URL(t).pathname,n=Z(s),o=Date.now(),c=e?6e5:15e3,a=u.findIndex(r=>r.u===n);let i=u[a];if(A({links:[s]}),!i||i.t+c<o){i={u:n,t:o,c:new Promise(r=>{fetch(n).then(f=>{const h=f.headers.get("content-type")||"";f.ok&&h.includes("json")?f.json().then(_=>{A({bundles:_.prefetch,links:[s]}),r(_)},()=>r(null)):r(null)},()=>r(null))})};for(let r=u.length-1;r>=0;r--)u[r].t+c<o&&u.splice(r,1);u.push(i)}return i.c.catch(r=>console.error(r)),i.c},u=[],K=m(E(()=>g(()=>import("./q-f9240e6c.js"),["build/q-f9240e6c.js","build/q-dcd66212.js","build/q-0ea8883c.css"]),"s_z1nvHyEppoI"));E(()=>g(()=>import("./q-0f5e0418.js"),["build/q-0f5e0418.js","build/q-dcd66212.js","build/q-0ea8883c.css"]),"s_mYsiJcA4IBc");const dt=(t,e)=>{var n;const s=(n=t==null?void 0:t.dataset)==null?void 0:n.prefetch;s&&(v||(v=window.innerWidth),(!e||e&&v<520)&&J(s))};let v=0;const F='((s,a,r,i)=>{r=(e,t)=>{t=document.querySelector("[q\\\\:base]"),t&&a.active&&a.active.postMessage({type:"qprefetch",base:t.getAttribute("q:base"),...e})},addEventListener("qprefetch",e=>{const t=e.detail;a?r(t):t.bundles&&s.push(...t.bundles)}),navigator.serviceWorker.register("/service-worker.js").then(e=>{i=()=>{a=e,r({bundles:s})},e.installing?e.installing.addEventListener("statechange",t=>{t.target.state=="activated"&&i()}):e.active&&i()}).catch(e=>console.error(e))})([])',G=()=>l("script",{dangerouslySetInnerHTML:F}),$=m(E(()=>g(()=>import("./q-c74507ea.js"),["build/q-c74507ea.js","build/q-dcd66212.js","build/q-0ea8883c.css"]),"s_zrbrqoaqXSY")),tt=()=>l(K,{children:[l("head",{children:[l("meta",{charSet:"utf-8"}),l($,{})]}),l("body",{lang:"pt-br",children:[l(B,{}),l(G,{})]})]}),pt=Object.freeze(Object.defineProperty({__proto__:null,s_3sccYCDd1Z0:tt},Symbol.toStringTag,{value:"Module"}));export{st as C,V as D,Y as R,nt as a,z as b,Q as c,J as d,ut as e,it as f,at as g,ft as h,ht as i,rt as j,pt as k,ot as l,dt as p,ct as r,k as t,lt as u};