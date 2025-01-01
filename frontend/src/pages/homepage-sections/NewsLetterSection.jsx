import React from 'react';
import bgImage from '../../assets/images/nat-10.jpg'; // Replace with your actual image path
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Heading,
  VStack,
  HStack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import '../../assets/styles/card.css';

const NewsLetterSection = () => {
  // Determine whether to show the background image based on screen size
  const showBgImage = useBreakpointValue({ base: false, md: true });
  const bgColor = useColorModeValue('white', 'gray.700');

  return (
    <Box
      bgColor="#32b882"
      h="120vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        w="90%"
        h="60%"
        maxW="1200px"
        bg="white"
        rounded="lg"
        overflow="hidden"
        shadow="xl"
        display="flex"
        position="relative"
        flex="1"
        backgroundImage={showBgImage ? `url(${bgImage})` : 'none'}
        backgroundSize="cover"
        backgroundPosition="220px 0px" // Shift more to the right by 20px
      >
        {/* Left Form Section */}
        <Box
          flex="1"
          // bg="rgba(255, 255, 255, 0.8)"
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
          <Heading
            as="h2"
            size="lg"
            mb={6}
            color="green.600"
            textTransform={'uppercase'}
          >
            Register for Our Newsletter
          </Heading>
          <VStack
            as="form"
            spacing={4}
            maxWidth={{ base: '100%', md: '300px' }}
          >
            <FormControl isRequired>
              <FormLabel
                htmlFor="name"
                color={useColorModeValue('gray.700', 'white')}
              >
                Full Name
              </FormLabel>
              <Input id="name" placeholder="Full Name" variant="filled" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel
                htmlFor="email"
                color={useColorModeValue('gray.700', 'white')}
              >
                Email Address
              </FormLabel>
              <Input
                id="email"
                placeholder="Email Address"
                type="email"
                variant="filled"
              />
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel as="legend" color="gray.700">
                Select Frequency
              </FormLabel>
              <RadioGroup defaultValue="small">
                <HStack spacing={4}>
                  <Radio value="small" colorScheme="green">
                    Weekly
                  </Radio>
                  <Radio value="large" colorScheme="green">
                    Monthly
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <Button colorScheme="green" size="lg" w="full" mt={4}>
              Next Step →
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default NewsLetterSection;
