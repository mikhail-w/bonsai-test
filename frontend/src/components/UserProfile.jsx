import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import ProfilePictureSection from './ProfilePictureSection';
import AccountDetailsSection from './AccountDetailsSection';

const UserProfile = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      align="flex-start"
      p={6}
      bg="gray.50"
      borderRadius="md"
      boxShadow="sm"
      gap={8}
    >
      <ProfilePictureSection />
      <AccountDetailsSection />
    </Flex>
  );
};

export default UserProfile;
