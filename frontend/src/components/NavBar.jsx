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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Image,
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
import logo from '../assets/images/bonsai-logo.png';
import { motion, AnimatePresence } from 'framer-motion';

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
        <Flex justifyContent="center" marginLeft={10} flex="1">
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
        <Box display={{ base: 'block', md: 'none' }}>
          <Hamburger toggled={menuOpen} toggle={toggleMenu} />
        </Box>
      </Flex>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              overflow: 'hidden',
              width: '100vw',
              position: 'fixed',
              left: 0,
              right: 0,
              zIndex: 20,
              background: 'white',
            }}
          >
            <Box
              pb={4}
              bg={'white'}
              borderBottomRadius="lg"
              borderBottom="4px solid"
              borderColor="green.300"
            >
              <Stack mt={5} as="nav" spacing={4}>
                <Box pl={8}>
                  <SearchBar />
                </Box>

                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton pl={8}>
                      <Box
                        color={'#323232'}
                        fontFamily={'lato'}
                        fontWeight={600}
                        flex="1"
                        textAlign="left"
                        _hover={{
                          color: 'green.500',
                          textDecoration: 'underline',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Shop
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel fontFamily={'lato'} pb={4}>
                      <Stack pl={30} spacing={3} direction="column">
                        <RouterLink to="/plants">
                          <Button
                            fontWeight={300}
                            color={'#323232'}
                            variant="link"
                            _hover={{
                              color: 'green.500',
                              textDecoration: 'underline',
                              transition: 'all 0.3s ease',
                            }}
                          >
                            Potted Plants
                          </Button>
                        </RouterLink>
                        <RouterLink to="/planters">
                          <Button
                            fontWeight={300}
                            color={'#323232'}
                            variant="link"
                            _hover={{
                              color: 'green.500',
                              textDecoration: 'underline',
                              transition: 'all 0.3s ease',
                            }}
                          >
                            Planters
                          </Button>
                        </RouterLink>
                        <RouterLink to="/essentials">
                          <Button
                            fontWeight={300}
                            color={'#323232'}
                            variant="link"
                            _hover={{
                              color: 'green.500',
                              textDecoration: 'underline',
                              transition: 'all 0.3s ease',
                            }}
                          >
                            Essentials
                          </Button>
                        </RouterLink>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                <RouterLink to="/cart">
                  <Button pl={8} variant="link" id="cartLogo">
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
                      <Button
                        pl={8}
                        color={'#323232'}
                        variant="link"
                        _hover={{
                          color: 'green.500',
                          textDecoration: 'underline',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Profile
                      </Button>
                    </RouterLink>
                    <Button
                      color={'#323232'}
                      variant="link"
                      onClick={logoutHandler}
                      _hover={{
                        color: 'green.500',
                        textDecoration: 'underline',
                        transition: 'all 0.3s ease',
                      }}
                    >
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
                      <Button color={'#323232'} variant="link">
                        Users
                      </Button>
                    </RouterLink>
                    <RouterLink to="/admin/productlist">
                      <Button color={'#323232'} variant="link">
                        Products
                      </Button>
                    </RouterLink>
                    <RouterLink to="/admin/orderlist">
                      <Button color={'#323232'} variant="link">
                        Orders
                      </Button>
                    </RouterLink>
                  </>
                )}
              </Stack>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default NavBar;
