import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Login from './pages/Login';
// import Dashboard from './components/Dashboard';
// import FitnessLog from './components/FitnessLog';
// import ProfilePage from './components/ProfilePage';
// import ProgressPage from './components/ProgressPage';

import './App.css';
import './styles/Navbar.css';
import './styles/HomePage.css';
// import './styles/Dashboard.css';
// import './styles/FitnessLog.css';
// import './styles/ProfilePage.css';
// import './styles/ProgressPage.css';

function App(){
  return(
    <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
    
  );
}
export default App;