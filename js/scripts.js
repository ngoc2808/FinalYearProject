// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Firebase
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

  // Function to fetch the count of doctors and update the HTML
  const countDoctors = () => {
    doctorRef.once('value')
      .then(snapshot => {
        const doctorCount = snapshot.numChildren();
        console.log('Doctor count:', doctorCount); // Log the count to the console
  
        // Update the doctorCount on the HTML element
        const doctorCountElement = document.getElementById('doctorCount');
        doctorCountElement.innerText = doctorCount;
  
        // After fetching data, render the charts
        renderCharts();
      })
      .catch(error => {
        console.error('Error fetching doctor count:', error);
      });
  };

  // Function to render the charts
  const renderCharts = () => {
    // Bar Chart
    var barChartOptions = {
      chart: {
        type: 'bar',
      },
      series: [{
        name: 'Doctors',
        data: [/* Your bar chart data array goes here */],
      }],
    };

    var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
    barChart.render();

    // Area Chart
    var areaChartOptions = {
      chart: {
        type: 'area',
      },
      series: [{
        name: 'Appointments',
        data: [/* Your area chart data array goes here */],
      }],
    };

    var areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
    areaChart.render();
  };

  // Sidebar toggle 
  var sidebarOpen = false;
  var sidebar = document.getElementById("sidebar");

  function openSidebar() {
    if (!sidebarOpen) {
      sidebar.classList.add("sidebar-responsive");
      sidebarOpen = true;
    }
  }

  function closeSidebar() {
    if (!sidebarOpen) {
      sidebar.classList.remove("sidebar-responsive");
      sidebarOpen = false;
    }
  }

  // Call the countDoctors function when the DOM is fully loaded
  countDoctors();
});
