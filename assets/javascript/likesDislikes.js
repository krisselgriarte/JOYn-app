
function createLikes (arr) {
	$(".populatedLikesDislikes").empty();
	for (var i = 0; i < arr.length; i++) {
		var resultDiv = $("<div class='resultDiv'>");
		var chatButton = $("<button class='btn-chat'>");
		var dislikeButton = $("<button class='btn-no'>");
		var moreInfoButton = $("<button class='infoBtn'>");
		var resultDivName = $("<p>");
		moreInfoButton.text("Info");
		moreInfoButton.attr("data-toggle", "modal");
		moreInfoButton.attr("data-target", "#exampleModalLong");
		dislikeButton.text("Move to Nopes");
		chatButton.text("Chat");
		resultDiv.attr(arr[i]);
		resultDivName.text(arr[i].eventName);
		resultDiv.append(resultDivName);
		resultDiv.append(dislikeButton);
		resultDiv.append(moreInfoButton);
		resultDiv.append(chatButton);
		$(".populatedLikesDislikes").append(resultDiv);
	}
}

function createDislikes (arr) {
	$(".populatedLikesDislikes").empty();
	for (var i = 0; i < arr.length; i++) {
		var resultDiv = $("<div class='resultDiv'>");
		var likeButton = $("<button class='btn-yes'>");
		var removeButton = $("<button class='btn-remove'>");
		var moreInfoButton = $("<button class='infoBtn'>");
		var resultDivName = $("<p>");
		moreInfoButton.text("Info");
		moreInfoButton.attr("data-toggle", "modal");
		moreInfoButton.attr("data-target", "#exampleModalLong");
		removeButton.text("Remove for Good");
		likeButton.text("Move to Likes");
		resultDiv.attr(arr[i]);
		resultDivName.text(arr[i].eventName);
		resultDiv.append(resultDivName);
		resultDiv.append(removeButton);
		resultDiv.append(moreInfoButton);
		resultDiv.append(likeButton);
		$(".populatedLikesDislikes").append(resultDiv);
	}
}

$(".populatedLikesDislikes").on("click", ".infoBtn", function() {

	console.log($(this).parent()[0].attributes);
	var modalResultName = $(this).parent()[0].attributes.eventname.value;
	var modalActivityType = $(this).parent()[0].attributes.eventtype.value;
	console.log(modalResultName);
	$("#exampleModalLongTitle").text(modalResultName);
	$("#modalDescription").html($(this).parent()[0].attributes.eventdesc.value);
	$("#modalDirections").html($(this).parent()[0].attributes.eventdir.value);
	modalLat = $(this).parent()[0].attributes.eventlat.value;
	modalLong = $(this).parent()[0].attributes.eventlong.value;
	weatherAjaxCall();
	activityImage(modalActivityType);
})

function likeObjConvertToArray (obj) {
		var ObjArray = Object.values(obj);
		createLikes(ObjArray);	
}

function dislikeObjConvertToArray (obj) {
		var ObjArray = Object.values(obj);
		createDislikes(ObjArray);	
}

$( window ).on( "load", function() {
	getYesList();
	userActBtns();
})

$("#dislikes").on("click", function()
	{getNoList()});
$("#likes").on("click", function() {getYesList()});