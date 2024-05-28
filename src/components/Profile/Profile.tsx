import { logoutUser } from "../../requests";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

function Profile() {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const logoutHandler = () => {
        logoutUser();
        setAuth({});
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
