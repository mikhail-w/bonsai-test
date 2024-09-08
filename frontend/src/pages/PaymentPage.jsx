import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  VStack,
  Radio,
  RadioGroup,
  Heading,
  Stack,
  useToast,
  Container,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';

function PaymentPage() {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  useEffect(() => {
    if (!shippingAddress?.address) {
      toast({
        title: 'No Shipping Address',
        description:
          'Please provide a shipping address before proceeding to payment.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      navigate('/shipping');
    }
  }, [shippingAddress, navigate, toast]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <Container mt={'200'} maxW="container.sm" minHeight={'100vh'}>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <Box as="form" onSubmit={submitHandler} mt={8}>
          <Heading as="h1" mb={5} fontSize="2xl">
            Select Payment Method
          </Heading>
          <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
            <VStack align="start" spacing={4}>
              <Radio value="PayPal">PayPal or Credit Card</Radio>
              <Radio value="Stripe">Stripe</Radio>
            </VStack>
          </RadioGroup>

          <Button
            type="submit"
            colorScheme="green"
            size="lg"
            mt={150}
            width="full"
          >
            Continue
          </Button>
        </Box>
      </FormContainer>
    </Container>
  );
}

export default PaymentPage;
