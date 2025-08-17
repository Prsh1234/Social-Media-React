import { useEffect, useState } from "react";
import { getUserData } from "../../services/user";
import "../../css/FriendProfile.css"; // use a new CSS file
import { useParams } from "react-router";

const FriendProfile = () => {
    const [user, setUser] = useState({
        email: "",
        firstName: "",
        lastName: "",
        userName: ""
    });
    const { friendId } = useParams();

    const fetchUser = async (userId) => {
        try {
            const response = await getUserData(userId);
            if (response.success) {
                setUser(response.data);
            }
        } catch (err) {
            console.error("Error fetching user:", err);
        }
    };

    useEffect(() => {
        fetchUser(friendId);
    }, [friendId]);

    return (
        <div className="friend-profile-wrapper">
            <h2 className="friend-profile-title">Friend Profile</h2>
            
            <div className="friend-profile-field">
                <label>First Name</label>
                <div className="friend-profile-value">{user.firstName}</div>
            </div>

            <div className="friend-profile-field">
                <label>Last Name</label>
                <div className="friend-profile-value">{user.lastName}</div>
            </div>

            <div className="friend-profile-field">
                <label>Username</label>
                <div className="friend-profile-value">{user.userName}</div>
            </div>

            <div className="friend-profile-field">
                <label>Email</label>
                <div className="friend-profile-value">{user.email}</div>
            </div>
        </div>
    );
};

export default FriendProfile;
