import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/register", form);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.msg ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full bg-card-dark/90 rounded-3xl p-6 shadow-2xl border border-gray-800">
        <h1 className="text-2xl font-semibold mb-1">
          Create your <span className="text-accent">Crypto Alpha</span> account
        </h1>
        <p className="text-xs text-gray-400 mb-4">
          Start tracking your crypto trading signals.
        </p>

        {error && (
          <div className="mb-3 text-xs text-red-400 bg-red-500/10 px-3 py-2 rounded-xl">
            {error}
          </div>
        )}

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-xl bg-bg-dark border border-gray-700 text-xs focus:outline-none focus:border-accent"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-xl bg-bg-dark border border-gray-700 text-xs focus:outline-none focus:border-accent"
          />
          <input
            name="password"
            type="password"
            placeholder="Password (min 6 chars)"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full px-3 py-2 rounded-xl bg-bg-dark border border-gray-700 text-xs focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-accent text-bg-dark text-xs font-semibold hover:opacity-90 transition mt-2"
          >
            Sign up
          </button>
        </form>

        <p className="mt-3 text-xs text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
