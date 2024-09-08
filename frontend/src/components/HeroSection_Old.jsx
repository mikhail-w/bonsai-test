import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Hero from '../assets/images/hero.jpg';
import MobileHero from '../assets/images/hero-mb.jpg';

const MotionBox = motion(Box);
const MotionStack = motion(Stack);

function HeroSection() {
  return (
    <Box w="full" h="100vh" position="relative">
      {/* Three.js Canvas */}
      <Canvas style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <Stars />
        <ambientLight intensity={0.5} />
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>

      {/* Background Image (as a fallback for older devices) */}
      <Box
        w="full"
        h="100vh"
        bgImage={{ base: MobileHero, md: Hero }}
        bgSize="cover"
        bgPos="center"
        position="absolute"
        top={0}
        left={0}
        zIndex={-1}
      />
      <Box
        w="full"
        h="100vh"
        bg="rgba(0, 0, 0, 0.2)" // 50% opacity black overlay
        position="absolute"
        top={0}
        left={0}
        zIndex={0}
      />

      {/* Content Section */}
      <MotionBox
        w="full"
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={8}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <MotionStack
          spacing={6}
          textAlign="center"
          maxW="lg"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Heading
            fontFamily={'roza'}
            fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
            color={useColorModeValue('white', 'gray.800')}
            fontWeight="bold"
          >
            Discover Bonsai
          </Heading>
          <Text
            fontFamily={'lato'}
            fontSize={{ base: 'md', lg: 'lg' }}
            color={useColorModeValue('whiteAlpha.800', 'gray.300')}
          >
            Explore the tranquility and beauty of nature through our curated
            bonsai collection.
          </Text>
          <Stack direction="row" spacing={4} justifyContent="center">
            <Button
              bg={useColorModeValue('green.400', 'green.600')}
              color="white"
              _hover={{ bg: useColorModeValue('green.500', 'green.700') }}
              size="lg"
              zIndex={1}
            >
              Shop Now
            </Button>
            <Button
              bg={useColorModeValue('gray.600', 'gray.700')}
              color="white"
              _hover={{ bg: useColorModeValue('gray.700', 'gray.800') }}
              size="lg"
              zIndex={1}
            >
              Learn More
            </Button>
          </Stack>
        </MotionStack>
      </MotionBox>
    </Box>
  );
}

export default HeroSection;
