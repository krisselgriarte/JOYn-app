// Firebase link
var db = firebase.database();

// Variables for event information
var eventName, eventLong, eventLat, eventDesc, eventDir;

// TODO: Need to fix how the yesList erases when page is reloaded
function storeUserInfo(response) {
    // Console logs AJAX call response
    console.log(response);

    // DB variables for child: users
    var rootRef = firebase.database().ref();
    var userRef = rootRef.child('users');
    var currUserUID = firebase.auth().currentUser.uid;
    var userRefChild = userRef.child(currUserUID);
    var emailRef = userRefChild.child('email');
    var yesListRef = userRefChild.child('yesList');

    $(".btn-yes").on("click", function (event) {
        var eventRef = yesListRef.child($(this).parent()[0].attributes[5].value);

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
    var userId = firebase.auth().currentUser.uid;
    var rootRef = firebase.database().ref();
    var userRef = rootRef.child('users');
    var currYesListRef = userRef.child(userId);

    currYesListRef.on('value', function(snapshot) {
        yesListObj = snapshot.val();
        console.log(yesListObj);
    });
}