import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken } from "../../hooks/useRefreshToken";
import { useAuth } from "../../hooks/useAuth";

const UserStatus = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        !auth?.token ? verify() : setIsLoading(false);
    }, []);

    const verify = async () => {
        try {
            await refresh();
        }
        catch (err) {
        }
        finally {
           setIsLoading(false);
        }
    }

    return (
        <>
            { !isLoading
                ? <Outlet />
                : <p>Loading...</p>
            }
        </>
    )
}

export default UserStatus;