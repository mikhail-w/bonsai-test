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
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import { ShoppingCart } from 'lucide-react';
import { logout } from '../actions/userActions';
import { clearCart } from '../actions/cartActions';
import SearchBar from './SearchBar';
import logo from '../assets/images/bonsai-tree-logo.png';

function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

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
      bg="transparent"
      px={4}
      py={2}
      boxShadow="none" // Removed shadow for full transparency
      position="relative"
      zIndex="10"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <RouterLink to="/">
            <HStack>
              <Image src={logo} alt="logo" boxSize="40px" />
              <Box as="span" fontWeight="bold" fontSize="xl" id="title-text">
                BONSAI
              </Box>
            </HStack>
          </RouterLink>
        </HStack>
        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <SearchBar />
            <Menu>
              <MenuButton as={Button} variant="link" cursor="pointer">
                Shop
              </MenuButton>
              <MenuList>
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
            <RouterLink to="/cart">
              <Button variant="link" id="cartLogo">
                <ShoppingCart />
                {` ${cartItems.reduce((acc, item) => acc + item.qty, 0)}`}
              </Button>
            </RouterLink>
            {userInfo ? (
              <Menu>
                <MenuButton as={Button} variant="link" cursor="pointer">
                  {`Welcome ${userInfo.name}`}
                </MenuButton>
                <MenuList>
                  <RouterLink to="/profile">
                    <MenuItem>Profile</MenuItem>
                  </RouterLink>
                  <MenuDivider />
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <RouterLink to="/login">
                <Button variant="link" id="login">
                  <FaUser />
                  Login
                </Button>
              </RouterLink>
            )}
            {userInfo && userInfo.isAdmin && (
              <Menu>
                <MenuButton as={Button} variant="link" cursor="pointer">
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
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            <SearchBar />
            <RouterLink to="/plants">
              <Button variant="link">Potted Plants</Button>
            </RouterLink>
            <RouterLink to="/planters">
              <Button variant="link">Planters</Button>
            </RouterLink>
            <RouterLink to="/essentials">
              <Button variant="link">Essentials</Button>
            </RouterLink>
            <RouterLink to="/cart">
              <Button variant="link" id="cartLogo">
                <ShoppingCart />
                {` ${cartItems.reduce((acc, item) => acc + item.qty, 0)}`}
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
