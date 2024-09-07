import { Box, SimpleGrid, Text, Heading, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import h3 from '../assets/images/hr4.jpg';

const MotionBox = motion(Box);

const BenifitsSection = () => {
  const benefits = [
    {
      icon: '🌿',
      title: 'Connect with Nature',
      description:
        'Growing bonsai helps foster a deep connection with nature, bringing tranquility and peace into your home.',
    },
    {
      icon: '🧘‍♂️',
      title: 'Reduce Stress',
      description:
        'The patience and care required for bonsai cultivation can help reduce stress and promote mindfulness.',
    },
    {
      icon: '💧',
      title: 'Improve Air Quality',
      description:
        'Bonsai plants purify the air by filtering toxins, making your indoor environment healthier.',
    },
    {
      icon: '🌸',
      title: 'Enhance Home Decor',
      description:
        'Bonsai plants add a touch of elegance and zen to any room, enhancing your home decor naturally.',
    },
  ];

  return (
    <Box
      className="section-features"
      bgImage={{
        base: `linear-gradient(to right bottom, rgba(126, 213, 111, 0.8), rgba(40, 180, 133, 0.8)), url(${h3})`,
      }}
      bgSize="cover"
      transform="skewY(-7deg)"
      mt={-40}
      py={{ base: '10rem', md: '20rem' }} // Responsive padding
      px={{ base: '2rem', md: '4rem', lg: '6rem' }} // Padding on x-axis for space from viewport edges
    >
      <Box transform="skewY(7deg)">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {benefits.map((benefit, index) => (
            <MotionBox
              key={index}
              bg="rgba(255, 255, 255, 0.8)"
              p={{ base: '2rem', md: '2.5rem' }} // Responsive padding
              borderRadius="lg" // Rounded corners
              boxShadow="0 1.5rem 4rem rgba(0, 0, 0, 0.15)" // Box shadow for depth
              transition="transform 0.3s ease"
              whileHover={{
                scale: 1.03,
                translateY: -6,
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
              }}
              textAlign="center"
            >
              <Flex
                direction="column"
                align="center"
                justify="center"
                textAlign="center"
                height="100%" // Ensure content is vertically centered
              >
                <Text
                  fontSize="6xl"
                  mb={4}
                  bgGradient="linear(to-r, #7ed56f, #28b485)" // Gradient text
                  bgClip="text"
                >
                  {benefit.icon}
                </Text>
                <Heading as="h3" size="md" mb={2}>
                  {benefit.title}
                </Heading>
                <Text color="gray.600">{benefit.description}</Text>
              </Flex>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default BenifitsSection;
