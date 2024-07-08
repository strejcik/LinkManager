import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import './linkViews.css';
import { Chart } from "react-google-charts";
import { GetViewsRequest } from '../../../services/auth/viewsLinkService.tsx'
import AuthContext from '../../../context/AuthContext.tsx';
import AuthCheck from '../../../services/auth/authCheck.tsx';

//               _      __ _       _     _              _ 
//              | |    / _(_)     (_)   | |            | |
//   _ __   ___ | |_  | |_ _ _ __  _ ___| |__   ___  __| |
//  | '_ \ / _ \| __| |  _| | '_ \| / __| '_ \ / _ \/ _` |
//  | | | | (_) | |_  | | | | | | | \__ \ | | |  __/ (_| |
//  |_| |_|\___/ \__| |_| |_|_| |_|_|___/_| |_|\___|\__,_|
                                                       
                                                       


const LinkViews = () => {
    let [views, setViews] = useState<any>([]);
    const {auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        GetViewsRequest(setViews);
    }, []);

    useEffect(() => {
        AuthCheck(navigate, setAuth);
    },[auth]);

    

    let prepareData = () => {
        let d:any = []; 
        views.forEach(e => {
            d.push([e.originalLink, e.views]);
        });




        const mergedMap = d.reduce((acc, [originalLink, views]) => {
            if (acc[originalLink]) {
                acc[originalLink][1] += views;
            } else {
                acc[originalLink] = [originalLink, views];
            }
            return acc;
        }, {});
        
        const mergedArrayOfArrays = Object.values(mergedMap);


        let preparedData = [
            [
                "originalLink",
                "views"
            ],
            ...mergedArrayOfArrays
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
                {}
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