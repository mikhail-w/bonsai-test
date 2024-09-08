import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
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
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listOrders } from '../actions/orderActions';
import Footer from '../components/Footer';

function OrderListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector(state => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <>
      <Container maxW="container.lg" mt={5} minH={'100vh'}>
        <Heading fontFamily={'lato'} as="h1" size="lg" mb={5}>
          Orders
        </Heading>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Box
            maxH="500px"
            overflowY="auto"
            overflowX="auto"
            border="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            rounded="md"
          >
            <TableContainer>
              <Table variant="striped" colorScheme="green">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>USER</Th>
                    <Th>DATE</Th>
                    <Th>TOTAL</Th>
                    <Th>PAID</Th>
                    <Th>DELIVERED</Th>
                    <Th>DETAILS</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orders.map(order => (
                    <Tr key={order._id}>
                      <Td>{order._id}</Td>
                      <Td>{order.user && order.user.name}</Td>
                      <Td>{order.createdAt.substring(0, 10)}</Td>
                      <Td>${order.totalPrice}</Td>
                      <Td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <Icon as={FaTimes} color="red.500" />
                        )}
                      </Td>
                      <Td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <Icon as={FaTimes} color="red.500" />
                        )}
                      </Td>
                      <Td>
                        <Button
                          as={RouterLink}
                          to={`/order/${order._id}`}
                          size="sm"
                          variant="outline"
                          colorScheme="teal"
                        >
                          Details
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Container>
    </>
  );
}

export default OrderListPage;
