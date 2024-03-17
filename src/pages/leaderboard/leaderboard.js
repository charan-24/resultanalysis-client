import React, { useState,useEffect, useContext } from "react";
import Navbar from '../../layouts/navbar';
import { IoMdMore } from "react-icons/io";
import { BiUpArrowAlt } from "react-icons/bi";
import { Headings } from "./leaderboarddata";
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import './leaderboard.css';
import axios from 'axios';

function LeaderBoard (){
    const [Users,setUsers] = useState([]);
    const [isUp,setIsUp] = useState(1);
    const [style,setStyle] = useState({});
    const [headId,setHeadId] = useState(null);
    const [showDel,setShowDel] = useState(0);
    const [userid,setUserid] = useState(null);
    const [delid,setDelid] = useState(null);
    const [showList,setShowList] = useState(0);

    const {auth} = useAuth();
    const {batchname} = useParams();
    const role = auth.role;

    const getScores = async () => {
        const arr = [];
            await axios.get('http://localhost:5000/score/getScores/'+batchname)
                                    .then(res=>{
                                        res.data.forEach((item,index)=>{
                                            arr.push({
                                                sno:index+1,
                                                rollno: item.rollno,
                                                fullname: item.fullname,
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
                                        setUsers(arr);
                                    })
                                    .catch(err=>{
                                        console.error(err);
                                    })
    }

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
                        // console.log("deleted");
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
                                <th key={item.id}>
                                    <div className="flex flex-row justify-evenly">
                                        <h2 className="inline">{item.title}</h2>
                                        <BiUpArrowAlt id={item.id} onClick={handleSort} className="" style={headId===item.id ? style : {} }/>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Users.map((user,index)=>(
                            <tr key={user.rollno} className={index%2!==0?"tbody-row bg-[#f5f5f5]":"tbody-row"}>
                                <td>{user.sno}</td>
                                <td id={user.rollno} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    <div className="relative">
                                        <p className="inline">{user.rollno}</p>
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
                {/* <button className="inline float-right bg-amber-300 rounded-md px-3 py-1 md:px-6 md:py-2 mb-1">
                    Add a User
                </button> */}
            </div>
            {/* <Contactus /> */}
        </div>
    );
};

export default LeaderBoard;