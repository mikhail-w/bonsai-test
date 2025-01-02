// components/Navigation/Navigation.jsx
import { useEffect, useRef, useState } from 'react';
import { Box, Flex, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import { clearCart } from '../../actions/cartActions';
import SearchBar from '../SearchBar';
import logo from '../../assets/images/logo.png';
import logoWhite from '../../assets/images/logo_white.png';
import ColorModeSwitcher from '../ColorModeSwitcher';
import { Logo, Menu, NavLinks, UserAvatar } from '@components/Navigation';
import { getLinkPosition } from '@utils';
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaBlog,
  FaShoppingCart,
  FaStore,
} from 'react-icons/fa';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCircleAnimationDone, setIsCircleAnimationDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState('default');
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const toast = useToast();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const handleLinkClick = () => setIsOpen(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsCircleAnimationDone(false);
      setTimeout(() => setIsCircleAnimationDone(true), 800);
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    setIsOpen(false);
    navigate('/');
    toast({
      title: 'User has Logged Out',
      status: 'info',
      isClosable: true,
      duration: 3000,
    });
  };

  const navLinks = [
    userInfo
      ? { label: 'Logout', action: logoutHandler, icon: FaSignOutAlt }
      : { label: 'Login', url: '/login', icon: FaSignInAlt },
    { label: 'Blog', url: 'blog', icon: FaBlog },
    { label: 'Cart', url: '/cart', icon: FaShoppingCart },
    { label: 'Shop', url: '/products', icon: FaStore },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoSrc = pathname === '/' && !scrolled ? logoWhite : logo;

  return (
    <Box ref={menuRef}>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1.5rem"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="20"
        width="100%"
        bg={scrolled ? 'white' : 'transparent'}
        boxShadow={scrolled ? 'md' : 'none'}
      >
        <Logo logoSrc={logoSrc} />
        <Menu
          isOpen={isOpen}
          toggleMenu={toggleMenu}
          hoveredLink={hoveredLink}
          linkColors={{ default: 'green' }}
        >
          <UserAvatar
            userInfo={userInfo}
            isOpen={isOpen}
            isCircleAnimationDone={isCircleAnimationDone}
          />
          <NavLinks
            navLinks={navLinks}
            isOpen={isOpen}
            handleLinkClick={handleLinkClick}
            cartItems={cartItems}
            getLinkPosition={getLinkPosition}
          />
          {/* Render SearchBar and ColorModeSwitcher only when the menu is open */}
          {/* Positioning SearchBar */}
          {isOpen && (
            <Box
              position="absolute"
              top="0%"
              right="300%"
              zIndex="100"
              width={'200px'}
              p={2}
            >
              <SearchBar />
            </Box>
          )}
          {/* Positioning ColorModeSwitcher */}
          {isOpen && (
            <Box position="absolute" top="150%" left="5%" zIndex="100" p={2}>
              <ColorModeSwitcher />
            </Box>
          )}
        </Menu>
      </Flex>
    </Box>
  );
};

export default Navigation;
