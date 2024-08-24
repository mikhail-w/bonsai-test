import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import '../assets/styles/LogPages.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userLogin = useSelector(state => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = e => {
    console.log('Submitted');
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container className="formContainer ">
      <FormContainer>
        <h1>Log In </h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email" id="p" className="mt-5">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="mt-5">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-5 " id="btn">
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer? <Link to={'/register/'}>Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </Container>
  );
}

export default LoginPage;
