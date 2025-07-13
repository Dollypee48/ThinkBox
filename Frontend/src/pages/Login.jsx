import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setForm({ ...form, showPassword: !form.showPassword });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: form.email, password: form.password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">Welcome Back 👋</h2>
        <p className="text-sm text-gray-600 text-center mb-6">Login to your ThinkBox account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type={form.showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <input type="checkbox" id="showPass" onChange={togglePassword} />
            <label htmlFor="showPass">Show Password</label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white w-full py-2 rounded font-semibold transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-purple-600 font-medium hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
