import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

function HeroSection2() {
  return (
    <Box
      height="85vh"
      bgImage="url('/img/hero-small.jpg')"
      bgSize="cover"
      bgPos="center"
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
      color="white"
    >
      <Heading as="h1" size="2xl" textTransform="uppercase">
        Bonsai
      </Heading>
      <Text fontSize="lg" mt={4}>
        Be one with nature
      </Text>
      <Button
        colorScheme="green"
        size="lg"
        mt={6}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Explore Nature
      </Button>
    </Box>
  );
}

export default HeroSection2;
