import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: "'Roboto', sans-serif", // Default for body text
    heading: "'Poppins', sans-serif", // Default for headings
    rale: "'Raleway', sans-serif",
    roza: "'Rozha One', sans-serif",
    lato: "'Lato', sans-serif",
  },
  colors: {
    lime: {
      50: '#f2ffde',
      100: '#defcb2',
      200: '#caf884',
      300: '#b5f554',
      400: '#a1f226',
      500: '#88d90d',
      600: '#69a905',
      700: '#4a7801',
      800: '#2b4800',
      900: '#0b1900',
    },
  },
});

export default theme;
