import React, { useContext, useEffect, useState } from "react";
import {useParams, useNavigate} from "react-router-dom";
import { editLinkRequest, getLinkRequest } from '../../../../services/auth/editLinkService.tsx'
import AuthContext from '../../../../context/authContext.tsx';
import AuthCheck from '../../../../services/auth/authCheck.tsx';
import linkValidator from '../../AddLink/linkValidator/linkValidator.tsx';
import ipValidator from '../../AddLink/ipValidator/ipValidator.tsx';
import './editLinkItem.css';

const EditLinkItem  = () => {
    const { id } = useParams();
    const {auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const isEmpty = (value:object) => {
        return (value == null || Object.keys(value).length === 0);
    }



    const [data, setData] = useState<[d]>([{
        originalLink: '',
        shortenedLink: '',
        category: '',
        description: '',
        allowedips: [],
    }]);

    let userData: {
        originalLink: string;
        category: string;
        description: string;
        allowedips: Array<string>;
    };

    const [disabled, setDisabled] = useState(true);

    function handleDisabledInput() {
      setDisabled(!disabled);
    }

    const Clicking =()=>{
        setState(!Clicked)
    }


    const [linkValidatorStatus, setLinkValidatorStatus] = useState<boolean>(false);
    const [ipalidatorStatus, setIpValidatorStatus] = useState<boolean>(false);
    const [editLinkResponse, setEditLinkResponse] = useState<boolean>(false);
    const [Clicked,setState] = useState<boolean>(false);
    const [inputData, setInputData] = useState({originalLink: data[0].originalLink, category: data[0].category, description: data[0].description, allowedips: data[0].allowedips})
    const [allowedIp, setAllowedIp]: any= useState<string>("");
    interface d {
        originalLink: string,
        shortenedLink: string,
        category: string,
        description: string,
        allowedips: []
      }


    useEffect(() => {
        AuthCheck(navigate, setAuth);
    },[auth]);

    useEffect(() => {
        getLinkRequest(id, setData);
    },[Clicked]);

    useEffect(() => {
        if (Clicked) setTimeout(() => {setState(false); setEditLinkResponse(false);}, 3000)
    }, [Clicked, editLinkResponse]);



    const dataChange = (e) => {
        setInputData(prevdata => ({...prevdata, [e.target.name]: e.target.value}));

    }

    const setChange = (e) => {
        setAllowedIp(e.target.value);
    }

    const editData = () => {
        setInputData(prevdata => ({...prevdata, originalLink: data[0].originalLink, category: data[0].category, description: data[0].description}))
        setAllowedIp(([ ...data[0].allowedips]))
        
        !disabled && setInputData(prevdata => ({...prevdata, originalLink: '', category: '', description: ''}));
        !disabled &&setAllowedIp("");
    }

    const updateState = async() => {

        let allowAllIp = {status:true, data:[]};
        let linkData = linkValidator(data[0].originalLink);
        let ipData = allowedIp.length === 0? allowAllIp : ipValidator(allowedIp);




        if( allowedIp.length === 0) {
            if( linkData.status) {
                setLinkValidatorStatus(true);
                setIpValidatorStatus(true);
                userData = {
                    originalLink: inputData.originalLink.length===0? data[0].originalLink : inputData.originalLink,
                    category: inputData.category.length===0? data[0].category : inputData.category,
                    description: inputData.description.length ===0? data[0].description : inputData.description,
                    allowedips: ipData.data,
                };
            } else {
                setLinkValidatorStatus(false);
                setIpValidatorStatus(false);
            }
            
        } else {
            if( linkData.status && ipData.status ) {
                setLinkValidatorStatus(true);
                setIpValidatorStatus(true);
                userData = {
                    originalLink: inputData.originalLink.length===0? data[0].originalLink : inputData.originalLink,
                    category: inputData.category.length===0? data[0].category : inputData.category,
                    description: inputData.description.length ===0? data[0].description : inputData.description,
                    allowedips: ipData.data
                };
            } else {
                setLinkValidatorStatus(false);
                setIpValidatorStatus(false);
            }
        }

        setAllowedIp('');
        setInputData(prevdata => ({...prevdata, originalLink: '', category: '', description: ''}))
        !disabled && handleDisabledInput();


        if(!isEmpty(userData)) {
            try {
                await editLinkRequest(id, userData, setEditLinkResponse);
            } catch (error) {
                console.error(error.message || 'An error occurred during adding link(s)');
            }
        }
    }

    return (
        <>
        <div className={'editlinkcontent'}>
            <div className={'wrapper editlinkwrapper'}>
                <h3 className={'editsign'}>&#9998;</h3>
                <div className={'errflexwrapper'}>
                    {editLinkResponse===true && linkValidatorStatus && ipalidatorStatus && <button disabled className={Clicked && editLinkResponse?'addedlink': 'addedlinkrem'}>Link has been edited &#10003;</button>}
                    {editLinkResponse===false && !linkValidatorStatus && !ipalidatorStatus && <button disabled className={Clicked && !editLinkResponse?'failaddedlink': 'failaddedlinkrem'}>Incorrect data input ✗</button>}
                </div>
                <p className={'originallink'}>Original Link: {data[0].originalLink}</p>
                <p>Shortened Link: <a className={'shortenedlink'} target="_blank" href={`${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':5000' : ''}/l/${data[0].shortenedLink}`}>{`${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':5000' : ''}/l/${data[0].shortenedLink}`}</a></p>
                <p>Category: {data[0].category}</p>
                <p>Description: {data[0].description}</p>
                <p>AllowedIP(s): <a className={'allowedips'}>{[data[0].allowedips.length > 1? `${data[0].allowedips},` : `${data[0].allowedips}`]}</a></p>
                <div className={'flexwrapper'}>
                    <div className={'input-box'}>
                        <input type="text" disabled={disabled} className={'centertextinput'} value={inputData.originalLink} name={'originalLink'} onChange={(e) => { e.target.value = e.target.value.replace(/\s/g, '');  dataChange(e)}} placeholder="Original Link"/>
                    </div>
                    <div className={'input-box'}>
                        <input type="text" disabled={disabled} className={'centertextinput'} value={inputData.category} name={'category'} onChange={(e) => { e.target.value = e.target.value.replace(/\s/g, '');  dataChange(e)}} placeholder="Category"/>
                    </div>
                    <div className={'input-box'}>
                        <input type="text" disabled={disabled} className={'centertextinput'} value={inputData.description} name={'description'} onChange={dataChange} placeholder="Description"/>
                    </div>
                    <div className={'input-box'}>
                        <input type="text" disabled={disabled} className={'centertextinput'} value={allowedIp} name={'allowedips'} onChange={(e) => { e.target.value = e.target.value.replace(/\s/g, ''); setChange(e) }} placeholder="AllowedIP(s)"/>
                    </div>
                    <div className={'input-box'}>
                        <button onClick={() => {editData(); handleDisabledInput();}} className={'editdatabutton'}>Edit Data &#9998;</button>
                    </div>
                </div>
               
                { !disabled && <button onClick={() => { updateState(); Clicking();}}>Confirm Changes &#x2705;</button>}
            </div>
        </div>
        </>
    )
}


export default EditLinkItem;