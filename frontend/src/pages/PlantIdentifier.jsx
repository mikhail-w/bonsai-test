import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Spinner,
  Text,
  Image,
  useToast,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const API_KEY = import.meta.env.VITE_PLANT_ID_API_KEY;
console.log('API Key:', API_KEY);

const PlantIdentifier = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
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
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const base64Image = await toBase64(file);
      const imageWithoutPrefix = base64Image.split(',')[1]; // Remove base64 prefix
      identifyPlant(imageWithoutPrefix);
    }
  };

  const identifyPlant = async base64Image => {
    setLoading(true);

    // Proper request body for the Google Cloud Vision API
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
      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const labels = response.data.responses[0].labelAnnotations;
      setResult(labels);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Unable to identify the plant. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error identifying plant:', error.response?.data || error);
    }

    setLoading(false);
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

        <Button
          colorScheme="green"
          onClick={identifyPlant}
          isLoading={loading}
          disabled={!image || loading}
          loadingText="Identifying..."
          size="lg"
        >
          Identify Plant
        </Button>
      </VStack>

      {loading && <Spinner size="xl" color="green.500" mt={8} />}

      {result && (
        <Box mt={8}>
          <Heading as="h2" size="md" color="green.600" mb={4}>
            Identification Results:
          </Heading>
          <List spacing={3}>
            {result.map((label, index) => (
              <ListItem key={index}>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                {label.description} - Confidence:{' '}
                {(label.score * 100).toFixed(2)}%
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default PlantIdentifier;
