import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import "../css/Post.css";
import { doGetComments, doPostComment } from "../services/comment"; // example service
import { toggleLike } from "../services/post";
import { doReport } from "../services/report";

const Post = ({ posts, onRemove }) => {
  const [comments, setComments] = useState({}); // { postId: [comments] }
  const [commentInputs, setCommentInputs] = useState({}); // { postId: "text" }
  const [visiblePosts, setVisiblePosts] = useState({}); // track open/close state
  const userId = localStorage.getItem("userId");
  const [postStates, setPostStates] = useState({});
  useEffect(() => {
    setPostStates(
      posts.reduce((acc, p) => {
        acc[p.id] = { liked: p.liked, likeCount: p.likeCount };
        return acc;
      }, {})
    );
  }, [posts]);




  const handleReport = async (postId) => {
    try {
      const res = await doReport(postId, userId);

      if (res.data.success) {
        if (onRemove) onRemove(postId);  // 🔥 remove from parent state
      } else {
        alert("Failed to report post: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error reporting post");
    }
  }



  const handleLike = async (postId) => {
    const result = await toggleLike(postId, userId);
    if (result.success) {
      setPostStates((prev) => ({
        ...prev,
        [postId]: {
          liked: result.data.liked,
          likeCount: result.data.likeCount,
        },
      }));
    }
  }
  const handleToggleComments = async (postId) => {
    console.log(postId)
    if (!visiblePosts[postId]) {
      // fetch comments when opened
      const result = await doGetComments(postId);
      if (result.success) {
        setComments((prev) => ({ ...prev, [postId]: result.data }));
      }
    }
    setVisiblePosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleSubmit = async (postId) => {
    const text = commentInputs[postId];
    if (!text.trim()) return;

    const result = await doPostComment(postId, text);
    if (result.success) {
      // append new comment to UI without reload
      const result = await doGetComments(postId);
      if (result.success) {
        setComments((prev) => ({ ...prev, [postId]: result.data }));
      }
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    } else {
      console.error("Failed to post comment:", result.error);
    }
  };

  return (
    <div className="post-container">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <div className="profile-pic">
            <img
              src={
                post.profilePic
                  ? `data:image/jpeg;base64,${post.profilePic}`
                  : "/assets/profile.jpg"
              }
              alt="Profile Pic"
            />
          </div>
          <div className="post-data-area">
            <h4>
              <NavLink
                to={
                  post.posterId === parseInt(userId)
                    ? "/profile/info"
                    : `/friend/info/${post.posterId}`
                }
              >
                {post.userName}
              </NavLink>
            </h4>
            <p>{post.content}</p>
            {post.imageBase64 && (
              <img
                src={`data:image/jpeg;base64,${post.imageBase64}`}
                alt="Post"
              />
            )}
            <div className="post-actions">
              <button
                onClick={() => handleLike(post.id)}
                className={postStates[post.id]?.liked ? "liked" : ""}
              >
                {postStates[post.id]?.liked ? "💙 Unlike" : "🤍 Like"}
              </button>
              <span>{postStates[post.id]?.likeCount || 0} likes</span>
              <button
                onClick={() => handleReport(post.id)}
                className="report-btn"
              >
                 Report
              </button>
            </div>
            {/* Comments Button */}
            <button onClick={() => handleToggleComments(post.id)}>
              {visiblePosts[post.id] ? "Hide Comments" : "Show Comments"}
            </button>

            {/* Comments Section */}
            {visiblePosts[post.id] && (
              <div className="comments-section">
                <div className="comments-list">
                  {(comments[post.id] || []).map((c) => (
                    <div key={c.id} className="comment">
                      <strong>{c.userName}:</strong> {c.content}
                    </div>
                  ))}
                </div>
                <div className="comment-input">
                  <input
                    type="text"
                    value={commentInputs[post.id] || ""}
                    onChange={(e) => handleChange(post.id, e.target.value)}
                    placeholder="Write a comment..."
                  />
                  <button onClick={() => handleSubmit(post.id)}>Post</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
