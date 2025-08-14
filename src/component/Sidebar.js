import { NavLink } from 'react-router';
const Sidebar = () => {
    return (
        <div className="col sidebar" >
            <ul>
                <li><NavLink to="/admin/dashboard">NewsFeed</NavLink></li>
                <li><NavLink to="/admin/blog">Profile</NavLink></li>
                <li><NavLink to="/admin/users">Messaging</NavLink></li>
                <li><NavLink to="/admin/users">Friends</NavLink></li>
            </ul>
        </div>
    );
}
export default Sidebar;