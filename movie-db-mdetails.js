var detailId = getUrlParameter('id');
//
var movieName = document.getElementById("movie-name");
var moviePic = document.getElementById("movie-poster");
var movieDesc = document.getElementById("movie-overview")
var movieDate = document.getElementById("movie-date");
var movieWebsite = document.getElementById("movie-webpage");
var movieReviews = document.getElementById("movie-reviews");
var castCards = document.getElementById("cast-cards");
var crewList = document.getElementById("crew-list");

var tableHeader = document.getElementById("table-header");

var movDetSet = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.themoviedb.org/3/movie/${detailId}?language=en-US&api_key=${apiKey}`,
    "method": "GET",
    "headers": {},
    "data": "{}"
}
  
$.ajax(movDetSet).done(function (response) {
    var movTitle = response.original_title;
    var movOverview = response.overview;
    var movImg = response.poster_path;
    var movDate = response.release_date;
    var movWeb = response.homepage;
    
    createMovDet(movTitle,movOverview,movImg, movDate, movWeb);        
});

var movReviewSet = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.themoviedb.org/3/movie/${detailId}/reviews?page=1&language=en-US&api_key=${apiKey}`,
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
  
  $.ajax(movReviewSet).done(function (response) {
    
    listReviews(response);
  });

  var castSettings = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.themoviedb.org/3/movie/${detailId}/credits?api_key=${apiKey}`,
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
  
  $.ajax(castSettings).done(function (response) {
    //console.dir(response);
    for (let i=0; i<response.cast.length; i++){
        var castId = response.cast[i].id;
        var castName = response.cast[i].name;
        var castCharacter = response.cast[i].character;
        var castPic = response.cast[i].profile_path;
        createCard(castId, castName, castPic, castCharacter, castCards, "cast");
    }

    for (let j=0; j<response.crew.length; j++){
        //var crewId = response.crew[j].id;
        var crewName = response.crew[j].name;
        var crewJob = response.crew[j].job;
        console.dir(response.crew[j])
        listCrew(crewJob, crewName);
        //var crewPic = response.crew[j].profile_path;
        //createCard(crewId, crewName, crewPic, crewJob, crewCards, "cast");
    }

  });
  
  function listCrew(job, name){
      var crew = document.createElement("DIV");
      crew.innerHTML = `<b>${job}</b> - <span>${name} </span>`
      crewList.appendChild(crew);
  }


function  createMovDet(title, desc,pic, date, website){
    movieName.innerText = title;
    moviePic.src=`https://image.tmdb.org/t/p/w185/${pic}`;
    movieDesc.innerText = desc;
    movieDate.innerText = date;
    movieWebsite.href = `${website}`;
}

function listReviews(object){
    if (object.results.length == 0){
        movieReviews.innerHTML = "The secret's still in the bag - no one has said anything about this yet!"
    }
    else{
        for (let k = 0; k < object.results.length; k++){
            let review = document.createElement("DIV");
            let reviewer = object.results[k].author;
            let revText =  object.results[k].content;
            
            review.innerHTML = `<b>${reviewer}</b> <div id="more-2" class="fulltext">${revText}</div>`;

            movieReviews.appendChild(review);
        }
        
    }
}
