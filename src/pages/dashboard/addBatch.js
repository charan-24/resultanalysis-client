import React,{useEffect, useState} from "react";
import { RxCross1 } from "react-icons/rx";
import * as XLSX from 'xlsx';
import axios from 'axios';

const AddBatch = ({display, handleShowBatchModal, handleBatches}) =>{
    const [selectedFile,setSelectedFile] = useState(null);
    const [batchname,setBatchName] = useState("");
    const [excelData,setExcelData] = useState(null);

    const handleBatchName = (e)=>{
        setBatchName(e.target.value);
    }

    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        setSelectedFile(file);      
    }

    const handleFileSubmit = async (e)=>{
        e.preventDefault();
        if(!selectedFile){
            alert('please slect a file');
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

    const fetchScores = async (batchData) =>{
        console.log(batchData);
        await axios.post('http://localhost:5000/score/fetchScores',batchData,{
            headers: {
                'Content-Type': 'application/json'
                // Add other headers as needed
            }
        }) 
        .then(res => {
            console.log(res.data);
            alert("scores updated")
        })
        .catch(err=>{
            console.error(err);
        });
    }
    
    const handlePostReq = async (batchData)=>{
        await axios.post('http://localhost:5000/batch/addBatch', batchData, {
            headers: {
                'Content-Type': 'application/json'
                // Add other headers as needed
            }
            })
            .then(response =>{
            // Handle the response data if needed
            handleShowBatchModal();
            fetchScores(batchData);
            handleBatches();
            })
            .catch(error => {
            alert("file not uploaded")
            console.error('Error:', error.message);
        });
    }

    useEffect(()=>{
        if(excelData){
            handlePostReq(excelData);
        }
    },[excelData])

    return(
            <div className={`${display?"fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center":"hidden"}`} id="addbatch">
                <form className="w-1/3 text-start bg-white ring-slate-50 border-2 border-black p-4" onSubmit={handleFileSubmit}> 
                    <RxCross1 className="float-right text-2xl" onClick={handleShowBatchModal}/>  
                    <label htmlFor="batchname" className="block text-[16px] mt-4 font-lato" >Batch Name</label>                    
                    <input id="batchname" type="text" name="batchname" placeholder="Enter your batchname..."className="mb-4 h-[43px]  bg-[#F5F5F5] rounded w-full focus:outline-none font-lato" onChange={handleBatchName}/>
                    <p className="text-center">And</p>
                    <label htmlFor="fileUpload" className="block">Upload the Batch details in .xlsx</label>
                    <input id="fileUpload" name="fileUpload" type="file" onChange={handleFileChange}/>
                    <RxCross1 className="float-right" id="fileDel" name="fileDel" onClick={handleFileChange}/>
                    <button className={"block mx-auto bg-amber-300 rounded-md px-3 py-1 md:px-6 md:py-2 mt-5"} type="submit">
                        Submit
                    </button>
                </form>
            </div>
    );
}

export default AddBatch;