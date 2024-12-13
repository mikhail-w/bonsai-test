import React from 'react';
import { VStack, Heading, Text, Box } from '@chakra-ui/react';
import Rating from '../../../Rating';

const ProductDetails = ({ product }) => (
  <VStack
    spacing={6}
    align="start"
    w={{ base: '100%', md: '100%' }}
    maxW="container.sm"
  >
    <Heading as="h3" size={{ base: 'lg', md: 'xl' }}>
      {product.name}
    </Heading>
    <Box>
      <Rating
        value={product.rating}
        text={`${product.numReviews} ${
          product.reviews.length === 1 ? 'review' : 'reviews'
        }`}
        color="#008b4a"
      />
    </Box>
    <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold">
      ${product.price}
    </Text>
    <Text lineHeight="tall" fontSize={{ base: 'md', md: 'lg' }}>
      {product.description}
    </Text>
  </VStack>
);

export default ProductDetails;
