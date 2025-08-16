import { useEffect, useState } from "react";

import Request from "../component/Request";
import { GetFriendRequests } from "../services/friend";


const FriendRequests = () => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        const userId = localStorage.getItem("userId");
        const result = await GetFriendRequests(userId);

        if (result.success) {
            setRequests(result.data);
            console.log(result.data);
        } else {
            console.error("Error loading requests:", result.error);
        }
    };




    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div>
            <Request requests={requests} />
        </div>
    );
};

export default FriendRequests;