import React, { useState } from "react";
import Navbar from '../../layouts/navbar';
import Contactus from "../../layouts/contactus";
import './leaderboard.css';
import { Users } from "./leaderboarddata";
function LeaderBoard(){
    const [outSideClick,setOutSideClick] = useState(0);
    const handleOutSideClick = ()=>{
        setOutSideClick(0);
    }
    return(
        <div onClick="">
            <Navbar outSideClick={outSideClick}/>
            <div>
                <table className="w-full">
                    <thead>
                        <tr className="thead-row">
                            <th>S.No</th>
                            <th>Name</th>
                            <th>College</th>
                            <th>HackerRank</th>
                            <th>LeetCode</th>
                            <th>CodeChef</th>
                            <th>CodeForces</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Users.map((user,index)=>(
                            <tr key={user.sno} className={index%2!==0?"tbody-row bg-[#f5f5f5]":"tbody-row"}>
                                <td>{user.sno}</td>
                                <td>{user.name}</td>
                                <td>{user.college}</td>
                                <td>{user.hacker}</td>
                                <td>{user.leet}</td>
                                <td>{user.chef}</td>
                                <td>{user.force}</td>
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

export default LeaderBoard;