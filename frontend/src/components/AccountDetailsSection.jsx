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
      bg="white"
      p={6}
      borderRadius="md"
      boxShadow="md"
      w={{ base: '100%', md: '65%' }}
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
            <FormLabel>Company</FormLabel>
            <Input type="text" placeholder="Materially Inc." />
          </FormControl>
          <FormControl id="country">
            <FormLabel>Country</FormLabel>
            <Input type="text" placeholder="USA" />
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
        <Button colorScheme="blue" variant="solid">
          Change Details
        </Button>
      </VStack>
    </Box>
  );
};

export default AccountDetailsSection;
