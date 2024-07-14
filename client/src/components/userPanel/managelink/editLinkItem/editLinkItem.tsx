import React, { useContext, useEffect, useRef, useState } from "react";
import {useParams, useNavigate} from "react-router-dom";
import { editLinkRequest, getLinkRequest } from '../../../../services/auth/editLinkService.tsx'
import AuthContext from '../../../../context/authContext.tsx';
import AuthCheck from '../../../../services/auth/authCheck.tsx';
import linkValidator from '../../AddLink/linkValidator/linkValidator.tsx';
import ipValidator from '../../AddLink/ipValidator/ipValidator.tsx';



import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Toolbar from "@mui/material/Toolbar";
const drawerWidth = 240;



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
    const navigateToExternalUrl = (url: any, shouldOpenNewTab: boolean = true) =>
        shouldOpenNewTab ? window.open(url, "_blank") : window.location.href = url;

    return (
        <>
       <Box>
        <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `240px`, md: `240px`, lg:`240px`, xl:`240px`}, '& .MuiTextField-root': { mt: 1, mb:1,  width: '25ch' }}}
        >
        <Toolbar />
        <TextField
          id="outlined-error-helper-text"
          label="Original Link"
          style = {{width: `100%`}}
          disabled={disabled}
          value = {disabled? data[0]?.originalLink : inputData.originalLink}
          unselectable={'off'}
          sx={{userSelect: `all`}}
          name={'originalLink'} 
          onChange={(e) => { e.target.value = e.target.value.replace(/\s/g, '');  dataChange(e)}}
        />
        <TextField
          id="outlined-error-helper-text"
          label="Shortened Link"
          style = {{width: `100%`}}
          disabled
          value={`${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':5000' : ''}/l/${data[0].shortenedLink}`}
          sx={{userSelect: `all`}}
          onClick={() => navigateToExternalUrl(`${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':5000' : ''}/l/${data[0].shortenedLink}`)}
        />
        <TextField
          id="outlined-error-helper-text"
          label="Category"
          style = {{width: `100%`}}
          disabled={disabled}
          value={disabled ? data[0].category : inputData.category}
          sx={{userSelect: `all`}}
          name={'category'} 
          onChange={(e) => { e.target.value = e.target.value.replace(/\s/g, '');  dataChange(e)}}
        />
        <TextField
          id="outlined-error-helper-text"
          label="Description"
          style = {{width: `100%`}}
          disabled={disabled}
          value={disabled ? data[0].description : inputData.description}
          sx={{userSelect: `all`}}
          name={'description'} 
          onChange={dataChange}
        />
        <TextField
          disabled={disabled}
          id="outlined-error-helper-text"
          label="AllowedIP(s)"
          style = {{width: `100%`}}
          sx={{userSelect: `all`}}
          value={disabled ? Array.from(data[0].allowedips).toString() : allowedIp}
          name={'allowedips'} 
          onChange={(e) => { e.target.value = e.target.value.replace(/\s/g, ''); setChange(e) }}
        />
        {disabled && !Clicked &&
            <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2}}
            color={'primary'}
            onClick={() => {editData(); handleDisabledInput();}}
        >
            Edit Data &#x270E;
            </Button>}
        
            {!disabled && 
            <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2}}
            color={'primary'}
            onClick={() => { updateState(); Clicking();}}
        >
            Confirm Changes &#x2705;
            </Button>}

            {Clicked && editLinkResponse && linkValidatorStatus && ipalidatorStatus &&
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2}}
            onClick={Clicking}
            color={'success'}
        >
            Link Editted &#x2705;
            </Button>}

            {Clicked && (!editLinkResponse || !linkValidatorStatus || !ipalidatorStatus) &&
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2}}
            onClick={Clicking}
            color={'error'}
        >
            Incorrect data input ✗
            </Button>}
      </Box>
    </Box>
        </>
    )
}


export default EditLinkItem;