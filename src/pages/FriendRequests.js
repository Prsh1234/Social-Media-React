import { useEffect, useState } from "react";

import { acceptFriendRequest, GetFriendRequests, rejectFriendRequest } from "../services/friend";


const FriendRequests = () => {
    const [requestList, setRequestList] = useState([]);
    const fetchRequests = async () => {
        const userId = localStorage.getItem("userId");
        const result = await GetFriendRequests(userId);

        if (result.success) {
            setRequestList(result.data);
            console.log(result.data);
        } else {
            console.error("Error loading requests:", result.error);
        }
    };

    const handleAccept = async (id) => {
        const result = await acceptFriendRequest(id);
        if (result.success) {
            setRequestList(prev => prev.filter(r => r.requestId !== id));
        }
    };

    const handleReject = async (id) => {
        const result = await rejectFriendRequest(id);
        if (result.success) {
            setRequestList(prev => prev.filter(r => r.requestId !== id));
        }
    };


    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div className="request-list">
            {requestList.map((request) => (
                <div key={request.requestId} className="request-list-card">
                    <div className="profile-pic">
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
    );
};

export default FriendRequests;