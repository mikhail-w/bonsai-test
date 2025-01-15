import React from 'react';
import {
  Box,
  Divider,
  Flex,
  useColorModeValue,
  AbsoluteCenter,
  CloseButton,
} from '@chakra-ui/react';
import NavItem from './NavItem';
import { adminLinks } from './AdminLinks';
import Logo from './Logo';

const SidebarContent = ({ onClose, links, userInfo, ...rest }) => {
  const bgColor = useColorModeValue('white', 'gray.900');
  const textColor = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      transition="3s ease"
      bg={bgColor}
      borderRight="1px solid"
      borderColor={borderColor}
      boxShadow="md"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Logo />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {links.map(link => (
        <NavItem
          key={link.path}
          icon={link.icon}
          path={link.path}
          onClose={onClose}
        >
          {link.name}
        </NavItem>
      ))}
      {userInfo?.isAdmin && (
        <>
          <Box position="relative" padding="10">
            <Divider borderWidth="2px" borderColor="green.500" />
            <AbsoluteCenter bg={bgColor} px="4" color={textColor}>
              Admin
            </AbsoluteCenter>
          </Box>
          {adminLinks.map(link => (
            <NavItem
              key={link.path}
              icon={link.icon}
              path={link.path}
              onClose={onClose}
            >
              {link.name}
            </NavItem>
          ))}
        </>
      )}
    </Box>
  );
};

export default SidebarContent;
