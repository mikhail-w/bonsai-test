import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Spinner,
  Text,
  Box,
  Textarea,
  Button,
  VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import {
  getBlogPostDetails,
  createComment,
  getComments,
} from '../actions/blogActions'; // Add getComments and createComment actions
import BlogPost from '../components/BlogPost'; // Import the BlogPost component
import Comment from '../components/Comment'; // Import Comment component to display individual comments
import BackButton from '../components/BackButton';

const BlogPostPage = () => {
  const { id } = useParams(); // Get the postId from URL params
  const postId = id;
  const dispatch = useDispatch();

  const [commentContent, setCommentContent] = useState(''); // Local state to handle new comment content

  // Fetch blog post details from the Redux store
  const blogPostDetails = useSelector(state => state.blogPostDetails);
  const { loading, error, post } = blogPostDetails;

  // Fetch comments from Redux store
  const blogComments = useSelector(state => state.blogGetComments);
  const { comments } = blogComments;

  // Get user info to check if logged in
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  // Fetch the specific post and comments when the component mounts
  useEffect(() => {
    dispatch(getBlogPostDetails(postId));
    dispatch(getComments(postId)); // Fetch the comments when the page loads
  }, [dispatch, postId]);

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (userInfo) {
      dispatch(createComment(postId, commentContent)); // Dispatch action to create a comment
      setCommentContent(''); // Clear the textarea after submission
    } else {
      alert('Please log in to comment');
    }
  };

  return (
    <Container mt={130} maxW="container.md" minHeight={'100vh'} mb={100}>
      <BackButton />
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <>
          {post && <BlogPost post={post} />}

          {/* Comment Section */}
          <Box mt={50}>
            {/* <Text fontSize="2xl" fontWeight="bold">
              Comments
            </Text> */}

            {/* Show comments if there are any */}
            {comments && comments.results && comments.results.length > 0 ? (
              comments.results.map(comment => (
                <Comment key={comment.id} comment={comment} /> // Render each comment
              ))
            ) : (
              <Text>No comments yet. Be the first to comment!</Text>
            )}

            {/* Allow logged in users to submit a comment */}
            {userInfo ? (
              <VStack spacing={4} mt={6} align="stretch">
                <Textarea
                  placeholder="Do Add a comment..."
                  value={commentContent}
                  onChange={e => setCommentContent(e.target.value)}
                  size="md"
                  focusBorderColor="green.400"
                />
                <Button
                  colorScheme="green"
                  onClick={handleCommentSubmit}
                  isDisabled={!commentContent.trim()}
                >
                  Post Comment
                </Button>
              </VStack>
            ) : (
              <Text mt={6} color="gray.500">
                Please log in to add a comment.
              </Text>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default BlogPostPage;
