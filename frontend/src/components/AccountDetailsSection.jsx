import React from 'react';
import {
  Box,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import CustomButton from './CustomButton';

const AccountDetailsSection = () => {
  // Dynamically set text and background colors based on color mode
  const textColor = useColorModeValue('gray.900', 'green.500');
  const inputBg = useColorModeValue('gray.100', 'gray.700');
  const formLabelColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      p={6}
      borderRadius="md"
      w={{ base: '100%', md: '65%', sm: '100%' }}
      boxShadow={useColorModeValue('md', 'dark-lg')}
    >
      <VStack spacing={4}>
        <FormControl id="name">
          <FormLabel color={formLabelColor}>Name</FormLabel>
          <Input
            bg={inputBg}
            color={textColor}
            type="text"
            placeholder="JWT User"
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel color={formLabelColor}>Email address</FormLabel>
          <Input
            bg={inputBg}
            color={textColor}
            type="email"
            placeholder="name@example.com"
          />
        </FormControl>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
          <FormControl id="password">
            <FormLabel color={formLabelColor}>Password</FormLabel>
            <Input
              bg={inputBg}
              color={textColor}
              type="password"
              placeholder="Password"
            />
          </FormControl>
          <FormControl id="confirm-password">
            <FormLabel color={formLabelColor}>Confirm Password</FormLabel>
            <Input
              bg={inputBg}
              color={textColor}
              type="password"
              placeholder="Confirm Password"
            />
          </FormControl>
        </SimpleGrid>
        <CustomButton>Change Details</CustomButton>
      </VStack>
    </Box>
  );
};

export default AccountDetailsSection;
