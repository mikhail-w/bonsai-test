import React from 'react';
import { Box, Container, Text, useColorModeValue } from '@chakra-ui/react';
import CustomHeading from '../../../components/CustomHeading';
import CustomButton from '../../../components/CustomButton';
import { keyframes } from '@emotion/react';

const FeatureTitle = ({
  currentFeature,
  features,
  mainBg,
  isLargerThan768,
  buttonText = 'Sign Up Now',
  buttonTo = '/register/',
  headingColor,
  headingFontSize,
  descriptionFontSize,
  order,
}) => {
  const defaultHeadingColor = useColorModeValue('green.600', '#32CD32');

  // Define animations
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

  return (
    <Box
      position={{ base: 'relative', md: 'sticky' }}
      top={0}
      width={{ base: '100%', md: '40%' }}
      height={{ base: 'auto', md: '60vh' }}
      bg={mainBg}
      key={currentFeature} // Forces re-render on feature change
      order={order}
    >
      <Container
        // outline={'2px solid orange'}
        maxW="container.md"
        height="100%"
        py={{ base: 12, md: 8 }}
        px={8}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* Heading Section */}
        <Box
          // outline={'2px solid yellow'}
          height="100px"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb={8}
        >
          <CustomHeading
            as="h2"
            fontSize={headingFontSize || { base: '3xl', md: '4xl', lg: '5xl' }}
            color={headingColor || defaultHeadingColor}
            letterSpacing="tight"
            fontFamily="lato"
            fontWeight="300"
            lineHeight="shorter"
            mt={{ base: '-100px', md: '0' }}
            // mt="-100px"
            sx={
              isLargerThan768
                ? {
                    animation: `${fadeInOnly} 0.8s ease-in-out`,
                  }
                : undefined
            }
          >
            {features[currentFeature].title}
          </CustomHeading>
        </Box>

        {/* Description Section */}
        <Box
          // outline={'2px solid orange'}
          height="120px"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="visible"
          mb={8}
        >
          <Text
            fontSize={descriptionFontSize || { base: 'lg', md: 'xl' }}
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
                : undefined
            }
          >
            {isLargerThan768
              ? features[currentFeature].description
              : 'Explore features designed to elevate your bonsai journey. Join our community and unlock your zen potential today!'}
          </Text>
        </Box>

        {/* Button Section */}
        <Box>
          <CustomButton
            mt={0}
            to={buttonTo}
            size="lg"
            bg="#228B22"
            color="white"
            fontSize="lg"
            fontFamily="'Open Sans', sans-serif"
            fontWeight="300"
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
            {buttonText}
          </CustomButton>
        </Box>
      </Container>
    </Box>
  );
};

export default FeatureTitle;
