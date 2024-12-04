import { logoutUser } from "../requests";
import { useAuth } from "./useAuth";

export const useLogout = () => {
    const { setAuth } = useAuth();

    return async () => {
        await logoutUser();
        setAuth({token:""});
    };
}