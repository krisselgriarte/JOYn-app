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

// FirebaseUI configuration
var uiConfig = {
    callbacks: {
        signInSuccess: function(currentUser, credential, redirectURL) {
            return true;
        },
        uiShown: function() {
            document.getElementById("loader").style.display = 'none';
        }
    },
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
    queryParameterForWidgetMode: 'mode',
    queryParameterForSignInSuccessURL: 'signInSuccessUrl',
    signInFlow: 'popup',
    // TODO: Link the success URL
    signInSuccessUrl: '#',
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true
        },
        {
            provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            requireDisplayName: true
        }
    ],
    // TODO: Terms of service url.
    tosUrl: '<your-tos-url>'
};

// Initialize the FirebaseUI Widget using Firebase
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);

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