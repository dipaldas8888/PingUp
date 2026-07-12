import { useState, useEffect, useRef, useCallback } from 'react';
import { getMessagesAPI } from '../api/message.api.js';
import { getSocket } from '../socket/socket.js';
import { useAuth } from '../context/AuthContext.jsx';
import MessageBubble from './MessageBubble.jsx';
import MessageInput from './MessageInput.jsx';
import TypingIndicator from './TypingIndicator.jsx';
import toast from 'react-hot-toast';

const ChatWindow = ({ selectedUser }) => {
  const { user } = useAuth();
  const [messages, setMessages]     = useState([]);
  const [isTyping, setIsTyping]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const bottomRef                   = useRef(null);
  const typingTimeoutRef            = useRef(null);

  // Load chat history
  useEffect(() => {
    if (!selectedUser) return;
    const load = async () => {
      setLoading(true);
      try {
        const res = await getMessagesAPI(selectedUser._id);
        setMessages(res.data.data.messages);
      } catch {
        toast.error('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };
    load();
    setIsTyping(false);
  }, [selectedUser]);

  // Socket listeners
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const onMessage = (msg) => {
      const isRelevant =
        (msg.sender._id === selectedUser?._id && msg.receiver._id === user._id) ||
        (msg.sender._id === user._id && msg.receiver._id === selectedUser?._id);
      if (isRelevant) setMessages((prev) => [...prev, msg]);
    };

    const onTyping = ({ senderId }) => {
      if (senderId === selectedUser?._id) {
        setIsTyping(true);
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 3000);
      }
    };

    const onStopTyping = ({ senderId }) => {
      if (senderId === selectedUser?._id) setIsTyping(false);
    };

    socket.on('receive_message', onMessage);
    socket.on('typing', onTyping);
    socket.on('stop_typing', onStopTyping);

    return () => {
      socket.off('receive_message', onMessage);
      socket.off('typing', onTyping);
      socket.off('stop_typing', onStopTyping);
      clearTimeout(typingTimeoutRef.current);
    };
  }, [selectedUser, user]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = useCallback((text) => {
    const socket = getSocket();
    if (!socket || !selectedUser) return;
    socket.emit('send_message', { receiverId: selectedUser._id, message: text });
  }, [selectedUser]);

  const handleTyping = useCallback(() => {
    const socket = getSocket();
    if (socket && selectedUser) socket.emit('typing', { receiverId: selectedUser._id });
  }, [selectedUser]);

  const handleStopTyping = useCallback(() => {
    const socket = getSocket();
    if (socket && selectedUser) socket.emit('stop_typing', { receiverId: selectedUser._id });
  }, [selectedUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {messages.length === 0 && (
          <p className="text-center animate-fade-in" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 32 }}>
            No messages yet. Say hello! 👋
          </p>
        )}
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            isMine={msg.sender._id === user._id || msg.sender === user._id}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <MessageInput
        onSend={handleSend}
        onTyping={handleTyping}
        onStopTyping={handleStopTyping}
      />
    </div>
  );
};

export default ChatWindow;
