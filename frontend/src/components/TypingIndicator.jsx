const TypingIndicator = () => (
  <div className="flex items-center gap-2 px-4 py-2 animate-fade-in">
    <div className="flex items-end gap-1 px-3 py-2 rounded-2xl rounded-bl-sm" style={{ background: 'var(--bg-surface)' }}>
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>typing…</span>
  </div>
);

export default TypingIndicator;
