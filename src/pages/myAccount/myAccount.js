import React, { useEffect, useState } from "react";
import Navbar from "../../layouts/navbar";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
// import {socials,development} from "./myAccountsdata";

function MyAccount(){
    const [userDetails,setUserDetails] = useState({});
    const [codingProfiles,setCodingProfiles] = useState([]);
    const [personals, setPersonals] = useState([]);
    const [newHandle, setNewHandle] = useState(null);
    const [newPersonalDetail, setNewPersonalDetail] = useState(null);
    const {auth} = useAuth();
    const rollno = auth.rollno;

    const getUserDetails = async ()=>{ await axios.get('http://localhost:5000/user/fetchUserDetails/'+rollno)
            .then((res)=>{
                // console.log(res.data);
                setUserDetails(res.data);
            })
            .catch(err=>{
                console.error(err);
            });
    }

    const copyUserdetails = () => {
        console.log(userDetails)
        const personal = [
            {
                id:1,
                label:"Fullname",
                input:userDetails.fullname
            },
            {
                id:2,
                label:"Rollno",
                input:userDetails.rollno
            },
            {
                id:3,
                label:"E-mail",
                input:userDetails.email
            }
        ];

        const codingProfile = [
            {
                id:4,
                label:"HackerRank username",
                input:userDetails.hackerrank
            },
            {
                id:5,
                label:"LeetCode username",
                input:userDetails.leetcode
            },
            {
                id:6,
                label:"CodeChef username",
                input:userDetails.codechef
            },
            {
                id:7,
                label:"CodeForces username",
                input:userDetails.codeforces
            },
            {
                id:8,
                label:"Spoj username",
                input:userDetails.spoj
            },
            {
                id:9,
                label:"InterviewBit username",
                input:userDetails.interviewbit
            }
        ]
        // console.log(codingProfile);
        // console.log(personal);
        setCodingProfiles([...codingProfiles.slice(codingProfiles.length,codingProfiles.length),...codingProfile]);
        setPersonals([...personals.slice(personals.length,personals.length),...personal]);
    }

    const handleInputChange = async (e) => {
        e.preventDefault();
        setNewHandle(e.target.value);
    }

    const handleDetailsChange = async (e) => {
        e.preventDefault();
        setNewPersonalDetail(e.target.value);
    }

    const changeHandle = async (e) => {
        e.preventDefault();
        if(newHandle===null){
            alert("nothing new to update");
            return;
        }
        const handlename = e.target.id;
        const dataObj = {
            "rollno": rollno,
            "handlename": handlename.toLowerCase().split(' ')[0],
            "handle": newHandle
        }
        console.log(dataObj);
        await axios.post('http://localhost:5000/user/changeAhandle',dataObj)
                    .then((res)=>{
                        // console.log(res);
                        alert(res.data.message);
                    })
                    .catch((err)=>{
                        console.log("handle not changed");
                    });
    }

    const changePersonalDetail = async (e)=>{
        e.preventDefault();
        let label = e.target.id;
        label=label.toLowerCase().split('-');
        const key = label[0]+label[1];
        const dataObj = {
            "rollno": rollno,
            "key": key.toLowerCase(),
            "value": newPersonalDetail
        }
        await axios.post('http://localhost:5000/user/changeAPersonalDetail',dataObj)
                    .then((res)=>{
                        alert(res.data.message);
                    })
                    .catch((err)=>{
                        console.log("Not updated");
                    })
    }

    useEffect(()=>{
        getUserDetails();
    },[]);

    useEffect(()=>{
        copyUserdetails();
    },[userDetails]);
    
    return(
        <div>
            <Navbar />
            <div>
                <h1 className="text-center font-bold md:mt-4 underline">Personal Details</h1>
                <form className="w-3/4 md:w-2/5 mx-auto">
                    {personals.map((personal)=>(
                        <div key={personal.id}>
                            <label htmlFor={personal.label} className="block text-[12px] text-gray-500 font-semibold mt-2">{personal.label}</label>
                            <input id={personal.label} type="text" defaultValue={personal.input} className="inline w-2/3 mt-2 focus:outline-none" disabled={personal.label!=="E-mail"} onChange={handleDetailsChange}></input>
                            <button className="inline float-right bg-amber-300 rounded-md px-3 py-1 md:px-6 md:py-2 mb-1" id={personal.label} onClick={changePersonalDetail}>
                                Update
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
                            <input id={platform.label} type="text" defaultValue={platform.input} className="inline w-2/3 mt-2 focus:outline-none" onChange={handleInputChange}></input>
                            <button className="inline float-right bg-amber-300 rounded-md px-3 py-1 md:px-6 md:py-2 mb-1" id={platform.label} onClick={changeHandle}>
                                Update
                            </button>
                            <hr className={`border-1 border-black w-full`}/>                   
                        </div>
                    ))}                      
                </form>
            </div>
            {/* <div>
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
            </div> */}
            {/* <div className="mb-4">
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
            </div> */}
        </div>
    );
};

export default MyAccount;