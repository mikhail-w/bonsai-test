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
  const [activeHearts, setActiveHearts] = useState({});

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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

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
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    dispatch(createBlogPost(formData));
  };

  // Update the activeHearts when the like/unlike is updated
  useEffect(() => {
    if (updatedPost) {
      setActiveHearts(prevState => ({
        ...prevState,
        [updatedPost.id]: updatedPost.is_liked,
      }));
    }
  }, [updatedPost]);

  const likeUnlikeHandler = postId => {
    dispatch(likeUnlikeBlogPost(postId));
  };

  return (
    <Box
      mt={130}
      maxW="800px"
      mx="auto"
      py={6}
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
                          active={post.is_liked}
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


import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { clearCart } from '../actions/cartActions';
import { Link as RouterLink } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import BlogIcon from '../assets/icons/blogger-alt.svg';
import { TbAugmentedReality } from 'react-icons/tb';
import { GrUserAdmin } from 'react-icons/gr';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { BsCashCoin } from 'react-icons/bs';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import Logo from '../assets/images/logo.png';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Badge,
  Button,
  Image,
  Divider,
  AbsoluteCenter,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiChevronDown,
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiUser,
} from 'react-icons/fi';

// Default public links
const defaultLinks = [
  { name: 'Home', icon: FiHome, path: '/' },
  { name: 'My Info', icon: FiUser, path: '/profile/info' },
  { name: 'Trending', icon: FiTrendingUp, path: '/profile/trending' },
  { name: 'Explore', icon: FiCompass, path: '/profile/explore' },
  { name: 'Blog', icon: BlogIcon, path: '/profile/blog' },
  { name: 'Plant ID', icon: HiOutlineViewfinderCircle, path: '/profile/id' },
  { name: 'AR', icon: TbAugmentedReality, path: '/profile/ar' },
];

// Admin links
const adminLinks = [
  { name: 'Users', icon: GrUserAdmin, path: 'admin/userlist' },
  {
    name: 'Products',
    icon: MdProductionQuantityLimits,
    path: 'admin/productlist',
  },
  { name: 'Orders', icon: BsCashCoin, path: 'admin/orderlist' },
];

// Sidebar content with user/admin section separation
const SidebarContent = ({ onClose, links, userInfo, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      fontFamily="rale"
      overflowY="auto"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image src={Logo} boxSize="50px" />
        <Text pt={6} fontSize="2xl" fontFamily="rale" fontWeight="300">
          BONSAI
        </Text>
        <CloseButton
          pt={3}
          display={{ base: 'flex', md: 'none' }}
          onClick={onClose}
        />
      </Flex>

      {links.map(link => (
        <NavItem key={link.path} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}

      {/* Conditionally render the Admin section */}
      {userInfo && userInfo.isAdmin && (
        <>
          {/* <Box mt={4} mx={4} borderTopWidth="1px" borderColor="gray.600" /> */}
          <Box position="relative" padding="10">
            <Divider borderWidth="2px" borderColor="green.500" />
            <AbsoluteCenter bg="white" px="4">
              Admin
            </AbsoluteCenter>
          </Box>

          {adminLinks.map(link => (
            <NavItem key={link.path} icon={link.icon} path={link.path}>
              {link.name}
            </NavItem>
          ))}
        </>
      )}
    </Box>
  );
};

// Navigation item component
const NavItem = ({ icon, children, path, ...rest }) => {
  return (
    <RouterLink to={path} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'green.300',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Box
            as={typeof icon === 'string' ? 'div' : 'div'}
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
          >
            {typeof icon === 'string' ? (
              <Image src={icon} alt={children} boxSize="16px" />
            ) : (
              <Icon as={icon} />
            )}
          </Box>
        )}
        {children}
      </Flex>
    </RouterLink>
  );
};

// Mobile navigation component
const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="rale"
        fontWeight="300"
        pt={5}
        pl={4}
      >
        BONSAI
      </Text>

      <HStack spacing={{ base: '3', md: '6' }}>
        {userInfo == null || !userInfo.isAdmin ? (
          <RouterLink to="/cart">
            <Button
              variant="link"
              id="cartLogo"
              color="black"
              pt={3}
              position="relative"
            >
              <ShoppingCart />
              <Badge
                colorScheme="green"
                borderRadius="full"
                position="absolute"
                top="0"
                right="-2"
                fontSize="xs"
                px={2}
                py={1}
              >
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </Badge>
            </Button>
          </RouterLink>
        ) : null}
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack alignItems={'end'}>
                <Avatar
                  size={'md'}
                  src={`http://127.0.0.1:8000${userInfo.avatar}`}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  {!userInfo.isAdmin ? (
                    <Text fontSize="sm" fontFamily="lato">
                      {userInfo ? userInfo.name : 'Guest'}
                    </Text>
                  ) : null}

                  {userInfo.isAdmin && (
                    <Text fontFamily="lato" fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  )}
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
              <MenuItem onClick={() => navigate('/cart')}>
                Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </MenuItem>
              <MenuDivider />
              {userInfo ? (
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              ) : (
                <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

// Main Dashboard component
const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [links, setLinks] = useState(defaultLinks); // Store public + admin links

  useEffect(() => {
    // Reset to default links when user is not an admin
    setLinks(defaultLinks);
  }, [userInfo]);

  // Automatically navigate to /profile/info if the path is /profile
  useEffect(() => {
    if (location.pathname === '/profile') {
      userInfo.isAdmin ? navigate('admin/userlist') : navigate('/profile/info');
    }
  }, [location, navigate]);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={onClose}
        links={links} // Pass the links dynamically
        userInfo={userInfo} // Pass userInfo to handle admin check
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} links={links} userInfo={userInfo} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
