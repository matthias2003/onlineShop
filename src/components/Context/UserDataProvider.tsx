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

export const UserDataContext = createContext<UserDataInterface>({
    userData: defaultUserInfo,
    setUserData: () => {},
})

export const UserDataProvider = ({ children }:any) => {
    const { auth } = useAuth();
    const [ userData, setUserData ] = useState<UserInfo>(defaultUserInfo)
    const { id } = jwtDecode<payloadProps>(auth.token);

    const { data } = useQuery<UserInfo, Error>({
        queryKey: ["userData", id],
        queryFn: () => getUserData(id, auth.token),
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        if (data) {
            setUserData(data);
        }
    }, [data]);

    return(
        <UserDataContext.Provider value={{ userData, setUserData }} >
            {children}
        </UserDataContext.Provider>
)
}