import axios from 'axios';
import { LoginCredentials, RegisterData, AuthResponse, User } from '../types/Auth';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;

// Custom axios instance for auth requests
const authApi = axios.create({
  baseURL: `${apiUrl}/api/${apiVersion}`,
});

// Request interceptor to include the token in requests
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await authApi.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await authApi.post<AuthResponse>('/auth/register', data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await authApi.get<{ user: User }>('/auth/me');
    return response.data.user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};
