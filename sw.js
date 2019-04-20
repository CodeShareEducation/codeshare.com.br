const staticCacheName = 'codeshare-cache-v1';

const filesToCache = [
    '/assets/js/main.js',
    '/assets/css/main.css',
    '/assets/img/blog-image.png',
    '/autores/',
    '/categorias/',
    '/tags/',
    '/sobre/'
];

// Cache on install
this.addEventListener("install", function (event) {
    this.skipWaiting();

    event.waitUntil(caches.open(staticCacheName)
        .then(function (cache) {
            return cache.addAll(filesToCache);
        })
    )
});

// Clear cache on activate
this.addEventListener('activate', function (event) {
    event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(
            cacheNames
                .filter(function (cacheName) {
                    return cacheName.startsWith('codeshare-cache')
                })
                .filter(function (cacheName) {
                    return cacheName !== staticCacheName
                })
                .map(function (cacheName) {
                    return caches.delete(cacheName)
                })
        );
    }));
});

// Serve from Cache
this.addEventListener("fetch", function (event) {
    event.respondWith(caches.match(event.request)
        .then(function (response) {
            return response || fetch(event.request);
        })
    )
});