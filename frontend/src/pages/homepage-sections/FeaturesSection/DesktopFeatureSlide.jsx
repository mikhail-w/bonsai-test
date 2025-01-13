import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import { fadeIn, fadeOut } from './animations';

const DesktopFeatureSlide = ({ feature, isActive, isPrevious }) => (
  <Box
    position="absolute"
    top="0%"
    left="0"
    width="100%"
    // height={{ base: 'auto', md: '60vh' }}
    height={{ base: 'auto', md: '100%' }}
    display="flex"
    justifyContent="center"
    alignItems="flex-start"
    opacity={isActive ? 1 : 0}
    sx={{
      animation: isActive
        ? `${fadeIn} 0.5s ease-in-out`
        : isPrevious
        ? `${fadeOut} 0.5s ease-in-out`
        : 'none',
    }}
  >
    <Image
      src={feature.image}
      alt={feature.title}
      maxH="50vh"
      objectFit="contain"
    />
  </Box>
);

export default DesktopFeatureSlide;
