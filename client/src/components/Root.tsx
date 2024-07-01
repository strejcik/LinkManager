import React, {useEffect, useContext } from 'react';
import { Outlet, useNavigate} from "react-router-dom";
import AuthContext from '../context/AuthContext.tsx';
import AuthCheck from '../services/auth/authCheck.tsx';
const OutletComponent = () => {
    return (
        <Outlet />
    )
}

function Root() {
    return (
        <>
            <OutletComponent/>
        </>
    )
}

export default Root;