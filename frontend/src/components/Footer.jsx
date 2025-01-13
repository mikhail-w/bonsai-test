import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  Button,
  useColorModeValue,
  Image,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import logo from '../assets/images/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

// Create a separate ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Change to "instant" instead of "smooth"
    });
  }, [pathname]);

  return null;
};

// Navigation links data
const NAV_LINKS = [
  { label: 'About Us', path: '/about' },
  { label: 'Shop', path: '/products' },
  { label: 'Contact', path: '/contact' },
  { label: 'Blog', path: '/blog' },
];

// Social media links data
const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com', icon: FaFacebook },
  { label: 'Twitter', href: 'https://www.twitter.com', icon: FaTwitter },
  { label: 'Instagram', href: 'https://www.instagram.com', icon: FaInstagram },
  {
    label: 'Github',
    href: 'https://github.com/mikhail-w/bonsai',
    icon: FaGithub,
  },
];

const SocialButton = ({ label, href, icon: IconComponent }) => {
  const iconColor = useColorModeValue('green.700', 'gray.300');
  const buttonBg = useColorModeValue('green.50', 'gray.700');
  const hoverBg = useColorModeValue('green.100', 'gray.600');

  return (
    <Button
      as={Link}
      href={href}
      bg={buttonBg}
      rounded="full"
      w={{ base: 8, md: 12 }}
      h={{ base: 8, md: 12 }}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{ bg: hoverBg }}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon
        as={IconComponent}
        w={{ base: 4, md: 6 }}
        h={{ base: 4, md: 6 }}
        color={iconColor}
      />
    </Button>
  );
};

const Footer = ({ excludePaths = ['/login', '/register', '/profile'] }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Check if current path should exclude footer
  if (excludePaths.some(path => pathname.includes(path))) return null;

  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo(0, 0);
  };

  const textColor = useColorModeValue('green.700', 'green.300');
  const hoverColor = useColorModeValue('white', 'gray.300');
  const backgroundColor = useColorModeValue('gray.800', 'gray.900');
  const logoTextColor = useColorModeValue('green.700', 'green.300');

  return (
    <>
      <ScrollToTop />
      <Box
        as="footer"
        bg={backgroundColor}
        color={useColorModeValue('gray.700', 'gray.200')}
        position="relative"
        zIndex="footer"
      >
        <Container as={Stack} maxW="6xl" py={10} spacing={8}>
          {/* Logo and Social Links */}
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            align="center"
            justify="space-between"
            spacing={{ base: 6, sm: 0 }}
          >
            <Flex alignItems="center">
              <Image
                src={logo}
                alt="Bonsai Logo"
                boxSize="50px"
                fallbackSrc="/placeholder.png"
              />
              <Text
                fontFamily="lato"
                fontWeight="bold"
                fontSize="xl"
                color={logoTextColor}
                ml={4}
                transform="translateY(5.5px)"
              >
                BONSAI
              </Text>
            </Flex>

            <Stack direction="row" spacing={6}>
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <SocialButton
                  key={label}
                  label={label}
                  href={href}
                  icon={icon}
                />
              ))}
            </Stack>
          </Stack>

          {/* Navigation Links */}
          <Stack
            as="nav"
            direction="row"
            justify="center"
            spacing={4}
            wrap="wrap"
          >
            {NAV_LINKS.map(({ label, path }) => (
              <Link
                key={label}
                fontFamily="lato"
                color={textColor}
                _hover={{ textDecoration: 'underline', color: hoverColor }}
                onClick={e => handleNavigation(e, path)}
              >
                {label}
              </Link>
            ))}
          </Stack>

          {/* Copyright */}
          <Text
            fontFamily="lato"
            textAlign="center"
            fontSize="sm"
            color={hoverColor}
          >
            © {new Date().getFullYear()} Bonsai. All rights reserved.
          </Text>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
