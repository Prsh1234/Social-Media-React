import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import "../../css/ProfileHeader.css";
import { getUserData } from "../../services/user";
import { sendFriendRequest, unfriend, acceptFriendRequest, rejectFriendRequest } from "../../services/friend";
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

  const fetchUser = useCallback(async (friendId) => {
    try {
      const res = await getUserData(friendId);
      const user = res.data;

      setCoverPreview(user.coverPhoto ? `data:image/jpeg;base64,${user.coverPhoto}` : "/assets/cover.jpg");
      setProfilePreview(user.profilePic ? `data:image/jpeg;base64,${user.profilePic}` : "/assets/profile.jpg");
      setUsername(user.userName || `${user.firstName} ${user.lastName}`);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, []);

  const fetchFriendStatus = useCallback(async () => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const res = await axios.get(`${CONFIG.API_URL}/friend/status`, {
        params: {
          currentUserId: userId,
          otherUserId: Number(friendId)
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequestId(res.data.requestId);
      setFriendStatus(res.data.status);
    } catch (err) {
      console.error("Error fetching friend status:", err);
    }
  }, [friendId, userId]);

  useEffect(() => {
    fetchUser(friendId);
    fetchFriendStatus();
  }, [fetchUser, fetchFriendStatus, friendId]);

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
    const res = await acceptFriendRequest(requestId);
    if (res.success) {
      setFriendStatus("friend");
      fetchFriendStatus();
    }
  };

  const handleCancelRequest = async () => {
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
        <div className="profile-name-actions">
          <div className="profile-username-container">
            <h2 className="profile-username">{username}</h2>
          </div>

          {Number(friendId) !== userId && (
            <div className="friend-action">
              {friendStatus === "friend" && (
                <button className="btn btn-danger" onClick={handleUnfriend}>
                  Remove Friend
                </button>
              )}
              {friendStatus === "not-friend" && (
                <button className="btn btn-primary" onClick={handleSendRequest}>
                  Send Friend Request
                </button>
              )}
              {friendStatus === "request-sent" && (
                <button className="btn btn-danger" onClick={handleCancelRequest}>
                  Cancel Request
                </button>
              )}
              {friendStatus === "request-received" && (
                <button className="btn btn-success" onClick={handleAcceptRequest}>
                  Accept Request
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendHeader;
