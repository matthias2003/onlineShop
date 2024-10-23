import { useContext } from "react";
import { UserDataContext } from "../components/Context/UserDataProvider";

export const useUserData = () => {
    return useContext(UserDataContext);
}