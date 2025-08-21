import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import Chat from "../../pages/Chat";
import { validateAuthToken } from "../../services/auth";
import { getFriends } from "../../services/friend";
import { getUserData } from "../../services/user";

import Header from "../Header";
import Sidebar from "../Sidebar";

const ChatLayout = () => {
  const [friendList, setFriendList] = useState([]);
  const [user, setUser] = useState({});
  const [selectedFriend, setSelectedFriend] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    validateAuthToken(navigate);
  }, [navigate]);

  const fetchFriends = useCallback(async () => {
    const result = await getFriends(userId);
    if (result.success) {
      setFriendList(result.data);
      if (result.data.length > 0) setSelectedFriend(result.data[0]);
    } else {
      console.error("Error loading friends:", result.error);
    }
  }, [userId]);

  const fetchUser = useCallback(async () => {
    try {
      const response = await getUserData(userId);
      if (response.success) {
        setUser(response.data);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  }, [userId]);

  useEffect(() => {
    fetchFriends();
    fetchUser();
  }, [fetchFriends, fetchUser]);

  return (




    <div className="home-container">
      <div className="home-header">
        <Header />
      </div>
      <div className="home-main-wrapper">

        <Sidebar />
        <div className="chat-layout">
          <div className="chat-sidebar">
            <div className="sidebar-header">
              <div className="user-info">
                <div className="user-avatar">
                  <img
                    src={
                      user.profilePic
                        ? `data:image/jpeg;base64,${user.profilePic}`
                        : "/assets/profile.jpg"
                    }
                    alt="Profile"
                    className="chat-avatar"

                  />
                </div>
                <div className="user-details">
                  <h1>{user.userName}</h1>
                </div>
              </div>

            </div>
            <div className="friends-list">
              {friendList.map((friend) => (
                <div
                  key={friend.id}
                  className={`friend-card ${selectedFriend?.id === friend.id ? "active" : ""}`}
                  onClick={() => setSelectedFriend(friend)}
                >
                  <div className="friend-info">
                    <div className="friend-avatar-container">
                      <div className="friend-avatar">
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
                    <div className="friend-details">
                      <div className="friend-header">
                        <h3 className="friend-name">{friend.userName}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Chat area */}
          <div className="chat-area">
            {selectedFriend ? (
              <Chat friend={selectedFriend} user={user} />
            ) : (
              <div className="welcome-screen">
                <div className="welcome-content">
                  <div className="welcome-icon">
                    <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h2>Welcome to Chat</h2>
                  <p>Select a friend to start chatting</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
