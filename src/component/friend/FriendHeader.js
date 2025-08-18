import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../../css/ProfileHeader.css";
import { getUserData } from "../../services/user";
import { sendFriendRequest, unfriend, GetFriendRequests, acceptFriendRequest, rejectFriendRequest } from "../../services/friend";
import axios from "axios";
import CONFIG from "../../config";

const FriendHeader = () => {
  const [coverPreview, setCoverPreview] = useState("/assets/cover.jpg");
  const [profilePreview, setProfilePreview] = useState("/assets/profile.jpg");
  const [username, setUsername] = useState("");
  const [friendStatus, setFriendStatus] = useState(""); 

  const { friendId } = useParams();
  const [requestId, setRequestId] = useState({});
  const userId = Number(localStorage.getItem("userId"));

  const fetchUser = async (friendId) => {
    try {
      const res = await getUserData(friendId);
      const user = res.data;

      setCoverPreview(
        user.coverPhoto
          ? `data:image/jpeg;base64,${user.coverPhoto}`
          : "/assets/cover.jpg"
      );
      setProfilePreview(
        user.profilePic
          ? `data:image/jpeg;base64,${user.profilePic}`
          : "/assets/profile.jpg"
      );
      setUsername(user.userName || `${user.firstName} ${user.lastName}`);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchFriendStatus = async () => {
    try {
      const res = await axios.get(`${CONFIG.API_URL}/friend/status`, {
        params: { currentUserId: userId, otherUserId: Number(friendId) }
      });
      setRequestId(res.data.requestId);
      setFriendStatus(res.data.status);
    } catch (err) {
      console.error("Error fetching friend status:", err);
    }
  };
  

  useEffect(() => {
    fetchUser(friendId);
    fetchFriendStatus();
  }, [friendId]);

  // Action handlers
  const handleSendRequest = async () => {
    const res = await sendFriendRequest(Number(friendId));
    if (res.success) setFriendStatus("request-sent");
    fetchFriendStatus();

  };

  const handleUnfriend = async () => {
    const res = await unfriend(Number(friendId));
    if (res.success) setFriendStatus("not-friend");
    fetchFriendStatus();

  };

  const handleAcceptRequest = async () => {
    // Find the request id from API
    const res = await acceptFriendRequest(requestId);

    if (res.success) {
      setFriendStatus("friend");
      fetchFriendStatus();

    }
  };

  const handleCancelRequest = async () => {
    // Here we can reject the request sent by the user
    const res = await rejectFriendRequest(requestId);

    if (res.success) {
      setFriendStatus("not-friend");
      fetchFriendStatus();

    }
  };

  return (
    <div className="profile-header">
      <div className="cover-photo-wrapper">
        <img src={coverPreview} alt="Cover" className="cover-image" />
      </div>

      <div className="profile-info">
        <div className="profile-pic-wrapper">
          <img className="profile-image" src={profilePreview} alt="Profile" />
        </div>
        <h2 className="username">{username}</h2>

        {/* Friend Action Button */}
        {Number(friendId) !== userId && (
          <div className="friend-action">
            {friendStatus === "friend" && (
              <button onClick={handleUnfriend}>Unfriend</button>
            )}
            {friendStatus === "not-friend" && (
              <button onClick={handleSendRequest}>Add Friend</button>
            )}
            {friendStatus === "request-sent" && (
              <button onClick={handleCancelRequest}>Cancel Request</button>
            )}
            {friendStatus === "request-received" && (
              <button onClick={handleAcceptRequest}>Accept Request</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendHeader;
