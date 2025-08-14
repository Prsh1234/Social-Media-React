import { useEffect, useState } from "react";
import { doGetUserPosts } from "../services/post";

const Post = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const userId = localStorage.getItem("userId");
      const result = await doGetUserPosts(userId);
  
      if (result.success) {
        console.log("Posts loaded!", result.data);
        setPosts(result.data); // set posts state
      } else {
        console.error("Error loading posts:", result.error);
      }
    };
  
    fetchPosts();
  }, []);

  return (
    // <div className="post-container">
    //   <div className="post-card">
    //     <div className="profile-pic"></div>
    //     <div className="post-data-area">

    //     </div>
    //   </div>
    // </div>
    <div className="post-container">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <div className="profile-pic">
            {/* You can show user's avatar if available */}
            {/* <img
              src={post.user.avatar || "/default-avatar.png"}
              alt={post.user.name}
              style={{ width: "50px", borderRadius: "50%" }}
            /> */}
          </div>
          <div className="post-data-area">
            <h4>{post.user.email}</h4>
            <p>{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  )


}

export default Post;