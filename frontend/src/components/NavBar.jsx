import { useEffect, useState } from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
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
import Hamburger from 'hamburger-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { logout } from '../actions/userActions';
import { clearCart } from '../actions/cartActions';
import SearchBar from './SearchBar';
// import logo from '../assets/images/bl2.png';
import logo from '../assets/images/bonsai-logo.png';

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
      bg={scrolled ? "white" : "transparent"}
      px={4}
      py={2}
      boxShadow={scrolled ? "md" : "none"}
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
          <Box display={{ base: "none", md: "block" }}>
            <SearchBar />
          </Box>
        </HStack>

        {/* Center Section: Blog, About, Contact Us, Shop */}
        <Flex
          display={"absolute"}
          justifyContent="center"
          marginLeft={10}
          flex="1"
        >
          <HStack spacing={8} display={{ base: "none", md: "flex" }}>
            <ChakraLink
              as={RouterLink}
              to="/blog"
              fontWeight="bold"
              fontFamily="lato"
              color="gray.600"
              _hover={{
                color: "green.500",
                textDecoration: "underline",
                transition: "all 0.3s ease",
              }}
            >
              Blog
            </ChakraLink>

            <ChakraLink
              as={RouterLink}
              to="/care"
              fontWeight="bold"
              fontFamily="lato"
              color="gray.600"
              _hover={{
                color: "green.500",
                textDecoration: "underline",
                transition: "all 0.3s ease",
              }}
            >
              Care
            </ChakraLink>

            <ChakraLink
              as={RouterLink}
              to="/about"
              fontWeight="bold"
              fontFamily="lato"
              color="gray.600"
              _hover={{
                color: "green.500",
                textDecoration: "underline",
                transition: "all 0.3s ease",
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
                color: "green.500",
                textDecoration: "underline",
                transition: "all 0.3s ease",
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
                  color: "green.500",
                  textDecoration: "underline",
                  transition: "all 0.3s ease",
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
          display={{ base: "none", md: "flex" }}
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
                  size={"md"}
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
        <Box display={{ base: "block", md: "none" }}>
          <Hamburger toggled={isOpen} toggle={isOpen ? onClose : onOpen} />
        </Box>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }} bg={"white"}>
          <Stack as="nav" spacing={4}>
            <SearchBar />
            <RouterLink to="/plants">
              <Button color={"#323232"} variant="link">
                Potted Plants
              </Button>
            </RouterLink>
            <RouterLink to="/planters">
              <Button color={"#323232"} variant="link">
                Planters
              </Button>
            </RouterLink>
            <RouterLink to="/essentials">
              <Button color={"#323232"} variant="link">
                Essentials
              </Button>
            </RouterLink>
            <RouterLink to="/cart">
              <Button variant="link" id="cartLogo">
                <ShoppingCart color={"#323232"} />
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
                  <Button color={"#323232"} variant="link">
                    Profile
                  </Button>
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
                  <Button color={"#323232"} variant="link">
                    Users
                  </Button>
                </RouterLink>
                <RouterLink to="/admin/productlist">
                  <Button color={"#323232"} variant="link">
                    Products
                  </Button>
                </RouterLink>
                <RouterLink to="/admin/orderlist">
                  <Button color={"#323232"} variant="link">
                    Orders
                  </Button>
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
