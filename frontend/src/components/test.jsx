import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Searchbar.css';

function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();
    if (keyword) {
      navigate(`/products/?keyword=${keyword}&page=1`);
      setTimeout(() => e.target.reset(), 0);
      setKeyword('');
    } else {
      // navigate(location.pathname);
      navigate(`/products/?keyword=${keyword}&page=1`);
      setTimeout(() => e.target.reset(), 0);
      setKeyword('');
    }
  };

  return (
    <Form onSubmit={submitHandler} id="searchbar">
      <Form.Control
        type="text"
        name="q"
        placeholder="Search plants"
        onChange={e => setKeyword(e.target.value)}
        className="me-2"
        autoComplete="off"
      ></Form.Control>
      <Button type="submit" id="search">
        Search
      </Button>
    </Form>
  );
}

export default SearchBar;


****************************************************************************************

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
              >
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
              <Button
                variant="link"
                id="cartLogo"
                color="black"
                position="relative"
              >
                <ShoppingCart />
                <Badge
                  colorScheme="teal"
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
                >
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
        <Box pb={4} display={{ md: 'none' }} bg={'white'}>
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
                <Badge
                  colorScheme="teal"
                  borderRadius="full"
                  position="absolute"
                  top="-1"
                  right="-1"
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


*************************************Test 1**********************************

import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  HStack,
  Button,
  Image,
  useDisclosure,
  Stack,
  Badge,
  Center,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';
import Cart from '../assets/images/svgs/shopping-cart.svg';
import UserIcon from '../assets/images/svgs/user.svg';
import SearchIcon from '../assets/images/svgs/search.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { clearCart } from '../actions/cartActions';

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
    >
      <Flex
        boxShadow={'outline'}
        h={14}
        alignItems="center"
        justifyContent="space-between"
        pr={5}
      >
        <HStack spacing={8} alignItems="center">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
            _hover={{
              bg: 'transparent', // Remove background on hover
              color: 'green.500', // Change icon color to green on hover
            }}
          />
        </HStack>

        <RouterLink to="/">
          <Box
            boxShadow={'outline'}
            as="span"
            fontWeight="bold"
            fontSize="xl"
            color="black"
            ml={5}
          >
            BONSAI
          </Box>
        </RouterLink>
        <HStack spacing={4} alignItems="center">
          <RouterLink to="/login">
            <Box
              aria-label="user"
              variant="ghost"
              color="black"
              // display={{ base: 'block', md: 'none' }}
            >
              <img src={UserIcon} alt="user-icon" width={24} height={24} />
            </Box>
          </RouterLink>

          <RouterLink to="/cart">
            <Box position="relative">
              <img src={Cart} alt="cart" width={24} height={24} />
              <Badge
                colorScheme="teal"
                borderRadius="full"
                position="absolute"
                top="-20px"
                right="-15px"
                fontSize="xs"
                px={2}
                py={1}
              >
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </Badge>
            </Box>
          </RouterLink>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }} bg="white">
          <Stack as="nav" spacing={4}>
            <RouterLink to="/plants">
              <Button variant="link">Potted Plants</Button>
            </RouterLink>
            <RouterLink to="/planters">
              <Button variant="link">Planters</Button>
            </RouterLink>
            <RouterLink to="/essentials">
              <Button variant="link">Essentials</Button>
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
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

export default NavBar;
****************************OLD NAV***********************

import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchBar from './SearchBar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
// import logo from '../assets/images/logo-icon.png';
import '../assets/styles/Header.css';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import { ShoppingCart } from 'lucide-react';
import { clearCart } from '../actions/cartActions';

function Header() {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <>
      <Navbar
        expand={'md'}
        className="navbar navbar-expand-lg navbar-dark shadow-5-strong px-1"
      >
        <Container fluid id="nav">
          <LinkContainer to="/">
            <Navbar.Brand className="logo-container" id={'title-text'}>
              PLANTIS<img src={''}></img>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-md`}
            id="menu-button"
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                MENU
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <SearchBar />

              <Nav className="justify-content-end flex-grow-1 pe-3 ">
                <NavDropdown title="Shop" id="basic-nav-dropdown">
                  <LinkContainer to="/plants">
                    <NavDropdown.Item>Potted Plants</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/planters">
                    <NavDropdown.Item>Planters</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/essentials">
                    <NavDropdown.Item>Essentials</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                <LinkContainer to="/cart">
                  <Nav.Link id={'cartLogo'}>
                    <ShoppingCart />{' '}
                    {`${cartItems.reduce((acc, item) => acc + item.qty, 0)}`}
                  </Nav.Link>
                </LinkContainer>

                {userInfo ? (
                  <NavDropdown
                    title={`Welcome ${' '} ${userInfo.name}`}
                    id="username"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link id={'login'}>
                      <FaUser />
                      Login
                    </Nav.Link>
                  </LinkContainer>
                )}

                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="adminmenue">
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
