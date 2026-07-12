import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      gap: 20,
    }}
    className="animate-fade-in"
  >
    <div style={{ fontSize: '6rem', lineHeight: 1 }}>🌀</div>
    <h1 style={{ fontSize: '5rem', fontWeight: 900, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
      404
    </h1>
    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Oops! Page not found.</p>
    <Link
      to="/"
      className="btn-primary"
      style={{ textDecoration: 'none', marginTop: 8 }}
    >
      ← Back to Chat
    </Link>
  </div>
);

export default NotFoundPage;
