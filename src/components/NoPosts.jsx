import { Link } from 'react-router-dom'
import '../styles/NoPosts.css'

export default function NoPosts() {
  return (
    <section className="no-posts">
        <h1>No posts yet...</h1>
        <p>Be the first to share something exciting with the community!</p>
        <Link to="/newPost" className="create-post-btn">Create a Post</Link>
    </section>
  )
}
