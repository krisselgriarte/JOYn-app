// Variables for event information
var eventName, eventLong, eventLat, eventDesc, eventDir;
var userId = firebase.auth().currentUser.uid;
var dbRef = firebase.database().ref().child('users').child(userId);

// Stores user information
function storeUserInfo() {
    // Variables: Firebase access
    var rootRef = firebase.database().ref();
    var userRef = rootRef.child('users');
    var currUserUID = firebase.auth().currentUser.uid;
    var userRefChild = userRef.child(currUserUID);
    var emailRef = userRefChild.child('email');
    var yesListRef = userRefChild.child('yesList');
    var noListRef = userRefChild.child('noList');

    // Functionality for the yes button
    $(".btn-yes").on("click", function (event) {
        // Variable: Store unique event ID
        var eventRef = yesListRef.child($(this).parent()[0].attributes[5].value);

        // Sets the information for the events
        eventRef.set({
            eventName: $(this).parent()[0].attributes.name.value,
            eventLong: $(this).parent()[0].attributes.lon.value,
            eventLat: $(this).parent()[0].attributes.lat.value,
            eventDesc: $(this).parent()[0].attributes.description.value,
            eventDir: $(this).parent()[0].attributes.directions.value,
        })
    });

    // Functionality for the no button
    $(".btn-no").on("click", function (event) {
        // Variable: Store unique event ID
        var eventRef = noListRef.child($(this).parent()[0].attributes[5].value);

        // Sets the information for the events
        eventRef.set({
            eventName: $(this).parent()[0].attributes.name.value,
            eventLong: $(this).parent()[0].attributes.lon.value,
            eventLat: $(this).parent()[0].attributes.lat.value,
            eventDesc: $(this).parent()[0].attributes.description.value,
            eventDir: $(this).parent()[0].attributes.directions.value,
        })
    });
};

// Function that gets yes list from Firebase
function getYesList(dbRef) {
    // Gets snapshot from firebase
    dbRef.on('value', function(snapshot) {
        // Stores yes list from Firebase
        var yesListSnapObj = snapshot.val().yesList;
        console.log(yesListSnapObj);
        return yesListSnapObj;
    });
}


// Function that gets no list from Firebase
function getNoList(dbRef) {
    // Gets snapshot from firebase
    dbRef.on('value', function(snapshot) {
        // Stores yes list from Firebase
        var noListSnapObj = snapshot.val().noList;
        console.log(noListSnapObj);
        return noListSnapObj;
    });
}