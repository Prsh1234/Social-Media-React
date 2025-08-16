import { NavLink } from 'react-router';
const Sidebar = () => {
    return (
        <div className="col sidebar" >
            <ul>
                <li><NavLink to="/home">NewsFeed</NavLink></li>
                <li><NavLink to="/profile/info">Profile</NavLink></li>
                <li><NavLink to="/admin/users">Messaging</NavLink></li>
                <li><NavLink to="/admin/users">Friends</NavLink></li>
                <li><NavLink to="/friendRequests">Friend Requests</NavLink></li>
            </ul>
        </div>
    );
}
export default Sidebar;