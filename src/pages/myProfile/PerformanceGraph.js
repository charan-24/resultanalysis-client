import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; 

const PerformanceGraph = ({totalScores}) => {

  const data = {
    labels: [
      'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10',
      'Day 11', 'Day 12', 'Day 13', 'Day 14', 'Day 15', 'Day 16', 'Day 17', 'Day 18', 'Day 19', 'Day 20',
      'Day 21', 'Day 22', 'Day 23', 'Day 24', 'Day 25', 'Day 26', 'Day 27', 'Day 28', 'Day 29', 'Day 30'    
    ],
    
    datasets: [
      {
        label: 'Monthly Performance',
        fill: false,
        lineTension: 0.1,
        pointBackgroundColor:"orange",        
        borderColor: 'orange',
        data: [
          300, 320, 350, 380, 400, 410, 420, 430, 440, 450,
          450, 430, 420, 480, 500,510, 520, 530, 540, 550,         
          580, 600, 650, 655, 700, 720, 800, 850, 900, 1000, 
          1000, 1100, 1200, 1300, 1350, 1400, 1450, 1500, 1600, 1650,
          1700, 1800, 1800, 1900, 3000, 3500, 4000, 4500, 4600, 4650,
          4700, 4800, 4900,5000, 5200, 5300, 5400, 5450,5500, 5600,
          
        ], 
      },
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
      <h2 className="md:text-xl font-bold my-4 text-center underline">OverAll Performance </h2>
      <Line data={data} options={options}/>
    </div>
  );
};

export default PerformanceGraph;

