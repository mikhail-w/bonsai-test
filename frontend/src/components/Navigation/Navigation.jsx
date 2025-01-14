import React, { useRef } from 'react';
import {
  Box,
  Avatar,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Hamburger from 'hamburger-react';
import { motion } from 'framer-motion';
import { useScrollPosition } from './useScrollPosition';
import { useMenuAnimation } from './useMenuAnimation';
import { useOutsideClick } from './useOutsideClick';
import { NavigationLink } from './NavigationLink';
import { ShopMenu } from './ShopMenu';
import { Logo } from './Logo';
import { getLinkPosition } from './navigationUtils';
import { cleanMediaPath } from './utils/urlUtils';
import SearchBar from '../SearchBar';
import ColorModeSwitcher from '../ColorModeSwitcher';

const Navigation = () => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const bgColor = useColorModeValue('white', '#2A3439');

  const scrolled = useScrollPosition();
  const { isOpen, isCircleAnimationDone, toggleMenu, setIsOpen } =
    useMenuAnimation();
  useOutsideClick(menuRef, () => setIsOpen(false));

  const userLogin = useSelector(state => state.userLogin);
  const cart = useSelector(state => state.cart);
  const { userInfo } = userLogin;
  const { cartItems } = cart;

  // Navigation configuration and utility functions...
  // (Keep the existing navLinks, submenuLinks, linkColors, and other configurations)

  const withoutSidebarRoutes = ['/profile', '/login', '/register'];
  if (withoutSidebarRoutes.some(item => pathname.includes(item))) return null;

  return (
    <Box ref={menuRef}>
      <Box>
        <Logo logoSrc={pathname === '/' && !scrolled ? logo_white : logo} />

        <Box position="fixed" right={8} top={10} zIndex="10">
          {/* Menu Circle Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isOpen ? 15 : 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: linkColors[hoveredLink],
              backdropFilter: 'blur(5px)',
              zIndex: 1,
            }}
          />

          {/* Hamburger Button */}
          <Box
            width="50px"
            height="50px"
            borderRadius="full"
            bg="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="md"
            zIndex="2"
            transition="all 0.3s ease-in-out"
            _hover={{
              transform: 'scale(1.09)',
              boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.2)',
            }}
          >
            <Hamburger
              toggled={isOpen}
              toggle={toggleMenu}
              rounded
              easing="ease-in"
              color="#333333"
            />
          </Box>

          {/* Navigation Menu Content */}
          {isOpen && isCircleAnimationDone && (
            <>
              {/* User Avatar */}
              {userInfo && (
                <RouterLink to="/profile">
                  <Avatar
                    src={cleanMediaPath(
                      userInfo.avatar || 'default/avatar.jpg',
                      import.meta.env.VITE_API_BASE_URL
                    )}
                    size="md"
                    position="absolute"
                    top="0px"
                    right="70px"
                    zIndex="5"
                  />
                </RouterLink>
              )}

              {/* Navigation Links */}
              {navLinks.map((link, index) => (
                <NavigationLink
                  key={link.label}
                  link={link}
                  position={getLinkPosition(index, navLinks.length, 320)}
                  isOpen={isOpen}
                  handleLinkClick={() => {
                    setIsOpen(false);
                    if (link.action) link.action();
                  }}
                  cartItems={cartItems}
                />
              ))}

              {/* Search Bar and Color Mode Switcher */}
              <Box
                position="absolute"
                width={200}
                top={-10}
                right={100}
                zIndex={3000}
              >
                <SearchBar />
              </Box>
              <Box
                position="absolute"
                width={200}
                top={10}
                right={-150}
                zIndex={3000}
              >
                <ColorModeSwitcher />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Navigation;
