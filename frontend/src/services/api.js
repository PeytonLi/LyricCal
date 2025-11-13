import axios from 'axios';

// original
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// edited version
const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const searchSongs = async (query) => {
  try {
    const response = await api.get(`/api/search/song?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/api/user/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await api.post('/api/auth/verify', { token });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
