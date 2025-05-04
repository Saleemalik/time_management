import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Attach token if available
const token = localStorage.getItem('accessToken');
if (token) {
  instance.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export default instance;
