import React, { createContext, useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import News from './pages/News.jsx';

const Mycontext = createContext();

const App = () => {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isHideSidebarAndHeader, setisHideSidebarAndHeader] = useState(false);
  const [themeMode, setThemeMode] = useState(true);
  const [currentLocationData, setCurrentLocationData] = useState({
    aqi: null,
    temperature: null,
    humidity: null,
    location: null,
  });
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (themeMode === true) {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('themeMode', 'light');
    } else {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      localStorage.setItem('themeMode', 'dark');
    }
  }, [themeMode]);

  // Fetch location data and store it in context
  const fetchLocationData = async () => {
    setIsFetching(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const aqicnToken = import.meta.env.VITE_AQICN_API_TOKEN;
      const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

      try {
        const aqiResponse = await fetch(
          `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${aqicnToken}`
        );
        const aqiData = await aqiResponse.json();

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
    fetchLocationData(); // Initial fetch
    const intervalId = setInterval(fetchLocationData, 60 * 60 * 1000); // Update every hour

    return () => clearInterval(intervalId);
  }, []);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
    themeMode,
    setThemeMode,
    fetchLocationData, // Provide fetch function in context
    currentLocationData, // Provide location data in context
    isFetching, // Provide loading state in context
  };

  return (
    <BrowserRouter>
      <Mycontext.Provider value={values}>
        {isHideSidebarAndHeader !== true && <Header />}
        <div className="main d-flex">
          {isHideSidebarAndHeader !== true && (
            <div className={`sidebarWrapper ${isToggleSidebar ? 'toggle' : ''}`}>
              <Sidebar />
            </div>
          )}

          <div className={`content ${isHideSidebarAndHeader ? 'full' : ''} ${isToggleSidebar ? 'toggle' : ''}`}>
            <Routes>
              <Route path="/" exact element={<DashBoard />} />
              <Route path="/dashboard" exact element={<DashBoard />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/signUp" exact element={<SignUp />} />
              <Route path="/news" exact element={<News />} />
            </Routes>
          </div>
        </div>
      </Mycontext.Provider>
    </BrowserRouter>
  );
};

export default App;
export { Mycontext };
