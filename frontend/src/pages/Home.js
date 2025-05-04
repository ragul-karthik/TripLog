import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [spots, setSpots] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [hoveredSpot, setHoveredSpot] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get('${process.env.REACT_APP_API_URL}/api/spots')
      .then(res => setSpots(res.data))
      .catch(err => console.error("Error fetching spots:", err));

    axios.get('${process.env.REACT_APP_API_URL}/api/experiences')
      .then(res => setExperiences(res.data))
      .catch(err => console.error("Error fetching experiences:", err));
  }, []);

  // Filter spots based on the search query
  const filteredSpots = spots.filter(spot => 
    spot.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    spot.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMouseEnter = (spot) => {
    setHoveredSpot(spot);
  };

  const handleMouseLeave = () => {
    setHoveredSpot(null);
  };

  return (
    <div className="home">
      <h1 className="title">Tourist Spots</h1>

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a spot..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="spot-grid">
        {filteredSpots.length > 0 ? (
          filteredSpots.map((spot) => (
            <div
              key={spot._id}
              className="spot-card"
              onMouseEnter={() => handleMouseEnter(spot)}
              onMouseLeave={handleMouseLeave}
            >
              <h2>{spot.title}</h2>
              <p>{spot.description}</p>
              {spot.image && <img src={spot.image} alt={spot.title} />}
              {hoveredSpot && hoveredSpot._id === spot._id && (
                <div className="spot-details">
                  <h3>{hoveredSpot.title}</h3>
                  <p>{hoveredSpot.description}</p>
                  <p><strong>Location:</strong> {hoveredSpot.location}</p>
                  <p><strong>Category:</strong> {hoveredSpot.category}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No spots found</p>
        )}
      </div>

      <h1 className="title">User Experiences</h1>
      <div className="experience-grid">
        {experiences.map((exp) => (
          <div key={exp._id} className="experience-card">
            <h2>{exp.title}</h2>
            <p>{exp.caption}</p>
            {exp.image && <img src={exp.image} alt={exp.title} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
