import { useState } from 'react';
import axios from 'axios';

const DisasterForm = () => {
  const [disasterData, setDisasterData] = useState({
    disasterType: '',
    location: '',
    latitude: '',
    longitude: '',
    severity: 'Low',
    description: '',
    reportedBy: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisasterData({ ...disasterData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/disasters/report', disasterData);
      alert(res.data.message);
      setDisasterData({
        disasterType: '',
        location: '',
        latitude: '',
        longitude: '',
        severity: 'Low',
        description: '',
        reportedBy: ''
      });
    } catch (error) {
      console.error('Error reporting disaster:', error);
    }
  };

  return (
    <div className="container">
      <h2>Disaster Reporting Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="disasterType" placeholder="Disaster Type" value={disasterData.disasterType} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={disasterData.location} onChange={handleChange} required />
        <input type="number" name="latitude" placeholder="Latitude" value={disasterData.latitude} onChange={handleChange} required />
        <input type="number" name="longitude" placeholder="Longitude" value={disasterData.longitude} onChange={handleChange} required />
        <select name="severity" value={disasterData.severity} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
        <textarea name="description" placeholder="Description" value={disasterData.description} onChange={handleChange} required></textarea>
        <input type="text" name="reportedBy" placeholder="Reported By" value={disasterData.reportedBy} onChange={handleChange} required />
        <button type="submit">Report Disaster</button>
      </form>
    </div>
  );
};

export default DisasterForm;
