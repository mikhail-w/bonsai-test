import React from 'react';
import { Box, Avatar, Button, Text, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

const ProfilePictureSection = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Flex
      direction={{ base: 'column' }}
      // boxShadow="outline"
      // gap={10}
      justifyContent="center"
      alignItems="center"
      // p={5}
    >
      <Box
        bg="white"
        p={6}
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
        w={{ base: '100%', md: '45%', lg: '30%' }}
        minW="300px"
      >
        <Avatar
          size="2xl"
          name={userInfo.name || 'JWT User'} // Display user's name if available
          src={`http://127.0.0.1:8000${userInfo.avatar}`}
          mb={4}
        />
        <Text fontFamily="rale" mb={2} fontWeight="500">
          Upload/Change Your Profile Image
        </Text>
        <Button colorScheme="green" variant="solid">
          Upload Avatar
        </Button>
      </Box>
    </Flex>
  );
};

export default ProfilePictureSection;
