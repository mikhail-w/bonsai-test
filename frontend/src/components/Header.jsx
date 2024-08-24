import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchBar from './SearchBar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import logo from '../assets/images/logo-icon.png';
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
              PLANTIS<img src={logo}></img>
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
