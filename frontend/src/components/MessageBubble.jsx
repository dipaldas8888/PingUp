import { useAuth } from '../context/AuthContext.jsx';
import { formatMessageTime } from '../utils/date.js';

const MessageBubble = ({ message, isMine }) => {
  const { user } = useAuth();

  return (
    <div
      className="flex items-end gap-2 animate-fade-up"
      style={{ flexDirection: isMine ? 'row-reverse' : 'row', padding: '2px 16px' }}
    >
      <div
        style={{
          maxWidth: '70%',
          padding: '10px 14px',
          borderRadius: isMine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          background: isMine
            ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
            : 'var(--bg-surface)',
          color: isMine ? '#fff' : 'var(--text-primary)',
          boxShadow: isMine ? '0 4px 16px rgba(99,102,241,0.3)' : '0 2px 8px rgba(0,0,0,0.2)',
          wordBreak: 'break-word',
        }}
      >
        <p style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>{message.message}</p>
        <div className="flex items-center gap-1" style={{ marginTop: 4, justifyContent: isMine ? 'flex-end' : 'flex-start' }}>
          <span style={{ fontSize: '0.7rem', opacity: 0.65 }}>
            {formatMessageTime(message.createdAt)}
          </span>
          {isMine && (
            <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>
              {message.read ? '✓✓' : message.delivered ? '✓✓' : '✓'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
