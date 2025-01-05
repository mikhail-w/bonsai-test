import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
import { FaQuoteRight } from 'react-icons/fa'; // Import the quote icon
import Slider from 'react-slick';
import r1 from '../../assets/images/r1.png';
import r2 from '../../assets/images/r2.png';

// Custom Next Arrow
const NextArrow = ({ className, onClick }) => {
  return (
    <Box
      className={className}
      onClick={onClick}
      position="absolute"
      right="-10px"
      top="50%"
      transform="translate(0, -50%)"
      zIndex={2}
      cursor="pointer"
      bg="rgba(0,0,0,0.5)"
      color="white"
      borderRadius="full"
      padding="10px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      _hover={{ bg: 'black' }}
    >
      <SlArrowRight size="34px" />
    </Box>
  );
};

// Custom Prev Arrow
const PrevArrow = ({ className, onClick }) => {
  return (
    <Box
      className={className}
      onClick={onClick}
      position="absolute"
      left="-10px"
      top="50%"
      transform="translate(0, -50%)"
      zIndex={2}
      cursor="pointer"
      bg="rgba(0,0,0,0.5)"
      color="white"
      borderRadius="full"
      padding="10px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      _hover={{ bg: 'black' }}
    >
      <SlArrowLeft size="34px" />
    </Box>
  );
};

// Reviews Data
const reviews = [
  {
    name: 'James Wilson',
    position: 'Project Manager at Microsoft',
    image: r1,
    review:
      '“This website is a bonsai lover’s dream! The selection is incredible, and the care instructions that come with each tree are so helpful. My mini Japanese Maple arrived in perfect condition, and I can already tell it’s going to thrive in my home. The customer service is top-notch, and I can’t wait to order more!”',
  },
  {
    name: 'Robert Fox',
    position: 'Founder at Brain.co',
    image: r2,
    review:
      '“I had never owned a bonsai before, but this website made the process so easy and enjoyable. The descriptions for each tree are super detailed, and I love that they provide care tips for beginners. My Juniper Bonsai looks amazing on my desk, and I’ve already gotten so many compliments on it. Highly recommend this site for anyone looking to add a little zen to their space.”',
  },
  {
    name: 'Kristin Watson',
    position: 'UX Designer at Google',
    image: 'https://randomuser.me/api/portraits/women/50.jpg',
    review:
      '“As an interior designer, I’m always on the lookout for unique pieces to incorporate into my projects, and this bonsai eCommerce site has become my go-to! The trees are not only beautiful but also come with gorgeous planters that fit any decor. Shipping was fast, and the bonsai arrived in perfect condition. My clients love them!”',
  },
];

const ReviewCard = ({ review }) => (
  <Box
    bg="white"
    borderRadius="md"
    boxShadow="md"
    p={6}
    textAlign="center"
    maxW="350px"
    minW="300px"
    minH="458px"
    m="auto"
    mb={10}
    position="relative"
  >
    {/* Image with Quote Icon */}
    <Box position="relative" display="inline-block">
      <Image
        src={review.image}
        alt={review.name}
        borderRadius="full"
        boxSize="80px"
        objectFit="cover"
        mx="auto"
        mb={4}
      />
      <Box
        position="absolute"
        top="-5px"
        right="-5px"
        bg="green.500"
        color="white"
        borderRadius="full"
        boxSize="24px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <FaQuoteRight size="12px" />
      </Box>
    </Box>

    <Text
      color={'black'}
      fontFamily={'lato'}
      fontSize="md"
      fontStyle="italic"
      mb={4}
    >
      {review.review}
    </Text>
    <Heading color={'black'} as="h3" size="md" fontWeight="bold" mb={1}>
      {review.name}
    </Heading>
    <Text color="gray.500">{review.position}</Text>
  </Box>
);

const ReviewsSection = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Use Chakra UI's useColorModeValue to dynamically set dot color
  const dotColor = useColorModeValue('black', 'white');
  const headerColor = useColorModeValue('rgba(126, 213, 111, 0.8)', 'white');
  const activeDotColor = useColorModeValue('teal.500', 'teal.300');

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <Box>
        <ul style={{ margin: 0 }}>{dots}</ul>
      </Box>
    ),
    customPaging: i => (
      <Box
        as="div"
        bg={dotColor} // Default dot color
        w="12px"
        h="12px"
        borderRadius="50%"
        transition="background-color 0.3s ease"
        _hover={{ bg: activeDotColor }} // Hover color
        // Ensure active dots are styled differently
        sx={{
          '.slick-active &': {
            bg: activeDotColor,
          },
        }}
      />
    ),
  };

  return (
    <Box mt={100} mb={50} py={10} px={15} mx={2}>
      <Heading
        fontFamily="lato"
        as="h2"
        size="2xl"
        mb={12}
        paddingBottom="100px"
        fontWeight="300"
        color="green.600"
        textAlign="center"
        textTransform={'uppercase'}
      >
        What Our Customers Say
      </Heading>

      {isMobile ? (
        <Slider {...sliderSettings}>
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </Slider>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default ReviewsSection;
