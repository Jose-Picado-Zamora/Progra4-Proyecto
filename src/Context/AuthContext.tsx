import { ReactNode } from "@tanstack/react-router";
import { createContext } from "react";
import { useState } from "react";


export const AuthContext = createContext({})


interface type{

    children: ReactNode;
};


export const AuthProvider = ({ children }: type) => {

    const [project, setProjects] = useState(null);

    return (
        <AuthContext.Provider value={{ project, setProjects }}>
            {children}
        </AuthContext.Provider>

    )
}