import React, {useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min.js';
import loadData from "../tools/d3.js";
import loadPieData from "../tools/d3pie.js";
import loadBarData from "../tools/d3bar.js";
import "../css/site.css"

const Application = () => {

  const {name} = useParams();


  const legendStyles = {
        marginLeft: '80px',
        marginTop: '-100px',
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

    const fetchBarData = async () => {
      try {
        let url = "";
        url = "https://localhost:44339/api/applications/piechart";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        
        loadBarData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      

    }

    const fetchPieData = async () => {
      try {
        let url = "";
        url = "https://localhost:44339/api/applications/piechart";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        
        loadPieData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      

    }

    fetchData();
    fetchPieData();
    fetchBarData();
    
  }, []);

  return (
    <div>
        {/* <h1>Application Details</h1> */}
        <div id="legend" style={legendStyles}><h4>Legend</h4></div>
        <svg width="960" height="300"></svg>
        <div>
          <table>
            <tbody>
             <tr>
              <td id="frontendFramework">
                
              </td>
              <td id="backendFramework">
                
              </td>
            </tr>

            </tbody>

          </table>
        </div>
    </div>
  );
};

export default Application;

