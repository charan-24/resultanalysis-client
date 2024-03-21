import React, { useEffect, useState } from 'react';
import PerformanceGraph from './PerformanceGraph';
import RatingsChart from './RatingsChart';
import DonutChart from './DonutChart';
import UserInfo from './UserProfileInfo';
import BarChart from './BarChart';
import Navbar from '../../layouts/navbar';
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MyProfile = () => {
  const [userData,setUserData] = useState({});
  const [donutData,setDonutData] = useState([]);
  const [ratingsData,setRatingsData] = useState([]);
  const [totalScoreData,setTotalScoreData] = useState([]);
  const [problems,setProblems] = useState([]);
  const [contests,setContest] = useState([]);
  const { rollno } = useParams(); 
  const {auth} = useAuth();
  
  console.log(auth);

  const roll = rollno || auth.rollno;

  const getScores = async () => {
    await axios.get('http://localhost:5000/score/getIndScore/'+roll)
                                .then(res=>{
                                    console.log(res.data);
                                    let temp = Object.values(res.data.scoreObj);
                                    // console.log(temp);
                                    setDonutData([...temp.slice(0,6)]);
                                    setRatingsData([...temp.slice(6,9)]);
                                    setTotalScoreData([res.data.total]);
                                    setProblems([...temp.slice(9,15)]);
                                    setContest([...temp.slice(15,21)]);
                                    setUserData({
                                      fullname: res.data.fullname.replace(/(\w)(\w*)/g,
                                      function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();}),
                                      rollno: res.data.rollno,
                                      total: res.data.total
                                    });                                                    
                                })
                                .catch(err=>{
                                    console.error(err);
                                })
  }

  useEffect(()=>{
    getScores();
  },[])

  return (
    <div>
      <Navbar />
        <div className='lg:grid lg:grid-cols-12 lg:gap-3'>
          <div className='lg:col-span-2 border-r-2 border-gray-300'>
            <UserInfo user={userData}/>
          </div>
          <div className='lg:col-span-10'>
            <div className='block'>
              <DonutChart donutData={donutData}/>
            </div>  
            <hr className='my-4'/>
            <div className='lg:w-1/2 mx-auto'>
              <BarChart problems={problems} contests={contests}/>
            </div>        
            <div className='w-full lg:w-3/4 mx-auto'> 
              <RatingsChart ratings={ratingsData}/>
            </div>
            <hr className='my-4'/>        
            <div className='w-full lg:w-3/4 mx-auto'> 
              <PerformanceGraph totalScores={totalScoreData}/>
            </div>
          </div>
        </div>  
    </div>
  );
};

export default MyProfile;

