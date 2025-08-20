import { useEffect, useState, useCallback } from "react";
import CreatePost from "../component/CreatePost";
import Post from "../pages/Post";
import { doGetTimelinePosts } from "../services/post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async (reset = false) => {
    if (loading) return;

    setLoading(true);
    const currentPage = reset ? 0 : page;

    try {
      const result = await doGetTimelinePosts(currentPage, 5);

      if (result.success) {
        setPosts(prev => {
          const newPosts = result.data.filter(
            post => !prev.some(existing => existing.id === post.id)
          );
          return reset ? result.data : [...prev, ...newPosts];
        });
        setHasMore(result.data.length > 0);
        setPage(prev => reset ? 1 : prev + 1);
      } else {
        console.error("Error loading posts:", result.error);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    }

    setLoading(false);
  }, [loading, page]);

  const handlePostSuccess = newPost => setPosts(prev => [newPost, ...prev]);
  const handlePostRemoved = postId => setPosts(prev => prev.filter(p => p.id !== postId));

  // initial fetch
  useEffect(() => {
    fetchPosts(true);
  }, []); // run only once

  // scroll for more
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

  return (
    <div>
      <CreatePost onPostSuccess={handlePostSuccess} />
      <Post posts={posts} onRemove={handlePostRemoved} />
      {loading && <div className="loader"><p>Loading...</p></div>}
    </div>
  );
};

export default Home;
