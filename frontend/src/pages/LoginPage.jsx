import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const { login }     = useAuth();
  const navigate      = useNavigate();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error('All fields are required');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-primary)' }}>
      {/* Left panel */}
      <div className="hidden md:flex flex-col items-center justify-center flex-1" style={{ background: 'linear-gradient(135deg, #1a1a35, #0d0d1a)', borderRight: '1px solid var(--border)' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>⚡</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 12 }}>
          PingUp
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 280, textAlign: 'center', lineHeight: 1.6 }}>
          Real-time chat with lightning speed. Stay connected with your team.
        </p>
        <div className="flex gap-6" style={{ marginTop: 40 }}>
          {['🔒 Secure', '⚡ Real-time', '🌐 Anywhere'].map((f) => (
            <span key={f} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>{f}</span>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-col items-center justify-center flex-1" style={{ padding: '40px 24px' }}>
        <div className="animate-scale-in" style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ marginBottom: 32, textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>⚡</div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 6 }}>Welcome back</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Sign in to your PingUp account</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Email</label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input-base"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-base"
              />
            </div>

            <button id="login-submit" type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', marginTop: 4 }}>
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
