import React, { useState } from 'react';
import './App.css'; // Import the CSS file

const App= () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=2946f4191a924f79993121352250308&q=${city}`
      );
      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError('');
      }
    } catch (err) {
      setError('API call failed.');
      setWeather(null);
    }
  };

  return (
    <div className="app-container">
      <h2 className="title">🌦️ Weather App</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h3>{weather.location.name}, {weather.location.country}</h3>
          <div className="weather-info">
            <img src={weather.current.condition.icon} alt="icon" />
            <div>
              <p><strong>Temperature:</strong> {weather.current.temp_c}°C</p>
              <p><strong>Condition:</strong> {weather.current.condition.text}</p>
              <p><strong>Humidity:</strong> {weather.current.humidity}%</p>
              <p><strong>Wind:</strong> {weather.current.wind_kph} kph</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;







