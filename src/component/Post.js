

const Post = ({ posts }) => {


  return (

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

export default Post;