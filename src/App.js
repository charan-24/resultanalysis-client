import './App.css';
import Login from './pages/login/login';
import MyProfile from './pages/myProfile/myProfile';
import CodingProfiles from './pages/register/codingProfiles';
import LeaderBoard from './pages/leaderboard/leaderboard';
import MyAccount from './pages/myAccount/myAccount';
import Contactus from './layouts/contactus';
import Dashboard from './pages/dashboard/dashboard';
import Register from './pages/register/register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { Switch } from 'react-router';

function App() {

  return (
    <div >
      
      <Router>
        {/* <Navbar /> */}
        <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/my-profile' element={<MyProfile />}/>
            <Route path='/coding-profiles' element={<CodingProfiles/>}/>
            <Route path='/leaderboard' element={<LeaderBoard />}/>
            <Route path='/my-account' element={<MyAccount />}/>
            <Route path='/contact-us' element={<Contactus />}/>
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>       
      </Router>
    </div>
  );
}

export default App;
