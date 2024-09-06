import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import ProfilePictureSection from './ProfilePictureSection';
import AccountDetailsSection from './AccountDetailsSection';
import Weather from './Weather';
import { useSelector } from 'react-redux';

import MyOrders from './MyOrders';

const UserProfile = () => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <>
      <Flex
        direction={'column'}
        p={6}
        bg="gray.50"
        borderRadius="md"
        boxShadow="lg"
        gap={8}
        fontFamily="rale"
      >
        <Text ml={10} fontFamily="rale" fontWeight="300">
          Welcome Back{' '}
          <Text as="span" fontSize="xl" fontWeight="bold">
            {userInfo.name}
          </Text>
        </Text>
        <Flex
          // direction={{ base: 'column', md: 'row' }}
          direction={{ base: 'column', md: 'row' }}
          align="center"
          p={6}
          bg="gray.50"
          borderRadius="md"
          boxShadow="sm"
          gap={8}
        >
          <ProfilePictureSection />
          {!userInfo.isAdmin ? <AccountDetailsSection /> : null}
        </Flex>
        <Weather />
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
