import React from 'react';
import bgImage from '../../assets/images/nat-10.jpg'; // Replace with your actual image path
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Heading,
  VStack,
  HStack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import '../../assets/styles/card.css';

const NewsLetterSection = () => {
  // Determine whether to show the background image based on screen size
  const showBgImage = useBreakpointValue({ base: false, md: true });
  const bgColor = useColorModeValue('white', 'gray.700');

  return (
    <Box
      bgColor="#32b882"
      h="120vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        w="90%"
        h="60%"
        maxW="1200px"
        bg="white"
        rounded="lg"
        overflow="hidden"
        shadow="xl"
        display="flex"
        position="relative"
        flex="1"
        backgroundImage={showBgImage ? `url(${bgImage})` : 'none'}
        backgroundSize="cover"
        backgroundPosition="220px 0px" // Shift more to the right by 20px
      ></Box>
    </Box>
  );
};

export default NewsLetterSection;
