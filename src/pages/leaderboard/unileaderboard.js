import React, { useEffect, useState } from "react";
import axios from "axios";
import { Headings } from "./unileaderboarddata";
import Navbar from "../../layouts/navbar";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Unileaderboard = () => {
    const {auth} = useAuth();
    const rollno = auth.rollno;
    const [Users,setUsers] = useState([]);
    const getUniData = async ()=>{
        let arr = [],finalarr=[];
        await axios.get('https://resultanalysis-server.onrender.com/score/getAllBatchScores')
                    .then(res=>{
                        const temp = res.data;
                        arr = temp.map((item) => item.rollno)
                                    .filter(
                                        (value, index, current_value) => current_value.indexOf(value) === index
                                    );
                        for(let i=0;i<arr.length;i++){
                            const found = temp.find(item => item.rollno === arr[i]);
                            if(found){
                                finalarr.push(found);
                            }
                        }
                        finalarr.sort((a,b)=>b.total-a.total);
                        console.log(finalarr)
                        setUsers([...finalarr]);
                    })
    }
    useEffect(()=>{
        getUniData();
        // console.log(Users);
    },[])
    return(
        <div>
            <Navbar/>
            <div>
                <h1 className="text-center font-bold text-[50px]">Global LeaderBoard</h1>
                <table className="w-full">
                    <thead>
                        <tr className="thead-row" >
                            {Headings.map((item)=>(
                                <th key={item.id}>
                                    <div className="flex flex-row justify-evenly">
                                        <h2 className={"inline"}>{item.title}</h2>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Users.map((user,index)=>(
                            <tr key={user.rollno} className={user.rollno===rollno?"tbody-row bg-green-200":index%2!==0?`tbody-row bg-[#f5f5f5]` :"tbody-row"}>
                                <td>{index+1}</td>
                                <td id={user.rollno} >
                                    {user.rollno}
                                </td>
                                <td><Link to={`/my-profile/`+user.rollno}>{user.fullname}</Link></td>
                                <td>{user.total}</td>
                            </tr>
                        ))}                    
                    </tbody>
                </table>
            </div>
            {/* <Contactus /> */}
        </div>
    );
};

export default Unileaderboard;