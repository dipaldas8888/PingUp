import { useAuth } from '../context/AuthContext.jsx';
import Avatar from './Avatar.jsx';

const Navbar = ({ selectedUser }) => {
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
        flexShrink: 0,
      }}
    >
      {/* Logo / Selected user */}
      <div className="flex items-center gap-3">
        {selectedUser ? (
          <>
            <Avatar src={selectedUser.avatar} username={selectedUser.username} size={34} online={selectedUser.isOnline} />
            <div>
              <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{selectedUser.username}</p>
              <p style={{ fontSize: '0.72rem', color: selectedUser.isOnline ? 'var(--online)' : 'var(--text-muted)' }}>
                {selectedUser.isOnline ? '● Online' : 'Offline'}
              </p>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <div style={{ fontSize: '1.4rem' }}>⚡</div>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              PingUp
            </span>
          </div>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', borderRadius: 8,
          border: '1px solid var(--border)', background: 'transparent',
          color: 'var(--text-secondary)', fontSize: '0.82rem',
          cursor: 'pointer', transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--danger)'; e.currentTarget.style.color = 'var(--danger)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </header>
  );
};

export default Navbar;
