import React, { useState, useEffect } from 'react';
import './StepCounterDetail.css';
import VideoBackground from './VideoBackground'; // Assuming you create a separate component for the video background

const StepCounterDetail = () => {
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    // Fetch the step count and distance from local storage or API
    const storedSteps = localStorage.getItem('steps');
    const storedDistance = localStorage.getItem('distance');

    if (storedSteps && storedDistance) {
      setSteps(Number(storedSteps));
      setDistance(Number(storedDistance));
      setCalories(calculateCalories(Number(storedDistance)));
    }
  }, []);

  const calculateCalories = (distance) => {
    // Average calories burned per kilometer for walking
    const caloriesPerKm = 60;
    return distance * caloriesPerKm;
  };

  return (
    <div className="step-counter-detail-page">
      <VideoBackground />
      <div className="step-counter-detail-container">
        <h2>Step Counter Details</h2>
        <p>Steps: {steps}</p>
        <p>Distance: {distance.toFixed(2)} km</p>
        <p>Calories Burned: {calories.toFixed(2)} kcal</p>
      </div>
    </div>
  );
};

export default StepCounterDetail;
