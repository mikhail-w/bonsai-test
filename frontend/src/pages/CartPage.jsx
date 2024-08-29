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
} from '@chakra-ui/react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import EmptyCart from '../assets/images/empty-cart.svg';

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
    <Container maxW="container.lg" mt={100} minH="100vh">
      <Center
        flexDirection="column"
        mt={12}
        mb={12}
        minH="80vh"
        justifyContent="space-between"
      >
        <h1 className="title">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <>
            <Center textAlign="center">
              <Image src={EmptyCart} alt="Empty Cart" mx="auto" mb={4} />
            </Center>
            <Button
              onClick={continueHandler}
              colorScheme="teal"
              leftIcon={<i className="fa fa-arrow-left"></i>}
            >
              Continue Shopping
            </Button>
          </>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box>
              {cartItems.map(item => (
                <Box
                  key={item.product}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  mb={4}
                >
                  <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                    <Image
                      src={`http://127.0.0.1:8000${item.image}`}
                      alt={item.name}
                      boxSize="150px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <Stack spacing={2}>
                      <Link to={`/product/${item.product}`}>
                        <Text fontWeight="bold">{item.name}</Text>
                      </Link>
                      <Text>${item.price}</Text>
                      <Select
                        value={item.qty}
                        onChange={e =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Select>
                      <Button
                        variant="outline"
                        colorScheme="red"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Box>

            <Box>
              <Box p={4} borderWidth="1px" borderRadius="md">
                <Text fontSize="lg" mb={4}>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </Text>
                <Text fontSize="xl" mb={6}>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </Text>
                <Button
                  colorScheme="teal"
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
      </Center>
    </Container>
  );
}

export default CartPage;
