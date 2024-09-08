import { HStack, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <HStack justify="center" mb={4} spacing={4}>
      <Button
        fontFamily={'lato'}
        fontSize={'.7rem'}
        as={RouterLink}
        to="/login"
        colorScheme="green"
        variant={step1 ? 'solid' : 'outline'}
        isDisabled={!step1}
      >
        Login
      </Button>

      <Button
        fontFamily={'lato'}
        fontSize={'.7rem'}
        as={RouterLink}
        to="/shipping"
        colorScheme="green"
        variant={step2 ? 'solid' : 'outline'}
        isDisabled={!step2}
      >
        Shipping
      </Button>

      <Button
        fontFamily={'lato'}
        fontSize={'.7rem'}
        as={RouterLink}
        to="/payment"
        colorScheme="green"
        variant={step3 ? 'solid' : 'outline'}
        isDisabled={!step3}
      >
        Payment
      </Button>

      <Button
        fontFamily={'lato'}
        fontSize={'.7rem'}
        as={RouterLink}
        to="/placeorder"
        colorScheme="green"
        variant={step4 ? 'solid' : 'outline'}
        isDisabled={!step4}
      >
        Place Order
      </Button>
    </HStack>
  );
}

export default CheckoutSteps;
