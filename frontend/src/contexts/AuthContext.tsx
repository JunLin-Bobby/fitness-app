import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

interface User {
  name?: string;
  username?: string;
  email?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (u: User | null) => void;
  login: (u: string, p: string) => Promise<void>;
  logout: () => void;
  setIsAuthenticated: (v: boolean) => void;
}

// 建立 Context
const AuthContext = createContext<AuthContextType | null>(null);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Provider 组件
export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // 初始化时可检查 localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          setUser({ name: data.name, username: data.username, email: data.email });
        })
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const token = await authService.loginAPI(email, password);
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setUser({ name: data.name, username: data.username, email: data.email });
      })
      .catch(() => setUser(null));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser, login, logout, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// 自定义 Hook，组件直接调用
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
