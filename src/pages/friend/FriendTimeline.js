import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { doGetUserPosts } from "../../services/post";


const FriendTimeline = () => {
    const [posts, setPosts] = useState([]);
    const { friendId } = useParams();
    console.log(friendId);
    const fetchPosts = async (friendId) => {
      const result = await doGetUserPosts(friendId);
      if (result.success) {
        setPosts(result.data);
      } else {
        console.error("Error loading posts:", result.error);
      }
    };

    useEffect(() => {
      fetchPosts(friendId);
    }, [friendId]);

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
              alt={"Profile Pic"}

            />
            </div>
            <div className="post-data-area">
              <h4>{post.userName}</h4>
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
    )
  
  
  }
  
  export default FriendTimeline;