import React, { useEffect, useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';


const ChangeStatus = ({batchname, display, handleChangeStatusModal, handleBatches}) => {

    const [currVal,setCurrVal] = useState(null); 

    const handleChange = async (e) => {
        e.preventDefault();
        console.log(e);
        const dataObj = {
            batchname,
            "changeTo": currVal
        }

        console.log(dataObj);

        await axios.post('http://localhost:5000/batch/changeBatchStatus', dataObj,{
            headers: {
                'Content-Type': 'application/json'
                // Add other headers as needed
            }
        })
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
        handleBatches();
        handleChangeStatusModal();
    }

    const handleOption = (e)=>{
        e.preventDefault();
        setCurrVal(e.target.value);
    }

    return(
        <div className={`${display?"fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center":"hidden"}`} id="addbatch">
                <form className="w-1/3 text-start bg-white ring-slate-50 border-2 border-black p-4"> 
                    <RxCross1 className="float-right text-2xl" onClick={handleChangeStatusModal}/>  
                    <label htmlFor="batchname" className="inline text-[16px] mt-4 font-lato" >Change status to</label>                    
                    {/* <input id="batchname" type="text" name="batchname" placeholder="Enter your batchname..."className="mb-4 h-[43px]  bg-[#F5F5F5] rounded w-full focus:outline-none font-lato"/> */}
                    <select className='ml-3 inline rounded-md bg-gray-300 focus:outline-none' onChange={handleOption}>
                        <option value="Active">Active</option>
                        <option value="Hold">Hold</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button className={"block mx-auto bg-amber-300 rounded-md px-3 py-1 md:px-6 md:py-2 mt-5"} type="submit" onClick={handleChange}>
                        Change
                    </button>
                </form>
        </div>
    )
};

export default ChangeStatus;