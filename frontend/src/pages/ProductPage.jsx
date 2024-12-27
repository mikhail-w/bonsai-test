import React, { useState, useEffect } from 'react';
import { Container, Box, SimpleGrid } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatchSelector } from '../hooks/useDispatchSelector';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

import BackButton from '../components/BackButton';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductImageAndButtons from '../components/Product/ProductImageAndButtons';
import ProductDetails from '../components/Product/ProductDetails';
import ProductPurchaseOptions from '../components/Product/ProductPurchaseOptions';
import ProductReviews from '../components/Product/ProductReviews';

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch, state } = useDispatchSelector();
  const { productDetails, userLogin, productReviewCreate } = state;

  useEffect(() => {
    if (productReviewCreate.success) {
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, productReviewCreate.success]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  return (
    <Container
      mt={130}
      mb={100}
      maxW="container.xl"
      py={{ base: 4, md: 10 }}
      minH="100vh"
    >
      <Box>
        {productDetails.loading ? (
          <Loader />
        ) : productDetails.error ? (
          <Message variant="danger">{productDetails.error}</Message>
        ) : (
          <Container maxW="container.xlg" py={6}>
            <Box mb={10}>
              <BackButton />
            </Box>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={10}>
              <ProductImageAndButtons
                image={productDetails.product.image}
                name={productDetails.product.name}
              />
              <ProductDetails product={productDetails.product} />
              <ProductPurchaseOptions
                product={productDetails.product}
                qty={qty}
                setQty={setQty}
                addToCartHandler={addToCartHandler}
              />
            </SimpleGrid>
            <ProductReviews
              product={productDetails.product}
              userInfo={userLogin.userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              loadingProductReview={productReviewCreate.loading}
              errorProductReview={productReviewCreate.error}
              successProductReview={productReviewCreate.success}
            />
          </Container>
        )}
      </Box>
    </Container>
  );
};

export default ProductPage;
