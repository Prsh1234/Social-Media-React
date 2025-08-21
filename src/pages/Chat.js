import { useEffect, useState, useRef, useCallback } from "react";
import "../css/Chat.css";
import { doGetChats, doSendMessage } from "../services/chat";

const Chat = ({ friend, user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom only on new messages
  useEffect(() => {
    if (!messages.length) return;

    const prevCount = messagesEndRef.current?.dataset.count
      ? parseInt(messagesEndRef.current.dataset.count)
      : 0;

    if (messages.length > prevCount) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    if (messagesEndRef.current) {
      messagesEndRef.current.dataset.count = messages.length;
    }
  }, [messages]);

  // Memoize fetchMessages so useEffect dependency is stable
  const fetchMessages = useCallback(async () => {
    const msgs = await doGetChats(user.id, friend.id);
    setMessages(msgs);
  }, [user.id, friend.id]);

  useEffect(() => {
    if (friend) fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [friend, fetchMessages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const result = await doSendMessage(user.id, friend.id, input);
    if (result.success) {
      setInput("");
      fetchMessages();
    }
  };
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatMessageDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };
  return (
    <div className="chat-area">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-user-info">
          <div className="chat-user-avatar-container">
            <div className="chat-user-avatar">
              <img
                src={
                  friend.profilePic
                    ? `data:image/jpeg;base64,${friend.profilePic}`
                    : "/assets/profile.jpg"
                }
                alt="Profile"
                className="chat-avatar"
              />
            </div>
            
          </div>
          <div className="chat-user-details">
              {friend.userName}
            </div>
        </div>
      </div>
      <div className="messages-container">
        <div className="messages-list">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message, index) => {
              const isFromUser = message.senderId === user.id;
              const showDate = index === 0 ||
                formatMessageDate(messages[index - 1].timestamp) !== formatMessageDate(message.timestamp);

              return (
                <div key={message.key}>
                  {showDate && (
                    <div className="date-separator">
                      <span className="date-badge">
                        {formatMessageDate(message.timestamp)}
                      </span>
                    </div>
                  )}
                  <div className={`message-group ${isFromUser ? 'sent' : 'received'}`}>
                    <div className="message-content">
                      {!isFromUser && (
                        <div className="message-sender-avatar">
                          <img
                            src={
                              message.senderId === user.id
                                ? user.profilePic
                                  ? `data:image/jpeg;base64,${user.profilePic}`
                                  : "/assets/profile.jpg"
                                : friend.profilePic
                                  ? `data:image/jpeg;base64,${friend.profilePic}`
                                  : "/assets/profile.jpg"
                            }
                            alt="Profile"
                            className="chat-avatar"
                          />
                        </div>
                      )}
                      <div className={`message-bubble ${isFromUser ? 'sent' : 'received'}`}>
                        <p className="message-text">{message.content}</p>
                        <p className="message-time">
                          {formatMessageTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="chat-input-area">
        <div className="input-container">
          <div className="input-wrapper">
            <input
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={`Message ${friend.userName}...`}
              disabled={!friend}
            />
          </div>
          <button
            className="send-button"
            onClick={sendMessage}
            disabled={!input.trim() || !friend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
