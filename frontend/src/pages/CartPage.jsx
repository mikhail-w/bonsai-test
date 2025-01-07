import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Image,
  Button,
  Stack,
  Text,
  Container,
  Heading,
  SimpleGrid,
  useToast,
  Center,
  VStack,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberInputField,
  NumberInput,
  useColorModeValue,
} from '@chakra-ui/react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import EmptyCart from '../assets/images/wp.png';
import { cleanMediaPath } from '../utils/urlUtils';

function CartPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const productId = id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const textColor = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const backgroundColor = useColorModeValue('white', 'gray.700');
  const subtotalColor = useColorModeValue('black', 'white');

  // Create a function to get the proper image URL for a cart item
  const getItemImageUrl = itemImage => {
    return itemImage
      ? cleanMediaPath(itemImage, import.meta.env.VITE_API_BASE_URL)
      : cleanMediaPath(
          'default/placeholder.jpg',
          import.meta.env.VITE_API_BASE_URL
        );
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id, name) => {
    dispatch(removeFromCart(id));
    toast({
      title: 'Removed',
      description: `${name} removed from Cart`,
      status: 'error',
      position: 'bottom-right',
      duration: 3000,
      isClosable: true,
    });
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping');
    } else {
      navigate('/login');
    }
  };

  const continueHandler = () => {
    navigate('/');
  };

  return (
    <Container
      maxW="container.xl"
      mt={130}
      mb={100}
      minH="100vh"
      pt={{ base: 0, md: 0 }}
    >
      <Center flexDirection="column" mt={12} mb={12}>
        <Heading as="h1" size="xl" mb={6} fontFamily="lato" color={textColor}>
          Shopping Cart
        </Heading>
      </Center>
      {cartItems.length === 0 ? (
        <Center textAlign="center" flexDirection="column">
          <Image
            src={EmptyCart}
            alt="Empty Cart"
            mx="auto"
            mb={6}
            boxSize="250px"
          />
          <Text fontFamily={'lato'} mb={4} fontSize="lg" color={textColor}>
            Your cart is currently empty
          </Text>
          <Button
            fontFamily="lato"
            onClick={continueHandler}
            colorScheme="green"
            size="lg"
            leftIcon={<i className="fa fa-arrow-left"></i>}
            sx={{
              transition: 'all 0.3s ease',
              _hover: {
                backgroundColor: 'green.600',
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 15px rgba(0, 128, 0, 0.4)',
              },
              _active: {
                backgroundColor: 'green.700',
                transform: 'scale(1.02)',
              },
            }}
          >
            Continue Shopping
          </Button>
        </Center>
      ) : (
        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          spacing={10}
          // boxShadow={'outline'}
          justifyContent="center" // Align content horizontally
          alignItems="center" // Align content vertically
        >
          <Box
            gridColumn={{ base: 'span 1', lg: 'span 2' }}
            w="100%"
            textAlign="center"
          >
            {cartItems.map(item => (
              <Box
                key={item.product}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                mb={6}
                shadow="md"
                bg={backgroundColor}
                maxW={'500px'}
              >
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  spacing={6}
                  alignItems={{ base: 'flex-start', md: 'center' }}
                >
                  {/* Image and product details in a VStack */}
                  <HStack spacing={4} minWidth={335}>
                    {/* Product Image */}
                    <Image
                      src={getItemImageUrl(item.image)}
                      alt={item.name}
                      boxSize="150px"
                      objectFit="cover"
                      borderRadius="md"
                      fallbackSrc={getItemImageUrl('default/placeholder.jpg')}
                    />

                    {/* Product Info (Name, Price, Quantity) */}
                    <VStack align="start" spacing={3}>
                      {/* Product Name */}
                      <Link to={`/product/${item.product}`}>
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          fontFamily="lato"
                          color={textColor}
                        >
                          {item.name}
                        </Text>
                      </Link>

                      {/* Product Price */}
                      <Text fontFamily={'lato'} fontSize="lg" color={textColor}>
                        ${item.price}
                      </Text>
                      <NumberInput
                        value={item.qty}
                        min={1}
                        max={item.countInStock}
                        onChange={valueString =>
                          dispatch(addToCart(item.product, Number(valueString)))
                        }
                        clampValueOnBlur={false}
                        size="md"
                        maxW="100px"
                        borderColor={borderColor}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </VStack>
                  </HStack>
                  <Button
                    fontFamily={'lato'}
                    variant="outline"
                    colorScheme="red"
                    alignSelf={{ base: 'flex-end' }}
                    mt={{ base: 4, md: 0 }}
                    onClick={() =>
                      removeFromCartHandler(item.product, item.name)
                    }
                  >
                    Remove
                  </Button>
                </Stack>
              </Box>
            ))}
          </Box>
          <Box margin={{ base: 'auto', lg: 0 }} alignSelf="flex-start">
            <Box
              p={6}
              borderWidth="1px"
              borderRadius="lg"
              shadow="md"
              bg={backgroundColor}
            >
              <Text
                fontFamily={'lato'}
                fontSize="lg"
                fontWeight="bold"
                mb={4}
                color={subtotalColor}
              >
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{' '}
                {cartItems.reduce((acc, item) => acc + item.qty, 0) === 1
                  ? 'item'
                  : 'items'}
                )
              </Text>
              <Text
                fontFamily={'lato'}
                fontSize="2xl"
                fontWeight="bold"
                mb={6}
                color={subtotalColor}
              >
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </Text>
              <Button
                fontFamily={'lato'}
                colorScheme="green"
                size="lg"
                width="full"
                isDisabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </Box>
          </Box>
        </SimpleGrid>
      )}
    </Container>
  );
}

export default CartPage;
