import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import * as XLSX from 'xlsx';
import axios from 'axios';

const AddUsers = ({display, handleShowUserModal, batchname}) =>{
    // console.log(batchname);
    const [selectedFile, setSelectedFile] = useState(null);
    const [excelData,setExcelData] = useState(null);
    // const [batchname,setBatchName] = useState("b1");

    const handleFileChange = (e)=>{
        setSelectedFile(e.target.files[0]);
    }

    const handleForm = async (e) => {
        e.preventDefault();
        if(!selectedFile){
            const fullname = e.target.elements.fullname.value;
            const email = e.target.elements.email.value;
            const rollno = e.target.elements.rollno.value;
            const password = e.target.elements.password.value;
            
            if(!fullname || !email || !rollno){
                alert("all details required");
                return;
            }
            setExcelData({
                    "batchname":batchname,
                    "users":[{
                        "fullname":fullname,
                        "email":email,
                        "rollno":rollno,
                        "password":password
                    }]
            })
            // alert("please select a file");
            return;
        }
        const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Assuming the first sheet is the one of interest
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // Convert sheet data to JSON
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                // Store the data in state
                setExcelData({
                    "batchname":batchname,
                    "users":jsonData
                });
            };
        reader.readAsArrayBuffer(selectedFile);
    }

    const fetchNewScores = async (batchData)=>{
        await axios.post('http://localhost:5000/score/fetchNewUserScore',batchData,{
            headers: {
                'Content-Type': 'application/json'
                // Add other headers as needed
            }
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(err=>{
            console.error(err);
        });
    }

    const handlePostReq = async (batchData)=>{
        await axios.post('http://localhost:5000/batch/addUsers', batchData, {
            headers: {
                'Content-Type': 'application/json'
                // Add other headers as needed
            }
            })
            .then(response => {
            // Handle the response data if needed
            handleShowUserModal();
            console.log("users added");
            fetchNewScores(batchData);
            })
            .catch(error => {
            alert("users not added")
            console.error('Error:', error.message);
        });
    }

    useEffect(()=>{
        if(excelData){
            handlePostReq(excelData);
        }
    },[excelData])

    return(
            <div id="addusers" className={`${display?"fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center":"hidden"}`}>
                <form className="w-1/3 text-start bg-white ring-slate-50 border-2 border-black p-4" onSubmit={handleForm}> 
                    <RxCross1 className="float-right text-2xl" onClick={handleShowUserModal}/>  
                    <input type="file" onChange={handleFileChange}/>       
                    <p className="text-center">OR</p>
                    <hr/>
                    <div>
                        {/* <h1 className="underline">Enter Student Details</h1>
                        <label htmlFor="fullname" className="block text-[16px] mt-4 font-lato">Name</label>                    
                        <input id="fullname" type="text" name="fullname" className="mb-4 h-[43px]  bg-[#F5F5F5] rounded w-full focus:outline-none font-lato" />
                        <label htmlFor="rollno" className="block text-[16px] mt-4 font-lato">Roll No.</label>                    
                        <input id="rollno" type="number" name="rollno" className="mb-4 h-[43px]  bg-[#F5F5F5] rounded w-full focus:outline-none font-lato" />
                        <label htmlFor="email" className="block text-[16px] mt-4 font-lato">Email</label>                    
                        <input id="email" type="text" name="email" className="mb-4 h-[43px]  bg-[#F5F5F5] rounded w-full focus:outline-none font-lato" />
                        <label htmlFor="password" className="block text-[16px] mt-4 font-lato">Password</label>                    
                        <input id="password" type="password" name="password" defaultValue="xyz" className="mb-4 h-[43px]  bg-[#F5F5F5] rounded w-full focus:outline-none font-lato"/> */}
                        <button className="block mx-auto bg-amber-300 rounded-md px-3 py-1 md:px-6 md:py-2 mt-5" type="submit">
                            Submit
                        </button>
                    </div>         
                </form>
            </div>
    );
}

export default AddUsers;