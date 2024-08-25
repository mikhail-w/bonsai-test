import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useDisclosure,
  Badge,
} from '@chakra-ui/react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Navbar2 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthenticated = false; // Set this to true if the user is logged in
  const cartItemCount = 3; // Replace with dynamic cart item count

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
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Box fontSize="xl" fontWeight="bold">
            <Link href="/">Bonsai Brand</Link>
          </Box>
        </HStack>

        {/* Menu Section */}
        <HStack
          as="nav"
          spacing={4}
          display={{ base: 'none', md: 'flex' }}
          fontSize="lg"
          fontWeight="medium"
        >
          <Link href="/store">Store</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </HStack>

        {/* Right Section: Profile, Cart, Login/Logout */}
        <Flex alignItems="center">
          {/* Shopping Cart with Badge */}
          <Box position="relative" mr={4}>
            <IconButton
              aria-label="Shopping Cart"
              icon={<MdOutlineShoppingCart />}
              size="lg"
              variant="outline"
            />
            {cartItemCount > 0 && (
              <Badge
                colorScheme="red"
                borderRadius="full"
                position="absolute"
                top="-1"
                right="-1"
                fontSize="0.8em"
              >
                {cartItemCount}
              </Badge>
            )}
          </Box>

          {/* Profile or Login/Logout */}
          {isAuthenticated ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                <Avatar size="sm" src="https://via.placeholder.com/150" />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button variant="outline" colorScheme="teal" mr={4}>
              Login
            </Button>
          )}
        </Flex>
      </Flex>

      {/* Mobile Menu */}
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Flex direction="column" as="nav" spacing={4}>
            <Link href="/store">Store</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
            {isAuthenticated ? (
              <Link href="/logout">Logout</Link>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </Flex>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar2;
