import React from "react";
import Navbar from "../../layouts/navbar";
import { Batches } from "./dashboardData";
function Dashboard () {
    return(
        <div>
            <Navbar />
                <div className="flex flex-row flex-wrap md:justify-around lg:justify-normal">
                    {Batches.map((batch)=>(
                        <div key={batch.id} className="w-full md:w-1/3 lg:w-1/4 h-[120px] border-2 border-black m-4 px-4 py-3 flex flex-col justify-between rounded-md">
                        <h1 className="font-bold text-2xl">{batch.name}</h1>
                        <div className="flex flex-row justify-between">
                            <p className="text-[13px] text-gray-500 font-semibold">{batch.status}</p>
                            <button className="bg-gray-200 font-semibold px-4 rounded-sm text-lg">open</button>
                        </div>
                    </div>
                    ))}
                </div>
        </div>
    );
};

export default Dashboard;