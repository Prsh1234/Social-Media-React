import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { sendFriendRequest } from "../services/friend";
import { getAllUsers } from "../services/user";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem("userId");

    const fetchUsers = async () => {

        const result = await getAllUsers();
        console.log("Fetching users:", result.data);

        if (result.success) {
            setUsers(result.data);
            setLoading(false);

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
            } else {
                console.error(result.message);

                console.error(result.error);
            }
        } catch (err) {
            console.error(err);

        };
    }
    if (loading) return <p>Loading users...</p>;
    return (
        <div className="user-list">
            {users.map((user) => (
                <div key={user.id} className="user-list-card">
                    <NavLink
                        to={user.id === userId ? "/profile/info" : `/friend/info/${user.id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                    >
                        <div className="profile-pic">
                            <img
                                src={
                                    user.profilePic
                                        ? `data:image/jpeg;base64,${user.profilePic}`
                                        : "/assets/profile.jpg"
                                }
                                alt={"Profile Pic"}

                            />
                        </div>
                    </NavLink>
                    <div className="user-list-name-area">
                        <h4><NavLink
                            to={user.id === userId ? "/profile/info" : `/friend/info/${user.id}`}
                            style={{ color: "inherit", textDecoration: "none" }}
                        >
                            {user.userName}
                        </NavLink></h4>
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