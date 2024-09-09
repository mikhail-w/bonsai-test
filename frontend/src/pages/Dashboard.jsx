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
import { BiLeaf } from 'react-icons/bi';
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
  { name: 'Zen Master', icon: BiLeaf, path: '/profile/chat' },
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
        <NavItem
          key={link.path}
          icon={link.icon}
          path={link.path}
          onClose={onClose}
        >
          {link.name}
        </NavItem>
      ))}

      {/* Conditionally render the Admin section */}
      {userInfo && userInfo.isAdmin && (
        <>
          <Box position="relative" padding="10">
            <Divider borderWidth="2px" borderColor="green.500" />
            <AbsoluteCenter bg="white" px="4">
              Admin
            </AbsoluteCenter>
          </Box>

          {adminLinks.map(link => (
            <NavItem
              key={link.path}
              icon={link.icon}
              path={link.path}
              onClose={onClose}
            >
              {link.name}
            </NavItem>
          ))}
        </>
      )}
    </Box>
  );
};

// Navigation item component
const NavItem = ({ icon, children, path, onClose, ...rest }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path); // Navigate to the path
    onClose(); // Close the sidebar
  };

  return (
    <Box as="div" onClick={handleClick} style={{ textDecoration: 'none' }}>
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
    </Box>
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
