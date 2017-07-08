function createResultsFromAjax (arr) {
	for (var i = 0; i < arr.length; i++) {
		var resultDiv = $("<div class='resultDiv'>");
		var likeButton = $("<button class='btn-yes'>");
		var dislikeButton = $("<button class='btn-no'>");
		var moreInfoButton = $("<button class='btn-info'>");
		var resultDivName = $("<p>");
		moreInfoButton.text("Info");
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