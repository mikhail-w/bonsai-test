import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import { FaStore } from 'react-icons/fa';

export const ShopMenu = ({
  isShopHovered,
  isMobile,
  submenuLinks,
  handleLinkClick,
}) => {
  return (
    <>
      <RouterLink to="/products" onClick={handleLinkClick}>
        <Flex
          fontFamily="lato"
          color="#333333"
          fontSize="xl"
          _hover={{ color: 'gray.800', bg: 'yellow' }}
          bg="white"
          padding="0.5rem 1rem"
          borderRadius="full"
          boxShadow="md"
          alignItems="center"
          gap="0.5rem"
        >
          <FaStore />
          Shop
        </Flex>
      </RouterLink>
      {(isShopHovered || isMobile) && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          display="flex"
          gap="10px"
          bg="transparent"
          padding="1rem"
          zIndex="1000"
        >
          {submenuLinks.map(submenuLink => (
            <Link
              key={submenuLink.label}
              as={RouterLink}
              to={submenuLink.url}
              fontSize="sm"
              bg="white"
              borderRadius="full"
              fontFamily="lato"
              color="#333333"
              padding="0.5rem 1rem"
              _hover={{ color: 'gray.800', bg: 'yellow' }}
            >
              {submenuLink.label}
            </Link>
          ))}
        </Box>
      )}
    </>
  );
};
