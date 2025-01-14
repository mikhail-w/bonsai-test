import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const Logo = ({ logoSrc }) => {
  return (
    <RouterLink to="/">
      <Box position="fixed" top={9} left={8} zIndex="10">
        <Image src={logoSrc} alt="Logo" boxSize="50px" />
      </Box>
    </RouterLink>
  );
};
