import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { doLogout } from "../services/auth";
import { changePassword } from "../services/user";
import { validatePassword } from "../utils/validateSignUpData";

const ChangePassword = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        currentPassword: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        currentPassword: "",
        password: "",
        confirmPassword: "",
    });
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        console.log(data.password,"hello",data.confirmPassword)
        const { errors: validationErrors, hasError } = validatePassword(data);
        setErrors(validationErrors);
        if (!hasError) {
            const result = await changePassword({
                currentPassword: data.currentPassword,
                newPassword: data.password
            });;
            if (result.success) {
                setData({
                    currentPassword: "",
                    password: "",
                    confirmPassword: ""
                  });
                  doLogout(navigate);

            } else {
                alert("Error: " + result.error);
            }
        }
    };

    return (
        <div className="profile-container">
            <h2 className="profile-title">Change Password</h2>


            <div className="profile-field">
                <label>Current Password</label>
                <input
                    type="password"
                    name="currentPassword"
                    value={data.currentPassword}
                    onChange={handleChange}
                />
            </div>
            <div className="error">{errors.currentPassword}</div>


            <div className="profile-field">
                <label>New Password</label>
                <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                />
            </div>
            <div className="error">{errors.password}</div>


            <div className="profile-field">
                <label>Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleChange}
                />
            </div>
            <div className="error">{errors.confirmPassword}</div>

            <div className="profile-actions">
                <button onClick={handleSave} className="btn btn-save">
                    Save
                </button>
            </div>
            <div className="profile-actions">
                <NavLink to="/profile/info" className="btn btn-edit">Cancel</NavLink>
            </div>


        </div>
    );
};

export default ChangePassword;
