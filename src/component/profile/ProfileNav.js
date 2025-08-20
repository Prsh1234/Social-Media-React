import { NavLink } from "react-router";
import "../../css/Profile.css";

const ProfileNav = () => {
  return (
    
    <div className="profile-nav">
      <ul className="profile-nav-links">
        <li>
          <NavLink 
            to="/profile/info"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/profile/timeline"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Timeline
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/profile/friends"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Friends
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default ProfileNav;
