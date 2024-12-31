import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Heading,
  Button,
  Text,
  Image,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import p3 from '../assets/images/h10.jpg';
import p4 from '../assets/images/potters.jpg';
import p5 from '../assets/images/can.jpg';
import '../assets/styles/card.css';

const FeaturedProductsSection = () => {
  const products = [
    {
      title: 'Shop   Plants',
      description: 'Discover a wide variety of plants.',
      price: '$297',
      image: p3,
      path: '/plants',
      gradient:
        'linear-gradient(to bottom right, rgba(255, 159, 64, 0.8), rgba(255, 206, 0, 0.8))',
    },
    {
      title: 'Shop Planters',
      description: 'Explore elegant planters for your plants.',
      price: '$497',
      image: p4,
      path: '/planters',
      gradient:
        'linear-gradient(to bottom right, rgba(72, 239, 128, 0.8), rgba(72, 191, 145, 0.8))',
    },
    {
      title: 'Shop Accessories',
      description: 'Find perfect accessories for bonsai care.',
      price: '$897',
      image: p5,
      path: '/essentials',
      gradient:
        'linear-gradient(to bottom right, rgba(72, 145, 239, 0.8), rgba(72, 191, 255, 0.8))',
    },
  ];

  const [flipped, setFlipped] = useState(Array(products.length).fill(false));

  const handleMouseEnter = index => {
    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);
  };

  const handleMouseLeave = index => {
    const newFlipped = [...flipped];
    newFlipped[index] = false;
    setFlipped(newFlipped);
  };

  return (
    <Box mt={100} mb={100} py={16} textAlign="center" bg="white" minH="100vh">
      <Heading
        fontFamily="montserrat, sans-serif"
        as="h2"
        size="2xl"
        mb={12}
        paddingBottom="50px"
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
            className="card"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            cursor={'pointer'}
          >
            <Box
              className={`card__inner ${flipped[index] ? 'is-flipped' : ''}`}
            >
              {/* Front Side */}
              <Box className="card__face card__face--front ">
                <Image
                  src={product.image}
                  alt={product.title}
                  className="card__image"
                  borderRadius="lg"
                  objectFit="cover"
                />
                <h4 className={`card__heading card__heading--${index + 1}`}>
                  <span
                    className={`card__heading-span card__heading-span--${
                      index + 1
                    }`}
                  >
                    {product.title}
                  </span>
                </h4>
              </Box>
              {/* Back Side */}
              <Box className="card__face card__face--back">
                <Box className="card__content">
                  <Text fontSize="md" mb={4} color="white">
                    {product.description}
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" mb={4} color="white">
                    {product.price}
                  </Text>
                  <Button
                    as={RouterLink}
                    to={product.path}
                    bg="green.500"
                    color="white"
                    _hover={{ bg: 'green.400' }}
                    size="lg"
                    borderRadius="full"
                  >
                    Shop Now
                  </Button>
                </Box>
              </Box>
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
