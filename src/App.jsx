import React,{createContext,useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashBoard from './pages/DashBoard'
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar.jsx';
import { use,useEffect } from 'react';

const Mycontext = createContext();

const App = () => {


  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const values={
    isToggleSidebar,
    setIsToggleSidebar
  }

  // useEffect(() => { 
  // alert(isToggleSidebar)
  // } ,[isToggleSidebar])
  

  return (
    <BrowserRouter>
      <Mycontext.Provider value={values}>

        <Header />
        <div className="main d-flex">
          <div className={`sidebarWrapper ${isToggleSidebar===true ? 'toggle' : ''}`}>
            <Sidebar />
          </div>

          <div className={`content ${isToggleSidebar ? 'toggle' : ''}`}>
            <Routes>
              <Route path="/" exact={true} element={<DashBoard />} />
              <Route path="/dashboard" exact={true} element={<DashBoard />} />
            </Routes>
          </div>
        </div>
      </Mycontext.Provider>
    </BrowserRouter>

  );
}

export default App

export {Mycontext}

//22 min complete 2nd video link : http://youtube.com/watch?v=yaWtIus3UAM&list=PLhFBHuT4t3aApRKcTgTi3Sfu6zudkg7bW&index=2
