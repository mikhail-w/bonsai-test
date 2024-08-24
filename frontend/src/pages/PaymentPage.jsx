import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';
import '../assets/styles/PaymentPage.css';

function PaymentPage() {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  if (!shippingAddress.address) {
    navigate('/shipping');
  }

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <Container className="formContainer">
      <FormContainer className="mt-5 ">
        <CheckoutSteps step1 step2 step3 />

        <Form onSubmit={submitHandler}>
          <Form.Group>
            <h1>Select Payment Method</h1>
            <Col className="mt-5">
              <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                id="paypal"
                name="paymentMethod"
                checked
                onChange={e => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                className="mt-5"
                type="radio"
                label="Stripe"
                id="stripe"
                name="paymentMethod"
                onChange={e => setPaymentMethod('Stripe')}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-5">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default PaymentPage;
