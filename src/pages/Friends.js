import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { getFriends, unfriend } from "../services/friend";



const Friends = () => {
    const [friendList, setFriendList] = useState([]);
    const userId = localStorage.getItem("userId");

    const fetchFriends = async (userId) => {
        const result = await getFriends(userId);
        if (result.success) {
            setFriendList(result.data);
            console.log(result.data);
        } else {
            console.error("Error loading friends:", result.error);
        }

    }

    const handleunfriend = async (id) => {
        const result = await unfriend(id);
        if (result.success) {
            setFriendList(prev => prev.filter(r => r.id !== id));
        }
    };

    useEffect(() => {
        fetchFriends(userId);
    }, [userId]);
    return (
        <div>
            <div className="profile-nav">
                <ul className="profile-nav-links">
                    <li>
                        <NavLink
                            to="/profile/friends"
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            Friends
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/profile/friendRequests"
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            FriendRequests
                        </NavLink>
                    </li>

                </ul>
            </div>
            <div className="request-list">
                {friendList.map((friend) => (
                    <div key={friend.id} className="request-list-card">
                        <div className="profile-pic">
                            <img
                                src={
                                    friend.profilePic
                                        ? `data:image/jpeg;base64,${friend.profilePic}`
                                        : "/assets/profile.jpg"
                                }
                                alt={"Profile Pic"}

                            />                    </div>
                        <div className="user-list-name-area">
                            <h4>{friend.userName}</h4>
                            <h8>{friend.mutual} mutual Friend</h8>
                        </div>
                        <div className="request-options">
                            <button
                                className="requests-btn reject"
                                onClick={() => handleunfriend(friend.id)}
                            >
                                Unfriend
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Friends;