import React from 'react';
import {
  VStack,
  Flex,
  Text,
  Badge,
  Button,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
} from '@chakra-ui/react';

const ProductPurchaseOptions = ({ product, qty, setQty, addToCartHandler }) => {
  const handleQtyChange = valueString => {
    const value = Number(valueString);
    setQty(value <= product.countInStock ? value : product.countInStock);
  };

  return (
    <VStack
      spacing={6}
      align="stretch"
      w="full"
      maxH={300}
      p={{ base: 4, md: 6 }}
      shadow="lg"
      borderWidth="1px"
      borderRadius="lg"
    >
      <Flex justify="space-between">
        <Text>Price:</Text>
        <Text fontWeight="bold">${product.price}</Text>
      </Flex>
      <Flex justify="space-between">
        <Text>Status:</Text>
        <Text>
          {product.countInStock > 0 ? (
            <Badge colorScheme="green">In Stock</Badge>
          ) : (
            <Badge colorScheme="red">Out of Stock</Badge>
          )}
        </Text>
      </Flex>
      {product.countInStock > 0 && (
        <HStack spacing={4}>
          <Text>Qty</Text>
          <NumberInput
            value={qty}
            onChange={handleQtyChange}
            min={1}
            max={product.countInStock}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
      )}
      <Button
        colorScheme="green"
        onClick={addToCartHandler}
        isDisabled={product.countInStock === 0}
      >
        Add to Cart
      </Button>
    </VStack>
  );
};

export default ProductPurchaseOptions;
