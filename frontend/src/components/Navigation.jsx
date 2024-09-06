import React, { useState } from 'react';
import { Box, Flex, Link, VStack, Collapse } from '@chakra-ui/react';
import Hamburger from 'hamburger-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu function
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Box>
      {/* Navigation Button (Hamburger/Close) */}
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1.5rem"
        position="fixed"
        top="0"
        right="0"
        zIndex="2000"
      >
        {/* Hamburger Button */}
        <Hamburger
          toggled={isOpen} // Bind the open state to the Hamburger component
          toggle={toggleMenu} // Toggle function to switch between open and close
          rounded
          easing="ease-in"
          color="#48bb78"
          zIndex="2000"
        />
      </Flex>

      {/* Radial Background Animation */}
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient="radial(circle, rgba(126, 213, 111, 1), rgba(40, 180, 133, 1), rgba(30, 140, 100, 0.9))"
        zIndex={isOpen ? '1500' : '-1'}
        transform={isOpen ? 'scale(100)' : 'scale(0)'}
        transformOrigin="top right"
        transition="transform 1.5s ease-out"
        opacity={isOpen ? '1' : '0'}
        pointerEvents={isOpen ? 'all' : 'none'}
      />

      {/* Navigation Links */}
      <Collapse in={isOpen} animateOpacity>
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="1600"
          opacity={isOpen ? '1' : '0'}
          transition="opacity 0.3s ease"
        >
          <VStack spacing={4} textAlign="center">
            <Link
              href="#"
              fontSize="3xl"
              color="white"
              _hover={{ color: 'gray.300' }}
            >
              About
            </Link>
            <Link
              href="#"
              fontSize="3xl"
              color="white"
              _hover={{ color: 'gray.300' }}
            >
              Blog
            </Link>
            <Link
              href="#"
              fontSize="3xl"
              color="white"
              _hover={{ color: 'gray.300' }}
            >
              Contact Us
            </Link>
            <Link
              href="#"
              fontSize="3xl"
              color="white"
              _hover={{ color: 'gray.300' }}
            >
              Shop
            </Link>
            <Link
              href="#"
              fontSize="3xl"
              color="white"
              _hover={{ color: 'gray.300' }}
            >
              Log In
            </Link>
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Navigation;
