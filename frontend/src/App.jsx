import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SmoothScroll from './components/SmoothScroll';
import SplashScreen from './components/SplashScreen';
import CustomCursor from './components/CustomCursor';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <SplashScreen />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </SmoothScroll>
    </>
  );
}

export default App;
