import React, {useState, useEffect, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";





interface IMyProps {
    filteredLinks: Array<any>,
    handleRemove: (e, id) => void
}


const ManageLinkItem: React.FC<IMyProps> = (props: IMyProps) => {
    const location = useLocation();
    const navigate = useNavigate();


    let handleClick = (id) => {
        navigate(`${location.pathname + '/edit/' + id}`);
    }

    return (
        <>
        
         {props.filteredLinks.length > 0 && props.filteredLinks.map((link, i) => (
            <div key={link.id} className={'managelinkitem'} onClick={() =>{ handleClick(link.id); }}>
                                <button className={'removeLinkItem'} onClick={(e) => props.handleRemove(e, link.id)}>✗</button>
                <p >{link.originalLink}</p>
            </div>
            ))}
        </>
    )
}


export default memo(ManageLinkItem);