var movieCards = document.getElementById("movieCards");
var movieResults = document.getElementById("movieResults");
var peopleResults = document.getElementById("peopleResults");
var apiKey = 'b6f68141a214aea8a4584e1ebb8927cb';     

// https://api.themoviedb.org/3/search/movie?api_key=b6f68141a214aea8a4584e1ebb8927cb&language=en-US&query=${searchTxt}&page=1&include_adult=false

$(document).ready(function(){
    $('#btnSearch').click(function(){
        let txtSearch = document.querySelector('#txtSearch'); 
        window.location.href = `file:///C:/Users/Lydia/projects/snowpeech.github.io/movie-db/search_results.html?search=${txtSearch.value}`;
    })
    getData();

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
            createCard(movId, movTitle, movPic, movDesc);   
        }
    });
});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
        
function getData(){
    let searchQuery = getUrlParameter('search');

    console.log('Search Query Results', searchQuery);

    var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&api_key=${apiKey}&query=${searchQuery}&append_to_response=person`,
    "method": "GET",
    "headers": {},
    "data": "{}"
    }

    // https://api.themoviedb.org/3/search/person?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

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
    
        // https://api.themoviedb.org/3/search/person?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
    
        $.ajax(settingsPpl).done(function (response) {
            for(var i=0; i<10; i++){
                console.dir(response.results[i])
                var actId = response.results[i].id;
                var actName = response.results[i].name;
                var actDesc = "";
                var actPic = response.results[i].profile_path;
                //console.log(actId, actName, actDesc, actPic)
                createList(actPic, actName, actDesc, peopleResults);
                
                // var movId = response.results[i].id;
                // var movTitle = response.results[i].original_title;
                // var movPic = response.results[i].poster_path;
                // var movDesc = response.results[i].overview;
                // createList(movPic, movTitle, movDesc);
            }
        });
}

function createCard(Id, Title, Pic, Desc){
    var card = document.createElement("DIV");
    card.classList ="card";
    card.innerHTML = `<a href = "https://www.themoviedb.org/movie/${Id}">
    <img class="card-img" src="https://image.tmdb.org/t/p/w500/${Pic}" alt="${Title}">
    <div class="card-img-overlay">
        <h5 class="card-title">${Title}</h5>
        <p class="card-text">${Desc}</p>    
    </div> </a>`;
    movieCards.appendChild(card);
}

function createList(pic, title, desc,location){
    var list = document.createElement("DIV");
    list.classList = "list";
    list.innerHTML = `<div class = "movie-item">
    <img class="search-img" src="https://image.tmdb.org/t/p/w500/${pic}" alt="${title}">
    <div><b><u>${title}</u></b> ${desc}</div>
    </div>`;
    location.appendChild(list);
}