import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

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

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: null,
  setToken: (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token) as { sub: string; email: string; name: string };
    set({ token, user: { id: decoded.sub, email: decoded.email, name: decoded.name } });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));