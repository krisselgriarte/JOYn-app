$(".resultsContainer").on("click", ".btn-yes", function() {
	var divToChange = $(this).parent();
	divToChange.slideUp("slow", function() { divToChange.remove();});
})

$(".resultsContainer").on("click", ".btn-no", function() {
	var divToChange = $(this).parent();
	divToChange.slideUp("slow", function() { divToChange.remove();});
})