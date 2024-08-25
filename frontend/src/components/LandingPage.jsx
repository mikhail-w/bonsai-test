import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Stack,
} from '@chakra-ui/react';
import Hero from '../assets/images/hero.jpg';

function LandingPage() {
  return (
    <Box bg="gray.50" minH="100vh">
      {/* Hero Section */}
      <Box position="relative">
        <Image src={Hero} alt="Bonsai Tree" width="100%" height="auto" />
        <Flex
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="rgba(0, 0, 0, 0.3)"
          alignItems="center"
          justifyContent="center"
          color="white"
          textAlign="center"
          flexDirection="column"
          padding="20px"
        >
          <Heading as="h1" fontSize="4xl" mb="4">
            Welcome to Bonsai Art
          </Heading>
          <Text fontSize="xl" mb="8">
            Experience the Beauty and Tranquility of Nature
          </Text>
          <Button colorScheme="green" size="lg">
            Explore Our Collection
          </Button>
        </Flex>
      </Box>

      {/* Featured Section */}
      <Box py="10" textAlign="center">
        <Heading as="h2" fontSize="3xl" mb="6">
          Our Finest Bonsai
        </Heading>
        <Stack direction="row" spacing="6" justify="center">
          {/* Replace with actual product/service cards */}
          <Box
            width="300px"
            height="300px"
            bg="white"
            boxShadow="md"
            p="4"
            borderRadius="md"
          >
            <Text fontSize="lg">Product 1</Text>
          </Box>
          <Box
            width="300px"
            height="300px"
            bg="white"
            boxShadow="md"
            p="4"
            borderRadius="md"
          >
            <Text fontSize="lg">Product 2</Text>
          </Box>
          <Box
            width="300px"
            height="300px"
            bg="white"
            boxShadow="md"
            p="4"
            borderRadius="md"
          >
            <Text fontSize="lg">Product 3</Text>
          </Box>
        </Stack>
      </Box>

      {/* Footer */}
      <Box bg="gray.900" color="white" py="6" textAlign="center">
        <Text>&copy; 2024 Bonsai Art. All rights reserved.</Text>
      </Box>
    </Box>
  );
}

export default LandingPage;
