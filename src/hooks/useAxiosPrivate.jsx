import axios from 'axios';

const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_ADDRESS,
});

const useAxiosPrivate = () => {
  axiosPrivate.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      // Return error message
      console.error('Request failed:', error.message);
      return Promise.reject(error);
    }
  );
};

export default useAxiosPrivate;
