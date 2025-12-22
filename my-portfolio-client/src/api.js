import axios from 'axios';
import router from './router';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      
      const currentRouteName = router.currentRoute.value.name;

      if (currentRouteName !== 'Login' && currentRouteName !== 'Register') {
        localStorage.removeItem('token');
        router.push('/login');
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
