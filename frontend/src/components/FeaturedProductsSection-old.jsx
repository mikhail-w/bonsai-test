import React from 'react';
import {
  Box,
  SimpleGrid,
  Heading,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom'; // Use Link as RouterLink
import p3 from '../assets/images/h10.jpg';
import p4 from '../assets/images/potters.jpg';
import p5 from '../assets/images/can.jpg';

const FeaturedProductsSection = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');

  const products = [
    {
      title: 'Shop Plants',
      image: p3,
      path: '/plants',
    },
    {
      title: 'Shop Planters',
      image: p4,
      path: '/planters',
    },
    {
      title: 'Shop Accessories',
      image: p5,
      path: '/essentials',
    },
  ];

  return (
    <Box mt={100} mb={100} py={16} textAlign="center" bg={bg} minH="100vh">
      <Heading
        fontFamily="Lato"
        as="h2"
        size="2xl"
        mb={12}
        fontWeight="extrabold"
        color="green.600"
      >
        Featured Products
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={10}
        px={6}
        justifyItems="center"
      >
        {products.map((product, index) => (
          <Box
            key={index}
            bg="white"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            position="relative"
            transition="all 0.3s ease-in-out"
            _hover={{ transform: 'scale(1.05)', cursor: 'pointer' }}
            width="100%"
            maxW="350px"
            as={RouterLink}
            to={product.path}
          >
            {/* Background Image */}
            <Box
              height="250px"
              bgImage={`url(${product.image})`}
              bgSize="cover"
              bgPos="center"
              position="relative"
              filter="brightness(0.85)" // Slight darkening for better contrast
              transition="all 0.3s ease-in-out"
              _hover={{ filter: 'brightness(1)', cursor: 'pointer' }} // Brighten on hover
            />

            {/* Card Content */}
            <Box p={6}>
              <Heading
                fontFamily="Roza"
                as="h3"
                size="lg"
                mb={4}
                color={'black'}
              >
                {product.title}
              </Heading>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      <Button
        as={RouterLink}
        to="/products"
        mt={10}
        mb={50}
        size="lg"
        colorScheme="green"
        fontFamily="Lato"
        _hover={{ transform: 'scale(1.1)', boxShadow: 'lg' }}
      >
        Shop All Bonsai
      </Button>
    </Box>
  );
};

export default FeaturedProductsSection;
