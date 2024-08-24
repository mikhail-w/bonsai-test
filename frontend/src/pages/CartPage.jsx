import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Empty from '../assets/images/empty-cart.png';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions';
import '../assets/styles/CartPage.css';

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
    <>
      <Container fluid="sm" className="mt-5 cartContainer">
        <h1>Shopping Cart</h1>
        <Row className=" mt-4">
          <Col>
            {cartItems.length === 0 ? (
              <div className="empty">
                <img src={Empty} />
                <div className="continueButton" onClick={continueHandler}>
                  <i className="fa fa-arrow-left"></i>
                  <span>{'  Continue Shopping'}</span>
                </div>
              </div>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map(item => (
                  <ListGroup.Item key={item.product} id="bg">
                    <Row id="row">
                      <Col md={2}>
                        <Image
                          src={`http://127.0.0.1:8000${item.image}`}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>

                      <Col md={2}>${item.price}</Col>

                      <Col md={3}>
                        <Form.Control
                          as="select"
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
                        </Form.Control>
                      </Col>

                      <Col md={1}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </h2>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </ListGroup.Item>
              </ListGroup>

              <ListGroup.Item className="p-3 text-center">
                <Button
                  id="button"
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CartPage;
