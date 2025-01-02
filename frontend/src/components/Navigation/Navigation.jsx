import { useState, useEffect, useRef } from 'react';
import { Box, Flex, useToast, Avatar } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isMenuAnimationComplete, setIsMenuAnimationComplete] = useState(false); // Track animation completion
  const [scrolled, setScrolled] = useState(false);
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

  // Toggle menu function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMenuAnimationComplete(false); // Reset animation status
      setTimeout(() => {
        setIsMenuAnimationComplete(true); // Set to true after the animation duration
      }, 800); // Same duration as the circle animation (0.8s)
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    setIsOpen(false);
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
    { label: 'Blog', url: '/blog', icon: FaBlog },
    { label: 'Cart', url: '/cart', icon: FaShoppingCart },
    { label: 'Shop', url: '/products', icon: FaStore },
  ];

  const linkColors = {
    default: 'linear-gradient(179.1deg,#1D976C 2.3%,#93F9B9 98.3%)',
    Login:
      'radial-gradient(circle,  rgba(116, 214, 128, 0.8), rgba(55, 139, 41, 0.8))',
    Blog: 'radial-gradient(circle at 10% 20%, rgba(4, 159, 108, 0.8) 0%, rgba(194, 254, 113, 0.8) 90.1%)',
    Cart: 'radial-gradient(circle, rgba(11, 163, 96, 0.8), rgba(50, 205, 50, 0.8))',
    Shop: 'radial-gradient(circle,  rgba(63, 181, 63, 0.8) 2.3%, rgba(168, 251, 60, 0.9) 98.3%)',
    Logout:
      'radial-gradient(circle, rgba(19, 78, 94, 0.8), rgba(113, 178, 128, 0.6))',
  };

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
        {userInfo && isOpen && isMenuAnimationComplete && (
          // <Avatar
          //   src={
          //     userInfo.avatar
          //       ? `${import.meta.env.VITE_API_URL.replace('/api/', '')}${
          //           userInfo.avatar
          //         }`
          //       : `${import.meta.env.VITE_API_URL.replace(
          //           '/api/',
          //           ''
          //         )}/media/default/avatar.jpg`
          //   }
          //   size="md"
          //   position="absolute"
          //   top="25px"
          //   right="120px"
          //   zIndex="300"
          // />
          <Box
            h={'100px'}
            bg={'white'}
            width={'100px'}
            position="absolute"
            top="25px"
            right="120px"
            // zIndex="300"
          >
            <UserAvatar userInfo={userInfo} />
          </Box>
        )}
        <Menu
          isOpen={isOpen}
          toggleMenu={toggleMenu}
          linkColors={linkColors}
          onAnimationComplete={() => setIsMenuAnimationComplete(true)}
        >
          <AnimatePresence>
            {isOpen && isMenuAnimationComplete && (
              <>
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '120%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 200, // Ensure above overlay
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <NavLinks
                    navLinks={navLinks}
                    isOpen={isOpen}
                    handleLinkClick={handleLinkClick}
                    cartItems={cartItems}
                    getLinkPosition={getLinkPosition}
                  />
                </motion.div>
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '0%',
                    right: '350%',
                    width: '200px',
                    zIndex: 200,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <SearchBar />
                </motion.div>
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '130%',
                    left: '5%',
                    zIndex: 100,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <ColorModeSwitcher />
                </motion.div>
                {/* <motion.div
                  style={{
                    position: 'absolute',
                    top: '0%',
                    left: '0%',
                    transform: 'translateX(-50%)',
                    zIndex: 300,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                > */}
                {/* <UserAvatar userInfo={userInfo} /> */}
                {/* </motion.div> */}
              </>
            )}
          </AnimatePresence>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Navigation;
