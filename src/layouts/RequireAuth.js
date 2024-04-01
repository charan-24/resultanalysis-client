import React, { useContext } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const RequireAuth = () =>{
    const { auth } = useContext(AuthContext);
    const location = useLocation();
    console.log(auth);

    return(
        auth.rollno
        ?<Outlet />
        :auth.username
        ?<Outlet />
        :<Navigate to="/" state={{from: location}} replace/>
    );
};

export default RequireAuth;