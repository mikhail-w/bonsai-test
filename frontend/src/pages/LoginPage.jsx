import {
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
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/userActions';
import BackButton from '../components/BackButton';
import LoginImage from '../assets/images/b6.jpg';

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
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect]);

  const handleSubmit = e => {
    console.log('Email', email);
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
    console.log('Submitted');
    dispatch(login(email, password));
  };
  return (
    <>
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
            <Heading fontSize={'2xl'}>Sign in to your account</Heading>
            <form onSubmit={handleSubmit}>
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
                  Sign In
                </Button>
                <BackButton nav={navigate} />
              </Stack>
            </form>
            <Text textAlign="center" mt={4} color="gray.500">
              New Customer?{' '}
              <Button variant="link" colorScheme="green">
                <Link to={'/register/'}>Register</Link>
              </Button>
            </Text>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            boxSize="100vh"
            objectFit="cover"
            alt={'Login Image'}
            src={LoginImage}
          />
        </Flex>
      </Stack>
    </>
  );
}
export default LoginPage;
