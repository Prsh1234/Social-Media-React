import { useEffect, useState } from "react";
import "../css/CreatePost.css";
import { doPost } from "../services/post";
import { getUserData } from "../services/user";

const CreatePost = ({ onPostSuccess }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState([]);
  const handleChange = (e) => {
    setContent(e.target.value);
  }
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePost = async () => {
    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("content", content);
    formData.append("userId", userId);
    if (image) {
      formData.append("image", image);
      console.log(image);
    }
    const result = await doPost(formData, true);
    if (result.success) {
      console.log("Post saved!", result.data);
      setContent(""); // clear textarea
      setImage(null); // clear image
      if (onPostSuccess) onPostSuccess();
    } else {
      console.error("Error posting:", result.error);
    }
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserData();
        if (response.success) {
          setUser(response.data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <div className="profile-pic">
          <img
            src={
              user.profilePic
                ? `data:image/jpeg;base64,${user.profilePic}`
                : "/assets/profile.jpg"
            }
            alt={"Profile Pic"}
          />
        </div>

        <div className="post-input-area">
          <textarea
            className="post-textarea"
            rows={2}
            id="post-textarea"
            name="post-textarea"
            placeholder="What's happening?"
            value={content}
            onChange={handleChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="post-actions">

            <button
              className={`post-btn ${content.trim() || image ? "active" : ""}`}
              disabled={!content.trim() && !image}
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
