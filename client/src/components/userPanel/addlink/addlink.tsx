import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import linkValidator from './linkValidator/linkValidator.tsx';
import IpValidator from './ipValidator/ipValidator.tsx';
import { addLinkRequest } from '../../../services/auth/addLinkService.tsx'
import AuthContext from '../../../context/authContext.tsx';
import AddLinkContext from '../../../context/addLinkContext.tsx';
import cacheContext from "../../../context/cacheContext.tsx";

import authCheck from '../../../services/auth/authCheck.tsx';


import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


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
    const {auth, setAuth } = useContext(AuthContext);
    const { setAddLinkResponse, addLinkResponse } = useContext(AddLinkContext);
    const { setCache, setViewsCache} = useContext(cacheContext);
    const navigate = useNavigate();




    useEffect(() => {
        authCheck(navigate, setAuth);
    },[auth]);

      useEffect(() => {
        if (Clicked) setTimeout(() => {setState(false); setAddLinkResponse(false);}, 3000)
    }, [Clicked, addLinkResponse]);

    
    const handleSubmit = async(e) => {
        e.preventDefault();
        let allowAllIp = {status:true, data:[]};
        let linkData = linkValidator(link);
        let ipData = allowedip.length === 0? allowAllIp : IpValidator(allowedip);
        if( allowedip.length === 0) {
            if( linkData.status) {
                userData = {
                    links: linkData.data,
                    category,
                    description,
                    allowedips: []
                };
            }
        } else {
            if( linkData.status && ipData.status ) {
                userData = {
                    links: linkData.data,
                    category,
                    description,
                    allowedips: ipData.data
                };
    
            }
        }

        if(!isEmpty(userData)) {
            try {
                await addLinkRequest(userData, setAddLinkResponse, setCache, setViewsCache);
                setLink(''); setCategory(''); setDescription(''); setAllowedIp('');
            } catch (error) {
                console.error(error.message || 'An error occurred during adding link(s)');
            }
        }

        

        
    }
    const drawerWidth = 240;


    const linkValidationErrors = () => {
        if(link.length === 0 && Clicked && !addLinkResponse) {
            return {
                msgType: 'linkIsEmpty',
                errMsg: "Link(s) can not be empty ✗"
            };
        }
        if(Clicked && !linkValidator(link).status && !addLinkResponse) {
            return {
                msgType: 'linkValidation',
                errMsg: "Link(s) validation failed ✗"
            };
        }
    }


    const ipValidationErrors = () => {
        if(Clicked && !IpValidator(allowedip).status && !addLinkResponse) {
            return {
                msgType: 'ipValidation',
                errMsg: "IP(s) validation failed ✗"
            };
        }
    }


    const categoryValidationErrors = () => {
        if(category.length === 0 && Clicked && !addLinkResponse) {
            return {
                msgType: 'categoryIsEmpty',
                errMsg: "Category can not be empty ✗"
            };
        }
    }

    const descriptionValidationErrors = () => {
        if(description.length === 0 && Clicked && !addLinkResponse) {
            return {
                msgType: 'descriptionIsEmpty',
                errMsg: "Description can not be empty ✗"
            };
        }
    }



    return (
        <Box>
        <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `240px`, md: `240px`, lg:`240px`, xl:`240px`}, '& .MuiTextField-root': { mt: 1, mb:1,  width: '25ch' }}}
        >
        <Toolbar />
        <TextField
          error={linkValidationErrors()?.msgType==='linkIsEmpty'? true : false || linkValidationErrors()?.msgType==='linkValidation'? true : false}
          id="outlined-error-helper-text"
          label="Link(s)"
          //helperText={}
          helperText={
            linkValidationErrors()?.msgType==='linkIsEmpty' && linkValidationErrors()?.errMsg || 
            linkValidationErrors()?.msgType==='linkValidation' && linkValidationErrors()?.errMsg || 
            "Enter links separating them with whitespace or comma"}
          style = {{width: `100%`}}
          autoFocus
          required={true}
          value = {link}
          onChange={(e) => setLink(e.target.value)}
        />
        <TextField
          error={categoryValidationErrors()?.msgType==='categoryIsEmpty'? true : false}
          id="outlined-error-helper-text"
          label="Category"
          helperText={
            categoryValidationErrors()?.msgType==='categoryIsEmpty' && categoryValidationErrors()?.errMsg || 
            "Enter category"}
          style = {{width: `100%`}}
          required={true}
          value = {category}
          onChange={(e) => setCategory(e.target.value.replace(/\s/g, ''))}
        />
        <TextField
          error={descriptionValidationErrors()?.msgType==='descriptionIsEmpty'? true : false}
          id="outlined-error-helper-text"
          label="Description"
          helperText={
            descriptionValidationErrors()?.msgType==='descriptionIsEmpty' && descriptionValidationErrors()?.errMsg || 
            "Enter description"}
          style = {{width: `100%`}}
          required={true}
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          error={ipValidationErrors()?.msgType==='ipValidation'? true : false}
          id="outlined-error-helper-text"
          label="AllowedIP(s)"
          helperText={ipValidationErrors()?.msgType==='ipValidation'? ipValidationErrors()?.errMsg : "Enter AllowedIP(s) separating them with whitespace or colon. Leave blank if all IP's allowed"}
          style = {{width: `100%`}}
          required={true}
          value={allowedip} onChange={(e) =>{ e.target.value = e.target.value.replace(/\s/g, ''); setAllowedIp(e.target.value)}}
        />
        {Clicked && addLinkResponse &&
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2}}
            onClick={Clicking}
            color={'success'}
        >
            Link Added &#x2705;
            </Button>}


        {!addLinkResponse && <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2}}
                  onClick={Clicking}
                >
                  Submit
        </Button>}

      </Box>
    </Box>
    )
};

export default AddLink;