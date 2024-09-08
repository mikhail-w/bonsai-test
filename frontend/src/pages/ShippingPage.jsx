import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Container,
  VStack,
  Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';

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
    <Container minH={'100vh'} maxW="container.md" mt={130} mb={100}>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <Heading as="h1" mb={6}>
          Shipping
        </Heading>
        <Box as="form" onSubmit={submitHandler}>
          <VStack spacing={4} align="stretch">
            <FormControl id="address" isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </FormControl>

            <FormControl id="city" isRequired>
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </FormControl>

            <FormControl id="postalCode" isRequired>
              <FormLabel>Postal Code</FormLabel>
              <Input
                type="text"
                placeholder="Enter postal code"
                value={postalCode}
                onChange={e => setPostalCode(e.target.value)}
              />
            </FormControl>

            <FormControl id="country" isRequired>
              <FormLabel>Country</FormLabel>
              <Input
                type="text"
                placeholder="Enter country"
                value={country}
                onChange={e => setCountry(e.target.value)}
              />
            </FormControl>

            <Button type="submit" colorScheme="green" size="lg" mt={4}>
              Continue
            </Button>
          </VStack>
        </Box>
      </FormContainer>
    </Container>
  );
}

export default ShippingPage;
