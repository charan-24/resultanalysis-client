import React from "react";
import { SiHackerrank, SiLeetcode, SiCodechef, SiCodeforces,SiLinkedin,SiGithub} from "react-icons/si";
// import { Link } from "react-router-dom";
function CodingProfiles(){
    return(
        <div className="lg:w-3/4 lg:mx-auto">
            <form action="http://localhost:5000/coding-profiles" method="post">
                <p className="block font-bold text-[20px] lg:text-[30px] w-3/4 m-1 mx-auto">Coding profiles</p>
                <ul className="w-3/4 mx-auto">
                    <li className="mt-2">
                        <SiHackerrank className="inline text-[1.5rem] sm:text-[2rem] lg:text-[3rem]"/>
                        <input type="text" id="hackeruname" name="hackeruname" className="focus:outline-none ml-2 w-3/4 sm:w-[500px] border-b-2 border-gray-300 sm:text-[16px] text-[12px]" placeholder="please enter your HackerRank username"/>
                    </li>
                    <li className="mt-2">
                        <SiLeetcode className="inline text-[1.5rem] sm:text-[2rem] lg:text-[3rem]"/>
                        <input type="text" id="leetuname" name="leetuname" className="focus:outline-none ml-2 w-3/4 sm:w-[500px] border-b-2 border-gray-300 sm:text-[16px] text-[12px]" placeholder="please enter your LeetCode username"/>
                    </li>
                    <li className="mt-2">
                        <SiCodechef className="inline text-[1.5rem] sm:text-[2rem] lg:text-[3rem]"/>
                        <input type="text" id="chefuname" name="chefuname" className="focus:outline-none ml-2 w-3/4 sm:w-[500px] border-b-2 border-gray-300 sm:text-[16px] text-[12px]" placeholder="please enter your CodeChef username"/>
                    </li>
                    <li className="mt-2">
                        <SiCodeforces className="inline text-[1.5rem] sm:text-[2rem] lg:text-[3rem]"/>
                        <input type="text" id="forceuname" name="forceuname" className="focus:outline-none ml-2 w-3/4 sm:w-[500px] border-b-2 border-gray-300 sm:text-[16px] text-[12px]" placeholder="please enter your CodeForces username"/>
                    </li>
                </ul>               
                <p className="block font-bold text-[20px] lg:text-[30px] w-3/4 m-1 mx-auto mt-4 lg:mt-8">Social Profiles</p>
                <ul className="w-3/4 mx-auto">
                    <li>
                        <SiLinkedin className="inline text-[1.5rem] sm:text-[2rem] lg:text-[3rem]"/>
                        <input type="text" id="leetuname" name="leetuname" className="focus:outline-none ml-2 w-3/4 sm:w-[500px] border-b-2 border-gray-300 sm:text-[16px] text-[12px]" placeholder="please paste your linkedin profile URL"/>
                    </li>
                </ul>
                <p className="block font-bold text-[20px] lg:text-[30px]  w-3/4 m-1 mx-auto mt-4 lg:mt-8">Development Profiles</p>
                <ul className="w-3/4 mx-auto">
                    <li>
                    <SiGithub className="inline text-[1.5rem] sm:text-[2rem] lg:text-[3rem]"/>
                    <input type="text" id="leetuname" name="leetuname" className="focus:outline-none ml-2 w-3/4 sm:w-[500px] border-b-2 border-gray-300 sm:text-[16px] text-[12px]" placeholder="please paste your github profile URL"/>
                    </li>
                </ul>
                <button className="block bg-[#778379] text-white w-[150px] h-[43px] rounded-md m-4 mx-auto font-montserrat font-bold" type="submit">
                    Confirm
                </button>
            </form>
        </div>
    );
};

export default CodingProfiles;