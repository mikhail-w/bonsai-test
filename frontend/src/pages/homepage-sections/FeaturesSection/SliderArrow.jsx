import React from 'react';
import { Box } from '@chakra-ui/react';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';

const SliderArrow = ({
  direction = 'next',
  onClick,
  iconSize = 20,
  bg = 'green.400',
  hoverBg = 'green.500',
  color = 'white',
  positionStyles = {},
}) => {
  const isNext = direction === 'next';
  const Icon = isNext ? SlArrowRight : SlArrowLeft;

  return (
    <Box
      onClick={onClick}
      position="absolute"
      top="45%"
      transform="translateY(-50%)"
      {...(isNext ? { right: 4 } : { left: 4 })}
      zIndex={2}
      cursor="pointer"
      bg={bg}
      color={color}
      borderRadius="full"
      p={3}
      display="flex"
      alignItems="center"
      justifyContent="center"
      transition="all 0.2s"
      _hover={{
        bg: hoverBg,
        transform: 'translateY(-50%) scale(1.1)',
      }}
      {...positionStyles}
    >
      <Icon size={iconSize} />
    </Box>
  );
};

export default SliderArrow;
