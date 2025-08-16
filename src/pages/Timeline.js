import { useEffect, useState } from "react";
import { deletePost, doGetUserPosts } from "../services/post";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchPosts = async (userId) => {
    const result = await doGetUserPosts(userId);
    if (result.success) {
      setPosts(result.data);
    } else {
      console.error("Error loading posts:", result.error);
    }
  };

  const handleDelete = async (postId) => {
    const result = await deletePost(postId);
    if (result.success) {
      fetchPosts(userId);
    }
  }
  useEffect(() => {
    fetchPosts(userId);
  }, [userId]);

  return (
    <div>
      <div className="post-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <button
                className="delete-btn"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            <div className="profile-pic">
              <img
                src={
                  post.profilePic
                    ? `data:image/jpeg;base64,${post.profilePic}`
                    : "/assets/profile.jpg"
                }
                alt={"Profile Pic"}

              />
            </div>
            <h4>{post.userName}</h4>
            <div className="post-data-area">

              <p>{post.content}</p>
              {post.imageBase64 && (
                <img
                  src={`data:image/jpeg;base64,${post.imageBase64}`}
                  alt="Post"

                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;