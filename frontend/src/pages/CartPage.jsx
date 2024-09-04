import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Image,
  Button,
  Select,
  Stack,
  Text,
  Container,
  Heading,
  SimpleGrid,
  Center,
  VStack,
} from '@chakra-ui/react';
import { addToCart, removeFromCart } from '../actions/cartActions';
// import EmptyCart from '../assets/images/emptycart2.png';
import EmptyCart from '../assets/images/wp.png';

function CartPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
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
    <Container maxW="container.xl" mt={100} minH="100vh">
      <Center flexDirection="column" mt={12} mb={12}>
        <Heading as="h1" size="xl" mb={6} fontFamily="lato">
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
          <Text fontFamily={'lato'} mb={4} fontSize="lg" color="gray.600">
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
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={10}>
          <Box gridColumn="span 2">
            {cartItems.map(item => (
              <Box
                key={item.product}
                p={6}
                borderWidth="1px"
                borderRadius="lg"
                mb={6}
                shadow="md"
                bg="white"
              >
                <Stack direction={{ base: 'column', md: 'row' }} spacing={6}>
                  <Image
                    src={`http://127.0.0.1:8000${item.image}`}
                    alt={item.name}
                    boxSize="150px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <VStack align="stretch" spacing={3}>
                    <Link to={`/product/${item.product}`}>
                      <Text fontSize="lg" fontWeight="bold" fontFamily="lato">
                        {item.name}
                      </Text>
                    </Link>
                    <Text fontFamily={'lato'} fontSize="lg" color="gray.500">
                      ${item.price}
                    </Text>
                    <Select
                      value={item.qty}
                      onChange={e =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                      maxW="100px"
                      borderColor="gray.300"
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Select>
                    <Button
                      fontFamily={'lato'}
                      variant="outline"
                      colorScheme="red"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Remove
                    </Button>
                  </VStack>
                </Stack>
              </Box>
            ))}
          </Box>

          <Box>
            <Box
              p={6}
              borderWidth="1px"
              borderRadius="lg"
              shadow="md"
              bg="white"
            >
              <Text fontFamily={'lato'} fontSize="lg" fontWeight="bold" mb={4}>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </Text>
              <Text fontFamily={'lato'} fontSize="2xl" fontWeight="bold" mb={6}>
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
