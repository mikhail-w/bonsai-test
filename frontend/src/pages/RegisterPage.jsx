import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { register } from '../actions/userActions';
import '../assets/styles/LogPages.css';
import ResgisterPageImage from '../assets/images/b7.jpg';
import BackButton from '../components/BackButton';

function RegisterPage() {
  const toast = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userRegister = useSelector(state => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const handleSubmit = e => {
    console.log('Email', email);
    e.preventDefault();
    if (password != confirmPassword) {
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
    dispatch(register(name, email, password));
  };

  return (
    <>
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
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <form onSubmit={handleSubmit}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </FormControl>
              <FormControl id="passwordConfirm" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
              </FormControl>
              <FormControl id="city" isRequired>
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="Enter your city"
                />
              </FormControl>
              <FormControl id="state" isRequired>
                <FormLabel>State</FormLabel>
                <Input
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  placeholder="Enter your state"
                />
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                ></Stack>
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
        <Flex flex={1}>
          <Image
            boxSize="100vh"
            objectFit="cover"
            alt={'Login Image'}
            src={ResgisterPageImage}
          />
        </Flex>
      </Stack>
    </>
  );
}
export default RegisterPage;
