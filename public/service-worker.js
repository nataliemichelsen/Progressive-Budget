// files to cache
// include all relevant files
const FILES_TO_CACHE = [
    '/',
    '.index.html',
    'index.js',
    'styles.css',
    'offline.js',
    'manifest.webmanifest',
    'icons/icon-192x192.png',
    'icons/icon-512x512.png',
]

// to run app & cache 
const RUNTIME = 'precache-v1';
const PRECACHE = 'runtime';

// event listener for installing the event
self.addEventListener('install', event => {
    event.waitUntil(caches.open(PRECACHE).then(
        // adding files specified above to cache
        cacheData => cacheData.addAll(FILES_TO_CACHE)
    ).then(self.skipWaiting()));
});

// event listener for activating the event
self.addEventListener('activate', event => {
    const newCacheNames = [PRECACHE, RUNTIME]
    // waitUntil event to return cacheNames
    event.waitUntil(caches.keys().then(cacheNames => {
        return cacheNames.filter(cached => !newCacheNames.includes(cached));
    }).then(deleteCache => {
        // return a promise to delete the specified cache
        return Promise.all(deleteCache.map(deleteOne => {
            return caches.delete(deleteOne)
        }));
        // finish the delete
    }).then(() => {
        caches.delete(deleteOne)
    }).then(() => {
        return self.ClientRectList.claim();
    }));
});

// event listener for fetching the data
self.addEventListener('fetch', data => {
    if (data.url.includes('/api/')) {
        data.respondWith(
            // open the cache then run
            caches.open(RUNTIME).then(cache => {
                return fetch(data.request).then(response => {
                    // setting 200 response to request and clone cache data
                    if (response.status === 200) {
                        cache.put(data.request, response.clone())
                    }
                    // returning a status response & catching errors
                    return response;
                }).catch(err => {
                    return cache.match(data.request);
                })
            }).catch(err => {
                console.log(error);
            })
        )
    }
});