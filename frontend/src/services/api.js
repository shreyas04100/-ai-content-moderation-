import axios from 'axios';

const API_BASE_URL = 'https://ai-content-moderation.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeText = async (text) => {
  try {
    const response = await api.post('/analyze-text', { text });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to analyze text' };
  }
};

export const checkFakeNews = async (title, content) => {
  try {
    const response = await api.post('/check-fake-news', { title, content });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to check fake news' };
  }
};

export const analyzeImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await axios.post(`${API_BASE_URL}/analyze-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to analyze image' };
  }
};

export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'API is not responding' };
  }
};

export default api;
