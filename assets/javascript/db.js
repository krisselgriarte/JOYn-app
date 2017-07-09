var db = firebase.database();

// Empty array to house yes lists
var yesList = [];

// TODO: Need to fix how the yesList erases when page is reloaded
function storage(response) {
    $(".btn-yes").on("click", function (event) {
        // Variables
        var isEmailValid = true;
        var isYesListValid = true;
        var currentUserEmail = firebase.auth().currentUser.email;
        var currentUserUID = firebase.auth().currentUser.uid;
        var rootRef = firebase.database().ref();
        var secRef = rootRef.child('users');
        var thirdRef = secRef.child(currentUserUID)

        // Ensures that repeat yes' are not logged in the yesList
        for (var i = 0; i < yesList.length; i++) {
            if (yesList[i] == $(this).parent()[0].attributes[5].value) {
                isYesListValid = false;
            };
        };

        // Pushes the yes activity ID to yesList arr if yes list is valid
        if (isYesListValid) {
            yesList.push($(this).parent()[0].attributes[5].value);
            console.log($(this).parent()[0].attributes[5].value)
        };

        // Sets values into Firebase DB
        thirdRef.set({
            email: currentUserEmail,
            yesList: yesList
        });
    });
};
