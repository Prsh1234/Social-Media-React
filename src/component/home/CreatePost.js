import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../css/CreatePost.css";
import { doPost } from "../../services/post";
import { getUserData } from "../../services/user";

const CreatePost = ({ onPostSuccess }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const userId = localStorage.getItem("userId");
  const handleChange = (e) => {
    setContent(e.target.value);
  }
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePost = async () => {
    if (!content.trim() && !image) return;

    setIsPosting(true);
    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("content", content);
    formData.append("userId", userId);
    if (image) {
      formData.append("image", image);
    }

    const result = await doPost(formData, true);
    setIsPosting(false);

    if (result.success) {
      toast.success("Your post has been shared successfully!");
      setContent("");
      setImage(null);
      if (onPostSuccess) onPostSuccess(result.data);
    } else {
      toast.error("Failed to create post. Please try again.");
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await getUserData(userId);
        if (response.success) {
          setUser(response.data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser(userId);
  }, [userId]);
  return (
    <>
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
            {image && (
              <div className="image-preview">
                <img src={URL.createObjectURL(image)} alt="Preview" />
                <button className="remove-image" onClick={removeImage} type="button">
                  ✕
                </button>
              </div>
            )}
            <div className="file-input-wrapper">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="file-input-label">
                Add Photo
              </label>
              <div className="post-actions">

                <button
                  className={`post-btn ${(content.trim() || image) && !isPosting ? "active" : ""
                    } ${isPosting ? "posting" : ""}`}
                  disabled={(!content.trim() && !image) || isPosting}
                  onClick={handlePost}
                >
                  {isPosting ? "Posting..." : "Share Post"}
                </button>
              </div>
            </div>


          </div>
        </div>
      </div>

    </>
  );
};

export default CreatePost;
