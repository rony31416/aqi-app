import React, { createContext, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashBoard from './pages/DashBoard'
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar.jsx';
import { use, useEffect } from 'react';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import News from './pages/News.jsx';

const Mycontext = createContext();

const App = () => {


  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isHideSidebarAndHeader, setisHideSidebarAndHeader] = useState(false);
  const [themeMode,setThemeMode] = useState(true);

  useEffect(()=>{
   
   if(themeMode===true){
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    localStorage.setItem('themeMode','light');
   }
   else{
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    localStorage.setItem('themeMode','dark');
   }
   
  },[themeMode]);
  
  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
    themeMode,
    setThemeMode
  }

  // useEffect(() => { 
  // alert(isToggleSidebar)
  // } ,[isToggleSidebar])


  return (
    <BrowserRouter>
      <Mycontext.Provider value={values}>
        {
          isHideSidebarAndHeader !== true &&
          <Header />

        }
        <div className="main d-flex">
          {
            isHideSidebarAndHeader !== true &&
            <div className={`sidebarWrapper ${isToggleSidebar === true ? 'toggle' : ''}`}>
              <Sidebar />
            </div>

          }

          <div className={`content ${isHideSidebarAndHeader===true && 'full'} ${isToggleSidebar === true ? 'toggle' : ''}`}>
            <Routes>
              <Route path="/" exact={true} element={<DashBoard />} />
              <Route path="/dashboard" exact={true} element={<DashBoard />} />
              <Route path="/login" exact={true} element={<Login />} />
              <Route path="/signUp" exact={true} element={<SignUp />} />
              <Route path="/news" exact={true} element={<News />} />
            </Routes>
          </div>
        </div>
      </Mycontext.Provider>
    </BrowserRouter>

  );
}

export default App

export { Mycontext }

//22 min complete 2nd video link : http://youtube.com/watch?v=yaWtIus3UAM&list=PLhFBHuT4t3aApRKcTgTi3Sfu6zudkg7bW&index=2
