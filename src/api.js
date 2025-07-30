// ../api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('seller_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  try {
    const csrfResponse = await axios.get('http://localhost:8000/api/csrf-token');
    config.headers['X-CSRF-TOKEN'] = csrfResponse.data.csrf_token;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
  }
  return config;
});
   
export default api;