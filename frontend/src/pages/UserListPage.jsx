import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  Heading,
  Button,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listUsers, deleteUser } from '../actions/userActions';

function UserListPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector(state => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteHandler = id => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
      toast({
        title: 'User deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.lg" mt={5} minH={'80vh'}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Heading as="h1" size="lg" mb={5}>
            Users
          </Heading>
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>NAME</Th>
                  <Th>EMAIL</Th>
                  <Th>ADMIN</Th>
                  <Th>ACTIONS</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map(user => (
                  <Tr key={user._id}>
                    <Td>{user._id}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      {user.isAdmin ? (
                        <CheckIcon color="green.500" />
                      ) : (
                        <CloseIcon color="red.500" />
                      )}
                    </Td>
                    <Td>
                      <IconButton
                        as="a"
                        href={`/admin/user/${user._id}/edit`}
                        icon={<EditIcon />}
                        size="sm"
                        variant="outline"
                        aria-label="Edit User"
                        mr={2}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        variant="outline"
                        aria-label="Delete User"
                        onClick={() => deleteHandler(user._id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
}

export default UserListPage;
