import React from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
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
    <div className="App">
        <Navbar/>
        <HomePage/>
        
    </div>
  );
}
export default App;

//export default App;