import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Link,
  VisuallyHidden,
  Button,
  IconButton,
  useColorModeValue,
  Image,
  HStack,
  Flex,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import bonsaiLogo from '../assets/images/logo.png'; // replace with your logo path

const withoutSidebarRoutes = ['/login', '/register', '/profile'];

const SocialButton = ({ label, href, icon }) => {
  return (
    <Button
      as={Link}
      href={href}
      bg={useColorModeValue('green.50', 'gray.700')}
      rounded="full"
      w={10}
      h={10}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{ bg: useColorModeValue('green.100', 'gray.600') }}
      aria-label={label}
      target="_blank" // This opens the link in a new tab
      rel="noopener noreferrer"
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {icon}
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
    }, 100); // A slight delay to ensure the page navigates before scrolling
  };

  return (
    <Box
      bg={useColorModeValue('#353238', '#2D3748')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW="6xl" py={10} spacing={8}>
        <Stack direction="row" align="center" justify="space-between">
          <Flex alignItems="end">
            <Image src={bonsaiLogo} alt="Bonsai Logo" boxSize="50px" />
            <Text
              fontFamily={'lato'}
              fontWeight="bold"
              fontSize="xl"
              color="green.700"
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
            fontFamily={'lato'}
            color="green.700"
            _hover={{ textDecoration: 'underline', color: 'white' }}
            onClick={() => handleNavigation('/about')}
          >
            About Us
          </Link>
          <Link
            fontFamily={'lato'}
            color="green.700"
            _hover={{ textDecoration: 'underline', color: 'white' }}
            onClick={() => handleNavigation('/products')}
          >
            Shop
          </Link>
          <Link
            fontFamily={'lato'}
            color="green.700"
            _hover={{ textDecoration: 'underline', color: 'white' }}
            onClick={() => handleNavigation('/contact')}
          >
            Contact
          </Link>
          <Link
            fontFamily={'lato'}
            color="green.700"
            _hover={{ textDecoration: 'underline', color: 'white' }}
            onClick={() => handleNavigation('/blog')}
          >
            Blog
          </Link>
        </Stack>

        <Text
          fontFamily={'lato'}
          textAlign="center"
          fontSize="sm"
          color="white"
        >
          © {new Date().getFullYear()} Bonsai. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}

export default Footer;
