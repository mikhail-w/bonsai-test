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

  return (
    <Flex
      justify="center"
      align="center"
      bg={useColorModeValue('white', 'gray.800')}
      direction={{ base: 'column', md: 'row' }}
      height={{ base: '100vh', md: '110vh' }}
      marginTop={'100px'}
      // overflow="hidden"
    >
      <CustomHeading>Explore Nature</CustomHeading>
      <Flex width="90vw" direction={{ base: 'column', md: 'row' }}>
        {images.map((image, index) => (
          <Box
            key={index}
            bgImage={`url(${image.url})`}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            borderRadius="3xl"
            flex={
              isMobile
                ? activeIndex === index
                  ? '1'
                  : 'none'
                : activeIndex === index
                ? 5
                : 0.2
            }
            height={
              isMobile ? (activeIndex === index ? '50vh' : '10vh') : '80vh'
            }
            m={2}
            cursor="pointer"
            position="relative"
            transition="all 0.5s ease-in-out"
            onClick={() => handleClick(index)}
          >
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
