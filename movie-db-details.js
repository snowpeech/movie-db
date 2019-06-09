var detailId = getUrlParameter('id');
var actorDetails =document.getElementById("actor-details");
var actorName = document.getElementById("actor-name");
var profilePic = document.getElementById("profile-picture");
var actorBio = document.getElementById("actor-bio")
var tableHeader = document.getElementById("table-header");


var actDetSet = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.themoviedb.org/3/person/${detailId}?language=en-US&api_key=${apiKey}`,
    "method": "GET",
    "headers": {},
    "data": "{}"
}
  
$.ajax(actDetSet).done(function (response) {

    var actName = response.name;
    var actBio = response.biography;
    var actPic = response.profile_path;
    createActDet(actName,actBio,actPic);        
});



function createActDet(name, bio, pic){
    actorName.innerHTML = name;
    profilePic.src=`https://image.tmdb.org/t/p/w185/${pic}`;
    actorBio.innerText = bio;
}

var actCredSet = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.themoviedb.org/3/person/${detailId}/combined_credits?language=en-US&api_key=${apiKey}`,
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
  
$.ajax(actCredSet).done(function (response) {

    for (let j=0; j < response.cast.length; j++){
        createRow(response, j);
    }
});


function createRow(response, index){

    var row = document.createElement("TR");
    var credType = response.cast[index].media_type;
    var credRole = response.cast[index].character;

    if (credType === "movie"){
        var credTitle = response.cast[index].original_title;
        var credDate = response.cast[index].release_date;

        row.class = "movie"
        row.innerHTML = `<td>Movie: </td> <td>${credTitle}</td>
        <td>${credRole}</td>
        <td>${credDate}</td>`;
    }

    else {
        var tvName = response.cast[index].name;
        var airDate = response.cast[index].first_air_date;
        row.class = "tv"
        row.innerHTML = `<td>TV Show: </td> <td>${tvName}</td>
        <td>${credRole}</td>
        <td>${airDate}</td>`
    }
    
    acting.insertAdjacentElement("afterend", row);
}


  