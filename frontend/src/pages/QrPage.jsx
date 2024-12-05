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
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { AiOutlineQrcode } from 'react-icons/ai'; // Example icon for QR code
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
import ficus from '../assets/models/ficus_bonsai .glb';

// Component to render the 3D Model inside a Modal
const ThreeDModelViewer = () => (
  <Canvas>
    <OrbitControls />
    <ambientLight intensity={0.5} />
    <directionalLight position={[0, 10, 5]} />
    {/* Replace with your GLB Model */}
    {ficus}
    <mesh>
      <boxBufferGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
    <Environment preset="sunset" />
  </Canvas>
);

const ProductButtons = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isQrOpen,
    onOpen: onQrOpen,
    onClose: onQrClose,
  } = useDisclosure();

  return (
    <>
      <Flex justifyContent="center" my={6}>
        <HStack spacing={6}>
          {/* Button to open 3D model modal */}
          <Button variant="outline" onClick={onOpen}>
            See this item in 3D
          </Button>

          {/* Button to show QR code */}
          <Button variant="outline" onClick={onQrOpen}>
            See it in your space
          </Button>

          {/* Button to plan space (dummy for now) */}
          <Button variant="outline">Plan a space with this item</Button>
        </HStack>
      </Flex>

      {/* 3D Model Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>3D Model Viewer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" h="400px">
              <ThreeDModelViewer />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* QR Code Modal */}
      <Modal isOpen={isQrOpen} onClose={onQrClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scan to See in Augmented Reality</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src="https://www.echo3d.com/qrcode" alt="QR Code" />
            {/* Replace the image with the actual QR code from echo3D */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onQrClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const ProductImage = ({ image, name }) => (
  <VStack spacing={4} align="center">
    <Image
      // src={`http://127.0.0.1:8000${image}`}
      src={`${image}`}
      alt={name}
      boxSize={{ base: '100%', md: '400px', lg: '500px' }} // Adjusting image size for responsiveness
      objectFit="cover"
      borderRadius="lg"
      shadow="md"
    />
  </VStack>
);

const ProductDetails = ({ product }) => (
  <VStack
    spacing={6}
    align="start"
    w={{ base: '100%', md: '100%' }} // Responsive width
    maxW="container.sm"
  >
    <Heading as="h3" size={{ base: 'lg', md: 'xl' }} fontFamily="lato">
      {' '}
      {/* Adjusting font size */}
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
    <Text
      fontSize={{ base: 'xl', md: '2xl' }}
      fontWeight="bold"
      fontFamily="lato"
    >
      {' '}
      {/* Responsive font size */}${product.price}
    </Text>
    <Text
      fontWeight={400}
      fontFamily="lato"
      lineHeight="tall"
      fontSize={{ base: 'md', md: 'lg' }}
    >
      {product.description}
    </Text>
  </VStack>
);

const ProductPurchaseOptions = ({ product, qty, setQty, addToCartHandler }) => (
  <VStack
    spacing={6}
    align="stretch"
    w="full"
    p={{ base: 4, md: 6 }} // Adjust padding for responsiveness
    shadow="lg"
    borderWidth="1px"
    borderRadius="lg"
    bg="white"
  >
    <VStack spacing={6} align="stretch">
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
          <Select
            value={qty}
            onChange={e => setQty(e.target.value)}
            borderColor="gray.300"
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
        colorScheme="green"
        onClick={addToCartHandler}
        isDisabled={product.countInStock === 0}
        size="lg"
      >
        Add to Cart
      </Button>
    </VStack>
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
        borderColor="gray.300"
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
        borderColor="gray.300"
      />

      <Button
        fontFamily="lato"
        type="submit"
        colorScheme="green"
        isLoading={loadingProductReview}
        size="lg"
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
  <Box mt={150}>
    <Heading as="h4" size="md" mb={4}>
      Reviews
    </Heading>
    {product.reviews.length === 0 && (
      <Box w="100%" display="flex" justifyContent="center" maxW="600px">
        <Message variant="info" w="100%" textAlign="center">
          No Reviews
        </Message>
      </Box>
    )}
    <VStack spacing={4} align="left" maxW="600px" w="100%">
      {product.reviews.map(review => (
        <Box
          key={review._id}
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          bg="white"
        >
          <VStack align="start" spacing={2}>
            <Flex justify="space-between" w="full">
              <Text fontFamily="lato" fontWeight="bold">
                {review.name}
              </Text>
              <Rating value={review.rating} color="#008b4a" />
            </Flex>
            <Text fontFamily="lato" fontSize="sm" color="gray.500">
              {review.createdAt.substring(0, 10)}
            </Text>
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

function QrPage() {
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
    <>
      <Container
        mt={130}
        mb={100}
        maxW="container.xl"
        py={{ base: 4, md: 10 }}
        minH="100vh"
      >
        <Box>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Container maxW="container.xlg" py={6}>
              <Box mb={10}>
                <BackButton />
              </Box>
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
              {/* Product Buttons (3D, AR, etc.) */}
              <ProductButtons product={product} />

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
    </>
  );
}

export default QrPage;
