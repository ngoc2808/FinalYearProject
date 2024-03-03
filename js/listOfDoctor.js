// Initialize Firebase with your configuration
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
  
  // Reference to the "Doctor" node in the database
  const database = firebase.database();
  const doctorRef = database.ref('users');
  
  // Function to fetch doctors and populate the table
  const fetchDoctors = () => {
    doctorRef.once('value')
      .then(snapshot => {
        console.log('Snapshot:', snapshot.val()); // Log the entire snapshot
        const tbody = document.getElementById('tbody');
  
        // Clear existing rows
        tbody.innerHTML = '';
  
        snapshot.forEach(doctorSnapshot => {
          // Access the details of each doctor
          const doctorData = doctorSnapshot.val();
  
          console.log('Doctor Data:', doctorData); // Log the doctorData
  
          // Only display doctors with statusRegister set to "approved"
          if (doctorData.registerStatus === 'approved') {
            // Create a new row
            const row = document.createElement('tr');
  
            // Create and append cells for each column
            const emailCell = document.createElement('td');
            emailCell.textContent = doctorData.email;
            row.appendChild(emailCell);
  
            const fullNameCell = document.createElement('td');
            fullNameCell.textContent = doctorData.fullname; // Use 'fullname' instead of 'fullName'
            row.appendChild(fullNameCell);
  
  
            // Append the row to the tbody
            tbody.appendChild(row);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  };
  
  // Call the fetchDoctors function when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    fetchDoctors();
  });
  