import { useState } from "react";
import "../App.css";
import { doPost } from "../services/post";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const handleChange = (e) => {
    setContent(e.target.value);
  }
  const handlePost = async () => {
    const userId = localStorage.getItem("userId");
    const result = await doPost({ content: content, userId: userId });
    if (result.success) {
      console.log("Post saved!", result.data);
      setContent(""); // clear textarea
    } else {
      console.error("Error posting:", result.error);
    }
  };
  
  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <div className="profile-pic"></div>

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

          <div className="post-actions">

            <button
              className={`post-btn ${content.trim() ? "active" : ""}`}
              disabled={!content.trim()}
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
