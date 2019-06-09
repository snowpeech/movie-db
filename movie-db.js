var movieResults = document.getElementById("movieResults");
var peopleResults = document.getElementById("peopleResults");
const apiKey = 'b6f68141a214aea8a4584e1ebb8927cb';     

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

function createList(pic, name, desc,location){
    var list = document.createElement("DIV");
    list.classList = "list";

    if(pic){
        list.innerHTML = `<div class = "movie-item">
    <img class="search-img" src="https://image.tmdb.org/t/p/w342/${pic}" alt="${name}">
    <div><b><u>${name}</u></b> ${desc}</div>
    </div>`;
    }
    else {
        list.innerHTML = `<div class = "movie-item">
    <div><b><u>${name}</u></b> ${desc}</div>
    </div>`;    
    }
    
    location.appendChild(list);
}