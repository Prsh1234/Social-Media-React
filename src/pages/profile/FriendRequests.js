import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { toast } from "react-toastify";

import { acceptFriendRequest, GetFriendRequests, rejectFriendRequest } from "../../services/friend";


const FriendRequests = () => {
    const [requestList, setRequestList] = useState([]);
    const fetchRequests = async () => {
        const userId = localStorage.getItem("userId");
        const result = await GetFriendRequests(userId);

        if (result.success) {
            setRequestList(result.data);
        } else {
            console.error("Error loading requests:", result.error);
        }
    };

    const handleAccept = async (id) => {
        const result = await acceptFriendRequest(id);
        if (result.success) {
            setRequestList(prev => prev.filter(r => r.requestId !== id));
            toast.success("Friend request accepted!");
        }
        else{
            toast.error("Failed to accept friend request!");
        }
    };

    const handleReject = async (id) => {
        const result = await rejectFriendRequest(id);
        if (result.success) {
            setRequestList(prev => prev.filter(r => r.requestId !== id));
            toast.success("Friend request rejected!");
        }else{
            toast.error("Failed to reject friend request!");
        }
    };


    useEffect(() => {
        fetchRequests();
    }, []);

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
            <div className="profile-friends-container">

                <div className="request-list">
                    {requestList.map((request) => (
                        <div key={request.requestId} className="request-list-card">
                            <div className="profile-pic-friends">
                                <img
                                    src={
                                        request.profilePic
                                            ? `data:image/jpeg;base64,${request.profilePic}`
                                            : "/assets/profile.jpg"
                                    }
                                    alt={"Profile Pic"}

                                />                    </div>
                            <div className="user-list-name-area">
                                <h4>{request.userName}</h4>
                                <div className="mutual-friends-text">{request.mutual} mutual Friends</div>

                            </div>
                            <div className="request-options">
                                <button
                                    className="requests-btn accept"
                                    onClick={() => handleAccept(request.requestId)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="requests-btn reject"
                                    onClick={() => handleReject(request.requestId)}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FriendRequests;