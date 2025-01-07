import React from 'react';
import Weather from './Weather';
import MyOrders from './MyOrders';
import ZenQuotes from './ZenQuotes';
import { useSelector } from 'react-redux';
import ProfileUpdateSection from './ProfileUpdateSection';
import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const UserProfile = () => {
  const userLogin = useSelector(state => state.userLogin);

  // const bgColor = useColorModeValue('gray.100', 'gray.500');
  const bgColor = useColorModeValue('white', 'gray.800');
  const { userInfo } = userLogin;
  return (
    <>
      <Flex
        direction={'column'}
        p={6}
        bg={bgColor}
        boxShadow="lg"
        gap={8}
        fontFamily="lato"
      >
        <Text fontSize="lg" fontFamily="lato" fontWeight="400">
          Welcome Back{' '}
          <Text
            textTransform={'capitalize'}
            as="span"
            fontSize="2xl"
            fontWeight="bold"
          >
            {userInfo.name}
          </Text>
        </Text>
        <Flex
          direction={{ base: 'column', sm: 'column', md: 'column', lg: 'row' }}
          align="center"
          p={6}
          bg={bgColor}
          borderRadius="md"
          boxShadow="sm"
          gap={10}
        >
          <ProfileUpdateSection />
          <ZenQuotes />
        </Flex>

        <Center>
          <Weather />
        </Center>

        {!userInfo.isAdmin ? (
          <>
            <Heading fontFamily="rale">My Orders</Heading>
            <MyOrders />
          </>
        ) : null}
        <Flex mb={20}></Flex>
      </Flex>
    </>
  );
};

export default UserProfile;
