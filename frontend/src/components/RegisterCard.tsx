// src/components/RegisterCard.tsx
import React from 'react';

interface RegisterCardProps {
  username: string;
  setUsername: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  error: string | null;
  handleSubmit: (e: React.FormEvent) => void;
}

const RegisterCard: React.FC<RegisterCardProps> = ({
  username, setUsername,
  email, setEmail,
  password, setPassword,
  error, handleSubmit,
}) => (
  <div className="w-96  mx-auto p-6 bg-white rounded shadow">
    <h2 className="text-2xl font-bold mb-4">Register</h2>
    {error && <p className="text-red-600 mb-4">{error}</p>}
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded hover:opacity-90 transition"
      >
        Create Account
      </button>
    </form>
  </div>
);

export default RegisterCard;
