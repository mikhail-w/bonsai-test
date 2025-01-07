import React from 'react';
import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import ProfilePictureSection from './ProfilePictureSection';
import AccountDetailsSection from './AccountDetailsSection';
import Weather from './Weather';
import ZenQuotes from './Dashboard/ZenQuotes';
import { useSelector } from 'react-redux';

import MyOrders from './MyOrders';

const UserProfile = () => {
  const userLogin = useSelector(state => state.userLogin);

  const bgColor = useColorModeValue('gray.100', 'gray.500');
  const { userInfo } = userLogin;
  return (
    <>
      <Flex
        direction={'column'}
        p={6}
        bg={bgColor}
        borderRadius="md"
        boxShadow="lg"
        gap={8}
        fontFamily="lato"
      >
        <Text fontSize="lg" ml={10} fontFamily="lato" fontWeight="400">
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
          direction={{ base: 'column', md: 'row' }}
          align="center"
          p={6}
          bg={bgColor}
          borderRadius="md"
          boxShadow="sm"
          gap={8}
        >
          <ProfilePictureSection />
          {!userInfo.isAdmin ? <AccountDetailsSection /> : null}
        </Flex>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="flex-start"
          gap={4}
        >
          <Box flex="1" minW="300px">
            <ZenQuotes />
          </Box>
          <Box flex="1" minW="300px">
            <Weather />
          </Box>
        </Flex>

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
