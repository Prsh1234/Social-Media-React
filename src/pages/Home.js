import { useEffect, useState } from "react";
import CreatePost from "../component/CreatePost";
import Post from "../pages/Post";
import { doGetTimelinePosts } from "../services/post";

const Home = () => {
    const [posts, setPosts] = useState([]);
  
    const fetchPosts = async () => {
      const userId = localStorage.getItem("userId");
      const result = await doGetTimelinePosts(userId);
  
      if (result.success) {
        setPosts(result.data);
      } else {
        console.error("Error loading posts:", result.error);
      }
    };

  
    const handlePostRemoved = (postId) => {
      setPosts(prev => prev.filter(p => p.id !== postId));
    };
  
    useEffect(() => {
      fetchPosts();
    }, []);
  
    return (
      <div>
        <CreatePost onPostSuccess={fetchPosts} />
        <Post posts={posts} onRemove={handlePostRemoved}/>
      </div>
    );
  };

export default Home;