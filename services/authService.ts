/**
 * Auth Service
 * Handle login, register, dan user session
 */

import api, { setAuthToken } from './api.js';

interface LoginResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
    token: string;
  };
}

interface UserResponse {
  success: boolean;
  data: {
    id: string;
    email: string;
    name: string;
    role: string;
    department?: string;
    phone?: string;
    avatar?: string;
  };
}

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post<LoginResponse>('/auth/login', { email, password });
    if (response.success && response.data.token) {
      setAuthToken(response.data.token);
    }
    return response.data;
  },

  register: async (data: { email: string; password: string; name: string; role?: string }) => {
    const response = await api.post<LoginResponse>('/auth/register', data);
    if (response.success && response.data.token) {
      setAuthToken(response.data.token);
    }
    return response.data;
  },

  logout: () => {
    setAuthToken(null);
  },

  getMe: async () => {
    const response = await api.get<UserResponse>('/auth/me');
    return response.data;
  },

  updateProfile: async (data: { name?: string; phone?: string; avatar?: string }) => {
    const response = await api.put<UserResponse>('/auth/profile', data);
    return response.data;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;
