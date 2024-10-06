import React from 'react';
import { Box, Container } from '@chakra-ui/react';

function FormContainer({ children }) {
  return (
    <Container maxW="container.md" centerContent>
      <Box w="100%" maxW="md" p={4}>
        {children}
      </Box>
    </Container>
  );
}

export default FormContainer;
