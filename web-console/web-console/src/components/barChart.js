import React, {useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min.js';
import loadData from "../tools/d3.js";
import loadPieData from "../tools/d3pie.js";
import loadBarData from "../tools/d3bar.js";
import "../css/site.css"

const BarChart = () => {

  const {name} = useParams();

  const divStyle = {
    marginLeft: '80px',
    marginTop: '200px',
  };

  const svgStyle = {
        marginLeft: '80px',
        marginTop: '200px',
      };

  const chartRef = useRef(null);

  const [data, setData] = useState(null);

  useEffect(() => {
    
    const fetchBarData = async () => {
      try {
        let url = "";
        url = "https://localhost:44339/api/applications/barcharttest";
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

    
    fetchBarData();
    
  }, []);

  return (
    <div className='divStyle'>
        
        <div>bar chart</div>
        <svg className='svgStyle' width="960" height="800" id="barChart"></svg>
       
        
    </div>
  );
};

export default BarChart;

