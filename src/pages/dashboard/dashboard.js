import React, { useState } from "react";
import Navbar from "../../layouts/navbar";
import { Batches } from "./dashboardData";
import { Link } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import AddUsers from "./addUsers";
import AddBatch from "./addBatch";
function Dashboard () {
    const [showBatchModal, setShowBatchModal] = useState(0);
    const [showUserModal,setShowUserModal] = useState(0);
    const [showList, setShowList] = useState(0);
    const handleShowBatchModal = ()=>{
        // console.log(showModal)
        setShowBatchModal(!showBatchModal);
    }

    const handleShowUserModal = ()=>{
        // console.log(showModal)
        setShowList(0);
        setShowUserModal(!showUserModal);
    }

    const handleClickOutSide = (e) =>{
        if(e.target.id === "addbatch" || e.target.id=== "addusers"){
            if(showBatchModal){
                // setClickedOutSide(!clickedOutSide);
                setShowBatchModal(!showBatchModal);
            }
            else if(showUserModal){
                setShowList(0)
                setShowUserModal(!showUserModal);
            }
        }
    }

    const handleList = () =>{
        console.log(showList)
        setShowList(!showList);
    }
    return(
        <div onClick={handleClickOutSide} >
            <Navbar />
                <AddBatch display={showBatchModal} handleShowBatchModal={handleShowBatchModal}/>
                <AddUsers display={showUserModal} handleShowUserModal={handleShowUserModal}/>
                <div className={`flex flex-row flex-wrap md:justify-around lg:justify-normal`}>
                    {Batches.map((batch)=>(
                        <div key={batch.id} className="w-full md:w-1/3 lg:w-1/4 h-[120px] border-2 border-black m-4 px-4 py-3 flex flex-col justify-between rounded-md">
                        <div className="flex flex-row justify-between">
                            <h1 className="font-bold text-2xl">{batch.name}</h1>
                            <div>
                                <CiMenuKebab className="text-2xl" onClick={handleList}/>
                                <div className={showList ? "relative bg-black":"hidden"}>
                                    <ul className="absolute right-0">
                                        <li className=" hover:bg-slate-200" onClick={handleShowUserModal}>Add Users</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="text-[13px] text-gray-500 font-semibold">{batch.status}</p>
                            <button className="bg-gray-200 font-semibold px-4 rounded-sm text-lg"><Link to='/leaderboard'>open</Link></button>
                        </div>
                    </div>
                    ))}
                </div>
                <button className="block mx-auto bg-amber-300 rounded-md px-3 py-1 md:px-6 md:py-2 mt-5" onClick={handleShowBatchModal}>
                            Add a NewBatch
                </button>
        </div>
    );
};

export default Dashboard;