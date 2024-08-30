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
        <Text fontFamily="rale" fontWeight="300">
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
          <AccountDetailsSection />
        </Flex>
        <Weather />
        <Heading fontFamily="rale">My Orders</Heading>
        <Flex mb={20}>
          <MyOrders />
        </Flex>
      </Flex>
    </>
  );
};

export default UserProfile;
