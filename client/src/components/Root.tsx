import React, {useEffect, useContext} from "react";
import { Outlet} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authContext from '../context/authContext.tsx';
import authCheck from '../services/auth/authCheck.tsx';

const OutletComponent = () => {
    return (
        <Outlet />
    )
}

function Root() {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(authContext);
    useEffect(() => {
        authCheck(navigate, setAuth);
    },[auth]);
    return (
        <>
            <OutletComponent/>
        </>
    )
}

export default Root;