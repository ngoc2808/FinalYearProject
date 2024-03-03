// detailsDoc.js

document.addEventListener('DOMContentLoaded', function () {
    // Firebase configuration (initializeApp is available globally)
    const firebaseConfig = {
        apiKey: "AIzaSyDqrdp452AslvbGJCALM6Mz_q_ZxoVd5y4",
        authDomain: "fir-has-8cdb5.firebaseapp.com",
        databaseURL: "https://fir-has-8cdb5-default-rtdb.firebaseio.com",
        projectId: "fir-has-8cdb5",
        storageBucket: "fir-has-8cdb5.appspot.com",
        messagingSenderId: "494020923569",
        appId: "1:494020923569:web:e26770eb2c10db1a0f9290",
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Reference to the specific doctor node in the database
    const database = firebase.database();
    const doctorRef = database.ref('users');

    // Get the doctor ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get('id');

    // Get reference to the HTML elements

    const emailElement = document.getElementById('textEmail');
    const passwordElement = document.getElementById('password');

    // Fetch data for the specific doctor
    doctorRef.child(doctorId).once('value', function (snapshot) {
        const doctorData = snapshot.val();

        // Update the HTML elements with the retrieved data
        emailElement.value = doctorData.email || '';
        passwordElement.value = doctorData.password || '';
    });
});
