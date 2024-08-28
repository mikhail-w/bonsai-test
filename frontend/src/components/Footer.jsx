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
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import bonsaiLogo from '../assets/images/bonsai-tree-logo.png'; // replace with your logo path
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
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {icon}
    </Button>
  );
};

function Footer() {
  const { pathname } = useLocation();
  if (withoutSidebarRoutes.some(item => pathname.includes(item))) return null;
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW="6xl" py={10} spacing={8}>
        <Stack direction="row" align="center" justify="space-between">
          <HStack spacing={4} align="center">
            <Image src={bonsaiLogo} alt="Bonsai Logo" boxSize="50px" />
            <Text fontWeight="bold" fontSize="xl" color="green.700">
              BONSAI
            </Text>
          </HStack>

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
            href="/about"
            color="green.700"
            _hover={{ textDecoration: 'underline' }}
          >
            About Us
          </Link>
          <Link
            href="/shop"
            color="green.700"
            _hover={{ textDecoration: 'underline' }}
          >
            Shop
          </Link>
          <Link
            href="/contact"
            color="green.700"
            _hover={{ textDecoration: 'underline' }}
          >
            Contact
          </Link>
          <Link
            href="/blog"
            color="green.700"
            _hover={{ textDecoration: 'underline' }}
          >
            Blog
          </Link>
        </Stack>

        <Text textAlign="center" fontSize="sm" color="gray.500">
          © {new Date().getFullYear()} Bonsai. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}

export default Footer;
