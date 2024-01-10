import React from 'react';
import LineGraph from './LineGraph';
import BarGraph from './BarChart';
import DonutChart from './DonutChart';
import UserInfo from './UserProfileInfo';
import Navbar from '../../layouts/navbar';
const MyProfile = () => {

  const user = {
    name: 'Full Name',
    username: 'UserName',
    location: 'IN',
    overallScore: 17220,
    globalRank: 5121,
  };

  return (
    <div>
      <Navbar />
        <div className='lg:grid lg:grid-cols-12 lg:gap-3'>
          <div className='lg:col-span-2 border-r-2 border-gray-300'>
            <UserInfo user={user}/>
          </div>
          <div className='lg:col-span-10'>
            <div className='lg:grid lg:grid-cols-12'>
              <div className="lg:col-span-6">
                <BarGraph />
              </div>
              <div className='lg:col-span-6 flex items-center'>
                <DonutChart />
              </div>
            </div>  
            <hr className='my-4'/>        
            <div className='w-full lg:w-3/4 mx-auto'> 
              <LineGraph />
            </div>
          </div>
        </div>  
    </div>
  );
};

export default MyProfile;

