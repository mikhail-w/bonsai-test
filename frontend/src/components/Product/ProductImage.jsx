import React from 'react';
import { Image, VStack } from '@chakra-ui/react';

const ProductImage = ({ image, name }) => (
  <VStack spacing={4} align="center">
    <Image
      src={
        image
          ? `${import.meta.env.VITE_API_URL.replace('/api/', '')}${image}`
          : `${import.meta.env.VITE_API_URL.replace(
              '/api/',
              ''
            )}/media/default/placeholder.jpg`
      }
      alt={name || 'Product Image'}
      boxSize={{ base: '100%', md: '400px', lg: '500px' }}
      objectFit="cover"
      borderRadius="lg"
      shadow="md"
    />
  </VStack>
);

export default ProductImage;
