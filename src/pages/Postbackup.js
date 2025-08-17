
import { NavLink } from 'react-router';
import '../css/Post.css'
const Post = ({ posts }) => {


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
            <h4><NavLink to={`/friend/info/${post.posterId}`}>{post.userName}</NavLink></h4>
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