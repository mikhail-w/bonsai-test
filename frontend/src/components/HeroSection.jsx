import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Hero from '../assets/images/hero.jpg';
import MobileHero from '../assets/images/hero-mb.jpg';
const MotionBox = motion(Box);
const MotionStack = motion(Stack);

function HeroSection() {
  return (
    <>
      <Box
        w={'full'}
        h={'100vh'}
        bgImage={{ base: MobileHero, md: Hero }}
        bgSize={'cover'}
      >
        <MotionBox
          w={'full'}
          h={'50vh'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'flex-start'} // Align to the left
          px={8} // Add some padding for spacing
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <MotionStack
            spacing={6}
            textAlign={'left'} // Align text to the left
            maxW={'lg'}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            // boxShadow={'outline'}
          >
            <Heading
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              color={useColorModeValue('gray.800', 'white')}
            >
              Bonsai
            </Heading>
            <Text
              fontSize={{ base: 'md', lg: 'lg' }}
              color={useColorModeValue('white', 'white')}
            >
              Discover the beauty of nature with our exquisite collection of
              bonsai trees.
            </Text>
            <Stack direction={'row'} spacing={4}>
              <Button
                bg={useColorModeValue('green.400', 'green.600')}
                color={'white'}
                _hover={{ bg: useColorModeValue('green.500', 'green.700') }}
                size={'lg'}
              >
                Shop Now
              </Button>
              <Button
                bg={useColorModeValue('gray.600', 'gray.700')}
                color={'white'}
                _hover={{ bg: useColorModeValue('gray.700', 'gray.800') }}
                size={'lg'}
              >
                Learn More
              </Button>
            </Stack>
          </MotionStack>
        </MotionBox>
      </Box>
    </>
  );
}

export default HeroSection;
