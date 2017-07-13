$(".resultsContainer").on("click", ".btn-yes", function() {
	var divToChange = $(this).parent();
	divToChange.slideUp("slow", function() { divToChange.remove();});
})

$(".resultsContainer").on("click", ".btn-no", function() {
	var divToChange = $(this).parent();
	divToChange.slideUp("slow", function() { divToChange.remove();});
})

$(".populatedLikesDislikes").on("click", ".btn-no", function() {
	var divToChange = $(this).parent();
	divToChange.slideUp("slow", function() { divToChange.remove();});
})

$(".populatedLikesDislikes").on("click", ".btn-remove", function() {
	var divToChange = $(this).parent();
	divToChange.slideUp("slow", function() { divToChange.remove();});
})

$(".populatedLikesDislikes").on("click", ".btn-yes", function() {
	var divToChange = $(this).parent();
	divToChange.slideUp("slow", function() { divToChange.remove();});
})