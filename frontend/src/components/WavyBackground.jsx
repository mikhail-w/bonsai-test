import { Box, Text, Button, Flex, VStack } from '@chakra-ui/react';

const WavyBackground = () => {
  return (
    <Box position="relative" overflow="hidden">
      {/* Top Wave */}
      <Box position="absolute" top={0} left={0} width="100%" zIndex={-1}>
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          fill="#FFE5D9"
        >
          <path
            fillOpacity="1"
            d="M0,32L48,42.7C96,53,192,75,288,117.3C384,160,480,224,576,229.3C672,235,768,181,864,149.3C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </Box>

      {/* Main Content Section */}
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="#FFE5D9"
        position="relative"
        zIndex={1}
      >
        <VStack spacing={6}>
          <Text
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight="bold"
            textAlign="center"
            color="#1A202C"
          >
            Welcome to Zen Bonsai
          </Text>
          <Text fontSize="xl" textAlign="center" color="#2D3748">
            Cultivate peace and serenity in your life with our handcrafted
            bonsai.
          </Text>
          <Button
            colorScheme="teal"
            size="lg"
            borderRadius="full"
            bg="#A0D8B6"
            _hover={{ bg: '#B8DE6F' }}
          >
            Shop Now
          </Button>
        </VStack>
      </Box>

      {/* Bottom Wave */}
      <Box position="absolute" bottom={0} left={0} width="100%" zIndex={-1}>
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          fill="#A0D8B6"
        >
          <path
            fillOpacity="1"
            d="M0,32L48,64C96,96,192,160,288,165.3C384,171,480,117,576,85.3C672,53,768,43,864,58.7C960,75,1056,117,1152,138.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </Box>
    </Box>
  );
};

export default WavyBackground;
