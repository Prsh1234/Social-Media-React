import { NavLink } from 'react-router';
import '../css/Sidebar.css';
const Sidebar = () => {
    return (
        <div className="col sidebar" >
            <ul>
                <li><NavLink to="/home">NewsFeed</NavLink></li>
                <li><NavLink to="/profile/info">Profile</NavLink></li>
                <li><NavLink to="/chat">Message</NavLink></li>

            </ul>
        </div>
    );
}
export default Sidebar;