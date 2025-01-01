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
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import bonsaiLogo from '../assets/images/logo.png'; // Replace with your logo path

const withoutSidebarRoutes = ['/login', '/register', '/profile'];

const SocialButton = ({ label, href, icon }) => {
  const iconColor = useColorModeValue('green.700', 'gray.300');
  return (
    <Button
      as={Link}
      href={href}
      bg={useColorModeValue('green.50', 'gray.700')}
      rounded="full"
      w={{ base: 8, md: 12 }}
      h={{ base: 8, md: 12 }}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{ bg: useColorModeValue('green.100', 'gray.600') }}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon &&
        React.cloneElement(icon, {
          size: '16px',
          md: '24px',
          color: iconColor,
        })}
      {/* Responsive icon size: smaller in mobile */}
    </Button>
  );
};

function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  if (withoutSidebarRoutes.some(item => pathname.includes(item))) return null;

  const handleNavigation = path => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 100);
  };

  const textColor = useColorModeValue('green.700', 'green.300');
  const hoverColor = useColorModeValue('white', 'gray.300');
  const backgroundColor = useColorModeValue('#353238', '#2D3748');
  const logoTextColor = useColorModeValue('green.700', 'green.300');

  return (
    <Box bg={backgroundColor} color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW="6xl" py={10} spacing={8}>
        <Stack direction="row" align="center" justify="space-between">
          <Flex alignItems="center">
            <Image src={bonsaiLogo} alt="Bonsai Logo" boxSize="50px" />
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
            <SocialButton
              label="Facebook"
              href="https://www.facebook.com"
              icon={<FaFacebook />}
            />
            <SocialButton
              label="Twitter"
              href="https://www.twitter.com"
              icon={<FaTwitter />}
            />
            <SocialButton
              label="Instagram"
              href="https://www.instagram.com"
              icon={<FaInstagram />}
            />
          </Stack>
        </Stack>

        <Stack direction="row" justify="center" spacing={4}>
          <Link
            fontFamily="lato"
            color={textColor}
            _hover={{ textDecoration: 'underline', color: hoverColor }}
            onClick={() => handleNavigation('/about')}
          >
            About Us
          </Link>
          <Link
            fontFamily="lato"
            color={textColor}
            _hover={{ textDecoration: 'underline', color: hoverColor }}
            onClick={() => handleNavigation('/products')}
          >
            Shop
          </Link>
          <Link
            fontFamily="lato"
            color={textColor}
            _hover={{ textDecoration: 'underline', color: hoverColor }}
            onClick={() => handleNavigation('/contact')}
          >
            Contact
          </Link>
          <Link
            fontFamily="lato"
            color={textColor}
            _hover={{ textDecoration: 'underline', color: hoverColor }}
            onClick={() => handleNavigation('/blog')}
          >
            Blog
          </Link>
        </Stack>

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
  );
}

export default Footer;
