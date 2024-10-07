import { useState, useEffect, startTransition, Suspense } from 'react';
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Icon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
} from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { useDispatch, useSelector } from 'react-redux';
import { FaCube, FaArrowsAlt, FaDraftingCompass } from 'react-icons/fa';
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

// Component to render the 3D Model inside a Modal
const Model = () => {
  const { scene } = useGLTF('../../public/ficus.glb');
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <OrbitControls enableZoom={true} minDistance={0.6} maxDistance={3} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <primitive object={scene} scale={0.8} />
      <Environment preset="sunset" />
    </Canvas>
  );
};

const ThreeDModelViewer = () => (
  <Suspense fallback={<Loader />}>
    <Model />
  </Suspense>
);

const ProductButtons = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isQrOpen,
    onOpen: onQrOpen,
    onClose: onQrClose,
  } = useDisclosure();

  const handle3DModelOpen = () => {
    startTransition(() => {
      onOpen();
    });
  };

  return (
    <>
      <Flex justifyContent="center" my={6} maxW="370px">
        <HStack spacing={4} w="100%">
          <Box
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            p={3}
            textAlign="center"
            flex="1"
            h="80px"
            cursor="pointer"
            _hover={{ boxShadow: 'lg' }}
          >
            <Button
              variant="unstyled"
              onClick={handle3DModelOpen}
              h="100%"
              w="100%"
            >
              <Flex direction="column" align="center" justify="center" h="100%">
                <Icon as={FaCube} boxSize={5} mb={1} />
                <Text fontFamily={'lato'} fontSize="sm">
                  See this item in 3D
                </Text>
              </Flex>
            </Button>
          </Box>

          <Box
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            p={3}
            textAlign="center"
            flex="1"
            h="80px"
            cursor="pointer"
            _hover={{ boxShadow: 'lg' }}
          >
            <Button variant="unstyled" onClick={onQrOpen} h="100%" w="100%">
              <Flex direction="column" align="center" justify="center" h="100%">
                <Icon as={FaArrowsAlt} boxSize={5} mb={1} />
                <Text fontFamily={'lato'} fontSize="sm">
                  See it in your space
                </Text>
              </Flex>
            </Button>
          </Box>
        </HStack>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent top="10%">
          <ModalHeader>3D Model Viewer</ModalHeader>
          <ModalCloseButton />
          <ModalBody h="500px" overflowY="scroll">
            <Box w="100%" h="500px">
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

      <Modal isOpen={isQrOpen} onClose={onQrClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scan to See in Augmented Reality</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src="https://www.echo3d.com/qrcode" alt="QR Code" />
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

// WriteReviewForm component
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

const ProductImage = ({ image, name }) => (
  <VStack spacing={4} align="center">
    <Image
      src={`http://127.0.0.1:8000${image}`}
      alt={name}
      boxSize={{ base: '100%', md: '400px', lg: '500px' }}
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
    w={{ base: '100%', md: '100%' }}
    maxW="container.sm"
  >
    <Heading as="h3" size={{ base: 'lg', md: 'xl' }} fontFamily="lato">
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
      ${product.price}
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

const ProductPurchaseOptions = ({ product, qty, setQty, addToCartHandler }) => {
  const handleQtyChange = valueString => {
    const value = Number(valueString);
    if (value <= product.countInStock) {
      setQty(value);
    } else {
      setQty(product.countInStock); // Prevent setting qty higher than stock
    }
  };

  return (
    <VStack
      spacing={6}
      align="stretch"
      w="full"
      maxH={300}
      p={{ base: 4, md: 6 }}
      shadow="lg"
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
    >
      <VStack spacing={6} align="stretch">
        <Flex justify="space-between">
          <Text color={'black'} fontFamily="lato">
            Price:
          </Text>
          <Text color={'black'} fontFamily="lato" fontWeight="bold">
            ${product.price}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text color={'black'} fontFamily="lato">
            Status:
          </Text>
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
            <Text color={useColorModeValue('black', 'black')} fontFamily="lato">
              Qty
            </Text>
            <NumberInput
              value={qty}
              onChange={handleQtyChange}
              min={1}
              max={product.countInStock}
              clampValueOnBlur={false}
              size="md"
              borderColor={useColorModeValue('gray.300', 'gray.600')}
            >
              <NumberInputField
                bg={useColorModeValue('white', 'gray.700')}
                color={useColorModeValue('black', 'white')}
              />
              <NumberInputStepper>
                <NumberIncrementStepper
                  borderColor={useColorModeValue('gray.300', 'gray.600')}
                  color={useColorModeValue('black', 'white')}
                />
                <NumberDecrementStepper
                  borderColor={useColorModeValue('gray.300', 'gray.600')}
                  color={useColorModeValue('black', 'white')}
                />
              </NumberInputStepper>
            </NumberInput>
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
};

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
  <Box mt={50}>
    <Heading as="h4" size="md" mb={4}>
      Reviews
    </Heading>
    {product.reviews.length === 0 && (
      <Box w="100%" display="flex" justifyContent="center" maxW="600px" mb={10}>
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
              <Text color={'black'} fontFamily="lato" fontWeight="bold">
                {review.name}
              </Text>
              <Rating value={review.rating} color="#008b4a" />
            </Flex>
            <Text fontFamily="lato" fontSize="sm" color="gray.500">
              {review.createdAt.substring(0, 10)}
            </Text>
            <Text color={'black'} fontFamily="lato">
              {review.comment}
            </Text>
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

const ProductImageAndButtons = ({ image, name }) => (
  <Flex
    direction={{ base: 'column', md: 'column' }}
    align="center"
    justify="center"
    maxWidth={370}
    // mb={10}
  >
    {/* Product Image */}
    <ProductImage image={image} name={name} />

    {/* Product Buttons */}
    <ProductButtons />
  </Flex>
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
                {/* Product Image and Buttons Container */}
                <ProductImageAndButtons
                  image={product.image}
                  name={product.name}
                />
                {/* Product Details */}
                <ProductDetails product={product} />

                {/* Product Purchase Options */}
                <ProductPurchaseOptions
                  product={product}
                  qty={qty}
                  setQty={setQty}
                  addToCartHandler={addToCartHandler}
                />
              </SimpleGrid>

              {/* Product Reviews */}
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

export default ProductPage;
