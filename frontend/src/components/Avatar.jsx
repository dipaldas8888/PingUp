const Avatar = ({ src, username = '?', size = 40, online = false }) => {
  const initials = username.slice(0, 2).toUpperCase();
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
  const color = colors[username.charCodeAt(0) % colors.length];

  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
      {src ? (
        <img
          src={src}
          alt={username}
          style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
        />
      ) : (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${color}, ${color}cc)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: size * 0.38,
            fontWeight: 600,
            color: '#fff',
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
      )}
      {online && (
        <span
          style={{
            position: 'absolute',
            bottom: 1,
            right: 1,
            width: Math.max(size * 0.27, 10),
            height: Math.max(size * 0.27, 10),
            borderRadius: '50%',
            background: 'var(--online)',
            border: '2px solid var(--bg-secondary)',
          }}
        />
      )}
    </div>
  );
};

export default Avatar;
