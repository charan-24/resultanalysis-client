import React, { useState,useEffect} from "react";
import Navbar from '../../layouts/navbar';
import { IoMdMore } from "react-icons/io";
import { BiUpArrowAlt } from "react-icons/bi";
import { Headings } from "./leaderboarddata";
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import './leaderboard.css';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAS, saveAs } from 'file-saver';

function LeaderBoard (){
    const [Users,setUsers] = useState([]);
    const [isUp,setIsUp] = useState(1);
    const [style,setStyle] = useState({});
    const [headId,setHeadId] = useState(null);
    const [showDel,setShowDel] = useState(0);
    const [userid,setUserid] = useState(null);
    const [delid,setDelid] = useState(null);
    const [reportData,setReportData] = useState({});
    const [showList,setShowList] = useState(0);

    const {auth} = useAuth();
    const {batchname} = useParams();
    const role = auth.role;
    const rollno = auth.rollno;

    const getScores = async () => {
        const arr = [];
            await axios.get('http://localhost:5000/score/getScores/'+batchname)
                                    .then(res=>{                                    
                                        res.data.forEach((item,index)=>{
                                            const lastlogin = item.lastlogin?.toLocaleString().slice(0,10) ?? "";
                                            const lastUpdated = item.lastUpdated?.toLocaleString().slice(0,10) ?? "";
                                            // const logintime = "";
                                            arr.push({
                                                sno:index+1,
                                                rollno: item.rollno,
                                                fullname: item.fullname?.replace(/(\w)(\w*)/g,
                                                            function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();}),
                                                lastlogin: lastlogin,
                                                lastUpdated: lastUpdated,
                                                isActive: item.isActive,
                                                hacker: item.hacker,
                                                leet: item.leet,
                                                chef: item.chef,
                                                forces: item.forces,
                                                interviewbit: item.interviewbit,
                                                spoj: item.spoj,
                                                total: item.total
                                            })
                                        })
                                        arr.sort((a,b)=>b.total-a.total);
                                        for(let i=0;i<arr.length;i++){
                                            arr[i].sno = i+1;
                                        }
                                        setReportData(res.data);
                                        setUsers(arr);
                                    })
                                    .catch(err=>{
                                        console.error(err);
                                    })
    }

    const exportToExcel = ()=> {
        const worksheet = XLSX.utils.json_to_sheet(reportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook,worksheet, "Sheet1");
        
    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    
    saveAs(blob, `${batchname}_Report.xlsx`);
    };

    const handleSort = (e)=>{
        const arr = Users.slice();
        const prop = e.target.id;
        
        arr.sort((a,b)=>{
            if(prop==='hacker'){
                if(isUp)
                    return a.hacker-b.hacker;
                else    
                    return b.hacker-a.hacker;
            }
            else if(prop==='leet'){
                if(isUp)
                    return a.leet-b.leet;
                else
                    return b.leet-a.leet;
            }
            else if(prop==='chef'){
                if(isUp)
                    return a.chef-b.chef;
                else
                    return b.chef-a.chef;
            }
            else if(prop==='forces'){
                if(isUp)
                    return a.forces-b.forces;
                else
                    return b.forces-a.forces;
            }
            else if(prop==='spoj'){
                if(isUp)
                    return a.spoj-b.spoj;
                else
                    return b.spoj-a.spoj;
            }
            else if(prop==='interviewbit'){
                if(isUp)
                    return a.interviewbit-b.interviewbit;
                else
                    return b.interviewbit-a.interviewbit;
            }
            else if(prop==='sno'){
                if(isUp)
                    return a.sno-b.sno;
                else
                    return b.sno-a.sno;
            }
            else if(prop==='rollno'){
                if(isUp)
                    return a.rollno-b.rollno;
                else
                    return b.rollno-a.rollno;
            }
            else if(prop==='total'){
                if(isUp)
                    return a.total-b.total;
                else
                    return b.total-a.total;
            }
            else if(prop==='fullname'){
                if(isUp)
                    return a.fullname.localeCompare(b.fullname);
                else
                    return b.fullname.localeCompare(a.fullname);
            }
        });
        // console.log(arr);
        if(isUp){
            setStyle({
              transform: 'rotate(180deg)',
              transition: 'transform 150ms ease',
            });
        }
        else{
            setStyle({
                transform: 'rotate(360deg)',
                transition: 'transform 150ms ease',
            });
        }
        setIsUp(!isUp)
        setUsers(arr);
        setHeadId(prop);
    }

    const handleMouseEnter = (e) => {
        e.preventDefault();
        setUserid(e.target.id);
        setShowDel(1);
        // console.log(e.target.id);
    }

    const handleMouseLeave = (e) => {
        e.preventDefault();
        setUserid(null);
        if(showDel){
            setShowList(0);
        }
        setShowDel(0);
        // console.log(e.target.id);
    }

    const handleList = (e) => {
        e.preventDefault();
        // console.log(typeof e.target.id);
        setDelid(e.target.id);
        setShowList(1);
    }

    const handleDelUser = async (e) => {
        e.preventDefault();
        const rollno = e.target.id;
        await axios.delete('http://localhost:5000/batch/deleteUser/'+batchname+'/'+rollno)
                    .then(res=>{
                        getScores();
                    })
                    .catch(err=>{
                        console.error(err);
                    });
    }

    useEffect(()=>{
        getScores();
    },[]);

    return(
        <div>
            <Navbar/>
            <div>
                <table className="w-full">
                    <thead>
                        <tr className="thead-row">
                            {Headings.map((item)=>(
                                <th className={(item.id==="lastlogin" && role==="Student" && "hidden") || (item.id==="lastupdated" && role==="Student" && "hidden")} key={item.id}>
                                    <div className="flex flex-row justify-evenly">
                                        <h2 className={"inline"}>{item.title}</h2>
                                        <BiUpArrowAlt id={item.id} onClick={handleSort} className="" style={headId===item.id ? style : {} }/>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Users.map((user,index)=>(
                            <tr key={user.rollno} className={user.rollno===rollno?"tbody-row bg-green-200":index%2!==0?`tbody-row bg-[#f5f5f5]` :"tbody-row"}>
                                <td>{user.sno}</td>
                                <td className={!user.isActive && "bg-red-300"} id={user.rollno} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    <div className={"relative"}>
                                        <p className={"inline"}>{user.rollno}</p>
                                        <div className={role===`Student`?"hidden":"inline"}>
                                            <IoMdMore id={user.rollno} onClick={handleList} className={userid===user.rollno?(showDel ?"inline float-right":"hidden"):"hidden"}/>
                                            <div className={ (delid===user.rollno) ? (showList ? "absolute left-full top-5  w-[100px]":"hidden"):"hidden"}>
                                                <ul className="rounded-md shadow-lg">
                                                    <li className=" hover:bg-gray-200 mb-2" id={user.rollno} onClick={handleDelUser}>Delete User</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td><Link to={`/my-profile/`+user.rollno}>{user.fullname}</Link></td>
                                <td className={role === "Student" && "hidden"}>{user.lastlogin}</td>
                                <td className={role === "Student" && "hidden"}>{user.lastUpdated}</td>
                                <td>{user.hacker}</td>
                                <td>{user.leet}</td>
                                <td>{user.chef}</td>
                                <td>{user.forces}</td>
                                <td>{user.interviewbit}</td>
                                <td>{user.spoj}</td>
                                <td>{user.total}</td>
                            </tr>
                        ))}                    
                    </tbody>
                </table>
                <button className={role==='Admin'?"block mx-auto bg-amber-300 rounded-md mt-4 px-3 py-1 md:px-6 md:py-2 mb-1":"hidden"} onClick={exportToExcel}>
                    Download Batch Report
                </button>
            </div>
            {/* <Contactus /> */}
        </div>
    );
};

export default LeaderBoard;