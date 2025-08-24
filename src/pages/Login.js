import { useState } from "react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { doLogin } from "../services/auth";
import { validateLoginData } from "../utils/validateLoginData";
import '../css/Login.css';
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        login:''

    });

    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }


    const handleBtnClick = async () => {
        const { errors: validationErrors, hasError } = validateLoginData(data);
        setErrors(validationErrors);
        
        if (!hasError) {
            const loginStatus = await doLogin(data.email, data.password);
            if (loginStatus.error) {
                setErrors(prev => ({ ...prev, login: loginStatus.error }));
                toast.error("Login Failed!Try again.");
            } else {
                toast.success("Login successful, welcome");
                navigate('/home');
            }

        }
    }




    return (
        <div>
            <div className="login-container">
                <div className="login-box">
                    <h2 className="login-title">Login</h2>
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
                    </div>
                    <div className="error">{errors.password}</div>

                    <div className="error">{errors.login}</div>

                    <button className="submit-btn" onClick={handleBtnClick}>Login</button>
                    <NavLink to="/signup" className="submit-btn2">Sign Up</NavLink>

                </div>

            </div>
        </div>
    );
}

export default Login;
