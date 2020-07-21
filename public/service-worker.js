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
    const cacheNames = [PRECACHE, RUNTIME]

    event.waitUntil(caches.keys().then(cacheNames => {
        return cacheNames
    }));
});

// event listener for fetching the data
self.addEventListener('fetch', data => {
    
});