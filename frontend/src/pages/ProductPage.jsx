import React, { useState, useEffect } from 'react';
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
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure, // Chakra's hook for managing modal state
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
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Assuming BonsaiViewer is a 3D viewer component
import BonsaiViewer from '/src/pages/BonsaiViewer.jsx';

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

const ProductDetails = ({ product, onOpenModal }) => (
  <VStack spacing={4} align="start">
    <Heading as="h3" size="lg" fontFamily={'rale'}>
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
    <Text fontSize="2xl" fontWeight="bold" fontFamily="rale">
      Price: ${product.price}
    </Text>
    <Text fontFamily="rale">{product.description}</Text>

    {/* Button to open the modal */}
    <Button onClick={onOpenModal} colorScheme="blue" mt={4}>
      See in 3D View
    </Button>
  </VStack>
);

const ProductPurchaseOptions = ({ product, qty, setQty, addToCartHandler }) => (
  <VStack spacing={4} align="stretch">
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <VStack spacing={4} align="stretch">
        <Flex justify="space-between">
          <Text fontFamily="rale">Price:</Text>
          <Text fontFamily="rale" fontWeight="bold">
            ${product.price}
          </Text>
        </Flex>

        <Flex justify="space-between">
          <Text fontFamily="rale">Status:</Text>
          <Text>
            {product.countInStock > 0 ? (
              <Badge fontFamily="rale" colorScheme="green">
                In Stock
              </Badge>
            ) : (
              <Badge fontFamily="rale" colorScheme="red">
                Out of Stock
              </Badge>
            )}
          </Text>
        </Flex>

        {product.countInStock > 0 && (
          <HStack spacing={4}>
            <Text fontFamily="rale">Qty</Text>
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

  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra modal hook

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
              <ProductDetails product={product} onOpenModal={onOpen} />
              <ProductPurchaseOptions
                product={product}
                qty={qty}
                setQty={setQty}
                addToCartHandler={addToCartHandler}
              />
            </SimpleGrid>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>3D View</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <BonsaiViewer />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Container>
        )}
      </Box>
    </Container>
  );
}

export default ProductPage;
