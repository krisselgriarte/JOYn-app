var db = firebase.database();

var email = "";
var uniqueID = "";
var yesList = [];
var users = {
    name: email,
    userID: uniqueID,
    yesList: yesList,
}


$("#btn-test").on("click", function (event) {
    users.name = firebase.auth().currentUser.email;
    users.userID = firebase.auth().currentUser.uid;
    db.ref().push(users);
});
