import { useState } from 'react';
import Avatar from './Avatar.jsx';
import { formatRelative } from '../utils/date.js';

const Sidebar = ({ users, selectedUser, onSelectUser, currentUser, unreadCounts = {} }) => {
  const [search, setSearch] = useState('');

  const filtered = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside
      style={{
        width: 300,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)',
        height: '100%',
      }}
    >
      {/* Header */}
      <div style={{ padding: '18px 16px 12px', borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
          <Avatar src={currentUser?.avatar} username={currentUser?.username} size={38} online />
          <div>
            <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              {currentUser?.username}
            </p>
            <p style={{ fontSize: '0.72rem', color: 'var(--online)' }}>● Online</p>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <svg
            width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search users…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-base"
            style={{ paddingLeft: 30, fontSize: '0.82rem', borderRadius: 8 }}
          />
        </div>
      </div>

      {/* User list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 8px' }}>
        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 24 }}>
            No users found
          </p>
        ) : (
          filtered.map((u) => {
            const isSelected = selectedUser?._id === u._id;
            const unread = unreadCounts[u._id] || 0;
            return (
              <button
                key={u._id}
                onClick={() => onSelectUser(u)}
                className="flex items-center gap-3 w-full animate-slide-left"
                style={{
                  padding: '10px 10px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))'
                    : 'transparent',
                  borderLeft: isSelected ? '3px solid var(--accent)' : '3px solid transparent',
                  transition: 'background 0.2s',
                  width: '100%',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = 'var(--bg-hover)'; }}
                onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
              >
                <Avatar src={u.avatar} username={u.username} size={42} online={u.isOnline} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex items-center justify-between">
                    <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {u.username}
                    </p>
                    {unread > 0 && (
                      <span style={{
                        background: 'var(--accent)', color: '#fff',
                        borderRadius: '50%', minWidth: 18, height: 18,
                        fontSize: '0.68rem', fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '0 4px',
                      }}>
                        {unread}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.72rem', color: u.isOnline ? 'var(--online)' : 'var(--text-muted)' }}>
                    {u.isOnline ? '● Online' : `Last seen ${formatRelative(u.lastSeen)}`}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
