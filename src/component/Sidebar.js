import { NavLink } from 'react-router';
import '../css/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <nav className="sidebar-nav">
                <ul className="sidebar-menu">
                    <li className="sidebar-item">
                        <NavLink to="/home" className="sidebar-link">
                            <span className="sidebar-icon">📰</span>
                            <span className="sidebar-text">NewsFeed</span>
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink to="/profile/info" className="sidebar-link">
                            <span className="sidebar-icon">👤</span>
                            <span className="sidebar-text">Profile</span>
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink to="/chat" className="sidebar-link">
                            <span className="sidebar-icon">💬</span>
                            <span className="sidebar-text">Message</span>
                        </NavLink>
                    </li>
                    {localStorage.getItem("role") === "ADMIN" && (
                        <>
                            <li className="sidebar-item sidebar-divider">
                                <div className="divider-line"></div>
                                <span className="divider-text">Admin</span>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to="/admin/Dashboard" className="sidebar-link admin-link">
                                    <span className="sidebar-icon">👥</span>
                                    <span className="sidebar-text">Manage Users</span>
                                </NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to="/admin/Reports" className="sidebar-link admin-link">
                                    <span className="sidebar-icon">📊</span>
                                    <span className="sidebar-text">Manage Reports</span>
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;