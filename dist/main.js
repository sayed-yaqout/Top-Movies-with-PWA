"use strict";var TOPRATED_API_KEY="https://api.themoviedb.org/3/movie/top_rated?api_key=4ad8cb5b2b8f3f393d5fbb1e73651f69&language=en-US",TRENDING_API_KEY="https://api.themoviedb.org/3/trending/all/day?api_key=4ad8cb5b2b8f3f393d5fbb1e73651f69",NOWPLAYING_API_KEY="https://api.themoviedb.org/3/movie/now_playing?api_key=4ad8cb5b2b8f3f393d5fbb1e73651f69&language=en-US&page=1",moviesComponent=function(){var e,t=document.querySelector(".topRated"),n=document.querySelector(".trending"),o=document.querySelector(".nowPlaying"),r=document.getElementById("moviestemp").innerHTML,i=document.getElementById("trendingTemp").innerHTML,c=document.getElementById("nowplayingTemp");function a(e){return fetch(e)}function u(t,n,o){e=t.results;for(var r=0;r<e.length;r++){var i=Mustache.render(n,{poster:"https://image.tmdb.org/t/p/w200/".concat(e[r].poster_path)});o.innerHTML+=i}}function f(e,t){new Flickity(e,{prevNextButtons:t,autoPlay:!0,freeScroll:!0,contain:!0,pageDots:!1})}return{init:function(){a(NOWPLAYING_API_KEY).then((function(e){return e.json()})).then((function(t){!function(t,n,o){console.log(t),e=t.results;for(var r=0;r<e.length;r++){var i=Mustache.render(n.innerHTML,{title:e[r].title,poster:"https://image.tmdb.org/t/p/w500/".concat(e[r].backdrop_path)});o.innerHTML+=i}}(t,c,o),f(o,!1)})).catch((function(e){return console.log(e)})),a(TOPRATED_API_KEY).then((function(e){return e.json()})).then((function(e){u(e,r,t),f(t,!0)})).catch((function(e){return console.log(e)})),a(TRENDING_API_KEY).then((function(e){return e.json()})).then((function(e){u(e,i,n),f(n,!0)})).catch((function(e){return console.log(e)}))}}}();moviesComponent.init();
//# sourceMappingURL=main.js.map