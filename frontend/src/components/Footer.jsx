import React from 'react';
import { Box, Text, Flex, Container, Divider } from '@chakra-ui/react';

function Footer() {
  return (
    <Box as="footer" bg="teal.900" color="white" py={6} position="relative">
      <Container maxW="container.lg">
        <Flex direction="column" align="center" textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            Bonsai Serenity
          </Text>
          <Text fontSize="lg" mb={4}>
            Your tranquil bonsai shop where nature meets peace.
          </Text>
          <Divider borderColor="whiteAlpha.300" mb={4} />
          <Text fontSize="sm" mb={2}>
            © 2024 Bonsai Serenity. All rights reserved.
          </Text>
          <Text fontSize="sm">
            <a href="mailto:info@bonsaiserenity.com">info@bonsaiserenity.com</a>
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
