import { useAuth } from "./useAuth";
import { getNewToken } from "../requests";

export const useRefreshToken = () => {
    const { setAuth } = useAuth();

    return async () => {
        const data = await getNewToken();
        setAuth({token: data.accessToken});
        return data.accessToken;
    };
}