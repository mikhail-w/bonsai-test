import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const CustomButton = ({
  to,
  children,
  bg = 'green.500',
  color = 'white',
  size = 'lg',
  borderRadius = 'full',
  mt,
  mb,
  padding,
  textTransform,
  position,
  fontFamily,
  fontWeight,
  _hover,
  _active,
  _after,
  sx,
}) => {
  return (
    <ChakraButton
      as={RouterLink}
      to={to}
      bg={bg}
      color={color}
      size={size}
      borderRadius={borderRadius}
      mt={mt}
      mb={mb}
      padding={padding}
      textTransform={textTransform}
      position={position}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      _hover={_hover}
      _active={_active}
      _after={_after}
      sx={sx}
    >
      {children}
    </ChakraButton>
  );
};

export default CustomButton;
