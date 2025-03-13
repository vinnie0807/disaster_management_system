import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import 'leaflet/dist/leaflet.css';


import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const socket = io('http://localhost:5000'); 
const DisasterMap = () => {
  const [disasters, setDisasters] = useState([]);

 
  const fetchDisasters = async () => {
    const res = await axios.get('http://localhost:5000/api/disasters/all');
    setDisasters(res.data);
  };

  useEffect(() => {
    fetchDisasters();

   
    socket.on('updateDisasters', (newDisaster) => {
      setDisasters((prevDisasters) => [...prevDisasters, newDisaster]);
    });

   
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {disasters.map((disaster, index) => (
        <Marker key={index} position={[disaster.latitude, disaster.longitude]}>
          <Popup>
            <strong>{disaster.disasterType}</strong> <br />
            Location: {disaster.location} <br />
            Severity: {disaster.severity} <br />
            Reported By: {disaster.reportedBy}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default DisasterMap;
