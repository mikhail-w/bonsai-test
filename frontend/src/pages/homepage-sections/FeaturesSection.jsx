import React, { useEffect, useRef, useState, Suspense } from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  useColorModeValue,
  Container,
  useMediaQuery,
  useBreakpointValue,
  Heading,
  Center,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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

const DesktopFeatureSlide = ({ feature }) => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py={8}
    >
      <Image
        src={feature.image}
        alt={feature.title}
        maxH="50vh"
        objectFit="contain"
        mx="auto"
        sx={{
          animation: `${fadeIn} 0.8s ease-out`,
        }}
      />
    </Box>
  );
};

const SliderArrow = ({ direction, onClick }) => {
  const isNext = direction === 'next';
  const Icon = isNext ? SlArrowRight : SlArrowLeft;

  return (
    <Box
      onClick={onClick}
      position="absolute"
      top="45%"
      transform="translateY(-50%)"
      {...(isNext ? { right: 4 } : { left: 4 })}
      zIndex={2}
      cursor="pointer"
      bg="green.400"
      color="white"
      borderRadius="full"
      p={3}
      display="flex"
      alignItems="center"
      justifyContent="center"
      transition="all 0.2s"
      _hover={{
        bg: 'green.500',
        transform: 'translateY(-50%) scale(1.1)',
      }}
    >
      <Icon size={20} />
    </Box>
  );
};

const ScrollIndicator = ({ total, current, onClick }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      visibility={isMobile ? 'visible' : 'visible'}
      position="absolute"
      // position={isMobile ? 'fixed' : 'absolute'}
      bottom={isMobile ? '0px' : '400px'}
      left={isMobile ? '50%' : '50%'}
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

const MobileFeatureCard = ({ feature, isActive }) => {
  return (
    <Box
      w="100vw"
      h="85vh"
      flex="none"
      p="6"
      pb={'350'}
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
  const dotColor = useColorModeValue('gray.300', 'gray.600');
  const activeDotColor = useColorModeValue('green.500', 'green.400');
  const titleColor = useColorModeValue('green.600', 'green.400');

  // Get color mode values
  const dotsBg = useColorModeValue('whiteAlpha.800', 'blackAlpha.800');
  const inactiveDotColor = useColorModeValue('gray.300', 'gray.500');
  const hoverDotColor = useColorModeValue('gray.400', 'gray.600');
  // const baseSliderSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 5000,
  //   pauseOnHover: true,
  //   nextArrow: <SliderArrow direction="next" />,
  //   prevArrow: <SliderArrow direction="prev" />,
  //   appendDots: dots => (
  //     <Box>
  //       <Box
  //         display="flex"
  //         justifyContent="center"
  //         alignItems="center"
  //         gap={2}
  //         mt={4}
  //       >
  //         {dots}
  //       </Box>
  //     </Box>
  //   ),
  //   customPaging: () => (
  //     <Box
  //       as="button"
  //       w="10px"
  //       h="10px"
  //       borderRadius="full"
  //       bg={dotColor}
  //       transition="all 0.2s"
  //       _hover={{ bg: activeDotColor }}
  //       sx={{
  //         '&.slick-active': {
  //           bg: activeDotColor,
  //           transform: 'scale(1.2)',
  //         },
  //       }}
  //     />
  //   ),
  // };

  // Define base slider settings
  const baseSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <SliderArrow direction="next" />,
    prevArrow: <SliderArrow direction="prev" />,
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
        maxWidth={'450px'}
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
  };

  // Define mobile slider settings
  const sliderSettings = {
    ...baseSliderSettings,
    beforeChange: (oldIndex, newIndex) => {
      setPreviousFeature(oldIndex);
      setCurrentFeature(newIndex);
    },
  };

  // Define desktop slider settings
  const desktopSliderSettings = {
    ...baseSliderSettings,
    beforeChange: (oldIndex, newIndex) => {
      setPreviousFeature(oldIndex);
      setCurrentFeature(newIndex);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    },
    afterChange: index => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setPreviousFeature(index);
          setCurrentFeature(prev => (prev + 1) % features.length);
        }, 5000);
      }
    },
  };

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
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Suspense fallback={<Box>Loading...</Box>}>
      <Center mt={100}>
        <Heading
          as="h2"
          size="2xl"
          mb={12}
          maxW={isMobile ? '300' : ''}
          color={titleColor}
          textAlign="center"
          fontWeight="300"
          textTransform="uppercase"
        >
          Website Features
        </Heading>
      </Center>
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
                    to={'/register/'}
                    size="lg"
                    bg="#228B22"
                    color="white"
                    fontSize="lg"
                    fontFamily="'Open Sans', sans-serif"
                    fontWeight="300"
                    mt={5}
                    transition="all 0.3s"
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
            mb={'100'}
          >
            {isLargerThan768 ? (
              <Box position="relative" height="100%" mt="150px">
                <Slider {...desktopSliderSettings}>
                  {features.map((feature, index) => (
                    <DesktopFeatureSlide key={index} feature={feature} />
                  ))}
                </Slider>
                {/* <ScrollIndicator
                  total={features.length}
                  current={currentFeature}
                  onClick={index => {
                    setPreviousFeature(currentFeature);
                    setCurrentFeature(index);
                  }}
                /> */}
              </Box>
            ) : (
              // Mobile: Swipeable cards
              <>
                <Box position="relative" mx={2}>
                  <Slider {...sliderSettings}>
                    {features.map((feature, index) => (
                      <Box key={index}>
                        <MobileFeatureCard
                          feature={feature}
                          isActive={currentFeature === index}
                        />
                      </Box>
                    ))}
                  </Slider>
                </Box>
                <ScrollIndicator
                  total={features.length}
                  current={currentFeature}
                  onClick={index => {
                    setPreviousFeature(currentFeature);
                    setCurrentFeature(index);
                  }}
                />
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </Suspense>
  );
};

export default FeaturesSection;
