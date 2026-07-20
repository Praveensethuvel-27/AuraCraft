import axios from 'axios';

const axiosClient = axios.create({
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Client-Version': '1.0.0-auracraft',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    // Inject any required API tokens or session headers if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Client Error:', error?.response || error?.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
