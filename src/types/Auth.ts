export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
