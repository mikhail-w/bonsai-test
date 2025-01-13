import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  useBreakpointValue,
  useColorModeValue,
  Heading,
  Center,
} from '@chakra-ui/react';
import '../../assets/styles/expanded-cards-section.css';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1707327956851-30a531b70cda',
    title: 'Dive The Oceans',
  },
  {
    url: 'https://images.unsplash.com/photo-1416949929422-a1d9c8fe84af',
    title: 'See The Sights',
  },
  {
    url: 'https://images.unsplash.com/photo-1453872302360-eed3c5f8ff66?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Walk The Beaches',
  },
  {
    url: 'https://images.unsplash.com/photo-1558022103-603c34ab10ce',
    title: 'Explore The Forest',
  },
  {
    url: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a',
    title: 'Climb A Tree',
  },
];

const ExpandingCardsSection = () => {
  const titleColor = useColorModeValue('green.600', 'green.400');
  const [activeIndex, setActiveIndex] = useState(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleClick = index => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  // Array of gradients
  const gradients = [
    'linear-gradient(to right bottom, rgba(41, 152, 255, 0.85), rgba(86, 67, 250, 0.85))',
    'linear-gradient(to right bottom, rgba(255, 185, 0, 0.85), rgba(255, 119, 48, 0.85))',
    'linear-gradient(to right bottom, rgba(255, 223, 186, 0.85), rgba(135, 206, 250, 0.85))',
    'linear-gradient(to right bottom, rgba(0, 242, 96, 0.85), rgba(5, 117, 230, 0.85))',
    'linear-gradient(to right bottom, rgba(72, 239, 128, 0.85), rgba(0, 210, 255, 0.85))',
  ];

  return (
    <Flex
      justify="center"
      align="center"
      bg={useColorModeValue('white', 'gray.800')}
      direction={{ base: 'column', xl: 'row' }}
      height={{ base: '100vh', md: '110vh' }}
      marginBottom={'100px'}
    >
      <Box>
        <Center>
          <Heading
            as="h2"
            size="2xl"
            maxW={250}
            mb={12}
            color={titleColor}
            textAlign="center"
            fontWeight="300"
            textTransform="uppercase"
          >
            Explore Nature
          </Heading>
        </Center>
      </Box>
      <Flex width="90vw" direction={{ base: 'column', md: 'row' }}>
        {images.map((image, index) => (
          <Box
            key={index}
            position="relative"
            m={2}
            flex={isMobile ? 'none' : activeIndex === index ? 5 : 0.1}
            height={
              isMobile ? (activeIndex === index ? '300px' : '100px') : '80vh'
            }
            transition="all 0.5s ease-in-out"
            onClick={() => handleClick(index)}
            _hover={{
              transform: activeIndex === null ? 'scale(1.02)' : 'none',
              boxShadow: 'xl',
              '& > .gradient-overlay': {
                opacity: activeIndex === index ? 0 : 0.7,
              },
            }}
            overflow="hidden"
            borderRadius="3xl"
            cursor="pointer"
          >
            {/* Background Image with zoom effect */}
            <Box
              className="bg-image"
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bgImage={`url(${image.url})`}
              bgSize="cover"
              bgPosition="center"
              // transition="transform 0.5s ease-in-out"
            />

            {/* Gradient Overlay */}
            <Box
              className="gradient-overlay"
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bg={gradients[index % gradients.length]}
              opacity={activeIndex === index ? 0 : 0.9}
              transition="opacity 0.3s ease-in-out"
            />

            {/* Vertical text for collapsed state */}
            <Flex
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              justify="center"
              align="center"
              color="white"
              transition="opacity 0.3s ease-in-out"
              opacity={activeIndex === index ? 0 : 1}
              pointerEvents="none"
            >
              <Text
                style={{
                  fontWeight: 100,
                }}
                fontSize={{ base: 'md', md: '2xl' }}
                letterSpacing="wider"
                className={`${isMobile ? 'horizontal-text' : 'vertical-text'}`}
              >
                {image.title}
              </Text>
            </Flex>

            {/* Title for expanded state with original classes */}
            <Box
              position="absolute"
              bottom="30px"
              left="20px"
              zIndex="1"
              className={`card__title ${
                activeIndex === index ? 'card__title--active' : ''
              }`}
              style={{
                transitionDelay: activeIndex === index ? '.5s' : '0s',
              }}
            >
              <span
                className={`card__title-span card__title-span--${index + 1}`}
              >
                {image.title}
              </span>
            </Box>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default ExpandingCardsSection;
