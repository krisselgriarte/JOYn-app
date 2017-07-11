// Firebase link
var db = firebase.database();

// Empty array to house yes lists
var yesList = [];

// Variables for DB childs
var users;
var events;

// Variables for event information
var eventName, eventLong, eventLat, eventDesc, eventDir;

// Variable that stores yesList UIDs
var yesUIDArr = [];

// Store events object
var eventsObj;

var store;

// TODO: Need to fix how the yesList erases when page is reloaded
function storeUserInfo(response) {
    // Console logs AJAX call response
    console.log(response);

    // DB variables for child: users
    var rootRef = firebase.database().ref();
    var userRef = rootRef.child('users');
    var currUserUID = firebase.auth().currentUser.uid;
    var userRefChild = userRef.child(currUserUID);

    // DB variables for child: events.
    var activityRef = rootRef.child('events');

    // Stores data for DB users yesList
    userRefChild.once("value", function(snapshot) {
        var data = snapshot.val().yesList;
        yesList = data;
    })

    // Stores events object in Firebase DB
    activityRef.once("value", function(snapshot) {
        var data = snapshot.val();
        // console.log(data);
        eventsObj = data;
    })

    $(".btn-yes").on("click", function (event) {
        // Variables initialized
        var isYesListValid = true;
        var isYesUIDArrValid = true;

        // DB variables for child: events
        var currUserEmail = firebase.auth().currentUser.email;
        var currEventID = $(this).parent()[0].attributes[5].value;
        var activityRef = rootRef.child('events');
        var activityRefChild = activityRef.child(currEventID);

        // Ensure that repeat UIDs are not entered in the yesUIDs DB array
        for (var i = 0; i < yesUIDArr.length; i++) {
            if (yesUIDArr[i] == currUserUID) {
                isYesUIDArrValid = false;
            }
        }

        // Pushes the UID that have selected yes for the current event
        if (isYesUIDArrValid) {

            console.log(currUserUID)
            console.log("initial " + yesUIDArr)
            for (var eventID in eventsObj) {
                eventID = currEventID;
                var store1 = eventsObj[eventID].yesUIDs;
                yesUIDArr = store1;
                console.log(yesUIDArr);
                
            }
            yesUIDArr.push(currUserUID);
        }

        // Ensures that repeat yes' are not logged in the yesList
        for (var i = 0; i < yesList.length; i++) {
            if (yesList[i] == $(this).parent()[0].attributes[5].value) {
                isYesListValid = false;
            };
        };

        // Pushes the yes activity ID to yesList arr if yes list is valid
        if (isYesListValid) {
            userRefChild.once("value", function(snapshot) {
                var data = snapshot.val().yesList;
                console.log(data);
                yesList = data;
            })

            yesList.push($(this).parent()[0].attributes[5].value);

            // Console logs unique activity ID that is entered in the db yesList
            console.log($(this).parent()[0].attributes[5].value + " has been entered into the db yesList for " + currUserEmail + ".");
        };

        // users DB gets updated with email and yesList
        userRefChild.update({
            email: currUserEmail,
            yesList: yesList
        });

        // events DB gets updated with event information and UIDs that have selected yes for that specific event
        activityRefChild.update({
            eventName: $(this).parent()[0].attributes.name.value,
            eventLong: $(this).parent()[0].attributes.lon.value,
            eventLat: $(this).parent()[0].attributes.lat.value,
            eventDesc: $(this).parent()[0].attributes.description.value,
            eventDir: $(this).parent()[0].attributes.directions.value,
            yesUIDs: yesUIDArr
        })
    });
};
