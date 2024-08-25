import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Badge,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Link,
} from '@chakra-ui/react';
import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';
import { ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { clearCart } from '../actions/cartActions';
import logo from '../assets/images/bonsai-tree-logo.png';
import SearchBar from './SearchBar';

const withoutSidebarRoutes = ['/login', '/register'];

function NavBar() {
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
  };

  if (withoutSidebarRoutes.some(item => pathname.includes(item))) return null;

  return (
    <Box
      bg="transparent"
      px={4}
      position="fixed"
      top={0}
      width="100%"
      zIndex={10}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Left Section: Logo and Navigation Links */}
        <HStack spacing={8} alignItems="center">
          <RouterLink to="/">
            <HStack>
              <Box fontSize="xl" fontWeight="bold" color="#304732">
                BONSAI
              </Box>
              <img src={logo} alt="Bonsai logo" style={{ height: '40px' }} />
            </HStack>
          </RouterLink>

          {/* Shop Menu Button */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="gholst"
              fontWeight="bold"
              color="#304732"
              _hover={{
                bg: 'transparent',
                color: '#48bb78',
              }}
              _active={{
                bg: 'transparent',
                transform: 'scale(0.95)',
              }}
            >
              Shop
            </MenuButton>
            <MenuList boxShadow="lg" borderRadius="md">
              <MenuItem as={RouterLink} to="/plants">
                Potted Plants
              </MenuItem>
              <MenuItem as={RouterLink} to="/planters">
                Planters
              </MenuItem>
              <MenuItem as={RouterLink} to="/essentials">
                Essentials
              </MenuItem>
            </MenuList>
          </Menu>

          {/* Blog and About Links */}
          <RouterLink to="/blog">
            <Button
              variant="link"
              color="#304732"
              _hover={{ color: '#48bb78' }}
            >
              Blog
            </Button>
          </RouterLink>
          <RouterLink to="/about">
            <Button
              variant="link"
              color="#304732"
              _hover={{ color: '#48bb78' }}
            >
              About
            </Button>
          </RouterLink>
        </HStack>

        {/* Right Section: Profile, Cart, Login/Logout */}
        <Flex alignItems="center">
          <RouterLink to="/cart">
            <Box position="relative">
              <IconButton
                aria-label="Shopping Cart"
                icon={<ShoppingCart />}
                size="lg"
                variant="link"
                color="#304732"
                _hover={{
                  // bg: 'transparent',
                  bg: 'red',
                  transform: 'scale(1.05)',
                }}
                _active={{
                  bg: 'transparent',
                  transform: 'scale(0.95)',
                }}
                mr={4}
              />
              {cartItems.length > 0 && (
                <Badge
                  colorScheme="green"
                  borderRadius="full"
                  position="absolute"
                  top="0"
                  right="6"
                  transform="translate(50%, -50%)"
                  fontSize="0.8em"
                >
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </Badge>
              )}
            </Box>
          </RouterLink>

          {userInfo ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                <Avatar size="sm" />
              </MenuButton>
              <MenuList>
                <MenuItem as={RouterLink} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              as={RouterLink}
              to="/login"
              leftIcon={<FaUser />}
              variant="solid"
              colorScheme="teal"
              bgGradient="linear(to-r, teal.500, green.500)"
              color="white"
              borderRadius="full"
              boxShadow="lg"
              _hover={{
                bgGradient: 'linear(to-r, teal.600, green.600)',
                transform: 'scale(1.05)',
              }}
              _active={{
                bgGradient: 'linear(to-r, teal.700, green.700)',
                transform: 'scale(0.95)',
              }}
              ml={4}
            >
              Login
            </Button>
          )}
        </Flex>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>MENU</DrawerHeader>
          <DrawerBody>
            <SearchBar />
            <HStack
              as="nav"
              spacing={4}
              flexDirection="column"
              alignItems="start"
            >
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bgGradient="linear(to-r, teal.500, green.500)"
                  color="white"
                  borderRadius="full"
                  boxShadow="lg"
                  _hover={{
                    bgGradient: 'linear(to-r, teal.600, green.600)',
                    transform: 'scale(1.05)',
                  }}
                  _active={{
                    bgGradient: 'linear(to-r, teal.700, green.700)',
                    transform: 'scale(0.95)',
                  }}
                >
                  Shop
                </MenuButton>
                <MenuList boxShadow="lg" borderRadius="md">
                  <MenuItem as={RouterLink} to="/plants">
                    Potted Plants
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/planters">
                    Planters
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/essentials">
                    Essentials
                  </MenuItem>
                </MenuList>
              </Menu>

              <RouterLink to="/cart" onClick={onClose}>
                <Flex alignItems="center">
                  <ShoppingCart />
                  {cartItems.length > 0 && (
                    <Badge ml={2} colorScheme="red">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Flex>
              </RouterLink>

              {userInfo ? (
                <>
                  <MenuItem as={RouterLink} to="/profile" onClick={onClose}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </>
              ) : (
                <Button
                  as={RouterLink}
                  to="/login"
                  variant="outline"
                  colorScheme="teal"
                  mt={4}
                >
                  <FaUser /> Login
                </Button>
              )}
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default NavBar;
