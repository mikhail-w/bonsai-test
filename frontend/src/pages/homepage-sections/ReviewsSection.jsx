import React from 'react';
import {
  Box,
  Text,
  Heading,
  Image,
  SimpleGrid,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
import { FaQuoteRight } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import r1 from '../../assets/images/r1.png';
import r2 from '../../assets/images/r2.png';

const reviews = [
  {
    name: 'James Wilson',
    position: 'Project Manager at Microsoft',
    image: r1,
    review:
      "This website is a bonsai lover's dream! The selection is incredible, and the care instructions that come with each tree are so helpful.",
  },
  {
    name: 'Robert Fox',
    position: 'Founder at Brain.co',
    image: r2,
    review:
      '"I had never owned a bonsai before, but this website made the process so easy and enjoyable. The descriptions for each tree are super detailed."',
  },
  {
    name: 'Kristin Watson',
    position: 'UX Designer at Google',
    image: 'https://randomuser.me/api/portraits/women/50.jpg',
    review:
      "As an interior designer, I'm always on the lookout for unique pieces to incorporate into my projects, and this bonsai eCommerce site has become my go-to!",
  },
];

const SliderArrow = ({ direction, onClick }) => {
  const isNext = direction === 'next';
  const Icon = isNext ? SlArrowRight : SlArrowLeft;

  return (
    <Box
      onClick={onClick}
      position="absolute"
      top="50%"
      transform="translateY(-50%)"
      {...(isNext ? { right: -5 } : { left: -5 })}
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

const ReviewCard = ({ review }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const titleColor = useColorModeValue('gray.800', 'white');
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      bg={bgColor}
      borderRadius="xl"
      boxShadow="lg"
      p={6}
      textAlign="center"
      width={isMobile ? 'calc(100vw - 48px)' : '350px'}
      maxW={isMobile ? 'none' : '350px'}
      minH="400px"
      m="auto"
      position="relative"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
    >
      <Box position="relative" display="inline-block" mb={4}>
        <Image
          src={review.image}
          alt={review.name}
          borderRadius="full"
          boxSize="80px"
          objectFit="cover"
          mx="auto"
          border="3px solid"
          borderColor="green.400"
        />
        <Box
          position="absolute"
          top="-2px"
          right="-2px"
          bg="green.400"
          color="white"
          borderRadius="full"
          p={1.5}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FaQuoteRight size="12px" />
        </Box>
      </Box>

      <Text
        color={textColor}
        fontSize={isMobile ? 'lg' : 'md'}
        mb={4}
        fontStyle="italic"
        px={isMobile ? 2 : 0}
      >
        {review.review}
      </Text>

      <Heading as="h3" size="md" color={titleColor} mb={1}>
        {review.name}
      </Heading>

      <Text color="gray.500" fontSize="sm">
        {review.position}
      </Text>
    </Box>
  );
};

const ReviewsSection = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const sectionBg = useColorModeValue('gray.50', 'gray.900');
  const titleColor = useColorModeValue('green.600', 'green.400');
  const dotColor = useColorModeValue('gray.300', 'gray.600');
  const activeDotColor = useColorModeValue('green.500', 'green.400');

  const sliderSettings = {
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
      <Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          mt={4}
        >
          {dots}
        </Box>
      </Box>
    ),
    customPaging: () => (
      <Box
        as="button"
        w="10px"
        h="10px"
        borderRadius="full"
        bg={dotColor}
        transition="all 0.2s"
        _hover={{ bg: activeDotColor }}
        sx={{
          '&.slick-active': {
            bg: activeDotColor,
            transform: 'scale(1.2)',
          },
        }}
      />
    ),
  };

  return (
    <Box bg={sectionBg} py={16} px={4}>
      <Heading
        as="h2"
        size="2xl"
        mb={12}
        color={titleColor}
        textAlign="center"
        fontWeight="300"
        textTransform="uppercase"
      >
        What Our Customers Say
      </Heading>

      <Box maxW="1200px" mx="auto">
        {isMobile ? (
          <Box position="relative" mx={2}>
            <Slider {...sliderSettings}>
              {reviews.map((review, index) => (
                <Box key={index}>
                  <ReviewCard review={review} />
                </Box>
              ))}
            </Slider>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default ReviewsSection;
