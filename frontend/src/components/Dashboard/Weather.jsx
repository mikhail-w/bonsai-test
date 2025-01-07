import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Input,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  useColorModeValue,
  ScaleFade,
  Icon,
  Divider,
  InputGroup,
  InputLeftElement,
  Flex,
} from '@chakra-ui/react';
import {
  FaMapMarkerAlt,
  FaThermometerHalf,
  FaTint,
  FaSearch,
  FaExclamationCircle,
} from 'react-icons/fa';
import CustomButton from '../CustomButton';

const WeatherDisplay = ({ weather }) => {
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, teal.50)',
    'linear(to-br, gray.800, blue.900)'
  );
  const cardBg = useColorModeValue('whiteAlpha.900', 'blackAlpha.400');
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const subTextColor = useColorModeValue('gray.500', 'gray.400');
  const iconBg = useColorModeValue('blue.50', 'whiteAlpha.100');

  return (
    <ScaleFade initialScale={0.95} in={true}>
      <Box
        w="full"
        maxW="800px"
        borderRadius="2xl"
        overflow="hidden"
        position="relative"
        bgGradient={bgGradient}
        // outline={'2px solid green'}
      >
        <Box p={8} backdropFilter="blur(10px)" backgroundColor={cardBg}>
          {/* Header with Location */}
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            spacing={6}
            align="center"
            justify="center"
            w="full"
          >
            {/* Location and Heading */}
            <HStack spacing={2} align="center" mb={{ base: 6, lg: 0 }}>
              <Icon as={FaMapMarkerAlt} color="blue.400" w={5} h={5} />
              <Heading fontSize="2xl" fontWeight="600" color={textColor}>
                {weather.name}
              </Heading>
            </HStack>

            {/* Main Weather Display */}
            <VStack spacing={2} align="center" mx={{ base: 0, lg: 8 }}>
              <Image
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                boxSize="120px"
                filter="drop-shadow(0 0 8px rgba(0, 0, 0, 0.32))"
              />
              <Text
                fontSize="6xl"
                fontWeight="bold"
                color={textColor}
                lineHeight="1"
              >
                {Math.round(weather.main.temp)}°
              </Text>
              <Text
                fontSize="lg"
                color={subTextColor}
                textTransform="capitalize"
                fontWeight="medium"
              >
                {weather.weather[0].description}
              </Text>
            </VStack>
            <Box
              w={{ base: '80%', lg: '1px' }}
              h={{ base: '1px', lg: '100px' }} // Explicit height for vertical orientation
              my={{ base: 4, lg: 0 }}
              mx={{ base: 'auto', lg: 4 }}
            >
              <Divider
                orientation={{ base: 'horizontal', lg: 'vertical' }}
                borderColor="gray.600"
                borderWidth="1px"
                backgroundColor={'green'}
                h="100%" // Take full height of parent
              />
            </Box>

            {/* Additional Details */}
            <HStack
              justify="space-around"
              w={{ base: 'full', lg: 'auto' }}
              spacing={{ base: 4, lg: 8 }}
              px={4}
              flex="1"
            >
              <VStack
                align="center"
                bg={iconBg}
                p={4}
                borderRadius="lg"
                flex="1"
              >
                <Icon as={FaThermometerHalf} color="blue.400" w={5} h={5} />
                <Text textAlign={'center'} fontSize="sm" color={subTextColor}>
                  Feels like
                </Text>
                <Text fontSize="xl" fontWeight="bold" color={textColor}>
                  {Math.round(weather.main.feels_like)}°
                </Text>
              </VStack>

              <VStack
                align="center"
                bg={iconBg}
                p={4}
                borderRadius="lg"
                flex="1"
              >
                <Icon as={FaTint} color="blue.400" w={5} h={5} />
                <Text fontSize="sm" color={subTextColor}>
                  Humidity
                </Text>
                <Text fontSize="xl" fontWeight="bold" color={textColor}>
                  {weather.main.humidity}%
                </Text>
              </VStack>
            </HStack>
          </Flex>
        </Box>
      </Box>
    </ScaleFade>
  );
};

const ErrorMessage = ({ message }) => (
  <Text
    color="red.400"
    mt={4}
    fontSize="md"
    display="flex"
    alignItems="center"
    gap={2}
  >
    <Icon as={FaExclamationCircle} /> {message}
  </Text>
);

function Weather() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeatherByCity = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError('Unable to retrieve weather data.');
      setWeather(null);
    } finally {
      setIsLoading(false);
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
    if (!city.trim()) return;
    fetchWeatherByCity();
  };

  return (
    <Container
      maxW="4xl"
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="2xl"
      boxShadow="xl"
      // outline={'2px solid red'}
    >
      <VStack spacing={4}>
        <Heading
          fontFamily="lato"
          fontSize="3xl"
          fontWeight="500"
          color={useColorModeValue('gray.700', 'gray.100')}
        >
          Weather Forecast
        </Heading>

        <HStack
          as="form"
          onSubmit={handleSubmit}
          spacing={4}
          w="full"
          maxW="md"
          h="40px"
          // outline={'2px solid blue'}
        >
          <InputGroup>
            <InputLeftElement>
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Enter city name"
              value={city}
              onChange={e => setCity(e.target.value)}
              borderRadius="full"
              bg={useColorModeValue('white', 'gray.800')}
              _focus={{
                borderColor: 'blue.400',
                boxShadow: '0 0 0 1px blue.400',
              }}
              sx={{
                '&::placeholder': {
                  fontSize: { base: 'xs', md: 'md' },
                },
              }}
            />
          </InputGroup>

          <CustomButton
            fontSize="sm"
            size="md"
            px={8}
            py={2}
            type="submit"
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Search
          </CustomButton>
        </HStack>

        {error && <ErrorMessage message={error} />}
        {weather && <WeatherDisplay weather={weather} />}
      </VStack>
    </Container>
  );
}

export default Weather;
