import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please enter both email and password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset fields after submission
    setEmail('');
    setPassword('');
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>
          <Button
            colorScheme="green"
            size="lg"
            type="submit"
            width="full"
            mt={4}
          >
            Login
          </Button>
        </Stack>
      </form>
      <Text textAlign="center" mt={4} color="gray.500">
        Don’t have an account?{' '}
        <Button variant="link" colorScheme="green">
          Sign Up
        </Button>
      </Text>
    </Box>
  );
}

export default Login;
