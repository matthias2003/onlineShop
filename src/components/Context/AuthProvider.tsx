import { createContext, useState } from "react";
import { AuthContextInterface, AuthState } from "../../utilities/interfaces";

export const AuthContext = createContext<AuthContextInterface>({ auth: {token:""}, setAuth: () => {}})

export const AuthProvider = ({ children }:any) => {
    const [ auth, setAuth ] = useState<AuthState>({token:""})
    return(
        <AuthContext.Provider value={{ auth, setAuth }} >
            {children}
        </AuthContext.Provider>
    )
}