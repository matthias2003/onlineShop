import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken } from "../../hooks/useRefreshToken";
import { useAuth } from "../../hooks/useAuth";

const UserStatus = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        let isMounted = true;
        const verify = async () => {
            try {
                await refresh();
            }
            catch (err) {
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.token ? verify() : setIsLoading(false);
        return () => { isMounted = false };
    }, []);

    return (
        <>
            <Outlet />
        </>
    )
}

export default UserStatus;