var CACHE_NAME = "QBasic-cache-v13"; 
var urlsToCache = [
  "https://ishikawamasashi.github.io/QBasic/",
  "https://ishikawamasashi.github.io/QBasic/index.html",

  // dist
  "https://ishikawamasashi.github.io/QBasic/dist/0.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/1.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/2.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/3.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/4.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/5.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/6.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/7.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/8.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/9.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/10.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/11.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/12.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/13.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/14.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/15.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/16.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/17.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/18.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/19.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/20.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/21.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/22.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/23.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/24.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/25.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/26.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/27.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/28.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/29.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/30.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/31.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/32.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/33.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/34.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/35.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/36.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/37.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/38.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/39.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/40.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/41.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/42.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/43.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/44.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/45.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/46.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/47.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/48.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/49.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/50.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/51.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/52.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/53.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/54.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/55.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/56.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/57.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/html.worker.js",
  "https://ishikawamasashi.github.io/QBasic/dist/main.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/monaco-editor.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/syntax-highlighter.js",

  "https://ishikawamasashi.github.io/QBasic/dist/editor.worker.js",
  "https://ishikawamasashi.github.io/QBasic/dist/css.worker.js",
  "https://ishikawamasashi.github.io/QBasic/dist/json.worker.js",
  "https://ishikawamasashi.github.io/QBasic/dist/typescript.worker.js",

  "https://ishikawamasashi.github.io/QBasic/dist/vendors~monaco-editor~monaco-languages.bundle.js",
  "https://ishikawamasashi.github.io/QBasic/dist/worker.bundle.js",
  // style
  "https://ishikawamasashi.github.io/QBasic/style/markdown.css",
  "https://ishikawamasashi.github.io/QBasic/style/ref.css",
  "https://ishikawamasashi.github.io/QBasic/style/split-pane.css",
  "https://ishikawamasashi.github.io/QBasic/style/theme.css",
  "https://ishikawamasashi.github.io/QBasic/style/global.css",
];

const CACHE_KEYS = [
  CACHE_NAME
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME) // 上記で指定しているキャッシュ名
      .then(
      function (cache) {
        return cache.addAll(urlsToCache); // 指定したリソースをキャッシュへ追加
        // 1つでも失敗したらService Workerのインストールはスキップされる
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => {
          return !CACHE_KEYS.includes(key);
        }).map(key => {
          // 不要なキャッシュを削除
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        // 重要：リクエストを clone する。リクエストは Stream なので
        // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
        // 必要なので、リクエストは clone しないといけない
        let fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 重要：レスポンスを clone する。レスポンスは Stream で
            // ブラウザ用とキャッシュ用の2回必要。なので clone して
            // 2つの Stream があるようにする
            let responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});