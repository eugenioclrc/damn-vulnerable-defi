const timestamp = 1643719264250;
const build = [
  "/damn-vulnerable-defi/_app/start-02ba3c51.js",
  "/damn-vulnerable-defi/_app/assets/start-61d1577b.css",
  "/damn-vulnerable-defi/_app/pages/__layout.svelte-71381061.js",
  "/damn-vulnerable-defi/_app/assets/pages/__layout.svelte-b7b55406.css",
  "/damn-vulnerable-defi/_app/error.svelte-f5ba2888.js",
  "/damn-vulnerable-defi/_app/pages/index.svelte-2360a2ff.js",
  "/damn-vulnerable-defi/_app/pages/about.svelte-b5831015.js",
  "/damn-vulnerable-defi/_app/assets/pages/about.svelte-bf4528fa.css",
  "/damn-vulnerable-defi/_app/pages/_slug_.svelte-cd782bf2.js",
  "/damn-vulnerable-defi/_app/assets/pages/_slug_.svelte-a65f70ba.css",
  "/damn-vulnerable-defi/_app/chunks/vendor-d04be387.js",
  "/damn-vulnerable-defi/_app/chunks/paths-28a87002.js",
  "/damn-vulnerable-defi/_app/chunks/env-a13806e5.js"
];
const files = [
  "/damn-vulnerable-defi/.nojekyll",
  "/damn-vulnerable-defi/favicon.png",
  "/damn-vulnerable-defi/logo.png",
  "/damn-vulnerable-defi/manifest.json",
  "/damn-vulnerable-defi/robots.txt",
  "/damn-vulnerable-defi/s-worker.js"
];
const worker = self;
const FILES = `cache${timestamp}`;
const to_cache = build.concat(files);
const staticAssets = new Set(to_cache);
worker.addEventListener("install", (event) => {
  event.waitUntil(caches.open(FILES).then((cache) => cache.addAll(to_cache)).then(() => {
    worker.skipWaiting();
  }));
});
worker.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then(async (keys) => {
    for (const key of keys) {
      if (key !== FILES)
        await caches.delete(key);
    }
    worker.clients.claim();
  }));
});
async function fetchAndCache(request) {
  const cache = await caches.open(`offline${timestamp}`);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    const response = await cache.match(request);
    if (response)
      return response;
    throw err;
  }
}
worker.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return;
  const url = new URL(event.request.url);
  const isHttp = url.protocol.startsWith("http");
  const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port;
  const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
  const skipBecauseUncached = event.request.cache === "only-if-cached" && !isStaticAsset;
  if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith((async () => {
      const cachedAsset = isStaticAsset && await caches.match(event.request);
      return cachedAsset || fetchAndCache(event.request);
    })());
  }
});
