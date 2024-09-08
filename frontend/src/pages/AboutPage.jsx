import { Container, Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';

function AboutPage() {
  // Scroll to top after the page is loaded
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Container minH={'100vh'} mt={130}>
      <Heading>About Page</Heading>
    </Container>
  );
}
export default AboutPage;
