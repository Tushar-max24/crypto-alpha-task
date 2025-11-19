import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-card-dark/80 backdrop-blur-md shadow-lg">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-xl font-semibold tracking-wide">
          <span className="text-accent">Crypto</span> Alpha
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="text-sm text-gray-300 hover:text-accent transition"
        >
          Dashboard
        </Link>
        <Link
          to="/profile"
          className="text-sm text-gray-300 hover:text-accent transition"
        >
          Profile
        </Link>
        {user && (
          <span className="text-xs text-gray-400 hidden sm:inline">
            Hi, {user.name}
          </span>
        )}
        {user && (
          <button
            onClick={logout}
            className="px-3 py-1.5 text-xs rounded-full border border-accent hover:bg-accent hover:text-bg-dark transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
