import React, { useState, useEffect } from 'react';
import './Weather.css';
import { Link } from 'react-router-dom';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.weatherbit.io/data/2.5/weather?q=YOUR_CITY&appid=YOUR_API_KEY&units=metric');
        if (!response.ok) {
          throw new Error('Network response was not okay');
        }
        const data = await response.json();
        setWeather(data);
        setLocation(data.name);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <Link to="/weather-detail" className="weather-link">
      <div className="weather">
        {weather ? (
          <>
            <h2>Weather in {location}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </Link>
  );
};

export default Weather;