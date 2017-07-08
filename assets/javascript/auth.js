// Initialize Firebase
var config = {
    apiKey: "AIzaSyAb3pnEVMqut_OGvxbd0jLIpPU0zZN54fQ",
    authDomain: "joyn-84eb5.firebaseapp.com",
    databaseURL: "https://joyn-84eb5.firebaseio.com",
    projectId: "joyn-84eb5",
    storageBucket: "joyn-84eb5.appspot.com",
    messagingSenderId: "551198305678"
    };
firebase.initializeApp(config);

// Constants
const btnLogout = document.getElementById('btnLogout');

// DEVELOPER: Console logs the current user
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user.uid + " is logged in.");
        console.log(user.email);
    } else {
        console.log("No user is logged in.");
    }
});

// Function to log out user
btnLogout.addEventListener("click", function() {
    firebase.auth().signOut();
    console.log("signed out");
});