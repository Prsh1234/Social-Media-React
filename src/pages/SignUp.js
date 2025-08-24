import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { registerUser } from "../services/user";
import { validateSignUpData } from "../utils/validateSignUpData";
import '../css/Login.css';
import { toast } from "react-toastify";

const SignUp = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        userName: ''
    });

    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        userName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }
    const handleBtnClick = async () => {
        const { errors: validationErrors, hasError } = validateSignUpData(data);
        setErrors(validationErrors);
      
        if (!hasError) {
          try {
            const { confirmPassword, ...userData } = data;
            const result = await registerUser(userData);
      
            if (!result.success) {
              // Show error message from server
              setErrors(prev => ({ ...prev, email: result.message }));
                toast.error(result.message);
            } else {
                toast.success("Registration successful, please login.");
                navigate('/login');
            }
          } catch (error) {
            toast.error("Something went wrong. Please try again.");
            setErrors(prev => ({ ...prev, general: "Something went wrong. Please try again." }));
          }
        }
      };



    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Sign Up</h2>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        className="form-control"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={data.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="error">{errors.email}</div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={data.password}
                        onChange={handleChange}
                    />
                    <div className="error">{errors.password}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="confirn-password">Confirm Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        id="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={data.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="error">{errors.confirmPassword}</div>

                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={data.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="error">{errors.firstName}</div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={data.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="error">{errors.lastName}</div>
                <div className="form-group">
                    <label htmlFor="userName">User Name:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="userName"
                        name="userName"
                        placeholder="Enter your user name"
                        value={data.userName}
                        onChange={handleChange}
                    />
                </div>
                <div className="error">{errors.userName}</div>

                <button className="submit-btn" onClick={handleBtnClick}>SignUp</button>
                <NavLink to="/login" className="submit-btn2">Login</NavLink>
            </div>
        </div >
    );
}

export default SignUp;
