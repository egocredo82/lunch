const CACHE_NAME = "lunch-roulette-v1";
const URLS_TO_CACHE = [
  "index.html",
  "cd9bdfe0-4fcc-4b29-a787-c2c0759a2656.png",
  "ChatGPT Image 2025년 6월 3일 오전 12_58_22.png",
  "manifest.json"
];

// 설치 단계: 리소스 캐싱
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

// 활성화 단계: 오래된 캐시 삭제
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// 요청 가로채기
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
