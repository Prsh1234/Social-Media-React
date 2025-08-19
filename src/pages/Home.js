import { useEffect, useState, useCallback } from "react";
import CreatePost from "../component/CreatePost";
import Post from "../pages/Post";
import { doGetTimelinePosts } from "../services/post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(
    async (reset = false) => {
      setLoading(true);
      const result = await doGetTimelinePosts(reset ? 0 : page, 5);

      if (result.success) {
        if (reset) {
          setPosts(result.data);
          setPage(1);
          setHasMore(true); // always re-enable when resetting
        } else {
          if (result.data.length > 0) {
            setPosts((prev) => [...prev, ...result.data]);
            setPage((prev) => prev + 1);
          }
          // keep hasMore = true → wait for future posts
        }
      } else {
        console.error("Error loading posts:", result.error);
      }
      setLoading(false);
    },
    [page] // ✅ depends on page
  );

  const handlePostRemoved = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  useEffect(() => {
    fetchPosts(true); // load first page
  }, [fetchPosts]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight * 0.9 && !loading && hasMore) {
        fetchPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, fetchPosts]);

  return (
    <div>
      <CreatePost onPostSuccess={() => fetchPosts(true)} />
      <Post posts={posts} onRemove={handlePostRemoved} />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Home;
