import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Image,
  useDisclosure,
  Stack,
  Badge,
  Avatar,
} from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa6';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { logout } from '../actions/userActions';
import { clearCart } from '../actions/cartActions';
import SearchBar from './SearchBar';
import logo from '../assets/images/bl2.png';

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const shopMenuDisclosure = useDisclosure(); // For Shop menu hover control
  const { isOpen, onOpen, onClose } = useDisclosure(); // For mobile menu toggle
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
  };

  const withoutSidebarRoutes = ['/profile', '/login', '/register'];
  if (withoutSidebarRoutes.some(item => pathname.includes(item))) return null;

  return (
    <Box
      as="nav"
      bg={scrolled ? 'white' : 'transparent'}
      px={4}
      py={2}
      boxShadow={scrolled ? 'md' : 'none'}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex="10"
      transition="background-color 0.3s ease, box-shadow 0.3s ease"
      className="chakra-navbar"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Left Section: Logo */}
        <HStack spacing={8} alignItems="center">
          <RouterLink to="/">
            <HStack>
              <Image src={logo} alt="logo" boxSize="40px" />
              <Box
                as="span"
                fontWeight="bold"
                fontSize="xl"
                id="title-text"
                color="black"
                fontFamily="lato"
              >
                BONSAI
              </Box>
            </HStack>
          </RouterLink>
          {/* Show SearchBar only on larger screens */}
          <Box display={{ base: 'none', md: 'block' }}>
            <SearchBar />
          </Box>
        </HStack>

        {/* Center Section: Blog, About, Contact Us, Shop */}
        <Flex
          display={'absolute'}
          justifyContent="center"
          marginLeft={10}
          flex="1"
        >
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            <ChakraLink
              as={RouterLink}
              to="/blog"
              fontWeight="bold"
              fontFamily="lato"
              color="gray.600"
              _hover={{
                color: 'green.500',
                textDecoration: 'underline',
                transition: 'all 0.3s ease',
              }}
            >
              Blog
            </ChakraLink>

            <ChakraLink
              as={RouterLink}
              to="/about"
              fontWeight="bold"
              fontFamily="lato"
              color="gray.600"
              _hover={{
                color: 'green.500',
                textDecoration: 'underline',
                transition: 'all 0.3s ease',
              }}
            >
              About
            </ChakraLink>

            <ChakraLink
              as={RouterLink}
              to="/contact"
              fontWeight="bold"
              fontFamily="lato"
              color="gray.600"
              _hover={{
                color: 'green.500',
                textDecoration: 'underline',
                transition: 'all 0.3s ease',
              }}
            >
              Contact Us
            </ChakraLink>

            {/* Shop Menu with hover control */}
            <Menu isOpen={shopMenuDisclosure.isOpen}>
              <MenuButton
                as={Button}
                variant="link"
                cursor="pointer"
                color="gray.600"
                fontFamily="lato"
                onMouseEnter={shopMenuDisclosure.onOpen} // Open on hover
                onMouseLeave={shopMenuDisclosure.onClose} // Close on mouse leave
                _hover={{
                  color: 'green.500',
                  textDecoration: 'underline',
                  transition: 'all 0.3s ease',
                }}
              >
                Shop
              </MenuButton>
              <MenuList
                onMouseEnter={shopMenuDisclosure.onOpen} // Keep open when hovering over the menu
                onMouseLeave={shopMenuDisclosure.onClose} // Close when leaving the menu
                fontFamily="lato"
                boxShadow="lg"
                borderRadius="md"
                bg="white"
              >
                <RouterLink to="/plants">
                  <MenuItem>Potted Plants</MenuItem>
                </RouterLink>
                <RouterLink to="/planters">
                  <MenuItem>Planters</MenuItem>
                </RouterLink>
                <RouterLink to="/essentials">
                  <MenuItem>Essentials</MenuItem>
                </RouterLink>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>

        {/* Right Section: Cart, Login, Profile */}
        <HStack
          as="nav"
          spacing={4}
          display={{ base: 'none', md: 'flex' }}
          color="black"
        >
          <RouterLink to="/cart">
            <Button
              variant="link"
              id="cartLogo"
              color="black"
              position="relative"
            >
              <ShoppingCart />
              <Badge
                colorScheme="green"
                borderRadius="full"
                position="absolute"
                top="-3"
                right="-2"
                fontSize="xs"
                px={2}
                py={1}
              >
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </Badge>
            </Button>
          </RouterLink>

          {userInfo ? (
            <Menu>
              <MenuButton
                as={Button}
                variant="link"
                cursor="pointer"
                color="black"
                fontFamily="lato"
              >
                <Avatar
                  size={'md'}
                  src={`http://127.0.0.1:8000${userInfo.avatar}`}
                />
              </MenuButton>
              <MenuList fontFamily="lato">
                <RouterLink to="/profile">
                  <MenuItem>Profile</MenuItem>
                </RouterLink>
                <MenuDivider />
                <MenuItem fontFamily="lato" onClick={logoutHandler}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <RouterLink to="/login">
              <Button variant="link" id="login" color="black" fontFamily="lato">
                <FaUser />
                Login
              </Button>
            </RouterLink>
          )}

          {userInfo && userInfo.isAdmin && (
            <Menu>
              <MenuButton
                as={Button}
                variant="link"
                cursor="pointer"
                color="black"
                fontFamily="lato"
              >
                Admin
              </MenuButton>
              <MenuList>
                <RouterLink to="/admin/userlist">
                  <MenuItem>Users</MenuItem>
                </RouterLink>
                <RouterLink to="/admin/productlist">
                  <MenuItem>Products</MenuItem>
                </RouterLink>
                <RouterLink to="/admin/orderlist">
                  <MenuItem>Orders</MenuItem>
                </RouterLink>
              </MenuList>
            </Menu>
          )}
        </HStack>

        {/* Hamburger Icon for mobile */}
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }} bg={'white'}>
          <Stack as="nav" spacing={4}>
            <SearchBar />
            <RouterLink to="/plants">
              <Button color={'#323232'} variant="link">
                Potted Plants
              </Button>
            </RouterLink>
            <RouterLink to="/planters">
              <Button color={'#323232'} variant="link">
                Planters
              </Button>
            </RouterLink>
            <RouterLink to="/essentials">
              <Button color={'#323232'} variant="link">
                Essentials
              </Button>
            </RouterLink>
            <RouterLink to="/cart">
              <Button variant="link" id="cartLogo">
                <ShoppingCart color={'#323232'} />
                <Badge
                  colorScheme="green"
                  borderRadius="full"
                  position="absolute"
                  top="-3"
                  right="-3"
                  fontSize="xs"
                  px={2}
                  py={1}
                >
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </Badge>
              </Button>
            </RouterLink>
            {userInfo ? (
              <>
                <RouterLink to="/profile">
                  <Button variant="link">Profile</Button>
                </RouterLink>
                <Button variant="link" onClick={logoutHandler}>
                  Logout
                </Button>
              </>
            ) : (
              <RouterLink to="/login">
                <Button variant="link" id="login">
                  <FaUser />
                  Login
                </Button>
              </RouterLink>
            )}
            {userInfo && userInfo.isAdmin && (
              <>
                <RouterLink to="/admin/userlist">
                  <Button variant="link">Users</Button>
                </RouterLink>
                <RouterLink to="/admin/productlist">
                  <Button variant="link">Products</Button>
                </RouterLink>
                <RouterLink to="/admin/orderlist">
                  <Button variant="link">Orders</Button>
                </RouterLink>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

export default NavBar;


*******************************Blog***********************
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

  // This useEffect will trigger when posts are successfully loaded
  useEffect(() => {
    if (posts && posts.length > 0) {
      posts.forEach(post => {
        dispatch(likeUnlikeBlogPost(post.id));
      });
    }
  }, [dispatch, posts]);

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
    console.log('Post ID:', postId);
  };

  return (
    <Box mt={100} maxW="800px" mx="auto" py={6} px={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Text
          fontFamily={'rale'}
          fontSize="3xl"
          fontWeight="bold"
          color="green.600"
        >
          Bonsai Blog
        </Text>
        <Button
          fontFamily={'rale'}
          leftIcon={<FaPlusCircle />}
          colorScheme="green"
          variant="solid"
          onClick={() => setCreatingPost(prev => !prev)}
        >
          {creatingPost ? 'Cancel' : 'Create Post'}
        </Button>
      </Flex>

      {creatingPost && (
        <Box bg="gray.50" p={6} mb={8} borderRadius="lg" shadow="lg">
          <VStack spacing={4}>
            <Textarea
              fontFamily={'rale'}
              placeholder="What's on your mind?"
              value={content}
              onChange={e => setContent(e.target.value)}
              size="lg"
              focusBorderColor="teal.400"
            />
            <Input
              type="file"
              onChange={e => setImage(e.target.files[0])}
              accept="image/*"
              size="lg"
            />
            <Button
              fontFamily={'rale'}
              colorScheme="teal"
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
                    <Box
                      transition="transform 0.2s"
                      _hover={{ transform: 'scale(1.5)' }}
                    >
                      <Heart
                        width={24}
                        height={24}
                        active={active}
                        onClick={() => {
                          likeUnlikeHandler(post.id);
                          setActive(!active);
                        }}
                      />
                    </Box>
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


****************Nav************************

import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Image,
  useDisclosure,
  Stack,
  Badge,
  Avatar,
} from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa6';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { logout } from '../actions/userActions';
import { clearCart } from '../actions/cartActions';
import SearchBar from './SearchBar';
import logo from '../assets/images/bl2.png';

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const shopMenuDisclosure = useDisclosure(); // For Shop menu hover control
  const { isOpen, onOpen, onClose } = useDisclosure(); // For mobile menu toggle
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
  };

  const withoutSidebarRoutes = ['/profile', '/login', '/register'];
  if (withoutSidebarRoutes.some(item => pathname.includes(item))) return null;

  return (
    <Box
      as="nav"
      bg={scrolled ? 'white' : 'transparent'}
      px={4}
      py={2}
      boxShadow={scrolled ? 'md' : 'none'}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex="10"
      transition="background-color 0.3s ease, box-shadow 0.3s ease"
      className="chakra-navbar"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Left Section: Logo */}
        <HStack spacing={8} alignItems="center">
          <RouterLink to="/">
            <HStack>
              <Image src={logo} alt="logo" boxSize="40px" />
              <Box
                as="span"
                fontWeight="bold"
                fontSize="xl"
                id="title-text"
                color="black"
                fontFamily="lato"
              >
                BONSAI
              </Box>
            </HStack>
          </RouterLink>
          {/* Show SearchBar only on larger screens */}
          <Box display={{ base: 'none', md: 'block' }}>
            <SearchBar />
          </Box>
        </HStack>

        {/* Center Section: Blog, About, Contact Us, Shop */}
        <Flex
          display={'absolute'}
          justifyContent="center"
          marginLeft={10}
          flex="1"
        >
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            <ChakraLink
              as={RouterLink}
              to="/blog"
              fontWeight="bold"
              fontFamily="lato"
              color="gray.600"
              _hover={{
                color: 'green.500',
                textDecoration: 'underline',
                transition: 'all 0.3s ease',
              }}
            >
              Blog
            </ChakraLink>

            <ChakraLink
              as={RouterLink}
              to="/about"
              fontWeight="bold"
              fontFamily="lato"
              color="gray.600"
              _hover={{
                color: 'green.500',
                textDecoration: 'underline',
                transition: 'all 0.3s ease',
              }}
            >
              About
            </ChakraLink>

            <ChakraLink
              as={RouterLink}
              to="/contact"
              fontWeight="bold"
              fontFamily="lato"
              color="gray.600"
              _hover={{
                color: 'green.500',
                textDecoration: 'underline',
                transition: 'all 0.3s ease',
              }}
            >
              Contact Us
            </ChakraLink>

            {/* Shop Menu with hover control */}
            <Menu isOpen={shopMenuDisclosure.isOpen}>
              <MenuButton
                as={Button}
                variant="link"
                cursor="pointer"
                color="gray.600"
                fontFamily="lato"
                onMouseEnter={shopMenuDisclosure.onOpen} // Open on hover
                onMouseLeave={shopMenuDisclosure.onClose} // Close on mouse leave
                _hover={{
                  color: 'green.500',
                  textDecoration: 'underline',
                  transition: 'all 0.3s ease',
                }}
              >
                Shop
              </MenuButton>
              <MenuList
                onMouseEnter={shopMenuDisclosure.onOpen} // Keep open when hovering over the menu
                onMouseLeave={shopMenuDisclosure.onClose} // Close when leaving the menu
                fontFamily="lato"
                boxShadow="lg"
                borderRadius="md"
                bg="white"
              >
                <RouterLink to="/plants">
                  <MenuItem>Potted Plants</MenuItem>
                </RouterLink>
                <RouterLink to="/planters">
                  <MenuItem>Planters</MenuItem>
                </RouterLink>
                <RouterLink to="/essentials">
                  <MenuItem>Essentials</MenuItem>
                </RouterLink>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>

        {/* Right Section: Cart, Login, Profile */}
        <HStack
          as="nav"
          spacing={4}
          display={{ base: 'none', md: 'flex' }}
          color="black"
        >
          <RouterLink to="/cart">
            <Button
              variant="link"
              id="cartLogo"
              color="black"
              position="relative"
            >
              <ShoppingCart />
              <Badge
                colorScheme="green"
                borderRadius="full"
                position="absolute"
                top="-3"
                right="-2"
                fontSize="xs"
                px={2}
                py={1}
              >
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </Badge>
            </Button>
          </RouterLink>

          {userInfo ? (
            <Menu>
              <MenuButton
                as={Button}
                variant="link"
                cursor="pointer"
                color="black"
                fontFamily="lato"
              >
                <Avatar
                  size={'md'}
                  src={`http://127.0.0.1:8000${userInfo.avatar}`}
                />
              </MenuButton>
              <MenuList fontFamily="lato">
                <RouterLink to="/profile">
                  <MenuItem>Profile</MenuItem>
                </RouterLink>
                <MenuDivider />
                <MenuItem fontFamily="lato" onClick={logoutHandler}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <RouterLink to="/login">
              <Button variant="link" id="login" color="black" fontFamily="lato">
                <FaUser />
                Login
              </Button>
            </RouterLink>
          )}

          {userInfo && userInfo.isAdmin && (
            <Menu>
              <MenuButton
                as={Button}
                variant="link"
                cursor="pointer"
                color="black"
                fontFamily="lato"
              >
                Admin
              </MenuButton>
              <MenuList>
                <RouterLink to="/admin/userlist">
                  <MenuItem>Users</MenuItem>
                </RouterLink>
                <RouterLink to="/admin/productlist">
                  <MenuItem>Products</MenuItem>
                </RouterLink>
                <RouterLink to="/admin/orderlist">
                  <MenuItem>Orders</MenuItem>
                </RouterLink>
              </MenuList>
            </Menu>
          )}
        </HStack>

        {/* Hamburger Icon for mobile */}
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }} bg={'white'}>
          <Stack as="nav" spacing={4}>
            <SearchBar />
            <RouterLink to="/plants">
              <Button color={'#323232'} variant="link">
                Potted Plants
              </Button>
            </RouterLink>
            <RouterLink to="/planters">
              <Button color={'#323232'} variant="link">
                Planters
              </Button>
            </RouterLink>
            <RouterLink to="/essentials">
              <Button color={'#323232'} variant="link">
                Essentials
              </Button>
            </RouterLink>
            <RouterLink to="/cart">
              <Button variant="link" id="cartLogo">
                <ShoppingCart color={'#323232'} />
                <Badge
                  colorScheme="green"
                  borderRadius="full"
                  position="absolute"
                  top="-3"
                  right="-3"
                  fontSize="xs"
                  px={2}
                  py={1}
                >
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </Badge>
              </Button>
            </RouterLink>
            {userInfo ? (
              <>
                <RouterLink to="/profile">
                  <Button variant="link">Profile</Button>
                </RouterLink>
                <Button variant="link" onClick={logoutHandler}>
                  Logout
                </Button>
              </>
            ) : (
              <RouterLink to="/login">
                <Button variant="link" id="login">
                  <FaUser />
                  Login
                </Button>
              </RouterLink>
            )}
            {userInfo && userInfo.isAdmin && (
              <>
                <RouterLink to="/admin/userlist">
                  <Button variant="link">Users</Button>
                </RouterLink>
                <RouterLink to="/admin/productlist">
                  <Button variant="link">Products</Button>
                </RouterLink>
                <RouterLink to="/admin/orderlist">
                  <Button variant="link">Orders</Button>
                </RouterLink>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

export default NavBar;
