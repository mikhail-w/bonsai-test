import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Image,
  Flex,
  Stack,
  Text,
  VStack,
  Grid,
  Heading,
  Divider,
  Container,
  useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import Message from '../components/Message';

function PlaceOrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { order, error, success } = orderCreate;

  // Calculating prices
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
  cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, navigate, dispatch, order]);

  const placeOrder = () => {
    if (!cart.paymentMethod) {
      toast({
        title: 'Payment Method Missing',
        description: 'Please select a payment method before placing the order.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      navigate('/payment');
    } else {
      dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        })
      );
    }
  };

  return (
    <Container maxW="container.xl" mt={130} mb={100} minHeight={'100vh'}>
      <CheckoutSteps step1 step2 step3 step4 />

      <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={6} mt={8}>
        <VStack align="stretch" spacing={5}>
          <Box>
            <Heading fontFamily={'heading'} as="h2" size="lg" mb={3}>
              Shipping
            </Heading>
            <Text fontFamily={'lato'} fontWeight={300}>
              <strong>Address:</strong> {cart.shippingAddress.address},{' '}
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
              {cart.shippingAddress.country}
            </Text>
          </Box>

          <Box>
            <Heading fontFamily={'heading'} as="h2" size="lg" mb={3}>
              Payment Method
            </Heading>
            <Text fontFamily={'lato'} fontWeight={300}>
              <strong>Method:</strong> {cart.paymentMethod}
            </Text>
          </Box>

          <Box>
            <Heading fontFamily={'heading'} as="h2" size="lg" mb={3}>
              Order Items
            </Heading>
            {cart.cartItems.length === 0 ? (
              <Message fontFamily={'heading'} status="info">
                Your cart is empty
              </Message>
            ) : (
              <VStack align="stretch" spacing={3}>
                {cart.cartItems.map((item, index) => (
                  <Flex key={index} align="center" justify="space-between">
                    <Image
                      src={
                        item.image
                          ? `${import.meta.env.VITE_API_BASE_URL}${item.image}`
                          : `${
                              import.meta.env.VITE_API_BASE_URL
                            }/media/default/placeholder.jpg`
                      }
                      alt={
                        item.image
                          ? `Picture of ${item.name}`
                          : 'Placeholder image for product'
                      }
                      fallbackSrc={`${
                        import.meta.env.VITE_API_BASE_URL
                      }/media/default/placeholder.jpg`}
                      width="100px"
                      height="100px"
                      objectFit="contain"
                      borderRadius="md"
                    />
                    <Link to={`/product/${item.product}`}>
                      <Text pl={5} fontFamily={'lato'} fontWeight={300}>
                        {item.name}
                      </Text>
                    </Link>
                    <Text fontFamily={'lato'} fontSize="sm" fontWeight={300}>
                      {item.qty} x ${item.price} = $
                      {(item.qty * item.price).toFixed(2)}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            )}
          </Box>
        </VStack>

        <Box p={5} shadow="md" borderWidth="1px">
          <Heading fontFamily={'heading'} as="h2" size="lg" mb={5}>
            Order Summary
          </Heading>

          <VStack align="stretch" spacing={4}>
            <Flex justify="space-between">
              <Text fontFamily={'heading'}>Items:</Text>
              <Text fontFamily={'lato'} fontWeight={300}>
                ${cart.itemsPrice}
              </Text>
            </Flex>

            <Flex justify="space-between">
              <Text fontFamily={'heading'}>Shipping:</Text>
              <Text fontFamily={'lato'} fontWeight={300}>
                ${cart.shippingPrice}
              </Text>
            </Flex>

            <Flex justify="space-between">
              <Text fontFamily={'heading'}>Tax:</Text>
              <Text fontFamily={'lato'} fontWeight={300}>
                ${cart.taxPrice}
              </Text>
            </Flex>

            <Divider />

            <Flex justify="space-between" fontWeight="bold">
              <Text fontFamily={'heading'}>Total:</Text>
              <Text fontFamily={'lato'} fontWeight={300}>
                ${cart.totalPrice}
              </Text>
            </Flex>

            {error && <Message status="error">{error}</Message>}

            <Button
              colorScheme="green"
              size="lg"
              w="full"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrder}
            >
              Place Order
            </Button>
          </VStack>
        </Box>
      </Grid>
    </Container>
  );
}

export default PlaceOrderPage;
