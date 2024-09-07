import { useEffect, useState } from 'react';
import Hamburger from 'hamburger-react';
import logo from '../assets/images/logo.png';
import logo_white from '../assets/images/logo_white.png';
import heroSmall from '../assets/images/h3.png';
import heroLarge from '../assets/images/h3.png';
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
  Link,
  MenuDivider,
  Button,
  Image,
  Text,
  Stack,
  Badge,
  Avatar,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { logout } from '../actions/userActions';
import { clearCart } from '../actions/cartActions';
import SearchBar from './SearchBar';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const shopMenuDisclosure = useDisclosure(); // For Shop menu hover control
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  // Toggle menu function
  const toggleMenu = () => setIsOpen(!isOpen);

  // Function to calculate positions with a 90-degree counterclockwise rotation and add margin
  const getLinkPosition = (index, total, radius) => {
    const angleOffset = Math.PI * 0.6; // 90-degree counterclockwise rotation
    const angle = angleOffset + (index / total) * (Math.PI * 0.5); // Spread links in a 90-degree arc
    const x = radius * Math.cos(angle); // X coordinate
    const y = radius * Math.sin(angle); // Y coordinate
    return { x, y };
  };

  // Array with both labels and their corresponding URLs
  const navLinks = [
    { label: 'Login', url: '/login' },
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

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
  };

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
        bg="transparent"
      >
        {/* Logo */}
        <RouterLink to="/">
          <Box>
            <Image src={logo_white} alt="Logo" boxSize="50px" />
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

          {/* Navigation Links Positioned with 90-degree Counterclockwise Rotation */}
          {navLinks.map((link, index) => {
            const { x, y } = getLinkPosition(index, navLinks.length, 260);

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
                {/* For Shop link and its submenu */}
                {link.label === 'Shop' ? (
                  <Box
                    onMouseEnter={() => setIsShopHovered(true)} // Show submenu when hovering over Shop link
                    onMouseLeave={() => setIsShopHovered(false)} // Hide submenu when leaving the Shop link or submenu
                    position="relative"
                  >
                    {/* Shop Link */}
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
                      Shop
                    </Link>

                    {/* Submenu Links */}
                    {isShopHovered && (
                      <Box
                        position="absolute"
                        top="100%" // Position below the Shop link
                        left="0"
                        display="flex" // Horizontally aligned
                        gap="10px" // Space between submenu items
                        bg="transparent" // Transparent background
                        padding="1rem"
                        // boxShadow="lg"
                        zIndex="1000"
                        onMouseEnter={() => setIsShopHovered(true)} // Keep submenu visible when hovering over it
                        onMouseLeave={() => setIsShopHovered(false)} // Hide submenu when leaving
                      >
                        {submenuLinks.map(submenuLink => (
                          <Link
                            key={submenuLink.label}
                            as={RouterLink}
                            to={submenuLink.url}
                            fontSize="sm"
                            bg={'white'}
                            borderRadius="full"
                            color="black"
                            display="flex"
                            flexDirection={'row'}
                            padding="0.5rem 1rem"
                            _hover={{ color: 'gray.800', bg: 'yellow' }}
                            // borderRadius="md"
                            // boxShadow="md"
                          >
                            {submenuLink.label}
                          </Link>
                        ))}
                      </Box>
                    )}
                  </Box>
                ) : (
                  // Non-Shop links
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
        </Box>
      </Flex>

      {/* Hero Section with Gradient Background */}
      <Box
        position="relative"
        height="85vh"
        bgImage={{
          base: `linear-gradient(to right bottom, rgba(126, 213, 111, 0.8), rgba(40, 180, 133, 0.8)), url(${heroSmall})`,
          md: `linear-gradient(to right bottom, rgba(126, 213, 111, 0.8), rgba(40, 180, 133, 0.8)), url(${heroLarge})`,
        }}
        bgSize="cover"
        bgPosition="center"
        clipPath="polygon(0 0, 100% 0, 100% 85%, 0 100%)" // Simpler curved clip path
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        zIndex="1"
        flexDirection="column" // To stack the content vertically
      >
        {/* Hero Overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.4)" // Optional dark overlay for text contrast
          zIndex="2"
        />

        {/* Hero Content */}
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          alignContent={'center'}
          position="relative"
          zIndex="3"
        >
          <Text
            color="white"
            fontWeight={300}
            fontFamily="lato"
            fontSize={{ base: '10vw', md: '6vw', lg: '7vw' }}
            mb={4}
          >
            <span style={{ letterSpacing: '1.5rem' }}>B</span>
            <span style={{ letterSpacing: '1.5rem' }}>O</span>
            <span style={{ letterSpacing: '1.5rem' }}>N</span>
            <span style={{ letterSpacing: '1.5rem' }}>S</span>
            <span style={{ letterSpacing: '1.5rem' }}>A</span>
            <span style={{ letterSpacing: '1.5rem' }}>I</span>
          </Text>
          <Text
            fontWeight={300}
            fontFamily="lato"
            fontSize="md"
            color="white"
            mb={8}
          >
            BE ONE WITH NATURE
          </Text>
          <Button
            as="button"
            display="inline-block"
            flexBasis={'auto'}
            width="auto"
            size="lg"
            bg="white"
            paddingX="1.5rem"
            paddingY="1rem"
            boxShadow="md"
            alignSelf="center"
            fontSize="lg"
            fontWeight="thin"
            border="0px solid"
            borderRadius="full"
            outline="1px solid rgba(255, 255, 255, 0.5)"
            outlineOffset="0px"
            // boxShadow="inset 0 0 20px rgba(255, 255, 255, 0)"
            textShadow="none"
            transition="all 1.25s cubic-bezier(0.19, 1, 0.22, 1)"
            _hover={{
              border: '1px solid',
              boxShadow:
                'inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)',
              outlineColor: 'rgba(255, 255, 255, 0)',
              outlineOffset: '15px',
              textShadow: '1px 1px 2px #427388',
            }}
            _focus={{ boxShadow: 'outline', outline: 'none' }}
            position="relative"
          >
            EXPLORE NATURE
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Navigation;
