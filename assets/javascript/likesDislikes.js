
function createLikes (arr) {
	$(".populatedLikesDislikes").empty();
	for (var i = 0; i < arr.length; i++) {
		var resultDiv = $("<div class='resultDiv'>");
		var chatButton = $("<button class='btn-chat'>");
		var dislikeButton = $("<button class='btn-no'>");
		var moreInfoButton = $("<button class='btn-info'>");
		var resultDivName = $("<p>");
		moreInfoButton.text("Info");
		moreInfoButton.attr("data-toggle", "modal");
		moreInfoButton.attr("data-target", "#exampleModalLong");
		dislikeButton.text("Move to Nopes");
		chatButton.text("Chat");
		resultDiv.attr(arr[i]);
		resultDiv.attr(arr[i].activities[0]);
		resultDivName.text(arr[i].name);
		resultDiv.append(resultDivName);
		resultDiv.append(dislikeButton);
		resultDiv.append(moreInfoButton);
		resultDiv.append(chatButton);
		$(".resultsContainer").append(resultDiv);
	}
}

function createDislikes (arr) {
	$(".populatedLikesDislikes").empty();
	for (var i = 0; i < arr.length; i++) {
		var resultDiv = $("<div class='resultDiv'>");
		var likeButton = $("<button class='btn-yes'>");
		var removeButton = $("<button class='btn-remove'>");
		var moreInfoButton = $("<button class='btn-info'>");
		var resultDivName = $("<p>");
		moreInfoButton.text("Info");
		moreInfoButton.attr("data-toggle", "modal");
		moreInfoButton.attr("data-target", "#exampleModalLong");
		removeButton.text("Remove for Good");
		likeButton.text("Move to Likes");
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
