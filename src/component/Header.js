import { useNavigate } from "react-router";
import "../css/Header.css";
import { doLogout } from "../services/auth";
const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        doLogout(navigate);
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