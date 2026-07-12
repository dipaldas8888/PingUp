import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { getUsersAPI } from '../api/user.api.js';
import { getSocket } from '../socket/socket.js';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import ChatWindow from '../components/ChatWindow.jsx';
import EmptyChat from '../components/EmptyChat.jsx';
import toast from 'react-hot-toast';

const ChatPage = () => {
  const { user }                          = useAuth();
  const [users, setUsers]                 = useState([]);
  const [selectedUser, setSelectedUser]   = useState(null);
  const [unreadCounts, setUnreadCounts]   = useState({});

  // Load all users
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getUsersAPI();
        setUsers(res.data.data.users);
      } catch {
        toast.error('Failed to load users');
      }
    };
    load();
  }, []);

  // Socket: online/offline updates + unread tracking
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const onOnline = ({ userId }) => {
      setUsers((prev) => prev.map((u) => u._id === userId ? { ...u, isOnline: true } : u));
    };
    const onOffline = ({ userId }) => {
      setUsers((prev) => prev.map((u) => u._id === userId ? { ...u, isOnline: false, lastSeen: new Date() } : u));
    };
    const onMessage = (msg) => {
      // If message is from someone other than the selected chat, increment unread
      const senderId = msg.sender._id || msg.sender;
      if (senderId !== user._id && senderId !== selectedUser?._id) {
        setUnreadCounts((prev) => ({ ...prev, [senderId]: (prev[senderId] || 0) + 1 }));
      }
    };

    socket.on('user_online', onOnline);
    socket.on('user_offline', onOffline);
    socket.on('receive_message', onMessage);

    return () => {
      socket.off('user_online', onOnline);
      socket.off('user_offline', onOffline);
      socket.off('receive_message', onMessage);
    };
  }, [user, selectedUser]);

  const handleSelectUser = (u) => {
    setSelectedUser(u);
    // Clear unread count
    setUnreadCounts((prev) => ({ ...prev, [u._id]: 0 }));
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      <Navbar selectedUser={selectedUser} />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <Sidebar
          users={users}
          selectedUser={selectedUser}
          onSelectUser={handleSelectUser}
          currentUser={user}
          unreadCounts={unreadCounts}
        />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-primary)' }}>
          {selectedUser ? (
            <ChatWindow key={selectedUser._id} selectedUser={selectedUser} />
          ) : (
            <EmptyChat />
          )}
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
