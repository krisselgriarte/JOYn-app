function chatFunc (){

		console.log($(this));
		//var dateStamp = moment().format('L');

		//$("#chatbox").append(dateStamp + "<hr>");

	 	$("#submitmsg").on("click", function(event){
			event.preventDefault();

			//Get the users message
			var inputValue = $("#usermsg").val().trim();

			//Get the users name
			var userName = firebase.auth().currentUser.name;

			//Get the date/time stamp
			var dateTime = moment().format('L LT');

			console.log(dateTime);

			


			//$("#chatbox").append("<br>" + "(" + userName + " [" + dateTime + "] " + ")" + ": " + inputValue + "<br>");
			$("#chatbox").animate({ scrollTop: $(document).height() }, "slow");

			var chatsMessages;
			var time, message, username;

            var rootRef = firebase.database().ref();
            var chatRef = rootRef.child("chat");
			// var currentEventID = 1; 
			// var chatRefChild = chatRef.child(currentEventID);
			
			//var eventRef = chatRef.child("eventChats");
			//var chatMessages = ref.child("chat");

			// chatRefChild.push({
			// 	time: dateTime,
			// 	message: inputValue,
			// 	username: userName
			// });

			//database.ref().push(chatMessages);
		});
};