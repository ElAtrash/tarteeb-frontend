import { FC, createContext, useContext, useState, useEffect, ReactNode } from "react";
import { message } from "antd";
import { User, LoginCredentials, RegisterData } from "../types/Auth";
import { login, register, getCurrentUser } from "../services/authService";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          logout();
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [token]);

  const loginUser = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { token: newToken, user: userData } = await login(credentials);

      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);

      message.success("Login successful!");
      return true;
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (data: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { token: newToken, user: userData } = await register(data);

      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);

      message.success("Registration successful!");
      return true;
    } catch (error) {
      message.error("Registration failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    message.info("You have been logged out");
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login: loginUser,
    register: registerUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
