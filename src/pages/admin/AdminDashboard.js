import { useEffect, useState } from "react";
import "../../css/Admin.css";
import { deleteUser, getUsers } from "../../services/admin";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await getUsers();
            setUsers(res.data);
        };
        fetchUsers();
    }, []);

    const deleteSelectedUser = async (id) => {

        const res = await deleteUser(id) 
        if(res.success){
            const updatedUsers = users.filter((u) => u.id !== id);
            setUsers(updatedUsers);
        }

    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <table className="user">
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
                    {users.map((u, index) => (
                        <tr key={index}>
                            <td>{u.userName}</td>
                            <td>{u.email}</td>
                            <td>{u.firstName}</td>
                            <td>{u.lastName}</td>
                            <td>{u.role}</td>
                            <td className="user-options">
                                <button className="user-button delete-option" value={u.id} onClick={() => deleteSelectedUser(u.id)}>Delete</button>
                                {/* Optional buttons if you want edit/view */}
                                {/* 
                            <button
                                className="blog-button edit-option"
                                value={u.id}
                                onClick={() => handleEdit(u.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="blog-button view-option"
                                value={u.id}
                                onClick={() => handleView(u.id)}
                            >
                                View
                            </button> */}

                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default AdminDashboard;
