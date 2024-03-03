// firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyDqrdp452AslvbGJCALM6Mz_q_ZxoVd5y4",
    authDomain: "fir-has-8cdb5.firebaseapp.com",
    databaseURL: "https://fir-has-8cdb5-default-rtdb.firebaseio.com",
    projectId: "fir-has-8cdb5",
    storageBucket: "fir-has-8cdb5.appspot.com",
    messagingSenderId: "494020923569",
    appId: "1:494020923569:web:e26770eb2c10db1a0f9290",
};

firebase.initializeApp(firebaseConfig);

// forgotPass.js
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;

    // Send password reset email
    firebase.auth().sendPasswordResetEmail(username)
        .then(() => {
            // Password reset email sent successfully
            console.log('Password reset email sent successfully.');

            // Notify user about the password reset email
            notifyUser('Password reset email sent successfully. Check your inbox.', 'success');

            // Redirect to login page or any other page
            window.location.href = 'login.html';
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Password reset error: ${errorCode} - ${errorMessage}`);

            // Notify user about the password reset failure
            notifyUser('Password reset failed. Please check your username and try again.', 'error');
        });
});

// Function to notify the user
function notifyUser(message, type) {
    // You can use a library like SweetAlert for a better notification experience
    // For simplicity, alert is used here
    if (type === 'success') {
        alert(message);
    } else if (type === 'error') {
        alert(message);
    }
}
