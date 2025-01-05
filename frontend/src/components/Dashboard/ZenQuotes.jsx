import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import CustomButton from '../CustomButton';

const ZenQuotes = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const textColor = useColorModeValue('gray.800', 'gray.200');

  // Function to fetch a random quote
  const fetchQuote = async () => {
    setLoading(true); // Show loading spinner
    try {
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author || 'Unknown');
    } catch (error) {
      console.error('Error fetching the quote:', error);
      setQuote('Error fetching quote. Please try again later.');
      setAuthor('');
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  useEffect(() => {
    fetchQuote(); // Fetch a quote on component mount
  }, []);

  return (
    <Box
      p={6}
      borderRadius="lg"
      boxShadow="md"
      bg={useColorModeValue('white', 'gray.700')}
      color={textColor}
      textAlign="center"
      w="full"
      maxW="400px" // Fixed width for the container
      h="300px" // Fixed height for the container
      mx="auto"
      display="flex"
      flexDirection="column" // Ensure column layout
    >
      {/* Content Area */}
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        {loading ? (
          <Spinner size="lg" />
        ) : (
          <VStack spacing={2}>
            <Text
              fontFamily="lato"
              fontSize="xl"
              fontStyle="italic"
              fontWeight="300"
              noOfLines={3} // Prevent overflow
            >
              "{quote}"
            </Text>
            <Text fontSize="md" fontWeight="medium" color="gray.500">
              — {author}
            </Text>
          </VStack>
        )}
      </Box>

      <Box>
        <CustomButton onClick={fetchQuote}>Get Another Quote</CustomButton>
      </Box>
    </Box>
  );
};

export default ZenQuotes;
