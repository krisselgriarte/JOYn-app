

var modalLat;
var modalLong;

function createResultsFromAjax (arr) {
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
// $.support.cors = true;

var modalLat = 10
var modalLong = 10
function weatherAjaxCall() {
	var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + modalLat + "&lon=" + modalLong + "&APPID=348509db7b77932ecdfed1c1c297887d";
	console.log(weatherUrl);
	$.ajax({
		method: "GET",
		crossDomain: 'true',
		url: weatherUrl
	}).done(function(response){
		console.log(response)
	})
}

function initMap(latitude, long) {
        var uluru = {lat: parseFloat(latitude), lng: parseFloat(long)};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }

$(".resultsContainer").on("click", ".btn-info", function() {

	console.log($(this).parent()[0].attributes);
	var modalResultName = $(this).parent()[0].attributes.name.value;
	var modalActivityType = $(this).parent()[0].attributes.activity_type_name.value;
	console.log(modalResultName);
	$("#exampleModalLongTitle").text(modalResultName);
	$("#modalDescription").html($(this).parent()[0].attributes.description.value);
	$("#modalDirections").html($(this).parent()[0].attributes.directions.value);
	modalLat = $(this).parent()[0].attributes.lat.value;
	modalLong = $(this).parent()[0].attributes.lon.value;
	$("#modalWeatherImg").attr("src", "http://openweathermap.org/img/w/10d.png");
	$("#modalActivityType").html(modalActivityType);
})

$("#exampleModalLong").on("shown.bs.modal", function () {
    google.maps.event.trigger(map, "resize");
    initMap(modalLat, modalLong);
});
