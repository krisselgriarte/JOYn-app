$("#activitySelect").bind("change", function () {
    $("#subOutdoors").toggle(this.value == 1);
}).change();

$("#radiusInput").slider({
	tooltip: 'always'
});

$("#locationButton").on("click", function() {
	var options = {
  	enableHighAccuracy: true,
  	timeout: 5000,
  	maximumAge: 0
	};

	function success(pos) {
  		var crd = pos.coords;
  		sessionStorage.clear();
  		sessionStorage.setItem("latitude", crd.latitude);
      	sessionStorage.setItem("longitude", crd.longitude);
      	sessionStorage.setItem("country", "");
    	sessionStorage.setItem("state", "");
    	sessionStorage.setItem("city", "");
  		$(location).attr('href', 'activitySelect.html');
	};

	function error(err) {
  		console.warn(`ERROR(${err.code}): ${err.message}`);
	};

navigator.geolocation.getCurrentPosition(success, error, options);

});

$("#locationFormSubmit").on("click", function() {
	event.preventDefault();

	sessionStorage.clear();

	sessionStorage.setItem("country", $("#countryId").val());
    sessionStorage.setItem("state", $("#stateId").val());
    sessionStorage.setItem("city", $("#cityId").val());
    sessionStorage.setItem("latitude", "");
    sessionStorage.setItem("longitude", "");
	
	$(location).attr('href', 'activitySelect.html');
	return false;
});

$("#activitySubmit").on("click", function() {
	event.preventDefault();

	sessionStorage.setItem("radius", $("#radiusInput").val());
    sessionStorage.setItem("activity", $("#subOutdoorsSelect").val());
	
	$(location).attr('href', 'results.html');
	return false;
});