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
        <div className="chat-list">
          {friendList.map((friend) => (
            <div
              key={friend.id}
              className={`friend-card ${selectedFriend?.id === friend.id ? "active" : ""
                }`}
              onClick={() => setSelectedFriend(friend)}
            >
              <img
                src={
                  friend.profilePic
                    ? `data:image/jpeg;base64,${friend.profilePic}`
                    : "/assets/profile.jpg"
                }
                alt="Profile"
                className="chat-avatar"
              />
              <div>{friend.userName}</div>
            </div>
          ))}
        </div>
        <div className="home-main-content">
        

        {/* Chat area */}
        <div className="home-main-content">
          {selectedFriend ? (
            <Chat friend={selectedFriend} user={user} />
          ) : (
            <div>Select a friend to start chatting</div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
