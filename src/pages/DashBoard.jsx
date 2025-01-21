// import React, { useEffect } from "react";
// import "../index.css";

// const DashBoard = () => {
//   useEffect(() => {
//     // Load the Google Maps script dynamically
//     const script = document.createElement("script");
//     const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
//     const aqicnToken = import.meta.env.VITE_AQICN_MAP_TOKEN;

//     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
//     script.async = true;
//     script.defer = true;
//     script.onload = () => {
//       // Initialize the map once the script is loaded
//       const map = new window.google.maps.Map(document.getElementById("map"), {
//         center: { lat: 23.5937, lng: 80.9629 }, // Central location in South Asia (India)
//         zoom: 5, // Adjusted zoom for a regional view
//       });

//       // Define the AQICN map overlay
//       const waqiMapOverlay = new window.google.maps.ImageMapType({
//         getTileUrl: function (coord, zoom) {
//           return (
//             `https://tiles.aqicn.org/tiles/usepa-aqi/${zoom}/${coord.x}/${coord.y}.png?token=${aqicnToken}`
//           );
//         },
//         tileSize: new window.google.maps.Size(256, 256),
//         name: "Air Quality",
//         maxZoom: 15,
//       });

//       // Add the overlay to the map
//       map.overlayMapTypes.insertAt(0, waqiMapOverlay);
//     };

//     document.body.appendChild(script);

//     // Cleanup the script on component unmount
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <div className="right-content w-100">
//       <div className="dashboardWrapper d-flex">
//         <div className="titleContent">
//           <h2>Current Air Quality Index (AQI) Map</h2>
//         </div>
//         <div className="dashboardBox">
//           <div id="map" className="map-aqi"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashBoard;

// import React, { useEffect } from "react";
// import "../index.css";

// const DashBoard = () => {
//   useEffect(() => {
//     // Load the Google Maps script dynamically
//     const script = document.createElement("script");
//     const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
//     const aqicnToken = import.meta.env.VITE_AQICN_MAP_TOKEN;

//     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
//     script.async = true;
//     script.defer = true;
//     script.onload = () => {
//       // Initialize the map once the script is loaded
//       const map = new window.google.maps.Map(document.getElementById("map"), {
//         center: { lat: 23.5937, lng: 90.9629 }, // Center near Bangladesh
//         zoom: 7, // Adjusted zoom for a closer view
//       });

//       // Define the AQICN map overlay
//       const waqiMapOverlay = new window.google.maps.ImageMapType({
//         getTileUrl: function (coord, zoom) {
//           return (
//             `https://tiles.aqicn.org/tiles/usepa-aqi/${zoom}/${coord.x}/${coord.y}.png?token=${aqicnToken}`
//           );
//         },
//         tileSize: new window.google.maps.Size(256, 256),
//         name: "Air Quality",
//         maxZoom: 15,
//       });

//       // Add the overlay to the map
//       map.overlayMapTypes.insertAt(0, waqiMapOverlay);

//       // Add a circle to represent Bangladesh
//       const bangladeshCircle = new window.google.maps.Circle({
//         center: { lat: 23.685, lng: 90.3563 }, // Approximate center of Bangladesh
//         radius: 150000, // Radius in meters (150 km)
//         strokeColor: "#FF0000", // Border color
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//         fillColor: "#FF9999", // Fill color
//         fillOpacity: 0.0,
//       });

//       // Add the circle to the map
//       bangladeshCircle.setMap(map);
//     };

//     document.body.appendChild(script);

//     // Cleanup the script on component unmount
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <div className="right-content w-100">
//       <div className="dashboardWrapper d-flex">
//         <div className="titleContent">
//           <h2>Current Air Quality Index (AQI) Map</h2>
//         </div>
//         <div className="dashboardBox">
//           <div id="map" className="map-aqi"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashBoard;


import React, { useEffect } from "react";
import "../index.css";

const DashBoard = () => {
  useEffect(() => {
    // Load the Google Maps script dynamically
    const script = document.createElement("script");
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const aqicnToken = import.meta.env.VITE_AQICN_MAP_TOKEN;

    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Initialize the map with Pakistan at the center
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 23.5937, lng: 83.9629 },
        zoom: 6, // Adjusted zoom for better visibility of the region
      });

      // Define the AQICN map overlay
      const waqiMapOverlay = new window.google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
          return (
            `https://tiles.aqicn.org/tiles/usepa-aqi/${zoom}/${coord.x}/${coord.y}.png?token=${aqicnToken}`
          );
        },
        tileSize: new window.google.maps.Size(256, 256),
        name: "Air Quality",
        maxZoom: 15,
      });

      // Add the overlay to the map
      map.overlayMapTypes.insertAt(0, waqiMapOverlay);

      // Add a circle to represent Pakistan
      const pakistanCircle = new window.google.maps.Circle({
        center: { lat: 23.685, lng: 90.3563 },  // Approximate center of Pakistan
        radius: 300000, // Radius in meters (200 km)
        strokeColor: 'red', // Border color (Blue for Pakistan)
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#9999FF", // Fill color
        fillOpacity: 0.01,
      });

      // Add the circle to the map
      pakistanCircle.setMap(map);
    };

    document.body.appendChild(script);

    // Cleanup the script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="right-content w-100">
      <div className="dashboardWrapper d-flex">
        <div className="titleContent">
          <h2>Current Air Quality Index (AQI) Map</h2>
        </div>
        <div className="dashboardBox">
          <div id="map" className="map-aqi"></div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
