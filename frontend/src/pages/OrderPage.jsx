import React, { useState, useEffect } from 'react';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
} from 'react-bootstrap';
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
import '../assets/styles/OrderPage.css';

function OrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orderId = id;
  const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID_2;
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
    <Container fluid="sm" className="summaryContainer">
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item id="item">
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> <span>{order.user.name}</span>
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Shipping: </strong>
                <span>{order.shippingAddress.address}</span>,{' '}
                <span>{order.shippingAddress.city}</span>
                {'  '}
                <span>{order.shippingAddress.postalCode}</span>,{'  '}
                <span>{order.shippingAddress.country}</span>
              </p>
              {order.isDelivered ? (
                <div className="delivered">
                  Delivered on {order.deliveredAt}
                </div>
              ) : (
                <div className="not-delivered">Not Delivered</div>
              )}
            </ListGroup.Item>
            <ListGroup.Item id="item">
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <div className="paid">Paid on {order.paidAt}</div>
              ) : (
                <div className="not-paid">Not Paid</div>
              )}
            </ListGroup.Item>

            <ListGroup.Item id="item">
              <h2>Ordered Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index} id="item">
                      <Row>
                        <Col md={1}>
                          <Image
                            src={`http://127.0.0.1:8000${item.image}`}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
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
                </ListGroup.Item>
              )}
            </ListGroup>
            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item className="d-flex justify-content-center m-4 text-center">
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderPage;
