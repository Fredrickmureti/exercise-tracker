import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sound from 'react-sound';
import 'react-toastify/dist/ReactToastify.css';
import './StepCounter.css';

const StepCounter = () => {
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [prevPosition, setPrevPosition] = useState(null);
  const [playSound, setPlaySound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (prevPosition) {
            const distanceCovered = calculateDistance(
              prevPosition.latitude,
              prevPosition.longitude,
              latitude,
              longitude
            );

            // Only update if the distance is significant to avoid rapid updates
            if (distanceCovered > 0.01) {
              setDistance((prevDistance) => prevDistance + distanceCovered);
              setSteps((prevSteps) => prevSteps + Math.floor(distanceCovered * 1312.33595801)); // Approx steps per meter
              if (distanceCovered >= 0.5) {
                setPlaySound(true);
                toast.info(`You have covered ${Math.floor(distanceCovered * 1000)} meters!`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            }
          }
          setPrevPosition({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }, [prevPosition]);

  useEffect(() => {
    localStorage.setItem('steps', steps);
    localStorage.setItem('distance', distance);
  }, [steps, distance]);

  useEffect(() => {
    if (distance >= 0.5 && !playSound) {
      setPlaySound(true);
    }
  }, [distance]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers value
    return distance;
  };

  return (
    <div className="step-counter" onClick={() => navigate('/step-counter-detail')}>
      <h2>Step Counter</h2>
      <p>Steps: {steps}</p>
      <p>Distance: {distance.toFixed(2)} km</p>
      {playSound && (
        <Sound
          url="/audio/NAVIGATION.wav"
          playStatus={Sound.status.PLAYING}
          onFinishedPlaying={() => setPlaySound(false)}
        />
      )}
    </div>
  );
};

export default StepCounter;
