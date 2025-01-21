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
     
//       const map = new window.google.maps.Map(document.getElementById("map"), {
//         center: { lat: 23.5937, lng: 83.9629 },
//         zoom: 6, // Adjusted zoom for better visibility of the region
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

//       // Add a circle to represent Pakistan
//       const pakistanCircle = new window.google.maps.Circle({
//         center: { lat: 23.685, lng: 90.3563 }, 
//         radius: 300000, 
//         strokeColor: 'red', 
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//         fillColor: "#9999FF",
//         fillOpacity: 0.01,
//       });

//       // Add the circle to the map
//       pakistanCircle.setMap(map);
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

// import React, { useState, useEffect } from "react";
// import "../index.css";

// const DashBoard = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [currentLocationData, setCurrentLocationData] = useState({
//     aqi: null,
//     temperature: null,
//     humidity: null,
//     location: null,
//   });

//   useEffect(() => {
//     const script = document.createElement("script");
//     const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
//     const aqicnToken = import.meta.env.VITE_AQICN_MAP_TOKEN;

//     console.log("Loading Google Maps script..."); // Debugging

//     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
//     script.async = true;
//     script.defer = true;
//     script.onload = () => {
//       console.log("Google Maps script loaded."); // Debugging

//       const map = new window.google.maps.Map(document.getElementById("map"), {
//         center: { lat: 23.5937, lng: 83.9629 },
//         zoom: 6,
//       });

//       const waqiMapOverlay = new window.google.maps.ImageMapType({
//         getTileUrl: (coord, zoom) =>
//           `https://tiles.aqicn.org/tiles/usepa-aqi/${zoom}/${coord.x}/${coord.y}.png?token=${aqicnToken}`,
//         tileSize: new window.google.maps.Size(256, 256),
//         name: "Air Quality",
//         maxZoom: 15,
//       });

//       map.overlayMapTypes.insertAt(0, waqiMapOverlay);

//       const pakistanCircle = new window.google.maps.Circle({
//         center: { lat: 23.685, lng: 90.3563 },
//         radius: 300000,
//         strokeColor: "red",
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//         fillColor: "#9999FF",
//         fillOpacity: 0.01,
//       });

//       pakistanCircle.setMap(map);
//     };

//     document.body.appendChild(script);

//     return () => {
//       console.log("Cleaning up Google Maps script..."); // Debugging
//       document.body.removeChild(script);
//     };
//   }, []);

//   const fetchLocationData = () => {
//     console.log("Fetching geolocation..."); // Debugging

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;

//         console.log("Latitude:", latitude, "Longitude:", longitude); // Debugging

//         const aqicnToken = import.meta.env.VITE_AQICN_API_TOKEN;
//         const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

//         try {
//           console.log("Fetching AQI data..."); // Debugging
//           const aqiResponse = await fetch(
//             `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${aqicnToken}`
//           );
//           const aqiData = await aqiResponse.json();
//           console.log("AQI Data:", aqiData); // Debugging

//           console.log("Fetching Weather data..."); // Debugging
//           const weatherResponse = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
//           );
//           const weatherData = await weatherResponse.json();
//           console.log("Weather Data:", weatherData); // Debugging

//           setCurrentLocationData({
//             aqi: aqiData.data.aqi,
//             temperature: weatherData.main.temp,
//             humidity: weatherData.main.humidity,
//             location: weatherData.name,
//           });

//           setShowModal(true);
//         } catch (error) {
//           console.error("Error fetching location data:", error); // Debugging
//         }
//       },
//       (error) => {
//         console.error("Geolocation error:", error); // Debugging
//         alert("Unable to access location. Please enable location permissions.");
//       }
//     );
//   };

//   return (
//     <div className="right-content w-100">
//       <div className="dashboardWrapper d-flex">
//         <div className="titleContent">
//           <h2>Current Air Quality Index (AQI) Map</h2>
//           <button className="btn btn-primary" onClick={fetchLocationData}>
//             Show Current Location AQI & Weather
//           </button>
//         </div>
//         <div className="dashboardBox">
//           <div id="map" className="map-aqi"></div>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>Current Location Information</h3>
//             <p>
//               <strong>Location:</strong> {currentLocationData.location || "N/A"}
//             </p>
//             <p>
//               <strong>AQI:</strong> {currentLocationData.aqi || "N/A"}
//             </p>
//             <p>
//               <strong>Temperature:</strong> {currentLocationData.temperature}°C
//             </p>
//             <p>
//               <strong>Humidity:</strong> {currentLocationData.humidity}%
//             </p>
//             <button
//               className="btn btn-secondary"
//               onClick={() => setShowModal(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DashBoard;
import React, { useState, useEffect } from "react";
import { Air, Thermostat, WaterDrop, LocationOn } from "@mui/icons-material";
import "../index.css"; // Import custom styles

const DashBoard = () => {
  const [currentLocationData, setCurrentLocationData] = useState({
    aqi: null,
    temperature: null,
    humidity: null,
    location: null,
  });

  const [isFetching, setIsFetching] = useState(false);

  const fetchLocationData = async () => {
    setIsFetching(true);

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const aqicnToken = import.meta.env.VITE_AQICN_API_TOKEN;
      const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

      try {
        // Fetch AQI data
        const aqiResponse = await fetch(
          `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${aqicnToken}`
        );
        const aqiData = await aqiResponse.json();

        // Fetch Weather data
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
        );
        const weatherData = await weatherResponse.json();

        setCurrentLocationData({
          aqi: aqiData.data.aqi || "N/A",
          temperature: weatherData.main.temp || "N/A",
          humidity: weatherData.main.humidity || "N/A",
          location: weatherData.name || "N/A",
        });
      } catch (error) {
        console.error("Error fetching location data:", error);
      } finally {
        setIsFetching(false);
      }
    });
  };

  useEffect(() => {
    // Fetch location data on component mount and every 1 hour thereafter
    fetchLocationData(); // Initial fetch
    const intervalId = setInterval(fetchLocationData, 60 * 60 * 1000); // 1 hour interval

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const aqicnToken = import.meta.env.VITE_AQICN_MAP_TOKEN;

    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 23.5937, lng: 83.9629 },
        zoom: 6,
      });

      const waqiMapOverlay = new window.google.maps.ImageMapType({
        getTileUrl: (coord, zoom) =>
          `https://tiles.aqicn.org/tiles/usepa-aqi/${zoom}/${coord.x}/${coord.y}.png?token=${aqicnToken}`,
        tileSize: new window.google.maps.Size(256, 256),
        name: "Air Quality",
        maxZoom: 15,
      });

      map.overlayMapTypes.insertAt(0, waqiMapOverlay);

      const pakistanCircle = new window.google.maps.Circle({
        center: { lat: 23.685, lng: 90.3563 },
        radius: 300000,
        strokeColor: "red",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#9999FF",
        fillOpacity: 0.01,
      });

      pakistanCircle.setMap(map);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="right-content">
      <div className="dashboardWrapper">
        <div className="titleContent">
          <h2>Current Air Quality Index (AQI) & Weather</h2>
        </div>

        <div className="dashboardBox">
          {/* Google Map */}
          <div id="map" className="map-aqi"></div>
        </div>
      </div>

      {/* Fixed Info Box */}
      <div className="info-box">
        <div className="card">
          <div className="card-content">
            <h6>Current Location Information</h6>

            {isFetching ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : (
              <div className="grid-container">
                {/* Location */}
                <div className="grid-item location">
                  <LocationOn className="icon" />
                  <span>Location:</span>
                </div>
                <div className="grid-item">{currentLocationData.location}</div>

                {/* AQI */}
                <div className="grid-item aqi">
                  <Air className="icon" />
                  <span>AQI:</span>
                </div>
                <div className="grid-item">{currentLocationData.aqi}</div>

                {/* Temperature */}
                <div className="grid-item temperature">
                  <Thermostat className="icon" />
                  <span>Temperature:</span>
                </div>
                <div className="grid-item">{currentLocationData.temperature}°C</div>

                {/* Humidity */}
                <div className="grid-item humidity">
                  <WaterDrop className="icon" />
                  <span>Humidity:</span>
                </div>
                <div className="grid-item">{currentLocationData.humidity}%</div>
              </div>
            )}
          </div>

          <div className="card-actions">
            <button className="refresh-btn" onClick={fetchLocationData}>
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
