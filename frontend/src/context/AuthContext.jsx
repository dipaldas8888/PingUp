import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { registerAPI, loginAPI, getMeAPI, logoutAPI } from '../api/auth.api.js';
import { connectSocket, disconnectSocket } from '../socket/socket.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('pingup_token');
      if (token) {
        try {
          const res = await getMeAPI();
          setUser(res.data.data.user);
          connectSocket(token);
        } catch {
          localStorage.removeItem('pingup_token');
        }
      }
      setLoading(false);
    };
    init();
  }, []);

  const register = useCallback(async (username, email, password) => {
    const res = await registerAPI({ username, email, password });
    const { user: u, token } = res.data.data;
    localStorage.setItem('pingup_token', token);
    setUser(u);
    connectSocket(token);
    toast.success(`Welcome, ${u.username}! 🎉`);
    return u;
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await loginAPI({ email, password });
    const { user: u, token } = res.data.data;
    localStorage.setItem('pingup_token', token);
    setUser(u);
    connectSocket(token);
    toast.success(`Welcome back, ${u.username}!`);
    return u;
  }, []);

  const logout = useCallback(async () => {
    try { await logoutAPI(); } catch { /* ignore */ }
    localStorage.removeItem('pingup_token');
    disconnectSocket();
    setUser(null);
    toast.success('Logged out');
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
