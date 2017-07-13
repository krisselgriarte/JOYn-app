var latitude;
var longitude;
var ajaxLimit;
var activity;
var city;
var state;
var country;
var radius;

var eventObj;
var allTheResultsObj;

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
			allTheResultsObj = response.places;
			console.log(allTheResultsObj);
			if (likesDislikesArray == null) {
				createResultsFromAjax(allTheResultsObj);
				storeUserInfo();
			} else {
				compare(allTheResultsObj, likesDislikesArray);
        		createResultsFromAjax(allTheResultsObj);
        		storeUserInfo();
        	}
			// // Function to store information to Firebase
			
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
});

$(window).on('load', function() {
	storeUserInfo();
    checkResults();
});

function compare (arr1, arr2) {
	console.log(arr1,arr2);
	for (var i = arr1.length -1; i >= 0; i--) {
		for (var j = 0; j < arr2.length; j++) {
			if (arr1[i].activities[0].unique_id == arr2[j]) {
				allTheResultsObj.splice(i,1);
			}
		}
	}
}
