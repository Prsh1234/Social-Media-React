import { useEffect, useState } from "react";
import { sendFriendRequest } from "../services/friend";
import { getAllUsers } from "../services/user";

const Users = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {

        const result = await getAllUsers();
        console.log("Fetching users:", result.data);

        if (result.success) {
            setUsers(result.data);
        } else {
            console.error("Error loading users:", result.error);

        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    const sendRequest = async (userId) => {
        try {
            const result = await sendFriendRequest(userId);
            console.log(userId)
            if (result.success) {
                setUsers(prev => prev.filter(r => r.id !== userId));                
                // Optional: Update UI to mark as "Request Sent"
            } else {
                console.error( result.message);

                console.error(result.error);
            }
        } catch (err) {
            console.error(err);

        };
    }
    return (
        <div className="user-list">
                {users.map((user) => (
                    <div key={user.id} className="user-list-card">
                        <div className="profile-pic">
                            {/* You can show user's avatar if available */}
                            {/* <img
                                src={post.user.avatar || "/default-avatar.png"}
                                alt={post.user.name}
                                style={{ width: "50px", borderRadius: "50%" }}
                                    /> */}
                        </div>
                        <div className="user-list-name-area">
                            <h4>{user.userName}</h4>
                        </div>
                        <button
                            className="submit-btn-user-list"
                            onClick={() => sendRequest(user.id)}>Send Request</button>
                    </div>
                ))}
        </div>
    );
}
export default Users;