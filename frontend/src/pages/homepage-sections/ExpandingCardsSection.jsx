import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import CustomHeading from '../../components/CustomHeading';
import '../../assets/styles/expanded-cards-section.css';
import { useTheme } from '@chakra-ui/react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1707327956851-30a531b70cda?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Dive The Oceans',
  },
  {
    url: 'https://images.unsplash.com/photo-1416949929422-a1d9c8fe84af?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'See The Sights',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1707030602987-8ca280726bdb?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaW90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Walk The Beaches',
  },
  {
    url: 'https://images.unsplash.com/photo-1558022103-603c34ab10ce?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaW90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Explore The Forest',
  },
  {
    url: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Climb A Tree',
  },
];

const ExpandingCardsSection = () => {
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
    'linear-gradient(to right bottom,  rgba(0, 242, 96, 0.85), rgba(5, 117, 230, 0.85))',
    'linear-gradient(to right bottom, rgba(72, 239, 128, 0.85), rgba(0, 210, 255, 0.85))',
    'linear-gradient(to right bottom, rgba(232, 94, 255, 0.85), rgba(255, 204, 255, 0.85))',
  ];

  return (
    <Flex
      justify="center"
      align="center"
      bg={useColorModeValue('white', 'gray.800')}
      direction={{ base: 'column', xl: 'row' }}
      height={{ base: '100vh', md: '110vh' }}
      // marginTop={'100px'}
      marginBottom={'100px'}
    >
      <Box>
        <CustomHeading mb={0}>Explore Nature</CustomHeading>
      </Box>
      <Flex width="90vw" direction={{ base: 'column', md: 'row' }}>
        {images.map((image, index) => (
          <Box
            key={index}
            bgImage={`url(${image.url})`}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            borderRadius="3xl"
            cursor="pointer"
            position={'relative'}
            m={2}
            flex={isMobile ? 'none' : activeIndex === index ? 5 : 0.1}
            height={
              // isMobile ? (activeIndex === index ? '300px' : '100px') : '80vh'
              isMobile ? (activeIndex === index ? '50vh' : '10vh') : '80vh'
            }
            transition="all 0.5s ease-in-out"
            onClick={() => handleClick(index)}
          >
            <Flex
              bg={
                activeIndex === index
                  ? 'transparent'
                  : gradients[index % gradients.length]
              }
              borderRadius={'3xl'}
              height="100%"
              align={isMobile ? 'flex-end' : 'center'}
              justify="center"
              color="white"
              p={4}
            >
              {activeIndex === index ? (
                ''
              ) : (
                <Text
                  style={{ fontWeight: 100 }}
                  className={`${
                    isMobile ? 'horizontal-text' : 'vertical-text'
                  }`}
                >
                  {image.title}
                </Text>
              )}
            </Flex>
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
