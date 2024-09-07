import React from 'react';
import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import heroSmall from '../assets/images/h3.png';
import heroLarge from '../assets/images/h3.png';

function HeroSection2() {
  return (
    <>
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
          position="relative"
          zIndex="3"
        >
          <Text
            color="white"
            fontWeight={300}
            fontFamily="lato"
            fontSize={{ base: '10vw', md: '6vw', lg: '7vw' }}
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
            as="button"
            display="inline-block"
            flexBasis={'auto'}
            width="auto"
            size="lg"
            bg="white"
            paddingX="1.5rem"
            paddingY="1rem"
            boxShadow="md"
            alignSelf="center"
            fontSize="lg"
            fontWeight="thin"
            border="0px solid"
            borderRadius="full"
            outline="1px solid rgba(255, 255, 255, 0.5)"
            outlineOffset="0px"
            // boxShadow="inset 0 0 20px rgba(255, 255, 255, 0)"
            textShadow="none"
            transition="all 1.25s cubic-bezier(0.19, 1, 0.22, 1)"
            _hover={{
              border: '1px solid',
              boxShadow:
                'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)',
              outlineColor: 'rgba(255, 255, 255, 0)',
              outlineOffset: '15px',
              textShadow: '1px 1px 2px #427388',
            }}
            _focus={{ boxShadow: 'outline', outline: 'none' }}
            position="relative"
          >
            EXPLORE NATURE
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default HeroSection2;
