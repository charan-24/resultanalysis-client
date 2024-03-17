// import axios from 'axios';
// import { useState,useEffect } from "react";

// const GetBatches = async ({getBatches}) => {
//     const [Batches,setBatches] = useState([]);
//     const arr = [];
//     const response = await axios.get('http://localhost:5000/batch/getBatches')
//                                 .then(res=>{
//                                     // console.log(res.data);
//                                     res.data.map(item=>{
//                                         arr.push({
//                                             id:item._id,
//                                             batchname:item.batchname,
//                                             status: item.batchstatus,
//                                         })
//                                     })
//                                     console.log(arr);
//                                     setBatches(arr);
                                    
//                                 })
//                                 .catch(err=>console.error(err));
//     useEffect(()=>{
//         if(Batches.length>=1){
//             getBatches()
//         }
//     },[]) 
// }

// export default GetBatches;