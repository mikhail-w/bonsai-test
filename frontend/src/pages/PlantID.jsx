import React, { useState } from 'react';
import axios from 'axios';

const PlantID = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const PLANT_ID_KEY = import.meta.env.GOOGLE_VISION_API_KEY;

  const handleImageUpload = e => {
    setImage(e.target.files[0]);
  };

  const identifyPlant = async () => {
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
      console.error('Error identifying plant:', error);
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
          <p>{result?.suggestions[0]?.plant_name}</p>
          <p>Probability: {result?.suggestions[0]?.probability}</p>
        </div>
      )}
    </div>
  );
};

export default PlantID;
