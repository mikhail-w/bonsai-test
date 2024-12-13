import React from 'react';
import { Box, VStack, Select, Textarea, Button } from '@chakra-ui/react';

const WriteReviewForm = ({
  rating,
  setRating,
  comment,
  setComment,
  submitHandler,
  loadingProductReview,
}) => (
  <Box as="form" onSubmit={submitHandler}>
    <VStack spacing={4} align="stretch" maxW="600px" w="100%">
      <Select
        placeholder="Select rating"
        value={rating}
        onChange={e => setRating(e.target.value)}
        borderColor="gray.300"
      >
        <option value="1">1 - Poor</option>
        <option value="2">2 - Fair</option>
        <option value="3">3 - Good</option>
        <option value="4">4 - Very Good</option>
        <option value="5">5 - Excellent</option>
      </Select>
      <Textarea
        placeholder="Enter your review"
        value={comment}
        onChange={e => setComment(e.target.value)}
        borderColor="gray.300"
      />
      <Button
        type="submit"
        colorScheme="green"
        isLoading={loadingProductReview}
      >
        Submit
      </Button>
    </VStack>
  </Box>
);

export default WriteReviewForm;
