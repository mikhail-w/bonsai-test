import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const NavigationLink = ({
  link,
  position,
  isOpen,
  handleLinkClick,
  cartItems,
}) => {
  const { x, y } = position;

  return (
    <motion.div
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
      <RouterLink to={link.url} onClick={handleLinkClick}>
        <Flex
          fontSize="xl"
          fontFamily="lato"
          color="#333333"
          _hover={{ color: 'gray.800', bg: 'yellow' }}
          bg="white"
          padding="0.5rem 1rem"
          borderRadius="full"
          boxShadow="md"
          alignItems="center"
          gap="0.5rem"
        >
          <link.icon />
          {link.label}
          {link.label === 'Cart' && cartItems?.length > 0 && (
            <Badge colorScheme="green" borderRadius="full" px={2} ml={2}>
              {cartItems.reduce((acc, item) => acc + item.qty, 0)}
            </Badge>
          )}
        </Flex>
      </RouterLink>
    </motion.div>
  );
};
