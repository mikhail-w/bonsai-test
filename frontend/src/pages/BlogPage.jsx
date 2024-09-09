import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  HStack,
  Input,
  Image,
  Textarea,
  Spinner,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import Heart from '@react-sandbox/heart';
import {
  listBlogPosts,
  createBlogPost,
  likeUnlikeBlogPost,
} from '../actions/blogActions';
import { BLOG_POST_CREATE_RESET } from '../constants/blogConstants';

function BlogPage() {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [creatingPost, setCreatingPost] = useState(false);
  const [activeHearts, setActiveHearts] = useState({}); // Store heart state locally

  const blogList = useSelector(state => state.blogList);
  const { loading, error, posts } = blogList;

  const postLikeUnlike = useSelector(state => state.blogPostLikeUnlike);
  const { post: updatedPost } = postLikeUnlike;

  // Check if the user is authenticated from the Redux state
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const blogPostCreate = useSelector(state => state.blogPostCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = blogPostCreate;

  // Scroll to the top on mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // Fetch blog posts and reset the form after post creation
  useEffect(() => {
    if (successCreate) {
      setContent('');
      setImage(null);
      setCreatingPost(false);
      dispatch({ type: BLOG_POST_CREATE_RESET });
    }
    dispatch(listBlogPosts());
  }, [dispatch, successCreate]);

  // Submit new post
  const submitHandler = () => {
    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    dispatch(createBlogPost(formData));
  };

  // Update heart states after liking/unliking a post
  useEffect(() => {
    if (updatedPost) {
      setActiveHearts(prevState => ({
        ...prevState,
        [updatedPost.id]: updatedPost.is_liked,
      }));
    }
  }, [updatedPost]);

  // Initialize heart states when posts are loaded
  useEffect(() => {
    if (posts) {
      const initialHearts = {};
      posts.forEach(post => {
        initialHearts[post.id] = post.is_liked;
      });
      setActiveHearts(initialHearts);
    }
  }, [posts]);

  // Like/unlike handler
  const likeUnlikeHandler = postId => {
    dispatch(likeUnlikeBlogPost(postId));
  };

  return (
    <Box
      mt={100}
      maxW="800px"
      mx="auto"
      // py={6}
      px={4}
      minHeight={'100vh'}
      mb={100}
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Text
          fontFamily={'rale'}
          fontSize="3xl"
          fontWeight="bold"
          color="green.600"
        >
          Bonsai Blog
        </Text>

        {/* Render the "Create Post" button only if the user is logged in */}
        {userInfo && (
          <Button
            fontFamily={'rale'}
            leftIcon={<FaPlusCircle />}
            colorScheme="green"
            variant="solid"
            onClick={() => setCreatingPost(prev => !prev)}
          >
            {creatingPost ? 'Cancel' : 'Create Post'}
          </Button>
        )}
      </Flex>

      {creatingPost && userInfo && (
        <Box bg="gray.50" p={6} mb={8} borderRadius="lg" shadow="lg">
          <VStack spacing={4}>
            <Textarea
              fontFamily={'rale'}
              placeholder="What's on your mind?"
              value={content}
              onChange={e => setContent(e.target.value)}
              size="lg"
              focusBorderColor="green.400"
            />
            <Input
              type="file"
              onChange={e => setImage(e.target.files[0])}
              accept="image/*"
              size="lg"
            />
            <Button
              fontFamily={'rale'}
              colorScheme="green"
              onClick={submitHandler}
              isLoading={loadingCreate}
              w="full"
            >
              Post
            </Button>
            {errorCreate && <Text color="red.500">{errorCreate}</Text>}
          </VStack>
        </Box>
      )}

      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
          {posts?.map(post => (
            <GridItem key={post.id} w="full">
              <Box
                bg="white"
                p={6}
                borderRadius="lg"
                shadow="lg"
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.03)' }}
              >
                <VStack align="start" spacing={4}>
                  <HStack justify="space-between" w="full">
                    <Text
                      fontFamily={'rale'}
                      fontWeight="bold"
                      fontSize="lg"
                      color="teal.600"
                      isTruncated
                    >
                      {post.user}
                    </Text>

                    {/* Render the like button only if the user is logged in */}
                    {userInfo && (
                      <Box
                        transition="transform 0.2s"
                        _hover={{ transform: 'scale(1.5)' }}
                      >
                        <Heart
                          width={24}
                          height={24}
                          active={activeHearts[post.id]} // Use activeHearts state
                          onClick={() => likeUnlikeHandler(post.id)}
                        />
                      </Box>
                    )}
                  </HStack>
                  <Text fontFamily={'rale'} fontSize="md" color="gray.700">
                    {post.content}
                  </Text>
                  {post.image && (
                    <Image
                      src={post.image}
                      alt="post"
                      borderRadius="md"
                      maxH="250px"
                      objectFit="cover"
                      w="full"
                    />
                  )}
                  <HStack justify="space-between" w="full">
                    <Text fontFamily={'rale'} color="gray.500" fontSize="sm">
                      {post.likes_count} Likes
                    </Text>
                    <Text fontFamily={'rale'} color="gray.500" fontSize="sm">
                      {post.views} Views
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default BlogPage;
