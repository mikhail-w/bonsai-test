import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';
import '../assets/styles/ShippingPage.css';

function ShippingPage() {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <Container className="formContainer ">
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address" className="mt-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter address"
              value={address ? address : ''}
              onChange={e => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="city" className="mt-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter city"
              value={city ? city : ''}
              onChange={e => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="postalCode" className="mt-3">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter postal code"
              value={postalCode ? postalCode : ''}
              onChange={e => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="country" className="mt-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter country"
              value={country ? country : ''}
              onChange={e => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-4">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default ShippingPage;
