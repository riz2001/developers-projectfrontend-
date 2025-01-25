import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Navbar from './Navbar';

// Custom icon for dustbins
const dustbinIcon = new L.Icon({
  iconUrl: 'https://tse2.mm.bing.net/th?id=OIP.Z_JeY3fHyMi4QK082exlpAHaHa&pid=Api&P=0&h=220', // Dustbin image URL
  iconSize: [50, 50], // Icon size
  iconAnchor: [25, 50], // Anchor point
  popupAnchor: [0, -50], // Popup anchor point
});

// Custom icon for another location
const customIcon = new L.Icon({
  iconUrl: 'https://tse4.mm.bing.net/th?id=OIP.mJMPC7BzwPoHjuzyeMG4WAHaHa&pid=Api&P=0&h=220', // New marker image
  iconSize: [50, 50], // Icon size
  iconAnchor: [25, 50], // Anchor point
  popupAnchor: [0, -50], // Popup anchor point
});

const DustbinMap = () => {
  // Coordinates for FISAT and additional locations
  const fisatCoordinates = [10.230545, 76.411328];
  const dustbinLocations = [
    { coords: [10.231456, 76.408827], text: 'Dustbin 1' },
    { coords: [10.230689, 76.408722], text: 'Dustbin 2' },
    { coords: [10.230700, 76.409162], text: 'Dustbin 3' },
  ];
  const additionalLocation = {
    coords: [10.230901, 76.411084], // New marker location
    text: 'Cafeteria Area',
  };

  return (
    <div><Navbar/>
    <div style={{ height: '100vh' }}>
      <MapContainer
        center={fisatCoordinates}
        zoom={18}
        style={{ height: '100%', width: '100%' }}
      >
        {/* Base map layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marker for FISAT */}
        <Marker position={fisatCoordinates}>
          <Popup>
            <b>FISAT</b><br />
            Federal Institute of Science and Technology<br />
            Angamaly, Kerala
          </Popup>
        </Marker>

        {/* Dustbin markers */}
        {dustbinLocations.map((dustbin, index) => (
          <Marker position={dustbin.coords} icon={dustbinIcon} key={index}>
            <Popup>{dustbin.text}</Popup>
          </Marker>
        ))}

        {/* Additional marker */}
        <Marker position={additionalLocation.coords} icon={customIcon}>
          <Popup>{additionalLocation.text}</Popup>
        </Marker>
      </MapContainer>
    </div>
    </div>
  );
};

export default DustbinMap;
