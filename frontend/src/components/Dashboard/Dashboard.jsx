import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  useDisclosure,
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
} from '@chakra-ui/react';
import SidebarContent from './SidebarContent';
import MobileNav from './MobileNav';
import { defaultLinks } from './Links';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useSelector(state => state.userLogin.userInfo);

  const [links, setLinks] = useState(defaultLinks);

  useEffect(() => {
    setLinks(defaultLinks);
  }, [userInfo]);

  useEffect(() => {
    if (location.pathname === '/profile') {
      userInfo.isAdmin ? navigate('admin/userlist') : navigate('/profile/info');
    }
  }, [location, navigate]);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={onClose}
        links={links}
        userInfo={userInfo}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerContent>
          <SidebarContent onClose={onClose} links={links} userInfo={userInfo} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;