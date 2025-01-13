import axios from 'axios';

const API_URL = '/api/quotes/';

// Get random quote
const getRandomQuote = async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Optional, include only if your API requires cookies
    };

    const response = await axios.get(`${API_URL}random/`, config);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      error.message ||
      'Failed to fetch quote';
    throw new Error(message);
  }
};

const quoteService = {
  getRandomQuote,
};

export default quoteService;
