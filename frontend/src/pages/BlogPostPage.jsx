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
} from '../actions/blogActions';
import BlogPost from '../components/BlogPost';
import Comment from '../components/Comment';
import BackButton from '../components/BackButton';

const BlogPostPage = () => {
  const { id } = useParams();
  const postId = id;
  const dispatch = useDispatch();

  const [commentContent, setCommentContent] = useState('');

  const blogPostDetails = useSelector(state => state.blogPostDetails);
  const { loading, error, post } = blogPostDetails;

  const blogComments = useSelector(state => state.blogGetComments);
  const { comments, loading: commentsLoading } = blogComments;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const blogCreateComment = useSelector(state => state.blogCreateComment);
  const { success: commentSuccess } = blogCreateComment;

  useEffect(() => {
    dispatch(getBlogPostDetails(postId));
    dispatch(getComments(postId));
  }, [dispatch, postId]);

  // Re-fetch comments after successfully posting a new comment
  useEffect(() => {
    if (commentSuccess) {
      dispatch(getComments(postId)); // Refresh comments after posting
    }
  }, [commentSuccess, dispatch, postId]);

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

          <Box mt={50}>
            {/* Show comments if there are any */}
            {comments && comments.results && comments.results.length > 0 ? (
              comments.results.map(comment => (
                <Comment key={comment.id} comment={comment} /> // Render each comment
              ))
            ) : (
              <Text>No comments yet. Be the first to comment!</Text>
            )}

            {userInfo ? (
              <VStack spacing={4} mt={6} align="stretch">
                <Textarea
                  placeholder="Add a comment..."
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
