// Navbar.js
import React, { useState} from 'react';
import { Link,} from 'react-router-dom';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import useAuth from '../hooks/useAuth';
const Navbar = () => {

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [style,setStyle] = useState({});
  const {auth} = useAuth();
  const rollno = auth.rollno;
  const role = auth.role;
  const fullname = auth.fullname;
  console.log(fullname);
  const toggleDropdown = () => {
    if(!isDropdownOpen){
      setStyle({
        transform: 'rotate(180deg)',
        transition: 'transform 150ms ease',
      });
    }
    else{
      setStyle({
        transform: 'rotate(360deg)',
        transition: 'transform 150ms ease',
      });
    }
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (e) => {
    setStyle({
      transform: 'rotate(360deg)',
      transition: 'transform 150ms ease',
    });
    setDropdownOpen(false); 
  };

  return (
    <div className="bg-gray-800 text-white">    
      <div className="container  flex justify-between items-center py-4">
        <div className="flex items-center">
          <span className="ml-2 text-lg font-semibold sm:inline ">Dynamics</span>
        </div>

        <div className="dropdownmenu relative group bg-white text-black rounded mr-4 p-2" id='dropdownmeu' name="dropdownmenu" >
          {/* Hide on small devices */}
          <span className=" full_name hidden sm:inline cursor-pointer" id="full_name" name="full_name" onClick={toggleDropdown}>
            {fullname}
          </span>
          <button className="ml-2  mr-2 text-black focus:outline-none" id='dropdown' name="dropdown" onClick={toggleDropdown}>
            {<IoIosArrowDropdownCircle className='dropdown text-[20px]' style={style}/>}
          </button>
          <div className={`absolute ${isDropdownOpen ? 'block right-1/4' : 'hidden'} bg-white text-black py-2 mt-2 rounded shadow-lg`}>            
            <Link to={`/my-profile/`+rollno} className={role==="Admin"?"hidden":"block px-4 py-2 hover:bg-gray-200"} onClick={handleOptionClick}>
              My Profile
            </Link>
            {/* <Link to="/leaderboard/:batchname" className="block px-4 py-2 hover:bg-gray-200" onClick={handleOptionClick}>
              LeaderBoard
            </Link> */}
            <Link to="/my-account" className="block px-4 py-2 hover:bg-gray-200" onClick={handleOptionClick}>
              My Account
            </Link>
            <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-200" onClick={handleOptionClick}>
              Dashboard
            </Link>
            <Link to="/contact-us" className="block px-4 py-2 hover:bg-gray-200" onClick={handleOptionClick}>
              Contact Us
            </Link>
            <Link to="/" id="logout" className="block px-4 py-2 hover:bg-gray-200" onClick={handleOptionClick}>
              LogOut
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
