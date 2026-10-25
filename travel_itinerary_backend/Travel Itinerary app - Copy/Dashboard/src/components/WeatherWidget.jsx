
import React, { useState, useEffect } from 'react';

export default function WeatherWidget({ destination }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!destination) return;

    const apiKey = "215684d31be5e083a73eaf0a051a50b1";
    // Extract clean city name if destination has commas
    const cityQuery = destination.includes(',') ? destination.split(',').pop().trim() : destination.trim();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityQuery)}&units=metric&appid=${apiKey}`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Direct weather fetch failed:", err);
        setLoading(false);
      });
  }, [destination]);

  if (loading) {
    return (
      <div className="stat-card" style={{ borderLeftColor: '#cbd5e1', marginBottom: '20px' }}>
        <h5>🌤️ Live Weather</h5>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Loading weather data for {destination}...</p>
      </div>
    );
  }

  if (!weather || !weather.main) {
    return (
      <div className="stat-card" style={{ borderLeftColor: '#f43f5e', marginBottom: '20px' }}>
        <h5>🌤️ Live Weather</h5>
        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Unable to load weather for "{destination}". Ensure city name is valid.
        </p>
      </div>
    );
  }

  return (
    <div className="stat-card" style={{ borderLeftColor: '#3b82f6', marginBottom: '20px' }}>
      <h5>🌤️ Live Weather: {weather.name}</h5>
      <p style={{ fontSize: '1.4rem', fontWeight: '800' }}>
        {Math.round(weather.main.temp)}°C — {weather.weather[0].description}
      </p>
      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
        Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s
      </span>
    </div>
  );
}