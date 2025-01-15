import React, { useEffect, useRef, useState, Suspense } from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  useColorModeValue,
  Container,
  VStack,
  useTheme,
  useMediaQuery,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import f1l from '../../assets/images/feature001-light.png';
import f1d from '../../assets/images/feature001-dark.png';
import f2l from '../../assets/images/feature002-light.png';
import f2d from '../../assets/images/feature002-dark.png';
import f3l from '../../assets/images/feature003-light.png';
import f3d from '../../assets/images/feature003-dark.png';
import f4l from '../../assets/images/feature004-light.png';
import f4d from '../../assets/images/feature004-dark.png';
import f5l from '../../assets/images/feature005-light.png';
import f5d from '../../assets/images/feature005-dark.png';
import f6l from '../../assets/images/feature006-light.png';
import f6d from '../../assets/images/feature006-dark.png';
import f7l from '../../assets/images/feature007-light.png';
import f7d from '../../assets/images/feature007-dark.png';
import CustomButton from '../../components/CustomButton';
import CustomHeading from '../../components/CustomHeading';

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeInOnly = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(1.05); }
  to { opacity: 1; transform: scale(1); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
`;

const ScrollIndicator = ({ total, current, onClick }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      visibility={isMobile ? 'hidden' : 'visible'}
      position="absolute"
      // position={isMobile ? 'fixed' : 'absolute'}
      bottom={isMobile ? '10px' : '300px'}
      left={isMobile ? '50%' : '45%'}
      transform={isMobile ? 'translateX(-50%)' : 'translate(-50%, 50%)'}
      direction="row"
      gap="6"
      zIndex="2"
      bg={useColorModeValue('whiteAlpha.800', 'blackAlpha.800')}
      p="2"
      borderRadius="full"
      boxShadow="lg"
      justify="center"
      align="center"
    >
      {Array.from({ length: total }).map((_, index) => (
        <Box
          key={index}
          width="10px"
          height="10px"
          borderRadius="full"
          bg={current === index ? '#55c57a' : 'gray.300'}
          cursor="pointer"
          transition="all 0.3s ease"
          onClick={() => onClick(index)}
          _hover={{
            bg: current === index ? '#55c57a' : 'gray.400',
            transform: 'scale(1.1)',
          }}
        />
      ))}
    </Flex>
  );
};

const DesktopFeatureSlide = ({ feature, isActive, isPrevious }) => {
  const imageAnimation = isActive ? fadeIn : isPrevious ? fadeOut : '';

  return (
    <Box
      position="absolute"
      top="-150"
      left="0"
      width="90%"
      height="100%"
      opacity={isActive ? 1 : 0}
      display="flex"
      justifyContent="center"
      alignItems="center"
      transition="opacity 0.5s"
      sx={{
        animation: imageAnimation ? `${imageAnimation} 0.8s ease-out` : 'none',
      }}
    >
      <Image
        src={feature.image}
        alt={feature.title}
        maxH="50vh"
        objectFit="contain"
        mx="auto"
      />
    </Box>
  );
};

const MobileFeatureCard = ({ feature, isActive }) => {
  return (
    <Box
      w="100vw"
      h="70vh"
      flex="none"
      p="6"
      pb={'200'}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      transform={isActive ? 'scale(1)' : 'scale(0.95)'}
      transition="transform 0.3s"
    >
      <Image
        src={feature.image}
        alt={feature.title}
        maxH="40vh"
        objectFit="contain"
        mt="290"
        mb="-10"
      />
      <CustomHeading
        as="h3"
        fontSize="xl"
        mt="4"
        mb="-10"
        fontFamily="lato"
        fontWeight="300"
        color={useColorModeValue('green.600', '#32CD32')}
      >
        {feature.title}
      </CustomHeading>
      <Text
        fontSize="sm"
        fontFamily="rale"
        lineHeight="tall"
        color={useColorModeValue('gray.600', 'gray.400')}
        maxW="80%"
        textAlign="center"
        mb={200}
      >
        {feature.description}
      </Text>
    </Box>
  );
};

const FeaturesSection = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [previousFeature, setPreviousFeature] = useState(-1);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isLargerThan768] = useMediaQuery('(min-width: 48em)');
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  const features = [
    {
      title: 'Find Your Inner Peace',
      description:
        'Generate inspiring zen quotes to bring tranquility and clarity to your day.',
      image: useColorModeValue(f1l, f1d),
    },
    {
      title: 'Stay Ahead of the Weather',
      description:
        'Plan your day with precise, location-based weather updates at your fingertips.',
      image: useColorModeValue(f2l, f2d),
    },
    {
      title: 'Experience Bonsai in 3D',
      description:
        'Immerse yourself in the world of bonsai with stunning 3D and AR models.',
      image: useColorModeValue(f3l, f3d),
    },
    {
      title: 'Discover Local Treasures',
      description:
        'Use our integrated map to find bonsai nurseries, stores, and clubs near you.',
      image: useColorModeValue(f4l, f4d),
    },
    {
      title: 'Join the Bonsai Community',
      description: 'Read and share stories in our vibrant bonsai blog.',
      image: useColorModeValue(f5l, f5d),
    },
    {
      title: 'Identify Any Plant Instantly',
      description:
        'Snap a photo and let our AI-powered tool tell you all about your plant.',
      image: useColorModeValue(f6l, f6d),
    },
    {
      title: 'Chat with the Zen Master',
      description:
        'Get advice and insights from our AI-powered Zen Master chatbot.',
      image: useColorModeValue(f7l, f7d),
    },
  ];

  const handleTouchStart = e => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = e => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const minSwipeDistance = 50;
    if (touchStart - touchEnd > minSwipeDistance) {
      // Swiped left
      setPreviousFeature(currentFeature);
      setCurrentFeature(prev => (prev + 1) % features.length);
    }
    if (touchEnd - touchStart > minSwipeDistance) {
      // Swiped right
      setPreviousFeature(currentFeature);
      setCurrentFeature(prev => (prev === 0 ? features.length - 1 : prev - 1));
    }
  };

  useEffect(() => {
    if (isLargerThan768) {
      intervalRef.current = setInterval(() => {
        setPreviousFeature(currentFeature);
        setCurrentFeature(prev => (prev + 1) % features.length);
      }, 6000);

      return () => clearInterval(intervalRef.current);
    }
  }, [currentFeature, isLargerThan768]);

  const mainBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.200');

  return (
    <Suspense fallback={<Box>Loading...</Box>}>
      <CustomHeading mb={'-50'} size={'2xl'}>
        Website Features
      </CustomHeading>
      <Box bg={'mainBg'} color={textColor} minH="100vh" w="100%">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          minH="100vh"
          bg={mainBg}
        >
          {/* Hero Section */}
          <Box
            position={{ base: 'relative', md: 'sticky' }}
            top={0}
            width={{ base: '100%', md: '50%' }}
            height={{ base: 'auto', md: '100vh' }}
            bg={mainBg}
            // bg={'red'}
            zIndex={1}
            order={{ base: 2, md: 1 }}
          >
            <Container
              maxW="container.md"
              height={{ base: 'auto', md: '100vh' }}
              py={{ base: 12, md: 8 }}
              px={8}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                width="100%"
                height={{ base: 'auto', md: '500px' }}
                display="flex"
                flexDirection="column"
                position="relative"
                key={currentFeature}
              >
                {/* Fixed height content wrapper */}
                <Box
                  height={{ base: 'auto', md: '300px' }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  mb={8}
                >
                  {/* Heading with fixed height */}
                  <Box
                    height="100px"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb={10}
                  >
                    <CustomHeading
                      as="h2"
                      fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                      color={useColorModeValue('green.600', '#32CD32')}
                      letterSpacing="tight"
                      fontFamily="lato"
                      fontWeight="300"
                      lineHeight="shorter"
                      mt="50px"
                      sx={
                        isLargerThan768
                          ? { animation: `${fadeInOnly} 0.8s ease-in-out` }
                          : {}
                      }
                    >
                      {isLargerThan768
                        ? features[currentFeature].title
                        : 'Transform Your Experience'}
                    </CustomHeading>
                  </Box>

                  {/* Description with fixed height */}
                  <Box
                    height="120px"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                  >
                    <Text
                      fontSize={{ base: 'lg', md: 'xl' }}
                      fontFamily="rale"
                      fontWeight="400"
                      maxW="600px"
                      textAlign="center"
                      sx={
                        isLargerThan768
                          ? {
                              opacity: 0,
                              animation: `${slideIn} 0.8s ease-in-out`,
                              animationDelay: '0.8s',
                              animationFillMode: 'forwards',
                            }
                          : {}
                      }
                    >
                      {isLargerThan768
                        ? features[currentFeature].description
                        : 'Explore features designed to elevate your bonsai journey. Join our community and unlock your zen potential today!'}
                    </Text>
                  </Box>
                </Box>

                {/* Button container with fixed position */}
                <Box width="100%" display="flex" justifyContent="center">
                  <CustomButton
                    size="lg"
                    bg="#228B22"
                    color="white"
                    fontSize="lg"
                    fontFamily="'Open Sans', sans-serif"
                    fontWeight="300"
                    mt={5}
                    transition="all 0.3s"
                    onClick={() => alert('Sign Up feature coming soon!')}
                    _hover={{
                      bg: '#32CD32',
                      transform: 'translateY(-2px)',
                      boxShadow: 'xl',
                    }}
                    _active={{
                      bg: '#228B22',
                      transform: 'translateY(0)',
                    }}
                  >
                    Sign Up Now
                  </CustomButton>
                </Box>
              </Box>
            </Container>
          </Box>

          {/* Features Section */}
          <Box
            position="relative"
            width={{ base: '100%', md: '50%' }}
            order={{ base: 1, md: 2 }}
            height={{ base: '60vh', md: '100vh' }}
            overflow="hidden"
            bg={mainBg}
            // pb={200}
          >
            <ScrollIndicator
              total={features.length}
              current={currentFeature}
              onClick={index => {
                setPreviousFeature(currentFeature);
                setCurrentFeature(index);
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                  intervalRef.current = setInterval(() => {
                    setPreviousFeature(currentFeature);
                    setCurrentFeature(prev => (prev + 1) % features.length);
                  }, 5000);
                }
              }}
            />

            {isLargerThan768 ? (
              // Desktop: Slideshow
              features.map((feature, index) => (
                <DesktopFeatureSlide
                  key={index}
                  feature={feature}
                  isActive={currentFeature === index}
                  isPrevious={previousFeature === index}
                />
              ))
            ) : (
              // Mobile: Swipeable cards
              <Box
                ref={containerRef}
                overflow="hidden"
                w="100%"
                h="100%"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Flex
                  transition="transform 0.3s ease-out"
                  transform={`translateX(-${currentFeature * 100}%)`}
                >
                  {features.map((feature, index) => (
                    <MobileFeatureCard
                      key={index}
                      feature={feature}
                      isActive={currentFeature === index}
                    />
                  ))}
                </Flex>
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
    </Suspense>
  );
};

export default FeaturesSection;
