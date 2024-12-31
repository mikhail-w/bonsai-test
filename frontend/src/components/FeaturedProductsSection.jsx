import React from 'react';
import {
  Box,
  SimpleGrid,
  Heading,
  Button,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
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
        fontFamily="lato"
        as="h2"
        size="2xl"
        mb={12}
        paddingBottom={'50px'}
        fontWeight="300"
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
            bgGradient="linear(to-b, green.50, beige.200)"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            position="relative"
            transition="all 0.3s ease-in-out"
            _hover={{
              transform: 'scale(1.05)',
              cursor: 'pointer',
              bgGradient: 'linear(to-b, green.100, beige.300)',
            }}
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
              borderBottom="2px solid green.300"
              filter="brightness(0.85)"
              transition="all 0.3s ease-in-out"
              _hover={{ filter: 'brightness(1)', cursor: 'pointer' }}
            />

            {/* Card Content */}
            <Box p={6}>
              <Heading
                fontFamily="'Caveat', cursive"
                as="h3"
                size="lg"
                mb={4}
                color="green.800"
              >
                {product.title}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                Discover the essence of bonsai beauty.
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      <Button
        as={RouterLink}
        to="/products"
        mt={10}
        mb={50}
        padding={'1rem 2.5rem'}
        size="lg"
        textTransform={'uppercase'}
        borderRadius={'100px'}
        bg="#55c57a"
        color="white"
        position="relative"
        fontFamily="lato"
        fontWeight={'350px'}
        _hover={{
          transform: 'translateY(-3px)',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        }}
        _active={{
          transform: 'translateY(-1px)',
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
        }}
        _after={{
          content: '""',
          display: 'inline-block',
          height: '100%',
          width: '100%',
          borderRadius: '100px',
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: '-1',
          transition: 'all 0.4s',
          backgroundColor: '#48a169',
        }}
        sx={{
          ':hover::after': {
            transform: 'scaleX(1.4) scaleY(1.6)',
            opacity: 0,
          },
        }}
      >
        Shop All Bonsai
      </Button>
    </Box>
  );
};

export default FeaturedProductsSection;
