import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
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

// Custom hook for quote fetching
const useQuote = () => {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomQuote = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('https://api.quotable.io/random', {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Failed to fetch quote (Status: ${response.status})`);
      }

      const data = await response.json();
      setQuote(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quote');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomQuote();
    return () => {
      setQuote(null);
      setError(null);
    };
  }, [fetchRandomQuote]);

  return {
    quote,
    isLoading,
    error,
    refetch: fetchRandomQuote,
  };
};

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
const ErrorMessage = ({ message, onRetry }) => (
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
    <AlertDescription mb={4}>{message}</AlertDescription>
    <CustomButton
      size="sm"
      onClick={onRetry}
      bg="#4891ef"
      _hover={{
        backgroundColor: '#55c57a',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
      }}
    >
      Try Again
    </CustomButton>
  </Alert>
);

// Main Component
const ZenQuotes = () => {
  const { quote, isLoading, error, refetch } = useQuote();
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
              ) : error ? (
                <ErrorMessage message={error} onRetry={refetch} />
              ) : quote ? (
                <QuoteContent quote={quote} />
              ) : null}
            </Box>

            <CustomButton
              leftIcon={<Icon as={RepeatIcon} />}
              size="sm"
              fontSize="xs"
              fontWeight="600"
              padding="1rem"
              bg="#4891ef"
              onClick={refetch}
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
