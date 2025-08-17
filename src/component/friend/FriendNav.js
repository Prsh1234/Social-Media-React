import { NavLink, useParams } from "react-router";
import "../../css/Profile.css";

const FriendNav = () => {
    const { friendId } = useParams();

    return (
        <div className="profile-nav">
            <ul className="profile-nav-links">
                <li>
                    <NavLink
                        to={`/friend/info/${friendId}`}
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={`/friend/timeline/${friendId}`}
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        Timeline
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={`/friend/friends/${friendId}`}
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        Friends
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default FriendNav;
