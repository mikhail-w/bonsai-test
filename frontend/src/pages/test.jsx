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