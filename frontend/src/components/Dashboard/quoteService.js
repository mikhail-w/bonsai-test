// src/features/quotes/quoteService.js
import axios from 'axios';

const API_URL = '/api/quotes/';

// Helper function to get token from localStorage
const getToken = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { access } = JSON.parse(userInfo);
    return access;
  }
  return null;
};

// Get random quote
const getRandomQuote = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
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
