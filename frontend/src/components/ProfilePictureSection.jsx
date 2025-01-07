import React from 'react';
import {
  Box,
  Avatar,
  Button,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from './CustomButton';
import { cleanMediaPath } from '../utils/urlUtils';

const ProfilePictureSection = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const textColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <Flex
      direction={{ base: 'column' }}
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        p={6}
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
        w={{ base: '100%', md: '45%', lg: '30%' }}
        minW="300px"
      >
        <Avatar
          size="2xl"
          name={userInfo.name || 'User'} // Display user's name if available
          src={
            userInfo.avatar
              ? cleanMediaPath(
                  userInfo.avatar,
                  import.meta.env.VITE_API_BASE_URL
                )
              : cleanMediaPath(
                  'default/avatar.jpg',
                  import.meta.env.VITE_API_BASE_URL
                )
          }
          mb={4}
        />
        <Text fontFamily="rale" mb={2} fontWeight="500" color={textColor}>
          Upload/Change Your Profile Image
        </Text>
        <CustomButton>Upload Avatar</CustomButton>
      </Box>
    </Flex>
  );
};

export default ProfilePictureSection;
