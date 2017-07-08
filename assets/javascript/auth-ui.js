// FirebaseUI configuration
var uiConfig = {
    callbacks: {
        signInSuccess: function(currentUser, credential, redirectURL) {
            return true;
        },
        uiShown: function() {
            // document.getElementById("loader").style.display = 'none';
        }
    },
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
    queryParameterForWidgetMode: 'mode',
    queryParameterForSignInSuccessURL: 'signInSuccessUrl',
    signInFlow: 'popup',
    // TODO: Link the success URL
    signInSuccessUrl: 'locationSelect.html',
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

