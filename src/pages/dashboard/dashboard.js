import React, { useState, useEffect, Fragment } from "react";
import Navbar from "../../layouts/navbar";
import { Link } from "react-router-dom";
import { IoMdMore } from "react-icons/io";
import AddUsers from "./addUsers";
import AddBatch from "./addBatch";
import ChangeStatus from "./changeStatus";
import useAuth from "../../hooks/useAuth";
import emailjs from '@emailjs/browser';
import axios from 'axios';

function Dashboard() {
    const [showBatchModal, setShowBatchModal] = useState(0);
    const [showUserModal, setShowUserModal] = useState(0);
    const [statusModal,setStatusModal] = useState(0)
    const [showList, setShowList] = useState(false);
    const [Batches, setBatches] = useState([]);
    const [batchname, setBatchName] = useState("");
    const [filterBatch, setFilterBatch] = useState([]);
    const [showMenu,setShowMenu] = useState(1);
    
    const {auth} = useAuth();
    let role = sessionStorage.getItem('role');
    let rollno = sessionStorage.getItem('rollno');

    const handleShowBatchModal = () => {
        // console.log(showModal)
         setShowList(0);
        setShowMenu(!showMenu);
        setShowBatchModal(!showBatchModal);
    }

    const handleShowUserModal = () => {
        setShowList(0);
        setShowMenu(!showMenu);        
        setShowUserModal(!showUserModal);
    }

    const handleChangeStatusModal = () => {
        setShowList(0);
        setShowMenu(!showMenu);        
        setStatusModal(!statusModal);
    }

    const handleClickOutSide = (e) => {
        if(showList){
            setShowList(0);
        }
    }

    const handleList = (e) => {
        // console.log(showList)
        e.preventDefault();
        // console.log(e.target.id);
        // console.log(showList);
        if (showList) {
            setBatchName(null);
        }
        else {
            setBatchName(e.target.id);
        }
        setShowList(!showList);
    }

    const handleBatches = async () => {
        const arr = [];
        await axios.get('http://localhost:5000/batch/getBatches')
            .then(res => {
                console.log(res.data);
                let foundStudent;
                if(role==="Student"){
                    res.data.forEach(item =>{
                        foundStudent = item.users.find(user => user.rollno === rollno);
                        if(foundStudent){
                            arr.push({
                                id: item._id,
                                batchname: item.batchname,
                                status: item.batchstatus,
                            })
                        }    
                    });
                    // console.log("student" + role);
                    // console.log(arr);
                }
                else{
                    res.data.forEach(item => {
                        arr.push({
                            id: item._id,
                            batchname: item.batchname,
                            status: item.batchstatus,
                        })
                    })
                    // console.log("admin  "+ role);
                }
                // console.log(arr);
                setBatches(arr);
            })
            .catch(err => console.error(err));
    }

    const handleDeleteABatch = async (e) => {
        e.preventDefault();
        await axios.delete('http://localhost:5000/batch/deleteBatch/' + e.target.id)
            .then(res => handleBatches())
            .catch(err => console.error(err));
    }

    const handleCheckBox = (e) => {
        // e.preventDefault();
        const temp = e.target.id;
        // console.log(temp);
        const idx = filterBatch.indexOf(temp);
        if (idx === -1) {
            setFilterBatch([...filterBatch, temp]);
        }
        else {
            filterBatch.splice(idx, 1);
            setFilterBatch([...filterBatch]);
        }
    }

    const sendReminders = async (e) => {
        e.preventDefault();
        await axios.get('http://localhost:5000/batch/getBatches')
                    .then((res)=>{
                        const batches = res.data;
                        for(let i=0;i<batches.length;i++){
                            const batch = batches[i];
                            const users = batch.users;
                            if(!users){
                                return res.sendStatus(401);
                            }
                            for(let j=0;j<users.length;j++){
                                const user = users[j];
                                if(!user.isActive){
                                    const templateparams = {
                                        name: user.fullname,
                                        email: user.email
                                    };
                                    console.log(templateparams)
                                    emailjs.send('service_cuitdwa', 'template_99uwo69', templateparams, 'JeeyJmTk8Wv7Z8qfi')
                                    .then((result) => {
                                        console.log("sent");
                                    }, (error) => {
                                        console.log("error");
                                    });
                                }
                            }
                        }
                        alert("Mails sent");
                    })
                    .catch((err)=>{
                        console.log(err);
                        alert("There's a problem with this service right now, sorry for your inconvenince");
                    })
    }
    
    useEffect(() => {
        handleBatches();
        // setRole(auth.role);
        // setRollno(auth.rollno);
    }, [filterBatch]);

    return (
        <div onClick={handleClickOutSide}>
            <Navbar />
            <AddBatch display={showBatchModal} handleShowBatchModal={handleShowBatchModal} handleBatches={handleBatches} />
            <AddUsers display={showUserModal} handleShowUserModal={handleShowUserModal} batchname={batchname} />
            <ChangeStatus batchname={batchname} display={statusModal} handleChangeStatusModal={handleChangeStatusModal} handleBatches={handleBatches} />
            {/* <Fragment></Fragment> */}
            <div className="flex flex-row gap-20 text-[20px] ml-10">
                <div className="text-[20px]">
                    <input id="Completed" name="Completed" type="checkbox" onClick={handleCheckBox} />
                    <label htmlFor="Completed" className="ml-2">Completed</label>
                </div>
                <div>
                    <input id="Active" name="Active" type="checkbox" onClick={handleCheckBox} />
                    <label htmlFor="Active" className="ml-2">Active</label>
                </div>
                <div>
                    <input id="Hold" name="Hold" type="checkbox" onClick={handleCheckBox} />
                    <label htmlFor="Hold" className="ml-2">Hold</label>
                </div>
            </div>
            <div className={`flex flex-row flex-wrap md:justify-around lg:justify-normal`}>
                {Batches.map((batch) => (
                    <div key={batch.id}  className={filterBatch.length !== 0 ? (filterBatch.indexOf(batch.status) === -1 ? "hidden" : "w-full md:w-1/3 lg:w-1/4 h-[120px] border-2 border-black m-4 px-4 py-3 flex flex-col justify-between rounded-md") : "w-full md:w-1/3 lg:w-1/4 h-[120px] border-2 border-black m-4 px-4 py-3 flex flex-col justify-between rounded-md"}>
                        <div className="flex flex-row justify-between">
                            <h1 className="font-bold text-2xl "><Link to={`/leaderboard/` + batch.batchname} className="hover:underline">{batch.batchname?.replace(/(\w)(\w*)/g,
                                        function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();})}</Link></h1>
                                <div className={role==="Student"?"hidden":"relative"}>
                                    <IoMdMore className={showMenu?"text-2xl cursor-pointer":"hidden"} id={batch.batchname} onClick={handleList} />
                                    <div className={(batchname === batch.batchname) ? (showList ? " absolute top-5 right-0 w-[100px]" : "hidden") : "hidden"}>
                                        <ul className="rounded-md shadow-lg">
                                            <li className=" hover:bg-gray-200 border-solid" id={batch.batchname} onClick={handleShowUserModal}>Add users</li>
                                            <hr />
                                            <li className=" hover:bg-gray-200" id={batch.batchname} onClick={handleDeleteABatch}>Delete batch</li>
                                            <hr />
                                            <li className=" hover:bg-gray-200" id={batch.batchname} onClick={handleChangeStatusModal}>Change status</li>
                                        </ul>
                                    </div>
                                </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="text-[13px] text-gray-500 font-semibold">{batch.status.replace(/(\w)(\w*)/g,
                                        function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();})}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className={role==="Student"?"hidden":"block mx-auto bg-amber-300 rounded-md px-3 py-1 md:px-6 md:py-2 mt-5"} onClick={handleShowBatchModal}>
                Add a NewBatch
            </button>
            <button className={role==="Student"?"hidden":"block mx-auto bg-amber-300 rounded-md px-3 py-1 md:px-6 md:py-2 mt-10"} onClick={sendReminders}>
                Send Reminders
            </button>
        </div>
    );
};

export default Dashboard;