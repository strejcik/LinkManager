import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import './linkViews.css';
import { Chart } from "react-google-charts";
import { getViewsRequest } from '../../../services/auth/viewsLinkService.tsx'
import authContext from '../../../context/authContext.tsx';
import authCheck from '../../../services/auth/authCheck.tsx';
                                        


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
        colors: ["#7ddc1f"]
    }
    return (
        <>
            <div className="linkviewscontent">
            <div className="wrapper linkviewswrapper">
                <h1>&#128065;</h1>
                 { views && <Chart
                                chartType="Histogram"
                                data={prepareData()}
                                options={options}
                            />  } 
            </div>
            </div>
        </>
    );
};

export default LinkViews;