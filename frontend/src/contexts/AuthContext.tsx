import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (u: string, p: string) => Promise<void>;
  logout: () => void;
  setIsAuthenticated: (v: boolean) => void; // 新增
}

// 建立 Context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider 组件
export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 初始化时可检查 localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // 如需验证 token 有效性，可再加 API call
    }
  }, []);

  const login = async (username: string, password: string) => {
    const token = await authService.loginAPI(username, password);
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    //authService.logoutAPI();
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, setIsAuthenticated }}>
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
