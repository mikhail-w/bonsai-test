import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { listMyOrders } from '../actions/orderActions';
import profileImage from '../assets/images/user.png';
import ProfileEditModal from '../components/ProfileEditModal';
import Weather from '../components/Weather';
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Image,
  Table,
} from 'react-bootstrap';
import '../assets/styles/ProfileDashboard.css';

function ProfileDashboard() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector(state => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector(state => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
  });

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSave = updatedData => {
    setProfileData(updatedData);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
    // console.log('ID:', profileData);
    // console.log('ID:', userInfo);
  }, [dispatch, navigate, userInfo, user, success, showModal]);

  const submitHandler = e => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage('');
    }
  };
  const handleModal = () => {
    console.log('Modal');
  };

  return (
    <>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Container className="profileContainer">
        <Row className="mt-4">
          <Col md={4} className="box">
            <Card>
              <Card.Header className="text-center">Profile Picture</Card.Header>
              <Card.Body className="text-center">
                <Image
                  // src="https://via.placeholder.com/150"
                  src={profileImage}
                  roundedCircle
                  className="mb-3"
                />
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>{user.isAdmin ? 'Admin' : 'Customer'}</Card.Text>
                <Button variant="primary" onClick={handleShow}>
                  Edit Profile
                </Button>
              </Card.Body>
            </Card>
            <div className="weatherContainer">
              <Weather />
            </div>
          </Col>

          <Col md={8}>
            <Card>
              <Card.Header>Profile Information</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Email:</strong> {user.email}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Phone:</strong> (123) 456-7890
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Location:</strong> San Francisco, CA
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Joined:</strong> January 2022
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

            <Col className="mt-4 ">
              {/* <h2>My Orders</h2> */}
              {loadingOrders ? (
                <Loader />
              ) : errorOrders ? (
                <Message variant="danger">{errorOrders}</Message>
              ) : (
                // <Table striped responsive className="ordersTable rounded-1">
                <Table
                  striped
                  responsive
                  className="table  table-bordered  rounded"
                >
                  <thead>
                    <tr>
                      <th>My Orders</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th>Delivered</th>
                      <th>Details</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>${order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: 'red' }}
                            ></i>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: 'red' }}
                            ></i>
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button className="btn-sm">Details</Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>

            {/* <Card className="mt-4">
              <Card.Header>Recent Activity</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Posted a new article on React.
                  </ListGroup.Item>
                  <ListGroup.Item>Updated profile picture.</ListGroup.Item>
                  <ListGroup.Item>
                    Commented on "JavaScript Tips".
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Joined the "Frontend Developers" group.
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card> */}
          </Col>
        </Row>
        <ProfileEditModal
          show={showModal}
          handleClose={handleClose}
          profileData={profileData}
          handleSave={handleSave}
        />
      </Container>
    </>
  );
}

export default ProfileDashboard;
