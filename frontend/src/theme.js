import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light', // Set default to light mode
    useSystemColorMode: false,
  },
  fonts: {
    body: "'Roboto', sans-serif", // Default for body text
    heading: "'Poppins', sans-serif", // Default for headings
    rale: "'Raleway', sans-serif",
    roza: "'Rozha One', sans-serif",
    lato: "'Lato', sans-serif",
  },
  colors: {
    green: {
      light: '#7ed56f',
      medium: '#55c57a',
      dark: '#28b485',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'white', // Ensure that the background is white
        color: 'black',
      },
    },
  },
});

export default theme;
