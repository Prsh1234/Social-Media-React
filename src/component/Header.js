import { useNavigate } from "react-router";
import { useState } from "react";
import "../css/Header.css";
import { doLogout } from "../services/auth";
import axios from "axios";
import CONFIG from "../config";

const Header = ({ currentUserId }) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const userId = localStorage.getItem("userId");
    const handleLogout = () => {
        doLogout(navigate);
    };

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim().length > 0) {
            try {
                const res = await axios.get(
                    `${CONFIG.API_URL}/user/search`,
                    { params: { username: value } }
                );
                setResults(res.data);
            } catch (err) {
                console.error("Search error:", err);
            }
        } else {
            setResults([]);
        }
    };

    const handleUserClick = (id) => {
        // Convert both to number
        const clickedId = Number(id);
        const currentId = Number(userId);

        if (clickedId === currentId) {
            navigate(`/profile/info`);
            console.log("profile");
        } else {
            navigate(`/friend/info/${clickedId}`);
            console.log("friend");
        }

        setQuery("");
        setResults([]);
    };


    return (
        <div className="row Header">
            <div className="header-nav-links">
                <input
                    type="text"
                    placeholder="Search ..."
                    value={query}
                    onChange={handleSearch}
                    className="search-input"
                />
                {results.length > 0 && (
                    <ul className="search-results">
                        {results.map((user) => (
                            <li
                                key={user.id}
                                onClick={() => handleUserClick(user.id)}
                                className="search-result-item"
                            >
                                    <img
                                        src={
                                            user.profilePic
                                                ? `data:image/jpeg;base64,${user.profilePic}`
                                                : "/assets/profile.jpg"
                                        }
                                        alt="profile"
                                        className="search-avatar"
                                    />

                                <span>{user.userName}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="header-homelink">
                <button onClick={handleLogout} className="logout">Logout</button>
            </div>
        </div>
    );
};

export default Header;
