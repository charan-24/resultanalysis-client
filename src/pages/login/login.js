import React, { useContext, useState }  from "react";
import { FcGoogle} from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [showpwd,setShowpd] = useState("Show password");
    const [pwdtype,setPwdtype] = useState(1);
    const [wrongUser,setWrongUser] = useState(0);
    const [wrongPass,setWrongPass] = useState(0);
    const {setAuth} = useAuth();

    const handlePassword = ()=>{
        if(pwdtype){
            setShowpd("Hide password");
        }
        else{
            setShowpd("Show password");
        }
        setPwdtype(!pwdtype);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        const userData = {
            username,
            password
        }
        // console.log(userData);
        await axios.post('http://localhost:5000/login',userData)
                    .then(res=>{
                        sessionStorage.setItem("rollno",username);
                        sessionStorage.setItem("fullname",res.data.fullname);
                        sessionStorage.setItem("role",res.data.role);
                        sessionStorage.setItem("accessToken",res.data.accessToken);
                        setAuth({"rollno":sessionStorage.getItem("rollno"),
                                "fullname":sessionStorage.getItem("fullname"),
                                "role":sessionStorage.getItem("role"),
                                "accessToken":sessionStorage.getItem("accessToken"),
                        });
                        console.log(res.data);
                        if(res.data.role==="Student"){
                            navigate(`/my-profile/`+username);
                        }
                        else{
                            navigate('/dashboard');
                        }
                    })
                    .catch(err=>{
                        if(err.response.data.message==="username"){
                            setWrongUser(!wrongUser);
                        }
                        else if(err.response.data.message==="password"){
                            setWrongPass(!wrongPass);
                        }
                        console.log(err);
                    });
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
                        {/* <div className="block m-4">
                            <button className="p-2 bg-white text-[#858585] font-montserrat">
                                {<FcGoogle className="inline" />} Sign in with google
                            </button>
                        </div> */}
                        <form className="text-start bg-white ring-slate-50" onSubmit={handleLogin}>   
                            <label htmlFor="username" className="block text-[16px] mt-4 font-lato">Email/Username</label>
                            <p className={wrongUser?"text-red-600 font-bold":"hidden"}>email/username not found</p>                    
                            <input id="username" type="text" name="username" onChange={()=>{setWrongUser(0)}} className="mb-4 h-[43px]  bg-[#F5F5F5] rounded w-full focus:outline-none font-lato"/>  
                            <label htmlFor="password" className="block text-[16px] font-lato">Password</label>                    
                            <p className={wrongPass?"text-red-600 font-bold":"hidden"}>wrong password</p>
                            <input id="password" type={pwdtype?"password":"text"} name="password" onChange={()=>{setWrongPass(0)}} className="mb-4 h-[43px] bg-[#F5F5F5] rounded w-full focus:outline-none font-lato"></input>  
                            <input type="checkbox" id="showpassword" name="showpassword" className="mt-4 mx-2" onClick={handlePassword}></input>
                            <label htmlFor="showpassword">{showpwd}</label>
                            <a href="/" className="block text-blue-400 m-4 font-lato">Forgot password?</a>     
                            <button className="block bg-[#778379] text-white w-3/4 h-[43px] rounded-md mt-2 mx-auto m-4 font-montserrat font-bold" type="submit">Sign in</button> 
                            {/* <p className="text-center text-[#858585] mt-2 font-lato">Don't have an account? <Link to="/register" className="text-blue-400 m-4 font-lato">Register here</Link></p>              */}
                        </form>
                    </div>
            </div>       
        </div>
        </div>
        
    );
}

export default Login;