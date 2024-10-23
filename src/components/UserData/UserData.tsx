import { Outlet } from 'react-router-dom';
import { UserDataProvider } from "../Context/UserDataProvider";

const UserData = () => {
    return (
        <UserDataProvider>
            <Outlet />
        </UserDataProvider>
    );
};

export default UserData;