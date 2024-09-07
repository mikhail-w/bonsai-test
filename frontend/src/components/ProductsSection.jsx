import React from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  Button,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import p3 from '../assets/images/h10.jpg';
import p4 from '../assets/images/potters.jpg';
import p5 from '../assets/images/can.jpg';

const ProductsSection = () => {
  const bg = useColorModeValue('white', 'gray.800'); // Light and dark mode handling

  const products = [
    {
      title: 'Shop Plants',
      details: [
        'Age: 7-10 years',
        'Up to 30 cm tall',
        'Intermediate care',
        'Best for indoor spaces',
      ],
      image: p3,
      color: 'rgba(0, 255, 127, 0.3)', // Lower opacity for brighter effect
    },
    {
      title: 'Shop Planters',
      details: [
        'Age: 3-5 years',
        'Up to 15 cm tall',
        'Beginner care',
        'Indoor/Outdoor plant',
      ],
      image: p4,
      color: 'rgba(255, 165, 0, 0.3)', // Lower opacity for brighter effect
    },
    {
      title: 'Shop Accessories',
      details: [
        'Age: 10-12 years',
        'Up to 40 cm tall',
        'Advanced care',
        'Best for outdoor spaces',
      ],
      image: p5,
      color: 'rgba(0, 191, 255, 0.7)', // Lower opacity for brighter effect
    },
  ];

  return (
    <Box py={20} textAlign="center" bg={bg} minH={'100vh'}>
      <Heading
        fontFamily={'lato'}
        as="h2"
        size="xl"
        mb={8}
        fontWeight="bold"
        color="green.600"
      >
        Featured Products
      </Heading>

      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={10}
        px={6}
        pt={50}
        pb={100}
        justifyItems={'center'}
      >
        {products.map((product, index) => (
          <Box
            key={index}
            bg="white"
            borderRadius="md"
            overflow="hidden"
            boxShadow="lg"
            position="relative"
            minW={350}
          >
            {/* Background Image with color overlay */}
            <Box
              height="250px"
              bgImage={`url(${product.image})`}
              bgSize="cover"
              bgPos="center"
              position="relative"
              filter="brightness(1.2)" // Apply brightness filter to lighten image
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg={product.color}
                mixBlendMode="overlay" // Use a lighter overlay mode
                zIndex={1}
              />
            </Box>

            {/* Card Content */}
            <Box p={6} zIndex={2} position="relative">
              <Heading
                fontFamily={'roza'}
                as="h3"
                size="lg"
                mb={4}
                color="gray.700"
              >
                {product.title}
              </Heading>

              {/* Product Details */}
              {product.details.map((detail, i) => (
                <Text key={i} fontSize="sm" color="gray.500">
                  {detail}
                </Text>
              ))}
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      <Button mt={10} mb={200} size="lg" colorScheme="green">
        Shop All Bonsai
      </Button>
    </Box>
  );
};

export default ProductsSection;
