import { useState, useEffect } from 'react';
import {
  Box,
  Image,
  Flex,
  VStack,
  HStack,
  Heading,
  Text,
  Stack,
  Button,
  Select,
  Textarea,
  Container,
  Badge,
  SimpleGrid,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import '../assets/styles/ProductPage.css';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import BackButton from '../components/BackButton';

function ProductPage() {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;
  const navigate = useNavigate();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(id));
  }, [dispatch, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <Container maxW="container.xlg" mt={'100px'} minH={'100vh'}>
      <Box>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant={'danger'}>{error}</Message>
        ) : (
          <Container maxW="container.lg" py={6}>
            <BackButton />
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={10}>
              <VStack spacing={6}>
                <Image
                  src={`http://127.0.0.1:8000${product.image}`}
                  alt={product.name}
                  boxSize="100%"
                  objectFit="contain"
                />
              </VStack>

              <VStack spacing={4} align="start">
                <Heading as="h3" size="lg">
                  {product.name}
                </Heading>
                <Box>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} ${
                      product.reviews.length === 1 ? 'review' : 'reviews'
                    }`}
                    color={'#008b4a'}
                  />
                </Box>
                <Text fontSize="2xl" fontWeight="bold">
                  Price: ${product.price}
                </Text>
                <Text>{product.description}</Text>
              </VStack>

              <VStack spacing={4} align="stretch">
                <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
                  <VStack spacing={4} align="stretch">
                    <Flex justify="space-between">
                      <Text>Price:</Text>
                      <Text fontWeight="bold">${product.price}</Text>
                    </Flex>

                    <Flex justify="space-between">
                      <Text>Status:</Text>
                      <Text>
                        {product.countInStock > 0 ? (
                          <Badge colorScheme="green">In Stock</Badge>
                        ) : (
                          <Badge colorScheme="red">Out of Stock</Badge>
                        )}
                      </Text>
                    </Flex>

                    {product.countInStock > 0 && (
                      <HStack spacing={4}>
                        <Text>Qty</Text>
                        <Select
                          value={qty}
                          onChange={e => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Select>
                      </HStack>
                    )}

                    <Button
                      colorScheme="teal"
                      onClick={addToCartHandler}
                      isDisabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </VStack>
                </Box>
              </VStack>
            </SimpleGrid>

            <Box>
              <Heading as="h4" size="md" mb={4}>
                Reviews
              </Heading>
              {product.reviews.length === 0 && (
                <Message variant="info">No Reviews</Message>
              )}
              <VStack spacing={4} align="stretch">
                {product.reviews.map(review => (
                  <Box
                    key={review._id}
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="md"
                  >
                    <VStack align="start">
                      <Text fontWeight="bold">
                        {review.name}
                        {`   `}
                        <Rating value={review.rating} color="#008b4a" />
                      </Text>
                      <Text>{review.createdAt.substring(0, 10)}</Text>
                      <Text>{review.comment}</Text>
                    </VStack>
                  </Box>
                ))}

                <Box>
                  <Heading as="h4" size="md" mb={4}>
                    Write a review
                  </Heading>
                  {loadingProductReview && <Loader />}
                  {successProductReview && (
                    <Message variant="success">Review Submitted</Message>
                  )}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Box as="form" onSubmit={submitHandler}>
                      <VStack spacing={4} align="stretch">
                        <Select
                          placeholder="Select rating"
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Select>

                        <Textarea
                          placeholder="Enter your review"
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        />

                        <Button
                          type="submit"
                          colorScheme="teal"
                          isLoading={loadingProductReview}
                        >
                          Submit
                        </Button>
                      </VStack>
                    </Box>
                  ) : (
                    <Message variant="info">
                      Please <RouterLink to="/login">login</RouterLink> to write
                      a review
                    </Message>
                  )}
                </Box>
              </VStack>
            </Box>
          </Container>
        )}
      </Box>
    </Container>
  );
}

export default ProductPage;


************************WEATHER****************************
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

********************************Map with Thumbnails *************************

import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import {
  Box,
  Text,
  VStack,
  HStack,
  List,
  ListItem,
  Spinner,
  Heading,
  IconButton,
  Input,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import CustomMarker from '../assets/images/leaf-green.png';

const libraries = ['places'];
const mapContainerStyle = {
  height: '60vh',
  width: '100%',
};

const Map = () => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        error => {
          setError('Geolocation not enabled or denied.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (isLoaded && center.lat && center.lng) {
      const map = mapRef.current;
      const service = new google.maps.places.PlacesService(map);

      const request = {
        location: new google.maps.LatLng(center.lat, center.lng),
        radius: '20000',
        type: ['store'],
        keyword: searchTerm || 'bonsai OR garden OR club OR potter',
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setMarkers(
            results.map(place => ({
              id: place.place_id,
              name: place.name,
              position: place.geometry.location,
              type: place.types,
              address: place.vicinity,
              photo: place.photos
                ? place.photos[0].getUrl()
                : '/path/to/default-thumbnail.jpg', // Default thumbnail if no photo
            }))
          );
          setLocationList(results);
        } else {
          setError(`Error fetching places: ${status}`);
        }
      });
    }
  }, [isLoaded, center, searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setMarkers([]);
      setLocationList([]);
    }
  };

  if (loadError) return <Text color="red.500">Error loading maps</Text>;
  if (!isLoaded) return <Spinner size="xl" />;

  return (
    <HStack
      spacing={4}
      px={{ base: 4, md: 8 }}
      py={{ base: 6, md: 10 }}
      bg={useColorModeValue('gray.50', 'gray.800')}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Box width={{ base: '100%', md: '30%' }} overflowY="auto" maxH="60vh">
        <VStack spacing={4} align="stretch">
          <HStack>
            <Input
              placeholder="Search bonsai locations..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              bg={useColorModeValue('white', 'gray.700')}
              borderRadius="md"
              boxShadow="sm"
            />
            <IconButton
              icon={<FaSearch />}
              onClick={handleSearch}
              colorScheme="green"
              aria-label="Search"
            />
          </HStack>

          <Box>
            <Heading size="md" mb={4} fontFamily="rale">
              Nearby Bonsai Locations:
            </Heading>
            <List spacing={4}>
              {locationList.map(location => (
                <ListItem
                  key={location.place_id}
                  p={3}
                  borderRadius="md"
                  boxShadow="sm"
                  bg={useColorModeValue('white', 'gray.700')}
                  _hover={{
                    bg: useColorModeValue('gray.100', 'gray.600'),
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setCenter({
                      lat: location.geometry.location.lat(),
                      lng: location.geometry.location.lng(),
                    });
                  }}
                >
                  <HStack>
                    <Image
                      boxSize="50px"
                      borderRadius="md"
                      src={
                        location.photos
                          ? location.photos[0].getUrl()
                          : '/path/to/default-thumbnail.jpg'
                      }
                      alt={`${location.name} thumbnail`}
                    />
                    <VStack align="start" spacing={1}>
                      <Text fontFamily="rale" fontWeight="bold">
                        {location.name}
                      </Text>
                      <Text fontFamily="rale" fontSize="sm">
                        {location.vicinity}
                      </Text>
                    </VStack>
                  </HStack>
                </ListItem>
              ))}
            </List>
          </Box>
        </VStack>
      </Box>

      <Box flex="1">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={center}
          onLoad={map => (mapRef.current = map)}
        >
          {/* {markers.map(marker => (
            <Marker
              key={marker.id}
              position={marker.position}
              label={{
                text: marker.name,
                color: useColorModeValue('black', 'white'),
                fontSize: '14px',
                fontWeight: 'bold',
              }}
              icon={{
                url: CustomMarker, // Customize marker icon
                scaledSize: new window.google.maps.Size(38, 95),
              }}
            />
          ))} */}
          {markers.map(marker => (
            <Marker
              key={marker.id}
              position={marker.position}
              label={{
                text: marker.name,
                color: ' #58d68d ',
                fontSize: '14px',
                fontWeight: 'bold',
                // Only show the label if the marker is hovered over
                opacity: hoveredMarkerId === marker.id ? 1 : 0,
              }}
              icon={{
                url: CustomMarker,
                scaledSize: new window.google.maps.Size(38, 95),
              }}
              onMouseOver={() => setHoveredMarkerId(marker.id)}
              onMouseOut={() => setHoveredMarkerId(null)}
            />
          ))}
        </GoogleMap>
      </Box>
    </HStack>
  );
};

export default Map;
