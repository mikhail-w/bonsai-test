import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import ProfilePictureSection from './ProfilePictureSection';
import AccountDetailsSection from './AccountDetailsSection';
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
        boxShadow="sm"
        gap={8}
      >
        <Text fontFamily="rale" ml={7} className="text">
          Welcome Back {userInfo.name}
        </Text>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="flex-start"
          // p={6}
          bg="gray.50"
          borderRadius="md"
          boxShadow="sm"
          gap={8}
        >
          <ProfilePictureSection />
          <AccountDetailsSection />
        </Flex>
        <h2>My Orders</h2>
        <Flex mb={20}>
          <MyOrders />
        </Flex>
      </Flex>
    </>
  );
};

export default UserProfile;
