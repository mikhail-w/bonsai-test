// FeaturesSection.jsx
import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
  Center,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import SliderArrow from './SliderArrow';
import ScrollIndicator from './ScrollIndicator';
import { getFeaturesData } from './getFeaturesData';
import FeatureTitle from './FeatureTitle';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FeaturesSection = () => {
  const mainBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const features = getFeaturesData(useColorModeValue);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const titleColor = useColorModeValue('green.600', 'green.400');
  const dotsBg = useColorModeValue('whiteAlpha.800', 'blackAlpha.800');
  const inactiveDotColor = useColorModeValue('gray.300', 'gray.500');
  const hoverDotColor = useColorModeValue('gray.400', 'gray.600');
  const [currentFeature, setCurrentFeature] = useState(0);
  const [previousFeature, setPreviousFeature] = useState(-1);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const isLargerThan768 = useBreakpointValue({ base: false, md: true });

  const startTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (isLargerThan768 && sliderRef.current) {
      intervalRef.current = setInterval(() => {
        sliderRef.current.slickNext();
      }, 10000);
    }
  }, [isLargerThan768]);

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startTimer]);

  const handleIndicatorClick = index => {
    setPreviousFeature(currentFeature);
    setCurrentFeature(index);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
    startTimer(); // Reset timer when indicator is clicked
  };

  const handleArrowClick = direction => {
    if (sliderRef.current) {
      if (direction === 'next') {
        sliderRef.current.slickNext();
      } else {
        sliderRef.current.slickPrev();
      }
    }
    startTimer(); // Reset timer when arrow is clicked
  };

  const baseSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: (
      <SliderArrow direction="next" onClick={() => handleArrowClick('next')} />
    ),
    prevArrow: (
      <SliderArrow direction="prev" onClick={() => handleArrowClick('prev')} />
    ),
    appendDots: dots => (
      <Flex
        position="absolute"
        bottom={isMobile ? '0px' : '-10px'}
        left="50%"
        transform="translateX(-50%)"
        direction="row"
        gap="6"
        zIndex="2"
        bg={dotsBg}
        p="2"
        borderRadius="full"
        boxShadow="lg"
        justify="center"
        align="center"
        maxWidth="450px"
      >
        {dots}
      </Flex>
    ),
    customPaging: i => (
      <Box
        as="button"
        width="10px"
        height="10px"
        borderRadius="full"
        bg={currentFeature === i ? '#55c57a' : inactiveDotColor}
        cursor="pointer"
        transition="all 0.3s ease"
        _hover={{
          bg: currentFeature === i ? '#55c57a' : hoverDotColor,
          transform: 'scale(1.1)',
        }}
      />
    ),
    beforeChange: (oldIndex, newIndex) => {
      setPreviousFeature(oldIndex);
      setCurrentFeature(newIndex);
      startTimer(); // Reset timer on slide change
    },
  };

  return (
    <Suspense fallback={<Box>Loading...</Box>}>
      <Center mt={{ base: '0', md: '100' }}>
        <Heading
          as="h2"
          size="2xl"
          mb={{ base: '0', md: '100' }}
          maxW={isMobile ? '300' : ''}
          color={titleColor}
          textAlign="center"
          fontWeight="300"
          textTransform="uppercase"
        >
          Website Features
        </Heading>
      </Center>
      <Box bg={mainBg} color={textColor} minH="100vh" w="100%">
        <Flex
          gap={{ base: 8, md: 0 }}
          mt="50"
          direction={{ base: 'column', md: 'row' }}
        >
          <FeatureTitle
            features={features}
            currentFeature={currentFeature}
            mainBg={mainBg}
            isLargerThan768={isLargerThan768}
            order={{ base: 2, md: 1 }}
          />

          <Box
            position="relative"
            width={{ base: '100%', md: '60%' }}
            height={{ base: 'auto', md: '60vh' }}
            overflow="hidden"
            order={{ base: 1, md: 2 }}
            mt={{ base: 0, md: '-100px' }}
          >
            <ScrollIndicator
              total={features.length}
              current={currentFeature}
              onClick={handleIndicatorClick}
            />
            <Slider ref={sliderRef} {...baseSliderSettings}>
              {features.map((feature, index) => (
                <Box key={index} height={{ base: 'auto', md: '60vh' }}>
                  <Box
                    position="relative"
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      as="img"
                      src={feature.image}
                      alt={feature.title}
                      maxH="50vh"
                      objectFit="contain"
                      transition="opacity 0.5s ease-in-out"
                      opacity={currentFeature === index ? 1 : 0}
                    />
                  </Box>
                </Box>
              ))}
            </Slider>
          </Box>
        </Flex>
      </Box>
    </Suspense>
  );
};

export default FeaturesSection;
