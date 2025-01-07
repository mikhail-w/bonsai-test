import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../actions/userActions';
import {
  Box,
  Avatar,
  Button,
  Text,
  Flex,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  VStack,
  useToast,
  Image,
} from '@chakra-ui/react';
import { cleanMediaPath } from '../utils/urlUtils';

const ProfileUpdateSection = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const fileInputRef = useRef();

  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onClose: onDetailsClose,
  } = useDisclosure();
  const {
    isOpen: isAvatarOpen,
    onOpen: onAvatarOpen,
    onClose: onAvatarClose,
  } = useDisclosure();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [name, setName] = useState(userInfo?.name || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.300');

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: 'Error',
          description: 'Please upload a valid image file (JPEG, PNG, or GIF)',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Error',
          description: 'Image size should be less than 5MB',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
      setAvatarFile(file);
    }
  };

  const handleSubmitAvatar = async () => {
    if (!avatarFile) {
      toast({
        title: 'Error',
        description: 'Please select an image to upload',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    formData.append('email', userInfo.email);
    formData.append('name', userInfo.name);

    try {
      await dispatch(updateUserProfile(formData));
      toast({
        title: 'Success',
        description: 'Profile picture updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Cleanup preview URL
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }

      setAvatarFile(null);
      setAvatarPreview(null);
      onAvatarClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile picture',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitDetails = async () => {
    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const userData = {
        name,
        email,
        ...(password && { password }),
      };

      await dispatch(updateUserProfile(userData));
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onDetailsClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Cleanup preview URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  return (
    <Flex direction="column" alignItems="center" gap={4}>
      <Box
        bg={bgColor}
        p={6}
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
        w={{ base: '100%', md: '45%', lg: '30%' }}
        minW="300px"
      >
        <Avatar
          size="2xl"
          name={userInfo?.name || 'User'}
          src={
            userInfo?.avatar
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
        <VStack spacing={4}>
          <Button
            colorScheme="green"
            onClick={onAvatarOpen}
            isLoading={isLoading}
          >
            Upload Avatar
          </Button>
          <Button
            colorScheme="blue"
            onClick={onDetailsOpen}
            isLoading={isLoading}
          >
            Change Details
          </Button>
        </VStack>
      </Box>

      {/* Avatar Upload Modal */}
      <Modal isOpen={isAvatarOpen} onClose={onAvatarClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Profile Picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              {avatarPreview && (
                <Box boxSize="200px" mx="auto">
                  <Image
                    src={avatarPreview}
                    alt="Avatar preview"
                    borderRadius="full"
                    boxSize="100%"
                    objectFit="cover"
                  />
                </Box>
              )}

              <FormControl>
                <FormLabel>Select Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  ref={fileInputRef}
                />
                <Text fontSize="sm" color="gray.500" mt={2}>
                  Max size: 5MB. Accepted formats: JPEG, PNG, GIF
                </Text>
              </FormControl>

              <Button
                colorScheme="blue"
                onClick={handleSubmitAvatar}
                isLoading={isLoading}
                w="100%"
              >
                Upload
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Profile Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={onDetailsClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </FormControl>

              <FormControl>
                <FormLabel>New Password (optional)</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </FormControl>

              <Button
                colorScheme="blue"
                onClick={handleSubmitDetails}
                w="100%"
                isLoading={isLoading}
              >
                Update Profile
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ProfileUpdateSection;
