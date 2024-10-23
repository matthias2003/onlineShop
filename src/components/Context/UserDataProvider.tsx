import {createContext, Dispatch, SetStateAction, useState} from "react";
import avatar from "../../assets/avatars/avatar.svg";

interface UserDataInterface {
    userData: any
    setUserData: Dispatch<SetStateAction<any>> //TODO: FIX INTERFACE
}

const defaultUserInfo = {
    name:"Admin",
    surname:"Adminowski",
    email:"admin@gmail.com",
    profilePicture: avatar
}

export const UserDataContext = createContext<UserDataInterface>({ userData: {}, setUserData: () => {}})

export const UserDataProvider = ({ children }:any) => {
    const [ userData, setUserData ] = useState(defaultUserInfo)
    return(
        <UserDataContext.Provider value={{ userData, setUserData }} >
            {children}
        </UserDataContext.Provider>
)
}