import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1707327956851-30a531b70cda?q=80&w=3870&auto=format&fit=crop',
    title: 'Dive The Oceans',
  },
  {
    url: 'https://images.unsplash.com/photo-1416949929422-a1d9c8fe84af?q=80&w=2000&auto=format&fit=crop',
    title: 'See The Sights',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1707030602987-8ca280726bdb?q=80&w=3871&auto=format&fit=crop',
    title: 'Walk The Beaches',
  },
  {
    url: 'https://images.unsplash.com/photo-1558022103-603c34ab10ce?q=80&w=3871&auto=format&fit=crop',
    title: 'Explore The Forest',
  },
  {
    url: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=3870&auto=format&fit=crop',
    title: 'Climb A Tree',
  },
];

const ExpandingCardsSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleClick = index => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <Flex
      justify="center"
      align="center"
      bg={useColorModeValue('white', 'gray.800')}
      direction={{ base: 'column', md: 'row' }}
      height={{ base: 'auto', md: '100vh' }}
      marginTop="100px"
    >
      {images.map((image, index) => (
        <Box
          key={index}
          bgImage={`url(${image.url})`}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          borderRadius="3xl"
          cursor="pointer"
          m={2}
          flex={isMobile ? 'none' : activeIndex === index ? 5 : 0.5}
          height={
            isMobile ? (activeIndex === index ? '300px' : '100px') : '80vh'
          }
          width={{ base: '100%', md: 'auto' }}
          transition="all 0.5s ease-in-out"
          onClick={() => handleClick(index)}
        >
          <Flex
            bg="rgba(0, 0, 0, 0.5)"
            height="100%"
            align={isMobile ? 'flex-end' : 'center'}
            justify="center"
            color="white"
            p={4}
          >
            <Text fontSize="xl" fontWeight="bold">
              {image.title}
            </Text>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default ExpandingCardsSection;
