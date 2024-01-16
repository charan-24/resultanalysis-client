import React from "react";
import { RxCross1 } from "react-icons/rx";
const AddUsers = ({display, handleShowUserModal}) =>{
    return(
            <div id="aaddusers" className={`${display?"fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center":"hidden"}`}>
                <form className="w-1/3 text-start bg-white ring-slate-50 border-2 border-black p-4"> 
                    <RxCross1 className="float-right text-2xl" onClick={handleShowUserModal}/>  
                    <button className="block mx-auto bg-amber-300 rounded-md px-3 py-1 md:px-6 md:py-2 mt-5">
                        Upload an Excelsheet
                    </button>        
                    <p className="text-center">OR</p>
                    <hr/>
                    <div>
                        <form>
                            <h1 className="underline">Enter Student Details</h1>
                            <label htmlFor="username" className="block text-[16px] mt-4 font-lato">Name</label>                    
                            <input id="username" type="text" name="username" className="mb-4 h-[43px]  bg-[#F5F5F5] rounded w-full focus:outline-none font-lato"/>
                            <label htmlFor="username" className="block text-[16px] mt-4 font-lato">Roll No.</label>                    
                            <input id="username" type="text" name="username" className="mb-4 h-[43px]  bg-[#F5F5F5] rounded w-full focus:outline-none font-lato"/>
                            <label htmlFor="username" className="block text-[16px] mt-4 font-lato">Email</label>                    
                            <input id="username" type="text" name="username" className="mb-4 h-[43px]  bg-[#F5F5F5] rounded w-full focus:outline-none font-lato"/>
                            <label htmlFor="username" className="block text-[16px] mt-4 font-lato">Password</label>                    
                            <input id="username" type="password" name="username" defaultValue="vnrvjiet123" className="mb-4 h-[43px]  bg-[#F5F5F5] rounded w-full focus:outline-none font-lato"/>
                            <button className="block mx-auto bg-amber-300 rounded-md px-3 py-1 md:px-6 md:py-2 mt-5">
                                Submit
                            </button>
                        </form>
                    </div>         
                </form>
            </div>
    );
}

export default AddUsers;