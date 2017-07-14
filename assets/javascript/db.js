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
        likeObjConvertToArray(yesListObj);
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
        dislikeObjConvertToArray(noListSnapObj);
    });
}

// Function that adds functionality for userActivityPage
function userActBtns() {
    // Variables: Firebase access
    var rootRef = firebase.database().ref();
    var userRef = rootRef.child('users');
    var currUserUID = firebase.auth().currentUser.uid;
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
}