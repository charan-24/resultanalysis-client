import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DonutChart = () => {
  const data = {
    labels: ['Hackerrank', 'CodeChef', 'Codeforces', 'LeetCode'],
    datasets: [
      {
        data: [300, 450, 200, 600],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
      },
    ],
  };

  const options = {
    layout:{
      padding:0,
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
    },
    circumference: 360,
    radius:70,
  };

  const legendColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'];

  return (
    <div className='block'>
        <h2 className="md:text-xl font-bold text-center my-4 underline">Across platforms</h2>
        <div className="lg:flex lg:flex-row">
          <div className="">
            <Doughnut data={data} options={options} />
          </div>
          <div className="ml-4">
            {data.labels.map((label, index) => (
              <div key={label} className="flex items-center mb-2">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: legendColors[index] }}
                ></div>
                <span>{label}</span>
              </div>
            ))}
          </div>
       </div>
    </div>   
  );
};

export default DonutChart;

