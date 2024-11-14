import { Link } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { Car, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">CarManager</span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="inline-flex items-center space-x-1 text-gray-700 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}