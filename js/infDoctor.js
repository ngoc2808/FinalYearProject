// infDoctor.js

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
    console.log("Firebase initialized successfully!");

    // Reference to the specific doctor node in the database
    const database = firebase.database();
    const doctorRef = database.ref('users');
    const tbody = document.getElementById('tbody');
    

    // Listen for changes in the data
    doctorRef.on('value', function (snapshot) {
        // Clear existing rows in tbody
        tbody.innerHTML = '';

        // Loop through the doctors in the snapshot
        snapshot.forEach(function (doctorSnapshot) {
            const doctorData = doctorSnapshot.val();

            // Create a new row in the table
            const row = tbody.insertRow();

            // Create cells for each piece of data
            const emailCell = row.insertCell(0);
            const passwordCell = row.insertCell(1);
            const registrationStatusCell = row.insertCell(2);

            // Populate the cells with data
            emailCell.innerHTML = '<div class="text-sm font-medium text-gray-900" onclick="redirectToDetails(\'' + doctorSnapshot.key + '\')">' + (doctorData.email || '')  + '</div>';

            passwordCell.innerHTML = '<span class="text-sm text-gray-500">' + (doctorData.password || '') + '</span>';
            // Set condition for registerStatus color
            const status = doctorData.registrationStatus || '';
            if (status.toLowerCase() === 'pending') {
                registrationStatusCell.innerHTML = '<span class=" inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">' + status + '</span>';
            } else if (status.toLowerCase() === 'approved') {
                registrationStatusCell.innerHTML = '<span class="inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">' + status + '</span>';
            } else {
                // Default case, you can add more conditions if needed
                registrationStatusCell.textContent = status;
            }

        });
    });
});

// Function to redirect to detailsDoctor.html with the doctor ID
function redirectToDetails(doctorId) {
    window.location.href = 'detailsDoctor.html?id=' + doctorId;
}
