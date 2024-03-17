import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; 

const RatingsChart = ({ratings}) => {
  
  const data = {
    labels: [
      'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10',
      'Week 11', 'Week 12', 'Week 13', 'Week 14', 'Week 15', 'Week 16', 'Week 17', 'Week 18', 'Week 19', 'Week 20',
      'Week 21', 'Week 22', 'Week 23', 'Week 24', 'Week 25', 'Week 26', 'Week 27', 'Week 28', 'Week 29', 'Week 30'    
    ],
    datasets: [
      {
        label: 'LeetCode',
        lineTension: 0.1,
        borderColor: 'yellow',
        pointBackgroundColor: "yellow",
        data: [
          300, 320, 350, 380, 400, 410, 420, 430, 440, 450,         
          1000, 1100, 1200, 1300, 1350, 1400, 1450, 1500, 1600, 1650,
          1700, 1800, 1800, 1900, 3000, 3500, 4000, 4500, 4600, 4650,
          4700, 4800, 4900,5000, 5200, 5300, 5400, 5450,5500, 5600,
          
        ], 
      },
      {
        label: 'CodeChef',
        lineTension: 0.1,
        borderColor: 'brown',
        pointBackgroundColor: "brown",
        data: [
          300, 320, 350, 380, 400, 410, 420, 430, 440, 450,
          450, 430, 420, 480, 500,510, 520, 530, 540, 550,         
          580, 600, 650, 655, 700, 720, 800, 850, 900, 1000, 
          4700, 4800, 4900,5000, 5200, 5300, 5400, 5450,5500, 5600,
          
        ], 
      },
      {
        label: 'CodeForces',
        lineTension: 0.1,
        pointBackgroundColor: "red",
        borderColor: 'red',
        data: [
          300, 320, 350, 380, 400, 410, 420, 430, 440, 450,
          4700, 4800, 4900,5000, 5200, 5300, 5400, 5450,5500, 5600,
          
        ], 
      }
    ],
  };

  const options = {
    layout:{
      padding:0,
    },
    plugins: {
      legend:{
          display:true
      }
    },
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2 className="md:text-xl font-bold my-4 text-center underline">Contest Ratings </h2>
      <Line data={data} options={options}/>
    </div>
  );
};

export default RatingsChart;

