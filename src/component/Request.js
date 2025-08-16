import { useEffect, useState } from "react";
import { acceptFriendRequest, rejectFriendRequest } from "../services/friend";

const Request = ({ requests }) => {
    const [requestList, setRequestList] = useState([]);

    useEffect(() => {
        setRequestList(requests);
    }, [requests]);
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

    return (
        <div className="request-list">
            {requestList.map((request) => (
                <div key={request.requestId} className="request-list-card">
                    <div className="profile-pic">
                        {/* Optional avatar */}
                    </div>
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

export default Request;
