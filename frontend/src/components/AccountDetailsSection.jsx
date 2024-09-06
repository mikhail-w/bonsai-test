import React from 'react';
import {
  Box,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';

const AccountDetailsSection = () => {
  return (
    <Box
      // boxShadow="outline"
      bg="white"
      p={6}
      borderRadius="md"
      // boxShadow="md"
      w={{ base: '100%', md: '65%', sm: '100%' }}
    >
      <VStack spacing={4}>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input type="text" placeholder="JWT User" />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" placeholder="name@example.com" />
        </FormControl>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
          <FormControl id="company">
            <FormLabel>Password</FormLabel>
            <Input type="text" placeholder="Password" />
          </FormControl>
          <FormControl id="country">
            <FormLabel>Confirm Password</FormLabel>
            <Input type="text" placeholder="Confirm Password" />
          </FormControl>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
          <FormControl id="phone">
            <FormLabel>Phone number</FormLabel>
            <Input type="text" placeholder="4578-420-410" />
          </FormControl>
          <FormControl id="birthday">
            <FormLabel>Birthday</FormLabel>
            <Input type="date" />
          </FormControl>
        </SimpleGrid>
        <Button colorScheme="green" variant="solid">
          Change Details
        </Button>
      </VStack>
    </Box>
  );
};

export default AccountDetailsSection;
