import React, { useState } from 'react';
import {
  Box,
  Flex,
  Link,
  VStack,
  Collapse,
  Heading,
  Button,
  Image,
  Text,
} from '@chakra-ui/react';
import Hamburger from 'hamburger-react';
import logo from '../assets/images/logo_white.png';
import heroSmall from '../assets/images/bghero3.png';
import heroLarge from '../assets/images/bghero3.png';
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu function
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Box>
      {/* Logo and Navigation Button (Hamburger/Close) */}
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1.5rem"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="2000"
        width="100%"
        bg="transparent"
      >
        {/* Logo */}
        <Box>
          <Image src={logo} alt="Logo" boxSize="50px" />
        </Box>

        {/* Hamburger Button */}
        <Hamburger
          toggled={isOpen} // Bind the open state to the Hamburger component
          toggle={toggleMenu} // Toggle function to switch between open and close
          rounded
          easing="ease-in"
          color="#ffffff"
          zIndex="2000"
        />
      </Flex>

      {/* Hero Section with Gradient Background */}
      <Box
        position="relative"
        height="85vh"
        bgImage={{
          base: `linear-gradient(to right bottom, rgba(126, 213, 111, 0.8), rgba(40, 180, 133, 0.8)), url(${heroSmall})`,
          md: `linear-gradient(to right bottom, rgba(126, 213, 111, 0.8), rgba(40, 180, 133, 0.8)), url(${heroLarge})`,
        }}
        bgSize="cover"
        bgPosition="top"
        clipPath={{
          base: 'polygon(0 0, 100% 0, 100% 75vh, 0 100%)',
          md: 'polygon(0 0, 100% 0, 100% 75vh, 0 100%)',
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        {/* Hero Overlay */}
        <Box
          position="relative"
          zIndex="10"
          // boxShadow={'outline'}
          maxW="90vw" // Add this line to control the width
          mx="auto" // Centers the content horizontally
          px="4" // Add some horizontal padding for smaller screens
        >
          <Text
            color="white"
            fontWeight={300}
            fontFamily={'lato'}
            fontSize={{ base: '10vw', md: '10vw', lg: '8vw' }}
            letterSpacing=".5em"
            mb={4}
          >
            BONSAI
          </Text>
          <Text
            fontWeight={300}
            fontFamily={'lato'}
            fontSize="xl"
            color="white"
            mb={8}
          >
            BE ONE WITH NATURE
          </Text>
          <Button
            width="auto"
            size="lg"
            bg="white"
            color="black"
            fontWeight={300}
            borderRadius="full"
            paddingX="1.5rem"
            paddingY="1rem"
            boxShadow="md" // Initial shadow
            transition="transform 0.3s ease, box-shadow 0.3s ease" // Smooth transition
            _hover={{
              backgroundColor: 'green.100',
              transform: 'scale(1.05)',
              boxShadow: '0px 4px 15px rgba(0, 128, 0, 0.4)',
            }}
            position="relative" // Required for the pseudo-element to work
          >
            EXPLORE NATURE
          </Button>
        </Box>
      </Box>

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
