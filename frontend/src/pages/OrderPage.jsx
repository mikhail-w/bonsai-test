import { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  Divider,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Loader from '../components/Loader';
import { cleanMediaPath } from '../utils/urlUtils';

function OrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orderId = id;
  const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector(state => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  // Define colors using useColorModeValue to toggle colors based on theme
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const badgeColorSchemePaid = useColorModeValue('green', 'green');
  const badgeColorSchemeUnpaid = useColorModeValue('red', 'red');

  const getImageUrl = imagePath => {
    if (!imagePath) {
      return `${
        import.meta.env.VITE_API_BASE_URL
      }/media/default/placeholder.jpg`;
    }
    // console.log('ORDER PAGE:', imagePath);
    // If the image path is already a full URL, return it as is
    if (imagePath.startsWith('http')) {
      // console.log('ORDER PAGE:', imagePath);
      return imagePath;
    }

    // console.log(
    //   'Cleaned Image URL:',
    //   cleanMediaPath(imagePath, import.meta.env.VITE_S3_PATH)
    // );

    // Otherwise, clean and construct the full URL
    return cleanMediaPath(imagePath, import.meta.env.VITE_S3_PATH);
  };

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  const addPayPalScript = () => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://www.paypal.com/sdk/js?client-id=AY90O6g8EZzF8MHT4eYt6_wk5VHSWDCkjrSesaGcLckTqBUq60_ZkDi26_C7mAwmiP8VqdMNktA1cTLR';
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (
      !order ||
      successPay ||
      order._id !== Number(orderId) ||
      successDeliver
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver]);

  const successPaymentHandler = paymentResult => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const createOrder = amount => {
    return (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: amount, // Dynamically pass the amount
            },
          },
        ],
      });
    };
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant={'danger'}>{error}</Message>
  ) : (
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      justify="space-evenly"
      align="start"
      minHeight={'100vh'}
      mt={130}
      mb={100}
      mx={5}
    >
      {/* Shipping, Payment Method, Ordered Items */}
      <VStack
        align="start"
        spacing={6}
        w="full"
        maxW="2xl"
        mr={{ base: 0, md: 10 }}
        mb={10}
      >
        {/* Shipping Section */}
        <Box bg={bgColor} p={1} w="full" mb={-5}>
          <Heading mb={4}>Shipping</Heading>
          <Text fontFamily={'lato'} fontWeight={300}>
            <strong>Name: </strong> {order.user.name}
          </Text>
          <Text fontFamily={'lato'} fontWeight={300}>
            <strong>Email: </strong>
            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
          </Text>
          <Text fontFamily={'lato'} fontWeight={300}>
            <strong>Shipping: </strong>
            {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </Text>
          {order.isDelivered ? (
            <Badge colorScheme="green" mt={3} px={2}>
              Delivered on {order.deliveredAt}
            </Badge>
          ) : (
            <Badge colorScheme="red" mt={3} px={2}>
              Not Delivered
            </Badge>
          )}
          <Divider orientation="horizontal" color={'black'} p={2} />
        </Box>

        {/* Payment Method */}
        <Box bg={bgColor} p={1} w="full" mb={-5}>
          <Heading as="h3" size="lg" mb={4}>
            Payment Method
          </Heading>
          <Text fontFamily={'lato'} fontWeight={300}>
            <strong>Method: </strong> {order.paymentMethod}
          </Text>
          {order.isPaid ? (
            <Badge colorScheme="green" mt={3} px={2}>
              Paid on {order.paidAt}
            </Badge>
          ) : (
            <Badge colorScheme="red" mt={3} px={2}>
              Not Paid
            </Badge>
          )}
          <Divider orientation="horizontal" color={'black'} p={2} />
        </Box>

        {/* Ordered Items */}
        <Box bg={bgColor} p={1} w="full">
          <Heading as="h3" size="lg" mb={4}>
            Ordered Items
          </Heading>
          {order.orderItems.length === 0 ? (
            <Message variant="info">Your order is empty</Message>
          ) : (
            <VStack spacing={4} align="start">
              {order.orderItems.map((item, index) => (
                <Flex key={index} align="center" w="full">
                  <Image
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    boxSize="50px"
                    objectFit="cover"
                    mr={4}
                    rounded="md"
                    fallbackSrc={`${
                      import.meta.env.VITE_API_BASE_URL
                    }/media/default/placeholder.jpg`}
                    onError={e => {
                      e.target.src = `${
                        import.meta.env.VITE_API_BASE_URL
                      }/media/default/placeholder.jpg`;
                    }}
                  />

                  <Link to={`/product/${item.product}`}>
                    <Text fontWeight={300} fontFamily={'lato'}>
                      {item.name}
                    </Text>
                  </Link>
                  <Text fontWeight={300} fontFamily={'lato'} ml="auto">
                    {item.qty} X ${item.price} = $
                    {(item.qty * item.price).toFixed(2)}
                  </Text>
                </Flex>
              ))}
            </VStack>
          )}
        </Box>
      </VStack>

      {/* Order Summary */}
      <Box w="full" maxW="sm" bg={bgColor} p={6} shadow="md" rounded="md">
        <Heading as="h3" size="lg" mb={4}>
          Order Summary
        </Heading>
        <Divider mb={4} borderColor={borderColor} />
        <VStack spacing={4} align="stretch">
          <Flex
            justify="space-between"
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            <Text fontWeight={300} fontFamily={'lato'} color={textColor}>
              Items:
            </Text>
            <Text fontWeight={300} fontFamily={'lato'} color={textColor}>
              ${order.itemsPrice}
            </Text>
          </Flex>
          <Flex
            justify="space-between"
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            <Text fontWeight={300} fontFamily={'lato'}>
              Shipping:
            </Text>
            <Text fontWeight={300} fontFamily={'lato'}>
              ${order.shippingPrice}
            </Text>
          </Flex>
          <Flex
            justify="space-between"
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            <Text fontWeight={300} fontFamily={'lato'}>
              Tax:
            </Text>
            <Text fontWeight={300} fontFamily={'lato'}>
              ${order.taxPrice}
            </Text>
          </Flex>
          <Flex
            justify="space-between"
            fontWeight="bold"
            borderBottom="1px solid"
            borderColor={borderColor}
          >
            <Text fontWeight={300} fontFamily={'lato'}>
              Total:
            </Text>
            <Text fontWeight={300} fontFamily={'lato'}>
              ${order.totalPrice}
            </Text>
          </Flex>
          {!order.isPaid && (
            <>
              {loadingPay && <Loader />}
              {!sdkReady ? (
                <Loader />
              ) : (
                <PayPalScriptProvider
                  options={{
                    clientId: PAYPAL_CLIENT_ID,
                  }}
                >
                  <PayPalButtons
                    createOrder={createOrder(order.totalPrice)}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then(details => {
                        successPaymentHandler(details);
                      });
                    }}
                  />
                </PayPalScriptProvider>
              )}
            </>
          )}
          {loadingDeliver && <Loader />}
          {userInfo &&
            userInfo.isAdmin &&
            order.isPaid &&
            !order.isDelivered && (
              <Button
                onClick={deliverHandler}
                colorScheme="green"
                mt={4}
                w="full"
              >
                Mark as Delivered
              </Button>
            )}
        </VStack>
      </Box>
    </Flex>
  );
}

export default OrderPage;
