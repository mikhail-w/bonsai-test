import { useState, useEffect } from 'react';
import {
  Box,
  Container,
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
  Badge,
  SimpleGrid,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import BackButton from '../components/BackButton';

const ProductImage = ({ image, name }) => (
  <VStack spacing={6}>
    <Image
      src={`http://127.0.0.1:8000${image}`}
      alt={name}
      boxSize="100%"
      objectFit="contain"
    />
  </VStack>
);

const ProductDetails = ({ product }) => (
  <VStack spacing={4} align="start">
    <Heading as="h3" size="lg" fontFamily={'lato'}>
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
    <Text fontSize="2xl" fontWeight="bold" fontFamily="lato">
      Price: ${product.price}
    </Text>
    <Text fontFamily="lato">{product.description}</Text>
  </VStack>
);

const ProductPurchaseOptions = ({ product, qty, setQty, addToCartHandler }) => (
  <VStack spacing={4} align="stretch">
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <VStack spacing={4} align="stretch">
        <Flex justify="space-between">
          <Text fontFamily="lato">Price:</Text>
          <Text fontFamily="lato" fontWeight="bold">
            ${product.price}
          </Text>
        </Flex>

        <Flex justify="space-between">
          <Text fontFamily="lato">Status:</Text>
          <Text>
            {product.countInStock > 0 ? (
              <Badge fontFamily="lato" colorScheme="green">
                In Stock
              </Badge>
            ) : (
              <Badge fontFamily="lato" colorScheme="red">
                Out of Stock
              </Badge>
            )}
          </Text>
        </Flex>

        {product.countInStock > 0 && (
          <HStack spacing={4}>
            <Text fontFamily="lato">Qty</Text>
            <Select value={qty} onChange={e => setQty(e.target.value)}>
              {[...Array(product.countInStock).keys()].map(x => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </Select>
          </HStack>
        )}

        <Button
          colorScheme="green"
          onClick={addToCartHandler}
          isDisabled={product.countInStock === 0}
        >
          Add to Cart
        </Button>
      </VStack>
    </Box>
  </VStack>
);

const WriteReviewForm = ({
  rating,
  setRating,
  comment,
  setComment,
  submitHandler,
  loadingProductReview,
}) => (
  <Box as="form" onSubmit={submitHandler}>
    <VStack spacing={4} align="stretch">
      <Select
        fontFamily="lato"
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
        fontFamily="lato"
        placeholder="Enter your review"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />

      <Button
        fontFamily="lato"
        type="submit"
        colorScheme="green"
        isLoading={loadingProductReview}
      >
        Submit
      </Button>
    </VStack>
  </Box>
);

const ProductReviews = ({
  product,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  loadingProductReview,
  errorProductReview,
  successProductReview,
}) => (
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
            <Box>
              <Text as="span" fontFamily="lato" fontWeight="bold">
                {review.name}
              </Text>
              {`   `}
              <Rating value={review.rating} color="#008b4a" />
            </Box>
            <Text fontFamily="lato">{review.createdAt.substring(0, 10)}</Text>
            <Text fontFamily="lato">{review.comment}</Text>
          </VStack>
        </Box>
      ))}

      <Box>
        <Heading fontFamily="lato" as="h4" size="md" mb={4}>
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
          <WriteReviewForm
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            submitHandler={submitHandler}
            loadingProductReview={loadingProductReview}
          />
        ) : (
          <Message variant="info">
            Please <RouterLink to="/login">login</RouterLink> to write a review
          </Message>
        )}
      </Box>
    </VStack>
  </Box>
);

function ProductPage() {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

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
  }, [dispatch, successProductReview, id]);

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
              <ProductImage image={product.image} name={product.name} />
              <ProductDetails product={product} />
              <ProductPurchaseOptions
                product={product}
                qty={qty}
                setQty={setQty}
                addToCartHandler={addToCartHandler}
              />
            </SimpleGrid>

            <ProductReviews
              product={product}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              loadingProductReview={loadingProductReview}
              errorProductReview={errorProductReview}
              successProductReview={successProductReview}
            />
          </Container>
        )}
      </Box>
    </Container>
  );
}

export default ProductPage;
