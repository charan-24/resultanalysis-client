import React from "react";
import { FcGoogle} from "react-icons/fc";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register(){
    const [showpwd,setShowpd] = useState("Show passwords");
    const [pwdtype,setPwdtype] = useState(1);
    const handlePassword = ()=>{
        if(pwdtype){
            setShowpd("Hide passwords");
        }
        else{
            setShowpd("Show passwords");
        }
        setPwdtype(!pwdtype);
    }
    return(
        <div className="md:grid md:grid-cols-2 relative">
            <div className="relative">
                    <div className="max-md:hidden left-side w-full h-screen text-black font-extrabold relative">
                        <h1 className="xl:text-4xl">DYNAMICS</h1>
                        <h1 className="block text-center text-3xl md:mt-16">WELCOME CODERS</h1>
                        <div className="flex justify-center item-center">
                            <img src= {process.env.PUBLIC_URL+"images/coding.gif"} className="absolute top-1/4 w-3/4" alt="coding GIF" />
                        </div>
                    </div>
                    <div className="md:hidden flex flex-row justify-between font-extrabold gap-10 text-black">
                        <h1>LOGO</h1>
                        <h1>WELCOME CODERS</h1>        
                    </div>
            </div> 
            <div className="mx-auto xl:mt-[6rem] w-3/4 bg-[#F8FAFF]">
                <h1 className="text-4xl text-center md:text-left mt-5 md:mt-5 m-4 font-bold ml-4">Sign up</h1>
                <h2 className="text-xs mt-2 text-center md:text-left m-4 font-lato">Register your account</h2>
                <div className="">
                    <div className="block m-4">
                        <button className="p-2 bg-white text-[#858585] font-montserrat">
                            {<FcGoogle className="inline" />} Register with google
                        </button>
                    </div>
                    <form className="text-start bg-white ring-slate-50 mt-4" action="http://localhost:5000/register" method="post">
                        <label htmlFor="mail" className="block text-[16px] font-lato">Full Name</label>                    
                        <input id="mail" type="text" name="mail" className="mb-4 h-[43px]  bg-[#F5F5F5] rounded w-full focus:outline-none font-lato"/> 
                        <label htmlFor="username" className="block text-[16px]  font-lato">Username</label>                    
                        <input id="username" type="text" name="username" className="mb-4 h-[43px]  bg-[#F5F5F5] rounded w-full focus:outline-none font-lato"/>  
                        <label htmlFor="mail" className="block text-[16px] font-lato">Email address</label>                    
                        <input id="mail" type="email" name="mail" className="mb-4 h-[43px]  bg-[#F5F5F5] rounded w-full focus:outline-none font-lato"/>  
                        <label htmlFor="password" className="block text-[16px] font-lato">Password</label>                    
                        <input id="password" type={pwdtype?"password":"text"} name="password" className="mb-4 h-[43px] bg-[#F5F5F5] rounded w-full focus:outline-none font-lato"/> 
                        <label htmlFor="cnfpassword" className="block text-[16px] font-lato">Confirm password</label>                    
                        <input id="cnfpassword" type={pwdtype?"password":"text"} name="cnfpassword" className="mb-4 h-[43px] bg-[#F5F5F5] rounded w-full focus:outline-none font-lato"/>
                        <input type="checkbox" id="showpassword" name="showpassword" className="mt-4 mr-2" onClick={handlePassword}></input>
                        <label htmlFor="showpassword">{showpwd}</label>        
                        <button className="block bg-[#778379] text-white w-3/4 h-[43px] rounded-md mt-2 mx-auto m-4 font-montserrat font-bold" type="submit">Sign me up</button> 
                        <p className="text-center text-[#858585] mt-2 font-lato">Already a member? <Link to="/" className="text-blue-400 m-4 font-lato">Login here</Link></p>             
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;