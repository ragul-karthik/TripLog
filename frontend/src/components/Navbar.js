import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">TripLog</Link>
      <Link to="/experiences">Experiences</Link>
      <Link to="/plan-trip">Plan Your Trip</Link> {/* Add the Plan Your Trip link */}
      <Link to="/about">About</Link>
      
    </nav>
  );
};

export default Navbar;
