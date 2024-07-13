import React, { useState, useEffect } from 'react';
import './WeatherDetail.css';

const WeatherDetail = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=YOUR_CITY&appid=YOUR_API_KEY&units=metric');
        if (!response.ok) {
          throw new Error('Network response was not okay');
        }
        const data = await response.json();
        setWeather(data);
        setLocation(data.city.name);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="weather-detail-page">
      <div className="weather-detail">
        {weather ? (
          <>
            <h2>Weather in {location}</h2>
            <div className="current-weather">
              <p>Temperature: {weather.list[0].main.temp}°C</p>
              <p>Condition: {weather.list[0].weather[0].description}</p>
            </div>
            <div className="forecast">
              <h3>Future Prediction</h3>
              <ul>
                {weather.list.slice(1, 6).map((forecast, index) => (
                  <li key={index}>
                    <p>{new Date(forecast.dt_txt).toLocaleString()}</p>
                    <p>Temperature: {forecast.main.temp}°C</p>
                    <p>Condition: {forecast.weather[0].description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherDetail;