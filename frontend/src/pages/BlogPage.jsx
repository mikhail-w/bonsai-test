import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { BiTrash } from 'react-icons/bi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; // Import Heart Icons
import {
  listBlogPosts,
  createBlogPost,
  likeUnlikeBlogPost,
  deleteBlogPost,
} from '../actions/blogActions';
import { BLOG_POST_CREATE_RESET } from '../constants/blogConstants';

function BlogPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [creatingPost, setCreatingPost] = useState(false);
  const [activeHearts, setActiveHearts] = useState({});
  const toast = useToast();

  const blogList = useSelector(state => state.blogList);
  const { loading, error, posts } = blogList;

  const postLikeUnlike = useSelector(state => state.blogPostLikeUnlike);
  const { post: updatedPost } = postLikeUnlike;

  const postDelete = useSelector(state => state.blogPostDelete);
  const { success: successDelete } = postDelete;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const blogPostCreate = useSelector(state => state.blogPostCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = blogPostCreate;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (successCreate || successDelete) {
      setContent('');
      setImage(null);
      setCreatingPost(false);
      dispatch({ type: BLOG_POST_CREATE_RESET });
      dispatch(listBlogPosts());
    }
  }, [dispatch, successCreate, successDelete]);

  useEffect(() => {
    if (updatedPost) {
      setActiveHearts(prevState => ({
        ...prevState,
        [updatedPost.id]: updatedPost.is_liked,
      }));
    }
  }, [updatedPost]);

  useEffect(() => {
    if (posts) {
      const initialHearts = {};
      posts.forEach(post => {
        initialHearts[post.id] = post.is_liked;
      });
      setActiveHearts(initialHearts);
    }
  }, [posts]);

  const submitHandler = () => {
    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    dispatch(createBlogPost(formData));
    toast({
      title: 'Post created successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const likeUnlikeHandler = postId => {
    dispatch(likeUnlikeBlogPost(postId));
  };

  const deletePostHandler = postId => {
    dispatch(deleteBlogPost(postId));
    toast({
      title: 'Post deleted',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const readHandler = postId => {
    if (userInfo) {
      navigate(`/blog/${postId}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <Box mt={20} maxW="1000px" mx="auto" px={4} minHeight="100vh" mb={12}>
      <Flex justify="space-between" align="center" mb={8}>
        <Text
          fontFamily="Lato"
          fontSize="4xl"
          fontWeight="extrabold"
          color="green.700"
          textAlign="center"
        >
          Bonsai Blog
        </Text>

        {userInfo && (
          <Button
            fontFamily="Lato"
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
        <Box bg="gray.50" p={6} mb={10} borderRadius="lg" shadow="lg">
          <VStack spacing={4}>
            <Textarea
              fontFamily="Lato"
              placeholder="Share your thoughts..."
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
              fontFamily="Lato"
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
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
          {posts?.map(post => (
            <GridItem key={post.id} w="full">
              <Box
                bg="white"
                p={6}
                borderRadius="lg"
                shadow="md"
                transition="all 0.2s ease-in-out"
                _hover={{
                  transform: 'scale(1.02)',
                  shadow: 'lg',
                }}
              >
                <VStack align="start" spacing={4}>
                  <HStack justify="space-between" w="full">
                    <Text
                      fontFamily="Lato"
                      fontWeight="bold"
                      fontSize="lg"
                      color="teal.600"
                      isTruncated
                    >
                      {post.user}
                    </Text>

                    {userInfo && userInfo._id === post.user_id && (
                      <IconButton
                        variant="ghost"
                        colorScheme="red"
                        aria-label="Delete post"
                        icon={<BiTrash />}
                        onClick={() => deletePostHandler(post.id)}
                      />
                    )}
                  </HStack>

                  <Text fontFamily="Lato" fontSize="md" color="gray.700">
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
                    <Text fontFamily="Lato" color="gray.500" fontSize="sm">
                      {post.likes_count} Likes
                    </Text>
                    <Text fontFamily="Lato" color="gray.500" fontSize="sm">
                      {post.views} Views
                    </Text>
                  </HStack>

                  {userInfo && (
                    <Button
                      variant="ghost"
                      leftIcon={
                        activeHearts[post.id] ? (
                          <AiFillHeart color="red" />
                        ) : (
                          <AiOutlineHeart />
                        )
                      }
                      onClick={() => likeUnlikeHandler(post.id)}
                    >
                      {activeHearts[post.id] ? 'Unlike' : 'Like'}
                    </Button>
                  )}

                  <Button
                    onClick={() => readHandler(post.id)}
                    colorScheme="green"
                    fontFamily="Lato"
                  >
                    Read More
                  </Button>
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
