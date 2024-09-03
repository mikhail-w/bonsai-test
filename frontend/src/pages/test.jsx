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
  IconButton,
  Spinner,
} from '@chakra-ui/react';
import { FaHeart, FaRegHeart, FaPlusCircle } from 'react-icons/fa';
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
  const [active, setActive] = useState(false);

  const blogList = useSelector(state => state.blogList);
  const { loading, error, posts } = blogList;

  const blogPostCreate = useSelector(state => state.blogPostCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = blogPostCreate;

  useEffect(() => {
    if (successCreate) {
      setContent('');
      setImage(null);
      setCreatingPost(false);
      dispatch({ type: BLOG_POST_CREATE_RESET });
    }
    dispatch(listBlogPosts());
  }, [dispatch, successCreate]);

  const submitHandler = () => {
    const formData = new FormData();
    formData.append('content', content); // Append content as a string
    if (image) {
      formData.append('image', image); // Append image if it exists
    }
    dispatch(createBlogPost(formData)); // Dispatch FormData
  };

  const likeUnlikeHandler = postId => {
    dispatch(likeUnlikeBlogPost(postId));
  };

  return (
    <Box maxW="1200px" mx="auto" py={6} px={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="3xl" fontWeight="bold" fontFamily="heading">
          Bonsai Blog
        </Text>
        <Button
          leftIcon={<FaPlusCircle />}
          colorScheme="green"
          onClick={() => setCreatingPost(prev => !prev)}
        >
          {creatingPost ? 'Cancel' : 'Create Post'}
        </Button>
      </Flex>

      {creatingPost && (
        <Box bg="gray.50" p={4} mb={6} borderRadius="md" shadow="md">
          <VStack spacing={4}>
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <Input
              type="file"
              onChange={e => setImage(e.target.files[0])}
              accept="image/*"
            />
            <Button
              colorScheme="green"
              onClick={submitHandler}
              isLoading={loadingCreate}
            >
              Post
            </Button>
            {errorCreate && <Text color="red.500">{errorCreate}</Text>}
          </VStack>
        </Box>
      )}

      {loading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <VStack spacing={6}>
          {posts?.results?.map(post => (
            <Box
              key={post.id}
              w="full"
              bg="white"
              p={4}
              borderRadius="md"
              shadow="md"
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.02)' }}
            >
              <VStack align="start" spacing={4}>
                <HStack justify="space-between" w="full">
                  <Text fontWeight="bold" fontSize="lg" isTruncated>
                    {post.user}
                  </Text>
                  <Box
                    transition="transform 0.2s"
                    _hover={{ transform: 'scale(1.5)' }}
                  >
                    <Heart
                      width={24}
                      height={24}
                      active={active}
                      onClick={() => setActive(!active)}
                    />
                  </Box>
                </HStack>
                <Text>{post.content}</Text>
                {post.image && (
                  <Image
                    src={post.image}
                    alt="post"
                    borderRadius="md"
                    maxH="400px"
                    objectFit="cover"
                  />
                )}
                <HStack justify="space-between" w="full">
                  <Text color="gray.500">{post.likes_count} Likes</Text>
                  <Text color="gray.500">{post.views} Views</Text>
                </HStack>
              </VStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default BlogPage;
******************************************************
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

  const blogList = useSelector(state => state.blogList);
  const { loading, error, posts } = blogList;

  const blogPostCreate = useSelector(state => state.blogPostCreate);
  const {blogLike} = useSelector(state => state.blogPostLikeUnlike);

  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = blogPostCreate;

  useEffect(() => {
    if (successCreate) {
      setContent('');
      setImage(null);
      setCreatingPost(false);
      dispatch({ type: BLOG_POST_CREATE_RESET });
    }
    dispatch(listBlogPosts());
  }, [dispatch, successCreate]);

  const submitHandler = () => {
    const formData = new FormData();
    formData.append('content', content); // Append content as a string
    if (image) {
      formData.append('image', image); // Append image if it exists
    }
    dispatch(createBlogPost(formData)); // Dispatch FormData
  };

  const likeUnlikeHandler = (postId, isCurrentlyLiked, setLiked) => {
    dispatch(likeUnlikeBlogPost(postId)).then(() => {
      // Toggle the local liked state
      setLiked(!isCurrentlyLiked);
      // Optionally, you can re-fetch posts to get the updated data from the server
      // dispatch(listBlogPosts());
    });
  };

  return (
    <Box maxW="1200px" mx="auto" py={6} px={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="3xl" fontWeight="bold" fontFamily="heading">
          Bonsai Blog
        </Text>
        <Button
          leftIcon={<FaPlusCircle />}
          colorScheme="green"
          onClick={() => setCreatingPost(prev => !prev)}
        >
          {creatingPost ? 'Cancel' : 'Create Post'}
        </Button>
      </Flex>

      {creatingPost && (
        <Box bg="gray.50" p={4} mb={6} borderRadius="md" shadow="md">
          <VStack spacing={4}>
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <Input
              type="file"
              onChange={e => setImage(e.target.files[0])}
              accept="image/*"
            />
            <Button
              colorScheme="green"
              onClick={submitHandler}
              isLoading={loadingCreate}
            >
              Post
            </Button>
            {errorCreate && <Text color="red.500">{errorCreate}</Text>}
          </VStack>
        </Box>
      )}

      {loading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <VStack spacing={6}>
          {posts?.results?.map(post => {
            const [liked, setLiked] = useState(post.is_liked);

            return (
              <Box
                key={post.id}
                w="full"
                bg="white"
                p={4}
                borderRadius="md"
                shadow="md"
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.02)' }}
              >
                <VStack align="start" spacing={4}>
                  <HStack justify="space-between" w="full">
                    <Text fontWeight="bold" fontSize="lg" isTruncated>
                      {post.user}
                    </Text>
                    <Box
                      transition="transform 0.2s"
                      _hover={{ transform: 'scale(1.5)' }}
                    >
                      <Heart
                        width={24}
                        height={24}
                        active={liked}
                        onClick={() => {
                          likeUnlikeHandler(post.id, liked, setLiked);
                        }}
                      />
                    </Box>
                  </HStack>
                  <Text>{post.content}</Text>
                  {post.image && (
                    <Image
                      src={post.image}
                      alt="post"
                      borderRadius="md"
                      maxH="400px"
                      objectFit="cover"
                    />
                  )}
                  <HStack justify="space-between" w="full">
                    <Text color="gray.500">{post.likes_count + (liked ? 1 : 0)} Likes</Text>
                    <Text color="gray.500">{post.views} Views</Text>
                  </HStack>
                </VStack>
              </Box>
            );
          })}
        </VStack>
      )}
    </Box>
  );
}

export default BlogPage;
