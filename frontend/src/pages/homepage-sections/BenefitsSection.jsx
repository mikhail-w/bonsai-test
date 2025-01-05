import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  Flex,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import h3 from '../../assets/images/hr4.jpg';
import m1 from '../../assets/images/m1.jpg';
import m2 from '../../assets/images/m2.jpg';
import m3 from '../../assets/images/m3.jpg';
import m4 from '../../assets/images/h5.jpg';
import '../../assets/styles/holo.css';
import CustomHeading from '../../components/CustomHeading';

const BenefitsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [modalIndex, setModalIndex] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.700');

  const benefits = [
    {
      icon: '🌿',
      title: 'Connect with Nature',
      description:
        'Growing bonsai helps foster a deep connection with nature, bringing tranquility and peace into your home.',
      image: m1,
    },
    {
      icon: '🧘‍♂️',
      title: 'Reduce Stress',
      description:
        'The patience and care required for bonsai cultivation can help reduce stress and promote mindfulness.',
      image: m2,
    },
    {
      icon: '💧',
      title: 'Improve Air Quality',
      description:
        'Bonsai plants purify the air by filtering toxins, making your indoor environment healthier.',
      image: m3,
    },
    {
      icon: '🌸',
      title: 'Enhance Home Decor',
      description:
        'Bonsai plants add a touch of elegance and zen to any room, enhancing your home decor naturally.',
      image: m4,
    },
  ];

  const hoverColors = [
    {
      bg: 'linear-gradient(180deg, #E6F4EA 0%, #B4D6B4 100%)',
      text: '#000000',
      heading: '#fff',
    },
    { bg: 'rgba(93, 236, 107, 0.7)', text: '#000000', heading: '#F9F8F6' },
    { bg: 'rgba(166, 152, 218, 0.7)', text: '#000000', heading: '#FAFAED' },
    { bg: 'rgba(59, 205, 238, 0.7)', text: '#000000', heading: '#FAFAED' },
    { bg: 'rgba(251, 92, 116, 0.7)', text: '#000000', heading: '#F9F8F6' },
  ];

  const overlayColors = [
    'linear-gradient(to right bottom, rgba(93, 236, 107, 0.8), rgba(40, 180, 133, 0.8))',
    'linear-gradient(to right bottom, rgba(166, 152, 218, 0.8), rgba(142, 68, 173, 0.8))',
    'linear-gradient(to right bottom, rgba(59, 205, 238, 0.8), rgba(39, 125, 217, 0.8))',
    'linear-gradient(to right bottom, rgba(251, 92, 116, 0.8), rgba(227, 67, 51, 0.8))',
  ];

  const openModal = index => {
    setModalIndex(index);
    onOpen();
  };

  return (
    <>
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
        py={{ base: '6rem', md: '10rem', lg: '15rem' }}
        px={{ base: '1rem', md: '2rem', lg: '4rem' }}
      >
        <Center>
          <CustomHeading size={'2xl'} color="white" transform="skewY(7deg)">
            BENEFITS
          </CustomHeading>
        </Center>
        <Box transform="skewY(7deg)">
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
            spacing={10}
            justifyItems="center"
          >
            {benefits.map((benefit, index) => (
              <Box
                maxWidth="350px"
                maxHeight="350px"
                minHeight="300px"
                className="holographic-card"
                key={index}
                style={{
                  '--hover-bg-color': hoverColors[index].bg,
                  '--hover-text-color': hoverColors[index].text,
                  '--hover-heading-color': hoverColors[index].heading,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => openModal(index)}
              >
                <Flex
                  cursor="pointer"
                  direction="column"
                  align="center"
                  justify="center"
                  textAlign="center"
                  height="100%"
                >
                  <Text fontSize="4xl" mb={4}>
                    {benefit.icon}
                  </Text>
                  <Heading
                    className="hoverable-text-heading"
                    fontFamily="lato"
                    as="h3"
                    size="md"
                    mb={2}
                    color="cyan.400"
                  >
                    {benefit.title}
                  </Heading>
                  <Text
                    className="hoverable-text"
                    fontFamily="lato"
                    fontWeight="400"
                    color="gray.300"
                    transition="color 0.5s ease"
                  >
                    {benefit.description}
                  </Text>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: 'sm', md: '2xl', lg: '3xl' }}
      >
        <ModalOverlay
          bg={
            modalIndex !== null
              ? overlayColors[modalIndex]
              : 'rgba(0, 0, 0, 0.8)'
          }
        />
        <ModalContent
          maxH={{ base: '90vh', md: '50vh' }}
          w="90%"
          h="60%"
          overflow="hidden"
          borderRadius="lg"
          boxShadow="lg"
          bg="white"
          display="flex"
          position="relative"
          top={{ base: '20%', md: '10%' }}
          backgroundImage={`url(${
            modalIndex !== null ? benefits[modalIndex].image : ''
          })`}
          backgroundSize="cover"
          backgroundPosition="20px 0px"
        >
          <ModalCloseButton />
          {/* Left Text Section */}
          <Box
            flex="1"
            bg={bgColor}
            p={8}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            className="card__form"
            clipPath={{
              base: 'none',
              md: 'polygon(0 0, 60% 0%, 30% 100%, 0% 100%)',
            }}
          >
            <VStack
              as="form"
              spacing={4}
              maxWidth={{ base: '100%', md: '300px' }}
            >
              <Heading
                fontSize="2xl"
                fontWeight="bold"
                color="green.700"
                textAlign="left"
                mb={4}
                textTransform={'uppercase'}
              >
                {modalIndex !== null && benefits[modalIndex].title}
              </Heading>
              <Text fontSize="md" color="gray.700" mb={4}>
                {modalIndex !== null && benefits[modalIndex].description}
              </Text>
            </VStack>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BenefitsSection;
