const TOPRATED_API_KEY =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=4ad8cb5b2b8f3f393d5fbb1e73651f69&language=en-US";
const TRENDING_API_KEY= "https://api.themoviedb.org/3/trending/all/day?api_key=4ad8cb5b2b8f3f393d5fbb1e73651f69";
const NOWPLAYING_API_KEY="https://api.themoviedb.org/3/movie/now_playing?api_key=4ad8cb5b2b8f3f393d5fbb1e73651f69&language=en-US&page=1";

//============================================================MOVIES API================================================\\
var moviesComponent = (function () {
  var movies;
  //========================galleryies
  var topRatedGallery = document.querySelector(".topRated");
  var trendingGallery=document.querySelector(".trending");
  var nowplayingGallery=document.querySelector(".nowPlaying");
//==========================templates
  var moviesTemp = document.getElementById("moviestemp").innerHTML;
  var trendingTemp=document.getElementById("trendingTemp").innerHTML;
  var nowplayingTemp = document.getElementById("nowplayingTemp");

  function init() {



    fetchData(NOWPLAYING_API_KEY)
    .then(res=>res.json())
    .then((data) => {
      renderPlaying(data,nowplayingTemp,nowplayingGallery);
      initialize_flickity(nowplayingGallery,false);
    }).catch(err=>console.log(err));

    fetchData(TOPRATED_API_KEY)
      .then((res) => res.json())
      .then((data) => {
        render(data,moviesTemp,topRatedGallery);
        initialize_flickity(topRatedGallery,true)
      }).catch(err=>console.log(err));

      fetchData(TRENDING_API_KEY)
      .then((res) => res.json())
      .then((data) => {
        render(data,trendingTemp,trendingGallery);
        initialize_flickity(trendingGallery,true);
      }).catch(err=>console.log(err));
  }

  function fetchData(key) {
    return fetch(key);
  }
  function render(moviesData,temp,gallery) {
    movies = moviesData.results;
    for (var i = 0; i < movies.length; i++) {
      var rendered = Mustache.render(temp, {
        poster: `https://image.tmdb.org/t/p/w200/${movies[i].poster_path}`,
      });
      gallery.innerHTML += rendered;
    }
  }
  function renderPlaying(moviesData,temp,gallery){
    console.log(moviesData)
    movies =moviesData.results;

for (var i = 0; i < movies.length; i++) {
 // temp.style.backgroundImage=`url("https://image.tmdb.org/t/p/w200/${movies[i].poster_path}")`;
  var rendered = Mustache.render(temp.innerHTML, {
    title:movies[i].title
    , poster: `https://image.tmdb.org/t/p/w500/${movies[i].backdrop_path}`
  });
  
  gallery.innerHTML += rendered;
}
  }
  function initialize_flickity(element,arrows) {
   
    var flkty = new Flickity(element, {
      // options
      //wrapAround: true,
      prevNextButtons: arrows,
      autoPlay: true,
     // prevNextButtons: false,
      freeScroll: true,
      contain: true,
      pageDots: false,
    });
  }
  
  return {
    init: init,
  };
})();

moviesComponent.init();

// //====================================old script========================================\\
// //get fetched data from news API
// let movies;

// fetch(MOVIES_API_KEY)
//   .then((res) => res.json())
//   .then((data) => initialize(data))
//   .catch((err) => console.log("Error", err));

// function initialize(moviesData) {
//   console.log(moviesData)
//   movies = moviesData.results;
//   let gallery = document.querySelector(".gallery");
//   let template = document.getElementById("moviestemp").innerHTML;

//   for (let i = 0; i < movies.length; i++) {
//     var rendered = Mustache.render(template, {
//       poster:`https://image.tmdb.org/t/p/w200/${movies[i].poster_path}`
//     });

//     gallery.innerHTML += rendered;
//   }
// }

// // Delay in loading flickity plugin
// setTimeout(load_js, 0);

// function load_js() {
//   // Get the head tag
//   var head_ID = document.getElementsByTagName("head")[0];
//   // Create script element
//   var script_element = document.createElement("script");
//   // Set the script type to JavaScript
//   script_element.type = "text/javascript";
//   // External JS file
//   script_element.src = "https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js";
//   head_ID.appendChild(script_element);
// }
