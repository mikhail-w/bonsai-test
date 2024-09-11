import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  Text,
  Spinner,
  Image,
  useToast,
} from '@chakra-ui/react';

const PlantID = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const PLANT_ID_KEY = import.meta.env.GOOGLE_VISION_API_KEY; // Ensure this is set up correctly
  const toast = useToast();

  const handleImageUpload = e => {
    setImage(e.target.files[0]);
  };

  const identifyPlant = async () => {
    if (!image) {
      toast({
        title: 'No image selected',
        description: 'Please upload an image before identifying the plant.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('organs', 'auto');
    formData.append('images', image);

    try {
      const response = await axios.post(
        'https://api.plant.id/v2/identify',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Api-Key': PLANT_ID_KEY, // Replace with your Plant.id API key
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an issue identifying the plant.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      p={8}
      mt={10}
      boxShadow="xl"
      borderRadius="md"
      bg="white"
      textAlign="center"
    >
      <Text
        fontFamily={'lato'}
        fontWeight={400}
        font
        size={'3rem'}
        as="h1"
        mb={6}
        fontSize="2xl"
        color="green.600"
      >
        Plant Identification
      </Text>

      <VStack spacing={5}>
        <Input
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
          size="lg"
          borderColor="green.300"
          focusBorderColor="green.500"
        />

        <Button
          onClick={identifyPlant}
          isLoading={loading}
          loadingText="Identifying..."
          disabled={!image || loading}
          size="lg"
          colorScheme="green"
        >
          Identify Plant
        </Button>
      </VStack>

      {result && (
        <Box mt={8} textAlign="center">
          <Heading as="h2" size="lg" color="green.600" mb={4}>
            Results
          </Heading>
          <Text fontSize="xl" fontWeight="bold">
            Plant Name: {result?.suggestions[0]?.plant_name || 'N/A'}
          </Text>
          <Text fontSize="lg">
            Probability:{' '}
            {(result?.suggestions[0]?.probability * 100).toFixed(2)}%
          </Text>
          {result.suggestions[0].similar_images && (
            <Box mt={4}>
              <Image
                src={result.suggestions[0].similar_images[0].url}
                alt="Plant"
                boxSize="200px"
                mx="auto"
                borderRadius="md"
                boxShadow="md"
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PlantID;
