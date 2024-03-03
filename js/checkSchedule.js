document.addEventListener('DOMContentLoaded', function () {
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

    const database = firebase.database();
    const userSchedulesRef = database.ref('user_schedules');
    const scheduleDetails = document.getElementById('scheduleDetails');

    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid');

    if (uid) {
        userSchedulesRef.child(uid).once('value', function (snapshot) {
            const scheduleData = snapshot.val();

            if (scheduleData) {
                // Display schedule details
                let detailsHTML = `<p>UID: ${uid}</p>`;

                // Loop through each UID in scheduleData
                Object.entries(scheduleData).forEach(([uid, nestedData]) => {
                    detailsHTML += `<hr><p>UID: ${uid}</p>`;

                    // Check if nestedData is an object with email, fullDateTime, and fullName properties
                    if (nestedData && typeof nestedData === 'object') {
                        detailsHTML += `<p>Email: ${nestedData.email}</p>`;
                        detailsHTML += `<p>Full Date Time: ${nestedData.fullDateTime}</p>`;
                        detailsHTML += `<p>Full Name: ${nestedData.fullName}</p>`;

                        // Display cancellation reason if available
                        if (nestedData.cancellationReason && nestedData.cancellationReason.trim() !== 'User-provided reason') {
                            detailsHTML += `<p>Cancellation Reason: <span class="cancellation-reason">${nestedData.cancellationReason}</span></p>`;
                        } else {
                            detailsHTML += '<p>No cancellation reason provided or User-provided reason</p>';
                        }
                    } else if (Array.isArray(nestedData)) {
                        // Handle the case where nestedData is an array
                        nestedData.forEach((item, index) => {
                            detailsHTML += `<p>${uid} ${index + 1}:</p>`;

                            // Loop through specified properties in the item
                            ['email', 'fullDateTime', 'fullName', 'cancellationReason'].forEach((property) => {
                                if (item[property]) {
                                    detailsHTML += `<p>${property}: ${item[property]}</p>`;
                                }
                            });
                        });
                    } else {
                        detailsHTML += '<p>No data found</p>';
                    }
                });

                scheduleDetails.innerHTML = detailsHTML;

                // Add event listener to the cancellation reason
                const cancellationReasonElement = document.querySelector('.cancellation-reason');
                if (cancellationReasonElement) {
                    cancellationReasonElement.addEventListener('click', function () {
                        alert(`Cancellation Reason: ${nestedData.cancellationReason}`);
                    });
                }
            } else {
                scheduleDetails.innerHTML = '<p>Schedule not found</p>';
            }
        });
    } else {
        scheduleDetails.innerHTML = '<p>Invalid UID</p>';
    }
});
