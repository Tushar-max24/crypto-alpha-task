import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const countries = ["India", "USA", "UK", "Canada", "Germany", "Australia"];

const Profile = () => {
  const { user, login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    bio: "",
    notifications: true,
    theme: "dark",
  });
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile/me");
      setForm({
        name: res.data.name,
        email: res.data.email,
        country: res.data.country || "",
        bio: res.data.bio || "",
        notifications:
          res.data.notifications !== undefined
            ? res.data.notifications
            : true,
        theme: res.data.theme || "dark",
      });
      setAvatar(res.data.avatar || null);
      login(localStorage.getItem("token"), res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Fake avatar upload (local preview only)
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setAvatar(preview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await api.put("/profile/me", form);
      login(localStorage.getItem("token"), res.data);
      setStatus("Profile updated successfully 🎉");
    } catch (err) {
      setStatus("Failed to update profile ❌");
    }
  };

  const initials = form.name
    ? form.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="min-h-screen flex flex-col bg-bg-dark text-slate-100">
      <Navbar />
      <main className="flex-1 px-4 md:px-8 py-10 flex justify-center">
        <div className="bg-card-dark/80 border border-slate-700 rounded-3xl p-8 w-full max-w-2xl shadow-xl backdrop-blur-md">
          <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
          <p className="text-xs text-gray-400 mb-6">
            Manage your personal info and preferences.
          </p>

          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="w-20 h-20 rounded-full bg-accent/20 border border-accent flex items-center justify-center overflow-hidden shadow-lg">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-accent">
                  {initials}
                </span>
              )}
            </div>
            <label className="text-xs cursor-pointer border px-3 py-1 rounded-full hover:bg-accent hover:text-bg-dark transition">
              Upload photo
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          </div>

          {status && (
            <div className="mb-3 text-xs text-accent bg-accent/10 px-3 py-2 rounded-xl">
              {status}
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-xl bg-bg-dark border border-slate-600 text-xs focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Email</label>
              <input
                value={form.email}
                disabled
                className="w-full px-3 py-2 rounded-xl bg-slate-900/50 border border-slate-700 text-xs text-gray-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Country</label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-bg-dark border border-slate-600 text-xs"
              >
                <option value="">Select country</option>
                {countries.map((c, i) => (
                  <option key={i}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">
                About You (Bio)
              </label>
              <textarea
                name="bio"
                rows="3"
                placeholder="Short bio or description..."
                value={form.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-bg-dark border border-slate-600 text-xs"
              />
            </div>

            {/* Toggles */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-300">Enable notifications</span>
              <input
                type="checkbox"
                name="notifications"
                checked={form.notifications}
                onChange={handleChange}
                className="w-4 h-4 accent-accent"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Theme</label>
              <select
                name="theme"
                value={form.theme}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-bg-dark border border-slate-600 text-xs"
              >
                <option value="dark">Dark (default)</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-accent text-bg-dark text-xs font-semibold hover:opacity-90 transition mt-2"
            >
              Save changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
