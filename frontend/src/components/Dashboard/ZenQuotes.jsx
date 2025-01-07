import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Text,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  useColorModeValue,
  ScaleFade,
  Icon,
  Center,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import CustomButton from '../CustomButton';
import Loader from '../Loader';

// Quote Content Component
const QuoteContent = ({ quote }) => {
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const authorColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <VStack spacing={4} align="center">
      <Text
        fontSize={{ base: 'xl', md: '2xl' }}
        fontStyle="italic"
        fontWeight="light"
        color={textColor}
        lineHeight="tall"
        textAlign="center"
      >
        "{quote.content}"
      </Text>
      <Text fontSize="md" fontWeight="medium" color={authorColor}>
        — {quote.author}
      </Text>
    </VStack>
  );
};

// Error Message Component
const ErrorMessage = ({ message }) => (
  <Alert
    status="error"
    variant="subtle"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    borderRadius="lg"
    p={6}
  >
    <AlertIcon boxSize={6} mr={0} mb={2} />
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

// Main Component
const ZenQuotes = () => {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomQuote = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      setQuote(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Container maxW="container.md" py={8}>
      <ScaleFade in={true} initialScale={0.9}>
        <Center>
          <Box
            p={8}
            borderRadius="xl"
            bg={bgColor}
            borderWidth="1px"
            borderColor={borderColor}
            boxShadow="xl"
            position="relative"
            minH="250px"
            minWidth={{ base: '90vw', md: '300px' }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              flex="1"
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="full"
              minH="200px"
            >
              {isLoading ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              ) : // <Loader />
              error ? (
                <ErrorMessage message={error} />
              ) : quote ? (
                <QuoteContent quote={quote} />
              ) : null}
            </Box>

            <CustomButton
              leftIcon={<Icon as={RepeatIcon} />}
              size="sm"
              fontSize="xs"
              fontWeight="600"
              padding="1rem "
              bg="#4891ef"
              onClick={fetchRandomQuote}
              isLoading={isLoading}
              mt={'20px'}
              mb={'10px'}
              _hover={{
                backgroundColor: '#55c57a',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
              }}
            >
              New Quote
            </CustomButton>
          </Box>
        </Center>
      </ScaleFade>
    </Container>
  );
};

export default ZenQuotes;
