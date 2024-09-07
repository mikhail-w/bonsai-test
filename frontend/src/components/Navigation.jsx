import { useEffect, useState } from 'react';
import Hamburger from 'hamburger-react';
import logo from '../assets/images/logo.png';
import logo_white from '../assets/images/logo_white.png';

import { Box, Link, Flex, Image, useDisclosure } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { clearCart } from '../actions/cartActions';
import SearchBar from './SearchBar';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCircleAnimationDone, setIsCircleAnimationDone] = useState(false); // State for controlling the delay
  const [scrolled, setScrolled] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const shopMenuDisclosure = useDisclosure(); // For Shop menu hover control
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Determine the logo to display based on current route and scroll position
  const logoSrc = pathname === '/' && !scrolled ? logo_white : logo;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  // Toggle menu function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsCircleAnimationDone(false); // Reset animation status
      setTimeout(() => {
        setIsCircleAnimationDone(true); // Set to true after the animation duration
      }, 800); // Same duration as the circle animation (0.8s)
    }
  };

  // Function to calculate positions with a 90-degree counterclockwise rotation and add margin
  const getLinkPosition = (index, total, radius) => {
    const angleOffset = Math.PI * 0.6; // 90-degree counterclockwise rotation
    const angle = angleOffset + (index / total) * (Math.PI * 0.5); // Spread links in a 90-degree arc
    const x = radius * Math.cos(angle); // X coordinate
    const y = radius * Math.sin(angle); // Y coordinate
    return { x, y };
  };

  // Handler for logout action
  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
  };

  // Array with both labels and their corresponding URLs, including logout option if logged in
  const navLinks = [
    userInfo
      ? { label: 'Logout', action: logoutHandler }
      : { label: 'Login', url: '/login' },
    { label: 'Blog', url: '/blog' },
    { label: 'Cart', url: '/cart' },
    { label: 'Shop', url: '/shop' },
  ];

  const submenuLinks = [
    { label: 'Plants', url: '/plants' },
    { label: 'Planters', url: '/planters' },
    { label: 'Essentials', url: '/essentials' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const withoutSidebarRoutes = ['/profile', '/login', '/register'];
  if (withoutSidebarRoutes.some(item => pathname.includes(item))) return null;

  return (
    <Box>
      {/* Logo and Navigation Button (Hamburger/Close) */}
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1.5rem"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="2000" // Adjusted to ensure visibility
        width="100%"
        bg={scrolled ? 'white' : 'transparent'} // White background on scroll
        boxShadow={scrolled ? 'md' : 'none'} // Add shadow when scrolled
        transition="background-color 0.3s ease" // Smooth transition for background color
      >
        {/* Logo */}
        <RouterLink to="/">
          <Box>
            <Image src={logoSrc} alt="Logo" boxSize="50px" />
          </Box>
        </RouterLink>

        {/* Hamburger Button with Circle Animation */}
        <Box
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="10"
        >
          {/* Radiating Circle */}
          <motion.div
            initial={{ scale: 0 }} // Initially scaled down
            animate={{ scale: isOpen ? 15 : 0 }} // Slightly reduced circle size
            transition={{ duration: 0.8, ease: 'easeInOut' }} // Smooth transition
            style={{
              position: 'absolute',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: '#53c47b', // Soft green radiating circle
              zIndex: 1, // Below the hamburger button
            }}
          />

          {/* Hamburger Button */}
          <Box
            width="50px"
            height="50px"
            borderRadius="full"
            bg="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="md"
            zIndex="2" // Ensures hamburger is above the circle
          >
            <Hamburger
              toggled={isOpen} // Bind the open state to the Hamburger component
              toggle={toggleMenu} // Toggle function to switch between open and close
              rounded
              easing="ease-in"
              color="#000000"
              zIndex="2000"
            />
          </Box>
          {isOpen && isCircleAnimationDone && (
            <Box>
              {/* Navigation Links Positioned with 90-degree Counterclockwise Rotation */}
              {navLinks.map((link, index) => {
                const { x, y } = getLinkPosition(index, navLinks.length, 300);

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: isOpen ? 1 : 0,
                      scale: isOpen ? 1 : 0,
                      x: isOpen ? `${x}px` : '0px',
                      y: isOpen ? `${y}px` : '0px',
                    }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      zIndex: 5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '8px',
                    }}
                  >
                    {/* If the link is a logout action, trigger the logoutHandler */}
                    {link.action ? (
                      <Link
                        as="button"
                        onClick={link.action}
                        fontSize="xl"
                        color="black"
                        _hover={{ color: 'gray.800', bg: 'yellow' }}
                        bg="white"
                        padding="0.5rem 1rem"
                        borderRadius="full"
                        boxShadow="md"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      // Non-action links (e.g., Login)
                      <Link
                        as={RouterLink}
                        to={link.url}
                        fontSize="xl"
                        color="black"
                        _hover={{ color: 'gray.800', bg: 'yellow' }}
                        bg="white"
                        padding="0.5rem 1rem"
                        borderRadius="full"
                        boxShadow="md"
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
              {/* Search Bar added inside menu */}
              <Box
                position="absolute"
                width={200}
                top={-10}
                right={100}
                display="flex"
                alignItems="center"
                mt="2rem"
                zIndex={3000}
              >
                <SearchBar />
              </Box>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navigation;
