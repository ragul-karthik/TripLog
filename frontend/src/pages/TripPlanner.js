import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { jsPDF } from "jspdf";
import axios from "axios";
import { FaMapMarkedAlt, FaCalendarAlt, FaCamera } from 'react-icons/fa';
import './TripPlanner.css'; // Import the updated CSS

const TripPlanner = () => {
  const [date, setDate] = useState(new Date());
  const [plan, setPlan] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [destination, setDestination] = useState('');
  const [spots, setSpots] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    // Fetch spots and experiences from the backend
    axios.get('${process.env.REACT_APP_API_URL}/api/spots')
      .then(res => setSpots(res.data))
      .catch(err => console.error("Error fetching spots:", err));

    axios.get('${process.env.REACT_APP_API_URL}/api/experiences')
      .then(res => setExperiences(res.data))
      .catch(err => console.error("Error fetching experiences:", err));
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedDay(newDate.toLocaleDateString());
    setShowModal(true);
  };

  const handleSaveDestination = () => {
    if (isCustom && destination) {
      setPlan((prev) => ({
        ...prev,
        [selectedDay]: destination,
      }));
    } else if (destination) {
      setPlan((prev) => ({
        ...prev,
        [selectedDay]: destination,
      }));
    }
    setShowModal(false);
    setDestination('');
    setIsCustom(false);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Trip Plan", 20, 20);
    let y = 30;
    for (const [date, dest] of Object.entries(plan)) {
      doc.text(`${date}: ${dest}`, 20, y);
      y += 10;
    }
    doc.save("trip-plan.pdf");
  };

  return (
    <div className="trip-planner">
      <h1>Trip Planner</h1>
      
      {/* Calendar */}
      <Calendar onChange={handleDateChange} value={date} />
      
      {/* Modal for adding destination */}
      {showModal && (
        <div className="modal">
          <h2>Plan for {selectedDay}</h2>
          <div>
            <button onClick={() => setIsCustom(true)}>Custom Destination</button>
            <button onClick={() => setIsCustom(false)}>Pick a Spot/Experience</button>
          </div>

          {/* Custom Destination or Pick from Spots/Experiences */}
          {isCustom ? (
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter a custom destination"
            />
          ) : (
            <>
              <select
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
              >
                <option value="">Select Spot or Experience</option>
                {spots.map((spot) => (
                  <option key={spot._id} value={spot.title}>
                    {spot.title}
                  </option>
                ))}
                {experiences.map((exp) => (
                  <option key={exp._id} value={exp.title}>
                    {exp.title}
                  </option>
                ))}
              </select>
            </>
          )}

          <button onClick={handleSaveDestination}>Save Destination</button>
        </div>
      )}

      {/* Display saved trip plan */}
      <div className="trip-plan">
        <h2>Your Plan:</h2>
        {Object.entries(plan).map(([date, destination], index) => (
          <div key={index}>
            <strong>{date}: </strong>
            <span>{destination}</span>
          </div>
        ))}
      </div>

      {/* Download PDF Button */}
      <button onClick={handleDownloadPDF}>Download Trip Plan as PDF</button>

      {/* Icons Section */}
      <div className="icons">
        <FaMapMarkedAlt size={30} />
        <FaCalendarAlt size={30} />
        <FaCamera size={30} />
      </div>
    </div>
  );
};

export default TripPlanner;
