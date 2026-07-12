const EmptyChat = () => (
  <div
    className="flex flex-col items-center justify-center h-full gap-5 animate-fade-in"
    style={{ color: 'var(--text-muted)' }}
  >
    <div
      style={{
        width: 90, height: 90, borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '2.5rem',
      }}
    >
      💬
    </div>
    <div className="text-center">
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
        Select a conversation
      </h3>
      <p style={{ fontSize: '0.85rem', maxWidth: 220 }}>
        Pick someone from the sidebar to start chatting in real-time
      </p>
    </div>
  </div>
);

export default EmptyChat;
