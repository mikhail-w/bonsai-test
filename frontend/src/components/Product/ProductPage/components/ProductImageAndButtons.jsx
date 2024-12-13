import React from 'react';
import { Flex } from '@chakra-ui/react';
import ProductImage from './ProductImage';
import ProductButtons from './ProductButtons';

const ProductImageAndButtons = ({ image, name }) => (
  <Flex
    direction={{ base: 'column', md: 'column' }}
    align="center"
    justify="center"
    maxWidth={370}
  >
    <ProductImage image={image} name={name} />
    <ProductButtons />
  </Flex>
);

export default ProductImageAndButtons;
