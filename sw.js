const CACHE_NAME = "tasha-store-v2";

const FILES_TO_CACHE = [
"index.html",
"style.css",
"script.js",
"firebase.js",
"logo.png",
"banner.jpg"
];


self.addEventListener("install", function(event){

event.waitUntil(

caches.open(CACHE_NAME).then(function(cache){

return cache.addAll(FILES_TO_CACHE);

})

);

});


self.addEventListener("activate", function(event){

event.waitUntil(

caches.keys().then(function(keys){

return Promise.all(

keys.map(function(key){

if(key !== CACHE_NAME){

return caches.delete(key);

}

})

);

})

);

});


self.addEventListener("fetch", function(event){

event.respondWith(

caches.match(event.request).then(function(response){

return response || fetch(event.request);

})

);

});