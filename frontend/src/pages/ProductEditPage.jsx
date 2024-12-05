import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  Heading,
  Textarea,
  useToast,
  Flex,
  Stack,
} from '@chakra-ui/react';

const API_URL = 'http://54.146.127.76:80/443/api/';

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [_type, setType] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

  const productDetails = useSelector(state => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast({ title: 'Product updated successfully!', status: 'success' });
      navigate('/admin/productlist');
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setType(product._type);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, productId, navigate, successUpdate]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        _type,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('product_id', productId);

    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(
        `${API_URL}products/upload/`,
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      toast({ title: 'Error uploading image', status: 'error' });
      setUploading(false);
    }
  };

  return (
    <Box
      w="full"
      maxW="900px"
      mx="auto"
      mt={10}
      p={6}
      bg="white"
      shadow="md"
      borderRadius="md"
    >
      <Button onClick={() => navigate(-1)} colorScheme="green" mb={6}>
        Go Back
      </Button>

      <Heading as="h1" size="lg" mb={6}>
        Edit Product
      </Heading>

      {loadingUpdate && <Spinner />}
      {errorUpdate && <Text color="red.500">{errorUpdate}</Text>}

      {loading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <form onSubmit={submitHandler}>
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormControl>

            <FormControl id="price">
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </FormControl>

            <FormControl id="image">
              <FormLabel>Image</FormLabel>
              <Input
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={e => setImage(e.target.value)}
              />
              <Input type="file" onChange={uploadFileHandler} mt={2} />
              {uploading && <Spinner />}
            </FormControl>

            <FormControl id="countInStock">
              <FormLabel>Stock</FormLabel>
              <Input
                type="number"
                placeholder="Enter stock"
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
              />
            </FormControl>

            <FormControl id="category">
              <FormLabel>Category</FormLabel>
              <Input
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
            </FormControl>

            <FormControl id="type">
              <FormLabel>Type</FormLabel>
              <Input
                type="text"
                placeholder="Enter type"
                value={_type}
                onChange={e => setType(e.target.value)}
              />
            </FormControl>

            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </FormControl>

            <Button type="submit" colorScheme="green" isFullWidth>
              Update Product
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default ProductEditPage;
