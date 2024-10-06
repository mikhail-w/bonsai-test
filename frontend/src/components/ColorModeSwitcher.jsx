// ColorModeSwitcher.jsx
import { Button, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

function ColorModeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} aria-label="Toggle color mode">
      {colorMode === 'light' ? <FaMoon /> : <FaSun />}
    </Button>
  );
}

export default ColorModeSwitcher;
