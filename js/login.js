

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

// auth.js

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Sign in with Firebase
    firebase.auth().signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            console.log('User signed in:', user);

            // Notify user about successful login
            notifyUser('Login successful!', 'success');

            // Redirect to index.html after successful sign-in
            window.location.href = 'index.html';
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Sign-in error: ${errorCode} - ${errorMessage}`);

            // Notify user about login failure
            notifyUser('Login failed. Please check your username and password.', 'error');
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
