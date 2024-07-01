import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext.tsx';
import Sidebar from '../../components/userPanel/sidebar/sidebar.tsx'
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AuthCheck from '../../services/auth/authCheck.tsx';






const UserPanelPage = () => {
  const {auth, setAuth} = useContext(AuthContext);
  const navigate = useNavigate();
//   useEffect(() => {
//       AuthCheck(navigate, setAuth);
//     },[auth]);
    return (
        <>
            <Sidebar/>
            <Outlet />
        </>
    );
};

export default UserPanelPage;