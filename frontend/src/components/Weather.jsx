import { useState, useEffect } from 'react';
import axios from 'axios';
// import '../assets/styles/Weather.css';
import { Container } from 'react-bootstrap';

function Weather() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch weather based on city name
  const fetchWeatherByCity = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
      );
      setWeather(response.data);
      setError(null); // Clear any previous error
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null); // Clear previous weather data
    }
  };

  // Function to fetch weather based on coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
      );
      setWeather(response.data);
      setError(null); // Clear any previous error
    } catch (err) {
      setError('Unable to retrieve weather data.');
      setWeather(null); // Clear previous weather data
    }
  };

  // UseEffect to fetch weather by location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        error => {
          setError('Geolocation not enabled or denied.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    fetchWeatherByCity();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p>{error}</p>}

      {weather && (
        <div className="weatherBg">
          <h3>Weather in {weather.name}</h3>
          <p>Temperature: {weather.main.temp} °F</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>

          {/* Weather Icon */}
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </Container>
  );
}

export default Weather;
