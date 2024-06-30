import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface IMyProps {
    filteredLinks: Array<any>,
}


const ManageLinkItem: React.FC<IMyProps> = (props: IMyProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    let handleClick = (id) => {
        navigate(`${location.pathname + '/edit/' + id}`);
    }

    return (
        <>
         {props.filteredLinks.map((link, i) => (
            <div key={link.id} className={'managelinkitem'} onClick={() => handleClick(link.id)}>
                <p>{link.originalLink}</p>
                {/* <p>ShortenedLink: {link.shortenedLink}</p>
                <p>Category: {link.category}</p>
                <p>Description: {link.description}</p>
                <p>Allowedips: {[link.allowedips.length > 1? `${link.allowedips},` : `${link.allowedips}`]}</p> */}
            </div>
            ))}
        </>
    )
}


export default ManageLinkItem;