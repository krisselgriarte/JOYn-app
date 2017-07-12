var latitude;
var longitude;
var ajaxLimit;
var activity;
var city;
var state;
var country;
var radius;

var eventObj;

function createAjaxUrl(lat, limit, lon, activity, city, country, state, radius) {
	var baseUrl = "https://trailapi-trailapi.p.mashape.com/?";
	var params = "";
	if (lat && lon) {
		params += "lat=" + lat + "&lon=" + lon + "&";
	} else if (city && country && state) {
		params += "q[city_cont]=" + city + "&q[country_cont]=" + country + "&q[state_cont]=" + state + "&";
	}
	if (limit) {
		params += "limit=" + limit + "&";
	}
	if (activity) {
		params += "q[activities_activity_type_name_eq]=" + activity + "&";
	}
	if (radius) {
		params += "radius=" + radius;
	}
	var fullUrl = baseUrl + params;
	var url = fullUrl.replace(/ /g, "+");
	return url;
}

function trailAjaxCall(url) {
	$.ajaxSetup({
	    headers: { 'X-Mashape-Key': '1WWcaF7KgRmshaVdzjMEkHd4xRUWp1NbhqVjsnVdjN3Sz5OMgU' }
	});

		$.ajax({
			url: url,
			method: "GET",
			beforeSend: function(jqXHR, settings) {
  }
		}).done(function(response) {
			createResultsFromAjax(response.places);
			console.log("Number of places " + (response.places).length);
			// Function to store information to Firebase
			storeUserInfo();
		})
}

$( document ).ready(function() {
    latitude = parseFloat(sessionStorage.getItem("latitude"));
    longitude = parseFloat(sessionStorage.getItem("longitude"));
    activity = (sessionStorage.getItem("activity")).toLowerCase();
    city = sessionStorage.getItem("city");
    state = sessionStorage.getItem("state");
    country = sessionStorage.getItem("country");
    radius = parseInt(sessionStorage.getItem("radius"));

    console.log(latitude);

     var url = createAjaxUrl(latitude, ajaxLimit, longitude, activity, city, country, state, radius);
     trailAjaxCall(url);
});