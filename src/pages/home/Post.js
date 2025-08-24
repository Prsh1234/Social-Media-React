import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { toast } from "react-toastify";
import "../../css/Post.css";
import { doGetComments, doPostComment } from "../../services/comment";
import { toggleLike } from "../../services/post";
import { doReport } from "../../services/report";

const Post = ({ posts, onRemove }) => {
  const [postStates, setPostStates] = useState({});
  const [visiblePosts, setVisiblePosts] = useState({});
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});


  const userId = parseInt(localStorage.getItem("userId"));
  useEffect(() => {
    const initialStates = posts.reduce((acc, post) => {
      acc[post.id] = {
        liked: post.liked ?? false,
        likeCount: post.likeCount ?? 0
      };
      return acc;
    }, {});
    setPostStates(initialStates);
  }, [posts]);
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
  };

  const handleReport = async (postId) => {
    try {
      const res = await doReport(postId, userId);
      if (res.data.success && onRemove) onRemove(postId);
      else alert("Failed to report post: " + res.data.message);
    } catch (err) {
      console.error(err);
      alert("Error reporting post");
    }
  };

  const handleToggleComments = async (postId) => {
    if (!visiblePosts[postId]) {
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
    if (!text?.trim()) return;

    const result = await doPostComment(postId, text);
    if (result.success) {
      const commentsResult = await doGetComments(postId);
      if (commentsResult.success) {
        setComments((prev) => ({ ...prev, [postId]: commentsResult.data }));
        toast.success("Comment posted successfully!");
      }
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    } else {
      toast.error("Failed to post comment!");
      console.error("Failed to post comment:", result.error);
    }
  };

  return (
    <div className="post-container">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <NavLink to={post.posterId === userId ? "/profile/info" : `/friend/info/${post.posterId}`}>
            <div className="profile-pic">
              <img
                src={post.profilePic ? `data:image/jpeg;base64,${post.profilePic}` : "/assets/profile.jpg"}
                alt="Profile Pic"
              />
            </div>
          </NavLink>

          <div className="post-data-area">
            <h4>
              <NavLink to={post.posterId === userId ? "/profile/info" : `/friend/info/${post.posterId}`}>
                {post.userName}
              </NavLink>
              <div className="timestamp">{new Date(post.timestamp).toLocaleString()}</div>
            </h4>

            <p>{post.content}</p>

            {post.imageBase64 && (
              <div className="post-image">
                <img src={`data:image/jpeg;base64,${post.imageBase64}`} alt="Post" />
              </div>
            )}

            <div className="post-actions">
              <button onClick={() => handleLike(post.id)} className={postStates[post.id]?.liked ? "liked" : ""}>
                {postStates[post.id]?.liked ? "💙 Unlike" : "🤍 Like"}
              </button>
              <span>{postStates[post.id]?.likeCount ?? post.likeCount ?? 0} likes</span>
              <button onClick={() => handleReport(post.id)} className="report-btn">🚨 Report</button>
              <button onClick={() => handleToggleComments(post.id)}>
                {visiblePosts[post.id] ? "💬 Hide Comments" : "💬 Show Comments"}
              </button>
            </div>

            {visiblePosts[post.id] && (
              <div className="comments-section">
                {(comments[post.id] || []).map((c) => (
                  <div key={c.id} className="comment">
                    <div className="comment-avatar">
                      <NavLink to={c.userId === userId ? "/profile/info" : `/friend/info/${c.userId}`}>
                        <img src={c.profilePic ? `data:image/jpeg;base64,${c.profilePic}` : "/assets/profile.jpg"} alt="Profile Pic" />
                      </NavLink>
                    </div>
                    <div className="comment-content">
                      <strong>
                        <NavLink to={c.userId === userId ? "/profile/info" : `/friend/info/${c.userId}`}>
                          {c.userName}:
                        </NavLink>
                      </strong>
                      <span>{c.content}</span>
                    </div>
                  </div>
                ))}
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
