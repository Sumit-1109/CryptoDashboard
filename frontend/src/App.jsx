import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import './App.css';

const App = () => {
  return (
    <div className='main-frame'>
      <Navbar />
      <Home />
    </div>
  );
};

export default App;