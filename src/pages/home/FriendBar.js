import { useCallback, useEffect, useState } from "react";
import { getFriends } from "../../services/friend";
import "../../css/Chat.css";
import { NavLink } from "react-router";
const FriendBar = () => {
    const [friendList, setFriendList] = useState([]);
    const userId = localStorage.getItem("userId");
    const fetchFriends = useCallback(async () => {
        const result = await getFriends(userId);
        if (result.success) {
            setFriendList(result.data);
        } else {
            console.error("Error loading friends:", result.error);
        }
    }, [userId]);
    useEffect(() => {
        fetchFriends();
    }, [fetchFriends]);
    return (
        <div className="sidebar-users">
            <nav className="sidebar-nav">
                <div className="friends-list">
                    {friendList.map((friend) => (
                        <NavLink className="sidebar-link"
                            to={friend.id === userId ? "/profile/info" : `/friend/info/${friend.id}`}
                        >
                            <div
                                key={friend.id}
                                className={`sidebar-item`}
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
                        </NavLink>
                    ))}
                        
                </div>
            </nav>
        </div>
    )
}
export default FriendBar


