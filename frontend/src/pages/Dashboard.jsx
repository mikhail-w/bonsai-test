import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { clearCart } from '../actions/cartActions';
import { Link as RouterLink } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
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
} from '@chakra-ui/react';
import {
  FiMenu,
  FiBell,
  FiChevronDown,
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiUser,
} from 'react-icons/fi';

const LinkItems = [
  { name: 'Home', icon: FiHome, path: '/' },
  { name: 'My Info', icon: FiUser, path: '/profile/info' },
  { name: 'Trending', icon: FiTrendingUp, path: '/profile/trending' },
  { name: 'Explore', icon: FiCompass, path: '/profile/explore' },
  { name: 'Favorites', icon: FiStar, path: '/profile/favorites' },
  { name: 'Settings', icon: FiSettings, path: '/profile/settings' },
];

const SidebarContent = ({ onClose, ...rest }) => {
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
      // boxShadow="outline"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="rale" fontWeight="bold">
          BONSAI
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
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
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </RouterLink>
  );
};
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
        fontWeight="bold"
      >
        BONSAI
      </Text>
      <HStack spacing={{ base: '3', md: '6' }}>
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
                  <Text fontSize="sm" fontFamily="rale">
                    {userInfo ? userInfo.name : 'Guest'}
                  </Text>
                  {userInfo.isAdmin && (
                    <Text fontSize="xs" color="gray.600">
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
const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  // Automatically navigate to /profile/info if the path is /profile
  useEffect(() => {
    if (location.pathname === '/profile') {
      navigate('/profile/info');
    }
  }, [location, navigate]);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={onClose}
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
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      {/* Your dashboard content goes here */}
      <Box ml={{ base: 0, md: 60 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
