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
  ScaleFade,
} from '@chakra-ui/react';
import CustomButton from './CustomButton';

// Component to display weather information
const WeatherDisplay = ({ weather }) => {
  return (
    <ScaleFade initialScale={0.9} in={true}>
      <VStack
        spacing={4}
        p={6}
        borderRadius="lg"
        boxShadow="2xl"
        bgGradient="linear(to-br, teal.400, green.300, blue.300)"
        bgSize="cover"
        bgPos="center"
        color={useColorModeValue('gray.800', 'gray.100')}
        transform="scale(1.05)"
        transition="all 0.3s ease-in-out"
        _hover={{ transform: 'scale(1.1)' }}
      >
        <Heading fontSize="2xl">{weather.name}</Heading>
        {/* Weather Icon */}
        <Image
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          boxSize="100px"
        />
        {/* Temperature and Description */}
        <HStack spacing={2}>
          <Text fontSize="5xl" fontWeight="bold">
            {Math.round(weather.main.temp)}°F
          </Text>
          <Text fontSize="lg">
            {weather.weather[0].description.charAt(0).toUpperCase() +
              weather.weather[0].description.slice(1)}
          </Text>
        </HStack>
        {/* Additional Details */}
        <HStack justify="space-between" w="full">
          <VStack>
            <Text>Feels like</Text>
            <Text fontSize="xl" fontWeight="bold">
              {Math.round(weather.main.feels_like)}°F
            </Text>
          </VStack>
          <VStack>
            <Text>Humidity</Text>
            <Text fontSize="xl" fontWeight="bold">
              {weather.main.humidity}%
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </ScaleFade>
  );
};

// Component to display error messages
const ErrorMessage = ({ message }) => (
  <Text color="red.500" mt={4} fontSize="lg">
    {message}
  </Text>
);

function Weather() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherByCity = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError('Unable to retrieve weather data.');
      setWeather(null);
    }
  };

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
    <Container
      maxW="lg"
      p={4}
      pb={10}
      bg={useColorModeValue('gray.50', 'gray.900')}
      borderRadius="lg"
      boxShadow="lg"
    >
      <VStack spacing={6}>
        <Heading fontFamily={'lato'} fontSize="3xl" textAlign="center">
          Local Weather
        </Heading>
        <HStack as="form" onSubmit={handleSubmit} spacing={4} w="full">
          <Input
            placeholder="Enter city name"
            value={city}
            onChange={e => setCity(e.target.value)}
            borderRadius="full"
            bg={useColorModeValue('gray.100', 'gray.700')}
          />
          {/* <Button
            type="submit"
            colorScheme="teal"
            borderRadius="full"
            _hover={{ bg: 'teal.600', transform: 'scale(1.05)' }}
          >
            Get Weather
          </Button> */}
          <CustomButton
            fontSize={{ base: 'sm', md: 'lg' }}
            type="submit"
            onClick={handleSubmit}
          >
            Get Weather
          </CustomButton>
        </HStack>
        {error && <ErrorMessage message={error} />}
        {weather && <WeatherDisplay weather={weather} />}
      </VStack>
    </Container>
  );
}

export default Weather;
