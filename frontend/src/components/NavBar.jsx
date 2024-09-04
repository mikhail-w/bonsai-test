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
  const [scrolled, setScrolled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <HStack spacing={8} alignItems="center">
          <HStack
            as="nav"
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
            color="black"
          >
            <Menu>
              <MenuButton
                as={Button}
                variant="link"
                cursor="pointer"
                color="black"
                fontFamily="lato"
              >
                Shop
              </MenuButton>
              <MenuList fontFamily="lato">
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
                  {`Welcome ${userInfo.name}`}
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
                <Button
                  variant="link"
                  id="login"
                  color="black"
                  fontFamily="lato"
                >
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
