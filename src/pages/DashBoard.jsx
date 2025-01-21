// import React from 'react'
// import "../index.css";
// const DashBoard = () => {
//   return (
//     <div className="right-content">
//        <div className="dashboardWrapper d-flex ">
//         <div className="dashboardBox">
//             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita, harum?
//             </p>
//         </div>


//        </div>
//     </div>
//   )
// }

// export default DashBoard


import React, { useEffect } from "react";
import "../index.css";

const DashBoard = () => {
  useEffect(() => {
    // Load the Google Maps script dynamically
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Initialize the map once the script is loaded
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 23.5937, lng: 80.9629 }, // Central location in South Asia (India)
        zoom: 5, // Adjusted zoom for a regional view
      });

      // Define the AQICN map overlay
      const waqiMapOverlay = new window.google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
          return (
            "https://tiles.aqicn.org/tiles/usepa-aqi/" +
            zoom +
            "/" +
            coord.x +
            "/" +
            coord.y +
            ".png?token=868923bcd49b14c77e12799533e9b206e488a921"
          );
        },
        tileSize: new window.google.maps.Size(256, 256),
        name: "Air Quality",
        maxZoom: 15,
      });

      // Add the overlay to the map
      map.overlayMapTypes.insertAt(0, waqiMapOverlay);
    };

    document.body.appendChild(script);

    // Cleanup the script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="right-content">
      <div className="dashboardWrapper d-flex">
        <div className="dashboardBox">
          <div id="map" style={{ height: "100vh", width: "100%" }}></div>
        </div>

      </div>
    </div>
  );
};

export default DashBoard;
