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
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const handleSubmit = e => {
    e.preventDefault();
    if (password.trim() !== confirmPassword.trim()) {
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
    dispatch(register(name, email, password, avatar));
    toast({
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAvatarImageChange = e => {
    setAvatar(e.target.files[0]);
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
                <FormLabel>Enter your Name</FormLabel>
              </FormControl>
              <FormControl variant="floating" mb={10} id="email" isRequired>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder=""
                />
                <FormLabel>Enter your Email</FormLabel>
              </FormControl>
              <FormControl variant="floating" mb={10} id="password" isRequired>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder=""
                />
                <FormLabel>Enter your Password</FormLabel>
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
                <FormLabel>Confirm Password</FormLabel>
              </FormControl>
              <FormControl variant="floating" mb={10} id="city" isRequired>
                <Input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder=""
                />
                <FormLabel>Enter your City</FormLabel>
              </FormControl>
              <FormControl variant="floating" mb={10} id="state" isRequired>
                <Input
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  placeholder=""
                />
                <FormLabel>Enter your State</FormLabel>
              </FormControl>
              <FormControl mb={10} id="profileImage">
                <FormLabel>Upload Profile Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarImageChange}
                />
                <FormHelperText>
                  Optional: Upload your profile image.
                </FormHelperText>
              </FormControl>
              <Stack spacing={6}>
                <Button
                  colorScheme="green"
                  size="lg"
                  type="submit"
                  width="full"
                  mt={4}
                >
                  Register
                </Button>
                <BackButton nav={navigate} />
              </Stack>
            </form>
            <Text textAlign="center" mt={4} color="gray.500">
              Have an Account?{' '}
              <Button variant="link" colorScheme="green">
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
