// import { useDispatch, useSelector } from 'react-redux';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import SearchBar from './SearchBar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import { LinkContainer } from 'react-router-bootstrap';
// import { logout } from '../actions/userActions';
// import logo from '../assets/images/bonsai-tree-logo.png';
// import '../assets/styles/Header.css';
// import { useNavigate } from 'react-router-dom';
// import { FaUser } from 'react-icons/fa6';
// import { ShoppingCart } from 'lucide-react';
// import { clearCart } from '../actions/cartActions';

// function Header() {
//   const userLogin = useSelector(state => state.userLogin);
//   const { userInfo } = userLogin;
//   const cart = useSelector(state => state.cart);
//   const { cartItems } = cart;
//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   const logoutHandler = () => {
//     dispatch(logout());
//     dispatch(clearCart());
//     navigate('/');
//   };

//   return (
//     <>
//       <Navbar
//         expand={'md'}
//         className="navbar navbar-expand-lg navbar-dark shadow-5-strong px-1"
//       >
//         <Container fluid id="nav">
//           <LinkContainer to="/">
//             <Navbar.Brand className="logo-container" id={'title-text'}>
//               BONSAI<img src={logo}></img>
//             </Navbar.Brand>
//           </LinkContainer>
//           <Navbar.Toggle
//             aria-controls={`offcanvasNavbar-expand-md`}
//             id="menu-button"
//           />
//           <Navbar.Offcanvas
//             id={`offcanvasNavbar-expand-md`}
//             aria-labelledby={`offcanvasNavbarLabel-expand-md`}
//             placement="end"
//           >
//             <Offcanvas.Header closeButton>
//               <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
//                 MENU
//               </Offcanvas.Title>
//             </Offcanvas.Header>
//             <Offcanvas.Body>
//               <SearchBar />

//               <Nav className="justify-content-end flex-grow-1 pe-3 ">
//                 <NavDropdown title="Shop" id="basic-nav-dropdown">
//                   <LinkContainer to="/plants">
//                     <NavDropdown.Item>Potted Plants</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/planters">
//                     <NavDropdown.Item>Planters</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/essentials">
//                     <NavDropdown.Item>Essentials</NavDropdown.Item>
//                   </LinkContainer>
//                 </NavDropdown>
//                 <LinkContainer to="/cart">
//                   <Nav.Link id={'cartLogo'}>
//                     <ShoppingCart />{' '}
//                     {`${cartItems.reduce((acc, item) => acc + item.qty, 0)}`}
//                   </Nav.Link>
//                 </LinkContainer>

//                 {userInfo ? (
//                   <NavDropdown
//                     title={`Welcome ${' '} ${userInfo.name}`}
//                     id="username"
//                   >
//                     <LinkContainer to="/profile">
//                       <NavDropdown.Item>Profile</NavDropdown.Item>
//                     </LinkContainer>
//                     <NavDropdown.Item onClick={logoutHandler}>
//                       Logout
//                     </NavDropdown.Item>
//                   </NavDropdown>
//                 ) : (
//                   <LinkContainer to="/login">
//                     <Nav.Link id={'login'}>
//                       <FaUser />
//                       Login
//                     </Nav.Link>
//                   </LinkContainer>
//                 )}

//                 {userInfo && userInfo.isAdmin && (
//                   <NavDropdown title="Admin" id="adminmenue">
//                     <LinkContainer to="/admin/userlist">
//                       <NavDropdown.Item>Users</NavDropdown.Item>
//                     </LinkContainer>

//                     <LinkContainer to="/admin/productlist">
//                       <NavDropdown.Item>Products</NavDropdown.Item>
//                     </LinkContainer>

//                     <LinkContainer to="/admin/orderlist">
//                       <NavDropdown.Item>Orders</NavDropdown.Item>
//                     </LinkContainer>
//                   </NavDropdown>
//                 )}
//               </Nav>
//             </Offcanvas.Body>
//           </Navbar.Offcanvas>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

// export default Header;

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
            <Button
              as={RouterLink}
              to="/login"
              variant="outline"
              colorScheme="teal"
              mr={4}
            >
              <FaUser /> Login
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
