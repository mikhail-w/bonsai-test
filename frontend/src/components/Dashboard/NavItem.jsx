import React from 'react';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NavItem = ({ icon, children, path, onClose }) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => {
        navigate(path);
        onClose();
      }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{ bg: 'green.300', color: 'white' }}
      >
        <Icon as={icon} mr="4" />
        {children}
      </Flex>
    </Box>
  );
};

export default NavItem;
