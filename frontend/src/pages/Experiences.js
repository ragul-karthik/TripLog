import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [savedExperiences, setSavedExperiences] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    title: '',
    caption: '',
    image: '',
    tags: ''
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = () => {
    axios.get('${process.env.REACT_APP_API_URL}/api/experiences')
      .then(res => setExperiences(res.data))
      .catch(err => console.error("Error fetching experiences:", err));
  };

  const fetchSavedExperiences = () => {
    axios.get('${process.env.REACT_APP_API_URL}/api/experiences/saved')
      .then(res => setSavedExperiences(res.data))
      .catch(err => console.error("Error fetching saved experiences:", err));
  };

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = { ...formData, tags: formData.tags.split(',').map(t => t.trim()) };
    axios.post('${process.env.REACT_APP_API_URL}/api/experiences', payload)
      .then(() => {
        setFormData({ username: '', title: '', caption: '', image: '', tags: '' });
        fetchExperiences();
      })
      .catch(err => console.error("Error posting experience:", err));
  };

  const markUseful = id => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/experiences/${id}/useful`)
      .then(fetchExperiences)
      .catch(err => console.error("Error marking useful:", err));
  };

  return (
    <div className="experiences-page">
      {/* Left Sidebar: Sorting and View Saved */}
      <div className="experiences-sidebar">
        <div className="sort-options">
          <h3 className="text-lg font-semibold">Sort by:</h3>
          <select className="modern-dropdown" >
            <option value="date">Date</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
        <div className="view-saved mt-4">
          <button className="modern-button" onClick={fetchSavedExperiences}>View Saved Posts</button>
        </div>
      </div>

      {/* Center: Viewing Posts */}
      <div className="experiences-posts">
        <h1 className="text-3xl font-bold mb-4">User Experiences</h1>
        <div className="space-y-6">
          {experiences.map(exp => (
            <div key={exp._id} className="experience-item">
              <div className="text-lg font-semibold">{exp.username}</div>
              <div className="text-xl font-bold">{exp.title}</div>
              {exp.image && <img src={exp.image} alt={exp.title} />}
              <div className="text-sm text-gray-600 mt-2"> {exp.caption}</div>
              <div className="text-sm text-gray-600 mt-2">Tags: {exp.tags.join(', ')}</div>
              <div className="mt-2">
                <span>{exp.usefulVotes} found this useful</span>
                <button
                  onClick={() => markUseful(exp._id)}
                  className="modern-button ml-4"
                >
                  Mark Useful
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar: Create Post */}
      <div className="experiences-create-post">
        <h1 className="text-3xl font-bold mb-4">Create New Experience</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="modern-input"
            required
          />
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="modern-input"
            required
          />
          <textarea
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            placeholder="Write a caption..."
            className="modern-textarea"
            required
          />
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="modern-input"
          />
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="modern-input"
          />
          <button type="submit" className="modern-button">Post</button>
        </form>
      </div>
    </div>
  );
};

export default Experiences;
