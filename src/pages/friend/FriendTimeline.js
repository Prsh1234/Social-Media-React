import { useEffect, useState, useRef, useCallback } from "react";
import { useParams,NavLink } from "react-router";
import "../../css/Post.css";
import { doGetComments, doPostComment } from "../../services/comment";
import { doGetUserPosts, toggleLike } from "../../services/post";
import { doReport } from "../../services/report";

const FriendTimeline = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [comments, setComments] = useState({});
    const [commentInputs, setCommentInputs] = useState({});
    const [visiblePosts, setVisiblePosts] = useState({});
    const [postStates, setPostStates] = useState({});
    const { friendId } = useParams();
    const userId = localStorage.getItem("userId");

    const fetchPosts = useCallback(async (reset = false) => {
      console.log("fetch")
      debugger;
      if (loading) return;
      setLoading(true);
      const currentPage = reset ? 0 : page;
      const result = await doGetUserPosts(friendId, currentPage, 5);
  
      if (result.success) {
        setPosts(prev => reset ? result.data : [...prev, ...result.data]);
        setHasMore(result.data.length > 0);
        setPage(prev => reset ? 1 : prev + 1);
      } else {
        console.error("Error loading posts:", result.error);
      }
      setLoading(false);
    }, [loading, page, friendId]);

    useEffect(() => {
      const states = posts.reduce((acc, p) => {
        acc[p.id] = { liked: p.liked, likeCount: p.likeCount };
        return acc;
      }, {});
      setPostStates(states);
    }, [posts]);

    useEffect(() => {
      fetchPosts(true);
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight * 0.9 && hasMore && !loading) {
          fetchPosts();
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, loading, fetchPosts]);

    const handleReport = async (postId) => {
      try {
        const res = await doReport(postId, userId);
        if (res.data.success) {
          setPosts((prev) => prev.filter((p) => p.id !== postId));
        } else {
          alert("Failed to report post: " + res.data.message);
        }
      } catch (err) {
        console.error(err);
        alert("Error reporting post");
      }
    };

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
      if (!text.trim()) return;
  
      const result = await doPostComment(postId, text);
      if (result.success) {
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
    <div>
      <div className="post-container">
        {posts.map(post => (
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
                <div className="timestamp">
                  {new Date(post.timestamp).toLocaleString()}
                </div>
              </h4>

              <p>{post.content}</p>

              {post.imageBase64 && (
                <div className="post-image">
                  <img
                    src={`data:image/jpeg;base64,${post.imageBase64}`}
                    alt="Post"
                  />
                </div>
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
                  🚨 Report
                </button>
                <button onClick={() => handleToggleComments(post.id)}>
                  {visiblePosts[post.id] ? "💬 Hide Comments" : "💬 Show Comments"}
                </button>
              </div>

              {visiblePosts[post.id] && (
                <div className="comments-section">
                  <div className="comments-list">
                    {(comments[post.id] || []).map((c) => (
                      <div key={c.id} className="comment">
                        <div className="comment-avatar">
                          <img
                            src={
                              c.profilePic
                                ? `data:image/jpeg;base64,${c.profilePic}`
                                : "/assets/profile.jpg"
                            }
                            alt="Profile Pic"
                          />
                        </div>
                        <div className="comment-content">
                          <strong>
                            <NavLink
                              to={
                                c.userId === parseInt(userId)
                                  ? "/profile/info"
                                  : `/friend/info/${c.userId}`
                              }
                            >
                              {c.userName}:
                            </NavLink>
                          </strong>
                          <span>{c.content}</span>
                        </div>
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

      {loading && <div className="loader"><p>Loading...</p></div>}
    </div>
  );
  
  
  }
  
  export default FriendTimeline;