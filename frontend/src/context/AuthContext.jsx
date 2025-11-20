import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Use saved token after refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && !user) {
      api.get("/profile/me")
        .then(res => {
          setUser(res.data);
          setToken(savedToken);
        })
        .catch(() => logout());
    }
  }, []);

  const login = (jwt, userData) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
