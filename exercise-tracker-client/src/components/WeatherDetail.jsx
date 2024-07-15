import React, { useState, useEffect } from 'react';
import './WeatherDetail.css';
import { useLocation } from 'react-router-dom';
import { FaCloudRain, FaSun, FaCloud, FaSnowflake, FaBolt, FaSmog } from 'react-icons/fa';

const WeatherDetail = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');
  const query = new URLSearchParams(useLocation().search);
  const city = query.get('city');

  const fetchWeather = async (city) => {
    try {
      const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=5d9dbcd8653344f8865e6a26a81735c3`);
      if (!response.ok) {
        throw new Error('Network response was not okay');
      }
      const data = await response.json();
      setWeather(data);
      setLocation(data.city_name);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  const getWeatherIcon = (description) => {
    switch (description.toLowerCase()) {
      case 'rain':
      case 'showers':
        return <FaCloudRain />;
      case 'clear':
      case 'sunny':
        return <FaSun />;
      case 'cloudy':
      case 'overcast':
        return <FaCloud />;
      case 'snow':
        return <FaSnowflake />;
      case 'thunderstorm':
        return <FaBolt />;
      case 'fog':
      case 'haze':
        return <FaSmog />;
      default:
        return <FaCloud />;
    }
  };

  return (
    <div className="weather-detail-page">
      <video className="background-video" autoPlay loop muted>
        <source src="../assets/WEATHER_VIDEO.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="weather-detail">
        {weather ? (
          <>
            <h2>Weather in {location}</h2>
            <div className="current-weather">
              <p>Temperature: {weather.data[0].temp}°C</p>
              <p>Condition: {weather.data[0].weather.description}</p>
              <div className="weather-icon">
                {getWeatherIcon(weather.data[0].weather.description)}
              </div>
            </div>
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
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherDetail;