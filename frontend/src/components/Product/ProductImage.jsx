import React from 'react';
import { Image, VStack } from '@chakra-ui/react';

const ProductImage = ({ image, name }) => (
  <VStack spacing={4} align="center">
    <Image
      src={image}
      alt={name || 'Product Image'}
      boxSize={{ base: '100%', md: '400px', lg: '500px' }}
      objectFit="cover"
      borderRadius="lg"
      shadow="md"
    />
  </VStack>
);

export default ProductImage;
