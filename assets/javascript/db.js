// Variables for event information
var eventName, eventLong, eventLat, eventDesc, eventDir;

// TODO: Need to fix how the yesList erases when page is reloaded
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
};

function getYesList() {
    // Variables: Firebase access
    var userId = firebase.auth().currentUser.uid;
    var rootRef = firebase.database().ref();
    var userRef = rootRef.child('users');
    var currYesListRef = userRef.child(userId);

    currYesListRef.on('value', function(snapshot) {
        // Stores yes list from Firebase
        var yesListSnapObj = snapshot.val();
        console.log(yesListSnapObj);
        return yesListSnapObj;
    });
}