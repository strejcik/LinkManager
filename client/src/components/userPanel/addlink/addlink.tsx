import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkValidator from './linkValidator/linkValidator.tsx';
import IpValidator from './ipValidator/ipValidator.tsx';
import { AddLinkRequest } from '../../../services/auth/addLinkService.tsx'
import AuthContext from '../../../context/AuthContext.tsx';
import AddLinkContext from '../../../context/AddLinkContext.tsx';
import './addlink.css';

import AuthCheck from '../../../services/auth/authCheck.tsx';





const AddLink = () => {

    const isEmpty = (value:object) => {
        return (value == null || Object.keys(value).length === 0);
    }
    const Clicking =()=>{
        setState(!Clicked)
    }




    let userData: {
        links: Array<string>;
        category: string;
        description: string;
        allowedips: Array<string>;
    };


    const [link, setLink] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [allowedip, setAllowedIp] = useState<string>('');
    const [Clicked,setState] = useState<boolean>(false);
    const [linkValidatorStatus, setLinkValidatorStatus] = useState<boolean>(false);
    const [ipalidatorStatus, setIpValidatorStatus] = useState<boolean>(false);
    const {auth, setAuth } = useContext(AuthContext);
    const { setAddLinkResponse, addLinkResponse } = useContext(AddLinkContext);
    const navigate = useNavigate();




    useEffect(() => {
        AuthCheck(navigate, setAuth);
    },[auth]);

      useEffect(() => {
        if (Clicked) setTimeout(() => {setState(false); setAddLinkResponse(false);}, 3000)
    }, [Clicked, addLinkResponse]);

    
    const handleSubmit = async(e) => {
        e.preventDefault();
        let allowAllIp = {status:true, data:[]};
        let linkData = LinkValidator(link);
        let ipData = allowedip.length === 0? allowAllIp : IpValidator(allowedip);
        if( allowedip.length === 0) {
            if( linkData.status) {
                setLinkValidatorStatus(true);
                userData = {
                    links: linkData.data,
                    category,
                    description,
                    allowedips: []
                };
            } else {
                setLinkValidatorStatus(false);
            }
            
        } else {
            if( linkData.status && ipData.status ) {
                setLinkValidatorStatus(true);
                setIpValidatorStatus(true);
                userData = {
                    links: linkData.data,
                    category,
                    description,
                    allowedips: ipData.data
                };
    
            } else {
                setLinkValidatorStatus(false);
                setIpValidatorStatus(false);
            }
        }

        if(!isEmpty(userData)) {
            try {
                await AddLinkRequest(userData, setAddLinkResponse);
                setLink(''); setCategory(''); setDescription(''); setAllowedIp('');
            } catch (error) {
                console.error(error.message || 'An error occurred during adding link(s)');
                console.log(error);
            }
        }

        

        
    }


    return (
        <>
        <div className="addlinkcontent">
            <div className="wrapper addlinkwrapper">
                <form onSubmit={handleSubmit}>
                    <h3 className={'addsign'}>+</h3>
                    
                    <div className={'errflexwrapper'}>
                        {link.length === 0 && Clicked && !addLinkResponse? <button disabled className={Clicked && link.length === 0? 'failaddedlink errstyle': 'failaddedlinkrem'}>Link(s) can not be empty ✗</button> : <></>}
                        {Clicked && !LinkValidator(link).status && !addLinkResponse && <button disabled className={Clicked ? 'failaddedlink errstyle': 'failaddedlinkrem'}>Link(s) validation failed ✗</button>}
                        {Clicked && !IpValidator(allowedip).status && !addLinkResponse && <button disabled className={Clicked ? 'failaddedlink errstyle': 'failaddedlinkrem'}>IP(s) validation failed ✗</button>}
                        {category.length === 0 && Clicked ? !addLinkResponse && <button disabled className={Clicked && category.length === 0? 'failaddedlink errstyle': 'failaddedlinkrem'}>Category can not be empty ✗</button> : <></>}
                        {description.length === 0 && Clicked ? !addLinkResponse && <button disabled className={Clicked && description.length === 0? 'failaddedlink errstyle': 'failaddedlinkrem'}>Description can not be empty ✗</button> : <></>}
                   

                        {Clicked && addLinkResponse && <button className={Clicked && addLinkResponse?'addedlink errstyle': 'addedlinkrem'}>Added link &#10003;</button>}
                    </div>
                    
                    
                    
                   



                    <div className="input-box">
                        <input type="string" placeholder="Link(s)" value={link} onChange={(e) => setLink(e.target.value)} required />
                    </div>
                    <div className="input-box">
                        <input type="string" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value.replace(/\s/g, ''))} required />
                    </div>

                    <div className="input-box">
                        <input type="string" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>

                    <div className="input-box">
                        <input type="string" placeholder="AllowedIP(s), leave blank if all IP(s) are allowed" value={allowedip} onChange={(e) =>{ e.target.value = e.target.value.replace(/\s/g, ''); setAllowedIp(e.target.value)}}/>
                    </div>

                    
                    <button type="submit" onClick={Clicking}>Submit &#x2705;</button>
                    
                </form>
            </div>
        </div>
        </>
    );
};

export default AddLink;