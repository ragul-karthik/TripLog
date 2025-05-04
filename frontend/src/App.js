import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Experiences from './pages/Experiences';
import About from './pages/About';
import TripPlanner from './pages/TripPlanner'; // Import the TripPlanner page

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/about" element={<About />} />
          <Route path="/plan-trip" element={<TripPlanner />} /> {/* Add the TripPlanner route */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
