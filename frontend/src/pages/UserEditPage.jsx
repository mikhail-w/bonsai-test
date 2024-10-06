import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

function UserEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/profile/admin/userlist');
    } else {
      if (!user.name || user._id !== Number(userId)) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, userId, successUpdate, navigate, dispatch]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
  };

  return (
    <Box>
      <Link to="/profile/admin/userlist">Go Back</Link>

      <FormContainer>
        <Heading as="h1" mb={4}>
          Edit User
        </Heading>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Box as="form" onSubmit={submitHandler} mt={4}>
            <VStack spacing={4} align="stretch">
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </FormControl>

              <FormControl id="email">
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="isadmin">
                <Checkbox
                  isChecked={isAdmin}
                  onChange={e => setIsAdmin(e.target.checked)}
                >
                  Is Admin
                </Checkbox>
              </FormControl>

              <Button type="submit" colorScheme="blue" mt={4}>
                Update
              </Button>
            </VStack>
          </Box>
        )}
      </FormContainer>
    </Box>
  );
}

export default UserEditPage;
