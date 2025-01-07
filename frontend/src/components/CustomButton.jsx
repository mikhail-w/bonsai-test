import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const CustomButton = ({
  to,
  children = 'Button',
  bg = '#55c57a',
  color = 'white',
  onClick,
  type = 'button',
  size = 'lg',
  borderRadius = '100px',
  mt = 50,
  mb = 50,
  padding = '1rem 2.5rem',
  textTransform = 'uppercase',
  position = 'relative',
  fontFamily = 'lato',
  fontWeight = '350',
  fontSize = 'md',
  _hover = {
    backgroundColor: '#55c57a',
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  },
  _active = {
    transform: 'translateY(-1px)',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
  },
  _after = {
    content: '""',
    display: 'inline-block',
    height: '100%',
    width: '100%',
    borderRadius: '100px',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '-1',
    transition: 'all 0.4s',
    backgroundColor: bg,
  },
  sx = {
    ':hover::after': {
      transform: 'scaleX(1.4) scaleY(1.6)',
      opacity: 0,
    },
  },
  leftIcon, // Add leftIcon prop
  rightIcon, // Add rightIcon prop
}) => {
  return (
    <ChakraButton
      as={onClick ? 'button' : RouterLink}
      to={onClick ? undefined : to}
      onClick={onClick}
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
      fontSize={fontSize}
      _hover={_hover}
      _active={_active}
      _after={_after}
      sx={sx}
      leftIcon={leftIcon} // Pass leftIcon to ChakraButton
      rightIcon={rightIcon} // Pass rightIcon to ChakraButton
    >
      {children}
    </ChakraButton>
  );
};

export default CustomButton;
