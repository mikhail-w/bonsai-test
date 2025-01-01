import { useState } from 'react';
import { Box, SimpleGrid, Text, Heading, Flex, Center } from '@chakra-ui/react';
import h3 from '../assets/images/hr4.jpg';
import '../assets/styles/holo.css';

const BenefitsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

  // const hoverColors = ['#90EE90', '#FFD700', '#ADD8E6', '#FFB6C1']; // Define hover colors
  const hoverColors = [
    { bg: 'rgba(93, 236, 107, 0.7)', text: '#000000', heading: '#fff' },
    { bg: ' rgba(166, 152, 218, 0.7)', text: '#000000', heading: '#fff' },
    { bg: 'rgba(59, 205, 238, 0.7)', text: '#000000', heading: '#fff' },
    { bg: ' rgba(251, 92, 116, 0.7)', text: '#000000', heading: '#fff' },
  ];

  const overlayColors = [
    'linear-gradient(to right bottom, rgba(93, 236, 107, 0.8), rgba(40, 180, 133, 0.8))',
    'linear-gradient(to right bottom, rgba(166, 152, 218, 0.8), rgba(142, 68, 173, 0.8))',
    'linear-gradient(to right bottom, rgba(59, 205, 238, 0.8), rgba(39, 125, 217, 0.8))',
    'linear-gradient(to right bottom, rgba(251, 92, 116, 0.8), rgba(227, 67, 51, 0.8))',
  ];

  return (
    <Box
      className="section-features"
      bgImage={{
        base: `${
          hoveredIndex !== null
            ? overlayColors[hoveredIndex]
            : `linear-gradient(to right bottom, rgba(126, 213, 111, 0.8), rgba(40, 180, 133, 0.8))`
        }, url(${h3})`,
      }}
      bgSize="cover"
      transform="skewY(-7deg)"
      mt={-40}
      py={{ base: '10rem', md: '20rem' }}
      px={{ base: '2rem', md: '4rem', lg: '6rem' }}
    >
      <Center>
        <Heading
          transform="skewY(7deg)"
          fontFamily="lato"
          as="h2"
          size="2xl"
          mb={12}
          paddingBottom="100px"
          fontWeight="300"
          color="white"
        >
          BENEFITS
        </Heading>
      </Center>
      <Box transform="skewY(7deg)">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {benefits.map((benefit, index) => (
            <div
              className="holographic-card"
              key={index}
              style={{
                '--hover-bg-color': hoverColors[index].bg,
                '--hover-text-color': hoverColors[index].text,
                '--hover-heading-color': hoverColors[index].heading,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Flex
                cursor={'pointer'}
                direction="column"
                align="center"
                justify="center"
                textAlign="center"
                height="100%"
              >
                <Text fontSize="6xl" mb={4}>
                  {benefit.icon}
                </Text>
                <Heading
                  className="hoverable-text-heading"
                  fontFamily={'lato'}
                  as="h3"
                  size="md"
                  mb={2}
                  color="cyan.400"
                >
                  {benefit.title}
                </Heading>
                <Text
                  fontFamily={'lato'}
                  fontWeight={'400'}
                  className="hoverable-text"
                  color="gray.300"
                  transition="color 0.5s ease"
                >
                  {benefit.description}
                </Text>
              </Flex>
            </div>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default BenefitsSection;
