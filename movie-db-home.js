var movieCards = document.getElementById("movieCards");
var movieCarousel = document.getElementById("movieCarousel");
var peopleCarousel = document.getElementById("peopleCarousel");
var peopleCarIndex = true; 

$(document).ready(function(){
    $('#btnSearch').click(function(){
        let txtSearch = document.querySelector('#txtSearch'); 
        window.location.href = `file:///C:/Users/Lydia/projects/snowpeech.github.io/movie-db/search_results.html?search=${txtSearch.value}`;
    })
    

    var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&include_adult=false&include_video=false&api_key=${apiKey}`,
    "method": "GET",
    "headers": {},
    "data": "{}"
    }

    $.ajax(settings).done(function (response) {
        for(var i=0; i<10; i++){        
            var movId = response.results[i].id;
            var movTitle = response.results[i].original_title;
            var movDesc = response.results[i].overview;
            var movPic = response.results[i].poster_path
            createCard(movId, movTitle, movPic, movDesc, movieCards,"movie");   
        }
    });

    var upcomingSettings = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=2`,
        "method": "GET",
        "headers": {},
        "data": "{}"
      }
      
      $.ajax(upcomingSettings).done(function (response) {
          console.dir("upcoming", response)
        for(var i=0; i<10; i++){
            var upcomingMId = response.results[i].id;   
            var upcomingMTitle = response.results[i].original_title;
            var upcomingMPic = response.results[i].poster_path;
            createCarousel(i, upcomingMId, upcomingMPic, upcomingMTitle, movieCarousel);
            setActCarousel(upcomingMId,upcomingMTitle);
        }
      });
});

function setActCarousel(id, title){
    var upcActSettings = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`,
        "method": "GET",
        "headers": {},
        "data": "{}"
      }
      
      $.ajax(upcActSettings).done(function (response) {
        for(var i=0; i<3; i++){            
            var name = response.cast[i].name;
            var character = response.cast[i].character;
            var pic = response.cast[i].profile_path;
            var id = response.cast[i].id;
            createActCarousel(name, id, character, title,pic, peopleCarousel);
        }      
      });

    function createActCarousel(name, id, character, title, pic, location){
        var pCarousel = document.createElement("DIV");
        if (peopleCarIndex === true){
          pCarousel.classList = "carousel-item active";    
          peopleCarIndex = false;
  
        } else{
              pCarousel.classList = "carousel-item";
          }
          pCarousel.innerHTML = `<a href="file:///C:/Users/Lydia/projects/snowpeech.github.io/movie-db/actor_details.html?id=${id}">
          <img src="https://image.tmdb.org/t/p/w185/${pic}" alt="${name}">
          <div class="carousel-caption d-md-block"><h5>${name}</h5><p>${character} in <br><i>${title}</i>x</p></div>
          </a>`;
          /////////////// add an actor class?
              
          location.appendChild(pCarousel);
    }
}

function createCarousel(index, id, pic, title, location){
    var carousel = document.createElement("DIV");
    if (index === 0){
        carousel.classList = "carousel-item active";    
    }
    else{
        carousel.classList = "carousel-item";
    }
    carousel.innerHTML = `<a href="file:///C:/Users/Lydia/projects/snowpeech.github.io/movie-db/movie_details.html?id=${id}">
    <img class="d-block w-75" src="https://image.tmdb.org/t/p/w780/${pic}" alt="${title}"></a>`;
    
    location.appendChild(carousel);

}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
        
function getData(){
    let searchQuery = getUrlParameter('search');

    var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&api_key=${apiKey}&query=${searchQuery}&append_to_response=person`,
    "method": "GET",
    "headers": {},
    "data": "{}"
    }

    $.ajax(settings).done(function (response) {
        for(var i=0; i<10; i++){ 
            var movId = response.results[i].id;
            var movTitle = response.results[i].original_title;
            var movPic = response.results[i].poster_path;
            var movDesc = response.results[i].overview;
            createList(movPic, movTitle, movDesc, movieResults);
        }
    });

    var settingsPpl = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.themoviedb.org/3/search/person?include_adult=false&language=en-US&api_key=${apiKey}&query=${searchQuery}&append_to_response=person`,
        "method": "GET",
        "headers": {},
        "data": "{}"
        }
    
        $.ajax(settingsPpl).done(function (response) {
            for(var i=0; i<10; i++){
                var actId = response.results[i].id;
                var actName = response.results[i].name;
                var actDesc = "";
                var actPic = response.results[i].profile_path;
                createList(actPic, actName, actDesc, peopleResults);
            }
        });   
    }



function createList(pic, title, desc,location){
    var list = document.createElement("DIV");
    list.classList = "list";
    list.innerHTML = `<div class = "movie-item">
    <img class="search-img" src="https://image.tmdb.org/t/p/w342/${pic}" alt="${title}">
    <div><b><u>${title}</u></b> ${desc}</div>
    </div>`;
    /////////////// add a movie  or actor class?
    location.appendChild(list);
}