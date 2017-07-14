// Linked to: ajaxcall.js
// Stores user information
// Linked to: ajaxcall.js
function storeUserInfo() {
    // Variables: Firebase access
    var rootRef = firebase.database().ref();
    var userRef = rootRef.child('users');
    var currUserUID = firebase.auth().currentUser.uid;
    var userRefChild = userRef.child(currUserUID);
    var userInfoRef = userRefChild.child('userInfo');
    var yesListRef = userRefChild.child('yesList');
    var noListRef = userRefChild.child('noList');

    // Adds user information to Firebase primarily for ease of intrepreting db info
    userInfoRef.set({
        email: firebase.auth().currentUser.email,
        name: firebase.auth().currentUser.displayName
    })

    // Functionality for the yes button
    $(".btn-yes").on("click", function (event) {
        // Variable: Store unique event ID
        var eventID = $(this).parent()[0].attributes[5].value;
        var eventRef = yesListRef.child(eventID);

        // Sets the information for the events
        eventRef.set({
            eventName: $(this).parent()[0].attributes.name.value,
            eventLong: $(this).parent()[0].attributes.lon.value,
            eventLat: $(this).parent()[0].attributes.lat.value,
            eventDesc: $(this).parent()[0].attributes.description.value,
            eventDir: $(this).parent()[0].attributes.directions.value,
            eventType: $(this).parent()[0].attributes.activity_type_name.value,
            eventUID: eventID
        })
    });

    // Functionality for the no button
    $(".btn-no").on("click", function (event) {
        // Variable: Store unique event ID
        var eventID = $(this).parent()[0].attributes[5].value;
        var eventRef = noListRef.child(eventID);

        // Sets the information for the events
        eventRef.set({
            eventName: $(this).parent()[0].attributes.name.value,
            eventLong: $(this).parent()[0].attributes.lon.value,
            eventLat: $(this).parent()[0].attributes.lat.value,
            eventDesc: $(this).parent()[0].attributes.description.value,
            eventDir: $(this).parent()[0].attributes.directions.value,
            eventType: $(this).parent()[0].attributes.activity_type_name.value,
            eventUID: eventID
        })
    });
};

// Function that gets the yes list from Firebase
function getYesList() {
    var userId = firebase.auth().currentUser.uid;
    var rootRef = firebase.database().ref();
    var userRef = rootRef.child('users');
    var currYesListRef = userRef.child(userId);

    currYesListRef.on('value', function(snapshot) {
        // Stores yes list from Firebase
        var yesListObj = snapshot.val().yesList;
        if (yesListObj) {
        likeObjConvertToArray(yesListObj);
        } else {
            $(".populatedLikesDislikes").text("You haven't liked anything yet!");
            }
    });
} 

// Function that gets no list from Firebase
function getNoList() {
    var userId = firebase.auth().currentUser.uid;
    var rootRef = firebase.database().ref();
    var userRef = rootRef.child('users');
    var currNoListRef = userRef.child(userId);
    
    currNoListRef.on('value', function(snapshot) {
        // Stores no list from Firebase
        var noListSnapObj = snapshot.val().noList;
        if (noListSnapObj) {
            dislikeObjConvertToArray(noListSnapObj);
        } else {$(".populatedLikesDislikes").text("You haven't disliked anything yet!");
            }
    });
}

// Function that adds functionality for userActivityPage
function userActBtns() {
    // Variables: Firebase access
    var rootRef = firebase.database().ref();
    var userRef = rootRef.child('users');
    var chatRef = rootRef.child("chat");
    var currUserUID = firebase.auth().currentUser.uid;
    var currUsername = firebase.auth().currentUser.displayName;
    var userRefChild = userRef.child(currUserUID);
    var userInfoRef = userRefChild.child('userInfo');
    var yesListRef = userRefChild.child('yesList');
    var noListRef = userRefChild.child('noList');
    

    // Transfers event information from yes list to no list
    $(".populatedLikesDislikes").on("click", ".btn-no", function() {
        var eventRef = noListRef.child($(this).parent()[0].attributes[7].value);

        yesListRef.child($(this).parent()[0].attributes[7].value).remove();
        // Sets the information for the events
        eventRef.set({
            eventName: $(this).parent()[0].attributes[5].value,
            eventLong: $(this).parent()[0].attributes[4].value,
            eventLat: $(this).parent()[0].attributes[3].value,
            eventDesc: $(this).parent()[0].attributes[1].value,
            eventDir: $(this).parent()[0].attributes[2].value,
            eventType: $(this).parent()[0].attributes[6].value,
            eventUID: $(this).parent()[0].attributes[7].value
        });
    });

    // Transfers event information from no list to yes list
    $(".populatedLikesDislikes").on("click", ".btn-yes", function() {
        var eventRef = yesListRef.child($(this).parent()[0].attributes[7].value);

        noListRef.child($(this).parent()[0].attributes[7].value).remove();
        // Sets the information for the events
        eventRef.set({
            eventName: $(this).parent()[0].attributes[5].value,
            eventLong: $(this).parent()[0].attributes[4].value,
            eventLat: $(this).parent()[0].attributes[3].value,
            eventDesc: $(this).parent()[0].attributes[1].value,
            eventDir: $(this).parent()[0].attributes[2].value,
            eventType: $(this).parent()[0].attributes[6].value,
            eventUID: $(this).parent()[0].attributes[7].value
        });
    });

        // Transfers event information from no list to yes list
    $(".populatedLikesDislikes").on("click", ".btn-remove", function() {
        noListRef.child($(this).parent()[0].attributes[7].value).remove();
    });

    $(".populatedLikesDislikes").on("click", ".btn-chat", function() {
        console.log($(this));
        var eventRef = chatRef.child($(this).parent()[0].attributes[7].value);
        eventRef.off();
        eventRef.on("child_added", function(snapshot){
			var userName = snapshot.val().username;
			var dateTime = snapshot.val().time;
			var newMessage = snapshot.val().message;

			$("#chatbox").append("<br>" + "(" + userName + " [" + dateTime + "] " + ")" + ": " + newMessage + "<br>");
            
		});
        
	 	$("#submitmsg").on("click", function(event){
			event.preventDefault();

			//Get the users message
			var inputValue = $("#usermsg").val().trim();

			//Get the date/time stamp
			var dateTime = moment().format('L LT');

			console.log(dateTime);
            console.log(inputValue);
            console.log(currUsername)
			
			$("#chatbox").animate({ scrollTop: $(document).height() }, "slow");

			eventRef.push({
				time: dateTime,
				message: inputValue,
				username: currUsername
			});

            $("#submitmsg").empty();
		});
    });
}