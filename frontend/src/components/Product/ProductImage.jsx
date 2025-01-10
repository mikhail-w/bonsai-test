import React from 'react';
import { Image, VStack } from '@chakra-ui/react';
import { cleanMediaPath } from '../../utils/urlUtils';

const ProductImage = ({ image, name }) => {
  // We can simplify our image path handling by using cleanMediaPath directly with the raw image path.
  // This eliminates the need for manual URL construction before cleaning.
  const mainImagePath = cleanMediaPath(
    image,
    import.meta.env.VITE_API_BASE_URL
  );

  // Similarly, we'll use the same function for our fallback image to ensure consistency
  const fallbackImagePath = cleanMediaPath(
    'default/placeholder.jpg',
    import.meta.env.VITE_API_BASE_URL
  );

  // Log paths for debugging if needed
  // console.log('Main Image Path:', mainImagePath);
  // console.log('Fallback Image Path:', fallbackImagePath);

  return (
    <VStack spacing={4} align="center">
      <Image
        src={mainImagePath || fallbackImagePath}
        fallbackSrc={fallbackImagePath}
        boxSize={{ base: '100%', md: '400px', lg: '500px' }}
        objectFit="cover"
        borderRadius="lg"
        shadow="md"
        alt={name || 'Product image'}
      />
    </VStack>
  );
};

export default ProductImage;
