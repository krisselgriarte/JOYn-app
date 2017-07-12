var modalLat;
var modalLong;
var likesDislikesArray;

function createResultsFromAjax (arr) {
	if (arr.length == 0) {
		$(".resultsContainer").text("Sorry there were no results");
	} else {
		for (var i = 0; i < arr.length; i++) {
			var resultDiv = $("<div class='resultDiv'>");
			var likeButton = $("<button class='btn-yes'>");
			var dislikeButton = $("<button class='btn-no'>");
			var moreInfoButton = $("<button class='btn-info'>");
			var resultDivName = $("<p>");
			moreInfoButton.text("Info");
			moreInfoButton.attr("data-toggle", "modal");
			moreInfoButton.attr("data-target", "#exampleModalLong");
			dislikeButton.text("Nope");
			likeButton.text("Like");
			resultDiv.attr(arr[i]);
			resultDiv.attr(arr[i].activities[0]);
			resultDivName.text(arr[i].name);
			resultDiv.append(resultDivName);
			resultDiv.append(dislikeButton);
			resultDiv.append(moreInfoButton);
			resultDiv.append(likeButton);
			$(".resultsContainer").append(resultDiv);
		}
	}
}

function weatherAjaxCall() {
	var weatherUrl = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=" + modalLat + "&lon=" + modalLong + "&APPID=348509db7b77932ecdfed1c1c297887d";
	var modalWeatherImg = "http://openweathermap.org/img/w/";
	$.ajax({
		method: "GET",
		crossDomain: 'true',
		url: weatherUrl
	}).done(function(response){
		modalWeatherImg += response.weather[0].icon + ".png";
		$("#modalWeatherImg").attr("src", modalWeatherImg);
	})
}

function initMap(latitude, long) {
        var uluru = {lat: parseFloat(latitude), lng: parseFloat(long)};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: uluru
        });

        map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});

        map.addListener('click', function(e) {
        	map.setOptions({draggable: true, zoomControl: true, scrollwheel: true, disableDoubleClickZoom: false});
  		});

        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }

$(".resultsContainer").on("click", ".btn-info", function() {
	var modalResultName = $(this).parent()[0].attributes.name.value;
	var modalActivityType = $(this).parent()[0].attributes.activity_type_name.value;
	$("#exampleModalLongTitle").text(modalResultName);
	$("#modalDescription").html($(this).parent()[0].attributes.description.value);
	$("#modalDirections").html($(this).parent()[0].attributes.directions.value);
	modalLat = $(this).parent()[0].attributes.lat.value;
	modalLong = $(this).parent()[0].attributes.lon.value;
	weatherAjaxCall();
	activityImage(modalActivityType);
})

$("#exampleModalLong").on("shown.bs.modal", function () {
    google.maps.event.trigger(map, "resize");
    initMap(modalLat, modalLong);
});

function activityImage (activityName) {
	if (activityName == "hiking") {
		$("#modalActivityType").attr("src", "assets/images/002-sports.png");
	} else if (activityName == "camping") {
		$("#modalActivityType").attr("src", "assets/images/001-moon.png");
	} else if (activityName == "mountain biking") {
		$("#modalActivityType").attr("src", "assets/images/003-bicycle-rider.png");
	} else {
		return 0;
	}
}

function checkResults() {
    var userId = firebase.auth().currentUser.uid;
    var rootRef = firebase.database().ref();
    var userRef = rootRef.child('users');
    var currListRef = userRef.child(userId);

    currListRef.once('value', function(snapshot) {
        var yesListObj = snapshot.val().yesList;
        var noListObj = snapshot.val().noList;
        likesDislikesArray = [];
        for (var prop in noListObj) {
            likesDislikesArray.push(prop);
        }
        for (var prop in yesListObj) {
            likesDislikesArray.push(prop);
        }
        var url = createAjaxUrl(latitude, ajaxLimit, longitude, activity, city, country, state, radius);
     	trailAjaxCall(url);
    });
} 