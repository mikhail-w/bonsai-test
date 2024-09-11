import React, { useState, useEffect } from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Icon,
  Box,
  Spinner,
  Alert,
  AlertIcon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
import Loader from '../components/Loader';

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector(state => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector(state => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(listMyOrders());
    }
  }, []);

  return (
    <Box w="100%">
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Alert status="error">
          <AlertIcon />
          {errorOrders}
        </Alert>
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
            <Table variant="striped" size="sm" colorScheme="green">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Date</Th>
                  <Th>Total</Th>
                  <Th>Paid</Th>
                  <Th>Delivered</Th>
                  <Th>Details</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map(order => (
                  <Tr key={order._id}>
                    <Td>{order._id}</Td>
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
                        size="sm"
                        colorScheme="green"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(`/profile/order/${order._id}`);
                        }}
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
    </Box>
  );
};

export default MyOrders;
