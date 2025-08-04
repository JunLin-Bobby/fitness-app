import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AuthCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();      // 用 context 提供的 login
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // 用 context 的 login function
      await login(email, password);
      navigate('/'); // 登入成功導回首頁（用 navigate 替代 window.location.href，更 react 化）
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-80">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 font-semibold hover:bg-blue-600"
        >
          Login
        </button>
        <Link to="/register" className="text-blue-600 underline ml-1">
          Register here
        </Link>
      </form>
    </div>
  );
}
