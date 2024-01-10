import React from "react";
import { FcGoogle} from "react-icons/fc";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    const [showpwd,setShowpd] = useState("Show password");
    const [pwdtype,setPwdtype] = useState(1);
    const handlePassword = ()=>{
        if(pwdtype){
            setShowpd("Hide password");
        }
        else{
            setShowpd("Show password");
        }
        setPwdtype(!pwdtype);
    }
    return(
        <div>
            <div className="md:grid md:grid-cols-2 relative">
            <div className="relative">
                <div className="relative max-md:hidden left-side w-full h-screen text-black font-extrabold">
                    <h1 className="xl:text-4xl">DYNAMICS</h1>
                    <h1 className="block text-center text-3xl md:mt-16">WELCOME BACK</h1>
                    <div className="flex justify-center item-center">
                        <img src= {process.env.PUBLIC_URL+"images/coding.gif"} className="absolute top-1/4 w-3/4" alt="coding GIF" />
                        {/* {process.env.PUBLIC_URL} */}
                    </div>                   
                </div>
                <div className="md:hidden flex flex-row justify-between font-extrabold gap-10 text-black">
                    <h1>LOGO</h1>
                    <h1>WELCOME BACK</h1>        
                </div>
            </div>         
            <div className="mx-auto lg:mt-[6rem] xl:w-3/4 bg-[#F8FAFF]">
                    <h1 className="text-4xl text-center md:text-left mt-10 md:mt-10 m-4 font-bold ml-4">Sign in</h1>
                    <h2 className="text-xs mt-2 text-center md:text-left m-4 font-lato">Sign into your account</h2>
                    <div className="">
                        <div className="block m-4">
                            <button className="p-2 bg-white text-[#858585] font-montserrat">
                                {<FcGoogle className="inline" />} Sign in with google
                            </button>
                        </div>
                        <form className="text-start bg-white ring-slate-50" action="http://localhost:5000/" method="post">   
                            <label htmlFor="username" className="block text-[16px] mt-4 font-lato">Email/Username</label>                    
                            <input id="username" type="text" name="username" className="mb-4 h-[43px]  bg-[#F5F5F5] rounded w-full focus:outline-none font-lato"/>  
                            <label htmlFor="password" className="block text-[16px] font-lato">Password</label>                    
                            <input id="password" type={pwdtype?"password":"text"} name="password" className="mb-4 h-[43px] bg-[#F5F5F5] rounded w-full focus:outline-none font-lato"></input>  
                            <input type="checkbox" id="showpassword" name="showpassword" className="mt-4 mx-2" onClick={handlePassword}></input>
                            <label htmlFor="showpassword">{showpwd}</label>
                            <a href="/" className="block text-blue-400 m-4 font-lato">Forgot password?</a>     
                            <button className="block bg-[#778379] text-white w-3/4 h-[43px] rounded-md mt-2 mx-auto m-4 font-montserrat font-bold">Sign in</button> 
                            <p className="text-center text-[#858585] mt-2 font-lato">Don't have an account? <Link to="/register" className="text-blue-400 m-4 font-lato">Register here</Link></p>             
                        </form>
                    </div>
            </div>       
        </div>
        </div>
        
    );
}

export default Login;