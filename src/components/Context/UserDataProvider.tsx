import { createContext, useEffect, useState } from "react";
import { UserDataContextTypes, UserData, PayloadProps } from "../../utilities/interfaces";
import { jwtDecode } from "jwt-decode";
import { getUserData } from "../../requests";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import avatar from "../../assets/avatars/avatar.svg";

const defaultUserInfo = {
    name:"Admin",
    surname:"Adminowski",
    email:"admin@gmail.com",
    profilePicture: avatar
};

export const UserDataContext = createContext<UserDataContextTypes>({
    userData: defaultUserInfo,
    setUserData: () => {},
});

export const UserDataProvider = ({ children }:any) => {
    const { auth } = useAuth();
    const [ userData, setUserData ] = useState<UserData>(defaultUserInfo);
    const { id } = jwtDecode<PayloadProps>(auth.token);

    const { data } = useQuery<UserData, Error>({
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
    );
};