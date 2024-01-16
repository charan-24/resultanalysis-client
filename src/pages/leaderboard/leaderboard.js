import React, { useState } from "react";
import Navbar from '../../layouts/navbar';
import { BsSortNumericDown,BsSortNumericUpAlt } from "react-icons/bs";
import './leaderboard.css';
import { Users } from "./leaderboarddata";
function LeaderBoard(){
    return(
        <div>
            <Navbar/>
            <div>
                {/* <div className="flex flex-row justify-between py-6">
                    <h1 className="text-3xl font-bold text-center">LeaderBoard</h1>
                    <div>
                        <CiMenuKebab className="text-4xl"/>
                    </div>
                </div> */}
                <table className="w-full">
                    <thead>
                        <tr className="thead-row">
                            <th>
                                <div className="relative">
                                    <h2 className="inline">S.No</h2>
                                    <BsSortNumericDown className="absolute right-1 top-1/4"/>
                                </div>
                            </th>
                            <th>
                                <div className="relative">
                                    <h2 className="inline">Name</h2>
                                    <BsSortNumericDown className="absolute right-1 top-1/4"/>
                                </div>
                            </th>
                            <th>
                                <div className="relative">
                                    <h2 className="inline">College</h2>
                                    <BsSortNumericDown className="absolute right-1 top-1/4"/>
                                </div>
                            </th>
                            <th>
                                <div className="relative">
                                    <h2 className="inline">HackerRank</h2>
                                    <BsSortNumericDown className="absolute right-1 top-1/4"/>
                                </div>
                            </th>
                            <th>
                                <div className="relative">
                                    <h2 className="inline">LeetCode</h2>
                                    <BsSortNumericDown className="absolute right-1 top-1/4"/>
                                </div>
                            </th>
                            <th>
                                <div className="relative">
                                    <h2 className="inline">CodeChef</h2>
                                    <BsSortNumericDown className="absolute right-1 top-1/4"/>
                                </div>
                            </th>
                            <th>
                                <div className="relative">
                                    <h2 className="inline">CodeForces</h2>
                                    <BsSortNumericDown className="absolute right-1 top-1/4"/>
                                </div>
                            </th>
                            <th>
                                <div className="relative">
                                    <h2 className="inline">Spoj</h2>
                                    <BsSortNumericDown className="absolute right-1 top-1/4"/>
                                </div>
                            </th>
                            <th>
                                <div className="relative">
                                    <h2 className="inline">Total</h2>
                                    <BsSortNumericDown className="absolute right-1 top-1/4"/>
                                </div>
                            </th>
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