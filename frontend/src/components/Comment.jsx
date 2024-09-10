import { Box, Text } from '@chakra-ui/react';

function Comment({ comment }) {
  return (
    <Box bg="gray.100" p={3} borderRadius="md" mb={3}>
      <Text fontFamily={'lato'} fontWeight="bold" color="green.600">
        {comment.user}
      </Text>
      <Text fontFamily={'lato'}>{comment.content}</Text>
      <Text fontFamily={'lato'} fontSize="xs" color="gray.500">
        {new Date(comment.created_at).toLocaleString()}
      </Text>
    </Box>
  );
}

export default Comment;
