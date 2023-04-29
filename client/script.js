// sending a get request to spacex api
async function getData() {
    try {
      const response = await fetch('https://api.spacexdata.com/v4/launches');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  
  // Creating pie chart function
  async function createChart() {
    try {
      const data = await getData();
      let successCount = 0;
      let failureCount = 0;
      data.forEach(mission => {
        if (mission.success) {
          successCount++;
        } else {
          failureCount++;
        }
      });

      // Creating the pie chart data object
      const chartData = {
        labels: ['Successful Mission', 'Mission Failure'],
        datasets: [{
            // data is the successful and failing missions 
          data: [successCount, failureCount],
          backgroundColor: ['#9BB39C', '#F67B7B']
        }]
      };

      // Creating Pie Chart configurating object
      const pieConfig = {
        type: 'pie',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'SpaceX Launch Success/Failure Chart'
            }
          }
        }
      };
      new Chart(document.getElementById('myChart'), pieConfig);
      // log errors to console.
    } catch (error) {
      console.log(error);
    }
  }