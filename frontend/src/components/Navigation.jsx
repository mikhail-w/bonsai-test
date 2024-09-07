import React, { useState } from 'react';
import {
  Box,
  Flex,
  Link,
  VStack,
  Collapse,
  Button,
  Image,
  Text,
} from '@chakra-ui/react';
import Hamburger from 'hamburger-react';
import logo from '../assets/images/logo_white.png';
import heroSmall from '../assets/images/h2.png';
import heroLarge from '../assets/images/h2.png';

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
        zIndex="2000" // Adjusted to ensure visibility
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
          zIndex="2000" // Adjusted to ensure it's above content
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
        bgPosition="center"
        clipPath="polygon(0 0, 100% 0, 100% 85%, 0 100%)" // Simpler curved clip path
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        zIndex="1"
        flexDirection="column" // To stack the content vertically
      >
        {/* Hero Overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.4)" // Optional dark overlay for text contrast
          zIndex="2"
        />

        {/* Hero Content */}
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          alignContent={'center'}
          // textAlign="center"
          position="relative"
          zIndex="3" // Ensure content is above the overlay
          // maxW="90vw"
          // mx="auto"
          // px="4"
        >
          <Text
            color="white"
            fontWeight={300}
            fontFamily="lato"
            fontSize={{ base: '10vw', md: '6vw', lg: '7vw' }}
            // letterSpacing="1.5rem"
            mb={4}
          >
            <span style={{ letterSpacing: '1.5rem' }}>B</span>
            <span style={{ letterSpacing: '1.5rem' }}>O</span>
            <span style={{ letterSpacing: '1.5rem' }}>N</span>
            <span style={{ letterSpacing: '1.5rem' }}>S</span>
            <span style={{ letterSpacing: '1.5rem' }}>A</span>
            <span style={{ letterSpacing: '1.5rem' }}>I</span>
          </Text>
          <Text
            fontWeight={300}
            fontFamily="lato"
            fontSize="md"
            color="white"
            mb={8}
          >
            BE ONE WITH NATURE
          </Text>
          <Button
            display={'inline-block'}
            flexBasis={'auto'}
            width="auto"
            size="lg"
            bg="white"
            color="teal.700" // Calm teal color for text
            fontWeight={300}
            borderRadius="full"
            paddingX="1.5rem"
            paddingY="1rem"
            boxShadow="md"
            alignSelf="center"
            transition="all 0.3s ease" // Smooth transition for all effects
            _hover={{
              backgroundColor: 'teal.50', // Soft light teal background on hover
              transform: 'scale(1.05)', // Slight scale-up for emphasis
              boxShadow: '0px 10px 20px rgba(0, 128, 128, 0.2)', // Soft teal shadow
              _after: {
                content: `''`,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: 'full',
                background:
                  'linear-gradient(135deg, rgba(224, 242, 241, 0.5), rgba(173, 232, 223, 0.5))', // Calm gradient glow
                zIndex: '-1',
                opacity: 1,
                transition: 'opacity 0.5s ease',
              },
            }}
            _focus={{ boxShadow: 'outline', outline: 'none' }} // Remove outline focus border
            position="relative" // Required for the pseudo-element
          >
            EXPLORE NATURE
          </Button>
        </Flex>
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
