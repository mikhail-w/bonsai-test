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
  useColorModeValue,
  Center,
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { BiTrash } from 'react-icons/bi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; // Import Heart Icons
import { BiChat } from 'react-icons/bi';

import {
  listBlogPosts,
  createBlogPost,
  likeUnlikeBlogPost,
  deleteBlogPost,
} from '../actions/blogActions';
import { BLOG_POST_CREATE_RESET } from '../constants/blogConstants';
import Loader from '../components/Loader';
import { cleanMediaPath } from '../utils/urlUtils';

function BlogPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const bgColor = useColorModeValue('gray.100', 'gray.500');
  const [image, setImage] = useState(null);
  const [creatingPost, setCreatingPost] = useState(false);
  const [activeHearts, setActiveHearts] = useState({}); // Store heart state locally

  const blogList = useSelector(state => state.blogList);
  const { loading, error, posts } = blogList;

  const postLikeUnlike = useSelector(state => state.blogPostLikeUnlike);
  const { post: updatedPost } = postLikeUnlike;

  const postDelete = useSelector(state => state.blogPostDelete);
  const { success: successDelete } = postDelete;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const textColor = useColorModeValue('green.600', 'white.700');

  const blogPostCreate = useSelector(state => state.blogPostCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = blogPostCreate;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (successCreate || successDelete) {
      setContent('');
      setImage(null);
      setCreatingPost(false);
      dispatch({ type: BLOG_POST_CREATE_RESET });
    }
    dispatch(listBlogPosts());
  }, [dispatch, successCreate, successDelete]);

  const submitHandler = () => {
    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    dispatch(createBlogPost(formData));
  };

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

  const likeUnlikeHandler = postId => {
    dispatch(likeUnlikeBlogPost(postId));
  };

  const deletePostHandler = postId => {
    dispatch(deleteBlogPost(postId));
  };

  const readHandler = postId => {
    if (userInfo) {
      navigate(`/blog/${postId}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <Box
      bg={bgColor}
      mt={100}
      maxW="800px"
      mx="auto"
      px={4}
      paddingTop={'30px'}
      minHeight={'100vh'}
      mb={100}
    >
      <Flex justify="space-between" align="center" mb={6}>
        <Text
          fontFamily={'rale'}
          fontSize="3xl"
          fontWeight="bold"
          color={textColor}
        >
          Bonsai Blog
        </Text>

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
        <Box bg={bgColor} p={6} mb={8} borderRadius="lg" shadow="lg">
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
        <Center marginBottom={'50vh'}>
          <Loader />
        </Center>
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
                _hover={{ transform: 'scale(1.03)', cursor: 'pointer' }}
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
                  <Text fontFamily={'rale'} fontSize="md" color="gray.700">
                    {post.content}
                  </Text>
                  {post.image && (
                    <>
                      {console.log('Image Path:', post.image)}
                      <Image
                        src={
                          post.image
                            ? cleanMediaPath(
                                post.image,
                                import.meta.env.VITE_API_BASE_URL
                              )
                            : cleanMediaPath(
                                'default/paceholder.jpg',
                                import.meta.env.VITE_API_BASE_URL
                              )
                        }
                        alt="post"
                        borderRadius="md"
                        maxH="250px"
                        objectFit="cover"
                        w="full"
                      />
                    </>
                    //           <Image
                    //   src={(() => {
                    //     const imagePath = product.image
                    //       ? `${import.meta.env.VITE_API_BASE_URL}${product.image}`
                    //       : `${
                    //           import.meta.env.VITE_S3_PATH
                    //         }/media/default/placeholder.jpg`;
                    //     console.log(
                    //       'VITE_API_BASE_URL:',
                    //       `${import.meta.env.VITE_API_BASE_URL}${product.image}`
                    //     );
                    //     console.log('PRODUCT IMAGE: ', `${product.image}`);
                    //     return imagePath;
                    //   })()}
                    //   alt={
                    //     product.image
                    //       ? `Picture of ${product.name}`
                    //       : 'Placeholder image for product'
                    //   }
                    //   fallbackSrc={`${
                    //     import.meta.env.VITE_S3_PATH
                    //   }/media/default/placeholder.jpg`}
                    //   roundedTop="lg"
                    //   objectFit="cover"
                    //   height="300px"
                    //   width="100%"
                    //   transition="all 0.3s ease"
                    // />
                  )}
                  <HStack justify="space-between" w="full">
                    <Text fontFamily={'lato'} color="gray.500" fontSize="sm">
                      {post.likes_count} Likes
                    </Text>
                    <Text fontFamily={'lato'} color="gray.500" fontSize="sm">
                      {post.comments_count} comments
                    </Text>
                    <Text fontFamily={'lato'} color="gray.500" fontSize="sm">
                      {post.views} Views
                    </Text>
                  </HStack>

                  {userInfo && (
                    <HStack>
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
                      <Button
                        onClick={() => readHandler(post.id)}
                        flex="1"
                        variant="ghost"
                        leftIcon={<BiChat />}
                      >
                        Comment
                      </Button>
                    </HStack>
                  )}
                  {/* <Link to={`/blog/${post.id}`}> */}
                  <Button
                    onClick={() => readHandler(post.id)}
                    colorScheme="green"
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
