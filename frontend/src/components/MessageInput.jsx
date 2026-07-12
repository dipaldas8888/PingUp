import { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

const MessageInput = ({ onSend, onTyping, onStopTyping, disabled }) => {
  const [text, setText]           = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const typingTimer               = useRef(null);
  const inputRef                  = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
    onTyping?.();
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => onStopTyping?.(), 1500);
  };

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
    clearTimeout(typingTimer.current);
    onStopTyping?.();
    inputRef.current?.focus();
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const onEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
    setShowEmoji(false);
    inputRef.current?.focus();
  };

  useEffect(() => () => clearTimeout(typingTimer.current), []);

  return (
    <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)', position: 'relative' }}>
      {showEmoji && (
        <div style={{ position: 'absolute', bottom: '72px', left: '16px', zIndex: 50 }}>
          <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" height={380} width={320} />
        </div>
      )}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowEmoji((v) => !v)}
          style={{
            width: 38, height: 38, borderRadius: 10, border: '1px solid var(--border)',
            background: showEmoji ? 'var(--accent-glow)' : 'var(--bg-surface)',
            color: 'var(--text-secondary)', fontSize: '1.2rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          title="Emoji"
        >
          😊
        </button>

        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKey}
          placeholder="Type a message…"
          disabled={disabled}
          className="input-base"
          style={{ flex: 1, borderRadius: 10 }}
        />

        <button
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          className="btn-primary"
          style={{ width: 42, height: 38, padding: 0, borderRadius: 10, flexShrink: 0 }}
          title="Send"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
