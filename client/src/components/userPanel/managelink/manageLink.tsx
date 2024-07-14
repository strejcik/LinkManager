import React, {useEffect, useState, useCallback, useContext} from "react";
import { getLinksRequest } from '../../../services/auth/manageLinkService.tsx'
import { deleteLinkRequest } from "../../../services/auth/deleteLinkService.tsx";
import { useNavigate, useLocation } from "react-router-dom";

import authContext from '../../../context/authContext.tsx';
import authCheck from '../../../services/auth/authCheck.tsx';



import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';

const ManageLink = () => {
    const {auth, setAuth } = useContext(authContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [link, setLink] = useState();
    
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
        authCheck(navigate, setAuth);
    },[auth]);



    const [filteredLinks, setFilteredLinks] = useState<d[]>([])
    useEffect(() => {
        getLinksRequest(setData, setFilteredLinks);
    },[]);


      const handleFilter = (e) => {
        const value = e.target.value;
        let filtered;
        filtered = data.filter(function(o) {
            return Object.keys(o).some(function(k) {
              return o[k].toString().indexOf(value) != -1;
            })
          })
        
        setFilteredLinks(filtered);
      }

      const deleteLink = (id) => {
        setFilteredLinks((prev) => prev.filter(e => !e.id.includes(id)));
      }

      
    let handleRemove= useCallback(async(e, id) => {
        e.stopPropagation();
        try {
            await deleteLinkRequest(id);
            deleteLink(id)
        } catch (error) {
            alert(error.message);
            console.error(error.message || 'An error occurred during sign-in');
        }

      }, [filteredLinks]);

      const [open, setOpen] = React.useState(false);

      const handleClickOpen = (e, originalLink) => {
        if(e.target.innerText === originalLink) {
            setLink(originalLink);
            return setOpen(true);
        } else {
            setLink(originalLink.toString());
            return setOpen(true);
        }
      };
      
    
      const handleClose = () => {
        setOpen(false);
      };



  
  
      let handleClick = (id) => {
          navigate(`${location.pathname + '/edit/' + id}`);
      }

      const drawerWidth = 240;
    return (
        <React.Fragment key={Math.random()}>


                <Box sx={{ p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `240px`, md: `240px`, lg:`240px`, xl:`240px`}, '& .MuiTextField-root': { mb:1,  width: '25ch' }}}  key={Math.random()}>
                    <Box  key={Math.random()}>
                        <TextField label="Search 🔍" style = {{width: `100%`}} onChange={e => { handleFilter(e)} } sx={{ marginTop: 8}}  key={Math.random()}/>
                    </Box>
                </Box>
                <TableContainer component={Paper} key={Math.random()}>
                <Table sx={{ ml: { sm: `240px`, md: `240px`, lg:`240px`, xl:`240px`}, width: { sm: `calc(100% - ${drawerWidth}px)` }}} key={Math.random()}>
                    <TableHead key={Math.random()}>
                    <TableRow key={Math.random()}>
                        <TableCell key={Math.random()}>Original Link</TableCell>
                        <TableCell key={Math.random()}>Category</TableCell>
                        <TableCell key={Math.random()}>Description</TableCell>
                        <TableCell key={Math.random()}>AllowedIP(s)</TableCell>
                        <TableCell sx={{textAlign:'center'}} key={Math.random()}>Remove</TableCell>
                        <TableCell sx={{textAlign:'center'}} key={Math.random()}>Edit</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody  key={Math.random()}>
                    {filteredLinks.map((row, i) => (
                        <React.Fragment key={Math.random()}>

                        
                        
                        
                        <Dialog
                            open={open}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby={row.originalLink}
                            key={Math.random()}
                        >
                            <DialogContent  key={Math.random()}>
                            <DialogContentText key={Math.random()}>
                                {link}
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions key={i+29382}>
                            <Button onClick={handleClose}  key={Math.random()}>Close</Button>
                            </DialogActions>
                        </Dialog>


                        
                        
                        <TableRow key={Math.random()}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                        <TableCell onClick={(e) => handleClickOpen(e, row.originalLink)} key={Math.random()}>
                        <Typography key={Math.random()}
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                            width: '10rem',
                        }}
                        >
                           {row.originalLink}
                        </Typography>
                        </TableCell>
                        <TableCell onClick={(e) => handleClickOpen(e, row.category)} key={Math.random()}>
                        <Typography key={Math.random()}
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                            width: '10rem',
                        }}
                        >
                           {row.category}
                        </Typography>
                        </TableCell>
                        <TableCell onClick={(e) => handleClickOpen(e, row.description)} key={Math.random()}>
                        <Typography key={Math.random()}
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                            width: '10rem',
                        }}
                        >
                           {row.description}
                        </Typography>
                        </TableCell>
                        <TableCell onClick={(e) => handleClickOpen(e, row.allowedips)} key={Math.random()}>
                        <Typography key={Math.random()}
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                            width: '10rem',
                        }}
                        >
                           {Array.from(row.allowedips).toString()}
                        </Typography>
                        </TableCell>
                        <TableCell key={Math.random()}>
                            <Button sx={{ width: `100%`, mt: 1, textAlign:'center'}} onClick={(e) => handleRemove(e, row.id)} key={Math.random()}><DeleteIcon/></Button>
                        </TableCell>
                        <TableCell key={i+`shrfgzxc`}>
                            <Button sx={{ width: `100%`, mt: 1, textAlign:'center'}} onClick={(e) => handleClick(row.id)} key={Math.random()}><EditIcon/></Button>
                        </TableCell>
                        </TableRow>
                        </React.Fragment>
                        
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </React.Fragment>
    );
};

export default ManageLink;