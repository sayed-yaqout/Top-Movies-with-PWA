// const staticCachName = "site-static-v5";
// const dynamicCach = "site-dynamic-v1";
// const assets = [
//   "/",
//   "/index.html",
//   "dist/main.js",
//   "dist/style.css",
//   "app/src/img/profile.PNG",
//   "app/src/img/search.png",
//   "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
//   "https://unpkg.com/flickity@2/dist/flickity.min.css",
//   "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
//   "https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js",
//   "https://unpkg.com/mustache@latest",
//   "https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
// ];
// //limiting cache size
// const limitCachSize = (name,size)=>{
//     caches.open(name).then(cache=>{
//         cache.keys().then(keys=>{
//             if(keys.length>size){
//                 cache.delete(keys[0]).then(limitCachSize(name,size))
//             }

//         })
//     })
// } 
// //install event
// self.addEventListener("install", (evt) => {
//   evt.waitUntil(
//     caches.open(staticCachName).then((cashe) => {
//       cashe.addAll(assets);
//     })
//   );
// });

// //activate event
// self.addEventListener("activate", (evt) => {
//   evt.waitUntil(
//     caches.keys().then((keys) => {
//       return Promise.all(
//         keys
//           .filter((key) => key !== staticCachName)
//           .map((key) => caches.delete(key))
//       );
//     })
//   );
// });

// //fetch event
// self.addEventListener("fetch",evt => {
//   evt.respondWith(
//     caches.match(evt.request).then(cashRes => {
//       return (
//         cashRes || fetch(evt.request).then((fetchRes) => {
//           return caches.open(dynamicCach).then((cache) => {
//             cache.put(evt.request.url, fetchRes.clone());
//             limitCachSize(dynamicCach,3);
//             return fetchRes;
//           });
//         })
//       );
//     })
//   );
// });

///////////////////
const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
"/",
  "/index.html",
  "dist/main.js",
  "dist/style.css",
  "app/src/img/profile.PNG",
  "app/src/img/search.png",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
  "https://unpkg.com/flickity@2/dist/flickity.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
  "https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js",
  "https://unpkg.com/mustache@latest",
  "https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          // check cached items size
          limitCacheSize(dynamicCacheName, 15);
          return fetchRes;
        })
      });
    })
  )
});