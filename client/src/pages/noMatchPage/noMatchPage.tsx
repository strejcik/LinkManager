import React from 'react';
import { NavLink } from 'react-router-dom';
import './noMatchPage.css';
const NoMatchPage = () => {
    return (
        <>
        <div className="wrapper404">
            <div className="noise"></div>
                <div className="overlay"></div>
                <div className="terminal">
                <h1>Error <span className="errorcode">404</span></h1>
                <p className="output">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
                <p className="output">Please try to <NavLink to="/">[return to the homepage]</NavLink></p>
                <p className="output">Good luck.</p>
            </div>
        </div>
        </>
    );
};

export default NoMatchPage;