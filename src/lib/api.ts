import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

export const createCar = async (carData: {
  title: string;
  description: string;
  tags: string[];
  images: string[];
}) => {
  const { data } = await api.post('/cars', carData);
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