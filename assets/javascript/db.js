var db = firebase.database();

var email = "";
var uniqueID = "";
var yesList = [];
var users = {
    name: email,
    userID: uniqueID,
    yesList: yesList,
}


function storage(response) {
    $(".btn-yes").on("click", function (event) {
        users.name = firebase.auth().currentUser.email;
        users.userID = firebase.auth().currentUser.uid;

        var isValid = true;
        // db.ref().on("child_added", function (snapshot) {

        for (var i = 0; i < yesList.length; i++) {
            if (yesList[i] == $(this).parent()[0].attributes[5].value) {
                isValid = false;
            }
        }

        if (isValid) {
            yesList.push($(this).parent()[0].attributes[5].value);
            db.ref().push(users);
        }
    });
}
