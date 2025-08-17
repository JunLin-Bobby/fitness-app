import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-8 py-3 bg-gray-900 shadow text-white">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-2xl font-bold hover:text-yellow-300">
          Fitness Tracker
        </Link>
        <Link to="/" className="text-lg hover:text-yellow-300">
          Home
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated && user && (
          <span className="font-semibold">{user.name || user.username}</span>
        )}
        {isAuthenticated ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
