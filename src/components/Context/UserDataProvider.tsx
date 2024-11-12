import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import avatar from "../../assets/avatars/avatar.svg";
import { jwtDecode } from "jwt-decode";
import {getUserData} from "../../requests";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";


interface UserInfo {
    name: string;
    surname: string;
    email: string;
    profilePicture: string;
}

interface UserDataInterface {
    userData: UserInfo;
    setUserData: Dispatch<SetStateAction<UserInfo>>;
}


const defaultUserInfo = {
    name:"Admin",
    surname:"Adminowski",
    email:"admin@gmail.com",
    profilePicture: avatar
}

interface payloadProps {
    id:string,
    iat:number,
    exp:number
}

interface fetchedDataProps {
    name: string,
    surname: string,
    email: string,
    profilePicture:string
}

export const UserDataContext = createContext<UserDataInterface>({
    userData: defaultUserInfo,
    setUserData: () => {},
})

export const UserDataProvider = ({ children }:any) => {
    const { auth } = useAuth();
    const fetchUserInfo = async (id:string) => {
        try {
            const data = await getUserData(id, auth.token);
            setUserData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        const { id }:payloadProps = jwtDecode(auth.token);
        fetchUserInfo(id)
    },[])

    const [ userData, setUserData ] = useState(defaultUserInfo)
    return(
        <UserDataContext.Provider value={{ userData, setUserData }} >
            {children}
        </UserDataContext.Provider>
)
}