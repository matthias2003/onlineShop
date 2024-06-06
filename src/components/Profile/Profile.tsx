import { logoutUser } from "../../requests";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useLogout } from "../../hooks/useLogout";

function Profile() {
    const navigate = useNavigate();
    const logout = useLogout();
    const logoutHandler = async () => {
        await logout();
        navigate("/");
    }
    return(
        <div>
            <h1>PROFILE</h1><br />
            <button onClick={logoutHandler}>Logout</button>
        </div>
    );
}

export default Profile;
