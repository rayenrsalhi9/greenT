import { displayPostsByUser } from '../../firebase/displayPosts'
import { formatDate } from '../../utils/formatTime'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../config/firebase'

import Loading from '../../components/Loading'
import '../../styles/profile-layout/Posts.css'

export default function Posts() {
  const userID = auth.currentUser.uid
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await displayPostsByUser(userID)
      setPosts(posts)
    }
    fetchPosts()
  }, [userID])
  
  return (
    <div className="user-posts-container">
        <h1 className="title">Your posted plastics</h1>
        <div className="new-post-link">
          <Link to="/newPost">Add new post</Link>
        </div>
        {
          posts && posts.length > 0 && (
          posts.map((post) => (
            <div key={post.id} className="post">
                <div className="post-details">
                    <h2>{post.title}</h2>
                    <p className="time">
                      { formatDate(post.createdAt.seconds) }
                    </p>
                    <p>{post.description}</p>
                </div>
                <div className="post-actions">
                    <Link 
                      to="/" 
                      className='modify-post'
                    >
                        Modify post
                    </Link>
                    <Link 
                      to="/" 
                      className="post-details-btn"
                    >
                        See details
                    </Link>
                </div>
            </div>
            
          ))
          )
        }
        {
          posts && posts.length === 0 && (
            <p className="no-posts">No posts yet, try adding your first post!</p>
          )
        }
        {
          !posts && <Loading />
        }
    </div>
  )
}
