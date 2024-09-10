import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { getBlogPostDetails } from '../actions/blogActions';
import BlogPost from '../components/BlogPost'; // Import the BlogPost component

const BlogPostPage = () => {
  const { id } = useParams();
  const postId = id;
  const dispatch = useDispatch();

  // Fetch blog post details from the Redux store
  const blogPostDetails = useSelector(state => state.blogPostDetails);
  const { loading, error, post } = blogPostDetails;

  // Fetch the specific post when the component mounts
  useEffect(() => {
    dispatch(getBlogPostDetails(postId));
  }, [dispatch, postId]);

  return (
    <Container mt={130} maxW="container.md" minHeight={'100vh'} mb={100}>
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        post && <BlogPost post={post} />
      )}
    </Container>
  );
};

export default BlogPostPage;
