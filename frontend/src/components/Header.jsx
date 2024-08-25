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
import { FaUser } from 'react-icons/fa'; // Correct import for FaUser
import { ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { clearCart } from '../actions/cartActions';
import logo from '../assets/images/bonsai-tree-logo.png';
import SearchBar from './SearchBar';

function Header() {
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
        {/* Brand Logo */}
        <IconButton
          size="md"
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <RouterLink to="/">
            <HStack>
              <Box fontSize="xl" fontWeight="bold">
                BONSAI
              </Box>
              <img src={logo} alt="Bonsai logo" style={{ height: '40px' }} />
            </HStack>
          </RouterLink>
        </HStack>

        {/* Menu Section */}
        <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Shop
            </MenuButton>
            <MenuList>
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
        </HStack>

        {/* Right Section: Profile, Cart, Login/Logout */}
        <Flex alignItems="center">
          {/* Shopping Cart with Badge */}
          <RouterLink to="/cart">
            <IconButton
              aria-label="Shopping Cart"
              icon={<ShoppingCart />}
              size="lg"
              variant="outline"
              mr={4}
            />
            {cartItems.length > 0 && (
              <Badge
                colorScheme="red"
                borderRadius="full"
                position="absolute"
                top="1"
                right="1"
                fontSize="0.8em"
              >
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </Badge>
            )}
          </RouterLink>

          {/* Profile or Login/Logout */}
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
            // <Button
            //   as={RouterLink}
            //   to="/login"
            //   variant="outline"
            //   colorScheme="teal"
            //   mr={4}
            // >
            //   <FaUser /> Login
            // </Button>
            <Button
              as={Link}
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
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Shop
                </MenuButton>
                <MenuList>
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

export default Header;
