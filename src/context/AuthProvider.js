import React, { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    // const server = "https://dynamics-server.cyclic.app/";
    const server = "http://localhost:5000";

    return(
        <AuthContext.Provider value={{auth,setAuth,server}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;