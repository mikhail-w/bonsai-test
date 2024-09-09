import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.PLANT_ID_API_KEY; // Replace with your valid API key

const PlantIdentifier = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
      // Remove the "data:image/jpeg;base64," prefix if it's present
      const imageWithoutPrefix = base64Image.split(',')[1];
      identifyPlant(imageWithoutPrefix);
    }
  };

  const identifyPlant = async base64Image => {
    setLoading(true);

    // Request payload for Google Cloud Vision API
    const body = {
      requests: [
        {
          image: {
            content: base64Image, // Base64-encoded image without the data prefix
          },
          features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
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
      console.error('Error identifying plant:', error.response?.data || error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Identify a Plant</h1>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={identifyPlant} disabled={!image || loading}>
        {loading ? 'Identifying...' : 'Identify Plant'}
      </button>
      {result && (
        <div>
          <h2>Results:</h2>
          <ul>
            {result.map((label, index) => (
              <li key={index}>
                {label.description} - Confidence:{' '}
                {(label.score * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlantIdentifier;
