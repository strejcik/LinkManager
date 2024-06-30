import React from 'react';
import { Outlet } from "react-router-dom";
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