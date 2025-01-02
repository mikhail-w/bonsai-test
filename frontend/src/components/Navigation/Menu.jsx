// components/Navigation/Menu.jsx
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Hamburger from 'hamburger-react';

const Menu = ({
  isOpen,
  toggleMenu,
  hoveredLink,
  linkColors,
  onAnimationComplete,
  children,
}) => (
  <Box
    position="relative"
    display="flex"
    alignItems="center"
    justifyContent="center"
    zIndex="10"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: isOpen ? 15 : 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (isOpen) {
          onAnimationComplete(); // Notify when animation is done
        }
      }}
      style={{
        position: 'absolute',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: isOpen ? linkColors[hoveredLink] : 'rgba(116, 214, 128, 1)',
        backdropFilter: 'blur(5px)',
        zIndex: 1,
      }}
    />
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
        color="#333333"
        zIndex="2000"
      />
    </Box>
    {children}
  </Box>
);

export default Menu;
