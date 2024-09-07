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
    green: {
      light: '#7ed56f',
      medium: '#55c57a',
      dark: '#28b485',
    },
  },
});

export default theme;
