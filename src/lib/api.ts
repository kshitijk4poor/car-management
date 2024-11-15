import axios from 'axios';

export const BASE_URL = 'https://car-management-api-cw20.onrender.com';

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth state
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string) => {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);
  const { data } = await api.post('/users/login', formData);
  return data;
};

export const register = async (email: string, password: string, name: string) => {
  const { data } = await api.post('/users/register', { email, password, name });
  return data;
};

export const logout = async () => {
  try {
    await api.post('/users/logout');
  } catch (error) {
    // Ignore any errors during logout
    console.error('Logout error:', error);
  }
};

export const createCar = async (formData: FormData) => {
  const { data } = await api.post('/cars', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const getCars = async (search?: string) => {
  const { data } = await api.get('/cars', { params: { search } });
  return data;
};

export const getCar = async (id: string) => {
  const { data } = await api.get(`/cars/${id}`);
  return data;
};

export const updateCar = async (
  id: string,
  carData: {
    title: string;
    description: string;
    tags: string[];
    images: string[];
  }
) => {
  const { data } = await api.put(`/cars/${id}`, carData);
  return data;
};

export const deleteCar = async (id: string) => {
  const { data } = await api.delete(`/cars/${id}`);
  return data;
};

export const getImageUrl = (path: string) => {
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};