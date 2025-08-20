import { useNavigate } from "react-router";
import { useState } from "react";
import "../css/Header.css";
import { doLogout } from "../services/auth";
import axios from "axios";
import CONFIG from "../config";
const token = localStorage.getItem("AUTH_TOKEN");

const Header = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const userId = localStorage.getItem("userId");
    const [isSearching, setIsSearching] = useState(false);
    const handleLogout = () => {
        doLogout(navigate);
    };

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);
        setIsSearching(true);
        if (value.trim().length > 0) {
            try {
                const res = await axios.get(
                    `${CONFIG.API_URL}/user/search`,
                    {
                        params: { username: value },
                        headers: { Authorization: `Bearer ${token}` } // add your token here
                    }
                );
                setResults(res.data);
                setIsSearching(false);
            } catch (err) {
                console.error("Search error:", err);
            }
        } else {
            setResults([]);
            setIsSearching(false);
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
        <header className="header">
            <div className="header-container">
                <div className="search-container">
                    <div className="search-input-wrapper">
                        <svg className="search-icon" viewBox="0 0 24 24">
                            <path d="M21 21L16.514 16.506M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search friends..."
                            value={query}
                            onChange={handleSearch}
                            className="search-input"
                        />
                        {query && (
                            <button
                                className="clear-search"
                                onClick={() => {
                                    setQuery("");
                                    setResults([]);
                                }}
                            >
                                <svg viewBox="0 0 24 24">
                                    <path d="M18 6L6 18M6 6l12 12"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                            </button>
                        )}
                    </div>
                    {(results.length > 0 || isSearching) && (
                        <div className="search-results">
                            {isSearching ? (
                                <div className="search-loading">
                                    <div className="spinner"></div>
                                    <span>Searching...</span>
                                </div>
                            ) : (
                                <ul className="results-list">
                                    {results.map((user) => (
                                        <li
                                            key={user.id}
                                            onClick={() => handleUserClick(user.id)}
                                            className="search-result-item"
                                        >
                                            <div className="user-avatar">
                                                <img
                                                    src={
                                                        user.profilePic
                                                            ? `data:image/jpeg;base64,${user.profilePic}`
                                                            : "/assets/profile.jpg"
                                                    }
                                                    alt="profile"
                                                />
                                            </div>
                                            <span className="search-username">{user.userName}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>

                <button onClick={handleLogout} className="logout-button">
                    <svg className="logout-icon" viewBox="0 0 24 24">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
