import React, { createContext, useState } from "react";

const ServerContext = createContext({});

export const ServerProvider = ({children}) => {
    const server = "https://dynamics-server.cyclic.app/"
    return(
        <ServerContext.Provider value={server}>
            {children}
        </ServerContext.Provider>
    )
};

export default AuthContext;