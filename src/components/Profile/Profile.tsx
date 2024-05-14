import { logoutUser } from "../../requests";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

    const logoutHandler = () => {
        logoutUser();
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
