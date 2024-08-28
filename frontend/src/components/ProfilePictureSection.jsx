import React from 'react';
import { Box, Avatar, Button, VStack, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

const ProfilePictureSection = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="md"
      boxShadow="sm"
      textAlign="center"
      w={{ base: '100%', md: '30%' }}
      maxW="300px"
    >
      <Avatar
        size="2xl"
        name="JWT User"
        src={`http://127.0.0.1:8000${userInfo.avatar}`}
        mb={4}
      />
      <Text mb={2}>Upload/Change Your Profile Image</Text>
      <Button colorScheme="blue" variant="solid">
        Upload Avatar
      </Button>
    </Box>
  );
};

export default ProfilePictureSection;
