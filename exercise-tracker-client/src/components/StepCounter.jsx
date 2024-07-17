import React, { useState, useEffect, useCallback } from 'react';
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
  const [locationPermission, setLocationPermission] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if steps are already initialized in local storage
    const savedSteps = parseInt(localStorage.getItem('steps'), 10);
    if (!isNaN(savedSteps)) {
      setSteps(savedSteps);
    }
  }, []);

  const handleStartCounting = () => {
    if (!locationPermission) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPrevPosition({ latitude, longitude });
            setLocationPermission(true);
            toast.success('Location permission granted! Step counting initiated.', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          },
          (error) => {
            console.error('Error getting location:', error);
            toast.error('Error getting location. Please enable location services to count steps.', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      } else {
        console.error('Geolocation is not available in this browser.');
        toast.error('Geolocation is not available in this browser. Step counting cannot be initiated.', {
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
  };

  useEffect(() => {
    if (prevPosition) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const distanceCovered = calculateDistance(
            prevPosition.latitude,
            prevPosition.longitude,
            latitude,
            longitude
          );

          // Only update if the distance is significant to avoid rapid updates
          if (distanceCovered > 0.01) {
            setDistance((prevDistance) => prevDistance + distanceCovered);
            detectSteps(distanceCovered);
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

          setPrevPosition({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
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
    return R * c; // Distance in kilometers between the two points
  };

  // Peak detection algorithm for step counting
  const detectSteps = useCallback((distanceCovered) => {
    const stepsCovered = Math.floor(distanceCovered * 1312.33595801); // Approx steps per meter
    setSteps((prevSteps) => prevSteps + stepsCovered);
  }, []);

  const handleReset = () => {
    setSteps(0);
    setDistance(0);
    localStorage.removeItem('steps');
    localStorage.removeItem('distance');
    toast.success('Step counter reset!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="step-counter">
      <div className="controls">
        <button className="start-button" onClick={handleStartCounting}>
          Start Step Counting
        </button>
        <button className="details-button" onClick={() => navigate('/step-counter-detail')}>
          Step Counter Details
        </button>
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
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
