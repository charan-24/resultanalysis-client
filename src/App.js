import './App.css';
import UserLogin from './pages/login/userLogin';
import AdminLogin from './pages/login/adminLogin';
import MyProfile from './pages/myProfile/myProfile';
import CodingProfiles from './pages/register/codingProfiles';
import LeaderBoard from './pages/leaderboard/leaderboard';
import MyAccount from './pages/myAccount/myAccount';
import Contactus from './layouts/contactus';
import Dashboard from './pages/dashboard/dashboard';
import Register from './pages/register/register';
import RequireAuth from './layouts/RequireAuth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { useEffect } from 'react';


function App() {

  const {setAuth} = useAuth();

  const handleDataPersistance = ()=> {
    if(sessionStorage.length>=1){
      setAuth({"rollno":sessionStorage.getItem("rollno"),
                                "fullname":sessionStorage.getItem("fullname"),
                                "role":sessionStorage.getItem("role"),
                                "accessToken":sessionStorage.getItem("accessToken"),
      });
    }
  }

  useEffect(()=>{
    handleDataPersistance();
  },[]);

  return (
    <div >
      <Router>
        {/* <Navbar /> */}
        <Routes>
            {/* //public routes */}
            <Route path='/' element={<UserLogin />}/>
            <Route path='/adminLogin' element={<AdminLogin />}/>
            <Route path='/register' element={<Register />}/>

            {/* Only Students */}
            <Route element={<RequireAuth />}>
              <Route path='/my-profile/:rollno' element={<MyProfile />}/>
              <Route path='/coding-profiles' element={<CodingProfiles/>}/>
              <Route path='/leaderboard' element={<Contactus/>}/>
              <Route path='/leaderboard/:batchname' element={<LeaderBoard />} />
              <Route path='/my-account' element={<MyAccount />}/>
              <Route path='/contact-us' element={<Contactus />} />
            </Route>
            {/* Only Admin */}
            {/* <Route path='/dashboard' element={<Dashboard />} /> */}
            <Route element={<RequireAuth />}>
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
        </Routes>       
      </Router>
    </div>
  );
}

export default App;
