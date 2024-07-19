import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animated } from 'react-spring';
import './MapTracker.css';

const MapTracker = () => {
  const [position, setPosition] = useState(null);
  const [path, setPath] = useState([]);
  const [distanceCovered, setDistanceCovered] = useState(0);

  useEffect(() => {
    const storedPath = JSON.parse(localStorage.getItem('runningPath')) || [];
    const storedDistance = JSON.parse(localStorage.getItem('distanceCovered')) || 0;

    setPath(storedPath);
    setDistanceCovered(storedDistance);
  }, []);

  const calculateDistance = (prevPos, newPos) => {
    if (!prevPos || !newPos) return 0;

    const [lat1, lon1] = prevPos;
    const [lat2, lon2] = newPos;

    const toRad = (val) => (val * Math.PI) / 180;

    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d; // distance in km
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const success = (pos) => {
      const { latitude, longitude } = pos.coords;
      const newPosition = [latitude, longitude];

      if (position) {
        const previousPosition = position;
        const distance = calculateDistance(previousPosition, newPosition);
        setDistanceCovered(prevDistance => prevDistance + distance);
      }

      setPosition(newPosition);
      setPath((prevPath) => [...prevPath, newPosition]);

      // Save path and distance to local storage
      localStorage.setItem('runningPath', JSON.stringify([...path, newPosition]));
      localStorage.setItem('distanceCovered', JSON.stringify(distanceCovered + calculateDistance(position, newPosition)));
    };

    const error = () => {
      toast.error('Unable to retrieve your location.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

    navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true });
    const watcher = navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000,
    });

    return () => navigator.geolocation.clearWatch(watcher);
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      locationfound(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <animated.div className="pin"></animated.div>
      </Marker>
    );
  };

  return (
    <div className="map-tracker">
      <h2 className="map-tracker-title">Map Tracker</h2>
      <button className="location-button" onClick={requestLocation}>Enable Location</button>
      <div className="map-tracker-container">
        <MapContainer center={position || [0, 0]} zoom={13} scrollWheelZoom={true} className="map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
          <Polyline positions={path} />
        </MapContainer>
      </div>
      <div className="distance-info">
        <h3>Distance Covered: {distanceCovered.toFixed(2)} km</h3>
      </div>
    </div>
  );
};

export default MapTracker;