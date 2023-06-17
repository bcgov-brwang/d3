// import MotionHoc from "../Pages/MotionHoc";
// import "../tools/1.js";

// const ApplicationComponent = () => {
//   return <h1>Application</h1>;
// };

// const Application = MotionHoc(ApplicationComponent);

// export default Application;

import React, {useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min.js';
import loadData from "../tools/d3.js";
import "../css/site.css"

const Application = () => {

  const {name} = useParams();


  const legendStyles = {
        marginLeft: '80px',
        marginTop: '350px',
      };

  const chartRef = useRef(null);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {


        let url = "";
        if(name === undefined){
          url = "https://localhost:44339/api/applications/chart";
        }
        else{
          url = `https://localhost:44339/api/applications/chart?name=${name}`;
        }

        //get json object
        // const response = await fetch('https://localhost:44339/weatherforecast/data');
        //get data from db
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        loadData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, []);

  return (
    <div>
        {/* <h1>Application Details</h1> */}
        <div id="legend" style={legendStyles}><h4>Legend</h4></div>
        <svg width="960" height="600"></svg>
    </div>
  );
};

export default Application;

