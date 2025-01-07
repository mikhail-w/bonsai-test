import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Spinner,
  Text,
  Image,
  Alert,
  AlertIcon,
  List,
  ListItem,
  ListIcon,
  useToast,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const PlantIdentifier = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  // Convert image to base64
  const toBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async e => {
    try {
      setError(null);
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      setImage(file);
      const base64Image = await toBase64(file);
      // Make sure we only send the base64 data without the prefix
      const imageWithoutPrefix = base64Image.split(',')[1];
      console.log('Image data length:', imageWithoutPrefix.length);
      await identifyPlant(imageWithoutPrefix);
    } catch (err) {
      setError('Error processing image: ' + err.message);
    }
  };

  const identifyPlant = async base64Image => {
    setLoading(true);
    setError(null);

    const body = {
      requests: [
        {
          image: {
            content: base64Image,
          },
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 5,
            },
          ],
        },
      ],
    };

    try {
      const apiKey = import.meta.env.VITE_GOOGLE_CLOUD_VISION_API_KEY;
      if (!apiKey) {
        throw new Error('API key is not configured');
      }

      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Full API Error:', errorData);
        throw new Error(
          `API Error: ${errorData.error?.message || response.statusText}`
        );
      }

      const data = await response.json();
      const labels = data.responses[0].labelAnnotations;
      setResult(labels);
    } catch (err) {
      setError('Failed to identify plant: ' + err.message);
      console.error('Error:', err);
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      p={6}
      mt={10}
      borderRadius="lg"
      bg="white"
      boxShadow="lg"
      textAlign="center"
    >
      <Heading mb={6} color="green.600" fontSize="2xl" fontWeight="semibold">
        Plant Identifier
      </Heading>

      <VStack spacing={4}>
        <Input
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
          size="lg"
          borderColor="green.300"
          focusBorderColor="green.500"
          bg="gray.50"
        />

        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {image && (
          <Box>
            <Text fontSize="md" color="gray.500" mt={2}>
              Uploaded Image Preview:
            </Text>
            <Image
              src={URL.createObjectURL(image)}
              alt="Uploaded plant image"
              borderRadius="md"
              boxSize="200px"
              objectFit="cover"
              mt={2}
            />
          </Box>
        )}

        {loading && <Spinner size="xl" color="green.500" thickness="4px" />}

        {result && (
          <Box mt={{ base: 6, md: 8 }} w="100%">
            <Heading
              as="h2"
              size="md"
              color="green.600"
              mb={4}
              textAlign={'center'}
            >
              Identification Results:
            </Heading>
            <List
              spacing={3}
              w="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              {result.map((label, index) => (
                <ListItem
                  key={index}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  px={2}
                  py={1}
                  borderRadius="md"
                  _hover={{ bg: 'gray.50' }}
                  flexWrap="nowrap"
                  w={{ base: '100%', md: 'auto' }}
                  maxW={{ base: '100%', md: '80%' }}
                >
                  <ListIcon
                    as={CheckCircleIcon}
                    color="green.500"
                    flexShrink={0}
                  />
                  <Text fontSize={{ base: 'sm', md: 'md' }} noOfLines={1}>
                    {label.description} - Confidence:{' '}
                    {(label.score * 100).toFixed(1)}%
                  </Text>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default PlantIdentifier;
