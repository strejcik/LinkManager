import React from "react";
import { NavLink } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {

    const setActive = ({ isActive }) =>
        isActive ? "active" : "";
    return (
        <>
        <div className="sidebar">
            <NavLink to="addlink" className={setActive}>Add link &#43;</NavLink>
            <NavLink to="managelink" className={setActive}>Manage Link &#9881;</NavLink>
            <NavLink to="linkviews" className={setActive}>Link Views &#128065;</NavLink>
        </div>
        </>
    );
};

export default Sidebar;