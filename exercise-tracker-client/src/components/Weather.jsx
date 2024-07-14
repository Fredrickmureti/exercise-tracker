import React, { useState, useEffect } from 'react';
import './Weather.css';
import { Link } from 'react-router-dom';

const Weather = ({ isDetailPage = false }) => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');
  const [city, setCity] = useState(''); // User input city

  const fetchWeather = async (city) => {
    try {
      const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=5d9dbcd8653344f8865e6a26a81735c3`);
      if (!response.ok) {
        throw new Error('Network response was not okay');
      }
      const data = await response.json();
      setWeather(data.data[0]);
      setLocation(data.data[0].city_name);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="weather-container">
      <form onSubmit={handleCitySubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleCityChange}
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      <Link to={`/weather-detail?city=${city}`} className="weather-link">
        <div className="weather">
          {weather ? (
            <>
              <h2>Weather in {location}</h2>
              <p>Temperature: {weather.temp}°C</p>
              <p>Condition: {weather.weather.description}</p>
            </>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>
      </Link>
      {isDetailPage && (
        <div className="forecast">
          <h3>Future Prediction</h3>
          <ul>
            {weather.data.slice(1, 6).map((forecast, index) => (
              <li key={index} className="forecast-item">
                <p>{new Date(forecast.datetime).toLocaleDateString()}</p>
                <p>Temperature: {forecast.temp}°C</p>
                <p>Condition: {forecast.weather.description}</p>
                <div className="weather-icon">
                  {getWeatherIcon(forecast.weather.description)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Weather;