import React, { useEffect, useState } from "react";
import "../../css/ProfileHeader.css";
import { doUpload, getUserData } from "../../services/user";

const ProfileHeader = () => {
  const [coverPreview, setCoverPreview] = useState("/assets/cover.jpg");
  const [profilePreview, setProfilePreview] = useState("/assets/profile.jpg");
  const [username, setUsername] = useState("");
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  const fetchUser = async (userId) => {
    try {
      const res = await getUserData(userId);
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

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
      uploadCover(file);
    }
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
      uploadProfile(file);
    }
  };

  const uploadProfile = async (file) => {
    const userId = localStorage.getItem("userId");
    const result = await doUpload(file, "profile", userId);

    if (result.success && result.data.profilePic) {
      setProfilePreview(`data:image/jpeg;base64,${result.data.profilePic}`);
    }
  };

  const uploadCover = async (file) => {
    const userId = localStorage.getItem("userId");
    const result = await doUpload(file, "cover", userId);

    if (result.success && result.data.coverPhoto) {
      setCoverPreview(`data:image/jpeg;base64,${result.data.coverPhoto}`);
    }
  };

  return (
    <div className="profile-header">
      <div className="cover-photo-wrapper">
        <img src={coverPreview} alt="Cover" className="cover-image" />
        <label className="cover-overlay">
          Change Cover
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="cover-input"
          />
        </label>
      </div>

      {/* Profile Info */}
      <div className="profile-info">
        <div className="profile-pic-wrapper">
          <img className="profile-image" src={profilePreview} alt="Profile" />
          <label className="profile-overlay">
            Change Profile
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileChange}
              className="profile-input"
            />
          </label>
        </div>
        <h2 className="username">{username}</h2>
      </div>
    </div>
  );
};

export default ProfileHeader;
