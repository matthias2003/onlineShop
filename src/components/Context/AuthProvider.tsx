import {createContext, Dispatch, SetStateAction, useState} from "react";

interface AuthContextInterface {
    auth: any
    setAuth: Dispatch<SetStateAction<any>> //TODO: FIX INTERFACE
}

export const AuthContext = createContext<AuthContextInterface>({ auth: {}, setAuth: () => {}})
export const AuthProvider = ({ children }:any) => {
    const [ auth, setAuth ] = useState({})
    return(
        <AuthContext.Provider value={{ auth, setAuth }} >
            {children}
        </AuthContext.Provider>
    )
}