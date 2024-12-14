import React from 'react';
import { Image, Text, Flex } from '@chakra-ui/react';
import LogoImage from '../../assets/images/logo.png'; // Adjust the path if the logo is located elsewhere

const Logo = () => {
  return (
    <Flex alignItems="center">
      <Image src={LogoImage} boxSize="50px" alt="Bonsai Logo" />
      <Text fontSize="2xl" fontFamily="rale" fontWeight="300" pt={6}>
        BONSAI
      </Text>
    </Flex>
  );
};

export default Logo;
