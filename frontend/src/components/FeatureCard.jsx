import React from 'react';
import { Box, Heading, Text, Icon, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa'; // Importing a globe icon as an example

const MotionBox = motion(Box);

const FeatureCard = () => {
  return (
    <MotionBox
      whileHover={{ scale: 1.05 }} // Slightly scales up on hover
      transition={{ duration: 0.3, ease: 'easeInOut' }} // Smooth hover animation
      bg="white"
      p={8}
      borderRadius="md"
      boxShadow="md"
      textAlign="center"
    >
      <Flex>
        {/* Icon */}
        <Icon as={FaGlobe} w={12} h={12} color="green.500" mb={4} />

        {/* Heading */}
        <Heading
          as="h3"
          size="md"
          mb={4}
          fontWeight="bold"
          color="gray.700"
          className="heading-tertiary"
        >
          Discover Plants
        </Heading>

        {/* Text */}
        <Text color="gray.600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
          ipsum sapiente aspernatur.
        </Text>
      </Flex>
    </MotionBox>
  );
};

export default FeatureCard;
