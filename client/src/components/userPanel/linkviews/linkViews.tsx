import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import { getViewsRequest } from '../../../services/auth/viewsLinkService.tsx'
import authContext from '../../../context/authContext.tsx';
import authCheck from '../../../services/auth/authCheck.tsx';




import Box from '@mui/material/Box';                         

const drawerWidth = 240;


const LinkViews = () => {

    interface d {
        originalLink: string;
        shortenedLink: string;
    }


    let [views, setViews] = useState<[d]>([{
        originalLink: '',
        shortenedLink: '',
    }]);
    
    const {auth, setAuth } = useContext(authContext);
    const navigate = useNavigate();
    useEffect(() => {
        getViewsRequest(setViews);
    }, []);

    useEffect(() => {
        authCheck(navigate, setAuth);
    },[auth]);

    

    let prepareData = () => {
        let d: any[] = [];
        let finalData:Array<string> = [];
        let viewCounts;
        let result:any;

        
        views.forEach(e => {
            d.push([e.originalLink, e.shortenedLink]);
        });
         viewCounts = d.reduce((acc, curr)=>{
            acc[curr] = (acc[curr] || 0) + 1;
            return acc;
         }, {});


         
        result = Object.keys(viewCounts).map((key) => [key, viewCounts[key]]);

        
        result.forEach((e) => {
            e[0] = e[0].split(",")[0];
            finalData.push(e);
        });


        let preparedData = [
            [
                "originalLink",
                "views"
            ],
            ...finalData
        ]
        return preparedData;
      }

    let options = {
        colors: ["#f1802d"]
    }
    return (
        <>
            <Box sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `240px`, md: `240px`, lg:`240px`, xl:`240px`}, '& .MuiTextField-root': { mt: 1, mb:1,  width: '25ch' }}}>
            
            
            
            <Box sx={{mt:`calc(50vh - 100px)`, border: `1px solid lightgray`}}>
            { views && <Chart
                                chartType="Histogram"
                                data={prepareData()}
                                options={options}
                            />  } 
            </Box>
            </Box>
        </>
    );
};

export default LinkViews;