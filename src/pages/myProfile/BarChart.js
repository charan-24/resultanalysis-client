import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Ensure this line is included

const BarChart = ({problems, contests}) => {
  const data = {
    labels: ['HackerRank', 'LeetCode', 'CodeChef', 'CodeForces', 'Spoj', 'InterviewBit'],
    datasets: [
      {
        label: 'Problems solved',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: Object.values(problems),
      },
      {
        label: 'No.of Contests',
        backgroundColor: 'red',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: Object.values(contests),
      },
    ],
  };

  const options = {
    plugins: {
      legend:{
          display:true
      }
    },
    scales: {
      x: {
        type: 'category', // Use 'category' for days of the week
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2 className="md:text-xl font-bold my-4 text-center underline">Participation Across Platforms</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
