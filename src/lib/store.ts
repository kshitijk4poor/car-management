import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL, logout } from './api';

interface AuthState {
  token: string | null;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const token = localStorage.getItem('token');
  let user = null;
  
  if (token) {
    try {
      const decoded = jwtDecode(token) as { sub: string; email: string; name: string };
      user = { id: decoded.sub, email: decoded.email, name: decoded.name };
    } catch (e) {
      localStorage.removeItem('token');
    }
  }

  return {
    token,
    user,
    setToken: (token) => {
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token) as { sub: string; email: string; name: string };
      set({ token, user: { id: decoded.sub, email: decoded.email, name: decoded.name } });
    },
    logout: () => {
      logout().finally(() => {
        localStorage.removeItem('token');
        set({ token: null, user: null });
        window.location.href = '/login';
      });
    },
  };
});

export const getImageUrl = (path: string) => {
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};