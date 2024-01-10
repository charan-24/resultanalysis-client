import React from "react";
import Navbar from "../../layouts/navbar";
import Contactus from "../../layouts/contactus";
import {codingProfiles,personals,socials,development} from "./myAccountsdata";
function MyAccount(){
    return(
        <div>
            <Navbar />
            <div>
                <h1 className="text-center font-bold md:mt-4 underline">Personal Details</h1>
                <form className="w-3/4 md:w-2/5 mx-auto">
                    {personals.map((personal)=>(
                        <div key={personal.id}>
                            <label htmlFor={personal.label} className="block text-[12px] text-gray-500 font-semibold mt-2">{personal.label}</label>
                            <input id={personal.label} type="text" defaultValue={personal.input} className="inline mt-2 focus:outline-none"></input>
                            <button className="inline float-right bg-amber-300 rounded-md px-3 py-1 md:px-6 md:py-2 mb-1">
                                update
                            </button>
                            <hr className={`border-1 border-black w-full`}/>                   
                        </div>
                    ))}                      
                </form>
            </div>
            <div>
                <h1 className="text-center font-bold md:mt-4 underline">Coding Profiles</h1>
                <form className="w-3/4 md:w-2/5 mx-auto">
                    {codingProfiles.map((platform)=>(
                        <div key={platform.id}>
                            <label htmlFor={platform.label} className="block text-[12px] text-gray-500 font-semibold mt-2">{platform.label}</label>
                            <input id={platform.label} type="text" defaultValue={platform.input} className="inline mt-2 focus:outline-none"></input>
                            <button className="inline float-right bg-amber-300 rounded-md px-3 py-1 md:px-6 md:py-2 mb-1">
                                update
                            </button>
                            <hr className={`border-1 border-black w-full`}/>                   
                        </div>
                    ))}                      
                </form>
            </div>
            <div>
                <h1 className="text-center font-bold md:mt-4 underline">Social Profiles</h1>
                <form className="w-3/4 md:w-2/5 mx-auto">
                    {socials.map((media)=>(
                        <div key={media.id}>
                            <label htmlFor={media.label} className="block text-[12px] text-gray-500 font-semibold mt-2">{media.label}</label>
                            <input id={media.label} type="text" defaultValue={media.input} className="inline mt-2 focus:outline-none"></input>
                            <button className="inline float-right bg-amber-300 rounded-md px-3 py-1 md:px-6 md:py-2 mb-1">
                                update
                            </button>
                            <hr className={`border-1 border-black w-full`}/>                   
                        </div>
                    ))}                      
                </form>
            </div>
            <div className="mb-4">
                <h1 className="text-center font-bold md:mt-4 underline">Development Profiles</h1>
                <form className="w-3/4 md:w-2/5 mx-auto">
                    {development.map((platform)=>(
                        <div key={platform.id}>
                            <label htmlFor={platform.label} className="block text-[12px] text-gray-500 font-semibold mt-2">{platform.label}</label>
                            <input id={platform.label} type="text" defaultValue={platform.input} className="inline mt-2 focus:outline-none"></input>
                            <button className="inline float-right bg-amber-300 rounded-md px-3 py-1 md:px-6 md:py-2 mb-1">
                                update
                            </button>
                            <hr className={`border-1 border-black w-full`}/>                   
                        </div>
                    ))}                      
                </form>
            </div>
        </div>
    );
};

export default MyAccount;