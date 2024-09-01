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
  Button,
  Heading,
  HStack,
  VStack,
  IconButton,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

function ProductListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector(state => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector(state => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector(state => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  let keyword = location.search;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    keyword,
  ]);

  const deleteHandler = id => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <Container maxW="container.lg" mt={5} minH={'100vh'}>
      <VStack align="stretch" spacing={5} p={5}>
        <HStack justify="space-between" align="center">
          <Heading as="h1" size="lg">
            Products
          </Heading>
          <Button
            leftIcon={<FaPlus />}
            colorScheme="teal"
            onClick={createProductHandler}
          >
            Create Product
          </Button>
        </HStack>

        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}

        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}

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
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>NAME</Th>
                    <Th>PRICE</Th>
                    <Th>CATEGORY</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map(product => (
                    <Tr key={product._id}>
                      <Td>{product._id}</Td>
                      <Td>{product.name}</Td>
                      <Td>${product.price}</Td>
                      <Td>{product.category}</Td>
                      <Td>
                        <HStack spacing={3}>
                          <IconButton
                            as={RouterLink}
                            to={`/admin/product/${product._id}/edit`}
                            icon={<FaEdit />}
                            colorScheme="blue"
                            variant="outline"
                            size="sm"
                            aria-label="Edit"
                          />
                          <IconButton
                            icon={<FaTrash />}
                            colorScheme="red"
                            variant="outline"
                            size="sm"
                            aria-label="Delete"
                            onClick={() => deleteHandler(product._id)}
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        )}
        <Paginate pages={pages} page={page} isAdmin={true} />
      </VStack>
    </Container>
  );
}

export default ProductListPage;
