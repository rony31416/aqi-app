import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashBoard from './pages/DashBoard'
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar.jsx';

const App = () => {


  return (
    <BrowserRouter>
      <Header />
      <div className="main d-flex">
        <div className="sidebarWrapper">
          <Sidebar />
        </div>

        <div className="content">
          <Routes>
            <Route path="/" exact={true} element={<DashBoard />} />
            <Route path="/dashboard" exact={true} element={<DashBoard />} />
          </Routes>
        </div>
      </div>

    </BrowserRouter>

  );
}

export default App

//22 min complete 2nd video link : http://youtube.com/watch?v=yaWtIus3UAM&list=PLhFBHuT4t3aApRKcTgTi3Sfu6zudkg7bW&index=2
