import { useContext } from "react";
import { AuthContext } from "../components/Context/AuthProvider";

export const useAuth = () => {
    return useContext(AuthContext);
}