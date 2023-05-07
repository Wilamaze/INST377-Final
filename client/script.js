// Defining a variable and setting it to null in order to delete chart.
let myChart = null;

// deleteChart function in order to check if chart exists and delets the instance of it. 
function deleteChart() {
  if (myChart) {
    myChart.destroy();
  }
}

// sending a request to spacex api
async function getData() {
  if (localStorage.getItem('spacexData')) {
    return JSON.parse(localStorage.getItem('spacexData'));
  }

  const results = await fetch('https://api.spacexdata.com/v4/launches');
  const data = await results.json();

  localStorage.setItem('spacexData', JSON.stringify(data));
  return data;
}

// event listener to getDataButton
getDataButton.addEventListener('click', async function() {
  // call getData and store the received data.
  const newData = await getData();
  localStorage.setItem('spacexData', JSON.stringify(newData));
  alert('Data received');
});

// creating the chart to display data 
async function createChart() {
  const data = await getData();
  let newData = data;

  // defining the count variables for missions
  let successCount = 0;
  let failureCount = 0;

  const successCheckbox = document.getElementsByName("success")[0];
  const failureCheckbox = document.getElementsByName("failure")[0];
  const showSuccess = successCheckbox.checked;
  const showFailure = failureCheckbox.checked;

  // check through the data of the failure and successful missions and counting each to show data.
  data.forEach(mission => {
    if (mission.success) {
      if (showSuccess) {
        successCount++;
      }
    } else {
      if (showFailure) {
        failureCount++;
      }
    }
  });

  
  // creating the pie chart data object
  const chartData = {
    labels: ['Successful Mission', 'Mission Failure'],
    datasets: [{
      data: [successCount, failureCount],
      backgroundColor: ['#9BB39C', '#F67B7B']
    }]
  };

  // configuring the pie chart object
  const pieConfig = {
    type: 'pie',
    data: chartData,
    options: {
      responsive: false,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'SpaceX Launch Success/Failure Chart' }
      }
    }
  };

  // if deleteChart doesn't work, this will check for it again and delete it.
  if (myChart !== null) {
    myChart.destroy();
  }

  // Creating aa new chart object and assign it to 'myChart'
  myChart = new Chart(document.getElementById('myChart'), pieConfig);
}


