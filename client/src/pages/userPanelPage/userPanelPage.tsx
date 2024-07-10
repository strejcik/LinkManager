import React from 'react';
import Sidebar from '../../components/UserPanel/Sidebar/Sidebar.tsx'
import { Outlet } from "react-router-dom";






const UserPanelPage = () => {
    return (
        <>
            <Sidebar/>
            <Outlet />
        </>
    );
};

export default UserPanelPage;