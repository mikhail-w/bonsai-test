import React from 'react';
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Message from '../Message';
import Rating from '../Rating';
import WriteReviewForm from './WriteReviewForm';

const ProductReviews = ({
  product,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  loadingProductReview,
  errorProductReview,
  successProductReview,
}) => (
  <Box mt={50}>
    <Heading as="h4" size="md" mb={4}>
      Reviews
    </Heading>
    {product.reviews.length === 0 ? (
      <Box w="100%" display="flex" justifyContent="center" maxW="600px" mb={10}>
        <Message variant="info" w="100%" textAlign="center">
          No Reviews
        </Message>
      </Box>
    ) : (
      <VStack spacing={4} align="left" maxW="600px" w="100%">
        {product.reviews.map(review => (
          <Box
            key={review._id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
          >
            <VStack align="start" spacing={2}>
              <Flex justify="space-between" w="full">
                <Text fontWeight="bold">{review.name}</Text>
                <Rating value={review.rating} color="#008b4a" />
              </Flex>
              <Text fontSize="sm">{review.createdAt.substring(0, 10)}</Text>
              <Text>{review.comment}</Text>
            </VStack>
          </Box>
        ))}
      </VStack>
    )}
    {userInfo ? (
      <WriteReviewForm
        rating={rating}
        setRating={setRating}
        comment={comment}
        setComment={setComment}
        submitHandler={submitHandler}
        loadingProductReview={loadingProductReview}
      />
    ) : (
      <Message variant="info">Please log in to write a review</Message>
    )}
  </Box>
);

export default ProductReviews;
