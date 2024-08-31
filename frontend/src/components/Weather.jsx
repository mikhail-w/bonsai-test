import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Input,
  Button,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';

// Component to display weather information
const WeatherDisplay = ({ weather }) => {
  return (
    <VStack
      spacing={4}
      p={6}
      borderRadius="lg"
      boxShadow="xl"
      bgGradient="linear(to-br, teal.200, green.200, blue.200, blue.300)"
      bgSize="cover"
      bgPos="center"
      color={useColorModeValue('gray.800', 'gray.200')}
    >
      <Heading fontSize="2xl" fontFamily="rale">
        {weather.name}
      </Heading>

      {/* Weather Icon */}
      <Image
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        boxSize="80px"
      />

      {/* Temperature and Description */}
      <HStack spacing={2}>
        <Text fontSize="5xl" fontWeight="bold" fontFamily="rale">
          {Math.round(weather.main.temp)}°F
        </Text>
        <Text fontSize="lg" fontFamily="rale">
          {weather.weather[0].description.charAt(0).toUpperCase() +
            weather.weather[0].description.slice(1)}
        </Text>
      </HStack>

      {/* Additional Details */}
      <HStack justify="space-between" w="full">
        <VStack spacing={0}>
          <Text fontSize="lg" fontFamily="rale">
            Feels like
          </Text>
          <Text fontSize="2xl" fontWeight="bold" fontFamily="rale">
            {Math.round(weather.main.feels_like)}°F
          </Text>
        </VStack>
        <VStack spacing={0}>
          <Text fontSize="lg" fontFamily="rale">
            Humidity
          </Text>
          <Text fontSize="2xl" fontWeight="bold" fontFamily="rale">
            {weather.main.humidity}%
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

// Component to display error messages
const ErrorMessage = ({ message }) => (
  <Text color="red.500" mt={4}>
    {message}
  </Text>
);

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
        () => {
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
    <Container justifyContent={'left'}>
      <Box mb={4}>
        <VStack spacing={4} alignItems="flex-start">
          <Heading fontSize="2xl" fontFamily="rale">
            Weather in
          </Heading>
          <HStack as="form" onSubmit={handleSubmit}>
            <Input
              placeholder="What City?"
              value={city}
              onChange={e => setCity(e.target.value)}
              borderRadius="full"
              bg={useColorModeValue('gray.100', 'gray.700')}
            />
            <Button
              minW="fit-content"
              type="submit"
              colorScheme="teal"
              borderRadius="full"
            >
              Get Weather
            </Button>
          </HStack>
        </VStack>
      </Box>

      {error && <ErrorMessage message={error} />}

      {weather && <WeatherDisplay weather={weather} />}
    </Container>
  );
}

export default Weather;
