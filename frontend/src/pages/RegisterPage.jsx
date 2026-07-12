import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const { register }  = useAuth();
  const navigate      = useNavigate();
  const [form, setForm]       = useState({ username: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) return toast.error('All fields are required');
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-primary)' }}>
      {/* Left panel */}
      <div className="hidden md:flex flex-col items-center justify-center flex-1" style={{ background: 'linear-gradient(135deg, #1a1a35, #0d0d1a)', borderRight: '1px solid var(--border)' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>💬</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 12 }}>
          Join PingUp
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 280, textAlign: 'center', lineHeight: 1.6 }}>
          Create your account and start real-time conversations instantly.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex flex-col items-center justify-center flex-1" style={{ padding: '40px 24px' }}>
        <div className="animate-scale-in" style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ marginBottom: 28, textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>🚀</div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 6 }}>Create account</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Join thousands of users on PingUp</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { name: 'username', label: 'Username', type: 'text', placeholder: 'johndoe', id: 'reg-username' },
              { name: 'email',    label: 'Email',    type: 'email', placeholder: 'you@example.com', id: 'reg-email' },
              { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••', id: 'reg-password' },
              { name: 'confirm',  label: 'Confirm Password', type: 'password', placeholder: '••••••••', id: 'reg-confirm' },
            ].map(({ name, label, type, placeholder, id }) => (
              <div key={name}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>{label}</label>
                <input
                  id={id}
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="input-base"
                />
              </div>
            ))}

            <button id="reg-submit" type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', marginTop: 4 }}>
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
