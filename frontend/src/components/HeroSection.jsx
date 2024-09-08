import React from 'react';
import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroSmall from '../assets/images/h3.png';
import heroLarge from '../assets/images/h3.png';

function HeroSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeInOut' },
    },
  };

  const fadeInButton = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.2, ease: 'easeInOut' },
    },
  };
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
        clipPath="polygon(0 0, 100% 0, 100% 85%, 0 100%)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        zIndex="1"
        flexDirection="column"
      >
        {/* Hero Overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.4)"
          zIndex="2"
        />

        {/* Hero Content */}
        <Flex
          as={motion.div}
          flexDirection="column"
          alignItems="center"
          position="relative"
          zIndex="3"
          initial="initial"
          animate="animate"
        >
          <Text
            as={motion.p}
            color="white"
            fontWeight={300}
            fontFamily="lato"
            fontSize={{ base: '12vw', md: '6vw', lg: '7vw' }}
            letterSpacing="0.5rem"
            mb={4}
            variants={fadeInUp}
          >
            BONSAI
          </Text>
          <Text
            as={motion.p}
            fontWeight={300}
            fontFamily="lato"
            fontSize="sm"
            color="white"
            mb={8}
            variants={fadeInUp}
          >
            BE ONE WITH NATURE
          </Text>
          <RouterLink to="/products">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInButton}
            >
              <Button
                display="flex"
                flexBasis="auto"
                justifyContent="center"
                alignItems="center"
                width="auto"
                size="sm"
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
                transition="all 0.75s cubic-bezier(0.19, 1, 0.22, 1)"
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
            </motion.div>
          </RouterLink>
        </Flex>
      </Box>
    </>
  );
}

export default HeroSection;
