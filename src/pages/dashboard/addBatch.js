import React from "react";
import { RxCross1 } from "react-icons/rx";
const AddBatch = ({display, handleShowBatchModal}) =>{
    return(
            <div className={`${display?"fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center":"hidden"}`} id="addbatch">
                <form className="w-1/3 text-start bg-white ring-slate-50 border-2 border-black p-4"> 
                    <RxCross1 className="float-right text-2xl" onClick={handleShowBatchModal}/>  
                    <label htmlFor="username" className="block text-[16px] mt-4 font-lato">Batch Name</label>                    
                    <input id="username" type="text" name="username" placeholder="Enter your batchname..."className="mb-4 h-[43px]  bg-[#F5F5F5] rounded w-full focus:outline-none font-lato"/>
                    <p className="text-center">And</p>
                    <button className="block mx-auto bg-amber-300 rounded-md px-3 py-1 md:px-6 md:py-2 mt-5">
                        Upload the Batch details in .xlsx or .xlx format
                    </button>                 
                </form>
            </div>
    );
}

export default AddBatch;