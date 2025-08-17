import { useEffect, useState } from "react";
import { getUserData, updateProfile } from "../../services/user";
import "../../css/Profile.css";
import { NavLink } from "react-router";

const Profile = () => {
    const [user, setUser] = useState({
        email: "",
        firstName: "",
        lastName: "",
        userName: ""
    });
    const [editing, setEditing] = useState(false);
    const userId = localStorage.getItem("userId");
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const response = await updateProfile(user);
            if (response.success) {
                alert("Profile updated successfully!");
                setEditing(false);
            }
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };
    useEffect(() => {
        fetchUser(userId);
    }, [userId]);

    return (
        <div className="profile-container">
            <h2 className="profile-title">My Profile</h2>

            <div className="profile-field">
                <label>Email</label>
                <p className="profile-readonly">{user.email}</p>
            </div>

            <div className="profile-field">
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    disabled={!editing}
                    onChange={handleChange}
                />
            </div>

            <div className="profile-field">
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    disabled={!editing}
                    onChange={handleChange}
                />
            </div>

            <div className="profile-field">
                <label>Username</label>
                <input
                    type="text"
                    name="userName"
                    value={user.userName}
                    disabled={!editing}
                    onChange={handleChange}
                />
            </div>

            <div className="profile-actions">
                {!editing ? (
                    <button onClick={() => setEditing(true)} className="btn btn-edit">
                        Edit
                    </button>
                ) : (
                    <>
                        <button onClick={handleSave} className="btn btn-save">
                            Save
                        </button>
                        <button
                            onClick={() => setEditing(false)}
                            className="btn btn-cancel"
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
            <div className="profile-actions">
                <NavLink to="/profile/changePassword" className="btn btn-edit">Edit Password</NavLink>
            </div>


        </div>
    );
};

export default Profile;
