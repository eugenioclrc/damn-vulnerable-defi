import{S as P,i as V,s as J,e as b,t as S,j as k,c as g,a as E,g as D,d,l as $,b as y,f as w,I as c,h as A,M as O,J as H,Q,u as R}from"../chunks/vendor-e408b87e.js";import{d as T,b as z}from"../chunks/env-a13806e5.js";import{b as C}from"../chunks/paths-28a87002.js";function I(r,s,a){const o=r.slice();return o[1]=s[a],o}function N(r){let s,a,o=(r[1].metadata&&r[1].metadata.title)+"",i,m,h,f=(r[1].metadata&&r[1].metadata.excerpt)+"",p,v,_;return{c(){s=b("a"),a=b("h2"),i=S(o),m=k(),h=b("p"),p=S(f),v=k(),this.h()},l(n){s=g(n,"A",{href:!0});var e=E(s);a=g(e,"H2",{class:!0});var t=E(a);i=D(t,o),t.forEach(d),m=$(e),h=g(e,"P",{});var u=E(h);p=D(u,f),u.forEach(d),v=$(e),e.forEach(d),this.h()},h(){y(a,"class","title"),y(s,"href",_=`${C}/${r[1].slug}`)},m(n,e){w(n,s,e),c(s,a),c(a,i),c(s,m),c(s,h),c(h,p),c(s,v)},p(n,e){e&1&&o!==(o=(n[1].metadata&&n[1].metadata.title)+"")&&A(i,o),e&1&&f!==(f=(n[1].metadata&&n[1].metadata.excerpt)+"")&&A(p,f),e&1&&_!==(_=`${C}/${n[1].slug}`)&&y(s,"href",_)},d(n){n&&d(s)}}}function B(r){let s,a,o,i,m,h,f=r[0].length+"",p,v,_,n=r[0],e=[];for(let t=0;t<n.length;t+=1)e[t]=N(I(r,n,t));return{c(){s=k(),a=b("section"),o=b("h1"),i=S("Soluciones a Damn Vulnerable Defi"),m=k(),h=b("p"),p=S(f),v=S(" posts."),_=k();for(let t=0;t<e.length;t+=1)e[t].c();this.h()},l(t){O('[data-svelte="svelte-1bmntbh"]',document.head).forEach(d),s=$(t),a=g(t,"SECTION",{});var l=E(a);o=g(l,"H1",{});var j=E(o);i=D(j,"Soluciones a Damn Vulnerable Defi"),j.forEach(d),m=$(l),h=g(l,"P",{class:!0});var M=E(h);p=D(M,f),v=D(M," posts."),M.forEach(d),_=$(l);for(let q=0;q<e.length;q+=1)e[q].l(l);l.forEach(d),this.h()},h(){document.title="DAMN vulnerable defi blog (Soluciones y spoilers)",y(h,"class","info")},m(t,u){w(t,s,u),w(t,a,u),c(a,o),c(o,i),c(a,m),c(a,h),c(h,p),c(h,v),c(a,_);for(let l=0;l<e.length;l+=1)e[l].m(a,null)},p(t,[u]){if(u&1&&f!==(f=t[0].length+"")&&A(p,f),u&1){n=t[0];let l;for(l=0;l<n.length;l+=1){const j=I(t,n,l);e[l]?e[l].p(j,u):(e[l]=N(j),e[l].c(),e[l].m(a,null))}for(;l<e.length;l+=1)e[l].d(1);e.length=n.length}},i:H,o:H,d(t){t&&d(s),t&&d(a),Q(e,t)}}}const U=T,W=!0,X=z;async function Y({fetch:r}){return{props:{posts:await r(`${C}/index.json`).then(a=>a.json())}}}function F(r,s,a){let{posts:o=[]}=s;return R(()=>{console.log(o)}),r.$$set=i=>{"posts"in i&&a(0,o=i.posts)},[o]}class Z extends P{constructor(s){super();V(this,s,F,B,J,{posts:0})}}export{Z as default,U as hydrate,Y as load,W as prerender,X as router};
