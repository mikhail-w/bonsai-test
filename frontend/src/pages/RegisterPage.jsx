import {
  ChakraProvider,
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
  FormHelperText,
  extendTheme,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { register } from '../actions/userActions';
import RegisterPageImage from '../assets/images/b7.jpg';
import BackButton from '../components/BackButton';

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
};

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'white',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top',
            },
          },
        },
      },
    },
  },
});

function RegisterPage() {
  const toast = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userRegister = useSelector(state => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect, toast]);

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');

    // Input validation
    if (!name.trim()) {
      setMessage('Name is required');
      toast({
        title: 'Error',
        description: 'Please enter your name.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address');
      toast({
        title: 'Error',
        description: 'Please enter a valid email address.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      if (avatar) {
        formData.append('avatar', avatar);
      }

      // Dispatch register action with formData
      await dispatch(register(formData));
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Registration failed',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAvatarImageChange = e => {
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
      setAvatar(file);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex
          p={8}
          flex={1}
          align={'center'}
          justify={'center'}
          direction={'column'}
        >
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Register</Heading>
            <form onSubmit={handleSubmit}>
              <FormControl variant="floating" mb={10} id="name" isRequired>
                <Input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder=""
                />
                <FormLabel
                  color="gray.700"
                  bg="white"
                  _dark={{
                    color: 'gray.200',
                    bg: 'gray.800',
                  }}
                >
                  Enter your Name
                </FormLabel>
              </FormControl>
              <FormControl variant="floating" mb={10} id="email" isRequired>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder=""
                />
                <FormLabel
                  color="gray.700"
                  bg="white"
                  _dark={{
                    color: 'gray.200',
                    bg: 'gray.800',
                  }}
                >
                  Enter your Email
                </FormLabel>
              </FormControl>
              <FormControl variant="floating" mb={10} id="password" isRequired>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder=""
                />
                <FormLabel
                  color="gray.700"
                  bg="white"
                  _dark={{
                    color: 'gray.200',
                    bg: 'gray.800',
                  }}
                >
                  Enter your Password
                </FormLabel>
              </FormControl>
              <FormControl
                variant="floating"
                mb={10}
                id="passwordConfirm"
                isRequired
              >
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder=""
                />
                <FormLabel
                  color="gray.700"
                  bg="white"
                  _dark={{
                    color: 'gray.200',
                    bg: 'gray.800',
                  }}
                >
                  Confirm Password
                </FormLabel>
              </FormControl>
              <FormControl mb={10} id="profileImage">
                <FormLabel>Upload Profile Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarImageChange}
                  disabled={loading}
                />
                <FormHelperText>
                  Optional: Upload your profile image (max 5MB). Accepted
                  formats: JPEG, PNG, GIF.
                </FormHelperText>
              </FormControl>
              <Stack spacing={6}>
                <Button
                  colorScheme="green"
                  size="lg"
                  type="submit"
                  width="full"
                  mt={4}
                  isLoading={loading}
                  loadingText="Registering..."
                >
                  Register
                </Button>
                <BackButton nav={navigate} />
              </Stack>
            </form>
            <Text textAlign="center" mt={4} color="gray.500">
              Have an Account?{' '}
              <Button
                _hover={{ bg: 'gray.100' }}
                _dark={{
                  color: 'gray.200',
                  _hover: { bg: 'gray.700' },
                }}
                variant="link"
                colorScheme="green"
              >
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                  Sign In
                </Link>
              </Button>
            </Text>
          </Stack>
        </Flex>
        <Flex flex={1} display={{ base: 'none', lg: 'block' }}>
          <Image
            boxSize="100vh"
            objectFit="cover"
            alt={'Register Page Image'}
            src={RegisterPageImage}
          />
        </Flex>
      </Stack>
    </ChakraProvider>
  );
}

export default RegisterPage;
