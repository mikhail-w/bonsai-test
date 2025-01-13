import React from 'react';
import { Box, Image, Text, useColorModeValue } from '@chakra-ui/react';
import CustomHeading from '../../../components/CustomHeading';

const MobileFeatureCard = ({ feature, isActive }) => (
  <Box
    w="100vw"
    h="70vh"
    p="6"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    transform={isActive ? 'scale(1)' : 'scale(0.95)'}
    transition="transform 0.3s"
  >
    <Image src={feature.image} alt={feature.title} maxH="40vh" />
    <CustomHeading>{feature.title}</CustomHeading>
    <Text>{feature.description}</Text>
  </Box>
);

export default MobileFeatureCard;
