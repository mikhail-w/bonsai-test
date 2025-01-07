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
  FormErrorMessage,
  FormHelperText,
  extendTheme,
  Box,
  Center,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/userActions';
import LoginImage from '../assets/images/b6.jpg';
import logo from '../assets/images/logo.png';

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

function LoginPage() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userLogin = useSelector(state => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    // Check when userInfo changes
    // console.log('userInfo:', userInfo);

    if (userInfo) {
      navigate(redirect); // Navigate after toast is shown
    }
  }, [userInfo, redirect, navigate, toast]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please enter both email and password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    dispatch(login(email, password));
  };

  function handleReturn() {
    navigate('/');
  }

  return (
    <>
      <ChakraProvider theme={theme}>
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
              <Center flexDirection={'column'}>
                <Image src={logo} width={50} />
                <Text fontFamily={'lato'} fontWeight={300}>
                  BONSAI
                </Text>
              </Center>
              <Heading fontFamily={'lato'} fontSize={'2xl'}>
                Sign in to your account
              </Heading>
              <form onSubmit={handleSubmit}>
                <FormControl
                  fontFamily={'lato'}
                  variant="floating"
                  mb={10}
                  id="email"
                  isRequired
                >
                  <Input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder=" "
                  />
                  <FormLabel
                    color="gray.700" // Light mode text color
                    bg="white" // Light mode background color
                    _dark={{
                      color: 'gray.200', // Dark mode text color
                      bg: 'gray.800', // Dark mode background color
                    }}
                  >
                    Email address
                  </FormLabel>
                  <FormHelperText>We'll never share your email.</FormHelperText>
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                </FormControl>

                <FormControl variant="floating" id="password" isRequired>
                  <Input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder=" "
                  />
                  <FormLabel
                    color="gray.700" // Light mode text color
                    bg="white" // Light mode background color
                    _dark={{
                      color: 'gray.200', // Dark mode text color
                      bg: 'gray.800', // Dark mode background color
                    }}
                  >
                    Password
                  </FormLabel>
                  <FormHelperText>Keep your password secure.</FormHelperText>
                  <FormErrorMessage>Password is required.</FormErrorMessage>
                </FormControl>

                <Stack spacing={6}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  ></Stack>
                  ;
                  <Button
                    colorScheme="green"
                    size="lg"
                    type="submit"
                    width="full"
                    mt={4}
                  >
                    Sign In
                  </Button>
                  <Button onClick={handleReturn}>Return</Button>
                </Stack>
              </form>
              <Text
                fontFamily={'lato'}
                textAlign="center"
                mt={4}
                color="gray.500"
              >
                New Customer?{' '}
                <Button
                  _hover={{ bg: 'gray.100' }}
                  _dark={{
                    color: 'gray.200',
                    _hover: { bg: 'gray.700' },
                  }}
                  variant="link"
                  colorScheme="green"
                >
                  <Link fontFamily={'lato'} to={'/register/'}>
                    Register
                  </Link>
                </Button>
              </Text>
            </Stack>
          </Flex>
          <Flex flex={1} display={{ base: 'none', lg: 'block' }}>
            <Image
              boxSize="100vh"
              objectFit="cover"
              alt={'Login Image'}
              src={LoginImage}
            />
          </Flex>
        </Stack>
      </ChakraProvider>
    </>
  );
}

export default LoginPage;
