import { Box, Text } from '@chakra-ui/react';

function Comment({ comment }) {
  return (
    <Box bg="gray.100" p={3} borderRadius="md" mb={3}>
      <Text fontWeight="bold" color="green.600">
        {comment.user}
      </Text>
      <Text>{comment.content}</Text>
      <Text fontSize="xs" color="gray.500">
        {new Date(comment.created_at).toLocaleString()}
      </Text>
    </Box>
  );
}

export default Comment;
