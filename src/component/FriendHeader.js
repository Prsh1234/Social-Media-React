import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../css/ProfileHeader.css";
import { getUserData } from "../services/user";

const FriendHeader = () => {
    const [coverPreview, setCoverPreview] = useState("/assets/cover.jpg");
    const [profilePreview, setProfilePreview] = useState("/assets/profile.jpg");
    const [username, setUsername] = useState("");
    const { friendId } = useParams();


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


    useEffect(() => {
        fetchUser(friendId);
      }, [friendId]);



    return (
        <div className="profile-header">
            <div className="cover-photo-wrapper">
                <img src={coverPreview} alt="Cover" className="cover-image" />
            </div>

            {/* Profile Info */}
            <div className="profile-info">
                <div className="profile-pic-wrapper">
                    <img className="profile-image" src={profilePreview} alt="Profile" />
                </div>
                <h2 className="username">{username}</h2>
            </div>
        </div>
    );
};

export default FriendHeader;
