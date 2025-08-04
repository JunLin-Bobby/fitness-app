import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // 登出後導回登入頁，或你想要的任何頁面
  };

  return (
    <nav className="bg-[#F5F5DC] text-gray-600 fixed top-0 left-0 w-full px-6 py-3 flex justify-between items-center shadow-md">
      <div className="text-2xl font-semibold">Fitness Tracker</div>
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-[#56C68D] text-gray-600 rounded hover:opacity-90 transition"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-[#56C68D] text-gray-600 rounded hover:opacity-90 transition"
        >
          Login
        </button>
      )}
    </nav>
  );
}
