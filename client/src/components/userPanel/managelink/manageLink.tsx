import React, {useEffect, useState, useCallback, useContext} from "react";
import './manageLink.css';
import { GetLinksRequest } from '../../../services/auth/manageLinkService.tsx'
import ManageLinkItem from './manageLinkItem.tsx';
import { SelectButton } from 'primereact/selectbutton';
import { DeleteLinkRequest } from "../../../services/auth/deleteLinkService.tsx";
import { useNavigate} from "react-router-dom";

import AuthContext from '../../../context/AuthContext.tsx';
import AuthCheck from '../../../services/auth/authCheck.tsx';



const ManageLink = () => {
    const {auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();


    const [filter, setFilter] = useState('link');
    const filterOptions = [
        {value: 'link'},
        {value: 'category'},
        {value: 'description'},
        {value: 'ip'}
    ];
    
    interface d {
        id: string,
        originalLink: string,
        shortenedLink:string,
        category: string,
        description: string,
        allowedips: Array<string>
      }

    const [data, setData] = useState<[d]>([{
        id: '',
        originalLink: '',
        shortenedLink: '',
        category: '',
        description: '',
        allowedips: [],
    }]);

    useEffect(() => {
        AuthCheck(navigate, setAuth);
    },[auth]);



    const [filteredLinks, setFilteredLinks] = useState<d[]>([])
    useEffect(() => {
        GetLinksRequest(setData, setFilteredLinks);
    },[]);


      const handleFilter = (e) => {
        const value = e.target.value;
        let filtered;
        if(filter === 'link') {
            filtered = data.filter(link => link.originalLink.includes(value));
        } else if(filter === 'category') {
            filtered = data.filter(link => link.category.includes(value));
        } else if(filter === 'description') {
            filtered = data.filter(link => link.description.includes(value));
        } else if (filter === 'ip') {
            filtered = data.filter(link => link.allowedips.toString().includes(value));
        } else {
            filtered = data.filter(link => link.originalLink.includes(value));
        }
        
        setFilteredLinks(filtered);
      }

      const deleteLink = (id) => {
        let filtered = data.filter(e => !e.id.includes(id));
        setFilteredLinks(() => [...filtered]);
      }

      
    let handleRemove= useCallback(async(e, id) => {
        e.stopPropagation();
        try {
            await DeleteLinkRequest(id);
            deleteLink(id)
        } catch (error) {
            alert(error.message);
            console.error(error.message || 'An error occurred during sign-in');
        }

      }, [filteredLinks]);

      const filterByButtons = (options) => {
        return (<div className={'filterinputbox'}><button className={filter === options.value ? `activefilterbutton` : ``} name={options.value}>{options.value}</button></div>);
      }
    return (
        <>
        <div className="managelinkcontent ">
            <div className={'wrapper managelinkwrapper'}>
            <h1 className={'cog'}>&#9881;</h1>
                <div className={'flexwrapper input-box'}>
                    <input type="text" placeholder={`Search by ` + filter} className={'searchinput displayinline'} onChange={e => { handleFilter(e)} } />
                    <div className={'searchicon displayinline'}>
                        🔍
                    </div>
                    
            </div>
            <SelectButton value={filter} onChange={(e) => { setFilter(prevState => e.value !== null? e.value : prevState); setFilteredLinks(data)}}  optionLabel="value" options={filterOptions} itemTemplate={filterByButtons}/>

            <ManageLinkItem filteredLinks={filteredLinks} handleRemove={handleRemove}/>
           
            </div>
        </div>
        </>
    );
};

export default ManageLink;