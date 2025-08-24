import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Slider from "react-slick";   // carousel
import { sendFriendRequest } from "../services/friend";
import { getAllUsers } from "../services/user";
import "../css/SuggestedUsers.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";


const SuggestedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  const fetchUsers = async () => {
    const result = await getAllUsers();
    if (result.success) {
      setUsers(result.data);
      setLoading(false);
    } else {
      console.error("Error loading users:", result.error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const sendRequest = async (friendId) => {
    try {
      const result = await sendFriendRequest(friendId);
      if (result.success) {
        toast.success("Friend request sent successfully!");
        setUsers(prev => prev.filter(r => r.id !== friendId));
      } else {
        console.error(result.message || result.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading users...</p>;

  const PrevArrow = ({ className, onClick }) => (
    <button
      className={`${className} custom-prev`}
      onClick={onClick}
      aria-label="Previous"
    >
      <FaChevronLeft />
    </button>
  );

  const NextArrow = ({ className, onClick }) => (
    <button
      className={`${className} custom-next`}
      onClick={onClick}
      aria-label="Next"
    >
      <FaChevronRight />
    </button>
  );
  // ✅ Carousel settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };
  return (
    <>
      {users.length !== 0 &&
        <div className="users-carousel">
          <h3>Suggested Users</h3>
          <Slider {...settings}>
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <NavLink
                  to={user.id === userId ? "/profile/info" : `/friend/info/${user.id}`}
                >
                  <div className="profile-pic">
                    <img
                      src={user.profilePic ? `data:image/jpeg;base64,${user.profilePic}` : "/assets/profile.jpg"}
                      alt="Profile Pic"
                    />
                  </div>

                  <h4>{user.userName}</h4>
                </NavLink>
                <button
                  className="submit-btn-user-list"
                  onClick={() => sendRequest(user.id)}
                >
                  Send Request
                </button>
              </div>
            ))}
          </Slider>
        </div>
      }
    </>
  );

};

export default SuggestedUsers;
