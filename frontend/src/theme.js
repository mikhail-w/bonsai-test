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
  breakpoints: {
    xs: '20em', // Extra small devices (320px)
    sm: '30em', // Small devices (480px)
    md: '48em', // Medium devices (768px)
    lg: '64em', // Large devices (1024px)
    xl: '81em', // Extra large devices (1280px)
    '2xl': '96em', // Extra extra large devices (1536px)
  },
});

export default theme;
