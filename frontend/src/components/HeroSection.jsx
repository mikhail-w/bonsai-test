// import ProductCarousel from '../components/ProductCarousel';
// import { Col, Container, Row } from 'react-bootstrap';
// import '../assets/styles/HeroSection.css';

// function HeroSection() {
//   return (
//     <Container className="heroSection">
//       <Row className="title"> As Interesting as a Plant</Row>
//       <Row className="heroCarousel">
//         <ProductCarousel />
//       </Row>
//     </Container>
//   );
// }

// export default HeroSection;

import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import Hero from '../assets/images/hero.jpg';
function HeroSection() {
  return (
    <Box
      w={'full'}
      h={'100vh'}
      bgImage={Hero}
      bgSize={'cover'}
      bgPosition={'center center'}
    >
      <Box
        w={'full'}
        h={'100vh'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Stack spacing={6} textAlign={'center'} maxW={'lg'} align={'center'}>
          <Heading
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            color={useColorModeValue('gray.800', 'white')}
          >
            Welcome to Our Bonsai Shop
          </Heading>
          <Text
            fontSize={{ base: 'md', lg: 'lg' }}
            color={useColorModeValue('gray.600', 'gray.300')}
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
        </Stack>
      </Box>
    </Box>
  );
}
export default HeroSection;
