import { useNavigate } from "react-router";

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("AUTH_TOKEN");
        localStorage.removeItem("Email");        
        localStorage.removeItem("userId");
        navigate("/login");
    }
    return (
        <div className="row Header">
            <div className="header-nav-links">
                <p>Header</p>
            </div>
            <div className="header-homelink">
                <button onClick={handleLogout} className="logout">Logout</button>
            </div>
        </div>
    );
}
export default Header;