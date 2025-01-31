// import React from 'react'
// import "../index.css"

// const AirQualityIndex = () => {
//   return (
//     <div>
//         <div className='airQualityIndexWrapper'>
//             <p>
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, molestias! Ullam totam maiores neque minus voluptas optio tempora inventore distinctio? Nam quos optio inventore porro dolore, est quasi iste. Veritatis distinctio molestiae voluptatibus ea, totam cupiditate esse, ratione corrupti, accusantium necessitatibus harum mollitia! Velit laborum quos corporis beatae officia, molestiae laboriosam alias veritatis ullam esse blanditiis perspiciatis sint dolor minus accusamus. Unde deleniti nisi ipsam eos sapiente voluptatem magni, adipisci ex incidunt dicta a quisquam molestiae vero reprehenderit consequuntur error id excepturi perferendis eveniet dolorum rem pariatur rerum. Architecto id, saepe laborum qui voluptatibus est labore ipsam ratione obcaecati tempore!
//             </p>
//         </div>
//     </div>
//   )
// }

// export default AirQualityIndex

import React, { useState, useEffect } from 'react';
import {useContext } from "react";
import "../index.css";
import { Mycontext } from "../App";


const AirQualityIndex = () => {
    const [aqi, setAqi] = useState(null);
    const [healthAdvice, setHealthAdvice] = useState('');
    const context = useContext(Mycontext);
    const { fetchLocationData, currentLocationData, isFetching } = context;

  useEffect(() => {
    try{
        fetchLocationData();
        const aqiValue = currentLocationData.aqi;
        setAqi(aqiValue);
        setHealthAdvice(getHealthAdvice(aqiValue));
    }
    catch{
        setAqi("Error fetching data!");
    }
  }, []);
  
  

    const getAQIColorClass = (aqi) => {
        if (aqi <= 33) return "aqiVeryGood";
        if (aqi <= 66) return "aqiGood";
        if (aqi <= 99) return "aqiFair";
        if (aqi <= 149) return "aqiPoor";
        if (aqi <= 200) return "aqiVeryPoor";
        return "aqiHazardous";
    };

    const getHealthAdvice = (aqi) => {
        if (aqi <= 33) return "Very Good - Enjoy activities";
        if (aqi <= 66) return "Good - Enjoy activities";
        if (aqi <= 99) return "Fair - Sensitive groups should be cautious";
        if (aqi <= 149) return "Poor - Sensitive groups should limit outdoor activities";
        if (aqi <= 200) return "Very Poor - Everyone should limit outdoor activities";
        return "Hazardous - Everyone should avoid outdoor activities";
    };

    return (
        <div className="airQualityIndexWrapper">
            <h2 className="aqiTitle">Current Air Quality</h2>
            <div id="aqiBox" className={`aqiBox ${getAQIColorClass(aqi)}`}>
                {aqi ? `AQI: ${aqi}` : "Fetching AQI..."}
            </div>
            <p id="comparisonText">{healthAdvice}</p>
            <h3 className="aqiTitle">AQI Ranges</h3>
            <table className="aqiTable">
                <thead>
                    <tr>
                        <th>Range</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="aqiVeryGood">
                        <td>0-33</td>
                        <td>Very Good</td>
                    </tr>
                    <tr className="aqiGood">
                        <td>34-66</td>
                        <td>Good</td>
                    </tr>
                    <tr className="aqiFair">
                        <td>67-99</td>
                        <td>Fair</td>
                    </tr>
                    <tr className="aqiPoor">
                        <td>100-149</td>
                        <td>Poor</td>
                    </tr>
                    <tr className="aqiVeryPoor">
                        <td>150-200</td>
                        <td>Very Poor</td>
                    </tr>
                    <tr className="aqiHazardous">
                        <td>200+</td>
                        <td>Hazardous</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AirQualityIndex;
