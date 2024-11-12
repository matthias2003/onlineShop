import { createContext, Dispatch, SetStateAction, useState } from "react";

interface AuthState {
    token: string;
}

interface AuthContextInterface {
    auth: AuthState;
    setAuth: Dispatch<SetStateAction<AuthState>>;
}

export const AuthContext = createContext<AuthContextInterface>({ auth: {token:""}, setAuth: () => {}})

export const AuthProvider = ({ children }:any) => {
    const [ auth, setAuth ] = useState<AuthState>({token:""})
    return(
        <AuthContext.Provider value={{ auth, setAuth }} >
            {children}
        </AuthContext.Provider>
    )
}