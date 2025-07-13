import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-purple-700">ThinkBox 🧠</Link>
      
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-purple-700 font-medium">Dashboard</Link>
            <Link to="/submit" className="text-gray-700 hover:text-purple-700 font-medium">Submit Problem</Link>
            <Link to="/problems" className="text-gray-700 hover:text-purple-700 font-medium">My Problems</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-purple-700 font-medium">Login</Link>
            <Link to="/register" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}
