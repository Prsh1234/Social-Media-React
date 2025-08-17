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

  return (
    <div className="chat-container">
      <h3 className="chat-header">
        <img
          src={
            friend.profilePic
              ? `data:image/jpeg;base64,${friend.profilePic}`
              : "/assets/profile.jpg"
          }
          alt="Profile"
          className="chat-avatar"
        />
        {friend.userName}
      </h3>

      <div className="messages">
        {messages.map((m) => (
          <div
            key={m.key}
            className={`message ${
              m.senderId === user.id ? "sent" : "received"
            }`}
          >
            <b>
              <img
                src={
                  m.senderId === user.id
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
              {m.senderId === user.id ? user.userName : friend.userName}
            </b>{" "}
            {m.content}
            <div className="timestamp">{new Date(m.timestamp).toLocaleString()}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
