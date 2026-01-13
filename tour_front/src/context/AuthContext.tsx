import React, { createContext, useState, useContext, ReactNode } from 'react';
import { authAPI } from '../api/client';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('user');
      if (!stored) return null;
      const parsed = JSON.parse(stored) as User;
      if (parsed && parsed.picture && !/^(https?:)?\/\//.test(parsed.picture)) {
        const api = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api/v1';
        const origin = api.replace(/\/api\/v1\/?$/, '');
        const path = parsed.picture.startsWith('/') ? parsed.picture : `/${parsed.picture}`;
        parsed.picture = `${origin}${path}`;
      }
      return parsed;
    } catch (e) {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      
      if (response.data.success) {
        const { user: userData, token: authToken } = response.data.data;
        // normalize picture
        if (userData && (userData as any).picture && !/^(https?:)?\/\//.test((userData as any).picture)) {
          const api = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api/v1';
          const origin = api.replace(/\/api\/v1\/?$/, '');
          const pic = (userData as any).picture;
          const path = pic.startsWith('/') ? pic : `/${pic}`;
          (userData as any).picture = `${origin}${path}`;
        }
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || 'Login failed';
      console.error('Login error:', errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      let response;
      if (userData instanceof FormData) {
        response = await authAPI.registerForm(userData);
      } else {
        response = await authAPI.register(userData);
      }

      if (response.data.success) {
        const user = response.data.data;
        // remove sensitive fields if present
        if ((user as any).password) delete (user as any).password;
        // normalize picture
        if (user && (user as any).picture && !/^(https?:)?\/\//.test((user as any).picture)) {
          const api = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api/v1';
          const origin = api.replace(/\/api\/v1\/?$/, '');
          const pic = (user as any).picture;
          const path = pic.startsWith('/') ? pic : `/${pic}`;
          (user as any).picture = `${origin}${path}`;
        }
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || 'Registration failed';
      console.error('Register error:', errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
