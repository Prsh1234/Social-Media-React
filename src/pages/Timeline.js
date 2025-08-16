import { useEffect, useState } from "react";
import OwnPost from "../pages/OwnPost";

import { doGetUserPosts } from "../services/post";

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

    useEffect(() => {
      fetchPosts(userId);
    }, [userId]);
  
    return (
      <div>
        <OwnPost posts={posts} />
      </div>
    );
  };

export default Timeline;