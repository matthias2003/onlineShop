import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const AuthGate = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
       auth?.token ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
    );
}

