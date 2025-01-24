import React, { useState, useEffect, useContext } from "react";
import { Air, Thermostat, WaterDrop, LocationOn } from "@mui/icons-material";
import "../index.css"; // Import custom styles
import { Mycontext } from "../App";

const DashBoard = () => {

  const context = useContext(Mycontext);

  useEffect(()=>{
    context.setisHideSidebarAndHeader(false);

    window.scrollTo(0,0);
  },[]);


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
        console.log(weatherData);

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
          <h2>Current Air Quality Index <span className="text-sky">(AQI)</span> & Weather</h2>
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
