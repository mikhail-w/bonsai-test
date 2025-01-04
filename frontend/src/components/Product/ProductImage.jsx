import React from 'react';
import { Image, VStack } from '@chakra-ui/react';

const ProductImage = ({ image, name }) => {
  // Calculate the image path outside of JSX
  const imagePath = image
    ? `${import.meta.env.VITE_API_BASE_URL}${image}`
    : `${import.meta.env.VITE_API_BASE_URL}/media/default/placeholder.jpg`;

  // Log the image path
  // console.log('Image Path:', imagePath);

  return (
    <VStack spacing={4} align="center">
      <Image
        src={imagePath}
        alt={image ? `Picture of ${name}` : 'Placeholder image for product'}
        fallbackSrc={`${
          import.meta.env.VITE_API_BASE_URL
        }/media/default/placeholder.jpg`}
        boxSize={{ base: '100%', md: '400px', lg: '500px' }}
        objectFit="cover"
        borderRadius="lg"
        shadow="md"
      />
    </VStack>
  );
};

export default ProductImage;
