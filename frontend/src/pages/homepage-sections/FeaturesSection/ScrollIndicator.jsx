import React from 'react';
import { Flex, Box, useColorModeValue } from '@chakra-ui/react';

const ScrollIndicator = ({ total, current, onClick }) => (
  <Flex
    position="absolute"
    bottom="10px"
    left="50%"
    transform="translateX(-50%)"
    gap="6"
    zIndex="2"
    bg={useColorModeValue('whiteAlpha.800', 'blackAlpha.800')}
    p="2"
    borderRadius="full"
    boxShadow="lg"
  >
    {Array.from({ length: total }).map((_, index) => (
      <Box
        key={index}
        width="10px"
        height="10px"
        borderRadius="full"
        bg={current === index ? 'green.500' : 'gray.300'}
        cursor="pointer"
        onClick={() => onClick(index)}
      />
    ))}
  </Flex>
);

export default ScrollIndicator;
