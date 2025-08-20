import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import "../../css/Admin.css";
import { deleteUser, getUsers } from "../../services/admin";

const AdminDashboard = () => {
    const userId = localStorage.getItem("userId");
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        const res = await getUsers();
        setUsers(res.data);
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteSelectedUser = async (id) => {

        const res = await deleteUser(id)
        if (res.success) {
            const updatedUsers = users.filter((u) => u.id !== id);
            setUsers(updatedUsers);
        }

    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1 className="admin-title">Users Dashboard</h1>
                <p className="admin-subtitle">Manage Users </p>
                <div className="table-container">
                    {users.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📋</div>
                            <h3 className="empty-state-title">No Users Found</h3>
                            <p className="empty-state-description">
                                There are currently no users to review. Check back later for new Users.
                            </p>
                        </div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="user-info">
                                                <div className="user-details">
                                                    <div className="user-name">{user.userName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-info">
                                                <div className="user-details">
                                                    <div className="user-name">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-info">
                                                <div className="user-details">
                                                    <div className="user-name">{user.firstName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-info">
                                                <div className="user-details">
                                                    <div className="user-name">{user.lastName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-info">
                                                <div className="user-details">
                                                    <div className="user-name">{user.role}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="admin-table-options">
                                            <button className="admin-table-button delete-option" value={user.id} onClick={() => deleteSelectedUser(user.id)}>Delete</button>
                                            <NavLink to={user.id === userId ? "/profile/info" : `/friend/info/${user.id}`}>
                                                <button className="admin-table-button view-option">
                                                    Dismiss Report
                                                </button>
                                            </NavLink>

                                            {/* Optional buttons if you want edit/view */}
                                            {/* 
                            <button
                                className="blog-button edit-option"
                                value={u.id}
                                onClick={() => handleEdit(u.id)}
                            >
                                Edit
                            </button>
                            */}

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
