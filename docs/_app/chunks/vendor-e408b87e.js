function d(){}function J(t,n){for(const e in n)t[e]=n[e];return t}function H(t){return t()}function v(){return Object.create(null)}function m(t){t.forEach(H)}function K(t){return typeof t=="function"}function Q(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let x;function ht(t,n){return x||(x=document.createElement("a")),x.href=n,t===x.href}function W(t){return Object.keys(t).length===0}function U(t,...n){if(t==null)return d;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function mt(t,n,e){t.$$.on_destroy.push(U(n,e))}function pt(t,n,e,i){if(t){const r=L(t,n,e,i);return t[0](r)}}function L(t,n,e,i){return t[1]&&i?J(e.ctx.slice(),t[1](i(n))):e.ctx}function gt(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const u=[],s=Math.max(n.dirty.length,r.length);for(let l=0;l<s;l+=1)u[l]=n.dirty[l]|r[l];return u}return n.dirty|r}return n.dirty}function yt(t,n,e,i,r,u){if(r){const s=L(n,e,i,u);t.p(s,r)}}function bt(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}let $=!1;function V(){$=!0}function X(){$=!1}function Y(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function Z(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let o=0;o<n.length;o++){const a=n[o];a.claim_order!==void 0&&c.push(a)}n=c}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let c=0;c<n.length;c++){const o=n[c].claim_order,a=(r>0&&n[e[r]].claim_order<=o?r+1:Y(1,r,b=>n[e[b]].claim_order,o))-1;i[c]=e[a]+1;const f=a+1;e[f]=c,r=Math.max(f,r)}const u=[],s=[];let l=n.length-1;for(let c=e[r]+1;c!=0;c=i[c-1]){for(u.push(n[c-1]);l>=c;l--)s.push(n[l]);l--}for(;l>=0;l--)s.push(n[l]);u.reverse(),s.sort((c,o)=>c.claim_order-o.claim_order);for(let c=0,o=0;c<s.length;c++){for(;o<u.length&&s[c].claim_order>=u[o].claim_order;)o++;const a=o<u.length?u[o]:null;t.insertBefore(s[c],a)}}function tt(t,n){if($){for(Z(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function nt(t,n,e){t.insertBefore(n,e||null)}function et(t,n,e){$&&!e?tt(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function w(t){t.parentNode.removeChild(t)}function xt(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function B(t){return document.createElement(t)}function it(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function S(t){return document.createTextNode(t)}function $t(){return S(" ")}function wt(){return S("")}function At(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function rt(t){return Array.from(t.childNodes)}function z(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function O(t,n,e,i,r=!1){z(t);const u=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const l=t[s];if(n(l)){const c=e(l);return c===void 0?t.splice(s,1):t[s]=c,r||(t.claim_info.last_index=s),l}}for(let s=t.claim_info.last_index-1;s>=0;s--){const l=t[s];if(n(l)){const c=e(l);return c===void 0?t.splice(s,1):t[s]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,l}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function D(t,n,e,i){return O(t,r=>r.nodeName===n,r=>{const u=[];for(let s=0;s<r.attributes.length;s++){const l=r.attributes[s];e[l.name]||u.push(l.name)}u.forEach(s=>r.removeAttribute(s))},()=>i(n))}function Et(t,n,e){return D(t,n,e,B)}function Tt(t,n,e){return D(t,n,e,it)}function ct(t,n){return O(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>S(n),!0)}function Nt(t){return ct(t," ")}function G(t,n,e){for(let i=e;i<t.length;i+=1){const r=t[i];if(r.nodeType===8&&r.textContent.trim()===n)return i}return t.length}function St(t){const n=G(t,"HTML_TAG_START",0),e=G(t,"HTML_TAG_END",n);if(n===e)return new F;z(t);const i=t.splice(n,e+1);w(i[0]),w(i[i.length-1]);const r=i.slice(1,i.length-1);for(const u of r)u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new F(r)}function kt(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function jt(t,n,e){t.classList[e?"add":"remove"](n)}function Ct(t,n=document.body){return Array.from(n.querySelectorAll(t))}class st{constructor(){this.e=this.n=null}c(n){this.h(n)}m(n,e,i=null){this.e||(this.e=B(e.nodeName),this.t=e,this.c(n)),this.i(i)}h(n){this.e.innerHTML=n,this.n=Array.from(this.e.childNodes)}i(n){for(let e=0;e<this.n.length;e+=1)nt(this.t,this.n[e],n)}p(n){this.d(),this.h(n),this.i(this.a)}d(){this.n.forEach(w)}}class F extends st{constructor(n){super();this.e=this.n=null,this.l=n}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let e=0;e<this.n.length;e+=1)et(this.t,this.n[e],n)}}let p;function g(t){p=t}function A(){if(!p)throw new Error("Function called outside component initialization");return p}function Mt(t){A().$$.on_mount.push(t)}function qt(t){A().$$.after_update.push(t)}function Ht(t,n){A().$$.context.set(t,n)}function vt(t){return A().$$.context.get(t)}const y=[],I=[],E=[],P=[],lt=Promise.resolve();let k=!1;function ot(){k||(k=!0,lt.then(R))}function j(t){E.push(t)}const C=new Set;let T=0;function R(){const t=p;do{for(;T<y.length;){const n=y[T];T++,g(n),ut(n.$$)}for(g(null),y.length=0,T=0;I.length;)I.pop()();for(let n=0;n<E.length;n+=1){const e=E[n];C.has(e)||(C.add(e),e())}E.length=0}while(y.length);for(;P.length;)P.pop()();k=!1,C.clear(),g(t)}function ut(t){if(t.fragment!==null){t.update(),m(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(j)}}const N=new Set;let _;function Lt(){_={r:0,c:[],p:_}}function Bt(){_.r||m(_.c),_=_.p}function ft(t,n){t&&t.i&&(N.delete(t),t.i(n))}function zt(t,n,e,i){if(t&&t.o){if(N.has(t))return;N.add(t),_.c.push(()=>{N.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}}function Ot(t,n){const e={},i={},r={$$scope:1};let u=t.length;for(;u--;){const s=t[u],l=n[u];if(l){for(const c in s)c in l||(i[c]=1);for(const c in l)r[c]||(e[c]=l[c],r[c]=1);t[u]=l}else for(const c in s)r[c]=1}for(const s in i)s in e||(e[s]=void 0);return e}function Dt(t){return typeof t=="object"&&t!==null?t:{}}function Gt(t){t&&t.c()}function Ft(t,n){t&&t.l(n)}function at(t,n,e,i){const{fragment:r,on_mount:u,on_destroy:s,after_update:l}=t.$$;r&&r.m(n,e),i||j(()=>{const c=u.map(H).filter(K);s?s.push(...c):m(c),t.$$.on_mount=[]}),l.forEach(j)}function _t(t,n){const e=t.$$;e.fragment!==null&&(m(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function dt(t,n){t.$$.dirty[0]===-1&&(y.push(t),ot(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function It(t,n,e,i,r,u,s,l=[-1]){const c=p;g(t);const o=t.$$={fragment:null,ctx:null,props:u,update:d,not_equal:r,bound:v(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(c?c.$$.context:[])),callbacks:v(),dirty:l,skip_bound:!1,root:n.target||c.$$.root};s&&s(o.root);let a=!1;if(o.ctx=e?e(t,n.props||{},(f,b,...M)=>{const q=M.length?M[0]:b;return o.ctx&&r(o.ctx[f],o.ctx[f]=q)&&(!o.skip_bound&&o.bound[f]&&o.bound[f](q),a&&dt(t,f)),b}):[],o.update(),a=!0,m(o.before_update),o.fragment=i?i(o.ctx):!1,n.target){if(n.hydrate){V();const f=rt(n.target);o.fragment&&o.fragment.l(f),f.forEach(w)}else o.fragment&&o.fragment.c();n.intro&&ft(t.$$.fragment),at(t,n.target,n.anchor,n.customElement),X(),R()}g(c)}class Pt{$destroy(){_t(this,1),this.$destroy=d}$on(n,e){const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!W(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}const h=[];function Rt(t,n=d){let e;const i=new Set;function r(l){if(Q(t,l)&&(t=l,e)){const c=!h.length;for(const o of i)o[1](),h.push(o,t);if(c){for(let o=0;o<h.length;o+=2)h[o][0](h[o+1]);h.length=0}}}function u(l){r(l(t))}function s(l,c=d){const o=[l,c];return i.add(o),i.size===1&&(e=n(r)||d),l(t),()=>{i.delete(o),i.size===0&&(e(),e=null)}}return{set:r,update:u,subscribe:s}}export{_t as A,J as B,Rt as C,vt as D,it as E,Tt as F,ht as G,jt as H,tt as I,d as J,mt as K,pt as L,Ct as M,yt as N,bt as O,gt as P,xt as Q,F as R,Pt as S,St as T,rt as a,At as b,Et as c,w as d,B as e,et as f,ct as g,kt as h,It as i,$t as j,wt as k,Nt as l,Lt as m,zt as n,Bt as o,ft as p,Ht as q,qt as r,Q as s,S as t,Mt as u,Gt as v,Ft as w,at as x,Ot as y,Dt as z};