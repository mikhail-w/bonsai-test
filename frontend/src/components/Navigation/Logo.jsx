// components/Navigation/Logo.jsx
import { Box, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Logo = ({ logoSrc }) => (
  <RouterLink to="/">
    <Box>
      <Image src={logoSrc} alt="Logo" boxSize="50px" />
    </Box>
  </RouterLink>
);

export default Logo;
