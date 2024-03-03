document.addEventListener('DOMContentLoaded', async function () {
    // Firebase configuration
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

    try {
        // Wait for Firebase to be fully initialized
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Add an authentication state change listener
        firebase.auth().onAuthStateChanged(async function (user) {
            if (user) {
                console.log("Authenticated user UID:", user.uid);

                const database = firebase.database();
                const userSchedulesRef = database.ref('user_schedules');
                const tbody = document.getElementById('tbody');

                const fetchData = () => {
                    return new Promise((resolve) => {
                        userSchedulesRef.once('value', (snapshot) => {
                            resolve(snapshot.val());
                        }, (error) => {
                            console.error("Error fetching data:", error);
                        });
                    });
                };

                const data = await fetchData();

                // Clear existing rows in tbody
                tbody.innerHTML = '';

                // Loop through the user_schedules and display each UID with status
                Object.keys(data).forEach(uid => {
                    // Create a new row for each UID
                    const row = tbody.insertRow();

                    // Create cells for the UID and status
                    const uidCell = row.insertCell(0);
                    const statusCell = row.insertCell(1);

                    // Set the inner HTML of cells
                    uidCell.innerHTML = `<span class="uid-link" data-uid="${uid}">${uid}</span>`;
                    
                    // Set the status to "confirm" and add custom styling
                    statusCell.innerHTML = '<span class="inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Confirm</span>';
                });

                // Add click event listener to each UID link
                const uidLinks = document.querySelectorAll('.uid-link');
                uidLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        const selectedUid = link.dataset.uid;
                        // Redirect to checkSchedule.html with UID parameter
                        window.location.href = `checkSchedule.html?uid=${selectedUid}`;
                    });
                });
            } else {
                console.error("User not authenticated.");
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});
