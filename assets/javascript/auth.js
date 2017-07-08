// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDmkNfu3zs5JquSYqV35VL4CkqAix2IJBQ",
    authDomain: "joyn-app-be5f6.firebaseapp.com",
    databaseURL: "https://joyn-app-be5f6.firebaseio.com",
    projectId: "joyn-app-be5f6",
    storageBucket: "joyn-app-be5f6.appspot.com",
    messagingSenderId: "234786048991"
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